# Quiz: FHIR Resources and Levels of Knowledge Representation

Test your understanding of FHIR resources and levels of knowledge representation with these review questions.

---

#### 1. What is a FHIR resource?

<div class="upper-alpha" markdown>
1. A compiled rule ready to run inside one specific EHR vendor's CDS engine
2. A published PDF containing clinical guideline prose
3. A self-contained, typed unit of clinical or administrative data, such as a patient or a diagnosis, represented as structured JSON or XML with a defined set of fields
4. A decision table organizing clinical knowledge into rows and columns
</div>

??? question "Show Answer"
    The correct answer is **C**. A FHIR resource is a self-contained, typed unit of clinical or administrative data, carrying a resourceType field, a unique id, and typically a subject reference to the patient it concerns. Option A describes Executable-level knowledge. Option B describes Narrative-level knowledge. Option D describes Semi-Structured-level knowledge.

    **Concept Tested:** FHIR Resource

---

#### 2. What characterizes the Narrative Level of knowledge representation?

<div class="upper-alpha" markdown>
1. Clinical guidelines expressed as plain narrative text, readable by any clinician but requiring a human to interpret before a computer system can act on it
2. Knowledge compiled directly for one specific CDS engine to run automatically
3. Knowledge expressed using standard terminologies such as SNOMED CT and LOINC codes
4. Knowledge organized into flowcharts and decision tables by clinical experts
</div>

??? question "Show Answer"
    The correct answer is **A**. The Narrative Level expresses guidelines as plain prose, authored by guideline developers without specialized computing expertise, but requiring human interpretation before any system can act on it. Option B describes the Executable Level. Option C describes the Structured Level. Option D describes the Semi-Structured Level.

    **Concept Tested:** Narrative Level

---

#### 3. How does a PlanDefinition resource relate to an ActivityDefinition resource?

<div class="upper-alpha" markdown>
1. They are two names for the identical FHIR resource type
2. An ActivityDefinition triggers a PlanDefinition whenever a patient's data changes
3. A PlanDefinition can only reference exactly one ActivityDefinition, and no ActivityDefinition can ever be reused
4. A PlanDefinition represents the reusable trigger-and-condition logic of a guideline, and when its criteria are satisfied it instantiates a referenced, independently reusable ActivityDefinition as a patient-specific action
</div>

??? question "Show Answer"
    The correct answer is **D**. A PlanDefinition holds the reusable trigger criteria, and satisfying those criteria instantiates a referenced ActivityDefinition, which is itself independently reusable across many different PlanDefinitions. Option A contradicts their distinct roles. Option B reverses which resource triggers which. Option C fabricates restrictions on referencing and reuse that do not exist.

    **Concept Tested:** PlanDefinition Resource

---

#### 4. What distinguishes the Structured Level from the Executable Level of knowledge representation?

<div class="upper-alpha" markdown>
1. Structured Level knowledge is compiled for one specific platform's runtime, while Executable Level knowledge remains platform-neutral
2. Structured Level knowledge is computer-interpretable using standard coded terminologies but remains platform-neutral, while Executable Level knowledge is compiled and coded directly for one specific CDS system to run without further translation
3. Structured and Executable Level are identical in every respect
4. Structured Level applies only to Data Tier content, while Executable Level applies only to Logic Tier content
</div>

??? question "Show Answer"
    The correct answer is **B**. Structured-level knowledge is platform-neutral and parseable by any conformant system, while Executable-level knowledge is compiled for a specific platform's runtime with no ambiguity left. Option A reverses which level is platform-neutral. Option C contradicts the chapter's explicit warning against confusing the two. Option D fabricates a restriction to specific tiers that neither level actually has.

    **Concept Tested:** Structured Level

---

#### 5. A Condition resource's verificationStatus field is set to "provisional" rather than "confirmed." What should a well-designed clinical decision support implementation do differently for this resource?

<div class="upper-alpha" markdown>
1. Treat it identically to a confirmed diagnosis, since the code field is the only field that matters
2. Delete the resource entirely, since a provisional diagnosis has no clinical value
3. Avoid triggering the same downstream clinical decision support logic that a confirmed diagnosis would trigger, since a naive implementation reading only the code field would miss this distinction
4. Automatically change the verificationStatus to confirmed after 24 hours
</div>

??? question "Show Answer"
    The correct answer is **C**. A provisional Condition should generally not trigger the same downstream logic as a confirmed one, a distinction the chapter explicitly warns is easy to miss if an implementation reads only the code field. Option A contradicts this exact warning. Option B discards clinically meaningful information. Option D fabricates an automatic status change that does not reflect real clinical workflow.

    **Concept Tested:** Condition Resource

---

#### 6. A guideline knowledge artifact is organized as a decision table with a row reading "IF LDL > 190 AND no statin allergy THEN recommend high-intensity statin," authored by a clinical expert but not yet bound to specific codes. At which Knowledge Representation Level does this artifact sit?

