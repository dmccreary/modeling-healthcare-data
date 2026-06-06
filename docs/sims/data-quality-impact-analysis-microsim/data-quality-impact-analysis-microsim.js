// Data Quality Impact Analysis MicroSim - p5.js
// CANVAS_HEIGHT: 654
// Introduce data-quality issues into a small patient-provider-prescription-diagnosis
// graph and watch a graph query return wrong answers — duplicates over-count, missing
// edges under-count, and null/inconsistent values drop matches.

let containerWidth, canvasWidth = 1000;
let drawHeight = 400;
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

// nodes: 5 each. patient(pink), provider(blue sq), rx(green hex), dx(orange tri)
const N = 5;
const treated = [[0, 0], [1, 0], [2, 0], [3, 1], [4, 2]];        // patient -> provider (Dr.0 sees P0,P1,P2)
const hasDx = [[0, 0], [1, 0], [2, 1], [3, 2], [4, 3]];          // patient -> diagnosis (Dx0 = same code for P0,P1)
const prescribed = [[0, 0], [0, 1], [1, 2], [2, 3], [2, 4]];     // provider -> rx
const rxTo = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]];           // rx -> patient (each rx has a date unless null issue)

let dupChk, missChk, incChk, nullChk, qSelect, resetBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  dupChk = createCheckbox(' Duplicate patient records', false);
  missChk = createCheckbox(' Missing TREATED_BY edges', false);
  incChk = createCheckbox(' Inconsistent diagnosis codes', false);
  nullChk = createCheckbox(' Null prescription dates', false);
  qSelect = createSelect();
  ['Patients of Dr. 0', 'Patients with diagnosis Dx0', 'Prescriptions with a valid date'].forEach(o => qSelect.option(o));
  resetBtn = createButton('Reset to clean data'); resetBtn.mousePressed(() => { dupChk.checked(false); missChk.checked(false); incChk.checked(false); nullChk.checked(false); });
  layoutControls();
  describe('Data quality impact analysis: a patient-provider-prescription-diagnosis graph where toggling data-quality issues (duplicates, missing edges, inconsistent codes, null dates) changes the result of a graph query versus the correct answer on clean data.', LABEL);
}
function layoutControls() {
  dupChk.position(margin, drawHeight + 12); missChk.position(margin, drawHeight + 38);
  incChk.position(margin, drawHeight + 64); nullChk.position(margin, drawHeight + 90);
  [dupChk, missChk, incChk, nullChk].forEach(c => c.style('font-size', '13px'));
  qSelect.position(canvasWidth / 2 + 70, drawHeight + 12); qSelect.style('font-size', '13px');
}

function colX(c) { return margin + 60 + c * ((canvasWidth - 160) / 3); }
function rowY(r) { return 80 + r * ((drawHeight - 120) / (N - 1)); }

