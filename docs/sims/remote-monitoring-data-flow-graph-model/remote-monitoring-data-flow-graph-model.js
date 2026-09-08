// Remote Monitoring Data Flow Graph Model — staged reveal of two data paths.
// CANVAS_HEIGHT: 880
'use strict';

const nodeData=[
  {id:'patient',label:'Patient',kind:'Patient-originated',shape:'dot',color:'#f2a7c3',x:-350,y:0,stage:1,definition:'The person who wears the device, submits outcomes, and accesses the portal.',properties:{example_id:'P-2048'}},
  {id:'wearable',label:'Wearable\nDevice',kind:'Patient-originated',shape:'square',color:'#a9d7f5',x:-170,y:-145,stage:1,definition:'A patient-worn device that produces timestamped measurements.',properties:{device_type:'Wrist monitor',manufacturer:'Example device'}},
  {id:'r1',label:'72 bpm\n08:00',kind:'Patient-originated',shape:'dot',color:'#a9d7f5',x:10,y:-245,stage:2,definition:'A synthetic heart-rate reading produced by the wearable.',properties:{value:'72',unit:'bpm',timestamp:'08:00'}},
  {id:'r2',label:'104 bpm\n08:05',kind:'Patient-originated',shape:'dot',color:'#a9d7f5',x:20,y:-155,stage:2,definition:'First of three consecutive synthetic readings above the teaching threshold.',properties:{value:'104',unit:'bpm',timestamp:'08:05'}},
  {id:'r3',label:'108 bpm\n08:10',kind:'Patient-originated',shape:'dot',color:'#a9d7f5',x:20,y:-65,stage:2,definition:'Second consecutive synthetic reading above the teaching threshold.',properties:{value:'108',unit:'bpm',timestamp:'08:10'}},
  {id:'r4',label:'112 bpm\n08:15',kind:'Patient-originated',shape:'dot',color:'#a9d7f5',x:10,y:25,stage:2,definition:'Third consecutive synthetic reading above the teaching threshold; this completes the example trigger.',properties:{value:'112',unit:'bpm',timestamp:'08:15'}},
  {id:'rpm',label:'RPM\nAlgorithm',kind:'System-generated',shape:'gear',color:'#c9d0d7',x:210,y:-105,stage:2,definition:'A rules engine that evaluates incoming readings.',properties:{threshold_rule:'Alert if heart rate > 100 bpm for 3 consecutive readings',evaluation_frequency:'Every 5 minutes'}},
  {id:'alert',label:'Alert',kind:'System-generated',shape:'triangle',color:'#f6b26b',x:385,y:-105,stage:3,definition:'A system event created when the example rule evaluates to true.',properties:{severity:'Example: high',triggered_at:'08:15'}},
  {id:'visit',label:'Telehealth\nVisit',kind:'System-generated',shape:'dot',color:'#9ed3a7',x:510,y:15,stage:4,definition:'A human encounter scheduled after review of the alert.',properties:{scheduled_time:'10:00',modality:'Video'}},
  {id:'portal',label:'Patient\nPortal',kind:'System-generated',shape:'hexagon',color:'#6fa0d4',x:-130,y:175,stage:1,definition:'A system that presents patient-reported outcomes and secure messages.',properties:{secure_messaging:'Available'}},
  {id:'pro',label:'Patient-Reported\nOutcome',kind:'Patient-originated',shape:'square',color:'#c5a7e8',x:90,y:205,stage:5,definition:'A questionnaire result submitted directly by the patient.',properties:{instrument_name:'Recovery Check-in',score:'7 / 10'}}
];

