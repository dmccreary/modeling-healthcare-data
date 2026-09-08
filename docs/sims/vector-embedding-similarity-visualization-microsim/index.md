---
title: "Vector Embedding Similarity Visualization MicroSim"
description: "Interactive p5.js MicroSim for vector embedding similarity visualization microsim."
image: /sims/vector-embedding-similarity-visualization-microsim/vector-embedding-similarity-visualization-microsim.png
og:image: /sims/vector-embedding-similarity-visualization-microsim/vector-embedding-similarity-visualization-microsim.png
twitter:image: /sims/vector-embedding-similarity-visualization-microsim/vector-embedding-similarity-visualization-microsim.png
social:
   cards: false
quality_score: 70
---

# Vector Embedding Similarity Visualization MicroSim

<iframe src="main.html" height="618" width="100%" scrolling="no"></iframe>

[Run the Vector Embedding Similarity Visualization MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim shows how medical concepts are arranged in a vector embedding space so that semantically similar concepts sit close together, and how similarity search retrieves the nearest concepts to a query. Twenty conditions are projected into two dimensions and colored by category — cardiovascular, respiratory, neurological, and metabolic. A clinical query is placed in the space, and lines connect it to its most similar concepts, with cosine-similarity scores in the results panel.

## How to Use

Choose a clinical query from the dropdown — "Chest pain and dyspnea," for instance, lands between the cardiovascular and respiratory clusters and matches concepts from both. Adjust the Neighbors slider to return more or fewer matches and the Threshold slider to require a minimum similarity (the dashed circle shows that boundary). The results panel lists each matched concept with its similarity percentage.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/vector-embedding-similarity-visualization-microsim/main.html"
        height="618px"
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
