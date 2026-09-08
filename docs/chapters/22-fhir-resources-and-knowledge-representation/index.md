---
title: FHIR Resources and Levels of Knowledge Representation
description: The HL7 FHIR standard, its core clinical resources, and the Four Levels of Knowledge Representation used to author computable clinical guidelines.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:10:36
version: 1.10
---

# FHIR Resources and Levels of Knowledge Representation

## Summary

This chapter opens the book's clinical decision support unit by introducing the HL7 FHIR standard and its core resources -- Patient, Condition, Observation, MedicationRequest, Encounter, CarePlan, and the PlanDefinition/ActivityDefinition resources used to represent clinical logic. It then introduces the Four Levels of Knowledge Representation (Narrative, Semi-Structured, Structured, and Executable) and the three Tiers of Functionality (Data, Logic, and Forms/UI) that classify how clinical knowledge is authored and consumed. Students finish able to classify a clinical decision support artifact by its representation level and functional tier.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| FHIR Standard | 167 |
| FHIR Resource | 4 |
| FHIR Server | 1 |
| FHIR RESTful API | 2 |
| Patient Resource | 1 |
| Condition Resource | 158 |
| Observation Resource | 2 |
| MedicationRequest Resource | 1 |
| Encounter Resource | 2 |
| CarePlan Resource | 1 |
| PlanDefinition Resource | 153 |
| ActivityDefinition Resource | 3 |
| Knowledge Representation Level | 2 |
| Narrative Level | 6 |
| Semi-Structured Level | 1 |
| Structured Level | 143 |
| Executable Level | 14 |
| Tiers Of Functionality | 1 |
| Data Tier | 2 |
| Logic Tier | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 8: Healthcare Interoperability and Care Coordination](../08-healthcare-interoperability-care-coordination/index.md)
- [Chapter 20: AI, LLMs, and Knowledge Graphs for Healthcare](../20-ai-llms-and-knowledge-graphs-for-healthcare/index.md)

---

Every clinical decision support system needs two things before it can reason about a patient at all: an agreed-upon shape for clinical data, and an agreed-upon way to classify how "computable" a piece of clinical knowledge actually is. This chapter introduces both. We return to Maria Chen, the patient from Chapter 1, and see her graph of diagnoses, providers, and treatments re-expressed in the vocabulary the healthcare industry actually uses to exchange this information: HL7 FHIR.

!!! mascot-welcome "Same Graph, New Vocabulary"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Hi there! Get ready to meet FHIR — the standard that lets every hospital, app, and clinical system speak the same clinical language. Good news: you already know most of the underlying idea from Chapter 1, since a FHIR resource bundle is basically a graph wearing a slightly fancier outfit. Let's connect the dots!

## The FHIR Standard: Resources as the Unit of Interoperability

The **FHIR Standard** (Fast Healthcare Interoperability Resources, pronounced "fire") is the HL7 specification that defines a common data format and a common web-based exchange protocol for clinical and administrative healthcare information. FHIR exists to solve a problem this book has referenced since Chapter 1: healthcare data is scattered across many independently built systems, and without a shared standard, every pair of systems that need to exchange data would need its own custom, hand-built integration. FHIR replaces those countless custom integrations with a single, consistent format that any conformant system can read and write.

The basic unit of FHIR data is a **FHIR resource**: a self-contained, typed unit of clinical or administrative data — a patient, a diagnosis, a lab result — represented as structured JSON or XML with a defined set of fields specific to that resource type. Every resource carries a `resourceType` field, a unique `id`, and, in most clinical resources, a `subject` or `patient` field that references the patient the resource is about. That reference field is the detail worth pausing on, because it is the exact same idea as an edge in a labeled property graph: a `Condition` resource's `subject` reference to a `Patient` resource is structurally identical to the `DIAGNOSED_WITH` edge from Chapter 1, just expressed as a JSON pointer (`"subject": {"reference": "Patient/maria-chen"}`) instead of a drawn arrow.

FHIR resources are exchanged over the web using the **FHIR RESTful API**: a standardized set of HTTP operations — `GET` to read a resource, `POST` to create one, `PUT` to update one, `DELETE` to remove one — applied to predictable URL patterns such as `GET /Patient/maria-chen` or `GET /Condition?patient=maria-chen`. A **FHIR server** is the software system that implements this RESTful API, storing resources and answering these HTTP requests — every certified EHR vendor now ships a FHIR server, which is precisely what allows a third-party app to request "give me this patient's active conditions" using one standard URL pattern regardless of which EHR vendor is running underneath.

