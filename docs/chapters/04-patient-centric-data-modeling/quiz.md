# Quiz: Patient-Centric Data Modeling

Test your understanding of patient-centric data modeling with these questions.

---

#### 1. What is the central node in a patient-centric graph model?

<div class="upper-alpha" markdown>
1. Hospital
2. Provider
3. Patient Record
4. Insurance Company
</div>

??? question "Show Answer"
    The correct answer is **C**. The Patient Record serves as the central node in a patient-centric graph model, representing the complete collection of health information for an individual person across all encounters, conditions, and treatments. Unlike traditional databases where patient data is scattered across many tables, the graph model maintains a single authoritative Patient node as the hub for all related clinical, demographic, and administrative information.

    **Concept Tested:** Patient Record

    **See:** [Patient Record](index.md#patient-record)

---

#### 2. What is the primary challenge addressed by modeling multiple patient identifiers in a graph database?

<div class="upper-alpha" markdown>
1. Managing different identifiers across healthcare organizations
2. Reducing storage costs for large datasets
3. Improving network security protocols
4. Calculating insurance premiums accurately
</div>

??? question "Show Answer"
    The correct answer is **A**. A single patient may have different identifiers at each hospital, clinic, insurance company, and pharmacy they interact with, creating significant obstacles for care coordination and data integration. Graph databases provide elegant solutions by modeling multiple identifier types as nodes connected to the patient record, each with properties indicating the issuing system, identifier type, and validity period, rather than forcing a single canonical identifier.

    **Concept Tested:** Patient ID

    **See:** [Patient ID and Master Patient Index](index.md#patient-id-and-master-patient-index)

---

#### 3. What is the key distinction between a disease and a medical condition in graph models?

<div class="upper-alpha" markdown>
1. Disease and medical condition are identical and interchangeable terms
2. Medical conditions only apply to acute illnesses, while diseases are chronic
3. Diseases cannot be modeled in graph databases, only medical conditions
4. Disease represents a specific pathological process, while medical condition encompasses a broader range of health states
</div>

??? question "Show Answer"
    The correct answer is **D**. A disease represents a specific pathological process with defined etiology and progression (e.g., Type 2 Diabetes Mellitus, Coronary Artery Disease), while a medical condition encompasses a broader range of health states including diseases, injuries, disorders, and syndromes. In patient-centric graph models, diseases typically link to standardized medical vocabularies (ICD-10, SNOMED CT), while conditions represent patient-specific manifestations with properties for severity, onset date, and resolution status.

    **Concept Tested:** Disease, Medical Condition

    **See:** [Disease and Medical Condition](index.md#disease-and-medical-condition)

---

#### 4. How do graph databases support the diagnostic process more effectively than relational databases?

<div class="upper-alpha" markdown>
1. By eliminating the need for laboratory tests
2. By capturing relationships between symptoms, findings, tests, and diagnoses with supporting evidence
3. By automatically diagnosing patients without physician input
4. By storing only the final diagnosis without intermediate steps
</div>

??? question "Show Answer"
    The correct answer is **B**. Graph models capture diagnostic complexity through a network of relationships connecting the diagnosis to its supporting evidence, including patient-reported symptoms, physical examination findings, laboratory test results, and imaging studies. A DIAGNOSIS relationship connects a Patient to a Disease node with properties including diagnosis_date, diagnosing_provider, confidence_level, and links to supporting evidence, enabling sophisticated clinical reasoning and decision support that relational databases struggle to represent efficiently.

    **Concept Tested:** Diagnosis

    **See:** [Diagnosis](index.md#diagnosis)

---

#### 5. Why is the three-level distinction between prescriptions, medications, and dosages essential in medication modeling?

<div class="upper-alpha" markdown>
1. To enable medication safety analysis, therapeutic equivalence, and formulary management
2. To comply with pharmacy billing requirements
3. To reduce the number of nodes in the graph database
4. To eliminate the need for drug interaction checking
</div>

??? question "Show Answer"
    The correct answer is **A**. The three-level structure is essential for modeling medication safety, therapeutic equivalence, and formulary management. Medication nodes represent the drug substance (generic or brand) with pharmacological properties, Prescription nodes represent specific orders for a patient linking Patient, Medication, Provider, and Pharmacy, while Dosage is typically modeled as properties on the prescription specifying quantity, frequency, and route of administration. This hierarchy enables queries about drug classes, patient-specific orders, and dose-dependent interactions.

    **Concept Tested:** Prescription, Medication, Dosage

    **See:** [Prescription, Medication, and Dosage](index.md#prescription-medication-and-dosage)

---

#### 6. How do graph databases excel at identifying drug-drug interaction risks in real-time?

<div class="upper-alpha" markdown>
1. By storing fewer medications per patient
2. By requiring manual review of all prescriptions
3. By efficiently traversing from active prescriptions through interaction relationships to identify conflicts
4. By preventing doctors from prescribing more than one medication
</div>

??? question "Show Answer"
    The correct answer is **C**. Graph databases excel at medication safety analysis because they can efficiently query complex networks of drug-drug interactions, drug-disease contraindications, and drug-allergy conflicts in real-time as prescriptions are written. A single graph query can traverse from a patient's active prescriptions through interaction relationships to identify potential safety issues, checking pharmacokinetic interactions, pharmacodynamic interactions, synergistic effects, and contraindications without expensive JOIN operations.

    **Concept Tested:** Drug Interaction

    **See:** [Drug Interactions and Adverse Events](index.md#drug-interactions-and-adverse-events)

---

#### 7. A hospital wants to identify all diabetic patients who have not had an HbA1c test in the last 6 months for proactive outreach. Which graph modeling approach would best support this query?

<div class="upper-alpha" markdown>
1. Store all lab data in a separate relational database unconnected to the graph
2. Only store the most recent lab result for each patient
3. Model lab orders and results with timestamp properties on relationships connecting patients to lab test nodes
4. Eliminate temporal data to simplify the graph structure
</div>

??? question "Show Answer"
    The correct answer is **C**. Modeling temporal data in graphs typically involves timestamp properties on relationships rather than separate time-series tables. Lab Order nodes connect to Lab Test nodes, which connect to Lab Result nodes with result_date properties, enabling efficient chronological queries. The hospital can query: "Find all patients with a DIAGNOSED_WITH relationship to diabetes who do not have a HAS_LAB_RESULT relationship to HbA1c test with result_date in the last 6 months" without complex date-based JOINs.

    **Concept Tested:** Lab Test, Lab Result

    **See:** [Lab Tests and Lab Results](index.md#lab-tests-and-lab-results)

---

#### 8. A healthcare system wants to analyze which treatment protocols produce better outcomes for specific patient populations. Which graph modeling elements would be most important?

<div class="upper-alpha" markdown>
1. Only the final diagnosis codes
2. Outcome nodes connected to treatments, providers, care processes, and patient characteristics
3. Billing codes without clinical data
4. Patient demographics without treatment history
</div>

??? question "Show Answer"
    The correct answer is **B**. Patient Outcomes represent the results of healthcare interventions and must be connected to the treatments, providers, and care processes that produced them to enable comparative effectiveness analysis. Outcome nodes with properties for clinical outcomes (HbA1c levels, blood pressure), functional outcomes (mobility, daily activities), and patient-reported outcomes (pain, satisfaction) link to treatment protocols, enabling queries like "Which treatment protocols for diabetes produce better HbA1c outcomes for patients with specific comorbidities?"

    **Concept Tested:** Patient Outcome

    **See:** [Patient Outcome](index.md#patient-outcome)

---

#### 9. A care coordination team needs to visualize a complex patient's journey across multiple providers, facilities, and conditions over 24 months. What graph analytics approach would be most effective?

<div class="upper-alpha" markdown>
1. Generate a simple list of dates and provider names
2. Only show the most recent three encounters
3. Display billing data without clinical context
4. Traverse temporal relationships connecting encounters, providers, facilities, diagnoses, and transitions ordered by timestamp
</div>

??? question "Show Answer"
    The correct answer is **D**. Patient journey analysis in graph databases traverses the entire experience across multiple conditions, providers, facilities, and health states by following temporal relationships. The journey graph includes Encounter nodes (office visits, hospitalizations, ER, telehealth), Provider nodes, Facility nodes, and Transition nodes (admissions, discharges, referrals), all connected with timestamp properties. Traversing these relationships chronologically reveals care fragmentation, coordination gaps, and transition points where patients may be lost to follow-up.

    **Concept Tested:** Patient Journey

    **See:** [Patient Journey](index.md#patient-journey)

---

#### 10. Analyzing the chapter's medication safety network, what underlying pattern makes graph databases particularly effective compared to relational databases for this use case?

<div class="upper-alpha" markdown>
1. Graph databases store less data overall
2. The many-to-many relationships between drugs, interactions, allergies, and conditions create complex networks that graphs traverse natively
3. Relational databases cannot store medication names
4. Graph databases automatically prevent all medication errors
</div>

??? question "Show Answer"
    The correct answer is **B**. Medication safety requires analyzing complex many-to-many relationships: multiple active medications may interact with each other, each medication may have multiple interactions and contraindications, patients have multiple allergies, and patients have multiple conditions that may contraindicate certain drugs. Relational databases require multiple JOIN operations across many tables to check these relationships, while graph databases represent them natively and can traverse from a patient's active prescriptions through interaction, allergy, and contraindication relationships in a single efficient query.

    **Concept Tested:** Drug Interaction, Patient Record

    **See:** [Drug Interactions and Adverse Events](index.md#drug-interactions-and-adverse-events)
