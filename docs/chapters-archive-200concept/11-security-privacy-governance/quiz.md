# Chapter 11 Quiz: Security, Privacy, and Data Governance

Test your understanding of HIPAA compliance, data security, access control, and governance concepts.

<div class="upper-alpha" markdown>

1. What is Protected Health Information (PHI) under HIPAA regulations?

    1. Only patient names and social security numbers
    2. Any individually identifiable health information transmitted or maintained by covered entities
    3. Only electronic medical records
    4. Only billing and insurance information

    ??? question "Show Answer"
        **Answer: B** - Any individually identifiable health information transmitted or maintained by covered entities

        Protected Health Information (PHI) under HIPAA includes any health information that can be linked to a specific individual, regardless of format (electronic, paper, or oral). PHI encompasses not only obvious identifiers like names, addresses, and social security numbers, but also medical record numbers, dates of service, diagnosis codes, treatment information, insurance details, and even IP addresses or device identifiers when associated with health data. HIPAA applies to covered entities (healthcare providers, health plans, clearinghouses) and their business associates. The breadth of PHI definition means healthcare graph databases must protect not just individual patient records, but also relationship data that could identify individuals through inference or network analysis.

        **See:** [Protected Health Information Definition](index.md)

2. How do graph databases introduce unique access control challenges compared to relational databases?

    1. Graph databases are less secure than relational databases
    2. Graph traversals can expose multi-hop relationships that traditional row-level security cannot control
    3. Graph databases cannot implement any security
    4. Graph databases store more data

    ??? question "Show Answer"
        **Answer: B** - Graph traversals can expose multi-hop relationships that traditional row-level security cannot control

        Graph databases present unique security challenges because users can traverse relationships to discover information beyond their direct permissions. Traditional row-level security grants access to specific records, but graph traversals can follow relationship paths to reach nodes that should be restricted. For example, a user authorized to view provider data might traverse TREATS relationships to access patient nodes, or discover sensitive research participation by traversing from patients through clinical trials. Graph security requires relationship-aware access control that restricts not just which nodes users can read, but which relationship types they can traverse, how many hops they can follow, and what properties they can see. This requires more sophisticated security models than traditional databases.

        **See:** [Graph-Specific Security Challenges](index.md)

3. What is the difference between authentication and authorization in healthcare systems?

    1. They are the same thing
    2. Authentication verifies user identity; authorization determines what the authenticated user can access
    3. Authentication is only for doctors; authorization is for all staff
    4. Authorization happens before authentication

    ??? question "Show Answer"
        **Answer: B** - Authentication verifies user identity; authorization determines what the authenticated user can access

        Authentication and authorization are distinct but complementary security processes. Authentication establishes "who you are" through credentials verification (password, biometrics, security token, MFA), confirming the user is who they claim to be. Authorization determines "what you can do" based on the authenticated identity, checking permissions, roles, and access policies to decide which patient records, clinical functions, or system resources the user can access. Both are required for secure healthcare systems: authentication without authorization would allow verified users to access everything, while authorization without authentication would grant permissions to unverified users. HIPAA requires both strong authentication and granular authorization aligned with minimum necessary access principles.

        **See:** [Authentication vs Authorization](index.md)

4. How does Role-Based Access Control (RBAC) improve security management in large healthcare organizations?

    1. By giving all users the same permissions
    2. By assigning permissions to roles based on job functions rather than individual users, simplifying administration
    3. By eliminating the need for passwords
    4. By allowing unrestricted data access

    ??? question "Show Answer"
        **Answer: B** - By assigning permissions to roles based on job functions rather than individual users, simplifying administration

        RBAC simplifies permission management by defining roles aligned with job functions (Physician, Nurse, Billing Clerk, Researcher) and assigning permissions to roles rather than individual users. When users join the organization or change positions, administrators assign appropriate roles rather than configuring hundreds of individual permissions. This approach scales efficiently (managing 50 roles instead of 5,000 individual user permissions), ensures consistency (all nurses have the same baseline permissions), supports audit requirements (role assignments are easily reviewed), and implements the principle of least privilege (roles grant only necessary permissions). In graph databases, RBAC can extend to relationship traversal permissions: Physician role can traverse TREATS relationships while Researcher role can only traverse de-identified analytics paths.

        **See:** [Role-Based Access Control](index.md)

5. What is the purpose of audit trails in healthcare graph database systems?

    1. To improve query performance
    2. To create comprehensive logs of who accessed what data, when, and why for compliance and security monitoring
    3. To reduce storage costs
    4. To automatically fix security breaches

    ??? question "Show Answer"
        **Answer: B** - To create comprehensive logs of who accessed what data, when, and why for compliance and security monitoring

        Audit trails are legally required under HIPAA to maintain detailed logs of all PHI access, capturing user identity, timestamp, data accessed (specific patient records, queries executed), purpose of access, and IP address or workstation. Audit logs serve multiple purposes: demonstrating HIPAA compliance during regulatory audits, detecting unauthorized access or suspicious patterns (unusual query volumes, access outside normal hours), investigating security incidents, supporting breach notification requirements, and enabling patient-requested access reports. In graph databases, audit trails must capture not just which nodes were accessed but which relationship traversals occurred, as relationship patterns can reveal sensitive information. Immutable audit logs with strong integrity protection are essential for forensic investigation.

        **See:** [Audit Trail Requirements](index.md)

