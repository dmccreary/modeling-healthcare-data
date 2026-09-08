---
title: Healthcare Interoperability and Care Coordination
description: Models a single patient encounter as a graph and explains the HL7/CCD/RxNorm standards, health information exchange, and ACO/PCMH care-coordination structures that connect it to the rest of the system.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:10:10
version: 1.10
---

# Healthcare Interoperability and Care Coordination

## Summary

This chapter covers how healthcare systems exchange data with one another: health information exchange, continuity of care documents, and the HL7 family of interoperability standards. It also introduces population health and care coordination concepts such as accountable care organizations and patient-centered medical homes. This interoperability foundation is a direct prerequisite for the FHIR-based clinical decision support chapters later in the book.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| RxNorm | 2 |
| Medical Terminology | 1 |
| Clinical Workflow | 338 |
| Patient Demographics | 158 |
| Medical Encounter | 157 |
| Healthcare Interoperability | 169 |
| Healthcare Data Exchange | 1 |
| Health Information Exchange | 10 |
| Continuity Of Care Document | 2 |
| Interoperability Standard | 1 |
| HL7 Standard | 2 |
| HL7 V2 Message | 1 |
| Accountable Care Organization | 5 |
| Patient-Centered Medical Home | 2 |
| Social Determinants Of Health | 1 |
| Population Health | 2 |
| Care Coordination | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 7: Healthcare Economics and Medical Coding Systems](../07-healthcare-economics-medical-coding/index.md)

---

!!! mascot-welcome "Where One Visit Becomes Many Records"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A single doctor's visit quietly touches half a dozen separate computer systems before the day is done — the front desk, the exam room, the lab, the pharmacy, and the billing office all keep their own version of what happened. In this chapter we trace one visit through all of them and learn the standards that let those systems compare notes without losing a single detail. Let's connect the dots!

## One Visit, Many Systems: Clinical Workflow and the Medical Encounter

Every time a patient walks through a clinic door, two related but distinct things happen at once. A **medical encounter** is the bounded clinical interaction itself: a single office visit, emergency department (ED) visit, hospitalization, or telehealth session, with a defined start time, a defined end time, and its own documentation trail. A **clinical workflow** is the broader sequence of steps, roles, and systems that carries that encounter from the moment it begins to the moment it is billed and closed: check-in, triage, clinical assessment, orders, documentation, and administrative wrap-up. Recall Maria Chen from Chapter 1 — every time she returns to Riverside Clinic, she generates one medical encounter, and Riverside Clinic's clinical workflow determines exactly how that encounter moves through the building before it becomes a closed, billable record.

Modeling a clinical workflow as a graph means treating each step as a node connected by an `OCCURRED_IN` or `PERFORMED_BY` relationship to the role or system responsible for it, with the handoff between steps captured as an edge. Hospitals typically organize this workflow into lanes by responsibility: a patient lane (arrival, symptoms reported), a clinical staff lane (triage, physician assessment, treatment decisions), a clinical systems lane (the electronic health record, or EHR, capturing vitals and orders through computerized physician order entry, or CPOE), and an administrative systems lane (coding the visit, generating charges, submitting the claim). A single medical encounter can also take several forms depending on where and how care is delivered:

- **Office visit** — a scheduled, typically brief encounter at an outpatient clinic
- **Emergency department (ED) visit** — an unscheduled, often higher-acuity encounter
- **Hospitalization** — a multi-day inpatient encounter with its own internal workflow of admission, rounding, and discharge
- **Telehealth encounter** — a remote visit conducted over video or phone, generating the same documentation obligations as an in-person visit

As Maria's encounter moves through these lanes, it leaves behind data encoded in specific formats at specific capture points: her demographics and vitals enter the EHR, her orders route through CPOE, her insurance eligibility is checked using an electronic data interchange (EDI) transaction standard called X12, and her clinical summary can increasingly be exported using FHIR — a standard this book returns to in depth once the patient-record concepts in later chapters are in place. None of these formats matter to Maria; she experiences one continuous visit. But each one matters enormously to the systems on the other end of that data, which is exactly why the next section of this chapter is devoted to the standards that keep those formats mutually intelligible.

