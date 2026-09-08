---
title: Foundations of Graph Structures
description: Introduces the core vocabulary of graph theory -- nodes, edges, properties, graph variants, and traversal -- that every later chapter in this book builds on.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 13:46:16
version: 1.10
---

# Foundations of Graph Structures

## Summary

This opening chapter introduces the vocabulary and building blocks of graph theory: nodes, edges, node and edge properties, and the labeled property graph model used throughout this book. It covers the major graph variants (directed, undirected, weighted, and acyclic) and the traversal strategies (breadth-first and depth-first) used to explore them. Every later chapter, whether about healthcare data, AI, or fraud detection, builds on the vocabulary introduced here.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Graph Theory Basics | 1680 |
| Node | 2 |
| Edge | 1 |
| Graph Database | 707 |
| Labeled Property Graph | 1 |
| Node Property | 970 |
| Edge Property | 2 |
| Directed Graph | 1 |
| Undirected Graph | 2 |
| Weighted Graph | 1 |
| Directed Acyclic Graph | 965 |
| Graph Traversal | 2 |
| Breadth-First Traversal | 1 |
| Depth-First Traversal | 2 |
| Graph Path | 1 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

Every patient, provider, and payer in the healthcare system is connected to
something else: a patient sees a provider, a provider works at a facility, a
facility bills a payer. Relational databases store these facts, but they
store the *connections themselves* awkwardly, bolted on as foreign keys and
join tables. Graph theory gives us a vocabulary purpose-built for
connections, and that vocabulary is what this chapter establishes before we
touch a single line of healthcare data.

!!! mascot-welcome "Meet Sage!"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Hi there — I'm Sage, a curious octopus who's spent a lot of time thinking about connections. It turns out eight arms are a great way to understand graphs! I'll be your guide through this book, and here's how you'll know it's me:

    1. I wave hello at the start of every chapter.
    2. I put on my thinking cap when a key idea deserves a second look.
    3. I point to a shortcut whenever there's a faster way to do something.
    4. I raise a cautious arm when a common mistake is lurking nearby.
    5. I cheer you on when a topic gets genuinely hard.
    6. I celebrate with you at the end of every chapter.

    If I'm not doing one of those six things, I'm not in the chapter. Let's connect the dots!

## What Is a Graph?

A **graph** is a data structure made of two kinds of things: things, and the
connections between things. In graph theory, each "thing" is called a
**node** (sometimes called a vertex), and each connection between two nodes
is called an **edge**. That is the entire vocabulary you need to describe an
enormous range of real-world structures — a social network, a road map, a
supply chain, or, as this book focuses on, the web of relationships in a
healthcare system.

Consider a small, concrete example we will return to throughout this
chapter: a patient named Maria Chen sees a provider named Dr. Patel, who
works at Riverside Clinic. Maria has also been diagnosed with Type 2
Diabetes. Written as a graph, this sentence becomes four nodes — `Maria
Chen`, `Dr. Patel`, `Riverside Clinic`, and `Type 2 Diabetes` — connected by
three edges: Maria Chen is `TREATED_BY` Dr. Patel, Dr. Patel `WORKS_AT`
Riverside Clinic, and Maria Chen is `DIAGNOSED_WITH` Type 2 Diabetes. Notice
that nothing here required a table, a foreign key, or a join — the
relationship is simply a line drawn between two things.

The full field of **graph theory** studies the mathematical properties of
these node-and-edge structures: how many ways two nodes can be connected,
how quickly a structure can be traversed, and how patterns in connectivity
reveal information that isn't visible by looking at any single node in
isolation. Formally, a graph is often written as \( G = (V, E) \), where
\( V \) is the set of nodes (vertices) and \( E \) is the set of edges
connecting pairs of them. Two nodes joined directly by an edge — like Maria
Chen and Dr. Patel — are called **adjacent**, or **neighbors**; that single
idea, adjacency, is what every traversal algorithm later in this chapter is
built on.

