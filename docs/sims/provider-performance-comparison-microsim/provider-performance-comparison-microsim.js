// Provider Performance Comparison MicroSim - p5.js
// CANVAS_HEIGHT: 591
// Explore provider performance across metrics as a quadrant scatter plot. Choose the
// X and Y metrics, and click a provider to see its full profile — showing how a graph
// database aggregates multi-source performance data for network optimization.

let containerWidth, canvasWidth = 1000;
let drawHeight = 450;
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

// metric ranges for axes
const METRICS = {
  'Satisfaction': { key: 'sat', min: 3.0, max: 5.0, fmt: v => v.toFixed(1) + '/5' },
  'Quality': { key: 'qual', min: 50, max: 100, fmt: v => v + '/100' },
  'Cost efficiency': { key: 'cost', min: 0, max: 20, fmt: v => v + '% below avg' }
};
const PROVIDERS = [
  { n: 'Dr. Anderson', sat: 4.8, qual: 92, cost: 8, panel: 1800, yrs: 14, noshow: 6, avail: 7 },
  { n: 'Dr. Baker', sat: 4.2, qual: 78, cost: 5, panel: 1500, yrs: 9, noshow: 9, avail: 12 },
  { n: 'Dr. Chen', sat: 4.6, qual: 65, cost: 3, panel: 2200, yrs: 6, noshow: 11, avail: 14 },
  { n: 'Dr. Davis', sat: 3.9, qual: 88, cost: 12, panel: 1300, yrs: 18, noshow: 5, avail: 9 },
  { n: 'Dr. Evans', sat: 3.5, qual: 62, cost: 2, panel: 1900, yrs: 4, noshow: 14, avail: 18 },
  { n: 'Dr. Foster', sat: 4.7, qual: 90, cost: 14, panel: 1700, yrs: 16, noshow: 4, avail: 6 },
  { n: 'Dr. Garcia', sat: 4.4, qual: 84, cost: 10, panel: 1600, yrs: 11, noshow: 7, avail: 10 },
  { n: 'Dr. Hill', sat: 3.7, qual: 71, cost: 4, panel: 2000, yrs: 7, noshow: 12, avail: 16 },
  { n: 'Dr. Ito', sat: 4.9, qual: 95, cost: 16, panel: 1500, yrs: 20, noshow: 3, avail: 5 },
  { n: 'Dr. Jones', sat: 4.0, qual: 60, cost: 1, panel: 2300, yrs: 5, noshow: 13, avail: 15 },
  { n: 'Dr. Kaur', sat: 4.5, qual: 86, cost: 11, panel: 1650, yrs: 12, noshow: 6, avail: 8 },
  { n: 'Dr. Lopez', sat: 3.6, qual: 80, cost: 7, panel: 1400, yrs: 10, noshow: 8, avail: 11 },
  { n: 'Dr. Moore', sat: 4.3, qual: 74, cost: 6, panel: 1750, yrs: 8, noshow: 9, avail: 13 },
  { n: 'Dr. Nair', sat: 3.4, qual: 58, cost: 0, panel: 2100, yrs: 3, noshow: 15, avail: 20 },
  { n: 'Dr. Olsen', sat: 4.6, qual: 82, cost: 9, panel: 1550, yrs: 13, noshow: 6, avail: 9 },
  { n: 'Dr. Park', sat: 4.1, qual: 68, cost: 4, panel: 1850, yrs: 6, noshow: 10, avail: 14 },
  { n: 'Dr. Quinn', sat: 3.8, qual: 90, cost: 13, panel: 1250, yrs: 17, noshow: 5, avail: 7 },
  { n: 'Dr. Reed', sat: 4.7, qual: 76, cost: 8, panel: 1950, yrs: 9, noshow: 8, avail: 10 },
  { n: 'Dr. Singh', sat: 4.2, qual: 88, cost: 12, panel: 1600, yrs: 15, noshow: 5, avail: 8 },
  { n: 'Dr. Tran', sat: 3.9, qual: 64, cost: 3, panel: 2050, yrs: 5, noshow: 12, avail: 17 }
];

let xSelect, ySelect, resetButton, selected = null, hovered = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  xSelect = createSelect(); Object.keys(METRICS).forEach(o => xSelect.option(o)); xSelect.selected('Satisfaction');
  ySelect = createSelect(); Object.keys(METRICS).forEach(o => ySelect.option(o)); ySelect.selected('Quality');
  resetButton = createButton('Reset view'); resetButton.mousePressed(() => { selected = null; });
  layoutControls();
  describe('Provider performance quadrant scatter plot: each provider is a circle positioned by two selectable metrics and sized by panel size, colored by performance quadrant; click a provider for its full profile.', LABEL);
}

function layoutControls() {
  xSelect.position(margin + 70, drawHeight + 14);
  ySelect.position(margin + 320, drawHeight + 14);
  resetButton.position(margin + 560, drawHeight + 13);
}

