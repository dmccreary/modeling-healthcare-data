# Glossary of Terms

This glossary contains definitions for 515 concepts in the course "Modeling Healthcare Data with Graphs". All definitions follow ISO 11179 metadata registry standards: precise, concise, distinct, non-circular, and free of business rules.

#### Abuse Detection

The identification of healthcare practices that deviate from accepted medical standards but may not involve intentional fraud.

**Example:** Detecting a provider who consistently orders unnecessary tests that increase costs without improving patient outcomes.

#### Access Control

A security mechanism that restricts who can view or modify specific data resources based on defined policies.

**Example:** A hospital system that allows doctors to view patient records but restricts access to billing staff.

#### Accountable Care Organization

A network of providers who share financial and clinical responsibility for a defined patient population's coordinated care in exchange for quality-based incentives.

**Example:** An accountable care organization of primary care physicians and specialists earns a shared savings bonus after reducing avoidable hospital admissions for its patients.

#### ActivityDefinition Resource

The FHIR resource type that defines a single reusable action, such as ordering a specific lab test, that can be referenced by a PlanDefinition.

**Example:** An ActivityDefinition resource specifying the standard details for ordering a hemoglobin A1C test, reused across multiple diabetes-related care plans.

#### Adverse Event

An unintended harm or injury caused by medical treatment rather than the underlying disease.

**Example:** A patient develops an allergic reaction after receiving a new medication prescribed by their doctor.

#### Agentic Workflow

A process in which an AI system autonomously plans and executes a sequence of actions or tool calls to accomplish a defined goal.

**Example:** An agentic workflow that automatically queries a patient's graph record, checks for care gaps, and drafts a reminder message without step-by-step human instruction.

#### Aggregate Query

A graph database query that computes summary statistics across multiple nodes or edges.

**Example:** Calculating the average number of prescriptions per patient across all cardiology visits in 2024.

#### AI Governance

The policies, oversight structures, and controls an organization uses to ensure AI systems are developed and used responsibly and safely.

**Example:** A hospital's AI governance committee reviews and approves any new clinical AI tool before it can be deployed to patient care.

#### Allergy

A documented immune system reaction to a specific substance such as food, medication, or environmental trigger.

**Example:** A patient record showing a severe allergy to penicillin antibiotics.

#### Allowed Amount

The maximum fee an insurance payer approves for a specific healthcare service or procedure.

**Example:** An insurance policy that sets the allowed amount for a routine office visit at $150, regardless of the provider's actual charge.

#### Anomaly Detection

A computational method that identifies data patterns significantly different from expected norms.

**Example:** Using graph algorithms to find a provider billing for 30 patient visits per day, far exceeding typical practice patterns.

#### Anomaly Scoring Model

A model that assigns a numeric score reflecting how unusual a given data point is relative to expected patterns.

**Example:** An anomaly scoring model assigns a high score to a claim billed at 3 a.m. for a service typically performed only during business hours.

#### Appointment

A scheduled time slot for a patient to receive care from a healthcare provider at a specific location.

**Example:** A patient books a 30-minute appointment with their primary care physician for an annual physical examination.

#### Artificial Intelligence

Computational systems that perform tasks typically requiring human intelligence, such as pattern recognition and decision-making.

**Example:** An AI system that analyzes chest X-rays to identify potential pneumonia cases for radiologist review.

#### Assortativity

A graph metric measuring the tendency of nodes to connect to other nodes that share similar characteristics, such as degree or specialty.

**Example:** Positive assortativity among providers might show that high-volume specialists mostly refer to other high-volume specialists rather than to smaller practices.

#### Attribute-Based Access Control

An access control model that grants permissions based on evaluated attributes of the user, the resource, and the context, rather than on fixed roles alone.

**Example:** An attribute-based access control policy that grants a nurse access to a patient's record only if the nurse is assigned to that patient's current unit.

#### Audit Trail

A chronological record of system activities that documents who accessed or modified data and when.

**Example:** A log showing all users who viewed a patient's protected health information during the past month.

#### Authentication

The process of verifying the identity of a user, device, or system before granting access.

**Example:** A clinician entering their username and password plus a security code to access the electronic health record system.

#### Authorization

The process of determining what resources and actions an authenticated user is permitted to access.

**Example:** After login, the system grants a nurse authorization to view patient records but not to modify billing information.

#### Backup And Recovery

The practice of periodically copying data for safekeeping and the defined process for restoring that data after loss, corruption, or failure.

**Example:** Running a nightly backup of a healthcare graph database and testing a recovery procedure that restores it after a simulated server crash.

#### Behavioral Health Condition

A mental health or substance use disorder that affects a patient's emotional, cognitive, or behavioral functioning.

**Example:** Major depressive disorder is a behavioral health condition documented in a patient's record alongside their physical diagnoses.

#### Behavioral Health Fraud

Fraudulent billing schemes involving mental health or substance use treatment services, such as billing for therapy sessions that were never rendered.

**Example:** A substance use treatment facility bills insurers for daily counseling sessions that patients never actually attended.

#### Benefit Accumulator

A running total maintained by a payer that tracks a patient's progress toward benefit limits, such as a deductible or out-of-pocket maximum.

**Example:** A benefit accumulator showing a patient has met $1,800 of their $2,000 annual deductible after several recent claims.

#### Benefit Plan

A structured set of healthcare services and coverage levels provided to insurance members.

**Example:** An employer-sponsored health insurance plan covering preventive care, hospital stays, and prescription medications with specified copayments.

#### Best Practice

A clinical or operational method informally recognized, based on evidence and experience, as consistently producing superior outcomes.

**Example:** Washing hands between every patient encounter is a widely recognized best practice for reducing hospital-acquired infections.

#### Betweenness Centrality

A graph metric measuring how often a node appears on the shortest paths between other nodes in the network.

**Example:** Calculating betweenness centrality to identify a primary care provider who serves as a key referral hub connecting patients to specialists.

#### Billing Code

A standardized identifier used to represent a specific healthcare service or procedure for payment purposes.

**Example:** A medical office uses billing code 99213 to charge for a standard office visit with an established patient.

#### Biomarker

A measurable biological indicator used to assess the presence, progression, or treatment response of a disease.

**Example:** Elevated troponin levels serve as a biomarker indicating possible heart muscle damage during a suspected heart attack.

#### Board Certification

Official recognition that a physician has completed specialty training and passed examinations in a medical discipline.

**Example:** A physician holds board certification in cardiology from the American Board of Internal Medicine.

#### Bolt Protocol

A binary network protocol optimized for efficient, low-latency communication between client applications and a graph database.

**Example:** A Python application using a driver that communicates with a Neo4j server over the Bolt protocol instead of plain HTTP.

#### Bonnie Testing Tool

A legacy CMS-sponsored tool that tests electronic clinical quality measures against synthetic patient test records.

**Example:** A measure developer loads a set of synthetic patient records into the Bonnie testing tool to confirm a new eCQM produces the expected results.

#### Brand Drug

A pharmaceutical product marketed under a proprietary name by the company that originally developed and patented it.

**Example:** Lipitor is the brand drug name under which the manufacturer originally sold the cholesterol medication atorvastatin.

#### Breach Notification Rule

A HIPAA requirement mandating that affected individuals, and in some cases regulators and media, be notified after an unauthorized disclosure of protected health information.

**Example:** A hospital notifies 10,000 affected patients under the breach notification rule after discovering an employee improperly accessed records without authorization.

#### Breadth-First Traversal

A graph traversal strategy that visits all of a node's immediate neighbors before moving on to nodes farther away.

**Example:** Starting from a patient node, breadth-first traversal first visits all directly connected providers before expanding to those providers' other patients.

#### Break-Even Analysis

A financial calculation determining the point at which an initiative's revenue equals its costs.

**Example:** A break-even analysis for a new outpatient clinic estimates it will need 40 patient visits per day to cover its fixed and variable costs.

#### Budget Variance Analysis

The comparison of an organization's actual financial results against its planned budget to identify and explain differences.

**Example:** A budget variance analysis reveals that a department overspent on supplies by 15% compared to its approved budget.

#### Bulk Import

A data loading technique that inserts a large volume of records into a database in a single batch operation rather than one record at a time.

**Example:** Loading five million historical patient encounters into a graph database using a bulk import utility instead of individual insert statements.

#### Bundled Payment

A single payment covering all services related to a defined treatment episode, regardless of how many providers or services were involved.

**Example:** A bundled payment for a hip replacement covers the surgeon, hospital stay, and post-operative physical therapy under one combined amount.

#### Business Glossary

A curated set of agreed-upon definitions for key business terms used consistently across an organization's data systems and reports.

**Example:** A business glossary entry defining exactly what counts as an "active patient" so that every department's reports use the same definition.

#### Caching Strategy

A technique for temporarily storing frequently accessed query results or data in fast memory to avoid repeating expensive computation.

**Example:** Caching the results of a daily provider-network summary query so that repeated dashboard requests do not recompute it each time.

#### Capitation

A payment model where providers receive a fixed amount per patient regardless of services delivered.

**Example:** A clinic receives $50 per member per month for all primary care services, incentivizing preventive care and cost management.

#### Capstone Project

A comprehensive final project where students apply course concepts to solve a real-world healthcare graph modeling challenge.

**Example:** A student designs a fraud detection system using graph analytics to identify suspicious provider billing patterns across multiple insurance claims.

#### Capstone Rubric

A structured scoring guide defining the criteria and performance levels used to evaluate a capstone project.

**Example:** A capstone rubric awarding points separately for graph schema design, query correctness, analytical insight, and presentation quality.

#### Care Coordination

The deliberate organization of a patient's care activities among multiple participants, such as providers and caregivers, to achieve safer and more effective care.

**Example:** A care coordinator ensures a patient's discharge instructions, follow-up appointment, and home health referral are all communicated to the right people.

#### Care Gap Alert

A clinical decision support notification flagging a recommended service, such as a screening or vaccination, that a patient appears to be missing.

**Example:** A care gap alert notifying a physician that a 55-year-old patient has not had a recommended colonoscopy in over ten years.

#### Care Manager

A healthcare professional who coordinates services and resources for patients with complex or chronic needs across multiple providers and settings on an ongoing basis.

**Example:** A care manager checks in monthly with a patient managing three chronic conditions to make sure appointments, medications, and home services stay on track.

#### Care Pathway

A structured, multidisciplinary plan detailing the expected sequence of care activities for patients with a specific condition.

**Example:** A hip fracture care pathway specifying the expected timeline from emergency evaluation through surgery, rehabilitation, and discharge.

#### Care Plan

A coordinated set of interventions and goals designed to manage a patient's health conditions.

**Example:** A diabetes care plan including monthly blood sugar monitoring, dietary counseling, and medication management.

#### Care Team

A group of healthcare professionals collaborating to deliver coordinated patient care.

**Example:** A care team consisting of an oncologist, radiation therapist, nutritionist, and social worker treating a cancer patient.

#### Care Transition

The movement of a patient between care settings or providers, such as from a hospital to a rehabilitation facility or back home.

**Example:** A care transition from hospital to a skilled nursing facility that requires transferring medication lists and pending test results.

#### CarePlan Resource

The FHIR resource type that represents the intended goals, activities, and providers involved in managing a patient's health issues.

**Example:** A CarePlan resource outlining a diabetic patient's target blood sugar goals, scheduled monitoring activities, and assigned care team members.

#### Case Manager

A professional who coordinates an individual patient's services, benefits, and transitions for a specific episode of care, often working closely with a payer's utilization review process.

Case management is typically episodic and tied to a defined event, such as a hospitalization or workers' compensation claim, distinguishing it from the ongoing chronic-condition focus of a care manager.

**Example:** A case manager arranges home health services and durable medical equipment for a patient being discharged after major surgery.

#### Case Study Analysis

The detailed examination of a real or realistic scenario to extract lessons and evaluate the decision-making involved.

**Example:** A case study analysis of a published healthcare fraud investigation to identify which graph analytics techniques could have detected it earlier.

#### CDS Alert

A notification generated by a clinical decision support system to inform a clinician of a relevant finding, risk, or recommended action.

**Example:** A CDS alert popping up in the EHR to warn a physician that a newly prescribed medication may interact with a drug the patient is already taking.

#### CDS Hooks

A specification defining standardized trigger points within an EHR workflow, such as opening a patient chart, at which external decision support services can be invoked.

**Example:** A CDS Hooks trigger fires when a clinician opens a patient's chart, calling an external service that checks for overdue preventive screenings.

#### CDS Rule Engine

Software that evaluates encoded clinical rules against patient data to produce alerts, recommendations, or other decision support output.

**Example:** A CDS rule engine evaluates a patient's active medications against a drug-interaction rule set every time a new prescription is entered.

#### Centrality Measure

A graph metric quantifying the importance or influence of a node within the network structure.

**Example:** Computing centrality measures to identify which hospitals serve as major referral centers in a regional healthcare network.

#### Change Data Capture

A technique that identifies and captures only the data that has changed since the last extraction, enabling efficient downstream processing.

**Example:** Change data capture streaming only newly updated patient records into a graph database instead of reloading the entire dataset nightly.

#### Charge Master

A comprehensive price list containing all services, procedures, and supplies a healthcare facility can bill.

**Example:** A hospital's charge master lists prices for thousands of items from aspirin tablets to organ transplant procedures.

#### Chargeback

A reversal of a previously settled payment, often initiated when a charge is disputed, found invalid, or later found to be in error.

**Example:** A payer issues a chargeback to recover an overpayment made on a claim that was later found to have been billed with an incorrect procedure code.

#### Chatbot Interface

A conversational software front-end that lets users interact with a system by typing or speaking natural language.

**Example:** A patient uses a chatbot interface on a hospital's website to ask about visiting hours and appointment scheduling.

#### Chronic Disease Management

Ongoing coordinated care focused on helping patients control long-term health conditions.

**Example:** A management program for heart failure patients including regular monitoring, medication adjustment, and lifestyle coaching.

#### Claim Adjudication

The process of reviewing an insurance claim to determine coverage eligibility and payment amount.

**Example:** An insurance company adjudicates a hospital claim by verifying the patient's coverage, checking medical necessity, and calculating the approved payment.

#### Claim Denial

