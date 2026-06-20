# ReactFacts — Static Pages

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![JSX](https://img.shields.io/badge/JSX-Component%20Syntax-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Inter-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A static React page introducing the fundamentals of component-based UI — the **ReactFacts** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every React.js concept introduced in this module, comparing what is new here against all the vanilla JavaScript projects covered in earlier folders — specifically the shift from imperative DOM manipulation to declarative, component-based rendering.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is React?](#3-what-is-react)
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [The React Entry Point](#5-the-react-entry-point)
   - [`createRoot()` and `root.render()`](#51-createroot-and-rootrender)
   - [The `#root` div](#52-the-root-div)
6. [JSX — JavaScript XML](#6-jsx--javascript-xml)
   - [JSX vs HTML](#61-jsx-vs-html)
   - [Why JSX?](#62-why-jsx)
   - [`React.createElement()` under the hood](#63-reactcreateelement-under-the-hood)
7. [Components](#7-components)
   - [What is a Component?](#71-what-is-a-component)
   - [Function Component Syntax](#72-function-component-syntax)
   - [Composing Components — Parent/Child](#73-composing-components--parentchild)
   - [Fragments — `<>...</>`](#74-fragments--)
8. [Why React? Declarative vs Imperative](#8-why-react-declarative-vs-imperative)
9. [Styling with CSS Classes in React](#9-styling-with-css-classes-in-react)
   - [`className` instead of `class`](#91-classname-instead-of-class)
10. [The ReactFacts Project — Component Breakdown](#10-the-reactfacts-project--component-breakdown)
    - [`Navbar` Component](#101-navbar-component)
    - [`Main` Component](#102-main-component)
    - [`App` Component](#103-app-component)
11. [HTML Structure Recap — React Document Tree](#11-html-structure-recap--react-document-tree)
12. [How to Run](#12-how-to-run)
13. [Course Reference](#13-course-reference)

---

# 1. Project Overview

**ReactFacts** is a simple informational page displaying fun facts about the React library. It features a branded navigation bar with a React logo and site name, and a main content section with a heading and an unordered list of facts styled with the React brand colour. A large faded React logo is used as a decorative background image.

The page includes:

* A **`<Navbar>`** component with a React logo image and a "ReactFacts" brand name
* A **`<Main>`** component with a heading `"Fun facts about React"` and a `<ul>` of five list items styled with `::marker` using the React blue (`#61DAFB`)
* An **`<App>`** root component that composes `<Navbar>` and `<Main>` using a Fragment
* An `index.jsx` entry point that mounts the React tree into the `#root` div using `createRoot()`
* An `index.css` global stylesheet with dark background colours, Inter font, and React-branded accent colours

The goal of this module is not just to render some text — it is to understand the core mental model shift of React: moving from writing instructions for how to update the DOM (imperative) to describing what the UI should look like at any given moment (declarative), and how components allow complex UIs to be built from small, reusable pieces.

---

# 2. Project Structure

```
13. React.js Fundamentals/
│
└── 01. Static Pages/
    ├── index.html          → Single HTML shell — contains <div id="root"> only
    ├── index.jsx           → Entry point — createRoot + root.render(<App />)
    ├── index.css           → Global styles: dark background, Inter font, React brand colours
    ├── App.jsx             → Root component — composes <Navbar /> and <Main />
    ├── components/
    │   ├── Navbar.jsx      → Navigation bar: React logo + "ReactFacts" brand name
    │   └── Main.jsx        → Main content: h1 heading + facts <ul>
    └── images/
        ├── react-logo.png       → React logo used in <Navbar />
        └── react-logo-half.png  → Faded background image on <main>
```

---

# 3. What is React?

**React** is a JavaScript library for building user interfaces through a component-based model. Rather than selecting DOM elements and modifying them directly (as in vanilla JS), React lets you describe what the UI should look like — and React handles all the DOM updates to match that description.

| Aspect | Vanilla JavaScript | React |
|--------|-------------------|-------|
| UI updates | `document.getElementById()` → `.innerHTML = ...` | Describe the desired UI state; React diffs and updates |
| Code organisation | Functions, modules, event listeners | Components — self-contained functions returning JSX |
| Reusability | Copy-paste HTML + wire up JS manually | Import and reuse a component anywhere with one tag |
| Mental model | **Imperative** — "do this, then this, then this" | **Declarative** — "this is what the UI should look like" |
| Syntax | HTML in `.html` files, JS in `.js` files | JSX — HTML-like syntax embedded directly in JavaScript |

> React does not replace JavaScript — it is a library that runs in the browser alongside your JS. Every React component is just a JavaScript function that returns JSX.

---

# 4. What's New vs Previous Projects

## New React Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `import { createRoot } from 'react-dom/client'` | `index.jsx` line 1 | Imports the React 18 root API — how React connects to the real DOM |
| `createRoot(document.getElementById('root'))` | `index.jsx` line 3 | Creates a React root attached to the `#root` DOM element |
| `root.render(<App />)` | `index.jsx` line 4 | Renders the React component tree into the DOM for the first time |
| `export default function App()` | `App.jsx` | Declares a React **function component** — a JS function that returns JSX |
| `return ( <> <Navbar /> <Main /> </> )` | `App.jsx` | Returns a JSX **Fragment** containing two child components |
| `<Navbar />` / `<Main />` | `App.jsx` | **Self-closing component tags** — custom HTML-like elements backed by JS functions |
| `import Navbar from "./components/Navbar"` | `App.jsx` | Imports a component from another file — ES Module syntax |
| `export default function Navbar()` | `Navbar.jsx` | Declares and exports a component for use in other files |
| `className="facts-list"` | `Main.jsx` | React attribute — equivalent to `class=""` in HTML |
| JSX syntax | All `.jsx` files | HTML-like markup written directly inside JavaScript functions |

## New File Types

| Extension | Purpose |
|-----------|---------|
| `.jsx` | JavaScript + JSX — React component files. Vite processes these with Babel/esbuild to convert JSX into `React.createElement()` calls |
| `.html` | Minimal shell — only provides `<div id="root">`. No content is written here |

## Concepts Carried Over from Vanilla JS Projects ↩

| Concept | How It Appears in React |
|---------|------------------------|
| ES Modules (`import`/`export`) | Same syntax — components are imported just like utility functions were |
| CSS stylesheets | `index.css` is still a plain CSS file — linked in `index.html` |
| HTML elements (`<header>`, `<nav>`, `<main>`, `<ul>`, `<li>`) | Written inside JSX — same tags, slightly different attributes |
| `document.getElementById()` | Still used once in `index.jsx` — to find `#root` for `createRoot()` |

---

# 5. The React Entry Point

## 5.1 `createRoot()` and `root.render()`

```jsx
// index.jsx
import { createRoot } from "react-dom/client"
import App from "./App"

const root = createRoot(document.getElementById("root"))
root.render(<App />)
```

`createRoot()` is the React 18 API for mounting a React application. It takes a real DOM element as its argument and returns a **root object**. `root.render()` takes a JSX element (the top-level component) and renders the entire React component tree into that DOM node.

| Step | Code | What it does |
|------|------|-------------|
| 1 | `document.getElementById("root")` | Finds the `<div id="root">` in `index.html` |
| 2 | `createRoot(...)` | Tells React: "manage this DOM node" |
| 3 | `root.render(<App />)` | Renders `<App />` and all its children into `#root` |

> `createRoot()` replaces the old `ReactDOM.render()` from React 17. React 18 introduced the new root API to support **Concurrent Mode** features like `startTransition` and `Suspense`.

## 5.2 The `#root` div

```html
<!-- index.html -->
<body>
  <div id="root"></div>
  <script src="/index.jsx" type="module"></script>
</body>
```

The `index.html` file is deliberately almost empty — it provides only a mounting point (`<div id="root">`) and a script tag. All visible content is generated by React and injected into `#root` at runtime. This is the **Single Page Application (SPA)** model — one HTML file, all UI driven by JavaScript.

```
Before React runs:    <div id="root"></div>  ← empty
After root.render():  <div id="root">
                         <header>...</header>
                         <main>...</main>
                      </div>
```

---

# 6. JSX — JavaScript XML

## 6.1 JSX vs HTML

JSX looks like HTML but is written inside JavaScript files. There are a few key differences:

```jsx
// ❌ HTML — cannot write in .jsx files
<div class="container">
  <label for="name">Name</label>
</div>

// ✅ JSX — used in React components
<div className="container">
  <label htmlFor="name">Name</label>
</div>
```

| HTML attribute | JSX equivalent | Why it changed |
|---------------|---------------|---------------|
| `class` | `className` | `class` is a reserved keyword in JavaScript |
| `for` | `htmlFor` | `for` is a reserved keyword in JavaScript (used in loops) |
| `onclick` | `onClick` | React uses **camelCase** for all event attributes |
| `<img>` (unclosed) | `<img />` (self-closing) | JSX requires all elements to be explicitly closed |

## 6.2 Why JSX?

```jsx
// Mixing logic and markup — possible only with JSX
function Greeting(props) {
  return (
    <div className="greeting">
      <h1>Hello, {props.name}!</h1>
      <p>Today is {new Date().toLocaleDateString()}</p>
    </div>
  )
}
```

JSX allows JavaScript expressions (inside `{}`) directly in the markup — for dynamic values, computed properties, and conditional rendering. This keeps the template and the logic in the same file, making components self-contained.

> JSX is **not** a new language. Before React runs it, a build tool (Vite + esbuild) transforms every JSX expression into `React.createElement()` function calls — plain JavaScript that any browser understands.

## 6.3 `React.createElement()` under the hood

```jsx
// What you write (JSX)
const element = <h1 className="title">Hello</h1>

// What React actually runs (compiled output)
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello'
)
```

`React.createElement(type, props, ...children)` creates a **React element** — a plain JavaScript object describing what should be rendered. React then compares these objects against the current DOM (the **diffing / reconciliation** process) and applies only the necessary DOM changes. This is the Virtual DOM at work.

---

# 7. Components

## 7.1 What is a Component?

A **component** is a JavaScript function that:
1. Has a name starting with a capital letter
2. Returns JSX (or `null`)

```jsx
// A complete React component — nothing more than a function
export default function Greeting() {
  return <h1>Hello, world!</h1>
}
```

Components are used like HTML tags: `<Greeting />`. Capital letters tell React to treat the tag as a component (calling the function), not a native HTML element.

| Tag | React interprets as |
|-----|-------------------|
| `<div>` | Native HTML element — lowercase = DOM element |
| `<Greeting />` | Function component — uppercase = call the `Greeting` function |
| `<Main />` | Function component — call the `Main` function |

## 7.2 Function Component Syntax

```jsx
// components/Navbar.jsx
export default function Navbar() {
  return (
    <header>
      <nav>
        <img src="/images/react-logo.png" alt="React logo" />
        <span>ReactFacts</span>
      </nav>
    </header>
  )
}
```

A function component must return a **single root element**. This is because `return` can only return one value — and JSX compiles to one `React.createElement()` call. Returning two sibling elements causes a syntax error.

```jsx
// ❌ Bad — two root elements
return (
  <header>...</header>
  <main>...</main>
)

// ✅ Good — wrapped in a Fragment
return (
  <>
    <header>...</header>
    <main>...</main>
  </>
)
```

## 7.3 Composing Components — Parent/Child

```jsx
// App.jsx
import Main from "./components/Main"
import Navbar from "./components/Navbar"

export default function App() {
  return (
    <>
      <Navbar />
      <Main />
    </>
  )
}
```

Components can use other components — this is called **composition**. `App` is the parent component; `Navbar` and `Main` are its children. Composition is the primary way React UIs are structured — small, focused components assembled into larger ones.

```
<App>
├── <Navbar>
│   └── <header>
│       └── <nav>
│           ├── <img>
│           └── <span>
└── <Main>
    └── <main>
        ├── <h1>
        └── <ul>
            └── <li> × 5
```

> Components should do **one thing**. `Navbar` only renders the navigation bar. `Main` only renders the facts list. `App` only composes them together. This separation makes each component easy to understand, test, and reuse independently.

## 7.4 Fragments — `<>...</>`

```jsx
// App.jsx
return (
  <>
    <Navbar />
    <Main />
  </>
)
```

A **Fragment** (`<>...</>`) is a wrapper that groups multiple JSX elements without adding an extra DOM node. Using `<div>` as a wrapper would inject a meaningless `<div>` into the real DOM, potentially breaking CSS layout. Fragments are invisible in the output.

| Wrapper | DOM output |
|---------|-----------|
| `<div>` wrapper | `<div><header>...</header><main>...</main></div>` — extra div present |
| `<>` Fragment | `<header>...</header><main>...</main>` — no extra element |

---

# 8. Why React? Declarative vs Imperative

```javascript
// ❌ Imperative — Vanilla JavaScript
// You manage every step of the update manually
const list = document.getElementById('facts-list')
list.innerHTML = ''
data.forEach(fact => {
  const li = document.createElement('li')
  li.textContent = fact
  list.appendChild(li)
})
```

```jsx
// ✅ Declarative — React
// You describe the desired output; React handles the DOM
function Main() {
  return (
    <ul className="facts-list">
      <li>Was first released in 2013</li>
      <li>Was originally created by Jordan Walke</li>
      <li>Has well over 200K stars on GitHub</li>
      <li>Is maintained by Meta</li>
      <li>Powers thousands of enterprise apps</li>
    </ul>
  )
}
```

**Imperative** programming specifies *how* to do something step by step. **Declarative** programming specifies *what* the result should be. React's declarative model means:

- Less code for UI updates
- Fewer bugs from missed DOM update steps
- Easier to reason about — the component always shows exactly what is in the return statement

---

# 9. Styling with CSS Classes in React

## 9.1 `className` instead of `class`

```css
/* index.css */
.facts-list {
  margin-top: 46px;
  max-width: 400px;
}

.facts-list > li::marker {
  color: #61DAFB;
  font-size: 1.5rem;
}
```

```jsx
// Main.jsx — using className (not class)
<ul className="facts-list">
  ...
</ul>
```

CSS is still written in plain `.css` files — exactly the same as in previous projects. The only change is that `class=""` becomes `className=""` in JSX because `class` is a reserved word in JavaScript.

The `::marker` pseudo-element styles the bullet point of each `<li>`. Setting `color: #61DAFB` (React blue) on the marker colours only the bullet, not the text — a subtle branding detail.

> `index.css` is imported globally via the `<link>` tag in `index.html`. In later React patterns, CSS can also be imported directly inside component files (`import './Navbar.css'`), which scopes it to that component.

---

# 10. The ReactFacts Project — Component Breakdown

## 10.1 `Navbar` Component

```jsx
// components/Navbar.jsx
export default function Navbar() {
  return (
    <header>
      <nav>
        <img src="/images/react-logo.png" alt="React logo" />
        <span>ReactFacts</span>
      </nav>
    </header>
  )
}
```

`Navbar` renders a `<header>` containing a `<nav>` with the React logo image and the brand name "ReactFacts". It uses the semantic HTML5 elements `<header>` and `<nav>` — the same accessibility-correct markup from earlier modules now lives inside a component.

## 10.2 `Main` Component

```jsx
// components/Main.jsx
export default function Main() {
  return (
    <main>
      <h1>Fun facts about React</h1>
      <ul className="facts-list">
        <li>Was first released in 2013</li>
        <li>Was originally created by Jordan Walke</li>
        <li>Has well over 200K stars on GitHub</li>
        <li>Is maintained by Meta</li>
        <li>Powers thousands of enterprise apps, including mobile apps</li>
      </ul>
    </main>
  )
}
```

`Main` is a **static component** — it has no props, no state, and always renders the same output. It demonstrates the simplest possible React component: a function that returns fixed JSX. The `className="facts-list"` connects the list to the `::marker` colour styling in `index.css`.

## 10.3 `App` Component

```jsx
// App.jsx
import Main from "./components/Main"
import Navbar from "./components/Navbar"

export default function App() {
  return (
    <>
      <Navbar />
      <Main />
    </>
  )
}
```

`App` is the **root component** — the top of the component tree. It imports both child components and composes them inside a Fragment. This is the only place where `Navbar` and `Main` are assembled together. `App` is what gets passed to `root.render()` in `index.jsx`.

---

# 11. HTML Structure Recap — React Document Tree

```
index.html
├── <head>
│   ├── <link> → Google Fonts (Inter)
│   └── <link> → /index.css
│
└── <body>
    ├── <div id="root">           ← React mounts its entire tree here
    │   │
    │   │  After root.render(<App />) runs:
    │   │
    │   ├── <header>              ← rendered by <Navbar />
    │   │   └── <nav>
    │   │       ├── <img src="/images/react-logo.png" />
    │   │       └── <span>ReactFacts</span>
    │   │
    │   └── <main>                ← rendered by <Main />
    │       ├── <h1>Fun facts about React</h1>
    │       └── <ul class="facts-list">
    │           ├── <li>Was first released in 2013</li>
    │           ├── <li>Was originally created by Jordan Walke</li>
    │           ├── <li>Has well over 200K stars on GitHub</li>
    │           ├── <li>Is maintained by Meta</li>
    │           └── <li>Powers thousands of enterprise apps...</li>
    │
    └── <script src="/index.jsx" type="module">   ← calls createRoot + render
```

```
Component tree (React's view):          Real DOM (browser's view):
<App>                                   <div id="root">
  <Navbar>             →                  <header><nav>...</nav></header>
  <Main>               →                  <main><h1>...</h1><ul>...</ul></main>
</App>                                  </div>
```

---

# 12. How to Run

This project is built with **Vite** and requires a local dev server — the `.jsx` files cannot be opened directly in a browser because JSX is not valid JavaScript until processed by Vite's build pipeline.

```bash
# Install dependencies (react, react-dom, vite)
npm install

# Start the Vite development server
npm run dev
```

Vite starts at `http://localhost:5173` (or the next available port). Changes to any `.jsx` or `.css` file are reflected instantly in the browser via Hot Module Replacement (HMR) — no manual page refresh needed.

---

# 13. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 13. React.js Fundamentals
* **Project:** 01. Static Pages — ReactFacts
