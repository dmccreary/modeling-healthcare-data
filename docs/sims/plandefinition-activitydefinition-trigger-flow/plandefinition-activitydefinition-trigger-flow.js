// PlanDefinition to ActivityDefinition Trigger Flow — test the criteria yourself.
// CANVAS_HEIGHT: 821
'use strict';

const CRITERIA = [
  {id: 'age', label: 'Age between 35 and 70 inclusive',
   test: s => s.age >= 35 && s.age <= 70,
   detail: 'Screening below 35 is not recommended for average-risk adults, and above 70 the guideline defers to individualized judgment rather than a blanket rule.'},
  {id: 'bmi', label: 'BMI at or above 25',
   test: s => s.bmi >= 25,
   detail: 'Overweight or obesity is the risk factor this particular guideline keys on. A patient below this threshold is not excluded from screening in general — they are outside <em>this</em> PlanDefinition.'},
  {id: 'dx', label: 'No active diabetes diagnosis',
   test: s => !s.hasDiabetes,
   detail: 'A screening rule must exclude patients who already carry the diagnosis. Without this clause the guideline would keep recommending a screening test to people who are already being treated — the single most common defect in a hand-written care-gap rule.'}
];

const state = {age: 52, bmi: 29, hasDiabetes: false};

function results() { return CRITERIA.map(c => ({...c, pass: c.test(state)})); }
function fires() { return results().every(r => r.pass); }

function orderJson() {
  return `{
  "resourceType": "ServiceRequest",
  "status": "draft",
  "intent": "order",
  "code": { "coding": [{
    "system": "http://loinc.org",
    "code": "4548-4",
    "display": "Hemoglobin A1c"
  }]},
  "subject": { "reference": "Patient/example" },
  "reasonCode": [{ "text": "Diabetes screening — age ${state.age}, BMI ${state.bmi}" }],
  "instantiatesCanonical": [
    "PlanDefinition/diabetes-screening-guideline"
  ]
}`;
}

const main = document.querySelector('main');
main.innerHTML = `<h1>PlanDefinition to ActivityDefinition Trigger Flow</h1>
<p class="intro">Set a patient’s age, BMI, and diagnosis status, and watch whether the guideline’s action fires.</p>
<div class="legend">
  <span><i class="swatch" style="background:#9dc9f2"></i>PlanDefinition</span>
  <span><i class="swatch" style="background:#f5b7ce"></i>Patient data</span>
  <span><i class="swatch" style="background:#f7e08a;transform:rotate(45deg)"></i>Evaluation result</span>
  <span><i class="swatch" style="background:#a8dcb5"></i>ActivityDefinition</span>
</div>
<div class="workspace">
  <div id="network" class="graph" aria-label="PlanDefinition trigger evaluation flow"></div>
  <aside class="side">
    <label for="age">Age: <strong id="ageValue">52</strong></label>
    <input type="range" id="age" min="18" max="90" step="1" value="52">
    <label for="bmi">BMI: <strong id="bmiValue">29.0</strong></label>
    <input type="range" id="bmi" min="15" max="45" step="0.5" value="29">
    <label style="margin-top:10px"><input type="checkbox" id="dx" style="width:auto;margin-right:6px">Has an active diabetes diagnosis</label>
    <div id="criteria"></div>
    <div class="controls"><button id="reset">Reset</button></div>
    <div id="info" class="info" aria-live="polite"></div>
  </aside>
</div>
<p class="footer">Synthetic guideline. Real PlanDefinition criteria are expressed in CQL and compiled to ELM rather than written as prose.</p>`;

const nodes = new vis.DataSet();
const edges = new vis.DataSet([
  {id: 'checked', from: 'inputs', to: 'result', label: 'criteria checked against',
   arrows: 'to', color: {color: '#a8557c'}, width: 3},
  {id: 'plan-def', from: 'plan', to: 'result', label: 'defines criteria',
   arrows: 'to', color: {color: '#3776a8'}, width: 2, dashes: true},
  {id: 'triggers', from: 'result', to: 'activity', label: 'triggers, if true',
   arrows: 'to', color: {color: '#94a3b8'}, width: 2}
]);

const network = new vis.Network(document.getElementById('network'), {nodes, edges}, {
  layout: {randomSeed: 3, improvedLayout: false},
  physics: {enabled: false},
  nodes: {borderWidth: 2, font: {size: 14, face: 'Arial', color: '#203348', multi: 'html'}, margin: 12},
  edges: {font: {size: 13, face: 'Arial', background: 'aliceblue'}, smooth: {type: 'continuous', roundness: 0.15}},
  interaction: {hover: true, tooltipDelay: 120, zoomView: false, dragView: false, dragNodes: false,
                navigationButtons: true, keyboard: {enabled: true, bindToWindow: false}}
});

