// Anomaly Score Threshold Explorer MicroSim - p5.js
// CANVAS_HEIGHT: 601
// Evaluate (L5): drag the anomaly-score threshold (or use the slider) and watch the
// confusion matrix, precision/recall/F1, capacity backlog, and total expected cost
// update, so a learner can justify a threshold given investigation capacity and the
// cost of missed fraud.

let containerWidth, canvasWidth = 900;
let drawHeight = 400;
let controlHeight = 145;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;
const INVEST_COST = 5; // $K per investigation

let providers = []; // {score, fraud, jitter}
let threshSlider, capSlider, costSlider, gtCheck, resetButton;
let plotX, plotW, plotY, plotH;

function seededRand(seed) { let s = seed; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }
function gauss(rng, mean, sd) { const u = Math.max(1e-9, rng()), v = rng();
  return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }

function genProviders() {
  const rng = seededRand(2024);
  providers = [];
  for (let i = 0; i < 90; i++) providers.push({ score: Math.max(0, Math.min(100, gauss(rng, 35, 14))), fraud: false, jitter: rng() });
  for (let i = 0; i < 30; i++) providers.push({ score: Math.max(0, Math.min(100, gauss(rng, 70, 12))), fraud: true, jitter: rng() });
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  genProviders();

  threshSlider = createSlider(0, 100, 70, 1);
  capSlider = createSlider(0, 60, 15, 1);
  costSlider = createSlider(10, 200, 50, 5);
  gtCheck = createCheckbox(' Show ground-truth colors', true);
  resetButton = createButton('Reset');
  resetButton.mousePressed(() => { threshSlider.value(70); capSlider.value(15); costSlider.value(50); gtCheck.checked(true); });
  layoutControls();
  describe('Anomaly score threshold explorer: a strip plot of providers by anomaly score with a draggable threshold, and a live confusion matrix with precision, recall, capacity backlog, and total expected cost.', LABEL);
}

function layoutControls() {
  const sx = 240;
  threshSlider.position(sx, drawHeight + 10); threshSlider.size(canvasWidth - sx - margin);
  capSlider.position(sx, drawHeight + 40); capSlider.size(canvasWidth - sx - margin);
  costSlider.position(sx, drawHeight + 70); costSlider.size(canvasWidth - sx - margin);
  gtCheck.position(margin, drawHeight + 100); gtCheck.style('font-size', '14px');
  resetButton.position(canvasWidth - 90, drawHeight + 98);
}

