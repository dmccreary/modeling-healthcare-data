# Graph Algorithms and Analytics

## Summary

This chapter teaches fundamental and advanced graph algorithms for healthcare analytics. You will learn shortest path algorithms, centrality measures (PageRank, betweenness, degree), clustering coefficients, connected components, cycle detection, graph pattern recognition, similarity measures, link prediction, graph embeddings, node embeddings, and graph neural networks. These algorithms provide powerful tools for discovering insights, predicting outcomes, and understanding complex relationships in healthcare data.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Graph Algorithm
2. Shortest Path Algorithm
3. Centrality Measure
4. Pagerank Algorithm
5. Betweenness Centrality
6. Degree Centrality
7. Clustering Coefficient
8. Connected Components
9. Cycle Detection
10. Graph Pattern Recognition
11. Similarity Measure
12. Link Prediction
13. Graph Embedding
14. Node Embedding
15. Graph Neural Network

## Prerequisites

This chapter builds on concepts from:

- [Chapter 01: Graph Theory and Database Foundations](../01-graph-theory-database-foundations/index.md)
- [Chapter 03: Graph Query Languages and Technologies](../03-graph-query-languages/index.md)

## Introduction

Graph algorithms represent the computational methods that traverse, analyze, and extract insights from graph-structured data, transforming raw connections into actionable intelligence. In healthcare, where relationships between patients, providers, medications, diagnoses, and procedures create intricate networks of causality and correlation, graph algorithms enable discovery of patterns invisible to traditional analytics approaches. Unlike statistical methods that treat observations as independent data points, graph algorithms explicitly model and leverage the relationships between entities, recognizing that understanding the connections is often more valuable than understanding isolated attributes.

The power of graph algorithms in healthcare analytics stems from their ability to answer questions that are difficult or impossible with relational databases or traditional business intelligence tools. How does information flow through a referral network? Which providers are most influential in determining care patterns? What is the most efficient care pathway for a specific condition? Which patients are most similar based on their complete treatment history? These questions require algorithms that can traverse relationships, measure centrality, detect communities, identify patterns, and predict future connections. This chapter explores both classical graph algorithms (shortest path, centrality measures, clustering) and modern graph data science techniques (graph embeddings, graph neural networks) with specific applications to healthcare data and decision-making.

## Understanding Graph Algorithms

Before examining specific algorithms, we must understand what makes graph algorithms fundamentally different from traditional data processing approaches and why they are particularly well-suited to healthcare analytics. **Graph algorithms** are computational procedures that operate on graph-structured data, typically involving traversal of nodes and edges to compute metrics, identify patterns, or make predictions. Unlike algorithms that process tables row-by-row or arrays element-by-element, graph algorithms navigate relationships as first-class entities, with performance characteristics that depend on network topology rather than simple data volume.

Graph algorithms can be categorized into several major families based on their computational approach and application purpose:

**Pathfinding algorithms** find routes through networks by traversing edges between nodes, answering questions about connectivity, distance, and optimal routes. Applications include care pathway optimization, supply chain analysis, and patient journey mapping.

**Centrality algorithms** measure the importance or influence of nodes within a network based on their position, connections, or role in information flow. Healthcare applications include identifying key opinion leaders, critical care coordinators, and influential providers.

**Community detection algorithms** partition networks into groups of densely connected nodes that are sparsely connected to other groups, revealing natural clustering based on relationship patterns. Use cases include patient segmentation, provider network analysis, and treatment protocol identification.

**Similarity algorithms** measure how alike two nodes are based on their attributes, connections, or neighborhood structure, enabling recommendation systems, duplicate detection, and cohort identification.

**Link prediction algorithms** estimate the probability of future relationships forming between nodes based on current network structure and node attributes, supporting referral prediction, readmission risk assessment, and care coordination optimization.

The following table compares key characteristics of major graph algorithm families:

| Algorithm Family | Computational Complexity | Typical Healthcare Use Cases | Key Metrics Produced | Example Algorithms |
|------------------|-------------------------|------------------------------|---------------------|-------------------|
| Pathfinding | O(V + E) to O(V²) | Care pathways, referral routes, supply chains | Distance, path cost, route | Dijkstra, A*, Breadth-first search |
| Centrality | O(V×E) to O(V³) | Provider influence, care coordinators, key facilities | Centrality scores, rankings | PageRank, Betweenness, Degree |
| Community Detection | O(V×E) to O(V²×log V) | Patient cohorts, provider networks, service clusters | Community membership, modularity | Louvain, Label Propagation, Connected Components |
| Similarity | O(V²) to O(V³) | Patient matching, duplicate detection, recommendations | Similarity scores, rankings | Jaccard, Cosine, Node2Vec |
| Link Prediction | O(V×E) to O(V²) | Referral prediction, readmission risk, care gaps | Probability scores, predictions | Adamic-Adar, Common Neighbors, GraphSAGE |
| Pattern Matching | O(V×E) to exponential | Fraud detection, clinical pathways, quality patterns | Pattern instances, counts | Subgraph isomorphism, Motif finding |

## Shortest Path Algorithms and Care Pathways

**Shortest path algorithms** find the minimum-cost route between two nodes in a graph, where cost might represent physical distance, time, expense, or any other metric assigned to edges. In healthcare, shortest path algorithms enable optimization of patient journeys through complex care processes, identification of efficient referral routes, and discovery of treatment pathways that minimize time to diagnosis or therapeutic intervention.

The most widely used shortest path algorithm is **Dijkstra's algorithm**, which finds the shortest path from a single source node to all other nodes in a graph with non-negative edge weights. The algorithm maintains a set of nodes with known shortest distances and iteratively expands this set by selecting the unvisited node with minimum distance, updating the distances to its neighbors. Dijkstra's algorithm has time complexity O((V+E) log V) with a priority queue implementation, making it practical for large healthcare networks.

Healthcare applications of shortest path algorithms include:

**Care pathway optimization:** Finding the fastest route from symptom presentation to definitive diagnosis by traversing a graph of diagnostic tests, specialist consultations, and imaging studies, with edge weights representing time to next step or probability of diagnostic yield.

**Referral network navigation:** Identifying the most efficient referral path from primary care to specialized treatment by analyzing provider networks, with edge weights representing wait times, geographic distance, or referral acceptance rates.

