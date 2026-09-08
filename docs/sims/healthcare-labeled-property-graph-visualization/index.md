---
title: Healthcare Labeled Property Graph Visualization
description: Interactive vis-network MicroSim for healthcare labeled property graph visualization.
image: /sims/healthcare-labeled-property-graph-visualization/healthcare-labeled-property-graph-visualization.png
og:image: /sims/healthcare-labeled-property-graph-visualization/healthcare-labeled-property-graph-visualization.png
twitter:image: /sims/healthcare-labeled-property-graph-visualization/healthcare-labeled-property-graph-visualization.png
social:
   cards: false
quality_score: 75
---

# Healthcare Labeled Property Graph Visualization

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Healthcare Labeled Property Graph Visualization MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This labeled property graph captures one patient's care as typed, property-rich nodes and relationships. Sarah Chen connects to her diagnoses (HAS_CONDITION), her providers (TREATED_BY), the procedures she underwent, and through her providers to the medications prescribed and the facilities where care happened. Each node carries properties (codes, names, classes), and each edge is a named relationship — the labeled-property-graph model that lets a single query answer questions spanning conditions, providers, drugs, and places.

## How to Use

Follow the colored, labeled edges to reconstruct Sarah's care story: she HAS_CONDITION type 2 diabetes, is TREATED_BY Dr. Martinez who PRESCRIBED Metformin, and UNDERWENT an HbA1c test. Read each node against the legend to identify its type, and note how providers link both to medications and to the facilities they work at. Drag nodes and use the navigation buttons to explore.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-labeled-property-graph-visualization/main.html"
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
