---
title: "Healthcare Data Sensitivity Classification Levels"
description: "Sort eight healthcare data elements into four sensitivity tiers by dragging, with immediate feedback and the access rule each tier carries."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/data-sensitivity-classification-levels/data-sensitivity-classification-levels.png
og:image: /sims/data-sensitivity-classification-levels/data-sensitivity-classification-levels.png
library: p5.js
bloom_level: Apply
---

# Healthcare Data Sensitivity Classification Levels

<iframe src="main.html" width="100%" height="802px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

Eight data elements, four tiers, and several deliberate traps. Payer contract terms are not patient data at all and still sit at Confidential, because sensitivity is not the same thing as protected health information. A provider's NPI is a matter of public record and still classifies as Internal, because the classification follows the use rather than the field. Maria Chen's diagnosis code outranks her home address, because an identified patient joined to a clinical fact is the combination that can cost someone a job or their safety. Every correct placement reveals that tier's access rule; every incorrect one returns the card and offers the question that decides the tier. Placing all eight assembles the four rules into one summary panel.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 12-18 minutes. Prerequisites: protected health information, and the idea of role-based access.

**Learning objective:** Given a sample healthcare data element, the learner can classify it into the correct sensitivity tier (Public, Internal, Confidential, Restricted) and identify the access control consequence of that classification.

1. **Explore:** Place the two easy cards first — clinic hours and the marketing brochure — and read the Public access rule that appears.
2. **Explain:** Place the payer contract terms and the de-identified research dataset. Explain what these two have in common that puts them at the same tier as a patient's home address, given that neither identifies a patient.
3. **Transfer:** Once all eight are placed, read the summary panel. Then classify two data elements of your own choosing and name the question you used to decide each.

Assessment: use the Explain prompt as an exit ticket. A complete response separates sensitivity from identifiability, and gives a defensible reason for placing a non-patient data element above a patient one.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/data-sensitivity-classification-levels/main.html" width="100%" height="802px"></iframe>
```

[JavaScript source](data-sensitivity-classification-levels.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 28: Data Quality, Stewardship, and Compliance](../../chapters/28-data-quality-stewardship-and-compliance/index.md).

```text
Type: infographic
**sim-id:** data-sensitivity-classification-levels<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply<br/>
Bloom Taxonomy Verb: classify, demonstrate<br/>
Learning objective: Given a sample healthcare data element, the learner can classify it into the correct sensitivity tier (Public, Internal, Confidential, Restricted) and identify the access control consequence of that classification.

Purpose: Let learners practice classifying realistic healthcare data elements into the four-tier sensitivity scheme described in the preceding worked example, and see the resulting access rule for each tier.

Components to show: Four horizontal bands stacked vertically, labeled bottom-to-top Public, Internal, Confidential, Restricted, each in a progressively "hotter" color. A tray of eight draggable data-element cards above the bands (e.g., "Clinic hours", "Aggregate patient count", "Payer contract terms", "Maria Chen's diagnosis code", "Provider NPI number", "De-identified research dataset", "Patient's home address", "Marketing brochure text").

Data Visibility Requirements:
Stage 1: Show the four bands with their names and colors, and the tray of unsorted cards.
Stage 2: On drag-and-drop of a card onto a band, show immediate feedback (green checkmark or red X) indicating whether the classification is correct, based on a predefined answer key.
Stage 3: On correct placement, reveal a short access-control consequence for that tier (e.g., Restricted: "Requires active care relationship plus MFA").
Final: Once all eight cards are correctly placed, display a summary panel listing each tier's access rule together, reinforcing the full classification scheme at a glance.

Interactive controls:

- Drag-and-drop each card onto its correct band
- "Show Hint" button revealing one classifying question for the currently dragged card (e.g., "Could this identify a specific patient?")
- Reset button to shuffle cards back to the tray

Instructional Rationale: The Apply-level objective (classify, demonstrate) calls for hands-on categorization rather than passive reading; drag-and-drop with immediate correct/incorrect feedback lets the learner test and correct their own mental model of the four tiers, directly mirroring the worked example's claim that classification applies at the level of individual properties, not just whole records.

Layout: Vertical stacked bands taking the left two-thirds of the canvas; card tray on the right; responsive width that reflows the tray below the bands on narrow screens.

Color scheme: Public (cool blue/green), Internal (yellow), Confidential (orange), Restricted (red) -- a "heat" gradient from least to most sensitive.

Implementation: p5.js with mouse-drag event handling for card placement; drop-zone collision detection against the four band rectangles.
```

## Related Resources

- [Chapter 28: Data Quality, Stewardship, and Compliance](../../chapters/28-data-quality-stewardship-and-compliance/index.md)

## References

- [Source chapter](../../chapters/28-data-quality-stewardship-and-compliance/index.md) — supplied the learning objective and the worked example.
- [p5.js reference](https://p5js.org/reference/) — canvas, drawing, and input handling (accessed September 8, 2026).
- [p5.js web editor](https://editor.p5js.org/) — paste the JavaScript source to experiment; no hosted sketch has been published.
- [Wikipedia: Data classification (data management)](https://en.wikipedia.org/wiki/Data_classification_%28data_management%29) — the tiered scheme this exercise applies.
