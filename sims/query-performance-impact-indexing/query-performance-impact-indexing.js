// Query Performance Impact of Indexing - Chart.js
// CANVAS_HEIGHT: 492
// Line chart (log-log) showing patient-diagnosis query execution time vs result-set
// size for no index, a single property index, and a composite index. Tooltips add the
// speedup factor and equivalent throughput.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .cc-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; }
    .cc-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; }
    .cc-sub { font-size: 12.5px; color: #556; text-align: center; margin: 2px 0 6px; }
    .cc-chartbox { position: relative; height: 430px; width: 100%; }
  `;
  document.head.appendChild(style);

  main.insertAdjacentHTML('afterbegin', `
    <div class="cc-wrap">
      <div class="cc-title">Impact of Indexing on Patient-Diagnosis Query Performance</div>
      <div class="cc-sub">Log-log scale. A composite index keeps queries sub-second up to 100K patients; without an index, large queries time out.</div>
      <div class="cc-chartbox"><canvas id="cc"></canvas></div>
    </div>`);

  const sizes = [10, 100, 1000, 10000, 100000, 1000000];
  const mk = vals => sizes.map((s, i) => ({ x: s, y: vals[i] }));
  const none = [50, 250, 1800, 15000, 125000, 980000];
  const prop = [5, 12, 45, 180, 950, 6200];
  const comp = [3, 8, 28, 110, 520, 3100];

  new Chart(document.getElementById('cc'), {
    type: 'line',
    data: {
      datasets: [
        { label: 'No index (full scan)', data: mk(none), borderColor: '#c0392b', backgroundColor: '#c0392b', borderWidth: 2, tension: 0.2, pointRadius: 3, _set: 0 },
        { label: 'Single property index', data: mk(prop), borderColor: '#3b78c3', backgroundColor: '#3b78c3', borderWidth: 2, tension: 0.2, pointRadius: 3, _set: 1 },
        { label: 'Composite index', data: mk(comp), borderColor: '#2e7d32', backgroundColor: '#2e7d32', borderWidth: 3, tension: 0.2, pointRadius: 4, _set: 2 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'nearest', intersect: false },
      plugins: {
        legend: { position: 'top' },
        tooltip: { callbacks: {
          title: (items) => 'Result size: ' + Number(items[0].raw.x).toLocaleString() + ' nodes',
          label: (i) => {
            const ms = i.raw.y, idx = i.dataIndex, qps = ms > 0 ? (1000 / ms) : 0;
            const sp = none[idx] / ms;
            let t = '  ' + i.dataset.label + ': ' + ms.toLocaleString() + ' ms';
            if (i.dataset._set > 0) t += '  (' + sp.toFixed(0) + 'x faster, ~' + qps.toFixed(qps < 10 ? 1 : 0) + ' q/s)';
            return t;
          }
        } }
      },
      scales: {
        x: { type: 'logarithmic', min: 10, max: 1000000, title: { display: true, text: 'Query result size (nodes, log scale)' },
             ticks: { callback: v => ([10,100,1000,10000,100000,1000000].includes(v))
               ? (v >= 1000000 ? '1M' : v >= 1000 ? (v/1000)+'k' : v) : null } },
        y: { type: 'logarithmic', title: { display: true, text: 'Execution time (ms, log scale)' },
             ticks: { callback: v => ([1,10,100,1000,10000,100000,1000000].includes(v))
               ? (v >= 1000 ? (v/1000)+'s' : v + 'ms') : null } }
      }
    }
  });
});
