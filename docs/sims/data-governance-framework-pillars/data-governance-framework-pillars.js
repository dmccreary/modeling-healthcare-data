// Data Governance Framework Pillars — remove one and watch the beam tilt.
// CANVAS_HEIGHT: 700
// Layout: 620px drawing area + two 30px control rows + 20px padding.
// Beam occupies y=118..150; pillars y=155..375; info panel y=395..610.
'use strict';

let canvasWidth = 800;
let drawHeight = 620;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
const margin = 18;

// The wearable-device worked example: a vendor wants to feed continuous heart-rate
// and step data into the patient graph. Each pillar owns one accountability question.
const pillars = [
  {id: 'policy', name: 'Policy', color: '#7fb2e5', dark: '#2a5a86',
   question: 'What rules govern data use, retention, and sharing?',
   decision: 'Decides whether wearable data may be used for clinical decisions at all or only for wellness coaching, how long the raw minute-by-minute stream is retained versus the daily summary, and whether the vendor may retain a copy after the contract ends.',
   missing: 'Without Policy, every later decision becomes an improvisation. The engineer wiring up the feed decides retention by choosing a database default, and nobody can say the answer is wrong because nothing was ever written down.'},
  {id: 'roles', name: 'Roles', color: '#7fcfc9', dark: '#2a6f6a',
   question: 'Who is accountable for this data, and who may decide about it?',
   decision: 'Names the data owner for the wearable feed, the steward who fields questions about what a step count means, and the custodian who runs the pipeline. Without a named owner, the answer to “can we use this for risk scoring?” is whoever answers the email first.',
   missing: 'Without Roles, the other four pillars have policies and controls but nobody empowered to apply them. Decisions stall, or worse, get made by whoever is closest to the keyboard.'},
  {id: 'quality', name: 'Quality', color: '#8fce9e', dark: '#2f6b41',
   question: 'Is this data fit for the purpose we intend to use it for?',
   decision: 'Establishes that the device reports steps at ±10% accuracy, that a missing hour means the device was charging rather than the patient was still, and that a resting heart rate from a wrist sensor is not interchangeable with a clinical measurement. Sets the completeness threshold below which a day’s data is not used.',
   missing: 'Without Quality, the data still arrives and still populates dashboards. The failure is silent: a clinician reads a flat step count as immobility when it was a dead battery.'},
  {id: 'security', name: 'Security', color: '#f0b878', dark: '#8a5411',
   question: 'Who can reach this data, and how is it protected in transit and at rest?',
   decision: 'Sets the authentication method for the vendor’s API, requires encryption in transit and at rest, and decides whether the continuous location trace that accompanies outdoor activity data is ingested at all or dropped at the boundary.',
   missing: 'Without Security, the feed works perfectly and is reachable by anyone who finds the endpoint. This is the pillar whose absence is invisible until it is catastrophic.'},
  {id: 'compliance', name: 'Compliance', color: '#bfa3e0', dark: '#5c3d8a',
   question: 'Does this use satisfy the regulations and agreements that bind us?',
   decision: 'Determines whether the vendor is a business associate requiring an agreement, whether patient authorization is needed for the secondary research use the analytics team wants, and what the breach-notification obligation would be for this specific data class.',
   missing: 'Without Compliance, an organization can do everything else well and still be in violation. The other four pillars answer “can we?” and “should we?”; this one answers “are we permitted to?”'}
];

let selectedPillar = null;
let removed = null;
let tilt = 0;          // current beam tilt in radians
let targetTilt = 0;
let pillarSelect, removeButton, resetButton;
let pillarBoxes = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  pillarSelect = createSelect();
  pillarSelect.parent(document.querySelector('main'));
  pillarSelect.attribute('aria-label', 'Choose a pillar');
  pillarSelect.option('Choose a pillar…', '');
  pillars.forEach(p => pillarSelect.option(p.name, p.id));
  pillarSelect.changed(() => selectPillar(pillarSelect.value()));

  removeButton = createButton('Remove this pillar');
  removeButton.parent(document.querySelector('main'));
  removeButton.mousePressed(toggleRemoval);
  removeButton.attribute('disabled', '');

  resetButton = createButton('Restore all five');
  resetButton.parent(document.querySelector('main'));
  resetButton.mousePressed(resetAll);

  describe('Five governance pillars — policy, roles, quality, security, and compliance — hold up a beam labeled Trusted, Governed Data. Select a pillar for its accountability question and the wearable-device decision it governs, then remove it to see the beam tilt.');
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.floor(container.getBoundingClientRect().width);
  drawHeight = canvasWidth < 700 ? 700 : 620;
  canvasHeight = drawHeight + controlHeight;
}

function positionControls() {
  if (!pillarSelect) return;
  pillarSelect.position(margin, drawHeight + 12);
  pillarSelect.size(min(230, canvasWidth - 2 * margin));
  removeButton.position(margin, drawHeight + 48);
  resetButton.position(margin + 170, drawHeight + 48);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  postHeight();
}

function selectPillar(id) {
  selectedPillar = id || null;
  pillarSelect.selected(id || '');
  if (selectedPillar) {
    removeButton.removeAttribute('disabled');
    removeButton.html(removed === selectedPillar ? 'Restore this pillar' : 'Remove this pillar');
    const p = pillars.find(item => item.id === selectedPillar);
    describe(`${p.name}: ${p.question} ${p.decision}`);
  } else {
    removeButton.attribute('disabled', '');
  }
}

