---
title: AI, LLMs, and Knowledge Graphs for Healthcare
description: How artificial intelligence, large language models, vector stores, and knowledge graphs combine to power clinical decision support and population health analytics.
generated_by: claude skill chapter-content-generator
date: 2026-09-07 14:10:36
version: 1.10
---

# AI, LLMs, and Knowledge Graphs for Healthcare

## Summary

This chapter introduces artificial intelligence and machine learning as applied to healthcare graphs, starting with supervised and unsupervised learning and large language models. It covers vector stores, semantic search, token efficiency, and retrieval-augmented generation, then shows how knowledge graphs, context graphs, and enterprise knowledge graphs combine with LLMs to support clinical decision support and population health analytics. Students learn why graphs and LLMs are complementary rather than competing technologies.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Artificial Intelligence | 239 |
| Machine Learning | 3 |
| Supervised Learning | 1 |
| Unsupervised Learning | 2 |
| Large Language Model | 1 |
| Vector Store | 232 |
| Vector Embedding | 2 |
| Semantic Search | 1 |
| Token Efficiency | 5 |
| Retrieval-Augmented Generation | 1 |
| Knowledge Graph | 224 |
| Context Graph | 3 |
| Enterprise Knowledge Graph | 2 |
| Graph And LLM Integration | 2 |
| Enterprise Nervous System | 1 |
| Clinical Decision Support | 49 |
| Clinical Discovery | 2 |
| Recommendation System | 1 |
| Predictive Analytics | 2 |
| Risk Stratification | 1 |
| Population Health Analytics | 24 |
| Prompt Engineering | 2 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Graph Structures](../01-foundations-of-graph-structures/index.md)
- [Chapter 4: Graph Database Scalability and Operations](../04-graph-database-scalability-operations/index.md)
- [Chapter 5: Graph Algorithms, Centrality, and Similarity Measures](../05-graph-algorithms-centrality-similarity/index.md)

---

Every chapter so far has treated the healthcare graph as something a human queries directly — a person writes a Cypher pattern, runs it, and reads the rows that come back. This chapter introduces a second kind of reader: an artificial intelligence system that can query the graph, read unstructured clinical text, and generate a recommendation in plain language. Understanding how these systems work, where they get their facts, and why they sometimes get facts wrong is now a core skill for anyone modeling healthcare data.

!!! mascot-welcome "Let's Talk About Thinking Machines"
    ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Hi again! This chapter is where graphs meet artificial intelligence, and honestly, it's one of my favorite topics — eight arms, infinite possible connections, and now a language model that can talk about all of them. Combining graphs with AI is a genuine real-world superpower: it is one of the key technologies enabling healthcare's slow, hard shift from fee-for-service billing toward value-based care, which is one of the most promising ways to actually bring down the cost of care in this country. Let's connect the dots!

## Artificial Intelligence and Machine Learning: A Family Tree

**Artificial intelligence** (AI) is the broad field of building systems that perform tasks normally requiring human intelligence — reasoning, perception, language understanding, and decision-making. AI is an umbrella term, not a single technique: a simple rule-based alert that fires "if potassium > 5.5, flag as critical" is a form of AI (an expert system), and so is a neural network that reads a chest X-ray. **Machine learning** (ML) is the subset of AI in which a system improves its performance on a task by learning patterns from data, rather than following rules a human explicitly wrote. Within machine learning, two learning styles dominate healthcare applications. **Supervised learning** trains a model on examples that already carry the correct answer — a dataset of ten thousand past hospital stays, each labeled with whether the patient was readmitted within thirty days, teaches a supervised model to predict readmission risk for a new patient. **Unsupervised learning**, by contrast, is given data with no labels at all and asked to find structure on its own — clustering patients by symptom similarity without ever being told what the clusters mean is unsupervised learning, and it is often how new, previously unnamed patient subgroups get discovered.

