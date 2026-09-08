# Learning Graph for Modeling Healthcare Data with Graphs

This section contains the learning graph for this intelligent textbook. A learning
graph is a graph of the concepts used in this textbook. Each concept is represented
by a node in a network graph. Concepts are connected by directed edges that indicate
which concepts each node depends on before that concept can be understood by the
student.

A learning graph is the foundational data structure for intelligent textbooks that
can recommend learning paths. It is like a roadmap of concepts that helps students
arrive at their learning goals.

At the left of the learning graph are the prerequisite or foundational concepts. They
have no outbound edges — they only have inbound edges from other concepts that depend
on understanding these foundational prerequisites. At the far right are the most
advanced concepts in the course. To master these concepts you must understand all of
the concepts that they point to.

## Learning Graph Statistics

- **Total Concepts**: 513
- **Total Dependencies**: 552
- **Taxonomy Categories**: 14
- **Foundational Concepts**: 2
- **Average Dependencies per Concept**: 1.08
- **Maximum Dependency Chain**: 31 levels
- **Quality Score**: 92/100 (Excellent)

## Source Documents and Data Files

### Course Description

We use the [Course Description](../course-description.md) as the source document for
the concepts that are included in this course. The course description uses the 2001
Bloom taxonomy to order its learning objectives, and now includes a dedicated unit on
modeling clinical decision support systems with HL7 FHIR and CQL.

### List of Concepts

We use generative AI to convert the course description into a
[Concept List](./concept-list.md). Each concept is a short Title Case label, with all
labels under 32 characters long. The 513 concepts span graph theory, healthcare domain
knowledge, graph analytics, AI/ML, clinical decision support (FHIR, CQL, and CMS
authoring/testing tooling), security, and practical applications.

### Concept Dependency List

We next use generative AI to create a Directed Acyclic Graph (DAG). DAGs do not have
cycles in which concepts depend on themselves. We provide the DAG in two formats: a
[CSV file](./learning-graph.csv) and a [JSON file](./learning-graph.json) that uses the
vis-network JavaScript library format. The vis-network format uses `nodes`, `edges`, and
`metadata` elements, with edges containing `from` and `to` properties. This makes it
easy to view and edit the learning graph using an editor built with the vis-network
tools.

## Analysis & Documentation

### Course Description Quality Assessment

This report rates the overall quality of the course description for the purpose of
generating a learning graph.

- Course description fields and content depth analysis
- Validates that the course description has sufficient depth to generate 500+ concepts
- Compares the course description against similar courses
- Identifies content gaps and strengths
- Suggests areas of improvement

The course description scored **100/100**, confirming readiness for learning graph
generation.

[View the Course Description Quality Assessment](./course-description-assessment.md)

### Learning Graph Quality Validation

This report gives an overall assessment of the quality of the learning graph. It uses
graph algorithms to look for specific quality patterns in the graph.

- Graph structure validation — all 513 concepts are connected in a single component
- DAG validation (no cycles detected)
- No self-dependencies and no orphaned nodes detected
- Foundational concepts: 2 entry points (Graph Theory Basics, Healthcare System)
- Indegree distribution analysis (most depended-upon concept: Clinical Quality Measure)
- Terminal node percentage: 37.6% (within the healthy 5-40% range)
- Longest dependency chains (maximum chain length: 31)

The learning graph scored **92/100 (Excellent)**.

[View the Learning Graph Quality Validation](./quality-metrics.md)

### Concept Taxonomy

In order to see patterns in the learning graph, it is useful to assign colors to each
concept based on the concept type. We use generative AI to create about a dozen
categories for our concepts and then place each concept into a single primary
classifier.

- A concept classifier taxonomy with 14 categories
- Category organization — foundational elements first, capstone project ideas last
- Balanced categories, all well under the 30% threshold
- Clear 3-5 letter abbreviations for use in the CSV file

