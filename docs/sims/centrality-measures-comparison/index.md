---
title: Centrality Measures Comparison MicroSim
description: Interactive vis-network MicroSim for centrality measures comparison microsim.
image: /sims/centrality-measures-comparison/centrality-measures-comparison.png
og:image: /sims/centrality-measures-comparison/centrality-measures-comparison.png
twitter:image: /sims/centrality-measures-comparison/centrality-measures-comparison.png
social:
   cards: false
quality_score: 75
---

# Centrality Measures Comparison MicroSim

<iframe src="main.html" height="508" width="100%" scrolling="no"></iframe>

[Run the Centrality Measures Comparison MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim ranks the same provider referral network four different ways so you can see that "importance" has several meanings. Degree centrality finds busy hubs; betweenness finds bridges that connect otherwise-separate clusters; closeness finds providers well-positioned to reach the whole network quickly; and PageRank finds providers who are influential because they connect to other influential ones. Node size and shade encode the selected measure, computed live on the graph.

## How to Use

Switch the centrality measure in the dropdown and watch the node sizes, shading, and top-5 ranking change for the very same network. Compare measures: the high-degree hub dominates Degree but a low-degree bridge node jumps under Betweenness, and the densely-embedded node leads under Closeness and PageRank. For PageRank, adjust the damping slider to see its effect, and use the definition box to choose the right measure for a given question.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/centrality-measures-comparison/main.html"
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
