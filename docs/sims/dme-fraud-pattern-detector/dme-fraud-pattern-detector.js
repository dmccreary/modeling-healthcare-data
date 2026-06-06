// DME Fraud Pattern Detector - vis-network
// CANVAS_HEIGHT: 506
// A physician–DME-supplier referral network. Toggle red flags (referral concentration,
// geographic distance, specialty mismatch, patient-address clustering) and watch each
// supplier's risk score and color update — separating a seeded fraud supplier from legit ones.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  const style = document.createElement('style');
  style.textContent = `
    .vn-wrap { position: relative; height: 506px; }
    #vn-net { position: absolute; left: 0; top: 0; width: 63%; height: 506px; background: #fbfdff; border: 1px solid #ccd5dd; box-sizing: border-box; }
    .vn-title { position: absolute; top: 6px; left: 0; width: 63%; text-align: center; font-weight: bold; font-size: 15px; color: #1a2733; pointer-events: none; }
    #vn-panel { position: absolute; right: 0; top: 0; width: 35.5%; height: 506px; box-sizing: border-box; padding: 8px 10px; font-size: 12px; color: #1a2733; overflow: auto; }
    #vn-panel label { font-size: 11.5px; display:block; margin: 2px 0; }
    #vn-panel table { width: 100%; border-collapse: collapse; margin-top: 4px; }
    #vn-panel td, #vn-panel th { text-align: left; padding: 2px 4px; border-bottom: 1px solid #eef; font-size: 11px; }
    #vn-panel .box { background: #f4f8fc; border: 1px solid #dde6ef; border-radius: 6px; padding: 7px 9px; margin-top: 8px; font-size: 11px; line-height: 1.35; }
  `;
  document.head.appendChild(style);
  main.insertAdjacentHTML('afterbegin', `
    <div class="vn-wrap"><div id="vn-net"></div><div class="vn-title">Physician → DME Supplier Network</div>
    <div id="vn-panel">
      <b>Red-flag signals</b>
      <label><input type="checkbox" class="fl" value="conc" checked> Referral concentration</label>
      <label><input type="checkbox" class="fl" value="dist" checked> Geographic distance</label>
      <label><input type="checkbox" class="fl" value="mis" checked> Specialty mismatch</label>
      <label><input type="checkbox" class="fl" value="clus" checked> Patient-address clustering</label>
      <div style="margin-top:6px"><b>Suppliers by risk</b><table id="dm-tbl"></table></div>
      <div class="box" id="dm-det"></div>
    </div></div>`);

  const PHYS = [{ id: 'phA', label: 'Dr. Allen\n(Podiatry)' }, { id: 'phB', label: 'Dr. Brooks\n(Family Med)' }, { id: 'phC', label: 'Dr. Cole\n(Ortho)' }, { id: 'phD', label: 'Dr. Diaz\n(Internal Med)' }];
  // suppliers with boolean flags
  const SUP = [
    { id: 'mediq', name: 'MediEquip', billing: 30, flags: {}, note: 'Spread referrals, local patients, matched specialties.' },
    { id: 'homec', name: 'HomeCare DME', billing: 26, flags: { dist: true }, note: 'Serves a wide rural area (distance only).' },
    { id: 'valdme', name: 'ValueDME', billing: 38, flags: { dist: true, clus: true }, note: 'Distant patients clustered at a few addresses.' },
    { id: 'quick', name: 'QuickBrace', billing: 70, flags: { conc: true, dist: true, mis: true, clus: true }, note: 'Nearly all referrals from 2 physicians, distant clustered patients, podiatrist ordering power wheelchairs.' }
  ];
  // referral edges [phys, supplier, count]
  const REF = [
    ['phA', 'mediq', 12], ['phC', 'mediq', 10], ['phD', 'mediq', 8],
    ['phB', 'homec', 14], ['phD', 'homec', 9],
    ['phB', 'valdme', 11], ['phC', 'valdme', 16],
    ['phA', 'quick', 40], ['phB', 'quick', 35], ['phC', 'quick', 3]
  ];

  const nodes = PHYS.map(p => ({ id: p.id, label: p.label, group: 'phys', shape: 'square', color: { background: '#3b78c3', border: '#1f4e82' }, font: { color: '#fff', size: 10 } }))
    .concat(SUP.map(s => ({ id: s.id, label: s.name, shape: 'dot', size: 14 + s.billing / 4 })));
  const edges = REF.map(([a, b, w], i) => ({ id: 'e' + i, from: a, to: b, arrows: 'to', width: 1 + w / 12, color: { color: '#c2cad1' }, label: String(w), font: { size: 8, color: '#889' } }));
  const net = new vis.Network(document.getElementById('vn-net'), { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }, {
    nodes: { borderWidth: 2, font: { size: 11 } }, edges: { smooth: { type: 'dynamic' }, font: { align: 'middle' } },
    physics: { barnesHut: { springLength: 150, avoidOverlap: 0.5 }, stabilization: { iterations: 320 } },
    layout: { randomSeed: 2 }, interaction: { zoomView: false, dragView: false, navigationButtons: true, hover: true }
  });
  net.once('stabilizationIterationsDone', () => net.setOptions({ physics: false }));
  const nds = net.body.data.nodes;

  function active() { return Array.from(document.querySelectorAll('.fl')).filter(c => c.checked).map(c => c.value); }
  function risk(s) { const a = active(); return a.filter(f => s.flags[f]).length; }
  function update() {
    const a = active(), maxF = a.length || 1;
    SUP.forEach(s => { const r = risk(s), frac = r / maxF;
      const bg = frac === 0 ? '#bfe3c8' : lerpHex('#ffd9a8', '#c0392b', frac);
      nds.update({ id: s.id, color: { background: bg, border: frac > 0.5 ? '#7a1c14' : '#333' }, font: { color: '#1a2733' } });
    });
    const ranked = [...SUP].sort((x, y) => risk(y) - risk(x));
    document.getElementById('dm-tbl').innerHTML = '<tr><th>Supplier</th><th>Flags</th><th>$</th></tr>' +
      ranked.map(s => { const r = risk(s); const col = r >= 3 ? '#c0392b' : r >= 1 ? '#e8821a' : '#1c7a30'; return `<tr><td>${s.name}</td><td style="color:${col};font-weight:bold">${r}/${maxF}</td><td>$${s.billing}k</td></tr>`; }).join('');
    const top = ranked[0];
    document.getElementById('dm-det').innerHTML = `<b>${top.name}</b> — risk ${risk(top)}/${maxF}<br>${top.note}` + (risk(top) >= 3 ? '<br><span style="color:#c0392b"><b>Multiple converging signals → investigate.</b></span>' : '');
  }
  function lerpHex(a, b, t) { const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)], pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)]; const c = pa.map((x, i) => Math.round(x + (pb[i] - x) * t)); return 'rgb(' + c.join(',') + ')'; }
  document.querySelectorAll('.fl').forEach(c => c.addEventListener('change', update));
  update();
});
