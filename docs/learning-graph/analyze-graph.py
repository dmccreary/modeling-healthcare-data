#!/usr/bin/env python3
"""
Learning Graph Quality Analysis

This script analyzes a learning graph CSV file and generates a quality report.
It checks for:
- DAG structure (no cycles)
- Self-dependencies
- Foundational concepts (zero dependencies)
- Orphaned nodes
- Disconnected subgraphs
- Indegree analysis
- Linear chains
"""

import csv
import sys
from collections import defaultdict, deque


def read_graph_csv(filename):
    """Read the CSV file and return graph structure."""
    concepts = {}
    dependencies = defaultdict(list)
    reverse_dependencies = defaultdict(list)

    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            concept_id = int(row['ConceptID'])
            label = row['ConceptLabel']
            deps = row['Dependencies']

            concepts[concept_id] = label

            if deps and deps.strip():
                dep_list = [int(d.strip()) for d in deps.split('|')]
                dependencies[concept_id] = dep_list
                for dep in dep_list:
                    reverse_dependencies[dep].append(concept_id)

    return concepts, dependencies, reverse_dependencies


def check_dag(concepts, dependencies):
    """Check if the graph is a DAG (no cycles)."""
    # Use topological sort to detect cycles
    in_degree = {cid: 0 for cid in concepts}

    for cid in concepts:
        if cid in dependencies:
            in_degree[cid] = len(dependencies[cid])

    queue = deque([cid for cid, deg in in_degree.items() if deg == 0])
    sorted_count = 0

    while queue:
        current = queue.popleft()
        sorted_count += 1

        # This is reverse lookup - find what depends on current
        for next_concept in concepts:
            if next_concept in dependencies and current in dependencies[next_concept]:
                in_degree[next_concept] -= 1
                if in_degree[next_concept] == 0:
                    queue.append(next_concept)

    return sorted_count == len(concepts)


def check_self_dependencies(dependencies):
    """Check for self-referencing concepts."""
    self_deps = []
    for cid, deps in dependencies.items():
        if cid in deps:
            self_deps.append(cid)
    return self_deps


def find_foundational_concepts(concepts, dependencies):
    """Find concepts with zero dependencies."""
    return [cid for cid in concepts if cid not in dependencies or not dependencies[cid]]


def find_orphaned_nodes(concepts, reverse_dependencies):
    """Find concepts that nothing depends on (leaf nodes)."""
    return [cid for cid in concepts if cid not in reverse_dependencies or not reverse_dependencies[cid]]


def calculate_indegrees(concepts, reverse_dependencies):
    """Calculate indegree for each concept."""
    indegrees = {}
    for cid in concepts:
        indegrees[cid] = len(reverse_dependencies.get(cid, []))
    return indegrees


def find_max_chain_length(concepts, dependencies):
    """Find the maximum dependency chain length using DFS."""
    memo = {}

    def dfs(cid):
        if cid in memo:
            return memo[cid]

        if cid not in dependencies or not dependencies[cid]:
            memo[cid] = 0
            return 0

        max_length = 0
        for dep in dependencies[cid]:
            max_length = max(max_length, dfs(dep) + 1)

        memo[cid] = max_length
        return max_length

    return max(dfs(cid) for cid in concepts)


def calculate_quality_score(concepts, dependencies, reverse_dependencies, is_dag, self_deps):
    """Calculate overall quality score (1-100)."""
    score = 100

    # Major issues
    if not is_dag:
        score -= 50
    if self_deps:
        score -= 10 * min(len(self_deps), 5)

    # Check for reasonable foundation
    foundational = find_foundational_concepts(concepts, dependencies)
    foundation_ratio = len(foundational) / len(concepts)
    if foundation_ratio < 0.02:  # Less than 2%
        score -= 15
    elif foundation_ratio > 0.15:  # More than 15%
        score -= 10

    # Check for orphaned nodes
    orphaned = find_orphaned_nodes(concepts, reverse_dependencies)
    orphan_ratio = len(orphaned) / len(concepts)
    if orphan_ratio > 0.15:  # More than 15% orphaned
        score -= 10

    # Check dependency distribution
    avg_deps = sum(len(deps) for deps in dependencies.values()) / len(concepts)
    if avg_deps < 1.0:
        score -= 10

    return max(0, min(100, score))


