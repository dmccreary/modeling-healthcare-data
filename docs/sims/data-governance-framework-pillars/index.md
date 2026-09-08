---
title: "Data Governance Framework Pillars"
description: "Remove any one of the five governance pillars and watch the beam it supports tilt, using a wearable-device data source as the running example."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/data-governance-framework-pillars/data-governance-framework-pillars.png
og:image: /sims/data-governance-framework-pillars/data-governance-framework-pillars.png
library: p5.js
bloom_level: Analyze
---

# Data Governance Framework Pillars

<iframe src="main.html" width="100%" height="702px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

A wearable-device vendor wants to feed continuous heart-rate and step data into the patient graph. Five pillars each own one accountability question about that decision, and the MicroSim lets you test the chapter's claim that none is optional by removing one and watching the beam tilt. What the removal panel adds is a description of the specific failure each absence produces — and they are not interchangeable. Without Policy, retention gets decided by a database default. Without Quality, a dead battery reads as immobility. Without Security, the feed works perfectly and is reachable by anyone. The Compliance pillar is the one worth dwelling on: the other four answer 'can we?' and 'should we?', and only this one answers 'are we permitted to?'

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10-15 minutes. Prerequisites: the idea of a data source being onboarded into an existing system.

**Learning objective:** Given a new-data-source scenario, the learner can differentiate which of the five governance pillars (policy, roles, quality, security, compliance) is responsible for a specific accountability question and examine how the pillars interact.

1. **Explore:** Select each pillar and read its accountability question. Note that no two questions overlap, which is what makes them pillars rather than aspects of one thing.
2. **Explain:** Remove Quality and read the failure it produces. Explain why this is the pillar whose absence is hardest to notice, and contrast it with Security, whose absence is invisible until it is catastrophic.
3. **Transfer:** Pick a different new data source — a regional health information exchange feed, say — and write the one sentence each pillar would contribute to the decision to accept it. Name the pillar you found hardest to fill in and why.

Assessment: use the Explain prompt as an exit ticket. A complete response distinguishes a silent failure from a catastrophic one, and explains why detectability rather than severity is what separates them.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/data-governance-framework-pillars/main.html" width="100%" height="702px"></iframe>
```

[JavaScript source](data-governance-framework-pillars.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 27: Data Governance and Metadata Management](../../chapters/27-data-governance-and-metadata-management/index.md).

```text
Type: infographic
**sim-id:** data-governance-framework-pillars<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: differentiate, examine<br/>
Learning objective: Given a new-data-source scenario, the learner can differentiate which of the five governance pillars (policy, roles, quality, security, compliance) is responsible for a specific accountability question and examine how the pillars interact.

Purpose: Make the five interlocking pillars of a data governance framework concrete using the wearable-device data source scenario from the preceding worked example.

Components to show: Five vertical pillar shapes arranged side by side, each labeled: Policy, Roles, Quality, Security, Compliance. A horizontal beam across the top labeled "Trusted, Governed Data" rests on all five pillars.

Data Visibility Requirements:
Stage 1: Show the five pillars unlabeled with only their names, beam resting on top.
Stage 2: On click of a pillar, show that pillar's accountability question (e.g., Policy: "What rules govern data use, retention, and sharing?") and the specific wearable-device-vendor decision it governs from the worked example, in a side panel.
Stage 3: On click of the "Remove a Pillar" toggle for any single pillar, animate that pillar sliding out and the beam visibly tilting/dropping on that side, illustrating a governance blind spot.

Interactive controls:

- Click each pillar to reveal its accountability question and worked-example decision
- Toggle button per pillar: "Remove this pillar" to visually demonstrate what happens when that governance function is missing
- Reset button to restore all five pillars

Instructional Rationale: The Analyze-level objective (differentiate, examine) is served by letting learners actively remove a pillar and see the structural consequence, rather than just reading a labeled diagram — this mirrors the "skip any one pillar" claim in the preceding prose and lets the learner verify it interactively rather than take it on faith.

Layout: Horizontal row of five pillars, responsive width, fixed height, reflows pillar spacing on window resize.

Color scheme: Each pillar a distinct color (policy blue, roles teal, quality green, security orange, compliance purple); the beam is gray and turns red when tilted.

Implementation: p5.js with simple physics-free tilt animation triggered by button state.
```

## Related Resources

- [Chapter 27: Data Governance and Metadata Management](../../chapters/27-data-governance-and-metadata-management/index.md)

## References

- [Source chapter](../../chapters/27-data-governance-and-metadata-management/index.md) — supplied the learning objective and the worked example.
- [p5.js reference](https://p5js.org/reference/) — canvas, drawing, and input handling (accessed September 8, 2026).
- [p5.js web editor](https://editor.p5js.org/) — paste the JavaScript source to experiment; no hosted sketch has been published.
- [Wikipedia: Data governance](https://en.wikipedia.org/wiki/Data_governance) — the framework whose five functions these pillars represent.
