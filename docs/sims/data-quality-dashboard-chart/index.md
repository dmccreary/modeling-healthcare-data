---
title: Data Quality Dashboard Chart
description: Interactive Chart.js MicroSim for data quality dashboard chart.
image: /sims/data-quality-dashboard-chart/data-quality-dashboard-chart.png
og:image: /sims/data-quality-dashboard-chart/data-quality-dashboard-chart.png
twitter:image: /sims/data-quality-dashboard-chart/data-quality-dashboard-chart.png
social:
   cards: false
quality_score: 75
---

# Data Quality Dashboard Chart

<iframe src="main.html" height="770" width="100%" scrolling="no"></iframe>

[Run the Data Quality Dashboard Chart MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This four-panel dashboard monitors data quality for a healthcare graph database. The top-left scorecard rates seven quality dimensions against the 90% threshold and 95% target (with Consistency and Relationship Quality flagged below threshold); the top-right chart compares completeness of required versus optional properties by entity type; the bottom-left tracks four dimensions over the last 90 days, showing a relationship-quality dip after a new ETL deployment and its recovery after a fix; and the bottom-right ranks the top data-quality issues by the number of affected records on a log scale.

## How to Use

Hover over any bar, point, or line to see exact values. Use the scorecard colors (green excellent, yellow acceptable, orange warning, red critical) to spot which dimensions need attention, read the trend lines to see whether quality is improving or declining, and scan the issues chart to see where remediation effort would touch the most records.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/data-quality-dashboard-chart/main.html"
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
