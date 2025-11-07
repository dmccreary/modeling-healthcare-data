# Graph Theory and Database Foundations

## Summary

This chapter introduces fundamental graph theory concepts including nodes, edges, labeled property graphs, directed acyclic graphs, and graph traversal. You will learn the basic building blocks of graph databases and understand how they differ from traditional relational databases. By the end of this chapter, you will have a solid foundation in graph data structures and database schema design that will be essential for modeling healthcare data.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Graph Theory Basics
2. Node
3. Edge
4. Graph Database
5. Labeled Property Graph
6. Node Property
7. Edge Property
8. Directed Graph
9. Directed Acyclic Graph
10. Graph Traversal
11. Graph Path
12. Graph Query
13. Relational Database
14. Database Schema
15. Data Model

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

## Introduction

Healthcare data is inherently interconnected—patients receive care from providers, undergo procedures, receive prescriptions, and accumulate complex medical histories over time. Traditional relational databases, with their rigid table structures and expensive JOIN operations, struggle to efficiently model these intricate relationships. Graph databases offer a fundamentally different approach, treating relationships as first-class entities and enabling natural representation of complex healthcare networks. This chapter introduces the foundational concepts of graph theory and graph databases, establishing the theoretical and practical groundwork necessary for modeling healthcare data effectively.

## What is Graph Theory?

**Graph theory** is a branch of mathematics that studies structures made up of objects and the connections between them. In graph theory, these objects are called **nodes** (also known as vertices), and the connections between them are called **edges** (also known as links or relationships). While graph theory originated in the 18th century with Leonhard Euler's famous Seven Bridges of Königsberg problem, its applications have expanded dramatically in the digital age, particularly in domains requiring complex relationship modeling.

In the context of healthcare data management, graph theory provides the mathematical foundation for representing clinical entities and their interconnections. Consider a simple example: a patient visiting a healthcare provider. This scenario involves at least two entities (the patient and the provider) connected by a relationship (the encounter or visit). As healthcare scenarios become more complex—involving multiple providers, medications, diagnoses, procedures, and care plans—the graph structure becomes an increasingly natural and powerful way to model the domain.

### The Building Blocks: Nodes and Edges

**Nodes** represent discrete entities or objects in your domain. In healthcare applications, nodes commonly represent:

- Patients
- Healthcare providers (physicians, nurses, specialists)
- Medical facilities (hospitals, clinics, urgent care centers)
- Diagnoses and conditions
- Medications and prescriptions
- Medical procedures
- Laboratory tests and results
- Insurance claims

Each node typically has a **type** (or label) that categorizes what kind of entity it represents. For instance, you might have nodes with labels like `Patient`, `Provider`, `Medication`, or `Diagnosis`. This labeling system enables efficient querying and helps organize the semantic structure of your data model.

**Edges** represent the relationships or connections between nodes. In healthcare graphs, edges capture critical information about how entities interact:

- A patient **HAS_DIAGNOSIS** relationship connecting a patient to a specific disease
- A provider **PRESCRIBED** relationship linking a doctor to a medication order
- A medication **TREATS** relationship indicating which conditions a drug addresses
- A patient **VISITED** relationship documenting an encounter at a facility

The power of graph databases emerges from treating these edges as first-class data structures rather than as implicit foreign key references. Each edge connects exactly two nodes: a source (or start) node and a target (or end) node.

<iframe src="../../sims/healthcare-graph-fundamentals/main.html" height="700px" scrolling="no"></iframe>
[Run Fullscreen](../../sims/healthcare-graph-fundamentals/main.html)
<details markdown="1">
    <summary>Basic Healthcare Graph Model Diagram</summary>
    
    use the hc-graph-generator skill to create a new MicroSim using the following requirements

    Purpose: Illustrate the fundamental components of a graph—nodes and edges—using a simple healthcare scenario

    Components to show:
    - 5 circular nodes representing healthcare entities
    - Node 1 (blue): Patient "Sarah Chen"
    - Node 2 (green): Provider "Dr. Martinez"
    - Node 3 (orange): Diagnosis "Type 2 Diabetes"
    - Node 4 (purple): Medication "Metformin"
    - Node 5 (yellow): Facility "City Hospital"

    Connections (directed arrows):
    - Arrow from Patient to Provider, labeled "VISITED_PROVIDER"
    - Arrow from Provider to Diagnosis, labeled "DIAGNOSED_WITH"
    - Arrow from Patient to Diagnosis, labeled "HAS_CONDITION"
    - Arrow from Provider to Medication, labeled "PRESCRIBED"
    - Arrow from Patient to Facility, labeled "ADMITTED_TO"

    Style: Network diagram with labeled nodes and directed edges

    Labels:
    - Each node shows its type (Patient, Provider, etc.) and name
    - Edge labels clearly visible along the arrows
    - Small legend in corner: "Circle = Node (Entity)", "Arrow = Edge (Relationship)"

    Color scheme:
    - Nodes: Color-coded by type as specified above
    - Edges: Dark gray with arrowheads indicating direction
    - Background: White

    
</details>

## Properties: Adding Information to Nodes and Edges

While nodes and edges provide the structural skeleton of a graph, **properties** add the descriptive details that make the data useful for real-world applications. Properties are key-value pairs attached to nodes or edges, similar to columns in relational database tables but with far greater flexibility.

### Node Properties

**Node properties** store attributes describing the entity represented by a node. The schema-flexible nature of graph databases means that not every node of the same type needs to have identical properties, though in practice, nodes of the same label typically share a common set of core properties.

For a `Patient` node in a healthcare graph, typical properties might include:

