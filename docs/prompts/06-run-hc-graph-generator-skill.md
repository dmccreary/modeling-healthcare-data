# Run of the hc-graph-generator Skill

!!! prompt
    use the hc-graph-generator skill to create a new MicroSim using the following requirements


## Response

Purpose: Illustrate the fundamental components of a graph—nodes and edges—using a simple healthcare scenario

Components to show:
- 5 circular nodes representing healthcare entities
- Node 1 (blue): Patient "Sarah Chen"
- Node 2 (green): Provider "Dr. Martinez"
- Node 3 (orange): Diagnosis "Type 2 Diabetes"
- Node 4 (purple): Medication "Metformin"
- Node 5 (yellow): Facility "City Hospital"

Connections (directed arrows):
- Arrow from Patient to Provider, labeled "VISITED_PROVIDER"
- Arrow from Provider to Diagnosis, labeled "DIAGNOSED_WITH"
- Arrow from Patient to Diagnosis, labeled "HAS_CONDITION"
- Arrow from Provider to Medication, labeled "PRESCRIBED"
- Arrow from Patient to Facility, labeled "ADMITTED_TO"

Style: Network diagram with labeled nodes and directed edges

Labels:
- Each node shows its type (Patient, Provider, etc.) and name
- Edge labels clearly visible along the arrows
- Small legend in corner: "Circle = Node (Entity)", "Arrow = Edge (Relationship)"

Color scheme:
- Nodes: Color-coded by type as specified above
- Edges: Dark gray with arrowheads indicating direction
- Background: White 
⎿  ⧉ Selected 30 lines from docs/chapters/01-graph-theory-database-foundations/index.md in Visual Studio Code

⏺ I'll use the hc-graph-generator skill to create this healthcare graph visualization MicroSim for you.

> The "hc-graph-generator" skill is running 

> The "hc-graph-generator" skill is running 

⏺ I'll generate the healthcare graph visualization MicroSim following the skill's workflow. Let me start by gathering the requirements and checking for
  available icons.

⏺ Search(pattern: "hc-icons/*.svg")
  ⎿  Found 0 files 

⏺ Now I'll create the MicroSim with the specified requirements. Let me start by creating the directory structure and generating all necessary files.

⏺ Bash(mkdir -p /Users/dan/Documents/ws/modeling-healthcare-data/docs/sims/healthcare-graph-fundamentals)
  ⎿  (No content)

⏺ Read(.claude/skills/hc-graph-generator/assets/template-main.html)
  ⎿  Read 83 lines

⏺ Read(.claude/skills/hc-graph-generator/assets/template-script.js)
  ⎿  Read 293 lines

⏺ Read(.claude/skills/hc-graph-generator/assets/template-style.css)
  ⎿  Read 369 lines

⏺ Read(.claude/skills/hc-graph-generator/assets/template-index.md)
  ⎿  Read 71 lines

⏺ Now I'll generate all the files for the healthcare graph fundamentals MicroSim. Let me start with the data file:

⏺ Write(docs/sims/healthcare-graph-fundamentals/healthcare-graph-fundamentals-data.json)
  ⎿  Wrote 122 lines to docs/sims/healthcare-graph-fundamentals/healthcare-graph-fundamentals-data.json
     {
       "nodes": [
         {
           "id": 1,
           "label": "Sarah Chen",
           "type": "Patient",
           "properties": {
             "name": "Sarah Chen",
             "age": 58,
             "mrn": "MRN-2024-789012",
     … +112 lines (ctrl+o to expand)

⏺ Now I'll create the main.html file:

⏺ Write(docs/sims/healthcare-graph-fundamentals/main.html)
  ⎿  Wrote 88 lines to docs/sims/healthcare-graph-fundamentals/main.html                                               
     <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Healthcare Graph Fundamentals</title>
         <link rel="stylesheet" href="style.css">
         <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
     </head>
     <body>
     … +78 lines (ctrl+o to expand)

⏺ Now I'll create the script.js file:

⏺ Write(docs/sims/healthcare-graph-fundamentals/script.js)
  ⎿  Wrote 293 lines to docs/sims/healthcare-graph-fundamentals/script.js
     // Global variables
     let nodes, edges, network;
     let allNodes = [];
     let allEdges = [];
     let nodeTypes = new Set();
     // Initialize on page load
     window.addEventListener('load', init);
     async function init() {
     … +283 lines (ctrl+o to expand)

⏺ Now I'll copy the style.css file and create the documentation:

⏺ Bash(cp /Users/dan/Documents/ws/modeling-healthcare-data/.claude/skills/hc-graph-generator/assets/template-style.css
      /Users/dan/Documents/ws/modeling-healthcare-data…)
  ⎿  (No content)

⏺ Now I'll create the index.md documentation:

⏺ Write(docs/sims/healthcare-graph-fundamentals/index.md)
  ⎿  Wrote 94 lines to docs/sims/healthcare-graph-fundamentals/index.md                                                                                    
     # Healthcare Graph Fundamentals
     [View Healthcare Graph Fundamentals Fullscreen](main.html){ .md-button .md-button--primary }
     This visualization demonstrates the fundamental components of a graph—nodes and edges—using a simple healthcare scenario. It features a patient (Sarah
     Chen) interacting with various healthcare entities including a provider (Dr. Martinez), a diagnosis (Type 2 Diabetes), medication (Metformin), and a
     facility (City Hospital).
     ## Overview
     This interactive visualization illustrates what nodes (entities) and edges (relationships) are in graph theory by modeling a basic healthcare scenario.
      Each node represents a distinct entity in the healthcare system with its own unique properties, while edges show the relationships between these
     entities. This foundational example demonstrates how graph databases naturally model real-world healthcare interactions.
     … +84 lines (ctrl+o to expand)

⏺ Now I need to add this MicroSim to the site navigation. Let me check the mkdocs.yml file:

⏺ Read(mkdocs.yml)
  ⎿  Read 98 lines

⏺ Now I'll add the MicroSim to the navigation in mkdocs.yml:

⏺ Update(mkdocs.yml)
  ⎿  Updated mkdocs.yml with 1 addition                                                      
       39        - View Healcare Icons: sims/view-hc-icons/index.md
       40        - Graph Viewer: sims/graph-viewer/index.md
       41        - Codes: sims/codes/index.md
       42 +      - Healthcare Graph Fundamentals: sims/healthcare-graph-fundamentals/index.md
       43      - Prompts:
       44        - Introduction: prompts/index.md
       45        - Icon: prompts/icon.md

⏺ Perfect! Let me verify the files were created successfully:

⏺ Bash(ls -la /Users/dan/Documents/ws/modeling-healthcare-data/docs/sims/healthcare-graph-fundamentals/)
  ⎿  total 80                                      
     drwxr-xr-x  7 dan  staff   224 Nov  6 15:14 .
     drwxr-xr-x@ 7 dan  staff   224 Nov  6 15:12 ..
     … +5 lines (ctrl+o to expand)

⏺ Excellent! I've successfully generated the Healthcare Graph Fundamentals MicroSim. Here's a comprehensive summary:

  Successfully Generated HC Graph MicroSim: Healthcare Graph Fundamentals

  Files Created:

  /docs/sims/healthcare-graph-fundamentals/index.md
  /docs/sims/healthcare-graph-fundamentals/main.html
  /docs/sims/healthcare-graph-fundamentals/script.js
  /docs/sims/healthcare-graph-fundamentals/style.css
  /docs/sims/healthcare-graph-fundamentals/healthcare-graph-fundamentals-data.json

  Data Summary:

  - 5 nodes across 5 node types
    - Patient (blue): Sarah Chen
    - Provider (green): Dr. Martinez
    - Diagnosis (orange): Type 2 Diabetes
    - Medication (purple): Metformin
    - Facility (yellow): City Hospital
  - 5 directed edges (relationships)
    - VISITED_PROVIDER: Patient → Provider
    - DIAGNOSED_WITH: Provider → Diagnosis
    - HAS_CONDITION: Patient → Diagnosis
    - PRESCRIBED: Provider → Medication
    - ADMITTED_TO: Patient → Facility

  Educational Focus:

  This visualization illustrates the fundamental components of a graph—nodes and edges—using a simple healthcare scenario. It demonstrates how nodes
  represent entities and edges represent relationships, forming the foundational building blocks of graph databases.

  Key Features:

  - All nodes are circles as requested, color-coded by type
  - Dark gray arrows with labels showing directed relationships
  - Interactive legend showing node types
  - Hover tooltips and click-to-view details
  - Search and filter capabilities
  - Educational callouts and insights
  - Heterogeneous properties (each node type has unique property sets)

  Next Steps:

  1. View the visualization: docs/sims/healthcare-graph-fundamentals/main.html
  2. Read documentation: docs/sims/healthcare-graph-fundamentals/index.md
  3. Test locally: Run mkdocs serve and navigate to the MicroSims section
  4. Embed in chapter: Use this iframe code in your chapter content:

  <iframe src="../../sims/healthcare-graph-fundamentals/main.html" width="100%" height="700px"
          style="border: 2px solid #e2e8f0; border-radius: 8px;">
  </iframe>

  [View Fullscreen](../../sims/healthcare-graph-fundamentals/main.html){ .md-button }

  The MicroSim has been added to your mkdocs.yml navigation under "MicroSims > Healthcare Graph Fundamentals" and is ready to use!

