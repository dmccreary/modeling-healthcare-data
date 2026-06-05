// Evolution of Graph Query Languages Timeline - vis-timeline
// CANVAS_HEIGHT: 540
// Milestone timeline of graph query languages (2002-2025), color-coded by era:
// academic/research, industry innovation, standardization, and adoption.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  const style = document.createElement('style');
  style.textContent = `
    .gql-wrap { font-family: Arial, Helvetica, sans-serif; padding: 6px 10px 10px; box-sizing: border-box; }
    .gql-title { font-size: 20px; font-weight: bold; color: #1a2733; margin: 2px 0 6px; }
    .gql-controls { margin: 4px 0 6px; display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
    .gql-controls button { font-size: 13px; padding: 3px 9px; cursor: pointer; border: 1px solid #99a; border-radius: 5px; background: #f2f5f8; }
    .gql-controls button:hover { background: #e3eaf0; }
    .gql-controls label { font-size: 12px; color: #445; }
    .gql-legend { display: flex; gap: 12px; flex-wrap: wrap; font-size: 12px; margin-left: auto; }
    .gql-legend span { display: inline-flex; align-items: center; gap: 4px; }
    .gql-swatch { width: 12px; height: 12px; border-radius: 2px; display: inline-block; }
    #gql-timeline { border: 1px solid #ccd5dd; }
    #gql-info { margin-top: 8px; min-height: 54px; background: #f6f9fb; border: 1px solid #d6e0e8;
                border-radius: 6px; padding: 8px 12px; font-size: 13px; color: #233; line-height: 1.4; }
    #gql-info b { color: #14506b; }
    .vis-item.acad { background: #d6e8fb; border-color: #2b78c4; }
    .vis-item.ind  { background: #e7d9f5; border-color: #7b3fb3; }
    .vis-item.std  { background: #d8f0db; border-color: #2e7d32; }
    .vis-item.adopt{ background: #fbeecb; border-color: #c79a17; }
    .vis-item.vis-selected { box-shadow: 0 0 0 2px #14506b; }
    .vis-item .vis-item-content { white-space: nowrap !important; padding: 4px 8px !important; }
    .vis-item.vis-box, .vis-item.vis-point { min-width: fit-content !important; }
    .vis-tooltip { background: #2c3e50 !important; color: #fff !important; padding: 10px 14px !important;
      border-radius: 8px !important; font-size: 13px !important; max-width: 320px !important;
      line-height: 1.4 !important; white-space: normal !important; box-sizing: border-box !important; }
  `;
  document.head.appendChild(style);

  const wrap = document.createElement('div');
  wrap.className = 'gql-wrap';
  wrap.innerHTML = `
    <div class="gql-title">Evolution of Graph Query Languages (2002&ndash;2025)</div>
    <div class="gql-controls">
      <button id="gql-fit">Fit All</button>
      <button id="gql-in">Zoom +</button>
      <button id="gql-out">Zoom -</button>
      <label>Filter:
        <select id="gql-filter">
          <option value="all">All eras</option>
          <option value="acad">Academic / research</option>
          <option value="ind">Industry innovation</option>
          <option value="std">Standardization</option>
          <option value="adopt">Adoption</option>
        </select>
      </label>
      <span class="gql-legend">
        <span><i class="gql-swatch" style="background:#2b78c4"></i>Academic</span>
        <span><i class="gql-swatch" style="background:#7b3fb3"></i>Industry</span>
        <span><i class="gql-swatch" style="background:#2e7d32"></i>Standardization</span>
        <span><i class="gql-swatch" style="background:#c79a17"></i>Adoption</span>
      </span>
    </div>
    <div id="gql-timeline"></div>
    <div id="gql-info">Click a milestone for detail. The arc runs from academic triple stores (SPARQL) to a formal ISO standard (GQL).</div>
  `;
  main.appendChild(wrap);

  const milestones = [
    { id: 1, year: 2002, cat: 'acad', label: 'RDF + SPARQL',
      detail: 'Resource Description Framework and SPARQL for the semantic web. Academic focus on triple stores, limited industry adoption for operational systems.' },
    { id: 2, year: 2010, cat: 'ind', label: 'Neo4j Cypher',
      detail: 'Neo4j releases Cypher as an open-source query language. ASCII-art syntax makes graph patterns intuitive and drives enterprise Neo4j adoption.' },
    { id: 3, year: 2012, cat: 'ind', label: 'TigerGraph GSQL',
      detail: 'TigerGraph introduces GSQL with strong typing and procedural features, targeting high-performance analytics with compiled queries.' },
    { id: 4, year: 2015, cat: 'ind', label: 'openCypher',
      detail: 'The openCypher project launches a vendor-neutral Cypher specification; SAP, Redis, and Memgraph adopt Cypher implementations.' },
    { id: 5, year: 2019, cat: 'std', label: 'ISO GQL process',
      detail: 'ISO begins the formal GQL standardization process - industry collaboration to create a SQL-equivalent standard for graph databases.' },
    { id: 6, year: 2023, cat: 'std', label: 'GQL draft',
      detail: 'The GQL draft specification is published for public review, combining Cypher, GSQL, and SPARQL concepts into a unified standard.' },
    { id: 7, year: 2024, cat: 'std', label: 'GQL ISO standard',
      detail: 'GQL is approved as an ISO/IEC international standard - the first major graph query language with formal standardization.' },
    { id: 8, year: 2025, cat: 'adopt', label: 'Vendor roadmaps',
      detail: 'Major database vendors announce GQL support roadmaps; Oracle, Neo4j, and TigerGraph commit to GQL implementations.' }
  ];

  const items = milestones.map(m => ({
    id: m.id,
    content: m.year + ': ' + m.label,
    start: new Date(m.year, 5, 30),
    type: 'box',
    className: m.cat,
    title: '<b>' + m.year + ' &mdash; ' + m.label + '</b><br>' + m.detail
  }));

  const container = document.getElementById('gql-timeline');
  const dataset = new vis.DataSet(items);
  const options = {
    width: '100%',
    height: '300px',
    margin: { item: { horizontal: 40, vertical: 14 }, axis: 30 },
    orientation: 'top',
    stack: true,
    selectable: true,
    showCurrentTime: false,
    moveable: true,
    zoomable: false,
    align: 'center',
    tooltip: { followMouse: true },
    min: new Date(1994, 0, 1),
    max: new Date(2032, 0, 1)
  };
  const timeline = new vis.Timeline(container, dataset, options);

  const YEAR = 365 * 24 * 60 * 60 * 1000;
  function fitAll() {
    const ts = items.map(i => i.start.getTime());
    timeline.setWindow(new Date(Math.min(...ts) - 4 * YEAR), new Date(Math.max(...ts) + 4 * YEAR), { animation: false });
  }
  fitAll();

  const info = document.getElementById('gql-info');
  timeline.on('select', function (props) {
    if (!props.items.length) return;
    const m = milestones.find(x => x.id === props.items[0]);
    if (m) info.innerHTML = '<b>' + m.year + ' &mdash; ' + m.label + '.</b> ' + m.detail;
  });

  document.getElementById('gql-fit').onclick = fitAll;
  document.getElementById('gql-in').onclick = () => timeline.zoomIn(0.5);
  document.getElementById('gql-out').onclick = () => timeline.zoomOut(0.5);
  document.getElementById('gql-filter').onchange = function () {
    const cat = this.value;
    dataset.clear();
    dataset.add(cat === 'all' ? items : items.filter(i => i.className === cat));
    fitAll();
  };

  container.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) {
      e.stopImmediatePropagation();
    } else {
      e.preventDefault();
      const w = timeline.getWindow();
      const shift = (e.deltaX / container.clientWidth) * (w.end - w.start);
      timeline.setWindow(new Date(w.start.valueOf() + shift), new Date(w.end.valueOf() + shift), { animation: false });
    }
  }, true);
});
