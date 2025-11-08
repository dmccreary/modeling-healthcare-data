# Quiz: Introduction to Healthcare Systems

Test your understanding of healthcare systems with these questions.

---

#### 1. What is the primary distinction between fee-for-service and value-based care models?

<div class="upper-alpha" markdown>
1. Fee-for-service pays for outcomes while value-based care pays per procedure
2. Value-based care reimburses based on quality outcomes while fee-for-service pays per service
3. Both models are identical in payment structure
4. Fee-for-service is only used outside the United States
</div>

??? question "Show Answer"
    The correct answer is **B**. Value-based care models reimburse healthcare providers based on patient health outcomes and quality metrics, incentivizing better care at lower costs. In contrast, fee-for-service models pay providers for each service, procedure, or visit regardless of outcome, which can incentivize volume over value. Option A reverses the definitions. Option C is incorrect as they are fundamentally different. Option D is false—fee-for-service is widely used in the U.S.

    **Concept Tested:** Fee-For-Service Model, Value-Based Care

    **See:** [Fee-For-Service vs Value-Based Care](index.md#fee-for-service-versus-value-based-care)

---

#### 2. What is an ICD code?

<div class="upper-alpha" markdown>
1. A standardized classification system for medical diagnoses and procedures
2. A patient identification number
3. A hospital location code
4. An insurance policy number
</div>

??? question "Show Answer"
    The correct answer is **A**. ICD (International Classification of Diseases) codes are standardized codes used to classify and code diagnoses, symptoms, and procedures. They are maintained by the World Health Organization and are essential for medical billing, epidemiology, and health management. Option B describes a different identifier. Options C and D are unrelated administrative codes.

    **Concept Tested:** ICD Code

    **See:** [Medical Coding Systems](index.md#medical-coding-systems)

---

#### 3. Which of the following best describes an Electronic Health Record (EHR)?

<div class="upper-alpha" markdown>
1. A paper-based patient chart
2. A digital system containing comprehensive patient health information across multiple providers
3. A billing system only
4. A pharmacy prescription database only
</div>

??? question "Show Answer"
    The correct answer is **B**. An Electronic Health Record (EHR) is a digital version of a patient's comprehensive medical history, maintained over time by providers, and designed to be shared across different healthcare organizations. It contains diagnoses, medications, treatment plans, immunization dates, allergies, radiology images, and laboratory test results. Option A describes legacy systems. Options C and D represent only subset functionalities.

    **Concept Tested:** Electronic Health Record

    **See:** [Electronic Health Records](index.md#electronic-health-records)

---

#### 4. In a healthcare graph model, how would you best represent the relationship between a patient and their multiple encounters?

<div class="upper-alpha" markdown>
1. Create separate Patient nodes for each encounter
2. Store all encounters as properties on a single Patient node
3. Use HAS_ENCOUNTER edges connecting the Patient node to multiple Encounter nodes
4. Delete previous encounters when new ones occur
</div>

??? question "Show Answer"
    The correct answer is **C**. In a graph model, you would create a Patient node connected to multiple Encounter nodes via HAS_ENCOUNTER edges. Each Encounter node represents a distinct healthcare visit with its own properties (date, location, provider, etc.). This structure naturally represents the one-to-many relationship. Option A creates data duplication. Option B doesn't scale well. Option D loses historical data.

    **Concept Tested:** Medical Encounter, Graph Database

    **See:** [Modeling Encounters](index.md#medical-encounters)

---

#### 5. What is healthcare interoperability?

<div class="upper-alpha" markdown>
1. The cost of healthcare services
2. A type of medical procedure
3. The ability of different healthcare systems to exchange and use patient information
4. A provider's medical license
</div>

??? question "Show Answer"
    The correct answer is **C**. Healthcare interoperability is the ability of different information systems, devices, and applications to access, exchange, integrate, and cooperatively use data in a coordinated manner, within and across organizational boundaries. This is critical for coordinated care and reducing medical errors. Options A, B, and D are unrelated concepts.

    **Concept Tested:** Healthcare Interoperability

    **See:** [Healthcare Interoperability](index.md#healthcare-interoperability-and-data-exchange)

---

#### 6. Which medical coding system is primarily used for billing outpatient procedures and physician services?

<div class="upper-alpha" markdown>
1. ICD codes
2. Drug codes (NDC)
3. CPT codes
4. ZIP codes
</div>

??? question "Show Answer"
    The correct answer is **C**. CPT (Current Procedural Terminology) codes are used to document and bill for medical procedures and services provided by physicians and other healthcare professionals. ICD codes (Option A) are primarily for diagnoses. Drug codes (Option B) are for medications. ZIP codes (Option D) are geographic identifiers.

    **Concept Tested:** CPT Code

    **See:** [CPT Codes](index.md#cpt-codes)

---

#### 7. Why is the per-person healthcare cost in the United States significantly higher than in other developed nations?

<div class="upper-alpha" markdown>
1. Better health outcomes justify higher costs
2. Americans receive more medical care than needed
3. All healthcare is free in other countries
4. Administrative complexity, fee-for-service incentives, and fragmented care contribute to inefficiency
</div>

??? question "Show Answer"
    The correct answer is **D**. The U.S. healthcare system's high per-person costs result from multiple factors including administrative overhead, fee-for-service payment models that incentivize volume over value, fragmented care coordination, high pharmaceutical prices, and defensive medicine practices. Paradoxically, these higher costs don't always correlate with better health outcomes. Option A is incorrect as outcomes aren't consistently better. Option B oversimplifies. Option C is false.

    **Concept Tested:** Per-Person Healthcare Cost, Healthcare Cost

    **See:** [Healthcare Cost Challenges](index.md#introduction-to-the-healthcare-ecosystem)

---

#### 8. Given a scenario where a patient visits three different specialists who don't share the same EHR system, what healthcare challenge does this illustrate?

<div class="upper-alpha" markdown>
1. Perfect data integration
2. Excessive healthcare costs only
3. Medical coding errors
4. Healthcare interoperability problems
</div>

??? question "Show Answer"
    The correct answer is **D**. When different providers use incompatible EHR systems that cannot share data, this represents a healthcare interoperability problem. Without interoperability, patient information remains siloed, potentially leading to duplicated tests, medication errors, incomplete medical histories, and fragmented care. Option A is the opposite of reality. Option B is a consequence, not the root problem. Option C is unrelated.

    **Concept Tested:** Healthcare Interoperability, Electronic Health Record

    **See:** [Healthcare Interoperability](index.md#healthcare-interoperability-and-data-exchange)

---

#### 9. What is the role of a healthcare payer?

<div class="upper-alpha" markdown>
1. To diagnose and treat patients
2. To manufacture medical devices
3. To provide financial coverage for healthcare services
4. To perform surgical procedures
</div>

??? question "Show Answer"
    The correct answer is **C**. Healthcare payers (such as insurance companies, Medicare, Medicaid, and self-insured employers) provide financial coverage for healthcare services by reimbursing providers and/or covering patient costs according to benefit plans. Option A describes providers. Option B describes manufacturers. Option D describes surgeons.

    **Concept Tested:** Healthcare Payer

    **See:** [Healthcare Stakeholders](index.md#introduction-to-the-healthcare-ecosystem)

---

#### 10. Analyze this scenario: A hospital implements a graph database to track how often specific diagnosis codes lead to specific procedure codes. What healthcare concept relationship are they analyzing?

<div class="upper-alpha" markdown>
1. The relationship between diagnoses and treatments using ICD and CPT codes
2. Patient demographics only
3. Provider credentials
4. Insurance premium calculations
</div>

??? question "Show Answer"
    The correct answer is **A**. The hospital is analyzing the relationship between diagnoses (represented by ICD codes) and procedures/treatments (represented by CPT codes). A graph database excels at this type of pattern analysis, enabling the hospital to understand clinical pathways, standard-of-care adherence, and opportunities for care optimization. Option B is too narrow. Options C and D are unrelated to the diagnosis-procedure relationship.

    **Concept Tested:** ICD Code, CPT Code, Medical Coding System

    **See:** [Medical Coding Systems](index.md#medical-coding-systems)
