# References: Graph Embeddings, Clustering, and Graph Neural Networks

1. [Graph neural network](https://en.wikipedia.org/wiki/Graph_neural_network) - Wikipedia - Comprehensive overview of GNN architectures, message-passing layers, and graph convolutional networks, directly grounding this chapter's formalization of Chapter 5's manual neighbor-averaging into trainable, learned-weight embeddings.

2. [Node2vec](https://en.wikipedia.org/wiki/Node2vec) - Wikipedia - Explains the biased second-order random-walk sampling and skip-gram training behind Node2Vec, supporting the chapter's walk-based alternative to message passing for generating node embeddings.

3. [Louvain method](https://en.wikipedia.org/wiki/Louvain_method) - Wikipedia - Describes the iterative modularity-optimization procedure and its two-phase local-move-then-aggregate structure, matching the chapter's worked trace of Louvain clustering a small cardiac/diabetes patient network.

4. Graph Representation Learning - William L. Hamilton - Morgan & Claypool (Synthesis Lectures on AI and ML) - Hamilton is credited with the unifying encoder-decoder framework that places shallow random-walk embeddings (DeepWalk, Node2Vec) and message-passing GNNs side by side as two solutions to one problem, mirroring this chapter's "two philosophies, one goal" framing.

5. Network Science - Albert-László Barabási (with Márton Pósfai) - Cambridge University Press - Barabási is widely credited for the field's most accessible diagrams and worked derivations of assortativity, network motifs, and community/modularity structure, freely available online and adopted as the standard visual reference for the structural metrics this chapter introduces.

6. [Louvain](https://neo4j.com/docs/graph-data-science/current/algorithms/louvain/) - Neo4j Graph Data Science Documentation - Official reference for running the Louvain modularity-optimization algorithm on a property graph, including configuration parameters and worked examples, directly usable for the healthcare cohort-clustering scenarios this chapter describes.

7. [Node2Vec](https://neo4j.com/docs/graph-data-science/current/machine-learning/node-embeddings/node2vec/) - Neo4j Graph Data Science Documentation - Documents the random-walk parameters (return factor, in-out factor) and training process behind Node2Vec embeddings, extending the chapter's Maria Chen walk-trace example into a runnable graph-database algorithm.

8. [A Gentle Introduction to Graph Neural Networks](https://distill.pub/2021/gnn-intro/) - Distill.pub - Interactive, visually-driven explanation of how GNN message passing gathers, aggregates, and updates node embeddings, reinforcing the chapter's step-by-step derivation of the learned-weight GCN update rule.

9. [CS224W: Machine Learning with Graphs](https://web.stanford.edu/class/cs224w/) - Stanford University (Jure Leskovec) - Course site covering node embeddings, random walks, and graph neural network architectures at the depth this chapter introduces, useful for students wanting a deeper follow-up treatment of node classification and GCNs.

10. [Number of Triangles in an Undirected Graph](https://www.geeksforgeeks.org/dsa/number-of-triangles-in-a-undirected-graph/) - GeeksforGeeks - Walks through adjacency-matrix and bitset algorithms for triangle counting with complexity analysis, supporting the chapter's triangle-count metric used as the raw input to clustering-coefficient and cohort-density calculations.
