// AI / ML / Deep Learning Taxonomy in Healthcare - p5.js
// CANVAS_HEIGHT: 526
// Nested concentric circles showing that deep learning is a subset of machine learning,
// which is a subset of artificial intelligence, each with a healthcare example. Hover a
// ring to read its definition.

let containerWidth, canvasWidth = 760;
let drawHeight = 440;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let defaultTextSize = 16;

const RINGS = [
  { name: 'Artificial Intelligence', short: 'AI', r: 200, color: '#cfe0fb', ty: -178,
    def: 'Systems that simulate human intelligence, reasoning, and decision-making.', ex: 'e.g. clinical decision support, rule-based triage' },
  { name: 'Machine Learning', short: 'ML', r: 138, color: '#8fb8ee', ty: -116,
    def: 'Algorithms that learn patterns from data without being explicitly programmed.', ex: 'e.g. 30-day readmission risk prediction' },
  { name: 'Deep Learning', short: 'DL', r: 78, color: '#2b6cb0', ty: -8,
    def: 'Neural networks with many layers that learn complex representations from raw data.', ex: 'e.g. tumor detection in medical images' }
];
let hoverRing = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Concentric-circle taxonomy: deep learning is nested inside machine learning, which is nested inside artificial intelligence, each labeled with a healthcare example; hovering a ring shows its definition.', LABEL);
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('AI ⊃ ML ⊃ Deep Learning (Healthcare)', canvasWidth / 2, 8);

  const cx = canvasWidth * 0.36, cy = 232;
  const d = dist(mouseX, mouseY, cx, cy);
  hoverRing = -1;
  for (let i = 0; i < RINGS.length; i++) { if (d <= RINGS[i].r) hoverRing = i; } // innermost wins (last)

  RINGS.forEach((ring, i) => {
    stroke(hoverRing === i ? '#111' : 'white'); strokeWeight(hoverRing === i ? 3 : 2);
    fill(ring.color); circle(cx, cy, ring.r * 2);
  });
  // labels (top of each ring band)
  RINGS.forEach((ring, i) => {
    noStroke(); textAlign(CENTER, CENTER);
    fill(i === 2 ? 'white' : '#15334d'); textStyle(BOLD); textSize(i === 0 ? 15 : 13.5);
    text(ring.name, cx, cy + ring.ty); textStyle(NORMAL); textSize(10.5);
    fill(i === 2 ? '#dbe9fb' : '#3a567a'); text(ring.ex, cx - 110, cy + ring.ty + 16, 220);
  });

  // detail panel
  const px = canvasWidth * 0.72, pw = canvasWidth - px - 16, py = 56;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, py, pw, drawHeight - py - 16, 6); noStroke();
  if (hoverRing >= 0) {
    const r = RINGS[hoverRing];
    fill(r.short === 'DL' ? '#2b6cb0' : '#15334d'); textAlign(LEFT, TOP); textStyle(BOLD); textSize(15);
    text(r.name, px + 12, py + 12, pw - 24); textStyle(NORMAL);
    fill('#333'); textSize(12.5); text(r.def, px + 12, py + 44, pw - 24);
    fill('#557'); textSize(11.5); text(r.ex, px + 12, py + 110, pw - 24);
    fill('#778'); textSize(11); text(hoverRing === 0 ? 'Broadest category.' : 'A subset of ' + RINGS[hoverRing - 1].short + '.', px + 12, drawHeight - 40, pw - 24);
  } else {
    fill('#667'); textAlign(LEFT, TOP); textSize(12.5);
    text('Hover any ring to read its definition. Each smaller circle is a strict subset of the one that contains it: every deep-learning method is machine learning, and every machine-learning method is AI.', px + 12, py + 14, pw - 24);
  }
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
