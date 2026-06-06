// Medical Code System Classifier MicroSim - p5.js
// CANVAS_HEIGHT: 486
// Evaluate (L5): read a clinical or billing scenario and classify which coding system
// applies (ICD-10, CPT, HCPCS, or NDC/RxNorm), with immediate explanatory feedback.
// Questions are kept in the QUESTIONS array so instructors can edit them easily.

let containerWidth, canvasWidth = 880;
let drawHeight = 300;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 24;
let defaultTextSize = 16;

const SYSTEMS = ['ICD-10', 'CPT', 'HCPCS', 'NDC/RxNorm'];
const QUESTIONS = [
  { t: 'A physician documents the patient’s Type 2 diabetes diagnosis.', a: 'ICD-10', r: 'ICD-10-CM codes capture diagnoses and conditions, not procedures or products.' },
  { t: 'Billing for a 30-minute office visit plus an in-office EKG.', a: 'CPT', r: 'CPT codes describe physician procedures and services such as E/M visits and tests.' },
  { t: 'Billing for a wheelchair and non-emergency ambulance transport.', a: 'HCPCS', r: 'HCPCS Level II covers durable medical equipment, supplies, and transport.' },
  { t: 'A pharmacy dispenses Lipitor 10 mg, a 90-count bottle.', a: 'NDC/RxNorm', r: 'The NDC identifies the exact drug product; RxNorm normalizes medication names.' },
  { t: 'Coding essential hypertension for the patient’s problem list.', a: 'ICD-10', r: 'A condition on the problem list is a diagnosis — ICD-10-CM.' },
  { t: 'Reporting a laparoscopic appendectomy performed in the OR.', a: 'CPT', r: 'A surgical procedure performed by a clinician is reported with CPT.' },
  { t: 'Billing for a custom knee brace dispensed to the patient.', a: 'HCPCS', r: 'Orthotics and DME are HCPCS Level II, not CPT procedures.' },
  { t: 'Identifying the exact metformin tablet product the pharmacy dispensed.', a: 'NDC/RxNorm', r: 'A specific dispensed drug product is identified by its NDC.' },
  { t: 'Recording acute myocardial infarction as the admitting diagnosis.', a: 'ICD-10', r: 'The reason for admission is a diagnosis — ICD-10-CM.' },
  { t: 'Billing the screening colonoscopy procedure performed today.', a: 'CPT', r: 'The screening reason is ICD-10, but the procedure billed is CPT — a common mix-up.' }
];

let order = [], idx = 0, score = 0, streak = 0, answered = false, lastCorrect = false, picked = null;
let answerButtons = [], nextButton, restartButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  SYSTEMS.forEach((sys, i) => {
    const b = createButton(sys);
    b.mousePressed(() => choose(sys));
    answerButtons.push(b);
  });
  nextButton = createButton('Next scenario');
  nextButton.mousePressed(nextQ);
  restartButton = createButton('Restart');
  restartButton.mousePressed(restart);
  layoutControls();
  restart();
  describe('Medical coding classification quiz: read a scenario and choose whether it maps to ICD-10, CPT, HCPCS, or NDC/RxNorm, with immediate feedback and a running score.', LABEL);
}

function layoutControls() {
  const n = SYSTEMS.length;
  const bw = Math.min(150, (canvasWidth - 2 * margin - (n - 1) * 10) / n);
  answerButtons.forEach((b, i) => {
    b.position(margin + i * (bw + 10), drawHeight + 14);
    b.size(bw, 30);
    b.style('font-size', '14px');
  });
  nextButton.position(margin, drawHeight + 70);
  restartButton.position(margin + 150, drawHeight + 70);
}

function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function restart() { order = shuffle(QUESTIONS.map((_, i) => i)); idx = 0; score = 0; streak = 0; answered = false; picked = null; }
function nextQ() { if (idx < order.length - 1) { idx++; answered = false; picked = null; } }
function choose(sys) {
  if (answered) return;
  answered = true; picked = sys;
  lastCorrect = (sys === QUESTIONS[order[idx]].a);
  if (lastCorrect) { score++; streak++; } else { streak = 0; }
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();

  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Which coding system applies?', canvasWidth / 2, 10);

  const q = QUESTIONS[order[idx]];
  // scenario card
  stroke('#cdd7e0'); fill('white'); strokeWeight(1);
  rect(margin, 46, canvasWidth - 2 * margin, 78, 8); noStroke();
  fill('#1a2733'); textAlign(CENTER, CENTER); textSize(17);
  text(q.t, margin + 14, 52, canvasWidth - 2 * margin - 28, 66);

  // feedback
  if (answered) {
    const col = lastCorrect ? '#1c7a30' : '#c0392b';
    fill(col); textAlign(CENTER, TOP); textSize(18);
    text(lastCorrect ? 'Correct!' : 'Not quite — answer: ' + q.a, canvasWidth / 2, 140);
    fill('#333'); textSize(14); textAlign(CENTER, TOP);
    text(q.r, margin + 14, 168, canvasWidth - 2 * margin - 28);
    if (!lastCorrect) { fill('#888'); textSize(13); text('You chose: ' + picked, canvasWidth / 2, 220); }
  } else {
    fill('#667'); textAlign(CENTER, TOP); textSize(14);
    text('Choose a coding system below.', canvasWidth / 2, 150);
  }

  // score footer
  fill('#14506b'); textAlign(LEFT, CENTER); textSize(15);
  text('Score: ' + score + ' / ' + (answered ? idx + 1 : idx) + '    Streak: ' + streak +
       '    Question ' + (idx + 1) + ' of ' + order.length, margin, drawHeight - 22);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