- `patientId`: Unique identifier (e.g., "P-458392")
- `firstName`: "Sarah"
- `lastName`: "Chen"
- `dateOfBirth`: "1978-04-15"
- `gender`: "Female"
- `bloodType`: "A+"
- `primaryLanguage`: "English"
- `insuranceProvider`: "Blue Cross"
- `policyNumber`: "BC-7829384"

Similarly, a `Medication` node might have properties such as `drugName`, `genericName`, `dosageForm`, `strengthMg`, `manufacturer`, and `ndcCode` (National Drug Code).

### Edge Properties

**Edge properties** store information about the relationship itself, capturing contextual details about how and when entities are connected. This capability distinguishes graph databases from simple network diagrams—the relationships carry data, not just structural information.

For a `PRESCRIBED` edge connecting a `Provider` node to a `Medication` node, useful properties might include:

- `prescriptionId`: "RX-2024-893451"
- `prescriptionDate`: "2024-02-15"
- `dosage`: "500mg twice daily"
- `durationDays`: 90
- `refillsAllowed`: 3
- `pharmacyInstructions`: "Take with food"
- `reasonForPrescription`: "Type 2 Diabetes management"

This edge-property capability enables sophisticated analysis. For instance, you could query for all patients taking a specific medication at a particular dosage, identify prescribing patterns among providers, or track medication adherence over time—all by traversing edges and examining their properties.

Here's a comparison of how properties are distributed across nodes and edges:

| Aspect | Node Properties | Edge Properties |
|--------|----------------|-----------------|
| **What they describe** | Attributes of entities | Attributes of relationships |
| **Healthcare examples** | Patient demographics, diagnosis codes, medication names | Prescription dates, encounter durations, test results |
| **Typical data types** | Strings, numbers, dates, booleans, arrays | Strings, numbers, dates, durations, quantities |
| **Schema flexibility** | Optional; nodes of same type can have different properties | Optional; edges of same type can have different properties |
| **Query usage** | Filter nodes by attributes | Filter relationships by context |

## Directed Graphs and Graph Direction

Up to this point, we've been discussing **directed graphs**—graphs where each edge has a specific direction, flowing from a source node to a target node. The directionality of edges is semantically meaningful in most real-world applications, including healthcare.

Consider the difference between these two statements:

1. A patient **HAS_DIAGNOSIS** of Type 2 Diabetes
2. Type 2 Diabetes **HAS_DIAGNOSIS** of a patient

Only the first statement makes semantic sense. The direction of the relationship matters. In graph databases, we explicitly model this directionality by designating one node as the source (or start) and another as the target (or end) of each edge.

Directionality enables precise relationship semantics:

- `Patient` --**VISITED**--> `Provider` (the patient visited the provider, not vice versa)
- `Provider` --**WORKS_AT**--> `Hospital` (the provider is employed by the hospital)
- `Medication` --**TREATS**--> `Condition` (the drug treats the disease)
- `Procedure` --**REQUIRES**--> `Equipment` (the procedure needs specific equipment)

Some relationships might seem naturally bidirectional, such as family relationships or colleague relationships. However, even in these cases, graph databases typically model relationships as directed, sometimes creating two edges (one in each direction) when true bidirectionality is semantically required.

### Directed Acyclic Graphs (DAGs)

A special category of directed graphs, called **Directed Acyclic Graphs** or **DAGs**, prohibits cycles—you cannot follow a path of edges that eventually returns to the starting node. DAGs appear frequently in healthcare data modeling for hierarchical or temporal relationships where cycles would be semantically invalid.

Common healthcare applications of DAGs include:

- **Clinical workflow progression**: A patient moves through stages of care (admission → triage → examination → diagnosis → treatment → discharge) without cycling back to earlier stages within a single encounter
- **Medical terminology hierarchies**: ICD-10 diagnosis codes form a hierarchical classification where child codes inherit from parent categories
- **Care plan dependencies**: Certain procedures must be completed before others can begin (lab work → results review → treatment decision → procedure scheduling)
- **Organizational structures**: Hospital departmental hierarchies flow from executive leadership down through departments without circular reporting relationships

<details markdown="1">
    <summary>Directed Acyclic Graph Example: Care Pathway</summary>
    use the hc-graph-generator skill to create a new MicroSim using the following requirements

    Purpose: Demonstrate a DAG structure representing a clinical care pathway where stages progress without cycles

    Components to show:
    - 8 rectangular nodes arranged in a flow from left to right and top to bottom
    - Node 1: "Patient Admission"
    - Node 2: "Initial Assessment"
    - Node 3: "Diagnostic Testing"
    - Node 4: "Test Results Review"
    - Node 5: "Treatment Planning"
    - Node 6: "Treatment Administration"
    - Node 7: "Monitoring & Evaluation"
    - Node 8: "Discharge Planning"

    Connections (directed arrows showing workflow):
    - Admission → Initial Assessment
    - Initial Assessment → Diagnostic Testing
    - Diagnostic Testing → Test Results Review
    - Test Results Review → Treatment Planning
    - Treatment Planning → Treatment Administration
    - Treatment Administration → Monitoring & Evaluation
    - Monitoring & Evaluation → Discharge Planning
    - (Optional paths) Test Results Review → Additional Testing (dotted line back to node 3 only if new tests needed)
    - Note: No cycles that return to previous stages

    Style: Flowchart-style diagram with clear directional flow

    Labels:
    - Each node shows the care stage name
    - Arrows labeled with action or transition
    - Annotation: "DAG Property: No cycles—each stage progresses forward in time"

    Color scheme:
    - Nodes: Light blue gradient
    - Arrows: Dark blue
    - Optional/conditional paths: Dotted lines
    - Background: White

    Visual notes:
    - Add small clock icons to emphasize temporal progression
    - Highlight the acyclic nature with a note: "A patient does not cycle back to admission during a single encounter"

    Implementation: Flowchart diagram tool (Mermaid, draw.io, or Graphviz)
