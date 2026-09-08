# Quiz: Specialty Care, Surgery, and Remote Monitoring

Test your understanding of specialty care, surgery, and remote monitoring with these review questions.

---

#### 1. What is a Discharge Summary?

<div class="upper-alpha" markdown>
1. A document node consolidating diagnoses treated, procedures performed, medications prescribed, and follow-up instructions, formally closing the inpatient episode
2. A continuous stream of vital-sign readings produced by a wearable device
3. A standardized survey capturing how a patient reports feeling
4. A structured schedule of physical therapy sessions
</div>

??? question "Show Answer"
    The correct answer is **A**. A Discharge Summary consolidates the diagnoses, procedures, medications, and follow-up instructions into a single record that formally closes the inpatient episode and is read by whoever provides care next. Option B describes Wearable Device Data, a different concept. Option C describes a Patient-Reported Outcome. Option D describes a Rehabilitation Plan.

    **Concept Tested:** Discharge Summary

---

#### 2. How does this chapter model Neurodiversity, such as autism or ADHD?

<div class="upper-alpha" markdown>
1. As a Behavioral Health Condition requiring a positive screening result
2. As a Substance Use Disorder subject to additional confidentiality protections
3. As a subtype of Palliative Care
4. As a distinct node category representing a different, not disordered, way of thinking, not reached through a screening-and-diagnosis pathway
</div>

??? question "Show Answer"
    The correct answer is **D**. Neurodiversity is modeled as its own distinct node category representing a different way of thinking and processing the world, deliberately kept separate from the screening-and-diagnosis pathway used for a Behavioral Health Condition. Option A incorrectly routes Neurodiversity through a screening result. Option B confuses it with an unrelated condition category. Option C incorrectly nests it under Palliative Care.

    **Concept Tested:** Neurodiversity

---

#### 3. What is the key difference between a Patient-Reported Outcome and Wearable Device Data?

<div class="upper-alpha" markdown>
1. A Patient-Reported Outcome is generated automatically by a device, while wearable data is self-reported by the patient
2. A Patient-Reported Outcome is a periodic, self-reported survey capturing how the patient says they are doing, while wearable data is a continuous, objective stream generated automatically by a device
3. A Patient-Reported Outcome and wearable device data are two names for the same node type
4. Wearable device data can only be collected during a telehealth visit
</div>

??? question "Show Answer"
    The correct answer is **B**. A Patient-Reported Outcome is a periodic, self-reported survey capturing the patient's own account of how they are doing, while wearable data is a continuous, objective stream produced automatically by a device. Option A reverses these two definitions. Option C incorrectly conflates two distinct node types the chapter treats separately. Option D fabricates a dependency on telehealth visits that does not exist.

    **Concept Tested:** Patient-Reported Outcome

---

#### 4. How does Remote Patient Monitoring connect device and survey data to a Telehealth Visit?

<div class="upper-alpha" markdown>
1. RPM directly replaces the need for a Patient Portal
2. RPM only applies to Patient-Reported Outcomes, never to wearable data
3. RPM continuously ingests wearable readings and PRO responses, applying threshold rules, and when a threshold is crossed it triggers an alert that schedules a telehealth visit
4. A Telehealth Visit must occur before any RPM algorithm can run
</div>

??? question "Show Answer"
    The correct answer is **C**. Remote Patient Monitoring continuously ingests wearable readings and PRO responses, applies threshold rules to detect concerning trends, and when a threshold is crossed it triggers an alert that most commonly schedules a telehealth visit. Option A incorrectly claims RPM replaces the portal, an unrelated aggregating node. Option B incorrectly limits RPM to only one data type. Option D reverses the actual sequence of events.

    **Concept Tested:** Remote Patient Monitoring

---

#### 5. Why is Substance Use Disorder modeled as its own condition type rather than folded into the general Behavioral Health Condition category?

<div class="upper-alpha" markdown>
1. Because it has its own clinical criteria and is subject to additional confidentiality protections under U.S. federal law (42 CFR Part 2) that do not apply to most other diagnoses
2. Because it is the only behavioral health condition that requires a screening instrument
3. Because it cannot be diagnosed using standard clinical criteria
4. Because it always co-occurs with Neurodiversity
</div>

??? question "Show Answer"
    The correct answer is **A**. Substance Use Disorder has its own clinical diagnostic criteria and is subject to additional federal confidentiality protections that do not apply to most other diagnoses, which affects how access to those nodes must be governed. Option B is false since other behavioral health conditions, like depression and anxiety, also use screening instruments. Option C contradicts the chapter's description of its own clinical criteria. Option D fabricates an unsupported co-occurrence claim.

    **Concept Tested:** Substance Use Disorder

---

