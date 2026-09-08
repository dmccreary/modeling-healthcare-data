---
title: "Data Integration Flow Interactive Infographic"
description: "Interactive p5.js MicroSim for data integration flow interactive infographic."
image: /sims/data-integration-flow-infographic/data-integration-flow-infographic.png
og:image: /sims/data-integration-flow-infographic/data-integration-flow-infographic.png
twitter:image: /sims/data-integration-flow-infographic/data-integration-flow-infographic.png
social:
   cards: false
quality_score: 70
---

# Data Integration Flow Interactive Infographic

<iframe src="main.html" height="636" width="100%" scrolling="no"></iframe>

[Run the Data Integration Flow Interactive Infographic MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This infographic shows how a central healthcare knowledge graph is fed by eight source systems, each using a different integration pattern suited to its data and latency needs. Real-time clinical events arrive by change-data-capture and Kafka streams, claims arrive in nightly batches, pharmacy and reference data come through APIs, lab results via HL7 messages, FHIR resources through federated queries, and social-services data by manual upload. The variety illustrates that one graph typically integrates many systems at many speeds.

## How to Use

Hover over any source system to see what data it provides, how often it updates, and which integration pattern it uses; the connection and its label highlight while the others dim. Compare the patterns — real-time streams (EHR CDC, ADT Kafka) versus the nightly claims batch versus on-demand API and federated queries — to understand the trade-offs in latency and freshness across a heterogeneous healthcare data landscape.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/data-integration-flow-infographic/main.html"
        height="636px"
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
