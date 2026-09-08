# Quiz: Foundations of Graph Structures

Test your understanding of graph theory vocabulary and structures with these review questions.

---

#### 1. What are the two fundamental building blocks used to represent things and the connections between them in a graph?

<div class="upper-alpha" markdown>
1. Tables and foreign keys
2. Nodes and edges
3. Classes and objects
4. Rows and columns
</div>

??? question "Show Answer"
    The correct answer is **B**. A graph is made of nodes (the "things," sometimes called vertices) and edges (the connections between them). This two-part vocabulary is the foundation for every graph structure covered later in the book. Tables and foreign keys (A) describe relational storage, not graphs. Classes and objects (C) belong to object-oriented programming. Rows and columns (D) describe tabular, not graph, data.

    **Concept Tested:** Node

---

#### 2. A node's label and a node's properties serve two different purposes in a labeled property graph. Which statement correctly distinguishes the two?

<div class="upper-alpha" markdown>
1. A label and a property are two names for the exact same concept
2. A label only applies to edges, while properties only apply to nodes
3. A label defines what kind of thing a node is, while properties store facts about that specific instance
4. A label stores factual data about an instance, while properties define its type
</div>

??? question "Show Answer"
    The correct answer is **C**. A label (such as `Patient` or `Provider`) tells you what kind of thing a node is, while properties (such as `patient_id` or `date_of_birth`) store facts about that specific instance. Option A incorrectly merges two distinct ideas. Option B is wrong because both nodes and edges can carry labels and properties. Option D reverses the correct definitions of label and property.

    **Concept Tested:** Node Property

---

#### 3. Why is the `TREATED_BY` relationship between a patient and a provider modeled as a directed edge rather than an undirected one?

<div class="upper-alpha" markdown>
1. The relationship only makes logical sense in one direction, from patient to provider
2. Directed edges are required whenever a node has more than one property
3. Undirected edges cannot be stored in a labeled property graph
4. Directed edges are always faster to query than undirected edges
</div>

??? question "Show Answer"
    The correct answer is **A**. A directed graph is used when a relationship only makes sense in one direction — it is meaningful to say a patient is treated by a provider, but not the reverse. Option B confuses node properties with edge direction, which are unrelated concepts. Option C is false; undirected edges are fully supported in labeled property graphs. Option D is a performance claim not supported by the chapter's content.

    **Concept Tested:** Directed Graph

---

#### 4. In a weighted graph, what does the numeric value attached to an edge typically represent?

<div class="upper-alpha" markdown>
1. The number of properties stored on the connected nodes
2. The order in which the edge was created
3. A count of how many times a traversal algorithm has visited the edge
4. A quantity such as cost, distance, or strength of connection
</div>

??? question "Show Answer"
    The correct answer is **D**. A weighted graph attaches a numeric weight to an edge to represent a quantity like distance, cost, or connection strength — for example, the 4.2-mile distance between two clinics. Option A confuses node properties with edge weights. Option B and C describe creation order and visit counts, neither of which is what an edge weight represents in this chapter.

    **Concept Tested:** Weighted Graph

---

#### 5. What defines a labeled property graph?

<div class="upper-alpha" markdown>
1. A graph whose nodes and edges are tagged with a type name and enriched with key-value properties
2. A graph in which every node must have an identical set of properties
3. A graph that can only represent healthcare data
4. A graph where edges are not allowed to carry properties
</div>

??? question "Show Answer"
    The correct answer is **C**. A labeled property graph tags nodes and edges with a type name (the label) and enriches them with key-value properties, combining structure with flexible data. Option A describes a rigid, uniform schema, which is the opposite of a property graph's flexibility. Option C is far too narrow — the model applies to any domain. Option D is incorrect because edges can carry properties just as nodes can.

    **Concept Tested:** Labeled Property Graph

---

#### 6. Why does a graph database typically answer a multi-hop relationship question faster than a relational database as the number of hops increases?

<div class="upper-alpha" markdown>
1. It stores relationships as directly followable pointers instead of reconstructing them through joins at query time
2. It stores all data in a single unindexed table
3. It eliminates the need for node or edge properties
4. It converts every query into a series of nested SQL joins automatically
</div>

