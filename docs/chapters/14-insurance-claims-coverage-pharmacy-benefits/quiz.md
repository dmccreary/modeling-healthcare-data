# Quiz: Insurance Claims, Coverage, and Pharmacy Benefits

Test your understanding of insurance claims, coverage, and pharmacy benefits with these review questions.

---

#### 1. What is a deductible?

<div class="upper-alpha" markdown>
1. A fixed dollar amount paid for a specific service regardless of the billed charge
2. The amount a member must pay out of pocket for covered services before the plan begins paying its share
3. The periodic payment that keeps a policy active
4. The single dollar ceiling beyond which the plan pays 100% of covered costs
</div>

??? question "Show Answer"
    The correct answer is **B**. A deductible is the amount a member pays out of pocket for covered services before the plan begins paying its share at all, effectively self-insuring the member for routine care until it is met. Option A describes a copayment. Option C describes a premium. Option D describes the out-of-pocket maximum.

    **Concept Tested:** Deductible

---

#### 2. What is claim processing?

<div class="upper-alpha" markdown>
1. The payer's coverage-and-payment decision that calculates what will be paid
2. A formal request to re-review a denial decision
3. A payer-approved list of covered drugs organized into cost tiers
4. The administrative pipeline that validates a claim's format, confirms member eligibility, and checks network status before adjudication occurs
</div>

??? question "Show Answer"
    The correct answer is **D**. Claim processing validates the claim's format, confirms eligibility on the date of service, and checks network status, running automated edits before the claim ever reaches adjudication. Option A describes claim adjudication, the next stage. Option B describes a claim dispute. Option C describes a formulary, an unrelated pharmacy concept.

    **Concept Tested:** Claim Processing

---

#### 3. What is a Pharmacy Benefit Manager (PBM)?

<div class="upper-alpha" markdown>
1. A third-party organization that negotiates drug prices and rebates, builds and maintains formularies, and processes pharmacy claims in real time at the point of sale
2. A government agency that sets ICD-10 diagnosis codes
3. An internal payer department that only handles claim disputes
4. A synonym for a benefit plan
</div>

??? question "Show Answer"
    The correct answer is **A**. A PBM negotiates drug prices and rebates with manufacturers, builds formularies on behalf of payers, and processes pharmacy claims within the seconds a patient stands at the pharmacy counter. Option B confuses a PBM with an unrelated coding authority. Option C incorrectly limits its role to disputes only. Option D conflates two distinct concepts the chapter defines separately.

    **Concept Tested:** Pharmacy Benefit Manager

---

#### 4. Why does a graph model separate a Policy node from a BenefitPlan node rather than storing coverage details directly on each policy?

<div class="upper-alpha" markdown>
1. Because policies are not permitted to carry any properties in a labeled property graph
2. Because a benefit plan can only ever be referenced by exactly one policy at a time
3. Because many different policies can reference the same benefit plan, so updating a coverage rule touches one shared node instead of millions of individual policy rows
4. Because coverage rules change every single time a claim is adjudicated
</div>

??? question "Show Answer"
    The correct answer is **C**. Since a large payer might administer millions of policies built on only a few hundred distinct benefit-plan designs, storing coverage rules once on the shared BenefitPlan node means an update touches one node instead of millions of policy rows. Option A is false since policies do carry properties. Option B contradicts the chapter's explicit point that many policies share one plan. Option D fabricates an unrelated trigger for coverage changes.

    **Concept Tested:** Benefit Plan

---

#### 5. What is the difference between claim processing and claim adjudication?

<div class="upper-alpha" markdown>
1. Processing and adjudication are two names for the identical step in the claims lifecycle
2. Processing asks whether a claim is valid and eligible, while adjudication calculates what dollar amount gets paid and what the member owes
3. Adjudication always happens before processing in every claims pipeline
4. Processing only applies to pharmacy claims, while adjudication only applies to medical claims
</div>

??? question "Show Answer"
    The correct answer is **B**. Processing asks yes-or-no eligibility and validity questions, while adjudication performs the actual payment arithmetic against coverage, prior authorization, and accumulator data. Option A contradicts the chapter's explicit two-stage pipeline. Option C reverses the actual sequence, since a claim must pass processing before adjudication. Option D fabricates an unsupported restriction to specific claim types.

    **Concept Tested:** Claim Adjudication

---

#### 6. Why is a claim denial different from a claim rejection?