<div class="upper-alpha" markdown>
1. Semi-Structured Level
2. Narrative Level
3. Structured Level
4. Executable Level
</div>

??? question "Show Answer"
    The correct answer is **A**. A decision table arranged into rows and columns, still authored by a clinical expert without binding to specific codes, is exactly the Semi-Structured Level example the chapter describes. Option B is too unstructured, since prose paragraphs, not tables, define the Narrative Level. Option C requires binding to standard terminology codes, which this artifact lacks. Option D requires full compilation for a specific runtime, far beyond a decision table.

    **Concept Tested:** Semi-Structured Level

---

#### 7. A health system wants to catch every newly eligible patient for diabetes screening even if no specific workflow event ever occurs for them, at the cost of continuous computing resources. Which PlanDefinition trigger type fits this requirement?

<div class="upper-alpha" markdown>
1. A named-event trigger tied to "medication-order-select"
2. A trigger that only fires when a Patient resource is first created
3. A trigger that only fires when a CarePlan resource is deleted
4. A periodic trigger that runs on a schedule, such as nightly, to sweep an entire patient panel for anyone newly eligible
</div>

??? question "Show Answer"
    The correct answer is **D**. A periodic trigger proactively sweeps the entire patient panel on a schedule, finding newly eligible patients even without a specific workflow event, at the cost of continuous computing resources. Option A only fires at a specific workflow moment, missing patients between such events. Option B and C describe unrelated, narrowly scoped trigger conditions that do not provide proactive panel-wide screening.

    **Concept Tested:** PlanDefinition Resource

---

#### 8. Why can several production graph databases ingest FHIR Bundles directly, mapping each resource to a node and each reference field to an edge, with no intermediate transformation step required?

<div class="upper-alpha" markdown>
1. Because FHIR Bundles are stored exclusively in a proprietary graph-only file format
2. Because a reference field in a FHIR resource is structurally the same idea as an edge in a labeled property graph, just expressed as a JSON pointer instead of a drawn arrow
3. Because FHIR resources never contain any relationships between one another
4. Because graph databases automatically convert all XML documents into narrative-level text before processing
</div>

??? question "Show Answer"
    The correct answer is **B**. A FHIR reference field, such as a Condition's subject pointing to a Patient, is structurally identical to a graph edge, just written as a JSON pointer, which is why Bundles map directly to nodes and edges. Option A fabricates a proprietary format that does not exist; FHIR uses ordinary JSON or XML. Option C directly contradicts the chapter's Bundle example, full of cross-references. Option D fabricates an unrelated and implausible conversion process.

    **Concept Tested:** FHIR Resource

---

#### 9. Why does the pool of people qualified to author clinical knowledge shrink at each successive Knowledge Representation Level from Narrative to Executable?

<div class="upper-alpha" markdown>
1. Because computability decreases at each successive level, requiring progressively fewer skills
2. Because Narrative Level knowledge requires more specialized skill than Executable Level knowledge
3. Because each successive level demands additional specialized expertise, from clinical knowledge alone at the Narrative level to platform-specific development skill at the Executable level, on top of the expertise the previous level already required
4. Because only knowledge engineers are legally permitted to write Narrative Level guidelines
</div>

??? question "Show Answer"
    The correct answer is **C**. Computability increases while the required skill set compounds at each level, from pure clinical expertise at the Narrative level to coding-system fluency at the Structured level to platform-specific development skill at the Executable level. Option A reverses the actual relationship between computability and level. Option B reverses which level requires more specialized skill. Option D fabricates a legal restriction that does not exist; the chapter states guideline developers, not knowledge engineers, write the Narrative level.

    **Concept Tested:** Knowledge Representation Level

---

#### 10. A health system is deciding between an always-on periodic sweep and an event-triggered check for a screening guideline. Which factor should most directly drive the decision, and why?

<div class="upper-alpha" markdown>
1. Whether proactively catching newly eligible patients as soon as possible is worth the continuous computing cost, versus accepting a cheaper design that only catches patients at the moment a relevant workflow event occurs
2. Whether the guideline is authored at the Narrative Level, since trigger type is fully determined by knowledge representation level alone
3. Whether the ActivityDefinition it references has ever been reused by another PlanDefinition
4. Whether the FHIR server has ever returned a Bundle containing more than one resource
</div>

??? question "Show Answer"
    The correct answer is **A**. The chapter frames this explicitly as a trade-off between proactive, continuously-running coverage and cheaper, event-driven coverage that only catches patients at specific workflow moments. Option B fabricates a dependency between knowledge representation level and trigger type that does not exist. Option C and D name factors irrelevant to choosing between the two trigger designs.

    **Concept Tested:** PlanDefinition Resource

---
