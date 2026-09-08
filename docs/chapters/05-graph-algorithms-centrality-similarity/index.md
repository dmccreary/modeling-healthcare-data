---
title: Graph Algorithms, Centrality, and Similarity Measures
description: Introduces the graph algorithms used to analyze structure and importance -- shortest path, centrality measures, similarity measures, cycle detection, and link prediction -- the analytical toolkit for fraud detection and recommendation.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:08:39
version: 1.10
---

# Graph Algorithms, Centrality, and Similarity Measures

## Summary

This chapter introduces the graph algorithms used to analyze structure and importance within a graph: shortest path algorithms, centrality measures (PageRank, betweenness, degree, closeness, eigenvector), and similarity measures such as Jaccard and cosine similarity. It also covers connected components, cycle detection, and link prediction. These algorithms are the analytical toolkit used throughout the rest of the book for tasks like fraud detection and recommendation.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Graph Algorithm | 429 |
| Shortest Path Algorithm | 2 |
| Centrality Measure | 1 |
| PageRank Algorithm | 2 |
| Betweenness Centrality | 1 |
| Degree Centrality | 424 |
| Closeness Centrality | 2 |
| Eigenvector Centrality | 1 |
| Clustering Coefficient | 2 |
| Connected Components | 1 |
| Strongly Connected Component | 419 |
| Cycle Detection | 52 |
| Graph Pattern Recognition | 51 |
| Similarity Measure | 2 |
| Jaccard Similarity | 1 |
| Cosine Similarity | 364 |
| Link Prediction | 241 |
| Graph Embedding | 240 |
| Node Embedding | 62 |
| Edge Embedding | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Graph Structures](../01-foundations-of-graph-structures/index.md)
- [Chapter 3: Graph Query Languages and Pattern Matching](../03-graph-query-languages-pattern-matching/index.md)

---

Every chapter so far has treated the graph as a place to store and retrieve
facts: model the data, query the pattern, get the answer back. This chapter
asks a different kind of question — not "what is connected to what" but
"what does the *shape* of those connections tell us." Which provider is the
most important hub in a referral network? Which two patients have similar
enough symptom profiles to suggest the same diagnosis? Which claims form a
suspicious closed loop? These are graph algorithm questions, and they are
the analytical engine behind fraud detection, clinical recommendation, and
population health work in every chapter that follows.

!!! mascot-welcome "Reading the Shape of the Graph"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the dots! This chapter is where graphs stop being just storage and start being a lens — the same connections you've been drawing can reveal the most influential provider in a network, a hidden fraud ring, or the next referral a patient is likely to need. Eight arms, infinite edges, and now, finally, the tools to make sense of all of them.

## What Is a Graph Algorithm?

A **graph algorithm** is a well-defined, step-by-step procedure that takes a
graph as input and computes some property of its structure — a distance, a
ranking, a grouping, or a prediction — as output. What separates a graph
algorithm from an ordinary query is that a query retrieves data that is
already explicit in the graph (a stored edge, a stored property), while a
graph algorithm *derives* new information purely from the graph's
connectivity pattern, information that was never stored anywhere as a
property.

The most familiar graph algorithm family answers a **shortest path
algorithm** question: given a start node and an end node, what is the
lowest-cost route between them, where "cost" might be the number of hops,
a distance in miles, or a referral-processing delay in days? Consider a
small weighted referral network: Dr. Patel refers to Dr. Osei (a 3-day wait)
and to Dr. Nguyen (a 6-day wait); Dr. Osei can further refer to Dr. Nguyen
(1 day) or directly to Dr. Reyes (2 days); Dr. Nguyen refers to Dr. Reyes in
1 day. A shortest path algorithm systematically compares every route from
Dr. Patel to Dr. Reyes — Patel→Osei→Reyes costs \( 3+2=5 \) days,
Patel→Osei→Nguyen→Reyes costs \( 3+1+1=5 \) days, and Patel→Nguyen→Reyes
costs \( 6+1=7 \) days — and returns the minimum, 5 days, along with the
winning route (here, two routes tie). Doing this by hand for three routes is
easy; doing it for a referral network with thousands of providers and
millions of possible routes is exactly the kind of exhaustive-but-systematic
work a graph algorithm automates.

