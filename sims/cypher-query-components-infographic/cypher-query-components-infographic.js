// Cypher Query Components Infographic - p5.js
// CANVAS_HEIGHT: 634
// Interactive breakdown of a Cypher query's four core clauses (MATCH, WHERE, WITH,
// RETURN) with healthcare examples, color-coded to a complete worked query. Hover a
// clause to highlight it in the full query at the bottom.

let containerWidth, canvasWidth = 900;
let drawHeight = 560;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

const CLAUSES = [
  { kw: 'MATCH', color: '#3b78c3', desc: 'Specify the graph pattern to find.',
    ex: 'MATCH (p:Patient)-[:HAS_DIAGNOSIS]->(d:Disease)', detail: 'Also: OPTIONAL MATCH, variable-length paths (-[:REL*1..3]->)' },
  { kw: 'WHERE', color: '#caa017', desc: 'Filter by property constraints.',
    ex: "WHERE d.icd_code STARTS WITH 'E11' AND p.age > 65", detail: 'Operators: >, <, IN, CONTAINS, STARTS WITH, regex =~' },
  { kw: 'WITH', color: '#7b3fb3', desc: 'Pipeline stages and aggregate.',
    ex: 'WITH p, count(d) AS dx_count WHERE dx_count > 3', detail: 'Aggregations: count(), sum(), avg(), collect()' },
  { kw: 'RETURN', color: '#2e7d32', desc: 'Shape and order the output.',
    ex: 'RETURN p.name, dx_count ORDER BY dx_count DESC', detail: 'Modifiers: DISTINCT, LIMIT, ORDER BY, SKIP' }
];
let hoverIdx = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Cypher query components infographic: four stacked color-coded cards for the MATCH, WHERE, WITH, and RETURN clauses with healthcare examples, and a complete color-coded query that finds elderly patients with multiple chronic conditions.', LABEL);
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Anatomy of a Cypher Query', canvasWidth / 2, 10);
  fill('#667'); textSize(12.5); text('Find elderly patients with multiple chronic conditions', canvasWidth / 2, 36);

  const cardX = margin, cardW = canvasWidth - 2 * margin, cardH = 74, top = 60, gap = 8;
  hoverIdx = -1;
  CLAUSES.forEach((c, i) => {
    const y = top + i * (cardH + gap);
    if (mouseX > cardX && mouseX < cardX + cardW && mouseY > y && mouseY < y + cardH) hoverIdx = i;
    const on = hoverIdx === i;
    stroke(c.color); strokeWeight(on ? 3 : 1.5); fill(on ? lerpColor(color(c.color), color('white'), 0.86) : 'white');
    rect(cardX, y, cardW, cardH, 8);
    // keyword chip
    noStroke(); fill(c.color); rect(cardX + 10, y + 10, 92, 26, 5);
    fill('white'); textAlign(CENTER, CENTER); textSize(15); text(c.kw, cardX + 56, y + 23);
    // description
    fill('#333'); textAlign(LEFT, CENTER); textSize(13); text(c.desc, cardX + 116, y + 22);
    // example code
    fill('#1a2733'); textSize(13); textAlign(LEFT, TOP); textFont('Courier New');
    text(c.ex, cardX + 116, y + 38, cardW - 130); textFont('Arial');
    // detail on hover
    if (on) { fill(c.color); textSize(11.5); textAlign(RIGHT, TOP); text(c.detail, cardX + cardW - 12, y + 10, cardW * 0.4); }
  });

  // complete query (color-coded)
  const qy = top + CLAUSES.length * (cardH + gap) + 4;
  fill('#445'); textAlign(LEFT, TOP); textSize(13); text('Complete query:', cardX, qy);
  stroke('#cdd7e0'); fill('#f6f8fa'); strokeWeight(1); rect(cardX, qy + 20, cardW, 86, 6); noStroke();
  textFont('Courier New'); textSize(13); textAlign(LEFT, TOP);
  let ly = qy + 30;
  CLAUSES.forEach((c, i) => {
    const dim = (hoverIdx >= 0 && hoverIdx !== i);
    fill(dim ? '#bbb' : c.color);
    text(c.ex, cardX + 14, ly, cardW - 28); ly += 18;
  });
  textFont('Arial');
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
