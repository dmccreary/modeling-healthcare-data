---
title: Medical Code System Classifier MicroSim
description: Interactive p5.js MicroSim for medical code system classifier microsim.
image: /sims/medical-code-classifier/medical-code-classifier.png
og:image: /sims/medical-code-classifier/medical-code-classifier.png
twitter:image: /sims/medical-code-classifier/medical-code-classifier.png
social:
   cards: false
quality_score: 70
---

# Medical Code System Classifier MicroSim

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Medical Code System Classifier MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This quiz builds the skill of recognizing which medical coding system applies to a given clinical or billing situation — ICD-10 for diagnoses, CPT for physician procedures and services, HCPCS Level II for equipment, supplies, and transport, and NDC/RxNorm for specific drug products. Each scenario is followed by immediate feedback explaining the correct mapping, including deliberate near-misses (such as a screening colonoscopy, where the reason is ICD-10 but the billed procedure is CPT) that force genuine discrimination rather than rote recall.

## How to Use

Read the scenario card and click the coding system you think applies. The sim tells you whether you were right, reveals the correct answer and a one-sentence rationale, and updates your score and streak. Click Next scenario to continue and Restart to reshuffle. The question bank lives in the QUESTIONS array in the .js file, so instructors can add their own scenarios.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/medical-code-classifier/main.html"
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
