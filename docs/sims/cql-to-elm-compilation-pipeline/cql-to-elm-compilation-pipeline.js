// CQL-to-ELM Compilation Pipeline — the same logic in two representations.
// CANVAS_HEIGHT: 1004
'use strict';

const CQL_TEXT = `library DiabetesControlMeasure version '1.0.0'

using FHIR version '4.0.1'

include FHIRHelpers version '4.0.1' called FHIRHelpers

valueset "Diabetes": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.464.1003.103.12.1001'

context Patient

define "Has Diabetes":
  exists (
    [Condition: "Diabetes"] C
      where C.clinicalStatus ~ 'active'
  )`;

const ELM_TEXT = `{
  "library": {
    "identifier": { "id": "DiabetesControlMeasure", "version": "1.0.0" },
    "statements": { "def": [{
      "name": "Has Diabetes",
      "context": "Patient",
      "expression": {
        "type": "Exists",
        "operand": {
          "type": "Query",
          "source": [{
            "alias": "C",
            "expression": {
              "type": "Retrieve",
              "dataType": "{http://hl7.org/fhir}Condition",
              "codeProperty": "code",
              "codes": { "type": "ValueSetRef", "name": "Diabetes" }
            }
          }],
          "where": {
            "type": "Equivalent",
            "operand": [
              { "type": "Property", "path": "clinicalStatus", "scope": "C" },
              { "type": "Literal", "value": "active",
                "valueType": "{urn:hl7-org:elm-types:r1}String" }
            ]
          }
        }
      }
    }]}
  }
}`;

const patients = {
  maria: {
    name: 'Maria Chen',
    summary: 'One active Type 2 diabetes Condition on file.',
    fhir: `{
  "resourceType": "Condition",
  "id": "cond-maria-dm2",
  "subject": { "reference": "Patient/maria-chen" },
  "clinicalStatus": { "coding": [{ "code": "active" }] },
  "code": { "coding": [{
    "system": "http://hl7.org/fhir/sid/icd-10-cm",
    "code": "E11.9",
    "display": "Type 2 diabetes mellitus without complications"
  }]}
}`,
    trace: [
      ['Retrieve', 'Fetch every <code>Condition</code> resource for this patient whose <code>code</code> is a member of the "Diabetes" value set. One resource matches: <code>cond-maria-dm2</code>.'],
      ['Query · where', 'For each retrieved resource, evaluate <code>clinicalStatus ~ \'active\'</code>. The resource\'s clinical status coding is <code>active</code>, so the resource is kept.'],
      ['Query · result', 'The query returns a list with one element.'],
      ['Exists', 'The list is non-empty, so <code>Exists</code> returns <strong>true</strong>.']
    ],
    result: 'true',
    resultWhy: '"Has Diabetes" evaluates to <strong>true</strong> for Maria Chen. In a measure this makes her a candidate for the initial population; the remaining define statements would then test the denominator and numerator criteria.'
  },
  jordan: {
    name: 'Jordan Ellis',
    summary: 'One diabetes Condition on file, but its clinical status is resolved.',
    fhir: `{
  "resourceType": "Condition",
  "id": "cond-jordan-dm2",
  "subject": { "reference": "Patient/jordan-ellis" },
  "clinicalStatus": { "coding": [{ "code": "resolved" }] },
  "code": { "coding": [{
    "system": "http://hl7.org/fhir/sid/icd-10-cm",
    "code": "E11.9",
    "display": "Type 2 diabetes mellitus without complications"
  }]}
}`,
    trace: [
      ['Retrieve', 'The same retrieve runs and finds the same kind of resource: <code>cond-jordan-dm2</code> is in the "Diabetes" value set, so it <em>is</em> returned. Value-set membership is about the diagnosis code, not the status.'],
      ['Query · where', 'Now the filter matters. <code>clinicalStatus</code> is <code>resolved</code>, which is not equivalent to <code>active</code>, so the resource is dropped.'],
      ['Query · result', 'The query returns an empty list.'],
      ['Exists', 'The list is empty, so <code>Exists</code> returns <strong>false</strong>.']
    ],
    result: 'false',
    resultWhy: '"Has Diabetes" evaluates to <strong>false</strong> for Jordan Ellis. Note that a naive "does this patient have a diabetes code anywhere?" query would have returned true. The <code>where</code> clause is doing the clinical work, and it is preserved exactly in both the CQL and the ELM.'
  }
};

