---
title: Medication Safety Network Interactive Infographic
description: Interactive p5.js MicroSim for medication safety network interactive infographic.
image: /sims/medication-safety-network-infographic/medication-safety-network-infographic.png
og:image: /sims/medication-safety-network-infographic/medication-safety-network-infographic.png
twitter:image: /sims/medication-safety-network-infographic/medication-safety-network-infographic.png
social:
   cards: false
quality_score: 70
---

# Medication Safety Network Interactive Infographic

<iframe src="main.html" height="638" width="100%" scrolling="no"></iframe>

[Run the Medication Safety Network Interactive Infographic MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This network shows how a graph database surfaces medication safety issues by traversing the relationships among a patient's active medications, drug-drug interactions, allergies, and existing conditions. Red lines mark drug-drug interactions (here the Warfarin + Aspirin + Ibuprofen triple raises bleeding risk), blue dotted lines mark contraindications (NSAIDs and metformin against stage-3a kidney disease), and green lines mark appropriate indications (Warfarin for atrial fibrillation, Metformin for diabetes). The central safety indicator flags that a high-risk combination is present.

## How to Use

Read the four groups around the patient — medications on the left, conditions on the right, and allergies along the bottom — and follow the colored lines to see which relationships are dangerous (red, blue) versus appropriate (green). Click a medication to highlight just its relationships and dim the rest, making it easy to isolate a single drug's interactions, contraindications, and indications; click the background to clear the selection.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/medication-safety-network-infographic/main.html"
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
