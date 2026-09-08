# Quiz: Responsible AI and Agentic Systems

Test your understanding of responsible AI and agentic systems with these review questions.

---

#### 1. What is fine-tuning?

<div class="upper-alpha" markdown>
1. Training a brand-new model entirely from scratch on millions of clinical examples
2. Continuing to train an existing, general-purpose model on a smaller, task-specific dataset so it specializes without needing millions of clinical examples
3. Manually writing decision rules for a rule-based expert system
4. Recomputing a model's AUROC on a rolling window of recent outcomes
</div>

??? question "Show Answer"
    The correct answer is **B**. Fine-tuning continues training an existing general-purpose model on a smaller, task-specific dataset, letting it specialize at a fraction of the cost of training from scratch. Option A describes training from scratch, the alternative fine-tuning avoids. Option C describes an expert system, a non-learning form of AI. Option D describes model drift monitoring, an unrelated evaluation activity.

    **Concept Tested:** Fine-Tuning

---

#### 2. How does a chatbot interface differ from conversational AI?

<div class="upper-alpha" markdown>
1. They are two names for the identical capability
2. A chatbot interface maintains multi-turn context and understands follow-up questions, while conversational AI is only the visual chat window
3. Conversational AI can only operate without any chatbot interface present at all
4. A chatbot interface is simply the conversational front end a user types into, while conversational AI is the broader capability of maintaining context and producing coherent responses across multiple turns
</div>

??? question "Show Answer"
    The correct answer is **D**. A chatbot interface is the front-end chat window itself, while conversational AI is the underlying capability of maintaining dialogue context and producing coherent multi-turn responses. Option A ignores this explicit distinction. Option B reverses which term describes the interface versus the underlying capability. Option C fabricates an implausible operational restriction.

    **Concept Tested:** Chatbot Interface

---

#### 3. Why might sensitivity matter more than raw accuracy when evaluating a sepsis screening model?

<div class="upper-alpha" markdown>
1. Because a model that predicts "no sepsis" for every patient can score high accuracy when sepsis is rare, while sensitivity specifically measures the fraction of true sepsis cases actually caught
2. Because sensitivity and accuracy always produce identical values regardless of class balance
3. Because AUROC cannot be computed for any screening model
4. Because raw accuracy is undefined whenever a training dataset contains fewer than one million records
</div>

??? question "Show Answer"
    The correct answer is **A**. In an imbalanced screening context, a model can score high accuracy by always predicting the majority outcome, so sensitivity, which measures true positive capture, is the more meaningful metric. Option B contradicts the chapter's own example showing the two metrics diverging. Option C is false since AUROC is explicitly discussed for screening models. Option D fabricates an arbitrary dataset-size restriction.

    **Concept Tested:** Model Evaluation Metric

---

#### 4. A hospital's average daily count of a rarely billed procedure is 2, with a standard deviation of 1. A day records 9 such procedures. What z-score would an anomaly scoring model compute, and would it likely trigger review?

<div class="upper-alpha" markdown>
1. A z-score of 2, unlikely to trigger review
2. A z-score of 4.5, borderline for review
3. A z-score of 7, extreme enough that most anomaly scoring models would flag it automatically
4. A z-score of 9, but anomaly scoring models cannot process values above 5
</div>

??? question "Show Answer"
    The correct answer is **C**. The z-score is (9 − 2) ÷ 1 = 7, seven standard deviations above normal, extreme enough that most anomaly scoring models would flag it automatically. Option A and B both apply an incorrect calculation. Option D fabricates an arbitrary processing limit that does not exist.

    **Concept Tested:** Anomaly Scoring Model

---

#### 5. A clinical note reads "denies chest pain." A clinical NLP pipeline extracts a SYMPTOM: chest pain entity as present rather than absent. What pipeline failure does this illustrate, and where does the fix belong?

<div class="upper-alpha" markdown>
1. A named entity recognition failure that can only be fixed by removing NER from the pipeline entirely
2. A negation-detection failure; dedicated negation-detection logic, typically placed between named entity recognition and text classification, is needed to correctly mark the entity as absent rather than present
3. A sentiment analysis failure that has no standard mitigation
4. A model drift failure caused by a change in lab vendor
</div>

??? question "Show Answer"
    The correct answer is **B**. This is a negation-detection failure; because negation is pervasive in clinical text, dedicated negation-detection logic sitting between NER and text classification is a standard pipeline stage to correctly mark the entity as absent. Option A incorrectly suggests removing NER rather than adding negation logic. Option C misattributes the failure to an unrelated pipeline stage. Option D confuses this text-processing failure with an unrelated model-monitoring concept.

    **Concept Tested:** Clinical NLP Pipeline

---

#### 6. Why did the 2019 commercial algorithm assign lower risk scores to Black patients than to equally sick white patients?

