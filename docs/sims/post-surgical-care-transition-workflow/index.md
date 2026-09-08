---
title: "Post-Surgical Care Transition Workflow"
description: "Trace a surgical care transition and isolate the four graph-visible inputs feeding an illustrative readmission-risk result."
status: validated
validated_date: 2026-09-07
quality_score: 100
image: /sims/post-surgical-care-transition-workflow/post-surgical-care-transition-workflow.png
og:image: /sims/post-surgical-care-transition-workflow/post-surgical-care-transition-workflow.png
twitter:image: /sims/post-surgical-care-transition-workflow/post-surgical-care-transition-workflow.png
library: vis-network
bloom_level: Analyze
---

# Post-Surgical Care Transition Workflow

<iframe src="main.html" width="100%" height="882px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

The upper graph follows a surgical episode through monitoring, discharge, and two possible transition destinations. Four smaller purple nodes form a second layer that contributes directly to a synthetic readmission-risk result. Inspect any node, then use the focus control to test which upstream facts actually feed the result.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10–15 minutes. Prerequisites: directed workflows, graph paths, node properties, and computed features.

**Learning objective:** Examine a post-surgical care workflow and differentiate which upstream, graph-visible factors feed the computed readmission-risk score.

1. **Trace:** Follow the solid arrows from Surgical Procedure to both transition destinations. Describe where the workflow branches.
2. **Predict:** List the nodes you expect to contribute directly to Readmission Risk before using the focus control.
3. **Verify:** Select **Highlight risk inputs**, inspect the result node, and compare the isolated subgraph with your prediction.

Assessment: learners should name all four direct inputs, distinguish them from contextual workflow nodes, and explain how dashed and solid edges encode two different roles. The sample score is synthetic and should not be interpreted as a clinical model.

## Embed This MicroSim

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/post-surgical-care-transition-workflow/main.html" width="100%" height="882px" scrolling="no"></iframe>
```

[JavaScript source](post-surgical-care-transition-workflow.js)

## Quality Checks

**Validated September 7, 2026.** Completeness rubric: **100/100**. Browser interaction tests passed at 400, 800, and 1200 pixels; iframe visibility and visual layout checks passed; no JavaScript errors were observed.

## Specification

The specification is recorded in [the TODO entry](../TODO/post-surgical-care-transition-workflow.json) and [Chapter 11](../../chapters/11-specialty-care-surgery-remote-monitoring/index.md).

## References

- [Chapter 11: Specialty Care, Surgery, and Remote Monitoring](../../chapters/11-specialty-care-surgery-remote-monitoring/index.md) — source learning objective and workflow specification.
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) — rendering and interaction reference.
