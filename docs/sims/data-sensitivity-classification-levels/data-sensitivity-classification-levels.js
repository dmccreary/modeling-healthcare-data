// Healthcare Data Sensitivity Classification Levels — sort eight elements into four tiers.
// CANVAS_HEIGHT: 800
// Layout: 720px drawing area + two 30px control rows + 20px padding.
// Bands occupy the left two-thirds; the card tray sits on the right, or below
// the bands when the canvas is narrower than 760px.
'use strict';

let canvasWidth = 800;
let drawHeight = 720;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
const margin = 16;

// Tiers run coolest (least sensitive) at the bottom to hottest at the top.
const tiers = [
  {id: 'restricted', name: 'Restricted', color: '#f2b0b0', dark: '#8a2828',
   rule: 'Requires an active care relationship plus multi-factor authentication, and every access is logged and reviewed.',
   test: 'Would exposure cause serious harm to an identifiable person beyond ordinary privacy loss?'},
  {id: 'confidential', name: 'Confidential', color: '#f7cfa0', dark: '#8a5411',
   rule: 'Role-based access limited to staff with a job-related need; access is logged.',
   test: 'Does this identify a specific patient, or reveal terms a competitor could use?'},
  {id: 'internal', name: 'Internal', color: '#f4e3a1', dark: '#7a6208',
   rule: 'Available to any authenticated workforce member; not published outside the organization.',
   test: 'Is this about the organization rather than a person, and not meant for the public?'},
  {id: 'public', name: 'Public', color: '#b6ddd0', dark: '#2a6f5a',
   rule: 'No access restriction. Already published, or intended for publication.',
   test: 'Is this already public, or written specifically to be published?'}
];

const cards = [
  {id: 'hours', label: 'Clinic hours', tier: 'public',
   why: 'Published on the clinic’s own website and door. Nothing about it identifies a person or reveals a negotiated term.'},
  {id: 'brochure', label: 'Marketing brochure text', tier: 'public',
   why: 'Written expressly for publication. Its whole purpose is unrestricted distribution.'},
  {id: 'count', label: 'Aggregate patient count', tier: 'internal',
   why: 'A single number about the organization, not about any individual — but not something to publish either, since volume figures inform competitors. Note the boundary: aggregate counts small enough to re-identify a person are a different question entirely.'},
  {id: 'npi', label: 'Provider NPI number', tier: 'internal',
   why: 'A National Provider Identifier is a matter of public record in the federal registry, so it is not confidential — but the working list of which providers your organization employs is internal. The classification follows the use, not just the field.'},
  {id: 'contract', label: 'Payer contract terms', tier: 'confidential',
   why: 'Negotiated rates. Not patient data at all, which is exactly the point: sensitivity is not the same thing as protected health information. A competitor learning your allowed amounts is a real business harm.'},
  {id: 'deident', label: 'De-identified research dataset', tier: 'confidential',
   why: 'De-identification lowers the tier but does not empty it. Re-identification risk is never zero, and the data-use agreement that accompanies the set is itself a reason to control access.'},
  {id: 'address', label: 'Patient’s home address', tier: 'confidential',
   why: 'Directly identifies a patient. Confidential rather than Restricted because the harm from exposure, while real, is ordinary privacy loss rather than the targeted harm a sensitive diagnosis can bring.'},
  {id: 'diagnosis', label: 'Maria Chen’s diagnosis code', tier: 'restricted',
   why: 'An identified patient joined to a clinical fact. This is the combination that can cost someone a job, a relationship, or their safety — which is why it sits above the address in the same record.'}
];

let placements = {};      // cardId -> tierId
let feedback = {};        // cardId -> 'right' | 'wrong'
let dragging = null;
let dragOffset = {x: 0, y: 0};
let cardBoxes = [];
let bandBoxes = [];
let hintButton, resetButton, hintText = '';
let hintKind = '';        // 'right' | 'wrong' | 'hint', drives the panel heading

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  hintButton = createButton('Show hint');
  hintButton.parent(document.querySelector('main'));
  hintButton.mousePressed(showHint);

  resetButton = createButton('Reset the tray');
  resetButton.parent(document.querySelector('main'));
  resetButton.mousePressed(resetTray);

  describe('Four stacked sensitivity bands — Public, Internal, Confidential, and Restricted — with a tray of eight healthcare data elements to drag onto the band each belongs in. Correct placements turn green and reveal the tier’s access rule.');
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.floor(container.getBoundingClientRect().width);
  drawHeight = canvasWidth < 760 ? 940 : 720;
  canvasHeight = drawHeight + controlHeight;
}

