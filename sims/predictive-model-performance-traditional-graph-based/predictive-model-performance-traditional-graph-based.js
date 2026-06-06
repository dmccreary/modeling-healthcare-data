// Predictive Model Performance: Traditional vs Graph-Based - Chart.js
// CANVAS_HEIGHT: 502
// Line chart (log X) comparing 30-day readmission AUROC of Logistic Regression,
// Random Forest, and a Graph Neural Network as training data grows. Tooltips show
// the 95% CI; a dashed baseline marks random chance (0.50).

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .cc-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; }
    .cc-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; }
    .cc-sub { font-size: 12.5px; color: #556; text-align: center; margin: 2px 0 6px; }
    .cc-chartbox { position: relative; height: 440px; width: 100%; }
  `;
  document.head.appendChild(style);

  main.insertAdjacentHTML('afterbegin', `
    <div class="cc-wrap">
      <div class="cc-title">30-Day Readmission Prediction: Performance vs Training Data Size</div>
      <div class="cc-sub">Graph-based models leverage relational context and keep improving with more data, while traditional models plateau.</div>
      <div class="cc-chartbox"><canvas id="cc"></canvas></div>
    </div>`);

  const sizes = [100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000];
  const mk = (vals, ci) => sizes.map((s, i) => ({ x: s, y: vals[i], ci: ci[i] }));
  const lr  = mk([0.58,0.65,0.68,0.72,0.74,0.76,0.77,0.78,0.78], [0.08,0.06,0.05,0.04,0.03,0.02,0.02,0.01,0.01]);
  const rf  = mk([0.62,0.69,0.73,0.77,0.79,0.81,0.82,0.83,0.83], [0.09,0.06,0.05,0.03,0.03,0.02,0.02,0.01,0.01]);
  const gnn = mk([0.64,0.72,0.76,0.82,0.85,0.88,0.90,0.92,0.93], [0.10,0.07,0.05,0.04,0.03,0.02,0.02,0.01,0.01]);

  new Chart(document.getElementById('cc'), {
    type: 'line',
    data: {
      datasets: [
        { label: 'Logistic Regression', data: lr, borderColor: '#e8821a', backgroundColor: '#e8821a', borderWidth: 2, tension: 0.2, pointRadius: 3 },
        { label: 'Random Forest', data: rf, borderColor: '#7b3fb3', backgroundColor: '#7b3fb3', borderWidth: 2, tension: 0.2, pointRadius: 3 },
        { label: 'Graph Neural Network', data: gnn, borderColor: '#2e7d32', backgroundColor: '#2e7d32', borderWidth: 3, tension: 0.2, pointRadius: 4 },
        { label: 'Random chance (0.50)', data: sizes.map(s => ({ x: s, y: 0.5 })), borderColor: '#999',
          borderDash: [6, 4], borderWidth: 1.5, pointRadius: 0, fill: false }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'nearest', intersect: false },
      plugins: {
        legend: { position: 'top' },
        tooltip: { callbacks: {
          label: (i) => {
            if (i.dataset.label.startsWith('Random chance')) return null;
            const ci = i.raw.ci;
            return '  ' + i.dataset.label + ': AUROC ' + i.raw.y.toFixed(2) + (ci ? ' (±' + ci.toFixed(2) + ')' : '');
          },
          title: (items) => 'Training size: ' + Number(items[0].raw.x).toLocaleString() + ' patients'
        } }
      },
      scales: {
        x: { type: 'logarithmic', title: { display: true, text: 'Training dataset size (patients, log scale)' },
             min: 100, max: 1000000,
             ticks: { callback: v => ([100,1000,10000,100000,1000000].includes(v))
               ? (v >= 1000000 ? '1M' : v >= 1000 ? (v/1000)+'k' : v) : null } },
        y: { min: 0.5, max: 1.0, title: { display: true, text: 'AUROC' },
             ticks: { stepSize: 0.05 } }
      }
    }
  });
});
