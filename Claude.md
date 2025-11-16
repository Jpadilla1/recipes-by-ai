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

## Design and UX Guidelines

This repository follows a minimalistic, accessibility-first design philosophy. When making changes to the UI or layout, adhere to these practices:

### Design Philosophy

- **Minimalistic aesthetic**: Clean, neutral color palette with subtle borders and no rounded corners
- **Typography-focused**: Let content breathe with generous spacing and readable font sizes
- **Performance-first**: Use system fonts, CSS custom properties, and efficient rendering
- **Accessibility-first**: WCAG compliant with keyboard navigation, focus states, and reduced motion support

### Core Design Principles

1. **Color System**
   - Use CSS custom properties defined in `:root` for all colors
   - Maintain semantic naming: `--bg-primary`, `--text-primary`, `--border-color`, etc.
   - Keep the minimalistic neutral palette (light grays and blacks)

2. **Typography**
   - Base font size: 18px for improved readability
   - System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif`
   - Line height: 1.8 for body text, 1.4 for headings
   - Font weights: 300 (body), 400 (headings), 600 (bold)
   - Letter-spacing: 0.02em (default), 0.05-0.1em (uppercase headings)
   - Use uppercase with letter-spacing for section headings (h3) and labels

3. **Spacing and Layout**
   - Max content width: 680px
   - Mobile padding: 2-3rem, Desktop: 4-6rem
   - Generous margins between sections (4-6rem)
   - Consistent use of rem units for scalability

4. **Interactive Elements**
   - Full-width clickable areas for recipe links (padding: 2rem 0)
   - Border-bottom separators between list items
   - Hover states change border/text color, not background
   - Minimum touch target: 44x44px (especially for buttons)
   - Smooth transitions (0.2-0.3s ease) for color changes

### Dark Mode Implementation

- **User preference detection**: Check `prefers-color-scheme` media query
- **Manual override**: Support `data-theme` attribute on `<html>` element
- **Persistence**: Store theme preference in localStorage
- **No flash**: Initialize theme before page renders (inline script in `<head>`)
- **Theme toggle**: Circular button (44px) with sun/moon icon animation

### Accessibility Requirements

When adding or modifying UI elements:

1. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Support Enter and Space keys for custom buttons
   - Add proper `aria-label` attributes for icon-only buttons

2. **Focus States**
   - Use `:focus-visible` for keyboard-only focus indicators
   - 2px outline with 2-4px offset
   - Never remove focus outlines without providing alternatives

3. **Reduced Motion**
   - Respect `prefers-reduced-motion: reduce` media query
   - Disable/minimize animations for users who prefer it
   - Maintain functionality without relying on motion

4. **Semantic HTML**
   - Use proper heading hierarchy (h1 → h2 → h3)
   - Meaningful link text (avoid "click here")
   - Proper `<main>`, `<header>`, `<footer>` landmarks

5. **Color Contrast**
   - Maintain WCAG AA standards minimum
   - Test both light and dark modes
   - Don't rely on color alone to convey information

### Responsive Design

- **Mobile-first approach**: Base styles for mobile, enhance for larger screens
- **Breakpoint**: 768px (tablet and up)
- **Viewport meta tag**: Already included in layout
- **Touch-friendly**: Adequate spacing and touch targets on mobile

### Recipe List Styling

When adding recipe categories or lists:

```css
.category-section - Wraps each category with proper spacing
.category-section h3 - Small, uppercase, muted section titles
.recipe-list - Grid layout with no gaps
.recipe-list li - Border-bottom separator, full-width clickable area
.recipe-list a - Block display with generous padding (2rem vertical)
```

### Performance Considerations

- **Smooth scroll behavior**: Enabled by default (respects reduced motion)
- **Font smoothing**: `-webkit-font-smoothing: antialiased`
- **Efficient transitions**: Only transition necessary properties
- **No external fonts**: Use system fonts for instant rendering

### Code Style

When writing HTML/CSS:

- Use CSS custom properties for all theme-related values
- Follow BEM-like naming for component classes (`.category-section`, `.recipe-list`)
- No inline styles (except critical theme initialization)
- Keep border-radius at 0 for minimalistic aesthetic
- Prefer subtle borders over background color changes
- Use semantic HTML5 elements

---
