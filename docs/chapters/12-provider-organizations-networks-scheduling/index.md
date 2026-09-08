---
title: Provider Organizations, Networks, and Scheduling
description: Models the provider side of the healthcare graph -- care settings, provider networks, referrals, credentialing, ratings, and scheduling capacity.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:10:10
version: 1.10
---

# Provider Organizations, Networks, and Scheduling

## Summary

This chapter introduces the provider perspective, modeling the organizations and relationships that deliver care: primary care and specialist providers, hospitals, clinics, and care settings from outpatient to emergency departments. It covers provider networks, scheduling, appointments, referrals, and the credentialing data (licenses, board certification) that establishes a provider's standing. Students learn to model the provider side of the healthcare graph alongside the patient side built in prior chapters.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Primary Care Provider | 190 |
| Specialist Provider | 2 |
| Hospital | 1 |
| Clinic | 2 |
| Outpatient Facility | 1 |
| Inpatient Care | 185 |
| Emergency Department | 122 |
| Provider Network | 121 |
| Provider Schedule | 2 |
| Appointment | 1 |
| Referral | 60 |
| Referral Inference | 2 |
| Provider Credential | 1 |
| Medical License | 2 |
| Board Certification | 1 |
| Provider Rating | 55 |
| Provider Capacity | 2 |
| Provider Specialization | 1 |
| Hospital Department | 2 |
| Care Team | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 7: Healthcare Economics and Medical Coding Systems](../07-healthcare-economics-medical-coding/index.md)

---

Every patient journey in this book eventually runs into a provider — and every
provider sits inside an organization that shapes what they can do, whom they
can see, and how fast they can see them. Chapters 9 through 11 modeled the
patient side of the graph: diagnoses, treatments, care plans, and specialty
services. This chapter builds the other half of that same graph — the
organizations, networks, and scheduling structures that deliver care — so
that a `TREATED_BY` edge from a patient always lands on a fully modeled
`Provider` node, and a `WORKS_AT` edge always lands on a fully modeled
facility.

That provider side turns out to be unusually rich in structure. A single
physician might be a PCP for one insurer's network and an out-of-network
specialist referral target for another; a single hospital might own one
outpatient facility outright while merely partnering with a dozen affiliated
clinics; a single patient encounter might begin in an emergency department
and end, hours later, in a very different part of the building entirely.
Twenty concepts make up this chapter, more than any other in the book, and
that is not accidental — everything payers, fraud analysts, and clinical
guideline authors do in later chapters assumes the provider graph built here
is already in place.

!!! mascot-welcome "Building the Provider Side of the Graph"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Welcome back! This chapter is where we build out the provider side of the graph -- clinics, hospitals, networks, referrals, and schedules -- and it happens to be the biggest one yet, because so much of the rest of the book leans on it. Let's connect the dots!

## Primary Care Providers and the Care Setting Hierarchy

The most frequently traversed node type on the provider side of a healthcare
graph is the **Primary Care Provider**, commonly abbreviated PCP: a
physician, nurse practitioner, or physician assistant who serves as a
patient's first point of contact and coordinates referrals to other care. In
graph terms, a PCP is a `Provider` node distinguished by a `role` or
`provider_type` property (`"Primary Care"`) and is the target of an
`ATTRIBUTED_TO` edge from every patient on their panel — the roster of
patients for whom that PCP is responsible for coordinating care. That
attribution edge is not decorative; it is the anchor point value-based care
contracts use to assign financial responsibility for a patient's total cost
of care, a topic that resurfaces when this book turns to payer contracts in
Chapter 15.

Consider a concrete worked example. Dr. Amara Okafor is a PCP at Riverside
Clinic with an active patient panel of 1,800 patients — each connected to
her `Provider` node by its own `ATTRIBUTED_TO` edge. A payer running a
value-based contract with Riverside Clinic queries that panel once a
quarter to compute the total cost of care per attributed patient, compare it
against a risk-adjusted benchmark, and determine whether Dr. Okafor's
patients cost the system more or less than expected. None of that
computation requires a join across a `patients` table and a
`provider_assignments` table with a `current_flag` column, the typical
relational pattern; it is a single traversal outward from her `Provider`
node across every `ATTRIBUTED_TO` edge. If Dr. Okafor leaves Riverside
Clinic, the graph model also makes panel *reassignment* explicit: each
`ATTRIBUTED_TO` edge can carry its own `start_date` and `end_date`, so a
patient's attribution history is preserved rather than overwritten the
moment a new PCP takes over the panel.

