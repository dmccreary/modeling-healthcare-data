---
title: "PlanDefinition to ActivityDefinition Trigger Flow"
description: "Set a patient's age, BMI, and diagnosis status and watch a FHIR PlanDefinition's criteria decide whether its ActivityDefinition fires."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/plandefinition-activitydefinition-trigger-flow/plandefinition-activitydefinition-trigger-flow.png
og:image: /sims/plandefinition-activitydefinition-trigger-flow/plandefinition-activitydefinition-trigger-flow.png
library: vis-network
bloom_level: Apply
---

# PlanDefinition to ActivityDefinition Trigger Flow

<iframe src="main.html" width="100%" height="823px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

The PlanDefinition and the ActivityDefinition are both patient-independent: one states criteria, the other is a template for an order, and neither names a person. Only the evaluation in the middle knows anything about a specific patient, and only when it reads TRUE does a concrete order come into existence — with `"status": "draft"`, because the guideline proposes and a clinician still signs. The sliders make the AND visible: raise the age past 70 or drop BMI below 25 and one unmet clause is enough to turn the whole thing false. The exclusion checkbox is the clause most often forgotten in hand-written care-gap rules, and its absence is what produces screening reminders for patients who already carry the diagnosis.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10-15 minutes. Prerequisites: FHIR resources, and the idea of a rule with several conditions joined by AND.

**Learning objective:** Given a patient's age and BMI values, the learner can apply a PlanDefinition's trigger criteria to determine whether its referenced ActivityDefinition fires for that patient.

1. **Explore:** Find a combination where exactly one criterion fails and confirm the result is FALSE. Then find the narrowest change that flips it to TRUE.
2. **Explain:** Tick the diabetes-diagnosis box with age and BMI still in range. Explain why a screening rule needs this exclusion, and what a system without it would send to a patient already in treatment.
3. **Transfer:** Select the ActivityDefinition while the result is TRUE and read the generated order. Explain what `"status": "draft"` implies about where clinical accountability sits, and name one thing that would have to change for that status to be `active`.

Assessment: use the Transfer prompt as an exit ticket. A complete response locates accountability with the signing clinician, explains what draft status protects against, and distinguishes a proposed order from an issued one.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/plandefinition-activitydefinition-trigger-flow/main.html" width="100%" height="823px"></iframe>
```

[JavaScript source](plandefinition-activitydefinition-trigger-flow.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 22: FHIR Resources and Levels of Knowledge Representation](../../chapters/22-fhir-resources-and-knowledge-representation/index.md).

```text
Type: graph-model
**sim-id:** plandefinition-activitydefinition-trigger-flow<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: apply, demonstrate<br/>
Learning objective: Given a patient's age and BMI values, the learner can apply a PlanDefinition's trigger criteria to determine whether its referenced ActivityDefinition fires for that patient.

Purpose: Let the learner test different patient ages and BMI values against the diabetes-screening PlanDefinition's criteria and see, in real time, whether the ActivityDefinition action would be triggered.

Components to show:
- Node "PlanDefinition: Diabetes Screening Guideline" (blue box) — displays its trigger criteria as readable text (age 35-70, BMI >= 25, no active diabetes diagnosis)
- Node "Patient Data Inputs" (pink box) — sliders for age (18-90) and BMI (15-45), and a toggle for "has active diabetes diagnosis"
- Node "Evaluation Result" (yellow diamond) — shows TRUE/FALSE based on current slider values
- Node "ActivityDefinition: Order HbA1c Test" (green box) — highlights and animates only when Evaluation Result is TRUE, showing the generated patient-specific order

Connections: Patient Data Inputs → Evaluation Result (labeled "criteria checked against"); Evaluation Result → ActivityDefinition (labeled "triggers, if true")

Interactive controls:
- Sliders for age and BMI, toggle for existing diabetes diagnosis, all live-updating the Evaluation Result node
- Click on the PlanDefinition node to see its full trigger-criteria text; click the ActivityDefinition node (when triggered) to see the resulting patient-specific order as JSON

Instructional Rationale: Live sliders that immediately re-evaluate the trigger condition match the Apply-level objective, requiring the learner to test specific input combinations and observe the resulting pass/fail outcome rather than only reading the criteria as static text.

Implementation: vis-network for the node layout combined with p5.js-style slider controls; responsive width.
```

## Related Resources

- [Chapter 22: FHIR Resources and Levels of Knowledge Representation](../../chapters/22-fhir-resources-and-knowledge-representation/index.md)

## References

- [Source chapter](../../chapters/22-fhir-resources-and-knowledge-representation/index.md) — supplied the learning objective and the worked example.
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) — node shapes, edge properties, and interaction options (accessed September 8, 2026).
- [HL7 FHIR PlanDefinition resource](https://hl7.org/fhir/plandefinition.html) — the artifact whose criteria are evaluated here (accessed September 8, 2026).
- [HL7 FHIR ActivityDefinition resource](https://hl7.org/fhir/activitydefinition.html) — the order template applied when the criteria are met (accessed September 8, 2026).
