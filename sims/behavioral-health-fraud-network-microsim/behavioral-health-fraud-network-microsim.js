// Behavioral Health Fraud Network MicroSim - p5.js
// CANVAS_HEIGHT: 644
// A patient-recruitment fraud ring in behavioral health: recruiters (body brokers) refer
// out-of-state patients to facilities that pay kickbacks and over-order lab tests. Click
// a node to highlight its relationships and read the network fraud indicators.

let containerWidth, canvasWidth = 1000;
let drawHeight = 470;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

// node: id, type, x, y (fractions)
const NODES = [
  { id: 'PHP Center A', t: 'facility', x: 0.30, y: 0.30 },
  { id: 'IOP Clinic B', t: 'facility', x: 0.30, y: 0.66 },
  { id: 'Sober Home 1', t: 'home', x: 0.10, y: 0.48 },
  { id: 'UDS Lab X', t: 'lab', x: 0.52, y: 0.18 },
  { id: 'UDS Lab Y', t: 'lab', x: 0.52, y: 0.80 },
  { id: 'Broker Joe', t: 'recruiter', x: 0.62, y: 0.40 },
  { id: 'Broker Mia', t: 'recruiter', x: 0.62, y: 0.62 },
  { id: 'Insurer (OON)', t: 'insurer', x: 0.86, y: 0.50 }
];
// patient cluster drawn separately near recruiters
const EDGES = [
  ['Broker Joe', 'PHP Center A', 'referral'], ['Broker Mia', 'PHP Center A', 'referral'], ['Broker Mia', 'IOP Clinic B', 'referral'],
  ['PHP Center A', 'Sober Home 1', 'house'], ['IOP Clinic B', 'Sober Home 1', 'house'],
  ['PHP Center A', 'UDS Lab X', 'lab'], ['IOP Clinic B', 'UDS Lab Y', 'lab'],
  ['PHP Center A', 'Broker Joe', 'financial'], ['PHP Center A', 'Broker Mia', 'financial'], ['IOP Clinic B', 'Broker Mia', 'financial'],
  ['UDS Lab X', 'PHP Center A', 'financial'],
  ['PHP Center A', 'Insurer (OON)', 'bills'], ['IOP Clinic B', 'Insurer (OON)', 'bills']
];
const TYPECOL = { facility: '#3b78c3', home: '#7b3fb3', lab: '#caa017', recruiter: '#e8821a', insurer: '#c0392b', patient: '#2e7d32' };
const EDGECOL = { referral: '#e8821a', house: '#7b3fb3', lab: '#caa017', financial: '#c0392b', bills: '#888' };
let selected = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Behavioral health fraud network: recruiters refer out-of-state patients to treatment facilities that pay kickbacks (red financial edges) and over-order urine drug screens from labs, billing an out-of-network insurer; clicking a node highlights its relationships.', LABEL);
}

function P(n) { return { x: margin + 40 + n.x * (canvasWidth - margin - 120), y: 60 + n.y * (drawHeight - 110) }; }
function nodeByName(name) { return NODES.find(n => n.id === name); }

