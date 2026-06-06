// Audit Trail Analysis MicroSim - p5.js
// CANVAS_HEIGHT: 616
// Graph-based audit-trail analysis: users (squares) accessing patient records (circles)
// in two wards. Cross-ward access is unusual; a user who snoops across wards is flagged.
// Click a user to highlight their access pattern.

let containerWidth, canvasWidth = 1000;
let drawHeight = 470;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

// 12 patients in 2 wards
const PATIENTS = Array.from({ length: 12 }, (_, i) => ({ id: 'P-' + (1000 + i), ward: i < 6 ? 'A' : 'B' }));
// users: ward assignment + accessed patient indices
const USERS = [
  { id: 'DR-Chen', ward: 'A', acc: [0, 1, 2, 3] },
  { id: 'RN-Park', ward: 'A', acc: [1, 2, 4, 5] },
  { id: 'DR-Adams', ward: 'B', acc: [6, 7, 8] },
  { id: 'RN-Diaz', ward: 'B', acc: [8, 9, 10, 11] },
  { id: 'RN-Snoop', ward: 'A', acc: [0, 3, 6, 7, 9, 10, 11] }, // cross-ward snooping
  { id: 'DR-Khan', ward: 'B', acc: [7, 9, 11] }
];
let selected = -1, showThreshChk, resetBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  showThreshChk = createCheckbox(' Highlight cross-ward (unusual) access', true);
  resetBtn = createButton('Reset'); resetBtn.mousePressed(() => { selected = -1; });
  layoutControls();
  describe('Audit trail analysis: a graph of users accessing patient records across two wards, with cross-ward access flagged as unusual; one user shows a snooping pattern accessing many patients outside their ward.', LABEL);
}
function layoutControls() { showThreshChk.position(margin, drawHeight + 16); showThreshChk.style('font-size', '14px'); resetBtn.position(margin + 320, drawHeight + 14); }

function pPos(i) { const ward = PATIENTS[i].ward; const k = ward === 'A' ? i : i - 6; const cx = canvasWidth * (ward === 'A' ? 0.34 : 0.62); return { x: cx + (k % 2) * 70 - 35, y: 90 + Math.floor(k / 2) * 80 }; }
function uPos(i) { const left = i < 3; const k = i % 3; return { x: left ? margin + 60 : canvasWidth * 0.74, y: 100 + k * 130 }; }

function userRisk(u) { const cross = u.acc.filter(p => PATIENTS[p].ward !== u.ward).length; return cross >= 4 ? 'violation' : cross >= 1 ? 'suspicious' : 'normal'; }
const RISKCOL = { normal: '#3b78c3', suspicious: '#e8821a', violation: '#c0392b' };

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Audit Trail: Who Accessed Which Patient?', canvasWidth / 2, 8);
  // ward labels
  fill('#3b78c3'); textAlign(CENTER, TOP); textSize(12); textStyle(BOLD); text('Ward A', canvasWidth * 0.34, 44); fill('#2e7d32'); text('Ward B', canvasWidth * 0.62, 44); textStyle(NORMAL);

  const showCross = showThreshChk.checked();
  // access edges
  USERS.forEach((u, ui) => {
    if (selected >= 0 && selected !== ui) return;
    const up = uPos(ui);
    u.acc.forEach(p => { const pp = pPos(p), cross = PATIENTS[p].ward !== u.ward;
      stroke(cross && showCross ? color(192, 57, 43, selected === ui ? 220 : 120) : color(120, 160, 120, selected === ui ? 200 : 70));
      strokeWeight(cross && showCross ? 2 : 1.2); line(up.x, up.y, pp.x, pp.y); });
  });
  // patients
  PATIENTS.forEach((p, i) => { const pp = pPos(i);
    stroke('white'); strokeWeight(1.5); fill(p.ward === 'A' ? '#cfe0fb' : '#cdeccd'); circle(pp.x, pp.y, 30);
    noStroke(); fill('#1a2733'); textAlign(CENTER, CENTER); textSize(8); text(p.id, pp.x - 15, pp.y, 30); });
  // users
  USERS.forEach((u, ui) => { const up = uPos(ui), risk = userRisk(u), on = selected === ui;
    stroke(on ? '#111' : 'white'); strokeWeight(on ? 3 : 1.5); fill(RISKCOL[risk]);
    rect(up.x - 30, up.y - 20, 60, 40, 6);
    noStroke(); fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(9.5); text(u.id, up.x - 30, up.y - 4, 60); textStyle(NORMAL);
    textSize(8); text(u.acc.length + ' accesses', up.x, up.y + 11); });

  // detect click target for hover (we use selected on click)
  // investigation panel
  const px = canvasWidth * 0.40, pw = canvasWidth * 0.20;
  fill('#15334d'); textAlign(CENTER, TOP); textSize(11);
  const flagged = USERS.filter(u => userRisk(u) !== 'normal');
  if (selected >= 0) {
    const u = USERS[selected], cross = u.acc.filter(p => PATIENTS[p].ward !== u.ward).length;
    text(u.id + ' (Ward ' + u.ward + '): ' + u.acc.length + ' accesses, ' + cross + ' cross-ward → ' + userRisk(u).toUpperCase(), canvasWidth / 2, drawHeight - 28);
  } else {
    text(flagged.length + ' user(s) flagged for cross-ward access. RN-Snoop accessed 6 patients outside Ward A — a privacy violation. Click a user to inspect.', margin, drawHeight - 28, canvasWidth - 2 * margin);
  }

  // legend
  let lx = margin, ly = drawHeight - 8; textAlign(LEFT, CENTER); textSize(11);
  [['authorized (same ward)', '#7aa37a'], ['cross-ward (unusual)', '#c0392b']].forEach(([t, c]) => { stroke(c); strokeWeight(2.5); line(lx, ly, lx + 20, ly); noStroke(); fill('#445'); text(t, lx + 24, ly); lx += t.length * 6.2 + 44; });

  fill('black'); textAlign(LEFT, CENTER); textSize(13); noStroke();
}

function mousePressed() {
  let hit = -1; USERS.forEach((u, i) => { const up = uPos(i); if (mouseX > up.x - 30 && mouseX < up.x + 30 && mouseY > up.y - 20 && mouseY < up.y + 20) hit = i; });
  selected = (hit === selected) ? -1 : hit;
}
function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
