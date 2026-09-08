# Quiz: Capstone Projects and Career Development

Test your understanding of capstone projects and career development with these review questions.

---

#### 1. What is project scoping?

<div class="upper-alpha" markdown>
1. The process of deliberately narrowing an ambitious idea into a specific, achievable set of deliverables with clear boundaries around what is included and excluded
2. A structured practice of having classmates examine a project before submission
3. A published set of criteria and scoring levels used to evaluate a project
4. The smallest possible piece of work that answers one specific feasibility question
</div>

??? question "Show Answer"
    The correct answer is **A**. Project scoping narrows an ambitious idea into a specific, achievable set of deliverables, naming the data, the technique, and a concrete output. Option B describes a peer review process. Option C describes a capstone rubric. Option D describes a proof of concept.

    **Concept Tested:** Project Scoping

---

#### 2. How does a proof of concept differ from prototype development?

<div class="upper-alpha" markdown>
1. A proof of concept is a full, production-grade deployment, while prototype development is a single feasibility test
2. They are two names for the identical stage of building a project
3. A proof of concept answers one specific feasibility question with no concern for polish or completeness, while prototype development builds a more complete, though still simplified, working version demonstrating the end-to-end user flow
4. A proof of concept can only be built after a technical demonstration has already been presented
</div>

??? question "Show Answer"
    The correct answer is **C**. A proof of concept answers a narrow feasibility question with no polish required, while prototype development builds a more complete version demonstrating the full user-facing flow. Option A reverses the actual scope of each stage. Option B contradicts the chapter's explicit distinction. Option D reverses the correct build sequence, since a technical demonstration comes last.

    **Concept Tested:** Proof Of Concept

---

#### 3. What is the key difference between a capstone prototype and a healthcare analytics platform?

<div class="upper-alpha" markdown>
1. A capstone prototype requires more concurrent users and formal service-level agreements than a healthcare analytics platform
2. A capstone prototype demonstrates the architecture on a bounded scale, while a healthcare analytics platform is the hardened, scaled, production version supporting many concurrent users and continuous data refresh
3. They are identical in scope and purpose, differing only in name
4. A healthcare analytics platform is always built before any prototype exists
</div>

??? question "Show Answer"
    The correct answer is **B**. A prototype demonstrates the architecture at a bounded, presentation scale, while a healthcare analytics platform is the hardened, production-grade version meant for ongoing real use. Option A reverses which one requires production-scale infrastructure. Option C contradicts the chapter's explicit distinction. Option D reverses the natural build order, since a prototype typically precedes a full platform.

    **Concept Tested:** Healthcare Analytics Platform

---

#### 4. In the fraud-detection scoping example, the ambitious idea "detect healthcare fraud using graphs" was narrowed to a synthetic 500-provider dataset with community detection producing a ranked list of the ten most suspicious clusters. What was explicitly excluded from this scope?

<div class="upper-alpha" markdown>
1. The graph data model itself
2. The community detection algorithm
3. Any written justification for the results
4. A production fraud-detection pipeline, integration with real payer data feeds, and implementation of every fraud pattern from Chapter 18
</div>

??? question "Show Answer"
    The correct answer is **D**. The scoped-down version explicitly excludes building a production pipeline, integrating real payer feeds, and implementing every fraud pattern, focusing instead on demonstrating the core technique on a bounded dataset. Option A, B, and C each name a component the scoped example explicitly retains, not one it excludes.

    **Concept Tested:** Project Scoping

---

#### 5. A capstone risk register flags "the graph database's community detection algorithm takes too long to run on the full dataset during a live demo" as a medium-likelihood, medium-impact risk. Which mitigation correctly addresses this specific risk?

<div class="upper-alpha" markdown>
1. Pre-compute results and cache them, demonstrating live only on a smaller subgraph
2. Write down explicit exclusions during the scoping phase
3. Generate and validate additional synthetic data before building the analysis
4. Request an industry certification before continuing the project
</div>

??? question "Show Answer"
    The correct answer is **A**. Pre-computing and caching results, then demonstrating live only on a smaller subgraph, directly addresses the specific risk of a slow algorithm during a live demo. Option B addresses a different risk, scope creep. Option C addresses a different risk, sparse synthetic data. Option D is unrelated to the technical performance risk described.

    **Concept Tested:** Project Risk Assessment

---

#### 6. Why is "improve diabetes care using graphs" not an adequate project scope, while "build a graph model connecting diabetic patients to medication adherence and care-gap status, using a shortest-path query to identify the three most under-utilized preventive care pathways" is?

