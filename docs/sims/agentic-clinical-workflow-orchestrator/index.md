---
title: "Agentic Clinical Workflow Orchestrator"
description: "Trace one care-coordination task through a six-lane multi-agent workflow, then collapse it into a single agent to see what the decomposition buys."
status: validated
validated_date: 2026-09-08
quality_score: 100
image: /sims/agentic-clinical-workflow-orchestrator/agentic-clinical-workflow-orchestrator.png
og:image: /sims/agentic-clinical-workflow-orchestrator/agentic-clinical-workflow-orchestrator.png
library: Mermaid
bloom_level: Analyze
---

# Agentic Clinical Workflow Orchestrator

<iframe src="main.html" width="100%" height="1498px"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Description

One coordinator asks a single plain-language question: which diabetic patients are overdue for an eye exam and also face a transportation barrier? Multi-Agent Mode traces that question through six swimlanes -- the coordinator, a conversational interface, a tool-using query agent that makes two separate `query_graph` calls, a guideline agent, a review agent, and the human who approves the outreach list. Selecting any step explains what that agent contributes and, more importantly, why it is not folded into its neighbor. Single-Agent Mode runs the identical task with everything collapsed into one agent, so the trade-off is visible side by side rather than asserted in prose. The dashed arrow is a follow-up question returning to the conversation with its context intact, not a retry.

## Lesson Plan

Audience: undergraduate students and healthcare data practitioners. Allow 10-15 minutes. Prerequisites: what a large language model tool call is, and the idea of a patient cohort query over a graph.

**Learning objective:** Given a multi-agent clinical workflow diagram, the learner can deconstruct the task into the individual tool calls and agent roles involved, and differentiate a single tool-using agent's behavior from a coordinated multi-agent system's behavior.

1. **Explore:** In Multi-Agent Mode, select each of the eight steps in order and note the one sentence in each that begins "It is a separate role because...". Write down which two separations you find most convincing.
2. **Explain:** Switch to Single-Agent Mode and select the Agent node. Explain to a partner what becomes untestable when the query, the guideline check, and the safety review share one prompt -- and why the last of those three is the riskiest to merge.
3. **Transfer:** Sketch a different healthcare task (for example, flagging patients due for a medication review) as swimlanes. Name which lane owns the versioned clinical policy and which lane a person must occupy, and state one modeling assumption you made.

Assessment: use the Explain prompt as an exit ticket. A complete response names at least two distinct agent roles, states what each contributes to the final list, and distinguishes a claim about testability from a claim about clinical accuracy.

## Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/agentic-clinical-workflow-orchestrator/main.html" width="100%" height="1498px"></iframe>
```

[JavaScript source](agentic-clinical-workflow-orchestrator.js)

## Quality Checks

**Validated September 8, 2026.** Completeness rubric: **100/100**, scored with the project's `calculate-quality-score.py` against the standardization checklist. Checked automatically in a browser at 400, 800, and 1200 px: the page loads with no JavaScript errors, no interactive control is clipped outside the viewport, and the document does not scroll horizontally. Controls, selections, and the reset path were exercised by hand during development at desktop width. The page reports its own height to the parent document, so the declared iframe height above serves only as a fallback.

## Specification

The full specification below is extracted from
[Chapter 21: Responsible AI and Agentic Systems](../../chapters/21-responsible-ai-and-agentic-systems/index.md).

```text
Type: workflow
**sim-id:** agentic-clinical-workflow-orchestrator<br/>
**Library:** Mermaid<br/>
**Status:** Specified

Bloom Taxonomy: Analyze<br/>
Bloom Taxonomy Verb: differentiate, deconstruct<br/>
Learning objective: Given a multi-agent clinical workflow diagram, the learner can deconstruct the task into the individual tool calls and agent roles involved, and differentiate a single tool-using agent's behavior from a coordinated multi-agent system's behavior.

Purpose: Visualize the care-coordinator worked example (diabetic patients overdue for an eye exam with a transportation barrier) as it flows through a chatbot interface, a tool-using query agent, a guideline-checking agent, and a human-in-the-loop reviewer.

Components to show (Mermaid flowchart with swimlanes):
- Swimlane "Care Coordinator": Start node "Asks question in chat" and end node "Receives final report"
- Swimlane "Chatbot Interface / Conversational AI": Node "Parses question, maintains context"
- Swimlane "Query Agent (Tool-Using)": Nodes "Call query_graph (overdue exams)", "Call query_graph (transportation barrier filter)"
- Swimlane "Guideline Agent": Node "Check eye-exam interval against clinical guideline"
- Swimlane "Review Agent": Node "Safety check combined list before release"
- Swimlane "Human-in-the-Loop": Node "Coordinator reviews and confirms outreach list"

Connections: Sequential flow across swimlanes in the order listed, with each agent handing its output to the next; a feedback arrow from the Human-in-the-Loop node back to the Chatbot Interface node labeled "asks follow-up question"

Color coding: Blue for interface/conversational steps, orange for tool-calling steps, green for the guideline-checking step, red for the safety review step, purple for the human review step

Interactive controls:
- Click directive on every node opening an infobox describing exactly what that agent does and why it is a separate role rather than folded into a single agent
- Toggle: "Single-Agent Mode" vs "Multi-Agent Mode" that collapses all agent swimlanes into one generic "Agent" lane, so the learner can compare the two architectures directly

Instructional Rationale: Swimlanes with a single-vs-multi-agent toggle match the Analyze-level objective by letting the learner directly compare the decomposed multi-agent version against a collapsed single-agent version of the identical task, making the specialization trade-off visible rather than asserted in prose.

Implementation: Mermaid flowchart with subgraphs as swimlanes and click handlers; responsive width.
```

## Related Resources

- [Chapter 21: Responsible AI and Agentic Systems](../../chapters/21-responsible-ai-and-agentic-systems/index.md)

## References

- [Source chapter](../../chapters/21-responsible-ai-and-agentic-systems/index.md) — supplied the learning objective and the worked example.
- [Mermaid flowchart documentation](https://mermaid.js.org/syntax/flowchart.html) — subgraph swimlanes, click directives, and class styling (accessed September 8, 2026).
- [Wikipedia: Multi-agent system](https://en.wikipedia.org/wiki/Multi-agent_system) — background on decomposing a task across specialized agents.
- [Wikipedia: Human-in-the-loop](https://en.wikipedia.org/wiki/Human-in-the-loop) — why a person remains in an automated decision path.