The specific algorithm that automates this comparison efficiently, without
enumerating every possible route by brute force, is **Dijkstra's
algorithm**. It maintains a running "best known cost so far" for every node
(initialized to infinity except the start node, which is 0), and repeatedly
selects the unvisited node with the lowest known cost, checks whether
reaching its neighbors through it beats their current best-known cost, and
updates those neighbors accordingly. Tracing it on the referral network
above: starting from Dr. Patel (cost 0), the algorithm first visits Dr.
Osei (cost 3, the lowest among Patel's neighbors), then checks Osei's
neighbors — Dr. Nguyen's cost improves from 6 (direct) to \(3+1=4\) through
Osei, and Dr. Reyes's cost is tentatively set to \(3+2=5\). Visiting Dr.
Nguyen next (now the lowest unvisited cost at 4), the algorithm checks
whether reaching Dr. Reyes through Nguyen beats the existing tentative cost:
\(4+1=5\), a tie with the existing 5, so the cost stays at 5. Every node has
now been visited, and the algorithm terminates having examined each edge at
most once — a systematic, provably correct alternative to the manual
route-by-route comparison performed earlier, and the reason shortest path
queries remain fast even on referral networks far too large to trace by
hand. In terms of computational cost, Dijkstra's algorithm runs in
\( O((n + e)\log n) \) time for a graph with \( n \) nodes and \( e \)
edges — far better than the exponential cost of literally comparing every
possible route, which grows unmanageable after only a handful of nodes.

Before looking at the taxonomy diagram below, note that graph algorithms
generally fall into a handful of families based on the *kind* of question
they answer: distance questions (shortest path), importance questions
(centrality, covered next), grouping questions (connected components and
clustering), and prediction questions (similarity and link prediction,
covered later in this chapter).

#### Diagram: Graph Algorithm Family Map

<iframe src="../../sims/graph-algorithm-family-map/main.html" width="100%" height="1102px" scrolling="no"></iframe>

<details markdown="1">
<summary>Graph Algorithm Family Map</summary>
Type: diagram
**sim-id:** graph-algorithm-family-map<br/>
**Library:** Mermaid<br/>
**Status:** Validated

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: classify, summarize<br/>
Learning objective: Classify a graph algorithm by the type of question it answers (distance, importance, grouping, or prediction) and summarize one example algorithm per family.

Purpose: Give learners a mental map of this chapter before diving into individual algorithms, so each new algorithm they meet has an obvious "home" in the taxonomy.

Structure: A Mermaid flowchart with a root node "Graph Algorithm" branching into four family nodes: "Distance Questions", "Importance Questions", "Grouping Questions", "Prediction Questions". Each family node branches to 2-3 example algorithm leaf nodes:

- Distance Questions → Shortest Path Algorithm
- Importance Questions → Degree Centrality, Betweenness Centrality, PageRank Algorithm
- Grouping Questions → Connected Components, Strongly Connected Component, Clustering Coefficient
- Prediction Questions → Similarity Measure, Link Prediction

Every node must have a `click` directive that opens an infobox with a one-sentence plain-language definition of that family or algorithm (e.g., clicking "Importance Questions" shows "Which nodes matter most, and by what definition of 'matters'?"; clicking "Degree Centrality" shows its formal one-line definition).

Color scheme: root node gray, family nodes blue, leaf nodes colored by family (distance=green, importance=orange, grouping=purple, prediction=teal)

Interactivity requirement: every node clickable with an infobox; the diagram title bar includes a "this chapter's tour" reset button that collapses back to the four family nodes.

Implementation: Mermaid flowchart with `click NodeId call showInfo("id")` directives wired to a small JavaScript infobox panel below the diagram, responsive to window resize.
</details>

## Centrality: Many Definitions of "Important"

The most immediately useful family of graph algorithms answers a deceptively
simple question: which nodes matter most? A **centrality measure** is any
graph algorithm that assigns a numeric importance score to each node based
on its position in the graph's structure — and the phrase "any" is doing a
lot of work, because there is no single correct definition of importance.
Different centrality measures capture genuinely different notions of what
makes a node matter, and choosing the wrong one for a question gives a
misleading answer.

**Degree centrality** is the simplest measure: it counts how many edges
connect directly to a node, optionally normalized by the maximum possible
degree in the graph. Formally, for a node \( v \) in a graph with \( n \)
nodes, degree centrality is

\[ C_D(v) = \frac{\deg(v)}{n - 1} \]

Consider a five-provider referral network where Dr. Patel receives referrals
from four other providers and Dr. Osei receives referrals from only one.
With \( n = 5 \), Dr. Patel's degree centrality is \( \frac{4}{4} = 1.0 \)
(connected to everyone), while Dr. Osei's is \( \frac{1}{4} = 0.25 \). Degree
centrality answers "who has the most direct connections" — useful for
finding busy hub providers, but blind to a very different kind of
importance: a provider with only two connections who happens to be the
*only* bridge between two otherwise-separate hospital networks. That second
kind of importance is what **betweenness centrality** measures — how often
a node sits on the shortest path between other pairs of nodes — and it can
rank that low-degree bridge provider above Dr. Patel entirely, because
removing the bridge would disconnect large parts of the network while
removing Dr. Patel would not.

Three more centrality measures round out the toolkit. **Closeness
centrality** scores a node by how short its average shortest path is to
every other node in the graph — a provider embedded near the "center" of
the referral network, quick to reach anyone, scores high even with modest
degree. **Eigenvector centrality** scores a node higher if it connects to
*other* highly-connected nodes, capturing the intuition that being connected
to one influential provider matters more than being connected to five
peripheral ones. The **PageRank algorithm**, originally built to rank web
pages by link importance, is a refinement of eigenvector centrality that
adds a damping factor to prevent artificially inflated scores in tightly
looped subgraphs — the same algorithm, repurposed here to rank providers by
influence within a referral network rather than web pages by influence
across the internet. Formally, PageRank score is computed recursively:

\[ PR(v) = \frac{1-d}{n} + d \sum_{u \in N_{in}(v)} \frac{PR(u)}{\deg_{out}(u)} \]

where \( d \) (typically 0.85) is the damping factor, \( N_{in}(v) \) is the
set of nodes with an edge pointing to \( v \), and \( \deg_{out}(u) \) is how
many outgoing edges node \( u \) has. In plain language: a provider's
PageRank score is boosted by every provider who refers to them, weighted by
how much influence that referring provider has to spread around, and
divided among however many other providers that referring provider also
refers to — a provider who refers to only one specialist passes along all
of their influence, while one who refers broadly to twenty specialists
passes along only a small fraction to each.

The full five-provider network makes the contrast between degree and the
other three measures concrete in one table. Suppose the referral network
consists of a hub (Dr. Patel, degree 4), a bridge (Dr. Osei, degree 2, but
the only connection between two otherwise-separate provider clusters), and
three peripheral providers (Dr. Nguyen, Dr. Reyes, Dr. Kim, each degree 1).

| Provider | Degree Centrality | Betweenness Centrality (rank) | Why |
|---|---|---|---|
| Dr. Patel | 1.00 (highest) | Low | Directly connects to everyone, but removing Dr. Patel doesn't disconnect the network |
| Dr. Osei | 0.50 | Highest | Only two connections, but the sole bridge linking two clusters |
| Dr. Nguyen, Reyes, Kim | 0.25 each | Lowest | Peripheral, single connection, no bridging role |

This table is the numeric backbone behind the earlier claim that
betweenness can crown a low-degree node above a high-degree hub — Dr. Osei
wins on betweenness despite having half of Dr. Patel's degree, precisely
because the network's overall connectivity depends on that one bridge in a
way it does not depend on any single connection to Dr. Patel.

#### Diagram: Centrality Measures Comparison MicroSim

<iframe src="../../sims/centrality-measures-comparison/main.html" width="100%" height="508px" scrolling="no"></iframe>

[Run the Centrality Measures Comparison MicroSim Fullscreen](../../sims/centrality-measures-comparison/main.html){ .md-button }

<details markdown="1">
<summary>Centrality Measures Comparison MicroSim (reused)</summary>
Type: graph-model
**sim-id:** centrality-measures-comparison<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/centrality-measures-comparison/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/centrality-measures-comparison

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: compare, distinguish<br/>
Learning objective: Compare degree, betweenness, closeness, and PageRank centrality computed on the identical provider referral network, and distinguish which node each measure ranks highest and why.

Reused from the MicroSim catalog (exact topical fit). Switching the centrality measure dropdown recomputes node size and shading live on the same network, and the top-5 ranking panel updates — directly demonstrating the claim in the preceding paragraphs that a low-degree bridge node can outrank a high-degree hub under betweenness, and that PageRank's damping slider changes how much influence propagates through highly-connected neighbors.
</details>

!!! mascot-thinking "There's No Single 'Most Important' Node"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that four different, mathematically valid measures can each crown a *different* provider as "most important" in the exact same network. That's not a bug — it means the question "who matters most?" is incomplete until you specify *for what purpose*. Finding a busy hub, a critical bridge, and an influence-broker are three different jobs, and now you have three different tools for them.

A closely related but more local measure, the **clustering coefficient**,
asks a narrower structural question: of a node's neighbors, what fraction
are also connected to each other? A patient's care team where every provider
also consults directly with every other provider has a clustering
coefficient of 1.0 (fully interconnected); a patient whose providers never
communicate with each other has a clustering coefficient of 0.0, a useful
early warning signal for care coordination gaps. Formally, for a node with
\( k \) neighbors, the clustering coefficient divides the number of edges
that actually exist among those neighbors by the maximum possible,
\( \binom{k}{2} \): a patient with three providers where only one pair of
those providers consults directly has a clustering coefficient of
\( \frac{1}{3} \), since only 1 of the 3 possible provider-to-provider
connections exists.

## Connectivity, Cycles, and Suspicious Patterns

Centrality ranks nodes within a graph that is already known to be connected.
A more basic structural question asks whether a graph is connected at all.
**Connected components** are the maximal groups of nodes reachable from one
another by following edges in either direction, ignoring direction entirely
— a healthcare graph with two hospital systems that have never shared a
patient or referral would show up as two separate connected components, a
useful data-quality signal that two supposedly integrated data sources
haven't actually connected yet. Finding connected components is
computationally cheap: a single breadth-first or depth-first traversal
(Chapter 1's two traversal strategies) starting from an arbitrary
unvisited node will find every node in that node's component before it
terminates, and repeating the process from any remaining unvisited node
finds the next component, until every node in the graph has been assigned
to exactly one component.

When edge direction *does* matter, the relevant concept is the **strongly
connected component**: a maximal group of nodes where every node can reach
every other node by following directed edges *in the required direction* —
not just any direction. In a directed referral network, a strongly connected
component means Dr. A can reach Dr. B by referral, and Dr. B can also reach
Dr. A by referral, and the same holds for every pair in the group. Because a
strongly connected component requires this two-way reachability, its
existence is a direct signature of a **cycle**: a strongly connected
component containing more than one node necessarily contains at least one
directed cycle, and finding one is equivalent to finding the other.

Consider a concrete four-provider example: Dr. A refers to Dr. B, Dr. B
refers to Dr. C, Dr. C refers back to Dr. A, and Dr. D refers to Dr. A but
receives no referrals from anyone. Providers A, B, and C form a strongly
connected component of size three, since each can reach the other two by
following referral edges forward — A→B→C→A is a complete loop. Dr. D is
*not* part of that component: although D can reach A (and therefore B and
C) by referral, no path leads back to D, so the two-way reachability
requirement fails for D. Algorithms that find strongly connected
components, such as Tarjan's algorithm, work by running a single
depth-first traversal (the exact traversal strategy Chapter 1 introduced)
while tracking each node's earliest-reachable ancestor, identifying a
complete component the moment a traversal path loops back to a node already
on the current search stack — that loop-back moment is precisely a cycle
being detected in real time, which is why strongly connected components and
cycle detection are computed by nearly the same algorithmic pass.

**Cycle detection** is the graph algorithm task of finding these closed
loops in a directed graph, and it matters far beyond mathematical curiosity.
Chapter 1 noted that referral networks are ideally modeled as directed
acyclic graphs so that traversal always terminates — cycle detection is the
tool that verifies a real referral network actually has that property, and
flags it when it doesn't. A simple depth-first cycle check maintains two
sets of "seen" nodes: nodes fully finished processing, and nodes currently
on the active recursion path. If a traversal ever reaches a node that is
already on the *active path* (not merely previously visited), a cycle has
been found — in the A→B→C→A example, the traversal reaches C, follows its
edge back to A, finds A still on the active path, and immediately reports
the cycle A→B→C→A without needing to explore the rest of the graph first.

More consequentially, an unexpected cycle in a *financial* relationship
graph — Provider A refers to Provider B, who refers to Provider C, who
refers back to Provider A, with kickback payments following the same loop —
is a classic fraud signature. Detecting the cycle is the first step;
recognizing that the cycle overlaps a financial relationship is an instance
of the broader skill this section closes with: **graph pattern
recognition**, the task of searching a graph for a specific, meaningful
subgraph shape (a triangle of referrals, a star of shared addresses, a
cycle with matching financial edges) rather than computing a single number
for the whole graph. Where cycle detection asks a yes-or-no structural
question ("does a loop exist?"), pattern recognition asks a more targeted
question ("does *this specific, meaningful shape* exist, and where?") —
searching, for instance, specifically for a 3-node cycle in which every
edge is *also* duplicated by a `FINANCIAL_RELATIONSHIP` edge, a much more
precise fraud signal than an unadorned referral cycle by itself.

#### Diagram: Cycle Detection and Pattern Explorer MicroSim

<iframe src="../../sims/cycle-detection-pattern-explorer/main.html" width="100%" height="508px" scrolling="no"></iframe>

[Run the Cycle Detection and Pattern Explorer MicroSim Fullscreen](../../sims/cycle-detection-pattern-explorer/main.html){ .md-button }

<details markdown="1">
<summary>Cycle Detection and Pattern Explorer MicroSim (reused)</summary>
Type: graph-model
**sim-id:** cycle-detection-pattern-explorer<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/cycle-detection-pattern-explorer/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/cycle-detection-pattern-explorer

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, distinguish<br/>
Learning objective: Examine a directed provider referral network to locate 3-cycles and 4-cycles (evidence of strongly connected components), and distinguish a benign coordination loop from a cycle that overlaps a financial-relationship pattern.

Reused from the MicroSim catalog. Most REFERS_TO edges flow forward through the network, but a seeded 3-cycle and 4-cycle close into loops, and some of the same providers also carry FINANCIAL_RELATIONSHIP edges. Selecting "financial loops" highlights exactly the cycle-plus-financial-overlap pattern this section describes as a fraud signature — the concrete example that turns cycle detection and graph pattern recognition from abstract definitions into a specific, checkable structural signal.
</details>

!!! mascot-tip "A Cycle Alone Isn't Proof of Fraud"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a shortcut worth remembering: a referral cycle by itself can be perfectly innocent — specialists legitimately co-manage complex patients back and forth. The real signal is a cycle that *overlaps* another relationship type, like shared finances or shared addresses. Always ask "a cycle in what, combined with what?" before treating any single pattern as evidence.

## Similarity: How Alike Are Two Nodes?

Centrality and cycle detection describe a node's or a group's position
within a single graph. A different, equally important question compares two
nodes to each other: how similar are they? A **similarity measure** is any
function that produces a score describing how alike two nodes are, based on
either their shared connections or their properties.

**Jaccard similarity** compares two nodes by the *sets* of neighbors they
share: it is the size of their neighbor sets' intersection divided by the
size of their union.

\[ J(A, B) = \frac{|N(A) \cap N(B)|}{|N(A) \cup N(B)|} \]

If Dr. Patel refers to {Dr. Osei, Dr. Nguyen, Dr. Reyes} and Dr. Kim refers
to {Dr. Osei, Dr. Reyes, Dr. Lin}, their shared referral targets are
{Dr. Osei, Dr. Reyes} (2 providers) out of a combined total of {Dr. Osei,
Dr. Nguyen, Dr. Reyes, Dr. Lin} (4 providers), giving \( J = \frac{2}{4} =
0.5 \) — Dr. Patel and Dr. Kim refer similarly half the time, a useful
signal for a "providers like this one" recommendation.

**Cosine similarity** takes a different approach entirely, comparing two
nodes as numeric vectors rather than sets of neighbors, measuring the cosine
of the angle between them — a value of 1 means the vectors point in
identical directions (maximally similar), and 0 means they are unrelated.

\[ \cos(\theta) = \frac{A \cdot B}{\lVert A \rVert \lVert B \rVert} \]

Suppose two patients' symptom-severity profiles are represented as vectors
\( A = (3, 1, 0) \) and \( B = (2, 2, 0) \) across three symptoms (fatigue,
joint pain, fever). The dot product is \( (3)(2) + (1)(2) + (0)(0) = 8 \),
and the magnitudes are \( \lVert A \rVert = \sqrt{9+1+0} = 3.16 \) and
\( \lVert B \rVert = \sqrt{4+4+0} = 2.83 \), giving
\( \cos(\theta) = \frac{8}{3.16 \times 2.83} \approx 0.894 \) — a high
similarity score suggesting these two patients' symptom profiles point in
nearly the same direction, even though their raw severity numbers differ.
Cosine similarity is the workhorse metric behind clinical decision support
systems that retrieve "similar past cases," and it becomes even more
powerful once nodes are represented as learned vectors, which is exactly
where this chapter is headed next.

Cosine similarity's key advantage over a more obvious alternative — plain
Euclidean distance between the two vectors — is that it measures *direction*
rather than *magnitude*. Consider a third patient with a symptom vector
\( C = (6, 2, 0) \): note that \( C \) points in exactly the same direction
as \( A = (3, 1, 0) \), just scaled up (twice the severity on every
symptom). Cosine similarity between \( A \) and \( C \) is a perfect 1.0,
correctly recognizing that these two patients share an identical symptom
*pattern* even though one reports twice the severity of the other. Euclidean
distance, by contrast, would treat \( A \) and \( C \) as fairly far apart,
simply because their raw numbers differ — the wrong answer for a clinical
question that cares about *pattern* of symptoms more than raw intensity,
which is exactly why cosine similarity, not Euclidean distance, is the
standard choice for comparing clinical profiles and embeddings throughout
this book.

#### Diagram: Vector Embedding Similarity Visualization MicroSim

<iframe src="../../sims/vector-embedding-similarity-visualization-microsim/main.html" width="100%" height="618px" scrolling="no"></iframe>

[Run the Vector Embedding Similarity Visualization MicroSim Fullscreen](../../sims/vector-embedding-similarity-visualization-microsim/main.html){ .md-button }

<details markdown="1">
<summary>Vector Embedding Similarity Visualization MicroSim (reused)</summary>
Type: microsim
**sim-id:** vector-embedding-similarity-visualization-microsim<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/vector-embedding-similarity-visualization-microsim/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/vector-embedding-similarity-visualization-microsim

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: calculate, demonstrate<br/>
Learning objective: Apply cosine similarity to retrieve the clinical concepts nearest a query vector in a 2-D projected embedding space, and demonstrate how adjusting the similarity threshold changes the result set.

Reused from the MicroSim catalog. Twenty medical conditions are projected into two dimensions and colored by category; selecting a clinical query like "Chest pain and dyspnea" draws lines to its nearest concepts by cosine similarity, with exact percentage scores listed. This is the by-hand calculation above, scaled up to twenty real concepts and made interactively explorable.
</details>

## Link Prediction: Guessing the Next Edge

Similarity measures compare two *existing* nodes. **Link prediction** turns
that comparison into a forecast: given the graph's current structure, which
edge is most likely to form next? The same Jaccard similarity formula used
above for comparing providers can be repurposed directly as a link
prediction score — two providers with high Jaccard similarity in their
referral targets, but who have never referred to *each other*, are natural
candidates for a predicted future referral relationship, since they clearly
serve overlapping patient populations.

A refinement called **Adamic-Adar** improves on plain Jaccard by weighting
shared neighbors unequally: a shared connection to a rare, narrowly-focused
specialist counts for more evidence of similarity than a shared connection
to a generalist that half the network refers to anyway. Its formula sums,
over every shared neighbor \( w \), the inverse log of that neighbor's own
degree:

\[ AA(A, B) = \sum_{w \in N(A) \cap N(B)} \frac{1}{\log \lvert N(w) \rvert} \]

Suppose Dr. Patel and Dr. Kim (from the Jaccard example above) share two
referral targets: Dr. Osei, who receives referrals from 15 other providers
network-wide, and Dr. Reyes, a rare pediatric subspecialist who receives
referrals from only 3 providers total. Adamic-Adar computes
\( \frac{1}{\log 15} + \frac{1}{\log 3} \approx \frac{1}{2.71} +
\frac{1}{1.10} \approx 0.37 + 0.91 = 1.28 \) — the rare shared connection to
Dr. Reyes contributes roughly two and a half times as much weight as the
common shared connection to Dr. Osei, reflecting the intuition that sharing
a narrow, unusual referral target is stronger evidence of genuine similarity
than sharing a popular one that almost everyone refers to.

Link prediction has direct value beyond simple recommendation. Provider
network teams use it to identify likely-but-undocumented referral
relationships worth verifying; population health teams use it to predict
which patients are likely to need a specific specialist next based on
similar patients' care paths; fraud teams use an inverted version of the
same logic to flag a *newly formed* edge that looks statistically unlikely
given the rest of the network, such as a sudden referral relationship
between two providers with almost no shared patient population.

#### Diagram: Link Prediction Scoring MicroSim

<iframe src="../../sims/link-prediction-scoring/main.html" width="100%" height="568px" scrolling="no"></iframe>

[Run the Link Prediction Scoring MicroSim Fullscreen](../../sims/link-prediction-scoring/main.html){ .md-button }

<details markdown="1">
<summary>Link Prediction Scoring MicroSim (reused)</summary>
Type: microsim
**sim-id:** link-prediction-scoring<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/link-prediction-scoring/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/link-prediction-scoring

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: calculate, rank<br/>
Learning objective: Calculate Common Neighbors, Jaccard, and Adamic-Adar link-prediction scores over a provider referral network and rank which non-existent referral edge is most likely to form next.

Reused from the MicroSim catalog. Selecting a scoring metric ranks candidate provider pairs by predicted-edge likelihood, and clicking a pair shows the shared-neighbor set and the exact formula with real numbers substituted — the same Jaccard calculation worked out by hand above, now computed live across an entire network and compared against two alternative scoring metrics.
</details>

!!! mascot-encourage "Embeddings Are the Hardest Idea in This Chapter — That's Normal"
    ![Sage giving encouragement](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    If turning a graph's structure into a list of numbers feels like a leap, that's completely normal — most people need to see it happen step by step before it clicks. You've already succeeded at the hard part: understanding *why* structural similarity matters. The next section just shows one concrete way to compute it automatically.

## From Structure to Numbers: Graph and Node Embeddings

Every similarity and link-prediction calculation so far has depended on
someone manually deciding what to compare — shared neighbors, or a hand-built
symptom vector. A **graph embedding** is a technique that instead *learns*
a numeric vector representation for elements of a graph automatically, by
training on the graph's own structure, such that nodes playing similar
structural roles end up with similar vectors — exactly the property cosine
similarity needs to be useful. A **node embedding** is a graph embedding
applied specifically to individual nodes (as opposed to an **edge
embedding**, the less common case of learning a vector for each edge, used
when the relationship itself, not just its endpoints, needs to be compared
against other relationships). Edge embeddings matter when the *type* of a
relationship carries meaning that comparing endpoints alone would miss — for
example, distinguishing a `REFERRED_TO` edge reflecting routine specialty
care from one reflecting an urgent, high-risk transfer, even between the
same two providers, by learning a separate vector for the edge itself
rather than relying only on the two nodes it connects.

The dominant technique behind node embeddings is **message passing**: each
node repeatedly updates its own vector by averaging it together with its
neighbors' vectors, so that after several rounds, a node's vector reflects
not just its own properties but the properties of everything nearby in the
graph. Formally, one round of message passing updates node \( v \)'s vector
\( h_v \) as:

\[ h_v^{(k+1)} = \frac{1}{|N(v)|+1} \left( h_v^{(k)} + \sum_{u \in N(v)} h_u^{(k)} \right) \]

which simply says: the new vector is the average of the node's own current
vector and all of its neighbors' current vectors. Tracing this by hand on a
tiny 3-node chain — Patient X connected only to Patient Y, and Patient Y
also connected to Patient Z — started with initial 1-dimensional vectors
\( h_X^{(0)} = 1.0 \), \( h_Y^{(0)} = 5.0 \), \( h_Z^{(0)} = 9.0 \): after
one round, \( h_X^{(1)} = \frac{1.0+5.0}{2} = 3.0 \) (X has only neighbor Y),
\( h_Y^{(1)} = \frac{5.0+1.0+9.0}{3} \approx 5.0 \) (Y has both X and Z as
neighbors, so it stays near the middle), and \( h_Z^{(1)} = \frac{9.0+5.0}{2}
= 7.0 \). Notice that X and Z, originally 8.0 apart (1.0 versus 9.0), moved
to 3.0 and 7.0 — 4.0 apart — after a single round, each pulled toward the
other through their shared neighbor Y. A second round would pull them even
closer together, since each now carries a little of the other's influence
already baked into its vector from round one. Two patients who share many
of the same providers and diagnoses will, after a few rounds of this
averaging, end up with numerically similar vectors — not because anyone
told the algorithm they were similar, but because their shared neighborhood
pulled their vectors toward each other automatically. This is the same
underlying mechanism used by **graph neural networks**, which Chapter 6
covers in depth.

#### Diagram: Node Embedding Explorer MicroSim

<iframe src="../../sims/node-embedding-explorer/main.html" width="100%" height="618px" scrolling="no"></iframe>

[Run the Node Embedding Explorer MicroSim Fullscreen](../../sims/node-embedding-explorer/main.html){ .md-button }

<details markdown="1">
<summary>Node Embedding Explorer MicroSim (reused)</summary>
Type: microsim
**sim-id:** node-embedding-explorer<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/node-embedding-explorer/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/node-embedding-explorer

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: explain, interpret<br/>
Learning objective: Explain how repeated rounds of neighbor-averaging (message passing) cause structurally similar nodes to converge toward similar embedding vectors, interpreting the rising cohort-separation score as evidence of this convergence.

Reused from the MicroSim catalog. A patient graph on the left is linked to its 2-D embedding space on the right; stepping through message-passing rounds (round 0 is a random cloud) shows three latent cohorts progressively separating as each round averages a node's vector with its neighbors', with a numeric separation score climbing each step — direct, step-through evidence for the averaging mechanism just described in prose, satisfying the Understand-level requirement for concrete, inspectable data over passive animation.
</details>

## Chapter Summary

!!! mascot-celebration "You've Built a Full Graph Analytics Toolkit"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just went from shortest paths to centrality to cycle detection to similarity, link prediction, and embeddings — the exact analytical stack that powers fraud detection, referral recommendation, and clinical similarity search later in this book. That's a lot of new tools in one chapter, and you've earned every one of them.

This chapter reframed the graph not just as storage but as a source of
derived insight: shortest path algorithms find efficient routes,
centrality measures rank nodes by different definitions of importance,
cycle detection and pattern recognition surface suspicious structures,
similarity measures and link prediction compare and forecast relationships,
and embeddings turn all of that structural information into numeric vectors
a machine-learning model can use directly. In
[Chapter 6](../06-graph-embeddings-clustering-gnn/index.md), we build on the
embedding concept introduced here to reach graph neural networks and the
clustering algorithms that group similar nodes automatically at scale.

[See Annotated References](./references.md)
