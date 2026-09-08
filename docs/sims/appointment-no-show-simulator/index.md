---
title: "Appointment Scheduling and No-Show Simulator MicroSim"
description: "Interactive p5.js MicroSim for appointment scheduling and no-show simulator microsim."
image: /sims/appointment-no-show-simulator/appointment-no-show-simulator.png
og:image: /sims/appointment-no-show-simulator/appointment-no-show-simulator.png
twitter:image: /sims/appointment-no-show-simulator/appointment-no-show-simulator.png
social:
   cards: false
quality_score: 70
---

# Appointment Scheduling and No-Show Simulator MicroSim

<iframe src="main.html" height="618" width="100%" scrolling="no"></iframe>

[Run the Appointment Scheduling and No-Show Simulator MicroSim MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }
## About This MicroSim

This simulator models a single clinic day to expose the core scheduling tradeoff: no-shows waste provider capacity, and overbooking fills the gaps but risks collisions, long waits, and overtime when patients actually show up. Each appointment is drawn on the day's timeline — kept (green), waited 10+ minutes (orange), or no-show (gray) — and the day's utilization, mean patient wait, overtime, and patients seen are computed from a lightweight discrete-event simulation.

## How to Use

Set the no-show rate, overbooking factor, visit-length variability, and appointment template, then click Run day to simulate (each run uses fresh random draws). Raise the no-show rate to see utilization fall as gray gaps appear; raise overbooking to refill those gaps, but watch mean wait and overtime climb as collisions occur. Search for the overbooking factor that maximizes patients seen without pushing the mean wait too high. Reset returns to the booked-schedule view.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/modeling-healthcare-data/sims/appointment-no-show-simulator/main.html"
        height="618px"
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
