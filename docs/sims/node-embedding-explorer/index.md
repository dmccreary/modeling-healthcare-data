---
title: "Node Embedding Explorer MicroSim"
description: "Interactive p5.js MicroSim for node embedding explorer microsim."
image: /sims/node-embedding-explorer/node-embedding-explorer.png
og:image: /sims/node-embedding-explorer/node-embedding-explorer.png
twitter:image: /sims/node-embedding-explorer/node-embedding-explorer.png
social:
   cards: false
quality_score: 70
---

# Node Embedding Explorer MicroSim

<iframe src="main.html" height="618" width="100%" scrolling="no"></iframe>

[Run the Node Embedding Explorer MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim makes node embeddings concrete by linking a patient graph (left) to its 2-D embedding space (right). Nodes belong to three latent cohorts — diabetes, cardiac, and healthy — with denser connections inside each cohort than between them. Each message-passing round averages a node's vector with its neighbors' (the intuition behind GraphSAGE/GCN), and the embedding points move so that structurally similar nodes pull together; a cohort-separation score rises with each round.

## How to Use

Use Next step and Previous to advance or rewind the message-passing rounds (round 0 is a random cloud; rounds 1-3 progressively separate the cohorts) and watch the separation score climb. Hover any node to highlight its twin point in both panels, and click a node to see its 4-number vector and nearest neighbors by cosine similarity. Change the Walk bias to compare how local versus global exploration groups nodes, toggle cohort colors off to test whether structure alone reveals the groups, and Reset to return to the random initialization.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/node-embedding-explorer/main.html"
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
