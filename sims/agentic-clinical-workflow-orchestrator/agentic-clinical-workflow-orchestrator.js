// Agentic Clinical Workflow Orchestrator — one task, two architectures.
// CANVAS_HEIGHT: 1496
'use strict';

// Worked example: diabetic patients overdue for a retinal eye exam who also
// carry a transportation barrier. Every node explains why its role is separate.
const info = {
  ask: ['Care Coordinator asks the question', 'Lane: Care Coordinator. The coordinator types a plain-language request: “Which of my diabetic patients are overdue for an eye exam and have a transportation barrier?” Nothing is structured yet — this is natural language, not a query.'],
  parse: ['Chatbot interface parses and holds context', 'Lane: Chatbot Interface / Conversational AI. It resolves “my patients” to this coordinator’s panel, resolves “overdue” to a date range, and keeps the conversation history so a follow-up question does not have to repeat the setup. It is a separate role because conversation state outlives any single tool call.'],
  q1: ['Query agent calls query_graph (overdue exams)', 'Lane: Query Agent (tool-using). The agent emits a concrete tool call: query_graph(condition="Type 2 Diabetes", measure="retinal exam", status="overdue"). A tool call is auditable — you can log the exact arguments and re-run them. It is a separate role because the tool interface is narrow and testable on its own.'],
  q2: ['Query agent calls query_graph (transportation barrier)', 'Lane: Query Agent (tool-using). A second call filters the returned cohort on an SDOH attribute: query_graph(cohort=<ids>, sdoh="transportation_barrier"). Splitting the work into two calls keeps each result inspectable, and lets the coordinator see how many patients each filter removed.'],
  guide: ['Guideline agent checks the recommended interval', 'Lane: Guideline Agent. It compares each patient’s last exam date against the published screening interval for the guideline in force, so “overdue” reflects clinical policy rather than a hard-coded number in the query. It is a separate role because guidelines are versioned and change independently of the query layer.'],
  review: ['Review agent runs a safety check', 'Lane: Review Agent. Before anything is shown, it checks the assembled list for problems the query layer cannot see: deceased patients, opted-out patients, records outside this coordinator’s authorization. It is a separate role so that the component that produces a result is not the only component that judges it.'],
  human: ['Human-in-the-loop review', 'Lane: Human-in-the-Loop. The coordinator inspects the list, removes patients they know are already scheduled, and approves the outreach. The system proposes; a person decides. Follow-up questions return to the chatbot lane with the context intact.'],
  report: ['Coordinator receives the final report', 'Lane: Care Coordinator. The approved outreach list, with the evidence trail: which tool calls ran, which guideline version applied, and what the safety check removed.'],
  agent: ['One generic agent does everything', 'Single-agent mode. The same task, with parsing, both tool calls, the guideline check, and the safety review folded into one prompt. It still works on the happy path. What is lost: each step is no longer separately testable, the guideline can no longer be versioned apart from the query logic, and the component that produced the list is also the component that vouches for it. Compare the two modes to see the trade-off.']
};

const main = document.querySelector('main');
main.innerHTML = `<h1>Agentic Clinical Workflow Orchestrator</h1>
<p class="intro">One care-coordination task, traced through a multi-agent workflow. Select any step for what that agent does and why it is its own role.</p>
<div class="mermaid-controls controls">
  <button id="multi" aria-pressed="true">Multi-Agent Mode</button>
  <button id="single" aria-pressed="false">Single-Agent Mode</button>
  <button id="reset">Reset</button>
</div>
<div class="legend"><span>Purple: person in the loop</span><span>Blue: conversational interface</span><span>Orange: tool call</span><span>Green: guideline check</span><span>Red: safety review</span></div>
<div id="diagram" aria-label="Agentic clinical workflow, swimlane flowchart"></div>
<div id="info" class="mermaid-info info" aria-live="polite"><h2>Start with the task</h2><p>“Which of my diabetic patients are overdue for an eye exam and have a transportation barrier?” Follow the flow top to bottom, then switch to Single-Agent Mode and compare.</p></div>
<p class="footer">Synthetic teaching example. The dashed arrow is a follow-up question returning to the conversation, not a retry.</p>`;

let mode = 'multi';
let current = null;
let revision = 0;