</details>

## The Labeled Property Graph Model

The **labeled property graph** (LPG) model is the most widely adopted graph database paradigm, implemented by popular systems including Neo4j, Amazon Neptune, and Azure Cosmos DB. The LPG model combines all the concepts we've discussed—nodes, edges, properties, and labels—into a cohesive, flexible data model particularly well-suited for complex domains like healthcare.

Key characteristics of the labeled property graph model include:

- **Nodes have labels**: Each node can have one or more labels (e.g., a node might be labeled both `Person` and `Patient`)
- **Nodes have properties**: Arbitrary key-value pairs describe node attributes
- **Edges have types**: Each edge has exactly one relationship type (e.g., `PRESCRIBED`, `DIAGNOSED_WITH`)
- **Edges have properties**: Relationships can carry contextual information
- **Edges are directed**: Every edge connects a source node to a target node
- **Schema flexibility**: No rigid schema is enforced; the graph can evolve organically as requirements change

This flexibility is particularly valuable in healthcare, where data models must accommodate:

- Evolving medical knowledge and terminology
- Integration of data from disparate source systems with different schemas
- Patient-specific variations in care paths and medical history
- Regulatory requirements that change over time

Let's examine a concrete example of a labeled property graph representing a patient's diabetes management:

```
(Patient {patientId: "P-458392", name: "Sarah Chen", age: 46, bloodType: "A+"})
  -[:HAS_CONDITION {diagnosisDate: "2023-03-15", severity: "moderate"}]->
(Diagnosis {icd10: "E11.9", name: "Type 2 Diabetes", category: "Endocrine"})

(Provider {providerId: "DR-1892", name: "Dr. Martinez", specialty: "Endocrinology"})
  -[:PRESCRIBED {prescriptionDate: "2023-03-15", dosage: "500mg twice daily", duration: 90}]->
(Medication {ndcCode: "12345-678-90", genericName: "Metformin", brandName: "Glucophage"})
  -[:TREATS]->
(Diagnosis {icd10: "E11.9", name: "Type 2 Diabetes"})

(Patient {patientId: "P-458392"})
  -[:VISITED {encounterDate: "2023-03-15", encounterType: "office visit"}]->
(Provider {providerId: "DR-1892"})
```

This representation captures entities (patients, providers, diagnoses, medications), their attributes (patient demographics, medication codes), relationships (prescriptions, diagnoses, visits), and relationship context (dates, dosages, encounter types) in a natural, interconnected structure.

<details markdown="1">
    <summary>Healthcare Labeled Property Graph Visualization</summary>
    Type: graph-model

    Purpose: Visualize a labeled property graph representing a patient's healthcare journey with multiple interconnected entities

    Node types:
    1. Patient (light blue circles)
       - Properties: patientId, name, dateOfBirth, bloodType, gender
       - Example: {patientId: "P-458392", name: "Sarah Chen", dateOfBirth: "1978-04-15", bloodType: "A+", gender: "Female"}

    2. Provider (green squares)
       - Properties: providerId, name, specialty, licenseNumber
       - Example: {providerId: "DR-1892", name: "Dr. Martinez", specialty: "Endocrinology"}

    3. Diagnosis (red hexagons)
       - Properties: icd10Code, diagnosisName, category
       - Example: {icd10Code: "E11.9", diagnosisName: "Type 2 Diabetes", category: "Endocrine"}

    4. Medication (orange rounded rectangles)
       - Properties: ndcCode, genericName, brandName, class
       - Example: {ndcCode: "12345-678-90", genericName: "Metformin", brandName: "Glucophage", class: "Biguanide"}

    5. Facility (purple diamonds)
       - Properties: facilityId, facilityName, facilityType, address
       - Example: {facilityId: "F-2201", facilityName: "City Hospital", facilityType: "Hospital"}

    6. Procedure (yellow rounded rectangles)
       - Properties: cptCode, procedureName, category
       - Example: {cptCode: "99213", procedureName: "Office Visit Level 3", category: "Evaluation"}

    Edge types:
    1. HAS_CONDITION (solid red arrow)
       - Properties: diagnosisDate, severity, status
       - Connects: Patient → Diagnosis

    2. PRESCRIBED (solid blue arrow)
       - Properties: prescriptionDate, dosage, durationDays, refillsAllowed
       - Connects: Provider → Medication

    3. TAKES_MEDICATION (dashed blue arrow)
       - Properties: startDate, adherenceRate
       - Connects: Patient → Medication

    4. TREATS (dotted green arrow)
       - Properties: efficacyRating
       - Connects: Medication → Diagnosis

    5. VISITED (solid green arrow)
       - Properties: encounterDate, encounterType, duration
       - Connects: Patient → Provider OR Patient → Facility

    6. WORKS_AT (solid purple arrow)
       - Properties: startDate, employmentType
       - Connects: Provider → Facility

    7. UNDERWENT (solid orange arrow)
       - Properties: procedureDate, performedBy
       - Connects: Patient → Procedure

    Sample data structure:
    Central patient node (Sarah Chen) with connections to:
    - Provider node (Dr. Martinez) via VISITED edge
    - Diagnosis node (Type 2 Diabetes) via HAS_CONDITION edge
    - Medication node (Metformin) via TAKES_MEDICATION edge
    - Facility node (City Hospital) via VISITED edge
    - Procedure node (Office Visit) via UNDERWENT edge

    Additional connections:
    - Dr. Martinez PRESCRIBED Metformin
    - Dr. Martinez WORKS_AT City Hospital
    - Metformin TREATS Type 2 Diabetes

    Layout: Force-directed with patient node in center

    Interactive features:
    - Hover over node: Display properties in tooltip
    - Click node: Highlight all directly connected nodes and edges
    - Double-click node: Expand to show additional connections (e.g., show all medications for a patient)
    - Hover over edge: Display edge type and properties
    - Right-click node: Show context menu with "Show all relationships" option
    - Zoom: Mouse wheel (zoom in/out)
    - Pan: Click and drag canvas background
    - Filter controls: Toggle node types on/off (e.g., hide Facilities, show only Patients and Medications)

    Visual styling:
    - Node size: Proportional to number of connections (degree centrality)
    - Node border: Thicker border for nodes with >5 connections
    - Edge thickness: Uniform for clarity
    - Edge color: Matches edge type (as specified above)
    - Selected node: Yellow glow effect
    - Connected nodes when selected: Light gray highlight

    Legend (top-right corner):
    - Node shapes and colors with labels (Patient, Provider, Diagnosis, etc.)
    - Edge line styles (solid, dashed, dotted) with meanings
    - Edge colors and their relationship types
    - Interactive instructions: "Hover to inspect, Click to highlight, Double-click to expand"

    Implementation: vis-network JavaScript library
    Canvas size: 900x700px
    Physics: Enabled with spring stiffness for natural clustering
