// CDS Hooks Request-Response Cycle — the same five-step shape, two hook types.
// CANVAS_HEIGHT: 1116
'use strict';

// Both scenarios are synthetic. The point of the toggle is that the SHAPE of the
// cycle never changes: only the hook name, the context, and the prefetch do.
const scenarios = {
  'order-sign': {
    label: 'order-sign',
    headline: 'Warfarin signed for a patient already on aspirin',
    side: 'Patient’s Active Medications',
    nodes: {
      trigger: ['Clinician signs<br/>warfarin order', 'triggerStyle'],
      fire: ['EHR fires<br/>order-sign hook', 'ehrStyle'],
      service: ['CDS service<br/>receives hook call', 'serviceStyle'],
      engine: ['Rule engine evaluates<br/>drug-drug interaction', 'engineStyle'],
      card: ['Card constructed', 'cardStyle'],
      render: ['EHR renders card<br/>to clinician', 'triggerStyle']
    },
    info: {
      trigger: ['1. Clinician signs the warfarin order',
        'The clinician has finished composing a new MedicationRequest for warfarin 5 mg daily and presses Sign. Nothing has been persisted yet — this is the moment <em>before</em> the order commits, which is exactly why <code>order-sign</code> is the right hook. An alert that arrives after the order is filed is an alert that arrives too late.', ''],
      fire: ['2. EHR fires the order-sign hook',
        'The EHR assembles two different things and posts them to the configured CDS service. <strong>Context</strong> is what is happening right now: the draft order. <strong>Prefetch</strong> is supporting data the EHR already has, sent along so the service does not have to call back for it.',
        `POST /cds-services/drug-drug-interaction
{
  "hook": "order-sign",
  "hookInstance": "d1577c69-dfbe-44ad-ba6d-3e05e953b2ea",
  "context": {
    "userId": "Practitioner/dr-patel",
    "patientId": "maria-chen",
    "draftOrders": {
      "resourceType": "Bundle",
      "entry": [{ "resource": {
        "resourceType": "MedicationRequest",
        "status": "draft",
        "medicationCodeableConcept": {
          "coding": [{ "system": "http://www.nlm.nih.gov/research/umls/rxnorm",
                       "code": "855332", "display": "warfarin sodium 5 MG" }] }
      }}]
    }
  },
  "prefetch": {
    "activeMeds": {
      "resourceType": "Bundle",
      "entry": [{ "resource": {
        "resourceType": "MedicationRequest",
        "status": "active",
        "medicationCodeableConcept": {
          "coding": [{ "code": "243670", "display": "aspirin 81 MG" }] }
      }}]
    }
  }
}`],
      service: ['3. CDS service receives the hook call',
        'An external endpoint, outside the EHR. It advertised itself in a discovery response saying which hook it listens for and which prefetch templates it wants. It does not query the chart on its own here — everything it needs arrived in the request body, which is what makes the round trip fast enough to sit in front of a Sign button.', ''],
      engine: ['4. Rule engine evaluates the interaction check',
        'The service hands context and prefetch to a Clinical Reasoning Module, which runs compiled ELM logic. The rule is a plain conjunction: a draft anticoagulant order AND an active antiplatelet medication on the same patient. Both halves are present, so the rule fires. Nothing here is a language model; it is deterministic, versioned logic that can be re-run and audited.', ''],
      card: ['5. A card is constructed',
        'The service returns zero or more <em>cards</em>. A card is the unit of advice: a summary line, an indicator that controls how loudly the EHR presents it, a source for attribution, and optional suggestions or links. Returning an empty <code>cards</code> array is a valid, common answer — it means "nothing to say."',
        `{
  "cards": [{
    "summary": "Bleeding risk: warfarin + aspirin",
    "indicator": "warning",
    "detail": "This patient has an active aspirin 81 mg order. Concurrent
warfarin raises bleeding risk. Consider reviewing the indication for
dual therapy.",
    "source": { "label": "Anticoagulation Stewardship Rules" },
    "links": [{
      "label": "Open anticoagulation order set",
      "url": "https://example.org/order-sets/anticoagulation",
      "type": "absolute"
    }]
  }]
}`],
      render: ['6. EHR renders the card to the clinician',
        'The EHR — not the CDS service — decides how the card appears. An <code>indicator</code> of <code>warning</code> in an order-sign workflow is typically interruptive: the clinician sees it before the signature completes and can act on the linked order set. The service proposes; the EHR presents; the clinician decides.', '']
    }
  },
  'patient-view': {
    label: 'patient-view',
    headline: 'Chart opened for a diabetic patient overdue for a retinal exam',
    side: 'Patient’s Observations and Conditions',
    nodes: {
      trigger: ['Clinician opens<br/>the patient chart', 'triggerStyle'],
      fire: ['EHR fires<br/>patient-view hook', 'ehrStyle'],
      service: ['CDS service<br/>receives hook call', 'serviceStyle'],
      engine: ['Rule engine evaluates<br/>care-gap check', 'engineStyle'],
      card: ['Card constructed', 'cardStyle'],
      render: ['EHR renders card<br/>to clinician', 'triggerStyle']
    },
    info: {
      trigger: ['1. Clinician opens the patient chart',
        'No order is being written. The trigger is simply that a chart came into view, which is why the hook type is <code>patient-view</code>. Anything surfaced here is informational context for the visit rather than a check on a specific pending action.', ''],
      fire: ['2. EHR fires the patient-view hook',
        'Compare this <code>context</code> with the order-sign version. There is no <code>draftOrders</code> entry, because nothing is being ordered — context carries only who is viewing and whose chart. The prefetch changes to match the question being asked: conditions and the last retinal-exam observation instead of the active medication list.',
        `POST /cds-services/diabetes-care-gaps
{
  "hook": "patient-view",
  "hookInstance": "6f2c0d55-1e3a-4f8b-9c11-0f3b2f8a4d21",
  "context": {
    "userId": "Practitioner/dr-patel",
    "patientId": "maria-chen"
  },
  "prefetch": {
    "conditions": {
      "resourceType": "Bundle",
      "entry": [{ "resource": {
        "resourceType": "Condition",
        "clinicalStatus": { "coding": [{ "code": "active" }] },
        "code": { "coding": [{ "system": "http://hl7.org/fhir/sid/icd-10-cm",
                               "code": "E11.9", "display": "Type 2 diabetes" }] }
      }}]
    },
    "lastRetinalExam": {
      "resourceType": "Bundle",
      "entry": [{ "resource": {
        "resourceType": "Observation",
        "code": { "coding": [{ "code": "32451-7",
                               "display": "Retinal exam" }] },
        "effectiveDateTime": "2024-02-11"
      }}]
    }
  }
}`],
      service: ['3. CDS service receives the hook call',
        'A different service from the interaction checker, registered for a different hook — but the endpoint contract is identical. This is the structural point of CDS Hooks: one request/response shape serves many unrelated kinds of advice, so an EHR integrates the pattern once.', ''],
      engine: ['4. Rule engine evaluates the care-gap check',
        'The same Clinical Reasoning Module, different compiled logic: an active diabetes condition AND a most-recent retinal exam older than the guideline interval. The exam on file is dated 2024-02-11, which is past the interval, so the gap is open and the rule fires.', ''],
      card: ['5. A card is constructed',
        'Same card structure, different content and a quieter indicator. <code>info</code> tells the EHR this is worth showing but not worth interrupting for — the difference between "you should know" and "stop what you are doing."',
        `{
  "cards": [{
    "summary": "Care gap: diabetic retinal exam overdue",
    "indicator": "info",
    "detail": "Last documented retinal exam was 2024-02-11, which is
outside the recommended screening interval for this patient.",
    "source": { "label": "Diabetes Quality Measure Set" },
    "suggestions": [{
      "label": "Order ophthalmology referral",
      "actions": [{ "type": "create", "description": "Referral to ophthalmology" }]
    }]
  }]
}`],
      render: ['6. EHR renders the card to the clinician',
        'An <code>info</code> card in a chart-opening workflow usually appears in a side panel rather than as a modal. Notice what did <em>not</em> change between the two scenarios: six steps, one POST, one JSON response, cards as the only output format. Only the hook name, the context contents, and the prefetch differ.', '']
    }
  }
};

