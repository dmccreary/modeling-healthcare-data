// De-identification Techniques Comparison Table - p5.js
// CANVAS_HEIGHT: 526
// Compares six de-identification techniques on the privacy/utility trade-off, with
// rating bars, use cases, reversibility, and an example. Hover a row to highlight it.

let containerWidth, canvasWidth = 980;
let drawHeight = 440;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 14;
let defaultTextSize = 16;

// privacy/utility on 1-3 scale (3 = high)
const ROWS = [
  { tech: 'Identifier Removal', priv: 2, util: 3, use: 'Public datasets, multi-site research', rev: 'No (permanent)', ex: 'Remove name, SSN, MRN' },
  { tech: 'Date Shifting', priv: 2, util: 3, use: 'Longitudinal / time-series', rev: 'If key retained', ex: 'Shift all dates ±30 days' },
  { tech: 'Geographic Generalization', priv: 3, util: 2, use: 'Regional health studies', rev: 'No', ex: 'ZIP 12345 → County' },
  { tech: 'Value Generalization', priv: 3, util: 2, use: 'Aggregate / trend analysis', rev: 'No', ex: '"T2DM w/ complications" → "Diabetes"' },
  { tech: 'Noise Injection', priv: 3, util: 2, use: 'Statistical / population trends', rev: 'No', ex: 'Lab 145 → 147 mg/dL (±5%)' },
  { tech: 'Pseudonymization', priv: 2, util: 3, use: 'Internal research, re-linkable', rev: 'Yes (with key)', ex: 'Patient ID → token via secure map' }
];
const COLS = [
  { t: 'Technique', w: 0.20 }, { t: 'Privacy', w: 0.13 }, { t: 'Data utility', w: 0.13 },
  { t: 'Best for', w: 0.22 }, { t: 'Reversible?', w: 0.13 }, { t: 'Example', w: 0.19 }
];
let hover = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('De-identification techniques comparison table: six techniques rated on privacy protection and data utility with bars, plus best-use cases, reversibility, and an example for each.', LABEL);
}

function ratingBar(x, y, w, val, col) {
  const labels = ['', 'Medium', 'High'][val] || ['Low', 'Medium', 'High'][val - 1];
  for (let i = 0; i < 3; i++) { stroke('#ccc'); fill(i < val ? col : '#eef1f4'); rect(x + i * 18, y, 14, 12, 2); }
  noStroke(); fill('#445'); textAlign(LEFT, CENTER); textSize(10); text(['Low', 'Medium', 'High'][val - 1], x + 58, y + 6);
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('De-identification Techniques: Privacy vs. Utility', canvasWidth / 2, 8);

  const tx = margin, tw = canvasWidth - 2 * margin, top = 44;
  const colX = []; let acc = tx; COLS.forEach(c => { colX.push(acc); acc += c.w * tw; });
  const rowH = (drawHeight - top - 40) / (ROWS.length + 1);

  // header
  noStroke(); fill('#34495e'); rect(tx, top, tw, rowH, 4);
  fill('white'); textAlign(LEFT, CENTER); textStyle(BOLD); textSize(12);
  COLS.forEach((c, i) => text(c.t, colX[i] + 8, top + rowH / 2, c.w * tw - 12)); textStyle(NORMAL);

  hover = -1;
  ROWS.forEach((r, ri) => {
    const y = top + (ri + 1) * rowH;
    if (mouseY > y && mouseY < y + rowH && mouseX > tx && mouseX < tx + tw) hover = ri;
    fill(hover === ri ? '#eef4fb' : (ri % 2 ? '#f7f9fb' : 'white')); stroke('#e2e6ea'); rect(tx, y, tw, rowH);
    noStroke(); fill('#1a2733'); textAlign(LEFT, CENTER); textStyle(BOLD); textSize(11.5);
    text(r.tech, colX[0] + 8, y + rowH / 2, COLS[0].w * tw - 12); textStyle(NORMAL);
    ratingBar(colX[1] + 8, y + rowH / 2 - 6, 0, r.priv, color('#c0392b'));
    ratingBar(colX[2] + 8, y + rowH / 2 - 6, 0, r.util, color('#2e7d32'));
    fill('#444'); textSize(11);
    text(r.use, colX[3] + 8, y + rowH / 2, COLS[3].w * tw - 12);
    text(r.rev, colX[4] + 8, y + rowH / 2, COLS[4].w * tw - 12);
    fill('#555'); textSize(10); text(r.ex, colX[5] + 8, y + rowH / 2, COLS[5].w * tw - 14);
  });

  fill('#15334d'); textAlign(CENTER, TOP); textSize(11.5); textStyle(BOLD);
  text('Stronger privacy (red) usually costs data utility (green) — the central trade-off in de-identification.', canvasWidth / 2, drawHeight - 16);
  textStyle(NORMAL);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