function rebuild() {
  const on = fires();
  nodes.update([
    {id: 'plan', shape: 'box', x: -330, y: -160, fixed: true,
     label: '<b>PlanDefinition</b>\nDiabetes Screening Guideline\n\nage 35–70\nBMI ≥ 25\nno active diabetes dx',
     color: {background: '#9dc9f2', border: '#3776a8'},
     title: 'The reusable guideline artifact. It states the criteria; it does not name a patient.'},
    {id: 'inputs', shape: 'box', x: -330, y: 150, fixed: true,
     label: `<b>Patient Data Inputs</b>\nage: ${state.age}\nBMI: ${state.bmi.toFixed(1)}\nactive diabetes dx: ${state.hasDiabetes ? 'yes' : 'no'}`,
     color: {background: '#f5b7ce', border: '#a8557c'},
     title: 'The patient-specific facts the criteria are evaluated against.'},
    {id: 'result', shape: 'diamond', size: 54, x: 60, y: 0, fixed: true,
     label: `<b>${on ? 'TRUE' : 'FALSE'}</b>`,
     color: {background: on ? '#f7e08a' : '#e6eaee', border: on ? '#a89020' : '#8a97a3'},
     title: 'The evaluation result for the current inputs.'},
    {id: 'activity', shape: 'box', x: 430, y: 0, fixed: true,
     label: on ? '<b>ActivityDefinition</b>\nOrder HbA1c Test\n\n▶ order generated'
               : '<b>ActivityDefinition</b>\nOrder HbA1c Test\n\n(not triggered)',
     color: {background: on ? '#a8dcb5' : '#eef2f5', border: on ? '#488457' : '#c8d2dc'},
     font: {size: 14, face: 'Arial', color: on ? '#203348' : '#8a97a3', multi: 'html'},
     borderWidth: on ? 4 : 2,
     title: on ? 'Triggered. Select this node for the generated order.' : 'Not triggered under the current inputs.'}
  ]);
  edges.update([{id: 'triggers', color: {color: on ? '#488457' : '#c8d2dc'}, width: on ? 4 : 2, dashes: !on}]);

  document.getElementById('ageValue').textContent = state.age;
  document.getElementById('bmiValue').textContent = state.bmi.toFixed(1);
  document.getElementById('criteria').innerHTML =
    '<h2 style="margin-top:12px">Trigger criteria</h2>' +
    results().map(r => `<div style="margin:6px 0"><span class="pill ${r.pass ? 'ok' : 'no'}">${r.pass ? 'met' : 'not met'}</span> ${r.label}</div>`).join('') +
    `<p style="margin-top:10px"><span class="metric">${on ? 'TRUE' : 'FALSE'}</span> — the action ${on ? 'fires' : 'does not fire'}${on ? '' : '; all three criteria must be met'}.</p>`;
  network.fit({animation: false, padding: 55});
}

network.on('click', event => {
  const id = event.nodes[0];
  const info = document.getElementById('info');
  if (id === 'plan') {
    info.innerHTML = '<h2>PlanDefinition: Diabetes Screening Guideline</h2><p>A reusable, patient-independent artifact. It carries the trigger criteria and points at the actions to take when they are met, but it names no patient and generates no order by itself.</p>' +
      '<dl>' + CRITERIA.map(c => `<dt>${c.label}</dt><dd>${c.detail}</dd>`).join('') + '</dl>' +
      '<p>Because the criteria live here rather than in each order, revising the guideline revises every future evaluation at once.</p>';
  } else if (id === 'inputs') {
    info.innerHTML = `<h2>Patient data inputs</h2><p>The patient-specific side of the evaluation: age ${state.age}, BMI ${state.bmi.toFixed(1)}, active diabetes diagnosis ${state.hasDiabetes ? 'present' : 'absent'}.</p><p>In production these are not slider values but resolved FHIR resources — a Patient birth date, an Observation carrying a body mass index, and a Condition search. The evaluation is identical either way.</p>`;
  } else if (id === 'result') {
    const failed = results().filter(r => !r.pass);
    info.innerHTML = `<h2>Evaluation result: ${fires() ? 'TRUE' : 'FALSE'}</h2>` +
      (fires()
        ? '<p>All three criteria are met, so the referenced ActivityDefinition fires.</p><p>Try raising the age above 70, or lowering BMI below 25 — either one alone is enough to turn this false. The criteria are joined by AND, not OR.</p>'
        : `<p>${failed.length} of 3 criteria not met: ${failed.map(f => f.label.toLowerCase()).join('; ')}.</p><p>The criteria are joined by AND, so one unmet clause is enough.</p>`);
  } else if (id === 'activity') {
    info.innerHTML = fires()
      ? `<h2>ActivityDefinition: Order HbA1c Test</h2><p>Also patient-independent on its own — it is a template for an order. Applying it to this patient produces a concrete, patient-specific request:</p><div class="code">${orderJson().replace(/&/g, '&amp;').replace(/</g, '&lt;')}</div><p>Note <code>"status": "draft"</code>. The guideline proposes the order; a clinician still signs it.</p>`
      : '<h2>ActivityDefinition: Order HbA1c Test</h2><p>Not triggered under the current inputs. The template exists and is unchanged — nothing about it depends on this patient. Adjust the sliders until the evaluation reads TRUE and select this node again to see the generated order.</p>';
  }
});

document.getElementById('age').addEventListener('input', e => { state.age = Number(e.target.value); rebuild(); });
document.getElementById('bmi').addEventListener('input', e => { state.bmi = Number(e.target.value); rebuild(); });
document.getElementById('dx').addEventListener('change', e => { state.hasDiabetes = e.target.checked; rebuild(); });
document.getElementById('reset').addEventListener('click', () => {
  state.age = 52; state.bmi = 29; state.hasDiabetes = false;
  document.getElementById('age').value = '52';
  document.getElementById('bmi').value = '29';
  document.getElementById('dx').checked = false;
  network.unselectAll();
  rebuild();
  start();
});

function start() {
  document.getElementById('info').innerHTML =
    '<h2>A guideline is not an order</h2><p>The PlanDefinition and the ActivityDefinition are both patient-independent. Only the evaluation — the diamond — knows anything about a specific person, and only when it reads TRUE does a concrete order come into existence. Move the sliders and select any node.</p>';
}

rebuild();
start();
new ResizeObserver(() => network.fit({animation: false, padding: 55})).observe(document.getElementById('network'));

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
