---
title: Patient Diagnosis, Treatment, and Medication
description: Models the clinical core of a patient encounter as a graph -- symptoms, diagnoses, treatment plans, prescriptions, and medication-safety relationships.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:10:10
version: 1.10
---

# Patient Diagnosis, Treatment, and Medication

## Summary

This chapter begins the patient-centric perspective with the clinical concepts at the heart of an encounter: symptoms, diagnosis, differential diagnosis, and treatment planning. It covers prescriptions, medication dosing, drug interactions, adverse events, allergies, and immunization schedules. These concepts form the core patient-record node types used to build the patient-centric graph model.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Patient Record | 156 |
| Patient ID | 2 |
| Patient History | 1 |
| Disease | 2 |
| Medical Condition | 1 |
| Symptom | 46 |
| Diagnosis | 2 |
| Differential Diagnosis | 1 |
| Treatment Plan | 2 |
| Prescription | 1 |
| Medication | 41 |
| Dosage | 2 |
| Drug Interaction | 1 |
| Adverse Event | 2 |
| Allergy | 1 |
| Immunization | 36 |
| Vaccination Schedule | 2 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 7: Healthcare Economics and Medical Coding Systems](../07-healthcare-economics-medical-coding/index.md)
- [Chapter 8: Healthcare Interoperability and Care Coordination](../08-healthcare-interoperability-care-coordination/index.md)

---

Chapters 7 and 8 modeled how care is coded, billed, and exchanged across
systems. This chapter turns inward, toward the clinical substance of a
single encounter: what is wrong with the patient, what a clinician decides
to do about it, and what medication or immunization follows from that
decision. Every concept below becomes a small cluster of nodes and edges
hanging off a single `Patient` node — the exact cluster a graph query
returns when a clinician or an AI system asks for "this patient's record."

!!! mascot-welcome "Where the Patient's Story Lives"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This chapter is where a patient's clinical story finally gets modeled in full: symptoms, diagnoses, treatment plans, medications, and immunizations, all wired together as a graph. Let's connect the dots!

## The Patient Record as a Connected Subgraph

Every healthcare graph in this book radiates outward from one anchor: the
`Patient` node. In a relational system, a **patient record** is scattered
across a dozen tables — demographics in one, diagnoses in another,
medications in a third — reassembled only when a report runs. In a labeled
property graph, the patient record is not a join result at all; it is the
literal set of nodes and edges reachable by walking outward a few hops from
a single `Patient` node. Ask "what is this patient's record?" and a graph
database answers by traversing, not reconstructing.

That anchor node needs a way to be found again across every system that
touches it. A **Patient ID** is the unique identifier — commonly a medical
record number (MRN) — stored as a property on the `Patient` node (for
example, `patient_id: "MRN-77291"`) that lets every other part of the system
reference the same person unambiguously across encounters, providers, and
even payer systems. Chapter 8's discussion of matching patients across
interoperable systems depended on exactly this property existing and being
trustworthy.

Identity resolution becomes a real engineering problem the moment two
systems disagree about who a patient is. If Riverside Clinic assigns Sarah
Johnson `patient_id: "MRN-77291"` while a hospital across town independently
assigns her `MRN-40218` after an emergency visit, naively merging the two
systems' graphs would create two separate `Patient` nodes for one real
person. Healthcare organizations solve this with a master patient index: a
matching service that links both identifiers to a single canonical node,
typically by adding a `SAME_AS` edge between the two records once matching
demographic fields — name, date of birth, and often a stronger identifier
such as a Social Security number — are confirmed. Every downstream query
that walks from `Patient` to diagnoses, medications, or encounters is only
as correct as this identity-resolution step.

Everything a patient has ever had done to them, or been found to have,
accumulates as **patient history**: the growing set of past encounters,
diagnoses, procedures, and medications connected to that `Patient` node over
time. History is not a separate table of archived events copied out of the
active record — it is simply every node still connected by an edge whose
timestamp property lies in the past. A five-year-old diagnosis and a
five-minute-old vital sign live in the same graph, distinguished only by the
dates on their edges, not by which table happens to store them. Three ideas
anchor everything a patient-centric graph does with this node:

- The **Patient Record** is the connected subgraph reachable from a `Patient` node, not a stored table
- The **Patient ID** is the property that lets that node be found again, consistently, across systems
- **Patient History** is simply the subset of that subgraph whose edges carry a past timestamp

That traversal-based definition of a record is not just a metaphor; it is
executable. A Cypher-style query such as `MATCH (p:Patient {patient_id:
"MRN-77291"})-[:HAS_DIAGNOSIS|TAKES|SEEN_BY|HAD_ENCOUNTER]-(n) RETURN p, n`
returns exactly the nodes and edges that make up Sarah Johnson's record — no
separate record table needed, and no risk of a report-writer forgetting to
join in a category of data the query should have included.

That same traversal pattern extends naturally to time. Asking "what did
this patient's record look like as of March 1?" is simply the same
traversal restricted to edges whose timestamp property falls on or before
that date. Patient history, in other words, is not a separate audit log
that needs reconstructing after the fact — it is the ordinary graph,
queried with a temporal filter on the walk instead of an unrestricted one,
which is precisely the property a later chapter relies on to reconstruct a
chronic-disease timeline without maintaining two parallel copies of the
same facts.

Consider a single patient, Sarah Johnson, whose clinical-context subgraph
the diagram below renders directly: her diagnoses, the medications she takes
for them, the providers who see her, and her recent encounters, all one or
two hops from her `Patient` node.

#### Diagram: Patient Clinical Context Subgraph Visualization

<iframe src="../../sims/patient-clinical-context-subgraph-visualization/main.html" width="100%" height="488px" scrolling="no"></iframe>

<details markdown="1">
<summary>Patient Clinical Context Subgraph Visualization (reused)</summary>
Type: graph-model
**sim-id:** patient-clinical-context-subgraph-visualization<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/patient-clinical-context-subgraph-visualization/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/patient-clinical-context-subgraph-visualization

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: identify, classify<br/>
Learning objective: Given the clinical-context subgraph around a single patient, the learner can identify which edge types (HAS_DIAGNOSIS, TAKES, TREATS, SEEN_BY, HAD_ENCOUNTER) connect the Patient node to each category of surrounding node and explain why that connected neighborhood, not a separate record table, constitutes "the patient record."

Purpose: Show that the patient record is a query result over a connected subgraph, not a row in a table, using patient Sarah Johnson as the running example.

Node types shown (color-coded, radiating from the central Patient node):
- Patient (center) — Sarah Johnson
- Diagnosis nodes (red) — e.g., Type 2 Diabetes, Hypertension, Hyperlipidemia
- Medication nodes (green) — e.g., Metformin, Lisinopril, Atorvastatin
- Provider nodes (purple) — clinicians who see Sarah
- Encounter nodes (orange) — recent visits

Edge types shown:
- HAS_DIAGNOSIS (Patient to Diagnosis)
- TAKES (Patient to Medication)
- TREATS (dashed, Medication back to the Diagnosis it addresses, e.g., Metformin to Diabetes)
- SEEN_BY (Patient to Provider)
- HAD_ENCOUNTER (Patient to Encounter)

Interactive controls:
- Drag any node to reposition it and observe the force-directed layout re-settle
- Hover a node to see its label and properties in a tooltip
- Click a node to highlight only its directly connected edges and dim the rest
- Navigation buttons to zoom, pan, and re-fit the graph

Instructional Rationale: An Understand-level objective (identify, classify) is best served by letting the learner trace real labeled edges outward from one familiar anchor rather than reading a description of the record; clicking to isolate a node's neighborhood makes the "record equals subgraph" claim something the learner discovers rather than something they are told.
</details>

!!! mascot-thinking "The Record Is the Query"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice there is no "patient record" node anywhere in that diagram — the record is just the neighborhood a query returns. Every relationship matters here: change which edges you traverse, and you change what counts as "the record."

## Symptoms, Disease, and the Diagnostic Web

