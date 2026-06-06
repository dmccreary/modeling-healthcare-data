// Network Community Detection Graph Model - vis-network
// CANVAS_HEIGHT: 486
// Community detection (Louvain) partitions a healthcare network into densely-connected
// groups — here three disease cohorts, each with its patients, provider, diagnosis, and
// medication. Toggle the coloring to see the network before and after partitioning.

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
    .vn-ctrl { position: absolute; top: 8px; right: 12px; background: rgba(255,255,255,0.92); border: 1px solid #dde3e8; border-radius: 6px; padding: 6px 10px; font-size: 12px; }
  `;
  document.head.appendChild(style);
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Community Detection (Louvain)</div><div class="vn-legend" id="vn-legend"></div><label class="vn-ctrl"><input type="checkbox" id="vn-comm" checked> Color by community</label></div>`);

  const COMM = { 1: { c: '#c0392b', name: 'Cardiac cohort' }, 2: { c: '#3b78c3', name: 'Diabetes cohort' }, 3: { c: '#2e7d32', name: 'Renal cohort' } };
  const SHAPE = { patient: 'dot', provider: 'square', diagnosis: 'diamond', medication: 'hexagon' };
  const N = [
    ['p1', 'Patient 1', 'patient', 1], ['p2', 'Patient 2', 'patient', 1], ['vC', 'Dr. Cardio', 'provider', 1], ['dC', 'Heart Failure', 'diagnosis', 1], ['mC', 'Metoprolol', 'medication', 1],
    ['p3', 'Patient 3', 'patient', 2], ['p4', 'Patient 4', 'patient', 2], ['vE', 'Dr. Endo', 'provider', 2], ['dE', 'Type 2 Diabetes', 'diagnosis', 2], ['mE', 'Metformin', 'medication', 2],
    ['p5', 'Patient 5', 'patient', 3], ['p6', 'Patient 6', 'patient', 3], ['vN', 'Dr. Nephro', 'provider', 3], ['dN', 'CKD', 'diagnosis', 3], ['mN', 'Furosemide', 'medication', 3]
  ];
  const nodesData = N.map(([id, label, type, comm]) => ({ id, label, type, comm, shape: SHAPE[type], borderWidth: 2 }));
  const E = (from, to) => ({ from, to, color: { color: '#c2cad1' } });
  const edges = [
    // cardiac community (dense)
    E('p1', 'dC'), E('p2', 'dC'), E('p1', 'vC'), E('p2', 'vC'), E('p1', 'mC'), E('p2', 'mC'), E('dC', 'mC'),
    // diabetes community
    E('p3', 'dE'), E('p4', 'dE'), E('p3', 'vE'), E('p4', 'vE'), E('p3', 'mE'), E('p4', 'mE'), E('dE', 'mE'),
    // renal community
    E('p5', 'dN'), E('p6', 'dN'), E('p5', 'vN'), E('p6', 'vN'), E('p5', 'mN'), E('p6', 'mN'), E('dN', 'mN'),
    // sparse bridges between communities (comorbidity)
    E('p2', 'dE'), E('p4', 'dN')
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(COMM).map(g => `<div class="row"><span class="sw" style="background:${g.c}"></span>${g.name}</div>`).join('') +
    '<div class="row" style="margin-top:4px;color:#667">shape = node type</div>';

  const ds = new vis.DataSet(nodesData);
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: ds, edges: new vis.DataSet(edges) }, {
    nodes: { size: 16, font: { size: 10.5 }, margin: 7 },
    edges: { smooth: { type: 'dynamic' } },
    physics: { barnesHut: { springLength: 110, avoidOverlap: 0.4, gravitationalConstant: -3200 }, stabilization: { iterations: 320 } },
    layout: { randomSeed: 4 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));

  function recolor() {
    const on = document.getElementById('vn-comm').checked;
    ds.update(nodesData.map(n => ({ id: n.id, color: { background: on ? COMM[n.comm].c : '#aeb6bd', border: '#444' }, font: { color: (on && n.type === 'provider') ? '#fff' : '#1a2733' } })));
  }
  document.getElementById('vn-comm').addEventListener('change', recolor);
  recolor();
});
