---
title: Reimbursement, Health Plan Types, and Payer Contracts
description: Models how paid claims are reimbursed to providers, surveys the major health plan types and government programs, and covers the payer-provider contracting infrastructure that connects them.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:10:44
version: 1.10
---

# Reimbursement, Health Plan Types, and Payer Contracts

## Summary

This chapter completes the payer perspective by covering how claims are paid: allowed amounts, reimbursement, explanation of benefits, and coordination of benefits. It surveys the major health plan types (HMO, PPO, POS, high-deductible plans, Medicare, and Medicaid) and the operational infrastructure -- payer contracts, network adequacy, clearinghouses, and eligibility verification -- that connects payers to providers. This closes the three-perspective (patient, provider, payer) foundation of the book.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Allowed Amount | 50 |
| Reimbursement | 32 |
| Explanation Of Benefits | 1 |
| Coordination Of Benefits | 2 |
| Subrogation | 1 |
| Health Maintenance Organization | 15 |
| Preferred Provider Organization | 2 |
| Point Of Service Plan | 1 |
| High-Deductible Health Plan | 2 |
| Medicare | 1 |
| Medicaid | 10 |
| Dual Eligibility | 2 |
| Payer Contract | 1 |
| Network Adequacy | 2 |
| In-Network Provider | 1 |
| Out-Of-Network Provider | 5 |
| Claims Clearinghouse | 2 |
| Electronic Remittance Advice | 1 |
| Eligibility Verification | 2 |
| Benefit Accumulator | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 14: Insurance Claims, Coverage, and Pharmacy Benefits](../14-insurance-claims-coverage-pharmacy-benefits/index.md)

---

Chapter 14 left a claim in adjudication, coinsurance calculated against a billed charge. That was a simplification — payers almost never pay a percentage of what a provider actually billed. This chapter fills in the missing piece: the contractually negotiated amount a claim is really paid against, how that payment reaches the provider, and the surrounding infrastructure of health plan types, government programs, and provider networks that make the whole payer ecosystem work. By the end of this chapter, the three-perspective foundation of this book — patient, provider, payer — is complete, and every later chapter builds financial and fraud analytics on top of it.

!!! mascot-welcome "Following the Money All the Way Home"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Welcome back! Last chapter we adjudicated a claim; this chapter we actually pay it. We'll trace the real dollar amount a payer reimburses a provider, tour the health plan alphabet soup (HMO, PPO, POS, HDHP), and wire up the contracts and clearinghouses connecting payers to providers behind the scenes. Every arm on this octopus is pointing at money today — let's connect the dots!

## The Allowed Amount and Reimbursement

When a provider joins a payer's network, they sign a contract fixing, for every procedure code, the maximum amount the payer will recognize as payable — the **allowed amount**. The allowed amount is almost always lower than the provider's billed charge, because the billed charge is closer to a list price while the allowed amount is a negotiated rate; a $500 billed office visit might have an allowed amount of only $320. Crucially, cost-sharing calculations from Chapter 14 — deductibles, copays, coinsurance — are always applied against the allowed amount, never the billed charge, and the gap between the two (here, $180) is written off by the in-network provider as a **contractual adjustment** that the patient can never be billed for. This single substitution — allowed amount in place of billed charge — is what actually makes network membership valuable to a patient, and it is the reason "in-network" and "out-of-network" (covered later in this chapter) produce such different financial outcomes for identical care.

Allowed amounts themselves are not invented from scratch in every contract negotiation; most commercial payer contracts anchor their fee schedule to a public benchmark, most commonly a percentage of the Medicare fee schedule (such as "140% of Medicare"), which Chapter 16 revisits when it models a hospital's charge master and billing codes directly. **Reimbursement** is the actual dollar amount the payer pays the provider once the allowed amount, coinsurance, and any remaining deductible have all been netted out. Reimbursement is the graph's terminal financial edge for a claim: `Claim -[REIMBURSED]-> Provider`, carrying a `paid_amount` property, closing the loop that began with `Claim -[SUBMITTED_BY]-> Provider` back in Chapter 14. Extending the multi-line claim from Chapter 14 with allowed amounts makes the full picture concrete.

