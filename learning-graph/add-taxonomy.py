#!/usr/bin/env python3
"""
Add Taxonomy IDs to Learning Graph CSV

This script reads the learning-graph.csv file and adds a TaxonomyID column
based on concept ranges.
"""

import csv


def get_taxonomy_id(concept_id):
    """Determine taxonomy ID based on concept ID."""
    if 1 <= concept_id <= 15:
        return "FOUND"
    elif 16 <= concept_id <= 35:
        return "HCARE"
    elif 36 <= concept_id <= 45:
        return "GTECH"
    elif 46 <= concept_id <= 70:
        return "PAT"
    elif 71 <= concept_id <= 95:
        return "PROV"
    elif 96 <= concept_id <= 115:
        return "PAYER"
    elif 116 <= concept_id <= 130:
        return "FIN"
    elif 131 <= concept_id <= 145:
        return "FRAUD"
    elif 146 <= concept_id <= 160:
        return "ANAL"
    elif 161 <= concept_id <= 175:
        return "AI"
    elif 176 <= concept_id <= 185:
        return "SEC"
    elif 186 <= concept_id <= 195:
        return "GOV"
    elif 196 <= concept_id <= 200:
        return "CAP"
    else:
        return "MISC"


def add_taxonomy_column(input_file, output_file):
    """Add TaxonomyID column to CSV."""
    rows = []

    # Read existing CSV
    with open(input_file, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            concept_id = int(row['ConceptID'])
            row['TaxonomyID'] = get_taxonomy_id(concept_id)
            rows.append(row)

    # Write updated CSV
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        fieldnames = ['ConceptID', 'ConceptLabel', 'Dependencies', 'TaxonomyID']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    print(f"Updated CSV written to {output_file}")
    print(f"Added TaxonomyID to {len(rows)} concepts")


if __name__ == "__main__":
    input_file = "learning-graph.csv"
    output_file = "learning-graph.csv"  # Overwrite the original

    add_taxonomy_column(input_file, output_file)
