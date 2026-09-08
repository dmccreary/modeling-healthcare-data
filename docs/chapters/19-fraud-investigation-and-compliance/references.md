# References: Fraud Investigation and Compliance

1. [False Claims Act](https://en.wikipedia.org/wiki/False_Claims_Act) - Wikipedia - Explains the federal statute imposing civil and criminal liability for defrauding government programs, including the qui tam whistleblower provision this chapter identifies as a major driver of healthcare fraud prosecutions.

2. [Pill Mill](https://en.wikipedia.org/wiki/Pill_mill) - Wikipedia - Describes clinics that prescribe controlled substances without legitimate medical evaluation, the individual fraud pattern this chapter distinguishes from multi-provider collusion rings.

3. [Shell Corporation](https://en.wikipedia.org/wiki/Shell_corporation) - Wikipedia - Covers entities with no genuine operations formed to obscure beneficial ownership, the structure this chapter's shell company detection targets when tracing fraud-ring proceeds.

4. Principles of Fraud Examination (6th Edition) - Joseph T. Wells - Wiley - Written by the founder of the Association of Certified Fraud Examiners, credited for translating Cressey's fraud triangle into the standard case-creation and evidence-gathering methodology this chapter's fraud investigation workflow follows.

5. Introduction to Social Network Methods - Robert A. Hanneman and Mark Riddle - University of California, Riverside - A freely available text credited for the clearest widely-adopted explanation of degree versus betweenness centrality for identifying key actors, directly matching this chapter's method for distinguishing a fraud ring's organizer from peripheral members.

6. [List of Excluded Individuals/Entities (LEIE)](https://oig.hhs.gov/exclusions/index.asp) - HHS Office of Inspector General - The official searchable database of providers barred from federal healthcare programs that this chapter models as the `EXCLUDED_ON` edge every provider node must be checked against.

7. [Medicare Fee-for-Service Compliance Programs](https://www.cms.gov/data-research/monitoring-programs/medicare-fee-service-compliance-programs) - Centers for Medicare & Medicaid Services - CMS's official description of Recovery Audit Contractors reviewing paid claims post-payment, the mechanism this chapter distinguishes from fraud investigation because RACs also catch honest coding errors.

8. [False Claims Act Settlements and Judgments Exceed $6.8B in Fiscal Year 2025](https://www.justice.gov/opa/pr/false-claims-act-settlements-and-judgments-exceed-68b-fiscal-year-2025) - U.S. Department of Justice - Reports record qui tam filings and whistleblower recovery shares, providing current evidence for this chapter's claim that whistleblower tips are among the most productive sources of fraud cases.

9. [How to Search for Exclusions on SAM.gov](https://www.doi.gov/pam/suspension-debarment/search-exclusions) - U.S. Department of the Interior - A federal guide to searching the SAM.gov exclusion list, the second sanctioned-provider list this chapter's exclusion-screening table places alongside the LEIE.

10. [Betweenness Centrality](https://neo4j.com/docs/graph-data-science/current/algorithms/betweenness-centrality/) - Neo4j Graph Data Science Documentation - Documents the algorithm that scores nodes by how often they bridge shortest paths, the specific measure this chapter uses to identify a collusion ring's organizer versus a peripheral participant.
