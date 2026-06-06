// Risk Stratification Pyramid & Intervention Strategies - p5.js
// CANVAS_HEIGHT: 576
// Population risk distribution as a four-tier pyramid, each tier paired with its
// intervention strategy, typical cost per patient per year, and the graph signals
// that identify it.

let containerWidth, canvasWidth = 980;
let drawHeight = 490;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

const TIERS = [ // top to bottom
  { name: 'Highest Risk', pop: 2, color: '#b03020', strat: 'Complex Care / Catastrophic Management', actions: 'Multidisciplinary team, palliative options, 24/7 access, intensive coordination', cost: '$25k+ / yr', signals: 'Many active conditions, frequent admissions, very high cost' },
  { name: 'High Risk', pop: 10, color: '#e8821a', strat: 'Intensive Case Management', actions: 'Dedicated care manager, home visits, social services, weekly contact', cost: '$5k–15k / yr', signals: 'Complex conditions, frequent utilization, poor control' },
  { name: 'Moderate Risk', pop: 23, color: '#d4a017', strat: 'Proactive Disease Management', actions: 'Care coordination, chronic-disease programs, medication management, quarterly visits', cost: '$1.5k–3k / yr', signals: '2–3 chronic conditions, some non-adherence, occasional hospitalizations' },
  { name: 'Low Risk', pop: 65, color: '#2e7d32', strat: 'Population Health Initiatives', actions: 'Wellness programs, preventive screening, education, annual check-ups', cost: '$200–500 / yr', signals: 'Few diagnoses, good adherence, regular preventive care' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Risk stratification pyramid: four tiers from low risk at the wide base to highest risk at the narrow top, each paired with its intervention strategy, cost per patient per year, and the graph signals that identify the tier.', LABEL);
  noLoop();
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Risk Stratification & Intervention Intensity', canvasWidth / 2, 8);

  const top = 50, pyraX = margin + 30, pyraW = canvasWidth * 0.40 - pyraX, apexX = pyraX + pyraW / 2;
  const totalH = drawHeight - top - 30;
  // tier heights proportional to population (so area ~ population)
  let y = top;
  const widthAt = yy => map(yy, top, top + totalH, pyraW * 0.12, pyraW);
  const tierMid = [];
  // pyramid tiers (proportional to population)
  TIERS.forEach((t) => {
    const h = totalH * (t.pop / 100);
    const wTop = widthAt(y), wBot = widthAt(y + h);
    noStroke(); fill(t.color);
    quad(apexX - wTop / 2, y, apexX + wTop / 2, y, apexX + wBot / 2, y + h, apexX - wBot / 2, y + h);
    fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(h > 40 ? 13 : 11);
    if (h > 20) text(t.name + ' (~' + t.pop + '%)', apexX, y + h / 2, wBot - 6);
    tierMid.push(y + h / 2);
    y += h;
  });
  // intervention boxes (equal height, evenly spaced) with connector to their tier
  const bx = canvasWidth * 0.44, bw = canvasWidth - bx - margin, boxH = (totalH - 18) / TIERS.length;
  TIERS.forEach((t, i) => {
    const by = top + i * (boxH + 6);
    stroke(t.color); strokeWeight(1); drawingContext.setLineDash([3, 3]);
    line(apexX + widthAt(tierMid[i]) / 2, tierMid[i], bx, by + boxH / 2); drawingContext.setLineDash([]);
    stroke(t.color); strokeWeight(1.5); fill(lerpColor(color(t.color), color('white'), 0.88));
    rect(bx, by, bw, boxH, 6); noStroke();
    fill(t.color); textAlign(LEFT, TOP); textStyle(BOLD); textSize(12.5); text(t.name + ': ' + t.strat, bx + 10, by + 8, bw - 110); textStyle(NORMAL);
    fill('#15334d'); textAlign(RIGHT, TOP); textSize(12); textStyle(BOLD); text(t.cost, bx + bw - 10, by + 8); textStyle(NORMAL);
    fill('#444'); textAlign(LEFT, TOP); textSize(10.5); text(t.actions, bx + 10, by + 30, bw - 20);
    fill('#777'); textSize(9.5); text('Graph signals: ' + t.signals, bx + 10, by + boxH - 18, bw - 20);
  });

  // y-axis annotation
  push(); translate(margin - 2, top + totalH / 2); rotate(-HALF_PI); noStroke(); fill('#667'); textAlign(CENTER, CENTER); textSize(11);
  text('intervention intensity ↑     population size ↓', 0, 0); pop();
  fill('#15334d'); textAlign(CENTER, TOP); textSize(11.5); textStyle(BOLD);
  text('A small high-risk population drives most cost — graph signals route each tier to the right intervention.', canvasWidth / 2, drawHeight - 18);
  textStyle(NORMAL);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