| Line Item | Billed Charge | Allowed Amount | Coinsurance (20%) | Payer Reimburses |
|---|---|---|---|---|
| Office visit (CPT 99214) | $250 | $180 | $36 | $144 |
| EKG (CPT 93000) | $120 | $75 | $15 | $60 |
| Blood draw (CPT 36415) | $30 | $18 | $3.60 | $14.40 |

Notice the member's total coinsurance ($54.60) is now calculated against $273 of allowed amount rather than $400 of billed charge — a meaningfully smaller number for Maria, and the difference between what she actually owes and what an uninsured, out-of-network patient facing full billed charges would owe.

Once reimbursement is calculated, the payer must tell both parties what happened. An **explanation of benefits (EOB)** is the statement a payer sends to a member after a claim is adjudicated, itemizing the billed charge, the allowed amount, what the plan paid, and what the member owes — an EOB is explicitly *not* a bill, a distinction that confuses many patients seeing one for the first time, since the two documents often arrive within days of each other quoting different numbers for what looks like the same visit. Reading Maria's EOB for the office-visit claim above, she would see four lines matching the table's columns almost exactly: "Amount Billed: $400," "Plan Discount: $107," "Amount Covered: $239.40," and "You May Owe: $54.60" — the EOB's job is simply to make the graph traversal from billed charge to allowed amount to reimbursement to patient-responsibility legible to a human reader. The equivalent document sent to the provider, covered later in this chapter as the electronic remittance advice, reports the identical calculation from the opposite side of the transaction.

Two further complications arise when a member's coverage isn't as simple as one policy paying one claim. **Coordination of benefits (COB)** is the process that determines payment order when a member is covered by more than one policy at once — a child covered under both parents' employer plans, for instance — designating one policy as primary (pays first, against its own allowed amount) and the other as secondary (pays some or all of the remaining balance, up to its own allowed amount, never exceeding 100% of the total cost of care). Payers commonly apply a standardized rule for exactly this dependent-child scenario, nicknamed the "birthday rule": whichever parent's birthday falls earlier in the calendar year holds the primary policy, a simple, auditable tiebreaker that a graph model can encode directly as a property comparison between the two parents' `Member` nodes rather than a manually adjudicated judgment call. **Subrogation** is a related but distinct right: when a payer pays a claim for an injury actually caused by a liable third party — a car accident, for example — the payer can recover its payment directly from that third party or their insurer, typically by placing a legal lien against any settlement the injured member later receives, rather than absorbing the cost of care it never should have had to cover in the first place.

#### Diagram: Allowed Amount and Reimbursement Breakdown Chart

<iframe src="../../sims/allowed-amount-reimbursement-breakdown-chart/main.html" width="100%" height="780px" scrolling="no"></iframe>

<details markdown="1">
<summary>Allowed Amount and Reimbursement Breakdown Chart</summary>
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
</details>

!!! mascot-thinking "Allowed Amount Is the Real Price Tag"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Here's the mental model worth keeping: a billed charge is closer to a sticker price than an actual transaction. Every cost-sharing calculation in this book — deductibles, copays, coinsurance — runs against the allowed amount instead. Once that clicks, half of healthcare billing suddenly makes a lot more sense.

## Health Plan Types: HMO, PPO, POS, and HDHP

