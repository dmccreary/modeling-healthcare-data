// CMS CQL Measure Development and Certification Pipeline — authoring to payment.
// CANVAS_HEIGHT: 443
'use strict';

// The horizontal axis is pipeline order, not calendar time: each phase occupies
// one month slot so the sequence reads left to right without implying durations.
function slot(index, span = 1) {
  const start = new Date(2026, index, 1);
  const end = new Date(2026, index + span, 1);
  return {start, end};
}

const phases = [
  {id: 1, group: 1, className: 'author', content: '1 · Author in MADiE',
   tip: 'A knowledge engineer writes the CQL library and population criteria in the Measure Authoring Development Integrated Environment.',
   detail: 'MADiE is where a measure begins. The engineer writes the CQL library, defines the initial population, denominator, exclusions, and numerator, and binds each data element to a value set. The CQF Recommendations implementation guide governs how those elements are shaped, so the measure’s data requirements land on the same FHIR resources every certified EHR already exposes.',
   recall: 'Recalls the population structure from the measure funnel, and the terminology binding chain from Chapter 23.'},
  {id: 2, group: 1, className: 'test', content: '2 · Quick-test in CQL Runner',
   tip: 'Ad hoc testing of individual define statements against a sample patient.',
   detail: 'CQL Runner evaluates one <code>define</code> at a time. It exists because a full measure run is a slow way to find out that a single expression has the wrong operator. This is the unit test of measure authoring — you paste one statement, point it at a sample patient, and read back true or false.',
   recall: 'The “Has Diabetes” define statement from the CQL-to-ELM pipeline is exactly the kind of fragment tested here.'},
  {id: 3, group: 1, className: 'test', content: '3 · Full measure testing',
   tip: 'Synthetic patient test cases run against the complete measure bundle.',
   detail: 'Every population is exercised against synthetic patients built to land in specific cells: one who belongs in the numerator, one excluded for hospice, one just outside the age range. Historically this was Bonnie’s job as a separate tool; since MADiE’s consolidation it is a tab in the same environment where the measure was authored.',
   recall: 'This is where the four populations of the measure funnel are each proven to catch the patients they are supposed to catch.'},
  {id: 4, group: 1, className: 'compile', content: '4 · CQL-to-ELM compilation',
   tip: 'The measure’s CQL library compiles to the Expression Logical Model for execution.',
   detail: 'The human-readable CQL becomes an explicit expression tree. Nothing about the clinical meaning changes; what changes is that an engine can now walk the logic without a CQL parser. A compile failure here is a type or syntax error, never a clinical disagreement.',
   recall: 'This is the CQL Compiler and Expression Logical Model from Chapter 23, appearing in the pipeline where they actually run.'},
  {id: 5, group: 1, className: 'certify', content: '5 · EHR certification via Cypress',
   tip: 'The vendor’s CQL execution engine is certified against standardized test cases.',
   detail: 'Cypress certifies the <em>engine</em>, not the measure. It feeds a vendor’s Clinical Reasoning Module a standardized set of patients and known-correct answers, and checks that the vendor’s implementation produces those answers. Without this step, the same compiled measure could return different rates at two different hospitals — and nobody could tell which one was wrong.',
   recall: 'The Clinical Reasoning Module from Chapter 23 is the component under test here.'},
  {id: 6, group: 1, className: 'certify', content: '6 · Live eCQM evaluation',
   tip: 'The compiled measure runs automatically against real patient data inside the certified EHR.',
   detail: 'The first step that touches real patients. The certified engine evaluates the compiled ELM against the health system’s own FHIR resources on a schedule, producing the population counts for the reporting period. Everything before this point was rehearsal.',
   recall: 'The same evaluation shown patient-by-patient in the CQL-to-ELM pipeline, now run across an entire population.'},
  {id: 7, group: 1, className: 'report', content: '7 · Quality reporting submission',
   tip: 'Aggregated results are submitted to CMS, tying measure performance to reimbursement.',
   detail: 'The aggregated counts are submitted through the Quality Reporting Architecture to programs such as MIPS. This is where the pipeline stops being a technical exercise: the reported rate adjusts payment. It is also why every earlier step is specified so tightly — an ambiguity in step 1 becomes a payment difference here.',
   recall: 'The reported rate from the measure funnel is the number that arrives at this step.'}
];

const legacy = [
  {id: 101, group: 2, className: 'legacy', content: 'Author in MAT',
   tip: 'The Measure Authoring Tool — MADiE’s predecessor, retired in favor of the consolidated environment.',
   detail: 'The Measure Authoring Tool was where measures were written before MADiE. It authored the measure but did not test it, so an author moved artifacts by hand between MAT and a separate testing tool. You will still find MAT named in older CMS documentation and in measure specifications published before the consolidation.',
   recall: 'Superseded by step 1.'},
  {id: 102, group: 2, className: 'legacy', content: 'Test in Bonnie',
   tip: 'The standalone measure testing tool, since folded into MADiE.',
   detail: 'Bonnie held the synthetic patient test cases and ran them against a measure exported from MAT. Splitting authoring and testing across two tools meant every edit required a re-export, and it was entirely possible for the tested artifact and the published artifact to drift apart. Folding testing into MADiE removed that gap — which is the single clearest reason the consolidation happened.',
   recall: 'Superseded by step 3.'}
];

