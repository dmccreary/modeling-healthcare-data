// Risk Adjustment & Capitation Calculator MicroSim - p5.js
// CANVAS_HEIGHT: 636
// Adjust a patient panel's demographics and chronic-condition prevalence to see how the
// HCC risk score, risk-adjusted capitation revenue, projected costs, and operating margin
// change — and how care management can move a thin-margin panel into the black.

let containerWidth, canvasWidth = 1000;
let drawHeight = 380;
let controlHeight = 200;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

let panelSlider, ageSlider, dmSlider, htnSlider, chfSlider, ckdSlider, pmpmSlider, cmSlider, resetBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  panelSlider = createSlider(500, 5000, 2000, 100);
  ageSlider = createSlider(35, 75, 52, 1);
  dmSlider = createSlider(0, 40, 15, 1);
  htnSlider = createSlider(0, 60, 32, 1);
  chfSlider = createSlider(0, 20, 6, 1);
  ckdSlider = createSlider(0, 20, 7, 1);
  pmpmSlider = createSlider(200, 800, 450, 10);
  cmSlider = createSlider(0, 25, 0, 1);
  resetBtn = createButton('Reset'); resetBtn.mousePressed(() => { panelSlider.value(2000); ageSlider.value(52); dmSlider.value(15); htnSlider.value(32); chfSlider.value(6); ckdSlider.value(7); pmpmSlider.value(450); cmSlider.value(0); });
  layoutControls();
  describe('Risk adjustment and capitation calculator: sliders for panel demographics and chronic-condition prevalence drive an HCC risk score, capitation revenue, projected costs, and operating margin, with a care-management lever.', LABEL);
}
function layoutControls() {
  const c1 = 150, c2 = canvasWidth / 2 + 150, w = canvasWidth / 2 - c1 - margin;
  const set = (s, col, row) => { s.position(col, drawHeight + 12 + row * 30); s.size(Math.max(120, w)); };
  set(panelSlider, c1, 0); set(ageSlider, c1, 1); set(dmSlider, c1, 2); set(htnSlider, c1, 3);
  set(chfSlider, c2, 0); set(ckdSlider, c2, 1); set(pmpmSlider, c2, 2); set(cmSlider, c2, 3);
  resetBtn.position(margin, drawHeight + 162);
}

