// Value-Based Payment: Shared Savings Settlement - p5.js
// CANVAS_HEIGHT: 596
// Evaluate (L5): adjust total cost of care vs. a benchmark, composite quality, and
// the shared-savings rate to see how a value-based contract converts performance into
// a bonus or (under two-sided risk) a penalty. A quality gate must be cleared to share.

let containerWidth, canvasWidth = 900;
let drawHeight = 400;
let controlHeight = 140;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 24;
let defaultTextSize = 16;

const BENCHMARK = 100; // $M reference
const QUALITY_GATE = 70;

let spendSlider, qualitySlider, rateSlider, twoSidedCheck, settleButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  spendSlider = createSlider(-15, 15, -3, 1);
  qualitySlider = createSlider(0, 100, 78, 1);
  rateSlider = createSlider(40, 75, 50, 1);
  twoSidedCheck = createCheckbox(' Two-sided risk (enables downside penalty)', true);
  settleButton = createButton('Settle year');
  settleButton.mousePressed(() => redraw());
  layoutControls();

  describe('Value-based payment shared-savings calculator: sliders set spend versus benchmark, composite quality, and shared-savings rate, and the panel shows whether the result is a bonus or a penalty.', LABEL);
}

function layoutControls() {
  const sx = 250;
  spendSlider.position(sx, drawHeight + 12); spendSlider.size(canvasWidth - sx - margin);
  qualitySlider.position(sx, drawHeight + 42); qualitySlider.size(canvasWidth - sx - margin);
  rateSlider.position(sx, drawHeight + 72); rateSlider.size(canvasWidth - sx - margin);
  twoSidedCheck.position(margin, drawHeight + 98); twoSidedCheck.style('font-size', '14px');
  settleButton.position(canvasWidth - 110, drawHeight + 98);
}

function settlement() {
  const spendPct = spendSlider.value();
  const quality = qualitySlider.value();
  const rate = rateSlider.value() / 100;
  const twoSided = twoSidedCheck.checked();
  const actual = BENCHMARK * (1 + spendPct / 100);
  const gross = BENCHMARK - actual; // savings if positive
  const gatePass = quality >= QUALITY_GATE;
  const qMult = gatePass ? (0.5 + 0.5 * (quality - QUALITY_GATE) / (100 - QUALITY_GATE)) : 0;
  let bonus = 0, penalty = 0;
  if (gross >= 0) { if (gatePass) bonus = gross * rate * qMult; }
  else { if (twoSided) penalty = -gross * rate; }
  return { spendPct, quality, rate, twoSided, actual, gross, gatePass, qMult, bonus, penalty };
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  fill('black'); textAlign(CENTER, TOP); textSize(22);
  text('Value-Based Payment: Shared Savings', canvasWidth / 2, 10);

  const s = settlement();
  const leftW = canvasWidth * 0.55;

  // ---- left: benchmark vs actual gauge ----
  const gx = margin + 10, gw = leftW - margin - 20, gy = 150;
  textSize(13); fill('#445'); textAlign(LEFT, BOTTOM);
  text('Total cost of care vs. benchmark', gx, gy - 14);
  // axis -15..+15
  const toX = pct => gx + (pct + 15) / 30 * gw;
  stroke('#bbb'); strokeWeight(1); line(gx, gy + 30, gx + gw, gy + 30);
  // benchmark at 0
  const bx = toX(0);
  stroke('#333'); strokeWeight(2); line(bx, gy, bx, gy + 60);
  noStroke(); fill('#333'); textAlign(CENTER, TOP); textSize(12);
  text('Benchmark $100M', bx, gy + 64);
  // shaded savings/loss band from 0 to actual
  const ax = toX(s.spendPct);
  fill(s.gross >= 0 ? 'rgba(46,125,50,0.35)' : 'rgba(192,57,43,0.30)');
  rect(Math.min(bx, ax), gy + 16, Math.abs(ax - bx), 28);
  // actual marker
  stroke(s.gross >= 0 ? '#2e7d32' : '#c0392b'); strokeWeight(3); line(ax, gy - 4, ax, gy + 60);
  noStroke(); fill(s.gross >= 0 ? '#2e7d32' : '#c0392b'); textAlign(CENTER, BOTTOM); textSize(13);
  text('Actual $' + s.actual.toFixed(1) + 'M', ax, gy - 8);
  fill('#333'); textAlign(CENTER, TOP); textSize(13);
  text((s.gross >= 0 ? 'Gross savings: $' : 'Gross loss: $') + Math.abs(s.gross).toFixed(1) + 'M',
       gx + gw / 2, gy + 96);

  // ---- right: settlement panel ----
  const px = leftW + 14, pw = canvasWidth - px - margin;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, 50, pw, drawHeight - 70, 6); noStroke();
  // quality gate light
  fill('#14506b'); textSize(13); textAlign(LEFT, TOP); text('Quality gate (need ' + QUALITY_GATE + '+)', px + 14, 64);
  fill(s.gatePass ? '#2e7d32' : '#c0392b'); circle(px + 30, 100, 26);
  fill('#333'); textSize(14); textAlign(LEFT, CENTER);
  text(s.gatePass ? 'PASS  (quality ' + s.quality + ')' : 'FAIL  (quality ' + s.quality + ')', px + 52, 100);

  // settlement math
  let y = 130; textSize(13.5); textAlign(LEFT, TOP);
  const line2 = (label, val) => { fill('#445'); text(label, px + 14, y); fill('#111'); textAlign(RIGHT, TOP);
    text(val, px + pw - 14, y); textAlign(LEFT, TOP); y += 26; };
  line2('Gross savings/loss', '$' + s.gross.toFixed(1) + 'M');
  line2('Quality multiplier', s.gatePass ? '×' + s.qMult.toFixed(2) : '×0 (gate failed)');
  line2('Shared-savings rate', (s.rate * 100).toFixed(0) + '%');
  line2('Two-sided risk', s.twoSided ? 'on' : 'off (upside only)');

  // final outcome
  y += 6; stroke('#cdd7e0'); line(px + 14, y, px + pw - 14, y); noStroke(); y += 12;
  let label, amount, col;
  if (s.bonus > 0) { label = 'Shared-savings BONUS'; amount = '+$' + s.bonus.toFixed(2) + 'M'; col = '#1c7a30'; }
  else if (s.penalty > 0) { label = 'Downside PENALTY'; amount = '-$' + s.penalty.toFixed(2) + 'M'; col = '#c0392b'; }
  else { label = 'Net adjustment'; amount = '$0.00M'; col = '#555'; }
  fill('#14506b'); textSize(14); text(label, px + 14, y);
  fill(col); textSize(26); textAlign(RIGHT, TOP); text(amount, px + pw - 14, y - 4);

  // ---- control labels ----
  fill('black'); textAlign(LEFT, CENTER); textSize(14); noStroke();
  text('Spend vs benchmark: ' + (s.spendPct > 0 ? '+' : '') + s.spendPct + '%', margin, drawHeight + 20);
  text('Composite quality: ' + s.quality, margin, drawHeight + 50);
  text('Shared-savings rate: ' + (s.rate * 100).toFixed(0) + '%', margin, drawHeight + 80);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  layoutControls();
  redraw();
}

function updateCanvasSize() {
  const c = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(c.width);
  canvasWidth = containerWidth;
}
