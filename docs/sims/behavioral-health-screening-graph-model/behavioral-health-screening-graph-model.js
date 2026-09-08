// Behavioral Health Screening Graph Model — compare scored and unscored branches.
// CANVAS_HEIGHT: 880
'use strict';

const instruments = {
  phq9: {fullName:'Patient Health Questionnaire-9', screens:'Depression', range:'0–27', threshold:'Example positive screen: score ≥ 10', sample:'14', result:'POSITIVE', note:'A score of 14 falls in the moderate symptom range.'},
  gad7: {fullName:'Generalized Anxiety Disorder-7', screens:'Anxiety', range:'0–21', threshold:'Example positive screen: score ≥ 10', sample:'8', result:'NEGATIVE', note:'This example does not cross the screening cutoff.'},
  auditc: {fullName:'Alcohol Use Disorders Identification Test–Consumption', screens:'Unhealthy alcohol use', range:'0–12', threshold:'VA/DoD example: score ≥ 5', sample:'5', result:'POSITIVE', note:'Cutoffs vary by policy and population; this display uses the cited VA/DoD rule.'}
};

const nodeData = [
  {id:'patient',label:'Patient',kind:'Patient',shape:'dot',color:'#f2a7c3',cluster:'center',positions:{clustered:{x:0,y:0},compact:{x:0,y:0}},definition:'The person connected to all three modeled branches.',properties:{example_id:'P-1042'}},
  {id:'phq9',label:'PHQ-9',kind:'Screening instrument',shape:'box',color:'#a9d7f5',cluster:'screening',positions:{clustered:{x:-140,y:-160},compact:{x:-110,y:-125}},instrument:'phq9'},
  {id:'gad7',label:'GAD-7',kind:'Screening instrument',shape:'box',color:'#a9d7f5',cluster:'screening',positions:{clustered:{x:-140,y:0},compact:{x:-110,y:0}},instrument:'gad7'},
  {id:'auditc',label:'AUDIT-C',kind:'Screening instrument',shape:'box',color:'#a9d7f5',cluster:'screening',positions:{clustered:{x:-140,y:160},compact:{x:-110,y:125}},instrument:'auditc'},
  {id:'depression',label:'Depression\nPHQ-9: 14 +',kind:'Behavioral Health Condition',shape:'diamond',color:'#f6ad72',cluster:'screening',positions:{clustered:{x:-290,y:-160},compact:{x:-220,y:-125}},definition:'Condition screened for by the PHQ-9 path.'},
  {id:'anxiety',label:'Anxiety\nGAD-7: 8 −',kind:'Behavioral Health Condition',shape:'diamond',color:'#f6ad72',cluster:'screening',positions:{clustered:{x:-290,y:0},compact:{x:-220,y:0}},definition:'Condition screened for by the GAD-7 path.'},
  {id:'substance',label:'Substance Use\nAUDIT-C: 5 +',kind:'Behavioral Health Condition',shape:'diamond',color:'#f6ad72',cluster:'screening',positions:{clustered:{x:-290,y:160},compact:{x:-220,y:125}},definition:'A condition that requires additional assessment; sensitive substance-use information may receive extra confidentiality protections.'},
  {id:'autism',label:'Autism',kind:'Neurodiversity',shape:'hexagon',color:'#c5a7e8',cluster:'neuro',positions:{clustered:{x:190,y:-140},compact:{x:150,y:-105}},definition:'Modeled here as a patient characteristic without a screening-score edge.'},
  {id:'adhd',label:'ADHD',kind:'Neurodiversity',shape:'hexagon',color:'#c5a7e8',cluster:'neuro',positions:{clustered:{x:190,y:0},compact:{x:150,y:0}},definition:'Modeled here as a patient characteristic without a screening-score edge.'},
  {id:'palliative',label:'Palliative Care',kind:'Care service',shape:'hexagon',color:'#9bd6ac',cluster:'palliative',positions:{clustered:{x:190,y:160},compact:{x:150,y:105}},definition:'A care service the patient receives; it is not represented as a scored screening result.'}
];

