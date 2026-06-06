// Claims Lifecycle Workflow with Graph Database Integration - Mermaid
// CANVAS_HEIGHT: 1714
// Claim from submission to payment, with graph-database checks (green) at each
// adjudication gate. Every failed gate routes to a single "Claim Denied" outcome.
// Left 2/3 flowchart, right 1/3 hover detail.

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
    A(["Claim Submitted"]):::event
    B["Receive and Validate Claim"]:::proc
    C{"Valid format?"}:::decision
    D["Check Member Eligibility"]:::gquery
    E{"Member eligible?"}:::decision
    F["Check Network and<br/>Service Coverage"]:::gquery
    G{"Service covered?"}:::decision
    H{"Prior auth<br/>obtained?"}:::decision
    I["Calculate Allowed Amount<br/>and Cost-Sharing"]:::adjud
    J["Check YTD Accumulations"]:::gquery
    K["Run Claim Edits<br/>and Audits"]:::adjud
    L{"Passed all edits?"}:::decision
    M["Issue Payment and EOB"]:::pay
    N["Update Graph"]:::gquery
    Z(["Claim Paid"]):::event
    X(["Claim Denied"]):::deny

    A --> B --> C
    C -->|Invalid| X
    C -->|Valid| D --> E
    E -->|No| X
    E -->|Yes| F --> G
    G -->|No| X
    G -->|Yes| H
    H -->|No| X
    H -->|Yes / not required| I --> J --> K --> L
    L -->|No| X
    L -->|Yes| M --> N --> Z

    classDef event fill:#2e7d32,stroke:#1c5121,stroke-width:2px,color:#fff,font-size:15px
    classDef proc fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef gquery fill:#cdeccd,stroke:#2e7d32,stroke-width:2px,color:#143a16,font-size:15px
    classDef adjud fill:#e3d3f5,stroke:#7b3fb3,stroke-width:2px,color:#3d1c5e,font-size:15px
    classDef pay fill:#ffe0b3,stroke:#d2861a,stroke-width:2px,color:#6b3d08,font-size:15px
    classDef decision fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef deny fill:#fbd0d0,stroke:#c0392b,stroke-width:2px,color:#7a1c14,font-size:15px
    linkStyle default stroke:#888,stroke-width:2px,font-size:14px`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="mm-container">
      <div class="mm-diagram"><div class="mermaid">${diagram}</div></div>
      <div class="mm-info">
        <h3>Step Details</h3>
        <div id="mm-display"><p class="ph">Hover over a step. Green steps are graph-database operations.</p></div>
        <div class="mm-note">Each adjudication gate is a graph traversal: eligibility (Member &rarr; Policy), network and coverage (Provider/Plan &rarr; Service), and accumulations (sum of prior paid claims this year). Any failed gate sends the claim to a single denied outcome with a specific reason.</div>
      </div>
    </div>`);

  const nodeInfo = {
    A: { title: 'Claim Submitted', description: 'A provider submits an electronic EDI 837 claim (or a member submits a paper claim).' },
    B: { title: 'Receive and Validate Claim', description: 'Parse structured data (patient, provider, diagnosis, procedure codes, charges) and check required fields and valid code sets.' },
    C: { title: 'Valid Format?', description: 'Are all required fields present and properly formatted? If not, the claim is returned as a correctable rejection.' },
    D: { title: 'Check Member Eligibility (graph)', description: 'Traversal: Member &rarr; ENROLLED_IN &rarr; Policy &rarr; was it active on the service dates?' },
    E: { title: 'Member Eligible?', description: 'If the member was not covered on the service dates, deny for no coverage.' },
    F: { title: 'Check Network and Service Coverage (graph)', description: 'Traversals: Provider &rarr; IN_NETWORK &rarr; Payer, and BenefitPlan &rarr; COVERS &rarr; service category (with coverage %, limits, and prior-auth flag).' },
    G: { title: 'Service Covered?', description: 'Is the procedure covered under the member&rsquo;s benefit plan? If not, deny as a non-covered service.' },
    H: { title: 'Prior Auth Obtained?', description: 'If the service requires prior authorization, was an approved authorization found in the graph? If required but missing, deny.' },
    I: { title: 'Calculate Allowed Amount and Cost-Sharing', description: 'Determine the maximum payable from fee schedules and contracts, then apply deductible, copay, and coinsurance.' },
    J: { title: 'Check YTD Accumulations (graph)', description: 'Graph aggregation: sum the member&rsquo;s prior paid claims this year to track deductible and out-of-pocket totals.' },
    K: { title: 'Run Claim Edits and Audits', description: 'Apply coding edits (NCCI, MUE), duplicate checks, medical-necessity edits, and fraud algorithms.' },
    L: { title: 'Passed All Edits?', description: 'If edits fail, the claim is denied or pended for manual review (e.g. bundling errors, medical necessity).' },
    M: { title: 'Issue Payment and EOB', description: 'Generate provider payment (EFT or check) and an explanation of benefits for the member.' },
    N: { title: 'Update Graph', description: 'Create the Claim node, connect it to Member, Provider, Diagnoses, and Procedures, and update accumulator properties.' },
    Z: { title: 'Claim Paid', description: 'The claim is processed and payment issued; data is available for analytics and reporting.' },
    X: { title: 'Claim Denied', description: 'The claim stops at the first failed gate — invalid format, no coverage, non-covered service, missing prior auth, or an edit failure — each returned with a specific reason.' }
  };

  mermaid.initialize({ startOnLoad: false, theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 28, rankSpacing: 32 } });
  mermaid.run({ querySelector: '.mermaid' }).then(setupHover);

  function setupHover() {
    const display = document.getElementById('mm-display');
    const def = '<p class="ph">Hover over a step. Green steps are graph-database operations.</p>';
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
