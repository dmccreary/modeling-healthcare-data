// Graph Traversal Visualization MicroSim - p5.js
// CANVAS_HEIGHT: 636
// Animate DFS, BFS, and shortest-path traversal over a small healthcare graph. Nodes
// light up as the algorithm visits them; shortest path highlights the route in orange.

let containerWidth, canvasWidth = 1000;
let drawHeight = 410;
let controlHeight = 170;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

const NODES = [
  { id: 0, label: 'Patient Alex', shape: 'circle', color: '#3b78c3', x: 0.45, y: 0.50 },
  { id: 1, label: 'Dr. Smith', shape: 'square', color: '#2e7d32', x: 0.22, y: 0.24 },
  { id: 2, label: 'Dr. Lee', shape: 'square', color: '#2e7d32', x: 0.70, y: 0.22 },
  { id: 3, label: 'Dr. Patel', shape: 'square', color: '#2e7d32', x: 0.78, y: 0.74 },
  { id: 4, label: 'Med A', shape: 'round', color: '#e8821a', x: 0.20, y: 0.55 },
  { id: 5, label: 'Med B', shape: 'round', color: '#e8821a', x: 0.85, y: 0.42 },
  { id: 6, label: 'Med C', shape: 'round', color: '#e8821a', x: 0.62, y: 0.06 },
  { id: 7, label: 'Condition X', shape: 'hex', color: '#c0392b', x: 0.10, y: 0.80 },
  { id: 8, label: 'Condition Y', shape: 'hex', color: '#c0392b', x: 0.95, y: 0.20 },
  { id: 9, label: 'Hospital A', shape: 'diamond', color: '#7b3fb3', x: 0.10, y: 0.10 },
  { id: 10, label: 'Clinic B', shape: 'diamond', color: '#7b3fb3', x: 0.60, y: 0.92 },
  { id: 11, label: 'Procedure Z', shape: 'rect', color: '#caa017', x: 0.45, y: 0.88 }
];
const EDGES = [[0, 1], [0, 7], [0, 4], [1, 4], [1, 9], [4, 7], [0, 2], [2, 5], [5, 8], [0, 11], [3, 11], [3, 10], [2, 6]];
let ADJ = {};

let startSelect, algoSelect, targetSelect, speedSlider, startBtn, pauseBtn, resetBtn;
let order = [], pathSet = new Set(), stepIdx = -1, running = false, lastT = 0, finished = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  NODES.forEach(n => ADJ[n.id] = []);
  EDGES.forEach(([a, b]) => { ADJ[a].push(b); ADJ[b].push(a); });

  startSelect = createSelect(); NODES.forEach(n => startSelect.option(n.label, n.id)); startSelect.selected('Patient Alex'); startSelect.changed(reset);
  algoSelect = createSelect(); ['Depth-First (DFS)', 'Breadth-First (BFS)', 'Shortest Path'].forEach(o => algoSelect.option(o)); algoSelect.changed(reset);
  targetSelect = createSelect(); NODES.forEach(n => targetSelect.option(n.label, n.id)); targetSelect.selected('Condition Y'); targetSelect.changed(reset);
  speedSlider = createSlider(100, 1500, 500, 50);
  startBtn = createButton('Start'); startBtn.mousePressed(() => { if (finished) reset(); running = true; lastT = millis(); });
  pauseBtn = createButton('Pause'); pauseBtn.mousePressed(() => running = false);
  resetBtn = createButton('Reset'); resetBtn.mousePressed(reset);
  layoutControls();
  reset();
  stepIdx = Math.floor(order.length * 0.5); // illustrative paused default
  describe('Graph traversal visualization over a small healthcare graph: choose DFS, BFS, or shortest path and animate the algorithm visiting nodes step by step, with the discovered order and (for shortest path) the highlighted route.', LABEL);
}
function layoutControls() {
  startSelect.position(70, drawHeight + 12);
  algoSelect.position(260, drawHeight + 12);
  targetSelect.position(490, drawHeight + 12);
  speedSlider.position(90, drawHeight + 46); speedSlider.size(180);
  startBtn.position(margin, drawHeight + 78); pauseBtn.position(margin + 70, drawHeight + 78); resetBtn.position(margin + 150, drawHeight + 78);
}

function computeOrder() {
  const s = +startSelect.value(), algo = algoSelect.value();
  if (algo.startsWith('Shortest')) {
    const t = +targetSelect.value();
    const prev = {}, q = [s], seen = new Set([s]);
    while (q.length) { const u = q.shift(); if (u === t) break; for (const v of ADJ[u]) if (!seen.has(v)) { seen.add(v); prev[v] = u; q.push(v); } }
    const path = []; let cur = t; while (cur !== undefined) { path.unshift(cur); if (cur === s) break; cur = prev[cur]; }
    if (path[0] !== s) return { order: [], path: [] };
    return { order: path, path };
  }
  const ord = [], seen = new Set();
  if (algo.startsWith('Breadth')) { const q = [s]; seen.add(s); while (q.length) { const u = q.shift(); ord.push(u); for (const v of ADJ[u]) if (!seen.has(v)) { seen.add(v); q.push(v); } } }
  else { const st = [s]; while (st.length) { const u = st.pop(); if (seen.has(u)) continue; seen.add(u); ord.push(u); for (const v of [...ADJ[u]].reverse()) if (!seen.has(v)) st.push(v); } }
  return { order: ord, path: [] };
}
function reset() {
  const r = computeOrder(); order = r.order; pathSet = new Set(r.path);
  stepIdx = -1; running = false; finished = false;
  const isPath = algoSelect.value().startsWith('Shortest');
  targetSelect.style('display', isPath ? 'inline' : 'none');
}

