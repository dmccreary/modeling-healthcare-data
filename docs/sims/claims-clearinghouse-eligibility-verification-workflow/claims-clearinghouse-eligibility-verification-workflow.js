// Claims Clearinghouse and Eligibility Verification Workflow — the plumbing
// around adjudication, and the accumulator both halves share.
// CANVAS_HEIGHT: 1425
'use strict';

const info = {
  s1: ['1. Front desk initiates the eligibility check',
    'Before the Visit. The provider’s system queries the payer in real time before the appointment, using the X12 270 eligibility-request transaction. This happens while the patient can still be told what the visit will cost — which is the whole reason the check runs early rather than at billing time.'],
  s2: ['2. Query Member → Policy → BenefitPlan → Coverage',
    'Before the Visit. The same <code>ENROLLED_IN → BASED_ON → COVERS</code> traversal used during adjudication, run proactively. Nothing about the graph changes; only the timing does. The payer walks from the member to the policy they are enrolled in, to the benefit plan that policy is based on, to the coverage rules for the service being scheduled.'],
  s3: ['3. Return active coverage and current accumulator balances',
    'Before the Visit. The payer’s X12 271 response reports deductible-met and out-of-pocket-maximum-remaining amounts so the front desk can estimate the patient’s cost before care is delivered. These numbers are a snapshot: they reflect every claim finalized so far, which is why the dashed arrow from step 7 matters.'],
  s4: ['4. Provider submits the claim (837)',
    'After the Visit. The coded claim leaves the provider’s billing system as an X12 837 transaction — diagnosis codes, procedure codes, dates of service, rendering provider, and the charges. This is a document handoff, not a query: the provider states what happened and asks to be paid for it.'],
  s5: ['5. Clearinghouse validates and routes',
    'After the Visit. The clearinghouse checks formatting, translates to the payer’s required format, and forwards the claim — sparing the provider from integrating with every payer directly. It rejects malformed claims up front, which is cheaper for everyone than a payer denial: a clearinghouse rejection never entered adjudication and can be corrected and resubmitted the same day.'],
  s6: ['6. Payer processes and adjudicates',
    'After the Visit. The full adjudication pipeline runs here: member and coverage verification, provider network status, medical necessity and benefit rules, allowed amount and cost-sharing calculation. This step is the subject of the preceding chapter; in this diagram it is deliberately one box, so the plumbing around it stays visible.'],
  s7: ['7. Benefit accumulator updated',
    'After the Visit. The member’s deductible and out-of-pocket-maximum running totals are updated with this claim’s result. That update is what the <em>next</em> eligibility check will read — follow the dashed arrow back to step 3. The accumulator is the single piece of state the two swimlanes share, and it is the reason a cost estimate given in the morning can be stale by the afternoon.'],
  s8: ['8. Electronic remittance advice (ERA / X12 835) sent to the provider',
    'After the Visit. The provider-facing counterpart to the member’s explanation of benefits, itemizing what was paid, denied, and why, formatted for automatic posting to the provider’s accounts-receivable system. The member gets an EOB describing the same adjudication in consumer terms; the provider gets an 835 a machine can post without a human re-keying it.']
};

const main = document.querySelector('main');
main.innerHTML = `<h1>Claims Clearinghouse and Eligibility Verification Workflow</h1>
<p class="intro">The administrative plumbing that surrounds adjudication. Select any step to read what it accomplishes.</p>
<div class="mermaid-controls controls">
  <button id="both" aria-pressed="true">Both swimlanes</button>
  <button id="before" aria-pressed="false">Before the Visit</button>
  <button id="after" aria-pressed="false">After the Visit</button>
  <button id="accumulator">Follow the accumulator</button>
</div>
<div class="legend"><span>Blue: real-time query or graph traversal</span><span>Orange: document or X12 transaction</span><span>Gray: intermediary or processing</span><span>Dashed: the accumulator loop</span></div>
<div id="diagram" aria-label="Eligibility verification and claims clearinghouse workflow"></div>
<div id="info" class="mermaid-info info" aria-live="polite"></div>
<p class="footer">X12 270/271, 837, and 835 are the standard transaction sets for eligibility request, eligibility response, claim submission, and remittance advice.</p>`;

let view = 'both';
let current = null;
let revision = 0;

mermaid.initialize({
  startOnLoad: false, securityLevel: 'loose', theme: 'base',
  themeVariables: {fontFamily: 'Arial', fontSize: '16px'},
  flowchart: {htmlLabels: true, useMaxWidth: false, nodeSpacing: 16, rankSpacing: 36, padding: 10, curve: 'basis', subGraphTitleMargin: {top: 6, bottom: 12}}
});

