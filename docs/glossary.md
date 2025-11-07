# Glossary of Terms

This glossary contains definitions for 200 concepts in the course "Modeling Healthcare Data with Graphs". All definitions follow ISO 11179 metadata registry standards: precise, concise, distinct, non-circular, and free of business rules.

#### Abuse Detection

The identification of healthcare practices that deviate from accepted medical standards but may not involve intentional fraud.

**Example:** Detecting a provider who consistently orders unnecessary tests that increase costs without improving patient outcomes.

#### Access Control

A security mechanism that restricts who can view or modify specific data resources based on defined policies.

**Example:** A hospital system that allows doctors to view patient records but restricts access to billing staff.

#### Adverse Event

An unintended harm or injury caused by medical treatment rather than the underlying disease.

**Example:** A patient develops an allergic reaction after receiving a new medication prescribed by their doctor.

#### Aggregate Query

A graph database query that computes summary statistics across multiple nodes or edges.

**Example:** Calculating the average number of prescriptions per patient across all cardiology visits in 2024.

#### Allergy

A documented immune system reaction to a specific substance such as food, medication, or environmental trigger.

**Example:** A patient record showing a severe allergy to penicillin antibiotics.

#### Allowed Amount

The maximum fee an insurance payer approves for a specific healthcare service or procedure.

**Example:** An insurance policy that sets the allowed amount for a routine office visit at $150, regardless of the provider's actual charge.

#### Anomaly Detection

A computational method that identifies data patterns significantly different from expected norms.

**Example:** Using graph algorithms to find a provider billing for 30 patient visits per day, far exceeding typical practice patterns.

#### Appointment

A scheduled time slot for a patient to receive care from a healthcare provider at a specific location.

**Example:** A patient books a 30-minute appointment with their primary care physician for an annual physical examination.

#### Artificial Intelligence

Computational systems that perform tasks typically requiring human intelligence, such as pattern recognition and decision-making.

**Example:** An AI system that analyzes chest X-rays to identify potential pneumonia cases for radiologist review.

#### Audit Trail

A chronological record of system activities that documents who accessed or modified data and when.

**Example:** A log showing all users who viewed a patient's protected health information during the past month.

#### Authentication

The process of verifying the identity of a user, device, or system before granting access.

**Example:** A clinician entering their username and password plus a security code to access the electronic health record system.

#### Authorization

The process of determining what resources and actions an authenticated user is permitted to access.

**Example:** After login, the system grants a nurse authorization to view patient records but not to modify billing information.

#### Benefit Plan

A structured set of healthcare services and coverage levels provided to insurance members.

**Example:** An employer-sponsored health insurance plan covering preventive care, hospital stays, and prescription medications with specified copayments.

#### Betweenness Centrality

A graph metric measuring how often a node appears on the shortest paths between other nodes in the network.

**Example:** Calculating betweenness centrality to identify a primary care provider who serves as a key referral hub connecting patients to specialists.

#### Billing Code

A standardized identifier used to represent a specific healthcare service or procedure for payment purposes.

**Example:** A medical office uses billing code 99213 to charge for a standard office visit with an established patient.

#### Board Certification

Official recognition that a physician has completed specialty training and passed examinations in a medical discipline.

**Example:** A physician holds board certification in cardiology from the American Board of Internal Medicine.

#### Capitation

A payment model where providers receive a fixed amount per patient regardless of services delivered.

**Example:** A clinic receives $50 per member per month for all primary care services, incentivizing preventive care and cost management.

#### Capstone Project

A comprehensive final project where students apply course concepts to solve a real-world healthcare graph modeling challenge.

**Example:** A student designs a fraud detection system using graph analytics to identify suspicious provider billing patterns across multiple insurance claims.

#### Care Plan

A coordinated set of interventions and goals designed to manage a patient's health conditions.

**Example:** A diabetes care plan including monthly blood sugar monitoring, dietary counseling, and medication management.

#### Care Team

A group of healthcare professionals collaborating to deliver coordinated patient care.

**Example:** A care team consisting of an oncologist, radiation therapist, nutritionist, and social worker treating a cancer patient.

#### Centrality Measure

