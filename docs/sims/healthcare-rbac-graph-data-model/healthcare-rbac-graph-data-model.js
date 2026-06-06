// Healthcare RBAC Graph Data Model - vis-network
// CANVAS_HEIGHT: 486
// Role-based access control as a graph: users are assigned roles, roles inherit from more
// general roles, and roles grant permissions. Access decisions become graph traversals
// from a user, through their roles (and inherited roles), to the permissions they hold.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Healthcare RBAC Graph Model</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    user:       { color: '#5fa0e0', shape: 'box', label: 'User' },
    role:       { color: '#2e7d32', shape: 'hexagon', label: 'Role' },
    permission: { color: '#e8821a', shape: 'diamond', label: 'Permission' }
  };
  const nodes = [
    { id: 'u1', label: 'Dr. Sarah Chen\nCardiology', group: 'user' },
    { id: 'u2', label: 'Nurse James Park\nICU', group: 'user' },
    { id: 'u3', label: 'Maria Garcia\nRevenue', group: 'user' },
    { id: 'r1', label: 'Physician', group: 'role' },
    { id: 'r2', label: 'Cardiologist', group: 'role' },
    { id: 'r3', label: 'Nurse', group: 'role' },
    { id: 'r4', label: 'ICU Nurse', group: 'role' },
    { id: 'r5', label: 'Billing Clerk', group: 'role' },
    { id: 'p1', label: 'Read clinical\nrecords', group: 'permission' },
    { id: 'p2', label: 'Write orders', group: 'permission' },
    { id: 'p3', label: 'Read labs', group: 'permission' },
    { id: 'p4', label: 'Read billing', group: 'permission' }
  ];
  const E = (from, to, label, color, dashes) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 9.5 } });
  const edges = [
    E('u1', 'r2', 'HAS_ROLE', '#3b78c3'), E('u2', 'r4', 'HAS_ROLE', '#3b78c3'), E('u3', 'r5', 'HAS_ROLE', '#3b78c3'),
    E('r2', 'r1', 'INHERITS_FROM', '#2e7d32', true), E('r4', 'r3', 'INHERITS_FROM', '#2e7d32', true),
    E('r1', 'p1', 'GRANTS', '#e8821a'), E('r1', 'p2', 'GRANTS', '#e8821a'), E('r1', 'p3', 'GRANTS', '#e8821a'),
    E('r3', 'p1', 'GRANTS', '#e8821a'), E('r3', 'p3', 'GRANTS', '#e8821a'),
    E('r5', 'p4', 'GRANTS', '#e8821a')
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10.5 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 150, avoidOverlap: 0.5 }, stabilization: { iterations: 280 } },
    layout: { randomSeed: 17 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