#### 6. An RPM algorithm evaluates the rule "alert if heart rate exceeds 100 bpm for 3 consecutive readings," and three consecutive wearable readings come back at 104, 108, and 110 bpm. What happens next in the graph model?

<div class="upper-alpha" markdown>
1. The Patient Portal automatically deletes the wearable readings
2. A Discharge Summary is generated immediately
3. The readings are reclassified as a Patient-Reported Outcome
4. The RPM Algorithm triggers an Alert, which schedules a Telehealth Visit
</div>

??? question "Show Answer"
    The correct answer is **D**. Once the threshold rule is satisfied, the RPM Algorithm triggers an Alert, which most commonly schedules a Telehealth Visit, closing the loop from a data pattern back to a human encounter. Option A fabricates an unrelated deletion behavior. Option B confuses this monitoring scenario with an unrelated inpatient discharge event. Option C incorrectly reclassifies device-generated data as a self-reported survey.

    **Concept Tested:** Remote Patient Monitoring

---

#### 7. Which of the following is one of the four graph-reachable factors that commonly feed a computed Readmission Risk score?

<div class="upper-alpha" markdown>
1. The patient's preferred language
2. The discharge disposition, meaning which Care Transition destination was chosen
3. The name of the surgeon who performed the procedure
4. The patient's score on a Patient-Reported Outcome survey
</div>

??? question "Show Answer"
    The correct answer is **B**. Discharge disposition, drawn from the Care Transition edge, is one of the four commonly used inputs to a Readmission Risk score, alongside comorbidity count, length of stay, and prior admissions in the last 12 months. Option A, C, and D each name a plausible-sounding but unlisted factor that the chapter does not include among the four standard inputs.

    **Concept Tested:** Readmission Risk

---

#### 8. A patient completes a PHQ-9 screening and scores above the published clinical threshold, producing a POSITIVE result. How should the graph represent this?

<div class="upper-alpha" markdown>
1. Immediately overwrite the screening node with a diagnosed Behavioral Health Condition node, deleting the original score
2. Reclassify the result as a Neurodiversity node
3. Connect the screening node to the corresponding Behavioral Health Condition through a SCREENS_FOR edge, without merging the screening result directly into a diagnosis node
4. Ignore the result unless the patient also has Wearable Device Data
</div>

??? question "Show Answer"
    The correct answer is **C**. A screening score is only a signal that a fuller clinical evaluation is warranted, so it should be modeled as a separate node connected to, not merged with, the Behavioral Health Condition it may lead to. Option A contradicts the chapter's explicit warning against treating a screening score as equivalent to a diagnosis. Option B incorrectly reroutes a screening result into an unrelated category. Option D fabricates a dependency on wearable data that does not exist.

    **Concept Tested:** Mental Health Screening

---

#### 9. Why is Palliative Care modeled with its own care-team and goals-of-care nodes rather than through the same screening-and-diagnosis pathway as a Behavioral Health Condition?

<div class="upper-alpha" markdown>
1. Because Palliative Care answers a different question, what matters most to the patient right now, and applies at any stage of a serious illness alongside curative treatment, independent of any diagnosis type
2. Because Palliative Care is only available to patients with a positive Mental Health Screening result
3. Because Palliative Care always follows a Surgical Procedure
4. Because Palliative Care requires a Wearable Device Data stream to function
</div>

??? question "Show Answer"
    The correct answer is **A**. Palliative Care runs in parallel to curative treatment at any stage of a serious illness and connects through its own care-team and goals-of-care nodes because it addresses a different question than a diagnosis-driven pathway does. Option B fabricates a dependency on mental health screening. Option C incorrectly restricts palliative care to post-surgical patients only. Option D fabricates an unrelated dependency on wearable data.

    **Concept Tested:** Palliative Care

---

#### 10. Why does the chapter insist on keeping Neurodiversity structurally separate from the screening-and-diagnosis pathway used for a Behavioral Health Condition?

<div class="upper-alpha" markdown>
1. Because Neurodiversity nodes require a higher screening score than Behavioral Health Conditions
2. Because Neurodiversity is treated as a subtype of Substance Use Disorder
3. Because Neurodiversity always co-occurs with an elevated Readmission Risk score
4. Because treating a neurodiversity classification the same way as a screened-and-diagnosed condition, such as "screened positive for depression," would misrepresent both categories
</div>

??? question "Show Answer"
    The correct answer is **D**. Keeping Neurodiversity structurally separate prevents a graph query from accidentally treating a neurodiversity classification the same way it treats a screened-and-diagnosed behavioral health condition, which would misrepresent both. Option A fabricates a scoring requirement that does not apply to Neurodiversity at all. Option B incorrectly nests Neurodiversity under an unrelated condition category. Option C fabricates an unsupported statistical claim.

    **Concept Tested:** Neurodiversity

---
