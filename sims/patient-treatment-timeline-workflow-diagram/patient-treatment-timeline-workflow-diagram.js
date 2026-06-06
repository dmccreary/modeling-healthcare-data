// Patient Treatment Timeline Workflow - Mermaid
// CANVAS_HEIGHT: 611
// A 12-month Type 2 Diabetes treatment journey from symptom onset to goal, with each
// timepoint colored by phase and hover detail showing labs, treatment, and the graph
// query that captures the temporal relationship. Left 2/3 flowchart, right 1/3 detail.

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
    A["Month 0<br/>Symptom onset"]:::diag
    B["Month 0.5<br/>Diagnosis confirmed"]:::diag
    C["Month 1<br/>Initial monitoring"]:::initial
    D["Month 3<br/>First follow-up"]:::adjust
    E["Month 6<br/>Mid-point assessment"]:::adjust
    F["Month 9<br/>Response evaluation"]:::stable
    G["Month 12<br/>Goal achievement"]:::goal

    A --> B --> C --> D --> E --> F --> G

    classDef diag fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef initial fill:#ffe0b3,stroke:#d2861a,stroke-width:2px,color:#6b3d08,font-size:15px
    classDef adjust fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef stable fill:#cdeccd,stroke:#2e7d32,stroke-width:2px,color:#143a16,font-size:15px
    classDef goal fill:#2e7d32,stroke:#1c5121,stroke-width:2px,color:#fff,font-size:15px
    linkStyle default stroke:#888,stroke-width:2px,font-size:14px`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="mm-container">
      <div class="mm-diagram"><div class="mermaid">${diagram}</div></div>
      <div class="mm-info">
        <h3>Timepoint Details</h3>
        <div id="mm-display"><p class="ph">Hover over a month to see the patient status, labs, treatment, and the graph query that records it.</p></div>
        <div class="mm-note">Each diagnosis, prescription, and lab result is stored with a <code>date</code> property, so a single traversal can reconstruct the whole journey. Color marks the phase: diagnosis (blue), initial treatment (orange), adjustment (yellow), stable (green), goal (dark green).</div>
      </div>
    </div>`);

  const nodeInfo = {
    A: { title: 'Month 0 — Symptom Onset', description: 'Patient presents with classic Type 2 Diabetes symptoms (fatigue, increased thirst). Labs ordered: HbA1c and fasting glucose. No treatment yet.' },
    B: { title: 'Month 0.5 — Diagnosis Confirmed', description: 'HbA1c 8.5%, fasting glucose 180 mg/dL. Start Metformin 500mg BID with diet, exercise, and glucose-monitoring education.<br><code>CREATE (p:Patient)-[:DIAGNOSED_WITH {date:\'2024-01-15\'}]-&gt;(d:Disease {name:\'Type 2 Diabetes\'})</code>' },
    C: { title: 'Month 1 — Initial Monitoring', description: 'Adjusting to medication; home glucose log reviewed; weekly glucose checks. Mild GI upset, improving with food timing. Continue Metformin.' },
    D: { title: 'Month 3 — First Follow-up', description: 'Partial improvement: HbA1c 7.8%, weight down 5 lbs. Increase Metformin to 1000mg BID; monthly glucose reviews and dietary counseling.<br><code>{response:\'partial\', A1c_change:-0.7}</code>' },
    E: { title: 'Month 6 — Mid-point Assessment', description: 'Plateau: HbA1c 7.5%, weight stable. Intensify therapy — add Jardiance 10mg daily (SGLT2 inhibitor); biweekly glucose and CV-risk assessment.<br><code>(p)-[:PRESCRIBED {date:\'2024-07-15\'}]-&gt;(m:Medication {name:\'Jardiance\'})</code>' },
    F: { title: 'Month 9 — Response Evaluation', description: 'Significant improvement: HbA1c 6.8%, 12 lbs down total. Continue current regimen; monthly glucose checks with activity-tracker integration.<br><code>(o:Outcome {A1c:6.8})&lt;-[:ACHIEVED]-(p)</code>' },
    G: { title: 'Month 12 — Goal Achievement', description: 'At goal: HbA1c 6.5%, fasting glucose 105 mg/dL. Maintain medications; quarterly follow-ups and annual metabolic panel.<br><code>MATCH (p)-[r:DIAGNOSED_WITH|PRESCRIBED|HAS_LAB_RESULT*]-&gt;(n) RETURN r ORDER BY r.date</code>' }
  };

  mermaid.initialize({ startOnLoad: false, theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 30, rankSpacing: 38 } });
  mermaid.run({ querySelector: '.mermaid' }).then(setupHover);

  function setupHover() {
    const display = document.getElementById('mm-display');
    const def = '<p class="ph">Hover over a month to see the patient status, labs, treatment, and the graph query that records it.</p>';
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
