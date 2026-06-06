// Yin-Yang: LLM vs Knowledge Graph MicroSim
// CANVAS_HEIGHT: 668
// The complementary strengths of Large Language Models and Knowledge Graphs on a
// yin-yang symbol. Hover a label for a one-line hint, click it for a detailed infobox,
// and explore all 12 labels to trigger a celebration. (Celebration animations come from
// the shared library at ../shared/celebration-animations.js.)

// ---- Canvas layout ----
let canvasWidth = 400;          // responsive width
let titleHeight = 44;           // top band for the MicroSim title
let symbolHeight = 400;         // yin-yang symbol area (below the title)
let infoHeight = 168;           // detail panel below the symbol
let drawHeight = titleHeight + symbolHeight; // aliceblue area (title + symbol); boundary to info panel
let canvasHeight = drawHeight + infoHeight;  // 612
let margin = 14;
const TITLE = 'LLMs Complement Knowledge Graphs';

let containerWidth;
let containerHeight = canvasHeight;

// Yin-Yang parameters
let circleSize = 350;

// ---- Content ----
// label = short text shown on the symbol; tip = hover sentence; detail = click infobox.
const DATA = {
  yang: {  // Large Language Model — black text, top/left (white) region
    title: { key: 'y0', label: 'Large Language Model',
      tip: 'A neural network trained on massive text to generate language.',
      detail: 'A Large Language Model is a neural network trained on enormous amounts of text. It produces fluent natural language and encodes broad general knowledge, but its answers are predictions — not guaranteed facts.' },
    features: [
      { key: 'y1', label: 'Models language',
        tip: 'It models the patterns and structure of human language itself.',
        detail: 'An LLM primarily models language: grammar, style, and the statistical patterns of how words follow one another across billions of sentences.' },
      { key: 'y2', label: 'World knowledge',
        tip: 'Trained on the public web, so it knows broad world facts.',
        detail: 'Because it is trained on public, web-scale text, an LLM carries a wide but general knowledge of the outside world — not your organization’s private data.' },
      { key: 'y3', label: 'Predicts tokens',
        tip: 'It works by repeatedly predicting the most likely next token.',
        detail: 'At its core an LLM does one thing: given the text so far, predict the most likely next token. Fluent answers emerge from doing this over and over.' },
      { key: 'y4', label: 'Statistical',
        tip: 'Answers are statistical likelihoods, not exact lookups.',
        detail: 'LLM outputs are statistical. The same prompt can yield different wordings, and confidence does not guarantee correctness.' },
      { key: 'y5', label: 'Can hallucinate',
        tip: 'It can state plausible-sounding but false information.',
        detail: 'When the model lacks the right pattern it may “hallucinate” — generating fluent, confident statements that are simply not true.' }
    ]
  },
  yin: {  // Knowledge Graph — white text, bottom/right (black) region
    title: { key: 'k0', label: 'Knowledge Graph',
      tip: 'A structured network of entities connected by typed relationships.',
      detail: 'A Knowledge Graph stores explicit facts as nodes (entities) and edges (relationships). Answers are looked up and traversed, so they are exact and explainable.' },
    features: [
      { key: 'k1', label: 'Your org & products',
        tip: 'It represents your organization’s specific entities and workflows.',
        detail: 'A knowledge graph models your specific world — your customers, products, providers, and workflows — rather than the generic internet.' },
      { key: 'k2', label: 'Internal knowledge',
        tip: 'It holds your private, governed, organizational data.',
        detail: 'The graph holds your internal, governed knowledge: the proprietary, access-controlled data that an LLM was never trained on.' },
      { key: 'k3', label: 'Graph traversal',
        tip: 'It is optimized for following relationships between entities.',
        detail: 'Graphs are built to traverse relationships — hopping from entity to entity — which makes connected, multi-step questions fast and natural.' },
      { key: 'k4', label: 'Deterministic',
        tip: 'The same query always returns the same exact answer.',
        detail: 'A graph query is deterministic: the same question always returns the same precise answer, which is essential for auditing and compliance.' },
      { key: 'k5', label: 'Precise queries',
        tip: 'It returns exact, verifiable results from explicit facts.',
        detail: 'Because every fact is explicit, graph queries return precise, verifiable results — no guessing, and every answer can be traced to its source.' }
    ]
  }
};
const ALL_KEYS = ['y0', 'y1', 'y2', 'y3', 'y4', 'y5', 'k0', 'k1', 'k2', 'k3', 'k4', 'k5'];

// ---- Interaction state ----
let boxes = {};            // key -> {x,y,w,h} hit-box, rebuilt each frame
let visited = {};          // key -> true once clicked
let selectedKey = null;    // currently shown in the infobox
let hoveredKey = null;
let celebrated = false;
let resetButton;