const main = document.querySelector('main');
main.innerHTML = `<h1>CDS Hooks Request-Response Cycle</h1>
<p class="intro">Trace one alert from trigger to rendered card. Select any step to read the literal JSON that crosses that boundary.</p>
<div class="mermaid-controls controls">
  <button id="order-sign" aria-pressed="true">order-sign hook</button>
  <button id="patient-view" aria-pressed="false">patient-view hook</button>
  <button id="reset">Reset</button>
</div>
<div class="legend"><span>Blue: clinician-facing</span><span>Gray: EHR</span><span>Orange: CDS service</span><span>Purple: rule engine</span><span>Green: card</span><span>Dashed: prefetch assembly</span></div>
<div id="scenario" class="note"></div>
<div id="diagram" aria-label="CDS Hooks request-response cycle"></div>
<div id="info" class="mermaid-info info" aria-live="polite"></div>
<p class="footer">Synthetic teaching payloads, trimmed for legibility. Real hook calls carry additional required fields such as <code>fhirServer</code> and <code>fhirAuthorization</code>.</p>`;

let hook = 'order-sign';
let current = null;
let revision = 0;

mermaid.initialize({
  startOnLoad: false, securityLevel: 'loose', theme: 'base',
  themeVariables: {fontFamily: 'Arial', fontSize: '16px'},
  flowchart: {htmlLabels: true, useMaxWidth: false, nodeSpacing: 16, rankSpacing: 40, padding: 10, curve: 'basis'}
});

