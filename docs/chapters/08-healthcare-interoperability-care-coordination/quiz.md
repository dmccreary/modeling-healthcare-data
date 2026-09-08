# Quiz: Healthcare Interoperability and Care Coordination

Test your understanding of healthcare interoperability and care coordination with these review questions.

---

#### 1. What is a medical encounter?

<div class="upper-alpha" markdown>
1. The broader sequence of steps and systems that carries a visit from check-in to billing
2. A standardized document summarizing a patient's care at a transition point
3. A network of providers taking joint financial accountability for a population
4. A bounded clinical interaction, such as an office visit or hospitalization, with a defined start and end time
</div>

??? question "Show Answer"
    The correct answer is **D**. A medical encounter is the bounded clinical interaction itself, with a defined start time, end time, and its own documentation trail, distinct from the broader clinical workflow that carries it to completion. Option A describes clinical workflow, a related but distinct concept. Option B describes a continuity of care document. Option C describes an accountable care organization.

    **Concept Tested:** Medical Encounter

---

#### 2. What is the HL7 V2 message format primarily used for?

<div class="upper-alpha" markdown>
1. Real-time, transactional messaging between systems, such as announcing an admission or delivering a lab result the instant it is available
2. Organizing a voluntary network of providers to share financial risk
3. Recording a patient's non-medical environmental risk factors
4. Training a graph neural network on patient embeddings
</div>

??? question "Show Answer"
    The correct answer is **A**. HL7 V2 is a pipe-and-hat delimited text format meant to be parsed instantly by a receiving system for real-time events like admissions, orders, or lab results. Option B describes an accountable care organization, an unrelated organizational structure. Option C describes social determinants of health. Option D describes an unrelated machine learning technique.

    **Concept Tested:** HL7 V2 Message

---

#### 3. What is an interoperability standard?

<div class="upper-alpha" markdown>
1. A single hospital's internal file-naming convention
2. A published technical specification that defines message structure, field meaning, and expected behavior so independently built systems can exchange data predictably
3. A graph algorithm for detecting fraud rings
4. A federal law requiring encryption of all patient data
</div>

??? question "Show Answer"
    The correct answer is **B**. An interoperability standard is a published specification, typically maintained by an accredited standards body, that lets independently built systems exchange data predictably without their engineering teams ever having coordinated directly. Option A describes an informal internal convention, not a published standard. Option C confuses interoperability standards with an unrelated graph algorithm. Option D misdescribes a standard as a law.

    **Concept Tested:** Interoperability Standard

---

#### 4. Why are patient demographics such as date of birth and preferred language modeled as properties directly on the Patient node rather than as separate connected nodes?

<div class="upper-alpha" markdown>
1. Because they change extremely frequently and require their own edge history
2. Because they require a severity or risk_level score to be meaningful
3. Because they are intrinsic, relatively stable attributes that describe the patient directly, unlike social determinants of health, which carry independent severity data
4. Because relational databases cannot store this kind of data at all
</div>

??? question "Show Answer"
    The correct answer is **C**. Demographics describe attributes intrinsic to the patient and are typically stable across encounters, which is why they sit as properties on the Patient node rather than as separately connected nodes with their own severity history. Option A incorrectly claims demographics change frequently, contradicting the chapter's example. Option B describes a criterion that applies to SDOH factors, not demographics. Option D is an unsupported claim about relational databases.

    **Concept Tested:** Patient Demographics

---

#### 5. Why are Social Determinants of Health typically modeled as separate connected nodes rather than as demographic properties on the Patient node?

<div class="upper-alpha" markdown>
1. Because SDOH factors are identical to demographic properties in every respect
2. Because SDOH data cannot be represented using LOINC or ICD-10-Z codes
3. Because SDOH factors never change once they are recorded
4. Because an SDOH factor can appear, worsen, or resolve over time and carries its own severity assessment independent of the patient's identity
</div>

??? question "Show Answer"
    The correct answer is **D**. Unlike a fixed attribute such as date of birth, a social determinant of health can change over time and carries its own severity or risk-level data, which is exactly why it is modeled as its own node type connected by a HAS_SDOH_FACTOR edge. Option A contradicts the chapter's explicit contrast between the two. Option B is false, since the chapter notes SDOH data increasingly lives in FHIR Observation resources coded with LOINC and ICD-10-Z. Option C contradicts the very property that justifies modeling SDOH separately.

    **Concept Tested:** Social Determinants Of Health

---

#### 6. What distinguishes structural interoperability from semantic interoperability?

