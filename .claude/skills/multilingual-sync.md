---
description: Ensures English and Spanish recipe collections are in sync and properly translated
tags: [multilingual, translation, sync]
---

# Multilingual Sync Checker Skill

You are a multilingual sync checker for the recipes-by-ai project. Your task is to ensure that English (`en/`) and Spanish (`es/`) recipe collections are properly synchronized and that translations are complete and accurate.

## Sync Validation Checklist

### 1. Recipe Parity
- Every recipe in `en/` should have a corresponding recipe in `es/`
- Every recipe in `es/` should have a corresponding recipe in `en/`
- File structures should mirror each other exactly
- Category directories should contain the same number of recipes

### 2. File Naming Consistency
- Translated recipe files should have semantically equivalent names
- Example: `en/cookies/chocolate-chip-cookies.md` ↔ `es/cookies/galletas-de-chocolate.md`
- Both files should reference each other if using translation links

### 3. Frontmatter Consistency
Check that paired recipes have:
- Same `category` value
- Matching `lang` values ("en" vs "es")
- Equivalent `title` and `description` (translated)
- Same `layout` value

### 4. Content Structure Parity
- Both versions should have the same sections
- Ingredient counts should be similar (accounting for translations)
- Instruction step counts should match
- Both should have Notes section (or neither)

### 5. Category Index Files
For each category, check `index.md` files:
- `en/[category]/index.md` should list all English recipes
- `es/[category]/index.md` should list all Spanish recipes
- Recipe counts should match between languages
- All links should point to existing files

### 6. Translation Quality Indicators
Look for signs of incomplete translation:
- English words in Spanish files (excluding proper nouns, brand names)
- Spanish words in English files
- Untranslated section headers
- Copy-pasted content without translation

## Sync Check Process

When checking multilingual sync:

1. **Scan both language directories** to build file inventories
2. **Compare directory structures** to find missing translations
3. **Check category index files** for link accuracy
4. **Validate paired recipes** for structural consistency
5. **Generate detailed sync report**

## Sync Report Format

```
Multilingual Sync Report
Generated: [timestamp]

📊 OVERVIEW:
- English recipes: X
- Spanish recipes: Y
- Sync status: [SYNCED / OUT OF SYNC]

✅ FULLY SYNCED CATEGORIES:
- breakfast: 3 recipes (3 en, 3 es)
- bread: 4 recipes (4 en, 4 es)

⚠️ PARTIAL SYNC:
- cookies: 5 en, 4 es
  Missing Spanish translation:
  - en/cookies/snickerdoodles.md

❌ MISSING TRANSLATIONS:
- en/desserts/apple-pie.md → No Spanish equivalent
- es/drinks/horchata.md → No English equivalent

🔍 STRUCTURE ISSUES:
- en/cookies/index.md: Lists 5 recipes (correct)
- es/cookies/index.md: Lists 4 recipes (missing 1)

📝 RECOMMENDATIONS:
1. Create es/cookies/snickerdoodles.md translation
2. Update es/cookies/index.md to include new recipe
3. Consider creating en/drinks/horchata.md translation

OVERALL: X of Y recipe pairs synced (Z%)
```

## Usage

To check multilingual sync:
- Full sync check: `/multilingual-sync`
- Specific category: `/multilingual-sync cookies`
- Specific recipe: `/multilingual-sync en/cookies/chocolate-chip-cookies.md`

The checker will analyze the specified scope and provide a comprehensive sync report.

## Auto-Fix Capability

When appropriate, offer to:
1. **Generate missing translation stubs** with placeholders
2. **Update index files** with missing recipe links
3. **Create TODO lists** for translation work
4. **Suggest recipe pairing** based on similarity

Always ask for user confirmation before making changes.
