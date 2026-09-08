---
title: "FHIR Resource Bundle Explorer"
description: "Render a FHIR Bundle as a node-and-edge graph and match every drawn edge to the JSON reference field that produced it."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/fhir-resource-bundle-explorer/fhir-resource-bundle-explorer.png
og:image: /sims/fhir-resource-bundle-explorer/fhir-resource-bundle-explorer.png
library: vis-network
bloom_level: Analyze
---

# FHIR Resource Bundle Explorer

<iframe src="main.html" width="100%" height="850px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

The claim that a FHIR Bundle is already a labeled property graph is easy to assert and easy to doubt. This MicroSim makes it checkable: six resources for Maria Chen, eight reference fields, eight edges — and the counts match exactly. Selecting a node shows its raw JSON alongside a list of its outgoing and incoming edges, so the Observation's two reference fields visibly correspond to its two outgoing arrows. **JSON view** highlights every `subject`, `encounter`, `addresses`, and `requester` in the whole Bundle so the two representations can be read against each other. The dashed Practitioner node is the honest complication: `MedicationRequest.requester` points outside the Bundle, so one edge leads off the edge of the page.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 12-18 minutes. Prerequisites: nodes, edges, and labels, and the shape of a JSON object.

**Learning objective:** Given a rendered FHIR Bundle, the learner can examine which JSON reference fields correspond to which graph edges, and differentiate the six core resource types by the fields each one carries.

1. **Explore:** Select the Observation and count its reference fields in the JSON. Confirm the count matches its outgoing arrows, then repeat for the Condition.
2. **Explain:** Switch to JSON view and count the highlighted fields. Explain to a partner why `addresses` being an array rather than a single object matters for the graph, and what it would mean if a CarePlan had three entries there.
3. **Transfer:** The dashed Practitioner is not in this Bundle. Say what a client must do to display the prescriber's name, and describe one situation where sending a Bundle with unresolved references is the right choice rather than an oversight.

Assessment: use the Transfer prompt as an exit ticket. A complete response describes resolving the reference with a second request, and gives a defensible reason for excluding a resource from a Bundle rather than treating the omission as an error.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/fhir-resource-bundle-explorer/main.html" width="100%" height="850px"></iframe>
```

[JavaScript source](fhir-resource-bundle-explorer.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 22: FHIR Resources and Levels of Knowledge Representation](../../chapters/22-fhir-resources-and-knowledge-representation/index.md).

```text
Type: graph-model
**sim-id:** fhir-resource-bundle-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, differentiate<br/>
Learning objective: Given a rendered FHIR Bundle, the learner can examine which JSON reference fields correspond to which graph edges, and differentiate the six core resource types by the fields each one carries.

Purpose: Render the Maria Chen FHIR Bundle above as an interactive node-and-edge graph so the learner directly experiences a FHIR Bundle as a labeled property graph rather than as abstract JSON.

Node types to show (color-coded by resourceType, exact data from the Bundle above):
- `Patient` (pink circle) — maria-chen
- `Encounter` (gray square) — enc-1, Annual Physical
- `Condition` (orange diamond) — cond-1, Type 2 Diabetes (E11.9)
- `Observation` (yellow circle) — obs-1, HbA1c 8.2%
- `MedicationRequest` (purple hexagon) — med-1, Metformin 500mg
- `CarePlan` (green triangle) — cp-1, Quarterly HbA1c monitoring

Edge types to show (labeled by the FHIR field name they came from):
- `subject` (Condition, Encounter, Observation, MedicationRequest, CarePlan → Patient)
- `encounter` (Observation → Encounter)
- `addresses` (CarePlan → Condition)
- `requester` (MedicationRequest → Practitioner, shown as an unresolved reference badge if Practitioner is not loaded in this bundle)

Interactive controls:
- Click any node to open a side panel showing the exact raw JSON for that resource
- Hover any edge to see a tooltip naming the FHIR field that produced it (e.g., "this edge came from the `addresses` field")
- Toggle: "JSON View" vs "Graph View" that shows the same Bundle as raw formatted JSON side by side with the rendered graph, so the learner can match a specific JSON reference field to its corresponding edge

Instructional Rationale: A toggle between JSON and graph views directly targets the Analyze-level objective, requiring the learner to map specific document fields onto specific graph structures rather than accepting the JSON-equals-graph claim in prose alone.

Implementation: vis-network JavaScript library; responsive width, 550px height.
```

## Related Resources

- [Chapter 22: FHIR Resources and Levels of Knowledge Representation](../../chapters/22-fhir-resources-and-knowledge-representation/index.md)

## References

- [Source chapter](../../chapters/22-fhir-resources-and-knowledge-representation/index.md) — supplied the learning objective and the worked example.
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) — node shapes, edge properties, and interaction options (accessed September 8, 2026).
- [HL7 FHIR Bundle resource](https://hl7.org/fhir/bundle.html) — the container type rendered here (accessed September 8, 2026).
- [Wikipedia: Graph (abstract data type)](https://en.wikipedia.org/wiki/Graph_%28abstract_data_type%29) — the structure the Bundle turns out to be.