What makes graph theory so broadly useful is that the same \( G = (V, E) \)
abstraction describes wildly different real systems depending only on what
you let a node and an edge represent. A road map is a graph where
intersections are nodes and streets are edges. A drug-interaction reference
is a graph where medications are nodes and known interactions are edges. A
referral network is a graph where providers are nodes and referrals are
edges. Every concept introduced later in this book — from clinical decision
support pathways to fraud rings hidden in claims data — is, at its core, a
question about the shape of a graph. Learning to see data this way is the
single most important shift in perspective this course asks of you, which
is why we spend an entire chapter on vocabulary before writing a single
query.

## Labeling the Graph: Properties on Nodes and Edges

A bare graph of nodes and edges tells you *that* Maria Chen is connected to
Dr. Patel, but not anything *about* either of them. Real-world graphs need
to carry data, and they do this through **properties**: key-value pairs
attached to a node or an edge. A **node property** is a piece of data
describing a single node — for example, the `Maria Chen` node might carry
the properties `patient_id: "MRN-48213"`, `date_of_birth: "1985-03-12"`, and
`gender: "F"`. An **edge property** does the same job for a connection: the
`TREATED_BY` edge between Maria Chen and Dr. Patel might carry
`first_visit_date: "2024-01-15"` and `encounter_type: "Annual Physical"`.

A graph whose nodes and edges are tagged with a type name (like `Patient` or
`TREATED_BY`) and enriched with properties is called a **labeled property
graph** — the specific graph model used throughout this book and by most
production graph databases. The "label" is the type; the "properties" are
the attributes. Together they turn an abstract diagram of circles and lines
into a structure that can answer real questions: which patients does Dr.
Patel treat? What is Maria Chen's date of birth? A graph database answers
both by looking at the same underlying structure — one by following edges of
a given label, the other by reading a property off a node.

Before we look at how this appears in an interactive graph, let's define one
more term precisely. A node's **label** (its type, such as `Patient` or
`Provider`) is different from a node's **properties** (its data, such as
`patient_id` or `date_of_birth`). Confusing the two is a common early
mistake: the label tells you *what kind* of thing a node is, while
properties tell you *facts about* that specific instance.

A property graph's schema is also far more forgiving than a relational
table's. In a `Patients` table, every row must have a value (even if it's
`NULL`) for every column the table defines — adding a new fact about
patients means altering the table for every row that already exists. In a
labeled property graph, two nodes with the same label do not need identical
property sets: one `Patient` node might carry an `allergies` property
because that patient has documented allergies, while another `Patient` node
simply omits it. Properties themselves typically hold ordinary data types —
strings (`"Maria Chen"`), numbers (`48213`), dates (`"1985-03-12"`),
booleans (`true`/`false`), and sometimes lists (`["penicillin", "latex"]`)
— which is why property graphs adapt easily to the varied, often incomplete
records found in real clinical and claims data. Later chapters on FHIR
resources and medical coding systems lean heavily on exactly this
flexibility.

#### Diagram: Healthcare Graph Anatomy Explorer

<iframe src="../../sims/healthcare-graph-anatomy-explorer/main.html" width="100%" height="962px" scrolling="no"></iframe>

<details markdown="1">
<summary>Healthcare Graph Anatomy Explorer</summary>
Type: graph-model
**sim-id:** healthcare-graph-anatomy-explorer<br/>
**Library:** vis-network<br/>
**Status:** Validated
**Template:** https://github.com/dmccreary/organizational-analytics/tree/main/docs/sims/property-graph-model<br/>

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: identify, classify<br/>
Learning objective: Given a rendered labeled property graph, the learner can identify which visual elements are nodes and which are edges, and state the label and properties of each.

Purpose: Let the learner explore the four-node Maria Chen example graph interactively, discovering node labels, edge labels, and properties by clicking rather than reading a static diagram.

Node types to show (color-coded by label):
- `Patient` (pink circle) — example instance: Maria Chen, properties `patient_id: "MRN-48213"`, `date_of_birth: "1985-03-12"`, `gender: "F"`
- `Provider` (blue circle) — example instance: Dr. Patel, properties `npi: "1234567890"`, `specialty: "Internal Medicine"`
- `Facility` (gray square) — example instance: Riverside Clinic, properties `facility_type: "Outpatient Clinic"`, `city: "Springfield"`
- `Condition` (orange diamond) — example instance: Type 2 Diabetes, properties `icd10_code: "E11.9"`

