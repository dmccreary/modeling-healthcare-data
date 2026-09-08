# Quiz: Healthcare Fraud Patterns and Detection

Test your understanding of healthcare fraud patterns and detection with these review questions.

---

#### 1. What is healthcare fraud?

<div class="upper-alpha" markdown>
1. Overutilization of healthcare resources with no deceptive intent behind it
2. Provider practices inconsistent with accepted standards, without deliberate deception
3. A physician's genuine, if outdated, clinical judgment about testing frequency
4. The intentional deception or misrepresentation of facts to obtain an unauthorized healthcare payment
</div>

??? question "Show Answer"
    The correct answer is **D**. Healthcare fraud requires intentional deception or misrepresentation to obtain an unauthorized payment, distinguishing it legally and analytically from waste and abuse. Option A describes waste in healthcare. Option B describes abuse. Option C describes a scenario the chapter classifies as waste, not fraud.

    **Concept Tested:** Healthcare Fraud

---

#### 2. What is upcoding?

<div class="upper-alpha" markdown>
1. Billing for a service that was never actually provided
2. Billing for a more expensive service or a higher severity level than what was actually provided
3. Billing the same service more than once
4. An illegal payment made in exchange for patient referrals
</div>

??? question "Show Answer"
    The correct answer is **B**. Upcoding bills for a more expensive service or higher severity level than what was actually delivered, such as billing a brief visit under a code reserved for a complex evaluation. Option A describes phantom billing. Option C describes a duplicate claim. Option D describes a kickback scheme.

    **Concept Tested:** Upcoding

---

#### 3. What is a duplicate claim?

<div class="upper-alpha" markdown>
1. The same service billed more than once, whether through a genuine data-entry error or a deliberate attempt to collect payment twice
2. Separately billing the individual components of a procedure that should be billed together
3. An illegal payment made in exchange for ordering a specific service or supply
4. A claim flagged by anomaly detection as statistically unusual compared to peers
</div>

??? question "Show Answer"
    The correct answer is **A**. A duplicate claim bills the same service more than once, and graph analytics distinguishes an honest error from deliberate double-billing by checking whether duplicates cluster around a single provider or scatter randomly. Option B describes unbundling. Option C describes a kickback scheme. Option D describes the output of an unrelated detection technique, not the duplicate claim pattern itself.

    **Concept Tested:** Duplicate Claim

---

#### 4. How does abuse differ from fraud?

<div class="upper-alpha" markdown>
1. Abuse always results in criminal prosecution, while fraud results only in civil penalties
2. Abuse and fraud are legally identical terms describing the same behavior
3. Abuse involves practices inconsistent with accepted medical, business, or fiscal standards that cause unnecessary cost, without the deliberate deception that would elevate the behavior to fraud
4. Abuse only ever applies to durable medical equipment claims
</div>

??? question "Show Answer"
    The correct answer is **C**. Abuse targets practices inconsistent with accepted standards that cause unnecessary cost, but without the deliberate deception required for fraud, which is why the two carry different legal consequences. Option A reverses which category triggers criminal prosecution. Option B contradicts the chapter's explicit legal distinction. Option D fabricates an unsupported restriction to one equipment category.

    **Concept Tested:** Abuse Detection

---

#### 5. Why can community detection mistakenly treat a fraud ring the same way it treats a legitimate disease cohort?

<div class="upper-alpha" markdown>
1. Because the Louvain algorithm cannot process a claims graph at all
2. Because a fraud ring never forms a densely connected cluster
3. Because legitimate disease cohorts never share the same specialists or medications
4. Because a fraud ring disguises itself by mimicking the same density pattern as a legitimate cohort, just organized around an illegitimate principle like shared ownership or a kickback arrangement instead of a shared medical condition
</div>

??? question "Show Answer"
    The correct answer is **D**. A fraud ring's cluster forms around an illegitimate organizing principle rather than a genuine shared condition, but produces the same dense connectivity signature the algorithm cannot distinguish without human investigation. Option A is false since community detection is specifically applied to claims graphs. Option B contradicts the core mechanism that makes fraud rings detectable in the first place. Option C contradicts the chapter's description of legitimate disease cohorts.

    **Concept Tested:** Community Detection

---

#### 6. Why does a single billing pattern, such as elevated stress-test volume, fail to prove which of fraud, waste, or abuse actually occurred?

