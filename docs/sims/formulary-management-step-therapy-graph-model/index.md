---
title: Formulary Management and Step Therapy Graph Model
description: Interactive vis-network MicroSim for formulary management and step therapy graph model.
image: /sims/formulary-management-step-therapy-graph-model/formulary-management-step-therapy-graph-model.png
og:image: /sims/formulary-management-step-therapy-graph-model/formulary-management-step-therapy-graph-model.png
twitter:image: /sims/formulary-management-step-therapy-graph-model/formulary-management-step-therapy-graph-model.png
social:
   cards: false
quality_score: 75
---

# Formulary Management and Step Therapy Graph Model

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Formulary Management and Step Therapy Graph Model MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This graph models how a pharmacy benefit manages drugs. A benefit plan USES_FORMULARY, the formulary INCLUDES drugs at various tiers, and every drug is a MEMBER_OF a therapeutic class. Two special relationships drive utilization management: STEP_THERAPY_BEFORE edges require trying a lower-cost generic before a brand drug is covered, and ALTERNATIVE_TO edges link interchangeable therapeutic options. This structure is what a pharmacy claim is adjudicated against in real time.

## How to Use

Start at the plan, follow USES_FORMULARY to the formulary and INCLUDES to the covered drugs, and read each drug's tier. Trace the red STEP_THERAPY_BEFORE edges to see that the generic (Tier 1) atorvastatin must be tried before the brand (Tier 3) Lipitor is covered, and follow MEMBER_OF edges to see the drugs grouped into the statin class. Drag nodes and use the navigation buttons to explore.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/formulary-management-step-therapy-graph-model/main.html"
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
