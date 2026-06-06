// Multidisciplinary Care Team Graph Model - vis-network
// CANVAS_HEIGHT: 486
// The team around one complex patient: a primary-care provider, three specialists, four
// allied-health professionals, and the facilities they work at — all connected to the
// patient by typed care relationships a graph can traverse for coordination.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Multidisciplinary Care Team</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    patient:    { color: '#3b78c3', shape: 'dot', label: 'Patient' },
    pcp:        { color: '#2e7d32', shape: 'box', label: 'Primary care' },
    specialist: { color: '#e8821a', shape: 'box', label: 'Specialist' },
    allied:     { color: '#7b3fb3', shape: 'dot', label: 'Allied health' },
    facility:   { color: '#8893a0', shape: 'hexagon', label: 'Facility' }
  };
  const nodes = [
    { id: 'pt', label: 'John Doe, 62\nT2D + CAD + CKD', group: 'patient', size: 32 },
    { id: 'pcp', label: 'Dr. Martinez\nFamily Med', group: 'pcp' },
    { id: 'sp1', label: 'Dr. Kim\nEndocrinology', group: 'specialist' },
    { id: 'sp2', label: 'Dr. Patel\nCardiology', group: 'specialist' },
    { id: 'sp3', label: 'Dr. Thompson\nNephrology', group: 'specialist' },
    { id: 'al1', label: 'Sarah, RN\nCare Coord.', group: 'allied' },
    { id: 'al2', label: 'James, PharmD', group: 'allied' },
    { id: 'al3', label: 'Lisa, RD', group: 'allied' },
    { id: 'al4', label: 'Tom, LCSW', group: 'allied' },
    { id: 'f1', label: 'Downtown Clinic', group: 'facility' },
    { id: 'f2', label: 'Cardiology\nPractice', group: 'facility' },
    { id: 'f3', label: 'Hospital\nPharmacy', group: 'facility' }
  ];
  const E = (from, to, label, color, dashes) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 9.5 } });
  const edges = [
    E('pcp', 'pt', 'MANAGES_CARE', '#2e7d32'),
    E('sp1', 'pt', 'CONSULTS_FOR', '#e8821a'), E('sp2', 'pt', 'CONSULTS_FOR', '#e8821a'), E('sp3', 'pt', 'CONSULTS_FOR', '#e8821a'),
    E('al1', 'pt', 'COORDINATES', '#7b3fb3'), E('al2', 'pt', 'SUPPORTS', '#7b3fb3'), E('al3', 'pt', 'SUPPORTS', '#7b3fb3'), E('al4', 'pt', 'SUPPORTS', '#7b3fb3'),
    E('pcp', 'f1', 'WORKS_AT', '#8893a0', true), E('sp2', 'f2', 'WORKS_AT', '#8893a0', true), E('al2', 'f3', 'WORKS_AT', '#8893a0', true)
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10.5 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 150, avoidOverlap: 0.55 }, stabilization: { iterations: 280 } },
    layout: { randomSeed: 42 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
