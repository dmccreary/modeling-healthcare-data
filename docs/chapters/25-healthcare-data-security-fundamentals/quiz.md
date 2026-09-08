# Quiz: Healthcare Data Security Fundamentals

Test your understanding of healthcare data security fundamentals with these review questions.

---

#### 1. What is protected health information (PHI)?

<div class="upper-alpha" markdown>
1. Any data encrypted at the storage-engine level
2. A permission granted to a role in an RBAC system
3. Information relating to a person's health condition, care, or payment for care that can be linked to that specific individual, directly or indirectly
4. An immutable log entry recording who accessed a record
</div>

??? question "Show Answer"
    The correct answer is **C**. PHI is information relating to health, care, or payment for care that can be linked to a specific individual, either directly through a name or indirectly through a combination of identifying details. Option A describes encryption, a protective technique rather than a data category. Option B describes an RBAC permission. Option D describes an audit trail entry.

    **Concept Tested:** Protected Health Information

---

#### 2. How does authentication differ from authorization?

<div class="upper-alpha" markdown>
1. Authentication answers "who are you," verifying identity, while authorization answers "what are you allowed to do," determining permissions after identity is verified
2. Authorization always happens before authentication in a properly designed system
3. Authentication and authorization are two names for the same verification step
4. Authentication determines role-based permissions, while authorization verifies passwords
</div>

??? question "Show Answer"
    The correct answer is **A**. Authentication verifies identity, and authorization, which happens only after authentication succeeds, determines what an already-verified user may read or write. Option B reverses the required sequence. Option C contradicts the chapter's explicit distinction between the two. Option D swaps which process handles permissions versus identity verification.

    **Concept Tested:** Authentication

---

#### 3. How does RBAC differ from ABAC?

<div class="upper-alpha" markdown>
1. RBAC evaluates a combination of user, resource, and context attributes, while ABAC checks only assigned roles
2. RBAC and ABAC are identical mechanisms with different names
3. ABAC can only be used for billing systems, never for clinical access decisions
4. RBAC attaches permissions to assigned roles, while ABAC evaluates a rule against any combination of attributes of the user, resource, and request context
</div>

??? question "Show Answer"
    The correct answer is **D**. RBAC attaches permissions to roles like Physician or Nurse, while ABAC evaluates a rule against attributes such as department match, shift timing, and patient opt-out status. Option A reverses the two models' actual mechanisms. Option B contradicts their clearly distinct decision bases. Option C fabricates an unsupported restriction on ABAC's use.

    **Concept Tested:** Attribute-Based Access Control

---

#### 4. A hospital requires a clinician to enter both a password and a one-time code sent to her phone before viewing a patient's chart. Which access control mechanism is being applied?

<div class="upper-alpha" markdown>
1. Role-based access control
2. Multi-factor authentication
3. Data anonymization
4. Encryption at rest
</div>

??? question "Show Answer"
    The correct answer is **B**. Requiring both something you know (a password) and something you have (a one-time code) is exactly the two-independent-factors pattern that defines multi-factor authentication. Option A describes a role-based permission system, unrelated to proving identity. Option C and D describe data-transformation and storage-protection techniques, neither of which concerns login verification.

    **Concept Tested:** Multi-Factor Authentication

---

#### 5. Riverside Clinic's audit log is modeled as a graph of User-ACCESSED-Patient edges. A nurse who works Ward A has recently accessed dozens of Ward B patient records with no scheduled care relationship. What graph pattern would surface this as a likely privacy violation?

<div class="upper-alpha" markdown>
1. A user node with no edges at all, indicating no access ever occurred
2. A patient node connected to exactly one user node
3. A single user node with an unusually large fan of edges crossing ward boundaries
4. Two patient nodes connected directly to each other without any user node
</div>

??? question "Show Answer"
    The correct answer is **C**. The suspicious pattern is a single user node with an unusually large fan-out of edges crossing ward boundaries, exactly the structural signature the chapter's worked example describes. Option A describes the opposite of any suspicious activity. Option B describes routine, unremarkable access. Option D describes an implausible edge type not used in this audit model.

    **Concept Tested:** Audit Trail

---

#### 6. Why does data anonymization differ from de-identification in terms of reversibility?

<div class="upper-alpha" markdown>
1. De-identified data can sometimes be re-linked to the source patient by an authorized party holding the missing key, while properly anonymized data cannot be re-linked by anyone, including the original data holder
2. De-identification and anonymization both guarantee identical, complete irreversibility
3. Anonymized data can always be re-linked by the original data holder, while de-identified data can never be re-linked by anyone
4. De-identification only applies to graph databases, while anonymization only applies to relational databases
</div>

