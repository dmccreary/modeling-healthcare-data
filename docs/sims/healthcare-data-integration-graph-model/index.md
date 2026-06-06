---
title: Healthcare Data Integration Graph Model
description: Interactive vis-network MicroSim for healthcare data integration graph model.
image: /sims/healthcare-data-integration-graph-model/healthcare-data-integration-graph-model.png
og:image: /sims/healthcare-data-integration-graph-model/healthcare-data-integration-graph-model.png
twitter:image: /sims/healthcare-data-integration-graph-model/healthcare-data-integration-graph-model.png
social:
   cards: false
quality_score: 0
---

# Healthcare Data Integration Graph Model

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Healthcare Data Integration Graph Model MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This graph shows how a graph database integrates fragmented healthcare data into one unified patient view. A single master patient record HAS_ENCOUNTER for office visits, ED visits, and hospitalizations; each encounter is SOURCED_FROM a different system (Epic EHR, claims database, lab interface, pharmacy), and encounters carry diagnoses. Because every source attaches to the same patient node, a query can answer questions that span EHR, claims, lab, and pharmacy data at once.

## How to Use

Follow the HAS_ENCOUNTER edges from the central master patient record to each encounter, then the SOURCED_FROM edges to the system that supplied it — notice that visits, claims, labs, and pharmacy data all converge on one patient. This convergence is the value of graph-based integration: instead of siloed records, every source contributes to a single connected view. Drag nodes and use the navigation buttons to explore.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-data-integration-graph-model/main.html"
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
