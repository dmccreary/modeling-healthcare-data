# Quiz: Clinical Guideline Authoring and Clinical Quality Language

Test your understanding of clinical guideline authoring and Clinical Quality Language with these review questions.

---

#### 1. What is a CQL define statement?

<div class="upper-alpha" markdown>
1. A construct that gives a name to a reusable logical expression, allowing complex logic to be built from simpler, individually readable named pieces
2. A curated subset of codes drawn from one or more CodeSystems
3. The compiled, machine-friendly XML or JSON representation of CQL logic
4. A branching diagram of sequential decision points
</div>

??? question "Show Answer"
    The correct answer is **A**. A CQL define statement names a reusable logical expression, letting complex logic be built from simpler, composable pieces rather than one dense unreadable expression. Option B describes a ValueSet. Option C describes the Expression Logical Model. Option D describes a clinical flowchart.

    **Concept Tested:** CQL Define Statement

---

#### 2. When should a guideline authoring team choose a clinical flowchart over a decision table?

<div class="upper-alpha" markdown>
1. Whenever the guideline needs to bind a data element to a ValueSet
2. Whenever the guideline's logic is a set of independent if-then rules with no meaningful sequence between them
3. Whenever the order of decisions matters, such that the answer to one question determines which question gets asked next
4. Whenever a Clinical Reasoning Module is not yet available
</div>

??? question "Show Answer"
    The correct answer is **C**. A clinical flowchart is the better choice when decision order matters, such as a chest-pain triage protocol where one answer determines the next question. Option A confuses artifact choice with an unrelated terminology-binding decision. Option B describes exactly when a decision table, not a flowchart, is the better fit. Option D fabricates an unrelated dependency on runtime infrastructure.

    **Concept Tested:** Clinical Flowchart

---

#### 3. How does a ValueSet differ from a CodeSystem?

<div class="upper-alpha" markdown>
1. They are two names for the identical concept
2. A CodeSystem is a complete, formally maintained vocabulary of codes, while a ValueSet is a curated, purpose-built subset of codes drawn from one or more CodeSystems for a single clinical use
3. A ValueSet is always larger than any CodeSystem it draws from
4. A CodeSystem is authored by a knowledge engineer, while a ValueSet is authored exclusively by a CQL compiler
</div>

??? question "Show Answer"
    The correct answer is **B**. A CodeSystem is the entire formally governed vocabulary, such as all of LOINC, while a ValueSet curates a specific, purpose-built subset from one or more CodeSystems for a single clinical use. Option A contradicts the chapter's explicit warning against conflating the two. Option C reverses the actual size relationship. Option D fabricates an authorship restriction; a CQL compiler does not author ValueSets at all.

    **Concept Tested:** ValueSet Resource

---

#### 4. A CQM's initial population is 40,000 patients, all 40,000 satisfy the denominator criteria, 500 are excluded for hospice care, and 25,500 satisfy the numerator criteria. What is the measure's reported rate?

<div class="upper-alpha" markdown>
1. 63.75%
2. 100%
3. 1.25%
4. Approximately 64.6%
</div>

??? question "Show Answer"
    The correct answer is **D**. The reported rate is the numerator divided by the denominator after exclusions: 25,500 ÷ (40,000 − 500) = 25,500 ÷ 39,500 ≈ 64.6%. Option A incorrectly divides by the pre-exclusion denominator of 40,000. Option B and C both apply incorrect or irrelevant calculations that do not match the formula.

    **Concept Tested:** Clinical Quality Measure

---

#### 5. A guideline needs to bind a lab result's unit of measurement, where any ambiguity between "mg/dL" and "mmol/L" could cause a dangerous dosing error. Which terminology binding strength is most appropriate?

<div class="upper-alpha" markdown>
1. Required, since only codes from the bound ValueSet should be valid with no exceptions
2. Example, since it exists purely to illustrate the kind of value expected
3. Preferred, since it is a recommendation without enforcement
4. No binding at all, since units do not need any standardization
</div>

??? question "Show Answer"
    The correct answer is **A**. A required binding is appropriate for a data element like lab result units, where ambiguity would be dangerous, since only codes from the bound ValueSet are considered valid. Option B and C both permit unbound or non-conforming values, which is inappropriate for a safety-critical field. Option D ignores the clear danger of leaving units completely unstandardized.

    **Concept Tested:** Terminology Binding

---

#### 6. Why does binding a medication's route of administration too loosely, as merely "preferred" rather than "required," create a real risk?

<div class="upper-alpha" markdown>
1. Because a preferred binding automatically deletes any Observation resource that uses it
2. Because preferred bindings are only valid for CodeSystems, never for ValueSets
3. Because a preferred binding allows two systems to record the same clinical fact using incompatible codes, silently breaking any downstream logic that expects a required-level guarantee
4. Because preferred bindings are automatically upgraded to required status after one year
</div>

