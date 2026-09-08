// Patient Demographics and SDOH Profile — properties versus related concepts.
// CANVAS_HEIGHT: 1240
'use strict';
const demographics={age:39,sex:'F',race_ethnicity:'Asian',preferred_language:'English',address:'142 Oak St, Springfield'};
const factors=[
  {id:'housing',name:'Housing Instability',category:'housing',x:-250,y:-170,severity:'low',risk_level:1,connected:false},
  {id:'food',name:'Food Insecurity',category:'food',x:250,y:-170,severity:'low',risk_level:1,connected:true},
  {id:'transport',name:'Transportation Access',category:'transportation',x:280,y:155,severity:'moderate',risk_level:3,connected:true},
  {id:'literacy',name:'Health Literacy',category:'education',x:-250,y:160,severity:'low',risk_level:1,connected:true},
  {id:'income',name:'Income Level',category:'economic stability',x:10,y:300,severity:'low',risk_level:1,connected:false}
];
const initialConnections=factors.map(f=>f.connected);
const main=document.querySelector('main');
main.innerHTML=`<h1>Patient Demographics and SDOH Profile</h1><p class="intro">Select Maria to trace recorded factors, or inspect a factor to explore this modeling choice.</p>
<div class="legend"><span>● Pink: Patient</span><span>◆ Orange: SDOHFactor</span><span>→ HAS_SDOH_FACTOR</span><span>Thin amber: low</span><span>Medium orange: moderate</span><span>Thick red: high</span></div>
<div class="workspace"><div id="network" class="graph" aria-label="Patient with five possible social determinant factors"></div><aside class="side">
<div class="controls"><button id="reset">Reset view</button><button id="mapping" aria-expanded="false">Show FHIR Mapping Note</button></div>
<h2>Maria Chen · Patient</h2><div id="demographics" class="demographics"></div>
<label for="inspect">Inspect a node</label><select id="inspect"><option value="patient">Patient: Maria Chen</option></select>
<div id="edit" hidden><label><input id="connected" type="checkbox"> Connect this factor to Maria</label></div>
<div id="info" class="info" aria-live="polite"></div></aside></div>
<div id="mapping-note" class="note" hidden>FHIR mapping: structured SDOH assessments can use Observation resources with coded questions and answers (for example, LOINC). Identified social needs can also use Condition resources with ICD-10-CM Z codes. This teaching graph is not a one-to-one FHIR mapping. See the <a href="https://hl7.org/fhir/us/sdoh-clinicalcare/" target="_blank" rel="noopener">HL7 SDOH Clinical Care guide</a>.</div>
<p class="footer">Synthetic snapshot; age is fixed for this example. Severity and risk are illustrative recorded values, never inferred from demographics. An unconnected factor means no relationship is recorded here, not that a need has been ruled out.</p>`;
document.getElementById('demographics').innerHTML=Object.entries(demographics).map(([k,v])=>`<div><strong>${k}:</strong> ${v}</div>`).join('');
document.getElementById('demographics').style.cssText='font-size:13px;line-height:1.5;overflow-wrap:anywhere;margin-bottom:12px';
function popup(title,props){const element=document.createElement('div');element.innerHTML=`<strong>${title}</strong><br>`+Object.entries(props).map(([k,v])=>`${k}: ${v}`).join('<br>');return element;}
const nodes=new vis.DataSet([{id:'patient',label:'Patient\nMaria Chen',shape:'dot',color:'#f5b7ce',x:0,y:-20,size:34,title:popup('Patient: Maria Chen',demographics)},...factors.map(f=>({id:f.id,label:f.name.replace(' ','\n'),shape:'diamond',color:'#ffc184',x:f.x,y:f.y,size:27}))]);
const edges=new vis.DataSet();
const network=new vis.Network(document.getElementById('network'),{nodes,edges},{layout:{improvedLayout:false},physics:false,nodes:{font:{size:18,face:'Arial',color:'#203348'},borderWidth:2},edges:{arrows:'to',font:{size:13,background:'aliceblue'},smooth:false},interaction:{hover:true,tooltipDelay:100,dragView:false,zoomView:false,dragNodes:false,navigationButtons:true,keyboard:{enabled:true,bindToWindow:false}}});
let selected='';
const palette={low:'#a76c0c',moderate:'#ce5428',high:'#b22222'};
function refreshGraph(){
  edges.clear();
  factors.forEach(f=>{
    const properties=f.connected?{category:f.category,severity:f.severity,risk_level:f.risk_level}:{category:f.category,relationship:'Not recorded for Maria'};
    nodes.update({id:f.id,title:popup(f.name,properties),opacity:selected==='patient'&&!f.connected?.28:1});
    if(f.connected)edges.add({id:f.id,from:'patient',to:f.id,label:'HAS_SDOH_FACTOR',color:palette[f.severity],width:{low:2,moderate:4,high:6}[f.severity],title:popup(f.name,properties)});
  });
  if(selected==='patient')network.setSelection({nodes:['patient',...factors.filter(f=>f.connected).map(f=>f.id)],edges:edges.getIds()},{highlightEdges:false});
}
factors.forEach(f=>document.getElementById('inspect').add(new Option('SDOHFactor: '+f.name,f.id)));
function showInfo(id,highlight=true){
  if(!id)return;selected=id;document.getElementById('inspect').value=id;
  document.getElementById('edit').hidden=id==='patient';
  if(id==='patient'){
    document.getElementById('info').innerHTML='<h2>Properties vs. relationships</h2><p>Demographics describe this patient. Connected factor nodes represent separately queryable concepts; severity and risk belong to the patient–factor relationship.</p>';
    if(highlight)refreshGraph();
  }else{
    const f=factors.find(item=>item.id===id);if(!f)return;
    document.getElementById('connected').checked=f.connected;
    document.getElementById('info').innerHTML=`<h2>SDOHFactor: ${f.name}</h2><p><strong>category:</strong> ${f.category}</p><p>${f.connected?`HAS_SDOH_FACTOR<br>severity: ${f.severity}<br>risk_level: ${f.risk_level}`:'No HAS_SDOH_FACTOR edge is recorded for Maria.'}</p>`;
    if(highlight){refreshGraph();network.setSelection({nodes:[id],edges:f.connected?[id]:[]},{highlightEdges:false});}
  }
}
network.on('click',event=>showInfo(event.nodes[0]||event.edges[0]));
document.getElementById('inspect').addEventListener('change',event=>showInfo(event.target.value));
document.getElementById('connected').addEventListener('change',event=>{const f=factors.find(f=>f.id===selected);if(f){f.connected=event.target.checked;refreshGraph();showInfo(selected);}});
document.getElementById('mapping').addEventListener('click',()=>{
  const note=document.getElementById('mapping-note');note.hidden=!note.hidden;
  document.getElementById('mapping').textContent=note.hidden?'Show FHIR Mapping Note':'Hide FHIR Mapping Note';
  document.getElementById('mapping').setAttribute('aria-expanded',String(!note.hidden));
});
function fitView(){network.fit({animation:false,padding:40});}
document.getElementById('reset').addEventListener('click',()=>{
  factors.forEach((f,i)=>f.connected=initialConnections[i]);selected='';refreshGraph();network.unselectAll();
  showInfo('patient',false);selected='';document.getElementById('mapping-note').hidden=true;document.getElementById('mapping').textContent='Show FHIR Mapping Note';document.getElementById('mapping').setAttribute('aria-expanded','false');fitView();
});
new ResizeObserver(fitView).observe(document.getElementById('network'));
refreshGraph();showInfo('patient',false);selected='';fitView();

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type:'microsim-resize',height:Math.ceil(document.querySelector('main').getBoundingClientRect().height)+2}, '*');
  }
}).observe(document.querySelector('main'));
