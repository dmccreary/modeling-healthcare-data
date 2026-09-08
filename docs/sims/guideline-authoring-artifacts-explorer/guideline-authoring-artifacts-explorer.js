// Guideline Authoring Artifacts Explorer — one rule, four representations.
// CANVAS_HEIGHT: 905
'use strict';

// Four concepts run through all four artifacts. Selecting one highlights it
// everywhere at once, which is the whole point of showing them side by side.
const concepts = {
  age: {name: 'Age 35–70', color: '#ffe2b7', border: '#aa731e',
    note: 'Every artifact carries this condition, but only the flowchart forces you to say what happens when it is false. The narrative can leave the negative case implicit; a diagram cannot draw a branch with one exit.'},
  bmi: {name: 'BMI ≥ 25', color: '#d7eaff', border: '#3776a8',
    note: 'The decision table is the only artifact that makes the AND explicit as a column structure. In the narrative it hides inside the word “and”, which is exactly where ambiguity between AND and OR gets introduced during translation.'},
  nodx: {name: 'No prior diagnosis', color: '#e8dcfa', border: '#8963ad',
    note: 'The exclusion. It is easiest to lose in the user story, which is written from a clinician’s intent rather than from a complete rule — and losing it is what produces screening reminders for patients who already have the diagnosis.'},
  action: {name: 'Screen with HbA1c', color: '#d5efda', border: '#488457',
    note: 'The action. All four artifacts state it, but only the user story says <em>why</em> it matters to someone. That “so that” clause is the piece the other three discard.'}
};

const artifacts = {
  narrative: {
    title: 'Narrative',
    captures: 'Prose, in the clinician’s own register. Reads naturally and survives translation between specialties.',
    misses: 'No explicit branching, no stated behavior for the false case, and the logical connective “and” is doing structural work in a word that could equally have meant “or”.'
  },
  table: {
    title: 'Decision Table',
    captures: 'Conditions and actions as columns, so completeness is checkable: you can see whether every combination has a row.',
    misses: 'Order and timing. A table says what to do, not when in the visit to do it, and not what happens after.'
  },
  flowchart: {
    title: 'Clinical Flowchart',
    captures: 'Sequence and branching. Every decision has a labeled exit, so the false path cannot be left unstated.',
    misses: 'Nuance and rationale. A diamond reads “BMI ≥ 25?” without room for “unless the patient is an athlete with high lean mass.”'
  },
  story: {
    title: 'Clinical User Story',
    captures: 'Intent and the person who holds it. The “so that” clause names the benefit, which is what lets a team decide whether an implementation actually delivered anything.',
    misses: 'Precision. No thresholds, no exclusions, nothing a compiler could check. It is a statement of purpose, not a specification.'
  }
};

const quiz = [
  {text: '“Given a patient with an HbA1c of 6.1%, when the result posts, then flag the chart for a repeat test in 12 months.”',
   answer: 'story', why: 'Given / when / then is the acceptance-criteria form that accompanies a user story. It is written from the point of view of a person watching the system behave, not as a rule to be evaluated.'},
  {text: 'A grid whose left column reads “Age 35–70 AND BMI ≥ 25 AND no prior diagnosis” and whose right column reads “Order HbA1c”.',
   answer: 'table', why: 'Two columns, condition and action, with the connectives written out. That is a decision table row, and its value is that a reviewer can check whether every combination of conditions has a row.'},
  {text: '“Adults with an elevated body mass index should be evaluated for metabolic risk during routine primary care visits.”',
   answer: 'narrative', why: 'Prose with no thresholds, no branch, and no named actor. Narrative is the form guidelines are published in and the form that most needs translating before anything can execute it.'},
  {text: 'A shape with the text “Prior diabetes diagnosis?” and two labeled exits, Yes and No.',
   answer: 'flowchart', why: 'A decision point with labeled exits. The giveaway is that both outcomes are drawn — the artifact type that will not let you leave the false case unstated.'}
];

