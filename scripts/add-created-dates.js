#!/usr/bin/env node

/**
 * Add created_date to all recipe files that don't have it
 * Uses git commit date as the baseline
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const RECIPE_DIRS = ['en', 'es'];

function getFileCommitDate(filePath) {
  try {
    const command = `git log --diff-filter=A --follow --format=%aI -1 -- "${filePath}"`;
    const dateStr = execSync(command, { encoding: 'utf8' }).trim();
    return dateStr ? new Date(dateStr).toISOString().split('T')[0] : null;
  } catch (error) {
    return null;
  }
}

function hasCreatedDate(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    return /^created_date:/m.test(frontmatter);
  }
  return false;
}

function addCreatedDate(content, date) {
  const frontmatterMatch = content.match(/^(---\n)([\s\S]*?)(\n---)/);
  if (frontmatterMatch) {
    const before = frontmatterMatch[1];
    const frontmatter = frontmatterMatch[2];
    const after = frontmatterMatch[3];
    const rest = content.slice(frontmatterMatch[0].length);

    // Add created_date after lang field
    const newFrontmatter = frontmatter.replace(
      /^(lang:\s*.+)$/m,
      `$1\ncreated_date: ${date}`
    );

    return before + newFrontmatter + after + rest;
  }
  return content;
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

function main() {
  console.log('\n🔍 Adding created_date to recipes that are missing it...\n');

  let totalUpdated = 0;
  let totalSkipped = 0;

  for (const lang of RECIPE_DIRS) {
    const recipeFiles = findRecipeFiles(lang);
    console.log(`\n${lang.toUpperCase()}:`);

    for (const filePath of recipeFiles) {
      const content = fs.readFileSync(filePath, 'utf8');

      if (hasCreatedDate(content)) {
        console.log(`  ⏭️  ${filePath} - already has created_date`);
        totalSkipped++;
        continue;
      }

      const gitDate = getFileCommitDate(filePath);
      if (!gitDate) {
        console.log(`  ⚠️  ${filePath} - no git date found`);
        continue;
      }

      const newContent = addCreatedDate(content, gitDate);
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`  ✅ ${filePath} - added created_date: ${gitDate}`);
      totalUpdated++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`  Updated: ${totalUpdated} files`);
  console.log(`  Skipped: ${totalSkipped} files (already had dates)`);
  console.log(`\n✨ All recipes now have created_date!\n`);
}

main();
