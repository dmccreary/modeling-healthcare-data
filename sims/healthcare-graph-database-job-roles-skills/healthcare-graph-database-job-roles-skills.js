// Healthcare Graph Database Job Roles & Skills - vis-network
// CANVAS_HEIGHT: 486
// Career roles in healthcare graph databases and the technical and healthcare skills each
// requires. Shared skills between roles reveal which capabilities are broadly valuable
// versus role-specific.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Healthcare Graph DB: Roles &amp; Skills</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    role:    { color: '#e07b9a', shape: 'dot', label: 'Job role' },
    tech:    { color: '#5fa0e0', shape: 'square', label: 'Technical skill' },
    health:  { color: '#2e7d32', shape: 'hexagon', label: 'Healthcare skill' }
  };
  const nodes = [
    { id: 'r1', label: 'Graph DB\nAdministrator', group: 'role', size: 24 },
    { id: 'r2', label: 'Healthcare Data\nArchitect', group: 'role', size: 24 },
    { id: 'r3', label: 'Clinical Graph\nAnalyst', group: 'role', size: 24 },
    { id: 'r4', label: 'Graph ML\nEngineer', group: 'role', size: 24 },
    { id: 'r5', label: 'Knowledge Graph\nEngineer', group: 'role', size: 24 },
    { id: 't1', label: 'Neo4j/Cypher', group: 'tech' },
    { id: 't2', label: 'TigerGraph/GSQL', group: 'tech' },
    { id: 't3', label: 'Python', group: 'tech' },
    { id: 't4', label: 'Graph Algorithms', group: 'tech' },
    { id: 't5', label: 'Vector Databases', group: 'tech' },
    { id: 't6', label: 'Docker/K8s', group: 'tech' },
    { id: 'h1', label: 'HL7/FHIR', group: 'health' },
    { id: 'h2', label: 'HIPAA\nCompliance', group: 'health' },
    { id: 'h3', label: 'Medical Coding\n(ICD/CPT)', group: 'health' },
    { id: 'h4', label: 'Clinical\nWorkflows', group: 'health' }
  ];
  const E = (from, to) => ({ from, to, label: 'REQUIRES', color: { color: '#c9b0bd' }, font: { color: '#aa8', size: 8 } });
  const edges = [
    E('r1', 't1'), E('r1', 't2'), E('r1', 't6'), E('r1', 'h2'),
    E('r2', 't1'), E('r2', 'h1'), E('r2', 'h3'), E('r2', 'h2'),
    E('r3', 't1'), E('r3', 't3'), E('r3', 'h3'), E('r3', 'h4'),
    E('r4', 't3'), E('r4', 't4'), E('r4', 't5'),
    E('r5', 't1'), E('r5', 't4'), E('r5', 't5'), E('r5', 'h1')
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 140, avoidOverlap: 0.5 }, stabilization: { iterations: 320 } },
    layout: { randomSeed: 28 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