const edgeData=[
  {id:'wears',from:'patient',to:'wearable',label:'WEARS',stage:1,description:'The patient wears the device.'},
  {id:'accesses',from:'patient',to:'portal',label:'ACCESSES',stage:1,description:'The patient accesses the portal.'},
  {id:'g1',from:'wearable',to:'r1',label:'GENERATES',stage:2,description:'The device generates a timestamped reading.'},
  {id:'g2',from:'wearable',to:'r2',label:'GENERATES',stage:2,description:'The device generates a timestamped reading.'},
  {id:'g3',from:'wearable',to:'r3',label:'GENERATES',stage:2,description:'The device generates a timestamped reading.'},
  {id:'g4',from:'wearable',to:'r4',label:'GENERATES',stage:2,description:'The device generates a timestamped reading.'},
  {id:'f1',from:'r1',to:'rpm',label:'FEEDS',stage:2,description:'This reading is evaluated by the RPM rule.'},
  {id:'f2',from:'r2',to:'rpm',label:'FEEDS',stage:2,description:'This reading is evaluated by the RPM rule.'},
  {id:'f3',from:'r3',to:'rpm',label:'FEEDS',stage:2,description:'This reading is evaluated by the RPM rule.'},
  {id:'f4',from:'r4',to:'rpm',label:'FEEDS',stage:2,description:'This reading completes the three-reading sequence.'},
  {id:'triggers',from:'rpm',to:'alert',label:'TRIGGERS',stage:3,description:'The true rule evaluation creates an alert.'},
  {id:'schedules',from:'alert',to:'visit',label:'SCHEDULES',stage:4,description:'The alert leads to a scheduled telehealth encounter in this example.'},
  {id:'submits',from:'patient',to:'pro',label:'SUBMITS',stage:5,description:'The patient submits a reported outcome.'},
  {id:'visible',from:'pro',to:'portal',label:'VISIBLE_IN',stage:5,dashes:true,description:'The portal aggregates and displays the patient-reported outcome.'}
];

const stageText=[
  '',
  '<h2>Stage 1: Two origins</h2><p>The patient branches toward a wearable-device path and a portal path. Predict which path creates an automated alert.</p>',
  '<h2>Stage 2: Concrete readings</h2><p>The wearable generates 72, 104, 108, and 112 bpm readings. Each reading feeds the RPM algorithm.</p>',
  '<h2>Stage 3: Rule evaluation</h2><p><strong>Teaching rule:</strong> alert if heart rate &gt; 100 bpm for three consecutive readings.</p><p class="status">104 → 108 → 112 completes the sequence, so the rule evaluates TRUE.</p>',
  '<h2>Stage 4: Human encounter</h2><p>The alert leads to a scheduled telehealth visit, returning the data flow to a human care interaction.</p>',
  '<h2>Stage 5: Portal path</h2><p>The patient-reported outcome is submitted by the patient and becomes visible in the system-generated portal alongside secure messaging.</p>'
];

const main=document.querySelector('main');
main.innerHTML=`<h1>Remote Monitoring Data Flow Graph Model</h1>
<p class="intro">Reveal each stage to explain how device readings and patient-reported data enter different system paths.</p>
<div class="legend"><span><i class="swatch" style="background:#f2a7c3"></i>Patient</span><span><i class="swatch" style="background:#a9d7f5"></i>Device / reading</span><span><i class="swatch" style="background:#c9d0d7"></i>Algorithm</span><span><i class="swatch" style="background:#f6b26b"></i>Alert</span><span><i class="swatch" style="background:#6fa0d4"></i>Portal</span><span><i class="swatch" style="background:#c5a7e8"></i>Patient report</span></div>
<div class="workspace"><div id="network" class="graph" aria-label="Staged remote patient monitoring data-flow graph"></div>
<aside class="side"><div class="controls"><button id="next">Next stage</button><button id="play">Play sequence</button><button id="reset">Reset</button><div id="stage-label" class="stage">Stage 1 of 5</div></div>
<label for="inspect">Inspect a visible node</label><select id="inspect"><option value="">Choose a node…</option></select>
<div id="info" class="info" aria-live="polite">${stageText[1]}<p class="note">All values and timing are synthetic. The threshold is an instructional rule, not clinical guidance.</p></div></aside></div>
<p class="footer">Synthetic teaching data. Patient-originated describes the source of the data; system-generated describes processing or presentation by software.</p>`;

function isInIframe(){try{return window.self!==window.top;}catch(error){return true;}}
function definitionList(properties){return `<dl>${Object.entries(properties).map(([key,value])=>`<dt>${key}</dt><dd>${value}</dd>`).join('')}</dl>`;}
function tooltip(title,text){const box=document.createElement('div');box.innerHTML=`<strong>${title}</strong><br>${text}`;return box;}
const nodes=new vis.DataSet(nodeData.map(node=>({id:node.id,label:node.label,shape:node.shape,x:node.x,y:node.y,hidden:node.stage>1,color:{background:node.color,border:'#324a5f'},font:{face:'Arial',size:11,color:'#203348'},borderWidth:2,title:tooltip(node.label.replace('\n',' '),node.kind)})));
const edges=new vis.DataSet(edgeData.map(edge=>({...edge,hidden:edge.stage>1,label:'',width:2,dashes:Boolean(edge.dashes),color:{color:'#506f89'},font:{face:'Arial',size:9,background:'aliceblue'},title:tooltip(edge.label,edge.description)})));
const network=new vis.Network(document.getElementById('network'),{nodes,edges},{
  layout:{improvedLayout:false},physics:{enabled:false},nodes:{margin:7,shadow:{enabled:true,color:'rgba(0,0,0,.16)',size:4,x:1,y:2}},
  edges:{arrows:{to:{enabled:true,scaleFactor:.7}},smooth:{type:'continuous',roundness:.08}},
  interaction:{hover:true,tooltipDelay:100,zoomView:!isInIframe(),dragView:!isInIframe(),dragNodes:false,navigationButtons:true,keyboard:{enabled:true,bindToWindow:false}}
});

