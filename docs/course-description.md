# Course Description for Modeling Healthcare Data with Graphs

**Title:** Modeling Healthcare Data with Graphs

**Target Audience:** College Undergraduate

**Prerequisites:** Knowledge of databases

## Course Overview

The annual per-person cost for healthcare in the United States is the highest in the world by a significant margin. Modern graph databases offer powerful ways to lower these costs by providing superior analytics that enable healthcare organizations to transition from expensive fee-for-service systems to value-based care models.

This course teaches students to model complex healthcare data from multiple perspectives, including the patient, provider, and payer viewpoints. We begin with a review of the many challenges of modeling complex interconnected clinical data. We discuss why tabular relational structures are poorly suited for clinical data and how graph databases excel at this task. We introduce key concepts including graph algorithms, graph data science, embeddings, and graph neural networks.

The course starts with a patient-centric graph data model that places the patient record at the center of our graph, including modeling patient attributes such as demographics, diseases, conditions, prescriptions, diagnoses, treatments, symptoms, procedures, providers, and care plans. We then expand to include the provider perspective, which encompasses modeling individual providers, hospitals, clinics, schedules, claims, costs, revenue, and profitability. Next, we examine the payer perspective, which includes claims processing, fraud detection, waste and abuse prevention, provider networks, policies, coverage, disputes, population analytics, and profitability analysis.

The core of our course examines how graph databases support analytics, clinical rules engines, recommendation systems, and data quality initiatives within healthcare. We take a close look at vector stores used in conjunction with AI and large language models (LLMs).

We then focus on the types of analytics used by each stakeholder perspective and discuss operational reporting, key performance indicators (KPIs), and real-time clinical discovery applications that benefit from graph databases. Finally, we conclude with advanced topics including security, HIPAA compliance, role-based access control (RBAC), metadata management, data governance, lineage tracking, traceability, explainability, and the use of machine learning and LLMs to create precise care path recommendations that combine quality with explainability.

## Main Topics Covered

- Annual Costs
- Per Person Cost
- Fee for Services
- Value-based Care
- Graph Data Models
- Legacy Healthcare
- Labeled Property Graph
- Node
- Node Properties
- Edge
- Edge Property
- Graph Query
- Cypher
- GQL
- Graph Performance
- Persona
- Patient Viewpoint
- Provider Viewpoint
- Payer Viewpoint
- Hospital
- Clinic
- Primary Care Provider
- Demographic
- Encounter
- Disease
- Condition
- Prescription
- Diagnosis
- Treatment
- Symptom
- Procedure
- ICD Code
- CPT Code
- HCPCS Code
- Drug Code
- Provider
- Primary Care Provider
- Hospital
- Clinic
- Schedule
- Calendar
- Claims
- Cost
- Revenue
- Profitability
- Fraud
- Waste
- Abuse
- Provider Network
- Policy
- Coverage
- Benefit Plan
- Copay
- Deductible
- Disputes
- Pharmacy Benefit Manager
- Formulary Rule
- Brand Drug
- Generic Drug
- Rules in Graph
- Rules Engine
- Clinical Decision
- Clinical Decision Support
- Clinical Discovery
- Operational Reporting
- Key Performance Indicator
- AI
- Machine Learning
- LLM
- Expandability
- Graph and LLMs are Complementary
- Vector Store
- Security
- HIPAA
- Role-based Access Control
- Fraud Detection
- Community Detection
- Provider Network Fraud
- Referral
- Referral Inference
- Durable Medical Equipment
- DME Fraud
- Behavioral Health
- Neurodiversity
- Behavioral Health Fraud
- Metadata
- Data governance
- Lineage
- Traceability
- Explainability
- Projects
- Capstone Project
- Capstone Presentation
- Job Market for Graph Modeling
- Using AI in the Course

## Topics Not Covered

- Resource Description Format
- Semantic Web
- Mainframes
- COBOL
- SAS
- Statistics
- Legacy Conversion to Graph

## Learning Outcomes

After completing this course, students will be able to:

### Remember

*Retrieving, recognizing, and recalling relevant knowledge from long-term memory.*

- Define key healthcare terminology including ICD, CPT, HCPCS, and Drug Codes.
- Recall the differences between fee-for-service and value-based care models.
- Identify the main components of a labeled property graph (nodes, edges, properties).
- List the major data entities in healthcare (patients, providers, payers, claims, treatments, encounters).
- Recall common graph query languages (Cypher, GSQL, GQL) and their basic syntax.

### Understand

*Constructing meaning from instructional messages, including oral, written, and graphic communication.*

- Explain why relational databases struggle to model complex, interconnected healthcare data.
- Describe how graph databases enable more effective modeling of patient-provider-payer relationships.
- Summarize how graph algorithms can support clinical decision support and fraud detection.
- Interpret how metadata, lineage, and traceability improve healthcare data governance.
- Discuss how AI and LLMs can be integrated with vector stores and graph data for advanced analytics.

### Apply

*Carrying out or using a procedure in a given situation.*

- Construct a patient-centric healthcare graph model using labeled property graph principles.
- Write graph queries to explore relationships among patients, providers, and payers.
- Use graph algorithms (e.g., shortest path, community detection) to find clinical insights.
- Apply role-based access control (RBAC) concepts to secure healthcare graph data.
- Demonstrate integration of AI tools or vector stores to query and reason over graph data.

### Analyze

*Breaking material into constituent parts and determining how the parts relate to one another and to an overall structure or purpose.*

- Decompose a complex healthcare workflow into entities and relationships suitable for graph modeling.
- Analyze claims and referral data to detect potential fraud, waste, or abuse patterns.
- Examine how data from multiple systems (EHR, claims, pharmacy, behavioral health) connect through shared identifiers.
- Evaluate trade-offs between different graph modeling strategies for scalability, query speed, and explainability.
- Assess how data quality and completeness impact graph analytics outcomes.

### Evaluate

*Making judgments based on criteria and standards through checking and critiquing.*

- Critique the design of an existing healthcare data model for completeness and correctness.
- Judge the appropriateness of a chosen graph algorithm for a given healthcare analytics use case.
- Evaluate the ethical and privacy implications of patient graph data under HIPAA standards.
- Compare the business value of graph-based analytics versus traditional relational approaches in healthcare.
- Assess the explainability and transparency of AI-driven clinical recommendations derived from graph data.

### Create

*Putting elements together to form a coherent or functional whole; reorganizing elements into a new pattern or structure.*

- Design and implement a comprehensive healthcare graph schema integrating patient, provider, and payer data.
- Build a prototype graph application for one of the following:
    - **Fraud detection** using claims graph analytics
    - **Clinical decision support** using rule-based reasoning and embeddings
    - **Provider network optimization** through community and referral graph analysis
    - **Patient journey visualization** using time-sequenced graph queries

- Develop a **capstone project** that combines graph modeling, analytics, and AI integration to address a real healthcare challenge (e.g., improving care quality, reducing costs, or enhancing interoperability).
- Present the capstone project results, demonstrating data lineage, explainability, and measurable impact.

## Use of AI

Use of AI in this course is strongly encouraged. We will provide a library of skills that can be used to increase the quality of your capstone projects.