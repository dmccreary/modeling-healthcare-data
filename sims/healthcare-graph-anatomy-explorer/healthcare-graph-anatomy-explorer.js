// Healthcare Graph Anatomy Explorer — identify labels, properties, and relationships.
// CANVAS_HEIGHT: 960
'use strict';
const nodeData = [
  {id:'patient', label:'Patient', name:'Maria Chen', shape:'dot', color:'#f5b7ce', x:-120, y:-100, properties:{patient_id:'MRN-48213', date_of_birth:'1985-03-12', gender:'F'}},
  {id:'provider', label:'Provider', name:'Dr. Patel', shape:'dot', color:'#9dc9f2', x:160, y:-60, properties:{npi:'1234567890', specialty:'Internal Medicine'}},
  {id:'facility', label:'Facility', name:'Riverside Clinic', shape:'square', color:'#cbd0d5', x:180, y:190, properties:{facility_type:'Outpatient Clinic', city:'Springfield'}},
  {id:'condition', label:'Condition', name:'Type 2 Diabetes', shape:'diamond', color:'#ffc184', x:-140, y:175, properties:{icd10_code:'E11.9'}}
];
const edgeData = [
  {id:'treated', from:'patient', to:'provider', label:'TREATED_BY', properties:{first_visit_date:'2024-01-15', encounter_type:'Annual Physical'}},
  {id:'works', from:'provider', to:'facility', label:'WORKS_AT', properties:{role:'Attending Physician'}},
  {id:'diagnosed', from:'patient', to:'condition', label:'DIAGNOSED_WITH', properties:{diagnosis_date:'2023-11-02'}}
];
const main = document.querySelector('main');
main.innerHTML = `<h1>Healthcare Graph Anatomy Explorer</h1><p class="intro">Click a node or arrow to separate its label from its properties.</p>
<div class="legend"><span>● Pink: Patient</span><span>● Blue: Provider</span><span>■ Gray: Facility</span><span>◆ Orange: Condition</span><span>→ Direction of the labeled relationship</span></div>
<div class="workspace"><div id="network" class="graph" aria-label="Four-node healthcare property graph"></div>
<aside class="side"><div class="controls"><button id="properties" aria-pressed="false">Show Properties</button><button id="reset">Reset view</button></div>
<label for="inspect">Inspect a node or edge</label><select id="inspect"><option value="">Choose an element…</option></select>
<div id="info" class="info" aria-live="polite"><h2>Four nodes, three edges</h2><p>A label tells you the type. Select an element to see what is known about this specific instance.</p></div></aside></div>
<p class="footer">Synthetic teaching data. A property belongs to a node or edge; it is not a separate node.</p>`;
function propertyList(properties) {
  return '<dl>' + Object.entries(properties).map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join('') + '</dl>';
}
function tooltip(item) {
  const box = document.createElement('div');
  box.innerHTML = `<strong>${item.label}${item.name ? ': '+item.name : ''}</strong>${propertyList(item.properties)}`;
  return box;
}
const nodes = new vis.DataSet(nodeData.map(n=>({...n, title:tooltip(n)})));
const edges = new vis.DataSet(edgeData.map(e=>({...e, title:tooltip(e)})));
const network = new vis.Network(document.getElementById('network'), {nodes,edges}, {
  layout:{randomSeed:24, improvedLayout:false}, physics:{enabled:false},
  nodes:{size:29, borderWidth:2, font:{size:18,face:'Arial',color:'#203348'}},
  edges:{arrows:'to',width:2,color:{color:'#64748b',highlight:'#a86200'},font:{size:15,face:'Arial',background:'aliceblue'},smooth:{type:'continuous',roundness:.1}},
  interaction:{hover:true,tooltipDelay:120,zoomView:false,dragView:false,dragNodes:false,navigationButtons:true,keyboard:{enabled:true,bindToWindow:false}}
});
const inspect = document.getElementById('inspect');
[...nodeData,...edgeData].forEach(item=>inspect.add(new Option(`${item.name ? 'Node' : 'Edge'}: ${item.label}`,item.id)));
function inspectElement(id) {
  const item = nodeData.find(n=>n.id===id) || edgeData.find(e=>e.id===id);
  if (!item) return;
  const isNode = Boolean(item.name);
  const connected = isNode ? edgeData.filter(e=>e.from===id||e.to===id) : [item];
  edges.update(edgeData.map(e=>({id:e.id,width:connected.some(c=>c.id===e.id)?5:2,color:connected.some(c=>c.id===e.id)?'#a86200':'#94a3b8'})));
  network.setSelection({nodes:isNode?[id]:[], edges:connected.map(e=>e.id)},{highlightEdges:false});
  inspect.value=id;
  document.getElementById('info').innerHTML = `<h2>${isNode?'Node':'Edge'} label: ${item.label}</h2><p>${item.name || `${nodeData.find(n=>n.id===item.from).label} → ${nodeData.find(n=>n.id===item.to).label}`}</p>${propertyList(item.properties)}${isNode?'<p><strong>Connected edges</strong><br>'+connected.map(e=>e.label).join('<br>')+'</p>':''}`;
}
network.on('click',event=>inspectElement(event.nodes[0]||event.edges[0]));
inspect.addEventListener('change',()=>inspectElement(inspect.value));
let showProperties=false;
document.getElementById('properties').addEventListener('click',()=>{
  showProperties=!showProperties;
  const button=document.getElementById('properties');
  button.textContent=showProperties?'Hide Properties':'Show Properties';
  button.setAttribute('aria-pressed',String(showProperties));
  network.redraw();
});
// Counts are separate badges, so labels remain stable when properties are toggled.
network.on('afterDrawing',ctx=>{
  if (!showProperties) return;
  const positions=network.getPositions();
  ctx.save();ctx.font='bold 14px Arial';ctx.textAlign='center';ctx.textBaseline='middle';
  nodeData.forEach(n=>{const p=positions[n.id];ctx.fillStyle='#203348';ctx.beginPath();ctx.arc(p.x+26,p.y-27,13,0,Math.PI*2);ctx.fill();ctx.fillStyle='white';ctx.fillText(Object.keys(n.properties).length,p.x+26,p.y-27);});
  ctx.restore();
});
function fitView(){network.fit({animation:false,padding:40});}
document.getElementById('reset').addEventListener('click',()=>{
  showProperties=false;document.getElementById('properties').textContent='Show Properties';document.getElementById('properties').setAttribute('aria-pressed','false');
  edges.update(edgeData.map(e=>({id:e.id,width:2,color:'#64748b'})));network.unselectAll();inspect.value='';
  document.getElementById('info').innerHTML='<h2>Four nodes, three edges</h2><p>Select a node or edge to inspect its label and properties.</p>';fitView();
});
new ResizeObserver(fitView).observe(document.getElementById('network'));
fitView();
