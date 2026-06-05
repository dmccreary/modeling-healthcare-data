---
title: Claims Lifecycle Workflow with Graph Database Integration
description: Interactive Mermaid MicroSim for claims lifecycle workflow with graph database integration.
image: /sims/claims-lifecycle-workflow-graph-database-integration/claims-lifecycle-workflow-graph-database-integration.png
og:image: /sims/claims-lifecycle-workflow-graph-database-integration/claims-lifecycle-workflow-graph-database-integration.png
twitter:image: /sims/claims-lifecycle-workflow-graph-database-integration/claims-lifecycle-workflow-graph-database-integration.png
social:
   cards: false
quality_score: 0
---

# Claims Lifecycle Workflow with Graph Database Integration

<iframe src="main.html" height="1716" width="100%" scrolling="no"></iframe>

[Run the Claims Lifecycle Workflow with Graph Database Integration MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This flowchart follows a healthcare claim from submission through adjudication to payment, showing where graph-database traversals (green) sharpen each decision. Eligibility, network and coverage, prior authorization, and year-to-date accumulations are all answered by graph queries, and every gate that fails routes the claim to a single denied outcome with a specific reason. The clean path ends by writing the paid claim back into the graph for analytics.

## How to Use

Hover over any step to read what it does; green steps are graph-database operations. Follow the right-hand "happy path" down through the adjudication gates to payment, and trace the left-hand edges to see how an invalid format, ineligible member, non-covered service, missing prior authorization, or failed edit each ends in denial.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/claims-lifecycle-workflow-graph-database-integration/main.html"
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