A graph metric quantifying the importance or influence of a node within the network structure.

**Example:** Computing centrality measures to identify which hospitals serve as major referral centers in a regional healthcare network.

#### Charge Master

A comprehensive price list containing all services, procedures, and supplies a healthcare facility can bill.

**Example:** A hospital's charge master lists prices for thousands of items from aspirin tablets to organ transplant procedures.

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

#### Clinic

An outpatient healthcare facility where patients receive non-emergency medical services.

**Example:** A family medicine clinic providing routine checkups, vaccinations, and treatment for minor illnesses.

#### Clinical Decision Support

Technology systems that provide healthcare providers with knowledge and guidance during patient care.

**Example:** An electronic health record system alerts a physician that a prescribed medication may interact with the patient's existing drugs.

#### Clinical Discovery

The process of identifying new medical insights or patterns through analysis of patient data.

**Example:** Using graph analytics on millions of patient records to discover that a common medication reduces risk of an unrelated disease.

#### Clinical Guideline

Evidence-based recommendations for appropriate healthcare interventions under specific clinical circumstances.

**Example:** Guidelines recommending annual mammograms for women over 40 to screen for breast cancer.

#### Clinical Protocol

A detailed procedure defining the steps healthcare providers follow when treating a specific condition.

**Example:** A hospital's stroke protocol specifying the diagnostic tests and treatments to administer within the first 60 minutes of patient arrival.

#### Clinical Workflow

The sequence of activities healthcare professionals perform to deliver patient care services.

**Example:** The emergency department workflow from patient triage through examination, treatment, and discharge or admission.

#### Clustering Coefficient

A graph metric measuring the degree to which nodes tend to cluster together in tightly connected groups.

**Example:** Calculating clustering coefficients to identify groups of providers who frequently refer patients to one another.

#### Community Detection

A graph algorithm that identifies densely connected groups of nodes with sparse connections between groups.

**Example:** Detecting communities in a provider network to identify potential fraud rings where providers collude to submit false claims.

#### Connected Components

Subgraphs where every node can reach every other node through some path, with no connections to other components.

**Example:** Finding connected components in a disease transmission network to identify isolated outbreak clusters.

#### Contract Negotiation

The process of establishing payment rates and terms between healthcare providers and insurance payers.

**Example:** A hospital negotiates with an insurance company to set reimbursement rates for surgical procedures.

#### Copayment

A fixed amount an insured person pays for a covered healthcare service at the time of care.

**Example:** A patient pays a $30 copayment at each doctor's office visit, with insurance covering the remaining cost.

#### Cost Of Care

The total financial resources required to deliver specific healthcare services to a patient.

**Example:** The cost of care for a knee replacement surgery includes surgeon fees, hospital facility charges, anesthesia, and rehabilitation.

#### Coverage

The specific healthcare services and conditions included in an insurance policy's benefits.

**Example:** An insurance policy provides coverage for hospitalizations and surgeries but excludes cosmetic procedures.

#### CPT Code

Current Procedural Terminology codes that identify medical procedures and services for billing purposes.

**Example:** CPT code 90791 represents an initial psychiatric diagnostic evaluation.

#### Cycle Detection

A graph algorithm that identifies circular paths where a sequence of edges returns to the starting node.

**Example:** Detecting referral cycles where providers refer patients to each other in a circular pattern, potentially indicating fraud.

#### Cypher Query Language

A declarative query language designed for querying and updating graph databases, developed for Neo4j.

**Example:** A Cypher query finds all patients diagnosed with diabetes who visited a cardiologist: `MATCH (p:Patient)-[:HAS_DIAGNOSIS]->(d:Disease {name: 'Diabetes'})-[:VISITED]->(doc:Provider {specialty: 'Cardiology'}) RETURN p, doc`.

#### Data Governance Framework

A structured system of policies, procedures, and responsibilities for managing organizational data assets.

**Example:** A healthcare system's data governance framework defining who can access patient data, retention policies, and quality standards.

#### Data Lineage

A documented history tracing data's origin, movements, transformations, and usage throughout its lifecycle.

**Example:** Tracking a patient's lab result from the testing device through the lab information system to the electronic health record.

#### Data Model

