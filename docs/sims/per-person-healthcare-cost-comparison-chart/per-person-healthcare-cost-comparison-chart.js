// Per-Person Healthcare Cost Comparison - Chart.js
// CANVAS_HEIGHT: 492
// Dual-axis chart: bars = per-person annual healthcare spending (left, USD), line =
// spending as % of GDP (right). The U.S. bar is highlighted red to show the premium.

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
      <div class="cc-title">Per-Person Healthcare Spending: U.S. vs. Comparable Nations (2021)</div>
      <div class="cc-sub">Bars = USD per person (left axis); line = spending as % of GDP (right axis). Source: OECD Health Statistics 2022.</div>
      <div class="cc-chartbox"><canvas id="cc"></canvas></div>
    </div>`);

  const rows = [
    { c: 'United States', spend: 12914, gdp: 18.3 },
    { c: 'Switzerland', spend: 7138, gdp: 11.3 },
    { c: 'Germany', spend: 6731, gdp: 11.7 },
    { c: 'Sweden', spend: 6262, gdp: 10.9 },
    { c: 'Netherlands', spend: 6190, gdp: 10.1 },
    { c: 'France', spend: 5564, gdp: 11.0 },
    { c: 'Canada', spend: 5418, gdp: 10.8 },
    { c: 'United Kingdom', spend: 5087, gdp: 10.2 },
    { c: 'Japan', spend: 4691, gdp: 10.9 }
  ];
  const barColors = rows.map(r => r.c === 'United States' ? '#c0392b' : '#3b78c3');

  new Chart(document.getElementById('cc'), {
    data: {
      labels: rows.map(r => r.c),
      datasets: [
        { type: 'bar', label: 'Spending per person (USD)', yAxisID: 'y',
          backgroundColor: barColors, order: 2, data: rows.map(r => r.spend) },
        { type: 'line', label: 'Spending (% of GDP)', yAxisID: 'y1', borderColor: '#e8821a',
          backgroundColor: '#e8821a', borderWidth: 2, tension: 0.2, pointRadius: 4, order: 1,
          data: rows.map(r => r.gdp) }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top' },
        tooltip: { callbacks: {
          label: (i) => i.dataset.yAxisID === 'y'
            ? '  Spending: $' + i.raw.toLocaleString() + ' per person'
            : '  Share of GDP: ' + i.raw + '%' } }
      },
      scales: {
        y:  { position: 'left', beginAtZero: true, title: { display: true, text: 'USD per person' },
              ticks: { callback: v => '$' + (v/1000) + 'k' } },
        y1: { position: 'right', beginAtZero: true, suggestedMax: 20, title: { display: true, text: '% of GDP' },
              grid: { drawOnChartArea: false }, ticks: { callback: v => v + '%' } },
        x:  { ticks: { maxRotation: 40, minRotation: 40, font: { size: 11 } } }
      }
    }
  });
});
