---
title: Preventive Care Gap Closure MicroSim
description: Interactive p5.js MicroSim for preventive care gap closure microsim.
image: /sims/preventive-care-gap-closure/preventive-care-gap-closure.png
og:image: /sims/preventive-care-gap-closure/preventive-care-gap-closure.png
twitter:image: /sims/preventive-care-gap-closure/preventive-care-gap-closure.png
social:
   cards: false
quality_score: 0
---

# Preventive Care Gap Closure MicroSim

<iframe src="main.html" height="588" width="100%" scrolling="no"></iframe>

[Run the Preventive Care Gap Closure MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim shows how a preventive-care guideline becomes a population-health query that flags patients with open care gaps. A synthetic 40-patient panel is filtered in two visible stages: first by eligibility (age, sex, and condition) and then by recency (whether the last relevant service is older than the lookback window). Patients flagged as gaps turn orange, recently closed ones turn green, and ineligible ones dim — mirroring the chapter's Cypher gap-query patterns.

## How to Use

Pick a preventive service from the dropdown — switching to Mammography, for example, restricts the eligible population to women aged 40-74 — and adjust the lookback window. Click Run gap query to apply the eligibility and recency filters and reveal the eligible count, open-gap count, and gap-closure rate. Click Simulate outreach to close about half the open gaps and watch the closure rate rise.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/preventive-care-gap-closure/main.html"
        height="450px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Geometry)

### Duration
10-15 minutes

### Prerequisites
TODO: List prerequisites.

### Activities

1. **Exploration** (5 min): TODO
2. **Guided Practice** (5 min): TODO
3. **Assessment** (5 min): TODO

### Assessment
TODO: List assessment criteria.

## References

1. TODO: Add references.
