// Healthcare Payment Model Comparison MicroSim - p5.js
// CANVAS_HEIGHT: 614
// Compare how four payment models — Fee-for-Service, Bundled Payment, Capitation, and
// ACO Shared Savings — reshape provider incentives and outcomes. Select a model to read
// its incentive and metrics; the bars compare all four side by side.

let containerWidth, canvasWidth = 1000;
let drawHeight = 500;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

const MODELS = [
  { name: 'Fee-for-Service', color: '#c0392b', cost: 4200, services: 10, outcome: 62, prevent: 25, ed: 38, margin: 18,
    incentive: 'Paid per service → incentive to maximize volume. High short-term costs, little prevention.' },
  { name: 'Bundled Payment', color: '#e8821a', cost: 2900, services: 6, outcome: 70, prevent: 45, ed: 28, margin: 14,
    incentive: 'Fixed payment per episode → incentive for efficient, coordinated care within the bundle.' },
  { name: 'Capitation', color: '#2e7d32', cost: 2300, services: 4, outcome: 74, prevent: 65, ed: 20, margin: 12,
    incentive: 'Fixed per-member-per-month → strongest incentive for prevention and avoiding utilization.' },
  { name: 'ACO Shared Savings', color: '#3b78c3', cost: 2700, services: 5, outcome: 72, prevent: 55, ed: 24, margin: 13,
    incentive: 'Share savings vs a benchmark if quality holds → rewards lowering total cost of care.' }
];
const METRICS = [
  { key: 'cost', label: 'Cost / patient ($)', max: 5000, fmt: v => '$' + v.toLocaleString(), lowerBetter: true },
  { key: 'outcome', label: 'Health outcome (/100)', max: 100, fmt: v => v + '/100' },
  { key: 'prevent', label: 'Preventive services (%)', max: 100, fmt: v => v + '%' },
  { key: 'ed', label: 'ED visit rate (%)', max: 50, fmt: v => v + '%', lowerBetter: true }
];
let selected = 2, buttons = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  MODELS.forEach((m, i) => { const b = createButton(m.name); b.mousePressed(() => selected = i); buttons.push(b); });
  layoutControls();
  describe('Healthcare payment model comparison: four models (fee-for-service, bundled, capitation, ACO shared savings) compared across cost per patient, health outcome, preventive services, and ED visit rate, with each model\'s incentive.', LABEL);
}
function layoutControls() {
  let x = margin; buttons.forEach((b, i) => { b.position(x, drawHeight + 8); b.style('font-size', '13px'); x += 170; });
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Payment Models & Provider Incentives', canvasWidth / 2, 8);

  // highlight selected button
  buttons.forEach((b, i) => b.style('background', i === selected ? MODELS[i].color : '#f2f5f8').style('color', i === selected ? '#fff' : '#222'));

  // selected model incentive card
  const m = MODELS[selected];
  stroke(m.color); strokeWeight(2); fill(lerpColor(color(m.color), color('white'), 0.9));
  rect(margin, 40, canvasWidth - 2 * margin, 56, 8); noStroke();
  fill(m.color); textAlign(LEFT, TOP); textStyle(BOLD); textSize(15); text(m.name, margin + 14, 48); textStyle(NORMAL);
  fill('#333'); textSize(12.5); text(m.incentive, margin + 14, 68, canvasWidth - 2 * margin - 28);

  // 2x2 grid of metric comparison bar charts
  const gx = margin, gw = canvasWidth - 2 * margin, top = 112;
  const cellW = gw / 2, cellH = (drawHeight - top - 20) / 2;
  METRICS.forEach((met, mi) => {
    const cx = gx + (mi % 2) * cellW, cy = top + Math.floor(mi / 2) * cellH;
    fill('#14506b'); textAlign(LEFT, TOP); textSize(12.5); textStyle(BOLD); text(met.label, cx + 8, cy + 4); textStyle(NORMAL);
    const bx = cx + 130, bw = cellW - 150, by0 = cy + 26, rowH = (cellH - 36) / MODELS.length;
    MODELS.forEach((mm, i) => {
      const y = by0 + i * rowH;
      const frac = mm[met.key] / met.max;
      noStroke(); fill(i === selected ? mm.color : lerpColor(color(mm.color), color('white'), 0.5));
      rect(bx, y, Math.max(2, frac * bw), rowH - 6, 2);
      fill('#333'); textAlign(RIGHT, CENTER); textSize(10); text(mm.name.split(' ')[0], bx - 6, y + (rowH - 6) / 2);
      fill('#111'); textAlign(LEFT, CENTER); textSize(10); text(met.fmt(mm[met.key]), bx + Math.max(2, frac * bw) + 4, y + (rowH - 6) / 2);
    });
  });

  fill('#15334d'); textAlign(LEFT, CENTER); textSize(11); noStroke();
  text('Select a model above:', margin, drawHeight + 22);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
