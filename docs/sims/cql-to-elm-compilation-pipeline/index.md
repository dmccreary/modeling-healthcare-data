---
title: "CQL-to-ELM Compilation Pipeline"
description: "Read one define statement as authored CQL and as compiled ELM, then watch a reasoning engine evaluate it against two patients with opposite results."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/cql-to-elm-compilation-pipeline/cql-to-elm-compilation-pipeline.png
og:image: /sims/cql-to-elm-compilation-pipeline/cql-to-elm-compilation-pipeline.png
library: Mermaid
bloom_level: Understand
---

# CQL-to-ELM Compilation Pipeline

<iframe src="main.html" width="100%" height="1006px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

The same rule appears twice here in two very different forms. The CQL reads almost as a sentence: there exists a Condition drawn from the diabetes value set whose clinical status is active. The compiled ELM expresses that identically as an expression tree — `Exists` wrapping a `Query` wrapping a `Retrieve` — which is what an engine can actually walk. Reading them side by side is the exercise; the correspondence is exact and worth tracing element by element. The patient buttons then run that one rule against two patients whose diabetes Conditions differ only in `clinicalStatus`. The retrieve returns a resource for both. The `where` clause is what separates them, which is a useful thing to have seen before writing a cohort query of your own.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 12-18 minutes. Prerequisites: FHIR Condition resources, and the idea that a value set selects codes from a code system.

**Learning objective:** Given a CQL define statement, the learner can explain each stage of its compilation into ELM and translate between the CQL authoring format and its corresponding ELM fragment.

1. **Explore:** Select **CQL Library** and **Expression Logical Model** in turn. Point at the exact ELM node produced by `exists`, by `[Condition: "Diabetes"]`, and by the `where` clause.
2. **Explain:** Switch to Jordan Ellis and step through the reasoning module. Explain why the retrieve still returns a resource for a patient whose diabetes is resolved, and what that says about relying on diagnosis codes alone to define a cohort.
3. **Transfer:** Write, in plain CQL-like prose, a define statement for patients with an active hypertension diagnosis. Say which part of your statement would become a `Retrieve` and which would become the `where`.

Assessment: use the Explain prompt as an exit ticket. A complete response separates value-set membership from clinical status, and names the cohort error that follows from conflating them.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/cql-to-elm-compilation-pipeline/main.html" width="100%" height="1006px"></iframe>
```

[JavaScript source](cql-to-elm-compilation-pipeline.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 23: Clinical Guideline Authoring and Clinical Quality Language](../../chapters/23-clinical-guideline-authoring-and-cql/index.md).

```text
Type: workflow
**sim-id:** cql-to-elm-compilation-pipeline<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: explain, translate<br/>
Learning objective: Given a CQL define statement, the learner can explain each stage of its compilation into ELM and translate between the CQL authoring format and its corresponding ELM fragment.

Purpose: Trace the "Has Diabetes" define statement from human-authored CQL text through compilation to ELM to runtime evaluation by a Clinical Reasoning Module, using the exact worked example from the surrounding prose.

Components to show (left-to-right Mermaid flowchart):
- Node "CQL Library (.cql file)" (blue) — shows the DiabetesControlMeasure library text
- Node "CQL Compiler" (orange) — the translation step
- Node "Expression Logical Model (ELM, JSON/XML)" (green) — shows the compiled ELM fragment
- Node "Clinical Reasoning Module" (purple) — the runtime engine
- Node "Patient FHIR Resources" (pink, feeding into the Clinical Reasoning Module) — Maria Chen's Condition and Observation resources from Chapter 22
- Node "Evaluation Result" (yellow) — true/false or measure output

Connections: CQL Library → CQL Compiler → ELM → Clinical Reasoning Module (also receiving Patient FHIR Resources as a second input) → Evaluation Result

Interactive controls:
- Click "CQL Library" to see the full authoring-format text
- Click "Expression Logical Model" to see the compiled JSON fragment
- Click "Clinical Reasoning Module" to see, step by step, how it walks the ELM tree against Maria Chen's actual Condition resource (active Type 2 Diabetes) to reach a "true" result for "Has Diabetes"
- Toggle to swap in a patient with no active diabetes Condition and see the Evaluation Result change to "false"

Instructional Rationale: A clickable pipeline that lets the learner inspect both the CQL and ELM text for the identical logic, then watch it evaluated against two different patients, directly supports the Understand-level objective of translating between the two representations and explaining what changes (and does not change) at each stage.

Implementation: Mermaid flowchart with click handlers routed to code-display infoboxes; responsive width.
```

## Related Resources

- [Chapter 23: Clinical Guideline Authoring and Clinical Quality Language](../../chapters/23-clinical-guideline-authoring-and-cql/index.md)

## References

- [Source chapter](../../chapters/23-clinical-guideline-authoring-and-cql/index.md) — supplied the learning objective and the worked example.
- [Mermaid flowchart documentation](https://mermaid.js.org/syntax/flowchart.html) — subgraphs, click directives, and class styling (accessed September 8, 2026).
- [HL7 Clinical Quality Language specification](https://cql.hl7.org/) — the authoring language and its translation to ELM (accessed September 8, 2026).
- [Wikipedia: Abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) — the general idea that ELM instantiates for clinical logic.
