---
title: CDS Hooks, Care Alerts, and CMS CQL Tooling
description: How compiled CQL logic reaches clinicians in real time through CDS Hooks, and how the CMS-sponsored tooling ecosystem authors, tests, and certifies clinical quality measures.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:10:36
version: 1.10
---

# CDS Hooks, Care Alerts, and CMS CQL Tooling

## Summary

This chapter closes the clinical decision support unit with the runtime and tooling side of CQL: CDS Hooks, rule engines, alerts, order sets, and drug-drug interaction checks. It surveys the CMS-sponsored tools used to author, test, and certify CQL-based measures -- MADiE, CQL Runner, Bonnie, and Cypress -- along with FHIR implementation guides and electronic Clinical Quality Measures (eCQMs). Students finish able to trace a clinical guideline from narrative text through CQL/ELM to a certified, executable measure.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| CDS Hooks | 19 |
| CDS Rule Engine | 2 |
| CDS Alert | 1 |
| Order Set | 2 |
| Drug-Drug Interaction Check | 1 |
| Care Gap Alert | 14 |
| Clinical Reminder | 2 |
| Guideline-Based Care Pathway | 1 |
| CQL-to-ELM Compilation | 2 |
| MADiE Authoring Tool | 1 |
| CQL Runner Tool | 9 |
| Bonnie Testing Tool | 2 |
| Cypress Certification Tool | 1 |
| FHIR Implementation Guide | 2 |
| CQF Recommendations | 1 |
| Quality Reporting Architecture | 4 |
| Electronic CQM | 2 |
| Measure Authoring Tool | 1 |
| FHIR Questionnaire Resource | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 23: Clinical Guideline Authoring and Clinical Quality Language](../23-clinical-guideline-authoring-and-cql/index.md)

---

Chapter 23 ended with a compiled Clinical Quality Measure sitting inside a Clinical Reasoning Module, ready to run. This chapter answers the two questions that remain: how does that compiled logic actually reach a clinician at the exact moment a decision is being made, and how does the healthcare industry verify that the logic was authored, tested, and implemented correctly before it ever touches a real patient? Both questions have concrete, standardized answers, and both close out the book's clinical decision support unit.

!!! mascot-welcome "The Moment Everything We Built Finally Fires"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Welcome to the last stop in our CDS journey! We've authored guidelines, bound terminology, and compiled CQL — now let's watch that logic actually reach a clinician's screen, and meet the toolchain that makes sure it's trustworthy before it gets there. Let's connect the dots!

## CDS Hooks: Delivering Logic at the Point of Care

A compiled Clinical Reasoning Module has nowhere to run unless something tells it exactly when, during a clinician's workflow, to fire. **CDS Hooks** is the HL7 specification that defines standardized trigger points — "hooks" — in a clinical workflow where an EHR calls out to an external CDS service, sends it relevant context, and displays whatever response comes back, all without the EHR vendor needing to build any clinical logic itself. Three hook types cover the large majority of real deployments: `patient-view` fires the moment a clinician opens a patient's chart, before any specific order or action is underway; `order-select` fires the instant a clinician begins selecting a new order, while there is still time to suggest an alternative; and `order-sign` fires at the final moment before an order is signed and becomes official, the last possible checkpoint to catch a problem.

Each hook call carries two kinds of information the CDS service needs to reason correctly. The `context` describes what is currently happening — which patient, which hook fired, and, for `order-select` or `order-sign`, the specific draft order under consideration. The `prefetch` is a bundle of relevant FHIR resources the EHR gathers in advance and sends along with the hook call, so the CDS service does not need to make its own slow, separate FHIR queries back to the EHR before it can respond — exactly the token-efficiency principle from Chapter 20 applied to a different bottleneck, network round-trips instead of LLM tokens. The CDS service's response takes the form of one or more **CDS Alerts**: a standardized "card" containing a short summary, an optional longer detail section, and optional suggested actions the clinician can accept with a single click.

A worked example threads a full CDS Hooks cycle together, continuing the Maria Chen scenario from earlier chapters. Dr. Patel begins signing a new warfarin prescription for Maria Chen, who is already taking aspirin — triggering the `order-sign` hook. The EHR prefetches Maria Chen's active MedicationRequest resources (including the existing aspirin order) and sends both the prefetch bundle and the draft warfarin order as context to the CDS service. A **CDS rule engine** — the component that evaluates compiled CQL/ELM logic (via a Clinical Reasoning Module) against exactly this kind of incoming hook context — runs a **drug-drug interaction check**: comparing the draft order's medication against every active medication in the prefetch bundle for known dangerous combinations. Warfarin and aspirin together carry an elevated bleeding risk, a known interaction, so the CDS service returns a CDS Alert card warning of that risk, along with a suggested alternative from a predefined **order set** — a curated bundle of related orders a clinician can select together, such as "Anticoagulation Monitoring Order Set," which might bundle a reduced warfarin dose with an added INR (blood-clotting) lab test order in a single click.

