#!/usr/bin/env python3
"""
Convert Learning Graph CSV to JSON

This script converts a learning graph CSV file (with taxonomy) to the
complete JSON format required by vis-network.js visualizations.
"""

import csv
import json
import sys


# Taxonomy color mapping
TAXONOMY_COLORS = {
    "FOUND": {"color": "red", "font_color": "white", "name": "Foundation Concepts"},
    "GTECH": {"color": "orange", "font_color": "black", "name": "Graph Technologies"},
    "HCARE": {"color": "gold", "font_color": "black", "name": "Healthcare Domain"},
    "PAT": {"color": "lightgreen", "font_color": "black", "name": "Patient Data"},
    "PROV": {"color": "green", "font_color": "white", "name": "Provider Operations"},
    "PAYER": {"color": "cyan", "font_color": "black", "name": "Payer & Insurance"},
    "FIN": {"color": "blue", "font_color": "white", "name": "Financial & Business"},
    "FRAUD": {"color": "purple", "font_color": "white", "name": "Fraud & Compliance"},
    "ANAL": {"color": "deeppink", "font_color": "white", "name": "Graph Analytics"},
    "AI": {"color": "indigo", "font_color": "white", "name": "AI & Machine Learning"},
    "SEC": {"color": "darkred", "font_color": "white", "name": "Security & Privacy"},
    "GOV": {"color": "navy", "font_color": "white", "name": "Data Governance"},
    "CAP": {"color": "gray", "font_color": "white", "name": "Capstone & Career"},
    "MISC": {"color": "lightgray", "font_color": "black", "name": "Miscellaneous"}
}


def read_csv(filename):
    """Read the CSV file and return concept data."""
    concepts = []
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            concepts.append(row)
    return concepts


def read_metadata(filename):
    """Read metadata JSON file."""
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)


def create_groups(concepts):
    """Create groups section based on unique taxonomies."""
    groups = {}
    taxonomies = set(c['TaxonomyID'] for c in concepts)

    for tax_id in taxonomies:
        if tax_id in TAXONOMY_COLORS:
            color_info = TAXONOMY_COLORS[tax_id]
            groups[tax_id] = {
                "classifierName": color_info["name"],
                "color": color_info["color"],
                "font": {
                    "color": color_info["font_color"]
                }
            }
        else:
            # Default for unknown taxonomies
            groups[tax_id] = {
                "classifierName": tax_id,
                "color": "lightgray",
                "font": {
                    "color": "black"
                }
            }

    return groups


def create_nodes(concepts):
    """Create nodes section."""
    nodes = []
    for concept in concepts:
        node = {
            "id": int(concept['ConceptID']),
            "label": concept['ConceptLabel'],
            "group": concept['TaxonomyID']
        }
        nodes.append(node)
    return nodes


def create_edges(concepts):
    """Create edges section based on dependencies."""
    edges = []
    edge_id = 1

    for concept in concepts:
        if concept['Dependencies'] and concept['Dependencies'].strip():
            target_id = int(concept['ConceptID'])
            dep_list = [int(d.strip()) for d in concept['Dependencies'].split('|')]

            for source_id in dep_list:
                edge = {
                    "id": edge_id,
                    "from": source_id,
                    "to": target_id,
                    "arrows": "to"
                }
                edges.append(edge)
                edge_id += 1

    return edges


def create_learning_graph_json(csv_file, metadata_file, output_file):
    """Create the complete learning graph JSON."""
    # Read input files
    concepts = read_csv(csv_file)
    metadata = read_metadata(metadata_file)

    # Create sections
    groups = create_groups(concepts)
    nodes = create_nodes(concepts)
    edges = create_edges(concepts)

    # Assemble the complete structure
    learning_graph = {
        "metadata": metadata,
        "groups": groups,
        "nodes": nodes,
        "edges": edges
    }

    # Write to output file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(learning_graph, f, indent=2, ensure_ascii=False)

    print(f"Learning graph JSON created successfully!")
    print(f"  Output file: {output_file}")
    print(f"  Total concepts: {len(nodes)}")
    print(f"  Total dependencies: {len(edges)}")
    print(f"  Taxonomy groups: {len(groups)}")


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python csv-to-json.py <input-csv> <output-json> <metadata-json>")
        sys.exit(1)

    csv_file = sys.argv[1]
    output_file = sys.argv[2]
    metadata_file = sys.argv[3]

    create_learning_graph_json(csv_file, metadata_file, output_file)
