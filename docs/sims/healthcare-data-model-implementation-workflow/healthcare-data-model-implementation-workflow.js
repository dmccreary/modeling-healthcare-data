// Healthcare Data Model Implementation Workflow - Mermaid
// CANVAS_HEIGHT: 1558
// End-to-end process of implementing a healthcare graph data model: from entity
// modeling through schema validation, security review, performance testing, and
// production deployment, with rework loops. Left 2/3 flowchart, right 1/3 detail.

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
    .mm-info .ph { color: #888; font-style: italic; font-size: 13.5px; }
    .mm-note { font-size: 12px; color: #555; margin-top: 14px; border-top: 1px dashed #ccc; padding-top: 8px; }
    .node { cursor: pointer; }
    .node:hover rect, .node:hover polygon, .node:hover circle { filter: brightness(1.08); }
  `;
  document.head.appendChild(style);

  const diagram = `flowchart TD
    A(["Project Initiated"]):::event
    B["Identify Entities and<br/>Relationships"]:::task
    C["Define Node Labels<br/>and Properties"]:::task
    D["Define Edge Types<br/>and Properties"]:::task
    E{"Schema supports<br/>key queries?"}:::decision
    F["Implement Model in<br/>Graph Database"]:::task
    G["Develop ETL Pipelines"]:::task
    H["Conduct Security Review"]:::task
    I{"Security<br/>compliant?"}:::decision
    J["Load Test Data"]:::task
    K["Execute Performance<br/>Testing"]:::task
    L{"Performance<br/>acceptable?"}:::decision
    M["Deploy to Production"]:::task
    N["Establish Monitoring<br/>and Maintenance"]:::task
    Z(["Graph Database<br/>Operational"]):::event

    A --> B --> C --> D --> E
    E -->|No| C
    E -->|Yes| F --> G --> H --> I
    I -->|No| F
    I -->|Yes| J --> K --> L
    L -->|No: optimize| F
    L -->|Yes| M --> N --> Z

    classDef event fill:#2e7d32,stroke:#1c5121,stroke-width:2px,color:#fff,font-size:15px
    classDef task fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef decision fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    linkStyle default stroke:#888,stroke-width:2px,font-size:14px`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="mm-container">
      <div class="mm-diagram"><div class="mermaid">${diagram}</div></div>
      <div class="mm-info">
        <h3>Step Details</h3>
        <div id="mm-display"><p class="ph">Hover over a step to see the activity and which team owns it.</p></div>
        <div class="mm-note">Three decision gates create rework loops: a schema that cannot answer priority queries returns to property design, a security failure returns to implementation, and slow traversals trigger index/schema optimization. Data models evolve with requirements.</div>
      </div>
    </div>`);

  const nodeInfo = {
    A: { title: 'Project Initiated (Stakeholders)', description: 'A project sponsor identifies the need for a graph database to support clinical decision support and care coordination.' },
    B: { title: 'Identify Entities and Relationships (Clinical SMEs)', description: 'Clinical subject-matter experts identify critical entities (patients, providers, medications, diagnoses) and how they relate.' },
    C: { title: 'Define Node Labels and Properties (Data Architects)', description: 'Architects translate business entities into node labels (Patient, Provider, Medication) with appropriate properties.' },
    D: { title: 'Define Edge Types and Properties (Data Architects)', description: 'Define relationship types (PRESCRIBED, DIAGNOSED_WITH, TREATS) with contextual properties such as dates and quantities.' },
    E: { title: 'Schema Supports Key Queries?', description: 'Validate that the schema can efficiently answer priority use cases like drug-interaction checks and care-pathway analysis. If not, return to property design.' },
    F: { title: 'Implement Model in Graph Database (Dev Team)', description: 'Create the schema, constraints, and indexes in Neo4j or the chosen graph platform.' },
    G: { title: 'Develop ETL Pipelines (Dev Team)', description: 'Build ingestion pipelines that populate the graph from EHR, claims, and pharmacy source systems.' },
    H: { title: 'Conduct Security Review (Compliance)', description: 'Verify HIPAA compliance, access controls, audit logging, and encryption requirements are met.' },
    I: { title: 'Security Compliant?', description: 'Ensure all HIPAA and organizational security policies are satisfied; if not, return to implementation.' },
    J: { title: 'Load Test Data (Dev Team)', description: 'Populate the database with representative test data for performance and functional testing.' },
    K: { title: 'Execute Performance Testing (DBAs)', description: 'Run benchmark queries to confirm response times meet the SLA for clinical applications.' },
    L: { title: 'Performance Acceptable?', description: 'Verify multi-hop traversals execute in under ~100ms for real-time decision support; if not, optimize indexes/schema and re-implement.' },
    M: { title: 'Deploy to Production (DBAs)', description: 'Deploy the graph database to production with monitoring and backup configurations.' },
    N: { title: 'Establish Monitoring and Maintenance (DBAs)', description: 'Configure query-performance monitoring, alerting, and a regular maintenance schedule.' },
    Z: { title: 'Graph Database Operational', description: 'The graph database is live and supporting clinical applications.' }
  };

  mermaid.initialize({ startOnLoad: false, theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 28, rankSpacing: 34 } });
  mermaid.run({ querySelector: '.mermaid' }).then(setupHover);

  function setupHover() {
    const display = document.getElementById('mm-display');
    const def = '<p class="ph">Hover over a step to see the activity and which team owns it.</p>';
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
