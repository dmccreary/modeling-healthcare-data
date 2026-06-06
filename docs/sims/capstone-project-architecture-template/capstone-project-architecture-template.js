// Capstone Project Architecture Template - p5.js
// CANVAS_HEIGHT: 616
// A reference architecture students can adapt for a graph-based healthcare capstone:
// four tiers from data sources up to the user interface, around a graph database, with
// cross-cutting security/governance and DevOps concerns.

let containerWidth, canvasWidth = 980;
let drawHeight = 530;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 18;
let defaultTextSize = 16;

const TIERS = [
  { name: 'User Interface Tier', bg: '#eaf2fb', comps: [['Web Dashboard (React/Vue)', '#cfe0fb'], ['Visualization (vis-network, Chart.js)', '#cfe0fb'], ['REST / GraphQL API', '#dfe3e8']] },
  { name: 'Application Logic Tier', bg: '#f3eefb', comps: [['Query Orchestration', '#e3d3f5'], ['Analytics & RBAC Services', '#e3d3f5'], ['ETL / Event Processor', '#f2dca0'], ['Embeddings + LLM / Vector Search', '#bfe3d8']] },
  { name: 'Data Tier', bg: '#e8f0f8', comps: [['Graph DB (Neo4j / TigerGraph)', '#bcd6ef'], ['Vector DB (Weaviate / Pinecone)', '#cdeccd'], ['Cache (Redis)', '#dfe3e8']] },
  { name: 'Data Sources', bg: '#f1f3f5', comps: [['Synthea synthetic patients', '#e7eaee'], ['CMS public datasets', '#e7eaee'], ['RxNorm / NDC drug data', '#e7eaee'], ['Custom test data', '#e7eaee']] }
];
const CROSS = ['Security & RBAC', 'Audit & Lineage', 'HIPAA Compliance', 'CI/CD & DevOps'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Capstone project reference architecture: four tiers — user interface, application logic, data, and data sources — built around a graph database, with cross-cutting security, governance, and DevOps concerns on the right.', LABEL);
  noLoop();
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Capstone Reference Architecture', canvasWidth / 2, 8);

  const top = 40, crossW = 150, leftW = canvasWidth - 2 * margin - crossW - 10;
  const bandH = (drawHeight - top - 14) / TIERS.length;
  TIERS.forEach((L, li) => {
    const y = top + li * bandH;
    noStroke(); fill(L.bg); rect(margin, y + 3, leftW, bandH - 6, 6);
    fill('#445'); textAlign(LEFT, TOP); textSize(11.5); textStyle(BOLD); text(L.name, margin + 8, y + 7); textStyle(NORMAL);
    const n = L.comps.length, pad = 10, cw = (leftW - pad * (n + 1)) / n, ch = bandH - 34;
    L.comps.forEach(([label, col], ci) => {
      const cx = margin + pad + ci * (cw + pad), cy = y + 26;
      stroke('#aab4bd'); strokeWeight(1); fill(col); rect(cx, cy, cw, ch, 5);
      noStroke(); fill('#1a2733'); textAlign(CENTER, CENTER); textSize(11); text(label, cx + 4, cy + ch / 2, cw - 8);
    });
    if (li < TIERS.length - 1) { stroke('#7a8a99'); strokeWeight(1.5); const ax = margin + leftW / 2, ay = y + bandH - 3; line(ax, ay - 1, ax, ay + 5); fill('#7a8a99'); noStroke(); triangle(ax, ay + 7, ax - 4, ay + 1, ax + 4, ay + 1); }
  });

  const gx = margin + leftW + 10, gy = top + 3, gh = drawHeight - top - 18;
  stroke('#9aa6b0'); strokeWeight(1.5); fill('#fbf2e0'); rect(gx, gy, crossW, gh, 6); noStroke();
  fill('#7a5a10'); textAlign(CENTER, TOP); textStyle(BOLD); textSize(12); text('Cross-Cutting', gx + crossW / 2, gy + 8); textStyle(NORMAL);
  CROSS.forEach((g, i) => {
    const yy = gy + 38 + i * ((gh - 48) / CROSS.length);
    stroke('#c9a44a'); fill('#f6e6c4'); rect(gx + 10, yy, crossW - 20, (gh - 48) / CROSS.length - 8, 5);
    noStroke(); fill('#5a4410'); textAlign(CENTER, CENTER); textSize(11); text(g, gx + 12, yy + ((gh - 48) / CROSS.length - 8) / 2, crossW - 24);
  });

  fill('#15334d'); textAlign(CENTER, TOP); textSize(11);
  text('Adapt this stack to your capstone: pick a free graph DB, ingest open data, add analytics/AI, and expose it through a dashboard.', canvasWidth / 2, drawHeight - 16);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
