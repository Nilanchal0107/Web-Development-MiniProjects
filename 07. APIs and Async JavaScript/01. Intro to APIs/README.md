# Intro to APIs — APIs and Async JavaScript

![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript)
![fetch](https://img.shields.io/badge/fetch-Promise--based-blueviolet?style=flat-square)
![JSON](https://img.shields.io/badge/JSON-Response%20Format-lightgrey?style=flat-square)
![REST API](https://img.shields.io/badge/REST%20API-Bored%20API-teal?style=flat-square)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Oxygen-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

**BoredBot** — the **first project in the APIs and Async JavaScript module** from **Scrimba's Fullstack Web Development Path**.

This README is a **complete concept revision guide**. It explains every new concept introduced in this project: what an API is, how the web's request–response cycle works, what JSON is, and the complete `fetch()` → `.then()` → `.then()` Promise chain — the foundational pattern for all subsequent API projects in this module.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Previous Projects](#3-whats-new-vs-previous-projects)
4. [What is an API?](#4-what-is-an-api)
   - [Definition](#41-definition)
   - [Web APIs specifically](#42-web-apis-specifically)
   - [The Bored API](#43-the-bored-api)
5. [Clients and Servers](#5-clients-and-servers)
   - [The client](#51-the-client)
   - [The server](#52-the-server)
   - [The client–server model](#53-the-clientserver-model)
6. [The Request–Response Cycle](#6-the-requestresponse-cycle)
   - [What happens when fetch() is called](#61-what-happens-when-fetch-is-called)
   - [HTTP Methods — GET](#62-http-methods--get)
   - [HTTP Status Codes](#63-http-status-codes)
7. [JSON — JavaScript Object Notation](#7-json--javascript-object-notation)
   - [What JSON looks like](#71-what-json-looks-like)
   - [JSON vs a JavaScript object](#72-json-vs-a-javascript-object)
   - [res.json() — parsing the response](#73-resjson--parsing-the-response)
8. [Promises and Asynchronous JavaScript](#8-promises-and-asynchronous-javascript)
   - [Why asynchronous?](#81-why-asynchronous)
   - [What is a Promise?](#82-what-is-a-promise)
   - [Promise states](#83-promise-states)
9. [fetch() — The Web Fetch API](#9-fetch--the-web-fetch-api)
   - [Basic syntax](#91-basic-syntax)
   - [What fetch() returns](#92-what-fetch-returns)
10. [.then() — Chaining Promises](#10-then--chaining-promises)
    - [First .then() — converting Response to JSON](#101-first-then--converting-response-to-json)
    - [Second .then() — using the data](#102-second-then--using-the-data)
    - [Why two .then() calls?](#103-why-two-then-calls)
    - [Arrow functions in .then()](#104-arrow-functions-in-then)
11. [The Full fetch Chain — Line by Line](#11-the-full-fetch-chain--line-by-line)
12. [DOM Updates After the fetch](#12-dom-updates-after-the-fetch)
    - [textContent vs innerHTML](#121-textcontent-vs-innerhtml)
    - [classList.add() after a fetch](#122-classlistadd-after-a-fetch)
13. [CSS — Linear Gradients](#13-css--linear-gradients)
    - [linear-gradient syntax](#131-linear-gradient-syntax)
    - [Vendor prefixes — -webkit-](#132-vendor-prefixes---webkit-)
    - [Gradient fallback colour](#133-gradient-fallback-colour)
    - [The .fun class — state change via CSS](#134-the-fun-class--state-change-via-css)
    - [background-repeat: no-repeat](#135-background-repeat-no-repeat)
14. [CSS Concepts Reinforced](#14-css-concepts-reinforced)
    - [height: 100vh on body](#141-height-100vh-on-body)
    - [Flexbox column centering](#142-flexbox-column-centering)
    - [border-radius: 50% on button](#143-border-radius-50-on-button)
    - [outline: none on button](#144-outline-none-on-button)
15. [HTML Structure Recap](#15-html-structure-recap)
16. [How the App Flow Works](#16-how-the-app-flow-works)
17. [How to Run](#17-how-to-run)
18. [Course Reference](#18-course-reference)

---

# 1. Project Overview

**BoredBot** is a single-page web app with three elements: a title, a subtitle, and a circular red button. When the button is clicked:

1. A `fetch()` call is made to the **Bored API** (`https://apis.scrimba.com/bored/api/activity`)
2. The API responds with a JSON object containing a random activity suggestion
3. The `data.activity` string replaces the subtitle text in the DOM
4. The page's background gradient changes from grey-to-dark to orange-to-red via a CSS class toggle
5. The title changes from "🤖 BoredBot 🤖" to "🦾 HappyBot 🦿"

The entire JavaScript is 11 lines — but those 11 lines introduce the entire `fetch()` → Promise chain pattern that every subsequent API project in this module builds on.

---

# 2. Project Structure

```
07. APIs and Async JavaScript/
│
└── 01. Intro to APIs/
    ├── index.html    → Minimal page: h1, h4, button, script tag
    ├── index.css     → Gradient background, centred flex layout, circular button
    ├── index.js      → fetch() call, .then() chain, DOM updates
    └── notes.md      → Topics list: Servers/Clients, Request/Response, APIs, JSON, fetch
```

No images, no modules, no build step. The entire project is a single HTML page that communicates with an external API at runtime.

---

# 3. What's New vs Previous Projects

This project introduces an entirely new category of JavaScript concept — **asynchronous network communication**. Nothing from this list appeared in the Essential JavaScript or Responsive Design modules.

## New JavaScript Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `fetch(url)` | `fetch("https://apis.scrimba.com/bored/api/activity")` | Sends an HTTP GET request to a URL; returns a Promise |
| `Promise` | Returned by `fetch()` | An object representing an eventual value — the API response |
| `.then(callback)` | Two chained `.then()` calls | Registers a function to run when the Promise resolves |
| Arrow function in `.then()` | `res => res.json()`, `data => { ... }` | Concise callback syntax inside Promise chains |
| `res.json()` | First `.then()` | Parses the HTTP `Response` body as JSON; returns another Promise |
| `data.activity` | Second `.then()` | Accesses a specific property of the parsed JSON object |
| REST API request | `fetch("https://apis.scrimba.com/bored/api/activity")` | GET request to a public REST endpoint |
| JSON response | `{ "activity": "...", "type": "...", ... }` | Data format returned by the API |
| Asynchronous execution | The entire `fetch` chain | Code continues running while waiting for the network response |

## New CSS Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `linear-gradient(direction, color1, color2)` | `body` background, `.fun` background | Creates a smooth colour transition between two colours |
| `-webkit-linear-gradient` | Same rules | Vendor-prefixed version for older Chrome/Safari |
| Fallback `background-color` before gradient | `background: #bdc3c7` then `background: linear-gradient(...)` | Solid colour shown if gradient is unsupported |
| `background-repeat: no-repeat` | `body` | Prevents the gradient from tiling |
| `.fun` class — entire background swap | `document.body.classList.add("fun")` | CSS class added by JavaScript changes the entire page's colour scheme |

## Concepts Carried Over from Previous Modules ↩

| Concept | Used Again In |
|---------|--------------|
| `document.getElementById()` | Selecting `#title`, `#idea`, `#bored-button` |
| `.addEventListener('click', fn)` | Button click handler |
| `.textContent` | Updating `h1` and `h4` text |
| `classList.add()` | Adding `.fun` to `document.body` |
| `display: flex; flex-direction: column` | Body centring layout |
| `align-items: center` | Horizontal centring in column flex |
| `height: 100vh` | Full-screen body |
| `border-radius: 50%` | Circular button |
| `cursor: pointer` | Button cursor |
| Google Fonts CDN | Oxygen font |

---

# 4. What is an API?

## 4.1 Definition

**API** stands for **Application Programming Interface**. An API is a defined set of rules that allows one piece of software to communicate with another — a contract that specifies what requests can be made, in what format, and what responses to expect.

> Think of an API as a waiter in a restaurant. You (the client) don't go into the kitchen (the server) yourself — you tell the waiter (the API) what you want. The waiter takes your order to the kitchen and brings back the result. You never need to know how the kitchen works internally.

APIs exist in many contexts:
- **Browser APIs** — `document.getElementById()`, `fetch()`, `localStorage` — built into the browser
- **Web APIs / HTTP APIs** — services accessed over the internet via URLs (this project)
- **Library APIs** — the functions a library exposes (e.g. React's `useState`)
- **OS APIs** — how programs talk to the operating system

## 4.2 Web APIs specifically

A **web API** (sometimes called a REST API or HTTP API) is a service accessible at a URL. You send an HTTP request to the URL, and the server sends back data — usually in JSON format.

Examples:
- `https://apis.scrimba.com/bored/api/activity` → random activity suggestion
- `https://api.thedogapi.com/v1/images/search` → random dog image URL
- `https://api.openweathermap.org/data/2.5/weather?q=London` → London weather data

All of these work the same way: send a GET request to the URL, receive JSON data.

## 4.3 The Bored API

The Bored API (`https://apis.scrimba.com/bored/api/activity`) is a simple, free, no-authentication API that returns a random activity to do when you're bored. The Scrimba proxy URL (`apis.scrimba.com`) wraps the original Bored API to ensure it works reliably in course exercises.

A typical response looks like:
```json
{
  "activity": "Learn Express.js",
  "type": "education",
  "participants": 1,
  "price": 0.1,
  "link": "https://expressjs.com/",
  "key": "3943506",
  "accessibility": 0.25
}
```

This project uses only `data.activity` — the text description of the suggested activity.

---

# 5. Clients and Servers

## 5.1 The client

The **client** is any device or program that makes a request and consumes the response. In this project, the client is the **web browser** running `index.html`. When `fetch()` is called, the browser is acting as the client — it sends an HTTP request on behalf of the JavaScript code.

## 5.2 The server

The **server** is the computer that receives the request, processes it, and sends back a response. In this project, the server is **Scrimba's API server** at `apis.scrimba.com`. It:
1. Receives the GET request
2. Picks a random activity from its database
3. Formats the data as JSON
4. Sends the JSON back as an HTTP response

The server is always running and listening — it does not know or care about the client's code, browser, or operating system.

## 5.3 The client–server model

```
Browser (client)                    apis.scrimba.com (server)
      │                                       │
      │  ── HTTP GET Request ──────────────►  │
      │     URL: /bored/api/activity          │
      │                                       │  ← processes request
      │                                       │  ← picks random activity
      │  ◄── HTTP Response ────────────────── │
      │     Status: 200 OK                    │
      │     Body: { "activity": "..." }       │
      │                                       │
   .then() fires                              │
   DOM updated                                │
```

This cycle — **request** from client, **response** from server — is the foundation of the entire web. Every time you load a webpage, fetch data, or submit a form, this cycle occurs.

---

# 6. The Request–Response Cycle

## 6.1 What happens when `fetch()` is called

```javascript
fetch("https://apis.scrimba.com/bored/api/activity")
```

1. The browser constructs an **HTTP GET request** to the specified URL
2. The request travels over the network to `apis.scrimba.com`
3. The server receives it, generates a random activity, and constructs an HTTP response
4. The response travels back over the network to the browser
5. The browser hands the `Response` object to the first `.then()` callback

This entire process takes anywhere from 50ms to several seconds depending on network conditions. JavaScript does not pause and wait — this is what makes it **asynchronous**.

## 6.2 HTTP Methods — GET

HTTP defines several **methods** (also called verbs) that describe what type of operation the client is requesting:

| Method | Purpose | Body? |
|--------|---------|-------|
| **GET** | Retrieve data — read only | No |
| POST | Create new data | Yes |
| PUT / PATCH | Update existing data | Yes |
| DELETE | Delete data | No |

`fetch()` with no second argument sends a **GET request** by default — the correct method for reading data from the Bored API. Later API projects in this module will use POST with `fetch()` options.

## 6.3 HTTP Status Codes

Every HTTP response includes a **status code** — a 3-digit number indicating the outcome:

| Range | Category | Common codes |
|-------|---------|-------------|
| 2xx | Success | `200 OK`, `201 Created` |
| 3xx | Redirect | `301 Moved Permanently` |
| 4xx | Client error | `400 Bad Request`, `401 Unauthorized`, `404 Not Found` |
| 5xx | Server error | `500 Internal Server Error` |

The Bored API returns `200 OK` on success. This project does not check the status code — in later projects, `res.ok` is used to handle errors. The `Response` object from `fetch()` has a `.status` property (`res.status`) and `.ok` boolean (`res.ok` — `true` for 200–299).

---

# 7. JSON — JavaScript Object Notation

## 7.1 What JSON looks like

**JSON** (JavaScript Object Notation) is the standard data format for web APIs. It looks like a JavaScript object literal but is actually a string:

```json
{
  "activity": "Learn Express.js",
  "type": "education",
  "participants": 1,
  "price": 0.1,
  "link": "https://expressjs.com/",
  "key": "3943506",
  "accessibility": 0.25
}
```

JSON rules (differences from JavaScript objects):
- All **keys must be double-quoted strings** — `"activity"`, not `activity`
- **String values** must use double quotes — `"education"`, not `'education'`
- **No trailing commas** allowed
- **No functions** — JSON is pure data, no methods
- **No `undefined`** — only `null`, strings, numbers, booleans, arrays, objects

## 7.2 JSON vs a JavaScript object

| Feature | JSON | JavaScript Object |
|---------|------|------------------|
| Type | String | Object (in memory) |
| Keys | Must be double-quoted | Can be unquoted |
| Values | String, number, boolean, null, array, object | Any valid JS value |
| Functions | Not allowed | Allowed |
| Trailing commas | Not allowed | Allowed (ES5+) |
| Purpose | Data transfer format | In-memory data structure |

The HTTP response body is raw text — even though it looks like an object, it arrives as a string. `res.json()` converts it from a string into an actual JavaScript object you can work with.

## 7.3 `res.json()` — parsing the response

```javascript
.then(res => res.json())
```

`res.json()` is a method on the `Response` object returned by `fetch()`. It reads the response body as text and parses it as JSON — converting the raw string into a usable JavaScript object. It returns a **new Promise** that resolves with the parsed object.

This is why two `.then()` calls are needed — `fetch()` gives you a `Response` (first Promise), and `res.json()` gives you the data (second Promise).

```javascript
// What res.json() does internally:
const text = await res.text()          // reads the body string
const data = JSON.parse(text)          // converts string → JS object
return data                            // resolves the new Promise
```

---

# 8. Promises and Asynchronous JavaScript

## 8.1 Why asynchronous?

JavaScript runs on a **single thread** — it can only do one thing at a time. If a network request took 2 seconds and JavaScript blocked (paused) while waiting, the entire browser would freeze for 2 seconds: no scrolling, no clicks, no animations.

**Asynchronous** means JavaScript starts the operation, moves on to other code, and comes back to handle the result when it arrives — without blocking.

```javascript
console.log("1 — before fetch")

fetch("https://apis.scrimba.com/bored/api/activity")
    .then(res => res.json())
    .then(data => {
        console.log("3 — data arrived:", data.activity)
    })

console.log("2 — after fetch, before data arrives")

// Output order:
// 1 — before fetch
// 2 — after fetch, before data arrives
// 3 — data arrived: Learn Express.js
```

Lines 1 and 2 print immediately. Line 3 prints when the API responds — potentially hundreds of milliseconds later. The code between fetch and the `.then()` callbacks runs **concurrently**, not sequentially.

## 8.2 What is a Promise?

A **Promise** is a JavaScript object that represents the **eventual result** of an asynchronous operation. It is a placeholder — a "I promise I'll give you a value, but not yet."

```javascript
const promise = fetch("https://apis.scrimba.com/bored/api/activity")
// promise is a Promise object — the data is not here yet
// .then() registers a callback to run when it arrives
```

## 8.3 Promise states

A Promise is always in one of three states:

| State | Meaning | Your callback runs? |
|-------|---------|-------------------|
| **Pending** | The async operation is in progress | No |
| **Fulfilled** | The operation completed successfully | Yes — `.then()` fires |
| **Rejected** | The operation failed (network error, etc.) | No — `.catch()` would fire |

`fetch()` Promises become rejected only on network failures (no internet, DNS error). A 404 or 500 response still **fulfils** the Promise — `res.ok` must be checked manually to detect HTTP errors.

---

# 9. `fetch()` — The Web Fetch API

## 9.1 Basic syntax

```javascript
fetch("https://apis.scrimba.com/bored/api/activity")
    .then(res => res.json())
    .then(data => {
        // use data here
    })
```

`fetch(url)` takes a URL string and returns a Promise. By default it sends an HTTP GET request. The URL must be a complete, valid URL including the protocol (`https://`).

## 9.2 What `fetch()` returns

`fetch()` returns a Promise that resolves to a **`Response` object** — not the data directly. The `Response` object has:

| Property / Method | Type | Description |
|------------------|------|-------------|
| `res.ok` | `boolean` | `true` if status is 200–299 |
| `res.status` | `number` | HTTP status code (e.g. 200, 404) |
| `res.statusText` | `string` | HTTP status text (e.g. "OK", "Not Found") |
| `res.json()` | `Promise` | Parses body as JSON — returns a new Promise |
| `res.text()` | `Promise` | Returns body as a plain string |
| `res.blob()` | `Promise` | Returns body as a Blob (for binary data like images) |

The `Response` body can only be read **once** — calling `res.json()` or `res.text()` consumes the stream.

---

# 10. `.then()` — Chaining Promises

## 10.1 First `.then()` — converting `Response` to JSON

```javascript
fetch("https://apis.scrimba.com/bored/api/activity")
    .then(res => res.json())
```

The first `.then()` receives the `Response` object (`res`). `res.json()` starts reading and parsing the response body — this is itself asynchronous (the body might arrive in chunks). It returns a new Promise that resolves with the parsed JavaScript object.

`.then()` always returns a new Promise — if the callback returns a value, the new Promise resolves with that value; if the callback returns a Promise, the new Promise adopts its state.

## 10.2 Second `.then()` — using the data

```javascript
    .then(data => {
        document.getElementById("idea").textContent = data.activity
        document.body.classList.add("fun")
        document.getElementById("title").textContent = "🦾 HappyBot🦿"
    })
```

The second `.then()` receives the **fully parsed JavaScript object** (`data`). At this point `data` is a plain JS object — you access its properties with dot notation exactly as you would any object.

| Expression | Type | Value |
|-----------|------|-------|
| `data` | Object | `{ activity: "...", type: "...", ... }` |
| `data.activity` | String | `"Learn Express.js"` |
| `data.type` | String | `"education"` |
| `data.participants` | Number | `1` |

## 10.3 Why two `.then()` calls?

```
fetch(url)         → Promise<Response>
  .then(res =>
    res.json()     → Promise<Object>     ← this is why a second .then() is needed
  )
  .then(data => {
    // data is the Object
  })
```

`fetch()` gives you the HTTP response (headers + metadata). The body is separate and also asynchronous. `res.json()` is the step that reads and parses the body — it too returns a Promise. Because `.then()` automatically unwraps a returned Promise, chaining a second `.then()` waits for `res.json()` to finish before firing.

You cannot do `fetch(url).then(res => res.json().activity)` because `res.json()` is a Promise — `.activity` on a Promise is `undefined`.

## 10.4 Arrow functions in `.then()`

```javascript
.then(res => res.json())                 // implicit return — single expression
.then(data => {                          // explicit return not needed — void callback
    document.getElementById("idea").textContent = data.activity
})
```

Arrow functions (`=>`) are the standard syntax inside `.then()` because they are concise and do not create their own `this` binding (relevant in class-based code). The first arrow function uses an **implicit return** — a single expression with no curly braces returns its value automatically. The second uses curly braces and runs multiple statements (no return value needed).

---

# 11. The Full `fetch` Chain — Line by Line

```javascript
function getActivityIdea() {                                         // line 1
    fetch("https://apis.scrimba.com/bored/api/activity")            // line 2
        .then(res => res.json())                                     // line 3
        .then(data => {                                              // line 4
            document.getElementById("idea").textContent = data.activity  // line 5
            document.body.classList.add("fun")                      // line 6
            document.getElementById("title").textContent = "🦾 HappyBot🦿" // line 7
        })                                                           // line 8
}                                                                    // line 9
                                                                     // line 10
document.getElementById("bored-button").addEventListener("click", getActivityIdea) // line 11
```

| Line | What it does |
|------|-------------|
| 1 | Declares `getActivityIdea` as a named function |
| 2 | Calls `fetch()` with the Bored API URL — sends an HTTP GET request; returns a Promise |
| 3 | First `.then()`: when the `Response` arrives, call `res.json()` to parse the body — returns a new Promise |
| 4 | Second `.then()`: when the parsed JSON object (`data`) is ready, run this callback |
| 5 | Updates the `<h4 id="idea">` text with the activity string from the JSON |
| 6 | Adds the `.fun` CSS class to `<body>` — triggers the background gradient swap |
| 7 | Updates the `<h1 id="title">` from BoredBot to HappyBot |
| 8–9 | Closes the `.then()` and function |
| 11 | Attaches `getActivityIdea` as the click handler on the button — no `()` means we pass the function reference, not call it immediately |

---

# 12. DOM Updates After the `fetch`

## 12.1 `textContent` vs `innerHTML`

```javascript
document.getElementById("idea").textContent = data.activity
document.getElementById("title").textContent = "🦾 HappyBot🦿"
```

`textContent` sets the text content of an element, treating the value as **plain text** — any HTML tags in the string are escaped and displayed literally. `innerHTML` would parse the string as HTML.

| Property | Value treated as | Security |
|----------|-----------------|---------|
| `textContent` | Plain text | ✅ Safe — no XSS risk |
| `innerHTML` | HTML markup | ⚠️ Risky if value comes from user input or an API |

`data.activity` comes from an external API — using `textContent` instead of `innerHTML` is the correct defensive choice. If the API ever returned a string containing `<script>` tags, `textContent` would display it literally while `innerHTML` would execute it.

## 12.2 `classList.add()` after a `fetch`

```javascript
document.body.classList.add("fun")
```

This line runs inside the second `.then()` — after the API responds. It adds the `.fun` CSS class to `<body>`, which overrides the base grey gradient with the orange-red gradient. This demonstrates an important pattern: **CSS classes can be toggled by JavaScript in response to async events**, not just user interactions.

The visual state of the page changes as a direct consequence of the API response — a data-driven UI update.

---

# 13. CSS — Linear Gradients

## 13.1 `linear-gradient` syntax

```css
body {
    background: linear-gradient(to top, #2c3e50, #bdc3c7);
}
```

`linear-gradient(direction, color-stop-1, color-stop-2)` creates a gradient that transitions smoothly between two (or more) colours in a straight line.

| Part | Value | Meaning |
|------|-------|---------|
| `direction` | `to top` | Gradient flows from bottom to top |
| `color-stop-1` | `#2c3e50` | Starting colour (at the bottom) — dark slate |
| `color-stop-2` | `#bdc3c7` | Ending colour (at the top) — light grey |

Direction options:

| Value | Direction |
|-------|-----------|
| `to top` | Bottom → Top |
| `to bottom` | Top → Bottom (default) |
| `to left` | Right → Left |
| `to right` | Left → Right |
| `45deg` | Diagonal at 45° |

The `.fun` class uses `to left`:
```css
.fun {
    background: linear-gradient(to left, #f7b733, #fc4a1a);
}
```
Orange (`#f7b733`) on the right, red (`#fc4a1a`) on the left.

## 13.2 Vendor prefixes — `-webkit-`

```css
background: #bdc3c7;                                              /* fallback */
background: -webkit-linear-gradient(to top, #2c3e50, #bdc3c7);   /* old webkit */
background: linear-gradient(to top, #2c3e50, #bdc3c7);           /* standard */
```

`-webkit-` is a **vendor prefix** — an experimental or browser-specific implementation of a CSS feature before it was standardised. During CSS3's development, Chrome and Safari (both WebKit/Blink engines) required `-webkit-linear-gradient` before the standard `linear-gradient` was finalised.

The three declarations are ordered from **least capable to most capable**:
1. Solid colour fallback — for browsers that understand neither
2. `-webkit-linear-gradient` — for old Chrome/Safari
3. `linear-gradient` — for modern browsers (this one wins in all current browsers, overriding the others)

Today (2025), `-webkit-` prefixes for `linear-gradient` are no longer needed — all modern browsers support the standard version. They remain in this code because it was generated by [uigradients.com](https://uigradients.com), which includes them for maximum backwards compatibility.

## 13.3 Gradient fallback colour

```css
background: #bdc3c7;                              /* ← line 1 */
background: -webkit-linear-gradient(...);         /* ← line 2 */
background: linear-gradient(...);                 /* ← line 3 */
```

Line 1 sets a solid `#bdc3c7` (light grey) background. If the browser supports gradients, lines 2 or 3 override it. If not (extremely old browsers), the solid colour remains. This is the **progressive enhancement** pattern applied to CSS.

## 13.4 The `.fun` class — state change via CSS

```css
.fun {
    background: #fc4a1a;
    background: -webkit-linear-gradient(to left, #f7b733, #fc4a1a);
    background: linear-gradient(to left, #f7b733, #fc4a1a);
}
```

`.fun` overrides the `body`'s background declarations when the class is present. Because CSS specificity is equal (both are a single class or element selector applied to `body`), **cascade order** determines the winner — the later-defined rule wins. `.fun` is defined after `body` in the stylesheet, so it overrides when active.

This is the **utility class state pattern**: the element has a default appearance; a class added by JavaScript switches it to a new visual state. No inline styles are needed.

## 13.5 `background-repeat: no-repeat`

```css
background-repeat: no-repeat;
```

CSS gradients are technically treated as images by the browser — and images tile (repeat) by default. `background-repeat: no-repeat` prevents the gradient from tiling. Since the body is `height: 100vh`, the gradient fills the entire viewport anyway and tiling would not normally be visible — but this is included as an explicit safeguard.

---

# 14. CSS Concepts Reinforced

## 14.1 `height: 100vh` on `body`

```css
body {
    height: 100vh;
}
```

`100vh` makes the body fill the entire viewport height. The gradient covers the full screen regardless of content height. This was introduced in the Build a Product Page project — used identically here.

## 14.2 Flexbox column centering

```css
body {
    display: flex;
    flex-direction: column;
    align-items: center;
}
```

`flex-direction: column` stacks children vertically. `align-items: center` centres them horizontally (on the cross axis, which is horizontal in column direction). The three elements — `h1`, `h4`, `button` — stack in the centre of the page.

No `justify-content` is set — items are packed at the top of the column. Adding `justify-content: center` would vertically centre them too.

## 14.3 `border-radius: 50%` on button

```css
button {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    background-color: red;
    border: 1px solid darkred;
}
```

The button has equal `height` and `width` (`100px × 100px`), so `border-radius: 50%` creates a perfect circle — the same technique used for profile pictures in Twimba and the avatar in the Product Page. A circular button is a recognisable UI pattern for a single primary action.

## 14.4 `outline: none` on button

```css
button {
    outline: none;
}
```

This removes the default browser focus ring from the button. As noted in the Product Page README, removing `outline` without a replacement is an accessibility concern — keyboard users lose their focus indicator. In this project, no replacement focus style is provided. In production code, a custom `:focus` style should always replace `outline: none`.

---

# 15. HTML Structure Recap

```html
<html>
  <head>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300&display=swap"
          rel="stylesheet">
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
    <h1 id="title">🤖 BoredBot 🤖</h1>
    <h4 id="idea">Find something to do</h4>
    <button id="bored-button"></button>
    <script src="index.js"></script>
  </body>
</html>
```

Notable points:

| Observation | Explanation |
|-------------|------------|
| No `<!DOCTYPE html>` | Missing but best practice; browser falls back to standards mode in modern browsers |
| No `<meta name="viewport">` | Missing — would be needed for proper mobile rendering |
| `<script>` at end of `<body>` | Ensures DOM is fully parsed before JS runs — same result as `defer` |
| `<button>` with no text | The button has no visible label — relies entirely on CSS (circle shape) for its identity; an `aria-label` is missing |
| `id` on every interactive element | `id="title"`, `id="idea"`, `id="bored-button"` — required for `document.getElementById()` |
| `font-weight: 300` for Oxygen | Only the light weight is loaded — keeps the font request minimal |

---

# 16. How the App Flow Works

```
Page loads
    └── index.js executes
            └── document.getElementById("bored-button")
                    .addEventListener("click", getActivityIdea)
                            → button click wired up, waiting

User clicks the red circle button
    └── click event fires → getActivityIdea() called
            └── fetch("https://apis.scrimba.com/bored/api/activity")
                    → HTTP GET request sent to apis.scrimba.com
                    → JavaScript continues (non-blocking)
                    → Promise is pending

Network response arrives (50ms–2000ms later)
    └── First .then(res => res.json())
            → res is the Response object (status 200, headers, body stream)
            → res.json() starts reading and parsing the body
            → returns a new Promise (still pending)

JSON parsing completes
    └── Second .then(data => { ... })
            → data = { activity: "Learn Express.js", type: "education", ... }
            │
            ├── document.getElementById("idea").textContent = data.activity
            │       → <h4> text changes: "Find something to do" → "Learn Express.js"
            │
            ├── document.body.classList.add("fun")
            │       → .fun class applied to body
            │       → CSS overrides gradient: grey-blue → orange-red
            │       → visual transformation is immediate
            │
            └── document.getElementById("title").textContent = "🦾 HappyBot🦿"
                    → <h1> text changes: "🤖 BoredBot 🤖" → "🦾 HappyBot🦿"
```

---

# 17. How to Run

No build step required. This project uses a plain `<script src="index.js">` tag (not `type="module"`), so it can be opened directly with `file://`:

1. Clone the repository:
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder:
   ```bash
   cd "07. APIs and Async JavaScript/01. Intro to APIs"
   ```

3. Open `index.html` directly in your browser — double-click it, or drag it into a browser tab.

> Unlike the Meme App, X Clone, and Twimba which used `type="module"` ES Modules, this project uses a plain script tag — there is no `import`/`export`, so the `file://` CORS restriction does not apply.

**Things to try:**
- Open DevTools → **Network** tab, click the button — watch the request to `apis.scrimba.com` appear; inspect its **Response** to see the raw JSON
- In the Network tab → click the request → **Preview** tab — see the parsed JSON object
- Open DevTools → **Console**, paste and run `fetch("https://apis.scrimba.com/bored/api/activity").then(r => r.json()).then(d => console.log(d))` — see the full data object
- Add a `console.log("before fetch")` before the `fetch()` and `console.log("after fetch")` after it — observe that "after fetch" prints before the `.then()` data, confirming async execution
- Try opening the URL directly in a new browser tab: `https://apis.scrimba.com/bored/api/activity` — you'll see the raw JSON response
- In DevTools → **Network** tab, throttle the connection to "Slow 3G" and click the button again — notice the delay before the DOM updates, making the async behaviour visible

---

# 18. Course Reference

| Item | Detail |
|------|--------|
| Platform | [Scrimba](https://scrimba.com) |
| Course | Fullstack Web Development Path |
| Module | APIs and Async JavaScript |
| Project number | 01 of the module |
| Key new concepts | What an API is · Clients and Servers · Request–Response cycle · HTTP GET · JSON · `fetch()` · `Promise` · `.then()` · `res.json()` · Asynchronous JavaScript · `linear-gradient` |
| Next project | [02. URLs and REST](../02.%20URLs%20and%20REST/) |
| Bored API docs | [https://www.boredapi.com/documentation](https://www.boredapi.com/documentation) |
| MDN — fetch | [MDN — fetch()](https://developer.mozilla.org/en-US/docs/Web/API/fetch) |
| MDN — Promise | [MDN — Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) |
| MDN — Response.json() | [MDN — Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Response/json) |
| MDN — linear-gradient | [MDN — linear-gradient()](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient) |

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *`fetch()` is the moment the browser stops being a passive display engine and becomes an active participant on the internet. Every app that feels "live" — news feeds, weather widgets, social media — is built on this exact pattern: send a request, wait for the response, update the DOM. Once you understand the Promise chain, you understand the heartbeat of modern web development.*