A payer's refusal to pay for a submitted healthcare service based on coverage rules or documentation issues.

**Example:** An insurance company denies a claim for an MRI scan because prior authorization was not obtained before the procedure.

#### Claim Dispute

A formal challenge by a provider or patient contesting an insurance payer's claim decision.

**Example:** A hospital files a dispute after an insurer denies payment for an emergency surgery deemed medically necessary.

#### Claim Processing

The administrative workflow of receiving, reviewing, and paying healthcare service claims.

**Example:** An insurance company receives 10,000 claims daily and processes them through automated validation before payment.

#### Claims Clearinghouse

An intermediary organization that validates the format and content of electronic claims and routes them between providers and payers.

**Example:** A clearinghouse checks a submitted claim for missing diagnosis codes before forwarding it to the correct insurance payer.

#### Clinic

An outpatient healthcare facility where patients receive non-emergency medical services.

**Example:** A family medicine clinic providing routine checkups, vaccinations, and treatment for minor illnesses.

#### Clinical Decision Support

Technology systems that provide healthcare providers with knowledge and guidance during patient care.

**Example:** An electronic health record system alerts a physician that a prescribed medication may interact with the patient's existing drugs.

#### Clinical Discovery

The process of identifying new medical insights or patterns through analysis of patient data.

**Example:** Using graph analytics on millions of patient records to discover that a common medication reduces risk of an unrelated disease.

#### Clinical Flowchart

A semi-structured diagram depicting the sequential and branching steps a clinician should follow for a specific clinical scenario.

**Example:** A clinical flowchart guiding an emergency physician through the branching decisions involved in evaluating chest pain.

#### Clinical Guideline

Evidence-based recommendations for appropriate healthcare interventions under specific clinical circumstances.

**Example:** Guidelines recommending annual mammograms for women over 40 to screen for breast cancer.

#### Clinical NLP Pipeline

A sequence of natural language processing steps that extracts structured clinical concepts from unstructured text, such as physician notes.

**Example:** A clinical NLP pipeline that reads a discharge note and outputs structured diagnosis, medication, and follow-up data for storage in a graph database.

#### Clinical Pathway Variance

A documented deviation between the care a patient actually received and the steps defined in a standard care pathway.

**Example:** A clinical pathway variance recorded when a patient's surgery was delayed two days beyond the pathway's expected timeline due to a scheduling conflict.

#### Clinical Persona

A semi-structured profile representing a typical patient or provider archetype used to ground guideline scenarios in realistic detail.

**Example:** A clinical persona describing "Maria, a 58-year-old with poorly controlled type 2 diabetes," used to test how a new care pathway would apply to her situation.

#### Clinical Practice Guideline

A formally published, evidence-based document produced by medical experts or specialty societies that later serves as source content for FHIR's knowledge representation levels.

**Example:** A cardiology society's published clinical practice guideline on statin use, which is later translated into decision tables and eventually executable CDS logic.

#### Clinical Protocol

A detailed procedure defining the steps healthcare providers follow when treating a specific condition.

**Example:** A hospital's stroke protocol specifying the diagnostic tests and treatments to administer within the first 60 minutes of patient arrival.

#### Clinical Quality Language

A high-level, human-readable and machine-executable language used to author clinical decision support rules, quality measures, and health information exchange logic independent of any specific platform.

**Example:** A CQL expression checking whether a patient is between ages 50 and 75 and has no documented colorectal cancer screening in the past ten years.

#### Clinical Quality Measure

A standardized metric used to evaluate the quality of care delivered for a specific condition or population, often expressed and shared using CQL.

**Example:** A clinical quality measure calculating the percentage of diabetic patients whose most recent hemoglobin A1C result was below 8%.

#### Clinical Reasoning Module

The component of a FHIR or CDS system responsible for evaluating encoded logic, such as compiled CQL expressions, against a specific patient's data.

**Example:** A clinical reasoning module evaluates a compiled screening rule against a patient's record and returns whether the patient is currently due for the screening.

#### Clinical Reminder

A clinical decision support prompt that alerts a clinician to a due or overdue action for a specific patient.

**Example:** A clinical reminder appearing at the start of a visit noting that the patient's annual flu vaccine is due.

#### Clinical User Story

A semi-structured artifact describing a clinical scenario from the perspective of a specific user role and the goal they are trying to achieve.

**Example:** A clinical user story stating, "As a primary care physician, I want to be alerted when a diabetic patient is overdue for an eye exam."

#### Clinical Workflow

The sequence of activities healthcare professionals perform to deliver patient care services.

**Example:** The emergency department workflow from patient triage through examination, treatment, and discharge or admission.

#### Closeness Centrality

A graph metric measuring how short the average shortest path is from one node to all other reachable nodes in the network.

**Example:** A provider with high closeness centrality can reach most other providers in a referral network through relatively few intermediate steps.

#### Clustering Coefficient

A graph metric measuring the degree to which nodes tend to cluster together in tightly connected groups.

**Example:** Calculating clustering coefficients to identify groups of providers who frequently refer patients to one another.

#### CodeSystem Resource

The FHIR resource type that defines a set of codes, their meanings, and the authority that governs them, such as SNOMED CT or LOINC.

**Example:** A CodeSystem resource describing the structure and meaning of codes within the ICD-10-CM classification.

#### Collusion Ring

A coordinated group of providers, patients, or billers who cooperate to submit fraudulent claims for shared financial gain.

**Example:** A collusion ring involving a clinic, a diagnostic lab, and several recruited patients that repeatedly bills for unnecessary tests and splits the proceeds.

#### Community Detection

A graph algorithm that identifies densely connected groups of nodes with sparse connections between groups.

**Example:** Detecting communities in a provider network to identify potential fraud rings where providers collude to submit false claims.

#### Comorbidity

The presence of one or more additional health conditions occurring alongside a patient's primary diagnosis.

**Example:** A patient being treated for heart failure who also has chronic kidney disease as a comorbidity that complicates medication choices.

#### Condition Resource

The FHIR resource type that records a clinical problem, diagnosis, or health concern documented for a patient.

**Example:** A Condition resource recording that a patient has an active diagnosis of type 2 diabetes, coded using ICD-10-CM.

#### Connected Components

Subgraphs where every node can reach every other node through some path, with no connections to other components.

**Example:** Finding connected components in a disease transmission network to identify isolated outbreak clusters.

#### Consent Management

The tracking and enforcement of a patient's permissions regarding how their health information may be accessed, used, or shared.

**Example:** A consent management system blocking a research team's access to a patient's records because that patient opted out of research data sharing.

#### Constraint Definition

A rule specified on a database schema that stored data must satisfy, such as requiring a value to be unique or always present.

**Example:** A constraint definition requiring every Patient node to have a non-null medical record number.

#### Context Graph

A graph structure assembled on demand to supply a language model with relevant, connected background information for answering a specific query.

**Example:** Building a context graph of a patient's recent conditions, medications, and labs to ground an LLM's answer to a clinician's question about that patient.

#### Continuity Of Care Document

A standardized XML document that summarizes a patient's clinical history, such as medications and problems, for transfer between care settings.

**Example:** A hospital sends a Continuity of Care Document to a patient's primary care physician summarizing the diagnoses and medications from a recent hospital stay.

#### Contract Negotiation

The process of establishing payment rates and terms between healthcare providers and insurance payers.

**Example:** A hospital negotiates with an insurance company to set reimbursement rates for surgical procedures.

#### Conversational AI

AI technology designed to understand and generate natural, multi-turn dialogue with users.

**Example:** A conversational AI system that helps a patient describe their symptoms over several back-and-forth exchanges before suggesting when to seek care.

#### Coordination Of Benefits

The process of determining the order in which multiple insurance plans pay when a patient is covered by more than one policy.

**Example:** Coordination of benefits rules determine that a child's own parent's employer plan pays first before a stepparent's plan covers any remaining balance.

#### Copayment

A fixed amount an insured person pays for a covered healthcare service at the time of care.

**Example:** A patient pays a $30 copayment at each doctor's office visit, with insurance covering the remaining cost.

#### Cosine Similarity

A similarity metric that measures how closely two vectors point in the same direction, independent of their length.

**Example:** Comparing the cosine similarity of two patient embedding vectors to find patients with comparable clinical profiles despite differing amounts of recorded history.

#### Cost Containment Strategy

An organizational approach aimed at controlling or reducing healthcare spending without compromising the quality of care delivered.

**Example:** Requiring prior authorization for high-cost imaging studies is a cost containment strategy used by many payers.

#### Cost Of Care

The total financial resources required to deliver specific healthcare services to a patient.

**Example:** The cost of care for a knee replacement surgery includes surgeon fees, hospital facility charges, anesthesia, and rehabilitation.

#### Cost Per Encounter

A financial metric expressing the average total cost incurred for a single patient visit or clinical interaction.

**Example:** A clinic calculates its cost per encounter for a routine office visit by dividing total operating expenses by the number of visits in a month.

#### Coverage

The specific healthcare services and conditions included in an insurance policy's benefits.

**Example:** An insurance policy provides coverage for hospitalizations and surgeries but excludes cosmetic procedures.

#### CPT Code

Current Procedural Terminology codes that identify medical procedures and services for billing purposes.

**Example:** CPT code 90791 represents an initial psychiatric diagnostic evaluation.

#### CQF Recommendations

An HL7 implementation guide, formally known as the Clinical Quality Framework, that specifies conventions for using CQL and FHIR together to represent computable clinical knowledge.

**Example:** A measure developer follows the CQF Recommendations implementation guide to ensure a new CQL library references FHIR resources in a standard, interoperable way.

#### CQL Authoring Format

The human-readable textual syntax in which authors write CQL logic before it is compiled into a machine-executable form.

**Example:** A measure developer writes an age and condition check in the CQL authoring format, which reads much like structured English.

#### CQL Compiler

Software that translates human-readable CQL authoring format into the Expression Logical Model for machine execution.

**Example:** A CQL compiler converts an authored age-check expression into its equivalent ELM representation before deployment to a CDS engine.

#### CQL Define Statement

A CQL construct that names and assigns a reusable logical expression within a library so it can be referenced elsewhere in that library or measure.

**Example:** A CQL define statement named "HasControlledDiabetes" that evaluates to true if a patient's most recent A1C result is below a target threshold.

#### CQL Library

A named, versioned collection of related CQL definitions and expressions that can be referenced by measures or clinical decision support rules.

**Example:** A shared CQL library containing common definitions for "active diabetes diagnosis" that multiple quality measures reuse instead of redefining separately.

#### CQL Retrieve Expression

A CQL statement that specifies which clinical data, such as a set of observations or conditions, should be pulled from a FHIR data source for evaluation.

**Example:** A CQL retrieve expression pulling all Observation resources representing blood pressure readings from the past twelve months for a given patient.

#### CQL Runner Tool

An interactive, browser-based tool used for quick, ad hoc testing of CQL expressions against sample data without a full measure development environment.

**Example:** A developer pastes a single CQL expression into the CQL Runner tool to confirm it correctly identifies patients over age 65.

#### CQL-to-ELM Compilation

The specific translation step that converts CQL authoring syntax into the Expression Logical Model for machine execution.

**Example:** Running CQL-to-ELM compilation on a newly authored quality measure before uploading it to a certified EHR's measure engine.

#### Credentialing Process

The verification of a provider's education, licensure, training, and professional history before granting clinical privileges or network enrollment.

**Example:** A hospital's credentialing process confirms a new physician's medical school diploma, board certification, and malpractice history before allowing them to admit patients.

#### Cycle Detection

A graph algorithm that identifies circular paths where a sequence of edges returns to the starting node.

**Example:** Detecting referral cycles where providers refer patients to each other in a circular pattern, potentially indicating fraud.

#### Cypher Query Language

A declarative query language designed for querying and updating graph databases, developed for Neo4j.

**Example:** A Cypher query finds all patients diagnosed with diabetes who visited a cardiologist: `MATCH (p:Patient)-[:HAS_DIAGNOSIS]->(d:Disease {name: 'Diabetes'})-[:VISITED]->(doc:Provider {specialty: 'Cardiology'}) RETURN p, doc`.

#### Cypress Certification Tool

An open-source, CMS-sponsored tool used to certify that an EHR system correctly executes compiled CQL and electronic clinical quality measure logic.

**Example:** An EHR vendor runs the Cypress certification tool against their product to verify it calculates a diabetes quality measure correctly before seeking certification.

#### Data Anonymization

The irreversible removal or alteration of identifying information from a dataset so that individuals cannot be re-identified from it.

Data anonymization differs from simple de-identification by permanently eliminating any path back to the original individual, whereas de-identified data can sometimes retain a controlled re-identification key.

**Example:** Aggregating patient ages into ten-year bands and permanently discarding exact birth dates so no combination of remaining fields could re-identify a person.

#### Data Catalog

A searchable inventory of an organization's data assets, including their metadata, storage location, and lineage.

**Example:** An analyst searches a data catalog to find which system contains authoritative patient allergy information before starting a new report.

#### Data Classification

The categorization of data according to its sensitivity level in order to determine appropriate handling and protection controls.

**Example:** Data classification labeling a patient's psychiatric notes as highly restricted, requiring stricter access controls than general demographic data.

#### Data Deduplication

The identification and removal or merging of redundant copies of the same record within a dataset.

**Example:** Data deduplication merging two nearly identical patient records that were accidentally created during two separate hospital registrations.

#### Data Dictionary

A reference document defining the meaning, format, and constraints of each data element used within a system.

**Example:** A data dictionary entry specifying that the "PatientStatus" field must contain one of three defined values: active, inactive, or deceased.

#### Data Encryption

The process of converting data into a coded form that can only be read by someone possessing the correct decryption key.

**Example:** Encrypting a database column containing patient Social Security numbers so the raw values are unreadable to anyone without the decryption key.

#### Data Ethics Review

A formal evaluation of whether a planned data use, particularly one involving AI or sensitive patient information, aligns with ethical principles and preserves patient trust.

**Example:** A data ethics review evaluating whether a proposed AI model trained on patient graph data could unintentionally disadvantage certain patient groups.

#### Data Governance Council

A cross-functional group responsible for setting organizational policy and resolving issues related to data management.

**Example:** A data governance council made up of representatives from IT, compliance, and clinical departments meeting monthly to approve new data access policies.