<div class="upper-alpha" markdown>
1. Structural interoperability means the receiving system can correctly parse a message into its component fields, while semantic interoperability means both systems agree on what each field actually means
2. Structural interoperability requires FHIR, while semantic interoperability requires HL7 v2
3. Structural interoperability applies only to medical images, while semantic interoperability applies only to text notes
4. Structural and semantic interoperability describe the exact same capability
</div>

??? question "Show Answer"
    The correct answer is **A**. Structural interoperability means the receiving system agrees on format well enough to parse a message into its fields, while semantic interoperability requires both systems to agree on what each field actually means, enabling automatic action rather than mere display. Option B fabricates a standard-specific requirement not present in the chapter. Option C invents an unrelated restriction to media type. Option D contradicts the chapter's explicit three-layer distinction.

    **Concept Tested:** Healthcare Interoperability

---

#### 7. An ACO's benchmark spending target for its attributed population is $50 million for the year, and it actually spends $46 million while meeting its quality targets. What happens to the $4 million difference?

<div class="upper-alpha" markdown>
1. The ACO must return the entire $4 million to Medicare with no further action
2. The ACO can keep a share of the $4 million as a shared-savings payment, splitting the remainder with the payer that set the benchmark
3. The $4 million is redistributed evenly among all patients as a rebate
4. The $4 million automatically becomes the following year's new benchmark
</div>

??? question "Show Answer"
    The correct answer is **B**. Under a shared-savings arrangement like the Medicare Shared Savings Program, an ACO that spends below its benchmark while meeting quality targets keeps a share of the savings, splitting the remainder with the payer that set the benchmark. Option A ignores the shared-savings mechanism entirely. Option C and D fabricate distribution and benchmark-setting rules not described in the chapter.

    **Concept Tested:** Accountable Care Organization

---

#### 8. A hospital sends Dr. Patel a single structured XML document summarizing Maria's recent hospitalization, including her problems, medications, and allergies, rather than a stream of real-time event messages. Which standard is being used?

<div class="upper-alpha" markdown>
1. HL7 V2 Message
2. RxNorm
3. Continuity of Care Document
4. A Social Determinants of Health profile
</div>

??? question "Show Answer"
    The correct answer is **C**. A continuity of care document is a standardized XML document that summarizes a patient's relevant clinical history at a transition of care, such as a hospital discharge, unlike an HL7 V2 message which reports a single real-time event. Option A describes the event-based messaging format this scenario explicitly avoids. Option B describes a medication naming standard, not a document format. Option D describes an unrelated non-medical risk factor profile.

    **Concept Tested:** Continuity Of Care Document

---

#### 9. Riverside Clinic bills fee-for-service for most visits, operates as a PCMH for patients like Maria, and also belongs to an ACO. Which statement correctly reflects how these three arrangements coexist for the same clinic?

<div class="upper-alpha" markdown>
1. A clinic can only participate in one of these three arrangements at any given time
2. PCMH designation automatically cancels any ACO membership the clinic holds
3. Fee-for-service billing is fundamentally incompatible with ACO participation
4. Each arrangement is modeled as its own edge radiating outward from the same clinic node, since the three are not mutually exclusive
</div>

??? question "Show Answer"
    The correct answer is **D**. A single clinic can bill fee-for-service for individual visits, serve as a PCMH coordinating a patient's comprehensive care, and belong to an ACO sharing financial risk across a broader population, all at once, with each relationship modeled as its own edge from the clinic node. Options A, B, and C each fabricate an exclusivity constraint that the chapter's Riverside Clinic example explicitly contradicts.

    **Concept Tested:** Patient-Centered Medical Home

---

#### 10. A population health analyst finds that patients with high A1c results and high SDOH risk levels mostly share transportation access problems rather than medication adherence issues. What does this finding demonstrate about connecting demographics, SDOH, and lab data as a graph?

<div class="upper-alpha" markdown>
1. Traversing shared connections across patient, SDOH, and lab data can reveal a subgroup pattern that is invisible from any single patient's individual chart
2. It proves that SDOH factors should always be stored as properties on the Patient node instead of as separate nodes
3. It shows that population health analysis only requires demographic data, not clinical lab data
4. It demonstrates that care coordination and population health are the exact same concept
</div>

??? question "Show Answer"
    The correct answer is **A**. Filtering and traversing across patient, SDOH, and lab-result connections together surfaced a pattern, transportation access rather than medication adherence, that would be invisible from any one patient's individual record. Option B contradicts the earlier justification for modeling SDOH as separate nodes. Option C ignores that lab results were essential to this specific finding. Option D conflates two distinct concepts the chapter defines separately.

    **Concept Tested:** Population Health

---