An abstract representation defining how data elements relate to each other and to real-world entities.

**Example:** A data model representing patients, providers, and encounters with their properties and relationships.

#### Data Privacy

Practices and policies protecting sensitive information from unauthorized access or disclosure.

**Example:** Hospital policies restricting employee access to patient records based on their job responsibilities.

#### Data Provenance

Information documenting the sources and processes that produced a specific data element.

**Example:** Recording that a blood pressure reading originated from a specific monitoring device at a particular date and time.

#### Data Quality

The degree to which data is accurate, complete, consistent, timely, and fit for its intended purpose.

**Example:** Measuring data quality by checking what percentage of patient records have complete demographic information and valid diagnosis codes.

#### Data Security

Technical and administrative measures protecting data from unauthorized access, modification, or destruction.

**Example:** Encrypting patient records in transit and at rest to prevent unauthorized access if systems are compromised.

#### Data Stewardship

The responsibility for ensuring data assets are properly managed, maintained, and protected.

**Example:** A chief data officer serving as data steward, overseeing data quality initiatives and governance policies.

#### Data Traceability

The ability to track data through its entire lifecycle from creation to deletion.

**Example:** Tracing a medication order from physician entry through pharmacy fulfillment to administration and documentation.

#### Database Schema

A formal structure defining how data is organized in a database, including tables, fields, and relationships.

**Example:** A relational database schema with tables for patients, appointments, and providers connected by foreign keys.

#### De-Identification

The process of removing or obscuring personally identifiable information from datasets.

**Example:** Removing patient names, addresses, and dates of birth from medical records before using them for research.

#### Deductible

The amount an insured person must pay for covered healthcare services before insurance begins paying.

**Example:** A patient with a $2,000 annual deductible pays full cost for services until reaching that amount, after which insurance coverage begins.

#### Degree Centrality

A graph metric counting the number of edges connected to a node.

**Example:** Calculating degree centrality to identify patients who have visited the most different healthcare providers.

#### Diagnosis

A healthcare provider's determination of a patient's disease or condition based on symptoms and tests.

**Example:** A physician makes a diagnosis of hypertension after measuring consistently elevated blood pressure over multiple visits.

#### Directed Acyclic Graph

A graph containing directed edges with no cycles, meaning you cannot follow edges to return to a starting node.

**Example:** A treatment pathway graph showing sequential steps in cancer therapy where each step leads only forward to the next stage.

#### Directed Graph

A graph where edges have a direction, flowing from a source node to a target node.

**Example:** A directed graph representing patient referrals where edges point from referring providers to receiving specialists.

#### Disease

A pathological condition affecting an organism's structure or function, impairing normal health.

**Example:** Type 2 diabetes mellitus is a chronic disease affecting how the body processes blood sugar.

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

#### Duplicate Claim

Multiple insurance claims submitted for the same service provided to the same patient.

**Example:** A medical office accidentally submits the same procedure claim twice for one patient visit, triggering fraud detection.

#### Edge

A connection between two nodes in a graph representing a relationship.

**Example:** An edge connecting a patient node to a provider node represents a treatment relationship.

#### Edge Property

An attribute or characteristic associated with a relationship between two nodes in a graph.

**Example:** A PRESCRIBED_BY edge between a patient and physician might have properties for medication name, date, and dosage.

#### Electronic Health Record

A digital version of a patient's medical history maintained by healthcare providers over time.

**Example:** A hospital's electronic health record system contains all patient visits, diagnoses, medications, lab results, and imaging studies.

#### Emergency Department

A hospital unit providing immediate medical care for acute illnesses and injuries without requiring an appointment.

**Example:** A patient with chest pain goes to the emergency department for immediate evaluation and treatment.

#### Evidence-Based Medicine

Medical practice integrating clinical expertise with the best available research evidence.

**Example:** A physician prescribes antibiotics for pneumonia based on clinical trials demonstrating efficacy for that infection.

#### Explainability

The ability to understand and articulate why a system or algorithm produced a specific result.

**Example:** A clinical decision support system explains why it recommended a particular treatment by citing the patient factors and research evidence it considered.

#### Fee-For-Service Model

