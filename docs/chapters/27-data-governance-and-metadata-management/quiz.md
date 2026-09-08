# Quiz: Data Governance and Metadata Management

Test your understanding of data governance and metadata management with these review questions.

---

#### 1. What is data lineage?

<div class="upper-alpha" markdown>
1. The single, merged authoritative representation of an entity reconciling conflicting field values
2. A formal reference defining the exact meaning and valid values of a specific field
3. The end-to-end map of a data element's journey through every system, transformation, and pipeline from its original source to its current form
4. The organizational discipline of establishing policies, roles, and decision rights for managing data
</div>

??? question "Show Answer"
    The correct answer is **C**. Data lineage is the complete end-to-end map of a data element's journey, from original source through every transformation to its current form. Option A describes a golden record. Option B describes a data dictionary. Option D describes a data governance framework.

    **Concept Tested:** Data Lineage

---

#### 2. How does data lineage differ from data provenance?

<div class="upper-alpha" markdown>
1. Data lineage is the full end-to-end map of a data element's journey, while data provenance narrows in on the documented origin and custody history of one specific, often contested, piece of data
2. Data provenance covers an entire dashboard's pipeline, while data lineage covers only a single contested value
3. Lineage and provenance are two names for the same concept with no meaningful difference
4. Data lineage only applies to relational databases, while data provenance only applies to graph databases
</div>

??? question "Show Answer"
    The correct answer is **A**. Data lineage maps a value's entire journey through every system it passed through, while data provenance narrows in on the documented origin of one specific piece of data, often to establish trustworthiness for a contested decision. Option B reverses the actual scope of each term. Option C contradicts the chapter's explicit distinction. Option D fabricates a database-type restriction that does not exist.

    **Concept Tested:** Data Provenance

---

#### 3. How does a data catalog differ from a data dictionary?

<div class="upper-alpha" markdown>
1. A data catalog defines the exact valid values a field may hold, while a data dictionary is a searchable inventory of data assets
2. They are identical tools serving the identical purpose
3. A data catalog can only be used by data stewards, while a data dictionary can only be used by knowledge engineers
4. A data catalog is a searchable inventory of data assets and their metadata so people can discover what exists, while a data dictionary formally defines the exact meaning, format, and valid values of each specific field
</div>

??? question "Show Answer"
    The correct answer is **D**. A data catalog helps people discover what data assets exist and who owns them, while a data dictionary precisely defines what a specific field means and what values it may hold. Option A reverses these two definitions. Option B contradicts the chapter's explicit distinction. Option C fabricates unsupported role restrictions on tool usage.

    **Concept Tested:** Data Catalog

---

#### 4. An analyst learns that Maria Chen's risk_score property was last refreshed six hours ago with zero pipeline failures in the past thirty days. Which category of metadata does this fact belong to?

<div class="upper-alpha" markdown>
1. Technical metadata
2. Operational metadata
3. Business metadata
4. Reference data
</div>

??? question "Show Answer"
    The correct answer is **B**. Operational metadata answers whether a field's data is current and reliable right now, exactly the refresh timing and failure-rate information given here. Option A describes format and lineage facts, such as data type. Option C describes the plain-language meaning of the field. Option D describes a distinct category covering shared lookup values, not refresh timing.

    **Concept Tested:** Metadata Management

---

#### 5. A health system determines that two records from different systems, with slightly different spellings of a patient's name, actually refer to the same person, and then constructs one merged, authoritative record reconciling their conflicting field values. In what order did these two steps occur, and what are they called?

<div class="upper-alpha" markdown>
1. First the golden record is built, then entity resolution matches the records afterward
2. Only entity resolution occurred; no golden record was ever built
3. First entity resolution determined the records refer to the same person (matching), then master data management used that result to construct the golden record (merging)
4. Both steps happened simultaneously with no defined order, since matching and merging are the same operation
</div>

??? question "Show Answer"
    The correct answer is **C**. Entity resolution performs the matching step first, determining the records refer to the same person, and master data management then performs the merging step, constructing the golden record from that match. Option A reverses the required sequence. Option B ignores the merging step described in the scenario. Option D contradicts the chapter's explicit distinction between matching and merging as two separate operations.

    **Concept Tested:** Entity Resolution

---

#### 6. Why can a graph-native clinical recommendation's explanation function as its own audit trail, unlike a traditional tabular machine learning model's explanation?

<div class="upper-alpha" markdown>
1. Because a graph-native explanation can be built directly from the specific path of nodes and edges the recommendation engine actually traversed, while a tabular model typically requires a separate post-hoc technique with no guarantee it reflects genuine reasoning
2. Because tabular machine learning models never require any explanation techniques at all
3. Because graph databases cannot produce any recommendations without human intervention
4. Because post-hoc feature ranking is always more accurate than a graph traversal explanation
</div>

