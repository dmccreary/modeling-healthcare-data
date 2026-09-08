---
title: "CMS CQL Measure Development and Certification Pipeline"
description: "Sequence the CMS authoring, testing, compilation, and certification tools a quality measure passes through, and see which legacy tools they replaced."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/cms-cql-measure-certification-pipeline/cms-cql-measure-certification-pipeline.png
og:image: /sims/cms-cql-measure-certification-pipeline/cms-cql-measure-certification-pipeline.png
library: vis-timeline
bloom_level: Understand
---

# CMS CQL Measure Development and Certification Pipeline

<iframe src="main.html" width="100%" height="445px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

Seven phases, and a useful way to read them: steps 1 through 4 never touch a real patient, step 5 certifies the vendor's engine rather than the measure, only step 6 runs against real data, and step 7 is where the result adjusts payment. That last fact is why everything upstream is specified so tightly — an ambiguity introduced while authoring becomes a payment difference at submission. Each phase names the tool involved and points back at the concept it corresponds to, so the pipeline doubles as an index of the surrounding chapters. **Show legacy path** overlays the pre-2022 route through MAT and Bonnie, aligned under the modern phases they were replaced by, which is worth seeing because both names still appear in older CMS documentation.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10-15 minutes. Prerequisites: CQL and the Expression Logical Model, and the four measure populations.

**Learning objective:** Given the names of the CMS-sponsored authoring, testing, and certification tools, the learner can sequence them correctly along the measure development pipeline and summarize what role each plays.

1. **Explore:** Select all seven phases in order and note where the boundary falls between rehearsal and real patient data.
2. **Explain:** Select phase 5. Explain what Cypress certifies and what it does not, and why two hospitals running the same compiled measure could otherwise report different rates.
3. **Transfer:** Reveal the legacy path and select both legacy items. Explain the specific failure the MAT-and-Bonnie split allowed, and name the property of the consolidated tooling that closes it.

Assessment: use the Transfer prompt as an exit ticket. A complete response describes drift between the tested and published artifacts, and ties the fix to removing the export hand-off rather than to any change in the CQL itself.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/cms-cql-measure-certification-pipeline/main.html" width="100%" height="445px"></iframe>
```

[JavaScript source](cms-cql-measure-certification-pipeline.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 24: CDS Hooks, Care Alerts, and CMS CQL Tooling](../../chapters/24-cds-hooks-alerts-and-cms-cql-tooling/index.md).

```text
Type: timeline
**sim-id:** cms-cql-measure-certification-pipeline<br/>
**Library:** vis-timeline<br/>
**Status:** Specified

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: summarize, sequence<br/>
Learning objective: Given the names of the CMS-sponsored authoring, testing, and certification tools, the learner can sequence them correctly along the measure development pipeline and summarize what role each plays.

Purpose: Lay out the full journey of a measure from initial authoring through EHR certification and live quality reporting, naming every CMS tool and standard this section introduced in the order a real measure would pass through them.

Phases (left to right):
1. "Author in MADiE" — knowledge engineer writes CQL library and population criteria (references CQF Recommendations IG for correct resource shaping)
2. "Quick-Test Fragments in CQL Runner" — ad hoc testing of individual define statements
3. "Full Measure Testing" — synthetic patient test cases run against the complete measure bundle (the role Bonnie historically played, now integrated into MADiE)
4. "CQL-to-ELM Compilation" — the measure's CQL library compiles to ELM for execution
5. "EHR Vendor Certification via Cypress" — the vendor's CQL execution engine is certified against standardized test cases
6. "Live eCQM Evaluation" — the compiled measure runs automatically against real patient data inside the certified EHR's Clinical Reasoning Module
7. "Quality Reporting Architecture Submission" — aggregated results submitted to CMS (e.g., MIPS), tying measure performance to reimbursement

Interactive features:
- Hover any phase for a one-sentence description of the tool or standard involved
- Click a phase to open a fuller explanation, including which chapter concept it corresponds to (e.g., clicking phase 4 recalls the CQL Compiler and Expression Logical Model from Chapter 23)
- A "Legacy Path" toggle that overlays the older MAT-and-Bonnie route (before MADiE's 2022+ consolidation) alongside the modern MADiE-centered route, so the learner can see what changed

Instructional Rationale: A sequenced timeline with a legacy-vs-modern toggle matches the Understand-level objective of correctly ordering and summarizing each tool's role, while also making visible how the tooling ecosystem itself evolved — a detail that helps the learner recognize older tool names (MAT, Bonnie) they may still encounter in existing documentation.

Implementation: vis-timeline JavaScript library with click-to-expand detail panels; responsive width.
```

## Related Resources

- [Chapter 24: CDS Hooks, Care Alerts, and CMS CQL Tooling](../../chapters/24-cds-hooks-alerts-and-cms-cql-tooling/index.md)

## References

- [Source chapter](../../chapters/24-cds-hooks-alerts-and-cms-cql-tooling/index.md) — supplied the learning objective and the worked example.
- [vis-timeline documentation](https://visjs.github.io/vis-timeline/docs/timeline/) — items, groups, and selection handling (accessed September 8, 2026).
- [CMS eCQI Resource Center: measure tools](https://ecqi.healthit.gov/tools-key-resources) — the authoring, testing, and certification tools sequenced here (accessed September 8, 2026).
- [Wikipedia: Meaningful use](https://en.wikipedia.org/wiki/Health_Information_Technology_for_Economic_and_Clinical_Health_Act) — background on why EHR certification exists.
