---
title: Provider Network Centrality Analysis Dashboard
description: Interactive Chart.js MicroSim for provider network centrality analysis dashboard.
image: /sims/provider-network-centrality-analysis-dashboard/provider-network-centrality-analysis-dashboard.png
og:image: /sims/provider-network-centrality-analysis-dashboard/provider-network-centrality-analysis-dashboard.png
twitter:image: /sims/provider-network-centrality-analysis-dashboard/provider-network-centrality-analysis-dashboard.png
social:
   cards: false
quality_score: 0
---

# Provider Network Centrality Analysis Dashboard

<iframe src="main.html" height="795" width="100%" scrolling="no"></iframe>

[Run the Provider Network Centrality Analysis Dashboard MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This interactive dashboard compares three centrality measures on a provider referral network of 16 providers. Selecting Degree, Betweenness, or PageRank updates the ranking bar chart and the distribution histogram, while the explanation box describes what that measure captures. The fixed Degree-vs-PageRank scatter shows that the two notions of importance diverge: some providers have many connections (high degree) but are not especially trusted (low PageRank), and vice versa.

## How to Use

Click Degree, Betweenness, or PageRank to re-rank the providers and reshape the distribution histogram, and read the description to understand what each measure means. In the scatter plot, look for providers in the lower-right (many connections but lower PageRank) versus the upper-left (fewer connections but high PageRank) to see why the network has different kinds of important nodes; point size reflects patient volume and color reflects specialty.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/provider-network-centrality-analysis-dashboard/main.html"
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
