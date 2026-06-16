# 12. JavaScript Challenges Part-3
![JavaScript](https://img.shields.io/badge/JavaScript-Practice-yellow?style=flat-square&logo=javascript)
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

Eight consolidation challenges that drill every concept introduced in the Leads Tracker Chrome Extension — `let` vs `const` discipline, functions with array parameters, `localStorage`, `addEventListener`, objects inside arrays, `innerHTML` rendering, template literals in loops, `.toFixed()` for decimal rounding, and `Number()` for type conversion. Challenges 06 and 07 have their own HTML/CSS.

This README is a **complete concept revision guide**. Each challenge includes its problem statement, concept focus, full solution, and the key insight it was designed to teach.

---

# Table of Contents

1. [Project Structure](#1-project-structure)
2. [Challenge 01 — let & const + Template Strings (Fighter Game)](#2-challenge-01--let--const--template-strings-fighter-game)
3. [Challenge 02 — Function with Array Parameter (Log Items)](#3-challenge-02--function-with-array-parameter-log-items)
4. [Challenge 03 — Save to localStorage](#4-challenge-03--save-to-localstorage)
5. [Challenge 04 — addEventListener + Object in an Array](#5-challenge-04--addeventlistener--object-in-an-array)
6. [Challenge 05 — Generate Sentence](#6-challenge-05--generate-sentence)
7. [Challenge 06 — Render Images (innerHTML + for loop)](#7-challenge-06--render-images-innerhtml--for-loop)
8. [Challenge 07 — Rounding Numbers (.toFixed)](#8-challenge-07--rounding-numbers-tofixed)
9. [Challenge 08 — Convert String to Number (Number())](#9-challenge-08--convert-string-to-number-number)
10. [Key Concepts Consolidated](#10-key-concepts-consolidated)
11. [How to Run](#11-how-to-run)
12. [Course Reference](#12-course-reference)

---

# 1. Project Structure

```
12. Javascript Challenges Part-3/
│
├── 01. Let & Const/
│     └── index.js       → fighter game — fix let/const, convert to template strings
│
├── 02. Log out items in an array/
│     └── index.js       → logItems(arr) — function with array param + for loop
│
├── 03. Save to Localstorage/
│     └── index.js       → setItem → refresh → getItem → verify persistence
│
├── 04. addEventListener and object in an array/
│     ├── index.html     → button + data array
│     └── index.js       → grab button, addEventListener, navigate data[0].score
│
├── 05. Generate Sentence/
│     └── index.js       → generateSentence(desc, arr) — template literal + for loop
│
├── 06. Render Images/
│     ├── index.html     → container div
│     ├── index.css      → team-img class
│     └── index.js       → renderImages() — innerHTML + accumulator + img tags
│
├── 07. Rounding Numbers/
│     ├── index.html     → buy button
│     └── index.js       → totalPrice.toFixed(2)
│
└── 08. Convert string to Number/
      ├── index.html     → buy button with string price
      └── index.js       → Number(totalPrice).toFixed(2)
```

---

# 2. Challenge 01 — let & const + Template Strings (Fighter Game)

## Problem

A fictional fighter game has five variables: `player`, `opponent`, `gameName`, `points`, and `hasWon`. After setup, the game plays out — `points` is incremented and `hasWon` is flipped. The code is broken because `let` and `const` have been mixed up incorrectly. Fix all variable declarations, then convert the two `console.log` strings from double-quote concatenation into template literals.

## Concept Focus

The **default-to-const** rule: if possible, declare with `const`; only use `let` if the variable will be reassigned.

## Solution

```js
const player   = "Pier"         // never reassigned → const
const opponent = "James"        // never reassigned → const
const gameName = "Amazing Fighter" // never reassigned → const
let points  = 0                 // reassigned on line 9 → let
let hasWon  = false             // reassigned on line 10 → let

// Game plays out
points  += 100
hasWon   = true

// Template string console logs
if (hasWon) {
  console.log(`${player} got ${points} points and won the ${gameName} game.`)
} else {
  console.log(`${opponent} won the ${gameName} game.`)
}
```

## Key Insight — How to Decide let vs const

The cleanest technique is to scan downward from each declaration and look for a bare reassignment (a line that starts with the variable name, without `let` or `const` in front):

```
let points  = 0       ← declared
...
points += 100         ← reassigned ← this line means it MUST be let

const player = "Pier" ← declared
...
(nothing)             ← never reassigned → can safely be const
```

| Variable | Reassigned? | Correct keyword |
|----------|------------|-----------------|
| `player` | No | `const` |
| `opponent` | No | `const` |
| `gameName` | No | `const` |
| `points` | Yes — `points += 100` | `let` |
| `hasWon` | Yes — `hasWon = true` | `let` |

---

# 3. Challenge 02 — Function with Array Parameter (Log Items)

## Problem

Create a function `logItems(arr)` that takes an array as its parameter and logs every item in that array to the console using a `for` loop. Test it by calling `logItems(myCourses)`.

## Concept Focus

Functions that accept arrays as parameters — the function doesn't know or care what's in the array; it just iterates whatever it receives.

## Solution

```js
const myCourses = [
  "Learn CSS Animations",
  "UI Design Fundamentals",
  "Intro to Clean Code"
]

function logItems(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }
}

logItems(myCourses)
// "Learn CSS Animations"
// "UI Design Fundamentals"
// "Intro to Clean Code"
```

## Key Insight — The Parameter Name is an Alias

Inside `logItems`, the parameter `arr` is just a local name that refers to whatever array you pass in. You could call `logItems(myCourses)` or `logItems(["apples", "bananas"])` — the function body works identically because it always reads from `arr`, never from a hardcoded variable name:

```js
// These three calls all work with the same function body
logItems(myCourses)
logItems(["red", "green", "blue"])
logItems([1, 2, 3, 4, 5])
```

---

# 4. Challenge 03 — Save to localStorage

## Problem

In three separate steps:
1. Save any key-value pair to `localStorage`
2. Delete that code, refresh the page (a clean slate)
3. Retrieve the value by key and log it to the console to prove it persisted

## Concept Focus

`localStorage.setItem()` and `localStorage.getItem()` — demonstrating that data survives across page refreshes and completely unrelated code contexts.

## Solution

**Step 1 — write and run, then delete:**
```js
localStorage.setItem("myCredits", "100")
```

**Step 2 — new page load, retrieve:**
```js
const myCredits = localStorage.getItem("myCredits")
console.log(myCredits)   // "100" ← persisted from previous run
```

## Key Insight — Two Separate Contexts, One Database

The power of `localStorage` is that `setItem` and `getItem` don't have to live in the same function, the same file, or even the same browser session. The storage belongs to the browser origin, not to any particular script run:

```
Script run 1 (Monday):    localStorage.setItem("myCredits", "100")
Script run 2 (Tuesday):   localStorage.getItem("myCredits")  → "100"  ✅
```

This is the same mechanism that made the Leads Tracker persist its URLs between Chrome extension opens.

---

# 5. Challenge 04 — addEventListener + Object in an Array

## Problem

A `data` array contains two player objects, each with `name` and `score` keys. A "Log Jane's Score" button has no ID. Add an ID to the button in HTML, grab it from the DOM, attach a click event listener, and when clicked — navigate into `data[0].score` and log the value.

## Concept Focus

Combining three skills: `addEventListener`, array index access `[0]`, and dot notation `.score` to extract a value from an object nested inside an array.

## Solution

### index.html addition
```html
<button id="jane-btn">Log Jane's Score</button>
```

### index.js
```js
const data = [
  { name: "Jane", score: 52 },
  { name: "Bob",  score: 34 }
]

const janeBtn = document.getElementById("jane-btn")

janeBtn.addEventListener("click", function() {
  console.log(data[0].score)   // 52
})
```

## Key Insight — Navigating Arrays of Objects Step by Step

When you get a complex data structure, break the navigation into one step at a time:

```
data                → the full array
data[0]             → the first object:  { name: "Jane", score: 52 }
data[0].score       → the score value:  52
```

This pattern — `array[index].property` — appears constantly in real-world development when you work with API responses, database results, or any collection of structured records.

---

# 6. Challenge 05 — Generate Sentence

## Problem

Create a function `generateSentence(desc, arr)` that returns a sentence like:

```
"The 3 largest countries are China, India, USA"
"The 2 best fruits are apples, bananas"
```

The number is always the array's length. The description is the second word. Each array item is listed after "are", separated by commas — but **no trailing comma** after the last item.

## Concept Focus

Building a dynamic string with a `for` loop, a template literal base string, `+=` concatenation, and conditional logic to suppress the final comma.

## Solution

```js
function generateSentence(desc, arr) {
  let baseString = `The ${arr.length} ${desc} are `

  const lastIndex = arr.length - 1

  for (let i = 0; i < arr.length; i++) {
    if (i === lastIndex) {
      baseString += arr[i]          // last item — no comma
    } else {
      baseString += arr[i] + ", "   // all others — add comma + space
    }
  }

  return baseString
}

const sentence = generateSentence("highest mountains", ["Mount Everest", "K2"])
console.log(sentence)
// "The 2 highest mountains are Mount Everest, K2"
```

## Key Insight — Suppressing the Trailing Comma

The trick is computing `lastIndex` **before** the loop, then checking inside the loop whether the current `i` equals it:

```
Array: ["Mount Everest", "K2"]
lastIndex = arr.length - 1 = 1

i=0: i === lastIndex? → 0 === 1? No  → add "Mount Everest, "
i=1: i === lastIndex? → 1 === 1? Yes → add "K2"  (no comma)

Result: "The 2 highest mountains are Mount Everest, K2"
```

This is a universal pattern for joining array items with a separator — the last item is the special case, not the first.

---

# 7. Challenge 06 — Render Images (innerHTML + for loop)

## Problem

Three team member photos are currently hardcoded in HTML as `<img>` tags. Replace that with a JavaScript function `renderImages()` that loops through an `images` array (containing file paths like `"images/hip1.jpg"`) and renders all three images dynamically using `innerHTML` — building the HTML string first in an accumulator variable, then assigning it once at the end.

## Concept Focus

The `innerHTML` accumulator pattern — building a full HTML string across loop iterations, then assigning to the DOM exactly once for better performance.

## Solution

```js
const images = ["images/hip1.jpg", "images/hip2.jpg", "images/hip3.jpg"]

const container = document.getElementById("container")

function renderImages() {
  let imgsBomb = ""   // accumulator — starts empty

  for (let i = 0; i < images.length; i++) {
    imgsBomb += `<img class="team-img" src="${images[i]}" alt="Employee in the company">`
  }

  container.innerHTML = imgsBomb   // DOM manipulation — once only
}

renderImages()
```

## Key Insight — DOM Manipulation Has a Cost

Every time you write to `innerHTML` (or any DOM property), the browser has to recalculate the page layout — a process called reflow. Minimise how often you do it:

```js
// ❌ Slow — DOM manipulation on EVERY loop iteration (3 reflows)
for (let i = 0; i < images.length; i++) {
  container.innerHTML += `<img src="${images[i]}">`
}

// ✅ Fast — DOM manipulation ONCE after the loop (1 reflow)
let imgsBomb = ""
for (let i = 0; i < images.length; i++) {
  imgsBomb += `<img src="${images[i]}">`
}
container.innerHTML = imgsBomb
```

For 3 items the difference is imperceptible, but the habit matters — if you're rendering hundreds of items, this optimisation becomes critical.

## Key Insight — alt Attributes for Accessibility

Every `<img>` element should have an `alt` attribute. Screen readers (used by people with visual impairments) read the `alt` text aloud. Dynamically generated images are often missing `alt` attributes — add them in the template literal:

```js
`<img class="team-img" src="${images[i]}" alt="Employee in the company">`
```

---

# 8. Challenge 07 — Rounding Numbers (.toFixed)

## Problem

A product price calculated in JavaScript comes out as `420.6969696969...`. Round it to exactly 2 decimal places for display in a buy button.

## Concept Focus

`.toFixed(n)` — a number method that returns a **string** representation of the number rounded to `n` decimal places.

## Solution

```js
let totalPrice = 420.6969696969

document.getElementById("buy-btn").textContent = `Buy now for $${totalPrice.toFixed(2)}`
// "Buy now for $420.70"
```

## Key Insight — .toFixed() Returns a String

`.toFixed()` is a **number method** — it only works when called on an actual number. It returns a `string`, which is usually what you want for display purposes:

```js
let price = 9.999
price.toFixed(2)         // "10.00"   ← string, rounded up
price.toFixed(0)         // "10"      ← string, no decimals
price.toFixed(4)         // "9.9990"  ← string, padded with zero

typeof price.toFixed(2)  // "string"
```

`.toFixed(2)` is particularly useful when working with monetary values, percentages, or any measurement that should display a fixed number of decimal places.

---

# 9. Challenge 08 — Convert String to Number (Number())

## Problem

The same buy button, but now `totalPrice` has been converted to a string `"420.6969696969"`. Calling `.toFixed(2)` on a string throws `TypeError: toFixed is not a function`. Fix it using `Number()` to convert the string back to a number before calling `.toFixed(2)`.

## Concept Focus

`Number()` — the built-in conversion function that turns strings (and other values) into numbers, essential when you receive numeric data from an `<input>` element, API, or database where everything arrives as a string.

## Solution

```js
let totalPrice = "420.6969696969"   // ← string (came from somewhere else)

document.getElementById("buy-btn").textContent =
  `Buy now for $${Number(totalPrice).toFixed(2)}`
// "Buy now for $420.70"
```

## Key Insight — Why Input Values Are Always Strings

`input.value` in JavaScript always returns a string — even if the user typed a number. This is one of the most common sources of bugs for beginners:

```js
let input = document.getElementById("price-input")
// User typed: 42

input.value           // "42"     ← string!
typeof input.value    // "string"

// ❌ Bug — string concatenation, not addition
"42" + 8              // "428"

// ✅ Fix — convert first
Number("42") + 8      // 50
Number(input.value) + 8  // 50
```

The same issue arises with data from `localStorage` (always strings) and from API responses where numbers might be serialised as strings.

## Key Insight — What Happens if Number() Can't Convert

If you pass a value that can't be converted to a number, `Number()` returns `NaN` (Not a Number):

```js
Number("hello")    // NaN
Number("")         // 0    ← empty string becomes zero
Number("42abc")    // NaN
Number("42")       // 42   ✅
Number(true)       // 1
Number(false)      // 0
```

`NaN` is a falsy value and a sentinel that signals the conversion failed — important to know when validating form inputs.

---

# 10. Key Concepts Consolidated

| Challenge | Primary Concept | Key Insight |
|-----------|----------------|-------------|
| 01 let & const | `const` by default, `let` only when reassigned | Scan for bare reassignments to decide |
| 02 Log items | Function with array parameter + `for` loop | The parameter is just an alias for whatever is passed in |
| 03 localStorage | `setItem` / `getItem` across separate page loads | Storage belongs to the browser origin, not a script run |
| 04 addEventListener + objects in arrays | `addEventListener` + `array[i].property` | Break complex navigation into one step at a time |
| 05 Generate sentence | `for` loop + `+=` + suppress trailing comma | Compute `lastIndex` before the loop, check inside |
| 06 Render images | `innerHTML` accumulator — build string, assign once | DOM manipulation has a cost — minimise it |
| 07 Rounding numbers | `.toFixed(n)` — rounds to n decimal places | Returns a string; call on a number not a string |
| 08 String to number | `Number()` — converts strings to numbers | `input.value` is always a string; convert before arithmetic |

### The Three-Step Pattern for Every Data-Driven DOM Render

Challenges 06 and 08 both follow the same structure that ran through the Leads Tracker:

```
1. Prepare data           → build HTML string in an accumulator variable
2. Process / transform    → apply .toFixed(), Number(), template literals
3. Write to DOM once      → element.innerHTML = accumulatorString
```

Building the string first and touching the DOM last is always the correct order.

---

# 11. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to any challenge subfolder
   ```bash
   cd "12. Javascript Challenges Part-3/06. Render Images"
   ```

3. For JS-only challenges (01–05, 07–08): Open `index.html` in your browser and check the console (`F12`), or run `index.js` directly with Node.

4. For HTML/CSS challenges (06, 07): Open `index.html` with **Live Server** in VS Code.

---

# 12. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Module 4 — Essential JavaScript Concepts (Quickfire Challenges, Part 3)

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *These eight challenges close out Module 4 by forcing independent recall of every new concept — const discipline, localStorage persistence, objects inside arrays, the innerHTML accumulator pattern, decimal rounding, and the string-to-number conversion that trips up nearly every developer when they first work with form inputs.*
