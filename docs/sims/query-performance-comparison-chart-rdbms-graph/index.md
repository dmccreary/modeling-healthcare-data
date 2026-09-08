---
title: "Query Performance: RDBMS vs Graph"
description: "Interactive Chart.js MicroSim for query performance: rdbms vs graph."
image: /sims/query-performance-comparison-chart-rdbms-graph/query-performance-comparison-chart-rdbms-graph.png
og:image: /sims/query-performance-comparison-chart-rdbms-graph/query-performance-comparison-chart-rdbms-graph.png
twitter:image: /sims/query-performance-comparison-chart-rdbms-graph/query-performance-comparison-chart-rdbms-graph.png
social:
   cards: false
quality_score: 75
---

# Query Performance: RDBMS vs Graph

<iframe src="main.html" height="454" width="100%" scrolling="no"></iframe>

[Run the Query Performance: RDBMS vs Graph MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This log-scale line chart makes the central performance argument for graph databases. As a query needs to follow more relationship hops, a relational database that JOINs tables degrades exponentially — from milliseconds at one hop to tens of seconds by six hops — because each JOIN multiplies the rows scanned. A graph database, which follows pointers between connected records, stays nearly constant regardless of depth. On a logarithmic axis, the relational line climbs steeply while the graph line stays almost flat.

## How to Use

Read the y-axis as a logarithmic scale — each gridline is ten times the one below it — and follow the two lines across increasing relationship hops. Notice that at one hop the two databases are comparable, but by four to six hops the relational JOIN query is thousands of times slower while graph traversal barely moves. This widening gap is why deeply-connected healthcare questions (referral chains, care pathways, fraud rings) are far better suited to graph databases.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/query-performance-comparison-chart-rdbms-graph/main.html"
        height="454px"
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
