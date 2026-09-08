# References: CDS Hooks, Care Alerts, and CMS CQL Tooling

1. [Alarm fatigue](https://en.wikipedia.org/wiki/Alarm_fatigue) - Wikipedia - Explains how clinicians become desensitized to frequent low-value alerts and the documented patient-safety consequences, the exact phenomenon this chapter's clinical reminder and care gap alert design choices are built to avoid.

2. [Drug interaction](https://en.wikipedia.org/wiki/Drug_interaction) - Wikipedia - Covers pharmacodynamic and pharmacokinetic drug interaction mechanisms, the clinical basis for this chapter's warfarin-aspirin drug-drug interaction check worked example fired by the order-sign CDS Hooks trigger.

3. [Centers for Medicare & Medicaid Services](https://en.wikipedia.org/wiki/Centers_for_Medicare_%26_Medicaid_Services) - Wikipedia - Describes CMS's structure and its role in healthcare quality and reimbursement oversight, the federal agency that sponsors the MADiE, Bonnie, and Cypress tooling ecosystem this chapter surveys.

4. Clinical Decision Support Systems: Theory and Practice (3rd Edition) - Eta S. Berner (ed.) - Springer - The standard CDS reference text, credited with the widely used framework distinguishing interruptive alerts, order sets, and non-interruptive reminders that this chapter's CDS Hooks card-design discussion is organized around.

5. Clinical Informatics Study Guide: Text and Review (3rd Edition) - John T. Finnell and Brian E. Dixon (eds.) - Springer - The standard clinical informatics board-certification reference, credited for its clear, exam-oriented walkthroughs of eCQM reporting and measure certification that this chapter's CMS tooling ecosystem section surveys.

6. [CDS Hooks v2.0.1 Specification](https://cds-hooks.hl7.org/) - HL7 - The official CDS Hooks specification defining hook types, context, prefetch, and card responses, the primary source this chapter's warfarin-aspirin order-sign worked example is built from.

7. [CDS Hooks](https://ecqi.healthit.gov/tool/cds-hooks) - eCQI Resource Center - CMS-sponsored explainer describing how CDS Hooks integrates near-real-time decision support into EHR workflows, reinforcing this chapter's point-of-care alert delivery discussion.

8. [Get Started with eCQMs](https://ecqi.healthit.gov/ecqms) - eCQI Resource Center - Introduces electronic clinical quality measures, their automation benefits, and CMS reporting programs, directly supporting this chapter's electronic CQM and quality reporting architecture discussion.

9. [Alert Fatigue](https://psnet.ahrq.gov/primer/alert-fatigue) - AHRQ Patient Safety Network - Patient-safety primer on alert override rates and design fixes like severity tiering, grounding this chapter's clinical reminder versus interruptive CDS Alert distinction in documented safety research.

10. [SNOMED CT](https://mmshub.cms.gov/measure-lifecycle/measure-specification/specify-code/SNOMED-CT) - CMS Measures Management System Hub - Official CMS guidance on using SNOMED CT and RxNorm when specifying measure logic, supporting this chapter's discussion of how compiled CQL/ELM logic references coded data during eCQM certification.
