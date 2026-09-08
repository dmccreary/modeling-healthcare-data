---
title: Graph Embeddings, Clustering, and Graph Neural Networks
description: Extends graph analytics into machine-learning territory -- graph neural networks, message passing, graph clustering algorithms, temporal graph analysis, and structural metrics like motifs and density.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:08:39
version: 1.10
---

# Graph Embeddings, Clustering, and Graph Neural Networks

## Summary

This chapter extends graph analytics into machine-learning territory: graph and node embeddings, graph neural networks, and message passing. It covers graph clustering techniques (Louvain method, label propagation) and specialized analyses such as temporal graph analysis, motif detection, and graph benchmarking. Students finish able to explain how a graph's structure can be turned into numerical representations for downstream machine learning.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Graph Neural Network | 60 |
| Message Passing | 2 |
| Node Classification | 1 |
| Graph Clustering | 42 |
| Louvain Method | 21 |
| Label Propagation | 15 |
| Minimum Spanning Tree | 2 |
| Random Walk | 1 |
| Node2Vec | 2 |
| Graph Convolutional Network | 1 |
| Temporal Graph Analysis | 10 |
| Dynamic Graph Update | 2 |
| Graph Sampling | 1 |
| Motif Detection | 2 |
| Triangle Count | 1 |
| Weakly Connected Component | 5 |
| Graph Density Metric | 2 |
| Assortativity | 1 |
| Influence Propagation | 2 |
| Graph Benchmarking | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 5: Graph Algorithms, Centrality, and Similarity Measures](../05-graph-algorithms-centrality-similarity/index.md)

---

Chapter 5 ended by turning a graph's structure into numeric vectors through
message passing — a first taste of graph embeddings. This chapter goes
further: it formalizes the machine-learning architecture built on that idea,
introduces the algorithms that automatically discover *groups* of related
nodes rather than just pairwise similarity, and rounds out the toolkit with
the structural metrics and time-aware techniques that make graph analytics
production-ready for a health system's data.

!!! mascot-welcome "From Vectors to Learning Machines"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Let's connect the dots! You've already watched message passing turn a graph's shape into numbers by hand. This chapter hands that same idea to a learning machine, teaches it to find whole communities of related patients and providers automatically, and shows you how to keep the analysis honest as the graph keeps changing underneath you. Ready to trace a few more pathways?

## Graph Neural Networks: Learning From Structure

Chapter 5 showed that repeated rounds of neighbor-averaging cause
structurally similar nodes to converge toward similar embedding vectors — a
manual, fixed procedure. A **graph neural network** (GNN) formalizes and
generalizes that same message-passing procedure into a trainable machine
learning model: instead of a fixed averaging rule, each round of message
passing uses learned weights, adjusted through training so that the
resulting embeddings are optimized for a specific downstream task, rather
than just reflecting raw structural similarity.

Formally, one layer of a GNN generalizes Chapter 5's fixed averaging
equation by inserting a learned weight matrix \( W \) and a non-linear
activation function \( \sigma \) (such as ReLU):

\[ h_v^{(k+1)} = \sigma\left( W \cdot \frac{1}{|N(v)|+1}\left(h_v^{(k)} + \sum_{u \in N(v)} h_u^{(k)}\right) \right) \]

Compare this directly to Chapter 5's plain-averaging update rule: the
averaging step inside the parentheses is *identical*. What a GNN adds is
the matrix \( W \), whose numeric values are not fixed in advance but
learned by training the network on labeled examples — patients with known
readmission outcomes, say — so that the specific way neighbor information
gets blended is whatever blend turns out to be most predictive of
readmission, rather than a simple, task-agnostic average. The activation
function \( \sigma \) then introduces the non-linearity that lets a
multi-layer GNN represent far more complex patterns than repeated plain
averaging ever could on its own.

The most widely used GNN architecture is the **Graph Convolutional Network**
(GCN), which borrows its name and its core idea from convolutional neural
networks in image processing: just as an image convolution combines a
pixel's value with its immediate neighboring pixels, a graph convolution
combines a node's vector with its immediate neighboring nodes' vectors,
using learned weights instead of Chapter 5's simple average. Stacking
several convolutional layers lets information from increasingly distant
neighbors reach a node — after two layers, a patient's embedding reflects
not just their own providers but their providers' other patients as well.