FHIR is not the industry's first attempt at a healthcare data standard, and understanding what it replaced explains why it looks the way it does. Its predecessors — HL7 Version 2 messaging (a pipe-delimited text format from the 1980s) and the Clinical Document Architecture (CDA, an XML document format for whole clinical notes) — were built around exchanging entire messages or entire documents as a single unit, which made it hard for an application to request just one specific fact. FHIR's resource-per-concept design and its use of ordinary REST and JSON, the same web technologies powering most consumer mobile apps, was a deliberate choice to lower the barrier to entry: any developer who already knows how to call a REST API can start building FHIR-based healthcare software without first learning a healthcare-specific message format.

A worked example makes the request-response cycle concrete: an app requesting Maria Chen's active conditions sends `GET https://fhir.riversideclinic.org/Condition?patient=maria-chen&clinical-status=active` to the clinic's FHIR server. The server looks up all `Condition` resources whose `subject` reference matches `Patient/maria-chen` and whose `clinicalStatus` field is `active`, and returns them as a `Bundle` — a FHIR resource type that simply wraps a list of other resources — in JSON. No custom code specific to Riverside Clinic's internal database is required on the requesting app's side; the same request format works against any FHIR server, anywhere. Writing data back follows the identical pattern in reverse: to record a new blood pressure reading, the app sends `POST /Observation` with the new resource's JSON body, and the server assigns it an `id` and stores it, immediately queryable by the same kind of `GET` request. A FHIR server also publishes a special resource called a `CapabilityStatement` describing exactly which resource types, search parameters, and operations it supports, so a client app can check compatibility before attempting to query it — a detail this book returns to under the name FHIR Implementation Guide in Chapter 24.

#### Diagram: FHIR RESTful API Request-Response Flow

<iframe src="../../sims/fhir-restful-api-request-response-flow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>FHIR RESTful API Request-Response Flow</summary>
Type: workflow
**sim-id:** fhir-restful-api-request-response-flow<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: explain, summarize<br/>
Learning objective: Given a client application's request for patient data, the learner can explain how the FHIR RESTful API and FHIR server together turn an HTTP request into a returned Bundle of resources.

Purpose: Show the full request-response cycle between a client app and a FHIR server, grounding the abstract "resources are exchanged over REST" idea in one concrete, traceable request.

Components to show (Mermaid sequence-style flowchart):
- Node "Client App" (blue) — sends the request
- Node "HTTP GET Request" (gray) — shows the literal URL: `GET /Condition?patient=maria-chen&clinical-status=active`
- Node "FHIR Server" (orange) — receives the request, looks up matching resources
- Node "Internal Data Store" (gray, dashed border) — the EHR vendor's own database, translated into FHIR shape by the server
- Node "Bundle Response" (green) — a `Bundle` resource wrapping the matched `Condition` resources as JSON
- Node "Client App Renders Result" (blue) — the app displays Maria Chen's active conditions

Connections: Client App → HTTP GET Request → FHIR Server → Internal Data Store → back to FHIR Server → Bundle Response → Client App Renders Result, arrows labeled with each transition's action

Interactive controls:
- Click directive on every node opening an infobox with that step's detail, including the literal JSON of the returned Bundle at the "Bundle Response" node
- Dropdown to swap the CRUD operation shown (GET / POST / PUT / DELETE) and see how the flow and HTTP verb change while the overall five-step shape stays the same

Instructional Rationale: A clickable sequence flowchart matches the Understand-level objective by letting the learner trace one concrete request end to end and inspect the actual returned JSON, rather than only reading an abstract description of "REST operations."

Implementation: Mermaid flowchart with click handlers; responsive width.
</details>

## A Tour of Core FHIR Resources