const BEFORE = `subgraph LANE_BEFORE["Before the Visit"]
  s1["1\\. Front desk initiates<br/>eligibility check"]:::queryStyle
  s2["2\\. Query Member → Policy →<br/>BenefitPlan → Coverage"]:::queryStyle
  s3["3\\. Return active coverage +<br/>current accumulator balances"]:::queryStyle
  s1 --> s2 --> s3
end
`;
const AFTER = `subgraph LANE_AFTER["After the Visit"]
  s4["4\\. Provider submits<br/>claim (837)"]:::docStyle
  s5["5\\. Clearinghouse validates<br/>and routes"]:::midStyle
  s6["6\\. Payer processes<br/>and adjudicates"]:::midStyle
  s7["7\\. Benefit accumulator<br/>updated"]:::queryStyle
  s8["8\\. Electronic remittance advice<br/>(ERA / X12 835) to provider"]:::docStyle
  s4 --> s5 --> s6 --> s7 --> s8
end
`;
const CLASSES = `classDef queryStyle fill:#d7eaff,stroke:#3776a8,color:#203348
classDef docStyle fill:#ffe2b7,stroke:#aa731e,color:#203348
classDef midStyle fill:#dfe4e9,stroke:#5a6978,color:#203348
`;

function idsFor(v) {
  if (v === 'before') return ['s1', 's2', 's3'];
  if (v === 'after') return ['s4', 's5', 's6', 's7', 's8'];
  return ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'];
}

function markSelected() {
  document.querySelectorAll('#diagram .node').forEach(node =>
    node.classList.toggle('selected', node.dataset.concept === current));
}

window.showInfo = function (id) {
  if (!info[id]) return;
  current = id;
  document.getElementById('info').innerHTML = `<h2>${info[id][0]}</h2><p>${info[id][1]}</p>`;
  markSelected();
};

async function renderFlow() {
  const ticket = ++revision;
  let code = 'flowchart TB\n';
  if (view !== 'after') code += BEFORE;
  if (view !== 'before') code += AFTER;
  if (view === 'both') {
    code += 's3 --> s4\n';
    code += 's7 -.->|"next eligibility check reads<br/>the updated balances"| s3\n';
  }
  idsFor(view).forEach(id => { code += `click ${id} call showInfo("${id}")\n`; });
  code += CLASSES;
  try {
    const {svg, bindFunctions} = await mermaid.render(`claims-flow-${ticket}`, code);
    if (ticket !== revision) return;
    const panel = document.getElementById('diagram');
    panel.innerHTML = svg;
    bindFunctions?.(panel);
    panel.querySelectorAll('.node').forEach(node => {
      const id = (node.id.match(/flowchart-(.+)-\d+$/) || [])[1];
      if (!info[id]) return;
      node.dataset.concept = id;
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'button');
      node.setAttribute('aria-label', info[id][0]);
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

function setView(next, message) {
  view = next;
  ['both', 'before', 'after'].forEach(id =>
    document.getElementById(id).setAttribute('aria-pressed', String(id === next)));
  if (!idsFor(next).includes(current)) current = null;
  document.getElementById('info').innerHTML = message;
  renderFlow();
}

document.getElementById('both').addEventListener('click', () => setView('both',
  '<h2>Eight steps, one shared accumulator</h2><p>Steps 1–3 run before care is delivered; steps 4–8 run after. Select any step for what it accomplishes.</p>'));
document.getElementById('before').addEventListener('click', () => setView('before',
  '<h2>Before the Visit</h2><p>A real-time question: is this member covered for this service today, and how much of their deductible is left? Three steps, no documents exchanged.</p>'));
document.getElementById('after').addEventListener('click', () => setView('after',
  '<h2>After the Visit</h2><p>A document journey: the claim leaves the provider, passes through a clearinghouse, is adjudicated, updates the accumulator, and returns as a remittance advice.</p>'));
document.getElementById('accumulator').addEventListener('click', () => {
  setView('both', '<h2>Follow the accumulator</h2><p>The dashed arrow is the only link from the second swimlane back to the first. Step 7 writes the member’s running deductible and out-of-pocket totals; step 3 reads them. A cost estimate is therefore only as current as the last claim to finish adjudicating.</p>');
  current = 's7';
  // Give the re-render a turn to finish before highlighting the node it creates.
  setTimeout(markSelected, 60);
});

setView('both', '<h2>Eight steps, one shared accumulator</h2><p>Steps 1–3 run before care is delivered; steps 4–8 run after. Select any step for what it accomplishes.</p>');

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
