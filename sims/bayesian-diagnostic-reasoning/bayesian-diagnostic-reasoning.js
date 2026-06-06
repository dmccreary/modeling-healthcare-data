// Bayesian Diagnostic Reasoning MicroSim - p5.js
// CANVAS_HEIGHT: 616
// Apply (L3): toggle evidence items and watch each one update the posterior
// probability of competing diagnoses via naive-Bayes (prior x likelihood ratios,
// renormalized). Changing the clinical prior shows the same evidence yields
// different posteriors by context.

let containerWidth, canvasWidth = 900;
let drawHeight = 410;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

const conditions = ['Migraine', 'Tension Headache', 'Meningitis', 'Brain Tumor', 'Sinusitis'];
const condColor = ['#3b78c3', '#2e8b6f', '#c0392b', '#7b3fb3', '#e8821a'];

const priorsBySetting = {
  'Low-risk clinic':   [0.30, 0.45, 0.02, 0.05, 0.18],
  'Emergency Dept':    [0.30, 0.25, 0.15, 0.10, 0.20],
  'Specialty referral':[0.30, 0.20, 0.10, 0.25, 0.15]
};
// likelihood ratio of each evidence item per condition (present)
const evidence = [
  { name: 'Fever',         lr: [0.6, 0.6, 6.0, 0.7, 3.0] },
  { name: 'Stiff neck',    lr: [0.4, 0.4, 12.0, 0.6, 0.5] },
  { name: 'Gradual onset', lr: [1.0, 1.5, 0.5, 4.0, 1.0] },
  { name: 'Photophobia',   lr: [4.0, 0.8, 3.0, 1.0, 0.8] },
  { name: 'Normal CT',     lr: [1.2, 1.2, 0.6, 0.1, 1.2] }
];

let priorSelect, resetButton, evidenceChecks = [];
let lastEvidenceIdx = -1;
let posteriors = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  priorSelect = createSelect();
  ['Low-risk clinic', 'Emergency Dept', 'Specialty referral'].forEach(o => priorSelect.option(o));
  priorSelect.selected('Emergency Dept');
  priorSelect.position(90, drawHeight + 12);
  priorSelect.changed(() => { lastEvidenceIdx = -1; });

  resetButton = createButton('Reset evidence');
  resetButton.position(270, drawHeight + 12);
  resetButton.mousePressed(() => { evidenceChecks.forEach(c => c.checked(false)); lastEvidenceIdx = -1; });

  evidence.forEach((e, i) => {
    const cb = createCheckbox(' ' + e.name, false);
    cb.changed(() => { lastEvidenceIdx = i; });
    evidenceChecks.push(cb);
  });
  layoutChecks();

  describe('Interactive Bayesian diagnostic reasoning: toggling evidence items updates the posterior probability of five candidate diagnoses shown as a sorted bar chart, with the prior selectable by clinical setting.', LABEL);
}

function layoutChecks() {
  // two rows of checkboxes below the prior/reset row
  evidenceChecks.forEach((cb, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    cb.position(margin + col * 175, drawHeight + 58 + row * 30);
    cb.style('font-size', '15px');
  });
}

function computePosteriors() {
  const priors = priorsBySetting[priorSelect.value()];
  const post = priors.map((p, ci) => {
    let v = p;
    evidence.forEach((e, ei) => { if (evidenceChecks[ei] && evidenceChecks[ei].checked()) v *= e.lr[ci]; });
    return v;
  });
  const sum = post.reduce((a, b) => a + b, 0) || 1;
  return post.map(v => v / sum);
}

function draw() {
  updateCanvasSize();
  // regions
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight);
  noStroke();

  fill('black'); textAlign(CENTER, TOP); textSize(22);
  text('Bayesian Diagnostic Reasoning', canvasWidth / 2, 10);

  posteriors = computePosteriors();
  const leftW = canvasWidth * 0.55;
  const order = conditions.map((_, i) => i).sort((a, b) => posteriors[b] - posteriors[a]);

  // bars
  const barX = margin + 150;
  const barMaxW = leftW - barX - 55;
  const top = 56, rowH = 56;
  textSize(14);
  order.forEach((ci, rank) => {
    const y = top + rank * rowH;
    fill('black'); textAlign(RIGHT, CENTER); noStroke();
    text(conditions[ci], barX - 8, y + 14);
    // bar
    const w = Math.max(2, posteriors[ci] * barMaxW);
    fill(condColor[ci]); stroke('white'); strokeWeight(1);
    rect(barX, y, w, 28, 4);
    noStroke(); fill('black'); textAlign(LEFT, CENTER);
    text((posteriors[ci] * 100).toFixed(1) + '%', barX + w + 6, y + 14);
  });

  // right panel
  const px = leftW + 14, pw = canvasWidth - px - margin;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1);
  rect(px, 50, pw, drawHeight - 70, 6); noStroke();
  const leadIdx = order[0];
  fill('#14506b'); textSize(13); textAlign(LEFT, TOP);
  text('Leading diagnosis', px + 12, 62);
  fill(condColor[leadIdx]); textSize(19);
  text(conditions[leadIdx], px + 12, 80);
  fill('#333'); textSize(13);
  text('Confidence: ' + (posteriors[leadIdx] * 100).toFixed(1) + '%', px + 12, 106);

  fill('#14506b'); textSize(13);
  text('Most recent update', px + 12, 138);
  fill('#333'); textSize(12.5);
  if (lastEvidenceIdx >= 0) {
    const e = evidence[lastEvidenceIdx];
    const present = evidenceChecks[lastEvidenceIdx].checked();
    let s = (present ? 'Added: ' : 'Removed: ') + e.name + '\n\nLikelihood ratios (present):\n';
    conditions.forEach((c, ci) => { s += '  ' + c + ': x' + e.lr[ci] + '\n'; });
    s += '\nposterior = (prior x LRs), renormalized.';
    text(s, px + 12, 158, pw - 24);
  } else {
    text('Toggle an evidence item to see its likelihood ratios and how it revises the differential. With no evidence, bars show the prior probabilities for the selected setting.', px + 12, 158, pw - 24);
  }

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(defaultTextSize);
  text('Prior:', margin, drawHeight + 22);
  text('Evidence present:', margin, drawHeight + 46);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  priorSelect.position(90, drawHeight + 12);
  resetButton.position(270, drawHeight + 12);
  layoutChecks();
  redraw();
}

function updateCanvasSize() {
  const c = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(c.width);
  canvasWidth = containerWidth;
}
