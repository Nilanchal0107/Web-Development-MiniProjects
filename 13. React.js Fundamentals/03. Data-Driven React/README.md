# Travel Journal — Data-Driven React

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![JSX](https://img.shields.io/badge/JSX-Props%20%26%20Data-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Inter-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A data-driven travel journal built with React — the **Travel Journal** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every data-driven React concept introduced in this module, comparing what is new here against the Static Pages project (13/01) — specifically the addition of props, `.map()` for rendering lists, component reusability, destructuring, and data-driven UI patterns.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Static Pages](#3-whats-new-vs-static-pages)
4. [Props — Passing Data into Components](#4-props--passing-data-into-components)
   - [What are Props?](#41-what-are-props)
   - [Passing Props](#42-passing-props)
   - [Receiving Props — the `props` Object](#43-receiving-props--the-props-object)
   - [Destructuring Props](#44-destructuring-props)
5. [Non-String Props — `{}` in JSX](#5-non-string-props---in-jsx)
6. [Data-Driven Rendering — `Array.map()`](#6-data-driven-rendering--arraymap)
   - [The `data.js` Array](#61-the-datajs-array)
   - [`.map()` to Produce JSX Elements](#62-map-to-produce-jsx-elements)
   - [The `key` Prop](#63-the-key-prop)
7. [Nested Props — Object Props](#7-nested-props--object-props)
   - [The `img` Prop Object](#71-the-img-prop-object)
   - [Spread Props — `{...entry}`](#72-spread-props--entry)
8. [Importing Static Assets](#8-importing-static-assets)
9. [The `Entry` Component — Full Breakdown](#9-the-entry-component--full-breakdown)
10. [JS Inside JSX — `{}` Expressions](#10-js-inside-jsx--expressions)
11. [How the Full App Flow Works](#11-how-the-full-app-flow-works)
12. [HTML Structure Recap — React Document Tree](#12-html-structure-recap--react-document-tree)
13. [How to Run](#13-how-to-run)
14. [Course Reference](#14-course-reference)

---

# 1. Project Overview

**Travel Journal** is a data-driven React page that renders a series of journal entries for travel destinations. Each entry displays a destination photo, country name with a map-marker icon, a "View on Google Maps" link, a location title, travel dates, and a description paragraph. All entries are rendered from a single JavaScript data array — adding a new destination requires only adding an object to `data.js`, not changing any JSX.

The page includes:

* A **`<Header>`** component displaying a globe icon and the title "my travel journal."
* Three **`<Entry>`** components — one each for Mount Fuji (Japan), Sydney Opera House (Australia), and Geirangerfjord (Norway) — dynamically rendered from the `data.js` array
* A **`data.js`** file exporting an array of entry objects, each with `id`, `img` (nested object with `src` and `alt`), `title`, `country`, `googleMapsLink`, `dates`, and `text` fields
* An **`App.jsx`** that imports data, maps it to `<Entry>` components with spread props, and renders them inside a `<main>` container
* A **`spread props`** pattern (`{...entry}`) that passes all object properties as individual props in a single expression

The goal of this module is not just to display travel cards — it is to understand how React transforms a JavaScript data array into a list of UI elements, how props allow the same component to render different content, why the `key` prop is required for lists, and how nested object props model real-world data shapes.

---

# 2. Project Structure

```
13. React.js Fundamentals/
│
└── 03. Data-Driven React/
    ├── index.html              → Single HTML shell — <div id="root"> only
    ├── index.jsx               → Entry point — createRoot + root.render(<App />)
    ├── index.css               → Global styles: layout, card styles, header
    ├── App.jsx                 → Root component — imports data, maps to <Entry> list
    ├── data.js                 → Array of 3 travel entry objects (Japan, Australia, Norway)
    ├── components/
    │   ├── Header.jsx          → Globe icon + "my travel journal." heading
    │   └── Entry.jsx           → Single journal entry card — receives all fields via props
    └── images/
        ├── globe.png           → Globe icon used in <Header />
        └── marker.png          → Map marker icon used in each <Entry />
```

---

# 3. What's New vs Static Pages

## New React Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `props` object | `Entry.jsx` line 5 | Passes data from parent to child component — makes `Entry` reusable |
| `props.country` / `props.title` etc. | `Entry.jsx` lines 21–25 | Accesses individual prop values passed by the parent |
| `{props.img.src}` | `Entry.jsx` line 11 | Accesses a **nested object prop** — `img` is itself an object with `src` and `alt` |
| `<Entry key={entry.id} {...entry} />` | `App.jsx` line 9 | **Spread props** — passes all object properties as individual props |
| `data.map((entry) => <Entry ... />)` | `App.jsx` line 7 | **List rendering** — transforms a data array into an array of JSX elements |
| `key={entry.id}` | `App.jsx` line 10 | Required unique identifier — tells React which element is which during re-renders |
| `import data from "./data"` | `App.jsx` line 3 | Imports a JS data array from a separate module |
| `export default [...]` | `data.js` line 1 | Exports the data array as the default export |
| `{props.googleMapsLink}` in `href` | `Entry.jsx` line 22 | JS expression used as an attribute value |
| `target="_blank"` | `Entry.jsx` line 22 | Opens the Google Maps link in a new tab |

## Comparison: Static Pages vs Data-Driven React

| Feature | Static Pages (13/01) | Data-Driven React (13/03) |
|---------|---------------------|--------------------------|
| Content source | Hardcoded in JSX | External `data.js` array |
| Component reuse | Each component renders fixed output | `Entry` renders different content per prop set |
| Adding new items | Edit JSX in the component | Add an object to `data.js` — no JSX change |
| Props | Not used | Core pattern — all data flows via props |
| `key` prop | Not needed | Required on all list-rendered elements |
| `.map()` | Not used | Used to transform data → JSX elements |

---

# 4. Props — Passing Data into Components

## 4.1 What are Props?

**Props** (short for "properties") are the mechanism for passing data from a parent component to a child component. They are the React equivalent of HTML attributes — but instead of being limited to strings, props can be any JavaScript value: strings, numbers, booleans, objects, arrays, or even functions.

```
Parent (App)                     Child (Entry)
─────────────────────────────    ──────────────────────────────
<Entry                           function Entry(props) {
  title="Mount Fuji"    ──────►    props.title  // "Mount Fuji"
  country="Japan"       ──────►    props.country // "Japan"
  dates="12 Jan..."     ──────►    props.dates   // "12 Jan..."
/>                               }
```

## 4.2 Passing Props

```jsx
// App.jsx — passing props explicitly
<Entry
  title="Mount Fuji"
  country="Japan"
  dates="12 Jan, 2021 - 24 Jan, 2021"
  text="Mount Fuji is the tallest mountain in Japan..."
/>
```

Each prop is written as a JSX attribute. String values use regular quotes; any JavaScript expression (including numbers, booleans, objects) uses `{}`.

## 4.3 Receiving Props — the `props` Object

```jsx
// components/Entry.jsx
export default function Entry(props) {
  return (
    <article className="journal-entry">
      <h2 className="entry-title">{props.title}</h2>
      <span className="country">{props.country}</span>
      <p className="trip-dates">{props.dates}</p>
      <p className="entry-text">{props.text}</p>
    </article>
  )
}
```

React calls the component function with a single `props` argument — a plain JavaScript object where each key is a prop name and each value is the prop value passed by the parent. `{props.title}` is a JSX expression that inserts the value as text.

> Props flow **one way** — from parent to child. A child component cannot modify its own props (they are read-only). This unidirectional data flow makes React applications predictable and easier to debug.

## 4.4 Destructuring Props

```jsx
// Cleaner — destructure from props in the parameter
export default function Entry({ title, country, dates, text, img, googleMapsLink }) {
  return (
    <article className="journal-entry">
      <h2>{title}</h2>
      <span>{country}</span>
    </article>
  )
}
```

**Destructuring** extracts named properties from the props object directly in the function parameter, so each field can be used by name without the `props.` prefix. This is a JavaScript destructuring assignment — the same pattern works for any object.

| Style | Syntax | Access |
|-------|--------|--------|
| Props object | `function Entry(props)` | `props.title`, `props.country` |
| Destructured | `function Entry({ title, country })` | `title`, `country` (directly) |

---

# 5. Non-String Props — `{}` in JSX

```jsx
// data.js
{
  id: 1,            // number — not a string
  img: {            // object — nested
    src: "https://...",
    alt: "Mount Fuji"
  },
  googleMapsLink: "https://maps.app.goo.gl/..."
}

// App.jsx — passing non-string props with {}
<Entry
  key={entry.id}       // {number}
  img={entry.img}      // {object}
  {...entry}           // all properties spread
/>
```

In JSX, any non-string value must be passed inside `{}`. String values can use quotes OR `{}`:

| Prop value | Quote syntax | Curly brace syntax |
|-----------|-------------|-------------------|
| String | `title="Mount Fuji"` | `title={"Mount Fuji"}` |
| Number | ❌ (always use `{}`) | `id={1}` |
| Boolean | ❌ (always use `{}`) | `isActive={true}` |
| Object | ❌ (always use `{}`) | `img={{ src: "...", alt: "..." }}` |
| Variable | ❌ (always use `{}`) | `title={entry.title}` |

---

# 6. Data-Driven Rendering — `Array.map()`

## 6.1 The `data.js` Array

```javascript
// data.js
export default [
  {
    id: 1,
    img: { src: "https://scrimba.com/links/travel-journal-japan-image-url", alt: "Mount Fuji" },
    title: "Mount Fuji",
    country: "Japan",
    googleMapsLink: "https://maps.app.goo.gl/6RLYZDuuuqJ7kNGZ9",
    dates: "12 Jan, 2021 - 24 Jan, 2021",
    text: "Mount Fuji is the tallest mountain in Japan..."
  },
  {
    id: 2,
    img: { src: "...", alt: "Sydney Opera House" },
    title: "Sydney Opera House",
    country: "Australia",
    // ...
  },
  { id: 3, title: "Geirangerfjord", country: "Norway", /* ... */ }
]
```

`data.js` is a plain JavaScript module exporting an array of objects — no React involved. Separating data from the component that renders it is a fundamental practice: the component describes *how* to display an entry, the data file holds *what* to display.

## 6.2 `.map()` to Produce JSX Elements

```jsx
// App.jsx
import data from "./data"

export default function App() {
  const entryElements = data.map((entry) => {
    return (
      <Entry
        key={entry.id}
        {...entry}
      />
    )
  })

  return (
    <>
      <Header />
      <main className="container">
        {entryElements}
      </main>
    </>
  )
}
```

`Array.map()` transforms each object in `data` into a JSX element (`<Entry />`). The result `entryElements` is an **array of JSX elements** — React can render arrays of elements directly inside `{}`.

```
data array             →  entryElements array        →  DOM
[                         [                              <article>...</article>  (Japan)
  { id:1, title:"Fuji" }    <Entry key={1} ... />,       <article>...</article>  (Australia)
  { id:2, title:"Opera" }   <Entry key={2} ... />,       <article>...</article>  (Norway)
  { id:3, title:"Fjord" }   <Entry key={3} ... />
]                         ]
```

> `Array.map()` was introduced in earlier JavaScript modules. In React, it is the primary pattern for rendering lists — it replaces the `data.forEach(item => list.innerHTML += ...)` pattern from vanilla JS.

## 6.3 The `key` Prop

```jsx
<Entry
  key={entry.id}
  {...entry}
/>
```

`key` is a **special prop** that React uses internally during reconciliation (comparing the old virtual DOM tree to the new one). When a list changes — items added, removed, or reordered — React uses `key` values to match old elements with new ones, avoiding unnecessary re-renders.

| Without `key` | With `key={entry.id}` |
|--------------|----------------------|
| React must compare each position | React matches by ID — knows exactly which element changed |
| Warning in console | No warning |
| Potential rendering bugs when list changes | Correct behaviour |

> `key` must be **unique among siblings** and **stable** (not random — don't use `Math.random()`). A database `id` is the ideal key because it is both unique and consistent across renders.

---

# 7. Nested Props — Object Props

## 7.1 The `img` Prop Object

```javascript
// data.js — img is an object, not a flat string
img: {
  src: "https://scrimba.com/links/travel-journal-japan-image-url",
  alt: "Mount Fuji"
}
```

```jsx
// Entry.jsx — accessing nested object props
<img
  className="main-image"
  src={props.img.src}
  alt={props.img.alt}
/>
```

Grouping related fields into an object (`img.src`, `img.alt`) models real-world data more accurately — an image is a single concept with multiple attributes. `props.img.src` uses dot notation to access nested properties, just as with any JavaScript object.

## 7.2 Spread Props — `{...entry}`

```jsx
// App.jsx
<Entry
  key={entry.id}
  {...entry}
/>
```

The **spread syntax** `{...entry}` expands all key-value pairs of the `entry` object as individual props. It is equivalent to writing each prop out explicitly:

```jsx
// These are identical:
<Entry key={entry.id} {...entry} />

<Entry
  key={entry.id}
  id={entry.id}
  img={entry.img}
  title={entry.title}
  country={entry.country}
  googleMapsLink={entry.googleMapsLink}
  dates={entry.dates}
  text={entry.text}
/>
```

Spread props reduce repetition when a data object's shape matches the component's expected props. It should be used with care — spreading an object with extra properties may pass unexpected props to a component.

---

# 8. Importing Static Assets

```jsx
// Entry.jsx — using a static image from the images/ folder
<img
  className="marker"
  src="../images/marker.png"
  alt="map marker icon"
/>
```

Static assets (images, fonts) in the `images/` folder are referenced with **relative paths** from the component file. Vite handles these paths during the build, copying assets to the output directory and resolving paths correctly.

For images that vary per entry (like destination photos), the `src` comes from the data array via `props.img.src` — an external URL in this project.

| Image | Source | How accessed |
|-------|--------|-------------|
| Globe icon | `images/globe.png` | `src="../images/globe.png"` in `Header.jsx` |
| Map marker | `images/marker.png` | `src="../images/marker.png"` in `Entry.jsx` |
| Destination photo | External URL in `data.js` | `src={props.img.src}` in `Entry.jsx` |

---

# 9. The `Entry` Component — Full Breakdown

```jsx
// components/Entry.jsx
export default function Entry(props) {
  return (
    <article className="journal-entry">

      {/* Left column — destination image */}
      <div className="main-image-container">
        <img
          className="main-image"
          src={props.img.src}
          alt={props.img.alt}
        />
      </div>

      {/* Right column — entry details */}
      <div className="info-container">
        <img
          className="marker"
          src="../images/marker.png"
          alt="map marker icon"
        />
        <span className="country">{props.country}</span>
        <a href={props.googleMapsLink} target="_blank">View on Google Maps</a>
        <h2 className="entry-title">{props.title}</h2>
        <p className="trip-dates">{props.dates}</p>
        <p className="entry-text">{props.text}</p>
      </div>

    </article>
  )
}
```

`Entry` is a **pure component** — given the same props, it always returns the same JSX. Every field is driven by props:

| Prop | JSX usage | Element type |
|------|-----------|-------------|
| `props.img.src` | `src={props.img.src}` | `<img>` attribute |
| `props.img.alt` | `alt={props.img.alt}` | `<img>` attribute |
| `props.country` | `{props.country}` | Text in `<span>` |
| `props.googleMapsLink` | `href={props.googleMapsLink}` | `<a>` attribute |
| `props.title` | `{props.title}` | Text in `<h2>` |
| `props.dates` | `{props.dates}` | Text in `<p>` |
| `props.text` | `{props.text}` | Text in `<p>` |

The `<article>` element is the semantically correct choice for a self-contained piece of content that could stand alone — like a blog post or a journal entry.

---

# 10. JS Inside JSX — `{}` Expressions

```jsx
// Any JavaScript expression can go inside {}
<span>{props.country}</span>            // Variable reference
<a href={props.googleMapsLink}>...</a>  // Variable in attribute
<img src={props.img.src} />             // Nested object access
{entryElements}                         // Array of JSX elements
{data.map(entry => <Entry />)}          // Inline map call
```

`{}` in JSX is the **escape hatch** into JavaScript. Anything that is a valid JavaScript **expression** (not a statement) can go inside `{}`:

| ✅ Valid in `{}` | ❌ Not valid in `{}` |
|----------------|---------------------|
| Variables: `{title}` | `if` statements |
| Object access: `{props.img.src}` | `for` loops |
| Method calls: `{data.map(...)}` | Variable declarations (`let x = ...`) |
| Ternary: `{isActive ? 'Yes' : 'No'}` | `function` declarations |
| Template literals: `{`Hello ${name}`}` | `switch` statements |

> Statements (like `if`, `for`, `let`) cannot go inside JSX `{}` — they do not produce a value. Use ternaries (`condition ? a : b`) for conditionals and `.map()` for loops inside JSX.

---

# 11. How the Full App Flow Works

```
data.js (source of truth)
│
│  export default [
│    { id: 1, title: "Mount Fuji", country: "Japan", img: {...}, ... },
│    { id: 2, title: "Sydney Opera House", country: "Australia", ... },
│    { id: 3, title: "Geirangerfjord", country: "Norway", ... }
│  ]
│
▼
App.jsx
│  import data from "./data"
│  const entryElements = data.map((entry) => (
│    <Entry key={entry.id} {...entry} />
│  ))
│
│  return (
│    <>
│      <Header />
│      <main>{entryElements}</main>
│    </>
│  )
│
├─► <Header /> renders:
│     <header>
│       <img src="../images/globe.png" />
│       <h1>my travel journal.</h1>
│     </header>
│
└─► Three <Entry /> components render (one per data object):
      Entry(props) where props = { id:1, title:"Mount Fuji", country:"Japan", img:{...}, ... }
        → <article class="journal-entry">
            <img src="[japan-photo-url]" />
            <span>Japan</span>
            <a href="[maps-url]">View on Google Maps</a>
            <h2>Mount Fuji</h2>
            <p>12 Jan, 2021 - 24 Jan, 2021</p>
            <p>Mount Fuji is the tallest...</p>
          </article>
```

---

# 12. HTML Structure Recap — React Document Tree

```
index.html
├── <head>
│   ├── <link> → Google Fonts (Inter)
│   └── <link> → /index.css
│
└── <body>
    ├── <div id="root">
    │   │
    │   │  After root.render(<App />) runs:
    │   │
    │   ├── <header>                     ← <Header /> component
    │   │   ├── <img src="../images/globe.png" />
    │   │   └── <h1>my travel journal.</h1>
    │   │
    │   └── <main class="container">    ← rendered by App
    │       │
    │       ├── <article class="journal-entry">   ← Entry id=1 (Japan)
    │       │   ├── <div class="main-image-container">
    │       │   │   └── <img src="[japan-url]" alt="Mount Fuji" />
    │       │   └── <div class="info-container">
    │       │       ├── <img class="marker" src="../images/marker.png" />
    │       │       ├── <span class="country">Japan</span>
    │       │       ├── <a href="[maps-url]" target="_blank">View on Google Maps</a>
    │       │       ├── <h2>Mount Fuji</h2>
    │       │       ├── <p class="trip-dates">12 Jan, 2021 - 24 Jan, 2021</p>
    │       │       └── <p class="entry-text">Mount Fuji is the tallest...</p>
    │       │
    │       ├── <article class="journal-entry">   ← Entry id=2 (Australia)
    │       │   └── [same structure, different data]
    │       │
    │       └── <article class="journal-entry">   ← Entry id=3 (Norway)
    │           └── [same structure, different data]
    │
    └── <script src="/index.jsx" type="module">
```

---

# 13. How to Run

This project is built with **Vite** and requires a local dev server to process JSX.

```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Vite starts at `http://localhost:5173`. Any change to `data.js`, `App.jsx`, `Entry.jsx`, or `index.css` is reflected instantly via Hot Module Replacement (HMR).

To add a new journal entry:
1. Open `data.js`
2. Add a new object to the array with `id`, `img`, `title`, `country`, `googleMapsLink`, `dates`, and `text`
3. The new `<Entry>` card appears automatically — no JSX changes needed

---

# 14. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 13. React.js Fundamentals
* **Project:** 03. Data-Driven React — Travel Journal