Tracing a concrete timeline makes the workflow's lane structure tangible. At 9:02 a.m. Maria checks in at the front desk (patient lane); at 9:10 a triage nurse records her vitals directly into the EHR (clinical systems lane); at 9:25 Dr. Patel completes his assessment and enters a lab order through CPOE (clinical staff and clinical systems lanes together); at 10:15 the lab posts a result back into the same EHR record; at 10:45 a medical coder assigns billing codes to the closed encounter; and by 11:00 a claim built from those codes is queued for submission as an X12 transaction (administrative systems lane). Every one of those six steps is a node in Diagram 1 below, and every arrow between them is a handoff a graph model must represent explicitly if it wants to answer "who touched this encounter, and when?"

!!! mascot-thinking "A Workflow Is Already a Graph"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that nothing about Maria's timeline required a spreadsheet row per step — it's already nodes and directed edges, exactly like the Maria Chen example from Chapter 1. Modeling a clinical workflow as a graph isn't a stylistic choice; it's just naming the structure that was already there.

A **medical encounter**, modeled as a graph node, typically carries properties like `encounter_id`, `start_time`, `end_time`, `encounter_type`, and `status`, and connects outward to the patient it belongs to, the provider who performed it, the facility where it occurred, and — eventually — the claim it generates. That `status` property usually moves through a small, well-defined lifecycle as the clinical workflow advances: `planned` before Maria arrives, `in-progress` while she is being seen, and `finished` once Dr. Patel signs off on the note — a graph query that counts encounters stuck in `in-progress` for unusually long is, in effect, monitoring the workflow itself for bottlenecks. The clinical workflow diagram below makes both concepts visible at once: the swimlane placement of each step teaches Clinical Workflow, while the sequence of steps within a single lane teaches Medical Encounter as a bounded, ordered set of events.

#### Diagram: Clinical Encounter Workflow

<iframe src="../../sims/clinical-encounter-workflow-diagram/main.html" width="100%" height="1412px" scrolling="no"></iframe>

<details markdown="1">
<summary>Clinical Encounter Workflow (reused)</summary>
Type: workflow
**sim-id:** clinical-encounter-workflow-diagram<br/>
**Library:** Mermaid<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/clinical-encounter-workflow-diagram/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/clinical-encounter-workflow-diagram

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: interpret, classify<br/>
Learning objective: Given the swimlane workflow of a single patient encounter, the learner can classify each step by which lane (patient, clinical staff, clinical systems, administrative systems) owns it and interpret which interoperability standard applies at each data-capture point.

Reused from the MicroSim catalog. This swimlane workflow traces a full Medical Encounter from patient arrival through claims submission across four lanes: patient, clinical staff, clinical systems, and administrative systems. Every step includes hover text identifying the responsible role or system and, where relevant, the standard involved (HL7 messaging, CPOE order entry, X12 claims transactions, and FHIR-based data capture). Clicking or hovering any step reveals its description; the swimlane placement itself teaches the Clinical Workflow concept, while the individual steps teach the Medical Encounter concept as a bounded sequence of clinical events.
</details>

## Speaking a Common Language: Interoperability Standards and Health Information Exchange

Maria's single encounter just crossed an EHR, a lab system, and a claims pipeline without her noticing. **Healthcare interoperability** is the general capacity of different health information systems, devices, and applications to exchange data, interpret it consistently, and use it cooperatively — without a person manually re-typing information from one screen into another. Interoperability is often described in three increasingly demanding layers:

- **Foundational interoperability** — the two systems can successfully send and receive the bytes at all, regardless of whether either side understands them
- **Structural interoperability** — the receiving system can correctly parse the message into its component fields, because both sides agree on format (segments, delimiters, field order)
- **Semantic interoperability** — both systems agree on what each field actually *means* (is `MI` a middle initial or myocardial infarction?), so the data can be acted on automatically instead of merely displayed

