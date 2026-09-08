---
title: Insurance Claims, Coverage, and Pharmacy Benefits
description: Models the payer perspective on healthcare data -- insurance policies, benefit plans, cost-sharing, the claims lifecycle, and pharmacy benefit management -- as graph structures.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:10:44
version: 1.10
---

# Insurance Claims, Coverage, and Pharmacy Benefits

## Summary

This chapter introduces the payer perspective, starting with how an insurance claim moves through processing, adjudication, denial, and dispute. It covers insurance policies, coverage, benefit plans, copayments, and deductibles, then turns to pharmacy benefit management: formularies, brand versus generic drugs, prior authorization, and utilization review. Students learn the claims-processing vocabulary that underlies most payer-side graph analytics.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Insurance Claim | 120 |
| Claim Processing | 52 |
| Claim Adjudication | 51 |
| Claim Denial | 2 |
| Claim Dispute | 1 |
| Insurance Policy | 65 |
| Coverage | 2 |
| Benefit Plan | 1 |
| Copayment | 2 |
| Deductible | 1 |
| Out-Of-Pocket Maximum | 60 |
| Premium | 2 |
| Formulary | 1 |
| Formulary Rule | 2 |
| Brand Drug | 1 |
| Generic Drug | 55 |
| Pharmacy Benefit Manager | 2 |
| Prior Authorization | 1 |
| Utilization Review | 2 |
| Medical Necessity | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 7: Healthcare Economics and Medical Coding Systems](../07-healthcare-economics-medical-coding/index.md)
- [Chapter 12: Provider Organizations, Networks, and Scheduling](../12-provider-organizations-networks-scheduling/index.md)

---

Every earlier chapter modeled healthcare from the patient's or the provider's point of view: diagnoses, treatments, schedules, and referral networks. Behind every one of those encounters sits a third stakeholder who rarely appears in the exam room but decides how much anyone actually gets paid — the payer. This chapter opens the payer perspective of the book by modeling the insurance policies and benefit plans that determine what a service costs before a claim is ever filed, then follows a claim through processing, adjudication, denial, and dispute. Chapter 7 introduced the billing codes (ICD-10, CPT, HCPCS) that identify what happened during an encounter; this chapter models what happens *next* — how a coded encounter becomes a claim, and how a benefit plan decides what that claim is worth.

!!! mascot-welcome "Welcome to the Payer's Side of the Graph"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Hi again — we've spent a lot of chapters following patients and providers around, and now it's time to follow the money. Insurance claims, formularies, and benefit plans might sound dry on paper, but they hide some genuinely tentacle-y graph structures once you look closely. By the end of this chapter you'll be able to model a claim's entire journey from submission to payment as a graph traversal. Let's connect the dots!

## Modeling the Payer: Policies, Coverage, and Benefit Plans

An **insurance policy** is a legal contract between a payer and a policyholder that obligates the payer to pay for defined healthcare costs in exchange for a periodic payment, called a **premium** — the fixed amount the policyholder pays (typically monthly) simply to keep the policy active, regardless of how much care is used that month. A policy is never designed from scratch; it is always built on top of a reusable **benefit plan**, a named package of rules (such as "Meridian Gold PPO") that specifies what is covered, at what cost-sharing level, and under what conditions. Many different policies, held by many different members, can all reference the exact same benefit plan — which is precisely why a graph model separates the two: the plan is a template node, and each policy is an instance that points back to it.

A benefit plan's central job is to define **coverage**: a yes-or-no determination of whether a category of care is paid for at all. Coverage is assigned per category — hospital inpatient care, outpatient visits, prescription drugs, mental health services, durable medical equipment — and a plan can cover one category generously while excluding another entirely. Historically, many U.S. benefit plans covered physical health categories but sharply limited or excluded mental and behavioral health coverage, a gap that federal parity laws have narrowed but not eliminated. Modeling coverage explicitly as its own node, rather than as a buried flag on the plan, is what lets a graph query answer "is this specific category covered?" with a single traversal instead of a lookup table.

