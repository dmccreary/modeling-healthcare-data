// Provider Network Fraud Detection Dashboard - Chart.js
// CANVAS_HEIGHT: 748
// Four-panel fraud dashboard: top providers by risk score, 24-month fraud-indicator
// trends, detection-algorithm precision/recall, and the financial-impact split of
// estimated fraud within total network billing.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .fd-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; }
    .fd-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; }
    .fd-sub { font-size: 12px; color: #556; text-align: center; margin: 2px 0 8px; }
    .fd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 14px; }
    .fd-cell h4 { font-size: 13.5px; color: #2c3e50; margin: 0 0 2px; text-align: center; }
    .fd-box { position: relative; height: 320px; width: 100%; }
  `;
  document.head.appendChild(style);

  main.insertAdjacentHTML('afterbegin', `
    <div class="fd-wrap">
      <div class="fd-title">Provider Network Fraud Detection Dashboard</div>
      <div class="fd-sub">18-month period &middot; $128.5M network billing &middot; ~$31.2M estimated fraud (24%) &middot; 47 active investigations &middot; $8.7M recovered YTD.</div>
      <div class="fd-grid">
        <div class="fd-cell"><h4>Top providers by fraud risk score</h4><div class="fd-box"><canvas id="fd1"></canvas></div></div>
        <div class="fd-cell"><h4>Fraud indicators over 24 months</h4><div class="fd-box"><canvas id="fd2"></canvas></div></div>
        <div class="fd-cell"><h4>Detection algorithm performance</h4><div class="fd-box"><canvas id="fd3"></canvas></div></div>
        <div class="fd-cell"><h4>Financial impact ($128.5M billing)</h4><div class="fd-box"><canvas id="fd4"></canvas></div></div>
      </div>
    </div>`);

  const tier = v => v >= 90 ? '#c0392b' : v >= 75 ? '#e8821a' : v >= 60 ? '#d4a017' : '#2e7d32';

  // Panel 1 — risk ranking
  const risk = [
    { n: 'ABC Medical Group', score: 94, exp: 2.8 },
    { n: 'XYZ Diagnostics', score: 89, exp: 1.9 },
    { n: 'Dr. Smith Clinic', score: 87, exp: 1.7 },
    { n: 'HealthFirst Labs', score: 82, exp: 1.4 },
    { n: 'Premier DME', score: 78, exp: 1.1 },
    { n: 'Care Partners IPA', score: 74, exp: 0.9 },
    { n: 'Wellness Group', score: 69, exp: 0.7 },
    { n: 'Valley Clinic', score: 63, exp: 0.5 },
    { n: 'Summit Medical', score: 58, exp: 0.4 },
    { n: 'Apex Diagnostics', score: 52, exp: 0.3 }
  ];
  new Chart(document.getElementById('fd1'), {
    type: 'bar',
    data: { labels: risk.map(r => r.n), datasets: [{ label: 'Risk score', data: risk.map(r => r.score), backgroundColor: risk.map(r => tier(r.score)) }] },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: {
        label: i => '  Risk ' + i.raw + '/100', afterLabel: i => 'Est. exposure: $' + risk[i.dataIndex].exp + 'M' } } },
      scales: { x: { min: 0, max: 100, title: { display: true, text: 'Risk score' } }, y: { ticks: { font: { size: 10 } } } } }
  });

  // Panel 2 — temporal trends
  const months = Array.from({ length: 24 }, (_, i) => 'M' + (i + 1));
  const grow = (a, b) => months.map((_, i) => +(a + (b - a) * i / 23).toFixed(1));
  new Chart(document.getElementById('fd2'), {
    type: 'line',
    data: { labels: months, datasets: [
      { label: 'Avg risk score', borderColor: '#e8821a', backgroundColor: '#e8821a', data: grow(40, 62), tension: .3, pointRadius: 0, borderWidth: 2 },
      { label: 'Active investigations', borderColor: '#2e7d32', backgroundColor: '#2e7d32', data: grow(20, 47), tension: .3, pointRadius: 0, borderWidth: 2 },
      { label: 'Confirmed fraud cases', borderColor: '#c0392b', backgroundColor: '#c0392b', data: grow(8, 37), tension: .3, pointRadius: 0, borderWidth: 2 },
      { label: 'Network density (×100)', borderColor: '#3b78c3', backgroundColor: '#3b78c3', data: grow(10, 17), tension: .3, pointRadius: 0, borderWidth: 2, borderDash: [5, 3] }
    ] },
    options: { responsive: true, maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'top', labels: { boxWidth: 12, font: { size: 9.5 } } } },
      scales: { y: { beginAtZero: true, title: { display: true, text: 'value' } },
                x: { ticks: { maxTicksLimit: 12, font: { size: 9 } } } } }
  });

  // Panel 3 — algorithm performance
  const algos = ['Community\nDetection', 'Referral\nAnalysis', 'Billing\nOutliers', 'Combined\nModel'];
  new Chart(document.getElementById('fd3'), {
    type: 'bar',
    data: { labels: algos.map(a => a.split('\n')), datasets: [
      { label: 'Precision %', backgroundColor: '#1f5f9e', data: [78, 62, 55, 79] },
      { label: 'Recall %', backgroundColor: '#9ec5e8', data: [85, 91, 88, 95] }
    ] },
    options: { responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: i => '  ' + i.dataset.label + ': ' + i.raw + '%' } } },
      scales: { y: { min: 0, max: 100, title: { display: true, text: '%' } }, x: { ticks: { font: { size: 10 } } } } }
  });

  // Panel 4 — financial impact doughnut
  new Chart(document.getElementById('fd4'), {
    type: 'doughnut',
    data: { labels: ['Estimated fraud ($31.2M)', 'Recovered YTD ($8.7M)', 'Clean billing ($88.6M)'],
      datasets: [{ data: [31.2 - 8.7, 8.7, 128.5 - 31.2], backgroundColor: ['#c0392b', '#2e7d32', '#cdd7e0'] }] },
    options: { responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
        tooltip: { callbacks: { label: i => '  ' + i.label.replace(/ \(.*/, '') + ': $' + i.raw.toFixed(1) + 'M' } } } }
  });
});
