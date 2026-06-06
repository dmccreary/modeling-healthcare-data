// Healthcare Graph Pattern Examples - p5.js
// CANVAS_HEIGHT: 544
// Three common healthcare graph patterns side by side: a patient–diagnosis–prescription
// chain, a provider referral network, and a temporal treatment pathway — illustrating
// node types, relationship names, and property constraints.

let containerWidth, canvasWidth = 960;
let drawHeight = 440;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 18;
let defaultTextSize = 16;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Three healthcare graph pattern examples side by side: patient to diagnosis to prescription, a provider referral chain, and a temporal treatment pathway ending in an outcome, each with labeled nodes and relationship names.', LABEL);
  noLoop();
}

function edge(x1, y1, x2, y2, label, dashed, col) {
  if (dashed) drawingContext.setLineDash([5, 4]);
  stroke(col || '#777'); strokeWeight(2); line(x1, y1, x2, y2);
  const a = Math.atan2(y2 - y1, x2 - x1);
  fill(col || '#777'); noStroke(); push(); translate(x2, y2); rotate(a); triangle(0, 0, -9, -4, -9, 4); pop();
  drawingContext.setLineDash([]);
  if (label) { noStroke(); fill('white'); const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    rectMode(CENTER); rect(mx, my, textWidth(label) + 6, 14, 3); rectMode(CORNER);
    fill('#445'); textAlign(CENTER, CENTER); textSize(9.5); text(label, mx, my); }
}
function shapeNode(x, y, kind, col, label, sub) {
  stroke('white'); strokeWeight(2); fill(col);
  if (kind === 'circle') circle(x, y, 56);
  else if (kind === 'square') rect(x - 28, y - 24, 56, 48, 6);
  else if (kind === 'hex') { beginShape(); for (let i = 0; i < 6; i++) { const a = i * PI / 3 - PI / 6; vertex(x + cos(a) * 30, y + sin(a) * 30); } endShape(CLOSE); }
  else if (kind === 'diamond') quad(x, y - 30, x + 30, y, x, y + 30, x - 30, y);
  noStroke(); fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(10.5); text(label, x - 28, y - (sub ? 6 : 0), 56); textStyle(NORMAL);
  if (sub) { textSize(8.5); text(sub, x - 28, y + 9, 56); }
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Common Healthcare Graph Patterns', canvasWidth / 2, 8);

  const colW = (canvasWidth - 2 * margin) / 3;
  const cx = i => margin + colW * i + colW / 2;
  const titles = ['1. Diagnosis → Treatment', '2. Provider Referral Network', '3. Temporal Treatment Pathway'];
  titles.forEach((t, i) => { fill('#14506b'); textAlign(CENTER, TOP); textStyle(BOLD); textSize(13); text(t, cx(i), 40); textStyle(NORMAL); });
  // column separators
  stroke('#e2e6ea'); strokeWeight(1); for (let i = 1; i < 3; i++) line(margin + colW * i, 64, margin + colW * i, drawHeight - 36);

  // Pattern 1: vertical chain
  let x = cx(0);
  shapeNode(x, 110, 'circle', '#3b78c3', 'Patient');
  edge(x, 138, x, 192, 'HAS_DIAGNOSIS', false, '#c0392b');
  shapeNode(x, 220, 'circle', '#c0392b', 'Diabetes', 'Disease');
  edge(x, 248, x, 302, 'PRESCRIBED', false, '#2e7d32');
  shapeNode(x, 330, 'circle', '#2e7d32', 'Metformin', 'Medication');
  noStroke(); fill('#777'); textSize(9.5); textAlign(CENTER, TOP); text('{ date > 2024-01-01 }', x, 360);

  // Pattern 2: referral chain with reverse dotted
  x = cx(1);
  shapeNode(x, 110, 'square', '#7b3fb3', 'PCP');
  edge(x, 134, x, 196, 'REFERS_TO', false, '#7b3fb3');
  edge(x + 22, 196, x + 22, 134, '', true, '#b8a0d8');
  shapeNode(x, 224, 'square', '#7b3fb3', 'Specialist');
  edge(x, 248, x, 310, 'REFERS_TO', false, '#e8821a');
  edge(x + 22, 310, x + 22, 248, '', true, '#f0c089');
  shapeNode(x, 338, 'square', '#e8821a', 'Laboratory');
  noStroke(); fill('#777'); textSize(9.5); textAlign(CENTER, TOP); text('dotted = reverse referral possible', x, 368);

  // Pattern 3: temporal pathway
  x = cx(2);
  shapeNode(x, 100, 'circle', '#3b78c3', 'Patient');
  edge(x, 124, x, 168, '', false, '#1f8a8a');
  shapeNode(x, 196, 'hex', '#1f8a8a', 'Tx 1');
  edge(x, 226, x, 256, 'NEXT', false, '#1f8a8a');
  shapeNode(x, 286, 'hex', '#1f8a8a', 'Tx 2');
  edge(x, 316, x, 346, 'NEXT', false, '#caa017');
  shapeNode(x, 376, 'diamond', '#caa017', 'Outcome');

  fill('#15334d'); textAlign(CENTER, TOP); textSize(11.5); textStyle(BOLD);
  text('Cypher MATCH clauses describe patterns like these; property constraints (dates, types) filter the matches.', canvasWidth / 2, drawHeight - 18);
  textStyle(NORMAL);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
