# CSS Grid — Responsive Design

![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![CSS Grid](https://img.shields.io/badge/CSS%20Grid-Layout-purple?style=flat-square)
![Responsive](https://img.shields.io/badge/Responsive-3%20Breakpoints-green?style=flat-square)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Manrope%20%7C%20Source%20Code%20Pro-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A science news feed — the **third Responsive Design project** from **Scrimba's Fullstack Web Development Path**.

This README is a **complete concept revision guide**. It explains every new CSS concept introduced in this project that was **not present in the previous Responsive Layouts or Build a Product Page projects**, with a deep focus on **CSS Grid** — the two-dimensional layout system that Flexbox cannot replace.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Build a Product Page](#3-whats-new-vs-build-a-product-page)
4. [CSS Grid vs Flexbox — When to Use Which](#4-css-grid-vs-flexbox--when-to-use-which)
5. [CSS Grid Fundamentals](#5-css-grid-fundamentals)
   - [display: grid](#51-display-grid)
   - [grid-template-columns](#52-grid-template-columns)
   - [The fr unit](#53-the-fr-unit)
   - [gap on grid containers](#54-gap-on-grid-containers)
   - [Implicit rows](#55-implicit-rows)
6. [grid-template-areas — Named Area Placement](#6-grid-template-areas--named-area-placement)
   - [Defining areas on the container](#61-defining-areas-on-the-container)
   - [grid-area on children](#62-grid-area-on-children)
   - [Dot notation for empty cells](#63-dot-notation-for-empty-cells)
   - [Why named areas beat line numbers](#64-why-named-areas-beat-line-numbers)
7. [The Body Grid — Page-Level Layout](#7-the-body-grid--page-level-layout)
   - [3-column grid for horizontal margins](#71-3-column-grid-for-horizontal-margins)
   - [Empty rows via gap for vertical margins](#72-empty-rows-via-gap-for-vertical-margins)
   - [Why not use margin or padding?](#73-why-not-use-margin-or-padding)
8. [The Main Grid — Article Card Layout](#8-the-main-grid--article-card-layout)
   - [Mobile: 1-column stack (base)](#81-mobile-1-column-stack-base)
   - [Tablet: 2-column with spanning (500px)](#82-tablet-2-column-with-spanning-500px)
   - [Desktop: 12-column magazine grid (870px)](#83-desktop-12-column-magazine-grid-870px)
9. [Spanning — Making Items Cross Multiple Columns or Rows](#9-spanning--making-items-cross-multiple-columns-or-rows)
   - [Spanning with grid-template-areas](#91-spanning-with-grid-template-areas)
   - [The nasa card — spanning two rows](#92-the-nasa-card--spanning-two-rows)
10. [repeat() — The Grid Column Shorthand](#10-repeat--the-grid-column-shorthand)
    - [repeat(n, value)](#101-repeatn-value)
    - [repeat(12, 1fr)](#102-repeat12-1fr)
    - [Mixed repeat — repeat(9, 1fr) repeat(3, minmax(...))](#103-mixed-repeat--repeat9-1fr-repeat3-minmax)
11. [minmax() — Flexible Column Sizing](#11-minmax--flexible-column-sizing)
    - [minmax(min, max)](#111-minmaxmin-max)
    - [minmax(70px, 1fr) in context](#112-minmax70px-1fr-in-context)
12. [Nested Grids — `main` inside `body`](#12-nested-grids--main-inside-body)
13. [height: 100% on Article Cards](#13-height-100-on-article-cards)
14. [filter: brightness() — Hover and Focus Effects](#14-filter-brightness--hover-and-focus-effects)
15. [Focus Styling — outline + box-shadow combo](#15-focus-styling--outline--box-shadow-combo)
    - [outline](#151-outline)
    - [box-shadow as a second ring](#152-box-shadow-as-a-second-ring)
    - [transition on focus](#153-transition-on-focus)
16. [Variable Font Weight — font-weight range](#16-variable-font-weight--font-weight-range)
17. [font-family: "Source Code Pro" on the header](#17-font-family-source-code-pro-on-the-header)
18. [Wrapping `<article>` in `<a>` — Clickable Cards](#18-wrapping-article-in-a--clickable-cards)
    - [aria-label on the link](#181-aria-label-on-the-link)
    - [text-decoration: none](#182-text-decoration-none)
19. [border-top-left-radius and border-top-right-radius](#19-border-top-left-radius-and-border-top-right-radius)
20. [lang="en" on `<html>`](#20-langen-on-html)
21. [CSS Concepts Reinforced](#21-css-concepts-reinforced)
22. [HTML Structure Recap](#22-html-structure-recap)
23. [How the Layout Changes Across Three Breakpoints](#23-how-the-layout-changes-across-three-breakpoints)
24. [How to Run](#24-how-to-run)
25. [Course Reference](#25-course-reference)

---

# 1. Project Overview

**SciStream** is a science news aggregator. The page displays five article cards across three distinct responsive layouts:

* **Mobile** (base, < 500px) — A single-column stack: all five cards stacked vertically
* **Tablet** (≥ 500px) — A 2-column grid where the Technology article spans both columns at the top, the NASA article spans two rows on the right side, and Health spans both columns at the bottom
* **Desktop** (≥ 870px) — A 12-column magazine-style grid where Technology takes 6 columns, Environment and NASA share the right 6, Physics and Health share the left 6 on the second row, and NASA spans both rows on the right

The page layout itself (header, main, footer) is also built entirely with CSS Grid — using a 3-column body grid with `1em` side gutters and a `gap`-driven top/bottom margin, with no `margin` or `padding` used for spacing.

Each card is an `<article>` wrapped in a full-card `<a>` link with an `aria-label`, a photograph, and a two-level heading (`h2` for category, `h3` for headline). Hover and focus states use `filter: brightness()` and a dual `outline` + `box-shadow` focus ring.

---

# 2. Project Structure

```
06. Responsive Design/
│
└── 03. CSS Grid/
    ├── index.html      → Page: header, main with 5 article cards, footer
    ├── index.css       → Body grid, main grid (3 breakpoints), card styles, typography
    ├── hint.md         → Challenge hint explaining the body grid technique
    └── images/
        ├── crystals.jpg   → Technology article image
        ├── plastics.jpg   → Environment article image
        ├── asteroid.jpg   → NASA article image
        ├── physics.jpg    → Physics article image
        └── nano.jpg       → Health article image
```

No JavaScript. No build step. The entire responsive magazine layout is achieved purely in CSS Grid with named template areas and three media query breakpoints.

---

# 3. What's New vs Build a Product Page

## New CSS Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `display: grid` | `body`, `main` | Activates CSS Grid on the element — children become grid items |
| `grid-template-columns` | `body`, `main` at all breakpoints | Defines the number and size of columns |
| `fr` unit | `1fr`, `repeat(12, 1fr)` | Fractional unit — divides remaining free space proportionally |
| `grid-template-areas` | `body`, `main` at all breakpoints | Names regions of the grid with strings; items placed by name |
| `grid-area` | `.site-header`, `footer`, all article `<a>` wrappers | Assigns an item to a named area in `grid-template-areas` |
| `gap: 1em 0` | `body` | Two-value gap: `1em` between rows, `0` between columns |
| `repeat(n, value)` | `repeat(12, 1fr)`, `repeat(9, 1fr)`, `repeat(3, ...)` | Shorthand to repeat a column/row definition n times |
| `minmax(min, max)` | `minmax(70px, 1fr)` | Sets a floor and ceiling for column size |
| Dot notation in `grid-template-areas` | `".... head ...."` | Creates empty/unnamed cells in a named-areas grid |
| Spanning across named areas | `"tech tech"`, `"nasa nasa nasa"` (repeated area name) | Makes one item occupy multiple columns or rows |
| Nested grid (`main` inside `body`) | `main { display: grid }` | A grid item that is also a grid container |
| `height: 100%` on `article` | `.article` | Makes each card fill the full height of its grid cell |
| `filter: brightness(0.9)` | `a:hover, a:focus` | Darkens the entire card (image + text) on hover/focus |
| `box-shadow` as a focus ring | `a:focus` | Adds a second coloured halo outside the `outline` |
| `transition` on focus | `a:focus` | Animates the outline and box-shadow appearance smoothly |
| Variable font weight range | `Manrope:wght@200..800` | Loads a variable font supporting any weight between 200 and 800 |
| `border-top-left-radius`, `border-top-right-radius` | `img` | Rounds only the top two corners of card images |
| `box-sizing: border-box` (on `.article-header` only) | `.article-header` | Applied selectively rather than via universal reset |
| `lang="en"` on `<html>` | `<html lang="en">` | Declares the document language for screen readers and search engines |
| `<article>` semantic element | Five article cards | Marks self-contained content that could stand alone (a news article) |

## Concepts Carried Over from Previous Projects ↩

| Concept | Used Again In |
|---------|--------------|
| `<meta name="viewport">` | `<head>` — identical to all previous projects |
| `@media (min-width: ...)` | Two breakpoints: 500px and 870px |
| `rem` and `em` units | Typography, padding, border-radius |
| `width: 100%` on images | `img { width: 100% }` |
| `text-transform: uppercase` | `h2` category labels |
| `letter-spacing` | `h1`, `h2`, `h3` |
| `font-weight` | `h3 { font-weight: 500 }` |
| `text-decoration: none` | `a { text-decoration: none }` |
| `border-radius` | `article`, `img` corners |
| `background-color` | `article { background-color: #e5e5e5 }` |
| `margin: 0` | Heading resets throughout |
| `gap` | Already seen in Flexbox; now used in Grid |
| `aria-label` | On `<a>` wrappers — same accessibility pattern as `<input>` labels |
| Google Fonts CDN | `<link>` — Manrope + Source Code Pro |

---

# 4. CSS Grid vs Flexbox — When to Use Which

CSS Grid and Flexbox are both CSS layout tools, but they solve different problems:

| Dimension | Flexbox | CSS Grid |
|-----------|---------|---------|
| Works in | **One dimension** — either row or column | **Two dimensions** — rows AND columns simultaneously |
| Children flow | Along a single axis | Placed into a 2D grid of rows and columns |
| Layout is defined by | Children (each item sizes itself) | Parent (container defines the grid; children are placed into it) |
| Best for | Navigation bars, toolbars, centring, button groups | Page layouts, card grids, magazine layouts, dashboards |
| Item spanning | Limited (requires nesting) | Native — `grid-column`, `grid-row`, or named areas |

In this project:
- **CSS Grid** powers `body` (page-level layout) and `main` (the article card grid) — two-dimensional placement is needed
- **Flexbox** is not used at all — everything is Grid

> **The rule of thumb:** Use Flexbox when you have a row or column of items that need to size and space themselves. Use Grid when you have a defined 2D layout that items need to be placed into.

---

# 5. CSS Grid Fundamentals

## 5.1 `display: grid`

```css
body {
    display: grid;
}

main {
    display: grid;
}
```

`display: grid` turns an element into a **grid container**. Its direct children become **grid items** — they can now be placed into rows and columns defined by the container. Elements deeper than direct children are unaffected.

| Value | Effect |
|-------|--------|
| `display: grid` | Block-level grid container |
| `display: inline-grid` | Inline-level grid container |

## 5.2 `grid-template-columns`

```css
body {
    grid-template-columns: 1em 1fr 1em;
}

main {
    grid-template-columns: 1fr;          /* mobile: 1 column */
}

@media (min-width: 500px) {
    main {
        grid-template-columns: 1fr 1fr;  /* tablet: 2 equal columns */
    }
}

@media (min-width: 870px) {
    main {
        grid-template-columns: repeat(9, 1fr) repeat(3, minmax(70px, 1fr));
    }
}
```

`grid-template-columns` defines the **number and size of columns** in the grid. Each value represents one column track:

```
grid-template-columns: 1em 1fr 1em;
                        ↑    ↑   ↑
                   col 1  col 2  col 3
                   (1em)  (flex) (1em)
```

The number of values determines the number of columns. You can mix units freely — `px`, `em`, `%`, `fr`, `auto`, `minmax()`, `repeat()`.

## 5.3 The `fr` Unit

```css
grid-template-columns: 1em 1fr 1em;
grid-template-columns: 1fr 1fr;
grid-template-columns: repeat(12, 1fr);
```

`fr` stands for **fractional unit** — it represents a fraction of the **available free space** in the grid container, after fixed-size columns have been subtracted.

```
grid-template-columns: 1em 1fr 1em;
Container width: 900px
Fixed columns:   1em + 1em = 32px (at 16px root)
Free space:      900px - 32px = 868px
1fr =            868px → middle column gets all remaining space
```

```
grid-template-columns: 1fr 1fr;
Container width: 600px
Free space:      600px (no fixed columns)
1fr each =       300px → two equal columns
```

| Distribution | Columns | Each column |
|-------------|---------|------------|
| `1fr 1fr` | 2 equal | 50% each |
| `1fr 2fr` | 2 unequal | 33% + 67% |
| `1fr 1fr 1fr` | 3 equal | 33.3% each |
| `repeat(12, 1fr)` | 12 equal | 8.33% each |

> `fr` is unique to CSS Grid — there is no equivalent in Flexbox. It is more powerful than `%` because it accounts for `gap` spacing first, then divides the remaining space.

## 5.4 `gap` on Grid Containers

```css
body {
    gap: 1em 0;   /* row-gap: 1em, column-gap: 0 */
}

main {
    gap: 1em;     /* row-gap: 1em, column-gap: 1em */
}
```

`gap` (formerly `grid-gap`) sets the spacing between grid rows and columns. It is **not** added outside the grid — only between tracks.

| Syntax | Meaning |
|--------|---------|
| `gap: 1em` | `row-gap: 1em` AND `column-gap: 1em` |
| `gap: 1em 0` | `row-gap: 1em` AND `column-gap: 0` |
| `row-gap: 1em` | Only between rows |
| `column-gap: 20px` | Only between columns |

In `body`, `gap: 1em 0` adds `1em` of space between the header, main, and footer rows, but zero space between the three columns (the gutters are handled by the fixed `1em` columns themselves, not gap).

## 5.5 Implicit Rows

```css
body {
    grid-template-columns: 1em 1fr 1em;
    grid-template-areas:
        ".... .... ...."
        ".... head ...."
        ".... main ...."
        ".... foot ...."
        ".... .... ....";
}
```

The five area strings define five **explicit rows**. CSS Grid can also create **implicit rows** — extra rows added automatically when items overflow the defined rows. In the body grid, the five rows are fully explicit (defined in `grid-template-areas`).

In `main`, the implicit row creation is relied upon — columns are defined but rows are not: the grid adds rows automatically as needed to accommodate items.

---

# 6. `grid-template-areas` — Named Area Placement

## 6.1 Defining areas on the container

```css
body {
    grid-template-columns: 1em 1fr 1em;
    grid-template-areas:
        ".... .... ...."
        ".... head ...."
        ".... main ...."
        ".... foot ...."
        ".... .... ....";
}
```

`grid-template-areas` paints the grid visually with names. Each string in the value is a **row**. Each word in a string is a **cell** in that row — one word per column track. The layout is immediately readable: the grid is 3 columns × 5 rows, with `head`, `main`, and `foot` in the centre column of rows 2, 3, and 4.

```css
main {
    grid-template-areas:
        "tech"
        "envi"
        "nasa"
        "phys"
        "heal";
}
```

On mobile, `main` is a 1-column grid with 5 rows — one named area per row.

**Rules for `grid-template-areas`:**
- Each string represents one row
- Each word represents one cell — the number of words per string must equal the number of column tracks
- The same name repeated across adjacent cells causes that item to span those cells
- Dots (`.` or `....`) create unnamed/empty cells

## 6.2 `grid-area` on children

```css
.site-header { grid-area: head; }
footer       { grid-area: foot; }
main         { grid-area: main; }

.technology  { grid-area: tech; }
.environment { grid-area: envi; }
.nasa        { grid-area: nasa; }
.physics     { grid-area: phys; }
.health      { grid-area: heal; }
```

`grid-area: name` assigns a grid item to a named region defined by `grid-template-areas`. The name must exactly match one of the strings used in the parent's `grid-template-areas`.

> The names do not need to be the full class name. `tech`, `envi`, `nasa`, `phys`, `heal`, `head`, `main`, `foot` are short, unique, and memorable — ideal named area identifiers.

## 6.3 Dot notation for empty cells

```css
grid-template-areas:
    ".... .... ...."
    ".... head ...."
    ".... main ...."
    ".... foot ...."
    ".... .... ....";
```

In `grid-template-areas`, a **dot** (or any number of consecutive dots forming a single token with no spaces) represents an **empty, unnamed cell**. Nothing is placed there; the cell exists only as whitespace.

Here, the first and last rows are entirely dots — they create empty rows above the header and below the footer. Because `gap: 1em 0` is set on `body`, the `1em` gap applies between these empty rows and their neighbours — effectively adding `1em` of top and bottom margin to the page content without using `margin` at all.

The left and right columns of every row are also dots — they are the `1em` fixed-width gutters created by `grid-template-columns: 1em 1fr 1em`.

## 6.4 Why named areas beat line numbers

CSS Grid also allows placement by **grid line numbers**:

```css
/* Line-number placement — less readable */
.technology {
    grid-column: 1 / 7;
    grid-row: 1 / 2;
}
```

Named areas are preferred because:
- The template map is readable at a glance — you can see the entire layout in one block
- Changing a layout only requires updating the `grid-template-areas` string, not every item's line numbers
- Names are self-documenting (`tech`, `nasa`) vs line numbers (`1 / 7`) which require counting
- DevTools displays named areas visually in the grid overlay

---

# 7. The Body Grid — Page-Level Layout

## 7.1 3-column grid for horizontal margins

```css
body {
    display: grid;
    grid-template-columns: 1em 1fr 1em;
    grid-template-areas:
        ".... .... ...."
        ".... head ...."
        ".... main ...."
        ".... foot ...."
        ".... .... ....";
    gap: 1em 0;
}
```

The body uses a **3-column grid** — not to create a 3-column layout, but to create gutters:

```
Column 1: 1em  │  Column 2: 1fr  │  Column 3: 1em
(left gutter)  │  (content)      │  (right gutter)
```

The header, main, and footer are all placed in **Column 2** (`1fr`) via `grid-area`. The left and right `1em` columns are always empty — they act as permanent horizontal margin without using `margin-left` / `margin-right` or `padding`.

This is the **"gutter columns"** technique — a CSS Grid pattern for creating consistent horizontal breathing room at the page level.

## 7.2 Empty rows via `gap` for vertical margins

```css
gap: 1em 0;

grid-template-areas:
    ".... .... ...."   ← row 1: empty (auto height ≈ 0)
    ".... head ...."   ← row 2: header
    ".... main ...."   ← row 3: main
    ".... foot ...."   ← row 4: footer
    ".... .... ....";  ← row 5: empty (auto height ≈ 0)
```

The first and last rows have only dots — they are empty rows with no content. Rows with no content have `height: auto` which resolves to approximately zero. But `gap: 1em 0` adds `1em` of space between **every** row — including between the empty rows and their neighbours. This creates `1em` of space above the header and below the footer.

```
Row 1 (empty, ~0px)
--- gap: 1em ---
Row 2 (header)
--- gap: 1em ---
Row 3 (main)
--- gap: 1em ---
Row 4 (footer)
--- gap: 1em ---
Row 5 (empty, ~0px)
```

The result: `1em` of space surrounds the entire content area on all four sides — without a single `margin` or `padding` declaration on any of those elements.

## 7.3 Why not use `margin` or `padding`?

The challenge specification states: *"You do NOT need to use the `margin` property to complete this challenge."* This is an intentional exercise in thinking with Grid rather than defaulting to box model properties. The Grid approach:

- Keeps spacing logic centralised in the container
- Works regardless of the number of children
- Demonstrates that `gap` + empty tracks can replace edge spacing completely

In production, using `padding` on `body` is perfectly valid and simpler. The Grid approach is used here as an educational demonstration.

---

# 8. The Main Grid — Article Card Layout

`main` is both a **grid item** (placed in the body grid via `grid-area: main`) and a **grid container** (it has its own `display: grid` with its own columns and template areas). This is **nested grid**.

## 8.1 Mobile: 1-column stack (base)

```css
main {
    grid-area: main;
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr;
    grid-template-areas:
        "tech"
        "envi"
        "nasa"
        "phys"
        "heal";
}
```

One column, five rows — all cards stack vertically. This is the base style, applied to all screen sizes and overridden at wider breakpoints.

```
Mobile:
┌────────────────┐
│   technology   │
├────────────────┤
│  environment   │
├────────────────┤
│      nasa      │
├────────────────┤
│    physics     │
├────────────────┤
│     health     │
└────────────────┘
```

## 8.2 Tablet: 2-column with spanning (500px)

```css
@media (min-width: 500px) {
    main {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
            "tech tech"
            "envi nasa"
            "phys nasa"
            "heal heal";
    }
}
```

Two equal columns. Four named-area rows:

| Row | Left column | Right column |
|-----|------------|-------------|
| 1 | `tech` | `tech` — spans both columns |
| 2 | `envi` | `nasa` — starts here |
| 3 | `phys` | `nasa` — continues (spans rows 2–3) |
| 4 | `heal` | `heal` — spans both columns |

```
Tablet:
┌───────────────────────────────┐
│         technology            │  ← spans 2 cols
├──────────────┬────────────────┤
│ environment  │                │
├──────────────┤      nasa      │  ← spans 2 rows
│   physics    │                │
├──────────────┴────────────────┤
│            health             │  ← spans 2 cols
└───────────────────────────────┘
```

## 8.3 Desktop: 12-column magazine grid (870px)

```css
@media (min-width: 870px) {
    main {
        grid-template-columns: repeat(9, 1fr) repeat(3, minmax(70px, 1fr));
        grid-template-areas:
            "tech tech tech tech tech tech envi envi envi nasa nasa nasa"
            "phys phys phys heal heal heal heal heal heal nasa nasa nasa";
    }
}
```

12 columns. Two rows. The named area strings define every cell:

| Area | Columns occupied | Row(s) |
|------|-----------------|--------|
| `tech` | 1–6 (6 columns) | Row 1 |
| `envi` | 7–9 (3 columns) | Row 1 |
| `nasa` | 10–12 (3 columns) | Rows 1–2 (spans both) |
| `phys` | 1–3 (3 columns) | Row 2 |
| `heal` | 4–9 (6 columns) | Row 2 |

```
Desktop (12 columns):
┌──────────────────────┬──────────┬────────┐
│                      │          │        │
│      technology      │  environ │  nasa  │
│       (6 cols)       │  (3 col) │        │
│                      │          │ (spans │
├────────┬─────────────┤          │  both  │
│        │             │          │  rows) │
│physics │   health    │          │        │
│(3 col) │   (6 cols)  │          │        │
└────────┴─────────────┴──────────┴────────┘
```

---

# 9. Spanning — Making Items Cross Multiple Columns or Rows

## 9.1 Spanning with `grid-template-areas`

When the same name appears in **adjacent cells** of `grid-template-areas`, the item assigned that name spans all of those cells:

```css
grid-template-areas:
    "tech tech"   ← "tech" appears in col 1 and col 2 of row 1
    "envi nasa"
    "phys nasa"   ← "nasa" appears in col 2 of row 2 AND row 3
    "heal heal";
```

- `"tech tech"` → the technology card spans **columns 1–2** of row 1 (2-column span)
- `"nasa"` in rows 2 and 3 → the nasa card spans **rows 2–3** in column 2 (2-row span)

This is equivalent to the longhand:
```css
/* Equivalent using line numbers — more verbose */
.technology { grid-column: 1 / 3; grid-row: 1; }
.nasa       { grid-column: 2; grid-row: 2 / 4; }
```

Named areas express the same placement far more readably.

## 9.2 The `nasa` card — spanning two rows

The NASA asteroid article is the most visually prominent on tablet and desktop — it occupies a tall column on the right side of the grid, spanning two rows. This gives it extra visual weight appropriate for a major science story.

**Key constraint:** In `grid-template-areas`, a spanning area **must be rectangular**. You cannot create an L-shaped or non-rectangular area by naming cells diagonally — the browser will ignore the invalid area and fall back to auto-placement.

---

# 10. `repeat()` — The Grid Column Shorthand

## 10.1 `repeat(n, value)`

```css
grid-template-columns: repeat(12, 1fr);
```

`repeat(count, track)` is a function that repeats a column (or row) track definition `count` times. It is shorthand — the above is identical to:

```css
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
```

## 10.2 `repeat(12, 1fr)`

The first line of the desktop `grid-template-columns` uses `repeat(12, 1fr)` — twelve equal flexible columns:

```css
/* First declaration — overridden by the second on the same property */
grid-template-columns: repeat(12, 1fr);
/* Second declaration — this one actually applies */
grid-template-columns: repeat(9, 1fr) repeat(3, minmax(70px, 1fr));
```

> **Note:** In the CSS, `grid-template-columns` is declared **twice** in the same rule. In CSS, when a property is declared twice, the **last declaration wins** (cascade). The `repeat(12, 1fr)` line is overridden by the `repeat(9, 1fr) repeat(3, minmax(70px, 1fr))` line below it. The first line is effectively dead code — likely a refactoring artifact left from an intermediate development step.

## 10.3 Mixed `repeat` — `repeat(9, 1fr) repeat(3, minmax(...))`

```css
grid-template-columns: repeat(9, 1fr) repeat(3, minmax(70px, 1fr));
```

This defines 12 columns in two groups:
- **Columns 1–9**: `repeat(9, 1fr)` — nine equal flexible columns
- **Columns 10–12**: `repeat(3, minmax(70px, 1fr))` — three flexible columns that never shrink below `70px`

In the current `grid-template-areas`, all 12 columns are used but none of the named areas land exclusively in columns 10–12 — the `nasa` area occupies columns 10–12 across both rows. The `minmax(70px, 1fr)` prevents the NASA column from collapsing below 70px on very wide or narrow-ish screens.

`repeat()` can also be used for rows:
```css
grid-template-rows: repeat(3, 200px);
```

---

# 11. `minmax()` — Flexible Column Sizing

## 11.1 `minmax(min, max)`

```css
grid-template-columns: repeat(3, minmax(70px, 1fr));
```

`minmax(min, max)` defines a size range for a column (or row) track:

| Part | Value | Meaning |
|------|-------|---------|
| `min` | `70px` | The column can never be smaller than `70px` |
| `max` | `1fr` | The column grows to fill its fair share of remaining space |

The column is flexible (`1fr`) when space is abundant, but clamps to `70px` when space is tight.

## 11.2 `minmax(70px, 1fr)` in context

At the desktop breakpoint, the NASA article occupies three columns defined by `minmax(70px, 1fr)`. The content of the NASA article (a large image and headline) ensures the column grows well beyond 70px in practice. The `70px` minimum is a safety floor — it prevents the column from collapsing entirely if the grid container becomes very narrow.

| `minmax` argument | Allowed values |
|-------------------|---------------|
| `min` | Any length, `auto`, `min-content`, `max-content` |
| `max` | Any length, `fr`, `auto`, `min-content`, `max-content` |

Common patterns:

```css
minmax(200px, 1fr)     /* at least 200px, grows to fill */
minmax(0, 1fr)         /* standard fr — no minimum, grows to fill */
minmax(auto, 1fr)      /* minimum is content size, grows to fill */
```

> `minmax` is the foundation of `auto-fit` / `auto-fill` responsive grid patterns:
> ```css
> grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
> ```
> This creates as many columns as fit, each at least `250px`, all growing to fill. Not used in this project but a key pattern in production work.

---

# 12. Nested Grids — `main` inside `body`

```css
/* body is a grid container */
body {
    display: grid;
    grid-template-columns: 1em 1fr 1em;
    grid-template-areas: ".... .... ...."
                         ".... head ...."
                         ".... main ...."
                         ".... foot ...."
                         ".... .... ....";
}

/* main is both a grid ITEM (placed in body's grid)
   and a grid CONTAINER (defines its own grid for articles) */
main {
    grid-area: main;    /* ← grid item: placed in body's "main" area */
    display: grid;      /* ← grid container: articles placed in main's grid */
    gap: 1em;
    grid-template-columns: 1fr;
    grid-template-areas:
        "tech"
        "envi"
        "nasa"
        "phys"
        "heal";
}
```

CSS Grid containers can be nested to any depth. `main` is simultaneously:
1. A **grid item** of `body` — placed in the `main` named area of the body's 3-column grid
2. A **grid container** for the five article links — defining its own 1/2/12-column grid

The two grids are completely independent — changing columns in `body` does not affect `main`'s grid, and vice versa. This is what makes large page layouts manageable: each section has its own grid context.

---

# 13. `height: 100%` on Article Cards

```css
article {
    border-radius: 0.2em;
    background-color: #e5e5e5;
    height: 100%;
}
```

`height: 100%` on `article` makes each card fill the **full height of its grid cell**. This is critical for the NASA article on tablet and desktop — it spans two rows, and its `<article>` must fill the entire tall cell, not just shrink to the height of its text content.

Without `height: 100%`:
```
┌─────────┐
│ [image] │         ← .nasa article, short content
│ [text]  │
│         │         ← empty space at the bottom of the tall grid cell
└─────────┘
```

With `height: 100%`:
```
┌─────────┐
│ [image] │         ← .nasa article, fills cell height
│ [text]  │
│         │         ← background-color fills the remaining height
│         │
└─────────┘
```

> In a grid or flex container, `height: 100%` on a child works without the parent needing an explicit `height` — the grid cell itself acts as the reference for 100%.

---

# 14. `filter: brightness()` — Hover and Focus Effects

```css
a:hover, a:focus {
    filter: brightness(0.9);
}
```

`filter: brightness(value)` applies a brightness adjustment to the **entire element and all its children** — including images, backgrounds, text, and borders. A value below `1` darkens; above `1` brightens.

| Value | Effect |
|-------|--------|
| `1` | No change (default) |
| `0.9` | 10% darker |
| `0.5` | 50% darker — very noticeable |
| `1.2` | 20% brighter |
| `0` | Completely black |

`filter: brightness(0.9)` on hover provides a subtle darkening of the entire card — image and text together — that feels like a natural press/hover feedback without needing to change `background-color`, `opacity`, or individual child colours. It is a single rule that affects the whole card.

> `filter` is a compositing property — it creates a new stacking context and is applied after the element is rendered. It affects everything painted by the element, making it ideal for card hover effects where you want uniform darkening.

---

# 15. Focus Styling — `outline` + `box-shadow` Combo

## 15.1 `outline`

```css
a:focus {
    outline: 3px solid #5a5a5a;
    box-shadow: 0 0 0 3px rgba(135, 18, 113, 0.5);
    transition: outline 0.2s ease, box-shadow 0.2s ease;
}
```

`outline` is a line drawn **outside** the element's border box — it does not affect layout (unlike `border`). It is the primary accessibility focus indicator for keyboard navigation.

```
border-box
  └── margin
outline (drawn outside border-box, does not affect layout)
```

Here `outline: 3px solid #5a5a5a` provides a 3px dark grey ring around the focused card.

## 15.2 `box-shadow` as a second ring

```css
box-shadow: 0 0 0 3px rgba(135, 18, 113, 0.5);
```

This `box-shadow` has all zero offsets and zero blur — it acts as a **solid ring** 3px wide around the element, outside the border box. Combined with the `outline`, it creates a **double-ring focus indicator**:

```
[element border box]
[outline: 3px solid grey]    ← first ring
[box-shadow: 3px purple]     ← second ring, semi-transparent
```

The semi-transparent purple (`rgba(135, 18, 113, 0.5)`) adds brand colour to the focus state without completely obscuring what is behind it. This dual-ring technique provides excellent visibility on all background colours — if one ring is hard to see, the other provides contrast.

> This is a best-practice accessible focus pattern — it meets WCAG 2.1 AA requirements for focus indicator visibility.

## 15.3 `transition` on focus

```css
a:focus {
    transition: outline 0.2s ease, box-shadow 0.2s ease;
}
```

`transition` animates the change from the non-focused state to the focused state. `outline 0.2s ease` means the outline takes 0.2 seconds to appear using an `ease` timing curve. Combined with `box-shadow 0.2s ease`, the double-ring focus indicator fades in smoothly rather than appearing instantly.

> **Note:** Placing `transition` on `:focus` rather than the base `a` selector means the animation only applies when gaining focus — losing focus is instant. For a smooth bidirectional transition, place `transition` on the base `a` rule. Here the one-way animation is a deliberate design choice.

---

# 16. Variable Font Weight — `font-weight` Range

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800
            &family=Source+Code+Pro:ital,wght@0,200..900;1,200..900
            &display=swap" rel="stylesheet">
```

`wght@200..800` loads **Manrope as a variable font** — a single font file that supports any weight between 200 and 800, rather than separate files for each weight.

| Traditional (static) fonts | Variable fonts |
|---------------------------|---------------|
| One file per weight: `400`, `700`, etc. | One file covers a continuous range |
| `font-weight: 500` rounds to nearest | `font-weight: 500` is exactly 500 |
| Multiple HTTP requests | Single HTTP request |
| `wght@400;700` | `wght@200..800` |

**Source Code Pro** (`ital,wght@0,200..900;1,200..900`) loads:
- Regular (italic `0`) weights 200–900
- Italic (italic `1`) weights 200–900

In `index.css`, `h1` uses `font-family: "Source Code Pro"` — a monospace variable font, appropriate for the `SciStream` logo which mimics a code/terminal aesthetic.

---

# 17. `font-family: "Source Code Pro"` on the Header

```css
h1 {
    font-family: "Source Code Pro", sans-serif;
    letter-spacing: 0.04em;
    color: #0F0F0F;
    margin: 0;
    padding: 0;
}
```

`Source Code Pro` is a **monospace** font — every character occupies the same horizontal width, mimicking the output of a terminal or code editor. Used on the `SciStream` heading, it gives the brand name a technical, scientific appearance — appropriate for a science news site.

The rest of the page uses `Manrope` (a geometric sans-serif) for body content. Using two contrasting fonts — a monospace for the brand name and a humanist sans-serif for content — creates typographic hierarchy without needing different sizes or colours.

`letter-spacing: 0.04em` adds a subtle open tracking to the heading, which improves legibility for all-caps or title-case text at large sizes.

---

# 18. Wrapping `<article>` in `<a>` — Clickable Cards

```html
<a href="/crystals-stabilise-quantum-computers.html"
   class="technology"
   aria-label="Discover how crystals stabilize time in quantum computers">
    <article>
        <img src="images/crystals.jpg" alt="An AI rendering of crystals in a quantum computer">
        <header class="article-header">
            <h2>Technology</h2>
            <h3>Crystals used to stabilise time in quantum computers</h3>
        </header>
    </article>
</a>
```

The `<a>` wraps the entire `<article>` — making the whole card clickable with a single anchor. The `grid-area` class (`class="technology"`) is placed on the `<a>`, not the `<article>`, because the `<a>` is the **direct child of `main`** (the grid container). Grid items must be direct children of the grid container to be placed by `grid-area`.

## 18.1 `aria-label` on the link

```html
aria-label="Discover how crystals stabilize time in quantum computers"
```

A screen reader navigating by links would announce each `<a>` element. Without `aria-label`, it would read the full text content of the card — including the category (`h2`) and headline (`h3`). With `aria-label`, it announces a clean, purpose-written description of the link's destination — a better experience than synthesising the content of the card.

> `aria-label` on the `<a>` **overrides** all text content within the link for screen readers. The `<h2>` and `<h3>` text is still visible; only the announced link name changes.

## 18.2 `text-decoration: none`

```css
a {
    text-decoration: none;
}
```

Removes the browser's default blue underline from all links. Since the cards are fully styled as visual cards (not inline text links), an underline would look wrong. The hover state (`filter: brightness(0.9)`) and focus state (outline + box-shadow) provide sufficient interactivity feedback in place of the underline.

---

# 19. `border-top-left-radius` and `border-top-right-radius`

```css
img {
    width: 100%;
    border-top-left-radius: 0.2em;
    border-top-right-radius: 0.2em;
}

article {
    border-radius: 0.2em;
}
```

`article` has `border-radius: 0.2em` — rounding all four corners. The image sits at the top of the card, flush with the card's corners. Without rounding the image's top corners, the square image corners would overflow the rounded card corners:

```
Without radius on img:
┌╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴┐    ← rounded article corner
█████████████████     ← image: square corner overflows
█████████████████
```

```
With border-top-*-radius on img:
╭───────────────╮     ← rounded article corner
█████████████████     ← image: also rounded top corners — flush
█████████████████
```

`border-top-left-radius` and `border-top-right-radius` are the **longhand** individual corner properties. They are used instead of `border-radius: 0.2em 0.2em 0 0` (which would also work) because targeting individual corners with longhands is explicit and easy to read.

---

# 20. `lang="en"` on `<html>`

```html
<html lang="en">
```

The `lang` attribute declares the **natural language** of the document's content. Screen readers use it to select the correct pronunciation rules. Search engines use it for language-specific ranking. Browsers may use it for automatic hyphenation.

| Without `lang` | With `lang="en"` |
|----------------|-----------------|
| Screen reader guesses language | Screen reader uses English pronunciation rules |
| Hyphenation may not work | CSS `hyphens: auto` works correctly |
| SEO slightly disadvantaged | Language-specific search ranking applied |

Every HTML document should declare `lang`. This project includes it; the previous two Responsive Design projects omit it — a gap this project corrects.

---

# 21. CSS Concepts Reinforced

| Concept | How it is used here |
|---------|-------------------|
| `margin: 0` on headings | `h1`, `h2`, `h3`, `p` — removes browser default heading margins |
| `padding: 0` on body/html | Combined with `margin: 0` — full browser reset |
| `width: 100%` on `img` | All images fill their container width |
| `text-transform: uppercase` | `h2` category labels — same pattern as Product Page |
| `letter-spacing` | `h1` (0.04em), `h2` (0.065em), `h3` (0.03em) — three levels of tracking |
| `font-weight: 500` | `h3` — medium weight for article headlines |
| `border-radius: 0.2em` | `article` — subtle rounding on all four card corners |
| `text-decoration: none` | `a` — removes link underline on card anchors |
| `box-sizing: border-box` | Only on `.article-header` — not via universal reset here |
| `gap: 1em` | `main` — consistent spacing between all card cells |
| Variable font | Manrope and Source Code Pro loaded as variable fonts |

---

# 22. HTML Structure Recap

```
<!doctype html>
<html lang="en">
├── <head>
│   ├── <title>SciStream</title>
│   ├── <link> → index.css
│   ├── <link> → Google Fonts (Manrope + Source Code Pro, variable)
│   └── <meta name="viewport">
│
└── <body>                              ← body grid: 3 cols, 5 rows
    ├── <header class="site-header">    ← grid-area: head
    │   └── <h1>SciStream</h1>
    │
    ├── <main>                          ← grid-area: main (inner grid)
    │   ├── <a class="technology" aria-label="...">
    │   │   └── <article>
    │   │       ├── <img src="crystals.jpg" alt="...">
    │   │       └── <header class="article-header">
    │   │           ├── <h2>Technology</h2>
    │   │           └── <h3>Crystals used to stabilise time...</h3>
    │   │
    │   ├── <a class="environment" aria-label="...">
    │   │   └── <article> ... </article>
    │   │
    │   ├── <a class="nasa" aria-label="...">
    │   │   └── <article> ... </article>
    │   │
    │   ├── <a class="physics" aria-label="...">
    │   │   └── <article> ... </article>
    │   │
    │   └── <a class="health" aria-label="...">
    │       └── <article> ... </article>
    │
    └── <footer>                        ← grid-area: foot
        └── <p>© SciStream 2025</p>
```

### Semantic element choices

| Element | Why used |
|---------|---------|
| `<header class="site-header">` | Site-level header — the branding area |
| `<main>` | Primary content — the news feed |
| `<article>` | Each card is a self-contained piece of content that could stand independently (a news article) |
| `<header class="article-header">` | Heading group within each article — `<header>` can be used inside `<article>` |
| `<footer>` | Site footer — copyright information |

> **Two `<header>` elements:** HTML allows multiple `<header>` elements per page — one at the site level (`.site-header`) and one inside each `<article>` (`.article-header`). They serve different roles and are both semantically correct.

---

# 23. How the Layout Changes Across Three Breakpoints

```
Mobile (< 500px) — 1 column:
┌───────────────────────┐
│ SciStream              │  ← .site-header (grid-area: head)
├───────────────────────┤
│ [crystals.jpg]        │  ← .technology (grid-area: tech)
│ TECHNOLOGY            │
│ Crystals used to...   │
├───────────────────────┤
│ [plastics.jpg]        │  ← .environment
│ ENVIRONMENT           │
│ Enzymes eat...        │
├───────────────────────┤
│ [asteroid.jpg]        │  ← .nasa
│ NASA                  │
│ Samples collected...  │
├───────────────────────┤
│ [physics.jpg]         │  ← .physics
│ PHYSICS               │
│ Unified Theory...     │
├───────────────────────┤
│ [nano.jpg]            │  ← .health
│ HEALTH                │
│ Inhalable nano...     │
├───────────────────────┤
│ © SciStream 2025      │  ← footer (grid-area: foot)
└───────────────────────┘

Tablet (500px – 869px) — 2 columns:
┌───────────────────────────────────┐
│ SciStream                          │
├────────────────────────────────────┤
│       [crystals.jpg — wide]        │  ← tech: spans cols 1–2
│ TECHNOLOGY | Crystals used to...   │
├────────────────┬───────────────────┤
│ [plastics.jpg] │  [asteroid.jpg]   │  ← envi | nasa starts
│ ENVIRONMENT    │  NASA             │
│ Enzymes eat... │  Samples from...  │
├────────────────┤                   │  ← nasa continues (2-row span)
│ [physics.jpg]  │                   │
│ PHYSICS        │                   │
│ Unified Theory │                   │
├────────────────┴───────────────────┤
│         [nano.jpg — wide]          │  ← heal: spans cols 1–2
│ HEALTH | Inhalable nanoparticles   │
├────────────────────────────────────┤
│ © SciStream 2025                   │
└────────────────────────────────────┘

Desktop (≥ 870px) — 12 columns:
┌───────────────────────────────────────────────────────┐
│ SciStream                                              │
├──────────────────────────┬──────────────┬─────────────┤
│  [crystals.jpg — wide]   │[plastics.jpg]│[asteroid.jpg│
│  TECHNOLOGY              │ ENVIRONMENT  │  NASA       │
│  Crystals used to stab.. │ Enzymes eat..│  Samples    │
│  (cols 1–6)              │ (cols 7–9)   │  collected..│
├───────────────┬──────────┘              │ (cols 10-12,│
│[physics.jpg]  │  [nano.jpg — medium]    │  rows 1–2)  │
│ PHYSICS       │  HEALTH                 │             │
│ Unified Theory│  Inhalable nano...      │             │
│ (cols 1–3)    │  (cols 4–9)             │             │
├───────────────┴─────────────────────────┴─────────────┤
│ © SciStream 2025                                       │
└───────────────────────────────────────────────────────┘
```

---

# 24. How to Run

No JavaScript, no build step, no dependencies.

1. Clone the repository:
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder:
   ```bash
   cd "06. Responsive Design/03. CSS Grid"
   ```

3. Open `index.html` in your browser — no server required (no ES Modules).

**Things to try:**
- Open DevTools → **Layout** tab → enable the Grid overlay for `body` and `main` — see the named areas drawn directly on the page
- Resize the viewport and watch the layout shift at exactly 500px and 870px — the cards rearrange without any JavaScript
- In DevTools → **Elements**, click on `main` and inspect the grid in the overlay — count the 12 columns at desktop width
- Remove `height: 100%` from `article` in DevTools — watch the NASA card shrink to its content height on tablet, leaving a gap in the two-row span
- Remove `grid-template-areas` from `main` at the tablet breakpoint — watch items auto-place instead of following the named layout
- Tab through the cards with the keyboard — observe the double-ring (outline + box-shadow) focus indicator on each card
- Hover over a card — observe `filter: brightness(0.9)` subtly darken the entire card including its image
- In DevTools, change `gap: 1em 0` on `body` to `gap: 0` — watch the header and footer touch the edge of the viewport (the empty row technique loses its effect)

---

# 25. Course Reference

| Item | Detail |
|------|--------|
| Platform | [Scrimba](https://scrimba.com) |
| Course | Fullstack Web Development Path |
| Module | Responsive Design |
| Project number | 03 of the module |
| Key new concepts | `display: grid` · `grid-template-columns` · `fr` unit · `grid-template-areas` · `grid-area` · Dot notation for empty cells · Column and row spanning · `repeat()` · `minmax()` · Nested grids · `height: 100%` in grid · `filter: brightness()` · Double-ring focus indicator · Variable fonts |
| Previous project | [02. Build a Product Page](../02.%20Build%20a%20Product%20Page/README.md) |
| Next project | [04. Learning Journal — Solo Project](../04.%20Learning%20Journal/) |
| MDN — CSS Grid | [MDN — CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) |
| MDN — grid-template-areas | [MDN — grid-template-areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas) |
| MDN — repeat() | [MDN — repeat()](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat) |
| MDN — minmax() | [MDN — minmax()](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax) |
| MDN — filter | [MDN — filter](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) |
| CSS Tricks — Grid Guide | [A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) |

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *CSS Grid is not just another layout tool — it is the first system in CSS that was designed specifically for layout rather than adapted from something else. `grid-template-areas` is its most expressive feature: a visual map of your layout written directly in CSS. When you look at a `grid-template-areas` declaration, you see the layout. When you change it, the layout changes. No other CSS property gives you that level of direct control over two-dimensional space.*
