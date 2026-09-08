---
title: "Model Drift Detection Monitor"
description: "Read 26 weeks of a deployed model's rolling AUROC and separate ordinary week-to-week fluctuation from a genuine drift event."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/model-drift-detection-monitor/model-drift-detection-monitor.png
og:image: /sims/model-drift-detection-monitor/model-drift-detection-monitor.png
library: Chart.js
bloom_level: Analyze
---

# Model Drift Detection Monitor

<iframe src="main.html" width="100%" height="780px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

For sixteen weeks the metric bounces harmlessly above and below its baseline. Then, at week 18, a laboratory changes vendors -- and nothing about the model changes at all. No deploy, no retrain, no bug. One input test starts arriving on a different assay with a different distribution, the model keeps doing exactly what it was trained to do on inputs that no longer mean what they meant, and the metric declines into the alert band by week 20. **Is week 7 a drift event?** is the discrimination exercise: week 7 is the lowest reading in the stable period and it is still not drift, because fluctuation scatters in both directions and reverts, while drift moves one way and stays. Hiding the reference lines makes the point from the other side -- without a baseline, 0.79 is a number nobody can act on.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10-15 minutes. Prerequisites: AUROC as a ranking metric, and the idea of a rolling average over a time window.

**Learning objective:** Given a rolling-window AUROC line chart with a drift-alert threshold, the learner can examine where a deployed model's performance degrades over time and differentiate normal fluctuation from a genuine drift event.

1. **Explore:** Hover across weeks 0-16 and note how many readings sit below the baseline. Then hover weeks 19-26 and note how many sit above it.
2. **Explain:** Select **Why did it drift?**. Explain why a distribution check on the model's inputs would have fired two weeks before the output metric did, and what that implies about what a monitoring system should watch.
3. **Transfer:** Use **Hide reference lines** and look at the series cold. Write down what you would need to know before recommending that the model be retrained, and say which of those things the chart alone can tell you.

Assessment: use the Explain prompt as an exit ticket. A complete response locates the cause upstream of the model, explains the lag as a property of a rolling window rather than a defect, and distinguishes input monitoring from output monitoring.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/model-drift-detection-monitor/main.html" width="100%" height="780px"></iframe>
```

[JavaScript source](model-drift-detection-monitor.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 21: Responsible AI and Agentic Systems](../../chapters/21-responsible-ai-and-agentic-systems/index.md).

```text
Type: chart
**sim-id:** model-drift-detection-monitor<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, differentiate<br/>
Learning objective: Given a rolling-window AUROC line chart with a drift-alert threshold, the learner can examine where a deployed model's performance degrades over time and differentiate normal fluctuation from a genuine drift event.

Purpose: Show how a monitored performance metric drifts downward after a real-world data change, and how a statistical threshold triggers a timely alert.

Chart type: Line chart with a shaded alert-threshold band

X-axis: Week number (0 to 26)
Y-axis: Rolling AUROC (0.5 to 1.0)

Data series:
1. Rolling AUROC (blue line): starts at 0.88, fluctuates narrowly between 0.86-0.89 through week 16, then declines steadily to 0.79 by week 22 (simulating the lab-vendor change), staying low through week 26
2. Baseline AUROC (dashed gray horizontal line at 0.88)
3. Alert threshold (shaded red band below 0.84, representing two standard deviations below baseline)

Annotations:
- Vertical marker at week 18 labeled "Lab vendor change (unrelated to model)"
- Callout at week 20 where the blue line first enters the red band: "Drift alert fires here"

Interactive features:
- Hover any point on the blue line to see the exact week and AUROC value in a tooltip
- Toggle button to show/hide the baseline and threshold reference lines
- Click the week-18 marker to open an infobox explaining that model drift often originates outside the model itself (a changed upstream data source), not from a bug in the model's code

Instructional Rationale: A line chart with an explicit alert band and a clickable root-cause annotation matches the Analyze-level objective, letting the learner trace cause (external data change) to effect (metric decline) to consequence (alert timing) rather than only observing that the line goes down.

Implementation: Chart.js line chart with annotation plugin for threshold band and markers; responsive width.
```

## Related Resources

- [Chapter 21: Responsible AI and Agentic Systems](../../chapters/21-responsible-ai-and-agentic-systems/index.md)

## References

- [Source chapter](../../chapters/21-responsible-ai-and-agentic-systems/index.md) — supplied the learning objective and the worked example.
- [Chart.js documentation](https://www.chartjs.org/docs/latest/) — scales, stacked bars, tooltips, and custom plugins (accessed September 8, 2026).
- [chartjs-plugin-annotation](https://www.chartjs.org/chartjs-plugin-annotation/latest/) — the threshold band and markers drawn on the chart (accessed September 8, 2026).
- [Wikipedia: Concept drift](https://en.wikipedia.org/wiki/Concept_drift) — the phenomenon the week-18 event illustrates.
