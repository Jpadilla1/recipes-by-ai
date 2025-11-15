# Claude Instructions for Recipe Management

This file contains guidelines for adding and managing recipes in this repository.

## Recipe Format

All recipes must follow this standard format:

### Required Sections

1. **Title** - H1 heading with the recipe name
2. **Credit** - Link to the original source (if applicable)
3. **Time Information** - Prep time, cook time, and any special timing (chilling, resting, etc.)
4. **Yield** - Number of servings or items produced
5. **Ingredients** - Bulleted list with measurements
6. **Instructions** - Numbered steps with clear, actionable directions

### Example Structure

```markdown
# Recipe Name

**Credit:** <https://example.com/original-recipe>

**Prep Time:** X mins
**Cook Time:** X mins
**Chilling Time:** X hrs (if applicable)
**Total Time:** X hrs X mins
**Yield:** X servings/cookies/etc.

## Ingredients

- ingredient 1 with measurement
- ingredient 2 with measurement
- etc.

## Instructions

1. **Step name:** Detailed instruction.
2. **Step name:** Detailed instruction.
3. Continue with numbered steps.

### Storage (optional)

Storage instructions if applicable.
```

## File Naming Convention

- Use lowercase with hyphens for file names
- Example: `lemon-almond-shortbread-cookies.md`
- Place in the appropriate category folder

## Category Structure

Current categories:
- `breakfast/`
- `cookies/`
- `drinks/`

### When Adding a Recipe

1. **Choose or Create Category**
   - Use an existing category if appropriate
   - Create a new category folder if the recipe doesn't fit existing categories
   - Use lowercase, plural names for new category folders

2. **Create the Recipe File**
   - Follow the standard format above
   - Include all required sections
   - Use measurements in both imperial and metric where the original provides them

3. **Update index.md** ⚠️ **CRITICAL**
   - **ALWAYS** update the `index.md` file when adding a new recipe
   - Add the recipe link under the appropriate category heading
   - If creating a new category, add a new heading and list the recipe
   - Keep categories in alphabetical order
   - Keep recipes within categories in alphabetical order

### Example index.md Update

```markdown
### Cookies

- [Gingerbread Cheesecake Cookies](cookies/gingerbread-cheesecake.md)
- [Lemon Almond Flour Shortbread Cookies](cookies/lemon-almond-shortbread-cookies.md)
```

## Tips

- Include pro tips, storage instructions, or variations in separate subsections
- Break down complex instructions into clear, numbered steps
- Use bold text for step names to improve readability
- Always credit the original source when applicable
- Preserve measurements as provided in the source (grams, cups, etc.)

## Checklist for Adding a Recipe

- [ ] Recipe file created in appropriate category folder
- [ ] File follows standard format with all required sections
- [ ] Credit link included (if applicable)
- [ ] File name uses lowercase with hyphens
- [ ] **index.md updated with new recipe link**
- [ ] Recipe added under correct category in index.md
- [ ] New category folder created if needed
- [ ] New category heading added to index.md if needed
- [ ] Changes committed and pushed

---

**Remember:** Never skip updating `index.md` - the recipe won't appear on GitHub Pages without it!
