---
title: "Relational vs. Graph Data Model Side-by-Side"
description: "Given the same four healthcare facts modeled two ways, the learner can differentiate how a relational schema and a graph data model each represent an identical relationship, and can trace the extra steps the relational version requires."
status: validated
validated_date: 2026-09-07
quality_score: 100
image: /sims/relational-vs-graph-data-model-comparison/relational-vs-graph-data-model-comparison.png
og:image: /sims/relational-vs-graph-data-model-comparison/relational-vs-graph-data-model-comparison.png
library: p5.js
bloom_level: Analyze
---

# Relational vs. Graph Data Model Side-by-Side



<iframe src="main.html" width="100%" height="1062px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

Click a table key cell or graph edge to highlight the corresponding relationship in both models. The relationship selector provides the same actions with a keyboard. Count the Hops traces the provider-to-facility-to-payer question in three timed steps. Reset stops the traversal and removes the added payer.

## Modeling Notes

The source specification lists four tables but also refers to an Encounters row and a payer absent from that list. The implementation adds the encounter bridge table, then reveals Payers and the facility payer_id for the traversal exercise. Join conditions match foreign keys to primary keys, not two foreign keys in every case. The sample provider is Dr. Patel; the payer relationship is a simplified teaching model, not a complete billing schema. Logical operation counts are not performance benchmarks.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10–15 minutes. Prerequisites: nodes, edges, labels, and properties; for the comparison, also primary and foreign keys.

**Learning objective:** Given the same four healthcare facts modeled two ways, the learner can differentiate how a relational schema and a graph data model each represent an identical relationship, and can trace the extra steps the relational version requires.

1. **Explore:** Select WORKS_AT from both sides and explain the matching primary-key and foreign-key values. Predict the number of joins and graph hops needed for the payer question, then run Count the Hops.
2. **Explain:** Explain why this encounter bridge requires two joins for the patient–provider fact, while the graph stores one TREATED_BY edge. Report the complete route: four joins and three graph hops.
3. **Transfer:** Sketch a different healthcare example using the same concept and explain one modeling assumption.

Assessment: use the explanation prompt above as an exit ticket. A complete response names the relevant graph elements, traces the displayed evidence, and distinguishes a modeling assumption from a general claim.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/relational-vs-graph-data-model-comparison/main.html" width="100%" height="1062px"></iframe>
```

[JavaScript source](relational-vs-graph-data-model-comparison.js)

## Quality Checks

**Validated September 7, 2026.** Completeness rubric: **100/100**. Browser interaction tests passed at 400, 800, and 1200 px, including reset and keyboard controls; no JavaScript errors were observed. Iframe visibility and visual layout checks passed. The iframe resizes to its rendered content, with the declared height serving as a fallback.

## Specification

The full specification below is extracted from
[Chapter 2: Data Modeling: Graphs vs. Relational Databases](../../chapters/02-graphs-vs-relational-databases/index.md).

```text
Type: diagram
**sim-id:** relational-vs-graph-data-model-comparison<br/>
**Library:** p5.js<br/>
**Status:** Validated

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: differentiate, compare<br/>
Learning objective: Given the same four healthcare facts modeled two ways, the learner can differentiate how a relational schema and a graph data model each represent an identical relationship, and can trace the extra steps the relational version requires.

Purpose: Show the Maria Chen / Dr. Patel / Riverside Clinic / Type 2 Diabetes scenario rendered simultaneously as (left) four normalized tables with foreign keys and (right) a four-node labeled property graph, so learners can click a fact in either representation and watch its counterpart highlight in the other.

Canvas layout:

- Left half: four small table grids (Patients, Providers, Facilities, Diagnoses) with visible foreign-key columns highlighted in orange
- Right half: the four-node graph (Patient, Provider, Facility, Condition) with labeled directed edges, matching the color scheme from Chapter 1's Healthcare Graph Anatomy Explorer

Data Visibility Requirements:
Stage 1: Show both representations at rest, tables on the left fully populated with sample rows, graph on the right fully drawn with all labels visible.
Stage 2: Click a foreign-key cell (e.g., `provider_id` in the Encounters row) on the left; the corresponding edge on the right graph highlights in gold, and a caption reads "This foreign key IS this edge."
Stage 3: Click an edge on the right graph; the two foreign-key cells that would need to be joined to reconstruct that same fact highlight on the left, with a caption showing the SQL join clause required.
Stage 4: A "Count the Hops" button runs the "which payer bills for the facility where Maria Chen's specialist works" question on both sides simultaneously, incrementing a join counter on the left and a hop counter on the right as each step completes.

Interactive controls:

- Click-to-highlight on both table cells and graph edges (bidirectional)
- "Count the Hops" button that animates both traversals step by step
- Reset button

Instructional Rationale: An Analyze-level objective (differentiate, compare) requires the learner to see structural correspondence, not just read a description of it. Bidirectional click-to-highlight lets the learner build the mapping in either direction — from foreign key to edge, or from edge to foreign key — which is the exact skill needed to translate between the two data models later in the course.

Layout: Two-column split, responsive to window resize (stacks vertically below 700px width)
Canvas size: responsive width, 520px height

Implementation: p5.js with two side-by-side rendering regions and a shared highlight-state object
```

## Related Resources

- [Chapter 2: Data Modeling: Graphs vs. Relational Databases](../../chapters/02-graphs-vs-relational-databases/index.md)

## References

- [Source chapter](../../chapters/02-graphs-vs-relational-databases/index.md) — supplied learning objective and teaching example.
- [p5.js canvas reference](https://p5js.org/reference/p5/createCanvas/) — rendering and interaction reference (accessed September 7, 2026).
- [p5.js web editor](https://editor.p5js.org/) — paste the JavaScript source to experiment; no hosted sketch has been published.