A diagnosis rarely starts with certainty; it starts with a **symptom** — a
specific, patient-reported or clinically observed indicator, such as "chest
pain" or "shortness of breath," modeled as its own node connected to the
patient by a `REPORTS` edge carrying properties like `onset_date` and
`severity`. A single symptom node can connect to many patients (chest pain
is common) and, more importantly, to many possible **diseases** — named,
classifiable pathological processes such as myocardial infarction or
pneumonia — through edges the diagnostic graph uses to reason backward from
what is observed to what might be causing it.

A concrete instance makes this modeling choice clear. Patient Robert Klein
reports two symptom instances during a single visit: chest pain with
`severity: "7/10"` and `onset_date: "2026-09-05"`, and dyspnea (shortness of
breath) with `severity: "5/10"` and the same onset date. Each instance is
its own node connected to Robert Klein by a `REPORTS` edge, even though both
instances also connect to shared, reusable symptom-type nodes. That
separation lets the graph distinguish "how badly did this specific patient
describe this symptom, today" from "what does chest pain, as a general
concept, tend to indicate" — the first fact belongs on the edge, the second
belongs on the type node it points to. Symptoms also rarely arrive alone:
when a set of symptom nodes recurs together often enough to be named as a
unit, it can be modeled as its own syndrome node linking to the individual
symptoms it groups, giving the diagnostic graph a coarser-grained pattern to
match against candidate diseases in addition to the individual symptom
edges.

A **disease** and the everyday clinical term **medical condition** overlap but
are not identical. Disease usually refers to the classified pathology
itself, carrying a standard code from the ICD-10 systems introduced in
Chapter 7, while medical condition is the broader, sometimes less formally
coded state of health a patient is documented as having. The distinction
matters when a graph needs to link a precisely coded billing diagnosis to a
looser clinical note describing the same underlying reality.

This coded-versus-uncoded distinction has real downstream consequences. A
disease node tagged `icd10_code: "I21.9"` (acute myocardial infarction) can
be aggregated, billed, and reported through the standardized coding
infrastructure Chapter 7 introduced, while a medical condition node
describing "possible early heart strain, per cardiologist's note" may never
receive a billing code at all, yet still needs to remain visible to any
clinician reviewing the graph. Keeping both node types available, and
letting an edge connect one to the other once a coded diagnosis is later
confirmed, avoids forcing every clinical observation into a billing code
before it is ready for one. Neither node type, on its own, points reliably
to a cause: no single symptom identifies one disease with certainty, and it
is the pattern of several symptom edges converging on the same candidate
that narrows things down, which is exactly what the diagram below lets you
explore.

#### Diagram: Symptom-Disease Diagnostic Network

<iframe src="../../sims/symptom-disease-diagnostic-network/main.html" width="100%" height="488px" scrolling="no"></iframe>

<details markdown="1">
<summary>Symptom-Disease Diagnostic Network (reused)</summary>
Type: graph-model
**sim-id:** symptom-disease-diagnostic-network<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/symptom-disease-diagnostic-network/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/symptom-disease-diagnostic-network

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, distinguish<br/>
Learning objective: Given a many-to-many network of reported symptom instances, symptom types, and candidate diseases with probability-labeled edges, the learner can examine which combination of symptom edges converges most strongly on a single disease and distinguish that pattern from any single symptom's weaker, non-specific connections.

Purpose: Demonstrate that a pattern of symptom edges, not any single symptom, narrows a diagnosis, using chest pain, dyspnea, and fatigue converging on myocardial infarction (MI) as the running example.

Node types shown:
- Patient instance nodes (e.g., "Patient A")
- Reported symptom instance nodes, each with severity and duration properties
- General symptom type nodes (e.g., Chest Pain, Dyspnea, Fatigue)
- Candidate disease nodes (e.g., Myocardial Infarction, Pneumonia, Anxiety)

Edge types shown:
- Patient to symptom instance (REPORTS)
- Symptom instance to symptom type (INSTANCE_OF)
- Symptom type to candidate disease, labeled with a probability value (SUGGESTS, e.g., 0.6)

Data Visibility Requirements:
Stage 1: Show Patient A connected to three reported symptom instances.
Stage 2: Show each instance linked to its general symptom type.
Stage 3: Show each symptom type fanning out to multiple candidate diseases with a probability label on each edge.
Stage 4: On click of a disease node, highlight every incoming symptom edge that supports it and sum the labeled probabilities in a side panel.