Everything else in this section is really just a description of how the healthcare industry solved that last, hardest layer.

The mechanism for solving it is the **interoperability standard**: a published technical specification that defines message structure, field meaning, and expected behavior in advance, so that two independently built systems can exchange data predictably without ever having spoken to each other's engineering teams. Interoperability standards are typically maintained by accredited standards development organizations — Health Level Seven International for clinical data, the Accredited Standards Committee for X12 transactions (the claims standard from the previous section), and NCPDP for pharmacy — each governing a different slice of the data a single encounter produces. Accreditation matters because it forces the standard through a consensus process among competing vendors, which is what lets a hospital buy a lab interface engine from one company and an EHR from another and still expect them to exchange messages correctly on day one.

Health Level Seven International is the source of the **HL7 standard** family, the most influential group of interoperability standards in clinical healthcare. Its name refers to the seventh, or "application," layer of the OSI networking model — HL7 standards define what the data *means* at the application level, leaving lower-level plumbing (like TCP/IP) to other specifications entirely. The HL7 standard family spans several distinct generations built for different purposes, and the oldest of them is still, by transaction volume, the most heavily used interoperability standard in American healthcare today.

That oldest generation is the **HL7 V2 message**: a pipe-and-hat delimited text format used for real-time, transactional messaging between systems — announcing an admission, transmitting an order, or delivering a lab result the instant it becomes available. Unlike a document meant to be read by a person, an HL7 v2 message is meant to be parsed instantly by a receiving system and acted on. A simplified message announcing Maria's registration might look like this:

```
MSH|^~\&|EPIC|RIVERSIDE|LIS|LABCORP|202603171340||ADT^A01|00001|P|2.3
PID|1||MRN-48213^^^RIVERSIDE^MR||CHEN^MARIA||19850312|F
OBX|1|NM|4548-4^Hemoglobin A1c^LN||6.9|%|<5.7|H
```

The `MSH` (message header) segment identifies the sending and receiving systems and the message type — `ADT^A01` means "admit/discharge/transfer, admission event." The `PID` (patient identification) segment carries Maria's medical record number and demographics. The `OBX` (observation result) segment carries a single lab result, here tagged with a LOINC code (`4548-4`) identifying exactly which test was performed. Every field is separated by a pipe character, which is where the format gets its informal "pipe and hat" nickname.

!!! mascot-tip "Real-Time Message vs. Document Snapshot"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a shortcut for keeping HL7 v2 messages straight from what comes next: a message is a single event fired the moment something happens, like a text alert. A document, coming up next, is a snapshot summarizing everything relevant as of one point in time, like a printed report. Same underlying data, very different delivery style.

Where an HL7 v2 message reports one event, a **continuity of care document (CCD)** captures a whole snapshot. A CCD is a standardized XML document, built on HL7's Clinical Document Architecture, that summarizes a patient's relevant clinical history — problems, medications, allergies, recent results — at a transition of care, such as a hospital discharge or a referral. If Maria is hospitalized and later returns to Riverside Clinic, the hospital does not send Dr. Patel a stream of HL7 v2 messages; it sends one CCD summarizing the admission, so he can read it the way he would read a discharge letter.

Two more standards keep the *content* of these messages and documents consistent, not just their structure. **RxNorm**, maintained by the National Library of Medicine, is a normalized naming system for clinical drugs that assigns a single code to a medication concept regardless of which brand name, generic name, or manufacturer's own internal code a given system happens to use — "Lipitor," "atorvastatin 20 mg," and a pharmacy's proprietary NDC code for the same tablet all resolve to one shared RxNorm concept. More broadly, **medical terminology** refers to the standardized clinical vocabularies — RxNorm for medications, SNOMED CT for clinical findings and procedures, LOINC for lab tests and observations (the code seen in the OBX segment above), and ICD-10-CM for diagnoses, already introduced in Chapter 7 — that let a clinical concept mean the same thing no matter which system recorded it. Standards like HL7 v2 and the CCD define the *envelope*; medical terminology defines what's legible once you open it.

