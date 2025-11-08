#!/usr/bin/env python3
"""
get-ibook-metrics.py
Calculate comprehensive metrics for the IT Management Graph intelligent textbook.
"""
import os
import re
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Tuple


def count_chapters(docs_dir: Path) -> int:
    """Count the number of chapters in the docs/chapters directory."""
    chapters_dir = docs_dir / 'chapters'
    if not chapters_dir.exists():
        return 0
    # Count directories that contain index.md, excluding the chapters index itself
    chapters = [d for d in chapters_dir.iterdir()
                if d.is_dir() and (d / 'index.md').exists()]
    return len(chapters)


def analyze_chapters(docs_dir: Path) -> Dict[str, any]:
    """Analyze chapter structure and content."""
    chapters_dir = docs_dir / 'chapters'
    if not chapters_dir.exists():
        return {'count': 0, 'sections': [], 'details': []}

    chapters = sorted([d for d in chapters_dir.iterdir()
                      if d.is_dir() and (d / 'index.md').exists()])

    total_sections = 0
    total_details = 0
    chapter_data = []

    for chapter_dir in chapters:
        index_file = chapter_dir / 'index.md'
        with open(index_file, 'r', encoding='utf-8') as f:
            content = f.read()

            # Count level 2 headers (## ) as sections
            sections = len(re.findall(r'^##\s+[^#]', content, re.MULTILINE))

            # Count <details> tags
            details = len(re.findall(r'<details>', content, re.IGNORECASE))

            # Get chapter title (first # header)
            title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
            title = title_match.group(1) if title_match else chapter_dir.name

            # Count concepts covered
            concepts_match = re.search(r'This chapter covers.*?(\d+)\s+concepts', content, re.IGNORECASE)
            concepts = int(concepts_match.group(1)) if concepts_match else 0

            total_sections += sections
            total_details += details

            chapter_data.append({
                'name': chapter_dir.name,
                'title': title,
                'sections': sections,
                'details': details,
                'concepts': concepts
            })

    return {
        'count': len(chapters),
        'chapters': chapter_data,
        'total_sections': total_sections,
        'total_details': total_details
    }


