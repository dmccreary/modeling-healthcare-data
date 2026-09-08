---
title: "Clinical Quality Measure Population Funnel"
description: "Compute a quality measure's reported rate from four populations, and watch the rate move when only the exclusion count changes."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/clinical-quality-measure-population-funnel/clinical-quality-measure-population-funnel.png
og:image: /sims/clinical-quality-measure-population-funnel/clinical-quality-measure-population-funnel.png
library: Chart.js
bloom_level: Apply
---

# Clinical Quality Measure Population Funnel

<iframe src="main.html" width="100%" height="873px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

Four bars, each a subset of the one above it, and a rate computed from the last two. The number to keep an eye on is the divisor: the reported rate is the numerator over the *exclusion-adjusted* denominator, not over the initial population, and the panel shows both so the difference is visible rather than assumed. **What if exclusions tripled?** is the exercise worth running -- the numerator does not move, not one patient's HbA1c changes, and the reported rate still rises. That is why exclusion criteria are specified in executable logic rather than prose and why exclusion counts are audited: it is the one place where a defensible clinical judgment and a favorable reported number point in the same direction.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10-15 minutes. Prerequisites: a rate as a numerator over a denominator, and the idea of a defined patient cohort.

**Learning objective:** Given initial population, denominator exclusion, and numerator counts, the learner can calculate a Clinical Quality Measure's reported rate and demonstrate how changing an exclusion count changes the final rate.

1. **Explore:** Select each bar in turn and read its definition. Note that the initial population and the denominator coincide in this measure, and say what would have to differ for them to separate.
2. **Explain:** Run **What if exclusions tripled?**. Explain precisely which term in the rate changed and which did not, and why the result still counts as an improvement on paper.
3. **Transfer:** You are reviewing two clinics reporting 64.6% and 71.2% on this measure. Name two things you would want to see besides the rate before concluding one delivers better care.

Assessment: use the Transfer prompt as an exit ticket. A complete response asks for the exclusion counts and the denominators, and explains why comparing rates without them is unsafe.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/clinical-quality-measure-population-funnel/main.html" width="100%" height="873px"></iframe>
```

[JavaScript source](clinical-quality-measure-population-funnel.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 23: Clinical Guideline Authoring and Clinical Quality Language](../../chapters/23-clinical-guideline-authoring-and-cql/index.md).

```text
Type: chart
**sim-id:** clinical-quality-measure-population-funnel<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: calculate, demonstrate<br/>
Learning objective: Given initial population, denominator exclusion, and numerator counts, the learner can calculate a Clinical Quality Measure's reported rate and demonstrate how changing an exclusion count changes the final rate.

Purpose: Visualize the diabetes-control CQM's four standard populations as a narrowing funnel with live counts, reinforcing the initial-population/denominator/exclusions/numerator structure with the exact numbers from the worked example.

Chart type: Funnel-style horizontal bar chart (four stacked bars, each narrower than the last)

Data series (default values, editable):
1. Initial Population: 40,000 (aged 18-75)
2. Denominator (has diabetes): 40,000
3. Denominator after Exclusions (hospice care removed): 39,500
4. Numerator (HbA1c controlled): 25,500

Annotations:
- Computed rate displayed prominently: "Measure Rate = 25,500 / 39,500 = 64.6%"

Interactive controls:
- Hover any bar to see its exact count and the population definition it represents
- Editable number input for the exclusion count, live-recalculating the denominator and displayed rate
- Editable number input for the numerator count, live-recalculating the displayed rate

Instructional Rationale: Editable inputs that immediately recompute the displayed rate match the Apply-level objective, requiring the learner to perform the division themselves conceptually and see the direct effect of population-definition choices on the final reported measure.

Implementation: Chart.js horizontal bar chart with live-updating annotation text driven by input fields; responsive width.
```

## Related Resources

- [Chapter 23: Clinical Guideline Authoring and Clinical Quality Language](../../chapters/23-clinical-guideline-authoring-and-cql/index.md)

## References

- [Source chapter](../../chapters/23-clinical-guideline-authoring-and-cql/index.md) — supplied the learning objective and the worked example.
- [Chart.js documentation](https://www.chartjs.org/docs/latest/) — scales, stacked bars, tooltips, and custom plugins (accessed September 8, 2026).
- [CMS electronic clinical quality measures](https://ecqi.healthit.gov/eCQMs) — the population structure this funnel follows (accessed September 8, 2026).
- [Wikipedia: Quality of care measurement](https://en.wikipedia.org/wiki/Health_care_quality) — background on measure-based payment programs.
