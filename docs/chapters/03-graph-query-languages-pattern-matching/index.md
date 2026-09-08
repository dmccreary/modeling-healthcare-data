---
title: Graph Query Languages and Pattern Matching
description: Surveys Cypher, GQL, and GSQL, and covers pattern matching, query optimization, indexing, and the ETL pipelines used to load data into a graph database.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:08:39
version: 1.10
---

# Graph Query Languages and Pattern Matching

## Summary

This chapter surveys the major graph query languages -- Cypher, the GQL standard, and GSQL -- and the pattern-matching techniques used to query connected data. It covers query optimization, indexing, and the engineering behind loading data into a graph database (bulk import, ETL pipelines, schema design, and constraints). Students learn to read and reason about graph queries and to evaluate query performance.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Cypher Query Language | 466 |
| GQL Standard | 2 |
| GSQL | 1 |
| Graph Pattern Matching | 431 |
| Graph Query Optimization | 1 |
| Graph Index | 32 |
| Query Performance | 2 |
| Path Query | 1 |
| Subgraph Query | 2 |
| Aggregate Query | 1 |
| Graph Database Engine | 27 |
| Native Graph Storage | 2 |
| Index-Free Adjacency | 1 |
| Graph Data Loading | 2 |
| Bulk Import | 1 |
| ETL Pipeline | 22 |
| Graph Schema Design | 2 |
| Constraint Definition | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Graph Structures](../01-foundations-of-graph-structures/index.md)
- [Chapter 2: Data Modeling: Graphs vs. Relational Databases](../02-graphs-vs-relational-databases/index.md)

---

Chapter 2 argued, in prose, that a graph query answers connected questions
more cheaply than a chain of relational joins. This chapter makes that
argument concrete by teaching you to read and write the queries themselves —
the languages, the pattern-matching syntax, the performance tuning, and the
pipelines that get healthcare data into a graph database in the first place.

!!! mascot-welcome "Let's Speak Graph"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the dots! By the end of this chapter you'll be able to read a real graph query and know exactly what pattern it's hunting for in a sea of patients, providers, and claims. Every arm of this octopus has traced a pattern or two — let's put that instinct into words a database can understand.

## A Short Landscape of Graph Query Languages

Before learning any one syntax in depth, it helps to see where today's
languages came from and where they're headed. The field did not start with
Cypher: it began with **RDF triple stores** (introduced in Chapter 2) and
their query language SPARQL, built for the academic Semantic Web. Property
graph databases then developed their own languages independently — Neo4j
introduced Cypher, TigerGraph introduced **GSQL**, a full procedural
language for graph analytics — and for years there was no shared standard
across vendors, forcing anyone switching databases to relearn a new syntax
from scratch. That fragmentation motivated the **GQL Standard** (ISO/IEC
39075, ratified in 2024), the first ISO-standardized graph query language,
built heavily on Cypher's syntax and designed to do for graph databases what
SQL did for relational ones: give every vendor a common, portable core
language.

#### Diagram: Evolution of Graph Query Languages Timeline

<iframe src="../../sims/evolution-graph-query-languages-timeline/main.html" width="100%" height="542px" scrolling="no"></iframe>

[Run the Evolution of Graph Query Languages Timeline MicroSim Fullscreen](../../sims/evolution-graph-query-languages-timeline/main.html){ .md-button }

<details markdown="1">
<summary>Evolution of Graph Query Languages Timeline (reused)</summary>
Type: timeline
**sim-id:** evolution-graph-query-languages-timeline<br/>
**Library:** vis-timeline<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/evolution-graph-query-languages-timeline/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/evolution-graph-query-languages-timeline

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: summarize, classify<br/>
Learning objective: Summarize how graph query languages evolved from academic RDF/SPARQL through vendor-specific innovation (Cypher, GSQL) to the ISO-standardized GQL, classifying each milestone by era.

