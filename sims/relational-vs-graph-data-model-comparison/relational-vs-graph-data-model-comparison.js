// Relational vs. Graph Data Model — shared state links cells and edges.
// CANVAS_HEIGHT: 1060
// Layout: 980px drawing area + two 35px control rows + 10px padding.
// At <700px tables occupy y=76..490 and the graph y=505..805; feedback y=810..970.
'use strict';
let canvasWidth=800;
let drawHeight=980;
let controlHeight=80;
let canvasHeight=drawHeight+controlHeight;
let margin=16;
let sliderLeftMargin=140;
let defaultTextSize=14;
let countButton,resetButton,factSelect;
let cellTargets=[],edgeTargets=[];
const state={selected:null,origin:'',tour:false,step:0,joins:0,hops:0,timer:null};
const relations={
 treated:{label:'TREATED_BY',from:'patient',to:'provider',cells:['Patients.patient_id','Encounters.patient_id','Encounters.provider_id','Providers.provider_id'],sql:'JOIN Encounters e ON p.patient_id = e.patient_id\nJOIN Providers pr ON e.provider_id = pr.provider_id',explanation:'An encounter links the patient to a provider. This bridge table requires two key matches; the graph stores one TREATED_BY relationship.'},
 works:{label:'WORKS_AT',from:'provider',to:'facility',cells:['Providers.facility_id','Facilities.facility_id'],sql:'JOIN Facilities f ON pr.facility_id = f.facility_id',explanation:'The provider’s facility_id matches the facility’s primary key. This foreign key IS this edge in the example mapping.'},
 diagnosed:{label:'DIAGNOSED_WITH',from:'patient',to:'condition',cells:['Patients.patient_id','Diagnoses.patient_id'],sql:'JOIN Diagnoses d ON p.patient_id = d.patient_id',explanation:'A diagnosis row records the patient–condition association; the graph represents that association as a labeled edge.'},
 bills:{label:'BILLS_TO',from:'facility',to:'payer',cells:['Facilities.payer_id','Payers.payer_id'],sql:'JOIN Payers py ON f.payer_id = py.payer_id',explanation:'Result: Example Health. Facilities.payer_id matches Payers.payer_id; this example uses one payer per facility.'}
};
function tableData(){return [
 {name:'Patients',cols:['patient_id','name'],values:['MRN-48213','Maria Chen'],foreign:[]},
 {name:'Encounters',cols:['patient_id','provider_id'],values:['MRN-48213','PR-01'],foreign:['patient_id','provider_id']},
 {name:'Providers',cols:['provider_id','name','facility_id'],values:['PR-01','Dr. Patel','FC-01'],foreign:['facility_id']},
 {name:'Facilities',cols:state.tour?['facility_id','name','payer_id']:['facility_id','name'],values:state.tour?['FC-01','Riverside Clinic','PY-01']:['FC-01','Riverside Clinic'],foreign:['payer_id']},
 {name:'Diagnoses',cols:['patient_id','icd10_code','condition'],values:['MRN-48213','E11.9','Type 2 Diabetes'],foreign:['patient_id']},
 ...(state.tour?[{name:'Payers',cols:['payer_id','name'],values:['PY-01','Example Health'],foreign:[]}]:[])
];}
function setup(){
 updateCanvasSize();
 const canvas=createCanvas(canvasWidth,canvasHeight);canvas.parent(document.querySelector('main'));
 textFont('Arial');textSize(defaultTextSize);
 countButton=createButton('Count the Hops');countButton.parent(document.querySelector('main'));countButton.mousePressed(startTour);
 resetButton=createButton('Reset');resetButton.parent(document.querySelector('main'));resetButton.mousePressed(resetComparison);
 factSelect=createSelect();factSelect.parent(document.querySelector('main'));factSelect.attribute('aria-label','Select a relationship');factSelect.option('Select a relationship…','');
 ['treated','works','diagnosed'].forEach(id=>factSelect.option(relations[id].label,id));factSelect.changed(()=>selectFact(factSelect.value(),'selector'));
 describe('Compare five normalized tables with a four-node labeled property graph. Orange column headings mark foreign keys. Click a cell or edge, or use the relationship selector. Count the Hops adds a payer and traces four SQL joins versus three graph hops.',FALLBACK);
 positionControls();noLoop();
}
function positionControls(){if(!countButton)return;countButton.position(12,drawHeight+5);resetButton.position(160,drawHeight+5);factSelect.position(12,drawHeight+40);factSelect.size(Math.min(320,canvasWidth-24));}
function textBox(message,x,y,w,h,size=14,colorName='midnightblue',align=LEFT){fill(colorName);noStroke();textSize(size);textAlign(align,TOP);text(message,x,y,w,h);}
function draw(){
 cellTargets=[];edgeTargets=[];
 fill('aliceblue');stroke('silver');strokeWeight(1);rect(0,0,canvasWidth,drawHeight);fill('white');rect(0,drawHeight,canvasWidth,controlHeight);
 textBox('Same facts, two data models',16,12,canvasWidth-32,28,22,'midnightblue',CENTER);
 textBox('Click an orange foreign-key cell or a graph edge.',16,43,canvasWidth-32,24,14,'midnightblue',CENTER);
 const narrow=canvasWidth<700;
 const left={x:16,y:78,w:narrow?canvasWidth-32:canvasWidth/2-26};
 const graph={x:narrow?16:canvasWidth/2+10,y:narrow?510:78,w:narrow?canvasWidth-32:canvasWidth/2-26,h:narrow?280:480};
 textBox('RELATIONAL · Foreign keys in orange',left.x,left.y,left.w,24,14);
 const tables=tableData();tables.forEach((table,i)=>drawTable(table,left.x,left.y+27+i*66,left.w));
 drawGraph(graph);
 const feedbackY=narrow?816:570;
 fill('white');stroke('silver');rect(12,feedbackY,canvasWidth-24,drawHeight-feedbackY-12,5);
 textBox(`SQL joins: ${state.joins}     Graph hops: ${state.hops}`,24,feedbackY+12,canvasWidth-48,25,18);
 if(state.selected){
  const rel=relations[state.selected];
  textBox(rel.label+' · '+rel.explanation,24,feedbackY+43,canvasWidth-48,narrow?72:72,14);
  textBox(rel.sql,24,feedbackY+(narrow?120:122),canvasWidth-48,narrow?38:100,narrow?12:15,'darkslategray');
 }else{
  textBox('Select a key or edge. Paired highlights show the values matched by a SQL join.',24,feedbackY+48,canvasWidth-48,65,narrow?14:16);
  textBox('Count the Hops: which payer is billed by Maria’s provider’s facility? Counts show logical steps, not execution time.',24,feedbackY+(narrow?104:124),canvasWidth-48,narrow?55:100,narrow?13:14);
 }
 
}
function drawTable(table,x,y,w){
 const rowHeight=21;const cellW=w/table.cols.length;
 fill('white');stroke('slategray');strokeWeight(1);rect(x,y,w,61);
 textBox(table.name,x+6,y+2,w-12,19,14);
 table.cols.forEach((column,index)=>{
  const key=table.name+'.'+column;const selected=state.selected&&relations[state.selected].cells.includes(key);
  fill(selected?'gold':table.foreign.includes(column)?'moccasin':'gainsboro');stroke('slategray');rect(x+index*cellW,y+20,cellW,rowHeight);
  textBox(column,x+index*cellW+4,y+24,cellW-8,17,Math.min(12,(cellW-8)/(column.length*.56)));
  fill(selected?'lemonchiffon':'white');stroke('slategray');rect(x+index*cellW,y+41,cellW,20);
  const value=table.values[index];textBox(value,x+index*cellW+4,y+44,cellW-8,17,Math.min(13,(cellW-8)/(value.length*.53)));
  const relation=Object.keys(relations).find(id=>(id!=='bills'||state.tour)&&relations[id].cells.includes(key));
  if(relation)cellTargets.push({x:x+index*cellW,y:y+20,w:cellW,h:41,id:relation});
 });
}
function drawGraph(box){
 textBox('GRAPH · Labeled directed relationships',box.x,box.y,box.w,24,14);
 const points={patient:{x:box.x+box.w*.19,y:box.y+box.h*.22,label:'Patient',name:'Maria Chen',color:'lightpink'},provider:{x:box.x+box.w*.79,y:box.y+box.h*.26,label:'Provider',name:'Dr. Patel',color:'lightskyblue'},condition:{x:box.x+box.w*.19,y:box.y+box.h*.65,label:'Condition',name:'Type 2 Diabetes',color:'sandybrown'},facility:{x:box.x+box.w*.79,y:box.y+box.h*.64,label:'Facility',name:'Riverside Clinic',color:'silver'},payer:{x:box.x+box.w*.50,y:box.y+box.h*.94,label:'Payer',name:'Example Health',color:'thistle'}};
 Object.entries(relations).forEach(([id,rel])=>{
  if(id==='bills'&&!state.tour)return;
  const a=points[rel.from],b=points[rel.to];const angle=atan2(b.y-a.y,b.x-a.x);
  const start={x:a.x+cos(angle)*25,y:a.y+sin(angle)*25};const end={x:b.x-cos(angle)*70,y:b.y-sin(angle)*70};
  stroke(state.selected===id?'darkgoldenrod':'slategray');strokeWeight(state.selected===id?5:2);line(start.x,start.y,end.x,end.y);
  push();translate(end.x,end.y);rotate(angle);fill(state.selected===id?'darkgoldenrod':'slategray');noStroke();triangle(0,0,-10,-5,-10,5);pop();
  const lx=(start.x+end.x)/2,ly=(start.y+end.y)/2;
  const labelW=rel.label.length*7.4+8;
  fill(state.selected===id?'gold':'aliceblue');noStroke();rect(lx-labelW/2,ly-9,labelW,19,3);
  textBox(rel.label,lx-labelW/2+3,ly-7,labelW-6,18,12,'midnightblue',CENTER);
  edgeTargets.push({id,start,end,label:{x:lx-labelW/2,y:ly-9,w:labelW,h:19}});
 });
 Object.entries(points).forEach(([id,n])=>{
  if(id==='payer'&&!state.tour)return;
  fill(n.color);stroke('slategray');strokeWeight(2);
  if(id==='facility')rect(n.x-20,n.y-20,40,40);else if(id==='condition')quad(n.x,n.y-25,n.x+25,n.y,n.x,n.y+25,n.x-25,n.y);else circle(n.x,n.y,44);
  fill('aliceblue');noStroke();rect(n.x-70,n.y-42,140,19);rect(n.x-75,n.y+27,150,20);
  textBox(n.label,n.x-70,n.y-42,140,19,14,'midnightblue',CENTER);
  textBox(n.name,n.x-75,n.y+27,150,20,12,'midnightblue',CENTER);
 });
}
function selectFact(id,origin){if(!relations[id])return;clearTimeout(state.timer);state.timer=null;countButton.removeAttribute('disabled');state.selected=id;state.origin=origin;factSelect.selected(id);redraw();describe(relations[id].label+'. '+relations[id].explanation+' SQL: '+relations[id].sql,FALLBACK);}
function mousePressed(){
 if(mouseY>=drawHeight)return;
 const cell=cellTargets.find(c=>mouseX>=c.x&&mouseX<=c.x+c.w&&mouseY>=c.y&&mouseY<=c.y+c.h);
 if(cell){selectFact(cell.id,'cell');return;}
 for(const edge of edgeTargets){
  const b=edge.label;const dx=edge.end.x-edge.start.x,dy=edge.end.y-edge.start.y;
  const t=constrain(((mouseX-edge.start.x)*dx+(mouseY-edge.start.y)*dy)/(dx*dx+dy*dy),0,1);
  const distance=dist(mouseX,mouseY,edge.start.x+t*dx,edge.start.y+t*dy);
  if(distance<10||(mouseX>=b.x&&mouseX<=b.x+b.w&&mouseY>=b.y&&mouseY<=b.y+b.h)){selectFact(edge.id,'edge');break;}
 }
}
function startTour(){
 clearTimeout(state.timer);state.tour=true;state.step=0;state.joins=0;state.hops=0;state.selected=null;
 if(!Array.from(factSelect.elt.options).some(o=>o.value==='bills'))factSelect.option('BILLS_TO','bills');
 countButton.attribute('disabled','');redraw();
 const advance=()=>{
  const step=['treated','works','bills'][state.step];state.selected=step;state.step++;state.hops=state.step;state.joins=state.step+1;factSelect.selected(step);redraw();
  describe(`Step ${state.step}. ${state.joins} SQL joins and ${state.hops} graph hops. ${relations[step].explanation}${state.step===3?' Result: Example Health.':''}`,FALLBACK);
  if(state.step<3)state.timer=setTimeout(advance,1400);else{state.timer=null;countButton.removeAttribute('disabled');}
 };
 state.timer=setTimeout(advance,500);
}
function resetComparison(){
 clearTimeout(state.timer);Object.assign(state,{selected:null,origin:'',tour:false,step:0,joins:0,hops:0,timer:null});
 const payer=Array.from(factSelect.elt.options).find(o=>o.value==='bills');if(payer)payer.remove();factSelect.selected('');countButton.removeAttribute('disabled');redraw();
}
function windowResized(){updateCanvasSize();resizeCanvas(canvasWidth,canvasHeight);positionControls();redraw();}
function updateCanvasSize(){const container=document.querySelector('main');if(container)canvasWidth=Math.floor(container.getBoundingClientRect().width);drawHeight=canvasWidth<700?980:780;canvasHeight=drawHeight+controlHeight;}

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type:'microsim-resize',height:Math.ceil(document.querySelector('main').getBoundingClientRect().height)+2}, '*');
  }
}).observe(document.querySelector('main'));