A worked example makes the family tree concrete. Consider three real healthcare AI systems: (1) a sepsis early-warning system that fires an alert whenever a clinician-authored rule like "temperature above 38.3°C AND heart rate above 90 AND white blood cell count above 12,000" is satisfied; (2) a readmission-risk model trained on labeled historical discharge records to output a probability score; and (3) a system that groups ICU patients into subtypes based on lab-value trajectories, with no predefined subtype labels. System (1) is AI but not machine learning — it is a hand-authored rule, no learning from data occurred. System (2) is supervised machine learning — it was trained on labeled outcomes. System (3) is unsupervised machine learning — it found structure without being told the answer in advance. All three are AI; only two are ML; and the two ML systems split cleanly along the supervised/unsupervised line based on whether the training data carried an answer key.

Before looking at the diagram below, note one more distinction that the diagram itself will make visual: deep learning (neural networks with many layers) is a further subset of machine learning, not a separate category. A model that reads a radiology image directly and outputs a diagnosis is almost always a deep learning model, because only deep, many-layered networks have proven capable of learning directly from raw pixels without a human first hand-engineering which visual features matter.

This nesting relationship also explains a pattern you will see across the healthcare AI industry: older systems tend to sit in the outer ring, newer systems in the inner ring. Expert systems and rule engines — the AI outer ring — date to the 1970s and remain common today precisely because their logic is fully transparent to an auditor: every alert can be traced back to the exact rule that fired it. Supervised and unsupervised ML — the middle ring — became practical for healthcare once electronic health records produced enough structured, labeled data to train on, roughly the 2010s onward. Deep learning — the inner ring — required both large labeled image and text datasets and the specialized graphics-processing hardware to train on them economically, which is why deep-learning-powered radiology and pathology tools are a comparatively recent arrival, mostly commercialized in the last decade. A second worked example reinforces the boundary that matters most for this book: a triage system that routes a new chest X-ray to a radiologist within the hour whenever a deep learning model's output probability of "acute finding" exceeds 0.8 is doing two different jobs at once — the deep learning model (ML) produces the probability, and a simple threshold rule (AI, not ML) decides what to do with that number. Most production healthcare AI systems are exactly this kind of hybrid: a learned model feeding a hand-authored decision rule, which is one reason a single system can be hard to classify with a single label from the taxonomy below.

#### Diagram: AI / ML / Deep Learning Taxonomy

<iframe src="../../sims/ai-ml-taxonomy-healthcare/main.html" height="528" width="100%" scrolling="no"></iframe>

[Run the AI / ML / Deep Learning Taxonomy MicroSim Fullscreen](../../sims/ai-ml-taxonomy-healthcare/main.html){ .md-button }

<details markdown="1">
<summary>AI / ML / Deep Learning Taxonomy (reused)</summary>
Type: infographic
**sim-id:** ai-ml-taxonomy-healthcare<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/ai-ml-taxonomy-healthcare/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/ai-ml-taxonomy-healthcare

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: classify, distinguish<br/>
Learning objective: Given a healthcare AI system description, the learner can classify it as AI, machine learning, or deep learning by identifying whether it uses hand-authored rules, learns from labeled or unlabeled data, or learns directly from raw signals such as images or text.

Reused from the MicroSim catalog. Three concentric circles nest artificial intelligence (outermost), machine learning, and deep learning (innermost), each labeled with a concrete healthcare example — rule-based clinical decision support for AI, readmission-risk prediction for ML, tumor detection in medical images for deep learning. Hovering any ring reveals its definition in a side panel, directly reinforcing the sepsis-alert / readmission-model / patient-clustering worked example described in the preceding paragraphs.
</details>

## Large Language Models, Prompt Engineering, and Token Efficiency

A **large language model** (LLM) is a neural network, typically built from the transformer architecture, trained on massive volumes of text to predict the next token in a sequence. Trained at sufficient scale, this simple next-token-prediction objective produces models that can summarize a discharge note, translate clinical jargon into plain language, or draft a prior-authorization letter — all without ever being explicitly programmed to do any of those specific tasks. LLMs are a specific, very large kind of deep learning model, so they sit inside the innermost circle of the taxonomy above, though their scale and generality set them apart from earlier, narrower deep learning systems.

