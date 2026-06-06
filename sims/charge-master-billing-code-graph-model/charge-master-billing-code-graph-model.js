// Charge Master & Billing Code Graph Model - vis-network
// CANVAS_HEIGHT: 486
// How charge-master (CDM) items connect to billing codes, revenue codes, and departments,
// so a graph can answer pricing, variance, and revenue-optimization questions across the
// chargemaster.

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
  main.insertAdjacentHTML('afterbegin', `<div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Charge Master &amp; Billing Code Graph</div><div class="vn-legend" id="vn-legend"></div></div>`);

  const GROUPS = {
    cdm:     { color: '#e8821a', shape: 'box', label: 'ChargeMaster item' },
    code:    { color: '#5fa0e0', shape: 'box', label: 'Billing code' },
    revenue: { color: '#caa017', shape: 'dot', label: 'Revenue code' },
    dept:    { color: '#2e7d32', shape: 'hexagon', label: 'Department' }
  };
  const nodes = [
    { id: 'cdm1', label: 'CDM-10234\nED Visit L3', group: 'cdm' },
    { id: 'cdm2', label: 'CDM-20455\nChest X-ray', group: 'cdm' },
    { id: 'cdm3', label: 'CDM-30122\nMetabolic Panel', group: 'cdm' },
    { id: 'c1', label: '99283 (CPT)', group: 'code' },
    { id: 'c2', label: '71045 (CPT)', group: 'code' },
    { id: 'c3', label: '80053 (CPT)', group: 'code' },
    { id: 'c4', label: 'E11.9 (ICD-10)', group: 'code' },
    { id: 'rv1', label: '0450 ED', group: 'revenue' },
    { id: 'rv2', label: '0320 Radiology', group: 'revenue' },
    { id: 'rv3', label: '0301 Lab', group: 'revenue' },
    { id: 'd1', label: 'Emergency', group: 'dept' },
    { id: 'd2', label: 'Radiology', group: 'dept' },
    { id: 'd3', label: 'Laboratory', group: 'dept' }
  ];
  const E = (from, to, label, color, dashes) => ({ from, to, label, color: { color }, dashes: dashes || false, font: { color: '#555', size: 9.5 } });
  const edges = [
    E('cdm1', 'c1', 'MAPS_TO', '#5fa0e0'), E('cdm1', 'c4', 'MAPS_TO', '#5fa0e0'), E('cdm2', 'c2', 'MAPS_TO', '#5fa0e0'), E('cdm3', 'c3', 'MAPS_TO', '#5fa0e0'),
    E('cdm1', 'rv1', 'HAS_REVENUE_CODE', '#caa017'), E('cdm2', 'rv2', 'HAS_REVENUE_CODE', '#caa017'), E('cdm3', 'rv3', 'HAS_REVENUE_CODE', '#caa017'),
    E('cdm1', 'd1', 'BELONGS_TO', '#2e7d32', true), E('cdm2', 'd2', 'BELONGS_TO', '#2e7d32', true), E('cdm3', 'd3', 'BELONGS_TO', '#2e7d32', true)
  ];
  document.getElementById('vn-legend').innerHTML = Object.values(GROUPS).map(g => `<div class="row"><span class="sw" style="background:${g.color}"></span>${g.label}</div>`).join('');
  const groupOpts = {}; Object.keys(GROUPS).forEach(k => groupOpts[k] = { color: { background: GROUPS[k].color, border: '#333' }, shape: GROUPS[k].shape, font: { color: GROUPS[k].shape === 'box' ? '#fff' : '#1a2733' } });
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    groups: groupOpts, nodes: { borderWidth: 2, size: 18, font: { size: 10.5 }, margin: 7 },
    edges: { arrows: 'to', smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 150, avoidOverlap: 0.55 }, stabilization: { iterations: 280 } },
    layout: { randomSeed: 9 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
});