FHIR defines well over a hundred resource types, but a small handful account for most of what a clinical decision support system needs to reason about a single patient encounter. The **Patient resource** holds demographic data — name, birth date, administrative gender, identifiers — and serves as the hub that most other clinical resources reference via a `subject` field, exactly as the `Patient` node served as the hub of Chapter 1's labeled property graph. The **Condition resource** represents a diagnosis, problem, or health concern, carrying a coded `code` field (typically ICD-10 or SNOMED CT) and a `clinicalStatus` (active, resolved, remission). The **Observation resource** represents a single measured or asserted clinical fact — a lab result, a vital sign, an assessment score — carrying a `code` identifying what was measured and a `value` holding the result. The **MedicationRequest resource** represents an order for a medication, carrying the drug (coded, typically via RxNorm), dosage instructions, and the prescribing provider. The **Encounter resource** represents an interaction between a patient and the healthcare system — an office visit, an emergency department stay, a hospital admission — and many other resources reference the specific encounter during which they were recorded. The **CarePlan resource** represents an intended set of actions to manage one or more of a patient's health conditions over time, referencing the conditions it addresses and the activities (appointments, medications, goals) planned to address them.

The Condition resource deserves a closer look, since it carries more clinical nuance than its short definition above suggests and because so many other resources and downstream analytics ultimately hang off of it. Beyond the `code` and `clinicalStatus` fields already mentioned, a Condition resource also carries a `verificationStatus` (provisional, confirmed, refuted, entered-in-error — distinguishing a suspected diagnosis from a confirmed one), a `severity` (mild, moderate, severe), an `onsetDateTime` recording when the condition began, and a `category` distinguishing a formally tracked `problem-list-item` from a one-time `encounter-diagnosis` noted only for a single visit. The `code` field itself typically carries two parallel codings rather than one: an ICD-10-CM code for billing purposes (E11.9, as in the example above) and a corresponding SNOMED CT code for clinical and analytic purposes, since ICD-10-CM was designed for reimbursement granularity while SNOMED CT was designed for clinical precision and better supports the kind of graph traversal and similarity queries this book has emphasized throughout. A Condition resource whose `verificationStatus` is still `provisional` should generally not trigger the same downstream clinical decision support logic as one marked `confirmed` — a distinction a naive implementation that reads only the `code` field would miss entirely, and a common enough oversight that it is worth calling out explicitly here.

These six resource types are best understood together, not in isolation, because a single clinical encounter typically produces one of each, all cross-referencing one another. Consider Maria Chen's annual physical from Chapter 1, re-expressed as a small FHIR Bundle:

```json
{
  "resourceType": "Bundle",
  "entry": [
    {"resource": {"resourceType": "Patient", "id": "maria-chen",
      "name": [{"text": "Maria Chen"}], "birthDate": "1985-03-12", "gender": "female"}},
    {"resource": {"resourceType": "Encounter", "id": "enc-1",
      "subject": {"reference": "Patient/maria-chen"}, "type": [{"text": "Annual Physical"}]}},
    {"resource": {"resourceType": "Condition", "id": "cond-1",
      "subject": {"reference": "Patient/maria-chen"},
      "code": {"coding": [{"system": "ICD-10", "code": "E11.9", "display": "Type 2 Diabetes"}]},
      "clinicalStatus": "active"}},
    {"resource": {"resourceType": "Observation", "id": "obs-1",
      "subject": {"reference": "Patient/maria-chen"}, "encounter": {"reference": "Encounter/enc-1"},
      "code": {"text": "Hemoglobin A1c"}, "valueQuantity": {"value": 8.2, "unit": "%"}}},
    {"resource": {"resourceType": "MedicationRequest", "id": "med-1",
      "subject": {"reference": "Patient/maria-chen"},
      "medicationCodeableConcept": {"text": "Metformin 500mg"}, "requester": {"reference": "Practitioner/dr-patel"}}},
    {"resource": {"resourceType": "CarePlan", "id": "cp-1",
      "subject": {"reference": "Patient/maria-chen"}, "addresses": [{"reference": "Condition/cond-1"}],
      "activity": [{"detail": {"description": "Quarterly HbA1c monitoring"}}]}}
  ]
}
```

Notice that every non-Patient resource references `Patient/maria-chen`, the Observation additionally references the specific `Encounter` it was recorded during, and the CarePlan references the `Condition` it addresses — a small web of cross-references that is, once again, exactly a labeled property graph: resources are nodes, and `reference` fields are directed edges. This is not a coincidence or a loose analogy; several production graph databases ingest FHIR Bundles directly by mapping each resource to a node and each reference field to an edge, with no intermediate transformation step required.