The most common task trained on top of these learned embeddings is **node
classification**: predicting a label for each node using its embedding as
input, such as predicting whether a given patient is at high risk of
hospital readmission based on how their embedding compares to patients who
were and were not readmitted historically. Because the embedding already
encodes structural context — which providers a patient sees, what
conditions cluster nearby in the graph — a GNN-based classifier can pick up
on relational risk factors a model looking only at a patient's own
individual properties would miss entirely. Node classification is
formally a supervised learning task: the GNN trains on patients whose
readmission outcome is already known (labeled data), learning weights that
map an embedding to a predicted label, and is then applied to predict
labels for new, unlabeled patients — the same train-then-predict structure
used throughout machine learning, here made possible only because the
embedding step first turned graph structure into a fixed-length numeric
vector that a classifier can actually consume.

#### Diagram: Node Embedding Explorer MicroSim (Message Passing as a GNN Layer)

<iframe src="../../sims/node-embedding-explorer/main.html" width="100%" height="618px" scrolling="no"></iframe>

[Run the Node Embedding Explorer MicroSim Fullscreen](../../sims/node-embedding-explorer/main.html){ .md-button }

<details markdown="1">
<summary>Node Embedding Explorer MicroSim (reused, revisited)</summary>
Type: microsim
**sim-id:** node-embedding-explorer<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/node-embedding-explorer/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/node-embedding-explorer

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: explain, relate<br/>
Learning objective: Relate the manual neighbor-averaging procedure from Chapter 5 to a single trainable layer of a graph neural network, explaining what a GNN adds (learned weights) on top of the same message-passing mechanism.

Reused from the MicroSim catalog. This is the same MicroSim Chapter 5 used to introduce node embeddings, revisited here with a different framing: each "Next step" round the learner steps through is mechanically identical to one graph convolution layer in a GCN, with the one difference this chapter's prose highlights — a real GNN learns the averaging weights from training data rather than using a fixed simple average. Seeing the identical mechanism twice, once as a hand-computed embedding and again as a GNN building block, reinforces that GNNs are not a wholly new idea but a trainable generalization of what the learner already practiced.
</details>

## An Older Path to the Same Destination: Random Walks

Message passing is not the only way to generate node embeddings. **Random
walk** based methods take a different approach: starting from a node, the
algorithm takes a series of random steps to neighboring nodes, recording the
sequence of nodes visited, and repeats this many times from every starting
node. **Node2Vec**, a widely used random-walk embedding algorithm, then
treats each recorded walk like a sentence and each node like a word, feeding
these walk-sequences into a word-embedding-style training process so that
nodes appearing near each other across many walks end up with similar
vectors — the same underlying goal as message passing, achieved by sampling
paths instead of averaging neighbors directly.