function connected(name) {
  if (selected < 0) return true;
  const sel = NODES[selected].id;
  return name === sel || EDGES.some(e => (e[0] === sel && e[1] === name) || (e[1] === sel && e[0] === name));
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(19);
  text('Behavioral Health Patient-Recruitment Fraud Ring', canvasWidth / 2, 8);

  // patient cluster near brokers
  const broker = P(nodeByName('Broker Joe'));
  for (let i = 0; i < 16; i++) { const a = i / 16 * TWO_PI, px = broker.x + 70 + Math.cos(a) * 34, py = (P(nodeByName('Broker Joe')).y + P(nodeByName('Broker Mia')).y) / 2 + Math.sin(a) * 50;
    noStroke(); fill(46, 125, 50, selected < 0 ? 180 : 80); circle(px, py, 8); }
  noStroke(); fill('#2e7d32'); textSize(9); textAlign(CENTER, TOP); text('45 out-of-state patients', broker.x + 70, (P(nodeByName('Broker Joe')).y + P(nodeByName('Broker Mia')).y) / 2 + 56);

  // edges
  EDGES.forEach(e => {
    const a = P(nodeByName(e[0])), b = P(nodeByName(e[1]));
    const act = connected(e[0]) && connected(e[1]) && (selected < 0 || NODES[selected].id === e[0] || NODES[selected].id === e[1]);
    const c = color(EDGECOL[e[2]]); c.setAlpha(act ? 230 : 40);
    stroke(c); strokeWeight(e[2] === 'financial' ? (act ? 3.5 : 1.5) : 2);
    if (e[2] === 'financial' || e[2] === 'house') drawingContext.setLineDash([6, 4]);
    const ang = Math.atan2(b.y - a.y, b.x - a.x), bx = b.x - Math.cos(ang) * 24, by = b.y - Math.sin(ang) * 24;
    line(a.x, a.y, bx, by); drawingContext.setLineDash([]);
    if (act) { fill(c); noStroke(); push(); translate(bx, by); rotate(ang); triangle(0, 0, -8, -3.5, -8, 3.5); pop(); }
  });
  // nodes
  NODES.forEach((n, i) => {
    const p = P(n), on = selected === i, dim = !connected(n.id);
    const c = color(TYPECOL[n.t]); if (dim) c.setAlpha(70);
    stroke(on ? '#111' : 'white'); strokeWeight(on ? 3 : 1.5); fill(c);
    const r = 22;
    if (n.t === 'facility' || n.t === 'patient') circle(p.x, p.y, r * 2);
    else if (n.t === 'home') rect(p.x - r, p.y - r + 4, r * 2, r * 2 - 8, 4);
    else if (n.t === 'lab') quad(p.x, p.y - r, p.x + r, p.y, p.x, p.y + r, p.x - r, p.y);
    else if (n.t === 'recruiter') triangle(p.x, p.y - r, p.x - r, p.y + r * 0.8, p.x + r, p.y + r * 0.8);
    else { beginShape(); for (let k = 0; k < 5; k++) { const a = -PI / 2 + k * TWO_PI / 5; vertex(p.x + cos(a) * r, p.y + sin(a) * r); } endShape(CLOSE); }
    noStroke(); fill(dim ? '#999' : '#1a2733'); textAlign(CENTER, TOP); textSize(9.5); text(n.id, p.x - 50, p.y + r + 2, 100);
  });

  // legend
  let lx = margin, ly = drawHeight - 16; textAlign(LEFT, CENTER); textSize(10.5);
  [['referral', 'referral'], ['housing', 'house'], ['lab orders', 'lab'], ['financial (kickback)', 'financial']].forEach(([t, k]) => { stroke(EDGECOL[k]); strokeWeight(2.5); line(lx, ly, lx + 18, ly); noStroke(); fill('#445'); text(t, lx + 22, ly); lx += t.length * 6 + 40; });

  // investigation panel (control region)
  fill('#14506b'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD); text('Investigation', margin, drawHeight + 10); textStyle(NORMAL);
  fill('#333'); textSize(11.5);
  if (selected >= 0) { const n = NODES[selected]; const deg = EDGES.filter(e => e[0] === n.id || e[1] === n.id).length;
    text(n.id + ' (' + n.t + ') — ' + deg + ' relationships. ' + (n.t === 'facility' ? 'Pays recruiters and over-orders UDS labs; bills an out-of-network insurer.' : n.t === 'recruiter' ? 'Refers patients for a per-head fee — the core of the kickback scheme.' : 'Part of the ring.'), margin, drawHeight + 30, canvasWidth - 2 * margin); }
  else { fill('#7a1c14'); textStyle(BOLD); text('Fraud indicators: 89% referral reciprocity (norm ~12%) · shared sober home · 2 closed financial loops · 45 patients with out-of-state OON insurance.', margin, drawHeight + 30, canvasWidth - 2 * margin); textStyle(NORMAL);
    fill('#667'); text('Click any node to inspect its relationships.', margin, drawHeight + 64); }
}

function mousePressed() { let hit = -1; NODES.forEach((n, i) => { const p = P(n); if (dist(mouseX, mouseY, p.x, p.y) < 26) hit = i; }); selected = (hit === selected) ? -1 : hit; }
function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
