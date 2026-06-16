# 01. Business Card
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A personal digital business card webpage — the first major project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every concept learned while building this project.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [HTML Concepts](#3-html-concepts)
   - [HTML Tags & Syntax](#31-html-tags--syntax)
   - [Headings](#32-headings)
   - [Paragraphs](#33-paragraphs)
   - [Images & Alt Text](#34-images--alt-text)
   - [Anchor Tags (Links)](#35-anchor-tags-links)
   - [Lists](#36-lists)
   - [Buttons & Input Fields](#37-buttons--input-fields)
   - [Nesting & Divs](#38-nesting--divs)
   - [HTML Document Structure](#39-html-document-structure)
   - [File Paths](#310-file-paths)
4. [CSS Concepts](#4-css-concepts)
   - [CSS Syntax & Selectors](#41-css-syntax--selectors)
   - [Classes & Utility Classes](#42-classes--utility-classes)
   - [Colors & Hex Codes](#43-colors--hex-codes)
   - [Block vs Inline Elements](#44-block-vs-inline-elements)
   - [The Box Model](#45-the-box-model)
   - [Margin](#46-margin)
   - [Padding](#47-padding)
   - [Border & Border Radius](#48-border--border-radius)
   - [Centering Elements](#49-centering-elements)
   - [Flexbox](#410-flexbox)
   - [CSS Inheritance](#411-css-inheritance)
   - [Fonts & Font Stacks](#412-fonts--font-stacks)
   - [Margin & Padding Shorthand](#413-margin--padding-shorthand)
5. [How to Run](#5-how-to-run)
6. [Deployment](#6-deployment)
7. [Course Reference](#7-course-reference)

---

# 1. Project Overview

The Business Card project is a static webpage that displays:

* A personal profile photo (avatar)
* Name as a heading
* Job title as a paragraph
* Location
* A list of fun facts
* A LinkedIn link
* A newsletter signup input and button

The goal was to build a two-column card layout — image on the left, text on the right — styled with a custom color palette, web-safe font, flexbox, and the CSS box model.

---

# 2. Project Structure

```
01. Business Card/
│
├── index.html      → HTML structure of the entire card
├── styles.css      → All CSS: layout, colors, fonts, spacing
└── Avatar.jpeg     → Personal profile photo used in the card
```

---

# 3. HTML Concepts

## 3.1 HTML Tags & Syntax

HTML uses **tags** to define elements on a page. Tags come in pairs — an **opening tag** and a **closing tag**.

```html
<h1>Hello World</h1>
```

* `<h1>` is the opening tag
* `</h1>` is the closing tag (note the `/`)
* The content goes between them

Some tags are **self-closing** — they don't need a closing tag:

```html
<img src="avatar.jpeg" alt="My photo" />
<input type="text" />
```

---

## 3.2 Headings

HTML has 6 heading levels: `<h1>` through `<h6>`.

* `<h1>` is the largest and most prominent — used for the main title
* `<h2>` is slightly smaller — used for subheadings
* `<h3>`, `<h4>`, etc. get progressively smaller

```html
<h1>Nilanchal Jena</h1>
<h3>Frontend Developer</h3>
<h4>Bhubaneswar, India</h4>
```

> Rule of thumb: Only use one `<h1>` per page. It signals to the browser (and Google) what the page is about.

---

## 3.3 Paragraphs

The `<p>` tag is used for regular body text.

```html
<p>Connect with me on <a href="#">LinkedIn</a></p>
```

Unlike headings, paragraphs don't have visual size hierarchy — they are plain text.

---

## 3.4 Images & Alt Text

The `<img>` tag embeds an image. It is a **self-closing tag** with two key attributes:

* `src` — the path to the image file
* `alt` — a text description of the image (alternative text)

```html
<img
  src="Avatar.jpeg"
  alt="Nilanchal smiling at the camera"
  class="avatar"
/>
```

### Why Alt Text Matters

* **Accessibility** — Screen readers read the alt text aloud for visually impaired users
* **Fallback** — If the image fails to load, the alt text is shown instead
* **SEO** — Google uses alt text to understand image content, which helps with rankings

### How to Write Good Alt Text

* Do NOT write "image of..." — the screen reader already knows it's an image
* Keep it under 125 characters
* Describe the intent and content of the image as if you were describing it over the phone

```html
<!-- Bad -->
<img alt="image" />

<!-- Good -->
<img alt="Nilanchal smiling at the camera with a colorful background" />
```

---

## 3.5 Anchor Tags (Links)

The `<a>` tag creates a clickable hyperlink. The destination URL is set using the `href` attribute (short for **hypertext reference**).

```html
<a href="https://linkedin.com/in/nilanchal">LinkedIn</a>
```

### Linking to Another Page in the Same Project

```html
<a href="work.html">See my work</a>
```

### Inline Links (inside a paragraph)

You can nest an anchor tag inside a paragraph so only part of the text becomes a link:

```html
<p>Connect with me on <a href="https://linkedin.com">LinkedIn</a></p>
```

### Opening in a New Tab

Use the `target="_blank"` attribute:

```html
<a href="https://linkedin.com" target="_blank">LinkedIn</a>
```

> `target="_blank"` is a cryptic but standard way to tell the browser to open the link in a new tab.

---

## 3.6 Lists

HTML has two types of lists:

### Ordered List `<ol>` — numbered

```html
<ol>
  <li>Norway</li>
  <li>Germany</li>
  <li>China</li>
</ol>
```

### Unordered List `<ul>` — bullet points

```html
<ul>
  <li>I love coding</li>
  <li>I play guitar</li>
  <li>I enjoy hiking</li>
</ul>
```

* `<ul>` or `<ol>` wraps the entire list
* `<li>` (list item) wraps each individual item

> Unordered lists are used everywhere on the web — navbars are often built as styled `<ul>` lists.

---

## 3.7 Buttons & Input Fields

### Button

```html
<button>Join Newsletter</button>
```

A button renders a clickable element. Without JavaScript, it doesn't do anything — JS is needed to give it functionality.

### Input Field

The `<input>` tag is a self-closing tag that creates an interactive form element. Its behavior is controlled by the `type` attribute.

```html
<!-- Text input -->
<input type="text" placeholder="Enter your email" />

<!-- Password (masked) -->
<input type="password" placeholder="Enter password" />

<!-- File upload -->
<input type="file" />

<!-- Date picker -->
<input type="date" />

<!-- Color picker -->
<input type="color" />
```

* `placeholder` — shows hint text inside the input before the user types
* `type="password"` masks the characters entered

---

## 3.8 Nesting & Divs

**Nesting** means placing HTML elements inside other HTML elements.

```html
<div class="card">
  <img src="Avatar.jpeg" alt="Nilanchal" />
  <div class="text-content">
    <h3>Nilanchal Jena</h3>
    <p>Frontend Developer</p>
    <h4>Bhubaneswar, India</h4>
  </div>
</div>
```

### The `<div>` Tag

`<div>` (short for divider) is an invisible container. It does nothing visually on its own, but it lets you:

* Group related elements together
* Target a group with CSS styling
* Control layout using Flexbox

Think of the HTML structure as a **tree** — a trunk (body) with branches (divs) and leaves (headings, paragraphs, images).

> In real-world web development, you will see divs inside divs inside divs — this is normal.

---

## 3.9 HTML Document Structure

A proper HTML file has a specific structure:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="styles.css" />
    <title>Business Card</title>
  </head>
  <body>
    <!-- All visible content goes here -->
    <div class="card">
      ...
    </div>
  </body>
</html>
```

| Tag | Purpose |
|-----|---------|
| `<!DOCTYPE html>` | Tells the browser we are using HTML5, not an older version |
| `<html>` | Wraps the entire document |
| `<head>` | Contains metadata — not visible on the page (links to CSS, page title, etc.) |
| `<body>` | Contains all visible content rendered in the browser |
| `<title>` | Sets the text shown in the browser tab |
| `<link>` | Links the HTML file to an external CSS file |

### Linking CSS to HTML

```html
<link rel="stylesheet" href="styles.css" />
```

* `rel="stylesheet"` — tells the browser this is a CSS file
* `href="styles.css"` — the path to the CSS file

---

## 3.10 File Paths

File paths tell the browser where to find a file (image, CSS, etc.) relative to the current file.

| Syntax | Meaning |
|--------|---------|
| `src="Avatar.jpeg"` | File is in the **same folder** as index.html |
| `src="images/Avatar.jpeg"` | File is inside an **images subfolder** |
| `src="./images/Avatar.jpeg"` | Same as above — `./` explicitly means current directory |
| `src="../images/Avatar.jpeg"` | Go **up one folder**, then into images |
| `src="/images/Avatar.jpeg"` | Start from the **project root** |

```html
<!-- Avatar is in the same folder as index.html -->
<img src="Avatar.jpeg" alt="Nilanchal" />
```

> Getting file paths wrong is a very common bug. If an image doesn't load, the path is almost always the issue.

---

# 4. CSS Concepts

CSS (Cascading Style Sheets) is the language used to style HTML elements — controlling colors, fonts, spacing, layout, and more.

---

## 4.1 CSS Syntax & Selectors

A CSS rule has three parts:

```css
selector {
  property: value;
}
```

* **Selector** — which HTML element to target
* **Property** — what aspect to change (color, font-size, etc.)
* **Value** — what to set it to
* Each property-value pair ends with a **semicolon** `;`

### Element Selector

Targets all elements of that type:

```css
h3 {
  color: white;
}

img {
  width: 150px;
}
```

---

## 4.2 Classes & Utility Classes

### What is a Class?

A `class` is an HTML attribute that lets you label an element so CSS can target it specifically.

```html
<img src="Avatar.jpeg" class="avatar" />
```

```css
.avatar {
  width: 150px;
}
```

* In HTML: `class="avatar"`
* In CSS: `.avatar` (with a dot prefix)

### Why Use Classes Instead of Element Selectors?

Element selectors like `img { }` target **every** `<img>` on the page. If you have multiple images, they all get the same style — which is often not what you want. Classes let you be specific.

### Multiple Classes on One Element

You can add multiple classes to one element by separating them with a space:

```html
<div class="card border-blue">
```

### Utility Classes

A utility class is a small, reusable class that sets **one single CSS property**:

```css
.border-blue {
  border: 1px dotted blue;
}
```

Apply it to any element that needs that style. This keeps CSS DRY (Don't Repeat Yourself).

---

## 4.3 Colors & Hex Codes

CSS supports many ways to define colors:

```css
/* Named colors */
color: red;
color: white;
color: saddlebrown;

/* Hex codes (most common) */
color: #ffffff;       /* white */
color: #000000;       /* black */
color: #2b2b2b;       /* soft black (easier on the eyes than pure black) */

background: #a855f7;  /* purple */
```

### What is a Hex Code?

A hex color code starts with `#` followed by 6 characters. Each pair describes how much **Red**, **Green**, and **Blue** (RGB) is in the color:

```
# RR GG BB
# ff 00 00  →  pure red
# 00 ff 00  →  pure green
# 00 00 ff  →  pure blue
# ff ff ff  →  white (all colors max)
# 00 00 00  →  black (all colors zero)
```

> Pro tip: Never use pure black (`#000000`) on pure white (`#ffffff`) — it's too harsh on the eyes. Use a soft black like `#2b2b2b` instead.

### Finding Color Palettes

Use [coolers.co](https://coolors.co) to browse and generate beautiful color combinations. Hover over any color to see its hex code.

---

## 4.4 Block vs Inline Elements

### Block Elements

* Take up the **full width** of the page (even if the content is small)
* Stack **on top of each other** vertically
* Examples: `<div>`, `<h1>`, `<p>`, `<ul>`

```css
display: block;
```

### Inline Elements

* Only take up **as much width as their content**
* Sit **beside each other** horizontally
* Examples: `<a>`, `<span>`, `<button>` (by default)

```css
display: inline;
```

### Why This Matters

When you try to center an element with `margin: 0 auto`, it **only works on block elements** because block elements control the full horizontal space. Inline elements can't be centered this way.

---

## 4.5 The Box Model

Every HTML element is a box. That box has four layers:

```
┌─────────────────────────────┐
│           MARGIN            │  ← Space outside the element
│   ┌─────────────────────┐   │
│   │       BORDER        │   │  ← The visible edge/outline
│   │   ┌─────────────┐   │   │
│   │   │   PADDING   │   │   │  ← Space inside, between content & border
│   │   │  ┌───────┐  │   │   │
│   │   │  │CONTENT│  │   │   │  ← The actual text, image, etc.
│   │   │  └───────┘  │   │   │
│   │   └─────────────┘   │   │
│   └─────────────────────┘   │
└─────────────────────────────┘
```

| Layer | Description |
|-------|-------------|
| **Content** | The actual element — text, image, etc. |
| **Padding** | Space **inside** the element, between content and border |
| **Border** | The visible outline of the element |
| **Margin** | Space **outside** the element, between it and other elements |

> You can inspect the box model of any element in the browser by right-clicking → Inspect → scrolling down to the box model diagram in the Styles panel.

---

## 4.6 Margin

Margin adds space **outside** an element, pushing it away from neighboring elements or the edges of the browser.

```css
/* Individual sides */
margin-top: 20px;
margin-right: 10px;
margin-bottom: 20px;
margin-left: 10px;

/* Shorthand — all four sides */
margin: 20px;

/* Shorthand — vertical | horizontal */
margin: 20px auto;

/* Shorthand — top | right | bottom | left (clockwise) */
margin: 10px 20px 30px 40px;
```

### Centering with `margin: 0 auto`

```css
.card {
  width: 400px;
  display: block;
  margin: 0 auto;
}
```

This centers the element horizontally. Three conditions must be met:
1. The element must be `display: block`
2. It must have a defined `width`
3. Set `margin-left: auto` and `margin-right: auto` (or `margin: 0 auto`)

Both sides compete for "all available space" — since neither wins, they split evenly → the element is centered.

### Collapsing Margins

When two vertical margins (top/bottom) meet, they **collapse** into one — the larger value wins. This only happens vertically, not horizontally.

---

## 4.7 Padding

Padding adds space **inside** an element, between the content and the border.

```css
/* Individual sides */
padding-top: 10px;
padding-right: 30px;
padding-bottom: 10px;
padding-left: 30px;

/* Shorthand — all four sides equal */
padding: 20px;

/* Shorthand — vertical | horizontal */
padding: 10px 30px;

/* Shorthand — top | right | bottom | left */
padding: 10px 30px 10px 30px;
```

### Margin vs Padding — Key Difference

* **Margin** = space outside (between the element and its surroundings)
* **Padding** = space inside (between the content and the element's edge)

```css
/* Card with breathing room inside */
.card {
  padding: 20px;
}
```

> Pro tip: Buttons typically have more padding on the left and right than on the top and bottom — this is a common design pattern.

---

## 4.8 Border & Border Radius

### Border

The border property takes three values:

```css
border: thickness style color;

/* Examples */
border: 1px solid #ccc;
border: 2px dotted blue;
border: 4px dashed red;
```

You can also target specific sides:

```css
border-top: 2px solid black;
border-bottom: 6px solid #a855f7;  /* decorative bottom accent */
border-left: none;
```

### Border Radius

Rounds the corners of an element:

```css
border-radius: 10px;   /* slightly rounded */
border-radius: 50%;    /* fully circular (use on square elements) */
```

This was used on the avatar image to make it round, and on the card to give it softer edges.

---

## 4.9 Centering Elements

There are three main techniques:

### 1. Margin Auto (for block elements)

```css
.card {
  width: 400px;
  margin: 0 auto;
}
```

Requires: `display: block` + defined `width`

### 2. Text Align (for inline elements inside a container)

```css
.container {
  text-align: center;
}
```

Centers all inline content (text, buttons, images set to inline) inside the container.

### 3. Flexbox with `justify-content: center`

```css
.btn-wrapper {
  display: flex;
  justify-content: center;
}
```

Best for centering multiple elements side-by-side. Covered in the next section.

---

## 4.10 Flexbox

Flexbox is a CSS layout tool that arranges elements in a row or column and gives you powerful control over their alignment and spacing.

### How to Activate Flexbox

Apply `display: flex` to the **parent container**. Its **direct children** become flex items.

```css
.card {
  display: flex;
}
```

### Key Flexbox Properties

```css
.card {
  display: flex;

  /* Main axis alignment (horizontal by default) */
  justify-content: center;        /* center all items */
  justify-content: space-between; /* space only between items */
  justify-content: space-around;  /* equal space around each item */
  justify-content: flex-start;    /* align to the left */
  justify-content: flex-end;      /* align to the right */
}
```

### Business Card Flexbox Layout

The card uses a **two-column layout** — avatar on the left, text on the right:

```html
<div class="card">           <!-- Flexbox container -->
  <img class="avatar" />     <!-- Flex child 1 (left column) -->
  <div class="text-content"> <!-- Flex child 2 (right column) -->
    <h3>Nilanchal Jena</h3>
    <p>Frontend Developer</p>
    <h4>Bhubaneswar</h4>
  </div>
</div>
```

```css
.card {
  display: flex;
  justify-content: space-around;
}
```

### Critical Rule: Only Direct Children Become Flex Items

Flexbox only controls the **direct children** of the container. Elements nested deeper are not affected. This is why we needed to wrap the three text elements in a single `<div>` — so that the card only has **two** flex children (image + text div), not five.

### Buttons Side-by-Side with Flexbox

```html
<div class="btn-wrapper">
  <button class="btn">Join Newsletter</button>
</div>
```

```css
.btn-wrapper {
  display: flex;
  justify-content: center;
}

.btn {
  margin: 0 4px;
}
```

---

## 4.11 CSS Inheritance

Some CSS properties **automatically flow down** from parent to child elements. This is called **inheritance**.

```css
.card {
  text-align: center;  /* inherited by all children */
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #2b2b2b;
}
```

By setting `text-align: center` on `.card`, every element inside the card (h3, p, h4, ul, li) also gets centered — without needing to write it separately on each one.

### Which Properties Are Inherited?

Generally, **text/font-related** properties are inherited:

* `color`
* `font-family`
* `font-size`
* `font-weight`
* `font-style`
* `text-align`
* `line-height`

Properties like `margin`, `padding`, `border`, `width`, `background` are **NOT** inherited.

### DRY Code with Inheritance

Without inheritance (bad — repeating yourself):

```css
h3 { text-align: center; }
p  { text-align: center; }
h4 { text-align: center; }
```

With inheritance (good — DRY):

```css
.card { text-align: center; }
```

> DRY = **D**on't **R**epeat **Y**ourself — a core principle in programming.

---

## 4.12 Fonts & Font Stacks

### Setting a Font

```css
body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
```

This is called a **font stack** — a list of fonts separated by commas. The browser tries each one in order:

1. Try `Verdana` — if installed, use it
2. If not, try `Geneva`
3. If not, try `Tahoma`
4. If none found, use **any** sans-serif font

### Web Safe Fonts

These fonts are pre-installed on most devices, so you don't need to load them over the network:

* `Arial`
* `Verdana`
* `Georgia`
* `Times New Roman`
* `Courier New`
* `Trebuchet MS`

### Font-Related CSS Properties

```css
font-family: Verdana, sans-serif;  /* typeface */
font-size: 16px;                    /* size */
font-weight: bold;                  /* thickness: normal | bold | lighter */
font-style: italic;                 /* normal | italic */
```

### Serif vs Sans-Serif

* **Serif** fonts have small decorative strokes at the ends of letters (e.g., Times New Roman) — feel formal/traditional
* **Sans-serif** fonts have no decorative strokes (e.g., Arial, Verdana) — feel clean/modern

---

## 4.13 Margin & Padding Shorthand

Both `margin` and `padding` follow the same shorthand rules.

### All four sides the same

```css
margin: 20px;
/* same as: margin-top: 20px; margin-right: 20px; margin-bottom: 20px; margin-left: 20px; */
```

### Two values — vertical | horizontal

```css
margin: 10px auto;
/* top/bottom = 10px, left/right = auto */
```

### Four values — clockwise from top

```css
margin: 10px 20px 30px 40px;
/*       top  right bottom left  */
```

> **Memory trick:** Think of a clock — start at **top** (12), go **right** (3), then **bottom** (6), then **left** (9).

---

# 5. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder
   ```bash
   cd "01. Business Card"
   ```

3. Open `index.html` directly in your browser, or use the **Live Server** extension in VS Code for auto-refresh on save.

---

# 6. Deployment

This project was deployed live using **GitHub + Netlify**:

1. Code was pushed to a GitHub repository
2. Netlify was connected to the GitHub repo via `Add New Site → Import from GitHub`
3. Netlify auto-deployed the site — any future push to GitHub auto-updates the live site

This is the professional workflow used by real developers:

```
Local Code → GitHub Repository → Netlify → Live on the Web
```

---

# 7. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** HTML & CSS → Intro to CSS → Building a Business Card
* **Official Challenge Code:** [github.com/scrimba/learn-fullstack](https://github.com/scrimba/learn-fullstack-development)

---

# Author

**Nilanchal Jena**
GitHub: https://github.com/Nilanchal0107
