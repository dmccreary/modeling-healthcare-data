---
title: "CodeSystem, ValueSet, and Terminology Binding Explorer"
description: "Change a binding strength and watch three incoming LOINC codes be accepted, flagged, or rejected against a curated LDL cholesterol value set."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/terminology-binding-explorer/terminology-binding-explorer.png
og:image: /sims/terminology-binding-explorer/terminology-binding-explorer.png
library: vis-network
bloom_level: Apply
---

# CodeSystem, ValueSet, and Terminology Binding Explorer

<iframe src="main.html" width="100%" height="1143px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

Three layers, and one decision that governs them. A code system supplies the vocabulary; a value set selects from it; a binding attaches a data element to that selection at a stated strength. The verdict panel is where the abstraction becomes concrete: a member code is accepted under every strength, so binding strength only ever governs what happens to codes that are *not* members. Watch the middle row — a real LOINC code for total cholesterol, from the same lipid panel, wrong for this element. It is rejected under `required` and `extensible`, tolerated under `preferred`, and unremarkable under `example`. That middle case is the one binding strength exists to adjudicate, and reading an `example` binding as if it were a constraint is a common and expensive misreading of a specification.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 12-18 minutes. Prerequisites: clinical code systems, and the idea that a data element can be constrained to a set of allowed values.

**Learning objective:** Given a new clinical data element and a choice of binding strength, the learner can apply the CodeSystem-ValueSet-binding chain to determine which codes would and would not be considered valid.

1. **Explore:** Cycle through all four binding strengths and watch which verdicts move. Note that the first row never changes and say why that is necessarily so.
2. **Explain:** Compare `required` and `extensible` on the total-cholesterol row. Explain why `extensible` still rejects it, given that `extensible` is the weaker of the two.
3. **Transfer:** You are binding a new data element for a patient's preferred language. Choose a binding strength and defend it. Then say what would go wrong under each of the three you did not choose.

Assessment: use the Transfer prompt as an exit ticket. A complete response picks a strength, names the failure mode of at least two alternatives, and distinguishes a closed value domain from an open one.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/terminology-binding-explorer/main.html" width="100%" height="1143px"></iframe>
```

[JavaScript source](terminology-binding-explorer.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 23: Clinical Guideline Authoring and Clinical Quality Language](../../chapters/23-clinical-guideline-authoring-and-cql/index.md).

```text
Type: graph-model
**sim-id:** terminology-binding-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: apply, demonstrate<br/>
Learning objective: Given a new clinical data element and a choice of binding strength, the learner can apply the CodeSystem-ValueSet-binding chain to determine which codes would and would not be considered valid.

Purpose: Show the three-layer relationship between a full CodeSystem, a curated ValueSet drawn from it, and a terminology binding connecting a guideline data element to that ValueSet, using the LDL Cholesterol worked example.

Components to show:
- Node "LOINC CodeSystem" (large gray circle) — labeled "tens of thousands of codes," containing many small dimmed dots representing uncurated codes
- Node "LDL Cholesterol Lab Tests ValueSet" (blue circle, subset highlighted within the CodeSystem) — containing 3-4 specific LOINC codes shown as bright dots (e.g., 2089-1, 13457-7, 18262-6)
- Node "Guideline Data Element: 'LDL Cholesterol'" (orange box) — connects via a labeled "terminology binding" edge to the ValueSet node
- Dropdown/selector for binding strength: required, extensible, preferred, example

Interactive controls:
- Click any of the bright LOINC code dots inside the ValueSet to see its full code and display name
- Change the binding-strength dropdown and see a live-updated verdict panel showing, for three example incoming codes (one inside the ValueSet, one a plausible-but-different cholesterol code outside it, one an unrelated lab code), whether each would be accepted, allowed-with-caution, or rejected under the currently selected binding strength
- Hover the CodeSystem node to see its governance body (Regenstrief Institute for LOINC) and its total code count

Instructional Rationale: A live verdict panel that recomputes accept/reject outcomes as the learner changes the binding strength directly supports the Apply-level objective, letting the learner test the consequence of each binding strength choice on concrete example codes rather than only reading the four definitions.

Implementation: vis-network for the CodeSystem/ValueSet/binding graph plus a JavaScript-driven verdict panel; responsive width.
```

## Related Resources

- [Chapter 23: Clinical Guideline Authoring and Clinical Quality Language](../../chapters/23-clinical-guideline-authoring-and-cql/index.md)

## References

- [Source chapter](../../chapters/23-clinical-guideline-authoring-and-cql/index.md) — supplied the learning objective and the worked example.
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) — node shapes, edge properties, and interaction options (accessed September 8, 2026).
- [HL7 FHIR terminology binding](https://hl7.org/fhir/terminologies.html#strength) — the normative definitions of the four strengths (accessed September 8, 2026).
- [LOINC](https://loinc.org/) — the code system shown, maintained by the Regenstrief Institute (accessed September 8, 2026).
