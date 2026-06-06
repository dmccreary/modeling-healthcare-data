// Patient Outcome Metrics: Traditional vs Graph-Enhanced Care - Chart.js
// CANVAS_HEIGHT: 494
// Grouped bar chart comparing six diabetes outcome measures under traditional care
// versus graph-enhanced care coordination. For the first four measures higher is
// better; for ER visits and admissions (per 100 patients) lower is better.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .cc-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; }
    .cc-title { font-size: 16px; font-weight: bold; color: #1a2733; text-align: center; }
    .cc-sub { font-size: 12px; color: #556; text-align: center; margin: 2px 0 6px; }
    .cc-chartbox { position: relative; height: 420px; width: 100%; }
  `;
  document.head.appendChild(style);

  main.insertAdjacentHTML('afterbegin', `
    <div class="cc-wrap">
      <div class="cc-title">Diabetes Outcomes: Traditional vs. Graph-Enhanced Care Coordination</div>
      <div class="cc-sub">12-month T2D outcomes, risk-adjusted. Traditional n=1,243, Graph-Enhanced n=987. ER visits &minus;46%, admissions &minus;50% (per 100 patients, lower is better).</div>
      <div class="cc-chartbox"><canvas id="cc"></canvas></div>
    </div>`);

  const measures = ['HbA1c at goal (<7%)', 'BP at goal (<130/80)', 'Retinopathy screening',
    'Med adherence ≥80%', 'ER visits / 100 pts', 'Admissions / 100 pts'];

  new Chart(document.getElementById('cc'), {
    type: 'bar',
    data: {
      labels: measures,
      datasets: [
        { label: 'Traditional care', backgroundColor: '#9ec5e8', data: [45, 52, 38, 65, 35, 18] },
        { label: 'Graph-enhanced care', backgroundColor: '#1f5f9e', data: [62, 68, 79, 84, 19, 9] }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' },
        tooltip: { callbacks: { label: i => {
          const lowerBetter = i.dataIndex >= 4;
          const unit = lowerBetter ? ' per 100 patients' : '%';
          return '  ' + i.dataset.label + ': ' + i.raw + unit + (lowerBetter ? '  (lower is better)' : '');
        } } } },
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Percent at goal  /  events per 100 patients' } },
        x: { ticks: { maxRotation: 30, minRotation: 30, font: { size: 10.5 } } }
      }
    }
  });
});
