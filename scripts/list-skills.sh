#!/bin/bash

# List all available Claude skills with their names and descriptions
# Checks the personal skills directory and extracts metadata from SKILL.md files

SKILLS_DIR="$HOME/.claude/skills"

echo "📚 Available Claude Skills"
echo "=========================="
echo ""

if [ ! -d "$SKILLS_DIR" ]; then
    echo "❌ Skills directory not found: $SKILLS_DIR"
    exit 1
fi

count=0

for skill_dir in "$SKILLS_DIR"/*; do
    if [ -d "$skill_dir" ]; then
        skill_file="$skill_dir/SKILL.md"
        if [ -f "$skill_file" ]; then
            # Extract name and description from YAML frontmatter
            name=$(awk '/^name:/ {$1=""; print substr($0,2); exit}' "$skill_file")
            description=$(awk '/^description:/ {$1=""; print substr($0,2); exit}' "$skill_file")

            if [ -n "$name" ]; then
                echo "🔧 $name"
                if [ -n "$description" ]; then
                    echo "   $description"
                fi
                echo ""
                ((count++))
            fi
        fi
    fi
done

echo "=========================="
echo "Total skills: $count"