function positionControls() {
  if (!hintButton) return;
  hintButton.position(margin, drawHeight + 12);
  resetButton.position(margin + 108, drawHeight + 12);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  postHeight();
}

function narrow() { return canvasWidth < 760; }

function layout() {
  const headerH = 78;
  if (narrow()) {
    const bandsW = canvasWidth - 2 * margin;
    return {
      bands: {x: margin, y: headerH, w: bandsW, h: 300},
      tray: {x: margin, y: headerH + 320, w: bandsW, h: 300},
      panelY: headerH + 634
    };
  }
  const bandsW = (canvasWidth - 3 * margin) * 0.62;
  return {
    bands: {x: margin, y: headerH, w: bandsW, h: 380},
    tray: {x: margin * 2 + bandsW, y: headerH, w: canvasWidth - 3 * margin - bandsW, h: 380},
    panelY: headerH + 400
  };
}

function solved() { return cards.every(c => feedback[c.id] === 'right'); }

function draw() {
  background('aliceblue');
  const L = layout();

  fill('midnightblue');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(narrow() ? 18 : 21);
  text('Healthcare Data Sensitivity Classification Levels', margin, 12, canvasWidth - 2 * margin);
  textSize(13.5);
  fill('#33475b');
  text('Drag each data element onto the band it belongs in. Green confirms the tier and reveals its access rule.',
       margin, narrow() ? 42 : 44, canvasWidth - 2 * margin);

  drawBands(L);
  drawTray(L);
  drawPanel(L);
  if (dragging) drawCard(dragging.card, dragging.x, dragging.y, 168, 38, true);

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function drawBands(L) {
  bandBoxes = [];
  const bandH = L.bands.h / tiers.length;
  tiers.forEach((tier, i) => {
    const y = L.bands.y + i * bandH;
    bandBoxes.push({id: tier.id, x: L.bands.x, y, w: L.bands.w, h: bandH});
    const hovering = dragging && pointInBox(dragging.x + 84, dragging.y + 19, {x: L.bands.x, y, w: L.bands.w, h: bandH});
    fill(tier.color);
    stroke(hovering ? '#b76900' : tier.dark);
    strokeWeight(hovering ? 4 : 1.5);
    rect(L.bands.x, y, L.bands.w, bandH - 4, 4);
    noStroke();
    fill(tier.dark);
    textAlign(LEFT, TOP);
    textSize(15);
    text(tier.name, L.bands.x + 12, y + 8);

    // Cards correctly placed in this band, laid out in rows.
    const placed = cards.filter(c => placements[c.id] === tier.id);
    placed.forEach((card, j) => {
      const perRow = max(1, floor((L.bands.w - 100) / 176));
      const cx = L.bands.x + 96 + (j % perRow) * 176;
      const cy = y + 4 + floor(j / perRow) * 32;
      drawCard(card, cx, cy, 168, 28, false);
    });
    if (feedback[`tier-${tier.id}`]) {
      fill(tier.dark);
      textSize(11.5);
      textAlign(RIGHT, BOTTOM);
      text(tier.rule, L.bands.x + 8, y + bandH - 26, L.bands.w - 16, 20);
    }
  });
}

function drawTray(L) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(L.tray.x, L.tray.y, L.tray.w, L.tray.h, 5);
  noStroke();
  fill('#33475b');
  textAlign(LEFT, TOP);
  textSize(14);
  const remaining = cards.filter(c => !placements[c.id]).length;
  text(remaining ? `Unsorted (${remaining})` : 'Tray empty', L.tray.x + 12, L.tray.y + 10);

  cardBoxes = [];
  const perRow = max(1, floor((L.tray.w - 20) / 176));
  cards.filter(c => !placements[c.id]).forEach((card, i) => {
    const x = L.tray.x + 10 + (i % perRow) * 176;
    const y = L.tray.y + 36 + floor(i / perRow) * 44;
    cardBoxes.push({id: card.id, x, y, w: 168, h: 38});
    if (!dragging || dragging.card.id !== card.id) drawCard(card, x, y, 168, 38, false);
  });
}

