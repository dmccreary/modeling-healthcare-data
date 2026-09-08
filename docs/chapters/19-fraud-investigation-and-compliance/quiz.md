# Quiz: Fraud Investigation and Compliance

Test your understanding of fraud investigation and compliance with these review questions.

---

#### 1. What is a pill mill?

<div class="upper-alpha" markdown>
1. A clinic or prescriber that issues controlled-substance prescriptions, typically opioids, with little or no legitimate medical evaluation, functioning more as a distribution point than a medical practice
2. A business entity with no genuine operations, created to launder fraudulent payments
3. A composite numeric rating combining the outputs of several detection algorithms
4. A formal filing documenting a suspicious transaction pattern
</div>

??? question "Show Answer"
    The correct answer is **A**. A pill mill issues controlled-substance prescriptions with little or no legitimate medical evaluation, detected through prescribing-volume outliers and patients traveling unusually far to reach a single prescriber. Option B describes a shell company. Option C describes a fraud risk score. Option D describes a suspicious activity report.

    **Concept Tested:** Pill Mill

---

#### 2. What is the False Claims Act?

<div class="upper-alpha" markdown>
1. A third-party auditor that reviews already-paid claims to recoup improper payments
2. A list naming providers barred from participating in federal healthcare programs
3. A federal law imposing civil, and in serious cases criminal, liability on anyone who knowingly submits a false claim for government payment, including a qui tam provision letting whistleblowers file suit on the government's behalf
4. A consolidated operational dashboard tracking fraud program performance
</div>

??? question "Show Answer"
    The correct answer is **C**. The False Claims Act imposes civil and criminal liability for knowingly submitting false claims to government programs, with treble damages and a qui tam provision rewarding whistleblowers. Option A describes a recovery audit contractor. Option B describes a sanctioned provider list. Option D describes a fraud analytics dashboard.

    **Concept Tested:** False Claims Act

---

#### 3. How does a graph-based fraud ring relate to a collusion ring?

<div class="upper-alpha" markdown>
1. They describe completely unrelated phenomena that never co-occur
2. Collusion ring is the legal and behavioral term for coordinated fraudulent cooperation, while graph-based fraud ring is the structural, graph-native counterpart describing how that same scheme appears once claims and ownership records are loaded into a connected graph
3. A graph-based fraud ring can only ever involve exactly two providers
4. A collusion ring is a subtype of shell company detection
</div>

??? question "Show Answer"
    The correct answer is **B**. The two terms describe the same underlying scheme from two vantage points: collusion ring is how a prosecutor names the coordinated behavior, and graph-based fraud ring is how that behavior appears structurally once loaded into a connected graph. Option A contradicts the chapter's explicit equivalence between the two terms. Option C fabricates a size restriction not present in the chapter. Option D confuses two distinct concepts.

    **Concept Tested:** Collusion Ring

---

#### 4. Why does examining a fraud risk score's individual components matter as much as the final composite number?

<div class="upper-alpha" markdown>
1. Because the components are always identical across every provider
2. Because only volume-driven scores are ever accurate
3. Because a fraud risk score is never actually composed of multiple algorithms
4. Because two providers with an identical overall score can carry entirely different underlying risk profiles, one driven by billing-volume anomalies and the other by network position, which changes how an investigator should approach each case
</div>

??? question "Show Answer"
    The correct answer is **D**. A volume-driven score points an investigator toward auditing individual claims, while a network-position-driven score points toward mapping a ring's other members, even when both providers share the same overall composite score. Option A and C both contradict the chapter's description of the score as a weighted composite of distinct components. Option B makes an unsupported blanket accuracy claim.

    **Concept Tested:** Fraud Risk Score

---

#### 5. Why does a recovery audit contractor's (RAC) finding not automatically count as evidence of fraud in the intent-based sense defined in Chapter 18?

<div class="upper-alpha" markdown>
1. Because RAC audits also catch honest coding errors and waste, not only fraud, so an improper-payment finding does not by itself establish the deliberate deception fraud requires
2. Because RACs are prohibited from reviewing Medicare or Medicaid claims
3. Because RAC contractors are paid a fixed government salary regardless of their findings
4. Because RAC audits only ever review claims that have not yet been paid
</div>

??? question "Show Answer"
    The correct answer is **A**. Because a RAC audit catches honest coding errors and waste alongside fraud, an improper-payment finding alone does not establish the deliberate deception that legally defines fraud. Option B is false since Medicare and Medicaid claims are exactly what RACs review. Option C contradicts the chapter's description of contingency-based compensation. Option D is factually backwards; RACs specifically review already-paid claims.

    **Concept Tested:** Recovery Audit Contractor