None of these standards deliver value on their own — they need an operating network to move data through. A **health information exchange (HIE)** is the electronic sharing of health-related information across organizations according to these standards, and the term also refers to the organized network — often regional or statewide — that provides the technical and governance infrastructure to make that sharing routine. If Maria is later referred to Dr. Osei at Downtown Specialty Center, a functioning regional HIE lets Dr. Osei query Maria's CCD from Riverside Clinic directly, instead of waiting on a phone call or a faxed chart.

!!! mascot-warning "HIE Is One Way to Exchange Data, Not the Only Way"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Don't assume every transfer of health data flows through a formal HIE network — that's a real tentacle-y mix-up to untangle. A single hospital moving lab results from its lab system into its own EHR is also exchanging healthcare data; it just isn't using an organized, multi-organization exchange network to do it.

That broader idea has its own name: **healthcare data exchange** is the general technical act of transferring health data between any two systems, whether or not an organized network like an HIE is involved. It covers point-to-point interfaces between two departments in a single hospital, scheduled batch file transfers between a clinic and a lab vendor, and modern application programming interfaces (APIs) alike — Riverside Clinic's nightly file transfer of the day's completed encounters to its billing vendor is healthcare data exchange even though no HIE is anywhere in the picture. An HIE, in other words, is one standards-governed, multi-organization way of accomplishing healthcare data exchange — but exchange itself happens constantly at a much smaller scale too, every time one system inside Riverside Clinic hands data to another.

The table below collects the standards just introduced, since a diagram is about to show all of them converging on a single patient record.

| Standard / Concept | What It Standardizes | Example in Maria's Record |
|---|---|---|
| HL7 V2 Message | Real-time transactional messages between systems | An `ADT^A01` message announcing Maria's registration |
| Continuity of Care Document (CCD) | A structured document summarizing care at a transition | A discharge summary sent from a hospital to Riverside Clinic |
| RxNorm | Normalized medication names and codes | The same RxNorm code for "Lipitor" and "atorvastatin 20 mg" |
| Medical Terminology (LOINC, SNOMED CT, ICD-10-CM) | Standardized clinical findings, labs, and diagnoses | The LOINC code `4548-4` for Maria's A1c lab result |

Every one of those rows is, in practice, a different pipe feeding the same patient. Diagram 2 shows what that convergence looks like once it reaches a graph database: one master patient record, several encounters, and several source systems, each contributing data encoded in one of the standards above.

#### Diagram: Healthcare Data Integration Graph Model

<iframe src="../../sims/healthcare-data-integration-graph-model/main.html" width="100%" height="488px" scrolling="no"></iframe>

<details markdown="1">
<summary>Healthcare Data Integration Graph Model (reused)</summary>
Type: graph-model
**sim-id:** healthcare-data-integration-graph-model<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-data-integration-graph-model/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/healthcare-data-integration-graph-model

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: differentiate, examine<br/>
Learning objective: Given a master patient record linked to encounters sourced from different systems, the learner can differentiate which interoperability standard (HL7 V2 Message, Continuity of Care Document, RxNorm) governs each data source and examine how Healthcare Interoperability lets fragmented records converge into one queryable view.

Reused from the MicroSim catalog. A central master patient record connects through HAS_ENCOUNTER edges to office-visit, ED-visit, and hospitalization encounters, and each encounter connects through a SOURCED_FROM edge to the system that supplied it: Epic EHR, a claims database, a lab interface, and a pharmacy system. Hovering a node reveals its properties; clicking highlights its connections. This is the single-patient-view payoff of Health Information Exchange and Healthcare Data Exchange: an HL7 V2 Message from the lab interface, an RxNorm-coded medication list from the pharmacy, and a Continuity Of Care Document received from a hospital discharge all attach to the same patient node instead of living in four disconnected silos.
</details>

## Who Is the Patient? Demographics and the Social Context of Care

