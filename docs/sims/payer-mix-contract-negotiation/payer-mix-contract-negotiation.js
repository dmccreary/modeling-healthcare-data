// Payer Mix and Contract Negotiation Calculator - Chart.js
// CANVAS_HEIGHT: 641
// Interactive: adjust each payer's volume share and contracted rate (and total
// charges) to see how mix and rate jointly determine net revenue. The bar chart
// shows charges vs net revenue per payer; the table shows the full math chain and
// the delta versus baseline.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .pm-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; font-size: 13px; }
    .pm-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; }
    .pm-sub { font-size: 12px; color: #556; text-align: center; margin: 2px 0 4px; }
    .pm-chartbox { position: relative; height: 240px; width: 100%; }
    .pm-controls { display: grid; grid-template-columns: 110px 1fr 1fr; gap: 4px 10px; align-items: center; margin: 6px 0; }
    .pm-controls .hdr { font-weight: bold; color: #445; font-size: 11.5px; }
    .pm-controls input[type=range] { width: 100%; vertical-align: middle; }
    .pm-controls .pname { font-weight: bold; }
    .pm-controls .val { font-size: 11.5px; color: #335; }
    .pm-charges { margin: 4px 0 6px; }
    .pm-charges input { width: 70px; }
    .pm-charges button { margin-left: 12px; padding: 3px 12px; cursor: pointer; border: 1px solid #99a; border-radius: 5px; background: #f2f5f8; }
    table.pm-tbl { width: 100%; border-collapse: collapse; font-size: 12px; margin-top: 4px; }
    table.pm-tbl th, table.pm-tbl td { border: 1px solid #d6dde3; padding: 2px 6px; text-align: right; }
    table.pm-tbl th:first-child, table.pm-tbl td:first-child { text-align: left; }
    table.pm-tbl tfoot td { font-weight: bold; background: #f1f5f9; }
    .pm-delta.up { color: #1c7a30; font-weight: bold; }
    .pm-delta.down { color: #c0392b; font-weight: bold; }
  `;
  document.head.appendChild(style);

  const payers = [
    { name: 'Commercial', weight: 35, rate: 65, color: '#3b78c3' },
    { name: 'Medicare',   weight: 30, rate: 42, color: '#2e7d32' },
    { name: 'Medicaid',   weight: 25, rate: 33, color: '#e8821a' },
    { name: 'Self-pay',   weight: 10, rate: 12, color: '#7b3fb3' }
  ];
  let totalCharges = 50; // $M

  function compute(list, charges) {
    const sumW = list.reduce((s, p) => s + p.weight, 0) || 1;
    let totalNet = 0;
    const rows = list.map(p => {
      const share = p.weight / sumW;
      const payerCharges = share * charges;
      const net = payerCharges * p.rate / 100;
      totalNet += net;
      return { name: p.name, color: p.color, share, payerCharges, rate: p.rate, net };
    });
    return { rows, totalNet };
  }
  const baseline = compute(payers.map(p => ({ ...p })), 50).totalNet;

  main.insertAdjacentHTML('afterbegin', `
    <div class="pm-wrap">
      <div class="pm-title">Payer Mix &amp; Contract Negotiation</div>
      <div class="pm-sub">Adjust volume share and contracted rate per payer. Net revenue = (share &times; total charges) &times; rate. Mix and rate are both negotiation levers.</div>
      <div class="pm-chartbox"><canvas id="pm"></canvas></div>
      <div class="pm-charges">Total annual charges: $<input id="pm-charges" type="number" min="1" max="500" step="1" value="50">M
        <button id="pm-reset">Reset to baseline</button></div>
      <div class="pm-controls" id="pm-ctrls">
        <div class="hdr">Payer</div><div class="hdr">Volume share</div><div class="hdr">Contracted rate</div>
      </div>
      <table class="pm-tbl">
        <thead><tr><th>Payer</th><th>Share</th><th>Charges ($M)</th><th>Rate</th><th>Net rev ($M)</th></tr></thead>
        <tbody id="pm-tbody"></tbody>
        <tfoot><tr><td>Total</td><td></td><td></td><td></td><td id="pm-total"></td></tr>
        <tr><td colspan="4">Change vs baseline ($${baseline.toFixed(2)}M)</td><td id="pm-delta"></td></tr></tfoot>
      </table>
    </div>`);

  // build per-payer sliders
  const ctrls = document.getElementById('pm-ctrls');
  payers.forEach((p, i) => {
    const row = document.createElement('div'); row.style.display = 'contents';
    row.innerHTML = `
      <div class="pname" style="color:${p.color}">${p.name}</div>
      <div><input type="range" id="w${i}" min="0" max="100" step="1" value="${p.weight}">
        <span class="val" id="wv${i}"></span></div>
      <div><input type="range" id="r${i}" min="0" max="100" step="1" value="${p.rate}">
        <span class="val" id="rv${i}"></span></div>`;
    ctrls.appendChild(row);
  });

  const chart = new Chart(document.getElementById('pm'), {
    type: 'bar',
    data: { labels: payers.map(p => p.name), datasets: [
      { label: 'Payer charges ($M)', backgroundColor: payers.map(() => '#c7d7e8'), data: [] },
      { label: 'Net revenue ($M)', backgroundColor: payers.map(p => p.color), data: [] }
    ] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' },
        tooltip: { callbacks: { label: i => '  ' + i.dataset.label + ': $' + i.raw.toFixed(2) + 'M' } } },
      scales: { y: { beginAtZero: true, title: { display: true, text: '$M' } } }
    }
  });

  function refresh() {
    const { rows, totalNet } = compute(payers, totalCharges);
    chart.data.datasets[0].data = rows.map(r => r.payerCharges);
    chart.data.datasets[1].data = rows.map(r => r.net);
    chart.update('none');
    const tb = document.getElementById('pm-tbody');
    tb.innerHTML = rows.map(r => `<tr>
      <td style="color:${r.color}">${r.name}</td>
      <td>${(r.share*100).toFixed(1)}%</td>
      <td>$${r.payerCharges.toFixed(2)}</td>
      <td>${r.rate}%</td>
      <td>$${r.net.toFixed(2)}</td></tr>`).join('');
    document.getElementById('pm-total').textContent = '$' + totalNet.toFixed(2) + 'M';
    const d = totalNet - baseline;
    const de = document.getElementById('pm-delta');
    de.textContent = (d >= 0 ? '+$' : '-$') + Math.abs(d).toFixed(2) + 'M';
    de.className = 'pm-delta ' + (d >= 0 ? 'up' : 'down');
    payers.forEach((p, i) => {
      const sumW = payers.reduce((s, q) => s + q.weight, 0) || 1;
      document.getElementById('wv' + i).textContent = (p.weight / sumW * 100).toFixed(0) + '%';
      document.getElementById('rv' + i).textContent = p.rate + '%';
    });
  }

  payers.forEach((p, i) => {
    document.getElementById('w' + i).addEventListener('input', e => { p.weight = +e.target.value; refresh(); });
    document.getElementById('r' + i).addEventListener('input', e => { p.rate = +e.target.value; refresh(); });
  });
  document.getElementById('pm-charges').addEventListener('input', e => {
    totalCharges = Math.max(1, +e.target.value || 1); refresh();
  });
  document.getElementById('pm-reset').addEventListener('click', () => {
    const def = [[35,65],[30,42],[25,33],[10,12]];
    payers.forEach((p, i) => { p.weight = def[i][0]; p.rate = def[i][1];
      document.getElementById('w' + i).value = p.weight; document.getElementById('r' + i).value = p.rate; });
    totalCharges = 50; document.getElementById('pm-charges').value = 50; refresh();
  });

  refresh();
});
