// Post-Surgical Care Transition Workflow — trace inputs to an illustrative risk score.
// CANVAS_HEIGHT: 880
'use strict';

const nodeData = [
  {id:'procedure',label:'Surgical\nProcedure',kind:'Process',shape:'box',color:'#8fc4ee',x:-220,y:-105,definition:'The operative episode recorded with procedure and staffing details.',properties:{procedure_code:'Example code',surgeon:'Care-team member',anesthesia_type:'General',date:'Day 0'}},
  {id:'monitoring',label:'Post-Operative\nMonitoring',kind:'Process',shape:'box',color:'#83d4cf',x:-80,y:-105,definition:'Observation after surgery, including clinical status and complications.',properties:{vital_signs:'Monitored',wound_status:'Documented',pain_score:'Recorded',complication_flag:'No'}},
  {id:'summary',label:'Discharge\nSummary',kind:'Document',shape:'box',color:'#d4dae0',x:60,y:-105,definition:'A document that summarizes the encounter and instructions for the next setting.',properties:{diagnoses:'Included',medications:'Reconciled',follow_up_instructions:'Included'}},
  {id:'transition',label:'Care\nTransition',kind:'Decision',shape:'diamond',color:'#f6b26b',x:200,y:-105,definition:'The point where the next care setting is selected.',properties:{decision_basis:'Needs and support',status:'Completed'}},
  {id:'home',label:'Home with\nHome Health',kind:'Destination',shape:'box',color:'#9ed3a7',x:320,y:-185,definition:'A discharge destination with in-home services.',properties:{disposition:'Home health'}},
  {id:'snf',label:'Skilled Nursing /\nRehab Facility',kind:'Destination',shape:'box',color:'#9ed3a7',x:320,y:-25,definition:'A facility-based transition for skilled nursing or rehabilitation.',properties:{disposition:'SNF / rehab'}},
  {id:'comorbidity',label:'Comorbidity\nCount',kind:'Risk input',shape:'ellipse',color:'#c7b4e8',x:-170,y:125,definition:'Count of relevant coexisting conditions used by this teaching example.',properties:{sample_value:'3'}},
  {id:'stay',label:'Length of\nStay',kind:'Risk input',shape:'ellipse',color:'#c7b4e8',x:-55,y:195,definition:'Elapsed inpatient time associated with the surgical episode.',properties:{sample_value:'6 days'}},
  {id:'disposition',label:'Discharge\nDisposition',kind:'Risk input',shape:'ellipse',color:'#c7b4e8',x:75,y:195,definition:'The setting selected at discharge.',properties:{sample_value:'Skilled nursing facility'}},
  {id:'prior',label:'Prior Admissions\n(12 mo)',kind:'Risk input',shape:'ellipse',color:'#c7b4e8',x:195,y:125,definition:'Count of admissions in the preceding 12 months.',properties:{sample_value:'1'}},
  {id:'risk',label:'Readmission Risk\n68 / 100',kind:'Illustrative result',shape:'octagon',color:'#ee9098',x:20,y:330,definition:'A synthetic result that combines the four displayed inputs.',properties:{risk_score:'68 / 100',model:'Teaching example only'}}
];

const edgeData = [
  {id:'e1',from:'procedure',to:'monitoring',label:'FOLLOWED_BY',display:'FOLLOWS',group:'process',description:'Post-operative monitoring follows the recorded procedure.'},
  {id:'e2',from:'monitoring',to:'summary',label:'LEADS_TO',display:'LEADS_TO',group:'process',description:'Monitoring findings inform the discharge summary.'},
  {id:'e3',from:'summary',to:'transition',label:'INITIATES',display:'STARTS',group:'process',description:'The discharge summary initiates the care transition.'},
  {id:'e4',from:'transition',to:'home',label:'ROUTES_TO',group:'process',description:'One transition route is home with home health.'},
  {id:'e5',from:'transition',to:'snf',label:'ROUTES_TO',group:'process',description:'Another transition route is skilled nursing or rehabilitation.'},
  {id:'r1',from:'comorbidity',to:'risk',label:'CONTRIBUTES',display:'INPUT',group:'risk',description:'Comorbidity count is one input to the displayed teaching score.'},
  {id:'r2',from:'stay',to:'risk',label:'CONTRIBUTES',display:'INPUT',group:'risk',description:'Length of stay is one input to the displayed teaching score.'},
  {id:'r3',from:'disposition',to:'risk',label:'CONTRIBUTES',display:'INPUT',group:'risk',description:'Discharge disposition is one input to the displayed teaching score.'},
  {id:'r4',from:'prior',to:'risk',label:'CONTRIBUTES',display:'INPUT',group:'risk',description:'Prior admissions are one input to the displayed teaching score.'}
];

const main=document.querySelector('main');
main.innerHTML=`<h1>Post-Surgical Care Transition Workflow</h1>
<p class="intro">Trace the workflow, then isolate the four graph-visible inputs feeding the example risk result.</p>
<div class="legend"><span><i class="swatch" style="background:#8fc4ee;border-radius:3px"></i>Surgical process</span><span><i class="swatch" style="background:#f6b26b"></i>Decision</span><span><i class="swatch" style="background:#9ed3a7;border-radius:3px"></i>Destination</span><span><i class="swatch" style="background:#c7b4e8"></i>Risk input</span><span><i class="swatch" style="background:#ee9098"></i>Result</span><span>Solid: workflow sequence · Dashed: CONTRIBUTES</span></div>
<div class="workspace"><div id="network" class="graph" aria-label="Post-surgical care transition and readmission risk graph"></div>
<aside class="side"><div class="controls"><button id="risk-only" aria-pressed="false">Highlight risk inputs</button><button id="reset">Reset view</button></div>
<label for="inspect">Inspect a node</label><select id="inspect"><option value="">Choose a node…</option></select>
<div id="info" class="info" aria-live="polite"><h2>Two layers in one graph</h2><p>The upper path records care transitions. Dashed purple arrows below show the smaller set of facts used by the example score.</p><p class="note">The sample values and 68/100 score are synthetic. This is not a validated clinical prediction model.</p></div></aside></div>
<p class="footer">Synthetic teaching data. Use a locally validated model and governance process for clinical decisions.</p>`;

