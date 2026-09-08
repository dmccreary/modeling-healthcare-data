# Quiz: Healthcare Economics and Medical Coding Systems

Test your understanding of healthcare economics and medical coding systems with these review questions.

---

#### 1. Under the fee-for-service model, how are providers paid?

<div class="upper-alpha" markdown>
1. Providers are paid a single annual salary regardless of services performed
2. Providers are paid only when a patient outcome improves
3. Providers are paid separately for each individual service rendered, regardless of whether the service improved the patient's health
4. Providers are paid based on the total cost efficiency of a patient's entire care journey
</div>

??? question "Show Answer"
    The correct answer is **C**. Under fee-for-service, every office visit, test, and procedure generates its own bill, creating a direct financial incentive to deliver more services regardless of whether they improve health outcomes. Option A describes a salaried model not discussed as fee-for-service. Options B and D both describe value-based care, the opposite payment philosophy.

    **Concept Tested:** Fee-For-Service Model

---

#### 2. What does the three-segment NDC code `0069-0420-30` uniquely identify?

<div class="upper-alpha" markdown>
1. A drug's labeler, its specific product (ingredient, strength, and dosage form), and its package size
2. A patient's insurance policy number, deductible, and copay
3. A diagnosis category, its specifier, and its billing modifier
4. A lab test's identifier, its unit of measure, and its reference range
</div>

??? question "Show Answer"
    The correct answer is **A**. An NDC code's three segments identify the labeler (manufacturer), the specific product including ingredient, strength, and dosage form, and the package size, together uniquely identifying one specific manufactured drug package. Option B describes insurance policy details, unrelated to drug identification. Option C describes ICD-10-CM structure, not NDC. Option D describes LOINC's purpose for lab tests, not NDC's purpose for drugs.

    **Concept Tested:** NDC Code

---

#### 3. How does value-based care change the financial incentive compared to fee-for-service when a patient is hospitalized for a preventable complication?

<div class="upper-alpha" markdown>
1. Both models treat the hospitalization identically, as pure additional revenue
2. Value-based care always pays providers more for a hospitalization than fee-for-service does
3. Fee-for-service penalizes providers financially for a preventable hospitalization
4. Under value-based care, the hospitalization counts against the provider since it signals the care budget was not spent effectively on prevention, while under fee-for-service it increases provider revenue
</div>

??? question "Show Answer"
    The correct answer is **D**. The identical clinical event has opposite financial consequences depending on the payment model: fee-for-service revenue increases with every additional billed service, while value-based care treats a preventable hospitalization as a signal that preventive spending was not effective. Option A ignores this exact contrast, which is the chapter's central point. Options B and C both reverse the actual incentive structures described.

    **Concept Tested:** Value-Based Care

---

#### 4. Which statement correctly distinguishes the roles of healthcare payer, healthcare provider, and healthcare patient?

<div class="upper-alpha" markdown>
1. A payer and a provider are the same entity in every healthcare transaction
2. A payer delivers clinical care, a provider finances that care, and a patient regulates both
3. A payer finances care by collecting premiums and reimbursing providers, a provider delivers clinical care, and a patient is the individual receiving that care
4. A patient always pays a provider directly, and payers are not involved in reimbursement
</div>

??? question "Show Answer"
    The correct answer is **C**. The payer finances care by collecting premiums or tax revenue and reimbursing providers, the provider delivers the actual clinical care, and the patient is the individual receiving it, with data flowing through both provider and payer sides of every transaction. Option A incorrectly merges two distinct roles. Option B swaps the payer and provider definitions entirely. Option D ignores the payer's central reimbursement role.

    **Concept Tested:** Healthcare Payer

---

#### 5. Why does a graph model need to track a medical coding system's version or effective date as a property, not just the code itself?

<div class="upper-alpha" markdown>
1. Because CPT codes are never updated after their initial release
2. Because coding systems have no governing body responsible for updates
3. Because every coding system uses exactly the same annual release schedule
4. Because the same alphanumeric code string can occasionally be redefined or retired between annual code-set releases from bodies like the WHO, CDC, AMA, or CMS
</div>

??? question "Show Answer"
    The correct answer is **D**. Each coding system is maintained by a specific governing body on its own release schedule, and a code's meaning can change or be retired between releases, so tracking the version or effective date prevents a graph model from misinterpreting an older or newer meaning of the same code string. Option A is factually incorrect since CPT is updated annually. Option B contradicts the chapter's description of specific governing bodies. Option C incorrectly claims a single shared schedule across all systems.

    **Concept Tested:** Medical Coding System

---

#### 6. In the ICD-10-CM code `E11.21`, what do the category `E11` and the specifier `.21` each represent?

