# Healthcare Graph Fundamentals

[View Healthcare Graph Fundamentals Fullscreen](main.html){ .md-button .md-button--primary }

This visualization demonstrates the fundamental components of a graph—nodes and edges—using a simple healthcare scenario. It features a patient (Sarah Chen) interacting with various healthcare entities including a provider (Dr. Martinez), a diagnosis (Type 2 Diabetes), medication (Metformin), and a facility (City Hospital).

## Overview

This interactive visualization illustrates what nodes (entities) and edges (relationships) are in graph theory by modeling a basic healthcare scenario. Each node represents a distinct entity in the healthcare system with its own unique properties, while edges show the relationships between these entities. This foundational example demonstrates how graph databases naturally model real-world healthcare interactions.

## Features

### Node Types

- **Patient** (Blue, Circle): Represents individual patients in the healthcare system
  - Properties: name, age, mrn, admission_date

- **Provider** (Green, Circle): Healthcare providers such as physicians and specialists
  - Properties: name, specialty, npi, department

- **Diagnosis** (Orange, Circle): Medical diagnoses and conditions
  - Properties: name, icd10_code, category, severity

- **Medication** (Purple, Circle): Medications prescribed to patients
  - Properties: name, generic_name, dosage, frequency

- **Facility** (Yellow, Circle): Healthcare facilities and hospitals
  - Properties: name, type, address, bed_capacity

### Interactive Features

- **Hover Tooltips**: Hover over any node to see its type and properties in a tooltip
- **Click for Details**: Click on a node to display full details in the right sidebar
- **Search**: Use the search box to find nodes by name or property values
- **Filter by Type**: Toggle checkboxes to show or hide specific node types
- **Select All/Unselect All**: Bulk controls to quickly filter all node types
- **Force-Directed Layout**: Automatic node positioning using physics simulation

## Educational Insights

- **Graph Basics**: A graph consists of nodes (entities) and edges (relationships). Nodes represent things (patient, provider, diagnosis), while edges represent how these things are connected (visited, diagnosed with, prescribed).

- **Heterogeneous Properties**: Notice how each node type has completely different properties—patients have MRN and age, providers have NPI and specialty, diagnoses have ICD-10 codes. In a graph database, this flexibility is natural, while relational databases would require multiple tables or sparse schemas.

- **Directed Relationships**: The arrows on edges show direction. For example, "VISITED_PROVIDER" flows from Patient to Provider, indicating the patient visited the provider (not vice versa). This directionality captures the semantic meaning of relationships.

## Data Structure

The visualization uses a JSON data structure with nodes and optional edges:

```json
{
  "nodes": [
    {
      "id": 1,
      "label": "Example Node",
      "type": "NodeType",
      "properties": {
        "property1": "value1",
        "property2": "value2"
      },
      "shape": "circle",
      "color": "#ec4899",
      "size": 40
    }
  ],
  "edges": [
    {
      "from": 1,
      "to": 2,
      "label": "RELATIONSHIP_TYPE",
      "arrows": "to"
    }
  ]
}
```

## Implementation Notes

- **Library**: vis-network JavaScript library
- **Layout**: Force-directed using Barnes-Hut algorithm
- **Icons**: None (using colored shapes only)
- **Data File**: `healthcare-graph-fundamentals-data.json`

## Next Steps

After understanding this basic graph structure, you can:

1. **Add More Nodes**: Expand the graph with additional patients, providers, or medications to see how the network grows
2. **Add More Relationships**: Create new edge types like "WORKS_AT" (Provider to Facility) or "ALLERGIC_TO" (Patient to Medication)
3. **Explore Properties**: Click on each node to see how different entity types store different kinds of information
4. **Filter and Search**: Practice using the interactive controls to explore subsets of the graph
5. **Compare to Tables**: Consider how you would model this same information in a relational database—how many tables would you need?
