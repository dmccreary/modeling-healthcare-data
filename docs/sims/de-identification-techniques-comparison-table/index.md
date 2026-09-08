---
title: "De-Identification Techniques Comparison Table"
description: "Interactive p5.js MicroSim for de-identification techniques comparison table."
image: /sims/de-identification-techniques-comparison-table/de-identification-techniques-comparison-table.png
og:image: /sims/de-identification-techniques-comparison-table/de-identification-techniques-comparison-table.png
twitter:image: /sims/de-identification-techniques-comparison-table/de-identification-techniques-comparison-table.png
social:
   cards: false
quality_score: 70
---

# De-Identification Techniques Comparison Table

<iframe src="main.html" height="528" width="100%" scrolling="no"></iframe>

[Run the De-Identification Techniques Comparison Table MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This table compares six de-identification techniques on the fundamental trade-off between privacy protection and data utility. Identifier removal and pseudonymization preserve high data utility but offer only medium privacy (they remain vulnerable to quasi-identifier linking or key compromise), while geographic generalization, value generalization, and noise injection give stronger privacy at the cost of analytic detail. Each row also shows the best use cases, whether the transformation is reversible, and a concrete example.

## How to Use

Scan the red Privacy bars against the green Data-utility bars to see the trade-off at a glance — techniques strong on one are usually weaker on the other. Use the "Best for" and "Reversible?" columns to match a technique to a use case: choose reversible pseudonymization for internal research that may need re-linking, and irreversible generalization or noise injection for public or aggregate datasets. Hover a row to highlight it.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/de-identification-techniques-comparison-table/main.html"
        height="528px"
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