Health plans differ most visibly in how tightly they restrict a member's choice of provider in exchange for a lower premium. A **health maintenance organization (HMO)** requires members to select a primary care provider who coordinates all care and must issue a referral before the member sees a specialist, and it generally does not cover out-of-network care at all except in emergencies — the tightest restriction of the group, paired with the lowest typical premium. A **preferred provider organization (PPO)** relaxes both restrictions: no referral is required to see a specialist, and out-of-network care is covered, just at a higher coinsurance rate, in exchange for a higher premium than a comparable HMO. A **point-of-service plan (POS)** sits between the two, requiring a primary care provider and referrals like an HMO but allowing (at a cost) out-of-network care like a PPO. A **high-deductible health plan (HDHP)** is defined not by network structure at all but by cost-sharing structure: a deductible set high enough (a minimum set annually by federal rule) to qualify the plan for pairing with a tax-advantaged Health Savings Account, trading a lower premium for substantially higher up-front out-of-pocket exposure before the plan begins paying its share.

The table below reinforces these four plan types along the two dimensions that most affect a member day to day: whether a referral is required, and whether out-of-network care is covered at all.

| Plan Type | Requires PCP Referral? | Out-of-Network Coverage | Typical Premium |
|---|---|---|---|
| HMO | Yes | Emergency only | Lowest |
| PPO | No | Yes, at higher coinsurance | Highest |
| POS | Yes | Yes, at higher coinsurance | Moderate |
| HDHP | Varies (independent dimension) | Varies (independent dimension) | Low, paired with high deductible |

Suppose Maria Chen's employer offers both an HMO and a PPO built on the same underlying benefit-plan coverage categories from Chapter 14, with the HMO's premium set $150 per month lower. Under the HMO, Maria's primary care provider must first issue a referral before her cardiology visit is covered at all — the graph traversal for "is this claim payable?" now includes an additional required edge, `REFERRED_BY`, from the specialist claim back to an approved referral record, absent from the PPO's traversal entirely. If Maria skips that referral step and sees the cardiologist directly, the HMO can deny the claim outright regardless of medical necessity, purely on the missing referral — a distinct denial pathway from anything covered in Chapter 14's adjudication section. Choosing between the two plans is really a choice about how much of that gatekeeping graph structure a member is willing to navigate in exchange for $1,800 a year in premium savings.

These four plan types also interact with, rather than replace, the ACA metal tiers from Chapter 14: a marketplace listing might offer a "Bronze HMO" and a "Gold PPO" side by side, meaning the metal tier sets the overall cost-sharing generosity (Bronze pays less of the bill; Gold pays more) while the plan type independently sets the network and referral rules layered on top. A benefit-plan node in the graph therefore carries both properties — a `metal_tier` and a `plan_type` — as fully independent dimensions, not a single combined category.

## Medicare, Medicaid, and Dual Eligibility

Alongside employer-sponsored and marketplace plans, two federal programs insure a large share of the U.S. population directly. **Medicare** is the federal health insurance program primarily for people age 65 and older (and some younger people with qualifying disabilities), funded through payroll taxes and premiums, and administered uniformly under federal rules regardless of which state a beneficiary lives in. Medicare itself is split into distinct parts modeled as separate `BenefitPlan` nodes sharing one `Payer` node: Part A covers hospital inpatient stays, Part B covers outpatient and physician services (much like the coverage categories from Chapter 14), Part C ("Medicare Advantage") lets a beneficiary instead enroll in a private HMO- or PPO-style plan that administers all of Parts A and B together, and Part D covers prescription drugs through the same formulary structure introduced in Chapter 14. **Medicaid** is the joint federal-and-state health insurance program for low-income individuals and families; unlike Medicare, each state administers its own Medicaid program within federal guidelines, which means covered benefits, provider payment rates, and even basic eligibility thresholds all vary meaningfully from state to state — a detail that matters enormously for any graph model built to operate across multiple states, since a `BenefitPlan` node's `COVERS` edges for a Medicaid plan in Texas may differ substantially from the equivalent plan in New York even though both nodes carry the same `Medicaid` label and the same federal program name.

