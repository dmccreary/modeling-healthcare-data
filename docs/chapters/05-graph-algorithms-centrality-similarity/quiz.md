# Quiz: Graph Algorithms, Centrality, and Similarity Measures

Test your understanding of graph algorithms, centrality, and similarity measures with these review questions.

---

#### 1. What distinguishes a graph algorithm from an ordinary graph query?

<div class="upper-alpha" markdown>
1. A graph algorithm can only run on undirected graphs
2. A graph algorithm derives new information purely from the graph's connectivity pattern, while a query retrieves data already explicit in the graph
3. A graph algorithm requires a relational database to execute
4. A graph algorithm and a graph query are two names for the exact same operation
</div>

??? question "Show Answer"
    The correct answer is **B**. A query retrieves data already explicit in the graph, such as a stored edge or property, while a graph algorithm derives new information, like a distance, ranking, or prediction, purely from the graph's structure. Option A incorrectly restricts algorithms to undirected graphs. Option C confuses graph algorithms with relational processing. Option D is false since the chapter explicitly distinguishes the two.

    **Concept Tested:** Graph Algorithm

---

#### 2. What does degree centrality measure for a given node?

<div class="upper-alpha" markdown>
1. How often the node sits on the shortest path between other pairs of nodes
2. How short the node's average shortest path is to every other node
3. How many edges connect directly to the node, optionally normalized by the maximum possible degree
4. Whether the node connects to other highly-connected nodes
</div>

??? question "Show Answer"
    The correct answer is **C**. Degree centrality is the simplest centrality measure, counting how many edges connect directly to a node and often normalizing by the maximum possible degree in the graph. Option A describes betweenness centrality instead. Option B describes closeness centrality. Option D describes eigenvector centrality, a different measure entirely.

    **Concept Tested:** Degree Centrality

---

#### 3. In a referral network, Dr. Osei has only two connections but is the sole bridge linking two otherwise-separate provider clusters, while Dr. Patel has four connections but removing him would not disconnect the network. Which centrality measure would rank Dr. Osei above Dr. Patel?

<div class="upper-alpha" markdown>
1. Degree centrality
2. Clustering coefficient
3. Connected components count
4. Betweenness centrality
</div>

??? question "Show Answer"
    The correct answer is **D**. Betweenness centrality measures how often a node sits on the shortest path between other pairs of nodes, and it can rank a low-degree bridge provider like Dr. Osei above a high-degree hub because removing the bridge would disconnect large parts of the network. Option A would instead favor Dr. Patel due to his higher degree. Option B measures neighbor interconnection, not bridging role. Option C is a structural count, not a per-node ranking measure.

    **Concept Tested:** Betweenness Centrality

---

#### 4. What defines a strongly connected component in a directed graph?

<div class="upper-alpha" markdown>
1. A maximal group of nodes where every node can reach every other node by following directed edges in the required direction
2. Any group of nodes connected by at least one undirected edge
3. A group of nodes that all share the same centrality score
4. A single node with the highest degree centrality in the graph
</div>

??? question "Show Answer"
    The correct answer is **A**. A strongly connected component requires two-way reachability along directed edges: every node in the group must be able to reach every other node by following edges in their required direction. Option B describes connected components in an undirected sense, which ignores direction. Option C confuses component membership with centrality scoring. Option D describes a single node property, not a group structure.

    **Concept Tested:** Strongly Connected Component

---

#### 5. Why is cosine similarity generally preferred over Euclidean distance when comparing two patients' symptom-severity vectors?

<div class="upper-alpha" markdown>
1. Cosine similarity can only be computed on vectors with exactly two dimensions
2. Euclidean distance always produces a value between 0 and 1, while cosine similarity does not
3. Cosine similarity measures the direction of the vectors, correctly recognizing that two profiles with the same pattern but different severity levels are still similar
4. Cosine similarity ignores the graph's edges entirely
</div>

??? question "Show Answer"
    The correct answer is **C**. Cosine similarity measures the angle, or direction, between two vectors rather than their raw magnitude, so a patient with twice the severity but the same symptom pattern still scores a similarity near 1.0. Option A fabricates a dimensionality restriction that does not exist. Option B reverses which metric is bounded between 0 and 1 by construction. Option D is irrelevant since neither metric depends on unrelated edges.

    **Concept Tested:** Cosine Similarity

---

#### 6. What must be true for two nodes to receive a Jaccard similarity score of exactly 0?

