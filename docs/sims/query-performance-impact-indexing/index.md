---
title: Query Performance Impact of Indexing
description: Interactive Chart.js MicroSim for query performance impact of indexing.
image: /sims/query-performance-impact-indexing/query-performance-impact-indexing.png
og:image: /sims/query-performance-impact-indexing/query-performance-impact-indexing.png
twitter:image: /sims/query-performance-impact-indexing/query-performance-impact-indexing.png
social:
   cards: false
quality_score: 75
---

# Query Performance Impact of Indexing

<iframe src="main.html" height="494" width="100%" scrolling="no"></iframe>

[Run the Query Performance Impact of Indexing MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This log-log line chart shows how indexing transforms healthcare graph query performance. As the result set grows from 10 to 1,000,000 nodes, an unindexed full scan (red) climbs from 50ms to a 16-minute timeout, a single property index (blue) stays under 7 seconds, and a composite index (green) keeps queries sub-second up to 100,000 patients. The vertical gap between the lines is the value of the index.

## How to Use

Hover over any point to see the exact execution time, the speedup factor versus the unindexed query, and the equivalent throughput in queries per second. Compare the three lines on the logarithmic axes to see how the performance gap widens by orders of magnitude as queries return more nodes.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/query-performance-impact-indexing/main.html"
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