Some individuals qualify for both programs at once — a status called **dual eligibility**, typically covering low-income Medicare beneficiaries who also meet their state's Medicaid income and asset limits. For a dual-eligible member, Medicare acts as the primary payer for most medical services, and Medicaid acts as the secondary payer, picking up Medicare's cost-sharing (deductibles and coinsurance) that would otherwise fall to the member — exactly the coordination-of-benefits pattern introduced earlier in this chapter, just with two government programs instead of two commercial policies. Concretely, if a dual-eligible beneficiary has a $1,200 Medicare Part A hospital claim with a $200 Medicare deductible and 20% coinsurance on the remainder, Medicare pays $800 and the beneficiary's apparent $400 responsibility (the deductible plus coinsurance) is picked up entirely by Medicaid as secondary payer, leaving the beneficiary with $0 out of pocket — the outcome dual eligibility exists to guarantee. Modeling a dual-eligible member therefore requires two separate `ENROLLED_IN` edges from the same `Member` node — one to a Medicare policy, one to a Medicaid policy — with a `COORDINATES_WITH` edge between the two policies carrying a `primary_payer` property set to Medicare.

!!! mascot-tip "Spotting a Dual-Eligible Member in the Graph"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Want a fast way to query for dual-eligible members? Look for any `Member` node with two `ENROLLED_IN` edges pointing to policies of different program types. No special flag needed — the graph structure itself already encodes the status.

## Networks and Payer Contracts

Every allowed amount discussed earlier in this chapter exists because of a **payer contract**: a negotiated agreement between a payer and a provider that fixes reimbursement rates, defines covered services, and sets administrative requirements (such as timely filing deadlines and claim-submission formats) governing their relationship. These negotiations increasingly go beyond a flat fee schedule to include quality- and volume-based terms — a higher rate tied to meeting readmission-rate or patient-satisfaction targets, for instance — a thread Chapter 16 picks back up when it models provider compensation and value-based payment directly. A provider who has signed such a contract with a given payer is an **in-network provider** for that payer — the provider agrees to accept the contracted allowed amount as payment in full and cannot bill the patient for the contractual write-off. A provider with no such contract is an **out-of-network provider**: the payer has no negotiated rate to enforce, so the provider is generally free to bill the patient for the full difference between their charge and whatever the payer decides to recognize — a practice called balance billing, illustrated by the red segment in the chart earlier in this chapter. Note that "in-network" and "out-of-network" are properties of a specific provider-payer *pair*, not of the provider alone: the same cardiologist can be in-network for Meridian Health Payer while simultaneously out-of-network for a different payer entirely, which is exactly why the graph models this as a property of the `Payer Contract` edge rather than a flag on the `Provider` node itself. A federal law, the No Surprises Act, now blocks balance billing entirely for emergency care and for certain out-of-network specialists (such as an anesthesiologist) working at an in-network facility, treating those specific situations as if the provider were in-network regardless of the actual contract status.

Because network membership so directly shapes what a member actually pays, payers face **network adequacy** requirements — regulatory standards, usually set at the state level, mandating that a payer's network include enough in-network providers, of enough specialties, within a reasonable travel distance or wait time, that members can actually access covered care without being forced out-of-network. A payer that under-builds its network to cut contracting costs can run afoul of network adequacy rules even if every individual contract it does have is perfectly sound — the requirement is about network *shape*, not any single relationship, which is precisely the kind of property that a graph query (count providers per specialty within N miles of every member's home ZIP code) answers far more naturally than a relational report.

Returning to Maria Chen: suppose her cardiologist leaves Meridian Health Payer's network mid-year. Her next visit to that same physician, for identical care, now runs through a completely different edge in the graph — no `Payer Contract` node connects the provider to Meridian, so there is no negotiated allowed amount to apply, and Maria may face a balance bill for hundreds of dollars more than she would have paid a week earlier, despite nothing about her own coverage having changed at all.

## The Administrative Layer: Clearinghouses, Remittance, and Eligibility

