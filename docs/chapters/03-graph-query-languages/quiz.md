# Quiz: Graph Query Languages and Technologies

Test your understanding of graph query languages with these questions.

---

#### 1. What is Cypher?

<div class="upper-alpha" markdown>
1. A relational database management system
2. A declarative graph query language designed for pattern matching
3. A programming language for web development
4. A type of encryption algorithm
</div>

??? question "Show Answer"
    The correct answer is **B**. Cypher is a declarative graph query language originally developed for Neo4j, designed specifically for pattern matching in graph databases. It uses ASCII-art syntax to describe patterns of nodes and relationships, making queries intuitive and readable. Option A describes RDBMSs. Options C and D are unrelated technologies.

    **Concept Tested:** Cypher Query Language

    **See:** [Cypher Query Language](index.md#cypher-query-language)

---

#### 2. What is the primary purpose of graph pattern matching?

<div class="upper-alpha" markdown>
1. To encrypt healthcare data
2. To delete all nodes in a database
3. To convert graphs to tables
4. To find subgraphs that match specified node and relationship patterns
</div>

??? question "Show Answer"
    The correct answer is **D**. Graph pattern matching is the process of finding all subgraphs within a graph database that match a specified pattern of nodes, relationships, and properties. This is the fundamental operation underlying most graph queries, enabling questions like "find all patients treated by Dr. Smith" or "what medications are prescribed for diabetes?"

    **Concept Tested:** Graph Pattern Matching

    **See:** [Graph Pattern Matching](index.md#graph-pattern-matching-the-foundation)

---

#### 3. Which of the following Cypher queries would find all patients who have a specific diagnosis?

<div class="upper-alpha" markdown>
1. `SELECT * FROM patients WHERE diagnosis='Diabetes'`
2. `MATCH (p:Patient)-[:HAS_DIAGNOSIS]->(d:Diagnosis {name:'Diabetes'}) RETURN p`
3. `DELETE (p:Patient) WHERE p.diagnosis='Diabetes'`
4. `CREATE TABLE patients WITH diagnosis`
</div>

??? question "Show Answer"
    The correct answer is **B**. The MATCH clause in Cypher uses pattern matching to find Patient nodes connected to Diagnosis nodes via HAS_DIAGNOSIS relationships where the diagnosis name is 'Diabetes'. Option A is SQL syntax. Option C would delete data. Option D is DDL for table creation.

    **Concept Tested:** Cypher Query Language, Graph Pattern Matching

    **See:** [Cypher Query Language](index.md#cypher-query-language)

---

#### 4. What is a graph index used for?

<div class="upper-alpha" markdown>
1. To slow down query performance intentionally
2. To delete duplicate data
3. To encrypt sensitive information
4. To speed up lookups of nodes or edges by specific properties
</div>

??? question "Show Answer"
    The correct answer is **D**. Graph indexes accelerate query performance by creating efficient lookup structures for specific node or edge properties. For example, indexing patient IDs enables fast retrieval of specific patient records without scanning all nodes. Option A is the opposite of the purpose. Options B and C describe different functionalities.

    **Concept Tested:** Graph Index

    **See:** [Graph Indexes](index.md#indexing-strategies)

---

#### 5. What is GQL?

<div class="upper-alpha" markdown>
1. Graph Query Language, an international standard for querying property graphs
2. A proprietary database product
3. A machine learning algorithm
4. A healthcare coding system
</div>

??? question "Show Answer"
    The correct answer is **A**. GQL (Graph Query Language) is an international standard (ISO/IEC 39075) for querying property graphs, developed to provide vendor-neutral syntax similar to how SQL standardizes relational queries. It aims to improve portability across different graph database systems. Options B, C, and D are incorrect.

    **Concept Tested:** GQL Standard

    **See:** [GQL Standard](index.md#gql-standard)

---

#### 6. Given a query that needs to find all patients within 3 hops of a specific provider, what type of query is this?

<div class="upper-alpha" markdown>
1. Aggregate query
2. Delete query
3. Path query
4. Schema query
</div>

??? question "Show Answer"
    The correct answer is **C**. A path query traverses relationships across multiple hops to find nodes at specific distances or along particular paths. Finding "all patients within 3 hops" requires traversing up to 3 edges from the provider node. Option A computes statistics. Options B and D are unrelated.

    **Concept Tested:** Path Query

    **See:** [Path Queries](index.md#path-queries)

---

#### 7. How does query optimization improve graph query performance?

<div class="upper-alpha" markdown>
1. By making queries run slower
2. By deleting all indexes
3. By reordering operations, using indexes, and pushing down filters to minimize intermediate results
4. By converting all data to CSV files
</div>

??? question "Show Answer"
    The correct answer is **C**. Graph query optimization involves techniques like reordering traversal operations, utilizing indexes to start from selective nodes, pushing filters down to reduce intermediate result sets, and choosing efficient join strategies. These optimizations can dramatically improve query performance on large graphs. Options A, B, and D would harm performance.

    **Concept Tested:** Graph Query Optimization

    **See:** [Query Optimization](index.md#graph-query-optimization)

---

#### 8. What is an aggregate query in a graph database?

<div class="upper-alpha" markdown>
1. A query that deletes nodes
2. A query that creates new relationships
3. A query that computes summary statistics like COUNT, AVG, or SUM across nodes or edges
4. A query that renames properties
</div>

??? question "Show Answer"
    The correct answer is **C**. Aggregate queries compute summary statistics across multiple graph elements, such as counting the number of patients per provider, calculating average medication costs, or summing total claims amounts. These use aggregate functions like COUNT(), AVG(), SUM(), MIN(), and MAX(). Options A, B, and D describe different operations.

    **Concept Tested:** Aggregate Query

    **See:** [Aggregate Queries](index.md#aggregate-queries)

---

#### 9. Which query language is specifically designed for TigerGraph?

<div class="upper-alpha" markdown>
1. Cypher
2. SQL
3. GQL
4. GSQL
</div>

??? question "Show Answer"
    The correct answer is **D**. GSQL is the graph query language developed specifically for TigerGraph database. It combines graph pattern matching with procedural logic and is designed for high-performance analytics on large-scale graphs. Cypher (A) is for Neo4j, SQL (B) is for relational databases, and GQL (C) is a cross-platform standard.

    **Concept Tested:** GSQL

    **See:** [GSQL](index.md#gsql)

---

#### 10. Analyze this scenario: A hospital query takes 30 seconds to find all patients connected to a specific provider through any path. After adding an index on provider IDs and restructuring the query to start from the provider node, it now takes 2 seconds. What optimization principle was applied?

<div class="upper-alpha" markdown>
1. The query was made slower intentionally
2. Selective starting points and indexing reduced the search space
3. All data was deleted
4. The database was converted to a relational model
</div>

??? question "Show Answer"
    The correct answer is **B**. The optimization applied two key principles: (1) indexing provider IDs enables fast lookup of the starting node, and (2) starting traversal from the selective provider node (fewer providers than patients) reduces the search space compared to scanning all patients. These are fundamental graph query optimization techniques. Options A, C, and D don't describe the actual improvement.

    **Concept Tested:** Graph Query Optimization, Graph Index, Query Performance

    **See:** [Query Optimization](index.md#graph-query-optimization)
