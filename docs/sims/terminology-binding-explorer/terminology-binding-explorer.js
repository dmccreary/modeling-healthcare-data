// CodeSystem, ValueSet, and Terminology Binding Explorer — what binding strength
// actually decides.
// CANVAS_HEIGHT: 1141
'use strict';

const valueSetCodes = {
  '2089-1': {display: 'Cholesterol in LDL [Mass/volume] in Serum or Plasma', note: 'The workhorse LDL result code. Directly measured or calculated is not distinguished here, which is one reason the value set needs more than one member.'},
  '13457-7': {display: 'Cholesterol in LDL [Mass/volume] in Serum or Plasma by calculation', note: 'LDL derived by the Friedewald calculation rather than measured. Clinically the same data element; a different LOINC code because the method differs.'},
  '18262-6': {display: 'Cholesterol in LDL [Mass/volume] in Serum or Plasma by Direct assay', note: 'Directly measured LDL. Included because a guideline that only accepted the calculated code would silently miss every direct assay result.'},
  '9830-1': {display: 'Cholesterol.total/Cholesterol in HDL [Mass Ratio] in Serum or Plasma', note: 'A ratio, not an LDL value. Present here as a deliberate near-miss: it lives in the same lipid panel, so it is exactly the kind of code someone maps by mistake.'}
};

const candidates = {
  inside: {code: '18262-6', label: 'Direct LDL assay', display: 'Cholesterol in LDL by Direct assay',
    member: true,
    note: 'A member of the value set. Accepted under every binding strength — binding strength only governs what happens to codes that are <em>not</em> members.'},
  near: {code: '2093-3', label: 'Total cholesterol', display: 'Cholesterol [Mass/volume] in Serum or Plasma',
    member: false, plausible: true,
    note: 'A real LOINC code from the same lipid panel, and not an LDL value. This is the case binding strength exists to adjudicate: plausible, adjacent, and wrong for this data element.'},
  unrelated: {code: '718-7', label: 'Hemoglobin', display: 'Hemoglobin [Mass/volume] in Blood',
    member: false, plausible: false,
    note: 'An unrelated hematology code. It is rejected or flagged under every strength except <code>example</code> — and the fact that <code>example</code> tolerates it is the clearest illustration of how little that strength constrains.'}
};

const strengths = {
  required: {
    name: 'required',
    summary: 'The code <strong>must</strong> come from the value set. A code outside it makes the instance invalid.',
    verdict: c => c.member
      ? ['ok', 'Accepted', 'A member of the bound value set.']
      : ['no', 'Rejected', 'Not a member. Under <code>required</code> there is no escape hatch: validation fails and the instance does not conform.'],
    when: 'Use when the set of valid answers is genuinely closed and complete — administrative gender, a status code, a yes/no flag. Choosing <code>required</code> for a clinical value set is how a guideline becomes unusable at a site that codes things slightly differently.'
  },
  extensible: {
    name: 'extensible',
    summary: 'The code <strong>should</strong> come from the value set. A code outside it is permitted only when no value-set member covers the concept.',
    verdict: c => c.member
      ? ['ok', 'Accepted', 'A member of the bound value set.']
      : c.plausible
        ? ['no', 'Rejected', 'Not a member, and the value set <em>does</em> contain a code for LDL cholesterol — so the "no suitable member exists" condition is not met. A near-miss is exactly what <code>extensible</code> is designed to catch.']
        : ['warn', 'Allowed with justification', 'Not a member, and no value-set member expresses this concept. Permitted, but the sender is asserting that the value set genuinely lacks a suitable code — an assertion a reviewer can check.'],
    when: 'Use for clinical value sets that are broad but cannot claim completeness. This is the most common choice for guideline data elements, and the one that most rewards a well-curated value set.'
  },
  preferred: {
    name: 'preferred',
    summary: 'The value set is <strong>encouraged</strong> but not enforced. Any code is valid; members are simply the recommended choice.',
    verdict: c => c.member
      ? ['ok', 'Accepted', 'A member, and the recommended choice.']
      : ['warn', 'Allowed with caution', 'Not a member, but <code>preferred</code> does not reject anything. The instance is valid. Whether the receiving system can do anything useful with the code is a separate question that the binding no longer answers.'],
    when: 'Use when you want to steer implementers toward a common vocabulary without breaking the ones who cannot yet comply. The cost is that conformance testing stops catching mapping errors.'
  },
  example: {
    name: 'example',
    summary: 'The value set is <strong>illustrative only</strong>. It shows the kind of code expected and constrains nothing.',
    verdict: c => c.member
      ? ['ok', 'Accepted', 'A member — but under <code>example</code> that carries no weight beyond being a reasonable choice.']
      : ['warn', 'Allowed', 'Not a member, and no constraint applies. Even the unrelated hematology code passes. If a data element matters, <code>example</code> is almost never the right binding.'],
    when: 'Use only when the value set is documentation. Reading an <code>example</code> binding as if it were a constraint is a common and expensive misreading of a specification.'
  }
};

