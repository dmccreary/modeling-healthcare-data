// Clinical Decision Support Workflow - Mermaid
// CANVAS_HEIGHT: 1260
// Graph-based CDS: how a medication order is checked against the patient graph and
// knowledge graph, filtered for alert fatigue, and surfaced to the clinician.
// Left 2/3 = flowchart; right 1/3 = hover detail panel.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .cds-container { display: flex; width: 100%; gap: 0; }
    .cds-diagram { width: 64%; background: aliceblue; padding: 10px; box-sizing: border-box; }
    .cds-diagram .mermaid { width: 100%; }
    .cds-diagram svg { max-width: 100%; height: auto; }
    .cds-info { width: 36%; background: #f8f9fa; border-left: 1px solid #dee2e6;
                padding: 14px 16px; box-sizing: border-box; }
    .cds-info h3 { font-size: 17px; color: #2c3e50; margin: 0 0 8px; padding-bottom: 6px;
                   border-bottom: 2px solid #2e7d8a; }
    .cds-info .title { font-size: 15px; font-weight: bold; color: #2e7d8a; margin-bottom: 6px; }
    .cds-info .content { font-size: 13.5px; line-height: 1.5; color: #333; }
    .cds-info .ph { color: #888; font-style: italic; font-size: 13.5px; }
    .cds-note { font-size: 12px; color: #555; margin-top: 14px; border-top: 1px dashed #ccc; padding-top: 8px; }
    .node { cursor: pointer; }
    .node:hover rect, .node:hover polygon, .node:hover circle { filter: brightness(1.08); }
  `;
  document.head.appendChild(style);

  const diagram = `flowchart TD
    A(["Medication Order Entered"]):::event
    B["Retrieve Patient Graph"]:::data
    C["Query Knowledge Graph"]:::data
    D{"Safety issue?"}:::decision
    E["Silent Approval"]:::data
    F["Calculate Clinical<br/>Significance"]:::feedback
    G{"Severe and novel?"}:::decision
    H["Log Only"]:::data
    I["Generate Contextualized<br/>Alert"]:::safety
    J["Review Alert<br/>with Evidence"]:::clinician
    K{"Accept?"}:::decision
    L["Modify Order"]:::clinician
    M["Override with<br/>Justification"]:::clinician
    N["Learn from Decision"]:::feedback
    Z(["Order Finalized"]):::event

    A --> B --> C --> D
    D -->|No| E --> Z
    D -->|Yes| F --> G
    G -->|No| H --> Z
    G -->|Yes| I --> J --> K
    K -->|Accept| L --> N
    K -->|Override| M --> N
    N --> Z

    classDef event fill:#2e7d8a,stroke:#1b4b54,stroke-width:2px,color:#fff,font-size:15px
    classDef data fill:#cdeccd,stroke:#2e7d32,stroke-width:2px,color:#143a16,font-size:15px
    classDef decision fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef safety fill:#fbd0d0,stroke:#c0392b,stroke-width:2px,color:#7a1c14,font-size:15px
    classDef clinician fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef feedback fill:#e3d3f5,stroke:#7b3fb3,stroke-width:2px,color:#3d1c5e,font-size:15px
    linkStyle default stroke:#888,stroke-width:2px,font-size:14px`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="cds-container">
      <div class="cds-diagram"><div class="mermaid">${diagram}</div></div>
      <div class="cds-info">
        <h3>Step Details</h3>
        <div id="cds-display"><p class="ph">Hover over a step to see what the graph-based CDS system does.</p></div>
        <div class="cds-note">Context-aware filtering on the patient graph reduces alert fatigue by an estimated 60-80% by surfacing only novel, high-severity issues.</div>
      </div>
    </div>`);

  const nodeInfo = {
    A: { title: 'Medication Order Entered', description: 'A physician orders a new medication for the patient, triggering the clinical decision support pipeline.' },
    B: { title: 'Retrieve Patient Graph', description: 'Load the complete patient context: diagnoses, current medications, allergies, recent labs, and social factors.' },
    C: { title: 'Query Knowledge Graph', description: 'Traverse relationships for drug-drug interactions, contraindications, and dosing guidelines specific to this patient&rsquo;s conditions.' },
    D: { title: 'Safety Issues Detected?', description: 'Check for drug-drug interactions, drug-disease contraindications, allergy conflicts, and dosing concerns.' },
    E: { title: 'Silent Approval', description: 'When the order is safe, it proceeds without interrupting the clinician&rsquo;s workflow.' },
    F: { title: 'Calculate Clinical Significance', description: 'Use patient context to decide whether the alert is actionable: is this a known stable situation? Is there a documented override reason?' },
    G: { title: 'High Severity and Novel?', description: 'Filter alert fatigue by showing only novel, high-risk issues that have not already been addressed.' },
    H: { title: 'Log Only', description: 'Record the concern for the record without interrupting the clinician&rsquo;s workflow.' },
    I: { title: 'Generate Contextualized Alert', description: 'An LLM creates a tailored explanation, e.g. &ldquo;This medication may worsen renal function. The patient&rsquo;s GFR has declined 15% over 3 months. Consider a dose adjustment or alternative.&rdquo;' },
    J: { title: 'Review Alert with Evidence', description: 'The clinician sees the severity, clinical reasoning, supporting evidence, and alternative options together.' },
    K: { title: 'Accept Recommendation?', description: 'The clinician decides whether to follow the recommendation or proceed with justification.' },
    L: { title: 'Modify Order', description: 'Choose an alternative medication or adjust the dose in response to the alert.' },
    M: { title: 'Override with Justification', description: 'Document the clinical reasoning for proceeding despite the alert.' },
    N: { title: 'Learn from Decision', description: 'Feedback improves future alert relevance; well-justified overrides reduce similar future alerts.' },
    Z: { title: 'Order Finalized', description: 'A safe, evidence-based medication order is processed.' }
  };

  mermaid.initialize({ startOnLoad: false, theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 28, rankSpacing: 34 } });

  mermaid.run({ querySelector: '.mermaid' }).then(setupHover);

  function setupHover() {
    const display = document.getElementById('cds-display');
    const def = '<p class="ph">Hover over a step to see what the graph-based CDS system does.</p>';
    document.querySelectorAll('.cds-diagram .node').forEach(node => {
      const id = node.id.replace('flowchart-', '').split('-')[0];
      if (!nodeInfo[id]) return;
      node.addEventListener('mouseenter', () => {
        display.innerHTML = '<div class="title">' + nodeInfo[id].title + '</div><div class="content">' + nodeInfo[id].description + '</div>';
      });
      node.addEventListener('mouseleave', () => { display.innerHTML = def; });
    });
  }
});