def count_learning_graph_concepts(docs_dir: Path) -> int:
    """Count concepts in the learning graph CSV file."""
    lg_file = docs_dir / 'learning-graph' / 'learning-graph.csv'
    if not lg_file.exists():
        return 0

    with open(lg_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        # Subtract 1 for header row
        return len(lines) - 1 if len(lines) > 1 else 0


def count_glossary_terms(docs_dir: Path) -> int:
    """Count number of level 4 headers (####) in the glossary.md file."""
    glossary_path = docs_dir / 'glossary.md'
    if not glossary_path.exists():
        return 0

    with open(glossary_path, 'r', encoding='utf-8') as f:
        content = f.read()
        # Count level 4 headers (####)
        terms = re.findall(r'^####\s+', content, re.MULTILINE)
        return len(terms)


def count_microsims(docs_dir: Path) -> int:
    """Count number of MicroSims in the /docs/sims directory."""
    sims_dir = docs_dir / 'sims'
    if not sims_dir.exists():
        return 0
    return len([d for d in sims_dir.iterdir() if d.is_dir()])


def count_markdown_files(docs_dir: Path) -> int:
    """Count total number of markdown files in the docs directory."""
    return len(list(docs_dir.glob('**/*.md')))


def count_images(docs_dir: Path) -> Tuple[int, Dict[str, int]]:
    """Count total number of image files in the docs directory."""
    png_count = len(list(docs_dir.glob('**/*.png')))
    jpg_count = len(list(docs_dir.glob('**/*.jpg')))
    jpeg_count = len(list(docs_dir.glob('**/*.jpeg')))
    svg_count = len(list(docs_dir.glob('**/*.svg')))
    gif_count = len(list(docs_dir.glob('**/*.gif')))

    breakdown = {
        'PNG': png_count,
        'JPG': jpg_count,
        'JPEG': jpeg_count,
        'SVG': svg_count,
        'GIF': gif_count
    }

    return sum(breakdown.values()), breakdown


def count_words_in_markdown(docs_dir: Path) -> int:
    """Count total number of words in all markdown files."""
    total_words = 0
    for md_file in docs_dir.glob('**/*.md'):
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
            # Remove code blocks
            content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
            # Remove inline code
            content = re.sub(r'`.*?`', '', content)
            # Remove URLs
            content = re.sub(r'http[s]?://\S+', '', content)
            # Remove HTML tags
            content = re.sub(r'<.*?>', '', content)
            # Split and count remaining words
            words = content.split()
            total_words += len(words)
    return total_words


def count_prompts(docs_dir: Path) -> int:
    """Count number of AI prompts in the prompts directory."""
    prompts_dir = docs_dir / 'prompts'
    if not prompts_dir.exists():
        return 0
    return len(list(prompts_dir.glob('*.md'))) - 1  # Exclude index.md


def generate_markdown_report(metrics: Dict, output_file: Path) -> None:
    """Generate a markdown report of the book metrics."""
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Book Metrics\n\n")
        f.write(f"*Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}*\n\n")

        f.write("## Overview\n\n")
        f.write("This page provides comprehensive metrics for the IT Management Graph intelligent textbook.\n\n")

        f.write("## Content Metrics\n\n")
        f.write("| Metric | Count |\n")
        f.write("|--------|-------|\n")
        f.write(f"| **Chapters** | {metrics['chapters']['count']} |\n")
        f.write(f"| **Total Sections** | {metrics['chapters']['total_sections']} |\n")
        f.write(f"| **Learning Graph Concepts** | {metrics['concepts']} |\n")
        f.write(f"| **Glossary Terms** | {metrics['glossary_terms']} |\n")
        f.write(f"| **MicroSims** | {metrics['microsims']} |\n")
        f.write(f"| **AI Prompts** | {metrics['prompts']} |\n")
        f.write(f"| **Total Words** | {metrics['total_words']:,} |\n")
        f.write(f"| **Markdown Files** | {metrics['markdown_files']} |\n")
        f.write(f"| **Total Images** | {metrics['total_images']} |\n\n")

        f.write("### Image Breakdown\n\n")
        f.write("| Format | Count |\n")
        f.write("|--------|-------|\n")
        for fmt, count in metrics['image_breakdown'].items():
            f.write(f"| {fmt} | {count} |\n")
        f.write("\n")

        f.write("## Chapter Details\n\n")
        f.write("| Chapter | Sections | Details Tags | Concepts |\n")
        f.write("|---------|----------|--------------|----------|\n")
        for chapter in metrics['chapters']['chapters']:
            f.write(f"| {chapter['title']} | {chapter['sections']} | {chapter['details']} | {chapter['concepts']} |\n")
        f.write("\n")

        f.write(f"**Total `<details>` tags across all chapters:** {metrics['chapters']['total_details']}\n\n")

        f.write("## Educational Elements\n\n")
        f.write(f"- **Interactive Visualizations (MicroSims):** {metrics['microsims']}\n")
        f.write(f"- **Collapsible Content Sections:** {metrics['chapters']['total_details']}\n")
        f.write(f"- **AI Generation Prompts:** {metrics['prompts']}\n")
        f.write(f"- **Structured Glossary:** {metrics['glossary_terms']} terms\n")
        f.write(f"- **Concept Dependencies:** {metrics['concepts']} nodes in learning graph\n\n")

        f.write("## Estimated Reading Time\n\n")
        # Average reading speed: 200-250 words per minute
        # Use 225 as middle ground
        reading_minutes = metrics['total_words'] / 225
        reading_hours = reading_minutes / 60
        f.write(f"Based on an average reading speed of 225 words per minute:\n\n")
        f.write(f"- **{reading_minutes:.0f} minutes** ({reading_hours:.1f} hours)\n\n")

        f.write("## Estimated Print Length\n\n")
        # Standard trade paperback: ~250-300 words per page
        # Use 275 as average for technical books with code examples
        # Adjust for 20% image content (images take more space than text)
        text_words = metrics['total_words'] * 0.8  # 80% text, 20% images
        image_words = metrics['total_words'] * 0.2  # 20% allocated to images

        # Text pages: 275 words per page
        text_pages = text_words / 275
        # Image pages: assuming images take 2x the space of equivalent text
        # (images with captions, diagrams, etc.)
        image_pages = (image_words / 275) * 2

        total_pages = text_pages + image_pages

        f.write(f"Estimated printed page count for a standard trade paperback (6\" × 9\"):\n\n")
        f.write(f"- **Text content (80%):** ~{text_pages:.0f} pages\n")
        f.write(f"- **Images & diagrams (20%):** ~{image_pages:.0f} pages\n")
        f.write(f"- **Total estimated pages:** ~{total_pages:.0f} pages\n\n")
        f.write(f"*Based on ~275 words per page for technical content with code examples and diagrams.*\n\n")

        f.write("## Repository Structure\n\n")
        f.write("```\n")
        f.write("docs/\n")
        f.write(f"├── chapters/           ({metrics['chapters']['count']} chapters)\n")
        f.write(f"├── sims/               ({metrics['microsims']} MicroSims)\n")
        f.write(f"├── prompts/            ({metrics['prompts']} AI prompts)\n")
        f.write(f"├── learning-graph/     ({metrics['concepts']} concepts)\n")
        f.write(f"└── glossary.md         ({metrics['glossary_terms']} terms)\n")
        f.write("```\n")


def main():
    """Main function to calculate and report metrics."""
    # Use repository root as base
    repo_root = Path(__file__).parent.parent.parent
    docs_dir = repo_root / 'docs'

    if not docs_dir.exists():
        print(f"Error: docs directory not found at {docs_dir}")
        return 1

    print("Calculating book metrics...")

    # Calculate all metrics
    chapters_data = analyze_chapters(docs_dir)
    total_images, image_breakdown = count_images(docs_dir)

    metrics = {
        'chapters': chapters_data,
        'concepts': count_learning_graph_concepts(docs_dir),
        'glossary_terms': count_glossary_terms(docs_dir),
        'microsims': count_microsims(docs_dir),
        'prompts': count_prompts(docs_dir),
        'total_words': count_words_in_markdown(docs_dir),
        'markdown_files': count_markdown_files(docs_dir),
        'total_images': total_images,
        'image_breakdown': image_breakdown
    }

    # Generate markdown report
    output_file = docs_dir / 'book-metrics.md'
    generate_markdown_report(metrics, output_file)

    print(f"\n✓ Book metrics report generated: {output_file}")
    print("\nSummary:")
    print(f"  Chapters: {metrics['chapters']['count']}")
    print(f"  Sections: {metrics['chapters']['total_sections']}")
    print(f"  Concepts: {metrics['concepts']}")
    print(f"  Glossary Terms: {metrics['glossary_terms']}")
    print(f"  MicroSims: {metrics['microsims']}")
    print(f"  Total Words: {metrics['total_words']:,}")

    return 0


if __name__ == "__main__":
    exit(main())
