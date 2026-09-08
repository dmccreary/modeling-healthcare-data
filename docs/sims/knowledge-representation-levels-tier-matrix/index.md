---
title: "Knowledge Representation Levels by Functional Tier Matrix"
description: "Locate any clinical knowledge artifact by both its representation level and its functional tier in a twelve-cell reference grid."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/knowledge-representation-levels-tier-matrix/knowledge-representation-levels-tier-matrix.png
og:image: /sims/knowledge-representation-levels-tier-matrix/knowledge-representation-levels-tier-matrix.png
library: p5.js
bloom_level: Analyze
---

# Knowledge Representation Levels by Functional Tier Matrix

<iframe src="main.html" width="100%" height="762px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

One guideline about LDL cholesterol, expressed twelve ways. Read a column downward and you watch one kind of knowledge harden from prose into something an engine can run; read a row across and you see the same level of formality applied to three different jobs. The cell worth pausing on is Structured x Data, where the concept is finally bound to LOINC 2089-1 — that binding is what lets two systems agree on what counts as an LDL result. The Forms/UI column is deliberately muted and badged: it completes the grid so the classification task is well posed, and it is taught in the two chapters that follow. Hovering a row or column header highlights that band and shows the definition of the level or tier.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10-15 minutes. Prerequisites: FHIR resources and value sets, and the CQL-to-ELM compilation step.

**Learning objective:** Given a description of a clinical knowledge artifact, the learner can classify it by both its knowledge representation level (Narrative, Semi-Structured, Structured, Executable) and its functional tier (Data, Logic, Forms/UI) using the matrix.

1. **Explore:** Hover each of the four row headers in turn and read the level definitions. Then read the Logic Tier column from top to bottom and identify the single step where the artifact stops being interpretable by a person and starts being executable by a machine.
2. **Explain:** Compare Narrative x Logic with Executable x Logic. Explain what is identical about them and what changed, and why nothing in between altered the medicine.
3. **Transfer:** Classify three artifacts of your own — a printed order set, a validated FHIR Questionnaire, and a spreadsheet of screening intervals — by both level and tier. For each, name the feature that fixed the level and the feature that fixed the tier.

Assessment: use the Transfer prompt as an exit ticket. A complete response assigns both coordinates for each artifact and cites a distinct feature for each coordinate rather than one impression covering both.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/knowledge-representation-levels-tier-matrix/main.html" width="100%" height="762px"></iframe>
```

[JavaScript source](knowledge-representation-levels-tier-matrix.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 22: FHIR Resources and Levels of Knowledge Representation](../../chapters/22-fhir-resources-and-knowledge-representation/index.md).

```text
Type: infographic
**sim-id:** knowledge-representation-levels-tier-matrix<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: classify, examine<br/>
Learning objective: Given a description of a clinical knowledge artifact, the learner can classify it by both its knowledge representation level (Narrative, Semi-Structured, Structured, Executable) and its functional tier (Data, Logic, Forms/UI) using the matrix.

Purpose: Give the learner a single reference grid, built from FHIR's own CQF Recommendations implementation guide, showing a concrete example artifact in each of the twelve level-by-tier cells, with the Data and Logic Tier columns fully detailed for this chapter and the Forms/UI column marked as a forward reference to Chapters 23 and 24, where the Forms/UI Tier concept itself and its Structured/Executable-level artifacts are covered.

Grid layout: 4 rows (Narrative, Semi-Structured, Structured, Executable) by 3 columns (Data Tier, Logic Tier, Forms/UI Tier)

Example cell contents (click to reveal full text; shown abbreviated on the grid):
- Narrative x Data: "LDL cholesterol mentioned in guideline prose"
- Narrative x Logic: "'Consider a statin for elevated LDL' (prose recommendation)"
- Narrative x Forms/UI: "Guideline PDF's patient handout section (detailed in Ch. 23)"
- Semi-Structured x Data: "Decision table column: 'LDL value'"
- Semi-Structured x Logic: "Decision table row: IF LDL > 190 THEN recommend statin"
- Semi-Structured x Forms/UI: "Clinical user story describing the counseling conversation (Ch. 23)"
- Structured x Data: "FHIR ValueSet binding LDL to LOINC code 2089-1"
- Structured x Logic: "PlanDefinition trigger: LDL Observation > 190 mg/dL"
- Structured x Forms/UI: "FHIR Questionnaire item definition (Ch. 24)"
- Executable x Data: "Compiled ELM data requirement for LOINC 2089-1"
- Executable x Logic: "Compiled ELM expression evaluated by the CDS engine"
- Executable x Forms/UI: "Rendered CDS Hooks card in the EHR UI (Ch. 24)"

Interactive controls:
- Click any cell to open an infobox with the full example text and a one-sentence explanation of why it belongs at that level and tier
- Hover a row header (a level name) to highlight that entire row and show the level's definition in a side panel
- Hover a column header (a tier name) to highlight that entire column and show the tier's definition in a side panel
- Data Tier and Logic Tier cells rendered in full color; Forms/UI Tier cells rendered in a muted gray with a "Chapter 23/24" badge, signaling they are previewed here but taught fully later

Instructional Rationale: A clickable grid matches the Analyze-level classification objective directly — the learner must locate the correct row and column for a new artifact rather than recall a linear list, which is the actual cognitive task the chapter's culminating learning outcome requires.

Implementation: p5.js grid rendering with click and hover event handling; responsive width, fixed 4x3 aspect ratio.
```

## Related Resources

- [Chapter 22: FHIR Resources and Levels of Knowledge Representation](../../chapters/22-fhir-resources-and-knowledge-representation/index.md)

## References

- [Source chapter](../../chapters/22-fhir-resources-and-knowledge-representation/index.md) — supplied the learning objective and the worked example.
- [p5.js reference](https://p5js.org/reference/) — canvas, drawing, and input handling (accessed September 8, 2026).
- [p5.js web editor](https://editor.p5js.org/) — paste the JavaScript source to experiment; no hosted sketch has been published.
- [HL7 Clinical Guidelines (CPG-on-FHIR) implementation guide](https://hl7.org/fhir/uv/cpg/) — the level-and-tier framing this grid follows (accessed September 8, 2026).
