# Quiz: Patient Diagnosis, Treatment, and Medication

Test your understanding of patient diagnosis, treatment, and medication modeling with these review questions.

---

#### 1. What is a patient record in a labeled property graph?

<div class="upper-alpha" markdown>
1. A single row stored in a Patients table
2. The connected subgraph of nodes and edges reachable by traversing outward from a single Patient node, rather than a stored table
3. A static archive table containing only past diagnoses
4. A property attached directly to a Diagnosis node
</div>

??? question "Show Answer"
    The correct answer is **B**. In a labeled property graph, the patient record is not a join result or a stored table; it is the literal set of nodes and edges reachable by walking outward from a single Patient node. Option A describes the relational approach the chapter explicitly contrasts against. Option C incorrectly limits the record to only past events. Option D confuses the record with a single property.

    **Concept Tested:** Patient Record

---

#### 2. Where is a prescription's dosage typically stored in the graph, and what does it capture?

<div class="upper-alpha" markdown>
1. The chemical structure of the medication, stored on the Medication node
2. The patient's allergy history, stored as a property on an ALLERGIC_TO edge
3. The amount, frequency, and route of administration, stored as a property on the prescribing edge rather than on the medication node
4. The vaccine's manufacturer, stored on the Immunization node
</div>

??? question "Show Answer"
    The correct answer is **C**. Dosage captures the amount, frequency, and route of administration, and is stored on the prescribing edge because the same medication can be prescribed at different doses to different patients. Option A misassigns dosage to chemical structure, an unrelated medication property. Option B confuses dosage with allergy information. Option D describes an unrelated immunization property.

    **Concept Tested:** Dosage

---

#### 3. What distinguishes an adverse event from a drug interaction?

<div class="upper-alpha" markdown>
1. An adverse event is a distinct node capturing actual harm that occurred, its severity, and the date, while a drug interaction is a documented relationship describing how two medications can affect each other
2. A drug interaction only applies to allergies, never to pairs of medications
3. An adverse event and a drug interaction are two names for the exact same edge type
4. A drug interaction can only be recorded after an adverse event has already occurred
</div>

??? question "Show Answer"
    The correct answer is **A**. An adverse event is a node recording actual harm that happened to a patient, while a drug interaction is a relationship between two medication nodes describing how they can affect each other, which may or may not ever lead to an actual adverse event. Option B incorrectly limits drug interactions to allergies. Option C incorrectly conflates two distinct concepts. Option D reverses the actual order; interactions can be documented in advance of any harm occurring.

    **Concept Tested:** Adverse Event

---

#### 4. Why is dosage modeled as a property on the prescribing edge rather than as a fixed attribute of the medication node itself?

<div class="upper-alpha" markdown>
1. Because medication nodes are not permitted to carry any properties at all
2. Because dosage never changes once a prescription is written
3. Because every patient must receive an identical dose of a given medication
4. Because the same medication can be prescribed at different, changing doses to different patients, so the medication node itself should not change every time one patient's dose is adjusted
</div>

??? question "Show Answer"
    The correct answer is **D**. Storing dosage on the edge, rather than on the medication node, lets each patient's specific and potentially changing dose, such as a Warfarin titration, be tracked without altering the shared, reusable medication node. Option A is false since medication nodes do carry other properties like generic name and drug class. Option B contradicts the chapter's Warfarin titration example. Option C incorrectly assumes a single dose applies to every patient.

    **Concept Tested:** Dosage

---

#### 5. How does a differential diagnosis differ from a diagnosis?

<div class="upper-alpha" markdown>
1. A differential diagnosis is a permanent, unchangeable record, while a diagnosis can still be revised over time
2. A differential diagnosis is an explicitly ranked list of candidate diagnoses still open to being promoted or eliminated as evidence arrives, while a diagnosis is the conclusion a clinician has committed to
3. A differential diagnosis is a billing code, while a diagnosis is a free-text clinical note
4. A differential diagnosis only applies to immunization scheduling
</div>

??? question "Show Answer"
    The correct answer is **B**. A differential diagnosis is a ranked list of candidate explanations that remain open to being promoted, demoted, or eliminated as new evidence arrives, while a diagnosis represents the conclusion a clinician has committed to. Option A reverses which one is provisional and which is committed. Option C misapplies coding and note-taking concepts introduced elsewhere. Option D incorrectly ties differential diagnosis to an unrelated topic.

    **Concept Tested:** Differential Diagnosis

---

#### 6. Why does a graph typically retain a patient's earlier CONSIDERING edges even after a stable HAS_DIAGNOSIS edge has been added?

