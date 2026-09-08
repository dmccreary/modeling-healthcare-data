---
title: Clinical Guidelines, Care Pathways, and Provider Workforce
description: Models multidisciplinary care teams, the guideline-to-protocol hierarchy, provider performance, malpractice risk, care-coordination roles, and the provider staffing lifecycle as graphs.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:10:10
version: 1.10
---

# Clinical Guidelines, Care Pathways, and Provider Workforce

## Summary

This chapter covers how providers coordinate care as teams and follow evidence-based practice: multidisciplinary care teams, provider performance, clinical guidelines, best practices, and care pathways. It also covers the practical workforce side of provider operations -- credentialing processes, malpractice risk, staffing models, and provider attrition. This closes out the provider perspective before the book turns to the payer perspective.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Multidisciplinary Team | 50 |
| Provider Performance | 32 |
| Clinical Guideline | 1 |
| Best Practice | 2 |
| Evidence-Based Medicine | 1 |
| Clinical Protocol | 15 |
| Care Pathway | 2 |
| Clinical Pathway Variance | 1 |
| Provider Directory | 2 |
| Credentialing Process | 1 |
| Malpractice Risk | 10 |
| Locum Tenens | 2 |
| Nurse Practitioner | 1 |
| Physician Assistant | 2 |
| Care Manager | 1 |
| Case Manager | 5 |
| Provider Onboarding | 2 |
| Staffing Model | 1 |
| Shift Scheduling | 2 |
| Provider Attrition | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 12: Provider Organizations, Networks, and Scheduling](../12-provider-organizations-networks-scheduling/index.md)

---

!!! mascot-welcome "Eight Arms for One Care Team"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Coordinating a patient's care takes a whole team, and I happen to have eight arms for exactly that kind of coordination. In this chapter we graph the people who deliver care together, the guidelines that tell them what to do, and the staffing machinery that keeps them all in the building. Let's connect the dots!

## Coordinating Care: The Multidisciplinary Team

Chapter 12 modeled the organizations and networks providers work within: hospitals, clinics, referral relationships, and the credentials that establish a provider's standing. This chapter turns to something graph databases represent unusually well: the fact that a single patient with several chronic conditions is rarely cared for by one provider working alone. A **Multidisciplinary Team** is a group of professionals from different clinical and allied-health disciplines who collaborate on one patient's care plan, each contributing domain-specific expertise that no single provider possesses alone. Coordinating that team well, so that a cardiologist's medication change reaches the pharmacist reconciling the patient's prescriptions, is one of the hardest operational problems in modern medicine, and it is fundamentally a graph problem: who is connected to whom, and through what kind of relationship.

Consider Robert Alvarez, a 68-year-old patient managing three interacting chronic conditions at once: Type 2 diabetes, coronary artery disease, and chronic kidney disease. No single specialty owns his care. His primary care provider holds overall responsibility and connects to his patient node through a `MANAGES_CARE` edge. Three specialists, a cardiologist, an endocrinologist, and a nephrologist, each connect through a `CONSULT_FOR` edge, contributing bounded, condition-specific expertise. Four allied-health professionals, a care coordinator, a clinical pharmacist, a registered dietitian, and a medical social worker, connect through `SUPPORT` or `COORDINATE` edges, handling everything from medication reconciliation to transportation barriers. Every one of these nine professionals also carries a `WORKS_AT` edge to the facility where they see Robert, the same relationship type introduced in Chapter 1.

A relational schema could store this same roster in a single `care_team_members` join table, but doing so would flatten every role into an undifferentiated row distinguished only by a `role` text column. A labeled property graph preserves the distinction that matters clinically: a `MANAGES_CARE` edge implies overall accountability for the care plan, a `CONSULT_FOR` edge implies bounded, condition-specific input, and a `SUPPORT` or `COORDINATE` edge implies logistics rather than diagnosis. That distinction is exactly what a case manager needs when triaging a new problem: "who owns this decision?" becomes a one-hop traversal filtered by edge label, not a business rule buried in application code.

#### Diagram: Multidisciplinary Care Team Graph Model

<iframe src="../../sims/multidisciplinary-care-team-graph-model/main.html" width="100%" height="488px" scrolling="no"></iframe>

