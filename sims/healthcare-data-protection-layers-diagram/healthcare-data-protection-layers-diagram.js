// Healthcare Data Protection Layers Diagram - p5.js
// CANVAS_HEIGHT: 616
// Defense-in-depth security for a healthcare graph database, drawn as concentric
// "onion" layers from the network perimeter inward to the protected PHI at the core.
// Hover a layer to read its key controls.

let containerWidth, canvasWidth = 900;
let drawHeight = 530;
let controlHeight = 30;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 22;
let defaultTextSize = 16;

const LAYERS = [
  { name: 'Perimeter Security', color: '#1f3a93', controls: 'Firewalls · IDS/IPS · DDoS protection · VPN · network segmentation' },
  { name: 'Application Security', color: '#2e5fb0', controls: 'WAF · API gateway + rate limiting · input validation · Cypher-injection prevention' },
  { name: 'Identity & Access', color: '#4a86c8', controls: 'MFA · SSO · RBAC · privileged-access management · session timeouts' },
  { name: 'Database Security', color: '#d99a2b', controls: 'Encryption at rest (AES-256) · TLS 1.3 · node-level security · activity monitoring' },
  { name: 'Data Protection', color: '#e0712a', controls: 'Field-level encryption · tokenization · de-identification · DLP' }
];
let hoverIdx = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  describe('Defense-in-depth data protection layers: five concentric rings from perimeter security on the outside to data protection at the center, surrounding the protected PHI core; hovering a ring shows its controls.', LABEL);
}

function draw() {
  updateCanvasSize();
  fill('white'); stroke('silver'); strokeWeight(1); rect(0, 0, canvasWidth, drawHeight);
  fill('white'); rect(0, drawHeight, canvasWidth, controlHeight); noStroke();
  fill('black'); textAlign(CENTER, TOP); textSize(20);
  text('Defense in Depth: Protecting the Healthcare Graph', canvasWidth / 2, 8);

  const cx = canvasWidth * 0.37, cy = 280, rMax = 215, rCore = 46;
  const ringStep = (rMax - rCore) / LAYERS.length;
  const dMouse = dist(mouseX, mouseY, cx, cy);
  hoverIdx = -1;
  // determine hovered ring (outer index 0 = outermost)
  for (let i = 0; i < LAYERS.length; i++) {
    const rOuter = rMax - i * ringStep, rInner = rOuter - ringStep;
    if (dMouse <= rOuter && dMouse > rInner) hoverIdx = i;
  }
  // draw rings outer-to-inner
  noStroke();
  for (let i = 0; i < LAYERS.length; i++) {
    const rOuter = rMax - i * ringStep;
    const c = color(LAYERS[i].color);
    if (hoverIdx === i) c.setAlpha(255); else c.setAlpha(225);
    fill(c); circle(cx, cy, rOuter * 2);
  }
  // core
  fill('#b03020'); circle(cx, cy, rCore * 2);
  fill('white'); textAlign(CENTER, CENTER); textStyle(BOLD); textSize(14); text('PHI', cx, cy - 8);
  textStyle(NORMAL); textSize(10); text('protected\ndata', cx, cy + 12);

  // ring labels (around top of each ring)
  textAlign(CENTER, CENTER); textStyle(BOLD);
  for (let i = 0; i < LAYERS.length; i++) {
    const rOuter = rMax - i * ringStep, rMid = rOuter - ringStep / 2;
    fill('white'); textSize(11.5);
    text(LAYERS[i].name, cx, cy - rMid + ringStep / 2 - 1);
  }
  textStyle(NORMAL);

  // side detail panel
  const px = canvasWidth * 0.64, pw = canvasWidth - px - margin, py = 60;
  stroke('#cdd7e0'); fill('#f6f9fb'); strokeWeight(1); rect(px, py, pw, drawHeight - py - 26, 6); noStroke();
  fill('#14506b'); textAlign(LEFT, TOP); textSize(13); text('Security layers (outer → inner)', px + 12, py + 10);
  let y = py + 36;
  LAYERS.forEach((L, i) => {
    const on = hoverIdx === i;
    fill(L.color); noStroke(); rect(px + 12, y, 14, 14, 3);
    fill(on ? '#111' : '#333'); textStyle(on ? BOLD : NORMAL); textSize(12.5); textAlign(LEFT, TOP);
    text(L.name, px + 32, y); textStyle(NORMAL);
    fill('#555'); textSize(11); text(L.controls, px + 32, y + 17, pw - 44);
    y += 64;
  });

  // hint
  fill('#667'); textAlign(LEFT, TOP); textSize(11); text('Hover a ring to emphasize it.', px + 12, drawHeight - 40);

  // annotation
  fill('#15334d'); textAlign(CENTER, TOP); textSize(12); textStyle(BOLD);
  text('Each layer is independent — an attacker must defeat all of them to reach PHI.', cx, drawHeight - 26);
  textStyle(NORMAL);
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, containerHeight); redraw(); }
function updateCanvasSize() { const c = document.querySelector('main').getBoundingClientRect(); containerWidth = Math.floor(c.width); canvasWidth = containerWidth; }