Because an LLM only ever sees the text it is given, getting good output depends heavily on how that input is phrased — a discipline called **prompt engineering**: the practice of designing instructions, examples, and structure in an LLM's input to reliably produce the desired output. A poorly engineered prompt ("summarize this") might produce an inconsistent, rambling summary; a well-engineered prompt ("Summarize this discharge note in three bullet points: diagnosis, medications changed, and follow-up instructions") reliably produces structured, clinically usable output. Prompt engineering also includes providing a few labeled examples directly in the prompt (a technique sometimes called few-shot prompting) so the model can infer the exact output format expected.

Beyond few-shot examples, three other prompt engineering techniques come up repeatedly in clinical AI systems: zero-shot prompting (asking directly, with no examples, and relying on the model's general training), chain-of-thought prompting (instructing the model to reason step by step before giving a final answer, which measurably improves accuracy on multi-step clinical logic), and structured-output prompting (requiring the response in a fixed format such as JSON, so downstream code can parse it reliably rather than scraping free text). Choosing among these techniques is itself a design decision that trades off reliability against flexibility.

Every token an LLM processes costs money and time, and every model has a hard ceiling on how many tokens it can consider at once — its **context window**. **Token efficiency** is the practice of minimizing the number of tokens consumed by a query while preserving the information the model actually needs to answer it. This is not a minor engineering detail; it is often the difference between a clinically usable system and an unusable one.

Consider a worked example: a clinician asks an AI assistant, "Does this patient have any documented drug allergies?" One naive approach pastes the patient's entire electronic health record — say, 42,000 tokens covering fifteen years of encounters — into the prompt. A token-efficient approach instead queries the underlying graph for just the `ALLERGIC_TO` edges connected to this patient's node, which might return three allergy records totaling 40 tokens. The token-efficient approach is roughly 1,000 times smaller, fits comfortably inside any model's context window, costs a fraction as much per query (LLM providers typically charge per token), and — because it excludes 41,960 tokens of irrelevant information — is also less likely to distract the model into an incorrect or off-topic answer. This is one of the clearest illustrations in the whole book of why a graph database and an LLM pair so naturally: the graph does the precise retrieval, and the LLM only ever has to read the small, relevant slice.

!!! mascot-tip "Fewer Tokens, Better Answers"
    ![Sage pointing at a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Here's a shortcut worth remembering: if you're ever tempted to dump an entire patient record into a prompt, stop and ask "what specific fact does this query actually need?" A graph query that fetches exactly that fact will almost always beat a wall of raw text on cost, speed, and accuracy.

## Vector Stores, Embeddings, and Semantic Search

Graph traversal is powerful when you know the exact relationships you want to follow, but it struggles with a different, very common question: "find me things that mean something similar to this," where "similar" isn't a stored edge at all. Answering that question requires a different data structure. A **vector embedding** is a list of numbers (typically hundreds or thousands of dimensions) produced by a machine learning model such that texts, images, or concepts with similar meaning are mapped to numerically similar vectors. A **vector store** is a specialized database engineered to store millions of these embeddings and quickly find the vectors nearest to a given query vector, using an efficient approximate-nearest-neighbor index rather than scanning every row.

"Nearest" in a vector store almost always means cosine similarity — the cosine of the angle between two vectors, which ranges from -1 (opposite meaning) to 1 (identical meaning) regardless of vector length:

\[ \text{cosine similarity}(A, B) = \frac{A \cdot B}{\lVert A \rVert \, \lVert B \rVert} \]

**Semantic search** is the retrieval technique built on top of this idea: instead of matching exact keywords, a semantic search embeds the query into the same vector space as the stored content and returns the nearest neighbors, so a search for "heart attack" can retrieve a document that only ever says "myocardial infarction" — the two phrases sit close together in embedding space even though they share no words. Walk through a simplified worked example with two-dimensional vectors (real embeddings use hundreds of dimensions, but the arithmetic is identical): suppose "chest pain" embeds to \( (0.9, 0.2) \) and "acute coronary syndrome" embeds to \( (0.85, 0.3) \). Their dot product is \( (0.9)(0.85) + (0.2)(0.3) = 0.765 + 0.06 = 0.825 \); their magnitudes are \( \sqrt{0.9^2+0.2^2} \approx 0.922 \) and \( \sqrt{0.85^2+0.3^2} \approx 0.901 \); dividing gives a cosine similarity of roughly 0.99 — nearly identical meaning, exactly as a clinician would expect.

Production vector stores rarely compute cosine similarity against every stored vector one at a time, because a store holding millions of embeddings would make that far too slow for an interactive clinical tool. Instead, they build an approximate-nearest-neighbor (ANN) index — a data structure such as HNSW (Hierarchical Navigable Small World graphs) that organizes vectors so a query can find its nearest neighbors in roughly logarithmic time by skipping most of the store entirely, trading a small amount of accuracy for a very large speedup. Choosing a vector store for a clinical application also means choosing an embedding model (the model that turns text into vectors in the first place) and a vector dimensionality — common choices range from a few hundred to a few thousand dimensions, with more dimensions capturing finer shades of meaning at the cost of more storage and slower search.

Before looking at the interactive version of this idea, one more term needs defining: **retrieval-augmented generation** (RAG) is the technique of using a vector store's semantic search results — or a graph's traversal results — to retrieve relevant facts, inserting those facts into an LLM's prompt, and only then asking the LLM to generate its answer. RAG is the direct practical payoff of everything in this section: it is how vector stores and LLMs combine to produce answers grounded in real, retrievable evidence instead of the model's unverified internal memory.

#### Diagram: Vector Embedding Similarity Visualization MicroSim

<iframe src="../../sims/vector-embedding-similarity-visualization-microsim/main.html" height="618" width="100%" scrolling="no"></iframe>

[Run the Vector Embedding Similarity Visualization MicroSim Fullscreen](../../sims/vector-embedding-similarity-visualization-microsim/main.html){ .md-button }

<details markdown="1">
<summary>Vector Embedding Similarity Visualization MicroSim (reused)</summary>
Type: microsim
**sim-id:** vector-embedding-similarity-visualization-microsim<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/vector-embedding-similarity-visualization-microsim/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/vector-embedding-similarity-visualization-microsim

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: calculate, demonstrate<br/>
Learning objective: Given a clinical query, apply the nearest-neighbor search process to identify which medical concepts in an embedding space are most semantically similar, and relate the displayed similarity percentage back to the cosine similarity calculation.

Reused from the MicroSim catalog. Twenty medical conditions are projected into a two-dimensional embedding space and colored by category (cardiovascular, respiratory, neurological, metabolic). Choosing a clinical query such as "Chest pain and dyspnea" places it in the space and draws lines to its nearest neighbors with cosine-similarity scores in a results panel; a Neighbors slider and a Threshold slider (shown as a dashed circle) let the learner see exactly which concepts pass a similarity cutoff, connecting directly to the hand-worked cosine similarity example in the preceding paragraph.
</details>

## Knowledge Graphs, Context Graphs, and the Enterprise Nervous System

A **knowledge graph** is a graph database populated specifically to represent facts and their relationships as a queryable, machine-reasoned knowledge base — nodes are entities (a drug, a condition, a guideline), edges are relationships between them (`TREATS`, `CONTRAINDICATED_WITH`, `RECOMMENDED_FOR`), and the whole structure is typically organized under a controlled vocabulary or ontology so that "Type 2 Diabetes" always means the same node no matter which system wrote it. Every labeled property graph from Chapter 1 can serve as a knowledge graph the moment its purpose shifts from operational record-keeping to answering "what do we know, and how is it connected."

What makes a graph specifically a *knowledge* graph, rather than just an operational database, is the presence of a shared vocabulary layer. Most production knowledge graphs bind their node labels to a formal ontology or terminology — SNOMED CT for clinical findings, RxNorm for medications, ICD-10 for diagnosis codes — so that two different source systems referring to "myocardial infarction" and "heart attack" resolve to the very same underlying node rather than two disconnected ones. Without that shared vocabulary layer, a graph is still useful for operational queries, but it cannot reliably answer questions that require recognizing that two differently worded facts are actually the same fact.

Two related but distinct terms scope this idea for practical use. A **context graph** is a small, task-specific subgraph extracted around a particular query — for instance, everything within two hops of a specific patient's node — assembled on demand to give an LLM exactly the grounding it needs for one request, then discarded. An **enterprise knowledge graph** (EKG) is the opposite scale: a single, persistent, organization-wide knowledge graph that integrates data across departments and source systems (EHR, claims, pharmacy, scheduling) into one unified semantic layer that many different applications can query. If a context graph is a flashlight beam illuminating just what's needed right now, an enterprise knowledge graph is the building's entire wiring — always there, connecting every room, waiting to be tapped.

Consider a concrete enterprise knowledge graph worked example: a large health system's EKG integrates a `Patient` node from the EHR, a `Member` record from the claims system, and a `Household` record from the pharmacy benefit manager, all describing the same person under three different identifiers. Because the EKG resolves all three to a single canonical patient node, a care coordinator can ask one question — "which of my high-risk patients filled fewer than half their prescribed statin refills last quarter?" — and get a correct answer that spans clinical, claims, and pharmacy data simultaneously, something none of the three source systems could answer alone.

That wiring metaphor is not accidental. Because an enterprise knowledge graph connects previously siloed systems the way a nervous system connects the parts of a body, it is sometimes called an **enterprise nervous system**: a distributed, always-on layer that senses changes anywhere in the organization's data and routes that signal wherever it is needed. This metaphor also explains why an octopus makes a fitting mascot for this book — an octopus has no single centralized brain; roughly two-thirds of its neurons live out in its eight arms, each capable of local, semi-independent reasoning. An enterprise knowledge graph works the same way: intelligence and up-to-date facts live throughout the graph, not in one central table.

!!! mascot-thinking "Why Graphs and LLMs Are Complementary, Not Competing"
    ![Sage thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice the pattern: an LLM is brilliant at language but has no reliable memory of your specific patients, and a knowledge graph has perfect, precise memory but can't hold a conversation. Neither replaces the other — pairing them is the whole point. Don't get tangled up trying to make one technology do the other's job.

**Graph and LLM integration** describes the concrete patterns that combine these two technologies: using a graph as the retrieval source in a RAG pipeline (often called Graph RAG), using an LLM as a natural-language interface that translates a clinician's question into a graph query, and using an LLM to help extract new entities and relationships from unstructured text to grow the graph itself. None of these patterns treats the LLM and the graph as competitors — each plays to its own strength.

| Dimension | Large Language Model | Knowledge Graph |
|---|---|---|
| Nature | Statistical — predicts probable next tokens | Deterministic — returns exactly what is stored |
| Knowledge source | General patterns learned from training text | Specific facts about your patients, providers, and organization |
| Best at | Natural language understanding and generation | Precise multi-hop relationship queries |
| Risk | Can hallucinate plausible-sounding but false statements | Cannot answer questions outside its stored facts |

#### Diagram: Yin-Yang: LLM vs Knowledge Graph

<iframe src="../../sims/yin-yang-llm-kg/main.html" height="670" width="100%" scrolling="no"></iframe>

[Run the Yin-Yang LLM vs KG MicroSim Fullscreen](../../sims/yin-yang-llm-kg/main.html){ .md-button }

<details markdown="1">
<summary>Yin-Yang: LLM vs Knowledge Graph (reused)</summary>
Type: infographic
**sim-id:** yin-yang-llm-kg<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/yin-yang-llm-kg/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/yin-yang-llm-kg

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: differentiate, compare<br/>
Learning objective: Given the twelve labeled properties on the Yin-Yang symbol, the learner can differentiate which properties belong to LLMs versus knowledge graphs and explain why the two are complementary rather than substitutable.

Reused from the MicroSim catalog. The Yin-Yang symbol places five properties of LLMs (statistical, models language, prone to hallucination) on one side and five properties of knowledge graphs (deterministic, models organizational knowledge, precise traversal) on the other. Hovering any of the twelve labels shows a one-sentence hint; clicking opens a fuller explanation and marks that label explored, with a completion celebration once all twelve have been read — directly reinforcing the comparison table above.
</details>

A quick worked comparison shows the integration pattern end to end. Suppose a clinical QA benchmark of 500 questions is scored 0-10 on seven capabilities for three configurations: a standalone graph database, a standalone LLM, and an integrated system that uses the graph to ground the LLM's answers. The standalone graph scores highest on factual accuracy and explainability but cannot parse a free-text clinical question at all; the standalone LLM parses language fluently but scores worst on hallucination resistance; the integrated system inherits the graph's accuracy and the LLM's language fluency simultaneously, scoring at or near the top on nearly every dimension measured.

#### Diagram: Comparison: Graph DB vs LLM vs Integrated System

<iframe src="../../sims/comparison-graph-db-llm-integrated-system/main.html" height="484" width="100%" scrolling="no"></iframe>

[Run the Comparison: Graph DB vs LLM vs Integrated System MicroSim Fullscreen](../../sims/comparison-graph-db-llm-integrated-system/main.html){ .md-button }

<details markdown="1">
<summary>Comparison: Graph DB vs LLM vs Integrated System (reused)</summary>
Type: chart
**sim-id:** comparison-graph-db-llm-integrated-system<br/>
**Library:** Chart.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/comparison-graph-db-llm-integrated-system/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/comparison-graph-db-llm-integrated-system

Bloom Taxonomy: Evaluate<br/>
Bloom Taxonomy Verb: assess, justify<br/>
Learning objective: Given scored capability data for three system architectures, the learner can assess where a standalone approach falls short and justify why an integrated graph-plus-LLM architecture outperforms either technology alone.

Reused from the MicroSim catalog. A grouped bar chart scores a standalone graph database, a standalone LLM, and an integrated system across seven capabilities (factual accuracy, explainability, relationship reasoning, natural language understanding, hallucination resistance, and more) from a 500-question clinical QA benchmark. Hovering any bar reveals its exact score; the integrated system (green) reaches the top of nearly every dimension, the direct visual evidence for the worked comparison described above.
</details>

## Clinical Decision Support, Discovery, and Population Health Analytics

**Clinical decision support** (CDS) is any system that gives clinicians patient-specific assessments or recommendations at the point of care — everything from a simple drug-interaction popup to a graph-and-LLM system that drafts a full treatment rationale with citations. A **recommendation system** narrows this to the specific task of ranking candidate actions (medications, tests, referrals) by predicted appropriateness for a given patient. **Predictive analytics** is the broader practice of using historical patterns to forecast a future clinical event — the probability a patient will be readmitted, or will develop sepsis in the next six hours. **Risk stratification** applies predictive analytics to sort an entire patient population into tiers (low, medium, high risk) so that scarce clinical attention and outreach resources go to the patients who need them most — the single most direct link between this chapter's technology and the value-based care mission Sage mentioned earlier, since accurately finding the 5% of patients who will generate 50% of next year's cost is exactly what makes proactive, preventive care financially viable instead of a guessing game.

A widely used framework for designing effective clinical decision support is the "five rights": deliver the right information, to the right person, in the right format, through the right channel, at the right time in the workflow. Most CDS failures trace back to violating one of these five rights rather than to a technically wrong recommendation — a clinically correct alert that pops up after the prescription is already signed, or that buries a critical warning inside ten low-value ones, fails just as badly as an alert that is factually incorrect. That last failure mode has a name: **alert fatigue**, the well-documented tendency of clinicians to start reflexively dismissing alerts once a system fires too many low-value ones, which is precisely why the risk-scoring and context-filtering techniques introduced in this chapter (and expanded further in the CDS Hooks material later in this book) matter as much as the underlying model's raw accuracy.

A RAG-grounded CDS recommendation ties every concept in this chapter together into one pipeline. A clinician asks, "Is this anticoagulation dose appropriate given the patient's renal function and current medications?" The system embeds the question, retrieves the patient's current medication list and latest creatinine clearance from the graph (context graph), retrieves the relevant dosing guideline text from a vector store (semantic search), assembles both into a compact prompt (token efficiency), and only then asks the LLM to generate a recommendation with the specific guideline passage cited (retrieval-augmented generation) rather than free-associating from training data.

#### Diagram: RAG Architecture for Clinical Decision Support

<iframe src="../../sims/rag-architecture-clinical-decision-support/main.html" height="546" width="100%" scrolling="no"></iframe>

[Run the RAG Architecture for Clinical Decision Support MicroSim Fullscreen](../../sims/rag-architecture-clinical-decision-support/main.html){ .md-button }

<details markdown="1">
<summary>RAG Architecture for Clinical Decision Support (reused)</summary>
Type: workflow
**sim-id:** rag-architecture-clinical-decision-support<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/modeling-healthcare-data/sims/rag-architecture-clinical-decision-support/<br/>
**Source Repo:** https://github.com/dmccreary/modeling-healthcare-data/tree/main/docs/sims/rag-architecture-clinical-decision-support

Bloom Taxonomy: Understand<br/>
Bloom Taxonomy Verb: explain, summarize<br/>
Learning objective: Given the numbered stages of a retrieval-augmented generation pipeline, the learner can explain how a clinician's question moves through retrieval and generation phases to produce a cited, evidence-grounded recommendation.

Reused from the MicroSim catalog. An eight-step diagram traces a clinician's question through embedding, vector-store retrieval of guidelines and patient history, context assembly, LLM generation with citations, and a dashed feedback loop where clinician corrections improve future retrieval. Hovering any step reveals its function; the blue retrieval phase and green generation phase are shaded separately, mirroring the anticoagulation-dosing worked example above.
</details>

The same underlying technology, run over a whole patient panel instead of one patient at a time, produces **clinical discovery** — using graph and AI analytics across many patients' data to surface previously unrecognized patterns, such as an unexpected medication combination correlated with better outcomes for a specific condition — and **population health analytics** — aggregate reporting across a defined population to track quality measures, close care gaps, and monitor cost trends. Risk stratification is usually visualized as a pyramid: a large base of low-risk, generally healthy patients who need only routine preventive care; a middle band of rising-risk patients with one or two chronic conditions who benefit most from proactive outreach; and a small peak of high-risk, high-cost patients who need intensive case management. In a typical Medicare population, the top 5% of patients by predicted risk account for roughly half of total annual spending, which is exactly why an accurate risk-stratification model pays for itself many times over — every high-risk patient correctly identified and enrolled in proactive case management before a preventable hospitalization is money saved and, more importantly, a hospitalization avoided.

Consider a population health worked example: a payer's graph holds 40,000 diabetic patients. A single aggregate traversal query counts, for every patient with an HbA1c lab result in the last twelve months, how many have a result under the 7% control threshold — returning, say, 26,000 of 40,000, a 65% control rate. Layering risk stratification onto that same query subdivides the answer further: of the 14,000 patients not in control, the model might flag 2,100 as high-risk based on trend direction, medication non-adherence signals, and missed appointments — exactly the list a care management team would work first. That single pair of numbers, computed once across the whole population, is what drives the population-level dashboards, quality bonus payments, and care-gap outreach lists that make value-based contracts measurable in the first place.

!!! mascot-warning "Don't Let an Ungrounded LLM Freelance on Patient Care"
    ![Sage raising a cautious arm](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap: asking an LLM a clinical question directly, with no retrieval step at all. Without grounding, the model can produce a fluent, confident-sounding answer that is simply wrong — a hallucination. The fix is always the same: retrieve real facts from the graph or vector store first, and never let the model answer from memory alone when a patient's safety is on the line.

## Chapter Summary

!!! mascot-celebration "You Can Now Explain How AI and Graphs Work Together"
    ![Sage celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    Look at everything you just connected: AI and machine learning's family tree, how LLMs and prompt engineering work, vector stores and semantic search with real cosine-similarity math, and how knowledge graphs ground LLMs into trustworthy clinical decision support. That's a genuinely big chapter, handled.

This chapter built the vocabulary for the AI layer that increasingly sits on top of the graphs modeled throughout this book: artificial intelligence and its machine learning subfields, large language models and the discipline of prompting them well, vector stores and the semantic search they enable, and the knowledge graphs that ground those language models in verifiable fact. The recurring lesson is that graphs and LLMs solve different problems — deterministic memory versus fluent language — and are strongest paired together, as retrieval-augmented generation, clinical decision support, and population health analytics all demonstrate. The next chapter turns a more critical eye on these same technologies, examining how to evaluate, govern, and responsibly deploy AI systems in a clinical setting. Continue to [Chapter 21: Responsible AI and Agentic Systems](../21-responsible-ai-and-agentic-systems/index.md).
