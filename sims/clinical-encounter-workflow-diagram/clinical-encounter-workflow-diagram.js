// Clinical Encounter Workflow - Mermaid
// CANVAS_HEIGHT: 1410
// A patient encounter from arrival to claims, organized into four swimlanes (Patient,
// Clinical Staff, Clinical Systems, Administrative Systems) so each step's owning role and
// the data-capture points are visible.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  const style = document.createElement('style');
  style.textContent = `
    .mm-wrap { padding: 8px 10px 12px; box-sizing: border-box; font-family: Arial, Helvetica, sans-serif; }
    .mm-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; margin-bottom: 6px; }
    .mm-wrap .mermaid { width: 100%; text-align: center; }
    .mm-wrap svg { max-width: 100%; height: auto; }
    .mm-note { font-size: 12px; color: #556; text-align: center; margin-top: 8px; }
  `;
  document.head.appendChild(style);

  const diagram = `flowchart TD
    subgraph PT["🧍 Patient"]
      A(["Arrival &amp; check-in"]):::pt
    end
    subgraph CS["🩺 Clinical Staff"]
      B["Registration"]:::staff
      D["Nursing intake<br/>&amp; vitals"]:::staff
      F["Physician exam"]:::staff
      I["Physician<br/>documents visit"]:::staff
    end
    subgraph SY["💻 Clinical Systems"]
      C[("EHR: demographics<br/>&amp; insurance")]:::sys
      E[("EHR: vitals<br/>captured")]:::sys
      G[/"CPOE: orders<br/>placed"/]:::sys
      H[("Lab / Imaging<br/>results")]:::sys
    end
    subgraph AD["🧾 Administrative Systems"]
      J["Charge capture"]:::adm
      K["Billing"]:::adm
      L["Claims submission"]:::adm
    end
    A --> B --> C --> D --> E --> F --> G --> H --> I --> J --> K --> L

    classDef pt fill:#cfe0fb,stroke:#1f4e82,color:#13243a;
    classDef staff fill:#cdeccd,stroke:#1d5121,color:#143018;
    classDef sys fill:#e7d3f5,stroke:#552a7d,color:#2c1542;
    classDef adm fill:#fde3c0,stroke:#a85c12,color:#4a2a08;`;

  main.insertAdjacentHTML('afterbegin', `
    <div class="mm-wrap">
      <div class="mm-title">Clinical Encounter Workflow (Arrival → Claims)</div>
      <div class="mermaid">${diagram}</div>
      <div class="mm-note">Each lane is a role/system; arrows show the encounter flow and the data-capture points along the way.</div>
    </div>`);

  mermaid.initialize({ startOnLoad: false, theme: 'base', themeVariables: { fontSize: '14px', fontFamily: 'Arial, Helvetica, sans-serif' }, flowchart: { useMaxWidth: true, htmlLabels: true } });
  mermaid.run({ querySelector: '.mermaid' });
});
