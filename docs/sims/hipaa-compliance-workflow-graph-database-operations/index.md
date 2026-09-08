---
title: HIPAA Compliance Workflow for Graph Database Operations
description: Interactive Mermaid MicroSim for hipaa compliance workflow for graph database operations.
image: /sims/hipaa-compliance-workflow-graph-database-operations/hipaa-compliance-workflow-graph-database-operations.png
og:image: /sims/hipaa-compliance-workflow-graph-database-operations/hipaa-compliance-workflow-graph-database-operations.png
twitter:image: /sims/hipaa-compliance-workflow-graph-database-operations/hipaa-compliance-workflow-graph-database-operations.png
social:
   cards: false
quality_score: 75
---

# HIPAA Compliance Workflow for Graph Database Operations

<iframe src="main.html" height="1171" width="100%" scrolling="no"></iframe>

[Run the HIPAA Compliance Workflow for Graph Database Operations MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This flowchart shows the compliance checkpoints every PHI access must pass in a healthcare graph database. A request is authenticated (MFA required), then authorized against the user's role and a legitimate need-to-know; only then does a row-level-security graph query run, with its results trimmed to the HIPAA minimum-necessary standard, watermarked, and written to an immutable audit trail before display, with an enforced session timeout. A failure at either gate ends in a logged denial.

## How to Use

Hover over any step to see the specific HIPAA control it enforces. Follow the two yellow decision diamonds to see how invalid authentication or insufficient permissions both route to a denied, logged outcome, and the "Valid"/"Yes" path through row-level security, minimum-necessary filtering, and audit logging to the completed task.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/hipaa-compliance-workflow-graph-database-operations/main.html"
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