#### Data Governance Framework

A structured system of policies, procedures, and responsibilities for managing organizational data assets.

**Example:** A healthcare system's data governance framework defining who can access patient data, retention policies, and quality standards.

#### Data Lineage

A documented history tracing data's origin, movements, transformations, and usage throughout its lifecycle.

**Example:** Tracking a patient's lab result from the testing device through the lab information system to the electronic health record.

#### Data Masking

The substitution of realistic but fictitious values for sensitive data elements, typically used to protect information in non-production environments.

**Example:** Replacing real patient names and addresses with realistic fake ones in a test database used by software developers.

#### Data Model

An abstract representation defining how data elements relate to each other and to real-world entities.

**Example:** A data model representing patients, providers, and encounters with their properties and relationships.

#### Data Ownership

The assignment of accountability for a specific data asset's accuracy, definition, and appropriate use to a designated person or role.

**Example:** The billing department holds data ownership of the charge master, meaning they are accountable for keeping its prices accurate and current.

#### Data Privacy

Practices and policies protecting sensitive information from unauthorized access or disclosure.

**Example:** Hospital policies restricting employee access to patient records based on their job responsibilities.

#### Data Provenance

Information documenting the sources and processes that produced a specific data element.

**Example:** Recording that a blood pressure reading originated from a specific monitoring device at a particular date and time.

#### Data Quality

The degree to which data is accurate, complete, consistent, timely, and fit for its intended purpose.

**Example:** Measuring data quality by checking what percentage of patient records have complete demographic information and valid diagnosis codes.

#### Data Quality Score

A quantitative measure summarizing how well a dataset meets defined accuracy, completeness, and consistency criteria.

**Example:** A data quality score showing that 92% of patient records in a graph database have complete and valid demographic fields.

#### Data Retention Policy

An organizational rule specifying how long different types of data must be kept before archival or deletion.

**Example:** A data retention policy requiring that patient medical records be kept for at least ten years after the last encounter.

#### Data Security

Technical and administrative measures protecting data from unauthorized access, modification, or destruction.

**Example:** Encrypting patient records in transit and at rest to prevent unauthorized access if systems are compromised.

#### Data Sensitivity Label

A tag applied to a data element or record indicating its confidentiality level, such as public, internal, or restricted.

**Example:** A data sensitivity label marking a field containing HIV status as restricted, triggering stricter access logging than a routine vital sign.

#### Data Steward Role

The individual or position accountable for the day-to-day quality, definition, and appropriate use of a specific data domain.

The data steward role is a formally assigned position that carries out ongoing data stewardship responsibilities for one particular domain, such as patient demographics or provider credentials.

**Example:** A nursing informatics specialist filling the data steward role for clinical documentation standards across a hospital system.

#### Data Stewardship

The responsibility for ensuring data assets are properly managed, maintained, and protected.

**Example:** A chief data officer serving as data steward, overseeing data quality initiatives and governance policies.

#### Data Tier

The Tier of Functionality covering the underlying concepts and data elements that a clinical knowledge artifact references.

**Example:** The Data Tier of a diabetes care pathway specifies that it references hemoglobin A1C values and current medication lists.

#### Data Traceability

The ability to track data through its entire lifecycle from creation to deletion.

**Example:** Tracing a medication order from physician entry through pharmacy fulfillment to administration and documentation.

#### Data Validation Rule

A defined check applied to data to verify that it meets specified format, range, or consistency requirements.

**Example:** A data validation rule rejecting a birth date entered as being in the future.

#### Data Versioning

The practice of preserving successive states of a dataset or record so that prior versions can be retrieved or compared later.

**Example:** Data versioning allowing an analyst to see exactly how a patient's care plan looked three months ago compared to today.

#### Database Schema

A formal structure defining how data is organized in a database, including tables, fields, and relationships.

**Example:** A relational database schema with tables for patients, appointments, and providers connected by foreign keys.

#### Days In Accounts Receivable

A financial metric measuring the average number of days it takes an organization to collect payment after a service is billed.

**Example:** A hospital reduces its days in accounts receivable from 55 to 40 by following up on unpaid claims more quickly.

#### De-Identification

The process of removing or obscuring personally identifiable information from datasets.

**Example:** Removing patient names, addresses, and dates of birth from medical records before using them for research.

#### Decision Table

A semi-structured representation that maps combinations of clinical conditions to corresponding recommended actions in a tabular format.

**Example:** A decision table listing rows for different blood pressure ranges, each paired with a recommended medication adjustment.

#### Deductible

The amount an insured person must pay for covered healthcare services before insurance begins paying.

**Example:** A patient with a $2,000 annual deductible pays full cost for services until reaching that amount, after which insurance coverage begins.

#### Degree Centrality

A graph metric counting the number of edges connected to a node.

**Example:** Calculating degree centrality to identify patients who have visited the most different healthcare providers.

#### Denial Rate

The percentage of submitted insurance claims that a payer rejects rather than reimburses.

**Example:** A billing department notices its denial rate for prior-authorization-related claims has risen from 5% to 12% over the past quarter.

#### Depth-First Traversal

A graph traversal strategy that follows a single path as far as possible before backtracking to explore other branches.

**Example:** Depth-first traversal follows one referral chain from a patient to a specialist to a hospital before backtracking to check the patient's other providers.

#### Diagnosis

A healthcare provider's determination of a patient's disease or condition based on symptoms and tests.

**Example:** A physician makes a diagnosis of hypertension after measuring consistently elevated blood pressure over multiple visits.

#### Differential Diagnosis

The process of comparing conditions that share similar signs or symptoms in order to identify the correct diagnosis.

**Example:** A physician considers pneumonia, heart failure, and pulmonary embolism as part of a differential diagnosis for a patient with shortness of breath.

#### Directed Acyclic Graph

A graph containing directed edges with no cycles, meaning you cannot follow edges to return to a starting node.

**Example:** A treatment pathway graph showing sequential steps in cancer therapy where each step leads only forward to the next stage.

#### Directed Graph

A graph where edges have a direction, flowing from a source node to a target node.

**Example:** A directed graph representing patient referrals where edges point from referring providers to receiving specialists.

#### Discharge Summary

A clinical document summarizing a patient's hospital stay, treatments received, and instructions for follow-up care at the time of release.

**Example:** A discharge summary listing the diagnoses treated during a hospital stay, medications to continue at home, and a scheduled follow-up appointment.

#### Disease

A pathological condition affecting an organism's structure or function, impairing normal health.

**Example:** Type 2 diabetes mellitus is a chronic disease affecting how the body processes blood sugar.

#### Distributed Graph Database

A graph database whose data storage and query processing are spread across multiple networked machines instead of a single server.

**Example:** A distributed graph database that spreads a nationwide provider network across several data centers while still answering queries as one logical database.

#### DME Fraud

Fraudulent schemes involving durable medical equipment billing, often for unnecessary or undelivered items.

**Example:** A supplier bills Medicare for expensive power wheelchairs that were never delivered to patients.

#### Dosage

The specified amount and frequency of a medication prescribed for a patient.

**Example:** A prescription specifies a dosage of 500mg of amoxicillin taken three times daily for ten days.

#### Drug Code

A standardized identifier for pharmaceutical products used in prescribing and billing systems.

**Example:** NDC code 0069-2587-01 uniquely identifies a specific strength and manufacturer of a common antibiotic.

#### Drug Interaction

A situation where one medication affects the activity or safety of another when taken together.

**Example:** A drug interaction warning alerts that combining warfarin and aspirin increases bleeding risk.

#### Drug-Drug Interaction Check

A clinical decision support function that screens a patient's active medications for combinations known to cause harmful interactions.

**Example:** A drug-drug interaction check warns a prescriber that adding a new blood thinner could dangerously increase bleeding risk given the patient's current aspirin use.

#### Dual Eligibility

A patient's simultaneous qualification for both Medicare and Medicaid coverage.

**Example:** A low-income senior with dual eligibility has Medicare cover most medical services while Medicaid covers remaining costs and long-term care.

#### Duplicate Claim

Multiple insurance claims submitted for the same service provided to the same patient.

**Example:** A medical office accidentally submits the same procedure claim twice for one patient visit, triggering fraud detection.

#### Durable Medical Equipment

Reusable medical devices, such as wheelchairs, oxygen equipment, or hospital beds, prescribed for a patient's use outside a clinical facility.

**Example:** A physician prescribes durable medical equipment, including a walker and a shower chair, for a patient recovering from hip surgery.

#### Dynamic Graph Update

A modification made to a graph's nodes, relationships, or properties incrementally after initial loading, without reprocessing the entire dataset.

**Example:** Adding a new Encounter node and connecting it to an existing Patient node the moment a visit is recorded, rather than reloading the whole graph.

#### Edge

A connection between two nodes in a graph representing a relationship.

**Example:** An edge connecting a patient node to a provider node represents a treatment relationship.

#### Edge Embedding

A numeric vector representation that captures the structural or semantic characteristics of a relationship between two nodes in a graph.

**Example:** An edge embedding for a PRESCRIBED relationship that encodes typical dosage patterns, letting a model flag unusual prescribing relationships.

#### Edge Property

An attribute or characteristic associated with a relationship between two nodes in a graph.

**Example:** A PRESCRIBED_BY edge between a patient and physician might have properties for medication name, date, and dosage.

#### Eigenvector Centrality

A graph metric that scores a node's importance based on how important the nodes connected to it are, rather than simply counting connections.

Eigenvector centrality distinguishes itself from simple degree counting by weighting each connection by the influence of the neighbor at its other end, which matters when identifying truly influential hubs in a referral or fraud network.

**Example:** A specialist connected to a few highly influential referring physicians can score higher in eigenvector centrality than a provider with many low-influence connections.

#### Electronic CQM

A clinical quality measure expressed in a standardized, computable format so it can be calculated automatically from electronic health record data.

**Example:** An electronic CQM that automatically calculates the percentage of eligible patients screened for depression, without requiring manual chart review.

#### Electronic Health Record

A digital version of a patient's medical history maintained by healthcare providers over time.

**Example:** A hospital's electronic health record system contains all patient visits, diagnoses, medications, lab results, and imaging studies.

#### Electronic Remittance Advice

An electronic file sent by a payer to a provider detailing how a submitted claim was adjudicated, including payment and adjustment amounts.

**Example:** An electronic remittance advice showing that a payer approved $350 of a $500 claim and applied a $150 contractual adjustment.

#### Eligibility Verification

The process of confirming a patient's active insurance coverage and specific benefits before or during a healthcare encounter.

**Example:** A front-desk staff member runs an eligibility verification check to confirm a patient's insurance is active before their scheduled surgery.

#### Emergency Department

A hospital unit providing immediate medical care for acute illnesses and injuries without requiring an appointment.

**Example:** A patient with chest pain goes to the emergency department for immediate evaluation and treatment.

#### Encounter Resource

The FHIR resource type that represents a single interaction between a patient and healthcare providers for the purpose of delivering care.

**Example:** An Encounter resource representing a patient's emergency department visit, including its start time, location, and attending provider.

#### Encryption At Rest

Data encryption applied to information while it is stored on disk, in a database, or in backup media.

**Example:** A hospital's database files are protected by encryption at rest so that stolen physical hard drives would not expose readable patient data.

#### Encryption In Transit

Data encryption applied to information while it moves across a network between two systems.

**Example:** A patient portal uses encryption in transit so that lab results sent from the server to a patient's browser cannot be intercepted and read.

#### Enterprise Knowledge Graph

A graph database that unifies an organization's data assets and their relationships across multiple systems into a single connected model for search and analytics.

An enterprise knowledge graph differs from a narrower, domain-specific knowledge graph by intentionally spanning many source systems, such as clinical, claims, and pharmacy data, under one organization-wide structure.

**Example:** A health system's enterprise knowledge graph connecting patient, provider, claims, and supply chain data that previously lived in separate departmental systems.

#### Enterprise Nervous System

A metaphor describing an integrated graph and data infrastructure that senses, connects, and routes information across an organization in near real time.

**Example:** Describing a hospital's connected graph platform as an enterprise nervous system because it immediately propagates a new lab result to every relevant care team and alerting system.

#### Entity Resolution

The process of determining whether records from different data sources refer to the same real-world entity.

**Example:** Entity resolution determining that "Robert Smith" in one system and "Bob Smith" in another are actually the same patient.

#### Entity-Relationship Model

A relational modeling technique that represents data as entities, their attributes, and the relationships connecting them, typically diagrammed before tables are created.

The entity-relationship model is the conceptual starting point most database courses teach before normalization and table design; this course contrasts it with graph data modeling, which keeps relationships as first-class structures instead of flattening them into foreign keys.

**Example:** An entity-relationship diagram showing a Patient entity connected to a Provider entity through a "treated by" relationship before either is translated into tables.

#### ETL Pipeline

A data integration process that extracts data from source systems, transforms it into a target format, and loads it into a destination database.

**Example:** An ETL pipeline that pulls claims data from a payer's mainframe, converts codes into a consistent format, and loads the results into a graph database.

#### Evidence-Based Medicine

Medical practice integrating clinical expertise with the best available research evidence.

**Example:** A physician prescribes antibiotics for pneumonia based on clinical trials demonstrating efficacy for that infection.

#### Exclusion List Screening

The practice of checking providers or entities against sanctioned or excluded-party lists before enrollment, contracting, or payment.

**Example:** Automated exclusion list screening flags a newly hired billing vendor whose owner appears on a federal exclusion list.

#### Executable Level

The FHIR knowledge representation level at which clinical logic is coded directly for a specific clinical decision support platform to run at the point of care.

**Example:** Deploying compiled CQL logic to an EHR's decision support engine so it automatically fires an alert when a patient's blood pressure exceeds a guideline threshold.

#### Explainability

The ability to understand and articulate why a system or algorithm produced a specific result.

**Example:** A clinical decision support system explains why it recommended a particular treatment by citing the patient factors and research evidence it considered.

#### Explainable AI

A set of design practices and techniques intended to make an AI model's decisions and internal reasoning understandable to human users.

Explainable AI refers to the methods used to achieve explainability, such as highlighting which input features most influenced a prediction, rather than the property of understandability itself.

**Example:** An explainable AI technique that highlights which lab values and diagnoses most influenced a sepsis-risk model's prediction for a specific patient.

