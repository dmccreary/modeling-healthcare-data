---
title: "Directed Acyclic Graph Example: Care Pathway"
description: "Interactive p5.js MicroSim for directed acyclic graph example: care pathway."
image: /sims/directed-acyclic-graph-care-pathway/directed-acyclic-graph-care-pathway.png
og:image: /sims/directed-acyclic-graph-care-pathway/directed-acyclic-graph-care-pathway.png
twitter:image: /sims/directed-acyclic-graph-care-pathway/directed-acyclic-graph-care-pathway.png
social:
   cards: false
quality_score: 70
---

# Directed Acyclic Graph Example: Care Pathway

<iframe src="main.html" height="498" width="100%" scrolling="no"></iframe>

[Run the Directed Acyclic Graph Example: Care Pathway MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This diagram shows a clinical care pathway modeled as a directed acyclic graph (DAG): eight stages, from patient admission through discharge planning, connected by directed arrows that always move forward in time. The single dotted edge — re-testing when results are inconclusive — loops back only to diagnostics, never to admission, illustrating the defining DAG property that a patient does not cycle back to an earlier stage within one encounter.

## How to Use

Follow the solid arrows through the eight numbered stages to trace the normal forward flow of an encounter. Note the dotted red "re-test if needed" edge, which is the one conditional path, and read the annotation explaining why the pathway is acyclic — a structure that lets graph databases reason about ordering and progress without infinite loops.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/directed-acyclic-graph-care-pathway/main.html"
        height="498px"
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
