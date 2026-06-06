// Medication Safety Network Infographic - p5.js
// CANVAS_HEIGHT: 636
// Shows how a graph traverses relationships among a patient's medications, drug
// interactions, allergies, and conditions to surface safety issues. Click a medication
// to highlight its interactions, allergy conflicts, contraindications, and indications.

let containerWidth, canvasWidth = 900;
let drawHeight = 550;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

const MEDS = [
  { id: 'warfarin', label: 'Warfarin 5mg', note: 'anticoagulant' },
  { id: 'aspirin', label: 'Aspirin 81mg', note: 'antiplatelet' },
  { id: 'ibuprofen', label: 'Ibuprofen 400mg', note: 'NSAID' },
  { id: 'metformin', label: 'Metformin 1000mg', note: 'antidiabetic' }
];
const ALLERGIES = [{ id: 'penicillin', label: 'Penicillin', sev: 'severe' }, { id: 'sulfa', label: 'Sulfa drugs', sev: 'moderate' }];
const CONDITIONS = [{ id: 'afib', label: 'Atrial fibrillation' }, { id: 't2d', label: 'Type 2 Diabetes' }, { id: 'ckd', label: 'CKD stage 3a' }];
// relationships: type interaction(red), contra(blue dotted), indication(green)
const REL = [
  { a: 'warfarin', b: 'aspirin', t: 'interaction' }, { a: 'warfarin', b: 'ibuprofen', t: 'interaction' },
  { a: 'aspirin', b: 'ibuprofen', t: 'interaction' },
  { a: 'warfarin', b: 'afib', t: 'indication' }, { a: 'metformin', b: 't2d', t: 'indication' },
  { a: 'ibuprofen', b: 'ckd', t: 'contra' }, { a: 'metformin', b: 'ckd', t: 'contra' }
];
let pos = {}, selected = null, hover = null;
const COL = { interaction: '#c0392b', contra: '#2b6cb0', indication: '#2e7d32', allergy: '#e8821a' };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Medication safety network: a central patient surrounded by four quadrants of medications, drug interactions, allergies, and conditions, with colored lines showing interactions, contraindications, and indications.', LABEL);
}

function layout() {
  const w = canvasWidth, cx = w / 2, cy = drawHeight * 0.52;
  pos = { patient: { x: cx, y: cy } };
  MEDS.forEach((m, i) => pos[m.id] = { x: w * 0.22, y: 110 + i * 84 });        // left column = meds
  CONDITIONS.forEach((c, i) => pos[c.id] = { x: w * 0.80, y: 130 + i * 110 }); // right = conditions
  ALLERGIES.forEach((a, i) => pos[a.id] = { x: w * 0.5 + (i - 0.5) * 150, y: drawHeight - 70 }); // bottom = allergies
}

function relColor(t) { return COL[t]; }

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Medication Safety Network — Patient: John Doe', canvasWidth / 2, 8);
  layout();

  // patient links to meds and conditions (structural, gray)
  stroke('#dde3e8'); strokeWeight(1.2);
  MEDS.forEach(m => line(pos.patient.x, pos.patient.y, pos[m.id].x, pos[m.id].y));
  CONDITIONS.forEach(c => line(pos.patient.x, pos.patient.y, pos[c.id].x, pos[c.id].y));

  // relationship edges
  const active = id => selected && (REL.some(r => r.t !== 'indication' && (r.a === selected && r.b === id || r.b === selected && r.a === id)) || id === selected);
  REL.forEach(r => {
    const hot = selected && (r.a === selected || r.b === selected);
    const c = color(relColor(r.t)); c.setAlpha(selected && !hot ? 60 : 255);
    stroke(c); strokeWeight(r.t === 'interaction' ? (hot ? 3.5 : 2) : 2);
    if (r.t === 'contra') drawingContext.setLineDash([3, 4]);
    line(pos[r.a].x, pos[r.a].y, pos[r.b].x, pos[r.b].y);
    drawingContext.setLineDash([]);
  });

  // central patient + safety indicator (red = high-risk interaction present)
  noStroke(); fill('#3b78c3'); circle(pos.patient.x, pos.patient.y, 70);
  fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(12); text('PATIENT', pos.patient.x, pos.patient.y - 6); textStyle(NORMAL);
  fill('#c0392b'); circle(pos.patient.x + 24, pos.patient.y - 24, 22); fill('white'); textSize(13); text('!', pos.patient.x + 24, pos.patient.y - 25);

  // node drawer
  hover = null;
  function node(id, label, sub, fillc, shape) {
    const p = pos[id]; if (dist(mouseX, mouseY, p.x, p.y) < 40) hover = id;
    const on = (selected === id);
    stroke(on ? '#111' : 'white'); strokeWeight(on ? 3 : 1.5); fill(fillc);
    if (shape === 'tri') { triangle(p.x, p.y - 22, p.x - 22, p.y + 16, p.x + 22, p.y + 16); }
    else rect(p.x - 60, p.y - 22, 120, 44, 8);
    noStroke(); fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(11.5);
    text(label, p.x - 58, p.y - (sub ? 6 : 0), 116); textStyle(NORMAL);
    if (sub) { textSize(9.5); text(sub, p.x, p.y + 11); }
  }
  MEDS.forEach(m => node(m.id, m.label, m.note, '#2e8b57'));
  CONDITIONS.forEach(c => node(c.id, c.label, '', '#3b78c3'));
  ALLERGIES.forEach(a => node(a.id, a.label + ' allergy', a.sev, '#e8821a'));

  // legend
  textAlign(LEFT, CENTER); textSize(11); noStroke(); let lx = margin, ly = drawHeight - 22;
  [['Drug–drug interaction', 'interaction'], ['Contraindication', 'contra'], ['Indication (treats)', 'indication']].forEach(([t, k]) => {
    stroke(COL[k]); strokeWeight(2.5); line(lx, ly, lx + 22, ly); noStroke(); fill('#445'); text(t, lx + 26, ly); lx += t.length * 6.4 + 50;
  });

  // info banner
  fill('#7a1c14'); textAlign(RIGHT, CENTER); textSize(12); textStyle(BOLD);
  text(selected ? 'Click background to clear' : 'HIGH RISK: Warfarin + Aspirin + Ibuprofen → bleeding', canvasWidth - margin, drawHeight - 22);
  textStyle(NORMAL);
}

function mousePressed() { selected = hover; }
function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