Reused from the MicroSim catalog. This interactive timeline traces query language milestones from 2002 to 2025, color-coded by era (Semantic Web, industry innovation, ISO standardization, vendor adoption). Hovering a milestone gives a one-line summary and clicking opens full detail, which is exactly the scaffolding a learner needs before this chapter names GQL Standard and GSQL for the first time.
</details>

## Cypher and the Art of Pattern Matching

**Cypher Query Language** is Neo4j's declarative graph query language and,
because it heavily influenced the GQL standard, the most transferable
graph-query syntax you can learn today. "Declarative" means you describe
*what pattern* you want matched in the graph, not the step-by-step
procedure for finding it — the database's query planner decides how to
execute the search efficiently, the same division of labor SQL uses for
tables.

A Cypher query is built from a small number of clauses, each doing one job.
`MATCH` describes a pattern to find in the graph, using parentheses for
nodes and arrows for edges — this is where **graph pattern matching**
happens, and it is the single most important skill in this chapter. `WHERE`
filters the matches down using property conditions. `WITH` passes an
intermediate result forward, often after aggregating it. `RETURN` shapes the
final output. Here is a complete, worked example built entirely from clauses
you've just been introduced to:

```cypher
MATCH (p:Patient)-[:DIAGNOSED_WITH]->(c:Condition {name: "Type 2 Diabetes"})
WHERE p.age > 65
RETURN p.name, p.patient_id
```

Read this the way you'd read the sentence it represents: "find every
`Patient` node connected by a `DIAGNOSED_WITH` edge to a `Condition` node
named Type 2 Diabetes, keep only the ones over 65, and return their name and
ID." Notice that the pattern itself — `(p:Patient)-[:DIAGNOSED_WITH]->(c:Condition)`
— is graph pattern matching in its purest form: a small, literal
drawing of nodes and edges, written inline, that the database searches the
whole graph for. Where a relational query specifies *tables and join
conditions*, a Cypher pattern specifies *the shape of the answer itself*,
and the database finds every place in the graph where that shape occurs.

Patterns can also express variable-length paths, which is where pattern
matching goes beyond anything a single join could express. The pattern
`(p:Patient)-[:REFERRED_TO*1..3]->(specialist:Provider)` matches every
provider reachable from a patient by one, two, or three chained referral
edges — a single line of Cypher standing in for what would be an unbounded,
recursive relational query.

A second worked example shows pattern matching combined with aggregation in
a single query, the way a real fraud-review dashboard might use it:

```cypher
MATCH (prov:Provider)-[:SUBMITTED]->(claim:Claim)
WHERE claim.status = "Denied"
WITH prov, count(claim) AS denied_count
WHERE denied_count > 10
RETURN prov.name, denied_count
ORDER BY denied_count DESC
```

Read clause by clause: `MATCH` finds every `Provider` connected to a
`Claim` by a `SUBMITTED` edge — the pattern-matching step. `WHERE` narrows
that match to denied claims only. `WITH` then pipes the filtered matches
forward, grouped by provider, computing a running `count(claim)` for each
one — an aggregate query, in the vocabulary this chapter introduces next.
The second `WHERE` filters on that computed count, and `ORDER BY` sorts the
final result. Notice that the pattern-matching portion (`MATCH` and its
first `WHERE`) and the aggregation portion (`WITH` and its `WHERE`) are
cleanly separable — a property that becomes useful once queries grow more
complex than a single clause can comfortably express.

Formally, matching a Cypher pattern against a graph is an instance of
**subgraph isomorphism**: given a small pattern graph (the `MATCH` clause)
and a large target graph (the database), find every way of mapping the
pattern's nodes and edges onto the target graph such that labels, directions,
and properties all agree. This problem is computationally expensive in the
worst case for large, unconstrained patterns, which is exactly why the
indexing and query-optimization techniques later in this chapter matter so
much in practice — they are the difference between a pattern match finishing
in milliseconds and one that scans far more of the graph than necessary.

#### Diagram: Cypher Query Components Interactive Infographic

<iframe src="../../sims/cypher-query-components-infographic/main.html" width="100%" height="636px" scrolling="no"></iframe>