<div class="upper-alpha" markdown>
1. Because the model was intentionally programmed with explicit racial criteria
2. Because the training dataset contained no data on any patients at all
3. Because the model used named entity recognition instead of a numeric risk score
4. Because the model was trained to predict healthcare cost rather than healthcare need, and historical spending patterns reflected unequal access to care rather than unequal illness
</div>

??? question "Show Answer"
    The correct answer is **D**. The model was trained to predict cost, and because historical spending patterns reflected unequal access to care rather than unequal illness, the resulting scores systematically underrated need for Black patients, even without any intentional design flaw. Option A contradicts the chapter's explicit statement that the bias was unintentional. Option B and C fabricate unrelated technical causes not described in the chapter.

    **Concept Tested:** Model Bias

---

#### 7. Why can a deployed readmission model quietly become less accurate after a hospital changes its discharge-planning protocol, even though nothing about the model's code changed?

<div class="upper-alpha" markdown>
1. Because model drift often originates outside the model itself, from a shift in the real-world data distribution the model was never retrained on, not from a bug in the model's code
2. Because AUROC can only ever be computed once, at the moment a model is first deployed
3. Because feature engineering automatically reverses itself after six months in production
4. Because fine-tuning must be repeated every time a hospital changes any operational policy
</div>

??? question "Show Answer"
    The correct answer is **A**. Model drift commonly originates from a real-world data distribution shift, such as a changed protocol or a lab vendor update, that the model was never retrained to handle, not from any defect in the model's code. Option B contradicts the chapter's rolling-window monitoring example. Option C and D fabricate mechanisms that do not describe how drift actually arises.

    **Concept Tested:** Model Drift Detection

---

#### 8. Why does dividing a complex clinical task across several specialized agents tend to produce more reliable behavior than one generalist agent attempting the entire task alone?

<div class="upper-alpha" markdown>
1. Because a multi-agent system eliminates the need for any human-in-the-loop review
2. Because specialized agents never need to communicate with one another
3. Because narrower responsibility per agent, such as one agent for graph querying and a separate one for safety review, mirrors good human team design and tends to produce more reliable behavior than one agent trying to do everything
4. Because a single generalist agent can never be given access to any tools
</div>

??? question "Show Answer"
    The correct answer is **C**. Narrower responsibility per agent mirrors good human team design, and the chapter's example splits query, guideline-checking, and safety-review roles across separate agents for exactly this reason. Option A contradicts the chapter's explicit inclusion of human-in-the-loop review even in multi-agent systems. Option B contradicts the chapter's description of agents communicating to solve a shared task. Option D contradicts the tool-using agent concept defined earlier in the chapter.

    **Concept Tested:** Multi-Agent System

---

#### 9. An audit finds a readmission-risk model correctly flags 82% of high-risk patients in the majority group but only 61% in a minority subgroup. Which mitigation strategy offers the most durable fix, even though it takes longer to implement, and why?

<div class="upper-alpha" markdown>
1. Subgroup-specific thresholds, because they are the easiest strategy to implement immediately
2. Rebalancing the training data so the model sees minority-group examples proportionally, because it addresses the underlying data representation problem rather than papering over its symptom
3. Ignoring the gap entirely, since the model's overall accuracy remains above 90%
4. Deleting the model and replacing it with a hand-authored rule engine, since rule engines cannot exhibit bias
</div>

??? question "Show Answer"
    The correct answer is **B**. Rebalancing training data takes longer to collect but addresses the underlying representation problem directly, unlike subgroup-specific thresholds, which the chapter describes as a bandage over the underlying data problem. Option A correctly identifies the easiest strategy but not the most durable one. Option C ignores the subgroup-level failure the aggregate accuracy number conceals. Option D fabricates a false claim that rule engines are immune to bias.

    **Concept Tested:** Model Bias

---

#### 10. A health system wants to deploy a tool-using agent that can both recommend and directly write medication-dose changes to a patient's record. Which design best follows the chapter's governance principle for agentic systems that can take action?

<div class="upper-alpha" markdown>
1. Let the agent write directly to the record whenever its confidence score exceeds 90%, with no human review at any confidence level
2. Disable all agentic tool-calling entirely and revert to a purely conversational chatbot interface with no tools at all
3. Allow the agent to act autonomously on every task except reading data, since only write actions carry any risk
4. Design the agent to recommend a dose change and route it through a human-in-the-loop checkpoint for a qualified clinician to confirm before the action executes, since the action could affect patient safety
</div>

??? question "Show Answer"
    The correct answer is **D**. The chapter's governance principle is that a tool-using agent should recommend, and a qualified human should confirm, whenever an action could affect patient safety, exactly the checkpoint this design inserts before the dose change executes. Option A contradicts this principle by allowing autonomous action based on confidence alone. Option B overcorrects by eliminating useful tool-calling capability entirely. Option C incorrectly assumes read actions carry no risk worth considering.

    **Concept Tested:** Human-In-The-Loop Review

---