**Supply chain logistics:** Optimizing medical supply delivery routes in hospital networks or pharmaceutical distribution networks, with edge weights representing transportation cost, time, or reliability.

**Emergency response:** Calculating optimal ambulance routing and hospital selection based on real-time capacity, specialty availability, and transport time, with edge weights dynamically updated based on current conditions.

**Clinical trial matching:** Finding the shortest path from patient diagnosis to appropriate clinical trial enrollment by traversing eligibility criteria, trial availability, and referral processes.

The following Cypher query demonstrates finding the shortest path between a patient's current provider and a specialist with the required expertise:

```cypher
// Find shortest referral path from patient's PCP to neurosurgeon
// with minimum wait time

MATCH (patient:Patient {id: 'P12345'})-[:HAS_PCP]->(pcp:Provider)
MATCH (specialist:Provider {specialty: 'Neurosurgery'})

MATCH path = shortestPath(
  (pcp)-[:CAN_REFER_TO*1..5]->(specialist)
)

WITH path,
     reduce(totalWait = 0, rel IN relationships(path) |
       totalWait + rel.avg_wait_days
     ) as total_wait_time

RETURN
  [node IN nodes(path) | node.name] as referral_chain,
  length(path) as referral_steps,
  total_wait_time as estimated_wait_days,
  path

ORDER BY total_wait_time ASC
LIMIT 1
```

Beyond single-source shortest path, **all-pairs shortest path** algorithms compute the shortest paths between every pair of nodes in the graph, enabling comprehensive network analysis. The Floyd-Warshall algorithm solves all-pairs shortest path in O(V³) time, which is practical for moderate-sized networks (thousands of nodes) but becomes prohibitive for very large graphs. Healthcare applications include analyzing the overall efficiency of referral networks, identifying bottlenecks in care delivery, and computing comprehensive distance matrices for patient-provider matching.

<details markdown="1">
    <summary>Care Pathway Shortest Path Interactive MicroSim</summary>
    Type: microsim

    Learning objective: Help students understand how shortest path algorithms work by visualizing Dijkstra's algorithm finding optimal care pathways through a diagnostic network, showing step-by-step execution and allowing experimentation with different scenarios.

    Canvas layout (1200x800px):
    - Left side (750x800): Graph visualization showing care pathway network
    - Right side (450x800): Algorithm controls and explanation panel

    Visual elements in main area:

    Graph Network (Healthcare Diagnostic Pathway):
    - Nodes (circular, 50px diameter):
      * Start: "Patient with Headache" (green)
      * Primary Care Visit (light blue)
      * Neurology Consult (blue)
      * MRI Scan (purple)
      * CT Scan (purple)
      * Blood Work (yellow)
      * Specialist Opinion 1 (orange)
      * Specialist Opinion 2 (orange)
      * Diagnosis (red)
      * Treatment Plan (green)
    - Edges (arrows with weights):
      * Edge labels show: days to next step
      * Width indicates probability of taking this path
      * Color indicates cost (green=low, yellow=moderate, red=high)

    Example network structure:
    - Patient → PCP Visit (1 day, $150)
    - PCP Visit → Neurology (7 days, $250) OR Blood Work (2 days, $100) OR CT Scan (3 days, $1200)
    - Neurology → MRI (14 days, $2400) OR Specialist Opinion 1 (5 days, $350)
    - MRI → Diagnosis (3 days, $0)
    - CT Scan → Specialist Opinion 2 (4 days, $350)
    - Blood Work → Neurology (1 day, $0)
    - Specialist Opinion 1 → Diagnosis (2 days, $0)
    - Specialist Opinion 2 → MRI (7 days, $2400)
    - Multiple paths to final "Treatment Plan" node

    Dijkstra's Algorithm Visualization:

    Step-by-step execution shown with animation:
    1. Initialize: All nodes marked with infinite distance except start (distance = 0)
    2. Current node highlighted in bright yellow with pulsing border
    3. Visited nodes marked in green with checkmark
    4. Unvisited nodes in gray
    5. Edge currently being examined highlighted in bright blue
    6. Distance labels update in real-time as algorithm evaluates paths
    7. "Relaxation" step shown: when shorter path found, old distance crossed out, new distance displayed

    Interactive controls (right panel):

    Scenario Selector (dropdown):
    - Minimize Time to Diagnosis
    - Minimize Total Cost
    - Minimize Number of Steps
    - Balanced (Time + Cost)
    - Custom Weights

    Start/End Node Selectors:
    - Start: Default "Patient with Headache" (can select any node)
    - End: Default "Treatment Plan" (can select any node)

    Weight Optimization (sliders when "Custom Weights" selected):
    - Time weight: 0-100% (default 50%)
    - Cost weight: 0-100% (default 30%)
    - Quality weight: 0-100% (default 20%)
    - Weights must sum to 100%

    Execution Controls:
    - Button: "Run Algorithm" - execute Dijkstra's from start
    - Button: "Step Forward" - advance one algorithm step
    - Button: "Step Backward" - go back one step (for learning)
    - Button: "Reset" - clear all progress
    - Checkbox: "Auto-play" - run automatically with delay
    - Slider: "Animation Speed" (0.5x to 3x, default 1x)

    Algorithm State Display:

    Current Step Explanation (text box):
    - Shows what the algorithm is doing at current step
    - Example: "Step 5: Examining edge from 'PCP Visit' to 'Blood Work'. Current distance to Blood Work: 3 days. Distance via PCP: 1 + 2 = 3 days. No improvement, keep current distance."

    Distance Table (real-time updates):
    | Node | Current Distance | Previous Node | Status |
    |------|------------------|---------------|--------|
    | Patient with Headache | 0 days | - | Visited ✓ |
    | PCP Visit | 1 day | Patient | Visited ✓ |
    | Blood Work | 3 days | PCP Visit | Current |
    | Neurology | 8 days | PCP Visit | Unvisited |
    | ... | ... | ... | ... |

    Priority Queue Display (visual representation):
    - Shows nodes in order of current minimum distance
    - Updates as algorithm progresses
    - Highlights node about to be processed

    Path Visualization:

    Once algorithm completes:
    - Shortest path highlighted in thick green line with animation flowing from start to end
    - All nodes on path highlighted with green glow
    - Alternative paths shown in faded gray for comparison
    - Path summary box displays:
      * Total time: X days
      * Total cost: $X,XXX
      * Number of steps: X
      * Nodes in path: [list with arrows]
      * Comparison to alternative paths: "This path is 7 days faster and $1,200 cheaper than next best option"

    Educational Features:

    "Algorithm Explanation" expandable panel:
    - Pseudocode for Dijkstra's algorithm
    - Complexity analysis: O((V+E) log V)
    - Why it works: Greedy approach always selects minimum distance
    - Limitations: Doesn't work with negative weights
    - When to use: Single-source shortest path with non-negative weights

    "Healthcare Applications" info box:
    - Care pathway optimization
    - Referral network navigation
    - Emergency routing
    - Clinical trial matching
    - Diagnostic protocol selection

    Alternative Scenarios (pre-loaded):

    Scenario 1: "Fast Track to Diagnosis"
    - Optimizes for minimum time
    - Path: Patient → PCP → Blood Work → Neurology → Specialist 1 → Diagnosis (13 days, $850)

    Scenario 2: "Cost-Conscious Pathway"
    - Optimizes for minimum cost
    - Path: Patient → PCP → Blood Work → Neurology → Specialist 1 → Diagnosis ($850, 13 days)
    - Note: In this case, happens to be same as fast track

    Scenario 3: "Academic Medical Center Route"
    - Optimizes for highest quality specialists
    - Path: Patient → PCP → Neurology → MRI → Diagnosis (25 days, $3,000)
    - Trade-off: Longer wait, higher cost, but top specialists

    Scenario 4: "Emergency Pathway"
    - Patient has severe symptoms
    - Path bypasses normal wait times: Patient → CT Scan → Specialist 2 → MRI → Diagnosis (7 days, $4,100)
    - Fastest but most expensive

    Comparison Feature:
    - Button: "Compare All Scenarios"
    - Shows side-by-side table of all 4 scenarios with metrics
    - Radar chart showing time vs. cost vs. quality vs. # steps
    - Helps students understand optimization trade-offs

    Quiz Mode:
    - Button: "Test Your Understanding"
    - Algorithm runs, student must predict next node to visit
    - Shows current state, student clicks which node they think algorithm will process next
    - Immediate feedback: correct/incorrect with explanation
    - Score tracking

    Behavior:
    - When "Run Algorithm" clicked, animate full Dijkstra's execution
    - Each step shows:
      * Which node is current
      * Which edges are being examined
      * How distances are updated (relaxation)
      * Which node is added to visited set
    - Use smooth transitions and color changes
    - Highlight "aha moments" where shorter path is discovered
    - At completion, celebrate with animation showing optimal path

    Edge Cases to Demonstrate:
    - Path ties (multiple paths with same length) - show that algorithm picks one deterministically
    - Disconnected nodes (unreachable from start) - show infinite distance maintained
    - Single-step path vs. multi-hop path comparison

    Implementation notes:
    - Use p5.js for graph visualization
    - Implement Dijkstra's algorithm in JavaScript with state tracking for animation
    - Use priority queue (min-heap) for efficiency
    - Store complete execution trace for step-forward/backward
    - Color palette: Use healthcare-themed colors (calming blues/greens for positive, yellows/reds for warnings)
    - Provide "Export Path" button that generates textual care pathway recommendation
    - Add "Print Patient Journey" feature that creates formatted pathway for clinical use
