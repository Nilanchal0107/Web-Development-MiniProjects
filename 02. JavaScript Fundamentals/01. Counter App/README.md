# 05. Counter App (Passenger Counter)
![JavaScript](https://img.shields.io/badge/JavaScript-Logic-yellow?style=flat-square&logo=javascript)
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A subway passenger counter app — the **first JavaScript project** in the course. Click **Increment** to count each passenger entering, click **Save** to log the count to the previous entries list and reset the counter back to zero.

This README is a **complete concept revision guide**. It covers every JavaScript concept introduced for the first time in this project — from variables and data types through functions, the DOM, and string manipulation.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [How the App Works](#3-how-the-app-works)
4. [Setting Up JavaScript — The Script Tag](#4-setting-up-javascript--the-script-tag)
5. [Variables — `let`](#5-variables--let)
6. [Data Type 1 — Numbers](#6-data-type-1--numbers)
7. [Data Type 2 — Strings](#7-data-type-2--strings)
8. [String Concatenation and `+=`](#8-string-concatenation-and-)
9. [Functions](#9-functions)
10. [The DOM — document.getElementById](#10-the-dom--documentgetelementbyid)
11. [innerText vs textContent](#11-innertext-vs-textcontent)
12. [onclick Event Listener](#12-onclick-event-listener)
13. [console.log — The Developer's Best Friend](#13-consolelog--the-developers-best-friend)
14. [Scope — Global vs Block](#14-scope--global-vs-block)
15. [Escape Characters in Strings](#15-escape-characters-in-strings)
16. [The Complete App — How It All Fits Together](#16-the-complete-app--how-it-all-fits-together)
17. [How to Run](#17-how-to-run)
18. [Course Reference](#18-course-reference)

---

# 1. Project Overview

The Passenger Counter App solves a real problem: counting people entering a subway station. The app has:

* A **live counter display** — an `<h2>` showing the current count, updated in real time by JavaScript
* An **Increment button** — increments the count by 1 each time it is clicked
* A **Save button** — appends the current count to a "Previous Entries" list and resets the counter to zero
* A **Previous Entries paragraph** — accumulates a running log of all saved counts separated by dashes

---

# 2. Project Structure

```
05. Counter App/
│
├── index.html   → HTML structure: heading, counter display, buttons, previous entries
├── index.css    → Styling (pre-provided — background image, button colors, layout)
├── index.js     → All JavaScript logic: variables, functions, DOM manipulation
└── station.jpg  → Background image of a subway station
```

---

# 3. How the App Works

```
User clicks [INCREMENT]
     │
     ▼
increment() function runs
     │
     ├── count += 1           (JavaScript variable updated)
     └── countEl.textContent = count   (DOM updated to show new number)

User clicks [SAVE]
     │
     ▼
save() function runs
     │
     ├── saveEl.textContent += count + " - "  (appends to previous entries)
     ├── count = 0            (JavaScript variable reset)
     └── countEl.textContent = 0      (DOM display reset)
```

---

# 4. Setting Up JavaScript — The Script Tag

JavaScript is added to a webpage using the `<script>` tag in the HTML file.

### Method 1 — Inline JavaScript (not recommended)

```html
<body>
  <h1>Counter</h1>
  <script>
    // JavaScript written directly inside the HTML file
    document.getElementById("count-el").textContent = 5
  </script>
</body>
```

This works, but mixing JavaScript inside HTML is considered poor practice — it's harder to read, maintain, and debug.

### Method 2 — External JavaScript File (correct approach)

```html
<!-- index.html -->
<body>
  <h1>Counter</h1>
  <script src="index.js"></script>  <!-- link to a separate JS file -->
</body>
```

```js
// index.js — all JavaScript lives here
document.getElementById("count-el").textContent = 5
```

The `src` attribute on the `<script>` tag works exactly like `src` on an `<img>` tag — it points to a file in the same folder. Keeping JavaScript in its own `.js` file is the professional standard.

> **Note:** The `<script>` tag is placed at the **bottom of the `<body>`**, just before `</body>`. This ensures the HTML elements exist in the page before the JavaScript tries to access them.

---

# 5. Variables — `let`

A **variable** is a named container for storing data. In JavaScript, you create variables using the `let` keyword.

```js
let count = 0
```

Reading this in plain English: *"Let count be zero."*

```
let   count   =   0
 │      │     │   │
 │      │     │   └── initial value (the data stored)
 │      │     └────── assignment operator
 │      └──────────── variable name (you choose this)
 └─────────────────── keyword that declares a new variable
```

### Reassigning a Variable

With `let`, you can change the value at any point:

```js
let count = 0    // count is 0
count = 3        // count is now 3
count = 1        // count is now 1
```

Notice: when **reassigning**, you do NOT write `let` again. `let` is only used when you first **declare** (create) the variable.

### Reading Order

JavaScript reads from **top to bottom**. The value of a variable at any point is the most recent assignment above it:

```js
let count = 0
console.log(count)   // → 0

count = 5
console.log(count)   // → 5

count = 1
console.log(count)   // → 1
```

### Cannot Use Before Declaring

```js
console.log(myAge)   // ❌ ReferenceError: Cannot access 'myAge' before initialization
let myAge = 35
```

JavaScript throws a `ReferenceError` if you try to use a variable before it is declared.

---

# 6. Data Type 1 — Numbers

Numbers are the first **data type** in JavaScript. A data type is the category of value a variable holds.

```js
let count = 0         // integer
let price = 9.99      // decimal (called a float)
let temp  = -5        // negative number
```

### Mathematical Operations

JavaScript works like a calculator with numbers:

```js
let a = 5 + 7     // 12   (addition)
let b = 5 - 7     // -2   (subtraction)
let c = 5 * 7     // 35   (multiplication)
let d = 5 / 7     // 0.71... (division)
```

### Operating with Variables

```js
let firstBatch  = 5
let secondBatch = 7
let count = firstBatch + secondBatch   // 12
```

### Incrementing a Variable

The most common pattern in this app — add 1 to the current value of a variable:

```js
let count = 5

// Long form
count = count + 1    // count is now 6

// Shorthand — does the exact same thing
count += 1           // count is now 7
```

The `+=` operator takes the current value on the left, adds the right-hand value to it, and stores the result back in the same variable.

```js
count += 1    // add 1
count += 10   // add 10
count -= 2    // subtract 2
count *= 3    // multiply by 3
count /= 2    // divide by 2
```

In the app, `count += 1` is what runs every time the Increment button is clicked.

---

# 7. Data Type 2 — Strings

Strings are the second data type — they represent **text**. A string is created by wrapping characters in quotes.

```js
let username  = "Nilanchal"     // double quotes
let greeting  = 'Hello'        // single quotes — both work
let message   = "You have 3 new notifications"
```

Both double and single quotes work, but you must open and close with the same type:

```js
let bad = "hello'   // ❌ SyntaxError — mismatched quotes
let good = "hello"  // ✅
```

### Strings vs Numbers — The Wrestling Match

When you add a string and a number together using `+`, **the string always wins** — the number gets converted into a string, and they are joined as text (concatenated), not added mathematically:

```js
let points = "4"     // string
let bonus  = 10      // number

let total = points + bonus
console.log(total)   // "410" ← string, NOT the number 14!
```

```js
// Number + Number → arithmetic result
console.log(4 + 5)       // 9  (number, shown in blue in console)

// String + String → concatenation
console.log("2" + "4")   // "24"  (string)

// String + Number → string wins, concatenation
console.log("5" + 1)     // "51"  (string)
console.log(100 + "100") // "100100"  (string)
```

> **Visual tip:** In the browser console, **numbers appear in blue** and **strings appear in white**. This helps you spot type bugs instantly.

---

# 8. String Concatenation and `+=`

**Concatenation** means joining strings together using `+`:

```js
let greeting = "Welcome back"
let name     = "Nilanchal"

let message  = greeting + ", " + name + "!"
// "Welcome back, Nilanchal!"
```

### The `+=` Operator for Strings

Just like with numbers, `+=` works for strings too — it **appends** to the existing string instead of replacing it:

```js
let entries = "Previous entries: "

entries += "4 - "    // "Previous entries: 4 - "
entries += "7 - "    // "Previous entries: 4 - 7 - "
entries += "11 - "   // "Previous entries: 4 - 7 - 11 - "
```

Without `+=`, using `=` would wipe out the previous content:

```js
entries = "4 - "     // ❌ overwrites — previous entries lost
entries += "4 - "    // ✅ appends — previous entries kept
```

This is exactly how the **Previous Entries** feature works in the app — every time Save is clicked, the current count + " - " is **appended** to the paragraph's existing text content.

---

# 9. Functions

A **function** is a reusable block of code that only runs when you **call** it. Think of it as teaching JavaScript a named command it can execute on demand.

### Declaring a Function

```js
function functionName() {
  // code to run goes here (the "body" of the function)
}
```

```js
function countdown() {
  console.log(5)
  console.log(4)
  console.log(3)
  console.log(2)
  console.log(1)
}
```

Declaring a function does **not** run it. It just teaches JavaScript what to do when the command is given.

### Calling / Invoking a Function

```js
countdown()    // ← this is what actually runs the code inside the function
countdown()    // call it again — runs a second time
countdown()    // and again
```

The `()` after the name is what **invokes** (runs) the function. Without `()`, you are just referencing the function, not running it.

### Why Functions?

Without functions, if you need the same 5 lines to run in multiple places, you copy-paste them. With functions, you write them once and call the name wherever needed:

```js
// Without functions — repetitive
console.log(5); console.log(4); console.log(3); console.log(2); console.log(1)
// ... later in code ...
console.log(5); console.log(4); console.log(3); console.log(2); console.log(1)

// With functions — DRY
function countdown() {
  console.log(5); console.log(4); console.log(3); console.log(2); console.log(1)
}
countdown()   // before race 1
countdown()   // before race 2
```

### The App's Two Functions

```js
let count = 0

function increment() {
  count += 1
  countEl.textContent = count
}

function save() {
  saveEl.textContent += count + " - "
  count = 0
  countEl.textContent = 0
}
```

`increment()` is called every time the Increment button is clicked.
`save()` is called every time the Save button is clicked.

### Passing Arguments to Functions

Some built-in JavaScript functions need data to work with. You pass data inside the parentheses — this data is called an **argument**:

```js
console.log(count)                      // passes 'count' as argument
document.getElementById("count-el")    // passes the ID string as argument
```

The analogy from the course: *if the function is a chef, the arguments are the ingredients you hand the chef to cook with.*

---

# 10. The DOM — `document.getElementById`

**DOM** stands for **Document Object Model**. The simple translation: *how you use JavaScript to read and modify a webpage.*

```
Document  → the HTML file
Object    → JavaScript stores the HTML as a JS object (a structured data container)
Model     → it's a JavaScript representation (model) of the real HTML elements
```

### Grabbing an HTML Element

```js
let countEl = document.getElementById("count-el")
```

Breaking this down:

```
document          → refers to the entire HTML page
.getElementById   → a built-in function that searches for an element
("count-el")      → the ID string — tells it which element to find
```

This reaches into the HTML, finds the element with `id="count-el"`, and stores a **JavaScript representation** of it in the variable `countEl`. You now have a handle on that element and can read or change it.

### Modifying an Element's Content

Once you have the element, use `.textContent` to read or change the text inside it:

```js
countEl.textContent = 5        // sets the text to "5"
countEl.textContent = count    // sets the text to whatever 'count' holds
countEl.textContent = 0        // resets the text to "0"
```

### Camel Case Naming Convention

In HTML/CSS, IDs use kebab-case: `count-el`, `save-btn`.
In JavaScript, variables use **camelCase**: `countEl`, `saveBtn`.

```js
let count-el = ...   // ❌ SyntaxError — dashes are not allowed in JS variable names
let countEl  = ...   // ✅ camelCase is the correct convention
```

---

# 11. `innerText` vs `textContent`

Both `.innerText` and `.textContent` set or read the text of an element. They seem identical but behave differently with whitespace.

### The Problem

When the save paragraph was first built using `.innerText`, spaces inside strings were getting lost — the " - " separator between entries would appear correctly in code but disappear in the browser.

### The Fix — Use `textContent`

`.innerText` is aware of CSS styling and only returns "human-readable" text. Spaces can be collapsed or ignored. `.textContent` returns the raw text exactly as it is, including all whitespace.

```js
// ❌ Spaces may be collapsed
saveEl.innerText += countStr

// ✅ Whitespace preserved exactly as written
saveEl.textContent += countStr
```

This was discovered by searching **"innerText alternative MDN"** on Google, which led to the Mozilla Developer Network docs. The MDN comparison table showed that `.innerText` is "aware of styling and won't return text of hidden elements" — hinting that whitespace might be affected.

### Key Lesson — How to Find Answers

```
Problem → Google it → MDN / W3Schools / Stack Overflow → read selectively
```

You do not need to understand every word on a documentation page. Scan for hints, find the relevant property or method, try it, and verify with `console.log`. This is a core developer skill — searching for solutions is not cheating, it's the job.

---

# 12. `onclick` Event Listener

An **event listener** tells JavaScript: *"When the user does X, run this function."*

The simplest way to attach a click listener is via the `onclick` HTML attribute:

```html
<button id="increment-btn" onclick="increment()">INCREMENT</button>
<button id="save-btn"      onclick="save()">SAVE</button>
```

When the button is clicked, the browser calls the named function in JavaScript. The `()` after the function name is required — without it, JavaScript receives the function reference but does not call it.

```html
onclick="increment()"   <!-- ✅ calls the function -->
onclick="increment"     <!-- ❌ does NOT call the function -->
```

### How It Connects HTML → JavaScript

```
HTML button clicked
     │
     ▼
onclick="increment()"  ← browser sees this attribute
     │
     ▼
JavaScript looks for a function named 'increment'
     │
     ▼
function increment() { ... } runs
```

> **Note from the course:** `onclick` in HTML is beginner-friendly and great for understanding the concept, but in professional projects it's better to register event listeners in JavaScript using `element.addEventListener()`. This keeps HTML structure and JS behaviour separated. This more advanced approach is taught later in the course.

---

# 13. `console.log` — The Developer's Best Friend

`console.log()` prints any value to the browser's developer console. It is used for **debugging** — verifying that variables contain what you think they contain.

```js
let count = 0
console.log(count)       // prints: 0

count += 1
console.log(count)       // prints: 1

let name = "Nilanchal"
console.log(name)        // prints: Nilanchal
```

### Opening the Console

* **Right-click** on any webpage → **Inspect** → click the **Console** tab
* Or press `F12` / `Cmd+Option+J` (Mac) / `Ctrl+Shift+J` (Windows)

You can also type JavaScript directly into the console and run it live.

### The Habit to Build

After every single step when writing new code, `console.log` the relevant variable:

```js
let countEl = document.getElementById("count-el")
console.log(countEl)    // ← verify you got the right element before moving on
```

If you get a bug, the `console.log` trail shows you exactly which step first went wrong. This dramatically reduces debugging time.

---

# 14. Scope — Global vs Block

**Scope** controls where a variable is accessible (visible) in code.

### Global Scope

A variable declared **outside** any function is in the **global scope** — it can be read and modified from anywhere in the file, including inside functions:

```js
let count = 0       // ← global scope

function increment() {
  count += 1        // ✅ can access 'count' from inside the function
}
```

### Block Scope

A variable declared **inside** a function (or any `{}` block) is in **block scope** — it only exists inside that block. It cannot be accessed from outside:

```js
function logLapTime() {
  let totalTime = lap1 + lap2 + lap3    // ← block scope
  console.log(totalTime)
}

console.log(totalTime)   // ❌ ReferenceError: totalTime is not defined
```

The rule: **outer scope → inner scope works. Inner scope → outer scope does NOT.**

```
Global scope
│
│  let count = 0         ← accessible everywhere
│
├── function increment() {
│     count += 1         ← ✅ reading global variable works
│     let temp = 5       ← block-scoped, exists only here
│   }
│
└── console.log(count)   ← ✅ works
    console.log(temp)    ← ❌ ReferenceError
```

This is why `count` is declared **outside** the `increment()` and `save()` functions — it needs to be readable and writable from both functions.

---

# 15. Escape Characters in Strings

If your string contains the same quote character used to open/close it, JavaScript gets confused — it thinks the string has ended early.

```js
let msg = "She said "hello""   // ❌ JavaScript thinks string ends at second "
```

**The fix:** use a **backslash `\`** before the conflicting character. This is the **escape character** — it tells JavaScript: "the next character is part of the string, not a string delimiter."

```js
let msg = "She said \"hello\""   // ✅ backslash escapes the inner quotes
```

```js
// Apostrophe inside single-quoted string
let note = 'I\'d love to see The Lion King'    // ✅

// Or just swap the outer quote style to avoid the clash
let note = "I'd love to see The Lion King"     // ✅ no escape needed
```

Common escape sequences:

| Sequence | What it produces |
|----------|-----------------|
| `\"` | Double quote inside double-quoted string |
| `\'` | Apostrophe inside single-quoted string |
| `\\` | A literal backslash |
| `\n` | New line |
| `\t` | Tab |

---

# 16. The Complete App — How It All Fits Together

### index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
    <h1>PEOPLE ENTERED:</h1>
    <h2 id="count-el">0</h2>

    <button id="increment-btn" onclick="increment()">INCREMENT</button>
    <button id="save-btn"      onclick="save()">SAVE</button>

    <p id="save-el">Previous entries: </p>

    <script src="index.js"></script>
  </body>
</html>
```

### index.js

```js
// 1. Store the count — initialised to zero
let count = 0

// 2. Grab the HTML elements we need to update
let countEl = document.getElementById("count-el")
let saveEl  = document.getElementById("save-el")

// 3. Increment function — runs when INCREMENT button is clicked
function increment() {
  count += 1                       // update the JS variable
  countEl.textContent = count      // reflect the new value in the DOM
}

// 4. Save function — runs when SAVE button is clicked
function save() {
  saveEl.textContent += count + " - "   // append current count to log
  count = 0                             // reset JS variable
  countEl.textContent = 0              // reset DOM display
}
```

### Step-by-Step Flow

```
Page loads
  └── count = 0, countEl shows "0"

[INCREMENT] clicked (×4)
  └── count = 4, countEl shows "4"

[SAVE] clicked
  └── saveEl shows "Previous entries: 4 - "
  └── count = 0, countEl shows "0"

[INCREMENT] clicked (×7)
  └── count = 7, countEl shows "7"

[SAVE] clicked
  └── saveEl shows "Previous entries: 4 - 7 - "
  └── count = 0, countEl shows "0"
```

---

# 17. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder
   ```bash
   cd "05. Counter App"
   ```

3. Open `index.html` in your browser or use **Live Server** in VS Code.

4. Click **INCREMENT** to count, click **SAVE** to log and reset.

---

# 18. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Module 3 — JavaScript Basics (Passenger Counter)
* **Reference Docs:** [MDN Web Docs — textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *This is the first JavaScript project in the course — the moment HTML and CSS came to life with interactivity. Every concept here (variables, functions, DOM manipulation, strings, events) is foundational and reused in every JavaScript project that follows.*
