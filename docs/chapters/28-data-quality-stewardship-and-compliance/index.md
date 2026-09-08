---
title: Data Quality, Stewardship, and Compliance
description: Covers data quality measurement and deduplication, data classification and sensitivity labeling, change data capture and versioning, and the stewardship roles, councils, and compliance reporting that operate a healthcare data governance program.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:11:46
version: 1.10
---

# Data Quality, Stewardship, and Compliance

## Summary

This chapter completes the data governance unit with the practical mechanics of running a governance program: data catalogs, dictionaries, golden records, and entity resolution. It covers data quality scoring, ownership, retention policy, and classification, along with the organizational side of governance -- data steward roles, governance councils, and business glossaries -- concluding with regulatory compliance reporting and data ethics review.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Data Deduplication | 15 |
| Data Validation Rule | 2 |
| Data Quality Score | 1 |
| Data Ownership | 2 |
| Data Retention Policy | 1 |
| Data Classification | 10 |
| Data Steward Role | 2 |
| Data Governance Council | 1 |
| Business Glossary | 2 |
| Data Sensitivity Label | 1 |
| Change Data Capture | 5 |
| Data Versioning | 2 |
| Schema Evolution | 1 |
| Regulatory Compliance Reporting | 2 |
| Data Ethics Review | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 27: Data Governance and Metadata Management](../27-data-governance-and-metadata-management/index.md)

---

Chapter 27 gave you the vocabulary of governance — metadata, lineage, and the framework of pillars that keeps an organization's data trustworthy. This chapter puts that vocabulary to work. If a governance framework is the constitution, this chapter is the day-to-day government: the specific rules that measure whether data is actually good, the specific people accountable when it isn't, and the specific reports regulators expect to see. We close the governance unit here, immediately before the book's capstone chapter, because every one of these mechanics is something you may need to actually implement in your own capstone project.

!!! mascot-welcome "Where Governance Meets the Real World"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Welcome back — Sage here for the last stop on our governance tour. We've talked policy and principle; now it's wrenches and gauges. You'll learn how to actually measure data quality, who signs off when something's wrong, and how a healthcare organization proves to a regulator that it's doing all of this correctly. Let's connect the dots!

## Measuring and Fixing Data Quality: Deduplication and Validation Rules

Chapter 27 introduced data quality as a concept — the degree to which data is accurate, complete, consistent, and fit for use — without yet showing how an organization actually measures or enforces it. Two mechanisms do most of that work. A **data validation rule** is an automated check applied to incoming or existing data that flags or rejects values violating a defined constraint: a rule might require that every `Patient` node's `date_of_birth` property fall before today's date, or that every `Claim` node's `diagnosis_code` property match a valid ICD-10 code from the reference data management system covered in Chapter 27. **Data deduplication** targets a different, extremely common quality failure: the same real-world entity appearing as two or more separate records because of typos, formatting differences, or independent data entry at different facilities — Maria Chen entered once as "Maria Chen" and again, from a different intake form, as "Maria L. Chen."

A worked example shows why deduplication is not merely tidiness but a genuine analytics risk. Suppose Riverside Clinic's population-health team runs a query counting distinct diabetic patients to estimate program capacity. If Maria Chen exists as two separate, undeduplicated `Patient` nodes — one created at her primary care visit and another created during an emergency department visit under a slightly misspelled name — the query counts her twice, inflating the estimate and, at scale across thousands of patients, meaningfully distorting a staffing or budget decision built on that number. Deduplication in a graph database typically runs the same entity resolution techniques introduced in Chapter 27 — matching on normalized name, date of birth, and address similarity — but then goes one step further than simple resolution by actually merging the duplicate nodes' edges onto a single surviving node, so that encounters, diagnoses, and prescriptions recorded under either version of Maria Chen's record end up connected to one patient rather than split across two.

