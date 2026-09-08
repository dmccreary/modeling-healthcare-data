// Knowledge Representation Levels by Functional Tier Matrix — a 4x3 reference grid.
// CANVAS_HEIGHT: 760
// Layout: 700px drawing area + one 40px control row + 20px padding.
// Grid occupies y=96..430 on wide canvases; the detail panel fills the remainder.
'use strict';

let canvasWidth = 800;
let drawHeight = 700;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
const margin = 16;

const levels = [
  {id: 'narrative', name: 'Narrative',
   definition: 'Human prose. Readable by anyone, executable by nothing. Every guideline starts here, and everything below is a translation of it.'},
  {id: 'semi', name: 'Semi-Structured',
   definition: 'Human-authored but organized — tables, rows, user stories. The structure is visible to a reader and to a reviewer, but a machine still cannot evaluate it without a person interpreting the cells.'},
  {id: 'structured', name: 'Structured',
   definition: 'Machine-readable and specification-conformant. A system can parse it, validate it, and exchange it, but still cannot execute it directly.'},
  {id: 'executable', name: 'Executable',
   definition: 'Compiled and directly runnable by an engine. Nothing here is interpreted by a person at run time; the artifact is what the machine actually evaluates.'}
];

const tiers = [
  {id: 'data', name: 'Data Tier', muted: false,
   definition: 'What is measured or recorded — the values, codes, and observations a rule reads. Answering “what do we know?”'},
  {id: 'logic', name: 'Logic Tier', muted: false,
   definition: 'What is decided from those values — the criteria, thresholds, and recommendations. Answering “what follows from what we know?”'},
  {id: 'ui', name: 'Forms/UI Tier', muted: true,
   definition: 'How the knowledge reaches a person — questionnaires, handouts, alert cards. Answering “how does anyone see this?” Covered fully in Chapters 23 and 24; previewed here to complete the grid.'}
];

const cells = {
  'narrative|data': ['LDL cholesterol mentioned in guideline prose',
    'The concept appears as words in a sentence. Nothing names a code system, a unit, or a threshold — a reader supplies all of that from context.'],
  'narrative|logic': ['“Consider a statin for elevated LDL” (prose recommendation)',
    'A recommendation with no operational definition of “elevated” and a deliberately soft verb. It belongs at the Logic Tier because it decides something, and at the Narrative level because nothing about it is testable.'],
  'narrative|ui': ['Guideline PDF’s patient handout section (detailed in Ch. 23)',
    'The same knowledge shaped for a patient to read. It is a user-facing artifact, so Forms/UI Tier; it is prose, so Narrative level.'],
  'semi|data': ['Decision table column: “LDL value”',
    'Naming a column commits you to a data element with a name and a place in a structure — a real step up from prose — but the column header still does not say which LOINC code fills it.'],
  'semi|logic': ['Decision table row: IF LDL > 190 THEN recommend statin',
    'The threshold is now explicit and the connective is unambiguous. A reviewer can check completeness across rows. A machine still cannot run it, because “LDL” is not yet bound to anything a system can retrieve.'],
  'semi|ui': ['Clinical user story describing the counseling conversation (Ch. 23)',
    'Structured as “As a… I want… so that…”, which is more than prose but far less than a specification. User-facing intent, semi-structured form.'],
  'structured|data': ['FHIR ValueSet binding LDL to LOINC code 2089-1',
    'The decisive step for the Data Tier: the concept is now bound to a specific code in a specific code system. Two systems that both honor this binding will agree on what counts as an LDL result.'],
  'structured|logic': ['PlanDefinition trigger: LDL Observation > 190 mg/dL',
    'The rule as a conformant FHIR resource — parseable, exchangeable, and validatable. It is still not executable: an engine needs it compiled before it can evaluate anything.'],
  'structured|ui': ['FHIR Questionnaire item definition (Ch. 24)',
    'A machine-readable description of a form element. A renderer can build a widget from it, but the definition itself is not a running interface.'],
  'executable|data': ['Compiled ELM data requirement for LOINC 2089-1',
    'The compiler emits an explicit statement of what the logic will retrieve. This is what lets a system pre-fetch exactly the right resources before evaluation begins.'],
  'executable|logic': ['Compiled ELM expression evaluated by the CDS engine',
    'The expression tree the engine actually walks. Same clinical meaning as the Narrative cell four rows up; nothing in between changed the medicine, only the representation.'],
  'executable|ui': ['Rendered CDS Hooks card in the EHR UI (Ch. 24)',
    'The alert a clinician sees. It is the running end of the Forms/UI Tier — the point where every earlier row finally reaches a person.']
};

