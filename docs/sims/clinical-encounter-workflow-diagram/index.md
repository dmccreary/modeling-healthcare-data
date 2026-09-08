---
title: Clinical Encounter Workflow
description: Interactive Mermaid MicroSim for clinical encounter workflow.
image: /sims/clinical-encounter-workflow-diagram/clinical-encounter-workflow-diagram.png
og:image: /sims/clinical-encounter-workflow-diagram/clinical-encounter-workflow-diagram.png
twitter:image: /sims/clinical-encounter-workflow-diagram/clinical-encounter-workflow-diagram.png
social:
   cards: false
quality_score: 75
---

# Clinical Encounter Workflow

<iframe src="main.html" height="1412" width="100%" scrolling="no"></iframe>

[Run the Clinical Encounter Workflow MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
<br/>
[Edit in the p5.js Editor](https://editor.p5js.org/)

## About This MicroSim

This swimlane workflow follows a patient encounter from arrival through to claims submission, organized into four lanes — the patient, clinical staff, clinical systems, and administrative systems — so you can see not just the sequence of steps but who or what owns each one. The flow also highlights the data-capture points where information enters the EHR (demographics, vitals), is ordered through CPOE, and returns as lab and imaging results, before charges flow into billing and claims.

## How to Use

Follow the arrows from the top: the patient arrives, clinical staff register and assess them, clinical systems capture the data (shown as database and order shapes), and finally the administrative systems turn the documented visit into charges and a claim. Trace which lane each step lives in to see how a single encounter hands off between roles and systems — the integration points a graph data model has to connect.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/clinical-encounter-workflow-diagram/main.html"
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
