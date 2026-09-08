---
title: RAG Architecture for Clinical Decision Support
description: Interactive p5.js MicroSim for rag architecture for clinical decision support.
image: /sims/rag-architecture-clinical-decision-support/rag-architecture-clinical-decision-support.png
og:image: /sims/rag-architecture-clinical-decision-support/rag-architecture-clinical-decision-support.png
twitter:image: /sims/rag-architecture-clinical-decision-support/rag-architecture-clinical-decision-support.png
social:
   cards: false
quality_score: 70
---

# RAG Architecture for Clinical Decision Support

<iframe src="main.html" height="546" width="100%" scrolling="no"></iframe>

[Run the RAG Architecture for Clinical Decision Support MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This diagram traces the retrieval-augmented generation (RAG) pipeline that grounds an LLM in trustworthy sources for clinical decision support. A clinician's question is embedded into a vector, used to search a vector store of guidelines, research, patient history, and protocols, and the most relevant snippets are assembled into context. Only then does the LLM generate a response — now with numbered source citations — and clinician feedback flows back to improve future retrievals. The retrieval phase (steps 2-5) and generation phase (steps 6-7) are shaded separately.

## How to Use

Follow the numbered arrows from the clinician query (1) through the blue retrieval phase and into the green generation phase to the cited response (7), then to the feedback step (8). Trace the dashed purple feedback loop back to the vector store to see how clinician corrections improve future answers. The key idea is that grounding generation in retrieved sources produces evidence-cited recommendations instead of unsourced text.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/rag-architecture-clinical-decision-support/main.html"
        height="450px"
        width="100%"
        scrolling="no"></iframe>
```

## Lesson Plan

### Grade Level
9-12 (High School Geometry)

### Duration
10-15 minutes

### Prerequisites
TODO: List prerequisites.

### Activities

1. **Exploration** (5 min): TODO
2. **Guided Practice** (5 min): TODO
3. **Assessment** (5 min): TODO

### Assessment
TODO: List assessment criteria.

## References

1. TODO: Add references.
