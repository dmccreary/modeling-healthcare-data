---
title: Explainable AI Recommendation Workflow
description: Interactive Mermaid MicroSim for explainable ai recommendation workflow.
image: /sims/explainable-ai-recommendation-workflow/explainable-ai-recommendation-workflow.png
og:image: /sims/explainable-ai-recommendation-workflow/explainable-ai-recommendation-workflow.png
twitter:image: /sims/explainable-ai-recommendation-workflow/explainable-ai-recommendation-workflow.png
social:
   cards: false
quality_score: 75
---

# Explainable AI Recommendation Workflow

<iframe src="main.html" height="991" width="100%" scrolling="no"></iframe>

[Run the Explainable AI Recommendation Workflow MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This flowchart shows how a graph-based clinical decision support system produces an explainable medication recommendation. Two input streams — the patient's subgraph (blue) and the clinical knowledge graph (green) — converge in an inference engine (orange) that applies decision rules and scores options. When confidence is high, the system builds an explanation graph and generates both clinician and patient explanations (cream), displays the recommendation with its reasoning in the EHR, and logs the access (purple). The clinician's accept/reject decision feeds back to improve future recommendations.

## How to Use

Hover over any step to read what it does; the colors mark the five layers (patient data, clinical knowledge, inference, explanation, presentation). Follow the two input columns down to where they merge, then the "Yes" path through the explanation and presentation steps to the clinician's decision — note how a low-confidence case is instead flagged for human review.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/explainable-ai-recommendation-workflow/main.html"
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
