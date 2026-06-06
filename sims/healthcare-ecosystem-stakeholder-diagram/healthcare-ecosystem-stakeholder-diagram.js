// Healthcare Ecosystem Stakeholder Diagram - p5.js
// CANVAS_HEIGHT: 596
// The three primary healthcare stakeholders — Patient, Provider, Payer — as a central
// triangle of bidirectional relationships, surrounded by satellite entities (pharmacy,
// lab, employer, government) that exchange data with them.

let containerWidth, canvasWidth = 900;
let drawHeight = 510;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

let P; // computed positions

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Healthcare ecosystem stakeholder diagram: a central triangle of Patient, Provider, and Payer with bidirectional labeled relationships, surrounded by satellite entities such as pharmacy, lab, employer, and government.', LABEL);
  noLoop();
}

function biArrow(a, b, ra, rb) {
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const x1 = a.x + Math.cos(ang) * ra, y1 = a.y + Math.sin(ang) * ra;
  const x2 = b.x - Math.cos(ang) * rb, y2 = b.y - Math.sin(ang) * rb;
  stroke('#8aa'); strokeWeight(2.5); line(x1, y1, x2, y2);
  fill('#8aa'); noStroke();
  push(); translate(x2, y2); rotate(ang); triangle(0, 0, -9, -4, -9, 4); pop();
  push(); translate(x1, y1); rotate(ang + PI); triangle(0, 0, -9, -4, -9, 4); pop();
}
function arrowTo(a, b, ra, rb, col) {
  const ang = Math.atan2(b.y - a.y, b.x - a.x);
  const x1 = a.x + Math.cos(ang) * ra, y1 = a.y + Math.sin(ang) * ra;
  const x2 = b.x - Math.cos(ang) * rb, y2 = b.y - Math.sin(ang) * rb;
  stroke(col || '#bbb'); strokeWeight(1.5); line(x1, y1, x2, y2);
  fill(col || '#bbb'); noStroke();
  push(); translate(x2, y2); rotate(ang); triangle(0, 0, -8, -3.5, -8, 3.5); pop();
}
function node(p, r, col, label, sub) {
  stroke('white'); strokeWeight(2); fill(col); circle(p.x, p.y, r * 2);
  noStroke(); fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(sub ? 15 : 12);
  text(label, p.x, p.y - (sub ? 7 : 0)); textStyle(NORMAL);
  if (sub) { textSize(9.5); text(sub, p.x, p.y + 10); }
}
function edgeLabel(a, b, t, dy) {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  noStroke(); fill('white'); rectMode(CENTER); rect(mx, my + (dy || 0), textWidth(t) + 8, 16, 3); rectMode(CORNER);
  fill('#445'); textAlign(CENTER, CENTER); textSize(11); text(t, mx, my + (dy || 0));
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Healthcare Ecosystem: Patient · Provider · Payer', canvasWidth / 2, 8);

  const w = canvasWidth;
  P = {
    patient: { x: w * 0.5, y: 130 }, provider: { x: w * 0.30, y: 350 }, payer: { x: w * 0.70, y: 350 },
    pharmacy: { x: w * 0.5, y: 460 }, lab: { x: w * 0.10, y: 250 },
    employer: { x: w * 0.90, y: 180 }, government: { x: w * 0.86, y: 300 }
  };
  const R = 52, r = 34;

  // satellite edges (behind)
  arrowTo(P.provider, P.pharmacy, R, r, '#2e7d32'); arrowTo(P.payer, P.pharmacy, R, r, '#e8821a');
  arrowTo(P.provider, P.lab, R, r, '#2e7d32');
  arrowTo(P.employer, P.payer, r, R, '#888'); arrowTo(P.government, P.payer, r, R, '#888');

  // primary triangle relationships (bidirectional)
  biArrow(P.patient, P.provider, R, R); edgeLabel(P.patient, P.provider, 'Care · Records', -6);
  biArrow(P.provider, P.payer, R, R); edgeLabel(P.provider, P.payer, 'Claims · Reimbursement', 0);
  biArrow(P.payer, P.patient, R, R); edgeLabel(P.payer, P.patient, 'Coverage · Premiums', -6);

  // satellite nodes
  node(P.pharmacy, r, '#5fa86f', 'Pharmacy');
  node(P.lab, r, '#5fa86f', 'Lab');
  node(P.employer, r, '#e8a05a', 'Employer');
  node(P.government, r, '#8893a0', 'Government');
  // satellite labels
  noStroke(); fill('#555'); textSize(9.5); textAlign(CENTER, TOP);
  text('Prescriptions', (P.provider.x + P.pharmacy.x) / 2 - 10, (P.provider.y + P.pharmacy.y) / 2);
  text('Group coverage', (P.employer.x + P.payer.x) / 2 + 18, (P.employer.y + P.payer.y) / 2 - 6);
  text('Medicare /\nMedicaid', P.payer.x + 0.5 * (P.government.x - P.payer.x), P.payer.y + 0.5 * (P.government.y - P.payer.y) - 22);

  // primary nodes (on top)
  node(P.patient, R, '#3b78c3', 'PATIENT', 'receives care');
  node(P.provider, R, '#2e7d32', 'PROVIDER', 'delivers care');
  node(P.payer, R, '#e8821a', 'PAYER', 'funds care');

  // annotation
  fill('#15334d'); textAlign(CENTER, TOP); textSize(13); textStyle(BOLD);
  text('Data flows in all directions — every relationship generates complex data exchanges.', canvasWidth / 2, drawHeight - 26);
  textStyle(NORMAL);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
