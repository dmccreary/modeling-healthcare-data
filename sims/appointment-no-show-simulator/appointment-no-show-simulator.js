// Appointment No-Show Simulator MicroSim - p5.js
// CANVAS_HEIGHT: 616
// Apply (L3): adjust no-show rate, overbooking factor, visit-length variability, and
// template, then "Run day" to see how they jointly determine provider utilization,
// patient wait time, and clinic overtime — the core scheduling tradeoff.

let containerWidth, canvasWidth = 980;
let drawHeight = 400;
let controlHeight = 160;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

const DAY_START = 480, DAY_END = 1020, NSLOTS = 18, SLOT = 30; // 8:00–17:00, 30-min slots
let noShowSlider, overbookSlider, varSelect, templateSelect, runBtn, resetBtn;
let result = null, runSeed = 1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  noShowSlider = createSlider(0, 40, 18, 1);
  overbookSlider = createSlider(100, 160, 100, 5); // /100 = 1.0–1.6
  varSelect = createSelect(); ['Low', 'Medium', 'High'].forEach(o => varSelect.option(o)); varSelect.selected('Medium');
  templateSelect = createSelect(); ['Wave', 'Modified-wave', 'Stream'].forEach(o => templateSelect.option(o)); templateSelect.selected('Stream');
  runBtn = createButton('Run day'); runBtn.mousePressed(() => { runSeed++; runDay(); });
  resetBtn = createButton('Reset'); resetBtn.mousePressed(() => { result = null; });
  layoutControls();
  runDay();
  describe('Appointment scheduling and no-show simulator: a one-day clinic timeline showing kept, no-show, and overbook-collision appointments, with live utilization, wait-time, and overtime KPIs.', LABEL);
}
function layoutControls() {
  const sx = 230;
  noShowSlider.position(sx, drawHeight + 12); noShowSlider.size(200);
  overbookSlider.position(sx, drawHeight + 40); overbookSlider.size(200);
  varSelect.position(sx, drawHeight + 66);
  templateSelect.position(sx + 130, drawHeight + 66);
  runBtn.position(margin, drawHeight + 100);
  resetBtn.position(margin + 100, drawHeight + 100);
}

