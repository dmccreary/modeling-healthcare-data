---
title: Link Prediction Scoring MicroSim
description: Interactive p5.js MicroSim for link prediction scoring microsim.
image: /sims/link-prediction-scoring/link-prediction-scoring.png
og:image: /sims/link-prediction-scoring/link-prediction-scoring.png
twitter:image: /sims/link-prediction-scoring/link-prediction-scoring.png
social:
   cards: false
quality_score: 70
---

# Link Prediction Scoring MicroSim

<iframe src="main.html" height="568" width="100%" scrolling="no"></iframe>

[Run the Link Prediction Scoring MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim computes three classic link-prediction scores — Common Neighbors, Jaccard, and Adamic-Adar — over a small provider referral network to rank the referral edges most likely to form next (for example, which specialist a primary-care provider will refer to). Existing referrals are solid edges; the top predicted edge is drawn bold and dashed, with its shared neighbors highlighted in green and the full calculation substituted with real numbers in the panel.

## How to Use

Choose a scoring metric from the dropdown and set how many top predictions to show. Click any row in the ranked table to select that provider pair: the graph highlights its shared neighbors and draws the predicted edge, and the panel shows N(A), N(B), the shared set, and the chosen formula with numbers filled in. Switch between metrics to see how Adamic-Adar can re-order pairs versus Common Neighbors, because rare shared neighbors carry more weight.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/link-prediction-scoring/main.html"
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