Every standard in the previous section exists to move clinical facts around reliably, but a patient record needs more than clinical facts to be useful. **Patient demographics** are the identifying and descriptive attributes captured about a patient — age or date of birth, sex, race and ethnicity, preferred language, and address — typically recorded at registration and used for identification, communication, regulatory reporting, and population-level analysis. In a labeled property graph, demographics live as properties directly on the `Patient` node, the same way Chapter 1's Maria Chen node carried `patient_id`, `date_of_birth`, and `gender`, rather than as separate connected nodes, because they describe attributes intrinsic to the patient rather than relationships to some other entity.

Demographics matter well beyond the registration desk. They drive matching a patient's record across the very systems discussed in the previous section, support health-equity and quality reporting required by payers and regulators, and inform clinical decision support — a pediatric dosing rule, for instance, depends entirely on an accurate date of birth. Demographics describe *who* the patient is; they say nothing about what condition brought the patient in, which is exactly why they stay separate from diagnosis and treatment data covered starting in Chapter 9. A demographics panel is also usually stable — Maria's date of birth and race and ethnicity rarely change between encounters — which is a further reason these values sit as properties directly on the `Patient` node rather than as their own connected nodes with a history to track.

Two patients with identical demographics and the same diagnosis can still have very different outcomes, because of factors that never appear on a standard demographics panel. **Social determinants of health (SDOH)** are the non-medical conditions in the environments where people are born, live, work, and age that meaningfully influence health outcomes. Five factors are tracked especially widely in clinical and population-health data:

- **Housing instability** — frequent moves, eviction risk, or lack of stable housing
- **Food insecurity** — inconsistent access to adequate nutrition
- **Transportation access** — the ability to reliably reach appointments, pharmacies, and sources of healthy food
- **Health literacy** — a patient's ability to obtain, understand, and act on health information
- **Income level** — household earnings relative to the cost of care and daily living

Unlike a fixed attribute such as date of birth, an SDOH factor can appear, worsen, or resolve over time, and it carries its own severity assessment independent of the patient's identity. That is exactly why SDOH factors are modeled as their own node type — `SDOHFactor` — connected to the patient by a `HAS_SDOH_FACTOR` edge carrying a `severity` or `risk_level` property, rather than folded into the demographics properties on the `Patient` node itself. It is the same label-versus-property judgment call introduced in Chapter 1, applied to a second, very different kind of data. One more forward pointer is worth planting here: SDOH data increasingly lives not in free-text case-manager notes but in FHIR `Observation` resources coded with LOINC and ICD-10-Z codes, a structured representation the FHIR-focused chapters later in this book explore in full.

#### Diagram: Patient Demographics and SDOH Profile

<iframe src="../../sims/patient-demographics-sdoh-profile/main.html" width="100%" height="1242px" scrolling="no"></iframe>

<details markdown="1">
<summary>Patient Demographics and SDOH Profile</summary>
Type: graph-model
**sim-id:** patient-demographics-sdoh-profile<br/>
**Library:** vis-network<br/>
**Status:** Validated

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: classify, explain<br/>
Learning objective: Given a patient node with demographic properties and connected SDOHFactor nodes, the learner can classify each attribute as a demographic property versus a social determinant of health and explain why each is modeled differently in a labeled property graph.

Purpose: Show that a Patient node carries demographics as intrinsic properties, while Social Determinants Of Health are modeled as separate connected nodes because they carry their own severity/risk data and can change independently of the patient's identity.

Node types to show (color-coded by label):
- `Patient` (pink circle, center of layout) — example instance: Maria Chen, properties `age: 39`, `sex: "F"`, `race_ethnicity: "Asian"`, `preferred_language: "English"`, `address: "142 Oak St, Springfield"`
- `SDOHFactor` (orange diamond, five instances arranged around the Patient node) — example instances: "Housing Instability", "Food Insecurity", "Transportation Access", "Health Literacy", "Income Level", each carrying a `category` property

Edge types to show:
- `HAS_SDOH_FACTOR` (Patient to SDOHFactor), properties `severity` ("low" | "moderate" | "high") and `risk_level` (numeric 1-5), rendered as a thicker, redder line as severity increases

