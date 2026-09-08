---
quality_score: 30
title: View Healthcare Icons
description: A browsable library of 110+ high-quality, scalable SVG healthcare icons. SVG icons stay crisp at any size and can be recolored with JavaScript to encode node type, status, and theme in healthcare graph and network visualizations.
image: /sims/view-hc-icons/view-hc-icons.png
og:image: /sims/view-hc-icons/view-hc-icons.png
twitter:image: /sims/view-hc-icons/view-hc-icons.png
social:
   cards: false
---

# View Healthcare Icons

<iframe src="../../hc-icons/index.html" height="600" scrolling="yes" style="width:100%;border:1px solid #ddd;border-radius:6px;"></iframe>

[Open the icon browser fullscreen](../../hc-icons/index.html){ .md-button .md-button--primary }

This is a browsable library of 110+ healthcare icons — patients, providers, departments, equipment, conditions, and workflow steps — every one a high-quality, hand-tuned **SVG** built for use as a node in healthcare graph and network drawings. Use the search box to filter by name and the **Dark mode** toggle to preview the icons on a dark background.

## Why High-Quality SVG Icons Matter for Graph Drawings

When you draw a healthcare graph — patients linked to providers, encounters, diagnoses, medications, and facilities — the icons *are* the visual vocabulary of the diagram. A node labeled only with text is hard to scan; a node carrying a clear ambulance, cardiology, or laboratory icon is recognizable at a glance. For that to work across thumbnails, full-screen views, and print, the icons must be **high quality and consistent in weight, padding, and style**.

We deliberately use **SVG** rather than raster formats (PNG/JPG) for two reasons that matter specifically for graph visualizations:

### 1. SVG icons are scalable

SVG is a *vector* format: shapes are described mathematically rather than as a grid of pixels. That means a single icon file stays perfectly crisp whether it is rendered as a 24-pixel node in a dense network or zoomed to fill the screen — no blurring, no jagged edges, and no need to ship multiple resolutions. In an interactive graph where the user pans and zooms (for example, a `vis-network` drawing), the same icon redraws sharply at every zoom level.

### 2. SVG icons can be recolored with JavaScript and CSS

Because an SVG is just markup (`<path>`, `<circle>`, `fill`, `stroke`), its colors can be changed at runtime — you do **not** have to export a new image for every color. In a network drawing this lets a single icon do many jobs:

- **Encode node type** — tint provider icons blue, facility icons purple, diagnosis icons red, so node color reinforces category.
- **Encode status or state** — turn an icon red for an alert or anomaly, gray it out when inactive, or highlight it gold on hover/selection.
- **Theme the background** — set the icon's background swatch (or the canvas behind it) to match a light or dark theme, exactly as the **Dark mode** toggle above does to the whole gallery.

Common ways to recolor an SVG from JavaScript:

- Inline the SVG and set `path { fill: ... }` (or use `fill="currentColor"` and change the parent's `color`).
- Fetch the SVG text, swap the `fill`/`stroke` values, and inject it as a node image.
- For quick effects, apply a CSS `filter` (e.g., `invert()` for dark mode).

The result is one small, scalable asset per concept that can be styled per node, per state, and per theme — the right foundation for clear, reusable healthcare graph drawings.

## How to Use the Library

1. Browse or **search** the gallery above for the concept you need (e.g., `ambulance`, `cardiology`, `lab`).
2. Open the SVG from the `docs/hc-icons/` folder and copy its markup into your MicroSim, or load it as a node image in `vis-network` / p5.js / D3.
3. Recolor the icon and its background in code to match the node's type, status, and the diagram's theme.

## References

- [SVG on MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [Styling SVG with CSS `fill` and `currentColor`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill)
- [vis-network: using images and icons for nodes](https://visjs.github.io/vis-network/docs/network/nodes.html)
