---
title: Specialty Care, Surgery, and Remote Monitoring
description: Models the post-surgical care pathway, remote monitoring and telehealth data, and behavioral health, neurodiversity, and palliative care as graphs.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:10:10
version: 1.10
---

# Specialty Care, Surgery, and Remote Monitoring

## Summary

This chapter covers more specialized patient data: genetic markers and biomarkers, imaging and pathology reports, and the surgical and post-operative care pathway through discharge and rehabilitation. It concludes with the modern, technology-driven side of patient care -- patient portals, wearable device data, remote patient monitoring, and telehealth -- along with behavioral health and palliative care. This chapter completes the patient perspective before the book turns to the provider perspective.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Surgical Procedure | 1 |
| Post-Operative Care | 16 |
| Rehabilitation Plan | 2 |
| Discharge Summary | 1 |
| Readmission Risk | 2 |
| Care Transition | 1 |
| Patient Portal | 11 |
| Patient-Reported Outcome | 2 |
| Wearable Device Data | 1 |
| Remote Patient Monitoring | 2 |
| Telehealth Visit | 1 |
| Behavioral Health Condition | 6 |
| Neurodiversity | 2 |
| Mental Health Screening | 1 |
| Substance Use Disorder | 2 |
| Palliative Care | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 10: Patient Care Plans and Chronic Disease Management](../10-patient-care-plans-chronic-disease/index.md)

---

Chapter 10 modeled the steady, month-to-month rhythm of chronic disease
management. This chapter shifts to two very different rhythms: the short,
high-stakes arc of a surgical episode, and the continuous, always-on stream
of data produced by wearables and remote monitoring. It closes out the
patient perspective with two concept clusters that resist easy labels --
behavioral health and palliative care -- both of which demand a graph model
precise enough to keep a diagnosis, a difference, and a choice about the
goals of care from blurring into one another.

!!! mascot-welcome "A Different Kind of Care Journey"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    This chapter follows a patient from the operating room through recovery, home, and the always-on world of wearables and telehealth -- and then into the more sensitive territory of behavioral health, neurodiversity, and palliative care. Every one of these topics deserves a graph model that is both technically sound and genuinely respectful of the person behind the data. Let's connect the dots!

## From Surgical Procedure to Discharge

A hospital stay for surgery begins with a **Surgical Procedure** node: a
discrete clinical event carrying a procedure code (typically CPT or
ICD-10-PCS), the performing surgeon, the anesthesia type, the surgical site,
and the date and duration of the operation. In a labeled property graph, this
node sits at the center of a small neighborhood of edges -- `PERFORMED_BY` to
the surgeon, `PERFORMED_AT` to the facility, and `PERFORMED_FOR` to the
patient -- giving every downstream care event a single, unambiguous anchor to
reference.

Everything that happens next is grouped under **Post-Operative Care**: the
structured period of monitoring that follows an operation, during which
clinicians track vital signs, check the surgical wound, manage pain, and
watch for complications such as infection or blood clots. Modeled as a
graph, post-operative care is not one node but a connected sequence of
observation events, each linked back to the Surgical Procedure it follows and
forward to whatever event -- another observation, an intervention, or
eventually discharge -- comes next.

A post-operative monitoring window typically tracks:

- Vital signs (heart rate, blood pressure, temperature, oxygen saturation) at a defined frequency
- Wound assessments (drainage, redness, healing progress)
- Pain scores on a standardized scale
- Complication flags (infection, deep vein thrombosis, adverse drug reaction)

When the care team determines the patient is ready to leave the inpatient
setting, that decision is captured in a **Discharge Summary**: a document
node that consolidates the diagnoses treated, procedures performed,
medications prescribed, and follow-up instructions into a single record that
formally closes the inpatient episode. The Discharge Summary is the last node
written inside the hospital encounter and the first one read by whoever
provides care next.

That handoff itself is a distinct concept worth naming: a **Care Transition**
models the movement of a patient, and their information, from one care
setting to another -- in this case, out of the hospital. Care transitions are
exactly the point in a patient's graph where information loss is most likely,
because two different systems, often run by two different organizations,
must agree on what happened and what needs to happen next. A Care Transition
edge branches to one of at least two destinations: home with home health
services, or a skilled nursing facility for a longer recovery.

