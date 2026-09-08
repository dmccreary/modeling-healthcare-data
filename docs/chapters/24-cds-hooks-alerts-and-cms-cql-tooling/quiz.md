# Quiz: CDS Hooks, Care Alerts, and CMS CQL Tooling

Test your understanding of CDS Hooks, care alerts, and CMS CQL tooling with these review questions.

---

#### 1. What is CDS Hooks?

<div class="upper-alpha" markdown>
1. A CMS tool for authoring and testing Clinical Quality Measures
2. The HL7 specification defining standardized trigger points in a clinical workflow where an EHR calls out to an external CDS service and displays the response
3. A synthetic-patient testing tool historically paired with the Measure Authoring Tool
4. The compiled, machine-friendly representation of CQL logic
</div>

??? question "Show Answer"
    The correct answer is **B**. CDS Hooks defines standardized trigger points, such as patient-view, order-select, and order-sign, where an EHR calls an external CDS service and displays its response, without the EHR needing to build any clinical logic itself. Option A describes MADiE. Option C describes Bonnie. Option D describes the Expression Logical Model.

    **Concept Tested:** CDS Hooks

---

#### 2. What is the CQL Runner tool used for?

<div class="upper-alpha" markdown>
1. Certifying an EHR vendor's CQL execution engine against standardized test cases
2. Submitting aggregated eCQM results to a federal quality reporting program
3. Defining formally published profiles and ValueSet bindings for a specific use case
4. Quick, ad hoc testing of a small CQL fragment against a single test patient bundle, without the overhead of a full measure bundle
</div>

??? question "Show Answer"
    The correct answer is **D**. CQL Runner lets a knowledge engineer paste a single define statement, test it against one patient bundle, and see the result immediately, well before a fragment is mature enough for a full MADiE measure. Option A describes Cypress. Option B describes the quality reporting architecture. Option C describes a FHIR Implementation Guide.

    **Concept Tested:** CQL Runner Tool

---

#### 3. How does a CDS Alert differ from a clinical reminder in the CDS Hooks context?

<div class="upper-alpha" markdown>
1. A CDS Alert can be an interruptive card such as a drug-drug interaction warning, while a clinical reminder is a lower-urgency, non-interruptive card that surfaces alongside the chart rather than blocking a workflow step
2. A clinical reminder always requires a signed order, while a CDS Alert never does
3. A CDS Alert only fires on the patient-view hook, while a clinical reminder only fires on order-sign
4. They are two names for the identical concept with no functional difference
</div>

??? question "Show Answer"
    The correct answer is **A**. A CDS Alert can interrupt a workflow for a serious issue like a drug interaction, while a clinical reminder is intentionally non-interruptive, surfacing low-stakes information without blocking the clinician. Option B fabricates an order dependency that does not exist. Option C incorrectly restricts each alert type to a single hook type. Option D contradicts the chapter's explicit distinction between urgency levels.

    **Concept Tested:** Clinical Reminder

---

#### 4. How does MADiE differ from Cypress in the CMS CQL tooling ecosystem?

<div class="upper-alpha" markdown>
1. MADiE certifies an EHR vendor's execution engine, while Cypress authors and tests individual measures
2. Both tools perform the exact same certification function
3. MADiE consolidates measure authoring and dynamic testing into one environment, while Cypress certifies that an EHR vendor's CQL execution engine correctly runs compiled logic against standardized test cases
4. MADiE can only be used after Cypress certification has already been completed
</div>

??? question "Show Answer"
    The correct answer is **C**. MADiE combines authoring and testing for individual measures, while Cypress separately certifies that an EHR vendor's execution engine runs compiled CQL/eCQM logic correctly. Option A reverses the two tools' actual roles. Option B contradicts their clearly distinct functions. Option D fabricates a sequencing dependency that does not exist between the two tools.

    **Concept Tested:** MADiE Authoring Tool

---

#### 5. Dr. Patel begins signing a new warfarin prescription for Maria Chen, who is already taking aspirin. Which CDS Hooks hook type fires, and why?

<div class="upper-alpha" markdown>
1. patient-view, because it fires whenever a chart is opened regardless of any order
2. order-sign, because it fires at the final moment before an order is signed and becomes official, the last checkpoint to catch a problem
3. order-select, because it only fires when a clinician begins selecting a new order before any draft order exists
4. No hook fires, since drug-drug interaction checks occur entirely outside the CDS Hooks specification
</div>

??? question "Show Answer"
    The correct answer is **B**. Signing the warfarin order triggers order-sign, the final checkpoint before the order becomes official, exactly when the drug-drug interaction check runs in this worked example. Option A describes a different hook that fires only on chart opening, not order signing. Option C describes an earlier hook point that has already passed once a draft order is being signed. Option D contradicts the chapter's explicit example of a drug-drug interaction check firing via CDS Hooks.

    **Concept Tested:** CDS Hooks

---

