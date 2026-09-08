# References: Reimbursement, Health Plan Types, and Payer Contracts

1. [Health Maintenance Organization](https://en.wikipedia.org/wiki/Health_maintenance_organization) - Wikipedia - Explains the referral-gatekeeping, network-restricted plan design that anchors this chapter's comparison of HMO, PPO, POS, and HDHP plan types and their differing REFERRED_BY graph traversals.

2. [Medicare (United States)](https://en.wikipedia.org/wiki/Medicare_(United_States)) - Wikipedia - Covers the federal program's Parts A, B, C, and D structure, the background for this chapter's modeling of Medicare as separate BenefitPlan nodes sharing one Payer node.

3. [Medicaid](https://en.wikipedia.org/wiki/Medicaid) - Wikipedia - Describes the joint federal-state program and its state-by-state benefit variation, supporting the chapter's discussion of Medicaid coverage differences and its role in Dual Eligibility coordination of benefits.

4. Principles of Healthcare Reimbursement (Current Edition) - Anne B. Casto and Elizabeth Layman - AHIMA Press - The standard health information management textbook credited for its systematic treatment of fee schedules, allowed amounts, and reimbursement methodologies that this chapter's Allowed Amount and Reimbursement sections build directly on.

5. Health Policy Issues: An Economic Perspective (Current Edition) - Paul J. Feldstein - AUPHA Press / Health Administration Press - Feldstein is widely credited for popularizing an accessible economic-reasoning approach to health policy, the analytical lens this chapter applies to compare HMO, PPO, and HDHP incentive structures and government program financing.

6. [Parts of Medicare](https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/parts-of-medicare) - Medicare.gov - The official explanation of Medicare Parts A, B, C, and D, matching this chapter's description of Medicare as multiple BenefitPlan nodes sharing a single federal Payer node.

7. [Eligibility Policy](https://www.medicaid.gov/medicaid/eligibility-policy) - Medicaid.gov (Centers for Medicare & Medicaid Services) - Explains Medicaid eligibility determination and the Medicare Savings Programs that cover cost-sharing for "dual eligibles," the federal source behind this chapter's Dual Eligibility example.

8. [The No Surprises Act](https://www.cms.gov/nosurprises) - Centers for Medicare & Medicaid Services - CMS's hub for surprise-billing protections and independent dispute resolution, the federal law this chapter cites as blocking balance billing for emergency and certain out-of-network hospital-based care.

9. [Network Adequacy](https://content.naic.org/insurance-topics/network-adequacy) - National Association of Insurance Commissioners (NAIC) - Summarizes state network-adequacy model standards and consumer protections, the regulatory framework behind this chapter's treatment of Network Adequacy as a graph query over provider counts and travel distance.

10. [Coordination of Benefits & Recovery Overview](https://www.cms.gov/medicare/coordination-benefits-recovery/overview) - Centers for Medicare & Medicaid Services - Describes how Medicare determines primary versus secondary payer status and recovers mistaken payments, directly illustrating this chapter's Coordination of Benefits and Subrogation concepts.
