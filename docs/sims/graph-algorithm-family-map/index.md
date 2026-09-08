---
title: "Graph Algorithm Family Map"
description: "Classify a graph algorithm by the type of question it answers (distance, importance, grouping, or prediction) and summarize one example algorithm per family."
status: validated
validated_date: 2026-09-07
quality_score: 100
image: /sims/graph-algorithm-family-map/graph-algorithm-family-map.png
og:image: /sims/graph-algorithm-family-map/graph-algorithm-family-map.png
library: Mermaid
bloom_level: Understand
---

# Graph Algorithm Family Map



<iframe src="main.html" width="100%" height="1102px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

Select any family or algorithm for its definition. This chapter’s tour collapses the map to the root and four families; selecting a family reveals its leaves. Show all algorithms restores the full taxonomy. Each diagram node supports Tab followed by Enter or Space.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10–15 minutes. Prerequisites: nodes, edges, labels, and properties; for the comparison, also primary and foreign keys.

**Learning objective:** Classify a graph algorithm by the type of question it answers (distance, importance, grouping, or prediction) and summarize one example algorithm per family.

1. **Explore:** Use the tour to classify three questions: find a short referral path, identify a provider bridging referral groups, and find disconnected provider groups. Open the relevant families and compare their algorithms.
2. **Explain:** Summarize one algorithm per family. Explain why clustering coefficient measures local cohesion rather than returning a partition, and why a similarity score is not automatically a calibrated probability.
3. **Transfer:** Sketch a different healthcare example using the same concept and explain one modeling assumption.

Assessment: use the explanation prompt above as an exit ticket. A complete response names the relevant graph elements, traces the displayed evidence, and distinguishes a modeling assumption from a general claim.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/graph-algorithm-family-map/main.html" width="100%" height="1102px"></iframe>
```

[JavaScript source](graph-algorithm-family-map.js)

## Quality Checks

**Validated September 7, 2026.** Completeness rubric: **100/100**. Browser interaction tests passed at 400, 800, and 1200 px, including reset and keyboard controls; no JavaScript errors were observed. Iframe visibility and visual layout checks passed. The iframe resizes to its rendered content, with the declared height serving as a fallback.

## Specification

The full specification below is extracted from
[Chapter 5: Graph Algorithms, Centrality, and Similarity Measures](../../chapters/05-graph-algorithms-centrality-similarity/index.md).

```text
Type: diagram
**sim-id:** graph-algorithm-family-map<br/>
**Library:** Mermaid<br/>
**Status:** Validated

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: classify, summarize<br/>
Learning objective: Classify a graph algorithm by the type of question it answers (distance, importance, grouping, or prediction) and summarize one example algorithm per family.

Purpose: Give learners a mental map of this chapter before diving into individual algorithms, so each new algorithm they meet has an obvious "home" in the taxonomy.

Structure: A Mermaid flowchart with a root node "Graph Algorithm" branching into four family nodes: "Distance Questions", "Importance Questions", "Grouping Questions", "Prediction Questions". Each family node branches to 2-3 example algorithm leaf nodes:

- Distance Questions → Shortest Path Algorithm
- Importance Questions → Degree Centrality, Betweenness Centrality, PageRank Algorithm
- Grouping Questions → Connected Components, Strongly Connected Component, Clustering Coefficient
- Prediction Questions → Similarity Measure, Link Prediction

Every node must have a `click` directive that opens an infobox with a one-sentence plain-language definition of that family or algorithm (e.g., clicking "Importance Questions" shows "Which nodes matter most, and by what definition of 'matters'?"; clicking "Degree Centrality" shows its formal one-line definition).

Color scheme: root node gray, family nodes blue, leaf nodes colored by family (distance=green, importance=orange, grouping=purple, prediction=teal)

Interactivity requirement: every node clickable with an infobox; the diagram title bar includes a "this chapter's tour" reset button that collapses back to the four family nodes.

Implementation: Mermaid flowchart with `click NodeId call showInfo("id")` directives wired to a small JavaScript infobox panel below the diagram, responsive to window resize.
```

## Related Resources

- [Chapter 5: Graph Algorithms, Centrality, and Similarity Measures](../../chapters/05-graph-algorithms-centrality-similarity/index.md)

## References

- [Source chapter](../../chapters/05-graph-algorithms-centrality-similarity/index.md) — supplied learning objective and teaching example.
- [Mermaid flowchart documentation](https://mermaid.js.org/syntax/flowchart.html) — rendering and interaction reference (accessed September 7, 2026).