If a patient is discharged into that second path, or even home with
services, they are typically handed a **Rehabilitation Plan**: a structured
schedule of physical, occupational, or speech therapy sessions, each with
measurable goals (for example, "walk 100 feet unassisted within two weeks").
The Rehabilitation Plan node connects back to the Surgical Procedure that
made it necessary and forward to the individual therapy sessions that will be
logged as it progresses.

None of this monitoring is only about the current stay -- it also feeds a
forward-looking prediction. A **Readmission Risk** score estimates the
likelihood that a patient will be back in the hospital within a defined
window, typically 30 days, and it is one of the clearest examples in this
book of a value that is computed *from* the graph rather than stored as a raw
fact. A readmission risk model commonly draws on:

- Comorbidity count -- how many other diagnosed conditions the patient carries
- Length of stay -- how many days the current admission lasted
- Discharge disposition -- which Care Transition destination was chosen
- Prior admissions in the last 12 months -- how many times this patient has already been hospitalized

!!! mascot-tip "Follow the Edges Backward"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Every one of those four risk factors is reachable by walking just one or two edges away from the Readmission Risk node -- comorbidities through DIAGNOSED_WITH edges, length of stay from the admission and discharge dates, disposition from the Care Transition edge itself. That is the real payoff of graph-based risk modeling: you can always trace a score back to the exact facts that produced it.

#### Diagram: Post-Surgical Care Transition Workflow

<iframe src="../../sims/post-surgical-care-transition-workflow/main.html" width="100%" height="882px" scrolling="no"></iframe>

<details markdown="1">
<summary>Post-Surgical Care Transition Workflow</summary>
Type: workflow
**sim-id:** post-surgical-care-transition-workflow<br/>
**Library:** vis-network<br/>
**Status:** Validated

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, differentiate<br/>
Learning objective: Examine a post-surgical care workflow and differentiate which upstream, graph-visible factors feed the computed Readmission Risk score.

Purpose: Let the learner trace the path from a surgical episode through discharge and care transition to a computed readmission-risk score, discovering by clicking which upstream facts actually feed that score.

Components to show (nodes, left to right in a directed layout):
1. Surgical Procedure (blue rounded rectangle) -- properties: procedure_code, surgeon, anesthesia_type, date
2. Post-Operative Monitoring (teal rounded rectangle) -- properties: vital_signs, wound_status, pain_score, complication_flag
3. Discharge Summary (gray document-shaped node) -- properties: diagnoses, medications, follow_up_instructions
4. Care Transition (orange diamond decision node) -- branches to two destinations
5a. Home with Home Health (green rounded rectangle)
5b. Skilled Nursing / Rehab Facility (green rounded rectangle)
6. Readmission Risk (red octagon "result" node) -- property: risk_score (0-100)

Edges:
- Surgical Procedure -> Post-Operative Monitoring ("FOLLOWED_BY")
- Post-Operative Monitoring -> Discharge Summary ("LEADS_TO")
- Discharge Summary -> Care Transition ("INITIATES")
- Care Transition -> Home with Home Health ("ROUTES_TO", solid line)
- Care Transition -> Skilled Nursing / Rehab Facility ("ROUTES_TO", solid line)
- Four dashed contributing-factor edges into Readmission Risk: from a "Comorbidity Count" mini-node, a "Length of Stay" mini-node (attached to Post-Operative Monitoring), a "Discharge Disposition" mini-node (attached to Care Transition), and a "Prior Admissions (12 mo)" mini-node

Visual style: Left-to-right directed workflow graph with one decision branch; the four contributing-factor nodes are drawn smaller and in a muted purple, feeding into Readmission Risk from below to visually distinguish "process" nodes from "input" nodes.

Color scheme: Blue/teal for the surgical and monitoring steps, orange for the decision point, green for the two transition destinations, purple for contributing-factor inputs, red for the final risk node.

