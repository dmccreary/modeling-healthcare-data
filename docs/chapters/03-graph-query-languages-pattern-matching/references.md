# References: Graph Query Languages and Pattern Matching

1. [Cypher (query language)](https://en.wikipedia.org/wiki/Cypher_(query_language)) - Wikipedia - Traces Cypher's origin at Neo4j, its ASCII-art pattern syntax, and its role in the ISO GQL standard, matching this chapter's worked MATCH/WHERE/RETURN examples.

2. [Extract, Transform, Load](https://en.wikipedia.org/wiki/Extract,_transform,_load) - Wikipedia - Describes the three-phase ETL process this chapter uses to explain how healthcare records move from source systems into nodes and edges via bulk import.

3. [Subgraph Isomorphism Problem](https://en.wikipedia.org/wiki/Subgraph_isomorphism_problem) - Wikipedia - Covers the NP-complete problem of matching a pattern graph onto a larger graph, the formal complexity result this chapter cites to justify why indexing matters for Cypher pattern matching.

4. Graph Databases (2nd Edition) - Ian Robinson, Jim Webber, and Emil Eifrem - O'Reilly Media - Written by Neo4j's own creators, credited with popularizing the ASCII-art MATCH pattern syntax and property-graph modeling style this chapter's Cypher examples follow directly.

5. The Data Warehouse ETL Toolkit - Ralph Kimball and Joe Caserta - Wiley - The widely used practical reference for designing extract-transform-load pipelines, the same extract-transform-load sequence this chapter applies to moving a relational Patients table into graph nodes.

6. [Cypher Manual](https://neo4j.com/docs/cypher-manual/current/) - Neo4j Documentation - The official reference for Neo4j's declarative Cypher language, covering the MATCH, WHERE, WITH, and RETURN clauses this chapter builds its worked queries from.

7. [GQL Standard](https://www.gqlstandards.org/) - GQL Standards Committee - The official resource describing ISO/IEC 39075:2024, the graph query language standard this chapter identifies as unifying Cypher-style pattern matching across vendors.

8. [Creating the GQL Database Language Standard](https://neo4j.com/blog/cypher-and-gql/gql-database-language-standard/) - Neo4j Graph Database & Analytics Blog - Recounts the five-year standardization process that fused Cypher, GSQL, and PGQL into GQL, the vendor-fragmentation history this chapter's query-language timeline summarizes.

9. [GSQL Language Reference](https://www.tigergraph.com/docs/gsql-ref/current/intro/intro) - TigerGraph Documentation - Introduces GSQL's schema design, loading, and querying environment, including the accumulator-based aggregation this chapter contrasts with Cypher's WITH...count() approach.

10. [Search-Performance Indexes](https://neo4j.com/docs/cypher-manual/current/indexes/search-performance-indexes/) - Neo4j Cypher Manual - Explains how creating an index changes a query's execution plan from a full label scan to an index seek, the exact optimization this chapter demonstrates with a PROFILE comparison.
