---
title: Healthcare Economics and Medical Coding Systems
description: Establishes the economic backdrop of U.S. healthcare -- cost, fee-for-service vs. value-based care, and the payer/provider/patient roles -- then introduces the ICD, CPT, HCPCS, NDC, LOINC, and SNOMED CT coding systems.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:08:39
version: 1.10
---

# Healthcare Economics and Medical Coding Systems

## Summary

This chapter opens the healthcare domain track by establishing the economic backdrop of the U.S. healthcare system: per-person cost, fee-for-service versus value-based care, and the three core stakeholder roles (payer, provider, patient). It then introduces the medical coding systems -- ICD, CPT, HCPCS, drug codes, LOINC, and SNOMED CT -- that give clinical data a shared, structured vocabulary. Students finish able to explain why these coding systems exist and how they will become node and edge properties in later chapters' graph models.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Healthcare System | 1120 |
| Healthcare Cost | 2 |
| Per-Person Healthcare Cost | 1 |
| Fee-For-Service Model | 3 |
| Value-Based Care | 2 |
| Healthcare Payer | 924 |
| Healthcare Provider | 192 |
| Healthcare Patient | 1 |
| Electronic Health Record | 263 |
| Medical Coding System | 1 |
| ICD Code | 348 |
| ICD-10-CM | 2 |
| CPT Code | 1 |
| HCPCS Code | 2 |
| Drug Code | 1 |
| NDC Code | 343 |
| LOINC Code | 2 |
| SNOMED CT | 1 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

The first six chapters built a general-purpose toolkit: graph vocabulary,
query languages, operations, algorithms, and embeddings that apply to any
connected dataset. This chapter turns that toolkit toward its intended
target — the U.S. healthcare system itself — starting with why it costs so
much, who its major stakeholders are, and the coding systems that will
become the node and edge properties in every graph model for the rest of
this book.

!!! mascot-welcome "Time to Speak Healthcare"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the dots! Every graph algorithm you now know needs real data to chew on, and healthcare data comes with its own economics and its own alphabet soup of codes. By the end of this chapter you'll understand why U.S. healthcare costs what it does, who pays whom for what, and how ICD, CPT, and NDC codes will become the properties riding on every node in the graphs we build from here forward.

## The Cost Problem This Book Exists to Address

**Healthcare cost** refers to the total amount of money spent on medical
care, insurance, and related services across the system. In the United
States, this total is best understood not as a raw number but as a
**per-person healthcare cost**: the average amount spent per resident per
year, which allows fair comparison against other countries regardless of
population size. By this measure, the United States spends dramatically
more than any other developed nation — over \$12,900 per person annually as
of 2021 — roughly double the average of comparable wealthy countries, and
representing over 18% of the entire U.S. economy.

