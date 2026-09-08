---
title: "Query Optimization Workflow Diagram"
description: "Interactive Mermaid MicroSim for query optimization workflow diagram."
image: /sims/query-optimization-workflow-diagram/query-optimization-workflow-diagram.png
og:image: /sims/query-optimization-workflow-diagram/query-optimization-workflow-diagram.png
twitter:image: /sims/query-optimization-workflow-diagram/query-optimization-workflow-diagram.png
social:
   cards: false
quality_score: 75
---

# Query Optimization Workflow Diagram

<iframe src="main.html" height="507" width="100%" scrolling="no"></iframe>

[Run the Query Optimization Workflow Diagram MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This decision tree walks through systematically optimizing a slow healthcare graph query. After profiling, it checks the usual culprits in order — missing indexes, full label scans, unbounded variable-length traversals, oversized result sets, and heavy aggregations — and applies a targeted fix for each, looping back to re-PROFILE so the effect is measured before moving on. Schema changes are the last resort.

## How to Use

Hover over any step to see what to check and the Cypher fix to apply, with example syntax. Follow the "No" answers straight down the spine of checks, and each "Yes" answer out to a green fix that loops back to re-profile, until the query meets its performance target.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/query-optimization-workflow-diagram/main.html"
        height="507px"
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
