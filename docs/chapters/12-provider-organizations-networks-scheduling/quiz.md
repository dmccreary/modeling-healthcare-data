# Quiz: Provider Organizations, Networks, and Scheduling

Test your understanding of provider organizations, networks, and scheduling with these review questions.

---

#### 1. Why is a Referral modeled as its own node rather than as a simple edge between two providers?

<div class="upper-alpha" markdown>
1. Because it never carries any properties beyond a date
2. Because a referral carries enough independent data, such as referral_date, reason_code, status, and urgency, that reducing it to a single edge would lose information
3. Because referrals cannot connect to a Patient node
4. Because Referral Inference requires a property instead of a node
</div>

??? question "Show Answer"
    The correct answer is **B**. A Referral carries enough independent data, including its date, reason code, status, and urgency, that a health system genuinely needs to track, which is why it is modeled as its own node rather than a plain edge. Option A understates the amount of data a referral actually carries. Option C is false since a Referral node connects to the patient through a FOR_PATIENT edge. Option D confuses referral modeling with an unrelated inference technique.

    **Concept Tested:** Referral

---

#### 2. What distinguishes a Medical License from a Board Certification?

<div class="upper-alpha" markdown>
1. A Medical License is voluntary, while Board Certification is legally mandatory
2. Both are identical credentials issued by the exact same governing body
3. A Medical License is a state-issued legal authorization to practice medicine, while Board Certification is a voluntary, specialty-specific credential attesting to advanced competency beyond licensure
4. A Medical License only applies to specialists, while Board Certification only applies to primary care providers
</div>

??? question "Show Answer"
    The correct answer is **C**. A Medical License is the state-issued legal authorization required to practice medicine, while a Board Certification is a voluntary credential from a specialty board attesting to advanced competency beyond the minimum required for licensure. Option A reverses which credential is mandatory versus voluntary. Option B incorrectly claims a shared issuing body. Option D fabricates a restriction to specific provider types that does not exist.

    **Concept Tested:** Board Certification

---

#### 3. What is Provider Capacity?

<div class="upper-alpha" markdown>
1. The number of patients currently attributed to a PCP's panel
2. The measured performance score of a provider across quality dimensions
3. An explicit clinical order directing a patient to another provider
4. The maximum patient volume a provider's schedule can absorb in a given period, given slot length, hours worked, and no-show rates
</div>

??? question "Show Answer"
    The correct answer is **D**. Provider Capacity is the ceiling on patient volume a schedule can absorb, computed from slot length, hours worked, and expected no-show rates. Option A describes panel size, a related but distinct concept tied to attribution. Option B describes Provider Rating. Option C describes a Referral.

    **Concept Tested:** Provider Capacity

---

#### 4. Why does a health system model network membership as an IN_NETWORK edge rather than as a property on the Provider node?

<div class="upper-alpha" markdown>
1. Because a provider can belong to more than one network simultaneously, and an edge can be repeated once per network while a property can only cleanly hold one value
2. Because properties cannot carry an effective_date value
3. Because only Facility nodes, never Provider nodes, can join a network
4. Because edges are always faster to query than properties regardless of context
</div>

??? question "Show Answer"
    The correct answer is **A**. Since a provider can belong to more than one network at once, membership needs to be an edge that can repeat once per network, rather than a property that can only cleanly hold a single value. Option B fabricates a limitation on properties that does not exist. Option C contradicts the chapter's explicit inclusion of Provider nodes as network members. Option D makes an unsupported general performance claim.

    **Concept Tested:** Provider Network

---

#### 5. Why does the graph distinguish an OPERATES edge from an AFFILIATED_WITH edge between a hospital and a clinic?

<div class="upper-alpha" markdown>
1. Because OPERATES and AFFILIATED_WITH are simply two names for the identical ownership relationship
2. Because OPERATES reflects direct ownership while AFFILIATED_WITH reflects a looser partnership, a distinction that matters for referral leakage analysis and capital investment decisions
3. Because AFFILIATED_WITH can only apply between two hospital departments
4. Because OPERATES can only apply to outpatient facilities, never to emergency departments
</div>

??? question "Show Answer"
    The correct answer is **B**. OPERATES reflects direct ownership, while AFFILIATED_WITH reflects a looser partnership, and losing that distinction would mislead both referral leakage analysis and decisions about where capital investment can be directed without separate corporate approval. Option A contradicts the chapter's explicit contrast between the two edge types. Option C and D fabricate restrictions not present in the chapter.

    **Concept Tested:** Hospital

