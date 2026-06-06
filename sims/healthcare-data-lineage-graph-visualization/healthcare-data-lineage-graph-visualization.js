// Healthcare Data Lineage Graph - vis-network
// CANVAS_HEIGHT: 486
// Data flows left to right: source systems → raw tables → transformations → graph
// entities → analytics. Lineage edges let you trace any dashboard number back to the
// source system and transformation that produced it.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  const style = document.createElement('style');
  style.textContent = `
    .vn-wrap { position: relative; }
    #vn-net { width: 100%; height: 486px; background: #fbfdff; border: 1px solid #ccd5dd; box-sizing: border-box; }
    .vn-title { position: absolute; top: 6px; left: 0; right: 0; text-align: center; font-weight: bold; font-size: 17px; color: #1a2733; pointer-events: none; }
    .vn-legend { position: absolute; top: 30px; left: 10px; background: rgba(255,255,255,0.92); border: 1px solid #dde3e8; border-radius: 6px; padding: 5px 9px; font-size: 10.5px; }
    .vn-legend .row { display: flex; align-items: center; gap: 6px; margin: 2px 0; }
    .vn-legend .sw { width: 13px; height: 13px; border-radius: 3px; display: inline-block; border: 1px solid #999; }
  `;
  document.head.appendChild(style);
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Healthcare Data Lineage</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    source:    { color: '#003366', shape: 'box', label: '1. Source system' },
    raw:       { color: '#6699cc', shape: 'box', label: '2. Raw table' },
    transform: { color: '#e8821a', shape: 'diamond', label: '3. Transformation' },
    entity:    { color: '#2e7d32', shape: 'hexagon', label: '4. Graph entity' },
    analytics: { color: '#7b3fb3', shape: 'box', label: '5. Analytics' }
  };
  const nodes = [
    { id: 's1', label: 'Epic EHR', group: 'source', level: 0 },
    { id: 's2', label: 'LIS-01 Lab', group: 'source', level: 0 },
    { id: 's3', label: 'RxManager', group: 'source', level: 0 },
    { id: 'r1', label: 'PATIENT_MASTER\n2.4M rows', group: 'raw', level: 1 },
    { id: 'r2', label: 'ENCOUNTERS', group: 'raw', level: 1 },
    { id: 'r3', label: 'LAB_RESULTS', group: 'raw', level: 1 },
    { id: 'r4', label: 'RX_FILLS', group: 'raw', level: 1 },
    { id: 't1', label: 'Entity\nResolution', group: 'transform', level: 2 },
    { id: 't2', label: 'ETL Cleanse', group: 'transform', level: 2 },
    { id: 'e1', label: 'Patient', group: 'entity', level: 3 },
    { id: 'e2', label: 'Encounter', group: 'entity', level: 3 },
    { id: 'e3', label: 'Observation', group: 'entity', level: 3 },
    { id: 'a1', label: 'Quality\nDashboard', group: 'analytics', level: 4 },
    { id: 'a2', label: 'Risk Model', group: 'analytics', level: 4 }
  ];
  const E = (from, to) => ({ from, to, color: { color: '#9aa6b0' }, font: { size: 9 } });
  const edges = [
    E('s1', 'r1'), E('s1', 'r2'), E('s2', 'r3'), E('s3', 'r4'),
    E('r1', 't1'), E('r2', 't2'), E('r3', 't2'), E('r4', 't2'),
    E('t1', 'e1'), E('t2', 'e2'), E('t2', 'e3'),
    E('e1', 'a1'), E('e2', 'a1'), E('e1', 'a2'), E('e3', 'a2')
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: (k === 'source' || k === 'analytics') ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.5 } },
    layout: { hierarchical: { enabled: true, direction: 'LR', sortMethod: 'directed', levelSeparation: 165, nodeSpacing: 78 } },
    physics: false, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
});
