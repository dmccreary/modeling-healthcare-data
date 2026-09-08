---
title: "Graph-Based Fraud Detection Algorithm Workflow"
description: "Interactive Mermaid MicroSim for graph-based fraud detection algorithm workflow."
image: /sims/graph-based-fraud-detection-algorithm-workflow/graph-based-fraud-detection-algorithm-workflow.png
og:image: /sims/graph-based-fraud-detection-algorithm-workflow/graph-based-fraud-detection-algorithm-workflow.png
twitter:image: /sims/graph-based-fraud-detection-algorithm-workflow/graph-based-fraud-detection-algorithm-workflow.png
social:
   cards: false
quality_score: 75
---

# Graph-Based Fraud Detection Algorithm Workflow

<iframe src="main.html" height="582" width="100%" scrolling="no"></iframe>

[Run the Graph-Based Fraud Detection Algorithm Workflow MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This flowchart shows how graph algorithms combine to detect healthcare fraud. After the claims graph is built, five detection algorithms run in parallel (green) — statistical outliers, Louvain community detection, referral-network centrality and cycles, temporal change-points, and claim similarity — and their results merge into a weighted composite risk score. Business rules and case generation feed a risk-tier decision that routes providers to human investigation, enhanced monitoring, or standard processing, and confirmed outcomes feed back to retrain the models in a continuous loop.

## How to Use

Hover over any step to see what it does; the five green nodes are the parallel detection algorithms. Follow the fan-out from "Build Healthcare Graph" into the algorithms and back into "Combine Risk Scores", then trace the three risk tiers and the investigation outcomes down to "Update Detection Models", which closes the daily feedback loop.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/graph-based-fraud-detection-algorithm-workflow/main.html"
        height="582px"
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
