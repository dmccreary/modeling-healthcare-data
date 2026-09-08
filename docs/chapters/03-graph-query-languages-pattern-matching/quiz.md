# Quiz: Graph Query Languages and Pattern Matching

Test your understanding of graph query languages and pattern matching with these review questions.

---

#### 1. What is Cypher, and what role has it played in the graph query language landscape?

<div class="upper-alpha" markdown>
1. An imperative, procedural language used only for bulk data loading
2. A declarative graph query language from Neo4j that heavily influenced the ISO GQL Standard
3. A file format used to serialize graphs for archiving
4. A relational query language that was later adapted for RDF triple stores
</div>

??? question "Show Answer"
    The correct answer is **B**. Cypher is Neo4j's declarative graph query language, meaning it describes the pattern to be matched rather than the steps to find it, and it heavily influenced the design of the ISO-standardized GQL Standard. Option A confuses Cypher with an imperative loading tool. Option C misdescribes Cypher as a file format rather than a query language. Option D incorrectly ties Cypher's origin to relational or RDF systems.

    **Concept Tested:** Cypher Query Language

---

#### 2. What is the purpose of the `MATCH` clause in a Cypher query?

<div class="upper-alpha" markdown>
1. It permanently deletes nodes that do not fit a pattern
2. It creates a new index on a node property
3. It sorts the final result set in ascending or descending order
4. It describes a pattern of nodes and edges to find in the graph
</div>

??? question "Show Answer"
    The correct answer is **D**. The `MATCH` clause describes the shape of nodes and edges to search for in the graph, using parentheses for nodes and arrows for edges, which is the core mechanism of graph pattern matching. Option A confuses matching with deletion, which is a separate operation. Option B describes index creation, an unrelated schema operation. Option C describes `ORDER BY`, not `MATCH`.

    **Concept Tested:** Graph Pattern Matching

---

#### 3. What is bulk import in the context of graph data loading?

<div class="upper-alpha" markdown>
1. Loading a large batch of nodes and edges from files in one operation, avoiding per-row overhead
2. A method for encrypting sensitive patient data before it enters the graph
3. A query optimization technique that adds an index to a node property
4. A process that converts a graph database into a relational one
</div>

??? question "Show Answer"
    The correct answer is **A**. Bulk import loads a large batch of nodes and edges from files, commonly CSV, in one operation, which is dramatically faster than inserting records one at a time because it skips per-row overhead such as index maintenance until the batch completes. Option B describes encryption, an unrelated security concern. Option C describes indexing, a separate optimization step. Option D describes an unrelated and implausible database conversion.

    **Concept Tested:** Bulk Import

---

#### 4. What is the primary purpose of defining a uniqueness constraint, such as one on `patient_id`, before running an ETL load?

<div class="upper-alpha" markdown>
1. To make queries run using GSQL's accumulator pattern instead of Cypher
2. To automatically generate a graph visualization of the schema
3. To speed up depth-first traversal specifically
4. To prevent the pipeline from accidentally creating duplicate patient nodes on a re-run
</div>

??? question "Show Answer"
    The correct answer is **D**. A uniqueness constraint on `patient_id` prevents an ETL pipeline from silently creating a second copy of a patient if the load runs more than once, safeguarding data quality. Option A confuses constraints with an unrelated query language choice. Option B misattributes constraint definition to visualization generation. Option C incorrectly ties constraints to a specific traversal strategy.

    **Concept Tested:** Constraint Definition

---

#### 5. Which pairing correctly matches a graph query category with its healthcare example?

<div class="upper-alpha" markdown>
1. Aggregate query: the shortest referral chain from a PCP to a specialist
2. Subgraph query: every node within two hops of a given patient
3. Path query: the average claims cost per provider this quarter
4. Path query: every node within two hops of a given patient
</div>

??? question "Show Answer"
    The correct answer is **B**. A subgraph query asks for an entire connected neighborhood around a starting point, such as every node within two hops of a patient, rather than a single route or a summary statistic. Option A mismatches an aggregate query with a path-finding example. Option C and D each mismatch a path query with an aggregation or a neighborhood example rather than a route between two nodes.

    **Concept Tested:** Subgraph Query

---

#### 6. What architectural feature allows Neo4j's native graph storage to support index-free adjacency?

