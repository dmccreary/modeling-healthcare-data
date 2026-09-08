# Quiz: Data Modeling: Graphs vs. Relational Databases

Test your understanding of relational and graph data modeling concepts with these review questions.

---

#### 1. What is a foreign key in a relational database?

<div class="upper-alpha" markdown>
1. A column in one table that holds the primary-key value of a row in another table, establishing a link without duplicating data
2. A column that must always be encrypted for security purposes
3. A property attached directly to an edge in a graph database
4. A rule that prevents a table from having more than one primary key
</div>

??? question "Show Answer"
    The correct answer is **A**. A foreign key is a column whose value matches the primary key of a row in another table, which is how relational databases represent relationships without a separate relationship object. Option B describes encryption, an unrelated security concern. Option C confuses foreign keys with graph edge properties. Option D misdescribes primary key constraints rather than foreign keys.

    **Concept Tested:** Foreign Key

---

#### 2. What problem does normalization primarily solve in relational database design?

<div class="upper-alpha" markdown>
1. It speeds up every multi-table join automatically
2. It removes the need for a database schema entirely
3. It splits data into related tables so that each fact is stored exactly once, avoiding inconsistent duplicates
4. It converts tables into nodes and edges
</div>

??? question "Show Answer"
    The correct answer is **C**. Normalization splits data across related tables so each fact, such as a provider's specialty, is stored in exactly one place, preventing the data from drifting out of sync when it changes. Option A is incorrect because normalization typically increases the number of joins needed, not the speed of any single join. Option B is false since normalization still operates within a schema. Option D describes a shift to graph modeling, not normalization.

    **Concept Tested:** Normalization

---

#### 3. What does "schema-on-write" mean for a relational database?

<div class="upper-alpha" markdown>
1. The schema is only checked when a table is deleted
2. Every row must conform to the table's column definitions before the database accepts it
3. The database has no fixed structure at all
4. Data is validated only at the moment it is queried, not when it is written
</div>

??? question "Show Answer"
    The correct answer is **B**. Schema-on-write enforces the table's column definitions at the moment data is written, catching errors early but requiring a formal migration whenever the data's shape changes. Option A misplaces the enforcement point at deletion rather than writing. Option C describes a schema-less system, which is not what schema-on-write means. Option D actually describes schema-on-read, the opposite approach.

    **Concept Tested:** Schema-On-Write

---

#### 4. How does an RDF triple store represent a fact such as "Maria Chen is diagnosed with Type 2 Diabetes"?

<div class="upper-alpha" markdown>
1. As a single row in a normalized table with a foreign key to the diagnosis
2. As a node with an arbitrary number of key-value properties
3. As two nodes connected by a weighted edge
4. As a subject-predicate-object triple, with each fact reduced to this same three-part shape
</div>

??? question "Show Answer"
    The correct answer is **D**. An RDF triple store represents every fact as a subject-predicate-object triple, such as subject `MariaChen`, predicate `diagnosedWith`, object `Type2Diabetes`. Option A describes a relational row, not an RDF triple. Option B describes a property graph node rather than the rigid triple format. Option C omits the defining subject-predicate-object structure that distinguishes RDF from a generic weighted edge.

    **Concept Tested:** RDF Triple Store

---

#### 5. Why does relational query cost tend to grow faster than graph traversal cost as the number of relationship hops increases?

<div class="upper-alpha" markdown>
1. Each additional hop typically requires another join that scans and matches rows, while a graph traversal simply follows an already-stored edge
2. Relational databases cannot represent more than three relationships at once
3. Graph databases do not support properties on multi-hop paths
4. Relational databases always use undirected relationships, which are slower to search
</div>

??? question "Show Answer"
    The correct answer is **A**. Each additional relational hop typically adds another join that must scan and match rows across tables, while a graph traversal follows a directly stored edge at roughly constant cost per hop. Option B is factually false; relational databases can represent any number of relationships. Option C misstates graph capabilities. Option D confuses edge direction with query performance, which is unrelated.

    **Concept Tested:** Graph Query

---

#### 6. How does the property graph model relate to the broader term "graph data model"?