A concrete trace makes the sampling process tangible. Starting a random
walk at Maria Chen's `Patient` node, the algorithm might step to `Dr.
Patel` (her provider), then to `Type 2 Diabetes` (a condition Dr. Patel
treats in many patients), then to another patient, `James Wu`, who also has
that diagnosis — producing the walk sequence `[MariaChen, DrPatel,
Type2Diabetes, JamesWu]`. Repeating this random-stepping process hundreds
of times from every node in the graph produces a large collection of such
sequences, which Node2Vec feeds into the same training algorithm used for
word embeddings (word2vec), treating each walk as a "sentence" and each
node as a "word." Nodes that co-occur frequently across many walks — Maria
Chen and James Wu, in this example, both reachable through the same
diagnosis — end up with similar vectors, purely as a byproduct of how often
a short random walk visits both of them.

!!! mascot-thinking "Two Philosophies, One Goal"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that message passing and random walks solve the identical problem — turning structure into comparable vectors — through opposite strategies. Message passing looks at *every* neighbor at once, layer by layer. Random walks sample *one path at a time*, many times over. Neither is universally better; random walks scale more easily to huge graphs, while message passing (via GNNs) can be trained end-to-end for a specific prediction task.

## Graph Clustering: Finding Groups Automatically

Chapter 5's connected components found groups of nodes that are reachable
from each other at all — a fairly blunt grouping, since a single connected
component can span an entire health system. **Graph clustering** asks a
sharper question: within a single connected graph, which nodes form dense,
tightly-knit subgroups, even though the whole graph remains technically
connected by a few sparser bridging edges? A healthcare graph of patients,
diagnoses, and medications naturally clusters into disease cohorts —
cardiac, diabetes, renal — because connections *within* a cohort (shared
diagnoses, shared medications) are dense, while connections *between*
cohorts are comparatively rare.

The quality of a proposed clustering is measured by **modularity**, a score
comparing the actual density of edges inside proposed clusters against the
density that would be expected if edges were placed at random while
keeping each node's degree the same:

\[ Q = \frac{1}{2m} \sum_{i,j} \left[ A_{ij} - \frac{k_i k_j}{2m} \right] \delta(c_i, c_j) \]

Here \( m \) is the total number of edges, \( A_{ij} \) is 1 if an edge
connects nodes \( i \) and \( j \) (0 otherwise), \( k_i \) and \( k_j \) are
their degrees, and \( \delta(c_i, c_j) \) is 1 only when both nodes are
assigned to the same cluster. In plain terms: modularity rewards a
clustering for every real edge that falls *inside* a cluster, and penalizes
it by how many edges we would have *expected* to see there by chance given
each node's popularity — a clustering scores well only when its clusters
are genuinely denser than random chance would predict, not merely because
they happen to be large.

The **Louvain method** is the most widely used algorithm for finding a
high-modularity clustering in practice. It works iteratively: start with
every node in its own single-node cluster, then repeatedly move nodes into
whichever neighboring cluster most increases the modularity score above,
merging small clusters into larger ones across several passes until no move
improves the score further. Tracing the first pass on a small 6-node
network — three cardiac patients densely cross-referencing each other's
providers, and three diabetes patients doing the same, with only one
provider shared between groups — Louvain would find that moving each
cardiac patient into a shared cluster with the other cardiac patients
increases modularity (their edges are much denser with each other than the
random-chance baseline predicts), while moving a cardiac patient into the
diabetes cluster would decrease it, since that patient shares almost no
edges with the diabetes group. After one pass, two clusters emerge; a
second pass then checks whether merging entire clusters together would
improve modularity further, typically converging in just a few passes even
on graphs with millions of nodes.

**Label propagation** takes a simpler, faster approach that never computes
modularity at all: every node starts with a unique label, and on each
round, every node adopts the label held by the majority of its neighbors,
repeating until labels stabilize into naturally emerging clusters. In the
same 6-node example, after one round most cardiac patients would already
have adopted whichever label is most common among their tightly-connected
cardiac neighbors, and diabetes patients would do the same within their own
group — convergence often happens in just two or three rounds, which makes
label propagation considerably faster than Louvain on very large graphs, at
some cost in clustering precision since it never explicitly optimizes for
modularity the way Louvain does.

#### Diagram: Network Community Detection Interactive Graph Model

<iframe src="../../sims/network-community-detection-graph-model/main.html" width="100%" height="488px" scrolling="no"></iframe>

[Run the Network Community Detection Interactive Graph Model MicroSim Fullscreen](../../sims/network-community-detection-graph-model/main.html){ .md-button }

<details markdown="1">
<summary>Network Community Detection Interactive Graph Model (reused)</summary>
Type: graph-model
**sim-id:** network-community-detection-graph-model<br/>
**Library:** vis-network<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/network-community-detection-graph-model/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/network-community-detection-graph-model

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: examine, distinguish<br/>
Learning objective: Examine a mixed patient-provider-diagnosis-medication network to distinguish the three disease-cohort clusters a Louvain-style algorithm assigns, and identify the sparse bridge edges that connect otherwise-separate cohorts.

Reused from the MicroSim catalog. Toggling "Color by community" reveals three algorithm-assigned cohorts (cardiac, diabetes, renal) that are not visually obvious in the uncolored network, directly demonstrating why an automated clustering algorithm like Louvain earns its place — a human eyeballing the raw graph cannot reliably spot these groups, but the algorithm's modularity-driven grouping finds them immediately, including the comorbid-patient bridge edges linking two cohorts at once.
</details>

Two smaller graph-theoretic concepts round out this section's structural
toolkit. A **minimum spanning tree** is the smallest possible set of edges
that keeps every node in a connected graph reachable, with the lowest total
edge weight — useful for network design questions like connecting a set of
rural clinics to a shared data backbone at minimum total cable cost, rather
than for clustering itself. Algorithms that compute a minimum spanning
tree, such as Kruskal's or Prim's, work by greedily adding the
cheapest available edge that does not create a cycle, repeating until
every node is connected — for five rural clinics, this means never paying
for a redundant connection when a cheaper path to full connectivity already
exists.

Measuring cluster quality or local structure often comes down to counting:
a **triangle count** tallies how many sets of three mutually connected
nodes exist in a graph, which is precisely the raw count Chapter 5's
clustering coefficient normalizes into a per-node ratio — more triangles
around a node generally means a denser, more tightly bonded local
community. In the earlier six-node cardiac/diabetes example, the three
cardiac patients who all cross-reference each other's providers form
exactly one triangle among themselves, while the lone shared provider
connecting the two cohorts does not complete any triangle with the
diabetes group, since the diabetes patients don't also connect to each
other through that shared provider — a triangle count of one for that
region of the graph, versus zero for the sparser cross-cohort connections.

## Structural Signatures: Motifs, Density, and Assortativity

Beyond clustering entire graphs into groups, graph scientists also look for
small, meaningful shapes and global statistics that describe a graph's
overall character. **Motif detection** searches a graph for small,
recurring connection patterns — a specific 3-node or 4-node shape that
appears far more often than random chance would predict, such as a
"provider-refers-to-provider-refers-back" triangle that recurs across many
different provider trios, suggesting a systemic referral pattern rather than
an isolated case.

Two summary statistics describe a graph's overall shape rather than any
specific location within it. The **graph density metric** measures what
fraction of all *possible* edges in a graph actually exist — a sparse
referral network where most provider pairs never refer to each other has
low density, while a small, tightly co-managed care team has high density.
**Assortativity** measures whether nodes tend to connect to other nodes with
similar characteristics (positive assortativity, like high-degree hub
hospitals mostly referring to other high-degree hubs) or to dissimilar ones
(negative assortativity, like large hospitals referring frequently to small
rural clinics). A referral network with strong positive assortativity by
hospital size suggests large academic medical centers mostly refer among
themselves, potentially isolating smaller community clinics from
specialist expertise — a structural insight a single centrality score could
never reveal, since assortativity describes a *pattern of connection*
across the whole graph rather than any one node's individual importance.

| Metric | What It Measures | Healthcare Example |
|---|---|---|
| Motif Detection | Recurring small connection shapes | A repeated 3-provider referral triangle |
| Triangle Count | Raw count of fully-connected node triples | Density input to the clustering coefficient |
| Graph Density Metric | Fraction of possible edges that exist | How interconnected a care team's providers are |
| Assortativity | Do similar nodes connect to each other? | Large hospitals referring mostly to other large hospitals |

!!! mascot-tip "Triangle Count Is the Building Block, Clustering Coefficient Is the Ratio"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a shortcut for keeping these straight: triangle count is a raw whole number for the graph (or per node), while Chapter 5's clustering coefficient divides that count by the maximum possible triangles to get a 0-to-1 ratio. If you remember "count first, then normalize," you'll never mix the two up on an exam.

## Graphs That Move: Temporal and Dynamic Analysis

Every algorithm so far has assumed the graph holds still while it's
analyzed. Real healthcare graphs never do — patients are admitted and
discharged, new claims arrive hourly, and referral patterns shift with
provider turnover. **Temporal graph analysis** studies how a graph's
structure changes over time, treating each edge as having a timestamp (or a
valid time range) rather than existing permanently, so that questions can be
asked about specific windows — "what did Maria Chen's care team look like
during her diabetes diagnosis month, versus a year later?"

Supporting that kind of analysis in a live system requires a **dynamic
graph update**: the ability to add, modify, or remove nodes and edges in a
running graph database without rebuilding the entire structure from
scratch, which matters enormously for a hospital system where new
encounters and lab results arrive continuously. A graph database supporting
efficient dynamic updates can absorb a new `Encounter` node and its edges
in milliseconds as a patient checks in, immediately making that fact
available to every downstream query and algorithm — in contrast to a batch
system that only refreshes its graph snapshot once per night, where a
clinical decision support query run at 2 p.m. would still be working from
that morning's stale picture of the patient. A related but distinct
application layered on top of temporal structure is **influence
propagation**: modeling how an effect (an infection, a piece of clinical
guidance, or a formulary change) spreads outward through a network over
successive time steps, following edges the way a rumor spreads through a
social network — the same mathematical machinery public health teams use to
model outbreak spread through a patient-contact graph. A common model,
independent cascade, assigns each edge a fixed probability of "activating"
its neighbor at the next time step: if a newly-infected patient has a 30%
chance of transmitting to each of their three household contacts, one round
of propagation activates each contact independently with probability 0.3,
and the newly-activated contacts then attempt to activate *their* own
untouched neighbors in the following round — a simple per-edge probability
rule that, simulated over many rounds across a whole contact graph,
reproduces surprisingly realistic outbreak curves.

## Working at Scale: Sampling, Weak Connectivity, and Benchmarks

Two final concepts address the practical reality of running these
algorithms on graphs too large to process in full, or of knowing whether an
algorithm is even working correctly. **Graph sampling** extracts a smaller,
representative subgraph from a much larger one, letting an analyst
prototype an algorithm or estimate a metric without processing the entire
multi-million-node graph — accepting some statistical imprecision in
exchange for tractable runtime. A common sampling strategy, snowball
sampling, starts from a small random set of seed nodes and expands outward
by including each seed's neighbors, then their neighbors, up to a target
sample size — a claims-fraud team might sample 10,000 patients this way to
prototype and tune a new pattern-recognition rule in minutes rather than
running it against the full multi-million-patient graph on every iteration,
only running the final, validated rule against the complete dataset once.

Recall Chapter 5's strongly connected component, which required every node
to reach every other node while respecting edge direction. A **weakly
connected component** relaxes that requirement: it is a maximal group of
nodes that are connected if you ignore edge direction entirely, treating
every directed edge as if it were undirected. A referral network where Dr. A
refers to Dr. B but Dr. B never refers back still forms a single weakly
connected component (since ignoring direction, a path exists both ways) even
though it is not a strongly connected component (since respecting direction,
no path exists from B back to A) — the two measures answer genuinely
different reachability questions on the identical graph. In practice,
weakly connected components are the more commonly computed of the two
first, because they run faster (ignoring direction simplifies the
underlying traversal) and are often used as a preliminary data-quality
check — a graph that unexpectedly splits into many small weakly connected
components usually signals missing linkage data (a patient's records that
never got matched to their existing patient node, for instance) well before
anyone bothers computing the more expensive strongly connected components.

!!! mascot-warning "Weakly Connected Isn't the Same as Strongly Connected"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common mix-up: assuming a single weakly connected component means every node can reach every other node in both directions. It doesn't! Weak connectivity only guarantees a path exists if you're allowed to ignore arrow direction. Always ask "does this question care about direction?" before choosing which connectivity measure answers it.

Finally, **graph benchmarking** is the practice of testing a graph
algorithm's performance and accuracy against standardized datasets and
known-correct results, so that claims like "our fraud-detection algorithm
finds 95% of known fraud rings" can be verified objectively rather than
taken on faith — the same discipline that makes any machine learning claim
trustworthy, applied specifically to graph algorithms. A rigorous benchmark
typically reports both accuracy (did the algorithm correctly flag the
labeled fraud rings in a held-out test dataset, and how many false
positives did it also raise?) and runtime performance (how did execution
time scale as the graph's sampled size grew, connecting benchmarking
directly back to the graph sampling technique just introduced) — together
giving a health system's leadership a defensible, numbers-based answer to
"does this actually work, and can it run fast enough on our real data?"
rather than a vendor's unverified claim.

## Chapter Summary

!!! mascot-celebration "You Can Now Learn From a Graph, Not Just Analyze One"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You just connected message passing to trainable graph neural networks, learned two different philosophies (Louvain and label propagation) for automatically discovering communities, and picked up the structural metrics and time-aware tools that make all of this production-ready. That completes the analytical core of this book.

This chapter carried Chapter 5's embedding idea into full graph neural
networks, introduced graph clustering as the automated alternative to
eyeballing a network for groups, and closed with the structural metrics and
temporal techniques that keep analysis meaningful as a healthcare graph
scales and changes over time. With the full graph-theory and graph-analytics
toolkit now in hand,
[Chapter 7](../07-healthcare-economics-medical-coding/index.md) turns to the
healthcare domain itself — the economics, stakeholders, and medical coding
systems that every remaining chapter's graph models will be built from.
