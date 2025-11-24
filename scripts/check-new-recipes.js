#!/usr/bin/env node

/**
 * Check which recipes were added in the last 30 days based on created_date frontmatter or git commit dates
 * This helps identify which recipes should have the NEW indicator
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DAYS_THRESHOLD = 30;
const RECIPE_DIRS = ['en', 'es'];
const EXCLUDE_FILES = ['index.md'];

function getCreatedDateFromFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Match YAML frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      // Look for created_date field
      const dateMatch = frontmatter.match(/^created_date:\s*(\d{4}-\d{2}-\d{2})/m);
      if (dateMatch) {
        return new Date(dateMatch[1]);
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

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

function getRecipeDate(filePath) {
  // Prioritize created_date from frontmatter, fall back to git commit date
  const frontmatterDate = getCreatedDateFromFrontmatter(filePath);
  if (frontmatterDate) {
    return { date: frontmatterDate, source: 'frontmatter' };
  }

  const gitDate = getFileCommitDate(filePath);
  if (gitDate) {
    return { date: gitDate, source: 'git' };
  }

  return null;
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
      const recipeInfo = getRecipeDate(filePath);

      if (recipeInfo && recipeInfo.date >= threshold) {
        const title = getRecipeTitle(filePath);
        const daysAgo = Math.floor((now - recipeInfo.date) / (1000 * 60 * 60 * 24));

        newRecipes[lang].push({
          path: filePath,
          title: title,
          date: recipeInfo.date,
          daysAgo: daysAgo,
          source: recipeInfo.source
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
        const sourceIcon = recipe.source === 'frontmatter' ? '📝' : '🔧';
        const sourceLabel = recipe.source === 'frontmatter' ? 'created_date' : 'git commit';
        console.log(`  ✓ ${recipe.title}`);
        console.log(`    ${recipe.path}`);
        console.log(`    ${sourceIcon} Date: ${dateStr} (${recipe.daysAgo} days ago) - from ${sourceLabel}\n`);
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