const edgeData = [
  {id:'takes-phq',from:'patient',to:'phq9',label:'TAKES',kind:'unscored',description:'The patient completes the PHQ-9.'},
  {id:'takes-gad',from:'patient',to:'gad7',label:'TAKES',kind:'unscored',description:'The patient completes the GAD-7.'},
  {id:'takes-audit',from:'patient',to:'auditc',label:'TAKES',kind:'unscored',description:'The patient completes the AUDIT-C.'},
  {id:'screen-phq',from:'phq9',to:'depression',label:'SCREENS_FOR',display:'14 • POSITIVE',kind:'scored',instrument:'phq9',description:'A PHQ-9 score is evaluated against the example screening cutoff.'},
  {id:'screen-gad',from:'gad7',to:'anxiety',label:'SCREENS_FOR',display:'8 • NEGATIVE',kind:'scored',instrument:'gad7',description:'A GAD-7 score is evaluated against the example screening cutoff.'},
  {id:'screen-audit',from:'auditc',to:'substance',label:'SCREENS_FOR',display:'5 • POSITIVE',kind:'scored',instrument:'auditc',description:'An AUDIT-C score is evaluated against the cited VA/DoD cutoff.'},
  {id:'has-autism',from:'patient',to:'autism',label:'HAS',kind:'unscored',description:'No screening score is attached to this modeled relationship.'},
  {id:'has-adhd',from:'patient',to:'adhd',label:'HAS',kind:'unscored',description:'No screening score is attached to this modeled relationship.'},
  {id:'receives',from:'patient',to:'palliative',label:'RECEIVES',kind:'unscored',description:'Care receipt is represented without a score or threshold.'}
];

const main = document.querySelector('main');
main.innerHTML = `<h1>Behavioral Health Screening Graph Model</h1>
<p class="intro">Compare a scored screening pathway with branches that carry no screening score.</p>
<div class="legend"><span><i class="swatch" style="background:#f2a7c3"></i>Patient</span><span><i class="swatch" style="background:#a9d7f5;border-radius:3px"></i>Screening instrument</span><span><i class="swatch" style="background:#f6ad72"></i>Condition + result</span><span><i class="swatch" style="background:#c5a7e8"></i>Neurodiversity</span><span><i class="swatch" style="background:#9bd6ac"></i>Care service</span><span>Solid: SCREENS_FOR · Dashed: TAKES / HAS / RECEIVES</span></div>
<div class="workspace"><div id="network" class="graph" aria-label="Behavioral health screening property graph"></div>
<aside class="side"><div class="controls"><button id="group" aria-pressed="true">Collapse clusters</button><button id="reset">Reset view</button></div>
<label for="inspect">Inspect a node or relationship</label><select id="inspect"><option value="">Choose an element…</option></select>
<div id="info" class="info" aria-live="polite"><h2>Three different branches</h2><p>The blue-to-orange paths attach a score and result. The purple and green branches deliberately do not.</p><p class="note">A positive screen indicates a need for further assessment; it does not establish a diagnosis by itself.</p></div></aside></div>
<p class="footer">Synthetic teaching record. Screening examples illustrate graph structure and do not provide clinical advice.</p>`;

function isInIframe(){try{return window.self!==window.top;}catch(error){return true;}}
function definitionList(entries){return `<dl>${Object.entries(entries).map(([key,value])=>`<dt>${key}</dt><dd>${value}</dd>`).join('')}</dl>`;}
function nodeDetails(node){
  if(node.instrument){
    const item=instruments[node.instrument];
    return `<h2>${item.fullName}</h2><p><strong>Class:</strong> ${node.kind}</p>${definitionList({screens_for:item.screens,score_range:item.range,screening_rule:item.threshold,sample_score:item.sample,result:item.result})}<p>${item.note}</p><p class="note">Screening results require clinical context and follow-up assessment.</p>`;
  }
  return `<h2>${node.label.replace('\n',' ')}</h2><p><strong>Class:</strong> ${node.kind}</p><p>${node.definition}</p><p class="note">This branch has no score or threshold attached to its edge.</p>`;
}
function edgeDetails(edge){
  if(edge.instrument){
    const item=instruments[edge.instrument];
    return `<h2>${edge.label}: ${edge.display}</h2><p>${edge.description}</p>${definitionList({instrument:item.fullName,sample_score:item.sample,rule:item.threshold,result:item.result})}<p>${item.note}</p>`;
  }
  return `<h2>${edge.label}</h2><p>${edge.description}</p><p><strong>Structure:</strong> unscored relationship</p>`;
}
function tooltip(title,text){const box=document.createElement('div');box.innerHTML=`<strong>${title}</strong><br>${text}`;return box;}

