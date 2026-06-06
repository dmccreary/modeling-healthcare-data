---
title: Graph Traversal Visualization MicroSim
description: Interactive p5.js MicroSim for graph traversal visualization microsim.
image: /sims/graph-traversal-visualization-microsim/graph-traversal-visualization-microsim.png
og:image: /sims/graph-traversal-visualization-microsim/graph-traversal-visualization-microsim.png
twitter:image: /sims/graph-traversal-visualization-microsim/graph-traversal-visualization-microsim.png
social:
   cards: false
quality_score: 0
---

# Graph Traversal Visualization MicroSim

<iframe src="main.html" height="638" width="100%" scrolling="no"></iframe>

[Run the Graph Traversal Visualization MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim animates how graph traversal algorithms explore a small healthcare graph of patients, providers, medications, conditions, and facilities. Depth-First Search dives deep along one branch before backtracking, Breadth-First Search fans out level by level, and Shortest Path finds the fewest-hop route between two nodes. As the algorithm runs, the current node glows yellow, visited nodes turn green, and (for shortest path) the final route is highlighted in orange — making the difference between the strategies visible.

## How to Use

Choose a start node and an algorithm (and, for Shortest Path, a target), set the animation speed, and press Start to watch the traversal step through the graph; Pause and Reset let you control it. Follow the "Order so far" list in the info panel to see the exact sequence each algorithm visits, and compare DFS versus BFS from the same start node to see how deep-first and level-first exploration differ.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/graph-traversal-visualization-microsim/main.html"
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
