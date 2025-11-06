---
name: hc-graph-generator
description: This skill generates interactive graph-model visualizations using vis-network library for healthcare educational content. Use this skill when users request creating interactive HC graph visualizations, network diagrams, dependency graphs, or node-based MicroSim for educational textbooks. The skill creates complete MicroSim packages with HTML, JavaScript, CSS, and documentation that can be embedded in MkDocs chapters via iframes.
---

# Healthcare Graph Generator

## Overview

This skill generates complete, interactive healthcare graph visualizations (MicroSims) for educational content. Each MicroSIm uses the vis-network JavaScript library to create force-directed network visualizations with features like search, filtering, hover tooltips, and interactive node details. The skill is optimized for healthcare education, particularly for undergraduate-level courses on graph databases and healthcare infrastructure modeling.

## When to Use This Skill

Invoke this skill when:

- User requests creating an interactive healthcare (HC) graph visualization or network diagram
- User asks to generate a MicroSim showing nodes, relationships, or dependencies
- User wants to visualize healthcare workflows, clinical relationships, or care delivery systems
- User mentions creating educational visualizations with vis-network
- User references the examples in `/docs/prompts/create-hc-graph-generator-skill.md`
- User needs to demonstrate graph concepts like heterogeneous properties, node types, or dependencies

## Workflow Overview

The MicroSim generation process follows these steps:

1. **Gather Requirements** - Collect all necessary information from the user
2. **Design Data Structure** - Plan nodes, edges, types, and properties
3. **Create Directory Structure** - Set up MicroSim directory in `/docs/sims/`
4. **Generate Data File** - Create JSON with nodes and edges
5. **Generate HTML/JS/CSS** - Create visualization files from templates
6. **Use Healthcare Icons** - Search for healthcare icons in /docs/hc-icons
7. **Generate Documentation** - Create index.md with educational content
8. **Validate Output** - Check data integrity and file structure
9. **Report Results** - Provide summary with file paths and next steps

## Step 1: Gather Requirements

Before generating the MicroSim, collect the following information from the user. If any required information is missing, use the AskUserQuestion tool to gather it.

### Required Information

1. **microsim_name** (kebab-case) - Directory name (e.g., "patient-care-network", "clinical-workflow-graph")
2. **title** - Human-readable title (e.g., "Clinical Care Network Graph")
3. **description** - One-paragraph description of the visualization's purpose
4. **educational_purpose** - What concept this MicroSim teaches
5. **node_types** - Array of node type objects with specifications
6. **sample_nodes** - Array of 8-12 sample nodes with realistic data
7. **educational_insights** - Array of 3 key learning points

### Optional Information

8. **include_edges** (boolean) - Whether to include relationships between nodes (default: false)
9. **edges** - Array of edge data if include_edges is true
10. **custom_callouts** - Override default callout messages (4 messages)
11. **custom_notes** - Override default educational notes (3 notes)
12. **subtitle** - Optional subtitle for the visualization

### Node Type Specification Format

Each node type should include:

```javascript
{
  type: "Patient",                    // Type name (PascalCase)
  shape: "circle",                    // Vis-network shape
  color: "#ec4899",                   // Hex color code
  size: 40,                           // Size in pixels (25-40)
  icon: "../../hc-icons/patient.svg", // Optional icon path
  properties: ["name", "age", "mrn", "diagnosis", "admission_date"]  // Example properties
}
```

### Node Data Format

Each sample node should include:

```javascript
{
  id: 1,                              // Unique integer
  label: "Susan Johnson",             // Display name
  type: "Patient",                    // Matches node type
  properties: {                       // Heterogeneous properties
    name: "Susan Johnson",
    age: 45,
    mrn: "MRN-2024-001234",
    diagnosis: "Type 2 Diabetes",
    admission_date: "2024-03-15"
  },
  shape: "circle",                    // From node type spec
  color: "#ec4899",                   // From node type spec
  size: 40                            // From node type spec
}
```

## Step 2: Design and Validation

Before generating files, validate and enhance the collected requirements:

### Validate Data Integrity

