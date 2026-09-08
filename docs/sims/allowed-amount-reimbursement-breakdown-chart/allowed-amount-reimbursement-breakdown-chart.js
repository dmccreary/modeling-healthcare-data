// Allowed Amount and Reimbursement Breakdown — where a billed charge actually goes.
// CANVAS_HEIGHT: 778
'use strict';

// Synthetic claim lines. Every row satisfies: billed = reimbursement +
// coinsurance + writeOff + balanceBill, and coinsurance is 20% of allowed.
const claims = [
  {name: 'Office Visit', billed: 250, allowed: 180, reimbursement: 144, coinsurance: 36, writeOff: 70, balanceBill: 0},
  {name: 'EKG', billed: 120, allowed: 75, reimbursement: 60, coinsurance: 15, writeOff: 45, balanceBill: 0},
  {name: 'Blood Draw', billed: 30, allowed: 18, reimbursement: 14.40, coinsurance: 3.60, writeOff: 12, balanceBill: 0},
  {name: 'MRI (In-Network)', billed: 1800, allowed: 900, reimbursement: 720, coinsurance: 180, writeOff: 900, balanceBill: 0},
  {name: 'MRI (Out-of-Network)', billed: 1800, allowed: 900, reimbursement: 450, coinsurance: 450, writeOff: 0, balanceBill: 900}
];

const terms = {
  reimbursement: 'Payer Reimbursement — what the plan actually pays the provider, after cost-sharing is subtracted from the allowed amount.',
  coinsurance: 'Member Coinsurance — the member’s percentage share of the allowed amount. In these examples it is 20 percent in-network and 50 percent out-of-network.',
  writeOff: 'Contractual Adjustment (write-off) — the gap between the billed charge and the contracted allowed amount. Nobody pays it. The provider agreed to give it up in exchange for being in the network.',
  balanceBill: 'Balance Bill — the same gap, but billed to the member, because an out-of-network provider signed no contract agreeing to write it off.'
};

const colors = {
  reimbursement: '#245c92',
  coinsurance: '#e08a1e',
  writeOff: '#c9d3dc',
  balanceBill: '#b23b3b'
};

const main = document.querySelector('main');
main.className = 'wide';
main.innerHTML = `<h1>Allowed Amount and Reimbursement Breakdown</h1>
<p class="intro">Five claim lines, each split four ways. Hover a segment for its exact dollar value and definition.</p>
<div class="legend">
  <span><i class="swatch" style="background:${colors.reimbursement}"></i>Payer reimbursement</span>
  <span><i class="swatch" style="background:${colors.coinsurance}"></i>Member coinsurance</span>
  <span><i class="swatch" style="background:${colors.writeOff};border:1px solid #97a5b2"></i>Contractual write-off (owed by nobody)</span>
  <span><i class="swatch" style="background:${colors.balanceBill}"></i>Balance bill (out-of-network only)</span>
</div>
<div class="mermaid-controls controls">
  <button id="zoom" aria-pressed="false">Zoom to routine claims ($0–$500)</button>
  <button id="billedLine" aria-pressed="false">Show billed charge marker</button>
  <button id="compare">Compare the two MRIs</button>
  <button id="reset">Reset</button>
</div>
<div class="chartbox"><canvas id="chart" aria-label="Stacked bar chart of claim payment components"></canvas></div>
<div id="info" class="mermaid-info info" aria-live="polite"></div>
<p class="footer">Synthetic claims. Each bar’s full width is the billed charge; the segments always sum to it.</p>`;

let showBilled = false;
let zoomed = false;

// A diagonal hatch marks the write-off segment as money nobody pays.
function hatchPattern() {
  const tile = document.createElement('canvas');
  tile.width = 10;
  tile.height = 10;
  const ctx = tile.getContext('2d');
  ctx.fillStyle = colors.writeOff;
  ctx.fillRect(0, 0, 10, 10);
  ctx.strokeStyle = '#97a5b2';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, 10); ctx.lineTo(10, 0);
  ctx.moveTo(-2, 2); ctx.lineTo(2, -2);
  ctx.moveTo(8, 12); ctx.lineTo(12, 8);
  ctx.stroke();
  return ctx.createPattern(tile, 'repeat');
}

