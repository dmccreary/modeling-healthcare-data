---
title: Healthcare Graph Pattern Examples
description: Interactive p5.js MicroSim for healthcare graph pattern examples.
image: /sims/healthcare-graph-pattern-examples/healthcare-graph-pattern-examples.png
og:image: /sims/healthcare-graph-pattern-examples/healthcare-graph-pattern-examples.png
twitter:image: /sims/healthcare-graph-pattern-examples/healthcare-graph-pattern-examples.png
social:
   cards: false
quality_score: 70
---

# Healthcare Graph Pattern Examples

<iframe src="main.html" height="546" width="100%" scrolling="no"></iframe>

[Run the Healthcare Graph Pattern Examples MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This diagram shows three common patterns that healthcare graph queries match. The first is a patient-diagnosis-prescription chain (Patient → HAS_DIAGNOSIS → Diabetes → PRESCRIBED → Metformin) with a date constraint on the prescription edge. The second is a provider referral network (PCP → REFERS_TO → Specialist → REFERS_TO → Laboratory) with dotted reverse arrows showing referrals can flow both ways. The third is a temporal treatment pathway (Patient → Tx1 → NEXT → Tx2 → Outcome) ordered in time. Node shapes and colors distinguish the entity types.

## How to Use

Compare the three patterns to see how different clinical questions map to different graph shapes — a linear diagnosis-to-treatment chain, a branching referral network, and an ordered temporal pathway. Note the relationship names on the arrows (HAS_DIAGNOSIS, PRESCRIBED, REFERS_TO, NEXT) and the property constraint on the prescription edge; these are exactly what a Cypher MATCH clause specifies to find the pattern in a real graph.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-graph-pattern-examples/main.html"
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