</details>

## Centrality Measures: Identifying Important Nodes

**Centrality measures** quantify the importance, influence, or prominence of nodes within a network based on their structural position and connections. Different centrality algorithms capture different notions of importance: how connected a node is, how central it is to network flow, or how influential it is in the broader network structure. In healthcare networks, centrality measures identify key providers who coordinate care, influential facilities that serve as regional hubs, critical supply chain nodes, and patients who bridge different care communities.

**Degree centrality** is the simplest centrality measure, counting the number of edges connected to a node (or distinguishing between incoming and outgoing edges in directed graphs). In healthcare provider networks, high degree centrality indicates providers who see many patients, have many referral relationships, or are connected to many other providers. While simple, degree centrality can be misleading because it doesn't distinguish between connections to highly connected nodes versus isolated nodes.

**Betweenness centrality** measures how often a node appears on shortest paths between other pairs of nodes, identifying nodes that act as bridges or brokers in network flow. In healthcare, high betweenness centrality indicates providers who serve as critical connectors between different parts of the care network, patients who link disparate provider communities, or facilities that are essential waypoints in patient journeys. Betweenness centrality has O(V×E) computational complexity for unweighted graphs, making it expensive for very large networks but feasible for typical healthcare networks of thousands to tens of thousands of nodes.

**PageRank** is an algorithm originally developed by Google to rank web pages, measuring importance based on both the quantity and quality of incoming links. A node receives high PageRank if it is linked to by many nodes, or by nodes that themselves have high PageRank. In healthcare provider networks, PageRank identifies providers who are trusted by other influential providers, creating a recursive measure of reputation. Unlike degree centrality, PageRank accounts for the quality of connections, not just quantity.

The PageRank algorithm works by iteratively distributing rank scores across the network following this formula:

```
PR(A) = (1-d) + d × Σ(PR(T_i) / C(T_i))
```

Where:
- PR(A) = PageRank of node A
- d = damping factor (typically 0.85)
- T_i = nodes that link to A
- C(T_i) = number of outgoing links from T_i

Healthcare applications of centrality measures include:

- **Care coordinator identification:** Finding providers with high betweenness centrality who serve as critical coordinators connecting multiple specialties
- **Referral network optimization:** Using PageRank to identify the most trusted referral targets, helping payers design narrow networks around high-quality providers
- **Supply chain resilience:** Identifying critical nodes in medical supply networks whose disruption would have cascading effects
- **Patient navigation:** Finding patients with high betweenness who could serve as peer navigators bridging different communities
- **Outbreak tracing:** Using centrality to prioritize contact tracing and vaccination of highly connected individuals in disease transmission networks

The following list summarizes key centrality measures and their interpretations:

- **Degree Centrality:** Number of connections; indicates popularity or activity level
- **Betweenness Centrality:** Frequency on shortest paths; indicates brokerage or bridge role
- **Closeness Centrality:** Average distance to all other nodes; indicates accessibility or reach
- **Eigenvector Centrality:** Connections to well-connected nodes; indicates association with influential nodes
- **PageRank:** Quality-weighted incoming connections; indicates authority or trustworthiness
- **Harmonic Centrality:** Sum of inverse distances; variant of closeness that handles disconnected graphs
- **Katz Centrality:** Walks of all lengths weighted by attenuation factor; generalizes eigenvector centrality