#### Diagram: FHIR Resource Bundle Explorer

<iframe src="../../sims/fhir-resource-bundle-explorer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>FHIR Resource Bundle Explorer</summary>
Type: graph-model
**sim-id:** fhir-resource-bundle-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, differentiate<br/>
Learning objective: Given a rendered FHIR Bundle, the learner can examine which JSON reference fields correspond to which graph edges, and differentiate the six core resource types by the fields each one carries.

Purpose: Render the Maria Chen FHIR Bundle above as an interactive node-and-edge graph so the learner directly experiences a FHIR Bundle as a labeled property graph rather than as abstract JSON.

Node types to show (color-coded by resourceType, exact data from the Bundle above):
- `Patient` (pink circle) — maria-chen
- `Encounter` (gray square) — enc-1, Annual Physical
- `Condition` (orange diamond) — cond-1, Type 2 Diabetes (E11.9)
- `Observation` (yellow circle) — obs-1, HbA1c 8.2%
- `MedicationRequest` (purple hexagon) — med-1, Metformin 500mg
- `CarePlan` (green triangle) — cp-1, Quarterly HbA1c monitoring

Edge types to show (labeled by the FHIR field name they came from):
- `subject` (Condition, Encounter, Observation, MedicationRequest, CarePlan → Patient)
- `encounter` (Observation → Encounter)
- `addresses` (CarePlan → Condition)
- `requester` (MedicationRequest → Practitioner, shown as an unresolved reference badge if Practitioner is not loaded in this bundle)

Interactive controls:
- Click any node to open a side panel showing the exact raw JSON for that resource
- Hover any edge to see a tooltip naming the FHIR field that produced it (e.g., "this edge came from the `addresses` field")
- Toggle: "JSON View" vs "Graph View" that shows the same Bundle as raw formatted JSON side by side with the rendered graph, so the learner can match a specific JSON reference field to its corresponding edge

Instructional Rationale: A toggle between JSON and graph views directly targets the Analyze-level objective, requiring the learner to map specific document fields onto specific graph structures rather than accepting the JSON-equals-graph claim in prose alone.

Implementation: vis-network JavaScript library; responsive width, 550px height.
</details>

!!! mascot-thinking "FHIR Resources Were a Graph All Along"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice what just happened: a `reference` field in a FHIR resource is nothing more than an edge with a fancy JSON syntax. Every FHIR Bundle you will ever see is secretly a small labeled property graph wearing a REST API costume. Once you see it, you can't unsee it.

## From Guidelines to Executable Logic: PlanDefinition and ActivityDefinition

Most of the resources above describe facts about a patient. Two more specialized resources instead describe clinical *logic* — what should happen, not what already happened. The **PlanDefinition resource** represents a reusable, shareable definition of a clinical protocol, order set, or guideline as a structured sequence of triggers, conditions, and actions — it is the FHIR-native way to encode "if a patient meets these criteria, recommend these actions" as data rather than as narrative prose. The **ActivityDefinition resource** represents a single reusable, executable definition of one specific action a PlanDefinition can trigger — order this lab test, prescribe this medication, schedule this referral — independent of any particular patient, so the same ActivityDefinition can be invoked by many different PlanDefinitions.

