# MicroSim Quality Report — September 7, 2026

Implemented the first five new scaffolded MicroSims in chapter order. All five are validated; implementation files, preview images, metadata, TODO JSON, chapter status, gallery, and individual index pages are synchronized.

| MicroSim | Before | After | Browser widths | Iframe check |
|---|---:|---:|---|---|
| Healthcare Graph Anatomy Explorer | 50/100 | 100/100 | 400, 800, 1200: PASS | PASS |
| Relational vs. Graph Data Model Side-by-Side | 50/100 | 100/100 | 400, 800, 1200: PASS | PASS |
| Graph Sharding Partition Explorer | 50/100 | 100/100 | 400, 800, 1200: PASS | PASS |
| Graph Algorithm Family Map | 50/100 | 100/100 | 400, 800, 1200: PASS | PASS |
| Patient Demographics and SDOH Profile | 50/100 | 100/100 | 400, 800, 1200: PASS | PASS |

## Quality Rubric

The 100-point score measures completeness: HTML shell 10, metadata 30, index structure 35, preview image 5, lesson plan 10, references 5, and library conventions 5. It is supplemented by browser behavior tests rather than treated as a correctness score. The nine core Dublin Core fields were checked using the skill schema after normalizing the existing scalar creator and date-only serialization.

## Browser and Visual Checks

- Fifteen sim/viewport combinations passed with no JavaScript page errors.
- Anatomy: four nodes and three edges; node clicks, property inspection, incident-edge highlighting, badge toggle, and reset.
- Comparison: real foreign-key and edge clicks, matching highlights, four joins versus three hops, payer reveal, reset, and cancellation of a pending traversal.
- Partitioning: 24 nodes, 21 local edges, slider endpoints 0 and 8, synthetic cost sums, latency details, and reset.
- Algorithm families: all 14 nodes, every family and leaf definition available, five-node collapsed tour, family expansion, keyboard activation, and restoration.
- SDOH: six nodes, three initial connections, patient selection, dimming, relationship properties, connect/disconnect, FHIR note, and reset.
- Real iframe rendering loads the site resize listener and uses the site’s 2 px border. Controls, content bounds, and horizontal overflow are checked after interactions.
- Desktop and mobile preview images were inspected visually. Fixed the comparison caption overflow, arrow/label collisions, tiny partition labels, navigation overlap, and small algorithm labels.
- Screenshot heights follow actual rendered iframe content; CANVAS_HEIGHT is a conservative fallback for responsive and expanded states.

## Instructional Design Decisions

| MicroSim | Bloom Level / Verbs | Pattern and Rationale |
|---|---|---|
| Healthcare Graph Anatomy Explorer | Understand: identify, classify | Click-to-reveal exploration. The Understand-level verbs identify and classify require visible labels and concrete property values. Learners control disclosure; continuous animation is unnecessary. |
| Relational vs. Graph Data Model Side-by-Side | Analyze: differentiate, compare | Bidirectional comparison with a finite worked traversal. The Analyze-level verbs differentiate and compare are supported by paired highlights and explicit SQL clauses. A short learner-triggered traversal exposes each logical step. |
| Graph Sharding Partition Explorer | Analyze: examine, distinguish | Parameter exploration with edge classification and computed feedback. The Analyze-level verbs examine and distinguish require learners to compare edge categories and their consequences. The slider directly changes visible referral edges and the summed cost. |
| Graph Algorithm Family Map | Understand: classify, summarize | Expandable taxonomy with definitions. The Understand-level verbs classify and summarize are supported by question-based families and selectable definitions. A left-to-right tree keeps the leaves readable without continuous animation. |
| Patient Demographics and SDOH Profile | Understand: classify, explain | Click-to-reveal exploration with editable connections. The Understand-level verbs classify and explain require concrete demographic values and patient-specific relationship properties. Optional connections expose the modeling choice without animation. |

The relational specification refers to Encounters and a payer missing from its four-table list. The implementation includes the encounter bridge and reveals the payer for the traversal exercise, with the clarification documented on its index page. Key matching correctly uses primary and foreign keys. Network layouts use stable positions to keep selection and partition membership legible; the mobile partition layout stacks the three shard regions. Sharding latencies are explicitly synthetic, and SDOH demographic data are not used to infer risk.

## Site Validation and Existing Issues

- MkDocs build completed successfully. Existing warnings remain for missing appendix/prompt pages and references to chapters moved into the archive. No warning names one of the five new MicroSim pages.
- The mascot checker passed chapters 2, 4, 5, and 8. Chapter 1’s pre-existing extended “Meet Sage!” introduction triggers the general sentence-count check; the content guide explicitly exempts that one-time introduction. It was preserved. No mascot content was changed.

## Reproduce the Browser Checks

Install Playwright and Chromium in a Python environment, then run from the repository root:

```sh
python src/microsim-tests/check-new-microsims.py --screenshots --output /tmp/healthcare-microsim-results.json
```

Use `--sim <sim-id>` to check one of these five simulations. The test starts and stops its own localhost server.