[Run the Multidisciplinary Care Team Graph Model MicroSim Fullscreen](../../sims/multidisciplinary-care-team-graph-model/main.html){ .md-button }

<details markdown="1">
<summary>Multidisciplinary Care Team Graph Model (reused)</summary>
Type: graph-model
**sim-id:** multidisciplinary-care-team-graph-model<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/multidisciplinary-care-team-graph-model/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/multidisciplinary-care-team-graph-model

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: differentiate, examine<br/>
Learning objective: Given a rendered multidisciplinary-team graph for one complex patient, the learner can differentiate the accountability implied by a MANAGES_CARE edge from the bounded, condition-specific input of a CONSULT_FOR edge and the logistical role of a SUPPORT or COORDINATE edge.

Reused from the MicroSim catalog. This radial vis-network graph places one complex patient (diabetes, coronary artery disease, chronic kidney disease) at the center, connected outward to a primary care provider who MANAGES_CARE, three specialists who CONSULT_FOR, and four allied-health professionals (care coordinator, pharmacist, dietitian, social worker) who SUPPORT or COORDINATE care; every professional also carries a WORKS_AT edge to a facility, color-coded green for the primary-care relationship, orange for specialist consults, purple for allied-health support, and gray for facilities. Hovering any node reveals its role and properties in a tooltip; clicking a node highlights every edge directly connected to it, letting the learner isolate, for example, everyone who touches the patient's care versus everyone that one specialist also treats elsewhere. Dragging nodes and using the navigation buttons rearranges the layout without losing the highlighted state.

Instructional Rationale: An Analyze-level objective (differentiate, examine) is well served by a graph-model explorer because the whole point is discriminating between edge types that look superficially similar (all are lines from the patient) but carry different clinical meaning. Click-to-highlight lets the learner isolate one relationship type at a time and compare it against the others, which a static labeled diagram cannot support.
</details>

!!! mascot-thinking "Eight Arms, Infinite Edges"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Eight arms taught me that more contributors doesn't have to mean more chaos, as long as every edge has a clear, distinct label. A team of nine people isn't intimidating in a graph; it's nine well-typed relationships you can traverse in a single query.

Real hospital systems scale this pattern well past nine people per patient; chronic-care management programs for high-acuity patients routinely coordinate a dozen or more distinct professionals. The advantage of storing this as a graph rather than a set of departmental spreadsheets is that one traversal, starting at a patient node and following every incoming `MANAGES_CARE`, `CONSULT_FOR`, `SUPPORT`, and `COORDINATE` edge, answers "who is on this patient's team right now" regardless of how many departments those professionals report to. Run the same traversal in reverse from a provider node, and it answers a different operational question: how many active patients is this specialist currently consulting on, a number that feeds directly into the provider-schedule and capacity models from Chapter 12.

## From Guideline to Protocol: Codifying Best Practice as a Graph

Not every relationship in a healthcare graph connects two people or a person to a facility. Some of the most consequential edges connect a provider's actions to the accumulated evidence behind them. A **Clinical Guideline** is a formal, published recommendation, typically issued by a professional society or government body, that tells providers how to manage a specific condition or clinical situation, such as the American Heart Association's recommendations for evaluating chest pain. Guidelines are not invented from opinion; they are synthesized from **Evidence-Based Medicine**, the disciplined practice of grounding clinical decisions in the current best evidence from published clinical research rather than tradition or individual anecdote alone. When a specific recommendation within a guideline is consistently shown, across many studies and many patients, to produce measurably better outcomes than the alternatives, it earns the label **Best Practice**.

A guideline and a best practice are still recommendations, written in prose for a human reader. Turning a recommendation into something a care team, or a graph, can execute requires two more layers of structure. A **Care Pathway** is a structured, multidisciplinary plan that lays out the expected sequence of steps, timing, and responsible roles for treating patients with a specific condition, translating a guideline's prose into an operational plan. A **Clinical Protocol** narrows that plan further: it is a specific, codified, step-by-step sequence of actions defined for one concrete clinical scenario, detailed enough that a provider, or a graph query, can follow it directly without additional interpretation. Put the whole chain together and you get a hierarchy: a Clinical Guideline expresses recommendations grounded in Evidence-Based Medicine, a Best Practice is the specific recommendation validated by that evidence, a Care Pathway operationalizes it into a multidisciplinary plan, and a Clinical Protocol is the executable, scenario-specific version of that pathway.