A PCP rarely treats every condition alone. When a patient's needs exceed
primary care's scope, the PCP's graph neighborhood extends outward to a
**Specialist Provider** — a physician whose practice is narrowed to a
specific body system, disease category, or procedure type (cardiology,
dermatology, orthopedic surgery). Structurally, a specialist is the same
`Provider` node type as a PCP, but with a different `provider_type` value and
typically one or more `Specialty` property values or relationships attached.
Both PCPs and specialists need somewhere to practice, and healthcare graphs
distinguish several kinds of care settings by the `Facility` node types they
connect to:

- **Hospital** — a licensed institution providing 24-hour inpatient care, emergency services, and surgical capacity; modeled as a `Facility` node with `facility_type: "Hospital"` and properties like `bed_count` and `trauma_level`.
- **Clinic** — a lower-acuity outpatient practice site, often the physical location where a PCP or small group of specialists sees scheduled patients; modeled as `facility_type: "Clinic"`.
- **Outpatient Facility** — any site delivering care without an overnight stay, ranging from an imaging center to an ambulatory surgical center; modeled as `facility_type: "Outpatient"` with a more specific `service_line` property (e.g., `"Imaging"`, `"Ambulatory Surgery"`).
- **Hospital Department** — a functional subdivision inside a hospital (Cardiology, Radiology, the Emergency Department) modeled as its own node connected to the parent `Hospital` node by a `PART_OF` edge, so that capacity and staffing can be tracked per department rather than only at the whole-hospital level.

These four settings are not interchangeable labels on the same node — they
are distinct node types (or distinct `facility_type` values) precisely
because the questions a graph needs to answer differ by setting: a hospital
query cares about bed capacity and trauma level; a clinic query cares about
which PCPs practice there; an outpatient facility query cares about service
line and same-day scheduling. A large health system's graph typically shows
a hospital `OPERATES` its own emergency department and one or more
outpatient facilities (an imaging center, a surgical center), while
independent clinics are `AFFILIATED_WITH` that hospital without being owned
by it — a distinction that matters enormously for referral leakage analysis
later in this chapter, since an affiliated clinic's referrals are far more
likely to stay in-network than an unaffiliated one's.

Take Riverside Regional, a mid-sized hospital, as a worked example of that
ownership structure. Riverside Regional `OPERATES` its Emergency Department,
its Cardiology Hospital Department, and a same-day surgical outpatient
facility across town — all three trace an unbroken chain of ownership back
to the hospital's `Facility` node, so a single query starting at Riverside
Regional and following every `OPERATES` edge returns the hospital's entire
owned footprint. Riverside Clinic, where Dr. Okafor practices, is a
separate legal entity connected to Riverside Regional only by an
`AFFILIATED_WITH` edge carrying a `contract_type` property such as
`"Clinically Integrated Network"` — close enough for shared referral
pathways and shared quality metrics, but not close enough that the hospital
appears in the clinic's ownership chain. Losing that distinction in a graph
model is not a cosmetic error: hospital system executives use exactly this
ownership-versus-affiliation traversal to decide where capital investment
dollars can be directed without triggering separate corporate approval.

Finally, no single provider delivers modern care alone. A **Care Team** is
the modeled group of providers — physician, nurse, pharmacist, social worker,
care coordinator — who share responsibility for one patient's care, typically
represented as a `CareTeam` node connected by `MEMBER_OF` edges to each
participating `Provider` node and by a `CARES_FOR` edge to the `Patient`
node. For Maria Chen managing Type 2 Diabetes, that team might include Dr.
Okafor as the coordinating PCP, an endocrinologist for specialist oversight,
a diabetes educator, and a pharmacist managing her medication regimen — four
`MEMBER_OF` edges into a single `CareTeam` node, each carrying a `role`
property so the graph distinguishes "coordinating provider" from
"consulting specialist." Chapter 13 develops care teams further as a
workforce and coordination concept; here, the important structural point is
that a care team is a *grouping* node, not a property of any single
provider, precisely because its membership changes independently of any one
provider's other relationships — swapping out the pharmacist does not
require touching the endocrinologist's record at all.