<div class="upper-alpha" markdown>
1. Because deleting old edges would corrupt the Patient ID property
2. Because a CONSIDERING edge is a required prerequisite before any allergy can be recorded
3. Because retaining them preserves a record of what was considered and ruled out along the way
4. Because graph databases are physically incapable of deleting edges once created
</div>

??? question "Show Answer"
    The correct answer is **C**. Retaining earlier candidate edges rather than deleting them preserves the diagnostic reasoning trail, showing what was considered and ruled out before the final diagnosis was reached. Option A fabricates an unrelated dependency on Patient ID. Option B invents a prerequisite relationship between diagnosis and allergy tracking that does not exist. Option D is factually false; graph databases can delete edges.

    **Concept Tested:** Differential Diagnosis

---

#### 7. A 68-year-old patient's prior probability of myocardial infarction is 0.15, and an elevated troponin result carries a likelihood ratio of 8. What is the unnormalized score before renormalizing against the other candidate conditions?

<div class="upper-alpha" markdown>
1. 1.2
2. 0.15
3. 8.15
4. 0.019
</div>

??? question "Show Answer"
    The correct answer is **A**. Multiplying the prior probability by the likelihood ratio gives 0.15 × 8 = 1.2, the unnormalized score that is then renormalized against the other candidates' unnormalized scores. Option B is just the prior alone, without applying the likelihood ratio. Option C incorrectly adds the two numbers instead of multiplying them. Option D incorrectly divides instead of multiplying.

    **Concept Tested:** Differential Diagnosis

---

#### 8. Diane takes Warfarin, Aspirin, and Ibuprofen, each connected to her by a TAKES edge, and all three medications carry INTERACTS_WITH edges to each other with a high severity rating. What traversal would an automated medication-safety check perform to detect this danger?

<div class="upper-alpha" markdown>
1. Traverse only the Patient node's demographic properties
2. Check the Patient ID against a master patient index
3. Query the vaccination schedule for overdue immunizations
4. Follow the patient's TAKES edges to their medication nodes and check for INTERACTS_WITH edges among that specific set of medications
</div>

??? question "Show Answer"
    The correct answer is **D**. The safety check follows the patient's TAKES edges out to their medication nodes and then checks for INTERACTS_WITH edges among that specific set, which is exactly how the graph surfaces the Warfarin, Aspirin, and Ibuprofen bleeding-risk combination. Option A checks unrelated demographic data. Option B describes identity resolution, a different process. Option C checks an unrelated immunization schedule.

    **Concept Tested:** Drug Interaction

---

#### 9. Why does modeling a drug class such as NSAIDs as its own node, connected to individual medications by an IS_A edge, make a contraindication check more effective?

<div class="upper-alpha" markdown>
1. Because it removes the need to record any allergy edges for that patient
2. Because it converts every medication node into a diagnosis node
3. Because a single contraindication written once against the drug class automatically covers every medication belonging to that class, without a separate edge needed for each one
4. Because it eliminates the need for a treatment plan
</div>

??? question "Show Answer"
    The correct answer is **C**. Connecting medications to a shared drug class node lets a single contraindication, such as one written against NSAIDs for a patient with kidney disease, automatically apply to every medication in that class without needing a separate edge for each one. Option A incorrectly claims this removes the need for allergy tracking, an unrelated safety mechanism. Options B and D fabricate unrelated structural consequences that do not follow from class modeling.

    **Concept Tested:** Medication

---

#### 10. Why does checking a new prescription against a patient's allergy edges at the moment the prescription is about to be written matter more than relying on a provider's memory?

<div class="upper-alpha" markdown>
1. Because a provider unaware of a patient's full history could otherwise prescribe a drug from a class the patient is allergic to, and a graph query checking the drug's class against existing allergy edges can block the prescription before it is signed, rather than after harm occurs
2. Because allergy edges automatically expire after one year
3. Because allergies can only be detected after a drug interaction has already caused harm
4. Because a differential diagnosis must be finalized before any allergy can be recorded
</div>

??? question "Show Answer"
    The correct answer is **A**. The graph safety check works by verifying the drug's class against the patient's existing allergy edges before the prescription is finalized, catching the danger proactively rather than depending on a provider correctly remembering or re-asking about a patient's full allergy history. Option B fabricates an expiration rule not present in the chapter. Option C reverses the actual sequence; the check happens before, not after, harm occurs. Option D invents an unrelated dependency between differential diagnosis and allergy recording.

    **Concept Tested:** Allergy

---
