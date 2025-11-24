# Claude Instructions for Recipe Management

This file contains guidelines for adding and managing recipes in this repository.

---

## ⚠️ CRITICAL REMINDER ⚠️

**ALWAYS UPDATE THE INDEX FILES WHEN ADDING A NEW RECIPE!**

When you add a new recipe, you MUST update BOTH index files:
- `/en/index.md` - Add English recipe link in alphabetical order
- `/es/index.md` - Add Spanish recipe link (matching English order, NOT alphabetically sorted in Spanish)

**The recipe will not appear on the website without this step!**

---

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

Current categories (6 total, each with recipes in both EN and ES):
- `breakfast/` - 3 recipes per language (6 total)
- `bread/` - 2 recipes per language (4 total)
- `cookies/` - 3 recipes per language (6 total)
- `desserts/` - 5 recipes per language (10 total)
- `drinks/` - 2 recipes per language (4 total)
- `sides/` - 2 recipes per language (4 total)

**Total recipes:** 17 per language, 34 total across both English and Spanish

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

## Multilingual Support

This site supports both English and Spanish. All content must be provided in both languages.

### Language Directory Structure

Recipes are organized by language prefix:
```
/en/                  # English recipes
  breakfast/
  bread/
  cookies/
  ...
  index.md           # English homepage
/es/                  # Spanish recipes
  breakfast/
  bread/
  cookies/
  ...
  index.md           # Spanish homepage
```

### When Adding a New Recipe

You MUST create the recipe in BOTH languages:

1. **Create English Version** (`/en/category/recipe-name.md`)
   - Include `lang: en` in the front matter
   - Write all content in English

2. **Create Spanish Version** (`/es/category/recipe-name.md`)
   - Include `lang: es` in the front matter
   - Translate ALL content to Spanish:
     - Title
     - Description
     - Time labels (use translations from `_data/translations.yml`)
     - Ingredients
     - Instructions
     - Notes and tips

3. **Update BOTH Index Pages**
   - Add recipe link to `/en/index.md`
   - Add translated recipe link to `/es/index.md`
   - Use translated category names and recipe titles in Spanish index

### Translation Resources

- UI translations are stored in `_data/translations.yml`
- Common labels:
  - Prep Time → Tiempo de Preparación
  - Cook Time → Tiempo de Cocción
  - Total Time → Tiempo Total
  - Yield → Porciones
  - Ingredients → Ingredientes
  - Instructions → Instrucciones
  - Notes → Notas
  - Storage → Almacenamiento

### Language Toggle & Auto-Detection

- **Auto-detection:** Root `index.md` uses JavaScript to detect browser language (`navigator.language`)
- **Automatic redirect:** Users are redirected to `/en/` or `/es/` based on browser preference
- **Manual toggle:** Language toggle button in header switches between EN/ES
- **URL-based persistence:** Language is part of URL structure (`/en/category/recipe.md` vs `/es/category/recipe.md`)
- **JavaScript fallback:** Works without JavaScript via noscript links
- **Toggle display:** Shows current language code (EN or ES)
- **Seamless switching:** Replaces `/en/` with `/es/` in URL path (and vice versa)

### Example Multilingual Recipe

English (`/en/breakfast/pancakes.md`):
```markdown
---
lang: en
---

# Fluffy Pancakes

**Prep Time:** 10 mins
**Cook Time:** 15 mins
...
```

Spanish (`/es/breakfast/pancakes.md`):
```markdown
---
lang: es
---

# Panqueques Esponjosos

**Tiempo de Preparación:** 10 mins
**Tiempo de Cocción:** 15 mins
...
```

## NEW Recipe Indicator

This site features a visual indicator (small circle •) to highlight recently added recipes. This helps users discover new content at a glance.

### How the NEW Indicator Works

- **Duration:** Recipes show the NEW indicator for **3 days** after being added
- **Visual Design:** Small circle dot displayed after the recipe title in index pages
- **Tracking:** Based on git commit dates (when the recipe file was first added)
- **Styling:** Minimalistic design that matches the site aesthetic

### Identifying New Recipes

Use the provided script to check which recipes should have the NEW indicator:

```bash
node scripts/check-new-recipes.js
```

This script:
- Scans all recipe files in both `/en/` and `/es/` directories
- Checks git commit history to find when each file was added
- Lists all recipes added in the last 3 days
- Provides file paths and days since addition

### Adding the NEW Indicator

When adding a new recipe OR when running the regular cleanup:

1. **Run the check script** to identify recipes within the 3-day window
2. **Update index.md files** for both languages:

```html
<!-- Add this span after the recipe title -->
<li><a href="category/recipe-name">Recipe Title <span class="new-indicator"></span></a></li>
```

**Example:**
```html
<li><a href="sides/quick-asian-cucumber-salad">Quick Asian-Style Cucumber Salad <span class="new-indicator"></span></a></li>
```

### Removing Old NEW Indicators

**Regular Maintenance Task:**

1. Run `node scripts/check-new-recipes.js` to get current list
2. Remove `<span class="new-indicator"></span>` from recipes older than 3 days
3. Update both `/en/index.md` and `/es/index.md`
4. Commit changes with message like "Remove NEW indicators from recipes older than 3 days"