The table below anchors the five terms to one running example before we look at the protocol itself.

| Term | What It Is | Chest-Pain Example |
|---|---|---|
| Clinical Guideline | Published recommendation from a professional body | AHA/ACC chest-pain evaluation guideline |
| Evidence-Based Medicine | The research foundation behind the recommendation | Validated studies establishing HEART score thresholds |
| Best Practice | The specific recommendation the evidence supports | Risk-stratify every non-STEMI patient with the HEART score |
| Care Pathway | The multidisciplinary plan built from the best practice | ED chest-pain evaluation pathway, from triage to disposition |
| Clinical Protocol | The scenario-specific, executable version of the pathway | The exact ECG-then-HEART-score-then-troponin sequence below |

!!! mascot-tip "Don't Get Tangled in the Terminology"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a shortcut so you don't get tied in knots over these five terms. Guideline is the published recommendation, evidence-based medicine is why we trust it, best practice is the specific recommendation that earned that trust, care pathway is the multidisciplinary plan built from it, and protocol is that plan made concrete enough to execute for one scenario.

The example every emergency department knows by heart makes this hierarchy concrete: the evaluation of a patient presenting with chest pain. A **12-lead ECG** (a recording of the heart's electrical activity from twelve different vantage points) is the first step, because it can immediately identify **STEMI** (ST-elevation myocardial infarction), a severe, ongoing heart attack visible as a specific pattern on the ECG that demands the patient go straight to the **cath lab** (the catheterization laboratory where a blocked artery is mechanically reopened) with no further workup. Every patient without a STEMI pattern is instead risk-stratified using the **HEART score**, a validated point system combining History, ECG findings, Age, Risk factors, and an initial **troponin** level (a protein released into the blood when heart muscle is damaged) into a low-, moderate-, or high-risk category. A troponin result then splits the remaining patients into **acute coronary syndrome (ACS)**, meaning some form of reduced blood flow to the heart, versus a non-cardiac cause, before the patient's final disposition, meaning discharge, observation, or admission, is decided.

#### Diagram: Clinical Protocol Workflow: Chest Pain Evaluation

<iframe src="../../sims/clinical-protocol-workflow-chest-pain-evaluation/main.html" width="100%" height="731px" scrolling="no"></iframe>

[Run the Clinical Protocol Workflow Fullscreen](../../sims/clinical-protocol-workflow-chest-pain-evaluation/main.html){ .md-button }

<details markdown="1">
<summary>Clinical Protocol Workflow: Chest Pain Evaluation (reused)</summary>
Type: workflow
**sim-id:** clinical-protocol-workflow-chest-pain-evaluation<br/>
**Library:** Mermaid<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/clinical-protocol-workflow-chest-pain-evaluation/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/clinical-protocol-workflow-chest-pain-evaluation

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: explain, classify<br/>
Learning objective: Given the emergency-department chest-pain Clinical Protocol as a decision graph, the learner can explain how a 12-lead ECG, the HEART score, and a troponin result each branch the pathway, and classify a given patient scenario into the correct disposition.

Reused from the MicroSim catalog. This Mermaid flowchart models the ED chest-pain protocol as a decision graph: a 12-lead ECG first separates the STEMI critical pathway (red, straight to the cath lab) from every other patient, who is then risk-stratified by HEART score into low- (green), moderate- (yellow), and high-risk (orange) pathways, with a troponin result splitting ACS from non-cardiac causes before final disposition. Every node and edge is clickable; clicking a step opens an infobox with the clinical detail, time target, and rationale behind that step, and clicking a branch edge explains the decision rule that sends a patient down it.

Instructional Rationale: An Understand-level objective (explain, classify) calls for a clickable decision graph rather than a static flowchart image, because the learner must connect each branch point back to the clinical rule that produces it. Click-triggered infoboxes let the learner check their own classification of a hypothetical patient against the protocol's actual branching logic, one decision at a time.
</details>

A protocol only has value if the system can tell when reality departs from it. A **Clinical Pathway Variance** is a documented deviation between what actually happened during a patient's care and what the protocol expected to happen, such as a troponin sample drawn ninety minutes late. Because both the protocol and the patient's actual encounter are stored as graphs, detecting a variance becomes a comparison problem rather than a manual chart review: the system walks the patient's actual sequence of encounter edges, each carrying a timestamp property, and compares it against the protocol's expected sequence and time targets. Wherever an edge is missing, out of order, or outside its expected time window, the system flags a variance, which quality-improvement teams later aggregate to find where, and why, real-world care drifts from the evidence-based path.

## Measuring Providers: Performance vs. Rating

Not every measurement of a provider is patient-facing. Chapter 12 introduced **Provider Rating**, the patient-facing satisfaction and experience scores drawn from post-visit surveys that show up in a provider directory listing. **Provider Performance** is a different, broader measurement: an internal composite of clinical-quality metrics, patient outcomes, cost efficiency, and adherence to the guidelines just defined, used by health systems for compensation decisions and quality-improvement programs rather than shown to patients directly. The two scores can diverge sharply: a surgeon with excellent outcomes and low cost per case can still receive middling satisfaction scores over a brusque bedside manner, and a graph that stored only one of the two properties would miss half the picture. See [Chapter 12](../12-provider-organizations-networks-scheduling/index.md) for how Provider Rating is captured and queried.

Modeling Provider Performance as a graph property means storing several weighted inputs on, or computed near, the Provider node rather than a single imported number. A clinical-quality component is derived from `ADHERED_TO` edges linking a provider's encounters to the Clinical Guideline nodes they followed; an outcomes component aggregates documented complications from connected Patient encounters; a cost-efficiency component divides billed claims by episode; and a guideline-adherence component is simply the percentage of encounters following the protocol's Best Practice steps. A representative weighting, recalculated quarterly as new encounters close, is shown below.

| Component | Weight | Graph Source |
|---|---|---|
| Clinical quality | 40% | `ADHERED_TO` edges to Clinical Guideline nodes |
| Outcomes | 25% | Complications recorded on connected Patient encounters |
| Cost efficiency | 20% | Billed cost per episode from claims data |
| Guideline adherence | 15% | Percentage of encounters following documented Best Practice steps |

Because every input is itself a traversal over relationships that already exist in the graph, rather than a value copied in from a spreadsheet, the composite score is recomputed, not re-entered, every time the underlying encounters, claims, or guideline links change.

## Who's on the Case: Case Managers, Care Managers, NPs, and PAs

Not every member of Robert Alvarez's care team is a physician, and not every coordinating role carries the same authority. A **Case Manager** is a professional, often a registered nurse or licensed social worker, responsible for coordinating a patient's overall care across settings and providers, especially for complex or high-cost cases like Robert's. In the graph, a case manager connects to a patient through a `MANAGES_CASE_FOR` edge that is distinct from any single specialist's `CONSULT_FOR` edge, because the case manager's job is not to treat one condition but to make sure every other edge on the patient node is actually being acted on. A useful graph query for a case-management program asks exactly that: find every patient with a `MANAGES_CASE_FOR` edge whose care plan has not been reviewed, meaning no `REVIEWED_CARE_PLAN` edge has been added, in the past ninety days, surfacing patients at risk of falling through the cracks before a costly readmission occurs.

Three related roles are easy to confuse with a case manager, because all four titles involve the word "care" or "case" and all four sit close to the patient in the graph. A **Care Manager** performs a similar coordinating function but is typically employed by the payer rather than the provider organization, focusing on utilization and wellness outreach across a payer's membership rather than the clinical complexity of one case; the graph relationship is a `COORDINATES_CARE_FOR` edge running from a payer-side Care Manager node to the patient, a relationship this book returns to in the payer chapters ahead. A **Nurse Practitioner** is a licensed advanced-practice registered nurse who can diagnose conditions, order tests, and prescribe medications, independently in many states and collaboratively with a physician in others, connecting to a patient through a `PRESCRIBES_FOR` or `TREATS` edge much like a physician would. A **Physician Assistant** holds a comparable clinical scope, diagnosing and prescribing, but practices under a formal supervision or collaboration agreement with a physician, adding a `SUPERVISED_BY` edge to a Physician node alongside the same `PRESCRIBES_FOR` edge to the patient.

Scope of practice for both advanced-practice roles is not a fixed clinical fact but a legal one that varies by state: some states grant Nurse Practitioners full independent practice authority, while others require a collaborating-physician agreement much like a Physician Assistant's. A graph that models this as a `requires_supervision` property on the `PRESCRIBES_FOR` edge, populated from the state where the encounter occurred, lets a single query answer a question that would otherwise require a lookup table maintained outside the graph entirely: can this specific provider, in this specific state, prescribe this specific medication without a co-signature?

!!! mascot-encourage "A Real Tentacle-y Problem"
    ![Sage giving encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Four similar-sounding roles in one section is a real tentacle-y problem, I know. Anchor each one to its edge label instead of its job title, and the tangle sorts itself out.

The table below summarizes the comparison.

| Role | Scope of Practice | Typical Graph Relationship |
|---|---|---|
| Case Manager | Coordinates one patient's care across settings and providers, provider-side | `MANAGES_CASE_FOR` |
| Care Manager | Coordinates utilization and wellness outreach, payer-side | `COORDINATES_CARE_FOR` |
| Nurse Practitioner | Diagnoses, orders tests, and prescribes, independently or collaboratively | `PRESCRIBES_FOR`, `TREATS` |
| Physician Assistant | Diagnoses and prescribes under physician supervision or collaboration | `PRESCRIBES_FOR`, `SUPERVISED_BY` |

## Managing Exposure: Malpractice Risk, Credentialing, and the Provider Directory

Coordinating care well reduces risk, but risk in medicine is never zero, and health systems need a way to quantify it before it becomes a claim. **Malpractice Risk** is the aggregated exposure, or estimated probability, that a provider or organization will face a malpractice claim, computed from factors like claims history, specialty, and the complexity of the patients a provider treats. Modeling it as a graph-computed property rather than a static underwriting number means the score updates as the underlying facts change: a provider's `prior_claims_count` is simply the count of `FILED_CLAIM_AGAINST` edges pointing at their node, a `specialty_risk_level` is a baseline property inherited from their Specialization node (neurosurgery and obstetrics sit structurally higher than family medicine), and a `case_mix_complexity` score is the weighted average of the documented condition complexity across every patient connected to them by a `TREATS` edge. A composite score of 0.62 out of 1.0, for instance, might combine two prior claims, a moderate specialty-risk baseline for general surgery, and a case-mix complexity in the 80th percentile, a combination that would flag the provider for proactive risk-management outreach well before any new claim is filed.

!!! mascot-warning "Correlation Is Not Fault"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A high case-mix complexity score means a provider treats harder cases, not that they practice worse medicine. Feed a raw malpractice-risk score into a compensation or credentialing decision without that context, and you'll quietly punish the specialists willing to take the hardest patients.

The following table breaks the composite score into its contributing factors.

| Risk Factor | Graph Representation | Why It Matters |
|---|---|---|
| Prior claims | Count of `FILED_CLAIM_AGAINST` edges | Direct claims history is the strongest predictor of future claims |
| Specialty risk level | Property inherited from Specialization node | Some specialties carry structurally higher liability exposure |
| Case-mix complexity | Weighted average of connected patients' condition complexity | Normalizes risk so harder caseloads aren't penalized unfairly |

A malpractice-risk score does not exist in isolation; it feeds directly into two other workforce-management processes. The **Credentialing Process** is the verification workflow a provider must complete, primary-source verification of medical license, education, board certification, and malpractice history, before being granted privileges to practice within a hospital or network, typically modeled as a sequence of `CREDENTIALING_STEP` nodes attached to a Provider node and re-run for recredentialing every two to three years. The **Provider Directory** is the queryable, current list of credentialed, in-network providers that patients and payers actually search; in the graph it is less a stored table than a filtered view over Provider nodes joined by `IN_NETWORK_WITH` edges to a Payer node, restricted to providers whose credentialing status is active and whose malpractice-risk score sits below a review threshold. A provider can be highly rated and clinically excellent and still be temporarily absent from a directory if their credentialing has lapsed, which is precisely the kind of inconsistency a graph traversal, rather than a manually synchronized spreadsheet, is built to catch.

## Keeping the Workforce Staffed: The Provider Lifecycle

Behind every provider node in this book's graphs sits an entire workforce-operations lifecycle that has nothing to do with treating patients and everything to do with keeping enough qualified people in the building. The cycle runs from recruitment through onboarding, credentialing (covered above), scheduling, and eventually either retention or departure, and every stage leaves a trace that a graph can represent as an event or a state on the Provider node.

Organizations rarely staff purely with permanent hires. A **Locum Tenens** provider is a temporary, contracted clinician brought in to fill a short-term staffing gap, such as covering a maternity leave or a rural emergency department's overnight shift; in the graph, a locum tenens assignment is modeled as a time-bounded `WORKS_AT` edge carrying start and end dates rather than the open-ended edge a permanent hire receives. Locum staffing illustrates the tradeoff at the center of every staffing model: a temporary provider fills a schedule gap immediately but arrives without the accumulated relationships, referral patterns, and local-protocol familiarity that a permanent hire builds up over months, which is why many staffing models cap the percentage of locum-covered shifts even when individual locum providers are well-qualified.

Once any provider, permanent or locum, clears credentialing, **Provider Onboarding** is the structured process of integrating them into the organization's systems: granting electronic health record access, assigning them to care teams, and orienting them to local protocols, modeled as a checklist of `ONBOARDING_STEP` nodes that must all reach a completed state before the provider's `WORKS_AT` edge is marked active. An organization's overall **Staffing Model** is its plan for provider-to-patient ratios and skill mix across departments and shifts, the target that recruitment and onboarding are trying to fill; **Shift Scheduling** is the finer-grained assignment of specific providers to specific time blocks and locations that actually satisfies that model day to day, often computed as a constraint-satisfaction problem over the same provider-availability and capacity properties introduced in Chapter 12. Finally, **Provider Attrition** is the rate at which providers leave an organization or network, tracked over time so that staffing models can anticipate gaps before they become emergencies rather than reacting to them after a departure.

Provider Attrition is particularly well suited to graph-based early warning, because burnout risk is itself a network phenomenon. A provider whose `WORKS_AT` schedule shows a rising share of overnight and on-call shifts, whose `CONSULT_FOR` load has grown without a corresponding increase in allied-health support connections, and whose tenure since onboarding remains short, presents a very different risk profile from a provider with a stable, well-supported caseload, even when both providers see the same number of patients. Health systems that track these signals as graph properties, rather than waiting for an exit interview, can intervene, by adjusting shift scheduling or adding case-manager support, months before a resignation letter arrives.

The table below summarizes where each stage sits in the lifecycle and how it shows up on the graph.

| Lifecycle Stage | Concept | Graph Representation |
|---|---|---|
| Fill a gap | Locum Tenens | Time-bounded `WORKS_AT` edge with start/end dates |
| Integrate | Provider Onboarding | `ONBOARDING_STEP` checklist nodes gating an active `WORKS_AT` edge |
| Plan capacity | Staffing Model | Target provider-to-patient ratios and skill mix by department |
| Assign shifts | Shift Scheduling | Constraint-satisfaction assignment over availability and capacity properties |
| Retain or lose | Provider Attrition | Departure events tracked as a rate over time on the Provider node |

## Chapter Summary

!!! mascot-celebration "The Provider Perspective, Complete"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You've now modeled the full provider perspective: multidisciplinary teams, the guideline-to-protocol hierarchy, provider performance, malpractice risk, credentialing, case managers and advanced-practice roles, and the staffing lifecycle that keeps them all working. Two chapters, and the entire provider side of the graph, from a single referral to an entire hospital's workforce, is now yours.

Every concept in this chapter connected people, evidence, and operations back to the same underlying idea: a healthcare graph is only as useful as the relationships it makes explicit, whether that relationship is a nurse practitioner's `PRESCRIBES_FOR` edge, a protocol's expected sequence of timestamped steps, or a locum tenens provider's time-bounded `WORKS_AT` edge. With the provider perspective now fully modeled, [Chapter 14](../14-insurance-claims-coverage-pharmacy-benefits/index.md) turns to the payer side of the same transactions: how insurance coverage, claims, and pharmacy benefits attach to the patients and providers this chapter and the last one just built.

[See Annotated References](./references.md)
