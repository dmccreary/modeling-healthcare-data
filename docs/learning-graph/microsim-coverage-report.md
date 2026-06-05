---
title: MicroSim & Diagram Coverage Report
description: Inventory of interactive diagram and MicroSim specifications across all 12 chapters, with per-chapter coverage, element-type distribution, and gap analysis.
generated_by: claude (chapter-content-generator review)
date: 2026-06-05
---

# MicroSim & Diagram Coverage Report

This report inventories every interactive non-text element specified across the
twelve chapters of *Modeling Healthcare Data with Graphs*. Each element is a
`#### Diagram:` header followed by a `<details markdown="1">` specification block
conforming to the `chapter-content-generator` v0.08 format
(`Type` / `sim-id` / `Library` / `Status`).

## Summary

- **Total interactive specifications:** 91
- **Chapters covered:** 12 of 12
- **Specifications added in the latest review:** 12
- **Pre-existing specifications brought into v0.08 compliance:** 79
- **Average specifications per chapter:** 7.6
- **Element format:** every block has a `#### Diagram:` header, a de-indented
  `<details markdown="1">` body, and the structured `sim-id` / `Library` /
  `Status` fields.

!!! info "What "Specified" means"
    Most specifications carry `Status: Specified` — the educational design is
    complete (learning objective, controls, data-visibility, instructional
    rationale) but the runnable sim has not yet been built. A small number
    already have working sims behind an `<iframe>` (see [Build Status](#build-status)).

## Per-Chapter Coverage

The table below compares each chapter's concept count (from the learning graph)
against the number of interactive specifications. A lower ratio means more
interactive support per concept.

| Ch | Title | Concepts | Specs | Concepts / Spec |
|----|-------|---------:|------:|----------------:|
| 01 | Graph Theory & Database Foundations | 15 | 6 | 2.5 |
| 02 | Introduction to Healthcare Systems | 20 | 7 | 2.9 |
| 03 | Graph Query Languages | 10 | 9 | 1.1 |
| 04 | Patient-Centric Data Modeling | 25 | 9 | 2.8 |
| 05 | Provider Operations & Networks | 25 | 7 | 3.6 |
| 06 | Payer Perspective & Insurance | 20 | 6 | 3.3 |
| 07 | Healthcare Financial Analytics | 15 | 7 | 2.1 |
| 08 | Fraud Detection & Compliance | 15 | 6 | 2.5 |
| 09 | Graph Algorithms & Analytics | 15 | 7 | 2.1 |
| 10 | AI & Machine Learning Integration | 15 | 9 | 1.7 |
| 11 | Security, Privacy & Governance | 20 | 9 | 2.2 |
| 12 | Capstone & Real-World Applications | 5 | 9 | 0.6 |
| | **Total** | **200** | **91** | **2.2** |

## Element-Type Distribution

Interactive elements span eight types. MicroSims (p5.js simulations) are the
most common, followed by graph data models and charts.

| Element Type | Count | Share | Typical Library |
|--------------|------:|------:|-----------------|
| MicroSim | 29 | 31.9% | p5.js |
| Graph data model | 17 | 18.7% | vis-network |
| Chart | 15 | 16.5% | Chart.js |
| Workflow | 12 | 13.2% | Mermaid |
| Diagram | 8 | 8.8% | p5.js |
| Infographic | 7 | 7.7% | p5.js |
| Timeline | 2 | 2.2% | vis-timeline |
| Comparison table | 1 | 1.1% | — |

## Library Distribution

| Library | Count |
|---------|------:|
| p5.js | 40 |
| vis-network | 20 |
| Chart.js | 16 |
| Mermaid | 12 |
| vis-timeline | 2 |
| Venn.js | 1 |

## MicroSims Added in the Latest Review

The review prioritized chapters with the fewest interactive elements relative to
their concept count, then targeted individual sections that had no interactive
element. Twelve new MicroSim specifications were authored, each with a Bloom-level
learning objective, controls, data-visibility requirements, and an instructional
rationale.

| Ch | MicroSim | Bloom Level | Library | sim-id |
|----|----------|-------------|---------|--------|
| 02 | Medical Code System Classifier | Evaluate | p5.js | `medical-code-classifier` |
| 04 | Bayesian Diagnostic Reasoning | Apply | p5.js | `bayesian-diagnostic-reasoning` |
| 04 | Preventive Care Gap Closure | Apply | p5.js | `preventive-care-gap-closure` |
| 05 | Appointment Scheduling & No-Show Simulator | Apply | p5.js | `appointment-no-show-simulator` |
| 07 | Payer Mix & Contract Negotiation | Apply | Chart.js | `payer-mix-contract-negotiation` |
| 07 | Value-Based Payment Shared-Savings | Evaluate | p5.js | `value-based-payment-shared-savings` |
| 08 | Anomaly Score Threshold Explorer | Evaluate | p5.js | `anomaly-score-threshold-explorer` |
| 08 | DME Fraud Pattern Detector | Analyze | vis-network | `dme-fraud-pattern-detector` |
| 09 | Centrality Measures Comparison | Analyze | vis-network | `centrality-measures-comparison` |
| 09 | Cycle Detection & Pattern Explorer | Analyze | vis-network | `cycle-detection-pattern-explorer` |
| 09 | Link Prediction Scoring | Apply | p5.js | `link-prediction-scoring` |
| 09 | Node Embedding Explorer | Understand | p5.js | `node-embedding-explorer` |

Chapter 9 (Graph Algorithms) received the most attention — it began with 3
specifications for 15 algorithm-heavy concepts and now has 7, covering PageRank
and centrality, cycle detection, link prediction, and graph/node embeddings.

### Bloom-level distribution of the new MicroSims

- **Understand (L2):** 1
- **Apply (L3):** 5
- **Analyze (L4):** 3
- **Evaluate (L5):** 3

The emphasis on Apply, Analyze, and Evaluate reflects that these chapters teach
algorithms, financial modeling, and fraud investigation — domains where learners
must manipulate parameters, compare structures, and make judgments rather than
merely recall facts.

## Build Status

All 91 specifications are educationally complete (`Status: Specified`). Four
already have runnable sims embedded via `<iframe>`:

| Chapter | Built sim |
|---------|-----------|
| 01 | `healthcare-graph-fundamentals`, `query-performance-comparison` |
| 02 | `encounter-workflow` |
| 10 | `ai-ml-taxonomy` |

The remaining 87 specifications are ready to be built. To build one, run the
`microsim-generator` skill (or `hc-graph-generator` for the vis-network graph
models) against its `sim-id`; the generated sim belongs in
`docs/sims/{sim-id}/`.

## Compliance Work Completed

Before the new specifications were added, the 79 pre-existing `<details>` blocks
were brought into the v0.08 format:

- **73 missing `#### Diagram:` headers** were added (only Chapter 1 had them).
  These headers create the table-of-contents anchors and are what
  `extract-sim-specs.py` keys on.
- **All 79 blocks were de-indented.** They had been indented four spaces, which
  caused MkDocs to render each specification as a monospace code block instead of
  formatted markdown.
- **Structured fields (`sim-id` / `Library` / `Status`) were added** to every
  block so the scaffold generators can select the correct CDN and directory.

Integrity verified after all edits: 91 headers = 91 `<details>` = 91 `</details>`
= 91 `sim-id` = 91 `Library` = 91 `Status`, with no duplicate sim-ids.

## Remaining Gaps and Recommendations

Every content-bearing section across all twelve chapters now has at least one
interactive element. The `##` sections that still lack their own element fall
into three categories where an interactive element adds little value:

- **Conceptual introductions** that set up the diagrams that follow (e.g.,
  "Understanding Graph Algorithms", "Properties of Nodes and Edges").
- **Synthesis / modeling sections** (e.g., "Graph Modeling for Payer Operations",
  "Bringing It All Together: Integrated Healthcare AI Systems").
- **Reference / practical sections** (e.g., "Practical Considerations",
  "Further Reading and Resources").

Three borderline candidates could still be added if broader coverage is desired:

1. A **stakeholder value-flow** MicroSim for Chapter 2's "Key Healthcare Stakeholders".
2. A **False Claims Act / compliance** element for Chapter 8's "Compliance Monitoring".
3. An **LLM hallucination-vs-grounding** MicroSim for Chapter 10's LLM section.

Otherwise, the textbook has reached a strong, well-balanced level of interactive
coverage, and the recommended next step is to begin **building** the highest-value
specified MicroSims into runnable sims.

---

*This report reflects the state of the chapter files at the date above. Regenerate
it after building sims or adding new specifications to keep the counts current.*