#### Explanation Of Benefits

A statement sent to a patient describing what a submitted claim covered, what the payer paid, and what amount the patient owes.

**Example:** An explanation of benefits showing that an insurer paid $400 of a $600 office visit charge, leaving the patient responsible for a $200 balance.

#### Expression Logical Model

The machine-readable XML or JSON representation that CQL logic compiles into for execution by EHR systems and decision support engines.

**Example:** An EHR's execution engine runs the Expression Logical Model version of a screening rule rather than the original human-readable CQL text.

#### False Claims Act

A federal law that imposes civil liability on individuals or organizations who knowingly submit fraudulent claims for payment from government healthcare programs.

**Example:** A hospital settles a False Claims Act case after being found to have billed Medicare for services that were not medically necessary.

#### Family History

Documented health information about a patient's blood relatives, used to assess hereditary disease risk.

**Example:** A patient's family history noting that a parent had early-onset colon cancer, prompting earlier screening recommendations.

#### Feature Engineering

The process of selecting and transforming raw data attributes into inputs that improve a machine learning model's predictive performance.

**Example:** Feature engineering that converts a raw list of a patient's diagnosis codes into a count of distinct chronic conditions for use in a readmission model.

#### Fee-For-Service Model

A healthcare payment system where providers receive separate payment for each service delivered.

**Example:** A physician bills separately for an office visit, blood test, and X-ray performed during one patient encounter.

#### FHIR Implementation Guide

A published set of rules, profiles, and constraints specifying how FHIR resources must be used for a particular purpose, jurisdiction, or use case.

**Example:** A national FHIR implementation guide specifying exactly which fields are required on a Patient resource for a country's health information exchange.

#### FHIR Questionnaire Resource

The FHIR resource type that defines a structured set of questions used to collect information, such as an intake form or a standardized assessment.

**Example:** A FHIR Questionnaire resource defining the questions on a depression screening tool that a patient completes on a tablet before their appointment.

#### FHIR Resource

The basic unit of information in FHIR, representing a single, discrete healthcare concept such as a patient, condition, or observation.

**Example:** A single FHIR resource representing one blood pressure reading, complete with its value, unit, and the date it was taken.

#### FHIR RESTful API

The set of standardized HTTP-based operations, such as read, search, and create, that FHIR defines for exchanging resources between systems.

**Example:** An app calls the FHIR RESTful API endpoint for a Patient resource to retrieve a specific patient's demographic information.

#### FHIR Server

A system that stores FHIR resources and exposes them to client applications through a standardized RESTful API.

**Example:** A hospital's FHIR server responds to a request for a specific patient's active medications by returning the matching MedicationRequest resources.

#### FHIR Standard

Fast Healthcare Interoperability Resources, an HL7 specification that defines a set of resources and a RESTful API for exchanging healthcare data electronically.

**Example:** Two different EHR vendors both implement the FHIR standard so that a patient's allergy list can be transferred between their systems.

#### Financial Forecasting

The process of projecting an organization's future revenue, expenses, and cash flow based on historical data and expected trends.

**Example:** A hospital's finance team uses financial forecasting to project next year's revenue under an expected shift toward more value-based contracts.

#### Financial Risk Pool

A shared fund of premium or capitation dollars set aside to cover the cost of unpredictable, high-cost patient claims.

**Example:** A group of independent physician practices contributes to a shared financial risk pool that covers unusually expensive specialty referrals.

#### Fine-Tuning

The process of further training a pre-trained model on a smaller, task-specific dataset to improve its performance on that task.

**Example:** Fine-tuning a general-purpose language model on de-identified clinical notes so it better recognizes medication and dosage phrasing.

#### Foreign Key

A column in a relational table that references the primary key of another table, establishing a link between two records.

**Example:** A ProviderID column in a Claims table that points back to the Provider table row containing that provider's details.

#### Forms/UI Tier

The Tier of Functionality covering the user interface and interaction elements through which clinicians engage with a knowledge artifact.

**Example:** The Forms/UI Tier of a care gap alert defines how the reminder appears on a physician's screen and what buttons let them acknowledge or dismiss it.

#### Formulary

A list of prescription medications approved for use and covered by a health insurance plan.

**Example:** An insurance company's formulary includes generic medications at low cost but requires prior authorization for expensive brand-name drugs.

#### Formulary Rule

A policy governing which medications are covered by insurance and under what conditions.

**Example:** A formulary rule requires patients to try a generic medication before approving coverage for a more expensive brand-name alternative.

#### Fraud Analytics Dashboard

A visual reporting interface that surfaces fraud indicators, trends, and case metrics for investigators and compliance staff.

**Example:** A fraud analytics dashboard showing a map of geographic hotspots where durable medical equipment claims have spiked in the past month.

#### Fraud Detection

The process of identifying intentional deception in healthcare billing or service delivery.

**Example:** Using graph analytics to detect a provider billing for services to deceased patients.

#### Fraud Investigation Workflow

The defined sequence of steps an organization follows to detect, review, and resolve a suspected healthcare fraud case.

**Example:** A fraud investigation workflow moving a flagged claim from automated scoring to analyst review, provider interview, and final referral to law enforcement.

#### Fraud Risk Score

A numeric value estimating the likelihood that a specific claim, provider, or patient is involved in fraudulent activity.

**Example:** A claim automatically receives a high fraud risk score after a model detects it matches several known patterns of phantom billing.

#### Generic Drug

A pharmaceutical product containing the same active ingredient as a brand drug, sold without the brand name after the original patent expires.

**Example:** Atorvastatin sold as a generic drug offers the same active ingredient as Lipitor at a lower cost once patent protection ends.

#### Genetic Marker

A specific DNA sequence variation associated with a particular trait, disease risk, or response to treatment.

**Example:** A genetic marker in the BRCA1 gene associated with elevated breast cancer risk, recorded to inform a patient's screening plan.

#### Golden Record

A single, trusted, and reconciled version of an entity's data assembled from multiple source systems.

**Example:** Merging three separate patient records from a hospital, a clinic, and a lab system into one golden record with the correct, agreed-upon demographic details.

#### GQL Standard

Graph Query Language, an ISO standard for querying graph databases similar to SQL for relational databases.

**Example:** GQL allows database vendors to implement a common query language for graph operations.

#### Graph Algorithm

A computational procedure designed to solve problems involving graph-structured data.

**Example:** The shortest path algorithm finds the fastest route for a patient transfer between two hospitals in a healthcare network.

#### Graph And LLM Integration

The combination of graph databases with large language models to enable semantic reasoning over structured relationships.

**Example:** An integrated system uses a graph database to store patient relationships and an LLM to answer natural language questions about care patterns.

#### Graph API

A programmatic interface that lets applications create, query, and update nodes, relationships, and properties in a graph database.

**Example:** A web application that calls a graph API to look up all conditions connected to a given patient identifier.

#### Graph Benchmarking

The systematic measurement and comparison of a graph database's performance across defined workloads, dataset sizes, and query types.

**Example:** Benchmarking two graph database products by running the same set of patient-lookup and fraud-detection queries against identically sized datasets.

#### Graph Career Path

Professional opportunities for data scientists and engineers specializing in graph database technologies.

**Example:** Healthcare organizations hire graph database specialists to build analytics platforms for population health management.

#### Graph Clustering

The process of grouping nodes into clusters based on the density or similarity of their connections, without necessarily requiring the clusters to be fully separated.

**Example:** Clustering patients into groups that share overlapping care teams and diagnoses to support population health outreach.

#### Graph Convolutional Network

A type of graph neural network that learns a node's representation by aggregating and transforming feature information from its neighbors across successive layers.

**Example:** A graph convolutional network that predicts readmission risk by combining a patient's own attributes with information from connected conditions and prior encounters.

#### Graph Data Loading

The process of importing data from source systems into a graph database as nodes, relationships, and properties.

**Example:** Reading rows from a claims spreadsheet and creating corresponding Patient, Provider, and Claim nodes connected by SUBMITTED relationships.

#### Graph Data Model

A data modeling approach that represents information as nodes and relationships instead of the rows and columns used by tabular data models, allowing connections to be traversed directly.

**Example:** Modeling a patient's care history as Patient, Provider, and Medication nodes connected by PRESCRIBED and TREATED relationships rather than as linked tables.

#### Graph Database

A database management system that stores data as nodes and edges, optimized for traversing relationships.

**Example:** Neo4j is a graph database used to model patient-provider-payer relationships in healthcare systems.

#### Graph Database Cluster

A group of interconnected servers that jointly store and serve a single logical graph database.

**Example:** A five-node cluster where each server holds part of a healthcare graph and coordinates to answer queries as a unified system.

#### Graph Database Engine

The core software component responsible for storing, indexing, and executing queries against graph-structured data.

**Example:** The engine inside a graph database that translates a Cypher query into low-level operations for traversing patient and provider nodes.

#### Graph Density Metric

A measure of how many actual connections exist in a graph relative to the maximum number of connections theoretically possible.

**Example:** A provider network with a low graph density metric indicates that most providers refer to only a small handful of colleagues.

#### Graph Driver

A client library that implements a graph database's connection protocol for a specific programming language, allowing applications to send queries and receive results.

**Example:** A Java graph driver that lets a hospital's scheduling application submit Cypher queries and process the returned patient records.

#### Graph Embedding

A technique that represents graph nodes as vectors in a continuous space while preserving structural properties.

**Example:** Converting patient nodes into 128-dimensional vectors where similar patients have nearby vector representations.

#### Graph Explorer Tool

Software that lets users interactively browse, query, and visualize the contents of a graph database without writing full query scripts.

**Example:** A browser-based explorer where an analyst clicks a patient node to expand and view all of that patient's connected encounters.

#### Graph Index

A data structure accelerating graph queries by organizing nodes or edges for rapid lookup.

**Example:** An index on patient ID properties enables fast retrieval of specific patient nodes without scanning the entire graph.

#### Graph Neural Network

A neural network architecture designed to operate on graph-structured data for pattern recognition and prediction.

**Example:** A graph neural network predicts which patients are at high risk for hospital readmission based on their position in the care network.

#### Graph Path

A sequence of connected nodes and edges traversed while moving through a graph.

**Example:** A graph path showing a patient's journey from primary care physician to specialist to hospital admission.

#### Graph Pattern Matching

Finding subgraph structures that conform to a specified pattern template.

**Example:** Matching patterns to find all instances where a provider prescribed opioids to patients who visited multiple emergency departments.

#### Graph Pattern Recognition

Identifying recurring structural motifs or configurations within graph data.

**Example:** Recognizing fraud patterns where groups of providers share unusual referral and billing relationships.

#### Graph Query

A request to retrieve or manipulate data from a graph database based on node and edge criteria.

**Example:** A query finding all patients treated by a specific cardiologist who also have diabetes.

#### Graph Query Optimization

Techniques for improving the performance and efficiency of graph database queries.

**Example:** Rewriting a query to filter nodes early rather than traversing unnecessary relationships.

#### Graph Sampling

The process of selecting a smaller, representative subgraph from a larger graph for faster analysis, testing, or algorithm development.

**Example:** Sampling ten thousand patient records from a national claims graph to prototype a fraud-detection algorithm before running it at full scale.

#### Graph Schema Design

The activity of defining node labels, relationship types, and property structures before a graph database is populated with data.

**Example:** Deciding in advance that a healthcare graph will use Patient and Provider node labels connected by TREATED and REFERRED_TO relationship types.

#### Graph Serialization

The process of converting a graph's nodes, relationships, and properties into a structured file format for storage, transfer, or exchange between systems.

**Example:** Exporting a provider referral graph to a GraphML or JSON file so it can be loaded into a different graph database.

#### Graph Sharding

Partitioning a large graph across multiple servers so that each server stores and manages only a subset of the overall nodes and relationships.

**Example:** Splitting a national claims graph by geographic region so each server holds the patients and providers for one region.

#### Graph Theory Basics

Fundamental mathematical concepts describing structures composed of nodes and edges.

**Example:** Understanding that healthcare relationships can be modeled as graphs where patients, providers, and payers are nodes connected by edges.

#### Graph Traversal

The process of visiting nodes and edges in a graph following a specific strategy.

**Example:** Traversing a patient's medical history by following edges chronologically from earliest to most recent encounters.

#### Graph Visualization

The graphical rendering of nodes and edges as shapes and lines to help users interpret a graph's structure and patterns visually.

**Example:** A diagram showing patient nodes as circles and provider nodes as squares, connected by lines representing treatment relationships.

#### Graph-Based Fraud Ring

A set of interconnected providers, patients, or claims whose graph structure, such as unusual clustering or shared identifiers, reveals a coordinated fraud scheme.

**Example:** A graph-based fraud ring uncovered when analysts find a dense cluster of providers, patients, and addresses all linked to the same handful of bank accounts.

#### GSQL

A query language for the TigerGraph database combining declarative and imperative programming features.

**Example:** GSQL enables complex multi-step graph analytics queries for fraud detection across millions of healthcare claims.

#### Guideline Authoring Process

The multi-stage workflow through which subject matter experts transform clinical evidence into a published, reviewed clinical practice guideline.

**Example:** A guideline authoring process involving literature review, expert panel discussion, and public comment before a diabetes management guideline is finalized.

#### Guideline-Based Care Pathway

A care pathway whose sequence of steps is derived directly from the recommendations of a published clinical practice guideline.

**Example:** A guideline-based care pathway for heart failure management built directly from a cardiology society's published treatment recommendations.

#### HCPCS Code

Healthcare Common Procedure Coding System codes used for billing medical services, supplies, and equipment.

**Example:** HCPCS code E0100 represents a cane with a quadruped base.

#### Health Information Exchange

The organizations, networks, and technical infrastructure that enable electronic health information to move between otherwise unaffiliated healthcare systems and providers.

**Example:** A regional Health Information Exchange that lets an emergency department pull a patient's recent lab results from a different hospital system's records.

#### Health Maintenance Organization

An insurance plan that requires members to use a defined network of providers and typically obtain referrals before seeing specialists.

**Example:** A member of a health maintenance organization must first see their assigned primary care physician before being referred to a dermatologist.

#### Healthcare Analytics Platform

An integrated system for collecting, processing, and analyzing healthcare data to generate insights.

