// Global variables
let nodes, edges, network;
let allNodes = [];
let allEdges = [];
let nodeTypes = new Set();

// Initialize on page load
window.addEventListener('load', init);

async function init() {
    try {
        // Load the graph data
        const response = await fetch('{{DATA_FILE}}');
        const data = await response.json();

        allNodes = data.nodes || [];
        allEdges = data.edges || [];

        // Extract unique node types
        allNodes.forEach(node => {
            if (node.type) nodeTypes.add(node.type);
        });

        // Initialize UI components
        initializeFilterCheckboxes();
        initializeLegend();
        initializeNetwork();
        setupEventListeners();

    } catch (error) {
        console.error('Error loading graph data:', error);
        document.getElementById('network').innerHTML =
            '<div style="padding: 20px; text-align: center; color: #ef4444;">' +
            'Error loading graph data. Please check the console for details.' +
            '</div>';
    }
}

function initializeFilterCheckboxes() {
    const container = document.getElementById('filterCheckboxes');
    container.innerHTML = '';

    Array.from(nodeTypes).sort().forEach(type => {
        const label = document.createElement('label');
        label.className = 'filter-checkbox';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = true;
        checkbox.value = type;
        checkbox.onchange = applyFilters;

        const span = document.createElement('span');
        span.textContent = type;

        label.appendChild(checkbox);
        label.appendChild(span);
        container.appendChild(label);
    });
}

function initializeLegend() {
    const legendContent = document.getElementById('legendContent');
    legendContent.innerHTML = '';

    // Group nodes by type and get color/shape info
    const typeInfo = {};
    allNodes.forEach(node => {
        if (!typeInfo[node.type]) {
            typeInfo[node.type] = {
                color: node.color || '#94a3b8',
                shape: node.shape || 'dot',
                icon: node.icon || null
            };
        }
    });

    // Create legend items
    Object.keys(typeInfo).sort().forEach(type => {
        const item = document.createElement('div');
        item.className = 'legend-item';

        const indicator = document.createElement('div');
        indicator.className = 'legend-indicator';

        if (typeInfo[type].icon) {
            indicator.innerHTML = `<img src="${typeInfo[type].icon}" style="width: 20px; height: 20px;" alt="${type}">`;
        } else {
            indicator.style.backgroundColor = typeInfo[type].color;
            indicator.style.borderRadius = typeInfo[type].shape === 'circle' ? '50%' : '3px';
        }

        const label = document.createElement('span');
        label.textContent = type;

        item.appendChild(indicator);
        item.appendChild(label);
        legendContent.appendChild(item);
    });
}

function initializeNetwork() {
    // Create vis.js DataSets
    nodes = new vis.DataSet(allNodes);
    edges = new vis.DataSet(allEdges);

    const container = document.getElementById('network');
    const data = { nodes, edges };

    const options = {
        nodes: {
            font: { size: 14, color: '#1e293b' },
            borderWidth: 2,
            borderWidthSelected: 4,
            shadow: true
        },
        edges: {
            width: 2,
            shadow: true,
            smooth: {
                type: 'continuous'
            }
        },
        physics: {
            enabled: true,
            stabilization: {
                iterations: 200
            },
            barnesHut: {
                gravitationalConstant: -4000,
                centralGravity: 0.3,
                springLength: 150,
                springConstant: 0.04,
                damping: 0.09,
                avoidOverlap: 0.5
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 100,
            navigationButtons: true,
            keyboard: true
        }
    };

    network = new vis.Network(container, data, options);

    // Disable physics after stabilization for better performance
    network.once('stabilizationIterationsDone', function() {
        network.setOptions({ physics: false });
    });

    // Set up event handlers
    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const nodeData = allNodes.find(n => n.id === nodeId);
            displayNodeDetails(nodeData);
        }
    });

    network.on('hoverNode', function(params) {
        const nodeData = allNodes.find(n => n.id === params.node);
        if (nodeData) {
            const tooltip = createTooltip(nodeData);
            network.canvas.body.container.title = tooltip;
        }
    });
}

function createTooltip(node) {
    let tooltip = `Type: ${node.type}\n`;
    if (node.properties) {
        tooltip += '\nProperties:\n';
        Object.entries(node.properties).forEach(([key, value]) => {
            tooltip += `  ${key}: ${value}\n`;
        });
    }
    return tooltip;
}

function displayNodeDetails(nodeData) {
    if (!nodeData) return;

    const detailsDiv = document.getElementById('nodeDetails');

    let html = `
        <div class="node-type">:${nodeData.type}</div>
        <div class="node-label">${nodeData.label}</div>
    `;

    if (nodeData.properties) {
        html += '<div class="properties-list">';
        Object.entries(nodeData.properties).forEach(([key, value]) => {
            html += `
                <div class="property-item">
                    <span class="property-key">${key}:</span>
                    <span class="property-value">${value}</span>
                </div>
            `;
        });
        html += '</div>';

        const propCount = Object.keys(nodeData.properties).length;
        html += `<div class="property-count">${propCount} ${propCount === 1 ? 'property' : 'properties'}</div>`;
    }

    detailsDiv.innerHTML = html;
}

function applyFilters() {
    const checkboxes = document.querySelectorAll('#filterCheckboxes input[type="checkbox"]');
    const selectedTypes = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    // Update nodes visibility
    allNodes.forEach(node => {
        const shouldShow = selectedTypes.includes(node.type);
        nodes.update({ id: node.id, hidden: !shouldShow });
    });

    // Update edges visibility based on visible nodes
    allEdges.forEach(edge => {
        const fromNode = nodes.get(edge.from);
        const toNode = nodes.get(edge.to);
        const shouldShow = !fromNode.hidden && !toNode.hidden;
        edges.update({ id: edge.id, hidden: !shouldShow });
    });
}

function searchNodes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    if (!searchTerm) {
        // Reset view
        network.fit();
        return;
    }

    // Find matching nodes
    const matchingNodes = allNodes.filter(node => {
        // Search in label
        if (node.label.toLowerCase().includes(searchTerm)) return true;

        // Search in properties
        if (node.properties) {
            return Object.values(node.properties).some(value =>
                String(value).toLowerCase().includes(searchTerm)
            );
        }

        return false;
    });

    if (matchingNodes.length > 0) {
        // Focus on the first matching node
        const nodeId = matchingNodes[0].id;
        network.focus(nodeId, {
            scale: 1.5,
            animation: {
                duration: 1000,
                easingFunction: 'easeInOutQuad'
            }
        });
        network.selectNodes([nodeId]);
        displayNodeDetails(matchingNodes[0]);
    } else {
        alert('No nodes found matching: ' + searchTerm);
    }
}

function selectAllFilters() {
    const checkboxes = document.querySelectorAll('#filterCheckboxes input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = true);
    applyFilters();
}

function unselectAllFilters() {
    const checkboxes = document.querySelectorAll('#filterCheckboxes input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    applyFilters();
}

function setupEventListeners() {
    // Enter key for search
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchNodes();
        }
    });
}
