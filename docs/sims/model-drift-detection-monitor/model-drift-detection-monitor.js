// Model Drift Detection Monitor — normal fluctuation versus a real drift event.
// CANVAS_HEIGHT: 778
'use strict';

const BASELINE = 0.88;
const THRESHOLD = 0.84;   // two standard deviations below baseline
const VENDOR_WEEK = 18;
const ALERT_WEEK = 20;

// Weeks 0–16 fluctuate inside the normal band; the decline begins after the
// upstream lab-vendor change at week 18 and settles at the new, lower level.
const auroc = [
  0.880, 0.874, 0.886, 0.869, 0.883, 0.877, 0.890, 0.866, 0.879, 0.885,
  0.871, 0.888, 0.875, 0.881, 0.868, 0.884, 0.878, 0.872, 0.866, 0.851,
  0.836, 0.820, 0.790, 0.788, 0.793, 0.786, 0.791
];
const weeks = auroc.map((_, i) => i);

const main = document.querySelector('main');
main.className = 'wide';
main.innerHTML = `<h1>Model Drift Detection Monitor</h1>
<p class="intro">A deployed readmission model’s rolling AUROC over 26 weeks. Hover any point; select the week-18 marker for the cause.</p>
<div class="legend">
  <span><i class="swatch" style="background:#245c92"></i>Rolling AUROC</span>
  <span><i class="swatch" style="background:#8a97a3"></i>Baseline 0.88</span>
  <span><i class="swatch" style="background:rgba(178,59,59,.18);border:1px solid #b23b3b"></i>Alert band (below 0.84)</span>
</div>
<div class="mermaid-controls controls">
  <button id="refs" aria-pressed="true">Hide reference lines</button>
  <button id="cause">Why did it drift?</button>
  <button id="fluctuation">Is week 7 a drift event?</button>
  <button id="reset">Reset</button>
</div>
<div class="chartbox"><canvas id="chart" aria-label="Line chart of rolling AUROC over 26 weeks with a drift alert band"></canvas></div>
<div id="info" class="mermaid-info info" aria-live="polite"></div>
<p class="footer">Synthetic monitoring data. AUROC is the area under the receiver operating characteristic curve: 1.0 is a perfect ranking, 0.5 is chance.</p>`;

let showRefs = true;

function annotations() {
  if (!showRefs) {
    return {
      vendor: vendorLine(),
      alertPoint: alertPoint(),
      alert: alertLabel()
    };
  }
  return {
    band: {
      type: 'box', yMin: 0.5, yMax: THRESHOLD,
      backgroundColor: 'rgba(178,59,59,0.14)', borderColor: 'rgba(178,59,59,0.5)', borderWidth: 1,
      label: {display: true, content: 'Alert band — 2σ below baseline', position: {x: 'start', y: 'start'},
              color: '#8a2828', font: {size: 12, weight: 'bold'}, backgroundColor: 'rgba(255,255,255,0.75)'}
    },
    baseline: {
      type: 'line', yMin: BASELINE, yMax: BASELINE,
      borderColor: '#8a97a3', borderWidth: 2, borderDash: [6, 4],
      label: {display: true, content: `Baseline ${BASELINE.toFixed(2)}`, position: 'end',
              color: '#5a6978', font: {size: 12}, backgroundColor: 'rgba(255,255,255,0.75)'}
    },
    vendor: vendorLine(),
    alertPoint: alertPoint(),
    alert: alertLabel()
  };
}

function vendorLine() {
  return {
    type: 'line', xMin: VENDOR_WEEK, xMax: VENDOR_WEEK,
    borderColor: '#aa731e', borderWidth: 2,
    label: {display: true, content: ['Week 18: lab vendor change', '(unrelated to the model)'], position: 'start',
            color: '#7a4d05', font: {size: 12, weight: 'bold'}, backgroundColor: 'rgba(255,244,217,0.92)'}
  };
}

function alertLabel() {
  return {
    type: 'label', xValue: ALERT_WEEK, yValue: auroc[ALERT_WEEK],
    content: ['Drift alert fires here'], position: 'center',
    xAdjust: 26, yAdjust: -48, color: '#8a2828',
    font: {size: 12, weight: 'bold'}, backgroundColor: 'rgba(255,255,255,0.9)',
    borderColor: '#b23b3b', borderWidth: 1, borderRadius: 4, padding: 5,
    callout: {display: true, side: 4, borderColor: '#b23b3b', borderWidth: 1}
  };
}

function alertPoint() {
  return {
    type: 'point', xValue: ALERT_WEEK, yValue: auroc[ALERT_WEEK],
    radius: 8, backgroundColor: 'rgba(178,59,59,0.25)', borderColor: '#b23b3b', borderWidth: 2
  };
}

