---
title: Data Modeling: Graphs vs. Relational Databases
description: Contrasts graph data modeling with relational database concepts (schemas, normalization, foreign keys, joins) and introduces schema-on-read, the property graph model, and alternative graph formats.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:08:39
version: 1.10
---

# Data Modeling: Graphs vs. Relational Databases

## Summary

This chapter contrasts graph data modeling with the relational database concepts most students already know, including schemas, normalization, foreign keys, and joins. It introduces schema-on-read versus schema-on-write design, the property graph model, and alternative graph formats such as RDF triple stores and multigraphs. Students finish this chapter able to articulate why graph databases handle deeply interconnected data more naturally than relational tables.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Graph Query | 531 |
| Relational Database | 2 |
| Database Schema | 1 |
| Data Model | 52 |
| Entity-Relationship Model | 1 |
| Normalization | 10 |
| Foreign Key | 2 |
| Join Operation | 1 |
| Schema-On-Read | 2 |
| Schema-On-Write | 1 |
| Graph Data Model | 5 |
| Property Graph Model | 2 |
| RDF Triple Store | 1 |
| Multigraph | 2 |
| Graph Serialization | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Graph Structures](../01-foundations-of-graph-structures/index.md)

---

Chapter 1 gave you the vocabulary of nodes, edges, and properties. Before you
can appreciate why that vocabulary matters, you need a clear picture of the
alternative most of you already know: the relational database. This chapter
puts the two data modeling approaches side by side — table by table, join by
join — so that the advantages of a labeled property graph stop being an
assertion and become something you can demonstrate for yourself.

!!! mascot-welcome "Two Ways to Draw the Same Data"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the dots! In this chapter we take the same handful of healthcare facts and model them two different ways — first as tables, then as a graph — so you can watch, side by side, why one of them starts creaking under the weight of real clinical data. By the end, you will be able to explain exactly where that creaking comes from.

## The Relational Toolkit, Briefly Revisited

Since this course assumes prior database knowledge, this section is a quick
refresher rather than an introduction. A **relational database** organizes
data into tables of rows and columns, where each row represents one record
and each column represents one attribute of that record. A `Patients` table
might have columns for `patient_id`, `name`, and `date_of_birth`, with one
row per patient. The rules that define what tables exist, what columns each
table has, and what data types those columns accept make up the database's
**database schema** — a contract the database enforces on every row written
to it.

Designers typically start from an **entity-relationship model**, a diagram
notation that identifies the real-world "entities" a database must track
(such as `Patient`, `Provider`, and `Encounter`) and the relationships
between them, before translating that diagram into actual tables. An
entity-relationship diagram for our running example would show `Patient`,
`Provider`, and `Facility` as boxes, connected by lines labeled with the
relationship's meaning and cardinality (one patient can have many
encounters, but each encounter belongs to exactly one patient).

To keep data consistent and avoid storing the same fact in two places
that could drift out of sync, relational designers apply **normalization**:
a set of design rules that split data into multiple related tables so that
each fact is stored exactly once. Consider a naive `Encounters` table that
repeats the provider's full name and specialty on every single row for that
provider — if Dr. Patel changes specialties, every encounter row must be
updated, and a missed row leaves the data inconsistent. Normalization fixes
this by moving provider details into their own `Providers` table and
referencing it from `Encounters` using an ID, so the specialty is stored
once and read many times.

Working through the standard normal forms on a concrete table makes the
payoff measurable rather than abstract. Suppose an unnormalized
`Encounters` table has one row per visit with columns `patient_name`,
`provider_name`, `provider_specialty`, and `diagnosis_codes` — and that
last column stores a comma-separated list like `"E11.9, I10"` whenever a
visit addresses more than one condition. **First normal form (1NF)**
requires every column to hold a single, atomic value, so the comma-separated
diagnosis list must move into its own `Encounter_Diagnoses` table with one
row per encounter-diagnosis pair. **Second normal form (2NF)** requires
every non-key column to depend on the *entire* primary key, not just part of
it; if `Encounters` has a composite key of `(patient_id, visit_date)` but
`provider_specialty` only depends on which provider saw the patient, not on
the visit date, it must move out. **Third normal form (3NF)** goes further,
requiring non-key columns to depend on nothing *but* the key — since
`provider_specialty` depends on `provider_id` rather than directly on the
encounter, it belongs in `Providers`, not `Encounters`. Three passes, three
new tables, and the single fact "Dr. Patel specializes in Internal
Medicine" now lives in exactly one row instead of being copied across every
encounter he has ever recorded.

