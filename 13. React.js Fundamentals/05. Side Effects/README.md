# Meme Generator — Side Effects

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Hooks](https://img.shields.io/badge/Hooks-useState%20%7C%20useEffect-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![fetch](https://img.shields.io/badge/fetch-REST%20API-teal?style=flat-square)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Karla-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A meme generator that fetches a live catalogue of meme templates from the Imgflip API and lets users overlay custom top/bottom text — the **Meme Generator** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every side effects concept introduced in this module, comparing what is new here against the React State project (13/04) — specifically the addition of `useEffect`, data fetching inside React, controlled inputs, the dependencies array, and the relationship between state and effects.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is a "Side Effect"?](#3-what-is-a-side-effect)
4. [What's New vs React State](#4-whats-new-vs-react-state)
5. [`useEffect` — Syntax and Behaviour](#5-useeffect--syntax-and-behaviour)
   - [Basic Syntax](#51-basic-syntax)
   - [When Does the Effect Run?](#52-when-does-the-effect-run)
   - [The Dependencies Array](#53-the-dependencies-array)
   - [Empty Dependencies Array `[]`](#54-empty-dependencies-array-)
6. [Fetching Data in React](#6-fetching-data-in-react)
   - [Why `fetch` Must Live Inside `useEffect`](#61-why-fetch-must-live-inside-useeffect)
   - [The Imgflip API Call](#62-the-imgflip-api-call)
   - [Storing API Data in State](#63-storing-api-data-in-state)
7. [State — Two Pieces Working Together](#7-state--two-pieces-working-together)
   - [`meme` State — Object Shape](#71-meme-state--object-shape)
   - [`allMemes` State — The API Cache](#72-allmemes-state--the-api-cache)
8. [Controlled Components](#8-controlled-components)
   - [The `value` + `onChange` Pattern](#81-the-value--onchange-pattern)
   - [Computed Property Names — `[name]`](#82-computed-property-names--name)
9. [Getting a Random Meme — `getMemeImage()`](#9-getting-a-random-meme--getmemeimage)
10. [Functional State Updates — Spread + Override](#10-functional-state-updates--spread--override)
11. [CSS — Meme Text Overlay with `position: absolute`](#11-css--meme-text-overlay-with-position-absolute)
12. [How the Full App Flow Works](#12-how-the-full-app-flow-works)
13. [HTML Structure Recap — React Document Tree](#13-html-structure-recap--react-document-tree)
14. [How to Run](#14-how-to-run)
15. [Course Reference](#15-course-reference)

---

# 1. Project Overview

**Meme Generator** is a React application that fetches 100 popular meme image templates from the Imgflip public API on load, stores them in state, and lets the user generate a random meme image with a button click. Two controlled text inputs allow the user to type custom top and bottom text captions, which are overlaid on the meme image using CSS absolute positioning — mimicking the classic meme format.

The app includes:

* A **`<Header>`** component displaying a troll-face icon and the title "Meme Generator" on a purple gradient banner
* A **`<Main>`** component containing all the interactive logic — two state variables, a `useEffect` for the API fetch, and three handler functions
* A **`useEffect`** hook that fires once after the initial render, fetches `https://api.imgflip.com/get_memes`, and stores all 100 meme objects in the `allMemes` state array
* A **`meme`** state object holding three fields: `topText`, `bottomText`, and `imageUrl` — all of which drive the UI
* Two **controlled `<input>`** elements whose `value` props are bound to `meme.topText` and `meme.bottomText`, and whose `onChange` handlers update the `meme` state on every keystroke
* A **"Get a new meme image"** button that picks a random meme URL from `allMemes` and updates `meme.imageUrl` while preserving the text fields
* A **meme display area** that renders the image behind two absolutely-positioned `<span>` elements for the top and bottom captions

The goal of this module is not just to build a meme tool — it is to understand when React's render cycle runs, what a "side effect" is in the context of a UI component, why `useEffect` is required to safely perform operations like API calls, and how the dependencies array controls when an effect re-runs.

---

# 2. Project Structure

```
13. React.js Fundamentals/
│
└── 05. Side Effects/
    ├── index.html              → HTML shell: <div id="root">, Google Fonts (Karla)
    ├── index.jsx               → Entry point — createRoot + root.render(<App />)
    ├── index.css               → Global styles: header gradient, form grid, meme overlay
    ├── App.jsx                 → Root component — composes <Header /> and <Main />
    ├── components/
    │   ├── Header.jsx          → Purple gradient header with troll-face icon + title
    │   └── Main.jsx            → All logic: useState, useEffect, fetch, handlers, JSX form
    └── images/
        └── troll-face.png      → Troll face icon imported as a module in Header.jsx
```

---

# 3. What is a "Side Effect"?

In React, a **side effect** is any operation that interacts with something **outside the React component's render cycle**. A pure component function should take props/state as input and return JSX as output — nothing else. Side effects break this contract.

| Category | Examples |
|----------|---------|
| **Data fetching** | `fetch()`, `XMLHttpRequest`, GraphQL calls |
| **Subscriptions** | WebSocket connections, event listeners on `window`, timers |
| **Direct DOM manipulation** | `document.title = ...`, `element.scrollIntoView()`, `ref` operations |
| **Logging** | `console.log` based on render cycles |
| **Local storage** | `localStorage.getItem()` / `localStorage.setItem()` |

```jsx
// ❌ Side effect directly in render — runs on every render, causes bugs
export default function Main() {
  fetch("https://api.imgflip.com/get_memes")  // ← BAD: runs every render
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes)) // ← triggers re-render → infinite loop
  return <div>...</div>
}

// ✅ Side effect inside useEffect — React controls when it runs
export default function Main() {
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
  }, [])  // ← runs only once, after the first render
  return <div>...</div>
}
```

> React re-runs a component function every time state or props change. Code written directly in the function body executes on **every render**. `useEffect` is React's way of saying: "run this code, but only under conditions I control."

---

# 4. What's New vs React State

## New Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `import { useEffect } from "react"` | `Main.jsx` line 1 | Imports the Effect hook — allows side effects in function components |
| `useEffect(callback, [deps])` | `Main.jsx` line 11 | Registers a side effect — runs the callback after render, controlled by the deps array |
| `[], []` (empty array) | `Main.jsx` line 15 | Tells React: run this effect only once, after the first render |
| `fetch(url)` | `Main.jsx` line 12 | Native browser API — makes an HTTP GET request to the Imgflip API |
| `.then(res => res.json())` | `Main.jsx` line 13 | Parses the response body as JSON — returns a Promise |
| `.then(data => setAllMemes(...))` | `Main.jsx` line 14 | Updates state with the fetched meme array |
| `value={meme.topText}` | `Main.jsx` line 43 | **Controlled input** — React owns the input's displayed value |
| `onChange={handleChange}` | `Main.jsx` line 42 | Fires on every keystroke — updates `meme` state |
| `event.currentTarget` | `Main.jsx` line 27 | Reads the `name` and `value` of the `<input>` that fired the event |
| `[name]: value` | `Main.jsx` line 30 | **Computed property name** — dynamically sets the key in the state object |
| `Math.floor(Math.random() * allMemes.length)` | `Main.jsx` line 18 | Picks a random index into the fetched memes array |
| `import trollFace from "../images/troll-face.png"` | `Header.jsx` line 1 | Imports a static image as a JS module — Vite resolves the path |

## Comparison: React State (13/04) vs Side Effects (13/05)

| Feature | React State | Side Effects |
|---------|------------|-------------|
| Data source | Local — hardcoded or user input | Remote — fetched from Imgflip REST API |
| State shape | Simple strings / arrays | Object (`meme`) + array (`allMemes`) |
| When data loads | N/A | After first render, via `useEffect` |
| `useEffect` | Not used | Core concept — controls the fetch |
| Controlled inputs | Not used | `value` + `onChange` on both text inputs |
| Functional state update | Used | Used — `setMeme(prevMeme => ({ ...prevMeme, ... }))` |

---

# 5. `useEffect` — Syntax and Behaviour

## 5.1 Basic Syntax

```jsx
// Main.jsx
useEffect(() => {
  // effect body — runs after render
  fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
}, [])
//  ↑
//  dependencies array
```

`useEffect` takes two arguments:

| Argument | Type | Role |
|----------|------|------|
| `callback` | `() => void` | The side effect to run — this function executes after the component renders |
| `dependencies` | `Array` (optional) | Controls *when* the effect re-runs — React compares this array between renders |

## 5.2 When Does the Effect Run?

`useEffect` always runs **after** the component renders and the DOM has been updated — never during the render itself. This separation is what makes effects safe: the component renders first (synchronously), then the effect fires (asynchronously).

```
Render cycle with useEffect:

  1. Component function runs → JSX returned → DOM updated
  2. Browser paints the screen
  3. useEffect callback fires
     └── fetch() call made
     └── .then() → setAllMemes(data) → triggers re-render
  4. Component re-renders with new allMemes state
  5. useEffect checks dependencies → [] didn't change → effect does NOT run again
```

## 5.3 The Dependencies Array

The second argument to `useEffect` is the **dependencies array** — it tells React which values to watch. React compares the array between renders using `Object.is` (shallow equality):

| Dependencies | Effect runs when... |
|-------------|-------------------|
| No array (omitted) | After **every** render |
| `[]` (empty array) | After the **first render only** — like `componentDidMount` |
| `[count]` | After the first render **and** whenever `count` changes |
| `[a, b]` | After the first render **and** whenever `a` or `b` changes |

```jsx
// Runs after every render — rarely what you want
useEffect(() => { document.title = `Count: ${count}` })

// Runs once — good for initial data fetches
useEffect(() => { fetch('/api/data').then(...) }, [])

// Runs when 'query' changes — good for search-as-you-type
useEffect(() => { fetch(`/api/search?q=${query}`) }, [query])
```

> If your effect uses a variable from the component scope (state, props, or a local variable), that variable should be listed in the dependencies array. Omitting it creates a stale closure — the effect captures the value from the render it was created in and never sees updates.

## 5.4 Empty Dependencies Array `[]`

```jsx
// Main.jsx
useEffect(() => {
  fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
}, [])   // ← empty array — fetch runs exactly once
```

`[]` means the effect has **no dependencies** — nothing in the component can cause it to re-run. This is the correct pattern for a one-time data fetch on mount: fetch the meme list once when the component first appears, store it in state, and never re-fetch.

```
First render:   useEffect fires → fetch('/get_memes') → setAllMemes(100 memes)
Second render:  useEffect checks [] → unchanged → does NOT fire again
Third render:   Same — never fires again
```

---

# 6. Fetching Data in React

## 6.1 Why `fetch` Must Live Inside `useEffect`

```jsx
// ❌ Directly in the component body — WRONG
export default function Main() {
  fetch("https://api.imgflip.com/get_memes")        // runs on every render
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))      // setAllMemes triggers a render
  // → render → fetch → setAllMemes → render → fetch → setAllMemes → ♾️ infinite loop
}

// ✅ Inside useEffect with [] — CORRECT
export default function Main() {
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")       // runs once after first render
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))    // setAllMemes → re-render, but
  }, [])                                              // [] stops the effect re-running
}
```

The core problem is that calling `setState` inside a component's render function causes an immediate re-render, which calls the function again, which calls `setState` again — an infinite loop. `useEffect` breaks this cycle by running **after** the render, outside the synchronous render path.

## 6.2 The Imgflip API Call

```jsx
// Main.jsx — the full fetch chain
fetch("https://api.imgflip.com/get_memes")
  .then(res => res.json())
  .then(data => setAllMemes(data.data.memes))
```

The Imgflip public API returns a JSON object with this shape:

```json
{
  "success": true,
  "data": {
    "memes": [
      {
        "id": "61579",
        "name": "One Does Not Simply",
        "url": "https://i.imgflip.com/1bij.jpg",
        "width": 568,
        "height": 335,
        "box_count": 2
      },
      ...99 more
    ]
  }
}
```

The chain navigates: `data` → `.data` → `.memes` → array of 100 meme objects. `setAllMemes(data.data.memes)` stores the entire array in state.

| `.then()` step | Input | Output |
|----------------|-------|--------|
| `res => res.json()` | Raw `Response` object | Promise resolving to the parsed JSON object |
| `data => setAllMemes(data.data.memes)` | Parsed JSON object | Updates `allMemes` state with the 100-item array |

> `fetch()` returns a Promise — it does not block the render. The component renders immediately with `allMemes = []`, then the fetch resolves and `setAllMemes` triggers a re-render with the populated array. This is why loading states matter in real apps — the UI must handle the moment between first render and data arrival.

## 6.3 Storing API Data in State

```jsx
const [allMemes, setAllMemes] = useState([])
```

`allMemes` starts as an empty array — its initial value before the fetch completes. Once the fetch resolves, `setAllMemes(data.data.memes)` replaces it with the 100 meme objects. The component re-renders, and `getMemeImage()` can now safely access `allMemes[randomIndex].url`.

| Render | `allMemes` value | `getMemeImage()` behaviour |
|--------|-----------------|--------------------------|
| 1st (before fetch) | `[]` | Would throw — `allMemes[random]` is `undefined` |
| 2nd (after fetch) | `[{id, name, url, ...}, ...]` × 100 | Works correctly — picks a random URL |

---

# 7. State — Two Pieces Working Together

## 7.1 `meme` State — Object Shape

```jsx
const [meme, setMeme] = useState({
  topText: "One does not simply",
  bottomText: "Walk into Mordor",
  imageUrl: "http://i.imgflip.com/1bij.jpg"
})
```

`meme` is a **state object** — a single `useState` call holding three related fields. Grouping them into one object makes sense because they all describe one thing: the current meme being displayed. The initial values pre-populate the inputs and display a default meme image so the UI is never empty on first load.

| Field | Type | Initial value | Drives |
|-------|------|--------------|--------|
| `topText` | `string` | `"One does not simply"` | Top `<input>` value + top `<span>` overlay |
| `bottomText` | `string` | `"Walk into Mordor"` | Bottom `<input>` value + bottom `<span>` overlay |
| `imageUrl` | `string` | `"http://i.imgflip.com/1bij.jpg"` | `<img src>` in the meme display |

## 7.2 `allMemes` State — The API Cache

```jsx
const [allMemes, setAllMemes] = useState([])
```

`allMemes` serves as an in-memory cache of all 100 meme templates fetched from the API. It is populated once (via `useEffect`) and then read repeatedly (every time the user clicks "Get a new meme image"). It is never displayed directly in the JSX — it is purely a data store that `getMemeImage()` draws from.

```
allMemes (state)          getMemeImage() reads from here
┌──────────────────┐      ↓
│ [0] { url: "..." }│ ──► Math.random() → index → allMemes[index].url
│ [1] { url: "..." }│     → setMeme(prev => ({ ...prev, imageUrl: newUrl }))
│ [2] { url: "..." }│
│ ...99 more       │
└──────────────────┘
```

---

# 8. Controlled Components

## 8.1 The `value` + `onChange` Pattern

```jsx
// Main.jsx — controlled input example
<input
  type="text"
  placeholder="One does not simply"
  name="topText"
  onChange={handleChange}
  value={meme.topText}
/>
```

A **controlled component** is an input whose `value` is bound to React state. React becomes the "single source of truth" for what the input displays. Without `value={meme.topText}`, the input would manage its own internal state (an **uncontrolled component**) — React would have no way to read what the user typed.

```
User types "Hello"
     │
     ▼
onChange fires → handleChange(event)
     │
     ▼
setMeme({ ...prev, topText: "Hello" })
     │
     ▼
React re-renders → input.value = meme.topText = "Hello"
     │
     ▼
<span class="top">Hello</span>  ← overlay updates simultaneously
```

> The `value` prop and `onChange` handler **must always appear together** on a controlled input. `value` without `onChange` creates a read-only input that the user cannot type into. React will warn about this in the console.

## 8.2 Computed Property Names — `[name]`

```jsx
// Main.jsx
function handleChange(event) {
  const { value, name } = event.currentTarget
  setMeme(prevMeme => ({
    ...prevMeme,
    [name]: value   // ← computed property name
  }))
}
```

`[name]` is a **computed property name** — a JavaScript ES6 feature where a variable's value becomes the key in an object literal. When `name` is `"topText"`, `{ [name]: value }` is equivalent to `{ topText: value }`.

This single `handleChange` function handles **both** inputs — the `name` attribute on each `<input>` (`"topText"` and `"bottomText"`) matches the corresponding key in the `meme` state object exactly.

| Input element | `name` attribute | `[name]` result | State key updated |
|--------------|-----------------|----------------|------------------|
| Top input | `name="topText"` | `{ topText: value }` | `meme.topText` |
| Bottom input | `name="bottomText"` | `{ bottomText: value }` | `meme.bottomText` |

```javascript
// Without computed property names — would need two separate handlers
function handleTopChange(event) {
  setMeme(prev => ({ ...prev, topText: event.currentTarget.value }))
}
function handleBottomChange(event) {
  setMeme(prev => ({ ...prev, bottomText: event.currentTarget.value }))
}

// With computed property names — one handler for both
function handleChange(event) {
  const { value, name } = event.currentTarget
  setMeme(prev => ({ ...prev, [name]: value }))
}
```

---

# 9. Getting a Random Meme — `getMemeImage()`

```jsx
// Main.jsx
function getMemeImage() {
  const randomNumber = Math.floor(Math.random() * allMemes.length)
  const newMemeUrl = allMemes[randomNumber].url
  setMeme(prevMeme => ({
    ...prevMeme,
    imageUrl: newMemeUrl
  }))
}
```

`getMemeImage` picks a random index using `Math.floor(Math.random() * allMemes.length)` — `Math.random()` returns a float between `0` (inclusive) and `1` (exclusive); multiplying by the array length and flooring gives a valid integer index.

`allMemes[randomNumber].url` reads the `url` field from the randomly selected meme object. `setMeme(prevMeme => ({ ...prevMeme, imageUrl: newMemeUrl }))` updates only `imageUrl` — the spread `...prevMeme` preserves `topText` and `bottomText` so the user's typed captions are not wiped out when they click the button.

```
Before click:  meme = { topText: "Hello", bottomText: "World", imageUrl: "http://old.jpg" }
                                                                               ↑
getMemeImage runs:                                              Math.random() selects index 42
                                                                allMemes[42].url = "http://new.jpg"

After click:   meme = { topText: "Hello", bottomText: "World", imageUrl: "http://new.jpg" }
                               ↑ preserved              ↑ preserved       ↑ updated only
```

---

# 10. Functional State Updates — Spread + Override

```jsx
// Pattern used in both getMemeImage and handleChange
setMeme(prevMeme => ({
  ...prevMeme,       // copy all existing fields
  imageUrl: newUrl   // override only imageUrl
}))
```

The **functional update form** of `setState` — `setState(prev => newState)` — is used when the new state depends on the previous state. React guarantees that `prevMeme` is the most recent state value, even if multiple updates are queued. This avoids stale closure bugs that can occur when reading state directly inside an async callback.

**Spread + override** is the idiomatic pattern for updating one field of a state object without losing the others:

```javascript
// state object: { topText: "A", bottomText: "B", imageUrl: "C" }

// ❌ Bad — replaces the entire object, loses topText and bottomText
setMeme({ imageUrl: newUrl })

// ✅ Good — copies all fields, then overrides imageUrl
setMeme(prev => ({ ...prev, imageUrl: newUrl }))
// result: { topText: "A", bottomText: "B", imageUrl: newUrl }
```

> React does not deep-merge state objects — `setState` replaces the entire state value. Always spread the previous state when updating an object and you only want to change one field.

---

# 11. CSS — Meme Text Overlay with `position: absolute`

```css
/* index.css */
.meme {
  position: relative;   /* ← establishes the positioning context */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.meme span {
  position: absolute;   /* ← taken out of flow, positioned inside .meme */
  text-align: center;
  font-family: impact, sans-serif;
  font-size: 2rem;
  text-transform: uppercase;
  color: white;
  text-shadow:
    2px 2px 0 #000,
    -2px -2px 0 #000, /* ← 8-directional shadow = black outline effect */
    2px -2px 0 #000,
    -2px 2px 0 #000,
    0 2px 0 #000,
    2px 0 0 #000,
    0 -2px 0 #000,
    -2px 0 0 #000,
    2px 2px 5px #000;
}

.top    { top: 0; }     /* ← snaps to top edge of .meme container */
.bottom { bottom: 0; }  /* ← snaps to bottom edge of .meme container */
```

The meme text overlay works through **absolute positioning within a relative container**:

```
.meme (position: relative)
┌─────────────────────────────────┐
│ <span class="top">              │ ← position: absolute; top: 0
│   ONE DOES NOT SIMPLY           │
│                                 │
│  [meme image fills the area]    │
│                                 │
│   WALK INTO MORDOR              │
│ <span class="bottom">           │ ← position: absolute; bottom: 0
└─────────────────────────────────┘
```

The `text-shadow` with 8 directional offsets (2px in each axis direction) creates a solid **black stroke outline** around white letters — the classic meme font look, achieved in pure CSS without any image editing.

| CSS property | Value | Effect |
|-------------|-------|--------|
| `position: relative` on `.meme` | establishes context | Makes `.meme` the anchor for `absolute` children |
| `position: absolute` on `.meme span` | removes from flow | Lets the span float over the image |
| `top: 0` / `bottom: 0` | edge anchors | Places caption at top or bottom of the container |
| `text-transform: uppercase` | `uppercase` | All caps — classic meme text style |
| `font-family: impact` | `impact` | The iconic meme font |
| 8-direction `text-shadow` | multiple shadows | Creates a black outline (stroke) effect in pure CSS |

---

# 12. How the Full App Flow Works

```
┌─────────────────── INITIAL RENDER ───────────────────────────┐
│                                                              │
│ App renders → <Header /> + <Main />                          │
│                                                              │
│ Main renders with initial state:                             │
│   meme    = { topText: "One does not simply",                │
│               bottomText: "Walk into Mordor",                │
│               imageUrl: "http://i.imgflip.com/1bij.jpg" }    │
│   allMemes = []                                              │
│                                                              │
│ DOM updates → browser paints UI                              │
│                                                              │
│ useEffect fires ([] deps → runs once):                       │
│   └─ fetch("https://api.imgflip.com/get_memes")              │
│       └─ .then(res => res.json())                            │
│       └─ .then(data => setAllMemes(data.data.memes))         │
│           └─ React re-renders Main                           │
│               allMemes = [100 meme objects]                  │
│               meme = unchanged (still initial values)        │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌─────────────────── USER TYPES IN TOP INPUT ──────────────────┐
│                                                              │
│ User types "Hello" in the "Top Text" input                   │
│   └─ onChange fires on every keystroke                       │
│   └─ handleChange(event)                                     │
│       const { value, name } = event.currentTarget            │
│       name  = "topText"                                      │
│       value = "H" | "He" | "Hel" | "Hell" | "Hello"          │
│   └─ setMeme(prev => ({ ...prev, topText: value }))          │
│   └─ React re-renders Main                                   │
│       <input value="Hello" />   ← controlled input syncs    │
│       <span class="top">Hello</span> ← overlay updates live │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌─────────────────── USER CLICKS BUTTON ───────────────────────┐
│                                                              │
│ User clicks "Get a new meme image 🖼"                        │
│   └─ getMemeImage()                                          │
│       Math.random() * 100 → e.g., 42                        │
│       allMemes[42].url = "https://i.imgflip.com/xyz.jpg"    │
│   └─ setMeme(prev => ({                                      │
│         ...prev,           ← topText and bottomText kept     │
│         imageUrl: newUrl   ← only the image changes          │
│       }))                                                    │
│   └─ React re-renders Main                                   │
│       <img src="https://i.imgflip.com/xyz.jpg" /> ← new img │
│       <span class="top">Hello</span>  ← text preserved      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

# 13. HTML Structure Recap — React Document Tree

```
index.html
├── <head>
│   ├── <link> → Google Fonts (Karla: wght 400, 500, 700)
│   └── <link> → /index.css
│
└── <body>
    ├── <div id="root">
    │   │
    │   │  After root.render(<App />) runs:
    │   │
    │   ├── <header class="header">         ← <Header /> component
    │   │   ├── <img src="[troll-face]" />  ← imported as JS module
    │   │   └── <h1>Meme Generator</h1>
    │   │
    │   └── <main>                          ← <Main /> component
    │       │
    │       ├── <div class="form">
    │       │   ├── <label>Top Text
    │       │   │   └── <input
    │       │   │           type="text"
    │       │   │           name="topText"
    │       │   │           value={meme.topText}       ← controlled
    │       │   │           onChange={handleChange} />
    │       │   ├── <label>Bottom Text
    │       │   │   └── <input
    │       │   │           type="text"
    │       │   │           name="bottomText"
    │       │   │           value={meme.bottomText}    ← controlled
    │       │   │           onChange={handleChange} />
    │       │   └── <button onClick={getMemeImage}>
    │       │           Get a new meme image 🖼
    │       │       </button>
    │       │
    │       └── <div class="meme">          ← position: relative
    │           ├── <img src={meme.imageUrl} />
    │           ├── <span class="top">      ← position: absolute; top: 0
    │           │       {meme.topText}
    │           │   </span>
    │           └── <span class="bottom">   ← position: absolute; bottom: 0
    │                   {meme.bottomText}
    │               </span>
    │
    └── <script src="/index.jsx" type="module">

State (lives in Main):
  meme     = { topText, bottomText, imageUrl }   → drives inputs + overlay text + image src
  allMemes = [100 meme objects from API]          → read by getMemeImage()

Effects (registered in Main):
  useEffect(() => fetch(API), [])  → fires once after first render, populates allMemes
```

---

# 14. How to Run

This project is built with **Vite** and requires a local dev server to process JSX.

```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Vite starts at `http://localhost:5173`. The app fetches live data from `https://api.imgflip.com/get_memes` on load — an internet connection is required for the meme templates to load.

- On first load, the default "One does not simply / Walk into Mordor" meme appears instantly (from the hardcoded initial state)
- After ~300ms, the API fetch completes and 100 meme templates are cached in `allMemes` state
- Clicking "Get a new meme image" picks a random template from the cached array

---

# 15. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 13. React.js Fundamentals
* **Project:** 05. Side Effects — Meme Generator