A great deal of the machinery that makes claims processing and reimbursement work at scale is invisible to both patients and providers. A **claims clearinghouse** is an intermediary that receives a claim from a provider's billing system, checks it for formatting and coding errors, translates it into the format a specific payer requires, and routes it onward — most providers submit claims to dozens of different payers, each with slightly different formatting quirks, and a clearinghouse spares each provider from having to integrate directly with every payer's own system. This "claim scrubbing" step catches a meaningful share of the format-related processing failures from Chapter 14 before they ever reach the payer at all, which is why clearinghouse rejection rates are themselves a data quality signal healthcare organizations track closely. Once a claim is adjudicated, the payer sends the provider (rather than the member) an **electronic remittance advice (ERA)**, standardized as the X12 835 transaction — the provider-facing counterpart to the member's explanation of benefits, itemizing exactly which claims were paid, at what amount, and which were denied and why, formatted so that a provider's billing system can automatically post the payment without manual re-entry.

Before any of this can happen, a provider typically performs **eligibility verification** — a real-time check, run before or at the time of service, confirming that a patient's coverage is currently active and that the specific service being planned is covered under their benefit plan. This is the same `ENROLLED_IN` → `BASED_ON` → `COVERS` traversal from Chapter 14, just run proactively by the provider's front desk rather than reactively during claims processing (using the X12 270/271 eligibility-request and eligibility-response transactions), catching an eligibility problem before care is delivered rather than after a claim is denied. Every one of these checks reads or writes a member's **benefit accumulator** — the running year-to-date total, introduced in Chapter 14 as the deductible and out-of-pocket-maximum progress bars, that must be current and accurate at the moment eligibility is verified for the cost-sharing estimate to mean anything. Accumulators create a genuinely tricky data-modeling problem when a member switches jobs, and therefore policies, mid-year: a new payer has no visibility into the deductible dollars a member already accumulated under their old policy, so many employer transitions require the new payer to manually import a prior accumulator balance — a one-time data migration problem that looks small until you realize it must happen correctly for every single member switching plans on every renewal date, across the entire industry, every year.

#### Diagram: Claims Clearinghouse and Eligibility Verification Workflow

<iframe src="../../sims/claims-clearinghouse-eligibility-verification-workflow/main.html" width="100%" height="1427px" scrolling="no"></iframe>

<details markdown="1">
<summary>Claims Clearinghouse and Eligibility Verification Workflow</summary>
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
</details>

!!! mascot-encourage "The Administrative Layer Feels Invisible -- That's the Point"
    ![Sage giving encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If clearinghouses and remittance advice feel like background noise compared to claims and coverage, that's a completely reasonable reaction — they're deliberately built to be invisible when everything works. Just remember they're the plumbing that makes every other concept in this chapter actually flow end to end.

That plumbing is also the last piece needed to call the payer perspective complete: every claim now has a documented path from eligibility check through clearinghouse routing, adjudication, and remittance, with a running benefit accumulator tying each step back to the member's coverage.

## Chapter Summary

!!! mascot-celebration "The Payer Perspective Is Complete"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just closed the loop on the payer's side of the graph — allowed amounts, reimbursement, the full plan-type alphabet (HMO, PPO, POS, HDHP), Medicare and Medicaid, and the network contracts and administrative plumbing tying it all together. Patient, provider, and payer: all three perspectives are now on the table!

This chapter turned a coinsurance calculation from Chapter 14 into a complete financial round trip: an allowed amount replaces the billed charge, reimbursement pays the provider, and an EOB and ERA report the outcome to member and provider alike, with coordination of benefits and subrogation handling the edge cases where more than one payer is involved. Health plan types (HMO, PPO, POS, HDHP) and government programs (Medicare, Medicaid, dual eligibility) determine the rules each member operates under, while payer contracts, network adequacy, and the clearinghouse-and-remittance infrastructure make the whole system operate at scale. With patient, provider, and payer perspectives now all modeled as graphs, [Chapter 16](../16-healthcare-revenue-and-cost-analysis/index.md) turns to what all of this data means financially for a healthcare organization — revenue, cost, and profitability.
