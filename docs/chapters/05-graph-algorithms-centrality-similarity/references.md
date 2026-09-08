# References: Graph Algorithms, Centrality, and Similarity Measures

1. [Centrality](https://en.wikipedia.org/wiki/Centrality) - Wikipedia - Surveys degree, betweenness, closeness, and eigenvector centrality with their formal definitions, directly matching the four-provider comparison this chapter uses to show that "most important" has no single definition.

2. [PageRank](https://en.wikipedia.org/wiki/PageRank) - Wikipedia - Explains the damping-factor recursive formula originally built to rank web pages, the same algorithm this chapter repurposes to rank providers by referral influence.

3. [Cosine Similarity](https://en.wikipedia.org/wiki/Cosine_similarity) - Wikipedia - Defines the angle-based vector similarity measure this chapter computes by hand on patient symptom-severity vectors and contrasts against Euclidean distance.

4. Mining of Massive Datasets (3rd Edition) - Jure Leskovec, Anand Rajaraman, and Jeffrey David Ullman - Cambridge University Press - Credited for its widely used random-surfer derivation of PageRank and its treatment of Jaccard similarity and link prediction, the exact formulas this chapter works out by hand on a provider referral network.

5. Networks, Crowds, and Markets: Reasoning About a Highly Connected World - David Easley and Jon Kleinberg - Cambridge University Press - A standard network-science text credited for its intuitive, case-study-driven explanations of centrality and structural bridges, echoing this chapter's bridge-versus-hub referral example.

6. [Centrality Algorithms](https://neo4j.com/docs/graph-data-science/current/algorithms/centrality/) - Neo4j Graph Data Science Documentation - Documents production implementations of degree, betweenness, closeness, PageRank, and eigenvector centrality, the same five measures this chapter defines and compares on a referral network.

7. [PageRank Algorithm](https://www.geeksforgeeks.org/dsa/page-rank-algorithm-implementation/) - GeeksforGeeks - Walks through PageRank's formula and a worked multi-page example with code, reinforcing the recursive damping-factor calculation this chapter applies to a provider network.

8. [Similarity Functions](https://neo4j.com/docs/graph-data-science/current/algorithms/similarity-functions/) - Neo4j Graph Data Science Documentation - Documents Jaccard, cosine, and other similarity functions with Cypher examples, the production-grade implementation of the two similarity measures this chapter derives by hand.

9. [Link Prediction Algorithms](https://neo4j.com/docs/graph-data-science/current/algorithms/linkprediction/) - Neo4j Graph Data Science Documentation - Documents Adamic-Adar, common neighbors, and other topological link-prediction functions, the production versions of the formula this chapter computes by hand to predict a future referral edge.

10. [Dijkstra's Shortest Path Algorithm](https://www.geeksforgeeks.org/dsa/dijkstras-shortest-path-algorithm-greedy-algo-7/) - GeeksforGeeks - Explains the priority-queue-based algorithm this chapter traces step by step over a weighted referral network to find the minimum-cost path between two providers.