A healthcare payment system where providers receive separate payment for each service delivered.

**Example:** A physician bills separately for an office visit, blood test, and X-ray performed during one patient encounter.

#### Formulary

A list of prescription medications approved for use and covered by a health insurance plan.

**Example:** An insurance company's formulary includes generic medications at low cost but requires prior authorization for expensive brand-name drugs.

#### Formulary Rule

A policy governing which medications are covered by insurance and under what conditions.

**Example:** A formulary rule requires patients to try a generic medication before approving coverage for a more expensive brand-name alternative.

#### Fraud Detection

The process of identifying intentional deception in healthcare billing or service delivery.

**Example:** Using graph analytics to detect a provider billing for services to deceased patients.

#### GQL Standard

Graph Query Language, an ISO standard for querying graph databases similar to SQL for relational databases.

**Example:** GQL allows database vendors to implement a common query language for graph operations.

#### Graph Algorithm

A computational procedure designed to solve problems involving graph-structured data.

**Example:** The shortest path algorithm finds the fastest route for a patient transfer between two hospitals in a healthcare network.

#### Graph And LLM Integration

The combination of graph databases with large language models to enable semantic reasoning over structured relationships.

**Example:** An integrated system uses a graph database to store patient relationships and an LLM to answer natural language questions about care patterns.

#### Graph Career Path

Professional opportunities for data scientists and engineers specializing in graph database technologies.

**Example:** Healthcare organizations hire graph database specialists to build analytics platforms for population health management.

#### Graph Database

A database management system that stores data as nodes and edges, optimized for traversing relationships.

**Example:** Neo4j is a graph database used to model patient-provider-payer relationships in healthcare systems.

#### Graph Embedding

A technique that represents graph nodes as vectors in a continuous space while preserving structural properties.

**Example:** Converting patient nodes into 128-dimensional vectors where similar patients have nearby vector representations.

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

#### Graph Theory Basics

Fundamental mathematical concepts describing structures composed of nodes and edges.

**Example:** Understanding that healthcare relationships can be modeled as graphs where patients, providers, and payers are nodes connected by edges.

#### Graph Traversal

The process of visiting nodes and edges in a graph following a specific strategy.

**Example:** Traversing a patient's medical history by following edges chronologically from earliest to most recent encounters.

#### GSQL

A query language for the TigerGraph database combining declarative and imperative programming features.

**Example:** GSQL enables complex multi-step graph analytics queries for fraud detection across millions of healthcare claims.

#### HCPCS Code

Healthcare Common Procedure Coding System codes used for billing medical services, supplies, and equipment.

**Example:** HCPCS code E0100 represents a cane with a quadruped base.

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

#### Healthcare Payer

An organization that finances or reimburses healthcare services, typically an insurance company or government program.

**Example:** Medicare serves as the healthcare payer for Americans aged 65 and older.

#### Healthcare Patient

An individual receiving medical care or treatment from healthcare providers.

**Example:** A patient visits their primary care physician for an annual wellness examination.

#### Healthcare Provider

A licensed professional or organization delivering medical services to patients.

**Example:** Physicians, nurses, hospitals, and clinics are all healthcare providers.

#### Healthcare System

The organizational structure delivering medical services to a population, including providers, payers, and facilities.

**Example:** The U.S. healthcare system combines private insurance, government programs, and provider networks.

#### HIPAA

Health Insurance Portability and Accountability Act, a federal law protecting patient health information privacy and security.

**Example:** HIPAA requires healthcare organizations to implement safeguards preventing unauthorized disclosure of patient records.

#### Hospital

A licensed healthcare facility providing inpatient medical, surgical, and nursing care services.

**Example:** A regional hospital offers emergency services, surgical suites, intensive care, and specialized treatment departments.

#### Hospital Department

A specialized unit within a hospital organized around specific types of medical care.

**Example:** The cardiology department includes cardiac catheterization labs, echocardiography, and cardiovascular intensive care.

#### ICD Code

International Classification of Diseases codes used to document diagnoses and conditions in medical records.

**Example:** ICD-10 code E11.9 represents Type 2 diabetes mellitus without complications.

#### Immunization

The process of making an individual immune to disease through vaccination.