6. Analyze this scenario: A physician needs emergency access to a patient's record but has no formal treatment relationship. How should break-glass access control work?

    1. Deny access completely in all cases
    2. Grant temporary access while logging the emergency override and triggering compliance review
    3. Permanently grant full access to all records
    4. Require waiting for formal authorization

    ??? question "Show Answer"
        **Answer: B** - Grant temporary access while logging the emergency override and triggering compliance review

        Break-glass procedures enable emergency access to patient data when immediate clinical need outweighs normal authorization processes, such as unconscious trauma patients whose regular providers are unavailable. Proper break-glass implementation: (1) grants temporary, limited access to specific patient records, (2) requires explicit acknowledgment from the user that this is emergency access, (3) creates high-visibility audit log entries, (4) automatically notifies compliance officers for retrospective review, (5) may require additional authentication (supervisor approval, written justification), and (6) expires after a defined period. This balances clinical necessity (patient care cannot wait for formal authorization) with security and accountability (all emergency access is logged and reviewed). Abuse of break-glass access results in sanctions.

        **See:** [Emergency Access Procedures](index.md)

7. How does data de-identification support research while protecting patient privacy?

    1. It prevents all research access to data
    2. It removes or transforms identifiers so individuals cannot be reasonably identified, allowing research use under HIPAA Safe Harbor
    3. It makes data completely unusable
    4. It only hides patient names

    ??? question "Show Answer"
        **Answer: B** - It removes or transforms identifiers so individuals cannot be reasonably identified, allowing research use under HIPAA Safe Harbor

        De-identification removes or transforms PHI identifiers so individuals cannot be reasonably identified, enabling research use without patient authorization under HIPAA Safe Harbor provisions. The Safe Harbor method requires removing 18 specific identifier categories (names, geographic subdivisions smaller than state, dates more specific than year, phone/fax numbers, email addresses, SSN, medical record numbers, etc.). In graph databases, de-identification must address not just node properties but also relationship patterns that could re-identify individuals through network position or rare connection patterns. Alternatively, statistical de-identification by expert determination certifies that re-identification risk is very small. De-identified data supports valuable research, quality improvement, and public health surveillance while protecting privacy.

        **See:** [De-Identification Techniques](index.md)

8. What is data lineage and why is it important for healthcare data governance?

    1. The age of the data
    2. Documentation of data origins, transformations, and movement through systems to ensure quality and compliance
    3. The size of database tables
    4. The number of users accessing data

    ??? question "Show Answer"
        **Answer: B** - Documentation of data origins, transformations, and movement through systems to ensure quality and compliance

        Data lineage tracks the complete lifecycle of healthcare data: where it originated (EHR system, lab interface, claims feed), what transformations were applied (normalization, de-identification, aggregation), how it moved between systems (ETL processes, API calls), and what quality rules were enforced. Lineage is critical for: (1) data quality—understanding why data values changed or where errors were introduced, (2) regulatory compliance—demonstrating to auditors that data handling follows policies, (3) impact analysis—knowing which downstream reports or analytics are affected by source data changes, (4) troubleshooting—tracing incorrect results back to source issues. In graph databases, lineage itself can be modeled as relationships (DERIVED_FROM, TRANSFORMED_BY) creating a provenance graph alongside clinical data.

        **See:** [Data Lineage](index.md)

9. How can graph databases support fine-grained access control based on data sensitivity levels?

    1. By storing all data with the same security level
    2. By modeling sensitivity classifications as node properties and filtering queries based on user clearance levels
    3. By preventing all data access
    4. By encrypting the entire database identically

    ??? question "Show Answer"
        **Answer: B** - By modeling sensitivity classifications as node properties and filtering queries based on user clearance levels

        Graph databases can implement sophisticated attribute-based access control using sensitivity properties on nodes and relationships. Different data elements have different sensitivity: HIV status, mental health diagnoses, substance abuse treatment, genetic information, and VIP patient records require heightened protection beyond standard PHI. By adding sensitivity_level properties to nodes and user clearance_level attributes to user profiles, the database can filter query results: `MATCH (p:Patient)-[:HAS_DIAGNOSIS]->(d:Diagnosis) WHERE d.sensitivity_level <= $user_clearance RETURN d`. This enables granular control where general clinicians see most patient data but high-sensitivity information is restricted to treating providers or specially authorized users. Relationship-level sensitivity controls can also restrict access to certain connection types.

        **See:** [Attribute-Based Access Control](index.md)

10. Evaluate this governance approach: Implementing data stewardship with designated owners responsible for specific domains (patient data, provider data, financial data) in the healthcare graph. What are the benefits?

    1. It eliminates the need for technical security controls
    2. It establishes clear accountability, data quality ownership, and policy enforcement for each data domain
    3. It makes data governance unnecessary
    4. It reduces database performance

    ??? question "Show Answer"
        **Answer: B** - It establishes clear accountability, data quality ownership, and policy enforcement for each data domain

        Data stewardship assigns designated individuals or teams responsibility for specific data domains, creating organizational accountability for data governance. Patient data stewards ensure patient records are accurate, complete, and properly protected; provider data stewards maintain provider credentials and network relationships; financial data stewards oversee billing and revenue cycle data quality. Stewards define and enforce data quality rules, approve access requests, resolve data issues, communicate policy changes, and serve as subject matter experts. This domain-based governance complements technical controls: while RBAC and encryption protect data technically, stewards ensure appropriate use, quality, and compliance from a business perspective. Effective stewardship requires executive support, clear authority, and integration with technical governance mechanisms.

        **See:** [Data Stewardship](index.md)

</div>
