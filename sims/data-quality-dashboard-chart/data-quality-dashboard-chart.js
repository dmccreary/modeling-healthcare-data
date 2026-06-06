// Healthcare Graph Data Quality Dashboard - Chart.js
// CANVAS_HEIGHT: 768
// 2x2 dashboard: (1) quality scores by dimension, (2) completeness by entity type
// for required vs optional properties, (3) 90-day quality trends, (4) top quality
// issues by affected records. Threshold colors flag dimensions needing attention.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .dq-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; }
    .dq-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; }
    .dq-sub { font-size: 12px; color: #556; text-align: center; margin: 2px 0 8px; }
    .dq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 14px; }
    .dq-cell h4 { font-size: 13.5px; color: #2c3e50; margin: 0 0 2px; text-align: center; }
    .dq-box { position: relative; height: 330px; width: 100%; }
  `;
  document.head.appendChild(style);

  main.insertAdjacentHTML('afterbegin', `
    <div class="dq-wrap">
      <div class="dq-title">Healthcare Graph Data Quality Dashboard</div>
      <div class="dq-sub">As of 2024-11-06 &middot; target &ge;95%. Consistency and Relationship Quality are below the 90% threshold and under investigation.</div>
      <div class="dq-grid">
        <div class="dq-cell"><h4>Quality scores by dimension</h4><div class="dq-box"><canvas id="dq1"></canvas></div></div>
        <div class="dq-cell"><h4>Completeness by entity type</h4><div class="dq-box"><canvas id="dq2"></canvas></div></div>
        <div class="dq-cell"><h4>Quality trends &mdash; last 90 days</h4><div class="dq-box"><canvas id="dq3"></canvas></div></div>
        <div class="dq-cell"><h4>Top quality issues (by records)</h4><div class="dq-box"><canvas id="dq4"></canvas></div></div>
      </div>
    </div>`);

  const colorFor = v => v >= 95 ? '#2e7d32' : v >= 90 ? '#d4a017' : v >= 85 ? '#e8821a' : '#c0392b';

  // Chart 1 — scorecard by dimension
  const dims = ['Completeness','Accuracy','Consistency','Timeliness','Validity','Uniqueness','Relationship Quality'];
  const dimScores = [94.2, 97.8, 89.5, 96.1, 98.3, 91.7, 87.3];
  new Chart(document.getElementById('dq1'), {
    type: 'bar',
    data: { labels: dims, datasets: [{ label: 'Quality score', data: dimScores, backgroundColor: dimScores.map(colorFor) }] },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: i => '  ' + i.raw + '%' } } },
      scales: { x: { min: 80, max: 100, title: { display: true, text: 'Score % (threshold 90 / target 95)' } },
                y: { ticks: { font: { size: 10.5 } } } } }
  });

  // Chart 2 — completeness by entity type
  const ents = ['Patient','Encounter','Diagnosis','Medication','Lab Result','Provider','Insurance'];
  new Chart(document.getElementById('dq2'), {
    type: 'bar',
    data: { labels: ents, datasets: [
      { label: 'Required properties', backgroundColor: '#1f5f9e', data: [99.2,97.8,96.5,95.1,98.7,99.8,93.2] },
      { label: 'Optional properties', backgroundColor: '#9ec5e8', data: [67.3,78.5,72.1,81.3,85.9,88.4,76.8] }
    ] },
    options: { responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top' }, tooltip: { callbacks: { label: i => '  ' + i.dataset.label + ': ' + i.raw + '%' } } },
      scales: { y: { min: 0, max: 100, title: { display: true, text: '% complete' } },
                x: { ticks: { maxRotation: 40, minRotation: 40, font: { size: 10 } } } } }
  });

  // Chart 3 — trends over time
  const weeks = ['Aug 8','Aug 22','Sep 5','Sep 19','Oct 3','Oct 17','Nov 6'];
  new Chart(document.getElementById('dq3'), {
    type: 'line',
    data: { labels: weeks, datasets: [
      { label: 'Completeness', borderColor: '#2e7d32', backgroundColor: '#2e7d32', data: [92.5,93.1,93.8,94.2,94.7,95.1,94.2], tension: .2, pointRadius: 3 },
      { label: 'Accuracy', borderColor: '#3b78c3', backgroundColor: '#3b78c3', data: [97.6,97.6,97.7,97.7,97.8,97.8,97.8], tension: .2, pointRadius: 3 },
      { label: 'Consistency', borderColor: '#d4a017', backgroundColor: '#d4a017', data: [91.2,90.8,90.1,89.5,88.9,88.2,89.5], tension: .2, pointRadius: 3 },
      { label: 'Relationship Quality', borderColor: '#e8821a', backgroundColor: '#e8821a', data: [92.1,91.0,90.3,88.7,86.5,85.2,87.3], tension: .2, pointRadius: 3 }
    ] },
    options: { responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { boxWidth: 12, font: { size: 10 } } },
        tooltip: { callbacks: { label: i => '  ' + i.dataset.label + ': ' + i.raw + '%' } } },
      scales: { y: { min: 80, max: 100, title: { display: true, text: 'Score %' } } } }
  });

  // Chart 4 — top issues by affected records (log scale)
  const issues = [
    { label: 'Missing patient emails', n: 847256, c: '#d4a017' },
    { label: 'Orphaned encounter nodes', n: 12834, c: '#c0392b' },
    { label: 'Labs missing reference ranges', n: 8421, c: '#e8821a' },
    { label: 'Diagnoses: invalid ICD-10', n: 1256, c: '#e8821a' },
    { label: 'Duplicate provider records', n: 294, c: '#c0392b' }
  ];
  new Chart(document.getElementById('dq4'), {
    type: 'bar',
    data: { labels: issues.map(i => i.label), datasets: [{ label: 'Affected records', data: issues.map(i => i.n), backgroundColor: issues.map(i => i.c) }] },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: i => '  ' + i.raw.toLocaleString() + ' records' } } },
      scales: { x: { type: 'logarithmic', title: { display: true, text: 'Affected records (log scale)' },
                  ticks: { callback: v => ([10,100,1000,10000,100000,1000000].includes(v)) ? (v>=1000?(v/1000)+'k':v) : null } },
                y: { ticks: { font: { size: 10 } } } } }
  });
});