That reference is called a **foreign key**: a column in one table that holds
the primary-key value of a row in another table, establishing a link between
them without duplicating data. The `Encounters` table's `provider_id` column
is a foreign key pointing at the `Providers` table's `provider_id` primary
key. Foreign keys are how relational databases represent relationships at
all — there is no separate "relationship" object, only a column value that
happens to match a row elsewhere.

Reconstructing that relationship at query time requires a **join
operation**, which combines rows from two or more tables based on matching
key values. To list every encounter along with the treating provider's name,
a query joins `Encounters` to `Providers` on `provider_id`. Written out, the
query looks like this:

```sql
SELECT e.visit_date, p.name, p.specialty
FROM Encounters e
JOIN Providers p ON e.provider_id = p.provider_id
WHERE e.patient_id = 'MRN-48213';
```

The `JOIN ... ON` clause is the database engine's instruction to match every
`Encounters` row's `provider_id` value against the `Providers` table's
`provider_id` primary key, row by row, before it can return a single
combined result. One join like this is cheap. The trouble starts when a
question requires several joins chained together, which is exactly what the
rest of this chapter investigates.

!!! mascot-thinking "Normalization Trades Storage for Joins"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice the trade Normalization makes: it eliminates duplicate, inconsistent data, but the price is that any question spanning multiple entities now needs a join to reassemble the facts. The more thoroughly a schema is normalized, the more joins its typical questions require — a direct, measurable cost of the very design discipline that keeps the data clean.

## Data Models: The Same Domain, Two Different Shapes

A **data model** is an abstract specification of how information is
organized, named, and related — independent of any specific database
product. It answers three questions: what kinds of things exist, what
attributes describe them, and how they relate to each other. Crucially, the
*same* real-world domain can be captured by more than one data model, and
the model you choose determines which questions are cheap to answer and
which are expensive.

Consider our familiar scenario: Maria Chen is treated by Dr. Patel, who
works at Riverside Clinic, and Maria has been diagnosed with Type 2
Diabetes. A relational data model captures this as four tables — `Patients`,
`Providers`, `Facilities`, and `Diagnoses` — linked by foreign keys: an
`encounter_id` bridging `Patients` and `Providers`, a `facility_id` on the
`Providers` row, and a `diagnosis_id` bridging `Patients` and `Diagnoses`. A
**graph data model** captures the identical facts as four nodes and three
edges, exactly as Chapter 1 introduced them — no bridging tables, because
the relationship itself is a stored, first-class edge rather than a matched
pair of key values.

The difference is not cosmetic. In the relational model, "which facility
does Maria Chen's provider work at?" requires the query engine to locate
matching rows across three tables before it can answer. In the graph model,
the same question is answered by starting at the `Maria Chen` node and
following two edges outward — no matching, no reconstruction, just pointers
already in place. Both models are internally consistent and correct; they
simply make different bets about which operations should be fast.

A more formal way to state this trade-off is in terms of how each model's
query cost grows with the number of relationships, or *hops*, a question
must traverse. If a relational schema requires one join per hop, and each
join scans a table of \( n \) rows, a chain of \( h \) joins costs roughly
\( O(h \cdot n) \) in the worst case, and can be worse if the query planner
cannot use an index at every step. A graph model that stores each
relationship as a direct edge costs \( O(h) \) instead — the traversal cost
depends only on the number of hops, not on how large the surrounding
database has grown. This is the same asymmetry Chapter 1 called index-free
adjacency, now stated as a general property of the *data model* rather than
of any one query.

A second worked example shows the same asymmetry outside the patient-visit
scenario. Suppose a payer needs to resolve a claims dispute: which
providers submitted claims that were denied for the same denial reason as a
disputed claim, filed under the same policy? A relational data model
answers this with a `Claims` table joined to a `Denial_Reasons` table,
joined again to `Claims` a second time (a self-join) to find other claims
sharing that reason, joined once more to `Policies` to confirm the shared
policy — three joins, one of them a self-join most SQL students find
genuinely awkward to write correctly. A graph data model expresses the
identical question as a short traversal: start at the disputed `Claim`
node, follow its `DENIED_FOR` edge to the `Denial_Reason` node, follow that
edge backward to every other `Claim` sharing the same reason, and filter to
the ones connected to the same `Policy` node — no self-join construct
needed, because following an edge backward is just as natural as following
it forward.