<details markdown="1">
    <summary>Provider Network Centrality Analysis Dashboard</summary>
    Type: chart

    Chart type: Multi-panel dashboard with network visualization and centrality metrics

    Purpose: Demonstrate how different centrality measures identify different types of important nodes in a healthcare provider network, allowing comparison of degree, betweenness, and PageRank centrality with interactive exploration.

    Dashboard Layout (1400x900px):

    Panel 1: Provider Network Visualization (top left, 700x500px)
    - Force-directed graph layout showing provider network
    - Nodes: 50 providers (circles)
    - Node size: Varies based on selected centrality measure
    - Node color: Heat map based on centrality score (blue=low, yellow=medium, red=high)
    - Edges: Referral relationships (arrows)
    - Edge thickness: Referral volume
    - Labels: Provider ID or name (toggleable)
    - Interactive: Click node to see details, drag to rearrange, zoom/pan

    Sample network structure:
    - 5 primary care providers (hubs with many outgoing referrals)
    - 15 specialists in common specialties (cardiology, orthopedics, etc.)
    - 10 super-specialists (highly specialized, receive many referrals)
    - 8 coordinating providers (high betweenness, connect different groups)
    - 12 peripheral providers (few connections)
    - Realistic referral patterns based on specialty relationships

    Panel 2: Centrality Measure Selector (top right, 700x200px)
    Radio buttons to select centrality measure:
    - ○ Degree Centrality (In-Degree, Out-Degree, Total)
    - ○ Betweenness Centrality
    - ○ PageRank
    - ○ Compare All (shows all three simultaneously)

    When measure selected:
    - Network visualization updates with node sizes reflecting chosen measure
    - Color heat map updates to show centrality scores
    - Rankings table updates (Panel 3)
    - Description panel explains the measure (Panel 4)

    Panel 3: Centrality Rankings Table (top right below selector, 700x300px)
    Shows top 15 providers ranked by selected centrality measure:

    | Rank | Provider | Specialty | Centrality Score | Patient Volume | Referrals In | Referrals Out |
    |------|----------|-----------|------------------|----------------|--------------|---------------|
    | 1 | Dr. Anderson | Cardiology | 0.0847 | 2,450 | 342 | 89 |
    | 2 | Dr. Chen | Internal Med | 0.0782 | 3,120 | 78 | 456 |
    | 3 | Metro Hospital | Hospital | 0.0691 | 12,500 | 892 | 234 |
    | ... | ... | ... | ... | ... | ... | ... |

    - Sortable by any column
    - Color-coded scores matching network heat map
    - Click row to highlight provider in network visualization
    - Hover shows provider details

    Panel 4: Measure Explanation (middle left, 700x200px)
    Dynamic text box explaining selected measure:

    For Degree Centrality:
    "Degree centrality counts the number of direct connections a provider has. In this referral network:
    - IN-DEGREE: Number of referrals received (popular specialists)
    - OUT-DEGREE: Number of referrals sent (primary care, coordinators)
    - TOTAL DEGREE: Sum of in-degree and out-degree

    High degree indicates active participation in the referral network. Dr. Chen has the highest total degree (534 connections), indicating a very active practice with extensive referral relationships."

    For Betweenness Centrality:
    "Betweenness centrality measures how often a provider appears on the shortest referral path between other providers. High betweenness indicates a critical 'bridge' or 'broker' role.

    Providers with high betweenness centrality are essential connectors in the network. If they leave the network or stop accepting referrals, it significantly disrupts care coordination. Dr. Martinez (Neurology) has highest betweenness (0.189), serving as a critical bridge between primary care and subspecialists."

    For PageRank:
    "PageRank measures a provider's importance based on both the quantity and quality of incoming referrals. A provider receives high PageRank if they are referred to by many providers, especially if those referring providers themselves have high PageRank.

    PageRank identifies the most 'trusted' providers in the network. Metro Cardiac Center has the highest PageRank (0.0847), receiving referrals from many highly-connected providers, indicating strong reputation."

    Panel 5: Centrality Distribution Chart (middle right, 700x200px)
    Histogram showing distribution of centrality scores:
    - X-axis: Centrality score (binned)
    - Y-axis: Number of providers
    - Shows shape of distribution (power law for degree/PageRank, more normal for betweenness)
    - Highlights top 10% in red
    - Annotations:
      * Mean: X.XX
      * Median: X.XX
      * Std Dev: X.XX
      * Max: X.XX
      * "Power law distribution typical of real networks"

    Panel 6: Comparison Scatter Plot (bottom left, 700x400px)
    When "Compare All" selected, shows scatter plot:
    - X-axis: One centrality measure (dropdown selector)
    - Y-axis: Another centrality measure (dropdown selector)
    - Points: Providers (colored by specialty)
    - Size: Patient volume
    - Quadrants labeled:
      * High X, High Y: "Network Stars" (important by both measures)
      * High X, Low Y: "[X measure] Specialists"
      * Low X, High Y: "[Y measure] Specialists"
      * Low X, Low Y: "Peripheral Providers"

    Example: Degree (X) vs. PageRank (Y)
    - Shows that some providers have many connections (high degree) but low PageRank (not trusted by important providers)
    - Others have fewer connections (lower degree) but high PageRank (connected to key opinion leaders)
    - Identifies different types of network importance

    Panel 7: Healthcare Insights (bottom right, 700x400px)
    Actionable insights based on centrality analysis:

    "Network Health Indicators:"
    - Network density: 0.18 (moderately connected)
    - Average path length: 2.4 steps (efficient referral network)
    - Number of disconnected providers: 0 (fully connected)
    - Clustering coefficient: 0.42 (moderate community structure)

    "Key Providers by Role:"
    - Care Coordinators (High Betweenness): Dr. Martinez, Dr. Patel, Metro Hospital
    - Trusted Specialists (High PageRank): Metro Cardiac Center, Dr. Anderson, Regional Oncology
    - Active Referrers (High Out-Degree): Dr. Chen, Dr. Johnson, Family Health Clinic
    - Popular Specialists (High In-Degree): Dr. Anderson, Regional Orthopedics, Metro Surgery

    "Network Optimization Recommendations:"
    - ⚠️ Single point of failure: Dr. Martinez has very high betweenness (0.189). If they leave, referral efficiency drops 34%. Recommend developing backup coordinators.
    - ✓ Well-distributed PageRank: Top 10 providers account for only 28% of total PageRank (healthy distribution)
    - ⚠️ Underutilized specialists: 8 providers have <10 referrals/year despite appropriate specialty. Consider why they're not trusted.
    - ✓ Efficient structure: Average path length of 2.4 steps means most patients reach specialist within 2 referrals.

    Interactive Features:

    1. Network Exploration:
       - Hover node: Show tooltip with provider details, all centrality scores
       - Click node: Highlight all connected nodes (referral partners)
       - Double-click node: Show "ego network" (just this provider and immediate connections)
       - Right-click node: Show menu with actions:
         * "Find referral paths from this provider"
         * "Show providers who refer here"
         * "Compare to peers in same specialty"

    2. Filter Controls:
       - Specialty filter: Show only selected specialties
       - Centrality threshold slider: Hide providers below threshold
       - Referral volume filter: Show only high-volume relationships
       - Geographic filter: If location data available

    3. Scenario Analysis:
       - Button: "What if Dr. X leaves?" - Recalculate centrality with node removed
       - Button: "Add new specialist" - See impact on network structure
       - Button: "Optimize for quality" - Highlight high PageRank providers for narrow network

    4. Export Features:
       - Export rankings table as CSV
       - Export network visualization as PNG
       - Generate network analysis report (PDF)
       - Save centrality scores to database

    Sample Cypher Queries (shown in expandable panel):

    Query 1: "Calculate degree centrality"
    MATCH (p:Provider)
    RETURN p.name,
           size((p)<-[:REFERS_TO]-()) as in_degree,
           size((p)-[:REFERS_TO]->()) as out_degree,
           size((p)-[:REFERS_TO]-()) as total_degree
    ORDER BY total_degree DESC
    LIMIT 20

    Query 2: "Calculate PageRank"
    CALL gds.pageRank.stream('provider-network')
    YIELD nodeId, score
    WITH gds.util.asNode(nodeId) as provider, score
    RETURN provider.name, provider.specialty, score as pagerank
    ORDER BY pagerank DESC
    LIMIT 20

    Query 3: "Calculate betweenness centrality"
    CALL gds.betweenness.stream('provider-network')
    YIELD nodeId, score
    WITH gds.util.asNode(nodeId) as provider, score
    RETURN provider.name, provider.specialty, score as betweenness
    ORDER BY betweenness DESC
    LIMIT 20

    Data Characteristics:
    - Realistic referral network based on actual specialty relationships
    - Power-law degree distribution (few hubs, many peripheral nodes)
    - Assortative mixing (providers tend to refer within specialty groups)
    - Small-world properties (short average path length, high clustering)

    Implementation: D3.js for network visualization, Chart.js for histograms and scatter plots, React for dashboard
    Performance: Optimized for networks up to 1,000 nodes, 10,000 edges
    Additional features: Animation showing how centrality scores converge during PageRank iteration, time-series view of how network centrality evolves