</details>

## Graph Traversal and Paths

One of the defining advantages of graph databases is their ability to efficiently **traverse** the graph—following edges from node to node to discover patterns, calculate dependencies, or answer complex relationship queries. **Graph traversal** refers to the process of visiting nodes and edges in some systematic order, often to find specific information or compute aggregate results.

A **graph path** is a sequence of nodes connected by edges. For example, in our healthcare graph:

```
Patient "Sarah Chen"
  → VISITED → Dr. Martinez
  → WORKS_AT → City Hospital
```

This path tells a story: Sarah Chen visited Dr. Martinez, who works at City Hospital. We can express path length in terms of "hops"—the number of edges traversed. The path above is a 2-hop path (two edges).

Graph databases excel at multi-hop traversal queries that would be prohibitively expensive in relational databases. Consider these healthcare scenarios:

**1-hop query**: "Find all medications prescribed to Sarah Chen"
```
(Patient {name: "Sarah Chen"}) -[:TAKES_MEDICATION]-> (Medication)
```

**2-hop query**: "Find all providers who have prescribed medications that Sarah Chen currently takes"
```
(Patient {name: "Sarah Chen"}) -[:TAKES_MEDICATION]-> (Medication) <-[:PRESCRIBED]- (Provider)
```

**3-hop query**: "Find all patients who take the same medication and see the same provider as Sarah Chen"
```
(Patient {name: "Sarah Chen"}) -[:TAKES_MEDICATION]-> (Medication) <-[:TAKES_MEDICATION]- (OtherPatient)
(OtherPatient) -[:VISITED]-> (Provider) <-[:VISITED]- (Patient {name: "Sarah Chen"})
```

As queries grow more complex, involving 4, 5, or even 10+ hops, graph databases maintain near-constant performance due to **index-free adjacency**—a storage architecture where each node directly references its connected neighbors without requiring index lookups. In contrast, relational databases require expensive JOIN operations that compound with each additional hop, leading to exponential performance degradation.

### Common Traversal Patterns in Healthcare

Several traversal patterns appear repeatedly in healthcare graph applications:

- **Blast radius analysis**: "If this medication is recalled, which patients are affected?"
- **Care pathway tracking**: "What is the typical progression of treatments for patients with this diagnosis?"
- **Provider network analysis**: "Which specialists do primary care providers most frequently refer patients to?"
- **Medication interaction detection**: "Do any of this patient's current medications interact with the newly prescribed drug?"
- **Root cause analysis**: "What upstream factors contributed to this adverse event?"

