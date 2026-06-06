// Node Embedding Explorer MicroSim - p5.js
// CANVAS_HEIGHT: 616
// Understand (L2): step through message-passing rounds and watch a node embedding map
// a patient graph into 2-D space so that structurally similar (same-cohort) nodes pull
// together. Hover links each graph node to its embedding point; click for its vector.

let containerWidth, canvasWidth = 960;
let drawHeight = 410;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

const COHORTS = [
  { name: 'Diabetes', color: '#caa017', c2d: [0.30, 0.32], cvec: [0.9, 0.1, 0.2, 0.1] },
  { name: 'Cardiac', color: '#c0392b', c2d: [0.72, 0.36], cvec: [0.1, 0.9, 0.1, 0.2] },
  { name: 'Healthy', color: '#2e7d32', c2d: [0.50, 0.74], cvec: [0.15, 0.15, 0.9, 0.1] }
];
let nodes = []; // {cohort, gx,gy (graph pos), rnd2d, rndvec, jit2d, jitvec}
let edges = [];
let step = 2; // 0..3 (start mid-separation; Reset returns to 0 = random cloud)
let biasSelect, nextBtn, prevBtn, resetBtn, colorCheck;
let selected = -1, hover = -1;

function rng(seed) { let s = seed; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }

function build() {
  const r = rng(31);
  const counts = [6, 5, 5];
  nodes = [];
  counts.forEach((n, ci) => {
    for (let i = 0; i < n; i++) {
      // graph position: clustered around cohort graph-anchor
      const anchor = [[0.25, 0.30], [0.72, 0.32], [0.5, 0.74]][ci];
      const a = i / n * TWO_PI;
      nodes.push({
        cohort: ci,
        gx: anchor[0] + Math.cos(a) * 0.14, gy: anchor[1] + Math.sin(a) * 0.14,
        rnd2d: [r(), r()], rndvec: [r(), r(), r(), r()],
        jit2d: [(r() - 0.5) * 0.12, (r() - 0.5) * 0.12], jitvec: [(r() - 0.5) * 0.2, (r() - 0.5) * 0.2, (r() - 0.5) * 0.2, (r() - 0.5) * 0.2]
      });
    }
  });
  edges = [];
  for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
    const same = nodes[i].cohort === nodes[j].cohort;
    if (same ? r() < 0.55 : r() < 0.06) edges.push([i, j]);
  }
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  build();
  biasSelect = createSelect(); ['Local (BFS-like)', 'Balanced', 'Global (DFS-like)'].forEach(o => biasSelect.option(o));
  biasSelect.selected('Balanced'); biasSelect.changed(() => { selected = -1; });
  nextBtn = createButton('Next step ▶'); nextBtn.mousePressed(() => step = Math.min(3, step + 1));
  prevBtn = createButton('◀ Previous'); prevBtn.mousePressed(() => step = Math.max(0, step - 1));
  resetBtn = createButton('Reset to random'); resetBtn.mousePressed(() => { step = 0; selected = -1; });
  colorCheck = createCheckbox(' Show cohort colors', true);
  layoutControls();
  describe('Node embedding explorer: a patient graph on the left and a 2-D embedding scatter on the right; stepping through message-passing rounds pulls same-cohort nodes together, and a cohort-separation score rises each step.', LABEL);
}
function layoutControls() {
  prevBtn.position(margin, drawHeight + 12);
  nextBtn.position(margin + 110, drawHeight + 12);
  resetBtn.position(margin + 230, drawHeight + 12);
  biasSelect.position(margin + 90, drawHeight + 52); biasSelect.style('font-size', '13px');
  colorCheck.position(margin, drawHeight + 86); colorCheck.style('font-size', '14px');
}

function biasJitter() { const v = biasSelect.value(); return v.startsWith('Local') ? 0.4 : v.startsWith('Global') ? 1.6 : 1.0; }

function embPos(node) { // 2-D scatter position at current step
  const t = step / 3, js = biasJitter();
  const c = COHORTS[node.cohort].c2d;
  const tx = c[0] + node.jit2d[0] * js, ty = c[1] + node.jit2d[1] * js;
  return [node.rnd2d[0] * (1 - t) + tx * t, node.rnd2d[1] * (1 - t) + ty * t];
}
function embVec(node) {
  const t = step / 3, js = biasJitter();
  const c = COHORTS[node.cohort].cvec;
  return node.rndvec.map((rv, d) => rv * (1 - t) + (c[d] + node.jitvec[d] * js) * t);
}
function cosine(a, b) { let dot = 0, na = 0, nb = 0; for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; } return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1); }

