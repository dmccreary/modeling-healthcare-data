// GSQL Accumulator Pattern MicroSim - p5.js
// CANVAS_HEIGHT: 636
// Demonstrates how a GSQL accumulator aggregates values during a graph traversal. As
// the traversal visits each treatment (and any complications), the chosen accumulator
// (Sum / Max / Avg / Set) updates in real time in the panel below.

let containerWidth, canvasWidth = 920;
let drawHeight = 420;
let controlHeight = 160;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

const TREATMENTS = [
  { id: 'T1', name: 'Surgery', w: 8, comp: { name: 'Infection', w: 4 } },
  { id: 'T2', name: 'Chemo', w: 7, comp: null },
  { id: 'T3', name: 'Radiation', w: 5, comp: { name: 'Fatigue', w: 2 } },
  { id: 'T4', name: 'Physio', w: 2, comp: null },
  { id: 'T5', name: 'Medication', w: 3, comp: { name: 'Allergy', w: 3 } },
  { id: 'T6', name: 'Transfusion', w: 4, comp: null },
  { id: 'T7', name: 'Dialysis', w: 6, comp: { name: 'Hypotension', w: 5 } },
  { id: 'T8', name: 'Monitoring', w: 1, comp: null }
];

let accSelect, startBtn, resetBtn, speedSlider, showCheck;
let visitOrder = []; // sequence of {kind:'treat'|'comp', idx}
let stepIdx = -1, running = false, lastT = 0, finished = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  accSelect = createSelect(); ['SumAccum', 'MaxAccum', 'AvgAccum', 'SetAccum'].forEach(o => accSelect.option(o)); accSelect.changed(reset);
  speedSlider = createSlider(150, 1500, 600, 50);
  showCheck = createCheckbox(' Highlight nodes as visited', true);
  startBtn = createButton('Start traversal'); startBtn.mousePressed(() => { if (finished) reset(); running = true; lastT = millis(); });
  resetBtn = createButton('Reset'); resetBtn.mousePressed(reset);
  layoutControls();
  reset();
  stepIdx = Math.floor(visitOrder.length * 0.55); // illustrative paused default
  describe('GSQL accumulator pattern: a patient connected to eight treatment nodes (some with complications); starting the traversal animates visiting each node and updates the selected accumulator value in real time.', LABEL);
}
function layoutControls() {
  accSelect.position(160, drawHeight + 12);
  speedSlider.position(160, drawHeight + 46); speedSlider.size(180);
  showCheck.position(margin, drawHeight + 78); showCheck.style('font-size', '14px');
  startBtn.position(margin, drawHeight + 108); resetBtn.position(margin + 120, drawHeight + 108);
}
function reset() {
  visitOrder = [];
  TREATMENTS.forEach((t, i) => { visitOrder.push({ kind: 'treat', idx: i }); if (t.comp) visitOrder.push({ kind: 'comp', idx: i }); });
  stepIdx = -1; running = false; finished = false;
}

// accumulator value over the visited prefix
function accState() {
  const acc = accSelect.value();
  let visitedTreat = 0, vals = [], setItems = [];
  for (let k = 0; k <= stepIdx && k < visitOrder.length; k++) {
    const v = visitOrder[k], t = TREATMENTS[v.idx];
    if (v.kind === 'treat') { visitedTreat++; vals.push(t.w); setItems.push(t.name); }
    else { vals.push(t.comp.w); setItems.push(t.comp.name); }
  }
  let val;
  if (acc === 'SumAccum') val = vals.reduce((a, b) => a + b, 0);
  else if (acc === 'MaxAccum') val = vals.length ? Math.max(...vals) : 0;
  else if (acc === 'AvgAccum') val = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  else val = setItems.length;
  return { acc, val, count: visitedTreat, vals, setItems };
}

