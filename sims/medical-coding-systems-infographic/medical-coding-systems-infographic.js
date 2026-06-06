// Medical Coding Systems Infographic - p5.js
// CANVAS_HEIGHT: 596
// Hub-and-spoke overview of the major medical coding systems (ICD, CPT, HCPCS, NDC,
// LOINC, SNOMED CT). Hover or click a system to read its governing body, purpose, and
// an example code in the detail panel.

let containerWidth, canvasWidth = 960;
let drawHeight = 510;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;

const SYS = [
  { ab: 'ICD-10', color: '#c0392b', name: 'International Classification of Diseases', gov: 'WHO (U.S.: CMS/NCHS)', purpose: 'Classify diagnoses, injuries, and causes of death.', struct: '3–7 character hierarchical codes', ex: 'E11.9 = Type 2 diabetes, no complications', use: 'Claims, epidemiology, quality, mortality' },
  { ab: 'CPT', color: '#3b78c3', name: 'Current Procedural Terminology', gov: 'American Medical Association (AMA)', purpose: 'Describe physician services and procedures.', struct: '5-digit codes + 2-digit modifiers', ex: '99213 = Office visit, established, level 3', use: 'Professional fee billing, utilization' },
  { ab: 'HCPCS', color: '#2e7d32', name: 'Healthcare Common Procedure Coding System', gov: 'Centers for Medicare & Medicaid (CMS)', purpose: 'Supplies, equipment, drugs, transport not in CPT.', struct: 'Level I = CPT; Level II = A–V codes', ex: 'E0163 = Commode chair', use: 'Medicare/Medicaid billing, DME' },
  { ab: 'NDC', color: '#7b3fb3', name: 'National Drug Code', gov: 'U.S. FDA', purpose: 'Uniquely identify drug products.', struct: '10–11 digits: labeler-product-package', ex: '0071-0155-23 = Lipitor 20mg, 90 tabs', use: 'Pharmacy billing, formulary, DUR' },
  { ab: 'LOINC', color: '#e8821a', name: 'Logical Observation Identifiers Names & Codes', gov: 'Regenstrief Institute', purpose: 'Identify lab and clinical observations.', struct: 'Numeric codes with six-part names', ex: '2339-0 = Glucose [Mass/volume] in Blood', use: 'Lab result exchange, vitals' },
  { ab: 'SNOMED', color: '#1f8a8a', name: 'Systematized Nomenclature of Medicine — Clinical Terms (SNOMED CT)', gov: 'SNOMED International (IHTSDO)', purpose: 'Comprehensive clinical terminology/ontology.', struct: 'Concept codes with hierarchy', ex: '44054006 = Diabetes mellitus type 2', use: 'EHR documentation, decision support' }
];
// related pairs [i,j,solid?]
const RELS = [[1, 2, true], [0, 5, false], [3, 2, false], [0, 1, false]];
let selected = 0, hover = -1;
let hubX, hubY, R, nodePts = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Medical coding systems hub-and-spoke infographic: ICD, CPT, HCPCS, NDC, LOINC, and SNOMED CT radiating from a center, each selectable to show its governing body, purpose, structure, and an example code.', LABEL);
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Major Medical Coding Systems', canvasWidth / 2, 8);

  hubX = canvasWidth * 0.30; hubY = drawHeight * 0.54; R = Math.min(150, drawHeight * 0.34);
  nodePts = SYS.map((s, i) => { const a = -PI / 2 + i * TWO_PI / SYS.length; return { x: hubX + Math.cos(a) * R, y: hubY + Math.sin(a) * R }; });

  // relationship connectors
  RELS.forEach(([i, j, solid]) => {
    stroke('#c9d2da'); strokeWeight(1.5);
    if (!solid) drawingContext.setLineDash([4, 4]);
    line(nodePts[i].x, nodePts[i].y, nodePts[j].x, nodePts[j].y);
    drawingContext.setLineDash([]);
  });
  // spokes
  stroke('#dde3e8'); strokeWeight(1.5);
  nodePts.forEach(p => line(hubX, hubY, p.x, p.y));

  // hub
  noStroke(); fill('#34495e'); circle(hubX, hubY, 84);
  fill('white'); textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD); text('Coding\nSystems', hubX, hubY); textStyle(NORMAL);

  // nodes
  hover = -1;
  nodePts.forEach((p, i) => { if (dist(mouseX, mouseY, p.x, p.y) < 34) hover = i; });
  nodePts.forEach((p, i) => {
    const on = (i === selected || i === hover);
    stroke(on ? '#111' : 'white'); strokeWeight(on ? 3 : 1.5); fill(SYS[i].color);
    circle(p.x, p.y, on ? 64 : 56);
    noStroke(); fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(SYS[i].ab.length > 5 ? 11 : 13);
    text(SYS[i].ab, p.x, p.y); textStyle(NORMAL);
  });

  // detail panel
  const s = SYS[hover >= 0 ? hover : selected];
  const px = canvasWidth * 0.58, pw = canvasWidth - px - margin, py = 44;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, py, pw, drawHeight - py - 20, 6); noStroke();
  fill(s.color); rect(px, py, pw, 6); // top accent
  fill(s.color); textAlign(LEFT, TOP); textStyle(BOLD); textSize(18); text(s.ab, px + 14, py + 16); textStyle(NORMAL);
  fill('#333'); textSize(12.5); text(s.name, px + 14, py + 42, pw - 28);
  let y = py + 86;
  const row = (l, v) => { fill('#14506b'); textStyle(BOLD); textSize(11.5); text(l, px + 14, y); textStyle(NORMAL);
    fill('#333'); textSize(12.5); text(v, px + 14, y + 15, pw - 28); y += 52; };
  row('Governing body', s.gov);
  row('Purpose', s.purpose);
  row('Structure', s.struct);
  row('Example', s.ex);
  row('Used for', s.use);

  // annotation
  fill('#15334d'); textAlign(CENTER, TOP); textSize(11.5); textStyle(BOLD);
  text('Multiple coding systems often describe the same clinical concept — a graph can map relationships among them.', canvasWidth / 2, drawHeight - 18);
  textStyle(NORMAL);
}

function mousePressed() { if (hover >= 0) selected = hover; }
function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
