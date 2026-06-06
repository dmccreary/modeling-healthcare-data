// Healthcare Delivery Network Graph Model - vis-network
// CANVAS_HEIGHT: 486
// A regional delivery network: hospitals, clinics, outpatient facilities, and an
// emergency department, the providers who work in them, and the patients they serve —
// connected by affiliation, employment, and referral relationships.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Healthcare Delivery Network</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    hospital:   { color: '#c0392b', shape: 'hexagon', label: 'Hospital' },
    clinic:     { color: '#3b78c3', shape: 'box', label: 'Clinic' },
    outpatient: { color: '#2e7d32', shape: 'dot', label: 'Outpatient facility' },
    ed:         { color: '#e05a3a', shape: 'triangle', label: 'Emergency dept' },
    provider:   { color: '#e8821a', shape: 'dot', label: 'Provider' },
    patient:    { color: '#8893a0', shape: 'dot', label: 'Patient' }
  };
  const nodes = [
    { id: 'h1', label: 'Regional Medical Ctr\n450 beds · Level I', group: 'hospital', size: 30 },
    { id: 'cl1', label: 'Downtown\nPrimary Care', group: 'clinic' },
    { id: 'cl2', label: 'Cardiology\nAssociates', group: 'clinic' },
    { id: 'op1', label: 'Surgical Center\nWest', group: 'outpatient' },
    { id: 'op2', label: 'Imaging Center\nNorth', group: 'outpatient' },
    { id: 'ed1', label: 'Regional ED\n45k/yr', group: 'ed' },
    { id: 'pr1', label: 'Dr. Smith\nPCP', group: 'provider' },
    { id: 'pr2', label: 'Dr. Jones\nCardiology', group: 'provider' },
    { id: 'pt1', label: 'Patient 1', group: 'patient' },
    { id: 'pt2', label: 'Patient 2', group: 'patient' }
  ];
  const E = (from, to, label, color, dashes) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 9.5 } });
  const edges = [
    E('cl1', 'h1', 'AFFILIATED_WITH', '#3b78c3', true), E('cl2', 'h1', 'AFFILIATED_WITH', '#3b78c3', true),
    E('h1', 'ed1', 'OPERATES', '#c0392b'), E('h1', 'op1', 'OPERATES', '#c0392b'), E('h1', 'op2', 'OPERATES', '#c0392b'),
    E('pr1', 'cl1', 'WORKS_AT', '#e8821a'), E('pr2', 'cl2', 'WORKS_AT', '#e8821a'),
    E('cl1', 'cl2', 'REFERS_TO', '#7b3fb3'), E('cl2', 'op2', 'REFERS_TO', '#7b3fb3'),
    E('pt1', 'pr1', 'PRIMARY_PCP', '#8893a0', true), E('pt2', 'pr1', 'PRIMARY_PCP', '#8893a0', true)
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10.5 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 150, avoidOverlap: 0.55 }, stabilization: { iterations: 280 } },
    layout: { randomSeed: 31 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
