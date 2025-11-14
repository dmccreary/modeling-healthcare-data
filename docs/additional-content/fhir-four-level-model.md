## ChatGPT Said

### Introduction

In this tutorial we will explore the **four-level knowledge representation model** described in the FHIR-based CPG‑on‑FHIR IG (Clinical Practice Guidelines Implementation Guide) from HL7 International. We will walk through each level (L1 through L4), the supporting tiers of functionality, how this maps to knowledge assets and architecture, and then *suggest interactive MicroSim (micro-simulation) experiences* you might build to help learners internalize these concepts.

---

## 1. Theoretical background

### What is “knowledge representation” in this context?

CPG‑on‑FHIR IG defines knowledge representation as:

> “a surrogate, a substitute for the thing itself, that allows for reasoning (human and computational) about the ‘thing’. A knowledge representation may be thought of on a continuum of successive degrees of readability, of ability to reason over, and formalism (e.g., to compute).” ([FHIR Build][1])

In other words: when you have clinical guideline content (for example), you might represent it in different ways — from pure narrative (human readable) all the way to executable code (machine readable and runnable). These varying forms inhabit a spectrum; the CPG-on-FHIR IG identifies *four discrete levels* to help frame discussions and development.

### The Four Levels of Representation

From the IG:

* **L1 (Narrative):** The knowledge is presented in narrative, unstructured form (e.g., PDF guideline text) — human readable only. ([FHIR Build][2])
* **L2 (Semi-structured):** The knowledge has some structure: workflows, decision trees, concept maps, user stories, etc. Still mostly human-oriented, but more formalised. ([FHIR Build][2])
* **L3 (Structured):** The knowledge is computable, or at least machine-interpretation-capable: value sets, data definitions, logic expressed (e.g., in CQL), FHIR profiles and resources defined. ([FHIR Build][2])
* **L4 (Executable):** The knowledge is fully implemented in a system: running software, decision support logic in an EHR, site-specific mapping and workflow execution. ([FHIR Build][2])

### Tiers of Functionality (per level)

The IG also emphasises that each level can be considered in three functional tiers:

* **T1 – Data tier** (what data is needed/used)
* **T2 – Logic tier** (what logic applies/when)
* **T3 – Forms/UI tier** (how the user interacts) ([FHIR Build][3])

And so each level (L1–L4) may exhibit data, logic, and UI components with increasing formalism.

### Knowledge Assets & Architecture

Beyond the levels, the guide covers *Knowledge Assets* — discrete artefacts (for example, value sets, CQL libraries, PlanDefinition resources) that encapsulate logic, metadata, structure. ([FHIR Build][1])
And *Knowledge Architecture* — how these assets are organised, versioned, managed, reused, derived, and how they relate to FHIR resources, profiles (StructureDefinition), etc. ([FHIR Build][3])

---

## 2. Step-by‐step tutorial: applying the four-level model

Here is a walkthrough you can use (for teaching or self‐learning) to apply the four levels to a guideline or decision support scenario. I’ll also include what kinds of artefacts or tasks correspond to each level.

### Step 0: Select a guideline or decision scenario

Before the levels, pick a simple clinical guideline or decision scenario. For example: “In adult outpatients with hypertension, if blood pressure ≥ 140/90 and no contraindications, initiate first‐line antihypertensive medication.”
You’ll use this scenario to illustrate each level.

### Level 1 (L1) – Narrative

**Goal:** Capture the guideline in human readable form.
**What you do:**

* Read the guideline (PDF or text) and highlight population, intervention, comparators, outcomes, timing, setting (PICOTS).
* Identify recommendations, strength of evidence, exclusion/inclusion statements. ([FHIR Build][2])
* Create a summary narrative: e.g., “For otherwise healthy adults with newly diagnosed stage-1 hypertension (BP ≥140/90) the guideline recommends initiating a thiazide-type diuretic unless contraindicated, strength B, evidence moderate.”
* Optionally include tables, flow diagrams (though if you include them you may already lean toward L2).
  **Teaching tip:** Ask learners to rewrite the guideline recommendation in plain language and identify the key decision points.

### Level 2 (L2) – Semi-structured

**Goal:** Provide structure to the guideline content to prepare for computability.
**What you do:**

