// Clinical Discovery Pipeline Timeline - vis-timeline
// CANVAS_HEIGHT: 640
// Nine-phase graph + AI clinical discovery pipeline, from data integration to
// publication. Phases are color-coded by stage and clickable for a heart-failure
// research example. An annotation banner contrasts the traditional vs graph+AI timeline.

document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main');

  // ---- Injected styles (main.html is left untouched) -----------------------
  const style = document.createElement('style');
  style.textContent = `
    .cdp-wrap { font-family: Arial, Helvetica, sans-serif; padding: 6px 10px 10px; box-sizing: border-box; }
    .cdp-title { font-size: 20px; font-weight: bold; color: #1a2733; margin: 2px 0 2px; }
    .cdp-banner { display: flex; gap: 8px; flex-wrap: wrap; margin: 6px 0 8px; }
    .cdp-pill { font-size: 12px; padding: 4px 10px; border-radius: 12px; color: #fff; font-weight: bold; }
    .cdp-pill.trad { background: #9aa7b0; }
    .cdp-pill.fast { background: #2e7d32; }
    .cdp-pill.save { background: #b8860b; }
    .cdp-controls { margin: 4px 0 6px; display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
    .cdp-controls button { font-size: 13px; padding: 3px 9px; cursor: pointer; border: 1px solid #99a; border-radius: 5px; background: #f2f5f8; }
    .cdp-controls button:hover { background: #e3eaf0; }
    .cdp-controls label { font-size: 12px; color: #445; }
    .cdp-legend { display: flex; gap: 12px; flex-wrap: wrap; font-size: 12px; margin-left: auto; }
    .cdp-legend span { display: inline-flex; align-items: center; gap: 4px; }
    .cdp-swatch { width: 12px; height: 12px; border-radius: 2px; display: inline-block; }
    #cdp-timeline { border: 1px solid #ccd5dd; }
    #cdp-info { margin-top: 8px; min-height: 54px; background: #f6f9fb; border: 1px solid #d6e0e8;
                border-radius: 6px; padding: 8px 12px; font-size: 13px; color: #233; line-height: 1.4; }
    #cdp-info b { color: #14506b; }
    /* category colors */
    .vis-item.prep   { background: #d6e8fb; border-color: #2b78c4; }
    .vis-item.disc   { background: #d8f0db; border-color: #2e7d32; }
    .vis-item.valid  { background: #fde4cc; border-color: #e07b1a; }
    .vis-item.diss   { background: #e7d9f5; border-color: #7b3fb3; }
    .vis-item.vis-selected { box-shadow: 0 0 0 2px #14506b; }
    /* tooltip + box sizing fixes */
    .vis-item .vis-item-content { white-space: nowrap !important; padding: 4px 8px !important; }
    .vis-item.vis-range, .vis-item.vis-box { min-width: fit-content !important; }
    .vis-tooltip { background: #2c3e50 !important; color: #fff !important; padding: 10px 14px !important;
      border-radius: 8px !important; font-size: 13px !important; max-width: 320px !important;
      line-height: 1.4 !important; white-space: normal !important; box-sizing: border-box !important; }
  `;
  document.head.appendChild(style);

  // ---- DOM scaffold --------------------------------------------------------
  const wrap = document.createElement('div');
  wrap.className = 'cdp-wrap';
  wrap.innerHTML = `
    <div class="cdp-title">Clinical Discovery Pipeline: Graph + AI</div>
    <div class="cdp-banner">
      <span class="cdp-pill trad">Traditional methods: 24-36 months</span>
      <span class="cdp-pill fast">Graph + AI approach: 12-18 months</span>
      <span class="cdp-pill save">~40% reduction in time-to-discovery</span>
    </div>
    <div class="cdp-controls">
      <button id="cdp-fit">Fit All</button>
      <button id="cdp-in">Zoom +</button>
      <button id="cdp-out">Zoom -</button>
      <label>Filter:
        <select id="cdp-filter">
          <option value="all">All stages</option>
          <option value="prep">Data preparation</option>
          <option value="disc">Discovery &amp; analysis</option>
          <option value="valid">Validation</option>
          <option value="diss">Dissemination</option>
        </select>
      </label>
      <span class="cdp-legend">
        <span><i class="cdp-swatch" style="background:#2b78c4"></i>Prep</span>
        <span><i class="cdp-swatch" style="background:#2e7d32"></i>Discovery</span>
        <span><i class="cdp-swatch" style="background:#e07b1a"></i>Validation</span>
        <span><i class="cdp-swatch" style="background:#7b3fb3"></i>Dissemination</span>
      </span>
    </div>
    <div id="cdp-timeline"></div>
    <div id="cdp-info">Click a phase to see a heart-failure research example. Hover to read the activity detail.</div>
  `;
  main.appendChild(wrap);

  // ---- Data ----------------------------------------------------------------
  // Relative schedule mapped onto a synthetic 2024 calendar (week = 7 days,
  // month = 30 days from a Jan 1 base) so vis-timeline gets real Date objects.
  const BASE = new Date(2024, 0, 1).getTime();
  const DAY = 24 * 60 * 60 * 1000;
  const wk = (w) => new Date(BASE + (w - 1) * 7 * DAY);
  const mo = (m) => new Date(BASE + (m - 1) * 30 * DAY);

  const phases = [
    { id: 1, cat: 'prep',  label: 'Data Integration', s: wk(1), e: wk(2),
      detail: 'Aggregate patient data from EHR, claims, pharmacy, and labs into unified patient graphs.',
      example: 'Heart failure: merge 5 years of cardiology visits, BNP labs, and diuretic fills into one patient graph.' },
    { id: 2, cat: 'prep',  label: 'Graph Construction', s: wk(2), e: wk(3),
      detail: 'Create nodes (patients, conditions, medications, procedures) and edges (treatment, diagnosis, outcome).',
      example: 'Model HFrEF vs HFpEF as condition nodes linked to GDMT medication nodes and echo procedure nodes.' },
    { id: 3, cat: 'prep',  label: 'Embedding Generation', s: wk(3), e: wk(4),
      detail: 'Apply graph neural networks to generate patient embeddings that capture clinical trajectories.',
      example: 'GNN embeds each HF patient so similar decompensation trajectories sit close in vector space.' },
    { id: 4, cat: 'disc',  label: 'Cohort Discovery', s: wk(4), e: wk(6),
      detail: 'Use unsupervised clustering to identify patient subgroups with distinct patterns.',
      example: 'Clustering surfaces a subgroup of HF patients with rapid readmission despite optimal medications.' },
    { id: 5, cat: 'disc',  label: 'Pattern Analysis', s: wk(6), e: wk(8),
      detail: 'Traverse graphs within each cohort to find discriminating features and relationships.',
      example: 'Traversal reveals the readmission cluster shares an NSAID + loop-diuretic interaction edge.' },
    { id: 6, cat: 'disc',  label: 'Hypothesis Formation', s: wk(8), e: wk(10),
      detail: 'Generate testable clinical hypotheses based on discovered patterns.',
      example: 'Hypothesis: concurrent NSAID use blunts diuretic response and drives early HF readmission.' },
    { id: 7, cat: 'valid', label: 'Statistical Validation', s: wk(10), e: wk(14),
      detail: 'Validate findings using traditional epidemiological methods and independent datasets.',
      example: 'Confirm the NSAID effect in a separate claims cohort with adjusted hazard ratios.' },
    { id: 8, cat: 'valid', label: 'Prospective Cohort', s: mo(4), e: mo(12),
      detail: 'Test hypotheses prospectively in real-world clinical settings.',
      example: 'Enroll new HF patients and track readmission with vs without NSAID exposure.' },
    { id: 9, cat: 'diss',  label: 'Publication', s: mo(12), e: mo(18),
      detail: 'Disseminate findings through peer-reviewed publications and clinical guidelines.',
      example: 'Publish the NSAID-HF readmission signal and propose a deprescribing guideline.' }
  ];

  const items = phases.map(p => ({
    id: p.id,
    content: p.label,
    start: p.s,
    end: p.e,
    className: p.cat,
    title: '<b>' + p.label + '</b><br>' + p.detail
  }));

  const container = document.getElementById('cdp-timeline');
  const dataset = new vis.DataSet(items);
  const options = {
    width: '100%',
    height: '380px',
    margin: { item: { horizontal: 95, vertical: 12 }, axis: 30 },
    orientation: 'top',
    stack: true,
    selectable: true,
    showCurrentTime: false,
    moveable: true,
    zoomable: false,
    align: 'center',
    tooltip: { followMouse: true },
    min: new Date(2023, 9, 1),
    max: new Date(2026, 0, 1)
  };
  const timeline = new vis.Timeline(container, dataset, options);

  function fitAll() {
    const ts = items.flatMap(i => [i.start.getTime(), i.end.getTime()]);
    const pad = 20 * DAY;
    timeline.setWindow(new Date(Math.min(...ts) - pad), new Date(Math.max(...ts) + pad), { animation: false });
  }
  fitAll();

  // ---- Interaction ---------------------------------------------------------
  const info = document.getElementById('cdp-info');
  timeline.on('select', function (props) {
    if (!props.items.length) return;
    const p = phases.find(x => x.id === props.items[0]);
    if (p) info.innerHTML = '<b>Phase ' + p.id + ' &mdash; ' + p.label + '.</b> ' +
      p.detail + '<br><b>Heart-failure example:</b> ' + p.example;
  });

  document.getElementById('cdp-fit').onclick = fitAll;
  document.getElementById('cdp-in').onclick = () => timeline.zoomIn(0.5);
  document.getElementById('cdp-out').onclick = () => timeline.zoomOut(0.5);
  document.getElementById('cdp-filter').onchange = function () {
    const cat = this.value;
    dataset.clear();
    dataset.add(cat === 'all' ? items : items.filter(i => i.className === cat));
    fitAll();
  };

  // ---- Don't hijack vertical page scroll -----------------------------------
  container.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) {
      e.stopImmediatePropagation(); // block vis; let the page scroll
    } else {
      e.preventDefault();
      const w = timeline.getWindow();
      const shift = (e.deltaX / container.clientWidth) * (w.end - w.start);
      timeline.setWindow(new Date(w.start.valueOf() + shift), new Date(w.end.valueOf() + shift), { animation: false });
    }
  }, true);
});
