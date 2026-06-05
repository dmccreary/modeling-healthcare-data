// Care Pathway Comparison - Chart.js
// CANVAS_HEIGHT: 467
// Horizontal grouped bar chart comparing five Type 2 Diabetes treatment pathways
// (discovered by graph path queries) on outcomes, cost efficiency, and time to control.

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
      <div class="cc-title">Comparative Effectiveness of Type 2 Diabetes Treatment Pathways</div>
      <div class="cc-sub">Composite scores (0&ndash;100) from 15,000 patient pathways. &#9733; Pathway 1 has the highest combined score (optimal).</div>
      <div class="cc-chartbox"><canvas id="cc"></canvas></div>
    </div>`);

  const pathways = [
    '★ Metformin → Lifestyle → Controlled',
    'Metformin → Insulin → GLP-1 → Controlled',
    'Lifestyle → Metformin → SGLT2 → Controlled',
    'Metformin → DPP-4 → Insulin → Controlled',
    'Insulin → Metformin → GLP-1 → Controlled'
  ];

  new Chart(document.getElementById('cc'), {
    type: 'bar',
    data: {
      labels: pathways,
      datasets: [
        { label: 'Patient outcomes', backgroundColor: '#3b78c3', data: [85, 78, 82, 75, 72] },
        { label: 'Cost efficiency (higher = lower cost)', backgroundColor: '#2e7d32', data: [90, 60, 75, 65, 55] },
        { label: 'Time efficiency (higher = faster)', backgroundColor: '#e8821a', data: [88, 70, 80, 68, 65] }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' },
        tooltip: { callbacks: { label: i => '  ' + i.dataset.label + ': ' + i.raw + ' / 100' } } },
      scales: {
        x: { min: 0, max: 100, title: { display: true, text: 'Effectiveness score (0–100)' } },
        y: { ticks: { font: { size: 11 } } }
      }
    }
  });
});