Not every CDS Hooks response needs to interrupt the clinician this dramatically. A **clinical reminder** is a lower-urgency, non-interruptive card — "this patient's flu vaccine is due" — that surfaces alongside the chart rather than blocking a workflow step, precisely because relentlessly firing full interruptive alerts for low-stakes reminders is exactly the alert-fatigue trap Chapter 20 warned about. Chaining several CDS Hooks-driven checks together across an entire course of treatment — an admission alert, a mid-stay monitoring reminder, a discharge medication-reconciliation check — produces a **guideline-based care pathway**: a full, multi-step clinical workflow whose individual steps are each driven by the same compiled guideline logic this book's CDS unit has built up, now expressed as a connected sequence rather than isolated, one-off alerts.

#### Diagram: Clinical Decision Support Workflow

<iframe src="../../sims/clinical-decision-support-workflow/main.html" height="1262" width="100%" scrolling="no"></iframe>

[Run the Clinical Decision Support Workflow MicroSim Fullscreen](../../sims/clinical-decision-support-workflow/main.html){ .md-button }

<details markdown="1">
<summary>Clinical Decision Support Workflow (reused)</summary>
Type: workflow
**sim-id:** clinical-decision-support-workflow<br/>
**Library:** Mermaid<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/clinical-decision-support-workflow/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/clinical-decision-support-workflow

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: demonstrate, apply<br/>
Learning objective: Given a new medication order and a patient's existing medication list, the learner can apply the CDS workflow's context-aware filtering logic to determine whether an alert should interrupt the clinician, be logged silently, or be auto-approved.

Reused from the MicroSim catalog. This flowchart traces exactly the warfarin/aspirin worked example above: a new medication order is checked against the patient's full graph context and a clinical knowledge graph, scored for clinical significance, and only high-severity, novel problems interrupt the clinician (an estimated 60-80% reduction in alert fatigue from this context-aware filtering). Hovering any step explains its function; the "No" branches show silent approval or logging, and the "Yes" path shows the alert, clinician review, and feedback loop.
</details>

Continuing the same worked example one step further shows how CDS Hooks connects directly back to Chapter 23's Clinical Quality Measure. Recall the diabetes-control measure's population funnel: 39,500 patients in the denominator, 25,500 in the numerator, leaving 14,000 patients in a care gap — diabetic, but not meeting the HbA1c control target. A **care gap alert** is a CDS Alert specifically driven by exactly this kind of measure logic: the instant any of those 14,000 patients' charts is opened (firing the `patient-view` hook), the CDS service evaluates that same compiled `"In Denominator" AND NOT "In Numerator"` logic from Chapter 23 against the current patient in real time, and if it evaluates true, returns a card reminding the clinician that this specific patient is overdue for HbA1c control — turning a population-level quality measure into a point-of-care, patient-specific nudge without any additional guideline authoring work, because the underlying CQL logic is identical in both places.

#### Diagram: CDS Hooks Request-Response Cycle

<iframe src="../../sims/cds-hooks-request-response-cycle/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>CDS Hooks Request-Response Cycle</summary>
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
</details>

!!! mascot-thinking "This Is the Whole Pipeline, Firing in Real Time"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Stop and notice what just happened: the same CQL define statements from Chapter 23 that computed a population-wide measure rate just fired, unmodified, against one specific patient's chart to produce a point-of-care alert. That reuse — write the logic once, run it at both the population scale and the bedside scale — is the entire payoff of everything this book's CDS unit has built.

## From CQL to Certified Measures: The CMS Tooling Ecosystem

