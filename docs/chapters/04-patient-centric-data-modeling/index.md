# Patient-Centric Data Modeling

## Summary

This chapter focuses on modeling healthcare data from the patient perspective, placing the patient record at the center of the graph model. You will learn to model patient demographics, medical history, diseases, conditions, symptoms, diagnoses, treatment plans, prescriptions, medications, lab tests, vital signs, allergies, immunizations, care plans, and patient journeys. This comprehensive approach to patient data modeling enables better care coordination, chronic disease management, and improved patient outcomes.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

1. Patient Record
2. Patient ID
3. Patient History
4. Disease
5. Medical Condition
6. Symptom
7. Diagnosis
8. Treatment Plan
9. Prescription
10. Medication
11. Dosage
12. Drug Interaction
13. Adverse Event
14. Allergy
15. Immunization
16. Lab Test
17. Lab Result
18. Vital Sign
19. Care Plan
20. Treatment Timeline
21. Patient Journey
22. Chronic Disease Management
23. Preventive Care
24. Patient Outcome
25. Quality of Life Metric

## Prerequisites

This chapter builds on concepts from:

- [Chapter 02: Introduction to Healthcare Systems](../02-intro-to-healthcare-systems/index.md)
- [Chapter 03: Graph Query Languages and Technologies](../03-graph-query-languages/index.md)

---

## Introduction: The Patient at the Center

Healthcare data modeling traditionally organized information around administrative and billing structures, reflecting the operational priorities of healthcare institutions rather than the clinical realities of patient care. This approach, while convenient for financial systems, created fragmented views of patient health that hindered care coordination and clinical decision-making. By placing the patient record at the center of our graph model, we align data structures with clinical workflows and enable comprehensive analysis of patient health trajectories, treatment efficacy, and care quality.

Graph databases excel at patient-centric modeling because healthcare data is inherently relationship-rich. A single patient's health record connects to providers, facilities, diagnoses, medications, lab results, and countless other entities through complex temporal and causal relationships. Traditional relational databases require expensive JOIN operations to reconstruct these connections, while graph models represent them natively, enabling real-time queries across a patient's complete medical history.

In this chapter, you will learn to model comprehensive patient data using labeled property graphs, focusing on clinical entities, their relationships, and the temporal dimensions that make healthcare data uniquely challenging. We will build a patient-centric schema that supports chronic disease management, care coordination, medication safety, and outcome measurement while maintaining the flexibility to accommodate evolving clinical practices.

## Foundational Patient Data Elements

### Patient Record

The **Patient Record** serves as the central node in a patient-centric graph model, representing the complete collection of health information for an individual person across all encounters, conditions, and treatments. Unlike traditional database implementations where patient data is scattered across dozens of normalized tables, the graph model maintains a single authoritative Patient node that serves as the hub for all related clinical, demographic, and administrative information.

Key properties of a Patient Record node include:

- **patient_id**: Unique identifier (often a UUID or enterprise master patient index number)
- **demographics**: Birth date, gender, ethnicity, preferred language
- **contact_info**: Current address, phone numbers, email
- **insurance_info**: Links to payer coverage records
- **created_date**: Initial record creation timestamp
- **last_updated**: Most recent modification timestamp
- **status**: Active, deceased, merged, or inactive

### Patient ID and Master Patient Index

The **Patient ID** presents one of the most challenging aspects of healthcare data modeling due to the proliferation of identifier systems across healthcare organizations. A single patient may have different identifiers at each hospital, clinic, insurance company, and pharmacy they interact with, creating significant obstacles for care coordination and data integration.

Graph databases provide elegant solutions to the patient identification problem through their native support for multiple relationships and flexible schema. Rather than forcing a single canonical identifier, we can model multiple identifier types as nodes connected to the patient record, each with properties indicating the issuing system, identifier type, and validity period.

<details markdown="1">
    <summary>Patient Identifier Graph Model</summary>
    Type: graph-model

    Purpose: Illustrate how multiple patient identifiers are connected to a single patient record node

    Node types:
    1. Patient (large blue circle)
       - Properties: master_patient_id, name, birth_date
       - Example: "Jane Smith, DOB: 1985-03-15"

    2. Identifier (small orange rectangles)
       - Properties: identifier_value, type, issuing_system, active_status
       - Examples:
         - "MRN-12345 (Hospital A Medical Record Number)"
         - "SSN-123-45-6789 (Social Security Number)"
         - "INSUR-987654 (Insurance Member ID)"
         - "MRN-98765 (Hospital B Medical Record Number)"

    3. Identity System (gray hexagons)
       - Properties: system_name, authority, jurisdiction
       - Examples: "Hospital A EHR", "National SSN Registry", "Insurance Provider X"

    Edge types:
    1. HAS_IDENTIFIER (solid blue arrows from Patient to Identifier)
       - Properties: assigned_date, confidence_score

    2. ISSUED_BY (dashed gray arrows from Identifier to Identity System)
       - Properties: issue_date, expiration_date

    Sample data:
    - Patient "Jane Smith"
      ├─ HAS_IDENTIFIER → MRN-12345
      │  └─ ISSUED_BY → Hospital A EHR
      ├─ HAS_IDENTIFIER → MRN-98765
      │  └─ ISSUED_BY → Hospital B EHR
      ├─ HAS_IDENTIFIER → SSN-123-45-6789
      │  └─ ISSUED_BY → National SSN Registry
      └─ HAS_IDENTIFIER → INSUR-987654
         └─ ISSUED_BY → Insurance Provider X

    Layout: Radial with Patient node at center and identifiers arranged in a circle around it

    Interactive features:
    - Hover over Identifier node: Show full identifier details and issuing system
    - Click Patient node: Highlight all associated identifiers
    - Double-click Identifier: Show historical record of use
    - Filter: Toggle identifier types on/off (MRN, SSN, Insurance, etc.)

    Visual styling:
    - Patient node: Large (60px), blue, labeled with name
    - Identifier nodes: Medium (40px), orange, labeled with ID value
    - System nodes: Small (30px), gray, labeled with system name
    - Active identifiers: Solid border
    - Inactive identifiers: Dashed border

    Legend:
    - Node shapes: Circle = Patient, Rectangle = Identifier, Hexagon = System
    - Edge styles: Solid = direct association, Dashed = system relationship
    - Border styles: Solid = active, Dashed = inactive

    Implementation: vis-network JavaScript library
    Canvas size: 800x600px
