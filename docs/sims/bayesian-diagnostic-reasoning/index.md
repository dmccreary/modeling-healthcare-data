---
title: Bayesian Diagnostic Reasoning MicroSim
description: Interactive p5.js MicroSim for bayesian diagnostic reasoning microsim.
image: /sims/bayesian-diagnostic-reasoning/bayesian-diagnostic-reasoning.png
og:image: /sims/bayesian-diagnostic-reasoning/bayesian-diagnostic-reasoning.png
twitter:image: /sims/bayesian-diagnostic-reasoning/bayesian-diagnostic-reasoning.png
social:
   cards: false
quality_score: 0
---

# Bayesian Diagnostic Reasoning MicroSim

<iframe src="main.html" height="618" width="100%" scrolling="no"></iframe>

[Run the Bayesian Diagnostic Reasoning MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim shows medical diagnosis as Bayesian probability revision rather than a single lookup. Five candidate conditions start at prior probabilities set by the clinical context, and each evidence item you toggle multiplies those priors by the item's likelihood ratio for each condition, with the result renormalized to a posterior. The bars re-sort as the differential changes, and the panel shows the likelihood ratios behind the most recent update.

## How to Use

Choose a clinical setting from the Prior dropdown — a low-risk clinic, the emergency department, or a specialty referral — to set the starting probabilities. Then check evidence items (fever, stiff neck, photophobia, and so on) and watch the diagnoses re-rank: fever and stiff neck together sharply raise meningitis, while a normal CT drives down brain tumor. Notice that the same evidence yields different posteriors depending on the prior. Use Reset evidence to start over.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/bayesian-diagnostic-reasoning/main.html"
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
