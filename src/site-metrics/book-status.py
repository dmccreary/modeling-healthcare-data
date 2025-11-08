#!/usr/bin/env python3
"""
book-status.py
Display the status of the intelligent textbook building workflow.
Shows checkboxes for completed steps and percentages for partial completion.
"""
import os
import sys
from pathlib import Path
from typing import Tuple


def check_file_exists(file_path: Path) -> bool:
    """Check if a file exists and has content."""
    return file_path.exists() and file_path.stat().st_size > 0


def get_checkbox(is_complete: bool) -> str:
    """Return a checkbox character based on completion status."""
    return "✅" if is_complete else "❌"


def check_course_description(docs_dir: Path) -> Tuple[bool, str]:
    """Check if course description exists and is complete."""
    course_desc = docs_dir / 'course-description.md'
    if not check_file_exists(course_desc):
        return False, "Course description not found"

    with open(course_desc, 'r', encoding='utf-8') as f:
        content = f.read()
        # Check for key required elements
        has_title = 'title:' in content.lower() or '# ' in content
        has_audience = 'audience' in content.lower()
        has_topics = 'topic' in content.lower()

        if has_title and has_audience and has_topics:
            return True, "Course description complete"
        else:
            return False, "Course description incomplete"


def check_learning_graph(docs_dir: Path) -> Tuple[bool, str, int]:
    """Check learning graph status."""
    lg_csv = docs_dir / 'learning-graph' / 'learning-graph.csv'
    lg_json = docs_dir / 'learning-graph' / 'learning-graph.json'

    if not check_file_exists(lg_csv) and not check_file_exists(lg_json):
        return False, "Learning graph not found", 0

    # Count concepts from CSV
    if check_file_exists(lg_csv):
        with open(lg_csv, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            concept_count = len(lines) - 1 if len(lines) > 1 else 0

        if concept_count >= 200:
            return True, f"Learning graph complete ({concept_count} concepts)", concept_count
        else:
            return False, f"Learning graph incomplete ({concept_count}/200 concepts)", concept_count

    return False, "Learning graph exists but can't count concepts", 0


def check_glossary(docs_dir: Path) -> Tuple[bool, str, int]:
    """Check glossary status."""
    glossary = docs_dir / 'glossary.md'

    if not check_file_exists(glossary):
        return False, "Glossary not found", 0

    with open(glossary, 'r', encoding='utf-8') as f:
        content = f.read()
        # Count #### headers (term definitions)
        import re
        terms = len(re.findall(r'^####\s+', content, re.MULTILINE))

        if terms >= 150:
            return True, f"Glossary complete ({terms} terms)", terms
        else:
            return False, f"Glossary incomplete ({terms} terms)", terms


def check_chapters(docs_dir: Path) -> Tuple[bool, str, int, int]:
    """Check chapters status."""
    chapters_dir = docs_dir / 'chapters'

    if not chapters_dir.exists():
        return False, "Chapters directory not found", 0, 0

    chapters = sorted([d for d in chapters_dir.iterdir()
                      if d.is_dir() and (d / 'index.md').exists()])

    chapter_count = len(chapters)
    expected_min = 6
    expected_max = 20

    if chapter_count == 0:
        return False, "No chapters found", 0, 0
    elif chapter_count < expected_min:
        percent = int((chapter_count / expected_min) * 100)
        return False, f"{chapter_count} chapters ({percent}% of minimum {expected_min})", chapter_count, percent
    else:
        return True, f"{chapter_count} chapters complete", chapter_count, 100


def check_microsims(docs_dir: Path) -> Tuple[bool, str, int]:
    """Check MicroSims status."""
    sims_dir = docs_dir / 'sims'

    if not sims_dir.exists():
        return False, "MicroSims directory not found", 0

    sims = [d for d in sims_dir.iterdir() if d.is_dir()]
    sim_count = len(sims)

    if sim_count >= 5:
        return True, f"{sim_count} MicroSims", sim_count
    else:
        return False, f"{sim_count} MicroSims (recommend 5+)", sim_count


def check_references(docs_dir: Path) -> Tuple[bool, str]:
    """Check if references exist."""
    references = docs_dir / 'references.md'

    if not check_file_exists(references):
        return False, "References not found"

    with open(references, 'r', encoding='utf-8') as f:
        content = f.read()
        # Check for links or citations
        if 'http' in content or '[' in content:
            return True, "References complete"
        else:
            return False, "References file exists but empty"


def check_faq(docs_dir: Path) -> Tuple[bool, str]:
    """Check if FAQ exists."""
    faq = docs_dir / 'faq.md'

    if not check_file_exists(faq):
        return False, "FAQ not found"

    with open(faq, 'r', encoding='utf-8') as f:
        content = f.read()
        # Count questions (look for #### headers)
        import re
        questions = len(re.findall(r'^####\s+', content, re.MULTILINE))

        if questions >= 10:
            return True, f"FAQ complete ({questions} questions)"
        else:
            return False, f"FAQ incomplete ({questions} questions)"


def check_prompts(docs_dir: Path) -> Tuple[bool, str, int]:
    """Check prompts directory."""
    prompts_dir = docs_dir / 'prompts'

    if not prompts_dir.exists():
        return False, "Prompts directory not found", 0

    prompts = list(prompts_dir.glob('*.md'))
    prompt_count = len([p for p in prompts if p.name != 'index.md'])

    if prompt_count >= 10:
        return True, f"{prompt_count} AI prompts", prompt_count
    else:
        return False, f"{prompt_count} AI prompts", prompt_count


def check_quizzes(docs_dir: Path) -> Tuple[bool, str]:
    """Check if quizzes exist for chapters."""
    chapters_dir = docs_dir / 'chapters'

    if not chapters_dir.exists():
        return False, "No chapters to check for quizzes"

    chapters = [d for d in chapters_dir.iterdir()
                if d.is_dir() and (d / 'index.md').exists()]

    chapters_with_quizzes = 0
    for chapter in chapters:
        quiz_file = chapter / 'quiz.md'
        if check_file_exists(quiz_file):
            chapters_with_quizzes += 1

    if chapters_with_quizzes == 0:
        return False, "No quizzes found"
    elif chapters_with_quizzes == len(chapters):
        return True, f"All {len(chapters)} chapters have quizzes"
    else:
        percent = int((chapters_with_quizzes / len(chapters)) * 100)
        return False, f"{chapters_with_quizzes}/{len(chapters)} chapters have quizzes ({percent}%)"


def print_status_line(checkbox: str, label: str, details: str, indent: int = 0):
    """Print a formatted status line."""
    indent_str = "  " * indent
    print(f"{indent_str}{checkbox} {label}: {details}")


def main():
    """Main function to check and display book status."""
    # Use repository root as base
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent.parent
    docs_dir = repo_root / 'docs'

    if not docs_dir.exists():
        print(f"❌ Error: docs directory not found at {docs_dir}")
        return 1

    print("📚 Intelligent Textbook Status Report")
    print("=" * 60)
    print()

    # Check each component
    print("🔧 Foundation Components:")
    print()

    # 1. Course Description
    is_complete, msg = check_course_description(docs_dir)
    print_status_line(get_checkbox(is_complete), "Course Description", msg, 1)

    # 2. Learning Graph
    is_complete, msg, concept_count = check_learning_graph(docs_dir)
    print_status_line(get_checkbox(is_complete), "Learning Graph", msg, 1)

    # 3. Glossary
    is_complete, msg, term_count = check_glossary(docs_dir)
    print_status_line(get_checkbox(is_complete), "Glossary", msg, 1)

    print()
    print("📖 Content Components:")
    print()

    # 4. Chapters
    is_complete, msg, count, percent = check_chapters(docs_dir)
    print_status_line(get_checkbox(is_complete), "Chapters", msg, 1)

    # 5. MicroSims
    is_complete, msg, sim_count = check_microsims(docs_dir)
    print_status_line(get_checkbox(is_complete), "MicroSims", msg, 1)

    # 6. Quizzes
    is_complete, msg = check_quizzes(docs_dir)
    print_status_line(get_checkbox(is_complete), "Quizzes", msg, 1)

    print()
    print("📚 Supporting Materials:")
    print()

    # 7. References
    is_complete, msg = check_references(docs_dir)
    print_status_line(get_checkbox(is_complete), "References", msg, 1)

    # 8. FAQ
    is_complete, msg = check_faq(docs_dir)
    print_status_line(get_checkbox(is_complete), "FAQ", msg, 1)

    # 9. Prompts
    is_complete, msg, prompt_count = check_prompts(docs_dir)
    print_status_line(get_checkbox(is_complete), "AI Prompts", msg, 1)

    print()
    print("=" * 60)
    print()

    return 0


if __name__ == "__main__":
    sys.exit(main())
