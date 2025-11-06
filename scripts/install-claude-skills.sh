#!/bin/bash

# install-claude-skills.sh
# Creates symbolic links in .claude/skills for each skill in the project's skills directory

set -e  # Exit on error

# Get the absolute path to the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Get the project root (parent of scripts directory)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Source and target directories
SKILLS_DIR="$PROJECT_ROOT/skills"
CLAUDE_SKILLS_DIR="$PROJECT_ROOT/.claude/skills"

# Check if skills directory exists
if [ ! -d "$SKILLS_DIR" ]; then
    echo "❌ Error: Skills directory not found at $SKILLS_DIR"
    exit 1
fi

# Create .claude/skills directory if it doesn't exist
if [ ! -d "$CLAUDE_SKILLS_DIR" ]; then
    echo "📁 Creating $CLAUDE_SKILLS_DIR directory..."
    mkdir -p "$CLAUDE_SKILLS_DIR"
fi

echo "🔗 Installing skills from $SKILLS_DIR"
echo ""

# Counter for installed skills
INSTALLED=0
SKIPPED=0

# Loop through each directory in skills/
for skill_path in "$SKILLS_DIR"/*; do
    # Skip if not a directory
    if [ ! -d "$skill_path" ]; then
        continue
    fi

    # Get the skill name (directory name)
    skill_name=$(basename "$skill_path")

    # Target symlink path
    target_link="$CLAUDE_SKILLS_DIR/$skill_name"

    # Check if symlink already exists
    if [ -L "$target_link" ]; then
        # Check if it points to the correct location
        current_target=$(readlink "$target_link")
        if [ "$current_target" = "$skill_path" ]; then
            echo "✓ $skill_name (already installed)"
            ((SKIPPED++))
        else
            echo "⚠️  $skill_name (exists but points to different location)"
            echo "   Current: $current_target"
            echo "   Expected: $skill_path"
            echo "   Updating symlink..."
            rm "$target_link"
            ln -s "$skill_path" "$target_link"
            ((INSTALLED++))
        fi
    elif [ -e "$target_link" ]; then
        # Path exists but is not a symlink
        echo "⚠️  $skill_name (exists as a regular file/directory, skipping)"
        ((SKIPPED++))
    else
        # Create new symlink
        echo "✅ $skill_name (installing)"
        ln -s "$skill_path" "$target_link"
        ((INSTALLED++))
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Summary:"
echo "  Installed: $INSTALLED"
echo "  Skipped: $SKIPPED"
echo "  Location: $CLAUDE_SKILLS_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ Skills installation complete!"
