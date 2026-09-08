# References: Patient Diagnosis, Treatment, and Medication

1. [Differential diagnosis](https://en.wikipedia.org/wiki/Differential_diagnosis) - Wikipedia - Explains how clinicians rank candidate diagnoses using Bayes' theorem and likelihood ratios to update probability as evidence accumulates, directly underlying this chapter's differential-diagnosis reasoning and posterior-probability worked example.

2. [Drug interaction](https://en.wikipedia.org/wiki/Drug_interaction) - Wikipedia - Covers pharmacodynamic and pharmacokinetic mechanisms by which two medications alter each other's effects, the exact concept modeled by the chapter's INTERACTS_WITH edges linking Warfarin, Aspirin, and Ibuprofen.

3. [Vaccination schedule](https://en.wikipedia.org/wiki/Vaccination_schedule) - Wikipedia - Details the age- and interval-based recommendations governing vaccines such as MMR, Tdap, and HPV, the same reference-schedule concept the chapter models as nodes a patient's immunization edges are checked against.

4. Clinical Epidemiology: A Basic Science for Clinical Medicine (2nd Edition) - David L. Sackett, R. Brian Haynes, Gordon H. Guyatt, and Peter Tugwell - Little, Brown and Company - Sackett and colleagues popularized the likelihood-ratio and pretest/posttest-probability framework for diagnostic reasoning that this chapter's Bayesian differential-diagnosis worked example (prior probability times likelihood ratio yields posterior probability) directly follows.

5. Graph Databases: New Opportunities for Connected Data (2nd Edition) - Ian Robinson, Jim Webber, and Emil Eifrem - O'Reilly Media - Robinson, Webber, and Eifrem popularized qualifying relationships with properties as first-class graph citizens, the exact pattern this chapter uses to attach dosage, dates, and severity to prescription and interaction edges.

6. [What is graph data modeling?](https://neo4j.com/docs/getting-started/data-modeling/) - Neo4j Documentation - Introduces the property-graph workflow of modeling entities as nodes and typed, property-bearing relationships, the same pattern this chapter applies when it stores dosage and severity on prescribing and interaction edges rather than nodes.

7. [Healthcare Professionals: Immunization Schedules](https://www.cdc.gov/vaccines/hcp/imz-schedules/index.html) - Centers for Disease Control and Prevention - The official U.S. child, adolescent, and adult immunization schedules that ground the chapter's MMR, Tdap, HPV, and influenza examples, showing the real age- and interval-based rules a vaccination-schedule reference node encodes.

8. [RxNorm](https://www.nlm.nih.gov/research/umls/rxnorm/index.html) - National Library of Medicine (NIH) - NLM's normalized naming system for clinical drugs and drug classes, providing the standardized medication identity and interaction-vocabulary infrastructure that a reusable Medication node, like the chapter's Warfarin or Ibuprofen, would reference in practice.

9. [FDA Adverse Event Monitoring System (AEMS/FAERS)](https://www.fda.gov/drugs/surveillance-post-drug-approval-activities/fda-adverse-event-monitoring-system-aems) - U.S. Food and Drug Administration - The FDA's national database and workflow for reporting drug adverse events and medication errors, the real-world system the chapter's CONTRIBUTED_TO adverse-event edges, such as Diane Okafor's gastrointestinal bleed, model in miniature.

10. [Diagnostic Testing Accuracy: Sensitivity, Specificity, Predictive Values, and Likelihood Ratios](https://www.ncbi.nlm.nih.gov/books/NBK557491/) - StatPearls, NCBI Bookshelf (NIH) - A worked tutorial on sensitivity, specificity, predictive values, and likelihood ratios, walking through the same prior-probability-times-likelihood-ratio-equals-posterior arithmetic this chapter uses to promote myocardial infarction to the leading diagnosis.
