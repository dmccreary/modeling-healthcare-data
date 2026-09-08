---
title: "Security Incident Response Lifecycle"
description: "Sequence the five incident response stages against a running insider-threat scenario in a healthcare graph database."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/security-incident-response-lifecycle/security-incident-response-lifecycle.png
og:image: /sims/security-incident-response-lifecycle/security-incident-response-lifecycle.png
library: Mermaid
bloom_level: Understand
---

# Security Incident Response Lifecycle

<iframe src="main.html" width="100%" height="770px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

At 02:14 an analytics account that normally runs aggregate queries against one service line begins traversing individual patient subgraphs across oncology, behavioral health, and obstetrics. Each of the five stages is defined generally and then grounded in that scenario, which makes the ordering argue for itself: containment precedes diagnosis because an ongoing exfiltration costs more every minute, and recovery precedes the review because there is nothing to review until service is stable. The dashed arrow from Lessons Learned back to Identify is not decoration — in this scenario the detection rule fired on query volume but not on ward diversity, and closing that gap is what the arrow carries. **Walk the scenario** advances through all five automatically.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10-15 minutes. Prerequisites: role-based access control, and the idea that a graph traversal is itself an auditable event.

**Learning objective:** Given a description of a detected security event affecting a healthcare graph database, the learner can sequence the five incident response stages and explain what each stage accomplishes.

1. **Explore:** Use **Walk the scenario** once, then select stage 2 and stage 3 again. Note what containment deliberately does not attempt to establish.
2. **Explain:** Explain why suspending the login is insufficient containment for a graph database, using the detail in stage 2 about in-flight queries and cached tokens.
3. **Transfer:** Sketch what stages 1 through 3 would look like for a different incident — a misconfigured export job sending de-identified data to the wrong bucket. Name one thing that makes containment easier there than in the insider case, and one thing that makes it harder.

Assessment: use the Explain prompt as an exit ticket. A complete response distinguishes a disabled account from a terminated session, and states why the distinction matters for a system where reads are traversals rather than single queries.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/security-incident-response-lifecycle/main.html" width="100%" height="770px"></iframe>
```

[JavaScript source](security-incident-response-lifecycle.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 26: Advanced Security Operations and Incident Response](../../chapters/26-advanced-security-operations-incident-response/index.md).

```text
Type: workflow
**sim-id:** security-incident-response-lifecycle<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: explain, sequence<br/>
Learning objective: Given a description of a detected security event affecting a healthcare graph database, the learner can sequence the five incident response stages and explain what each stage accomplishes.

Purpose: Teach the five-stage incident response lifecycle as it applies to a healthcare graph database, using a running scenario (an insider-threat alert from anomalous cross-ward access) so each stage has a concrete healthcare referent.

Components to show (five sequential nodes plus a feedback loop):

1. Identify — "Insider Threat Detection flags anomalous cross-ward access by a user account"
2. Contain — "Suspend the affected account's session tokens and IAM credentials to stop further access immediately"
3. Eradicate — "Determine root cause (compromised credential vs. genuine policy violation) and remove it"
4. Recover — "Restore normal account access (if credential was compromised and is now reset) and verify no lingering unauthorized access remains"
5. Lessons Learned — "Update the security risk assessment and vulnerability management backlog with any new finding"

Feedback edge: Lessons Learned loops back and feeds into Identify (representing improved future detection)

Connections: Sequential arrows 1 to 2 to 3 to 4 to 5, plus one dashed feedback arrow from 5 back to 1.

Interactivity requirement: Every node must have a Mermaid click directive that opens an infobox with that stage's full definition and the healthcare-specific detail listed above, pulling the wording from the chapter's glossary-style definitions where possible.

Style: Horizontal flowchart, rounded rectangles, left to right.

Labels: Stage number and name on each node ("1. Identify", "2. Contain", etc.)

Color scheme: Red for Identify (alert), orange for Contain, yellow for Eradicate, light green for Recover, blue for Lessons Learned; the feedback edge is dashed gray.

Implementation: Mermaid flowchart with a `click` directive per node calling a JavaScript function that renders the infobox text in a panel below the diagram; responsive width, fixed aspect ratio that reflows on window resize.
```

## Related Resources

- [Chapter 26: Advanced Security Operations and Incident Response](../../chapters/26-advanced-security-operations-incident-response/index.md)

## References

- [Source chapter](../../chapters/26-advanced-security-operations-incident-response/index.md) — supplied the learning objective and the worked example.
- [Mermaid flowchart documentation](https://mermaid.js.org/syntax/flowchart.html) — subgraphs, click directives, and class styling (accessed September 8, 2026).
- [NIST SP 800-61: Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final) — the lifecycle this five-stage model follows (accessed September 8, 2026).
- [Wikipedia: Insider threat](https://en.wikipedia.org/wiki/Insider_threat) — background on the detection problem in stage 1.