**Example:** A platform combining graph databases, machine learning, and visualization tools to identify cost reduction opportunities.

#### Healthcare Cost

The financial resources required to deliver medical services and maintain the healthcare system.

**Example:** The United States has the highest per-capita healthcare costs globally, exceeding $12,000 per person annually.

#### Healthcare Cost Analysis

Systematic examination of expenses associated with delivering medical services to identify efficiency opportunities.

**Example:** Analyzing cost patterns reveals that preventive care reduces expensive emergency department visits.

#### Healthcare Data Exchange

The electronic sharing of medical information between different healthcare organizations and systems.

**Example:** A health information exchange allows hospitals, clinics, and labs to securely share patient records.

#### Healthcare Fraud

Intentional deception or misrepresentation in medical billing to receive unauthorized payments.

**Example:** A clinic bills for medical services that were never actually provided to patients.

#### Healthcare Interoperability

The ability of different healthcare information systems to exchange and use shared data.

**Example:** Interoperability enables a pharmacy to electronically receive prescriptions from any physician's office regardless of their software.

#### Healthcare Patient

An individual receiving medical care or treatment from healthcare providers.

**Example:** A patient visits their primary care physician for an annual wellness examination.

#### Healthcare Payer

An organization that finances or reimburses healthcare services, typically an insurance company or government program.

**Example:** Medicare serves as the healthcare payer for Americans aged 65 and older.

#### Healthcare Provider

A licensed professional or organization delivering medical services to patients.

**Example:** Physicians, nurses, hospitals, and clinics are all healthcare providers.

#### Healthcare System

The organizational structure delivering medical services to a population, including providers, payers, and facilities.

**Example:** The U.S. healthcare system combines private insurance, government programs, and provider networks.

#### High Availability

A system design goal ensuring continued operation with minimal downtime despite hardware failures or planned maintenance.

**Example:** A graph database configured with replica servers so that clinical queries keep working even if one server fails.

#### High-Deductible Health Plan

An insurance plan characterized by a lower monthly premium paired with a higher amount the member must pay out of pocket before coverage begins.

**Example:** A high-deductible health plan requiring a member to pay the first $3,000 of care costs each year before the insurer begins reimbursing claims.

#### HIPAA

Health Insurance Portability and Accountability Act, a federal law protecting patient health information privacy and security.

**Example:** HIPAA requires healthcare organizations to implement safeguards preventing unauthorized disclosure of patient records.

#### HL7 Standard

A family of specifications published by Health Level Seven International that define how clinical and administrative healthcare data is structured and exchanged.

**Example:** A hospital's lab system and its EHR both implement the HL7 standard so that a lab result message is understood the same way by both systems.

#### HL7 V2 Message

A pipe-delimited text message format defined by the HL7 Version 2 standard for exchanging discrete clinical events between systems.

**Example:** An HL7 V2 ADT message notifying a hospital's systems that a patient has just been admitted to a specific unit.

#### Horizontal Scaling

Increasing a system's capacity by adding more machines to a cluster rather than upgrading the resources of a single machine.

**Example:** Adding three additional servers to a graph database cluster to handle a growing volume of claims data.

#### Hospital

A licensed healthcare facility providing inpatient medical, surgical, and nursing care services.

**Example:** A regional hospital offers emergency services, surgical suites, intensive care, and specialized treatment departments.

#### Hospital Department

A specialized unit within a hospital organized around specific types of medical care.

**Example:** The cardiology department includes cardiac catheterization labs, echocardiography, and cardiovascular intensive care.

#### Human-In-The-Loop Review

A workflow design in which a person reviews or approves an AI system's output before it takes effect.

**Example:** A human-in-the-loop review requires a nurse to confirm an AI-generated care gap alert before it is sent to the patient.

#### ICD Code

International Classification of Diseases codes used to document diagnoses and conditions in medical records.

**Example:** ICD-10 code E11.9 represents Type 2 diabetes mellitus without complications.

#### ICD-10-CM

A coded classification system used in the United States to record patient diagnoses for clinical documentation and billing purposes.

**Example:** A patient's chart records ICD-10-CM code E11.9 to indicate a diagnosis of type 2 diabetes without complications.

#### Identity And Access Management

The overall set of policies and technologies an organization uses to manage user identities and control what systems and data they are permitted to access.

**Example:** A hospital's identity and access management system automatically revokes a terminated employee's access to all connected systems at once.

#### Identity Theft Fraud

The use of a stolen patient or provider identity to submit fraudulent healthcare claims.

**Example:** A criminal uses a stolen Medicare beneficiary number to bill for equipment the real patient never ordered or received.

#### Imaging Study

A diagnostic examination, such as an X-ray, CT scan, or MRI, that produces visual representations of internal body structures.

**Example:** An imaging study ordered to evaluate a patient's persistent knee pain reveals cartilage damage.

#### Immunization

The process of making an individual immune to disease through vaccination.

**Example:** A child receives immunizations against measles, mumps, and rubella at age 12 months.

#### In-Network Provider

A provider who has a contract with a specific payer to deliver care at negotiated rates.

**Example:** A patient chooses an in-network provider for a scheduled surgery to avoid the higher out-of-pocket costs of going outside the plan's network.

#### Index-Free Adjacency

A storage technique in which each node keeps direct references to its neighboring nodes, allowing traversal to a connected node without a separate index lookup.

Index-free adjacency is a key reason native graph databases can traverse deep relationship chains, such as multi-hop referral paths, far faster than relational joins at scale.

**Example:** Moving from a Patient node to its Provider node by following a stored pointer rather than searching an index for matching foreign keys.

#### Industry Certification

A credential awarded by a vendor or professional organization verifying an individual's competency in a specific technology or skill.

**Example:** Earning an industry certification in a specific graph database platform to demonstrate hands-on query and administration skills to employers.

#### Influence Propagation

The modeling of how an effect, piece of information, or behavior spreads from node to node across a network over successive steps.

**Example:** Modeling how a new prescribing guideline spreads through a network of connected physicians who influence one another's practice habits.

#### Inpatient Care

Medical services provided to patients who are admitted to a hospital for at least one overnight stay.

**Example:** A patient receives inpatient care for five days following hip replacement surgery.

#### Insider Threat Detection

The identification of risky or malicious behavior originating from an organization's own employees or other authorized users.

**Example:** Insider threat detection flags an employee who accessed hundreds of patient records with no apparent job-related reason.

#### Insurance Claim

A formal request submitted to an insurance company for payment of covered healthcare services.

**Example:** A hospital submits an insurance claim for $45,000 for a patient's appendectomy surgery.

#### Insurance Policy

A contract between an insurer and member specifying covered services, costs, and conditions.

**Example:** An insurance policy outlines the deductible, copayments, and maximum out-of-pocket costs for the year.

#### Interoperability Standard

An agreed-upon technical specification that allows different healthcare information systems to exchange and consistently interpret data.

**Example:** FHIR is an interoperability standard that lets an EHR system and a mobile health app both understand the same patient data structure.

#### Interview Preparation

The deliberate practice of anticipating and rehearsing responses to technical and behavioral questions before a job interview.

**Example:** Interview preparation that includes practicing how to explain a capstone project's graph schema design decisions to a hiring panel.

#### Jaccard Similarity

A similarity metric that compares two nodes by dividing the number of neighbors they share by the total number of distinct neighbors between them.

**Example:** Measuring Jaccard similarity between two patients based on the overlap of their diagnosed conditions to find candidates for a similar treatment cohort.

#### Job Market For Graph Modeling

The current demand, available roles, and hiring trends for professionals skilled in graph database design and analytics.

**Example:** Reviewing job postings that show growing demand in the job market for graph modeling skills within healthcare fraud and analytics teams.

#### Join Operation

A relational query operation that combines rows from two or more tables based on a matching column value.

Graph databases avoid join operations at query time because relationships are stored directly as traversable connections rather than reconstructed on demand, which is a central motivation for this course.

**Example:** Joining a Patients table with a Claims table on PatientID to produce a report listing every claim alongside the patient's name.

#### Kickback Scheme

An illegal arrangement where healthcare providers receive payment for patient referrals.

**Example:** A laboratory pays physicians $50 for each patient blood test referral, violating federal anti-kickback laws.

#### Knowledge Engineer Role

The professional responsible for translating clinical knowledge from semi-structured formats into coded, structured representations usable by computer systems.

**Example:** A knowledge engineer converts a clinical flowchart for stroke evaluation into SNOMED CT-coded logic that a CDS system can evaluate.

#### Knowledge Graph

A graph database containing entities and relationships representing real-world knowledge in a domain.

**Example:** A medical knowledge graph connects diseases, symptoms, treatments, and medications based on clinical research.

#### Knowledge Representation Level

One of four FHIR-defined tiers describing how computable a piece of clinical knowledge is, ranging from plain narrative text to directly executable code.

**Example:** Classifying a new hypertension guideline as currently existing only at the Narrative level, not yet translated into structured or executable form.

#### Lab Result

The outcome of a laboratory test performed on a patient's biological sample.

**Example:** A lab result shows a patient's hemoglobin A1C level is 7.2%, indicating suboptimal diabetes control.

#### Lab Test

A diagnostic procedure analyzing patient samples to detect disease or monitor health status.

**Example:** A complete blood count lab test measures different components of blood to screen for various conditions.

#### Label Propagation

A fast community detection algorithm in which each node repeatedly adopts the most common label among its neighbors until the labels stabilize.

**Example:** Using label propagation on a claims graph to quickly sort thousands of providers into likely referral communities without heavy computation.

#### Labeled Property Graph

A graph data model where nodes and edges have types (labels) and associated key-value properties.

**Example:** A labeled property graph includes Patient nodes with name and birthdate properties connected by PRESCRIBED edges with dosage properties.

#### Large Language Model

An artificial intelligence system trained on vast text data to understand and generate human language.

**Example:** A large language model assists clinicians by generating patient summary notes from electronic health records.

#### Link Prediction

A graph algorithm that estimates the likelihood of future connections between unconnected nodes.

**Example:** Predicting which patients are likely to develop diabetes based on their similarity to other patients in the graph.

#### Locum Tenens

A temporary provider who fills in for another physician's practice for a defined period, such as during a leave of absence.

**Example:** A rural clinic hires a locum tenens physician to cover patient visits while its regular doctor is on medical leave.

#### Logic Tier

The Tier of Functionality covering the business and process rules that govern how a clinical knowledge artifact behaves.

**Example:** The Logic Tier of a sepsis alert defines the rule that triggers a warning when a patient's temperature, heart rate, and white blood cell count all exceed set thresholds.

#### LOINC Code

Logical Observation Identifiers Names and Codes, a standardized vocabulary used to identify laboratory tests and other clinical observations.

**Example:** A hemoglobin A1C lab result is tagged with a LOINC code so that different labs and EHR systems recognize it as the same test.

#### Louvain Method

A graph community detection algorithm that iteratively regroups nodes to maximize modularity, a measure of how much denser connections are within groups than between them.

**Example:** Applying the Louvain method to a provider referral graph to reveal tightly knit clusters of specialists who frequently work together.

#### Machine Learning

Computational methods enabling systems to improve performance on tasks through experience without explicit programming.

**Example:** A machine learning model learns to predict hospital readmission risk by analyzing patterns in thousands of patient records.

#### MADiE Authoring Tool

A CMS-sponsored, web-based tool that combines measure authoring and dynamic testing for CQL-based electronic clinical quality measures.

**Example:** A measure developer uses the MADiE authoring tool to write a new eCQM's CQL logic and immediately test it against sample patient data in the same interface.

#### Malpractice Risk

The estimated likelihood that a provider's care decisions could result in a professional liability claim.

**Example:** A surgeon with several prior settled claims may be flagged in a graph as carrying higher malpractice risk than peers with clean histories.

#### Master Data Management

Processes ensuring critical business data is consistent, accurate, and controlled across an organization.

**Example:** Master data management ensures a patient has one consistent identifier across all hospital systems.

#### Measure Authoring Tool

Software used by measure developers to define the population criteria, logic, and structure of a clinical quality measure.

**Example:** A measure authoring tool that lets a developer specify the initial patient population, numerator, and denominator for a new quality measure.

#### Medicaid

A joint federal and state health insurance program that provides coverage for eligible low-income individuals and families.

**Example:** A low-income single parent and her children receive coverage for doctor visits and prescriptions through their state's Medicaid program.

#### Medical Coding System

A standardized set of codes representing diseases, procedures, and healthcare services for documentation and billing.

**Example:** Medical coding systems like ICD and CPT enable consistent communication of diagnoses and treatments across providers.

#### Medical Condition

A health state deviating from normal physiological function, including diseases, syndromes, and injuries.

**Example:** Asthma is a chronic medical condition causing inflammation and narrowing of airways.

#### Medical Encounter

An interaction between a patient and healthcare provider for evaluation, diagnosis, or treatment.

**Example:** A medical encounter occurs when a patient visits the emergency department for chest pain evaluation.

#### Medical License

Official authorization granted by a state allowing an individual to practice medicine within that jurisdiction.

**Example:** A physician must maintain an active medical license in every state where they see patients.

#### Medical Necessity

The requirement that healthcare services are appropriate and required to diagnose or treat a condition.

**Example:** Insurance companies determine medical necessity before approving coverage for expensive imaging studies.

#### Medical Terminology

The specialized vocabulary used by healthcare professionals to describe anatomy, conditions, and procedures.

**Example:** Medical terminology enables precise communication, such as using "myocardial infarction" instead of "heart attack."

#### Medicare

A federal health insurance program in the United States that primarily serves people age 65 and older and certain individuals with disabilities.

**Example:** A 68-year-old patient's hospital stay is billed to Medicare rather than a private employer-sponsored insurance plan.

#### Medication

A substance used to treat, prevent, or diagnose disease administered to patients.

**Example:** A physician prescribes medication to lower a patient's high blood pressure.

#### MedicationRequest Resource

The FHIR resource type that represents an order or request for a patient to receive a specific medication.

**Example:** A MedicationRequest resource specifying that a physician has ordered 500mg of amoxicillin three times daily for ten days.

#### Mental Health Screening

A brief, standardized assessment used to identify patients who may have a behavioral health condition requiring further evaluation.

