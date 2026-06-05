// Migration Strategy Comparison - Chart.js
// CANVAS_HEIGHT: 546
// Radar chart comparing five healthcare-system migration strategies across six
// trade-off dimensions (risk, timeline, consistency, disruption, cost, rollback).
// Click a legend entry to show/hide a strategy.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .cc-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; }
    .cc-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; }
    .cc-sub { font-size: 12.5px; color: #556; text-align: center; margin: 2px 0 6px; }
    .cc-chartbox { position: relative; height: 470px; width: 100%; }
  `;
  document.head.appendChild(style);

  main.insertAdjacentHTML('afterbegin', `
    <div class="cc-wrap">
      <div class="cc-title">Healthcare System Migration Strategy Trade-offs</div>
      <div class="cc-sub">Each axis is 0&ndash;10. Higher = more risk, longer timeline, stronger consistency, more disruption, higher cost, easier rollback. Click a legend entry to toggle it.</div>
      <div class="cc-chartbox"><canvas id="cc"></canvas></div>
    </div>`);

  const axes = ['Risk', 'Timeline', 'Consistency', 'Disruption', 'Cost', 'Rollback'];
  const strategies = [
    { name: 'Greenfield Replacement', color: '#c0392b', vals: [9, 6, 8, 10, 8, 2] },
    { name: 'Strangler Pattern',     color: '#e8821a', vals: [4, 9, 7, 3, 7, 7] },
    { name: 'Hybrid Architecture',   color: '#3b78c3', vals: [5, 7, 6, 4, 9, 6] },
    { name: 'Dual-Write Pattern',    color: '#2e7d32', vals: [6, 6, 9, 5, 6, 8] },
    { name: 'Event Sourcing',        color: '#7b3fb3', vals: [7, 8, 10, 6, 8, 9] }
  ];
  const hex2rgba = (h, a) => {
    const n = parseInt(h.slice(1), 16);
    return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;
  };

  new Chart(document.getElementById('cc'), {
    type: 'radar',
    data: {
      labels: axes,
      datasets: strategies.map(s => ({
        label: s.name, data: s.vals,
        borderColor: s.color, backgroundColor: hex2rgba(s.color, 0.12),
        borderWidth: 2, pointRadius: 3, pointBackgroundColor: s.color
      }))
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } },
      scales: { r: { min: 0, max: 10, ticks: { stepSize: 2, backdropColor: 'transparent' },
                     pointLabels: { font: { size: 12 } } } }
    }
  });
});