[Run the Cypher Query Components Interactive Infographic MicroSim Fullscreen](../../sims/cypher-query-components-infographic/main.html){ .md-button }

<details markdown="1">
<summary>Cypher Query Components Interactive Infographic (reused)</summary>
Type: infographic
**sim-id:** cypher-query-components-infographic<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/cypher-query-components-infographic/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/cypher-query-components-infographic

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: demonstrate, classify<br/>
Learning objective: Given a complete Cypher query, demonstrate which clause (MATCH, WHERE, WITH, RETURN) each line belongs to and classify the pattern-matching portion versus the filtering portion.

Reused from the MicroSim catalog (WHAT match: exact topical fit). This infographic breaks a Cypher query into its four core clauses, each with a color-coded healthcare example, then assembles a complete query at the bottom that finds elderly patients with multiple chronic conditions. Hovering a clause card highlights the matching line in the full query, reinforcing exactly the MATCH/WHERE/RETURN breakdown just introduced in the preceding paragraphs.
</details>

!!! mascot-thinking "Declarative Means You Describe the 'What,' Not the 'How'"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice you never told the database *how* to search for the pattern — no loops, no explicit traversal order. That's the declarative mindset: you draw the shape you want found, and the query planner figures out the fastest way to find it. This is the same mental shift SQL asked of you for tables, now applied to shapes made of nodes and edges.

## Naming the Query Shapes You Just Wrote

The two Cypher examples above are both graph pattern matching, but they
belong to different named categories of graph query that are worth
distinguishing. A **path query** asks for a route between two nodes,
possibly the shortest one or one within a hop limit — the variable-length
referral pattern above is a path query. A **subgraph query** instead asks
for an entire connected neighborhood around a starting point, such as "every
node within two hops of Maria Chen," returning a small piece of the graph
rather than a single path. An **aggregate query** summarizes matched data
with a function such as count, sum, or average — "how many patients does
each provider treat?" is an aggregate query, computed in Cypher with a
`WITH provider, count(patient) AS total` clause — precisely the pattern the
denied-claims example above just demonstrated.

These three categories matter beyond vocabulary because each one stresses a
graph database's execution engine differently, which is why query planners
handle them with different strategies. A path query typically terminates as
soon as it finds the target node (or the shortest of several candidate
routes), so its cost depends mainly on how far away the target sits. A
subgraph query must enumerate every node and edge within its boundary before
it can stop, so its cost grows with how densely connected that
neighborhood is — a patient with three providers returns a small subgraph,
while a patient in a large multidisciplinary care team returns a much
larger one. An aggregate query must visit every matching row before it can
produce a final sum, count, or average, since a running total can never be
final until the last match is seen, which is why aggregate queries often
benefit the most from the indexing techniques covered later in this chapter.

| Query Type | Answers the Question | Healthcare Example |
|---|---|---|
| Path Query | What route connects two nodes? | Shortest referral chain from a PCP to a specialist |
| Subgraph Query | What surrounds this node? | Every node within two hops of a given patient |
| Aggregate Query | What summary statistic applies? | Average claims cost per provider this quarter |

## GSQL and the Accumulator Pattern

Not every graph query language is purely declarative. **GSQL**, TigerGraph's
query language, is built for large-scale parallel analytics and exposes an
imperative construct that Cypher does not: the *accumulator*, a variable
attached to each node that updates as a traversal visits it, letting a
single pass over the graph compute a running aggregate without a separate
post-processing step. Where Cypher's `WITH ... count()` aggregates after the
match completes, a GSQL accumulator aggregates *during* traversal — useful
when the calculation depends on the specific path taken to reach each node,
such as a cumulative risk score that depends on which treatments and
complications were visited along the way.

A simplified GSQL-style accumulator declaration and traversal looks like
this:

```gsql
SumAccum<FLOAT> @risk_score;
Start = {Patient.*};
Result = SELECT p FROM Start:p -(HAS_TREATMENT)-> :t
         ACCUM p.@risk_score += t.severity_weight;
```

