# References: Healthcare Fraud Patterns and Detection

1. [Health Care Fraud](https://en.wikipedia.org/wiki/Health_care_fraud) - Wikipedia - Surveys the major categories of health insurance and medical fraud in the United States, providing the definitional foundation this chapter builds on to distinguish fraud from waste and abuse.

2. [Louvain Method](https://en.wikipedia.org/wiki/Louvain_method) - Wikipedia - Explains the greedy modularity-optimization algorithm this chapter applies to a claims and referral graph to surface densely connected fraud rings disguised as legitimate disease cohorts.

3. [Anomaly Detection](https://en.wikipedia.org/wiki/Anomaly_detection) - Wikipedia - Covers the statistical technique of flagging observations that deviate from normal patterns, the general method this chapter applies to identify providers billing far outside their peer group's norms.

4. Network Science - Albert-László Barabási and Márton Pósfai - Cambridge University Press - Credited for its widely used Chapter 9 treatment of modularity and community detection with dendrogram-based illustrations, the conceptual basis this chapter uses to explain how Louvain separates legitimate clusters from fraud rings.

5. License to Steal: How Fraud Bleeds America's Health Care System - Malcolm K. Sparrow - Westview Press - Written by the Harvard scholar recognized as the leading national expert on health care fraud, credited as the first comprehensive structural analysis explaining why claim-by-claim review fails and why pattern-based detection is required.

6. [The Challenge of Health Care Fraud](https://www.nhcaa.org/tools-insights/about-health-care-fraud/the-challenge-of-health-care-fraud/) - National Health Care Anti-Fraud Association - The leading anti-fraud industry association's own estimate that fraud consumes 3-10% of health spending, the statistic this chapter cites when framing fraud as a first-order cost-containment problem.

7. [Exploring Fraud Detection with Neo4j & Graph Data Science - Part 1](https://neo4j.com/developer-blog/exploring-fraud-detection-neo4j-graph-data-science-part-1/) - Neo4j Developer Blog - Walks through applying community detection to a transaction graph to uncover fragmented fraudster identities, directly illustrating this chapter's claim that fraud rings mimic legitimate network density.

8. [Louvain - Neo4j Graph Data Science](https://neo4j.com/docs/graph-data-science/current/algorithms/louvain/) - Neo4j Documentation - The authoritative technical reference for the Louvain algorithm's configuration and modularity-based hierarchical clustering, the specific implementation this chapter references for community detection.

9. [Durable Medical Equipment: Protecting Medicare and Medicaid from Fraud, Waste, and Abuse](https://oig.hhs.gov/reports/featured/dme-feature/) - HHS Office of Inspector General - The federal watchdog's own feature on DME fraud schemes, including billing for undelivered equipment and falsified medical necessity, matching this chapter's DME red-flag discussion.

10. [Fraud & Abuse Laws](https://oig.hhs.gov/compliance/physician-education/fraud-abuse-laws/) - HHS Office of Inspector General - Summarizes the Anti-Kickback Statute and other federal fraud laws that make the kickback schemes described in this chapter, including behavioral health patient brokering, illegal regardless of care quality.
