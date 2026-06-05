---
title: Graph RBAC Workflow Diagram
description: Interactive Mermaid MicroSim for graph rbac workflow diagram.
image: /sims/graph-rbac-workflow-diagram/graph-rbac-workflow-diagram.png
og:image: /sims/graph-rbac-workflow-diagram/graph-rbac-workflow-diagram.png
twitter:image: /sims/graph-rbac-workflow-diagram/graph-rbac-workflow-diagram.png
social:
   cards: false
quality_score: 0
---

# Graph RBAC Workflow Diagram

<iframe src="main.html" height="1089" width="100%" scrolling="no"></iframe>

[Run the Graph RBAC Workflow Diagram MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This interactive flowchart shows how a role-based access control (RBAC) decision
is evaluated in a graph-database healthcare system. Beyond a simple role check, the engine
queries the graph for an actual care relationship between the requesting clinician and the
patient (a TREATS, REFERRED_BY, or CONSULTED edge), supports an audited break-glass override
for emergencies, filters the graph traversal to authorized paths, redacts sensitive properties,
and records every access for the HIPAA audit trail. Steps are color-coded: blue for
application/authorization, yellow for decisions, green for the granted path, orange for data
operations, and red for denials.

## How to Use

Hover over any step to read what happens at that point in the detail panel on the right.
Trace the two "No" branches to see how requests are denied — a missing role, or no care
relationship without a break-glass override — and the "Yes" branches to follow an authorized
request through filtered traversal, property-level redaction, audit logging, and the final
filtered result.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/graph-rbac-workflow-diagram/main.html"
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