function meta(key) {
  if (key[0] === 'y') return key === 'y0' ? DATA.yang.title : DATA.yang.features[+key[1] - 1];
  return key === 'k0' ? DATA.yin.title : DATA.yin.features[+key[1] - 1];
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  resetButton = createButton('Reset');
  resetButton.mousePressed(resetExploration);
  resetButton.style('font-size', '13px');
  resetButton.style('padding', '3px 12px');
  positionResetButton();

  if (window.Celebration) Celebration.setSpeed('medium');
  describe('A yin-yang symbol contrasting Large Language Models and Knowledge Graphs. Hover any label for a hint, click it for a detailed explanation below the symbol, and explore all twelve labels to trigger a celebration animation.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Determine hovered label from the previous frame's boxes
  hoveredKey = hitTest(mouseX, mouseY);
  cursor((hoveredKey && mouseY < drawHeight) ? HAND : ARROW);

  // Symbol area background
  noStroke();
  fill('aliceblue');
  rect(0, 0, canvasWidth, drawHeight);
  // Info area background
  fill('white');
  rect(0, drawHeight, canvasWidth, infoHeight);
  stroke('silver'); strokeWeight(1); noFill();
  rect(0, 0, canvasWidth - 1, canvasHeight - 1);

  drawTitle();
  drawYinYangShape();
  drawLabels();
  drawInfoPanel();
  if (hoveredKey && mouseY < drawHeight) drawTooltip(hoveredKey);

  // Celebration particles render on top of everything
  if (window.Celebration) {
    Celebration.config(canvasWidth, canvasHeight);
    Celebration.run();
  }
}

// ---- Title band ----
function drawTitle() {
  let ts = 22;
  textStyle(BOLD);
  textSize(ts);
  while (textWidth(TITLE) > canvasWidth - 2 * margin && ts > 11) { ts -= 1; textSize(ts); }
  noStroke();
  fill('#15334d');
  textAlign(CENTER, CENTER);
  text(TITLE, canvasWidth / 2, titleHeight / 2);
  textStyle(NORMAL);
}

// ---- Yin-Yang geometry (black = right half + bottom teardrop) ----
function drawYinYangShape() {
  let centerX = canvasWidth / 2;
  let centerY = titleHeight + symbolHeight / 2;
  let radius = circleSize / 2;

  push();
  translate(centerX, centerY);

  stroke(0); strokeWeight(1); fill(255);
  circle(0, 0, circleSize);

  // Black half with S-curve
  fill(0); noStroke();
  beginShape();
  vertex(0, -radius);
  for (let angle = -HALF_PI; angle <= HALF_PI; angle += 0.05) {
    vertex(radius * cos(angle), radius * sin(angle));
  }
  vertex(0, radius);
  for (let angle = HALF_PI; angle <= HALF_PI + PI; angle += 0.05) {
    vertex(radius / 2 * cos(angle), radius / 2 * sin(angle) + radius / 2);
  }
  endShape(CLOSE);

  // White teardrop at top
  fill(255);
  beginShape();
  vertex(0, 0);
  for (let angle = -2 * PI; angle < HALF_PI; angle += 0.05) {
    vertex(radius / 2 * cos(angle), radius / 2 * sin(angle) - radius / 2);
  }
  endShape(CLOSE);

  // Small dots to complete the classic symbol
  fill(255); noStroke(); circle(0, -radius / 2, radius / 6); // white dot in black? -> on top (white)
  fill(0); circle(0, radius / 2, radius / 6);                 // black dot in bottom
  pop();
}

// ---- Labels with hit-boxes, highlight, hover/visited state ----
function label(key, str, x, y, align, col, size, hasBullet) {
  textSize(size);
  textAlign(align, CENTER);
  let w = textWidth(str);
  let pad = 3;
  let bx = (align === CENTER) ? x - w / 2 - pad : x - (hasBullet ? 12 : pad);
  let bw = (align === CENTER) ? w + 2 * pad : w + (hasBullet ? 14 : 2 * pad);
  let by = y - size / 2 - pad;
  let bh = size + 2 * pad;
  boxes[key] = { x: bx, y: by, w: bw, h: bh };

  noStroke();
  if (key === hoveredKey) { fill(255, 210, 0, 130); rect(bx, by, bw, bh, 4); }
  else if (visited[key]) { fill(110, 200, 130, 80); rect(bx, by, bw, bh, 4); }

  if (hasBullet) { fill(col === 'white' ? 255 : 0); circle(x - 8, y, 4); }
  fill(col); noStroke();
  text(str, x, y);
}

function drawLabels() {
  let cx = canvasWidth / 2;
  let cy = titleHeight + symbolHeight / 2;
  let lh = 15;

  // Yang (LLM) — black text, top/left white region
  textStyle(BOLD);
  // Title centered above, features left-aligned below
  // the "cx - NN" increase NN to move more to the left
  label('y0', DATA.yang.title.label, cx - 30, cy - 112, CENTER, 'black', 14, false);
  textStyle(NORMAL);
  let yx = cx - 95, yy = cy - 84;
  DATA.yang.features.forEach((f, i) => label(f.key, f.label, yx, yy + i * lh, LEFT, 'black', 11, true));

  // Yin (KG) — white text, bottom/right black region
  textStyle(BOLD);
  label('k0', DATA.yin.title.label, cx + 6, cy + 118, CENTER, 'white', 14, false);
  textStyle(NORMAL);
  let kx = cx - 18, ky = cy + 30;
  DATA.yin.features.forEach((f, i) => label(f.key, f.label, kx, ky + i * lh, LEFT, 'white', 11, true));
}

function drawTooltip(key) {
  let m = meta(key);
  textSize(12);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);
  let pad = 7;
  let maxW = 230;
  let tw = min(textWidth(m.tip) + 2 * pad, maxW + 2 * pad);
  // wrap-aware height: estimate lines
  let lines = ceil(textWidth(m.tip) / maxW);
  let th = lines * 16 + 2 * pad;
  let tx = constrain(mouseX + 14, 4, canvasWidth - tw - 4);
  let ty = constrain(mouseY - th - 6, 4, drawHeight - th - 4);
  noStroke();
  fill(20, 28, 40, 235);
  rect(tx, ty, tw, th, 6);
  fill(255);
  text(m.tip, tx + pad, ty + pad, tw - 2 * pad);
}

