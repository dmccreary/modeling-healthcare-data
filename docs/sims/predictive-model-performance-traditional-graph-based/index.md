---
title: "Predictive Model Performance: Traditional vs Graph-Based"
description: "Interactive Chart.js MicroSim for predictive model performance: traditional vs graph-based."
image: /sims/predictive-model-performance-traditional-graph-based/predictive-model-performance-traditional-graph-based.png
og:image: /sims/predictive-model-performance-traditional-graph-based/predictive-model-performance-traditional-graph-based.png
twitter:image: /sims/predictive-model-performance-traditional-graph-based/predictive-model-performance-traditional-graph-based.png
social:
   cards: false
quality_score: 75
---

# Predictive Model Performance: Traditional vs Graph-Based

<iframe src="main.html" height="504" width="100%" scrolling="no"></iframe>

[Run the Predictive Model Performance: Traditional vs Graph-Based MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This line chart compares how three model families predict 30-day hospital readmission as the training dataset grows from 100 to 1,000,000 patient records (log scale). Traditional Logistic Regression and Random Forest improve quickly but plateau (around 0.78 and 0.83 AUROC), while the Graph Neural Network keeps climbing past 0.93 because it can exploit relational context. A dashed line marks random-chance performance (0.50).

## How to Use

Hover over any point to see the model, its AUROC, and the 95% confidence interval at that training size. Compare the three curves to see where the graph-based model overtakes the traditional methods and how its advantage widens with more data, especially beyond a typical single-hospital dataset (~10,000 patients).

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/predictive-model-performance-traditional-graph-based/main.html"
        height="504px"
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
