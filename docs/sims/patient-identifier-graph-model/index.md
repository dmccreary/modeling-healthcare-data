---
title: Patient Identifier Graph Model
description: Interactive vis-network MicroSim for patient identifier graph model.
image: /sims/patient-identifier-graph-model/patient-identifier-graph-model.png
og:image: /sims/patient-identifier-graph-model/patient-identifier-graph-model.png
twitter:image: /sims/patient-identifier-graph-model/patient-identifier-graph-model.png
social:
   cards: false
quality_score: 75
---

# Patient Identifier Graph Model

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Patient Identifier Graph Model MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This model shows how a master patient index links the many identifiers a single person accumulates across healthcare systems. One patient record connects via HAS_IDENTIFIER to a hospital MRN, a second hospital's MRN, a Social Security number, and an insurance member ID; each identifier in turn is ISSUED_BY a different identity system. Resolving all these identifiers to one patient — record linkage — is a classic graph problem that prevents duplicate and fragmented records.

## How to Use

Start at the central patient node and follow the HAS_IDENTIFIER edges out to each identifier, then the ISSUED_BY edges to the system that assigned it. Notice that the same person holds two different medical-record numbers from two hospitals — the kind of fragmentation a master patient index must reconcile. Drag nodes and use the navigation buttons to rearrange the radial layout.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/patient-identifier-graph-model/main.html"
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