??? question "Show Answer"
    The correct answer is **A**. A graph database stores each relationship as a first-class, directly followable connection, so traversing multiple hops means following pointers rather than recomputing matches through chained joins. Option B misdescribes graph storage as unindexed. Option C is false since properties remain central to the model. Option D describes relational query processing, which is precisely what graph traversal avoids.

    **Concept Tested:** Graph Database

---

#### 7. Which statement correctly describes the difference between breadth-first traversal (BFS) and depth-first traversal (DFS)?

<div class="upper-alpha" markdown>
1. BFS only works on undirected graphs, while DFS only works on directed graphs
2. BFS and DFS always visit nodes in the exact same order
3. BFS requires a directed acyclic graph, while DFS does not
4. BFS visits all of a node's immediate neighbors before moving outward, while DFS follows one path as far as possible before backtracking
</div>

??? question "Show Answer"
    The correct answer is **D**. BFS explores level by level, visiting every immediate neighbor before moving further outward, while DFS commits to one path fully before backtracking to explore another branch. Option A is false; both strategies apply to directed and undirected graphs. Option B contradicts the chapter's traced example, which shows different visit orders for the same graph. Option C incorrectly ties BFS specifically to acyclic graphs.

    **Concept Tested:** Breadth-First Traversal

---

#### 8. Why do referral networks and care pathways benefit from being modeled as a directed acyclic graph (DAG)?

<div class="upper-alpha" markdown>
1. A DAG requires every edge to carry a numeric weight
2. A DAG guarantees that no node can be reached from itself, so traversal that follows edge direction is guaranteed to terminate
3. A DAG allows nodes to have an unlimited number of labels
4. A DAG converts directed edges into undirected ones automatically
</div>

??? question "Show Answer"
    The correct answer is **B**. Because a directed acyclic graph contains no cycles, a traversal that follows edge direction cannot loop back on a node it has already visited, guaranteeing that concepts like "what comes next" are well-defined and that traversal terminates. Option A confuses DAGs with weighted graphs. Option C is unrelated to acyclicity. Option D is false; a DAG's edges remain directed.

    **Concept Tested:** Directed Acyclic Graph

---

#### 9. Given the referral chain Maria Chen → Dr. Patel → Riverside Clinic, and Dr. Patel → Dr. Osei → Downtown Specialty Center → Dana Reyes, which nodes are visited at level 1 of a breadth-first traversal starting from Maria Chen?

<div class="upper-alpha" markdown>
1. Riverside Clinic and Dr. Osei
2. Downtown Specialty Center and Dana Reyes
3. Only Dr. Patel
4. Maria Chen and Dr. Patel
</div>

??? question "Show Answer"
    The correct answer is **C**. Level 0 of a BFS traversal is the starting node itself, Maria Chen. Level 1 visits every node exactly one edge away from Maria Chen, which is only Dr. Patel. Riverside Clinic and Dr. Osei (A) are two edges away, making them level 2. Downtown Specialty Center and Dana Reyes (B) are three edges away, making them level 3. Option D incorrectly includes the starting node itself in level 1.

    **Concept Tested:** Breadth-First Traversal

---

#### 10. Why must both BFS and DFS traversal algorithms keep track of which nodes have already been visited?

<div class="upper-alpha" markdown>
1. To calculate the total number of properties stored in the graph
2. To determine which nodes should be assigned a directed edge instead of an undirected one
3. To convert the graph into a labeled property graph before traversal begins
4. To avoid re-processing the same node repeatedly if the underlying graph contains a cycle
</div>

??? question "Show Answer"
    The correct answer is **D**. Tracking visited nodes prevents infinite reprocessing when a graph contains a cycle, since a node could otherwise be revisited endlessly by following edges back to it. Option A is unrelated; counting properties has nothing to do with visited-node tracking. Option B misapplies visited-node tracking to edge direction assignment. Option C confuses traversal bookkeeping with graph model conversion.

    **Concept Tested:** Graph Traversal

---