function separation() {
  let intra = 0, ni = 0, inter = 0, no = 0;
  const P = nodes.map(embPos);
  for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
    const d = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]);
    if (nodes[i].cohort === nodes[j].cohort) { intra += d; ni++; } else { inter += d; no++; }
  }
  return (inter / no) / ((intra / ni) || 1);
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(19);
  text('Node Embedding Explorer — message-passing round ' + step + ' of 3', canvasWidth / 2, 8);

  const showCol = colorCheck.checked();
  const colOf = ci => showCol ? COHORTS[ci].color : '#7a8a99';
  // panels
  const gx = margin, gw = canvasWidth * 0.46 - gx, gy = 42, gh = drawHeight - gy - 16;
  const sx = canvasWidth * 0.50, sw = canvasWidth - sx - margin, sy = 42, sh = gh;
  stroke('#e2e6ea'); noFill(); rect(gx, gy, gw, gh); rect(sx, sy, sw, sh);
  noStroke(); fill('#445'); textSize(12); textAlign(LEFT, TOP);
  text('Patient graph', gx + 6, gy + 4); text('Embedding space (2-D)', sx + 6, sy + 4);

  const GX = f => gx + f * gw, GY = f => gy + f * gh, SX = f => sx + f * sw, SY = f => sy + f * sh;

  // graph edges
  stroke('#cbd3da'); strokeWeight(1);
  edges.forEach(([i, j]) => line(GX(nodes[i].gx), GY(nodes[i].gy), GX(nodes[j].gx), GY(nodes[j].gy)));
  // hover detection over graph nodes
  hover = -1;
  nodes.forEach((n, i) => { if (dist(mouseX, mouseY, GX(n.gx), GY(n.gy)) < 11) hover = i; });
  // graph nodes
  nodes.forEach((n, i) => {
    const on = (i === selected || i === hover);
    stroke(on ? '#111' : 'white'); strokeWeight(on ? 2.5 : 1); fill(colOf(n.cohort));
    circle(GX(n.gx), GY(n.gy), on ? 18 : 13);
  });
  // embedding points
  const P = nodes.map(embPos);
  nodes.forEach((n, i) => {
    const on = (i === selected || i === hover);
    stroke(on ? '#111' : 'white'); strokeWeight(on ? 2.5 : 1); fill(colOf(n.cohort));
    circle(SX(P[i][0]), SY(P[i][1]), on ? 18 : 13);
  });
  // detect hover over scatter too
  nodes.forEach((n, i) => { if (dist(mouseX, mouseY, SX(P[i][0]), SY(P[i][1])) < 11) hover = i; });

  // separation score bar
  const sep = separation();
  noStroke(); fill('#14506b'); textSize(12); textAlign(LEFT, BOTTOM);
  text('Cohort separation: ' + sep.toFixed(2) + (step === 0 ? '  (random init — cloud)' : ''), sx + 6, sy + sh - 6);

  // selected node info (control region)
  fill('black'); textAlign(LEFT, TOP); textSize(13);
  if (selected >= 0) {
    const v = embVec(nodes[selected]);
    fill('#14506b'); text('Node ' + selected + ' (' + COHORTS[nodes[selected].cohort].name + ' cohort)', margin + 330, drawHeight + 12);
    fill('#333'); textSize(12);
    text('vector = [' + v.map(x => x.toFixed(2)).join(', ') + ']', margin + 330, drawHeight + 34);
    // nearest by cosine
    const me = embVec(nodes[selected]);
    const nn = nodes.map((n, i) => ({ i, s: cosine(me, embVec(n)) })).filter(o => o.i !== selected).sort((a, b) => b.s - a.s).slice(0, 3);
    text('nearest (cosine): ' + nn.map(o => 'N' + o.i + ' ' + o.s.toFixed(2)).join(',  '), margin + 330, drawHeight + 54);
  } else {
    fill('#667'); textSize(12.5); text('Click a node to see its 4-number vector and its nearest neighbors by cosine similarity.', margin + 330, drawHeight + 34, canvasWidth - margin - (margin + 330));
  }

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(13);
  text('Walk bias:', margin, drawHeight + 62);
}

function mousePressed() {
  if (hover >= 0) selected = hover;
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