### NEW Indicator Styling

The indicator is styled in `assets/css/style.scss`:

- **Size:** Small circle (0.375rem / 6px diameter)
- **Color:** Uses `--accent-color` CSS variable (adapts to light/dark mode)
- **Position:** Right-aligned after recipe title with 0.625rem left margin
- **Interaction:** Slightly increases opacity on hover (0.6 → 1.0)

The minimalistic design ensures it's noticeable but doesn't distract from the clean aesthetic.

### Checklist for NEW Recipe

When adding a brand new recipe:

- [ ] Recipe files created in both `/en/` and `/es/`
- [ ] Both index.md files updated with recipe links
- [ ] **NEW indicator added:** `<span class="new-indicator"></span>` in both index files
- [ ] Changes committed and pushed

When doing regular cleanup (every few days):

- [ ] Run `node scripts/check-new-recipes.js`
- [ ] Remove indicators from recipes older than 3 days
- [ ] Verify all recipes within 3 days have the indicator
- [ ] Commit changes

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

## Project Overview

### Technologies & Stack

This is a static website built with:
- **Static Site Generator:** Jekyll 4.x
- **Theme:** jekyll-theme-minimal
- **Styling:** SCSS (compiled to CSS) - 681 lines in `assets/css/style.scss`
- **Markdown Parser:** kramdown with GFM (GitHub Flavored Markdown)
- **Hosting:** GitHub Pages
- **Languages Supported:** English (EN) and Spanish (ES)

**Key Features:**
- Multilingual support with automatic browser language detection
- Dark/Light mode with user preference persistence
- Responsive design (mobile-first, 768px breakpoint)
- WCAG AA accessibility compliant
- No external dependencies (no Node.js/npm required)

### Project Structure

```
recipes-by-ai/
├── _config.yml              # Jekyll configuration
├── _data/
│   └── translations.yml     # EN/ES UI translations
├── _layouts/
│   └── default.html         # Main HTML template (137 lines)
├── assets/
│   └── css/
│       └── style.scss       # All styling (includes NEW indicator styles)
├── scripts/
│   └── check-new-recipes.js # Script to identify recipes < 30 days old
├── en/                      # English content (17 recipes)
│   ├── index.md            # English homepage
│   ├── breakfast/          # 3 recipes
│   ├── bread/              # 2 recipes
│   ├── cookies/            # 3 recipes
│   ├── desserts/           # 5 recipes
│   ├── drinks/             # 2 recipes
│   └── sides/              # 2 recipes
├── es/                      # Spanish content (17 recipes)
│   ├── index.md            # Spanish homepage
│   ├── breakfast/          # 3 recipes
│   ├── bread/              # 2 recipes
│   ├── cookies/            # 3 recipes
│   ├── desserts/           # 5 recipes
│   ├── drinks/             # 2 recipes
│   └── sides/              # 2 recipes
├── index.md                 # Root language redirect page
├── Claude.md               # This file - development guidelines
└── README.md               # Project overview
```

### Build & Deployment

- **Build Process:** Automatic via GitHub Pages on push to main branch
- **Local Development:** Run `jekyll serve` (no build tools needed)
- **SCSS Compilation:** Handled automatically by Jekyll
- **Live Site:** https://jpadilla1.github.io/recipes-by-ai/

## Design and UX Guidelines

This repository follows a minimalistic, accessibility-first design philosophy. When making changes to the UI or layout, adhere to these practices:

### Design Philosophy

- **Minimalistic aesthetic**: Clean, neutral color palette with subtle borders and no rounded corners
- **Japanese paper aesthetic**: Washi paper texture background using SVG-based noise filters for organic feel
- **Typography-focused**: Let content breathe with generous spacing and readable font sizes
- **Performance-first**: Use system fonts, CSS custom properties, and efficient rendering
- **Accessibility-first**: WCAG AA compliant with keyboard navigation, focus states, and reduced motion support

### Core Design Principles

1. **Color System**
   - Use CSS custom properties defined in `:root` for all colors
   - Maintain semantic naming: `--bg-primary`, `--text-primary`, `--border-color`, etc.
   - **Light Mode Colors:**
     - `--bg-primary: #F8F6F0` - Warm off-white background
     - `--bg-secondary: #F4F1E8` - Slightly darker off-white
     - `--text-primary: #2B2927` - Dark gray-brown
     - `--text-secondary: #525252` - Medium gray
     - `--text-muted: #737373` - Muted gray
     - `--border-color: #E0DDD5` - Subtle borders
     - `--link-color: #171717` - Dark links
     - `--recipe-link-color: #3d3b39` - Recipe-specific color
   - **Dark Mode Colors:**
     - `--bg-primary: #0a0a0a` - Near black
     - `--bg-secondary: #171717` - Dark gray
     - `--text-primary: #fafafa` - Near white
     - `--text-secondary: #a3a3a3` - Medium gray
     - `--border-color: #262626` - Subtle borders
     - `--link-color: #fafafa` - Light links
   - **Background Textures:**
     - Light mode: Japanese paper texture (SVG filter with fractal noise, opacity: 0.09)
     - Dark mode: Fine grain texture (subtler, opacity: 0.015)
     - Removed for users with `prefers-contrast: more` preference

