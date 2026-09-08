# References: Provider Organizations, Networks, and Scheduling

1. [Emergency Department](https://en.wikipedia.org/wiki/Emergency_department) - Wikipedia - Explains unscheduled acute-care delivery, triage, and the admit-or-discharge decision, grounding the chapter's Emergency Department node and its escalation pathway into Inpatient Care and specific Hospital Departments.

2. [Referral (medicine)](https://en.wikipedia.org/wiki/Referral_(medicine)) - Wikipedia - Covers how one provider directs a patient to another for evaluation or treatment, the clinical practice underlying the chapter's Referral node, its REFERRED_BY/REFERRED_TO edges, and referral-leakage analysis.

3. [Board Certification](https://en.wikipedia.org/wiki/Board_certification) - Wikipedia - Describes how medical specialty boards attest to advanced physician competency beyond licensure, directly supporting the chapter's treatment of Board Certification as one of three credentialing edge types on a Provider node.

4. Patient Flow: Reducing Delay in Healthcare Delivery - Edited by Randolph W. Hall - Springer (International Series in Operations Research & Management Science) - Credited for applying queueing theory to hospital bottlenecks and bed capacity, the analytical foundation behind this chapter's Provider Capacity, Provider Schedule, and ED boarding-time discussion.

5. Shortell and Kaluzny's Health Care Management: Organization Design and Behavior (7th Edition) - Lawton R. Burns, Elizabeth H. Bradley, and Bryan J. Weiner - Cengage - The standard organizational-theory text credited for teaching how hospitals, clinics, and affiliated networks are structured and governed, informing the chapter's ownership-versus-affiliation distinction.

6. [Provider Network Accreditation Requirements](https://www.ncqa.org/programs/health-plans/provider-network/standards/) - National Committee for Quality Assurance - NCQA's standards for credentialing, recredentialing, and network management, illustrating the industry framework behind the chapter's Provider Credential, Medical License, and Provider Network modeling pattern.

7. [Board Certification](https://www.abms.org/board-certification/) - American Board of Medical Specialties - Explains the specialty-board evaluation process and continuing-certification requirements that this chapter models as a `HOLDS` edge with issue and expiration date properties on the Provider node.

8. [Emergency Severity Index Handbook, Fifth Edition](https://media.emscimprovement.center/documents/Emergency_Severity_Index_Handbook.pdf) - Emergency Nurses Association / ACEP - The official implementation guide for the five-level ESI triage scale this chapter uses to illustrate how urgency drives the Emergency-Department-to-Inpatient-Care admission pathway.

9. [Network Adequacy Standards and Enforcement](https://www.kff.org/affordable-care-act/issue-brief/network-adequacy-standards-and-enforcement/) - KFF (Kaiser Family Foundation) - Surveys how regulators require payers to demonstrate sufficient in-network provider access, the regulatory backdrop for the chapter's discussion of Provider Network adequacy as a graph-traversal problem.

10. [Impact on Volume and Revenue of Referral Management Monitoring](https://www.mgma.com/articles/impact-on-volume-and-revenue-of-referral-management-monitoring) - Medical Group Management Association (MGMA) - A practical guide to tracking where referrals actually go, mirroring the chapter's worked example of computing a PCP's referral leakage rate from graph traversals.
