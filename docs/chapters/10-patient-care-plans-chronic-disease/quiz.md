# Quiz: Patient Care Plans and Chronic Disease Management

Test your understanding of patient care plans and chronic disease management with these review questions.

---

#### 1. What is a biomarker?

<div class="upper-alpha" markdown>
1. Any measurable indicator of a biological state or process, such as HbA1c or systolic blood pressure
2. A structured, versioned set of goals and interventions
3. A patient-reported survey instrument
4. A radiologist's narrative interpretation of an imaging study
</div>

??? question "Show Answer"
    The correct answer is **A**. A biomarker is any measurable indicator of a biological state or process, drawn from blood, urine, tissue, or a blood-pressure cuff, that stands in for something happening inside the body. Option B describes a patient care plan, a different concept. Option C describes a quality of life metric. Option D describes a radiology report.

    **Concept Tested:** Biomarker

---

#### 2. What is the difference between a lab test and a lab result?

<div class="upper-alpha" markdown>
1. A lab test is the value returned, and a lab result is the request for that measurement
2. A lab test is the ordered procedure requesting a measurement, and a lab result is the value that test returns, anchored to a timestamp, unit, and reference range
3. A lab test and a lab result are two names for a vital sign
4. A lab test can only be ordered as part of an imaging study
</div>

??? question "Show Answer"
    The correct answer is **B**. A lab test is the ordered request for a measurement, while a lab result is the value that test returns, always anchored to a timestamp, a unit, and a reference range. Option A reverses these two definitions. Option C incorrectly conflates lab tests and results with vital signs, a related but distinct concept. Option D fabricates a dependency on imaging studies that does not exist.

    **Concept Tested:** Lab Result

---

#### 3. What is a comorbidity?

<div class="upper-alpha" markdown>
1. A condition documented among a patient's relatives rather than the patient
2. A lab-confirmed DNA variant statistically associated with disease risk
3. An additional chronic condition present alongside the primary condition being managed
4. A patient-reported measure of functional or psychological well-being
</div>

??? question "Show Answer"
    The correct answer is **C**. A comorbidity is an additional chronic condition present alongside the primary one, such as Maria Chen's hypertension alongside her diabetes, which changes which medications are safe to prescribe. Option A describes family history, a distinct risk factor. Option B describes a genetic marker. Option D describes a quality of life metric.

    **Concept Tested:** Comorbidity

---

#### 4. Why does a graph model keep both a patient care plan and a treatment timeline as separate structures?

<div class="upper-alpha" markdown>
1. A treatment timeline is the intent, while a care plan is a purely hypothetical scenario
2. A care plan and a treatment timeline always contain identical, never-diverging information
3. A treatment timeline only exists for preventive care, never for chronic disease management
4. A care plan represents the intent of what should happen, while a treatment timeline is the record of what actually happened, and the two frequently diverge
</div>

??? question "Show Answer"
    The correct answer is **D**. The care plan captures the intended goals and interventions, while the treatment timeline records what actually occurred, and the graph keeps both because a patient may miss a refill or a dose increase may be delayed, causing the two to diverge. Option A reverses which structure represents intent versus record. Option B contradicts the chapter's explicit point about divergence. Option C incorrectly restricts timelines to preventive care only.

    **Concept Tested:** Treatment Timeline

---

#### 5. Why is a patient journey broader in scope than a single treatment timeline?

<div class="upper-alpha" markdown>
1. A treatment timeline is a filtered slice scoped to one care plan, while a patient journey is the unfiltered, longitudinal traversal across everything the patient node connects to
2. A patient journey only includes lab results and excludes all encounters
3. A treatment timeline includes every referral a patient has ever received across every condition
4. A patient journey and a treatment timeline are identical for every patient
</div>

??? question "Show Answer"
    The correct answer is **A**. A treatment timeline is scoped to one care plan or condition, while the patient journey is the complete, unfiltered path across every encounter, diagnosis, and care plan the patient has ever had. Option B incorrectly excludes encounters, which are central to a patient journey. Option C misattributes cross-condition referral tracking to the narrower timeline. Option D contradicts the explicit scope difference the chapter describes.

    **Concept Tested:** Patient Journey

---

