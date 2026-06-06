// Basic Healthcare Graph Model - vis-network
// CANVAS_HEIGHT: 486
// The two fundamental building blocks of a graph — nodes (entities) and edges
// (relationships) — shown with a minimal five-node healthcare scenario.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  const style = document.createElement('style');
  style.textContent = `
    .vn-wrap { position: relative; }
    #vn-net { width: 100%; height: 486px; background: #fbfdff; border: 1px solid #ccd5dd; box-sizing: border-box; }
    .vn-title { position: absolute; top: 6px; left: 0; right: 0; text-align: center; font-weight: bold; font-size: 17px; color: #1a2733; pointer-events: none; }
    .vn-legend { position: absolute; top: 34px; left: 10px; background: rgba(255,255,255,0.92); border: 1px solid #dde3e8; border-radius: 6px; padding: 6px 9px; font-size: 11px; }
    .vn-legend .row { display: flex; align-items: center; gap: 6px; margin: 2px 0; }
    .vn-legend .sw { width: 13px; height: 13px; border-radius: 50%; display: inline-block; border: 1px solid #999; }
  `;
  document.head.appendChild(style);
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">A Graph = Nodes + Edges</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const C = { patient: '#3b78c3', provider: '#2e7d32', diagnosis: '#e8821a', medication: '#7b3fb3', facility: '#caa017' };
  const nodes = [
    { id: 'pt', label: 'Patient\nSarah Chen', color: { background: C.patient, border: '#1f4e82' }, font: { color: '#fff' } },
    { id: 'pr', label: 'Provider\nDr. Martinez', color: { background: C.provider, border: '#1d5121' }, font: { color: '#fff' } },
    { id: 'dx', label: 'Diagnosis\nType 2 Diabetes', color: { background: C.diagnosis, border: '#a85c12' }, font: { color: '#fff' } },
    { id: 'md', label: 'Medication\nMetformin', color: { background: C.medication, border: '#552a7d' }, font: { color: '#fff' } },
    { id: 'fc', label: 'Facility\nCity Hospital', color: { background: C.facility, border: '#8c7110' }, font: { color: '#1a2733' } }
  ];
  const E = (from, to, label) => ({ from, to, label, color: { color: '#8893a0' }, font: { color: '#555', size: 10, align: 'middle' } });
  const edges = [
    E('pt', 'pr', 'TREATED_BY'), E('pt', 'dx', 'HAS_DIAGNOSIS'), E('pt', 'md', 'TAKES'),
    E('pr', 'md', 'PRESCRIBED'), E('pr', 'fc', 'WORKS_AT'), E('pt', 'fc', 'VISITS')
  ];
  document.getElementById('vn-legend').innerHTML =
    [['Patient', C.patient], ['Provider', C.provider], ['Diagnosis', C.diagnosis], ['Medication', C.medication], ['Facility', C.facility]]
      .map(([n, c]) => `<div class="row"><span class="sw" style="background:${c}"></span>${n} (node)</div>`).join('') +
    '<div class="row" style="margin-top:3px;color:#667">→ arrow = edge (relationship)</div>';

  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    nodes: { shape: 'circle', borderWidth: 2, font: { size: 12 }, margin: 8, widthConstraint: { maximum: 110 } },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 170, avoidOverlap: 0.6 }, stabilization: { iterations: 250 } },
    layout: { randomSeed: 15 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
