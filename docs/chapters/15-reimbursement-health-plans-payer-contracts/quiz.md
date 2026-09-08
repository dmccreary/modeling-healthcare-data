# Quiz: Reimbursement, Health Plan Types, and Payer Contracts

Test your understanding of reimbursement, health plan types, and payer contracts with these review questions.

---

#### 1. What is the allowed amount?

<div class="upper-alpha" markdown>
1. The negotiated maximum amount a payer recognizes as payable for a procedure code, against which cost-sharing is calculated, rather than the billed charge
2. The dollar amount a payer pays a third party after a car accident
3. A statement sent to a member itemizing what a plan paid
4. The federal program that insures people age 65 and older
</div>

??? question "Show Answer"
    The correct answer is **A**. The allowed amount is the contractually negotiated maximum a payer recognizes as payable, and every cost-sharing calculation, such as deductibles and coinsurance, runs against this amount rather than the provider's billed charge. Option B describes subrogation. Option C describes an explanation of benefits. Option D describes Medicare.

    **Concept Tested:** Allowed Amount

---

#### 2. What is subrogation?

<div class="upper-alpha" markdown>
1. A statement sent to a provider itemizing paid and denied claims
2. A federal insurance program for low-income individuals and families
3. The payer's right to recover a paid claim directly from a liable third party or their insurer when an injury was caused by that third party
4. The process of determining payment order between two policies covering the same member
</div>

??? question "Show Answer"
    The correct answer is **C**. Subrogation lets a payer recover a claim payment from a liable third party, such as by placing a legal lien against a settlement, rather than absorbing a cost it never should have had to cover. Option A describes an electronic remittance advice. Option B describes Medicaid. Option D describes coordination of benefits, a related but distinct concept.

    **Concept Tested:** Subrogation

---

#### 3. How does an HMO differ from a PPO in network and referral requirements?

<div class="upper-alpha" markdown>
1. An HMO allows out-of-network care at the same coinsurance rate as a PPO
2. An HMO requires a PCP referral before specialist visits and generally does not cover out-of-network care except emergencies, while a PPO requires no referral and covers out-of-network care at a higher coinsurance rate
3. A PPO requires a PCP referral before specialist visits, while an HMO does not
4. Both plan types are defined by requiring a high deductible before the plan begins paying
</div>

??? question "Show Answer"
    The correct answer is **B**. An HMO requires a PCP referral and generally excludes out-of-network coverage except in emergencies, while a PPO requires no referral and covers out-of-network care at a higher coinsurance rate, in exchange for a higher premium. Option A contradicts the HMO's tighter network restriction. Option C reverses which plan type requires a referral. Option D describes a high-deductible health plan, a separate, independent dimension.

    **Concept Tested:** Health Maintenance Organization

---

#### 4. Why does a dual-eligible member typically end up with $0 out of pocket after a covered service?

<div class="upper-alpha" markdown>
1. Because dual eligibility eliminates the need for any coordination of benefits
2. Because Medicaid always pays first, before Medicare has processed the claim
3. Because the No Surprises Act blocks all cost-sharing for dual-eligible members
4. Because Medicare acts as the primary payer and Medicaid, as secondary payer, picks up the deductible and coinsurance that would otherwise fall to the member
</div>

??? question "Show Answer"
    The correct answer is **D**. Medicare pays first as the primary payer, and Medicaid, acting as secondary payer, picks up the remaining deductible and coinsurance, leaving the dual-eligible beneficiary with no out-of-pocket cost. Option A contradicts the fact that this is itself a coordination-of-benefits pattern. Option B reverses the actual payment order. Option C misapplies an unrelated federal law to this scenario.

    **Concept Tested:** Dual Eligibility

---

#### 5. Why is "in-network" versus "out-of-network" status modeled as a property of the Payer Contract edge rather than as a flag on the Provider node?

<div class="upper-alpha" markdown>
1. Because the same provider can be in-network for one payer while simultaneously out-of-network for a different payer, making network status a property of a specific provider-payer pair, not the provider alone
2. Because providers are not permitted to carry any properties in a labeled property graph
3. Because network status changes only once per decade for any given provider
4. Because the No Surprises Act requires network status to be stored only on the Member node
</div>

??? question "Show Answer"
    The correct answer is **A**. A single provider can be in-network for one payer and out-of-network for another simultaneously, so network status belongs on the relationship between a specific provider and a specific payer, not as a single flag on the provider. Option B is false since provider nodes carry many other properties. Option C fabricates an unsupported stability claim. Option D misapplies an unrelated federal law to storage design.

    **Concept Tested:** In-Network Provider

