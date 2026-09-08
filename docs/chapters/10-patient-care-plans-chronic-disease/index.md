---
title: Patient Care Plans and Chronic Disease Management
description: Extends patient graphs into longitudinal care -- lab data and biomarkers, versioned care plans, chronic disease management, outcomes, and diagnostic reports.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:10:10
version: 1.10
---

# Patient Care Plans and Chronic Disease Management

## Summary

This chapter extends the patient perspective from a single encounter into an ongoing care relationship. It covers lab tests and results, vital signs, care plans, and treatment timelines, then moves into chronic disease management, preventive care, and outcome measurement. Students learn how a patient's journey through the healthcare system accumulates into a rich, time-sequenced graph of clinical events.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Lab Test | 1 |
| Lab Result | 2 |
| Vital Sign | 1 |
| Patient Care Plan | 31 |
| Treatment Timeline | 2 |
| Patient Journey | 1 |
| Chronic Disease Management | 2 |
| Preventive Care | 1 |
| Patient Outcome | 26 |
| Quality Of Life Metric | 2 |
| Comorbidity | 1 |
| Family History | 2 |
| Genetic Marker | 1 |
| Biomarker | 21 |
| Imaging Study | 2 |
| Radiology Report | 1 |
| Pathology Report | 2 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 9: Patient Diagnosis, Treatment, and Medication](../09-patient-diagnosis-treatment-medication/index.md)

---

A single encounter graph, like the one Chapter 9 built around a diagnosis
and a prescription, captures a moment. Chronic disease does not live in a
moment — it lives in the space between visits, in the drift of a lab value
over six months, in whether a patient actually reached the treatment goal
her care team set for her. This chapter stretches the patient graph across
time: from individual lab tests and vital-sign readings, up through a
structured care plan, the ongoing loop of chronic disease management and
preventive screening, and finally the outcome measures that tell a graph,
and a care team, whether any of it worked.

!!! mascot-welcome "From One Visit to a Lifetime of Data"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Welcome back — this chapter is where the patient graph really starts to breathe, growing new nodes every time a lab comes back or a goal gets checked off. We'll follow Maria Chen's diabetes care across a full year of measurements, plans, and outcomes. Let's connect the dots!

## Lab Tests, Lab Results, and the Biomarkers They Measure

Every chronic-disease chart starts with raw measurement. A **lab test** is
an ordered laboratory procedure — a request that a specific analyte or
property be measured from a patient specimen, such as blood or urine.
Ordering the test creates one kind of clinical fact; the test coming back
creates another. A **lab result** is the value that a lab test returns,
always anchored to a timestamp, a unit, and a reference range. In a property
graph, this pair of facts is naturally two connected nodes:
`(:Patient)-[:HAS_LAB_RESULT]->(:LabResult {test: "Hemoglobin A1c", value:
8.4, unit: "%", date: "2024-01-15"})`. The edge answers "whose result is
this," while the node's properties answer "what was measured, when, and how
much." For Maria Chen, an HbA1c of 8.4% is well above the diagnostic and
treatment thresholds for Type 2 Diabetes, which is exactly why this single
lab result becomes the trigger for the care plan built later in this
chapter.

Not every measurement comes from a laboratory. A **vital sign** is a
specific, routinely measured type of biomarker — blood pressure, heart
rate, respiratory rate, temperature, and oxygen saturation are the five most
common — typically captured at the bedside or during a routine visit rather
than sent out to a lab. Vital signs share the same graph shape as lab
results (a dated, valued measurement attached to a patient) but are usually
recorded far more frequently, which makes them well suited to trend analysis
rather than single-point diagnosis.

**Lab Test**, **Lab Result**, and **Vital Sign** readings are all specific
instances of a broader idea: a **biomarker** is any measurable indicator of
a biological state or process — a signal, drawn from blood, urine, tissue,
or a blood-pressure cuff, that stands in for something happening inside the
body that cannot be observed directly. HbA1c is a biomarker for average
blood glucose over roughly three months; systolic blood pressure is a
biomarker for cardiovascular strain. Modeling biomarkers generically, rather
than creating a separate node type for every possible lab and vital sign, is
a deliberate schema decision: a shared measurement pattern can carry a
`type` property — `"HbA1c"`, `"Systolic BP"`, `"Heart Rate"` — so that a
single query can retrieve every measurement of a given kind across a
patient's entire history, regardless of whether it originated as a formal
lab test or a vital-sign check-in. That is exactly the query a
chronic-disease dashboard needs: return every HbA1c reading for Maria Chen,
ordered by date, so a clinician — or a graph — can see whether the trend is
improving. The MicroSim below plots this kind of biomarker trend directly:
blood pressure and heart rate over six months, for five different patients,
with the background shaded to mark clinical thresholds.

