---
title: Symptom-Disease Diagnostic Network
description: Interactive vis-network MicroSim for symptom-disease diagnostic network.
image: /sims/symptom-disease-diagnostic-network/symptom-disease-diagnostic-network.png
og:image: /sims/symptom-disease-diagnostic-network/symptom-disease-diagnostic-network.png
twitter:image: /sims/symptom-disease-diagnostic-network/symptom-disease-diagnostic-network.png
social:
   cards: false
quality_score: 0
---

# Symptom-Disease Diagnostic Network

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Symptom-Disease Diagnostic Network MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This graph shows the many-to-many relationships at the heart of differential diagnosis. A patient reports specific symptom instances (with severity and duration), each an instance of a general symptom type, and each symptom type is associated with several candidate diseases at different probabilities. Because one symptom points to many diseases and one disease produces many symptoms, the pattern of symptoms — not any single one — narrows the diagnosis.

## How to Use

Trace the path from Patient A through a reported symptom instance, to its symptom type, to the diseases it suggests, reading the probability labels on the disease edges. Notice how chest pain, dyspnea, and fatigue together point most strongly to MI even though each alone is non-specific — the convergence of multiple symptom edges on one disease is what a graph query computes to rank a differential. Drag nodes and use the navigation buttons to explore.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/symptom-disease-diagnostic-network/main.html"
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