const main = document.querySelector('main');
main.innerHTML = `<h1>Guideline Authoring Artifacts Explorer</h1>
<p class="intro">One diabetes-screening rule, written four ways. Select a highlighted phrase to see the same idea in all four.</p>
<div class="mermaid-controls controls">
  ${Object.entries(concepts).map(([id, c]) =>
    `<button class="conceptBtn" data-concept="${id}" style="background:${c.color};border-color:${c.border}" aria-pressed="false">${c.name}</button>`).join('')}
  <button id="clear">Clear highlight</button>
  <button id="quizBtn" aria-pressed="false">Classify This</button>
</div>
<div id="panels" class="panels">
  <section class="panel" data-artifact="narrative">
    <h2>1 · Narrative</h2>
    <p class="body">Adults aged <span class="tok" data-concept="age">35 to 70</span> with a
    <span class="tok" data-concept="bmi">body mass index of 25 or higher</span> and
    <span class="tok" data-concept="nodx">no prior diagnosis of diabetes</span> should be
    <span class="tok" data-concept="action">screened for type 2 diabetes with an HbA1c test</span>.</p>
  </section>
  <section class="panel" data-artifact="table">
    <h2>2 · Decision Table</h2>
    <table class="dt"><thead><tr><th>Condition</th><th>Action</th></tr></thead><tbody>
      <tr>
        <td><span class="tok" data-concept="age">age 35–70</span> AND
            <span class="tok" data-concept="bmi">BMI ≥ 25</span> AND
            <span class="tok" data-concept="nodx">no prior dx</span></td>
        <td><span class="tok" data-concept="action">order HbA1c</span></td>
      </tr>
      <tr class="muted"><td>any condition unmet</td><td>no screening action</td></tr>
    </tbody></table>
  </section>
  <section class="panel" data-artifact="flowchart">
    <h2>3 · Clinical Flowchart</h2>
    <div id="network" aria-label="Two decision points leading to a screening action"></div>
  </section>
  <section class="panel" data-artifact="story">
    <h2>4 · Clinical User Story</h2>
    <p class="persona">Clinical Persona: Dr. Priya Nair, primary care physician</p>
    <p class="body"><strong>As</strong> a primary care physician,
    <strong>I want</strong> my <span class="tok" data-concept="age">35-to-70-year-old</span>
    <span class="tok" data-concept="bmi">higher-BMI</span> patients
    <span class="tok" data-concept="nodx">without a diabetes diagnosis</span> flagged at check-in,
    <strong>so that</strong> I can <span class="tok" data-concept="action">order the HbA1c</span>
    during the visit instead of chasing them afterwards.</p>
  </section>
</div>
<div id="info" class="mermaid-info info" aria-live="polite"></div>
<div id="quiz" class="mermaid-info info" hidden></div>
<p class="footer">Synthetic guideline and persona. The same content is present in all four panels; what differs is what each form makes impossible to leave out.</p>`;

// Panel 3 is a real graph, so it is drawn with vis-network rather than described.
// vis-network centres a diamond's label directly beneath the shape, where the
// outgoing branch would run straight through it — so each question is carried by
// its own text node to the right of the diamond instead.
const nodes = new vis.DataSet([
  {id: 'start', label: 'Adult patient\nat routine visit', shape: 'box', x: 0, y: -125, fixed: true,
   color: {background: '#e6eaee', border: '#5a6978'}},
  {id: 'age', label: '', shape: 'diamond', size: 26, x: 0, y: -25, fixed: true,
   color: {background: concepts.age.color, border: concepts.age.border}},
  {id: 'ageQ', label: 'Age 35–70?', shape: 'text', x: 84, y: -25, fixed: true,
   font: {size: 13, face: 'Arial', color: '#7a5209'}},
  {id: 'bmi', label: '', shape: 'diamond', size: 26, x: 0, y: 75, fixed: true,
   color: {background: concepts.bmi.color, border: concepts.bmi.border}},
  {id: 'bmiQ', label: 'BMI ≥ 25 and\nno prior dx?', shape: 'text', x: 92, y: 75, fixed: true,
   font: {size: 13, face: 'Arial', color: '#2a5a86'}},
  {id: 'action', label: 'Order HbA1c', shape: 'box', x: 0, y: 175, fixed: true,
   color: {background: concepts.action.color, border: concepts.action.border}},
  {id: 'none', label: 'No screening\nthis visit', shape: 'box', x: -140, y: 25, fixed: true,
   color: {background: '#eef2f5', border: '#c8d2dc'}, font: {color: '#7d8b98'}}
]);
const edges = new vis.DataSet([
  {from: 'start', to: 'age', arrows: 'to', color: {color: '#64748b'}},
  {from: 'age', to: 'ageQ', color: {color: '#d9c8a8'}, dashes: [2, 3], width: 1},
  {from: 'bmi', to: 'bmiQ', color: {color: '#b8cfe4'}, dashes: [2, 3], width: 1},
  {from: 'age', to: 'bmi', label: 'yes', arrows: 'to', color: {color: '#488457'}},
  {from: 'age', to: 'none', label: 'no', arrows: 'to', color: {color: '#a0adb9'}},
  {from: 'bmi', to: 'action', label: 'yes', arrows: 'to', color: {color: '#488457'}},
  {from: 'bmi', to: 'none', label: 'no', arrows: 'to', color: {color: '#a0adb9'}}
]);
const network = new vis.Network(document.getElementById('network'), {nodes, edges}, {
  layout: {randomSeed: 5, improvedLayout: false},
  physics: {enabled: false},
  nodes: {borderWidth: 2, font: {size: 13, face: 'Arial', color: '#203348'}, margin: 8},
  edges: {font: {size: 12, face: 'Arial', background: 'white'}, smooth: {type: 'continuous', roundness: 0.2}},
  interaction: {hover: true, zoomView: false, dragView: false, dragNodes: false, selectable: true,
                keyboard: {enabled: false}}
});

