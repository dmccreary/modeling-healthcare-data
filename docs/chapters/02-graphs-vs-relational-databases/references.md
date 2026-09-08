# References: Data Modeling: Graphs vs. Relational Databases

1. [Relational Database](https://en.wikipedia.org/wiki/Relational_database) - Wikipedia - Covers tables, rows, columns, and schema enforcement, the relational vocabulary this chapter contrasts directly against the labeled property graph model introduced in Chapter 1.

2. [Database Normalization](https://en.wikipedia.org/wiki/Database_normalization) - Wikipedia - Explains the progressive 1NF/2NF/3NF design rules this chapter walks through on an unnormalized Encounters table to show how normalization trades storage duplication for extra joins.

3. [Entity–Relationship Model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model) - Wikipedia - Describes Peter Chen's diagramming notation for entities, relationships, and cardinality, the conceptual-design step this chapter says precedes translating a domain into either tables or a graph.

4. Fundamentals of Database Systems (7th Edition) - Ramez Elmasri and Shamkant B. Navathe - Pearson - Credited for its functional-dependency-driven, step-by-step derivation of 1NF, 2NF, and 3NF that has become the standard classroom sequence this chapter's Encounters-table example follows.

5. Database System Concepts (7th Edition) - Abraham Silberschatz, Henry F. Korth, and S. Sudarshan - McGraw-Hill - Widely adopted for teaching how an entity-relationship diagram is systematically translated into relational tables and foreign keys, the exact conceptual-to-physical step this chapter assumes as background.

6. [RDF 1.1 Primer](https://www.w3.org/TR/rdf11-primer/) - W3C - The official specification introducing the subject-predicate-object triple, the rigid three-part shape this chapter contrasts with a property graph edge's ability to carry properties directly.

7. [RDF vs. Property Graphs](https://neo4j.com/blog/knowledge-graph/rdf-vs-property-graphs-knowledge-graphs/) - Neo4j Graph Intelligence Platform - Compares RDF triple stores against labeled property graphs on modeling flexibility and relationship expressiveness, expanding this chapter's warning against treating the two as synonyms.

8. [Normal Forms in DBMS](https://www.geeksforgeeks.org/dbms/normal-forms-in-dbms/) - GeeksforGeeks - A worked reference on 1NF through BCNF with examples, supporting this chapter's three-pass normalization walkthrough of an unnormalized Encounters table.

9. [Schema-on-Read vs Schema-on-Write](https://www.dremio.com/wiki/schema-on-read-vs-schema-on-write/) - Dremio - Contrasts write-time schema enforcement with read-time flexibility, the exact distinction this chapter uses to explain why a Patient node can gain a new property without an ALTER TABLE migration.

10. [GraphML](https://graphml.ethz.ch/) - Graph Drawing Symposium / ETH Zurich - The official specification for the XML-based GraphML file format, one of the graph serialization formats this chapter names alongside JSON node/edge lists and RDF's Turtle syntax.