**Example:** A child receives immunizations against measles, mumps, and rubella at age 12 months.

#### Inpatient Care

Medical services provided to patients who are admitted to a hospital for at least one overnight stay.

**Example:** A patient receives inpatient care for five days following hip replacement surgery.

#### Insurance Claim

A formal request submitted to an insurance company for payment of covered healthcare services.

**Example:** A hospital submits an insurance claim for $45,000 for a patient's appendectomy surgery.

#### Insurance Policy

A contract between an insurer and member specifying covered services, costs, and conditions.

**Example:** An insurance policy outlines the deductible, copayments, and maximum out-of-pocket costs for the year.

#### Kickback Scheme

An illegal arrangement where healthcare providers receive payment for patient referrals.

**Example:** A laboratory pays physicians $50 for each patient blood test referral, violating federal anti-kickback laws.

#### Knowledge Graph

A graph database containing entities and relationships representing real-world knowledge in a domain.

**Example:** A medical knowledge graph connects diseases, symptoms, treatments, and medications based on clinical research.

#### Lab Result

The outcome of a laboratory test performed on a patient's biological sample.

**Example:** A lab result shows a patient's hemoglobin A1C level is 7.2%, indicating suboptimal diabetes control.

#### Lab Test

A diagnostic procedure analyzing patient samples to detect disease or monitor health status.

**Example:** A complete blood count lab test measures different components of blood to screen for various conditions.

#### Labeled Property Graph

A graph data model where nodes and edges have types (labels) and associated key-value properties.

**Example:** A labeled property graph includes Patient nodes with name and birthdate properties connected by PRESCRIBED edges with dosage properties.

#### Large Language Model

An artificial intelligence system trained on vast text data to understand and generate human language.

**Example:** A large language model assists clinicians by generating patient summary notes from electronic health records.

#### Link Prediction

A graph algorithm that estimates the likelihood of future connections between unconnected nodes.

**Example:** Predicting which patients are likely to develop diabetes based on their similarity to other patients in the graph.

#### Machine Learning

Computational methods enabling systems to improve performance on tasks through experience without explicit programming.

**Example:** A machine learning model learns to predict hospital readmission risk by analyzing patterns in thousands of patient records.

#### Master Data Management

Processes ensuring critical business data is consistent, accurate, and controlled across an organization.

**Example:** Master data management ensures a patient has one consistent identifier across all hospital systems.

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

#### Medication

A substance used to treat, prevent, or diagnose disease administered to patients.

**Example:** A physician prescribes medication to lower a patient's high blood pressure.

#### Metadata Management

The processes and systems for organizing, storing, and maintaining data about data.

**Example:** Metadata management tracks which department owns each data element and when it was last updated.

#### Multidisciplinary Team

Healthcare professionals from different specialties collaborating on patient care.

**Example:** A multidisciplinary team for cancer treatment includes an oncologist, surgeon, radiologist, and social worker.

#### Node

A fundamental graph element representing an entity or data point.

**Example:** In a healthcare graph, a node might represent a patient, provider, or medication.

#### Node Embedding

A technique converting graph nodes into dense numerical vectors for machine learning applications.

**Example:** Node embeddings allow similar patients to be grouped together based on their medical histories and relationships.

#### Node Property

An attribute or characteristic associated with a node in a graph.

**Example:** A Patient node might have properties including name, date of birth, and blood type.

#### Operating Margin

The percentage of revenue remaining after subtracting operating expenses, indicating financial performance.

**Example:** A hospital with a 5% operating margin earns $5 for every $100 in revenue after covering costs.

#### Out-Of-Pocket Maximum

The most an insured person pays for covered services in a plan year, after which insurance pays 100%.

**Example:** After reaching the $6,000 out-of-pocket maximum, all subsequent covered services are fully paid by insurance.

#### Outpatient Facility

A healthcare location providing services not requiring overnight hospital admission.

**Example:** Outpatient surgery centers perform procedures where patients go home the same day.

#### Pagerank Algorithm

A graph algorithm measuring node importance based on the quantity and quality of connections.

**Example:** Using PageRank to identify influential healthcare providers based on referral network patterns.

#### Path Query