Edge types to show (labeled, directional arrows):
- `TREATED_BY` (Patient → Provider), properties `first_visit_date: "2024-01-15"`, `encounter_type: "Annual Physical"`
- `WORKS_AT` (Provider → Facility), property `role: "Attending Physician"`
- `DIAGNOSED_WITH` (Patient → Condition), property `diagnosis_date: "2023-11-02"`

Data Visibility Requirements:
Stage 1: Show the four nodes placed in a simple force-directed layout with their labels visible (Patient, Provider, Facility, Condition) but no properties shown yet.
Stage 2: On hover over a node, show a tooltip listing that node's label and all of its properties as key-value pairs.
Stage 3: On click of a node, highlight all edges directly connected to it and open a side panel showing the same property list plus the labels of the connected edges.
Stage 4: On hover over an edge, show a tooltip with the edge's label and its properties.

Interactive controls:
- Toggle button: "Show/Hide Properties" — when off, only labels are visible; when on, a small property count badge appears on each node
- Reset view button to re-center and re-fit the graph

Instructional Rationale: A click-to-reveal explorer matches the Understand-level objective (identify, classify) by letting learners build their own mental model of label-versus-property through direct manipulation, rather than passively reading an annotated static image. Hover and click are the two interactions specified because they let a learner distinguish "what is this node's type" (label, shown immediately) from "what do I know about this specific instance" (properties, revealed on demand) — which is exactly the distinction the preceding paragraph asks them to hold onto.

Layout: Force-directed, four nodes, non-overlapping, responsive to window resize
Canvas size: responsive width, 500px height
Legend: node shape/color key for Patient, Provider, Facility, Condition; arrow style key for each edge label

Implementation: vis-network JavaScript library
</details>

## Graph Variants: Directed, Undirected, and Weighted Graphs

Not every edge behaves the same way. The `TREATED_BY` edge from Maria Chen
to Dr. Patel has a direction — it makes sense to say a patient is treated by
a provider, but not the reverse. A graph in which every edge has a direction
like this is called a **directed graph**. Most healthcare relationships are
naturally directed: a patient is referred *to* a specialist, a claim is
submitted *to* a payer, a prescription is written *for* a patient.

Some relationships, however, are symmetric by nature. If Riverside Clinic
and Downtown Specialty Center share the same building, the fact "co-located
with" is true in both directions at once — there is no meaningful sense in
which one clinic is "co-located with" the other but not vice versa. A graph
in which edges carry no direction is called an **undirected graph**.

A third variant adds a number to each edge — its **weight** — representing
some quantity like cost, distance, or strength of connection. A graph whose
edges carry a numeric weight is called a **weighted graph**. If Riverside
Clinic and Downtown Specialty Center are 4.2 miles apart, that distance is
naturally modeled as a weight on the edge between them, letting later
chapters compute shortest routes or referral-network distances.

These three properties — direction, symmetry, and weight — are not mutually
exclusive; a single real-world graph can mix directed and undirected edges,
and any edge can also carry a weight regardless of its direction. The table
below reinforces the distinction with concrete examples from our running
healthcare scenario.

| Graph Variant | Example Edge | Why It Fits |
|---|---|---|
| Directed | Maria Chen `TREATED_BY` Dr. Patel | Treatment relationships only make sense in one direction |
| Undirected | Riverside Clinic `CO_LOCATED_WITH` Downtown Specialty Center | Shared location is a mutual, symmetric fact |
| Weighted | Riverside Clinic `4.2 miles` Downtown Specialty Center | Distance is a quantity, not just a yes/no connection |

## Why Graph Databases? Comparing Graphs to Relational Tables

You likely already know how a relational database would store this same
information: a `Patients` table, a `Providers` table, a `Facilities` table,
and a join table linking patients to providers through their encounters.
Answering "which facility does Maria Chen's provider work at?" requires a
three-table join — `Patients` joined to the encounter join table, joined to
`Providers`, joined to `Facilities`. Each additional hop in the relationship
chain adds another join, and each join gets more expensive as the tables
grow.

