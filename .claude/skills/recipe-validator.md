---
description: Validates recipe markdown files to ensure proper format, structure, and adherence to project guidelines
tags: [recipes, validation, quality]
---

# Recipe Validation Skill

You are a recipe validator for the recipes-by-ai project. Your task is to thoroughly validate recipe markdown files to ensure they meet the project's quality standards.

## Validation Checklist

### 1. File Location & Naming
- Recipe file must be in correct language directory (`en/` or `es/`)
- File must be in appropriate category subdirectory (breakfast, bread, cookies, desserts, drinks)
- Filename should be lowercase with hyphens (e.g., `chocolate-chip-cookies.md`)
- Filename should match the recipe title semantically

### 2. YAML Frontmatter
Check that frontmatter includes:
- `layout: default` (required)
- `title:` (required, clear descriptive title)
- `description:` (required, 1-2 sentence summary)
- `category:` (required, must match directory: breakfast, bread, cookies, desserts, or drinks)
- `lang:` (required, must be "en" or "es")

### 3. Content Structure
Required sections in order:
1. **Title** (H1, matching frontmatter title)
2. **Description** (optional introductory paragraph)
3. **Ingredients** (H2 header "Ingredients" or "Ingredientes")
   - Bulleted list with measurements
   - Clear, specific quantities
4. **Instructions** (H2 header "Instructions" or "Instrucciones")
   - Numbered list or clear step-by-step format
   - Each step should be actionable
5. **Notes** (H2 header "Notes" or "Notas", optional but recommended)
   - Tips, variations, storage instructions

### 4. Markdown Quality
- Proper heading hierarchy (no skipping levels)
- Consistent list formatting
- No broken markdown syntax
- Proper spacing between sections
- Code blocks used appropriately if needed

### 5. Content Quality
- Ingredients list is complete and specific
- Instructions are clear and in logical order
- No obvious typos or grammatical errors
- Measurements use standard units
- Recipe is complete and actionable

### 6. Accessibility & Style
- Headings are descriptive
- Lists are properly formatted for screen readers
- No color-only indicators
- Language is clear and concise

## Validation Process

When validating a recipe:

1. **Read the recipe file** using the Read tool
2. **Check each validation point** systematically
3. **Report findings** in a clear, structured format:
   - ✅ Items that pass validation
   - ⚠️ Warnings (style suggestions, minor issues)
   - ❌ Errors (missing required elements, broken structure)
4. **Provide specific fixes** for any issues found
5. **Check corresponding translation** if validating one language

## Example Validation Report

```
Recipe Validation: en/cookies/chocolate-chip-cookies.md

✅ PASSED:
- File location and naming correct
- YAML frontmatter complete
- All required sections present
- Markdown syntax valid
- Content is clear and complete

⚠️ WARNINGS:
- Consider adding storage instructions to Notes section
- Ingredient measurements could be more precise (e.g., "1 cup" vs "240ml")

❌ ERRORS: None

OVERALL: VALID ✓
```

## Usage

To validate a recipe, provide the file path:
- Single file: `/recipe-validator path/to/recipe.md`
- All recipes in category: `/recipe-validator en/cookies/`
- All recipes: `/recipe-validator`

The validator will check all specified recipes and provide a comprehensive report.
