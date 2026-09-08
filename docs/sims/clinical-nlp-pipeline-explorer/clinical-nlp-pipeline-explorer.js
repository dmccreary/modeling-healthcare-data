// Clinical NLP Pipeline Explorer — unstructured text to graph-ready facts.
// CANVAS_HEIGHT: 956
'use strict';

// Two synthetic notes. Each stage's output is written out literally so the
// learner sees what the stage contributed, not just that it ran.
const notes = {
  dyspnea: {
    name: 'Clinician note — heart failure follow-up',
    raw: 'Patient reports increasing shortness of breath over the past three days, worse when lying flat. Started furosemide 40 mg PO daily. Will reassess in one week.',
    entities: [
      ['shortness of breath', 'SYMPTOM', 'symptom'],
      ['worse when lying flat', 'SYMPTOM', 'symptom'],
      ['furosemide', 'MEDICATION', 'medication'],
      ['40 mg', 'DOSAGE', 'dosage'],
      ['daily', 'FREQUENCY', 'frequency']
    ],
    acuity: 'Moderate',
    acuityWhy: 'The SYMPTOM spans "shortness of breath" and "worse when lying flat" together describe orthopnea, and a new loop diuretic was started — a pattern the classifier weights toward moderate rather than routine. No entity in the note indicates emergent severity (no chest pain, no hypoxia value), so it is not classified high.',
    tone: 'Clinical / neutral',
    toneWhy: 'This is clinician-authored documentation. Sentiment analysis is reported but not acted on: the tone label carries information about a patient’s own words, and there are none here. On a clinician note the correct use of this stage is to notice that it does not apply.',
    facts: `{
  "patient": "maria-chen",
  "symptoms": [
    { "text": "shortness of breath", "onset": "3 days", "modifier": "orthopnea" }
  ],
  "medication": {
    "name": "furosemide",
    "dose": "40 mg",
    "route": "PO",
    "frequency": "daily"
  },
  "acuity": "Moderate",
  "tone": "clinical",
  "follow_up": "1 week"
}`
  },
  portal: {
    name: 'Patient portal message',
    raw: 'I have been so worried — my swelling is worse and the water pill does not seem to help. I am afraid to walk to the mailbox now. Should I come in?',
    entities: [
      ['swelling', 'SYMPTOM', 'symptom'],
      ['worse', 'SYMPTOM', 'symptom'],
      ['water pill', 'MEDICATION', 'medication'],
      ['afraid to walk', 'SYMPTOM', 'symptom']
    ],
    acuity: 'Needs review today',
    acuityWhy: 'The SYMPTOM spans report worsening edema plus a new functional limitation, and the MEDICATION span "water pill" is a lay term the pipeline must normalize to the patient’s furosemide order before the note can be reconciled with the chart. Worsening symptoms on an existing treatment is what drives the classification, not the emotional language.',
    tone: 'Anxious',
    toneWhy: 'The phrases "so worried" and "I am afraid" are patient-authored affect. Here the stage does apply: routing systems use it to prioritize a human reply. It must not be used as clinical severity — a calm message can describe an emergency, and an anxious one can describe a minor problem.',
    facts: `{
  "patient": "maria-chen",
  "symptoms": [
    { "text": "swelling", "trend": "worse" },
    { "text": "reduced walking tolerance" }
  ],
  "medication": {
    "text": "water pill",
    "normalized_to": "furosemide",
    "reported_effect": "no relief"
  },
  "acuity": "Needs review today",
  "tone": "anxious",
  "source": "patient-authored"
}`
  }
};

const COLORS = {symptom: '#ffd9d9', medication: '#d7eaff', dosage: '#ffe2b7', frequency: '#d5efda'};

const main = document.querySelector('main');
main.innerHTML = `<h1>Clinical NLP Pipeline Explorer</h1>
<p class="intro">Step one clinical note through three extraction stages and inspect what each stage produced.</p>
<div class="mermaid-controls controls">
  <label for="note" style="margin:0;align-self:center">Example note</label>
  <select id="note" style="width:auto;min-width:250px">
    <option value="dyspnea">Clinician note — heart failure follow-up</option>
    <option value="portal">Patient portal message</option>
  </select>
  <button id="reset">Start over</button>
</div>
<div class="legend"><span style="background:${COLORS.symptom};padding:2px 6px">SYMPTOM</span><span style="background:${COLORS.medication};padding:2px 6px">MEDICATION</span><span style="background:${COLORS.dosage};padding:2px 6px">DOSAGE</span><span style="background:${COLORS.frequency};padding:2px 6px">FREQUENCY</span></div>
<div id="diagram" aria-label="Three-stage clinical NLP pipeline"></div>
<div id="info" class="mermaid-info info" aria-live="polite"></div>
<p class="footer">Synthetic notes. Extraction output is illustrative; a production pipeline would also normalize each span to a terminology code.</p>`;

let noteId = 'dyspnea';
let current = null;
let revision = 0;

mermaid.initialize({
  startOnLoad: false, securityLevel: 'loose', theme: 'base',
  themeVariables: {fontFamily: 'Arial', fontSize: '16px'},
  flowchart: {htmlLabels: true, useMaxWidth: false, nodeSpacing: 16, rankSpacing: 34, padding: 10, curve: 'basis'}
});

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

