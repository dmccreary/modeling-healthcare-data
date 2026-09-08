---
title: "Claims Clearinghouse and Eligibility Verification Workflow"
description: "Follow the administrative plumbing around claim adjudication -- eligibility verification, clearinghouse routing, and remittance -- and the benefit accumulator both halves share."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/claims-clearinghouse-eligibility-verification-workflow/claims-clearinghouse-eligibility-verification-workflow.png
og:image: /sims/claims-clearinghouse-eligibility-verification-workflow/claims-clearinghouse-eligibility-verification-workflow.png
library: Mermaid
bloom_level: Understand
---

# Claims Clearinghouse and Eligibility Verification Workflow

<iframe src="main.html" width="100%" height="1427px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

Adjudication gets the attention, but it is one box in a longer chain. Before the visit, the front desk asks the payer a real-time question and gets back the member's current deductible and out-of-pocket balances. After the visit, a coded claim travels through a clearinghouse, is adjudicated, updates those same balances, and returns as a machine-postable remittance advice. The dashed arrow from step 7 back to step 3 is the whole argument of the diagram: the benefit accumulator is shared state, so a cost estimate given in the morning can be wrong by the afternoon through no error by anyone. Use the swimlane buttons to isolate either half, or **Follow the accumulator** to see just the loop.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10-15 minutes. Prerequisites: the claim adjudication pipeline, and the Member-Policy-BenefitPlan-Coverage graph pattern.

**Learning objective:** Given the administrative claims infrastructure workflow, the learner can explain the role of a clearinghouse, an ERA, and eligibility verification, and summarize how the benefit accumulator connects to each.

1. **Explore:** View **Before the Visit** alone and note that no document is exchanged -- only a question and an answer. Then view **After the Visit** and count how many of those five steps produce or transform a document.
2. **Explain:** Select step 5, then step 6. Explain why a clearinghouse rejection is cheaper for a provider than a payer denial, even though both mean the claim was not paid on first submission.
3. **Transfer:** A patient is quoted $340 at check-in and billed $520 six weeks later, with no change in what was done. Using the dashed arrow, give one explanation that involves no error by anyone. Name the assumption your explanation depends on.

Assessment: use the Transfer prompt as an exit ticket. A complete response traces the accumulator from step 7 to step 3, distinguishes a stale estimate from an incorrect one, and names the timing assumption explicitly.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/claims-clearinghouse-eligibility-verification-workflow/main.html" width="100%" height="1427px"></iframe>
```

[JavaScript source](claims-clearinghouse-eligibility-verification-workflow.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 15: Reimbursement, Health Plan Types, and Payer Contracts](../../chapters/15-reimbursement-health-plans-payer-contracts/index.md).

```text
Type: workflow
**sim-id:** claims-clearinghouse-eligibility-verification-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: explain, summarize<br/>
Learning objective: Given the administrative claims infrastructure workflow, the learner can explain the role of a clearinghouse, an ERA, and eligibility verification, and summarize how the benefit accumulator connects to each.

Purpose: Show how a claim's administrative "plumbing" -- eligibility verification, clearinghouse routing, and remittance -- surrounds the processing and adjudication pipeline covered in Chapter 14, all reading from or writing to the same benefit accumulator.

Visual style: Left-to-right flowchart with two parallel swimlanes: "Before the Visit" and "After the Visit"

Steps (Before the Visit swimlane):

1. "Front Desk Initiates Eligibility Check" -- Click text: "Provider's system queries the payer in real time before the appointment, using the X12 270 eligibility-request transaction."
2. "Query Member -> Policy -> BenefitPlan -> Coverage Graph" -- Click text: "The same ENROLLED_IN -> BASED_ON -> COVERS traversal from Chapter 14, run proactively."
3. "Return Active Coverage + Current Accumulator Balances" -- Click text: "The payer's X12 271 response reports deductible-met and OOP-max-remaining amounts so the front desk can estimate the patient's cost before care is delivered."

Steps (After the Visit swimlane):

4. "Provider Submits Claim (837)" -- Click text: "The coded claim from Chapter 14 leaves the provider's billing system."
5. "Claims Clearinghouse Validates and Routes" -- Click text: "The clearinghouse checks formatting, translates to the payer's required format, and forwards the claim -- sparing the provider from integrating with every payer directly."
6. "Payer Processes and Adjudicates" -- Click text: "The full pipeline from Chapter 14 runs here."
7. "Benefit Accumulator Updated" -- Click text: "The member's deductible and OOP-max running totals are updated with this claim's result, which the NEXT eligibility check (back in the other swimlane) will read."
8. "Electronic Remittance Advice (ERA / X12 835) Sent to Provider" -- Click text: "The provider-facing counterpart to the member's EOB, itemizing what was paid, denied, and why, formatted for automatic posting."

Connections: A dashed feedback arrow from step 7 ("Benefit Accumulator Updated") back to step 3 ("Return Active Coverage + Current Accumulator Balances"), visually closing the loop between the two swimlanes.

Color coding:

- Blue: real-time query/graph-traversal steps (1, 2, 3, 7)
- Orange: document/transaction steps (4, 8)
- Gray: intermediary/processing steps (5, 6)

Implementation: Mermaid flowchart with `click` directives on every node opening an infobox with that node's click text
```

## Related Resources

- [Chapter 15: Reimbursement, Health Plan Types, and Payer Contracts](../../chapters/15-reimbursement-health-plans-payer-contracts/index.md)

## References

- [Source chapter](../../chapters/15-reimbursement-health-plans-payer-contracts/index.md) — supplied the learning objective and the worked example.
- [Mermaid flowchart documentation](https://mermaid.js.org/syntax/flowchart.html) — subgraphs, click directives, and class styling (accessed September 8, 2026).
- [Wikipedia: Clearing house (finance)](https://en.wikipedia.org/wiki/Clearing_house_%28finance%29) — the general intermediary pattern this workflow instantiates.
- [CMS: Electronic transactions and HIPAA administrative simplification](https://www.cms.gov/priorities/key-initiatives/burden-reduction/administrative-simplification/hipaa) — background on the standardized X12 transaction sets (accessed September 8, 2026).
