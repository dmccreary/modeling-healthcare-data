// Symptom-Disease Diagnostic Network - vis-network
// CANVAS_HEIGHT: 486
// Many-to-many relationships between symptoms and diseases: a patient reports symptom
// instances that are instances of symptom types, which are probabilistically associated
// with candidate diseases — the structure behind differential diagnosis.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Symptom-Disease Diagnostic Network</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    patient:  { color: '#3b78c3', shape: 'dot', label: 'Patient' },
    instance: { color: '#e3c044', shape: 'square', label: 'Symptom instance' },
    symptom:  { color: '#caa017', shape: 'dot', label: 'Symptom type' },
    disease:  { color: '#c0392b', shape: 'hexagon', label: 'Disease' }
  };
  const nodes = [
    { id: 'pt', label: 'Patient A', group: 'patient', size: 26 },
    { id: 'i1', label: 'Chest pain\n(severe, 2hr)', group: 'instance' },
    { id: 'i2', label: 'SOB\n(mod, 1 day)', group: 'instance' },
    { id: 'i3', label: 'Fatigue\n(mild, 2wk)', group: 'instance' },
    { id: 'st1', label: 'Chest Pain', group: 'symptom' },
    { id: 'st2', label: 'Dyspnea', group: 'symptom' },
    { id: 'st3', label: 'Fatigue', group: 'symptom' },
    { id: 'dz1', label: 'MI (I21)', group: 'disease' },
    { id: 'dz2', label: 'PE (I26)', group: 'disease' },
    { id: 'dz3', label: 'GERD (K21.9)', group: 'disease' },
    { id: 'dz4', label: 'Anxiety (F41.9)', group: 'disease' }
  ];
  const E = (from, to, label, color, dashes) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 10 } });
  const edges = [
    E('pt', 'i1', 'REPORTS', '#3b78c3'), E('pt', 'i2', 'REPORTS', '#3b78c3'), E('pt', 'i3', 'REPORTS', '#3b78c3'),
    E('i1', 'st1', 'INSTANCE_OF', '#caa017', true), E('i2', 'st2', 'INSTANCE_OF', '#caa017', true), E('i3', 'st3', 'INSTANCE_OF', '#caa017', true),
    E('st1', 'dz1', 'p=0.35', '#c0392b'), E('st1', 'dz3', 'p=0.20', '#c0392b'),
    E('st2', 'dz1', 'p=0.25', '#c0392b'), E('st2', 'dz2', 'p=0.40', '#c0392b'),
    E('st3', 'dz4', 'p=0.30', '#c0392b'), E('st3', 'dz1', 'p=0.15', '#c0392b'), E('st2', 'dz4', 'p=0.18', '#c0392b')
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 11 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 150, avoidOverlap: 0.5 }, stabilization: { iterations: 250 } },
    layout: { randomSeed: 5 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
