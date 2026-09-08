---
title: "Care Setting Acuity Flow Diagram"
description: "Trace one encounter from emergency department triage to discharge, watching the admit branch and the boarding-time edge property change with acuity."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/care-setting-acuity-flow-diagram/care-setting-acuity-flow-diagram.png
og:image: /sims/care-setting-acuity-flow-diagram/care-setting-acuity-flow-diagram.png
library: vis-network
bloom_level: Analyze
---

# Care Setting Acuity Flow Diagram

<iframe src="main.html" width="100%" height="930px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

Emergency department care and inpatient care are two different encounters for the same patient, joined by one decision — and this MicroSim makes that boundary something you can trace rather than something you are told. The acuity slider moves the admit probability, so at ESI 2 the path runs through an inpatient unit and at ESI 4 it goes home. The edge into the inpatient unit carries `boarding_time_hours`, colored green under two hours, amber to four, and red beyond: capacity strain as an observable property of a relationship rather than an abstraction. The unit buttons then compare ICU, Med-Surg, and Telemetry, and the closing detail is worth noticing — length of stay is measured from inpatient admission, so boarding hours never appear in it at all.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 12-18 minutes. Prerequisites: nodes, edges, and edge properties, and the idea that an encounter is a modeled entity rather than a date range.

**Learning objective:** Given a patient's triage acuity level and the resulting admit decision, the learner can differentiate Emergency Department care from Inpatient Care by tracing the decision path and examining how boarding time reflects capacity strain.

1. **Explore:** Move the acuity slider from ESI 1 to ESI 5 and watch which branch is taken. Note that time-to-decision does not fall monotonically with severity, and read the ESI 3 note for why.
2. **Explain:** Set ESI 2 and switch between the three inpatient units. Explain why Med-Surg shows the longest boarding time despite having the largest bed pool.
3. **Transfer:** A hospital reports that its average length of stay improved this quarter while emergency department boarding rose. Explain how both can be true at once, and name the measurement boundary that permits it.

Assessment: use the Transfer prompt as an exit ticket. A complete response identifies where the length-of-stay clock starts, explains that boarding sits before it, and distinguishes a genuine improvement from a measurement artifact.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/care-setting-acuity-flow-diagram/main.html" width="100%" height="930px"></iframe>
```

[JavaScript source](care-setting-acuity-flow-diagram.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 12: Provider Organizations, Networks, and Scheduling](../../chapters/12-provider-organizations-networks-scheduling/index.md).

```text
Type: workflow
**sim-id:** care-setting-acuity-flow-diagram<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, differentiate<br/>
Learning objective: Given a patient's triage acuity level and the resulting admit decision, the learner can differentiate Emergency Department care from Inpatient Care by tracing the decision path and examining how boarding time reflects capacity strain.

Purpose: Show how a single patient encounter moves through the graph from ED triage to either discharge or a specific inpatient unit, making the ED-versus-inpatient distinction concrete as a traversal rather than an abstract label, and surfacing capacity strain (ED boarding) as a directly observable edge property.

Components to show:
- "ED Triage" node — properties: `esi_level` (1-5, editable via control), `arrival_time`
- "Admit Decision" node — properties: `decision_time`, `decision` (Admit / Discharge)
- "Discharge Home" terminal node
- "Inpatient Unit" node, sub-typed by Hospital Department: ICU, Med-Surg, Telemetry (three selectable variants shown as a small cluster)
- "Discharge" terminal node reached after the inpatient stay

Connections:
- ED Triage → Admit Decision (edge property: `time_to_decision_minutes`)
- Admit Decision → Discharge Home (only when decision = Discharge)
- Admit Decision → Inpatient Unit (edge property: `boarding_time_hours` — the wait for a bed to open; only when decision = Admit)
- Inpatient Unit → Discharge (edge property: `length_of_stay_days`)

Style: Left-to-right workflow diagram with a decision diamond at "Admit Decision" and rectangular process nodes elsewhere; the three Inpatient Unit sub-types shown as parallel branches so the learner can compare them side by side.

Data Visibility Requirements:
Stage 1: Show the ED Triage node with a visible esi_level value (default 3) and arrival_time.
Stage 2: On click of Admit Decision, show the decision_time and the resulting branch (Admit or Discharge) highlighted.
Stage 3: If Admit, show the boarding_time_hours value on the edge into the chosen Inpatient Unit, color-coded (green under 2 hours, amber 2-4, red over 4) so capacity strain is visible at a glance.
Stage 4: Show the final length_of_stay_days on the edge into Discharge, differentiated by which Inpatient Unit sub-type was selected (ICU stays trend longer than Med-Surg).

Interactive controls:
- Slider: ESI level (1-5) — changes the likelihood and color emphasis of the Admit branch to reflect that lower ESI numbers (more severe) more often lead to admission
- Click on any node: opens an infobox with that node's definition, typical volumes (e.g., "roughly 130 million ED visits occur annually in the U.S., with about 12% resulting in admission"), and typical timeframes
- Toggle: switch the Inpatient Unit branch between ICU, Med-Surg, and Telemetry to compare typical length_of_stay_days and boarding_time_hours for each
- Reset button to return to default ESI level 3

Instructional Rationale: An Analyze-level objective (differentiate, examine) requires the learner to trace a decision path and compare branches, not just recall a definition. A clickable workflow with a color-coded, editable boarding_time_hours property makes capacity strain -- an abstract operations concept -- into something the learner can directly manipulate and observe, which supports the differentiate/examine verbs far better than a static description of "ED vs. inpatient care" ever could.

Color scheme: Blue for ED-side nodes, green for discharge outcomes, orange/red gradient for boarding_time_hours severity, purple for Inpatient Unit sub-types

Implementation: vis-network JavaScript library with a hierarchical left-to-right layout; click handlers open a side infobox rather than a modal so the diagram stays visible while reading
```

## Related Resources

- [Chapter 12: Provider Organizations, Networks, and Scheduling](../../chapters/12-provider-organizations-networks-scheduling/index.md)

## References

- [Source chapter](../../chapters/12-provider-organizations-networks-scheduling/index.md) — supplied the learning objective and the worked example.
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) — node shapes, edge properties, and interaction options (accessed September 8, 2026).
- [Wikipedia: Emergency Severity Index](https://en.wikipedia.org/wiki/Emergency_Severity_Index) — the five-level triage scale used by the slider.
- [Wikipedia: Emergency department boarding](https://en.wikipedia.org/wiki/Emergency_department_boarding) — background on the capacity measure shown as an edge property.
