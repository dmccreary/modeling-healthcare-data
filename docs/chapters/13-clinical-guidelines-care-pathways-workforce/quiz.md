# Quiz: Clinical Guidelines, Care Pathways, and Provider Workforce

Test your understanding of clinical guidelines, care pathways, and the provider workforce with these review questions.

---

#### 1. What is a Clinical Protocol?

<div class="upper-alpha" markdown>
1. A published recommendation issued by a professional society or government body
2. The disciplined practice of grounding clinical decisions in published research
3. A specific, codified, step-by-step sequence of actions for one concrete clinical scenario, detailed enough to execute without further interpretation
4. A patient-facing satisfaction score drawn from post-visit surveys
</div>

??? question "Show Answer"
    The correct answer is **C**. A Clinical Protocol is the executable, scenario-specific version of a care pathway, detailed enough that a provider or graph query can follow it directly. Option A describes a Clinical Guideline, a higher, more general level in the hierarchy. Option B describes Evidence-Based Medicine, the research foundation behind guidelines. Option D describes Provider Rating, an unrelated patient-facing measure.

    **Concept Tested:** Clinical Protocol

---

#### 2. What is Provider Attrition?

<div class="upper-alpha" markdown>
1. The rate at which providers leave an organization or network over time
2. The verification workflow required before a provider is granted hospital privileges
3. A temporary, contracted clinician hired to cover a short-term staffing gap
4. A composite score combining outcomes, cost efficiency, and guideline adherence
</div>

??? question "Show Answer"
    The correct answer is **A**. Provider Attrition tracks the rate at which providers leave an organization or network, allowing staffing models to anticipate gaps before they become emergencies. Option B describes the Credentialing Process, a different workforce concept. Option C describes a Locum Tenens provider. Option D describes Provider Performance.

    **Concept Tested:** Provider Attrition

---

#### 3. How does a Case Manager differ from a Care Manager?

<div class="upper-alpha" markdown>
1. Both roles are identical and interchangeable in every graph model
2. A Care Manager is provider-side and coordinates one patient's complex care across settings, while a Case Manager is payer-side and focuses on utilization outreach
3. A Case Manager can only coordinate care for patients treated exclusively by Nurse Practitioners
4. A Case Manager coordinates one patient's overall care across settings on the provider side, while a Care Manager is typically payer-employed, focusing on utilization and wellness outreach across a membership
</div>

??? question "Show Answer"
    The correct answer is **D**. A Case Manager, connected by a MANAGES_CASE_FOR edge, coordinates one patient's overall care on the provider side, while a Care Manager, connected by a COORDINATES_CARE_FOR edge, is typically payer-employed and focuses on utilization and wellness outreach across a membership. Option A ignores the chapter's explicit distinction between the two roles. Option B reverses which role is provider-side versus payer-side. Option C fabricates an unrelated restriction to Nurse Practitioners.

    **Concept Tested:** Case Manager

---

#### 4. How does Provider Performance differ from Provider Rating?

<div class="upper-alpha" markdown>
1. They are identical scores computed from exactly the same input data
2. Provider Performance is an internal composite of clinical-quality metrics, outcomes, cost efficiency, and guideline adherence used for compensation and quality-improvement decisions, while Provider Rating is a patient-facing satisfaction score
3. Provider Rating is used only for malpractice-risk calculations
4. Provider Performance is shown directly to patients in a directory listing, while Provider Rating is kept strictly internal
</div>

??? question "Show Answer"
    The correct answer is **B**. Provider Performance is an internal composite used for compensation and quality-improvement decisions, while Provider Rating is the patient-facing satisfaction score drawn from post-visit surveys, and the two can diverge sharply for the same provider. Option A contradicts this explicit distinction. Option C misapplies Provider Rating to an unrelated malpractice calculation. Option D reverses which score is patient-facing versus internal.

    **Concept Tested:** Provider Performance

---

#### 5. Why does a health system model a Nurse Practitioner's or Physician Assistant's prescribing authority as a property on the PRESCRIBES_FOR edge rather than as a fixed fact about the provider?

<div class="upper-alpha" markdown>
1. Because prescribing authority never varies and is identical in every state
2. Because only physicians are legally permitted to prescribe medication
3. Because scope of practice is a legal fact that varies by state, so a requires_supervision property populated from the encounter's state lets a single query determine whether a co-signature is needed
4. Because Physician Assistants are not permitted to hold a SUPERVISED_BY edge
</div>

??? question "Show Answer"
    The correct answer is **C**. Scope of practice varies by state, so storing a requires_supervision property on the PRESCRIBES_FOR edge, populated from the state where the encounter occurred, lets a single graph query determine co-signature requirements without an external lookup table. Option A contradicts the chapter's explicit point about state-by-state variation. Option B is false since Nurse Practitioners and Physician Assistants can also prescribe. Option D contradicts the chapter's description of the Physician Assistant relationship.

    **Concept Tested:** Nurse Practitioner

