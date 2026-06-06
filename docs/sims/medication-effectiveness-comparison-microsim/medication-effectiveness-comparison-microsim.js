// Medication Effectiveness Comparison MicroSim - p5.js
// CANVAS_HEIGHT: 656
// Comparative effectiveness: an aggregate query over patient outcomes, shown as an
// HbA1c-over-time scatter with per-drug trend lines (top) and 12-month box plots
// (bottom) for four diabetes medications. Toggle drugs and filter by minimum group size.

let containerWidth, canvasWidth = 1000;
let drawHeight = 540;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

const MEDS = [
  { name: 'Metformin', color: '#3b78c3', target: 7.6 },
  { name: 'Insulin', color: '#c0392b', target: 7.2 },
  { name: 'GLP-1', color: '#2e7d32', target: 6.9 },
  { name: 'SGLT2', color: '#7b3fb3', target: 7.0 }
];
const START = 9.0, TARGET_LINE = 7.0;
let data = {}; // med -> [{m, a1c, m12}]
let checks = [], minSlider;

function rng(seed) { let s = seed; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
function gauss(r, mean, sd) { return mean + sd * Math.sqrt(-2 * Math.log(Math.max(1e-9, r()))) * Math.cos(2 * Math.PI * r()); }

function build() {
  const r = rng(11);
  MEDS.forEach((med, mi) => {
    const pts = [];
    for (let i = 0; i < 34; i++) {
      const m = r() * 24;
      const a1c = START - (START - med.target) * (m / 24) + gauss(r, 0, 0.45);
      const m12 = med.target + gauss(r, 0, 0.55);
      pts.push({ m, a1c: Math.max(4.5, Math.min(10, a1c)), m12: Math.max(5, Math.min(9.5, m12)) });
    }
    data[med.name] = pts;
  });
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  build();
  MEDS.forEach((med, i) => { const cb = createCheckbox(' ' + med.name, true); checks.push(cb); });
  minSlider = createSlider(10, 40, 10, 1);
  layoutControls();
  describe('Medication effectiveness comparison: a scatter of HbA1c over months on treatment with per-drug trend lines, and 12-month box plots, for Metformin, Insulin, GLP-1, and SGLT2 inhibitors.', LABEL);
}
function layoutControls() {
  let x = 130; checks.forEach((cb, i) => { cb.position(x, drawHeight + 16); cb.style('font-size', '13px'); x += 96; });
  minSlider.position(canvasWidth - 170, drawHeight + 18); minSlider.size(150);
}

function quartiles(arr) { const s = [...arr].sort((a, b) => a - b), q = p => s[Math.floor(p * (s.length - 1))]; return { min: s[0], q1: q(0.25), med: q(0.5), q3: q(0.75), max: s[s.length - 1] }; }

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(19);
  text('Comparative Effectiveness: HbA1c by Diabetes Medication', canvasWidth / 2, 8);

  const active = MEDS.filter((m, i) => checks[i].checked() && data[m.name].length >= minSlider.value());
  const plotX = margin + 44, plotW = canvasWidth - plotX - 150;
  // ---- top scatter ----
  const sy = 40, sh = 230;
  const Y = a => sy + sh - (a - 4.5) / (10 - 4.5) * sh, X = m => plotX + m / 24 * plotW;
  stroke('#bbb'); strokeWeight(1); line(plotX, sy, plotX, sy + sh); line(plotX, sy + sh, plotX + plotW, sy + sh);
  noStroke(); fill('#445'); textSize(9.5); textAlign(RIGHT, CENTER); for (let a = 5; a <= 10; a++) text(a.toFixed(1), plotX - 5, Y(a));
  textAlign(CENTER, TOP); for (let m = 0; m <= 24; m += 6) text(m, X(m), sy + sh + 3);
  fill('#445'); textAlign(CENTER, TOP); textSize(10); text('months on treatment', plotX + plotW / 2, sy + sh + 18);
  push(); translate(plotX - 32, sy + sh / 2); rotate(-HALF_PI); textAlign(CENTER, CENTER); text('HbA1c', 0, 0); pop();
  // target line
  stroke('#999'); strokeWeight(1); drawingContext.setLineDash([5, 4]); line(plotX, Y(TARGET_LINE), plotX + plotW, Y(TARGET_LINE)); drawingContext.setLineDash([]);
  noStroke(); fill('#777'); textSize(9); textAlign(LEFT, BOTTOM); text('clinical target 7.0', plotX + 4, Y(TARGET_LINE) - 1);
  active.forEach(med => {
    const col = color(med.color); col.setAlpha(90); noStroke(); fill(col);
    data[med.name].forEach(p => circle(X(p.m), Y(p.a1c), 6));
    // trend line (model)
    stroke(med.color); strokeWeight(2.5); noFill(); beginShape();
    for (let m = 0; m <= 24; m += 2) vertex(X(m), Y(START - (START - med.target) * (m / 24))); endShape();
  });

  // ---- bottom box plots ----
  const by = 320, bh = 180, bbase = by + bh;
  const BY = a => by + bh - (a - 4.5) / (10 - 4.5) * bh;
  stroke('#bbb'); line(plotX, by, plotX, bbase); line(plotX, bbase, plotX + plotW, bbase);
  noStroke(); fill('#445'); textSize(9.5); textAlign(RIGHT, CENTER); for (let a = 5; a <= 10; a++) text(a.toFixed(1), plotX - 5, BY(a));
  stroke('#999'); drawingContext.setLineDash([5, 4]); line(plotX, BY(TARGET_LINE), plotX + plotW, BY(TARGET_LINE)); drawingContext.setLineDash([]); noStroke();
  fill('#445'); textAlign(CENTER, TOP); textSize(10); text('HbA1c at 12 months (box = quartiles, line = median)', plotX + plotW / 2, bbase + 18);
  const slot = plotW / MEDS.length;
  MEDS.forEach((med, i) => {
    if (!active.includes(med)) return;
    const q = quartiles(data[med.name].map(p => p.m12));
    const cx = plotX + i * slot + slot / 2, w = slot * 0.4;
    stroke(med.color); strokeWeight(1.5); line(cx, BY(q.min), cx, BY(q.max));
    line(cx - w / 3, BY(q.min), cx + w / 3, BY(q.min)); line(cx - w / 3, BY(q.max), cx + w / 3, BY(q.max));
    fill(lerpColor(color(med.color), color('white'), 0.7)); rect(cx - w / 2, BY(q.q3), w, BY(q.q1) - BY(q.q3));
    stroke(med.color); strokeWeight(2.5); line(cx - w / 2, BY(q.med), cx + w / 2, BY(q.med));
    noStroke(); fill('#333'); textAlign(CENTER, TOP); textSize(10.5); text(med.name, cx, bbase + 3);
    fill('#667'); textSize(9); text('n=' + data[med.name].length + ', med ' + q.med.toFixed(1), cx, bbase + 18);
  });

  // legend (right)
  let ly = sy + 6; textAlign(LEFT, CENTER); textSize(11);
  MEDS.forEach((med, i) => { const dim = !active.includes(med); fill(dim ? '#ccc' : med.color); noStroke(); circle(canvasWidth - 130, ly, 11); fill(dim ? '#bbb' : '#445'); text(med.name, canvasWidth - 120, ly); ly += 22; });

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(13); noStroke();
  text('Show medications:', margin, drawHeight + 24);
  text('Min group: ' + minSlider.value(), canvasWidth - 280, drawHeight + 24);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