const main = document.querySelector('main');
main.innerHTML = `<h1>CQL-to-ELM Compilation Pipeline</h1>
<p class="intro">One define statement, from authored text to machine-executable form to a result. Select any stage.</p>
<div class="mermaid-controls controls">
  <button id="maria" aria-pressed="true">Patient: Maria Chen (active)</button>
  <button id="jordan" aria-pressed="false">Patient: Jordan Ellis (resolved)</button>
  <button id="reset">Reset</button>
</div>
<div class="legend"><span>Blue: authored CQL</span><span>Orange: compiler</span><span>Green: compiled ELM</span><span>Purple: reasoning module</span><span>Pink: patient data</span><span>Yellow: result</span></div>
<div id="diagram" aria-label="CQL to ELM compilation and evaluation pipeline"></div>
<div id="info" class="mermaid-info info" aria-live="polite"></div>
<p class="footer">Synthetic patients. ELM shown is abridged; a real translator output also carries type annotations, locators, and the full value-set definition.</p>`;

let patientId = 'maria';
let current = null;
let revision = 0;

mermaid.initialize({
  startOnLoad: false, securityLevel: 'loose', theme: 'base',
  themeVariables: {fontFamily: 'Arial', fontSize: '16px'},
  flowchart: {htmlLabels: true, useMaxWidth: false, nodeSpacing: 16, rankSpacing: 36, padding: 10, curve: 'basis'}
});