function markSelected() {
  document.querySelectorAll('#diagram .node').forEach(node =>
    node.classList.toggle('selected', node.dataset.concept === current));
}

window.showInfo = function (id) {
  const entry = scenarios[hook].info[id];
  if (!entry) return;
  current = id;
  const [heading, body, code] = entry;
  document.getElementById('info').innerHTML =
    `<h2>${heading}</h2><p>${body}</p>${code ? `<div class="code">${code.replace(/</g, '&lt;')}</div>` : ''}`;
  markSelected();
};

async function renderCycle() {
  const ticket = ++revision;
  const s = scenarios[hook];
  const ids = Object.keys(s.nodes);
  let code = 'flowchart TB\n';
  ids.forEach(id => { code += `${id}["${s.nodes[id][0]}"]:::${s.nodes[id][1]}\n`; });
  code += 'trigger --> fire --> service --> engine --> card --> render\n';
  code += `side["${s.side}"]:::sideStyle\nside -.->|"prefetch"| fire\n`;
  ids.forEach(id => { code += `click ${id} call showInfo("${id}")\n`; });
  code += `classDef triggerStyle fill:#d7eaff,stroke:#3776a8,color:#203348
classDef ehrStyle fill:#dfe4e9,stroke:#5a6978,color:#203348
classDef serviceStyle fill:#ffe2b7,stroke:#aa731e,color:#203348
classDef engineStyle fill:#e8dcfa,stroke:#8963ad,color:#203348
classDef cardStyle fill:#d5efda,stroke:#488457,color:#203348
classDef sideStyle fill:#fbe4ee,stroke:#a8557c,color:#203348
`;
  try {
    const {svg, bindFunctions} = await mermaid.render(`cds-hooks-${ticket}`, code);
    if (ticket !== revision) return;
    const panel = document.getElementById('diagram');
    panel.innerHTML = svg;
    bindFunctions?.(panel);
    panel.querySelectorAll('.node').forEach(node => {
      const id = (node.id.match(/flowchart-(.+)-\d+$/) || [])[1];
      if (!s.info[id]) return;
      node.dataset.concept = id;
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'button');
      node.setAttribute('aria-label', s.info[id][0]);
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

function setHook(next) {
  hook = next;
  ['order-sign', 'patient-view'].forEach(id =>
    document.getElementById(id).setAttribute('aria-pressed', String(id === next)));
  document.getElementById('scenario').innerHTML =
    `<strong>Scenario:</strong> ${scenarios[next].headline}. Hook type <code>${scenarios[next].label}</code>.`;
  document.getElementById('info').innerHTML =
    `<h2>Six steps, one round trip</h2><p>Select any step above. The five-step shape is identical for both hook types — what changes is the hook name, what the EHR puts in <code>context</code>, and which resources it prefetches.</p>`;
  current = null;
  renderCycle();
}

document.getElementById('order-sign').addEventListener('click', () => setHook('order-sign'));
document.getElementById('patient-view').addEventListener('click', () => setHook('patient-view'));
document.getElementById('reset').addEventListener('click', () => setHook('order-sign'));

setHook('order-sign');

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