function toggleRemoval() {
  if (!selectedPillar) return;
  removed = removed === selectedPillar ? null : selectedPillar;
  removeButton.html(removed === selectedPillar ? 'Restore this pillar' : 'Remove this pillar');
  // The beam leans toward the missing support; a middle pillar drops it straight.
  const index = pillars.findIndex(p => p.id === removed);
  targetTilt = removed === null ? 0 : (index - 2) * 0.035;
}

function resetAll() {
  removed = null;
  selectedPillar = null;
  targetTilt = 0;
  pillarSelect.selected('');
  removeButton.attribute('disabled', '');
  removeButton.html('Remove this pillar');
}

function draw() {
  tilt += (targetTilt - tilt) * 0.12;
  background('aliceblue');

  fill('midnightblue');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 700 ? 19 : 22);
  text('Data Governance Framework Pillars', margin, 14, canvasWidth - 2 * margin);
  textSize(13.5);
  fill('#33475b');
  text('Worked example: a wearable-device vendor wants to feed continuous heart-rate and step data into the patient graph.',
       margin, 46, canvasWidth - 2 * margin);

  drawStructure();
  drawInfoPanel();

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function drawStructure() {
  const usable = canvasWidth - 2 * margin;
  const count = pillars.length;
  const gap = usable / count;
  const pillarWidth = min(gap * 0.62, 108);
  const top = 158;
  const bottom = 378;
  const beamY = 132;
  const centreX = canvasWidth / 2;

  // Ground line
  stroke('#9aa7b3');
  strokeWeight(2);
  line(margin, bottom + 4, canvasWidth - margin, bottom + 4);

  // Beam, rotated about its centre when a pillar is missing.
  push();
  translate(centreX, beamY);
  rotate(tilt);
  const tilted = abs(tilt) > 0.004;
  fill(tilted ? '#e0a2a2' : '#cdd6de');
  stroke(tilted ? '#a33c3c' : '#8a97a3');
  strokeWeight(2);
  rect(-usable / 2, -18, usable, 34, 4);
  noStroke();
  fill(tilted ? '#7d1f1f' : '#33475b');
  textAlign(CENTER, CENTER);
  textSize(canvasWidth < 700 ? 14 : 16);
  text(tilted ? 'Trusted, Governed Data — unsupported' : 'Trusted, Governed Data', 0, -1);
  pop();

  pillarBoxes = [];
  pillars.forEach((p, i) => {
    const x = margin + gap * i + gap / 2;
    const gone = removed === p.id;
    // A removed pillar slides out sideways rather than vanishing, so the learner
    // can see which support left.
    const offset = gone ? (i < 2 ? -1 : 1) * 46 : 0;
    const left = x - pillarWidth / 2 + offset;
    pillarBoxes.push({id: p.id, x: left, y: top, w: pillarWidth, h: bottom - top, gone});

    push();
    if (gone) drawingContext.globalAlpha = 0.3;
    fill(p.color);
    stroke(selectedPillar === p.id ? '#b76900' : p.dark);
    strokeWeight(selectedPillar === p.id ? 4 : 2);
    rect(left, top, pillarWidth, bottom - top, 5);
    // Capital and base give the pillar its column reading.
    rect(left - 7, top - 12, pillarWidth + 14, 12, 2);
    rect(left - 7, bottom, pillarWidth + 14, 12, 2);
    noStroke();
    fill('#1a2733');
    textAlign(CENTER, CENTER);
    textSize(canvasWidth < 620 ? 12 : 15);
    push();
    translate(left + pillarWidth / 2, top + (bottom - top) / 2);
    rotate(-HALF_PI);
    text(p.name, 0, 0);
    pop();
    if (gone) {
      drawingContext.globalAlpha = 1;
      fill('#8a2828');
      textSize(12);
      text('removed', left + pillarWidth / 2, bottom + 16);
    }
    pop();
  });
}

function drawInfoPanel() {
  const top = 404;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(margin, top, canvasWidth - 2 * margin, drawHeight - top - 14, 5);
  noStroke();
  textAlign(LEFT, TOP);

  const innerX = margin + 14;
  const innerW = canvasWidth - 2 * margin - 28;
  if (!selectedPillar) {
    fill('midnightblue');
    textSize(16);
    text('Five pillars, one beam', innerX, top + 12);
    fill('#33475b');
    textSize(14);
    text('Select a pillar below — or click one above — to read the accountability question it owns and the wearable-device decision it governs. Then remove it and watch what the beam does.\n\nEach pillar answers a different question. That is why the chapter claims you cannot skip one: the remaining four have no way to answer the missing question on its behalf.',
         innerX, top + 38, innerW, drawHeight - top - 56);
    return;
  }

  const p = pillars.find(item => item.id === selectedPillar);
  fill(p.dark);
  textSize(17);
  text(p.name, innerX, top + 12);
  fill('midnightblue');
  textSize(14.5);
  text(p.question, innerX, top + 36, innerW, 44);
  fill('#33475b');
  textSize(13.5);
  const body = removed === p.id
    ? 'Missing from the framework. ' + p.missing
    : p.decision;
  text(body, innerX, top + 76, innerW, drawHeight - top - 94);
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  const hit = pillarBoxes.find(box =>
    mouseX >= box.x && mouseX <= box.x + box.w && mouseY >= box.y - 12 && mouseY <= box.y + box.h + 12);
  if (hit) selectPillar(hit.id);
}

function postHeight() {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: canvasHeight + 4}, '*');
  }
}

// p5 calls setup once; report the height after the first layout pass.
window.addEventListener('load', postHeight);