#### Diagram: Vital Signs Trend Visualization MicroSim

<iframe src="../../sims/vital-signs-trend-visualization-microsim/main.html" width="100%" height="578px" scrolling="no"></iframe>

<details markdown="1">
<summary>Vital Signs Trend Visualization MicroSim (reused)</summary>
Type: microsim
**sim-id:** vital-signs-trend-visualization-microsim<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/vital-signs-trend-visualization-microsim/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/vital-signs-trend-visualization-microsim

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: interpret, classify<br/>
Learning objective: Given six months of blood pressure and heart rate readings for five patients, the learner can interpret the trend and classify each reading against normal, elevated, and hypertensive zones.

Purpose: Provide the worked example and diagram for Biomarker by plotting Vital Sign readings (a specific, routinely-measured type of biomarker) over time, built from the same underlying Lab Test / Lab Result measurement pattern.

Reused from the MicroSim catalog. Systolic and diastolic blood pressure are plotted as lines against a shaded background split into normal, elevated, and hypertensive zones, with heart rate plotted on a secondary axis. A dropdown lets the learner switch between five patient profiles with different clinical trajectories, checkboxes isolate individual vital signs, and hovering any point on a line reveals the exact value and date of that measurement.

Implementation: p5.js line chart with dropdown patient selector, checkbox series toggles, and hover tooltips.
</details>

!!! mascot-tip "Don't Confuse the Category with the Instance"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A handy shortcut: if a measurement has a formal order and a turnaround time, it is probably a lab result; if it is checked at nearly every visit with no lab order at all, it is probably a vital sign. Both are biomarkers underneath — the label just tells you how the number got onto the chart.

Once a biomarker crosses a threshold — as Maria Chen's HbA1c did — the graph
needs a way to represent not just what was measured, but what the care team
decided to do about it.

## Patient Care Plans, Treatment Timelines, and the Patient Journey

A **patient care plan** is a structured, versioned set of goals,
interventions, and target dates that coordinates how a patient's condition
will be managed going forward. For Maria Chen, the care plan created after
the HbA1c result above might include a goal (`target: "HbA1c < 7.0%"`, `by:
"2024-12-01"`), an intervention (`"Start metformin 500mg twice daily"`), and
a monitoring instruction (`"Repeat HbA1c every 3 months"`). Modeled as a
graph, a care plan is not a single node holding a paragraph of text — it is
a small subgraph: `(:Patient)-[:HAS_CARE_PLAN]->(:CarePlan)-[:HAS_GOAL]
->(:Goal)`, with additional edges from the `CarePlan` node to `Intervention`
and `Medication` nodes. Splitting the plan into separate goal, intervention,
and monitoring nodes — rather than one flat text field — is what lets later
queries ask "how many of Maria's active goals has she met" without parsing
free text. Care plans are also rarely static: when a goal is missed or a lab
result changes, a new version of the plan is created rather than
overwriting the old one, so a traversal can always answer not just what the
current plan says, but what it used to say six months ago. That versioning
matters clinically as much as technically — a specialist picking up the case
mid-year needs to see the plan that was active on a given date, not only the
most recent one.

Executing a care plan generates a **treatment timeline** — the chronological
sequence of dated events that records how the plan actually unfolded: the
diagnosis date, the day metformin was started, the visit where the dose was
increased, and the date the HbA1c goal was finally met. Where the care plan
is the intent (what should happen), the treatment timeline is the record
(what did happen), and the graph keeps both because they frequently diverge
— a patient may miss a refill, or a dose increase may be delayed by a side
effect. Every event on the timeline is simply a dated node connected back to
the patient, which is why a single traversal ordered by date can reconstruct
an entire year of care without a dedicated timeline table.

Zoom out past a single condition's timeline and you reach the **patient
journey**: the complete, longitudinal path a patient takes through the
healthcare system across every encounter, diagnosis, and care plan over the
entire relationship, not just one disease. Maria Chen's patient journey
includes her diabetes treatment timeline, but also her annual physicals, any
unrelated injuries, and every referral she has ever received. A treatment
timeline is therefore a filtered slice of the broader patient journey —
scoped to one care plan — while the journey itself is the unfiltered
traversal across everything the patient node connects to. The MicroSim below
traces exactly this kind of journey for a single condition, letting you
hover over each month to see the underlying graph pattern behind the event.

