# Build a Product Page — Responsive Design

![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20First-green?style=flat-square)
![Media Queries](https://img.shields.io/badge/Media%20Queries-min--width-teal?style=flat-square)
![Viewport Units](https://img.shields.io/badge/Viewport%20Units-vw%20%7C%20vh-blueviolet?style=flat-square)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Source%20Sans%20Pro-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A product splash page — the **second Responsive Design project** from **Scrimba's Fullstack Web Development Path**.

This README is a **complete concept revision guide**. It explains every new CSS concept introduced in this project that was **not present in the previous Responsive Layouts project**, while also noting which skills carry over and deepen.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Responsive Layouts](#3-whats-new-vs-responsive-layouts)
4. [The Side-by-Side Split Layout](#4-the-side-by-side-split-layout)
   - [body as a flex container](#41-body-as-a-flex-container)
   - [width: 50% on both panels](#42-width-50-on-both-panels)
   - [Why this works perfectly](#43-why-this-works-perfectly)
5. [Viewport Units — `vw` and `vh`](#5-viewport-units--vw-and-vh)
   - [vw — Viewport Width](#51-vw--viewport-width)
   - [vh — Viewport Height](#52-vh--viewport-height)
   - [Font size with vw — fluid typography](#53-font-size-with-vw--fluid-typography)
   - [min-height: 100vh — full-screen panels](#54-min-height-100vh--full-screen-panels)
   - [When to use vw / vh vs rem / %](#55-when-to-use-vw--vh-vs-rem--)
6. [Background Image with CSS](#6-background-image-with-css)
   - [background shorthand](#61-background-shorthand)
   - [background-size: cover](#62-background-size-cover)
   - [Why use CSS background instead of an `<img>` tag?](#63-why-use-css-background-instead-of-an-img-tag)
7. [text-shadow](#7-text-shadow)
8. [text-transform: uppercase](#8-text-transform-uppercase)
9. [letter-spacing](#9-letter-spacing)
10. [font-weight extremes — 300 and 900](#10-font-weight-extremes--300-and-900)
11. [The `order` Property — Reordering Flex Items](#11-the-order-property--reordering-flex-items)
    - [Visual vs DOM order](#111-visual-vs-dom-order)
    - [order: -1](#112-order--1)
    - [Accessibility warning](#113-accessibility-warning)
12. [box-sizing: border-box — The Universal Reset](#12-box-sizing-border-box--the-universal-reset)
    - [*::before and *::after](#121-before-and-after)
    - [Why border-box changes everything](#122-why-border-box-changes-everything)
13. [Form Styling](#13-form-styling)
    - [font-family: inherit on inputs](#131-font-family-inherit-on-inputs)
    - [Styling the focus state](#132-styling-the-focus-state)
    - [outline: none — when and why](#133-outline-none--when-and-why)
    - [input type="file"](#134-input-typefile)
    - [aria-label on inputs](#135-aria-label-on-inputs)
    - [The required attribute](#136-the-required-attribute)
14. [Button Modifiers — BEM-style Classes](#14-button-modifiers--bem-style-classes)
15. [flex-direction: column](#15-flex-direction-column)
    - [Column layout on both panels](#151-column-layout-on-both-panels)
    - [justify-content in a column direction](#152-justify-content-in-a-column-direction)
    - [align-items: center in a column direction](#153-align-items-center-in-a-column-direction)
16. [max-width on paragraphs and forms](#16-max-width-on-paragraphs-and-forms)
17. [The Single Breakpoint — min-width: 576px](#17-the-single-breakpoint--min-width-576px)
    - [Mobile: stacked, scrollable](#171-mobile-stacked-scrollable)
    - [Desktop: side-by-side, full-height](#172-desktop-side-by-side-full-height)
18. [CSS Concepts Reinforced](#18-css-concepts-reinforced)
    - [border-radius: 50% on avatar](#181-border-radius-50-on-avatar)
    - [border-top: 5px solid](#182-border-top-5px-solid)
    - [em-based margin on h2](#183-em-based-margin-on-h2)
    - [padding shorthand](#184-padding-shorthand)
19. [HTML Structure Recap](#19-html-structure-recap)
    - [DOCTYPE html](#191-doctype-html)
    - [Section vs main — layout roles](#192-section-vs-main--layout-roles)
    - [strong inside h1](#193-strong-inside-h1)
    - [accept attribute on file input](#194-accept-attribute-on-file-input)
20. [How the Layout Changes at the Breakpoint](#20-how-the-layout-changes-at-the-breakpoint)
21. [How to Run](#21-how-to-run)
22. [Course Reference](#22-course-reference)

---

# 1. Project Overview

**"Scrimbafy Me!"** is a product splash page for a fictional avatar-creation service. The page is divided into two panels:

* A **left intro panel** — a full-height purple hero with a background texture, a large headline, a beta badge, and a "Powered by Scrimba" eyebrow label positioned above the heading using `order: -1`
* A **right content panel** — a white area with a circular avatar image, the product name, a subheading, a description paragraph, a form (name, email, file upload, submit button), and a privacy note

On **mobile**, the two panels stack vertically. On **desktop** (≥ 576px), `body` becomes a flex row and both panels sit side-by-side at 50% width, with the intro panel filling the full viewport height via `min-height: 100vh`.

The real goals are: `box-sizing: border-box`, viewport units (`vw`, `vh`), `background-size: cover`, `text-shadow`, `text-transform`, `letter-spacing`, the `order` property, form input styling (including the `:focus` state), and the BEM-style button modifier pattern.

---

# 2. Project Structure

```
06. Responsive Design/
│
└── 02. Build a Product Page/
    ├── index.html      → Page structure: .intro section + .main-content with form
    ├── styles.css      → All styling: typography, flex layout, form, media query
    └── images/
        ├── avatar.png      → Circular profile image displayed in the content panel
        └── intro-bg.png    → Background texture overlaid on the purple intro panel
```

No JavaScript. No build step. Pure HTML + CSS — the split layout, form styling, and full-height panel are achieved entirely in CSS.

---

# 3. What's New vs Responsive Layouts

This table lists **every concept used in the Product Page that was not present in the Responsive Layouts project**. Concepts that carry over are marked ↩.

## New CSS Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `*, *::before, *::after { box-sizing: border-box }` | Universal reset | Makes `width` include padding and border on every element |
| `body { display: flex }` (in media query) | Desktop layout | Turns the entire page body into a flex row, creating the side-by-side split |
| `vw` (viewport width unit) | `h1 { font-size: 5vw }` | Font size that scales proportionally with viewport width |
| `vh` (viewport height unit) | `.intro { min-height: 100vh }` | Panel that always fills the full viewport height |
| `min-height: 100vh` | `.intro` on desktop | Full-screen left panel regardless of content height |
| `background: color url(...)` shorthand | `.intro` | Combines background colour and image in one declaration |
| `background-size: cover` | `.intro` | Scales the background image to cover the entire element |
| `text-shadow` | `h1` | Adds a drop shadow below text for depth |
| `text-transform: uppercase` | `.beta-text`, `.top-text`, `.subheading`, `.btn` | Converts text to all-caps in CSS without changing the HTML |
| `letter-spacing` | `.btn`, `.fine-print` | Controls horizontal spacing between characters |
| `font-weight: 300` | Loaded from Google Fonts | Light weight — thinner than regular (400) |
| `font-weight: 900` | `.beta-text`, `.top-text`, `.subheading`, `.btn` | Heavy / black weight — boldest available |
| `order: -1` | `.top-text` | Moves a flex item visually before siblings without changing HTML order |
| `input:focus` | Form inputs | Styles the focused state of text/email/file inputs |
| `outline: none` | `input:focus` | Removes the browser's default blue focus ring |
| `border-color` change on focus | `input:focus` | Replaces the outline with a custom border colour |
| `background-color` change on focus | `input:focus` | Subtly highlights the active field |
| `font-family: inherit` on inputs | `input, button` | Overrides the browser default (usually Times New Roman) with the page font |
| `accept="image/png, image/jpg"` | `<input type="file">` | Restricts file picker to image formats only |
| `aria-label` on inputs | All three `<input>` elements | Provides screen reader labels for inputs without visible `<label>` elements |
| `.btn` + `.btn-primary` modifier pattern | Submit button | Separates base button styles from colour-variant styles |
| `flex-direction: column` | `.intro`, `.main-content` | Stacks children vertically inside each panel |
| `justify-content: space-between` (column) | `.intro` | Distributes vertical space in the intro column |
| `justify-content: center` (column) | `.main-content` on desktop | Vertically centres content in the right panel |
| `align-items: center` | `.main-content` | Horizontally centres all content in the column |
| `max-width: 450px` | paragraphs + form | Limits the line length of text and form width for readability |
| `text-shadow: 0 2px #816fca` | `h1` | Subtle vertical-offset shadow adds depth to the headline |
| `border-top: 5px solid` | `.top-text` | Decorative rule above the "Powered by Scrimba" label |

## Concepts Carried Over from Responsive Layouts ↩

| Concept | Used Again In |
|---------|--------------|
| `<meta name="viewport">` | `<head>` — same tag, same purpose |
| `@media (min-width: ...)` | `@media (min-width: 576px)` — mobile-first breakpoint |
| `rem` units | `h1`, `h2`, `p`, spacing |
| `em` units | `padding`, `margin`, `margin-bottom` |
| `display: flex` | Both panels, body on desktop |
| `padding` on sections | Both panels use `padding-left/right: 2em` |
| `margin: 0` on body | Browser default reset |
| `font-family` from Google Fonts | Source Sans Pro |
| `border-radius: 50%` | `.img-main` — circular avatar |
| `border-radius` on inputs/buttons | `5px` |
| `line-height` | `p { line-height: 1.35 }` |
| `cursor: pointer` | `.btn` |
| `color` and `background-color` | Throughout |
| `text-decoration: none` | Not present here — no `<a>` tags |
| `width: 100%` on inputs/button | Full-width form fields |

---

# 4. The Side-by-Side Split Layout

## 4.1 `body` as a flex container

```css
/* Base — mobile: both panels stack in normal document flow */
.intro,
.main-content {
    display: flex;
    flex-direction: column;
    padding-left: 2em;
    padding-right: 2em;
}

/* Desktop — body becomes a flex row, panels sit side by side */
@media (min-width: 576px) {
    body {
        display: flex;   /* ← key rule */
    }

    .intro,
    .main-content {
        width: 50%;
    }
}
```

On desktop, `body { display: flex }` turns `<body>` itself into a flex container. Its two direct children — `<section class="intro">` and `<main class="main-content">` — become flex items. With both set to `width: 50%`, they split the page equally, sitting side-by-side in a single row.

> **Why use `body` as the flex container instead of a wrapper `<div>`?** There is no wrapper `<div>` in the HTML — the two panels are direct children of `<body>`. Making `body` a flex container avoids adding extra markup purely for layout purposes. This is a valid, minimal approach.

## 4.2 `width: 50%` on both panels

```css
.intro,
.main-content {
    width: 50%;
}
```

`width: 50%` is relative to the flex container's width — which is `body`, which fills the viewport. Each panel therefore occupies exactly half the viewport width.

| Viewport | `.intro` width | `.main-content` width |
|----------|---------------|----------------------|
| 576px | 288px | 288px |
| 1024px | 512px | 512px |
| 1440px | 720px | 720px |

## 4.3 Why this works perfectly

Each panel is already `display: flex; flex-direction: column` — they are inner flex containers in the column direction. Making `body` an outer flex container in the (default) row direction does not conflict. The result is a **nested flex layout**:

```
body (display: flex — row)
  ├── .intro (display: flex — column, width: 50%)
  │       ├── h1
  │       ├── .beta-text
  │       └── .top-text (order: -1 → visually first)
  │
  └── .main-content (display: flex — column, width: 50%)
          ├── .img-main
          ├── h2
          ├── .subheading
          ├── p
          ├── form
          └── .fine-print
```

---

# 5. Viewport Units — `vw` and `vh`

## 5.1 `vw` — Viewport Width

```css
@media (min-width: 576px) {
    h1 {
        font-size: 5vw;
    }
}
```

`1vw` equals **1% of the viewport width**. `5vw` is therefore always exactly 5% of the browser window's width — it scales fluidly with the viewport without any media queries.

| Viewport width | `5vw` result |
|----------------|-------------|
| 576px | 28.8px |
| 800px | 40px |
| 1024px | 51.2px |
| 1440px | 72px |

**Why use `vw` for the headline font size?**

The intro panel is always `50%` of the viewport on desktop. A fixed `rem` size (e.g. `2.5rem`) would look fine at 768px but too small at 1440px. `5vw` makes the headline grow proportionally with the panel it lives in — always occupying the same visual proportion of the screen.

> The base style (`h1 { font-size: 2.5rem }`) handles mobile, where the intro panel is full-width and a fixed size is appropriate. The `5vw` overrides it only on desktop.

## 5.2 `vh` — Viewport Height

```css
@media (min-width: 576px) {
    .intro {
        min-height: 100vh;
    }
}
```

`1vh` equals **1% of the viewport height**. `100vh` is exactly the full height of the browser window.

`min-height: 100vh` on `.intro` ensures the purple left panel **fills the entire screen height** on desktop — even if its text content is short. Without it, the panel would only be as tall as its content (`h1` + beta text + label), leaving a white gap below it.

| Property | Effect |
|----------|--------|
| `height: 100vh` | Always exactly viewport height — content may overflow |
| `min-height: 100vh` | At least viewport height — grows if content exceeds it |

`min-height` is safer: if you add more content to the intro later, the panel expands gracefully rather than cutting off content.

## 5.3 Font size with `vw` — fluid typography

Using `vw` for font sizes creates **fluid typography** — text that scales continuously with the viewport, not in discrete steps at breakpoints. This is often used for large display headings (as here) because the visual weight should stay proportional to the available space.

```
Without vw — fixed rem:
576px  → h1: 2.5rem (40px) ← looks small on large screens
1440px → h1: 2.5rem (40px) ← same size, looks small

With vw:
576px  → h1: 5vw = 28.8px  ← appropriately sized for the panel
1440px → h1: 5vw = 72px    ← scales up with the screen
```

> **Limitation of `vw` for body text:** `vw` on body paragraphs causes text to become too small on narrow screens and too large on wide screens. It is best reserved for large display elements. For body text, `rem` is safer and more accessible.

## 5.4 `min-height: 100vh` — full-screen panels

`100vh` is the canonical way to make a section fill the full browser window height. Common uses:

| Use case | Rule |
|----------|------|
| Full-screen hero section | `min-height: 100vh` |
| Full-screen landing panel | `min-height: 100vh` |
| Vertically centred splash screen | `height: 100vh` + `display: flex; align-items: center` |

> **Mobile browser caveat:** On iOS Safari, `100vh` includes the address bar height. When the address bar is visible, `100vh` can be slightly taller than the visible area, causing a small scroll. The newer `100svh` (small viewport height) unit solves this, but browser support is still catching up (2023+).

## 5.5 When to use `vw` / `vh` vs `rem` / `%`

| Unit | Best for | Avoid for |
|------|---------|-----------|
| `vw` | Large display headings, viewport-proportional widths | Body text, small UI elements |
| `vh` | Full-screen sections, modal heights | Font sizes |
| `rem` | Font sizes, consistent spacing | Viewport-proportional layouts |
| `%` | Widths relative to parent | Heights (parent must have a defined height) |
| `em` | Component-level padding/margin that scales with font | Global layout |

---

# 6. Background Image with CSS

## 6.1 `background` shorthand

```css
.intro {
    background: #9480e4 url("images/intro-bg.png");
    background-size: cover;
}
```

The `background` shorthand combines multiple background properties in one declaration:

```
background: <color> <image>
            #9480e4   url("images/intro-bg.png")
```

| Component | Value | Effect |
|-----------|-------|--------|
| `background-color` | `#9480e4` | Purple fallback colour — visible if the image fails to load, or in the areas the image doesn't cover |
| `background-image` | `url("images/intro-bg.png")` | The texture PNG layered on top of the colour |

Providing a `background-color` alongside the image is a **best practice** — if the image fails (slow network, wrong path), users still see a solid-colour background rather than a broken white panel.

## 6.2 `background-size: cover`

```css
background-size: cover;
```

`background-size: cover` scales the background image so that it **completely covers the element's background area**, maintaining the image's aspect ratio. Parts of the image that don't fit are cropped.

| Value | Behaviour |
|-------|-----------|
| `cover` | Scales to cover the entire element — may crop |
| `contain` | Scales to fit entirely inside the element — may leave gaps |
| `auto` | Default — image renders at its natural size |
| `100% 100%` | Stretches to fill — distorts if aspect ratio differs |

`cover` is the correct choice for decorative background textures and hero images — you want the surface fully covered, and cropping is acceptable because the exact crop does not matter.

## 6.3 Why use CSS `background` instead of an `<img>` tag?

| Approach | When to use |
|----------|------------|
| `<img src="...">` | Image is **content** — carries meaning, needs alt text, should be indexed by search engines |
| `background: url(...)` | Image is **decorative** — pure visual texture, no semantic meaning, should be invisible to screen readers |

`intro-bg.png` is a repeating geometric texture that adds visual depth to the purple panel. It has no informational value — `background-image` is the semantically correct choice. Using `<img>` would require a misleading `alt` attribute or an empty `alt=""`, and the image would appear in image search results.

---

# 7. `text-shadow`

```css
h1 {
    text-shadow: 0 2px #816fca;
}
```

`text-shadow` adds a shadow to text. The value format is:

```
text-shadow: offset-x  offset-y  blur-radius  color;
              0         2px        (omitted)    #816fca
```

| Part | Value | Effect |
|------|-------|--------|
| `offset-x` | `0` | No horizontal shift — shadow is directly behind the text |
| `offset-y` | `2px` | Shadow is 2px below the baseline |
| `blur-radius` | omitted | Defaults to `0` — a sharp, crisp shadow (no blur) |
| `color` | `#816fca` | A darker shade of the panel's purple — subtle depth |

With `offset-x: 0` and `offset-y: 2px`, the shadow appears as a thin dark line immediately below each letter — giving the white headline text a subtle three-dimensional quality that makes it stand out against the patterned background.

> **Multiple shadows:** `text-shadow` accepts a comma-separated list of shadows, applied from front to back:
> ```css
> text-shadow: 0 2px #816fca, 0 4px rgba(0,0,0,0.2);
> ```

---

# 8. `text-transform: uppercase`

```css
.beta-text,
.top-text,
.subheading {
    text-transform: uppercase;
}

.btn {
    text-transform: uppercase;
}
```

`text-transform: uppercase` renders text in all capital letters **without changing the HTML**. The actual text in `index.html` is written in normal case — the transformation is purely visual via CSS.

| Value | Effect |
|-------|--------|
| `uppercase` | ALL CAPS |
| `lowercase` | all lowercase |
| `capitalize` | First Letter Of Each Word Capitalised |
| `none` | No transformation (default) |

**Why transform in CSS rather than writing uppercase in HTML?**

- The HTML remains readable and semantically correct
- Screen readers read the text as written (in some browsers, UPPERCASE HTML is read letter-by-letter — a poor experience)
- If you need to change the style (e.g. to `capitalize`), you change one CSS rule rather than editing all HTML text

---

# 9. `letter-spacing`

```css
.btn {
    letter-spacing: 1px;
}

.fine-print {
    letter-spacing: 1px;
}
```

`letter-spacing` adds or removes space between individual characters. A positive value spreads characters apart; a negative value brings them closer together.

| Value | Effect |
|-------|--------|
| `0` / `normal` | Default browser tracking |
| `1px` | Slightly open tracking — used on small text and uppercase labels |
| `2px–4px` | Widely spaced — used for logos or large labels |
| `-0.5px` | Tight tracking — sometimes used on bold headings |

**Why add `letter-spacing` to uppercase text?**

Uppercase characters already feel visually cramped because capital letters have less natural variation in width than mixed-case text. Adding `1px` of letter-spacing opens up the tracking and makes uppercase labels and buttons easier to read. This is a standard typographic convention for small-caps and all-uppercase UI elements.

---

# 10. `font-weight` Extremes — 300 and 900

```css
/* Google Font loaded */
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,900&display=swap">

/* Used in CSS */
h1 { font-weight: 400; }        /* regular */
.beta-text { font-weight: 900; }  /* heavy / black */
.top-text  { font-weight: 900; }
.subheading{ font-weight: 900; }
.btn       { font-weight: 900; }
```

Google Fonts only delivers the font weights you request. This project requests **three weights**: `300` (light), `400` (regular), and `900` (black/heavy).

| Weight | Name | Usage here |
|--------|------|-----------|
| `300` | Light | Available but not explicitly used — thinner than regular |
| `400` | Regular | `h1`, body text (browser default for `p`) |
| `900` | Black / Heavy | Labels, subheading, buttons — maximum emphasis |

**Why `font-weight: 400` on `h1`?**

Headings default to `font-weight: bold` (700). Setting `font-weight: 400` on `h1` gives it the regular weight of Source Sans Pro — the impact comes from the large `font-size` and `text-shadow`, not from boldness. This creates a modern, clean look where the headline feels large but not heavy.

**Why `font-weight: 900` on buttons and labels?**

Labels and buttons at small font sizes need extra visual weight to read clearly. A `900` weight button text with `letter-spacing: 1px` and `text-transform: uppercase` creates high contrast against the background — making the call-to-action unmistakeable.

---

# 11. The `order` Property — Reordering Flex Items

## 11.1 Visual vs DOM order

```html
<!-- HTML order -->
<section class="intro">
    <h1>Turn <strong>your picture</strong> into an iconic <strong>Scrimba avatar</strong></h1>
    <span class="beta-text">Currently in Beta</span>
    <p class="top-text">Powered by Scrimba</p>     <!-- ← third in DOM -->
</section>
```

```css
.top-text {
    order: -1;   /* ← visually moved to first position */
    margin: 0 auto;
}
```

In the rendered page, "Powered by Scrimba" appears **above** the `<h1>` — even though it comes **after** it in the HTML. The `order` property controls the **visual order** of flex items without changing the HTML.

## 11.2 `order: -1`

Every flex item has a default `order` value of `0`. Flex items are sorted in ascending `order` value, with ties resolved by DOM order. Setting `order: -1` on `.top-text` places it before all siblings with `order: 0`:

```
DOM order:     h1 (0)   →  .beta-text (0)   →  .top-text (0)
Visual order:  h1 (0)   →  .beta-text (0)   →  .top-text (0)

After order: -1 on .top-text:
DOM order:     h1 (0)   →  .beta-text (0)   →  .top-text (-1)
Visual order:  .top-text (-1)  →  h1 (0)    →  .beta-text (0)
```

The result: "Powered by Scrimba" appears at the top of the intro panel as a small label above the headline — the classic "eyebrow text" pattern used in product pages.

## 11.3 Accessibility warning

> **`order` only affects visual order — not keyboard tab order or screen reader reading order.** Keyboard navigation and assistive technologies follow the DOM order. If you rely on `order` to make content make sense visually, but the DOM order is different, keyboard users and screen reader users will experience the content in a confusing sequence.

For this project, the `.top-text` label is supplementary decoration — reading it after the `h1` in the DOM is not harmful. In more critical cases (e.g. reordering form fields or navigation items), always prefer changing the HTML order instead of using `order`.

---

# 12. `box-sizing: border-box` — The Universal Reset

## 12.1 `*::before` and `*::after`

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

`*` selects every element. `*::before` and `*::after` select all **pseudo-elements** — the virtual elements that `::before` and `::after` CSS rules create. The reset applies `border-box` to pseudo-elements as well as real elements, ensuring consistent sizing behaviour everywhere.

| Selector | Matches |
|----------|---------|
| `*` | Every HTML element |
| `*::before` | Every `::before` pseudo-element |
| `*::after` | Every `::after` pseudo-element |

This is the modern standard reset (from Paul Irish, 2012) — the `*::before, *::after` addition was absent from older resets.

## 12.2 Why `border-box` changes everything

```css
box-sizing: border-box;
```

With the default `box-sizing: content-box`, `width` refers to the content area only — padding and border are added on top:

```
content-box (default):
  .intro { width: 50%; padding: 2em }
  → rendered width = 50% of body + 2em left + 2em right = wider than 50%
  → the two panels together are wider than 100% → horizontal overflow

border-box:
  .intro { width: 50%; padding: 2em }
  → rendered width = exactly 50% of body (padding is included within that 50%)
  → two panels at 50% each = exactly 100% → perfect split
```

Without `box-sizing: border-box`, the `width: 50%` + `padding: 2em` combination would cause the two panels to overflow the body — they would be wider than 100% combined and would not sit side-by-side correctly.

`border-box` makes `width` mean *"the total rendered width including padding and border"* — which is how most developers intuitively expect `width` to work.

> This reset was first popularised by Paul Irish in 2012. It is now included in essentially every modern CSS framework and is considered the standard starting point for any stylesheet.

---

# 13. Form Styling

## 13.1 `font-family: inherit` on inputs

```css
input,
button {
    font-family: inherit;
}
```

Browsers apply their own default `font-family` to form controls — typically a system font (Times New Roman, Arial, or the OS default) that differs from the page's chosen font. `font-family: inherit` overrides this, telling the control to use whatever `font-family` is set on its parent — which ultimately resolves to `'Source Sans Pro'` from the `body` rule.

Without this reset, the name, email, and file inputs would render in a different font than the rest of the page.

## 13.2 Styling the focus state

```css
input:focus {
    outline: none;
    border-color: #8a71ec;
    background-color: #e6e8ec;
}
```

`:focus` is a pseudo-class that applies when an element has **keyboard focus** — the user has tabbed into it or clicked on it. Here it provides visual feedback for the active form field by:

1. Removing the browser's default focus ring (`outline: none`)
2. Changing the border colour to purple (`#8a71ec` — matching the brand)
3. Lightly tinting the background of the field (`#e6e8ec`)

## 13.3 `outline: none` — when and why

```css
input:focus {
    outline: none;
}
```

The browser's default focus outline (a blue ring) is an **accessibility feature** — it shows keyboard users which element is active. Removing it with `outline: none` alone would make keyboard navigation invisible and inaccessible.

**This is safe here because a custom focus style is provided** — the changed `border-color` and `background-color` replace the removed outline, keeping the focus visible. The rule of thumb:

> Never remove `outline: none` without providing an equivalent custom focus indicator.

```css
/* ❌ Dangerous — hides focus with no replacement */
:focus { outline: none; }

/* ✅ Safe — removes outline but replaces with custom style */
input:focus {
    outline: none;
    border-color: #8a71ec;      /* visible custom focus indicator */
    background-color: #e6e8ec;
}
```

## 13.4 `input type="file"`

```html
<input type="file" required accept="image/png, image/jpg" aria-label="Choose file">
```

`<input type="file">` renders a native OS file picker. In `styles.css`:

```css
input,
button {
    font-family: inherit;
    width: 100%;
    border-radius: 5px;
}
```

The `width: 100%` and `border-radius` apply to the file input too, giving it the same width as other form fields. File inputs are notoriously difficult to style fully — the browse button itself uses OS-native styling and resists CSS. In production, file inputs are often hidden and triggered by a styled `<label>`.

## 13.5 `aria-label` on inputs

```html
<input type="text" required placeholder="Name" aria-label="Name">
```

Every `<input>` should have an accessible label. The conventional approach is a visible `<label for="inputId">` element. Here, no visible labels are used — instead, `aria-label` provides an **invisible label** that screen readers announce when the field receives focus.

| Approach | Visible? | Screen reader support |
|----------|---------|----------------------|
| `<label for="id">` | ✅ Yes | ✅ Full |
| `aria-label="..."` | ❌ No | ✅ Full |
| `placeholder` alone | Partially (disappears on input) | ⚠️ Inconsistent |

> `placeholder` text disappears as soon as the user starts typing — it cannot serve as a permanent label for screen readers. `aria-label` is the correct supplemental accessibility attribute when visible labels are omitted by design.

## 13.6 The `required` attribute

```html
<input type="text" required placeholder="Name" aria-label="Name">
<input type="email" required placeholder="Email" aria-label="Email">
<input type="file" required accept="image/png, image/jpg" aria-label="Choose file">
```

`required` is an HTML boolean attribute that prevents form submission if the field is empty (for `text`/`email`/`file` inputs). The browser shows a native validation tooltip when the user tries to submit an empty required field.

`required` also has CSS implications — the `:required` and `:invalid` pseudo-classes can be used to style required or invalid fields:

```css
/* Example — not used in this project */
input:required { border-left: 3px solid red; }
input:valid    { border-color: green; }
```

---

# 14. Button Modifiers — BEM-style Classes

```html
<button class="btn btn-primary">Submit</button>
```

```css
/* Base button — layout, typography, shape — shared by all buttons */
.btn {
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
    padding: 1em 0;
    border: none;
    cursor: pointer;
}

/* Colour modifier — only the specific variant's colour properties */
.btn-primary {
    color: white;
    background-color: #8a71ec;
    margin-top: 1em;
}

.btn-primary:hover,
.btn-primary:focus {
    background-color: #b7a7f6;
}
```

This two-class pattern separates **structure** (`.btn`) from **skin** (`.btn-primary`). It is inspired by **BEM** (Block Element Modifier) methodology:

| Class | Role | Contains |
|-------|------|---------|
| `.btn` | Block — base component | Shape, typography, cursor, padding |
| `.btn-primary` | Modifier — colour variant | Background, text colour, hover state |

**Why split them?** If you later add a secondary button (e.g. `class="btn btn-secondary"`), you only write the colour override — all the shared typography and padding come from `.btn` without repetition.

```html
<!-- Future extension — no new padding/typography needed -->
<button class="btn btn-secondary">Cancel</button>
```

```css
/* Only add what's different */
.btn-secondary {
    color: #8a71ec;
    background-color: transparent;
    border: 2px solid #8a71ec;
}
```

---

# 15. `flex-direction: column`

## 15.1 Column layout on both panels

```css
.intro,
.main-content {
    display: flex;
    flex-direction: column;
    padding-left: 2em;
    padding-right: 2em;
}
```

`flex-direction: column` stacks flex children **vertically** (top to bottom) — the main axis runs vertically and the cross axis runs horizontally. This is used on both panels so their contents (headings, images, form inputs) stack naturally in a column.

| `flex-direction` | Main axis | Cross axis | Items stack |
|-----------------|-----------|-----------|-------------|
| `row` (default) | Horizontal → | Vertical ↕ | Left to right |
| `column` | Vertical ↓ | Horizontal ↔ | Top to bottom |
| `row-reverse` | Horizontal ← | Vertical ↕ | Right to left |
| `column-reverse` | Vertical ↑ | Horizontal ↔ | Bottom to top |

## 15.2 `justify-content` in a column direction

```css
.intro {
    justify-content: space-between;
}

@media (min-width: 576px) {
    .main-content {
        justify-content: center;
    }
}
```

In a column flex container, `justify-content` controls **vertical** distribution (along the main axis):

| `justify-content` | In column direction |
|------------------|---------------------|
| `flex-start` | Items packed at the top |
| `flex-end` | Items packed at the bottom |
| `center` | Items vertically centred |
| `space-between` | First item at top, last at bottom, rest evenly spaced |

`.intro { justify-content: space-between }` pushes the headline to the top and the beta text to the bottom of the full-height purple panel, distributing whitespace evenly.

`.main-content { justify-content: center }` on desktop vertically centres all the content (image, heading, form) in the right panel — elegant for a splash page.

## 15.3 `align-items: center` in a column direction

```css
.main-content {
    align-items: center;
}
```

In a column flex container, `align-items` controls **horizontal** alignment (along the cross axis):

| `align-items` | In column direction |
|--------------|---------------------|
| `flex-start` | Items left-aligned |
| `center` | Items horizontally centred |
| `flex-end` | Items right-aligned |
| `stretch` | Items stretch to full width (default) |

`align-items: center` on `.main-content` centres the avatar image, headings, paragraph, and form horizontally within the right panel — everything is centre-aligned on both mobile and desktop.

---

# 16. `max-width` on Paragraphs and Forms

```css
.main-content p,
form {
    max-width: 450px;
}
```

The right panel is `50%` of the viewport on desktop — at 1440px that is 720px wide. A paragraph that stretches 720px has an uncomfortably long line length (optimal reading width is 50–75 characters, roughly 400–600px at 18px).

`max-width: 450px` caps the paragraph and form at a comfortable width. Combined with `align-items: center` on the parent, the content is centred within the panel but never too wide.

> This mirrors the `.container` pattern from Responsive Layouts but applied at the component level rather than the page level — the panel itself is the outer constraint, and `max-width` is the inner constraint.

---

# 17. The Single Breakpoint — `min-width: 576px`

## 17.1 Mobile: stacked, scrollable

```
Mobile (< 576px):
┌──────────────────────────────────┐
│   POWERED BY SCRIMBA             │  ← .top-text (order:-1, visually first)
│                                  │
│   Turn your picture into an      │  ← h1
│   iconic Scrimba avatar          │
│                                  │
│   CURRENTLY IN BETA              │  ← .beta-text
├──────────────────────────────────┤
│         [avatar.png ⭕]          │  ← img-main, 120px circle
│      Scrimbafy.me                │  ← h2
│   LIVEN UP YOUR PROFILE PIC      │  ← .subheading
│   paragraph text...              │
│   [ Name input               ]   │  ← input, width: 100%
│   [ Email input              ]   │  ← input, width: 100%
│   [ Choose file input        ]   │  ← input type="file"
│   [         SUBMIT           ]   │  ← .btn-primary, width: 100%
│   We'll never share info...      │  ← .fine-print
└──────────────────────────────────┘
```

On mobile, the two panels stack vertically. The intro occupies `min-height: 250px` (mobile only). The content panel follows beneath. Everything inside each panel stacks in column direction.

## 17.2 Desktop: side-by-side, full-height

```css
@media (min-width: 576px) {
    body {
        display: flex;           /* ← side-by-side split */
    }

    h1 {
        font-size: 5vw;          /* ← fluid headline */
    }

    h2 {
        font-size: 2.625rem;     /* ← slightly larger */
    }

    .beta-text {
        font-size: 1.25rem;      /* ← larger badge */
    }

    .intro,
    .main-content {
        width: 50%;              /* ← equal split */
    }

    .intro {
        min-height: 100vh;       /* ← full-screen left panel */
    }

    .main-content {
        justify-content: center; /* ← vertically centre content */
        padding-top: 0;          /* ← remove mobile top padding */
    }
}
```

```
Desktop (≥ 576px):
┌──────────────────────┬──────────────────────┐
│ POWERED BY SCRIMBA   │    [avatar.png ⭕]   │
│ (top-text eyebrow)   │    Scrimbafy.me      │
│                      │  LIVEN UP YOUR PIC   │
│  Turn your picture   │  paragraph text...   │
│  into an iconic      │ [ Name input      ]  │
│  Scrimba avatar      │ [ Email input     ]  │
│ (h1, 5vw, weight 400)│ [ Choose file     ]  │
│                      │ [    SUBMIT       ]  │
│  CURRENTLY IN BETA   │ We'll never share... │
└──────────────────────┴──────────────────────┘
   50% wide, 100vh         50% wide, centred
   purple bg + texture       white bg
```

**Why 576px as the breakpoint?**

576px is the Bootstrap Small (`sm`) breakpoint and represents the minimum width where a two-column layout is comfortable. Below 576px (small phones), a side-by-side split would make each column too narrow to be readable.

---

# 18. CSS Concepts Reinforced

## 18.1 `border-radius: 50%` on avatar

```css
.img-main {
    width: 120px;
    border-radius: 50%;
}
```

`border-radius: 50%` on a square element creates a circle. `.img-main` has a fixed `width: 120px` — the image's natural dimensions are square (it is a profile photo), so `border-radius: 50%` creates a perfect circle at exactly 120px diameter. This was first introduced in the Twimba project for profile pictures; it is equally standard on product and profile pages.

## 18.2 `border-top: 5px solid`

```css
.top-text {
    border-top: 5px solid;
    padding-top: 0.25em;
}
```

`border-top: 5px solid` draws a 5px solid line above the element. No color is specified — `border-color` defaults to `currentColor` (the element's `color` value). Since `.top-text` sits inside `.intro` which has `color: #fff`, the border is white.

This is the `currentColor` keyword in action — a CSS variable that always equals the current `color` property. It allows border, shadow, and fill colours to track text colour automatically.

## 18.3 `em`-based margin on `h2`

```css
h2 {
    margin: 0.167em 0;
}
```

`0.167em` on an element with `font-size: 2.25rem = 36px` equals `0.167 × 36px ≈ 6px`. This tiny margin creates a compact visual gap between `h2` and its siblings — proportional to the heading size rather than a fixed pixel value.

## 18.4 `padding` shorthand

```css
.intro,
.main-content {
    padding-left: 2em;
    padding-right: 2em;
}

.intro {
    padding-bottom: 1.5em;
}
```

These longhand padding rules avoid setting top/bottom padding on the shared rule (the intro and content have different vertical rhythms) while sharing the same horizontal breathing room. This is cleaner than a four-value shorthand because the top and bottom are specified separately for each panel.

---

# 19. HTML Structure Recap

## 19.1 `<!DOCTYPE html>`

```html
<!DOCTYPE html>
```

`<!DOCTYPE html>` is the HTML5 document type declaration. It tells the browser to render the page in **standards mode** (correct CSS box model, modern HTML parsing). Without it, browsers enter **quirks mode** — a legacy compatibility mode that emulates old browser bugs and makes CSS behave unpredictably.

> This is the only DOCTYPE needed for HTML5. Older HTML4/XHTML doctypes were long and cryptic. Every HTML file should start with `<!DOCTYPE html>`.

## 19.2 `<section>` vs `<main>` — layout roles

```html
<body>
    <section class="intro">...</section>   <!-- left panel -->
    <main class="main-content">...</main>  <!-- right panel -->
</body>
```

| Element | Semantic meaning | Used here for |
|---------|-----------------|--------------|
| `<section>` | A thematically grouped section of the page | The intro/hero panel — a distinct section of the page |
| `<main>` | The primary content of the document | The form and product description — the main purpose of the page |

There should be **only one `<main>` per page**. Assistive technologies use `<main>` to let users jump directly to the primary content, skipping headers and navigation. Using it for the form/content panel is semantically correct — this is the central purpose of the page.

## 19.3 `<strong>` inside `<h1>`

```html
<h1>Turn <strong>your picture</strong> into an iconic <strong>Scrimba avatar</strong></h1>
```

`<strong>` marks text as **strongly emphasised** — rendered in bold by default and announced as important by screen readers. Inside the `<h1>`, it creates visual contrast between the regular-weight function words ("Turn...into an iconic") and the key product-relevant phrases ("your picture", "Scrimba avatar") — drawing the eye to the value proposition.

> Note: `h1` has `font-weight: 400` (regular) set in CSS. So `<strong>` (which defaults to `font-weight: bold` = 700) actually stands out against the lighter heading — the `<strong>` creates the weight contrast, not the `h1` itself.

## 19.4 `accept` attribute on file input

```html
<input type="file" required accept="image/png, image/jpg" aria-label="Choose file">
```

The `accept` attribute filters the file picker to only show files of the specified MIME types:

| Value | Accepts |
|-------|---------|
| `image/png` | PNG image files |
| `image/jpg` | JPEG image files |
| `image/*` | All image types |
| `.pdf` | PDF files (extension-based) |

`accept` is a **hint to the browser** — it restricts the file picker UI but does not prevent the user from manually entering a different path, and it does not validate the file type on the server. Server-side validation of uploaded file types is always required.

---

# 20. How the Layout Changes at the Breakpoint

```
Mobile (width < 576px):
┌─────────────────────────────────────────┐  body: normal flow (no flex)
│                                         │
│  [.intro — column flex, min-h: 250px]   │
│    POWERED BY SCRIMBA  (top-text, top)  │
│    Turn your picture…  (h1)             │
│    CURRENTLY IN BETA   (beta-text)      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  [.main-content — column flex]          │
│    [avatar 120px circle]                │
│    Scrimbafy.me  (h2)                   │
│    LIVEN UP YOUR PROFILE PIC            │
│    paragraph (max-width 450px)          │
│    [ Name ——————————————————— ]         │
│    [ Email ——————————————————— ]        │
│    [ Choose file ————————————— ]        │
│    [          SUBMIT           ]        │
│    fine print                           │
│                                         │
└─────────────────────────────────────────┘

Desktop (width ≥ 576px):
┌──────────────────────┬──────────────────────────┐  body: display:flex
│  .intro              │  .main-content           │
│  width: 50%          │  width: 50%              │
│  min-height: 100vh   │  justify-content: center │
│  background: purple  │  align-items: center     │
│                      │                          │
│  POWERED BY SCRIMBA  │     [avatar 120px]       │
│  (order:-1, eyebrow) │     Scrimbafy.me         │
│                      │   LIVEN UP YOUR PIC      │
│  Turn your picture   │   paragraph text         │
│  into an iconic      │  [ Name ——————————— ]    │
│  Scrimba avatar      │  [ Email ——————————— ]   │
│  (h1: 5vw, wt: 400)  │  [ Choose file ——————]   │
│                      │  [      SUBMIT      ]    │
│  CURRENTLY IN BETA   │  fine print              │
│                      │                          │
└──────────────────────┴──────────────────────────┘
```

---

# 21. How to Run

No JavaScript, no build step, no dependencies.

1. Clone the repository:
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder:
   ```bash
   cd "06. Responsive Design/02. Build a Product Page"
   ```

3. Open `index.html` in your browser — no server required.

**Things to try:**
- Open DevTools → **Device toolbar** (Ctrl+Shift+M) — resize the viewport across 576px and watch the body switch from stacked to side-by-side
- In DevTools → **Computed** tab, select `<h1>` and watch `font-size` change as you resize the viewport (it tracks `5vw` continuously)
- Select `.intro` and temporarily change `min-height: 100vh` to `min-height: 50vh` — the panel shrinks and the content is no longer full-screen
- Remove `box-sizing: border-box` from the universal reset — notice the panels overflow past 100% width because padding is added outside the `50%` width
- Remove `order: -1` from `.top-text` — it drops back below the `<h1>` in visual order, matching the DOM order
- Tab through the form — observe the focus state (purple border + grey background) on each focused input
- Submit the form with an empty field — observe the browser's native `required` validation tooltip
- Inspect `h1` font-size in DevTools as you resize between 576px and 1200px — watch it scale fluidly with `5vw`

---

# 22. Course Reference

| Item | Detail |
|------|--------|
| Platform | [Scrimba](https://scrimba.com) |
| Course | Fullstack Web Development Path |
| Module | Responsive Design |
| Project number | 02 of the module |
| Key new concepts | `vw` / `vh` units · `body` as flex container · `min-height: 100vh` · `background-size: cover` · `text-shadow` · `text-transform` · `letter-spacing` · `order: -1` · `box-sizing: border-box` with `::before`/`::after` · `input:focus` · `font-family: inherit` · BEM-style button modifiers |
| Previous project | [01. Responsive Layouts](../01.%20Responsive%20Layouts/README.md) |
| Next project | [03. CSS Grid](../03.%20CSS%20Grid/) |
| MDN — vw / vh | [MDN — viewport units](https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-percentage_lengths) |
| MDN — background-size | [MDN — background-size](https://developer.mozilla.org/en-US/docs/Web/CSS/background-size) |
| MDN — order | [MDN — order](https://developer.mozilla.org/en-US/docs/Web/CSS/order) |
| MDN — box-sizing | [MDN — box-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) |
| MDN — :focus | [MDN — :focus](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus) |

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *A product page is not just a layout exercise — it is a lesson in how design decisions cascade through code. Every choice here is connected: `box-sizing: border-box` makes the 50/50 split possible; `flex-direction: column` makes `order` meaningful; `min-height: 100vh` makes the left panel feel intentional rather than accidental. Responsive design is not a feature you add at the end — it is the foundation every other decision is built on.*
