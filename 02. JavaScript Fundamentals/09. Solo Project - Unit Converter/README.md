# 13. Unit Converter — Solo Project
![JavaScript](https://img.shields.io/badge/JavaScript-Logic-yellow?style=flat-square&logo=javascript)
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Solo Project](https://img.shields.io/badge/Type-Solo%20Project-red?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A real-world utility app — enter any number and click **Convert** to instantly see six unit conversions across three categories: length, volume, and mass. Results are displayed simultaneously in a clean card layout, each rounded to three decimal places. Built from scratch using only a Figma design spec as a guide — **a solo project** of the Scrimba Fullstack Path from the Making Websites Interactive module.

This README is a **complete concept revision guide**. It covers what makes this a solo project, the three conversion functions, every concept applied, and key insights about `Number()`, `.toFixed()`, `innerHTML`, and the `addEventListener` button pattern.

---

# Table of Contents

1. [Project Structure](#1-project-structure)
2. [What Makes This a Solo Project?](#2-what-makes-this-a-solo-project)
3. [App Layout and Behaviour](#3-app-layout-and-behaviour)
4. [The Conversion Rates — The Provided Starting Point](#4-the-conversion-rates--the-provided-starting-point)
5. [The Core Pattern — Three Dedicated Conversion Functions](#5-the-core-pattern--three-dedicated-conversion-functions)
6. [Concept — meterToFeet()](#6-concept--metertofeet)
7. [Concept — litersToGallons()](#7-concept--literstogallons)
8. [Concept — kilogramsToPounds()](#8-concept--kilogramstopounds)
9. [Wiring the Convert Button](#9-wiring-the-convert-button)
10. [Complete Annotated Code](#10-complete-annotated-code)
11. [Concept — Number() for Input Values](#11-concept--number-for-input-values)
12. [Concept — .toFixed(3) for Decimal Precision](#12-concept--tofixed3-for-decimal-precision)
13. [Applying Everything Learned So Far](#13-applying-everything-learned-so-far)
14. [How to Run](#14-how-to-run)
15. [Course Reference](#15-course-reference)

---

# 1. Project Structure

```
13. Unit Converter/
│
├── index.html          → card layout, number input, convert button, three result boxes
├── index.css           → purple top section, white card, grey result boxes, centred layout
├── index.js            → DOM references, addEventListener, three conversion functions
│
├── prototype.PNG       → Figma design spec used as the visual build target
└── Conversion Rate.PNG → reference comment showing the three base conversion rates
```

---

# 2. What Makes This a Solo Project?

This project came with **no step-by-step guidance** — only a Figma design file and three requirements. Every decision about HTML structure, CSS layout, function design, and DOM wiring was made independently. Scrimba provided the conversion rates as a comment block in the starter file to save lookup time, but all code was written from scratch.

### Core Requirements

| Requirement | Applied |
|-------------|---------|
| Follow the design spec | ✅ Purple top section, white card, grey boxes — matches Figma exactly |
| Generate all conversions when the user clicks "Convert" | ✅ `addEventListener("click", ...)` calls all three functions |
| Round the numbers down to three decimal places | ✅ `.toFixed(3)` applied in every function |

---

# 3. App Layout and Behaviour

```
┌──────────────────────────────────────────┐
│      Metric/Imperial Unit Conversion     │  ← purple header
│                                          │
│              ┌─────────┐                 │
│              │   20    │  ← input field  │
│              └─────────┘                 │
│                                          │
│              [ Convert ]                 │  ← button
└──────────────────────────────────────────┘
│                                          │
│  ┌──────────────────────────────────┐    │
│  │  Length (Meter/Feet)             │    │
│  │  20 meters = 65.620 feet |       │    │
│  │  20 feet = 6.100 meters          │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │  Volume (Liters/Gallons)         │    │
│  │  20 liters = 5.280 gallons |     │    │
│  │  20 gallons = 75.700 liters      │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ┌──────────────────────────────────┐    │
│  │  Mass (Kilograms/Pounds)         │    │
│  │  20 kilos = 44.100 pounds |      │    │
│  │  20 pounds = 9.080 kilos         │    │
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

One click updates all three result boxes at once. Each box shows **both directions** of the conversion — the input treated as the metric unit and then as the imperial unit — so the user gets six results from a single number.

---

# 4. The Conversion Rates — The Provided Starting Point

Scrimba provided these three base rates as a comment block at the top of the starter `index.js` file, saving the student from having to look them up:

```js
/*
  1 meter    = 3.281 feet
  1 liter    = 0.264 gallon
  1 kilogram = 2.204 pound
*/
```

The reciprocal for each direction is derived from these same rates (e.g. `1 / 3.281 ≈ 0.305` for feet → metres). All three conversion functions are built directly from these constants.

### Why Three Separate Functions and Not One?

Each category is an independent calculation with its own rates and its own output DOM element. Separating them into `meterToFeet()`, `litersToGallons()`, and `kilogramsToPounds()` keeps each function short, readable, and easy to debug in isolation — changing the volume logic can never break the length logic.

---

# 5. The Core Pattern — Three Dedicated Conversion Functions

Every conversion function in this project follows the exact same three-step pattern:

```
1. Calculate both directions using the input number and the conversion rate
2. Round both results to 3 decimal places with .toFixed(3)
3. Write a template-literal string into the matching DOM element via .innerHTML
```

```js
function meterToFeet(num1) {
  let feet  = (num1 * 3.281).toFixed(3)    // step 1 + 2
  let meter = (num1 * 0.305).toFixed(3)    // step 1 + 2

  length.innerHTML =                        // step 3
    `${num1} meters = ${feet} feet | ${num1} feet = ${meter} meters`
}
```

This pattern repeats identically for volume and mass — only the variable names, rates, and target DOM element change.

---

# 6. Concept — meterToFeet()

## What it does

Takes the user's number, converts it as metres → feet and as feet → metres, then writes both results into the `#Length` paragraph.

## Conversion rates used

```
1 metre = 3.281 feet    →  feet  = num * 3.281
1 foot  = 0.305 metres  →  meter = num * 0.305
```

## Code

```js
function meterToFeet(num1) {
  let feet  = (num1 * 3.281).toFixed(3)
  let meter = (num1 * 0.305).toFixed(3)

  length.innerHTML =
    `${num1} meters = ${feet} feet | ${num1} feet = ${meter} meters`
}
```

## Step-by-Step Trace (input = 20)

```
num1  = 20
feet  = (20 * 3.281).toFixed(3)  →  "65.620"
meter = (20 * 0.305).toFixed(3)  →  "6.100"

length.innerHTML  →  "20 meters = 65.620 feet | 20 feet = 6.100 meters"
```

---

# 7. Concept — litersToGallons()

## What it does

Takes the user's number, converts it as litres → gallons and as gallons → litres, then writes both results into the `#Volume` paragraph.

## Conversion rates used

```
1 litre   = 0.264 gallons  →  gallons = num * 0.264
1 gallon  = 3.785 litres   →  liters  = num * 3.785
```

## Code

```js
function litersToGallons(num2) {
  let gallons = (num2 * 0.264).toFixed(3)
  let liters  = (num2 * 3.785).toFixed(3)

  volume.innerHTML =
    `${num2} liters = ${gallons} gallons | ${num2} gallons = ${liters} liters`
}
```

## Step-by-Step Trace (input = 20)

```
num2    = 20
gallons = (20 * 0.264).toFixed(3)  →  "5.280"
liters  = (20 * 3.785).toFixed(3)  →  "75.700"

volume.innerHTML  →  "20 liters = 5.280 gallons | 20 gallons = 75.700 liters"
```

---

# 8. Concept — kilogramsToPounds()

## What it does

Takes the user's number, converts it as kilograms → pounds and as pounds → kilograms, then writes both results into the `#Mass` paragraph.

## Conversion rates used

```
1 kilogram = 2.205 pounds    →  pounds = num * 2.205
1 pound    = 0.454 kilograms →  kilos  = num * 0.454
```

## Code

```js
function kilogramsToPounds(num3) {
  let pounds = (num3 * 2.205).toFixed(3)
  let kilos  = (num3 * 0.454).toFixed(3)

  mass.innerHTML =
    `${num3} kilos = ${pounds} pounds | ${num3} pounds = ${kilos} kilos`
}
```

## Step-by-Step Trace (input = 20)

```
num3   = 20
pounds = (20 * 2.205).toFixed(3)  →  "44.100"
kilos  = (20 * 0.454).toFixed(3)  →  "9.080"

mass.innerHTML  →  "20 kilos = 44.100 pounds | 20 pounds = 9.080 kilos"
```

---

# 9. Wiring the Convert Button

The Convert button is grabbed by its ID and a `click` listener calls all three conversion functions, passing the parsed value from the input field each time:

```js
convertBtn.addEventListener("click", function() {
  const number = Number(num.value)   // string → number
  meterToFeet(number)
  litersToGallons(number)
  kilogramsToPounds(number)
})
```

`Number(num.value)` is the critical step — `input.value` always returns a string, but all three conversion functions need a real number for multiplication. Passing the raw string would produce `NaN` across all six results.

### Why `addEventListener` and Not `onclick`?

Both approaches trigger the same behaviour on click:

```html
<!-- HTML onclick — inline, quick for small solo projects -->
<button onclick="convert()">Convert</button>
```

```js
// JS addEventListener — separates behaviour from markup, preferred in production
convertBtn.addEventListener("click", function() { ... })
```

This project uses `addEventListener` in JS, keeping all behaviour logic out of the HTML. It is a better long-term habit — HTML should describe structure, JS should describe behaviour.

---

# 10. Complete Annotated Code

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Metric / Imperial Unit Conversion</title>
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div class="card">

    <!-- Top purple section: title, input, button -->
    <div class="top">
      <h1>Metric/Imperial Unit Conversion</h1>
      <input type="text" id="number-box">
      <button id="convert-btn">Convert</button>
    </div>

    <!-- Bottom section: three result cards -->
    <div class="bottom">

      <div class="box">
        <h2>Length (Meter/Feet)</h2>
        <p id="Length">1 meters = 3.281 feet | 1 feet = 0.305 meters</p>
      </div>

      <div class="box">
        <h2>Volume (Liters/Gallons)</h2>
        <p id="Volume">1 liters = 0.264 gallons | 1 gallons = 3.785 liters</p>
      </div>

      <div class="box">
        <h2>Mass (Kilograms/Pounds)</h2>
        <p id="Mass">1 kilos = 2.205 pounds | 1 pounds = 0.454 kilos</p>
      </div>

    </div>
  </div>
  <script src="index.js"></script>
</body>
</html>
```

### index.js (complete)

```js
// DOM references — grabbed once at page load
let num          = document.getElementById("number-box")
let mass         = document.getElementById("Mass")
let length       = document.getElementById("Length")
let volume       = document.getElementById("Volume")
const convertBtn = document.getElementById("convert-btn")

// Button click — parse input, run all three conversions
convertBtn.addEventListener("click", function() {
  const number = Number(num.value)    // input.value is always a string → convert first
  meterToFeet(number)
  litersToGallons(number)
  kilogramsToPounds(number)
})

// Length: metres ↔ feet
function meterToFeet(num1) {
  let feet  = (num1 * 3.281).toFixed(3)   // metres → feet
  let meter = (num1 * 0.305).toFixed(3)   // feet   → metres

  length.innerHTML =
    `${num1} meters = ${feet} feet | ${num1} feet = ${meter} meters`
}

// Volume: litres ↔ gallons
function litersToGallons(num2) {
  let gallons = (num2 * 0.264).toFixed(3)  // litres  → gallons
  let liters  = (num2 * 3.785).toFixed(3)  // gallons → litres

  volume.innerHTML =
    `${num2} liters = ${gallons} gallons | ${num2} gallons = ${liters} liters`
}

// Mass: kilograms ↔ pounds
function kilogramsToPounds(num3) {
  let pounds = (num3 * 2.205).toFixed(3)   // kilograms → pounds
  let kilos  = (num3 * 0.454).toFixed(3)   // pounds    → kilograms

  mass.innerHTML =
    `${num3} kilos = ${pounds} pounds | ${num3} pounds = ${kilos} kilos`
}
```

---

# 11. Concept — Number() for Input Values

`input.value` in JavaScript **always returns a string** — even when the user types a number. Passing that string directly into multiplication triggers JavaScript's implicit coercion, which works in simple cases but silently produces `NaN` the moment the input is invalid:

```js
// What the input field gives you
num.value          // "20"      ← always a string
typeof num.value   // "string"

// Without Number() — implicit coercion, fragile
"20" * 3.281       // 65.62    ← JS silently converts the string
"20abc" * 3.281    // NaN      ← silent bug, no error thrown

// With Number() — explicit and intentional
Number("20")       // 20       ← real number, safe to multiply
Number("20abc")    // NaN      ← still NaN, but the intent is clear
Number("")         // 0        ← empty string becomes zero
```

Using `Number()` explicitly is the correct habit whenever reading a numeric value from an input field, `localStorage`, or an API response — all of which deliver strings.

---

# 12. Concept — .toFixed(3) for Decimal Precision

Raw multiplication produces floating-point results that are inconsistent and unsuitable for display:

```js
20 * 3.281   // 65.62000000000001   ← floating point imprecision
20 * 0.264   // 5.28                ← fine, but only 2 decimal places
20 * 3.785   // 75.7                ← only 1 decimal place
```

`.toFixed(3)` solves both problems — it rounds to exactly 3 decimal places and returns a consistently formatted string:

```js
(20 * 3.281).toFixed(3)   // "65.620"   ← rounded, padded to 3 places
(20 * 0.264).toFixed(3)   // "5.280"    ← padded with trailing zero
(20 * 3.785).toFixed(3)   // "75.700"   ← padded with two trailing zeros
```

## Key Insight — .toFixed() Must Be Called on a Number

`.toFixed()` is a **number method** — it must be called on a numeric value. It returns a **string**, which is exactly what we need here since the result is immediately embedded into a template literal:

```js
// ✅ Correct — multiplication runs first, .toFixed() called on the result number
(num1 * 3.281).toFixed(3)

// ❌ Wrong — called on a string, throws TypeError: toFixed is not a function
"65.62".toFixed(3)
```

The parentheses around `(num1 * 3.281)` are essential — they ensure the multiplication completes and produces a number before `.toFixed(3)` is called on it.

---

# 13. Applying Everything Learned So Far

This solo project consolidates **every concept from the Making Websites Interactive module**:

| Concept | Where Applied |
|---------|--------------|
| `getElementById` | Grabbing `#number-box`, `#convert-btn`, `#Length`, `#Volume`, `#Mass` |
| `addEventListener("click", ...)` | Triggering all three conversions on button press |
| `Number()` | Converting `input.value` string to a real number before arithmetic |
| Arithmetic operators `*` | Multiplying the input by each conversion rate |
| `.toFixed(3)` | Rounding and formatting each result to 3 decimal places |
| Template literals | Building the full output sentence for each result box |
| `.innerHTML` | Writing the formatted result string into each result `<p>` |
| Function parameters | Passing the parsed number into each conversion function |
| Separation of concerns | One function per conversion category — independent and testable |
| Figma design reading | Translating the design spec into the purple/white/grey card layout |

### One Function per Responsibility

This project introduces the **single-responsibility principle** in practice — each function does exactly one job and touches exactly one DOM element:

```js
function meterToFeet(num1)       { /* only reads num1, only updates #Length */ }
function litersToGallons(num2)   { /* only reads num2, only updates #Volume */ }
function kilogramsToPounds(num3) { /* only reads num3, only updates #Mass   */ }
```

The `click` listener acts as the **coordinator** — it owns input parsing and decides which functions to call, but delegates all calculation and rendering to the dedicated functions. This is cleaner than writing all the logic inside the event listener directly.

```js
// ✅ Coordinator pattern — parse once, delegate everything else
convertBtn.addEventListener("click", function() {
  const number = Number(num.value)
  meterToFeet(number)
  litersToGallons(number)
  kilogramsToPounds(number)
})
```

---

# 14. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder
   ```bash
   cd "Web-Development-MiniProjects/13. Unit Converter"
   ```

3. Open `index.html` in your browser or use **Live Server** in VS Code.

4. Type any number into the input field and click **Convert** — all three result boxes update instantly with six conversions.

---

# 15. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Making Websites Interactive — Solo Project (Unit Converter)
* **Design Spec:** Figma prototype provided via course (`prototype.PNG` included in repo)

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *The Unit Converter solo project brings together DOM selection, event listeners, Number() conversion, arithmetic, .toFixed() formatting, and template literals — all applied to a genuinely useful real-world tool. The single-responsibility pattern across three conversion functions is the key structural lesson: one function, one job, one DOM target.*
