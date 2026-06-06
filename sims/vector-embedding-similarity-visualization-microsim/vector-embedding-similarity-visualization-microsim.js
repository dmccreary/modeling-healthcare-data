// Vector Embedding Similarity Visualization MicroSim - p5.js
// CANVAS_HEIGHT: 616
// Show how medical concepts sit in a 2-D embedding space by semantic similarity, and
// how a similarity search finds the nearest concepts to a clinical query, with a
// tunable number of neighbors and a similarity threshold.

let containerWidth, canvasWidth = 1000;
let drawHeight = 430;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

const CLUSTERS = { cardio: '#c0392b', resp: '#2b6cb0', neuro: '#2e7d32', metab: '#caa017' };
const CONCEPTS = [
  ['myocardial infarction', 'cardio', .22, .26], ['cardiac arrest', 'cardio', .30, .20], ['angina', 'cardio', .18, .34],
  ['heart failure', 'cardio', .28, .36], ['hypertension', 'cardio', .12, .24],
  ['asthma', 'resp', .72, .24], ['COPD', 'resp', .80, .30], ['pneumonia', 'resp', .68, .34],
  ['dyspnea', 'resp', .62, .22], ['pulmonary embolism', 'resp', .78, .18],
  ['stroke', 'neuro', .22, .70], ['migraine', 'neuro', .14, .64], ['seizure', 'neuro', .30, .76],
  ['headache', 'neuro', .18, .78], ['neuropathy', 'neuro', .30, .62],
  ['diabetes', 'metab', .72, .72], ['hyperglycemia', 'metab', .80, .66], ['hypoglycemia', 'metab', .66, .66],
  ['obesity', 'metab', .76, .80], ['thyroid disorder', 'metab', .64, .78]
];
const QUERIES = {
  'Chest pain and dyspnea': [.48, .24],
  'Severe headache with vision changes': [.22, .72],
  'High blood sugar and frequent urination': [.74, .72],
  'Difficulty breathing and wheezing': [.74, .27]
};

let querySelect, kSlider, threshSlider, searchBtn;
let results = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  querySelect = createSelect(); Object.keys(QUERIES).forEach(o => querySelect.option(o));
  querySelect.selected('Chest pain and dyspnea'); querySelect.changed(runSearch);
  kSlider = createSlider(1, 10, 5, 1); kSlider.input(runSearch);
  threshSlider = createSlider(50, 100, 75, 1); threshSlider.input(runSearch);
  searchBtn = createButton('Search'); searchBtn.mousePressed(runSearch);
  layoutControls();
  runSearch();
  describe('Vector embedding similarity search: medical concepts plotted as colored points in a 2-D space by category, with a query star and lines drawn to its nearest neighbors above a similarity threshold.', LABEL);
}
function layoutControls() {
  querySelect.position(110, drawHeight + 12); querySelect.style('font-size', '13px');
  kSlider.position(110, drawHeight + 44); kSlider.size(180);
  threshSlider.position(110, drawHeight + 76); threshSlider.size(180);
  searchBtn.position(360, drawHeight + 42);
}

function runSearch() {
  const q = QUERIES[querySelect.value()], thresh = threshSlider.value() / 100, k = kSlider.value();
  const scored = CONCEPTS.map(c => {
    const d = Math.hypot(c[2] - q[0], c[3] - q[1]);
    const sim = Math.max(0, 1 - d * 0.95);
    return { name: c[0], cluster: c[1], x: c[2], y: c[3], sim };
  }).sort((a, b) => b.sim - a.sim);
  results = scored.filter(s => s.sim >= thresh).slice(0, k);
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Vector Embedding Similarity Search', canvasWidth / 2, 8);

  const plotX = margin, plotY = 44, plotW = canvasWidth * 0.66 - plotX, plotH = drawHeight - plotY - 16;
  const X = fx => plotX + fx * plotW, Y = fy => plotY + fy * plotH;
  stroke('#e2e6ea'); strokeWeight(1); noFill(); rect(plotX, plotY, plotW, plotH);

  const q = QUERIES[querySelect.value()], qx = X(q[0]), qy = Y(q[1]);
  const thresh = threshSlider.value() / 100;
  // threshold radius (sim = 1 - d*0.95 => d = (1-thresh)/0.95) in fraction → px
  const dThresh = (1 - thresh) / 0.95;
  noFill(); stroke('#aab'); drawingContext.setLineDash([4, 4]);
  ellipse(qx, qy, dThresh * plotW * 2, dThresh * plotH * 2); drawingContext.setLineDash([]);

  const matched = new Set(results.map(r => r.name));
  // lines to matches
  results.forEach(r => { stroke('#f1c40f'); strokeWeight(1 + r.sim * 2); line(qx, qy, X(r.x), Y(r.y)); });
  // concept points
  CONCEPTS.forEach(c => {
    const x = X(c[2]), y = Y(c[3]), isM = matched.has(c[0]);
    stroke(isM ? '#b8860b' : 'white'); strokeWeight(isM ? 2.5 : 1);
    fill(CLUSTERS[c[1]]); circle(x, y, isM ? 18 : 13);
    noStroke(); fill('#333'); textAlign(LEFT, CENTER); textSize(9.5); text(c[0], x + 9, y);
  });
  // query star
  fill('#111'); stroke('white'); strokeWeight(1.5); star(qx, qy, 7, 14, 5); noStroke();
  fill('#111'); textAlign(CENTER, BOTTOM); textSize(11); text('query', qx, qy - 16);

  // legend
  textSize(11); textAlign(LEFT, CENTER); let lx = plotX + 6;
  [['Cardiovascular', 'cardio'], ['Respiratory', 'resp'], ['Neurological', 'neuro'], ['Metabolic', 'metab']].forEach(([lbl, k]) => {
    fill(CLUSTERS[k]); noStroke(); circle(lx, plotY + plotH - 8, 10); fill('#445'); text(lbl, lx + 8, plotY + plotH - 8); lx += lbl.length * 6.6 + 26;
  });

  // results panel
  const px = canvasWidth * 0.68, pw = canvasWidth - px - margin;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, 44, pw, drawHeight - 60, 6); noStroke();
  fill('#14506b'); textSize(13); textAlign(LEFT, TOP); text('Nearest concepts (cosine similarity)', px + 12, 54, pw - 24);
  let y = 86;
  if (!results.length) { fill('#999'); textSize(12.5); text('No concepts above the similarity threshold. Lower the threshold to find more.', px + 12, y, pw - 24); }
  results.forEach((r, i) => {
    fill(CLUSTERS[r.cluster]); noStroke(); circle(px + 18, y + 8, 11);
    fill('#333'); textAlign(LEFT, TOP); textSize(12.5); text((i + 1) + '. ' + r.name, px + 30, y, pw - 90);
    fill('#1c7a30'); textAlign(RIGHT, TOP); text((r.sim * 100).toFixed(0) + '%', px + pw - 12, y);
    y += 26;
  });

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(13); noStroke();
  text('Query:', margin, drawHeight + 22);
  text('Neighbors: ' + kSlider.value(), margin, drawHeight + 54);
  text('Threshold: ' + threshSlider.value() + '%', margin, drawHeight + 86);
}

function star(x, y, r1, r2, n) {
  beginShape();
  for (let i = 0; i < n * 2; i++) { const a = -PI / 2 + i * PI / n, rr = i % 2 ? r1 : r2; vertex(x + cos(a) * rr, y + sin(a) * rr); }
  endShape(CLOSE);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
