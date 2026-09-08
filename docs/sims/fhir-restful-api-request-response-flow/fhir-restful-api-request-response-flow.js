// FHIR RESTful API Request-Response Flow — one request, traced end to end.
// CANVAS_HEIGHT: 975
'use strict';

const BUNDLE = `{
  "resourceType": "Bundle",
  "type": "searchset",
  "total": 2,
  "link": [{ "relation": "self",
             "url": "https://ehr.example.org/fhir/Condition?patient=maria-chen&clinical-status=active" }],
  "entry": [
    { "fullUrl": "https://ehr.example.org/fhir/Condition/cond-dm2",
      "resource": {
        "resourceType": "Condition",
        "id": "cond-dm2",
        "clinicalStatus": { "coding": [{ "code": "active" }] },
        "code": { "coding": [{ "system": "http://hl7.org/fhir/sid/icd-10-cm",
                               "code": "E11.9",
                               "display": "Type 2 diabetes mellitus" }] },
        "subject": { "reference": "Patient/maria-chen" },
        "recordedDate": "2023-11-02"
      }},
    { "fullUrl": "https://ehr.example.org/fhir/Condition/cond-htn",
      "resource": {
        "resourceType": "Condition",
        "id": "cond-htn",
        "clinicalStatus": { "coding": [{ "code": "active" }] },
        "code": { "coding": [{ "system": "http://hl7.org/fhir/sid/icd-10-cm",
                               "code": "I10",
                               "display": "Essential hypertension" }] },
        "subject": { "reference": "Patient/maria-chen" },
        "recordedDate": "2022-06-14"
      }}
  ]
}`;