function median(arr) { const s = [...arr].sort((a, b) => a - b), m = Math.floor(s.length / 2); return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; }

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Provider Performance Comparison (Primary Care)', canvasWidth / 2, 8);

  const mx = METRICS[xSelect.value()], my = METRICS[ySelect.value()];
  const plotX = margin + 50, plotW = canvasWidth * 0.60 - plotX, plotY = 48, plotH = drawHeight - plotY - 58;
  const X = v => plotX + (v - mx.min) / (mx.max - mx.min) * plotW;
  const Y = v => plotY + plotH - (v - my.min) / (my.max - my.min) * plotH;
  const medX = median(PROVIDERS.map(p => p[mx.key])), medY = median(PROVIDERS.map(p => p[my.key]));

  // quadrant background + lines
  noStroke();
  fill(46, 160, 70, 18); rect(X(medX), plotY, plotX + plotW - X(medX), Y(medY) - plotY); // top-right high/high
  fill(200, 60, 50, 14); rect(plotX, Y(medY), X(medX) - plotX, plotY + plotH - Y(medY)); // bottom-left low/low
  stroke('#bbb'); strokeWeight(1);
  line(X(medX), plotY, X(medX), plotY + plotH); line(plotX, Y(medY), plotX + plotW, Y(medY));
  // axes
  stroke('#888'); line(plotX, plotY, plotX, plotY + plotH); line(plotX, plotY + plotH, plotX + plotW, plotY + plotH);
  noStroke(); fill('#445'); textSize(11); textAlign(CENTER, TOP);
  text(xSelect.value() + ' →', plotX + plotW / 2, plotY + plotH + 22);
  push(); translate(plotX - 38, plotY + plotH / 2); rotate(-HALF_PI); textAlign(CENTER, CENTER); text(ySelect.value() + ' →', 0, 0); pop();
  fill('#9aa'); textSize(9.5); textAlign(RIGHT, TOP); text('high / high', plotX + plotW - 4, plotY + 4);
  textAlign(LEFT, BOTTOM); text('low / low', plotX + 4, plotY + plotH - 4);

  // points
  hovered = null;
  PROVIDERS.forEach(p => {
    const x = X(p[mx.key]), y = Y(p[my.key]), r = 5 + p.panel / 250;
    const hi1 = p[mx.key] >= medX, hi2 = p[my.key] >= medY;
    let col = hi1 && hi2 ? color(46, 125, 50) : (!hi1 && !hi2) ? color(192, 57, 43) : color(214, 158, 20);
    if (dist(mouseX, mouseY, x, y) < r + 2) hovered = p;
    const isSel = (selected === p);
    stroke(isSel ? '#111' : 'white'); strokeWeight(isSel ? 2.5 : 1);
    fill(red(col), green(col), blue(col), 200); circle(x, y, r * 2);
  });

  // details panel
  const px = canvasWidth * 0.63, pw = canvasWidth - px - margin;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, 48, pw, drawHeight - 64, 6); noStroke();
  const show = selected || hovered;
  if (show) {
    fill('#14506b'); textAlign(LEFT, TOP); textSize(16); text(show.n, px + 14, 60);
    fill('#667'); textSize(11.5); text('Primary Care' + (selected === show ? '  (locked — click empty space to release)' : '  (hover)'), px + 14, 82);
    let y = 108; textSize(13);
    const row = (l, v, c) => { fill('#445'); textAlign(LEFT, TOP); text(l, px + 14, y);
      fill(c || '#111'); textAlign(RIGHT, TOP); text(v, px + pw - 14, y); y += 26; };
    const g = '#1c7a30', r0 = '#c0392b';
    row('Patient satisfaction', show.sat.toFixed(1) + ' / 5', show.sat >= 4.3 ? g : '#b35900');
    row('Clinical quality', show.qual + ' / 100', show.qual >= 78 ? g : '#b35900');
    row('Cost efficiency', show.cost + '% below avg', show.cost >= 8 ? g : '#b35900');
    row('Panel size', show.panel.toLocaleString());
    row('Appointment availability', show.avail + ' days', show.avail <= 10 ? g : r0);
    row('No-show rate', show.noshow + '%', show.noshow <= 8 ? g : r0);
    row('Years in practice', show.yrs);
  } else {
    fill('#667'); textSize(13); textAlign(LEFT, TOP);
    text('Hover a provider to preview, or click to lock its full profile here.\n\nGreen = high on both selected metrics, red = low on both, amber = mixed. Circle size = patient panel.', px + 14, 70, pw - 28);
  }

  // network insight footer
  fill('#14506b'); textSize(12); textAlign(LEFT, BOTTOM);
  const hiBoth = PROVIDERS.filter(p => p[mx.key] >= medX && p[my.key] >= medY).length;
  text('Network insight: ' + hiBoth + ' of ' + PROVIDERS.length + ' providers are high on both metrics. Medians: ' +
       xSelect.value() + ' ' + mx.fmt(medX) + ', ' + ySelect.value() + ' ' + my.fmt(medY) + '.', margin, drawHeight - 8);

  // control labels
  fill('black'); textAlign(LEFT, CENTER); textSize(14);
  text('X-axis:', margin, drawHeight + 24); text('Y-axis:', margin + 250, drawHeight + 24);
}

function mousePressed() {
  if (hovered) selected = hovered;
  else if (mouseX < canvasWidth * 0.61) selected = null;
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); layoutControls(); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