<div class="upper-alpha" markdown>
1. E11 identifies the ordering provider, and .21 identifies the billing modifier
2. E11 identifies Type 2 diabetes mellitus, and .21 specifies a more detailed variant such as diabetic nephropathy
3. E11 identifies the drug's manufacturer, and .21 identifies its package size
4. E11 identifies the lab test performed, and .21 identifies the reference range
</div>

??? question "Show Answer"
    The correct answer is **B**. The category portion of an ICD-10-CM code identifies the broad condition, here Type 2 diabetes mellitus, while the decimal specifier narrows it to a more detailed clinically distinct variant, such as diabetic nephropathy. Option A misapplies category and specifier to billing concepts that belong to CPT modifiers, not ICD structure. Option C describes NDC code segments, not ICD-10-CM. Option D describes LOINC concepts, unrelated to ICD-10-CM.

    **Concept Tested:** ICD-10-CM

---

#### 7. Dr. Patel bills 20 office visits worth 1.3 RVUs each and 5 minor procedures worth 2.1 RVUs each in one week. What is his total RVU productivity for the week?

<div class="upper-alpha" markdown>
1. 26.0 RVUs
2. 10.5 RVUs
3. 36.5 RVUs
4. 46.0 RVUs
</div>

??? question "Show Answer"
    The correct answer is **C**. The calculation is (20 × 1.3) + (5 × 2.1) = 26 + 10.5 = 36.5 RVUs, combining both the office visit and procedure totals. Option A reports only the office visit portion, omitting the procedures. Option B reports only the procedure portion, omitting the office visits. Option D incorrectly sums to a value that does not match either partial or combined totals.

    **Concept Tested:** Healthcare Provider

---

#### 8. A screening colonoscopy is documented with an ICD-10-CM code describing the screening indication and billed with a separate CPT code describing the procedure itself. What does this scenario illustrate?

<div class="upper-alpha" markdown>
1. That CPT codes have replaced ICD-10-CM codes for all diagnostic purposes
2. That the same single clinical event is often described by two different coding systems, one for the diagnosis or reason and one for the procedure performed
3. That NDC codes are required whenever a CPT code is used
4. That LOINC codes must always accompany an ICD-10-CM code
</div>

??? question "Show Answer"
    The correct answer is **B**. This is the classic near-miss the chapter highlights: a single clinical event is described by an ICD-10-CM code for the diagnosis or reason and a separate CPT code for the procedure itself, and mixing up which system codes which aspect is a common error. Option A incorrectly claims one system replaces the other. Option C and D fabricate requirements between coding systems that do not exist.

    **Concept Tested:** CPT Code

---

#### 9. Why can the same physical drug product appear as both `00069-0420-30` and `0069-420-30` across different data feeds, and why does this matter for a graph model?

<div class="upper-alpha" markdown>
1. Because SNOMED CT and ICD-10-CM disagree about how to represent drugs
2. Because CPT codes are always six digits longer than NDC codes
3. Because LOINC codes are assigned randomly by each individual pharmacy
4. Because the FDA allows NDC segments to be published in different digit-length configurations, and inconsistent zero-padding across systems can cause a graph model to create duplicate Medication nodes for the same product if not normalized first
</div>

??? question "Show Answer"
    The correct answer is **D**. The FDA permits NDC segments in more than one digit-length configuration, and inconsistent leading-zero padding across source systems means a graph model must normalize the format before treating differently-formatted strings as the same product, or it risks creating duplicate nodes. Option A confuses drug coding with unrelated diagnosis terminology systems. Options B and C fabricate irrelevant claims about CPT and LOINC that have nothing to do with NDC formatting.

    **Concept Tested:** NDC Code

---

#### 10. Why does the shift toward value-based care make graph-style data modeling especially valuable, compared to the transactional record-keeping that sufficed under fee-for-service?

<div class="upper-alpha" markdown>
1. Value-based care requires seeing a patient's entire connected care journey across every provider, condition, and outcome as one picture, rather than a pile of disconnected transactions, which is exactly what a graph database is built to represent
2. Value-based care eliminates the need to track any patient data at all
3. Fee-for-service already required the same longitudinal, connected view that value-based care needs
4. Graph databases are only useful for billing individual transactions, not longitudinal outcomes
</div>

??? question "Show Answer"
    The correct answer is **A**. Value-based care needs the ability to see a patient's entire connected journey as one picture rather than disconnected transactions, which is precisely the capability a graph database provides, making graph modeling far more valuable under value-based care than under transaction-by-transaction fee-for-service billing. Options B, C, and D each contradict this core contrast the chapter draws between the two payment models.

    **Concept Tested:** Value-Based Care

---
