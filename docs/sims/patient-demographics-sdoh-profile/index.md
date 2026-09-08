---
title: "Patient Demographics and SDOH Profile"
description: "Given a patient node with demographic properties and connected SDOHFactor nodes, the learner can classify each attribute as a demographic property versus a social determinant of health and explain why each is modeled differently in a labeled property graph."
status: validated
validated_date: 2026-09-07
quality_score: 100
image: /sims/patient-demographics-sdoh-profile/patient-demographics-sdoh-profile.png
og:image: /sims/patient-demographics-sdoh-profile/patient-demographics-sdoh-profile.png
library: vis-network
bloom_level: Understand
---

# Patient Demographics and SDOH Profile



<iframe src="main.html" width="100%" height="1242px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

The patient’s demographic properties are always listed beside the graph. Hover over a node or edge for details. Select Maria to highlight recorded SDOH connections and dim unconnected factors. Select a factor to inspect its category and relationship properties, or connect and disconnect that factor. Show FHIR Mapping Note reveals a resource-mapping explanation. Reset view restores the original three connections.

## Modeling Notes

This is synthetic teaching data and a fixed-age snapshot. Risk and severity are illustrative recorded values; no score is inferred from demographic attributes. Modeling demographics as properties and SDOH concepts as separate nodes is a design choice, not a universal requirement. Structured SDOH assessments may map to FHIR Observation, while identified social needs may map to Condition; see the HL7 guide.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10–15 minutes. Prerequisites: nodes, edges, labels, and properties; for the comparison, also primary and foreign keys.

**Learning objective:** Given a patient node with demographic properties and connected SDOHFactor nodes, the learner can classify each attribute as a demographic property versus a social determinant of health and explain why each is modeled differently in a labeled property graph.

1. **Explore:** Compare age with Transportation Access: identify where each value is stored. Select Maria and explain the dimmed factors. Connect Housing Instability, inspect the new relationship, then reset.
2. **Explain:** Explain why severity and risk_level belong to the patient–factor relationship in this example. Explain why an unconnected factor does not prove the absence of a social need.
3. **Transfer:** Sketch a different healthcare example using the same concept and explain one modeling assumption.

Assessment: use the explanation prompt above as an exit ticket. A complete response names the relevant graph elements, traces the displayed evidence, and distinguishes a modeling assumption from a general claim.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/patient-demographics-sdoh-profile/main.html" width="100%" height="1242px"></iframe>
```

[JavaScript source](patient-demographics-sdoh-profile.js)

## Quality Checks

**Validated September 7, 2026.** Completeness rubric: **100/100**. Browser interaction tests passed at 400, 800, and 1200 px, including reset and keyboard controls; no JavaScript errors were observed. Iframe visibility and visual layout checks passed. The iframe resizes to its rendered content, with the declared height serving as a fallback.

## Specification

The full specification below is extracted from
[Chapter 8: Healthcare Interoperability and Care Coordination](../../chapters/08-healthcare-interoperability-care-coordination/index.md).

```text
Type: graph-model
**sim-id:** patient-demographics-sdoh-profile<br/>
**Library:** vis-network<br/>
**Status:** Validated

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: classify, explain<br/>
Learning objective: Given a patient node with demographic properties and connected SDOHFactor nodes, the learner can classify each attribute as a demographic property versus a social determinant of health and explain why each is modeled differently in a labeled property graph.

Purpose: Show that a Patient node carries demographics as intrinsic properties, while Social Determinants Of Health are modeled as separate connected nodes because they carry their own severity/risk data and can change independently of the patient's identity.

Node types to show (color-coded by label):
- `Patient` (pink circle, center of layout) — example instance: Maria Chen, properties `age: 39`, `sex: "F"`, `race_ethnicity: "Asian"`, `preferred_language: "English"`, `address: "142 Oak St, Springfield"`
- `SDOHFactor` (orange diamond, five instances arranged around the Patient node) — example instances: "Housing Instability", "Food Insecurity", "Transportation Access", "Health Literacy", "Income Level", each carrying a `category` property

Edge types to show:
- `HAS_SDOH_FACTOR` (Patient to SDOHFactor), properties `severity` ("low" | "moderate" | "high") and `risk_level` (numeric 1-5), rendered as a thicker, redder line as severity increases

Sample data:
- Maria Chen (Patient) HAS_SDOH_FACTOR {severity: "moderate", risk_level: 3} Transportation Access
- Maria Chen (Patient) HAS_SDOH_FACTOR {severity: "low", risk_level: 1} Food Insecurity
- Maria Chen (Patient) HAS_SDOH_FACTOR {severity: "low", risk_level: 1} Health Literacy
- Housing Instability and Income Level are shown present but unconnected to Maria, to demonstrate that not every SDOHFactor node applies to every patient

Data Visibility Requirements:
Stage 1: Show the Patient node at center with its five demographic properties visible in a label list, and five SDOHFactor nodes arranged around it, with only two or three connected by HAS_SDOH_FACTOR edges.
Stage 2: On hover over the Patient node, show a tooltip listing all demographic properties as key-value pairs.
Stage 3: On hover over a connected SDOHFactor node or its edge, show a tooltip with the factor name, its severity, and its numeric risk_level.
Stage 4: On click of the Patient node, highlight all HAS_SDOH_FACTOR edges and their connected SDOHFactor nodes in a contrasting color, and dim the unconnected SDOHFactor nodes to show they do not apply to this patient.

Interactive controls:
- Legend panel (always visible) distinguishing the Patient node style, the SDOHFactor node style, and the severity color/thickness scale on edges
- Toggle button: "Show FHIR Mapping Note" — reveals a callout explaining that SDOH data increasingly lives in FHIR Observation resources coded with LOINC and ICD-10-Z codes rather than as free-text notes, a topic explored fully in the FHIR chapters later in this book
- Reset view button to re-center and re-fit the graph

Instructional Rationale: A click-and-hover graph-model explorer matches the Understand-level objective (classify, explain) by making the label-versus-property distinction from Chapter 1 concrete in a second context: demographics stay attached to the Patient node as properties because they describe the patient directly, while SDOH factors become their own nodes because they carry independent severity data and a patient may have zero, one, or several of them. Letting the learner toggle which SDOHFactor nodes are connected reinforces that this is a real modeling choice, not an arbitrary one.

Layout: Force-directed, Patient node fixed near center, five SDOHFactor nodes arranged in a ring, non-overlapping, responsive to window resize
Canvas size: responsive width, 500px height
Legend: node shape/color key for Patient and SDOHFactor; edge color/thickness key for severity levels low/moderate/high

Implementation: vis-network JavaScript library
```

## Related Resources

- [Chapter 8: Healthcare Interoperability and Care Coordination](../../chapters/08-healthcare-interoperability-care-coordination/index.md)

## References

- [Source chapter](../../chapters/08-healthcare-interoperability-care-coordination/index.md) — supplied learning objective and teaching example.
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) — rendering and interaction reference (accessed September 7, 2026).
- [HL7 SDOH Clinical Care Implementation Guide](https://hl7.org/fhir/us/sdoh-clinicalcare/) — structured representation of social needs and assessments.
