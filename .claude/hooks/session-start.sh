#!/bin/bash
set -euo pipefail

# Only run this hook in Claude Code remote environment (web)
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo "🔧 Setting up recipe validation tools..."

# Navigate to project directory
cd "$CLAUDE_PROJECT_DIR"

# Install npm dependencies for linting and testing
if [ -f "package.json" ]; then
  echo "📦 Installing npm dependencies..."
  npm install --silent
  echo "✅ Dependencies installed successfully"
else
  echo "⚠️  No package.json found, skipping npm install"
fi

echo "✨ Recipe validation tools ready!"