Interactive controls:
- Click any node to open an infobox with its definition and property list (matching the definitions given in the surrounding text)
- Click the Readmission Risk node specifically to reveal a breakdown panel listing all four contributing factors with a sample numeric value for each (e.g., "Comorbidity Count: 3", "Length of Stay: 6 days", "Discharge Disposition: Skilled Nursing Facility", "Prior Admissions (12 mo): 1") and the resulting sample score
- Hover any edge to see a one-line description of the relationship it represents
- Toggle button: "Highlight risk inputs only" -- dims every node except the four contributing-factor nodes and the Readmission Risk node, isolating the subgraph the score actually depends on
- Zoom and pan enabled on the canvas

Instructional Rationale: This is an Analyze-level objective (examine, differentiate), so the design deliberately avoids a passive animation and instead rewards active exploration: the learner must click into the Readmission Risk node to discover which of the many upstream nodes actually feed it, then use the "Highlight risk inputs only" toggle to visually confirm that discovery against the full workflow. This mirrors the real analytical skill the section teaches -- tracing a computed value back to the graph structure that produced it -- rather than simply watching the workflow animate start to finish.

Implementation: vis-network JavaScript library with a hierarchical (left-to-right) layout option; infobox rendered as a fixed side panel updated on node/edge click.
</details>

## The Connected Patient: Portals, Wearables, and Remote Monitoring

Once a patient leaves the hospital, most of their data no longer arrives
through a clinical encounter at all -- it arrives continuously, from devices
and applications the patient controls. The hub for that relationship is the
**Patient Portal**: a secure web or mobile application through which a
patient views their own results, messages their care team, schedules
appointments, and reviews their medical record. In graph terms, the Patient
Portal is best modeled as an aggregating node that a Patient `ACCESSES`, and
which in turn connects out to several different kinds of patient-originated
data.

One of those data types is the **Patient-Reported Outcome**, or PRO: a
structured survey, often built from a standardized instrument, that captures
how the patient says they are doing -- pain, mobility, mood, or quality of
life -- in the patient's own words rather than a clinician's observation. A
PRO node is created when a Patient `SUBMITS` a survey, typically through the
portal, and it carries properties like the instrument name, the questions and
responses, and a computed score.

A second, very different data type comes from a **Wearable Device Data**
stream: continuous measurements produced by a device the patient wears, such
as a smartwatch or a continuous glucose monitor. Where a PRO is a single
self-reported snapshot, wearable data is high-frequency and objective -- a
Patient `WEARS` a Wearable Device node, which `GENERATES` a running stream of
individual vital-sign or biomarker reading nodes.

The table below makes that contrast concrete before the two data types
reappear together in the diagram.

| Data Source | Who Generates It | Frequency | Example Value |
|---|---|---|---|
| Patient-Reported Outcome | The patient, self-reporting | Periodic (survey-based) | "Pain: 6/10 today" |
| Wearable Device Data | The device, automatically | Continuous or high-frequency | "Heart rate: 118 bpm at 2:14 PM" |

!!! mascot-thinking "Two Very Different Kinds of Truth"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    A Patient-Reported Outcome and a stream of Wearable Device Data can disagree, and that's not a data-quality bug -- a patient can report feeling fine while their device shows an irregular heart rhythm, or report pain while every vital sign looks normal. A good graph model keeps both kinds of nodes intact instead of collapsing them into a single "how is the patient doing" value.

Both data streams typically feed into **Remote Patient Monitoring**, or RPM:
the clinical program and its supporting algorithm that continuously ingest
wearable readings (and often PRO responses) and apply threshold rules to
detect trends that need attention -- a resting heart rate climbing steadily
over several days, for instance. When an RPM algorithm crosses a defined
threshold, it `TRIGGERS` an alert, which most commonly `SCHEDULES` a
**Telehealth Visit**: a clinical encounter conducted remotely over live video
or audio rather than in person. The Telehealth Visit closes the loop, turning
a pattern detected in a data stream back into an actual conversation between
patient and clinician.

#### Diagram: Remote Monitoring Data Flow Graph Model

<iframe src="../../sims/remote-monitoring-data-flow-graph-model/main.html" width="100%" height="882px" scrolling="no"></iframe>

<details markdown="1">
<summary>Remote Monitoring Data Flow Graph Model</summary>
Type: graph-model
**sim-id:** remote-monitoring-data-flow-graph-model<br/>
**Library:** vis-network<br/>
**Status:** Validated

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: explain, classify<br/>
Learning objective: Explain how patient-generated data (portal, PRO, wearable) flows through a remote patient monitoring process into a telehealth visit, and classify each node by whether it is patient-originated or system-generated.