let selected = null;
let hoverLevel = null;
let hoverTier = null;
let resetButton;
let cellBoxes = [];
let rowHeaderBoxes = [];
let colHeaderBoxes = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
  resetButton = createButton('Clear selection');
  resetButton.parent(document.querySelector('main'));
  resetButton.mousePressed(() => { selected = null; });
  describe('A four-by-three grid crossing knowledge representation levels — Narrative, Semi-Structured, Structured, Executable — with functional tiers — Data, Logic, and Forms/UI. Each cell holds one example artifact. Select a cell for the full text and why it belongs there.');
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.floor(container.getBoundingClientRect().width);
  drawHeight = canvasWidth < 700 ? 800 : 700;
  canvasHeight = drawHeight + controlHeight;
}

function positionControls() {
  if (!resetButton) return;
  resetButton.position(margin, drawHeight + 14);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
  postHeight();
}

function draw() {
  background('aliceblue');
  fill('midnightblue');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(canvasWidth < 700 ? 18 : 21);
  text('Knowledge Representation Levels by Functional Tier', margin, 12, canvasWidth - 2 * margin);
  textSize(13.5);
  fill('#33475b');
  text('Twelve artifacts, one guideline. Select a cell for the full example; hover a header for the level or tier definition.',
       margin, 42, canvasWidth - 2 * margin);

  drawGrid();
  drawPanel();

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);
}

function drawGrid() {
  const headerW = canvasWidth < 700 ? 108 : 148;
  const top = 84;
  const headerH = 34;
  const gridW = canvasWidth - 2 * margin - headerW;
  const colW = gridW / tiers.length;
  const rowH = canvasWidth < 700 ? 74 : 82;

  cellBoxes = [];
  rowHeaderBoxes = [];
  colHeaderBoxes = [];

  // Column headers
  tiers.forEach((tier, c) => {
    const x = margin + headerW + c * colW;
    colHeaderBoxes.push({id: tier.id, x, y: top, w: colW, h: headerH});
    fill(hoverTier === tier.id ? '#cfe0f0' : tier.muted ? '#e6eaee' : '#dbe7f2');
    stroke('#8a97a3');
    strokeWeight(1);
    rect(x, top, colW - 3, headerH, 3);
    noStroke();
    fill(tier.muted ? '#5a6978' : '#1c3350');
    textAlign(CENTER, CENTER);
    textSize(canvasWidth < 700 ? 12.5 : 14);
    text(tier.name, x, top, colW - 3, headerH);
  });

  levels.forEach((level, r) => {
    const y = top + headerH + 4 + r * rowH;
    rowHeaderBoxes.push({id: level.id, x: margin, y, w: headerW, h: rowH - 3});
    fill(hoverLevel === level.id ? '#cfe0f0' : '#dbe7f2');
    stroke('#8a97a3');
    strokeWeight(1);
    rect(margin, y, headerW - 3, rowH - 3, 3);
    noStroke();
    fill('#1c3350');
    textAlign(CENTER, CENTER);
    textSize(canvasWidth < 700 ? 12 : 13.5);
    text(level.name, margin, y, headerW - 3, rowH - 3);

    tiers.forEach((tier, c) => {
      const x = margin + headerW + c * colW;
      const key = `${level.id}|${tier.id}`;
      const box = {id: key, x, y, w: colW - 3, h: rowH - 3};
      cellBoxes.push(box);
      const lit = hoverLevel === level.id || hoverTier === tier.id;
      const isSelected = selected === key;
      fill(tier.muted ? (lit ? '#eef1f4' : '#f4f6f8') : (lit ? '#f0f7ff' : 'white'));
      stroke(isSelected ? '#b76900' : '#c3ced8');
      strokeWeight(isSelected ? 3 : 1);
      rect(x, y, colW - 3, rowH - 3, 3);
      noStroke();
      fill(tier.muted ? '#7d8b98' : '#1a2733');
      textAlign(LEFT, TOP);
      textSize(canvasWidth < 700 ? 11 : 12);
      // Abbreviated on the grid; the full text lives in the panel below.
      text(abbreviate(cells[key][0]), x + 7, y + 7, colW - 17, rowH - (tier.muted ? 30 : 16));
      if (tier.muted) {
        fill('#8a97a3');
        textSize(10.5);
        textAlign(RIGHT, BOTTOM);
        text('Ch. 23/24', x + 7, y, colW - 17, rowH - 9);
      }
    });
  });
}