const nodes=new vis.DataSet(nodeData.map(node=>({
  id:node.id,label:node.label,shape:node.shape,x:node.positions.clustered.x,y:node.positions.clustered.y,
  color:{background:node.color,border:node.id==='substance'?'#7b341e':'#324a5f'},borderWidth:node.id==='substance'?4:2,
  font:{face:'Arial',size:13,color:'#203348'},title:tooltip(node.label.replace('\n',' '),node.kind)
})));
const edges=new vis.DataSet(edgeData.map(edge=>({
  ...edge,label:'',width:edge.kind==='scored'?3:2,dashes:edge.kind!=='scored',
  color:{color:edge.kind==='scored'?'#486b88':'#7b8794'},title:tooltip(`${edge.label}${edge.display?' — '+edge.display:''}`,edge.description)
})));
const network=new vis.Network(document.getElementById('network'),{nodes,edges},{
  layout:{improvedLayout:false},physics:{enabled:false},
  nodes:{margin:9,shadow:{enabled:true,color:'rgba(0,0,0,.16)',size:4,x:1,y:2}},
  edges:{arrows:{to:{enabled:true,scaleFactor:.75}},smooth:{type:'continuous',roundness:.08}},
  interaction:{hover:true,tooltipDelay:120,zoomView:!isInIframe(),dragView:!isInIframe(),dragNodes:false,navigationButtons:true,keyboard:{enabled:true,bindToWindow:false}}
});

const inspect=document.getElementById('inspect');
nodeData.forEach(node=>inspect.add(new Option(`Node: ${node.label.replace('\n',' ')}`,`node:${node.id}`)));
edgeData.forEach(edge=>inspect.add(new Option(`Edge: ${edge.label}${edge.display?' — '+edge.display:''}`,`edge:${edge.id}`)));
function inspectItem(value){
  if(!value)return;
  const [type,id]=value.split(':');
  if(type==='node'){
    const node=nodeData.find(item=>item.id===id);document.getElementById('info').innerHTML=nodeDetails(node);
    network.setSelection({nodes:[id],edges:edgeData.filter(edge=>edge.from===id||edge.to===id).map(edge=>edge.id)},{highlightEdges:false});
  }else{
    const edge=edgeData.find(item=>item.id===id);document.getElementById('info').innerHTML=edgeDetails(edge);
    network.setSelection({nodes:[],edges:[id]},{highlightEdges:false});
  }
  inspect.value=value;
}
network.on('click',params=>{if(params.nodes[0])inspectItem(`node:${params.nodes[0]}`);else if(params.edges[0])inspectItem(`edge:${params.edges[0]}`);});
inspect.addEventListener('change',()=>inspectItem(inspect.value));

let grouped=true;
function applyLayout(){
  const mode=grouped?'clustered':'compact';
  nodes.update(nodeData.map(node=>({id:node.id,x:node.positions[mode].x,y:node.positions[mode].y})));
  document.getElementById('group').textContent=grouped?'Collapse clusters':'Group by cluster';
  document.getElementById('group').setAttribute('aria-pressed',String(grouped));
  requestAnimationFrame(()=>network.fit({animation:{duration:250},padding:38}));
}
document.getElementById('group').addEventListener('click',()=>{grouped=!grouped;applyLayout();});
document.getElementById('reset').addEventListener('click',()=>{grouped=true;network.unselectAll();inspect.value='';document.getElementById('info').innerHTML='<h2>Three different branches</h2><p>The blue-to-orange paths attach a score and result. The purple and green branches deliberately do not.</p><p class="note">A positive screen indicates a need for further assessment; it does not establish a diagnosis by itself.</p>';applyLayout();});
new ResizeObserver(()=>network.fit({animation:false,padding:38})).observe(document.getElementById('network'));
applyLayout();

new ResizeObserver(()=>{if(window.parent!==window){window.parent.postMessage({type:'microsim-resize',height:Math.ceil(main.getBoundingClientRect().height)+2},'*');}}).observe(main);