**Example:** A primary care visit that includes a mental health screening questionnaire to check for signs of depression.

#### Message Passing

A computational technique used in graph neural networks in which each node repeatedly exchanges and aggregates information with its immediate neighbors across layers.

**Example:** A patient node updates its internal representation each round by combining information passed from its connected conditions, medications, and providers.

#### Metadata Management

The processes and systems for organizing, storing, and maintaining data about data.

**Example:** Metadata management tracks which department owns each data element and when it was last updated.

#### Minimum Necessary Standard

A HIPAA principle requiring that access to and disclosure of protected health information be limited to the minimum needed to accomplish a specific purpose.

**Example:** Under the minimum necessary standard, a billing clerk can view a patient's insurance information but not their full clinical notes.

#### Minimum Spanning Tree

A subset of edges that connects all nodes in a weighted graph using the lowest possible total edge weight, without forming any cycles.

**Example:** Finding the minimum spanning tree of a regional hospital transfer network to identify the lowest-cost set of connections needed to link every facility.

#### Model Bias

A systematic error in a model's predictions that unfairly favors or disadvantages particular groups or outcomes.

**Example:** A readmission-risk model exhibiting model bias by underestimating risk for a demographic group underrepresented in its training data.

#### Model Drift Detection

The ongoing monitoring of a deployed model's inputs or performance to identify when it no longer matches the data it was originally trained on.

**Example:** Model drift detection alerts a team that a fraud model's accuracy has dropped after a new billing code was introduced that the model had never seen.

#### Model Evaluation Metric

A quantitative measure used to assess the accuracy, quality, or performance of a machine learning model.

**Example:** Using precision and recall as model evaluation metrics to judge how well a fraud-detection model correctly flags true fraudulent claims without excessive false alarms.

#### Model Hallucination

An output produced by a language model that is fabricated or factually incorrect despite being presented with apparent confidence.

**Example:** A model hallucination occurs when an AI assistant cites a drug interaction warning that does not actually exist in any clinical reference.

#### Motif Detection

A technique for finding occurrences of a specific, small, fixed connection pattern, such as a triangle or a three-node feedback loop, within a larger graph.

Motif detection differs from broader pattern recognition by targeting one precisely defined small shape and counting or locating every instance of it, which is useful for spotting recurring fraud configurations like circular billing arrangements.

**Example:** Detecting a three-node motif in which a patient, provider, and pharmacy form a closed triangle that repeats across many claims.

#### Multi-Agent System

An AI architecture in which multiple autonomous agents collaborate or coordinate, each often handling a distinct subtask, to complete work beyond a single agent's scope.

**Example:** A multi-agent system in which one agent retrieves patient data, another checks drug interactions, and a third drafts a summary for the clinician.

#### Multi-Factor Authentication

An authentication method that requires two or more independent forms of verification before granting a user access to a system.

**Example:** A clinician logs into the EHR with a password and then confirms a one-time code sent to their phone as part of multi-factor authentication.

#### Multidisciplinary Team

Healthcare professionals from different specialties collaborating on patient care.

**Example:** A multidisciplinary team for cancer treatment includes an oncologist, surgeon, radiologist, and social worker.

#### Multigraph

A graph that permits more than one edge to exist between the same pair of nodes, often to represent distinct relationship types or repeated events over time.

**Example:** A patient and provider connected by three separate ENCOUNTER edges, one for each visit date, rather than a single collapsed relationship.

#### Named Entity Recognition

A natural language processing task that identifies and classifies specific real-world entities, such as drug names or diagnoses, mentioned within text.

**Example:** Named entity recognition scanning a clinical note identifies "metformin" as a medication and "type 2 diabetes" as a condition.

#### Narrative Level

The FHIR knowledge representation level at which clinical guidance is expressed as free-text prose intended for human readers rather than computer interpretation.

**Example:** A published clinical guideline document describing recommended blood pressure targets in ordinary sentences, with no coded logic attached.

#### Native Graph Storage

A storage architecture that persists nodes and relationships as physically connected structures on disk, rather than simulating them on top of tables or key-value pairs.

**Example:** A graph database that stores a PRESCRIBED relationship as a direct pointer between two node records instead of a row in a separate join table.

#### Natural Language Processing

A field of computing focused on enabling computers to interpret, generate, and analyze human language.

**Example:** Natural language processing techniques extract a documented allergy from a free-text physician note and convert it into a structured data element.

#### NDC Code

The National Drug Code, an identifier assigned to each specific drug product, including its manufacturer, formulation, and package size.

**Example:** An NDC code on a prescription label uniquely identifies a 30-tablet bottle of a particular manufacturer's 10mg lisinopril.

#### Net Collection Rate

The percentage of allowed reimbursement an organization actually collects, after excluding contractual write-offs from the calculation.

**Example:** A practice with a 98% net collection rate is successfully collecting nearly all of the payment it is contractually entitled to receive.

#### Network Adequacy

A regulatory standard requiring an insurance plan's provider network to offer members sufficient access to care within reasonable distance and wait times.

**Example:** A state regulator reviews an insurer's network adequacy filing to confirm members can reach a primary care provider within 30 minutes of home.

#### Neurodiversity

A perspective viewing variations in neurological development, such as autism or ADHD, as natural human differences rather than deficits to be corrected.

**Example:** A care plan built on a neurodiversity perspective focuses on accommodating a patient's sensory needs rather than framing autism solely as a disorder to treat.

#### Node

A fundamental graph element representing an entity or data point.

**Example:** In a healthcare graph, a node might represent a patient, provider, or medication.

#### Node Classification

A graph machine learning task that predicts a categorical label for each node based on its properties and its connections to other nodes.

**Example:** Classifying provider nodes as "typical" or "high fraud risk" using a model trained on billing patterns and referral connections.

#### Node Embedding

A technique converting graph nodes into dense numerical vectors for machine learning applications.

**Example:** Node embeddings allow similar patients to be grouped together based on their medical histories and relationships.

#### Node Property

An attribute or characteristic associated with a node in a graph.

**Example:** A Patient node might have properties including name, date of birth, and blood type.

#### Node2Vec

An algorithm that generates node embeddings by training a model on sequences of nodes visited during biased random walks over the graph.

**Example:** Running Node2Vec on a provider referral graph to produce vectors that place frequently co-referring providers close together in embedding space.

#### Normalization

The relational database process of organizing tables and columns to reduce data redundancy and avoid update anomalies.

**Example:** Splitting a single patient-visit table into separate Patient, Provider, and Encounter tables so that a provider's address is stored only once.

#### Nurse Practitioner

An advanced practice registered nurse licensed to diagnose conditions, prescribe medication, and manage patient care, often independently or in collaboration with physicians.

**Example:** A nurse practitioner manages a panel of primary care patients, ordering labs and prescribing medications for chronic condition management.

#### Observation Resource

The FHIR resource type that captures measurements or assertions made about a patient, such as vital signs or laboratory results.

**Example:** An Observation resource recording a patient's blood pressure reading of 130/85 mmHg taken during a clinic visit.

#### Open-Source Contribution

The act of submitting code, documentation, or fixes to a publicly available, community-maintained software project.

**Example:** Submitting a bug fix to an open-source graph visualization library as an open-source contribution listed on a student's resume.

#### Operating Margin

The percentage of revenue remaining after subtracting operating expenses, indicating financial performance.

**Example:** A hospital with a 5% operating margin earns $5 for every $100 in revenue after covering costs.

#### Order Set

A predefined grouping of orders, such as medications, labs, and imaging studies, that a clinician can select together for a specific clinical scenario.

**Example:** A pneumonia order set that bundles a chest X-ray, blood cultures, and a standard antibiotic regimen into a single selectable group.

#### Out-Of-Network Provider

A provider without a contract with a specific payer, which typically results in higher cost-sharing for the patient.

**Example:** A patient who sees an out-of-network provider for a specialty consultation pays a larger share of the bill than they would in-network.

#### Out-Of-Pocket Maximum

The most an insured person pays for covered services in a plan year, after which insurance pays 100%.

**Example:** After reaching the $6,000 out-of-pocket maximum, all subsequent covered services are fully paid by insurance.

#### Outlier Billing Pattern

A provider's billing behavior that statistically deviates from that of peers in service frequency, cost, or mix of services rendered.

**Example:** A dermatologist billing for ten times more skin biopsies per patient than similar providers shows an outlier billing pattern worth investigating.

#### Outpatient Facility

A healthcare location providing services not requiring overnight hospital admission.

**Example:** Outpatient surgery centers perform procedures where patients go home the same day.

#### Pagerank Algorithm

A graph algorithm measuring node importance based on the quantity and quality of connections.

**Example:** Using PageRank to identify influential healthcare providers based on referral network patterns.

#### Palliative Care

Specialized medical care focused on relieving symptoms and improving quality of life for patients with serious or life-limiting illness.

**Example:** A palliative care team manages pain and provides emotional support for a patient undergoing treatment for advanced cancer.

#### Path Query

A graph query finding sequences of connected nodes and edges matching specified criteria.

**Example:** A path query traces a patient's journey from primary care through specialists to hospital admission.

#### Pathology Report

A clinician's written interpretation of tissue, cell, or fluid samples examined under laboratory analysis.

**Example:** A pathology report confirming that a biopsied skin lesion is benign after microscopic examination.

#### Patient Care Plan

A patient-specific record linking a particular patient to the goals, interventions, and responsible providers established to manage that individual's conditions over time.

A patient care plan is the concrete, instance-level realization of the general care plan concept, modeled in a graph as a node connected to one specific patient rather than as an abstract template.

**Example:** A patient care plan node connecting a specific diabetic patient to nodes for a target A1C goal, a dietitian referral, and a monthly monitoring schedule.

#### Patient Demographics

Statistical characteristics of patients including age, gender, race, location, and socioeconomic factors.

**Example:** Patient demographics help researchers understand health disparities between different population groups.

#### Patient History

A comprehensive record of an individual's past medical conditions, treatments, and health events.

**Example:** A patient history reveals previous heart surgery and ongoing treatment for high cholesterol.

#### Patient ID

A unique identifier assigned to distinguish one patient from all others in a healthcare system.

**Example:** Each patient receives a permanent patient ID at their first visit to ensure records are correctly matched.

#### Patient Journey

The complete sequence of healthcare interactions and experiences from initial symptoms through treatment and recovery.

**Example:** A cancer patient's journey includes diagnosis, surgery, chemotherapy, radiation, and survivorship care.

#### Patient Outcome

The health status or result achieved following medical treatment or intervention.

**Example:** A successful patient outcome after knee replacement surgery includes pain reduction and restored mobility.

#### Patient Portal

A secure online application that lets patients view portions of their health records and communicate electronically with their care providers.

**Example:** A patient logs into a patient portal to view recent lab results and message their physician about a medication side effect.

#### Patient Record

A comprehensive collection of medical information documenting an individual's healthcare encounters and history.

**Example:** A patient record contains diagnoses, medications, lab results, imaging studies, and provider notes from all visits.

#### Patient Resource

The FHIR resource type that captures a person's demographic and administrative information relevant to their care.

**Example:** A Patient resource storing a patient's name, date of birth, sex, and contact information.

#### Patient-Centered Medical Home

A primary care delivery model in which a single accountable practice team coordinates all aspects of a patient's ongoing care.

**Example:** A patient-centered medical home that tracks a patient's specialist visits, medications, and preventive screenings through one coordinating primary care team.

#### Patient-Reported Outcome

Health status information reported directly by the patient in their own words, without a clinician's interpretation.

**Example:** A patient-reported outcome survey asking a chemotherapy patient to rate their fatigue and nausea levels between clinic visits.

#### Payer Contract

A negotiated agreement between an insurance payer and a provider that establishes reimbursement rates and terms of participation.

**Example:** A payer contract specifying that an insurer will pay a hospital $8,000 for an uncomplicated knee replacement, regardless of the hospital's standard charge.

#### Payer Mix

The distribution of patients across different insurance types and payment sources for a healthcare provider.

**Example:** A hospital's payer mix is 40% commercial insurance, 35% Medicare, 15% Medicaid, and 10% uninsured.

#### Peer Review Process

A structured evaluation in which colleagues assess the quality, correctness, and rigor of a project or piece of work.

**Example:** A peer review process in which classmates critique each other's capstone graph schemas before final submission.

#### Penetration Testing

A simulated cyberattack conducted to identify exploitable weaknesses in a system's security defenses before real attackers can find them.

**Example:** A hired security firm performs penetration testing on a hospital's patient portal and discovers a way to bypass login authentication.

#### Per-Person Healthcare Cost

The average amount spent on healthcare services per individual in a population over a specified period.

**Example:** The per-person healthcare cost in the United States exceeds $12,000 annually, highest among developed nations.

#### Phantom Billing

Fraudulent submission of claims for services or supplies never actually provided to patients.

**Example:** A provider bills Medicare for office visits with patients who never came to the clinic.

#### Pharmacy Benefit Manager

An organization administering prescription drug plans and negotiating prices between payers and pharmacies.

**Example:** A pharmacy benefit manager processes prescription claims and determines patient copayment amounts at the pharmacy counter.

#### Physician Assistant

A licensed clinician who practices medicine under physician supervision, performing examinations, diagnoses, and treatment.

**Example:** A physician assistant in an orthopedic clinic evaluates a patient's sprained ankle and orders an X-ray under the supervising physician's protocol.

#### Pill Mill

A medical practice that prescribes controlled substances, especially opioids, in high volumes without legitimate medical justification.

**Example:** Investigators shut down a pill mill after discovering a single physician was writing hundreds of opioid prescriptions per week with minimal patient examination.

#### PlanDefinition Resource

The FHIR resource type that defines reusable, shareable logic for a clinical protocol, order set, or decision support rule.

**Example:** A PlanDefinition resource encoding the recommended sequence of actions for managing a patient presenting with sepsis symptoms.

#### Point Of Service Plan

A hybrid insurance plan that combines HMO-style primary care coordination with the option to seek out-of-network care at a higher cost.

**Example:** A point of service plan member gets referrals from their primary care physician for in-network specialists but can also self-refer out-of-network for a higher copay.

#### Population Health

The aggregate health outcomes and risk patterns of a defined group of people, analyzed collectively rather than one patient at a time.