</details>

### Patient History

**Patient History** encompasses the longitudinal record of all clinical events, encounters, and health status changes for an individual patient over time. In a graph model, patient history is not stored as a single monolithic document but rather emerges from the temporal network of relationships connecting the patient to clinical events, ordered by timestamp properties.

The graph representation of patient history provides several advantages over traditional approaches:

- **Temporal queries**: Efficiently retrieve events within specific time windows
- **Causal inference**: Trace relationships between treatments and outcomes
- **Pattern detection**: Identify recurring conditions or treatment cycles
- **Comparative analysis**: Compare patient trajectories across populations

Modeling temporal data in graphs typically involves timestamp properties on relationships rather than separate time-series tables. For example, a DIAGNOSED_WITH relationship between a Patient and a Disease node would include diagnosis_date and diagnosis_status properties, enabling efficient chronological queries without complex date-based JOINs.

| Historical Query Type | Graph Approach | RDBMS Approach |
|-----------------------|----------------|----------------|
| Recent encounters | MATCH path with date filter on edges | JOIN with WHERE clause on date column |
| Event sequences | Traverse relationships ordered by timestamp | Multiple self-JOINs with date ordering |
| Concurrent conditions | Pattern match overlapping date ranges | Complex date arithmetic in WHERE clauses |
| Longitudinal trends | Aggregate properties along temporal paths | Window functions over partitioned data |

## Clinical Entities: Diseases, Conditions, and Symptoms

### Disease and Medical Condition

The terms **Disease** and **Medical Condition** are often used interchangeably in casual conversation, but graph models benefit from distinguishing between them. A disease represents a specific pathological process with defined etiology and progression (e.g., Type 2 Diabetes Mellitus, Coronary Artery Disease), while a medical condition encompasses a broader range of health states including diseases, injuries, disorders, and syndromes.

In a patient-centric graph model, diseases and conditions are typically represented as separate node types connected to standardized medical vocabularies:

- **Disease nodes**: Link to ICD-10 codes, SNOMED CT concepts, and disease ontologies
- **Condition nodes**: Represent patient-specific manifestations with properties for severity, onset date, and resolution status

This dual-level modeling enables both population-level analysis using standardized disease categories and patient-specific clinical documentation that captures individual variation and comorbidity patterns.

Common properties for Disease nodes:

- **disease_code**: ICD-10 or SNOMED CT identifier
- **disease_name**: Canonical name from medical vocabulary
- **category**: Disease classification (infectious, chronic, genetic, etc.)
- **typical_progression**: General disease trajectory
- **risk_factors**: Common predisposing factors

Common properties for Medical Condition nodes (patient-specific):

- **condition_id**: Unique instance identifier
- **onset_date**: When condition first manifested
- **severity**: Mild, moderate, severe, critical
- **status**: Active, resolved, in remission, chronic
- **notes**: Clinical narrative describing patient-specific details

### Symptoms

**Symptoms** represent the subjective experiences reported by patients, forming the foundation of clinical reasoning and diagnostic processes. In graph models, symptoms connect patients to potential diagnoses through probabilistic relationships, enabling clinical decision support systems that reason over symptom patterns.

The relationship between patients, symptoms, and diseases creates a complex many-to-many network where:

- A single disease may present with multiple symptoms (Type 2 Diabetes → polydipsia, polyuria, fatigue)
- A single symptom may indicate multiple possible diseases (chest pain → cardiac disease, GERD, anxiety, musculoskeletal injury)
- Symptom combinations provide stronger diagnostic signals than individual symptoms

<details markdown="1">
    <summary>Symptom-Disease Diagnostic Network</summary>
    Type: graph-model

    Purpose: Illustrate the many-to-many relationships between symptoms and diseases, showing how symptom patterns inform differential diagnosis

    Node types:
    1. Patient (blue circle, large)
       - Properties: patient_id, name
       - Example: "Patient A"

    2. Symptom Instance (yellow squares, medium)
       - Properties: symptom_type, severity, onset_date, duration
       - Examples:
         - "Chest pain (severe, 2hr duration)"
         - "Shortness of breath (moderate, 1 day)"
         - "Fatigue (mild, 2 weeks)"

    3. Symptom Type (yellow circles, small)
       - Properties: symptom_name, body_system
       - Examples: "Chest Pain", "Dyspnea", "Fatigue", "Nausea"

    4. Disease (red octagons, medium)
       - Properties: disease_name, ICD_code, prevalence
       - Examples:
         - "Myocardial Infarction (I21)"
         - "Pulmonary Embolism (I26)"
         - "GERD (K21.9)"
         - "Anxiety Disorder (F41.9)"

    Edge types:
    1. REPORTS_SYMPTOM (solid blue arrows: Patient → Symptom Instance)
       - Properties: reported_date, severity_score

    2. INSTANCE_OF (dashed yellow arrows: Symptom Instance → Symptom Type)
       - Properties: none

    3. ASSOCIATED_WITH (solid red arrows: Symptom Type → Disease)
       - Properties: probability, specificity, sensitivity
       - Example: Chest Pain → MI (probability: 0.35, specificity: 0.60)

    Sample data:
    - Patient A
      ├─ REPORTS_SYMPTOM → Chest pain instance
      │  └─ INSTANCE_OF → Chest Pain (type)
      │     ├─ ASSOCIATED_WITH → Myocardial Infarction (prob: 0.35)
      │     ├─ ASSOCIATED_WITH → Pulmonary Embolism (prob: 0.15)
      │     ├─ ASSOCIATED_WITH → GERD (prob: 0.25)
      │     └─ ASSOCIATED_WITH → Anxiety Disorder (prob: 0.10)
      └─ REPORTS_SYMPTOM → Shortness of breath instance
         └─ INSTANCE_OF → Dyspnea (type)
            ├─ ASSOCIATED_WITH → Myocardial Infarction (prob: 0.40)
            ├─ ASSOCIATED_WITH → Pulmonary Embolism (prob: 0.55)
            └─ ASSOCIATED_WITH → Anxiety Disorder (prob: 0.15)

    Layout: Hierarchical with patient at top, symptom instances in second tier, symptom types in third tier, and diseases at bottom

    Interactive features:
    - Hover over ASSOCIATED_WITH edge: Show probability, sensitivity, specificity values
    - Click Symptom Type: Highlight all associated diseases with probability labels
    - Click Disease: Show all symptoms that may indicate this disease
    - Multi-select: Select multiple symptom instances to see diseases associated with that combination (Bayesian inference)
    - Toggle: Show/hide probability threshold filter

    Visual styling:
    - Edge thickness proportional to probability value
    - Disease nodes colored by likelihood given selected symptoms (green = high, yellow = medium, red = low)
    - Animated pulse on high-probability diseases when multiple symptoms selected

    Legend:
    - Node shapes: Circle = Patient/Type, Square = Instance, Octagon = Disease
    - Edge styles: Solid = direct association, Dashed = type relationship
    - Color coding: Blue = patient/symptoms, Red = diseases, edge thickness = probability

    Implementation: vis-network JavaScript library
    Canvas size: 1000x800px