// Highlight every recognized span in the raw sentence, colored by entity type.
function highlighted(note) {
  let html = escapeHtml(note.raw);
  note.entities.forEach(([text, label, kind]) => {
    const safe = escapeHtml(text);
    html = html.replace(safe,
      `<mark style="background:${COLORS[kind]};padding:1px 3px;border-radius:3px" title="${label}">${safe}</mark>`);
  });
  return html;
}

const stages = {
  A: note => ['Stage 0 — Raw clinical note',
    `<p>${note.name}. Nothing has been extracted yet; this is free text as it was written.</p><div class="code">${escapeHtml(note.raw)}</div><p>Everything that follows narrows this sentence into facts a graph can store.</p>`],
  B: note => ['Stage 1 — Named entity recognition',
    `<p>Spans are located and typed. Each highlight below is one recognized entity; hover for its label.</p><p style="font-size:15px;line-height:1.9">${highlighted(note)}</p>` +
    '<dl>' + note.entities.map(([t, l]) => `<dt>${l}</dt><dd>${escapeHtml(t)}</dd>`).join('') + '</dl>' +
    '<p>Note what recognition does <em>not</em> do: it types spans, it does not judge the note.</p>'],
  C: note => ['Stage 2 — Text classification',
    `<p><strong>Acuity label: ${note.acuity}</strong></p><p>${note.acuityWhy}</p><p>Classification consumes the whole note, including the entities found in stage 1, and returns one label for the document rather than per-span labels.</p>`],
  D: note => ['Stage 3 — Sentiment analysis',
    `<p><strong>Tone label: ${note.tone}</strong></p><p>${note.toneWhy}</p>`],
  E: note => ['Stage 4 — Structured output',
    `<p>The assembled facts, ready to become graph nodes and edges.</p><div class="code">${escapeHtml(note.facts)}</div>` +
    '<p class="note">Each key becomes a node or a property: the medication becomes a <code>Medication</code> node joined to the patient by a <code>PRESCRIBED</code> edge; each symptom becomes a <code>Symptom</code> node joined by a <code>REPORTED</code> edge carrying the note’s date. Text that was searchable only as a string is now traversable.</p>']
};

function markSelected() {
  document.querySelectorAll('#diagram .node').forEach(node =>
    node.classList.toggle('selected', node.dataset.concept === current));
}

window.showInfo = function (id) {
  if (!stages[id]) return;
  current = id;
  const [heading, body] = stages[id](notes[noteId]);
  document.getElementById('info').innerHTML = `<h2>${heading}</h2>${body}`;
  markSelected();
};

async function renderPipeline() {
  const ticket = ++revision;
  const code = `flowchart TB
A["Raw clinical note"]:::rawStyle
B["Named entity<br/>recognition"]:::nerStyle
C["Text classification"]:::clsStyle
D["Sentiment analysis"]:::sentStyle
E["Structured output"]:::outStyle
A -->|"extracts spans"| B
B -->|"labels acuity"| C
C -->|"labels tone"| D
D -->|"assembles facts"| E
click A call showInfo("A")
click B call showInfo("B")
click C call showInfo("C")
click D call showInfo("D")
click E call showInfo("E")
classDef rawStyle fill:#dfe4e9,stroke:#5a6978,color:#203348
classDef nerStyle fill:#d7eaff,stroke:#3776a8,color:#203348
classDef clsStyle fill:#d5efda,stroke:#488457,color:#203348
classDef sentStyle fill:#ffe2b7,stroke:#aa731e,color:#203348
classDef outStyle fill:#e8dcfa,stroke:#8963ad,color:#203348
`;
  try {
    const {svg, bindFunctions} = await mermaid.render(`nlp-pipeline-${ticket}`, code);
    if (ticket !== revision) return;
    const panel = document.getElementById('diagram');
    panel.innerHTML = svg;
    bindFunctions?.(panel);
    panel.querySelectorAll('.node').forEach(node => {
      const id = (node.id.match(/flowchart-(.+)-\d+$/) || [])[1];
      if (!stages[id]) return;
      node.dataset.concept = id;
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'button');
      node.setAttribute('aria-label', stages[id](notes[noteId])[0]);
      node.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); window.showInfo(id); }
      });
    });
    markSelected();
  } catch (error) {
    if (ticket === revision) document.getElementById('info').textContent = 'The diagram could not load. Reload the page to try again.';
    console.error(error);
  }
}

function start() {
  current = null;
  document.getElementById('info').innerHTML =
    `<h2>${notes[noteId].name}</h2><p>Select <strong>Raw clinical note</strong> to read the source text, then work left to right through the three extraction stages. Each stage narrows the text; only the last one produces something a graph can store.</p>`;
  renderPipeline();
}

document.getElementById('note').addEventListener('change', event => {
  noteId = event.target.value;
  // The selected stage is still meaningful, so re-render it against the new note.
  if (current) { renderPipeline(); window.showInfo(current); } else start();
});
document.getElementById('reset').addEventListener('click', () => {
  document.getElementById('note').value = 'dyspnea';
  noteId = 'dyspnea';
  start();
});

start();

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
