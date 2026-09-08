# References: AI, LLMs, and Knowledge Graphs for Healthcare

1. [Large Language Model](https://en.wikipedia.org/wiki/Large_language_model) - Wikipedia - Explains the transformer-based neural network architecture trained on massive text corpora, the technology this chapter positions as fluent but ungrounded until paired with retrieval from a graph or vector store.

2. [Knowledge Graph](https://en.wikipedia.org/wiki/Knowledge_graph) - Wikipedia - Covers the graph-structured knowledge base model this chapter distinguishes from an operational database by its shared ontology layer (SNOMED CT, RxNorm, ICD-10) binding entities to a common vocabulary.

3. [Retrieval-Augmented Generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) - Wikipedia - Describes the technique of retrieving external facts before generation, the exact pipeline this chapter's anticoagulation-dosing worked example uses to ground an LLM's clinical recommendation.

4. Deep Learning - Ian Goodfellow, Yoshua Bengio, and Aaron Courville - MIT Press - Credited for the widely reproduced Venn diagram (Figure 1.4) nesting AI, machine learning, and deep learning, the exact taxonomy this chapter's AI/ML/deep-learning MicroSim and sepsis-alert worked example are built around.

5. Introduction to Information Retrieval - Christopher D. Manning, Prabhakar Raghavan, and Hinrich Schütze - Cambridge University Press - The standard information-retrieval textbook credited for its vector space model and cosine similarity treatment, the same mathematics this chapter hand-calculates in its chest-pain embedding example.

6. [Prompt Engineering Overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) - Anthropic - Official documentation on prompting techniques including examples, structure, and chain-of-thought reasoning, directly matching this chapter's coverage of zero-shot, few-shot, and structured-output prompting.

7. [Vector Embeddings](https://developers.openai.com/api/docs/guides/embeddings) - OpenAI - Documents how embeddings represent text as vectors ranked by relatedness for search and retrieval, the underlying mechanism this chapter's vector store and semantic search sections explain with a worked cosine-similarity example.

8. [What Is GraphRAG?](https://neo4j.com/blog/genai/what-is-graphrag/) - Neo4j - Explains how combining knowledge graphs with retrieval-augmented generation improves context and explainability over vector-only retrieval, the exact "graph and LLM integration" pattern this chapter names Graph RAG.

9. [Clinical Decision Support](https://www.healthit.gov/topic/safety/clinical-decision-support) - Office of the National Coordinator for Health Information Technology - The federal health IT authority's definition of CDS as timely, filtered, person-specific information at the point of care, matching this chapter's "five rights" framework and alert-fatigue discussion.

10. [What Is a Knowledge Graph?](https://www.ibm.com/think/topics/knowledge-graph) - IBM - A practitioner-oriented explainer of nodes, edges, and labels with healthcare and enterprise use cases, reinforcing this chapter's enterprise knowledge graph and enterprise nervous system concepts.