</details>

### Diagnosis

A **Diagnosis** represents a clinical determination that a patient has a specific disease or condition, made by a healthcare provider based on symptoms, examination findings, and diagnostic test results. In graph models, diagnoses serve as critical relationship nodes that link patients to diseases with associated context including diagnosing provider, date, confidence level, and supporting evidence.

The diagnostic process involves complex reasoning over multiple information sources:

- Patient-reported symptoms and medical history
- Physical examination findings
- Laboratory test results
- Imaging studies
- Differential diagnosis consideration
- Clinical guidelines and decision support

Graph models capture this diagnostic complexity through a network of relationships connecting the diagnosis to its supporting evidence. A DIAGNOSIS relationship might connect a Patient to a Disease node, with properties including:

- **diagnosis_date**: Timestamp of clinical determination
- **diagnosing_provider**: Reference to the provider who made the diagnosis
- **confidence_level**: Confirmed, suspected, provisional, ruled out
- **primary_or_secondary**: Whether this is the primary diagnosis for an encounter
- **supporting_evidence**: Links to lab results, imaging reports, symptoms
- **differential_diagnoses**: Other conditions considered and ruled out

## Treatment and Medication Management

### Treatment Plan

A **Treatment Plan** represents the comprehensive strategy for managing a patient's condition, encompassing medications, procedures, lifestyle modifications, monitoring protocols, and care coordination activities. In graph models, treatment plans are complex subgraphs that connect patients, conditions, interventions, providers, and outcome goals through temporal relationships.

Effective treatment plan modeling must capture:

- **Goals**: Measurable clinical objectives (e.g., reduce HbA1c below 7.0%, maintain blood pressure under 130/80)
- **Interventions**: Specific actions prescribed (medications, procedures, therapies)
- **Timeline**: Expected duration and milestone dates
- **Monitoring**: What metrics to track and how frequently
- **Care team**: All providers involved and their roles
- **Patient instructions**: Education materials and self-care activities

Graph representations of treatment plans enable sophisticated care coordination queries, such as identifying all patients with treatment plans requiring adjustment based on new clinical guidelines, or finding patients whose treatment adherence has declined.

### Prescription, Medication, and Dosage

**Prescriptions** represent the clinical orders for medications, while **Medications** are the pharmaceutical substances themselves. **Dosage** specifies the quantity, frequency, and route of administration. This three-level distinction is essential for modeling medication safety, therapeutic equivalence, and formulary management.

In a patient-centric graph model, these concepts form a hierarchical structure:

- **Medication node**: Represents the drug substance (generic or brand) with pharmacological properties
- **Prescription node**: Represents a specific order for a patient, linking Patient, Medication, Provider, and Pharmacy
- **Dosage**: Typically modeled as properties on the prescription relationship rather than separate nodes

Common Medication properties:

- **medication_name**: Generic or brand name
- **drug_code**: NDC (National Drug Code), RxNorm code
- **drug_class**: Therapeutic category (e.g., ACE inhibitor, statin, SSRI)
- **route**: Oral, intravenous, topical, inhalation
- **form**: Tablet, capsule, liquid, injection

Common Prescription properties:

- **prescription_id**: Unique order identifier
- **prescribed_date**: When order was written
- **quantity**: Amount dispensed
- **dosage**: Dose strength (e.g., "10mg")
- **frequency**: Timing instructions (e.g., "twice daily", "every 8 hours")
- **duration**: How long to continue (e.g., "30 days", "until resolved")
- **refills_remaining**: Number of authorized refills
- **prescribing_provider**: Reference to ordering physician
- **pharmacy**: Where prescription is filled

| Medication Data Element | Patient-Specific? | Changes Over Time? | Example Values |
|-------------------------|-------------------|--------------------|----------------|
| Generic drug name | No | No | "Metformin" |
| Brand name | No | No | "Glucophage" |
| Drug class | No | No | "Biguanide antidiabetic" |
| Prescribed dosage | Yes | No (per prescription) | "500mg twice daily" |
| Quantity dispensed | Yes | No (per fill) | "60 tablets" |
| Refills remaining | Yes | Yes | 3 → 2 → 1 → 0 |
| Adherence rate | Yes | Yes | 95% → 87% → 92% |

### Drug Interactions and Adverse Events

**Drug Interactions** occur when two or more medications affect each other's pharmacokinetics or pharmacodynamics, potentially reducing efficacy or increasing toxicity. **Adverse Events** are harmful or undesired outcomes that occur during or after medication use, which may or may not be causally related to the drug.

Graph databases excel at medication safety analysis because they can efficiently query complex networks of drug-drug interactions, drug-disease contraindications, and drug-allergy conflicts in real-time as prescriptions are written. A single query can traverse from a patient's active prescriptions through interaction relationships to identify potential safety issues.

Types of drug interactions modeled in graph databases:

- **Pharmacokinetic interactions**: One drug affects absorption, distribution, metabolism, or excretion of another
- **Pharmacodynamic interactions**: Drugs with similar or opposing effects create additive or antagonistic outcomes
- **Synergistic interactions**: Combined effect exceeds sum of individual effects
- **Contraindications**: Drug should not be used with specific conditions or other drugs