---

#### 6. A member's claims suddenly appear from a provider hundreds of miles from every prior claim on that same identity. Which fraud pattern does this geographic signal most directly help detect?

<div class="upper-alpha" markdown>
1. A pill mill
2. A shell company
3. Identity theft fraud
4. A recovery audit contractor's improper payment
</div>

??? question "Show Answer"
    The correct answer is **C**. A sudden geographic jump in claims on the same identity, far from every prior claim, is a pattern graph analytics uses to surface identity theft fraud. Option A and B describe unrelated fraud patterns with different detection signals. Option D describes an unrelated compliance audit finding, not a fraud pattern itself.

    **Concept Tested:** Identity Theft Fraud

---

#### 7. A billing entity was registered days before submitting its first claim, lists a residential mailing address, and has no verifiable staff. What compliance technique is specifically designed to surface this pattern?

<div class="upper-alpha" markdown>
1. Exclusion list screening
2. Shell company detection
3. Suspicious activity report filing
4. Fraud analytics dashboard review
</div>

??? question "Show Answer"
    The correct answer is **B**. Shell company detection is specifically designed to surface entities with no genuine operations, employees, or physical presence, exactly the pattern described in this scenario. Option A checks providers against sanctioned lists, an unrelated screening process. Option C and D describe downstream reporting and monitoring activities, not the detection technique itself.

    **Concept Tested:** Shell Company Detection

---

#### 8. An organization discovers, three years into an existing contract, that a vendor was added to the OIG's List of Excluded Individuals/Entities last year. What does this reveal about how exclusion list screening must be implemented?

<div class="upper-alpha" markdown>
1. Screening only needs to happen once, at the time of hire or initial contracting
2. Exclusion lists never change once a provider has passed an initial screening
3. Only newly hired employees ever need to be screened against sanctioned provider lists
4. Screening must be re-run on an ongoing schedule, not just once at hiring, since a provider can be added to a sanctioned list years into an existing relationship
</div>

??? question "Show Answer"
    The correct answer is **D**. Because a provider or vendor can be added to a sanctioned list years into an existing relationship, exclusion list screening must be repeated on an ongoing schedule rather than performed only once at hiring. Option A and C both contradict this ongoing requirement. Option B contradicts the very scenario described, where a vendor was added to a list after the relationship began.

    **Concept Tested:** Exclusion List Screening

---

#### 9. Why does the chapter describe finding a fraud ring's organizer as "a centrality problem in disguise"?

<div class="upper-alpha" markdown>
1. Because the provider with the most connections (highest degree) is not necessarily the ringleader; the organizer may instead be the node other trusted participants route through, which betweenness centrality captures rather than degree centrality
2. Because centrality measures cannot be applied to provider referral networks at all
3. Because only PageRank, never degree or betweenness centrality, is relevant to identifying fraud rings
4. Because a fraud ring's organizer is always the provider with the lowest possible degree centrality
</div>

??? question "Show Answer"
    The correct answer is **A**. Degree and betweenness centrality can diverge sharply, and a ring's actual organizer is often the node other trusted participants route through rather than the node with the most raw connections. Option B contradicts the chapter's explicit application of centrality to referral networks. Option C incorrectly excludes degree and betweenness, both discussed as relevant. Option D overstates a pattern into an absolute rule the chapter never makes.

    **Concept Tested:** Provider Network Fraud

---

#### 10. Why does a lone bad actor's fraud scheme get contained more easily than a coordinated provider network fraud scheme?

<div class="upper-alpha" markdown>
1. Because a lone bad actor's scheme is never detectable through graph analytics
2. Because provider network fraud always involves fewer total dollars than a lone actor's scheme
3. Because excluding a single provider fully contains a lone actor's scheme, while a network scheme simply reroutes its fraudulent volume through a ring member who has not yet been caught unless the entire ring is identified together
4. Because a lone bad actor cannot be prosecuted under the False Claims Act
</div>

??? question "Show Answer"
    The correct answer is **C**. A lone actor's scheme ends the moment that provider is excluded, but a network scheme can simply reroute fraudulent volume through an uncaught ring member unless the entire ring is identified and addressed together. Option A contradicts the chapter's own discussion of detecting individual fraud patterns. Option B fabricates an unsupported dollar-amount comparison. Option D contradicts the False Claims Act's applicability to any individual who knowingly submits a false claim.

    **Concept Tested:** Provider Network Fraud

---
