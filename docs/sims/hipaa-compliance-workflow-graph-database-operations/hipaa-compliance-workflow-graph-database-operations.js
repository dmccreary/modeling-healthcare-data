// HIPAA Compliance Workflow for Graph Database Operations - Mermaid
// CANVAS_HEIGHT: 1169
// The compliance checkpoints required when accessing PHI in a healthcare graph
// database: authentication, authorization, row-level security, minimum-necessary
// filtering, and immutable audit logging. Left 2/3 flowchart, right 1/3 detail.

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
    A(["User Requests<br/>Patient Data"]):::event
    B["Authenticate User (MFA)"]:::app
    C{"Authentication<br/>valid?"}:::decision
    D["Check Roles and<br/>Permissions"]:::app
    E{"Authorized for<br/>this data?"}:::decision
    F["Execute Graph Query with<br/>Row-Level Security"]:::db
    G["Filter PHI: Minimum<br/>Necessary Rule"]:::app
    H["Log Access to<br/>Audit Trail"]:::audit
    I["Display Data with<br/>Sensitivity Watermark"]:::app
    J["Set 15-min Session<br/>Timeout"]:::app
    Z(["User Completes Task"]):::event
    X(["Access Denied"]):::deny

    A --> B --> C
    C -->|Invalid| X
    C -->|Valid| D --> E
    E -->|No| X
    E -->|Yes| F --> G --> H --> I --> J --> Z

    classDef event fill:#2e7d32,stroke:#1c5121,stroke-width:2px,color:#fff,font-size:15px
    classDef app fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef decision fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef db fill:#ffe0b3,stroke:#d2861a,stroke-width:2px,color:#6b3d08,font-size:15px
    classDef audit fill:#e3d3f5,stroke:#7b3fb3,stroke-width:2px,color:#3d1c5e,font-size:15px
    classDef deny fill:#fbd0d0,stroke:#c0392b,stroke-width:2px,color:#7a1c14,font-size:15px
    linkStyle default stroke:#888,stroke-width:2px,font-size:14px`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="mm-container">
      <div class="mm-diagram"><div class="mermaid">${diagram}</div></div>
      <div class="mm-info">
        <h3>Step Details</h3>
        <div id="mm-display"><p class="ph">Hover over a step to see the HIPAA control it enforces.</p></div>
        <div class="mm-note">Every PHI access passes three gates &mdash; authentication (who you are), authorization (need-to-know), and minimum-necessary filtering (only what the purpose requires) &mdash; and is written to an immutable audit trail. Failures at either decision end in denial.</div>
      </div>
    </div>`);

  const nodeInfo = {
    A: { title: 'User Requests Patient Data', description: 'A healthcare professional initiates a query for patient information through the clinical application.' },
    B: { title: 'Authenticate User (MFA)', description: 'Verify credentials against Active Directory or the SSO provider; multi-factor authentication is required for PHI access.' },
    C: { title: 'Authentication Valid?', description: 'Are the credentials valid and the account active? Failed attempts are logged and security is notified if a threshold is exceeded.' },
    D: { title: 'Check Roles and Permissions', description: 'Query the RBAC system to determine what data this role (physician, nurse, admin) and department may access.' },
    E: { title: 'Authorized for This Data?', description: 'Verify a legitimate need-to-know for this specific patient based on a treatment relationship or other permitted purpose.' },
    F: { title: 'Execute Graph Query with Row-Level Security', description: 'Run a parameterized Cypher query whose access controls filter results to only the authorized nodes and relationships.' },
    G: { title: 'Filter PHI: Minimum Necessary', description: 'Return only the minimum PHI needed for the stated purpose (e.g. scheduling sees demographics, not full medical history).' },
    H: { title: 'Log Access to Audit Trail', description: 'Record user ID, timestamp, patient ID, data accessed, purpose, and IP address in an immutable audit log.' },
    I: { title: 'Display Data to User', description: 'Render the information in the application with watermarks indicating PHI sensitivity.' },
    J: { title: 'Set Session Timeout', description: 'Enforce automatic logout after 15 minutes of inactivity to protect unattended workstations.' },
    Z: { title: 'User Completes Task', description: 'The professional reviews the data and completes the clinical workflow.' },
    X: { title: 'Access Denied', description: 'Access stops at the failed gate — invalid authentication or insufficient permissions — with the failure logged (user ID, requested resource, timestamp).' }
  };

  mermaid.initialize({ startOnLoad: false, theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 28, rankSpacing: 34 } });
  mermaid.run({ querySelector: '.mermaid' }).then(setupHover);

  function setupHover() {
    const display = document.getElementById('mm-display');
    const def = '<p class="ph">Hover over a step to see the HIPAA control it enforces.</p>';
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