let currentStage=1;let playTimer=null;
const inspect=document.getElementById('inspect');
function updateInspector(){
  const prior=inspect.value;inspect.length=1;
  nodeData.filter(node=>node.stage<=currentStage).forEach(node=>inspect.add(new Option(`${node.kind}: ${node.label.replace('\n',' ')}`,node.id)));
  if([...inspect.options].some(option=>option.value===prior))inspect.value=prior;
}
function inspectNode(id){
  const node=nodeData.find(item=>item.id===id);if(!node||node.stage>currentStage)return;
  document.getElementById('info').innerHTML=`<h2>${node.label.replace('\n',' ')}</h2><p><strong>${node.kind}</strong></p><p>${node.definition}</p>${definitionList(node.properties)}${node.id==='rpm'?'<p class="note">This threshold is a synthetic teaching rule, not a clinical recommendation.</p>':''}`;
  inspect.value=id;network.selectNodes([id]);
  if(id==='wearable'&&currentStage<2)setStage(2);
  if(id==='rpm'&&currentStage<3)setStage(3);
  if(id==='alert'&&currentStage<4)setStage(4);
  if(id==='portal'&&currentStage<5)setStage(5);
}
network.on('click',params=>{if(params.nodes[0])inspectNode(params.nodes[0]);});
inspect.addEventListener('change',()=>inspectNode(inspect.value));

function setStage(stage){
  currentStage=Math.max(1,Math.min(5,stage));
  nodes.update(nodeData.map(node=>({id:node.id,hidden:node.stage>currentStage,borderWidth:currentStage>=3&&['r2','r3','r4'].includes(node.id)?4:2,color:{background:node.color,border:currentStage>=3&&['r2','r3','r4'].includes(node.id)?'#b42318':'#324a5f'}})));
  edges.update(edgeData.map(edge=>({id:edge.id,hidden:edge.stage>currentStage,label:edge.stage===1&&currentStage===1?'':edge.label,width:currentStage>=3&&['f2','f3','f4','triggers'].includes(edge.id)?4:2,color:{color:currentStage>=3&&['f2','f3','f4','triggers'].includes(edge.id)?'#b42318':'#506f89'}})));
  document.getElementById('stage-label').textContent=`Stage ${currentStage} of 5`;
  document.getElementById('next').disabled=currentStage===5;
  document.getElementById('info').innerHTML=`${stageText[currentStage]}<p class="note">All values and timing are synthetic. The threshold is an instructional rule, not clinical guidance.</p>`;
  updateInspector();requestAnimationFrame(()=>network.fit({animation:{duration:280},padding:35}));
  if(currentStage===5)stopPlayback();
}
function stopPlayback(){if(playTimer){clearInterval(playTimer);playTimer=null;}document.getElementById('play').textContent='Play sequence';document.getElementById('play').setAttribute('aria-pressed','false');}
function togglePlayback(){
  if(playTimer){stopPlayback();return;}
  if(currentStage===5)setStage(1);
  document.getElementById('play').textContent='Pause sequence';document.getElementById('play').setAttribute('aria-pressed','true');
  playTimer=setInterval(()=>{if(currentStage<5)setStage(currentStage+1);else stopPlayback();},1200);
}
document.getElementById('next').addEventListener('click',()=>setStage(currentStage+1));
document.getElementById('play').addEventListener('click',togglePlayback);
document.getElementById('reset').addEventListener('click',()=>{stopPlayback();network.unselectAll();inspect.value='';setStage(1);});
new ResizeObserver(()=>network.fit({animation:false,padding:35})).observe(document.getElementById('network'));
setStage(1);

new ResizeObserver(()=>{if(window.parent!==window){window.parent.postMessage({type:'microsim-resize',height:Math.ceil(main.getBoundingClientRect().height)+2},'*');}}).observe(main);
