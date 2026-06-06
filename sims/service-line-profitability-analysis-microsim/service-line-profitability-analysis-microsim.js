// Service Line Profitability Analysis MicroSim - p5.js
// CANVAS_HEIGHT: 634
// Apply: a waterfall bridge from gross revenue to net margin for a service line. Adjust
// monthly volume, the Commercial payer share, and cost-per-case to see how payer mix and
// utilization drive contractual adjustments, costs, and the final margin.

let containerWidth, canvasWidth = 1000;
let drawHeight = 420;
let controlHeight = 140;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

let volSlider, commSlider, costSlider, resetBtn;
const CHARGE = 9000; // gross charge per case

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  volSlider = createSlider(50, 500, 220, 10);
  commSlider = createSlider(10, 70, 35, 1);
  costSlider = createSlider(2500, 7000, 4200, 100);
  resetBtn = createButton('Reset'); resetBtn.mousePressed(() => { volSlider.value(220); commSlider.value(35); costSlider.value(4200); });
  layoutControls();
  describe('Service line profitability waterfall: a bridge chart from gross revenue through contractual adjustments and direct, indirect, and overhead costs to net margin, driven by sliders for volume, Commercial payer share, and cost per case.', LABEL);
}
function layoutControls() {
  const sx = 250;
  volSlider.position(sx, drawHeight + 12); volSlider.size(canvasWidth - sx - margin);
  commSlider.position(sx, drawHeight + 42); commSlider.size(canvasWidth - sx - margin);
  costSlider.position(sx, drawHeight + 72); costSlider.size(canvasWidth - sx - margin);
  resetBtn.position(margin, drawHeight + 104);
}

function finance() {
  const vol = volSlider.value(), comm = commSlider.value() / 100, costPer = costSlider.value();
  // remaining mix: Medicare 35%, Medicaid 20%, Self-pay (rest) of the non-commercial share scaled
  const nonComm = 1 - comm;
  const mix = { Commercial: comm, Medicare: nonComm * 0.5, Medicaid: nonComm * 0.35, 'Self-Pay': nonComm * 0.15 };
  const collRate = { Commercial: 0.62, Medicare: 0.42, Medicaid: 0.32, 'Self-Pay': 0.10 };
  const gross = vol * CHARGE;
  let collected = 0; for (const k in mix) collected += mix[k] * vol * CHARGE * collRate[k];
  const contractual = gross - collected;
  const direct = vol * costPer * 0.55, indirect = vol * costPer * 0.30, overhead = vol * costPer * 0.15;
  const net = collected - direct - indirect - overhead;
  return { vol, comm, gross, contractual, collected, direct, indirect, overhead, net, mix };
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Service Line Profitability', canvasWidth / 2, 8);

  const m = finance();
  const steps = [
    { l: 'Gross\nRevenue', v: m.gross, type: 'total' },
    { l: 'Contractual\nAdjust.', v: -m.contractual, type: 'neg' },
    { l: 'Direct\nCosts', v: -m.direct, type: 'neg' },
    { l: 'Indirect\nCosts', v: -m.indirect, type: 'neg' },
    { l: 'Overhead', v: -m.overhead, type: 'neg' },
    { l: 'Net\nMargin', v: m.net, type: 'end' }
  ];
  const px = margin + 30, pw = canvasWidth * 0.72 - px, py = 50, ph = drawHeight - py - 50;
  const maxV = m.gross;
  const yOf = val => py + ph - (val / maxV) * ph;
  const bw = pw / steps.length * 0.6, gap = pw / steps.length;
  // zero line
  stroke('#ccc'); line(px, yOf(0), px + pw, yOf(0));
  let running = 0;
  steps.forEach((s, i) => {
    const x = px + i * gap + (gap - bw) / 2;
    let top, h, col;
    if (s.type === 'total' || s.type === 'end') {
      top = yOf(Math.max(0, s.v)); h = Math.abs(yOf(s.v) - yOf(0));
      col = s.type === 'end' ? (s.v >= 0 ? '#1c7a30' : '#c0392b') : '#3b78c3';
      running = s.v;
    } else {
      const start = running, end = running + s.v;
      top = yOf(Math.max(start, end)); h = Math.abs(yOf(start) - yOf(end));
      col = '#e8821a'; running = end;
      // connector
      stroke('#bbb'); strokeWeight(1); line(x - (gap - bw) / 2, yOf(start), x, yOf(start));
    }
    noStroke(); fill(col); rect(x, top, bw, Math.max(2, h), 3);
    fill('#333'); textAlign(CENTER, TOP); textSize(10); text(s.l, x + bw / 2 - 40, py + ph + 6, 80);
    fill(col); textSize(10.5); textStyle(BOLD); textAlign(CENTER, BOTTOM);
    text((s.v < 0 ? '-$' : '$') + Math.abs(Math.round(s.v / 1000)) + 'k', x + bw / 2, top - 2); textStyle(NORMAL);
  });

  // KPI panel
  const kx = canvasWidth * 0.74, kw = canvasWidth - kx - margin;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(kx, py, kw, ph, 6); noStroke();
  let y = py + 12; textAlign(LEFT, TOP);
  const kpi = (l, v, c) => { fill('#445'); textSize(12); text(l, kx + 12, y); fill(c || '#111'); textStyle(BOLD); textSize(18); text(v, kx + 12, y + 15); textStyle(NORMAL); y += 50; };
  const marginPct = m.collected ? (m.net / m.collected * 100) : 0;
  kpi('Net margin', (m.net < 0 ? '-$' : '$') + Math.abs(Math.round(m.net / 1000)) + 'k', m.net >= 0 ? '#1c7a30' : '#c0392b');
  kpi('Operating margin', marginPct.toFixed(1) + '%', marginPct >= 0 ? '#1c7a30' : '#c0392b');
  kpi('Collected revenue', '$' + Math.round(m.collected / 1000) + 'k', '#14506b');
  kpi('Cases / month', m.vol, '#14506b');
  fill('#667'); textSize(10.5); text('Commercial ' + Math.round(m.comm * 100) + '% pays best; shifting mix toward Commercial raises collected revenue and margin.', kx + 12, y, kw - 24);

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(13); noStroke();
  text('Monthly volume: ' + m.vol + ' cases', margin, drawHeight + 22);
  text('Commercial share: ' + Math.round(m.comm * 100) + '%', margin, drawHeight + 52);
  text('Cost per case: $' + costSlider.value(), margin, drawHeight + 82);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
