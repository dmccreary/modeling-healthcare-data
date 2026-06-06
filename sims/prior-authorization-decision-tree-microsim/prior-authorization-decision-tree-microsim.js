// Prior Authorization Decision Tree MicroSim - p5.js
// CANVAS_HEIGHT: 616
// Apply medical-necessity criteria: walk an MRI-Brain-for-headache prior-auth decision
// tree by answering Yes/No for each clinical checkpoint of a given case, then see whether
// your path reached the clinically correct outcome (approve / deny / pend / peer review).

let containerWidth, canvasWidth = 1000;
let drawHeight = 420;
let controlHeight = 140;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

// decision chain; each decision: question, yes->next, no->next (string id or terminal)
const DECISIONS = [
  { id: 'D1', q: 'Red-flag symptoms present?', hint: 'sudden severe headache, neuro deficit, cancer history, trauma', yes: 'APPROVE1', no: 'D2' },
  { id: 'D2', q: 'Conservative treatment tried?', hint: 'medications / physical therapy for 4-6 weeks', yes: 'D3', no: 'DENY1' },
  { id: 'D3', q: 'Symptoms persistent or worsening?', hint: 'duration > 6 weeks with no improvement', yes: 'D4', no: 'DENY2' },
  { id: 'D4', q: 'Adequate clinical documentation?', hint: 'provider notes, symptom description, treatment history', yes: 'D5', no: 'PEND' },
  { id: 'D5', q: 'Aligns with clinical guidelines?', hint: 'follows ACR Appropriateness Criteria', yes: 'APPROVE2', no: 'PEER' }
];
const TERMINALS = {
  APPROVE1: { label: 'APPROVED — Medical necessity met', kind: 'approve' },
  APPROVE2: { label: 'APPROVED — Criteria met', kind: 'approve' },
  DENY1: { label: 'DENIED — Try conservative treatment first', kind: 'deny' },
  DENY2: { label: 'DENIED — Resubmit if symptoms persist', kind: 'deny' },
  PEND: { label: 'PEND — Request additional information', kind: 'pend' },
  PEER: { label: 'PEER REVIEW REQUIRED — Manual physician review', kind: 'pend' }
};
const CASES = [
  { t: '55 y/o, sudden severe headache with visual changes, HTN history', correct: 'APPROVE1', facts: 'Acute red-flag presentation.' },
  { t: '28 y/o, mild headaches for 2 weeks, no neuro symptoms, no meds tried', correct: 'DENY1', facts: 'No red flags; conservative care not attempted.' },
  { t: '42 y/o, chronic migraine, tried multiple meds, requesting 3rd MRI in 12 months', correct: 'PEER', facts: 'Borderline; outside routine guideline criteria.' },
  { t: 'Incomplete chart — symptom duration cannot be determined', correct: 'PEND', facts: 'Documentation insufficient to decide.' },
  { t: '65 y/o, progressive numbness/weakness, failed 8 weeks of PT', correct: 'APPROVE2', facts: 'Meets all evidence-based criteria.' }
];

