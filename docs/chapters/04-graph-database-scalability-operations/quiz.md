# Quiz: Graph Database Scalability and Operations

Test your understanding of graph database scalability and operations with these review questions.

---

#### 1. What is scalability in the context of a graph database?

<div class="upper-alpha" markdown>
1. A property that only applies to relational databases, never to graph databases
2. The maximum number of node labels a schema is allowed to define
3. The speed at which a single Cypher query can be written by a developer
4. A system's ability to handle a growing amount of work, such as more data or more concurrent queries, without a proportional loss of performance
</div>

??? question "Show Answer"
    The correct answer is **D**. Scalability describes a system's ability to absorb growing data volume or query load without a proportional drop in performance, achieved through either vertical or horizontal scaling. Option A incorrectly limits scalability to relational systems. Option B confuses scalability with schema design limits. Option C misapplies the term to developer productivity rather than system capacity.

    **Concept Tested:** Scalability

---

#### 2. What is the key difference between vertical scaling and horizontal scaling?

<div class="upper-alpha" markdown>
1. Vertical scaling adds more resources to a single machine, while horizontal scaling adds more machines and spreads the workload across them
2. Vertical scaling requires sharding, while horizontal scaling never does
3. Vertical scaling only applies to backup and recovery, while horizontal scaling only applies to caching
4. Vertical scaling is always cheaper than horizontal scaling regardless of workload
</div>

??? question "Show Answer"
    The correct answer is **A**. Vertical scaling adds more CPU, memory, or disk to one machine already running the database, while horizontal scaling adds more machines and distributes the workload across them. Option B reverses the actual relationship since sharding is a horizontal scaling technique. Option C misattributes both strategies to unrelated operational concerns. Option D makes an unsupported blanket cost claim.

    **Concept Tested:** Scalability

---

#### 3. What does graph sharding accomplish?

<div class="upper-alpha" markdown>
1. It encrypts all node properties before they are written to disk
2. It merges multiple separate graphs into a single unsharded database
3. It partitions the nodes and edges of a single logical graph across multiple physical machines so no one machine must hold the entire dataset
4. It replaces the need for a graph driver when connecting applications
</div>

??? question "Show Answer"
    The correct answer is **C**. Graph sharding partitions a graph's nodes and edges across multiple machines, commonly using a strategy such as hashing a patient ID, so that no single machine has to store the entire dataset in memory. Option A describes encryption, an unrelated security function. Option B describes the opposite of partitioning. Option D confuses sharding with an unrelated application-connectivity concern.

    **Concept Tested:** Graph Sharding

---

#### 4. Why does traversing an edge that connects a patient on Shard 1 to a specialist on Shard 3 cost more than traversing an edge within a single shard?

<div class="upper-alpha" markdown>
1. Cross-shard edges are automatically deleted by the database engine
2. Cross-shard traversal requires a network round trip between machines rather than an in-memory pointer dereference
3. Cross-shard edges cannot carry properties
4. Cross-shard edges must always be undirected
</div>

??? question "Show Answer"
    The correct answer is **B**. Because the two nodes live on different physical machines, following that edge requires a network round trip rather than the free, in-memory pointer dereference that same-shard index-free adjacency provides, making it orders of magnitude slower. Option A fabricates automatic deletion behavior. Option C and D describe unrelated restrictions on properties and edge direction that sharding does not impose.

    **Concept Tested:** Graph Sharding

---

#### 5. How do high availability and backup and recovery differ in what they protect against?

<div class="upper-alpha" markdown>
1. High availability protects only against ransomware, while backup and recovery protects only against hardware failure
2. High availability and backup and recovery are two names for the exact same mechanism
3. High availability requires no replicas, while backup and recovery requires no snapshots
4. High availability protects against single-machine hardware failure using live replicas, while backup and recovery protects against data corruption or accidental deletion using periodic snapshots
</div>

??? question "Show Answer"
    The correct answer is **D**. High availability keeps a system running through hardware failure by maintaining synchronized live replicas, while backup and recovery protects against corruption or accidental deletion using periodic snapshots to separate storage, since a bad delete can replicate to every live copy. Option A misassigns each mechanism to an unrelated threat. Option B incorrectly conflates two distinct mechanisms. Option C contradicts the actual mechanisms each approach relies on.

    **Concept Tested:** High Availability

---

#### 6. Why must a caching strategy include a plan for invalidating cached results, not just storing them?