Purpose: Show learners the complete graph-model path from a patient's own devices and self-reports through an RPM algorithm to a scheduled telehealth visit, and the separate but related path through the patient portal.

Node types to show (color-coded):
1. Patient (pink circle) -- the central node
2. Wearable Device (light blue square) -- properties: device_type, manufacturer
3. Vital Sign / Biomarker Reading (small light blue circles, shown as a cluster of 3-4) -- properties: value, unit, timestamp
4. RPM Algorithm (gray gear-shaped node) -- properties: threshold_rule, evaluation_frequency
5. Alert (orange triangle) -- properties: severity, triggered_at
6. Telehealth Visit (green circle) -- properties: scheduled_time, modality (video/audio)
7. Patient-Reported Outcome (purple square) -- properties: instrument_name, score
8. Patient Portal (dark blue hexagon) -- aggregates PRO and secure messaging

Edge types to show:
1. Patient --WEARS--> Wearable Device
2. Wearable Device --GENERATES--> Vital Sign / Biomarker Reading (one edge per reading in the cluster)
3. Vital Sign / Biomarker Reading --FEEDS--> RPM Algorithm
4. RPM Algorithm --TRIGGERS--> Alert
5. Alert --SCHEDULES--> Telehealth Visit
6. Patient --SUBMITS--> Patient-Reported Outcome
7. Patient --ACCESSES--> Patient Portal
8. Patient-Reported Outcome --VISIBLE_IN--> Patient Portal (dashed, showing portal aggregates PRO data)

Data Visibility Requirements:
Stage 1: Show only the Patient node and the two paths branching from it unlabeled (toward Wearable Device and toward Patient Portal), so the learner first sees there are two distinct data origins.
Stage 2: On clicking the Wearable Device node, reveal the GENERATES edges to 3-4 concrete Vital Sign / Biomarker Reading nodes with real example values (e.g., heart rate 72, 74, 118, 76 bpm across four timestamps).
Stage 3: On clicking the RPM Algorithm node, show the actual threshold rule being evaluated (e.g., "alert if heart rate > 100 bpm for 3 consecutive readings") applied against the visible readings, with the triggering reading highlighted.
Stage 4: On clicking the Alert node, reveal the resulting Telehealth Visit node with its scheduled time, closing the loop back to a human encounter.
Stage 5: On clicking the Patient Portal node, reveal its aggregation of the Patient-Reported Outcome node and a placeholder "secure messaging" property, showing the second, parallel path.

Interactive controls:
- Click any node: opens a side-panel infobox with the node's label, definition, and properties
- Hover any edge: shows a tooltip naming the relationship type and a one-sentence description
- Button: "Play data flow" -- animates a small pulse traveling from Wearable Device through to Telehealth Visit at a fixed pace, pausing at each node long enough for the infobox to display
- Zoom and pan enabled

Instructional Rationale: The objective is Understand-level (explain, classify), so per the interaction-pattern guidance this specification favors staged data reveal and concrete values over continuous animation. Showing the actual threshold rule and the specific reading that crosses it (Stage 3) is what lets a learner explain *why* an alert fired rather than simply seeing that one did, and separating the two origin paths (device vs. portal/PRO) supports the classification half of the objective.

Implementation: vis-network JavaScript library with a two-branch layout radiating from the central Patient node; side panel rendered as fixed-position HTML updated via vis-network's click event.
</details>

## Behavioral Health, Neurodiversity, and Palliative Care

The final cluster of concepts in this chapter requires a different kind of
care in modeling, because the categories involved carry real stakes for how
patients are treated and how they see themselves. A **Behavioral Health
Condition** is a diagnosed mental health or substance use condition -- major
depressive disorder, generalized anxiety disorder, and similar diagnoses fall
into this node type, modeled with the same rigor (diagnosis codes, onset
date, severity) as any other Condition node from earlier chapters.