function nodeXY(n) { return { x: margin + 90 + n.x * (canvasWidth * 0.62 - 110), y: 54 + n.y * (drawHeight - 90) }; }

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(19);
  text('Graph Traversal: ' + algoSelect.value(), canvasWidth / 2, 8);

  // advance animation
  if (running && stepIdx < order.length - 1) { if (millis() - lastT > speedSlider.value()) { stepIdx++; lastT = millis(); } }
  else if (running) { running = false; finished = true; }
  const isPath = algoSelect.value().startsWith('Shortest');

  // edges
  EDGES.forEach(([a, b]) => {
    const pa = nodeXY(NODES[a]), pb = nodeXY(NODES[b]);
    const onPath = isPath && finished && pathSet.has(a) && pathSet.has(b) && Math.abs(order.indexOf(a) - order.indexOf(b)) === 1;
    stroke(onPath ? '#e8821a' : '#cdd5dc'); strokeWeight(onPath ? 4 : 1.5); line(pa.x, pa.y, pb.x, pb.y);
  });
  // nodes
  NODES.forEach(n => {
    const p = nodeXY(n); const oi = order.indexOf(n.id);
    let state = 'un';
    if (isPath) { if (finished && pathSet.has(n.id)) state = 'path'; else if (oi >= 0 && oi <= stepIdx) state = 'visited'; }
    else { if (oi === stepIdx) state = 'current'; else if (oi >= 0 && oi < stepIdx) state = 'visited'; else if (oi >= 0 && oi <= stepIdx) state = 'current'; }
    let fc = lerpColor(color(n.color), color('white'), 0.72), sc = color(n.color), sw = 1.5;
    if (state === 'current') { fc = '#ffe24a'; sc = '#c9a400'; sw = 3; }
    else if (state === 'visited') { fc = '#cdeccd'; sc = '#2e7d32'; sw = 2; }
    else if (state === 'path') { fc = '#ffd9a8'; sc = '#e8821a'; sw = 3; }
    stroke(sc); strokeWeight(sw); fill(fc);
    if (n.shape === 'square') rect(p.x - 26, p.y - 18, 52, 36, 4);
    else if (n.shape === 'round') rect(p.x - 28, p.y - 16, 56, 32, 14);
    else if (n.shape === 'hex') { beginShape(); for (let i = 0; i < 6; i++) { const a = i * PI / 3; vertex(p.x + cos(a) * 26, p.y + sin(a) * 22); } endShape(CLOSE); }
    else if (n.shape === 'diamond') quad(p.x, p.y - 22, p.x + 28, p.y, p.x, p.y + 22, p.x - 28, p.y);
    else if (n.shape === 'rect') rect(p.x - 32, p.y - 16, 64, 32, 3);
    else circle(p.x, p.y, 48);
    noStroke(); fill('#1a2733'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(9.5); text(n.label, p.x - 34, p.y, 68); textStyle(NORMAL);
  });

  // info panel
  const px = canvasWidth * 0.66, pw = canvasWidth - px - margin;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, 44, pw, drawHeight - 60, 6); noStroke();
  fill('#14506b'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD); text('Traversal info', px + 12, 54); textStyle(NORMAL);
  fill('#333'); textSize(12);
  text('Step: ' + Math.max(0, stepIdx + 1) + ' / ' + order.length, px + 12, 78);
  const cur = stepIdx >= 0 ? NODES[order[stepIdx]].label : '—';
  text('Current: ' + cur, px + 12, 98);
  if (isPath && finished) { fill('#e8821a'); textStyle(BOLD); text('Path length: ' + (order.length - 1) + ' hops', px + 12, 120); textStyle(NORMAL); }
  fill('#445'); textSize(11.5); text('Order so far:', px + 12, 148);
  fill('#333'); textSize(11);
  const visited = order.slice(0, stepIdx + 1).map(id => NODES[id].label).join(' → ');
  text(visited || '(press Start)', px + 12, 166, pw - 24);

  // control labels + legend
  fill('black'); textAlign(LEFT, CENTER); textSize(13); noStroke();
  text('Start:', margin, drawHeight + 24); text('Algorithm:', margin + 190, drawHeight + 24);
  if (isPath) text('Target:', margin + 430, drawHeight + 24);
  text('Speed: ' + speedSlider.value() + 'ms', margin, drawHeight + 56);
  textSize(11); let lx = margin + 240, ly = drawHeight + 90;
  [['current', '#ffe24a'], ['visited', '#cdeccd'], ['shortest path', '#ffd9a8']].forEach(([t, c]) => { fill(c); stroke('#999'); rect(lx, ly - 7, 14, 14, 2); noStroke(); fill('#445'); text(t, lx + 18, ly); lx += t.length * 6.6 + 36; });
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