A **graph database** is a database engine built to store and query data in
exactly the node-and-edge form we have been drawing by hand. Instead of
reconstructing a relationship through a join at query time, a graph database
stores the relationship itself as a first-class object — the `TREATED_BY`
edge is not computed from matching foreign keys, it *is* a stored pointer
from the Patient node directly to the Provider node. Answering "which
facility does Maria Chen's provider work at?" becomes: start at Maria Chen,
follow the `TREATED_BY` edge to Dr. Patel, then follow the `WORKS_AT` edge to
the facility. Two direct hops, no joins.

!!! mascot-thinking "A Different Way to Think About Relationships"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the graph traversal above never had to search for a matching foreign key — it just followed a pointer that was already sitting there. This is called index-free adjacency, and it's the core reason multi-hop queries in a graph database don't slow down the way relational joins do.

| Dimension | Relational Database | Graph Database |
|---|---|---|
| Storage model | Rows in fixed-schema tables | Nodes and edges with flexible properties |
| Multi-hop relationship | Reconstructed via table joins | Stored directly, followed via traversal |
| Query cost as hops increase | Grows with each additional join | Stays roughly constant per hop |
| Best fit | Structured, tabular reporting | Deeply interconnected, relationship-heavy data |

This distinction is not academic. Consider a slightly longer question:
*which payer is billed for the facility where Maria Chen's specialist
works?* In a relational schema, answering this means joining `Patients` to
an encounters table, that table to `Providers`, `Providers` to
`Facilities`, and `Facilities` to a `Payer_Contracts` table — four joins
chained together, and the database must match keys across all of them
before returning a single row. In the graph, the same question is four
arrow-follows: Maria Chen → `TREATED_BY` → Dr. Patel → `WORKS_AT` →
Riverside Clinic → `BILLS` → the payer. Every additional hop in the
relational version adds another join the query planner must evaluate; every
additional hop in the graph version is simply one more edge to follow from
wherever the traversal already is. Later chapters in this book model patient
journeys, provider referral networks, and fraud rings — all of which are
defined by chains of relationships four, five, or more hops long, which is
exactly the depth at which this performance gap becomes impossible to
ignore. Chapter 4 returns to this comparison once we've covered enough
graph query vocabulary to write real queries against both kinds of systems.

## Traversing a Graph: Paths, Cycles, and Search Order

Once data is stored as a graph, the next natural question is how to move
through it systematically. A **graph path** is a sequence of nodes connected
end-to-end by edges — for instance, Maria Chen → Dr. Patel → Riverside
Clinic is a path of length two. The general process of visiting nodes by
following edges outward from a starting point is called **graph traversal**.

Traversal needs an order, and there are two foundational strategies. **
Breadth-first traversal** (BFS) visits all of a node's immediate neighbors
before moving on to their neighbors — it explores the graph level by level,
like ripples spreading outward from a stone dropped in water. **Depth-first
traversal** (DFS) instead follows one path as far as it can go before
backtracking to try another branch — it explores like someone running down
one hallway completely before returning to try a different hallway. Neither
strategy is universally "better": BFS is the natural choice when you want
the shortest path first (useful for referral-distance questions), while DFS
is often simpler to implement and better suited to exhaustively exploring
every branch of a structure (useful for auditing every possible referral
chain from a given provider).

Both strategies depend on one structural guarantee to behave predictably: no
node should be reachable from itself by following edges forward. A directed
graph containing no such cycles is called a **directed acyclic graph**, or
**DAG**. If Maria Chen's referral chain looped back on itself — say, if Dr.
Osei referred Maria back to Dr. Patel, who referred her back to Dr. Osei —
a traversal algorithm could loop forever unless it explicitly tracked
visited nodes. Referral networks, care pathways, and the learning graph
behind this very textbook are all modeled as DAGs specifically so that
"what comes next" is always well-defined and traversal always terminates.

!!! mascot-tip "A Trick for Remembering BFS vs. DFS"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a shortcut: BFS uses a queue (first-in-first-out), so it naturally spreads wide before going deep. DFS uses a stack (last-in-first-out), so it naturally dives deep before spreading wide. If you remember the data structure, you can derive the search pattern.

