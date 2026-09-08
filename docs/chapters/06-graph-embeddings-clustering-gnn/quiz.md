# Quiz: Graph Embeddings, Clustering, and Graph Neural Networks

Test your understanding of graph neural networks, clustering, and structural graph metrics with these review questions.

---

#### 1. How does a graph neural network (GNN) extend the plain neighbor-averaging message passing introduced in the previous chapter?

<div class="upper-alpha" markdown>
1. It replaces node embeddings with subject-predicate-object triples
2. It removes the need for a learned weight matrix entirely
3. It inserts a learned weight matrix and a non-linear activation function into the same averaging update, so the blend of neighbor information is optimized for a specific task
4. It can only be used on graphs with fewer than ten nodes
</div>

??? question "Show Answer"
    The correct answer is **C**. A GNN generalizes the fixed averaging rule by adding a learned weight matrix and a non-linear activation function, so the way neighbor information is blended is learned from training data to be predictive of a specific outcome rather than a simple, task-agnostic average. Option A confuses GNNs with RDF triples, an unrelated concept. Option B contradicts the core mechanism that distinguishes a GNN from plain averaging. Option D fabricates a scale restriction not present in the chapter.

    **Concept Tested:** Graph Neural Network

---

#### 2. How does Node2Vec generate node embeddings?

<div class="upper-alpha" markdown>
1. By counting triangles around every node in the graph
2. By computing modularity scores for every possible cluster assignment
3. By encrypting each node's properties before training
4. By taking many random walks from each node and feeding the resulting sequences into a word-embedding-style training process
</div>

??? question "Show Answer"
    The correct answer is **D**. Node2Vec performs random walks from every node, treats each walk like a sentence and each node like a word, and trains embeddings so that nodes co-occurring frequently across walks end up with similar vectors. Option A describes triangle count, an unrelated structural metric. Option B describes the Louvain method's evaluation criterion, not Node2Vec's mechanism. Option C fabricates an unrelated security operation.

    **Concept Tested:** Node2Vec

---

#### 3. What problem does a minimum spanning tree solve?

<div class="upper-alpha" markdown>
1. It finds the smallest possible set of edges that keeps every node in a connected graph reachable, at the lowest total edge weight
2. It predicts which new edges are most likely to form next in the graph
3. It assigns a numeric importance score to every node based on centrality
4. It groups nodes into disease cohorts based on modularity
</div>

??? question "Show Answer"
    The correct answer is **A**. A minimum spanning tree is the smallest set of edges, by total weight, that keeps every node in a connected graph reachable, useful for network design questions like connecting rural clinics to a shared backbone at minimum cost. Option B describes link prediction, a different algorithm. Option C describes centrality measures. Option D describes graph clustering, an unrelated technique.

    **Concept Tested:** Minimum Spanning Tree

---

#### 4. What does modularity measure when evaluating a proposed graph clustering?

<div class="upper-alpha" markdown>
1. The total number of nodes in the largest cluster
2. How the actual density of edges inside proposed clusters compares to the density expected if edges were placed at random given each node's degree
3. The average shortest path length between all pairs of nodes
4. The exact number of triangles in the entire graph
</div>

??? question "Show Answer"
    The correct answer is **B**. Modularity rewards a clustering for real edges falling inside a cluster and penalizes it based on how many edges would be expected there by random chance given each node's degree, so a good clustering must be genuinely denser than chance predicts. Option A describes cluster size, not clustering quality. Option C describes closeness centrality's underlying calculation. Option D describes triangle count, a related but distinct metric.

    **Concept Tested:** Graph Clustering

---

#### 5. How does label propagation differ from the Louvain method for finding clusters?

<div class="upper-alpha" markdown>
1. Label propagation never computes modularity and instead has nodes adopt their neighbors' majority label until labels stabilize, making it faster but less precise than Louvain
2. Label propagation requires computing eigenvector centrality first, while Louvain does not
3. Label propagation only works on weighted graphs, while Louvain only works on unweighted graphs
4. Louvain and label propagation always produce identical clusters on any graph
</div>

??? question "Show Answer"
    The correct answer is **A**. Label propagation has every node adopt the majority label among its neighbors each round until labels stabilize, never explicitly computing modularity, which makes it faster than Louvain on large graphs at some cost in clustering precision. Option B fabricates a dependency on centrality that neither method requires. Option C invents an unrelated weight restriction. Option D is false since the two algorithms can produce different results.

    **Concept Tested:** Label Propagation

---

#### 6. A referral network has Dr. A referring to Dr. B, but Dr. B never refers back to Dr. A. How would this pair be classified under weak versus strong connectivity?

