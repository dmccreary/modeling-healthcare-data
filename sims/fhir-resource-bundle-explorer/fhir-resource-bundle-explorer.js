// FHIR Resource Bundle Explorer — a Bundle is already a labeled property graph.
// CANVAS_HEIGHT: 848
'use strict';

// One synthetic Bundle for Maria Chen. Each resource carries the raw JSON that
// the side panel shows, so the learner can match a reference field to an edge.
const resources = {
  'maria-chen': {
    type: 'Patient', shape: 'dot', color: '#f5b7ce', border: '#a8557c', label: 'Patient\nmaria-chen',
    x: 0, y: -30,
    json: `{
  "resourceType": "Patient",
  "id": "maria-chen",
  "name": [{ "family": "Chen", "given": ["Maria"] }],
  "gender": "female",
  "birthDate": "1985-03-12",
  "identifier": [{
    "system": "http://hospital.example.org/mrn",
    "value": "MRN-48213"
  }]
}`,
    note: 'The hub of this Bundle. Every other resource points at it through a <code>subject</code> reference, which is why the Patient node has five incoming edges and no outgoing ones.'
  },
  'enc-1': {
    type: 'Encounter', shape: 'square', color: '#cbd0d5', border: '#5a6978', label: 'Encounter\nenc-1',
    x: 320, y: -190,
    json: `{
  "resourceType": "Encounter",
  "id": "enc-1",
  "status": "finished",
  "class": { "code": "AMB", "display": "ambulatory" },
  "type": [{ "text": "Annual Physical" }],
  "subject": { "reference": "Patient/maria-chen" },
  "period": { "start": "2024-01-15T09:00:00Z",
              "end": "2024-01-15T09:45:00Z" }
}`,
    note: 'A visit. Notice that the Encounter does not list the observations made during it — the Observation points <em>up</em> at the Encounter instead. Reference direction is a modeling decision made by the specification, not something the data implies.'
  },
  'cond-1': {
    type: 'Condition', shape: 'diamond', color: '#ffc184', border: '#aa731e', label: 'Condition\ncond-1',
    x: 320, y: 165,
    json: `{
  "resourceType": "Condition",
  "id": "cond-1",
  "clinicalStatus": { "coding": [{ "code": "active" }] },
  "code": { "coding": [{
    "system": "http://hl7.org/fhir/sid/icd-10-cm",
    "code": "E11.9",
    "display": "Type 2 diabetes mellitus"
  }]},
  "subject": { "reference": "Patient/maria-chen" },
  "recordedDate": "2023-11-02"
}`,
    note: 'A diagnosis. It carries exactly one reference field, <code>subject</code>, so it has exactly one outgoing edge — and one incoming edge from the CarePlan that addresses it.'
  },
  'obs-1': {
    type: 'Observation', shape: 'dot', color: '#f7e08a', border: '#a89020', label: 'Observation\nobs-1',
    x: 660, y: -190,
    json: `{
  "resourceType": "Observation",
  "id": "obs-1",
  "status": "final",
  "code": { "coding": [{
    "system": "http://loinc.org",
    "code": "4548-4",
    "display": "Hemoglobin A1c"
  }]},
  "subject": { "reference": "Patient/maria-chen" },
  "encounter": { "reference": "Encounter/enc-1" },
  "effectiveDateTime": "2024-01-15",
  "valueQuantity": { "value": 8.2, "unit": "%",
                     "system": "http://unitsofmeasure.org", "code": "%" }
}`,
    note: 'A measurement: HbA1c 8.2%. This is the only resource in the Bundle with <em>two</em> reference fields, and so the only node with two outgoing edges. Count the reference fields in the JSON and you have counted the edges.'
  },
  'med-1': {
    type: 'MedicationRequest', shape: 'hexagon', color: '#c9b6e8', border: '#8963ad', label: 'MedicationRequest\nmed-1',
    x: -330, y: 165,
    json: `{
  "resourceType": "MedicationRequest",
  "id": "med-1",
  "status": "active",
  "intent": "order",
  "medicationCodeableConcept": { "coding": [{
    "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
    "code": "860975",
    "display": "Metformin 500 MG"
  }]},
  "subject": { "reference": "Patient/maria-chen" },
  "requester": { "reference": "Practitioner/dr-patel" },
  "authoredOn": "2024-01-15"
}`,
    note: 'A prescription. Its <code>requester</code> field points at <code>Practitioner/dr-patel</code> — a resource that is <strong>not in this Bundle</strong>. The dashed node marks that unresolved reference: the edge exists in the data, but the target has to be fetched separately.'
  },
  'cp-1': {
    type: 'CarePlan', shape: 'triangle', color: '#a8dcb5', border: '#488457', label: 'CarePlan\ncp-1',
    x: 660, y: 165,
    json: `{
  "resourceType": "CarePlan",
  "id": "cp-1",
  "status": "active",
  "intent": "plan",
  "title": "Quarterly HbA1c monitoring",
  "subject": { "reference": "Patient/maria-chen" },
  "addresses": [{ "reference": "Condition/cond-1" }]
}`,
    note: 'A plan of care. Its <code>addresses</code> field is what makes this Bundle more than a list: it links the plan to the specific problem the plan exists to manage. Remove that one field and the plan floats free of its reason.'
  },
  'dr-patel': {
    type: 'Practitioner', shape: 'dot', color: '#eef1f4', border: '#9aa7b3', label: 'Practitioner\n(not in Bundle)',
    x: -680, y: 165, dashes: true,
    json: `// Not present in this Bundle.
//
// The MedicationRequest references it:
//   "requester": { "reference": "Practitioner/dr-patel" }
//
// A client that needs the prescriber's name must resolve
// the reference with a second request:
//   GET /Practitioner/dr-patel`,
    note: 'An <strong>unresolved reference</strong>. A Bundle is a set of resources someone chose to send together; a reference can point outside that set. This is the single most common surprise when treating a Bundle as a self-contained graph — some edges lead off the edge of the page.'
  }
};