??? question "Show Answer"
    The correct answer is **C**. A preferred binding permits deviation from the ValueSet, so two systems can record the same fact with incompatible codes, silently breaking logic that assumes a required-level guarantee. Option A fabricates a destructive behavior that does not occur. Option B misstates binding strength applicability. Option D fabricates an automatic strength upgrade that does not exist.

    **Concept Tested:** Terminology Binding

---

#### 7. Why does CQL's separation of clinical logic from any specific data model version or execution platform matter practically for a health system?

<div class="upper-alpha" markdown>
1. Because it eliminates the need for any FHIR resources to be defined at all
2. Because the same CQL library can run unmodified against any FHIR-conformant data source and any CQL-capable engine, rather than being rewritten for every EHR vendor's proprietary rules format
3. Because CQL can only be executed by the specific vendor that originally authored it
4. Because separation of concerns means a CQL library never needs to reference a ValueSet
</div>

??? question "Show Answer"
    The correct answer is **B**. CQL's platform independence means the same library runs unmodified across any conformant system, avoiding the need to rewrite logic for every vendor's proprietary format. Option A contradicts CQL's explicit dependence on referencing FHIR resources. Option C directly contradicts the portability CQL is designed to provide. Option D contradicts the chapter's own worked example, which references ValueSets extensively.

    **Concept Tested:** Clinical Quality Language

---

#### 8. Why does the knowledge-engineering bottleneck limit how much of medicine's published guidance ever becomes computable?

<div class="upper-alpha" markdown>
1. Because Clinical Reasoning Modules can only evaluate a maximum of ten CQL libraries per health system
2. Because CQL compilers are only available during specific hours of the day
3. Because ValueSets can only be created by government agencies
4. Because far more narrative guidelines exist than knowledge engineers available to structure them into standards-compliant FHIR resources, given the rare combination of clinical literacy, terminology fluency, and software engineering discipline the role requires
</div>

??? question "Show Answer"
    The correct answer is **D**. The knowledge engineer role demands a rare combination of clinical literacy, terminology fluency, and engineering discipline, and far more guidelines exist than qualified people to structure them, creating a persistent bottleneck. Option A, B, and C each fabricate an arbitrary technical or organizational restriction not described in the chapter.

    **Concept Tested:** Knowledge Engineer Role

---

#### 9. A chest-pain triage protocol requires answering "is the EKG abnormal?" before deciding which follow-up question to ask next, since asking the questions out of order would not make clinical sense. Which authoring artifact is best justified for this guideline, and why?

<div class="upper-alpha" markdown>
1. A clinical flowchart, because the order of decisions matters and each answer determines which question comes next
2. A decision table, because all guideline rules are always independent of sequence regardless of content
3. A CQL define statement, because authoring format is chosen before any clinical content is considered
4. A ValueSet, because sequencing decisions always require curating a subset of diagnosis codes
</div>

??? question "Show Answer"
    The correct answer is **A**. Since the order of questions matters and one answer determines the next question, a clinical flowchart is the artifact specifically designed to represent this kind of sequential logic. Option B misapplies a decision table to logic that is explicitly order-dependent. Option C confuses artifact selection with an unrelated authoring-format decision. Option D confuses terminology curation with sequencing logic entirely.

    **Concept Tested:** Clinical Flowchart

---

#### 10. A guideline authoring team wants to write a clinical user story for a primary care physician who needs to know when a diabetic patient is overdue for an HbA1c test, in time to order it before the visit ends. Which option best follows the "As a [role], I want [goal], so that [benefit]" template while capturing the timing and motivation the Forms/UI Tier is meant to carry?

<div class="upper-alpha" markdown>
1. "HbA1c tests should be ordered for diabetic patients."
2. "As a primary care physician, I want to see all of my patients' lab results."
3. "As a primary care physician, I want to be alerted when a diabetic patient's chart shows no HbA1c result in the past twelve months, so that I can order the test before the visit ends."
4. "As a knowledge engineer, I want to compile CQL into ELM, so that the measure can be evaluated."
</div>

??? question "Show Answer"
    The correct answer is **C**. This option follows the full role-goal-benefit template and explicitly captures both timing (before the visit ends) and motivation (avoiding a follow-up visit), exactly the workflow-shaping detail a decision table cannot express. Option A omits the entire user story structure. Option B follows the template but is too generic, lacking any specific timing or motivation. Option D uses the correct template but for an unrelated role and goal that do not match this scenario.

    **Concept Tested:** Clinical User Story

---
