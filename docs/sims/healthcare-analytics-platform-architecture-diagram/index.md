---
title: Healthcare Analytics Platform Architecture Diagram
description: Interactive p5.js MicroSim for healthcare analytics platform architecture diagram.
image: /sims/healthcare-analytics-platform-architecture-diagram/healthcare-analytics-platform-architecture-diagram.png
og:image: /sims/healthcare-analytics-platform-architecture-diagram/healthcare-analytics-platform-architecture-diagram.png
twitter:image: /sims/healthcare-analytics-platform-architecture-diagram/healthcare-analytics-platform-architecture-diagram.png
social:
   cards: false
quality_score: 0
---

# Healthcare Analytics Platform Architecture Diagram

<iframe src="main.html" height="618" width="100%" scrolling="no"></iframe>

[Run the Healthcare Analytics Platform Architecture Diagram MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This diagram lays out the multi-layer architecture of a graph-based healthcare analytics platform. Data flows up from source systems (Epic EHR, claims, pharmacy, lab) through a data-ingestion layer into the graph database core — organized into patient, provider, and payer subgraphs — and then up into an analytics and AI layer (graph analytics, vector store, LLM integration, ML models) and a presentation layer of dashboards and APIs. A governance framework (RBAC, audit logging, lineage, HIPAA compliance) spans every layer.

## How to Use

Read the diagram from the bottom up to follow how raw source data becomes connectors, then graph subgraphs, then analytics, and finally dashboards and APIs that clinicians, administrators, and analysts use. Note that the governance framework on the right is not a single layer but a vertical concern that applies to all of them — access control, auditing, lineage, and compliance are enforced everywhere data moves.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-analytics-platform-architecture-diagram/main.html"
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