function rng(seed) { let s = seed; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
function serviceLen(r) { const v = varSelect.value(); const base = 20;
  if (v === 'Low') return base - 2 + r() * 4; if (v === 'High') return 8 + r() * 37; return 12 + r() * 18; }

function buildArrivals(overbook) {
  const nAppts = Math.round(NSLOTS * overbook);
  const arr = [];
  const tmpl = templateSelect.value();
  if (tmpl === 'Stream') {
    for (let i = 0; i < nAppts; i++) arr.push(DAY_START + i * ((DAY_END - DAY_START) / nAppts));
  } else {
    const per = overbook; let count = 0;
    for (let s = 0; s < NSLOTS && count < nAppts; s++) {
      const k = Math.round(per);
      for (let j = 0; j < k && count < nAppts; j++) {
        const off = tmpl === 'Modified-wave' ? j * 10 : 0;
        arr.push(DAY_START + s * SLOT + off); count++;
      }
    }
  }
  return arr.slice(0, nAppts).sort((a, b) => a - b);
}

function runDay() {
  const overbook = overbookSlider.value() / 100, noShow = noShowSlider.value() / 100;
  const r = rng(runSeed * 7919 + 13);
  const arrivals = buildArrivals(overbook);
  let free = DAY_START, busy = 0, waits = [], appts = [], seen = 0;
  arrivals.forEach(a => {
    if (r() < noShow) { appts.push({ a, noShow: true }); return; }
    const start = Math.max(a, free), wait = start - a, len = serviceLen(r), end = start + len;
    busy += len; waits.push(wait); free = end; seen++;
    appts.push({ a, start, end, wait, len, noShow: false });
  });
  const lastEnd = free, wall = lastEnd - DAY_START;
  const util = wall > 0 ? Math.min(100, busy / wall * 100) : 0;
  const meanWait = waits.length ? waits.reduce((x, y) => x + y, 0) / waits.length : 0;
  const overtime = Math.max(0, lastEnd - DAY_END);
  result = { appts, util, meanWait, overtime, seen, lastEnd, overbook, noShow };
}

function mins2hhmm(m) { const h = Math.floor(m / 60), mm = Math.round(m % 60); return h + ':' + (mm < 10 ? '0' : '') + mm; }

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Appointment Scheduling & No-Show Simulator', canvasWidth / 2, 8);

  // timeline (left)
  const tx = margin + 40, tw = canvasWidth * 0.60 - tx, ty = 70, th = drawHeight - ty - 30;
  const tEnd = result ? Math.max(DAY_END + 30, result.lastEnd + 10) : DAY_END + 30;
  const X = m => tx + (m - DAY_START) / (tEnd - DAY_START) * tw;
  // hour gridlines
  stroke('#e2e6ea'); strokeWeight(1); fill('#889'); textSize(9); textAlign(CENTER, TOP);
  for (let m = DAY_START; m <= tEnd; m += 60) { line(X(m), ty, X(m), ty + th); noStroke(); text(mins2hhmm(m), X(m), ty + th + 4); stroke('#e2e6ea'); }
  noStroke();
  // 17:00 end-of-day marker
  stroke('#c0392b'); strokeWeight(1.5); line(X(DAY_END), ty - 4, X(DAY_END), ty + th); noStroke();
  fill('#c0392b'); textSize(9); textAlign(CENTER, BOTTOM); text('17:00', X(DAY_END), ty - 4);

  if (!result) {
    // show scheduled arrivals (blue ticks)
    const arr = buildArrivals(overbookSlider.value() / 100);
    stroke('#3b78c3'); strokeWeight(2);
    arr.forEach((a, i) => { const x = X(a), y = ty + 12 + (i % 8) * ((th - 20) / 8); line(x, y, x, y + 10); });
    noStroke(); fill('#667'); textAlign(CENTER, CENTER); textSize(13);
    text('Booked schedule (' + arr.length + ' appointments). Click "Run day" to simulate no-shows and overbook collisions.', tx + tw / 2, ty + th / 2, tw - 20);
  } else {
    const laneH = (th - 20) / 8;
    result.appts.forEach((ap, i) => {
      const y = ty + 8 + (i % 8) * laneH;
      if (ap.noShow) { stroke('#aaa'); strokeWeight(2); line(X(ap.a), y, X(ap.a), y + laneH - 6); noStroke(); }
      else {
        const col = ap.wait >= 10 ? color(232, 130, 26) : color(46, 125, 50);
        fill(col); stroke('white'); strokeWeight(0.5); rect(X(ap.start), y, Math.max(2, X(ap.end) - X(ap.start)), laneH - 6, 2); noStroke();
      }
    });
    // legend
    textSize(11); textAlign(LEFT, CENTER);
    fill(46, 125, 50); rect(tx, ty + th + 16, 12, 9); fill('#445'); text('kept', tx + 16, ty + th + 21);
    fill(232, 130, 26); rect(tx + 60, ty + th + 16, 12, 9); fill('#445'); text('waited ≥10m', tx + 76, ty + th + 21);
    stroke('#aaa'); strokeWeight(2); line(tx + 180, ty + th + 16, tx + 180, ty + th + 25); noStroke(); fill('#445'); text('no-show', tx + 188, ty + th + 21);
  }

  // KPI panel (right)
  const px = canvasWidth * 0.63, pw = canvasWidth - px - margin;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, 60, pw, drawHeight - 76, 6); noStroke();
  fill('#14506b'); textSize(13); textAlign(LEFT, TOP); text('Day result', px + 14, 70);
  let y = 96; textAlign(LEFT, TOP);
  const kpi = (l, v, c) => { fill('#445'); textSize(12.5); text(l, px + 14, y);
    fill(c || '#111'); textSize(22); textAlign(RIGHT, TOP); text(v, px + pw - 14, y - 4); textAlign(LEFT, TOP); y += 42; };
  if (result) {
    kpi('Provider utilization', Math.round(result.util) + '%', result.util > 85 ? '#1c7a30' : '#b35900');
    kpi('Patient mean wait', Math.round(result.meanWait) + ' min', result.meanWait > 15 ? '#c0392b' : '#1c7a30');
    kpi('Clinic overtime', Math.round(result.overtime) + ' min', result.overtime > 0 ? '#c0392b' : '#1c7a30');
    kpi('Patients seen', result.seen, '#14506b');
    fill('#333'); textSize(11.5);
    text('Overbooking ' + result.overbook.toFixed(2) + 'x against an ' + Math.round(result.noShow * 100) +
         '% no-show rate. Raise overbooking to fill gaps, but watch wait time and overtime rise when patients do show.', px + 14, y, pw - 28);
  } else { fill('#667'); textSize(12.5); text('Run the day to compute utilization, mean wait, overtime, and patients seen.', px + 14, y, pw - 28); }

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(13); noStroke();
  text('No-show rate: ' + noShowSlider.value() + '%', margin, drawHeight + 23);
  text('Overbooking: ' + (overbookSlider.value() / 100).toFixed(2) + 'x', margin, drawHeight + 51);
  text('Variability / Template:', margin, drawHeight + 77);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
