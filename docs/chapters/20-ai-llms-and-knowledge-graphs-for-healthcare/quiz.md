# Quiz: AI, LLMs, and Knowledge Graphs for Healthcare

Test your understanding of AI, LLMs, and knowledge graphs for healthcare with these review questions.

---

#### 1. What is supervised learning?

<div class="upper-alpha" markdown>
1. Training a model on examples that already carry the correct answer, such as historical discharge records labeled with readmission outcome
2. Giving a model unlabeled data and asking it to find structure on its own
3. A hand-authored rule that fires based on an explicit clinical threshold
4. A neural network trained to predict the next token in a sequence
</div>

??? question "Show Answer"
    The correct answer is **A**. Supervised learning trains a model on labeled examples, such as past hospital stays labeled with readmission outcomes, to predict outcomes for new cases. Option B describes unsupervised learning. Option C describes a rule-based expert system, a form of AI that is not machine learning at all. Option D describes a large language model's training objective.

    **Concept Tested:** Supervised Learning

---

#### 2. What is a vector embedding?

<div class="upper-alpha" markdown>
1. A stored edge connecting two nodes with a type label
2. A fixed price list assigning a standard charge to a billable service
3. A list of numbers produced by a machine learning model such that texts, images, or concepts with similar meaning are mapped to numerically similar vectors
4. A formal ontology binding node labels to a controlled vocabulary
</div>

??? question "Show Answer"
    The correct answer is **C**. A vector embedding is a numeric representation, typically hundreds or thousands of dimensions, that places semantically similar content close together in vector space. Option A describes a graph edge, an unrelated structure. Option B describes a charge master from Chapter 16. Option D describes the vocabulary layer that makes a graph a knowledge graph.

    **Concept Tested:** Vector Embedding

---

#### 3. Why are knowledge graphs and large language models described as complementary rather than competing technologies?

<div class="upper-alpha" markdown>
1. Because a knowledge graph can generate fluent natural language on its own, making an LLM unnecessary
2. Because an LLM is brilliant at language but has no reliable memory of specific patients, while a knowledge graph has precise memory but cannot hold a conversation, so pairing them combines each one's strength
3. Because LLMs and knowledge graphs both store exactly the same kind of information
4. Because knowledge graphs are always more accurate than LLMs at every possible task
</div>

??? question "Show Answer"
    The correct answer is **B**. An LLM excels at language but lacks reliable memory of specific facts, while a knowledge graph holds precise facts but cannot converse fluently, so combining them plays to each technology's strength. Option A incorrectly claims knowledge graphs can replace LLM language capability. Option C contradicts the fundamentally different nature of statistical versus deterministic systems. Option D overstates knowledge graphs' capability beyond what the chapter claims.

    **Concept Tested:** Graph And LLM Integration

---

#### 4. How does a context graph differ from an enterprise knowledge graph?

<div class="upper-alpha" markdown>
1. A context graph is always larger in scope than an enterprise knowledge graph
2. An enterprise knowledge graph is assembled fresh for a single query and then discarded
3. Both terms describe the exact same scope of data
4. A context graph is a small, task-specific subgraph assembled on demand for one query and then discarded, while an enterprise knowledge graph is a persistent, organization-wide graph integrating data across many systems
</div>

??? question "Show Answer"
    The correct answer is **D**. A context graph is a small, disposable subgraph built for a single request, while an enterprise knowledge graph is a persistent, organization-wide integration layer spanning many source systems. Option A reverses the actual scope relationship. Option B describes a context graph's lifecycle, not an enterprise knowledge graph's. Option C contradicts the chapter's explicit distinction between the two scales.

    **Concept Tested:** Context Graph

---

#### 5. A clinician's question could be answered either by pasting a patient's entire 42,000-token record into a prompt, or by querying the graph for just the relevant ALLERGIC_TO edges, returning 40 tokens. What does this comparison illustrate?

<div class="upper-alpha" markdown>
1. Token efficiency: retrieving only the specific graph facts a query needs is far cheaper and less distracting to the model than including an entire irrelevant record
2. That vector stores are always faster than graph databases for every possible task
3. That LLMs cannot process any prompt larger than 100 tokens under any circumstances
4. That an enterprise knowledge graph is required before any prompt can be constructed
</div>

??? question "Show Answer"
    The correct answer is **A**. Retrieving only the 40 tokens actually needed, instead of pasting an entire 42,000-token record, is roughly 1,000 times smaller, cheaper, and less likely to distract the model, exactly what token efficiency means in practice. Option B makes an unsupported blanket claim about vector stores versus graph databases. Option C fabricates an arbitrary token limit not stated in the chapter. Option D fabricates an unrelated dependency on an enterprise knowledge graph.

    **Concept Tested:** Token Efficiency

---

#### 6. Using the worked example where "chest pain" embeds to (0.9, 0.2) and "acute coronary syndrome" embeds to (0.85, 0.3), the resulting cosine similarity is approximately 0.99. What does this indicate?

