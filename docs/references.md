# References

## Blogs

[Asking AI About Lowering Healthcare Costs in the US](https://dmccreary.medium.com/asking-ai-about-lowering-healthcare-costs-in-the-us-7224b4f958cc)

Site References

https://build.fhir.org/ig/HL7/cqf-recommendations/documentation-approach-02-04-knowledge-representation.html

https://neo4j.com/labs/genai-ecosystem/llm-graph-builder/

## FHIR and Clinical Decision Support

1. **CodeSystem: Knowledge Representation Level** - [https://www.hl7.org/fhir/codesystem-knowledge-representation-level.html](https://www.hl7.org/fhir/codesystem-knowledge-representation-level.html) - official FHIR CodeSystem defining the four levels of knowledge representation (Narrative, Semi-Structured, Structured, Executable).
2. **ValueSet: Knowledge Representation Level** - [https://hl7.org/fhir/valueset-knowledge-representation-level.html](https://hl7.org/fhir/valueset-knowledge-representation-level.html) - the FHIR ValueSet binding for knowledge representation level, source for the Structured and Executable level definitions.
3. **FHIR 5.0.0 Snapshot: Knowledge Representation Level CodeSystem** - [http://hl7.org/fhir/5.0.0-snapshot3/codesystem-knowledge-representation-level.html](http://hl7.org/fhir/5.0.0-snapshot3/codesystem-knowledge-representation-level.html) - snapshot version of the CodeSystem, source for the Narrative and Semi-Structured level definitions.
4. **CQF Recommendations IG: Levels of Knowledge Representation** - [https://build.fhir.org/ig/HL7/cqf-recommendations/en/documentation-approach-06-01-levels-of-knowledge-representation.html](https://build.fhir.org/ig/HL7/cqf-recommendations/en/documentation-approach-06-01-levels-of-knowledge-representation.html) - implementation guide narrative describing the Semi-Structured representation level.
5. **CSIRO Ontoserver: Knowledge Representation Level CodeSystem** - [https://r4.ontoserver.csiro.au/fhir/CodeSystem/knowledge-representation-level](https://r4.ontoserver.csiro.au/fhir/CodeSystem/knowledge-representation-level) - terminology server rendering of the knowledge representation level CodeSystem.
6. **FHIR CPG IG: Knowledge Representation (Tiers of Functionality)** - [https://hl7.org/fhir/uv/cpg/documentation-approach-02-04-knowledge-representation.html](https://hl7.org/fhir/uv/cpg/documentation-approach-02-04-knowledge-representation.html) - Clinical Practice Guidelines implementation guide describing the Data, Logic, and Forms/UI tiers of functionality.
7. **FHIR CPG IG: Levels of Representation by Tiers of Functionality** - [http://hl7.org/fhir/uv/cpg/documentation-approach-08-levels-of-representation-by-tiers-of-functionality.html](http://hl7.org/fhir/uv/cpg/documentation-approach-08-levels-of-representation-by-tiers-of-functionality.html) - matrix mapping the four knowledge representation levels across the three tiers of functionality.
8. **eCQI Resource Center: Testing** - [https://ecqi.healthit.gov/taxonomy/term/311](https://ecqi.healthit.gov/taxonomy/term/311) - CMS eCQI Resource Center hub page for the tools used to author, test, and certify CQL-based electronic Clinical Quality Measures (eCQMs).
9. **MADiE (Measure Authoring Tool v2)** - [https://ecqi.healthit.gov/cql/tools-resources](https://ecqi.healthit.gov/cql/tools-resources) - the primary CMS-sponsored, web-based application that consolidates measure authoring and dynamic testing of CQL-based FHIR measures. See also the [CMS Tools overview](https://mmshub.cms.gov/cms-tools).
10. **CQL Runner** - [https://ecqi.healthit.gov/tool/cql-runner](https://ecqi.healthit.gov/tool/cql-runner) - a CMS-sponsored, web-based interactive tool for ad hoc testing of CQL syntax, expression evaluation, and code validation without building a full measure bundle. See also the [eCQI Tools and Key Resources library](https://ecqi.healthit.gov/ecqi-tools-key-resources/ecqi-tools-resources-library).
11. **Bonnie** - [https://www.ncqa.org/resources/clinical-quality-language-and-cql-engines-the-basics/](https://www.ncqa.org/resources/clinical-quality-language-and-cql-engines-the-basics/) - a legacy CMS-sponsored testing tool, historically paired with the original Measure Authoring Tool (MAT), that runs synthetic patient test cases against CQL logic to verify expected coverage outcomes.
12. **Cypress** - [https://mmshub.cms.gov/cms-tools](https://mmshub.cms.gov/cms-tools) - the official open-source certification tool used to validate that EHR systems correctly interpret and execute compiled CQL/eCQM logic files. See also the [eCQI Tools and Key Resources library](https://ecqi.healthit.gov/ecqi-tools-key-resources/ecqi-tools-resources-library).

## Site Building Tools

1. **mkdocs** - [https://www.mkdocs.org/](https://www.mkdocs.org/) - this is our tool for building the website.  It converts Markdown into HTML in the ```site``` directory.
2. **mkdocs material theme** - [https://squidfunk.github.io/mkdocs-material/](https://squidfunk.github.io/mkdocs-material/) - this is the theme for our site.  The theme adds the user interface elements that give our site the look and feel.  It also has the features such as social cards.
3. **GitHub Pages** - [https://pages.github.com/](https://pages.github.com/) - this is the free tool for hosting public websites created by mkdocs
4. **Markdown** - [https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown](https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown) - this is the format we use for text.  It allows us to have headers, lists, tables, links and images without learning HTML.
5. **Deploy Mkdocs GitHub Action** - [https://github.com/marketplace/actions/deploy-mkdocs](https://github.com/marketplace/actions/deploy-mkdocs) - this is the tool we use to automatically build our site after edits are checked in with Git.
6. **Git Book** - [https://git-scm.com/book/en/v2](https://git-scm.com/book/en/v2) - a useful book on Git.  Just read the first two chapters to learn how to check in new code.
7. **Conda** - [https://conda.io/](https://conda.io/) - this is a command line tool that keeps our Python libraries organized for each project.
8. **VS Code** - [https://code.visualstudio.com/](https://code.visualstudio.com/) - this is the integrated development environment we use to mange the files on our website.
9. **Markdown Paste** - [https://marketplace.visualstudio.com/items?itemName=telesoho.vscode-markdown-paste-image](https://marketplace.visualstudio.com/items?itemName=telesoho.vscode-markdown-paste-image) - this is the VS code extension we use to make sure we keep the markdown format generated by ChatGPT.