This gap is not explained by Americans receiving more care overall; by most
utilization measures (doctor visits per capita, hospital admission rates),
the U.S. is average or below average compared to peer nations. Instead,
health economists point to higher *prices* per service, more administrative
overhead spent on billing and insurance complexity, and higher rates of
avoidable chronic disease complications — each of which, notably, is a
problem that better data connectivity can help address: administrative
overhead shrinks when systems can exchange data cleanly (Chapter 8), and
avoidable complications shrink when care teams can see a patient's full
connected history rather than fragments of it (a running theme since
Chapter 1's Maria Chen example).

#### Diagram: Per-Person Healthcare Cost Comparison Chart

<iframe src="../../sims/per-person-healthcare-cost-comparison-chart/main.html" width="100%" height="494px" scrolling="no"></iframe>

[Run the Per-Person Healthcare Cost Comparison Chart MicroSim Fullscreen](../../sims/per-person-healthcare-cost-comparison-chart/main.html){ .md-button }

<details markdown="1">
<summary>Per-Person Healthcare Cost Comparison Chart (reused)</summary>
Type: chart
**sim-id:** per-person-healthcare-cost-comparison-chart<br/>
**Library:** Chart.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/per-person-healthcare-cost-comparison-chart/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/per-person-healthcare-cost-comparison-chart

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: interpret, compare<br/>
Learning objective: Interpret a dual-axis chart to compare U.S. per-person healthcare spending, in both absolute dollars and as a share of GDP, against eight other developed nations.

Reused from the MicroSim catalog. This 2021 OECD dataset chart shows the U.S. bar (\$12,914) roughly double the comparison-nation average, with a line overlay showing the U.S. also leads on healthcare spending as a share of GDP (18.3% versus 10-12% for peer nations). Hovering any country reveals its exact figures, giving concrete evidence for the outlier status this section's opening paragraph asserts.
</details>

## Two Ways to Pay for Care

Why the United States spends so much more is, in large part, a question of
payment design. Under the **fee-for-service model**, providers are paid
separately for each individual service rendered — every office visit,
every test, every procedure generates its own bill — which creates a direct
financial incentive to deliver *more* services, regardless of whether more
services improve the patient's health. **Value-based care** inverts this
incentive: providers are paid based on patient health outcomes and cost
efficiency rather than volume of services, rewarding prevention, care
coordination, and avoiding unnecessary procedures instead of rewarding
sheer quantity of billed activity.

| Dimension | Fee-For-Service Model | Value-Based Care |
|---|---|---|
| What gets paid | Each individual service performed | Health outcomes and total cost efficiency |
| Incentive created | More services, more revenue | Better outcomes, fewer unnecessary services |
| Data demand | Track individual transactions | Track long-term outcomes across a full care journey |

A worked example makes the incentive difference concrete. Under
fee-for-service, if Maria Chen's diabetes worsens and she is hospitalized
for a preventable complication, the hospital bills separately for the
admission, every test, and every procedure — the hospitalization actually
*increases* provider revenue, even though it represents a failure of
preventive care. Under a value-based care contract, that same
hospitalization instead counts *against* the provider, since it signals
the annual per-patient budget wasn't spent effectively on the preventive
visits, medication management, and care coordination that could have
avoided the complication in the first place — the same underlying clinical
event, but with opposite financial consequences depending on which payment
model governs the contract.

!!! mascot-thinking "This Is Where Graphs Become a Superpower"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that value-based care needs something fee-for-service never demanded: the ability to see a patient's *entire* connected care journey — every provider, every condition, every outcome — as one picture, not a pile of disconnected transactions. That's exactly what a graph database is built to do. Learning to model healthcare data as a graph isn't just an academic exercise — it's a genuine, real-world superpower behind the industry's shift away from fee-for-service, and that shift is one of the most promising paths to bringing U.S. healthcare costs back down to earth.

## The Healthcare System and Its Stakeholders

Nearly every healthcare data question in this book concerns one of three
roles operating inside a larger whole. The **healthcare system** is the
entire interconnected network of organizations, professionals, and
infrastructure involved in delivering and financing medical care — the
umbrella term this book's title refers to, and the largest possible scope
for any graph model we build. It is useful to think of the healthcare
system as three overlapping subsystems: a *delivery* subsystem (hospitals,
clinics, and the clinicians who actually treat patients), a *financing*
subsystem (insurers, employers, and government programs that pay for care),
and a *regulatory* subsystem (agencies like CMS and the FDA that set the
rules both other subsystems must follow). A graph model built for a single
health plan's fraud-detection team might scope itself to just the financing
subsystem plus enough of the delivery subsystem to trace claims back to
providers, deliberately excluding regulatory-agency data that a compliance
team's graph, by contrast, would need to include — the same overall
healthcare system, modeled with a different boundary depending on the
question being asked.

Within that system, three roles interact directly with nearly every unit of
data this book will model. The **healthcare payer** is the organization
responsible for financing care — a commercial insurance company like
Aetna or UnitedHealthcare, an employer that self-funds its own health
plan, or a government program like Medicare or Medicaid — that collects
premiums or tax revenue and reimburses providers for services rendered.
Payers differ substantially in how they set reimbursement rates: a
commercial payer negotiates rates directly with each provider network,
while Medicare publishes a fixed, nationally standardized fee schedule
that every participating provider must accept, a distinction that later
chapters on claims and reimbursement return to repeatedly. The **healthcare
provider** is the organization or individual professional that actually
delivers clinical care — a hospital, a clinic, or an individual physician
like Dr. Patel from earlier chapters, each identified nationally by a
unique National Provider Identifier (NPI) that, in a graph model, becomes
the natural key linking a `Provider` node to every claim, encounter, and
facility it touches. Finally, the **healthcare patient** is the individual
receiving care, whose demographic, clinical, and financial data flows
through both the provider and payer sides of every transaction — the
central node type this entire book's patient-centric graph models are
built around, beginning in earnest in Chapter 9. Unlike the payer and
provider, whose relationship to the system is primarily institutional, a
patient's relationship to the healthcare system is deeply personal and
often spans decades and dozens of separate providers and payers over a
lifetime — which is exactly why a single, connected patient identity that
persists across every encounter, claim, and coverage change is one of the
hardest and most valuable problems a healthcare graph model solves,
foreshadowing the patient-identifier matching challenge Chapter 9 tackles
directly.

These three roles interact through well-defined, bidirectional relationship
types that map directly onto the labeled property graph vocabulary from
Chapter 1: a patient receives care from a provider and generates medical
records; a provider submits claims to a payer and receives reimbursement; a
payer collects premiums from a patient and grants coverage. Consider a
concrete worked example of a payer relationship: if a health plan collects
\$450 per member per month in premiums from 10,000 covered patients but
pays out an average of \$380 per member per month in provider claims, the
payer's monthly margin per patient is \$70 — a calculation that depends on
being able to connect, for every patient, every claim paid to every provider
who submitted it, exactly the multi-hop query pattern Chapter 2 showed a
graph model answering far more cheaply than a relational join chain.

A second worked example shows the provider side of the same ecosystem. A
provider's clinical productivity is commonly measured in Relative Value
Units (RVUs), where each CPT-coded procedure (introduced later in this
chapter) carries a standardized RVU weight reflecting its complexity and
resource cost. If Dr. Patel bills 20 office visits in a week, each worth
1.3 RVUs, plus 5 minor procedures worth 2.1 RVUs each, his weekly
productivity totals \( (20 \times 1.3) + (5 \times 2.1) = 26 + 10.5 = 36.5
\) RVUs — a single number a health system can compare across providers
regardless of specialty, and one that depends on being able to connect
every billed procedure code back to the specific provider who performed
it, exactly the kind of `Provider`-to-`Procedure` edge a graph model
represents directly rather than reconstructing through a claims join.

#### Diagram: Healthcare Ecosystem Stakeholder Diagram

<iframe src="../../sims/healthcare-ecosystem-stakeholder-diagram/main.html" width="100%" height="598px" scrolling="no"></iframe>

[Run the Healthcare Ecosystem Stakeholder Diagram MicroSim Fullscreen](../../sims/healthcare-ecosystem-stakeholder-diagram/main.html){ .md-button }

<details markdown="1">
<summary>Healthcare Ecosystem Stakeholder Diagram (reused)</summary>
Type: diagram
**sim-id:** healthcare-ecosystem-stakeholder-diagram<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-ecosystem-stakeholder-diagram/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/healthcare-ecosystem-stakeholder-diagram

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: identify, explain<br/>
Learning objective: Identify the three primary healthcare stakeholders and explain the direction and purpose of the data and money flows connecting each pair, including satellite entities such as pharmacies and employers.

Reused from the MicroSim catalog (exact topical fit — this is the canonical stakeholder model for the entire book). The central triangle's three thick bidirectional arrows — care and records between patient and provider, claims and reimbursement between provider and payer, coverage and premiums between payer and patient — are exactly the three relationships this section's worked example depends on, with satellite entities (pharmacy, lab, employer, government) showing how the wider ecosystem extends the core triangle.
</details>

## The Electronic Health Record: Where Provider Data Lives

The **electronic health record** (EHR) is the digital system a provider
organization uses to capture and store a patient's clinical data — problem
lists, medications, lab results, vital signs, and clinical notes — replacing
the paper charts of an earlier era. An EHR is not itself a single unified
database in most health systems; it typically integrates data streaming in
from several separate source systems (a lab interface, a pharmacy system,
an ordering system), all of which need to converge on a single, coherent
view of one patient before that data becomes clinically useful, let alone
analytically useful for value-based care reporting.

A typical EHR organizes a patient's data into several standard modules,
each of which maps naturally onto a distinct node or edge type in a
healthcare graph model: a **problem list** (active and past diagnoses,
using the ICD codes introduced later in this chapter), a **medication
list** (active prescriptions, using NDC codes), a **results** module (lab
and imaging results, using LOINC codes), a **vitals** module (blood
pressure, heart rate, and other measurements recorded at each encounter),
and free-text **clinical notes** written by providers during and after a
visit. Consider a worked example of how these modules connect for one
encounter: when Maria Chen visits Dr. Patel for her diabetes follow-up, the
EHR simultaneously updates her problem list (confirming the Type 2 Diabetes
diagnosis remains active), appends a new vitals entry (this visit's blood
pressure and weight), and — if her hemoglobin A1c test comes back — adds a
new entry to her results module linked to that same encounter. In a graph
model, all of this becomes edges radiating outward from a single
`Encounter` node: one `HAS_DIAGNOSIS` edge to a `Condition` node, one
`RECORDED_VITALS` edge to a `Vitals` node, and one `HAS_RESULT` edge to a
`LabResult` node — a structure Chapter 9 develops in full.

#### Diagram: Healthcare Data Integration Graph Model

<iframe src="../../sims/healthcare-data-integration-graph-model/main.html" width="100%" height="488px" scrolling="no"></iframe>

[Run the Healthcare Data Integration Graph Model MicroSim Fullscreen](../../sims/healthcare-data-integration-graph-model/main.html){ .md-button }

<details markdown="1">
<summary>Healthcare Data Integration Graph Model (reused)</summary>
Type: graph-model
**sim-id:** healthcare-data-integration-graph-model<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-data-integration-graph-model/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/healthcare-data-integration-graph-model

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, relate<br/>
Learning objective: Examine how a single master patient node connects to encounters sourced from separate systems (EHR, claims, lab, pharmacy), and relate this convergence to the definition of an electronic health record as an integration point rather than a single database.

Reused from the MicroSim catalog. A single master patient record HAS_ENCOUNTER edges to office visits, ED visits, and hospitalizations, each SOURCED_FROM a different underlying system — directly illustrating that "the EHR" a clinician sees is often itself the product of graph-style integration across Epic, claims, lab, and pharmacy systems converging on one patient node.
</details>

!!! mascot-tip "The EHR Is a Preview of Chapter 8"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a heads-up worth filing away: getting different systems' data to converge cleanly on one patient, the way the diagram above shows, is exactly the interoperability problem Chapter 8 tackles head-on with standards like HL7 FHIR. Keep this integration picture in mind — you'll see it again with real technical machinery attached.

## A Shared Vocabulary: Medical Coding Systems

None of the connections above are useful unless every system describing a
diagnosis, a procedure, or a drug uses the same vocabulary to describe it. A
**medical coding system** is a standardized set of codes used to represent
clinical concepts — diagnoses, procedures, supplies, or drugs — consistently
across every provider, payer, and system in the country, so that "Type 2
diabetes" documented at one hospital means exactly the same thing as "Type 2
diabetes" billed at another. In a graph model, these codes become properties
on nodes and edges — the very properties Chapter 1 introduced — giving every
`Condition`, `Procedure`, or `Medication` node a precise, machine-readable
identity instead of a free-text string that might be spelled five different
ways across five different systems.

Each medical coding system is maintained by a specific governing body and
updated on its own release schedule, which matters for anyone building a
graph model that must stay current: the World Health Organization and the
Centers for Disease Control and Prevention jointly maintain ICD-10-CM with
annual updates each October, the American Medical Association owns and
licenses CPT with annual updates each January, and CMS maintains HCPCS
Level II. A graph model's `Condition` or `Procedure` nodes should therefore
carry not just the code itself but the code system's version or effective
date as a property, since the same alphanumeric string can occasionally be
redefined or retired between annual code-set releases.

The **ICD Code** — the International Classification of Diseases — is the
coding system used to represent diagnoses and conditions. The version
currently used for U.S. clinical diagnosis coding is **ICD-10-CM** (the
Clinical Modification), which extends the World Health Organization's base
ICD-10 codes with additional U.S.-specific detail. An ICD-10-CM code has
clear internal structure worth decoding by hand: the code `E11.9` breaks
into a category, `E11` (Type 2 diabetes mellitus), and a specifier after the
decimal point, `.9` (without complications). Change that specifier to
`E11.21` and the same category now means "with diabetic nephropathy" — the
structure lets a single category capture dozens of clinically distinct
variants without inventing an entirely new code for each one.

A second example shows the same structure applied to an entirely different
category. The code `I10` represents "essential (primary) hypertension" —
here the category `I10` has no decimal specifier at all, since this
particular condition needs no further subdivision. Compare that to `I21.3`,
which decodes as category `I21` ("acute myocardial infarction") with
specifier `.3` ("of unspecified site") — the same three-part structure
(letter-prefixed category, optional decimal specifier) applies uniformly
across ICD-10-CM's roughly 70,000 codes, which is precisely why a single
`icd10_code` property, attached consistently to every `Condition` node in a
graph model, can represent conditions as different as diabetes,
hypertension, and a heart attack using one shared, machine-readable format.

Diagnoses alone don't describe what was *done* for a patient. The **CPT
Code** (Current Procedural Terminology) describes medical procedures and
services performed by a physician — an office visit, a surgery, an
X-ray — and is the code that actually drives most physician billing. CPT
code `99213`, for example, represents a moderate-complexity established-
patient office visit — exactly the kind of visit that would generate the
RVU value used in the provider productivity example earlier in this
chapter. The **HCPCS Code** (Healthcare Common Procedure Coding System)
extends coverage beyond CPT to durable medical equipment, ambulance
transport, and supplies that CPT doesn't address; HCPCS Level I is, in
fact, identical to CPT, while HCPCS Level II covers everything CPT does
not, using a distinct letter-plus-four-digit format such as `E0601`
(a CPAP device), which Chapter 18's discussion of durable medical
equipment fraud returns to.

Prescribing a medication introduces its own coding challenge, since a
"code" must uniquely identify not just a drug's active ingredient but its
exact manufactured form. A **drug code** broadly refers to any standardized
identifier for a specific medication, and this category actually spans
several distinct systems used for different purposes: RxNorm (maintained
by the National Library of Medicine) identifies a drug at the level of
ingredient and clinical dose regardless of manufacturer, which is what a
clinical decision support system checking for dangerous drug interactions
typically queries against, while the most important drug code for U.S.
*billing* purposes specifically is the **NDC Code** — the National Drug Code, a
three-segment number assigned by the FDA that uniquely identifies a drug's
labeler (manufacturer), specific product (ingredient, strength, and dosage
form), and package size. A representative NDC code like `0069-0420-30`
decodes as labeler `0069`, product `0420` (a specific drug, strength, and
form from that labeler), and package `30` (a particular package size of
that product) — three numbers that together uniquely identify not just
"metformin" in the abstract, but one specific manufacturer's 500mg tablet
sold in a bottle of 30.

In practice, NDC codes carry a well-known data-quality wrinkle worth
flagging before you encounter it in real data: the FDA allows the three
segments to be published in more than one digit-length configuration (most
commonly 5-4-2 or 5-3-2 digits), and different downstream systems sometimes
pad these segments with leading zeros inconsistently, so the *same*
physical product can appear as `00069-0420-30` in one data feed and
`0069-420-30` in another. A graph model ingesting NDC codes from multiple
source systems — a pharmacy feed and a claims feed, say — must normalize
this formatting before treating two differently-formatted strings as the
same `Medication` node, or it will silently create duplicate nodes for a
single real-world drug product. This is a preview of the broader data
quality theme Chapter 27 addresses in depth.

#### Diagram: Medical Coding Systems Interactive Infographic

<iframe src="../../sims/medical-coding-systems-infographic/main.html" width="100%" height="598px" scrolling="no"></iframe>

[Run the Medical Coding Systems Interactive Infographic MicroSim Fullscreen](../../sims/medical-coding-systems-infographic/main.html){ .md-button }

<details markdown="1">
<summary>Medical Coding Systems Interactive Infographic (reused)</summary>
Type: infographic
**sim-id:** medical-coding-systems-infographic<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/medical-coding-systems-infographic/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/medical-coding-systems-infographic

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: classify, compare<br/>
Learning objective: Classify a clinical or billing scenario by which of the six major coding systems (ICD-10, CPT, HCPCS, NDC, LOINC, SNOMED CT) applies, comparing each system's governing body, purpose, and code structure.

Reused from the MicroSim catalog (exact topical fit). This hub-and-spoke infographic lets learners click any of the six coding systems just introduced in prose to see its governing body, code structure, and a worked example, with faint connectors showing real overlaps (HCPCS Level I is CPT; SNOMED is more granular than ICD) — reinforcing the division of labor this section's paragraphs just walked through in text.
</details>

Two remaining coding systems round out the picture, each covering ground
none of the above touch. The **LOINC Code** (Logical Observation Identifiers
Names and Codes) standardizes laboratory test and clinical observation
results — a specific hemoglobin A1c test result reported by any lab in the
country carries the same LOINC code (`4548-4`, for hemoglobin A1c as a
percentage of total hemoglobin), letting a graph query aggregate lab
results across facilities that would otherwise use inconsistent internal
test names like "HbA1c," "A1C," or "Hemoglobin A1C %." **SNOMED CT**
(Systematized Nomenclature of Medicine, Clinical Terms) is a far more
granular clinical terminology than ICD, covering not just billable
diagnoses but symptoms, findings, body structures, and procedures with
fine-grained precision — where ICD-10-CM's `E11.9` broadly means "Type 2
diabetes without complications," SNOMED CT might separately distinguish
`44054006` (Type 2 diabetes mellitus) from dozens of more specific related
concepts (a particular complication, a specific finding on examination)
that ICD-10-CM would group under one billing code, which is why SNOMED is
favored for clinical documentation and decision support while ICD remains
the standard for billing.

Bringing every coding system together, a single realistic encounter shows
how they combine on one small piece of a graph model. When Maria Chen sees
Dr. Patel for her diabetes and he orders a lab test and adjusts her
prescription, the resulting `Encounter` node connects outward through
several coded edges at once: a `HAS_DIAGNOSIS` edge to a `Condition` node
carrying `icd10_code: "E11.9"`, a `BILLED_AS` edge to a `Procedure` node
carrying `cpt_code: "99213"`, a `HAS_RESULT` edge to a `LabResult` node
carrying `loinc_code: "4548-4"`, and a `PRESCRIBED` edge to a `Medication`
node carrying `ndc_code: "0069-0420-30"`. No single coding system captures
this entire encounter — each one covers exactly the slice of the clinical
story it was designed for — but together, attached as properties on the
nodes and edges this book has been building since Chapter 1, they give a
graph query the precision to ask exactly the kind of cross-cutting question
(which patients on this specific medication also carry this specific
diagnosis, and what did their most recent lab result show?) that a
value-based care program depends on answering reliably at scale.

!!! mascot-warning "Same Clinical Fact, Different Code, Different Purpose"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A classic near-miss: a screening colonoscopy is documented with an ICD-10-CM code for the *reason* (a screening indication), but billed with a CPT code for the *procedure itself* — two completely different code systems describing the same single clinical event. Always ask "am I coding the diagnosis, the procedure, or the drug?" before picking a coding system; that one question resolves most of these mix-ups instantly.

## Chapter Summary

!!! mascot-celebration "You Now Speak the Language of Healthcare Data"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just connected the economic story — why U.S. healthcare costs so much and how value-based care aims to fix it — to the concrete stakeholders and coding systems every future graph model in this book will be built from. That's the last piece of vocabulary standing between you and modeling real patient, provider, and payer data.

This chapter grounded the graph and algorithm toolkit from Chapters 1
through 6 in the economics and vocabulary of the actual domain this book
models: the cost pressures driving a shift from fee-for-service to
value-based care, the payer-provider-patient triangle every transaction
flows through, and the ICD, CPT, HCPCS, NDC, LOINC, and SNOMED CT coding
systems that will populate node and edge properties from here on. In
[Chapter 8](../08-healthcare-interoperability-care-coordination/index.md),
we pick up the interoperability thread this chapter's EHR section opened,
examining how standards let these coded, structured facts move reliably
between the many separate systems a real health system depends on.
