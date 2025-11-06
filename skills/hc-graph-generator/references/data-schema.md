# Data Schema Reference

This document defines the JSON data schema for IT graph microsim visualizations.

## Root Schema

```json
{
  "nodes": [<Node>],
  "edges": [<Edge>]
}
```

- **nodes**: Required array of node objects
- **edges**: Optional array of edge objects (omit for node-only visualizations)

## Node Schema

### Required Fields

```json
{
  "id": <number>,
  "label": "<string>",
  "type": "<string>"
}
```

- **id**: Unique integer identifier (must be unique across all nodes)
- **label**: Display text shown on the node
- **type**: Node type/category (e.g., "BusinessService", "Database", "Server")

### Optional Fields

```json
{
  "properties": {
    "<key>": "<value>",
    ...
  },
  "shape": "<string>",
  "color": "<hex-color>",
  "size": <number>,
  "icon": "<svg-path>"
}
```

- **properties**: Object containing key-value pairs of node metadata
- **shape**: Vis-network shape (circle, box, database, triangle, hexagon, dot, diamond, star)
- **color**: Hex color code (e.g., "#ec4899")
- **size**: Node size in pixels (recommended: 25-40)
- **icon**: Optional path to SVG icon (e.g., "../../it-icons/server.svg")

### Complete Node Example

```json
{
  "id": 1,
  "label": "Customer Portal",
  "type": "BusinessService",
  "properties": {
    "name": "Customer Portal",
    "SLA_tier": "Gold",
    "owner": "Product Team",
    "uptime_target": "99.9%",
    "users": "15000"
  },
  "shape": "circle",
  "color": "#ec4899",
  "size": 40,
  "icon": "../../it-icons/service.svg"
}
```

## Edge Schema

### Required Fields

```json
{
  "from": <node-id>,
  "to": <node-id>
}
```

- **from**: ID of the source node
- **to**: ID of the target node

### Optional Fields

```json
{
  "label": "<string>",
  "arrows": "<string>",
  "color": "<hex-color>",
  "dashes": <boolean>,
  "width": <number>
}
```

- **label**: Relationship type label displayed on the edge
- **arrows**: Arrow direction ("to", "from", "to,from", or omit for no arrows)
- **color**: Hex color code for the edge
- **dashes**: Boolean to show dashed line
- **width**: Edge width in pixels (default: 2)

### Complete Edge Example

```json
{
  "from": 1,
  "to": 2,
  "label": "DEPENDS_ON",
  "arrows": "to",
  "color": "#64748b",
  "width": 2
}
```

## Data Validation Rules

### Node Validation

