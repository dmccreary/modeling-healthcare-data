// Care Pathway Shortest Path MicroSim - p5.js
// CANVAS_HEIGHT: 596
// Dijkstra's algorithm finds the optimal care pathway through a diagnostic network.
// Choose what to minimize — time, cost, or number of steps — and run the algorithm to
// highlight the shortest route from "Patient with Headache" to "Treatment Plan".

let containerWidth, canvasWidth = 1000;
let drawHeight = 420;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

const NODES = [
  { id: 'Patient', label: 'Patient\n(Headache)', x: 0.06, y: 0.5, color: '#2e7d32' },
  { id: 'PCP', label: 'PCP Visit', x: 0.20, y: 0.5, color: '#3b78c3' },
  { id: 'Neuro', label: 'Neurology', x: 0.40, y: 0.26, color: '#3b78c3' },
  { id: 'Blood', label: 'Blood Work', x: 0.34, y: 0.55, color: '#caa017' },
  { id: 'CT', label: 'CT Scan', x: 0.34, y: 0.84, color: '#7b3fb3' },
  { id: 'MRI', label: 'MRI', x: 0.58, y: 0.18, color: '#7b3fb3' },
  { id: 'Spec1', label: 'Specialist 1', x: 0.58, y: 0.44, color: '#e8821a' },
  { id: 'Spec2', label: 'Specialist 2', x: 0.55, y: 0.82, color: '#e8821a' },
  { id: 'Dx', label: 'Diagnosis', x: 0.78, y: 0.45, color: '#c0392b' },
  { id: 'Tx', label: 'Treatment\nPlan', x: 0.93, y: 0.45, color: '#2e7d32' }
];
// edges: from, to, days, cost
const EDGES = [
  ['Patient', 'PCP', 1, 150], ['PCP', 'Neuro', 7, 250], ['PCP', 'Blood', 2, 100], ['PCP', 'CT', 3, 1200],
  ['Neuro', 'MRI', 14, 2400], ['Neuro', 'Spec1', 5, 350], ['MRI', 'Dx', 3, 0], ['CT', 'Spec2', 4, 350],
  ['Blood', 'Neuro', 1, 0], ['Spec1', 'Dx', 2, 0], ['Spec2', 'MRI', 7, 2400], ['Dx', 'Tx', 1, 0]
];
let scenarioSelect, runBtn, resetBtn;
let path = [], totalDays = 0, totalCost = 0, ran = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  scenarioSelect = createSelect(); ['Minimize time (days)', 'Minimize cost ($)', 'Minimize steps'].forEach(o => scenarioSelect.option(o)); scenarioSelect.changed(() => ran = false);
  runBtn = createButton('Run Dijkstra'); runBtn.mousePressed(run);
  resetBtn = createButton('Reset'); resetBtn.mousePressed(() => { ran = false; path = []; });
  layoutControls();
  run();
  describe('Care pathway shortest path: Dijkstra over a diagnostic network from a headache patient to a treatment plan, minimizing time, cost, or steps, with the optimal route highlighted.', LABEL);
}
function layoutControls() { scenarioSelect.position(140, drawHeight + 14); runBtn.position(margin, drawHeight + 48); resetBtn.position(margin + 120, drawHeight + 48); }

function weightOf(e) { const s = scenarioSelect.value(); return s.startsWith('Minimize cost') ? e[3] : s.startsWith('Minimize steps') ? 1 : e[2]; }
function P(n) { return { x: margin + 40 + n.x * (canvasWidth - margin - 120), y: 60 + n.y * (drawHeight - 110) }; }

function run() {
  const dist = {}, prev = {}; NODES.forEach(n => dist[n.id] = Infinity); dist['Patient'] = 0;
  const Q = new Set(NODES.map(n => n.id));
  while (Q.size) {
    let u = null, best = Infinity; Q.forEach(n => { if (dist[n] < best) { best = dist[n]; u = n; } });
    if (u === null) break; Q.delete(u); if (u === 'Tx') break;
    EDGES.filter(e => e[0] === u).forEach(e => { const alt = dist[u] + weightOf(e); if (alt < dist[e[1]]) { dist[e[1]] = alt; prev[e[1]] = u; } });
  }
  path = []; let cur = 'Tx'; while (cur) { path.unshift(cur); if (cur === 'Patient') break; cur = prev[cur]; }
  // tally
  totalDays = 0; totalCost = 0;
  for (let i = 0; i < path.length - 1; i++) { const e = EDGES.find(x => x[0] === path[i] && x[1] === path[i + 1]); if (e) { totalDays += e[2]; totalCost += e[3]; } }
  ran = true;
}

function onPath(a, b) { for (let i = 0; i < path.length - 1; i++) if (path[i] === a && path[i + 1] === b) return true; return false; }

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Care Pathway — Dijkstra Shortest Path', canvasWidth / 2, 8);

  const byId = id => NODES.find(n => n.id === id);
  // edges
  EDGES.forEach(e => {
    const a = P(byId(e[0])), b = P(byId(e[1])), hot = ran && onPath(e[0], e[1]);
    stroke(hot ? '#1c7a30' : '#ccd5dc'); strokeWeight(hot ? 4 : 1.5);
    const ang = Math.atan2(b.y - a.y, b.x - a.x), bx = b.x - Math.cos(ang) * 26, by = b.y - Math.sin(ang) * 26;
    line(a.x, a.y, bx, by); fill(hot ? '#1c7a30' : '#aab'); noStroke(); push(); translate(bx, by); rotate(ang); triangle(0, 0, -8, -3.5, -8, 3.5); pop();
    // weight label
    const s = scenarioSelect.value(); const w = s.startsWith('Minimize cost') ? '$' + e[3] : s.startsWith('Minimize steps') ? '1' : e[2] + 'd';
    noStroke(); fill('white'); const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2; rectMode(CENTER); rect(mx, my, textWidth(w) + 6, 13, 3); rectMode(CORNER);
    fill(hot ? '#1c7a30' : '#778'); textAlign(CENTER, CENTER); textSize(9.5); text(w, mx, my);
  });
  // nodes
  NODES.forEach(n => { const p = P(n), onp = ran && path.includes(n.id);
    stroke(onp ? '#1c7a30' : 'white'); strokeWeight(onp ? 3 : 1.5); fill(onp ? lerpColor(color(n.color), color('white'), 0.2) : lerpColor(color(n.color), color('white'), 0.65));
    circle(p.x, p.y, 50);
    noStroke(); fill(onp ? 'white' : '#1a2733'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(9); text(n.label, p.x - 28, p.y, 56); textStyle(NORMAL); });

  // result panel (control region)
  fill('#14506b'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD); text(ran ? 'Optimal pathway' : 'Choose a goal and run Dijkstra', canvasWidth * 0.45, drawHeight + 12); textStyle(NORMAL);
  if (ran) {
    fill('#1c7a30'); textSize(12); text(path.map(id => byId(id).label.replace('\n', ' ')).join(' → '), canvasWidth * 0.45, drawHeight + 34, canvasWidth * 0.55 - margin);
    fill('#333'); textSize(13); textStyle(BOLD);
    text('Total time: ' + totalDays + ' days     Total cost: $' + totalCost.toLocaleString() + '     Steps: ' + (path.length - 1), canvasWidth * 0.45, drawHeight + 78); textStyle(NORMAL);
  }
  fill('black'); textAlign(LEFT, CENTER); textSize(13); noStroke();
  text('Optimize for:', margin, drawHeight + 24);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
