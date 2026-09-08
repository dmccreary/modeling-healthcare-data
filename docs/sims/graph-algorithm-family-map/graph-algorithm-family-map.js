// Graph Algorithm Family Map — classify by the question an algorithm answers.
// CANVAS_HEIGHT: 1100
'use strict';
const families={distance:['shortest'],importance:['degree','between','pagerank'],grouping:['components','strong','clustering'],prediction:['similarity','link']};
const info={
 root:['Graph Algorithm','A graph algorithm computes an answer from nodes, edges, and their properties.'],
 distance:['Distance Questions','How can one node reach another, and which route has the lowest total cost?'],
 importance:['Importance Questions',"Which nodes matter most, and by what definition of 'matters'?"],
 grouping:['Grouping Questions','Which nodes form connected groups, and how tightly are their neighborhoods connected?'],
 prediction:['Prediction Questions','Which nodes are similar, and which missing relationships might plausibly form?'],
 shortest:['Shortest Path Algorithm','Find a path between two nodes that minimizes the sum of edge weights (or the number of edges in an unweighted graph).'],
 degree:['Degree Centrality','The degree of a node is its number of incident edges; a common normalized degree centrality divides by n − 1 for a simple undirected graph.'],
 between:['Betweenness Centrality','Sum, over pairs of other nodes, the fraction of shortest paths between each pair that pass through the node.'],
 pagerank:['PageRank Algorithm','Assign each node importance from incoming links, weighted by source importance and outgoing link count, with a random-jump term.'],
 components:['Connected Components','Find maximal sets of nodes that are mutually reachable in an undirected graph.'],
 strong:['Strongly Connected Component','A maximal set of nodes in a directed graph where every node can reach every other node following arrow directions.'],
 clustering:['Clustering Coefficient','For a node in a simple undirected graph, measure the fraction of possible edges among its neighbors that actually exist (zero by convention when degree is less than two).'],
 similarity:['Similarity Measure','Quantify how alike two nodes are using their attributes, neighbors, or graph-derived representations.'],
 link:['Link Prediction','Estimate which currently missing edges are likely, using graph structure and any available node or edge features.']
};
const examples={distance:'Example: find the fewest referral steps from a primary care provider to a specialist.',importance:'Example: identify providers who bridge otherwise separate referral groups.',grouping:'Example: find disconnected parts of a provider network; clustering coefficient describes local cohesion rather than assigning communities.',prediction:'Example: rank plausible future referrals; similarity alone is not a calibrated probability.'};
const main=document.querySelector('main');
main.innerHTML=`<h1>Graph Algorithm Family Map</h1><p class="intro">Select a family to explore its algorithms. Select any node for a definition.</p>
<div class="mermaid-controls controls"><button id="tour">This chapter’s tour</button><button id="all">Show all algorithms</button></div>
<div class="legend"><span>Gray: root</span><span>Blue: families</span><span>Green: distance</span><span>Orange: importance</span><span>Purple: grouping</span><span>Teal: prediction</span></div>
<div id="diagram" aria-label="Graph algorithm taxonomy"></div><div id="info" class="mermaid-info info" aria-live="polite"><h2>Start with a question</h2><p>Which family would you use to find a short referral path?</p></div>`;
let expanded=new Set(Object.keys(families));let revision=0;let current='root';
mermaid.initialize({startOnLoad:false,securityLevel:'loose',theme:'base',themeVariables:{fontFamily:'Arial',fontSize:'18px'},flowchart:{htmlLabels:true,useMaxWidth:false,nodeSpacing:12,rankSpacing:22,padding:8,curve:'basis'}});
function definition(id){return `<h2>${info[id][0]}</h2><p>${info[id][1]}</p>${examples[id]?'<p>'+examples[id]+'</p>':''}`;}
window.showInfo=function(id){
  if(!info[id])return;current=id;document.getElementById('info').innerHTML=definition(id);
  if(families[id]&&!expanded.has(id)){expanded.add(id);renderMap();}else markSelected();
};
function markSelected(){document.querySelectorAll('#diagram .node').forEach(node=>node.classList.toggle('selected',node.dataset.concept===current));}
async function renderMap(){
  const ticket=++revision;
  // A left-to-right tree keeps the nine leaves readable without squeezing them into one row.
  let code='flowchart LR\nroot["Graph<br/>Algorithm"]:::rootStyle\n';
  const visible=['root'];
  Object.entries(families).forEach(([family,leaves])=>{
    visible.push(family);code+=`${family}["${info[family][0].replace(' ','<br/>')}"]:::familyStyle\nroot --> ${family}\n`;
    if(expanded.has(family))leaves.forEach(id=>{
      visible.push(id);const label=info[id][0].replace('Centrality','<br/>Centrality').replace('Algorithm','<br/>Algorithm').replace('Strongly Connected Component','Strongly<br/>Connected<br/>Component').replace('Connected Components','Connected<br/>Components').replace('Clustering Coefficient','Clustering<br/>Coefficient').replace('Similarity Measure','Similarity<br/>Measure').replace('Link Prediction','Link<br/>Prediction');
      code+=`${id}["${label}"]:::${family}Style\n${family} --> ${id}\n`;
    });
  });
  visible.forEach(id=>{code+=`click ${id} call showInfo("${id}")\n`;});
  code+='classDef rootStyle fill:#d6dce2,stroke:#5a6978,color:#203348\nclassDef familyStyle fill:#d7eaff,stroke:#3776a8,color:#203348\nclassDef distanceStyle fill:#d5efda,stroke:#488457,color:#203348\nclassDef importanceStyle fill:#ffe2b7,stroke:#aa731e,color:#203348\nclassDef groupingStyle fill:#e8dcfa,stroke:#8963ad,color:#203348\nclassDef predictionStyle fill:#c8eeeb,stroke:#388b86,color:#203348\n';
  try{
    const {svg,bindFunctions}=await mermaid.render(`family-map-${ticket}`,code);
    if(ticket!==revision)return;
    const panel=document.getElementById('diagram');panel.innerHTML=svg;bindFunctions?.(panel);
    panel.querySelectorAll('.node').forEach(node=>{
      const id=(node.id.match(/flowchart-(.+)-\d+$/)||[])[1];if(!info[id])return;
      node.dataset.concept=id;node.setAttribute('tabindex','0');node.setAttribute('role','button');node.setAttribute('aria-label',info[id][0]);
      node.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();window.showInfo(id);}});
    });markSelected();
  }catch(error){if(ticket===revision)document.getElementById('info').textContent='The diagram could not load. Reload the page to try again.';console.error(error);}
}
document.getElementById('tour').addEventListener('click',()=>{expanded.clear();current='root';document.getElementById('info').innerHTML='<h2>This chapter’s tour</h2><p>Choose a question family to reveal its algorithms. Distance, importance, grouping, and prediction provide four starting points.</p>';renderMap();});
document.getElementById('all').addEventListener('click',()=>{expanded=new Set(Object.keys(families));renderMap();});
renderMap();

// Use content bounds (not viewport height) to avoid a resize feedback loop.
new ResizeObserver(() => {
  if (window.parent !== window) {
    window.parent.postMessage({type:'microsim-resize',height:Math.ceil(document.querySelector('main').getBoundingClientRect().height)+2}, '*');
  }
}).observe(document.querySelector('main'));