---

#### 6. Why does modeling the ED-to-inpatient pathway as a chain of nodes, such as triage, admit decision, and unit assignment, matter more than storing a single flat encounter_type field?

<div class="upper-alpha" markdown>
1. Because a flat field is structurally incapable of storing an encounter_type value
2. Because chaining nodes eliminates the need for an Emergency Severity Index property
3. Because it lets a query trace timestamps and properties like boarding_time_hours across the pathway to answer questions such as which ESI-2 patients boarded longer than three hours, as a single traversal
4. Because Inpatient Care can only be modeled after Emergency Department records are deleted
</div>

??? question "Show Answer"
    The correct answer is **C**. Chaining triage, admit decision, and unit assignment as separate nodes with their own timestamps and properties lets a single graph query trace exactly which ESI-2 patients boarded longer than three hours and identify the responsible department, which a flat field could never answer. Option A misstates what a flat field can store. Option B incorrectly claims the ESI property becomes unnecessary. Option D fabricates a destructive dependency that does not exist.

    **Concept Tested:** Emergency Department

---

#### 7. Dr. Okafor sends 120 referrals in a quarter, and a graph query finds that only 96 of them land on an in-network specialist. What is the leakage rate for that quarter?

<div class="upper-alpha" markdown>
1. 4%
2. 96%
3. 80%
4. 20%
</div>

??? question "Show Answer"
    The correct answer is **D**. Leakage is the share of referrals that go out of network: (120 − 96) / 120 = 24/120 = 20%. Option A incorrectly divides the wrong numbers. Option B reports the in-network percentage rather than the leakage rate. Option C reports the in-network share expressed differently, still not the leakage percentage.

    **Concept Tested:** Referral

---

#### 8. A patient sees both a PCP and a specialist within a 45-day window with no explicit referral order on file, and the specialist visit's diagnosis code plausibly follows from the PCP visit's diagnosis. What is this technique for flagging a candidate referral relationship called?

<div class="upper-alpha" markdown>
1. Referral Inference
2. Provider Capacity calculation
3. Board Certification renewal
4. Network adequacy verification
</div>

??? question "Show Answer"
    The correct answer is **A**. Referral Inference flags a candidate referral from a co-occurrence pattern, such as the same patient seeing both providers within a 30- to 60-day window with a plausible diagnosis progression, in the absence of an explicit referral order. Option B, C, and D each name an unrelated concept from elsewhere in the chapter that has nothing to do with inferring referral relationships from co-occurrence.

    **Concept Tested:** Referral Inference

---

#### 9. A cardiologist's schedule offers 128 theoretical weekly slots, trimmed to 115 realistically fillable slots after accounting for no-shows, and 113 of those slots are already booked. What is the resulting utilization rate, rounded to the nearest whole percent?

<div class="upper-alpha" markdown>
1. 88%
2. 98%
3. 113%
4. 65%
</div>

??? question "Show Answer"
    The correct answer is **B**. Utilization rate is booked slots divided by realistic capacity: 113 / 115 ≈ 0.98, or 98%. Option A incorrectly divides against the theoretical 128 slots instead of the realistic 115. Option C incorrectly treats booked slots as exceeding capacity. Option D applies an unrelated calculation that does not match either number given.

    **Concept Tested:** Provider Capacity

---

#### 10. Why does the chapter argue that a raw Provider Rating quality score cannot be compared meaningfully across two providers without also considering Provider Specialization?

<div class="upper-alpha" markdown>
1. Because Provider Rating scores are recalculated every time a referral is inferred
2. Because Provider Specialization is stored only as an edge, while Provider Rating can only ever be a node
3. Because a raw quality score means little without knowing which patient population and procedure mix produced it, so comparing a primary care panel's score directly against a transplant surgeon's would be misleading
4. Because only specialists are permitted to have a Provider Rating at all
</div>

??? question "Show Answer"
    The correct answer is **C**. A quality score depends heavily on the complexity of the patient population and procedure mix behind it, so comparing scores across very different specializations without that context invites a misleading apples-to-oranges comparison. Option A fabricates an unrelated recalculation trigger. Option B invents a storage restriction not described in the chapter. Option D contradicts the chapter's own PCP rating example.

    **Concept Tested:** Provider Specialization

---