function calc() {
  const panel = panelSlider.value(), age = ageSlider.value();
  const dm = dmSlider.value() / 100, htn = htnSlider.value() / 100, chf = chfSlider.value() / 100, ckd = ckdSlider.value() / 100;
  const pmpm = pmpmSlider.value(), cm = cmSlider.value() / 100;
  const risk = 0.40 + (age - 50) * 0.013 + dm * 0.55 + htn * 0.32 + chf * 1.20 + ckd * 0.85;
  const riskPMPM = pmpm * risk;
  const revenue = riskPMPM * panel * 12;
  const baseCost = 285; // per member per month base (tuned for thin default margin)
  const cost = panel * 12 * baseCost * (0.7 + 0.62 * risk) * (1 - cm * 0.6);
  const surplus = revenue - cost;
  const marginPct = revenue ? surplus / revenue * 100 : 0;
  return { panel, risk, riskPMPM, revenue, cost, surplus, marginPct, pmpm, cm };
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Risk Adjustment & Capitation', canvasWidth / 2, 8);

  const r = calc();
  // risk distribution histogram (synthetic normal around r.risk)
  const hx = margin + 30, hw = canvasWidth * 0.50 - hx, hy = 60, hh = drawHeight - hy - 40;
  fill('#14506b'); textAlign(LEFT, TOP); textSize(12); text('Panel risk score distribution (mean ' + r.risk.toFixed(2) + ')', hx, 44);
  const bins = 10, lo = 0, hi = 3;
  const counts = new Array(bins).fill(0);
  for (let i = 0; i < 240; i++) { const v = r.risk + (Math.sin(i * 12.9898) * 43758.5453 % 1) * 0; } // deterministic-ish
  for (let b = 0; b < bins; b++) { const x = lo + (b + 0.5) * (hi - lo) / bins; counts[b] = Math.exp(-Math.pow((x - r.risk) / 0.45, 2) / 2); }
  const maxC = Math.max(...counts);
  const tierCol = x => x < 0.5 ? '#2e7d32' : x < 1.5 ? '#d4a017' : x < 2.5 ? '#e8821a' : '#c0392b';
  const bw = hw / bins;
  counts.forEach((c, b) => { const x = hx + b * bw, val = lo + (b + 0.5) * (hi - lo) / bins; const bh2 = (c / maxC) * hh;
    noStroke(); fill(tierCol(val)); rect(x + 2, hy + hh - bh2, bw - 4, bh2, 2); });
  stroke('#bbb'); line(hx, hy + hh, hx + hw, hy + hh);
  noStroke(); fill('#445'); textSize(9.5); textAlign(CENTER, TOP); for (let v = 0; v <= 3; v++) text(v.toFixed(1), hx + (v / 3) * hw, hy + hh + 4);
  // mean line
  const mx = hx + Math.min(1, r.risk / 3) * hw; stroke('#222'); strokeWeight(1.5); line(mx, hy, mx, hy + hh); noStroke();
  fill('#222'); textSize(10); textAlign(CENTER, BOTTOM); text('mean ' + r.risk.toFixed(2), mx, hy - 1);

  // financial panel
  const px = canvasWidth * 0.54, pw = canvasWidth - px - margin;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, 44, pw, drawHeight - 60, 6); noStroke();
  fill('#14506b'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD); text('Annual financial summary', px + 14, 54); textStyle(NORMAL);
  let y = 80;
  const row = (l, v, c) => { fill('#445'); textSize(12); textAlign(LEFT, TOP); text(l, px + 14, y); fill(c || '#111'); textAlign(RIGHT, TOP); textStyle(BOLD); textSize(15); text(v, px + pw - 14, y - 1); textStyle(NORMAL); y += 32; };
  row('Avg HCC risk score', r.risk.toFixed(2), '#14506b');
  row('Risk-adjusted PMPM', '$' + Math.round(r.riskPMPM), '#14506b');
  row('Capitation revenue', '$' + (r.revenue / 1e6).toFixed(2) + 'M', '#1c7a30');
  row('Projected medical cost', '$' + (r.cost / 1e6).toFixed(2) + 'M', '#c0392b');
  y += 4; stroke('#cdd7e0'); line(px + 14, y, px + pw - 14, y); noStroke(); y += 8;
  row('Surplus / (deficit)', (r.surplus < 0 ? '-$' : '$') + Math.abs(r.surplus / 1e6).toFixed(2) + 'M', r.surplus >= 0 ? '#1c7a30' : '#c0392b');
  row('Operating margin', r.marginPct.toFixed(1) + '%', r.marginPct >= 0 ? '#1c7a30' : '#c0392b');
  if (r.marginPct < 2) { fill('#c0392b'); textSize(11); text('Margin below 2% — apply care management to high-risk members.', px + 14, y, pw - 28); }

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(12.5); noStroke();
  const lbl = (t, x, row) => text(t, x, drawHeight + 22 + row * 30);
  lbl('Panel size: ' + r.panel, margin, 0); lbl('Avg age: ' + ageSlider.value(), margin, 1);
  lbl('Diabetes: ' + dmSlider.value() + '%', margin, 2); lbl('Hypertension: ' + htnSlider.value() + '%', margin, 3);
  lbl('CHF: ' + chfSlider.value() + '%', canvasWidth / 2 + margin, 0); lbl('CKD: ' + ckdSlider.value() + '%', canvasWidth / 2 + margin, 1);
  lbl('Base PMPM: $' + r.pmpm, canvasWidth / 2 + margin, 2); lbl('Care mgmt: ' + cmSlider.value() + '%', canvasWidth / 2 + margin, 3);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
