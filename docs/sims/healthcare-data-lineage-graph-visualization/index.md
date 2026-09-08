---
title: Healthcare Data Lineage Graph Visualization
description: Interactive vis-network MicroSim for healthcare data lineage graph visualization.
image: /sims/healthcare-data-lineage-graph-visualization/healthcare-data-lineage-graph-visualization.png
og:image: /sims/healthcare-data-lineage-graph-visualization/healthcare-data-lineage-graph-visualization.png
twitter:image: /sims/healthcare-data-lineage-graph-visualization/healthcare-data-lineage-graph-visualization.png
social:
   cards: false
quality_score: 75
---

# Healthcare Data Lineage Graph Visualization

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Healthcare Data Lineage Graph Visualization MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This graph traces data lineage through a healthcare analytics system, flowing left to right through five stages: source systems (Epic EHR, lab, pharmacy), the raw tables they populate, the transformations that clean and resolve them, the graph entities they become, and the analytics that consume them. Lineage edges let you answer "where did this number come from?" — tracing any dashboard metric back through its transformations to the originating source system.

## How to Use

Read the flow left to right through the five numbered stages in the legend, following the arrows from a source system to the dashboard or model it ultimately feeds. Trace a single lineage path — for example, Epic EHR → PATIENT_MASTER → Entity Resolution → Patient → Risk Model — to see exactly which systems and transformations a downstream analytic depends on. Drag nodes and use the navigation buttons to explore.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-data-lineage-graph-visualization/main.html"
        height="450px"
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
