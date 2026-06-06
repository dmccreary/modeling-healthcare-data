// Link Prediction Scoring MicroSim - p5.js
// CANVAS_HEIGHT: 566
// Apply (L3): compute Common Neighbors, Jaccard, and Adamic-Adar scores over a
// provider referral network to rank the most likely missing referral edges. The
// worked-calculation panel shows the neighbor sets and the substituted formula.

let containerWidth, canvasWidth = 900;
let drawHeight = 400;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

// adjacency list (undirected referral network)
const ADJ = {
  P1: ['Card', 'Ortho', 'Endo'],
  P2: ['Card', 'Neuro', 'Endo', 'Derm'],
  P3: ['Ortho', 'Gastro', 'Pulm', 'Endo'],
  Card: ['P1', 'P2', 'Onco'],
  Ortho: ['P1', 'P3', 'Pulm'],
  Neuro: ['P2', 'Onco'],
  Endo: ['P1', 'P2', 'P3'],
  Derm: ['P2'],
  Gastro: ['P3'],
  Pulm: ['P3', 'Ortho'],
  Onco: ['Card', 'Neuro']
};
const NODES = Object.keys(ADJ);
let pos = {}; // node -> {x,y} fraction
let candidates = []; // {a,b,shared,cn,jac,aa}
let selected = 0;
let scoreSelect, topkSlider, rankButton, resetButton;
let rowRects = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  // circular layout
  NODES.forEach((n, i) => {
    const a = -Math.PI / 2 + i * 2 * Math.PI / NODES.length;
    pos[n] = { x: 0.5 + 0.42 * Math.cos(a), y: 0.5 + 0.42 * Math.sin(a) };
  });
  computeCandidates();

  scoreSelect = createSelect();
  ['Common Neighbors', 'Jaccard', 'Adamic-Adar'].forEach(o => scoreSelect.option(o));
  scoreSelect.selected('Adamic-Adar');
  scoreSelect.changed(() => { selected = 0; });
  topkSlider = createSlider(1, 8, 5, 1);
  rankButton = createButton('Rank predictions');
  rankButton.mousePressed(() => redraw());
  resetButton = createButton('Reset');
  resetButton.mousePressed(() => { scoreSelect.selected('Adamic-Adar'); topkSlider.value(5); selected = 0; });
  layoutControls();
  describe('Link prediction scoring on a provider referral network: choose Common Neighbors, Jaccard, or Adamic-Adar to rank candidate referral edges, with a worked calculation for the selected pair.', LABEL);
}

function layoutControls() {
  scoreSelect.position(75, drawHeight + 12);
  topkSlider.position(330, drawHeight + 14); topkSlider.size(120);
  rankButton.position(margin, drawHeight + 50);
  resetButton.position(margin + 150, drawHeight + 50);
}

