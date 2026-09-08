---
title: "Remote Monitoring Data Flow Graph Model"
description: "Step through concrete device readings, an illustrative alert rule, a telehealth visit, and a parallel patient-portal path."
status: validated
validated_date: 2026-09-07
quality_score: 100
image: /sims/remote-monitoring-data-flow-graph-model/remote-monitoring-data-flow-graph-model.png
og:image: /sims/remote-monitoring-data-flow-graph-model/remote-monitoring-data-flow-graph-model.png
twitter:image: /sims/remote-monitoring-data-flow-graph-model/remote-monitoring-data-flow-graph-model.png
library: vis-network
bloom_level: Understand
---

# Remote Monitoring Data Flow Graph Model

<iframe src="main.html" width="100%" height="882px" scrolling="no"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

This staged explorer separates a wearable-device path from a patient-portal path. Each stage makes the underlying data visible: four synthetic readings, an illustrative rule, the resulting alert, a telehealth visit, and a patient-reported outcome. Learners can advance one stage at a time or play the same bounded five-stage sequence.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10–15 minutes. Prerequisites: nodes, directed relationships, timestamps, thresholds, and patient-generated data.

**Learning objective:** Explain how patient-generated data flows through a remote patient monitoring process into a telehealth visit, and classify each node by whether its data is patient-originated or system-generated.

1. **Predict:** At Stage 1, predict which branch can produce an automated alert and which branch aggregates a patient report.
2. **Explain:** Advance through Stages 2–4. Use the displayed readings and rule to explain exactly why the alert appears.
3. **Classify:** Reveal Stage 5 and classify each visible node as patient-originated or system-generated. Defend one classification using the edge labels.

Assessment: a complete explanation names the sequence `GENERATES → FEEDS → TRIGGERS → SCHEDULES`, identifies the three consecutive readings used by the teaching rule, and correctly classifies the patient-reported outcome and portal.

## Embed This MicroSim

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/remote-monitoring-data-flow-graph-model/main.html" width="100%" height="882px" scrolling="no"></iframe>
```

[JavaScript source](remote-monitoring-data-flow-graph-model.js)

## Quality Checks

**Validated September 7, 2026.** Completeness rubric: **100/100**. Browser interaction tests passed at 400, 800, and 1200 pixels, including staged reveal and bounded playback; iframe visibility and visual layout checks passed; no JavaScript errors were observed.

## Specification

The specification is recorded in [the TODO entry](../TODO/remote-monitoring-data-flow-graph-model.json) and [Chapter 11](../../chapters/11-specialty-care-surgery-remote-monitoring/index.md).

## References

- [Chapter 11: Specialty Care, Surgery, and Remote Monitoring](../../chapters/11-specialty-care-surgery-remote-monitoring/index.md) — source learning objective and staged data-flow specification.
- [vis-network documentation](https://visjs.github.io/vis-network/docs/network/) — rendering and interaction reference.
