---
title: Data Quality Impact Analysis MicroSim
description: Interactive p5.js MicroSim for data quality impact analysis microsim.
image: /sims/data-quality-impact-analysis-microsim/data-quality-impact-analysis-microsim.png
og:image: /sims/data-quality-impact-analysis-microsim/data-quality-impact-analysis-microsim.png
twitter:image: /sims/data-quality-impact-analysis-microsim/data-quality-impact-analysis-microsim.png
social:
   cards: false
quality_score: 0
---

# Data Quality Impact Analysis MicroSim

<iframe src="main.html" height="656" width="100%" scrolling="no"></iframe>

[Run the Data Quality Impact Analysis MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim makes the cost of poor data quality concrete by running a graph query against a small patient-provider-prescription-diagnosis graph and letting you corrupt the data. Toggling issues changes the answer: duplicate patient records over-count, missing TREATED_BY edges under-count, inconsistent diagnosis codes drop matches, and null prescription dates remove records — each pushing the query result away from the correct answer on clean data.

## How to Use

Pick a query from the dropdown (for example, "Patients of Dr. 0") and note that on clean data the result matches the correct answer. Then toggle the data-quality issue checkboxes and watch the result change and the accuracy flag flip to a red "wrong by" warning — adding a duplicate inflates the count, while removing an edge or a value deflates it. Use "Reset to clean data" to return to the accurate baseline. The lesson: analytics are only as trustworthy as the graph they run on.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/data-quality-impact-analysis-microsim/main.html"
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
