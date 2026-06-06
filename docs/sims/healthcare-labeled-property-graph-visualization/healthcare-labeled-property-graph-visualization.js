// Healthcare Labeled Property Graph - vis-network
// CANVAS_HEIGHT: 486
// A labeled property graph of one patient's care: patient, providers, diagnoses,
// medications, facilities, and procedures, each a typed node with properties, connected
// by labeled relationships — the data model that makes complex clinical questions queryable.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Healthcare Labeled Property Graph</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    patient:   { color: '#5fa0e0', shape: 'dot', label: 'Patient' },
    provider:  { color: '#2e7d32', shape: 'box', label: 'Provider' },
    diagnosis: { color: '#c0392b', shape: 'hexagon', label: 'Diagnosis' },
    medication:{ color: '#e8821a', shape: 'box', label: 'Medication' },
    facility:  { color: '#7b3fb3', shape: 'diamond', label: 'Facility' },
    procedure: { color: '#caa017', shape: 'box', label: 'Procedure' }
  };
  const nodes = [
    { id: 'pt', label: 'Sarah Chen\nA+, F, 1978', group: 'patient', size: 28 },
    { id: 'pr1', label: 'Dr. Martinez\nEndocrinology', group: 'provider' },
    { id: 'pr2', label: 'Dr. Lee\nFamily Med', group: 'provider' },
    { id: 'dx1', label: 'E11.9\nType 2 Diabetes', group: 'diagnosis' },
    { id: 'dx2', label: 'I10\nHypertension', group: 'diagnosis' },
    { id: 'md1', label: 'Metformin\n(Glucophage)', group: 'medication' },
    { id: 'md2', label: 'Lisinopril', group: 'medication' },
    { id: 'fc1', label: 'City Hospital', group: 'facility' },
    { id: 'fc2', label: 'Downtown Clinic', group: 'facility' },
    { id: 'pc1', label: '99213\nOffice Visit L3', group: 'procedure' },
    { id: 'pc2', label: 'HbA1c Test', group: 'procedure' }
  ];
  const E = (from, to, label, color, dashes) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 9.5 } });
  const edges = [
    E('pt', 'dx1', 'HAS_CONDITION', '#c0392b'), E('pt', 'dx2', 'HAS_CONDITION', '#c0392b'),
    E('pt', 'pr1', 'TREATED_BY', '#2e7d32'), E('pt', 'pr2', 'TREATED_BY', '#2e7d32'),
    E('pr1', 'md1', 'PRESCRIBED', '#e8821a'), E('pr2', 'md2', 'PRESCRIBED', '#e8821a'),
    E('pt', 'pc1', 'UNDERWENT', '#caa017'), E('pt', 'pc2', 'UNDERWENT', '#caa017'),
    E('pc1', 'fc2', 'AT_FACILITY', '#7b3fb3', true), E('pr1', 'fc1', 'WORKS_AT', '#7b3fb3', true), E('pr2', 'fc2', 'WORKS_AT', '#7b3fb3', true)
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10.5 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 150, avoidOverlap: 0.5 }, stabilization: { iterations: 280 } },
    layout: { randomSeed: 12 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
