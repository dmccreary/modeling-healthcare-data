---
title: Healthcare Fraud Scheme Network Visualization
description: Interactive vis-network MicroSim for healthcare fraud scheme network visualization.
image: /sims/healthcare-fraud-scheme-network-visualization/healthcare-fraud-scheme-network-visualization.png
og:image: /sims/healthcare-fraud-scheme-network-visualization/healthcare-fraud-scheme-network-visualization.png
twitter:image: /sims/healthcare-fraud-scheme-network-visualization/healthcare-fraud-scheme-network-visualization.png
social:
   cards: false
quality_score: 0
---

# Healthcare Fraud Scheme Network Visualization

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Healthcare Fraud Scheme Network Visualization MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This graph shows how a healthcare fraud scheme appears as a distinctive network structure. The flagged provider, Dr. Mills (large red node, sized by billing volume), submits an unusually high number of claims that all bill the same high-value emergency procedure (99285) for only two patients, coding the same diagnosis — a dense star that is the signature of upcoding and phantom billing. Beside it, a normal provider submits a single routine claim, showing how different legitimate and fraudulent structures look.

## How to Use

Compare the two provider subgraphs. Trace Dr. Mills's claims and notice that all four BILL the same high-value procedure for the same two patients — a pattern no honest practice produces — while Dr. Goodman's single routine claim looks ordinary. This is the kind of structural anomaly graph analytics surfaces automatically by scoring provider subgraphs. Drag nodes and use the navigation buttons to explore.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-fraud-scheme-network-visualization/main.html"
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
