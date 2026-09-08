---
title: "Clinical NLP Pipeline Explorer"
description: "Step a clinical note through named entity recognition, classification, and sentiment analysis, inspecting the concrete output of each stage."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/clinical-nlp-pipeline-explorer/clinical-nlp-pipeline-explorer.png
og:image: /sims/clinical-nlp-pipeline-explorer/clinical-nlp-pipeline-explorer.png
library: Mermaid
bloom_level: Apply
---

# Clinical NLP Pipeline Explorer

<iframe src="main.html" width="100%" height="958px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

Most of what is known about a patient is written in prose, and prose is not traversable. This MicroSim runs one clinical note through three narrowing stages and shows exactly what each contributes. Named entity recognition types spans without judging the note; classification consumes the whole note and returns one label; sentiment analysis returns a tone label that is informative for patient-authored text and beside the point for a clinician's. The final panel shows the assembled facts as they would enter a graph -- a `Medication` node joined by a `PRESCRIBED` edge, symptoms joined by `REPORTED` edges carrying the note's date. The dropdown swaps in a patient portal message so the same five stages can be compared across a clinician's register and a patient's.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10-15 minutes. Prerequisites: nodes, edges, and properties, and the difference between structured and unstructured data.

**Learning objective:** Given a raw clinical note, the learner can demonstrate how a clinical NLP pipeline applies named entity recognition, text classification, and sentiment analysis in sequence, and can apply the same sequence to a new note.

1. **Explore:** Run the clinician note through all five stages. Note which entity types the recognizer found and which it did not -- there is no `DIAGNOSIS` span, even though a reader infers one.
2. **Explain:** Switch to the patient portal message and compare stage 3 with stage 4. Explain why the anxious tone is useful for routing and dangerous as a proxy for clinical severity.
3. **Transfer:** Write two sentences of a plausible clinical note of your own and mark the spans you would expect each entity type to catch. Name one span you are unsure about and say what would settle it.

Assessment: use the Explain prompt as an exit ticket. A complete response distinguishes what the classifier consumed from what it returned, and separates a claim about routing priority from a claim about clinical acuity.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/clinical-nlp-pipeline-explorer/main.html" width="100%" height="958px"></iframe>
```

[JavaScript source](clinical-nlp-pipeline-explorer.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 21: Responsible AI and Agentic Systems](../../chapters/21-responsible-ai-and-agentic-systems/index.md).

```text
Type: workflow
**sim-id:** clinical-nlp-pipeline-explorer<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: demonstrate, apply<br/>
Learning objective: Given a raw clinical note, the learner can demonstrate how a clinical NLP pipeline applies named entity recognition, text classification, and sentiment analysis in sequence, and can apply the same sequence to a new note.

Purpose: Let the learner step a sample clinical note through a three-stage NLP pipeline and see the structured output produced at each stage, reinforcing that unstructured text becomes graph-ready facts through a sequence of narrowing extraction steps.

Components to show (Mermaid flowchart, left to right):
- Node A: "Raw Clinical Note" (gray) — the example sentence about shortness of breath and furosemide
- Node B: "Named Entity Recognition" (blue) — extracts SYMPTOM, MEDICATION, DOSAGE, FREQUENCY spans
- Node C: "Text Classification" (green) — assigns an ACUITY label to the note as a whole
- Node D: "Sentiment Analysis" (orange) — assigns a tone label when the source is patient-authored text
- Node E: "Structured Output" (purple) — the final extracted facts, shown as a small property list ready to become graph nodes/edges

Connections: A → B → C → D → E, straight left-to-right flow with labeled arrows describing what transforms at each step ("extracts spans", "labels acuity", "labels tone", "assembles facts")

Data Visibility Requirements:
Stage 1: Show the full raw sentence as plain text in Node A's expanded panel.
Stage 2: On click of Node B, show the exact extracted entity list with span highlighting color-coded by entity type.
Stage 3: On click of Node C, show the acuity label and a one-sentence justification referencing which entities drove the classification.
Stage 4: On click of Node D, show the sentiment/tone label with its justification.
Stage 5: On click of Node E, show the final structured JSON-like fact list, and a callout noting these facts become new graph nodes and edges.

Interactive controls:
- Click directive on every Mermaid node (`click A call showInfo(...)` etc.) opening an infobox with that stage's detailed output
- Dropdown to swap in a second example clinical note and re-run the same five-stage walkthrough

Instructional Rationale: A step-through, click-to-reveal flowchart matches the Apply-level objective by requiring the learner to actively trigger each stage's transformation and inspect concrete extracted values, rather than watching a passive animation that would obscure exactly what each NLP stage contributes.

Implementation: Mermaid flowchart with click handlers routed to a JavaScript infobox panel; responsive width, fixed step order.
```

## Related Resources

- [Chapter 21: Responsible AI and Agentic Systems](../../chapters/21-responsible-ai-and-agentic-systems/index.md)

## References

- [Source chapter](../../chapters/21-responsible-ai-and-agentic-systems/index.md) — supplied the learning objective and the worked example.
- [Mermaid flowchart documentation](https://mermaid.js.org/syntax/flowchart.html) — subgraphs, click directives, and class styling (accessed September 8, 2026).
- [Wikipedia: Named-entity recognition](https://en.wikipedia.org/wiki/Named-entity_recognition) — the extraction task shown in stage 1.
- [Wikipedia: Natural language processing](https://en.wikipedia.org/wiki/Natural_language_processing) — background on the pipeline pattern of successive narrowing stages.