function isInIframe(){try{return window.self!==window.top;}catch(error){return true;}}
function definitionList(properties){return `<dl>${Object.entries(properties).map(([key,value])=>`<dt>${key}</dt><dd>${value}</dd>`).join('')}</dl>`;}
function tooltip(title,text){const box=document.createElement('div');box.innerHTML=`<strong>${title}</strong><br>${text}`;return box;}

const nodes=new vis.DataSet(nodeData.map(node=>({id:node.id,label:node.label,shape:node.shape,x:node.x,y:node.y,color:{background:node.color,border:'#324a5f'},font:{face:'Arial',size:13,color:'#203348'},borderWidth:2,title:tooltip(node.label.replace('\n',' '),node.definition)})));
const edges=new vis.DataSet(edgeData.map(edge=>({...edge,label:'',width:edge.group==='risk'?2:3,dashes:edge.group==='risk',color:{color:edge.group==='risk'?'#73579a':'#486b88'},title:tooltip(edge.label,edge.description)})));
const network=new vis.Network(document.getElementById('network'),{nodes,edges},{
  layout:{improvedLayout:false},physics:{enabled:false},
  nodes:{margin:8,shadow:{enabled:true,color:'rgba(0,0,0,.16)',size:4,x:1,y:2}},
  edges:{arrows:{to:{enabled:true,scaleFactor:.75}},smooth:{type:'continuous',roundness:.08}},
  interaction:{hover:true,tooltipDelay:100,zoomView:!isInIframe(),dragView:!isInIframe(),dragNodes:false,navigationButtons:true,keyboard:{enabled:true,bindToWindow:false}}
});

const inspect=document.getElementById('inspect');
nodeData.forEach(node=>inspect.add(new Option(`${node.kind}: ${node.label.replace('\n',' ')}`,node.id)));
function showNode(id){
  const node=nodeData.find(item=>item.id===id);if(!node)return;
  const connected=edgeData.filter(edge=>edge.from===id||edge.to===id);
  let extra='';
  if(id==='risk'){
    extra=`<h2>Illustrative breakdown</h2><ul><li>Comorbidity Count: 3</li><li>Length of Stay: 6 days</li><li>Discharge Disposition: Skilled nursing facility</li><li>Prior Admissions (12 mo): 1</li></ul><p class="status">Example result: 68 / 100</p><p class="note">This score is intentionally synthetic; no clinical equation is implied.</p>`;
  }else{
    extra=`<h2>${node.label.replace('\n',' ')}</h2><p><strong>${node.kind}</strong></p><p>${node.definition}</p>${definitionList(node.properties)}<p><strong>Connected relationships:</strong> ${connected.map(edge=>edge.label).join(', ')}</p>`;
  }
  document.getElementById('info').innerHTML=extra;inspect.value=id;
  network.setSelection({nodes:[id],edges:connected.map(edge=>edge.id)},{highlightEdges:false});
}
network.on('click',params=>{if(params.nodes[0])showNode(params.nodes[0]);});
inspect.addEventListener('change',()=>showNode(inspect.value));

let riskOnly=false;
function applyFocus(){
  const focusIds=new Set(['comorbidity','stay','disposition','prior','risk']);
  nodes.update(nodeData.map(node=>({id:node.id,opacity:riskOnly&&!focusIds.has(node.id)?.16:1,font:{color:riskOnly&&!focusIds.has(node.id)?'#aab3bc':'#203348'}})));
  edges.update(edgeData.map(edge=>({id:edge.id,width:edge.group==='risk'?(riskOnly?4:2):(riskOnly?1:3),color:{color:edge.group==='risk'?'#73579a':'#486b88',opacity:riskOnly&&edge.group!=='risk'?.12:1}})));
  const button=document.getElementById('risk-only');button.textContent=riskOnly?'Show full workflow':'Highlight risk inputs';button.setAttribute('aria-pressed',String(riskOnly));
  document.getElementById('info').innerHTML=riskOnly?'<h2>Risk subgraph isolated</h2><p>Only four purple inputs have dashed arrows into the red result. The other workflow nodes provide context but do not directly feed this teaching score.</p>':'<h2>Two layers in one graph</h2><p>The upper path records care transitions. Dashed purple arrows below show the smaller set of facts used by the example score.</p><p class="note">The sample values and 68/100 score are synthetic. This is not a validated clinical prediction model.</p>';
  requestAnimationFrame(()=>network.fit({animation:{duration:250},padding:35}));
}
document.getElementById('risk-only').addEventListener('click',()=>{riskOnly=!riskOnly;network.unselectAll();inspect.value='';applyFocus();});
document.getElementById('reset').addEventListener('click',()=>{riskOnly=false;network.unselectAll();inspect.value='';applyFocus();});
new ResizeObserver(()=>network.fit({animation:false,padding:35})).observe(document.getElementById('network'));
applyFocus();

new ResizeObserver(()=>{if(window.parent!==window){window.parent.postMessage({type:'microsim-resize',height:Math.ceil(main.getBoundingClientRect().height)+2},'*');}}).observe(main);