Before looking at the two models side by side, one more distinction is worth
naming precisely: a data model describes structure and relationships in the
abstract, while a specific database schema is one *implementation* of a
chosen data model in a particular product. Two different graph databases
might both implement the same graph data model but store it with different
internal file formats — the data model is the blueprint, the schema is the
building built from it in a specific product.

#### Diagram: Relational vs. Graph Data Model Side-by-Side

<iframe src="../../sims/relational-vs-graph-data-model-comparison/main.html" width="100%" height="1062px" scrolling="no"></iframe>

<details markdown="1">
<summary>Relational vs. Graph Data Model Side-by-Side</summary>
Type: diagram
**sim-id:** relational-vs-graph-data-model-comparison<br/>
**Library:** p5.js<br/>
**Status:** Validated

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: differentiate, compare<br/>
Learning objective: Given the same four healthcare facts modeled two ways, the learner can differentiate how a relational schema and a graph data model each represent an identical relationship, and can trace the extra steps the relational version requires.

Purpose: Show the Maria Chen / Dr. Patel / Riverside Clinic / Type 2 Diabetes scenario rendered simultaneously as (left) four normalized tables with foreign keys and (right) a four-node labeled property graph, so learners can click a fact in either representation and watch its counterpart highlight in the other.

Canvas layout:

- Left half: four small table grids (Patients, Providers, Facilities, Diagnoses) with visible foreign-key columns highlighted in orange
- Right half: the four-node graph (Patient, Provider, Facility, Condition) with labeled directed edges, matching the color scheme from Chapter 1's Healthcare Graph Anatomy Explorer

Data Visibility Requirements:
Stage 1: Show both representations at rest, tables on the left fully populated with sample rows, graph on the right fully drawn with all labels visible.
Stage 2: Click a foreign-key cell (e.g., `provider_id` in the Encounters row) on the left; the corresponding edge on the right graph highlights in gold, and a caption reads "This foreign key IS this edge."
Stage 3: Click an edge on the right graph; the two foreign-key cells that would need to be joined to reconstruct that same fact highlight on the left, with a caption showing the SQL join clause required.
Stage 4: A "Count the Hops" button runs the "which payer bills for the facility where Maria Chen's specialist works" question on both sides simultaneously, incrementing a join counter on the left and a hop counter on the right as each step completes.

Interactive controls:

- Click-to-highlight on both table cells and graph edges (bidirectional)
- "Count the Hops" button that animates both traversals step by step
- Reset button

Instructional Rationale: An Analyze-level objective (differentiate, compare) requires the learner to see structural correspondence, not just read a description of it. Bidirectional click-to-highlight lets the learner build the mapping in either direction — from foreign key to edge, or from edge to foreign key — which is the exact skill needed to translate between the two data models later in the course.

Layout: Two-column split, responsive to window resize (stacks vertically below 700px width)
Canvas size: responsive width, 520px height

Implementation: p5.js with two side-by-side rendering regions and a shared highlight-state object
</details>

## Schema-On-Write vs. Schema-On-Read

Relational databases enforce their schema at the moment of writing: **schema-on-write** means every row must conform to the table's column definitions before the database accepts it, catching errors early but requiring a formal migration whenever the shape of the data changes. Adding a new fact about patients — say, a preferred language — means altering the `Patients` table for every existing row, even ones for which the language is unknown. In practice this means running an `ALTER TABLE Patients ADD COLUMN preferred_language VARCHAR(50)` statement that locks the table (briefly or for a long time, depending on its size) and back-fills every existing row with a default value such as `NULL`, whether or not that patient's language is actually known.

Graph databases, and the labeled property graph model in particular, favor **schema-on-read**: the structure of the data is validated (if at all) when it is queried, not when it is written. A new `Patient` node can carry a `preferred_language` property the moment that fact is known, without touching any other `Patient` node that doesn't yet have it. There is no migration step, no table lock, and no need to invent a placeholder value for the 90% of existing patients whose preferred language was never recorded — those nodes simply omit the property entirely, and a query that reads it treats "missing" as its own valid state. This is not "no schema" — most production graph databases support optional constraints, as Chapter 4 covers — but the default posture inverts the relational one, trading some write-time safety for the flexibility that fast-moving clinical and claims data demands.