Let's extend our running example into a small referral network so we can
watch both strategies in action: Maria Chen is treated by Dr. Patel at
Riverside Clinic; Dr. Patel refers her to Dr. Osei at Downtown Specialty
Center; Dr. Osei, in turn, refers her to a nutritionist, Dana Reyes, who
also consults at Riverside Clinic. This five-node graph has no cycles, so it
is a valid DAG, and it is small enough to trace by hand before watching an
algorithm do it automatically below.

Tracing breadth-first traversal starting from Maria Chen: level 0 visits
just `{Maria Chen}`; level 1 visits every node one edge away, which is only
`{Dr. Patel}`; level 2 visits everything one edge from Dr. Patel that hasn't
already been visited, which is `{Riverside Clinic, Dr. Osei}`; level 3
visits `{Downtown Specialty Center, Dana Reyes}`. Depth-first traversal from
the same starting node instead commits to one branch immediately: Maria
Chen → Dr. Patel → Riverside Clinic (a dead end, so it backtracks to Dr.
Patel) → Dr. Osei → Downtown Specialty Center (another dead end, backtrack
again) → Dana Reyes. Both traversals visit all five nodes exactly once, but
in a different order — which is precisely the difference the earlier
hallway-versus-ripple analogy was describing.

Every traversal algorithm, DFS and BFS alike, must track which nodes it has
already visited, or it risks re-processing the same node repeatedly if the
underlying graph contains a cycle. A directed acyclic graph doesn't remove
the need for that bookkeeping, but it does guarantee something stronger:
because no path can loop back on itself, a traversal that respects edge
direction is mathematically guaranteed to terminate, and concepts like
"finish everything upstream before starting something downstream" (exactly
how this textbook's own chapter order was computed from its learning graph)
are well-defined only because the underlying structure is a DAG.

#### Diagram: Graph Traversal Visualization MicroSim

<iframe src="../../sims/graph-traversal-visualization-microsim/main.html" width="100%" height="638px" scrolling="no"></iframe>

[Run the Graph Traversal Visualization MicroSim Fullscreen](../../sims/graph-traversal-visualization-microsim/main.html){ .md-button }

<details markdown="1">
<summary>Graph Traversal Visualization MicroSim (reused)</summary>
Type: microsim
**sim-id:** graph-traversal-visualization-microsim<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/graph-traversal-visualization-microsim/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/graph-traversal-visualization-microsim

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: demonstrate, calculate<br/>
Learning objective: Apply breadth-first and depth-first traversal to a small healthcare referral graph and compare the resulting visit order and shortest path between two nodes.

Reused from the MicroSim catalog (WHAT match score 0.7576). This MicroSim already animates DFS, BFS, and Shortest Path traversal over a small healthcare graph of patients, providers, medications, conditions, and facilities — the current node glows yellow, visited nodes turn green, and the shortest-path result is highlighted in orange. Choose a start node and an algorithm, set the animation speed, and press Start; the "Order so far" panel shows the exact visit sequence, which is the concrete evidence a learner needs to see the level-by-level (BFS) versus branch-by-branch (DFS) difference described in the preceding paragraphs.
</details>

## Chapter Summary

!!! mascot-celebration "You've Built Your Graph Vocabulary!"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just mastered the full vocabulary of graph structures — nodes, edges, properties, labeled property graphs, directed/undirected/weighted variants, and traversal with BFS and DFS on a DAG. Every remaining chapter in this book builds directly on what you learned here.

Every concept in this chapter served one purpose: giving you precise words
for the structures you will model for the rest of the course. A graph is
nodes connected by edges; a labeled property graph adds types and data to
both; directed, undirected, and weighted graphs describe how those edges
behave; and traversal — whether breadth-first or depth-first — is how you
systematically move through the result. In [Chapter 2](../02-graphs-vs-relational-databases/index.md), we contrast this graph
data model directly against the relational database concepts you already
know, going deeper into exactly why a labeled property graph outperforms
tables and joins for the deeply interconnected data this book focuses on.
