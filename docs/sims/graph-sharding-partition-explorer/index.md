---
title: "Graph Sharding Partition Explorer"
description: "Given a patient graph partitioned across three shards, the learner can distinguish same-shard edges from cross-shard edges and examine why cross-shard traversal costs more."
status: validated
validated_date: 2026-09-07
quality_score: 100
image: /sims/graph-sharding-partition-explorer/graph-sharding-partition-explorer.png
og:image: /sims/graph-sharding-partition-explorer/graph-sharding-partition-explorer.png
library: vis-network
bloom_level: Analyze
---

# Graph Sharding Partition Explorer



<iframe src="main.html" width="100%" height="1392px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

The graph contains 24 nodes in three shaded shard regions. Move Cross-shard edge count from 0 to 8 to add referral edges. Inspect an edge by clicking it or using the selector to compare local and remote traversal latency. Reset restores two cross-shard edges.

## Modeling Notes

All latency values are synthetic assumptions from the specification, not measured or universal database performance. The model assigns 0.01 ms to a local traversal and 5–50 ms to a remote traversal; the readout sums one sequential traversal of each visible remote edge. It omits parallelism, caching, payload size, and workload variation. Fixed shard positions keep partition membership unambiguous.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10–15 minutes. Prerequisites: nodes, edges, labels, and properties; for the comparison, also primary and foreign keys.

**Learning objective:** Given a patient graph partitioned across three shards, the learner can distinguish same-shard edges from cross-shard edges and examine why cross-shard traversal costs more.

1. **Explore:** Record the remote cost range at 0, 2, and 8 cross-shard edges. Inspect one solid edge and one dashed edge. Explain which endpoint locations determine the edge type.
2. **Explain:** Explain why eight sequential remote traversals yield 40–400 ms under the stated assumptions, and identify two real-world factors this simple model omits.
3. **Transfer:** Sketch a different healthcare example using the same concept and explain one modeling assumption.

Assessment: use the explanation prompt above as an exit ticket. A complete response names the relevant graph elements, traces the displayed evidence, and distinguishes a modeling assumption from a general claim.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/graph-sharding-partition-explorer/main.html" width="100%" height="1392px"></iframe>
```

[JavaScript source](graph-sharding-partition-explorer.js)

## Quality Checks

**Validated September 7, 2026.** Completeness rubric: **100/100**. Browser interaction tests passed at 400, 800, and 1200 px, including reset and keyboard controls; no JavaScript errors were observed. Iframe visibility and visual layout checks passed. The iframe resizes to its rendered content, with the declared height serving as a fallback.

## Specification

The full specification below is extracted from
[Chapter 4: Graph Database Scalability and Operations](../../chapters/04-graph-database-scalability-operations/index.md).

```text
Type: graph-model
**sim-id:** graph-sharding-partition-explorer<br/>
**Library:** vis-network<br/>
**Status:** Validated

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, distinguish<br/>
Learning objective: Given a patient graph partitioned across three shards, the learner can distinguish same-shard edges from cross-shard edges and examine why cross-shard traversal costs more.

Purpose: Show a ~24-node healthcare graph (patients, providers, facilities) visually grouped into three colored regions representing three shards, so learners can see which edges stay within a shard and which cross between shards.

Components to show:

- Three shaded background regions labeled Shard 1, Shard 2, Shard 3, each containing 6-9 nodes (patients, their treating providers, and home facility)
- Same-shard edges drawn as solid gray lines
- Cross-shard edges (e.g., a referral from a Shard 1 patient's provider to a Shard 3 specialist) drawn as dashed red lines with a small "network hop" icon at the midpoint

Interactive controls:

- Click any edge to see a tooltip: same-shard edges show "In-memory pointer traversal: ~0.01ms"; cross-shard edges show "Network round trip required: ~5-50ms"
- Slider: "Cross-shard edge count" (0-8) that dynamically redraws additional referral edges crossing shard boundaries, letting the learner see the visual and stated cost impact of a poorly chosen partition strategy
- Reset button restores the default partition

Data Visibility Requirements:
Stage 1: Show the default partition with 2 cross-shard edges highlighted in red among mostly same-shard traffic.
Stage 2: On slider increase, redraw additional cross-shard edges and update a running "estimated cross-shard traversal cost" readout.
Stage 3: On edge click, show the specific latency comparison tooltip described above.

Instructional Rationale: An Analyze-level objective requires the learner to distinguish two categories of edge and connect that distinction to a real performance consequence, not just observe a static partitioned graph. Making the slider dynamically add cross-shard edges turns a passive diagram into evidence for the specific partitioning trade-off the preceding paragraph describes.

Layout: Force-directed with three fixed background regions, responsive to window resize
Canvas size: responsive width, 500px height

Implementation: vis-network JavaScript library with custom region backgrounds and a synthetic latency-lookup table keyed on edge type
```

## Related Resources

- [Chapter 4: Graph Database Scalability and Operations](../../chapters/04-graph-database-scalability-operations/index.md)

## References

- [Source chapter](../../chapters/04-graph-database-scalability-operations/index.md) — supplied learning objective and teaching example.
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) — rendering and interaction reference (accessed September 7, 2026).
