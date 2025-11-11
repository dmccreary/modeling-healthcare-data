# Modeling Healthcare Data with Graphs

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![GitHub Pages](https://img.shields.io/badge/View%20on-GitHub%20Pages-blue?logo=github)](https://dmccreary.github.io/modeling-healthcare-data/)
[![GitHub](https://img.shields.io/badge/GitHub-dmccreary%2Fmodeling--healthcare--data-blue?logo=github)](https://github.com/dmccreary/modeling-healthcare-data)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Claude Skills](https://img.shields.io/badge/Uses-Claude%20Skills-DA7857?logo=anthropic)](https://github.com/dmccreary/claude-skills)
[![p5.js](https://img.shields.io/badge/p5.js-ED225D?logo=p5.js&logoColor=white)](https://p5js.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## View the Live Site

Visit the interactive textbook at: [https://dmccreary.github.io/modeling-healthcare-data/](https://dmccreary.github.io/modeling-healthcare-data/)

## Overview

This is an interactive, intelligent textbook on modeling healthcare data using graph databases, designed for college undergraduate students with database knowledge. The textbook was designed by Dan McCreary who has taught a prior version of this course to over 3,000 developers at a Fortune 50 healthcare company. Built using the powerful Python-centric MkDocs build tools with the Material theme, it incorporates learning graphs, concept dependencies, interactive MicroSims (p5.js simulations), and AI-assisted content generation.

The annual per-person cost for healthcare in the US is the most expensive in the world by a large margin. Modern graph databases offer ways to lower these costs by providing superior analytics to enable moving from expensive pay-per-service systems to value-based care systems. This course teaches students to model complex healthcare data from multiple perspectives: patient, provider, and payer.

The textbook leverages Bloom's Taxonomy (2001 revision) for learning outcomes and uses concept dependency graphs to ensure proper prerequisite sequencing. Students learn to leverage graph algorithms, graph data science, embeddings, and graph neural networks for healthcare analytics from multiple perspectives: patient, provider, payer, and public health. Much of the content has been reviewed with the most advanced AI tools, making it a Level 2+ intelligent textbook with interactive elements.

Whether you're a student learning healthcare informatics for the first time or an educator looking for structured course materials on graph databases in healthcare, this textbook provides comprehensive coverage with hands-on interactive elements that make complex concepts accessible and engaging.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 200 |
| Chapters | 12 |
| Markdown Files | 79 |
| MicroSims | 8 |
| Glossary Terms | 198 |
| FAQ Questions | 63 |
| Quizzes | 12 |
| Images | 119 |

**Completion Status:** Approximately 90% complete (content generation and refinement phase)

## What You'll Learn

This comprehensive course covers:

- **Graph Database Fundamentals**: Node, edge, labeled property graphs, and graph traversal concepts
- **Healthcare Domain Knowledge**: Patient records, provider networks, payer systems, claims, and medical coding (ICD, CPT, HCPCS)
- **Graph Query Languages**: Cypher, GQL, and GSQL for querying healthcare data
- **Multi-Perspective Modeling**: Patient-centric, provider-centric, and payer-centric graph models
- **Graph Algorithms**: Community detection, pathfinding, centrality measures for fraud detection and analytics
- **AI Integration**: Combining graph databases with vector stores, LLMs, and machine learning
- **Healthcare Analytics**: Operational reporting, KPIs, clinical decision support, and value-based care metrics
- **Security & Compliance**: HIPAA, RBAC, data governance, lineage, and traceability
- **Real-World Applications**: Capstone projects addressing fraud detection, clinical discovery, and healthcare optimization

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/dmccreary/modeling-healthcare-data.git
cd modeling-healthcare-data
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs
pip install mkdocs-material
```

### Build and Serve Locally

Build the site:

```bash
mkdocs build
```

Serve locally for development (with live reload):

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000`

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This will build the site and push it to the `gh-pages` branch.

### Using the Textbook

**Navigation:**
- Use the left sidebar to browse chapters sequentially
- Click the search icon to search all content across the textbook
- Each chapter includes concept explanations, examples, and quizzes
- The learning graph viewer shows concept dependencies

**Interactive MicroSims:**
- Found in the "MicroSims" section of the navigation
- Each simulation runs standalone in your browser using p5.js or vis-network
- Visualize healthcare graphs, code systems, and workflow diagrams
- Adjust parameters with interactive controls to explore concepts

**Learning Graph:**
- Explore the concept dependency graph showing all 200 concepts
- Understand prerequisites and concept relationships
- View concept taxonomy and quality metrics

**Customization:**
- Edit markdown files in `docs/` to modify content
- Modify `mkdocs.yml` to change site structure or navigation
- Add your own MicroSims in `docs/sims/`
- Customize theme colors and styles in `docs/css/extra.css`

## Repository Structure

```
modeling-healthcare-data/
├── docs/                           # MkDocs documentation source
│   ├── chapters/                   # 12 course chapters
│   │   ├── 01-graph-theory-database-foundations/
│   │   │   ├── index.md           # Chapter content
│   │   │   └── quiz.md            # Chapter quiz
│   │   ├── 02-intro-to-healthcare-systems/
│   │   ├── 03-graph-query-languages/
│   │   ├── 04-patient-centric-data-modeling/
│   │   ├── 05-provider-operations-networks/
│   │   ├── 06-payer-perspective-insurance/
│   │   ├── 07-healthcare-financial-analytics/
│   │   ├── 08-fraud-detection-compliance/
│   │   ├── 09-graph-algorithms-analytics/
│   │   ├── 10-ai-machine-learning-integration/
│   │   ├── 11-security-privacy-governance/
│   │   └── 12-capstone-real-world-applications/
│   ├── sims/                       # Interactive p5.js MicroSims
│   │   ├── graph-viewer/          # Learning graph visualization
│   │   ├── healthcare-graph-fundamentals/
│   │   ├── clinical-care-pathway-dag/
│   │   ├── encounter-workflow/
│   │   └── [6 more simulations]
│   ├── learning-graph/             # Learning graph data and analysis
│   │   ├── concept-list.md        # 200 concepts
│   │   ├── learning-graph.json    # vis-network format
│   │   ├── quality-metrics.md     # Quality analysis
│   │   └── concept-taxonomy.md    # Bloom's taxonomy distribution
│   ├── prompts/                    # AI generation prompts
│   ├── glossary.md                 # 198 ISO 11179-compliant definitions
│   ├── faq.md                      # 63 frequently asked questions
│   ├── references.md               # Curated academic references
│   ├── course-description.md       # Full course overview
│   ├── book-metrics.md             # Site statistics
│   └── license.md                  # CC BY-NC-SA 4.0 license
├── mkdocs.yml                      # MkDocs configuration
└── README.md                       # This file
```

## Course Structure

### Foundation (Chapters 1-3)
- **Chapter 1**: Graph theory basics, database fundamentals, and labeled property graphs
- **Chapter 2**: Healthcare systems overview, stakeholders, and cost models
- **Chapter 3**: Graph query languages (Cypher, GQL, GSQL) and performance

### Stakeholder Perspectives (Chapters 4-6)
- **Chapter 4**: Patient-centric data modeling (demographics, encounters, diagnoses, medications)
- **Chapter 5**: Provider operations, networks, schedules, and revenue
- **Chapter 6**: Payer perspective, insurance claims, and benefit plans

### Advanced Analytics (Chapters 7-10)
- **Chapter 7**: Healthcare financial analytics and profitability
- **Chapter 8**: Fraud, waste, and abuse detection using graph algorithms
- **Chapter 9**: Graph algorithms (pathfinding, centrality, community detection)
- **Chapter 10**: AI and machine learning integration with graph databases

### Implementation (Chapters 11-12)
- **Chapter 11**: Security, privacy, HIPAA, RBAC, and data governance
- **Chapter 12**: Capstone projects and real-world applications

## Target Audience

This textbook is designed for:

- **College undergraduate students** with database knowledge pursuing degrees in computer science, health informatics, data analytics, or healthcare administration
- **Healthcare IT professionals** looking to upskill in graph database technologies
- **Data scientists** interested in healthcare domain applications
- **Educators** teaching health informatics or graph database courses

**Prerequisites:** Knowledge of databases (tables, SQL, data modeling). No prior healthcare knowledge required.

## Features

- **200 Concept Learning Graph**: Complete concept dependency mapping with Bloom's taxonomy categorization
- **12 Comprehensive Chapters**: Progressive skill-building from fundamentals to advanced applications
- **Interactive MicroSims**: Browser-based visualizations for exploring healthcare graph concepts
- **198 Glossary Terms**: ISO 11179-compliant definitions following metadata registry standards
- **63 FAQ Entries**: Comprehensive answers to common questions about graph databases in healthcare
- **Quiz Bank**: 12 chapter quizzes with questions aligned to learning outcomes
- **AI-Generated Content**: All content created using Claude AI skills for consistency and quality
- **Real-World Focus**: Emphasis on practical applications including fraud detection, clinical decision support, and value-based care

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/dmccreary/modeling-healthcare-data/issues)

When reporting issues, please include:

- Description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)
- Browser/environment details (for MicroSims)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original repository
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

See [license.md](docs/license.md) for full details.

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive theme with advanced features
- **[p5.js](https://p5js.org/)** - Creative coding library from NYU ITP for interactive simulations
- **[vis-network](https://visjs.org/)** - Network visualization library for learning graphs
- **[Neo4j](https://neo4j.com/)** - Leading graph database platform used in examples
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation and curation
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source educational projects
- **Healthcare IT Community** - For insights into real-world challenges in healthcare data management

Special thanks to the educators, developers, and healthcare professionals who contribute to making educational resources accessible and interactive.

## How to Cite

If you use this textbook in your research, teaching, or coursework, please cite it as:

```
McCreary, D. (2024). Modeling Healthcare Data with Graphs. GitHub. https://github.com/dmccreary/modeling-healthcare-data
```

BibTeX:

```bibtex
@misc{modeling-healthcare-data-2024,
  author = {Dan McCreary},
  title = {Modeling Healthcare Data with Graphs},
  year = {2024},
  publisher = {GitHub},
  url = {https://github.com/dmccreary/modeling-healthcare-data},
  note = {An interactive intelligent textbook on graph database applications in healthcare}
}
```

## Contact

**Dan McCreary**

- LinkedIn: [linkedin.com/in/danmccreary](https://www.linkedin.com/in/danmccreary/)
- GitHub: [@dmccreary](https://github.com/dmccreary)
- Website: [dmccreary.com](https://dmccreary.com)

Questions, suggestions, or collaboration opportunities? Feel free to connect on LinkedIn or open an issue on GitHub.

---

**Built with Claude Code** | **Powered by MkDocs Material** | **Educational Content for the Healthcare Data Science Community**