A graph query finding sequences of connected nodes and edges matching specified criteria.

**Example:** A path query traces a patient's journey from primary care through specialists to hospital admission.

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

#### Patient Record

A comprehensive collection of medical information documenting an individual's healthcare encounters and history.

**Example:** A patient record contains diagnoses, medications, lab results, imaging studies, and provider notes from all visits.

#### Payer Mix

The distribution of patients across different insurance types and payment sources for a healthcare provider.

**Example:** A hospital's payer mix is 40% commercial insurance, 35% Medicare, 15% Medicaid, and 10% uninsured.

#### Per-Person Healthcare Cost

The average amount spent on healthcare services per individual in a population over a specified period.

**Example:** The per-person healthcare cost in the United States exceeds $12,000 annually, highest among developed nations.

#### Phantom Billing

Fraudulent submission of claims for services or supplies never actually provided to patients.

**Example:** A provider bills Medicare for office visits with patients who never came to the clinic.

#### Pharmacy Benefit Manager

An organization administering prescription drug plans and negotiating prices between payers and pharmacies.

**Example:** A pharmacy benefit manager processes prescription claims and determines patient copayment amounts at the pharmacy counter.

#### Population Health Analytics

Analysis of health data across patient groups to identify trends, risks, and improvement opportunities.

**Example:** Population health analytics reveals that diabetic patients in one neighborhood have higher hospitalization rates than others.

#### Predictive Analytics

Statistical techniques using historical data to forecast future events or behaviors.

**Example:** Predictive analytics identifies patients at high risk for heart failure readmission within 30 days of discharge.

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

#### Profitability

The degree to which revenues exceed expenses, indicating financial viability of healthcare operations.

**Example:** A hospital achieves profitability when revenue from patient services exceeds the costs of delivering care.

#### Project Presentation

A formal communication where students demonstrate their capstone project results, methods, and conclusions.

**Example:** Students present their fraud detection graph application to faculty, explaining the algorithms used and findings discovered.

#### Protected Health Information

Any individually identifiable health data protected under HIPAA privacy regulations.

**Example:** Protected health information includes patient names, medical record numbers, diagnoses, and treatment details.

#### Provider Capacity

The maximum number of patients or services a healthcare provider can handle in a given timeframe.

**Example:** A clinic's provider capacity is 25 patient appointments per day per physician.

#### Provider Compensation

The payment methods and amounts used to reimburse healthcare providers for services delivered.

**Example:** Provider compensation models include salary, fee-for-service, or value-based payment arrangements.

#### Provider Credential

Official documentation verifying a healthcare professional's qualifications, training, and authorization to practice.

**Example:** A hospital credentials committee reviews provider credentials including medical degrees, licenses, and board certifications.

#### Provider Network

A group of healthcare providers and facilities contracted with an insurance plan to deliver care.

**Example:** An insurance company's provider network includes 500 physicians and 50 hospitals in the metropolitan area.

#### Provider Network Fraud

Organized schemes where multiple providers collude to submit fraudulent claims or inappropriate referrals.

**Example:** Provider network fraud occurs when a group of clinics share patient information to bill for services never rendered.

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

#### Query Performance

The speed and efficiency with which a database executes queries and returns results.

**Example:** Query performance improves dramatically when using graph databases for relationship-heavy queries compared to relational databases.

#### RAG Architecture

Retrieval-Augmented Generation, combining document retrieval with language models to generate informed responses.

**Example:** A RAG architecture retrieves relevant medical literature and uses an LLM to answer clinician questions with cited sources.

#### Real-World Implementation

Practical deployment of healthcare graph solutions in operational clinical or administrative settings.

**Example:** A hospital implements a graph-based clinical decision support system that providers use during patient encounters.

#### Recommendation System

An algorithm suggesting relevant items, services, or actions based on user characteristics and patterns.

**Example:** A recommendation system suggests appropriate clinical guidelines based on patient diagnosis and characteristics.

#### Referral

The process of directing a patient to another healthcare provider for specialized evaluation or treatment.

**Example:** A primary care provider sends a referral to a cardiologist when a patient has concerning heart symptoms.

#### Referral Network Analysis

