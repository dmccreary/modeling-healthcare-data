// Provider Referral Network Analysis MicroSim - p5.js
// CANVAS_HEIGHT: 616
// A bipartite referral network: primary-care providers (left) send referrals to
// specialists (right), edge thickness = volume. Filter by minimum referral volume and
// toggle out-of-network referrals to spot leakage and access bottlenecks.

let containerWidth, canvasWidth = 1000;
let drawHeight = 470;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

const PCPS = [
  { id: 'Dr. Smith' }, { id: 'Dr. Jones' }, { id: 'Dr. Brown' }, { id: 'Dr. Davis' }, { id: 'Dr. Khan' }
];
const SPECS = [
  { id: 'Cardiology', inNet: true }, { id: 'Orthopedics', inNet: true }, { id: 'GI', inNet: true },
  { id: 'Neurology', inNet: false }, { id: 'Dermatology', inNet: true }, { id: 'Endocrine', inNet: false }
];
// referrals: pcp index, spec index, volume
const REF = [
  [0, 0, 60], [0, 1, 45], [0, 2, 30], [0, 3, 25], [0, 4, 20],
  [1, 0, 30], [1, 2, 25], [1, 5, 18], [1, 1, 12],
  [2, 1, 50], [2, 0, 28], [2, 3, 22], [2, 4, 10],
  [3, 2, 35], [3, 5, 30], [3, 0, 15],
  [4, 0, 40], [4, 1, 20], [4, 3, 18], [4, 2, 14]
];
let minSlider, inNetCheck, resetBtn, hoverEdge = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  minSlider = createSlider(0, 50, 15, 1);
  inNetCheck = createCheckbox(' In-network only', false);
  resetBtn = createButton('Reset'); resetBtn.mousePressed(() => { minSlider.value(15); inNetCheck.checked(false); });
  layoutControls();
  describe('Provider referral network: primary-care providers on the left referring to specialists on the right, with edge thickness showing referral volume and an analytics panel highlighting top referrers and out-of-network leakage.', LABEL);
}
function layoutControls() {
  minSlider.position(190, drawHeight + 14); minSlider.size(180);
  inNetCheck.position(margin, drawHeight + 44); inNetCheck.style('font-size', '14px');
  resetBtn.position(margin + 160, drawHeight + 42);
}

function pcpXY(i) { return { x: margin + 130, y: 80 + i * ((drawHeight - 120) / (PCPS.length - 1)) }; }
function specXY(i) { return { x: canvasWidth * 0.55, y: 70 + i * ((drawHeight - 110) / (SPECS.length - 1)) }; }
function visibleRefs() { const mn = minSlider.value(), inOnly = inNetCheck.checked(); return REF.filter(([p, s, v]) => v >= mn && (!inOnly || SPECS[s].inNet)); }

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Provider Referral Network', canvasWidth / 2, 8);
  fill('#445'); textAlign(LEFT, TOP); textSize(12); text('Primary care', margin + 90, 42); text('Specialists', canvasWidth * 0.55 - 30, 42);

  const refs = visibleRefs();
  const sentBy = PCPS.map((_, i) => refs.filter(r => r[0] === i).reduce((a, r) => a + r[2], 0));
  const recvBy = SPECS.map((_, i) => refs.filter(r => r[1] === i).reduce((a, r) => a + r[2], 0));

  // edges
  hoverEdge = -1;
  refs.forEach((r, ri) => {
    const a = pcpXY(r[0]), b = specXY(r[1]);
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    if (dist(mouseX, mouseY, mx, my) < 12) hoverEdge = ri;
    const leak = !SPECS[r[1]].inNet;
    stroke(leak ? color(192, 57, 43, 150) : color(120, 140, 160, 130)); if (hoverEdge === ri) stroke(leak ? '#c0392b' : '#14506b');
    strokeWeight(Math.max(1, r[2] / 12)); line(a.x, a.y, b.x, b.y);
  });

  // PCP nodes
  PCPS.forEach((p, i) => { const xy = pcpXY(i), sz = 22 + sentBy[i] / 6;
    stroke('white'); strokeWeight(1.5); fill('#3b78c3'); circle(xy.x, xy.y, sz);
    noStroke(); fill('#1a2733'); textAlign(RIGHT, CENTER); textSize(11); text(p.id, xy.x - sz / 2 - 4, xy.y);
    fill('#3b78c3'); textSize(9); textAlign(CENTER, CENTER); text(sentBy[i], xy.x, xy.y); });
  // Specialist nodes
  SPECS.forEach((s, i) => { const xy = specXY(i), sz = 22 + recvBy[i] / 6;
    stroke('white'); strokeWeight(1.5); fill(s.inNet ? '#e8821a' : '#c0392b'); circle(xy.x, xy.y, sz);
    noStroke(); fill('#1a2733'); textAlign(LEFT, CENTER); textSize(11); text(s.id + (s.inNet ? '' : ' (out)'), xy.x + sz / 2 + 4, xy.y);
    fill('white'); textSize(9); textAlign(CENTER, CENTER); text(recvBy[i], xy.x, xy.y); });

  // analytics panel
  const px = canvasWidth * 0.74, pw = canvasWidth - px - margin, py = 60;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, py, pw, drawHeight - py - 16, 6); noStroke();
  fill('#14506b'); textAlign(LEFT, TOP); textSize(13); textStyle(BOLD); text('Network analytics', px + 12, py + 8); textStyle(NORMAL);
  const totalRef = refs.reduce((a, r) => a + r[2], 0);
  const leakRef = refs.filter(r => !SPECS[r[1]].inNet).reduce((a, r) => a + r[2], 0);
  const topPCP = sentBy.map((v, i) => ({ i, v })).sort((a, b) => b.v - a.v)[0];
  const topSpec = recvBy.map((v, i) => ({ i, v })).sort((a, b) => b.v - a.v)[0];
  let y = py + 32; fill('#333'); textSize(12);
  const row = (l, v, c) => { fill('#445'); text(l, px + 12, y); fill(c || '#111'); textAlign(LEFT, TOP); text(v, px + 12, y + 15, pw - 24); y += 42; textAlign(LEFT, TOP); };
  row('Visible referrals', totalRef + ' / yr');
  row('Out-of-network leakage', leakRef + ' (' + (totalRef ? Math.round(leakRef / totalRef * 100) : 0) + '%)', leakRef ? '#c0392b' : '#1c7a30');
  row('Top referrer', PCPS[topPCP.i].id + ' (' + topPCP.v + ')');
  row('Busiest specialist', SPECS[topSpec.i].id + ' (' + topSpec.v + ')');
  if (hoverEdge >= 0) { const r = refs[hoverEdge]; fill('#14506b'); textSize(11.5); text('Selected: ' + PCPS[r[0]].id + ' → ' + SPECS[r[1]].id + '  (' + r[2] + ' referrals/yr)', px + 12, y, pw - 24); }

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(13); noStroke();
  text('Min referral volume: ' + minSlider.value(), margin, drawHeight + 22);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
