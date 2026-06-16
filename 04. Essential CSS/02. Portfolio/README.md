# Sophie — Essential CSS Portfolio
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Essential-blue?style=flat-square&logo=css3)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Roboto-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A personal portfolio landing page for a graphic designer — the **CSS Fundamentals Challenges (Build a Portfolio)** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every CSS technique introduced in this module through a series of incremental challenges, and compare new patterns against what was seen in the previous NFT Site project.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [How This Project Differs From the NFT Site](#3-how-this-project-differs-from-the-nft-site)
4. [Challenge Breakdown — What Each Step Builds](#4-challenge-breakdown--what-each-step-builds)
5. [Setting Up the Layout](#5-setting-up-the-layout)
   - [The `<DOCTYPE>` and `<title>` Tag](#51-the-doctype-and-title-tag)
   - [Linking a CSS File from a Subdirectory](#52-linking-a-css-file-from-a-subdirectory)
   - [The Container Pattern](#53-the-container-pattern)
6. [Google Fonts — Challenge #2](#6-google-fonts--challenge-2)
   - [Loading Fonts Without `preconnect`](#61-loading-fonts-without-preconnect)
   - [`font-weight: 300` — Light Weight](#62-font-weight-300--light-weight)
7. [Setting Up the Typography — Challenge #3](#7-setting-up-the-typography--challenge-3)
   - [`text-align: center`](#71-text-align-center)
   - [`font-size` on headings](#72-font-size-on-headings)
   - [Overriding inherited `font-weight`](#73-overriding-inherited-font-weight)
8. [Making Things a Little More Fancy — Challenge #4](#8-making-things-a-little-more-fancy--challenge-4)
   - [`<span>` and Inline Styling](#81-span-and-inline-styling)
   - [The `.accent-text` Pattern](#82-the-accent-text-pattern)
9. [Breathing Room — Challenge #5](#9-breathing-room--challenge-5)
   - [Section and Header Padding](#91-section-and-header-padding)
   - [`margin-top: 0` on Headings](#92-margin-top-0-on-headings)
   - [`margin-bottom` Control](#93-margin-bottom-control)
10. [Playing with Colors — Challenge #6](#10-playing-with-colors--challenge-6)
    - [The `.inverse` Class Pattern](#101-the-inverse-class-pattern)
    - [Multiple Classes on One Element](#102-multiple-classes-on-one-element)
11. [The Finer Details — Challenge #7](#11-the-finer-details--challenge-7)
    - [`border-top` and `border-bottom`](#111-border-top-and-border-bottom)
    - [`border` Shorthand](#112-border-shorthand)
    - [The `.small-text` Utility Class](#113-the-small-text-utility-class)
12. [Creating Buttons — Challenge #8](#12-creating-buttons--challenge-8)
    - [The `.btn` Class](#121-the-btn-class)
    - [`margin-top` on Buttons](#122-margin-top-on-buttons)
    - [`:focus` Pseudo-class (New Here)](#123-focus-pseudo-class-new-here)
13. [Fancier Headings — Challenge #9](#13-fancier-headings--challenge-9)
    - [`h3` Heavy Weight](#131-h3-heavy-weight)
    - [`margin-bottom: 0` to Remove Gap](#132-margin-bottom-0-to-remove-gap)
14. [Working with What You Have — Challenge #10](#14-working-with-what-you-have--challenge-10)
    - [The `<article>` Element](#141-the-article-element)
    - [The `<time>` Element and `datetime` Attribute](#142-the-time-element-and-datetime-attribute)
    - [The `.name` Class for Inline Emphasis](#143-the-name-class-for-inline-emphasis)
15. [New CSS Properties Summary](#15-new-css-properties-summary)
16. [HTML Structure Recap](#16-html-structure-recap)
17. [How to Run](#17-how-to-run)
18. [Course Reference](#18-course-reference)

---

# 1. Project Overview

This project is a minimal portfolio page for a fictional graphic designer named Sophie. The page includes:

* A **header** (dark/inverse) with a large `h1` greeting and a portrait image
* An **About Me section** (light background) with an `h2`, a bio paragraph, and a call-to-action button
* An **Articles section** (dark/inverse) featuring the most recent article with a title, author metadata, an excerpt, and a "See all my work" button

The page is built incrementally through **10 challenges**, each focusing on one specific CSS concept. By Challenge #10, all the pieces come together into a polished, centred, typographically refined portfolio page.

---

# 2. Project Structure

```
04. Essential CSS/
│
└── 02. Portfolio/
    ├── index.html      → HTML structure: header, two sections, article
    ├── css/
    │   └── style.css   → All styling: typography, layout, colours, buttons
    └── img/
        └── sophie.png  → Portrait image used in the header
```

> **Note:** The CSS is in a subdirectory (`css/style.css`) unlike the NFT site where it was in the root. This introduces the concept of relative paths in `<link>` tags.

---

# 3. How This Project Differs From the NFT Site

| Feature | NFT Site | Portfolio |
|---------|----------|-----------|
| CSS location | Root (`index.css`) | Subdirectory (`css/style.css`) |
| Google Fonts link | 3 tags (with `preconnect`) | 1 tag (simpler import) |
| Font weights imported | `400`, `500`, `700` | `300`, `900` (extremes only) |
| Button system | 3 variants (`.btn-dark`, `.btn-mid`, `.btn-light`) | 1 universal `.btn` class |
| Section theming | Separate colour per section | `.inverse` modifier class applied where needed |
| `<article>` element | Not used | Introduced here |
| `<time>` element | Not used | Introduced here |
| `<span>` accent pattern | Not used | `.accent-text` class introduced |
| `border` on headings | Not used | `border-top` + `border-bottom` on `h2` |
| `:focus` pseudo-class | Not used | Added alongside `:hover` |
| `font-weight: 300` (light) | Not used | Used as default body weight |

---

# 4. Challenge Breakdown — What Each Step Builds

The portfolio is built across 10 incremental challenges on Scrimba. Each challenge adds one focused concept:

| Challenge | Topic | What it Does |
|-----------|-------|-------------|
| #1 | Setting up the layout | Link CSS, set up container, basic structure |
| #2 | Google fonts | Load Roboto, apply `font-family` and `font-weight` |
| #3 | Setting up the typography | `text-align`, `font-size` on headings |
| #4 | Making things a little more fancy | `<span>` + `.accent-text` for highlighted words |
| #5 | Breathing room | `padding` on sections, `margin-top: 0` on headings |
| #6 | Playing with colors | `.inverse` class for dark sections |
| #7 | The finer details | `border` on `h2`, `.small-text` utility class |
| #8 | Creating buttons | `.btn` class, `:focus` pseudo-class |
| #9 | Fancier headings | Heavy `font-weight: 900` on `h3` |
| #10 | Working with what you have | `<article>`, `<time>`, `.name` inline class |

---

# 5. Setting Up the Layout

## 5.1 The `<!DOCTYPE>` and `<title>` Tag

```html
<!DOCTYPE html>
<html>
    <head>
        <title>HTML & CSS Fundamentals | Challenges</title>
        ...
    </head>
```

| Tag | Purpose |
|-----|---------|
| `<!DOCTYPE html>` | Tells the browser to render the page in **HTML5 standards mode** (not quirks mode). Always the first line of an HTML file. |
| `<title>` | Sets the text shown in the browser **tab** and in search engine results. Not visible on the page itself. |

> The NFT Site project was missing `<!DOCTYPE html>` — this portfolio corrects that. Without it, some browsers enter "quirks mode" where CSS layout can behave unexpectedly.

---

## 5.2 Linking a CSS File from a Subdirectory

```html
<!-- CSS is in a subfolder — path includes the folder name -->
<link href="css/style.css" rel="stylesheet">
```

Compare to the NFT Site (CSS in the root):
```html
<link rel="stylesheet" href="index.css">
```

The `href` value is a **relative path** — relative to the location of `index.html`. Since `index.html` is in `02. Portfolio/` and the CSS is in `02. Portfolio/css/`, the path is `css/style.css`.

| Path | Meaning |
|------|---------|
| `style.css` | Same folder as `index.html` |
| `css/style.css` | Inside a `css` subfolder |
| `../style.css` | Up one folder level |
| `/style.css` | From the root of the server |

---

## 5.3 The Container Pattern

```css
.container {
    width: 570px;
    margin: 0 auto;
}
```

```html
<header class="inverse">
    <div class="container">
        <h1>Hello, my name is <span class="accent-text">Sophie</span></h1>
        <img src="img/sophie.png" alt="portrait of Sophie">
    </div>
</header>
```

This is the same pattern from the NFT Site, but with a narrower `570px` width (vs `620px` in the NFT site). The principle is identical:

1. The **outer element** (`<header>`) spans full width and holds the background colour
2. The **`.container` div** inside constrains the content to a readable column
3. `margin: 0 auto` centres the container horizontally

This two-layer structure — full-width wrapper + fixed-width inner container — is one of the most common CSS layout patterns in professional development.

---

# 6. Google Fonts — Challenge #2

## 6.1 Loading Fonts Without `preconnect`

```html
<!-- Portfolio — single tag, no preconnect -->
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;900&display=swap" rel="stylesheet">
```

Compare to the NFT Site:
```html
<!-- NFT Site — three tags with preconnect for performance -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
```

Both approaches load the font correctly. The difference:

| Approach | Performance | Complexity |
|----------|------------|------------|
| Single `<link>` | Slightly slower — browser discovers the font servers only when it reads the `<link>` tag | Simpler — one line |
| With `preconnect` | Faster — browser begins DNS + TCP handshake to font servers immediately, before parsing the `<link>` | Three lines |

For a learning project, the single tag is fine. For production, use `preconnect`.

---

## 6.2 `font-weight: 300` — Light Weight

```css
body {
    font-weight: 300;
}
```

This project imports **only** `wght@300;900` — two extreme weights:

| Weight | Name | Use in this project |
|--------|------|---------------------|
| `300` | Light | Body text, `h1`, `h2` — intentionally thin and elegant |
| `900` | Black/Heavy | `h3` and links — creates strong contrast with light body text |

Setting `font-weight: 300` on `body` means all text inherits a light, airy feel. The heavy `900` weight is applied selectively as an accent, creating a typographic hierarchy using weight alone — without relying on size differences.

> This is a deliberate design choice: using **weight contrast** (300 vs 900) rather than **size contrast** as the primary way to show hierarchy. It gives the portfolio a refined, editorial feel.

---

# 7. Setting Up the Typography — Challenge #3

## 7.1 `text-align: center`

```css
body {
    text-align: center;
}
```

Setting `text-align: center` on `body` centres **all inline content** on the page — text, inline-block buttons, and images. Because `text-align` is inherited, every child element inherits this value unless it overrides it.

| `text-align` value | Effect |
|--------------------|--------|
| `left` | Default — text aligns to left edge |
| `center` | Text centred within the element |
| `right` | Text aligns to right edge |
| `justify` | Lines stretch to fill full width (newspaper style) |

> Centring via `text-align: center` on `body` is appropriate for a portfolio with a single-column, centred layout. It does not centre block-level elements like `<div>` — only inline content within them.

---

## 7.2 `font-size` on Headings

```css
body { font-size: 21px; }   /* Base — larger than the browser default 16px */
h1   { font-size: 60px; }   /* Hero heading — very large */
h2   { font-size: 42px; }   /* Section headings */
h3   { font-size: 36px; }   /* Article heading */
```

The browser has default sizes for headings (`h1` = `2em`, `h2` = `1.5em`, etc.), but setting explicit `px` values gives exact, design-specified control.

### Heading Hierarchy

```
h1: 60px  ← Most important — your name / main message
h2: 42px  ← Section title
h3: 36px  ← Sub-section / article title
p:  21px  ← Body text (base size)
.small-text: 16px  ← Meta information (author, date)
```

Good heading hierarchy serves both **design** (visual rhythm) and **accessibility** (screen readers use heading levels to let users navigate the page structure).

---

## 7.3 Overriding Inherited `font-weight`

```css
/* Set globally on body */
body {
    font-weight: 300;
}

/* Override for h1 and h2 — keep them light too */
h1, h2 {
    font-weight: 300;
}

/* Override for h3 and links — make them heavy */
h3 {
    font-weight: 900;
}
a {
    font-weight: 900;
}
```

By default, browsers apply `font-weight: bold` (equivalent to `700`) to heading elements. Since `body` sets `font-weight: 300`, you might expect headings to inherit it — but browsers override inherited values with their own **user-agent stylesheet** rules for headings.

To keep `h1` and `h2` at weight `300`, you must **explicitly set** `font-weight: 300` on them, overriding the browser default.

---

# 8. Making Things a Little More Fancy — Challenge #4

## 8.1 `<span>` and Inline Styling

```html
<h1>Hello, my name is <span class="accent-text">Sophie</span></h1>
<h2>I am a <span class="accent-text">graphic designer</span></h2>
<h2>My most recent <span class="accent-text">article</span></h2>
```

`<span>` is an **inline, non-semantic container** — it wraps a portion of text *within* a line without breaking the flow. It has no visual effect by default; its power comes from being a hook for CSS classes.

| Element | Display | Semantic meaning | Use case |
|---------|---------|-----------------|----------|
| `<div>` | Block | None | Wraps block-level content for styling/layout |
| `<span>` | Inline | None | Wraps inline text for styling |
| `<strong>` | Inline | Important | Bold with semantic meaning |
| `<em>` | Inline | Emphasis | Italic with semantic meaning |

---

## 8.2 The `.accent-text` Pattern

```css
/* Not shown in the final CSS — but the concept is: */
.accent-text {
    color: #99D930;   /* Lime green — the accent colour of the design */
}
```

`.accent-text` is a **utility class** — a single-purpose class that does one specific thing (applies the accent colour). It is applied to `<span>` elements inside headings to highlight key words without wrapping the entire heading.

This is the same pattern used by `font-weight: 900` on links and `h3` — using a single consistent accent colour (`#99D930` lime green) and a single heavy weight to signal importance.

---

# 9. Breathing Room — Challenge #5

## 9.1 Section and Header Padding

```css
header, section {
    padding: 100px 0;
}
```

Each section gets `100px` of vertical padding — generous whitespace above and below the content. This is a common technique in portfolio and landing page design: large whitespace signals confidence and lets content breathe.

Compare to the NFT Site:
```css
header, section, footer {
    padding: 45px 0;
}
```

The portfolio uses more than double the vertical padding (`100px` vs `45px`), giving it a more spacious, premium feel.

---

## 9.2 `margin-top: 0` on Headings

```css
h1 { margin-top: 0; }
h2 { margin-top: 0; }
```

Browsers apply a default `margin` to heading elements. When a heading is the first element inside a padded container, its top margin **adds to** the container's top padding — creating more space than intended at the top.

Setting `margin-top: 0` removes this extra gap so the heading starts exactly where the container's `padding-top` ends.

```
Without margin-top: 0:
┌──────────────────────────┐
│ padding-top: 100px       │
│ [h1 margin-top: ~21px]   │  ← extra gap
│ Hello, my name is Sophie │

With margin-top: 0:
┌──────────────────────────┐
│ padding-top: 100px       │
│ Hello, my name is Sophie │  ← starts exactly here
```

---

## 9.3 `margin-bottom` Control

```css
h2 {
    margin-bottom: 20px;
    padding: 20px 0;
}

h3 {
    margin-bottom: 0;
}

p {
    margin-bottom: 0;
}
```

Fine-tuning `margin-bottom` on specific elements controls the spacing rhythm between elements:

- `h2` gets `margin-bottom: 20px` to create breathing room between the heading and the paragraph below it
- `h3` gets `margin-bottom: 0` so the article title sits directly above the author meta line (`.small-text`)
- `p` gets `margin-bottom: 0` so paragraphs don't create excess space at the bottom before buttons

> **Margin collapsing:** When two block elements are stacked vertically, their margins *collapse* — the space between them equals the larger of the two margins, not their sum. Setting `margin-bottom: 0` on `p` and `margin-top: 25px` on `.btn` means the space between them is exactly `25px`.

---

# 10. Playing with Colors — Challenge #6

## 10.1 The `.inverse` Class Pattern

```css
.inverse {
    color: #fff;
    background: #252525;
}
```

```html
<header class="inverse"> ... </header>
<section class="articles inverse"> ... </section>
```

`.inverse` is a **theme modifier class** — when applied to a section, it flips the colour scheme from light (white background, dark text) to dark (near-black background, white text).

This is more elegant than writing separate rules for `header` and `.articles`:

```css
/* ❌ Less flexible — rules tied to specific elements */
header         { background: #252525; color: #fff; }
.articles      { background: #252525; color: #fff; }

/* ✅ More flexible — one class, applied anywhere */
.inverse       { background: #252525; color: #fff; }
```

---

## 10.2 Multiple Classes on One Element

```html
<section class="articles inverse">
```

The `articles` section has **two classes**:
- `.articles` — provides structure styles specific to the articles section
- `.inverse` — provides the dark colour theme

This demonstrates that an element can carry as many classes as needed. Each class is processed independently, and their styles are combined on the element.

| Class | Responsibility |
|-------|---------------|
| `.articles` | Semantically identifies this as the articles section |
| `.inverse` | Applies the dark colour scheme |

This is similar to the **modifier pattern** from the NFT site's button system (`.btn-dark`, `.btn-mid`, `.btn-light`) — one class for the base, one for the variant.

---

# 11. The Finer Details — Challenge #7

## 11.1 `border-top` and `border-bottom`

```css
h2 {
    border-top: solid 1px #c4c4c4;
    border-bottom: solid 1px #c4c4c4;
    padding: 20px 0;
    margin-bottom: 20px;
}
```

This gives each `h2` a pair of thin horizontal rules — a classic typographic technique that separates the section heading from the surrounding content.

**Why also add `padding: 20px 0` to `h2`?**

Without padding, the border would touch the text:
```
──────────────────    ← border-top
I am a graphic designer   ← text immediately below border
──────────────────    ← border-bottom
```

With `padding: 20px 0`:
```
──────────────────    ← border-top
                      ← 20px gap
I am a graphic designer
                      ← 20px gap
──────────────────    ← border-bottom
```

The `border` sits at the edge of the element's border-box. `padding` creates space between the border and the content inside.

---

## 11.2 `border` Shorthand

```css
border-top: solid 1px #c4c4c4;
```

`border` (and its directional variants) is a shorthand for three sub-properties:

```
border-top:  solid     1px       #c4c4c4;
             ↑         ↑         ↑
        border-style  border-width  border-color
```

| Property | Values |
|----------|--------|
| `border-style` | `solid`, `dashed`, `dotted`, `double`, `none` |
| `border-width` | Any length unit — `1px`, `2px`, `0.5rem` |
| `border-color` | Any colour value — hex, named, `rgba` |

Directional variants:
```css
border-top:    ...   /* Top side only */
border-bottom: ...   /* Bottom side only */
border-left:   ...   /* Left side only */
border-right:  ...   /* Right side only */
border:        ...   /* All four sides */
```

---

## 11.3 The `.small-text` Utility Class

```css
.small-text {
    font-size: 16px;
    margin-top: 5px;
}
```

```html
<p class="small-text">Written by <span class="name">Sophie</span> on <time datetime="2020-06-19">June 19, 2020</time></p>
```

`.small-text` is a utility class that reduces the font size of the author/date metadata to `16px` — smaller than the `21px` body default — to signal that this is secondary, supporting information rather than primary content.

The `margin-top: 5px` gives a small gap between the `h3` heading (which has `margin-bottom: 0`) and the author line.

---

# 12. Creating Buttons — Challenge #8

## 12.1 The `.btn` Class

```css
.btn {
    display: inline-block;
    color: #252525;
    text-decoration: none;
    background: #99D930;
    padding: 10px 25px;
    margin-top: 25px;
}
```

This project uses a **single button class** — unlike the NFT site's three-variant system (`.btn-dark`, `.btn-mid`, `.btn-light`). Because the design has one accent colour, one button style is sufficient.

The recipe is identical to the NFT site:

| Property | Purpose |
|----------|---------|
| `display: inline-block` | Allows `padding` to work correctly on an `<a>` element |
| `text-decoration: none` | Removes the default underline from `<a>` |
| `color: #252525` | Overrides the inherited link colour from `a { color: #99D930 }` |
| `background: #99D930` | Lime-green button fill |
| `padding: 10px 25px` | Inner spacing: 10px top/bottom, 25px left/right |
| `margin-top: 25px` | Pushes the button away from the paragraph above it |

---

## 12.2 `margin-top` on Buttons

```css
.btn {
    margin-top: 25px;
}
```

Since `p { margin-bottom: 0 }`, there is no gap between the paragraph and the button. `margin-top: 25px` on `.btn` creates that gap — keeping the spacing definition on the button itself rather than requiring `margin-bottom` on every preceding paragraph.

This is a deliberate spacing strategy: the element that *needs* space from its predecessor owns that margin.

---

## 12.3 `:focus` Pseudo-class (New Here)

```css
a:hover, a:focus {
    color: #131313;
}

.btn:hover, .btn:focus {
    background: #252525;
    color: #fff;
}
```

The NFT site only handled `:hover`. This project adds `:focus` — a new pseudo-class not seen before.

| Pseudo-class | When it applies |
|--------------|----------------|
| `:hover` | Mouse cursor is positioned over the element |
| `:active` | Element is actively being clicked |
| `:focus` | Element has keyboard focus (user pressed `Tab` to reach it) |

**Why `:focus` matters:**

Keyboard users navigate interactive elements using `Tab`. When a link or button receives keyboard focus, it must have a visible focus style — otherwise keyboard-only users have no way of knowing where they are on the page. By setting the same style for both `:hover` and `:focus`, the button gives the same visual feedback for both mouse and keyboard interactions.

> `:focus` is the keyboard equivalent of `:hover`. Any interactive element that has a `:hover` style should also have a matching `:focus` style. Never suppress the browser's default focus outline without providing an alternative.

---

# 13. Fancier Headings — Challenge #9

## 13.1 `h3` Heavy Weight

```css
h3 {
    font-size: 36px;
    font-weight: 900;
    margin-bottom: 0;
}
```

The `h3` is the article title: "Design systems that scale". Using `font-weight: 900` (the heaviest available weight in the imported Roboto font) makes it visually stand out from the light `300` weight used everywhere else — even though it is smaller than the `h2`.

This creates a **typographic contrast** between weight and size:

```
h2: "My most recent article"  → 42px, weight 300 (light, elegant)
h3: "Design systems that scale" → 36px, weight 900 (heavy, impactful)
```

The `h3` appears smaller but heavier — making it feel like a strong, confident label rather than a structural heading.

---

## 13.2 `margin-bottom: 0` to Remove Gap

```css
h3 {
    margin-bottom: 0;
}
```

Without this, the browser's default `margin-bottom` on `h3` would create a gap between the article title and the author line below it. Removing it allows `.small-text { margin-top: 5px }` to control the exact gap — a tight `5px` — making the author line feel like a caption directly attached to the title.

---

# 14. Working with What You Have — Challenge #10

## 14.1 The `<article>` Element

```html
<section class="articles inverse">
    <div class="container">
        <h2>My most recent <span class="accent-text">article</span></h2>
        <article>
            <h3>Design systems that scale</h3>
            <p class="small-text">Written by <span class="name">Sophie</span> on <time datetime="2020-06-19">June 19, 2020</time></p>
            <p>Ultricies morbi urna... <a href="#">continue reading</a></p>
            <a href="#" class="btn">See all my work</a>
        </article>
    </div>
</section>
```

`<article>` is a semantic HTML element that marks a **self-contained piece of content** that could stand alone — a blog post, a news item, a forum post, or a product card.

| Element | Use when... |
|---------|-------------|
| `<section>` | Content is part of the page — thematic group within the page |
| `<article>` | Content is self-contained — could be syndicated or shared independently |
| `<div>` | No semantic meaning — purely for layout/styling |

An `<article>` inside a `<section>` is correct: the section groups "recent articles" as a page topic; the article element wraps the actual independent piece of content.

---

## 14.2 The `<time>` Element and `datetime` Attribute

```html
<time datetime="2020-06-19">June 19, 2020</time>
```

`<time>` marks up dates and times. It has two parts:

| Part | Purpose |
|------|---------|
| `datetime="2020-06-19"` | Machine-readable ISO format — used by search engines and screen readers |
| `June 19, 2020` (inner text) | Human-readable format — what users see |

The `datetime` attribute uses the ISO 8601 format: `YYYY-MM-DD`.

> Without `<time>`, a search engine or calendar app has no way to know "June 19, 2020" is a date. With `<time datetime="2020-06-19">`, the machine can parse and index it correctly.

---

## 14.3 The `.name` Class for Inline Emphasis

```html
<p class="small-text">Written by <span class="name">Sophie</span> on ...</p>
```

```css
/* Implied by the design — .name uses the inherited font-weight: 900 from 'a' or
   could be explicitly set as its own rule for the author name span */
```

The `.name` class wraps the author name inline, allowing it to be styled differently from the surrounding `.small-text` paragraph. In this project it inherits the heavy weight that could be applied to distinguish the name — a simple pattern that shows how `<span>` + a class lets you style individual words without breaking the paragraph structure.

---

# 15. New CSS Properties Summary

All CSS properties introduced in this project that were **not in the NFT Site**:

| Property | Where Used | Purpose |
|----------|------------|---------|
| `font-weight: 300` | `body`, `h1`, `h2` | Light, elegant typographic weight |
| `font-weight: 900` | `h3`, `a` | Heavy weight for contrast and emphasis |
| `border-top` | `h2` | Horizontal rule above the heading |
| `border-bottom` | `h2` | Horizontal rule below the heading |
| `a:focus` | Links and `.btn` | Keyboard focus style — matches `:hover` |
| `margin-top` (on `.btn`) | `.btn` | Space above buttons |
| `margin-top: 5px` | `.small-text` | Small gap below `h3` |
| `text-align: center` on `body` | `body` | Centres all inline content globally |
| `font-size: 21px` on `body` | `body` | Larger base size than browser default `16px` |

---

# 16. HTML Structure Recap

```
<!DOCTYPE html>
<html>
├── <head>
│   ├── <title>HTML & CSS Fundamentals | Challenges</title>
│   ├── <link href="https://fonts.googleapis.com/...">   → Google Fonts
│   └── <link href="css/style.css">                      → Stylesheet
│
└── <body>
    │
    ├── <header class="inverse">                         ← Dark theme
    │   └── <div class="container">
    │       ├── <h1>Hello, my name is <span class="accent-text">Sophie</span></h1>
    │       └── <img src="img/sophie.png" alt="portrait of Sophie">
    │
    ├── <section class="about-me">                       ← Light theme
    │   └── <div class="container">
    │       ├── <h2>I am a <span class="accent-text">graphic designer</span></h2>
    │       ├── <p>Bio paragraph...</p>
    │       └── <a href="#" class="btn">See my work</a>
    │
    └── <section class="articles inverse">               ← Dark theme
        └── <div class="container">
            ├── <h2>My most recent <span class="accent-text">article</span></h2>
            └── <article>
                ├── <h3>Design systems that scale</h3>
                ├── <p class="small-text">
                │   Written by <span class="name">Sophie</span> on
                │   <time datetime="2020-06-19">June 19, 2020</time>
                │   </p>
                ├── <p>Excerpt... <a href="#">continue reading</a></p>
                └── <a href="#" class="btn">See all my work</a>
```

### Semantic Landmark Elements

| Element | ARIA Role | Purpose in This Page |
|---------|-----------|----------------------|
| `<header>` | `banner` | Site-wide header with Sophie's name and photo |
| `<section class="about-me">` | `region` | About Me content block |
| `<section class="articles">` | `region` | Articles content block |
| `<article>` | `article` | Self-contained article preview |
| `<time>` | — | Machine-readable date |

---

# 17. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder
   ```bash
   cd "04. Essential CSS/02. Portfolio"
   ```

3. Open `index.html` in your browser or use **Live Server** in VS Code.

4. **Things to explore:**
   - Press `Tab` on page load to keyboard-navigate — notice the `.btn:focus` style activates just like `:hover`
   - In DevTools, toggle `font-weight: 300` on `body` to see how dramatically weight affects the page feel
   - Toggle `text-align: center` on `body` — watch the entire layout shift to left-aligned instantly
   - In DevTools, remove `border-top` and `border-bottom` from `h2` to see how much the horizontal rules add to the design
   - Inspect the `<time>` element and toggle the `datetime` attribute to understand its purpose

---

# 18. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Essential CSS Module → CSS Fundamentals Challenges (Build a Portfolio)
* **Topics Covered:** `<!DOCTYPE html>` · `<title>` · CSS in subdirectory · `font-family` · `font-weight` (light + heavy) · `font-size` · `text-align` · `line-height` · `margin-top: 0` · `margin-bottom` · `padding` · `border-top` / `border-bottom` · `.inverse` theme class · multiple classes · `<span>` + `.accent-text` · `display: inline-block` · `:hover` · `:focus` · `.btn` class · `<article>` · `<time>` + `datetime` · utility classes
* **Reference Docs:**
  - [MDN — `<article>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article)
  - [MDN — `<time>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time)
  - [MDN — `border`](https://developer.mozilla.org/en-US/docs/Web/CSS/border)
  - [MDN — `:focus`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus)
  - [MDN — font-weight](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight)

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *Typography is 95% of web design. Before you reach for layout tools or colour systems, get the type right — the weight, the size, the spacing. This portfolio proves it: a compelling page built with nothing more than font choices, whitespace, and a single accent colour.*
