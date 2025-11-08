# Chapter 9 Quiz: Graph Algorithms and Analytics

Test your understanding of graph algorithms and their healthcare analytics applications.

<div class="upper-alpha" markdown>

1. Which graph algorithm would be MOST appropriate for finding the shortest referral pathway between a primary care provider and a specialist?

    1. Community detection
    2. Shortest path (Dijkstra's algorithm)
    3. PageRank
    4. Triangle counting

    ??? question "Show Answer"
        **Answer: B** - Shortest path (Dijkstra's algorithm)

        Shortest path algorithms like Dijkstra's or A* are specifically designed to find the optimal path between two nodes in a graph, making them ideal for referral pathway analysis. In a provider network, the algorithm can find the chain of referrals connecting a primary care physician to a specialist, minimizing the number of intermediary referrals (shortest path by hops) or minimizing wait time when edge weights represent referral processing times. This analysis helps identify efficient referral routes, reveals bottlenecks where many paths converge on specific providers, and suggests opportunities to create direct referral relationships that bypass unnecessary intermediaries.

        **See:** [Path-Finding Algorithms](index.md)

2. What does PageRank centrality measure when applied to a provider referral network?

    1. The age of providers
    2. The influence and importance of providers based on referral patterns
    3. The geographic location of providers
    4. The cost of provider services

    ??? question "Show Answer"
        **Answer: B** - The influence and importance of providers based on referral patterns

        PageRank measures provider importance by considering both the quantity and quality of incoming referrals. A provider has high PageRank not just from receiving many referrals, but from receiving referrals from other highly-ranked providers. In healthcare networks, high PageRank identifies influential specialists who are trusted by many well-connected providers, key opinion leaders in the medical community, and critical nodes whose removal would fragment the network. This is valuable for network optimization (ensuring high-PageRank providers have adequate capacity), medical education (identifying expert providers for teaching roles), and quality improvement (understanding which providers influence care patterns across the network).

        **See:** [Centrality Metrics](index.md)

3. How would community detection algorithms help analyze patient populations?

    1. By identifying patient subgroups with similar conditions, treatment patterns, or demographics
    2. By calculating total patient count
    3. By listing patient names
    4. By scheduling appointments

    ??? question "Show Answer"
        **Answer: A** - By identifying patient subgroups with similar conditions, treatment patterns, or demographics

        Community detection algorithms partition patient populations into cohesive subgroups based on shared characteristics, revealing natural patient segments for targeted interventions. In a patient similarity graph where edges connect patients with similar diagnoses, medications, or comorbidity patterns, community detection identifies clinically meaningful clusters: patients with complex diabetes and cardiovascular disease, cancer patients with specific treatment protocols, or patients with rare disease combinations. These communities can guide care management program design, clinical trial recruitment, population health initiatives, and resource allocation. The algorithm discovers these patterns from network structure rather than requiring predefined criteria.

        **See:** [Community Detection Applications](index.md)

4. Analyze this use case: Identifying patients at risk for hospital readmission. Which graph algorithm would provide the most insight?

    1. Triangle counting
    2. Similarity metrics combined with machine learning on patient graph neighborhoods
    3. Shortest path
    4. Degree centrality

    ??? question "Show Answer"
        **Answer: B** - Similarity metrics combined with machine learning on patient graph neighborhoods

        Readmission prediction benefits from combining graph similarity metrics with machine learning. Graph algorithms first identify patients similar to the index patient by comparing their graph neighborhoods (shared diagnoses, medications, procedures, providers, demographics). The algorithm then examines outcomes for these similar patients—if many similar patients were readmitted, the index patient is high risk. Graph neural networks can learn from the structure of patient neighborhoods: patients with fragmented care (many unconnected providers), complex medication regimens (many concurrent prescriptions), and multiple acute conditions form graph patterns associated with readmission. This approach outperforms traditional regression because it captures the relational context of patient risk.

        **See:** [Predictive Graph Analytics](index.md)

5. What is the primary benefit of using betweenness centrality to analyze healthcare provider networks?

    1. It identifies the cheapest providers
    2. It finds providers who bridge different parts of the network and facilitate care coordination
    3. It measures provider education level
    4. It calculates patient satisfaction scores

    ??? question "Show Answer"
        **Answer: B** - It finds providers who bridge different parts of the network and facilitate care coordination

        Betweenness centrality identifies providers who frequently appear on paths between other providers, indicating their role as bridges or coordinators in the care network. High betweenness providers connect different specialties, facilitate referrals between otherwise disconnected parts of the network, and are critical for care coordination. For example, a hospitalist might have high betweenness by coordinating care between inpatient specialists and outpatient primary care, or a case manager might bridge social services and clinical providers. Identifying high-betweenness providers helps target care coordination improvement efforts, ensure these critical roles have adequate support, and understand network vulnerabilities if these providers leave.

        **See:** [Betweenness Centrality](index.md)

6. How would you use graph algorithms to optimize operating room scheduling across a hospital network?

    1. Count total operating rooms
    2. Model OR assignments, surgeon availability, and procedure dependencies as a graph, then use constraint satisfaction or optimization algorithms
    3. List all surgical procedures
    4. Calculate average surgery duration

    ??? question "Show Answer"
        **Answer: B** - Model OR assignments, surgeon availability, and procedure dependencies as a graph, then use constraint satisfaction or optimization algorithms

        OR scheduling optimization benefits from graph modeling where nodes represent ORs, surgeons, anesthesiologists, equipment, and procedures, with relationships capturing availability, dependencies, and resource requirements. The scheduling problem becomes a constraint satisfaction problem on the graph: assign procedures to ORs and time slots while satisfying constraints like surgeon availability, equipment availability, procedure duration, sterilization time between cases, and preference for scheduling related procedures consecutively. Graph-based optimization algorithms can find near-optimal schedules that maximize OR utilization while respecting all constraints. The graph structure makes dependencies and conflicts explicit, enabling sophisticated scheduling that would be difficult with traditional approaches.

        **See:** [Graph-Based Optimization](index.md)

7. What insight does the clustering coefficient provide when analyzing patient-provider networks?

    1. Average patient age
    2. The degree to which a patient's providers also collaborate with each other, indicating care coordination
    3. Total healthcare costs
    4. Number of hospitals in the network

    ??? question "Show Answer"
        **Answer: B** - The degree to which a patient's providers also collaborate with each other, indicating care coordination

        The clustering coefficient measures the extent to which a patient's providers form a connected subgraph, which indicates care coordination quality. A high clustering coefficient means the patient's providers know and collaborate with each other (form triangles in the graph), suggesting coordinated care with shared treatment planning and communication. Low clustering coefficients indicate fragmented care where the patient's providers are disconnected, leading to duplicated testing, medication conflicts, and suboptimal outcomes. Graph analysis can identify patients with fragmented care (low clustering coefficients) who would benefit from care coordination interventions, and measure whether care coordination programs successfully increase provider connectivity.

        **See:** [Clustering and Care Coordination](index.md)

8. How would weakly connected components analysis help identify isolated patient populations?

    1. By counting total patients
    2. By finding groups of patients disconnected from the main healthcare network who may lack access to care
    3. By listing patient demographics
    4. By calculating insurance premiums

    ??? question "Show Answer"
        **Answer: B** - By finding groups of patients disconnected from the main healthcare network who may lack access to care

        Weakly connected components analysis partitions the patient-provider network into separate subgraphs, revealing isolated patient populations with limited healthcare access. The main component typically contains most patients connected to the primary healthcare delivery network, while small isolated components may represent underserved populations served by disconnected clinics, rural patients with limited provider access, or populations facing barriers to care coordination. Identifying these isolated components enables targeted outreach, network expansion initiatives, and interventions to connect isolated populations to comprehensive care networks. The size and characteristics of disconnected components quantify health equity gaps.

        **See:** [Component Analysis](index.md)

9. Evaluate this approach: Using graph embedding algorithms to represent patients as vectors, then applying traditional machine learning. What is the advantage?

    1. It eliminates the need for any analysis
    2. It converts complex graph structures into feature vectors that capture network context for ML models
    3. It reduces data storage requirements
    4. It makes graphs unnecessary

    ??? question "Show Answer"
        **Answer: B** - It converts complex graph structures into feature vectors that capture network context for ML models

        Graph embedding algorithms (Node2Vec, GraphSAGE, Graph Attention Networks) transform nodes into dense vector representations that encode their position and context within the graph structure. A patient's embedding captures not just their individual attributes, but also their relationships to providers, diagnoses, medications, and similar patients. These embeddings serve as feature inputs to traditional ML models (random forests, gradient boosting, neural networks) for tasks like readmission prediction, disease progression forecasting, or treatment response prediction. The advantage is combining graph structure learning (embeddings) with powerful supervised learning (ML models). Embeddings make graph topology accessible to algorithms that require vector inputs.

        **See:** [Graph Embeddings](index.md)

10. How can temporal graph analysis reveal changing patterns in disease spread or healthcare utilization?

    1. By storing more historical data
    2. By analyzing how graph structure and relationships evolve over time to detect trends, outbreaks, or shifts in care patterns
    3. By counting patients each year
    4. By listing all dates in the database

    ??? question "Show Answer"
        **Answer: B** - By analyzing how graph structure and relationships evolve over time to detect trends, outbreaks, or shifts in care patterns

        Temporal graph analysis tracks how the healthcare network structure changes over time windows, revealing dynamic patterns invisible in static snapshots. For infectious disease tracking, temporal graphs show how patient contact networks evolve as disease spreads, identifying outbreak epicenters where connectivity suddenly increases. For utilization analysis, temporal graphs reveal shifting referral patterns, emerging provider relationships, changes in care delivery models, or seasonal variations in patient-provider connections. Algorithms can detect anomalies where graph structure changes suddenly (outbreak detection), identify trends in network densification (care coordination improving), or forecast future network states. Temporal analysis transforms graphs from static structures to dynamic systems.

        **See:** [Temporal Graph Analytics](index.md)

</div>
