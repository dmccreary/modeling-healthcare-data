---
title: Insurance Policy and Benefit Plan Graph Model
description: Interactive vis-network MicroSim for insurance policy and benefit plan graph model.
image: /sims/insurance-policy-benefit-plan-graph-model/insurance-policy-benefit-plan-graph-model.png
og:image: /sims/insurance-policy-benefit-plan-graph-model/insurance-policy-benefit-plan-graph-model.png
twitter:image: /sims/insurance-policy-benefit-plan-graph-model/insurance-policy-benefit-plan-graph-model.png
social:
   cards: false
quality_score: 0
---

# Insurance Policy and Benefit Plan Graph Model

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Insurance Policy and Benefit Plan Graph Model MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This graph models how insurance coverage is structured. A payer OFFERS one or more benefit plans; each plan COVERS several coverage categories (hospital inpatient, prescription drugs, mental health); a policy is BASED_ON a plan; and members are ENROLLED_IN (or are dependents on) a policy. Storing benefits this way lets a single graph query answer eligibility questions like "is this member's mental-health care covered?" by traversing from member to policy to plan to category.

## How to Use

Start from a member and follow ENROLLED_IN to their policy, BASED_ON to the benefit plan, and COVERS to the coverage categories that plan includes — that path is exactly the eligibility check. Compare the Gold PPO and Silver HMO plans the payer offers, and note how a dependent connects to the same policy as the subscriber. Drag nodes and use the navigation buttons to explore.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/insurance-policy-benefit-plan-graph-model/main.html"
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