Writing correct CQL by hand and trusting it to work is not how real quality measures reach production — the financial and clinical stakes of a wrong measure (a hospital's value-based payment, or a missed safety alert) are too high to skip independent authoring, testing, and certification tools. The Centers for Medicare & Medicaid Services (CMS) sponsors a specific ecosystem of tools covering every stage from initial authoring to final EHR certification, and understanding this ecosystem is essential for anyone who will actually ship a Clinical Quality Measure rather than merely write one for a homework exercise.

The **MADiE authoring tool** (Measure Authoring Development Integrated Environment, MADiE for short) is the modern, web-based CMS tool that consolidates measure authoring and dynamic testing into a single environment — a knowledge engineer can write a CQL library, define its population criteria, and immediately test it against synthetic patient bundles without leaving the tool. MADiE is the direct successor to two older, separate tools this ecosystem still references by name because their functions live on inside MADiE's unified workflow: the **Measure Authoring Tool** (MAT), the original CMS tool purely for authoring measure logic with no integrated testing, and the **Bonnie testing tool**, a legacy synthetic-patient testing tool historically paired with MAT that runs a library of synthetic patient test cases against a measure's CQL logic to verify it correctly includes and excludes exactly the patients it should. Where MAT and Bonnie required a knowledge engineer to switch between two separate applications for authoring and testing, MADiE's consolidation reflects a broader industry lesson: separating authoring from testing made it too easy to ship logic that "looked right" but had never actually been run against a single test patient.

Sometimes a knowledge engineer needs to test a small fragment of CQL — one define statement, one expression — without the overhead of a full measure bundle at all. The **CQL Runner tool** exists for exactly this: an interactive, web-based tool for quick, ad hoc CQL testing, letting a knowledge engineer paste in a snippet like Chapter 23's `"Has Diabetes"` define statement, point it at a single test FHIR patient bundle, and immediately see the evaluated result — true, false, or a specific value — with no measure metadata, population criteria, or reporting configuration required. This tight, fast iteration loop makes CQL Runner the tool most knowledge engineers reach for first, well before a piece of logic is mature enough to warrant a full MADiE measure bundle; only once a fragment behaves correctly in isolation does it typically get assembled into the larger measure structure MADiE manages.

Testing a measure's logic in isolation is necessary but not sufficient — an EHR vendor's actual software must also be verified to execute that compiled logic correctly once deployed, since a perfectly correct measure can still produce wrong results if the EHR's own CQL engine has a bug. The **Cypress certification tool** is the official, open-source certification tool CMS uses for exactly this purpose: it runs a battery of standardized test cases against an EHR vendor's CQL/eCQM execution engine and certifies whether the vendor's software produces the expected results, a required step in ONC health IT certification for any EHR that claims to support electronic quality reporting.

!!! mascot-tip "Reach for CQL Runner Before You Reach for a Full Measure Bundle"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a workflow shortcut worth adopting: test any new CQL define statement in CQL Runner against one or two sample patients first. It's much faster to catch a logic mistake on a single pasted snippet than to debug it after it's buried inside a full MADiE measure bundle with a dozen other define statements around it.

Beyond authoring and testing individual measures, the broader interoperability context those measures run inside is itself standardized. A **FHIR Implementation Guide** (IG) is a formally published, versioned set of profiles, extensions, and ValueSet bindings that constrain and extend the base FHIR specification for a specific use case, ensuring every system implementing that use case shapes its resources identically. **CQF Recommendations** is the specific FHIR Implementation Guide governing clinical reasoning artifacts — PlanDefinition, Library, and the CQL/ELM patterns this book's CDS unit has built up — providing the detailed, agreed-upon rules for exactly how those resources must be structured so that a measure authored against one vendor's FHIR server behaves identically against another's.

A **Clinical Quality Measure** that has been fully implemented for automatic, electronic calculation directly from EHR data — rather than calculated manually by a human abstracting information from paper charts — is formally called an **electronic CQM** (eCQM). The **quality reporting architecture** is the complete end-to-end technical pipeline that carries an eCQM's computed result from a single health system's Clinical Reasoning Module all the way to a federal quality reporting program: local CQL evaluation against live patient data, aggregation of results across a health system's full patient population, formatting into a standardized submission document, and transmission to CMS for programs such as the Merit-based Incentive Payment System (MIPS), which directly ties a health system's calculated eCQM performance to its Medicare reimbursement rate — the most concrete, dollars-and-cents link in this entire book between a graph traversal query, a compiled CQL define statement, and an actual payment a hospital receives.

Not every data element a measure needs already exists as structured data inside a typical EHR — some quality measures depend on patient-reported information that must be actively collected through a form. A **FHIR Questionnaire resource** represents exactly this kind of structured data-collection form — a depression screening survey, a patient-reported pain scale — defining each question, its expected answer type, and (via terminology binding, from Chapter 23) the ValueSet each answer should be coded against, so that a patient's or clinician's questionnaire responses become structured, measure-ready FHIR data (typically captured as `QuestionnaireResponse` resources) the moment the form is submitted, rather than free text buried in a note.

#### Diagram: CMS CQL Measure Development and Certification Pipeline

<iframe src="../../sims/cms-cql-measure-certification-pipeline/main.html" width="100%" height="560px" scrolling="no"></iframe>

<details markdown="1">
<summary>CMS CQL Measure Development and Certification Pipeline</summary>
Type: timeline
**sim-id:** cms-cql-measure-certification-pipeline<br/>
**Library:** vis-timeline<br/>
**Status:** Specified

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: summarize, sequence<br/>
Learning objective: Given the names of the CMS-sponsored authoring, testing, and certification tools, the learner can sequence them correctly along the measure development pipeline and summarize what role each plays.

Purpose: Lay out the full journey of a measure from initial authoring through EHR certification and live quality reporting, naming every CMS tool and standard this section introduced in the order a real measure would pass through them.

Phases (left to right):
1. "Author in MADiE" — knowledge engineer writes CQL library and population criteria (references CQF Recommendations IG for correct resource shaping)
2. "Quick-Test Fragments in CQL Runner" — ad hoc testing of individual define statements
3. "Full Measure Testing" — synthetic patient test cases run against the complete measure bundle (the role Bonnie historically played, now integrated into MADiE)
4. "CQL-to-ELM Compilation" — the measure's CQL library compiles to ELM for execution
5. "EHR Vendor Certification via Cypress" — the vendor's CQL execution engine is certified against standardized test cases
6. "Live eCQM Evaluation" — the compiled measure runs automatically against real patient data inside the certified EHR's Clinical Reasoning Module
7. "Quality Reporting Architecture Submission" — aggregated results submitted to CMS (e.g., MIPS), tying measure performance to reimbursement

Interactive features:
- Hover any phase for a one-sentence description of the tool or standard involved
- Click a phase to open a fuller explanation, including which chapter concept it corresponds to (e.g., clicking phase 4 recalls the CQL Compiler and Expression Logical Model from Chapter 23)
- A "Legacy Path" toggle that overlays the older MAT-and-Bonnie route (before MADiE's 2022+ consolidation) alongside the modern MADiE-centered route, so the learner can see what changed

Instructional Rationale: A sequenced timeline with a legacy-vs-modern toggle matches the Understand-level objective of correctly ordering and summarizing each tool's role, while also making visible how the tooling ecosystem itself evolved — a detail that helps the learner recognize older tool names (MAT, Bonnie) they may still encounter in existing documentation.

Implementation: vis-timeline JavaScript library with click-to-expand detail panels; responsive width.
</details>

!!! mascot-encourage "The Acronyms Will Stick — Give It a Second Pass"
    ![Sage giving encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    MADiE, MAT, Bonnie, Cypress, CQF Recommendations, eCQM — that's a genuine alphabet soup on a first read, and feeling a little lost here is completely normal. The trick is to anchor each name to its *job* in the pipeline (author, quick-test, full-test, certify) rather than memorizing the names in isolation; the timeline diagram above is built exactly for that kind of anchoring.

Passing through certification is not the end of the story, however, and it is worth being precise about exactly what a Cypress certification does and does not guarantee before moving on.

!!! mascot-warning "A Certified EHR Does Not Guarantee a Correct Measure"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Common misconception: Cypress certification proves an EHR's CQL *engine* executes logic correctly, not that any particular measure's *logic* is clinically correct. A knowledge engineer can still author a flawed denominator or numerator definition that a perfectly certified engine will faithfully, and incorrectly, execute — which is exactly why MADiE's dynamic testing and CQL Runner's fragment testing remain essential even after an EHR is certified.

## Chapter Summary

!!! mascot-celebration "You Just Traced a Guideline All the Way to a Payment"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Look at the full distance you've covered across these five chapters: from AI and knowledge graphs, through responsible evaluation, into FHIR resources and knowledge representation levels, through CQL and the Expression Logical Model, and now all the way to a CDS Hooks alert firing at the bedside and a certified eCQM tied to real reimbursement. That's the complete clinical decision support pipeline, start to finish — genuinely one of the most technically complete journeys in this entire book.

This chapter closed the clinical decision support unit by connecting compiled CQL logic to the moment of clinical care through CDS Hooks — hook types, context, prefetch, CDS Alerts, order sets, drug-drug interaction checks, clinical reminders, and care gap alerts driven directly by the population logic from Chapter 23 — and by surveying the CMS-sponsored tooling ecosystem that authors, tests, and certifies that logic before it ever reaches a patient: MADiE, CQL Runner, the legacy Measure Authoring Tool and Bonnie, Cypress certification, FHIR Implementation Guides and CQF Recommendations, and the quality reporting architecture that ties an electronic CQM's performance to real reimbursement. Together, Chapters 22 through 24 traced one continuous thread — a narrative guideline becoming a FHIR resource, becoming CQL, becoming ELM, becoming a live alert and a certified measure — that is as complete a picture of modern clinical decision support as this book can offer. The book now turns to a different kind of responsibility: securing the healthcare graphs this entire book has been built around. Continue to [Chapter 25: Healthcare Data Security Fundamentals](../25-healthcare-data-security-fundamentals/index.md).