mermaid.initialize({
  startOnLoad: false, securityLevel: 'loose', theme: 'base',
  themeVariables: {fontFamily: 'Arial', fontSize: '16px'},
  flowchart: {htmlLabels: true, useMaxWidth: false, nodeSpacing: 14, rankSpacing: 34, padding: 10, curve: 'basis', subGraphTitleMargin: {top: 6, bottom: 12}}
});

const CLASSES = `classDef humanStyle fill:#e8dcfa,stroke:#8963ad,color:#203348
classDef chatStyle fill:#d7eaff,stroke:#3776a8,color:#203348
classDef toolStyle fill:#ffe2b7,stroke:#aa731e,color:#203348
classDef guideStyle fill:#d5efda,stroke:#488457,color:#203348
classDef reviewStyle fill:#fbd6d6,stroke:#a34747,color:#203348
`;

function multiAgentCode() {
  return `flowchart TB
subgraph LANE1["Care Coordinator"]
  ask["Asks question<br/>in chat"]:::humanStyle
  report["Receives<br/>final report"]:::humanStyle
end
subgraph LANE2["Chatbot Interface"]
  parse["Parses question,<br/>maintains context"]:::chatStyle
end
subgraph LANE3["Query Agent (Tool-Using)"]
  q1["Call query_graph<br/>(overdue exams)"]:::toolStyle
  q2["Call query_graph<br/>(transportation filter)"]:::toolStyle
end
subgraph LANE4["Guideline Agent"]
  guide["Check eye-exam interval<br/>against guideline"]:::guideStyle
end
subgraph LANE5["Review Agent"]
  review["Safety check combined<br/>list before release"]:::reviewStyle
end
subgraph LANE6["Human-in-the-Loop"]
  human["Coordinator reviews and<br/>confirms outreach list"]:::humanStyle
end
ask --> parse --> q1 --> q2 --> guide --> review --> human --> report
human -.->|"asks follow-up question"| parse
${CLASSES}`;
}

function singleAgentCode() {
  return `flowchart TB
subgraph LANE1["Care Coordinator"]
  ask["Asks question<br/>in chat"]:::humanStyle
  report["Receives<br/>final report"]:::humanStyle
end
subgraph LANE2["Agent"]
  agent["Parse, query, check guideline,<br/>and self-review<br/>in one step"]:::chatStyle
end
subgraph LANE6["Human-in-the-Loop"]
  human["Coordinator reviews and<br/>confirms outreach list"]:::humanStyle
end
ask --> agent --> human --> report
human -.->|"asks follow-up question"| agent
${CLASSES}`;
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
  const ids = mode === 'multi'
    ? ['ask', 'parse', 'q1', 'q2', 'guide', 'review', 'human', 'report']
    : ['ask', 'agent', 'human', 'report'];
  let code = mode === 'multi' ? multiAgentCode() : singleAgentCode();
  ids.forEach(id => { code += `click ${id} call showInfo("${id}")\n`; });
  try {
    const {svg, bindFunctions} = await mermaid.render(`agentic-${ticket}`, code);
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

function setMode(next) {
  mode = next;
  document.getElementById('multi').setAttribute('aria-pressed', String(next === 'multi'));
  document.getElementById('single').setAttribute('aria-pressed', String(next === 'single'));
  // The selected node may not exist in the other architecture.
  if (!(mode === 'multi' ? ['ask','parse','q1','q2','guide','review','human','report'] : ['ask','agent','human','report']).includes(current)) current = null;
  document.getElementById('info').innerHTML = next === 'multi'
    ? '<h2>Multi-agent architecture</h2><p>Six lanes, each with one responsibility. Select a step to see what it contributes and why it is not folded into its neighbor.</p>'
    : '<h2>Single-agent architecture</h2><p>The identical task, collapsed into one agent. Select the Agent node to see what the collapse costs.</p>';
  renderFlow();
}

document.getElementById('multi').addEventListener('click', () => setMode('multi'));
document.getElementById('single').addEventListener('click', () => setMode('single'));
document.getElementById('reset').addEventListener('click', () => {
  current = null;
  setMode('multi');
  document.getElementById('info').innerHTML = '<h2>Start with the task</h2><p>“Which of my diabetic patients are overdue for an eye exam and have a transportation barrier?” Follow the flow top to bottom, then switch to Single-Agent Mode and compare.</p>';
});

renderFlow();

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
