// Patient Journey Map Visualization MicroSim - p5.js
// CANVAS_HEIGHT: 576
// A single patient's 24-month journey across encounters, providers, and facilities —
// the kind of multi-entity, temporal complexity graph databases are built to model.
// Hover any encounter for its detail.

let containerWidth, canvasWidth = 1000;
let drawHeight = 490;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

// type: office (blue), er (yellow), hosp (red), tele (green)
const TYPES = { office: { c: '#3b78c3', r: 11, label: 'Office visit' }, er: { c: '#e0b020', r: 16, label: 'ER visit' }, hosp: { c: '#c0392b', r: 22, label: 'Hospitalization' }, tele: { c: '#2e7d32', r: 9, label: 'Telehealth' } };
const ENC = [
  { m: 0.5, type: 'office', prov: 'Dr. Lee (PCP)', fac: 'Family Clinic', note: 'Annual physical; new diabetes diagnosis' },
  { m: 2, type: 'office', prov: 'Dr. Adams (Endo)', fac: 'Endocrine Assoc.', note: 'Start metformin' },
  { m: 3.5, type: 'tele', prov: 'Dr. Lee (PCP)', fac: 'Telehealth', note: 'Medication check-in' },
  { m: 5, type: 'er', prov: 'Dr. Cho (EM)', fac: 'Metro Hospital', note: 'Hyperglycemia, dehydration' },
  { m: 6, type: 'office', prov: 'Dr. Adams (Endo)', fac: 'Endocrine Assoc.', note: 'Add SGLT2 inhibitor' },
  { m: 9, type: 'office', prov: 'Dr. Lee (PCP)', fac: 'Family Clinic', note: 'HbA1c improving' },
  { m: 11, type: 'hosp', prov: 'Dr. Ruiz (Hospitalist)', fac: 'Metro Hospital', note: 'CHF exacerbation, 4-day stay' },
  { m: 12.5, type: 'office', prov: 'Dr. Khan (Cardio)', fac: 'Heart Center', note: 'Post-discharge cardiology' },
  { m: 14, type: 'tele', prov: 'Care Manager', fac: 'Telehealth', note: 'Care-management outreach' },
  { m: 16, type: 'office', prov: 'Dr. Lee (PCP)', fac: 'Family Clinic', note: 'Stable; med reconciliation' },
  { m: 19, type: 'office', prov: 'Dr. Khan (Cardio)', fac: 'Heart Center', note: 'Echo follow-up' },
  { m: 22, type: 'tele', prov: 'Dr. Lee (PCP)', fac: 'Telehealth', note: 'Routine check-in' },
  { m: 24, type: 'office', prov: 'Dr. Adams (Endo)', fac: 'Endocrine Assoc.', note: 'At goal; quarterly plan' }
];
let hover = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Patient journey map: a 24-month timeline of encounters colored and sized by type (office, ER, hospitalization, telehealth), labeled with the provider and facility, showing one patient\'s path across many providers and places.', LABEL);
}

function X(m) { return margin + 70 + m / 24 * (canvasWidth - margin - 90 - 70); }

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Patient Journey Map', canvasWidth / 2, 8);

  // header stats
  const providers = new Set(ENC.map(e => e.prov)), facilities = new Set(ENC.map(e => e.fac));
  fill('#445'); textAlign(CENTER, TOP); textSize(12.5);
  text('Maria Lopez · 58 · Type 2 Diabetes, CHF   |   24-month journey · ' + ENC.length + ' encounters · ' + providers.size + ' providers · ' + facilities.size + ' facilities · complexity ' + (providers.size + facilities.size + 2), canvasWidth / 2, 34);

  // timeline axis
  const axisY = drawHeight * 0.52;
  stroke('#cdd5dc'); strokeWeight(2); line(X(0), axisY, X(24), axisY);
  noStroke(); fill('#667'); textSize(10); textAlign(CENTER, TOP);
  for (let m = 0; m <= 24; m += 3) { stroke('#e2e6ea'); line(X(m), axisY - 150, X(m), axisY + 150); noStroke(); fill('#667'); text('M' + m, X(m), axisY + 160); }

  // connect consecutive encounters
  stroke('#bcc6cf'); strokeWeight(1.5);
  for (let i = 0; i < ENC.length - 1; i++) line(X(ENC[i].m), encY(ENC[i]), X(ENC[i + 1].m), encY(ENC[i + 1]));

  // encounters
  hover = -1;
  ENC.forEach((e, i) => { if (dist(mouseX, mouseY, X(e.m), encY(e)) < TYPES[e.type].r + 2) hover = i; });
  ENC.forEach((e, i) => {
    const t = TYPES[e.type], x = X(e.m), y = encY(e), on = hover === i;
    stroke(on ? '#111' : 'white'); strokeWeight(on ? 2.5 : 1.5); fill(t.c); circle(x, y, t.r * 2);
    noStroke(); fill('#445'); textSize(8.5); textAlign(CENTER, TOP); text(e.prov.split(' (')[0].replace('Dr. ', ''), x, y + t.r + 2, 90);
  });

  // hover detail
  if (hover >= 0) {
    const e = ENC[hover], t = TYPES[e.type];
    const bx = Math.min(X(e.m) + 16, canvasWidth - 250), by = encY(e) - 40;
    stroke(t.c); strokeWeight(1.5); fill('white'); rect(bx, by, 240, 70, 6); noStroke();
    fill(t.c); textAlign(LEFT, TOP); textStyle(BOLD); textSize(12); text(t.label + ' · Month ' + e.m, bx + 8, by + 6); textStyle(NORMAL);
    fill('#333'); textSize(11); text(e.prov + '  @  ' + e.fac, bx + 8, by + 24, 224);
    fill('#555'); textSize(10.5); text(e.note, bx + 8, by + 42, 224);
  }

  // legend
  let lx = margin, ly = drawHeight - 18; textAlign(LEFT, CENTER); textSize(11);
  Object.values(TYPES).forEach(t => { fill(t.c); noStroke(); circle(lx + 6, ly, 12); fill('#445'); text(t.label, lx + 16, ly); lx += t.label.length * 6.6 + 36; });
  fill('#667'); textAlign(RIGHT, CENTER); textSize(10.5); text('circle size = encounter intensity', canvasWidth - margin, ly);
}

function encY(e) {
  // lane by type to spread vertically around the axis
  const axisY = drawHeight * 0.52;
  const lane = { office: -1, tele: -0.4, er: 0.7, hosp: 1.3 }[e.type];
  return axisY + lane * 70;
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
