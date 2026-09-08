---
title: "Healthcare Graph Anatomy Explorer"
description: "Given a rendered labeled property graph, the learner can identify which visual elements are nodes and which are edges, and state the label and properties of each."
status: validated
validated_date: 2026-09-07
quality_score: 100
image: /sims/healthcare-graph-anatomy-explorer/healthcare-graph-anatomy-explorer.png
og:image: /sims/healthcare-graph-anatomy-explorer/healthcare-graph-anatomy-explorer.png
library: vis-network
bloom_level: Understand
---

# Healthcare Graph Anatomy Explorer



<iframe src="main.html" width="100%" height="962px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

Select a node to inspect its instance properties and highlight its incident edges. Hover over any node or edge for its properties, or use the element selector with a keyboard. Show Properties adds a count badge to each node; Reset view restores the initial display.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10–15 minutes. Prerequisites: nodes, edges, labels, and properties; for the comparison, also primary and foreign keys.

**Learning objective:** Given a rendered labeled property graph, the learner can identify which visual elements are nodes and which are edges, and state the label and properties of each.

1. **Explore:** Inspect Patient, Provider, and TREATED_BY. Record one label and one property for each. Predict which edges will highlight when you select Provider, then test your prediction.
2. **Explain:** Explain why Patient is a label, patient_id is a property key, and MRN-48213 is a property value. Identify the source and destination of WORKS_AT.
3. **Transfer:** Sketch a different healthcare example using the same concept and explain one modeling assumption.

Assessment: use the explanation prompt above as an exit ticket. A complete response names the relevant graph elements, traces the displayed evidence, and distinguishes a modeling assumption from a general claim.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-graph-anatomy-explorer/main.html" width="100%" height="962px"></iframe>
```

[JavaScript source](healthcare-graph-anatomy-explorer.js)

## Quality Checks

**Validated September 7, 2026.** Completeness rubric: **100/100**. Browser interaction tests passed at 400, 800, and 1200 px, including reset and keyboard controls; no JavaScript errors were observed. Iframe visibility and visual layout checks passed. The iframe resizes to its rendered content, with the declared height serving as a fallback.

## Specification

The full specification below is extracted from
[Chapter 1: Foundations of Graph Structures](../../chapters/01-foundations-of-graph-structures/index.md).

```text
Type: graph-model
**sim-id:** healthcare-graph-anatomy-explorer<br/>
**Library:** vis-network<br/>
**Status:** Validated
**Template:** https://github.com/dmccreary/organizational-analytics/tree/main/docs/sims/property-graph-model<br/>

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: identify, classify<br/>
Learning objective: Given a rendered labeled property graph, the learner can identify which visual elements are nodes and which are edges, and state the label and properties of each.

Purpose: Let the learner explore the four-node Maria Chen example graph interactively, discovering node labels, edge labels, and properties by clicking rather than reading a static diagram.

Node types to show (color-coded by label):
- `Patient` (pink circle) — example instance: Maria Chen, properties `patient_id: "MRN-48213"`, `date_of_birth: "1985-03-12"`, `gender: "F"`
- `Provider` (blue circle) — example instance: Dr. Patel, properties `npi: "1234567890"`, `specialty: "Internal Medicine"`
- `Facility` (gray square) — example instance: Riverside Clinic, properties `facility_type: "Outpatient Clinic"`, `city: "Springfield"`
- `Condition` (orange diamond) — example instance: Type 2 Diabetes, properties `icd10_code: "E11.9"`

Edge types to show (labeled, directional arrows):
- `TREATED_BY` (Patient → Provider), properties `first_visit_date: "2024-01-15"`, `encounter_type: "Annual Physical"`
- `WORKS_AT` (Provider → Facility), property `role: "Attending Physician"`
- `DIAGNOSED_WITH` (Patient → Condition), property `diagnosis_date: "2023-11-02"`

Data Visibility Requirements:
Stage 1: Show the four nodes placed in a simple force-directed layout with their labels visible (Patient, Provider, Facility, Condition) but no properties shown yet.
Stage 2: On hover over a node, show a tooltip listing that node's label and all of its properties as key-value pairs.
Stage 3: On click of a node, highlight all edges directly connected to it and open a side panel showing the same property list plus the labels of the connected edges.
Stage 4: On hover over an edge, show a tooltip with the edge's label and its properties.

Interactive controls:
- Toggle button: "Show/Hide Properties" — when off, only labels are visible; when on, a small property count badge appears on each node
- Reset view button to re-center and re-fit the graph

Instructional Rationale: A click-to-reveal explorer matches the Understand-level objective (identify, classify) by letting learners build their own mental model of label-versus-property through direct manipulation, rather than passively reading an annotated static image. Hover and click are the two interactions specified because they let a learner distinguish "what is this node's type" (label, shown immediately) from "what do I know about this specific instance" (properties, revealed on demand) — which is exactly the distinction the preceding paragraph asks them to hold onto.

Layout: Force-directed, four nodes, non-overlapping, responsive to window resize
Canvas size: responsive width, 500px height
Legend: node shape/color key for Patient, Provider, Facility, Condition; arrow style key for each edge label

Implementation: vis-network JavaScript library
```

## Related Resources

- [Chapter 1: Foundations of Graph Structures](../../chapters/01-foundations-of-graph-structures/index.md)

## References

- [Source chapter](../../chapters/01-foundations-of-graph-structures/index.md) — supplied learning objective and teaching example.
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) — rendering and interaction reference (accessed September 7, 2026).
