// Healthcare Data Integration Graph Model - vis-network
// CANVAS_HEIGHT: 486
// A graph integrates data from many source systems (EHR, claims, lab, pharmacy) around a
// single master patient record: each encounter is sourced from a system and carries
// diagnoses, giving one unified, queryable patient view.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Healthcare Data Integration Graph</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    patient:   { color: '#3b78c3', shape: 'dot', label: 'Master patient record' },
    source:    { color: '#8893a0', shape: 'hexagon', label: 'Source system' },
    encounter: { color: '#2e7d32', shape: 'square', label: 'Encounter' },
    diagnosis: { color: '#c0392b', shape: 'diamond', label: 'Diagnosis' }
  };
  const nodes = [
    { id: 'pt', label: 'Master Patient\nRecord', group: 'patient', size: 34 },
    { id: 'sy1', label: 'Epic EHR\nHospital A', group: 'source' },
    { id: 'sy2', label: 'Claims DB\nPayer X', group: 'source' },
    { id: 'sy3', label: 'LabCorp\nInterface', group: 'source' },
    { id: 'sy4', label: 'CVS Pharmacy', group: 'source' },
    { id: 'en1', label: 'Office Visit\n2024-01-15', group: 'encounter' },
    { id: 'en2', label: 'ED Visit\n2024-02-03', group: 'encounter' },
    { id: 'en3', label: 'Hospitalization\n2024-03-10', group: 'encounter' },
    { id: 'dx1', label: 'E11.9 T2D', group: 'diagnosis' },
    { id: 'dx2', label: 'I10 HTN', group: 'diagnosis' }
  ];
  const E = (from, to, label, color, dashes) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 9.5 } });
  const edges = [
    E('pt', 'en1', 'HAS_ENCOUNTER', '#3b78c3'), E('pt', 'en2', 'HAS_ENCOUNTER', '#3b78c3'), E('pt', 'en3', 'HAS_ENCOUNTER', '#3b78c3'),
    E('en1', 'sy1', 'SOURCED_FROM', '#8893a0', true), E('en2', 'sy1', 'SOURCED_FROM', '#8893a0', true), E('en3', 'sy1', 'SOURCED_FROM', '#8893a0', true),
    E('en2', 'sy2', 'CLAIM_FROM', '#8893a0', true), E('en1', 'sy3', 'LAB_FROM', '#8893a0', true), E('pt', 'sy4', 'RX_FROM', '#8893a0', true),
    E('en1', 'dx1', 'DIAGNOSED', '#c0392b'), E('en3', 'dx2', 'DIAGNOSED', '#c0392b')
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10.5 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 155, avoidOverlap: 0.55 }, stabilization: { iterations: 280 } },
    layout: { randomSeed: 6 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
