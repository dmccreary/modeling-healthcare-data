# Clinical Care Pathway DAG

[View Clinical Care Pathway DAG Fullscreen](main.html){ .md-button .md-button--primary }

A Directed Acyclic Graph (DAG) visualization demonstrating how a patient's clinical care journey progresses through distinct stages without cycles. This pathway shows the temporal progression from admission through discharge, emphasizing the acyclic nature of a single care encounter where patients move forward through stages without returning to the beginning.

## Overview

This interactive visualization teaches what a Directed Acyclic Graph (DAG) is and why it's important in healthcare workflows. A DAG is a graph with directed edges (arrows) that has no cycles—meaning you cannot start at one node and follow the arrows to return to that same node. In clinical care pathways, this property ensures that each stage progresses forward in time without reverting to previous states during a single encounter.

The visualization demonstrates a typical patient care journey from admission through discharge, showing how healthcare workflows naturally form DAG structures where temporal progression is unidirectional.

## Features

### Node Types

- **CareStage** (Light Blue, Box): Represents a distinct stage in the patient's care pathway
  - Properties: stage, stage_number, duration_estimate, responsible_role, description

### Care Stages in Order

1. **Patient Admission** - Initial registration and check-in (30 minutes)
2. **Initial Assessment** - Vital signs, medical history, chief complaint (45 minutes)
3. **Diagnostic Testing** - Laboratory tests, imaging, procedures (1-3 hours)
4. **Test Results Review** - Analyze results and determine diagnosis (30 minutes)
5. **Treatment Planning** - Develop treatment plan based on diagnosis (30 minutes)
6. **Treatment Administration** - Medications, procedures, interventions (Variable)
7. **Monitoring & Evaluation** - Monitor patient response and adjust care (Variable)
8. **Discharge Planning** - Prepare patient for discharge with instructions (45 minutes)

### Interactive Features

- **Hover Tooltips**: Hover over any node to see its type and properties in a tooltip
- **Click for Details**: Click on a node to display full details in the right sidebar
- **Search**: Use the search box to find nodes by name or property values
- **Filter by Type**: Toggle checkboxes to show or hide specific node types
- **Select All/Unselect All**: Bulk controls to quickly filter all node types
- **Hierarchical Layout**: Automatic left-to-right layout showing temporal progression

### DAG Visualization

- **Solid Arrows**: Main pathway edges showing the primary care flow
- **Dotted Arrow**: Optional retest path (Test Results Review → Diagnostic Testing) representing conditional workflow without creating a cycle back to admission
- **Direction**: Left-to-right flow emphasizing temporal progression
- **No Cycles**: Notice that you cannot follow the arrows to return to "Patient Admission" during the same encounter

## Educational Insights

- **DAG Definition**: A Directed Acyclic Graph is a graph with directed edges (arrows) that contains no cycles. In this visualization, you can start at any node and follow the arrows, but you will never return to your starting point. This property is crucial for modeling workflows that progress through time.

- **Healthcare Context**: Clinical care pathways during a single encounter naturally form DAGs because patients progress forward through stages (admission → assessment → testing → treatment → discharge) without cycling back to the beginning. While a patient might need additional tests (dotted line), they don't return to admission during the same episode of care.

- **Temporal Semantics**: The DAG structure encodes temporal progression—each stage occurs at a point in time, and the directed edges show the chronological order of events. This makes DAGs ideal for representing processes that unfold over time with clear dependencies between stages.

## Data Structure

The visualization uses a JSON data structure with nodes and edges:

```json
{
  "nodes": [
    {
      "id": 1,
      "label": "Patient Admission",
      "type": "CareStage",
      "properties": {
        "stage": "Patient Admission",
        "stage_number": 1,
        "duration_estimate": "30 minutes",
        "responsible_role": "Admissions Staff",
        "description": "Patient registration and initial check-in"
      },
      "shape": "box",
      "color": "#7dd3fc",
      "size": 40
    }
  ],
  "edges": [
    {
      "from": 1,
      "to": 2,
      "label": "CHECK_IN",
      "arrows": "to",
      "color": "#1e40af",
      "width": 2
    },
    {
      "from": 4,
      "to": 3,
      "label": "RETEST_IF_NEEDED",
      "arrows": "to",
      "color": "#64748b",
      "width": 2,
      "dashes": true
    }
  ]
}
```

## Implementation Notes

- **Library**: vis-network JavaScript library
- **Layout**: Hierarchical left-to-right layout to emphasize temporal flow
- **Icons**: None (using colored rectangular boxes)
- **Data File**: `clinical-care-pathway-dag-data.json`
- **Edge Styles**: Solid edges for main pathway, dashed edge for optional retest path

## DAG Properties Demonstrated

### No Cycles
The defining property of a DAG is the absence of cycles. In this visualization:
- You can start at "Patient Admission" and follow edges forward
- You will never return to "Patient Admission" during the same encounter
- The optional retest edge (dotted) goes from "Test Results Review" back to "Diagnostic Testing" but does NOT create a cycle to admission

### Topological Ordering
DAGs have at least one topological ordering—a linear arrangement of nodes where all edges point forward. In this pathway:
1. Patient Admission (no incoming edges)
2. Initial Assessment
3. Diagnostic Testing
4. Test Results Review
5. Treatment Planning
6. Treatment Administration
7. Monitoring & Evaluation
8. Discharge Planning (no outgoing edges except back to testing)

### Temporal Semantics
The DAG structure naturally represents temporal progression:
- Nodes represent states at points in time
- Edges represent transitions between states
- The acyclic property ensures time moves forward

## Next Steps

After understanding DAG structures in clinical care pathways:

1. **Compare to Cyclic Graphs**: Consider chronic care management where patients DO cycle through repeated assessments and treatments over multiple encounters
2. **Explore Conditional Paths**: Notice the dotted "RETEST_IF_NEEDED" edge—think about other conditional branches in clinical workflows
3. **Identify Dependencies**: Click on each stage to see duration estimates and responsible roles—consider how these stages depend on previous stages
4. **Real-World Applications**: Think about other healthcare workflows that form DAGs: medication ordering, surgical procedures, care transitions
5. **Graph Algorithms**: DAGs enable powerful algorithms like topological sort (scheduling), longest path (critical path analysis), and efficient traversal