function drawInfoPanel() {
  let top = drawHeight;
  let count = Object.keys(visited).length;

  // Progress
  noStroke();
  fill('#1a2733');
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Explored ' + count + ' of 12', margin, top + 10);
  textStyle(NORMAL);
  // progress bar
  let barX = margin + 120, barY = top + 13, barW = canvasWidth - barX - 90, barH = 9;
  fill('#e2e7ec'); rect(barX, barY, barW, barH, 4);
  fill(count === 12 ? '#1c9a4b' : '#3b78c3'); rect(barX, barY, barW * (count / 12), barH, 4);

  // Selected detail or prompt
  let dy = top + 34;
  if (selectedKey) {
    let m = meta(selectedKey);
    let isYang = selectedKey[0] === 'y';
    fill(isYang ? '#2b6cb0' : '#7b3fb3');
    textStyle(BOLD); textSize(14); textAlign(LEFT, TOP);
    text((isYang ? 'LLM · ' : 'Knowledge Graph · ') + m.label, margin, dy);
    textStyle(NORMAL); textSize(12.5); fill('#333');
    text(m.detail, margin, dy + 20, canvasWidth - 2 * margin);
  } else {
    fill('#667'); textSize(12.5); textStyle(NORMAL); textAlign(LEFT, TOP);
    text('Hover any label on the symbol for a quick hint, then click it to read the full explanation here. Explore all 12 to see what happens.',
      margin, dy, canvasWidth - 2 * margin);
  }

  // Completion banner (bottom-center, clear of the progress bar)
  if (celebrated) {
    fill('#1c9a4b'); textStyle(BOLD); textSize(13); textAlign(CENTER, BOTTOM);
    text('☯  Balance achieved — all 12 explored!', canvasWidth / 2, top + infoHeight - 8);
    textStyle(NORMAL);
  }
}

// ---- Hit testing & clicks ----
function hitTest(mx, my) {
  for (let key of ALL_KEYS) {
    let b = boxes[key];
    if (b && mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) return key;
  }
  return null;
}

function mousePressed() {
  if (mouseY > drawHeight) return; // info area / reset button handled elsewhere
  let key = hitTest(mouseX, mouseY);
  if (!key) return;
  visited[key] = true;
  selectedKey = key;
  if (!celebrated && Object.keys(visited).length === ALL_KEYS.length) {
    celebrated = true;
    if (window.Celebration) Celebration.playRandom();
  }
}

function resetExploration() {
  visited = {};
  selectedKey = null;
  celebrated = false;
  if (window.Celebration) Celebration.clear();
}

// ---- Responsive sizing ----
function positionResetButton() {
  if (resetButton) resetButton.position(canvasWidth - 76, drawHeight + 8);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionResetButton();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
