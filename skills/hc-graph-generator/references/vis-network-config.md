# Vis-Network Configuration Reference

This document provides the standard vis-network configuration options used in IT graph microsims.

## Network Options

### Physics Configuration

The physics engine uses the Barnes-Hut algorithm for force-directed layout:

```javascript
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
}
```

**Key Parameters:**

- **gravitationalConstant**: Controls repulsion between nodes (negative = repulsive)
- **centralGravity**: Pulls nodes toward center (0.3 = moderate centering)
- **springLength**: Natural length of edges (150px)
- **springConstant**: Edge stiffness (0.04 = flexible)
- **damping**: Motion damping (0.09 = smooth)
- **avoidOverlap**: Prevents node overlap (0.5 = moderate)

### Interaction Options

```javascript
interaction: {
  hover: true,
  tooltipDelay: 100,
  navigationButtons: true,
  keyboard: true
}
```

- **hover**: Enable hover events for tooltips
- **tooltipDelay**: Milliseconds before tooltip appears
- **navigationButtons**: Show zoom/pan controls
- **keyboard**: Enable keyboard navigation

### Node Styling

```javascript
nodes: {
  font: { size: 14, color: '#1e293b' },
  borderWidth: 2,
  borderWidthSelected: 4,
  shadow: true
}
```

### Edge Styling

```javascript
edges: {
  width: 2,
  shadow: true,
  smooth: {
    type: 'continuous'
  }
}
```

## Performance Optimization

After the network stabilizes, disable physics for better performance:

```javascript
network.once('stabilizationIterationsDone', function() {
  network.setOptions({ physics: false });
});
```

## Event Handlers

### Click Event

```javascript
network.on('click', function(params) {
  if (params.nodes.length > 0) {
    const nodeId = params.nodes[0];
    // Handle node click
  }
});
```

### Hover Event

```javascript
network.on('hoverNode', function(params) {
  const nodeData = allNodes.find(n => n.id === params.node);
  // Display tooltip
});
```

## Network Methods

### Focus on a Node

```javascript
network.focus(nodeId, {
  scale: 1.5,
  animation: {
    duration: 1000,
    easingFunction: 'easeInOutQuad'
  }
});
```

### Select Nodes

```javascript
network.selectNodes([nodeId]);
```

### Fit View

```javascript
network.fit(); // Fit all nodes in view
```

## DataSet Operations

### Creating DataSets

```javascript
const nodes = new vis.DataSet(nodesArray);
const edges = new vis.DataSet(edgesArray);
```

### Updating Items

```javascript
nodes.update({ id: nodeId, hidden: true });
edges.update({ id: edgeId, hidden: false });
```

### Getting Items

```javascript
const node = nodes.get(nodeId);
const allNodesArray = nodes.get();
```
