// Formulary Management & Step Therapy Graph Model - vis-network
// CANVAS_HEIGHT: 486
// How benefit plans, formularies, drugs, and therapeutic classes connect — including
// step-therapy edges (try the generic first) and therapeutic alternatives — the structure
// that drives real-time pharmacy claims adjudication.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Formulary &amp; Step Therapy Graph</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    plan:      { color: '#9b6fd0', shape: 'dot', label: 'Benefit plan' },
    formulary: { color: '#2e7d32', shape: 'hexagon', label: 'Formulary' },
    drug:      { color: '#e8821a', shape: 'box', label: 'Drug' },
    class:     { color: '#3b78c3', shape: 'box', label: 'Therapeutic class' }
  };
  const nodes = [
    { id: 'pl', label: 'Gold PPO 500', group: 'plan', size: 24 },
    { id: 'fm', label: 'Standard Formulary\n2024 v3', group: 'formulary', size: 24 },
    { id: 'tc', label: 'HMG-CoA Reductase\nInhibitors (statins)', group: 'class' },
    { id: 'dg1', label: 'Atorvastatin 20mg\n(Tier 1, generic)', group: 'drug' },
    { id: 'dg2', label: 'Lipitor 20mg\n(Tier 3, brand)', group: 'drug' },
    { id: 'dg3', label: 'Rosuvastatin 10mg\n(Tier 1, generic)', group: 'drug' },
    { id: 'dg4', label: 'Crestor 10mg\n(Tier 3, brand)', group: 'drug' }
  ];
  const E = (from, to, label, color, dashes, both) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 9.5 }, arrows: both ? { to: true, from: true } : 'to' });
  const edges = [
    E('pl', 'fm', 'USES_FORMULARY', '#9b6fd0'),
    E('fm', 'dg1', 'INCLUDES', '#2e7d32'), E('fm', 'dg2', 'INCLUDES', '#2e7d32'), E('fm', 'dg3', 'INCLUDES', '#2e7d32'), E('fm', 'dg4', 'INCLUDES', '#2e7d32'),
    E('dg1', 'tc', 'MEMBER_OF', '#3b78c3', true), E('dg2', 'tc', 'MEMBER_OF', '#3b78c3', true), E('dg3', 'tc', 'MEMBER_OF', '#3b78c3', true), E('dg4', 'tc', 'MEMBER_OF', '#3b78c3', true),
    E('dg1', 'dg2', 'STEP_THERAPY_BEFORE', '#c0392b'), E('dg3', 'dg4', 'STEP_THERAPY_BEFORE', '#c0392b'),
    E('dg1', 'dg3', 'ALTERNATIVE_TO', '#888', true, true)
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 160, avoidOverlap: 0.55 }, stabilization: { iterations: 300 } },
    layout: { randomSeed: 14 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