// Grid cells show a trimmed label; the panel carries the sentence in full.
function abbreviate(label) {
  return label.replace(/\s*\((?:detailed in )?Ch\.[^)]*\)/, '');
}

function drawPanel() {
  const top = canvasWidth < 700 ? 84 + 38 + 4 * 74 + 12 : 84 + 38 + 4 * 82 + 14;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(margin, top, canvasWidth - 2 * margin, drawHeight - top - 12, 5);
  noStroke();
  textAlign(LEFT, TOP);
  const innerX = margin + 14;
  const innerW = canvasWidth - 2 * margin - 28;

  if (hoverLevel) {
    const level = levels.find(l => l.id === hoverLevel);
    fill('midnightblue');
    textSize(16);
    text(`Level: ${level.name}`, innerX, top + 10);
    fill('#33475b');
    textSize(13.5);
    text(level.definition, innerX, top + 36, innerW, drawHeight - top - 54);
    return;
  }
  if (hoverTier) {
    const tier = tiers.find(t => t.id === hoverTier);
    fill('midnightblue');
    textSize(16);
    text(`Tier: ${tier.name}`, innerX, top + 10);
    fill('#33475b');
    textSize(13.5);
    text(tier.definition, innerX, top + 36, innerW, drawHeight - top - 54);
    return;
  }
  if (selected) {
    const [level, tier] = selected.split('|');
    const [example, why] = cells[selected];
    fill('#8a5411');
    textSize(13);
    text(`${levels.find(l => l.id === level).name} × ${tiers.find(t => t.id === tier).name}`, innerX, top + 10);
    fill('midnightblue');
    textSize(15.5);
    text(example, innerX, top + 32, innerW, 46);
    fill('#33475b');
    textSize(13.5);
    text(why, innerX, top + 78, innerW, drawHeight - top - 96);
    return;
  }
  fill('midnightblue');
  textSize(16);
  text('One guideline, twelve representations', innerX, top + 10);
  fill('#33475b');
  textSize(13.5);
  text('Read a column downward and you watch one kind of knowledge harden from prose into something executable. Read a row across and you see the same level of formality applied to three different jobs.\n\nSelect any cell for the full example and why it sits where it does. Hover a row or column header for the definition of that level or tier. The greyed Forms/UI column is previewed here and taught in Chapters 23 and 24.',
       innerX, top + 34, innerW, drawHeight - top - 52);
}

function pointInBox(px, py, box) {
  return px >= box.x && px <= box.x + box.w && py >= box.y && py <= box.y + box.h;
}

function mouseMoved() {
  const row = rowHeaderBoxes.find(box => pointInBox(mouseX, mouseY, box));
  const col = colHeaderBoxes.find(box => pointInBox(mouseX, mouseY, box));
  hoverLevel = row ? row.id : null;
  hoverTier = col ? col.id : null;
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  const hit = cellBoxes.find(box => pointInBox(mouseX, mouseY, box));
  if (hit) {
    selected = hit.id;
    const [level, tier] = hit.id.split('|');
    describe(`${levels.find(l => l.id === level).name} by ${tiers.find(t => t.id === tier).name}: ${cells[hit.id][0]}. ${cells[hit.id][1]}`);
  }
}

function postHeight() {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: canvasHeight + 4}, '*');
  }
}

window.addEventListener('load', postHeight);
