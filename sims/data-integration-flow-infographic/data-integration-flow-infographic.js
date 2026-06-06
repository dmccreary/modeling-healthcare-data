// Data Integration Flow Infographic - p5.js
// CANVAS_HEIGHT: 634
// How eight source systems feed a central healthcare knowledge graph using different
// integration patterns (CDC stream, batch ETL, API, HL7, Kafka, federated query,
// lookup, manual). Hover a source to see its data types and update frequency.

let containerWidth, canvasWidth = 960;
let drawHeight = 530;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 18;
let defaultTextSize = 16;

const SOURCES = [
  { name: 'EHR System', color: '#e07b9a', pattern: 'CDC Stream', data: 'Encounters, diagnoses, notes, orders', freq: 'Real-time (change data capture)' },
  { name: 'Claims Processor', color: '#e8821a', pattern: 'Batch ETL (nightly)', data: 'Claims, adjudication, payments', freq: 'Nightly batch' },
  { name: 'Pharmacy System', color: '#2e7d32', pattern: 'API Calls', data: 'Prescriptions, fills, formulary', freq: 'On demand (API)' },
  { name: 'Lab System', color: '#7b3fb3', pattern: 'HL7 Messages', data: 'Lab orders and results', freq: 'Event-driven (HL7)' },
  { name: 'ADT System', color: '#3b78c3', pattern: 'Kafka Events', data: 'Admit / discharge / transfer', freq: 'Real-time (event stream)' },
  { name: 'FHIR Server', color: '#1f8a8a', pattern: 'Federated Query', data: 'FHIR resources on demand', freq: 'Query-time (federated)' },
  { name: 'Reference Data', color: '#8893a0', pattern: 'Lookup API', data: 'Code sets, terminologies', freq: 'Periodic refresh' },
  { name: 'Social Services', color: '#caa017', pattern: 'Manual Upload', data: 'SDOH, housing, food security', freq: 'Manual / ad hoc' }
];
let hub, pts = [], hover = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Data integration flow: a central healthcare knowledge graph surrounded by eight source systems, each connected with a labeled integration pattern; hovering a source shows the data it provides and its update frequency.', LABEL);
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Feeding the Healthcare Knowledge Graph', canvasWidth / 2, 8);

  hub = { x: canvasWidth * 0.36, y: drawHeight * 0.52 };
  const R = Math.min(190, drawHeight * 0.40);
  pts = SOURCES.map((s, i) => { const a = -PI / 2 + i * TWO_PI / SOURCES.length; return { x: hub.x + Math.cos(a) * R, y: hub.y + Math.sin(a) * R }; });

  hover = -1;
  pts.forEach((p, i) => { if (dist(mouseX, mouseY, p.x, p.y) < 40) hover = i; });

  // connections
  SOURCES.forEach((s, i) => {
    const p = pts[i], on = hover === i;
    const c = color(s.color); if (!on && hover >= 0) c.setAlpha(70);
    stroke(c); strokeWeight(on ? 3.5 : 2.2); line(p.x, p.y, hub.x, hub.y);
    // pattern label near source
    noStroke(); fill(on ? '#222' : '#888'); textAlign(CENTER, CENTER); textSize(9.5);
    const lx = (p.x + hub.x) / 2, ly = (p.y + hub.y) / 2;
    fill('white'); rectMode(CENTER); rect(lx, ly, textWidth(s.pattern) + 6, 13, 3); rectMode(CORNER);
    fill(on ? s.color : '#889'); text(s.pattern, lx, ly);
  });

  // source nodes
  pts.forEach((p, i) => {
    const on = hover === i;
    stroke(on ? '#111' : 'white'); strokeWeight(on ? 3 : 1.5); fill(SOURCES[i].color);
    rect(p.x - 58, p.y - 20, 116, 40, 8);
    noStroke(); fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(10.5); text(SOURCES[i].name, p.x - 58, p.y, 116); textStyle(NORMAL);
  });

  // hub (gold)
  noStroke(); fill('#d4a017'); circle(hub.x, hub.y, 96);
  fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(12); text('Healthcare\nKnowledge\nGraph', hub.x, hub.y); textStyle(NORMAL);

  // detail panel
  const px = canvasWidth * 0.71, pw = canvasWidth - px - margin, py = 46;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, py, pw, drawHeight - py - 56, 6); noStroke();
  if (hover >= 0) {
    const s = SOURCES[hover];
    fill(s.color); rect(px, py, pw, 6);
    fill(s.color); textAlign(LEFT, TOP); textStyle(BOLD); textSize(15); text(s.name, px + 12, py + 16); textStyle(NORMAL);
    let y = py + 46;
    const row = (l, v) => { fill('#14506b'); textStyle(BOLD); textSize(11.5); text(l, px + 12, y); textStyle(NORMAL); fill('#333'); textSize(12); text(v, px + 12, y + 15, pw - 24); y += 50; };
    row('Integration pattern', s.pattern);
    row('Data provided', s.data);
    row('Update frequency', s.freq);
  } else {
    fill('#667'); textAlign(LEFT, TOP); textSize(12.5); text('Hover a source system to see what data it provides, how often it updates, and which integration pattern it uses.', px + 12, py + 16, pw - 24);
  }

  // stats footer
  fill('#15334d'); textAlign(LEFT, BOTTOM); textSize(11); textStyle(BOLD);
  text('2 real-time streams (EHR CDC, ADT Kafka) · 1 nightly batch · 3 query/API · avg ingest latency: seconds–hours by pattern.', margin, drawHeight - 8);
  textStyle(NORMAL);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