function inter(a, b) { return ADJ[a].filter(x => ADJ[b].includes(x)); }
function union(a, b) { return Array.from(new Set([...ADJ[a], ...ADJ[b]])); }
function computeCandidates() {
  candidates = [];
  for (let i = 0; i < NODES.length; i++) for (let j = i + 1; j < NODES.length; j++) {
    const a = NODES[i], b = NODES[j];
    if (ADJ[a].includes(b)) continue; // already connected
    const shared = inter(a, b);
    if (shared.length === 0) continue;
    const cn = shared.length;
    const jac = cn / union(a, b).length;
    const aa = shared.reduce((s, z) => s + 1 / Math.log(ADJ[z].length || 2), 0);
    candidates.push({ a, b, shared, cn, jac, aa });
  }
}
function scoreKey() { const v = scoreSelect.value(); return v === 'Jaccard' ? 'jac' : v === 'Adamic-Adar' ? 'aa' : 'cn'; }
function ranked() { const k = scoreKey(); return [...candidates].sort((x, y) => y[k] - x[k]); }

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Link Prediction Scoring', canvasWidth / 2, 8);

  const rk = ranked();
  const topK = topkSlider.value();
  const sel = rk[Math.min(selected, rk.length - 1)];

  // ---- graph (left) ----
  const gx = margin, gy = 44, gw = canvasWidth * 0.56 - margin, gh = drawHeight - gy - 12;
  const X = n => gx + pos[n].x * gw, Y = n => gy + pos[n].y * gh;
  // existing edges
  stroke('#333'); strokeWeight(1.5);
  const drawn = new Set();
  NODES.forEach(a => ADJ[a].forEach(b => { const key = [a, b].sort().join(); if (drawn.has(key)) return; drawn.add(key); line(X(a), Y(a), X(b), Y(b)); }));
  // predicted edge for selected (bold dashed, opacity ~ score)
  if (sel) {
    const k = scoreKey(); const maxv = Math.max(...rk.map(c => c[k]));
    const op = 100 + 155 * (sel[k] / (maxv || 1));
    drawingContext.setLineDash([8, 6]); stroke(46, 125, 50, op); strokeWeight(3.5);
    line(X(sel.a), Y(sel.a), X(sel.b), Y(sel.b)); drawingContext.setLineDash([]);
  }
  // nodes
  NODES.forEach(n => {
    const isShared = sel && sel.shared.includes(n);
    const isPair = sel && (n === sel.a || n === sel.b);
    fill(isShared ? '#2e7d32' : isPair ? '#c0392b' : '#3b78c3');
    stroke('white'); strokeWeight(1.5); circle(X(n), Y(n), 30);
    noStroke(); fill('white'); textAlign(CENTER, CENTER); textSize(10);
    text(n, X(n), Y(n));
  });

  // ---- right: selector + table + calc ----
  const px = canvasWidth * 0.58, pw = canvasWidth - px - margin;
  fill('#14506b'); textAlign(LEFT, TOP); textSize(13);
  text('Top ' + topK + ' predicted referrals (' + scoreSelect.value() + ')', px, 44);
  textSize(11.5); fill('#667'); text('pair', px, 64); text('shared', px + pw * 0.42, 64); text('score', px + pw - 44, 64);
  rowRects = [];
  const k = scoreKey();
  for (let i = 0; i < Math.min(topK, rk.length); i++) {
    const c = rk[i], y = 80 + i * 24, isSel = (c === sel);
    if (isSel) { fill('#e7f0fa'); noStroke(); rect(px - 4, y - 2, pw + 8, 22, 3); }
    fill(isSel ? '#14506b' : '#333'); textAlign(LEFT, TOP); textSize(12.5);
    text(c.a + '–' + c.b, px, y);
    text(c.shared.join(','), px + pw * 0.42, y, pw * 0.4);
    textAlign(RIGHT, TOP); text(c[k].toFixed(2), px + pw, y);
    rowRects.push({ x: px - 4, y: y - 2, w: pw + 8, h: 22, idx: i });
  }
  // worked calculation
  let cy = 80 + Math.min(topK, rk.length) * 24 + 12;
  stroke('#cdd7e0'); line(px, cy, px + pw, cy); noStroke(); cy += 8;
  if (sel) {
    fill('#14506b'); textSize(12.5); textAlign(LEFT, TOP);
    text('Worked calculation: ' + sel.a + '–' + sel.b, px, cy); cy += 18;
    fill('#333'); textSize(11.5);
    text('N(' + sel.a + ') = {' + ADJ[sel.a].join(', ') + '}', px, cy, pw); cy += 16;
    text('N(' + sel.b + ') = {' + ADJ[sel.b].join(', ') + '}', px, cy, pw); cy += 16;
    fill('#2e7d32'); text('shared = {' + sel.shared.join(', ') + '}', px, cy, pw); cy += 18;
    fill('#111');
    const v = scoreSelect.value();
    let formula;
    if (v === 'Common Neighbors') formula = 'CN = |shared| = ' + sel.cn;
    else if (v === 'Jaccard') formula = 'Jaccard = ' + sel.cn + ' / ' + union(sel.a, sel.b).length + ' = ' + sel.jac.toFixed(2);
    else formula = 'AA = ' + sel.shared.map(z => '1/ln(' + ADJ[z].length + ')').join(' + ') + ' = ' + sel.aa.toFixed(2);
    text(formula, px, cy, pw);
  }

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(14);
  text('Score:', margin, drawHeight + 24);
  text('Top-K: ' + topK, 460, drawHeight + 24);
}

function mousePressed() {
  rowRects.forEach(r => { if (mouseX > r.x && mouseX < r.x + r.w && mouseY > r.y && mouseY < r.y + r.h) selected = r.idx; });
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