function runQuery() {
  const dup = dupChk.checked(), miss = missChk.checked(), inc = incChk.checked(), nul = nullChk.checked();
  const q = qSelect.value();
  if (q.startsWith('Patients of')) {
    let edges = treated.filter(e => e[1] === 0);
    if (miss) edges = edges.filter((e, i) => i !== 0); // drop one edge
    let patients = edges.map(e => e[0]);
    if (dup) patients = patients.concat(patients[0]); // duplicate first
    const correct = treated.filter(e => e[1] === 0).length;
    return { actual: patients.length, correct, label: 'patients found' };
  } else if (q.startsWith('Patients with diagnosis')) {
    let edges = hasDx.filter(e => e[1] === 0);
    if (inc) edges = edges.filter((e, i) => i !== 1); // one code changed → no longer matches Dx0
    let patients = edges.map(e => e[0]);
    if (dup) patients = patients.concat(patients[0]);
    const correct = hasDx.filter(e => e[1] === 0).length;
    return { actual: patients.length, correct, label: 'patients found' };
  } else {
    let valid = rxTo.length;
    if (nul) valid -= 2; // 2 prescriptions lose their date
    return { actual: valid, correct: rxTo.length, label: 'prescriptions with date' };
  }
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(19);
  text('Data Quality Impact on Graph Queries', canvasWidth / 2, 8);

  const miss = missChk.checked(), inc = incChk.checked(), nul = nullChk.checked(), dup = dupChk.checked();
  // column headers
  fill('#445'); textAlign(CENTER, TOP); textSize(11);
  ['Patients', 'Providers', 'Prescriptions', 'Diagnoses'].forEach((t, i) => text(t, [colX(0) - 30, colX(1), colX(2), colX(3) + 30][i] || (margin + 60 + i * ((canvasWidth - 160) / 3)), 40));

  // edges
  const pPos = i => ({ x: colX(0), y: rowY(i) }), vPos = i => ({ x: colX(1), y: rowY(i) }), rPos = i => ({ x: colX(2), y: rowY(i) }), dPos = i => ({ x: colX(3), y: rowY(i) });
  stroke('#cdd5dc'); strokeWeight(1.2);
  treated.forEach((e, i) => { if (miss && i === 0) { stroke('#e0b0b0'); drawingContext.setLineDash([4, 4]); } const a = pPos(e[0]), b = vPos(e[1]); line(a.x, a.y, b.x, b.y); drawingContext.setLineDash([]); stroke('#cdd5dc'); });
  hasDx.forEach(e => { const a = pPos(e[0]), b = dPos(e[1]); line(a.x, a.y, b.x, b.y); });
  prescribed.forEach(e => { const a = vPos(e[0]), b = rPos(e[1]); line(a.x, a.y, b.x, b.y); });

  // nodes
  for (let i = 0; i < N; i++) {
    let p = pPos(i); fill('#e07b9a'); stroke('white'); strokeWeight(1.5); circle(p.x, p.y, 30); noStroke(); fill('white'); textAlign(CENTER, CENTER); textSize(9); text('P' + i, p.x, p.y);
    let v = vPos(i); fill('#3b78c3'); stroke('white'); strokeWeight(1.5); rect(v.x - 15, v.y - 13, 30, 26, 4); noStroke(); fill('white'); text('V' + i, v.x, v.y);
    let r = rPos(i); fill(nul && i >= 3 ? '#bbb' : '#2e7d32'); stroke('white'); strokeWeight(1.5);
    beginShape(); for (let k = 0; k < 6; k++) { const a = k * PI / 3; vertex(r.x + cos(a) * 16, r.y + sin(a) * 14); } endShape(CLOSE); noStroke(); fill('white'); text('Rx' + i, r.x, r.y);
    let d = dPos(i); fill(inc && i === 1 ? '#aaa' : '#e8821a'); stroke('white'); strokeWeight(1.5); triangle(d.x, d.y - 15, d.x - 15, d.y + 11, d.x + 15, d.y + 11); noStroke(); fill('white'); textSize(8); text('Dx' + i, d.x, d.y + 2);
  }
  // duplicate patient ghost
  if (dup) { const p = pPos(0); stroke('#c0392b'); strokeWeight(1.5); fill(224, 123, 154, 150); circle(p.x + 22, p.y - 18, 26); noStroke(); fill('#7a1c14'); textAlign(CENTER, CENTER); textSize(8); text("P0'", p.x + 22, p.y - 18); }

  // result panel
  const res = runQuery();
  const ok = res.actual === res.correct;
  const bx = canvasWidth * 0.5, bw = canvasWidth - bx - margin, by = drawHeight + 12;
  fill('#14506b'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD); text('Query result', bx, drawHeight + 44); textStyle(NORMAL);
  fill(ok ? '#1c7a30' : '#c0392b'); textSize(34); textStyle(BOLD); text(res.actual, bx, drawHeight + 64); textStyle(NORMAL);
  fill('#445'); textSize(12); text(res.label, bx + 60, drawHeight + 76);
  fill('#333'); textSize(12.5); text('Correct answer on clean data: ' + res.correct, bx, drawHeight + 108);
  fill(ok ? '#1c7a30' : '#c0392b'); textStyle(BOLD); textSize(13);
  text(ok ? '✓ Query is accurate' : '✗ Wrong by ' + (res.actual - res.correct > 0 ? '+' : '') + (res.actual - res.correct) + ' — data quality corrupted the result', bx, drawHeight + 128, bw); textStyle(NORMAL);

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(13); noStroke();
  text('Introduce data quality issues:', margin, drawHeight - 4 + 0);
  text('Query:', canvasWidth / 2 + 20, drawHeight + 22);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
