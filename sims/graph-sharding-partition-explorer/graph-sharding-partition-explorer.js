// Graph Sharding Partition Explorer — synthetic sequential traversal cost model.
// CANVAS_HEIGHT: 940
'use strict';
const main=document.querySelector('main');main.className='wide';
main.innerHTML=`<h1>Graph Sharding Partition Explorer</h1><p class="intro">Add referral edges between shards. Which relationships need a network round trip?</p>
<div class="legend"><span>● Pink: Patient</span><span>● Blue: Provider</span><span>■ Gray: Facility</span><span>— Gray: same shard</span><span style="color:#a32731">⇢ Dashed red: cross shard / network hop</span></div>
<div class="workspace"><div id="network" class="graph" aria-label="Twenty-four healthcare nodes in three shards"></div><aside class="side"><div>
<label for="count">Cross-shard edge count: <output id="count-value">2</output></label><input id="count" type="range" min="0" max="8" value="2" step="1">
<div class="controls"><button id="reset">Reset</button></div><label for="inspect">Inspect an edge</label><select id="inspect"></select></div>
<div><p>Estimated cross-shard traversal cost</p><p class="metric" id="cost" aria-live="polite"></p><div id="info" class="info" aria-live="polite">Click an edge to inspect its endpoints and latency.</div></div></aside></div>
<p class="footer">Illustrative assumptions, not benchmarks: 0.01 ms per local traversal; 5–50 ms per remote traversal. Cost sums one sequential traversal of each visible cross-shard edge; concurrency, caching, and payload size are omitted.</p>`;
const nodeData=[];const localEdges=[];
for(let shard=0;shard<3;shard++){
  const cx=(shard-1)*340;
  const positions=[[-105,-155],[105,-145],[-105,-30],[105,-20],[-105,95],[105,105],[0,195],[0,-265]];
  positions.forEach(([x,y],i)=>{
    const type=i===7?'Facility':i===6?'Provider':'Patient';
    nodeData.push({id:`s${shard}-${i}`,label:`${type==='Patient'?'P':type==='Provider'?'Dr':'F'}${shard+1}${type==='Patient'?'.'+(i+1):''}`,title:`${type} — Shard ${shard+1}`,shape:type==='Facility'?'square':'dot',color:type==='Patient'?'#f5b7ce':type==='Provider'?'#9dc9f2':'#cbd0d5',x:cx+x,y,size:type==='Patient'?20:24,shard});
    if(i<6)localEdges.push({id:`local-${shard}-${i}`,from:`s${shard}-${i}`,to:`s${shard}-6`,label:'',type:'local'});
  });
  localEdges.push({id:`local-${shard}-works`,from:`s${shard}-6`,to:`s${shard}-7`,type:'local'});
}
const referralPairs=[['s0-6','s2-6'],['s1-6','s2-6'],['s0-0','s1-6'],['s0-2','s2-6'],['s1-1','s0-6'],['s1-3','s2-6'],['s2-0','s0-6'],['s2-4','s1-6']];
const nodes=new vis.DataSet(nodeData);const edges=new vis.DataSet();
const network=new vis.Network(document.getElementById('network'),{nodes,edges},{physics:false,layout:{improvedLayout:false},nodes:{font:{size:20,face:'Arial',color:'#203348'},borderWidth:2},edges:{arrows:{to:{enabled:true,scaleFactor:.65}},smooth:{enabled:true,type:'curvedCW',roundness:.15}},interaction:{hover:true,zoomView:false,dragView:false,dragNodes:false,navigationButtons:true,keyboard:{enabled:true,bindToWindow:false}}});
network.on('beforeDrawing',ctx=>{
  ctx.save();['#e6eefb','#e4f2ea','#fff0db'].forEach((fill,s)=>{
    ctx.fillStyle=fill;ctx.strokeStyle='#aab8c5';ctx.lineWidth=1;ctx.fillRect((s-1)*340-161,-330,322,610);ctx.strokeRect((s-1)*340-161,-330,322,610);
    ctx.fillStyle='#203348';ctx.font='bold 23px Arial';ctx.textAlign='center';ctx.fillText(`Shard ${s+1}`,(s-1)*340,-296);
  });ctx.restore();
});
function latency(edge){return edge.type==='local'?'In-memory pointer traversal: ~0.01 ms':'Network round trip required: ~5–50 ms';}
function updateEdges(){
  const count=Number(document.getElementById('count').value);
  const referrals=referralPairs.slice(0,count).map(([from,to],i)=>({id:`remote-${i}`,from,to,type:'remote',label:'⇄',font:{size:22,background:'white',color:'#a32731'},dashes:[8,5],color:'#b32b3a',width:3}));
  edges.clear();edges.add([...localEdges.map(e=>({...e,color:'#7b8794',width:1.7,dashes:false})),...referrals].map(e=>({...e,title:latency(e)})));
  const select=document.getElementById('inspect');select.innerHTML='<option value="">Choose an edge…</option>';
  edges.get().forEach(e=>select.add(new Option(`${e.type==='local'?'Same shard':'Cross shard'}: ${nodes.get(e.from).label} → ${nodes.get(e.to).label}`,e.id)));
  document.getElementById('count-value').value=count;
  document.getElementById('cost').textContent=`${count*5}–${count*50} ms for ${count} remote traversals`;
  document.getElementById('info').textContent=`${localEdges.length} same-shard edges and ${count} cross-shard edges. Click an edge for the latency comparison.`;
  network.unselectAll();
}
function inspectEdge(id){
  const e=edges.get(id);if(!e)return;
  const a=nodes.get(e.from),b=nodes.get(e.to);network.selectEdges([id]);document.getElementById('inspect').value=id;
  document.getElementById('info').innerHTML=`<strong>${a.label} (Shard ${a.shard+1}) → ${b.label} (Shard ${b.shard+1})</strong><p>${latency(e)}</p><p>${e.type==='local'?'Both endpoints are stored together.':'The destination is on a different shard, so this model adds a network round trip.'}</p>`;
}
network.on('click',event=>inspectEdge(event.edges[0]));
document.getElementById('inspect').addEventListener('change',event=>inspectEdge(event.target.value));
document.getElementById('count').addEventListener('input',updateEdges);
// Reserve room for the background boundaries as well as node labels.
function fitView(){const box=document.getElementById('network');network.moveTo({position:{x:0,y:-25},scale:Math.min((box.clientWidth-24)/1030,(box.clientHeight-65)/630),animation:false});}
document.getElementById('reset').addEventListener('click',()=>{document.getElementById('count').value=2;updateEdges();fitView();});
new ResizeObserver(fitView).observe(document.getElementById('network'));updateEdges();fitView();
