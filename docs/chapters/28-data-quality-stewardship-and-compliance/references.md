# References: Data Quality, Stewardship, and Compliance

1. [Data deduplication](https://en.wikipedia.org/wiki/Data_deduplication) - Wikipedia - Explains techniques for eliminating duplicate copies of data, supporting the chapter's worked example of Maria Chen's record appearing twice and inflating a population-health query's patient count.

2. [Data classification (data management)](https://en.wikipedia.org/wiki/Data_classification_(data_management)) - Wikipedia - Covers organizing data into risk-based categories, matching the chapter's four-tier Public/Internal/Confidential/Restricted classification scheme and its sensitivity-label mechanism.

3. [Change data capture](https://en.wikipedia.org/wiki/Change_data_capture) - Wikipedia - Describes design patterns for detecting and streaming inserts, updates, and deletes from a source system, directly supporting the chapter's admit-discharge-transfer CDC example for real-time updates.

4. Executing Data Quality Projects: Ten Steps to Quality Data and Trusted Information (2nd Edition) - Danette McGilvray - Academic Press - McGilvray is credited with originating the trademarked "Ten Steps" methodology, the most widely adopted structured framework for scoping a data quality project, underlying the chapter's data quality score discussion.

5. Data Matching: Concepts and Techniques for Record Linkage, Entity Resolution, and Duplicate Detection - Peter Christen - Springer - Christen is the field's leading reference author on deduplication algorithms (blocking, comparison functions, classification), the exact matching techniques the chapter describes for merging duplicate patient nodes.

6. [Change Data Capture (CDC)](https://www.geeksforgeeks.org/system-design/change-data-capture-cdc/) - GeeksforGeeks - A practitioner-oriented explanation of CDC implementation patterns that complements the chapter's discussion of streaming graph updates from admit-discharge-transfer messages.

7. [CMS Quality Reporting and Value-Based Programs](https://mmshub.cms.gov/about-quality/quality-at-CMS/quality/programs) - Centers for Medicare & Medicaid Services - Documents the actual federal quality-reporting programs the chapter's regulatory compliance reporting section references as evidence organizations must submit to regulators.

8. [NIST SP 800-60: Guide for Mapping Types of Information and Information Systems to Security Categories](https://csrc.nist.gov/pubs/sp/800/60/v1/r1/final) - National Institute of Standards and Technology - The federal methodology for classifying information by sensitivity and impact, grounding the chapter's data classification and sensitivity-label discussion in an official standard.

9. [What is Data Duplication?](https://www.geeksforgeeks.org/what-is-data-duplication/) - GeeksforGeeks - A concise technical explanation of duplicate detection and removal that reinforces the chapter's graph-specific deduplication technique of merging duplicate nodes' edges onto one surviving node.

10. [Data Quality Management](https://www.geeksforgeeks.org/what-is-data-quality-management/) - GeeksforGeeks - Introduces the processes and metrics organizations use to measure data quality, supporting the chapter's composite data quality score formula weighting completeness, accuracy, and consistency.