Diagnosis rarely happens without a screening step first. A **Mental Health
Screening** is a standardized instrument administered to a patient -- the
PHQ-9 for depression, the GAD-7 for anxiety, or the AUDIT-C for risky alcohol
use -- that produces a numeric `SCORE` property, which is compared against a
published clinical threshold to determine a `POSITIVE` or `NEGATIVE` result.
A screening node connects to the patient who took it and, when positive,
typically `SCREENS_FOR` the specific Behavioral Health Condition it is
designed to detect.

The AUDIT-C screening result feeds directly into one specific condition
category worth naming on its own: a **Substance Use Disorder** is a
diagnosed pattern of impaired control over alcohol or drug use, and it is
modeled as its own condition type -- both because it has its own clinical
criteria and because it is subject to additional confidentiality protections
under U.S. federal law (42 CFR Part 2) that do not apply to most other
diagnoses, which affects how access to those nodes must be governed later in
this book.

!!! mascot-warning "A Screening Score Is Not a Label for a Person"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    It's tempting to treat a positive PHQ-9 or AUDIT-C result as equivalent to the diagnosis it screens for, but a screening score is only ever a signal that a fuller clinical evaluation is warranted -- model it as a separate node connected to, not merged with, the Behavioral Health Condition it may lead to.

Not every difference belongs in that diagnostic frame at all.
**Neurodiversity** refers to conditions such as autism and ADHD that this
book models as a distinct node category representing a different, not
disordered, way of thinking and processing the world -- not as something
requiring a positive/negative screening result the way a Behavioral Health
Condition does. Keeping Neurodiversity structurally separate from the
screening-and-diagnosis pathway is a deliberate modeling choice: it prevents
a graph query from accidentally treating "autistic" the same way it treats
"screened positive for depression," which would misrepresent both.

Finally, a care model that runs in parallel to all of this, and applies to a
much broader population than behavioral health alone, is **Palliative
Care**: specialized medical care for a patient with a serious illness,
focused on relief from symptoms, pain, and stress, and on improving quality
of life for the patient and their family. Palliative Care is available at
any stage of a serious illness, alongside curative treatment, and connects to
a patient through its own care-team and goals-of-care nodes rather than
through any screening or diagnosis pathway -- it answers a different question
("what matters most to this patient right now?") than either a Behavioral
Health Condition diagnosis or a Neurodiversity classification does.

The comparison below summarizes how these four categories differ in what
they represent and how they connect into the graph.

| Concept | What It Represents | Modeled As |
|---|---|---|
| Behavioral Health Condition | A diagnosed mental health or substance use condition | Condition node, reached via screening or clinical diagnosis |
| Substance Use Disorder | A diagnosed pattern of impaired substance control | Condition node with additional confidentiality protections |
| Neurodiversity | A different, not disordered, way of thinking (e.g., autism, ADHD) | Distinct node category, not a screened/diagnosed condition |
| Palliative Care | A parallel care model focused on comfort and quality of life | Care-team and goals-of-care nodes, independent of diagnosis type |

