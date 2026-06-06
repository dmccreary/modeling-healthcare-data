// Medical Knowledge Graph - vis-network
// CANVAS_HEIGHT: 486
// Clinical entities (diseases, medications, symptoms, lab tests, patient conditions) and
// the typed relationships (TREATS, CAUSES, MEASURES, CONTRAINDICATED_IN, INTERACTS_WITH)
// that connect them into a queryable knowledge structure.

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

  main.insertAdjacentHTML('afterbegin', `
    <div class="vn-wrap">
      <div id="vn-net"></div>
      <div class="vn-title">Medical Knowledge Graph</div>
      <div class="vn-legend" id="vn-legend"></div>
    </div>`);

  const GROUPS = {
    disease:   { color: '#c0392b', shape: 'dot', label: 'Disease' },
    medication:{ color: '#3b78c3', shape: 'box', label: 'Medication' },
    symptom:   { color: '#caa017', shape: 'triangle', label: 'Symptom' },
    labtest:   { color: '#2e7d32', shape: 'hexagon', label: 'Lab Test' },
    condition: { color: '#e8821a', shape: 'dot', label: 'Patient Condition' }
  };
  const nodes = [
    { id: 'd1', label: 'Type 2 Diabetes', group: 'disease' },
    { id: 'd2', label: 'Hypertension', group: 'disease' },
    { id: 'd3', label: 'Chronic Kidney Disease', group: 'disease' },
    { id: 'm1', label: 'Metformin', group: 'medication' },
    { id: 'm2', label: 'Lisinopril', group: 'medication' },
    { id: 'm3', label: 'Amlodipine', group: 'medication' },
    { id: 's1', label: 'Polyuria', group: 'symptom' },
    { id: 's2', label: 'Polydipsia', group: 'symptom' },
    { id: 's3', label: 'Elevated BP', group: 'symptom' },
    { id: 'l1', label: 'HbA1c', group: 'labtest' },
    { id: 'l2', label: 'Creatinine', group: 'labtest' },
    { id: 'l3', label: 'Blood Pressure', group: 'labtest' },
    { id: 'c1', label: 'Severe Renal\nImpairment', group: 'condition' },
    { id: 'c2', label: 'Pregnancy', group: 'condition' }
  ];
  const E = (from, to, label, color, dashes) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 10 } });
  const edges = [
    E('m1', 'd1', 'TREATS', '#2e7d32'), E('m2', 'd2', 'TREATS', '#2e7d32'), E('m3', 'd2', 'TREATS', '#2e7d32'), E('m2', 'd3', 'TREATS', '#2e7d32'),
    E('d1', 's1', 'CAUSES', '#c0392b'), E('d1', 's2', 'CAUSES', '#c0392b'), E('d2', 's3', 'CAUSES', '#c0392b'),
    E('l1', 'd1', 'MEASURES', '#3b78c3', true), E('l2', 'd3', 'MEASURES', '#3b78c3', true), E('l3', 'd2', 'MEASURES', '#3b78c3', true),
    E('m1', 'c1', 'CONTRAINDICATED_IN', '#c0392b', true), E('m1', 'c2', 'CONTRAINDICATED_IN', '#c0392b', true),
    { from: 'm1', to: 'm2', label: 'INTERACTS_WITH', color: { color: '#7b3fb3' }, dashes: [4, 4], arrows: { to: true, from: true }, font: { color: '#7b3fb3', size: 10 } }
  ];

  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g =>
    `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');

  const groupOpts = {};
  Object.keys(GROUPS).forEach(k => { groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } }; });

  const net = new vis.Network(document.getElementById('vn-net'),
    { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) },
    {
      groups: groupOpts,
      nodes: { borderWidth: 2, size: 18, font: { size: 12, multi: false }, margin: 8 },
      edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
      physics: { barnesHut: { springLength: 150, avoidOverlap: 0.4 }, stabilization: { iterations: 250 } },
      layout: { randomSeed: 8 },
      interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
    });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