Interactive controls:
- Click a disease node to highlight and total its supporting symptom edges
- Hover any edge to see its probability label and definition
- Drag nodes and use navigation buttons to reorganize the view

Instructional Rationale: The Analyze-level objective (examine, distinguish) requires learners to compare the strength of converging evidence against isolated evidence, which a static list cannot show; letting the learner click a disease and see its supporting edges sum in real time makes the "pattern beats single symptom" claim measurable rather than asserted.
</details>

!!! mascot-tip "Look for the Pattern, Not the Symptom"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's the shortcut: never trust one edge. A pattern of several symptom edges converging on the same disease node is far more diagnostic than any single connection, which is exactly the convergence the diagram above lets you click through.

## From Differential to Diagnosis: Ranking Candidate Explanations

Once a clinician commits to an explanation for a patient's symptoms, that
conclusion is recorded as a **diagnosis** — typically a `HAS_DIAGNOSIS` edge
from the `Patient` node to a `Condition` or `Disease` node, carrying a
`diagnosis_date` and often a status property such as `provisional`,
`confirmed`, or `ruled_out`. A diagnosis is rarely the very first thing
written down, though. Before committing, a clinician typically maintains a
**differential diagnosis**: an explicitly ranked list of candidate
diagnoses, ordered from most to least likely given the current evidence,
each one still open to being promoted, demoted, or eliminated as new
findings arrive.

A differential diagnosis is best understood not as a static list but as a
live probability calculation. Each candidate condition starts with a
**prior probability** set by clinical context — a 65-year-old with chest
pain starts with a higher prior for myocardial infarction than a 20-year-old
with the same complaint. Each new piece of evidence, such as a lab result or
a risk factor, multiplies that prior by a **likelihood ratio**, and the
results are renormalized into a posterior probability:

\[ P(\text{condition} \mid \text{evidence}) \propto P(\text{condition}) \times \text{LR}(\text{evidence}) \]

Plugging in numbers makes the abstraction concrete. Suppose a 68-year-old
patient's prior probability of myocardial infarction, given age and
presentation, is estimated at 0.15. A troponin lab result comes back
elevated, and elevated troponin carries a likelihood ratio of roughly 8 for
myocardial infarction. The unnormalized score becomes \( 0.15 \times 8 =
1.2 \), which, after renormalizing against the unnormalized scores of the
other four candidate conditions, might resolve to a posterior of 0.72 —
enough to promote myocardial infarction from a mid-ranked entry on the
differential to the leading candidate, without yet being confirmed as the
final diagnosis.

The graph distinguishes these two moments explicitly. While a differential
diagnosis is still open, each candidate is typically modeled as a
`CONSIDERING` edge from `Patient` to a `Condition` node, carrying a `rank`
or `posterior_probability` property that is expected to change as evidence
accumulates. Once a clinician commits, a stable `HAS_DIAGNOSIS` edge is
added, and the earlier candidate edges are usually retained rather than
deleted, so the graph preserves a record of what was considered and ruled
out along the way. The MicroSim below makes this concrete: toggle a piece
of evidence on or off, and watch five candidate conditions re-rank
themselves as their posterior probabilities update in real time.

#### Diagram: Bayesian Diagnostic Reasoning MicroSim

<iframe src="../../sims/bayesian-diagnostic-reasoning/main.html" width="100%" height="618px" scrolling="no"></iframe>

<details markdown="1">
<summary>Bayesian Diagnostic Reasoning MicroSim (reused)</summary>
Type: microsim
**sim-id:** bayesian-diagnostic-reasoning<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/bayesian-diagnostic-reasoning/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/bayesian-diagnostic-reasoning

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: calculate, demonstrate<br/>
Learning objective: Apply Bayesian updating to a five-condition differential diagnosis by toggling evidence items and calculating how each item's likelihood ratio shifts prior probabilities into a re-ranked posterior distribution.

Purpose: Show a differential diagnosis as a ranked, evidence-updated probability distribution rather than a single lookup, reusing the existing five-condition Bayesian reasoning MicroSim.

