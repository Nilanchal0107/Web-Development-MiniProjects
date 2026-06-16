# Responsive Layouts — Responsive Design

![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-green?style=flat-square)
![Media Queries](https://img.shields.io/badge/Media%20Queries-min%2Fmax--width-teal?style=flat-square)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Roboto-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A satirical NFT landing page — the **first Responsive Design project** from **Scrimba's Fullstack Web Development Path**.

This README is a **complete concept revision guide**. Reading it top to bottom will revise every core CSS responsive design concept introduced in this module — relative units, fluid layouts, the container pattern, Flexbox wrapping, and media queries — comparing what is new here against all the HTML and CSS work covered in earlier folders.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is "Responsive Design"?](#3-what-is-responsive-design)
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [The Viewport Meta Tag](#5-the-viewport-meta-tag)
6. [Relative Units](#6-relative-units)
   - [rem — Root Em](#61-rem--root-em)
   - [em — Element Em](#62-em--element-em)
   - [% — Percentage](#63--percentage)
   - [When to use rem vs em vs %](#64-when-to-use-rem-vs-em-vs-)
7. [The Container Pattern](#7-the-container-pattern)
   - [width + max-width + margin: auto](#71-width--max-width--margin-auto)
   - [Why not just use a fixed width?](#72-why-not-just-use-a-fixed-width)
8. [Fluid Images](#8-fluid-images)
   - [width: 100% on images](#81-width-100-on-images)
   - [max-width on images](#82-max-width-on-images)
   - [display: block on images](#83-display-block-on-images)
9. [Flexible Flexbox — flex-wrap and flex shorthand](#9-flexible-flexbox--flex-wrap-and-flex-shorthand)
   - [flex-wrap: wrap](#91-flex-wrap-wrap)
   - [The flex shorthand — flex: 1 260px](#92-the-flex-shorthand--flex-1-260px)
   - [gap on flex containers](#93-gap-on-flex-containers)
10. [Media Queries](#10-media-queries)
    - [What is a media query?](#101-what-is-a-media-query)
    - [max-width: 767px — Mobile overrides](#102-max-width-767px--mobile-overrides)
    - [min-width: 768px — Desktop enhancements](#103-min-width-768px--desktop-enhancements)
    - [Mobile-first vs Desktop-first](#104-mobile-first-vs-desktop-first)
    - [Common breakpoints](#105-common-breakpoints)
11. [Navigation — Stacked on Mobile, Inline on Desktop](#11-navigation--stacked-on-mobile-inline-on-desktop)
    - [Mobile: block links + dotted dividers](#111-mobile-block-links--dotted-dividers)
    - [Desktop: flex row + spaced apart](#112-desktop-flex-row--spaced-apart)
    - [li:not(:last-child) — the :not() pseudo-class](#113-linot-last-child--the-not-pseudo-class)
12. [Buttons — Block on Mobile, Inline on Desktop](#12-buttons--block-on-mobile-inline-on-desktop)
13. [Typography Scaling with Media Queries](#13-typography-scaling-with-media-queries)
14. [CSS Concepts Reinforced](#14-css-concepts-reinforced)
    - [line-height](#141-line-height)
    - [text-decoration: underline dotted](#142-text-decoration-underline-dotted)
    - [border-radius](#143-border-radius)
    - [em-based padding on buttons](#144-em-based-padding-on-buttons)
    - [inherit](#145-inherit)
15. [HTML Structure Recap](#15-html-structure-recap)
    - [Semantic HTML elements](#151-semantic-html-elements)
    - [The viewport meta tag in head](#152-the-viewport-meta-tag-in-head)
16. [How the Layout Changes at the Breakpoint](#16-how-the-layout-changes-at-the-breakpoint)
17. [How to Run](#17-how-to-run)
18. [Course Reference](#18-course-reference)

---

# 1. Project Overview

"Wildly Expensive JPEGs" is a deliberately satirical NFT landing page. The page includes:

* A **fixed header** with a logo heading and navigation — stacks vertically on mobile, sits side-by-side on desktop
* A **hero section** with a product title, a large purple sneaker image, a subheading, a paragraph, and two call-to-action buttons — buttons stack (block) on mobile and sit inline on desktop
* A **feature section** with a dark purple background, two image+text cards that wrap naturally from a two-column layout on wide screens to a single-column stack on narrow screens
* A **footer** with a copyright line, centred in purple

The real goal is not the NFT satire — it is to learn how **fluid layouts** adapt to any screen width using relative units, the container pattern, fluid images, Flexbox wrapping, and two media query breakpoints.

---

# 2. Project Structure

```
06. Responsive Design/
│
└── 01. Responsive Layouts/
    ├── index.html      → Page structure: header, two sections, footer
    ├── index.css       → All styling: typography, layout, navigation, media queries
    └── images/
        ├── sneakers-purple.png   → Hero product image (large, fluid)
        ├── crypto-punk.jpg       → Feature card 1 image
        └── bag.svg               → Feature card 2 image (SVG)
```

No JavaScript. No build step. This is a pure HTML + CSS project — everything is achieved through CSS layout and media queries alone.

---

# 3. What is "Responsive Design"?

**Responsive design** means building a single HTML page whose layout, typography, and images adapt fluidly to any viewport width — from a 320px phone to a 4K monitor — without JavaScript or separate mobile/desktop sites.

The three pillars of responsive design are:

| Pillar | Tool | What it does |
|--------|------|-------------|
| **Fluid layouts** | Relative units (`%`, `rem`, `em`) + `max-width` | Elements resize proportionally instead of overflowing |
| **Flexible images** | `width: 100%` + `max-width` | Images shrink to fit their container without distortion |
| **Media queries** | `@media (min/max-width)` | Applies different CSS rules at specific viewport widths |

Before responsive design (pre-2010), developers built separate `m.example.com` sites for mobile. CSS media queries (introduced in CSS3, 2009) and the `<meta name="viewport">` tag made it possible to serve one codebase that looks correct everywhere.

---

# 4. What's New vs Previous Projects

This project introduces CSS layout techniques **not seen in the HTML/CSS Fundamentals, Accessible Development, Essential CSS, or Essential JavaScript folders**.

## New CSS Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `<meta name="viewport">` | `<head>` | Tells the mobile browser to use the device width, not a simulated desktop width |
| `rem` unit | All typography (`font-size`) | Scales relative to the root (`<html>`) font size — safe for accessibility |
| `em` unit | Padding, margin, spacing | Scales relative to the element's own font size — self-contained components |
| `%` unit | `.container { width: 90% }` | Fluid width relative to the parent element |
| `max-width` | `.container`, `.main-image` | Caps the maximum size to prevent layouts from becoming too wide |
| `.container` pattern | `<div class="container">` wraps content | Centres content and constrains it to a readable line length |
| `width: 100%` on `<img>` | `.main-image`, `.feature-image` | Makes images fill their container without overflowing |
| `flex-wrap: wrap` | `.section-two-image-container` | Allows flex items to wrap to the next row when space runs out |
| `flex: 1 260px` shorthand | `.feature-item` | Sets grow factor and minimum width simultaneously |
| `@media (max-width: 767px)` | Mobile-specific styles | Stacks nav, centres header, adds dividers |
| `@media (min-width: 768px)` | Desktop-specific styles | Switches nav and header to flex row, scales typography up |
| `li:not(:last-child)` | Mobile nav dividers | Applies a style to all list items except the last one |
| `display: inline-block` on `.btn` | Desktop media query | Allows multiple buttons to sit side-by-side |
| `text-decoration: underline dotted` | Body links | Accessible underline style without the solid default |
| `line-height` | `p` | Controls vertical spacing between lines of text |
| `inherit` | `.section-two h2` | Picks up the parent's `color` instead of the default |

## Concepts Carried Over from Earlier Modules ↩

| Concept | Used Again In |
|---------|--------------|
| `display: flex` | Header container, nav ul, section-two image container |
| `justify-content` | `header .container { justify-content: space-between }` |
| `align-items` | `header .container { align-items: center }` |
| `gap` | `.section-two-image-container { gap: 1em }` |
| `margin: 0 auto` | `.container`, `.main-image` — horizontal centring |
| `list-style-type: none` | `ul` reset — removes bullet points from nav |
| `padding: 0`, `margin: 0` | `ul` reset — removes browser default spacing |
| `border-radius` | `.btn`, `.feature-image` |
| `text-decoration: none` | `.btn` — removes underline from button-styled links |
| `display: block` | `.btn` on mobile, `.main-image`, nav `a` on mobile |
| `text-align: center` | Mobile header, footer |
| `background-color` | Header, section-two, button variants |
| `color` | Multiple — typography hierarchy |
| Google Fonts link | Roboto (same as Twimba, Cookie Consent) |

---

# 5. The Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

This single line of HTML is **the most important tag for responsive design**. Without it, mobile browsers (iOS Safari, Android Chrome) simulate a ~980px desktop viewport and then scale the entire page down — making everything look tiny and zoomed-out.

| Attribute | Value | Effect |
|-----------|-------|--------|
| `width` | `device-width` | Sets the viewport width to the physical screen width of the device |
| `initial-scale` | `1` | Sets the initial zoom level to 100% — no zoom applied on load |

With this tag, a 375px wide iPhone renders the page at exactly 375 CSS pixels wide — your `@media (max-width: 767px)` rules fire correctly and the mobile layout appears as designed.

> **Without** `<meta name="viewport">`: Mobile browser renders at ~980px, scales down → your media query at 767px never fires → mobile users see the desktop layout, tiny.
>
> **With** `<meta name="viewport">`: Mobile browser renders at device width (e.g. 375px) → your `max-width: 767px` media query fires → mobile layout appears correctly.

---

# 6. Relative Units

## 6.1 `rem` — Root Em

```css
h1 { font-size: 1.75rem; }   /* 1.75 × 16px = 28px (at default browser root) */
h2 { font-size: 1.375rem; }  /* 1.375 × 16px = 22px */
h3 { font-size: 1.25rem; }   /* 1.25 × 16px = 20px */
```

`rem` stands for **root em**. It is always relative to the `font-size` of the **`<html>` element** (the root). By default, browsers set `<html>` to `16px`.

| Value | Calculation | Result |
|-------|-------------|--------|
| `1rem` | `1 × 16px` | `16px` |
| `1.75rem` | `1.75 × 16px` | `28px` |
| `2.25rem` | `2.25 × 16px` | `36px` |

**Why use `rem` for font sizes instead of `px`?**

Users can change their browser's base font size in accessibility settings (e.g. to 20px for better readability). If you use `px`, your font sizes are fixed and ignore this preference. If you use `rem`, your font sizes scale proportionally with the user's setting — making your site more accessible.

```
User sets browser font size to 20px:
  1.75rem → 1.75 × 20px = 35px   (scales up correctly)
  28px    → always 28px          (ignores user preference — bad)
```

> **Do not set `html { font-size: px }`** — this defeats the purpose. Setting `html { font-size: 62.5% }` (making `1rem = 10px`) was a common pattern for arithmetic convenience but is now discouraged because it overrides the user's base preference.

## 6.2 `em` — Element Em

```css
.btn {
    padding: 0.5em 1em;    /* relative to the button's own font-size */
    margin-bottom: 1em;
}

nav a {
    padding: 0.85em 0;
}

header, section, footer {
    padding: 1.25em 0;
}
```

`em` is relative to the **font size of the element it is applied to** (or its nearest ancestor with a defined font size).

```
.btn { font-size: 1.125rem }  →  1.125rem × 16px = 18px
.btn { padding: 0.5em 1em }  →  0.5 × 18px = 9px top/bottom, 1 × 18px = 18px left/right
```

**Why use `em` for padding and margin on components?**

When the font size of a component changes (e.g. inside a media query), the padding changes proportionally — keeping the visual balance consistent without re-declaring padding values.

| Unit | Relative to | Best used for |
|------|------------|---------------|
| `rem` | Root `<html>` font-size | Font sizes, global spacing |
| `em` | Current element's font-size | Component-level padding, margin |
| `px` | Fixed pixels | Borders, fine detail (1px lines) |

## 6.3 `%` — Percentage

```css
.container {
    width: 90%;      /* 90% of the parent element's width */
    max-width: 800px;
}
```

`%` for `width` is always relative to the **parent element's width**. When the parent is `<body>` (which fills the viewport), `width: 90%` means the container is always 90% of the viewport width — fluid by nature.

| Parent width | `width: 90%` result |
|-------------|---------------------|
| 320px (mobile) | 288px |
| 768px (tablet) | 691px |
| 1200px (desktop) | 1080px → capped at 800px by `max-width` |

## 6.4 When to use `rem` vs `em` vs `%`

| Use case | Recommended unit | Reason |
|----------|-----------------|--------|
| `font-size` | `rem` | Consistent scaling from the root; respects user preferences |
| Component `padding` / `margin` | `em` | Scales with the component's own font-size |
| Container `width` | `%` | Fluid — adapts to parent/viewport width |
| Fixed visual details (borders) | `px` | Precise, doesn't need to scale |
| `max-width` | `px` or `rem` | Fixed cap on the maximum readable line length |

---

# 7. The Container Pattern

## 7.1 `width` + `max-width` + `margin: 0 auto`

```css
.container {
    width: 90%;
    max-width: 800px;
    margin: 0 auto;
}
```

This three-property combination is the **most fundamental responsive layout pattern**:

| Property | Value | Effect |
|----------|-------|--------|
| `width: 90%` | 90% of parent | Fluid — always 5% padding on each side |
| `max-width: 800px` | 800px cap | Prevents text from stretching too wide on large screens |
| `margin: 0 auto` | Auto horizontal margins | Centres the container in its parent |

```
Viewport: 320px   → container: 288px  (320 × 0.90) — max-width not reached
Viewport: 768px   → container: 691px  (768 × 0.90) — max-width not reached
Viewport: 1000px  → container: 800px  — max-width caps it
Viewport: 1440px  → container: 800px  — max-width caps it, centred by margin: auto
```

The result: on small screens the content fills nearly the full width with comfortable edge breathing room; on large screens the content stays centred in a readable column and never stretches ear-to-ear.

```
Small screen (320px):
┌─────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│  ← 90% wide
└─────────────────────────────────────┘

Large screen (1440px):
┌──────────────────────────────────────────────────────────────────┐
│          │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│          │  ← 800px, centred
└──────────────────────────────────────────────────────────────────┘
```

## 7.2 Why not just use a fixed width?

```css
/* ❌ Avoid — breaks on small screens */
.container {
    width: 800px;
}

/* ✅ Correct — fluid + capped */
.container {
    width: 90%;
    max-width: 800px;
    margin: 0 auto;
}
```

A fixed `width: 800px` on a 375px mobile screen causes **horizontal overflow** — the page is wider than the viewport and the user must scroll sideways. `width: 90%` + `max-width` solves both ends: narrow enough for mobile, readable on desktop.

---

# 8. Fluid Images

## 8.1 `width: 100%` on images

```css
.main-image {
    width: 100%;
    display: block;
    max-width: 640px;
    margin: 0 auto 2em;
}

.feature-image {
    width: 100%;
    border-radius: 4.6px;
}
```

`width: 100%` makes an image fill **100% of its containing element's width**. This is the single most important rule for responsive images — images with fixed pixel widths overflow their containers on small screens; `width: 100%` prevents this automatically.

> By default, images render at their **intrinsic size** (their actual pixel dimensions). A 1200px wide image on a 375px screen overflows by 825px. `width: 100%` constrains it to the container.

## 8.2 `max-width` on images

```css
.main-image {
    width: 100%;
    max-width: 640px;
}
```

Combining `width: 100%` and `max-width` mirrors the container pattern applied to images:
- On screens narrower than 640px → image fills the full container width
- On screens wider than 640px → image stops growing at 640px and stays centred

This prevents the hero sneaker from becoming comically large on a 4K monitor.

## 8.3 `display: block` on images

```css
.main-image {
    display: block;
    margin: 0 auto 2em;
}
```

`<img>` elements are `display: inline` by default — which means `margin: auto` does not centre them. Setting `display: block` makes the image a block-level element, allowing `margin: 0 auto` to centre it horizontally within its container.

> `display: block` also removes the small gap that `inline` elements have at their baseline — a common source of unexpected whitespace below images.

---

# 9. Flexible Flexbox — `flex-wrap` and `flex` shorthand

## 9.1 `flex-wrap: wrap`

```css
.section-two-image-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
}
```

By default, `display: flex` puts all children on a **single row** and shrinks them to fit — even if they become too narrow to be readable. `flex-wrap: wrap` allows children to **flow to the next row** when there is not enough space.

```
Wide screen (e.g. 800px):
┌────────────────────────────────────────┐
│  [feature-item 1]  │  [feature-item 2] │  ← side by side
└────────────────────────────────────────┘

Narrow screen (e.g. 400px):
┌──────────────────┐
│  [feature-item 1]│
├──────────────────┤
│  [feature-item 2]│  ← wrapped to next row
└──────────────────┘
```

`flex-wrap: wrap` is the CSS-only alternative to a media query for switching between single-column and multi-column layouts — the breakpoint is controlled entirely by the content's minimum width.

## 9.2 The `flex` shorthand — `flex: 1 260px`

```css
.feature-item {
    flex: 1 260px;
}
```

This two-value `flex` shorthand sets:

| Part | Property | Value | Meaning |
|------|----------|-------|---------|
| `1` | `flex-grow` | `1` | Grow equally to fill available space |
| `260px` | `flex-basis` | `260px` | Minimum content size before wrapping |

This is equivalent to:
```css
.feature-item {
    flex-grow: 1;
    flex-shrink: 1;   /* default */
    flex-basis: 260px;
}
```

**How it creates an automatic breakpoint:**

- Each `.feature-item` wants to be at least `260px` wide
- While the container is wide enough to fit two `260px` items (≥ ~540px including gap), they sit side-by-side
- When the container shrinks below that threshold, `flex-wrap: wrap` kicks in and the second item drops to the next row — both items then expand to fill the full row width via `flex-grow: 1`

> This is the **"Holy Grail" of responsive cards** — no media query needed, the layout adapts purely based on available space. It is equivalent in spirit to CSS Grid's `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`.

### Full `flex` Shorthand Reference

```css
flex: <flex-grow> <flex-shrink> <flex-basis>
flex: 1           1             0%            /* flex: 1 — common shortcut */
flex: 1 260px     /* grow: 1, shrink: 1 (default), basis: 260px */
flex: 0 0 200px   /* fixed 200px — no grow, no shrink */
```

## 9.3 `gap` on flex containers

```css
.section-two-image-container {
    gap: 1em;
}
```

`gap` adds space **between** flex (or grid) children without adding outer margins. Unlike `margin`, it does not create unwanted space at the edges of the container. Here `1em` (relative to the container's font-size) gives consistent gutters between the two feature cards on all screen sizes.

---

# 10. Media Queries

## 10.1 What is a media query?

A **media query** is a conditional CSS block that applies its rules only when a specific condition is true — typically a viewport width threshold (called a **breakpoint**).

```css
@media (condition) {
    /* CSS rules that only apply when condition is true */
}
```

In this project, two breakpoints divide the experience into mobile (`≤ 767px`) and desktop (`≥ 768px`):

```css
@media (max-width: 767px) { /* mobile-only styles */ }
@media (min-width: 768px) { /* desktop-only styles */ }
```

> **The CSS outside media queries** (the "base styles") apply to **all screen sizes**. Media queries only add or override specific properties.

## 10.2 `max-width: 767px` — Mobile overrides

```css
@media (max-width: 767px) {
    header {
        text-align: center;
    }

    nav {
        margin-top: 1.5em;
    }

    li:not(:last-child) {
        border-bottom: 1px dotted #a190b6;
    }
}
```

`max-width: 767px` means: *"apply these rules when the viewport is 767px wide or narrower."* This targets phones and small tablets.

| Rule | Effect |
|------|--------|
| `header { text-align: center }` | Centres the heading and nav on mobile |
| `nav { margin-top: 1.5em }` | Adds vertical breathing room between heading and nav links |
| `li:not(:last-child) { border-bottom: 1px dotted }` | Adds dividers between stacked nav items |

The mobile layout uses the **base styles** for layout — elements are block by default, so nav links stack and buttons stack without any explicit `display: block` needed in the query.

## 10.3 `min-width: 768px` — Desktop enhancements

```css
@media (min-width: 768px) {
    header, section, footer {
        padding: 2.875em 0;
    }

    header .container,
    nav ul {
        display: flex;
    }

    header .container {
        justify-content: space-between;
        align-items: center;
    }

    nav li {
        margin-left: 1.25em;
    }

    .btn {
        display: inline-block;
        margin-right: 0.5em;
    }

    h1 { font-size: 2.25rem; }
    h2 { font-size: 1.75rem; }
    .subheading { font-size: 1.25rem; }
    p  { font-size: 1.125rem; }
}
```

`min-width: 768px` means: *"apply these rules when the viewport is 768px wide or wider."* This targets tablets in landscape and desktop screens.

| Rule | Effect |
|------|--------|
| `padding: 2.875em` on sections | More generous vertical spacing on large screens |
| `header .container { display: flex }` | Puts heading and nav side-by-side in one row |
| `justify-content: space-between` | Pushes heading to the left, nav to the right |
| `align-items: center` | Vertically centres the heading and nav relative to each other |
| `nav ul { display: flex }` | Puts nav links in a horizontal row |
| `nav li { margin-left: 1.25em }` | Spaces nav items apart horizontally |
| `.btn { display: inline-block }` | Allows multiple buttons to sit side-by-side |
| Larger `font-size` values | Typography scales up for the wider reading distance |

## 10.4 Mobile-first vs Desktop-first

There are two philosophies for writing media queries:

| Approach | Base styles are for | Media queries use | Signal |
|----------|--------------------|--------------------|--------|
| **Mobile-first** | Mobile (smallest screens) | `min-width` to add desktop styles | `@media (min-width: 768px)` |
| **Desktop-first** | Desktop (largest screens) | `max-width` to strip down for mobile | `@media (max-width: 767px)` |

This project uses a **hybrid approach** — base styles serve both mobile and desktop, with one `max-width` query for mobile-only additions (nav dividers, centred header) and one `min-width` query for desktop-only additions (flex row navigation, larger type).

**Pure mobile-first** is generally recommended because:
- Mobile is often the majority of traffic
- Simpler to add complexity (desktop) than to remove it (mobile)
- Matches how browsers render: base styles first, enhancements layered on top
- `min-width` queries are generally cleaner to reason about

## 10.5 Common Breakpoints

| Breakpoint | Width | Targets |
|-----------|-------|---------|
| Small phones | `< 480px` | Older/smaller phones |
| Mobile | `< 768px` | Phones in portrait |
| Tablet | `768px – 1024px` | Tablets, phones in landscape |
| Desktop | `> 1024px` | Laptops and monitors |
| Wide desktop | `> 1200px` | Large monitors |

> Breakpoints should be chosen based on where your **content breaks** — not based on specific device sizes. Resize your browser window until the layout looks awkward; that is where to put a breakpoint.

---

# 11. Navigation — Stacked on Mobile, Inline on Desktop

## 11.1 Mobile: block links + dotted dividers

```css
/* Base styles — nav links are block-level */
nav a {
    color: #fff;
    text-decoration: none;
    font-size: 1.125rem;
    padding: 0.85em 0;
    display: block;  /* ← full-width tappable area */
}

/* Mobile-only: centre + add spacing + add dividers */
@media (max-width: 767px) {
    header {
        text-align: center;  /* ← centres nav links */
    }
    nav {
        margin-top: 1.5em;   /* ← space below heading */
    }
    li:not(:last-child) {
        border-bottom: 1px dotted #a190b6;  /* ← dividers between items */
    }
}
```

On mobile, each nav link is `display: block` — it fills the full row width and has generous vertical padding (`0.85em` top and bottom) creating a **large tap target** (important for touch usability). A `dotted` border below each item (except the last) visually separates them.

## 11.2 Desktop: flex row + spaced apart

```css
@media (min-width: 768px) {
    /* Make the header container a flex row */
    header .container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    /* Make the nav list a flex row */
    nav ul {
        display: flex;
    }

    /* Space items apart horizontally */
    nav li {
        margin-left: 1.25em;
    }
}
```

On desktop, `display: flex` on `nav ul` puts all `<li>` items in a horizontal row. The links keep their `display: block` — within a horizontal flex container, this gives each link its own block but they sit side-by-side because the flex container is horizontal. `margin-left: 1.25em` adds gutters between each link.

`header .container` becomes a flex row, with `justify-content: space-between` pushing the `<h1>` to the far left and the `<nav>` to the far right.

## 11.3 `li:not(:last-child)` — The `:not()` pseudo-class

```css
li:not(:last-child) {
    border-bottom: 1px dotted #a190b6;
}
```

`:not(selector)` is a **negation pseudo-class** — it matches elements that do **not** match the selector inside. Here it means: *"every `<li>` that is not the last child."*

The result: all nav list items have a bottom border except the last one, so there is no extra border at the very bottom of the list.

| Selector | Matches |
|----------|---------|
| `li` | All list items |
| `li:last-child` | Only the final list item |
| `li:not(:last-child)` | All list items **except** the final one |

Alternative — why not just `li { border-bottom: ... }`?

Adding a bottom border to all items creates a double border effect at the edges: border between items 1–2, 2–3, and then a border at the very bottom of the nav. `:not(:last-child)` elegantly avoids the last border without needing a separate `.no-border` class.

---

# 12. Buttons — Block on Mobile, Inline on Desktop

```css
/* Base — applies to all sizes */
.btn {
    font-size: 1.125rem;
    text-align: center;
    font-weight: 500;
    text-decoration: none;
    display: block;          /* ← full-width on mobile */
    padding: 0.5em 1em;
    margin-bottom: 1em;
    border-radius: 4.6px;
}

/* Desktop override */
@media (min-width: 768px) {
    .btn {
        display: inline-block;   /* ← sit side-by-side */
        margin-right: 0.5em;
    }
}
```

On mobile, buttons are `display: block` — they stretch the full container width and stack vertically, easy to tap. On desktop, `display: inline-block` allows multiple buttons to sit side-by-side (inline), separated by `margin-right: 0.5em`.

| Property | Mobile | Desktop |
|----------|--------|---------|
| `display` | `block` (full width) | `inline-block` (content width) |
| `margin-bottom` | `1em` (vertical spacing) | `1em` (kept for vertical rhythm) |
| `margin-right` | not set | `0.5em` (horizontal spacing) |

> **`display: inline-block` vs `display: inline`:** Inline elements cannot have `width`, `height`, top/bottom `padding` and `margin` applied meaningfully. `inline-block` combines the inline flow (sits in a line with other inline elements) with block characteristics (respects padding, margin, and width). For buttons, `inline-block` is the correct choice.

---

# 13. Typography Scaling with Media Queries

The base styles define mobile typography sizes in `rem`. The desktop media query scales them up:

| Element | Mobile | Desktop |
|---------|--------|---------|
| `h1` | `1.75rem` (28px) | `2.25rem` (36px) |
| `h2` | `1.375rem` (22px) | `1.75rem` (28px) |
| `h3` | `1.25rem` (20px) | unchanged |
| `.subheading` | `1rem` (16px) | `1.25rem` (20px) |
| `p` | browser default (16px) | `1.125rem` (18px) |

**Why scale type up for desktop?**

Screens are viewed from a greater distance on desktop than on mobile. A `16px` font that is comfortable reading distance on a handheld phone is too small when sitting two feet from a monitor. Increasing font sizes for desktop compensates for reading distance and makes better use of the wider screen.

This is a simple two-step typographic scale. In large projects, a **typographic scale** (e.g. using a modular scale ratio of 1.25 or 1.333) is used to calculate harmonious size steps across many heading levels.

---

# 14. CSS Concepts Reinforced

## 14.1 `line-height`

```css
p {
    line-height: 1.5;
}
```

`line-height` controls the vertical spacing between lines within a paragraph. A **unitless value** (`1.5`) is preferred over pixels or `em` — it means `1.5 × the element's own font size`, and it is **inherited** by children without compounding issues.

| `line-height` | Effect |
|--------------|--------|
| `1` | Lines touch — very dense |
| `1.5` | Comfortable reading — WCAG recommended minimum |
| `2` | Double-spaced — very open |

> The WCAG accessibility guideline (Success Criterion 1.4.8) recommends `line-height` of at least `1.5` for body text.

## 14.2 `text-decoration: underline dotted`

```css
a {
    color: #ef5839;
    text-decoration: underline dotted;
}
```

`text-decoration` is a shorthand that sets:
- The **line** (`underline`, `overline`, `line-through`)
- The **style** (`solid`, `dotted`, `dashed`, `wavy`)
- Optionally the **color**

`underline dotted` replaces the browser's default solid underline with a dotted one — retaining accessibility (links are still visibly underlined) while looking more refined. The CSS property `text-decoration-style: dotted` would be the longhand equivalent.

## 14.3 `border-radius`

```css
.btn {
    border-radius: 4.6px;
}

.feature-image {
    border-radius: 4.6px;
}
```

`border-radius: 4.6px` applies a subtle rounded corner to buttons and feature images — small enough to feel polished rather than cartoonish. The precise `4.6px` value is a deliberate design choice that matches the project's visual identity.

For comparison:
- `border-radius: 0` — sharp corners
- `border-radius: 4–8px` — subtle, modern rounding
- `border-radius: 20px` — pill-shaped (buttons in Twimba)
- `border-radius: 50%` — circle (profile pictures)

## 14.4 `em`-based padding on buttons

```css
.btn {
    padding: 0.5em 1em;
}
```

Using `em` for button padding means: *"vertical padding is half the button's font size; horizontal padding equals the button's font size."* If the button's `font-size: 1.125rem = 18px`:
- `0.5em` = 9px top and bottom
- `1em` = 18px left and right

This gives visually balanced proportions regardless of the button's font size. If the font-size changes, the padding scales with it automatically.

## 14.5 `inherit`

```css
.section-two h2 {
    color: inherit;
}
```

The default colour for `h2` is `#451c7a` (dark purple), set by the general `h2` rule. But `.section-two` has `color: whitesmoke` on its background section. `inherit` tells `.section-two h2` to pick up its parent's `color` (whitesmoke) instead of the `h2` default — making the heading match the rest of the white text in the dark purple section.

| Value | Meaning |
|-------|---------|
| `inherit` | Use the parent element's computed value |
| `initial` | Use the CSS specification's initial value |
| `unset` | Inherited properties → inherit; non-inherited → initial |

---

# 15. HTML Structure Recap

## 15.1 Semantic HTML elements

```
<html>
├── <head>
│   ├── <title>NFT Site</title>
│   ├── <meta name="viewport" content="width=device-width, initial-scale=1">
│   ├── <link> → Google Fonts (Roboto)
│   └── <link> → index.css
│
└── <body>
    ├── <header>
    │   └── <div class="container">
    │       ├── <h1>Wildly Expensive JPEGs
    │       │   └── <span class="subheading">(Also known as NFTs)</span>
    │       └── <nav>
    │           └── <ul>
    │               ├── <li><a href="#">Buy</a></li>
    │               ├── <li><a href="#">Resources</a></li>
    │               └── <li><a href="#">Explore</a></li>
    │
    └── <main>
        ├── <section>                              ← Hero section
        │   └── <div class="container">
        │       ├── <h2>Meta-Pigeon Sneaker NFT: $33,000</h2>
        │       ├── <img class="main-image">
        │       ├── <h3>At $33k, this NFT sneaker is super good value!</h3>
        │       ├── <p>…</p>
        │       ├── <a class="btn btn-dark">Buy NFTs</a>
        │       └── <a class="btn btn-mid">More info</a>
        │
        ├── <section class="section-two">          ← Feature section
        │   └── <div class="container">
        │       ├── <h2>For the true Crypto-connoisseur</h2>
        │       ├── <div class="section-two-image-container">  ← flex container
        │       │   ├── <div class="feature-item">
        │       │   │   ├── <img class="feature-image">        (crypto-punk.jpg)
        │       │   │   └── <p>…</p>
        │       │   └── <div class="feature-item">
        │       │       ├── <img class="feature-image">        (bag.svg)
        │       │       └── <p>…</p>
        │       ├── <a class="btn btn-light">About Us</a>
        │       ├── <a class="btn btn-mid">Contact</a>
        │       └── <p>…</p>
        │
        └── <footer>
            └── <p>© 2022 FoolsGold.com</p>
```

### Semantic element choices

| Element | Why used |
|---------|---------|
| `<header>` | Site-level header with branding and navigation — semantically distinct from content |
| `<nav>` | Groups the site navigation links — assists screen readers and search engines |
| `<main>` | Wraps the primary content — exactly one per page; assistive technology can jump to it |
| `<section>` | Groups thematically related content — hero product and feature cards are separate sections |
| `<footer>` | Site footer with copyright — semantically separate from body content |
| `<h1>` | One per page — the primary page title |
| `<h2>` | Section headings — one per `<section>` |
| `<h3>` | Sub-section heading within the hero section |

## 15.2 The viewport meta tag in `<head>`

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Placed in `<head>` **before any CSS links**, this ensures the browser calculates the viewport width before parsing stylesheets. Without it, the calculated viewport width during CSS parsing is the simulated desktop width (~980px), and your media queries fire against the wrong values.

---

# 16. How the Layout Changes at the Breakpoint

```
Mobile (< 768px):
┌──────────────────────────────┐
│         HEADER               │  ← background: #5f29a3
│    Wildly Expensive JPEGs    │  ← h1, centred
│     (Also known as NFTs)     │  ← .subheading
│  ─────────────────────────── │  ← border-bottom dotted divider
│          Buy                 │  ← nav links: display: block, stacked
│  ─────────────────────────── │
│        Resources             │
│  ─────────────────────────── │
│         Explore              │
├──────────────────────────────┤
│   Meta-Pigeon Sneaker NFT    │  ← h2
│    [sneaker image, 100%]     │  ← .main-image fills width
│   At $33k, super good value  │  ← h3
│        paragraph text        │
│ [Buy NFTs btn — full width]  │  ← .btn display: block
│ [More info btn — full width] │  ← .btn display: block
├──────────────────────────────┤
│   For the true connoisseur   │  ← section-two h2
│   [crypto-punk.jpg, 100%]   │  ← feature-item 1
│        paragraph             │
│   [bag.svg, 100%]           │  ← feature-item 2 (wrapped)
│        paragraph             │
│ [About Us btn — full width]  │
│ [Contact btn — full width]   │
└──────────────────────────────┘

Desktop (≥ 768px):
┌──────────────────────────────────────────────┐
│  Wildly Expensive JPEGs  │  Buy Resources Explore  │  ← header: flex row, space-between
├──────────────────────────────────────────────┤
│   Meta-Pigeon Sneaker NFT: $33,000           │  ← h2
│          [sneaker image, capped at 640px]    │
│   At $33k, this NFT sneaker is super value   │
│   paragraph text, 1.125rem...                │
│   [Buy NFTs]  [More info]                    │  ← btns: inline-block, side by side
├──────────────────────────────────────────────┤
│   For the true Crypto-connoisseur            │
│   ┌────────────────┐  ┌────────────────┐     │  ← flex row, flex: 1 260px
│   │ [crypto-punk]  │  │   [bag.svg]   │     │
│   │ paragraph text │  │ paragraph text│     │
│   └────────────────┘  └────────────────┘     │
│   [About Us]  [Contact]                      │
└──────────────────────────────────────────────┘
```

---

# 17. How to Run

No JavaScript, no build step, no dependencies. This is a pure HTML + CSS file.

1. Clone the repository:
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder:
   ```bash
   cd "06. Responsive Design/01. Responsive Layouts"
   ```

3. Open `index.html` in your browser — **no server required** (no ES Modules, no `file://` restriction).

**Things to try:**
- Open DevTools → toggle the **device toolbar** (Ctrl+Shift+M / Cmd+Shift+M) — resize the viewport and watch the layout shift at 768px
- In DevTools → **Responsive** mode, test at iPhone SE (375px), iPad (768px), and Desktop (1280px)
- Open the **Computed** panel for `.container` and watch `width` change as you resize
- In DevTools → **Elements**, temporarily add `flex-wrap: nowrap` to `.section-two-image-container` and see the feature cards refuse to wrap
- Remove `max-width: 800px` from `.container` on a wide monitor and watch the text lines become uncomfortably long
- Remove `<meta name="viewport">` from `<head>` and open on a real phone — see the unscaled desktop layout

---

# 18. Course Reference

| Item | Detail |
|------|--------|
| Platform | [Scrimba](https://scrimba.com) |
| Course | Fullstack Web Development Path |
| Module | Responsive Design |
| Project number | 01 of the module |
| Key concepts | Viewport meta tag · `rem`/`em`/`%` units · Container pattern · `width: 100%` on images · `flex-wrap: wrap` · `flex: 1 260px` · Media queries · `min-width` · `max-width` · Mobile-first thinking |
| Next project | [02. Build a Product Page](../02.%20Build%20a%20Product%20Page/) |
| MDN Reference — Media Queries | [MDN — @media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) |
| MDN Reference — Viewport Meta | [MDN — Viewport meta tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag) |
| MDN Reference — flex | [MDN — flex](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) |
| MDN Reference — rem | [MDN — length: rem](https://developer.mozilla.org/en-US/docs/Web/CSS/length#rem) |

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *Responsive design is not about making your site work on phones — it is about making your site work on screens you have never seen. The tools that achieve this — relative units, fluid containers, flexible images, and media queries — are not workarounds. They are the natural language of the web, a medium that has always been designed to adapt. A fixed-pixel layout is the exception; a fluid layout is the default.*
