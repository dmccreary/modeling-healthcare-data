---
title: "CDS Hooks Request-Response Cycle"
description: "Trace a warfarin drug-interaction alert and a diabetes care-gap alert through the identical six-step CDS Hooks cycle, reading the literal JSON at each boundary."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/cds-hooks-request-response-cycle/cds-hooks-request-response-cycle.png
og:image: /sims/cds-hooks-request-response-cycle/cds-hooks-request-response-cycle.png
library: Mermaid
bloom_level: Analyze
---

# CDS Hooks Request-Response Cycle

<iframe src="main.html" width="100%" height="1118px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

A clinician signs a warfarin order for a patient already taking aspirin. Six steps later an interruptive card appears — and this MicroSim shows every one of them, with the actual JSON that crosses each boundary. The `order-sign` scenario carries a draft order in `context` and the active medication list in `prefetch`; the `patient-view` scenario carries neither, because nothing is being ordered. Switching between the two is the point: the hook name changes, the context contents change, and the prefetch changes, but the five-step request-response shape does not. That invariance is what lets an EHR integrate the CDS Hooks pattern once and then accept advice from services it has never seen.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 12-18 minutes. Prerequisites: FHIR resources and references, and the idea of an HTTP POST carrying a JSON body.

**Learning objective:** Given a clinical scenario, the learner can examine which CDS Hooks hook type would fire and differentiate the roles of context, prefetch, and the returned card in producing a correctly timed alert.

1. **Explore:** In `order-sign` mode, select steps 2 and 5 and read the two JSON payloads side by side. Identify which field in the request the rule engine needed in order to fire, and which field in the response controls how loudly the EHR presents the result.
2. **Explain:** Switch to `patient-view` and select step 2 again. Explain to a partner what disappeared from `context` and why its absence follows necessarily from the trigger, not from a design preference.
3. **Transfer:** Choose a different clinical moment — a discharge, an appointment booking — and say which hook type fits, what you would put in context, what you would prefetch, and whether your card's indicator should be `info` or `warning`. State one assumption you made.

Assessment: use the Transfer prompt as an exit ticket. A complete response names a hook type, distinguishes context from prefetch with a reason rather than a restatement, and justifies the indicator by what the clinician is doing at that moment.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/cds-hooks-request-response-cycle/main.html" width="100%" height="1118px"></iframe>
```

[JavaScript source](cds-hooks-request-response-cycle.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 24: CDS Hooks, Care Alerts, and CMS CQL Tooling](../../chapters/24-cds-hooks-alerts-and-cms-cql-tooling/index.md).

```text
Type: workflow
**sim-id:** cds-hooks-request-response-cycle<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, differentiate<br/>
Learning objective: Given a clinical scenario, the learner can examine which CDS Hooks hook type would fire and differentiate the roles of context, prefetch, and the returned card in producing a correctly timed alert.

Purpose: Trace the exact warfarin/aspirin order-sign worked example through the CDS Hooks specification's request-response cycle, showing where context and prefetch data originate and how a card is constructed from a CDS Rule Engine's evaluation.

Components to show (Mermaid sequence-style flowchart):
- Node "Clinician Signs Warfarin Order" (blue) — triggers the hook
- Node "EHR Fires order-sign Hook" (gray) — assembles context (draft order) and prefetch (active MedicationRequests including aspirin)
- Node "CDS Service Receives Hook Call" (orange) — the external service endpoint
- Node "CDS Rule Engine Evaluates Drug-Drug Interaction Check" (purple) — runs the compiled ELM logic via a Clinical Reasoning Module
- Node "Card Constructed" (green) — summary "Bleeding risk: warfarin + aspirin", suggested Order Set link
- Node "EHR Renders Card to Clinician" (blue) — the interruptive alert appears

Connections: Sequential left to right, matching the list order above, with a labeled side-input arrow from "Patient's Active Medications" into the "EHR Fires order-sign Hook" node representing prefetch assembly

Interactive controls:
- Click directive on every node opening an infobox with the literal JSON payload at that step (the hook call's context/prefetch JSON, and the returned card JSON)
- Toggle between "order-sign" and "patient-view" hook types, which swaps the scenario to the care-gap-alert example and updates every node's content accordingly

Instructional Rationale: A togglable two-scenario flowchart with literal JSON payloads at each step matches the Analyze-level objective, requiring the learner to distinguish what changes (hook type, context contents) from what stays structurally identical (the five-step request-response shape) between an order-time check and a chart-opening check.

Implementation: Mermaid flowchart with click handlers; responsive width.
```

## Related Resources

- [Chapter 24: CDS Hooks, Care Alerts, and CMS CQL Tooling](../../chapters/24-cds-hooks-alerts-and-cms-cql-tooling/index.md)

## References

- [Source chapter](../../chapters/24-cds-hooks-alerts-and-cms-cql-tooling/index.md) — supplied the learning objective and the worked example.
- [Mermaid flowchart documentation](https://mermaid.js.org/syntax/flowchart.html) — subgraphs, click directives, and class styling (accessed September 8, 2026).
- [CDS Hooks specification](https://cds-hooks.hl7.org/) — the normative definition of hooks, context, prefetch, and cards (accessed September 8, 2026).
- [Wikipedia: Clinical decision support system](https://en.wikipedia.org/wiki/Clinical_decision_support_system) — background on interruptive alerting and alert fatigue.
