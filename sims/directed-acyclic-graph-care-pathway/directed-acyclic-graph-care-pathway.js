// Directed Acyclic Graph: Care Pathway - p5.js
// CANVAS_HEIGHT: 496
// A clinical care pathway drawn as a DAG: eight stages progress forward in time with
// no cycles. One optional dotted edge shows re-testing without ever returning to admission.

let containerWidth, canvasWidth = 900;
let drawHeight = 410;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

const STAGES = ['Patient\nAdmission', 'Initial\nAssessment', 'Diagnostic\nTesting', 'Test Results\nReview',
  'Treatment\nPlanning', 'Treatment\nAdministration', 'Monitoring &\nEvaluation', 'Discharge\nPlanning'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Directed acyclic graph of a clinical care pathway: eight stages from patient admission to discharge connected by forward arrows, with one optional dotted re-testing edge and a note that the pathway never cycles back.', LABEL);
  noLoop();
}

function nodePos(i) {
  // snake layout: row 0 left-to-right (0..3), row 1 right-to-left (4 below 3 .. 7)
  const colW = (canvasWidth - 2 * margin) / 4;
  const row = i < 4 ? 0 : 1;
  const colInRow = i < 4 ? i : (7 - i); // row1 right-to-left
  const x = margin + colW * colInRow + colW / 2;
  const y = row === 0 ? 110 : 300;
  return { x, y };
}

function nodeBox(i) { const p = nodePos(i); return { x: p.x - 78, y: p.y - 30, w: 156, h: 60, cx: p.x, cy: p.y }; }

function arrow(x1, y1, x2, y2, dotted) {
  if (dotted) { drawingContext.setLineDash([6, 5]); stroke('#c0392b'); } else { stroke('#1f4e79'); }
  strokeWeight(2); line(x1, y1, x2, y2);
  const a = Math.atan2(y2 - y1, x2 - x1);
  fill(dotted ? '#c0392b' : '#1f4e79'); noStroke();
  push(); translate(x2, y2); rotate(a); triangle(0, 0, -10, -4, -10, 4); pop();
  drawingContext.setLineDash([]);
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Care Pathway as a Directed Acyclic Graph (DAG)', canvasWidth / 2, 8);

  // forward edges 0->1->...->7
  for (let i = 0; i < 7; i++) {
    const a = nodeBox(i), b = nodeBox(i + 1);
    if (i === 3) { // 3->4 is vertical (down a row)
      arrow(a.cx, a.y + a.h, b.cx, b.y, false);
    } else if (a.y === b.y) { // same row horizontal
      const dir = b.cx > a.cx ? 1 : -1;
      arrow(a.cx + dir * 78, a.cy, b.cx - dir * 78, b.cy, false);
    } else {
      arrow(a.cx, a.y + a.h, b.cx, b.y, false);
    }
  }
  // optional dotted re-test edge: Test Results Review (3) -> Diagnostic Testing (2)
  const r3 = nodeBox(3), r2 = nodeBox(2);
  arrow(r3.cx, r3.y - 2, r2.cx, r2.y - 2, true);
  fill('#c0392b'); noStroke(); textSize(11); textAlign(CENTER, BOTTOM);
  text('re-test if needed', (r3.cx + r2.cx) / 2, r2.y - 8);

  // nodes
  STAGES.forEach((label, i) => {
    const b = nodeBox(i);
    stroke('#3b6ea5'); strokeWeight(2); fill('#dceaf7'); rect(b.x, b.y, b.w, b.h, 8);
    noStroke(); fill('#15334d'); textAlign(CENTER, CENTER); textSize(13);
    text(label, b.cx, b.cy - 4);
    // clock icon (temporal progression)
    fill('#3b6ea5'); textSize(11); text('◴ stage ' + (i + 1), b.cx, b.cy + 18);
  });

  // annotation
  fill('#15334d'); textAlign(CENTER, TOP); textSize(13); textStyle(BOLD);
  text('DAG property: every stage moves forward in time — no cycles back to a previous stage.', canvasWidth / 2, drawHeight - 50);
  textStyle(NORMAL); fill('#555'); textSize(12);
  text('A patient does not cycle back to admission within a single encounter; re-testing loops to diagnostics, not to the start.', canvasWidth / 2, drawHeight - 30);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