---

#### 6. The chapter warns against using a high case-mix complexity component of a malpractice-risk score in which way?

<div class="upper-alpha" markdown>
1. As one input among several that feed a proactive risk-management outreach flag
2. As justification for punishing specialists who take the hardest patients in compensation or credentialing decisions, without accounting for case complexity
3. As a factor in computing a provider's specialty-risk baseline
4. As part of recalculating the composite score when a new claim is filed
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter explicitly warns that feeding a raw malpractice-risk score into a compensation or credentialing decision without accounting for case-mix complexity would quietly punish specialists willing to take the hardest patients. Option A describes a legitimate, intended use of the score. Option C and D describe normal parts of how the score is computed, not a misuse the chapter warns against.

    **Concept Tested:** Malpractice Risk

---

#### 7. A Locum Tenens provider is brought in to cover a rural emergency department's overnight shifts for six weeks. How is this assignment typically modeled in the graph, compared to a permanent hire?

<div class="upper-alpha" markdown>
1. As a time-bounded WORKS_AT edge carrying start and end dates, rather than an open-ended edge
2. As an open-ended WORKS_AT edge identical to a permanent hire's
3. As a CONSULT_FOR edge to every patient in the department
4. As a FILED_CLAIM_AGAINST edge
</div>

??? question "Show Answer"
    The correct answer is **A**. A locum tenens assignment is modeled as a time-bounded WORKS_AT edge carrying start and end dates, distinguishing it from the open-ended edge a permanent hire receives. Option B contradicts the chapter's explicit distinction between temporary and permanent staffing edges. Option C confuses staffing assignment with an unrelated clinical consultation edge. Option D confuses staffing with an unrelated malpractice-claims edge.

    **Concept Tested:** Locum Tenens

---

#### 8. A quality-improvement team wants to detect where a patient's actual chest-pain evaluation departed from the expected clinical protocol. What graph-based technique enables this?

<div class="upper-alpha" markdown>
1. Comparing patient satisfaction survey scores to guideline-adherence percentages
2. Recomputing the provider's malpractice-risk score
3. Checking whether the provider holds an active Board Certification
4. Walking the patient's actual sequence of timestamped encounter edges and comparing it against the protocol's expected sequence and time targets, flagging any edge that is missing, out of order, or outside its expected window
</div>

??? question "Show Answer"
    The correct answer is **D**. Detecting a Clinical Pathway Variance means comparing the patient's actual timestamped encounter sequence against the protocol's expected sequence and time targets, flagging any deviation. Option A compares unrelated satisfaction and adherence metrics rather than the actual care sequence. Option B and C check unrelated provider-level properties that do not reveal a deviation from the protocol's expected sequence.

    **Concept Tested:** Clinical Pathway Variance

---

#### 9. Why can a graph query accurately answer "who is on this patient's care team right now" even when the team spans many departments?

<div class="upper-alpha" markdown>
1. Because a relational join table already answers this question with equal precision
2. Because every provider on the team must share the same Provider Specialization
3. Because a single traversal from the patient node following every incoming MANAGES_CARE, CONSULT_FOR, SUPPORT, and COORDINATE edge finds the full team regardless of how many departments those professionals report to
4. Because the Provider Directory automatically filters out anyone not actively treating the patient
</div>

??? question "Show Answer"
    The correct answer is **C**. A single traversal following every incoming MANAGES_CARE, CONSULT_FOR, SUPPORT, and COORDINATE edge finds the complete team regardless of departmental boundaries, which the chapter contrasts against a flattened relational join table. Option A contradicts the chapter's explicit critique of the relational approach. Option B fabricates a shared-specialization requirement that does not exist. Option D confuses this traversal with an unrelated directory-filtering mechanism.

    **Concept Tested:** Multidisciplinary Team

---

#### 10. Why is malpractice risk modeled as a graph-computed property rather than a static, one-time underwriting number?

<div class="upper-alpha" markdown>
1. Because it eliminates the need to ever track case-mix complexity again
2. Because the score updates automatically as claims, specialty-risk baselines, and case-mix complexity change, since each input is itself a traversal over relationships already present in the graph
3. Because malpractice risk applies only to locum tenens providers
4. Because a static number cannot be stored as a graph property at all
</div>

??? question "Show Answer"
    The correct answer is **B**. Because each component of the score, prior claims, specialty risk, and case-mix complexity, is computed from a live traversal over existing graph relationships, the composite score is recomputed automatically as the underlying facts change, rather than requiring manual re-entry. Option A contradicts the ongoing role case-mix complexity plays in the score. Option C fabricates a restriction to only one provider type. Option D is factually false, since properties of any kind can be stored on a graph node.

    **Concept Tested:** Malpractice Risk

---