## Naming the Graph Model Precisely

Chapter 1 already showed you a labeled property graph in action; this
section gives the surrounding vocabulary its formal names. **Graph data
model** is the umbrella term for any data model built from nodes and edges
rather than rows and columns — it is the graph-world counterpart to "the
relational model." Under that umbrella sits a specific, widely implemented
variant: the **property graph model**, in which both nodes and edges carry a
type label and an arbitrary set of key-value properties. Neo4j, TigerGraph,
and Amazon Neptune (in property-graph mode) all implement this same
underlying model, even though their query languages and storage engines
differ. When this book says "graph database" without further qualification,
it means a database implementing the property graph model.

The practical benefit of naming this precisely shows up the moment
requirements change. Suppose a hospital's fraud-review team asks for a way
to flag a claim as `under_review` mid-investigation. Under the graph data
model, this is a one-line change: add an `under_review: true` property to
the specific `Claim` nodes currently being investigated, leaving every other
`Claim` node — and the schema as a whole — untouched. Under a relational
data model built to third normal form, the same request typically means
adding a new column to the `Claims` table (a schema-on-write migration) or,
if the team wants to avoid altering a large production table, creating an
entirely new `Claims_Under_Review` join table just to track which claim IDs
are flagged — extra structure invented solely to work around the rigidity
Normalization enforces everywhere else in the schema.

## Beyond Property Graphs: Other Graph Formats

The property graph model is not the only way to serialize connected data,
and recognizing its alternatives helps you understand tooling you will
encounter outside this book. An **RDF triple store** represents every fact
as a subject-predicate-object triple — for example, the single fact "Maria
Chen is diagnosed with Type 2 Diabetes" is written as three separate parts:
subject `MariaChen`, predicate `diagnosedWith`, object `Type2Diabetes`, with
every fact in the entire store reduced to this same rigid three-part shape.
A property graph edge, by contrast, can carry additional detail directly on
the relationship itself (a `diagnosis_date` property on the edge, say); a
pure RDF triple cannot, and typically needs an extra layer (RDF reification,
or the related RDF-star extension) bolted on to attach properties to a
relationship, which is one practical reason property graphs have become more
popular for operational systems even though RDF triple stores remain
common in biomedical ontologies such as SNOMED CT's published releases. A
**multigraph** is any
graph that permits more than one edge between the same pair of nodes — for
instance, Maria Chen might have two separate `TREATED_BY` edges to Dr.
Patel, one per encounter date, rather than a single edge that overwrites the
date each visit. Most property graph databases are multigraphs by default.
Finally, **graph serialization** refers to the file formats used to export
or exchange graph data outside a live database — common examples include
GraphML, JSON-based node/edge lists, and RDF's own Turtle syntax — which
matters whenever you need to move a graph between tools or archive it.

The following table reinforces how these formats relate to the property
graph model this book uses throughout.

| Format | Relationship Representation | Typical Use |
|---|---|---|
| Property Graph | Typed edge with properties | Operational graph databases (Neo4j, TigerGraph) |
| RDF Triple Store | Subject-predicate-object triple | Biomedical ontologies, Semantic Web data |
| Multigraph | Multiple parallel edges allowed | Modeling repeated events (visits, claims) between the same two nodes |
| Serialization Format | File-based export (GraphML, JSON, Turtle) | Moving graph data between tools or archiving it |

!!! mascot-warning "Don't Confuse the Format With the Database"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common early mix-up is treating "RDF" and "graph database" as synonyms — they're not! RDF is one serialization format among several, and most production graph databases you'll meet in this course use the property graph model instead. If someone hands you a `.ttl` file, that's RDF; if they hand you a Neo4j database, that's a property graph.

## Graph Query: The Payoff of the Model

Every design decision in this chapter exists to answer one practical
question well: given a question about connected data, how expensive is it to
answer? A **graph query** is a request that asks the database to find nodes,
edges, or paths matching some pattern — the graph-world counterpart to a SQL
`SELECT`. Chapter 3 covers the specific languages used to write these
queries; this section establishes why the underlying model makes them so
much cheaper to answer for connected questions.

