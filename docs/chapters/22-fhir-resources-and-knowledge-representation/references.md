# References: FHIR Resources and Levels of Knowledge Representation

1. [Fast Healthcare Interoperability Resources](https://en.wikipedia.org/wiki/Fast_Healthcare_Interoperability_Resources) - Wikipedia - Overview of the FHIR standard's resource-based data model, RESTful API, and adoption history, the foundational standard this entire chapter's discussion of FHIR resources and knowledge representation is built around.

2. [Health Level 7](https://en.wikipedia.org/wiki/Health_Level_7) - Wikipedia - History and structure of the HL7 standards family (Version 2, Version 3, CDA, FHIR) that this chapter traces to explain why FHIR's REST-and-JSON design replaced older message- and document-based exchange formats.

3. [Knowledge representation and reasoning](https://en.wikipedia.org/wiki/Knowledge_representation_and_reasoning) - Wikipedia - Survey of representation formalisms and the fundamental expressiveness-versus-tractability trade-off, the same trade-off this chapter's Narrative-to-Executable representation-level spectrum makes concrete for clinical guidelines.

4. Knowledge Representation and Reasoning - Ronald J. Brachman and Hector J. Levesque - Morgan Kaufmann - Brachman and Levesque are credited with the definitive academic treatment of representation trade-offs underlying this chapter's four-level Narrative/Semi-Structured/Structured/Executable knowledge spectrum.

5. Biomedical Informatics: Computer Applications in Health Care and Biomedicine (5th Edition) - Edward H. Shortliffe, James J. Cimino, and Michael F. Chiang (eds.) - Springer - The field's standard reference, credited for its widely taught chapter on clinical decision-support architecture and structured knowledge representation that this chapter's PlanDefinition and ActivityDefinition discussion builds on.

6. [Overview](https://www.hl7.org/fhir/overview.html) - HL7 FHIR Specification - Official specification overview introducing FHIR resources, formats, and modules, the primary source this chapter's Patient, Condition, and Observation resource descriptions are drawn from.

7. [PlanDefinition](https://www.hl7.org/fhir/plandefinition.html) - HL7 FHIR Specification - Official resource definition for PlanDefinition, showing its trigger, condition, and action structure, the exact resource this chapter's diabetes-screening guideline worked example encodes as executable logic.

8. [FHIR Fact Sheets](https://www.healthit.gov/topic/standards-technology/standards/fhir-fact-sheets) - HealthIT.gov (ONC) - Federal fact sheets explaining FHIR basics, resource architecture, and adoption timeline, supporting this chapter's explanation of why FHIR replaced HL7 Version 2 and CDA as the interoperability standard.

9. [SMART on FHIR API](https://smarthealthit.org/smart-on-fhir-api/) - SMART Health IT - Describes how SMART on FHIR layers OAuth2 authentication on FHIR resources so apps run unmodified across EHR vendors, extending this chapter's FHIR RESTful API and FHIR server discussion to third-party app access.

10. [FHIR - About](https://ecqi.healthit.gov/fhir/about) - eCQI Resource Center - Explains how FHIR underlies digital quality measurement, including QI-Core profiles and CQL expression logic, connecting this chapter's Structured and Executable levels to the quality-measure pipeline the next two chapters develop.
