# 02. Space Exploration Site
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A space-themed static site featuring an **animated WebP background**, a **Google Font**, **text shadows**, a **hero section layout**, and a custom **SpaceX logo** — the second major project from Scrimba's Fullstack Web Development Path.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every new concept introduced while building this project.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [New Concepts in This Project](#3-new-concepts-in-this-project)
4. [CSS Background Images](#4-css-background-images)
5. [Google Fonts](#5-google-fonts)
6. [The Span Tag](#6-the-span-tag)
7. [IDs vs Classes](#7-ids-vs-classes)
8. [Text Shadow](#8-text-shadow)
9. [Hero Section Layout](#9-hero-section-layout)
10. [HTML lang Attribute](#10-html-lang-attribute)
11. [How to Run](#11-how-to-run)
12. [Course Reference](#12-course-reference)

---

# 1. Project Overview

The Space Exploration Site includes:

* An **animated galaxy WebP** as the full-page hero background
* A **SpaceX logo** at the top (sized using an ID selector)
* An **H1 title** with the word "Exploration" underlined using a `<span>` + utility class
* A styled **CTA button** — "Apply Now"
* A **Terms and conditions** H3 below the hero section
* **Google Fonts** (Orbitron) for a sci-fi look
* **Text shadow** on the H1 for readability against the busy background

---

# 2. Project Structure

```
02. Space Exploration Site/
│
├── index.html      → HTML: hero section, logo, title, button, footer text
├── styles.css      → All CSS: background, fonts, layout, text shadow, IDs
├── galaxy.webp     → Animated WebP background image
└── spacex.png      → SpaceX logo image
```

---

# 3. New Concepts in This Project

| Concept | Description |
|---------|-------------|
| `background-image` in CSS | Adding images as backgrounds via CSS, not HTML |
| `background-size: cover` | Stretching the background to fill its container |
| Animated WebP / GIF | Using `.webp` files for animated backgrounds |
| Google Fonts | Importing custom fonts from fonts.google.com |
| `@font-face` | Loading self-hosted custom font files |
| `font-weight` values | Numeric (100–900) and named (bold, normal) |
| `<span>` tag | Targeting a specific word inline without breaking layout |
| `id` attribute | Unique HTML identifier — targeted with `#` in CSS |
| `id` vs `class` | When to use each and why |
| `text-shadow` | Adding directional, colored, blurred shadows to text |
| Hero section | The prominent full-width top section of a webpage |
| `margin: 0` on body | Removing the browser's default 8px body margin |
| `lang` attribute | Setting document language on `<html>` for accessibility |

---

# 4. CSS Background Images

## 4.1 `background-image` vs `<img>` tag

There are two completely different ways to add images in web development:

| Method | Where | Use Case |
|--------|-------|----------|
| `<img src="..." />` | HTML | Content images — photos, avatars, product images |
| `background-image: url(...)` | CSS | Decorative backgrounds, hero images, patterns |

Background images are **not in the HTML** — they live entirely in CSS. They are invisible to screen readers and carry no semantic meaning, which is why they are used for decoration only.

```css
/* Static image background */
body {
  background-image: url("images/universe.jpeg");
}

/* Animated WebP background */
#hero {
  background-image: url("galaxy.webp");
}

/* Directly using an external URL */
#hero {
  background-image: url("https://media.giphy.com/media/abc/giphy.webp");
}
```

The `url()` part is a **CSS function** — it takes the image path as its argument, just like `src` on an `<img>` tag.

---

## 4.2 `background-size: cover`

By default, a background image renders at its original pixel size — which could be thousands of pixels wide. This causes it to either overflow the container or only show a tiny corner of the image.

```css
#hero {
  background-image: url("galaxy.webp");
  background-size: cover;
}
```

`background-size: cover` tells the browser: *"Scale this image so it completely fills the container — no white gaps, crop if needed."*

The image maintains its aspect ratio but always fills the full width and height of the container.

---

## 4.3 Animated WebP / GIF Backgrounds

A `.webp` file can be animated — just like a GIF, but with better compression (smaller file size, same quality). You use it exactly the same way as a static image — the browser plays it in a loop automatically with no JavaScript needed.

```css
#hero {
  background-image: url("galaxy.webp");
  background-size: cover;
}
```

### GIF vs WebP

| Format | Animation | File Size | Quality |
|--------|-----------|-----------|---------|
| `.gif` | Yes | Larger | Lower |
| `.webp` | Yes | Smaller | Higher |

> **Where to find animated images:** [giphy.com](https://giphy.com) — search a topic, right-click the image → Copy GIF Link, and paste it directly into `url()`.

---

## 4.4 Picking Colors from a Background Image

A professional design trick is to **pull colors from your background image** and use them as text or accent colors. This creates visual harmony — everything feels like it belongs together.

**How to do it with Coolers:**
1. Go to [coolors.co](https://coolors.co)
2. Click **More → Pick Palette from Photo**
3. Upload the image or paste a URL
4. Drag the picker to find colors you like
5. Export the palette and copy the hex codes

```css
/* Blue pulled from the galaxy image */
body {
  color: #4fc3f7;
}
```

---

# 5. Google Fonts

## 5.1 Why Google Fonts?

Web Safe Fonts (Arial, Verdana, etc.) are pre-installed on most computers, but there are only about 10 of them. **Google Fonts** gives you 1,500+ free, high-quality fonts loaded over the network — giving you far more design flexibility.

---

## 5.2 How to Use Google Fonts

**Step 1 — Find your font**

Go to [fonts.google.com](https://fonts.google.com) or just Google: *"sci-fi Google font"* → finds **Orbitron**.

**Step 2 — Select font weights you need**

On the font page, click **Select this style** for each weight (e.g., Regular 400, Extra Bold 800).

**Step 3 — Paste the embed `<link>` into your HTML `<head>`**

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;800&display=swap" rel="stylesheet">
</head>
```

This fetches the font recipe from Google's servers when the page loads.

**Step 4 — Apply the font in your CSS**

```css
body {
  font-family: 'Orbitron', sans-serif;
}
```

The `sans-serif` is a fallback — if Orbitron fails to load, the browser uses any available sans-serif font.

---

## 5.3 Font Weight Values

Font weight controls the **thickness** of text. It accepts named values or numeric values:

```css
font-weight: normal;   /* = 400 */
font-weight: bold;     /* = 700 */
font-weight: 100;      /* Thin */
font-weight: 200;      /* Extra Light */
font-weight: 300;      /* Light */
font-weight: 400;      /* Regular — default */
font-weight: 500;      /* Medium */
font-weight: 600;      /* Semi Bold */
font-weight: 700;      /* Bold */
font-weight: 800;      /* Extra Bold */
font-weight: 900;      /* Black / Heavy */
```

> **Important:** You can only use a weight you actually imported from Google Fonts. If you only imported 400 and 800, using `font-weight: 300` just falls back to the nearest available weight.

---

## 5.4 Buttons Don't Inherit `font-family`

This is a very common gotcha. Most CSS properties inherit down from parent to child — but **buttons and inputs do NOT inherit `font-family`** by default. The browser applies its own system font to form elements.

```css
/* This does NOT apply to buttons automatically */
body {
  font-family: 'Orbitron', sans-serif;
}
```

**Fix 1 — Explicitly set the font on the button:**

```css
.btn {
  font-family: 'Orbitron', sans-serif;
}
```

**Fix 2 — Use the `inherit` keyword:**

```css
.btn {
  font-family: inherit;  /* forces the button to inherit from body */
}
```

Both work. `inherit` is more flexible — if you change the body font later, the button updates automatically without another edit.

---

## 5.5 Custom Fonts with `@font-face`

When a font isn't available on Google Fonts, you can host the font file yourself. This is done with the `@font-face` CSS rule.

**Step 1 —** Find and download a font from [1001fonts.com](https://www.1001fonts.com). You get a `.ttf` file.

**Step 2 —** Place the `.ttf` file in your project folder.

**Step 3 —** Register it in CSS with `@font-face`:

```css
@font-face {
  src: url("corleone.ttf");
  font-family: "Corleone";   /* you choose this name — it's just a label */
}
```

**Step 4 —** Use it like any other font family:

```css
h1 {
  font-family: "Corleone";
}
```

> The name you give inside `font-family` in `@font-face` is entirely up to you — it does not need to match the file name. It's just a reference label for your CSS.

---

# 6. The Span Tag

## 6.1 Span vs Div

Both `<span>` and `<div>` are invisible containers — they have no visual effect on their own. The key difference is their **display type**:

| Tag | Display Type | Behavior |
|-----|-------------|----------|
| `<div>` | Block | Takes full width, forces content onto its own line |
| `<span>` | Inline | Only takes as much space as its content, flows within text |

```html
<!-- div BREAKS the word onto a new line — wrong for inline styling -->
<h1>Join the <div class="highlight">Exploration</div> Now</h1>

<!-- span stays INLINE — sentence flows naturally -->
<h1>Join the <span class="underline">Exploration</span> Now</h1>
```

---

## 6.2 Targeting Inline Text with Span

Use `<span>` when you want to style a **specific word or phrase** without disrupting the surrounding text flow.

```html
<h1 id="title">Join the <span class="underline">Exploration</span></h1>
```

```css
/* Utility class — one job: add an underline */
.underline {
  border-bottom: 4px solid white;
}
```

This creates a thick white underline **only under "Exploration"** — not the entire H1. The `border-bottom` approach is preferred over `text-decoration: underline` because it gives you full control over the thickness, color, and spacing of the line.

---

# 7. IDs vs Classes

Both `id` and `class` are HTML attributes used to label elements so CSS (and JavaScript) can target them precisely.

## 7.1 When to Use ID

Use `id` when the element is **unique** — it appears **only once** on the entire page.

```html
<img src="spacex.png" id="main-logo" alt="SpaceX logo" />
<div id="hero">...</div>
<h1 id="title">Join the Exploration</h1>
```

Rules:
* Each ID value must be unique on the page — no two elements can share the same ID
* An element can only have **one ID**
* Using the same ID on multiple elements is **invalid HTML**

---

## 7.2 When to Use Class

Use `class` when a style needs to be **reused** across multiple elements.

```html
<button class="btn">Apply Now</button>
<button class="btn">Learn More</button>
<span class="underline">Exploration</span>
```

Rules:
* Multiple elements can share the same class
* One element can have multiple classes (space-separated): `class="btn primary"`
* Classes are designed for **reuse**

---

## 7.3 ID Selector in CSS

| Selector | Syntax | Targets |
|----------|--------|---------|
| Element | `img { }` | All `<img>` tags |
| Class | `.btn { }` | All elements with `class="btn"` |
| ID | `#main-logo { }` | The one element with `id="main-logo"` |

```css
/* ID selector uses # instead of . */
#main-logo {
  width: 100px;
}

#hero {
  background-image: url("galaxy.webp");
  background-size: cover;
  padding: 10px 0 40px 0;
}
```

> **Quick rule:** Unique element → `id`. Reusable style → `class`.

---

# 8. Text Shadow

## 8.1 Basic Syntax

```css
selector {
  text-shadow: horizontal-offset  vertical-offset  blur  color;
}
```

Example:

```css
h1 {
  text-shadow: 5px 5px 4px black;
}
```

---

## 8.2 The Four Values Explained

```
text-shadow:  5px      5px       4px     black
              ^         ^         ^        ^
              |         |         |        └── Color of the shadow
              |         |         └─────────── Blur radius (0 = sharp edge)
              |         └───────────────────── Vertical offset (+ down, - up)
              └─────────────────────────────── Horizontal offset (+ right, - left)
```

| Values | Result |
|--------|--------|
| `5px 5px` | Shadow bottom-right (light from top-left) |
| `-5px 5px` | Shadow bottom-left (light from top-right) |
| `5px -5px` | Shadow top-right |
| `-5px -5px` | Shadow top-left |
| `0 0 4px black` | No direction — creates a glow/outline effect |

---

## 8.3 Glow Effect Trick

When both offset values are `0`, there is no directional shadow. Instead, the blur spreads **evenly around** the text — creating a **glow or outline** effect:

```css
h1 {
  text-shadow: 0px 0px 10px white;  /* white glow */
}

h1 {
  text-shadow: 0px 0px 4px black;   /* black outline halo */
}
```

This trick is especially useful when:
* Your text color is similar to the background
* Text sits on a busy or dark photo and readability suffers

```css
/* Small blur = tight, crisp outline */
text-shadow: 0 0 2px black;

/* Large blur = wide, soft glow */
text-shadow: 0 0 20px black;
```

---

## 8.4 Readability Fix with Text Shadow

When text is placed over a background image, contrast can be poor. Instead of changing the text color, apply a subtle dark glow:

```css
#title {
  text-shadow: 0px 0px 4px black;
}
```

This creates a soft dark outline around every letter — making the text readable on any background without altering its color. This is a widely-used real-world technique whenever text is placed over photos or video backgrounds.

---

# 9. Hero Section Layout

## 9.1 What is a Hero Section?

A **hero section** is the prominent full-width area at the very top of a webpage — the first thing a visitor sees. It typically includes a headline, tagline, CTA button, and a background image or video. It is the "hero" of the page because it makes the first impression.

```html
<div id="hero">
  <img src="spacex.png" id="main-logo" alt="SpaceX logo" />
  <h1 id="title">Join the <span class="underline">Exploration</span></h1>
  <button class="btn">Apply Now</button>
</div>

<h3>Terms and conditions apply</h3>
```

```css
#hero {
  background-image: url("galaxy.webp");
  background-size: cover;
  padding: 10px 0 40px 0;
}
```

The background image is placed on the `#hero` div — not the `body` — so the content below the hero section (`<h3>`) has its own clean background. This is the correct scalable structure.

---

## 9.2 Resetting Body Margins

Browsers automatically apply a **default margin of 8px on all sides of the `body`**. This is usually invisible when the background fills the whole page. But once you move the background image to a specific div, a thin white gap appears around the edges.

```css
/* Fix: reset body margin to zero */
body {
  margin: 0;
}
```

This is one of the very first things professional developers do when starting a new project — it removes unpredictable browser defaults so you begin with a blank slate.

---

# 10. HTML `lang` Attribute

The `lang` attribute goes on the opening `<html>` tag and tells the browser, screen readers, and search engines what **language** the page is written in.

```html
<html lang="en">
```

### Why It Matters

* **Accessibility** — Screen readers use `lang` to choose the correct voice and pronunciation when reading aloud
* **SEO** — Search engines use `lang` to serve your page to the correct audience
* **Consistency** — Ensures language-specific features like date formats and character sets work correctly

### Language Codes

| Code | Language |
|------|----------|
| `en` | English |
| `hi` | Hindi |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `ja` | Japanese |
| `zh` | Chinese |

### Mixed Language Pages

If a specific section is in a different language, override it locally on that element:

```html
<html lang="en">
  <body>
    <h1>Welcome to Space</h1>
    <h3 lang="hi">अंतरिक्ष में आपका स्वागत है</h3>
  </body>
</html>
```

> Setting the language might seem like a small step, but it plays a big role in making your website accessible and internationally correct.

---

# 11. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder
   ```bash
   cd "02. Space Exploration Site"
   ```

3. Open `index.html` in your browser or use **Live Server** in VS Code.

> The `galaxy.webp` is animated — it plays automatically as a looping background.

---

# 12. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Space Exploration Site
* **Official Challenge Code:** [github.com/scrimba/learn-fullstack](https://github.com/scrimba/learn-fullstack-development)

---

# Author

**Nilanchal Jena**
GitHub: https://github.com/Nilanchal0107
