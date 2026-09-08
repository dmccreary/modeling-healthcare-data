# References: Graph Database Scalability and Operations

1. [Scalability](https://en.wikipedia.org/wiki/Scalability) - Wikipedia - Defines horizontal versus vertical scaling strategies, the same two approaches this chapter compares using a hospital network's query-throughput example.

2. [Shard (Database Architecture)](https://en.wikipedia.org/wiki/Shard_(database_architecture)) - Wikipedia - Explains horizontal partitioning of data across servers, the mechanism behind this chapter's hash-based patient-sharding example and its discussion of costly cross-shard edges.

3. [High Availability](https://en.wikipedia.org/wiki/High_availability) - Wikipedia - Covers redundancy, failover, and uptime measurement, the design goal this chapter distinguishes from backup and recovery using RPO and RTO metrics.

4. Designing Data-Intensive Applications - Martin Kleppmann - O'Reilly Media - Widely credited for its clear, vendor-neutral explanation of partitioning (sharding) and replication trade-offs, the exact distinction this chapter draws between minimizing cross-shard edges and maintaining synchronized replicas.

5. Site Reliability Engineering: How Google Runs Production Systems - Betsy Beyer, Chris Jones, Jennifer Petoff, and Niall Murphy (eds.) - O'Reilly Media - Credited for formalizing Recovery Time Objective and Recovery Point Objective as operational metrics, the same RTO/RPO framework this chapter uses to size a cluster's backup and replication plan.

6. [Clustering](https://neo4j.com/docs/operations-manual/current/clustering/) - Neo4j Operations Manual - Documents how a Neo4j graph database cluster configures replication, routing, and disaster recovery, the production tooling behind this chapter's discussion of high availability.

7. [Bolt Protocol](https://neo4j.com/docs/bolt/current/) - Neo4j Documentation - Describes the binary protocol Neo4j drivers use to send Cypher queries and receive graph-shaped results, the exact layer this chapter's Python driver example relies on.

8. [About Neo4j Bloom](https://neo4j.com/docs/bloom-user-guide/current/about-bloom/) - Neo4j Documentation - Documents a production graph explorer tool's search, perspective, and inspection features, the real-world counterpart to this chapter's graph-visualization discussion.

9. [Database Sharding: A System Design Concept](https://www.geeksforgeeks.org/system-design/database-sharding-a-system-design-concept/) - GeeksforGeeks - Surveys key-based, range-based, and directory-based sharding strategies, broadening this chapter's single hash-based patient-sharding example with alternative partitioning schemes.

10. [Neo4j Python Driver Manual](https://neo4j.com/docs/python-manual/current/) - Neo4j Documentation - The official guide to the driver library this chapter's `GraphDatabase.driver(...)` and `session.run(...)` code example is drawn from, showing the graph API in practical use.
