// Vital Signs Trend Visualization MicroSim - p5.js
// CANVAS_HEIGHT: 576
// Demonstrate how time-series vital signs from a graph database reveal chronic-disease
// patterns. Pick a patient and toggle vitals; blood-pressure reference zones (normal,
// elevated, hypertensive) shade the chart so treatment response is visible at a glance.

let containerWidth, canvasWidth = 1000;
let drawHeight = 430;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 24;
let defaultTextSize = 16;

const WEEKS = ['Jan 1','Jan 15','Feb 1','Feb 15','Mar 1','Mar 15','Apr 1','Apr 15','May 1','May 15','Jun 1','Jun 15'];
// patient profiles: arrays of [systolic, diastolic, heartRate]
const PATIENTS = {
  'A — Hypertension, improving': gen([152,150,146,142,138,135,132,130,129,128,127,126], [96,95,92,90,88,86,84,83,82,81,80,80], [82,80,80,78,78,76,76,75,74,74,73,72]),
  'B — Normal, stable':          gen([120,122,118,121,119,120,122,118,120,121,119,120], [78,79,77,78,76,78,79,77,78,77,78,78], [70,72,68,71,69,70,72,70,69,71,70,70]),
  'C — Hypertension, poorly controlled': gen([158,150,162,155,160,165,152,168,158,162,170,160], [98,94,100,96,99,102,95,103,98,100,104,99], [84,80,88,82,86,84,82,88,84,86,84,82]),
  'D — Bradycardia / hypotension': gen([96,98,94,95,92,96,94,93,95,94,96,95], [62,63,60,61,59,62,60,61,60,61,62,61], [50,48,46,49,47,48,46,47,48,46,49,48]),
  'E — Variable BP (non-adherence)': gen([135,118,148,122,155,120,142,160,125,150,128,145], [85,76,92,78,96,77,88,98,79,93,80,90], [78,72,84,74,86,73,80,88,74,84,75,82])
};
function gen(s, d, h) { return s.map((v, i) => ({ sys: v, dia: d[i], hr: h[i] })); }

let patientSelect, sysCheck, diaCheck, hrCheck, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  patientSelect = createSelect();
  Object.keys(PATIENTS).forEach(o => patientSelect.option(o));
  patientSelect.selected('A — Hypertension, improving');
  sysCheck = createCheckbox(' Systolic BP', true);
  diaCheck = createCheckbox(' Diastolic BP', true);
  hrCheck = createCheckbox(' Heart rate', true);
  resetButton = createButton('Reset');
  resetButton.mousePressed(() => { patientSelect.selected('A — Hypertension, improving'); sysCheck.checked(true); diaCheck.checked(true); hrCheck.checked(true); });
  layoutControls();
  describe('Vital signs trend chart: line graphs of systolic and diastolic blood pressure and heart rate over six months for a selected patient, with shaded blood-pressure reference zones.', LABEL);
}