??? question "Show Answer"
    The correct answer is **A**. A graph-native explanation is built directly from the actual traversed path of nodes and edges, making the explanation and the reasoning the same thing, unlike a tabular model's separate, less certain post-hoc feature ranking. Option B contradicts the chapter's explicit description of tabular models needing post-hoc techniques. Option C fabricates an implausible restriction on graph databases. Option D makes an unsupported accuracy comparison the chapter never claims.

    **Concept Tested:** Explainability

---

#### 7. Why does skipping even one of the five data governance framework pillars create a blind spot, even if the other four are handled well?

<div class="upper-alpha" markdown>
1. Because all five pillars are legally required to be identical in scope
2. Because removing any pillar automatically improves data quality for the remaining four
3. Because only the security pillar has ever mattered in practice
4. Because each pillar answers a distinct accountability question, such as policy permission, steward approval, quality thresholds, access controls, or regulatory compliance, and a governance failure in any single one leaves a real gap the other four cannot cover
</div>

??? question "Show Answer"
    The correct answer is **D**. Each pillar answers a distinct accountability question, so a gap in any one, such as missing steward approval, is not covered by the other four pillars functioning well. Option A fabricates a legal requirement that does not exist. Option B makes an implausible and unsupported claim. Option C contradicts the chapter's explicit treatment of all five pillars as equally necessary.

    **Concept Tested:** Data Governance Framework

---

#### 8. Why can a perfectly explainable individual recommendation from a clinical model still represent a governance failure?

<div class="upper-alpha" markdown>
1. Because explainability and transparency always guarantee an unbiased outcome
2. Because the explanation would faithfully describe flawed reasoning if the underlying model was trained on a demographically unrepresentative population, meaning explainability alone does not establish whether the system should be trusted at all
3. Because transparency is only relevant to relational databases, not graph databases
4. Because a model card only needs to be published after a recommendation has already caused harm
</div>

??? question "Show Answer"
    The correct answer is **B**. An explanation can faithfully describe a model's reasoning even when that reasoning is built on flawed, unrepresentative training data, which is why transparency about the system as a whole matters alongside explainability for any single output. Option A contradicts the chapter's explicit point that explainability does not guarantee fairness. Option C fabricates an unsupported database-type restriction. Option D contradicts the chapter's description of transparency as a proactive, not reactive, commitment.

    **Concept Tested:** Transparency

---

#### 9. A clinic wants to add a new wearable-device vendor's heart-rate data to its patient graph. Why is it insufficient to satisfy only the security and compliance pillars while skipping the policy, roles, and quality pillars?

<div class="upper-alpha" markdown>
1. Because security and compliance alone have historically been sufficient for every new data source
2. Because HIPAA only requires the security pillar to be satisfied
3. Because each pillar governs a distinct decision, whether ingestion is contractually permitted, who approves the source, and what quality threshold it must meet, so omitting any of them leaves the new source ungoverned in exactly the dimension the skipped pillar was meant to cover
4. Because wearable-device data is exempt from governance requirements entirely
</div>

??? question "Show Answer"
    The correct answer is **C**. The policy, roles, and quality pillars each govern a distinct decision, such as contractual permission, steward approval, and quality thresholds, and skipping them leaves the new data source ungoverned in exactly those dimensions regardless of security and compliance being satisfied. Option A and D both contradict the chapter's explicit five-pillar requirement. Option B misstates HIPAA's actual scope, which the compliance pillar addresses separately from security.

    **Concept Tested:** Data Governance Framework

---

#### 10. A health system wants to design a process that ensures every application references one authoritative patient record instead of maintaining separate, conflicting copies. Which design correctly implements master data management as described in the chapter?

<div class="upper-alpha" markdown>
1. Use entity resolution to match records referring to the same patient across systems, then construct a golden record that reconciles conflicting field values, and have every system reference that single authoritative record going forward
2. Allow each system to keep its own independent patient record permanently, with no matching or merging performed at any point
3. Delete every patient record except the one most recently created, regardless of which fields it contains
4. Store only a data dictionary entry for "patient" with no actual record of any specific individual
</div>

??? question "Show Answer"
    The correct answer is **A**. This is exactly the chapter's master data management pattern: entity resolution matches records to the same person, and the resulting golden record becomes the single authoritative version every system references. Option B describes the fragmented status quo MDM is designed to fix. Option C would discard potentially more complete or accurate field values from other records. Option D confuses a data dictionary's definitional role with an actual patient record.

    **Concept Tested:** Master Data Management

---
