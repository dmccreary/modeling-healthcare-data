// Preventive Care Gap Closure MicroSim - p5.js
// CANVAS_HEIGHT: 586
// Apply (L3): pick a preventive service and watch a guideline rule (age/sex/condition,
// then last-service recency) filter a 40-patient panel into those with open care gaps,
// mirroring how graph queries drive population-health outreach.

let containerWidth, canvasWidth = 920;
let drawHeight = 410;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

const SERVICES = {
  'Colorectal screening': { sex: 'any', ageMin: 45, ageMax: 75, cond: null, lookback: 120, unit: 'mo', def: 120, min: 12, max: 120 },
  'Mammography':          { sex: 'F', ageMin: 40, ageMax: 74, cond: null, lookback: 24, unit: 'mo', def: 24, min: 12, max: 36 },
  'HbA1c':                { sex: 'any', ageMin: 18, ageMax: 99, cond: 'Diabetes', lookback: 6, unit: 'mo', def: 6, min: 3, max: 12 },
  'Influenza vaccine':    { sex: 'any', ageMin: 6, ageMax: 99, cond: null, lookback: 12, unit: 'mo', def: 12, min: 6, max: 18 },
  'Lipid panel':          { sex: 'any', ageMin: 40, ageMax: 75, cond: null, lookback: 60, unit: 'mo', def: 60, min: 12, max: 60 }
};

let patients = [];
let serviceSelect, lookbackSlider, runButton, outreachButton;
let stage = 0; // 0 unfiltered, 1 filtered

function seeded(seed) { let s = seed; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; }

function genPanel() {
  const r = seeded(7);
  const conds = ['Diabetes', 'Hypertension', 'COPD', 'None'];
  patients = [];
  for (let i = 0; i < 40; i++) {
    const age = Math.floor(20 + r() * 65);
    const sex = r() < 0.52 ? 'F' : 'M';
    const cond = r() < 0.30 ? conds[Math.floor(r() * 3)] : 'None';
    const lastMonths = Math.floor(r() * 130); // months since last relevant service
    patients.push({ age, sex, cond, lastMonths, closed: false });
  }
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  genPanel();

  serviceSelect = createSelect();
  Object.keys(SERVICES).forEach(o => serviceSelect.option(o));
  serviceSelect.selected('Colorectal screening');
  serviceSelect.changed(() => { stage = 0; patients.forEach(p => p.closed = false); syncLookback(); });
  lookbackSlider = createSlider(12, 120, 120, 6);
  runButton = createButton('Run gap query');
  runButton.mousePressed(() => { stage = 1; });
  outreachButton = createButton('Simulate outreach');
  outreachButton.mousePressed(simulateOutreach);
  layoutControls();
  describe('Preventive care gap-closure simulation: choose a preventive service and run a guideline rule that filters a 40-patient panel by eligibility and recency to flag open care gaps.', LABEL);
}

function syncLookback() {
  const s = SERVICES[serviceSelect.value()];
  lookbackSlider.elt.min = s.min; lookbackSlider.elt.max = s.max; lookbackSlider.value(s.def);
}

function layoutControls() {
  serviceSelect.position(160, drawHeight + 12);
  lookbackSlider.position(160, drawHeight + 44); lookbackSlider.size(canvasWidth - 160 - margin);
  runButton.position(margin, drawHeight + 78);
  outreachButton.position(margin + 140, drawHeight + 78);
}

function eligible(p, s) {
  if (s.sex !== 'any' && p.sex !== s.sex) return false;
  if (p.age < s.ageMin || p.age > s.ageMax) return false;
  if (s.cond && p.cond !== s.cond) return false;
  return true;
}

