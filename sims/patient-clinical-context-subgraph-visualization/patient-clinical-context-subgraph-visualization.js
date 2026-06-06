// Patient Clinical Context Subgraph - vis-network
// CANVAS_HEIGHT: 486
// The clinical context subgraph around one patient: diagnoses, medications, providers,
// and encounters, with the relationships that tie them together — the neighborhood a
// graph query returns to give an AI or clinician full context on a patient.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  const style = document.createElement('style');
  style.textContent = `
    .vn-wrap { position: relative; }
    #vn-net { width: 100%; height: 486px; background: #fbfdff; border: 1px solid #ccd5dd; box-sizing: border-box; }
    .vn-title { position: absolute; top: 6px; left: 0; right: 0; text-align: center; font-weight: bold; font-size: 17px; color: #1a2733; pointer-events: none; }
    .vn-legend { position: absolute; top: 34px; left: 10px; background: rgba(255,255,255,0.92); border: 1px solid #dde3e8; border-radius: 6px; padding: 6px 9px; font-size: 11px; }
    .vn-legend .row { display: flex; align-items: center; gap: 6px; margin: 2px 0; }
    .vn-legend .sw { width: 13px; height: 13px; border-radius: 3px; display: inline-block; border: 1px solid #999; }
  `;
  document.head.appendChild(style);
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Patient Clinical Context Subgraph</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    patient:    { color: '#3b78c3', shape: 'dot', label: 'Patient' },
    diagnosis:  { color: '#c0392b', shape: 'hexagon', label: 'Diagnosis' },
    medication: { color: '#2e7d32', shape: 'box', label: 'Medication' },
    provider:   { color: '#7b3fb3', shape: 'square', label: 'Provider' },
    encounter:  { color: '#e8821a', shape: 'diamond', label: 'Encounter' }
  };
  const nodes = [
    { id: 'pt', label: 'Sarah Johnson\n67 F', group: 'patient', size: 32 },
    { id: 'dx1', label: 'E11.9\nType 2 Diabetes', group: 'diagnosis' },
    { id: 'dx2', label: 'I10\nHypertension', group: 'diagnosis' },
    { id: 'dx3', label: 'E78.5\nHyperlipidemia', group: 'diagnosis' },
    { id: 'md1', label: 'Metformin 500mg', group: 'medication' },
    { id: 'md2', label: 'Lisinopril 10mg', group: 'medication' },
    { id: 'md3', label: 'Atorvastatin 20mg', group: 'medication' },
    { id: 'pr1', label: 'Dr. Martinez\nPCP', group: 'provider' },
    { id: 'pr2', label: 'Dr. Chen\nEndocrinology', group: 'provider' },
    { id: 'pr3', label: 'Dr. Patel\nCardiology', group: 'provider' },
    { id: 'en1', label: 'Visit\n2024-02-10', group: 'encounter' },
    { id: 'en2', label: 'Visit\n2024-04-22', group: 'encounter' }
  ];
  const E = (from, to, label, color, dashes) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 9.5 } });
  const edges = [
    E('pt', 'dx1', 'HAS_DIAGNOSIS', '#c0392b'), E('pt', 'dx2', 'HAS_DIAGNOSIS', '#c0392b'), E('pt', 'dx3', 'HAS_DIAGNOSIS', '#c0392b'),
    E('pt', 'md1', 'TAKES', '#2e7d32'), E('pt', 'md2', 'TAKES', '#2e7d32'), E('pt', 'md3', 'TAKES', '#2e7d32'),
    E('md1', 'dx1', 'TREATS', '#2e7d32', true), E('md2', 'dx2', 'TREATS', '#2e7d32', true), E('md3', 'dx3', 'TREATS', '#2e7d32', true),
    E('pt', 'pr1', 'SEEN_BY', '#7b3fb3'), E('pt', 'pr2', 'SEEN_BY', '#7b3fb3'), E('pt', 'pr3', 'SEEN_BY', '#7b3fb3'),
    E('pt', 'en1', 'HAD_ENCOUNTER', '#e8821a'), E('pt', 'en2', 'HAD_ENCOUNTER', '#e8821a')
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10.5 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 150, avoidOverlap: 0.55 }, stabilization: { iterations: 300 } },
    layout: { randomSeed: 20 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