const main = document.querySelector('main');
main.innerHTML = `<h1>CodeSystem, ValueSet, and Terminology Binding Explorer</h1>
<p class="intro">A curated value set drawn from a large code system, bound to one guideline data element. Change the binding strength and watch the verdicts change.</p>
<div class="legend">
  <span><i class="swatch" style="background:#cbd0d5;border-radius:50%"></i>CodeSystem (LOINC)</span>
  <span><i class="swatch" style="background:#9dc9f2;border-radius:50%"></i>ValueSet</span>
  <span><i class="swatch" style="background:#ffc184"></i>Guideline data element</span>
  <span><i class="swatch" style="background:#f7e08a;border-radius:50%"></i>Codes in the value set</span>
</div>
<div class="workspace">
  <div id="network" class="graph" aria-label="CodeSystem, ValueSet, and terminology binding graph"></div>
  <aside class="side">
    <label for="strength">Binding strength</label>
    <select id="strength">
      <option value="required">required</option>
      <option value="extensible" selected>extensible</option>
      <option value="preferred">preferred</option>
      <option value="example">example</option>
    </select>
    <div id="strengthNote" class="note" style="margin-top:10px"></div>
    <h2 style="margin-top:14px">Verdict for three incoming codes</h2>
    <div id="verdicts"></div>
    <div class="controls" style="margin-top:10px"><button id="reset">Reset</button></div>
    <div id="info" class="info" aria-live="polite"></div>
  </aside>
</div>
<p class="footer">LOINC is maintained by the Regenstrief Institute and contains roughly 100,000 codes. The four codes drawn inside the value set are real LOINC identifiers; the value set itself is a teaching example.</p>`;

let strength = 'extensible';

const nodes = new vis.DataSet([
  {id: 'codesystem', label: 'LOINC CodeSystem\ntens of thousands of codes', shape: 'circle',
   color: {background: '#cbd0d5', border: '#5a6978'}, x: -300, y: 0, fixed: true,
   font: {size: 14, face: 'Arial', color: '#203348'}, widthConstraint: {maximum: 150},
   title: 'LOINC — Logical Observation Identifiers Names and Codes. Governance: Regenstrief Institute. Roughly 100,000 codes covering laboratory and clinical observations.'},
  {id: 'valueset', label: 'LDL Cholesterol\nLab Tests ValueSet', shape: 'circle',
   color: {background: '#9dc9f2', border: '#3776a8'}, x: 60, y: -30, fixed: true,
   font: {size: 14, face: 'Arial', color: '#203348'}, widthConstraint: {maximum: 140},
   title: 'A curated subset: four LOINC codes chosen to cover every way an LDL cholesterol result is coded.'},
  {id: 'element', label: 'Guideline Data Element\n“LDL Cholesterol”', shape: 'box',
   color: {background: '#ffc184', border: '#aa731e'}, x: 560, y: -30, fixed: true,
   font: {size: 14, face: 'Arial', color: '#203348'},
   title: 'The data element a guideline or measure refers to. It is bound to the value set, not to individual codes.'},
  ...Object.keys(valueSetCodes).map((code, i) => ({
    id: code, label: code, shape: 'dot', size: 15,
    color: {background: '#f7e08a', border: '#a89020'},
    x: [-40, 60, 160, 60][i], y: [130, 175, 130, 235][i], fixed: true,
    font: {size: 13, face: 'Arial', color: '#203348'},
    title: valueSetCodes[code].display
  }))
]);

const edges = new vis.DataSet([
  {id: 'draws', from: 'valueset', to: 'codesystem', label: 'drawn from', arrows: 'to',
   color: {color: '#64748b'}, dashes: true},
  {id: 'binding', from: 'element', to: 'valueset', label: 'terminology binding', arrows: 'to',
   color: {color: '#aa731e'}, width: 3},
  ...Object.keys(valueSetCodes).map(code => ({
    id: `in-${code}`, from: 'valueset', to: code, arrows: '', color: {color: '#a89020'}, width: 1, dashes: [2, 3]
  }))
]);

const network = new vis.Network(document.getElementById('network'), {nodes, edges}, {
  layout: {randomSeed: 7, improvedLayout: false},
  physics: {enabled: false},
  nodes: {borderWidth: 2},
  edges: {font: {size: 13, face: 'Arial', background: 'aliceblue'}, smooth: {type: 'continuous', roundness: 0.15}},
  interaction: {hover: true, tooltipDelay: 120, zoomView: false, dragView: false, dragNodes: false,
                navigationButtons: true, keyboard: {enabled: true, bindToWindow: false}}
});