<details markdown="1">
    <summary>Medication Safety Network Interactive Infographic</summary>
    Type: infographic

    Purpose: Create an interactive visualization showing how graph databases identify medication safety issues by traversing relationships between prescribed medications, known interactions, patient allergies, and existing conditions

    Layout: Central patient node with four quadrants radiating outward

    Quadrants:
    1. Top-left: Active Medications (green circles)
    2. Top-right: Known Drug Interactions (red warning triangles)
    3. Bottom-left: Patient Allergies (orange circles)
    4. Bottom-right: Existing Conditions (blue circles)

    Central element:
    - Patient icon with name "John Doe"
    - Real-time safety status indicator (green checkmark or red warning)

    Active Medications (top-left quadrant):
    - Warfarin 5mg daily (blood thinner)
    - Aspirin 81mg daily (antiplatelet)
    - Ibuprofen 400mg PRN (NSAID)
    - Metformin 1000mg twice daily (diabetes)

    Drug Interactions (top-right quadrant):
    - HIGH RISK: Warfarin + Aspirin + Ibuprofen (triple interaction, bleeding risk)
    - MODERATE: Metformin + contrast dye (if imaging scheduled)

    Allergies (bottom-left quadrant):
    - Penicillin (severe, anaphylaxis)
    - Sulfa drugs (moderate, rash)

    Existing Conditions (bottom-right quadrant):
    - Atrial fibrillation (indication for Warfarin)
    - Type 2 Diabetes (indication for Metformin)
    - Chronic kidney disease stage 3a (affects drug clearance)

    Interactive elements:
    1. Hover over medication: Shows full details, indications, warnings
    2. Click medication: Highlights all interactions, allergies, and condition relationships
    3. Click interaction warning: Shows detailed explanation of mechanism and risk level
    4. Click "Add New Prescription" button: Opens simulation where user can test adding a new medication to see if warnings appear
    5. Toggle "Interaction Severity" filter: Show only high-risk, or include moderate and low-risk

    Connection lines:
    - Solid red lines: Direct drug-drug interactions
    - Dashed orange lines: Drug-allergy conflicts
    - Dotted blue lines: Drug-condition contraindications
    - Green lines: Appropriate drug-condition treatment (indication)

    Animation:
    - When page loads, medications appear one by one
    - As each medication appears, interaction lines draw in real-time
    - If high-risk interaction detected, central safety indicator turns red with pulse animation

    Educational callout boxes (reveal on click):
    - "Why does this interaction matter?" - Clinical significance explanation
    - "What should be done?" - Mitigation strategies (dose adjustment, monitoring, alternative drug)
    - "How common is this?" - Prevalence statistics

    Implementation: HTML/CSS/JavaScript with SVG for connection lines
    Canvas size: 900x900px (square layout)
</details>

### Allergies and Immunizations

**Allergies** document patient hypersensitivity reactions to medications, foods, environmental factors, or other substances. Accurate allergy documentation is critical for medication safety, as graph queries can instantly identify conflicts between newly prescribed medications and documented allergies before orders are transmitted to pharmacies.

**Immunizations** record vaccinations administered to patients, providing protection against infectious diseases. In graph models, immunizations link patients to vaccine types with administration dates, enabling population health queries for immunization coverage rates, outbreak risk assessment, and vaccine schedule compliance.

Allergy properties in graph models:

- **allergen**: Substance causing reaction (drug name, drug class, food, environmental)
- **reaction_type**: Anaphylaxis, rash, nausea, headache, etc.
- **severity**: Mild, moderate, severe, life-threatening
- **onset_date**: When allergy was first identified
- **verified**: Confirmed vs. reported vs. suspected
- **notes**: Details about reaction circumstances

Immunization properties:

- **vaccine_name**: Standardized vaccine name (e.g., "Influenza", "COVID-19 mRNA", "Tdap")
- **vaccine_code**: CVX (vaccine administered) code
- **administration_date**: When vaccine was given
- **dose_number**: Which dose in series (e.g., dose 2 of 3)
- **lot_number**: Manufacturing batch identifier for safety tracking
- **administering_provider**: Who gave the vaccine
- **site**: Anatomical location (left deltoid, right deltoid, etc.)

## Diagnostic Testing and Monitoring

### Lab Tests and Lab Results

**Lab Tests** represent the ordered diagnostic procedures (e.g., Complete Blood Count, Hemoglobin A1c, Lipid Panel), while **Lab Results** contain the actual measured values returned from the laboratory. In graph models, this distinction enables queries across both the ordering patterns (what tests are commonly ordered together) and the result patterns (how results correlate with diagnoses and outcomes).

Graph representations of laboratory data support several advanced analytics use cases:

- **Temporal trending**: Track how lab values change over time for chronic disease management
- **Correlation analysis**: Identify relationships between multiple lab values
- **Diagnostic support**: Compare patient results to reference ranges and disease-specific patterns
- **Cost optimization**: Analyze testing patterns to identify redundant or low-value orders

A typical lab data subgraph includes:

- **Lab Order node**: Properties include order_date, ordering_provider, order_status, priority (routine/urgent/STAT)
- **Lab Test node**: Properties include test_name, LOINC_code, typical_reference_range, unit_of_measure
- **Lab Result node**: Properties include result_value, result_status (preliminary/final/corrected), result_date, abnormal_flag
- **Relationships**: ORDERS (Provider → Lab Order), INCLUDES_TEST (Lab Order → Lab Test), HAS_RESULT (Lab Test → Lab Result), FOR_PATIENT (Lab Order → Patient)

### Vital Signs

**Vital Signs** represent the basic physiological measurements taken during clinical encounters, including temperature, pulse, blood pressure, respiratory rate, oxygen saturation, height, weight, and body mass index. These measurements provide essential baseline health status information and enable monitoring of disease progression and treatment response.

In patient-centric graph models, vital signs are typically modeled as time-series relationships connecting patients to measurement events with timestamp and value properties. This approach enables efficient queries for recent vital signs, trend analysis, and alerting when values fall outside normal ranges.

Common vital sign measurements:

- **Body temperature**: Measured in Fahrenheit or Celsius
- **Heart rate**: Beats per minute
- **Blood pressure**: Systolic/diastolic in mmHg
- **Respiratory rate**: Breaths per minute
- **Oxygen saturation**: Percentage (SpO2)
- **Height**: Centimeters or inches
- **Weight**: Kilograms or pounds
- **BMI**: Calculated from height and weight

