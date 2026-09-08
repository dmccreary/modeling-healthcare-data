---
title: Healthcare RBAC Graph Data Model
description: Interactive vis-network MicroSim for healthcare rbac graph data model.
image: /sims/healthcare-rbac-graph-data-model/healthcare-rbac-graph-data-model.png
og:image: /sims/healthcare-rbac-graph-data-model/healthcare-rbac-graph-data-model.png
twitter:image: /sims/healthcare-rbac-graph-data-model/healthcare-rbac-graph-data-model.png
social:
   cards: false
quality_score: 75
---

# Healthcare RBAC Graph Data Model

<iframe src="main.html" height="488" width="100%" scrolling="no"></iframe>

[Run the Healthcare RBAC Graph Data Model MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This graph models role-based access control (RBAC) the way a graph database stores it. Users are assigned roles, roles inherit permissions from more general roles (a Cardiologist inherits everything a Physician can do; an ICU Nurse inherits from Nurse), and roles grant specific permissions like reading clinical records or writing orders. An access check — "can Dr. Chen write orders?" — becomes a traversal from the user through her roles and their inherited roles to the granted permissions.

## How to Use

Follow a user's HAS_ROLE edge to their role, then the dashed INHERITS_FROM edges up the role hierarchy, and finally the GRANTS edges to the permissions that role confers. Trace how Dr. Chen, as a Cardiologist, inherits the Physician role and so gains read, order-writing, and lab permissions, while the Billing Clerk role grants only billing access. Drag nodes and use the navigation buttons to explore the hierarchy.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-rbac-graph-data-model/main.html"
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
