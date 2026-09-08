---
title: "Basic Healthcare Graph Model"
description: "Interactive vis-network MicroSim for basic healthcare graph model."
image: /sims/basic-healthcare-graph-model-diagram/basic-healthcare-graph-model-diagram.png
og:image: /sims/basic-healthcare-graph-model-diagram/basic-healthcare-graph-model-diagram.png
twitter:image: /sims/basic-healthcare-graph-model-diagram/basic-healthcare-graph-model-diagram.png
social:
   cards: false
quality_score: 75
---

# Basic Healthcare Graph Model

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Basic Healthcare Graph Model MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This is the simplest possible illustration of a graph: five nodes and the edges between them. Each node is an entity — a patient, a provider, a diagnosis, a medication, and a facility — and each labeled arrow is a relationship: the patient is TREATED_BY the provider, HAS_DIAGNOSIS of type 2 diabetes, TAKES Metformin, and VISITS the hospital where the provider WORKS_AT. These two building blocks, nodes and edges, are all a graph database needs to represent richly-connected healthcare data.

## How to Use

Identify each colored node by the legend, then read the labeled arrows to see the relationships between them — together the nodes and edges tell a small care story. This node-and-edge structure is the foundation every other graph in this book builds on. Drag the nodes to rearrange them and use the navigation buttons to pan and zoom.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/basic-healthcare-graph-model-diagram/main.html"
        height="488px"
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
