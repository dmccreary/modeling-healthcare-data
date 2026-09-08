# Quiz: Data Quality, Stewardship, and Compliance

Test your understanding of data quality, stewardship, and compliance with these review questions.

---

#### 1. What is a data validation rule?

<div class="upper-alpha" markdown>
1. A composite metric expressing overall data quality as a percentage
2. An automated check applied to incoming or existing data that flags or rejects values violating a defined constraint
3. A curated, plain-language dictionary of business terms
4. A tier assigned to data based on its exposure risk if disclosed
</div>

??? question "Show Answer"
    The correct answer is **B**. A data validation rule is an automated check, such as requiring a date of birth to fall before today, that flags or rejects values violating a defined constraint. Option A describes a data quality score. Option C describes a business glossary. Option D describes data classification.

    **Concept Tested:** Data Validation Rule

---

#### 2. What is change data capture (CDC)?

<div class="upper-alpha" markdown>
1. A technique for preserving prior values alongside a timestamp when a record changes
2. A formal process of documenting evidence that data practices satisfy regulations
3. The process of safely modifying a graph's node labels or property definitions without breaking existing queries
4. A technique for detecting and streaming individual insertions, updates, and deletions from a source system the moment they happen, rather than waiting for a periodic batch reload
</div>

??? question "Show Answer"
    The correct answer is **D**. CDC streams individual data changes in near real time, such as updating a graph node's admission status within seconds of an ADT message firing. Option A describes data versioning. Option B describes regulatory compliance reporting. Option C describes schema evolution.

    **Concept Tested:** Change Data Capture

---

#### 3. How does data ownership differ from data stewardship?

<div class="upper-alpha" markdown>
1. Data ownership assigns a specific accountable party, often a business unit, for a domain's overall correctness and appropriate use, while stewardship is the hands-on work of actually fixing and maintaining that domain day to day
2. Data ownership and data stewardship are two names describing the identical role with no distinction
3. Data stewardship is always held by a business unit, while data ownership is always held by a single named analyst
4. Data ownership only applies to graph databases, while data stewardship only applies to relational databases
</div>

??? question "Show Answer"
    The correct answer is **A**. Ownership answers who is accountable if a domain's quality drops, typically a business unit, while stewardship answers who actually does the hands-on work of fixing it. Option B contradicts the chapter's explicit distinction between the two roles. Option C reverses which role is typically a business unit versus an individual. Option D fabricates an unsupported database-type restriction.

    **Concept Tested:** Data Ownership

---

#### 4. How does a business glossary differ from a technical data dictionary?

<div class="upper-alpha" markdown>
1. A business glossary defines the exact data type and valid values of a specific field, while a data dictionary defines plain-language business concepts
2. They are identical resources maintained by the same team for the same audience
3. A business glossary is a curated, plain-language dictionary of business concepts like "active patient," while a data dictionary defines the exact meaning, format, and valid values of specific fields
4. A business glossary can only be used by data governance councils, while a data dictionary can only be used by knowledge engineers
</div>

??? question "Show Answer"
    The correct answer is **C**. A business glossary gives stakeholders a shared plain-language definition of concepts, while a technical data dictionary precisely defines specific fields' format and valid values. Option A reverses these two definitions. Option B contradicts the chapter's explicit distinction. Option D fabricates unsupported usage restrictions.

    **Concept Tested:** Business Glossary

---

#### 5. Maria Chen exists as two separate, undeduplicated Patient nodes due to a slightly misspelled name on one intake form. A population-health query counts distinct diabetic patients. What effect does this duplication have on the query result?

<div class="upper-alpha" markdown>
1. It has no effect, since graph databases automatically merge similarly named nodes
2. It inflates the count, since Maria Chen is counted twice instead of once
3. It deflates the count, since duplicate nodes are automatically excluded from any query
4. It converts the query into a data validation rule automatically
</div>

??? question "Show Answer"
    The correct answer is **B**. Without deduplication, Maria Chen's two separate nodes are each counted, inflating the population estimate and distorting decisions built on that number. Option A incorrectly assumes automatic merging, which does not happen without deduplication. Option C reverses the actual direction of the distortion. Option D confuses an unrelated mechanism with the effect of duplication.

    **Concept Tested:** Data Deduplication

---

#### 6. A hospital wants to classify "Maria Chen's specific diagnosis codes" into the four-tier sensitivity scheme. Which tier applies, and what access rule follows?

