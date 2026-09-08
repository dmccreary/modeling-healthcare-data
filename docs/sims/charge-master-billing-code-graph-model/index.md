---
title: Charge Master and Billing Code Graph Model
description: Interactive vis-network MicroSim for charge master and billing code graph model.
image: /sims/charge-master-billing-code-graph-model/charge-master-billing-code-graph-model.png
og:image: /sims/charge-master-billing-code-graph-model/charge-master-billing-code-graph-model.png
twitter:image: /sims/charge-master-billing-code-graph-model/charge-master-billing-code-graph-model.png
social:
   cards: false
quality_score: 75
---

# Charge Master and Billing Code Graph Model

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Charge Master and Billing Code Graph Model MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This graph models a hospital chargemaster (CDM) and how its items connect to the codes and structures used for billing. Each ChargeMaster item — a priced, billable service — MAPS_TO one or more billing codes (CPT, ICD-10, HCPCS), HAS_REVENUE_CODE for a UB-04 revenue category, and BELONGS_TO a clinical department. Modeling these links as a graph makes pricing lookups, charge-capture variance analysis, and revenue optimization straightforward traversals.

## How to Use

Follow a chargemaster item's edges to see everything it connects to: the CPT/ICD codes it maps to, its revenue code, and the department that owns it. Trace, for example, the ED Visit Level 3 item to CPT 99283, revenue code 0450, and the Emergency department. Drag nodes and use the navigation buttons to explore how the chargemaster, codes, and departments interlock.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/charge-master-billing-code-graph-model/main.html"
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