#### Diagram: Patient Treatment Timeline Workflow Diagram

<iframe src="../../sims/patient-treatment-timeline-workflow-diagram/main.html" width="100%" height="613px" scrolling="no"></iframe>

<details markdown="1">
<summary>Patient Treatment Timeline Workflow Diagram (reused)</summary>
Type: workflow
**sim-id:** patient-treatment-timeline-workflow-diagram<br/>
**Library:** Mermaid<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/patient-treatment-timeline-workflow-diagram/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/patient-treatment-timeline-workflow-diagram

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: interpret, summarize<br/>
Learning objective: Given a 12-month Type 2 Diabetes treatment timeline, the learner can interpret how diagnosis, medication changes, and lab results appear as dated nodes and edges, and summarize how a patient care plan drives the sequence of events.

Purpose: Provide the worked example and diagram for Patient Care Plan, Treatment Timeline, and Patient Journey by tracing one patient's dated path through diagnosis, treatment, and goal achievement.

Reused from the MicroSim catalog. Every month-node on the timeline is clickable and colored by phase — diagnosis (blue), initial treatment (orange), dose adjustment (yellow), stabilization (green), and goal achievement (dark green) — and clicking a node opens an infobox with that month's clinical status, lab values, treatment changes, and the exact graph pattern used to store the event, e.g. `(:Patient)-[:HAS_CARE_PLAN]->(:CarePlan)-[:RECORDS_EVENT]->(:TimelineEvent {date: "2024-04-01"})`. Tracing the full 12 months shows the treatment timeline (the record of what happened) executing the intent set by the care plan, within the broader patient journey the timeline is a scoped slice of.

Implementation: Mermaid flowchart with click directives on every node, each bound to an infobox callback.
</details>

!!! mascot-thinking "One Diagram, Two Kinds of Time"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that every month in the timeline above is a real graph node with its own date property, not just a label on a picture. That is what lets a query ask "what changed between month 3 and month 9" and get a precise answer instead of a guess.

## Chronic Disease Management and Preventive Care

**Chronic disease management** is the ongoing, cyclical work of monitoring,
adjusting, and re-measuring a condition that will not resolve on its own —
Type 2 Diabetes, hypertension, and asthma are typical examples. Unlike an
acute encounter, which ends when the immediate problem is treated, chronic
disease management has no natural endpoint: the care plan, the treatment
timeline that records it, and the recurring biomarker trend from the
previous sections all feed back into each other in a loop that repeats for
years. In graph terms, chronic disease management is not a single node type
at all — it is the pattern formed when a care plan, a treatment timeline,
and a recurring biomarker measurement are all attached to the same condition
node and kept in sync over time.

**Preventive care** takes the opposite temporal stance: rather than
managing a condition after diagnosis, it consists of services delivered to
prevent a condition from starting or from progressing to a complication —
vaccinations, cancer screenings, and, for a diabetic patient like Maria
Chen, an annual diabetic retinopathy eye exam. Preventive care is modeled
the same way a lab test is — an ordered service tied to a patient and a
date — but a population-health query typically asks the opposite question:
not "what did this patient's last screening show," but "which eligible
patients have no recent screening at all." That second question, a gap
query, is what the MicroSim below simulates.

#### Diagram: Preventive Care Gap Closure MicroSim

<iframe src="../../sims/preventive-care-gap-closure/main.html" width="100%" height="588px" scrolling="no"></iframe>

<details markdown="1">
<summary>Preventive Care Gap Closure MicroSim (reused)</summary>
Type: microsim
**sim-id:** preventive-care-gap-closure<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/preventive-care-gap-closure/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/preventive-care-gap-closure

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: apply, execute<br/>
Learning objective: Given a 40-patient panel and a chosen preventive service, the learner can apply an eligibility filter followed by a recency filter to identify open preventive-care gaps, and execute a simulated outreach step to observe its effect on the gap-closure rate.

Purpose: Provide an applied, second worked example for Preventive Care and Chronic Disease Management by turning a screening guideline into a population-health gap query.