function esc(text) { return text.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

const panels = {
  cql: () => ['CQL library — the authoring format',
    '<p>Written and reviewed by people. The <code>define</code> statement reads almost as a sentence: there exists a Condition drawn from the "Diabetes" value set whose clinical status is active. Value sets are referenced by canonical URL rather than by listing codes, so the code list can be curated and versioned separately from the logic.</p>' +
    `<div class="code">${esc(CQL_TEXT)}</div>`],
  compiler: () => ['CQL compiler — the translation step',
    '<p>The compiler parses the CQL text, resolves the model reference (FHIR 4.0.1), resolves the value-set URL, type-checks every expression, and emits ELM. It is the only stage where a syntax or type error can be caught. Nothing about the clinical meaning is decided here — a successful compile says the logic is well-formed, not that it is correct.</p>' +
    '<p>The translation is one-way in practice: teams keep the CQL as the source of truth and regenerate ELM, exactly as compiled binaries are regenerated from source rather than edited.</p>'],
  elm: () => ['Expression Logical Model — the executable format',
    '<p>The same logic as an explicit expression tree. Compare it with the CQL above and the correspondence is exact: <code>exists</code> becomes an <code>Exists</code> node, <code>[Condition: "Diabetes"]</code> becomes a <code>Retrieve</code> with a <code>ValueSetRef</code>, and the <code>where</code> clause becomes an <code>Equivalent</code> comparison on the <code>clinicalStatus</code> property.</p>' +
    `<div class="code">${esc(ELM_TEXT)}</div>` +
    '<p>An engine can walk this tree without a CQL parser, which is why ELM rather than CQL is what ships to a runtime.</p>'],
  engine: () => {
    const p = patients[patientId];
    return ['Clinical Reasoning Module — walking the tree',
      `<p>The engine evaluates the ELM tree against <strong>${p.name}</strong>’s resources, innermost first.</p>` +
      '<dl>' + p.trace.map(([step, text]) => `<dt>${step}</dt><dd>${text}</dd>`).join('') + '</dl>' +
      '<p>Every step is a node in the tree above. Nothing is inferred and nothing is probabilistic — the same inputs always produce the same output, which is what makes a compiled measure auditable.</p>'];
  },
  fhirdata: () => {
    const p = patients[patientId];
    return [`Patient FHIR resources — ${p.name}`,
      `<p>${p.summary} This is the second input to the reasoning module: the ELM says what to look for, and these resources are what it looks at.</p>` +
      `<div class="code">${esc(p.fhir)}</div>`];
  },
  result: () => {
    const p = patients[patientId];
    return ['Evaluation result',
      `<p class="metric">"Has Diabetes" = ${p.result}</p><p>${p.resultWhy}</p>` +
      '<p>Switch patients with the buttons above. The CQL does not change, the ELM does not change, and the engine does not change — only the data does.</p>'];
  }
};

function markSelected() {
  document.querySelectorAll('#diagram .node').forEach(node =>
    node.classList.toggle('selected', node.dataset.concept === current));
}

window.showInfo = function (id) {
  if (!panels[id]) return;
  current = id;
  const [heading, body] = panels[id]();
  document.getElementById('info').innerHTML = `<h2>${heading}</h2>${body}`;
  markSelected();
};

async function renderPipeline() {
  const ticket = ++revision;
  const p = patients[patientId];
  const code = `flowchart TB
cql["CQL Library<br/>(.cql file)"]:::cqlStyle
compiler["CQL Compiler"]:::compilerStyle
elm["Expression Logical Model<br/>(ELM, JSON)"]:::elmStyle
engine["Clinical Reasoning<br/>Module"]:::engineStyle
fhirdata["Patient FHIR Resources<br/>(${p.name})"]:::dataStyle
result["Evaluation Result<br/>Has Diabetes = ${p.result}"]:::resultStyle
cql -->|"compiles to"| compiler
compiler -->|"emits"| elm
elm -->|"loaded by"| engine
fhirdata -->|"evaluated against"| engine
engine --> result
click cql call showInfo("cql")
click compiler call showInfo("compiler")
click elm call showInfo("elm")
click engine call showInfo("engine")
click fhirdata call showInfo("fhirdata")
click result call showInfo("result")
classDef cqlStyle fill:#d7eaff,stroke:#3776a8,color:#203348
classDef compilerStyle fill:#ffe2b7,stroke:#aa731e,color:#203348
classDef elmStyle fill:#d5efda,stroke:#488457,color:#203348
classDef engineStyle fill:#e8dcfa,stroke:#8963ad,color:#203348
classDef dataStyle fill:#fbe4ee,stroke:#a8557c,color:#203348
classDef resultStyle fill:#fdf1c4,stroke:#a89020,color:#203348
`;
  try {
    const {svg, bindFunctions} = await mermaid.render(`cql-elm-${ticket}`, code);
    if (ticket !== revision) return;
    const panel = document.getElementById('diagram');
    panel.innerHTML = svg;
    bindFunctions?.(panel);
    panel.querySelectorAll('.node').forEach(node => {
      const id = (node.id.match(/flowchart-(.+)-\d+$/) || [])[1];
      if (!panels[id]) return;
      node.dataset.concept = id;
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'button');
      node.setAttribute('aria-label', panels[id]()[0]);
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

function setPatient(next) {
  patientId = next;
  ['maria', 'jordan'].forEach(id =>
    document.getElementById(id).setAttribute('aria-pressed', String(id === next)));
  renderPipeline();
  if (current) window.showInfo(current);
  else document.getElementById('info').innerHTML =
    `<h2>Same logic, two patients</h2><p>Select <strong>CQL Library</strong> and <strong>Expression Logical Model</strong> and read them side by side — they express the identical rule. Then select <strong>Clinical Reasoning Module</strong> to watch that rule walk over ${patients[next].name}’s data.</p>`;
}

document.getElementById('maria').addEventListener('click', () => setPatient('maria'));
document.getElementById('jordan').addEventListener('click', () => setPatient('jordan'));
document.getElementById('reset').addEventListener('click', () => { current = null; setPatient('maria'); });

setPatient('maria');

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
