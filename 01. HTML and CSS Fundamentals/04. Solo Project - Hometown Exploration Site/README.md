# 04. Hometown Exploration Site — Solo Project
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Solo Project](https://img.shields.io/badge/Type-Solo%20Project-red?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A hometown homepage about **Mumbai, India** — the first **solo project** of Scrimba's Fullstack Web Development Path. No step-by-step guidance was provided. The design was given as a **Figma file** and the project was built entirely from scratch, applying every HTML and CSS concept learned across the previous four sections.

This README is a **complete concept revision guide**. It covers what the solo project required, how to read a Figma design, and a thorough explanation of every concept applied.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What Makes This a Solo Project?](#3-what-makes-this-a-solo-project)
4. [Reading the Design — Figma](#4-reading-the-design--figma)
5. [Page Layout Breakdown](#5-page-layout-breakdown)
6. [Hero Section](#6-hero-section)
7. [Activities Section — Three-Column Flexbox](#7-activities-section--three-column-flexbox)
8. [Tourist Guide Card](#8-tourist-guide-card)
9. [Color Palette](#9-color-palette)
10. [Stretch Goals Applied](#10-stretch-goals-applied)
11. [Recognising Patterns from Previous Projects](#11-recognising-patterns-from-previous-projects)
12. [Thinking Like a Developer](#12-thinking-like-a-developer)
13. [Full CSS Reference](#13-full-css-reference)
14. [How to Run](#14-how-to-run)
15. [Course Reference](#15-course-reference)

---

# 1. Project Overview

The Hometown Exploration Site is a **three-section static webpage** about Mumbai — showcasing local landmarks, the author's connection to the city, and a tourist guide card. It features:

* A **Hero Section** — full-width background image with a heading and subheading
* An **Activities Section** — three equal-width columns using Flexbox, each showing a local landmark with image, heading, and description
* A **Tourist Guide Card** — a styled card with a circular avatar, name, bio, and a contact button

The course provided a **starter skeleton** with barely any styling (only `margin: 0` on the body, `text-align: center`, and `width: 100px` on images). Everything else was built independently by the student.

---

# 2. Project Structure

```
04. Hometown Exploration Site/
│
├── Index.html          → Full HTML: hero, activities, guide card
├── style.css           → All CSS: layout, flexbox, colors, typography
├── Mumbai.jpg          → Hero background image (Mumbai skyline)
├── GatewayofIndia.jpg  → Landmark card image 1
├── Marinedrive.jpg     → Landmark card image 2
├── Tajhotel.jpg        → Landmark card image 3
└── Avatar.jpeg         → Guide profile photo (circular)
```

---

# 3. What Makes This a Solo Project?

This is the first project in the course where **all guidance is removed**. Instead of being told what to write, the student receives:

* A **Figma design file** showing what the finished site should look like
* A list of **requirements** that must be met
* A short **starter skeleton** (barely styled HTML) to work from — or wipe and start fresh

The student must independently:
* Read and interpret the Figma design
* Decide which HTML elements to use
* Choose the correct CSS properties without hints
* Debug layout problems alone

This reflects how real-world frontend development actually works — a designer hands you a Figma file and you translate it into code.

### Mandatory Requirements

| Requirement | Applied |
|-------------|---------|
| Build from scratch (or from skeleton) | ✅ |
| Use **classes** to organise and target elements | ✅ |
| Use **Flexbox** for the activity columns | ✅ |
| Use `background-image` property for the hero | ✅ |
| Apply the provided **color palette** | ✅ |

### Stretch Goals (Optional)

| Stretch Goal | Applied |
|--------------|---------|
| Make it about your own hometown | ✅ Mumbai |
| Use a different / unique color palette | ✅ |
| Add a Google Font | ✅ |
| Use `:hover` on any element | ✅ Button hover |
| Add an entirely new section | — |

---

# 4. Reading the Design — Figma

Figma is the industry-standard design tool — the closest thing designers have to GitHub. Almost every real frontend project starts as a Figma mockup. This solo project was the first time a Figma design was used instead of inline instructions.

### How to Read a Figma File

* Click any element in the design → the right panel shows its exact properties
* **Colors** are shown as hex codes — copy them directly into CSS
* **Spacing** (padding, margin, gap) is shown as pixel values between elements
* **Corner radius** maps directly to `border-radius` in CSS
* **Text properties** (font, size, weight) are shown in the right panel
* **Export images** by right-clicking any element → Export

### Translating Figma Properties to CSS

| Figma Property | CSS Equivalent |
|----------------|---------------|
| Fill | `background-color: #hex` |
| Text color | `color: #hex` |
| Corner radius | `border-radius: Xpx` |
| Width / Height | `width: Xpx` / `height: Xpx` |
| Auto Layout (row) | `display: flex; flex-direction: row` |
| Auto Layout (column) | `display: flex; flex-direction: column` |
| Gap | `gap: Xpx` |
| Padding | `padding: Xpx` |
| Opacity | `opacity: 0.X` |
| Stroke | `border: Xpx solid #hex` |

---

# 5. Page Layout Breakdown

```
┌──────────────────────────────────────────────────────────┐
│                       HERO SECTION                       │
│       background-image: url("Mumbai.jpg")                │
│             background-size: cover                       │
│                                                          │
│             My Hometown — Mumbai                         │
│       The city of dreams on the west coast of India      │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                   ACTIVITIES SECTION                     │
│           "Top places to explore in Mumbai"              │
│                                                          │
│   display: flex on the wrapper — 3 equal flex children   │
│                                                          │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐     │
│  │ Gateway of   │ │   Marine     │ │ Taj Mahal    │     │
│  │   India      │ │   Drive      │ │   Hotel      │     │
│  │  [image]     │ │  [image]     │ │  [image]     │     │
│  │  <h3>        │ │  <h3>        │ │  <h3>        │     │
│  │  <p>         │ │  <p>         │ │  <p>         │     │
│  └──────────────┘ └──────────────┘ └──────────────┘     │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│                  TOURIST GUIDE CARD                      │
│                                                          │
│    [circular avatar]   Nilanchal Jena                    │
│                        Born and raised in Mumbai         │
│                        [ Contact Me ]                    │
└──────────────────────────────────────────────────────────┘
```

---

# 6. Hero Section

The hero section is the full-width area at the very top of the page — the first thing a visitor sees. It combines three key CSS techniques.

## 6.1 HTML Structure

```html
<div id="hero">
  <h1>My Hometown — Mumbai</h1>
  <h2>The city of dreams on the west coast of India</h2>
</div>
```

## 6.2 Background Image

```css
#hero {
  background-image: url("Mumbai.jpg");
  background-size: cover;
  background-position: center;
  padding: 80px 20px;
  text-align: center;
}
```

`background-size: cover` scales the image to fill the entire container, cropping the edges if necessary so no empty space shows. `background-position: center` keeps the most important part of the photo (usually the center) visible after the crop.

## 6.3 Text Readability Over a Photo

White text on a photograph often fails accessibility contrast checks. The fix (learned in the Birthday Gift Website) is to apply a subtle `text-shadow` with zero offset and a small blur:

```css
#hero h1,
#hero h2 {
  color: white;
  text-shadow: 0 0 4px black;
}
```

The `0 0` means no horizontal or vertical offset — the shadow sits directly behind the letter. The `4px` blur spreads it as a soft dark glow around the text, improving readability against any background color without changing the text color from white.

```
Without text-shadow   →  hard to read on bright areas of photo
With text-shadow      →  dark outline creates contrast on any background
```

## 6.4 Heading Background Colors (from Birthday Gift Website)

The course suggested this technique — adding a colored `background` directly to an `h2` or `h4` element. This works only when the heading is set to `display: inline` (so the background hugs just the text width) or when it is a flex child:

```css
/* Colored pill around heading text */
.hero-subtitle {
  background-color: #ff6b6b;
  color: white;
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
}
```

---

# 7. Activities Section — Three-Column Flexbox

This is the most complex layout section and the main reason Flexbox was a mandatory requirement.

## 7.1 HTML Structure

```html
<section class="activities">
  <h2>Top places to explore in Mumbai</h2>

  <div class="cards-wrapper">

    <div class="activity-card">
      <img src="GatewayofIndia.jpg" alt="Gateway of India" class="activity-img">
      <h3>Gateway of India</h3>
      <p>An iconic arch monument built in 1924 overlooking the Arabian Sea.</p>
    </div>

    <div class="activity-card">
      <img src="Marinedrive.jpg" alt="Marine Drive" class="activity-img">
      <h3>Marine Drive</h3>
      <p>A 3.6 km long boulevard along the coast, known as the Queen's Necklace.</p>
    </div>

    <div class="activity-card">
      <img src="Tajhotel.jpg" alt="Taj Mahal Palace Hotel" class="activity-img">
      <h3>Taj Mahal Palace Hotel</h3>
      <p>A landmark luxury hotel facing the Gateway of India, open since 1903.</p>
    </div>

  </div>
</section>
```

## 7.2 The Container-Inside-Container Pattern

This is a key Flexbox insight: **Flexbox only controls the direct children of the flex container.** What happens *inside* each child is a separate layout entirely.

```
.cards-wrapper          ← Flexbox container (controls horizontal layout)
  │
  ├── .activity-card    ← flex child (also a block container internally)
  │     ├── <img>           content stacks top to bottom naturally
  │     ├── <h3>
  │     └── <p>
  │
  ├── .activity-card    ← flex child
  │     ├── <img>
  │     ├── <h3>
  │     └── <p>
  │
  └── .activity-card    ← flex child
        ├── <img>
        ├── <h3>
        └── <p>
```

The three cards sit side by side because `.cards-wrapper` is a Flexbox container. Inside each `.activity-card`, the image, heading, and paragraph naturally stack top to bottom (block layout) — no extra CSS needed for that part.

## 7.3 CSS

```css
/* Flexbox container — creates the three columns */
.cards-wrapper {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

/* Each card — 30% wide so three fit with room for gaps */
.activity-card {
  width: 30%;
  text-align: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
}

/* Images fill their card's width */
.activity-img {
  width: 100%;
  border-radius: 8px;
}
```

### Why `width: 30%` on Cards?

`30% × 3 = 90%` — leaving 10% of the wrapper width for gaps. `justify-content: space-around` distributes that remaining 10% as equal space around and between the cards.

### Why `width: 100%` on Images?

Setting `width: 100%` on images means they always fill 100% of their parent container (`.activity-card`). Since the card is `30%` of the page, the image is also `30%` of the page. This is a **responsive** pattern — if the card grows or shrinks, the image grows or shrinks with it automatically.

### `justify-content: space-around` vs Other Values

```
space-between  →  |[card]     [card]     [card]|  (no edge gap)
space-around   →  | [card]    [card]    [card] |  (equal gap all around)
space-evenly   →  |  [card]   [card]   [card]  |  (truly equal gaps everywhere)
center         →  |    [card][card][card]       |  (crammed together, centered)
```

`space-around` was chosen here because it gives each card equal breathing room on both sides — including a half-gap at the left and right edges of the wrapper.

---

# 8. Tourist Guide Card

The guide card at the bottom of the page closely mirrors the **Business Card** project from earlier in the course. The instructor noted this explicitly — a reminder to look for patterns from previous builds when approaching new sections.

## 8.1 HTML Structure

```html
<section class="guide-section">
  <div class="guide-card">
    <img src="Avatar.jpeg" alt="Nilanchal Jena" id="guide-avatar">
    <div class="guide-info">
      <h3>Nilanchal Jena</h3>
      <p>Born and raised in Mumbai. Ask me anything about the city!</p>
      <button class="btn">Contact Me</button>
    </div>
  </div>
</section>
```

## 8.2 CSS

```css
.guide-section {
  padding: 40px 20px;
}

.guide-card {
  display: flex;
  flex-direction: row;       /* avatar left, text right */
  align-items: center;       /* vertically center both sides */
  width: 500px;
  margin: 0 auto;            /* center the card horizontally */
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
}

#guide-avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;        /* perfect circle */
  border: 4px solid #ff6b6b;
  margin-right: 20px;        /* gap between avatar and text */
}

.guide-info {
  text-align: left;
}

/* Button */
.btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 6px;
  font-family: inherit;      /* match the Google Font of the page */
  cursor: pointer;
  margin-top: 8px;
}

.btn:hover {
  background-color: #e05555;
}
```

### `font-family: inherit` on Buttons

Buttons have their own default browser font — they do **not** automatically inherit the page's font. This is a common gotcha. Two fixes:

```css
/* Fix 1: explicitly set the same font */
.btn {
  font-family: 'Poppins', sans-serif;
}

/* Fix 2: use the inherit keyword — cleaner and more maintainable */
.btn {
  font-family: inherit;
}
```

`inherit` tells the element to use whatever `font-family` its parent has. If the parent font ever changes, the button automatically updates too.

### `cursor: pointer`

```css
cursor: pointer;
```

Changes the mouse cursor from the default arrow to a pointing hand when hovering over the button. This is a crucial UX detail — it signals to the user that the element is clickable.

### `border: none` on Button

Buttons have a default browser border. Remove it explicitly:

```css
border: none;
```

Without this, different browsers render different default button borders, making the design inconsistent across browsers.

---

# 9. Color Palette

The course provided a color palette via a [Coolers](https://coolors.co) link. A color palette ensures the design feels cohesive — all colors relate to each other intentionally.

```css
/* Color palette used throughout the project */
:root {
  --primary:    #ff6b6b;   /* warm red/coral — buttons, avatar border, accents */
  --secondary:  #4ecdc4;   /* teal — section backgrounds or highlights */
  --dark:       #2c3e50;   /* dark navy — headings, text */
  --light:      #f9f9f9;   /* off-white — card backgrounds */
  --white:      #ffffff;   /* pure white — text on dark backgrounds */
}
```

Using `--css-variables` (custom properties defined in `:root`) is a best practice — change a color in one place and it updates everywhere it is used.

### How Colors Were Applied

| Color | Where Used |
|-------|-----------|
| Coral `#ff6b6b` | Button background, avatar border, headings |
| Off-white `#f9f9f9` | Guide card background, activity card background |
| Dark navy `#2c3e50` | Body text, section headings |
| White `#ffffff` | Hero text, button text |

---

# 10. Stretch Goals Applied

### Google Font

A Google Font was added to elevate the typography above the default browser font. Steps:

1. Go to [fonts.google.com](https://fonts.google.com)
2. Find a font (e.g., `Poppins`)
3. Click **Select** → copy the `<link>` embed code
4. Paste into the `<head>` of `Index.html`
5. Apply in CSS:

```html
<!-- In <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

```css
/* In style.css */
body {
  font-family: 'Poppins', sans-serif;
}
```

### `:hover` on Button

```css
.btn:hover {
  background-color: #e05555;   /* slightly darker shade on hover */
}
```

A subtle darkening of the button on hover gives visual feedback that the button is interactive. This is the same `:hover` technique learned in the Birthday Gift Website — applied here to a button instead of a background image.

---

# 11. Recognising Patterns from Previous Projects

The course instructor explicitly pointed out this skill during the solo project intro. Before writing any code, look at each section of the design and ask: *"Have I built something like this before?"*

| Design Element | Pattern From |
|---------------|-------------|
| Hero with background image and text overlay | 02. Space Exploration Site |
| Headings with colored background | 03. Birthday Gift Website (bday-age / bday-date) |
| Guide card with avatar on the left, text on the right | 01. Business Card |
| Three equal columns side by side | Flexbox (used in all previous projects) |
| Circular avatar | `border-radius: 50%` (01. Business Card) |
| Text shadow over photo | 02. Space Exploration Site / 03. Birthday Gift |
| Button with hover | 03. Birthday Gift Website |
| `margin: 0 auto` centering | 03. Birthday Gift Website (centering the div gift image) |

This pattern recognition is a **core developer skill** — almost nothing in a new project is truly new. It's usually a combination of patterns you've already solved.

---

# 12. Thinking Like a Developer

### Decompose the Page into Independent Problems

Never try to build the whole page at once. Break it into sections, then into elements:

```
Page
├── Hero section
│     ├── Background image + cover
│     └── Text with shadow
│
├── Activities section
│     ├── Section heading
│     └── Three cards (Flexbox)
│           └── Each card: image + heading + paragraph
│
└── Guide card
      ├── Avatar (circle)
      └── Text + button
```

Solve one piece at a time. Get it working, then move to the next.

### Build Outer to Inner

Always start with the **container** before adding children:

1. Create the section `<div>` with correct class
2. Style the container (width, background, padding, margin)
3. Add the child elements
4. Style the children

### Debugging Checklist

If something doesn't look right, run through this:

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Image not showing | Wrong file path | Check `url()` spelling and folder |
| Background image not filling | Missing `background-size: cover` | Add `background-size: cover` |
| Text hard to read over photo | No text shadow | Add `text-shadow: 0 0 4px black` |
| Three columns stacking vertically | `display: flex` not on wrapper | Add `display: flex` to parent |
| Cards stretching full width | No `width` on cards | Set `width: 30%` |
| Div not centering | Missing `margin: 0 auto` or no `width` | Add both |
| Button using wrong font | Browser default font on button | Add `font-family: inherit` |
| Elements stretching unexpectedly | `align-items: stretch` (default) | Set `align-items: center` |

---

# 13. Full CSS Reference

All CSS properties used in this project:

| Property | Example | Purpose |
|----------|---------|---------|
| `background-image` | `url("Mumbai.jpg")` | Sets background to an image |
| `background-size` | `cover` | Scales image to fill container |
| `background-position` | `center` | Keeps image center in view |
| `background-color` | `#f9f9f9` | Solid background color |
| `display` | `flex` | Activates Flexbox |
| `flex-direction` | `row` / `column` | Sets axis direction |
| `justify-content` | `space-around` | Distributes children on main axis |
| `align-items` | `center` | Aligns children on cross axis |
| `width` | `30%` / `500px` | Element width |
| `height` | `90px` | Element height |
| `padding` | `20px` / `80px 20px` | Inner spacing |
| `margin` | `0 auto` / `20px` | Outer spacing / centering |
| `border-radius` | `50%` / `10px` | Rounds corners |
| `border` | `4px solid #ff6b6b` | Outline border |
| `color` | `white` | Text color |
| `text-align` | `center` / `left` | Horizontal text alignment |
| `text-shadow` | `0 0 4px black` | Shadow / glow around text |
| `font-family` | `'Poppins', sans-serif` | Font typeface |
| `font-size` | `18px` | Text size |
| `font-family: inherit` | — | Inherit parent font (buttons) |
| `cursor` | `pointer` | Changes cursor to hand |
| `border: none` | — | Removes default button border |
| `gap` | `16px` | Space between flex children |

---

# 14. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder
   ```bash
   cd "04. Hometown Exploration Site"
   ```

3. Open `Index.html` in your browser or use **Live Server** in VS Code.

---

# 15. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Module 2 — Solo Project (Hometown Homepage)
* **Design Tool:** [figma.com](https://figma.com) — Figma tutorial linked in course
* **Color Palette Tool:** [coolors.co](https://coolors.co)
* **Google Fonts:** [fonts.google.com](https://fonts.google.com)

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *This was the first solo project of the course — Module 2's capstone. No instructions. No guided steps. Just a Figma design file, the requirements, and everything learned from the previous four projects. Completing it marks the end of the HTML & CSS module and the beginning of JavaScript.*
