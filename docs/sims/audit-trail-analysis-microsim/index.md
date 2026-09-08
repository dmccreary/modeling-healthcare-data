---
title: "Audit Trail Analysis MicroSim"
description: "Interactive p5.js MicroSim for audit trail analysis microsim."
image: /sims/audit-trail-analysis-microsim/audit-trail-analysis-microsim.png
og:image: /sims/audit-trail-analysis-microsim/audit-trail-analysis-microsim.png
twitter:image: /sims/audit-trail-analysis-microsim/audit-trail-analysis-microsim.png
social:
   cards: false
quality_score: 70
---

# Audit Trail Analysis MicroSim

<iframe src="main.html" height="618" width="100%" scrolling="no"></iframe>

[Run the Audit Trail Analysis MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This MicroSim shows how graph-based audit-trail analysis detects inappropriate access to patient records. Users (squares, colored by risk) access patient records (circles) grouped into two wards. Access within a user's own ward is authorized (green edges), while access to patients in the other ward is unusual (red edges) — and a user who reaches across wards to many patients, like RN-Snoop here, shows a snooping pattern that flags a likely privacy violation.

## How to Use

Toggle the highlight to emphasize cross-ward access, and click any user to isolate just their access edges and read their access count and cross-ward total in the status line. Spot the user whose red cross-ward edges fan out across the other ward — the kind of anomalous pattern a graph query over the audit log surfaces automatically, where a row-by-row log review would miss it.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/audit-trail-analysis-microsim/main.html"
        height="618px"
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
