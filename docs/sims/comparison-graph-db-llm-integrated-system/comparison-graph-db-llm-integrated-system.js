// Graph DB vs LLM vs Integrated System - Chart.js
// CANVAS_HEIGHT: 482
// Grouped bar chart comparing a standalone graph database, a standalone LLM, and an
// integrated system across seven healthcare-AI capability dimensions (0-10, higher is
// better; the hallucination axis is inverted so 10 = no hallucination).

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .cc-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; }
    .cc-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; }
    .cc-sub { font-size: 12.5px; color: #556; text-align: center; margin: 2px 0 6px; }
    .cc-chartbox { position: relative; height: 420px; width: 100%; }
  `;
  document.head.appendChild(style);

  main.insertAdjacentHTML('afterbegin', `
    <div class="cc-wrap">
      <div class="cc-title">Healthcare AI Capabilities: Standalone vs Integrated Approaches</div>
      <div class="cc-sub">Scores 0&ndash;10, higher is better (Hallucination Risk is inverted: 10 = no hallucination). Benchmark of 500 clinical QA questions.</div>
      <div class="cc-chartbox"><canvas id="cc"></canvas></div>
    </div>`);

  const dims = ['Factual\nAccuracy', 'Explainability', 'NL\nUnderstanding', 'Relationship\nReasoning',
    'Knowledge\nCurrency', 'Low Hallucination', 'Complex\nQuery'];

  new Chart(document.getElementById('cc'), {
    type: 'bar',
    data: {
      labels: dims.map(d => d.split('\n')),
      datasets: [
        { label: 'Graph database alone', backgroundColor: '#3b78c3', data: [10, 10, 2, 10, 9, 10, 7] },
        { label: 'LLM alone', backgroundColor: '#e8821a', data: [6, 4, 10, 6, 5, 4, 8] },
        { label: 'Integrated system', backgroundColor: '#2e7d32', data: [10, 9, 10, 10, 10, 9, 10] }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' },
        tooltip: { callbacks: { label: i => '  ' + i.dataset.label + ': ' + i.raw + ' / 10' } } },
      scales: {
        y: { min: 0, max: 10, ticks: { stepSize: 2 }, title: { display: true, text: 'Capability score (0–10)' } },
        x: { ticks: { font: { size: 10.5 } } }
      }
    }
  });
});
