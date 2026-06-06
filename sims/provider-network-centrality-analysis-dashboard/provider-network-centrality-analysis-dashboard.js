// Provider Network Centrality Analysis Dashboard - Chart.js
// CANVAS_HEIGHT: 793
// Interactive dashboard comparing degree, betweenness, and PageRank centrality on a
// provider referral network: a ranking bar chart and a distribution histogram that
// update with the selected measure, plus a fixed Degree-vs-PageRank scatter showing
// that "many connections" and "trusted by important providers" are different things.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .nd-wrap { font-family: Arial, Helvetica, sans-serif; padding: 8px 12px 12px; box-sizing: border-box; }
    .nd-title { font-size: 17px; font-weight: bold; color: #1a2733; text-align: center; }
    .nd-controls { text-align: center; margin: 6px 0 4px; }
    .nd-controls button { font-size: 13px; padding: 4px 12px; margin: 0 4px; cursor: pointer;
      border: 1px solid #99a; border-radius: 5px; background: #f2f5f8; }
    .nd-controls button.active { background: #2b6cb0; color: #fff; border-color: #1f5390; }
    .nd-desc { font-size: 12.5px; color: #445; background: #f6f9fb; border: 1px solid #d6e0e8;
      border-radius: 6px; padding: 7px 12px; margin: 4px 0 8px; line-height: 1.45; min-height: 54px; }
    .nd-box { position: relative; height: 320px; width: 100%; }
    .nd-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 14px; }
    .nd-cell h4 { font-size: 13px; color: #2c3e50; margin: 6px 0 2px; text-align: center; }
    .nd-cell .nd-box { height: 280px; }
  `;
  document.head.appendChild(style);

  main.insertAdjacentHTML('afterbegin', `
    <div class="nd-wrap">
      <div class="nd-title">Provider Network Centrality Analysis</div>
      <div class="nd-controls">
        <button id="m-degree" class="active">Degree</button>
        <button id="m-betw">Betweenness</button>
        <button id="m-pr">PageRank</button>
      </div>
      <div class="nd-desc" id="nd-desc"></div>
      <h4 style="font-size:13px;color:#2c3e50;margin:2px 0;text-align:center" id="nd-rank-title"></h4>
      <div class="nd-box"><canvas id="nd-rank"></canvas></div>
      <div class="nd-grid">
        <div class="nd-cell"><h4 id="nd-hist-title"></h4><div class="nd-box"><canvas id="nd-hist"></canvas></div></div>
        <div class="nd-cell"><h4>Degree vs PageRank (importance types)</h4><div class="nd-box"><canvas id="nd-scatter"></canvas></div></div>
      </div>
    </div>`);

  const P = [
    { n: 'Metro Hospital', s: 'Hospital', deg: 1126, betw: 0.150, pr: 0.069, vol: 12500 },
    { n: 'Metro Cardiac Center', s: 'Cardiology', deg: 705, betw: 0.070, pr: 0.085, vol: 5100 },
    { n: 'Regional Orthopedics', s: 'Orthopedics', deg: 580, betw: 0.050, pr: 0.052, vol: 4200 },
    { n: 'Regional Oncology', s: 'Oncology', deg: 550, betw: 0.060, pr: 0.048, vol: 3800 },
    { n: 'Metro Surgery', s: 'Surgery', deg: 540, betw: 0.065, pr: 0.040, vol: 3500 },
    { n: 'Dr. Chen', s: 'Internal Med', deg: 534, betw: 0.110, pr: 0.030, vol: 3120 },
    { n: 'Dr. Johnson', s: 'Family Med', deg: 465, betw: 0.100, pr: 0.020, vol: 3000 },
    { n: 'Dr. Patel', s: 'Family Med', deg: 440, betw: 0.140, pr: 0.022, vol: 2900 },
    { n: 'Dr. Anderson', s: 'Cardiology', deg: 431, betw: 0.080, pr: 0.072, vol: 2450 },
    { n: 'Dr. Martinez', s: 'Neurology', deg: 390, betw: 0.189, pr: 0.045, vol: 1800 },
    { n: 'Family Health Clinic', s: 'Family Med', deg: 390, betw: 0.090, pr: 0.015, vol: 2600 },
    { n: 'Dr. Kim', s: 'Endocrinology', deg: 250, betw: 0.040, pr: 0.016, vol: 1400 },
    { n: 'Dr. Lee', s: 'Dermatology', deg: 240, betw: 0.030, pr: 0.018, vol: 1500 },
    { n: 'Dr. Garcia', s: 'Gastroenterology', deg: 220, betw: 0.035, pr: 0.015, vol: 1300 },
    { n: 'Dr. Nguyen', s: 'Rheumatology', deg: 110, betw: 0.010, pr: 0.008, vol: 700 },
    { n: 'Dr. Brown', s: 'Pulmonology', deg: 85, betw: 0.008, pr: 0.006, vol: 600 }
  ];
  const measures = {
    degree: { key: 'deg', label: 'Degree (total connections)', fmt: v => v.toLocaleString(),
      desc: 'Degree centrality counts a provider\'s direct referral connections. High degree marks active participants — primary-care hubs sending many referrals and popular specialists receiving them. Here Metro Hospital and Dr. Chen have the most connections.' },
    betw: { key: 'betw', label: 'Betweenness centrality', fmt: v => v.toFixed(3),
      desc: 'Betweenness counts how often a provider lies on the shortest referral path between others — the network\'s bridges and brokers. If a high-betweenness provider leaves, care coordination is disrupted. Dr. Martinez (Neurology) is the critical bridge here (0.189).' },
    pr: { key: 'pr', label: 'PageRank', fmt: v => v.toFixed(3),
      desc: 'PageRank weighs both the quantity and the quality of incoming referrals: a provider scores high if referred to by many providers who are themselves well-connected. It identifies the most trusted providers — Metro Cardiac Center ranks highest (0.085).' }
  };
  const colorScale = (t) => { // 0..1 -> blue->yellow->red
    const r = Math.round(255 * Math.min(1, t * 2));
    const g = Math.round(255 * Math.min(1, 2 - t * 2) * (t < 0.5 ? t * 2 : 1));
    const b = Math.round(255 * Math.max(0, 1 - t * 2));
    return `rgb(${r},${Math.max(g,60)},${b})`;
  };
  const specColor = {};
  ['Hospital','Cardiology','Orthopedics','Oncology','Surgery','Internal Med','Family Med','Neurology','Endocrinology','Dermatology','Gastroenterology','Rheumatology','Pulmonology']
    .forEach((s, i) => specColor[s] = `hsl(${i * 28},65%,50%)`);

  let current = 'degree';
  const rankChart = new Chart(document.getElementById('nd-rank'), {
    type: 'bar', data: { labels: [], datasets: [{ label: 'Centrality', data: [], backgroundColor: [] }] },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: i => '  ' + measures[current].fmt(i.raw) } } },
      scales: { x: { beginAtZero: true }, y: { ticks: { font: { size: 10 } } } } }
  });
  const histChart = new Chart(document.getElementById('nd-hist'), {
    type: 'bar', data: { labels: [], datasets: [{ label: 'Providers', data: [], backgroundColor: '#3b78c3' }] },
    options: { responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: i => '  ' + i.raw + ' providers' } } },
      scales: { x: { title: { display: true, text: 'Centrality score (binned)' }, ticks: { font: { size: 9 } } },
                y: { beginAtZero: true, title: { display: true, text: 'Providers' } } } }
  });
  new Chart(document.getElementById('nd-scatter'), {
    type: 'scatter',
    data: { datasets: [{ label: 'Providers', data: P.map(p => ({ x: p.deg, y: p.pr, n: p.n, s: p.s })),
      backgroundColor: P.map(p => specColor[p.s]), pointRadius: P.map(p => 4 + p.vol / 1500) }] },
    options: { responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: {
        label: i => i.raw.n + ' (' + i.raw.s + '): degree ' + i.raw.x + ', PageRank ' + i.raw.y.toFixed(3) } } },
      scales: { x: { title: { display: true, text: 'Degree (many connections →)' } },
                y: { title: { display: true, text: 'PageRank (trusted →)' } } } }
  });

  function update() {
    const m = measures[current], key = m.key;
    const sorted = [...P].sort((a, b) => b[key] - a[key]).slice(0, 12);
    const max = Math.max(...P.map(p => p[key]));
    rankChart.data.labels = sorted.map(p => p.n);
    rankChart.data.datasets[0].data = sorted.map(p => p[key]);
    rankChart.data.datasets[0].backgroundColor = sorted.map(p => colorScale(p[key] / max));
    rankChart.update('none');
    // histogram: 8 bins
    const vals = P.map(p => p[key]); const lo = Math.min(...vals), hi = Math.max(...vals);
    const bins = 8, w = (hi - lo) / bins || 1, counts = new Array(bins).fill(0);
    vals.forEach(v => { let b = Math.floor((v - lo) / w); if (b >= bins) b = bins - 1; counts[b]++; });
    histChart.data.labels = counts.map((_, i) => m.fmt(lo + i * w));
    histChart.data.datasets[0].data = counts;
    histChart.update('none');
    document.getElementById('nd-desc').textContent = m.desc;
    document.getElementById('nd-rank-title').textContent = 'Top providers by ' + m.label;
    document.getElementById('nd-hist-title').textContent = 'Distribution of ' + m.label;
  }
  const btns = { degree: 'm-degree', betw: 'm-betw', pr: 'm-pr' };
  Object.keys(btns).forEach(k => document.getElementById(btns[k]).onclick = () => {
    current = k; Object.values(btns).forEach(id => document.getElementById(id).classList.remove('active'));
    document.getElementById(btns[k]).classList.add('active'); update();
  });
  update();
});
