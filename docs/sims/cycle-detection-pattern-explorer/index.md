---
title: Cycle Detection and Pattern Explorer MicroSim
description: Interactive vis-network MicroSim for cycle detection and pattern explorer microsim.
image: /sims/cycle-detection-pattern-explorer/cycle-detection-pattern-explorer.png
og:image: /sims/cycle-detection-pattern-explorer/cycle-detection-pattern-explorer.png
twitter:image: /sims/cycle-detection-pattern-explorer/cycle-detection-pattern-explorer.png
social:
   cards: false
quality_score: 75
---

# Cycle Detection and Pattern Explorer MicroSim

<iframe src="main.html" height="508" width="100%" scrolling="no"></iframe>

[Run the Cycle Detection and Pattern Explorer MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This explorer surfaces circular referral patterns in a directed provider network. Most REFERS_TO edges flow forward, but a seeded 3-cycle and 4-cycle send referrals around a closed loop, and some of those same providers also share FINANCIAL_RELATIONSHIP edges. A benign coordination loop and a kickback ring can look similar — until you overlay the money. The graph algorithm finds the cycles; the financial overlay tells you which ones warrant scrutiny.

## How to Use

Use the dropdown to highlight 3-cycles, 4-cycles, or financial loops. When a cycle lights up red, read the info box to see its members and whether they also share financial ties — a referral cycle overlapping a financial loop is the classic kickback signal, where money and referrals flow around the same closed circle. Switch patterns to compare, and drag nodes or use the navigation buttons to explore.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/cycle-detection-pattern-explorer/main.html"
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
