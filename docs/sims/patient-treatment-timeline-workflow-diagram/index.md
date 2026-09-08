---
title: "Patient Treatment Timeline Workflow Diagram"
description: "Interactive Mermaid MicroSim for patient treatment timeline workflow diagram."
image: /sims/patient-treatment-timeline-workflow-diagram/patient-treatment-timeline-workflow-diagram.png
og:image: /sims/patient-treatment-timeline-workflow-diagram/patient-treatment-timeline-workflow-diagram.png
twitter:image: /sims/patient-treatment-timeline-workflow-diagram/patient-treatment-timeline-workflow-diagram.png
social:
   cards: false
quality_score: 75
---

# Patient Treatment Timeline Workflow Diagram

<iframe src="main.html" height="613" width="100%" scrolling="no"></iframe>

[Run the Patient Treatment Timeline Workflow Diagram MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This timeline traces a 12-month Type 2 Diabetes treatment journey — from symptom onset and diagnosis, through medication starts and intensifications, to reaching the HbA1c goal. Each timepoint is colored by phase, and the hover detail shows the patient's status, labs, treatment changes, and the exact graph query that records the event. Because every diagnosis, prescription, and lab result carries a date property, a single graph traversal can reconstruct the entire journey.

## How to Use

Hover over any month to read the clinical detail and the Cypher pattern that stores it in the graph. Follow the chain from Month 0 to Month 12 to see how the patient moves through diagnosis (blue), initial treatment (orange), dose adjustments (yellow), stabilization (green), and goal achievement (dark green).

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/patient-treatment-timeline-workflow-diagram/main.html"
        height="613px"
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