<div class="upper-alpha" markdown>
1. Both nodes must have identical property values
2. The two nodes must share no neighbors at all, making the intersection of their neighbor sets empty
3. Both nodes must be part of the same strongly connected component
4. The two nodes must be connected by a direct edge to each other
</div>

??? question "Show Answer"
    The correct answer is **B**. Jaccard similarity divides the size of the intersection of two nodes' neighbor sets by the size of their union; if the intersection is empty because the nodes share no neighbors, the score is 0. Option A confuses property matching with neighbor-set overlap, which Jaccard does not consider. Option C and D describe unrelated structural conditions that do not determine a Jaccard score of 0.

    **Concept Tested:** Jaccard Similarity

---

#### 7. Dr. Patel refers to {Dr. Osei, Dr. Nguyen, Dr. Reyes} and Dr. Kim refers to {Dr. Osei, Dr. Reyes, Dr. Lin}. What is the Jaccard similarity between Dr. Patel and Dr. Kim?

<div class="upper-alpha" markdown>
1. 0.75
2. 1.0
3. 0.25
4. 0.5
</div>

??? question "Show Answer"
    The correct answer is **D**. The shared referral targets are {Dr. Osei, Dr. Reyes}, a set of size 2, while the union of both referral sets is {Dr. Osei, Dr. Nguyen, Dr. Reyes, Dr. Lin}, a set of size 4, giving a Jaccard similarity of 2/4 = 0.5. Option A, B, and C each apply an incorrect intersection or union count to the formula.

    **Concept Tested:** Jaccard Similarity

---

#### 8. In a weighted referral network, Patel→Osei→Reyes costs 3+2=5 days and Patel→Nguyen→Reyes costs 6+1=7 days. Applying a shortest path algorithm to find the fastest route from Patel to Reyes, which route and cost should the algorithm return?

<div class="upper-alpha" markdown>
1. Patel→Osei→Reyes, 5 days, because it has the lower total cost of the two routes compared
2. Patel→Nguyen→Reyes, 7 days, because it visits more intermediate nodes
3. Patel→Osei→Reyes, 7 days, because betweenness centrality favors Osei
4. Neither route, because a shortest path algorithm cannot handle weighted edges
</div>

??? question "Show Answer"
    The correct answer is **A**. A shortest path algorithm compares the total cost of each candidate route and returns the minimum; here Patel→Osei→Reyes costs 5 days, which is lower than the 7-day alternative through Nguyen. Option B incorrectly favors the higher-cost route. Option C mixes up the correct route with an incorrect cost and an unrelated centrality justification. Option D is false since shortest path algorithms are specifically designed to handle weighted edges.

    **Concept Tested:** Shortest Path Algorithm

---

#### 9. A patient has three providers on their care team, and only one pair of those three providers consults directly with each other. What is this patient's clustering coefficient?

<div class="upper-alpha" markdown>
1. 1.0
2. 3/3
3. 1/3
4. 0.0
</div>

??? question "Show Answer"
    The correct answer is **C**. With 3 neighbors, the maximum possible number of connections among them is 3 (choose 2 from 3), and since only 1 of those 3 possible provider-to-provider connections actually exists, the clustering coefficient is 1/3. Option A and B incorrectly assume full interconnection among all three providers. Option D incorrectly assumes no providers consult with each other at all.

    **Concept Tested:** Clustering Coefficient

---

#### 10. Why does the chapter warn that a referral cycle among providers is not, by itself, proof of fraud?

<div class="upper-alpha" markdown>
1. Because cycle detection algorithms cannot run on directed graphs
2. Because specialists can legitimately co-manage complex patients back and forth, so a meaningful fraud signal requires graph pattern recognition to confirm the cycle overlaps another relationship type, such as a financial one
3. Because a referral cycle always has a clustering coefficient of 0
4. Because Jaccard similarity would immediately flag the cycle as similarity fraud
</div>

??? question "Show Answer"
    The correct answer is **B**. A referral cycle can be entirely legitimate coordination between specialists, so distinguishing a benign loop from fraud requires graph pattern recognition to check whether the cycle overlaps a separate, meaningful relationship such as a financial one. Option A is factually false; cycle detection is specifically designed for directed graphs. Option C and D fabricate unrelated metric claims that have no bearing on cycle interpretation.

    **Concept Tested:** Graph Pattern Recognition

---