<div class="upper-alpha" markdown>
1. A rejection and a denial both require a formal dispute process to resolve
2. A denial can simply be corrected and resubmitted as a brand-new claim
3. A rejection is a payer's coverage decision made only after full adjudication
4. A rejected claim never completes processing due to a data or format error and is simply corrected and resubmitted, while a denied claim has already been adjudicated and requires a formal dispute rather than resubmission
</div>

??? question "Show Answer"
    The correct answer is **D**. A rejected claim fails before completing processing and is corrected and resubmitted, while a denied claim has already passed through adjudication and requires a formal dispute, not a resubmission, to be revisited. Option A incorrectly requires a dispute for both categories. Option B and C each reverse which category, rejection or denial, corresponds to resubmission versus adjudication.

    **Concept Tested:** Claim Denial

---

#### 7. Maria's plan has a $1,500 deductible and 20% coinsurance after the deductible is met. Her first visit of the year costs $200, and her deductible accumulator is currently at $0. How much does she pay for this visit?

<div class="upper-alpha" markdown>
1. $200, the full amount, since her deductible accumulator was at $0 and the visit cost is fully applied toward it
2. $40, calculated as 20% coinsurance on the full charge
3. $0, since the plan pays first and the deductible resets afterward
4. $1,500, the full annual deductible amount
</div>

??? question "Show Answer"
    The correct answer is **A**. Because Maria has not yet met any of her deductible, she pays the full $200 out of pocket, and that amount is applied toward her $1,500 deductible accumulator. Option B incorrectly applies coinsurance before the deductible has been met. Option C reverses the actual payment responsibility before the deductible is satisfied. Option D confuses the visit cost with the full annual deductible target.

    **Concept Tested:** Deductible

---

#### 8. A member's OOP accumulator is at $2,040 out of a $6,000 maximum, and a new claim generates a $3,000 coinsurance share. What happens?

<div class="upper-alpha" markdown>
1. $6,000 of room remains, and the claim is fully capped at $0
2. $2,040 of room remains, and the claim is not capped at all
3. $3,960 of room remains, and since $3,000 is less than that remaining room, the member pays the full $3,000 without being capped
4. $960 of room remains, and the member pays only $960
</div>

??? question "Show Answer"
    The correct answer is **C**. Remaining room is $6,000 − $2,040 = $3,960, and since the $3,000 coinsurance share is less than that remaining room, the member pays the full $3,000, bringing the accumulator to $5,040. Option A miscalculates the remaining room as the full maximum. Option B uses the already-spent amount as if it were the remaining room. Option D applies an incorrect remaining-room figure.

    **Concept Tested:** Out-Of-Pocket Maximum

---

#### 9. Maria's cardiologist wants to prescribe brand-name Lipitor, but her formulary requires generic atorvastatin be tried first. What graph pattern represents this formulary rule?

<div class="upper-alpha" markdown>
1. A COVERS edge running directly from the BenefitPlan node to the Lipitor node
2. A STEP_THERAPY_BEFORE edge running from the generic drug node to the brand drug node
3. A FILED_CLAIM_AGAINST edge running from the prescriber to the PBM
4. An ENROLLED_IN edge running from the member to the formulary
</div>

??? question "Show Answer"
    The correct answer is **B**. Step therapy is modeled as a STEP_THERAPY_BEFORE edge from the generic drug node to the brand drug node, layered on top of the shared therapeutic-class and alternative-drug relationships. Option A describes plan-level coverage, not the step-therapy condition. Option C confuses this scenario with an unrelated malpractice-style edge. Option D misapplies an enrollment edge type to a formulary relationship.

    **Concept Tested:** Formulary Rule

---

#### 10. Why does a graph-based claims engine implement processing and adjudication as two separate traversal stages rather than one combined step?

<div class="upper-alpha" markdown>
1. Because a claim can only be traversed once per calendar year
2. Because adjudication always occurs before a claim is even submitted
3. Because processing and adjudication rely on node labels that can never appear in the same graph
4. Because processing asks whether the claim is valid and eligible, while adjudication performs the payment calculation, and conflating the two would blur two conceptually distinct checks over different parts of the graph
</div>

??? question "Show Answer"
    The correct answer is **D**. Keeping processing (validity and eligibility) and adjudication (payment calculation) as separate traversal stages preserves a clear conceptual boundary between two distinct kinds of checks, each touching different parts of the graph. Option A fabricates an unrelated frequency restriction. Option B reverses the actual sequence of the claims lifecycle. Option C overstates a structural restriction that does not exist between the two stages.

    **Concept Tested:** Claim Processing

---
