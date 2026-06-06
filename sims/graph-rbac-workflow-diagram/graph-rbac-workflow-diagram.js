// Graph RBAC Workflow - Mermaid
// CANVAS_HEIGHT: 1087
// How a role-based access control decision is evaluated in a graph healthcare system:
// role check, patient-relationship check, break-glass override, filtered traversal,
// property-level redaction, and HIPAA audit logging. Left 2/3 flowchart, right 1/3 detail.

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
    A(["User Requests<br/>Patient Data"]):::start
    B["Extract User Context"]:::app
    C["Identify Required Data"]:::app
    D{"User has role?"}:::decision
    E["Return Access Denied"]:::deny
    F{"Patient relationship<br/>exists?"}:::decision
    G{"Break-glass<br/>override?"}:::decision
    H["Allow with Audit Alert"]:::alert
    I["Filter Graph Traversal"]:::ok
    J["Execute Cypher Query<br/>with Filters"]:::db
    K["Apply Property-Level<br/>Filtering"]:::db
    L["Log Access Event"]:::app
    M(["Return Filtered Results"]):::endok
    X(["Access Denied"]):::deny

    A --> B --> C --> D
    D -->|No| E --> X
    D -->|Yes| F
    F -->|Yes| I
    F -->|No| G
    G -->|No| E
    G -->|Yes| H --> J
    I --> J --> K --> L --> M

    classDef start fill:#2e7d8a,stroke:#1b4b54,stroke-width:2px,color:#fff,font-size:15px
    classDef app fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef decision fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef deny fill:#fbd0d0,stroke:#c0392b,stroke-width:2px,color:#7a1c14,font-size:15px
    classDef alert fill:#ffe0b3,stroke:#d2861a,stroke-width:2px,color:#6b3d08,font-size:15px
    classDef ok fill:#cdeccd,stroke:#2e7d32,stroke-width:2px,color:#143a16,font-size:15px
    classDef db fill:#f6d9b0,stroke:#c08a3e,stroke-width:2px,color:#5a3b13,font-size:15px
    classDef endok fill:#2e7d32,stroke:#1c5121,stroke-width:2px,color:#fff,font-size:15px
    linkStyle default stroke:#888,stroke-width:2px,font-size:14px`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="mm-container">
      <div class="mm-diagram"><div class="mermaid">${diagram}</div></div>
      <div class="mm-info">
        <h3>Step Details</h3>
        <div id="mm-display"><p class="ph">Hover over a step to see how the RBAC engine evaluates it.</p></div>
        <div class="mm-note">The patient-relationship check (TREATS / REFERRED_BY / CONSULTED edges) ensures a clinician can only reach patients they actually care for. Break-glass grants emergency access but always triggers an audit alert.</div>
      </div>
    </div>`);

  const nodeInfo = {
    A: { title: 'User Requests Patient Data', description: 'A clinician clicks on a patient record in the EHR interface.' },
    B: { title: 'Extract User Context', description: 'Retrieve the user ID, roles, facility, and specialty from the session token.' },
    C: { title: 'Identify Required Data', description: 'Determine which graph nodes and relationships are needed to fulfill the request.' },
    D: { title: 'User Has Role?', description: 'Check whether the user&rsquo;s role (physician, nurse, admin, billing) permits this data type.' },
    E: { title: 'Return Access Denied', description: 'Log the denial event and show an error message to the user.' },
    F: { title: 'Patient Relationship Exists?', description: 'Query the graph for a relationship: is the user an authorized provider for this patient via a TREATS, REFERRED_BY, or CONSULTED edge?' },
    G: { title: 'Break-Glass Override?', description: 'Emergency access: does the user invoke break-glass for a life-threatening situation?' },
    H: { title: 'Allow with Audit Alert', description: 'Grant access, trigger a compliance review, and notify the privacy officer.' },
    I: { title: 'Filter Graph Traversal', description: 'Inject WHERE clauses so the traversal follows authorized paths only — this prevents unauthorized relationship discovery through multi-hop traversals.' },
    J: { title: 'Execute Cypher Query with Filters', description: 'Run a filtered query, e.g. MATCH (p:Patient)-[r]->(n) WHERE p.id = $pid AND the user&rsquo;s role may traverse r.' },
    K: { title: 'Apply Property-Level Filtering', description: 'Remove sensitive properties (SSN, HIV status) based on the role&rsquo;s permissions.' },
    L: { title: 'Log Access Event', description: 'Record timestamp, user, patient, data accessed, and purpose-of-use for the HIPAA audit trail.' },
    M: { title: 'Return Filtered Results', description: 'Display the patient data to the user with appropriate redactions.' },
    X: { title: 'Access Denied', description: 'The request ends without data being returned; the denial is recorded.' }
  };

  mermaid.initialize({ startOnLoad: false, theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 28, rankSpacing: 34 } });
  mermaid.run({ querySelector: '.mermaid' }).then(setupHover);

  function setupHover() {
    const display = document.getElementById('mm-display');
    const def = '<p class="ph">Hover over a step to see how the RBAC engine evaluates it.</p>';
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
