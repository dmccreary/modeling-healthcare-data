// Graph-Based Fraud Detection Algorithm Workflow - Mermaid
// CANVAS_HEIGHT: 580
// Five detection algorithms run in parallel on the healthcare graph, merge into a
// composite risk score, and route providers to investigation, monitoring, or
// standard processing, with a feedback loop. Left 2/3 flowchart, right 1/3 detail.

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
    A(["Claims Data Ingestion"]):::event
    B["Build Healthcare Graph"]:::data
    C1["Statistical Outlier<br/>Detection"]:::detect
    C2["Community Detection<br/>(Louvain)"]:::detect
    C3["Referral Network<br/>Analysis"]:::detect
    C4["Temporal Pattern<br/>Analysis"]:::detect
    C5["Claim Similarity<br/>Analysis"]:::detect
    D["Combine Risk Scores"]:::score
    E["Apply Business Rules"]:::proc
    F["Generate Investigation<br/>Cases"]:::proc
    G{"Risk score?"}:::decision
    H["Human Investigation<br/>(SIU review)"]:::invest
    I["Enhanced Monitoring"]:::monitor
    J["Standard Processing"]:::low
    K{"Investigation<br/>outcome?"}:::decision
    L["Fraud Confirmed:<br/>recoup, refer, exclude"]:::fraud
    M["Abuse / Waste / Legit:<br/>educate, correct, close"]:::proc
    N["Update Detection Models"]:::feedback
    Z(["Continuous Monitoring"]):::event

    A --> B
    B --> C1 & C2 & C3 & C4 & C5
    C1 & C2 & C3 & C4 & C5 --> D
    D --> E --> F --> G
    G -->|Critical / High| H --> K
    G -->|Medium| I --> N
    G -->|Low| J --> N
    K -->|Fraud| L --> N
    K -->|Abuse / Waste / Legit| M --> N
    N --> Z
    Z -.->|daily incremental| A

    classDef event fill:#2e7d8a,stroke:#1b4b54,stroke-width:2px,color:#fff,font-size:15px
    classDef data fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef detect fill:#cdeccd,stroke:#2e7d32,stroke-width:2px,color:#143a16,font-size:15px
    classDef score fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef proc fill:#cfe0fb,stroke:#2b6cb0,stroke-width:2px,color:#143a6b,font-size:15px
    classDef decision fill:#fff2b3,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef invest fill:#ffe0b3,stroke:#d2861a,stroke-width:2px,color:#6b3d08,font-size:15px
    classDef monitor fill:#fdf0b0,stroke:#c9a400,stroke-width:2px,color:#5c4a00,font-size:15px
    classDef low fill:#d8f0db,stroke:#2e7d32,stroke-width:2px,color:#143a16,font-size:15px
    classDef fraud fill:#fbd0d0,stroke:#c0392b,stroke-width:2px,color:#7a1c14,font-size:15px
    classDef feedback fill:#e3d3f5,stroke:#7b3fb3,stroke-width:2px,color:#3d1c5e,font-size:15px
    linkStyle default stroke:#888,stroke-width:2px,font-size:14px`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="mm-container">
      <div class="mm-diagram"><div class="mermaid">${diagram}</div></div>
      <div class="mm-info">
        <h3>Step Details</h3>
        <div id="mm-display"><p class="ph">Hover over a step. The five green nodes are detection algorithms that run in parallel on the graph.</p></div>
        <div class="mm-note">No single algorithm finds all fraud. A weighted composite (0.25 outlier + 0.20 community + 0.25 referral + 0.15 temporal + 0.15 similarity) ranks providers; confirmed outcomes feed back to retrain the models and cut false positives.</div>
      </div>
    </div>`);

  const nodeInfo = {
    A: { title: 'Claims Data Ingestion', description: 'Ingest millions of claims per day plus provider, patient, referral, and financial-relationship records (EDI 837, billing, registration).' },
    B: { title: 'Build Healthcare Graph', description: 'Create Provider, Patient, Claim, Diagnosis, Procedure, and Payer nodes with FILED, FOR_PATIENT, REFERRED_BY, and similar edges; update daily.' },
    C1: { title: 'Statistical Outlier Detection', description: 'Compare each provider\'s billing volume, average amount, and code mix to peer groups using Z-scores and isolation forests.' },
    C2: { title: 'Community Detection (Louvain)', description: 'Cluster providers by shared patients, referral patterns, and billing similarity; flag dense communities with high average claim amounts.' },
    C3: { title: 'Referral Network Analysis', description: 'Compute PageRank/betweenness/degree centrality and detect circular referral patterns (cycles of length 2-5) and abnormal reciprocity.' },
    C4: { title: 'Temporal Pattern Analysis', description: 'Time-series and change-point detection of billing trends and code drift, distinguishing legitimate seasonality from suspicious shifts.' },
    C5: { title: 'Claim Similarity Analysis', description: 'Find clusters of suspiciously similar or duplicate claims via Jaccard/cosine similarity and temporal clustering.' },
    D: { title: 'Combine Risk Scores', description: 'Weighted composite (0-100): 0.25 outlier + 0.20 community + 0.25 referral + 0.15 temporal + 0.15 similarity.' },
    E: { title: 'Apply Business Rules', description: 'Whitelist known-legitimate providers (teaching hospitals, trauma centers), adjust for specialty, and require minimum volume.' },
    F: { title: 'Generate Investigation Cases', description: 'Rank providers and assemble case files with statistical anomalies, graph patterns, peer comparisons, and estimated financial exposure.' },
    G: { title: 'Risk Score?', description: 'Route by tier: Critical/High to investigation, Medium to enhanced monitoring, Low to standard processing.' },
    H: { title: 'Human Investigation (SIU)', description: 'Special Investigation Unit review: claim audit, patient interviews, site visit, medical-record review against billed services.' },
    I: { title: 'Enhanced Monitoring', description: 'Prepayment review of future claims, automated edits, quarterly pattern analysis, and educational intervention.' },
    J: { title: 'Standard Processing', description: 'Continue routine monitoring; flag for review only if patterns worsen.' },
    K: { title: 'Investigation Outcome?', description: 'Classify the result: confirmed fraud, abuse, waste, or legitimate activity.' },
    L: { title: 'Fraud Confirmed', description: 'Payment recoupment, civil/criminal referral (DOJ, FBI), OIG exclusion (LEIE), and mark the provider in the graph to inform future detection.' },
    M: { title: 'Abuse / Waste / Legitimate', description: 'Corrective action plans, provider education, overpayment recovery, or case closure and whitelist updates as appropriate.' },
    N: { title: 'Update Detection Models', description: 'Train on confirmed cases, tune algorithm weights and thresholds, document new schemes, and enrich the graph with outcomes.' },
    Z: { title: 'Continuous Monitoring', description: 'Real-time alerting and quarterly reporting; daily incremental processing returns to ingestion.' }
  };

  mermaid.initialize({ startOnLoad: false, theme: 'default',
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis', nodeSpacing: 24, rankSpacing: 32 } });
  mermaid.run({ querySelector: '.mermaid' }).then(setupHover);

  function setupHover() {
    const display = document.getElementById('mm-display');
    const def = '<p class="ph">Hover over a step. The five green nodes are detection algorithms that run in parallel on the graph.</p>';
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