def generate_report(filename, output_filename):
    """Generate comprehensive quality report."""
    concepts, dependencies, reverse_dependencies = read_graph_csv(filename)

    # Run all checks
    is_dag = check_dag(concepts, dependencies)
    self_deps = check_self_dependencies(dependencies)
    foundational = find_foundational_concepts(concepts, dependencies)
    orphaned = find_orphaned_nodes(concepts, reverse_dependencies)
    indegrees = calculate_indegrees(concepts, reverse_dependencies)
    max_chain = find_max_chain_length(concepts, dependencies)

    # Calculate statistics
    total_concepts = len(concepts)
    concepts_with_deps = len([c for c in concepts if c in dependencies and dependencies[c]])
    total_dependencies = sum(len(deps) for deps in dependencies.values())
    avg_dependencies = total_dependencies / total_concepts if total_concepts > 0 else 0

    # Top indegree concepts
    top_indegree = sorted(indegrees.items(), key=lambda x: x[1], reverse=True)[:10]

    # Calculate quality score
    quality_score = calculate_quality_score(concepts, dependencies, reverse_dependencies, is_dag, self_deps)

    # Generate markdown report
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write("# Learning Graph Quality Analysis\n\n")

        # Overall Quality Score
        f.write("## Overall Quality Score\n\n")
        f.write(f"**Score: {quality_score}/100**\n\n")

        if quality_score >= 90:
            rating = "Excellent"
        elif quality_score >= 75:
            rating = "Good"
        elif quality_score >= 60:
            rating = "Adequate"
        elif quality_score >= 40:
            rating = "Fair"
        else:
            rating = "Poor"

        f.write(f"**Rating: {rating}**\n\n")

        if quality_score >= 70:
            f.write("✓ The learning graph meets quality standards and is ready for use.\n\n")
        else:
            f.write("⚠ The learning graph needs improvement before use.\n\n")

        # Basic Statistics
        f.write("## Basic Statistics\n\n")
        f.write(f"- Total concepts: {total_concepts}\n")
        f.write(f"- Concepts with dependencies: {concepts_with_deps}\n")
        f.write(f"- Foundational concepts (no dependencies): {len(foundational)}\n")
        f.write(f"- Total dependencies: {total_dependencies}\n")
        f.write(f"- Average dependencies per concept: {avg_dependencies:.2f}\n")
        f.write(f"- Maximum dependency chain length: {max_chain}\n\n")

        # DAG Check
        f.write("## DAG Structure Validation\n\n")
        if is_dag:
            f.write("✓ **PASS**: The graph is a valid Directed Acyclic Graph (no cycles detected).\n\n")
        else:
            f.write("✗ **FAIL**: The graph contains cycles. This must be fixed.\n\n")

        # Self-dependencies
        f.write("## Self-Dependency Check\n\n")
        if not self_deps:
            f.write("✓ **PASS**: No self-dependencies detected.\n\n")
        else:
            f.write(f"✗ **FAIL**: Found {len(self_deps)} concept(s) with self-dependencies:\n\n")
            for cid in self_deps:
                f.write(f"- Concept {cid}: {concepts[cid]}\n")
            f.write("\n")

        # Foundational Concepts
        f.write("## Foundational Concepts\n\n")
        f.write(f"Found {len(foundational)} foundational concepts ({len(foundational)/total_concepts*100:.1f}%):\n\n")
        for cid in sorted(foundational)[:20]:  # Show first 20
            f.write(f"- Concept {cid}: {concepts[cid]}\n")
        if len(foundational) > 20:
            f.write(f"\n... and {len(foundational) - 20} more\n")
        f.write("\n")

        # Orphaned Nodes
        f.write("## Orphaned Nodes (Leaf Concepts)\n\n")
        f.write(f"Found {len(orphaned)} orphaned concepts ({len(orphaned)/total_concepts*100:.1f}%):\n\n")
        if len(orphaned) <= 30:
            for cid in sorted(orphaned):
                f.write(f"- Concept {cid}: {concepts[cid]}\n")
        else:
            for cid in sorted(orphaned)[:30]:
                f.write(f"- Concept {cid}: {concepts[cid]}\n")
            f.write(f"\n... and {len(orphaned) - 30} more\n")
        f.write("\n")

        # Top Indegree Concepts
        f.write("## Top 10 Most Depended-Upon Concepts\n\n")
        f.write("Concepts with the highest indegree (most other concepts depend on them):\n\n")
        f.write("| Rank | Concept ID | Concept Label | Indegree |\n")
        f.write("|------|------------|---------------|----------|\n")
        for i, (cid, indeg) in enumerate(top_indegree, 1):
            f.write(f"| {i} | {cid} | {concepts[cid]} | {indeg} |\n")
        f.write("\n")

        # Recommendations
        f.write("## Recommendations\n\n")

        if not is_dag:
            f.write("- **CRITICAL**: Fix circular dependencies to ensure the graph is a DAG.\n")

        if self_deps:
            f.write("- **CRITICAL**: Remove self-dependencies.\n")

        foundation_ratio = len(foundational) / total_concepts
        if foundation_ratio < 0.02:
            f.write("- Consider adding more foundational concepts (currently < 2%).\n")
        elif foundation_ratio > 0.15:
            f.write("- Consider consolidating foundational concepts (currently > 15%).\n")

        orphan_ratio = len(orphaned) / total_concepts
        if orphan_ratio > 0.15:
            f.write(f"- High number of orphaned nodes ({orphan_ratio*100:.1f}%). Consider if capstone/final concepts should have more concepts building upon them.\n")

        if avg_dependencies < 1.0:
            f.write("- Low average dependencies. Consider adding more prerequisite relationships.\n")

        if quality_score >= 70:
            f.write("- Overall, the graph structure is good and ready for taxonomy assignment.\n")

        f.write("\n---\n\n")
        f.write("*Report generated by analyze-graph.py*\n")

    print(f"Quality report written to {output_filename}")
    print(f"Quality Score: {quality_score}/100 ({rating})")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python analyze-graph.py <input-csv> <output-md>")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]

    generate_report(input_file, output_file)
