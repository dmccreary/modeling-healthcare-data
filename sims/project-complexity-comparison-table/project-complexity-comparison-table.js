// Capstone Project Complexity Assessment - Chart.js
// CANVAS_HEIGHT: 462
// Stacked horizontal bar chart breaking each candidate capstone project into five
// complexity dimensions. Total bar length is overall complexity; the 60-80 band is
// the recommended one-semester scope.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .cc-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; }
    .cc-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; }
    .cc-sub { font-size: 12.5px; color: #556; text-align: center; margin: 2px 0 6px; }
    .cc-chartbox { position: relative; height: 400px; width: 100%; }
  `;
  document.head.appendChild(style);

  main.insertAdjacentHTML('afterbegin', `
    <div class="cc-wrap">
      <div class="cc-title">Capstone Project Complexity Assessment</div>
      <div class="cc-sub">Each project scored across five dimensions (0&ndash;20 each). Target 60&ndash;80 points for a one-semester capstone.</div>
      <div class="cc-chartbox"><canvas id="cc"></canvas></div>
    </div>`);

  const projects = ['Polypharmacy Risk Detection', 'Hospital Referral Network Optimizer',
    'Readmission Risk Prediction', 'Claims Fraud Detection', 'Clinical Pathway Recommender',
    'Population Health Cohort Analyzer'];
  const dims = [
    { label: 'Data Integration', color: '#3b78c3', data: [12, 10, 15, 18, 16, 17] },
    { label: 'Graph Modeling',   color: '#e8821a', data: [14, 16, 14, 16, 19, 15] },
    { label: 'Analytics',        color: '#d4a017', data: [16, 18, 16, 19, 17, 18] },
    { label: 'AI/ML Integration',color: '#2e7d32', data: [10, 8, 18, 14, 20, 16] },
    { label: 'User Interface',   color: '#7b3fb3', data: [13, 15, 12, 14, 16, 18] }
  ];

  new Chart(document.getElementById('cc'), {
    type: 'bar',
    data: { labels: projects, datasets: dims.map(d => ({ label: d.label, backgroundColor: d.color, data: d.data })) },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' },
        tooltip: { callbacks: {
          label: i => '  ' + i.dataset.label + ': ' + i.raw + ' pts',
          footer: items => 'Total: ' + items.reduce((s, it) => s + it.raw, 0) + ' / 100' } } },
      scales: {
        x: { stacked: true, min: 0, max: 100, title: { display: true, text: 'Complexity points (target band 60–80)' } },
        y: { stacked: true, ticks: { font: { size: 11 } } }
      }
    }
  });
});