</details>

## Clustering Coefficient and Community Structure

The **clustering coefficient** measures the degree to which nodes in a network tend to cluster together, forming tightly connected groups. At the local level, a node's clustering coefficient is the fraction of its neighbors that are also connected to each other, ranging from 0 (none of its neighbors are connected) to 1 (all neighbors are fully connected). The global clustering coefficient averages local clustering coefficients across all nodes, providing a network-level measure of community structure.

In healthcare networks, high clustering coefficients indicate strong community formation, which can be interpreted differently depending on context. Among providers, clustering might indicate coordinated care teams working closely together, or it might reveal insular practice patterns that limit patient access to diverse expertise. Among patients, clustering might reveal shared risk factors, geographic communities, or social networks that influence health behaviors.

**Connected components** are maximal subgraphs where every node is reachable from every other node within the component but not reachable from nodes outside the component. Finding connected components partitions a graph into disjoint groups, revealing the fundamental structure of connectivity. In healthcare applications, connected components identify separate care networks, isolated patient populations, or disconnected supply chains.

The following compares local clustering with global network structure:

**Local clustering (node-level):**
- Measures: Fraction of a node's neighbor pairs that are connected
- Range: 0.0 to 1.0
- Interpretation: How tightly grouped are this node's connections?
- Healthcare example: A patient's providers all coordinate with each other (high clustering) vs. seeing unconnected specialists (low clustering)

**Global clustering (network-level):**
- Measures: Average of all local clustering coefficients
- Range: 0.0 to 1.0
- Interpretation: Overall tendency toward community formation
- Healthcare example: Provider network overall has strong care teams (high clustering) vs. fragmented care delivery (low clustering)