const edgeData = [
  {id: 'e-enc-sub', from: 'enc-1', to: 'maria-chen', label: 'subject', field: 'subject',
   note: 'From <code>Encounter.subject</code>. Every clinical resource in FHIR names the patient it is about through a reference field, and this is that field.'},
  {id: 'e-cond-sub', from: 'cond-1', to: 'maria-chen', label: 'subject', field: 'subject',
   note: 'From <code>Condition.subject</code>. The same field name as the Encounter’s, on a different resource type — which is why five different resources here all produce an edge with the same label.'},
  {id: 'e-obs-sub', from: 'obs-1', to: 'maria-chen', label: 'subject', field: 'subject',
   note: 'From <code>Observation.subject</code>. An observation is always about someone; without this field the value 8.2% belongs to nobody.'},
  {id: 'e-med-sub', from: 'med-1', to: 'maria-chen', label: 'subject', field: 'subject',
   note: 'From <code>MedicationRequest.subject</code>. The person the medication is for, which is not necessarily the person who ordered it — that is a separate field.'},
  {id: 'e-cp-sub', from: 'cp-1', to: 'maria-chen', label: 'subject', field: 'subject',
   note: 'From <code>CarePlan.subject</code>. The person the plan is for.'},
  {id: 'e-obs-enc', from: 'obs-1', to: 'enc-1', label: 'encounter', field: 'encounter',
   note: 'From <code>Observation.encounter</code>. This edge is what makes the HbA1c value part of the annual physical rather than a free-floating lab result. It is also the second edge out of one resource — proof that a resource is not limited to one relationship.'},
  {id: 'e-cp-addr', from: 'cp-1', to: 'cond-1', label: 'addresses', field: 'addresses',
   note: 'From <code>CarePlan.addresses</code>. Note that <code>addresses</code> is an <em>array</em> in the JSON: one care plan can address several conditions, which in graph terms means one node with several outgoing edges of the same type.'},
  {id: 'e-med-req', from: 'med-1', to: 'dr-patel', label: 'requester', field: 'requester', dashes: true,
   note: 'From <code>MedicationRequest.requester</code>. The target resource is not in this Bundle, so this edge points at an unresolved reference. The reference is still valid — it just cannot be followed without another request.'}
];