Reused from the MicroSim catalog. Five candidate conditions (for example meningitis and brain tumor among them) start at prior probabilities set by a selected clinical context (low-risk clinic, emergency department, specialty referral). Checking an evidence item such as fever, stiff neck, or photophobia multiplies each condition's running probability by that item's likelihood ratio; the bars re-sort live as posteriors are renormalized, and a panel reports the likelihood ratios behind the most recent update. A Reset Evidence control returns all conditions to their prior probabilities.

Data Visibility Requirements:
Stage 1: Show five conditions as horizontal bars at their prior probabilities for the selected clinical context.
Stage 2: On checking an evidence item, show the likelihood ratio applied to each condition in the side panel.
Stage 3: Show the renormalized posterior probabilities and the bars re-sorting by new rank.
Stage 4: Allow toggling multiple evidence items to compound updates, and unchecking to reverse them.

Instructional Rationale: An Apply-level objective (calculate, demonstrate) is served by a parameter-exploration pattern rather than passive animation — the learner must choose evidence and observe the calculated consequence, which is precisely how a differential diagnosis is used in practice: as a working hypothesis updated by each new data point, not a single lookup performed once.
</details>

## Treatment Plans, Prescriptions, and Medication Safety

A confirmed diagnosis leads to action. A **treatment plan** is the
higher-level, often multi-step plan of care a clinician builds in response
to one or more diagnoses. It might bundle physical therapy, dietary
changes, follow-up visits, and one or more medications into a single
coordinated structure whose `TREATS` relationship points back at the
condition it addresses. A single treatment plan often coordinates orders
across multiple specialties at once — an anticoagulation plan might pair a
cardiology prescription with a referral to a dietitian, since dietary
vitamin K interacts directly with how the anticoagulant works, tying the
drug side of the plan to a non-drug intervention within the same
coordinated structure. A **prescription** is the specific, actionable order
within that plan: a relationship from `Patient` to a `Medication` node,
authorizing a named drug, written by a specific provider, on a specific
date, and belonging to the broader treatment plan that justified it.

Every prescription carries a **dosage** — the amount, frequency, and route
of administration, for example `500 mg, twice daily, oral` — stored as
properties on the prescribing edge rather than on the medication node
itself, since the same medication can be prescribed at very different doses
to different patients. Dosage is also rarely fixed for the life of a
prescription: an anticoagulant like Warfarin requires periodic
recalibration based on blood-clotting lab results, so a prescribing edge
often carries a dosage history rather than one static value — `5 mg once
daily` starting on one date, revised to `7.5 mg once daily` weeks later
after a lab result showed under-treatment. Modeling dosage as a property on
the edge, rather than as a fixed attribute of the medication, is what makes
this kind of longitudinal titration representable at all; the medication
node itself never changes, only the edge connecting it to a specific
patient at a specific time.

A **medication** itself is the drug being prescribed, modeled as its own
reusable node (`Warfarin`, `Aspirin`) so that its properties — generic name,
drug class, standard interaction profile — are defined once and referenced
by every patient who takes it, rather than duplicated inside each
individual prescription. Medications also commonly belong to broader drug
classes: Ibuprofen and Aspirin are both classified as nonsteroidal
anti-inflammatory drugs (NSAIDs), for instance, and representing that class
as its own node, connected to individual medications by an `IS_A` edge,
lets a safety check reason about an entire category at once. A
contraindication written once against "NSAIDs" for a patient with kidney
disease then automatically covers every NSAID in the graph, without a
separate contraindication edge needed for each one.

Every new encounter is also a chance to reconcile this cluster of edges
against reality: comparing the medications a patient reports actually
taking with the prescriptions already on file in the graph catches both
undocumented over-the-counter additions and prescriptions a patient has
quietly stopped filling, closing the gap between the plan a clinician wrote
and the regimen a patient is actually following. These four pieces click
together into a single chain running from a diagnosis to a specific drug:

- A **treatment plan** sets the overall response to a diagnosis, drug and non-drug interventions alike
- A **prescription** is one authorized order within that plan, connecting a patient to a medication
- A **dosage** captures how much, how often, and how that amount changes over time
- A **medication** is the reusable drug node that the prescription and dosage both refer to