Reused from the MicroSim catalog. A synthetic 40-patient panel is filtered in two visible stages — first by eligibility (age, sex, condition), then by recency (whether the last relevant service falls outside the lookback window) — with eligible-but-overdue patients rendered orange, recently-served patients green, and ineligible patients dimmed. A dropdown selects the preventive service (Mammography, for example, restricts eligibility to women aged 40-74), a slider sets the lookback window, a "Run gap query" button applies both filters and reports the eligible count, open-gap count, and closure rate, and a "Simulate outreach" button closes roughly half of the open gaps so the learner can watch the closure rate rise.

Implementation: p5.js panel visualization with dropdown, slider, and two action buttons driving a two-stage filter animation.
</details>

!!! mascot-encourage "Population Queries Take Practice"
    ![Sage giving encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If chaining an eligibility filter and a recency filter feels like a lot at once, that's normal — population-health gap queries are genuinely one of the more layered patterns in this book, and you just watched one work step by step.

## Measuring Outcomes and Quality of Life

None of this — the care plan, the timeline, the preventive screening — means
anything without a way to check whether it worked. A **patient outcome** is
a measured result of care: a clinical improvement, a complication avoided,
a hospitalization that did or did not happen, over a defined window of
time. Outcomes are what turn chronic disease management from a set of good
intentions into an evaluable process, and in a graph they are modeled as
their own dated, valued nodes — often literally reusing the biomarker
pattern from earlier in the chapter, since "HbA1c fell from 8.4% to 6.9%
over twelve months" is both a biomarker trend and a patient outcome,
depending on which question you are asking of the same data. Other outcomes
are event counts rather than lab values: emergency-room visits per year,
hospital admissions per year, or whether a specific complication was ever
diagnosed. The chart below compares exactly this kind of population-level
outcome across roughly a thousand patients per arm, six separate measures at
once. Because a comparison like this is drawn from observational care data
rather than a randomized trial, a careful query also has to account for how
sick each population was to begin with, or an improvement can look larger —
or smaller — than it really is.

Not every outcome is a lab value or an event count. A **quality of life
metric** is a patient-reported measure of functional or psychological
well-being — how much pain interferes with daily activity, how confident a
patient feels managing their own condition — collected through standardized
instruments like the EQ-5D or PROMIS surveys rather than pulled from a lab
system. Quality of life metrics are a distinct outcome type precisely
because they cannot be derived from claims or lab data at all; the only way
such a node gets a value is if the patient reports it directly, which is why
these metrics are typically attached to the patient through a dated survey
edge. Tracking quality of life alongside clinical biomarkers is part of what
distinguishes mature chronic disease management from a program that only
watches lab numbers.

#### Diagram: Patient Outcome Metrics Dashboard Chart

<iframe src="../../sims/patient-outcome-metrics-dashboard-chart/main.html" width="100%" height="496px" scrolling="no"></iframe>

<details markdown="1">
<summary>Patient Outcome Metrics Dashboard Chart (reused)</summary>
Type: chart
**sim-id:** patient-outcome-metrics-dashboard-chart<br/>
**Library:** Chart.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/patient-outcome-metrics-dashboard-chart/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/patient-outcome-metrics-dashboard-chart

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: compare, examine<br/>
Learning objective: Given six 12-month diabetes outcome measures for traditional versus graph-enhanced care coordination, the learner can compare the two arms and examine which measures reflect chronic-disease-management quality versus reduced utilization.

Purpose: Provide the worked example and diagram for Patient Outcome, reinforcing Quality of Life Metric and Chronic Disease Management by comparing outcome measures between two coordination models.

Reused from the MicroSim catalog. A grouped bar chart compares traditional care against graph-enhanced care coordination across six outcome measures, including retinopathy screening rate (a preventive-care outcome, rising from 38% to 79%) and ER visits per 100 patients (a utilization outcome, falling 46%). Hovering any bar reveals its exact value, and the tooltip flags which measures are "higher is better" versus "lower is better."

Implementation: Chart.js grouped bar chart with hover tooltips and a labeled legend distinguishing the two care-coordination arms.
</details>

!!! mascot-thinking "Better Numbers, or a Healthier Population?"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Every bar in that chart moved the right direction, but here's a tentacle-y question: did graph-coordinated care cause the improvement, or did a healthier group of patients simply end up in that arm? Untangling correlation from causation is exactly the kind of knot a good risk-adjustment analysis has to work through.

## Modeling Patient Risk Factors

A chronic disease rarely travels alone, and a care team's decisions depend
heavily on what else is true about the patient. A **comorbidity** is an
additional chronic condition present alongside the primary one being
managed — Maria Chen's hypertension, diagnosed the same year as her
diabetes, is a comorbidity that changes which medications are safe to
prescribe. **Family history** captures conditions documented among a
patient's relatives rather than the patient herself — Maria's mother's Type
2 Diabetes diagnosis is recorded as family history, not as Maria's own
condition, but it still informs her risk profile and screening schedule. A
**genetic marker** goes a level deeper still: a specific, lab-confirmed DNA
variant statistically associated with disease risk, such as a TCF7L2
variant linked to Type 2 Diabetes susceptibility. All three are risk
factors, but they differ in how directly they connect to the patient node
and how confidently they predict anything — a lab-confirmed genetic marker
is a much stronger, but far rarer, signal than a family history entry based
on a patient's own recollection. The table below summarizes how each risk
factor attaches to the patient graph.

| Risk Factor | What It Represents | Graph Modeling Pattern |
|---|---|---|
| Comorbidity | An additional chronic condition present alongside the primary diagnosis | Second `(:Patient)-[:HAS_CONDITION]->(:Condition)` edge on the same patient node |
| Family History | A condition documented in a relative, not the patient | `(:Patient)-[:HAS_FAMILY_HISTORY_OF {relation: "mother"}]->(:Condition)` |
| Genetic Marker | A lab-confirmed DNA variant associated with disease risk | `(:Patient)-[:HAS_GENETIC_MARKER]->(:GeneticMarker {gene: "TCF7L2", risk_allele: "T"})` |

!!! mascot-warning "Handle This Data with Extra Care"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Genetic markers and family history are some of the most sensitive properties a patient graph can hold — they reveal information about relatives who never consented to being in the database at all. We won't untangle the legal details until the security chapters, but keep that discomfort in mind now.

## Diagnostic Reports: Imaging, Radiology, and Pathology

Chronic disease management also generates a steady stream of diagnostic
reports, each following the same basic shape but drawing from a different
specialty. An **imaging study** is a structured record of an imaging
procedure — its modality (X-ray, CT, MRI, or, for Maria's diabetic eye
exam, retinal photography), the body part examined, and the date performed
— modeled as a node connected to the ordering encounter. A **radiology
report** is the radiologist's narrative interpretation of that imaging
study, typically returned within 24-48 hours and coded using RadLex for
anatomical and procedural terms or LOINC for the report type itself, so
that "diabetic retinopathy screening result" means the same thing across
every facility in a network. A **pathology report** plays the equivalent
role for tissue and specimen analysis rather than imaging — a biopsy result,
for example — and is coded predominantly in SNOMED CT, which captures
fine-grained clinical findings that a purely anatomical code system cannot
express. Turnaround time differs sharply between the two: a radiology
report is often available same-day, while a pathology report frequently
takes several days to a week because it depends on physical tissue
processing rather than image capture. The table below lays out the three
report types side by side.

| Report Type | Typical Specimen / Modality | Typical Turnaround | Standard Coding System |
|---|---|---|---|
| Imaging Study | X-ray, CT, MRI, retinal photography | Minutes to hours to capture | RadLex (procedure/anatomy) |
| Radiology Report | Interpretation of an imaging study | 24-48 hours | RadLex / LOINC |
| Pathology Report | Biopsy or other tissue specimen | Several days to a week | SNOMED CT |

## Chapter Summary

Over the course of this chapter, Maria Chen's graph grew from a single
diagnosis into a full year of longitudinal care: lab results and vital
signs feeding biomarker trends, a versioned care plan driving a dated
treatment timeline within her broader patient journey, chronic disease
management and preventive screening running as parallel ongoing loops,
outcome and quality-of-life measures closing the feedback loop, and risk
factors and diagnostic reports enriching the picture around her. None of
this required a new kind of node — only dates, properties, and edges,
applied patiently over time.

!!! mascot-celebration "A Full Year of Care, Modeled as a Graph"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just mastered lab tests, lab results, vital signs, biomarkers, patient care plans, treatment timelines, patient journeys, chronic disease management, preventive care, patient outcomes, quality of life metrics, comorbidity, family history, genetic markers, imaging studies, radiology reports, and pathology reports. Every one of them turned out to be a node, an edge, or a property you already knew how to build.

[Chapter 11](../11-specialty-care-surgery-remote-monitoring/index.md) carries
this same longitudinal thinking into specialty care, surgical episodes, and
remote patient monitoring, where the "dated node attached to a patient"
pattern you just used for labs and outcomes reappears for surgical events
and continuous device-generated data streams.

[See Annotated References](./references.md)