The 14 categories are: Foundation Concepts (FOUND), Graph Technologies (GTECH), Graph
Analytics and Algorithms (ANAL), Healthcare Domain Fundamentals (HCARE), Patient Data
and Clinical Concepts (PAT), Provider Operations (PROV), Payer and Insurance (PAYER),
Financial and Business Operations (FIN), Fraud, Waste, and Abuse (FRAUD), AI and
Machine Learning (AI), Clinical Decision Support, FHIR and CQL (CDS), Security and
Privacy (SEC), Data Governance (GOV), and Capstone and Career (CAP).

[View the Concept Taxonomy](./concept-taxonomy.md)

### Taxonomy Distribution

This report shows how many concepts fit into each category of the taxonomy. Our goal is
a somewhat balanced taxonomy where each category holds an equal number of concepts. We
also don't want any category to contain over 30% of our concepts.

- Statistical breakdown
- Detailed concept listing by category
- Visual distribution table
- Balance verification

The largest category (Clinical Decision Support, FHIR and CQL) holds 59 concepts
(11.6%), well within the acceptable range.

[View the Taxonomy Distribution Report](./taxonomy-distribution.md)

## Key Features

### Multi-Perspective Learning

The learning graph incorporates three critical healthcare perspectives:

1. **Patient Perspective**: Clinical data, diagnoses, treatments, care plans
2. **Provider Perspective**: Hospitals, clinics, schedules, referrals, performance
3. **Payer Perspective**: Claims, policies, coverage, reimbursement

### Clinical Decision Support with FHIR and CQL

A dedicated taxonomy category (CDS) covers modeling healthcare decision support
systems:

- The Four Levels of Knowledge Representation in FHIR (Narrative, Semi-Structured,
  Structured, Executable)
- The three Tiers of Functionality (Data, Logic, Forms/UI)
- Clinical Quality Language (CQL) authoring and the Expression Logical Model (ELM)
- Clinical Quality Measures (CQMs), CDS Hooks, and guideline-based care pathways
- CMS-sponsored authoring, testing, and certification tools: MADiE, CQL Runner,
  Bonnie, and Cypress

### Comprehensive Coverage

Topics span from foundational concepts to advanced applications:

- Graph database fundamentals
- Healthcare domain knowledge
- Query languages (Cypher, GQL, GSQL)
- Graph analytics, embeddings, and graph neural networks
- Clinical decision support with FHIR and CQL
- Fraud detection and compliance
- AI/ML integration, LLMs, agentic workflows, token efficiency, context graphs,
  enterprise knowledge graphs, and the enterprise nervous system concept
- Security (HIPAA, RBAC, encryption)
- Data governance and explainability

### Pedagogically Sound Structure

The learning graph follows established educational principles:

- Clear prerequisite relationships
- Progressive complexity
- Multiple learning pathways
- Foundation → Application → Synthesis progression
- Capstone projects for knowledge integration

## Using the Learning Graph

### For Students

- Use the concept list to understand the full scope of the course
- Follow dependency paths to identify prerequisite knowledge
- Track your progress through the 513 concepts
- Navigate personalized learning pathways based on your goals

### For Instructors

- Understand the logical structure of the course content
- Identify critical foundational concepts
- Design lesson plans that respect dependency relationships
- Create assessments aligned with the concept taxonomy

### For Developers

- Import the learning-graph.json into visualization tools
- Build adaptive learning systems using the dependency data
- Create personalized recommendations based on concept relationships
- Integrate with learning management systems

## Technical Details

- **Format**: Learning Graph JSON v1.0
- **Schema**: [learning-graph-schema.json](https://raw.githubusercontent.com/dmccreary/learning-graphs/refs/heads/main/src/schema/learning-graph-schema.json)
- **Creator**: Dan McCreary
- **License**: CC BY-NC-SA 4.0 DEED
- **Version**: 2.0
- **Generated**: November 6, 2025
- **Last Updated**: September 7, 2026 (regenerated from scratch, 200 → 513 concepts,
  adding the Clinical Decision Support, FHIR and CQL category)

---

For questions or feedback about the learning graph, please refer to the
[course description](../course-description.md) or contact the course creator.
