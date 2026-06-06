// Healthcare Analytics Platform Architecture Diagram - p5.js
// CANVAS_HEIGHT: 616
// The multi-layer architecture of a graph-based healthcare analytics platform: from
// source systems up through ingestion, the graph database core, analytics/AI, and the
// presentation layer, with a governance framework spanning every layer.

let containerWidth, canvasWidth = 960;
let drawHeight = 530;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 18;
let defaultTextSize = 16;

const LAYERS = [
  { name: 'Presentation Layer', bg: '#eaf2fb', comps: [['Clinician Dashboard', '#f3c6d6'], ['Administrator Portal', '#cfe0fb'], ['Analyst Workbench', '#ffe0b3'], ['API Gateway', '#dfe3e8']] },
  { name: 'Analytics & AI Layer', bg: '#f3eefb', comps: [['Graph Analytics Engine', '#f2dca0'], ['Vector Store', '#cdeccd'], ['LLM Integration', '#e3d3f5'], ['ML Models', '#bfe3d8']] },
  { name: 'Graph Database Core', bg: '#e8f0f8', comps: [['Patient subgraph', '#cfe0fb'], ['Provider subgraph', '#bcd6ef'], ['Payer subgraph', '#a9c9ea']], core: true },
  { name: 'Data Ingestion Layer', bg: '#eef4ea', comps: [['EHR Connector', '#f3c6d6'], ['Claims Interface', '#ffe0b3'], ['Pharmacy Connector', '#cdeccd'], ['Lab Interface', '#e3d3f5']] },
  { name: 'Source Systems', bg: '#f1f3f5', comps: [['Epic EHR', '#e7eaee'], ['Claims Database', '#e7eaee'], ['Pharmacy System', '#e7eaee'], ['Lab System', '#e7eaee']] }
];
const GOV = ['RBAC Module', 'Audit Logger', 'Lineage Tracker', 'HIPAA Compliance'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Healthcare analytics platform architecture: five stacked layers from source systems up to the presentation layer, built around a graph database core, with a governance framework spanning all layers.', LABEL);
  noLoop();
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Graph-Based Healthcare Analytics Platform', canvasWidth / 2, 8);

  const top = 40, govW = 150, leftW = canvasWidth - 2 * margin - govW - 10;
  const bandH = (drawHeight - top - 12) / LAYERS.length;
  LAYERS.forEach((L, li) => {
    const y = top + li * bandH;
    noStroke(); fill(L.bg); rect(margin, y + 3, leftW, bandH - 6, 6);
    fill('#445'); textAlign(LEFT, TOP); textSize(11.5); textStyle(BOLD); text(L.name, margin + 8, y + 7); textStyle(NORMAL);
    const n = L.comps.length, pad = 10, cw = (leftW - pad * (n + 1)) / n, ch = bandH - 34;
    L.comps.forEach(([label, col], ci) => {
      const cx = margin + pad + ci * (cw + pad), cy = y + 26;
      stroke('#aab4bd'); strokeWeight(1); fill(col); rect(cx, cy, cw, ch, 5);
      noStroke(); fill('#1a2733'); textAlign(CENTER, CENTER); textSize(11.5); text(label, cx + 4, cy + ch / 2, cw - 8);
    });
    // inter-layer arrows (down the center between bands)
    if (li < LAYERS.length - 1) {
      stroke('#7a8a99'); strokeWeight(1.5); const ax = margin + leftW / 2, ay = y + bandH - 3;
      line(ax, ay - 1, ax, ay + 5); fill('#7a8a99'); noStroke(); triangle(ax, ay + 7, ax - 4, ay + 1, ax + 4, ay + 1);
    }
  });

  // governance sidebar spanning all layers
  const gx = margin + leftW + 10, gy = top + 3, gh = drawHeight - top - 18;
  stroke('#9aa6b0'); strokeWeight(1.5); fill('#fbf2e0'); rect(gx, gy, govW, gh, 6); noStroke();
  fill('#7a5a10'); textAlign(CENTER, TOP); textStyle(BOLD); textSize(12); text('Governance', gx + govW / 2, gy + 8);
  text('Framework', gx + govW / 2, gy + 24); textStyle(NORMAL);
  GOV.forEach((g, i) => {
    const yy = gy + 50 + i * ((gh - 60) / GOV.length);
    stroke('#c9a44a'); fill('#f6e6c4'); rect(gx + 10, yy, govW - 20, (gh - 60) / GOV.length - 8, 5);
    noStroke(); fill('#5a4410'); textAlign(CENTER, CENTER); textSize(11); text(g, gx + 12, yy + ((gh - 60) / GOV.length - 8) / 2, govW - 24);
  });

  // footer note
  fill('#15334d'); textAlign(CENTER, TOP); textSize(11.5);
  text('Data flows up from source systems through the graph core to analytics and dashboards; governance applies at every layer.', canvasWidth / 2, drawHeight - 16);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