function layoutControls() {
  patientSelect.position(margin + 60, drawHeight + 14); patientSelect.style('font-size', '13px');
  sysCheck.position(margin + 330, drawHeight + 16); sysCheck.style('font-size', '13px');
  diaCheck.position(margin + 460, drawHeight + 16); diaCheck.style('font-size', '13px');
  hrCheck.position(margin + 590, drawHeight + 16); hrCheck.style('font-size', '13px');
  resetButton.position(margin + 60, drawHeight + 50);
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Vital Signs Trends — ' + patientSelect.value().split(' — ')[0], canvasWidth / 2, 8);

  const data = PATIENTS[patientSelect.value()];
  const plotX = margin + 52, plotW = canvasWidth - plotX - 56, plotY = 44, plotH = drawHeight - plotY - 60;
  const bpMin = 80, bpMax = 180, hrMin = 50, hrMax = 120;
  const yBP = v => plotY + plotH - (v - bpMin) / (bpMax - bpMin) * plotH;
  const yHR = v => plotY + plotH - (v - hrMin) / (hrMax - hrMin) * plotH;
  const xAt = i => plotX + i / (WEEKS.length - 1) * plotW;

  // BP reference zones (systolic on left axis)
  noStroke();
  fill(46, 160, 70, 35); rect(plotX, yBP(130), plotW, yBP(110) - yBP(130)); // normal
  fill(245, 200, 40, 40); rect(plotX, yBP(140), plotW, yBP(130) - yBP(140)); // elevated
  fill(220, 70, 60, 30); rect(plotX, yBP(bpMax), plotW, yBP(140) - yBP(bpMax)); // hypertensive

  // axes
  stroke('#bbb'); strokeWeight(1); line(plotX, plotY, plotX, plotY + plotH); line(plotX, plotY + plotH, plotX + plotW, plotY + plotH);
  line(plotX + plotW, plotY, plotX + plotW, plotY + plotH);
  noStroke(); fill('#445'); textSize(10); textAlign(RIGHT, CENTER);
  for (let v = 80; v <= 180; v += 20) text(v, plotX - 6, yBP(v));
  textAlign(LEFT, CENTER); fill('#c0392b');
  for (let v = 50; v <= 120; v += 10) text(v, plotX + plotW + 6, yHR(v));
  fill('#445'); textAlign(CENTER, TOP); textSize(10);
  for (let i = 0; i < WEEKS.length; i += 2) text(WEEKS[i], xAt(i), plotY + plotH + 6);
  push(); translate(plotX - 38, plotY + plotH / 2); rotate(-HALF_PI); textAlign(CENTER, CENTER); fill('#3b78c3'); text('Blood pressure (mmHg)', 0, 0); pop();
  push(); translate(plotX + plotW + 40, plotY + plotH / 2); rotate(HALF_PI); textAlign(CENTER, CENTER); fill('#c0392b'); text('Heart rate (bpm)', 0, 0); pop();

  const drawLine = (key, yfn, col) => {
    stroke(col); strokeWeight(2); noFill(); beginShape();
    data.forEach((d, i) => vertex(xAt(i), yfn(d[key]))); endShape();
    fill(col); noStroke(); data.forEach((d, i) => circle(xAt(i), yfn(d[key]), 6));
  };
  if (sysCheck.checked()) drawLine('sys', yBP, color(59, 120, 195));
  if (diaCheck.checked()) drawLine('dia', yBP, color(46, 139, 87));
  if (hrCheck.checked()) drawLine('hr', yHR, color(192, 57, 43));

  // hover tooltip (nearest point)
  if (mouseX > plotX && mouseX < plotX + plotW && mouseY > plotY && mouseY < plotY + plotH) {
    const i = Math.round((mouseX - plotX) / plotW * (WEEKS.length - 1));
    if (i >= 0 && i < data.length) {
      const d = data[i], tx = xAt(i);
      stroke('#999'); strokeWeight(1); line(tx, plotY, tx, plotY + plotH); noStroke();
      fill('white'); stroke('#bbb'); rect(Math.min(tx + 8, plotX + plotW - 120), plotY + 6, 116, 60, 4); noStroke();
      fill('#333'); textAlign(LEFT, TOP); textSize(11);
      const bx = Math.min(tx + 14, plotX + plotW - 114);
      text(WEEKS[i], bx, plotY + 10);
      fill('#3b78c3'); text('Sys ' + d.sys + '  Dia ' + d.dia, bx, plotY + 26);
      fill('#c0392b'); text('HR ' + d.hr + ' bpm', bx, plotY + 44);
    }
  }

  // legend / zone key
  textAlign(LEFT, CENTER); textSize(11); noStroke();
  fill(46, 160, 70, 120); rect(plotX, plotY + plotH + 24, 14, 10); fill('#445'); text('normal', plotX + 18, plotY + plotH + 29);
  fill(245, 200, 40, 150); rect(plotX + 80, plotY + plotH + 24, 14, 10); fill('#445'); text('elevated', plotX + 98, plotY + plotH + 29);
  fill(220, 70, 60, 110); rect(plotX + 170, plotY + plotH + 24, 14, 10); fill('#445'); text('hypertensive (systolic)', plotX + 188, plotY + plotH + 29);

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(14);
  text('Patient:', margin, drawHeight + 26);
  text('Vitals:', margin + 280, drawHeight + 26);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
