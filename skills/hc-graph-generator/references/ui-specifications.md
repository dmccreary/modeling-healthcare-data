# UI Specifications Reference

This document defines the standard UI components, colors, shapes, and sizes for IT graph microsims.

## Color Palette

### Standard Node Colors

```javascript
const nodeColors = {
  BusinessService: "#ec4899",  // Pink
  Application: "#7dd3fc",       // Light blue
  Database: "#fb923c",          // Orange
  Server: "#94a3b8",            // Gray
  Location: "#4ade80",          // Green
  Team: "#a78bfa",              // Purple
  User: "#f59e0b",              // Amber
  Network: "#06b6d4",           // Cyan
  Storage: "#f97316",           // Orange
  Security: "#ef4444"           // Red
};
```

### UI Colors

```css
/* Background Colors */
--canvas-background: #f8fafc;
--sidebar-background: #ffffff;
--filter-background: #f8fafc;
--notes-background: #f0fdf4;

/* Border Colors */
--border-light: #e2e8f0;
--border-medium: #cbd5e1;
--border-dark: #94a3b8;

/* Text Colors */
--text-primary: #0f172a;
--text-secondary: #1e293b;
--text-muted: #64748b;

/* Interactive Colors */
--blue-primary: #3b82f6;
--blue-hover: #2563eb;
--green-accent: #22c55e;
```

## Node Shapes

### Shape Mappings

```javascript
const nodeShapes = {
  BusinessService: "circle",
  Application: "box",
  Database: "database",
  Server: "box",
  Location: "triangle",
  Team: "hexagon",
  User: "dot",
  Network: "diamond",
  Storage: "box",
  Security: "star"
};
```

### Vis-Network Supported Shapes

- `circle` - Round shape, good for high-level concepts
- `box` - Rectangular, good for systems/applications
- `database` - Cylinder shape, perfect for databases
- `triangle` - Triangle, good for locations/endpoints
- `hexagon` - Six-sided, good for groups/teams
- `dot` - Small circle, good for users/individuals
- `diamond` - Diamond shape, good for network devices
- `star` - Star shape, good for special/critical items

## Node Sizes

### Size Guidelines

```javascript
const nodeSizes = {
  large: 40,   // High-level business entities
  medium: 30,  // Applications, databases, servers
  small: 25    // Supporting entities (teams, users, locations)
};
```

**Usage Rules:**

- **Large (40px)**: Business services, critical infrastructure, top-level concepts
- **Medium (30px)**: Applications, databases, servers, major components
- **Small (25px)**: Users, teams, locations, supporting resources

## Layout Dimensions

### Canvas Container

```css
#network {
  width: 100%;           /* Flexible width */
  height: 600px;         /* Fixed height */
  background-color: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
}
```

### Sidebar

```css
.sidebar {
  width: 280px;          /* Fixed width */
  height: 600px;         /* Matches canvas height */
  padding: 20px;
}
```

### Legend

```css
.legend {
  position: absolute;
  top: 20px;
  left: 20px;
  max-width: 200px;
  background-color: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Callouts

```css
.callouts {
  position: absolute;
  bottom: 20px;
  left: 20px;
  max-width: 350px;
  background-color: #3b82f6;
  color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

## Typography

### Font Families

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             'Helvetica Neue', Arial, sans-serif;
```

### Font Sizes

```css
--heading-large: 2rem;      /* Main title */
--heading-medium: 1.5rem;   /* Section headings */
--heading-small: 1.125rem;  /* Subsection headings */
--body-large: 1rem;         /* Regular text */
--body-medium: 0.875rem;    /* Secondary text */
--body-small: 0.8125rem;    /* Labels, captions */
```

## Icons

### IT Icons Directory

Icons are located at `/docs/it-icons/` and are MIT-licensed Bootstrap icons in SVG format.

**Common Icon Names:**

- `service.svg` - Business services
- `database.svg` - Databases
- `server.svg` - Servers
- `laptop.svg` - Applications
- `people.svg` - Teams
- `person.svg` - Users
- `geo-alt.svg` - Locations
- `router.svg` - Network devices
- `shield-lock.svg` - Security components
- `hdd.svg` - Storage systems

### Icon Usage in Nodes

```javascript
{
  id: 1,
  label: "Example",
  type: "Server",
  icon: {
    face: 'image',
    code: '\uf233',
    size: 50,
    color: '#94a3b8'
  },
  // OR use SVG path
  image: '../../it-icons/server.svg',
  shape: 'image'
}
```

## Educational Components

### Callout Messages (Standard)

```javascript
const defaultCallouts = [
  "Each node represents a unique entity in your IT infrastructure",
  "Nodes can have different properties—no rigid schema required!",
  "Labels help categorize and filter nodes efficiently",
  "In the next section, we'll connect these nodes with relationships"
];
```

### Educational Notes (Standard)

```javascript
const defaultNotes = [
  "📌 Notice how different node types have completely different properties",
  "💡 This flexibility would require multiple tables or sparse schemas in relational databases",
  "🎯 Graph databases embrace heterogeneous data naturally"
];
```

## Responsive Breakpoints

```css
/* Desktop: Default styles (1400px+) */

/* Tablet: Stack sidebar below canvas */
@media (max-width: 1400px) {
  .main-content {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    height: auto;
  }
}

/* Mobile: Stack all components */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
  }
  .legend, .callouts {
    position: static;
    max-width: 100%;
  }
}
```

## Best Practices

1. **Color Consistency**: Always use the same color for the same node type across all microsims
2. **Shape Semantics**: Choose shapes that visually represent the node type (e.g., database cylinder for databases)
3. **Size Hierarchy**: Larger nodes should represent more important or higher-level concepts
4. **Icon Priority**: Always check `/docs/it-icons/` first before using generic shapes
5. **Contrast**: Ensure text is readable on all background colors (minimum 4.5:1 ratio)
6. **Spacing**: Maintain consistent padding and margins across all UI components
