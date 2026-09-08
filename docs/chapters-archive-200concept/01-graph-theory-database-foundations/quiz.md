# Quiz: Graph Theory and Database Foundations

Test your understanding of graph theory and database foundations with these questions.

---

#### 1. What is a node in graph theory?

<div class="upper-alpha" markdown>
1. A connection between two entities
2. A discrete entity or object in the domain
3. A property attached to a relationship
4. A type of database query
</div>

??? question "Show Answer"
    The correct answer is **B**. A node (also called a vertex) represents a discrete entity or object in your domain. In healthcare applications, nodes commonly represent patients, providers, facilities, diagnoses, medications, procedures, and other entities. Option A describes an edge, not a node. Options C and D are unrelated concepts.

    **Concept Tested:** Node

    **See:** [Nodes and Edges](index.md#the-building-blocks-nodes-and-edges)

---

#### 2. Which statement best describes the relationship between graph databases and relational databases for healthcare data?

<div class="upper-alpha" markdown>
1. Graph databases and relational databases are completely identical in structure
2. Graph databases treat relationships as first-class entities while relational databases use foreign keys
3. Relational databases are always faster than graph databases for all query types
4. Graph databases cannot store properties on nodes or edges
</div>

??? question "Show Answer"
    The correct answer is **B**. Graph databases treat relationships (edges) as first-class data structures with their own properties and identity, whereas relational databases implement relationships implicitly through foreign key references in tables. This fundamental difference makes graph databases particularly well-suited for healthcare's interconnected data. Option A is false as they have different structures. Option C is incorrect because graph databases excel at relationship-heavy queries. Option D is false—properties are a core feature of labeled property graphs.

    **Concept Tested:** Graph Database, Relational Database

    **See:** [Introduction](index.md#introduction)

---

#### 3. What is a Labeled Property Graph?

<div class="upper-alpha" markdown>
1. A graph that only contains labels without any data
2. A relational database table with a graph column type
3. A graph structure where nodes and edges can have types (labels) and key-value properties
4. A graph where all nodes must have identical properties
</div>

??? question "Show Answer"
    The correct answer is **C**. A labeled property graph is a graph structure where nodes and edges can have labels (types) that categorize them and properties (key-value pairs) that describe them. This flexibility allows nodes of the same label to have different properties. Option A misunderstands what properties are. Option B confuses graph databases with relational systems. Option D is incorrect because not all nodes need identical properties.

    **Concept Tested:** Labeled Property Graph

    **See:** [Properties](index.md#properties-adding-information-to-nodes-and-edges)

---

#### 4. In a healthcare graph, which would be the most appropriate use of edge properties?

<div class="upper-alpha" markdown>
1. Storing a patient's date of birth
2. Defining what type of entity a node represents
3. Storing the hospital's address
4. Recording the prescription date and dosage on a PRESCRIBED relationship
</div>

??? question "Show Answer"
    The correct answer is **D**. Edge properties store information about the relationship itself. For a PRESCRIBED edge connecting a Provider to a Medication, properties like prescriptionDate, dosage, durationDays, and refillsAllowed capture contextual details about that specific prescribing event. Options A and C describe node properties (attributes of entities). Option B describes node labels, not properties.

    **Concept Tested:** Edge Property

    **See:** [Edge Properties](index.md#edge-properties)

---

#### 5. What distinguishes a directed graph from other graph types?

<div class="upper-alpha" markdown>
1. Each edge has a specific direction from source to target node
2. All nodes must form a circular pattern
3. Relationships are always bidirectional
4. Nodes cannot have properties
</div>

??? question "Show Answer"
    The correct answer is **A**. In a directed graph, each edge has a specific direction, flowing from a source (start) node to a target (end) node. This directionality is semantically meaningful—for example, "Patient HAS_DIAGNOSIS diabetes" makes sense, while "diabetes HAS_DIAGNOSIS Patient" does not. Option B is incorrect as graphs don't require circular patterns. Option C is wrong because directed edges have one direction. Option D is false—nodes can have properties.

    **Concept Tested:** Directed Graph

    **See:** [Directed Graphs](index.md#directed-graphs-and-graph-direction)

---

#### 6. Why are Directed Acyclic Graphs (DAGs) particularly useful for modeling clinical workflows?

<div class="upper-alpha" markdown>
1. Because all healthcare data is inherently circular
2. Because DAGs allow unlimited cycles for flexibility
3. Because patient care always moves forward through stages without returning to earlier stages
4. Because they eliminate the need for node properties
</div>

??? question "Show Answer"
    The correct answer is **C**. DAGs prohibit cycles, meaning you cannot follow a path that returns to the starting node. This matches clinical workflows where a patient progresses through stages (admission → triage → examination → diagnosis → treatment → discharge) without cycling back within a single encounter. Option A contradicts the acyclic nature. Option B is incorrect—DAGs specifically prohibit cycles. Option D is unrelated to DAG structure.

    **Concept Tested:** Directed Acyclic Graph

    **See:** [Directed Acyclic Graphs](index.md#directed-acyclic-graphs-dags)

---

#### 7. Given a scenario where you need to find all medications prescribed to patients with diabetes, which graph operation would you primarily use?

<div class="upper-alpha" markdown>
1. Graph traversal following edges from Patient to Diagnosis and then to Medication nodes
2. Creating new nodes for each query
3. Deleting all edges in the database
4. Converting the graph to a relational table
</div>

??? question "Show Answer"
    The correct answer is **A**. Graph traversal is the operation of following edges from node to node to explore relationships. To find medications for diabetic patients, you would start with Patient nodes that have a HAS_DIAGNOSIS edge to a diabetes Diagnosis node, then follow PRESCRIBED edges to Medication nodes. Option B doesn't answer queries. Option C would destroy data. Option D defeats the purpose of using a graph database.

    **Concept Tested:** Graph Traversal

    **See:** [Graph Traversal](index.md#graph-traversal)

---

#### 8. Which of the following is a valid node property for a Patient node?

<div class="upper-alpha" markdown>
1. Edge direction
2. Graph schema
3. VISITED_PROVIDER
4. firstName: "Sarah"
</div>

??? question "Show Answer"
    The correct answer is **D**. Node properties are key-value pairs that store attributes describing the entity. "firstName: Sarah" is a valid property for a Patient node. Options A and B are graph-level concepts, not properties of individual nodes. Option C is an edge label (relationship type), not a node property.

    **Concept Tested:** Node Property

    **See:** [Node Properties](index.md#node-properties)

---

#### 9. How does the flexibility of graph database schemas benefit healthcare data modeling compared to rigid relational schemas?

<div class="upper-alpha" markdown>
1. It requires all data to follow identical structures
2. It prevents any data validation
3. It eliminates the need for relationships between entities
4. It allows different patients to have different properties without schema changes
</div>

??? question "Show Answer"
    The correct answer is **D**. Graph databases offer schema flexibility, meaning nodes of the same label (e.g., Patient) can have different properties without requiring schema modifications. This accommodates healthcare's diverse data where one patient might have properties for "pacemaker" while another doesn't, without restructuring the entire database. Option A describes rigid schemas. Option B is incorrect—validation is still possible. Option C misunderstands graphs—relationships are central.

    **Concept Tested:** Database Schema, Graph Database

    **See:** [Properties](index.md#properties-adding-information-to-nodes-and-edges)

---

#### 10. Analyze the following scenario: A hospital wants to model patient referrals between specialists. Dr. Martinez refers patients to Dr. Kim, who refers some patients to Dr. Patel, who occasionally refers back to Dr. Martinez. What graph characteristic does this scenario demonstrate?

<div class="upper-alpha" markdown>
1. This is a Directed Acyclic Graph because no cycles exist
2. This scenario cannot be modeled in a graph database
3. This requires an undirected graph only
4. This is a directed graph with cycles, not a DAG
</div>

??? question "Show Answer"
    The correct answer is **D**. The scenario describes a directed graph with a cycle: Martinez → Kim → Patel → Martinez forms a closed loop. This violates the "acyclic" requirement of DAGs, which prohibit cycles. The referral network is still a valid directed graph, just not a DAG. Option A is incorrect because the cycle exists. Option B is wrong—graphs easily model this. Option C is incorrect because referral direction matters (who refers to whom).

    **Concept Tested:** Directed Acyclic Graph, Directed Graph

    **See:** [Directed Acyclic Graphs](index.md#directed-acyclic-graphs-dags)