<details markdown="1">
    <summary>Network Community Detection Interactive Graph Model</summary>
    Type: graph-model

    Purpose: Illustrate how community detection algorithms partition healthcare networks into meaningful groups, showing the Louvain algorithm identifying patient cohorts, provider communities, and disease clusters.

    Node types:
    1. Patient (green circles)
       - Properties: patient_id, age, gender, diagnosis_codes[], zip_code
       - Size: Number of healthcare encounters
       - Example: "Patient #4829, Age 67, CHF+Diabetes"

    2. Provider (blue squares)
       - Properties: npi, name, specialty, practice_location
       - Size: Patient panel size
       - Example: "Dr. Smith, Cardiology, Metro Clinic"

    3. Diagnosis (purple diamonds)
       - Properties: icd_code, description, category
       - Size: Number of patients with diagnosis
       - Example: "I50.9: Heart Failure"

    4. Medication (orange hexagons)
       - Properties: ndc_code, drug_name, drug_class
       - Size: Number of prescriptions
       - Example: "Metformin, Antidiabetic"

    Edge types:
    1. HAS_DIAGNOSIS (solid purple)
       - From: Patient → Diagnosis
       - Properties: diagnosis_date, primary (boolean)

    2. TREATED_BY (solid blue)
       - From: Patient → Provider
       - Properties: encounter_count, last_visit_date

    3. PRESCRIBED (dashed orange)
       - From: Patient → Medication
       - Properties: prescription_date, dosage

    4. CO_PRESCRIBED (dotted orange)
       - From: Medication → Medication
       - Properties: co_prescription_frequency
       - Note: Created when medications frequently prescribed together

    5. CO_OCCURS (dashed purple)
       - From: Diagnosis → Diagnosis
       - Properties: co_occurrence_rate
       - Note: Diagnoses that frequently appear together

    6. REFERS_TO (solid blue arrow)
       - From: Provider → Provider
       - Properties: referral_count

    Sample Network:
    - 100 patients
    - 20 providers (5 primary care, 15 specialists)
    - 30 diagnosis codes
    - 25 medications

    Community Detection Scenarios:

    Scenario 1: Patient Cohort Detection
    Goal: Identify groups of similar patients based on diagnoses and treatments

    Algorithm: Louvain community detection on patient-diagnosis-medication network

    Expected Communities (shown with distinct colors):
    - Community 1 (Red): Cardiac patients
      * 25 patients
      * Common diagnoses: Heart failure, Hypertension, Coronary artery disease
      * Common medications: Beta-blockers, ACE inhibitors, Diuretics
      * Common providers: Cardiologists, cardiology-focused PCP
      * Insights: "This cohort has high readmission risk (32% vs. 18% average). Consider enhanced care coordination."

    - Community 2 (Green): Diabetic patients
      * 22 patients
      * Common diagnoses: Type 2 diabetes, Diabetic neuropathy, Retinopathy
      * Common medications: Metformin, Insulin, Statins
      * Common providers: Endocrinologists, ophthalmologists
      * Insights: "78% are not meeting HbA1c targets. Recommend intensified management protocol."

    - Community 3 (Blue): Elderly complex patients
      * 18 patients
      * Common diagnoses: Multiple chronic conditions (avg 5.2 diagnoses)
      * Common medications: Polypharmacy (avg 8.4 medications)
      * Common providers: Geriatricians, multiple specialists
      * Insights: "High medication interaction risk. Recommend pharmacist consultation for all."

    - Community 4 (Yellow): Healthy/Prevention
      * 20 patients
      * Common diagnoses: Preventive care codes, wellness visits
      * Common medications: Minimal (vitamins, occasional antibiotics)
      * Common providers: Primary care only
      * Insights: "Good health maintenance. Opportunity for coaching to maintain status."

    - Community 5 (Purple): Respiratory conditions
      * 15 patients
      * Common diagnoses: COPD, Asthma, Pneumonia
      * Common medications: Inhalers, Corticosteroids, Bronchodilators
      * Common providers: Pulmonologists
      * Insights: "High ER utilization for exacerbations. Consider telehealth monitoring."

    Scenario 2: Provider Network Communities
    Goal: Identify natural provider practice groups based on referral patterns

    Algorithm: Louvain on provider-referral network

    Expected Communities:
    - Community A: Cardiac care network (3 PCPs, 2 cardiologists, 1 cardiac surgeon)
    - Community B: Orthopedic network (2 PCPs, 3 orthopedists, 1 physical therapy clinic)
    - Community C: Primary care cluster (5 family medicine providers with minimal specialist connections)
    - Community D: Academic medical center (highly interconnected specialists with cross-referrals)

    Interactive Features:

    1. Algorithm Selector (dropdown):
       - Louvain (fast, hierarchical)
       - Label Propagation (very fast, non-deterministic)
       - Connected Components (strict separation)
       - Leiden (improved Louvain)

    2. Network View Selector (radio buttons):
       - Patient-Diagnosis-Medication view
       - Provider-Referral view
       - Combined multi-layer view
       - Bipartite patient-provider view

    3. Algorithm Visualization:
       - Button: "Run Community Detection"
       - Animation shows:
         * Initialization: All nodes same color
         * Iteration 1: Nodes start changing colors based on neighbor communities
         * Iteration 2-N: Communities stabilize
         * Final: Distinct communities with color coding
       - Progress bar: "Iteration 5/12, Modularity: 0.67"

    4. Community Controls:
       - Slider: "Minimum community size" (5-50 nodes)
       - Slider: "Resolution parameter" (affects granularity)
       - Checkbox: "Show inter-community edges" (visualize boundaries)
       - Checkbox: "Label communities" (show community statistics)

    5. Community Inspector (click any community):
       Shows detailed metrics:
       - Community ID and color
       - Number of nodes
       - Internal edge density vs. external connections
       - Modularity contribution
       - Top nodes by centrality within community
       - Common attributes (top diagnoses, medications, demographics)
       - Healthcare interpretation

    6. Quality Metrics:
       - Modularity score: 0.0 to 1.0 (higher = better community structure)
       - Number of communities detected
       - Average community size
       - Conductance (ratio of inter-community to intra-community edges)
       - Silhouette score (cohesion and separation)

    7. Comparison Mode:
       - Run multiple algorithms
       - Show side-by-side results
       - Highlight: "Louvain found 5 communities (modularity 0.72), Label Propagation found 7 communities (modularity 0.68)"
       - Agreement matrix: Which patients are in same community across algorithms?

    Healthcare Insights Panel:

    For Patient Communities:
    "Community detection identified 5 distinct patient cohorts:
    - Cardiac cohort (25 patients): Focus on reducing readmissions through care coordination
    - Diabetic cohort (22 patients): Improve glycemic control through intensified management
    - Complex elderly (18 patients): Medication reconciliation and fall prevention
    - Healthy cohort (20 patients): Maintain wellness through preventive services
    - Respiratory cohort (15 patients): Reduce exacerbations through remote monitoring

    RECOMMENDED ACTIONS:
    1. Assign care managers to Cardiac and Complex Elderly cohorts (highest risk)
    2. Implement diabetes care pathways for Diabetic cohort
    3. Deploy remote monitoring for Respiratory cohort
    4. Create targeted wellness programs for Healthy cohort"

    For Provider Communities:
    "Network analysis identified 4 natural provider practice communities:
    - Cardiac care network: Efficient referral patterns (avg 1.2 referrals to diagnosis)
    - Orthopedic network: High patient satisfaction (4.7/5.0 average)
    - Primary care cluster: Isolated from specialists (only 12% specialist referral rate vs. 28% network average) ⚠️
    - Academic medical center: High quality scores but long wait times (avg 21 days)

    NETWORK OPTIMIZATION:
    - Primary care cluster needs better specialist connections - recommend adding preferred specialist relationships
    - Academic center wait times could be reduced by better load balancing with community providers"

    Sample Cypher Queries (shown in sidebar):

    Query 1: "Run Louvain community detection on patients"
    CALL gds.louvain.stream('patient-network', {
      relationshipWeightProperty: 'similarity'
    })
    YIELD nodeId, communityId
    WITH gds.util.asNode(nodeId) as patient, communityId
    RETURN communityId,
           count(patient) as community_size,
           collect(patient.patient_id)[0..5] as sample_patients
    ORDER BY community_size DESC

    Query 2: "Calculate modularity of communities"
    CALL gds.louvain.write('patient-network', {
      writeProperty: 'community'
    })
    YIELD modularity, communityCount
    RETURN modularity, communityCount

    Query 3: "Find common diagnoses within each community"
    MATCH (p:Patient {community: $community_id})-[:HAS_DIAGNOSIS]->(d:Diagnosis)
    WITH d, count(p) as patient_count
    ORDER BY patient_count DESC
    RETURN d.description, patient_count
    LIMIT 10

    Layout Options:
    - Force-directed: Natural clustering visible
    - Circular by community: Each community in circle segment
    - Hierarchical: Tree structure showing community hierarchy
    - Geographic: If location data available, map-based

    Visual Styling:
    - Communities: Distinct colors (max 12 communities supported)
    - Community boundaries: Dashed circles or convex hulls around member nodes
    - Inter-community edges: Thin gray lines
    - Intra-community edges: Thicker, colored by community
    - Node labels: Show on hover or toggle on/off

    Educational Callouts:
    - "Modularity": Tooltip explaining what modularity measures and why it matters
    - "Resolution Parameter": How it affects granularity (low = fewer large communities, high = many small communities)
    - "Louvain Algorithm": Brief explanation of two-phase approach (local optimization, then aggregation)

    Implementation: vis-network for graph visualization, Neo4j Graph Data Science library algorithms
    Canvas size: 1200x900px with community statistics sidebar
    Additional features: Export community assignments, generate community report, compare to ground truth (if labels available)