<div class="upper-alpha" markdown>
1. Public, with no restriction
2. Internal, authenticated staff only
3. Confidential, role-based access required
4. Restricted, requiring a role plus an active care relationship and MFA
</div>

??? question "Show Answer"
    The correct answer is **D**. Individual diagnoses are PHI and fall into the Restricted tier, which the chapter's table ties to requiring a role, an active care relationship, and MFA. Option A and B apply far too permissive a tier to individually identifiable clinical data. Option C applies the tier reserved for business information like contract terms, not individual diagnoses.

    **Concept Tested:** Data Sensitivity Label

---

#### 7. Riverside Clinic adds a visit_modality property to the Encounter node to support telehealth visits. Why is this less disruptive in a labeled property graph than in a rigid relational table?

<div class="upper-alpha" markdown>
1. Because two Encounter nodes are not required to carry identical property sets, so the new property can appear only on new telehealth encounters without requiring a migration to backfill millions of existing in-person encounter rows
2. Because relational tables never require a migration when a new column is added
3. Because graph databases automatically delete old encounter records whenever a new property is introduced
4. Because schema evolution is only possible in a graph database once data versioning has been fully disabled
</div>

??? question "Show Answer"
    The correct answer is **A**. Because property graph nodes of the same label need not share identical property sets, the new property can appear only where needed, avoiding the disruptive backfill migration a relational schema change would require. Option B contradicts the well-known cost of relational schema migrations. Option C fabricates a destructive behavior that does not occur. Option D fabricates a dependency between schema evolution and versioning that does not exist.

    **Concept Tested:** Schema Evolution

---

#### 8. Why can't data deduplication alone catch every data quality problem that a validation rule would catch, and vice versa?

<div class="upper-alpha" markdown>
1. Because deduplication and validation rules are two names for the exact same mechanism
2. Because a validation rule can catch duplicate records but deduplication can never catch an invalid date
3. Because a validation rule catches a bad value the moment it enters the graph, while deduplication catches a structural problem where two duplicate records can each individually pass every validation rule and still be wrong together
4. Because validation rules only apply to claims data, while deduplication only applies to patient data
</div>

??? question "Show Answer"
    The correct answer is **C**. Validation rules catch bad values at entry time, while deduplication catches a structural problem, two separately valid records representing the same real entity, that no single-record validation rule can detect. Option A contradicts their clearly distinct mechanisms. Option B reverses which mechanism catches which failure type. Option D fabricates unsupported data-type restrictions on either mechanism.

    **Concept Tested:** Data Deduplication

---

#### 9. Why does data versioning matter for reconstructing what a clinician actually saw at the moment they made a treatment decision?

<div class="upper-alpha" markdown>
1. Because versioning deletes all historical values once a record is updated
2. Because a versioned system preserves the prior value alongside a timestamp, letting a query ask what a value was as of a specific past moment rather than only what it is today
3. Because versioning only tracks changes to node labels, never to property values
4. Because a clinician's decision can only be reconstructed using change data capture, never data versioning
</div>

??? question "Show Answer"
    The correct answer is **B**. Preserving prior values with timestamps lets an audit query ask what a specific value was at a past moment, exactly what is needed to reconstruct what a clinician saw when they acted. Option A directly contradicts the preservation behavior that defines versioning. Option C incorrectly restricts versioning's scope to labels only. Option D incorrectly excludes versioning from a task the chapter attributes to it directly.

    **Concept Tested:** Data Versioning

---

#### 10. A risk-prediction model trained predominantly on one demographic group is used to make decisions about a different, underrepresented population. The organization confirms this use satisfies every HIPAA requirement. Should a data ethics review still flag this use, and why?

<div class="upper-alpha" markdown>
1. No, because satisfying HIPAA automatically means the use is ethically acceptable
2. No, because data ethics review only applies to data classification, not model deployment
3. No, because fairness concerns are outside the defined scope of any governance program
4. Yes, because a data ethics review asks not just "is this legal" but "is this the right thing to do," and evaluates fairness and potential for harm that legal compliance alone does not address
</div>

??? question "Show Answer"
    The correct answer is **D**. A data ethics review exists precisely to catch uses that are legally compliant but ethically concerning, such as applying a model beyond the population it was validated on. Option A contradicts the chapter's explicit point that legal and ethical acceptability are separate questions. Option B incorrectly narrows the scope of data ethics review. Option C contradicts the chapter's explicit inclusion of fairness within governance's scope.

    **Concept Tested:** Data Ethics Review

---
