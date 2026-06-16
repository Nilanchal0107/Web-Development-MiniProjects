# Cookie Consent — Essential JavaScript

![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-Essential-yellow?style=flat-square&logo=javascript)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Roboto-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A satirical cookie consent modal — the **first Essential JavaScript project** from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every core JavaScript concept introduced in this module, comparing what is new here against the CSS and HTML work covered in earlier folders.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is "Essential JavaScript"?](#3-what-is-essential-javascript)
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [The DOM — Document Object Model](#5-the-dom--document-object-model)
   - [What the DOM is](#51-what-the-dom-is)
   - [getElementById](#52-getelementbyid)
6. [Event Listeners](#6-event-listeners)
   - [addEventListener](#61-addeventlistener)
   - [The click event](#62-the-click-event)
   - [The mouseenter event](#63-the-mouseenter-event)
   - [The submit event](#64-the-submit-event)
7. [setTimeout](#7-settimeout)
8. [Manipulating the DOM](#8-manipulating-the-dom)
   - [style.display](#81-styledisplay)
   - [classList.toggle](#82-classlisttoggle)
   - [innerHTML vs innerText](#83-innerhtml-vs-innertext)
9. [FormData API](#9-formdata-api)
   - [new FormData()](#91-new-formdata)
   - [formData.get()](#92-formdataget)
10. [preventDefault](#10-preventdefault)
11. [Template Literals](#11-template-literals)
12. [The `disabled` Attribute and JavaScript](#12-the-disabled-attribute-and-javascript)
13. [CSS Concepts Reinforced](#13-css-concepts-reinforced)
    - [position: fixed — Modal Centering](#131-position-fixed--modal-centering)
    - [box-shadow](#132-box-shadow)
    - [box-sizing: border-box](#133-box-sizing-border-box)
    - [The :disabled pseudo-class](#134-the-disabled-pseudo-class)
    - [flex-direction: row-reverse](#135-flex-direction-row-reverse)
    - [cursor: pointer and cursor: not-allowed](#136-cursor-pointer-and-cursor-not-allowed)
14. [HTML Structure Recap](#14-html-structure-recap)
15. [How the Decline Button Trick Works](#15-how-the-decline-button-trick-works)
16. [How to Run](#16-how-to-run)
17. [Course Reference](#17-course-reference)

---

# 1. Project Overview

This is a deliberately satirical cookie consent modal. The page includes:

* A **main content area** — a fake "learn to code" sales pitch with coloured list items, a hero image, and a paragraph
* A **modal** that appears after a 1.5-second delay, demanding the user's name and email
* An **Accept flow** — submitting the form triggers a loading animation, then replaces the modal content with a comedic "you sucker" message and a pirate GIF, and finally enables the close button
* A **Decline button joke** — hovering the Decline button causes it to swap to the other side of the Accept button, making it impossible to click

The real goal is not the UI — it is to learn how JavaScript interacts with HTML and CSS through the DOM: selecting elements, listening for events, manipulating styles and content, and working with forms.

---

# 2. Project Structure

```
05. Essential JavaScript/
│
└── 01. Cookie Consent/
    ├── index.html      → Page structure: main content + modal markup
    ├── index.css       → Styling: layout, modal, buttons, inputs, states
    ├── index.js        → All JavaScript: DOM selection, events, timers, FormData
    └── images/
        ├── bugatti.jpg     → Hero image in the main content (satirical flex)
        ├── loading.svg     → Animated spinner shown during form submission
        └── pirate.gif      → Comedic GIF shown after the "data sale" completes
```

---

# 3. What is "Essential JavaScript"?

"Essential JavaScript" refers to the core subset of JS patterns that appear on virtually every web project. This module distills JavaScript down to the tools you will use daily as a frontend developer:

| Category | Concepts Covered |
|----------|-----------------|
| DOM Access | `getElementById`, reading and writing element properties |
| Events | `addEventListener`, click, mouseenter, submit |
| Timers | `setTimeout` — delaying code execution |
| DOM Manipulation | `style.display`, `classList.toggle`, `innerHTML`, `innerText` |
| Forms | `FormData`, `formData.get()`, `preventDefault()` |
| Strings | Template literals (backtick strings with `${}` interpolation) |
| HTML Attributes | `disabled` — controlling interactivity from HTML and JS |

The project is deliberately small — the entire JavaScript file is 50 lines — so you can see how much interactive behaviour you can create with a tight, well-structured script.

---

# 4. What's New vs Previous Projects

This project introduces JavaScript patterns and concepts **not seen in the HTML/CSS Fundamentals, Accessible Development, or Essential CSS folders**.

## New JavaScript Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `document.getElementById()` | Top of `index.js` | Selects HTML elements by their `id` attribute |
| `element.addEventListener()` | Modal close, decline, form submit | Attaches event handler functions to elements |
| `setTimeout()` | Modal show, upload text update, final message | Delays execution of a function |
| `modal.style.display` | Show/hide the modal | Changes inline CSS from JavaScript |
| `classList.toggle()` | Decline button hover | Adds/removes a class without checking its current state |
| `e.preventDefault()` | Form submit | Stops the browser's default form submission |
| `new FormData()` | Form submit | Reads all form field values at once |
| `formData.get()` | Form submit | Extracts a specific field value by name |
| `element.innerHTML` | After submit | Replaces element content with an HTML string |
| `element.innerText` | After first timeout | Updates only the text content of an element |
| Template literals | After submit | Embeds variables into multi-line HTML strings |
| `element.disabled` | After submit complete | Enables a previously disabled button |

## New CSS Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `position: fixed` | `.modal` | Pins the modal to the viewport, ignoring scroll |
| `box-shadow` | `.modal` | Adds a drop shadow to the modal card |
| `box-sizing: border-box` | `*` reset | Makes `width` include `padding` and `border` |
| `:disabled` pseudo-class | `.modal-close-btn:disabled` | Styles a button that has the `disabled` attribute |
| `flex-direction: row-reverse` | `.modal-btns-reverse` | Reverses button order — used in the Decline trick |
| `cursor: pointer` | `.modal-btn`, `.modal-close-btn:hover` | Changes cursor to hand on hover |
| `cursor: not-allowed` | `.modal-close-btn:disabled` | Shows a crossed-circle cursor on disabled button |
| `opacity` | `.modal-close-btn:disabled` | Fades the button to visually communicate unavailability |

---

# 5. The DOM — Document Object Model

## 5.1 What the DOM is

When the browser loads an HTML file, it does not see raw text — it parses the HTML and builds a **tree of objects in memory**. Each HTML element becomes a **node** in this tree, with properties you can read and methods you can call. This in-memory tree is the **DOM**.

```
document
└── <html>
    ├── <head>
    └── <body>
        ├── <main>
        │   └── <section class="section-container">
        │       ├── <h1>
        │       ├── <ul>
        │       ├── <h3>
        │       ├── <img>
        │       └── <p>
        └── <div class="modal" id="modal">
            ├── <div class="close-modal-btn-container">
            │   └── <button id="modal-close-btn">
            └── <div class="modal-inner" id="modal-inner">
                ├── <h2>
                ├── <p id="modal-text">
                └── <form id="consent-form">
                    ├── <input type="text">
                    ├── <input type="email">
                    └── <div id="modal-choice-btns">
                        ├── <button type="submit">
                        └── <button id="decline-btn">
```

JavaScript can access any node in this tree and change its content, attributes, or styles — and those changes are immediately reflected in the browser.

## 5.2 `getElementById`

```javascript
const modal          = document.getElementById('modal')
const modalCloseBtn  = document.getElementById('modal-close-btn')
const consentForm    = document.getElementById('consent-form')
const modalText      = document.getElementById('modal-text')
const declineBtn     = document.getElementById('decline-btn')
const modalChoiceBtns = document.getElementById('modal-choice-btns')
```

`document.getElementById(id)` searches the DOM tree for the **first element** whose `id` attribute matches the string, and returns it as a JavaScript object.

| Behaviour | Detail |
|-----------|--------|
| Returns | The element node as an object, or `null` if not found |
| Case-sensitive | `'Modal'` ≠ `'modal'` |
| Must be unique | IDs should be unique per page — `getElementById` returns only one result |
| Runs immediately | These lines run when the script loads, so the HTML must already be parsed |

> **Why store them in `const` variables at the top?** So you only query the DOM once per element. Calling `getElementById` inside every event handler would work, but is wasteful — the DOM lookup happens every time. Storing the reference in a variable is faster and cleaner.

> **Why `const` and not `let`?** The variable holds a reference to a DOM node. Even though you will change properties *on* that node (e.g. `modal.style.display`), you are never re-assigning the variable to a different node. `const` communicates this intent clearly.

---

# 6. Event Listeners

## 6.1 `addEventListener`

```javascript
element.addEventListener(eventType, handlerFunction)
```

`addEventListener` registers a **callback function** to be called whenever a specific event fires on an element. Nothing happens until the event occurs.

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventType` | string | Name of the event: `'click'`, `'submit'`, `'mouseenter'`, etc. |
| `handlerFunction` | function | Called automatically when the event fires; receives an event object as its argument |

The handler is not called immediately — it is placed on standby. The browser calls it whenever the event fires.

## 6.2 The `click` Event

```javascript
modalCloseBtn.addEventListener('click', function() {
    modal.style.display = 'none'
})
```

`'click'` fires when the user clicks (mousedown + mouseup) on the element. Here it hides the modal by setting `display` to `'none'`.

The handler function is **anonymous** — it has no name because it is defined inline and never needs to be called directly. This is a very common pattern for short, single-use handlers.

## 6.3 The `mouseenter` Event

```javascript
declineBtn.addEventListener('mouseenter', function() {
    modalChoiceBtns.classList.toggle('modal-btns-reverse')
})
```

`'mouseenter'` fires once when the mouse cursor **first enters** the element's boundary — it does not fire again while the mouse moves within the element (unlike `'mouseover'`, which fires on every pixel of movement).

Here it is used to trigger the Decline button trick — see [Section 15](#15-how-the-decline-button-trick-works) for the full explanation.

### `mouseenter` vs `mouseover`

| Event | Fires when... | Fires on child elements? |
|-------|--------------|--------------------------|
| `mouseenter` | Cursor first crosses the element boundary | ❌ No — only on the target element |
| `mouseover` | Cursor moves over the element or any child | ✅ Yes — bubbles up from children |

> `mouseenter` is preferred for hover effects because it does not "bubble" — it fires once, not repeatedly when the cursor moves over child elements inside the target.

## 6.4 The `submit` Event

```javascript
consentForm.addEventListener('submit', function(e) {
    e.preventDefault()
    // ...
})
```

`'submit'` fires when a `<form>` is submitted — either by clicking a `type="submit"` button or pressing Enter in a text field.

The handler receives an **event object** (`e`). This object has methods and properties describing the event. The most important one used here is `e.preventDefault()` — see [Section 10](#10-preventdefault).

---

# 7. `setTimeout`

```javascript
// Show the modal 1.5 seconds after the page loads
setTimeout(function() {
    modal.style.display = 'inline'
}, 1500)
```

```javascript
// 1.5 seconds after form submit: update upload text
setTimeout(function() {
    document.getElementById('upload-text').innerText = `Making the sale...`
}, 1500)

// 3 seconds after form submit: show final message and enable close button
setTimeout(function() {
    document.getElementById('modal-inner').innerHTML = `...`
    modalCloseBtn.disabled = false
}, 3000)
```

`setTimeout(callback, delay)` tells the browser: *"after `delay` milliseconds, call `callback` once."*

| Parameter | Type | Description |
|-----------|------|-------------|
| `callback` | function | The function to run after the delay |
| `delay` | number | Milliseconds to wait (1000ms = 1 second) |

### How JavaScript's Timer Works

JavaScript is **single-threaded** — it can only do one thing at a time. `setTimeout` does not pause the script; it registers the callback with the browser's timer system and immediately continues to the next line. The callback is placed in the **task queue** and only runs once the delay has elapsed and the main thread is free.

```
Main thread:
  → setTimeout(..., 1500) — registers timer, continues immediately
  → next line...
  → next line...

1500ms later, browser's timer fires:
  → callback is queued
  → callback runs: modal.style.display = 'inline'
```

### Stacking Timeouts After Form Submit

```javascript
consentForm.addEventListener('submit', function(e) {
    e.preventDefault()

    // Immediately: replace modal content with loading spinner
    modalText.innerHTML = `<div class="modal-inner-loading">...loading...</div>`

    // After 1.5s: update the loading text
    setTimeout(function() {
        document.getElementById('upload-text').innerText = `Making the sale...`
    }, 1500)

    // After 3s: replace entire modal inner with final message
    setTimeout(function() {
        document.getElementById('modal-inner').innerHTML = `...`
        modalCloseBtn.disabled = false
    }, 3000)
})
```

Both `setTimeout` calls start their timers at the **same moment** (when the form is submitted). The 1500ms one fires first, then the 3000ms one fires 1.5 seconds later. This creates a sequenced animation without chaining callbacks.

---

# 8. Manipulating the DOM

## 8.1 `style.display`

```javascript
// Show the modal
modal.style.display = 'inline'

// Hide the modal
modal.style.display = 'none'
```

Every DOM element has a `.style` object whose properties map directly to CSS properties. Setting `element.style.display = 'none'` is equivalent to adding `display: none` as an **inline style** on the element.

> **Why `'inline'` and not `'block'`?** The modal is a `<div>` (block by default), but it uses `position: fixed` with `margin: auto` to centre itself. `display: inline` works here because the element is removed from normal flow by `position: fixed`. In practice, `'block'` would also work — but `'inline'` was used and it has the same visual result given the fixed positioning.

### Inline Style vs Class

| Approach | How | Specificity |
|----------|-----|-------------|
| `element.style.display = 'none'` | Sets inline style directly | Highest — overrides any stylesheet rule |
| `element.classList.add('hidden')` | Adds a CSS class | Normal class specificity |

The inline style approach is simpler for one-off show/hide toggles. For more complex state changes, using classes is preferred (it keeps style decisions in CSS, not JS).

## 8.2 `classList.toggle`

```javascript
modalChoiceBtns.classList.toggle('modal-btns-reverse')
```

`classList` is a property of every DOM element that gives you a live list of its CSS classes. It has three key methods:

| Method | Effect |
|--------|--------|
| `.add('className')` | Adds the class if not present |
| `.remove('className')` | Removes the class if present |
| `.toggle('className')` | **Adds if absent, removes if present** |
| `.contains('className')` | Returns `true`/`false` |

`toggle` is ideal for on/off states — you don't need to check the current state manually. Every time `mouseenter` fires on the Decline button, `'modal-btns-reverse'` is toggled on or off the container.

## 8.3 `innerHTML` vs `innerText`

```javascript
// innerText — sets plain text content only
document.getElementById('upload-text').innerText = `Making the sale...`

// innerHTML — parses and sets HTML content
document.getElementById('modal-inner').innerHTML = `
    <h2>Thanks <span class="modal-display-name">${fullName}</span>, you sucker!</h2>
    <p>We just sold the rights to your eternal soul.</p>
    <div class="idiot-gif">
        <img src="images/pirate.gif">
    </div>
`
```

| Property | Parses HTML tags? | Use when... |
|----------|-------------------|-------------|
| `innerText` | ❌ No — treats everything as plain text | You are setting text content with no markup |
| `innerHTML` | ✅ Yes — renders tags as actual elements | You are injecting HTML structure |
| `textContent` | ❌ No — similar to `innerText` but faster | Performance-sensitive text updates |

> **Security note:** Never set `innerHTML` using **unvalidated user input** — it can execute malicious scripts (XSS attacks). In this project, `fullName` comes from a controlled form field, but in production you should sanitise any user-supplied content before passing it to `innerHTML`.

---

# 9. FormData API

## 9.1 `new FormData()`

```javascript
consentForm.addEventListener('submit', function(e) {
    e.preventDefault()

    const consentFormData = new FormData(consentForm)
    // ...
})
```

`FormData` is a built-in browser object that reads all `<input>`, `<select>`, and `<textarea>` values from a `<form>` element at once.

```javascript
const consentFormData = new FormData(consentForm)
//                                    ↑
//              Pass the form element — FormData reads all its fields
```

It uses the `name` attribute of each input to key the data:

```html
<input type="text"  name="fullName" placeholder="Enter your full name" required />
<input type="email" name="email"    placeholder="Enter your email"     required />
```

`FormData` collects both fields automatically. You don't need to query each input individually.

## 9.2 `formData.get()`

```javascript
const fullName = consentFormData.get('fullName')
```

`.get(name)` retrieves the value of the field with the matching `name` attribute as a string.

| Method | Returns |
|--------|---------|
| `.get('fieldName')` | The value of that single field (string), or `null` if not found |
| `.getAll('fieldName')` | An array of all values for that name (useful for multi-select) |
| `.has('fieldName')` | `true` if the field exists |

> `FormData` is particularly powerful for file uploads and complex forms. For this project, only `fullName` is needed — `email` is collected but not used in the success message.

---

# 10. `preventDefault`

```javascript
consentForm.addEventListener('submit', function(e) {
    e.preventDefault()
    // ...
})
```

When a `<form>` is submitted, the browser's **default behaviour** is to send the form data as an HTTP request to the URL in the `action` attribute (or the current page if `action` is absent), causing a **full page reload**.

`e.preventDefault()` cancels this default action. The `submit` event still fires, the handler still runs — but the page does not reload and no HTTP request is sent. This lets you handle the form entirely in JavaScript.

### The Event Object (`e`)

The parameter `e` (or `event` — the name is arbitrary) is the **event object** that the browser passes automatically to every event handler. It contains:

| Property / Method | Description |
|-------------------|-------------|
| `e.preventDefault()` | Cancels the browser's default behaviour for this event |
| `e.target` | The element that triggered the event |
| `e.type` | The event type string (`'submit'`, `'click'`, etc.) |
| `e.stopPropagation()` | Prevents the event from bubbling up to parent elements |

---

# 11. Template Literals

```javascript
document.getElementById('modal-inner').innerHTML = `
    <h2>Thanks <span class="modal-display-name">${fullName}</span>, you sucker!</h2>
    <p>We just sold the rights to your eternal soul.</p>
    <div class="idiot-gif">
        <img src="images/pirate.gif">
    </div>
`
```

Template literals use **backticks** (`` ` ``) instead of quotes. They have two superpowers over regular strings:

### 1. Multi-line strings

```javascript
// Regular string — requires \n escape sequences
const str = "<h2>Thanks</h2>\n<p>We sold your soul.</p>"

// Template literal — newlines are literal
const str = `
    <h2>Thanks</h2>
    <p>We sold your soul.</p>
`
```

### 2. Interpolation with `${}`

```javascript
const fullName = 'Nilanchal'

// Regular string — concatenation with +
const msg = "Thanks " + fullName + ", you sucker!"

// Template literal — embed variables directly
const msg = `Thanks ${fullName}, you sucker!`
```

Inside `${}` you can put any valid JavaScript **expression** — a variable, a function call, a ternary operator:

```javascript
`${fullName.toUpperCase()}`         // method call
`${isAdmin ? 'Admin' : 'User'}`    // ternary
`${2 + 2}`                         // arithmetic → "4"
```

---

# 12. The `disabled` Attribute and JavaScript

```html
<!-- In HTML — button starts disabled -->
<button class="modal-close-btn" id="modal-close-btn" disabled>X</button>
```

```javascript
// In JavaScript — enable the button after the animation completes
modalCloseBtn.disabled = false
```

The `disabled` attribute on a `<button>` or `<input>` does two things:
1. Makes the element **non-interactive** — click events are not fired
2. Changes the element's **visual state** — the `:disabled` CSS pseudo-class applies

### Why Start Disabled?

The close button starts disabled so users cannot dismiss the modal before the full comedic sequence plays out — they must watch the "data upload" animation to the end. `modalCloseBtn.disabled = false` re-enables it only after the 3-second timeout completes.

### The `:disabled` Pseudo-class in CSS

```css
.modal-close-btn:disabled {
    color: whitesmoke;
    opacity: 0.2;
    cursor: not-allowed;
}
```

`:disabled` works exactly like `:hover` — it targets the element when it is in the disabled state. The combination of `opacity: 0.2` (visually faded) and `cursor: not-allowed` (crossed-circle icon) communicates to the user that the button is intentionally unavailable.

---

# 13. CSS Concepts Reinforced

## 13.1 `position: fixed` — Modal Centering

```css
.modal {
    display: none;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 420px;
    width: 350px;
    border-radius: 5px;
    /* ... */
}
```

`position: fixed` removes the element from normal document flow and positions it relative to the **viewport** (the browser window), not the page. The element stays in the same place even when the user scrolls.

### The Centering Trick: `inset: 0` + `margin: auto`

Setting all four sides (`top`, `right`, `bottom`, `left`) to `0` tells the browser the element wants to stretch to all four edges simultaneously. Because it has a fixed `width` and `height`, it cannot do this — so `margin: auto` distributes the remaining space equally on all sides, perfectly centring the element.

```
Viewport (e.g. 800×600)
┌─────────────────────────────────┐
│         auto margin             │
│    ┌───────────────────────┐    │
│    │                       │    │
│auto│    .modal             │auto│
│    │    350 × 420          │    │
│    │                       │    │
│    └───────────────────────┘    │
│         auto margin             │
└─────────────────────────────────┘
```

This is a **classic CSS centering technique** for modals. It works for any element where you know the dimensions and need it fixed to the viewport.

### `position` Values Summary

| Value | Positioned relative to | Stays on scroll? | In flow? |
|-------|------------------------|-----------------|---------|
| `static` | Normal flow (default) | N/A | ✅ Yes |
| `relative` | Its own normal position | N/A | ✅ Yes |
| `absolute` | Nearest positioned ancestor | ❌ No | ❌ No |
| `fixed` | Viewport | ✅ Yes | ❌ No |
| `sticky` | Normal flow until threshold | Partially | ✅ Yes |

## 13.2 `box-shadow`

```css
.modal {
    box-shadow: 0px 0px 6px 2px #666;
}
```

`box-shadow` adds a shadow behind an element. The value format is:

```
box-shadow: offset-x  offset-y  blur-radius  spread-radius  color;
             ↑          ↑         ↑             ↑              ↑
            0px        0px       6px           2px           #666
```

| Part | Value | Effect |
|------|-------|--------|
| `offset-x` | `0px` | No horizontal shift — shadow is centred |
| `offset-y` | `0px` | No vertical shift — shadow is centred |
| `blur-radius` | `6px` | How far the shadow blurs out |
| `spread-radius` | `2px` | How much larger than the element the shadow grows |
| `color` | `#666` | Mid-grey shadow |

With both offsets at `0` and a spread of `2px`, the shadow appears as an even glow around all four sides of the modal — giving it a floating, elevated appearance.

## 13.3 `box-sizing: border-box`

```css
* {
    box-sizing: border-box;
}
```

By default, CSS uses `box-sizing: content-box` — meaning `width` and `height` refer to the **content area only**, and `padding` and `border` are added on top:

```
content-box (default):
  width: 350px + padding: 20px each side = 390px actual rendered width

border-box:
  width: 350px includes padding and border = 350px actual rendered width
```

`box-sizing: border-box` on the `*` universal selector resets every element so that `width` always means the **total rendered width**. This is the modern CSS reset standard — it makes sizing predictable and avoids constant arithmetic to account for padding.

## 13.4 The `:disabled` Pseudo-class

Covered in [Section 12](#12-the-disabled-attribute-and-javascript). Key point: `:disabled` is a CSS pseudo-class that applies automatically when an HTML element has the `disabled` attribute. You do not need JavaScript to style disabled states.

## 13.5 `flex-direction: row-reverse`

```css
.modal-choice-btns {
    display: flex;
    justify-content: center;
}

.modal-btns-reverse {
    flex-direction: row-reverse;
}
```

`flex-direction` controls the **direction of the main axis** in a flex container:

| Value | Items ordered |
|-------|--------------|
| `row` | Left → Right (default) |
| `row-reverse` | Right → Left |
| `column` | Top → Bottom |
| `column-reverse` | Bottom → Top |

In the Decline trick, toggling `.modal-btns-reverse` switches `flex-direction` from `row` to `row-reverse`. This visually swaps the positions of the Accept and Decline buttons without changing the HTML order.

## 13.6 `cursor: pointer` and `cursor: not-allowed`

```css
.modal-close-btn:hover,
.modal-close-btn:active {
    cursor: pointer;
}

.modal-close-btn:disabled {
    cursor: not-allowed;
}
```

The `cursor` property changes what the mouse cursor looks like when hovering over an element:

| Value | Cursor | When to use |
|-------|--------|-------------|
| `default` | Arrow | Normal page elements |
| `pointer` | Hand / finger | Clickable elements (links, buttons) |
| `not-allowed` | Crossed circle | Disabled or forbidden actions |
| `text` | I-beam | Text fields |
| `grab` / `grabbing` | Hand | Draggable elements |

> All interactive elements that a user can click should have `cursor: pointer`. Browsers apply it automatically to `<a>` tags, but not to `<button>` elements — so you must add it manually.

---

# 14. HTML Structure Recap

```
<html>
├── <head>
│   ├── <link> → index.css
│   └── <link> → Google Fonts (Roboto)
│
└── <body>
    ├── <main>
    │   └── <section class="section-container">
    │       ├── <h1> → Main headline
    │       ├── <ul> → Coloured list items (li-green, li-yellow, li-blue, li-pink)
    │       ├── <h3> → Subheading
    │       ├── <img src="images/bugatti.jpg"> → Hero image
    │       └── <p> → Body copy
    │
    ├── <div class="modal" id="modal">         ← Hidden by default (display: none)
    │   ├── <div class="close-modal-btn-container">
    │   │   └── <button id="modal-close-btn" disabled>X</button>
    │   │
    │   └── <div class="modal-inner" id="modal-inner">
    │       ├── <h2>We ❤️ Your Data!</h2>
    │       ├── <p class="modal-text" id="modal-text"> → Consent copy
    │       └── <form id="consent-form">
    │           ├── <input type="text"  name="fullName">
    │           ├── <input type="email" name="email">
    │           └── <div class="modal-choice-btns" id="modal-choice-btns">
    │               ├── <button type="submit" class="modal-btn">Accept</button>
    │               └── <button id="decline-btn" class="modal-btn">Decline</button>
    │
    └── <script src="index.js"></script>       ← At end of body, after all HTML
```

### Why `<script>` at the Bottom of `<body>`?

Placing the `<script>` tag as the **last child of `<body>`** ensures the HTML is fully parsed into the DOM before the JavaScript runs. If the script were in `<head>`, `document.getElementById('modal')` would return `null` — the element would not exist yet when the script executes.

The modern alternative is `<script defer src="...">` in `<head>` — the `defer` attribute tells the browser to download the script in parallel but execute it only after the DOM is ready.

### `type="submit"` vs No Type

```html
<button type="submit" class="modal-btn">Accept</button>
<button class="modal-btn" id="decline-btn">Decline</button>
```

| `type` | Behaviour |
|--------|-----------|
| `type="submit"` | Submits the nearest parent `<form>` when clicked |
| `type="button"` | Does nothing by default — for JS-driven actions |
| `type="reset"` | Resets all form fields to their default values |

The **default type for `<button>` is `submit`** when inside a form. The Decline button has no type, so it is also `submit` by default — but its click is intercepted by the `mouseenter` trick before the user can click it. If this were production code, Decline would use `type="button"` explicitly.

---

# 15. How the Decline Button Trick Works

This is the most creative piece of JavaScript in the project. Here is how it works step by step:

### The Setup

```css
/* Base: Accept on left, Decline on right */
.modal-choice-btns {
    display: flex;
    justify-content: center;
}

/* Toggled: reverses the visual order */
.modal-btns-reverse {
    flex-direction: row-reverse;
}
```

```javascript
declineBtn.addEventListener('mouseenter', function() {
    modalChoiceBtns.classList.toggle('modal-btns-reverse')
})
```

### The Sequence

1. Modal appears — Accept on the left, Decline on the right
2. User moves mouse toward Decline
3. `mouseenter` fires on Decline as the cursor crosses its boundary
4. `.modal-btns-reverse` is toggled **on** — Decline jumps to the left, Accept jumps to the right
5. Cursor is now hovering over Accept (the button that swapped into Decline's place)
6. User instinctively moves toward Decline again (now on the left)
7. `mouseenter` fires on Decline again — `.modal-btns-reverse` is toggled **off** — buttons snap back
8. Repeat indefinitely — the user can never hover steadily over Decline long enough to click it

### Why `mouseenter` and Not `click`?

`mouseenter` fires the moment the cursor **enters** the element — before any click can happen. By the time the user has moved their mouse to Decline and is about to click, the button has already swapped away. `click` would fire too late (after mousedown + mouseup), so the trick would not work.

---

# 16. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder
   ```bash
   cd "05. Essential JavaScript/01. Cookie Consent"
   ```

3. Open `index.html` in your browser or use **Live Server** in VS Code.

4. **Things to try:**
   - Wait 1.5 seconds — watch the modal appear automatically via `setTimeout`
   - Try to click the Decline button — observe the `mouseenter` / `flex-direction: row-reverse` trick
   - Fill in the form and click Accept — follow the loading → "Making the sale..." → final message sequence
   - Open the Console in DevTools and type `modal.style.display = 'inline'` — you are manipulating the DOM directly, exactly as the script does
   - In DevTools, inspect the modal's `<div>` and manually add/remove the class `modal-btns-reverse` to see the Flexbox reversal
   - After the form submits, inspect `modalCloseBtn` in the Elements panel and watch `disabled` disappear from its attributes after 3 seconds

---

# 17. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Essential JavaScript Module — Build a Cookie Consent
* **Topics Covered:** DOM selection · `getElementById` · `addEventListener` · `click` event · `mouseenter` event · `submit` event · `setTimeout` · `style.display` · `classList.toggle` · `innerHTML` · `innerText` · `FormData` · `formData.get()` · `preventDefault` · Template literals · `disabled` attribute · `position: fixed` · Modal centering · `box-shadow` · `box-sizing: border-box` · `:disabled` pseudo-class · `flex-direction: row-reverse` · `cursor: pointer` · `cursor: not-allowed` · `opacity`
* **Reference Docs:**
  - [MDN — Document.getElementById()](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById)
  - [MDN — EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
  - [MDN — setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
  - [MDN — FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
  - [MDN — Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
  - [MDN — position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
  - [MDN — Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *JavaScript's power is not in the language itself — it is in the DOM. Once you understand that every HTML element is an object you can select, listen to, and modify in real time, the entire web becomes programmable. These essential patterns — querySelector, addEventListener, setTimeout, FormData — are the tools you will use on every project for the rest of your career.*