Examination of patterns in how providers refer patients to identify relationships and potential anomalies.

**Example:** Referral network analysis reveals that a physician always refers patients to a specific imaging center, suggesting a potential kickback arrangement.

#### Reimbursement

Payment made by insurance or patients to healthcare providers for services rendered.

**Example:** A hospital receives reimbursement from Medicare for treating an elderly patient's pneumonia.

#### Relational Database

A database organizing data into tables with rows and columns linked through defined relationships.

**Example:** A relational database stores patient information in one table and appointments in another, connected by patient ID.

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

#### Semantic Search

Information retrieval using meaning and context rather than exact keyword matching.

**Example:** Semantic search finds relevant medical research when a clinician asks "treatments for resistant hypertension" using natural language.

#### Shortest Path Algorithm

A graph algorithm finding the minimum number of edges or lowest-weight path between two nodes.

**Example:** The shortest path algorithm finds the quickest referral chain from a patient's primary physician to a specialized treatment center.

#### Similarity Measure

A quantitative method for assessing how alike two nodes or subgraphs are based on defined criteria.

**Example:** Computing similarity measures identifies patients with comparable medical histories for cohort analysis.

#### Specialist Provider

A physician with advanced training focused on treating specific diseases, organ systems, or patient populations.

**Example:** An oncologist is a specialist provider treating patients with cancer.

#### Subgraph Query

A graph query extracting a subset of nodes and edges matching specified patterns or conditions.

**Example:** A subgraph query extracts all nodes and relationships for patients treated in the cardiology department during 2024.

#### Symptom

A physical or mental feature perceived by the patient indicating disease or abnormal condition.

**Example:** Chest pain, shortness of breath, and fatigue are symptoms that may indicate heart disease.

#### Transparency

The degree to which system operations, decisions, and data are visible and understandable to stakeholders.

**Example:** Transparency in healthcare pricing allows patients to understand costs before receiving services.

#### Treatment Plan

A structured approach outlining specific interventions, medications, and procedures for managing a patient's condition.

**Example:** A treatment plan for pneumonia includes antibiotics, rest, fluids, and a follow-up appointment in one week.

#### Treatment Timeline

A chronological representation showing the sequence and timing of medical interventions for a patient.

**Example:** A treatment timeline displays when a cancer patient received surgery, chemotherapy cycles, and radiation therapy.

#### Unbundling

A fraudulent billing practice of separating procedure components to charge more than the bundled service rate.

**Example:** Unbundling occurs when a provider bills separately for steps of a surgical procedure that should be billed together.

#### Upcoding

A fraudulent practice of billing for more expensive services than actually provided.

**Example:** Upcoding happens when a physician bills for an extensive office visit when only a brief consultation occurred.

#### Utilization Review

Evaluation of healthcare services to determine if they are medically necessary and appropriate.

**Example:** Utilization review may identify that a patient's extended hospital stay is no longer medically necessary for acute care.

#### Value-Based Care

A healthcare payment model rewarding providers for patient health outcomes rather than service volume.

**Example:** Value-based care contracts pay bonuses to providers who achieve target rates for diabetes control and preventive screenings.

#### Value-Based Payment

Reimbursement systems linking provider compensation to quality metrics and patient outcomes rather than service quantity.

**Example:** A value-based payment arrangement rewards a clinic for reducing emergency department visits among their diabetic patients.

#### Vector Embedding

A mathematical representation of data as dense numerical vectors capturing semantic meaning and relationships.

**Example:** Vector embeddings convert patient diagnoses into numbers that position similar conditions near each other in multi-dimensional space.

#### Vector Store

A specialized database optimized for storing and searching high-dimensional vector representations of data.

**Example:** A vector store enables fast similarity searches to find patients with medical histories similar to a new patient.

#### Vital Sign

A measurable indicator of basic body functions used to assess health status.

**Example:** Blood pressure, heart rate, temperature, and respiratory rate are vital signs measured at each clinical visit.

#### Waste In Healthcare

Unnecessary healthcare spending that does not improve patient outcomes, including overtreatment and inefficiency.

**Example:** Ordering duplicate lab tests that were already completed recently represents waste in healthcare.
