// Cost-Sharing Calculation MicroSim - p5.js
// CANVAS_HEIGHT: 616
// Show how a deductible, copays, coinsurance, and an out-of-pocket maximum interact to
// determine member cost across a plan year. Add services chronologically and watch the
// member's spend accumulate toward the deductible and OOP max.

let containerWidth, canvasWidth = 1000;
let drawHeight = 400;
let controlHeight = 160;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

const SERVICES = {
  'Office Visit (PCP) $150':        { cost: 150, copay: 25 },
  'Office Visit (Specialist) $250': { cost: 250, copay: 50 },
  'ER Visit $2,500':                { cost: 2500, copay: null },
  'Inpatient Stay $18,000':         { cost: 18000, copay: null },
  'MRI Imaging $1,200':             { cost: 1200, copay: null },
  'Generic Rx $25':                 { cost: 25, copay: 10 },
  'Brand Rx $350':                  { cost: 350, copay: 50 }
};
const DEFAULT_SERVICES = ['Office Visit (PCP) $150', 'Office Visit (Specialist) $250', 'MRI Imaging $1,200', 'ER Visit $2,500', 'Inpatient Stay $18,000'];

let dedSlider, oopSlider, coinsSlider, serviceSelect, addBtn, resetBtn;
let added = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  dedSlider = createSlider(500, 5000, 1500, 100);
  oopSlider = createSlider(2000, 15000, 6000, 250);
  coinsSlider = createSlider(0, 50, 20, 1);
  serviceSelect = createSelect(); Object.keys(SERVICES).forEach(o => serviceSelect.option(o));
  addBtn = createButton('Add service'); addBtn.mousePressed(() => added.push(serviceSelect.value()));
  resetBtn = createButton('Reset year'); resetBtn.mousePressed(() => added = []);
  added = [...DEFAULT_SERVICES];
  layoutControls();
  describe('Health insurance cost-sharing calculator: add services across a plan year and see how the deductible, copays, coinsurance, and out-of-pocket maximum split each cost between member and insurer.', LABEL);
}
function layoutControls() {
  const sx = 230;
  dedSlider.position(sx, drawHeight + 12); dedSlider.size(220);
  oopSlider.position(sx, drawHeight + 40); oopSlider.size(220);
  coinsSlider.position(sx, drawHeight + 68); coinsSlider.size(220);
  serviceSelect.position(margin, drawHeight + 100); serviceSelect.style('font-size', '13px');
  addBtn.position(margin + 290, drawHeight + 100);
  resetBtn.position(margin + 390, drawHeight + 100);
}

function compute() {
  const deductible = dedSlider.value(), oopMax = oopSlider.value(), coins = coinsSlider.value() / 100;
  let dedPaid = 0, oopPaid = 0, insPaid = 0;
  const rows = added.map(name => {
    const s = SERVICES[name], C = s.cost, isCopay = s.copay != null;
    let member = 0, remOOP = oopMax - oopPaid;
    if (remOOP <= 0) { member = 0; }
    else {
      let remDed = deductible - dedPaid;
      if (remDed > 0) {
        const toDed = Math.min(C, remDed), pay1 = Math.min(toDed, remOOP);
        member += pay1; dedPaid += pay1; remOOP -= pay1;
        const rest = C - toDed;
        if (rest > 0 && remOOP > 0) { const cs = isCopay ? s.copay : rest * coins; member += Math.min(cs, remOOP); }
      } else { const cs = isCopay ? s.copay : C * coins; member += Math.min(cs, remOOP); }
    }
    oopPaid += member; insPaid += (C - member);
    return { name, cost: C, member };
  });
  return { deductible, oopMax, dedPaid, oopPaid, insPaid, rows };
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Health Plan Cost-Sharing Calculator', canvasWidth / 2, 8);

  const r = compute();
  const barX = margin + 150, barW = canvasWidth * 0.62 - barX - 125;
  // deductible bar
  const drawBar = (label, paid, total, y, col) => {
    fill('#445'); textAlign(RIGHT, CENTER); textSize(12); noStroke(); text(label, barX - 8, y + 11);
    stroke('#ccc'); fill('#eef1f4'); rect(barX, y, barW, 22, 4);
    noStroke(); fill(col); rect(barX, y, barW * Math.min(1, paid / total), 22, 4);
    fill('#333'); textAlign(LEFT, CENTER); textSize(12); text('$' + Math.round(paid).toLocaleString() + ' / $' + total.toLocaleString(), barX + barW + 8, y + 11);
  };
  drawBar('Toward deductible', r.dedPaid, r.deductible, 48, color(214, 158, 20));
  drawBar('Toward OOP max', r.oopPaid, r.oopMax, 80, color(232, 130, 26));
  if (r.dedPaid >= r.deductible) { fill('#1c7a30'); textSize(12); textAlign(LEFT, TOP); text('✓ Deductible satisfied — cost-sharing now applies.', barX, 106); }
  if (r.oopPaid >= r.oopMax) { fill('#c0392b'); textSize(12); textAlign(LEFT, TOP); text('✓ OOP maximum reached — insurance covers 100%.', barX, 122); }

  // service list
  fill('#14506b'); textSize(13); textAlign(LEFT, TOP); text('Services this year (chronological):', margin, 146);
  let y = 166; textSize(12);
  r.rows.forEach(row => {
    fill('#333'); textAlign(LEFT, TOP); text(row.name.replace(/ \$[\d,]+$/, ''), margin, y, 280);
    fill('#c0392b'); textAlign(RIGHT, TOP); text('member $' + Math.round(row.member).toLocaleString(), barX + barW + 60, y);
    y += 20;
  });
  if (!r.rows.length) { fill('#999'); text('No services yet — add one below.', margin, y); }

  // KPI panel
  const px = canvasWidth * 0.64, pw = canvasWidth - px - margin;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, 44, pw, drawHeight - 60, 6); noStroke();
  let ky = 58; textAlign(LEFT, TOP);
  const kpi = (l, v, c) => { fill('#445'); textSize(12.5); text(l, px + 14, ky);
    fill(c || '#111'); textSize(20); textAlign(RIGHT, TOP); text(v, px + pw - 14, ky + 14); textAlign(LEFT, TOP); ky += 56; };
  kpi('Member paid (year)', '$' + Math.round(r.oopPaid).toLocaleString(), '#c0392b');
  kpi('Insurance paid', '$' + Math.round(r.insPaid).toLocaleString(), '#1c7a30');
  kpi('Remaining deductible', '$' + Math.round(Math.max(0, r.deductible - r.dedPaid)).toLocaleString());
  kpi('Remaining to OOP max', '$' + Math.round(Math.max(0, r.oopMax - r.oopPaid)).toLocaleString());
  fill('#667'); textSize(11); text('Premiums are paid separately and do not count toward the OOP maximum.', px + 14, ky, pw - 28);

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(13); noStroke();
  text('Deductible: $' + r.deductible.toLocaleString(), margin, drawHeight + 23);
  text('OOP max: $' + r.oopMax.toLocaleString(), margin, drawHeight + 51);
  text('Coinsurance: ' + coinsSlider.value() + '%', margin, drawHeight + 79);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
