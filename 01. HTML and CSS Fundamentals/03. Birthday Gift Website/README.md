# 03. Birthday Gift Website
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

An interactive birthday gift webpage where hovering over a wrapped gift image reveals a hidden GIF underneath — built using CSS background images, the `:hover` pseudo-class, Flexbox `align-items`, `flex-direction`, CSS gradients, and grouped selectors.

This README is a **complete concept revision guide**. Reading it from top to bottom revises every concept introduced in this project.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [New Concepts in This Project](#3-new-concepts-in-this-project)
4. [Flexbox Deep Dive — align-items](#4-flexbox-deep-dive--align-items)
5. [flex-direction](#5-flex-direction)
6. [The :hover Pseudo-Class](#6-the-hover-pseudo-class)
7. [CSS Gradients](#7-css-gradients)
8. [CSS Grouped Selectors](#8-css-grouped-selectors)
9. [CSS Specificity — Why IDs Override Classes](#9-css-specificity--why-ids-override-classes)
10. [Using a div as an Image Container](#10-using-a-div-as-an-image-container)
11. [font-style: italic](#11-font-style-italic)
12. [border-radius: 50% for Circular Images](#12-border-radius-50-for-circular-images)
13. [How to Run](#13-how-to-run)
14. [Course Reference](#14-course-reference)

---

# 1. Project Overview

The Birthday Gift Website is a personalised webpage you can send to someone on their birthday. It features:

* A **header** with a circular profile photo, name, age, and date — laid out using `flex-direction: column` and `align-items: center`
* Multiple **gift sections**, each with a title, hint, and a wrapped gift image
* A **hover reveal effect** — hovering over the gift wrapper swaps it with a hidden GIF using `:hover` and `background-image`
* A **CSS linear-gradient background** that fades from blue to pink
* A **footer** with an italic paragraph and an external link opening in a new tab

---

# 2. Project Structure

```
03. Birthday Gift Website/
│
├── birthday.html   → HTML structure: header, gift sections, footer
├── style.css       → All CSS: layout, flexbox, hover effects, gradient
├── Birthday.jpg    → Profile photo of the birthday person
├── background.jpg  → Static background image
├── gift.jpg        → Gift cover / wrapping paper image
├── wrap1.gif       → Hidden gift GIF 1 (revealed on hover)
├── wrap2.gif       → Hidden gift GIF 2
├── wrap3.gif       → Hidden gift GIF 3
├── wrap4.gif       → Hidden gift GIF 4
└── wrap5.gif       → Hidden gift GIF 5
```

---

# 3. New Concepts in This Project

| Concept | Description |
|---------|-------------|
| `align-items` | Controls alignment along the **cross axis** in Flexbox |
| `flex-direction` | Changes the **direction** of the main axis — row or column |
| `:hover` pseudo-class | Applies CSS only when the mouse is over the element |
| Swapping `background-image` on hover | The core mechanic of the gift reveal feature |
| `linear-gradient()` | Creates a smooth color fade as a CSS background |
| Grouped selectors | Targeting multiple elements with one CSS rule using commas |
| CSS Specificity | Why ID selectors override class selectors |
| `div` as image container | Using a `div` with `background-image` instead of `<img>` |
| `font-style: italic` | Making text italic in CSS |
| `border-radius: 50%` | Making any square element perfectly circular |

---

# 4. Flexbox Deep Dive — `align-items`

## 4.1 The Two Axes of Flexbox

Flexbox always has two axes — a **main axis** and a **cross axis**. They run perpendicular to each other.

```
FLEX DIRECTION: ROW (default)

Main axis  ──────────────────────────────► (left to right)
                [item 1]  [item 2]  [item 3]
Cross axis
    │
    │
    ▼  (top to bottom)
```

```
FLEX DIRECTION: COLUMN

Main axis
    │
    │  [item 1]
    │  [item 2]
    │  [item 3]
    ▼  (top to bottom)

Cross axis ──────────────────────────────► (left to right)
```

The **main axis** always runs in the direction set by `flex-direction`.
The **cross axis** always runs perpendicular to it.

---

## 4.2 `justify-content` vs `align-items`

| Property | Controls | Default Direction (row) |
|----------|----------|------------------------|
| `justify-content` | Spacing along the **main axis** | Horizontal (left ↔ right) |
| `align-items` | Alignment along the **cross axis** | Vertical (top ↕ bottom) |

```css
.container {
  display: flex;
  flex-direction: row;       /* default */

  justify-content: center;   /* center items horizontally */
  align-items: center;       /* center items vertically */
}
```

### Common Combinations (flex-direction: row)

```css
/* Bottom-left corner */
justify-content: flex-start;
align-items: flex-end;

/* Dead center */
justify-content: center;
align-items: center;

/* Top, spread out */
justify-content: space-around;
align-items: flex-start;

/* Top-right corner */
justify-content: flex-end;
align-items: flex-start;
```

---

## 4.3 `align-items` Values

```css
align-items: flex-start;   /* push items to the START of the cross axis */
align-items: center;       /* CENTER items along the cross axis */
align-items: flex-end;     /* push items to the END of the cross axis */
align-items: stretch;      /* DEFAULT — items stretch to fill the container height */
```

---

## 4.4 Default Stretch Behaviour

When you activate Flexbox, `align-items` defaults to `stretch`. This means all flex children expand to fill the **full cross-axis size** of the container — even without an explicit height set on them.

```css
.container {
  display: flex;
  height: 200px;
  /* align-items is stretch by default */
}
/* All children stretch to fill 200px height automatically */
```

```
┌──────────────────────────────────────────────┐  200px tall
│ [   item 1    ] [   item 2    ] [  item 3   ] │  ← all stretched
└──────────────────────────────────────────────┘
```

> **Debugging tip:** If elements are unexpectedly stretching in your Flexbox layout, the culprit is almost always `align-items: stretch`. Set it to `flex-start` or `center` to fix it.

---

# 5. `flex-direction`

## 5.1 Row vs Column

```css
.container {
  display: flex;
  flex-direction: row;     /* default: items side by side, left to right */
}

.container {
  display: flex;
  flex-direction: column;  /* items stacked vertically, top to bottom */
}
```

The birthday site's header uses `flex-direction: column` so the profile photo, name, age, and date all stack vertically in one centered column:

```css
#header {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

Visual result:

```
      [ profile photo  ]
      [   Nilanchal    ]
      [ 24 years old   ]
      [ Jan 15, 2000   ]
```

Without `flex-direction: column`, all four elements would be crammed onto one horizontal line.

---

## 5.2 How Axes Flip with `flex-direction: column`

This is the most important thing to remember about `flex-direction` — **when you switch to column, the main and cross axes swap**. This means `justify-content` and `align-items` control opposite directions compared to row.

```css
/* flex-direction: row  */
justify-content: center;   /* ← horizontal */
align-items: center;       /* ← vertical */

/* flex-direction: column */
justify-content: center;   /* ← vertical  (axes flipped!) */
align-items: center;       /* ← horizontal (axes flipped!) */
```

> **Memory trick:** `justify-content` always controls the **main axis**. `align-items` always controls the **cross axis**. The axes themselves flip when `flex-direction` changes — the properties stay the same, but what they affect changes.

---

# 6. The `:hover` Pseudo-Class

## 6.1 What is a Pseudo-Class?

A **pseudo-class** is a keyword added to a CSS selector that targets an element only when it is in a **specific state** — not just when it sits on the page.

```css
selector:pseudo-class {
  /* styles applied only in this state */
}
```

Common pseudo-classes:

| Pseudo-class | When it applies |
|--------------|-----------------|
| `:hover` | Mouse cursor is over the element |
| `:focus` | An input field is clicked into / focused |
| `:active` | While a button/link is being pressed |
| `:visited` | A link that has already been clicked |
| `:first-child` | The first child element inside its parent |

---

## 6.2 Basic Hover Syntax

```css
/* Normal state */
a {
  background-color: red;
  color: white;
}

/* Hover state — only active when mouse is over the element */
a:hover {
  background-color: darkred;
}
```

Any CSS property can change on hover — background color, font size, border, transform, opacity, and more.

```css
/* Change font size on hover */
button:hover {
  font-size: 24px;
}

/* Remove border on hover */
.card:hover {
  border: none;
}

/* Swap background image on hover */
.gift-img:hover {
  background-image: url("wrap1.gif");
}
```

When the mouse enters the element's boundary → hover styles apply.
When the mouse leaves → styles revert to normal.
No JavaScript needed — this is pure CSS.

---

## 6.3 Swapping Background Images on Hover

This is the core mechanic of the birthday gift reveal. Each gift is a `<div>` styled with a **wrapping paper** background image. On hover, the background image swaps to a hidden GIF.

```css
/* Normal state — gift is wrapped */
.gift-img {
  width: 400px;
  height: 400px;
  background-image: url("gift.jpg");
  background-size: cover;
  border: 6px solid white;
  border-radius: 10px;
  margin: 0 auto;
}

/* Hover state — gift is unwrapped, GIF revealed */
#gift-img-happy:hover {
  background-image: url("wrap1.gif");
}
```

The browser instantly swaps the background image the moment the cursor crosses the element's edge — creating a seamless reveal with no JavaScript.

---

## 6.4 Why IDs Are Needed for Multiple Gift Sections

**The problem:** if all gift sections share the `.gift-img` class, a hover rule on `.gift-img:hover` applies the same GIF to every single gift on the page.

```css
/* This changes ALL gifts to the same GIF — not what we want */
.gift-img:hover {
  background-image: url("wrap1.gif");
}
```

**The solution:** keep the class for shared styling, but give each gift a **unique ID** for its individual hover rule.

```html
<div class="gift-img" id="gift-img-happy"></div>
<div class="gift-img" id="gift-img-hot"></div>
<div class="gift-img" id="gift-img-genius"></div>
<div class="gift-img" id="gift-img-badass"></div>
<div class="gift-img" id="gift-img-chairs"></div>
```

```css
/* Shared styles via class */
.gift-img {
  width: 400px;
  height: 400px;
  background-image: url("gift.jpg");
  background-size: cover;
  border: 6px solid white;
  border-radius: 10px;
  margin: 0 auto;
}

/* Each gift reveals its own unique GIF via ID */
#gift-img-happy:hover  { background-image: url("wrap1.gif"); }
#gift-img-hot:hover    { background-image: url("wrap2.gif"); }
#gift-img-genius:hover { background-image: url("wrap3.gif"); }
#gift-img-badass:hover { background-image: url("wrap4.gif"); }
#gift-img-chairs:hover { background-image: url("wrap5.gif"); }
```

Each gift now reveals its own personalised GIF while sharing all the common sizing and styling from the class.

---

# 7. CSS Gradients

## 7.1 `linear-gradient` Syntax

A gradient is a smooth, continuous color fade between two or more colors. In CSS it is created using the `linear-gradient()` function as a value for the `background` property.

```css
body {
  background: linear-gradient(blue, pink);
}
```

This fades from **blue at the top** to **pink at the bottom** — the default direction is top to bottom.

`linear-gradient()` is a **CSS function** — just like `url()`. It takes color values as arguments separated by commas.

```css
/* Two colors */
background: linear-gradient(blue, pink);

/* Three colors */
background: linear-gradient(red, yellow, green);

/* With hex codes */
background: linear-gradient(#1a1aff, #ff69b4);
```

---

## 7.2 Controlling Direction

Add a direction keyword or angle as the **first argument** to control which way the gradient flows:

```css
/* Top to bottom — default */
background: linear-gradient(to bottom, blue, pink);

/* Bottom to top */
background: linear-gradient(to top, blue, pink);

/* Left to right */
background: linear-gradient(to right, blue, pink);

/* Diagonal */
background: linear-gradient(to bottom right, blue, pink);

/* Precise angle in degrees */
background: linear-gradient(135deg, blue, pink);
```

The birthday project uses a top-to-bottom gradient on the body:

```css
body {
  background: linear-gradient(#1a1aff, #ff69b4);
}
```

This makes the page feel visually cohesive — the top is cool birthday blue and the bottom transitions into warm birthday pink.

---

# 8. CSS Grouped Selectors

The **grouped selector** lets you apply the same CSS rule to multiple different elements at once. Separate each selector with a **comma**.

```css
/* Without grouping — repetitive and hard to maintain */
h1 { text-shadow: 0 0 1px black; }
h2 { text-shadow: 0 0 1px black; }
h3 { text-shadow: 0 0 1px black; }
h4 { text-shadow: 0 0 1px black; }
p  { text-shadow: 0 0 1px black; }

/* With grouping — DRY, compact, easy to maintain */
h1, h2, h3, h4, p {
  text-shadow: 0 0 1px black;
}
```

Both produce identical output. If you later need to change the shadow, you only edit one line instead of five.

### Critical: Comma vs No Comma

```css
h1, h2 { color: white; }   /* h1 AND h2 — both get white */
h1 h2  { color: white; }   /* h2 INSIDE h1 — only nested h2 gets white */
```

Without the comma, `h1 h2` is a **descendant selector** — it targets `h2` elements that are nested inside an `h1`. Always include the comma when grouping selectors.

---

# 9. CSS Specificity — Why IDs Override Classes

**Specificity** determines which CSS rule wins when two different rules target the same element and set the same property. More specific selectors always win — regardless of where they appear in the CSS file.

### Specificity Ranking (low → high)

| Selector | Example | Priority |
|----------|---------|----------|
| Element | `div { }` | Lowest |
| Class | `.gift-img { }` | Medium |
| ID | `#gift-img-chairs { }` | High |
| Inline style | `style="height: 200px"` | Higher |
| `!important` | `height: 200px !important` | Highest (avoid) |

### Real Example from This Project

```css
/* Class rule applies to ALL .gift-img elements */
.gift-img {
  height: 400px;   /* lower specificity */
}

/* ID rule applies ONLY to #gift-img-chairs */
#gift-img-chairs {
  height: 200px;   /* higher specificity — WINS even if written first in file */
}
```

The chairs gift has a rectangular shape (200px height) instead of the standard square (400px). Even if the ID rule is written **before** the class rule in the CSS file, it still takes precedence — because IDs are more specific than classes.

> **Rule:** ID > Class > Element selector. Position in the file only acts as a tiebreaker when specificity scores are exactly equal.

---

# 10. Using a `div` as an Image Container

## 10.1 Why Replace `<img>` with a `<div>`?

The `:hover` pseudo-class can swap a CSS `background-image`. But the `<img>` tag displays its image via the `src` attribute in HTML — not through `background-image`. You cannot change `src` with a CSS hover rule.

The solution is to replace `<img>` with a `<div>` and set the image as a CSS `background-image`. Then the hover-swap is straightforward CSS:

```html
<!-- img tag — cannot swap src with CSS hover -->
<img src="gift.jpg" class="gift-img" />

<!-- div tag — background-image CAN be swapped with :hover -->
<div class="gift-img" id="gift-img-happy"></div>
```

```css
/* Default state */
.gift-img {
  background-image: url("gift.jpg");
  background-size: cover;
}

/* Hover state */
#gift-img-happy:hover {
  background-image: url("wrap1.gif");
}
```

---

## 10.2 Making the `div` Visible

A `<div>` with no content and no explicit dimensions is **invisible** — it collapses to zero height. You must give it both `width` and `height`:

```css
.gift-img {
  width: 400px;
  height: 400px;          /* required — div has no content to give it height */
  background-image: url("gift.jpg");
  background-size: cover;
}
```

Without `height: 400px`, the div renders as a zero-height invisible strip. The background image will not appear.

---

## 10.3 Centering a Block-Level `div`

`text-align: center` only centers **inline** elements. A `<div>` is a **block** element — it ignores `text-align: center` on its parent.

To center a block div, use the **margin auto technique**:

```css
.gift-img {
  width: 400px;
  height: 400px;
  margin: 0 auto;   /* 0 top/bottom, auto left/right → centered horizontally */
}
```

Three conditions must all be true:
1. Element is `display: block` — divs are block by default ✓
2. Element has a defined `width` ✓
3. Left and right margins are `auto` ✓

> **Common mistake:** Setting `display: inline` to try to center it. Inline elements ignore `width` and `height` — the div collapses to nothing since it has no text content. Stick with `margin: 0 auto`.

---

# 11. `font-style: italic`

The `font-style` property controls whether text is displayed upright or slanted:

```css
#footer {
  font-style: italic;
}
```

| Value | Effect |
|-------|--------|
| `normal` | Default upright text |
| `italic` | Uses the actual italic variant of the font |
| `oblique` | Artificially slants the regular font |

The footer paragraph uses `italic` to visually distinguish it from the rest of the birthday page content — a subtle design cue that it's secondary/supporting information.

---

# 12. `border-radius: 50%` for Circular Images

Any element can be made perfectly circular by setting `border-radius` to `50%`:

```css
#bff-img {
  width: 150px;
  height: 150px;      /* must equal width for a perfect circle */
  border-radius: 50%;
  border: 6px solid #ff69b4;
}
```

`border-radius: 50%` means: round each corner by 50% of the element's size — half the width and half the height. On a perfect square, this creates a perfect circle.

```
border-radius: 0      →  □  square
border-radius: 10px   →  ▢  slightly rounded corners
border-radius: 30px   →  ▣  more rounded
border-radius: 50%    →  ○  perfect circle (on a square element)
```

> **Important:** The element must be **square** (equal width and height). On a rectangle, `border-radius: 50%` creates an oval/ellipse, not a circle.

---

# 13. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder
   ```bash
   cd "03. Birthday Gift Website"
   ```

3. Open `birthday.html` in your browser or use **Live Server** in VS Code.

4. Hover over any gift image to see the reveal animation.

---

# 14. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Birthday Gift Website
* **YouTube Timestamp:** ~04:17:21
* **Official Challenge Code:** [github.com/scrimba/learn-fullstack](https://github.com/scrimba/learn-fullstack-development)

---

# Author

**Nilanchal Jena**
GitHub: https://github.com/Nilanchal0107