Return to the four-hop question from Chapter 1: *which payer is billed for
the facility where Maria Chen's specialist works?* Expressed relationally,
answering this means writing a query that joins `Patients` to an encounters
table, that table to `Providers`, `Providers` to `Facilities`, and
`Facilities` to a `Payer_Contracts` table — four separate join operations,
each one requiring the database to match key values across potentially
millions of rows. Expressed as a graph query, the same question is a single
pattern: start at the `Patient` node, follow `TREATED_BY`, `WORKS_AT`, and
`BILLS` edges in sequence, and return whatever node sits at the end. The
graph engine never performs a join in the relational sense, because the
"join" was already materialized as an edge back when the data was written.

A second worked example shows that the advantage holds even for questions
that summarize data rather than just retrieve it. Suppose a payer wants to
know: how many distinct facilities does each of its network providers work
at? Relationally, this means joining `Providers` to a `Provider_Facilities`
bridge table, joining that to `Facilities`, and grouping the result by
provider — a join followed by a `GROUP BY` and a `COUNT`, with the join
still required before any aggregation can happen. As a graph query, the same
question needs no join at all: for each `Provider` node, count the distinct
`Facility` nodes reachable by a single `WORKS_AT` edge. The aggregation
(`COUNT`) is identical in spirit to the relational version, but it operates
directly on edges already present in the graph rather than on rows
reconstructed by a join — which is precisely why Chapter 3 introduces
aggregate queries as a native, first-class category of graph query rather
than an add-on bolted onto joined results.

This gap is not a rounding error. As the chart below shows, relational join
performance degrades sharply as the number of chained joins grows, while
graph traversal performance grows only modestly, because each additional hop
costs the same small, constant amount of work regardless of how large the
overall database is.

#### Diagram: Query Performance vs. Relationship Depth

<iframe src="../../sims/query-performance-comparison-chart-rdbms-graph/main.html" width="100%" height="454px" scrolling="no"></iframe>

[Run the Query Performance: RDBMS vs Graph MicroSim Fullscreen](../../sims/query-performance-comparison-chart-rdbms-graph/main.html){ .md-button }

<details markdown="1">
<summary>Query Performance vs. Relationship Depth (reused)</summary>
Type: chart
**sim-id:** query-performance-comparison-chart-rdbms-graph<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/query-performance-comparison-chart-rdbms-graph/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/query-performance-comparison-chart-rdbms-graph

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, compare<br/>
Learning objective: Examine how relational join cost and graph traversal cost each scale as the number of chained relationships (hops) increases, and explain the source of the gap in terms of joins versus stored edges.

Reused from the MicroSim catalog. This log-scale line chart plots relational join time against graph traversal time as the number of relationship hops grows from one to six. The relational line climbs exponentially (each additional join multiplies the rows scanned) while the graph line stays nearly flat (each hop follows an already-stored pointer). It gives concrete numbers to the abstract argument this section just made about the four-hop payer question, directly connecting the Foreign Key / Join Operation discussion earlier in the chapter to the Graph Query concept that closes it.
</details>

A graph query, then, is not simply "a different syntax for the same
question." It reflects a different underlying cost model — one where
connection-following is cheap by design rather than reconstructed at
runtime. Everything this chapter has covered, from normalization's
join-multiplying side effect to the property graph's edges-as-first-class-
objects design, exists to explain why that cost model differs, and why
deeply interconnected healthcare data is exactly the case where the
difference matters most.

## Chapter Summary

!!! mascot-celebration "You Can Now Compare the Two Worlds"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just learned to translate fluently between relational and graph data models — normalization, foreign keys, and joins on one side; nodes, edges, and traversal on the other — and you can explain in concrete terms why the graph side wins as relationship depth grows. That comparison is the foundation for everything we build for the rest of this book.

This chapter reframed material you already knew — schemas, normalization,
foreign keys, joins — as one specific set of design choices, not the only
possible ones. A graph data model, and the property graph model in
particular, makes a different set of choices: relationships are stored
directly as edges, schema is enforced (if at all) on read rather than on
write, and a query that would require several joins in a relational schema
becomes a short traversal instead. In
[Chapter 3](../03-graph-query-languages-pattern-matching/index.md), we put
this vocabulary to work by learning the actual query languages — Cypher,
GQL, and GSQL — used to write the traversals this chapter has only
described in prose.

[See Annotated References](./references.md)