The `SumAccum<FLOAT> @risk_score` line declares an accumulator attached to
every node, initialized to zero. The `SELECT ... ACCUM` block then walks
every `HAS_TREATMENT` edge from the starting patients and, for each one
visited, adds that treatment's severity weight directly into the traveling
patient's `@risk_score` — the running total builds up *as the traversal
happens*, not afterward. This is the concrete mechanism behind the informal
description above, and it is worth contrasting directly with Cypher's
`WITH ... count()`: Cypher first finds the complete set of matches, then
aggregates over that finished set, while GSQL's accumulator updates
incrementally at every step of the walk itself.

#### Diagram: GSQL Accumulator Pattern MicroSim

<iframe src="../../sims/gsql-accumulator-pattern-microsim/main.html" width="100%" height="638px" scrolling="no"></iframe>

[Run the GSQL Accumulator Pattern MicroSim MicroSim Fullscreen](../../sims/gsql-accumulator-pattern-microsim/main.html){ .md-button }

<details markdown="1">
<summary>GSQL Accumulator Pattern MicroSim (reused)</summary>
Type: microsim
**sim-id:** gsql-accumulator-pattern-microsim<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/gsql-accumulator-pattern-microsim/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/gsql-accumulator-pattern-microsim

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: calculate, demonstrate<br/>
Learning objective: Calculate how four different GSQL accumulator types (SumAccum, MaxAccum, AvgAccum, SetAccum) produce different running results from the identical graph traversal.

Reused from the MicroSim catalog. A patient node connects to eight treatment nodes, each carrying a severity weight, with some treatments leading to complication nodes with their own weights. As the traversal visits each node in sequence, the chosen accumulator updates live, letting learners directly compare Sum, Max, Avg, and Set behavior over the exact same walk — the concrete evidence needed to understand why GSQL treats aggregation as something that happens during the walk, not after it.
</details>

