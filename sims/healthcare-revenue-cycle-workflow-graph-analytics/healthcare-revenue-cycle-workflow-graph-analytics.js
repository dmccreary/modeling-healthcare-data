// Healthcare Revenue Cycle Workflow with Graph Analytics - Mermaid
// CANVAS_HEIGHT: 1878
// Condensed revenue cycle from scheduling to reconciliation, highlighting (green)
// the points where graph-database queries optimize eligibility, coding, denial, and
// variance analysis. Left 2/3 flowchart, right 1/3 hover detail.

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
    A(["Patient Schedules<br/>Appointment"]):::event
    B["Register and Verify<br/>Insurance"]:::pre
    C["Check Eligibility"]:::gquery
    D{"Coverage active?"}:::decision
    E["Patient Self-Pay"]:::collect
    F["Prior Auth and<br/>Estimate Responsibility"]:::pre
    G["Provide Services and<br/>Capture Charges"]:::service
    H["Assign ICD-10 / CPT<br/>Codes"]:::coding
    I["Validate Coding and<br/>Medical Necessity"]:::gquery
    J["Generate and Scrub<br/>Claim"]:::coding
    K{"Claim clean?"}:::decision
    L["Submit Claim to Payer"]:::coding
    M["Payer Adjudication"]:::payer
    N{"Claim approved?"}:::decision
    O["Analyze Denial and<br/>Find Patterns"]:::denial
    P{"Correctable?"}:::decision
    Q["Issue Payment"]:::pay
    R["Post Payment and<br/>Flag Variances"]:::gquery
    S["Patient Statement<br/>and Collections"]:::collect
    Z(["Revenue Cycle<br/>Complete"]):::event

    A --> B --> C --> D
    D -->|No| E --> F
    D -->|Yes| F --> G --> H --> I --> J --> K
    K -->|No| H
    K -->|Yes| L --> M --> N
    N -->|No| O --> P
    P -->|Yes| L
    P -->|No| S
    N -->|Yes| Q --> R --> S --> Z

    classDef event fill:#2e7d32,stroke:#1c5121,stroke-width:2px,color:#fff,font-size:15px
    classDef pre fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef gquery fill:#cdeccd,stroke:#2e7d32,stroke-width:2px,color:#143a16,font-size:15px
    classDef service fill:#bfe3d0,stroke:#2c8a5f,stroke-width:2px,color:#10402b,font-size:15px
    classDef coding fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef payer fill:#e3d3f5,stroke:#7b3fb3,stroke-width:2px,color:#3d1c5e,font-size:15px
    classDef pay fill:#ffe0b3,stroke:#d2861a,stroke-width:2px,color:#6b3d08,font-size:15px
    classDef denial fill:#fbd0d0,stroke:#c0392b,stroke-width:2px,color:#7a1c14,font-size:15px
    classDef collect fill:#dfe3e8,stroke:#7a8896,stroke-width:2px,color:#2b343d,font-size:15px
    classDef decision fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    linkStyle default stroke:#888,stroke-width:2px,font-size:14px`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="mm-container">
      <div class="mm-diagram"><div class="mermaid">${diagram}</div></div>
      <div class="mm-info">
        <h3>Step Details</h3>
        <div id="mm-display"><p class="ph">Hover over a step to see what happens. Green steps are graph-database queries.</p></div>
        <div class="mm-note">Graph queries (green) drive the cycle: real-time eligibility, medical-necessity validation, denial-pattern detection, and payment-variance analysis. Targets: days-in-A/R &lt;40, clean-claim rate &gt;95%, denial rate &lt;5%, collection rate &gt;96%.</div>
      </div>
    </div>`);

  const nodeInfo = {
    A: { title: 'Patient Schedules Appointment', description: 'The patient calls or uses the portal to schedule a service.' },
    B: { title: 'Register and Verify Insurance', description: 'Collect demographics, insurance details, and consent forms at the front desk.' },
    C: { title: 'Check Eligibility (graph query)', description: 'Real-time traversal: Patient &rarr; Policy &rarr; Payer, active on the service date? Returns plan type, deductible, and out-of-pocket remaining.' },
    D: { title: 'Coverage Active?', description: 'Is the patient covered on the scheduled service date? If not, move to self-pay.' },
    E: { title: 'Patient Self-Pay', description: 'Inform the patient of self-pay status and collect payment or set up a payment plan.' },
    F: { title: 'Prior Auth and Estimate Responsibility', description: 'Check whether the service needs prior authorization and estimate copay, deductible, and coinsurance from the benefit design.' },
    G: { title: 'Provide Services and Capture Charges', description: 'Deliver care, document the encounter in the EMR, and automatically capture charges from clinical and ancillary systems.' },
    H: { title: 'Assign ICD-10 / CPT Codes', description: 'Certified coders review documentation and assign ICD-10, CPT, and HCPCS codes.' },
    I: { title: 'Validate Coding and Medical Necessity (graph query)', description: 'Graph query checks that the documented diagnoses support the billed procedures, flagging likely denials before submission.' },
    J: { title: 'Generate and Scrub Claim', description: 'Create the 837 EDI claim and run automated edits for coding errors, missing data, and payer-specific rules.' },
    K: { title: 'Claim Clean?', description: 'Did the claim pass scrubbing? If not, return to coding to fix the issues.' },
    L: { title: 'Submit Claim to Payer', description: 'Electronic submission via clearinghouse or direct to the payer.' },
    M: { title: 'Payer Adjudication', description: 'The payer validates eligibility, checks authorization, applies benefits, and determines payment.' },
    N: { title: 'Claim Approved?', description: 'Approved claims proceed to payment; denied claims enter denial management.' },
    O: { title: 'Analyze Denial and Find Patterns (graph query)', description: 'Review the denial code, and use graph analytics to surface systematic denial patterns by provider, code, or payer.' },
    P: { title: 'Correctable?', description: 'If the denial is correctable, fix and resubmit; otherwise appeal or write off and move to patient billing.' },
    Q: { title: 'Issue Payment', description: 'The payer sends payment (EFT or check) with remittance advice (ERA/EOB).' },
    R: { title: 'Post Payment and Flag Variances (graph query)', description: 'Apply the payment and compare expected vs. actual against contract rates, flagging underpayments for appeal.' },
    S: { title: 'Patient Statement and Collections', description: 'Bill the patient for remaining responsibility; graph analytics predict payment likelihood from history to guide follow-up.' },
    Z: { title: 'Revenue Cycle Complete', description: 'All activities completed; financial data is available for analytics and KPI reporting.' }
  };

  mermaid.initialize({ startOnLoad: false, theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 26, rankSpacing: 32 } });
  mermaid.run({ querySelector: '.mermaid' }).then(setupHover);

  function setupHover() {
    const display = document.getElementById('mm-display');
    const def = '<p class="ph">Hover over a step to see what happens. Green steps are graph-database queries.</p>';
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