const operations = {
  GET: {
    verb: 'GET',
    request: 'GET /Condition?patient=maria-chen&clinical-status=active',
    intent: 'read a set of resources',
    requestNote: 'A search. Everything the server needs is in the URL: the resource type as the path, and the search parameters as the query string. There is no request body, which is why a GET can be cached, retried, and pasted into a browser address bar.',
    storeNote: 'The server translates the search into whatever its own database speaks — a SQL query against tables that look nothing like FHIR. FHIR is the <em>interface</em>, not the storage format. This translation is the point of the whole specification: two EHRs with entirely different internal schemas answer the identical request.',
    responseHeading: 'Bundle response — 200 OK',
    responseNote: 'A search always returns a <code>Bundle</code>, even when it matches one resource or none. The Bundle carries a <code>total</code>, a self link that reproduces the search, and an <code>entry</code> array wrapping each matched resource with its full URL.',
    body: BUNDLE,
    renderNote: 'The client reads <code>entry[].resource</code> and renders two active conditions for Maria Chen. Because every entry carries a <code>fullUrl</code>, the app can link straight to any one of them without constructing a URL itself.',
    status: '200 OK'
  },
  POST: {
    verb: 'POST',
    request: 'POST /Condition',
    intent: 'create a new resource',
    requestNote: 'A create. The path is the resource <em>type</em> with no id, because the client is not naming the resource — the server assigns the id. The resource travels in the request body, which is why a POST cannot be repeated safely: sending it twice creates two conditions.',
    storeNote: 'The server validates the submitted resource against the FHIR schema and any profiles it enforces, writes it to its internal store, and assigns both a logical id and a version id.',
    responseHeading: 'Created response — 201 Created',
    responseNote: 'The response carries a <code>Location</code> header naming the new resource and, by convention, the stored resource itself, so the client can see exactly what the server persisted — including the fields the server filled in.',
    body: `HTTP/1.1 201 Created
Location: https://ehr.example.org/fhir/Condition/cond-ckd3/_history/1
ETag: W/"1"

{
  "resourceType": "Condition",
  "id": "cond-ckd3",
  "meta": { "versionId": "1", "lastUpdated": "2026-09-08T14:22:10Z" },
  "clinicalStatus": { "coding": [{ "code": "active" }] },
  "code": { "coding": [{ "system": "http://hl7.org/fhir/sid/icd-10-cm",
                         "code": "N18.3",
                         "display": "Chronic kidney disease, stage 3" }] },
  "subject": { "reference": "Patient/maria-chen" }
}`,
    renderNote: 'The client stores the returned id and shows the new condition in the problem list. Note the <code>meta.versionId</code>: every FHIR resource is versioned from the moment it is created.',
    status: '201 Created'
  },
  PUT: {
    verb: 'PUT',
    request: 'PUT /Condition/cond-dm2',
    intent: 'replace an existing resource',
    requestNote: 'An update. The path names the exact resource by id, and the body is the <em>complete</em> replacement — not a patch. Anything omitted from the body is removed. Sending the same PUT twice leaves the same final state, which is what makes it safe to retry after a timeout.',
    storeNote: 'The server checks that the id exists, optionally checks the <code>If-Match</code> ETag so a stale client cannot overwrite a newer version, writes the new content, and increments the version id.',
    responseHeading: 'Updated response — 200 OK',
    responseNote: 'The version id has advanced to 2 and the previous version remains retrievable at <code>/Condition/cond-dm2/_history/1</code>. Clinical data is rarely deleted outright; it is superseded, and the history is the audit trail.',
    body: `HTTP/1.1 200 OK
ETag: W/"2"

{
  "resourceType": "Condition",
  "id": "cond-dm2",
  "meta": { "versionId": "2", "lastUpdated": "2026-09-08T14:31:44Z" },
  "clinicalStatus": { "coding": [{ "code": "resolved" }] },
  "code": { "coding": [{ "system": "http://hl7.org/fhir/sid/icd-10-cm",
                         "code": "E11.9",
                         "display": "Type 2 diabetes mellitus" }] },
  "subject": { "reference": "Patient/maria-chen" },
  "abatementDateTime": "2026-09-01"
}`,
    renderNote: 'The client re-renders the problem list with the condition now marked resolved. A later search for <code>clinical-status=active</code> will no longer return it.',
    status: '200 OK'
  },
  DELETE: {
    verb: 'DELETE',
    request: 'DELETE /Condition/cond-dm2',
    intent: 'remove a resource from active use',
    requestNote: 'A delete. The path names one resource; there is no body. In clinical systems this is used far less than the other three, because an entry recorded in error is usually corrected by setting <code>verificationStatus</code> to <code>entered-in-error</code> rather than by removing the record.',
    storeNote: 'The server marks the resource deleted. It generally does not erase the rows: the version history stays queryable, and a read of the resource now returns 410 Gone rather than 404 Not Found — a meaningful distinction, since 410 says "this existed and no longer does."',
    responseHeading: 'Deleted response — 204 No Content',
    responseNote: 'There is no response body. The status code carries the entire answer, which is the reason DELETE is the shortest step in the cycle.',
    body: `HTTP/1.1 204 No Content
ETag: W/"3"`,
    renderNote: 'The client removes the condition from its view. A subsequent <code>GET /Condition/cond-dm2</code> returns 410 Gone, and <code>GET /Condition/cond-dm2/_history</code> still returns every prior version.',
    status: '204 No Content'
  }
};

const main = document.querySelector('main');
main.innerHTML = `<h1>FHIR RESTful API Request-Response Flow</h1>
<p class="intro">One client request, traced from the app to the server’s own database and back. Select any step.</p>
<div class="mermaid-controls controls">
  <label for="op" style="margin:0;align-self:center">HTTP operation</label>
  <select id="op" style="width:auto;min-width:210px">
    <option value="GET">GET — search conditions</option>
    <option value="POST">POST — create a condition</option>
    <option value="PUT">PUT — replace a condition</option>
    <option value="DELETE">DELETE — remove a condition</option>
  </select>
  <button id="reset">Reset</button>
</div>
<div class="legend"><span>Blue: client app</span><span>Gray: transport and internal storage</span><span>Orange: FHIR server</span><span>Green: response</span></div>
<div id="diagram" aria-label="FHIR RESTful request and response flow"></div>
<div id="info" class="mermaid-info info" aria-live="polite"></div>
<p class="footer">Synthetic server and patient. Real deployments add an authorization step (typically SMART on FHIR) before the server accepts any of these requests.</p>`;

let op = 'GET';
let current = null;
let revision = 0;

mermaid.initialize({
  startOnLoad: false, securityLevel: 'loose', theme: 'base',
  themeVariables: {fontFamily: 'Arial', fontSize: '16px'},
  flowchart: {htmlLabels: true, useMaxWidth: false, nodeSpacing: 16, rankSpacing: 34, padding: 10, curve: 'basis'}
});

