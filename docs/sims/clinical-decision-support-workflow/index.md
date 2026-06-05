---
title: Clinical Decision Support Workflow
description: Interactive Mermaid MicroSim for clinical decision support workflow.
image: /sims/clinical-decision-support-workflow/clinical-decision-support-workflow.png
og:image: /sims/clinical-decision-support-workflow/clinical-decision-support-workflow.png
twitter:image: /sims/clinical-decision-support-workflow/clinical-decision-support-workflow.png
social:
   cards: false
quality_score: 0
---

# Clinical Decision Support Workflow

<iframe src="main.html" height="1262" width="100%" scrolling="no"></iframe>

[Run the Clinical Decision Support Workflow MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This interactive flowchart shows how a graph-based clinical decision support
(CDS) system handles a new medication order. The order is checked against the
patient's full graph context and a clinical knowledge graph, and any safety
issue is scored for clinical significance so that only novel, high-severity
problems interrupt the clinician — context-aware filtering that reduces alert
fatigue by an estimated 60–80%. Steps are color-coded by lane: green for data
retrieval, yellow for decisions, red for the safety alert, blue for clinician
actions, and purple for the feedback/learning steps.

## How to Use

Hover over any step in the diagram to read what the CDS system does at that
point in the detail panel on the right. Follow the two "No" branches to see when
an order is silently approved or merely logged, and the "Yes" path to see how a
contextualized alert is generated, reviewed, accepted or overridden, and fed
back into the model.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/clinical-decision-support-workflow/main.html"
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
