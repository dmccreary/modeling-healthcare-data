---
title: Capstone Project Architecture Template
description: Interactive p5.js MicroSim for capstone project architecture template.
image: /sims/capstone-project-architecture-template/capstone-project-architecture-template.png
og:image: /sims/capstone-project-architecture-template/capstone-project-architecture-template.png
twitter:image: /sims/capstone-project-architecture-template/capstone-project-architecture-template.png
social:
   cards: false
quality_score: 0
---

# Capstone Project Architecture Template

<iframe src="main.html" height="618" width="100%" scrolling="no"></iframe>

[Run the Capstone Project Architecture Template MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This reference architecture gives capstone students a concrete, adaptable blueprint for a graph-based healthcare project. It stacks four tiers — a user-interface tier of dashboards and APIs, an application-logic tier of query, analytics, RBAC, and AI services, a data tier built around a graph database (plus a vector DB and cache), and a data-sources tier of open and synthetic datasets — with cross-cutting concerns (security, audit and lineage, HIPAA compliance, and CI/CD) that apply across every tier.

## How to Use

Read the stack from the bottom up to see how open data sources flow into a graph database, get processed by analytics and AI services, and surface through a dashboard. Use it as a checklist for scoping your own project: choose a free graph database, pick open datasets to ingest, decide which analytics or AI services to add, and remember that the cross-cutting column — security, governance, and DevOps — applies no matter which components you select.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/capstone-project-architecture-template/main.html"
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