<div class="upper-alpha" markdown>
1. The two phrases share no words and therefore have no computable similarity
2. The two vectors point in nearly opposite directions
3. The two phrases have nearly identical meaning in the embedding space, even though they share no words
4. The similarity score is invalid because it exceeds a value of 1.0
</div>

??? question "Show Answer"
    The correct answer is **C**. A cosine similarity near 1.0 indicates the two vectors point in nearly the same direction, meaning the two phrases are recognized as having nearly identical meaning in the embedding space despite sharing no words. Option A incorrectly claims no similarity can be computed. Option B describes the opposite of what a similarity near 1.0 means. Option D misunderstands cosine similarity's valid range, which extends up to exactly 1.0.

    **Concept Tested:** Semantic Search

---

#### 7. In a RAG-grounded clinical decision support pipeline, a system retrieves a patient's current medications and creatinine clearance from the graph, retrieves relevant dosing guideline text from a vector store, assembles both into a compact prompt, and then asks the LLM to generate a recommendation. Which step corresponds to retrieval-augmented generation itself?

<div class="upper-alpha" markdown>
1. Only the initial embedding of the clinician's question
2. Combining the retrieved graph and vector-store facts into the prompt before asking the LLM to generate its answer using those facts
3. Only the step where the LLM produces its final answer, regardless of what was retrieved
4. Only the step where the patient's medication list is stored in the graph
</div>

??? question "Show Answer"
    The correct answer is **B**. Retrieval-augmented generation is specifically the technique of inserting retrieved facts into the prompt and only then asking the LLM to generate its answer grounded in those facts. Option A isolates only the embedding step, which alone is not RAG. Option C ignores the retrieval half of the pipeline entirely. Option D describes ordinary data storage, not the generation step RAG depends on.

    **Concept Tested:** Retrieval-Augmented Generation

---

#### 8. Why can a clinically correct alert still be considered a CDS failure under the "five rights" framework?

<div class="upper-alpha" markdown>
1. Because the five rights framework only evaluates whether a recommendation is medically accurate
2. Because generating a clinically correct alert is always technically impossible
3. Because alert fatigue only occurs when a recommendation is factually wrong
4. Because an alert that pops up after a prescription is already signed, or that buries a critical warning among many low-value ones, fails to deliver the right information at the right time or in the right format, regardless of its clinical accuracy
</div>

??? question "Show Answer"
    The correct answer is **D**. The five rights framework evaluates timing, format, channel, and recipient alongside content, so a factually correct alert delivered too late or buried among low-value alerts still fails. Option A contradicts the framework's broader scope beyond mere accuracy. Option B is factually false. Option C contradicts the chapter's description of alert fatigue arising from volume, not accuracy alone.

    **Concept Tested:** Clinical Decision Support

---

#### 9. Why can a care coordinator answer "which of my high-risk patients filled fewer than half their prescribed statin refills last quarter?" using an enterprise knowledge graph when no single source system could answer it alone?

<div class="upper-alpha" markdown>
1. Because the EKG resolves the same person's separate EHR, claims, and pharmacy identifiers to one canonical patient node, letting a single traversal span clinical, claims, and pharmacy data simultaneously
2. Because the EKG deletes all data from the individual source systems once it is built
3. Because the EKG only stores pharmacy data, which happens to make this specific question trivial
4. Because a context graph must be built before an enterprise knowledge graph can be queried at all
</div>

??? question "Show Answer"
    The correct answer is **A**. By resolving separate EHR, claims, and pharmacy identifiers to a single canonical patient node, the enterprise knowledge graph lets one traversal span data that would otherwise remain siloed across three separate systems. Option B fabricates a destructive behavior that contradicts the EKG's integration purpose. Option C incorrectly limits the EKG's scope to only one data source. Option D reverses the actual relationship between context graphs and enterprise knowledge graphs.

    **Concept Tested:** Enterprise Knowledge Graph

---

#### 10. A health system is deciding whether to deploy a standalone LLM, a standalone graph database, or an integrated graph-plus-LLM system for clinical question answering. Based on the chapter's benchmark comparison, which choice is best justified, and why?

<div class="upper-alpha" markdown>
1. The standalone LLM alone, because it scores highest on hallucination resistance
2. The standalone graph database alone, because it can fluently parse any free-text clinical question
3. The integrated system, because it inherits the graph's factual accuracy and explainability alongside the LLM's natural-language fluency, scoring at or near the top across nearly every measured capability
4. Neither technology, since combining them always produces worse results than either alone
</div>

??? question "Show Answer"
    The correct answer is **C**. The benchmark comparison showed the integrated system inheriting the graph's accuracy and the LLM's fluency simultaneously, scoring at or near the top on nearly every dimension measured. Option A contradicts the benchmark, which showed the standalone LLM scoring worst on hallucination resistance. Option B contradicts the chapter's point that a standalone graph cannot parse free text at all. Option D directly contradicts the benchmark's central finding.

    **Concept Tested:** Graph And LLM Integration

---