// The spec calls for the uncurated bulk of the code system to be visible. Drawing
// it as canvas dots rather than nodes keeps ~40 decorative marks out of the
// DataSet, where they would be clickable and would confuse hit-testing.
const dimDots = [];
for (let i = 0; i < 44; i += 1) {
  const angle = i * 2.399;                 // golden-angle spiral: even coverage, no rings
  const radius = 0.34 + 0.60 * Math.sqrt(i / 44);
  dimDots.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
}
network.on('afterDrawing', ctx => {
  const box = network.getBoundingBox('codesystem');
  if (!box) return;
  const cx = (box.left + box.right) / 2;
  const cy = (box.top + box.bottom) / 2;
  const r = (box.right - box.left) / 2;
  ctx.save();
  ctx.fillStyle = 'rgba(90,105,120,0.32)';
  dimDots.forEach(([dx, dy]) => {
    ctx.beginPath();
    ctx.arc(cx + dx * r, cy + dy * r, 2.6, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
});

function renderVerdicts() {
  const s = strengths[strength];
  document.getElementById('strengthNote').innerHTML = `<strong>${s.name}</strong> — ${s.summary}`;
  document.getElementById('verdicts').innerHTML = Object.entries(candidates).map(([key, c]) => {
    const [kind, label, why] = s.verdict(c);
    return `<div style="margin:10px 0;padding-bottom:8px;border-bottom:1px solid #e3e7ec">
      <div><span class="pill ${kind}">${label}</span> <code>${c.code}</code> ${c.label}</div>
      <div style="font-size:13px;margin-top:4px">${why}</div>
    </div>`;
  }).join('');
}

function showInfo(html) { document.getElementById('info').innerHTML = html; }

network.on('click', event => {
  const id = event.nodes[0];
  if (valueSetCodes[id]) {
    showInfo(`<h2>LOINC ${id}</h2><p><strong>${valueSetCodes[id].display}</strong></p><p>${valueSetCodes[id].note}</p>`);
  } else if (id === 'codesystem') {
    showInfo('<h2>LOINC CodeSystem</h2><p>Logical Observation Identifiers Names and Codes, governed by the Regenstrief Institute, with roughly 100,000 codes covering laboratory and clinical observations.</p><p>A code system is a vocabulary, not a permission list. It says what codes exist and what each one means; it says nothing about which ones belong in a given data element. That second question is what a value set answers.</p>');
  } else if (id === 'valueset') {
    showInfo(`<h2>LDL Cholesterol Lab Tests ValueSet</h2><p>Four codes chosen from LOINC — the codes that all mean "this is an LDL cholesterol result," however the laboratory arrived at the number.</p><p>Curation is the work here. Omit <code>18262-6</code> and every direct-assay result silently falls outside the set; include <code>9830-1</code> by mistake and a cholesterol ratio starts being read as an LDL value.</p><p>Select any of the four yellow code dots for what it covers.</p>`);
  } else if (id === 'element') {
    showInfo(`<h2>Guideline data element: “LDL Cholesterol”</h2><p>What the guideline actually refers to. It binds to the value set rather than to a list of codes, so the code list can be revised — a new LOINC code, a retired one — without touching the guideline text.</p><p>The binding strength on that edge is the whole subject of this MicroSim: it decides what happens when a code arrives that the value set does not contain.</p>`);
  } else if (event.edges[0] === 'binding') {
    showInfo(`<h2>Edge: terminology binding</h2><p>Currently <strong>${strength}</strong>. ${strengths[strength].summary}</p><p>${strengths[strength].when}</p>`);
  } else if (event.edges[0] === 'draws') {
    showInfo('<h2>Edge: drawn from</h2><p>Every member of the value set is a code that already exists in LOINC. A value set does not mint codes; it selects them. That is why the arrow points from the value set back to the code system rather than the other way round.</p>');
  }
});

document.getElementById('strength').addEventListener('change', event => {
  strength = event.target.value;
  renderVerdicts();
  showInfo(`<h2>Binding strength: ${strength}</h2><p>${strengths[strength].summary}</p><p>${strengths[strength].when}</p>`);
});

document.getElementById('reset').addEventListener('click', () => {
  strength = 'extensible';
  document.getElementById('strength').value = 'extensible';
  network.unselectAll();
  renderVerdicts();
  start();
});

function start() {
  showInfo('<h2>Three layers, one decision</h2><p>A code system supplies the vocabulary; a value set selects from it; a binding connects a data element to that selection at a stated strength. Change the strength above and watch only the middle verdict move — the member code is always accepted and the unrelated code is only ever tolerated by the weakest strength.</p>');
}

renderVerdicts();
start();
function fitView() { network.fit({animation: false, padding: 50}); }
new ResizeObserver(fitView).observe(document.getElementById('network'));
fitView();

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