<details markdown="1">
    <summary>Vital Signs Trend Visualization MicroSim</summary>
    Type: microsim

    Learning objective: Demonstrate how vital signs data stored in graph databases can be queried and visualized as time-series trends for chronic disease monitoring, enabling clinicians to identify patterns and treatment responses

    Canvas layout (1000x700px):
    - Top section (1000x500): Chart area showing time-series line graphs
    - Bottom section (1000x200): Control panel with patient selector and options

    Visual elements in chart area:
    - X-axis: Time (dates spanning 6 months)
    - Y-axis (left): Blood pressure (mmHg, range 80-180)
    - Y-axis (right): Heart rate (bpm, range 50-120)
    - Line graphs:
      - Blue line: Systolic blood pressure
      - Green line: Diastolic blood pressure
      - Red line: Heart rate
    - Reference zones (shaded backgrounds):
      - Normal BP zone (110-130 systolic, 70-85 diastolic) in light green
      - Elevated BP zone (130-140 systolic) in light yellow
      - Hypertensive zone (above 140 systolic) in light red
    - Data points: Circles on each line at measurement dates
    - Hover markers: Show exact values and dates

    Interactive controls (bottom panel):
    - Patient selector dropdown: Choose from 5 sample patients with different conditions
      - Patient A: Hypertension, improving with treatment
      - Patient B: Normal vitals, stable
      - Patient C: Hypertension, poorly controlled
      - Patient D: Bradycardia and hypotension
      - Patient E: Variable BP, medication non-adherence

    - Date range slider: Adjust time window (1 month to 2 years)

    - Vital sign checkboxes: Toggle which vitals to display
      - Systolic BP
      - Diastolic BP
      - Heart rate
      - Weight
      - BMI

    - Measurement frequency dropdown: Show all measurements vs. monthly averages

    - Annotate events button: Toggle display of clinical events (medication changes, hospitalizations)

    Default parameters:
    - Patient: Patient A (improving hypertension)
    - Date range: 6 months
    - Vitals displayed: Systolic BP, Diastolic BP, Heart rate
    - Show all measurements (not averaged)

    Behavior:
    - On page load, display Patient A's data with 6-month trend
    - When patient selected, animate transition to new patient's data
    - When date range adjusted, smoothly zoom time axis
    - When vital sign toggled off, fade out that line graph
    - When hovering over data point, show tooltip with:
      - Exact measurement value
      - Date and time
      - Encounter type (office visit, hospital, home monitoring)
      - Notes if available
    - When "Annotate events" toggled on, show vertical markers for:
      - Medication started/stopped/adjusted (orange markers)
      - Hospitalizations (red markers)
      - Lifestyle interventions (green markers)

    Educational features:
    - Info icon next to each vital sign: Click to see normal ranges and clinical significance
    - "Graph Query" button: Shows the Cypher query used to retrieve this time-series data from the graph database
    - "Compare Patients" mode: Split screen showing two patients side-by-side

    Implementation notes:
    - Use p5.js for canvas rendering and interactive controls
    - Store sample patient data as JavaScript objects simulating graph query results
    - Use frameCount for smooth animations
    - Implement hover detection with distance calculations to data points
    - Color code zones using alpha transparency for overlapping reference ranges
</details>

## Comprehensive Care Management

### Care Plans

A **Care Plan** represents a comprehensive, coordinated approach to managing a patient's health needs, integrating multiple treatment plans, monitoring protocols, educational interventions, and care team coordination activities. Care plans are particularly important for patients with chronic diseases or complex medical needs requiring multi-disciplinary care.

Care plans in graph models create rich subgraphs connecting:

- **Patient**: The individual receiving care
- **Conditions**: All active diagnoses being managed
- **Goals**: Specific, measurable clinical objectives
- **Interventions**: Treatments, medications, procedures, education
- **Providers**: Care team members and their roles
- **Timeline**: Milestones and review dates
- **Outcomes**: Achieved results and quality metrics

Graph queries enable sophisticated care plan analytics, such as identifying patients whose care plans have not been reviewed within recommended timeframes, finding patients with specific goal patterns that predict successful outcomes, or analyzing which care team compositions produce better results for specific conditions.

### Treatment Timelines

**Treatment Timelines** provide chronological views of all therapeutic interventions for a patient, enabling visualization of treatment sequences, identification of temporal patterns, and analysis of time-to-outcome relationships. In graph models, treatment timelines emerge from traversing temporal relationships rather than being stored as separate timeline objects.

Key timeline query patterns include:

- **Sequence analysis**: What treatments typically follow an initial diagnosis?
- **Duration analysis**: How long do patients remain on specific therapies?
- **Switching patterns**: When and why do providers change treatment approaches?
- **Outcome correlation**: Do faster treatment initiation times produce better outcomes?

