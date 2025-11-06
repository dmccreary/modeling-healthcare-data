# {{TITLE}}

[View {{TITLE}} Fullscreen](main.html){ .md-button .md-button--primary }

{{DESCRIPTION}}

## Overview

{{OVERVIEW}}

## Features

### Node Types

{{NODE_TYPES_LIST}}

### Interactive Features

- **Hover Tooltips**: Hover over any node to see its type and properties in a tooltip
- **Click for Details**: Click on a node to display full details in the right sidebar
- **Search**: Use the search box to find nodes by name or property values
- **Filter by Type**: Toggle checkboxes to show or hide specific node types
- **Select All/Unselect All**: Bulk controls to quickly filter all node types
- **Force-Directed Layout**: Automatic node positioning using physics simulation

## Educational Insights

{{EDUCATIONAL_INSIGHTS}}

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
- **Icons**: IT infrastructure icons from `/docs/it-icons/` (MIT License)
- **Data File**: `{{DATA_FILE}}`

## Next Steps

{{NEXT_STEPS}}
