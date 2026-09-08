// Clinical Quality Measure Population Funnel — where the reported rate comes from.
// CANVAS_HEIGHT: 871
'use strict';

const INITIAL = 40000;
const DENOMINATOR = 40000;
const state = {exclusions: 500, numerator: 25500};

const definitions = {
  initial: ['Initial Population',
    'Everyone the measure could possibly apply to, defined by the measure’s own eligibility criteria — here, patients aged 18 to 75 seen during the measurement period. It is deliberately broad: narrowing happens in the later populations, where each narrowing is separately stated and separately auditable.'],
  denominator: ['Denominator',
    'The subset of the initial population the measure actually asks about — here, those with a diabetes diagnosis. In this measure the two happen to coincide, because the initial population was already defined as diabetic patients aged 18 to 75. A measure where they differ is far more common.'],
  after: ['Denominator after Exclusions',
    'The denominator minus patients for whom the measure would be inappropriate or misleading — here, patients in hospice care, for whom tight glycemic control is not the goal. An exclusion is a clinical judgment written into the measure, and it is the number most worth arguing about, because it changes the divisor.'],
  numerator: ['Numerator',
    'The subset of the exclusion-adjusted denominator that met the measure’s quality criterion — here, patients whose most recent HbA1c was within the controlled range. The numerator never has its own population; it is always counted out of the denominator directly above it.']
};

const main = document.querySelector('main');
main.innerHTML = `<h1>Clinical Quality Measure Population Funnel</h1>
<p class="intro">The four standard populations of a diabetes-control measure, and the rate they produce.</p>
<div class="legend"><span>Each bar is a subset of the one above it. The reported rate is the last bar divided by the third — not by the first.</span></div>
<div class="chartbox"><canvas id="chart" aria-label="Funnel of clinical quality measure populations"></canvas></div>
<div class="workspace" style="grid-template-columns:minmax(0,1fr) minmax(0,1fr)">
  <aside class="side" style="border-right:1px solid silver">
    <label for="exclusions">Denominator exclusions (hospice care)</label>
    <input type="number" id="exclusions" min="0" max="${DENOMINATOR}" step="50" value="${state.exclusions}">
    <label for="numerator">Numerator (HbA1c controlled)</label>
    <input type="number" id="numerator" min="0" max="${DENOMINATOR}" step="100" value="${state.numerator}">
    <div class="controls" style="margin-top:12px"><button id="reset">Reset</button><button id="scenario">What if exclusions tripled?</button></div>
  </aside>
  <aside class="side">
    <div id="rate"></div>
    <div id="info" class="info" aria-live="polite"></div>
  </aside>
</div>
<p class="footer">Synthetic counts modeled on a diabetes HbA1c-control measure. A higher rate is better; the exclusion count changes the divisor, so it changes the rate without any patient’s care changing.</p>`;

function denomAfter() { return Math.max(0, DENOMINATOR - state.exclusions); }
function rate() { const d = denomAfter(); return d === 0 ? null : state.numerator / d; }

const chart = new Chart(document.getElementById('chart'), {
  type: 'bar',
  data: {
    labels: ['1 · Initial Population', '2 · Denominator', '3 · After Exclusions', '4 · Numerator'],
    datasets: [{
      label: 'Patients',
      data: [INITIAL, DENOMINATOR, denomAfter(), state.numerator],
      backgroundColor: ['#c9d3dc', '#9dc9f2', '#e08a1e', '#3f8a54'],
      borderColor: ['#97a5b2', '#3776a8', '#aa731e', '#2c6a3e'],
      borderWidth: 1
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    // Animations off: an entry animation interrupted by the first resize can
    // leave the bars parked at their pre-resize geometry.
    animation: false,
    scales: {
      x: {beginAtZero: true, max: INITIAL, title: {display: true, text: 'Patients'},
          ticks: {callback: v => v.toLocaleString()}},
      y: {ticks: {font: {size: 13}}}
    },
    plugins: {
      legend: {display: false},
      tooltip: {
        callbacks: {
          label: item => ` ${item.parsed.x.toLocaleString()} patients`,
          afterBody: items => {
            const key = ['initial', 'denominator', 'after', 'numerator'][items[0].dataIndex];
            return ['', definitions[key][1]];
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (elements.length) showPopulation(['initial', 'denominator', 'after', 'numerator'][elements[0].index]);
    }
  }
});
requestAnimationFrame(() => { chart.resize(); chart.update('none'); });

function showPopulation(key) {
  const counts = {initial: INITIAL, denominator: DENOMINATOR, after: denomAfter(), numerator: state.numerator};
  document.getElementById('info').innerHTML =
    `<h2>${definitions[key][0]} — ${counts[key].toLocaleString()} patients</h2><p>${definitions[key][1]}</p>`;
}

function render() {
  chart.data.datasets[0].data = [INITIAL, DENOMINATOR, denomAfter(), state.numerator];
  chart.update('none');
  const r = rate();
  document.getElementById('rate').innerHTML = r === null
    ? '<p class="metric">Rate undefined</p><p>Every patient has been excluded, so the denominator is zero and the measure cannot be reported.</p>'
    : `<p class="metric">Measure Rate = ${state.numerator.toLocaleString()} / ${denomAfter().toLocaleString()} = ${(r * 100).toFixed(1)}%</p>
       <p>Reported out of the <strong>exclusion-adjusted denominator</strong> (${denomAfter().toLocaleString()}), not out of the initial population (${INITIAL.toLocaleString()}). Dividing by the initial population instead would report ${((state.numerator / INITIAL) * 100).toFixed(1)}% — a different number for the same patients.</p>`;
}

function update() {
  state.exclusions = Math.min(Math.max(0, Number(document.getElementById('exclusions').value) || 0), DENOMINATOR);
  state.numerator = Math.max(0, Number(document.getElementById('numerator').value) || 0);
  // The numerator is counted out of the adjusted denominator, so it cannot exceed it.
  if (state.numerator > denomAfter()) {
    state.numerator = denomAfter();
    document.getElementById('numerator').value = state.numerator;
  }
  render();
}

document.getElementById('exclusions').addEventListener('input', update);
document.getElementById('numerator').addEventListener('input', update);

document.getElementById('scenario').addEventListener('click', () => {
  document.getElementById('exclusions').value = 1500;
  update();
  document.getElementById('info').innerHTML =
    `<h2>Tripling the exclusions</h2><p>Exclusions move from 500 to 1,500. Not one patient’s HbA1c changed, and the numerator is unchanged at ${state.numerator.toLocaleString()} — but the denominator shrank by 1,000, so the reported rate rose.</p><p>This is why measure stewards specify exclusions in executable logic rather than prose, and why exclusion counts are audited: the exclusion criterion is the one place where a defensible clinical judgment and a favorable reported number point the same direction.</p>`;
});

document.getElementById('reset').addEventListener('click', () => {
  document.getElementById('exclusions').value = 500;
  document.getElementById('numerator').value = 25500;
  update();
  start();
});

function start() {
  document.getElementById('info').innerHTML =
    '<h2>Four populations, one rate</h2><p>Select any bar for its definition, or change a count on the left and watch the rate recompute. Try raising the exclusions and note what does <em>not</em> change: the numerator.</p>';
}

update();
start();

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