function metrics() {
  const th = threshSlider.value();
  let TP = 0, FP = 0, FN = 0, TN = 0;
  providers.forEach(p => {
    const flagged = p.score >= th;
    if (p.fraud && flagged) TP++; else if (!p.fraud && flagged) FP++;
    else if (p.fraud && !flagged) FN++; else TN++;
  });
  const flagged = TP + FP;
  const precision = flagged ? TP / flagged : 0;
  const recall = (TP + FN) ? TP / (TP + FN) : 0;
  const f1 = (precision + recall) ? 2 * precision * recall / (precision + recall) : 0;
  const cap = capSlider.value();
  const backlog = Math.max(0, flagged - cap);
  const cost = FN * costSlider.value() + flagged * INVEST_COST;
  return { th, TP, FP, FN, TN, flagged, precision, recall, f1, cap, backlog, cost };
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Anomaly Score Threshold Explorer', canvasWidth / 2, 8);

  const m = metrics();
  plotX = margin + 8; plotW = canvasWidth * 0.60 - plotX; plotY = 70; plotH = 250;
  const toX = sc => plotX + sc / 100 * plotW;
  const thX = toX(m.th);

  // axis
  stroke('#ccc'); strokeWeight(1); line(plotX, plotY + plotH, plotX + plotW, plotY + plotH);
  noStroke(); fill('#445'); textSize(11); textAlign(CENTER, TOP);
  for (let s = 0; s <= 100; s += 20) { text(s, toX(s), plotY + plotH + 6); }
  fill('#445'); textAlign(CENTER, TOP); textSize(12); text('Graph anomaly score →', plotX + plotW / 2, plotY + plotH + 26);

  // flagged shaded region
  noStroke(); fill('rgba(232,130,26,0.10)'); rect(thX, plotY - 6, plotX + plotW - thX, plotH + 6);

  // dots
  const showGT = gtCheck.checked();
  providers.forEach(p => {
    const x = toX(p.score), y = plotY + 18 + p.jitter * (plotH - 36);
    const flagged = p.score >= m.th;
    if (showGT) fill(p.fraud ? color(192, 57, 43, 200) : color(59, 120, 195, 180));
    else fill(flagged ? color(232, 130, 26, 200) : color(140, 150, 160, 160));
    noStroke(); circle(x, y, 9);
  });

  // threshold line
  stroke('#222'); strokeWeight(2); line(thX, plotY - 6, thX, plotY + plotH);
  noStroke(); fill('#222'); textAlign(CENTER, BOTTOM); textSize(12);
  text('threshold ' + m.th + '  (drag)', thX, plotY - 8);

  // legend
  textAlign(LEFT, CENTER); textSize(12);
  if (showGT) {
    fill(192, 57, 43); circle(plotX + 6, plotY + plotH + 48, 9); fill('#333'); text('fraud', plotX + 16, plotY + plotH + 48);
    fill(59, 120, 195); circle(plotX + 80, plotY + plotH + 48, 9); fill('#333'); text('legitimate', plotX + 90, plotY + plotH + 48);
  } else {
    fill('#777'); text('Ground-truth colors hidden — judge the threshold as you would in the field.', plotX, plotY + plotH + 48);
  }

  // ---- right panel: confusion matrix + metrics ----
  const px = canvasWidth * 0.62, pw = canvasWidth - px - margin;
  const cmX = px + 30, cmY = 80, cell = Math.min(70, (pw - 60) / 2);
  fill('#14506b'); textSize(13); textAlign(LEFT, TOP); text('Confusion matrix', px, 58);
  const cells = [
    { x: cmX, y: cmY, c: 'rgba(46,125,50,0.25)', l: 'TP', v: m.TP },
    { x: cmX + cell, y: cmY, c: 'rgba(232,130,26,0.25)', l: 'FP', v: m.FP },
    { x: cmX, y: cmY + cell, c: 'rgba(192,57,43,0.22)', l: 'FN', v: m.FN },
    { x: cmX + cell, y: cmY + cell, c: 'rgba(150,150,150,0.20)', l: 'TN', v: m.TN }
  ];
  cells.forEach(c => { stroke('#bbb'); fill(c.c); rect(c.x, c.y, cell, cell);
    noStroke(); fill('#333'); textAlign(CENTER, CENTER); textSize(12); text(c.l, c.x + cell / 2, c.y + 16);
    textSize(20); text(c.v, c.x + cell / 2, c.y + cell / 2 + 6); });
  fill('#667'); textSize(10); textAlign(CENTER, TOP);
  text('flagged →', cmX + cell, cmY - 12); text('actual fraud ↓', cmX - 24, cmY + 2 * cell + 4);

  let y = cmY + 2 * cell + 28; textAlign(LEFT, TOP); textSize(13.5);
  const row = (l, v) => { fill('#445'); text(l, px, y); fill('#111'); textAlign(RIGHT, TOP);
    text(v, px + pw, y); textAlign(LEFT, TOP); y += 24; };
  row('Precision', (m.precision * 100).toFixed(0) + '%');
  row('Recall', (m.recall * 100).toFixed(0) + '%');
  row('F1', m.f1.toFixed(2));
  row('Flagged vs capacity', m.flagged + ' / ' + m.cap + (m.backlog ? '  (+' + m.backlog + ' backlog)' : ''));
  fill('#14506b'); textSize(14); text('Total expected cost', px, y + 4);
  fill('#c0392b'); textSize(22); textAlign(RIGHT, TOP); text('$' + m.cost + 'K', px + pw, y);

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(14); noStroke();
  text('Threshold: ' + m.th, margin, drawHeight + 18);
  text('Capacity: ' + m.cap + '/wk', margin, drawHeight + 48);
  text('Missed-fraud cost: $' + costSlider.value() + 'K', margin, drawHeight + 78);
}

function mouseDragged() {
  if (mouseX > plotX - 20 && mouseX < plotX + plotW + 20 && mouseY > plotY - 10 && mouseY < plotY + plotH + 10) {
    const v = Math.round(Math.max(0, Math.min(100, (mouseX - plotX) / plotW * 100)));
    threshSlider.value(v);
  }
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