Let's continue the running example from Chapter 1: Maria Chen, our patient, is a member enrolled in a policy issued by Meridian Health Payer. That policy is based on the "Meridian Gold PPO" benefit plan, which covers four categories: hospital inpatient, outpatient visits, prescription drugs, and mental health. As a graph, this reads as a chain of four node types connected by three edge types: a `Member` node is `ENROLLED_IN` a `Policy` node, which is `BASED_ON` a `BenefitPlan` node, which `COVERS` one or more `CoverageCategory` nodes. Answering "does Maria's plan cover mental health visits?" is a two-hop traversal from Maria to her policy, from her policy to the plan, and from the plan to the coverage category — no different in structure from the provider-lookup traversals in Chapter 1, just with different node labels.

Before looking at the rendered graph, notice that a payer, such as Meridian Health Payer, typically `OFFERS` several benefit plans at once — commonly following the ACA marketplace's Bronze, Silver, Gold, and Platinum metal-tier naming, which roughly indicates the split between what the plan pays and what the member pays out of pocket over a year (a Bronze plan pays a smaller share and charges a lower premium; a Platinum plan pays a larger share for a higher premium). Every one of those plans is a separate `BenefitPlan` node with its own set of `COVERS` edges. This is exactly the flexible-schema advantage from Chapter 1: two benefit plans can cover overlapping but different sets of categories without forcing every plan into identical table columns. Suppose a second member, James Okafor, enrolls under a Silver HMO plan from the same payer that covers hospital inpatient and outpatient visits but excludes mental health entirely. Both members' policies point to the same `Payer` node, but each policy's `BASED_ON` edge leads to a structurally different `BenefitPlan` node — the graph represents this real-world variation without any schema change, whereas a relational design would need either a sparse, mostly-`NULL` coverage table or a separate coverage-exception table just to express the same fact.

Separating `Policy` from `BenefitPlan` as two distinct node types, rather than collapsing coverage details directly onto each policy, also pays off at scale: a large payer might administer two million individual policies built on only a few hundred distinct benefit-plan designs. Storing the coverage rules once on the shared `BenefitPlan` node and letting every policy simply point to it means that updating a coverage rule for open enrollment touches one node instead of two million rows — the same deduplication principle that motivates normalized design in a relational schema, applied naturally to a graph.

#### Diagram: Insurance Policy and Benefit Plan Graph Model

<iframe src="../../sims/insurance-policy-benefit-plan-graph-model/main.html" width="100%" height="488px" scrolling="no"></iframe>

[Run the Insurance Policy and Benefit Plan Graph Model MicroSim Fullscreen](../../sims/insurance-policy-benefit-plan-graph-model/main.html){ .md-button }

<details markdown="1">
<summary>Insurance Policy and Benefit Plan Graph Model (reused)</summary>
Type: graph-model
**sim-id:** insurance-policy-benefit-plan-graph-model<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/insurance-policy-benefit-plan-graph-model/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/insurance-policy-benefit-plan-graph-model

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: identify, classify<br/>
Learning objective: Given a rendered payer/plan/policy graph, the learner can identify the OFFERS, COVERS, BASED_ON, and ENROLLED_IN edges and trace the two-hop path from a member to a specific coverage category.

Reused from this book's MicroSim library. This graph models a payer that OFFERS one or more benefit plans; each plan COVERS several coverage categories (hospital inpatient, prescription drugs, mental health); a policy is BASED_ON a plan; and members are ENROLLED_IN a policy. Dragging nodes and comparing the Gold PPO and Silver HMO plans lets the learner see that two plans from the same payer can cover different category sets while sharing the same graph shape — directly reinforcing the coverage and benefit-plan definitions above.
</details>

## Paying for Care: Cost-Sharing and the Out-of-Pocket Maximum