const chart = new Chart(document.getElementById('chart'), {
  type: 'line',
  data: {
    labels: weeks,
    datasets: [{
      label: 'Rolling AUROC',
      data: auroc,
      borderColor: '#245c92',
      backgroundColor: '#245c92',
      pointRadius: 3,
      pointHoverRadius: 6,
      tension: 0.25,
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    // Animations off: an entry animation interrupted by the first resize can
    // leave the series parked at its pre-resize geometry.
    animation: false,
    scales: {
      x: {title: {display: true, text: 'Week'}},
      y: {min: 0.5, max: 1.0, title: {display: true, text: 'Rolling AUROC'}}
    },
    plugins: {
      legend: {display: false},
      annotation: {annotations: annotations()},
      tooltip: {
        callbacks: {
          label: item => ` Week ${item.label}: AUROC ${item.parsed.y.toFixed(3)}`,
          afterBody: items => {
            const week = items[0].dataIndex;
            const value = auroc[week];
            if (value < THRESHOLD) return ['', 'Inside the alert band.'];
            if (week >= VENDOR_WEEK) return ['', 'Declining, but not yet inside the alert band.'];
            return ['', `Within normal fluctuation (${(BASELINE - value >= 0 ? '−' : '+')}${Math.abs(BASELINE - value).toFixed(3)} from baseline).`];
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (!elements.length) return;
      showWeek(elements[0].index);
    }
  }
});
requestAnimationFrame(() => { chart.resize(); chart.update('none'); });

function showWeek(week) {
  const value = auroc[week];
  if (week === VENDOR_WEEK) { showCause(); return; }
  if (value < THRESHOLD) {
    document.getElementById('info').innerHTML =
      `<h2>Week ${week} — AUROC ${value.toFixed(3)}</h2><p>Inside the alert band, ${(BASELINE - value).toFixed(3)} below baseline. ${week === ALERT_WEEK ? 'This is the first week the metric crosses the threshold, so this is where the drift alert fires.' : 'The metric has stayed below threshold since week ' + ALERT_WEEK + '; this is the new operating level, not a dip.'}</p>`;
    return;
  }
  document.getElementById('info').innerHTML =
    `<h2>Week ${week} — AUROC ${value.toFixed(3)}</h2><p>${Math.abs(BASELINE - value).toFixed(3)} from baseline, inside the normal band. A single week here says nothing on its own: ${week < VENDOR_WEEK ? 'the series bounces above and below the baseline in both directions throughout the first sixteen weeks.' : 'the decline has begun, but one point above the threshold is not yet an alert.'}</p>`;
}

function showCause() {
  document.getElementById('info').innerHTML =
    `<h2>Week 18 — the laboratory changed vendors</h2>
     <p>Nothing about the model changed. No code was deployed, no weights were retrained, no bug was introduced. An upstream data source changed: the new laboratory reports one of the model’s input tests on a different assay, with a different reference range and a slightly different distribution.</p>
     <p>The model kept doing exactly what it was trained to do, on inputs that no longer mean what they meant during training. That is what drift usually is — and it is why monitoring a deployed model has to watch its <em>inputs</em> as well as its outputs. A distribution check on that single lab value would have fired at week 18 rather than week ${ALERT_WEEK}.</p>
     <p class="note">Two weeks passed between cause and alert. That lag is not a defect in the threshold; it is the cost of monitoring a rolling window, which needs several weeks of degraded outcomes before the average moves.</p>`;
}

document.getElementById('refs').addEventListener('click', () => {
  showRefs = !showRefs;
  const button = document.getElementById('refs');
  button.setAttribute('aria-pressed', String(showRefs));
  button.textContent = showRefs ? 'Hide reference lines' : 'Show reference lines';
  chart.options.plugins.annotation.annotations = annotations();
  chart.update('none');
  if (!showRefs) {
    document.getElementById('info').innerHTML =
      '<h2>The same series without its reference lines</h2><p>Without a baseline and a threshold drawn on it, the decline after week 18 is visible but its significance is not. Is 0.79 bad? Compared with what? A monitoring chart without an explicit expected value is a chart nobody can act on — the reference lines are what turn an observation into an alert.</p>';
  }
});
document.getElementById('cause').addEventListener('click', showCause);
document.getElementById('fluctuation').addEventListener('click', () => {
  document.getElementById('info').innerHTML =
    `<h2>Week 7 is not a drift event</h2>
     <p>Week 7 reads ${auroc[7].toFixed(3)}, the lowest value in the first sixteen weeks and ${(BASELINE - auroc[7]).toFixed(3)} below baseline. It is still well above the ${THRESHOLD} threshold, and — more tellingly — it is followed by ${auroc[8].toFixed(3)} and ${auroc[9].toFixed(3)}, which return to the baseline.</p>
     <p>Three properties separate normal fluctuation from drift here:</p>
     <dl>
       <dt>Direction</dt><dd>Fluctuation scatters above and below the baseline. Weeks 19 onward move in one direction only.</dd>
       <dt>Persistence</dt><dd>A fluctuation reverts within a week or two. The post-week-18 decline never reverts.</dd>
       <dt>Magnitude</dt><dd>Fluctuation stays inside two standard deviations. Drift crosses it and stays across.</dd>
     </dl>
     <p>A monitor that alerted on week 7 would be a monitor nobody trusts by week 20.</p>`;
});
document.getElementById('reset').addEventListener('click', () => {
  showRefs = true;
  document.getElementById('refs').setAttribute('aria-pressed', 'true');
  document.getElementById('refs').textContent = 'Hide reference lines';
  chart.options.plugins.annotation.annotations = annotations();
  chart.update('none');
  start();
});

function start() {
  document.getElementById('info').innerHTML =
    `<h2>Twenty-six weeks of a deployed model</h2><p>The metric bounces harmlessly around ${BASELINE} for sixteen weeks, then declines after week ${VENDOR_WEEK} and crosses into the alert band at week ${ALERT_WEEK}. Select any point for its reading, or use the buttons above to separate the drift event from the noise that precedes it.</p>`;
}

start();

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
