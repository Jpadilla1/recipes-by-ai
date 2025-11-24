#!/usr/bin/env node

/**
 * Check which recipes were added in the last 3 days based on git commit dates
 * This helps identify which recipes should have the NEW indicator
 */

const { execSync } = require('child_process');
const path = require('path');

const DAYS_THRESHOLD = 3;
const RECIPE_DIRS = ['en', 'es'];
const EXCLUDE_FILES = ['index.md'];

function getFileCommitDate(filePath) {
  try {
    // Get the date when the file was first added to git
    const command = `git log --diff-filter=A --follow --format=%aI -1 -- "${filePath}"`;
    const dateStr = execSync(command, { encoding: 'utf8' }).trim();
    return dateStr ? new Date(dateStr) : null;
  } catch (error) {
    return null;
  }
}

function findRecipeFiles(dir) {
  try {
    const command = `find ${dir} -type f -name "*.md" ! -name "index.md"`;
    const output = execSync(command, { encoding: 'utf8' }).trim();
    return output ? output.split('\n') : [];
  } catch (error) {
    return [];
  }
}

function getRecipeTitle(filePath) {
  try {
    const content = require('fs').readFileSync(filePath, 'utf8');
    // Extract first heading
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1] : path.basename(filePath, '.md');
  } catch (error) {
    return path.basename(filePath, '.md');
  }
}

function main() {
  console.log(`\n🔍 Checking for recipes added in the last ${DAYS_THRESHOLD} days...\n`);

  const now = new Date();
  const threshold = new Date(now.getTime() - (DAYS_THRESHOLD * 24 * 60 * 60 * 1000));

  const newRecipes = {
    en: [],
    es: []
  };

  for (const lang of RECIPE_DIRS) {
    const recipeFiles = findRecipeFiles(lang);

    for (const filePath of recipeFiles) {
      const commitDate = getFileCommitDate(filePath);

      if (commitDate && commitDate >= threshold) {
        const title = getRecipeTitle(filePath);
        const daysAgo = Math.floor((now - commitDate) / (1000 * 60 * 60 * 24));

        newRecipes[lang].push({
          path: filePath,
          title: title,
          date: commitDate,
          daysAgo: daysAgo
        });
      }
    }
  }

  // Sort by date (newest first)
  for (const lang of RECIPE_DIRS) {
    newRecipes[lang].sort((a, b) => b.date - a.date);
  }

  // Display results
  console.log(`📅 NEW RECIPES (last ${DAYS_THRESHOLD} days):\n`);

  for (const lang of RECIPE_DIRS) {
    console.log(`${lang.toUpperCase()}:`);
    if (newRecipes[lang].length === 0) {
      console.log('  (none)\n');
    } else {
      newRecipes[lang].forEach(recipe => {
        const dateStr = recipe.date.toISOString().split('T')[0];
        console.log(`  ✓ ${recipe.title}`);
        console.log(`    ${recipe.path}`);
        console.log(`    Added: ${dateStr} (${recipe.daysAgo} days ago)\n`);
      });
    }
  }

  // Summary
  const totalNew = newRecipes.en.length + newRecipes.es.length;
  console.log(`\n📊 Total: ${totalNew} new recipe files (${newRecipes.en.length} EN, ${newRecipes.es.length} ES)\n`);

  if (totalNew > 0) {
    console.log('💡 These recipes should have the NEW indicator in their respective index.md files\n');
  }
}

main();