<details markdown="1">
    <summary>Graph Traversal Visualization MicroSim</summary>
    Type: microsim

    Learning objective: Enable students to interactively explore how graph traversal algorithms navigate a healthcare graph, comparing different traversal strategies and understanding path discovery

    Canvas layout (1000x700px):
    - Left side (700x700): Drawing area showing a healthcare graph network
    - Right side (300x700): Control panel and information display

    Visual elements in graph area:
    - 12 nodes representing different healthcare entities:
      - 1 central Patient node (large light blue circle): "Patient: Alex"
      - 3 Provider nodes (green squares): "Dr. Smith", "Dr. Lee", "Dr. Patel"
      - 3 Medication nodes (orange rounded rectangles): "Med A", "Med B", "Med C"
      - 2 Diagnosis nodes (red hexagons): "Condition X", "Condition Y"
      - 2 Facility nodes (purple diamonds): "Hospital A", "Clinic B"
      - 1 Procedure node (yellow rectangle): "Procedure Z"

    - Edges connecting nodes with labeled relationships:
      - Patient --VISITED--> Dr. Smith
      - Patient --HAS_CONDITION--> Condition X
      - Patient --TAKES_MEDICATION--> Med A
      - Dr. Smith --PRESCRIBED--> Med A
      - Dr. Smith --WORKS_AT--> Hospital A
      - Med A --TREATS--> Condition X
      - Patient --VISITED--> Dr. Lee
      - Dr. Lee --PRESCRIBED--> Med B
      - Med B --TREATS--> Condition Y
      - Patient --UNDERWENT--> Procedure Z
      - Dr. Patel --PERFORMED--> Procedure Z
      - Dr. Patel --WORKS_AT--> Clinic B

    Node states (color-coded):
    - Unvisited: Original color (gray border)
    - Current node: Bright yellow with thick border
    - Visited: Light green with green border
    - In path: Orange with thick orange border

    Interactive controls (right panel):
    1. Dropdown menu: "Select Start Node"
       - Options: Patient node (default), or any other node

    2. Dropdown menu: "Select Traversal Algorithm"
       - Options:
         - Depth-First Search (DFS)
         - Breadth-First Search (BFS)
         - Shortest Path (to target node)

    3. Dropdown menu (conditionally shown): "Select Target Node"
       - Shown only if "Shortest Path" is selected
       - Options: List of all nodes except start node

    4. Slider: "Animation Speed"
       - Range: 100ms (fast) to 2000ms (slow) per step
       - Default: 500ms
       - Label shows current speed: "Speed: 500ms per step"

    5. Button: "Start Traversal" (green)
       - Begins animated traversal
       - Disables during traversal

    6. Button: "Pause/Resume" (yellow)
       - Toggles pause state during traversal
       - Enabled only when traversal is running

    7. Button: "Reset" (red)
       - Clears visualization and returns all nodes to unvisited state
       - Clears info display

    8. Text display area: "Traversal Info"
       - Shows current step number: "Step: 5/12"
       - Shows current node: "Current: Dr. Smith (Provider)"
       - Shows traversal order: "Order: Patient → Med A → Condition X → Dr. Smith → Hospital A..."
       - Shows path length (for shortest path): "Path length: 3 hops"

    Default parameters:
    - Start node: Patient node
    - Algorithm: Depth-First Search (DFS)
    - Animation speed: 500ms per step

    Behavior and logic:
    - When "Start Traversal" clicked:
      1. Initialize chosen algorithm with start node
      2. Begin step-by-step animation showing:
         - Current node highlighted in yellow
         - Previously visited nodes in green
         - Edges being traversed highlighted briefly
         - Info panel updated with current state
      3. For DFS: Explore deeply along each branch before backtracking
      4. For BFS: Explore all neighbors at current depth before moving to next depth
      5. For Shortest Path: Use Dijkstra's algorithm to find optimal path, then animate the path

    - Node visit animation:
      - Change current node to yellow
      - Wait for animation delay
      - Change to visited green
      - Move to next node

    - Edge traversal animation:
      - Highlight edge being traversed with thick bright blue line
      - Show direction with animated arrow movement
      - Fade back to normal after traversal

    - Path highlighting (for Shortest Path mode):
      - Once path found, highlight all nodes and edges in path with orange
      - Display total path length in hops

    - Pause/Resume:
      - Maintains current state
      - Resumes from exact point where paused

    - Reset:
      - All nodes return to original colors
      - All edges return to normal
      - Info panel clears
      - Traversal order list clears

    Educational annotations:
    - Small info icon next to each algorithm option
    - Hover over info icon shows tooltip:
      - DFS: "Explores as far as possible along each branch before backtracking. Good for exhaustive search."
      - BFS: "Explores all neighbors at current depth before moving deeper. Guarantees shortest path."
      - Shortest Path: "Finds the minimum number of hops between two nodes using Dijkstra's algorithm."

    Implementation notes:
    - Use p5.js for rendering and animation
    - Store graph as adjacency list in JavaScript object
    - Implement DFS using stack (recursive or iterative)
    - Implement BFS using queue
    - Implement shortest path using Dijkstra's algorithm with priority queue
    - Use p5.js frameCount and millis() for animation timing
    - Create Node and Edge classes for easy state management
    - Use lerp() for smooth edge highlighting animations

    Implementation: p5.js with custom graph data structure
</details>

## Graph Queries

While traversal describes the mechanics of following edges, **graph queries** are the high-level language constructs that express what information you want to retrieve or what patterns you want to find. Modern graph databases provide declarative query languages—most notably **Cypher** (Neo4j), **Gremlin** (Apache TinkerPop standard), and the emerging **GQL** (Graph Query Language) standard.

These query languages combine the expressive power of pattern matching with the familiar syntax elements borrowed from SQL. Let's examine some Cypher examples to understand how graph queries work:

**Example 1: Find all medications a specific patient takes**
```cypher
MATCH (p:Patient {name: "Sarah Chen"})-[:TAKES_MEDICATION]->(m:Medication)
RETURN m.genericName, m.dosage
```

This query uses **pattern matching**: it looks for a pattern where a Patient node (labeled `Patient` with a `name` property of "Sarah Chen") has a `TAKES_MEDICATION` relationship pointing to a Medication node.

**Example 2: Find patients who share the same diagnosis and provider**
```cypher
MATCH (p1:Patient)-[:HAS_CONDITION]->(d:Diagnosis)<-[:HAS_CONDITION]-(p2:Patient),
      (p1)-[:VISITED]->(provider:Provider)<-[:VISITED]-(p2)
WHERE p1 <> p2
RETURN p1.name AS Patient1, p2.name AS Patient2, d.diagnosisName, provider.name AS SharedProvider
```

This more complex query finds pairs of patients who share both a diagnosis and a provider, filtering out self-matches with the `WHERE` clause.

**Example 3: Calculate the average number of medications per patient**
```cypher
MATCH (p:Patient)-[:TAKES_MEDICATION]->(m:Medication)
RETURN p.name, COUNT(m) AS MedicationCount
ORDER BY MedicationCount DESC
```

Graph query languages typically support aggregation functions (COUNT, AVG, SUM, MAX, MIN), ordering, filtering, and many other operations familiar from SQL, but with the added power of relationship traversal and pattern matching.

### Query Performance Advantages

Graph databases achieve their performance advantages through architectural choices fundamentally different from relational systems:

| Aspect | Relational Database | Graph Database |
|--------|---------------------|----------------|
| **Relationship representation** | Foreign keys in tables | Direct pointer references |
| **Multi-hop query mechanism** | Multiple JOIN operations | Direct edge traversal |
| **Performance scaling** | Degrades exponentially with hops | Near-constant regardless of hops |
| **Index usage** | Index lookup required for each JOIN | Index-free adjacency |
| **Query time for 3-hop query** | Seconds to minutes (depends on data size) | Milliseconds |

<details markdown="1">
    <summary>Query Performance Comparison Chart: RDBMS vs Graph Database</summary>
    Type: chart

    Chart type: Line chart with logarithmic Y-axis

    Purpose: Demonstrate the exponential performance degradation of relational database JOIN queries compared to the constant-time traversal performance of graph databases as relationship depth increases

    X-axis: "Number of Relationship Hops" (1, 2, 3, 4, 5, 6)
    Y-axis: "Query Response Time (milliseconds)" - Logarithmic scale from 1ms to 100,000ms

    Data series:
    1. RDBMS with JOINs (red line with square markers):
       - 1 hop: 15ms
       - 2 hops: 180ms
       - 3 hops: 3,200ms
       - 4 hops: 52,000ms
       - 5 hops: 850,000ms (14+ minutes, often times out)
       - 6 hops: Data point not shown (query timeout)

    2. Graph Database (green line with circle markers):
       - 1 hop: 3ms
       - 2 hops: 5ms
       - 3 hops: 8ms
       - 4 hops: 11ms
       - 5 hops: 14ms
       - 6 hops: 17ms

    Title: "Multi-Hop Query Performance: Relational vs Graph Database"
    Subtitle: "Healthcare Dependency Analysis (100,000 patient records)"

    Legend:
    - Position: Top-right
    - Entries: "RDBMS (JOIN operations)", "Graph DB (Index-free adjacency)"

    Annotations:
    - Arrow pointing to RDBMS line at 4 hops: "Queries often timeout beyond 4 hops"
    - Arrow pointing to graph DB line: "Near-constant performance"
    - Text box at bottom: "Graph databases maintain O(1) traversal time regardless of relationship depth"

    Grid:
    - Horizontal grid lines at each power of 10 on Y-axis
    - Vertical grid lines at each hop on X-axis

    Colors:
    - RDBMS line: Red (#DC3545)
    - Graph DB line: Green (#28A745)
    - Background: White
    - Grid: Light gray (#E0E0E0)

    Styling:
    - Line thickness: 3px
    - Marker size: 8px
    - Font: Sans-serif, 12pt for labels, 14pt for title

    Implementation: Chart.js JavaScript library with logarithmic Y-axis scale
    Canvas size: 800x500px
</details>

## Graph Databases vs Relational Databases

To fully appreciate when and why to use graph databases for healthcare applications, it's essential to understand the fundamental architectural and philosophical differences between graph and relational database systems.

### The Relational Model

**Relational databases** organize data into tables (relations) with rows (records) and columns (attributes). Relationships between entities are represented implicitly through foreign keys—a column in one table that references the primary key of another table. To query related data, relational systems perform JOIN operations that combine rows from multiple tables based on matching foreign key values.

For simple relationships or small datasets, this approach works well. However, as relationships become more complex and queries span multiple levels of indirection, performance degrades significantly. Each JOIN operation requires scanning index structures and matching keys, and these costs compound multiplicatively as query complexity increases.

Consider modeling a patient's complete care network in a relational database: you might have tables for Patients, Providers, Medications, Diagnoses, Facilities, Procedures, Insurance Plans, and Claims. Answering the question "Show me the complete care network for this patient" would require JOINing across all these tables, filtering for the relevant patient ID, and assembling the results—a computationally expensive operation.

### The Graph Database Paradigm

**Graph databases** take a fundamentally different approach: relationships are first-class citizens, stored as direct pointer references between nodes. This architectural choice, called **index-free adjacency**, means that traversing from one node to a connected node is a constant-time operation (O(1))—you simply follow the pointer. No index lookup, no scanning, no matching.

This design paradigm shift yields dramatic performance improvements for relationship-intensive queries. The same "complete care network" query in a graph database becomes a simple traversal operation: start at the patient node and follow all connected edges outward, regardless of how many types of relationships are involved.

Here's a comparison of key characteristics:

| Characteristic | Relational Database | Graph Database |
|----------------|---------------------|----------------|
| **Data model** | Tables with rows and columns | Nodes and edges with properties |
| **Schema** | Rigid schema enforced | Flexible, schema-optional |
| **Relationships** | Foreign keys (implicit) | Edges with types (explicit) |
| **Relationship queries** | JOIN operations | Direct traversal |
| **Best for** | Transactional data, reporting | Highly connected data, relationship analysis |
| **Query complexity scaling** | Degrades with relationship depth | Near-constant performance |
| **Typical use cases** | Financial transactions, inventory management | Social networks, recommendation engines, dependency analysis |

### When to Use Each Approach

Both relational and graph databases have appropriate use cases. The choice depends on the nature of your data and the queries you need to perform:

**Use a relational database when:**

- Data is primarily tabular with few relationships
- Relationships are simple and rarely exceed 2-3 levels deep
- Schema is stable and unlikely to change
- Primary operations are CRUD (Create, Read, Update, Delete) on individual records
- Strong ACID guarantees are critical for financial or transactional data
- SQL expertise and tooling are abundant in your organization

**Use a graph database when:**

- Data is highly interconnected with many relationship types
- Queries frequently traverse multiple relationship hops (3+)
- Relationship properties are as important as node properties
- Schema needs to evolve rapidly as requirements change
- Discovering patterns and paths through connections is a primary use case
- Real-time relationship analysis is required (e.g., fraud detection, recommendation engines)

For healthcare applications, graph databases are particularly well-suited because:

- Patient data is inherently interconnected (providers, medications, diagnoses, procedures, facilities, insurance)
- Clinical decision support requires traversing complex relationships (drug interactions, care pathways, comorbidity analysis)
- Healthcare schemas must evolve to accommodate new medical knowledge, regulatory requirements, and data source integrations
- Real-time queries are essential for point-of-care applications
- Relationship context (dates, dosages, outcomes) is as critical as entity attributes

Many organizations adopt a **polyglot persistence** strategy, using both relational databases for transactional systems (billing, scheduling) and graph databases for analytical and relationship-intensive applications (care coordination, population health, fraud detection).

## Data Models and Database Schemas

With foundational graph concepts established, we now turn to the practical work of **data modeling**—the process of designing how your domain's entities and relationships will be represented in the database. A **data model** is the conceptual blueprint defining what types of nodes and edges exist, what properties they have, and how they connect. The **database schema** is the concrete implementation of that model in a specific database system.

### Healthcare Data Modeling Considerations

Designing an effective healthcare graph data model requires balancing several competing concerns:

**1. Semantic clarity**: Node labels and edge types should clearly convey meaning to both developers and healthcare domain experts.

**2. Query performance**: The model should support efficient execution of your most common and critical queries.

**3. Flexibility**: Healthcare data models must accommodate new entity types, relationship types, and properties as medical knowledge advances and regulations change.

**4. Regulatory compliance**: Models must support HIPAA requirements for audit trails, access control, and data provenance.

**5. Integration**: The model must accommodate data from diverse source systems (EHRs, claims systems, lab systems, pharmacy systems) with varying schemas and data quality levels.

**6. Scalability**: As patient populations grow and longitudinal histories accumulate, the model must maintain performance.

### Node Labeling Strategies

When defining node types (labels) for a healthcare graph, several approaches are common:

**Entity-centric labeling**: Create separate labels for each major entity type
- Examples: `Patient`, `Provider`, `Medication`, `Diagnosis`, `Facility`, `Procedure`, `Claim`
- Advantage: Clear semantic meaning, easy to understand
- Disadvantage: Can proliferate labels for similar concepts

**Role-based labeling**: Label nodes by their role in clinical workflows
- Examples: `Person`, `ClinicalEvent`, `Resource`, `Document`
- Advantage: Reduces label proliferation
- Disadvantage: Less semantic clarity

**Hybrid approach**: Use multiple labels per node to capture both entity type and roles
- Example: A node might have labels `Person`, `Patient`, and `InsurancePolicyHolder`
- Advantage: Flexible and expressive
- Disadvantage: Can lead to confusion about which label to use for queries

For most healthcare applications, an **entity-centric approach with occasional multiple labels** provides the best balance of clarity and flexibility.

### Edge Type Design

Relationship types (edge types) should be:

- **Verb phrases**: Name edges as actions or relationships (e.g., `PRESCRIBED`, `DIAGNOSED_WITH`, `WORKS_AT`, `TREATS`)
- **Semantically meaningful**: The edge type alone should convey the nature of the relationship
- **Consistently directional**: Establish conventions for edge direction (e.g., always point from actor to object: `Provider` -[:PRESCRIBED]-> `Medication`)
- **Granular enough**: Different relationship semantics should have different edge types (`PRESCRIBED` vs `TOOK` vs `ADMINISTERED`)

### Sample Healthcare Graph Schema

Here's a simplified but realistic schema for a healthcare graph database:

**Node Labels:**
- `Patient`: Individual receiving care
- `Provider`: Healthcare professional (physician, nurse, specialist)
- `Facility`: Physical location (hospital, clinic, urgent care)
- `Diagnosis`: Medical condition or disease
- `Medication`: Pharmaceutical drug
- `Procedure`: Medical procedure or intervention
- `Claim`: Insurance claim
- `Plan`: Insurance plan or policy

**Edge Types:**
- `Patient` -[:HAS_CONDITION]-> `Diagnosis`
- `Provider` -[:DIAGNOSED]-> `Diagnosis`
- `Provider` -[:PRESCRIBED]-> `Medication`
- `Patient` -[:TAKES_MEDICATION]-> `Medication`
- `Medication` -[:TREATS]-> `Diagnosis`
- `Patient` -[:UNDERWENT]-> `Procedure`
- `Provider` -[:PERFORMED]-> `Procedure`
- `Provider` -[:WORKS_AT]-> `Facility`
- `Patient` -[:VISITED]-> `Facility`
- `Claim` -[:FOR_PATIENT]-> `Patient`
- `Claim` -[:SUBMITTED_BY]-> `Provider`
- `Claim` -[:COVERED_BY]-> `Plan`

This schema enables queries such as:

- "Show all medications treating a specific condition"
- "Find all providers who have performed a specific procedure at a given facility"
- "Identify patients taking multiple medications that treat the same condition"
- "Calculate the average claim amount for procedures performed at different facilities"

<details markdown="1">
    <summary>Healthcare Data Model Implementation Workflow</summary>
    Type: workflow

    Purpose: Illustrate the step-by-step process of implementing a healthcare graph data model from conceptual design through deployment

    Visual style: Flowchart with BPMN-style notation (rectangles for tasks, diamonds for decisions, rounded rectangles for events)

    Swimlanes (vertical divisions):
    - Business/Clinical Stakeholders
    - Data Architects
    - Development Team
    - Database Administrators
    - Compliance/Security Team

    Steps:

    1. **Start Event** (rounded rectangle, green): "Healthcare Data Modeling Project Initiated"
       Swimlane: Business/Clinical Stakeholders
       Hover text: "Project sponsor identifies need for graph database to support clinical decision support and care coordination"

    2. **Task** (rectangle, light blue): "Identify Key Entities and Relationships"
       Swimlane: Business/Clinical Stakeholders
       Hover text: "Clinical SMEs identify critical entities (patients, providers, medications, diagnoses) and their relationships"

    3. **Task** (rectangle, light blue): "Define Node Labels and Properties"
       Swimlane: Data Architects
       Hover text: "Data architects translate business entities into node labels (Patient, Provider, Medication) with appropriate properties"

    4. **Task** (rectangle, light blue): "Define Edge Types and Properties"
       Swimlane: Data Architects
       Hover text: "Define relationship types (PRESCRIBED, DIAGNOSED_WITH, TREATS) with contextual properties (dates, quantities)"

    5. **Decision Diamond** (yellow): "Schema Supports Key Queries?"
       Swimlane: Data Architects
       Hover text: "Validate that the schema can efficiently answer priority use cases like drug interaction checks and care pathway analysis"
       - If NO → Return to Step 3
       - If YES → Continue to Step 6

    6. **Task** (rectangle, light blue): "Implement Data Model in Graph Database"
       Swimlane: Development Team
       Hover text: "Create database schema, constraints, and indexes in Neo4j or chosen graph database platform"

    7. **Task** (rectangle, light blue): "Develop ETL Pipelines"
       Swimlane: Development Team
       Hover text: "Build data ingestion pipelines to populate graph from EHR, claims, and pharmacy source systems"

    8. **Task** (rectangle, light blue): "Conduct Security Review"
       Swimlane: Compliance/Security Team
       Hover text: "Verify HIPAA compliance, access controls, audit logging, and encryption requirements are met"

    9. **Decision Diamond** (yellow): "Security Compliant?"
       Swimlane: Compliance/Security Team
       Hover text: "Ensure all HIPAA and organizational security policies are satisfied"
       - If NO → Return to Step 6
       - If YES → Continue to Step 10

    10. **Task** (rectangle, light blue): "Load Test Data"
        Swimlane: Development Team
        Hover text: "Populate database with representative test data for performance and functional testing"

    11. **Task** (rectangle, light blue): "Execute Performance Testing"
        Swimlane: Database Administrators
        Hover text: "Run benchmark queries to validate response times meet SLA requirements for clinical applications"

    12. **Decision Diamond** (yellow): "Performance Acceptable?"
        Swimlane: Database Administrators
        Hover text: "Verify multi-hop traversal queries execute in <100ms for real-time clinical decision support"
        - If NO → Optimize indexes/schema → Return to Step 6
        - If YES → Continue to Step 13

    13. **Task** (rectangle, light blue): "Deploy to Production"
        Swimlane: Database Administrators
        Hover text: "Deploy graph database to production environment with monitoring and backup configurations"

    14. **Task** (rectangle, light blue): "Establish Monitoring and Maintenance"
        Swimlane: Database Administrators
        Hover text: "Configure query performance monitoring, alerting, and regular maintenance schedules"

    15. **End Event** (rounded rectangle, green): "Healthcare Graph Database Operational"
        Swimlane: Database Administrators
        Hover text: "Graph database is live and supporting clinical applications"

    Color coding:
    - Start/End events: Green
    - Task rectangles: Light blue
    - Decision diamonds: Yellow
    - Rework/iteration paths: Dotted orange arrows
    - Primary flow: Solid black arrows

    Annotations:
    - Add time estimates for each phase (e.g., "2-3 weeks" under Step 2)
    - Include note: "Iterate as needed—data models evolve with requirements"

    Implementation: BPMN diagram tool (Camunda Modeler, draw.io with BPMN shapes, or similar)
    Canvas size: 1200x800px
</details>

## Summary and Key Takeaways

This chapter has introduced the foundational concepts necessary for understanding and working with graph databases in healthcare contexts. Let's recap the key ideas:

**Graph fundamentals:**
- Graphs consist of **nodes** (entities) and **edges** (relationships)
- Both nodes and edges can have **properties** (key-value pairs storing attributes)
- Edges are **directed**, flowing from a source node to a target node
- **Directed Acyclic Graphs (DAGs)** prohibit cycles and are useful for hierarchical and temporal relationships

**Labeled Property Graph model:**
- Nodes have **labels** indicating their type
- Edges have **types** naming the relationship
- The LPG model is the dominant graph database paradigm, offering flexibility and expressiveness ideal for complex domains like healthcare

**Graph operations:**
- **Graph traversal** is the process of following edges to discover patterns
- **Graph paths** are sequences of nodes connected by edges
- Graph databases achieve constant-time traversal through **index-free adjacency**
- **Graph queries** use declarative languages (Cypher, Gremlin, GQL) for pattern matching

**Comparative advantages:**
- Graph databases excel at relationship-intensive queries involving multiple hops
- Relational databases perform better for simple tabular data and transactional workloads
- Healthcare applications benefit significantly from graph databases due to the highly interconnected nature of clinical data

**Data modeling:**
- Effective healthcare graph schemas balance semantic clarity, query performance, flexibility, and regulatory compliance
- Node labels represent entity types (Patient, Provider, Medication)
- Edge types represent relationships (PRESCRIBED, DIAGNOSED_WITH, TREATS)
- Schema design should support your most critical use cases while remaining adaptable to future requirements

With these fundamentals established, you are now prepared to explore specific healthcare data modeling patterns, query techniques, and advanced graph database features in subsequent chapters. The concepts introduced here—nodes, edges, properties, traversal, and schema design—will serve as the building blocks for all the sophisticated healthcare applications we'll examine throughout this course.
