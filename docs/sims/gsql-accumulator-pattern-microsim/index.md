---
title: "GSQL Accumulator Pattern MicroSim"
description: "Interactive p5.js MicroSim for gsql accumulator pattern microsim."
image: /sims/gsql-accumulator-pattern-microsim/gsql-accumulator-pattern-microsim.png
og:image: /sims/gsql-accumulator-pattern-microsim/gsql-accumulator-pattern-microsim.png
twitter:image: /sims/gsql-accumulator-pattern-microsim/gsql-accumulator-pattern-microsim.png
social:
   cards: false
quality_score: 70
---

# GSQL Accumulator Pattern MicroSim

<iframe src="main.html" height="638" width="100%" scrolling="no"></iframe>

[Run the GSQL Accumulator Pattern MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim shows how a GSQL accumulator aggregates data during a graph traversal in real time — the core pattern behind TigerGraph analytics. A patient is connected to eight treatment nodes (each with a severity weight), and some treatments have complication nodes with their own weights. As the traversal visits each node, the selected accumulator updates: SumAccum adds the weights into a running risk score, MaxAccum keeps the largest, AvgAccum tracks the mean, and SetAccum collects the distinct items.

## How to Use

Pick an accumulator type, set the animation speed, and press Start traversal to watch the patient's risk score build up as each treatment and complication is visited; the panel shows the running value, treatments visited, average severity, and the accumulated terms. Switch accumulators and re-run to compare how Sum, Max, Avg, and Set summarize the same traversal differently, and toggle the highlight to see the visit order.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/gsql-accumulator-pattern-microsim/main.html"
        height="638px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Geometry)

### Duration
10-15 minutes

### Prerequisites
TODO: List prerequisites.

### Activities

1. **Exploration** (5 min): TODO
2. **Guided Practice** (5 min): TODO
3. **Assessment** (5 min): TODO

### Assessment
TODO: List assessment criteria.

## References

1. TODO: Add references.