<div class="upper-alpha" markdown>
1. Every property is stored in a separate relational table
2. Every query is automatically converted to SQL before execution
3. Every node record physically contains direct references to its adjacent relationship records on disk
4. Every node is assigned a random weight to speed up sorting
</div>

??? question "Show Answer"
    The correct answer is **C**. Native graph storage physically stores direct references between adjacent records on disk, so traversing from a node to its neighbors is a pointer dereference rather than a lookup, which is the storage-level mechanism behind index-free adjacency. Option A describes relational storage, the opposite architecture. Options B and D describe fabricated mechanisms not used by graph storage engines.

    **Concept Tested:** Index-Free Adjacency

---

#### 7. How does a GSQL accumulator differ from Cypher's `WITH ... count()` aggregation approach?

<div class="upper-alpha" markdown>
1. A GSQL accumulator updates incrementally during traversal, while Cypher first finds the complete set of matches and aggregates afterward
2. A GSQL accumulator can only be used with undirected graphs
3. Cypher's aggregation happens before the MATCH clause runs
4. GSQL accumulators cannot be attached to nodes, only to edges
</div>

??? question "Show Answer"
    The correct answer is **A**. A GSQL accumulator is a variable attached to a node that updates as the traversal visits it, aggregating during the walk itself, while Cypher's `WITH ... count()` aggregates only after the complete match set has been found. Option B fabricates a restriction not mentioned in the chapter. Option C reverses the actual Cypher execution order. Option D is false since accumulators are described as attached to nodes.

    **Concept Tested:** GSQL

---

#### 8. Why is an ETL pipeline typically needed to get healthcare data into a graph database, rather than a single bulk import step?

<div class="upper-alpha" markdown>
1. Bulk import can only be used with the GQL standard, never with Cypher
2. Real healthcare data rarely arrives graph-ready, so it must be extracted from source systems, transformed into the node-and-edge shape the schema expects, and then loaded
3. ETL pipelines eliminate the need for any graph schema design
4. ETL pipelines convert graph queries into relational joins automatically
</div>

??? question "Show Answer"
    The correct answer is **C**. An ETL pipeline extracts records from source systems such as an EHR or claims warehouse, transforms them into the node-and-edge shape the graph schema expects, and loads the result, because real healthcare data rarely arrives already shaped for a graph. Option A fabricates a restriction on bulk import. Option B is incorrect since schema design decisions still precede an ETL run. Option D confuses ETL with an unrelated query translation process.

    **Concept Tested:** ETL Pipeline

---

#### 9. Given the Cypher pattern `(p:Patient)-[:REFERRED_TO*1..3]->(specialist:Provider)`, what does this pattern match?

<div class="upper-alpha" markdown>
1. Only providers directly referred to by exactly one patient
2. Every patient who has never been referred to a specialist
3. Every provider reachable from a patient by one, two, or three chained REFERRED_TO edges
4. A subgraph query counting the total number of referrals in the system
</div>

??? question "Show Answer"
    The correct answer is **C**. The `*1..3` syntax expresses a variable-length path, matching every provider reachable from a patient by one, two, or three chained `REFERRED_TO` edges in sequence. Option A incorrectly restricts the match to exactly one hop. Option B describes the opposite condition, patients with no referrals. Option D mislabels this path query as an aggregate query, which it is not.

    **Concept Tested:** Path Query

---

#### 10. After adding an index on `Condition.name`, a query's profile changes from `NodeByLabelScan: 480,000 rows examined` to `NodeIndexSeek: 340 rows examined`. What does this change reveal about how the index improved query performance?

<div class="upper-alpha" markdown>
1. The index converted the query into an aggregate query automatically
2. The index removed the need for the WHERE clause entirely
3. The index changed the underlying graph from directed to undirected
4. The index let the database jump directly to matching nodes instead of scanning every node with that label to check its property
</div>

??? question "Show Answer"
    The correct answer is **D**. The dramatic drop in rows examined shows that the index let the database jump directly to nodes matching the filtered property, rather than performing a full label scan that inspects every node with that label before discarding non-matches. Option A misattributes the change to query type conversion. Option B is false since the WHERE-equivalent filter condition still determines which nodes match. Option C is unrelated to indexing.

    **Concept Tested:** Graph Index

---