* Create concept maps: e.g., map “adult”, “newly diagnosed hypertension”, “no prior antihypertensive therapy”, “BP ≥140/90” → “eligible population”.
* Develop a workflow or flow chart: e.g., Start → measure BP → if ≥140/90 → check contraindications → yes → initiate medication → monitor.
* Develop user stories or personas: e.g., “Dr. Smith sees a patient age 57 with BP 148/92, asks: is this patient eligible for first-line diuretic?”
* Build a data dictionary: listing each data element (e.g., “systolic blood pressure”, “diastolic blood pressure”, “age”, “previous antihypertensive therapy”, “contraindication record”) with description, context, source. ([FHIR Build][4])
  **Teaching tip:** Ask learners to draw the decision tree and identify where decisions branch; also identify what data elements are required.

### Level 3 (L3) – Structured (computable)

**Goal:** Convert to computable artefacts (though not yet deployed/fully live).
**What you do:**

* Create FHIR profiles (StructureDefinition) for the data elements identified (e.g., a profile for BP measurement, a profile for antihypertensive medication order).
* Define value sets using standard terminologies (e.g., RxNorm for medications, LOINC for BP measurement).
* Create a CQL library with logic: e.g., `define EligibleHypertension: ...` `define Contraindication: ...` `define RecommendedAction: ...`.
* Create a PlanDefinition (or other FHIR decision‐support resource) representing the recommendation: event (e.g., encounter with BP measurement), condition (EligibleHypertension & not Contraindication), action (create MedicationRequest for thiazide).
* Define test cases (positive/negative) to validate the logic. ([FHIR Build][4])
  **Teaching tip:** Provide a template CQL skeleton and ask learners to fill in logic; or ask them to map data elements to FHIR resources and value sets.

### Level 4 (L4) – Executable

**Goal:** Deploy and execute in a clinical environment (or simulation) so that the logic triggers and produces action.
**What you do:**

* Map the value sets and profiles to the local EHR’s terminology, local code systems, user interface.
* Integrate the PlanDefinition/CQL into a CDS Hook or service, or embed in EHR workflow (e.g., when BP results enter, trigger evaluation).
* Orchestrate UI forms or alerts: e.g., at end of encounter, if patient eligible, prompt “Consider starting thiazide”.
* Monitor execution: capture metrics, feedback, exceptions, adherence, override patterns.
  **Teaching tip:** Simulate a “live” system: have learners act as clinicians, get BP values, see the alert pop up, act on it, record outcome.

---

## 3. Interactive MicroSims to demonstrate the concepts

Here are *suggested MicroSim activities* (micro-simulations) you can build (for class, workshops, or self-study) to let learners experience each level, and traverse them from L1 to L4.

### MicroSim 1: “Guideline Detective” (L1 → L2)

* Provide learners a PDF of a guideline recommendation (narrative).
* Ask them to:

  1. Identify the population, intervention, comparator, outcome, timing, setting (PICOTS).
  2. Highlight decision points.
  3. Construct a concept map and a flow chart (paper or online tool) of the decision logic (semi-structured).
* Debrief: compare flow charts across learners; discuss differences, clarify decision branches.

### MicroSim 2: “Data Investigator” (L2 → L3)

* Give learners a worksheet or spreadsheet template of data elements and ask them to fill in: name, description, context, FHIR resource mapping, terminologies/value sets.
* Use an online CQL editor (or simplified pseudo-CQL) and ask them to write logic definitions for the eligibility condition and recommendation.
* Ask them to map value sets (e.g., LOINC codes for BP, RxNorm for thiazides) and link into a PlanDefinition skeleton.
* Provide a simple test case (FHIR Patient + Observation + MedicationRequest) and ask them to evaluate: is the logic triggered? What action would be recommended?
* Debrief: review how structured logic differs from narrative.

### MicroSim 3: “Live CDS Pilot” (L3 → L4)

* Create a sandbox EHR simulation (or a web‐app mimic) where learners can enter patient data (age, BP, meds, contraindications).
* The system uses the PlanDefinition + CQL to evaluate eligibility and shows an alert or suggestion accordingly.
* Learners act as clinicians: enter different patient profiles, see what triggers, what does not, and decide whether to act, override, document reasons.
* Collect logs (override rate, eligible/not eligible counts) and ask learners to reflect: where did the logic succeed/ fail? What local adjustments would they want?
* Debrief: discuss challenges of local mapping, workflow, user interface, acceptance.