- Ensure all node IDs are unique integers
- Verify all node types are consistently defined
- Check that edge from/to references point to existing node IDs
- Validate all colors are proper hex codes (#RRGGBB)
- Confirm shapes are supported vis-network shapes

### Enhance Data Quality

- Add heterogeneous properties (different properties per node type)
- Ensure properties are realistic and educational
- Use consistent naming conventions (snake_case or camelCase)
- Balance node type distribution (3-5 different types)
- Keep total node count between 8-12 for optimal visualization

### Check Icon Availability

Before assigning icons, check if they exist in `/docs/hc-icons/`:

- Use Glob tool to list available icons: `pattern: "hc-icons/*.svg"`
- Assign appropriate icons to node types based on clinical semantics
- Fall back to shapes if icons are not available

## Step 3: Generate Microsim Files

Create the microsim directory and generate all required files:

### Directory Structure

```
/docs/sims/<microsim-name>/
├── index.md              # Documentation
├── main.html             # Visualization page
├── script.js             # JavaScript logic
├── style.css             # Styling
└── <microsim-name>-data.json  # Graph data
```

### File Generation Process

#### 1. Create Directory

```bash
mkdir -p /docs/sims/<microsim-name>
```

#### 2. Generate Data File

Create `<microsim-name>-data.json` with the structure:

```json
{
  "nodes": [<sample_nodes>],
  "edges": [<edges>]  // Optional
}
```

Omit the "edges" array entirely if include_edges is false (not just an empty array).

#### 3. Generate main.html

Use the template at `assets/template-main.html` and replace placeholders:

- `{{THCLE}}` - Title from requirements
- `{{SUBTHCLE}}` - Subtitle or default "Interactive HC Graph Visualization"
- `{{CALLOUTS}}` - HTML for callout messages (4 messages in divs with class "callout-message")
- `{{EDUCATIONAL_NOTES}}` - HTML for educational notes (3 notes in divs with class "note-item")

Example callouts HTML:
```html
<div class="callout-message">Each node represents a unique entity in your HC infrastructure</div>
<div class="callout-message">Nodes can have different properties—no rigid schema required!</div>
```

#### 4. Generate script.js

Use the template at `assets/template-script.js` and replace placeholders:

- `{{DATA_FILE}}` - The data file name (e.g., "it-asset-nodes-data.json")

The template includes all required functions and event handlers. No modifications needed beyond placeholder replacement.

#### 5. Copy style.css

Copy `assets/template-style.css` directly to the microsim directory. No modifications needed.

#### 6. Generate index.md

Use the template at `assets/template-index.md` and replace placeholders:

- `{{THCLE}}` - Title
- `{{DESCRIPTION}}` - Description paragraph
- `{{OVERVIEW}}` - Educational purpose expanded into 2-3 sentences
- `{{NODE_TYPES_LIST}}` - Markdown list of node types with their properties
- `{{EDUCATIONAL_INSIGHTS}}` - Markdown list of 3 key learning points
- `{{DATA_FILE}}` - Data file name
- `{{NEXT_STEPS}}` - Suggestions for extending or using the microsim

Example node types list:
```markdown
- **Patient** (Pink, Circle): Represents individual patients in the healthcare system
  - Properties: name, age, mrn, diagnosis, admission_date
- **Physician** (Light Blue, Box): Healthcare providers
  - Properties: name, specialty, npi, department, years_experience
```

### UI Design Goals

The microsim templates follow these UI design principles:

#### Single-Row Filter Layout

**Goal**: Keep the "Filter by Node Type" controls on a single horizontal row to minimize vertical space usage and improve usability.

**Implementation**:
- The filter box uses flexbox with `display: flex`, `align-items: center`, and `gap: 20px`
- Layout order: Label ("Filter by Node Type:") → Checkboxes → Buttons (Select All/Unselect All)
- Flex wrapping is enabled (`flex-wrap: wrap`) for responsive behavior on narrow screens
- All elements align vertically centered for a clean, compact appearance

**Benefits**:
- Reduces vertical screen real estate consumption
- Improves visual hierarchy by grouping related controls
- Creates a more intuitive left-to-right flow
- Maintains readability while maximizing space for the visualization canvas

**Template Structure**:
```html
<div class="filter-box">
    <div class="filter-header">
        <span>Filter by Node Type:</span>
    </div>
    <div id="filterCheckboxes" class="filter-checkboxes">
        <!-- Checkboxes appear here -->
    </div>
    <div class="filter-buttons">
        <button>Select All</button>
        <button>Unselect All</button>
    </div>
</div>
```

## Step 4: Quality Assurance

After generating all files, verify the following quality criteria:

### Data Quality Checks

- [ ] All node IDs are unique integers
- [ ] All node types have consistent color/shape mappings
- [ ] Properties are heterogeneous (different per node type)
- [ ] Edge references (if present) point to existing nodes
- [ ] Colors are valid hex codes

### File Structure Checks

- [ ] All 5 files exist in the microsim directory
- [ ] Data file is valid JSON
- [ ] main.html references correct data file
- [ ] script.js references correct data file
- [ ] index.md has fullscreen link to main.html

### UI Component Checks

- [ ] Legend displays all node types correctly
- [ ] Filter checkboxes exist for all node types
- [ ] Filter controls appear on a single row (label, checkboxes, buttons)
- [ ] Callouts have 4 educational messages
- [ ] Educational notes have 3 insights
- [ ] Sidebar template is ready for node details

### Educational Content Checks

- [ ] Educational insights are contextually relevant
- [ ] Callouts explain graph concepts clearly
- [ ] Node properties demonstrate heterogeneity
- [ ] Documentation explains the learning objectives

## Step 5: Report Results

After successful generation, provide a comprehensive report to the user:

### Summary Format

```
✅ Successfully generated HC graph microsim: <title>

📁 Files Created:
   /docs/sims/<microsim-name>/index.md
   /docs/sims/<microsim-name>/main.html
   /docs/sims/<microsim-name>/script.js
   /docs/sims/<microsim-name>/style.css
   /docs/sims/<microsim-name>/<microsim-name>-data.json

📊 Data Summary:
   - <N> nodes across <M> node types
   - <E> edges (if applicable)
   - Node types: <list types>

🎓 Educational Focus:
   <Educational purpose statement>
```

## Step 6: Add the Microsim to the Site Navigation

Add a line to the mkdocs.yml nav section at the end of the sims area.

```yml
  - {{THCLE}}: /sims/<microsim-name>/index.md
```

🔗 Next Steps:
   1. View the visualization: /docs/sims/<microsim-name>/main.html
   2. Read documentation: /docs/sims/<microsim-name>/index.md
   3. Test locally: mkdocs serve
   4. Embed in chapter content using iframe
```

### Integration Instructions

Provide the user with embed code for chapter content:

```markdown
<iframe src="../../sims/<microsim-name>/main.html" width="100%" height="700px"
        style="border: 2px solid #e2e8f0; border-radius: 8px;">
</iframe>

[View Fullscreen](../../sims/<microsim-name>/main.html){ .md-button }
```

## Default Values and Standards

Use these defaults when information is not provided:

### Default Callout Messages

1. "Each node represents a unique entity in the healthcare system (patient, provider, facility, etc.)"
2. "Nodes can have different properties—no rigid schema required!"
3. "Labels help categorize and filter clinical entities efficiently"
4. "In the next section, we'll connect these nodes with care relationships"

### Default Educational Notes

1. "📌 Notice how different node types have completely different properties"
2. "💡 This flexibility would require multiple tables or sparse schemas in relational databases"
3. "🎯 Graph databases embrace heterogeneous data naturally"

### Default Subtitle

"Interactive HC Graph Visualization"

### Standard Node Colors

Refer to `references/ui-specifications.md` for the complete color palette. Common healthcare types:

- Patient: #ec4899 (Pink)
- Physician: #7dd3fc (Light Blue)
- Medication: #fb923c (Orange)
- Laboratory: #94a3b8 (Gray)
- Diagnosis: #f59e0b (Amber)
- Department: #a78bfa (Purple)
- Facility: #4ade80 (Green)

### Standard Node Shapes

Refer to `references/ui-specifications.md` for shape mappings. Common patterns:

- Patient: circle
- Physician: box
- Medication: database
- Laboratory: box
- Diagnosis: dot
- Department: hexagon
- Facility: triangle

## Resources

This skill includes comprehensive resources for generating HC graph microsims:

### assets/

Template files used to generate microsim components:

- **template-main.html** - Complete HTML structure with placeholders
- **template-script.js** - JavaScript implementation with vis-network integration
- **template-style.css** - Complete stylesheet (copy as-is)
- **template-index.md** - Documentation template with placeholders

### references/

Detailed reference documentation to consult during generation:

- **vis-network-config.md** - Vis-network configuration options, physics settings, event handlers
- **ui-specifications.md** - Color palette, shapes, sizes, typography, layout dimensions
- **data-schema.md** - JSON schema, validation rules, property patterns, examples

Consult these references when:
- User asks about specific vis-network features or configuration
- Clarification needed on color/shape standards
- Data validation or schema questions arise
- Property patterns needed for specific node types

## Advanced Features

### Icons vs Shapes

Always check `/docs/hc-icons/` directory first using the Glob tool:

```
pattern: "hc-icons/*.svg"
```

Use icons when available and semantically appropriate for clinical entities. Fall back to shapes when:
- No suitable icon exists
- User explicitly requests shapes
- Icon would reduce clarity

### Custom Vis-Network Configuration

For advanced users requesting custom physics or interaction settings, consult `references/vis-network-config.md` and modify the options object in script.js.

### Edges and Relationships

When including edges (include_edges: true):
- Ensure all from/to references are valid
- Use meaningful clinical relationship labels (e.g., "TREATS", "PRESCRIBED_TO", "ADMITTED_TO", "ORDERED_BY")
- Add arrow directions appropriately
- Consider using dashed lines for optional/weak relationships

### Multiple Data Files

For complex scenarios, multiple data files can be created (e.g., with/without edges). Update script.js to load the appropriate file based on user interaction.

## Troubleshooting

### Common Issues

**Issue**: Nodes overlap excessively
**Solution**: Adjust physics settings in script.js (increase springLength or gravitationalConstant)

**Issue**: Icons don't load
**Solution**: Verify icon paths are correct (../../hc-icons/<name>.svg) and icons exist

**Issue**: Edges hidden when filters applied
**Solution**: This is expected behavior - edges are hidden when either connected node is filtered out

**Issue**: Data file won't load
**Solution**: Validate JSON syntax and ensure file path in script.js is correct

## Best Practices

1. **Start Simple**: Begin with node-only visualizations before adding edges
2. **Educational Focus**: Design data to clearly demonstrate the target concept
3. **Realistic Data**: Use believable property values students can relate to
4. **Single-Row Filter Layout**: Keep filter controls on a single row (label, checkboxes, buttons) to minimize vertical space and improve usability
5. **Test Locally**: Always test with `mkdocs serve` before deploying
6. **Iterate**: Generate, test, refine based on educational effectiveness
7. **Document Well**: Ensure index.md clearly explains the learning objectives
8. **Consistent Styling**: Use standard colors/shapes for consistency across microsims
