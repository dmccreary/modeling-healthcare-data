// Security Incident Response Lifecycle — five stages around one insider-threat alert.
// CANVAS_HEIGHT: 768
'use strict';

// Running scenario: an analytics account reads patient subgraphs across wards it
// has never touched before. Each stage is defined generally, then grounded in it.
const stages = {
  identify: ['1. Identify',
    'Detect that something has happened and establish what it is. Identification covers both the alert itself and the initial scoping: which accounts, which data, which time window.',
    'Insider Threat Detection flags anomalous cross-ward access by a user account. The account belongs to a data analyst whose normal pattern is aggregate queries against one service line; overnight it began traversing individual patient subgraphs across oncology, behavioral health, and obstetrics. Nothing has been blocked yet — at this stage the finding is a deviation from a baseline, not a proven violation.'],
  contain: ['2. Contain',
    'Stop the activity from continuing or spreading, before spending time on why it happened. Containment deliberately precedes diagnosis: an ongoing exfiltration costs more with every minute spent investigating it.',
    'Suspend the affected account’s session tokens and IAM credentials to stop further access immediately. In a graph database this also means terminating in-flight queries and revoking the role bindings that granted cross-ward traversal, not merely disabling the login — a live session with a cached token keeps reading otherwise.'],
  eradicate: ['3. Eradicate',
    'Determine the root cause and remove it. Until this stage completes, restoring service would restore the problem along with it.',
    'Determine root cause — a compromised credential versus a genuine policy violation — and remove it. The two lead to entirely different remedies: a phished credential is rotated and the phishing vector closed, while an authorized user who exceeded their purpose is a human-resources and access-policy matter. Graph audit logs are the evidence here, because they record which traversals ran, not just which tables were touched.'],
  recover: ['4. Recover',
    'Return to normal operation and confirm that normal is actually normal. Recovery is not complete when service resumes; it is complete when monitoring confirms the activity has not returned.',
    'Restore normal account access — if the credential was compromised and has now been reset — and verify that no lingering unauthorized access remains. Verification means re-running the detection query over the containment window and confirming no other account shows the same traversal pattern, since one compromised credential is often used to establish a second.'],
  lessons: ['5. Lessons Learned',
    'Convert the incident into a durable change. Without this stage the same incident recurs with a different account.',
    'Update the security risk assessment and the vulnerability management backlog with any new finding. In this case: the detection rule fired on volume but not on ward diversity, so a ward-diversity signal is added; and the analytics role granted patient-level traversal it never needed, so the role is narrowed. The dashed arrow back to Identify is this improvement reaching detection.']
};

const main = document.querySelector('main');
main.innerHTML = `<h1>Security Incident Response Lifecycle</h1>
<p class="intro">Five stages, one running scenario: an analytics account reading patient subgraphs across wards it has never touched. Select any stage.</p>
<div class="mermaid-controls controls">
  <button id="walk">Walk the scenario</button>
  <button id="reset">Reset</button>
</div>
<div class="legend"><span>Red: Identify</span><span>Orange: Contain</span><span>Yellow: Eradicate</span><span>Green: Recover</span><span>Blue: Lessons Learned</span><span>Dashed: improved future detection</span></div>
<div id="diagram" aria-label="Five-stage security incident response lifecycle"></div>
<div id="info" class="mermaid-info info" aria-live="polite"></div>
<p class="footer">Synthetic scenario. Stage order is fixed by design: containment precedes diagnosis, and recovery precedes the post-incident review.</p>`;

let current = null;
let revision = 0;
let walkTimer = null;

mermaid.initialize({
  startOnLoad: false, securityLevel: 'loose', theme: 'base',
  themeVariables: {fontFamily: 'Arial', fontSize: '16px'},
  flowchart: {htmlLabels: true, useMaxWidth: false, nodeSpacing: 18, rankSpacing: 30, padding: 10, curve: 'basis'}
});

function markSelected() {
  document.querySelectorAll('#diagram .node').forEach(node =>
    node.classList.toggle('selected', node.dataset.concept === current));
}

window.showInfo = function (id) {
  if (!stages[id]) return;
  current = id;
  const [heading, definition, detail] = stages[id];
  document.getElementById('info').innerHTML =
    `<h2>${heading}</h2><p><strong>What the stage accomplishes.</strong> ${definition}</p><p><strong>In this scenario.</strong> ${detail}</p>`;
  markSelected();
};

async function renderLifecycle() {
  const ticket = ++revision;
  const code = `flowchart TB
identify(["1\\. Identify"]):::identifyStyle
contain(["2\\. Contain"]):::containStyle
eradicate(["3\\. Eradicate"]):::eradicateStyle
recover(["4\\. Recover"]):::recoverStyle
lessons(["5\\. Lessons Learned"]):::lessonsStyle
identify --> contain --> eradicate --> recover --> lessons
lessons -.->|"improved future detection"| identify
click identify call showInfo("identify")
click contain call showInfo("contain")
click eradicate call showInfo("eradicate")
click recover call showInfo("recover")
click lessons call showInfo("lessons")
classDef identifyStyle fill:#fbd0d0,stroke:#a33c3c,color:#203348
classDef containStyle fill:#ffe2b7,stroke:#aa731e,color:#203348
classDef eradicateStyle fill:#fdf1c4,stroke:#a89020,color:#203348
classDef recoverStyle fill:#d5efda,stroke:#488457,color:#203348
classDef lessonsStyle fill:#d7eaff,stroke:#3776a8,color:#203348
`;
  try {
    const {svg, bindFunctions} = await mermaid.render(`incident-${ticket}`, code);
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
      node.setAttribute('aria-label', stages[id][0]);
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

function stopWalk() {
  if (walkTimer) { clearInterval(walkTimer); walkTimer = null; }
  document.getElementById('walk').textContent = 'Walk the scenario';
}

document.getElementById('walk').addEventListener('click', () => {
  if (walkTimer) { stopWalk(); return; }
  const order = Object.keys(stages);
  let step = 0;
  document.getElementById('walk').textContent = 'Stop';
  window.showInfo(order[step]);
  walkTimer = setInterval(() => {
    step += 1;
    if (step >= order.length) { stopWalk(); return; }
    window.showInfo(order[step]);
  }, 5000);
});

document.getElementById('reset').addEventListener('click', () => {
  stopWalk();
  current = null;
  markSelected();
  document.getElementById('info').innerHTML =
    '<h2>An alert arrives at 02:14</h2><p>An analytics account that normally runs aggregate queries against one service line has begun traversing individual patient subgraphs across three unrelated wards. Select stage 1 and work forward, or use <strong>Walk the scenario</strong> to advance automatically.</p>';
});

renderLifecycle();
document.getElementById('info').innerHTML =
  '<h2>An alert arrives at 02:14</h2><p>An analytics account that normally runs aggregate queries against one service line has begun traversing individual patient subgraphs across three unrelated wards. Select stage 1 and work forward, or use <strong>Walk the scenario</strong> to advance automatically.</p>';

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