let active = null;

function highlight(id) {
  active = id;
  document.querySelectorAll('.tok').forEach(tok => {
    const on = tok.dataset.concept === id;
    tok.classList.toggle('on', on);
    tok.style.background = on ? concepts[tok.dataset.concept].color : '';
    tok.style.boxShadow = on ? `inset 0 -2px 0 ${concepts[tok.dataset.concept].border}` : '';
  });
  document.querySelectorAll('.conceptBtn').forEach(button =>
    button.setAttribute('aria-pressed', String(button.dataset.concept === id)));
  // The flowchart's own nodes carry the same concepts, so select them too.
  const graphNodes = {age: ['age', 'ageQ'], bmi: ['bmi', 'bmiQ'], nodx: ['bmi', 'bmiQ'], action: ['action']}[id] || [];
  network.setSelection({nodes: graphNodes, edges: []});
  document.getElementById('info').innerHTML = id
    ? `<h2>${concepts[id].name} — across all four artifacts</h2><p>${concepts[id].note}</p>`
    : defaultInfo();
}

function defaultInfo() {
  return '<h2>Four artifacts, one rule</h2><p>Select a concept above, or any highlighted phrase in a panel, to see where that same idea lives in the other three. Select a panel heading to read what that form captures and what it loses.</p>';
}

document.querySelectorAll('.conceptBtn').forEach(button =>
  button.addEventListener('click', () => highlight(button.dataset.concept === active ? null : button.dataset.concept)));
document.getElementById('clear').addEventListener('click', () => highlight(null));

document.getElementById('panels').addEventListener('click', event => {
  const tok = event.target.closest('.tok');
  if (tok) { highlight(tok.dataset.concept); return; }
  const heading = event.target.closest('.panel > h2');
  if (heading) {
    const key = heading.parentElement.dataset.artifact;
    const a = artifacts[key];
    document.getElementById('info').innerHTML =
      `<h2>${a.title}</h2><p><strong>What this form captures.</strong> ${a.captures}</p><p><strong>What it loses.</strong> ${a.misses}</p>`;
  }
});

const graphConcept = {age: 'age', ageQ: 'age', bmi: 'bmi', bmiQ: 'bmi', action: 'action'};
network.on('click', event => {
  const concept = graphConcept[event.nodes[0]];
  if (concept) highlight(concept);
});

// ---- Classify This -------------------------------------------------------
let quizIndex = 0;
let quizOn = false;
let score = 0;

function renderQuiz(feedback) {
  const q = quiz[quizIndex];
  document.getElementById('quiz').innerHTML =
    `<h2>Classify This (${quizIndex + 1} of ${quiz.length}) — score ${score}/${quiz.length}</h2>
     <p>Which artifact type is this?</p>
     <p class="note">${q.text}</p>
     <div class="controls">${Object.entries(artifacts).map(([key, a]) =>
       `<button class="quizOpt" data-key="${key}">${a.title}</button>`).join('')}</div>
     <div id="quizFeedback">${feedback || ''}</div>`;
  document.querySelectorAll('.quizOpt').forEach(button =>
    button.addEventListener('click', () => answer(button.dataset.key)));
}

function answer(key) {
  const q = quiz[quizIndex];
  const right = key === q.answer;
  if (right) score += 1;
  const message = `<p><span class="pill ${right ? 'ok' : 'no'}">${right ? 'Correct' : 'Not quite'}</span> ${right ? '' : `It is a <strong>${artifacts[q.answer].title}</strong>. `}${q.why}</p>`;
  quizIndex += 1;
  if (quizIndex >= quiz.length) {
    document.getElementById('quiz').innerHTML =
      `<h2>Classify This — ${score} of ${quiz.length}</h2>${message}<div class="controls"><button id="again">Try again</button></div>`;
    document.getElementById('again').addEventListener('click', () => { quizIndex = 0; score = 0; renderQuiz(); });
    return;
  }
  renderQuiz(message);
}

document.getElementById('quizBtn').addEventListener('click', () => {
  quizOn = !quizOn;
  quizIndex = 0;
  score = 0;
  document.getElementById('quiz').hidden = !quizOn;
  document.getElementById('quizBtn').setAttribute('aria-pressed', String(quizOn));
  document.getElementById('quizBtn').textContent = quizOn ? 'Close quiz' : 'Classify This';
  if (quizOn) renderQuiz();
});

highlight(null);
function fitView() { network.fit({animation: false, padding: 24}); }
new ResizeObserver(fitView).observe(document.getElementById('network'));
fitView();

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
