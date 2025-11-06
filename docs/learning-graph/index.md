# Learning Graph

## Introduction

Welcome to the learning graph for **Modeling Healthcare Data with Graphs**. This section contains comprehensive documentation of the learning graph that underpins this intelligent textbook.

A learning graph is a directed acyclic graph (DAG) that maps out the conceptual dependencies and relationships between topics in a course. It serves as the foundation for personalized learning pathways and adaptive content delivery.

## What is a Learning Graph?

A learning graph is:

- **A conceptual roadmap**: Shows the relationships between 200 core concepts in healthcare graph modeling
- **A dependency graph**: Identifies prerequisite knowledge needed before learning each concept
- **A learning pathway guide**: Enables students to navigate the course based on their current knowledge and goals
- **A pedagogical tool**: Helps instructors understand the structure and flow of the curriculum

## Learning Graph Components

### 1. Course Description Assessment
[View the assessment →](course-description-assessment.md)

Comprehensive quality analysis of the course description that scored **100/100**, confirming readiness for learning graph generation with sufficient breadth and depth to support 200+ concepts.

### 2. Concept Enumeration
[View the 200 concepts →](concept-list.md)

Complete list of 200 concepts organized into 13 categories covering graph theory, healthcare domain knowledge, analytics, AI/ML, security, and practical applications.

### 3. Dependency Graph (CSV)
[Download learning-graph.csv](learning-graph.csv)

The core dependency graph in CSV format containing:

- 200 concepts with unique IDs
- 299 dependency relationships
- Taxonomy classifications
- DAG structure (no circular dependencies)

### 4. Learning Graph (JSON)
[Download learning-graph.json](learning-graph.json)

Complete learning graph in vis-network.js JSON format including:

- Metadata (title, description, creator, license)
- Groups (13 taxonomy categories with color coding)
- Nodes (200 concepts)
- Edges (299 directed dependency relationships)

### 5. Concept Taxonomy
[View taxonomy definitions →](concept-taxonomy.md)

13 taxonomic categories organizing concepts into logical groupings:

- Foundation Concepts (FOUND)
- Graph Technologies (GTECH)
- Healthcare Domain (HCARE)
- Patient Data (PAT)
- Provider Operations (PROV)
- Payer & Insurance (PAYER)
- Financial & Business (FIN)
- Fraud & Compliance (FRAUD)
- Graph Analytics (ANAL)
- AI & Machine Learning (AI)
- Security & Privacy (SEC)
- Data Governance (GOV)
- Capstone & Career (CAP)

### 6. Quality Metrics
[View quality analysis →](quality-metrics.md)

Comprehensive quality validation report with a score of **90/100 (Excellent)**:

- ✓ Valid DAG structure (no cycles)
- ✓ No self-dependencies
- 4 foundational concepts (2.0%)
- Average 1.50 dependencies per concept
- Maximum dependency chain length: 11

### 7. Taxonomy Distribution
[View distribution report →](taxonomy-distribution.md)

Analysis of concept distribution across categories:

- Well-balanced distribution
- Largest category: Patient Data & Provider Operations (25 concepts each, 12.5%)
- Smallest category: Capstone & Career (5 concepts, 2.5%)
- All categories within acceptable ranges

## Learning Graph Statistics

- **Total Concepts**: 200
- **Total Dependencies**: 299
- **Taxonomy Categories**: 13
- **Foundational Concepts**: 4
- **Average Dependencies per Concept**: 1.50
- **Maximum Dependency Chain**: 11 levels
- **Quality Score**: 90/100 (Excellent)

## Key Features

### Multi-Perspective Learning

The learning graph incorporates three critical healthcare perspectives:

1. **Patient Perspective**: Clinical data, diagnoses, treatments, care plans
2. **Provider Perspective**: Hospitals, clinics, schedules, referrals, performance
3. **Payer Perspective**: Claims, policies, coverage, reimbursement

### Comprehensive Coverage

Topics span from foundational concepts to advanced applications:

- Graph database fundamentals
- Healthcare domain knowledge
- Query languages (Cypher, GQL, GSQL)
- Clinical analytics and decision support
- Fraud detection and compliance
- AI/ML integration and LLMs
- Security (HIPAA, RBAC)
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
- Track your progress through the 200 concepts
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

## Next Steps

After exploring the learning graph, you can:

1. **Install the Learning Graph Viewer**: Interactive visualization tool for exploring concept relationships
2. **Generate Chapter Structure**: Use the learning graph to create optimal chapter organization
3. **Create Glossary**: Generate definitions for all 200 concepts
4. **Build Quizzes**: Develop assessments aligned with concept taxonomy

## Technical Details

- **Format**: Learning Graph JSON v1.0
- **Schema**: [learning-graph-schema.json](https://raw.githubusercontent.com/dmccreary/learning-graphs/refs/heads/main/src/schema/learning-graph-schema.json)
- **License**: CC BY-NC-SA 4.0 DEED
- **Version**: 1.0
- **Generated**: November 6, 2025

---

For questions or feedback about the learning graph, please refer to the [course description](../course-description.md) or contact the course creator.
