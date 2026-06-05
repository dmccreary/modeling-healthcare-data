// Provider Capacity and Utilization by Specialty - Chart.js
// CANVAS_HEIGHT: 506
// Combo chart: grouped bars for capacity / scheduled / completed appointments (left
// axis), plus a utilization line and an 85% target line (right axis), by specialty.

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
      <div class="cc-title">Provider Capacity and Utilization by Specialty &mdash; Current Month</div>
      <div class="cc-sub">Bars = appointment counts (left axis); orange line = utilization % (right axis); red dashed = 85% target. Cardiology is at 98% (capacity-constrained).</div>
      <div class="cc-chartbox"><canvas id="cc"></canvas></div>
    </div>`);

  const specialties = ['Primary Care', 'Cardiology', 'Orthopedics', 'Endocrinology', 'Dermatology', 'Gastroenterology'];

  new Chart(document.getElementById('cc'), {
    data: {
      labels: specialties,
      datasets: [
        { type: 'bar', label: 'Total capacity', yAxisID: 'y', backgroundColor: '#bcd6ef', data: [750, 400, 350, 250, 300, 280] },
        { type: 'bar', label: 'Scheduled', yAxisID: 'y', backgroundColor: '#3b78c3', data: [680, 390, 315, 238, 270, 252] },
        { type: 'bar', label: 'Completed', yAxisID: 'y', backgroundColor: '#2e7d32', data: [612, 350, 283, 214, 243, 227] },
        { type: 'line', label: 'Utilization %', yAxisID: 'y1', borderColor: '#e8821a', backgroundColor: '#e8821a',
          borderWidth: 2, tension: 0.2, pointRadius: 4, data: [91, 98, 90, 95, 90, 90] },
        { type: 'line', label: 'Target 85%', yAxisID: 'y1', borderColor: '#c0392b', borderDash: [6, 4],
          borderWidth: 1.5, pointRadius: 0, data: [85, 85, 85, 85, 85, 85] }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'top' },
        tooltip: { callbacks: { label: i => i.dataset.yAxisID === 'y1'
          ? '  ' + i.dataset.label + ': ' + i.raw + '%' : '  ' + i.dataset.label + ': ' + i.raw + ' appts' } } },
      scales: {
        y:  { position: 'left', beginAtZero: true, suggestedMax: 800, title: { display: true, text: 'Appointments' } },
        y1: { position: 'right', min: 0, max: 100, title: { display: true, text: 'Utilization (%)' },
              grid: { drawOnChartArea: false }, ticks: { callback: v => v + '%' } },
        x:  { ticks: { maxRotation: 25, minRotation: 25, font: { size: 10.5 } } }
      }
    }
  });
});
