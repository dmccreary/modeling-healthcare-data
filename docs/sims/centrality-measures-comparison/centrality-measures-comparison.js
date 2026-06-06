// Centrality Measures Comparison - vis-network
// CANVAS_HEIGHT: 506
// The SAME provider referral network ranked four ways. Degree finds busy hubs,
// betweenness finds bridges, closeness finds well-positioned nodes, and PageRank finds
// influentially-connected nodes — node size and shade encode the selected measure.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  const style = document.createElement('style');
  style.textContent = `
    .vn-wrap { position: relative; height: 506px; }
    #vn-net { position: absolute; left: 0; top: 0; width: 63%; height: 506px; background: #fbfdff; border: 1px solid #ccd5dd; box-sizing: border-box; }
    .vn-title { position: absolute; top: 6px; left: 0; width: 63%; text-align: center; font-weight: bold; font-size: 15px; color: #1a2733; pointer-events: none; }
    #vn-panel { position: absolute; right: 0; top: 0; width: 35.5%; height: 506px; box-sizing: border-box; padding: 8px 10px; font-size: 12px; color: #1a2733; overflow: auto; }
    #vn-panel select { font-size: 12px; padding: 2px; width: 100%; }
    #vn-panel table { width: 100%; border-collapse: collapse; margin-top: 6px; }
    #vn-panel td, #vn-panel th { text-align: left; padding: 2px 4px; border-bottom: 1px solid #eef; font-size: 11.5px; }
    #vn-panel .box { background: #f4f8fc; border: 1px solid #dde6ef; border-radius: 6px; padding: 7px 9px; margin-top: 8px; font-size: 11.5px; line-height: 1.35; }
    #vn-panel label { font-size: 12px; }
  `;
  document.head.appendChild(style);
  main.insertAdjacentHTML('afterbegin', `
    <div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Provider Referral Network</div>
    <div id="vn-panel">
      <b>Centrality measure</b>
      <select id="cm-sel"><option>Degree</option><option>Betweenness</option><option>Closeness</option><option>PageRank</option></select>
      <div style="margin-top:6px"><label><input type="checkbox" id="cm-lab" checked> Show score labels</label></div>
      <div id="cm-damp" style="margin-top:4px;display:none"><label>PageRank damping: <span id="cm-dval">0.85</span></label><br><input type="range" id="cm-damp-s" min="0.5" max="0.95" step="0.01" value="0.85" style="width:100%"></div>
      <div style="margin-top:8px"><b>Top 5</b><table id="cm-tbl"></table></div>
      <div class="box" id="cm-def"></div>
    </div></div>`);

  // 16-provider network with a hub (P0), a bridge (P6), and a dense cluster (P7)
  const ids = Array.from({ length: 16 }, (_, i) => 'P' + i);
  const EDG = [[0,1],[0,2],[0,3],[0,4],[0,5],[1,12],[1,13],[5,14],[0,6],[6,7],[7,8],[7,9],[7,10],[7,11],[8,9],[9,10],[10,11],[8,11],[11,15],[2,3]];
  const adj = {}; ids.forEach(id => adj[id] = new Set());
  EDG.forEach(([a, b]) => { adj['P' + a].add('P' + b); adj['P' + b].add('P' + a); });

  function bfs(src) { const d = {}; ids.forEach(i => d[i] = Infinity); d[src] = 0; const q = [src]; while (q.length) { const u = q.shift(); adj[u].forEach(v => { if (d[v] === Infinity) { d[v] = d[u] + 1; q.push(v); } }); } return d; }
  function degreeC() { const s = {}; ids.forEach(i => s[i] = adj[i].size); return s; }
  function closenessC() { const s = {}; ids.forEach(i => { const d = bfs(i); let sum = 0, reach = 0; ids.forEach(j => { if (d[j] < Infinity && j !== i) { sum += d[j]; reach++; } }); s[i] = sum > 0 ? reach / sum : 0; }); return s; }
  function betweennessC() { // Brandes, unweighted, undirected
    const C = {}; ids.forEach(i => C[i] = 0);
    ids.forEach(s => {
      const S = [], P = {}, sigma = {}, d = {}; ids.forEach(i => { P[i] = []; sigma[i] = 0; d[i] = -1; });
      sigma[s] = 1; d[s] = 0; const Q = [s];
      while (Q.length) { const v = Q.shift(); S.push(v); adj[v].forEach(w => { if (d[w] < 0) { d[w] = d[v] + 1; Q.push(w); } if (d[w] === d[v] + 1) { sigma[w] += sigma[v]; P[w].push(v); } }); }
      const delta = {}; ids.forEach(i => delta[i] = 0);
      while (S.length) { const w = S.pop(); P[w].forEach(v => { delta[v] += (sigma[v] / sigma[w]) * (1 + delta[w]); }); if (w !== s) C[w] += delta[w]; }
    });
    ids.forEach(i => C[i] /= 2); return C;
  }
  function pagerankC(d) { let pr = {}; ids.forEach(i => pr[i] = 1 / ids.length); for (let it = 0; it < 60; it++) { const np = {}; ids.forEach(i => np[i] = (1 - d) / ids.length); ids.forEach(i => { const deg = adj[i].size || 1; adj[i].forEach(j => { np[j] += d * pr[i] / deg; }); }); pr = np; } return pr; }

  const DEF = {
    Degree: 'Degree centrality counts a node\'s direct connections. It highlights busy hubs — providers who refer to or from many others.',
    Betweenness: 'Betweenness counts how often a node lies on the shortest path between other pairs. It highlights bridges/brokers — a low-degree provider connecting two clusters scores high.',
    Closeness: 'Closeness is the inverse of average distance to all others. It highlights well-positioned providers who can reach the whole network quickly.',
    PageRank: 'PageRank scores a node by being connected to other important nodes. It highlights influential providers embedded among other influential ones.'
  };

  const nodesData = ids.map(id => ({ id, label: id, shape: 'dot' }));
  const net = new vis.Network(document.getElementById('vn-net'),
    { nodes: new vis.DataSet(nodesData), edges: new vis.DataSet(EDG.map(([a, b]) => ({ from: 'P' + a, to: 'P' + b, color: { color: '#c2cad1' } }))) },
    { nodes: { borderWidth: 2, font: { size: 11 } }, edges: { smooth: { type: 'dynamic' } },
      physics: { barnesHut: { springLength: 110, avoidOverlap: 0.4 }, stabilization: { iterations: 320 } },
      layout: { randomSeed: 7 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true } });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
  const ds = net.body.data.nodes;

  function update() {
    const m = document.getElementById('cm-sel').value, showLab = document.getElementById('cm-lab').checked;
    document.getElementById('cm-damp').style.display = (m === 'PageRank') ? 'block' : 'none';
    let s;
    if (m === 'Degree') s = degreeC(); else if (m === 'Closeness') s = closenessC(); else if (m === 'Betweenness') s = betweennessC();
    else s = pagerankC(parseFloat(document.getElementById('cm-damp-s').value));
    const vals = ids.map(i => s[i]), mx = Math.max(...vals) || 1;
    ds.update(ids.map(id => {
      const norm = s[id] / mx;
      const bg = lerpHex('#e1ebf5', '#0d3b66', norm);
      return { id, size: 12 + norm * 30, color: { background: bg, border: '#0d2c4a' }, font: { color: norm > 0.55 ? '#fff' : '#1a2733' }, label: showLab ? id + '\n' + fmt(s[id], m) : id };
    }));
    const ranked = ids.map(id => ({ id, v: s[id] })).sort((a, b) => b.v - a.v).slice(0, 5);
    document.getElementById('cm-tbl').innerHTML = '<tr><th>#</th><th>Provider</th><th>Score</th></tr>' +
      ranked.map((r, i) => `<tr><td>${i + 1}</td><td>${r.id}</td><td>${fmt(r.v, m)}</td></tr>`).join('');
    document.getElementById('cm-def').innerHTML = '<b>' + m + '</b><br>' + DEF[m];
    document.getElementById('cm-dval').textContent = parseFloat(document.getElementById('cm-damp-s').value).toFixed(2);
  }
  function fmt(v, m) { return (m === 'Degree') ? String(Math.round(v)) : v.toFixed(3); }
  function lerpHex(a, b, t) { const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)], pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)]; const c = pa.map((x, i) => Math.round(x + (pb[i] - x) * t)); return 'rgb(' + c.join(',') + ')'; }

  document.getElementById('cm-sel').addEventListener('change', update);
  document.getElementById('cm-lab').addEventListener('change', update);
  document.getElementById('cm-damp-s').addEventListener('input', update);
  update();
});