2. **Typography**
   - Base font size: 18px for improved readability
   - System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif`
   - Line height: 1.75 for body text, 1.4 for headings
   - Font weights: 300 (light for header title), 400 (regular), 500 (medium for recipe headings), 600 (bold)
   - H1: 2rem (32px), font-weight: 500
   - H2: 1.5rem (24px), font-weight: 500, margin-top: 4rem
   - H3: 1.125rem (18px), uppercase, letter-spacing: 0.1em, font-weight: 500
   - Body: 1.0625rem (17px)
   - Use uppercase with letter-spacing for section headings (h3) and labels

3. **Spacing and Layout**
   - Max content width: 884px (centered with auto margins)
   - Mobile padding: 3rem 2rem
   - Desktop padding: 6rem 4rem
   - Category section margins: 2rem 0 (mobile), 3rem 0 (desktop)
   - Generous margins between sections (H2 headings: margin-top 4rem)
   - Consistent use of rem units for scalability

4. **Interactive Elements**
   - Full-width clickable areas for recipe links (padding: 1.5rem vertical, 1rem left on mobile)
   - Border-bottom separators between list items (1px solid var(--border-color))
   - Hover states: Shift right with background color change for recipe links
   - Minimum touch target: 44x44px (especially for buttons)
   - Smooth transitions (0.2s ease) for color, border, background changes
   - Focus states: 2px solid outline with 2-4px offset

5. **Sticky Header**
   - Position: sticky, top: 0, z-index: 100
   - Background color matches page background for visual separation
   - Contains site title, GitHub link, language toggle (EN/ES), and theme toggle
   - Mobile (< 768px): h1 font-size 0.75rem, padding 0.5rem 2rem
   - Desktop (≥ 768px): h1 font-size 0.875rem, padding 0.5rem 4rem
   - All header buttons are 44x44px for accessibility
   - Border-bottom for visual separation from content

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
   - Maintain WCAG AA standards minimum (4.5:1 for normal text, 3:1 for large text)
   - Recipe links use enhanced contrast colors (`--recipe-link-color: #3d3b39` in light mode)
   - Test both light and dark modes for contrast compliance
   - Don't rely on color alone to convey information
   - Recent improvements: Multiple iterations to ensure recipe link contrast meets WCAG AA

### Responsive Design

- **Mobile-first approach**: Base styles for mobile, enhance for larger screens
- **Breakpoint**: 768px (tablet and up)
- **Viewport meta tag**: Already included in layout
- **Touch-friendly**: Adequate spacing and touch targets on mobile

### Recipe List Styling

When adding recipe categories or lists:

```css
.category-section - Wraps each category with proper spacing (2-3rem margins)
.category-section h3 - Small (0.875rem), uppercase, muted (opacity: 0.7) section titles
.recipe-list - List with no gaps between items
.recipe-list li - Border-bottom separator (1px solid var(--border-color)), full-width clickable area
.recipe-list a - Block display with padding (1.5rem vertical, 1rem left on mobile)
.recipe-list a:hover - Shifts right (translateX) with background color change
```

**Important:** Recipe links have enhanced contrast ratios for WCAG AA compliance in both light and dark modes.

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
- Keep border-radius at 0 for minimalistic aesthetic (except circular buttons: 50%)
- Prefer subtle borders over background color changes
- Use semantic HTML5 elements

## Recent Development History

### Recent Improvements (Last 20+ Commits)

1. **Accessibility Enhancements**
   - Fixed recipe link contrast ratios for WCAG AA compliance
   - Multiple iterations to ensure optimal contrast in both light and dark modes
   - Enhanced focus states with proper keyboard navigation

2. **Japanese Design Aesthetic**
   - Implemented washi paper texture background using SVG filters
   - Added organic fiber texture for light mode (fractal noise, opacity: 0.09)
   - Fine grain texture for dark mode (opacity: 0.015)
   - Fixed GitHub Pages SCSS compilation with inline data URIs

3. **Layout & Scroll Improvements**
   - Fixed category header z-index conflicts during page scroll
   - Ensured sticky header stays on top without overlap issues
   - Added left padding to recipe link text for improved readability

4. **Multilingual Feature Expansion**
   - Complete English/Spanish parity (14 recipes in each language)
   - Language auto-detection with browser preference
   - Language toggle functionality with localStorage persistence
   - Standardized front matter with `lang: en/es` across all recipes

5. **Header & Navigation Refinements**
   - Solid header background with border-bottom separator
   - Full-width horizontal navigation
   - Compact header design optimized for mobile and desktop
   - 44x44px touch-friendly icon buttons

### Development Pattern

- **Branch naming:** `claude/[feature-description]-[ID]`
- **Workflow:** Feature branches with pull request-based merges
- **Commit style:** Descriptive, focused commits
- **Testing:** Manual testing across browsers and devices
- **Accessibility:** Regular WCAG compliance checks

---