A worked example threads all of these pieces together. Diane Okafor is
diagnosed with atrial fibrillation, and her cardiologist builds a treatment
plan that includes anticoagulation therapy: a prescription for Warfarin,
dosed at `5 mg once daily, oral`, connected back to the atrial fibrillation
diagnosis through a `TREATS` edge. Months later, Diane develops joint pain
and begins taking over-the-counter Ibuprofen, then adds low-dose Aspirin at
a friend's suggestion for heart health. Neither purchase passes through her
cardiologist, so neither becomes a formal prescription edge, but if her
pharmacy or a connected health app still records over-the-counter
medications as `TAKES` edges, the graph has everything it needs to detect
the danger forming.

Two medication nodes can carry a documented **drug interaction** between
them: a direct edge asserting that taking both together changes how one or
both behave in the body, frequently by raising the risk of harm. Warfarin,
Aspirin, and Ibuprofen each carry an `INTERACTS_WITH` edge to the other two,
recording the shared mechanism — all three affect blood clotting through
different pathways — and a `severity: "high"` rating. A traversal starting
at Diane's `Patient` node, following her three `TAKES` edges out to their
medication nodes, and checking for `INTERACTS_WITH` edges among that
specific set of three, is exactly how an automated medication-safety check
works, and exactly what the diagram below lets you trigger by clicking a
single medication. When a drug interaction, an incorrect dosage, or an
unanticipated reaction actually harms a patient, it is recorded as an
**adverse event** — a distinct node capturing what happened, its severity,
and the date it occurred. If Diane's combination goes undetected and she
develops a gastrointestinal bleed, that outcome becomes an adverse event
node dated to the bleed, connected to all three medications by a
`CONTRIBUTED_TO` edge, with a severity property distinguishing a minor
bruise from a hospitalization.

A patient's own known intolerance to a substance is modeled separately as
an **allergy**: an edge from `Patient` directly to the offending substance
or drug class, meant to be checked *before* a prescription is ever written,
not after an adverse event has already occurred. Suppose Diane also carries
a documented `ALLERGIC_TO` edge to penicillin, with a
`reaction_severity: "anaphylaxis"` property recorded from a childhood
hospitalization. If a different provider, unaware of her full history,
attempts to prescribe amoxicillin (a penicillin-class antibiotic) for an
unrelated infection, a graph query checking the drug's class against her
allergy edges — rather than relying on the provider to remember or re-ask —
can block the prescription before it is signed. This is the same
architectural principle as drug-interaction checking: push the safety check
to the moment a new edge is about to be created, using edges that already
exist, rather than trusting memory or a downstream review to catch the
problem.

The diagram below assembles all of these relationships around one patient's
active medication list: drug pairs that interact, medications that are
contraindicated against an existing condition, and medications correctly
indicated for a condition they treat.

#### Diagram: Medication Safety Network Interactive Infographic

<iframe src="../../sims/medication-safety-network-infographic/main.html" width="100%" height="638px" scrolling="no"></iframe>

<details markdown="1">
<summary>Medication Safety Network Interactive Infographic (reused)</summary>
Type: infographic
**sim-id:** medication-safety-network-infographic<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/medication-safety-network-infographic/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/medication-safety-network-infographic

Bloom Taxonomy: Evaluate<br/>
Bloom Taxonomy Verb: assess, justify<br/>
Learning objective: Given a patient's medication safety network, the learner can assess which relationships (drug-drug interaction, contraindication, or appropriate indication) apply to a selected medication and justify whether the patient's current regimen poses a safety risk.

Purpose: Show how a graph traversal surfaces medication safety issues across a patient's active medications, drug-drug interactions, allergies, and existing conditions, using the Warfarin, Aspirin, and Ibuprofen bleeding-risk combination as the running example.

Node groups shown:
- Active medications (left) — e.g., Warfarin, Aspirin, Ibuprofen, Metformin
- Existing conditions (right) — e.g., Atrial Fibrillation, Diabetes, Stage 3a Kidney Disease
- Allergies (bottom)
- Central patient safety indicator flagging whether a high-risk combination is present

