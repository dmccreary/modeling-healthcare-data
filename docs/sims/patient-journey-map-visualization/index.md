---
title: Patient Journey Map Interactive Visualization
description: Interactive p5.js MicroSim for patient journey map interactive visualization.
image: /sims/patient-journey-map-visualization/patient-journey-map-visualization.png
og:image: /sims/patient-journey-map-visualization/patient-journey-map-visualization.png
twitter:image: /sims/patient-journey-map-visualization/patient-journey-map-visualization.png
social:
   cards: false
quality_score: 0
---

# Patient Journey Map Interactive Visualization

<iframe src="main.html" height="578" width="100%" scrolling="no"></iframe>

[Run the Patient Journey Map Interactive Visualization MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This timeline maps a single chronic-disease patient's 24-month healthcare journey across 13 encounters, 6 providers, and 5 facilities. Each encounter is a circle placed at its time and colored by type — office visit (blue), telehealth (green), ER visit (yellow), and hospitalization (red) — and sized by intensity, so the costly ER visit and hospitalization stand out. The connecting line traces the patient's path, illustrating the multi-provider, multi-facility, temporal complexity that graph databases are designed to model and query efficiently.

## How to Use

Follow the connecting line left to right to trace the patient's two-year journey, and read the header for the overall complexity (encounters, providers, facilities). Hover any encounter to see its type, month, provider, facility, and clinical note — for example the month-11 hospitalization for a CHF exacerbation that triggers cardiology follow-up and care-management outreach. This is the kind of cross-encounter pattern a graph query can reconstruct in a single traversal.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/patient-journey-map-visualization/main.html"
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
