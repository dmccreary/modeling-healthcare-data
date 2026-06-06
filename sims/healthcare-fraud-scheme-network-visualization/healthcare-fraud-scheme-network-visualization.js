// Healthcare Fraud Scheme Network - vis-network
// CANVAS_HEIGHT: 486
// Fraud as graph structure: a high-volume provider submits many claims that all bill the
// same high-value procedure and diagnosis for a handful of patients (upcoding / phantom
// billing) — a distinctive dense star that graph analytics flags against a normal provider.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Healthcare Fraud Scheme as a Graph Pattern</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    provider:  { color: '#3b78c3', shape: 'dot', label: 'Provider (size = billing)' },
    patient:   { color: '#2e7d32', shape: 'dot', label: 'Patient' },
    claim:     { color: '#e8821a', shape: 'square', label: 'Claim' },
    diagnosis: { color: '#7b3fb3', shape: 'diamond', label: 'Diagnosis' },
    procedure: { color: '#caa017', shape: 'hexagon', label: 'Procedure' }
  };
  const nodes = [
    { id: 'pvF', label: 'Dr. Mills\n(flagged)', group: 'provider', size: 40, color: { background: '#c0392b', border: '#7a1c14' } },
    { id: 'pvN', label: 'Dr. Goodman', group: 'provider', size: 20 },
    { id: 'pt1', label: 'Patient 1', group: 'patient' }, { id: 'pt2', label: 'Patient 2', group: 'patient' },
    { id: 'pt3', label: 'Patient 3', group: 'patient' }, { id: 'pt4', label: 'Patient 4', group: 'patient' },
    { id: 'c1', label: 'Claim 1', group: 'claim' }, { id: 'c2', label: 'Claim 2', group: 'claim' }, { id: 'c3', label: 'Claim 3', group: 'claim' }, { id: 'c4', label: 'Claim 4', group: 'claim' }, { id: 'c5', label: 'Claim 5', group: 'claim' },
    { id: 'pr1', label: '99285\n(high-value ED)', group: 'procedure' }, { id: 'pr2', label: '99213\n(routine)', group: 'procedure' },
    { id: 'dx1', label: 'E11.9 T2D', group: 'diagnosis' }
  ];
  const E = (from, to, label, color) => ({ from, to, label, color: { color }, font: { color: '#666', size: 8.5 } });
  const edges = [
    // flagged provider: 4 claims, all billing the same high-value procedure for 2 patients
    E('pvF', 'c1', 'SUBMITTED', '#c0392b'), E('pvF', 'c2', 'SUBMITTED', '#c0392b'), E('pvF', 'c3', 'SUBMITTED', '#c0392b'), E('pvF', 'c4', 'SUBMITTED', '#c0392b'),
    E('c1', 'pt1', 'FOR', '#888'), E('c2', 'pt1', 'FOR', '#888'), E('c3', 'pt2', 'FOR', '#888'), E('c4', 'pt2', 'FOR', '#888'),
    E('c1', 'pr1', 'BILLS', '#caa017'), E('c2', 'pr1', 'BILLS', '#caa017'), E('c3', 'pr1', 'BILLS', '#caa017'), E('c4', 'pr1', 'BILLS', '#caa017'),
    E('c1', 'dx1', 'CODED', '#7b3fb3'), E('c3', 'dx1', 'CODED', '#7b3fb3'),
    // normal provider for contrast
    E('pvN', 'c5', 'SUBMITTED', '#3b78c3'), E('c5', 'pt3', 'FOR', '#888'), E('c5', 'pr2', 'BILLS', '#caa017'), E('c5', 'dx1', 'CODED', '#7b3fb3'), E('pvN', 'pt4', 'TREATS', '#3b78c3')
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 130, avoidOverlap: 0.5 }, stabilization: { iterations: 320 } },
    layout: { randomSeed: 19 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