// Draws a tick at the billed-charge position on each bar, so the learner can see
// how much the allowed amount removed before cost-sharing was even applied.
const billedMarker = {
  id: 'billedMarker',
  afterDatasetsDraw(chart) {
    if (!showBilled) return;
    const {ctx, scales: {x, y}} = chart;
    ctx.save();
    ctx.strokeStyle = '#1c3350';
    ctx.setLineDash([4, 3]);
    ctx.lineWidth = 2;
    claims.forEach((claim, i) => {
      const px = x.getPixelForValue(claim.billed);
      const py = y.getPixelForValue(i);
      const half = (y.height / claims.length) * 0.34;
      ctx.beginPath();
      ctx.moveTo(px, py - half);
      ctx.lineTo(px, py + half);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#1c3350';
      ctx.font = 'bold 11px Arial';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText(`billed $${claim.billed.toLocaleString()}`, px + 5, py);
      ctx.setLineDash([4, 3]);
    });
    ctx.restore();
  }
};

const chart = new Chart(document.getElementById('chart'), {
  type: 'bar',
  plugins: [billedMarker],
  data: {
    labels: claims.map(c => c.name),
    datasets: [
      {key: 'reimbursement', label: 'Payer reimbursement', data: claims.map(c => c.reimbursement), backgroundColor: colors.reimbursement},
      {key: 'coinsurance', label: 'Member coinsurance', data: claims.map(c => c.coinsurance), backgroundColor: colors.coinsurance},
      {key: 'balanceBill', label: 'Balance bill', data: claims.map(c => c.balanceBill), backgroundColor: colors.balanceBill},
      {key: 'writeOff', label: 'Contractual write-off', data: claims.map(c => c.writeOff), backgroundColor: hatchPattern(), borderColor: '#97a5b2', borderWidth: 1}
    ]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    // Animations off: an entry animation interrupted by the first resize can
    // leave the bars parked at their pre-resize geometry.
    animation: false,
    scales: {
      x: {stacked: true, min: 0, max: 1800, title: {display: true, text: 'Dollars'}, ticks: {callback: v => '$' + v.toLocaleString()}},
      y: {stacked: true, ticks: {font: {size: 13}}}
    },
    plugins: {
      legend: {display: false},
      tooltip: {
        callbacks: {
          label: item => {
            const value = item.parsed.x;
            return value === 0 ? null : ` ${item.dataset.label}: ${money(value)}`;
          },
          afterBody: items => {
            const key = items[0]?.dataset.key;
            const claim = claims[items[0].dataIndex];
            return ['', terms[key], '', `Billed $${claim.billed.toLocaleString()} · Allowed $${claim.allowed.toLocaleString()}`];
          }
        }
      }
    },
    onClick: (event, elements) => {
      if (!elements.length) return;
      const claim = claims[elements[0].index];
      showClaim(claim, elements[0].datasetIndex);
    }
  }
});

// Chart.js measures its container at construction time; on the first paint the
// canvas can still be at its default 300x150, which leaves the bars laid out for
// a chart that no longer exists. One resize after layout settles it.
requestAnimationFrame(() => { chart.resize(); chart.update('none'); });

function money(value) {
  return '$' + value.toLocaleString(undefined, {minimumFractionDigits: value % 1 ? 2 : 0});
}

function showClaim(claim, datasetIndex) {
  if (claim.name === 'MRI (Out-of-Network)') { showComparison(); return; }
  const key = chart.data.datasets[datasetIndex].key;
  document.getElementById('info').innerHTML =
    `<h2>${claim.name}</h2>
     <p>Billed ${money(claim.billed)}. The contract recognizes only ${money(claim.allowed)} — the allowed amount — and everything below is a division of that number.</p>
     <dl>
       <dt>Contractual write-off</dt><dd>${money(claim.writeOff)} — ${money(claim.billed)} billed minus ${money(claim.allowed)} allowed. Owed by nobody.</dd>
       <dt>Member coinsurance</dt><dd>${money(claim.coinsurance)} — 20% of the allowed amount, not of the billed charge.</dd>
       <dt>Payer reimbursement</dt><dd>${money(claim.reimbursement)} — the allowed amount minus the member’s share.</dd>
     </dl>
     <p class="note">${terms[key]}</p>`;
}