const main = document.querySelector('main');
main.className = 'wide';
main.innerHTML = `<h1>CMS CQL Measure Development and Certification Pipeline</h1>
<p class="intro">Seven phases from a blank CQL library to a payment adjustment. Select any phase for what that tool does.</p>
<div class="legend">
  <span><i class="swatch" style="background:#d7eaff"></i>Authoring</span>
  <span><i class="swatch" style="background:#d5efda"></i>Testing</span>
  <span><i class="swatch" style="background:#ffe2b7"></i>Compilation</span>
  <span><i class="swatch" style="background:#e8dcfa"></i>Certification and execution</span>
  <span><i class="swatch" style="background:#fbe4ee"></i>Reporting</span>
  <span><i class="swatch" style="background:#e6eaee;border:1px dashed #8a97a3"></i>Legacy tooling</span>
</div>
<div class="mermaid-controls controls">
  <button id="legacyBtn" aria-pressed="false">Show legacy path (MAT and Bonnie)</button>
  <button id="fit">Fit to window</button>
  <button id="reset">Reset</button>
</div>
<div id="timeline" aria-label="Measure development and certification pipeline"></div>
<div id="info" class="mermaid-info info" aria-live="polite"></div>
<p class="footer">The horizontal axis is pipeline order, not elapsed time — real measures spend far longer in authoring and testing than in compilation.</p>`;

const all = [...phases, ...legacy];
const byId = Object.fromEntries(all.map(p => [p.id, p]));

const items = new vis.DataSet(phases.map((p, i) => ({...p, ...slot(i), title: p.tip})));
const groups = new vis.DataSet([
  {id: 1, content: 'Modern<br>(MADiE)'},
  {id: 2, content: 'Legacy<br>(pre-2022)'}
]);

const timeline = new vis.Timeline(document.getElementById('timeline'), items, groups, {
  stack: false,
  margin: {item: {horizontal: 6, vertical: 12}},
  orientation: 'top',
  showCurrentTime: false,
  zoomable: false,
  moveable: true,
  selectable: true,
  min: new Date(2025, 11, 1),
  max: new Date(2026, 8, 1),
  start: new Date(2025, 11, 20),
  end: new Date(2026, 7, 10),
  format: {minorLabels: () => '', majorLabels: () => ''},
  showMajorLabels: false,
  showMinorLabels: false
});
// Groups are only meaningful once the legacy row exists.
timeline.setGroups(null);

let showLegacy = false;

function showPhase(id) {
  const p = byId[id];
  if (!p) return;
  document.getElementById('info').innerHTML =
    `<h2>${p.content}</h2><p>${p.detail}</p><p class="note"><strong>Where you have seen this before.</strong> ${p.recall}</p>`;
}

timeline.on('select', properties => {
  if (properties.items.length) showPhase(properties.items[0]);
});

document.getElementById('legacyBtn').addEventListener('click', () => {
  showLegacy = !showLegacy;
  const button = document.getElementById('legacyBtn');
  button.setAttribute('aria-pressed', String(showLegacy));
  button.textContent = showLegacy ? 'Hide legacy path' : 'Show legacy path (MAT and Bonnie)';
  if (showLegacy) {
    // MAT sat where MADiE authoring now sits; Bonnie sat where full testing does.
    items.update([
      {...legacy[0], ...slot(0), title: legacy[0].tip},
      {...legacy[1], ...slot(2), title: legacy[1].tip}
    ]);
    timeline.setGroups(groups);
    document.getElementById('info').innerHTML =
      '<h2>What the consolidation changed</h2><p>The lower row shows the route a measure took before 2022: authored in MAT, exported, tested in Bonnie, then exported again. Two tools, two exports, and no guarantee that the artifact that passed testing was the artifact that shipped.</p><p>MADiE collapsed steps 1 and 3 into one environment. Nothing about the CQL, the compilation, or the certification changed — only the number of hand-offs. Select either legacy item for what it did and what replaced it.</p>';
  } else {
    items.remove([101, 102]);
    timeline.setGroups(null);
  }
  timeline.fit({animation: false});
});

document.getElementById('fit').addEventListener('click', () => timeline.fit({animation: false}));
document.getElementById('reset').addEventListener('click', () => {
  if (showLegacy) document.getElementById('legacyBtn').click();
  timeline.setSelection([]);
  timeline.fit({animation: false});
  start();
});

function start() {
  document.getElementById('info').innerHTML =
    '<h2>From a blank library to a payment adjustment</h2><p>Read the phases left to right. Steps 1 through 4 never touch a real patient; step 5 certifies the engine rather than the measure; only step 6 runs against real data, and step 7 is where the result affects money. Select any phase for detail, or reveal the legacy path to see which tools these replaced.</p>';
}

start();
timeline.fit({animation: false});
new ResizeObserver(() => timeline.redraw()).observe(document.getElementById('timeline'));

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
