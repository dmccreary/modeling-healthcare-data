# FAQ Generator Session Log

- **Skill Version**: 1.0
- **Date**: 2026-09-08

## Context

An FAQ already existed at `docs/faq.md` with 62 questions, but it had been
written against the book's earlier structure: 12 chapters and roughly 200
concepts. That structure was replaced (see
`logs/book-chapter-generator-1.1.2-2026-09-07.md`) with 29 chapters and a
513-concept learning graph, and the old chapters were archived to
`docs/chapters-archive-200concept/`. Every chapter link in the FAQ therefore
pointed at a path that no longer renders, and roughly two thirds of the book's
subject matter — the FHIR/CQL/CDS unit, responsible AI, scalability and
operations, governance and data quality, reimbursement, and workforce topics —
had no FAQ coverage at all.

The user asked to reuse the existing entries rather than regenerate from
scratch, to add entries for the new content, and explicitly waived the skill's
usual question-count guidance in favour of coverage.

## Content Completeness Assessment

| Input | Finding | Score |
|-------|---------|-------|
| `docs/course-description.md` | Complete: title, audience, prerequisites, Bloom's outcomes | 25/25 |
| `docs/learning-graph/learning-graph.csv` | Valid DAG, 513 concepts, 14 taxonomy categories | 25/25 |
| `docs/glossary.md` | 515 ISO 11179-style definitions with examples | 15/15 |
| Chapter word count | ~125,000 words across 29 chapters | 20/20 |
| Concept coverage in chapters | All 513 concepts assigned to a chapter | 10/15 |

**Content Completeness Score: 95/100.** No user dialog triggers fired.

## Steps Performed

1. Read the course description, learning graph CSV, concept taxonomy, taxonomy
   distribution, glossary, and the per-chapter "Concepts Covered" tables for all
   29 chapters. Read the full text of the FHIR, CQL, and CDS Hooks sections in
   Chapters 22-24, since that unit is entirely new and needed to be grounded in
   the book's own wording rather than general knowledge.
2. Extracted every `See:` line from the existing FAQ and mapped each of the 62
   questions to the chapter that now covers its topic. Applied the remapping
   with a script (`fixlinks.py`), which also **removed every `#` anchor
   fragment** — the old FAQ had 21 anchor links, which the skill prohibits.
   Verified zero anchors and zero stale paths remained.
3. Authored 139 new question-and-answer pairs, distributed across the six
   standard categories and targeting the chapters with no prior coverage.
4. Merged the new entries into the existing category sections rather than
   appending them as a separate block, so related questions sit together.
5. Ran a gap analysis against the learning graph, found concept coverage at
   56%, and authored a second batch of 30 questions aimed specifically at the
   uncovered taxonomy areas (payer plan types and cost sharing, revenue cycle,
   immunizations, behavioral health, biomarkers, NLP, credentialing, billing
   fraud patterns, catalogs and dictionaries, consent, incident response,
   workforce, and capstone presentation).
6. Updated two pre-existing answers that had become factually wrong: "How is
   this course structured?" described 12 chapters in four sections, and "What
   will I learn in this course?" omitted the FHIR/CQL/CDS unit and the
   governance material. Rewrote the FAQ intro paragraph for the new scope.
7. Added `See:` links to the 14 Getting Started answers that had none, bringing
   link coverage to 100%.
8. Generated `docs/learning-graph/faq-chatbot-training.json`,
   `docs/learning-graph/faq-quality-report.md`, and
   `docs/learning-graph/faq-coverage-gaps.md`.

## Results

- **Total questions: 201** (62 reused, 139 added)
- **Overall quality score: 95/100** (coverage 25/30, Bloom's 25/25, answer
  quality 25/25, organization 20/20)
- **Concept coverage: 77.6%** (398 of 513 concepts named directly)
- **Chapters referenced: 29 of 29**

| Category | Questions |
|----------|-----------|
| Getting Started | 21 |
| Core Concepts | 55 |
| Technical Details | 47 |
| Common Challenges | 29 |
| Best Practices | 25 |
| Advanced Topics | 24 |

Bloom's distribution came out at Remember 20.4%, Understand 28.4%, Apply 24.4%,
Analyze 17.4%, Evaluate 7.0%, Create 2.5% — total absolute deviation from
target 5.6%, within the 10% band that scores full marks.

## Validation

- 0 exact duplicate questions; 0 near-duplicates above 75% token overlap
- 0 anchor links (hard requirement)
- 0 broken links: all 204 internal link targets verified to exist on disk
- 100% of answers carry at least one internal link (target 60%)
- 40% of answers include a worked example (target 40%)
- Average answer length 170 words, range 98-236 (target 100-300)
- Chatbot JSON validates against the skill's schema; all 201 ids unique

## Notes and Caveats

- Concept coverage is measured by whether a concept's label, a common variant,
  or its standard acronym appears in a question or answer. The matcher handles
  hyphenation, simple plurals, generic trailing words ("FHIR Standard" matches
  "FHIR"), and about 50 acronyms. It still undercounts concepts discussed
  without being named, so the 116 concepts in the coverage gaps report
  overstate the real gap.
- `mkdocs.yml` already had `- FAQ: faq.md` in the nav plus both quality reports
  under Learning Graph, so no navigation changes were needed.
- The FAQ links to chapter files by path. If chapters are renumbered or renamed
  again, rerun the link remapping step before anything else.