This procedural style is a design decision, not an accident: **graph
database engine** architectures differ in how they distribute work across a
cluster, and an engine built for massively parallel processing (like
TigerGraph's) benefits from an aggregation model that can accumulate values
locally on each machine during a single distributed traversal. By contrast,
Neo4j's engine is built around **native graph storage** — a storage layer
where every node record physically contains direct references to its
adjacent relationship records on disk, rather than reconstructing adjacency
through a separate index. This design is what enables **index-free
adjacency**: traversing from one node to its neighbors is a direct pointer
dereference, not a lookup, which is the same architectural fact that made
Chapter 1's constant-time traversal claim true at the storage level rather
than just the query-language level.

These are genuinely different engineering trade-offs, not just different
marketing language for the same idea. A native-storage engine like Neo4j
excels at deep, narrow traversals — following one patient's referral chain
five hops deep touches only the small number of records actually on that
path. A massively parallel engine like TigerGraph excels at broad,
whole-graph computations — running a single accumulator-based pass that
touches every patient and every claim simultaneously across many machines
at once, the kind of computation Chapter 5's centrality algorithms need.
Neither architecture is strictly better; a health system running mostly
point-lookup clinical queries (find this patient, follow this referral)
leans toward native storage, while one running large nightly
fraud-detection sweeps across the entire claims graph leans toward massively
parallel processing.

## Making Queries Fast: Optimization, Profiling, and Indexes

Writing a correct pattern is only half the job; a graph engine, like any
database, needs help finding the *fastest* way to execute it. **Graph query
optimization** is the process of restructuring a query, or adding
supporting structures, so the database's query planner can avoid
unnecessary work. **Query performance** is the measurable outcome of that
process — typically tracked as response time or throughput under a given
data volume. The single most effective optimization tool available to you
is a **graph index**: a supporting data structure, usually built on a node
property, that lets the database jump directly to matching nodes instead of
scanning every node with a given label to check its properties one by one.

Consider the earlier Cypher query filtering on `name: "Type 2 Diabetes"`.
Without an index on `Condition.name`, the database must inspect every
`Condition` node in the graph to find matches — a full label scan. With an
index on that property, the lookup becomes near-instant regardless of how
many `Condition` nodes exist.

A profiled execution plan makes this difference visible in numbers rather
than just description. Running `PROFILE` on the unindexed query might report
`NodeByLabelScan (Condition): 480,000 rows examined, 210ms`, followed by a
`Filter` step discarding all but the handful of matching rows — the
database paid the full 210ms cost of scanning every `Condition` node just to
throw away most of them. After creating an index with `CREATE INDEX FOR
(c:Condition) ON (c.name)`, the identical query's profile instead reports
`NodeIndexSeek (Condition): 340 rows examined, 2ms` — two orders of
magnitude fewer rows touched, because the database jumped directly to the
matching entries instead of inspecting every node with that label. The
chart below quantifies exactly how large that gap becomes as the matching
result set grows.

#### Diagram: Query Performance Impact of Indexing

<iframe src="../../sims/query-performance-impact-indexing/main.html" width="100%" height="494px" scrolling="no"></iframe>

[Run the Query Performance Impact of Indexing MicroSim Fullscreen](../../sims/query-performance-impact-indexing/main.html){ .md-button }

<details markdown="1">
<summary>Query Performance Impact of Indexing (reused)</summary>
Type: chart
**sim-id:** query-performance-impact-indexing<br/>
**Library:** Chart.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/query-performance-impact-indexing/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/query-performance-impact-indexing

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: compare, examine<br/>
Learning objective: Compare unindexed, single-property-indexed, and composite-indexed query execution time as the matching result set scales from 10 to 1,000,000 nodes, and examine why the performance gap widens rather than staying constant.

Reused from the MicroSim catalog. A log-log chart plots three lines — no index, single-property index, composite index — from 10 to 1,000,000 matching nodes. The unindexed line reaches a 16-minute timeout while the indexed lines stay sub-second, giving direct visual evidence for the Graph Index concept just defined in prose, and hovering any point shows the exact speedup factor.
</details>

Once an index exists, **graph query optimization** in practice usually means
running the database's built-in profiler to see whether the planner is
actually using it. The workflow below shows the systematic checklist a
graph engineer follows when a query runs slower than expected.

#### Diagram: Query Optimization Workflow Diagram

<iframe src="../../sims/query-optimization-workflow-diagram/main.html" width="100%" height="507px" scrolling="no"></iframe>

[Run the Query Optimization Workflow Diagram MicroSim Fullscreen](../../sims/query-optimization-workflow-diagram/main.html){ .md-button }

<details markdown="1">
<summary>Query Optimization Workflow Diagram (reused)</summary>
Type: workflow
**sim-id:** query-optimization-workflow-diagram<br/>
**Library:** Mermaid<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/query-optimization-workflow-diagram/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/query-optimization-workflow-diagram

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: implement, solve<br/>
Learning objective: Apply a systematic checklist (profile, check for missing indexes, full label scans, unbounded variable-length paths, oversized result sets, heavy aggregations) to solve a slow healthcare graph query.

Reused from the MicroSim catalog. This decision tree walks through diagnosing a slow query step by step, looping back to re-profile after each fix so its effect is measured before moving on. Hovering any step reveals the Cypher fix to apply, directly operationalizing the Graph Query Optimization and Query Performance concepts this section defines.
</details>

!!! mascot-tip "Profile Before You Guess"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a shortcut that saves real debugging time: never guess why a query is slow — run the database's `PROFILE` or `EXPLAIN` command first. It shows you exactly which step in the execution plan is expensive, so you fix the actual bottleneck instead of the one you assumed was there.

## Getting Data Into the Graph

None of the querying skills above matter until healthcare data actually
lives in the graph, which raises a separate engineering problem: **graph
data loading**, the general task of getting records from source systems
into nodes and edges. The simplest form is **bulk import**: loading a large
batch of nodes and edges from files (commonly CSV) in one operation,
dramatically faster than inserting records one at a time because it skips
per-row overhead like index maintenance until the batch finishes.

Real healthcare data rarely arrives graph-ready, however, which is why
loading is usually wrapped in an **ETL pipeline** — a repeatable process
that Extracts records from source systems (an EHR database, a claims
warehouse, a pharmacy feed), Transforms them into the node-and-edge shape
the target graph schema expects, and Loads the result into the graph
database. A single ETL run might extract rows from a relational `Patients`
table, transform each row into a `Patient` node with properties copied from
the matching columns, and load the result via bulk import — effectively
automating the relational-to-graph translation this book has been doing by
hand since Chapter 2. A minimal load statement for the transform-and-load
half of that pipeline looks like this:

```cypher
LOAD CSV WITH HEADERS FROM 'file:///patients.csv' AS row
MERGE (p:Patient {patient_id: row.patient_id})
SET p.name = row.name, p.date_of_birth = row.date_of_birth
```

`LOAD CSV WITH HEADERS` streams each row of the extracted file in as a
variable named `row`, with column values accessible by their header name.
`MERGE`, rather than `CREATE`, is doing important work here: it matches an
existing `Patient` node with that `patient_id` if one already exists, and
only creates a new node if it doesn't — the exact match-or-create behavior
this chapter's later warning about duplicate patients depends on. `SET`
then copies the remaining columns onto the node as properties. Running this
same statement against a nightly extract from the source EHR is what turns
a one-time bulk import into a repeatable ETL pipeline.

Before that first bulk load ever runs, two design decisions must already be
settled. **Graph schema design** is the up-front process of deciding which
node labels, edge types, and properties the graph will use — the graph
equivalent of designing relational tables, but without the same obligation
to normalize, since a property graph tolerates optional and varying
properties across nodes of the same label. **Constraint definition** then
enforces rules on top of that schema, most commonly a uniqueness constraint
ensuring no two `Patient` nodes share the same `patient_id` — a safeguard
against the ETL pipeline accidentally creating duplicate patients on a
re-run.

Good graph schema design decisions made once, before the first load, save
substantial rework later. A team modeling a health system's referral data
must decide up front whether "referral" is best represented as a single
`REFERRED_TO` edge type with a `date` property, or as its own `Referral`
node connecting a `Patient`, a referring `Provider`, and a receiving
`Provider` — the second design costs an extra node per referral but makes
it possible to attach additional properties (urgency, insurance
authorization status) that a plain edge could still hold, but that become
awkward once several more facts need to attach to the same referral event.
Chapter 9 revisits this exact node-versus-edge design question when
modeling clinical encounters in depth. Constraint definition then locks in
whichever design was chosen: beyond simple uniqueness, many graph databases
also support existence constraints (a `Claim` node must always have a
`claim_id`) and type constraints (a property must hold a specific data
type), each catching a different category of data-quality problem before it
ever reaches a query.

!!! mascot-warning "A Rerun Without Constraints Duplicates Everyone"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap: running a bulk import twice without a uniqueness constraint on `patient_id` silently creates a second copy of every patient instead of updating the first. The fix is to define the constraint *before* the first load, and to use a MERGE-style operation (match-or-create) rather than a blind CREATE in your ETL transform step.

## Chapter Summary

!!! mascot-celebration "You Can Read, Optimize, and Load a Graph Query"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just went from graph vocabulary to graph fluency — reading Cypher patterns, naming path/subgraph/aggregate queries, comparing GSQL's accumulator style to Cypher's declarative one, and tracing how indexing and ETL pipelines make it all fast and repeatable. That's the full query lifecycle handled.

This chapter turned Chapter 2's abstract performance argument into concrete
skill: you can now read a Cypher `MATCH` pattern, recognize whether a query
is asking for a path, a subgraph, or an aggregate, explain why native graph
storage makes index-free adjacency possible, and reason about the indexing
and ETL work that gets healthcare data into a graph in the first place. In
[Chapter 4](../04-graph-database-scalability-operations/index.md), we take
this same graph database and ask a different question: how do you keep it
running, fast and available, once it holds millions of patients instead of
four?

[See Annotated References](./references.md)
