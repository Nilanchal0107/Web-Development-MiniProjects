# Meme App (Pumpkin's Purrfect Meme Picker) — Essential JavaScript

![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-Essential-yellow?style=flat-square&logo=javascript)
![ES Modules](https://img.shields.io/badge/ES%20Modules-import%2Fexport-purple?style=flat-square)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Karla-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A cat-meme picker app — the **second Essential JavaScript project** from **Scrimba's Fullstack Web Development Path**.

This README is a **complete concept revision guide**. It explains every new JavaScript and CSS concept introduced in this project that was **not present in the previous Cookie Consent project**, while also noting which skills carry over and deepen.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Cookie Consent](#3-whats-new-vs-cookie-consent)
4. [ES Modules — `import` and `export`](#4-es-modules--import-and-export)
   - [Why Modules?](#41-why-modules)
   - [export](#42-export)
   - [import](#43-import)
   - [`type="module"` on the script tag](#44-typemodule-on-the-script-tag)
5. [Arrays of Objects — The Data Model](#5-arrays-of-objects--the-data-model)
   - [Object structure](#51-object-structure)
   - [Array of objects pattern](#52-array-of-objects-pattern)
6. [Loops — `for...of`](#6-loops--forof)
   - [for...of vs for loop vs forEach](#61-forof-vs-for-loop-vs-foreach)
7. [Array Methods](#7-array-methods)
   - [.filter()](#71-filter)
   - [.includes()](#72-includes)
   - [.push()](#73-push)
8. [The `change` Event on Radio Inputs](#8-the-change-event-on-radio-inputs)
9. [querySelector — CSS Selector Power](#9-queryselector--css-selector-power)
   - [querySelector vs getElementById](#91-queryselector-vs-getelementbyid)
   - [Attribute selector: `input[type="radio"]:checked`](#92-attribute-selector-inputtyperadiochecked)
10. [getElementsByClassName and Looping Over HTML Collections](#10-getelementsbyclassname-and-looping-over-html-collections)
11. [parentElement — DOM Traversal](#11-parentelement--dom-traversal)
12. [Math.random() and Math.floor()](#12-mathrandom-and-mathfloor)
    - [Picking a random element from an array](#121-picking-a-random-element-from-an-array)
13. [Dynamically Rendering HTML with innerHTML](#13-dynamically-rendering-html-with-innerhtml)
    - [Building a string in a loop](#131-building-a-string-in-a-loop)
    - [Setting innerHTML once vs many times](#132-setting-innerhtml-once-vs-many-times)
14. [Checkbox Input — `.checked`](#14-checkbox-input--checked)
15. [Named Functions vs Anonymous Functions](#15-named-functions-vs-anonymous-functions)
16. [CSS Concepts — What's New](#16-css-concepts--whats-new)
    - [accent-color](#161-accent-color)
    - [:first-child and :last-child pseudo-classes](#162-first-child-and-last-child-pseudo-classes)
    - [position: absolute inside position: fixed](#163-position-absolute-inside-position-fixed)
    - [width: unset](#164-width-unset)
17. [How the Full App Flow Works](#17-how-the-full-app-flow-works)
18. [How to Run](#18-how-to-run)
19. [Course Reference](#19-course-reference)

---

# 1. Project Overview

"Pumpkin's Purrfect Meme Picker" is a mood-based cat image selector. The app:

* Reads a **dataset of cat objects** from a separate `data.js` file — each cat has emotion tags, a filename, an alt text, and a boolean indicating whether it is a GIF
* **Dynamically generates radio buttons** from the unique emotion tags found in the dataset — no emotion is hardcoded in the HTML
* Lets the user pick an emotion and optionally filter to **animated GIFs only**
* On clicking **Get Image**, filters the dataset and **randomly picks** one matching cat
* Displays the chosen image in a **modal** that slides in with `display: flex`
* Highlights the **selected radio row** using a `change` event listener

The real goals are: working with **data structures**, using **array methods** (`filter`, `includes`, `push`), **ES Modules**, **dynamic rendering**, and **DOM traversal**.

---

# 2. Project Structure

```
05. Essential JavaScript/
│
└── 02. Meme App/
    ├── index.html      → Page structure: header, radio container, checkbox, button, modal
    ├── index.css       → Styling: header, controls, radio highlight, modal
    ├── index.js        → All JavaScript logic: import, DOM selection, events, functions
    ├── data.js         → Exported dataset: array of 28 cat objects
    └── images/
        ├── pumpkin.png     → Header logo (the cat mascot)
        ├── angry.jpeg      → Static cat images (14 JPEGs)
        ├── angry.gif       → Animated GIF versions (14 GIFs)
        └── ...             → One file per cat entry in data.js
```

---

# 3. What's New vs Cookie Consent

This table lists **every concept used in the Meme App that was not present in the Cookie Consent project**. Concepts that carry over from Cookie Consent are marked ↩.

## New JavaScript Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `export const` | `data.js` | Makes the dataset available to other JS files |
| `import { ... } from` | Top of `index.js` | Pulls exported values into the current module |
| `type="module"` on `<script>` | `index.html` | Enables ES Module syntax in the browser |
| Arrays of objects | `catsData` in `data.js` | Structured data with multiple properties per item |
| `for...of` loop | `getEmotionsArray`, `renderEmotionsRadios` | Iterates over arrays cleanly |
| Nested `for...of` | `getEmotionsArray` | Loops over tags inside each cat object |
| `Array.filter()` | `getMatchingCatsArray` | Returns a new array of only matching cats |
| `Array.includes()` | Inside `.filter()` | Checks if an emotion tag is in an array |
| `Array.push()` | `getEmotionsArray` | Adds unique emotions to a result array |
| `Math.random()` | `getSingleCatObject` | Generates a random decimal between 0 and 1 |
| `Math.floor()` | `getSingleCatObject` | Rounds down to get a valid integer index |
| `document.querySelector()` | `getMatchingCatsArray` | Selects elements using CSS selector syntax |
| Attribute selector (`:checked`) | `getMatchingCatsArray` | Finds the currently selected radio input |
| `document.getElementsByClassName()` | `highlightCheckedOption` | Gets all elements with a given class |
| `element.parentElement` | `highlightCheckedOption` | Traverses up to the parent DOM node |
| `e.target.id` | `highlightCheckedOption` | Reads the `id` of the element that triggered the event |
| `gifsOnlyOption.checked` | `getMatchingCatsArray` | Reads the boolean state of a checkbox |
| Named functions (declared) | All functions | Reusable, hoisted, callable before definition |
| String accumulation in loop | `renderEmotionsRadios` | Builds an HTML string by concatenating in a loop |
| `'change'` event | `emotionRadios` | Fires when a radio button selection changes |
| `element.classList.remove()` | `highlightCheckedOption` | Removes a class from all radios before re-adding |

## New CSS Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `accent-color` | `.highlight` | Recolours the radio button dot to match the theme |
| `:first-child` pseudo-class | `.radio:first-child` | Rounds the top corners of the first radio row |
| `:last-child` pseudo-class | `.radio:last-child` | Removes the bottom border and rounds the last row |
| `position: absolute` (inside `fixed`) | `.meme-modal-close-btn` | Positions the close button relative to the fixed modal |
| `top: 2%; right: 2%` | `.meme-modal-close-btn` | Percentage-based placement inside the modal |
| `border-radius: 50%` | `.meme-modal-close-btn` | Makes the close button a perfect circle |
| `width: unset` | `.gifs-check-label` | Cancels an inherited `width: 100%` from the `label` rule |

## Concepts Carried Over from Cookie Consent ↩

| Concept | Used Again In |
|---------|--------------|
| `document.getElementById()` | All DOM element selections |
| `element.addEventListener()` | All event bindings |
| `element.classList.add()` | Adding `.highlight` class |
| `element.classList.remove()` | Removing `.highlight` from all radios |
| `element.innerHTML` | Rendering radio buttons, rendering cat image |
| `element.style.display` | Showing/hiding the modal |
| Template literals | Building the radio HTML string and the cat image tag |
| `position: fixed` | `.meme-modal` |
| `box-sizing: border-box` | `*` reset |

---

# 4. ES Modules — `import` and `export`

## 4.1 Why Modules?

In the Cookie Consent project, everything lived in a single `index.js` file. As projects grow, putting all code in one file becomes unmanageable. ES Modules let you **split code across files** and control exactly what each file exposes to others.

The browser itself supports ES Modules natively — no build tool required, as long as you use `type="module"` on your `<script>` tag.

## 4.2 `export`

```javascript
// data.js
export const catsData = [
    { emotionTags: ["moody"], isGif: false, image: "angry.jpeg", alt: "A cat looking moody" },
    // ...
]
```

`export` marks a variable, function, or class as **publicly available** — other files can import it. Without `export`, the variable is private to `data.js`.

| Export type | Syntax | Notes |
|-------------|--------|-------|
| Named export | `export const name = ...` | File can have many named exports |
| Default export | `export default ...` | One per file; imported without braces |

This project uses a **named export** (`export const catsData`). Named exports are preferred when a file provides multiple values; default exports are common for single-purpose modules (e.g., a React component).

## 4.3 `import`

```javascript
// index.js
import { catsData } from '/data.js'
```

`import` pulls the named export `catsData` from `data.js` into `index.js`. The braces `{ }` are required for named exports.

| Import syntax | For |
|---------------|-----|
| `import { name } from './file.js'` | Named export |
| `import { name as alias } from './file.js'` | Named export with a local alias |
| `import defaultExport from './file.js'` | Default export |
| `import * as module from './file.js'` | All exports as one object |

> **Path rules:** The path must be a valid URL. `/data.js` (absolute from root) or `./data.js` (relative) both work. You cannot write `'data.js'` without a slash — bare specifiers are not valid in browser ES Modules (they are only valid in Node.js with a bundler).

## 4.4 `type="module"` on the script tag

```html
<script src="index.js" type="module"></script>
```

Adding `type="module"` to the `<script>` tag does three things:

| Effect | Detail |
|--------|--------|
| Enables `import`/`export` syntax | Without it, the browser throws a `SyntaxError` on `import` |
| Defers execution automatically | Equivalent to adding `defer` — the script runs after the DOM is parsed |
| Enforces strict mode | `'use strict'` is implied — sloppy mode behaviours are disabled |
| Scopes the module | Variables declared at the top level are **not** added to `window` |

> Because `type="module"` implies `defer`, the `<script>` tag can be in `<head>` or at the end of `<body>` — either way the DOM is ready when the script runs. In this project it is placed at the end of `<body>`.

---

# 5. Arrays of Objects — The Data Model

## 5.1 Object structure

Each item in `catsData` is a JavaScript **object** — a collection of named properties:

```javascript
{
    emotionTags: ["moody", "insomniac"],   // array of strings
    isGif: false,                           // boolean
    image: "angry2.jpeg",                   // string — filename
    alt: "A cat looking moody",             // string — accessibility text
}
```

| Property | Type | Purpose |
|----------|------|---------|
| `emotionTags` | `string[]` | One or more moods this cat represents |
| `isGif` | `boolean` | `true` if the image is animated, `false` if static |
| `image` | `string` | Filename in the `images/` folder |
| `alt` | `string` | Screen reader description of the image |

## 5.2 Array of objects pattern

`catsData` is an **array of objects** — the most common data structure in web development. Almost every real-world dataset (users, products, posts) follows this pattern: an array where each item is an object with the same set of keys.

```javascript
const catsData = [
    { emotionTags: [...], isGif: false, image: "...", alt: "..." },
    { emotionTags: [...], isGif: true,  image: "...", alt: "..." },
    // 26 more...
]
```

You access individual properties using **dot notation**: `cat.emotionTags`, `cat.isGif`, `cat.image`.

---

# 6. Loops — `for...of`

## 6.1 `for...of` vs `for` loop vs `forEach`

The `for...of` loop iterates over any **iterable** (arrays, strings, Sets, Maps) and gives you each item directly:

```javascript
for (let cat of catsData) {
    // cat is each object in catsData, one by one
    for (let emotion of cat.emotionTags) {
        // emotion is each string in that cat's emotionTags array
    }
}
```

| Loop | Syntax | Use when... |
|------|--------|------------|
| `for` | `for (let i = 0; i < arr.length; i++)` | You need the index, or complex control flow |
| `for...of` | `for (let item of arr)` | You need each item; don't need the index |
| `forEach` | `arr.forEach(item => ...)` | You want a callback style; no `break`/`continue` |
| `for...in` | `for (let key in obj)` | Iterating over object **keys** (not arrays) |

`for...of` is preferred here because:
- It is readable — `for (let cat of cats)` reads like plain English
- It supports `break` and `continue` (unlike `forEach`)
- No index arithmetic needed

> **Nested `for...of`:** The `getEmotionsArray` function uses two `for...of` loops — an outer one over all cats, and an inner one over each cat's `emotionTags` array. This "flatten" pattern is very common when working with arrays of arrays.

---

# 7. Array Methods

## 7.1 `.filter()`

```javascript
const matchingCatsArray = catsData.filter(function(cat) {
    if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif
    } else {
        return cat.emotionTags.includes(selectedEmotion)
    }
})
```

`.filter()` creates a **new array** containing only the items for which the callback returns `true`. The original array (`catsData`) is not modified.

| Feature | Detail |
|---------|--------|
| Returns | A new array (can be empty if nothing matches) |
| Callback receives | Each item in the array, one at a time |
| Keeps item when | Callback returns a truthy value |
| Discards item when | Callback returns a falsy value |

```javascript
// Conceptual equivalent using for...of
const result = []
for (let cat of catsData) {
    if (/* condition */) {
        result.push(cat)
    }
}
```

`.filter()` is the idiomatic, concise way to express this pattern.

## 7.2 `.includes()`

```javascript
cat.emotionTags.includes(selectedEmotion)
// → true if selectedEmotion is anywhere in the emotionTags array
// → false otherwise
```

`.includes(value)` checks whether an array contains a specific value, returning `true` or `false`. It uses **strict equality** (`===`) for comparison.

```javascript
["moody", "insomniac"].includes("moody")      // → true
["moody", "insomniac"].includes("happy")      // → false
["moody", "insomniac"].includes("MOODY")      // → false (case-sensitive)
```

> `.includes()` also works on strings: `"hello world".includes("world")` → `true`. This is a separate but related method.

## 7.3 `.push()`

```javascript
function getEmotionsArray(cats) {
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)   // add to end of array
            }
        }
    }
    return emotionsArray
}
```

`.push(value)` adds one or more items to the **end** of an array and returns the new length. It **mutates** the original array.

| Method | Effect | Returns |
|--------|--------|---------|
| `.push(val)` | Adds to end | New length |
| `.pop()` | Removes from end | Removed item |
| `.unshift(val)` | Adds to beginning | New length |
| `.shift()` | Removes from beginning | Removed item |

The `if (!emotionsArray.includes(emotion))` guard ensures **no duplicates** — because multiple cats can share the same emotion tag (e.g., `"moody"` appears in 6 cats), the array would otherwise contain repeated emotions.

---

# 8. The `change` Event on Radio Inputs

```javascript
emotionRadios.addEventListener('change', highlightCheckedOption)
```

The `'change'` event fires on `<input>` elements when their value changes and the change is **committed**:

| Input type | When `change` fires |
|------------|---------------------|
| `radio` | When a new radio is selected |
| `checkbox` | When checked/unchecked |
| `text` / `email` | When the field loses focus after editing |
| `select` | When a new option is chosen |

> **Why attach to the container (`emotionRadios`) and not each radio?** This is **event delegation** — attaching one listener to a parent that contains many children. When a radio inside `emotionRadios` fires a `change` event, the event **bubbles up** to the container. One listener handles all radios, regardless of how many there are. This is especially important here because the radios are generated dynamically — they don't exist at the time the listener is attached.

---

# 9. `querySelector` — CSS Selector Power

## 9.1 `querySelector` vs `getElementById`

```javascript
// Cookie Consent approach
const modal = document.getElementById('modal')

// Meme App approach
document.querySelector('input[type="radio"]:checked')
```

| Method | Selector | Returns | Speed |
|--------|----------|---------|-------|
| `getElementById(id)` | ID string only | Single element or `null` | Fastest |
| `querySelector(css)` | Any CSS selector | First match or `null` | Slightly slower |
| `querySelectorAll(css)` | Any CSS selector | NodeList of all matches | Slightly slower |
| `getElementsByClassName(cls)` | Class name only | Live HTMLCollection | Fast |

`getElementById` was used in Cookie Consent for simple ID lookups. `querySelector` is used here because the target — the currently checked radio — **has no ID**. You can only locate it via its `type` attribute and `:checked` pseudo-class, which requires CSS selector syntax.

## 9.2 Attribute selector: `input[type="radio"]:checked`

```javascript
const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
```

This CSS selector is composed of three parts:

| Part | Meaning |
|------|---------|
| `input` | Target `<input>` elements |
| `[type="radio"]` | …whose `type` attribute equals `"radio"` |
| `:checked` | …and which are currently checked |

`[attribute="value"]` is an **attribute selector** — it filters elements by the value of an HTML attribute. Combined with the `:checked` pseudo-class (which matches selected radio buttons and checked checkboxes), this finds the exact radio the user has selected at any given moment.

> The `.value` property reads the `value` attribute of the matched input — in this case the emotion string (e.g., `"moody"`, `"happy"`).

---

# 10. `getElementsByClassName` and Looping Over HTML Collections

```javascript
function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}
```

`document.getElementsByClassName('radio')` returns an **HTMLCollection** — a live, array-like list of all elements with the class `'radio'`.

| Feature | HTMLCollection | NodeList (querySelectorAll) |
|---------|---------------|----------------------------|
| Live? | ✅ Yes — updates if DOM changes | ❌ No — static snapshot |
| Index access | ✅ `collection[0]` | ✅ `list[0]` |
| `for...of` | ✅ Yes | ✅ Yes |
| `.forEach()` | ❌ No (not a real array) | ✅ Yes |
| `.filter()`, `.map()` | ❌ No | ❌ No |

> To use array methods on an HTMLCollection, convert it first: `Array.from(radios).filter(...)`.

The `for...of` loop here iterates over the collection and **removes `.highlight` from every radio row** before adding it to the newly selected one. This is the classic "clear all, then set one" pattern for exclusive selections.

---

# 11. `parentElement` — DOM Traversal

```javascript
document.getElementById(e.target.id).parentElement.classList.add('highlight')
```

`parentElement` navigates **one level up** in the DOM tree to the containing parent element.

Why is this needed? The HTML structure for each radio option is:

```html
<div class="radio">          ← .highlight goes here (the row)
    <label for="moody">moody</label>
    <input type="radio" id="moody" value="moody" name="emotions">
                                ↑ e.target — the user clicked/changed this
</div>
```

`e.target` is the `<input>` radio button. But the highlight styling (background colour, bold text) needs to apply to the entire **row** — the parent `<div class="radio">`. So `.parentElement` is used to step up from the `<input>` to its containing `<div>`.

| Property | Navigates to |
|----------|-------------|
| `parentElement` | Direct parent element |
| `children` | All direct child elements |
| `firstElementChild` | First child element |
| `lastElementChild` | Last child element |
| `nextElementSibling` | Next sibling element |
| `previousElementSibling` | Previous sibling element |

---

# 12. `Math.random()` and `Math.floor()`

## 12.1 Picking a random element from an array

```javascript
function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1) {
        return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}
```

`Math.random()` returns a random **floating-point number** between `0` (inclusive) and `1` (exclusive):

```
Math.random()  → 0.0 to 0.9999...
```

To turn this into a valid **array index**:

```javascript
Math.random() * catsArray.length   // → 0.0 to (length - tiny fraction)
Math.floor(...)                    // → 0 to length - 1  (integer)
```

`Math.floor(n)` rounds **down** to the nearest integer. This is important — `Math.round()` would sometimes produce `length`, which is one past the last valid index.

```javascript
// Example with array of 5 items
Math.random()             // → 0.734
0.734 * 5                 // → 3.67
Math.floor(3.67)          // → 3        ← valid index (0–4)

Math.round(3.67)          // → 4        ← also valid here
Math.round(4.89)          // → 5        ← INVALID — out of bounds
```

> **Why check for `catsArray.length === 1`?** If there is only one match, there is no randomness needed — just return it directly. `Math.floor(Math.random() * 1)` always returns `0`, so it would still work, but the early return is a small optimisation and makes the intent clear.

---

# 13. Dynamically Rendering HTML with `innerHTML`

## 13.1 Building a string in a loop

```javascript
function renderEmotionsRadios(cats) {
    let radioItems = ``
    const emotions = getEmotionsArray(cats)

    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }

    emotionRadios.innerHTML = radioItems
}
```

This function builds a complete HTML string by **concatenating** template literals in a loop, then injects the entire string into the DOM in one operation with `innerHTML`.

The `+=` operator appends each new radio block to the `radioItems` string:
```javascript
let radioItems = ``         // starts as empty string
radioItems += `<div>...</div>`   // adds first radio
radioItems += `<div>...</div>`   // adds second radio
// ... after the loop, radioItems contains all radios as one long string
```

## 13.2 Setting `innerHTML` once vs many times

Notice that `emotionRadios.innerHTML = radioItems` is **outside the loop** — the string is built up first, then injected once.

An alternative would be to set `innerHTML` inside the loop:
```javascript
// ❌ Avoid — causes a DOM update on every iteration
for (let emotion of emotions) {
    emotionRadios.innerHTML += `<div>...</div>`
}
```

Setting `innerHTML` **inside a loop** is inefficient. Every assignment triggers the browser to:
1. Parse the new HTML string
2. Destroy all existing child nodes
3. Rebuild the entire DOM subtree

For a list of 10 emotions, this happens 10 times instead of once. Building the full string first and setting `innerHTML` once is the correct pattern.

---

# 14. Checkbox Input — `.checked`

```javascript
const isGif = gifsOnlyOption.checked
```

`element.checked` is a **boolean property** on `<input type="checkbox">` and `<input type="radio">` elements:

| Value | Meaning |
|-------|---------|
| `true` | The checkbox/radio is currently checked |
| `false` | It is unchecked |

This is different from reading a text input's value (which uses `.value`). The `checked` property reflects the **current state** of the control in real time — you can read it at any moment.

```javascript
// Reading state
if (gifsOnlyOption.checked) { /* GIFs only */ }

// Setting state from JavaScript
gifsOnlyOption.checked = true    // programmatically check it
gifsOnlyOption.checked = false   // programmatically uncheck it
```

In `getMatchingCatsArray`, `isGif` stores the checkbox state at the time the button is clicked. If `isGif` is `true`, the `.filter()` callback requires `cat.isGif === true` in addition to matching the emotion.

---

# 15. Named Functions vs Anonymous Functions

In Cookie Consent, all event handlers were **anonymous functions** defined inline:

```javascript
// Cookie Consent — anonymous function
modalCloseBtn.addEventListener('click', function() {
    modal.style.display = 'none'
})
```

In the Meme App, all handlers are **named functions** defined separately and passed by reference:

```javascript
// Meme App — named function reference
memeModalCloseBtn.addEventListener('click', closeModal)
getImageBtn.addEventListener('click', renderCat)
emotionRadios.addEventListener('change', highlightCheckedOption)

function closeModal() {
    memeModal.style.display = 'none'
}
```

| Approach | Pros | Cons |
|----------|------|------|
| Anonymous inline | Short, self-contained | Cannot be reused, cannot be removed with `removeEventListener` |
| Named function reference | Reusable, removable, testable, readable | Slightly more code |

Named functions are also **hoisted** — JavaScript moves function declarations to the top of their scope before running any code. This means `renderCat`, `closeModal`, and `highlightCheckedOption` can be called before their definitions appear in the file. The `addEventListener` calls at the top of `index.js` work even though the function bodies appear further down.

---

# 16. CSS Concepts — What's New

## 16.1 `accent-color`

```css
.highlight {
    background-color: #fff0ee;
    color: #bd301d;
    font-weight: bold;
    accent-color: #bd301d;
}
```

`accent-color` is a CSS property that sets the **theme colour** of browser-rendered UI controls — specifically checkboxes, radio buttons, range sliders, and progress bars. Without it, these controls use the browser's default blue/grey colour scheme regardless of your page's palette.

```css
/* Without accent-color: radio dot is browser-default blue */
/* With accent-color: radio dot matches your design colour */
accent-color: #bd301d;   /* → radio dot becomes dark red */
```

This is a modern CSS property (widely supported since 2022) that replaces complex hacks involving `appearance: none` and custom SVG backgrounds.

## 16.2 `:first-child` and `:last-child` pseudo-classes

```css
.radio:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}

.radio:last-child {
    border-bottom: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
```

`:first-child` matches an element only if it is the **first child** of its parent. `:last-child` matches only the **last child**.

Here they are used to round the outer corners of the radio list and remove the bottom border from the last item (which would otherwise double up with the container's border).

| Pseudo-class | Matches |
|-------------|---------|
| `:first-child` | Element is the first sibling |
| `:last-child` | Element is the last sibling |
| `:nth-child(n)` | Element at position `n` |
| `:only-child` | Element is the only child |
| `:first-of-type` | First element of its tag type |
| `:last-of-type` | Last element of its tag type |

> The difference between `:first-child` and `:first-of-type`: `:first-child` requires the element to be literally the first child of its parent; `:first-of-type` requires it to be the first of its **tag type** among siblings.

## 16.3 `position: absolute` inside `position: fixed`

```css
.meme-modal {
    position: fixed;
    /* ... */
}

.meme-modal-close-btn {
    position: absolute;
    top: 2%;
    right: 2%;
}
```

`position: absolute` removes an element from normal flow and positions it relative to its **nearest positioned ancestor** — an ancestor with `position` set to anything other than `static` (i.e., `relative`, `absolute`, `fixed`, or `sticky`).

The modal has `position: fixed`, which makes it a **positioned ancestor**. So the close button, with `position: absolute`, is positioned relative to the modal's boundaries — not the page.

```
.meme-modal (position: fixed)
    ├── .meme-modal-close-btn (position: absolute)
    │       top: 2% of modal height → near top
    │       right: 2% of modal width → near right edge
    └── #meme-modal-inner
```

This is the standard pattern for placing a close button in the corner of a modal.

## 16.4 `width: unset`

```css
label {
    width: 100%;    /* all labels get full width */
}

.gifs-check-label {
    width: unset;   /* cancel the inherited full width */
    margin-right: 5px;
}
```

`unset` resets a property to its **inherited value** if the property is inheritable, or to its **initial value** if it is not. For `width`, which is not inherited, `unset` behaves like `initial` — restoring the browser's default (`auto`).

| Value | Meaning |
|-------|---------|
| `inherit` | Always use the parent's value |
| `initial` | Always use the CSS specification's initial value |
| `unset` | Inherited → use parent value; non-inherited → use initial value |
| `revert` | Restore to browser's default stylesheet value |

Here it cancels the `width: 100%` rule on `label` that was written for the radio labels. The checkbox label needs to be its natural content width, not full-width.

---

# 17. How the Full App Flow Works

```
Page loads
    └── renderEmotionsRadios(catsData) runs immediately
            ├── getEmotionsArray(catsData)
            │       → loops all cats → collects unique emotions → ["moody", "insomniac", ...]
            └── builds radioItems HTML string in a loop
                    → sets emotionRadios.innerHTML
                    → radio buttons appear in the DOM

User selects an emotion (radio button)
    └── 'change' event fires on emotionRadios container (bubbled up)
            └── highlightCheckedOption(e)
                    ├── getElementsByClassName('radio') → all radio rows
                    ├── for...of → removes .highlight from every row
                    └── e.target.id → finds clicked radio → .parentElement → adds .highlight

User optionally checks "Animated GIFs only"
    └── No event handler needed — checkbox state is read when button is clicked

User clicks "Get Image"
    └── 'click' fires → renderCat()
            └── getSingleCatObject()
                    └── getMatchingCatsArray()
                            ├── querySelector('input[type="radio"]:checked') → gets selected emotion
                            ├── gifsOnlyOption.checked → gets GIF preference
                            └── catsData.filter(...) → returns matching cats array
                    ├── if length === 1 → return catsArray[0]
                    └── else → Math.floor(Math.random() * length) → random index → return cat
            ├── memeModalInner.innerHTML = `<img src="..." alt="...">`
            └── memeModal.style.display = 'flex' → modal appears

User clicks "X"
    └── 'click' fires → closeModal()
            └── memeModal.style.display = 'none' → modal hides
```

---

# 18. How to Run

No build step or server required — but because this project uses ES Modules (`import`/`export`), the browser enforces the **same-origin policy** on module loading. Opening `index.html` directly with `file://` will fail with a CORS error.

You must serve the files from a local HTTP server:

**Using VS Code Live Server:**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click `index.html` → **Open with Live Server**

**Using Node.js `http-server`:**
```bash
npx http-server .
```
Then open `http://localhost:8080` in your browser.

> This is the key difference from Cookie Consent — that project used a plain `<script src="index.js">` tag, which works with `file://`. The moment you add `type="module"`, you need a real HTTP server.

---

# 19. Course Reference

| Item | Detail |
|------|--------|
| Platform | [Scrimba](https://scrimba.com) |
| Course | Fullstack Web Development Path |
| Module | Essential JavaScript |
| Project number | 02 of the module |
| Previous project | [01. Cookie Consent](../01.%20Cookie%20Consent/README.md) |
| Next project | [03. X Clone](../03.%20X%20Clone/) |