!!! mascot-tip "Node Type or Property Value?"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A recurring design choice in this chapter is whether something becomes its own node type (like Hospital Department) or just a property value on an existing node (like a specialist's provider_type). The rule of thumb: if you need to traverse *to* it, query *about* it independently, or attach its own properties and relationships, give it a node. If it only ever describes an existing node, keep it a property.

The diagram below lets you explore exactly this hierarchy in a small regional
delivery network: a hospital that operates an emergency department and two
outpatient facilities, clinics affiliated with (but not owned by) that
hospital, providers working at those clinics, and patients attributed to a
PCP.

#### Diagram: Healthcare Delivery Network Graph Model

<iframe src="../../sims/healthcare-delivery-network-graph-model/main.html" width="100%" height="488px" scrolling="no"></iframe>

<details markdown="1">
<summary>Healthcare Delivery Network Graph Model (reused)</summary>
Type: graph-model
**sim-id:** healthcare-delivery-network-graph-model<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/healthcare-delivery-network-graph-model

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: classify, identify<br/>
Learning objective: Given a rendered regional delivery network graph, the learner can classify each facility node by care setting (Hospital, Clinic, Outpatient Facility, Hospital Department) and identify which providers are attributed as a patient's PCP versus a specialist.

Reused from the MicroSim catalog. The model shows a Hospital node that OPERATES an Emergency Department node and two Outpatient Facility nodes (a surgical center and an imaging center); several Clinic nodes connected to the hospital by AFFILIATED_WITH edges rather than OPERATES, making the ownership distinction visible; Provider nodes connected to clinics by WORKS_AT edges, tagged as either Primary Care Provider or Specialist Provider; clinics and outpatient facilities connected to each other by REFER_TO edges; and Patient nodes connected to their PCP by an ATTRIBUTED_TO edge. Clicking any node opens a side panel with its label, type-specific properties, and a plain-language definition of that node type; clicking an edge shows its label and any properties (such as REFER_TO volume). Hovering highlights the immediate neighborhood so the learner can visually trace the difference between OPERATES (ownership) and AFFILIATED_WITH (looser partnership).

Interactive controls:
- Click any node to open its detail panel and highlight its edges
- Hover to preview a node's type without opening the panel
- Legend toggle to filter the view down to one facility type at a time (Hospital, Clinic, Outpatient Facility only)
- Reset/re-fit button to recenter the layout

Implementation: vis-network JavaScript library
</details>

## Care Settings by Acuity: From Emergency Department to Inpatient Care

The Hospital, Clinic, Outpatient Facility, and Hospital Department nodes
introduced above describe *where* care happens; the two concepts in this
section describe *how urgently* it happens, and urgency turns out to drive
an entirely separate set of graph relationships layered on top of the
facility structure already in place. These settings differ not only by
ownership and specialty but by how urgently and how long a patient needs to
stay. **Emergency Department** (ED) care is
unscheduled, acute care delivered to patients who present without an
appointment, typically triaged by severity within minutes of arrival. In the
graph, an ED visit is modeled as an `Encounter` node with
`encounter_type: "Emergency"`, connected by a `TREATED_AT` edge to the
Hospital Department node representing that hospital's emergency department
(recall from the previous section that departments are their own nodes,
`PART_OF` a parent Hospital). **Inpatient Care** is the broader category of
care delivered to a patient who has been formally admitted and occupies a
hospital bed overnight or longer, modeled as an `Encounter` node with
`encounter_type: "Inpatient"` and properties like `length_of_stay_days` and
`admitting_department`.

The relationship between these two concepts is not just "both are acute
care" — it is a *pathway*. Most inpatient stays begin as an ED visit that
escalates, and the graph needs to capture that escalation explicitly rather
than treating ED and inpatient encounters as unrelated records. Hospitals
use a standardized five-point scale, the Emergency Severity Index (ESI),
to record how urgently a patient needs care at triage: ESI 1 means
immediate, life-threatening need, while ESI 5 is the least urgent. That ESI
level is stored as a property on the triage step and becomes one of the key
inputs to the admit-or-discharge decision that follows.

Walk through a single patient to see why the pathway matters more than the
individual encounter labels. Maria Chen — the same patient introduced in
Chapter 1 — arrives at Riverside Regional's Emergency Department with chest
pain. Triage assigns her `esi_level: 2`, the second-most-urgent tier,
recorded on an `EDVisit` node with `arrival_time: "14:02"`. Twenty-two
minutes later, an attending physician records an `Admit Decision` node with
`decision: "Admit"` and `decision_time: "14:24"`, and Maria is assigned to
the Telemetry unit — a Hospital Department that monitors cardiac rhythm
continuously. Because no telemetry bed is immediately free, the edge from
her Admit Decision to the Telemetry Hospital Department carries
`boarding_time_hours: 3.5`: three and a half hours spent occupying an ED bay
while waiting for the inpatient bed to open. Only once that edge resolves
does her `length_of_stay_days` property on the Inpatient Care encounter
begin accumulating. Every one of those numbers — the ESI level, the
decision time, the boarding time, the length of stay — is a property sitting
on a specific node or edge in a specific pathway, which is exactly what lets
a hospital operations team later ask "which ESI-2 cardiac patients boarded
longer than three hours last month, and which department caused the delay?"
as a single graph query instead of a multi-table reconciliation project.

!!! mascot-thinking "Why Model the Pathway, Not Just the Encounter?"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    If you only stored a flat `encounter_type` field, you could never answer "how many ESI-2 patients ended up boarding in the ED for over four hours because no ICU bed was open?" That question requires traversing a chain of nodes -- triage, admit decision, unit assignment -- each carrying its own timestamps and properties, which is exactly what a graph is built to represent.

The diagram below traces that chain directly: a triage node carrying an ESI
level, an admit-decision node, and its two possible outcomes — discharge
home or admission to a specific inpatient unit, sub-typed by hospital
department (ICU, Med-Surg, Telemetry). Watch in particular for the
`boarding_time_hours` property on the edge between the admit decision and
the inpatient unit — this is the number of hours a patient waits in the ED
for an inpatient bed to open, and it is one of the most closely watched
capacity-strain metrics in hospital operations.

#### Diagram: Care Setting Acuity Flow Diagram

<iframe src="../../sims/care-setting-acuity-flow-diagram/main.html" width="100%" height="930px" scrolling="no"></iframe>

<details markdown="1">
<summary>Care Setting Acuity Flow Diagram</summary>
Type: workflow
**sim-id:** care-setting-acuity-flow-diagram<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, differentiate<br/>
Learning objective: Given a patient's triage acuity level and the resulting admit decision, the learner can differentiate Emergency Department care from Inpatient Care by tracing the decision path and examining how boarding time reflects capacity strain.

Purpose: Show how a single patient encounter moves through the graph from ED triage to either discharge or a specific inpatient unit, making the ED-versus-inpatient distinction concrete as a traversal rather than an abstract label, and surfacing capacity strain (ED boarding) as a directly observable edge property.

Components to show:
- "ED Triage" node — properties: `esi_level` (1-5, editable via control), `arrival_time`
- "Admit Decision" node — properties: `decision_time`, `decision` (Admit / Discharge)
- "Discharge Home" terminal node
- "Inpatient Unit" node, sub-typed by Hospital Department: ICU, Med-Surg, Telemetry (three selectable variants shown as a small cluster)
- "Discharge" terminal node reached after the inpatient stay

Connections:
- ED Triage → Admit Decision (edge property: `time_to_decision_minutes`)
- Admit Decision → Discharge Home (only when decision = Discharge)
- Admit Decision → Inpatient Unit (edge property: `boarding_time_hours` — the wait for a bed to open; only when decision = Admit)
- Inpatient Unit → Discharge (edge property: `length_of_stay_days`)

Style: Left-to-right workflow diagram with a decision diamond at "Admit Decision" and rectangular process nodes elsewhere; the three Inpatient Unit sub-types shown as parallel branches so the learner can compare them side by side.

Data Visibility Requirements:
Stage 1: Show the ED Triage node with a visible esi_level value (default 3) and arrival_time.
Stage 2: On click of Admit Decision, show the decision_time and the resulting branch (Admit or Discharge) highlighted.
Stage 3: If Admit, show the boarding_time_hours value on the edge into the chosen Inpatient Unit, color-coded (green under 2 hours, amber 2-4, red over 4) so capacity strain is visible at a glance.
Stage 4: Show the final length_of_stay_days on the edge into Discharge, differentiated by which Inpatient Unit sub-type was selected (ICU stays trend longer than Med-Surg).

Interactive controls:
- Slider: ESI level (1-5) — changes the likelihood and color emphasis of the Admit branch to reflect that lower ESI numbers (more severe) more often lead to admission
- Click on any node: opens an infobox with that node's definition, typical volumes (e.g., "roughly 130 million ED visits occur annually in the U.S., with about 12% resulting in admission"), and typical timeframes
- Toggle: switch the Inpatient Unit branch between ICU, Med-Surg, and Telemetry to compare typical length_of_stay_days and boarding_time_hours for each
- Reset button to return to default ESI level 3

Instructional Rationale: An Analyze-level objective (differentiate, examine) requires the learner to trace a decision path and compare branches, not just recall a definition. A clickable workflow with a color-coded, editable boarding_time_hours property makes capacity strain -- an abstract operations concept -- into something the learner can directly manipulate and observe, which supports the differentiate/examine verbs far better than a static description of "ED vs. inpatient care" ever could.

Color scheme: Blue for ED-side nodes, green for discharge outcomes, orange/red gradient for boarding_time_hours severity, purple for Inpatient Unit sub-types

Implementation: vis-network JavaScript library with a hierarchical left-to-right layout; click handlers open a side infobox rather than a modal so the diagram stays visible while reading
</details>

## Provider Networks and the Referral Relationships That Define Them

Every payer contract, every in-network cost estimate, and every referral
authorization in this book's later payer chapters depends on one structural
concept: the **Provider Network** — the defined set of providers and
facilities that have contracted with a payer (or that a health system has
organized into a coordinated delivery structure) to deliver care under
agreed terms. In the graph, a provider network is most naturally modeled as
its own node — a `Network` node — connected to member `Provider` and
`Facility` nodes by `IN_NETWORK` edges that carry properties like
`effective_date` and `contract_tier`. A provider can belong to more than one
network simultaneously, which is exactly why network membership needs to be
an edge rather than a simple property on the provider: a property can only
hold one value cleanly, while an edge can be repeated once for every network
a provider joins.

Regulators care about provider networks for the same structural reason
graph databases do: network adequacy rules, which require a payer to
demonstrate that its network includes enough in-network PCPs and specialists
within a reasonable driving distance or wait time of every enrolled member,
are fundamentally graph questions. Answering "does every member within this
ZIP code have an in-network cardiologist within 30 miles?" means traversing
outward from each member's location through the `Network` node to every
`IN_NETWORK` cardiologist and checking a distance property on the result —
the same weighted-graph distance calculation introduced in Chapter 1's
discussion of weighted edges, now applied at the scale of an entire
regional network.

Providers connect to each other, not just to networks, through the
**Referral** relationship: an explicit clinical order from one provider
directing a patient to another provider or facility for evaluation or
treatment. A referral is modeled as its own `Referral` node (not merely an
edge) because a referral carries enough independent data — `referral_date`,
`reason_code`, `status` (pending, scheduled, completed, expired), and
`urgency` — that reducing it to a single edge would lose information a
health system genuinely needs to track. That `Referral` node connects to the
referring provider by a `REFERRED_BY` edge, to the specialist by a
`REFERRED_TO` edge, and to the patient by a `FOR_PATIENT` edge.

Referral data reveals something a network membership list alone cannot:
whether referrals are actually staying inside the network they are supposed
to. When a PCP refers a patient to a specialist who is *not* part of the
same contracted network, that referral is called **leakage** — care (and its
revenue) leaking out to an out-of-network provider, which typically means
higher costs for the patient and lost revenue for the network's
value-based contracts. Suppose Dr. Okafor sends out 120 referrals in a
quarter: a graph query that follows every `REFERRED_BY` edge from her
`Provider` node to the resulting `Referral` nodes, then checks whether the
`REFERRED_TO` specialist shares an `IN_NETWORK` edge to the same `Network`
node Dr. Okafor belongs to, might find that only 96 of those 120 land on an
in-network specialist. That is a 20% leakage rate for one PCP alone — a
number a network manager can compute for every PCP in the network with the
same traversal pattern, then rank to find which referral relationships are
costing the network the most.

Sometimes an explicit `Referral` node does not exist
in the source data at all — a patient simply shows up at a specialist's
office with no referral order on file, but their claims or encounter records
show the same PCP and specialist treating the same patient within a short
window. Inferring an implicit referral relationship from that co-occurrence
pattern, in the absence of an explicit referral order, is called **Referral
Inference**, and it matters because payers and health systems that only
count explicit referrals routinely undercount true referral volume and
therefore underestimate leakage. A typical inference rule flags a candidate
referral whenever the same patient sees both providers within a 30- to
60-day window and the specialist visit's diagnosis code plausibly follows
from the PCP visit's diagnosis — a heuristic, not a certainty, which is why
inferred referrals are usually stored with a `confidence_score` property
and a `source: "inferred"` tag so downstream queries can distinguish them
from explicit, physician-ordered referrals.

!!! mascot-warning "Don't Let Leakage Hide in the Gaps"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    If your graph only stores explicit Referral nodes, you'll miss every patient who self-referred or whose referral order was never entered into the system -- and that's exactly where leakage tends to hide. Referral Inference closes that gap, but it's a real tentacle-y problem: infer too aggressively and you'll manufacture referrals that never happened.

The MicroSim below renders a bipartite referral network — PCPs on the left,
specialists on the right — sized by referral volume, with out-of-network
specialists and their leaking edges drawn in red so the leakage pattern is
visible at a glance rather than buried in a spreadsheet.

#### Diagram: Provider Referral Network Analysis MicroSim

<iframe src="../../sims/provider-referral-network-analysis-microsim/main.html" width="100%" height="618px" scrolling="no"></iframe>

<details markdown="1">
<summary>Provider Referral Network Analysis MicroSim (reused)</summary>
Type: microsim
**sim-id:** provider-referral-network-analysis-microsim<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/provider-referral-network-analysis-microsim

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, distinguish<br/>
Learning objective: Given a bipartite referral network, the learner can distinguish in-network from out-of-network (leaking) referral relationships and examine how a minimum-volume filter changes the visible leakage pattern.

Reused from the MicroSim catalog. PCPs are drawn on the left, sized by total referrals sent; specialists are drawn on the right, sized by total referrals received. Out-of-network specialists are colored red, and every edge leading to one is highlighted as "leakage." A slider filters the displayed edges by minimum referral volume, letting the learner strip away noise and focus on high-volume referral relationships. An analytics panel reports the overall leakage percentage, the top referrer, and the busiest specialist, updating live as the filter changes. Clicking any PCP or specialist node highlights only that node's referral edges and opens a small detail panel with its referral counts.

Interactive controls:
- Slider: minimum referral volume filter
- Click node: isolate and highlight that provider's referral edges
- Live analytics panel: leakage %, top referrer, busiest specialist

Implementation: p5.js
</details>

## Credentialing: The Data That Establishes a Provider's Standing

Before a provider can join a network or accept a referral, a health system
must verify that the provider is legally and professionally qualified to
practice — a process called credentialing. Three concepts make up the
credentialing data every `Provider` node needs behind it, and all three
share the same graph pattern: a `Provider` node connected by a `HOLDS` edge
to a credential-type node, with `issue_date` and `expiration_date` properties
on the edge itself (not on the credential node), because the same physical
license or certificate is issued once but its validity window is what a
graph query actually needs to check at query time.

A **Provider Credential** is the general category for any formal
qualification a provider holds — license, certification, or specialty
training documentation — while a **Medical License** is the specific,
state-issued legal authorization to practice medicine, and a **Board
Certification** is a voluntary, specialty-specific credential awarded by a
medical specialty board (such as the American Board of Internal Medicine)
attesting to advanced competency beyond the minimum required to hold a
license. The table below summarizes how each is modeled and renewed.

| Credential Type | Issuing Body | What It Verifies | Typical Renewal Cycle | Graph Relationship |
|---|---|---|---|---|
| Medical License | State medical board | Legal authorization to practice medicine in that state | 1-2 years | `Provider -[:HOLDS {issue_date, expiration_date}]-> MedicalLicense` |
| Board Certification | Specialty board (e.g., ABIM, ABS) | Advanced competency in a specific specialty beyond licensure | 6-10 years (varies by board) | `Provider -[:HOLDS {issue_date, expiration_date}]-> BoardCertification` |
| Provider Credential (general) | Hospital credentialing committee, payer, or accrediting body | Overall eligibility to practice at a facility or join a network | Typically re-verified every 2-3 years | `Provider -[:HOLDS {issue_date, expiration_date}]-> ProviderCredential` |

Modeling `expiration_date` as an edge property rather than burying it inside
a `status` string is what lets a graph query answer "which providers in this
network have a license expiring in the next 30 days?" with a single
traversal filtered on that property — a query that a credentialing team
would otherwise have to run manually against a spreadsheet.

Dr. Okafor's own credentialing record illustrates why all three rows matter
together, not just individually. Her `Provider` node holds a `HOLDS` edge to
a Medical License issued by the state board with `expiration_date:
"2027-03-01"`, a second `HOLDS` edge to a Board Certification in Internal
Medicine expiring in 2031, and a third `HOLDS` edge to a general Provider
Credential issued by Riverside Regional's own credentialing committee,
re-verified every two years. If any one of those three edges lapses — say,
her state license expires while renewal paperwork is still pending — a
health system's compliance query needs to catch it before she sees another
patient, because practicing on an expired license exposes both the provider
and the organization to malpractice and licensure risk. That single
`Provider -[:HOLDS]-> Credential` pattern, repeated once per credential
type, is also what makes it trivial to add a fourth or fifth credential type
later (a DEA registration, a state-specific telehealth license) without
touching the schema for the other three — a flexibility the next chapter's
workforce-management concepts depend on directly.

## Measuring Provider Quality: Provider Rating and Specialization

Network membership and clean credentials establish that a provider is
*eligible* to practice — they say nothing about how well that provider
actually performs. **Provider Rating** captures measured or reported
performance across dimensions such as patient satisfaction, clinical
quality outcomes, and cost efficiency, typically modeled as a `Rating` node
or a set of properties on the `Provider` node itself (`satisfaction_score`,
`quality_score`, `cost_efficiency_score`), each tied to a `measurement_period`
so that ratings can be tracked and compared over time rather than treated as
a single permanent number. Ratings are most useful when read alongside a
provider's declared **Provider Specialization** — the specific clinical
domain or sub-domain a provider focuses on (general cardiology versus
interventional cardiology, for example) — because a raw quality score means
little without knowing which patient population and procedure mix produced
it; comparing a primary care panel's cost efficiency directly against a
transplant surgeon's would be misleading without that context.

Return once more to Dr. Okafor: suppose her `Rating` node for the most
recent `measurement_period` shows `satisfaction_score: 4.6` (out of 5),
`quality_score: 82` (a composite of preventive-screening and chronic-disease
control measures), and `cost_efficiency_score: 91` (relative to a
risk-adjusted peer benchmark, where higher means lower unnecessary spend).
Read in isolation, an 82 on quality might look mediocre next to a
specialist colleague's 95 — until her `Provider Specialization` property
shows she carries an unusually complex panel of patients with multiple
chronic conditions, a population where a quality score in the 80s is
actually a strong result. This is precisely why a graph model keeps rating
and specialization as separate but directly connected pieces of data: a
query can filter or benchmark providers within the same specialization
before ever comparing their raw scores, avoiding exactly the apples-to-oranges
comparison a flat leaderboard would invite.

!!! mascot-encourage "Three Numbers, One Provider"
    ![Sage cheering encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Don't worry if juggling three different quality metrics at once feels like a lot -- that's exactly why the next diagram plots them on a single quadrant chart instead of three separate tables. Every relationship matters, and so does every metric.

The quadrant scatter plot below plots PCPs by two selectable metrics at a
time (satisfaction, clinical quality, cost efficiency), sizing each point by
patient panel size and coloring it green, amber, or red by quadrant, so a
network manager can spot which providers combine strong quality with strong
efficiency — and which combine neither.

#### Diagram: Provider Performance Comparison MicroSim

<iframe src="../../sims/provider-performance-comparison-microsim/main.html" width="100%" height="593px" scrolling="no"></iframe>

<details markdown="1">
<summary>Provider Performance Comparison MicroSim (reused)</summary>
Type: microsim
**sim-id:** provider-performance-comparison-microsim<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/provider-performance-comparison-microsim

Bloom Taxonomy: Evaluate<br/>
Bloom Taxonomy Verb: assess, justify<br/>
Learning objective: Given a quadrant scatter plot of provider performance, the learner can assess which providers combine high clinical quality with high cost efficiency and justify a recommendation using panel size as supporting evidence.

Reused from the MicroSim catalog. PCPs are plotted on a quadrant scatter chart using two selectable metrics at a time (satisfaction, clinical quality, cost efficiency) from dropdown axis selectors. Each point is sized by patient panel size and colored by quadrant (green = high/high, red = low/low, amber = mixed). Clicking a point locks open a detail panel showing that provider's full rating profile, specialization, and panel size; clicking elsewhere unlocks it.

Interactive controls:
- Dropdown x2: choose which metric drives each axis
- Click-to-lock detail panel per provider
- Quadrant color legend

Implementation: p5.js
</details>

## Turning Capacity into Appointments: Schedule, Capacity, and the Appointment Itself

The final piece connects a provider's availability to an actual patient
visit. A **Provider Schedule** is the calendar structure defining the time
blocks a provider has made available for patient visits — modeled as a
`Schedule` node (or a series of `Slot` nodes) connected to the `Provider` by
a `HAS_SCHEDULE` edge, each slot carrying a `start_time`, `duration`, and
`status` (open, booked, blocked). An **Appointment** is what happens when a
specific slot is claimed: a booked visit modeled as an `Appointment` node
connecting a `Patient`, a `Provider`, and a specific time via `SCHEDULED_FOR`
and `WITH_PROVIDER` edges, carrying properties like `appointment_type` and
`status` (scheduled, completed, no-show, cancelled).

Both concepts only matter operationally in the context of a ceiling: a
provider's **Provider Capacity** is the maximum patient volume that
provider's schedule can absorb in a given period, given slot length, hours
worked, and no-show rates. When scheduled appointments consistently run
close to that ceiling, a network faces exactly the access problem that
shows up as long new-patient wait times — the same signal payers use to
evaluate whether a network's provider directory is meaningfully adequate or
just a list of names.

Put numbers on the stack to see how the three concepts constrain each other.
Suppose a cardiologist's Provider Schedule offers eight clinic hours a day
in 30-minute slots, four days a week — 128 slots per week of theoretical
Provider Capacity. Historical no-show data trims that to roughly 115
realistically fillable slots once average no-show rates are applied. If the
Appointment nodes booked against that schedule already fill 113 of those
115 slots, the resulting utilization rate — booked slots divided by
realistic capacity — is about 98%, which is exactly the Cardiology figure
the chart below displays. A network running at 98% utilization has almost
no slack to absorb same-week urgent requests, which is precisely why new
patients calling that cardiologist's office are quoted a 23-day wait: every
slot for the next several weeks is already spoken for before the request
even arrives.

The combo chart below makes that ceiling concrete: bars show appointment
capacity, scheduled, and completed counts by specialty, while a line tracks
utilization rate against an 85% target — the threshold above which most
networks start seeing real access strain, illustrated here by Cardiology
running at 98% utilization alongside a 23-day new-patient wait.

#### Diagram: Provider Capacity Utilization Dashboard Chart

<iframe src="../../sims/provider-capacity-utilization-dashboard-chart/main.html" width="100%" height="508px" scrolling="no"></iframe>

<details markdown="1">
<summary>Provider Capacity Utilization Dashboard Chart (reused)</summary>
Type: chart
**sim-id:** provider-capacity-utilization-dashboard-chart<br/>
**Library:** Chart.js<br/>
**Status:** Reused<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/provider-capacity-utilization-dashboard-chart

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: calculate, demonstrate<br/>
Learning objective: Given capacity, scheduled, and completed appointment counts by specialty, the learner can calculate utilization rate and demonstrate how it relates to new-patient wait time.

Reused from the MicroSim catalog. A combo chart shows appointment capacity, scheduled count, and completed count as grouped bars per specialty, with a utilization-rate line overlaid against a fixed 85% target line. Cardiology is shown at 98% utilization with a 23-day new-patient wait annotation, illustrating the access-strain scenario described in the surrounding text. Hovering any bar or line point reveals the exact counts and computed utilization percentage in a tooltip.

Interactive controls:
- Hover: tooltip with exact values per specialty
- Toggle legend items to show/hide capacity, scheduled, completed, or the utilization line
- Specialty filter dropdown

Implementation: Chart.js
</details>

Together, Provider Schedule, Appointment, and Provider Capacity form a
three-layer stack: the schedule defines what is theoretically possible, the
appointment records what actually gets booked, and capacity is the ceiling
that tells a network manager whether the first two numbers are converging on
a problem.

## Why This Matters Beyond the Classroom

!!! mascot-thinking "A Real-World Superpower"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Here's the honest pitch: closing referral leakage and rightsizing provider networks -- exactly what you just modeled -- are the kind of graph-native analytics that make value-based care contracts actually work. U.S. healthcare is slowly shifting from paying for volume (fee-for-service) to paying for outcomes at a lower total cost (value-based care), and a network that can trace every referral, every credential, and every capacity number as a connected graph has a real edge in making that shift pay off. This is graph modeling with a genuine shot at bending the cost curve.

The concepts in this chapter are not independent trivia; they compose. A
`Referral` node connects a `Provider` to another `Provider` through a
`Network`, and whether that referral counts as leakage depends on both
providers' `IN_NETWORK` edges. A `Provider`'s capacity to accept that
referral depends on their `Schedule`, and whether they *should* accept it
depends on their `Rating` and `Specialization`. None of these questions can
be answered by looking at a single table or a single node — every one of
them requires walking a chain of relationships, which is precisely the
capability a labeled property graph was built to provide.

Put the whole chapter's worth of concepts into a single traversal and the
payoff becomes obvious: starting from a `Network` node, follow `IN_NETWORK`
to every member `Provider`, filter to those whose `HOLDS` edges show no
expired credentials, follow their outgoing `REFERRED_BY` edges to find which
referrals leaked to an out-of-network `Specialist Provider`, then cross
that leaking specialist's `Rating` and open `Schedule` capacity against the
in-network alternatives who could have absorbed the same referral. That is
one connected question, answerable in one traversal, and it is exactly the
kind of question a health system's network-adequacy and network-optimization
teams ask every single quarter.

!!! mascot-celebration "The Provider Graph Is Built"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Take a bow -- you've just modeled Primary Care and Specialist Providers, the full care-setting hierarchy from Clinic to Hospital Department, the Emergency Department-to-Inpatient Care pathway, Provider Networks and Referrals (including inferred ones), the credentialing cluster, Provider Rating and Capacity, Schedules, Appointments, and Care Teams. That's the entire provider side of the graph!

With providers, networks, and schedules now fully modeled, [Chapter
13](../13-clinical-guidelines-care-pathways-workforce/index.md) turns to how
those providers coordinate as teams and follow evidence-based guidelines and
care pathways — along with the workforce realities of credentialing
pipelines, staffing models, and provider attrition that keep a provider
network actually staffed.

[See Annotated References](./references.md)