1. **Unique IDs**: All node IDs must be unique integers
2. **Required Fields**: Every node must have id, label, and type
3. **Color Format**: Colors must be valid hex codes (#RRGGBB)
4. **Shape Values**: Shapes must be supported vis-network shapes
5. **Icon Paths**: Icon paths should be relative and point to existing SVG files

### Edge Validation

1. **Valid References**: from and to must reference existing node IDs
2. **No Self-Loops**: from and to should not be the same (unless intentional)
3. **Arrow Values**: arrows must be "to", "from", "to,from", or omitted

### Property Best Practices

1. **Heterogeneous Properties**: Different node types should have different properties
2. **Meaningful Keys**: Use snake_case or camelCase for property keys
3. **Readable Values**: Keep values concise and human-readable
4. **Consistent Naming**: Use consistent naming conventions across nodes

## Example Data Files

### Example 1: Node-Only Visualization

```json
{
  "nodes": [
    {
      "id": 1,
      "label": "Web Server",
      "type": "Server",
      "properties": {
        "hostname": "web-prod-01",
        "IP": "10.0.1.50",
        "OS": "Ubuntu 22.04",
        "memory": "32GB"
      },
      "shape": "box",
      "color": "#94a3b8",
      "size": 30
    },
    {
      "id": 2,
      "label": "PostgreSQL",
      "type": "Database",
      "properties": {
        "name": "users_db",
        "version": "14.5",
        "size": "250GB",
        "replication": "enabled"
      },
      "shape": "database",
      "color": "#fb923c",
      "size": 30
    },
    {
      "id": 3,
      "label": "Alice Johnson",
      "type": "User",
      "properties": {
        "email": "alice@example.com",
        "role": "DBA",
        "department": "IT Operations"
      },
      "shape": "dot",
      "color": "#f59e0b",
      "size": 25
    }
  ]
}
```

### Example 2: Nodes with Edges

```json
{
  "nodes": [
    {
      "id": 1,
      "label": "Customer Portal",
      "type": "BusinessService",
      "properties": {
        "SLA_tier": "Gold",
        "uptime": "99.95%"
      },
      "shape": "circle",
      "color": "#ec4899",
      "size": 40
    },
    {
      "id": 2,
      "label": "Frontend App",
      "type": "Application",
      "properties": {
        "technology": "React",
        "version": "18.2"
      },
      "shape": "box",
      "color": "#7dd3fc",
      "size": 30
    },
    {
      "id": 3,
      "label": "API Gateway",
      "type": "Application",
      "properties": {
        "technology": "Kong",
        "requests_per_sec": "5000"
      },
      "shape": "box",
      "color": "#7dd3fc",
      "size": 30
    }
  ],
  "edges": [
    {
      "from": 1,
      "to": 2,
      "label": "PROVIDES",
      "arrows": "to"
    },
    {
      "from": 2,
      "to": 3,
      "label": "CALLS",
      "arrows": "to"
    }
  ]
}
```

## Property Design Patterns

### Business Services

```json
"properties": {
  "name": "<service-name>",
  "SLA_tier": "Gold|Silver|Bronze",
  "owner": "<team-name>",
  "uptime_target": "<percentage>",
  "users": "<number>",
  "revenue_impact": "$<amount>"
}
```

### Applications

```json
"properties": {
  "name": "<app-name>",
  "technology": "<tech-stack>",
  "version": "<version-number>",
  "environment": "production|staging|development",
  "deployed_date": "<date>",
  "team": "<team-name>"
}
```

### Databases

```json
"properties": {
  "name": "<db-name>",
  "type": "PostgreSQL|MySQL|MongoDB|etc",
  "version": "<version-number>",
  "size": "<size-with-unit>",
  "backup_schedule": "<schedule>",
  "replication": "enabled|disabled"
}
```

### Servers

```json
"properties": {
  "hostname": "<hostname>",
  "IP": "<ip-address>",
  "OS": "<operating-system>",
  "CPU": "<cpu-spec>",
  "memory": "<ram-size>",
  "location": "<datacenter>"
}
```

### Users

```json
"properties": {
  "name": "<full-name>",
  "email": "<email-address>",
  "role": "<job-role>",
  "department": "<department-name>",
  "access_level": "admin|user|viewer"
}
```

### Teams

```json
"properties": {
  "name": "<team-name>",
  "size": "<number-of-members>",
  "manager": "<manager-name>",
  "focus_area": "<area>",
  "oncall_rotation": "<schedule>"
}
```

### Locations

```json
"properties": {
  "name": "<location-name>",
  "type": "datacenter|office|cloud_region",
  "address": "<address>",
  "capacity": "<number>",
  "provider": "<provider-name>"
}
```

## Common Mistakes to Avoid

1. **Duplicate IDs**: Ensure every node has a unique ID
2. **Missing References**: All edge from/to IDs must exist in nodes
3. **Invalid Colors**: Use proper hex format (#RRGGBB, not rgb() or color names)
4. **Inconsistent Types**: Same node type should have consistent properties across nodes
5. **Empty Properties**: If a node has no properties, omit the properties field entirely
6. **Circular References**: Be mindful of edge cycles (though sometimes intentional)
7. **Overly Complex Properties**: Keep property values simple and readable
8. **Missing Labels**: Every node must have a label for display

## Data Generation Tips

1. **Start with 8-12 nodes**: Optimal for educational visualizations
2. **Mix node types**: Include 3-5 different node types for diversity
3. **Realistic properties**: Use realistic values that students can relate to
4. **Meaningful relationships**: Edges should represent real IT relationships
5. **Educational focus**: Design data to illustrate specific concepts clearly
