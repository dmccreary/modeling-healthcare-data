// Care Setting Acuity Flow Diagram — one encounter, traced from triage to discharge.
// CANVAS_HEIGHT: 928
'use strict';

// Synthetic but plausible operational figures. ESI 1 is the most severe level and
// ESI 5 the least, so admission probability falls as the number rises.
const acuity = {
  1: {label: 'ESI 1 — Resuscitation', admitRate: 0.93, boarding: 0.5, decisionMinutes: 8,
      note: 'Immediate life-saving intervention. Effectively every ESI 1 patient is admitted, and a bed is found fast because the case cannot wait.'},
  2: {label: 'ESI 2 — Emergent', admitRate: 0.62, boarding: 1.8, decisionMinutes: 42,
      note: 'High-risk presentation or severe distress. Most are admitted, and boarding is short because these patients are prioritized for the next open bed.'},
  3: {label: 'ESI 3 — Urgent', admitRate: 0.24, boarding: 4.6, decisionMinutes: 95,
      note: 'Stable, but needs two or more resources — labs, imaging, a specialist consult. This is the largest ED category and the one where boarding time hurts most: the patient is admitted, but not urgently enough to jump the bed queue.'},
  4: {label: 'ESI 4 — Less urgent', admitRate: 0.06, boarding: 6.2, decisionMinutes: 61,
      note: 'One resource needed. Almost always discharged home. On the rare admission, boarding is long precisely because the case is not urgent.'},
  5: {label: 'ESI 5 — Non-urgent', admitRate: 0.02, boarding: 7.1, decisionMinutes: 38,
      note: 'No resources beyond an exam. These visits are a common target for redirection to primary or urgent care.'}
};

const units = {
  icu: {name: 'ICU', los: 5.4, boardingFactor: 0.7, color: '#c9b6e8',
        note: 'Intensive Care Unit. Continuous monitoring, one nurse to one or two patients. Beds are the scarcest in the hospital, but an ICU-bound patient is rarely made to wait — the boarding penalty is absorbed elsewhere.'},
  medsurg: {name: 'Med-Surg', los: 3.1, boardingFactor: 1.25, color: '#dcc9f2',
        note: 'Medical-surgical floor. The general inpatient bed, and the largest pool. Because it is where most admitted ED patients go, it is also where a full hospital shows up first as ED boarding.'},
  telemetry: {name: 'Telemetry', los: 3.8, boardingFactor: 1.0, color: '#d3c0ee',
        note: 'Continuous cardiac monitoring without ICU-level staffing. A middle tier: fewer beds than Med-Surg, less scarce than ICU.'}
};

const nodeInfo = {
  triage: ['ED Triage',
    'A trained nurse assigns an Emergency Severity Index level from 1 (resuscitation) to 5 (non-urgent) within minutes of arrival. The level is a resource-and-risk prediction, not a diagnosis. Roughly 130 million emergency department visits occur annually in the United States, of which about 12 percent end in admission.',
    'Typical timeframe: 2–10 minutes from arrival.'],
  decision: ['Admit Decision',
    'The point where an emergency department encounter either ends or becomes an inpatient encounter. This is the boundary the whole diagram exists to make concrete: ED care and inpatient care are two different encounters for the same patient, joined by this decision, not one continuous stay.',
    'Typical timeframe: 1–4 hours from arrival, depending on acuity and how much workup the ESI level implies.'],
  home: ['Discharge Home',
    'The encounter closes from the emergency department. The patient may still carry follow-up instructions, a prescription, and a referral, all of which attach to the ED encounter rather than to an inpatient stay.',
    'Roughly 88 percent of United States emergency department visits end this way.'],
  unit: ['Inpatient Unit',
    'A hospital department with beds, staffing ratios, and monitoring capability. Which unit a patient goes to is a clinical decision, but which unit has a bed free is an operational one — and the second frequently delays the first.',
    'Use the unit buttons to compare ICU, Med-Surg, and Telemetry.'],
  discharge: ['Discharge',
    'The inpatient encounter closes. Length of stay is measured from inpatient admission, not from emergency department arrival — so boarding hours spent waiting in an ED bed do not appear in this number at all.',
    'This measurement boundary is why boarding is easy for a hospital to under-count.']
};

