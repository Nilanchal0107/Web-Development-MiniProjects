# 06. JavaScript Challenges Part-1
![JavaScript](https://img.shields.io/badge/JavaScript-Practice-yellow?style=flat-square&logo=javascript)
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

Six standalone JavaScript challenges designed to build **muscle memory** for the core concepts introduced in the Counter App — variables, string concatenation, incrementing/decrementing, type coercion, DOM manipulation, and functions with `onclick` event listeners.

This README is a **complete concept revision guide**. Each challenge is documented with its problem statement, concept focus, the solution pattern, and the key insight it was designed to teach.

---

# Table of Contents

1. [Project Structure](#1-project-structure)
2. [Why Challenges?](#2-why-challenges)
3. [Challenge 01 — Variable Practice](#3-challenge-01--variable-practice)
4. [Challenge 02 — Concatenate Two Strings in a Function](#4-challenge-02--concatenate-two-strings-in-a-function)
5. [Challenge 03 — Increment and Decrement](#5-challenge-03--increment-and-decrement)
6. [Challenge 04 — Strings and Numbers](#6-challenge-04--strings-and-numbers)
7. [Challenge 05 — Rendering an Error Message](#7-challenge-05--rendering-an-error-message)
8. [Challenge 06 — Calculator Challenge](#8-challenge-06--calculator-challenge)
9. [Key Concepts Consolidated](#9-key-concepts-consolidated)
10. [How to Run](#10-how-to-run)
11. [Course Reference](#11-course-reference)

---

# 1. Project Structure

```
06. JavaScript Challenges Part-1/
│
├── 01.VariablePractice/
│     └── index.js    → Declare variables, concatenate into fullName
│
├── 02.ConcatenateTwoStringsInAFunction/
│     └── index.js    → Build a greeting string inside a function body
│
├── 03.IncrementAndDecrement/
│     └── index.js    → addThreePoints() and removeOnePoint() functions
│
├── 04.StringsAndNumbers/
│     └── index.js    → Predict and verify mixed string + number operations
│
├── 05.RenderingAnErrorMessage/
│     ├── index.html  → Nike shoe purchase UI with an empty error paragraph
│     ├── index.css   → Pre-provided red error text styling
│     └── index.js    → onclick → grab DOM element → render error string
│
└── 06.CalculatorChallenge/
      ├── index.html  → Two number spans + four operation buttons + result span
      ├── index.css   → Pre-provided styling
      └── index.js    → Four functions: add, subtract, divide, multiply
```

---

# 2. Why Challenges?

After learning new concepts in a guided project, isolated challenges are essential for building **muscle memory**. Following along while someone else codes creates much weaker recall than writing the same pattern from scratch under your own steam.

Each of the six challenges targets one concept from the Counter App in isolation, stripping away all other distractions. The goal is for these patterns — declare a variable, write a function, grab a DOM element, update `.textContent` — to become completely automatic before moving on to more complex projects.

---

# 3. Challenge 01 — Variable Practice

## Problem

Create two variables `firstName` and `lastName`, set them to your first and last name, concatenate them into a third variable `fullName` with a space in between, and log `fullName` to the console.

## Concept Focus

Variable declaration with `let`, string values, concatenation using `+`.

## Solution

```js
let firstName = "Nilanchal"
let lastName  = "Jena"
let fullName  = firstName + " " + lastName

console.log(fullName)   // "Nilanchal Jena"
```

## Key Insight — Where to Put the Space

Three valid ways to add the space between names:

```js
// Option 1 — space at end of firstName
let firstName = "Nilanchal "
let fullName  = firstName + lastName          // "Nilanchal Jena"

// Option 2 — space at start of lastName
let lastName  = " Jena"
let fullName  = firstName + lastName          // "Nilanchal Jena"

// Option 3 — space as a separate string (best practice)
let fullName  = firstName + " " + lastName   // "Nilanchal Jena"
```

Option 3 is the cleanest — the variables hold only the name itself, and the formatting (the space) is handled separately when you compose the final string. This makes the variables reusable without hidden trailing/leading spaces.

---

# 4. Challenge 02 — Concatenate Two Strings in a Function

## Problem

Given the variables `name = "Linda"` and `greeting = "Hi there"`, create a function that logs `"Hi there, Linda!"` to the console when called.

## Concept Focus

Defining and calling functions, string concatenation inside a function body, using variables defined in outer (global) scope from within a function.

## Solution

```js
let name     = "Linda"
let greeting = "Hi there"

function greetLinda() {
  console.log(greeting + ", " + name + "!")
}

greetLinda()   // "Hi there, Linda!"
```

## Key Insight — Functions Can Access Global Variables

The function `greetLinda` does not have `name` or `greeting` declared inside it — it reaches out to the global scope and reads them from there. This is called **closure over the outer scope** and is the foundation of how the Counter App's `increment()` function can read and modify the global `count` variable.

```
Global scope
  │
  │  let name = "Linda"        ← accessible from anywhere
  │  let greeting = "Hi there" ← accessible from anywhere
  │
  └── function greetLinda() {
        // can read 'name' and 'greeting' from the outer scope ✅
      }
```

---

# 5. Challenge 03 — Increment and Decrement

## Problem

Given `let myPoints = 3`, create two functions — `addThreePoints()` and `removeOnePoint()`. Call them however many times needed so that the final `console.log(myPoints)` outputs `10`.

## Concept Focus

Writing functions that modify a global variable, `+=` and `-=` operators, function calls, mental arithmetic to reach a target value.

## Solution

```js
let myPoints = 3

function addThreePoints() {
  myPoints += 3
}

function removeOnePoint() {
  myPoints -= 1
}

// Start: 3
addThreePoints()   // 6
addThreePoints()   // 9
addThreePoints()   // 12
removeOnePoint()   // 11
removeOnePoint()   // 10

console.log(myPoints)   // 10
```

## Key Insight — Functions That Modify Global State

Both functions directly modify the `myPoints` variable that lives in the global scope. They don't receive it as input or return a value — they reach out and change the shared variable. This is the same pattern as `increment()` in the Counter App changing the global `count`.

```js
// The += and -= shorthands in full:
myPoints += 3   // same as: myPoints = myPoints + 3
myPoints -= 1   // same as: myPoints = myPoints - 1
```

---

# 6. Challenge 04 — Strings and Numbers

## Problem

Predict what each of these `console.log` statements will output, then run the code to verify:

```js
console.log("2" + 2)
console.log(11 + 7)
console.log(6 + "5")
console.log("my points: " + 5 + 9)
console.log(2 + 2)
console.log("11" + "14")
```

## Concept Focus

JavaScript type coercion — how `+` behaves differently when strings are involved (the "wrestling match" between strings and numbers).

## Solutions and Explanations

```js
console.log("2" + 2)              // "22"   — string wins, concatenation
console.log(11 + 7)               // 18     — number + number = arithmetic
console.log(6 + "5")              // "65"   — string wins, even though number is first
console.log("my points: " + 5 + 9)  // "my points: 59" — string contaminates entire chain
console.log(2 + 2)                // 4      — number + number = arithmetic
console.log("11" + "14")          // "1114" — string + string = concatenation
```

## The Core Rule — String Always Wins

When `+` is used between a string and a number, JavaScript converts the number into a string and concatenates. It does NOT perform arithmetic:

```
string + number  →  string (concatenation)
number + string  →  string (concatenation)
number + number  →  number (arithmetic)
string + string  →  string (concatenation)
```

## The Contamination Gotcha

```js
console.log("my points: " + 5 + 9)   // "my points: 59"  ← NOT "my points: 14"
```

JavaScript evaluates left to right. `"my points: " + 5` happens first → becomes the string `"my points: 5"`. Then `"my points: 5" + 9` → `"my points: 59"`. The string at the start "contaminates" the entire chain.

**The fix** — perform the arithmetic first by wrapping it in parentheses:

```js
console.log("my points: " + (5 + 9))   // "my points: 14"  ✅
```

Or store the number result in a variable first:

```js
let total = 5 + 9                        // 14 — pure number addition
console.log("my points: " + total)       // "my points: 14"  ✅
```

This exact pattern appeared in the Calculator Challenge (Challenge 06) — you must calculate `num1 + num2` as numbers before concatenating with the label string.

## Console Colour Tip

In the browser DevTools console, **numbers are shown in blue** and **strings are shown in white**. Use this to instantly spot whether a value is the type you expected.

---

# 7. Challenge 05 — Rendering an Error Message

## Problem

A Nike shoe e-commerce page has a **Purchase** button and an empty `<p id="error"></p>` paragraph. When the button is clicked, render `"Something went wrong. Please try again."` inside the error paragraph using JavaScript.

## Concept Focus

`onclick` event listener on a button, `document.getElementById()`, `.textContent =`, connecting all three pieces together.

## Solution

### index.html (relevant parts)

```html
<button onclick="purchase()">Buy Now</button>
<p id="error"></p>

<script src="index.js"></script>
```

### index.js

```js
let errorParagraph = document.getElementById("error")

function purchase() {
  errorParagraph.textContent = "Something went wrong. Please try again."
}
```

## Key Insight — The Three-Step DOM Pattern

Every interactive DOM feature follows this same three-step pattern:

```
Step 1 — Grab the element
  let errorParagraph = document.getElementById("error")

Step 2 — Write a function that modifies it
  function purchase() {
    errorParagraph.textContent = "Something went wrong. Please try again."
  }

Step 3 — Hook the function to a user action
  <button onclick="purchase()">Buy Now</button>
```

This is the exact same pattern as the Counter App — just applied to rendering an error string instead of a number.

## Why Grab the Element Outside the Function?

```js
// Less efficient — grabs the element from the DOM on every single click
function purchase() {
  let errorParagraph = document.getElementById("error")
  errorParagraph.textContent = "Something went wrong."
}

// Better — grabs it once when the page loads, reuses the reference
let errorParagraph = document.getElementById("error")

function purchase() {
  errorParagraph.textContent = "Something went wrong."
}
```

Grabbing DOM elements is relatively slow. Doing it once at the global level and storing the result in a variable means subsequent function calls just use the already-found reference — much faster.

---

# 8. Challenge 06 — Calculator Challenge

## Problem

A page shows two numbers (8 and 2) and four buttons: **Add**, **Subtract**, **Divide**, **Multiply**. Clicking any button should calculate the result and render it as `"Sum: 10"` (or the appropriate result) inside a `<span id="sum-l">`.

## Concept Focus

Four functions with `onclick`, performing arithmetic with variables, rendering a composed string to the DOM, and avoiding the string-number contamination bug from Challenge 04.

## Solution

### index.html (relevant parts)

```html
<span id="num1-l"></span>
<span id="num2-l"></span>

<button onclick="add()">Add</button>
<button onclick="subtract()">Subtract</button>
<button onclick="divide()">Divide</button>
<button onclick="multiply()">Multiply</button>

<span id="sum-l"></span>

<script src="index.js"></script>
```

### index.js

```js
let num1 = 8
let num2 = 2

// Render the starting numbers into the page
document.getElementById("num1-l").textContent = num1
document.getElementById("num2-l").textContent = num2

// Grab the result span
let sumEl = document.getElementById("sum-l")

function add() {
  let result = num1 + num2          // pure number arithmetic first
  sumEl.textContent = "Sum: " + result
}

function subtract() {
  let result = num1 - num2
  sumEl.textContent = "Sum: " + result
}

function divide() {
  let result = num1 / num2
  sumEl.textContent = "Sum: " + result
}

function multiply() {
  let result = num1 * num2
  sumEl.textContent = "Sum: " + result
}
```

## The Critical Bug to Avoid

```js
// ❌ WRONG — string contamination
sumEl.textContent = "Sum: " + num1 + num2
// "Sum: " + 8 → "Sum: 8"
// "Sum: 8" + 2 → "Sum: 82"  ← wrong! This is 82, not 10

// ✅ CORRECT — calculate first, label second
let result = num1 + num2            // pure number: 10
sumEl.textContent = "Sum: " + result  // "Sum: " + 10 → "Sum: 10"
```

The variable `result` holds only numbers being added together — JavaScript performs arithmetic. Only then is the number concatenated with the label string `"Sum: "`. This is the central insight of Challenge 04 applied in a real UI context.

---

# 9. Key Concepts Consolidated

| Challenge | Concept Drilled |
|-----------|----------------|
| 01 Variable Practice | `let` declaration, string assignment, multi-variable concatenation with a space |
| 02 Concatenate in a Function | Writing functions, calling functions, accessing global variables from within a function body |
| 03 Increment & Decrement | `+=` and `-=`, functions that modify global state, multiple function calls to reach a target |
| 04 Strings & Numbers | Type coercion rules, the "string always wins" rule, left-to-right evaluation, parentheses fix |
| 05 Error Message | The full three-step DOM pattern: grab element → write function → hook to onclick |
| 06 Calculator | Four functions on one page, calculate-first-then-concatenate pattern, multiple onclick handlers |

### The Overarching Pattern

All six challenges reinforce the same fundamental loop:

```
Data (variables)
    +
Logic (functions that modify variables)
    +
Display (DOM: grab element → set .textContent)
    +
Trigger (onclick → call function)
```

Every JavaScript interactive feature you will ever build is a variation of this loop. These challenges exist to make it second nature.

---

# 10. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to any challenge subfolder
   ```bash
   cd "06. JavaScript Challenges Part-1/01.VariablePractice"
   ```

3. Open `index.html` in your browser (for challenges 05 and 06) or run `index.js` with Node / open with Live Server in VS Code.

4. Open the browser console (`F12` → Console tab) to see output for the pure JS challenges (01–04).

---

# 11. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Module 3 — JavaScript Basics (Quickfire Challenges)

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *These six challenges are the repetition layer between the Counter App and the Basketball Scoreboard. Every concept here reappears in every JavaScript project that follows — the muscle memory built here is foundational.*
