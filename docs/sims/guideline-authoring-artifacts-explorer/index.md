---
title: "Guideline Authoring Artifacts Explorer"
description: "See one diabetes-screening rule as narrative, decision table, flowchart, and user story, with color-linked highlighting across all four."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/guideline-authoring-artifacts-explorer/guideline-authoring-artifacts-explorer.png
og:image: /sims/guideline-authoring-artifacts-explorer/guideline-authoring-artifacts-explorer.png
library: vis-network
bloom_level: Analyze
---

# Guideline Authoring Artifacts Explorer

<iframe src="main.html" width="100%" height="907px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

Four panels, one rule, and no difference in content — only in what each form makes impossible to leave out. Selecting a concept highlights it in every panel at once, which is the fastest way to notice that the flowchart is the only artifact where the false branch must be drawn, and the user story is the only one that says why anyone cares. The 'What it loses' notes on each panel heading are the argument: prose hides a logical connective inside the word 'and'; a table says what to do but not when; a diagram has no room for 'unless the patient is an athlete'; a story has no threshold a compiler could check. **Classify This** then presents four unlabeled artifacts and asks which form each one is.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 12-18 minutes. Prerequisites: the idea that the same content can be represented at different levels of formality.

**Learning objective:** Given the same diabetes-screening guideline expressed as a narrative sentence, a decision table row, a flowchart branch, and a user story, the learner can differentiate what each artifact type captures that the others do not, and classify a new artifact example by type.

1. **Explore:** Select each of the four concepts in turn and watch where it lands. Note that 'No prior diagnosis' has no panel of its own in the flowchart — find where it went and why.
2. **Explain:** Select each panel heading and read what that form loses. Explain which single loss you would find most dangerous if this rule were being handed to an implementation team, and why.
3. **Transfer:** Run **Classify This** to the end. For any item you got wrong, write the one feature of the text that should have given it away.

Assessment: use the Explain prompt as an exit ticket. A complete response names a specific loss, ties it to a concrete implementation failure, and distinguishes a gap in the artifact from a gap in the underlying guideline.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/guideline-authoring-artifacts-explorer/main.html" width="100%" height="907px"></iframe>
```

[JavaScript source](guideline-authoring-artifacts-explorer.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 23: Clinical Guideline Authoring and Clinical Quality Language](../../chapters/23-clinical-guideline-authoring-and-cql/index.md).

```text
Type: infographic
**sim-id:** guideline-authoring-artifacts-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: differentiate, classify<br/>
Learning objective: Given the same diabetes-screening guideline expressed as a narrative sentence, a decision table row, a flowchart branch, and a user story, the learner can differentiate what each artifact type captures that the others do not, and classify a new artifact example by type.

Purpose: Show the same underlying guideline content transformed into four different Forms/UI Tier artifacts side by side, so the learner sees concretely what each format adds or loses relative to the others.

Components to show (four-panel layout, one panel per artifact type):
- Panel 1 "Narrative": the plain-text guideline sentence
- Panel 2 "Decision Table": a two-column table (Condition | Action) with the same rule as one row
- Panel 3 "Clinical Flowchart": a small branching diagram with two decision diamonds leading to the recommended action
- Panel 4 "Clinical User Story": the "As a... I want... so that..." formatted story, tagged with its Clinical Persona (Dr. Priya Nair)

Interactive controls:
- Click any panel to expand it and highlight, in the other three panels, which words or cells correspond to the same underlying condition or action (color-linked highlighting across panels)
- A "Classify This" mini-quiz mode: a new short guideline artifact is shown, and the learner clicks which of the four panel types it belongs to, with immediate feedback

Instructional Rationale: Side-by-side, color-linked panels directly support the Analyze-level objective by making the same content's different representations simultaneously visible and comparable, rather than requiring the learner to hold each format in memory separately while comparing them.

Implementation: vis-network or custom HTML/CSS grid with JavaScript-driven cross-panel highlighting; responsive width.
```

## Related Resources

- [Chapter 23: Clinical Guideline Authoring and Clinical Quality Language](../../chapters/23-clinical-guideline-authoring-and-cql/index.md)

## References

- [Source chapter](../../chapters/23-clinical-guideline-authoring-and-cql/index.md) — supplied the learning objective and the worked example.
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) — node shapes, edge properties, and interaction options (accessed September 8, 2026).
- [Wikipedia: Decision table](https://en.wikipedia.org/wiki/Decision_table) — the completeness property panel 2 relies on.
- [Wikipedia: User story](https://en.wikipedia.org/wiki/User_story) — the form used in panel 4 and the role of its 'so that' clause.
