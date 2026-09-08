# References: Foundations of Graph Structures

1. [Graph Theory](https://en.wikipedia.org/wiki/Graph_theory) - Wikipedia - Surveys the mathematical study of nodes and edges, including adjacency, paths, and the G=(V,E) notation this chapter uses to formalize Maria Chen's four-node healthcare example.

2. [Graph Database](https://en.wikipedia.org/wiki/Graph_database) - Wikipedia - Explains how graph databases store nodes, edges, and properties natively and enable index-free adjacency, the storage-level mechanism behind this chapter's claim that traversal outperforms relational joins.

3. [Directed Acyclic Graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph) - Wikipedia - Covers the topological-ordering and reachability properties of DAGs, the structural guarantee this chapter relies on to explain why BFS and DFS traversals of a referral network always terminate.

4. Algorithms (4th Edition) - Robert Sedgewick and Kevin Wayne - Addison-Wesley - Credited for the companion visualizations at algs4.cs.princeton.edu that popularized animated, step-by-step depictions of breadth-first and depth-first traversal, the same level-by-level versus branch-by-branch contrast this chapter traces by hand.

5. Introduction to Graph Theory (2nd Edition) - Douglas B. West - Prentice Hall - A standard university reference credited for its rigorous, notation-precise treatment of digraphs, acyclicity, and reachability that underlies this chapter's formal definition of a directed acyclic graph.

6. [Graph Database Concepts](https://neo4j.com/docs/getting-started/appendix/graphdb-concepts/) - Neo4j Documentation - Defines nodes, labels, relationships, and properties in the labeled property graph model, directly matching the Patient/Provider/Facility vocabulary this chapter introduces.

7. [Breadth First Search or BFS for a Graph](https://www.geeksforgeeks.org/dsa/breadth-first-search-or-bfs-for-a-graph/) - GeeksforGeeks - Walks through the level-by-level BFS traversal algorithm with code and complexity analysis, reinforcing the ripple-spreading strategy this chapter demonstrates on a five-provider referral network.

8. [Depth First Search or DFS for a Graph](https://www.geeksforgeeks.org/dsa/depth-first-search-or-dfs-for-a-graph/) - GeeksforGeeks - Details the recursive, branch-by-branch DFS traversal strategy, complementing this chapter's hallway analogy and hand-traced example over the same referral network.

9. [Lecture 9: Breadth-First Search](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-9-breadth-first-search/) - MIT OpenCourseWare - Free university lecture notes covering graph representations, adjacency, and BFS, giving a more formal algorithmic grounding for the traversal vocabulary this chapter introduces informally.

10. [What is a Graph Database?](https://aws.amazon.com/nosql/graph/) - Amazon Web Services - Explains how graph databases model entities as nodes and relationships as edges to avoid costly joins, reinforcing this chapter's central comparison between graph traversal and relational multi-table joins.