#### 6. Why are biomarkers modeled generically with a shared measurement pattern and a type property, rather than a separate node type for every lab test and vital sign?

<div class="upper-alpha" markdown>
1. Because vital signs cannot be represented as graph nodes at all
2. Because a shared measurement pattern lets a single query retrieve every measurement of a given kind across a patient's history, regardless of whether it came from a formal lab order or a bedside check
3. Because only genetic markers require a type property
4. Because generic modeling eliminates the need for timestamps on measurements
</div>

??? question "Show Answer"
    The correct answer is **B**. Modeling biomarkers generically with a type property lets a single query retrieve every HbA1c reading, for example, regardless of whether it originated as a lab test or a vital sign check-in, which is exactly what a chronic-disease trend dashboard needs. Option A is false since vital signs are explicitly modeled as nodes. Option C incorrectly restricts type properties to genetic markers alone. Option D contradicts the timestamp anchoring the chapter describes for every measurement.

    **Concept Tested:** Biomarker

---

#### 7. A care team wants to identify which eligible patients have gone without a mammography screening beyond a defined lookback window. What kind of query does this represent?

<div class="upper-alpha" markdown>
1. A treatment timeline reconstruction query
2. A single-patient lab trend query
3. A population-health gap query applying an eligibility filter followed by a recency filter
4. A genetic marker lookup query
</div>

??? question "Show Answer"
    The correct answer is **C**. This is a population-health gap query, first filtering patients by eligibility such as age and sex, then by recency of their last relevant service, to identify eligible-but-overdue patients. Option A describes reconstructing one patient's dated events, a different task. Option B describes tracking a single patient's biomarker trend. Option D describes an unrelated genetic risk-factor lookup.

    **Concept Tested:** Preventive Care

---

#### 8. Maria's HbA1c fell from 8.4% to 6.9% over twelve months. How can this single fact be classified in the graph?

<div class="upper-alpha" markdown>
1. Only as a comorbidity
2. Only as a family history entry
3. Only as a radiology report
4. As either a biomarker trend or a patient outcome, depending on which question is being asked of the same data
</div>

??? question "Show Answer"
    The correct answer is **D**. The same HbA1c change can be interpreted as a biomarker trend when tracking the measurement itself, or as a patient outcome when evaluating whether the care plan succeeded, depending on the question being asked. Option A and B misassign this clinical fact to unrelated risk-factor categories. Option C confuses a lab-derived biomarker with an imaging-based report type.

    **Concept Tested:** Patient Outcome

---

#### 9. A biopsy result takes several days to return and is coded predominantly using SNOMED CT rather than RadLex. Which report type does this describe?

<div class="upper-alpha" markdown>
1. A pathology report
2. A radiology report
3. An imaging study
4. A treatment timeline event
</div>

??? question "Show Answer"
    The correct answer is **A**. A pathology report analyzes tissue or specimen samples such as a biopsy, is coded predominantly in SNOMED CT, and typically takes several days to a week because it depends on physical tissue processing. Option B describes the interpretation of an imaging study, which is typically available within 24 to 48 hours. Option C describes the imaging procedure itself rather than a tissue analysis. Option D describes an unrelated dated event on a treatment timeline.

    **Concept Tested:** Pathology Report

---

#### 10. Why does the chapter caution that a risk-adjustment analysis is needed when comparing outcome measures between graph-coordinated care and traditional care?

<div class="upper-alpha" markdown>
1. Because outcome measures can never be validly compared across two different care coordination models
2. Because a comparison drawn from observational data must account for how sick each population was to begin with, or an improvement can look larger or smaller than it really is
3. Because quality of life metrics are always more reliable than biomarker trends
4. Because pathology reports take longer to return than radiology reports
</div>

??? question "Show Answer"
    The correct answer is **B**. Because the comparison is drawn from observational care data rather than a randomized trial, a careful analysis must adjust for each population's starting health status, or the apparent size of an improvement could be misleading. Option A overstates the limitation; the chapter shows such comparisons can be made, just carefully. Option C makes an unsupported blanket claim about metric reliability. Option D states an unrelated turnaround-time fact irrelevant to risk adjustment.

    **Concept Tested:** Patient Outcome

---
