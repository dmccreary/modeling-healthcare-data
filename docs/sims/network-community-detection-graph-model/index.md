---
title: Network Community Detection Interactive Graph Model
description: Interactive vis-network MicroSim for network community detection interactive graph model.
image: /sims/network-community-detection-graph-model/network-community-detection-graph-model.png
og:image: /sims/network-community-detection-graph-model/network-community-detection-graph-model.png
twitter:image: /sims/network-community-detection-graph-model/network-community-detection-graph-model.png
social:
   cards: false
quality_score: 0
---

# Network Community Detection Interactive Graph Model

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Network Community Detection Interactive Graph Model MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This graph illustrates how community-detection algorithms like Louvain partition a healthcare network into meaningful groups. The network contains patients, providers, diagnoses, and medications (distinguished by shape) that cluster into three disease cohorts — cardiac, diabetes, and renal — because connections within a cohort are dense while connections between cohorts are sparse. The few cross-cohort edges represent comorbid patients who bridge two communities.

## How to Use

With "Color by community" on, each node is colored by the cohort the algorithm assigns it to; uncheck the box to see the same network without coloring, as the algorithm first sees it — the communities are not obvious until detected. Trace the sparse bridge edges (a patient with both diabetes and kidney disease) that link otherwise-separate cohorts. Drag nodes and use the navigation buttons to explore.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/network-community-detection-graph-model/main.html"
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
