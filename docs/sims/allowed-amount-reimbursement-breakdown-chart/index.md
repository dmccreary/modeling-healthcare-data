---
title: "Allowed Amount and Reimbursement Breakdown Chart"
description: "Split five claim lines into payer reimbursement, member coinsurance, contractual write-off, and balance bill, and price the difference network status makes."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/allowed-amount-reimbursement-breakdown-chart/allowed-amount-reimbursement-breakdown-chart.png
og:image: /sims/allowed-amount-reimbursement-breakdown-chart/allowed-amount-reimbursement-breakdown-chart.png
library: Chart.js
bloom_level: Apply
---

# Allowed Amount and Reimbursement Breakdown Chart

<iframe src="main.html" width="100%" height="780px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

A billed charge is not a price; it is an opening position. Each bar here is a full billed charge divided four ways, and the hatched segment is the part nobody pays -- the provider gave it up in exchange for being in the network. Coinsurance is computed on the allowed amount, not the billed charge, which is why the member's share is so much smaller than the sticker figure suggests. The two MRI bars are the payoff: identical procedure, identical $1,800 billed, identical $900 allowed, and a member cost that is 5.0x higher out of network. **Compare the two MRIs** decomposes that gap into the part caused by the higher coinsurance rate and the much larger part caused by the missing write-off.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 12-18 minutes. Prerequisites: the idea of a negotiated rate between a payer and a provider.

**Learning objective:** Given a billed charge and a contracted allowed amount, the learner can calculate the contractual adjustment, the member's coinsurance share, and the payer's reimbursement for a set of sample claims.

1. **Explore:** Use **Zoom to routine claims** to read the office visit, EKG, and blood draw at usable scale. Turn on the billed-charge marker and note how much of each bar sits to the left of it.
2. **Explain:** Select **Compare the two MRIs**. Explain to a partner which of the two contributions to the member's higher out-of-network cost is larger, and why the write-off is the one that disappears rather than the coinsurance.
3. **Transfer:** A provider is in-network for one plan and out-of-network for another. Say where network status must be stored in a graph model so that both facts can be true at once, and what would go wrong if it were stored as a property of the provider.

Assessment: use the Transfer prompt as an exit ticket. A complete response places network status on the provider-plan relationship, explains why a node property cannot represent it, and connects that choice back to which bar a claim would produce.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/allowed-amount-reimbursement-breakdown-chart/main.html" width="100%" height="780px"></iframe>
```

[JavaScript source](allowed-amount-reimbursement-breakdown-chart.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 15: Reimbursement, Health Plan Types, and Payer Contracts](../../chapters/15-reimbursement-health-plans-payer-contracts/index.md).

```text
Type: chart
**sim-id:** allowed-amount-reimbursement-breakdown-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: calculate, demonstrate<br/>
Learning objective: Given a billed charge and a contracted allowed amount, the learner can calculate the contractual adjustment, the member's coinsurance share, and the payer's reimbursement for a set of sample claims.

Purpose: Make visible, for several sample claims, the four-way split between billed charge, contractual write-off, member coinsurance, and payer reimbursement -- the calculation chain the preceding worked table walks through by hand.

Chart type: Stacked horizontal bar chart

X-axis: Dollar amount (0 to $500)
Y-axis: Claim line item (Office Visit, EKG, Blood Draw, plus a fourth "MRI (Out-of-Network)" bar contrasted against the same MRI billed in-network)

Data series (stacked segments per bar, left to right):

- Payer Reimbursement (dark blue)
- Member Coinsurance (orange)
- Contractual Adjustment / Write-Off (light gray, hatched pattern to indicate "not owed by anyone")

Default data:

- Office Visit: billed $250, allowed $180, reimbursement $144, coinsurance $36, write-off $70
- EKG: billed $120, allowed $75, reimbursement $60, coinsurance $15, write-off $45
- Blood Draw: billed $30, allowed $18, reimbursement $14.40, coinsurance $3.60, write-off $12
- MRI (In-Network): billed $1,800, allowed $900, reimbursement $720, coinsurance $180, write-off $900
- MRI (Out-of-Network): billed $1,800, allowed $900 (plan still recognizes only $900), reimbursement $450, member balance-bills remaining $900 (shown as a fourth, red "Balance Bill" segment with no equivalent in the in-network bars)

Interactive controls:

- Hover over any segment to see its exact dollar value and a one-sentence definition of that segment's term (Allowed Amount, Reimbursement, Coinsurance, Write-Off, or Balance Bill)
- Toggle button: "Show billed charge line" -- overlays a thin vertical marker at the original billed-charge position on each bar so the learner can see how far the allowed amount already reduced the number before cost-sharing was even applied
- Click the MRI (Out-of-Network) bar to open a callout comparing it directly against MRI (In-Network), highlighting that the out-of-network patient pays coinsurance on the allowed amount AND the full gap between billed and allowed as a balance bill

Instructional Rationale: A stacked bar makes the Apply-level calculation chain (billed to allowed to coinsurance to reimbursement) directly visible and comparable across claims, and pairing an in-network MRI against an identical out-of-network MRI gives a concrete, quantifiable answer to "why does network status matter?" before the chapter's later section defines in-network and out-of-network providers formally.

Color scheme: dark blue (reimbursement), orange (coinsurance), light gray hatch (write-off), red (balance bill, out-of-network only)

Implementation: Chart.js horizontal stacked bar chart with a custom tooltip callback and a click handler for the comparison callout
```

## Related Resources

- [Chapter 15: Reimbursement, Health Plan Types, and Payer Contracts](../../chapters/15-reimbursement-health-plans-payer-contracts/index.md)

## References

- [Source chapter](../../chapters/15-reimbursement-health-plans-payer-contracts/index.md) — supplied the learning objective and the worked example.
- [Chart.js documentation](https://www.chartjs.org/docs/latest/) — scales, stacked bars, tooltips, and custom plugins (accessed September 8, 2026).
- [Wikipedia: Balance billing](https://en.wikipedia.org/wiki/Balance_billing) — the fourth segment, and why it appears only out of network.
- [Wikipedia: Coinsurance](https://en.wikipedia.org/wiki/Co-insurance) — the member share computed on the allowed amount.