Coverage tells us *whether* a category of care is paid for; cost-sharing terms tell us *how much of the bill the member pays versus the payer*. A **deductible** is the amount a member must pay out of pocket for covered services before the plan begins paying its share at all — until the deductible is met, the member is effectively self-insured for routine care. Family plans typically model this with two deductible accumulators rather than one: an aggregate family deductible that any combination of family members can satisfy together, and often a lower individual deductible that lets a single family member with heavy utilization trigger plan payments before the whole family total is reached. A **copayment** (or copay) is a fixed dollar amount the member pays for a specific service, such as $30 for a primary-care visit, regardless of what the provider actually charged. Coinsurance, a closely related term, is a percentage split (such as 80/20) applied after the deductible is met, rather than a flat dollar amount.

A **premium** is the periodic payment — usually monthly — that keeps a policy active, and it is charged regardless of whether the member uses any care that month at all. For an employer-sponsored policy, the employer typically pays a large share of the premium directly to the payer and deducts the remainder from the employee's paycheck; for an individual marketplace policy, the member pays the full premium, sometimes reduced by a government subsidy tied to income. Premiums fund the payer's ability to pay claims across its entire membership pool, which is why a payer's premium pricing depends heavily on the collective risk of everyone enrolled — a connection Chapter 17 returns to when it models financial risk pools directly.

None of these cost-sharing amounts can grow without bound, because every plan caps a member's total annual exposure with an **out-of-pocket maximum (OOP max)** — the single dollar amount beyond which the plan pays 100% of covered costs for the remainder of the plan year, no exceptions. The out-of-pocket maximum is the concept that ties every other cost-sharing term together into one enforceable ceiling, which is why it carries the highest Concept Impact Score in this group: a graph model of cost-sharing is really a model of one running total (the member's year-to-date accumulated spending) being compared, service by service, against the deductible threshold and then the OOP max threshold.

Consider Maria Chen's plan year. Her benefit plan sets a $1,500 deductible, a $30 copay for primary-care visits, 20% coinsurance after the deductible, and a $6,000 OOP maximum. Her first visit of the year costs $200; because she hasn't met her deductible, she pays the full $200 (deductible accumulator: $200 of $1,500). Later, a $4,000 outpatient procedure pushes her past the deductible — she pays the remaining $1,300 to satisfy it, then 20% coinsurance on the remaining $2,700 ($540), for a total of $1,840 on that claim (deductible accumulator: $1,500 of $1,500; OOP accumulator: $2,040 of $6,000). This pattern — accumulate against the deductible first, then apply coinsurance, then check the running total against the OOP max — can be written as a simple decision rule:

\[ \text{Member Owes} = \min\big(\text{Remaining Deductible} + \text{Coinsurance Share},\ \text{OOP Max} - \text{YTD Accumulated}\big) \]

The formula makes explicit what the MicroSim below animates: the deductible and the OOP maximum are both running totals attached to the member for the plan year, and every new claim updates both simultaneously.

Later that same year, Maria has a $15,000 hospital stay. Her deductible is already satisfied, so coinsurance applies immediately: 20% of $15,000 is $3,000, but her OOP accumulator is already at $2,040 from the earlier claims, and only $3,960 of room remains before the $6,000 cap ($6,000 − $2,040). Because $3,000 is less than that remaining room, she pays the full $3,000 coinsurance share, bringing her OOP accumulator to $5,040. If a fourth claim arrived later for another $2,000 of coinsurance-eligible charges, the plan would cap her contribution at the remaining $960 and pay 100% of everything beyond that point for the rest of the plan year — the OOP maximum doing exactly the job its name promises. Federal law caps how high an ACA-compliant plan's OOP maximum can be set each year, which is precisely why this single accumulator, more than the deductible or any individual copay, is the number that determines a member's worst-case financial exposure.

!!! mascot-thinking "Why the OOP Max Is the 'Real' Ceiling"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that a deductible and a copay are just intermediate speed bumps — the OOP max is the actual promise a plan makes to a member. If you're ever modeling cost-sharing in a graph, that year-to-date accumulator is the property that has to update on every single claim, no exceptions.

