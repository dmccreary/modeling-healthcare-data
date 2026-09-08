---
title: Instructor's Guide
description: A complete guide for instructors teaching with Modeling Healthcare Data with Graphs, with a deep focus on integrating the book's 127 interactive MicroSims into undergraduate classes.
social:
  cards: false
---

# Instructor's Guide

Welcome to the instructor's guide for *Modeling Healthcare Data with Graphs*.
This guide explains every feature of the textbook, how to use it in an
undergraduate classroom, and how to customize it for your own students. **No
prior technical knowledge is assumed** — every technical term is defined before
it is used.

The centerpiece of this guide is the section on
[Using the MicroSims](#using-the-microsims), because the interactive
simulations are what separate this book from a PDF. If you read only one
section, read that one.

---

## About This Interactive Intelligent Textbook

### What is an Intelligent Textbook?

An **intelligent textbook** is a digital textbook that goes beyond static text
and images. It includes interactive simulations, self-check quizzes, a
searchable glossary, and a structured map of how concepts depend on each other.
The goal is to give students a richer, more engaging learning experience than a
printed textbook can offer.

### The Five Levels of Intelligent Textbooks

Not all digital textbooks are created equal. Intelligent textbooks fall into
five levels based on how interactive and adaptive they are:

<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/book-levels/main.html" height="500px" scrolling="no"
  style="overflow: hidden;"></iframe>

| Level | Name | Description | Example Features |
|-------|------|-------------|-----------------|
| **Level 1** | Static Digital | A PDF or basic web version of a print textbook | Text and images only, no interactivity |
| **Level 2** | Interactive | Adds simulations, quizzes, and searchable glossaries | MicroSims, self-check quizzes, concept search |
| **Level 3** | Adaptive | Adjusts content based on student performance | Personalized learning paths, difficulty adjustment |
| **Level 4** | AI-Assisted | Includes an AI tutor that answers student questions | Chatbot integration, automated feedback |
| **Level 5** | Fully Adaptive AI | Continuously learns from student interactions | Real-time content generation, predictive analytics |

**This textbook is a Level 2 Intelligent Textbook.** It is unusually rich for
Level 2: the interactive layer is not a handful of decorative widgets but 127
purpose-built simulations, most of which carry their own written lesson plan.

### What This Book Contains

| Element | Count |
|---------|------:|
| Chapters | 29 |
| MicroSims (interactive simulations) | 127 |
| MicroSims embedded directly in chapter text | 108 |
| MicroSims with a built-in lesson plan | 119 |
| Concepts in the learning graph | 513 |
| Concept dependencies (prerequisite links) | 552 |
| Glossary terms | 515 |
| FAQ questions | 201 |
| Quiz questions (10 per chapter) | 290 |
| Annotated references | 232 |

### Target Audience and Prerequisites

The book is written for **college undergraduates**. The only stated
prerequisite is **knowledge of databases** — students should be comfortable
with the idea of tables, rows, columns, primary keys, and foreign keys, and
should have seen a `SELECT` statement before. No prior exposure to graph
theory, graph databases, healthcare, or machine learning is assumed; the book
builds all of that from scratch.

This makes the book suitable for:

- A junior/senior elective in a computer science, data science, or information
  systems program
- A health informatics or healthcare analytics course
- A graduate-level survey course for students entering healthcare IT
- Professional and continuing-education cohorts already working in healthcare

### What Makes This Textbook Different

- **Interactive MicroSims** let students manipulate healthcare data models
  directly in the browser — no software installation, no database server, no
  license keys.
- **Three-perspective structure** — the same data is modeled from the
  **patient**, **provider**, and **payer** viewpoints, so students learn that a
  data model is always a model *of someone's* view of the world.
- **A real economic motivation** — the book is framed around the highest
  per-person healthcare costs in the world and the shift from fee-for-service
  to value-based care. Graph modeling is presented as a lever on a real
  problem, not an academic exercise.
- **Learning graph** — a visual map showing how all 513 concepts connect and
  build on each other.
- **Sage the Octopus** — a friendly mascot (a "pedagogical agent") who guides
  students through each chapter with tips, encouragement, and warnings.
- **Completely free and open source** — licensed under Creative Commons for
  non-commercial use.

---

## Using the Chapters

### Chapter Sequence

The 29 chapters are ordered deliberately: each one assumes the concepts from
the ones before it. Students should generally work through them in order,
though the topic blocks below can be resequenced if your course has a different
emphasis.

| Chapters | Topic Area | Note for instructors |
|----------|-----------|----------------------|
| 1–6 | **Graph foundations and technology** — structures, graphs vs. relational, query languages, scalability, algorithms, embeddings and GNNs | The technical core. Skippable in part if students arrive with graph database experience. |
| 7–8 | **Healthcare domain foundations** — economics, medical coding, interoperability, care coordination | The domain core. Do *not* skip these for CS-heavy cohorts; they are where the vocabulary comes from. |
| 9–13 | **Patient and provider perspectives** — diagnosis, treatment, care plans, chronic disease, specialty care, provider organizations, clinical guidelines | The largest and most modeling-intensive block. |
| 14–17 | **Payer perspective and finance** — claims, coverage, pharmacy benefits, reimbursement, revenue and cost, forecasting and risk | Naturally paired with a spreadsheet or SQL comparison assignment. |
| 18–19 | **Fraud, waste, and abuse** — fraud patterns, detection, investigation, compliance | The single most engaging block for most students. Good place for a mid-term project. |
| 20–21 | **AI, LLMs, and knowledge graphs** — RAG, explainability, agentic systems, responsible AI | Pairs well with a current-events discussion. |
| 22–24 | **FHIR and clinical decision support** — FHIR resources, knowledge representation levels, CQL, CDS Hooks, CMS tooling | The most standards-heavy block; budget extra time. |
| 25–28 | **Security, governance, and data quality** — HIPAA, RBAC, incident response, metadata, lineage, stewardship | Often compressed; see the pacing notes below. |
| 29 | **Capstone projects and career development** | Assign early, not late — see below. |

### What Each Chapter Contains

Every chapter follows a consistent structure:

1. **YAML front matter** — metadata at the top of the file (title, description,
   generation date, version). Students never see this; it feeds search engines
   and the site builder.
2. **Summary** — a short overview of what the chapter covers.
3. **Concepts Covered** — a numbered list of the specific concepts from the
   learning graph that this chapter addresses. This is your alignment map: use
   it to check the chapter against your own syllabus outcomes.
4. **Prerequisites** — links to the earlier chapters that should be completed
   first.
5. **Welcome from Sage** — a mascot admonition introducing the chapter topic.
6. **Main content** — the instructional material, with tables, worked
   healthcare examples, and embedded MicroSims.
7. **MicroSims with expandable specifications** — each simulation is followed
   by a collapsible block containing its full design specification (see
   [Anatomy of a MicroSim page](#anatomy-of-a-microsim-page)).
8. **Mascot admonitions** — Sage appears a handful of times per chapter (fewer
   than ten, and fewer in shorter chapters) to highlight key insights
   (thinking), offer practical tips (tip), encourage students through harder
   material (encourage), and warn about common mistakes (warning).
9. **Chapter Summary** — the key takeaways, preceded by a celebration from
   Sage.

### Chapter Length and Pacing

Chapters range from roughly 2,700 to 6,300 words, with an average near 4,200.
At an undergraduate reading pace of about 200 words per minute for technical
prose, a chapter is a **20–30 minute reading assignment** before MicroSim
exploration is added.

Suggested pacing for common course formats:

| Course format | Approach |
|---------------|----------|
| **15-week semester, 3 credits** | ~2 chapters per week. Use the topic blocks above as units, with a project checkpoint at the end of each block. |
| **15-week semester, project-heavy** | Cover chapters 1–19 in depth (~1.5/week), treat 20–28 as assigned reading with in-class MicroSim demos only, and run chapter 29 as the project scaffold from week 4 onward. |
| **10-week quarter** | 3 chapters per week; drop the deep dives in blocks 22–24 and 25–28 to survey level. |
| **Bootcamp / short course** | Chapters 1, 2, 3, 7, 9, 14, 18, 20 form a coherent 8-session arc that touches every stakeholder perspective. |

### Suggested Classroom Use

- **Before class**: assign the chapter as reading. Tell students explicitly to
  *play with* the MicroSims while reading, not just scroll past them — see the
  [pre-class exploration ticket](#pattern-4-flipped-pre-class-exploration-ticket).
- **During class**: use the MicroSims on the projector for whole-class
  demonstration and prediction. Do not re-lecture the chapter text.
- **After class**: assign the quiz for the chapter as a self-check, and the
  chapter's reference list for students who want to go deeper.

!!! note "A note on chapter 29"
    Chapter 29 (Capstone Projects and Career Development) is written as an
    end-of-book chapter, but it works far better assigned **early** — around
    week 3 or 4. Students who know what their capstone will be read chapters
    5–28 with a purpose. The Capstone Project Architecture Template MicroSim in
    that chapter is a usable project-scoping tool from day one.

---

## Using the MicroSims

This is the section that matters most. Everything below is about turning 127
simulations into class time that works.

### What is a MicroSim?

A **MicroSim** (short for "micro-simulation") is a small, self-contained
interactive simulation that runs directly in a web browser. Students do not
install software, create accounts, or configure a database. MicroSims work on
any device with a modern browser — Chrome, Firefox, Safari, or Edge — including
phones and Chromebooks.

Each MicroSim lets students manipulate one or more variables (with sliders,
buttons, dropdowns, or by clicking directly on a diagram) and immediately see
how the model responds. This "learn by doing" approach builds intuition for
abstract concepts far faster than a static diagram can.

A MicroSim is deliberately *micro*: it teaches **one idea**. It is not a lab
environment, not a full application, and not a substitute for hands-on work
with a real graph database. Its job is to make one concept concrete in about
ten minutes.

### Why MicroSims Matter in This Particular Course

Healthcare data modeling has an unusual teaching problem: the interesting
structures are **too large to draw and too abstract to describe**. A provider
referral network with 400 nodes cannot be put on a slide. A claim's path
through eligibility checking, adjudication, and remittance has a dozen decision
points. The difference between a five-table SQL join and a two-hop graph
traversal is invisible until you watch both run.

MicroSims solve this. They let students:

- **See scale** — watch a centrality algorithm rank 200 providers at once
- **Change one variable at a time** — move a fraud detection threshold and
  watch true positives and false positives trade off against each other
- **Trace a path** — step through a claim, a care pathway, or a CDS Hooks
  request-response cycle one stage at a time
- **Compare two models side by side** — the relational and graph versions of
  the same healthcare question, with the same data

### Where the MicroSims Live

There are three ways to reach them:

1. **Embedded in chapters** — 108 MicroSim embeds appear inline in the chapter
   text, right next to the concept they illustrate. This is where students
   normally meet them.
2. **The MicroSim gallery** — the [MicroSims](../sims/index.md) page in the
   left navigation shows all 127 as a thumbnail grid with one-line
   descriptions. Use this when you want to browse for a demo.
3. **Their own standalone pages** — every MicroSim has its own page with a
   description, a lesson plan, an embed snippet, and a full specification. This
   is the page you want when planning a lesson.

### Anatomy of a MicroSim Page

Open any MicroSim page — for example the
[Healthcare Graph Anatomy Explorer](../sims/healthcare-graph-anatomy-explorer/index.md)
— and you will find a consistent structure. Knowing this structure is the
single biggest time-saver in lesson prep.

| Section | What it gives you |
|---------|-------------------|
| **The running simulation** | The MicroSim itself, plus a **Run MicroSim in Fullscreen** button for projecting |
| **Description** | Two or three sentences on what the controls do |
| **Lesson Plan** | Audience, time estimate, prerequisites, a stated learning objective, a three-step activity, and an assessment prompt |
| **Embed This MicroSim** | A copy-paste `<iframe>` snippet for your LMS or course site |
| **Quality Checks** | For validated MicroSims: the date it was browser-tested, at what screen widths, and its completeness score |
| **Specification** | The full design specification — node types, edge types, interaction stages, controls, layout, and instructional rationale |

Inside the chapter text, that same specification is available in the
collapsible block directly beneath each simulation. Click the summary line to
expand it.

### The Built-In Three-Move Lesson Plan

**119 of the 127 MicroSims carry a written lesson plan**, and they all follow
the same three moves. Learning this pattern once means you can teach any
MicroSim in the book without writing a lesson from scratch.

| Move | What students do | Cognitive purpose |
|------|-----------------|-------------------|
| **1. Explore** | Manipulate specific controls and record specific observations; make a prediction, then test it | Builds a concrete referent before any abstraction |
| **2. Explain** | Put the mechanism into their own words, distinguishing the general rule from this instance | Forces articulation — the step students skip on their own |
| **3. Transfer** | Sketch a *different* healthcare example using the same concept, and name one modeling assumption | Checks whether the idea generalized or stayed stuck to the demo |

Each lesson plan ends with an **assessment** paragraph telling you what a
complete response contains. Those paragraphs are written to be used verbatim as
exit-ticket rubrics.

Here is the pattern in the wild, from the Healthcare Graph Anatomy Explorer:

> **Explore:** Inspect Patient, Provider, and TREATED_BY. Record one label and
> one property for each. Predict which edges will highlight when you select
> Provider, then test your prediction.
>
> **Explain:** Explain why Patient is a label, `patient_id` is a property key,
> and `MRN-48213` is a property value.
>
> **Transfer:** Sketch a different healthcare example using the same concept
> and explain one modeling assumption.

Notice what the Explore step does *not* say: it does not say "explore freely."
Unstructured exploration is the most common way MicroSim time gets wasted.
Always give students a specific thing to record.

### MicroSim Inventory by Chapter

Use this table to plan which sessions get a live demo. Chapters with five or
six MicroSims can support an entire lab period; chapters with two are better
served by a single focused demo.

| Ch | Chapter | Sims | Anchor MicroSim to demo |
|---:|---------|-----:|-------------------------|
| 1 | Foundations of Graph Structures | 2 | Healthcare Graph Anatomy Explorer |
| 2 | Graphs vs. Relational Databases | 2 | Relational vs. Graph Data Model Side-by-Side |
| 3 | Graph Query Languages and Pattern Matching | 5 | Cypher Query Components Infographic |
| 4 | Graph Database Scalability and Operations | 2 | Graph Sharding Partition Explorer |
| 5 | Graph Algorithms, Centrality, and Similarity | 6 | Centrality Measures Comparison |
| 6 | Graph Embeddings, Clustering, and GNNs | 2 | Node Embedding Explorer |
| 7 | Healthcare Economics and Medical Coding | 4 | Per-Person Healthcare Cost Comparison Chart |
| 8 | Healthcare Interoperability and Care Coordination | 3 | Clinical Encounter Workflow |
| 9 | Patient Diagnosis, Treatment, and Medication | 4 | Bayesian Diagnostic Reasoning |
| 10 | Patient Care Plans and Chronic Disease | 4 | Preventive Care Gap Closure |
| 11 | Specialty Care, Surgery, Remote Monitoring | 3 | Post-Surgical Care Transition Workflow |
| 12 | Provider Organizations, Networks, Scheduling | 5 | Provider Referral Network Analysis |
| 13 | Clinical Guidelines, Care Pathways, Workforce | 2 | Clinical Protocol Workflow: Chest Pain |
| 14 | Insurance Claims, Coverage, Pharmacy Benefits | 5 | Cost-Sharing Calculation |
| 15 | Reimbursement, Health Plans, Payer Contracts | 2 | Allowed Amount and Reimbursement Breakdown |
| 16 | Healthcare Revenue and Cost Analysis | 6 | Service Line Profitability Analysis |
| 17 | Healthcare Financial Forecasting and Risk | 3 | Value-Based Payment Shared-Savings |
| 18 | Healthcare Fraud Patterns and Detection | 6 | Anomaly Score Threshold Explorer |
| 19 | Fraud Investigation and Compliance | 2 | Provider Network Fraud Detection Dashboard |
| 20 | AI, LLMs, and Knowledge Graphs | 5 | Yin-Yang LLM vs Knowledge Graph |
| 21 | Responsible AI and Agentic Systems | 6 | Model Drift Detection Monitor |
| 22 | FHIR Resources and Knowledge Representation | 4 | Knowledge Representation Levels by Tier Matrix |
| 23 | Clinical Guideline Authoring and CQL | 4 | CQL-to-ELM Compilation Pipeline |
| 24 | CDS Hooks, Alerts, and CMS CQL Tooling | 3 | CDS Hooks Request-Response Cycle |
| 25 | Healthcare Data Security Fundamentals | 6 | Healthcare RBAC Graph Data Model |
| 26 | Advanced Security Operations and Incident Response | 2 | Security Incident Response Lifecycle |
| 27 | Data Governance and Metadata Management | 5 | Healthcare Data Lineage Graph Visualization |
| 28 | Data Quality, Stewardship, and Compliance | 3 | Data Quality Impact Analysis |
| 29 | Capstone Projects and Career Development | 2 | Capstone Project Architecture Template |

### Six Classroom Patterns for Integrating MicroSims

These six patterns cover nearly every way a MicroSim earns its class time. Pick
one per session; mixing more than two in a single class period tends to feel
frantic.

#### Pattern 1: Whole-Class Predict–Observe–Explain (10–12 minutes)

The highest-value use of a MicroSim, and the one to default to.

1. **Set up (1 min).** Project the MicroSim with all controls at their default
   values. Name what the students are looking at, but do not yet explain the
   mechanism.
2. **Predict (2 min).** Announce exactly which control you are about to change
   and in which direction. Ask every student to write down a prediction —
   on paper, in a chat window, or on a poll. *Writing it down is the load-bearing
   step.* A prediction that stays in a student's head costs nothing to abandon.
3. **Poll (1 min).** Show the split. Disagreement is the goal; if 95% agree,
   your prediction question was too easy.
4. **Observe (2 min).** Make the change. Say nothing while it runs.
5. **Explain (4 min).** Ask a student who predicted correctly *and* a student
   who predicted incorrectly to each explain the result. The incorrect
   prediction is usually the more instructive one.
6. **Generalize (2 min).** State the rule the MicroSim just demonstrated, and
   connect it to the chapter's Concepts Covered list.

**Worked example — Chapter 18, Anomaly Score Threshold Explorer.** Prediction
question: *"I am going to lower the anomaly score threshold. What happens to
the number of fraud cases we catch, and what happens to the number of clean
providers we wrongly investigate?"* Nearly every student gets the first half
right and underestimates the second. The tradeoff between detection rate and
investigation capacity is the whole lesson, and it lands in ninety seconds of
slider movement.

#### Pattern 2: Think–Pair–Share on a Shared Parameter (12–15 minutes)

Best for MicroSims with a genuine judgment call rather than a single right
answer.

1. Give every pair the same scenario and a **constraint** — "your fraud unit
   can investigate 40 cases per month," "this practice has 12 open appointment
   slots per day."
2. Each student works the MicroSim alone for 4 minutes and writes down a
   recommended setting plus one sentence of justification.
3. Pairs compare, and must converge on a single recommendation.
4. Three pairs report out. Ask specifically for *disagreements they resolved*,
   not final answers.

Strong candidates: Anomaly Score Threshold Explorer (Ch 18), Payer Mix and
Contract Negotiation (Ch 16), Risk Adjustment and Capitation Calculator
(Ch 16), Prior Authorization Decision Tree (Ch 14), Appointment Scheduling and
No-Show Simulator (Ch 12).

#### Pattern 3: Station Rotation or Jigsaw (30–45 minutes)

Use in chapters with five or six MicroSims — chapters 5, 12, 14, 16, 18, 21,
and 25 are built for this.

1. Divide the class into as many groups as the chapter has MicroSims.
2. Each group gets **one** MicroSim and works its built-in Explore / Explain /
   Transfer lesson plan (10–15 minutes).
3. Each group prepares a **90-second** teach-back: what the sim shows, what
   surprised them, and one question it raised.
4. Rotate through the teach-backs. The whole chapter's interactive content gets
   covered in half the time it would take to demo each one yourself.

**Worked example — Chapter 25, Healthcare Data Security Fundamentals.** Six
groups take Healthcare Data Protection Layers, HIPAA Compliance Workflow,
Authentication vs Authorization, Healthcare RBAC Graph Data Model, Audit Trail
Analysis, and De-Identification Techniques Comparison. The teach-backs
naturally assemble into the layered security story the chapter is telling —
and students construct that story themselves rather than receiving it.

#### Pattern 4: Flipped Pre-Class Exploration Ticket

Assign before class so that class time starts at the Explain step rather than
the Explore step.

Give students this four-line ticket, due at the start of class:

```text
MicroSim: ______________________________
1. One setting I changed, and the exact value I changed it to:
2. What I expected to happen:
3. What actually happened:
4. One question this raised that the chapter text did not answer:
```

Line 4 is the payload. Collect the tickets, scan them for two minutes before
class, and open the session with the three most common questions. This turns
"did you do the reading?" into a class period that is visibly built out of the
students' own confusion.

#### Pattern 5: Guided Inquiry Lab Worksheet (45–75 minutes)

For lab or studio sections. Chain three or four MicroSims from the *same* topic
block into a single investigation with one driving question.

**Worked example — "Where does the money go?" (Chapters 14–16).**

| Step | MicroSim | Question students answer |
|------|----------|--------------------------|
| 1 | Insurance Policy and Benefit Plan Graph Model | What entities does a benefit plan connect, and where does the member sit? |
| 2 | Cost-Sharing Calculation | For a \$4,200 procedure, what does the member owe under three different plan designs? |
| 3 | Allowed Amount and Reimbursement Breakdown | Where did the rest of the charge go — and what is a contractual write-off? |
| 4 | Service Line Profitability Analysis | Given all of the above, which service lines actually make money? |

Students finish with a defensible answer to a question no single chapter
answers, and they have crossed three chapters to get there.

#### Pattern 6: Exit Ticket and Formative Assessment (5 minutes)

Every lesson plan's **assessment** paragraph is already written as an exit
ticket. Project the MicroSim, put the Explain prompt on the board, and collect
one paragraph.

Because the lesson plans state what a complete response contains — typically
"names the relevant graph elements, traces the displayed evidence, and
distinguishes a modeling assumption from a general claim" — these are fast to
grade on a 0/1/2 scale and give you a real read on the room.

### Two Worked Session Plans

#### A 50-minute session: Chapter 2, Graphs vs. Relational Databases

| Time | Activity |
|------|----------|
| 0–5 | Recap: nodes, edges, labels, properties (from Chapter 1). No slides. |
| 5–17 | **Pattern 1** on *Relational vs. Graph Data Model Side-by-Side*. Prediction: "How many tables does the relational side need to answer 'which providers has this patient seen?' — and how many hops does the graph side need?" |
| 17–27 | **Pattern 1** on *Query Performance: RDBMS vs Graph*. Prediction: "What happens to each side's response time as we go from 2 hops to 5 hops?" This is the chapter's central claim; let them watch it. |
| 27–42 | **Pattern 2**: pairs argue for relational *or* graph for a specific scenario you supply (a billing ledger — where relational usually wins). The point is that graph is not always the answer. |
| 42–50 | Debrief and assign the Chapter 2 quiz as a self-check. |

#### A 75-minute session: Chapter 18, Healthcare Fraud Patterns and Detection

| Time | Activity |
|------|----------|
| 0–8 | Open with a real published fraud case from the chapter's reference list. |
| 8–20 | **Pattern 1** on *Healthcare Fraud Scheme Network Visualization*. Prediction: "Which of these providers is the ringleader, and what in the picture tells you?" |
| 20–35 | **Pattern 1** on *Anomaly Score Threshold Explorer*, using the threshold/capacity tradeoff described above. |
| 35–60 | **Pattern 2** with the constraint "your unit can investigate 40 cases per month." Pairs pick a threshold and defend it. |
| 60–70 | Report-outs. Push on the ethical dimension: every false positive is a real clinician under investigation. |
| 70–75 | Assign: *DME Fraud Pattern Detector* and *Behavioral Health Fraud Network* as the pre-class ticket for the next session. |

### When You Have Less Time Than the Book Has MicroSims

You will not demo 127 simulations, and you should not try. Three triage rules:

1. **One anchor demo per chapter.** The "Anchor MicroSim" column in the
   [inventory table](#microsim-inventory-by-chapter) is a defensible default.
   Everything else becomes assigned exploration.
2. **Prefer the 27 validated MicroSims for live demos.** These have been
   browser-tested at 400, 800, and 1200 pixels wide with no JavaScript errors,
   and each carries a complete lesson plan. They are listed at the top of the
   [MicroSims gallery](../sims/index.md) with their validation dates. A demo
   that fails in front of the class costs more than the demo was worth.
3. **Demo the ones that show a *process*; assign the ones that show a
   *structure*.** Workflows, pipelines, and thresholds benefit from a shared
   narration. Graph models and comparison tables read fine alone.

### Matching MicroSims to Bloom's Taxonomy Levels

Each MicroSim's specification block names the **Bloom's Taxonomy level** it
targets. Bloom's Taxonomy classifies thinking skills from simple to complex:

| Level | Name | What it means | In a MicroSim, this looks like |
|-------|------|--------------|-------------------------------|
| L1 | Remember | Recall facts and definitions | Reading labels off a rendered diagram |
| L2 | Understand | Explain concepts in your own words | Hovering to reveal properties, then articulating label vs. property |
| L3 | Apply | Use concepts to solve problems | Computing a cost share for a given plan design |
| L4 | Analyze | Break down and examine relationships | Comparing centrality measures to find the structurally important provider |
| L5 | Evaluate | Make judgments against criteria | Choosing a fraud threshold given investigation capacity |
| L6 | Create | Produce original work | Designing a graph model for a new healthcare scenario |

The book's MicroSims cluster at **L2–L5**. There is no MicroSim at L6 — by
design. L6 is what the [capstone project](../chapters/29-capstone-projects-and-career-development/index.md)
is for, and it is where "have students build their own MicroSim" (below) comes
in.

### Embedding MicroSims in Your LMS or Course Site

Every MicroSim can be dropped into any web page you control — Canvas,
Blackboard, Moodle, Brightspace, Google Sites, a WordPress blog, or a plain
HTML file.

!!! mascot-tip "Sage's Tip: Embed MicroSims Anywhere!"
    ![Sage shares a tip](../img/mascot/tip.png){ class="mascot-admonition-img" }
    You can put any MicroSim on **any** web page you control — one line of HTML
    and your students have an interactive simulation right inside your LMS.
    Every MicroSim page has a ready-made snippet under **Embed This MicroSim**,
    so you never have to type the URL by hand. Let's connect the dots!

The snippet looks like this:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/healthcare-graph-anatomy-explorer/main.html"
    width="100%" height="962px" scrolling="no">
</iframe>
```

Three things to know:

1. **Replace the sim name** with any MicroSim's directory name from the
   [MicroSims gallery](../sims/index.md) — the last path segment of its URL.
2. **The height matters.** MicroSims in this book range from about 445px to
   1880px tall, and the height is tuned per simulation. Copy the height from
   the MicroSim's own **Embed This MicroSim** section rather than guessing; a
   height that is too small clips the controls, and clipped controls are the
   number-one cause of "the MicroSim is broken" emails.
3. **`scrolling="no"` is intentional.** It prevents a scrollbar from appearing
   inside the frame.

**LMS-specific notes:**

- **Canvas** — use the Rich Content Editor's HTML view (`</>` icon) and paste
  the iframe. Canvas permits iframes from external HTTPS sources by default.
- **Blackboard / Brightspace** — some institutions restrict iframe sources. If
  the frame renders blank, ask your LMS administrator to allow
  `dmccreary.github.io`.
- **Google Sites** — use **Insert → Embed → Embed code** and paste the iframe.
- **Anywhere iframes are blocked** — link to the MicroSim's fullscreen URL
  instead. Every MicroSim page has a **Run MicroSim in Fullscreen** button, and
  that URL (ending in `/main.html`) opens standalone in a new tab.

### Running MicroSims Without Internet Access

MicroSims are static HTML and JavaScript, so a local copy of the site works
offline for everything except MicroSims that load a library from a CDN. To run
the whole book locally:

```bash
git clone https://github.com/dmccreary/modeling-healthcare-data.git
```

```bash
pip install mkdocs mkdocs-material
```

```bash
mkdocs serve
```

Then open `http://127.0.0.1:8000/modeling-healthcare-data/`. If your classroom
network is fully air-gapped, test the specific MicroSims you plan to use
beforehand — the ones built on p5.js, vis-network, and Chart.js load those
libraries from a content delivery network and will need it available the first
time.

### Having Students Build Their Own MicroSim

This is the book's best capstone-adjacent assignment, and the material for it
is already in the repository.

Every MicroSim in a chapter is followed by a collapsible **specification** — a
complete design document naming the node types, edge types, interaction stages,
controls, layout, canvas size, legend, and the instructional rationale for each
choice. Beyond that, the repository contains **118 specifications for MicroSims
that have not been built yet**, in `docs/sims/TODO/`. Each is a JSON file with
a learning objective, a target Bloom level, a suggested library, and the full
specification text.

Three assignment shapes, in increasing difficulty:

1. **Critique a specification (L4–L5, one week).** Give each student a built
   MicroSim and its specification. Ask: does the implementation satisfy the
   stated learning objective? Which design choice would you change, and what
   would that cost pedagogically? No coding required — this works in a
   non-programming section.
2. **Write a specification (L6, two weeks).** Students pick a concept from the
   [learning graph](../learning-graph/index.md) that has no MicroSim and write
   a full specification in the book's format: learning objective, Bloom level
   and verb, node and edge types, interaction stages, controls, layout,
   instructional rationale. Grade the rationale, not the aesthetics.
3. **Build one (L6, three to four weeks).** Students implement an unbuilt
   specification from `docs/sims/TODO/` using p5.js, vis-network, or Chart.js.
   The specification tells them exactly what to build, which removes scope
   negotiation from the assignment and leaves the actual engineering. Strong
   student work can be contributed back to the book via a pull request.

Suggested rubric for assignments 2 and 3:

| Criterion | Weight |
|-----------|-------:|
| Learning objective is specific, measurable, and matched to a real Bloom level | 25% |
| Every interactive control serves the objective (no decorative controls) | 20% |
| Healthcare content is accurate and uses correct terminology | 20% |
| Instructional rationale explains *why* these interactions teach this idea | 20% |
| Works in a browser at 400, 800, and 1200 pixels wide with no console errors | 15% |

### Assessing MicroSim-Based Work

A simple, fast 0–3 scale that pairs with the built-in lesson plans:

| Score | Description |
|------:|-------------|
| 0 | No engagement, or restates the chapter text without reference to the simulation |
| 1 | Describes what was observed but not why |
| 2 | Explains the mechanism correctly using the sim's evidence |
| 3 | Explains the mechanism *and* transfers it to a new healthcare scenario, naming at least one modeling assumption |

The jump from 2 to 3 is the one worth grading for. Students who can only reach
2 have learned the simulation; students who reach 3 have learned the concept.

### Accessibility and Device Notes

- **Screen size.** The validated MicroSims are tested at 400, 800, and 1200
  pixels wide, so they work on phones. Complex network visualizations (Chapter
  5, 12, 18, 19) are genuinely hard to read on a phone — for those sessions,
  ask students to bring a laptop or tablet.
- **Keyboard access.** Several MicroSims, including the Healthcare Graph
  Anatomy Explorer, support keyboard element selection. Coverage is not yet
  universal; if you have a student who navigates by keyboard, check the
  specific MicroSims for a session in advance and pair the student with a
  partner for any that are mouse-only.
- **Color.** Several MicroSims encode meaning in color. When you demo, say the
  category name aloud rather than pointing at "the orange one."
- **Motion.** A few simulations animate continuously. Students sensitive to
  motion can use the fullscreen link and pause or reset rather than watching a
  looping frame embedded in a page of text.

### MicroSim Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Blank rectangle where the sim should be | Library blocked by a school firewall or content filter | Try the fullscreen `main.html` URL; if that also fails, ask IT to allow `cdnjs.cloudflare.com` and `dmccreary.github.io` |
| Controls cut off at the bottom | Iframe height too small for the embedding page | Copy the exact height from the MicroSim's **Embed This MicroSim** section |
| Sim renders but nothing responds to clicks | JavaScript error, often from a stale cached file | Hard-refresh (Ctrl+Shift+R / Cmd+Shift+R) |
| Looks wrong on a projector | Projector is rendering at a narrow effective width | Use the fullscreen button rather than the embedded frame when projecting |
| Works for you, not for a student | Very old browser | The MicroSims require a browser from the last few years; Chrome, Firefox, Safari, and Edge all work |

If a MicroSim is genuinely broken, please report it — see
[Feedback](#feedback) below. Include the MicroSim name, your browser, and what
you clicked.

---

## Using the Glossary

### What is the Glossary?

The [glossary](../glossary.md) is an alphabetical list of **515 key terms**
used in the book, each with a precise, concise definition. Definitions follow
the ISO 11179 metadata registry standard: each one states what the term *is*
without using the term in its own definition and without embedding
implementation details.

For a course that spans graph theory, clinical vocabulary, insurance
terminology, and AI, a shared glossary is not a convenience — it is the thing
that keeps a class discussion from quietly splitting into two conversations.

### Tips for Using the Glossary in Class

- **Vocabulary preview.** Before starting a chapter, have students look up the
  terms from the Concepts Covered list. Five minutes here saves fifteen later.
- **Definition matching.** A warm-up in which students match definitions to
  terms, with two distractors drawn from an adjacent chapter.
- **Student-generated definitions.** After a chapter, have students write their
  own definition of a term, then compare to the glossary and explain the gap.
  The gap is where the learning is.
- **Terminology drift.** Healthcare vocabulary is full of near-synonyms that
  mean different things to different stakeholders — *encounter* vs. *visit*,
  *claim* vs. *bill*, *provider* vs. *practitioner*. Ask students to find two
  such pairs in the glossary and explain the distinction. This is exactly the
  skill data modeling requires.

---

## Using the FAQ

### What is the FAQ?

The [FAQ](../faq.md) contains **201 questions** with clear, concise answers
written at the same reading level as the chapters, organized by topic.

### Tips for Using the FAQ in Class

- **Discussion starters.** Open class with two or three FAQ questions before
  revealing the answers.
- **Homework support.** Point students here first when they are stuck outside
  class hours; it answers most of what students ask by email.
- **Extension reading.** The FAQ often covers angles the chapter text does not,
  making it good enrichment for students who finish early.
- **Exam review.** Students can use the FAQ as a structured study guide.

---

## Using the Quizzes

### What Are the Quizzes?

Each of the 29 chapters has a **quiz page** with **10 multiple-choice
questions** — 290 in total. Each question is aligned to a specific concept from
the learning graph, and each answer includes an explanation of why the correct
answer is correct *and* why each distractor is wrong.

### How Quizzes Work

- Reach a quiz from the **Quiz** link under each chapter in the left
  navigation.
- Each question is followed by a collapsible **Show Answer** block. Students
  click to reveal after attempting.
- Each answer names the **Concept Tested**, which links the question back to
  the learning graph.
- Quizzes are **not auto-graded**. They are formative self-checks, not
  summative assessments.

### Tips for Using Quizzes in Class

- **Exit tickets.** Assign three of the ten questions at the end of a period.
- **Pre-reading diagnostic.** Assign the quiz *before* the chapter to surface
  what students already believe. Wrong answers before reading are useful data,
  not failures.
- **Collaborative quizzing.** Pairs must agree on an answer *and* state why
  each distractor is wrong before revealing. The distractor explanations in
  this book are written to support exactly this.
- **Custom assessments.** The questions are openly licensed — use them as a
  bank for your own graded tests. Because students can see the answers, use the
  bank as a *model* for writing parallel items rather than copying items
  verbatim onto an exam.

---

## Using the References

### What Are the References?

Each chapter has an **Annotated References** page — 232 references across the
book. Each entry includes:

- **Title** — the name of the source
- **URL** — a clickable link
- **Relevance** — why this source is useful and how it connects to the chapter

References prioritize Wikipedia for accessibility and stable URLs, supplemented
by authoritative books, standards documents (HL7 FHIR, CMS), and research
papers.

### Tips for Using References in Class

- **Assign one reference per student** from a chapter's list, with a two-minute
  report-out. Twelve students cover the chapter's whole bibliography.
- **Source evaluation.** Ask students to rank three references from the same
  chapter by authority and explain the ranking. Healthcare is a field where
  distinguishing a standards body from a vendor blog post is a professional
  skill.

### A Note About Link Rot

**Link rot** is when a URL stops working because a page moved or was deleted.
If you or your students hit a broken link:

1. Search for the article title on the source website.
2. Try the [Wayback Machine](https://web.archive.org/) for an archived copy.
3. Report it via GitHub Issues (see [Feedback](#feedback)).

---

## The Learning Graph

### What is a Learning Graph?

A **learning graph** is a map of how the book's concepts depend on each other.
It is a **DAG** (Directed Acyclic Graph) — a diagram where arrows point from a
prerequisite concept to the concept that needs it, and no chain of arrows ever
loops back on itself.

This book's learning graph contains **513 concepts** connected by **552
dependency edges**. The interactive
[Learning Graph Viewer](../sims/graph-viewer/index.md) lets you search,
filter, and explore it.

### How Instructors Can Use the Learning Graph

- **Syllabus alignment.** Compare the concept list to your existing syllabus to
  find coverage gaps in either direction.
- **Prerequisite checking.** Before teaching a concept, verify that its
  prerequisites have been covered. The graph makes chains visible that a table
  of contents hides.
- **Remediation.** When a student is stuck on a concept, trace backward along
  its incoming edges to find the actual gap. It is rarely the concept in front
  of them.
- **Resequencing.** If you plan to reorder chapters, check the graph first —
  it will show you which dependencies you are about to break.
- **Enrichment.** Advanced students can follow the graph forward from a concept
  they have mastered.

Supporting reports in the **Learning Graph** section of the navigation include
the concept list, concept taxonomy, taxonomy distribution, quality metrics,
glossary and FAQ quality reports, and the MicroSim coverage report — the last
of which shows which concepts do and do not yet have an interactive simulation.

---

## Sage: Your Pedagogical Agent

### What is a Pedagogical Agent?

A **pedagogical agent** is a character who appears throughout a textbook to
guide students. Research on the **persona effect** finds that a consistent,
friendly character improves student engagement and their perception of how much
they are learning.

### Meet Sage

**Sage** is a deep-blue octopus with small round glasses and orange-accented
arms. Sage's catchphrase is *"Let's connect the dots!"*

The octopus was chosen deliberately: eight arms radiating from a central body
are a living picture of edges radiating from a node, and an octopus's
distributed nervous system — neurons spread through the arms rather than
centralized in one brain — echoes the graph neural network material in Chapter
6. Sage's voice is warm, playful, and fond of graph puns, and returns often to
the idea that these skills are a real lever on healthcare costs.

### How Sage Appears

Sage appears as colored callout boxes (called **admonitions**) throughout each
chapter:

| Type | Purpose | Typical frequency |
|------|---------|-------------------|
| Welcome | Introduces the chapter | Once, at each chapter opening |
| Thinking | Highlights a key insight | 1–4 per chapter |
| Tip | Shares practical advice | As the material warrants |
| Warning | Flags a common mistake | As the material warrants |
| Encourage | Supports students through hard material | Where students tend to struggle |
| Celebration | Marks progress | Once, at each chapter close |
| Neutral | General notes | Rarely |

Sage appears fewer than ten times in any chapter, less often in shorter
chapters, and never in back-to-back boxes.

### Tips for Instructors

- **Read Sage's tips aloud.** They are written conversationally and work well
  spoken.
- **Use the thinking boxes as discussion prompts.** They mark the insights the
  chapter most wants students to carry away.
- **Point struggling students to the encourage boxes.** They are placed exactly
  where students historically get stuck.
- **Do not skip the mascot when teaching adults.** Professional and graduate
  students sometimes roll their eyes at a cartoon octopus for about one
  chapter, and then start quoting it.

---

## Feedback

### Reporting Issues and Suggestions

This textbook is an open-source project hosted on **GitHub**, a website where
projects are developed collaboratively. You do not need to know how to program
to report a problem.

### What is a GitHub Issue?

A **GitHub Issue** is like a support ticket — a way to report a bug, suggest an
improvement, or ask a question. Each issue gets a number and can be discussed
publicly.

### How to Submit Feedback

1. Go to [dmccreary/modeling-healthcare-data](https://github.com/dmccreary/modeling-healthcare-data).
2. Click the **Issues** tab.
3. Click **New issue**.
4. Give it a clear title — "Broken link in Chapter 5 references" or "MicroSim
   controls clipped in Canvas."
5. In the description, include the page or chapter, what you expected versus
   what happened, and your browser and device.
6. Click **Submit new issue**.

A free GitHub account is required. If you prefer not to create one, use the
[Contact](../contact.md) page.

### Feedback That Is Especially Welcome

- **Classroom experience reports** — what worked, what fell flat, and how long
  it actually took. Timing estimates in this guide improve only with real data.
- **MicroSim bugs** — anything that fails to load or behaves unexpectedly.
- **Factual errors** in the healthcare, coding, or standards material.
- **Accessibility issues** — anything hard to read or navigate.
- **Missing MicroSims** — a concept you had to explain by hand that a
  simulation would have carried.

---

## Understanding the License

### What is a Creative Commons License?

A **license** is a legal document explaining what others may do with a work. A
**Creative Commons (CC)** license is a standardized, plain-language license
used widely for educational content.

### This Textbook's License

This textbook uses **CC BY-NC-SA 4.0**:

| Code | Full Name | What It Means |
|------|-----------|---------------|
| **CC** | Creative Commons | A standard open license |
| **BY** | Attribution | You must credit the original author |
| **NC** | Non-Commercial | You may not use the material to make money |
| **SA** | Share-Alike | Modified versions must carry the same license |
| **4.0** | Version 4.0 | The current standard version |

### What You CAN Do

- **Copy** the whole book or individual chapters for your students
- **Share** the link with colleagues, students, or parents
- **Print** chapters for classroom use
- **Modify** the content — add examples, cut sections, reorder chapters
- **Translate** it into other languages
- **Embed** the MicroSims in your own course pages
- **Reuse the quiz questions** in your own assessments
- **Create derivative works** — build your own version of the book

### What You CANNOT Do

- **Sell** the book or charge students for access to it
- **Remove attribution** — Dan McCreary must be credited
- **Relicense** — derivative works must remain CC BY-NC-SA 4.0
- **Claim it as your own work**

The non-commercial clause deserves one clarification for instructors: teaching a
course at a tuition-charging institution is not what "commercial use" targets.
Selling the book, or a course pack built from it, as a product is. If you are
unsure about a specific case, consult your institution's counsel.

For the full legal text, see the [License](../license.md) page.

---

## Customizing Your Own Version

You can create your own customized version of this textbook. This section
explains how, step by step.

### Key Technical Terms

- **Repository (repo)** — a folder on GitHub containing all of a project's
  files.
- **Git** — a version control tool that tracks changes to files.
- **Clone** — making a copy of a repository on your own computer.
- **Fork** — making a copy of a repository under your own GitHub account.
- **MkDocs** — the software that turns the book's markdown files into a
  website.
- **Markdown** — a simple text formatting language. `**bold**` makes **bold**,
  `# Heading` makes a heading, `-` makes a bullet.
- **mkdocs.yml** — the main configuration file: site title, navigation,
  colors, and features.

### Step 1: Create a GitHub Account

Go to [github.com](https://github.com) and create a free account.

### Step 2: Fork or Clone

**Option A — Fork (easier, stays on GitHub)**

1. Go to [dmccreary/modeling-healthcare-data](https://github.com/dmccreary/modeling-healthcare-data)
2. Click **Fork** in the upper right
3. You now have your own editable copy

**Option B — Clone (more control, works on your computer)**

Install [Git](https://git-scm.com/), then run:

```bash
git clone https://github.com/dmccreary/modeling-healthcare-data.git
```

### Step 3: Make Changes

All content lives in the `docs/` folder as markdown files.

**Change the title and author** — edit these lines in `mkdocs.yml`:

```yaml
site_name: "Your Custom Textbook Title"
site_description: "Your description here"
site_author: "Your Name"
```

**Change the colors** — in `mkdocs.yml`:

```yaml
theme:
  palette:
    primary: 'orange'   # change to: blue, red, purple, teal, green, indigo...
    accent: 'blue'
```

MkDocs Material supports: red, pink, purple, deep purple, indigo, blue, light
blue, cyan, teal, green, light green, lime, yellow, amber, orange, deep orange,
brown, grey, blue grey.

**Change the logo** — replace `docs/img/mascot/welcome.png`, or point
`theme.logo` at a different file.

**Reorder or remove chapters** — edit the `nav:` block in `mkdocs.yml`. Check
the [learning graph](../learning-graph/index.md) first to see which
prerequisites you would be breaking.

**Add your own chapter** — create `docs/chapters/30-your-topic/index.md` and
add it to `nav:`.

### Step 4: Preview Locally

Install Python 3.8 or newer, then:

```bash
pip install mkdocs mkdocs-material
```

```bash
mkdocs serve
```

Open `http://127.0.0.1:8000/modeling-healthcare-data/`. The server watches for
file changes and refreshes the page as you save.

### Step 5: Publish Your Version

```bash
mkdocs gh-deploy
```

This builds the site and publishes it to
`https://YOUR-USERNAME.github.io/modeling-healthcare-data/`, usually within a
couple of minutes.

---

## Analytics

### What is Web Analytics?

**Web analytics** measures how visitors use a website — which pages they visit,
how long they stay, where they came from. For a textbook, it tells you which
chapters students actually read and which MicroSims they actually open.

### Setting Up Your Own Google Analytics

The published version of this book uses Google Analytics. If you fork it, point
it at your own property:

1. Go to [analytics.google.com](https://analytics.google.com/) and sign in.
2. Create a new **property** for your site.
3. Google issues a **Measurement ID** shaped like `G-XXXXXXXXXX`.
4. In `mkdocs.yml`, replace the existing ID:

```yaml
extra:
  analytics:
    provider: google
    property: G-YOUR-MEASUREMENT-ID
```

5. Rebuild and deploy. Data appears within 24–48 hours.

Do not leave the original author's Measurement ID in a fork — your students'
traffic would be reported into someone else's property, and you would see
nothing.

### What Analytics Can Tell You

- Which chapters are most and least visited — where students are skipping
- Average time on page — engagement, or confusion
- Device breakdown — how many students are reading on a phone
- Which MicroSim pages get opened directly, which is a good proxy for which
  ones students found worth revisiting

### xAPI Monitoring (Advanced)

**xAPI** (Experience API, also called "Tin Can API") is a standard for tracking
detailed learning activities — not just page views but specific interactions
like "student moved the threshold slider to 0.72."

An **LRS** (Learning Record Store) is the database that stores xAPI records.

**Before collecting student-level learning data, understand the regulations:**

- **FERPA** — U.S. federal law protecting student education records. Data that
  can identify individual students falls under FERPA.
- **COPPA** — U.S. federal law covering children under 13.
- **State student-privacy laws** — many U.S. states add their own requirements.
- **GDPR** — EU law applying to any student located in the EU.

**Recommendation:** the Google Analytics setup above is anonymous and aggregate
by default, which is the safest starting point. If you want individual student
tracking through an LRS, involve your institution's data privacy officer before
you start, not after.

---

## Quick Reference for Instructors

| I want to... | Go to |
|--------------|-------|
| Browse every simulation | [MicroSims gallery](../sims/index.md) |
| Find a MicroSim's lesson plan | That MicroSim's own page, **Lesson Plan** section |
| Get iframe code for my LMS | That MicroSim's own page, **Embed This MicroSim** section |
| See which concepts a chapter covers | The chapter's **Concepts Covered** list |
| Check prerequisites before resequencing | [Learning Graph Viewer](../sims/graph-viewer/index.md) |
| Find a definition | [Glossary](../glossary.md) (515 terms) |
| Find student questions to open class with | [FAQ](../faq.md) (201 questions) |
| Get a self-check for a chapter | That chapter's **Quiz** page (10 questions) |
| Find further reading | That chapter's **Annotated References** page |
| See unbuilt MicroSim specs for student projects | `docs/sims/TODO/` in the repository |
| Report a problem | [GitHub Issues](https://github.com/dmccreary/modeling-healthcare-data/issues) |
| Reach the author | [Contact](../contact.md) |
