# 09. JavaScript Challenges Part-2
![JavaScript](https://img.shields.io/badge/JavaScript-Practice-yellow?style=flat-square&logo=javascript)
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

Eight standalone challenges designed to build muscle memory on every new concept introduced in the Blackjack Game — objects, `if/else if/else`, loops and arrays, the four array mutation methods (`push`, `pop`, `shift`, `unshift`), logical operators, `Math.random()` with `return`, DOM rendering from arrays, and conditional sorting. Two of the challenges (06 and 07) are mini-apps with their own HTML/CSS.

This README is a **complete concept revision guide**. Each challenge is documented with its problem statement, concept focus, full solution, and the key insight it was designed to teach.

---

# Table of Contents

1. [Project Structure](#1-project-structure)
2. [Why Challenges?](#2-why-challenges)
3. [Challenge 01 — Objects and Functions](#3-challenge-01--objects-and-functions)
4. [Challenge 02 — If Else (Train Ticket Pricing)](#4-challenge-02--if-else-train-ticket-pricing)
5. [Challenge 03 — Loops and Arrays (Countries)](#5-challenge-03--loops-and-arrays-countries)
6. [Challenge 04 — push, pop, shift, unshift](#6-challenge-04--push-pop-shift-unshift)
7. [Challenge 05 — Logical Operators (Friday the 13th)](#7-challenge-05--logical-operators-friday-the-13th)
8. [Challenge 06 — Rock Paper Scissors (Random Return)](#8-challenge-06--rock-paper-scissors-random-return)
9. [Challenge 07 — Emoji Fighter (DOM + Random + Event Listener)](#9-challenge-07--emoji-fighter-dom--random--event-listener)
10. [Challenge 08 — Sorting Fruits (for loop + if/else + DOM)](#10-challenge-08--sorting-fruits-for-loop--ifelse--dom)
11. [Key Concepts Consolidated](#11-key-concepts-consolidated)
12. [How to Run](#12-how-to-run)
13. [Course Reference](#13-course-reference)

---

# 1. Project Structure

```
09. Javascript Challenges Part-2/
│
├── 01. Objecs And Functions/
│     └── index.js       → person object + logData() function
│
├── 02. If Else/
│     └── index.js       → multi-branch ticket pricing by age
│
├── 03. Loops And Arrays/
│     └── index.js       → for loop through countries array
│
├── 04. Push, Pop, Shift and Unshift/
│     └── index.js       → repair the largeCountries array
│
├── 05. Logical Operators/
│     └── index.js       → Friday the 13th check with &&
│
├── 06. Rock Papers Scissor/
│     └── index.js       → getHand() returns random item from array
│
├── 07. EmojiFighter/
│     ├── index.html     → stage div + pick fighters button
│     ├── index.css      → emoji styling
│     └── index.js       → addEventListener + two random emojis rendered
│
└── 08. Sorting Fruits/
      ├── index.html     → apple shelf div + orange shelf div
      ├── index.css      → shelf styling
      └── index.js       → sortFruit() with for loop + if/else + textContent +=
```

---

# 2. Why Challenges?

These eight challenges reinforce the concepts from the Blackjack Game. Following along while someone codes is very different from writing it yourself — these challenges force you to produce the same patterns from scratch, which is the only way to build true muscle memory. Challenges 01–05 are pure JavaScript (console output), while 06–08 involve HTML and CSS, mirroring real-world development where you constantly switch between all three languages.

---

# 3. Challenge 01 — Objects and Functions

## Problem

Create a `person` object with three keys — `name`, `age`, and `country` — set to your own details. Then create a function `logData()` that reads from the object and logs a sentence in this format:

```
Nilanchal is 22 years old and lives in India.
```

Call `logData()` to verify.

## Concept Focus

Object creation with key-value pairs, dot notation to access object properties, composing a string from object values inside a function, calling a function.

## Solution

```js
let person = {
  name:    "Nilanchal",
  age:     22,
  country: "India"
}

function logData() {
  console.log(person.name + " is " + person.age + " years old and lives in " + person.country + ".")
}

logData()   // "Nilanchal is 22 years old and lives in India."
```

## Key Insight — Reading Object Properties Inside a Function

The function does not receive `person` as a parameter — it reaches out to the global scope and reads it directly. This works because functions have access to variables declared in the outer (global) scope:

```
Global scope
  │
  │  let person = { name: "Nilanchal", age: 22, country: "India" }
  │
  └── function logData() {
        person.name   ← reaches out to global scope ✅
        person.age    ← reaches out to global scope ✅
        person.country ← reaches out to global scope ✅
      }
```

---

# 4. Challenge 02 — If Else (Train Ticket Pricing)

## Problem

Given an `age` variable, log the correct ticket type for each age range:

| Age range | Ticket type |
|-----------|-------------|
| Under 6 | Free |
| 6 – 17 | Child discount |
| 18 – 26 | Student discount |
| 27 – 66 | Full price |
| 67+ | Senior citizen discount |

## Concept Focus

Multi-branch `if / else if / else` chains, using `<` operators to define exclusive ranges without overlapping conditions.

## Solution

```js
let age = 22

if (age < 6) {
  console.log("Free")
} else if (age < 18) {
  console.log("Child discount")
} else if (age < 27) {
  console.log("Student discount")
} else if (age < 67) {
  console.log("Full price")
} else {
  console.log("Senior citizen discount")
}
```

## Key Insight — Ranges Without Repeating the Lower Bound

Each `else if` only needs to specify the **upper** boundary because the lower boundary is already implied — JavaScript only reaches that branch if all previous conditions were `false`. For example:

```
if (age < 6)        → covers 0–5
else if (age < 18)  → only reached if age >= 6, so this covers 6–17
else if (age < 27)  → only reached if age >= 18, so this covers 18–26
else if (age < 67)  → only reached if age >= 27, so this covers 27–66
else                → only reached if age >= 67
```

You never need to write `age >= 6 && age < 18` — the cascade handles the lower bound for you.

---

# 5. Challenge 03 — Loops and Arrays (Countries)

## Problem

Given a `largeCountries` array containing the five most populous countries, use a `for` loop to log:

```
The five largest countries in the world:
- China
- India
- USA
- Indonesia
- Pakistan
```

No hardcoded `console.log` per country — every country name must come from iterating the array.

## Concept Focus

`for` loop with `i < array.length`, accessing items by index `array[i]`, string concatenation inside a loop.

## Solution

```js
let largeCountries = ["China", "India", "USA", "Indonesia", "Pakistan"]

console.log("The five largest countries in the world:")

for (let i = 0; i < largeCountries.length; i++) {
  console.log("- " + largeCountries[i])
}
```

## Key Insight — Why `array.length` in the Condition (not a hardcoded number)

```js
// Hardcoded — breaks if array grows or shrinks
for (let i = 0; i < 5; i++) { ... }

// Dynamic — always correct no matter how long the array is
for (let i = 0; i < largeCountries.length; i++) { ... }
```

Using `.length` means the loop automatically adjusts if you add or remove items from the array — no code change needed.

---

# 6. Challenge 04 — push, pop, shift, unshift

## Problem

The `largeCountries` array has been corrupted — `"Tuvalu"` has been placed first and `"Monaco"` has been placed last. Fix it by replacing `"Tuvalu"` with `"China"` at the start and `"Monaco"` with `"Pakistan"` at the end, using the four array mutation methods.

## Concept Focus

The four array mutation methods and when to use each:

| Method | Position | Action |
|--------|----------|--------|
| `.push(item)` | End | Add item to end |
| `.pop()` | End | Remove item from end |
| `.unshift(item)` | Start | Add item to start |
| `.shift()` | Start | Remove item from start |

## Solution

```js
let largeCountries = ["Tuvalu", "India", "USA", "Indonesia", "Monaco"]

// Fix the end — remove Monaco, add Pakistan
largeCountries.pop()
largeCountries.push("Pakistan")

// Fix the start — remove Tuvalu, add China
largeCountries.shift()
largeCountries.unshift("China")

console.log(largeCountries)
// ["China", "India", "USA", "Indonesia", "Pakistan"]
```

## Key Insight — push/pop vs unshift/shift

A simple memory trick: the longer word always **adds** to the array, the shorter word always **removes**:

```
push    (longer) → ADD to end       pop   (shorter) → REMOVE from end
unshift (longer) → ADD to start     shift (shorter) → REMOVE from start
```

## Why Order Matters

The order of operations matters when fixing both ends. Since we fix the **end** first (pop then push), the array indices of items 1–3 are unaffected. We could fix either end first — what we must NOT do is try to `unshift` before `shift` when the wrong item is still at index 0, because unshift would push it to index 1, not remove it.

---

# 7. Challenge 05 — Logical Operators (Friday the 13th)

## Problem

Given `dayOfMonth` (1–31) and `weekday` (e.g. `"Friday"`), log a spooky emoji `👻` only if it is **both** the 13th day of the month **and** a Friday. Otherwise log nothing.

## Concept Focus

The `&&` (AND) logical operator — both conditions must be `true` for the body to run.

## Solution

```js
let dayOfMonth = 13
let weekday    = "Friday"

if (dayOfMonth === 13 && weekday === "Friday") {
  console.log("👻")
}
```

## Key Insight — AND vs OR

```js
// AND — BOTH must be true
if (dayOfMonth === 13 && weekday === "Friday") {
  // runs only on Friday the 13th
}

// OR — AT LEAST ONE must be true
if (dayOfMonth === 13 || weekday === "Friday") {
  // runs on ANY Friday OR on the 13th of any month
}
```

The challenge specifically requires AND — the 13th alone (on a Tuesday) should not trigger the emoji, and a Friday alone (on the 7th) should not trigger it either. Only the intersection of both conditions counts.

## Truth Table for &&

| `dayOfMonth === 13` | `weekday === "Friday"` | Result |
|---------------------|------------------------|--------|
| `true` | `true` | `true` ✅ — log the emoji |
| `true` | `false` | `false` ❌ |
| `false` | `true` | `false` ❌ |
| `false` | `false` | `false` ❌ |

---

# 8. Challenge 06 — Rock Paper Scissors (Random Return)

## Problem

Create a function `getHand()` that randomly returns one of `"rock"`, `"paper"`, or `"scissors"` each time it is called. Use `Math.random()` and `Math.floor()` to generate a random index, then use that index to pull one item from the `hands` array.

## Concept Focus

Returning a random item from an array by generating a random index, `Math.floor(Math.random() * array.length)`.

## Solution

```js
let hands = ["rock", "paper", "scissors"]

function getHand() {
  let randomIndex = Math.floor(Math.random() * hands.length)
  return hands[randomIndex]
}

console.log(getHand())   // e.g. "scissors"
console.log(getHand())   // e.g. "rock"
```

## Key Insight — The Universal "Random Item From Array" Pattern

This is a pattern you will reuse in almost every project that involves randomness:

```js
// Step 1: generate a random decimal 0 to 0.999...
Math.random()

// Step 2: scale it to 0 to array.length - 0.000001
Math.random() * array.length

// Step 3: floor it to get 0, 1, 2 ... (array.length - 1)
Math.floor(Math.random() * array.length)

// Step 4: use it as the index
array[Math.floor(Math.random() * array.length)]
```

This pattern works for any array regardless of how many items it has — it always produces a valid index.

---

# 9. Challenge 07 — Emoji Fighter (DOM + Random + Event Listener)

## Problem

A page has a **Pick Fighters** button and an empty `#stage-el` div. When the button is clicked, pick two random emoji fighters from the `fighters` array and render them into the stage in the format `🦖 vs 🦀`.

## Concept Focus

`addEventListener("click", callback)`, generating two independent random indices, building a display string, `.textContent =`.

## Solution

### index.html (relevant parts)

```html
<div id="stage-el"></div>
<button id="btn-el">Pick fighters</button>
<script src="index.js"></script>
```

### index.js

```js
let fighters = ["🤖", "🦖", "🦀", "🦑", "🐉", "🦊", "🦁", "🐯", "🐻", "🦄", "🐸", "🐲"]

let stageEl = document.getElementById("stage-el")
let btnEl   = document.getElementById("btn-el")

btnEl.addEventListener("click", function() {
  let randomIndex1 = Math.floor(Math.random() * fighters.length)
  let randomIndex2 = Math.floor(Math.random() * fighters.length)

  stageEl.textContent = fighters[randomIndex1] + " vs " + fighters[randomIndex2]
})
```

## Key Insight — `addEventListener` vs `onclick`

This challenge introduces `addEventListener` — the professional alternative to `onclick` in HTML. Both listen for a click, but they work differently:

```html
<!-- onclick — wired in HTML, tight coupling -->
<button onclick="pickFighters()">Pick fighters</button>
```

```js
// addEventListener — wired in JS, clean separation of concerns
btnEl.addEventListener("click", function() {
  // callback function runs on every click
})
```

`addEventListener` is preferred in professional code because:
- It keeps HTML clean (no JS logic in HTML attributes)
- Multiple listeners can be added to the same element
- Easier to add/remove programmatically

The function passed into `addEventListener` is called an **anonymous function** (it has no name) or a **callback function** (a function passed as an argument to another function).

## Key Insight — Two Separate Random Indices

Two separate calls to `Math.floor(Math.random() * fighters.length)` produce two **independent** random picks — each call re-rolls the dice. Storing only one random index and using it twice would give you the same emoji fighting itself:

```js
// Wrong — one roll, same emoji twice
let randomIndex = Math.floor(Math.random() * fighters.length)
stageEl.textContent = fighters[randomIndex] + " vs " + fighters[randomIndex]  // 🦖 vs 🦖

// Correct — two independent rolls
let randomIndex1 = Math.floor(Math.random() * fighters.length)
let randomIndex2 = Math.floor(Math.random() * fighters.length)
stageEl.textContent = fighters[randomIndex1] + " vs " + fighters[randomIndex2]  // 🦖 vs 🦀
```

---

# 10. Challenge 08 — Sorting Fruits (for loop + if/else + DOM)

## Problem

Given a `fruits` array containing a mix of 🍎 apples and 🍊 oranges (e.g. `["🍎", "🍊", "🍎", "🍎", "🍊"]`), create a `sortFruit()` function that loops through the array, checks each fruit's type, and appends it to the correct shelf div — either `#apple-shelf` or `#orange-shelf`.

## Concept Focus

Combining a `for` loop, `if / else if` inside the loop body, `textContent +=` (append, not replace), DOM rendering from array data.

## Solution

### index.html (relevant parts)

```html
<div id="apple-shelf"></div>
<div id="orange-shelf"></div>
<script src="index.js"></script>
```

### index.js

```js
let fruits = ["🍎", "🍊", "🍎", "🍎", "🍊"]

let appleShelfEl  = document.getElementById("apple-shelf")
let orangeShelfEl = document.getElementById("orange-shelf")

function sortFruit() {
  for (let i = 0; i < fruits.length; i++) {
    if (fruits[i] === "🍎") {
      appleShelfEl.textContent += fruits[i]
    } else if (fruits[i] === "🍊") {
      orangeShelfEl.textContent += fruits[i]
    }
  }
}

sortFruit()
```

## Key Insight — `+=` Not `=` When Appending

```js
// Wrong — overwrites on every loop iteration, only last fruit survives
appleShelfEl.textContent = fruits[i]    // only shows the last apple

// Correct — appends each apple to what was already there
appleShelfEl.textContent += fruits[i]   // shows all apples together
```

## Key Insight — `else if` Not `else` for the Orange

```js
// Less safe — assumes anything that isn't an apple is an orange
} else {
  orangeShelfEl.textContent += fruits[i]   // would put a banana on the orange shelf!
}

// Safe — explicitly checks for orange
} else if (fruits[i] === "🍊") {
  orangeShelfEl.textContent += fruits[i]   // only oranges go here
}
```

Using `else if` with an explicit check means that if the array ever contained a third fruit type (e.g. 🍌), it would simply be ignored rather than incorrectly placed on the orange shelf.

---

# 11. Key Concepts Consolidated

| Challenge | Primary Concept | Key Insight |
|-----------|----------------|-------------|
| 01 Objects and Functions | Object creation, dot notation, function reading from global scope | Functions can access global variables without parameters |
| 02 If Else | Multi-branch `if/else if/else`, exclusive age ranges | Each `else if` only needs an upper bound — the lower is implied by the cascade |
| 03 Loops and Arrays | `for` loop with `array.length`, `array[i]` | Use `.length` not a hardcoded number — it adapts automatically |
| 04 push/pop/shift/unshift | Four array mutation methods | Longer word = add, shorter word = remove; end vs start |
| 05 Logical Operators | `&&` AND operator, truth table | AND requires BOTH conditions true; OR requires AT LEAST ONE |
| 06 Rock Paper Scissors | Random item from array using `Math.floor(Math.random() * array.length)` | Universal pattern for picking a random array item |
| 07 Emoji Fighter | `addEventListener`, anonymous callbacks, two independent random picks | `addEventListener` > `onclick`; each random call is independent |
| 08 Sorting Fruits | `for` + `if/else if` + `textContent +=` | `+=` to append; `else if` not `else` for explicit type checking |

### The Loop + Condition + DOM Pattern

Challenges 03, 07, and 08 all converge on the same powerful pattern:

```
Array of data
    +
for loop (iterate every item)
    +
if/else (decide what to do with each item)
    +
DOM update (render items to the right place)
```

This is the backbone of virtually every list-rendering feature in web development — rendering shopping cart items, filtering search results, sorting data into categories.

---

# 12. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to any challenge subfolder
   ```bash
   cd "09. Javascript Challenges Part-2/07. EmojiFighter"
   ```

3. For pure JS challenges (01–06): Open `index.js` with Node or open `index.html` (if present) with Live Server and check the browser console (`F12`).

4. For HTML/CSS challenges (07–08): Open `index.html` in your browser or use **Live Server** in VS Code to interact with the UI.

---

# 13. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Module 3 — JavaScript Fundamentals (Quickfire Challenges, Part 2)

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *These eight challenges are the repetition layer after the Blackjack Game. They drill objects, multi-branch conditionals, array manipulation, logical operators, random returns, addEventListener, and the loop + condition + DOM rendering pattern that powers every list-based feature in web development.*