<details markdown="1">
    <summary>Patient Treatment Timeline Workflow Diagram</summary>
    Type: workflow

    Purpose: Illustrate the typical progression from diagnosis through treatment phases for a chronic disease patient, showing how graph databases capture temporal relationships and enable timeline reconstruction

    Visual style: Horizontal flowchart with time-based positioning and vertical swimlanes

    Swimlanes (top to bottom):
    1. Patient Status
    2. Diagnostic Activities
    3. Treatment Interventions
    4. Monitoring Activities
    5. Outcomes/Adjustments

    Timeline: Spans 12 months, marked at 0, 3, 6, 9, and 12 months

    Steps:

    Month 0 - Initial Diagnosis:
    Patient Status: "Symptoms onset - fatigue, increased thirst"
    Diagnostic: "Lab tests ordered (HbA1c, fasting glucose)"
    Treatment: None yet
    Monitoring: None yet
    Hover text: "Patient presents with classic Type 2 Diabetes symptoms"

    Month 0.5 - Diagnosis Confirmed:
    Patient Status: "Diagnosed with Type 2 Diabetes"
    Diagnostic: "Lab results: HbA1c 8.5%, fasting glucose 180 mg/dL"
    Treatment: "Started Metformin 500mg BID"
    Monitoring: "Patient education - diet, exercise, glucose monitoring"
    Hover text: "Graph query: CREATE (p:Patient)-[:DIAGNOSED_WITH {date: '2024-01-15'}]->(d:Disease {name: 'Type 2 Diabetes'})"

    Month 1 - Initial Monitoring:
    Patient Status: "Adjusting to medication"
    Diagnostic: "Home glucose log review"
    Treatment: "Continue Metformin"
    Monitoring: "Weekly glucose checks, side effect assessment"
    Hover text: "Patient reports mild GI upset, improving with food timing"

    Month 3 - First Follow-up:
    Patient Status: "Partial improvement"
    Diagnostic: "Repeat labs: HbA1c 7.8%, weight down 5 lbs"
    Treatment: "Increase Metformin to 1000mg BID"
    Monitoring: "Monthly glucose reviews, dietary counseling"
    Hover text: "Treatment response tracked via graph relationship properties: {response: 'partial', A1c_change: -0.7}"

    Month 6 - Mid-Point Assessment:
    Patient Status: "Plateau in improvement"
    Diagnostic: "Repeat labs: HbA1c 7.5%, weight stable"
    Treatment: "Add Jardiance 10mg daily (SGLT2 inhibitor)"
    Monitoring: "Biweekly glucose checks, CV risk assessment"
    Hover text: "Graph captures treatment intensification: (p)-[:PRESCRIBED {date: '2024-07-15'}]->(m:Medication {name: 'Jardiance'})"

    Month 9 - Response Evaluation:
    Patient Status: "Significant improvement"
    Diagnostic: "Repeat labs: HbA1c 6.8%, weight down 12 lbs total"
    Treatment: "Continue current regimen"
    Monitoring: "Monthly glucose checks, activity tracker data integration"
    Hover text: "Outcome node created: (o:Outcome {A1c: 6.8, date: '2024-10-15'})<-[:ACHIEVED]-(p)"

    Month 12 - Goal Achievement:
    Patient Status: "At treatment goal"
    Diagnostic: "Repeat labs: HbA1c 6.5%, fasting glucose 105 mg/dL"
    Treatment: "Maintain current medications"
    Monitoring: "Quarterly follow-ups, annual comprehensive metabolic panel"
    Hover text: "Timeline query: MATCH (p:Patient)-[r:DIAGNOSED_WITH|PRESCRIBED|HAS_LAB_RESULT*]->(n) WHERE r.date > '2024-01-01' RETURN r ORDER BY r.date"

    Visual elements:
    - Boxes for each activity, positioned horizontally by time
    - Vertical lines connecting related activities across swimlanes
    - Color coding by status:
      - Diagnosis phase: Blue
      - Initial treatment: Orange
      - Monitoring stable: Green
      - Treatment adjustment: Yellow
      - Goal achievement: Dark green

    Arrows showing workflow progression:
    - Solid arrows: Direct causation (lab result → treatment decision)
    - Dashed arrows: Monitoring/follow-up relationships

    Interactive features:
    - Hover over any box: See detailed clinical notes and graph query patterns
    - Click box: Highlight all related activities across swimlanes
    - Zoom slider: Expand/compress timeline to show more or less detail
    - Filter: Toggle swimlanes on/off to focus on specific aspects

    Annotations:
    - Blue info icons throughout: Click to see example graph database queries
    - "Graph Advantage" callout boxes: Explain how graph traversals enable timeline reconstruction

    Implementation: HTML/CSS/JavaScript with SVG for flowchart elements
    Canvas size: 1200x800px
</details>

## Holistic Patient Views and Advanced Care

### Patient Journey

The **Patient Journey** concept extends beyond treatment timelines to encompass the entire experience of a patient across multiple conditions, providers, facilities, and health states over months or years. Patient journey analysis in graph databases enables healthcare organizations to understand care fragmentation, identify care coordination gaps, and optimize care transitions.

A comprehensive patient journey graph includes:

- **Encounters**: All interactions with healthcare system (office visits, hospitalizations, emergency department visits, telehealth)
- **Providers**: Primary care, specialists, allied health professionals
- **Facilities**: Hospitals, clinics, pharmacies, labs, imaging centers
- **Transitions**: Admissions, discharges, transfers, referrals
- **Interventions**: Diagnostics, treatments, procedures
- **Outcomes**: Health status changes, quality of life measures, patient satisfaction

Graph analytics can identify common journey patterns, such as:

- Patients with multiple ER visits for the same condition (indicating care coordination failure)
- Typical pathways from primary care to specialty care for specific diagnoses
- High-risk transition points where patients are likely to be lost to follow-up
- Facilities or providers with better outcomes for specific patient populations