??? question "Show Answer"
    The correct answer is **A**. De-identified data retains the possibility of authorized re-linking, while properly anonymized data is designed so that no one, including the original data holder, can re-identify individuals. Option B contradicts the chapter's explicit distinction in reversibility. Option C reverses which category permits re-linking. Option D fabricates an unsupported database-type restriction.

    **Concept Tested:** Data Anonymization

---

#### 7. Why does a healthcare graph database need encryption at rest even when strong access control layers like RBAC and MFA are already in place?

<div class="upper-alpha" markdown>
1. Because encryption at rest replaces the need for any access control layer entirely
2. Because RBAC and MFA already guarantee that stolen backup tapes are unreadable
3. Because encryption at rest is only relevant for data actively moving across a network
4. Because encryption addresses a different failure mode than access control, protecting data even if an attacker bypasses every access-control layer and copies raw data directly off a disk
</div>

??? question "Show Answer"
    The correct answer is **D**. Encryption assumes something has already gone wrong, such as a stolen backup, and protects data even after access control has been bypassed entirely, a fundamentally different failure mode. Option A contradicts the defense-in-depth principle that both layers are needed together. Option B incorrectly claims access control alone protects offline media. Option C confuses encryption at rest with encryption in transit, a distinct concept.

    **Concept Tested:** Encryption At Rest

---

#### 8. Why does a defense-in-depth security architecture rely on multiple independent layers rather than investing entirely in one very strong layer?

<div class="upper-alpha" markdown>
1. Because a single perfectly strong layer is always cheaper to build and maintain than multiple layers
2. Because each layer specializes in stopping a different kind of failure, so an attacker must defeat every layer, not just one, to reach the data
3. Because HIPAA legally prohibits any security architecture with more than one layer
4. Because multiple layers are only useful for protecting data in transit, never data at rest
</div>

??? question "Show Answer"
    The correct answer is **B**. Each layer, from firewall to identity management to database controls to encryption, specializes in stopping a distinct kind of failure, forcing an attacker to defeat every layer rather than just one. Option A makes an unsupported cost claim. Option C fabricates a legal restriction that contradicts HIPAA's actual requirements. Option D contradicts the chapter's explicit inclusion of encryption at rest as one of the layers.

    **Concept Tested:** Data Security

---

#### 9. A research team needs data that supports individual-level re-linking by an authorized party for a longitudinal study, while a separate team needs data for public release with no possibility of re-identification by anyone. Which de-identification approach best fits each need, respectively?

<div class="upper-alpha" markdown>
1. Public release data should use reversible pseudonymization, while the longitudinal study should use irreversible generalization
2. Both teams should use the exact same technique, since privacy and utility trade-offs never actually differ by use case
3. The longitudinal study should use a re-linkable technique like pseudonymization since an authorized party may need to re-link records, while the public release should use irreversible anonymization since no one, including the data holder, should be able to re-identify anyone
4. Neither team needs any de-identification technique, since HIPAA authorization alone is sufficient for both purposes
</div>

??? question "Show Answer"
    The correct answer is **C**. A longitudinal study needing authorized re-linking calls for a reversible technique, while public release data needing zero re-identification risk calls for irreversible anonymization, matching each technique's trade-off to its actual use case. Option A swaps the two techniques to the wrong scenarios. Option B ignores the meaningful trade-off differences the chapter describes. Option D ignores the chapter's explicit requirement for de-identification alongside any permitted HIPAA use.

    **Concept Tested:** De-Identification

---

#### 10. A knowledge engineer is designing a graph-based RBAC system for a hospital. Which design correctly implements the pattern the chapter describes for answering "can Dr. Chen write orders?"

<div class="upper-alpha" markdown>
1. A user node connects to a role node through a HAS_ROLE edge, the role node connects to a more general role through an INHERITS_FROM edge, and a role connects to a permission through a GRANTS edge, so the query traverses HAS_ROLE, then zero or more INHERITS_FROM edges, checking for a GRANTS edge to the target permission along the way
2. Every permission is stored as a single property directly on the Patient node, with no user or role nodes at all
3. A user's permissions are determined solely by the color assigned to their user interface theme
4. Role inheritance is represented by deleting the more general role node once a specific role is assigned
</div>

??? question "Show Answer"
    The correct answer is **A**. This is exactly the chapter's RBAC graph pattern: HAS_ROLE, INHERITS_FROM, and GRANTS edges chained together so a permission check becomes a path-existence traversal. Option B misplaces permission data on the wrong node type entirely. Option C fabricates an implausible and irrelevant basis for access decisions. Option D would destroy the inheritance hierarchy the pattern depends on.

    **Concept Tested:** Role-Based Access Control

---