<div class="upper-alpha" markdown>
1. Invalidation is required only when the cache runs out of memory
2. A stale cached answer can be worse than no cache at all, so cached values must expire or be invalidated once the underlying data changes
3. Caching strategies are not compatible with clinical decision support queries
4. Invalidation converts a warm cache into a graph sharding scheme
</div>

??? question "Show Answer"
    The correct answer is **B**. If underlying data changes, such as a newly added drug interaction, an outdated cached result could mislead a clinician, so a caching strategy must expire or invalidate stale values through a time-to-live or explicit invalidation trigger. Option A misattributes invalidation to memory pressure rather than data correctness. Option C contradicts the chapter's own clinical decision support example. Option D confuses two unrelated concepts.

    **Concept Tested:** Caching Strategy

---

#### 7. A hospital's graph database backs up every 6 hours and has agreed it must fully restore service within 15 minutes of a failure. Which terms correctly describe these two numbers?

<div class="upper-alpha" markdown>
1. Both numbers describe caching time-to-live settings
2. The 6 hours is the Recovery Point Objective (RPO) and the 15 minutes is the Recovery Time Objective (RTO)
3. The 6 hours is the Recovery Time Objective (RTO) and the 15 minutes is the Recovery Point Objective (RPO)
4. Both numbers describe the query execution plan's estimated cost
</div>

??? question "Show Answer"
    The correct answer is **C**. RPO measures the maximum acceptable data loss window, here 6 hours between backups, while RTO measures the maximum acceptable time to restore service after a failure, here 15 minutes. Option B swaps the two definitions. Options A and D misapply unrelated concepts, caching and query planning, to backup metrics.

    **Concept Tested:** Backup And Recovery

---

#### 8. In the Python code `driver = GraphDatabase.driver("bolt://cluster-host:7687", auth=(...))`, what role does the Bolt protocol play?

<div class="upper-alpha" markdown>
1. It is a Python-only library that cannot connect to a distributed cluster
2. It converts Cypher queries into SQL before sending them to the server
3. It is a lightweight, purpose-built protocol optimized for sending Cypher queries and receiving graph-shaped results efficiently
4. It is the algorithm used to shard the graph across machines
</div>

??? question "Show Answer"
    The correct answer is **C**. Bolt is Neo4j's lightweight binary protocol optimized for exchanging Cypher queries and graph-shaped results efficiently, in contrast to a general-purpose protocol like HTTP that would serialize everything as generic JSON. Option A incorrectly limits Bolt to Python, when drivers exist for many languages. Option B misdescribes Bolt as a query-translation layer. Option D confuses Bolt with an unrelated sharding mechanism.

    **Concept Tested:** Bolt Protocol

---

#### 9. An operator uses a graph explorer tool's search box to jump directly to a specific patient node, then applies a category filter to show only that patient's connected providers. What capability is this operator demonstrating?

<div class="upper-alpha" markdown>
1. Configuring a uniqueness constraint on the patient_id property
2. Using a graph explorer tool's search and filter features to locate a node and inspect its surrounding neighborhood
3. Running a query execution plan profiler to find missing indexes
4. Performing a restore drill to validate a backup
</div>

??? question "Show Answer"
    The correct answer is **B**. Type-ahead search to jump to a node and checkbox filters to show or hide categories are exactly the search-filter-inspect workflow a graph explorer tool provides for visually tracing a node's neighborhood. Option A describes an unrelated schema constraint operation. Option C describes query profiling, a different diagnostic activity. Option D describes testing backup restoration, unrelated to visual exploration.

    **Concept Tested:** Graph Explorer Tool

---

#### 10. A query in a sharded cluster is well-indexed but still runs slower than expected. What does examining its query execution plan help reveal?

<div class="upper-alpha" markdown>
1. Whether the query needed to fan out across multiple shards instead of staying within one, which explains the extra cost beyond indexing alone
2. Whether the database is using vertical scaling instead of horizontal scaling
3. Whether the Bolt protocol version needs to be upgraded
4. Whether the graph driver's programming language should be changed
</div>

??? question "Show Answer"
    The correct answer is **A**. A distributed query's execution plan shows not just which index was used, but whether the query had to fan out across multiple shards rather than staying within one, which directly explains why an otherwise well-indexed query can still run slower than expected. Option B, C, and D each name unrelated infrastructure choices that an execution plan does not diagnose.

    **Concept Tested:** Query Execution Plan

---