<div class="upper-alpha" markdown>
1. Because stress tests can never be billed fraudulently under any circumstances
2. Because all three categories, fraud, waste, and abuse, can produce an identical anomalous statistic, so determining which explanation applies requires investigation beyond the pattern itself
3. Because anomaly detection is designed to flag only waste, never fraud or abuse
4. Because elevated procedure volume is always conclusive evidence of a kickback scheme
</div>

??? question "Show Answer"
    The correct answer is **B**. The chapter's three-cardiologist example shows that fraud, waste, and abuse can each independently produce the identical elevated statistic, so a graph-detected anomaly can only flag the pattern, not determine which explanation applies. Option A contradicts the chapter's own example. Option C incorrectly restricts anomaly detection to only one category. Option D overstates a single statistic into conclusive proof of one specific scheme.

    **Concept Tested:** Anomaly Detection

---

#### 7. A $400 bundled procedure is billed instead as three separate component codes totaling $650. What fraud pattern does this represent?

<div class="upper-alpha" markdown>
1. Unbundling
2. Upcoding
3. Phantom billing
4. A duplicate claim
</div>

??? question "Show Answer"
    The correct answer is **A**. Unbundling deliberately fragments a lower-priced bundled procedure into separately billed components that together exceed the bundled price, exactly as in this $400-to-$650 example. Option B describes billing a single higher-severity code, not separate components. Option C describes billing for a service never delivered at all. Option D describes billing the same service more than once.

    **Concept Tested:** Unbundling

---

#### 8. A DME supplier receives nearly all of its referrals from just one or two physicians, one of whom is a podiatrist ordering power wheelchairs outside typical practice patterns, and patient addresses cluster suspiciously. What does this combination of signals suggest?

<div class="upper-alpha" markdown>
1. A single red flag that, on its own, proves fraud beyond any doubt
2. Nothing suspicious at all, since DME orders never require physician review
3. Converging red flags, referral concentration, specialty mismatch, and address clustering, that together are a strong indicator worth investigating, even though no single flag alone proves fraud
4. Conclusive evidence that immediately qualifies for criminal prosecution without further investigation
</div>

??? question "Show Answer"
    The correct answer is **C**. No single DME red flag proves fraud on its own, but converging signals across referral concentration, specialty mismatch, and address clustering together form a strong indicator warranting investigation. Option A and D both overstate what any single or combined signal can conclusively prove without investigation. Option B contradicts the chapter's description of physician orders as central to DME fraud risk.

    **Concept Tested:** DME Fraud

---

#### 9. A "body broker" recruits out-of-state patients with favorable out-of-network insurance in exchange for a per-patient kickback, and the facility over-orders urine drug screens from an affiliated lab. Which graph analytics techniques are best suited to surface this scheme?

<div class="upper-alpha" markdown>
1. Shortest path algorithm and clustering coefficient alone
2. Cosine similarity between symptom vectors
3. Minimum spanning tree computation
4. Referral network analysis and community detection, which surface the referral reciprocity and closed financial kickback loops this scheme produces
</div>

??? question "Show Answer"
    The correct answer is **D**. Referral network analysis and community detection are specifically built to surface referral reciprocity and closed financial kickback loops, exactly the structural signature this behavioral health fraud scheme produces. Option A, B, and C each name techniques from earlier chapters that are not the tools this chapter identifies for detecting kickback-driven fraud rings.

    **Concept Tested:** Behavioral Health Fraud

---

#### 10. Why does the chapter argue that a relational, row-based claim review misses fraud patterns that a graph database catches more easily?

<div class="upper-alpha" markdown>
1. Because relational databases are structurally incapable of storing claims data
2. Because fraud reveals itself in the shape of relationships between claims and providers over time, which a graph walks via already-stored edges while a relational query must reconstruct through expensive joins every time it runs
3. Because relational databases only support single-table queries and nothing else
4. Because graph databases eliminate the need for anomaly detection entirely
</div>

??? question "Show Answer"
    The correct answer is **B**. Fraud is a structural property of relationships between claims and providers, and a graph database walks those relationships via already-stored edges, while a relational system must reconstruct the same network with expensive joins every time. Option A is factually false, since relational databases routinely store claims data. Option C overstates relational database limitations. Option D contradicts the chapter's description of anomaly detection as one of several complementary techniques still needed.

    **Concept Tested:** Fraud Detection

---