Edge types shown (color-coded):
- Red solid lines: drug-drug interactions (e.g., Warfarin + Aspirin + Ibuprofen raising bleeding risk)
- Blue dotted lines: contraindications against an existing condition (e.g., NSAIDs and Metformin against Stage 3a Kidney Disease)
- Green solid lines: appropriate indications (e.g., Warfarin for Atrial Fibrillation, Metformin for Diabetes)

Interactive controls:
- Click a medication node to isolate and highlight only its relationships, dimming the rest of the network
- Click the background to clear the selection and restore the full view
- Hover any line to see the specific interaction, contraindication, or indication it represents

Instructional Rationale: An Evaluate-level objective (assess, justify) requires the learner to weigh multiple relationship types against each other rather than simply naming them; isolating one medication's full relationship set on click supports the judgment call of whether a specific regimen is safe, which is the actual task a clinician or a clinical decision support system performs.
</details>

!!! mascot-warning "Don't Get Tangled in a Bad Combination"
    ![Sage with a cautious arm raised](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Warfarin plus Aspirin plus Ibuprofen is a real tentacle-y problem: three edges that are each survivable alone compound into a serious bleeding risk together. A graph that surfaces interaction edges before a prescription is signed can catch exactly this kind of danger.

## Immunization and the Vaccination Schedule

Not every edge from a patient to a medical intervention follows from a
diagnosis. An **immunization** is a preventive event — the administration
of a vaccine to a patient, modeled as an edge from `Patient` to an
`Immunization` node carrying a `date_administered` property — given
specifically to prevent a future disease rather than to treat a present
one. Because prevention is time-sensitive, immunizations are governed by a
**vaccination schedule**: a standardized set of rules specifying which
vaccines are recommended at which patient ages or intervals, maintained by
public health authorities and represented in the graph as reference nodes
that a patient's actual immunization history can be checked against.

Consider a worked example. The measles-mumps-rubella (MMR) vaccine is
recommended at 12-15 months and again at 4-6 years, while the influenza
vaccine is recommended annually for every patient over 6 months old. A
graph model checks compliance by comparing a patient's actual immunization
edges, each with its own `date_administered`, against the age-indexed nodes
of the reference schedule, flagging, for instance, a 6-year-old whose graph
shows only the first MMR dose and no second.

The table below summarizes several common immunizations exactly as they
would be modeled in the graph: one edge from `Patient` to an `Immunization`
event node per dose, each edge dated by `date_administered`.

| Vaccine | Recommended Ages / Interval | Graph Representation |
|---|---|---|
| MMR (Measles-Mumps-Rubella) | 12-15 months; booster at 4-6 years | Two edges from `Patient` to two `Immunization` nodes, each carrying `date_administered` |
| Influenza | Annually, from 6 months of age onward | One new edge to a fresh `Immunization` node each flu season |
| Tdap (Tetanus-Diphtheria-Pertussis) | 11-12 years; booster every 10 years | One edge per dose; next-due date computed from the 10-year interval on the schedule node |
| HPV (Human Papillomavirus) | 11-12 years, two-dose series | Two edges to two `Immunization` nodes spaced 6-12 months apart |

!!! mascot-encourage "You're Building the Whole Clinical Picture"
    ![Sage giving encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    From a single symptom edge to a full medication-safety network, you've now got the vocabulary to model an entire clinical encounter as a graph. Trace the pathway with me into the next chapter, where these pieces link into ongoing care.

## Chapter Summary

!!! mascot-celebration "The Clinical Core Is Now a Graph!"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just modeled the clinical heart of a patient encounter as a graph: patient records anchored by patient ID and patient history, symptoms and disease and medical condition converging on a diagnosis and differential diagnosis, treatment plans built from prescriptions, dosage, drug interactions, adverse events, and allergies, and immunizations tracked against a vaccination schedule.

Every relationship introduced in this chapter — a diagnosis, a prescription,
an immunization — is a single clinical event captured at one point in time.
Real patients, especially those managing chronic disease, need those
isolated events strung into an ongoing plan that spans months or years.
[Chapter 10](../10-patient-care-plans-chronic-disease/index.md) picks up
exactly there, modeling care plans, goals, and the longitudinal tracking
that turns a set of clinical facts into a coordinated course of care.
