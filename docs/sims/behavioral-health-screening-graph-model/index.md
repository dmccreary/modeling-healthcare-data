---
title: "Behavioral Health Screening Graph Model"
description: "Compare scored behavioral-health screening paths with structurally separate neurodiversity and palliative-care branches."
status: validated
validated_date: 2026-09-07
quality_score: 100
image: /sims/behavioral-health-screening-graph-model/behavioral-health-screening-graph-model.png
og:image: /sims/behavioral-health-screening-graph-model/behavioral-health-screening-graph-model.png
twitter:image: /sims/behavioral-health-screening-graph-model/behavioral-health-screening-graph-model.png
library: vis-network
bloom_level: Analyze
---

# Behavioral Health Screening Graph Model

<iframe src="main.html" width="100%" height="882px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

This explorer contrasts three branches from one patient node. The blue-to-orange behavioral-health paths carry instrument scores and example screening results. The purple neurodiversity and green palliative-care branches use dashed, unscored relationships. Select any node or edge to inspect the evidence for that structural difference.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10–15 minutes. Prerequisites: nodes, directed edges, labels, properties, and the distinction between screening and diagnosis.

**Learning objective:** Differentiate a screened-and-diagnosed behavioral-health pathway from the structurally separate neurodiversity and palliative-care categories, and classify each screening instrument by the condition it screens for.

1. **Predict:** Before selecting anything, identify which edges appear to carry a measured result and which do not.
2. **Compare:** Inspect PHQ-9, GAD-7, AUDIT-C, and their `SCREENS_FOR` edges. Record the instrument, target, sample score, and result shown for each.
3. **Differentiate:** Collapse and expand the clusters. Explain why Autism, ADHD, and Palliative Care do not use the same score-bearing edge pattern in this model.

Assessment: ask learners to classify each of the three screening instruments and cite two visible graph features that distinguish the scored branch from the unscored branches. A complete response also states that a positive screen does not establish a diagnosis by itself.

## Embed This MicroSim

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/behavioral-health-screening-graph-model/main.html" width="100%" height="882px" scrolling="no"></iframe>
```

[JavaScript source](behavioral-health-screening-graph-model.js)

## Quality Checks

**Validated September 7, 2026.** Completeness rubric: **100/100**. Browser interaction tests passed at 400, 800, and 1200 pixels; iframe visibility and visual layout checks passed; no JavaScript errors were observed.

## Specification

The specification is recorded in [the TODO entry](../TODO/behavioral-health-screening-graph-model.json) and [Chapter 11](../../chapters/11-specialty-care-surgery-remote-monitoring/index.md).

## References

- [Kroenke, Spitzer, and Williams, “The PHQ-9: Validity of a Brief Depression Severity Measure”](https://pubmed.ncbi.nlm.nih.gov/11556941/) — PHQ-9 scoring and the commonly used score-10 screening cutoff.
- [Spitzer et al., “A Brief Measure for Assessing Generalized Anxiety Disorder: The GAD-7”](https://pubmed.ncbi.nlm.nih.gov/16717171/) — GAD-7 development and validation.
- [U.S. Department of Veterans Affairs, AUDIT-C](https://www.hepatitis.va.gov/alcohol/treatment/audit-c.asp) — score range and current VA/DoD example cutoff.
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) — rendering and interaction reference.
