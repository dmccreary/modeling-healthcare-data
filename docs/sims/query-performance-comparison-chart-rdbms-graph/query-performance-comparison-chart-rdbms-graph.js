// Query Performance: RDBMS JOINs vs Graph Traversal - Chart.js
// CANVAS_HEIGHT: 452
// Log-scale line chart: relational JOIN query time grows exponentially with relationship
// depth, while graph traversal stays nearly constant — the core performance argument for
// graph databases on deeply-connected healthcare data.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');
  const style = document.createElement('style');
  style.textContent = `
    .qp-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; }
    .qp-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; }
    .qp-sub { font-size: 12.5px; color: #556; text-align: center; margin: 2px 0 6px; }
    .qp-chartbox { position: relative; height: 390px; width: 100%; }
  `;
  document.head.appendChild(style);
  main.insertAdjacentHTML('afterbegin', `
    <div class="qp-wrap">
      <div class="qp-title">Query Response Time vs. Relationship Depth</div>
      <div class="qp-sub">Relational JOINs degrade exponentially; graph traversal stays near-constant (log scale).</div>
      <div class="qp-chartbox"><canvas id="qp"></canvas></div>
    </div>`);

  const hops = [1, 2, 3, 4, 5, 6];
  const rdbms = [15, 110, 950, 8200, 71000, 100000];   // JOIN explosion
  const graph = [8, 9, 11, 12, 14, 16];                // constant-time traversal

  new Chart(document.getElementById('qp'), {
    type: 'line',
    data: {
      labels: hops,
      datasets: [
        { label: 'RDBMS with JOINs', data: rdbms, borderColor: '#c0392b', backgroundColor: '#c0392b', pointStyle: 'rect', pointRadius: 5, borderWidth: 2.5, tension: 0.2 },
        { label: 'Graph traversal', data: graph, borderColor: '#2e7d32', backgroundColor: '#2e7d32', pointStyle: 'circle', pointRadius: 5, borderWidth: 2.5, tension: 0.2 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: { callbacks: { label: c => c.dataset.label + ': ' + c.parsed.y.toLocaleString() + ' ms' } }
      },
      scales: {
        x: { title: { display: true, text: 'Number of Relationship Hops' } },
        y: { type: 'logarithmic', min: 1, max: 100000, title: { display: true, text: 'Query Response Time (ms, log scale)' },
             ticks: { callback: v => ([1, 10, 100, 1000, 10000, 100000].includes(v) ? v.toLocaleString() : '') } }
      }
    }
  });
});