<div class="upper-alpha" markdown>
1. They are unrelated; a property graph model cannot use nodes and edges
2. The graph data model only applies to RDF triple stores
3. The property graph model is one specific, widely implemented variant under the broader graph data model umbrella
4. The property graph model came first and the graph data model was derived from it
</div>

??? question "Show Answer"
    The correct answer is **C**. Graph data model is the umbrella term for any data model built from nodes and edges, and the property graph model is a specific variant within that umbrella where both nodes and edges carry a type label and key-value properties. Option A contradicts the chapter's core definition. Option B incorrectly limits the graph data model to RDF. Option D reverses the actual conceptual relationship described in the chapter.

    **Concept Tested:** Property Graph Model

---

#### 7. What is the main practical benefit of schema-on-read when a hospital wants to record a new fact, such as a patient's preferred language, for only some patients?

<div class="upper-alpha" markdown>
1. It requires running an ALTER TABLE statement that locks the table
2. It forces every existing record to be back-filled with a default value
3. A new property can be added to specific nodes without touching any other node or requiring a migration
4. It eliminates the need for any node to ever have properties
</div>

??? question "Show Answer"
    The correct answer is **C**. Under schema-on-read, a new property like `preferred_language` can be added to the specific nodes where it is known, with no migration step and no need to touch nodes that lack the property. Option A and B describe the schema-on-write process this approach avoids. Option D contradicts the entire premise of a property graph, which relies on properties.

    **Concept Tested:** Schema-On-Read

---

#### 8. What defines a multigraph?

<div class="upper-alpha" markdown>
1. A graph that stores data using only subject-predicate-object triples
2. A graph in which every edge must carry a numeric weight
3. A graph that cannot be serialized to a file format
4. A graph that permits more than one edge between the same pair of nodes
</div>

??? question "Show Answer"
    The correct answer is **D**. A multigraph allows multiple parallel edges between the same two nodes, such as separate `TREATED_BY` edges for each encounter date between the same patient and provider. Option A describes RDF triples, not multigraphs. Option B confuses multigraphs with weighted graphs. Option C is unrelated; serialization format has nothing to do with permitting parallel edges.

    **Concept Tested:** Multigraph

---

#### 9. A payer needs to find every provider whose claims were denied for the same reason as a disputed claim filed under the same policy. Using a graph data model, what is the correct traversal to answer this?

<div class="upper-alpha" markdown>
1. Start at the disputed Claim node, follow its denial-reason edge to the Denial_Reason node, follow that edge backward to other claims sharing the reason, then filter to those connected to the same Policy node
2. Join the Claims table to itself twice and then join to Policies
3. Create a new Claims_Under_Review table before running any query
4. Normalize the Claims table into third normal form before traversal is possible
</div>

??? question "Show Answer"
    The correct answer is **A**. The graph traversal starts at the disputed claim, follows the edge to its denial reason, follows that edge backward to other claims sharing the same reason, and filters to those tied to the same policy node, all without any self-join. Option B describes the relational approach requiring a self-join, which the graph traversal avoids. Options C and D describe unrelated relational design actions, not graph traversal steps.

    **Concept Tested:** Graph Query

---

#### 10. Why does the same normalization discipline that keeps relational data consistent also tend to increase the number of joins a typical query requires?

<div class="upper-alpha" markdown>
1. Normalization deletes foreign keys to save storage space
2. Splitting data into more tables to eliminate duplicate facts means that reassembling those facts at query time requires matching rows across more tables
3. Normalization only affects how graphs are serialized to files
4. Normalization requires every table to use schema-on-read instead of schema-on-write
</div>

??? question "Show Answer"
    The correct answer is **B**. Normalization eliminates duplicate data by splitting it across more tables, but that same split means a query spanning multiple entities must reassemble the facts through additional joins, directly trading storage efficiency for query complexity. Option A misdescribes normalization's actual mechanism. Option C confuses normalization with graph serialization, an unrelated concept. Option D is false; normalization does not change the schema enforcement timing.

    **Concept Tested:** Normalization

---