let caseIdx = 0, di = 0, reached = null, path = [];
let yesBtn, noBtn, resetBtn, nextBtn;
let stats = { n: 0, approve: 0, deny: 0, pend: 0, correct: 0 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  yesBtn = createButton('Yes'); yesBtn.mousePressed(() => answer('yes'));
  noBtn = createButton('No'); noBtn.mousePressed(() => answer('no'));
  resetBtn = createButton('Reset case'); resetBtn.mousePressed(resetCase);
  nextBtn = createButton('Next case'); nextBtn.mousePressed(nextCase);
  layoutControls();
  resetCase();
  describe('Prior authorization decision tree for MRI brain imaging: answer yes or no at each clinical checkpoint to walk the tree and reach an approve, deny, pend, or peer-review outcome, with feedback on whether it matches the case.', LABEL);
}
function layoutControls() {
  yesBtn.position(margin, drawHeight + 84); yesBtn.size(70, 30);
  noBtn.position(margin + 80, drawHeight + 84); noBtn.size(70, 30);
  resetBtn.position(margin + 170, drawHeight + 84);
  nextBtn.position(margin + 280, drawHeight + 84);
}
function resetCase() { di = 0; reached = null; path = []; }
function nextCase() { caseIdx = (caseIdx + 1) % CASES.length; resetCase(); }
function answer(a) {
  if (reached) return;
  const d = DECISIONS[di];
  path.push({ id: d.id, a });
  const next = a === 'yes' ? d.yes : d.no;
  if (TERMINALS[next]) {
    reached = next; const k = TERMINALS[next].kind;
    stats.n++; if (k === 'approve') stats.approve++; else if (k === 'deny') stats.deny++; else stats.pend++;
    if (next === CASES[caseIdx].correct) stats.correct++;
  } else { di = DECISIONS.findIndex(x => x.id === next); }
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Prior Authorization: MRI Brain for Headache', canvasWidth / 2, 8);

  // ---- decision chain (left) ----
  const cx = margin + 130, top = 52, stepY = 60;
  DECISIONS.forEach((d, i) => {
    const y = top + i * stepY;
    const onPath = path.find(p => p.id === d.id);
    const isCurrent = (i === di && !reached);
    stroke(isCurrent ? '#14506b' : '#bbb'); strokeWeight(isCurrent ? 2.5 : 1);
    fill(onPath ? '#fff2b3' : isCurrent ? '#e7f0fa' : 'white');
    rectMode(CENTER); rect(cx, y, 230, 42, 8); rectMode(CORNER);
    noStroke(); fill('#1a2733'); textAlign(CENTER, CENTER); textSize(12.5);
    text(d.q, cx, y, 220);
    // yes/no edges to next
    fill('#888'); textSize(10); textAlign(LEFT, CENTER);
    if (onPath) { fill(onPath.a === 'yes' ? '#1c7a30' : '#c0392b'); text(onPath.a.toUpperCase(), cx + 122, y); }
  });
  // connectors
  stroke('#ccc'); strokeWeight(1);
  for (let i = 0; i < DECISIONS.length - 1; i++) { const y = top + i * stepY; line(cx, y + 21, cx, y + stepY - 21); }

  // ---- right: case + outcome ----
  const px = canvasWidth * 0.52, pw = canvasWidth - px - margin;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, 48, pw, drawHeight - 64, 6); noStroke();
  const c = CASES[caseIdx];
  fill('#14506b'); textAlign(LEFT, TOP); textSize(13); text('Case ' + (caseIdx + 1) + ' of ' + CASES.length, px + 14, 58);
  fill('#1a2733'); textSize(13.5); text(c.t, px + 14, 78, pw - 28);
  fill('#667'); textSize(12); text(c.facts, px + 14, 132, pw - 28);

  if (!reached) {
    const d = DECISIONS[di];
    fill('#14506b'); textSize(14); text('Current checkpoint:', px + 14, 172);
    fill('#1a2733'); textSize(15); text(d.q, px + 14, 192, pw - 28);
    fill('#777'); textSize(11.5); textStyle(ITALIC); text('Criteria: ' + d.hint, px + 14, 232, pw - 28); textStyle(NORMAL);
    fill('#445'); textSize(13); text('Answer Yes / No based on the case facts above.', px + 14, 274, pw - 28);
  } else {
    const term = TERMINALS[reached];
    const col = term.kind === 'approve' ? '#1c7a30' : term.kind === 'deny' ? '#c0392b' : '#b35900';
    fill(col); textSize(16); text(term.label, px + 14, 178, pw - 28);
    const right = (reached === c.correct);
    fill(right ? '#1c7a30' : '#c0392b'); textSize(14);
    text(right ? '✓ Correct for this case.' : '✗ Not the expected outcome.', px + 14, 226);
    fill('#333'); textSize(12.5);
    text(right ? 'Your answers matched the medical-necessity criteria for this case.'
              : 'Based on the case facts, the correct outcome is: ' + TERMINALS[c.correct].label + '.', px + 14, 250, pw - 28);
  }

  // stats footer
  fill('#14506b'); textSize(12); textAlign(LEFT, BOTTOM);
  const pct = stats.n ? Math.round(stats.correct / stats.n * 100) : 0;
  text('Reviewed: ' + stats.n + '   Approved: ' + stats.approve + '   Denied: ' + stats.deny +
       '   Pend/Peer: ' + stats.pend + '   Accuracy: ' + pct + '%', margin, drawHeight - 8);

  // control hint
  fill('black'); textAlign(LEFT, CENTER); textSize(13);
  text(reached ? 'Outcome reached — Reset case to retry, or Next case.' : 'Answer the current checkpoint:', margin, drawHeight + 60);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