Sample data:
- Maria Chen (Patient) HAS_SDOH_FACTOR {severity: "moderate", risk_level: 3} Transportation Access
- Maria Chen (Patient) HAS_SDOH_FACTOR {severity: "low", risk_level: 1} Food Insecurity
- Maria Chen (Patient) HAS_SDOH_FACTOR {severity: "low", risk_level: 1} Health Literacy
- Housing Instability and Income Level are shown present but unconnected to Maria, to demonstrate that not every SDOHFactor node applies to every patient

Data Visibility Requirements:
Stage 1: Show the Patient node at center with its five demographic properties visible in a label list, and five SDOHFactor nodes arranged around it, with only two or three connected by HAS_SDOH_FACTOR edges.
Stage 2: On hover over the Patient node, show a tooltip listing all demographic properties as key-value pairs.
Stage 3: On hover over a connected SDOHFactor node or its edge, show a tooltip with the factor name, its severity, and its numeric risk_level.
Stage 4: On click of the Patient node, highlight all HAS_SDOH_FACTOR edges and their connected SDOHFactor nodes in a contrasting color, and dim the unconnected SDOHFactor nodes to show they do not apply to this patient.

Interactive controls:
- Legend panel (always visible) distinguishing the Patient node style, the SDOHFactor node style, and the severity color/thickness scale on edges
- Toggle button: "Show FHIR Mapping Note" — reveals a callout explaining that SDOH data increasingly lives in FHIR Observation resources coded with LOINC and ICD-10-Z codes rather than as free-text notes, a topic explored fully in the FHIR chapters later in this book
- Reset view button to re-center and re-fit the graph

Instructional Rationale: A click-and-hover graph-model explorer matches the Understand-level objective (classify, explain) by making the label-versus-property distinction from Chapter 1 concrete in a second context: demographics stay attached to the Patient node as properties because they describe the patient directly, while SDOH factors become their own nodes because they carry independent severity data and a patient may have zero, one, or several of them. Letting the learner toggle which SDOHFactor nodes are connected reinforces that this is a real modeling choice, not an arbitrary one.

Layout: Force-directed, Patient node fixed near center, five SDOHFactor nodes arranged in a ring, non-overlapping, responsive to window resize
Canvas size: responsive width, 500px height
Legend: node shape/color key for Patient and SDOHFactor; edge color/thickness key for severity levels low/moderate/high

Implementation: vis-network JavaScript library
</details>

## Zooming Out: Population Health and Care Coordination Models

Demographics and SDOH data become most useful not one patient at a time, but in aggregate. **Population health** is the health outcomes of a defined group of individuals — a payer's covered members, an ACO's attributed patients, or every patient with Type 2 Diabetes at Riverside Clinic — including how those outcomes are distributed across the group, not just their average. A population health question is structurally a graph question: which subgroup of patients has the worst glycemic control, and what do they share — the same primary care provider, the same zip code, the same connected `SDOHFactor` nodes? Answering it is a traversal or aggregation across many `Patient` nodes filtered by shared properties or shared connections, which is precisely why the previous section's modeling choices matter at scale, not just for one chart. A population health analyst at Riverside Clinic's ACO might, for instance, start from every `Patient` node with an A1c lab result above 9.0, filter down to those also connected to a `SDOHFactor` node with `risk_level` of 4 or higher, and discover that transportation access — not medication adherence — explains most of the gap, a pattern invisible from any single patient's chart but obvious once demographics, SDOH, and lab results are traversed together.

Coordinating that same group of patients day to day, rather than analyzing them in aggregate, is **care coordination**: the deliberate organization of a patient's care activities and the deliberate sharing of information among everyone involved in that care, aimed at making care safer and more effective whenever more than one provider is involved. When Dr. Patel refers Maria to Dr. Osei, and Dr. Osei in turn refers her to nutritionist Dana Reyes — the same referral chain traced in Chapter 1 — effective care coordination requires each provider to know what the others have already done. The CCDs and HIE queries from the previous section serve that need at a technical level; a designated care coordinator or care manager often serves the identical need at a human level, calling Maria directly to confirm she made it to her appointment with Dr. Osei and following up on referrals the graph alone won't chase down on its own.