const main = document.querySelector('main');
main.className = 'wide';
main.innerHTML = `<h1>FHIR Resource Bundle Explorer</h1>
<p class="intro">One Bundle for Maria Chen, drawn as a graph. Every edge below came from a reference field in the JSON.</p>
<div class="legend">
  <span><i class="swatch" style="background:#f5b7ce;border-radius:50%"></i>Patient</span>
  <span><i class="swatch" style="background:#cbd0d5"></i>Encounter</span>
  <span><i class="swatch" style="background:#ffc184;transform:rotate(45deg)"></i>Condition</span>
  <span><i class="swatch" style="background:#f7e08a;border-radius:50%"></i>Observation</span>
  <span><i class="swatch" style="background:#c9b6e8"></i>MedicationRequest</span>
  <span><i class="swatch" style="background:#a8dcb5"></i>CarePlan</span>
  <span><i class="swatch" style="background:#eef1f4;border:1px dashed #9aa7b3"></i>Unresolved reference</span>
</div>
<div class="workspace">
  <div id="network" class="graph" aria-label="FHIR Bundle rendered as a node and edge graph"></div>
  <aside class="side">
    <div class="controls">
      <button id="graphView" aria-pressed="true">Graph view</button>
      <button id="jsonView" aria-pressed="false">JSON view</button>
      <button id="reset">Reset</button>
    </div>
    <label for="pick">Inspect a resource or reference</label>
    <select id="pick"><option value="">Choose an element…</option></select>
    <div id="info" class="info" aria-live="polite"></div>
  </aside>
</div>
<div id="json" class="mermaid-info" hidden></div>
<p class="footer">Synthetic Bundle, abridged. The count is exact: eight reference fields across six resources produce the eight edges drawn above.</p>`;

const nodes = new vis.DataSet(Object.entries(resources).map(([id, r]) => {
  const node = {
    id, label: r.label, shape: r.shape, size: 26,
    color: {background: r.color, border: r.border},
    x: r.x, y: r.y, fixed: true,
    title: `${r.type}/${id}`
  };
  // Set shapeProperties only when the node needs a dashed border: passing an
  // explicit undefined here overrides vis-network's own default object.
  if (r.dashes) node.shapeProperties = {borderDashes: [5, 4]};
  return node;
}));

const edges = new vis.DataSet(edgeData.map(e => ({
  ...e,
  title: `this edge came from the \`${e.field}\` field`,
  color: {color: e.dashes ? '#9aa7b3' : '#64748b', highlight: '#a86200'}
})));

const network = new vis.Network(document.getElementById('network'), {nodes, edges}, {
  layout: {randomSeed: 11, improvedLayout: false},
  physics: {enabled: false},
  nodes: {borderWidth: 2, font: {size: 14, face: 'Arial', color: '#203348', multi: false}},
  edges: {arrows: 'to', width: 2, font: {size: 13, face: 'Arial', background: 'aliceblue'},
          smooth: {type: 'continuous', roundness: 0.12}},
  interaction: {hover: true, tooltipDelay: 120, zoomView: false, dragView: false, dragNodes: false,
                navigationButtons: true, keyboard: {enabled: true, bindToWindow: false}}
});

const pick = document.getElementById('pick');
Object.entries(resources).forEach(([id, r]) => pick.add(new Option(`Resource: ${r.type} (${id})`, id)));
edgeData.forEach(e => pick.add(new Option(`Reference: ${e.from}.${e.field}`, e.id)));