const main = document.querySelector('main');
// Full-width workspace: the flow is wide, and a narrow column would shrink the
// edge-property labels below a readable size.
main.className = 'wide';
main.innerHTML = `<h1>Care Setting Acuity Flow Diagram</h1>
<p class="intro">One encounter, from triage to discharge. Change the acuity level and watch the path — and the boarding time — change with it.</p>
<div class="legend">
  <span><i class="swatch" style="background:#9dc9f2"></i>Emergency department</span>
  <span><i class="swatch" style="background:#dcc9f2"></i>Inpatient unit</span>
  <span><i class="swatch" style="background:#bfe3c8"></i>Discharge outcome</span>
  <span>Boarding: <i class="swatch" style="background:#2e7d32"></i>&lt;2 h <i class="swatch" style="background:#c98600"></i>2–4 h <i class="swatch" style="background:#b23b3b"></i>&gt;4 h</span>
</div>
<div class="workspace">
  <div id="network" class="graph" aria-label="Emergency department to inpatient care flow"></div>
  <aside class="side">
    <label for="esi">Triage acuity: <strong id="esiLabel">ESI 3 — Urgent</strong></label>
    <input type="range" id="esi" min="1" max="5" step="1" value="3" aria-describedby="esiNote">
    <p id="esiNote" style="font-size:13px;margin-top:0"></p>
    <div class="controls">
      <button id="icu" aria-pressed="false">ICU</button>
      <button id="medsurg" aria-pressed="true">Med-Surg</button>
      <button id="telemetry" aria-pressed="false">Telemetry</button>
    </div>
    <div class="controls"><button id="reset">Reset to ESI 3</button></div>
    <div id="info" class="info" aria-live="polite"></div>
  </aside>
</div>
<p class="footer">Synthetic encounter data. Edge labels are abbreviated; the stored property names are <code>time_to_decision_minutes</code>, <code>boarding_time_hours</code>, and <code>length_of_stay_days</code> — hover any edge to see the full name and value. Boarding time is the wait between the admit decision and an inpatient bed becoming available, the most direct observable sign of capacity strain.</p>`;

let esi = 3;
let unit = 'medsurg';

function boardingHours() {
  return Math.round(acuity[esi].boarding * units[unit].boardingFactor * 10) / 10;
}

function boardingColor(hours) {
  return hours < 2 ? '#2e7d32' : hours <= 4 ? '#c98600' : '#b23b3b';
}

function admitted() {
  return acuity[esi].admitRate >= 0.5;
}

const nodes = new vis.DataSet();
const edges = new vis.DataSet();

const network = new vis.Network(document.getElementById('network'), {nodes, edges}, {
  layout: {hierarchical: {enabled: true, direction: 'LR', sortMethod: 'directed', levelSeparation: 300, nodeSpacing: 150}},
  physics: {enabled: false},
  nodes: {borderWidth: 2, font: {size: 15, face: 'Arial', color: '#203348', multi: 'html'}, margin: 10},
  edges: {arrows: 'to', width: 2, font: {size: 13, face: 'Arial', background: 'aliceblue', align: 'top', strokeWidth: 0}, smooth: {type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.45}},
  interaction: {hover: true, tooltipDelay: 150, zoomView: false, dragView: false, dragNodes: false, navigationButtons: true, keyboard: {enabled: true, bindToWindow: false}}
});

function rebuild() {
  const a = acuity[esi];
  const u = units[unit];
  const admit = admitted();
  const hours = boardingHours();
  const dim = '#c8d2dc';

  nodes.update([
    {id: 'triage', label: `<b>ED Triage</b>\nesi_level: ${esi}\narrival_time: 08:14`,
      shape: 'box', color: {background: '#9dc9f2', border: '#3776a8'}, level: 0},
    {id: 'decision', label: `<b>Admit Decision</b>\ndecision_time: ${decisionClock(a.decisionMinutes)}\ndecision: ${admit ? 'Admit' : 'Discharge'}`,
      shape: 'diamond', size: 46, color: {background: '#cfe4f7', border: '#3776a8'}, level: 1},
    {id: 'home', label: '<b>Discharge Home</b>',
      shape: 'box', color: {background: admit ? '#eef2f5' : '#bfe3c8', border: admit ? dim : '#488457'},
      font: {color: admit ? '#8a97a3' : '#203348'}, level: 2},
    {id: 'unit', label: `<b>Inpatient Unit</b>\n${u.name}`,
      shape: 'box', color: {background: admit ? u.color : '#eef2f5', border: admit ? '#8963ad' : dim},
      font: {color: admit ? '#203348' : '#8a97a3'}, level: 2},
    {id: 'discharge', label: '<b>Discharge</b>',
      shape: 'box', color: {background: admit ? '#bfe3c8' : '#eef2f5', border: admit ? '#488457' : dim},
      font: {color: admit ? '#203348' : '#8a97a3'}, level: 3}
  ]);

  edges.update([
    // Short label: this edge is the shortest in the layout, so a full property
    // name would overlap the nodes at narrow widths. The name is in the tooltip.
    {id: 'e1', from: 'triage', to: 'decision', label: `${a.decisionMinutes} min`,
      title: `time_to_decision_minutes: ${a.decisionMinutes}`, color: {color: '#3776a8'}, width: 3},
    {id: 'e2', from: 'decision', to: 'home', label: admit ? 'not taken' : 'decision = Discharge',
      color: {color: admit ? dim : '#488457'}, width: admit ? 1 : 3, dashes: admit},
    {id: 'e3', from: 'decision', to: 'unit', label: admit ? `boarding: ${hours} h` : 'not taken',
      title: admit ? `boarding_time_hours: ${hours}` : 'This branch is not taken at the current acuity level.',
      color: {color: admit ? boardingColor(hours) : dim}, width: admit ? 4 : 1, dashes: !admit},
    {id: 'e4', from: 'unit', to: 'discharge', label: admit ? `stay: ${u.los} days` : 'not taken',
      title: admit ? `length_of_stay_days: ${u.los}` : 'This branch is not taken at the current acuity level.',
      color: {color: admit ? '#8963ad' : dim}, width: admit ? 3 : 1, dashes: !admit}
  ]);

  document.getElementById('esiLabel').textContent = a.label;
  document.getElementById('esiNote').textContent =
    `${Math.round(a.admitRate * 100)}% of encounters at this level are admitted. ${a.note}`;
  network.fit({animation: false, padding: 30});
}