<details markdown="1">
    <summary>Patient Journey Map Interactive Visualization</summary>
    Type: microsim

    Learning objective: Illustrate how a single patient's healthcare journey spans multiple encounters, providers, and facilities over time, demonstrating the complexity that graph databases are designed to model and query efficiently

    Canvas layout (1200x800px):
    - Top section (1200x100): Patient info header and timeline selector
    - Middle section (1200x600): Interactive journey map visualization
    - Bottom section (1200x100): Legend and statistics panel

    Patient info header:
    - Patient name, age, primary diagnoses
    - Journey duration (e.g., "24-month journey, 37 encounters")
    - Complexity score (calculated from number of providers, conditions, facilities)

    Journey map visualization (middle section):
    Visual representation as a temporal network graph:

    Node types:
    1. Encounter nodes (circles, sized by duration)
       - Office visit (small blue circles)
       - ER visit (medium yellow circles)
       - Hospitalization (large red circles)
       - Telehealth (small green circles)

    2. Provider nodes (squares)
       - Primary care (blue squares)
       - Specialists (orange squares)
       - Hospital physicians (red squares)

    3. Facility nodes (hexagons)
       - Primary care clinic (blue hexagons)
       - Specialist offices (orange hexagons)
       - Hospital (red hexagons)
       - Pharmacy (green hexagons)

    4. Event nodes (triangles)
       - New diagnosis (yellow triangles)
       - New medication (green triangles)
       - Procedure (purple triangles)

    Edges represent transitions:
    - Solid lines: Direct referrals
    - Dashed lines: Patient self-referral
    - Curved lines: Return visits to same provider
    - Color indicates time between encounters (green = quick follow-up, red = delayed)

    Timeline layout:
    - Nodes positioned horizontally by date (left to right = past to present)
    - Vertical position groups by facility/provider
    - Path through nodes shows patient's journey chronologically

    Sample patient journey data (Type 2 Diabetes patient over 24 months):

    Month 0: Primary care visit → Lab work → Diabetes diagnosis
    Month 1: Primary care follow-up → Started Metformin
    Month 3: Primary care check-in → Referred to endocrinologist
    Month 4: Endocrinologist visit → Treatment adjustment
    Month 6: Primary care visit → Pharmacy refills
    Month 7: ER visit for hypoglycemia episode
    Month 7 (next day): Endocrinologist urgent follow-up
    Month 9: Ophthalmology referral → Diabetic retinopathy screening
    Month 12: Primary care annual visit → Preventive care updates
    Month 15: Cardiology referral → Cardiovascular risk assessment
    Month 18: Primary care visit → Medication adherence counseling
    Month 21: Hospitalization for cardiac event
    Month 21 (discharge): Cardiology follow-up scheduled
    Month 22: Cardiac rehabilitation program enrollment
    Month 24: Coordinated care visit (PCP + Endocrinology + Cardiology)

    Interactive controls:
    - Time slider: Filter to show specific date range
    - Node type filters: Toggle encounter types, providers, facilities on/off
    - "Highlight care gaps" button: Show periods > 90 days without follow-up
    - "Trace referral path" mode: Click any encounter to see full referral chain
    - Speed control: Animate journey over time (play button)

    Interactive features:
    - Hover over node: Show detailed information
      - Encounter: Date, type, chief complaint, diagnoses, orders
      - Provider: Name, specialty, facility affiliation
      - Facility: Name, address, type
      - Event: Description, date, related encounters
    - Click node: Highlight all connected nodes and edges
    - Double-click encounter: Expand to show detailed timeline of that visit (orders, results, medications)
    - Right-click node: Show graph query used to find related nodes

    Statistics panel (bottom section):
    Display journey metrics:
    - Total encounters: 37
    - Unique providers: 8
    - Unique facilities: 5
    - Average time between encounters: 19 days
    - Care coordination events: 6 referrals
    - Care gaps identified: 2 periods > 90 days
    - ER visits: 1
    - Hospitalizations: 1
    - Medication adherence rate: 87%

    Legend:
    - Node shapes and their meanings
    - Node colors by encounter type
    - Edge styles and their meanings
    - Size indicators

    Educational callouts:
    - "Graph Query Example" button: Shows Cypher query to reconstruct patient journey
    - Info icons explaining why specific patterns matter (e.g., "Multiple ER visits may indicate care coordination failure")

    Implementation notes:
    - Use p5.js for rendering
    - Implement force-directed layout with horizontal time constraint
    - Store journey data as graph structure (nodes array, edges array)
    - Animate journey playback by revealing nodes sequentially with timed delays
    - Use color interpolation for time-based edge coloring
</details>

### Chronic Disease Management

**Chronic Disease Management** requires coordinated, longitudinal care involving multiple providers, ongoing monitoring, patient self-management support, and regular treatment adjustments. Graph models excel at representing the complex relationships inherent in chronic disease care, enabling analytics that identify patients at risk for complications, track adherence patterns, and measure long-term outcomes.

Key aspects of chronic disease management in graph models:

- **Comorbidity networks**: Patients with multiple chronic conditions require understanding of disease interactions
- **Treatment adherence tracking**: Medication refill patterns and appointment attendance correlate with outcomes
- **Risk stratification**: Combining clinical data, social determinants, and utilization patterns to predict adverse events
- **Population health queries**: Identifying cohorts for proactive outreach or care gap closure initiatives

Common chronic diseases modeled in patient-centric graphs:

- Diabetes (Type 1, Type 2, gestational)
- Cardiovascular disease (coronary artery disease, heart failure, atrial fibrillation)
- Chronic respiratory disease (asthma, COPD)
- Chronic kidney disease
- Hypertension
- Mental health conditions (depression, anxiety, bipolar disorder)
- Autoimmune diseases (rheumatoid arthritis, lupus, multiple sclerosis)

### Preventive Care

**Preventive Care** encompasses interventions aimed at preventing disease onset, detecting diseases early when treatment is most effective, and preventing disease progression or complications. In graph models, preventive care is represented through relationships connecting patients to screening protocols, immunization schedules, and risk assessment tools.

Graph queries enable preventive care gap analysis, such as:

- Identifying patients due for cancer screenings (mammography, colonoscopy, etc.)
- Finding patients missing recommended vaccinations
- Locating high-risk patients who would benefit from specific preventive interventions
- Analyzing preventive care completion rates across patient populations

Preventive care categories:

- **Primary prevention**: Preventing disease before it occurs (immunizations, lifestyle counseling)
- **Secondary prevention**: Early detection through screening (mammography, colonoscopy, blood pressure screening)
- **Tertiary prevention**: Managing existing disease to prevent complications (diabetes foot exams, cardiac rehabilitation)

| Preventive Service | Target Population | Recommended Frequency | Graph Query Pattern |
|--------------------|-------------------|----------------------|---------------------|
| Colorectal cancer screening | Ages 45-75 | Every 10 years (colonoscopy) | Find patients age 45-75 without colonoscopy in last 10 years |
| Mammography | Women ages 40-74 | Every 1-2 years | Find female patients age 40-74 without mammogram in last 2 years |
| HbA1c testing | Diabetes patients | Every 3-6 months | Find patients with diabetes without HbA1c test in last 6 months |
| Influenza vaccine | All adults | Annually | Find patients without flu vaccine since last August |
| Lipid panel | Adults with CV risk | Every 5 years | Find patients with hypertension or diabetes without lipid panel in last 5 years |

## Measuring Quality: Outcomes and Metrics

### Patient Outcome

**Patient Outcomes** represent the results of healthcare interventions, measuring the impact of care on patient health status, functional ability, quality of life, and survival. In graph models, outcomes are connected to the treatments, providers, and care processes that produced them, enabling sophisticated comparative effectiveness analysis.

Outcome categories:

- **Clinical outcomes**: Disease control measures (HbA1c levels, blood pressure, tumor size, infection clearance)
- **Functional outcomes**: Ability to perform daily activities, mobility, cognitive function
- **Patient-reported outcomes**: Pain levels, symptom burden, satisfaction with care
- **Utilization outcomes**: Hospitalizations, ER visits, readmissions
- **Economic outcomes**: Total cost of care, cost per quality-adjusted life year

Graph databases enable outcome analytics that answer questions like:

- Which treatment protocols produce better outcomes for specific patient populations?
- How do outcomes vary across providers or facilities?
- What patient characteristics predict better or worse outcomes?
- Do patients with better care coordination achieve better outcomes?

<details markdown="1">
    <summary>Patient Outcome Metrics Dashboard Chart</summary>
    Type: chart

    Purpose: Visualize multiple outcome measures for a chronic disease patient population, comparing outcomes across different care models (traditional vs. graph-enhanced care coordination)

    Chart type: Multi-series bar chart with comparison groups

    Title: "Diabetes Patient Outcomes: Traditional Care vs. Graph-Enhanced Care Coordination"

    X-axis: Outcome measures (6 categories)

    Y-axis: Percentage or absolute values (dual axes as needed)

    Outcome measures (X-axis categories):
    1. HbA1c at Goal (<7%)
    2. Blood Pressure at Goal (<130/80)
    3. Annual Retinopathy Screening Completed
    4. Medication Adherence ≥80%
    5. ER Visits (per 100 patients/year)
    6. Hospital Admissions (per 100 patients/year)

    Data series (two bars per measure):

    Series 1: Traditional Care (light blue bars)
    - HbA1c at Goal: 45%
    - BP at Goal: 52%
    - Retinopathy Screening: 38%
    - Medication Adherence: 65%
    - ER Visits: 35 per 100 patients
    - Hospital Admissions: 18 per 100 patients

    Series 2: Graph-Enhanced Care (dark blue bars)
    - HbA1c at Goal: 62%
    - BP at Goal: 68%
    - Retinopathy Screening: 79%
    - Medication Adherence: 84%
    - ER Visits: 19 per 100 patients
    - Hospital Admissions: 9 per 100 patients

    Chart styling:
    - Bar width: Moderate spacing for readability
    - Grid lines: Horizontal lines every 10% or 5 units
    - Data labels: Show exact values on top of each bar
    - Error bars: Show 95% confidence intervals

    Annotations:
    - Arrow pointing to ER Visits comparison: "46% reduction in ER utilization"
    - Arrow pointing to Hospital Admissions: "50% reduction in hospitalizations"
    - Callout box: "Graph-enhanced care coordination enables proactive outreach for screening gaps, medication adherence monitoring, and early intervention for deteriorating patients"

    Legend:
    - Position: Top right
    - Shows color coding for Traditional Care vs. Graph-Enhanced Care
    - Includes sample sizes: Traditional Care (n=1,243), Graph-Enhanced (n=987)

    Statistical significance indicators:
    - Asterisks above bars where p < 0.05
    - Double asterisks where p < 0.01

    Additional elements:
    - Subtitle: "12-month outcomes for Type 2 Diabetes patients, adjusted for age, comorbidity, and baseline HbA1c"
    - Footer: "Graph-enhanced care uses real-time graph queries to identify care gaps, predict high-risk patients, and coordinate multi-provider care teams"

    Implementation: Chart.js with custom annotations plugin
    Canvas size: 900x600px
</details>

### Quality of Life Metric

**Quality of Life Metrics** capture patient-reported assessments of how disease and treatment affect physical, mental, social, and functional wellbeing. These metrics are increasingly recognized as essential outcome measures alongside traditional clinical indicators, as they reflect the patient's lived experience of health and healthcare.

Common quality of life assessment instruments:

- **SF-36**: 36-item survey measuring physical functioning, role limitations, pain, general health, vitality, social functioning, and mental health
- **EQ-5D**: 5-dimension instrument covering mobility, self-care, usual activities, pain/discomfort, and anxiety/depression
- **PROMIS**: Patient-Reported Outcomes Measurement Information System with item banks for various domains
- **Disease-specific instruments**: Condition-tailored questionnaires (e.g., Minnesota Living with Heart Failure Questionnaire, Diabetes Quality of Life measure)

In graph models, quality of life assessments are connected to patients with timestamp properties, enabling longitudinal tracking of how QoL changes with disease progression and treatment. Queries can identify patients whose QoL is declining despite apparently adequate clinical management, triggering additional support or care plan revision.

Graph analytics for quality of life data:

- **Trajectory analysis**: Identify patients with improving or declining QoL trends
- **Treatment correlation**: Assess which interventions produce QoL improvements
- **Comorbidity impact**: Measure how multiple conditions compound QoL burden
- **Social determinants**: Understand how non-clinical factors affect QoL outcomes

## Summary and Key Takeaways

Patient-centric data modeling represents a fundamental shift from administrative and billing-centric healthcare data structures toward clinical models that support comprehensive patient care. By placing the Patient Record node at the center of a graph database, we enable efficient queries across complex networks of diagnoses, treatments, providers, facilities, outcomes, and temporal relationships that characterize modern healthcare.

Key concepts covered in this chapter:

- **Foundational elements**: Patient records, identifiers, and medical history form the core of patient-centric graphs
- **Clinical entities**: Diseases, conditions, symptoms, and diagnoses represent the clinical reasoning process
- **Treatment management**: Prescriptions, medications, dosages, and drug interactions enable medication safety analysis
- **Diagnostic testing**: Lab tests, results, and vital signs provide objective health measures
- **Comprehensive care**: Care plans and treatment timelines coordinate complex, multi-provider care
- **Patient journeys**: Longitudinal views across encounters, providers, and facilities reveal care patterns
- **Chronic disease and preventive care**: Specialized modeling supports population health management
- **Outcomes and quality**: Clinical results and patient-reported metrics measure care effectiveness

The graph modeling approach provides several critical advantages for patient-centric healthcare data:

- **Relationship efficiency**: Native graph traversals enable real-time queries across patient-provider-payer networks without expensive JOINs
- **Temporal flexibility**: Timestamp properties on relationships support sophisticated timeline queries and longitudinal analysis
- **Schema flexibility**: New clinical entities and relationships can be added without schema migrations or complex refactoring
- **Pattern recognition**: Graph algorithms can identify clinical patterns, risk factors, and outcome predictors across patient populations
- **Care coordination**: Multi-hop queries efficiently trace dependencies between patients, conditions, treatments, and care team members

As healthcare organizations increasingly adopt value-based care models that prioritize patient outcomes over service volume, patient-centric data models become essential infrastructure. Graph databases provide the technical foundation for care coordination platforms, population health management systems, clinical decision support tools, and personalized medicine applications that place the patient at the center of healthcare data and analytics.