Validation rules and deduplication complement each other rather than compete: a validation rule catches a bad value the moment it enters the graph (rejecting a `date_of_birth` in the future before it is ever written), while deduplication catches a structural problem that validation alone cannot see, because two duplicate records can each individually pass every validation rule and still be wrong together. The interactive MicroSim below lets you inject exactly this kind of quality problem into a small graph and watch a real query's answer drift away from the correct result.

#### Diagram: Data Quality Impact Analysis MicroSim

<iframe src="../../sims/data-quality-impact-analysis-microsim/main.html" width="100%" height="656px" scrolling="no"></iframe>

<details markdown="1">
<summary>Data Quality Impact Analysis MicroSim (reused)</summary>
Type: microsim
**sim-id:** data-quality-impact-analysis-microsim<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/data-quality-impact-analysis-microsim/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/data-quality-impact-analysis-microsim

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, differentiate<br/>
Learning objective: Given a graph query and a set of injectable data-quality issues, the learner can differentiate which issue type (duplication, missing edge, inconsistent code, null value) causes a query result to over-count versus under-count the correct answer.

Reused from the MicroSim catalog. This MicroSim runs a graph query against a small patient-provider-prescription-diagnosis graph and lets the learner toggle data-quality issues on and off: duplicate patient records over-count, missing TREATED_BY edges under-count, inconsistent diagnosis codes drop matches, and null prescription dates remove records. Toggling an issue immediately changes the query result and flips an accuracy flag to a red "wrong by" warning, letting the learner directly observe — rather than just read about — how each specific quality failure biases an analytic result in a specific direction.
</details>

## Data Quality Score, Ownership, and Retention Policy

Individual validation rules and deduplication passes feed into a single, trackable summary: a **data quality score**, a composite metric — often expressed as a percentage or a weighted average across dimensions like completeness, accuracy, and consistency — that lets an organization monitor whether its data is improving or degrading over time, and compare quality across different data domains at a glance. A simple version of the formula might weight three dimensions as \( \text{Score} = 0.4 \times \text{Completeness} + 0.3 \times \text{Accuracy} + 0.3 \times \text{Consistency} \), where each dimension is itself a percentage of records passing its relevant validation rules; the specific weights matter less than the discipline of tracking the same formula consistently over time so that a drop is meaningful rather than an artifact of a changed measurement method. A dashboard reporting "Patient Demographics: 97% quality score, Relationship Data: 84% quality score" immediately tells a governance team where to focus remediation effort, without anyone having to read through raw validation-rule failure logs domain by domain.

Two organizational concepts round out this section. **Data ownership** assigns a specific accountable party — often a business unit rather than an individual — for a given data domain's overall correctness and appropriate use, distinct from the individual data steward role covered later in this chapter, who does the hands-on stewardship work on the owner's behalf. Ownership answers "who is ultimately on the hook if this domain's quality score drops?"; stewardship answers "who actually fixes it?" — the clinical operations department might own patient demographics data, while a specific named analyst stewards it day to day.

A **data retention policy** specifies how long each category of data must be kept before it can be archived or deleted — a decision driven by a mix of regulatory requirement (HIPAA and state law often mandate minimum retention periods for medical records, frequently measured in years rather than months), storage cost, and privacy risk (data you no longer need is data you no longer need to protect). A retention policy for Riverside Clinic might specify that full clinical encounter records are retained for ten years after a patient's last visit, while raw application server logs — useful for troubleshooting but carrying no clinical value — are purged after ninety days, reflecting how differently regulatory necessity and privacy risk weigh across data types. The dashboard below shows exactly the kind of multi-dimension quality monitoring a data quality score summarizes, tracked over time and broken down by entity type.

#### Diagram: Data Quality Dashboard

<iframe src="../../sims/data-quality-dashboard-chart/main.html" width="100%" height="770px" scrolling="no"></iframe>

<details markdown="1">
<summary>Data Quality Dashboard (reused)</summary>
Type: chart
**sim-id:** data-quality-dashboard-chart<br/>
**Library:** Chart.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/data-quality-dashboard-chart/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/data-quality-dashboard-chart

