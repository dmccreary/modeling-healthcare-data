# References: Clinical Guideline Authoring and Clinical Quality Language

1. [Clinical decision support system](https://en.wikipedia.org/wiki/Clinical_decision_support_system) - Wikipedia - Overview of knowledge-based and machine-learning CDS architectures and their adoption challenges, the broader system context this chapter's guideline-to-CQL authoring pipeline is designed to feed.

2. [Decision table](https://en.wikipedia.org/wiki/Decision_table) - Wikipedia - Explains decision-table structure, conditions, actions, and "don't care" simplification, the exact semi-structured artifact this chapter uses to represent independent guideline rules before terminology binding and CQL authoring.

3. [SNOMED CT](https://en.wikipedia.org/wiki/SNOMED_CT) - Wikipedia - Describes SNOMED CT's concept, description, and relationship model and its role as a clinical terminology, the CodeSystem this chapter's terminology-binding and ValueSet worked examples repeatedly reference.

4. Clinical Decision Support Systems: Theory and Practice (3rd Edition) - Eta S. Berner (ed.) - Springer - Berner's edited volume is the field's standard reference, credited with the widely used framework for translating guidelines through decision tables, flowcharts, and user stories into computable logic that this chapter's guideline authoring process follows.

5. Biomedical Informatics: Computer Applications in Health Care and Biomedicine (5th Edition) - Edward H. Shortliffe, James J. Cimino, and Michael F. Chiang (eds.) - Springer - Credited with the standard explanation of controlled clinical terminologies (SNOMED CT, LOINC, RxNorm) that this chapter's CodeSystem, ValueSet, and terminology-binding discussion depends on.

6. [Clinical Quality Language Specification](https://cql.hl7.org/) - HL7 - The official CQL specification covering syntax, retrieve expressions, and define statements, the primary source this chapter's DiabetesControlMeasure worked example and CQL authoring format discussion is drawn from.

7. [Clinical Quality Language and CQL Engines: The Basics](https://www.ncqa.org/resources/clinical-quality-language-and-cql-engines-the-basics/) - NCQA - Explains why CQL was adopted as the standard for digital quality measurement and how CQL engines fit into a layered architecture, reinforcing this chapter's CQL-to-ELM compilation discussion.

8. [Value Set Authority Center (VSAC)](https://vsac.nlm.nih.gov/) - National Library of Medicine - The operational repository where ValueSets like this chapter's "Diabetes" and "HbA1c Lab Test" examples are authored and published, grounding the terminology-binding section in a real, searchable tool.

9. [Terminology Module](https://www.hl7.org/fhir/terminology-module.html) - HL7 FHIR Specification - Official documentation of the CodeSystem, ValueSet, and ConceptMap resources, the exact FHIR terminology infrastructure this chapter's CodeSystem/ValueSet/binding-strength worked example is built from.

10. [Clinical Quality Language (CQL)](https://ecqi.healthit.gov/cql) - eCQI Resource Center - CMS-sponsored education page on CQL versions and tooling, supporting this chapter's transition from the human-readable CQL authoring format to the Expression Logical Model.
