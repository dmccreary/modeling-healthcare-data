---
title: Anomaly Score Threshold Explorer MicroSim
description: Interactive p5.js MicroSim for anomaly score threshold explorer microsim.
image: /sims/anomaly-score-threshold-explorer/anomaly-score-threshold-explorer.png
og:image: /sims/anomaly-score-threshold-explorer/anomaly-score-threshold-explorer.png
twitter:image: /sims/anomaly-score-threshold-explorer/anomaly-score-threshold-explorer.png
social:
   cards: false
quality_score: 70
---

# Anomaly Score Threshold Explorer MicroSim

<iframe src="main.html" height="603" width="100%" scrolling="no"></iframe>

[Run the Anomaly Score Threshold Explorer MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim turns fraud-detection threshold setting into a concrete trade-off. About 120 providers are plotted by their graph anomaly score, with true fraudsters (red) and legitimate providers (blue) overlapping in a contested middle band. Moving the threshold flags everyone to its right for investigation, and the panel updates a confusion matrix, precision, recall, and F1, the flagged count against weekly investigator capacity, and a total expected cost that combines the cost of missed fraud with the cost of investigations — revealing that an interior threshold minimizes total cost.

## How to Use

Drag the threshold line (or use the Threshold slider) and watch recall and false positives trade off in real time. Lower it to catch more fraud at the price of more false-positive investigations and a capacity backlog; raise it to do the reverse. Adjust investigator capacity and the cost of missed fraud to see how the cost-minimizing threshold shifts, and turn off ground-truth colors to reason about a threshold you cannot perfectly validate, as in real fraud operations.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/anomaly-score-threshold-explorer/main.html"
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