Bloom Taxonomy: Evaluate<br/>
Bloom Taxonomy Verb: assess, prioritize<br/>
Learning objective: Given a four-panel data quality dashboard, the learner can assess which quality dimensions fall below threshold and prioritize which issue would yield the greatest improvement if remediated.

Reused from the MicroSim catalog. This four-panel dashboard scores seven quality dimensions against a 90% threshold and 95% target (flagging Consistency and Relationship Quality below threshold), compares completeness of required versus optional properties by entity type, tracks four dimensions over 90 days (showing a relationship-quality dip after an ETL deployment and its recovery), and ranks top data-quality issues by affected record count. Hovering any bar, point, or line reveals exact values, letting learners practice exactly the "where should we focus remediation" judgment described in the preceding paragraph.
</details>

## Data Classification and Data Sensitivity Labels

Not all data in a healthcare graph carries the same risk if it is exposed, and **data classification** is the practice of sorting data into tiers based on that risk, so that governance and security controls can be applied proportionally rather than uniformly. A typical healthcare classification scheme defines tiers such as *Public* (a clinic's general hours of operation), *Internal* (aggregate, non-patient-identifiable operational statistics), *Confidential* (business information like contract terms with a payer), and *Restricted* (protected health information, subject to every safeguard covered in Chapters 25 and 26). Each `Patient`, `Claim`, or `Provider` node — or even individual properties on those nodes — can carry a **data sensitivity label** recording which classification tier it belongs to, which access control systems and encryption policies then read directly to decide how strictly to protect that specific piece of data.

A worked example shows classification and sensitivity labels working together in practice. Maria Chen's `Patient` node might carry a `general_demographics` property labeled *Confidential* (name, address) alongside a `diagnosis_codes` property labeled *Restricted* (specific clinical diagnoses) — two different sensitivity labels on the very same node, because classification applies at whatever granularity actually differs in risk. An RBAC policy from Chapter 25 can then reference these labels directly: "grant read access to Confidential properties for any authenticated staff member, but require an active care relationship for Restricted properties" — turning classification from a paperwork exercise into an enforceable, machine-readable input to the access control system.

The table below reinforces the four-tier scheme with concrete healthcare examples and the access consequence each tier typically triggers, before you try classifying a few examples yourself in the interactive version.

| Tier | Example Data | Typical Access Rule |
|---|---|---|
| Public | Clinic hours, general services list | No restriction |
| Internal | Aggregate, non-identifiable utilization statistics | Authenticated staff only |
| Confidential | Payer contract terms, general patient demographics | Role-based access required |
| Restricted | Individual diagnoses, prescriptions, PHI | Role plus active care relationship, MFA |

#### Diagram: Healthcare Data Sensitivity Classification Levels

<iframe src="../../sims/data-sensitivity-classification-levels/main.html" width="100%" height="802px" scrolling="no"></iframe>

<details markdown="1">
<summary>Healthcare Data Sensitivity Classification Levels</summary>
Type: infographic
**sim-id:** data-sensitivity-classification-levels<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: classify, demonstrate<br/>
Learning objective: Given a sample healthcare data element, the learner can classify it into the correct sensitivity tier (Public, Internal, Confidential, Restricted) and identify the access control consequence of that classification.

Purpose: Let learners practice classifying realistic healthcare data elements into the four-tier sensitivity scheme described in the preceding worked example, and see the resulting access rule for each tier.

Components to show: Four horizontal bands stacked vertically, labeled bottom-to-top Public, Internal, Confidential, Restricted, each in a progressively "hotter" color. A tray of eight draggable data-element cards above the bands (e.g., "Clinic hours", "Aggregate patient count", "Payer contract terms", "Maria Chen's diagnosis code", "Provider NPI number", "De-identified research dataset", "Patient's home address", "Marketing brochure text").

Data Visibility Requirements:
Stage 1: Show the four bands with their names and colors, and the tray of unsorted cards.
Stage 2: On drag-and-drop of a card onto a band, show immediate feedback (green checkmark or red X) indicating whether the classification is correct, based on a predefined answer key.
Stage 3: On correct placement, reveal a short access-control consequence for that tier (e.g., Restricted: "Requires active care relationship plus MFA").
Final: Once all eight cards are correctly placed, display a summary panel listing each tier's access rule together, reinforcing the full classification scheme at a glance.

Interactive controls:

- Drag-and-drop each card onto its correct band
- "Show Hint" button revealing one classifying question for the currently dragged card (e.g., "Could this identify a specific patient?")
- Reset button to shuffle cards back to the tray

Instructional Rationale: The Apply-level objective (classify, demonstrate) calls for hands-on categorization rather than passive reading; drag-and-drop with immediate correct/incorrect feedback lets the learner test and correct their own mental model of the four tiers, directly mirroring the worked example's claim that classification applies at the level of individual properties, not just whole records.

Layout: Vertical stacked bands taking the left two-thirds of the canvas; card tray on the right; responsive width that reflows the tray below the bands on narrow screens.

Color scheme: Public (cool blue/green), Internal (yellow), Confidential (orange), Restricted (red) -- a "heat" gradient from least to most sensitive.

Implementation: p5.js with mouse-drag event handling for card placement; drop-zone collision detection against the four band rectangles.
</details>

## Change Data Capture, Data Versioning, and Schema Evolution

Healthcare graphs are never static, and three concepts govern how they change safely over time. **Change data capture**, or **CDC**, is a technique for detecting and streaming individual insertions, updates, and deletions from a source system the moment they happen, rather than waiting for a periodic batch reload — it is the mechanism behind the "real-time clinical events" integration pattern Chapter 27's source-metadata diagram showed flowing from Epic EHR. A concrete worked example: when Dr. Patel admits a patient in the EHR, an ADT (Admit-Discharge-Transfer) message fires immediately; a CDC pipeline listens for that message and updates the corresponding graph node's `admission_status` property within seconds, so a bed-management dashboard querying the graph reflects the admission almost in real time rather than waiting for the next nightly batch job to catch up.

**Data versioning** takes a complementary approach at the record level: rather than overwriting a value when it changes, a versioned system preserves the prior value alongside a timestamp, so a query can ask not just "what is Maria Chen's current risk score?" but "what was her risk score as of last Tuesday, when Dr. Patel made a treatment decision based on it?" — a capability that matters enormously when an audit needs to reconstruct exactly what a clinician saw at the moment they acted, rather than what the record happens to say today after several subsequent updates.

**Schema evolution** addresses change at a structural level rather than a data-value level: the process of safely modifying a graph's node labels, edge types, or property definitions — adding a new property to the `Patient` label, say — without breaking the applications and queries already running against the existing schema. Suppose Riverside Clinic begins offering telehealth visits and needs to add a `visit_modality` property to the `Encounter` node distinguishing in-person from virtual visits. A labeled property graph's flexible schema, introduced in Chapter 1, makes this considerably less disruptive than in a rigid relational table: because two `Encounter` nodes are not required to carry identical property sets, the new property can simply begin appearing on newly created telehealth encounters immediately, while millions of existing in-person encounter nodes are left untouched rather than requiring a disruptive migration to backfill a column across every existing row.

!!! mascot-thinking "Versioning Turns Your Graph Into a Time Machine"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Here's the mental shift worth sitting with: a versioned graph doesn't just store what's true *now* — it stores what was true at every point along the way. That means an audit question like "what did the clinician actually see?" stops being a guess and becomes a query against a specific point in time. Every relationship matters, including the ones that used to exist.

## The People and Process of Governance: Stewards, Councils, and Glossaries

Every mechanism in this chapter still needs a human being accountable for it, which is where governance becomes organizational rather than purely technical. A **data steward role** is the specific, named job of the person responsible for a data domain's day-to-day quality, definitions, and access decisions — introduced as a concept in Chapter 27, and now given its full organizational context. A steward for "patient demographics" might be a specific clinical informatics analyst who approves new validation rules, arbitrates disputed sensitivity labels, and answers other teams' questions about what a field actually means.

Because stewards for different domains inevitably need to coordinate — a "patient demographics" steward and a "billing codes" steward both have a stake in how a combined patient-billing dashboard is built — organizations establish a **data governance council**: a standing, cross-functional body of stewards, IT leadership, compliance officers, and clinical representatives with actual authority to resolve conflicts, approve new data sources, and update governance policy. This is the "real organizational authority" Chapter 27 flagged as the missing ingredient that turns a governance framework from paperwork into practice — the council is where that authority actually lives and is exercised.

Stewards and the council both rely on a shared reference to avoid talking past each other: a **business glossary**, a curated, plain-language dictionary of business terms (distinct from the technical data dictionary in Chapter 27, which defines fields rather than concepts) that gives every stakeholder the same definition of terms like "active patient," "readmission," or "in-network provider." Without a shared business glossary, a billing department's definition of "active patient" (has an open claim) can silently diverge from a clinical department's definition (has been seen in the last 12 months) — and any dashboard combining both departments' data inherits that hidden disagreement.

!!! mascot-tip "The Glossary Test for a New Metric"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you trust — or build — any new healthcare metric, run it through a quick glossary test: can you find its exact definition in the business glossary, and does everyone using the metric agree that definition is the one they mean? If the answer is no, you've just found a governance gap worth reporting to a steward before the metric ships to a dashboard.

## Regulatory Compliance Reporting and Data Ethics Review

The governance mechanics in this chapter ultimately serve an external audience as much as an internal one. **Regulatory compliance reporting** is the formal process of documenting and submitting evidence that an organization's data practices satisfy applicable regulations — HIPAA audits, state breach-notification filings, or Centers for Medicare & Medicaid Services quality-reporting requirements. Every concept in this chapter contributes evidence to this reporting: a data quality score demonstrates that reported clinical measures are trustworthy, an audit trail (Chapter 25) demonstrates access was properly controlled, and a data governance council's meeting minutes demonstrate that oversight is real and ongoing rather than nominal.

Finally, a **data ethics review** asks a question compliance reporting alone cannot answer: not just "is this legal?" but "is this the right thing to do?" A data use might satisfy every HIPAA requirement and still raise ethical concerns — using a risk-prediction model trained predominantly on one demographic group to make decisions about a different, underrepresented population, for instance, is not necessarily a HIPAA violation, but it is exactly the kind of use a data ethics review exists to catch before deployment, evaluating fairness, potential for harm, and whether affected patients would consider the use acceptable if they knew about it.

## Chapter Summary

!!! mascot-celebration "Governance: From Principle to Practice"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just completed the entire data governance unit — from the high-level framework in Chapter 27 down to the concrete mechanics of quality scores, classification tiers, stewardship, and compliance reporting. That's the kind of practical, end-to-end governance knowledge that turns a promising graph project into one an organization can actually trust and deploy.

This chapter turned Chapter 27's governance framework into an operating program: data validation rules and deduplication measure and fix quality, a data quality score tracks it over time, and data classification with sensitivity labels lets access controls scale their strictness to actual risk. Change data capture, versioning, and schema evolution keep a healthcare graph current without breaking what already depends on it, while data stewards, a governance council, and a shared business glossary give all of these mechanics real organizational accountability. Regulatory compliance reporting and data ethics review close the loop, proving to regulators — and to the organization's own conscience — that the data is being handled correctly. With security, governance, and quality now all in place, [Chapter 29](../29-capstone-projects-and-career-development/index.md) brings every concept in this book together into a capstone project you will scope, build, and present yourself.

[See Annotated References](./references.md)
