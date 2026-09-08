# Cover Image Prompt

Please generate a professional-quality cover image for this textbook.
This image will be used in social media previews and must follow the
formatting guidelines for an Open Graph image preview.

**Required specifications:**
- Format: PNG
- Wide-landscape format
- Size: 1200x630 pixels (1.91:1 aspect ratio)
- This is the Open Graph standard for social media previews

The image has four layers, back to front: background montage, color
treatment, mascot, and title text.

## Subject & Tone

Modeling Healthcare Data with Graphs is a college-level textbook that teaches
students to model complex patient, provider, and payer healthcare data using
graph databases instead of traditional relational tables — covering graph
data modeling, Cypher/GQL queries, clinical decision support with the HL7
FHIR standard and Clinical Quality Language, fraud/waste/abuse detection in
claims networks, and how graphs pair with AI and LLMs to lower the high cost
of U.S. healthcare through value-based care. A central theme of the book is
the industry-wide transition from Fee-for-Service (FFS) — paying for the
volume of services delivered — to Value-Based Care (VBC) — paying for patient
outcomes and quality — and how graph analytics makes that transition
possible by connecting cost, quality, and outcome data that relational
systems keep siloed. This FFS → VBC transformation should read as the cover's
main visual narrative, not just one background element among many. The
intended audience is college undergraduates who already know relational
databases and are learning graph thinking for the first time. The visual
tone should be modern and technical but approachable — a clean, confident
data-diagram aesthetic (not a sterile clinical/hospital look), echoing the
labeled node-and-edge style already used throughout the book's own diagrams.

## Title

Place "Modeling Healthcare Data with Graphs" in the center of the image, in
a clean, highly legible sans-serif font. Use a light/white font color with a
subtle drop shadow or dark scrim behind it so it stays readable against the
busy montage background. Keep the title short enough to render at a large
size — do not shrink it to fit if the title is long; instead simplify the
background directly behind the text.

## Central Theme: Fee-for-Service → Value-Based Care

Before placing the supporting montage, establish one clear visual through-line
that spans the composition: a transformation arc from **Fee-for-Service
(FFS)** to **Value-Based Care (VBC)**.

- On one side (e.g. left, behind or beside the mascot's side of the image),
  depict FFS as a loose scatter of disconnected, transactional icons —
  individual line-item receipts, isolated billing codes, a flat stack of
  paper claims — colored in a duller, cooler gray-blue to suggest
  fragmentation and volume-based billing.
- On the other side (right), depict VBC as those same elements resolved into
  a connected, glowing graph — nodes and edges in the book's bright palette,
  with a small rising "quality" curve and a small falling "cost" curve
  woven into the same shape.
- Connect the two sides with a single confident sweeping arrow or gradient
  arc running behind/around the title, labeled simply "FFS → VBC" in a
  small, clean sans-serif label (a short label, not a paragraph) — the
  visual spine that ties the whole cover together.
- The other 8 montage concepts below should feel like they orbit or grow out
  of this central FFS → VBC arc, not compete with it — this is the image's
  primary story; everything else is supporting detail.

## Background Montage

Arrange a montage of the following 8 concepts around the title and the
central FFS → VBC arc, each rendered in a consistent illustration style (see
Style below) so the composition reads as one image rather than a collage of
unrelated styles:

1. **Patient-centric graph model** — a small cluster of colored circular
   nodes (blue "Patient", green "Provider", orange "Diagnosis", purple
   "Medication", gold "Facility") connected by thin arrows labeled with
   relationship names like PRESCRIBED, TREATED_BY, HAS_DIAGNOSIS — the
   canonical "a graph = nodes + edges" idea at the heart of the book.
2. **Care-pathway route** — a directed sequence of nodes representing a
   patient's journey through clinical stages (triage → diagnosis →
   treatment → follow-up), with one path highlighted brighter than the
   rest to suggest a shortest-path or optimal-route calculation.
3. **Claims lifecycle pipeline** — a left-to-right flow of stages (claim
   submitted → adjudicated → paid) feeding into a small graph-database
   cylinder icon, representing payer-side claims processing.
4. **Fraud detection network** — a small suspicious node network with a
   closed loop of connections in warning red/orange, hinting at
   fraud-ring detection in provider referral or claims data.
5. **Clinical decision support exchange** — two boxes (an EHR system and a
   clinical rules service) exchanging a labeled request/response arrow,
   representing FHIR-based clinical decision support (CDS Hooks).
6. **CQL-to-ELM compilation** — a small pipeline showing human-readable
   clinical logic text compiling into a compact machine-executable code
   block, representing Clinical Quality Language compiling to the
   Expression Logical Model.
7. **Vector store / AI retrieval** — a small cluster of embedding points
   in a compact 2D field beside a graph fragment, with a subtle connecting
   line to suggest an LLM or AI system querying/reasoning over the graph.
8. **Referral network centrality** — a provider referral graph with one
   node visibly larger/brighter than the rest at the center of a cluster,
   representing centrality and community-detection analysis of provider
   networks.

## Mascot

Place the book's mascot, Sage the Octopus, in the lower-left corner, sized
so it does not overlap the title text. Sage is a deep blue octopus with warm
orange accents on the suction cups, wearing small round glasses, drawn in a
modern flat cartoon vector illustration style, in a friendly waving welcome
pose. Use the attached reference image at `docs/img/mascot/welcome.png` for
Sage's exact appearance — match it closely rather than reinventing the
character.

## Style & Composition

- Illustration style: flat vector / clean technical-diagram illustration —
  apply this consistently to every montage element (including the graph
  nodes and edges) so the composition reads as one unified image rather
  than a collage of unrelated styles.
- Color palette: deep blue and teal as the dominant colors, with warm
  amber/orange accents — this echoes both the graph-node colors used
  throughout the book's own diagrams and Sage's own coloring, tying the
  mascot visually to the montage.
- Lighting/mood: bright, clean, and optimistic — this is a book about
  making healthcare simpler and more transparent, not about illness.
- Composition: the FFS → VBC transformation arc is the primary compositional
  spine, sweeping across the image behind/around the centered title; the 8
  montage elements are arranged in a loose ring or grid orbiting that arc,
  with generous negative space directly behind the title text; Sage is
  positioned in the lower-left corner, clear of the title, the arc, and the
  montage elements.

## Avoid

- Do not render dense paragraphs of illegible text anywhere in the image
  — short labels (e.g. node names, edge labels) are fine, paragraphs are not.
- Avoid generic stock-photo cliches (handshakes, isolated lightbulbs,
  people pointing at whiteboards, stethoscopes draped dramatically) unless
  explicitly one of the 8 chosen concepts above.
- Avoid photorealistic human faces or clinical/hospital-room photography —
  this is a data-modeling book, not a medical-photography book.
- Avoid depicting real patient data, real people, or anything that reads
  as an actual medical record — all node labels should look like generic
  placeholder examples (as in the "Sarah Chen" example above), not real PHI.
- Do not let montage elements visually compete with or overlap the title
  or with Sage in the lower-left corner.
