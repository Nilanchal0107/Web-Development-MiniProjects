# 07. Basketball Scoreboard — Solo Project
![JavaScript](https://img.shields.io/badge/JavaScript-Logic-yellow?style=flat-square&logo=javascript)
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Solo Project](https://img.shields.io/badge/Type-Solo%20Project-red?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A live basketball score tracker with **Home** and **Guest** columns, each having three point buttons (+1, +2, +3). Clicking a button increments that team's score by the correct amount and updates the display instantly — built entirely from scratch as the **second JavaScript solo project** of the course.

This README is a **complete concept revision guide**. It covers the app architecture, every concept applied, the HTML skeleton strategy, and the stretch goals implemented.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What Makes This a Solo Project?](#3-what-makes-this-a-solo-project)
4. [App Layout and Behaviour](#4-app-layout-and-behaviour)
5. [HTML Skeleton — The Provided Starting Point](#5-html-skeleton--the-provided-starting-point)
6. [JavaScript Architecture](#6-javascript-architecture)
7. [Six Functions — One Per Button](#7-six-functions--one-per-button)
8. [Passing Arguments to Score Functions](#8-passing-arguments-to-score-functions)
9. [Flexbox Two-Column Layout (Revisited)](#9-flexbox-two-column-layout-revisited)
10. [@font-face — Custom Local Font](#10-font-face--custom-local-font)
11. [Stretch Goals Implemented](#11-stretch-goals-implemented)
12. [New Game / Reset Feature](#12-new-game--reset-feature)
13. [Applying Everything Learned So Far](#13-applying-everything-learned-so-far)
14. [How to Run](#14-how-to-run)
15. [Course Reference](#15-course-reference)

---

# 1. Project Overview

The Basketball Scoreboard tracks points for two teams in real time:

* **Two score displays** — Home and Guest, each showing the current score as a large number
* **Three point buttons per team** — +1, +2, and +3, matching basketball's point values (free throw, field goal, three-pointer)
* **New Game button** — resets both scores to zero (stretch goal)
* **Leading team highlight** — visually highlights whichever team is currently ahead (stretch goal)
* **Custom scoreboard font** — `DS-DIGIB.TTF`, a digital display font loaded via `@font-face`

---

# 2. Project Structure

```
07. Basketball Scoreboard/
│
├── index.html    → Two-column layout: Home and Guest with scores and buttons
├── index.css     → Flexbox layout, scoreboard styling, @font-face for DS-DIGIB
├── index.js      → Score variables, six increment functions, new game reset
└── DS-DIGIB.TTF  → Custom digital scoreboard font (loaded locally via @font-face)
```

---

# 3. What Makes This a Solo Project?

Like the Hometown Exploration Site, this project came with **no guided instructions** — only a Figma design file and a set of requirements. The student had to independently:

* Interpret the Figma design and translate it to HTML/CSS
* Decide the data model (two score variables)
* Write all six button functions and wire them to `onclick`
* Choose how to structure the HTML to match the two-column layout
* Implement stretch goals using self-taught research

### Core Requirements

| Requirement | Applied |
|-------------|---------|
| Build from the provided HTML skeleton | ✅ |
| Follow the Figma design | ✅ |
| All six buttons increment the correct team's score | ✅ |
| Scores update in real time in the DOM | ✅ |

### Stretch Goals (Optional)

| Stretch Goal | Applied |
|--------------|---------|
| New Game button — resets both scores to 0 | ✅ |
| Highlight the leading team | ✅ |
| Custom font / unique design | ✅ DS-DIGIB.TTF |

---

# 4. App Layout and Behaviour

```
┌──────────────────────────────────────────────────────┐
│              BASKETBALL SCOREBOARD                   │
│                                                      │
│    HOME                          GUEST               │
│                                                      │
│     [ 12 ]                      [ 5 ]                │
│  (score display)             (score display)         │
│                                                      │
│  [+1]  [+2]  [+3]           [+1]  [+2]  [+3]        │
│                                                      │
│              [ NEW GAME ]                            │
└──────────────────────────────────────────────────────┘
```

### Button Behaviour

| Button | Action |
|--------|--------|
| Home +1 | `homeScore += 1` → update home display |
| Home +2 | `homeScore += 2` → update home display |
| Home +3 | `homeScore += 3` → update home display |
| Guest +1 | `guestScore += 1` → update guest display |
| Guest +2 | `guestScore += 2` → update guest display |
| Guest +3 | `guestScore += 3` → update guest display |
| New Game | `homeScore = 0`, `guestScore = 0` → reset both displays |

---

# 5. HTML Skeleton — The Provided Starting Point

The course provided a minimal skeleton — enough to understand the structure without doing the layout work for you:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="index.css">
  </head>
  <body>

    <div class="container">

      <div class="home-section">
        <h3>HOME</h3>
        <!-- student fills in: score display, buttons -->
      </div>

      <div class="guest-section">
        <h3>GUEST</h3>
        <!-- student fills in: score display, buttons -->
      </div>

    </div>

    <script src="index.js"></script>
  </body>
</html>
```

The CSS already had `display: flex` and `justify-content: space-around` on `.container` — so the two inner divs were already side by side as columns. The student's job was to fill in the score displays and buttons inside each column, then add all the JavaScript.

---

# 6. JavaScript Architecture

The data model is simple — two variables, one per team:

```js
// Data
let homeScore  = 0
let guestScore = 0

// DOM references — grabbed once at page load
let homeScoreEl  = document.getElementById("home-score")
let guestScoreEl = document.getElementById("guest-score")
```

Every button function follows the same pattern:
1. Modify the correct score variable with `+=`
2. Update the correct DOM element's `.textContent`

```js
function addHomeOne() {
  homeScore += 1
  homeScoreEl.textContent = homeScore
}

function addHomeTwo() {
  homeScore += 2
  homeScoreEl.textContent = homeScore
}

function addHomeThree() {
  homeScore += 3
  homeScoreEl.textContent = homeScore
}

function addGuestOne() {
  guestScore += 1
  guestScoreEl.textContent = guestScore
}

function addGuestTwo() {
  guestScore += 2
  guestScoreEl.textContent = guestScore
}

function addGuestThree() {
  guestScore += 3
  guestScoreEl.textContent = guestScore
}
```

---

# 7. Six Functions — One Per Button

Each of the six scoring buttons calls its own dedicated function. The naming convention makes it immediately clear which team and how many points each function handles:

```
addHomeOne()    → home team, +1 point
addHomeTwo()    → home team, +2 points
addHomeThree()  → home team, +3 points
addGuestOne()   → guest team, +1 point
addGuestTwo()   → guest team, +2 points
addGuestThree() → guest team, +3 points
```

### HTML Wiring

```html
<!-- Home buttons -->
<button onclick="addHomeOne()">+1</button>
<button onclick="addHomeTwo()">+2</button>
<button onclick="addHomeThree()">+3</button>

<!-- Guest buttons -->
<button onclick="addGuestOne()">+1</button>
<button onclick="addGuestTwo()">+2</button>
<button onclick="addGuestThree()">+3</button>
```

### Why Not One Function With a Parameter?

A more advanced (and DRY) approach would be a single function that accepts the team and points as arguments:

```js
// Advanced version — one function handles all cases
function addScore(team, points) {
  if (team === "home") {
    homeScore += points
    homeScoreEl.textContent = homeScore
  } else {
    guestScore += points
    guestScoreEl.textContent = guestScore
  }
}
```

```html
<button onclick="addScore('home', 1)">+1</button>
<button onclick="addScore('home', 2)">+2</button>
```

This uses `if/else` conditionals — a concept not yet taught at this point in the course. The six-function approach is the appropriate solution given the JavaScript knowledge available at this stage.

---

# 8. Passing Arguments to Score Functions

When calling functions from `onclick`, you can pass values directly into the parentheses — these are called **arguments**:

```html
<!-- Passing arguments via onclick -->
<button onclick="addScore('home', 3)">+3</button>
```

```js
function addScore(team, points) {
  // 'team' receives the string "home"
  // 'points' receives the number 3
}
```

The values inside `onclick="..."` are passed in the same order as the **parameters** defined in the function signature. This is the same concept as `document.getElementById("count-el")` — you pass in the ID string as an argument so the function knows what to look for.

---

# 9. Flexbox Two-Column Layout (Revisited)

The two-column scoreboard layout uses the same Flexbox pattern first seen in the Hometown Exploration Site's activity cards:

```css
.container {
  display: flex;
  justify-content: space-around;   /* distributes home and guest columns */
  align-items: flex-start;         /* tops of both columns align */
}
```

Each inner section (`.home-section`, `.guest-section`) is a flex **child** — it becomes its own column. Inside each column, the heading, score, and buttons stack vertically (normal block layout, no extra CSS needed).

```
.container  (display: flex)
│
├── .home-section    ← flex child 1
│     ├── <h3>HOME</h3>
│     ├── <h2 id="home-score">0</h2>
│     └── [+1] [+2] [+3]
│
└── .guest-section   ← flex child 2
      ├── <h3>GUEST</h3>
      ├── <h2 id="guest-score">0</h2>
      └── [+1] [+2] [+3]
```

---

# 10. `@font-face` — Custom Local Font

The scoreboard uses `DS-DIGIB.TTF` — a digital display font that mimics real scoreboard LED displays. This font is **not** from Google Fonts; it is a local file included in the project folder and loaded via the `@font-face` CSS rule.

```css
@font-face {
  font-family: 'DS-Digital';          /* the name you'll use in font-family */
  src: url('DS-DIGIB.TTF');           /* path to the font file */
}
```

Once declared, the font name can be used anywhere in the CSS:

```css
#home-score,
#guest-score {
  font-family: 'DS-Digital', monospace;
  font-size: 80px;
  color: #ff6b35;
}
```

### `@font-face` vs Google Fonts

| Method | How it works | When to use |
|--------|-------------|-------------|
| Google Fonts | `<link>` in HTML head → font served from Google's CDN | When the font is available on Google Fonts |
| `@font-face` | Font file included in project → loaded from local path | When using a custom/commercial font not on Google |

The `url()` path in `@font-face` works exactly like `url()` in `background-image` — relative to the CSS file's location.

---

# 11. Stretch Goals Implemented

### 1. New Game Button

A **New Game** button resets both team scores to zero. This touches both the JavaScript variables and both DOM displays:

```html
<button onclick="newGame()">NEW GAME</button>
```

```js
function newGame() {
  homeScore  = 0
  guestScore = 0
  homeScoreEl.textContent  = homeScore
  guestScoreEl.textContent = guestScore
}
```

This is the same reset pattern used in the Counter App's `save()` function — set the variable to `0`, then sync the DOM display to match.

### 2. Leading Team Highlight

The leading team's score is visually highlighted with a different colour to make it immediately obvious who is winning. This requires checking which score is higher — using an `if/else` conditional — a concept researched independently as a stretch goal:

```js
function updateLeader() {
  if (homeScore > guestScore) {
    homeScoreEl.style.color  = "#00ff88"   /* green for home if leading */
    guestScoreEl.style.color = "#ffffff"
  } else if (guestScore > homeScore) {
    guestScoreEl.style.color = "#00ff88"   /* green for guest if leading */
    homeScoreEl.style.color  = "#ffffff"
  } else {
    homeScoreEl.style.color  = "#ffffff"   /* white for both if tied */
    guestScoreEl.style.color = "#ffffff"
  }
}
```

This `updateLeader()` function is called at the end of every score function so the highlight updates in real time after every point.

---

# 12. New Game / Reset Feature

The reset feature is a direct application of what was learned in the Counter App — after saving an entry, the counter was reset to zero with two lines: one for the JS variable, one for the DOM display.

The Basketball Scoreboard reset just doubles this for two teams:

```
Counter App reset (one value):         Basketball reset (two values):
  count = 0                              homeScore  = 0
  countEl.textContent = 0               guestScore = 0
                                         homeScoreEl.textContent  = 0
                                         guestScoreEl.textContent = 0
```

The principle is identical — keep the JS variable and the DOM display in sync. Whenever you change one, you must change the other.

---

# 13. Applying Everything Learned So Far

This project is a consolidation of **all JavaScript fundamentals** from Module 3:

| Concept | Where Applied |
|---------|--------------|
| `let` variables | `homeScore`, `guestScore` |
| `+=` increment | Inside all six score functions |
| `= 0` reset | Inside `newGame()` |
| `document.getElementById()` | Grabbing `home-score` and `guest-score` elements |
| `.textContent =` | Updating score displays after each click |
| Functions | Six score functions + `newGame()` + `updateLeader()` |
| `onclick` | All buttons wired to their functions |
| Global vs block scope | Score variables declared globally so all functions can access them |
| Flexbox (CSS) | Two-column layout for Home and Guest columns |
| `@font-face` (CSS) | Loading the custom DS-DIGIB digital font |
| `if/else` (stretch) | Leading team highlight logic |
| `.style.color` (stretch) | Dynamically changing score colour via JavaScript |

---

# 14. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder
   ```bash
   cd "07. Basketball Scoreboard"
   ```

3. Open `index.html` in your browser or use **Live Server** in VS Code.

4. Click the **+1**, **+2**, or **+3** buttons under either team to increment their score. Click **New Game** to reset.

---

# 15. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Module 3 — Solo Project 2 (Basketball Scoreboard)
* **Design Tool:** [figma.com](https://figma.com) — Figma design file provided via course

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *The Basketball Scoreboard is the second solo project — the first full JavaScript app built without any guided steps. It applies every JS concept from Module 3 (variables, functions, DOM, onclick) in a real, functional product with a custom design and self-researched stretch goals.*
