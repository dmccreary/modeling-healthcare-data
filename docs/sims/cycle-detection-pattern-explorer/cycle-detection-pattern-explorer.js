// Cycle Detection Pattern Explorer - vis-network
// CANVAS_HEIGHT: 506
// Directed REFERS_TO edges form a provider referral network with a seeded 3-cycle and
// 4-cycle. Highlight cycles to distinguish benign coordination loops from circular
// referral rings whose members also share FINANCIAL_RELATIONSHIP edges (kickback-suggestive).

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  const style = document.createElement('style');
  style.textContent = `
    .vn-wrap { position: relative; height: 506px; }
    #vn-net { position: absolute; left: 0; top: 0; width: 63%; height: 506px; background: #fbfdff; border: 1px solid #ccd5dd; box-sizing: border-box; }
    .vn-title { position: absolute; top: 6px; left: 0; width: 63%; text-align: center; font-weight: bold; font-size: 15px; color: #1a2733; pointer-events: none; }
    #vn-panel { position: absolute; right: 0; top: 0; width: 35.5%; height: 506px; box-sizing: border-box; padding: 8px 10px; font-size: 12px; color: #1a2733; overflow: auto; }
    #vn-panel select { font-size: 12px; padding: 2px; width: 100%; }
    #vn-panel .box { background: #f4f8fc; border: 1px solid #dde6ef; border-radius: 6px; padding: 7px 9px; margin-top: 8px; font-size: 11.5px; line-height: 1.35; }
    #vn-panel .lg { display:flex; align-items:center; gap:6px; margin:3px 0; font-size:11px; }
    #vn-panel .sw { width: 22px; height: 0; border-top: 3px solid; display:inline-block; }
  `;
  document.head.appendChild(style);
  main.insertAdjacentHTML('afterbegin', `
    <div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Provider Referral Cycle Explorer</div>
    <div id="vn-panel">
      <b>Highlight pattern</b>
      <select id="cy-sel"><option>None</option><option>3-cycles</option><option>4-cycles</option><option>Financial loops</option></select>
      <div style="margin-top:8px">
        <div class="lg"><span class="sw" style="border-color:#9aa6b0"></span> REFERS_TO</div>
        <div class="lg"><span class="sw" style="border-color:#caa017;border-top-style:dashed"></span> FINANCIAL_RELATIONSHIP</div>
        <div class="lg"><span class="sw" style="border-color:#c0392b"></span> highlighted cycle</div>
      </div>
      <div class="box" id="cy-info"></div>
    </div></div>`);

  const n = 14;
  // directed REFERS_TO edges (with a 3-cycle 0-1-2 and a 4-cycle 5-6-7-8)
  const REF = [[0,1],[1,2],[2,0],[5,6],[6,7],[7,8],[8,5],[3,0],[1,4],[9,5],[8,10],[2,11],[12,6],[13,7],[4,9],[11,3]];
  // financial relationships (undirected, dashed gold) among cycle members
  const FIN = [[0,1],[1,2],[0,2],[5,7],[6,8]];
  const adj = {}; for (let i = 0; i < n; i++) adj[i] = [];
  REF.forEach(([a, b]) => adj[a].push(b));

  function cyclesOfLen(L) {
    const res = [];
    function dfs(s, path, vis) {
      const u = path[path.length - 1];
      for (const v of adj[u]) {
        if (v === s && path.length === L) { if (Math.min(...path) === s) res.push([...path]); }
        else if (path.length < L && !vis.has(v) && v > -1) { vis.add(v); dfs(s, [...path, v], vis); vis.delete(v); }
      }
    }
    for (let s = 0; s < n; s++) dfs(s, [s], new Set([s]));
    // dedupe
    const seen = new Set(), out = [];
    res.forEach(c => { const key = c.join(','); if (!seen.has(key)) { seen.add(key); out.push(c); } });
    return out;
  }

  const nodes = Array.from({ length: n }, (_, i) => ({ id: i, label: 'P' + i, shape: 'dot', color: { background: '#cdd5dc', border: '#8893a0' } }));
  const edges = REF.map(([a, b], i) => ({ id: 'r' + i, from: a, to: b, arrows: 'to', color: { color: '#9aa6b0' } }))
    .concat(FIN.map(([a, b], i) => ({ id: 'f' + i, from: a, to: b, dashes: [5, 4], color: { color: '#caa017' }, arrows: '' })));
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    nodes: { borderWidth: 2, size: 16, font: { size: 12 } }, edges: { smooth: { type: 'dynamic' } },
    physics: { barnesHut: { springLength: 120, avoidOverlap: 0.45 }, stabilization: { iterations: 320 } },
    layout: { randomSeed: 11 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
  const nds = net.body.data.nodes, eds = net.body.data.edges;

  function reset() {
    nds.update(nodes.map(nd => ({ id: nd.id, color: { background: '#cdd5dc', border: '#8893a0' } })));
    eds.update(REF.map((e, i) => ({ id: 'r' + i, color: { color: '#9aa6b0' }, width: 1 })));
    eds.update(FIN.map((e, i) => ({ id: 'f' + i, color: { color: '#caa017' }, width: 2 })));
  }
  function highlightCycles(L) {
    reset();
    const cyc = cyclesOfLen(L);
    const inNodes = new Set();
    cyc.forEach(c => { for (let i = 0; i < c.length; i++) { inNodes.add(c[i]); const a = c[i], b = c[(i + 1) % c.length]; const idx = REF.findIndex(e => e[0] === a && e[1] === b); if (idx >= 0) eds.update({ id: 'r' + idx, color: { color: '#c0392b' }, width: 3 }); } });
    nds.update([...inNodes].map(id => ({ id, color: { background: '#e8a0a0', border: '#c0392b' } })));
    const withFin = cyc.filter(c => { const set = new Set(c); return FIN.some(([a, b]) => set.has(a) && set.has(b)); });
    document.getElementById('cy-info').innerHTML = `<b>${cyc.length} ${L}-cycle(s) found.</b><br>` +
      (cyc.length ? cyc.map(c => 'P' + c.join('→P') + '→P' + c[0]).join('<br>') : 'None.') +
      (withFin.length ? `<br><span style="color:#c0392b"><b>${withFin.length} also share FINANCIAL ties → kickback-suggestive.</b></span>` : '');
  }
  function highlightFinancial() {
    reset();
    const inNodes = new Set();
    FIN.forEach(([a, b], i) => { eds.update({ id: 'f' + i, color: { color: '#c0392b' }, width: 4 }); inNodes.add(a); inNodes.add(b); });
    nds.update([...inNodes].map(id => ({ id, color: { background: '#ffe0a0', border: '#caa017' } })));
    document.getElementById('cy-info').innerHTML = `<b>${FIN.length} FINANCIAL_RELATIONSHIP edges.</b><br>A referral cycle whose members also share financial ties is a classic kickback signal — money and referrals flowing in the same closed loop.`;
  }
  function update() {
    const v = document.getElementById('cy-sel').value;
    if (v === 'None') { reset(); document.getElementById('cy-info').innerHTML = 'Choose a pattern to highlight. A referral <i>cycle</i> means referrals flow in a closed loop; cycles overlapping financial ties warrant scrutiny.'; }
    else if (v === '3-cycles') highlightCycles(3);
    else if (v === '4-cycles') highlightCycles(4);
    else highlightFinancial();
  }
  document.getElementById('cy-sel').addEventListener('change', update);
  document.getElementById('cy-sel').value = '3-cycles'; // illustrative default
  update();
});