### MicroSim 4: “Knowledge Asset Manager” (cross‐level)

* Give learners a repository view (or sandbox) of knowledge assets: value sets, CQL libraries, PlanDefinitions, metadata (versioning, provenance).
* Ask them to:

  1. Identify which asset belongs to which level (L1–L4).
  2. Trace the lineage: e.g., narrative text → flowchart → CQL library → deployed CDS.
  3. Propose a change (e.g., new evidence raises threshold from 140/90 → 130/80). Ask them to update: narrative version, flowchart, value set, CQL logic, deployment configuration.
* Debrief: emphasise reuse, versioning, impact of change across levels.

---

## 4. Summary table

| Level                  | Readability & formalism                                 | Typical artefacts                             | Learner activity (MicroSim)                                            |
| ---------------------- | ------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| **L1 Narrative**       | Human readable, little machine formality                | PDF guideline text, prose recommendations     | “Guideline Detective”: extract PICOTS, map decision logic              |
| **L2 Semi-structured** | Some formalism: flowcharts, concept maps, user stories  | Concept maps, data dictionaries, workflows    | “Data Investigator”: create data dictionary & partial logic            |
| **L3 Structured**      | Machine-interpretable: profiles, value sets, CQL logic  | FHIR profiles, CQL libraries, PlanDefinitions | “Live CDS Pilot”: write logic, test cases                              |
| **L4 Executable**      | Fully deployed/operational: machine executable workflow | CDS Hooks, EHR integration, deployed alerts   | “Knowledge Asset Manager”: deploy and monitor logic, change management |

---

## 5. Best practices & tips

* Recognise that the levels are *not strictly linear* — you may iterate between L2 and L3, or skip directly to L3/L4 depending on tooling. ([FHIR Build][2])
* Engage subject‐matter experts (clinicians), informaticists, terminologists early-on (especially in L2 & L3) to avoid misinterpretation. ([FHIR Build][4])
* Always maintain traceability: keep links from narrative → structured logic → executable implementation (so you can audit, version, update).
* Use test cases (positive/negative) for L3 and L4 to validate behaviour.
* Keep local context in mind: even if your logic is L3, the executable (L4) may require mapping value sets to local codes, adjusting workflow, UI design.
* Re-use knowledge assets where possible (value sets, CQL libraries) to avoid duplication and promote maintainability.

---

## 6. Additional resources

* The “Levels of Knowledge Representation” page in the IG. ([FHIR Build][2])
* The “Knowledge Translation” section of the IG (which describes how to move between levels). ([FHIR Build][5])
* The paper “Towards Computable Guidelines and Beyond with FHIR” for background on this multi-level model. ([stacks.cdc.gov][6])

---

If you like, I can **prepare a slide deck** summarising this four-level model (with diagrams) *and* build **interactive MicroSim templates in, say, an online tool (e.g., Google Sheets + CQL sandbox)** that your students or colleagues could use. Would you like that?

[1]: https://build.fhir.org/ig/HL7/cqf-recommendations/documentation-approach-02-04-knowledge-representation.html "Knowledge Representation Overview - Clinical Practice Guidelines v2.0.0"
[2]: https://build.fhir.org/ig/HL7/cqf-recommendations/documentation-approach-06-01-levels-of-knowledge-representation.html?utm_source=chatgpt.com "“Levels” of Knowledge Representation Framing"
[3]: https://build.fhir.org/ig/HL7/cqf-recommendations/documentation-approach-02-04-knowledge-representation.html?utm_source=chatgpt.com "Knowledge Representation Overview - HL7 FHIR Specification"
[4]: https://build.fhir.org/ig/HL7/cqf-recommendations/methodology.html?utm_source=chatgpt.com "Methodology - Clinical Practice Guidelines v2.0.0"
[5]: https://build.fhir.org/ig/HL7/cqf-recommendations/documentation-approach-05-02-knowledge-translation.html?utm_source=chatgpt.com "Knowledge Translation - Clinical Practice Guidelines v2.0.0"
[6]: https://stacks.cdc.gov/view/cdc/133687/cdc_133687_DS1.pdf?utm_source=chatgpt.com "Towards Computable Guidelines and Beyond with FHIR"
