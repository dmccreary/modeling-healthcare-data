// Provider Compensation Model Comparison - Chart.js
// CANVAS_HEIGHT: 492
// Dual-axis grouped bar chart: annual compensation ($k, left) and productivity
// (wRVUs, right) across five PCP compensation models. Tooltips add quality score,
// satisfaction, panel size, and turnover.

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
      <div class="cc-title">Provider Compensation Model Comparison: Primary Care Physicians</div>
      <div class="cc-sub">500 PCPs across 50 health systems, 2024. Hover a model for quality, satisfaction, panel size, and turnover.</div>
      <div class="cc-chartbox"><canvas id="cc"></canvas></div>
    </div>`);

  const rows = [
    { m: 'Salary',        comp: 285, wrvu: 4800, quality: 78, sat: 3.2, panel: 1800, turn: 18 },
    { m: 'wRVU-based',    comp: 380, wrvu: 7200, quality: 72, sat: 3.8, panel: 2400, turn: 22 },
    { m: 'Salary + Bonus',comp: 325, wrvu: 5900, quality: 82, sat: 4.1, panel: 2000, turn: 12 },
    { m: 'Equal Shares',  comp: 310, wrvu: 5500, quality: 80, sat: 3.5, panel: 1900, turn: 15 },
    { m: 'Capitation',    comp: 295, wrvu: 4200, quality: 85, sat: 2.9, panel: 2200, turn: 25 }
  ];

  new Chart(document.getElementById('cc'), {
    type: 'bar',
    data: {
      labels: rows.map(r => r.m),
      datasets: [
        { label: 'Compensation ($k/yr)', yAxisID: 'y', backgroundColor: '#1f5f9e', data: rows.map(r => r.comp) },
        { label: 'Productivity (wRVUs/yr)', yAxisID: 'y1', backgroundColor: '#9ec5e8', data: rows.map(r => r.wrvu) }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' },
        tooltip: { callbacks: {
          label: i => i.dataset.yAxisID === 'y' ? '  Compensation: $' + i.raw + 'k' : '  Productivity: ' + i.raw.toLocaleString() + ' wRVUs',
          afterBody: items => { const r = rows[items[0].dataIndex];
            return ['Quality score: ' + r.quality + '/100', 'Satisfaction: ' + r.sat + '/5',
                    'Panel size: ' + r.panel.toLocaleString(), '3-yr turnover: ' + r.turn + '%']; }
        } } },
      scales: {
        y:  { position: 'left', beginAtZero: true, suggestedMax: 500, title: { display: true, text: 'Compensation ($k/yr)' } },
        y1: { position: 'right', beginAtZero: true, suggestedMax: 8000, title: { display: true, text: 'Productivity (wRVUs/yr)' },
              grid: { drawOnChartArea: false } }
      }
    }
  });
});
