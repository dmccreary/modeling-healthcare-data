---
title: "Healthcare Data Protection Layers Diagram"
description: "Interactive p5.js MicroSim for healthcare data protection layers diagram."
image: /sims/healthcare-data-protection-layers-diagram/healthcare-data-protection-layers-diagram.png
og:image: /sims/healthcare-data-protection-layers-diagram/healthcare-data-protection-layers-diagram.png
twitter:image: /sims/healthcare-data-protection-layers-diagram/healthcare-data-protection-layers-diagram.png
social:
   cards: false
quality_score: 70
---

# Healthcare Data Protection Layers Diagram

<iframe src="main.html" height="618" width="100%" scrolling="no"></iframe>

[Run the Healthcare Data Protection Layers Diagram MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This diagram presents the defense-in-depth security architecture for a healthcare graph database as concentric onion layers, from perimeter security on the outside through application security, identity and access management, and database security, to data protection wrapped around the protected health information (PHI) at the core. The key insight is that the layers are independent: an attacker must defeat every one of them to reach the PHI.

## How to Use

Read the rings from the outside in to follow the path an attacker would have to breach, and use the side panel to see the specific controls at each layer — firewalls and IDS/IPS at the perimeter, MFA and RBAC for identity, encryption and node-level security at the database, and field-level encryption and tokenization for the data itself. Hover over any ring to emphasize it and its entry in the side panel.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-data-protection-layers-diagram/main.html"
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