<div class="upper-alpha" markdown>
1. Neither weakly nor strongly connected, since a directed edge without a return path breaks all connectivity
2. Both strongly and weakly connected, since any directed edge automatically satisfies both definitions
3. It forms a single weakly connected component, because ignoring direction a path exists both ways, but it is not a strongly connected component, because no path exists from B back to A respecting direction
4. It forms a strongly connected component only, since Dr. A can still reach Dr. B
</div>

??? question "Show Answer"
    The correct answer is **C**. Weak connectivity ignores edge direction entirely, so a path exists both ways once direction is disregarded, forming one weakly connected component; strong connectivity requires two-way reachability while respecting direction, which fails here since B cannot reach A. Option A incorrectly denies any connectivity. Option B incorrectly claims both hold. Option D misapplies the strongly connected component definition, which requires mutual reachability.

    **Concept Tested:** Weakly Connected Component

---

#### 7. In an independent cascade influence propagation model, a newly infected patient has a 30% chance of activating each of their three household contacts in the next time step. What happens during that first round of propagation?

<div class="upper-alpha" markdown>
1. All three contacts are guaranteed to become activated, since 30% is above the modularity threshold
2. Exactly one contact is activated, chosen at random, and the other two are always skipped
3. No contacts can be activated until a minimum spanning tree is computed for the household
4. Each of the three contacts is independently activated with a 30% probability
</div>

??? question "Show Answer"
    The correct answer is **D**. In the independent cascade model, each edge carries a fixed activation probability, so each of the three household contacts is activated independently with a 30% probability during the round, rather than as a group decision. Option A misapplies an unrelated modularity threshold to a probability model. Option B fabricates an incorrect single-contact restriction. Option C confuses an unrelated graph algorithm with influence propagation.

    **Concept Tested:** Influence Propagation

---

#### 8. A hospital's graph database supports dynamic graph updates rather than a nightly batch refresh. Why does this matter for a clinical decision support query run at 2 p.m.?

<div class="upper-alpha" markdown>
1. It has no effect, since clinical decision support queries never use newly added data
2. It means the query can absorb a patient's new encounter, checked in just minutes earlier, immediately rather than working from that morning's stale snapshot
3. It means the graph must be re-sharded every time a new node is added
4. It replaces the need for a graph index on frequently queried properties
</div>

??? question "Show Answer"
    The correct answer is **B**. Dynamic graph updates let new nodes and edges, such as a just-created encounter, become available to queries within milliseconds, avoiding the stale picture a batch system refreshed only once per night would produce. Option A contradicts the very purpose of dynamic updates. Option C confuses dynamic updates with an unrelated sharding operation. Option D incorrectly conflates dynamic updates with indexing, a separate performance concern.

    **Concept Tested:** Dynamic Graph Update

---

#### 9. In a six-node network of three densely cross-referencing cardiac patients and three densely cross-referencing diabetes patients sharing only one bridging provider, what would the first pass of the Louvain method most likely do?

<div class="upper-alpha" markdown>
1. Move each cardiac patient into a shared cluster with the other cardiac patients, and each diabetes patient into a shared cluster with the other diabetes patients, since those moves increase modularity
2. Merge all six patients into a single cluster immediately, since they share at least one provider
3. Leave every patient in their own single-node cluster, since Louvain never merges nodes
4. Randomly assign patients to clusters without considering edge density
</div>

??? question "Show Answer"
    The correct answer is **A**. Because edges within the cardiac group and within the diabetes group are much denser than random chance would predict, moving each patient into their respective same-cohort cluster increases modularity, which is exactly the greedy move Louvain makes on its first pass. Option B ignores the modularity penalty for merging sparsely connected groups. Option C contradicts Louvain's core iterative merging behavior. Option D ignores that Louvain moves are driven by modularity improvement, not randomness.

    **Concept Tested:** Louvain Method

---

#### 10. Why is a weakly connected component often computed as an early data-quality check, before running the more expensive strongly connected component algorithm?

<div class="upper-alpha" markdown>
1. Because weakly connected components require more computation than strongly connected components
2. Because strongly connected components can only be computed on undirected graphs
3. Because weakly connected components always produce the same result as triangle counts
4. Because a graph unexpectedly splitting into many small weakly connected components usually signals missing linkage data, such as patient records that never got matched to an existing patient node, and weak connectivity is cheaper to compute since it ignores direction
</div>

??? question "Show Answer"
    The correct answer is **D**. Weakly connected components run faster because ignoring direction simplifies the traversal, and an unexpected split into many small components is an early signal of missing linkage data worth investigating before paying the higher cost of computing strongly connected components. Option A reverses the actual computational cost comparison. Option B incorrectly restricts strongly connected components to undirected graphs, when they specifically require directed edges. Option C fabricates an unrelated equivalence to triangle counts.

    **Concept Tested:** Weakly Connected Component

---
