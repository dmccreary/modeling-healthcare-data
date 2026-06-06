---
title: Patient Clinical Context Subgraph Visualization
description: Interactive vis-network MicroSim for patient clinical context subgraph visualization.
image: /sims/patient-clinical-context-subgraph-visualization/patient-clinical-context-subgraph-visualization.png
og:image: /sims/patient-clinical-context-subgraph-visualization/patient-clinical-context-subgraph-visualization.png
twitter:image: /sims/patient-clinical-context-subgraph-visualization/patient-clinical-context-subgraph-visualization.png
social:
   cards: false
quality_score: 0
---

# Patient Clinical Context Subgraph Visualization

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Patient Clinical Context Subgraph Visualization MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This graph shows the clinical context subgraph around a single patient — the connected neighborhood of everything clinically relevant to her. Sarah Johnson links to her diagnoses (HAS_DIAGNOSIS), the medications she takes (TAKES, with TREATS edges back to the conditions they address), the providers who see her (SEEN_BY), and her recent encounters (HAD_ENCOUNTER). Returning this subgraph in one query is how a graph database gives a clinician or an AI system full context on a patient.

## How to Use

Read the spokes from the central patient by color: red diagnoses, green medications, purple providers, and orange encounters. Follow the dashed TREATS edges to see which medication addresses which diagnosis (Metformin → diabetes, Lisinopril → hypertension, Atorvastatin → hyperlipidemia). This connected context is exactly what powers retrieval-augmented clinical decision support. Drag nodes and use the navigation buttons to explore.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/patient-clinical-context-subgraph-visualization/main.html"
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