A worked example connects the two. A diabetes-screening guideline is authored as a PlanDefinition: "if patient age is 35-70 AND BMI is 25 or greater AND no active diabetes diagnosis exists, then perform the action defined by ActivityDefinition/order-hba1c-test." At runtime, a clinical reasoning engine evaluates the PlanDefinition's trigger criteria against a specific patient's FHIR resources (a Patient resource's `birthDate` and an Observation resource holding BMI), and if the criteria are satisfied, instantiates the referenced ActivityDefinition — "order-hba1c-test" — as an actual, patient-specific order. The PlanDefinition is written once by a knowledge engineer and reused across every patient it applies to; the ActivityDefinition it references is written once and reused across every PlanDefinition that needs to trigger that same action. This separation — reusable logic definitions that reference reusable action definitions, evaluated against patient-specific data at runtime — is what makes a guideline authored as FHIR resources directly executable rather than merely readable, and it is the exact resource pair the next two chapters build on when introducing Clinical Quality Language and the Clinical Reasoning Module.

A PlanDefinition rarely expresses its trigger criteria as inline structured fields the way the simplified example above suggests; in a real deployment, the `action.condition` field instead holds an expression written in Clinical Quality Language and the `library` field points to a separate CQL Library resource containing the full logic — a forward reference Chapter 23 develops in depth. PlanDefinition actions also support several distinct `trigger` types beyond a simple always-check-on-demand pattern: a `named-event` trigger fires whenever a specific event occurs in the workflow (such as "medication-order-select"), while a `periodic` trigger fires on a schedule (such as nightly, to sweep an entire patient panel for anyone newly eligible for screening). Choosing the right trigger type is itself a design decision — an always-on periodic sweep finds newly eligible patients proactively but consumes computing resources continuously, while an event trigger is cheaper but only catches patients at the moment a relevant workflow event happens to occur.

#### Diagram: PlanDefinition to ActivityDefinition Trigger Flow

<iframe src="../../sims/plandefinition-activitydefinition-trigger-flow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>PlanDefinition to ActivityDefinition Trigger Flow</summary>
Type: graph-model
**sim-id:** plandefinition-activitydefinition-trigger-flow<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: apply, demonstrate<br/>
Learning objective: Given a patient's age and BMI values, the learner can apply a PlanDefinition's trigger criteria to determine whether its referenced ActivityDefinition fires for that patient.

Purpose: Let the learner test different patient ages and BMI values against the diabetes-screening PlanDefinition's criteria and see, in real time, whether the ActivityDefinition action would be triggered.

Components to show:
- Node "PlanDefinition: Diabetes Screening Guideline" (blue box) — displays its trigger criteria as readable text (age 35-70, BMI >= 25, no active diabetes diagnosis)
- Node "Patient Data Inputs" (pink box) — sliders for age (18-90) and BMI (15-45), and a toggle for "has active diabetes diagnosis"
- Node "Evaluation Result" (yellow diamond) — shows TRUE/FALSE based on current slider values
- Node "ActivityDefinition: Order HbA1c Test" (green box) — highlights and animates only when Evaluation Result is TRUE, showing the generated patient-specific order

Connections: Patient Data Inputs → Evaluation Result (labeled "criteria checked against"); Evaluation Result → ActivityDefinition (labeled "triggers, if true")

Interactive controls:
- Sliders for age and BMI, toggle for existing diabetes diagnosis, all live-updating the Evaluation Result node
- Click on the PlanDefinition node to see its full trigger-criteria text; click the ActivityDefinition node (when triggered) to see the resulting patient-specific order as JSON

Instructional Rationale: Live sliders that immediately re-evaluate the trigger condition match the Apply-level objective, requiring the learner to test specific input combinations and observe the resulting pass/fail outcome rather than only reading the criteria as static text.

Implementation: vis-network for the node layout combined with p5.js-style slider controls; responsive width.
</details>

## The Four Levels of Knowledge Representation

Not every clinical guideline is equally "computable." A guideline written as a paragraph of prose in a PDF and a guideline compiled into an executable PlanDefinition represent the same clinical knowledge at very different points on a spectrum, and FHIR gives that spectrum a formal name: the **Knowledge Representation Level** — a classification of how computable a piece of clinical knowledge is, ranging across four defined levels, each trading off ease of authorship and broad shareability against how directly a computer can act on the content.

At the **Narrative Level**, clinical guidelines are expressed as plain narrative text — the paragraphs a guideline committee writes and publishes, readable by any clinician but requiring a human to interpret before any computer system can act on it. Narrative-level knowledge is authored by guideline developers (physicians, researchers) specifically because it demands no specialized computing expertise to write or to read, which is exactly why it remains the level at which the vast majority of clinical guidelines are still published worldwide. A cardiology society's published statement that "adults with LDL cholesterol persistently above 190 mg/dL and no contraindication should be considered for high-intensity statin therapy" is a textbook Narrative-level artifact: authoritative, broadly shareable across every specialty and every EHR vendor on earth, and entirely dependent on a clinician reading and applying it correctly.

At the **Semi-Structured Level**, the same knowledge is organized into flowcharts, decision tables, personas, and user stories — still authored by clinical experts rather than programmers, but arranged into a consistent, partially formal shape that a knowledge engineer can more easily translate into code later. A decision table listing "if LDL > 190 AND no statin allergy, recommend high-intensity statin" in table-row form is semi-structured: more computable than a paragraph, but still not directly executable, since "no statin allergy" still requires a human (or, eventually, a knowledge engineer) to decide precisely which coded allergy entries in a patient's chart count as satisfying that condition.

At the **Structured Level**, knowledge is expressed in computer-interpretable, coded formats using standard terminologies — a FHIR PlanDefinition whose trigger criteria reference actual SNOMED CT and LOINC codes rather than free-text descriptions. Structured-level knowledge requires a knowledge engineer to author (someone fluent in both the clinical content and the coding formats), but it achieves both high computability and broad shareability, since any FHIR-conformant system can parse the same structured resource identically. Continuing the statin example, a Structured-level version binds "LDL cholesterol" to the specific LOINC code 2089-1, binds "statin allergy" to a specific ValueSet of RxNorm ingredient codes, and expresses the full trigger as a PlanDefinition action referencing both — still platform-neutral (any FHIR-conformant clinical reasoning engine can parse it identically), but now unambiguous in exactly which coded data elements it depends on.

At the **Executable Level**, knowledge is coded directly for a specific clinical decision support system for direct runtime execution — a compiled rule ready to run inside one particular EHR vendor's rules engine, with no remaining ambiguity or interpretation left for a human or a general-purpose parser. Finishing the statin example: the Structured-level PlanDefinition is compiled into the Expression Logical Model (ELM) format Chapter 23 introduces, and that compiled ELM is loaded into a specific hospital's specific CDS engine, where it runs automatically every time a qualifying patient's chart is opened. Executable-level artifacts trade away some of the Structured level's platform-neutral shareability in exchange for being immediately runnable, which is precisely the trade-off Chapter 23's discussion of Clinical Quality Language and its compiled Expression Logical Model will explore in depth.

Tracing this single statin recommendation across all four levels also reveals a consistent pattern in *who* authors each level and how much specialized expertise that authorship requires: a guideline developer needs only clinical expertise to write the Narrative level; a clinical expert (sometimes the same person) needs enough structure-mindedness to build the Semi-Structured decision table; a knowledge engineer needs both clinical fluency and familiarity with coding systems to produce the Structured level; and a platform-specific developer needs to understand one particular vendor's execution environment to finish the Executable level. Computability increases monotonically down this list, while the pool of people qualified to author each level shrinks at every step — which is exactly why most clinical knowledge in the world still lives at the Narrative level, and why the transformation pipeline this book's final CDS chapters describe is so valuable: it lets a narrow team of knowledge engineers make Narrative-level expertise executable at scale, instead of requiring every guideline author to also become a software developer.

!!! mascot-tip "Remember the Order With 'N-S-S-E'"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a memory shortcut: Narrative, Semi-Structured, Structured, Executable — each level trades a little more human readability for a little more machine runnability. If you can place any artifact on that N-S-S-E line, you've correctly classified its knowledge representation level.

These four levels intersect with a second, independent classification: the **Tiers of Functionality**, which sort a clinical knowledge artifact by *what kind* of content it carries rather than by how computable it is. The **Data Tier** covers the concepts and data elements a piece of knowledge refers to — which codes, which value sets, which patient attributes. The **Logic Tier** covers the business and process rules — the actual "if this, then that" reasoning. A third tier, the Forms/UI Tier, covers user interface and interaction design; it is developed fully in the next chapter, since guideline authoring artifacts like decision tables and user stories belong to that tier.

Crossing the four levels against the tiers of functionality produces a matrix that classifies any clinical knowledge artifact by two independent dimensions at once — for example, a PlanDefinition's trigger criteria are Structured-level Logic Tier content, while the same PlanDefinition's reference to a specific LOINC lab code is Structured-level Data Tier content.

#### Diagram: Knowledge Representation Levels by Functional Tier Matrix

<iframe src="../../sims/knowledge-representation-levels-tier-matrix/main.html" width="100%" height="520px" scrolling="no"></iframe>

<details markdown="1">
<summary>Knowledge Representation Levels by Functional Tier Matrix</summary>
Type: infographic
**sim-id:** knowledge-representation-levels-tier-matrix<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: classify, examine<br/>
Learning objective: Given a description of a clinical knowledge artifact, the learner can classify it by both its knowledge representation level (Narrative, Semi-Structured, Structured, Executable) and its functional tier (Data, Logic, Forms/UI) using the matrix.

Purpose: Give the learner a single reference grid, built from FHIR's own CQF Recommendations implementation guide, showing a concrete example artifact in each of the twelve level-by-tier cells, with the Data and Logic Tier columns fully detailed for this chapter and the Forms/UI column marked as a forward reference to Chapters 23 and 24, where the Forms/UI Tier concept itself and its Structured/Executable-level artifacts are covered.

Grid layout: 4 rows (Narrative, Semi-Structured, Structured, Executable) by 3 columns (Data Tier, Logic Tier, Forms/UI Tier)

Example cell contents (click to reveal full text; shown abbreviated on the grid):
- Narrative x Data: "LDL cholesterol mentioned in guideline prose"
- Narrative x Logic: "'Consider a statin for elevated LDL' (prose recommendation)"
- Narrative x Forms/UI: "Guideline PDF's patient handout section (detailed in Ch. 23)"
- Semi-Structured x Data: "Decision table column: 'LDL value'"
- Semi-Structured x Logic: "Decision table row: IF LDL > 190 THEN recommend statin"
- Semi-Structured x Forms/UI: "Clinical user story describing the counseling conversation (Ch. 23)"
- Structured x Data: "FHIR ValueSet binding LDL to LOINC code 2089-1"
- Structured x Logic: "PlanDefinition trigger: LDL Observation > 190 mg/dL"
- Structured x Forms/UI: "FHIR Questionnaire item definition (Ch. 24)"
- Executable x Data: "Compiled ELM data requirement for LOINC 2089-1"
- Executable x Logic: "Compiled ELM expression evaluated by the CDS engine"
- Executable x Forms/UI: "Rendered CDS Hooks card in the EHR UI (Ch. 24)"

Interactive controls:
- Click any cell to open an infobox with the full example text and a one-sentence explanation of why it belongs at that level and tier
- Hover a row header (a level name) to highlight that entire row and show the level's definition in a side panel
- Hover a column header (a tier name) to highlight that entire column and show the tier's definition in a side panel
- Data Tier and Logic Tier cells rendered in full color; Forms/UI Tier cells rendered in a muted gray with a "Chapter 23/24" badge, signaling they are previewed here but taught fully later

Instructional Rationale: A clickable grid matches the Analyze-level classification objective directly — the learner must locate the correct row and column for a new artifact rather than recall a linear list, which is the actual cognitive task the chapter's culminating learning outcome requires.

Implementation: p5.js grid rendering with click and hover event handling; responsive width, fixed 4x3 aspect ratio.
</details>

!!! mascot-warning "Structured Is Not the Same as Executable"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mix-up: assuming a Structured-level FHIR resource is already runnable. It isn't quite yet — Structured means computer-*interpretable* using standard codes and formats, but Executable means compiled and ready for one specific platform to run without further translation. The next chapter's Expression Logical Model is exactly that translation step.

## Chapter Summary

!!! mascot-celebration "You Can Now Classify Any Clinical Knowledge Artifact"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Look at what just clicked into place: FHIR resources as a REST-exchanged graph, the six core resources that describe a single encounter, PlanDefinition and ActivityDefinition as executable logic, and the full Narrative-to-Executable spectrum crossed with the tiers of functionality. That is the entire foundation clinical decision support is built on.

This chapter established the vocabulary FHIR uses to represent clinical data (resources, exchanged over a RESTful API, hosted on a FHIR server) and the vocabulary it uses to classify clinical *knowledge* by how computable it is (the four Knowledge Representation Levels) and by what kind of content it carries (the Tiers of Functionality). Maria Chen's patient record, first drawn as a bare graph in Chapter 1, is now a FHIR Bundle of cross-referencing resources, and a diabetes-screening guideline is now a PlanDefinition capable of triggering a specific, patient-tested ActivityDefinition. The next chapter picks up exactly where the Structured and Executable levels leave off, introducing Clinical Quality Language as the human-readable authoring format that compiles into the machine-executable logic these levels describe. Continue to [Chapter 23: Clinical Guideline Authoring and Clinical Quality Language](../23-clinical-guideline-authoring-and-cql/index.md).