<div class="upper-alpha" markdown>
1. Because the first version uses fewer words than the second
2. Because scope quality is determined entirely by which chapter of the book a project cites
3. Because the second version names the specific data, technique, and a concrete, checkable output, while the first names only an aspirational goal with no boundaries around what is included or excluded
4. Because the first version is technically infeasible under any circumstances
</div>

??? question "Show Answer"
    The correct answer is **C**. A real scope names specific data, a specific technique, and a checkable output, exactly what distinguishes the second version from the first's vague aspiration. Option A judges scope quality by an irrelevant surface feature. Option B fabricates an unrelated citation requirement. Option D overstates the first version's problem as infeasibility rather than vagueness.

    **Concept Tested:** Project Scoping

---

#### 7. Why does including a case study analysis of a real, published example strengthen a capstone presentation?

<div class="upper-alpha" markdown>
1. Because it replaces the need for a working prototype entirely
2. Because it situates the project within a broader, credible context rather than presenting it as an isolated classroom exercise, showing the approach is grounded in established practice
3. Because a case study analysis is required exclusively by the capstone rubric's technical execution dimension
4. Because citing a real example guarantees the presenter's own results will be more accurate
</div>

??? question "Show Answer"
    The correct answer is **B**. Citing a real, published example situates a capstone project within established practice, giving the audience credible context beyond an isolated classroom exercise. Option A incorrectly claims it substitutes for a working prototype. Option C fabricates an exclusive rubric-dimension requirement. Option D makes an unsupported accuracy claim unrelated to the case study's actual purpose.

    **Concept Tested:** Case Study Analysis

---

#### 8. Why do most employers weigh a strong capstone portfolio project more heavily than an industry certification alone?

<div class="upper-alpha" markdown>
1. Because certifications are never relevant to any technical hiring decision
2. Because portfolio projects are always cheaper to produce than certifications
3. Because certifications guarantee a higher salary regardless of portfolio quality
4. Because a certification proves a candidate passed a test, while a capstone project proves the candidate can actually build something, a distinction employers weigh heavily
</div>

??? question "Show Answer"
    The correct answer is **D**. A certification demonstrates passing a standardized test, while a capstone project demonstrates the ability to actually build something, which employers generally weigh more heavily. Option A overstates certifications' irrelevance, when the chapter says they can still supplement a portfolio. Option B and C both fabricate unsupported cost and salary claims.

    **Concept Tested:** Industry Certification

---

#### 9. Which combination of capstone choices would most convincingly satisfy all four capstone rubric dimensions (Data Modeling, Technical Execution, Governance, Communication) at once?

<div class="upper-alpha" markdown>
1. A graph schema reflecting real clinical relationships, working queries and algorithms run against the data, an explicit discussion of access control and lineage, and a presentation a non-technical stakeholder can follow
2. A highly complex graph schema that only the original author can understand, with no presentation prepared at all
3. A working technical demonstration with no data modeling or governance discussion included
4. A polished presentation slide deck with no working queries or algorithms behind it
</div>

??? question "Show Answer"
    The correct answer is **A**. This combination directly addresses all four rubric dimensions at once: schema fidelity, working execution, governance awareness, and clear communication. Option B satisfies data modeling only in a way that fails communication entirely. Option C omits both data modeling and governance. Option D omits technical execution entirely, leaving only communication.

    **Concept Tested:** Capstone Rubric

---

#### 10. An ambitious idea is "use graphs to fix healthcare fraud." Which of the following best represents a properly scoped capstone deliverable derived from this idea?

<div class="upper-alpha" markdown>
1. "Detect all forms of healthcare fraud across every payer in the country using a fully automated production system."
2. "Read about healthcare fraud and summarize what other people have written on the topic."
3. "Build a graph of 500 synthetic providers and patients, apply community detection to surface unusually dense referral clusters, and produce a ranked list of the ten most suspicious clusters with written justification."
4. "Build a graph database and wait to see what patterns emerge without defining any specific technique or deliverable in advance."
</div>

??? question "Show Answer"
    The correct answer is **C**. This option names the specific data, the specific technique, and a concrete, checkable output, exactly the properly scoped pattern the chapter's worked example demonstrates. Option A remains unbounded in scale and ambition, exactly the failure mode scoping is meant to avoid. Option B contains no graph modeling or technique at all. Option D defines no specific technique or deliverable in advance, leaving the scope entirely open-ended.

    **Concept Tested:** Project Scoping

---