**Example:** Comparing diabetes prevalence and control rates across all patients served by a regional health system to guide where to focus outreach programs.

#### Population Health Analytics

Analysis of health data across patient groups to identify trends, risks, and improvement opportunities.

**Example:** Population health analytics reveals that diabetic patients in one neighborhood have higher hospitalization rates than others.

#### Portfolio Development

The process of assembling completed projects and work samples to demonstrate a person's skills to potential employers.

**Example:** Portfolio development including a published capstone project, sample Cypher queries, and a short write-up of the fraud-detection prototype built during the course.

#### Post-Operative Care

The monitoring and treatment a patient receives immediately following a surgical procedure to support recovery and detect complications.

**Example:** Post-operative care after a hip replacement includes pain management, wound monitoring, and early mobility exercises.

#### Predictive Analytics

Statistical techniques using historical data to forecast future events or behaviors.

**Example:** Predictive analytics identifies patients at high risk for heart failure readmission within 30 days of discharge.

#### Preferred Provider Organization

An insurance plan offering a network of preferred providers at negotiated rates while still allowing members to see out-of-network providers at a higher cost.

**Example:** A preferred provider organization member pays a lower copay for an in-network cardiologist but can still see an out-of-network one for a higher fee.

#### Premium

The amount paid periodically to maintain active health insurance coverage.

**Example:** An employee pays a $300 monthly premium for family health insurance coverage.

#### Prescription

A written or electronic order from a licensed provider authorizing a patient to receive a specific medication.

**Example:** A physician writes a prescription for antibiotics to treat a patient's bacterial infection.

#### Preventive Care

Healthcare services focused on maintaining health and preventing disease rather than treating illness.

**Example:** Annual wellness visits, vaccinations, and cancer screenings are forms of preventive care.

#### Primary Care Provider

A physician serving as a patient's first point of contact and coordinator for overall healthcare needs.

**Example:** A family medicine physician serves as primary care provider, managing routine care and referring to specialists when needed.

#### Prior Authorization

A requirement that insurance approve specific services or medications before they are provided.

**Example:** An insurance company requires prior authorization before approving an expensive MRI scan to verify medical necessity.

#### Professional Networking

The deliberate cultivation of relationships with peers, mentors, and industry contacts to support career growth and opportunity.

**Example:** Attending a healthcare data conference and connecting with graph database practitioners as part of professional networking.

#### Profitability

The degree to which revenues exceed expenses, indicating financial viability of healthcare operations.

**Example:** A hospital achieves profitability when revenue from patient services exceeds the costs of delivering care.

#### Project Presentation

A formal communication where students demonstrate their capstone project results, methods, and conclusions.

**Example:** Students present their fraud detection graph application to faculty, explaining the algorithms used and findings discovered.

#### Project Risk Assessment

The identification and evaluation of factors that could negatively affect a project's timeline, budget, or outcomes.

**Example:** A project risk assessment flagging that access to real claims data may be delayed, threatening the capstone project's timeline.

#### Project Scoping

The process of defining a project's objectives, boundaries, deliverables, and constraints before work begins.

**Example:** Project scoping for a capstone establishes that the fraud-detection prototype will cover only durable medical equipment claims, not the full range of fraud types.

#### Prompt Engineering

The practice of designing input text to guide a language model toward producing a desired, accurate, and well-structured output.

**Example:** Rewriting a prompt to explicitly ask an LLM to cite the FHIR resource it used for each clinical claim it makes.

#### Proof Of Concept

A small-scale demonstration built to verify that a proposed idea or technical approach is feasible.

**Example:** A proof of concept showing that a graph algorithm can successfully identify a known historical fraud ring within a sample dataset.

#### Property Graph Model

A graph data model in which both nodes and relationships can carry labeled attributes, called properties, in addition to their type and connections.

**Example:** A Patient node with properties for date of birth and gender, connected by a PRESCRIBED relationship that itself has a dosage property.

#### Protected Health Information

Any individually identifiable health data protected under HIPAA privacy regulations.

**Example:** Protected health information includes patient names, medical record numbers, diagnoses, and treatment details.

#### Prototype Development

The creation of an early, functional version of a system used to test ideas and gather feedback before full-scale implementation.

**Example:** Prototype development of a small graph database containing sample patient data to demonstrate a proposed fraud-detection query.

#### Provider Attrition

The rate at which providers leave an organization or network over a given period of time.

**Example:** A hospital system tracks rising provider attrition among primary care physicians to identify and address underlying causes such as burnout.

#### Provider Capacity

The maximum number of patients or services a healthcare provider can handle in a given timeframe.

**Example:** A clinic's provider capacity is 25 patient appointments per day per physician.

#### Provider Compensation

The payment methods and amounts used to reimburse healthcare providers for services delivered.

**Example:** Provider compensation models include salary, fee-for-service, or value-based payment arrangements.

#### Provider Credential

Official documentation verifying a healthcare professional's qualifications, training, and authorization to practice.

**Example:** A hospital credentials committee reviews provider credentials including medical degrees, licenses, and board certifications.

#### Provider Directory

A maintained listing of providers, including their specialties, locations, and network participation, used to support referrals and patient search.

**Example:** A payer's online provider directory lets members search for in-network cardiologists near their home.

#### Provider Network

A group of healthcare providers and facilities contracted with an insurance plan to deliver care.

**Example:** An insurance company's provider network includes 500 physicians and 50 hospitals in the metropolitan area.

#### Provider Network Fraud

Organized schemes where multiple providers collude to submit fraudulent claims or inappropriate referrals.

**Example:** Provider network fraud occurs when a group of clinics share patient information to bill for services never rendered.

#### Provider Onboarding

The administrative process of enrolling a new provider into an organization's systems, credentials, and network contracts.

**Example:** Provider onboarding for a newly hired physician includes setting up EHR access, payer enrollment, and malpractice insurance verification.

#### Provider Performance

Measures evaluating the quality, efficiency, and outcomes of care delivered by healthcare providers.

**Example:** Provider performance metrics include patient satisfaction scores, complication rates, and adherence to clinical guidelines.

#### Provider Rating

Numerical or qualitative scores assessing healthcare provider quality based on patient outcomes and satisfaction.

**Example:** Online provider ratings allow patients to view physician reviews and quality measures when choosing care.

#### Provider Schedule

The calendar of time slots when a healthcare provider is available to see patients.

**Example:** A provider schedule shows a physician has appointment slots available Tuesday and Thursday mornings.

#### Provider Specialization

A healthcare provider's focus on a specific area of medicine requiring advanced training.

**Example:** Provider specialization allows patients with heart conditions to see cardiologists with expertise in cardiovascular care.

#### Quality Metric

A quantitative measure used to assess healthcare process quality, outcomes, or patient experience.

**Example:** Hospital readmission rates within 30 days serve as a quality metric for discharge planning effectiveness.

#### Quality of Life Metric

Measures assessing patient well-being, function, and satisfaction beyond clinical disease measures.

**Example:** Cancer treatment quality of life metrics include pain levels, ability to work, and emotional well-being.

#### Quality Reporting Architecture

The overall technical framework connecting clinical data sources, quality measure logic, and reporting systems used to calculate and submit quality results.

**Example:** A hospital's quality reporting architecture pulls data from its EHR, evaluates it against eCQM logic, and formats the results for submission to a federal reporting program.

#### Query Execution Plan

The sequence of internal operations a database engine selects to retrieve the results of a given query.

**Example:** An execution plan showing that a query first filters Provider nodes by specialty before traversing to their connected patients.

#### Query Performance

The speed and efficiency with which a database executes queries and returns results.

**Example:** Query performance improves dramatically when using graph databases for relationship-heavy queries compared to relational databases.

#### Query Profiling

The practice of measuring a query's actual execution plan and runtime performance to identify inefficiencies.

**Example:** Profiling a slow fraud-detection query reveals that it is scanning far more nodes than necessary before applying a filter.

#### Radiology Report

A clinician's written interpretation of the findings observed in a diagnostic imaging study.

**Example:** A radiology report describing a chest X-ray as showing no evidence of pneumonia but noting mild cardiac enlargement.

#### RAG Architecture

Retrieval-Augmented Generation, combining document retrieval with language models to generate informed responses.

**Example:** A RAG architecture retrieves relevant medical literature and uses an LLM to answer clinician questions with cited sources.

#### Random Walk

A graph traversal technique that moves from node to node by randomly selecting one of the available outgoing edges at each step.

**Example:** Performing repeated random walks starting from a patient node to sample the kinds of providers and conditions typically reachable from that patient.

#### RDF Triple Store

A graph database that stores data as subject-predicate-object statements, called triples, following the World Wide Web Consortium's Resource Description Framework.

**Example:** The triple "PatientA - hasCondition - Diabetes" stored and queried alongside millions of similar statements in an RDF triple store.

#### Readmission Risk

A calculated likelihood that a recently discharged patient will require unplanned hospital care within a defined period, such as 30 days.

**Example:** A model flags a heart failure patient as high readmission risk due to a history of missed follow-up appointments and medication non-adherence.

#### Real-World Implementation

Practical deployment of healthcare graph solutions in operational clinical or administrative settings.

**Example:** A hospital implements a graph-based clinical decision support system that providers use during patient encounters.

#### Recommendation System

An algorithm suggesting relevant items, services, or actions based on user characteristics and patterns.

**Example:** A recommendation system suggests appropriate clinical guidelines based on patient diagnosis and characteristics.

#### Recovery Audit Contractor

A Medicare-authorized entity that reviews previously paid claims to identify and recoup improper payments.

**Example:** A recovery audit contractor identifies an overpayment after finding a hospital billed for a higher level of care than the documentation supported.

#### Reference Data Management

The governance and maintenance of standardized code lists and lookup values, such as state abbreviations or diagnosis codes, shared consistently across systems.

**Example:** Reference data management ensures every system in a health system uses the identical, current version of the ICD-10-CM code list.

#### Referral

The process of directing a patient to another healthcare provider for specialized evaluation or treatment.

**Example:** A primary care provider sends a referral to a cardiologist when a patient has concerning heart symptoms.

#### Referral Inference

The derivation of an implied referral relationship between two providers from indirect evidence, such as shared patient encounters, when no explicit referral record exists.

Referral inference matters in graph fraud analytics because many real-world referral relationships are never explicitly documented, so analysts must reconstruct them from patterns in the data.

**Example:** Inferring a referral relationship between a primary care physician and a cardiologist because dozens of the same patients saw both providers within a short window.

#### Referral Network Analysis

Examination of patterns in how providers refer patients to identify relationships and potential anomalies.

**Example:** Referral network analysis reveals that a physician always refers patients to a specific imaging center, suggesting a potential kickback arrangement.

#### Regulatory Compliance Reporting

The preparation and submission of data and documentation required to demonstrate an organization's adherence to legal or regulatory requirements.

**Example:** A hospital's regulatory compliance reporting package submitted annually to demonstrate its quality measure results meet federal reporting requirements.

#### Rehabilitation Plan

A structured program of therapies designed to restore a patient's physical, cognitive, or functional abilities after illness, injury, or surgery.

**Example:** A rehabilitation plan following a stroke that includes physical therapy, speech therapy, and occupational therapy sessions three times a week.

#### Reimbursement

Payment made by insurance or patients to healthcare providers for services rendered.

**Example:** A hospital receives reimbursement from Medicare for treating an elderly patient's pneumonia.

#### Relational Database

A database organizing data into tables with rows and columns linked through defined relationships.

**Example:** A relational database stores patient information in one table and appointments in another, connected by patient ID.

#### Remote Patient Monitoring

The use of connected devices to collect and transmit a patient's health data from outside a traditional clinical setting.

**Example:** A remote patient monitoring program that transmits a heart failure patient's daily weight and blood pressure readings to their care team.

#### Retrieval-Augmented Generation

An AI technique that supplements a language model's response by first retrieving relevant information from an external knowledge source and including it in the prompt.

Retrieval-augmented generation is the underlying technique that a RAG architecture implements as a full system, and it is specifically valued in healthcare for reducing hallucinated or outdated clinical claims.

**Example:** A clinical assistant retrieves the most recent guideline text on hypertension treatment before generating an answer to a physician's question.

#### Return On Investment

A financial metric expressing the ratio of the net benefit gained from an investment to its cost.

**Example:** A hospital calculates the return on investment of a new fraud-detection graph platform by comparing recovered claim dollars to the system's implementation cost.

#### Revenue

Income generated by a healthcare organization from delivering services and receiving payments.

**Example:** A hospital's annual revenue totals $500 million from patient care, government programs, and commercial insurance.

#### Revenue Cycle

The complete process from patient registration through billing, payment collection, and revenue realization.

**Example:** The revenue cycle includes scheduling, insurance verification, charge capture, claims submission, and payment posting.

#### Risk Adjustment

Modifying payment amounts based on patient health status and complexity to account for care difficulty.

**Example:** Risk adjustment increases Medicare payments for treating patients with multiple chronic conditions.

#### Risk Stratification

Categorizing patients into groups based on their likelihood of adverse health outcomes or high costs.

**Example:** Risk stratification identifies high-risk diabetes patients needing intensive case management to prevent complications.

#### Role-Based Access Control

A security approach granting system permissions based on user job functions rather than individual identities.

**Example:** Role-based access control allows all nurses to view patient records but restricts billing system access to finance staff.

#### RxNorm

A standardized naming system that provides normalized names and unique identifiers for clinical drugs, linking together equivalent products sold under different names.

**Example:** RxNorm links a generic drug's ingredient, strength, and form to the many different brand and NDC codes that represent the same clinical drug.

#### Sanctioned Provider List

A maintained registry of providers barred from participating in government healthcare programs due to fraud, abuse, or other misconduct.

**Example:** A payer checks a new provider's name against the sanctioned provider list before approving their enrollment application.

#### Scalability

A system's capacity to handle increasing data volume or workload without a proportional loss of performance.

**Example:** A graph database that continues to answer patient-lookup queries in milliseconds even as the number of stored encounters grows into the billions.

#### Schema Evolution

The process of modifying a database's structure over time while preserving compatibility with existing data and applications.

**Example:** Schema evolution adding a new optional property to the Patient node label without breaking existing queries that do not reference it.

#### Schema-On-Read

