// Claim Denial Reasons Analysis - Chart.js
// CANVAS_HEIGHT: 511
// Dual-axis chart: bars = number of denied claims (left), line = total denied
// dollars (right). Tooltip adds the appeal overturn rate. A toggle re-sorts the
// categories by claim volume or by dollar impact.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .cc-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; }
    .cc-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; }
    .cc-sub { font-size: 12.5px; color: #556; text-align: center; margin: 2px 0 4px; }
    .cc-controls { text-align: center; margin: 4px 0 6px; }
    .cc-controls button { font-size: 13px; padding: 4px 12px; margin: 0 4px; cursor: pointer;
      border: 1px solid #99a; border-radius: 5px; background: #f2f5f8; }
    .cc-controls button.active { background: #2b6cb0; color: #fff; border-color: #1f5390; }
    .cc-chartbox { position: relative; height: 420px; width: 100%; }
  `;
  document.head.appendChild(style);

  main.insertAdjacentHTML('afterbegin', `
    <div class="cc-wrap">
      <div class="cc-title">Claim Denial Analysis &mdash; Q4 2024</div>
      <div class="cc-sub">170,000 total denials &middot; $328M denied. Bars = claim count, line = denied $M. Hover for the appeal overturn rate.</div>
      <div class="cc-controls">
        <button id="cc-byvol" class="active">Sort by volume</button>
        <button id="cc-bydollar">Sort by $ impact</button>
      </div>
      <div class="cc-chartbox"><canvas id="cc"></canvas></div>
    </div>`);

  const data = [
    { reason: 'Coverage / Eligibility', count: 45000, amount: 85, overturn: 15 },
    { reason: 'Coding Errors', count: 38000, amount: 43, overturn: 65 },
    { reason: 'Timely Filing', count: 22000, amount: 15, overturn: 5 },
    { reason: 'Prior Authorization', count: 18000, amount: 58, overturn: 45 },
    { reason: 'Medical Necessity', count: 15000, amount: 72, overturn: 35 },
    { reason: 'Duplicate Claims', count: 12000, amount: 5, overturn: 10 },
    { reason: 'Coordination of Benefits', count: 9000, amount: 28, overturn: 25 },
    { reason: 'Bundling / NCCI Edits', count: 7000, amount: 19, overturn: 40 },
    { reason: 'Other', count: 4000, amount: 3, overturn: 20 }
  ];

  const ctx = document.getElementById('cc');
  const chart = new Chart(ctx, {
    data: {
      labels: [],
      datasets: [
        { type: 'bar', label: 'Denied claims', yAxisID: 'y', backgroundColor: '#3b78c3', order: 2, data: [] },
        { type: 'line', label: 'Denied amount ($M)', yAxisID: 'y1', borderColor: '#e8821a',
          backgroundColor: '#e8821a', borderWidth: 2, tension: 0.2, pointRadius: 4, order: 1, data: [] }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            afterBody: (items) => {
              const i = items[0].dataIndex;
              return 'Appeal overturn rate: ' + chart._rows[i].overturn + '%';
            }
          }
        }
      },
      scales: {
        y:  { position: 'left',  beginAtZero: true, title: { display: true, text: 'Denied claims' },
              ticks: { callback: v => (v/1000) + 'k' } },
        y1: { position: 'right', beginAtZero: true, title: { display: true, text: 'Denied amount ($M)' },
              grid: { drawOnChartArea: false } },
        x:  { ticks: { maxRotation: 40, minRotation: 40, font: { size: 11 } } }
      }
    }
  });

  function render(rows) {
    chart._rows = rows;
    chart.data.labels = rows.map(r => r.reason);
    chart.data.datasets[0].data = rows.map(r => r.count);
    chart.data.datasets[1].data = rows.map(r => r.amount);
    chart.update();
  }
  render([...data].sort((a, b) => b.count - a.count));

  const byVol = document.getElementById('cc-byvol');
  const byDollar = document.getElementById('cc-bydollar');
  byVol.onclick = () => { byVol.classList.add('active'); byDollar.classList.remove('active');
    render([...data].sort((a, b) => b.count - a.count)); };
  byDollar.onclick = () => { byDollar.classList.add('active'); byVol.classList.remove('active');
    render([...data].sort((a, b) => b.amount - a.amount)); };
});