function simulateOutreach() {
  const s = SERVICES[serviceSelect.value()], lb = lookbackSlider.value();
  const gaps = patients.filter(p => eligible(p, s) && p.lastMonths > lb && !p.closed);
  const toClose = Math.ceil(gaps.length * 0.5);
  const r = seeded(99 + frameCount);
  gaps.sort(() => r() - 0.5).slice(0, toClose).forEach(p => { p.closed = true; p.lastMonths = 1; });
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Preventive Care Gap Closure', canvasWidth / 2, 8);

  const s = SERVICES[serviceSelect.value()], lb = lookbackSlider.value();
  // KPI computations
  let elig = 0, gaps = 0, closed = 0;
  patients.forEach(p => { const e = eligible(p, s); if (e) elig++;
    if (e && p.closed) closed++; else if (e && p.lastMonths > lb) gaps++; });
  const rate = elig ? Math.round((elig - gaps) / elig * 100) : 0;

  // grid of patient cards (left ~64%)
  const gx = margin, gy = 44, gw = canvasWidth * 0.64 - margin, cols = 5;
  const cw = (gw - (cols - 1) * 8) / cols, ch = 38, rows = 8;
  patients.forEach((p, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = gx + col * (cw + 8), y = gy + row * (ch + 6);
    const e = eligible(p, s);
    let fillCol, txtCol = '#333';
    if (stage === 0) { fillCol = '#eef1f4'; }
    else if (!e) { fillCol = '#f3f4f6'; txtCol = '#aaa'; } // ineligible dimmed
    else if (p.closed) { fillCol = '#cdeccd'; }
    else if (p.lastMonths > lb) { fillCol = '#ffe0b3'; } // open gap
    else { fillCol = '#dde6ee'; } // compliant
    stroke('#cdd7e0'); fill(fillCol); rect(x, y, cw, ch, 4); noStroke();
    fill(txtCol); textAlign(LEFT, TOP); textSize(10.5);
    text(p.age + p.sex + (p.cond !== 'None' ? ' ' + p.cond.slice(0, 4) : ''), x + 5, y + 5, cw - 8);
    textSize(9.5); fill(stage && e && p.lastMonths > lb && !p.closed ? '#b35900' : txtCol);
    text('last: ' + (p.closed ? 'now' : p.lastMonths + 'mo'), x + 5, y + ch - 16);
  });

  // right: rule + KPIs
  const px = canvasWidth * 0.66, pw = canvasWidth - px - margin;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, 44, pw, drawHeight - 60, 6); noStroke();
  fill('#14506b'); textSize(13); textAlign(LEFT, TOP); text('Active guideline rule', px + 12, 54);
  fill('#333'); textSize(12);
  let rule = 'Eligible: ' + (s.sex === 'any' ? 'any sex' : s.sex === 'F' ? 'women' : 'men') +
    ', age ' + s.ageMin + '–' + s.ageMax + (s.cond ? ', with ' + s.cond : '') +
    '.\nGap if last ' + serviceSelect.value() + ' > ' + lb + ' months ago.';
  text(rule, px + 12, 74, pw - 24);

  let y = 140;
  const kpi = (label, val, col) => { fill('#445'); textSize(12); text(label, px + 12, y);
    fill(col || '#111'); textSize(22); textAlign(RIGHT, TOP); text(val, px + pw - 12, y - 4); textAlign(LEFT, TOP); y += 40; };
  if (stage === 0) { fill('#667'); textSize(12.5); text('Click "Run gap query" to apply the eligibility and recency filters to the panel.', px + 12, y, pw - 24); }
  else {
    kpi('Eligible population', elig, '#14506b');
    kpi('Open care gaps', gaps, '#b35900');
    kpi('Gap-closure rate', rate + '%', '#1c7a30');
    fill('#667'); textSize(11.5); textAlign(LEFT, TOP);
    text('Orange = open gap, green = recently closed, gray = ineligible. "Simulate outreach" closes about half the open gaps.', px + 12, y, pw - 24);
  }

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(14);
  text('Service:', margin, drawHeight + 24);
  text('Lookback: ' + lb + ' mo', margin, drawHeight + 56);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
