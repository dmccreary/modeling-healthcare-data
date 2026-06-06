---
title: Medical Knowledge Graph Example
description: Interactive vis-network MicroSim for medical knowledge graph example.
image: /sims/medical-knowledge-graph/medical-knowledge-graph.png
og:image: /sims/medical-knowledge-graph/medical-knowledge-graph.png
twitter:image: /sims/medical-knowledge-graph/medical-knowledge-graph.png
social:
   cards: false
quality_score: 0
---

# Medical Knowledge Graph Example

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Medical Knowledge Graph Example MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This interactive knowledge graph shows how clinical entities connect into a queryable structure. Diseases, medications, symptoms, lab tests, and patient conditions are drawn as distinct node shapes and colors, joined by typed relationships: medications TREAT diseases, diseases CAUSE symptoms, lab tests MEASURE diseases, medications are CONTRAINDICATED_IN certain patient conditions, and medications INTERACT_WITH each other. Together these labeled relationships are exactly what a graph query traverses to answer clinical questions.

## How to Use

Read each node's shape and color against the legend, and follow the labeled, color-coded edges to see how the entities relate — for example, Metformin TREATS Type 2 Diabetes but is CONTRAINDICATED_IN severe renal impairment and pregnancy. Drag nodes to untangle the layout, and use the navigation buttons at the corners to pan and zoom; the graph is frozen after its initial layout so your rearrangements stay put.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/medical-knowledge-graph/main.html"
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
