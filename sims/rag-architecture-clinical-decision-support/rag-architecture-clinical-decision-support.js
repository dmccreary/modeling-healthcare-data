// RAG Architecture for Clinical Decision Support - p5.js
// CANVAS_HEIGHT: 544
// The retrieval-augmented generation (RAG) pipeline from a clinician's query to an
// evidence-cited answer: embed the query, search a vector store, assemble context, then
// let an LLM generate a sourced response, with a feedback loop back to the store.

let containerWidth, canvasWidth = 980;
let drawHeight = 440;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 18;
let defaultTextSize = 16;

const STEPS = [
  { n: 1, t: 'Clinician Query', d: '"Evidence-based options for resistant hypertension?"', phase: 'in' },
  { n: 2, t: 'Query Embedding', d: 'text → vector', phase: 'retrieval' },
  { n: 3, t: 'Vector Store', d: 'guidelines, papers, patient history, protocols', phase: 'retrieval' },
  { n: 4, t: 'Similarity Search', d: 'retrieve top-K by score', phase: 'retrieval' },
  { n: 5, t: 'Context Assembly', d: 'combine retrieved snippets', phase: 'retrieval' },
  { n: 6, t: 'LLM Processing', d: 'query + context → draft', phase: 'generation' },
  { n: 7, t: 'Response + Citations', d: 'recommendation with numbered sources', phase: 'generation' },
  { n: 8, t: 'Clinician Feedback', d: 'improves future retrievals', phase: 'out' }
];
const PHASE_COL = { in: '#2e7d8a', retrieval: '#3b78c3', generation: '#2e7d32', out: '#7b3fb3' };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Retrieval-augmented generation architecture for clinical decision support: an eight-stage pipeline from clinician query through embedding, vector search, context assembly, LLM generation, and a cited response, with a feedback loop to the vector store.', LABEL);
  noLoop();
}

function stepBox(x, y, w, h, col, n, title, desc) {
  stroke(col); strokeWeight(2); fill(lerpColor(color(col), color('white'), 0.9)); rect(x, y, w, h, 8);
  noStroke(); fill(col); circle(x + 16, y + 16, 22); fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(12); text(n, x + 16, y + 16);
  fill('#15334d'); textAlign(LEFT, TOP); textStyle(BOLD); textSize(12.5); text(title, x + 32, y + 8, w - 38); textStyle(NORMAL);
  fill('#555'); textSize(10.5); text(desc, x + 10, y + 32, w - 20);
}
function arrowH(x1, y, x2) { stroke('#888'); strokeWeight(2); line(x1, y, x2, y); fill('#888'); noStroke(); triangle(x2, y, x2 - 8, y - 4, x2 - 8, y + 4); }

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('RAG Architecture for Clinical Decision Support', canvasWidth / 2, 8);

  const cols = 4, gap = 14, bw = (canvasWidth - 2 * margin - (cols - 1) * gap) / cols, bh = 70;
  const rowY = [78, 250];
  // phase backdrops
  noStroke(); fill(59, 120, 195, 18); rect(margin - 4, rowY[0] - 22, canvasWidth - 2 * margin + 8, bh + 30, 8);
  fill('#3b78c3'); textAlign(LEFT, TOP); textSize(11); textStyle(BOLD); text('RETRIEVAL  (steps 2–5)', margin + 4, rowY[0] - 20); textStyle(NORMAL);
  fill(46, 125, 50, 16); rect(margin - 4 + bw + gap, rowY[1] - 22, (bw + gap) * 2 + bw - gap + 8 - bw, bh + 30, 8);

  // positions: row 0 = steps 1-4 L→R; row 1 = steps 8,7,6,5 R→L (snake)
  const xAt = c => margin + c * (bw + gap);
  const placed = [];
  for (let i = 0; i < 4; i++) placed.push({ s: STEPS[i], x: xAt(i), y: rowY[0] });
  const bottomOrder = [STEPS[4], STEPS[5], STEPS[6], STEPS[7]]; // 5,6,7,8 placed R→L
  for (let i = 0; i < 4; i++) placed.push({ s: bottomOrder[i], x: xAt(3 - i), y: rowY[1] });

  // generation backdrop (steps 6,7 are at bottom cols 2,1)
  fill(46, 125, 50, 16); rect(xAt(1) - 4, rowY[1] - 22, (bw + gap) * 2 - gap + 8, bh + 30, 8);
  fill('#2e7d32'); textSize(11); textStyle(BOLD); text('GENERATION  (steps 6–7)', xAt(1), rowY[1] - 20); textStyle(NORMAL);

  // arrows: 1→2→3→4 (top), 4→5 (down), 5→6→7→8 (bottom R→L)
  for (let i = 0; i < 3; i++) arrowH(xAt(i) + bw, rowY[0] + bh / 2, xAt(i + 1));
  // 4 down to 5 (col3 top → col3 bottom)
  stroke('#888'); strokeWeight(2); line(xAt(3) + bw / 2, rowY[0] + bh, xAt(3) + bw / 2, rowY[1]); fill('#888'); noStroke(); triangle(xAt(3) + bw / 2, rowY[1], xAt(3) + bw / 2 - 4, rowY[1] - 8, xAt(3) + bw / 2 + 4, rowY[1] - 8);
  for (let i = 3; i > 0; i--) { stroke('#888'); strokeWeight(2); line(xAt(i), rowY[1] + bh / 2, xAt(i - 1) + bw, rowY[1] + bh / 2); fill('#888'); noStroke(); triangle(xAt(i - 1) + bw, rowY[1] + bh / 2, xAt(i - 1) + bw + 8, rowY[1] + bh / 2 - 4, xAt(i - 1) + bw + 8, rowY[1] + bh / 2 + 4); }
  // feedback dotted from step 8 (bottom col0) up to vector store step 3 (top col2)
  stroke('#7b3fb3'); strokeWeight(1.5); drawingContext.setLineDash([5, 4]);
  line(xAt(0) + bw / 2, rowY[1], xAt(0) + bw / 2, rowY[1] - 26); line(xAt(0) + bw / 2, rowY[1] - 26, xAt(2) + bw / 2, rowY[1] - 26); line(xAt(2) + bw / 2, rowY[1] - 26, xAt(2) + bw / 2, rowY[0] + bh);
  drawingContext.setLineDash([]); fill('#7b3fb3'); noStroke(); triangle(xAt(2) + bw / 2, rowY[0] + bh, xAt(2) + bw / 2 - 4, rowY[0] + bh + 8, xAt(2) + bw / 2 + 4, rowY[0] + bh + 8);
  fill('#7b3fb3'); textSize(10); textAlign(CENTER, BOTTOM); text('feedback loop', (xAt(0) + xAt(2)) / 2 + bw / 2, rowY[1] - 28);

  // boxes
  placed.forEach(p => stepBox(p.x, p.y, bw, bh, PHASE_COL[p.s.phase], p.s.n, p.s.t, p.s.d));

  fill('#15334d'); textAlign(CENTER, TOP); textSize(11.5); textStyle(BOLD);
  text('Grounding the LLM in retrieved sources yields evidence-cited recommendations instead of unsourced text.', canvasWidth / 2, drawHeight - 18);
  textStyle(NORMAL);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