Two organizational models formalize care coordination and population health at different scales. An **accountable care organization (ACO)** is a network of providers, hospitals, and sometimes payers that voluntarily takes joint accountability for the cost and quality of care delivered to a defined population of attributed patients, sharing in savings — or losses — measured against a spending benchmark. The Medicare Shared Savings Program is the best-known example in the United States: if an ACO's benchmark spending target for its attributed population is $50 million for the year and it actually spends $46 million while meeting its quality targets, it can keep a share of that $4 million difference as a shared-savings payment, splitting the remainder with the payer that set the benchmark. In a graph model, an ACO is naturally represented as a node that aggregates a network of primary care providers and connects to a payer through a shared-savings contract relationship, rather than as a property attached to any single provider or patient.

A **patient-centered medical home (PCMH)** operates at a smaller scale: it is a care delivery model, usually implemented at a single primary care practice and formally recognized through a process like NCQA certification, in which that practice acts as the coordinating hub for a patient's comprehensive care — tracking referrals, preventive care gaps, and follow-up — rather than leaving each specialist to operate independently. A PCMH and an ACO are not competitors; a PCMH can exist inside an ACO, coordinating the individual patient relationship while the ACO manages financial risk across many practices just like it. Contrasting all three arrangements — including the traditional fee-for-service model already familiar from Chapter 7 — against the same three dimensions makes the differences concrete, along with what each looks like once it is modeled as a graph.

| Dimension | Fee-for-Service | Accountable Care Organization | Patient-Centered Medical Home |
|---|---|---|---|
| Payment model | Paid per service rendered; volume-driven | Shared savings or risk measured against a population spending benchmark | Often fee-for-service plus a per-patient care-management fee |
| Care coordination responsibility | Left to the patient or informal provider-to-provider contact | Formal and network-wide, spanning many practices and specialists | Centered on a single primary care practice |
| Typical graph relationship | `Provider` –BILLS→ `Payer` per encounter | `ACO` –HAS_MEMBER→ many `Provider` nodes; `ACO` –HAS_CONTRACT→ `Payer` | `Patient` –HAS_MEDICAL_HOME→ `Provider`, which fans out to specialists |

!!! mascot-encourage "You're Tracing Real Organizational Structure Now"
    ![Sage cheering encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    ACOs, PCMHs, and fee-for-service contracts can feel abstract compared to a single patient's chart, but you just modeled all three as graph patterns. That skill carries straight into the provider-network chapters later in this book.

Riverside Clinic itself could plausibly sit inside all three of these dimensions at once: Dr. Patel bills fee-for-service for most visits, Riverside Clinic operates as a PCMH for patients like Maria who name it as their primary care home, and Riverside Clinic's ACO membership means some of Maria's total annual cost of care still counts toward a shared-savings calculation regardless of how any single visit was billed. None of that layered structure is visible from a single claim — it only becomes visible once fee-for-service, PCMH, and ACO relationships are each modeled as their own edges radiating outward from the same clinic node.

!!! mascot-celebration "You Connected the Standards to the Structure"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just mastered Clinical Workflow and the Medical Encounter it produces, the interoperability standards — HL7, HL7 V2 Messages, CCDs, RxNorm, and medical terminology — that let that data move, Health Information Exchange and Healthcare Data Exchange as the pipes that carry it, Patient Demographics and Social Determinants of Health as the context around the patient, and Population Health, Care Coordination, ACOs, and PCMHs as the structures that organize care around all of it.

Every concept in this chapter answered a version of the same question: once a patient's data exists, how does it move, and who is responsible for making sure it arrives intact? [Chapter 9](../09-patient-diagnosis-treatment-medication/index.md) picks up exactly where this leaves off, moving from the interoperability plumbing into the clinical content itself — symptoms, diagnoses, and medications — that all of these standards and coordination structures ultimately exist to carry.