function showComparison() {
  const inNet = claims.find(c => c.name === 'MRI (In-Network)');
  const outNet = claims.find(c => c.name === 'MRI (Out-of-Network)');
  document.getElementById('info').innerHTML =
    `<h2>The same MRI, two network statuses</h2>
     <p>Identical procedure, identical ${money(outNet.billed)} billed charge, identical ${money(outNet.allowed)} allowed amount. Only the contract differs.</p>
     <dl>
       <dt>In-network member pays</dt><dd>${money(inNet.coinsurance)} — 20% coinsurance on the allowed amount. The ${money(inNet.writeOff)} gap between billed and allowed is written off, because the provider signed a contract agreeing to accept the allowed amount as payment in full.</dd>
       <dt>Out-of-network member pays</dt><dd><span class="metric">${money(outNet.coinsurance + outNet.balanceBill)}</span> — ${money(outNet.coinsurance)} coinsurance at the higher out-of-network rate, <strong>plus</strong> the full ${money(outNet.balanceBill)} gap as a balance bill.</dd>
     </dl>
     <p>The member’s cost is ${(((outNet.coinsurance + outNet.balanceBill) / inNet.coinsurance)).toFixed(1)}× higher. Notice where it comes from: the coinsurance rate change accounts for ${money(outNet.coinsurance - inNet.coinsurance)} of it, and the missing write-off for ${money(outNet.balanceBill)}. The contract, not the medicine, produced most of the difference.</p>
     <p class="note">This is why network status is a property worth modeling on the relationship between a provider and a plan, rather than an attribute of the provider alone: the same provider can be in-network for one plan and out-of-network for another.</p>`;
}

document.getElementById('billedLine').addEventListener('click', () => {
  showBilled = !showBilled;
  document.getElementById('billedLine').setAttribute('aria-pressed', String(showBilled));
  document.getElementById('billedLine').textContent = showBilled ? 'Hide billed charge marker' : 'Show billed charge marker';
  chart.update('none');
});
// The three routine claim lines are invisible on a scale that also has to hold an
// $1,800 MRI, so the axis can be clipped to the range the spec calls for.
document.getElementById('zoom').addEventListener('click', () => {
  zoomed = !zoomed;
  chart.options.scales.x.max = zoomed ? 500 : 1800;
  chart.update('none');
  const button = document.getElementById('zoom');
  button.setAttribute('aria-pressed', String(zoomed));
  button.textContent = zoomed ? 'Show all claims ($0–$1,800)' : 'Zoom to routine claims ($0–$500)';
  if (zoomed) {
    document.getElementById('info').innerHTML =
      '<h2>Routine claims at readable scale</h2><p>The office visit, EKG, and blood draw now fill the axis; the two MRI bars run off the right edge. Every one of the three has the same shape — a hatched write-off consuming a quarter to a third of the billed charge, and a member share that is a fifth of what remains.</p><p>Both MRI bars extend past $500 and are clipped here. Switch back to see them whole.</p>';
  }
});
document.getElementById('compare').addEventListener('click', showComparison);
document.getElementById('reset').addEventListener('click', () => {
  showBilled = false;
  zoomed = false;
  chart.options.scales.x.max = 1800;
  document.getElementById('zoom').setAttribute('aria-pressed', 'false');
  document.getElementById('zoom').textContent = 'Zoom to routine claims ($0–$500)';
  document.getElementById('billedLine').setAttribute('aria-pressed', 'false');
  document.getElementById('billedLine').textContent = 'Show billed charge marker';
  chart.update('none');
  start();
});

function start() {
  document.getElementById('info').innerHTML =
    '<h2>Four ways a billed charge is divided</h2><p>Read any bar left to right: the payer’s share, then the member’s share, then — for the out-of-network MRI only — the balance bill, then the hatched write-off that nobody pays. Select a bar for its full calculation, or use <strong>Compare the two MRIs</strong> to see what network status alone is worth.</p>';
}

start();

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
