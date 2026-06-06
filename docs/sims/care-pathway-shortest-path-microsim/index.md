---
title: Care Pathway Shortest Path Interactive MicroSim
description: Interactive p5.js MicroSim for care pathway shortest path interactive microsim.
image: /sims/care-pathway-shortest-path-microsim/care-pathway-shortest-path-microsim.png
og:image: /sims/care-pathway-shortest-path-microsim/care-pathway-shortest-path-microsim.png
twitter:image: /sims/care-pathway-shortest-path-microsim/care-pathway-shortest-path-microsim.png
social:
   cards: false
quality_score: 0
---

# Care Pathway Shortest Path Interactive MicroSim

<iframe src="main.html" height="598" width="100%" scrolling="no"></iframe>

[Run the Care Pathway Shortest Path Interactive MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim runs Dijkstra's shortest-path algorithm over a diagnostic care network to find the optimal pathway from a patient presenting with a headache to a treatment plan. Each edge carries a weight — days to the next step or dollar cost — and the algorithm finds the route that minimizes the chosen objective. Because the cheapest or fastest route is not always the obvious one (the direct neurology-to-MRI path is slow and expensive), the algorithm reveals a non-trivial fast-track pathway through blood work and a specialist.

## How to Use

Choose what to optimize — time in days, cost in dollars, or number of steps — and click Run Dijkstra to highlight the optimal pathway in green, with the total time, cost, and step count shown below. Switch objectives and re-run to see how the best route changes: minimizing time and cost favors the blood-work fast track, while other goals may route through different specialists. The edge labels update to show the weight being minimized.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/care-pathway-shortest-path-microsim/main.html"
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