#### Diagram: Cost-Sharing Calculation MicroSim

<iframe src="../../sims/cost-sharing-calculation-microsim/main.html" width="100%" height="618px" scrolling="no"></iframe>

[Run the Cost-Sharing Calculation MicroSim Fullscreen](../../sims/cost-sharing-calculation-microsim/main.html){ .md-button }

<details markdown="1">
<summary>Cost-Sharing Calculation MicroSim (reused)</summary>
Type: microsim
**sim-id:** cost-sharing-calculation-microsim<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/cost-sharing-calculation-microsim/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/cost-sharing-calculation-microsim

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: calculate, demonstrate<br/>
Learning objective: Given a deductible, coinsurance rate, and out-of-pocket maximum, the learner can calculate a member's share of a sequence of services and predict when the OOP maximum caps further spending.

Reused from this book's MicroSim library. Adjusting the deductible, OOP maximum, and coinsurance sliders and adding services from the dropdown lets the learner watch the deductible and OOP-maximum progress bars fill in real time, exactly matching the worked Maria Chen example above, and see the milestone the moment the OOP maximum caps the member's spending for the rest of the year.
</details>

## The Life of an Insurance Claim

Once care is delivered and coded, the provider (or the provider's billing system) submits an **insurance claim**: a formal, structured request for payment that packages the coded diagnosis and procedure information from Chapter 7 with the patient's identity, the provider's identity, and the dates of service. In practice, a claim is transmitted electronically in a standardized EDI format — the 837 transaction set, professional or institutional — carrying structured fields for the member identifier, the billing and rendering provider's National Provider Identifier (NPI), one or more ICD-10 diagnosis codes, one or more CPT or HCPCS procedure codes with units and a billed charge amount, and the dates of service. A claim is the single most important node type in the payer's graph, because nearly every downstream financial concept in this book — reimbursement, denial rates, fraud detection — is computed by traversing patterns of claims, and every field listed above becomes either a property on the `Claim` node or an edge to another node (`SUBMITTED_BY` a provider, `FOR_MEMBER` a member, `DIAGNOSED_AS` one or more conditions).

A submitted claim does not simply get paid; it passes through **claim processing**, the administrative pipeline that validates the claim's format, confirms the member's eligibility on the date of service, checks whether the billed provider is in-network, and verifies that the billed service is covered under the member's benefit plan. Processing also runs front-end "edits" — automated rules that catch malformed claims before they ever reach a human or an adjudication engine, such as a procedure code that does not exist, a diagnosis code inconsistent with the patient's age or sex, or a missing required field. Only after processing succeeds does the claim reach **claim adjudication** — the payer's actual coverage-and-payment decision, in which the adjudication engine checks the claim against the coverage categories from the previous section, any prior authorization requirements introduced later in this chapter, and the member's remaining deductible and OOP-max accumulators from the previous section, then calculates exactly what the payer will pay and what the member owes. Processing asks "is this claim valid and eligible?"; adjudication asks "what should be paid, and how much?" — two distinct steps that are easy to conflate but that a graph-based claims engine implements as two separate traversal stages over two different parts of the graph.

Every one of the eligibility, network, coverage, and accumulator checks embedded in processing and adjudication is naturally expressed as a graph traversal rather than a table lookup: "is this member eligible?" follows the `ENROLLED_IN` edge from the claim's member to their policy and checks an `effective_date` property; "is this provider in-network?" follows an edge from the provider to the payer's contracted-provider list; "is this service covered?" retraces the `BASED_ON` → `COVERS` path from the previous section; "how much of the deductible remains?" reads a property directly off the member's accumulator node updated by every prior claim this year. Behind the scenes, most claims never travel directly from provider to payer at all — they pass through a claims clearinghouse, an intermediary that translates and validates the 837 transaction before routing it onward, a piece of the infrastructure Chapter 15 covers in detail once we widen our view to the full payer-contract ecosystem.

Walking through a concrete adjudication with several line items makes the pipeline's arithmetic concrete. Maria's cardiologist bills a single claim with three line items: an office visit, an EKG, and a blood draw. The table below shows how the adjudication engine resolves each line once eligibility, network status, and coverage have already passed.

| Line Item | Billed Charge | Coverage Category | Coinsurance Rate | Member Owes |
|---|---|---|---|---|
| Office visit (CPT 99214) | $250 | Outpatient visits | 20% | $50 |
| EKG (CPT 93000) | $120 | Outpatient visits | 20% | $24 |
| Blood draw (CPT 36415) | $30 | Outpatient visits | 20% | $6 |

Because Maria's deductible was already satisfied earlier in the year, coinsurance applies to every line item independently, and adjudication sums the three member-owed amounts ($80 total) into a single patient-responsibility figure reported back on the claim — even though the underlying check ("is this covered? what's the coinsurance rate? has the deductible been met?") is identical logic re-applied once per line item. This table simplifies one detail Chapter 15 restores: payers rarely calculate coinsurance against the full billed charge shown here, but against a lower, contractually negotiated allowed amount instead.

When any single check in this pipeline fails, adjudication produces a **claim denial** — a payer decision not to pay all or part of a claim, always tied to a specific reason code. Payers use a standardized X12 code set called Claim Adjustment Reason Codes (CARCs) to communicate exactly why a claim was denied or reduced, which matters enormously for graph-based analytics because it turns "why was this claim denied?" into a queryable property rather than free text. The table below reinforces four denial reasons already implied by the workflow diagram below, connecting each to the processing or adjudication stage that produces it.

| Denial Reason | Lifecycle Stage | Example Trigger |
|---|---|---|
| Invalid or incomplete claim format | Claim Processing | A required field, such as the rendering provider's NPI, is missing |
| Member ineligible on date of service | Claim Processing | The policy's `effective_date` had already lapsed when care was delivered |
| Service not covered under the plan | Claim Adjudication | The billed category has no `COVERS` edge from the member's benefit plan |
| Missing required prior authorization | Claim Adjudication | The service required prior authorization (see later in this chapter) that was never obtained |

A denial is not necessarily final: a provider or member who believes a denial was issued in error can file a **claim dispute**, a formal request for the payer to re-review the adjudication decision, typically by submitting additional clinical documentation or correcting the disputed field. Most payers implement disputes in two tiers — an internal reconsideration handled by the payer's own claims staff, followed, if the member is still dissatisfied, by an external review conducted by an independent third party outside the payer's control — each level bound by strict filing and response deadlines (commonly 180 days for a member to file, and 30-60 days for the payer to respond) so that a denial cannot simply sit unresolved indefinitely. Suppose the earlier missing-prior-authorization denial happened because Maria's specialist's office simply forgot to submit the request, even though the MRI itself was clearly medically necessary; the specialist's office files a claim dispute with the missing authorization documentation attached retroactively, and the payer's reconsideration team reverses the original denial without the case ever needing to escalate to external review.

It is worth distinguishing a denial from an outright claim rejection, a term some payers reserve for claims that never even complete processing because of a data or format error — a rejected claim is simply corrected and resubmitted as a new claim, while a denied claim has already been adjudicated and requires a formal dispute, not a resubmission, to be revisited. Both denial reason codes (CARCs) and a companion set of remark codes (RARCs, Remittance Advice Remark Codes) travel with every adjudicated claim regardless of outcome, giving payers, providers, and — as later chapters show — fraud analysts a structured, queryable vocabulary for exactly what happened to every single claim in the graph. Chapter 15 picks up exactly what happens to a claim that *does* get paid — the allowed amount, the reimbursement, and the explanation of benefits sent back to the member.

#### Diagram: Claims Lifecycle Workflow with Graph Database Integration

<iframe src="../../sims/claims-lifecycle-workflow-graph-database-integration/main.html" width="100%" height="1716px" scrolling="no"></iframe>

[Run the Claims Lifecycle Workflow MicroSim Fullscreen](../../sims/claims-lifecycle-workflow-graph-database-integration/main.html){ .md-button }

<details markdown="1">
<summary>Claims Lifecycle Workflow with Graph Database Integration (reused)</summary>
Type: workflow
**sim-id:** claims-lifecycle-workflow-graph-database-integration<br/>
**Library:** Mermaid<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/claims-lifecycle-workflow-graph-database-integration/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/claims-lifecycle-workflow-graph-database-integration

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, distinguish<br/>
Learning objective: Given the claims lifecycle flowchart, the learner can distinguish processing gates from adjudication gates and identify which specific gate failure produces which claim denial reason.

Reused from this book's MicroSim library. This flowchart follows a claim from submission through adjudication to payment, marking every graph-database traversal (eligibility, network/coverage, prior authorization, accumulators) in green. Hovering each step reveals what it checks, and every failing gate routes to a denied outcome tied to one specific reason — letting the learner trace, node by node, the exact difference between a processing failure and an adjudication failure described in the prose above, then follow the "happy path" all the way to a paid claim written back into the graph.
</details>

!!! mascot-tip "A Shortcut for Remembering Processing vs. Adjudication"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a trick: processing asks yes/no questions ("Is this claim even valid?"), while adjudication does arithmetic ("What dollar amount gets paid?"). If a step involves a calculation against a deductible or coinsurance rate, it's adjudication, not processing.

## Pharmacy Benefits: Formularies and the Pharmacy Benefit Manager

Prescription drug coverage runs through its own specialized graph structure, managed by a **pharmacy benefit manager (PBM)** — a third-party organization that negotiates drug prices and rebates with manufacturers, builds and maintains formularies on behalf of payers, and processes pharmacy claims in real time at the point of sale, all within the few seconds a patient stands at the pharmacy counter. That real-time pharmacy claim is, structurally, the same processing-then-adjudication pipeline covered earlier in this chapter — eligibility, formulary coverage, and accumulator checks all run before the pharmacist ever sees a price — just compressed into a single interactive transaction instead of a batch submitted after the fact. Beyond formulary design, PBMs also operate mail-order and specialty pharmacy networks for high-cost or hard-to-handle drugs, and they profit partly through manufacturer rebates and partly through the spread between what they charge a payer and what they reimburse a pharmacy — a pricing structure that has drawn regulatory scrutiny and is itself a recurring subject of the fraud, waste, and abuse analytics covered in Chapters 18 and 19.

The PBM's central artifact is the **formulary**: a payer-approved list of covered drugs, organized into cost tiers that determine a member's copay. A typical formulary uses four or five tiers, reinforced in the table below, moving from the cheapest generics to the most expensive specialty biologics.

| Tier | Typical Contents | Typical Member Cost |
|---|---|---|
| Tier 1 | Preferred generics | $5-$15 copay |
| Tier 2 | Preferred brand drugs | $30-$60 copay |
| Tier 3 | Non-preferred brand drugs | $60-$100 copay or coinsurance |
| Tier 4/5 | Specialty drugs (biologics, injectables) | 20-30% coinsurance, often with a separate cap |

Every drug on a formulary falls into one of two categories. A **brand drug** is a medication still protected by patent or marketing exclusivity, sold under a manufacturer's trademarked name at a price the manufacturer sets largely without competition. A **generic drug** is a bioequivalent version of a brand drug, manufactured and sold once the original patent expires — often triggering a "patent cliff" where multiple manufacturers enter simultaneously — typically priced 80-85% below the brand at a fraction of the original cost. Concretely, brand-name Lipitor might cost a payer $450 for a 30-day supply, while generic atorvastatin costs closer to $12 for the same supply; across a plan with tens of thousands of members on a statin, that difference compounds into millions of dollars a year, which is exactly why Generic Drug carries a Concept Impact Score nearly as high as Insurance Policy in this chapter. Nearly every pharmacy benefit rule that follows — formulary tier design, step therapy, PBM cost containment — exists specifically to steer prescribing toward generics wherever a clinically equivalent option is available.

That steering is implemented through **formulary rules** — the conditions attached to a drug's coverage beyond simply being on the list, most commonly **step therapy**, which requires a member to try (and fail) a lower-cost drug before the plan will cover a more expensive alternative. Continuing our worked example: Maria Chen's cardiologist wants to prescribe brand-name Lipitor for elevated cholesterol. Her formulary places generic atorvastatin (the bioequivalent generic for Lipitor) at Tier 1 with a $10 copay, and Lipitor itself at Tier 3 with a $75 copay — but only after a formulary rule requiring atorvastatin be tried first. As a graph, this is a `STEP_THERAPY_BEFORE` edge running from the generic drug node to the brand drug node, layered on top of a `MEMBER_OF` edge connecting both drugs to the same therapeutic class (statins) and an `ALTERNATIVE_TO` edge marking them as clinically interchangeable. If Maria's cardiologist has a clinical reason she cannot tolerate the generic — a documented allergy, for instance — the prescriber can submit a formulary exception request, asking the PBM to waive the step-therapy rule for this specific member; approval turns that single `STEP_THERAPY_BEFORE` edge into an override property on Maria's claim rather than a change to the underlying formulary graph itself.

#### Diagram: Formulary Management and Step Therapy Graph Model

<iframe src="../../sims/formulary-management-step-therapy-graph-model/main.html" width="100%" height="488px" scrolling="no"></iframe>

[Run the Formulary Management and Step Therapy Graph Model MicroSim Fullscreen](../../sims/formulary-management-step-therapy-graph-model/main.html){ .md-button }

<details markdown="1">
<summary>Formulary Management and Step Therapy Graph Model (reused)</summary>
Type: graph-model
**sim-id:** formulary-management-step-therapy-graph-model<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/formulary-management-step-therapy-graph-model/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/formulary-management-step-therapy-graph-model

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, distinguish<br/>
Learning objective: Given a formulary graph, the learner can distinguish a plan's formulary tier assignment from its step-therapy requirement and trace why a generic drug must be tried before an associated brand drug is covered.

Reused from this book's MicroSim library. A benefit plan USES_FORMULARY, the formulary INCLUDES drugs at various tiers, and every drug is a MEMBER_OF a therapeutic class; a red STEP_THERAPY_BEFORE edge requires the Tier 1 generic (atorvastatin) be tried before the Tier 3 brand (Lipitor) is covered. Dragging nodes to trace this exact path reinforces the worked Maria Chen example above.
</details>

!!! mascot-warning "Don't Confuse the Formulary With the Rule"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mix-up: the formulary is just the *list* of covered drugs and their tiers. A formulary rule (like step therapy or prior authorization) is a *condition* layered on top of that list. Two plans can share the exact same formulary and still behave completely differently if one attaches step-therapy rules and the other doesn't.

## Gatekeeping Care: Prior Authorization, Utilization Review, and Medical Necessity

Some services and drugs require the payer's approval *before* they are delivered, not just adjudication after the fact. **Prior authorization** is the requirement that a provider obtain payer approval before performing a specific procedure or filling a specific prescription, used for costly or high-risk services where the payer wants to confirm appropriateness in advance rather than deny payment afterward. The broader administrative process this belongs to is **utilization review**, which comes in three flavors depending on timing: prospective review evaluates a request before care is delivered (prior authorization is simply prospective review applied to a single service); concurrent review re-evaluates an ongoing treatment course while it is still happening, such as a case manager checking daily whether a hospital inpatient stay is still medically necessary; and retrospective review audits care after the fact, once claims have already been paid — the same retrospective lens that Chapters 18 and 19 apply at much larger scale to detect fraud and billing abuse.

Both prior authorization and utilization review are decided against a single governing standard: **medical necessity**, the clinical judgment that a requested service is appropriate, evidence-based, and required to diagnose or treat a member's condition, as opposed to being convenient, experimental, or elective. Payers typically license a standardized, evidence-based criteria set — such as InterQual or MCG — rather than leaving medical-necessity decisions purely to individual reviewer judgment, which keeps the standard consistent across thousands of daily requests and, not incidentally, makes it possible to encode as machine-checkable rules in a graph-based rules engine. A prior authorization request for an MRI is not approved or denied on cost grounds alone — it is checked against documented medical-necessity criteria, such as red-flag symptoms, whether conservative treatment was tried first, and whether the request aligns with published clinical guidelines. If an initial request is denied, the ordering physician can often request a peer-to-peer review — a direct phone conversation with the payer's own medical director to present additional clinical context before the decision is finalized, exactly the "peer-review" outcome branch shown in the decision tree below. This is the same medical-necessity standard that later determines whether a claim denial for lack of prior authorization can succeed on dispute.

#### Diagram: Prior Authorization Decision Tree MicroSim

<iframe src="../../sims/prior-authorization-decision-tree-microsim/main.html" width="100%" height="618px" scrolling="no"></iframe>

[Run the Prior Authorization Decision Tree MicroSim Fullscreen](../../sims/prior-authorization-decision-tree-microsim/main.html){ .md-button }

<details markdown="1">
<summary>Prior Authorization Decision Tree MicroSim (reused)</summary>
Type: microsim
**sim-id:** prior-authorization-decision-tree-microsim<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/prior-authorization-decision-tree-microsim/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/prior-authorization-decision-tree-microsim

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: apply, practice<br/>
Learning objective: Given a clinical case and a set of medical-necessity checkpoints, the learner can apply a prior-authorization decision tree to reach and justify an approve, deny, pend, or peer-review outcome.

Reused from this book's MicroSim library. This MicroSim turns an MRI-brain-for-headache prior-authorization policy into an interactive decision tree, with checkpoints for red-flag symptoms, conservative treatment, symptom persistence, documentation adequacy, and guideline alignment. Working through the five pre-loaded cases gives the learner hands-on practice applying the medical-necessity standard defined above, with immediate feedback on whether their reasoning reached the clinically correct outcome.
</details>

!!! mascot-encourage "If This Section Feels Like a Lot, That's Normal"
    ![Sage giving encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Prior authorization, utilization review, and medical necessity can feel like three names for the same fuzzy idea at first. That's a completely normal reaction — most people need to see a couple of real cases (like the ones in the MicroSim above) before the distinctions click into place. Give it a second pass if you need one.

Together, these gatekeeping mechanisms close the loop on the claims-and-coverage vocabulary this chapter set out to build: every service a member receives now has a defined coverage status, a cost-sharing calculation, a place in the claims lifecycle, and, where applicable, an approval requirement checked against medical necessity before care is even delivered.

## Chapter Summary

!!! mascot-celebration "You Can Now Model the Payer's Side of a Claim"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Look at everything you just connected: benefit plans and coverage, deductibles and out-of-pocket maximums, the full claims lifecycle from submission to denial, and formularies with step therapy. That's the entire skeleton of payer-side data modeling — and you built it as a graph, not a stack of tables. Nicely done!

This chapter modeled the payer's core vocabulary as a graph: policies built on benefit plans, benefit plans defining coverage, cost-sharing terms all bounded by the out-of-pocket maximum, claims moving through processing and adjudication toward payment or denial, and pharmacy benefits governed by formularies, tiers, and step therapy. Every one of these concepts becomes a node type or an edge type — which is exactly the modeling habit this book has been building since Chapter 1. In [Chapter 15](../15-reimbursement-health-plans-payer-contracts/index.md), we follow a paid claim the rest of the way: how the payer calculates the allowed amount, reimburses the provider, and connects to the broader ecosystem of health plan types and payer contracts.
