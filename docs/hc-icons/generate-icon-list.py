#!/usr/bin/env python3
"""
Generate a JSON file listing all SVG icons in the hc-icons directory.
Run this script whenever you add/remove icons to update the icon list.
"""
import json
import os
from pathlib import Path

def generate_icon_list():
    # Get the directory where this script is located
    script_dir = Path(__file__).parent

    # Find all SVG files in the directory
    svg_files = sorted([f.name for f in script_dir.glob("*.svg")])

    # Write to JSON file
    output_file = script_dir / "icons.json"
    with open(output_file, "w") as f:
        json.dump(svg_files, f, indent=2)

    print(f"Generated {output_file} with {len(svg_files)} icons")

if __name__ == "__main__":
    generate_icon_list()
