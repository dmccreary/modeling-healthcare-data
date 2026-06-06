// Insurance Policy & Benefit Plan Graph Model - vis-network
// CANVAS_HEIGHT: 486
// How payers, benefit plans, policies, coverage categories, and members connect in a
// graph, so eligibility and benefit questions ("what does this member's plan cover?")
// become simple traversals.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Insurance Policy &amp; Benefit Plan Graph</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    payer:    { color: '#5fa0e0', shape: 'hexagon', label: 'Payer' },
    plan:     { color: '#2e7d32', shape: 'box', label: 'Benefit plan' },
    policy:   { color: '#7b3fb3', shape: 'dot', label: 'Policy' },
    category: { color: '#e8821a', shape: 'box', label: 'Coverage category' },
    member:   { color: '#caa017', shape: 'dot', label: 'Member' }
  };
  const nodes = [
    { id: 'py', label: 'BlueCross\nBlueShield CA', group: 'payer', size: 26 },
    { id: 'pl1', label: 'Gold PPO 500', group: 'plan' },
    { id: 'pl2', label: 'Silver HMO 2000', group: 'plan' },
    { id: 'po1', label: 'POL-2024-789456', group: 'policy' },
    { id: 'cc1', label: 'Hospital\nInpatient', group: 'category' },
    { id: 'cc2', label: 'Prescription\nDrugs', group: 'category' },
    { id: 'cc3', label: 'Mental Health', group: 'category' },
    { id: 'm1', label: 'Sarah Johnson\n(Subscriber)', group: 'member' },
    { id: 'm2', label: 'Tim Johnson\n(Dependent)', group: 'member' }
  ];
  const E = (from, to, label, color, dashes) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 9.5 } });
  const edges = [
    E('py', 'pl1', 'OFFERS', '#3b78c3'), E('py', 'pl2', 'OFFERS', '#3b78c3'),
    E('pl1', 'cc1', 'COVERS', '#e8821a'), E('pl1', 'cc2', 'COVERS', '#e8821a'), E('pl1', 'cc3', 'COVERS', '#e8821a'),
    E('po1', 'pl1', 'BASED_ON', '#7b3fb3', true),
    E('m1', 'po1', 'ENROLLED_IN', '#caa017'), E('m2', 'po1', 'DEPENDENT_ON', '#caa017', true)
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10.5 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 155, avoidOverlap: 0.5 }, stabilization: { iterations: 280 } },
    layout: { randomSeed: 23 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