function tPos(i) { const a = -PI / 2 + i * TWO_PI / TREATMENTS.length; return { x: canvasWidth * 0.5 + Math.cos(a) * (canvasWidth * 0.19), y: drawHeight * 0.56 + Math.sin(a) * (drawHeight * 0.30) }; }
function cPos(i) { const p = tPos(i), c = { x: canvasWidth * 0.5, y: drawHeight * 0.56 }; return { x: p.x + (p.x - c.x) * 0.34, y: p.y + (p.y - c.y) * 0.34 }; }

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(19);
  text('GSQL Accumulator Pattern — risk_score over a traversal', canvasWidth / 2, 8);

  if (running && stepIdx < visitOrder.length - 1) { if (millis() - lastT > speedSlider.value()) { stepIdx++; lastT = millis(); } }
  else if (running) { running = false; finished = true; }
  const show = showCheck.checked();
  const visitedUpTo = k => k <= stepIdx;

  const center = { x: canvasWidth * 0.5, y: drawHeight * 0.52 };
  // edges
  TREATMENTS.forEach((t, i) => {
    const p = tPos(i); stroke('#cdd5dc'); strokeWeight(1.5); line(center.x, center.y, p.x, p.y);
    if (t.comp) { const cp = cPos(i); stroke('#f0cfcf'); line(p.x, p.y, cp.x, cp.y); }
  });
  // treatment + complication nodes
  TREATMENTS.forEach((t, i) => {
    const p = tPos(i); const oi = visitOrder.findIndex(v => v.kind === 'treat' && v.idx === i);
    const cur = oi === stepIdx, vis = oi >= 0 && oi < stepIdx || (oi >= 0 && oi <= stepIdx && finished);
    stroke(cur && show ? '#c9a400' : '#2e7d32'); strokeWeight(cur && show ? 3 : 1.5);
    fill(cur && show ? '#ffe24a' : (vis && show ? '#cdeccd' : '#bfe3c8')); circle(p.x, p.y, 46);
    noStroke(); fill('#15402a'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(9.5); text(t.name, p.x - 26, p.y - 4, 52); textStyle(NORMAL);
    textSize(9); fill('#2e7d32'); text('w=' + t.w, p.x, p.y + 10);
    if (t.comp) { const cp = cPos(i), ci = visitOrder.findIndex(v => v.kind === 'comp' && v.idx === i);
      const ccur = ci === stepIdx, cvis = ci >= 0 && ci <= stepIdx;
      stroke(ccur && show ? '#c9a400' : '#c0392b'); strokeWeight(ccur && show ? 3 : 1.5);
      fill(ccur && show ? '#ffe24a' : (cvis && show ? '#f6c9c9' : '#f3d6d6')); circle(cp.x, cp.y, 30);
      noStroke(); fill('#7a1c14'); textSize(8); text(t.comp.name, cp.x - 22, cp.y - 3, 44); text('w=' + t.comp.w, cp.x, cp.y + 8); }
  });
  // patient center
  noStroke(); fill('#3b78c3'); circle(center.x, center.y, 62);
  fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(11); text('Patient', center.x, center.y - 6); textStyle(NORMAL); textSize(9); text('12345', center.x, center.y + 8);

  // accumulator panel (control region)
  const s = accState();
  fill('#14506b'); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD); text(s.acc + ' risk_score', margin + 360, drawHeight + 12); textStyle(NORMAL);
  fill('#c0392b'); textSize(38); textStyle(BOLD);
  text(s.acc === 'AvgAccum' ? s.val.toFixed(2) : (s.acc === 'SetAccum' ? s.setItems.length : s.val), margin + 360, drawHeight + 30); textStyle(NORMAL);
  fill('#445'); textSize(12); textAlign(LEFT, TOP);
  text('Treatments visited: ' + s.count + ' / ' + TREATMENTS.length, margin + 360, drawHeight + 84);
  text('Avg severity: ' + (s.vals.length ? (s.vals.reduce((a, b) => a + b, 0) / s.vals.length).toFixed(1) : '0'), margin + 360, drawHeight + 102);
  fill('#555'); textSize(10.5);
  text(s.acc === 'SetAccum' ? 'Set: {' + s.setItems.join(', ') + '}' : 'Accumulated: ' + s.vals.join(' + '), margin + 600, drawHeight + 86, canvasWidth - (margin + 600) - margin);

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(13); noStroke();
  text('Accumulator:', margin, drawHeight + 24);
  text('Speed: ' + speedSlider.value() + 'ms', margin, drawHeight + 58);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