#### 6. The diabetes-control measure's compiled logic identifies 14,000 patients in a care gap. How does this same logic become a point-of-care care gap alert without any additional guideline authoring work?

<div class="upper-alpha" markdown>
1. By deleting the original population-level CQL logic and writing an entirely new rule specific to alerts
2. By converting the CQL logic into a FHIR Questionnaire resource for patient self-report
3. By running the logic only once per year during a manual chart audit
4. By evaluating the identical compiled "In Denominator AND NOT In Numerator" logic against the current patient in real time when their chart is opened, firing the patient-view hook
</div>

??? question "Show Answer"
    The correct answer is **D**. The exact same compiled CQL logic that computes the population measure is evaluated in real time against one patient's chart when the patient-view hook fires, turning a population statistic into a point-of-care nudge with no new authoring required. Option A contradicts the chapter's explicit point about reusing identical logic. Option B and C both describe unrelated mechanisms that do not match how care gap alerts actually work.

    **Concept Tested:** Care Gap Alert

---

#### 7. Following the quality reporting architecture, what is the correct sequence for an eCQM's result to reach a federal reporting program like MIPS?

<div class="upper-alpha" markdown>
1. Local CQL evaluation against live patient data, aggregation across the population, formatting into a standardized submission document, and transmission to CMS
2. Transmission to CMS first, followed by local CQL evaluation afterward
3. Aggregation across the population without ever performing any local CQL evaluation
4. Formatting into a submission document before the measure has even been compiled to ELM
</div>

??? question "Show Answer"
    The correct answer is **A**. The quality reporting architecture flows from local evaluation, to population-wide aggregation, to standardized formatting, and finally to transmission, the sequence that ties eCQM performance to reimbursement. Option B reverses the entire sequence. Option C skips the essential local evaluation step. Option D places formatting before compilation, which is out of order.

    **Concept Tested:** Quality Reporting Architecture

---

#### 8. Why does a CDS service rely on a prefetch bundle rather than making its own separate FHIR queries back to the EHR at the moment a hook fires?

<div class="upper-alpha" markdown>
1. Because prefetch bundles are required by federal law regardless of any performance considerations
2. Because a CDS service is never permitted to query a FHIR server directly under any circumstances
3. Because gathering relevant FHIR resources in advance avoids slow, separate round-trip queries at the exact moment a time-sensitive clinical decision is being made, the same efficiency principle applied to network round-trips instead of LLM tokens
4. Because prefetch bundles replace the need for a CDS Rule Engine entirely
</div>

??? question "Show Answer"
    The correct answer is **C**. Prefetch avoids slow, separate round-trip queries at a time-sensitive decision moment, mirroring the token-efficiency principle from Chapter 20 but applied to network latency instead of LLM cost. Option A fabricates a legal requirement not described in the chapter. Option B overstates a restriction; CDS services can query FHIR servers, prefetch is simply more efficient. Option D confuses prefetch with an unrelated rule-engine component.

    **Concept Tested:** CDS Hooks

---

#### 9. Why doesn't passing Cypress certification guarantee that a specific Clinical Quality Measure's logic is clinically correct?

<div class="upper-alpha" markdown>
1. Because Cypress only certifies FHIR Questionnaire resources, never CQL logic
2. Because Cypress certification verifies that an EHR's CQL execution engine runs logic correctly, but a knowledge engineer can still author a flawed denominator or numerator definition that a correctly functioning engine will faithfully execute
3. Because Cypress certification expires immediately upon issuance
4. Because Cypress can only be run on measures authored in the legacy Measure Authoring Tool
</div>

??? question "Show Answer"
    The correct answer is **B**. Cypress certifies engine correctness, not measure logic correctness, so a flawed denominator or numerator definition can still be faithfully, and incorrectly, executed by a certified engine. Option A misdescribes what Cypress actually certifies. Option C fabricates an expiration behavior not described in the chapter. Option D fabricates an unsupported tooling restriction.

    **Concept Tested:** Cypress Certification Tool

---

#### 10. Why did consolidating the separate Measure Authoring Tool (MAT) and Bonnie testing tool into MADiE's single environment reduce a real risk in the measure development process?

<div class="upper-alpha" markdown>
1. Because MAT and Bonnie were never able to process the same CQL library
2. Because MADiE eliminates the need for any testing of measure logic at all
3. Because consolidation increased the total number of separate tools a knowledge engineer had to learn
4. Because separating authoring from testing made it too easy to ship logic that looked right but had never actually been run against a single test patient, a risk a unified authoring-and-testing environment directly closes
</div>

??? question "Show Answer"
    The correct answer is **D**. Separate authoring and testing tools made it easy to ship untested logic that merely looked correct, and MADiE's consolidation closes that gap by keeping authoring and testing in one continuous workflow. Option A fabricates an incompatibility that did not exist between MAT and Bonnie. Option B directly contradicts the fact that MADiE explicitly includes dynamic testing. Option C reverses the actual simplification consolidation provides.

    **Concept Tested:** Bonnie Testing Tool

---