function esc(text) { return text.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

const panels = {
  client: () => {
    const o = operations[op];
    return ['1. Client app', `<p>A patient-facing app, a clinician dashboard, or a registry loader — FHIR does not care which. It wants to <strong>${o.intent}</strong>, and it expresses that intent entirely through an HTTP verb and a URL.</p><p>The app holds no knowledge of the EHR vendor’s database. That decoupling is what lets the same app run against a different server tomorrow.</p>`];
  },
  request: () => {
    const o = operations[op];
    return [`2. HTTP ${o.verb} request`,
      `<div class="code">${esc(o.request)}</div><p>${o.requestNote}</p>`];
  },
  server: () => ['3. FHIR server',
    '<p>The server parses the request, authenticates and authorizes the caller, validates any submitted resource, and works out which of its own records the request refers to. It is the boundary where a vendor-neutral request becomes a vendor-specific lookup.</p>'],
  store: () => {
    const o = operations[op];
    return ['4. Internal data store', `<p>${o.storeNote}</p>`];
  },
  response: () => {
    const o = operations[op];
    return [`5. ${o.responseHeading}`,
      `<p>${o.responseNote}</p><div class="code">${esc(o.body)}</div>`];
  },
  render: () => {
    const o = operations[op];
    return ['6. Client app renders the result', `<p>${o.renderNote}</p><p>Six steps, every time. Changing the verb changes the body, the status code, and what the store does — but not the shape of the cycle.</p>`];
  }
};

function markSelected() {
  document.querySelectorAll('#diagram .node').forEach(node =>
    node.classList.toggle('selected', node.dataset.concept === current));
}

window.showInfo = function (id) {
  if (!panels[id]) return;
  current = id;
  const [heading, body] = panels[id]();
  document.getElementById('info').innerHTML = `<h2>${heading}</h2>${body}`;
  markSelected();
};

async function renderFlow() {
  const ticket = ++revision;
  const o = operations[op];
  const code = `flowchart TB
client["Client App"]:::clientStyle
request["HTTP ${o.verb} Request"]:::wireStyle
server["FHIR Server"]:::serverStyle
store["Internal Data Store"]:::storeStyle
response["Response<br/>${o.status}"]:::responseStyle
render["Client App<br/>Renders Result"]:::clientStyle
client -->|"issues request"| request
request -->|"received by"| server
server -->|"translates and reads/writes"| store
store -->|"returns matching records"| server
server -->|"serializes as FHIR"| response
response -->|"parsed by"| render
click client call showInfo("client")
click request call showInfo("request")
click server call showInfo("server")
click store call showInfo("store")
click response call showInfo("response")
click render call showInfo("render")
classDef clientStyle fill:#d7eaff,stroke:#3776a8,color:#203348
classDef wireStyle fill:#dfe4e9,stroke:#5a6978,color:#203348
classDef serverStyle fill:#ffe2b7,stroke:#aa731e,color:#203348
classDef storeStyle fill:#eef1f4,stroke:#5a6978,color:#203348,stroke-dasharray: 5 4
classDef responseStyle fill:#d5efda,stroke:#488457,color:#203348
`;
  try {
    const {svg, bindFunctions} = await mermaid.render(`fhir-rest-${ticket}`, code);
    if (ticket !== revision) return;
    const panel = document.getElementById('diagram');
    panel.innerHTML = svg;
    bindFunctions?.(panel);
    panel.querySelectorAll('.node').forEach(node => {
      const id = (node.id.match(/flowchart-(.+)-\d+$/) || [])[1];
      if (!panels[id]) return;
      node.dataset.concept = id;
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'button');
      node.setAttribute('aria-label', panels[id]()[0]);
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

function setOperation(next) {
  op = next;
  document.getElementById('op').value = next;
  renderFlow();
  if (current) window.showInfo(current);
  else document.getElementById('info').innerHTML =
    `<h2>Six steps, one round trip</h2><p>Select each node in turn to follow a <code>${next}</code> from the app to the server’s own database and back. Then change the operation and compare: the shape holds, the body and status code do not.</p>`;
}

document.getElementById('op').addEventListener('change', event => setOperation(event.target.value));
document.getElementById('reset').addEventListener('click', () => { current = null; setOperation('GET'); });

setOperation('GET');

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type: 'microsim-resize', height: Math.ceil(document.querySelector('main').getBoundingClientRect().height) + 2}, '*');
  }
}).observe(document.querySelector('main'));