function drawCard(card, x, y, w, h, lifted) {
  const state = feedback[card.id];
  push();
  if (lifted) {
    drawingContext.shadowColor = 'rgba(0,0,0,0.28)';
    drawingContext.shadowBlur = 10;
    drawingContext.shadowOffsetY = 3;
  }
  fill(state === 'right' ? '#e2f4e6' : state === 'wrong' ? '#fbe2e2' : 'white');
  stroke(state === 'right' ? '#2f6b41' : state === 'wrong' ? '#8a2828' : '#7d8b98');
  strokeWeight(1.5);
  rect(x, y, w, h, 4);
  pop();
  noStroke();
  fill('#1a2733');
  // A text box anchored at the card's own top-left, so two-line labels stay
  // vertically centred inside the card rather than spilling past its bottom.
  textAlign(LEFT, CENTER);
  textSize(12);
  text(card.label, x + 8, y + 1, w - 28, h - 2);
  if (state) {
    fill(state === 'right' ? '#2f6b41' : '#8a2828');
    textAlign(CENTER, CENTER);
    textSize(15);
    text(state === 'right' ? '✓' : '✗', x + w - 14, y + 1, 12, h - 2);
  }
}

function drawPanel(L) {
  const top = L.panelY;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(margin, top, canvasWidth - 2 * margin, drawHeight - top - 12, 5);
  noStroke();
  textAlign(LEFT, TOP);
  const innerX = margin + 14;
  const innerW = canvasWidth - 2 * margin - 28;

  if (solved()) {
    fill('#2f6b41');
    textSize(16);
    text('All eight placed. The four tiers and their access rules:', innerX, top + 10);
    textSize(13);
    tiers.forEach((tier, i) => {
      fill(tier.dark);
      text(`${tier.name}:`, innerX, top + 36 + i * 30, 110, 22);
      fill('#33475b');
      text(tier.rule, innerX + 100, top + 36 + i * 30, innerW - 100, 26);
    });
    return;
  }

  const headings = {right: 'Correct placement', wrong: 'Not that tier', hint: 'Hint'};
  fill(hintKind === 'right' ? '#2f6b41' : hintKind === 'wrong' ? '#8a2828' : 'midnightblue');
  textSize(15.5);
  text(headings[hintKind] || 'Classification is a property-level judgment', innerX, top + 10);
  fill('#33475b');
  textSize(13.5);
  text(hintText || 'Two facts about the same patient can sit in different tiers, and a fact about no patient at all can outrank one that names someone. Drag a card onto a band to test your reading; a wrong placement returns to the tray. Select a card and use Show hint for the question that decides its tier.',
       innerX, top + 34, innerW, drawHeight - top - 54);
}

function pointInBox(px, py, box) {
  return px >= box.x && px <= box.x + box.w && py >= box.y && py <= box.y + box.h;
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  const hit = cardBoxes.find(box => pointInBox(mouseX, mouseY, box));
  if (!hit) return;
  const card = cards.find(c => c.id === hit.id);
  dragging = {card, x: hit.x, y: hit.y};
  dragOffset = {x: mouseX - hit.x, y: mouseY - hit.y};
  hintText = '';
  hintKind = '';
}

function mouseDragged() {
  if (!dragging) return;
  dragging.x = mouseX - dragOffset.x;
  dragging.y = mouseY - dragOffset.y;
}

function mouseReleased() {
  if (!dragging) return;
  const band = bandBoxes.find(box => pointInBox(dragging.x + 84, dragging.y + 19, box));
  const card = dragging.card;
  if (band) {
    if (band.id === card.tier) {
      placements[card.id] = band.id;
      feedback[card.id] = 'right';
      feedback[`tier-${band.id}`] = true;
      hintKind = 'right';
      hintText = `${card.label} → ${tiers.find(t => t.id === band.id).name}. ${card.why}\n\nAccess rule for this tier: ${tiers.find(t => t.id === band.id).rule}`;
      describe(`${card.label} placed correctly in ${band.id}.`);
    } else {
      feedback[card.id] = 'wrong';
      const correct = tiers.find(t => t.id === card.tier);
      hintKind = 'wrong';
      hintText = `Not ${tiers.find(t => t.id === band.id).name}. Ask the question that decides this tier: “${correct.test}” Try again — the card is back in the tray.`;
      describe(`${card.label} placed incorrectly. Returned to the tray.`);
    }
  }
  dragging = null;
}

function showHint() {
  const unplaced = cards.filter(c => !placements[c.id]);
  if (!unplaced.length) { hintText = ''; hintKind = ''; return; }
  const card = unplaced[0];
  const tier = tiers.find(t => t.id === card.tier);
  hintKind = 'hint';
  hintText = `For “${card.label}”, ask: ${tier.test}`;
}

function resetTray() {
  placements = {};
  feedback = {};
  hintText = '';
  hintKind = '';
  dragging = null;
}

function postHeight() {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: canvasHeight + 4}, '*');
  }
}

window.addEventListener('load', postHeight);
