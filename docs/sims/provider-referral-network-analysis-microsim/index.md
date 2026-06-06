---
title: Provider Referral Network Analysis MicroSim
description: Interactive p5.js MicroSim for provider referral network analysis microsim.
image: /sims/provider-referral-network-analysis-microsim/provider-referral-network-analysis-microsim.png
og:image: /sims/provider-referral-network-analysis-microsim/provider-referral-network-analysis-microsim.png
twitter:image: /sims/provider-referral-network-analysis-microsim/provider-referral-network-analysis-microsim.png
social:
   cards: false
quality_score: 0
---

# Provider Referral Network Analysis MicroSim

<iframe src="main.html" height="618" width="100%" scrolling="no"></iframe>

[Run the Provider Referral Network Analysis MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This bipartite network visualizes referral patterns between primary-care providers (left) and specialists (right). Each PCP circle is sized by the volume of referrals it sends and each specialist by the volume it receives; edge thickness shows the referral volume between a pair. Specialists outside the network are drawn in red, and their referral edges are highlighted as leakage — care (and revenue) flowing outside the network. The analytics panel summarizes total volume, leakage percentage, the top referrer, and the busiest specialist.

## How to Use

Raise the minimum-referral-volume slider to hide low-volume connections and reveal the dominant referral relationships, and check "In-network only" to filter out out-of-network specialists. Hover an edge to see the exact referral volume for that PCP-specialist pair. Watch the leakage percentage in the analytics panel to identify where the network is losing referrals to outside specialists — a key target for care-coordination and contracting efforts.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/provider-referral-network-analysis-microsim/main.html"
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
