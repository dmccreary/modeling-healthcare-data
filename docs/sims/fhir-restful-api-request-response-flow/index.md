---
title: "FHIR RESTful API Request-Response Flow"
description: "Trace a client request through a FHIR server to its own database and back, switching between GET, POST, PUT, and DELETE to see what changes and what does not."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/fhir-restful-api-request-response-flow/fhir-restful-api-request-response-flow.png
og:image: /sims/fhir-restful-api-request-response-flow/fhir-restful-api-request-response-flow.png
library: Mermaid
bloom_level: Understand
---

# FHIR RESTful API Request-Response Flow

<iframe src="main.html" width="100%" height="977px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

One request for Maria Chen's active conditions, followed all the way to the EHR vendor's own database and back. The step worth pausing on is the Internal Data Store: the server translates a FHIR search into a query over tables that look nothing like FHIR, which is exactly why two EHRs with entirely different schemas can answer the same request. The operation dropdown then changes the verb. A GET returns a searchset Bundle; a POST creates a resource and returns a Location header; a PUT replaces one and advances its version; a DELETE returns no body at all and leaves the history queryable. The six-step shape holds across all four — the body, the status code, and what the store does are what vary.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10-15 minutes. Prerequisites: FHIR resource types, and HTTP verbs and status codes.

**Learning objective:** Given a client application's request for patient data, the learner can explain how the FHIR RESTful API and FHIR server together turn an HTTP request into a returned Bundle of resources.

1. **Explore:** Run the GET and read the returned Bundle at step 5. Find the `total`, the self link, and the `fullUrl` on each entry, and say what each is for.
2. **Explain:** Compare POST and PUT at step 2. Explain why sending the same PUT twice is safe and sending the same POST twice is not, using only what the request itself contains.
3. **Transfer:** A colleague proposes recording a mistaken diagnosis by issuing a DELETE. Read step 4 for DELETE and PUT, then say what you would do instead and what the audit trail would show either way.

Assessment: use the Transfer prompt as an exit ticket. A complete response distinguishes removal from correction, cites resource versioning as the reason, and notes what a later reader of the record would see.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/fhir-restful-api-request-response-flow/main.html" width="100%" height="977px"></iframe>
```

[JavaScript source](fhir-restful-api-request-response-flow.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 22: FHIR Resources and Levels of Knowledge Representation](../../chapters/22-fhir-resources-and-knowledge-representation/index.md).

```text
Type: workflow
**sim-id:** fhir-restful-api-request-response-flow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: explain, summarize<br/>
Learning objective: Given a client application's request for patient data, the learner can explain how the FHIR RESTful API and FHIR server together turn an HTTP request into a returned Bundle of resources.

Purpose: Show the full request-response cycle between a client app and a FHIR server, grounding the abstract "resources are exchanged over REST" idea in one concrete, traceable request.

Components to show (Mermaid sequence-style flowchart):
- Node "Client App" (blue) — sends the request
- Node "HTTP GET Request" (gray) — shows the literal URL: `GET /Condition?patient=maria-chen&clinical-status=active`
- Node "FHIR Server" (orange) — receives the request, looks up matching resources
- Node "Internal Data Store" (gray, dashed border) — the EHR vendor's own database, translated into FHIR shape by the server
- Node "Bundle Response" (green) — a `Bundle` resource wrapping the matched `Condition` resources as JSON
- Node "Client App Renders Result" (blue) — the app displays Maria Chen's active conditions

Connections: Client App → HTTP GET Request → FHIR Server → Internal Data Store → back to FHIR Server → Bundle Response → Client App Renders Result, arrows labeled with each transition's action

Interactive controls:
- Click directive on every node opening an infobox with that step's detail, including the literal JSON of the returned Bundle at the "Bundle Response" node
- Dropdown to swap the CRUD operation shown (GET / POST / PUT / DELETE) and see how the flow and HTTP verb change while the overall five-step shape stays the same

Instructional Rationale: A clickable sequence flowchart matches the Understand-level objective by letting the learner trace one concrete request end to end and inspect the actual returned JSON, rather than only reading an abstract description of "REST operations."

Implementation: Mermaid flowchart with click handlers; responsive width.
```

## Related Resources

- [Chapter 22: FHIR Resources and Levels of Knowledge Representation](../../chapters/22-fhir-resources-and-knowledge-representation/index.md)

## References

- [Source chapter](../../chapters/22-fhir-resources-and-knowledge-representation/index.md) — supplied the learning objective and the worked example.
- [Mermaid flowchart documentation](https://mermaid.js.org/syntax/flowchart.html) — subgraphs, click directives, and class styling (accessed September 8, 2026).
- [HL7 FHIR RESTful API](https://hl7.org/fhir/http.html) — the normative definition of the interactions traced here (accessed September 8, 2026).
- [Wikipedia: Representational state transfer](https://en.wikipedia.org/wiki/Representational_state_transfer) — the architectural style FHIR's API follows.