</details>

## Cycle Detection and Pattern Recognition

**Cycle detection** identifies closed loops in a graph where a path exists from a node back to itself, which can indicate various phenomena depending on the healthcare context. In financial transactions, cycles might indicate circular money flows suggesting fraud or kickback schemes. In care delivery, cycles might represent patients bouncing between providers without resolution, or appropriate care coordination where patients return to their primary provider after specialist consultation.

**Graph pattern recognition** (also called subgraph matching or motif detection) finds specific structural patterns within larger graphs, enabling discovery of recurring organizational structures, workflow patterns, or relationship configurations. Patterns can be as simple as triangles (three mutually connected nodes) or as complex as multi-node configurations representing specific clinical pathways or care team structures.

Common graph patterns in healthcare and their interpretations:

**Triangle (3-cycle):** Three nodes mutually connected
- Provider context: Care team collaboration (PCP, specialist, facility all coordinate)
- Patient context: Shared care management (patient sees three coordinating providers)
- Fraud context: Circular referral pattern (potential kickback indicator)

**Star pattern:** Central node connected to many peripheral nodes with no connections among peripherals
- Provider context: Hub specialist receiving many independent referrals
- Patient context: Patient seeing many specialists without coordination
- DME context: Fraudulent supplier receiving referrals from many unconnected physicians

**Chain pattern:** Linear sequence of connections
- Care pathway: Patient journey through sequence of providers
- Supply chain: Product flow from manufacturer to patient
- Information flow: How knowledge propagates through network

**Clique:** Fully connected subgraph where every node connects to every other node
- Care team: Tightly integrated multidisciplinary team
- Patient cohort: Patients who share all the same providers and conditions
- Research network: Collaborating investigators

The following Cypher query finds circular referral patterns that might indicate kickback schemes:

```cypher
// Find circular referral patterns of length 3-4
// where providers refer to each other in a cycle
// and have financial relationships

MATCH path = (p1:Provider)-[:REFERS_TO*2..4]->(p1)
WHERE length(path) >= 2 AND length(path) <= 4

WITH nodes(path) as cycle_providers, path

// Check if any providers in cycle have financial relationships
MATCH (prov1)-[r:FINANCIAL_RELATIONSHIP]-(prov2)
WHERE prov1 IN cycle_providers AND prov2 IN cycle_providers

WITH cycle_providers,
     count(DISTINCT r) as financial_links,
     sum([rel in relationships(path) | rel.referral_count]) as total_referrals

WHERE financial_links > 0

RETURN
  [p IN cycle_providers | p.name] as providers_in_cycle,
  length(cycle_providers) as cycle_length,
  financial_links,
  total_referrals,
  CASE
    WHEN financial_links >= 2 AND total_referrals > 100
    THEN 'High Risk'
    WHEN financial_links >= 1 AND total_referrals > 50
    THEN 'Medium Risk'
    ELSE 'Low Risk'
  END as fraud_risk_level

ORDER BY fraud_risk_level DESC, financial_links DESC, total_referrals DESC
LIMIT 20
```

## Similarity Measures and Link Prediction

**Similarity measures** quantify how alike two nodes are based on their attributes, connections, or position in the network. Different similarity algorithms capture different notions of likeness: shared neighbors, overlapping attributes, or structural equivalence. In healthcare, similarity measures enable patient matching for cohort studies, duplicate record detection, treatment recommendation based on similar patients, and provider peer comparison.

Common graph-based similarity measures include:

**Jaccard similarity** measures the overlap between two nodes' neighborhoods as the size of the intersection divided by the size of the union:

```
Jaccard(A, B) = |N(A) ∩ N(B)| / |N(A) ∪ N(B)|
```

Where N(A) is the set of neighbors of node A. In healthcare, Jaccard similarity can identify patients with similar provider networks, providers serving similar patient populations, or conditions with overlapping medication regimens.

**Cosine similarity** measures the cosine of the angle between two vectors representing node attributes or connections, ranging from 0 (orthogonal, completely dissimilar) to 1 (parallel, identical).

**Adamic-Adar** weights shared neighbors by the inverse logarithm of their degree, giving more importance to rare shared connections:

```
AA(A, B) = Σ_{z ∈ N(A) ∩ N(B)} 1/log(degree(z))
```

**Link prediction** estimates the likelihood of future relationships forming between currently unconnected nodes based on network structure and node attributes. Link prediction algorithms analyze existing network patterns to predict missing relationships, future connections, or relationships not yet observed in the data.

Healthcare applications of similarity and link prediction include:

- **Readmission prediction:** Predicting which patients will return to hospital based on similarity to previously readmitted patients
- **Referral prediction:** Predicting which specialists a primary care provider will refer to based on referral patterns of similar providers
- **Drug interaction discovery:** Predicting likely drug-drug interactions based on similarity of molecular structures and known interactions
- **Clinical trial matching:** Finding patients similar to those who benefited from specific treatments
- **Missing diagnosis detection:** Identifying likely diagnoses that weren't coded based on similarity to other patients with same symptoms and test results

## Graph Embeddings and Representation Learning

**Graph embeddings** are low-dimensional vector representations of nodes that preserve graph structure, enabling machine learning algorithms to operate on graph data. By transforming nodes into vectors (typically 64-512 dimensions), graph embedding techniques make graph data compatible with standard machine learning tools like classification, regression, and clustering algorithms while capturing complex network topology in numeric features.

**Node embeddings** specifically represent individual nodes as vectors, where nodes with similar network positions or properties receive similar embedding vectors. The goal is to learn a mapping function that transforms each node into a vector such that the distance between vectors reflects network proximity or structural similarity.

Popular node embedding techniques include:

**Node2Vec** uses random walks to sample the network neighborhood of each node, then applies Word2Vec-style learning to generate embeddings where nodes appearing in similar walk contexts receive similar embeddings. Node2Vec allows tuning between breadth-first (local structure) and depth-first (global structure) exploration through parameters p and q.

**GraphSAGE** (Graph Sample and Aggregate) learns embeddings by sampling and aggregating features from a node's local neighborhood using neural networks. Unlike Node2Vec which requires retraining for new nodes, GraphSAGE can generate embeddings for previously unseen nodes (inductive learning).

**DeepWalk** performs random walks starting from each node and treats the walks as sentences, applying Word2Vec to learn embeddings. DeepWalk is simpler than Node2Vec but doesn't allow tuning exploration strategy.

Healthcare applications of graph embeddings include:

- **Patient representation learning:** Creating patient embedding vectors that capture complete medical history, provider relationships, and condition patterns for use in predictive models
- **Medication recommendation:** Embedding medications based on co-prescription networks to recommend alternatives or predict drug interactions
- **Disease progression modeling:** Learning disease embeddings that capture progression patterns and comorbidity relationships
- **Provider performance prediction:** Creating provider embeddings that capture practice patterns, patient populations, and outcomes for quality prediction
- **Medical concept organization:** Embedding clinical concepts (diagnoses, procedures, symptoms) based on co-occurrence to create semantic similarity measures

**Graph Neural Networks (GNNs)** extend deep learning to graph-structured data by defining neural network layers that operate on graphs, aggregating information from neighboring nodes through message passing. GNNs learn node, edge, or graph-level representations end-to-end for specific prediction tasks, achieving state-of-the-art results on many graph analytics problems.

Key GNN architectures include:

- **Graph Convolutional Networks (GCN):** Apply convolution-like operations on graphs, aggregating neighbor features
- **Graph Attention Networks (GAT):** Use attention mechanisms to weight neighbor importance dynamically
- **GraphSAGE:** Samples and aggregates neighborhood features with learned aggregation functions
- **Graph Isomorphism Networks (GIN):** Maximally expressive GNN that can distinguish different graph structures

Healthcare applications of GNNs:

- **Polypharmacy side effect prediction:** Predicting adverse drug combinations using GNNs on drug-drug interaction networks
- **Disease diagnosis:** Classifying patient diagnoses based on symptom networks and patient similarity graphs
- **Molecule property prediction:** Predicting drug efficacy or toxicity from molecular graph structure
- **Hospital readmission prediction:** Using GNNs on patient-provider-diagnosis networks to predict readmission risk
- **Treatment outcome prediction:** Predicting treatment success based on patient similarity networks and historical outcomes

## Summary and Key Takeaways

Graph algorithms provide the computational foundation for extracting insights from healthcare's complex relational data, enabling analysis that would be impossible with traditional approaches. By operating directly on network structure rather than flattened tabular representations, graph algorithms preserve and leverage the rich connectivity inherent in healthcare data—from patient journeys through care systems to provider collaboration networks to disease comorbidity patterns.

Key concepts covered in this chapter include:

- **Graph algorithm fundamentals:** Understanding how graph algorithms differ from traditional data processing and why they are essential for healthcare analytics
- **Shortest path algorithms:** Finding optimal routes through care networks, diagnostic pathways, and supply chains using Dijkstra's algorithm and variants
- **Centrality measures:** Identifying important nodes through degree centrality, betweenness centrality, and PageRank to find key providers, critical facilities, and influential nodes
- **Clustering and community detection:** Measuring local clustering coefficients and identifying communities through Louvain algorithm to reveal patient cohorts and provider networks
- **Cycle detection and pattern recognition:** Finding circular patterns that might indicate coordination or fraud, and recognizing recurring structural motifs
- **Similarity measures:** Quantifying node similarity through Jaccard, cosine, and Adamic-Adar measures for patient matching and recommendation systems
- **Link prediction:** Predicting future relationships for readmission risk, referral patterns, and missing data imputation
- **Graph embeddings:** Learning vector representations of nodes through Node2Vec, GraphSAGE, and other techniques for machine learning integration
- **Graph Neural Networks:** Applying deep learning to graph data for prediction, classification, and representation learning on healthcare networks

As healthcare organizations accumulate ever-larger datasets capturing detailed patient journeys, provider interactions, and treatment outcomes, the ability to apply sophisticated graph algorithms becomes increasingly critical for extracting actionable insights. These algorithms transform raw connectivity into strategic intelligence, supporting clinical decision-making, operational optimization, population health management, and biomedical research.

In the next chapter, we will explore how graph databases integrate with artificial intelligence and machine learning systems, combining graph analytics with predictive models to enable precision medicine, clinical decision support, and intelligent healthcare applications.
