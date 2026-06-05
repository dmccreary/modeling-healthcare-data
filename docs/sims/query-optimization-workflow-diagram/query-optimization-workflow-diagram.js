// Query Optimization Workflow - Mermaid
// CANVAS_HEIGHT: 505
// A systematic decision tree for optimizing slow healthcare graph queries: profile,
// then check indexing, label scans, unbounded traversals, result size, and
// aggregations, each fix looping back to re-profile. Left 2/3 flowchart, right 1/3 detail.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .mm-container { display: flex; width: 100%; }
    .mm-diagram { width: 64%; background: aliceblue; padding: 10px; box-sizing: border-box; }
    .mm-diagram .mermaid { width: 100%; }
    .mm-diagram svg { max-width: 100%; height: auto; }
    .mm-info { width: 36%; background: #f8f9fa; border-left: 1px solid #dee2e6; padding: 14px 16px; box-sizing: border-box; }
    .mm-info h3 { font-size: 17px; color: #2c3e50; margin: 0 0 8px; padding-bottom: 6px; border-bottom: 2px solid #2e7d8a; }
    .mm-info .title { font-size: 15px; font-weight: bold; color: #2e7d8a; margin-bottom: 6px; }
    .mm-info .content { font-size: 13.5px; line-height: 1.5; color: #333; }
    .mm-info .content code { background:#eef1f4; padding:1px 4px; border-radius:3px; font-size:12px; }
    .mm-info .ph { color: #888; font-style: italic; font-size: 13.5px; }
    .mm-note { font-size: 12px; color: #555; margin-top: 14px; border-top: 1px dashed #ccc; padding-top: 8px; }
    .node { cursor: pointer; }
    .node:hover rect, .node:hover polygon, .node:hover circle { filter: brightness(1.08); }
  `;
  document.head.appendChild(style);

  const diagram = `flowchart TD
    A(["Slow Query Identified"]):::event
    B["Run PROFILE Analysis"]:::analyze
    C{"Index available?"}:::decision
    C2["Create Appropriate Index"]:::fix
    D{"Scanning full<br/>node labels?"}:::decision
    D2["Add Anchoring Filters"]:::fix
    E{"Unbounded<br/>traversals?"}:::decision
    E2["Add Path-Length Bounds"]:::fix
    F{"Large result set?"}:::decision
    F2["Add Pagination"]:::fix
    G{"Complex<br/>aggregations?"}:::decision
    G2["Split into Subqueries"]:::fix
    H["Consider Schema<br/>Optimization"]:::schema
    Z(["Query Optimized"]):::event

    A --> B --> C
    C -->|No| C2 --> B
    C -->|Yes| D
    D -->|Yes| D2 --> B
    D -->|No| E
    E -->|Yes| E2 --> B
    E -->|No| F
    F -->|Yes| F2 --> B
    F -->|No| G
    G -->|Yes| G2 --> B
    G -->|No| H --> Z

    classDef event fill:#2e7d8a,stroke:#1b4b54,stroke-width:2px,color:#fff,font-size:15px
    classDef analyze fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef decision fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef fix fill:#cdeccd,stroke:#2e7d32,stroke-width:2px,color:#143a16,font-size:15px
    classDef schema fill:#ffe0b3,stroke:#d2861a,stroke-width:2px,color:#6b3d08,font-size:15px
    linkStyle default stroke:#888,stroke-width:2px,font-size:14px`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="mm-container">
      <div class="mm-diagram"><div class="mermaid">${diagram}</div></div>
      <div class="mm-info">
        <h3>Step Details</h3>
        <div id="mm-display"><p class="ph">Hover over a step to see what to check and the Cypher fix to apply.</p></div>
        <div class="mm-note">Work the checks in order &mdash; each green fix loops back to re-PROFILE so you measure the effect before moving on. Targets: &lt;100ms for real-time queries, &lt;5s for interactive analytics. Schema changes are the last resort.</div>
      </div>
    </div>`);

  const nodeInfo = {
    A: { title: 'Slow Query Identified', description: 'A user reports a query taking more than ~5 seconds or timing out.' },
    B: { title: 'Run PROFILE Analysis', description: 'Execute the query with the PROFILE keyword to gather execution statistics — db hits, rows, and which operators dominate.<br><code>PROFILE MATCH (p:Patient)... RETURN p</code>' },
    C: { title: 'Index Available?', description: 'Does the query use indexed properties for its anchor nodes?' },
    C2: { title: 'Create Appropriate Index', description: 'Add a property or composite index on the filter properties, then re-profile.<br><code>CREATE INDEX FOR (p:Patient) ON (p.mrn)</code>' },
    D: { title: 'Scanning Full Node Labels?', description: 'Does the query match a label such as (p:Patient) without property filters, forcing a full label scan?' },
    D2: { title: 'Add Anchoring Filters', description: 'Rewrite the query to start from a specific indexed node.<br><code>WHERE p.patient_id = $id</code>' },
    E: { title: 'Unbounded Traversals?', description: 'Are there variable-length paths without a maximum depth (e.g. * or *1..)?' },
    E2: { title: 'Add Path-Length Bounds', description: 'Set a maximum traversal depth to prevent exponential expansion.<br><code>-[:REL*1..5]-&gt;</code>' },
    F: { title: 'Large Result Set?', description: 'Does the query return more than ~10,000 rows?' },
    F2: { title: 'Add Pagination', description: 'Use SKIP / LIMIT to page results and return only what is needed.<br><code>RETURN p SKIP $offset LIMIT $page_size</code>' },
    G: { title: 'Complex Aggregations?', description: 'Are there multiple collect(), count(), or statistical functions competing in one query?' },
    G2: { title: 'Split into Subqueries', description: 'Use CALL { ... } subqueries to control aggregation order and isolate expensive steps.' },
    H: { title: 'Consider Schema Optimization', description: 'As a last resort, denormalize frequently-accessed properties or restructure relationships — this may require data-model changes.' },
    Z: { title: 'Query Optimized', description: 'The query now meets its performance target: under ~100ms for real-time, under ~5s for analytics.' }
  };

  mermaid.initialize({ startOnLoad: false, theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 26, rankSpacing: 32 } });
  mermaid.run({ querySelector: '.mermaid' }).then(setupHover);

  function setupHover() {
    const display = document.getElementById('mm-display');
    const def = '<p class="ph">Hover over a step to see what to check and the Cypher fix to apply.</p>';
    document.querySelectorAll('.mm-diagram .node').forEach(node => {
      const id = node.id.replace('flowchart-', '').split('-')[0];
      if (!nodeInfo[id]) return;
      node.addEventListener('mouseenter', () => {
        display.innerHTML = '<div class="title">' + nodeInfo[id].title + '</div><div class="content">' + nodeInfo[id].description + '</div>';
      });
      node.addEventListener('mouseleave', () => { display.innerHTML = def; });
    });
  }
});