A data design approach in which the structure of stored data is interpreted only when it is queried, rather than being fixed in advance.

**Example:** A data lake storing raw HL7 messages as text, where an analytics tool applies structure only at the moment it parses the messages for a report.

#### Schema-On-Write

A data design approach that requires a defined structure to be validated before data can be stored.

**Example:** A relational database that rejects an insert into the Patient table if the required date-of-birth column is missing.

#### Secure API Gateway

A managed entry point that enforces authentication, authorization, and traffic controls for requests made to backend application programming interfaces.

**Example:** A secure API gateway that requires every request to a hospital's FHIR API to present a valid access token before forwarding it to the server.

#### Security Incident Response

The organized process an organization follows to detect, contain, and remediate a security breach or attack.

**Example:** A hospital's security incident response team isolates an infected server and restores it from backup after detecting ransomware activity.

#### Security Risk Assessment

A systematic evaluation of an organization's systems to identify vulnerabilities and threats to the confidentiality, integrity, and availability of its data.

**Example:** A security risk assessment identifies that an outdated server storing patient records lacks current security patches.

#### Semantic Search

Information retrieval using meaning and context rather than exact keyword matching.

**Example:** Semantic search finds relevant medical research when a clinician asks "treatments for resistant hypertension" using natural language.

#### Semi-Structured Level

The FHIR knowledge representation level at which clinical knowledge is organized into flowcharts, decision tables, personas, or user stories authored by clinical experts.

**Example:** Converting a narrative hypertension guideline into a decision table listing blood pressure ranges alongside recommended actions.

#### Sentiment Analysis

A natural language processing technique that determines the emotional tone expressed in a piece of text.

**Example:** Sentiment analysis applied to patient satisfaction survey comments to flag responses expressing frustration with wait times.

#### Shared Savings Program

A value-based payment arrangement in which providers receive a portion of the cost savings they achieve relative to a spending benchmark.

**Example:** An accountable care organization earns a bonus through a shared savings program after keeping its patients' total costs below the target benchmark.

#### Shell Company Detection

The identification of entities that have no genuine business operations and exist solely to route or launder fraudulent payments.

**Example:** Shell company detection flags a durable medical equipment supplier with no verifiable inventory, staff, or physical storefront despite high billing volume.

#### Shift Scheduling

The assignment of specific staff members to defined work periods to ensure adequate clinical coverage.

**Example:** A hospital's shift scheduling system assigns nurses to overlapping day and night shifts to maintain continuous unit coverage.

#### Shortest Path Algorithm

A graph algorithm finding the minimum number of edges or lowest-weight path between two nodes.

**Example:** The shortest path algorithm finds the quickest referral chain from a patient's primary physician to a specialized treatment center.

#### Similarity Measure

A quantitative method for assessing how alike two nodes or subgraphs are based on defined criteria.

**Example:** Computing similarity measures identifies patients with comparable medical histories for cohort analysis.

#### Single Sign-On

An authentication capability that lets a user log in once and gain access to multiple connected applications without re-entering credentials.

**Example:** A physician logs into a hospital's single sign-on portal once and gains access to the EHR, scheduling system, and lab portal without logging in again.

#### SNOMED CT

A comprehensive clinical terminology that provides standardized codes for diseases, findings, procedures, and other clinical concepts used across electronic health records.

**Example:** A Condition resource recording "essential hypertension" uses a SNOMED CT code so the diagnosis can be understood consistently across different systems.

#### Social Determinants Of Health

Non-clinical factors, such as housing stability, income, and education, that influence a patient's health outcomes outside of direct medical care.

**Example:** A graph linking a patient node to a Housing Instability node helps explain why a patient repeatedly misses follow-up appointments.

#### Specialist Provider

A physician with advanced training focused on treating specific diseases, organ systems, or patient populations.

**Example:** An oncologist is a specialist provider treating patients with cancer.

#### Staffing Model

A plan defining the number, mix, and scheduling of clinical personnel needed to meet expected patient demand.

**Example:** An emergency department's staffing model calls for two additional nurses on weekend evening shifts based on historical patient volume.

#### Stakeholder Requirements

The documented needs and expectations of the people or groups affected by or invested in a project's outcome.

**Example:** Gathering stakeholder requirements from clinicians and billing staff before designing a new graph-based care coordination tool.

#### Strongly Connected Component

A subgraph of a directed graph in which every node can reach every other node by following relationships in their stated direction.

**Example:** A group of providers who each refer patients to one another in a closed loop, forming a strongly connected component that may warrant fraud review.

#### Structured Level

The FHIR knowledge representation level at which clinical knowledge is expressed in coded, computer-interpretable formats using standard terminologies.

**Example:** Encoding a guideline's blood pressure thresholds using LOINC and SNOMED CT codes so a computer system can evaluate them against patient data.

#### Subgraph Query

A graph query extracting a subset of nodes and edges matching specified patterns or conditions.

**Example:** A subgraph query extracts all nodes and relationships for patients treated in the cardiology department during 2024.

#### Subrogation

A payer's legal right to recover claim costs it already paid from a third party who was responsible for causing the patient's injury.

**Example:** An insurer pursues subrogation against an at-fault driver's insurance company after paying for a policyholder's car-accident-related medical claims.

#### Substance Use Disorder

A clinical condition involving impaired control over the use of alcohol or drugs despite resulting harm.

**Example:** A patient diagnosed with opioid use disorder is referred to a specialized treatment program as part of their care plan.

#### Supervised Learning

A machine learning approach that trains a model on examples paired with known correct labels so it can predict outcomes for new, unlabeled data.

**Example:** Training a model on past claims labeled as "fraudulent" or "legitimate" so it can predict the likely status of new claims.

#### Surgical Procedure

An operative intervention performed on a patient to diagnose, treat, or correct a physical condition.

**Example:** An appendectomy is a surgical procedure performed to remove an inflamed appendix.

#### Suspicious Activity Report

A formal filing documenting transactions or behaviors that indicate possible fraud, required under certain financial regulations.

**Example:** A payer's compliance team files a suspicious activity report after noticing a pattern of unusually large payments routed to a single bank account.

#### Symptom

A physical or mental feature perceived by the patient indicating disease or abnormal condition.

**Example:** Chest pain, shortness of breath, and fatigue are symptoms that may indicate heart disease.

#### Technical Demonstration

A presentation showing a working system or feature to stakeholders to illustrate its capabilities.

**Example:** A student's technical demonstration walking a class through a live query that finds all patients sharing a provider and an address.

#### Telehealth Visit

A clinical encounter conducted remotely through audio or video communication technology rather than an in-person appointment.

**Example:** A patient with a minor skin rash completes a telehealth visit with a dermatologist over a video call instead of traveling to the clinic.

#### Temporal Graph Analysis

The study of how a graph's nodes, relationships, and structure change over time.

**Example:** Analyzing how a patient's condition-and-medication graph evolves month over month to detect a worsening chronic disease trajectory.

#### Terminology Binding

The association of a coded data element in a FHIR resource or CQL expression with a specific value set or code system.

**Example:** A terminology binding specifying that the "condition code" field on a Condition resource must draw its value from a defined diabetes-related ValueSet.

#### Text Classification

A machine learning task that assigns one or more predefined categories to a piece of text.

**Example:** Text classification sorting incoming patient portal messages into categories such as "medication question," "billing," or "urgent."

#### Tiers Of Functionality

A three-part classification, consisting of the Data, Logic, and Forms/UI tiers, used alongside knowledge representation levels to describe what a clinical knowledge artifact addresses.

**Example:** Reviewing a new order set and describing its content across all three Tiers of Functionality: the data elements it references, the rules governing it, and its on-screen layout.

#### Time Series Forecasting

A statistical or machine learning technique that predicts future values based on previously observed data points collected over time.

**Example:** Time series forecasting used to predict next month's emergency department visit volume based on the past two years of daily admission counts.

#### Token Efficiency

The degree to which an AI system produces accurate, useful results while minimizing the number of tokens it processes or generates.

**Example:** Retrieving only the ten most relevant graph nodes instead of a patient's entire history improves the token efficiency of a prompt sent to a language model.

#### Tokenization

The replacement of a sensitive data value with a non-sensitive placeholder token that can be mapped back to the original value only through a secure lookup.

**Example:** Replacing a patient's Social Security number with a randomly generated token everywhere it appears in a claims processing system.

#### Tool-Using Agent

An AI agent capable of invoking external functions, APIs, or systems to gather information or take action beyond generating text alone.

**Example:** A tool-using agent that calls a FHIR API to look up a patient's active medications before answering a clinician's question.

#### Total Cost Of Ownership

The full cost of acquiring, operating, and maintaining a system or asset across its entire useful lifecycle.

**Example:** Comparing the total cost of ownership of an on-premises graph database against a cloud-hosted alternative, including licensing, hardware, and staff time.

#### Training Dataset

The collection of labeled or unlabeled examples used to teach a machine learning model to perform a task.

**Example:** A training dataset of ten thousand historical claims, each labeled as approved or denied, used to build a claims-adjudication model.

#### Transparency

The degree to which system operations, decisions, and data are visible and understandable to stakeholders.

**Example:** Transparency in healthcare pricing allows patients to understand costs before receiving services.

#### Treatment Plan

A structured approach outlining specific interventions, medications, and procedures for managing a patient's condition.

**Example:** A treatment plan for pneumonia includes antibiotics, rest, fluids, and a follow-up appointment in one week.

#### Treatment Timeline

A chronological representation showing the sequence and timing of medical interventions for a patient.

**Example:** A treatment timeline displays when a cancer patient received surgery, chemotherapy cycles, and radiation therapy.

#### Triangle Count

A graph metric that counts the number of sets of three mutually connected nodes present in a graph.

**Example:** A sudden rise in triangle count among a set of providers may indicate an emerging referral ring worth investigating.

#### Unbundling

A fraudulent billing practice of separating procedure components to charge more than the bundled service rate.

**Example:** Unbundling occurs when a provider bills separately for steps of a surgical procedure that should be billed together.

#### Undirected Graph

A graph in which edges have no direction, so a connection between two nodes is symmetric and can be traversed either way.

**Example:** A graph modeling shared-household relationships between patients, where an edge simply means two people live together with no implied direction.

#### Uniqueness Constraint

A database rule ensuring that no two records share the same value for a designated property.

**Example:** A uniqueness constraint on a Provider node's national provider identifier prevents two provider records from being created with the same ID.

#### Unsupervised Learning

A machine learning approach that finds patterns, groupings, or structure in data without relying on predefined labels.

**Example:** Using unsupervised learning to discover previously unknown clusters of patients with similar combinations of chronic conditions.

#### Upcoding

A fraudulent practice of billing for more expensive services than actually provided.

**Example:** Upcoding happens when a physician bills for an extensive office visit when only a brief consultation occurred.

#### Utilization Review

Evaluation of healthcare services to determine if they are medically necessary and appropriate.

**Example:** Utilization review may identify that a patient's extended hospital stay is no longer medically necessary for acute care.

#### Vaccination Schedule

A recommended sequence and timing of immunizations for a patient based on age, health status, and risk factors.

**Example:** A pediatric vaccination schedule specifying that a child should receive a second dose of the MMR vaccine between ages four and six.

#### Value-Based Care

A healthcare payment model rewarding providers for patient health outcomes rather than service volume.

**Example:** Value-based care contracts pay bonuses to providers who achieve target rates for diabetes control and preventive screenings.

#### Value-Based Payment

Reimbursement systems linking provider compensation to quality metrics and patient outcomes rather than service quantity.

**Example:** A value-based payment arrangement rewards a clinic for reducing emergency department visits among their diabetic patients.

#### ValueSet Resource

The FHIR resource type that defines a specific, constrained list of codes drawn from one or more code systems for use in a particular context.

**Example:** A ValueSet resource containing only the SNOMED CT codes relevant to diabetes diagnoses, for use in a diabetes registry query.

#### Vector Embedding

A mathematical representation of data as dense numerical vectors capturing semantic meaning and relationships.

**Example:** Vector embeddings convert patient diagnoses into numbers that position similar conditions near each other in multi-dimensional space.

#### Vector Store

A specialized database optimized for storing and searching high-dimensional vector representations of data.

**Example:** A vector store enables fast similarity searches to find patients with medical histories similar to a new patient.

#### Vertical Scaling

Increasing a system's capacity by adding more processing power, memory, or storage to a single existing machine.

**Example:** Upgrading a graph database server's memory from 64GB to 256GB to handle larger in-memory graph algorithms.

#### Vital Sign

A measurable indicator of basic body functions used to assess health status.

**Example:** Blood pressure, heart rate, temperature, and respiratory rate are vital signs measured at each clinical visit.

#### Vulnerability Management

The ongoing process of identifying, evaluating, and remediating security weaknesses in an organization's systems and software.

**Example:** A vulnerability management program that scans all servers monthly and prioritizes patching the most severe identified weaknesses first.

#### Waste In Healthcare

Unnecessary healthcare spending that does not improve patient outcomes, including overtreatment and inefficiency.

**Example:** Ordering duplicate lab tests that were already completed recently represents waste in healthcare.

#### Weakly Connected Component

A subgraph of a directed graph in which every node can reach every other node once the direction of relationships is ignored.

**Example:** A patient and a distant relative connected only through a chain of one-directional REFERRED_BY edges still belong to the same weakly connected component.

#### Wearable Device Data

Health metrics, such as heart rate, step count, or sleep patterns, continuously captured by a sensor worn by a patient.

**Example:** Wearable device data showing an irregular heart rhythm pattern that prompts a patient to schedule a cardiology visit.

#### Weighted Graph

A graph in which each edge carries a numeric value representing cost, strength, distance, or similar magnitude.

**Example:** A referral graph where each edge weight is the number of shared patients between two providers, so heavier edges indicate stronger referral relationships.

#### Write-Off

The portion of a billed charge that an organization removes from its accounts because it will not be collected.

**Example:** A hospital writes off the remaining balance of a bill after determining a patient qualifies for financial hardship assistance.

#### Zero Trust Architecture

A security model that requires continuous verification of every user and device attempting access, granting no implicit trust based on network location alone.

**Example:** A zero trust architecture that requires a clinician's laptop to re-verify its identity and security posture even when connecting from inside the hospital's own network.

