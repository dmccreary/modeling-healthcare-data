// Patient Identifier Graph Model - vis-network
// CANVAS_HEIGHT: 486
// How multiple identifiers (MRNs, SSN, insurance member ID) all connect to a single
// master patient record, each issued by a different identity system — the core of
// master patient indexing and record linkage.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Patient Identifier Graph Model</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    patient:    { color: '#3b78c3', shape: 'dot', label: 'Patient (master record)' },
    identifier: { color: '#e8821a', shape: 'box', label: 'Identifier' },
    system:     { color: '#8893a0', shape: 'hexagon', label: 'Identity system' }
  };
  const nodes = [
    { id: 'pt', label: 'Jane Smith\nDOB 1985-03-15', group: 'patient', size: 30 },
    { id: 'id1', label: 'MRN-12345', group: 'identifier' },
    { id: 'id2', label: 'MRN-98765', group: 'identifier' },
    { id: 'id3', label: 'SSN-***-6789', group: 'identifier' },
    { id: 'id4', label: 'INSUR-987654', group: 'identifier' },
    { id: 'sy1', label: 'Hospital A EHR', group: 'system' },
    { id: 'sy2', label: 'Hospital B EHR', group: 'system' },
    { id: 'sy3', label: 'National SSN\nRegistry', group: 'system' },
    { id: 'sy4', label: 'Insurance\nProvider X', group: 'system' }
  ];
  const E = (from, to, label, color, dashes) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 10 } });
  const edges = [
    E('pt', 'id1', 'HAS_IDENTIFIER', '#3b78c3'), E('pt', 'id2', 'HAS_IDENTIFIER', '#3b78c3'), E('pt', 'id3', 'HAS_IDENTIFIER', '#3b78c3'), E('pt', 'id4', 'HAS_IDENTIFIER', '#3b78c3'),
    E('id1', 'sy1', 'ISSUED_BY', '#8893a0', true), E('id2', 'sy2', 'ISSUED_BY', '#8893a0', true), E('id3', 'sy3', 'ISSUED_BY', '#8893a0', true), E('id4', 'sy4', 'ISSUED_BY', '#8893a0', true)
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 11 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 160, avoidOverlap: 0.5 }, stabilization: { iterations: 250 } },
    layout: { randomSeed: 3 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
