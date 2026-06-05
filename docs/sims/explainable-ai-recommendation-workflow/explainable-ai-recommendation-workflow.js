// Explainable AI Recommendation Workflow - Mermaid
// CANVAS_HEIGHT: 989
// How a graph-based CDS produces an EXPLAINABLE medication recommendation: patient
// data and clinical knowledge converge in an inference engine, then an explanation
// is built, generated, displayed, and logged. Left 2/3 flowchart, right 1/3 detail.

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
    A(["Physician requests<br/>medication recommendation"]):::event
    B["Retrieve Patient Subgraph"]:::pdata
    C["Extract Clinical Features"]:::pdata
    D["Load Clinical Guidelines"]:::know
    E["Load Drug Info and<br/>Interactions"]:::know
    F["Apply Clinical<br/>Decision Rules"]:::infer
    G["Score and Rank Options"]:::infer
    H{"Confidence<br/>threshold met?"}:::decision
    P["Flag for Clinician Review"]:::pdata
    I["Build Explanation Graph"]:::expl
    J["Generate Natural-Language<br/>and Patient Explanations"]:::expl
    K["Display Recommendation<br/>in EHR"]:::present
    L["Log Explanation Access"]:::present
    M{"Physician accepts?"}:::decision
    N["Create Prescription Order"]:::present
    O["Record Rejection Reason"]:::feedback
    Z(["Recommendation Complete"]):::event

    A --> B --> C --> F
    A --> D --> E --> F
    F --> G --> H
    H -->|No| P --> Z
    H -->|Yes| I --> J --> K --> L --> M
    M -->|Accept| N --> Z
    M -->|Reject| O --> Z

    classDef event fill:#2e7d8a,stroke:#1b4b54,stroke-width:2px,color:#fff,font-size:15px
    classDef pdata fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef know fill:#cdeccd,stroke:#2e7d32,stroke-width:2px,color:#143a16,font-size:15px
    classDef infer fill:#ffe0b3,stroke:#d2861a,stroke-width:2px,color:#6b3d08,font-size:15px
    classDef decision fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef expl fill:#fdf6c9,stroke:#b8a52a,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef present fill:#e3d3f5,stroke:#7b3fb3,stroke-width:2px,color:#3d1c5e,font-size:15px
    classDef feedback fill:#fbd0d0,stroke:#c0392b,stroke-width:2px,color:#7a1c14,font-size:15px
    linkStyle default stroke:#888,stroke-width:2px,font-size:14px`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="mm-container">
      <div class="mm-diagram"><div class="mermaid">${diagram}</div></div>
      <div class="mm-info">
        <h3>Step Details</h3>
        <div id="mm-display"><p class="ph">Hover over a step. Blue = patient data, green = clinical knowledge, orange = inference, cream = explanation, purple = presentation.</p></div>
        <div class="mm-note">The two input columns (patient data and clinical knowledge) converge in the inference engine; the cream "explanation" steps are what make the recommendation transparent &mdash; a queryable reasoning path, natural-language rationale, and an audit log.</div>
      </div>
    </div>`);

  const nodeInfo = {
    A: { title: 'Physician Requests Recommendation', description: 'A physician opens the patient chart and asks for a medication recommendation (example: a Type 2 diabetes patient with CKD).' },
    B: { title: 'Retrieve Patient Subgraph', description: 'Query the graph for the patient and connected nodes within ~3 hops: demographics, current medications, diagnoses, labs, allergies, and recent encounters.' },
    C: { title: 'Extract Clinical Features', description: 'Identify features relevant to the decision: HbA1c trend, renal function (eGFR), current therapy, contraindications, and treatment goals.' },
    D: { title: 'Load Clinical Guidelines', description: 'Retrieve guideline nodes (e.g. ADA Standard of Care): first-line therapy, when to add a second agent, preferred agents for CKD.' },
    E: { title: 'Load Drug Info and Interactions', description: 'Retrieve candidate medication nodes with mechanism, contraindications, dosing, cost, and evidence, plus drug-disease interaction edges.' },
    F: { title: 'Apply Clinical Decision Rules', description: 'Execute the rule set from the knowledge graph against the patient data (max-dose metformin? HbA1c above target? CKD present? contraindications?).' },
    G: { title: 'Score and Rank Options', description: 'Multi-criteria scoring across efficacy, safety, guideline strength, renal/CV benefit, and cost produces a ranked list of medications.' },
    H: { title: 'Confidence Threshold Met?', description: 'Is the top recommendation\'s score high enough and the evidence strong? If not, flag for clinician review rather than auto-recommend.' },
    P: { title: 'Flag for Clinician Review', description: 'Low-confidence cases are surfaced for human judgment instead of a confident recommendation.' },
    I: { title: 'Build Explanation Graph', description: 'Construct a subgraph linking patient features &rarr; rules &rarr; evidence &rarr; scores &rarr; recommendation, so the reasoning path is explicit and queryable.' },
    J: { title: 'Generate Explanations', description: 'Translate the graph path into a clinician-facing natural-language rationale and a simplified patient-friendly version.' },
    K: { title: 'Display Recommendation in EHR', description: 'Render the recommendation with a confidence indicator and tabs for reasoning, evidence, patient data, alternatives, and the explanation graph.' },
    L: { title: 'Log Explanation Access', description: 'Record that the clinician viewed the explanation in the audit trail &mdash; explainability accountability.' },
    M: { title: 'Physician Accepts?', description: 'The clinician accepts and prescribes, or records a reason for choosing differently.' },
    N: { title: 'Create Prescription Order', description: 'Pre-populate the prescription with the recommended medication, dose, and frequency, linked to the recommendation ID for traceability.' },
    O: { title: 'Record Rejection Reason', description: 'Capture why the recommendation was not followed; the reason is stored in the graph to improve future recommendations.' },
    Z: { title: 'Recommendation Complete', description: 'The interaction is logged and a prescription created or an alternative documented.' }
  };

  mermaid.initialize({ startOnLoad: false, theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 26, rankSpacing: 32 } });
  mermaid.run({ querySelector: '.mermaid' }).then(setupHover);

  function setupHover() {
    const display = document.getElementById('mm-display');
    const def = '<p class="ph">Hover over a step. Blue = patient data, green = clinical knowledge, orange = inference, cream = explanation, purple = presentation.</p>';
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