function esc(text) { return text.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

function showResource(id) {
  const r = resources[id];
  if (!r) return;
  pick.value = id;
  const outgoing = edgeData.filter(e => e.from === id);
  const incoming = edgeData.filter(e => e.to === id);
  network.setSelection({nodes: [id], edges: outgoing.map(e => e.id)}, {highlightEdges: false});
  document.getElementById('info').innerHTML =
    `<h2>${r.type} · ${id}</h2><p>${r.note}</p>` +
    `<dl><dt>Reference fields (outgoing edges)</dt><dd>${outgoing.length ? outgoing.map(e => `<code>${e.field}</code> → ${e.to}`).join('<br>') : 'none'}</dd>` +
    `<dt>Referenced by (incoming edges)</dt><dd>${incoming.length ? incoming.map(e => `${e.from} <code>${e.field}</code>`).join('<br>') : 'none'}</dd></dl>` +
    `<div class="code">${esc(r.json)}</div>`;
}

function showEdge(id) {
  const e = edgeData.find(edge => edge.id === id);
  if (!e) return;
  pick.value = id;
  network.setSelection({nodes: [], edges: [id]}, {highlightEdges: false});
  document.getElementById('info').innerHTML =
    `<h2>Edge from <code>${e.field}</code></h2><p>${e.note}</p>` +
    `<dl><dt>Source resource</dt><dd>${resources[e.from].type}/${e.from}</dd>` +
    `<dt>JSON field</dt><dd><code>"${e.field}": { "reference": "${resources[e.to].type}/${e.to}" }</code></dd>` +
    `<dt>Target resource</dt><dd>${resources[e.to].type}/${e.to}${e.dashes ? ' — not present in this Bundle' : ''}</dd></dl>`;
}

network.on('click', event => {
  if (event.nodes[0]) showResource(event.nodes[0]);
  else if (event.edges[0]) showEdge(event.edges[0]);
});
pick.addEventListener('change', () => {
  const value = pick.value;
  if (resources[value]) showResource(value);
  else if (value) showEdge(value);
});

// JSON view lists the whole Bundle with every reference field called out, so a
// learner can read the document and the drawing against each other.
function bundleJson() {
  return Object.entries(resources)
    .filter(([, r]) => r.type !== 'Practitioner')
    .map(([id, r]) => `// ── entry: ${r.type}/${id} ──\n${r.json}`)
    .join('\n\n');
}

function setView(mode) {
  const showJson = mode === 'json';
  document.getElementById('json').hidden = !showJson;
  document.getElementById('graphView').setAttribute('aria-pressed', String(!showJson));
  document.getElementById('jsonView').setAttribute('aria-pressed', String(showJson));
  if (showJson) {
    document.getElementById('json').innerHTML =
      '<h2>The same Bundle as JSON</h2><p>Every highlighted line below is a reference field, and every reference field is one edge in the drawing above. Eight highlights, eight edges.</p>' +
      `<div class="code">${esc(bundleJson()).replace(/(&quot;|")(subject|encounter|addresses|requester)(&quot;|"):/g,
        '<mark style="background:#ffe2b7">"$2":</mark>')}</div>`;
  }
}

document.getElementById('graphView').addEventListener('click', () => setView('graph'));
document.getElementById('jsonView').addEventListener('click', () => setView('json'));
document.getElementById('reset').addEventListener('click', () => {
  network.unselectAll();
  pick.value = '';
  setView('graph');
  start();
});

function start() {
  document.getElementById('info').innerHTML =
    '<h2>Six resources, eight references</h2><p>Select a node for its raw JSON, or an arrow to see which field produced it. Then switch to <strong>JSON view</strong> and count the highlighted reference fields — the count matches the number of arrows exactly.</p>';
}

function fitView() { network.fit({animation: false, padding: 62}); }
new ResizeObserver(fitView).observe(document.getElementById('network'));
fitView();
setView('graph');
start();

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
