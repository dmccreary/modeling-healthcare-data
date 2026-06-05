// Clinical Protocol Workflow: Chest Pain Evaluation - Mermaid
// CANVAS_HEIGHT: 729
// Chest-pain protocol modeled as a graph of decision points: STEMI vs HEART-score
// risk stratification, troponin testing, and disposition. Color = risk pathway.
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
    A(["Patient arrives with<br/>chest pain"]):::event
    B["Vitals, 12-lead ECG,<br/>IV, cardiac monitor"]:::diag
    C{"STEMI on ECG?"}:::decision
    D["Activate cath lab,<br/>antiplatelets, primary PCI"]:::critical
    E["Calculate HEART score"]:::diag
    F{"HEART score?"}:::decision
    G["Low risk: troponin 0/2h,<br/>outpatient testing, discharge"]:::low
    H["Moderate: serial troponins,<br/>observation, stress test"]:::moderate
    I["High: serial troponins,<br/>cardiology consult, admit"]:::high
    J{"Troponin elevated?"}:::decision
    K["NSTEMI / unstable angina:<br/>antiplatelet + anticoagulation"]:::critical
    L["Non-cardiac: consider PE,<br/>GERD, MSK; possible discharge"]:::diag
    M["Disposition and<br/>cardiology follow-up"]:::treat
    Z(["Outcome tracked<br/>in graph"]):::event

    A --> B --> C
    C -->|Yes| D --> Z
    C -->|No| E --> F
    F -->|0-3 Low| G
    F -->|4-6 Moderate| H
    F -->|7-10 High| I
    G --> J
    H --> J
    I --> J
    J -->|Yes| K --> M
    J -->|No| L --> M
    M --> Z

    classDef event fill:#2e7d8a,stroke:#1b4b54,stroke-width:2px,color:#fff,font-size:15px
    classDef diag fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef decision fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef low fill:#cdeccd,stroke:#2e7d32,stroke-width:2px,color:#143a16,font-size:15px
    classDef moderate fill:#fdf0b0,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef high fill:#ffd9b0,stroke:#d2861a,stroke-width:2px,color:#6b3d08,font-size:15px
    classDef critical fill:#fbd0d0,stroke:#c0392b,stroke-width:2px,color:#7a1c14,font-size:15px
    classDef treat fill:#e3d3f5,stroke:#7b3fb3,stroke-width:2px,color:#3d1c5e,font-size:15px
    linkStyle default stroke:#888,stroke-width:2px,font-size:14px`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="mm-container">
      <div class="mm-diagram"><div class="mermaid">${diagram}</div></div>
      <div class="mm-info">
        <h3>Step Details</h3>
        <div id="mm-display"><p class="ph">Hover over a step to see clinical detail, time targets, and rationale.</p></div>
        <div class="mm-note">Modeling the protocol as a graph lets the system capture timestamp properties (e.g. ECG at 7 min, target &lt;10) and detect protocol deviations in real time. Pathway color = risk: green low, yellow moderate, orange high, red STEMI/ACS.</div>
      </div>
    </div>`);

  const nodeInfo = {
    A: { title: 'Patient Arrives with Chest Pain', description: 'ED triage assigns ESI Level 2 (high risk) and activates the chest-pain protocol.' },
    B: { title: 'Immediate Actions (0-10 min)', description: 'Obtain vital signs and a 12-lead ECG, establish IV access, and start continuous cardiac monitoring. The graph records the ECG timestamp (target &lt;10 min).' },
    C: { title: 'STEMI on ECG?', description: 'Does the ECG show ST-elevation myocardial infarction? If yes, take the critical pathway directly to the cath lab.' },
    D: { title: 'STEMI Pathway', description: 'Activate the catheterization lab, give antiplatelet therapy (aspirin + P2Y12 inhibitor), and prepare for primary PCI. Door-to-balloon target &lt;90 minutes.' },
    E: { title: 'Calculate HEART Score', description: 'For non-STEMI presentations, compute the HEART score from History, ECG, Age, Risk factors, and Troponin.' },
    F: { title: 'HEART Score?', description: 'The score stratifies risk into low (0-3), moderate (4-6), and high (7-10) pathways.' },
    G: { title: 'Low Risk (HEART 0-3)', description: 'Troponin at 0 and 2 hours, outpatient stress test or coronary CTA, discharge with cardiology follow-up. &lt;2% risk of MACE at 6 weeks.' },
    H: { title: 'Moderate Risk (HEART 4-6)', description: 'Serial troponins (0, 2, 4 h), admit to observation, stress test before discharge. 12-20% MACE risk.' },
    I: { title: 'High Risk (HEART 7-10)', description: 'Serial troponins, cardiology consult, admit to cardiology, coronary angiography within 24-72 h. &gt;50% MACE risk.' },
    J: { title: 'Troponin Elevated?', description: 'An elevated troponin confirms acute coronary syndrome and changes the disposition.' },
    K: { title: 'NSTEMI / Unstable Angina', description: 'Diagnosis of NSTEMI or unstable angina: antiplatelet plus anticoagulation, cardiology consult, and inpatient admission.' },
    L: { title: 'Non-Cardiac Chest Pain', description: 'Consider alternative diagnoses (PE, GERD, musculoskeletal), run the PE protocol if indicated, and consider discharge with follow-up.' },
    M: { title: 'Disposition and Follow-up', description: 'Discharge, observation, or admission, with cardiology follow-up within 7 days, stress test scheduled, and medication reconciliation. The graph ensures follow-up is booked before discharge.' },
    Z: { title: 'Outcome Tracked in Graph', description: 'Disposition, timing metrics, and outcomes are stored on the graph for protocol-adherence and outcome analysis.' }
  };

  mermaid.initialize({ startOnLoad: false, theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 26, rankSpacing: 32 } });
  mermaid.run({ querySelector: '.mermaid' }).then(setupHover);

  function setupHover() {
    const display = document.getElementById('mm-display');
    const def = '<p class="ph">Hover over a step to see clinical detail, time targets, and rationale.</p>';
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