// Arrival is fixed at 08:14; the decision clock advances by the time-to-decision.
function decisionClock(minutes) {
  const total = 8 * 60 + 14 + minutes;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function showNode(id) {
  const entry = nodeInfo[id];
  if (!entry) return;
  const [heading, body, extra] = entry;
  let detail = '';
  if (id === 'decision') {
    detail = `<p class="note">At ESI ${esi}, the branch taken here is <strong>${admitted() ? 'Admit' : 'Discharge'}</strong>. Move the acuity slider and this branch changes; the two outgoing edges are always both present in the model, but only one is traversed for any given encounter.</p>`;
  } else if (id === 'unit') {
    const hours = boardingHours();
    detail = `<p>${units[unit].note}</p><dl><dt>boarding_time_hours</dt><dd><strong style="color:${boardingColor(hours)}">${hours}</strong> — ${hours < 2 ? 'within target' : hours <= 4 ? 'strained' : 'over target; the emergency department is holding an admitted patient in an ED bed'}</dd><dt>length_of_stay_days</dt><dd>${units[unit].los}</dd></dl>`;
  } else if (id === 'discharge') {
    detail = `<p class="note">Length of stay for this encounter is ${units[unit].los} days, measured from the inpatient admission. The ${boardingHours()} hours of boarding sit before that clock starts.</p>`;
  }
  document.getElementById('info').innerHTML = `<h2>${heading}</h2><p>${body}</p>${detail}<p>${extra}</p>`;
}

network.on('click', event => {
  const id = event.nodes[0];
  if (id) showNode(id);
  else if (event.edges[0]) showEdge(event.edges[0]);
});

function showEdge(id) {
  const hours = boardingHours();
  const messages = {
    e1: ['time_to_decision_minutes', `How long the emergency department took to decide. At ESI ${esi} this is ${acuity[esi].decisionMinutes} minutes — lower acuity does not always mean faster, because a stable patient needing several tests can take longer than a critical one needing an immediate intervention.`],
    e2: ['decision = Discharge', 'The branch taken when the patient goes home from the emergency department. About 88 percent of United States emergency department visits end here.'],
    e3: ['boarding_time_hours', `<strong style="color:${boardingColor(hours)}">${hours} hours</strong> between the admit decision and an available inpatient bed. This edge property is the clearest single measure of hospital capacity strain, and it is a property of the <em>relationship</em>, not of either encounter — which is exactly why a graph model records it well.`],
    e4: ['length_of_stay_days', `${units[unit].los} days on ${units[unit].name}. Compare the three units: intensive care stays run longest, and general medical-surgical stays shortest.`]
  };
  const [heading, body] = messages[id] || [];
  if (heading) document.getElementById('info').innerHTML = `<h2>Edge: ${heading}</h2><p>${body}</p>`;
}

document.getElementById('esi').addEventListener('input', event => {
  esi = Number(event.target.value);
  rebuild();
  showNode('decision');
});

['icu', 'medsurg', 'telemetry'].forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    unit = id;
    ['icu', 'medsurg', 'telemetry'].forEach(other =>
      document.getElementById(other).setAttribute('aria-pressed', String(other === id)));
    rebuild();
    showNode('unit');
  });
});

document.getElementById('reset').addEventListener('click', () => {
  esi = 3;
  unit = 'medsurg';
  document.getElementById('esi').value = '3';
  ['icu', 'medsurg', 'telemetry'].forEach(other =>
    document.getElementById(other).setAttribute('aria-pressed', String(other === 'medsurg')));
  rebuild();
  start();
});

function start() {
  document.getElementById('info').innerHTML =
    '<h2>One patient, two possible encounters</h2><p>Select any node or edge for its definition and its current value. The acuity slider changes which branch is taken; the unit buttons change how long the wait for a bed is, and how long the stay lasts.</p>';
}

rebuild();
start();
new ResizeObserver(() => network.fit({animation: false, padding: 30})).observe(document.getElementById('network'));

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
