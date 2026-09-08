# References: Healthcare Data Security Fundamentals

1. [Health Insurance Portability and Accountability Act](https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act) - Wikipedia - Overview of HIPAA's Privacy, Security, and Breach Notification Rules and their history, the legal framework this entire chapter's access control, audit trail, and de-identification techniques exist to satisfy.

2. [Role-based access control](https://en.wikipedia.org/wiki/Role-based_access_control) - Wikipedia - Explains the core, hierarchical, and constrained RBAC models and the NIST/ANSI standard behind them, the exact policy this chapter's HAS_ROLE, INHERITS_FROM, and GRANTS graph model implements for clinician permissions.

3. [De-identification](https://en.wikipedia.org/wiki/De-identification) - Wikipedia - Covers pseudonymization, k-anonymization, and the HIPAA Safe Harbor and Expert Determination methods, the two accepted de-identification paths this chapter's Riverside Clinic analytics worked example must satisfy.

4. Role-Based Access Control (2nd Edition) - David F. Ferraiolo, D. Richard Kuhn, and Ramaswamy Chandramouli - Artech House - Ferraiolo and Kuhn are the NIST researchers who originated the RBAC model itself; their book defines the core/hierarchical/constrained formalism this chapter's graph-based role-inheritance model directly implements.

5. Computer Security: Principles and Practice (4th Edition) - William Stallings and Lawrie Brown - Pearson - Credited with the standard textbook explanation and diagrams contrasting RBAC and ABAC and organizing security controls as layered defense in depth, the exact structure this chapter's concentric-ring security model follows.

6. [Implementing the HIPAA Security Rule: A Cybersecurity Resource Guide (SP 800-66 Rev. 2)](https://csrc.nist.gov/pubs/sp/800/66/r2/final) - National Institute of Standards and Technology (NIST) - Federal guidance translating HIPAA's Security Rule into administrative, physical, and technical safeguards, directly supporting this chapter's explanation of what each defense-in-depth layer must accomplish.

7. [Role-Based Access Control](https://csrc.nist.gov/projects/role-based-access-control) - NIST Computer Security Resource Center - Background on the RBAC standard, its economic impact, and its comparison to ABAC, reinforcing this chapter's role-hierarchy and permission-inheritance discussion.

8. [Guide to Attribute Based Access Control (ABAC) Definition and Considerations (SP 800-162)](https://csrc.nist.gov/publications/detail/sp/800-162/final) - National Institute of Standards and Technology (NIST) - Federal definition of ABAC as policy rules evaluated over subject, object, and environment attributes, the formal basis for this chapter's department-and-shift-based ABAC access example.

9. [De-identification of Protected Health Information: 2026 Update](https://www.hipaajournal.com/de-identification-protected-health-information/) - HIPAA Journal - Practitioner explainer contrasting HIPAA's Safe Harbor and Expert Determination de-identification methods, supporting this chapter's distinction between reversible de-identification and stricter, irreversible data anonymization.

10. [What is Data Encryption?](https://www.geeksforgeeks.org/computer-networks/what-is-data-encryption/) - GeeksforGeeks - Tutorial on symmetric and asymmetric encryption and common algorithms such as AES and RSA, the underlying mechanism this chapter's encryption-at-rest discussion applies to protecting stored graph database properties.