!!! mascot-encourage "This Is Genuinely Hard to Model Well"
    ![Sage cheering you on](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If keeping these categories straight feels harder than the earlier graph diagrams in this book, that's because it is -- getting the data model right here means getting how real people are represented right. You're doing exactly the kind of careful thinking this field needs.

#### Diagram: Behavioral Health Screening Graph Model

<iframe src="../../sims/behavioral-health-screening-graph-model/main.html" width="100%" height="882px" scrolling="no"></iframe>

<details markdown="1">
<summary>Behavioral Health Screening Graph Model</summary>
Type: graph-model
**sim-id:** behavioral-health-screening-graph-model<br/>
**Library:** vis-network<br/>
**Status:** Validated

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: differentiate, classify<br/>
Learning objective: Differentiate a screened-and-diagnosed Behavioral Health Condition pathway from the structurally separate Neurodiversity and Palliative Care node categories, and classify each screening instrument by the condition it detects.

Purpose: Show learners that standardized screening instruments feed specific behavioral health diagnoses through a SCREENS_FOR/SCORE/result pathway, while Neurodiversity and Palliative Care are modeled as deliberately separate branches that do not run through that same screening logic.

Node types to show (color-coded):
1. Patient (pink circle) -- central node
2. PHQ-9 (light blue rounded rectangle) -- screening instrument, property: score (0-27)
3. GAD-7 (light blue rounded rectangle) -- screening instrument, property: score (0-21)
4. AUDIT-C (light blue rounded rectangle) -- screening instrument, property: score (0-12)
5. Behavioral Health Condition: Depression (orange diamond)
6. Behavioral Health Condition: Anxiety (orange diamond)
7. Substance Use Disorder (orange diamond, slightly different border style to flag its extra confidentiality property)
8. Neurodiversity: Autism (purple hexagon, visually separated from the orange cluster)
9. Neurodiversity: ADHD (purple hexagon)
10. Palliative Care (green hexagon, visually separated on the opposite side)

Edge types to show:
1. Patient --TAKES--> each screening instrument
2. Each screening instrument --SCREENS_FOR--> its corresponding Behavioral Health Condition (or Substance Use Disorder for AUDIT-C), labeled with the SCORE property and a POSITIVE/NEGATIVE result flag
3. Patient --HAS--> each Neurodiversity node (dashed edge, styled differently to visually signal "no screening score attached")
4. Patient --RECEIVES--> Palliative Care (dashed edge, also styled without a score)

Visual style: Three visually separated clusters radiating from the central Patient node -- a screening-and-diagnosis cluster (blue instruments -> orange conditions), a Neurodiversity cluster (purple, dashed edges, no score), and a Palliative Care node (green, dashed edge, no score) -- so the structural separation described in the text is visible in the layout itself, not just in a legend.

Color scheme: Light blue for screening instruments, orange for diagnosed behavioral health conditions (including Substance Use Disorder), purple for Neurodiversity, green for Palliative Care, pink for the Patient.

Interactive controls:
- Click a screening instrument node: opens an infobox showing its full name, what it screens for, its score range, and the clinical threshold that separates POSITIVE from NEGATIVE
- Click a SCREENS_FOR edge: reveals a worked example with a sample score (e.g., "PHQ-9 score of 14 -> POSITIVE, moderate depression range")
- Click the Neurodiversity or Palliative Care nodes: opens an infobox explicitly stating why the edge has no score/threshold, reinforcing the differentiate objective
- Toggle button: "Group by cluster" -- visually separates the three clusters further apart when enabled, and collapses them back near the Patient node when disabled, letting the learner compare the clustered/unclustered view
- Zoom and pan enabled

Instructional Rationale: This is an Analyze-level objective (differentiate, classify), so the specification is built around comparison rather than single-path exploration: the three-cluster layout, the deliberately different edge styling (scored vs. unscored), and the "Group by cluster" toggle all give the learner direct evidence for the structural claim made in the text -- that Neurodiversity and Palliative Care are not modeled through the same screening-and-diagnosis logic as a Behavioral Health Condition, even though all three connect to the same Patient node.

Implementation: vis-network JavaScript library with a radial layout grouped by cluster; infobox rendered as a fixed side panel updated on node/edge click; edge dash pattern toggled via vis-network edge styling options.
</details>

## Chapter Summary

!!! mascot-celebration "You've Modeled the Full Patient Journey"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just worked through the surgical and post-operative pathway (Surgical Procedure, Post-Operative Care, Rehabilitation Plan, Discharge Summary, Care Transition, and Readmission Risk), the connected-patient cluster (Patient Portal, Patient-Reported Outcome, Wearable Device Data, Remote Patient Monitoring, and Telehealth Visit), and the behavioral health cluster (Behavioral Health Condition, Mental Health Screening, Substance Use Disorder, Neurodiversity, and Palliative Care). That completes the patient perspective this book set out to build.

Taken together, these sixteen concepts close the loop on modeling a single
patient's experience: from an acute surgical episode, through recovery and
care transition, into the continuous data streams of modern remote care, and
finally through the more sensitive territory of behavioral health,
neurodiversity, and palliative care -- each modeled with the structural
precision the earlier chapters established, and each requiring the kind of
careful, respectful category choices this chapter emphasized.
[Chapter 12](../12-provider-organizations-networks-scheduling/index.md) turns
the camera around, leaving the patient's point of view behind to model the
provider organizations, networks, and scheduling systems that make all of
this care possible in the first place.
