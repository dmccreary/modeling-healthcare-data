---
title: DME Fraud Pattern Detector MicroSim
description: Interactive vis-network MicroSim for dme fraud pattern detector microsim.
image: /sims/dme-fraud-pattern-detector/dme-fraud-pattern-detector.png
og:image: /sims/dme-fraud-pattern-detector/dme-fraud-pattern-detector.png
twitter:image: /sims/dme-fraud-pattern-detector/dme-fraud-pattern-detector.png
social:
   cards: false
quality_score: 75
---

# DME Fraud Pattern Detector MicroSim

<iframe src="main.html" height="508" width="100%" scrolling="no"></iframe>

[Run the DME Fraud Pattern Detector MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This detector models durable-medical-equipment (DME) fraud as a physician–supplier referral network and lets you apply DME-specific red flags. Four suppliers receive referrals from four physicians; each supplier may trigger signals — referral concentration (nearly all referrals from a couple of physicians), geographic distance, specialty mismatch (e.g., a podiatrist ordering power wheelchairs), and patient-address clustering. A seeded fraud supplier, QuickBrace, trips every flag, while legitimate suppliers trip few or none.

## How to Use

Toggle the red-flag checkboxes to choose which signals count, and watch each supplier's color shift toward red and its risk score update in the ranked table — no single flag is conclusive, but converging signals separate the fraud supplier from legitimate ones. Read the detail box for the top-ranked supplier to see why it is suspicious. Drag nodes and use the navigation buttons to explore the network.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/dme-fraud-pattern-detector/main.html"
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