---

#### 6. A cardiologist's office visit is billed at $250, and the in-network allowed amount is $180 with 20% coinsurance. How much coinsurance does the member owe?

<div class="upper-alpha" markdown>
1. $50, calculated as 20% of the billed charge
2. $36, calculated as 20% of the allowed amount
3. $180, the full allowed amount
4. $14, calculated as 20% of the difference between billed and allowed
</div>

??? question "Show Answer"
    The correct answer is **B**. Coinsurance is always calculated against the allowed amount, not the billed charge, so 20% of $180 is $36. Option A incorrectly applies coinsurance to the higher billed charge. Option C incorrectly treats the full allowed amount as the member's responsibility. Option D applies coinsurance to an irrelevant intermediate figure.

    **Concept Tested:** Allowed Amount

---

#### 7. A patient's cardiologist leaves her payer's network mid-year. On her next visit for identical care, what changes in the claims graph?

<div class="upper-alpha" markdown>
1. Nothing changes, since allowed amounts apply regardless of network status
2. The visit becomes ineligible for any coverage whatsoever
3. The claim is automatically rerouted through Medicaid as a secondary payer
4. No Payer Contract edge connects the provider to the payer, so there is no negotiated allowed amount, and the patient may face a balance bill for the difference between the billed charge and whatever the payer recognizes
</div>

??? question "Show Answer"
    The correct answer is **D**. Without a Payer Contract edge, there is no negotiated allowed amount to apply, exposing the patient to a balance bill for the gap between the billed charge and whatever the payer recognizes. Option A contradicts the entire point of the allowed amount depending on an active contract. Option B overstates the consequence; the plan may still provide some out-of-network coverage. Option C fabricates an unrelated automatic Medicaid rerouting.

    **Concept Tested:** Out-Of-Network Provider

---

#### 8. A provider's front desk runs an eligibility verification check before an appointment using the X12 270 transaction. What does the corresponding X12 271 response typically return?

<div class="upper-alpha" markdown>
1. The provider's malpractice-risk score
2. The formulary tier assigned to a specific drug
3. Active coverage status and current accumulator balances, such as deductible-met and OOP-max-remaining amounts
4. The final adjudicated payment amount for a claim that has not yet been submitted
</div>

??? question "Show Answer"
    The correct answer is **C**. The X12 271 response reports active coverage status along with current accumulator balances, letting the front desk estimate the patient's cost-sharing responsibility before care is delivered. Option A and B name unrelated data not returned by an eligibility check. Option D is impossible, since adjudication cannot occur before a claim has even been submitted.

    **Concept Tested:** Eligibility Verification

---

#### 9. Why does a benefit accumulator create a data-modeling challenge when a member switches employers, and therefore policies, mid-year?

<div class="upper-alpha" markdown>
1. Because accumulators are automatically deleted whenever a member's policy changes
2. Because a new payer has no visibility into deductible dollars already accumulated under the old policy, requiring a manual import of the prior accumulator balance for the cost-sharing estimate to remain accurate
3. Because a new payer automatically inherits the old payer's exact accumulator balance without any manual step
4. Because benefit accumulators only apply to Medicare and Medicaid members
</div>

??? question "Show Answer"
    The correct answer is **B**. A new payer cannot see accumulator progress from a prior policy, so it must manually import the prior balance for cost-sharing estimates to remain accurate, a migration problem that recurs for every member switching plans on every renewal date. Option A and C both mischaracterize how accumulator continuity actually works across a policy change. Option D incorrectly restricts accumulators to government programs only.

    **Concept Tested:** Benefit Accumulator

---

#### 10. Why does the chapter emphasize that network adequacy is a requirement about a network's overall "shape" rather than about any single contract's soundness?

<div class="upper-alpha" markdown>
1. Because network adequacy only evaluates a single provider's malpractice-risk score
2. Because network adequacy rules apply exclusively to out-of-network balance billing
3. Because a payer could have perfectly sound individual contracts yet still violate network adequacy if it has not built enough in-network providers of enough specialties within reasonable reach of members
4. Because network adequacy is calculated entirely from a provider's board certification status
</div>

??? question "Show Answer"
    The correct answer is **C**. A payer can satisfy network adequacy only by ensuring the overall network includes enough providers of enough specialties within reasonable distance, a property of the network's shape, even if every individual contract it holds is otherwise sound. Option A and D each misattribute network adequacy to an unrelated individual-provider metric. Option B incorrectly narrows network adequacy to only the balance-billing scenario.

    **Concept Tested:** Network Adequacy

---
