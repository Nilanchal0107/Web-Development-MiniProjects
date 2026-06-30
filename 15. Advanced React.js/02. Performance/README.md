# Performance — Advanced React.js

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Hooks](https://img.shields.io/badge/Hooks-useMemo%20%7C%20useCallback%20%7C%20useTransition-61DAFB?style=flat-square&logo=react)
![Patterns](https://img.shields.io/badge/Patterns-Code%20Splitting%20%7C%20Lazy%20%7C%20Suspense-blueviolet?style=flat-square)
![DevTools](https://img.shields.io/badge/Tools-React%20DevTools%20Profiler-orange?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **Performance** module of **Advanced React.js** from **Scrimba's Fullstack Web Development Path** — a deep dive into how React renders, when it re-renders unnecessarily, and the precise set of tools React gives you to prevent wasted work.

This README is written as a **complete concept revision guide and teacher's notes**. You do not need any code files to learn from this document — every concept is explained from first principles with annotated code examples, mental models, decision tables, and worked-through scenarios. Reading top to bottom will give you a thorough, interview-ready understanding of React performance optimisation.

---

> **A note before you start reading.**
>
> Most React apps never need any of the optimisations in this module. React is already fast. The tools here — `useMemo`, `useCallback`, `React.memo`, code splitting — exist to solve *specific, measurable* performance problems. Learning *when not to use them* is just as important as learning how they work. This module teaches both.

---

# Table of Contents

1. [Why Performance Matters in React](#1-why-performance-matters-in-react)
2. [How React Renders — The Three Phases](#2-how-react-renders--the-three-phases)
   - [Phase 1 — Render](#21-phase-1--render)
   - [Phase 2 — Reconcile (Diffing)](#22-phase-2--reconcile-diffing)
   - [Phase 3 — Commit](#23-phase-3--commit)
   - [What "Rendering" Does NOT Mean](#24-what-rendering-does-not-mean)
3. [Recursive Rendering — Why Child Components Re-render](#3-recursive-rendering--why-child-components-re-render)
4. [Using React DevTools to Measure Performance](#4-using-react-devtools-to-measure-performance)
   - [The Profiler Tab](#41-the-profiler-tab)
   - [Highlighting Re-renders](#42-highlighting-re-renders)
5. [React StrictMode](#5-react-strictmode)
   - [StrictMode Double-Renders Components](#51-strictmode-double-renders-components)
   - [StrictMode Re-runs Side Effects](#52-strictmode-re-runs-side-effects)
6. [Code Splitting — `lazy()` and `<Suspense>`](#6-code-splitting--lazy-and-suspense)
   - [The Problem: One Giant Bundle](#61-the-problem-one-giant-bundle)
   - [`React.lazy()` — Dynamic Import](#62-reactlazy--dynamic-import)
   - [`<Suspense>` — The Loading Boundary](#63-suspense--the-loading-boundary)
   - [Code Splitting in Practice](#64-code-splitting-in-practice)
7. [`useMemo()` — Caching Expensive Calculations](#7-usememo--caching-expensive-calculations)
   - [The Problem: Work Repeated on Every Render](#71-the-problem-work-repeated-on-every-render)
   - [`useMemo` Syntax and Behaviour](#72-usememo-syntax-and-behaviour)
   - [When to Use (and When NOT to Use) `useMemo`](#73-when-to-use-and-when-not-to-use-usememo)
8. [`React.memo()` — Preventing Child Re-renders](#8-reactmemo--preventing-child-re-renders)
   - [Why Children Re-render Even With Unchanged Props](#81-why-children-re-render-even-with-unchanged-props)
   - [`React.memo` Syntax and Behaviour](#82-reactmemo-syntax-and-behaviour)
   - [When `React.memo` Works and When It Does Not](#83-when-reactmemo-works-and-when-it-does-not)
9. [Value vs. Reference Types and Referential Equality](#9-value-vs-reference-types-and-referential-equality)
   - [Primitive Values — Compared by Value](#91-primitive-values--compared-by-value)
   - [Objects and Arrays — Compared by Reference](#92-objects-and-arrays--compared-by-reference)
   - [Why This Breaks `React.memo`](#93-why-this-breaks-reactmemo)
10. [`useMemo`, `React.memo`, and Referential Equality — Working Together](#10-usememo-reactmemo-and-referential-equality--working-together)
11. [`useCallback()` — Stabilising Function References](#11-usecallback--stabilising-function-references)
    - [The Problem: New Function on Every Render](#111-the-problem-new-function-on-every-render)
    - [`useCallback` Syntax and Behaviour](#112-usecallback-syntax-and-behaviour)
    - [`useMemo` vs `useCallback` — The Precise Difference](#113-usememo-vs-usecallback--the-precise-difference)
    - [When to Use `useCallback`](#114-when-to-use-usecallback)
12. [The Full Performance Decision Framework](#12-the-full-performance-decision-framework)
13. [Course Reference](#13-course-reference)

---

# 1. Why Performance Matters in React

React applications can feel instant when they are small. As they grow — more components, more state, more data — two categories of slowdown appear:

| Category | What causes it | Symptom |
|----------|---------------|---------|
| **Unnecessary re-renders** | A parent re-renders and forces all children to re-render, even children whose props did not change | UI feels sluggish on interactions; typing in an input lags |
| **Heavy initial load** | The entire JavaScript bundle — every page, every component — is downloaded before anything shows on screen | Slow first load, especially on mobile or slow connections |

React gives you a **layered toolbox** to address each:

```
┌─────────────────────────────────────────────────────────┐
│                  React Performance Toolbox               │
├─────────────────────────────────────────────────────────┤
│  MEASURE FIRST                                          │
│    React DevTools Profiler  →  find the actual problem  │
├─────────────────────────────────────────────────────────┤
│  REDUCE INITIAL LOAD                                    │
│    React.lazy() + <Suspense>  →  code splitting         │
├─────────────────────────────────────────────────────────┤
│  REDUCE UNNECESSARY RE-RENDERS                          │
│    React.memo()   →  skip re-rendering a component      │
│    useMemo()      →  skip re-running a calculation      │
│    useCallback()  →  stabilise a function reference     │
└─────────────────────────────────────────────────────────┘
```

> **The golden rule of React performance optimisation: measure before you optimise.** Adding `useMemo`, `useCallback`, and `React.memo` everywhere makes code harder to read and can actually make things *slower* due to the overhead of memoisation itself. Profile first. Fix only what is provably slow.

---

# 2. How React Renders — The Three Phases

Understanding *how* React renders is the foundation of understanding *why* things are slow. React's render process has three distinct phases. Confusing them — especially calling phase 1 "rendering to the DOM" — leads to wrong mental models.

## 2.1 Phase 1 — Render

```jsx
// When state changes, React calls your component function again
function Counter() {
    const [count, setCount] = React.useState(0)

    // ↓ This entire function body runs on every render
    console.log("Counter rendering")   // prints on every state change

    return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

**Rendering** (in React's vocabulary) means **calling your component function**. React calls the function, the function returns a JSX description of the UI, and React holds that description in memory as a **virtual DOM tree** (also called a React element tree or fibre tree).

The render phase is **pure** — it has **no side effects**. React may call your component function multiple times (in StrictMode it intentionally does this). No DOM changes happen yet.

```
State changes → React schedules a render → React calls your component function
                                          → function returns JSX (virtual DOM)
                                          → render phase complete
```

## 2.2 Phase 2 — Reconcile (Diffing)

React now has **two virtual DOM trees**: the one from before the state change (old) and the one from after (new). The **reconciler** (also called the diffing algorithm) compares them tree-by-tree, node-by-node, to find the minimum set of changes needed.

```
Old virtual DOM:              New virtual DOM:
<div>                         <div>
  <h1>Hello</h1>                <h1>Hello</h1>       ← same, no change
  <p>Count: 0</p>               <p>Count: 1</p>      ← text changed
  <button>+</button>            <button>+</button>   ← same, no change
</div>                        </div>

Reconciler diff result: update the text content of <p> only
```

React's diffing is based on **keys** and **element types**. If the type changes (`<p>` → `<div>`), React destroys the old subtree and builds a new one. If only the props change, React updates in place.

## 2.3 Phase 3 — Commit

The reconciler hands React's **renderer** (react-dom for web) the list of changes. The renderer **actually modifies the real DOM**. This is the only phase that touches the browser.

After committing, React runs `useEffect` cleanup for removed effects, then runs `useLayoutEffect`, then (asynchronously) runs `useEffect`.

```
┌──────────────────────────────────────────────────────────┐
│  Render Phase                                            │
│   Component functions called → virtual DOM produced     │
│   (no DOM changes, no side effects)                      │
│                              ↓                           │
│  Reconcile Phase                                         │
│   Old tree vs new tree → list of changes computed        │
│                              ↓                           │
│  Commit Phase                                            │
│   Real DOM updated → useLayoutEffect runs                │
│                    → useEffect runs (async)              │
└──────────────────────────────────────────────────────────┘
```

## 2.4 What "Rendering" Does NOT Mean

This is a common source of confusion. In React:

| Statement | True or False? |
|-----------|---------------|
| "Rendering" means updating the DOM | ❌ False — rendering is calling the component function (Phase 1) |
| A component renders every time its state or its parent's state changes | ✅ True |
| Every render causes a DOM update | ❌ False — if the virtual DOM output is identical, nothing is committed |
| Rendering is expensive | It depends — calling a simple function is cheap; calling a function with heavy calculations is expensive |

> React separates "figuring out what should be on screen" (render + reconcile) from "actually making it happen" (commit). Most performance optimisation work targets the render phase — preventing unnecessary calls to component functions.

---

# 3. Recursive Rendering — Why Child Components Re-render

This is the single most important concept in React performance. Understanding it makes every other tool in this module make sense.

**When a component renders, every component inside its return statement also renders — recursively.**

```jsx
function App() {
    const [count, setCount] = React.useState(0)

    // When setCount is called, App re-renders.
    // App's return statement contains <Header />, <Main />, <Footer />.
    // React calls Header(), Main(), and Footer() — even if count has
    // nothing to do with Header or Footer.

    return (
        <div>
            <Header />          {/* ← re-renders */}
            <Main count={count} /> {/* ← re-renders */}
            <Footer />          {/* ← re-renders */}
        </div>
    )
}

function Header() {
    console.log("Header renders")
    // Header renders every time App renders, even though it
    // receives no props and has no state of its own.
    return <header>My App</header>
}
```

The recursive cascade:

```
App state changes (count: 0 → 1)
  └── App() called
        ├── Header() called      ← unnecessary
        ├── Main() called
        │     └── Sidebar() called  ← unnecessary if Sidebar doesn't use count
        │           └── NavItem() × 5  ← all unnecessary
        └── Footer() called      ← unnecessary
```

In a small app, this is completely fine — calling a few functions is microseconds of work. In a large app with deeply nested trees and expensive computations, this cascading re-render can cause visible lag.

```
The core question of React performance optimisation:
"This component just re-rendered — was that render necessary?"

If yes  → that render is expected and correct behaviour
If no   → that is a "wasted render" and is a candidate for optimisation
```

---

# 4. Using React DevTools to Measure Performance

Before optimising anything, you need evidence. React DevTools gives you two powerful tools to identify where time is being spent.

## 4.1 The Profiler Tab

The **Profiler** records a "flamegraph" of every render that occurred during a recorded session.

```
How to use the Profiler:
1. Open Chrome DevTools → "⚛ Profiler" tab
2. Click the record button (●)
3. Interact with your app (click buttons, type, etc.)
4. Click stop
5. React shows a flamegraph of every component render
```

Reading the flamegraph:

```
┌─────────────────────────────────────────────────────────────────┐
│  Flamegraph — one bar per component                             │
│                                                                 │
│  App ████████████████████████████████████ 12ms                  │
│   ├── Header █ 0.3ms                                            │
│   ├── Main ████████████████████████ 10ms  ← SLOW               │
│   │    ├── ExpensiveList ██████████ 8ms   ← this is the problem │
│   │    └── Sidebar █ 0.4ms                                      │
│   └── Footer █ 0.2ms                                            │
│                                                                 │
│  Colour key:  grey = did not render   yellow = rendered, slower │
│               green = rendered, fast  blue  = rendered, fastest │
└─────────────────────────────────────────────────────────────────┘
```

The flamegraph tells you:
- **Which components rendered** during the interaction
- **How long each took** (in milliseconds)
- **Why they rendered** (state change, parent re-render, context change)

## 4.2 Highlighting Re-renders

In React DevTools settings, enable **"Highlight updates when components render"**. Every component that re-renders flashes with a coloured border in real time as you interact with the app.

```
Setting location:
  React DevTools (⚛) → Settings ⚙ → General →
  ☑ Highlight updates when components render
```

This is the fastest way to spot unnecessary re-renders without recording a full profile. If you type into a search input and you see the entire page flash — including parts that have nothing to do with search — that is a sign that state is being held too high up in the tree.

> **Profile on a production build when possible.** React's development mode includes many extra checks that make it slower than production. Use `npm run build` + `npx serve dist` (or `vite preview`) and profile that. The relative differences between components will be the same, but the absolute timings will be more accurate.

---

# 5. React StrictMode

`<React.StrictMode>` is a development-only tool that deliberately stresses your components to help you find bugs. It has no effect in production builds.

```jsx
// main.jsx or index.js
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
```

## 5.1 StrictMode Double-Renders Components

In development, StrictMode **calls every component function twice** on each render and then discards the result of the first call.

```jsx
function MyComponent() {
    console.log("rendered")   // prints TWICE in development with StrictMode
    return <div>Hello</div>
}

// Console output (development + StrictMode):
// rendered
// rendered

// Console output (production, or without StrictMode):
// rendered
```

**Why does React do this?** It is deliberately exposing a class of bugs. If your component function has **side effects in the render body** (directly in the function, not inside `useEffect`), double-rendering will reveal them because the side effects will run twice unexpectedly.

```jsx
// ❌ This bug is exposed by StrictMode
let count = 0

function BadComponent() {
    count++   // ← side effect in render body — runs twice per render in StrictMode
    return <div>Count: {count}</div>
    // Shows 2 instead of 1, because count++ ran twice
}

// ✅ This is correct — side effects belong in useEffect
function GoodComponent() {
    React.useEffect(() => {
        count++   // ← runs after render, controlled by React
    }, [])
    return <div>Hello</div>
}
```

The rule React is enforcing: **component functions must be pure**. Given the same props and state, they must return the same JSX. A pure function can be called any number of times with the same input and always produces the same output with no observable side effects.

## 5.2 StrictMode Re-runs Side Effects

In addition to double-rendering, StrictMode also **runs every `useEffect` twice** — it mounts the component, unmounts it (running cleanup), then mounts it again.

```
StrictMode useEffect lifecycle (development only):
  1. Component mounts   → useEffect runs
  2. Component unmounts → cleanup function runs
  3. Component mounts   → useEffect runs again
  (from here: normal lifecycle)
```

```jsx
// This useEffect fires twice in StrictMode (once, cleanup, once again)
useEffect(() => {
    const connection = createConnection()   // establish a connection
    connection.connect()

    return () => {
        connection.disconnect()   // cleanup — called after unmount
    }
}, [])
```

**Why?** This simulates React's upcoming ability to pause, resume, and re-mount components (used in features like Offscreen/Activity). If your cleanup function correctly reverses the setup, the double-run is harmless. If it does not — if `connect()` is called twice and leaves a dangling connection — StrictMode reveals the bug.

| StrictMode behaviour | Purpose | Happens in production? |
|--------------------|---------|----------------------|
| Double-invokes component functions | Catches impure render functions | ❌ No |
| Double-invokes `useEffect` (mount/unmount/mount) | Catches missing cleanup functions | ❌ No |
| Warns about deprecated APIs | Migration guidance | ❌ No (warn only) |

> If you see your `useEffect` firing twice in development, it is **not a bug** — it is StrictMode doing its job. Fix the behaviour to be safe with double-runs, not to suppress the double-run.

---

# 6. Code Splitting — `lazy()` and `<Suspense>`

## 6.1 The Problem: One Giant Bundle

By default, a build tool (Vite, webpack) bundles your entire React application into a single JavaScript file. The browser must download, parse, and execute the entire bundle before it can show anything.

```
Without code splitting:
  User visits /home
    ↓
  Browser downloads: bundle.js (500 KB)
    ↓  (contains: HomePage, AboutPage, DashboardPage, AdminPage,
    ↓   Charts library, PDF generator, Map library...)
  Browser parses and executes all 500 KB
    ↓
  Page visible to user
```

The user visiting `/home` is downloading code for the admin panel and the PDF generator they will never use on this visit.

## 6.2 `React.lazy()` — Dynamic Import

`React.lazy()` wraps a **dynamic import** so that React can load a component asynchronously — only when it is actually needed.

```jsx
// ❌ Static import — included in the main bundle regardless
import HeavyDashboard from "./HeavyDashboard"

// ✅ Dynamic import with React.lazy — loaded in a separate chunk, on demand
const HeavyDashboard = React.lazy(() => import("./HeavyDashboard"))
```

The argument to `React.lazy()` is a function that returns a `Promise` resolving to a module with a **default export** that is a React component.

```jsx
// The dynamic import() returns a Promise:
import("./HeavyDashboard")
// Resolves to: { default: HeavyDashboard }
// React.lazy extracts the default export automatically
```

When `HeavyDashboard` is first rendered, the browser makes a new network request to download the chunk containing that component. This is called **on-demand loading** or **lazy loading**.

## 6.3 `<Suspense>` — The Loading Boundary

While a lazy component is being downloaded, there is a moment where React cannot render it yet. `<Suspense>` provides a **fallback UI** to show during that loading window.

```jsx
import React from "react"

const HeavyDashboard = React.lazy(() => import("./HeavyDashboard"))

function App() {
    return (
        <React.Suspense fallback={<div>Loading dashboard...</div>}>
            <HeavyDashboard />
        </React.Suspense>
    )
}
```

```
Timeline:
  1. App renders → HeavyDashboard chunk not downloaded yet
  2. React sees lazy component → throws a Promise (internally)
  3. <Suspense> catches the Promise → renders fallback: <div>Loading...</div>
  4. Chunk downloads → Promise resolves
  5. React re-renders → HeavyDashboard renders instead of fallback
```

`<Suspense>` can wrap any number of lazy components. If multiple lazy components are loading simultaneously, the fallback shows until **all** of them are ready.

```jsx
// Multiple lazy components under one Suspense boundary
<React.Suspense fallback={<PageSkeleton />}>
    <LazyHeader />
    <LazyContent />
    <LazyFooter />
</React.Suspense>
// PageSkeleton shows until all three chunks have loaded
```

## 6.4 Code Splitting in Practice

The most common and highest-impact place to apply code splitting is **route-level splitting** — loading each page's code only when the user navigates to it.

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"

// Each route is lazy — its chunk is loaded when the user first visits that route
const Home      = React.lazy(() => import("./pages/Home"))
const About     = React.lazy(() => import("./pages/About"))
const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Admin     = React.lazy(() => import("./pages/Admin"))

function App() {
    return (
        <BrowserRouter>
            <React.Suspense fallback={<div className="page-loading">Loading...</div>}>
                <Routes>
                    <Route path="/"          element={<Home />} />
                    <Route path="/about"     element={<About />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin"     element={<Admin />} />
                </Routes>
            </React.Suspense>
        </BrowserRouter>
    )
}
```

```
Network result:
  User visits /         → downloads: main.js + home.chunk.js  (small)
  User navigates to /about → downloads: about.chunk.js         (cached: main.js)
  User navigates to /admin → downloads: admin.chunk.js          (never downloaded if never visited)
```

| Approach | When to use |
|----------|------------|
| Route-level splitting | Always — highest return, lowest complexity |
| Component-level splitting | When a component is large AND conditionally rendered (modal, drawer, tab panel) |
| Library-level splitting | When a heavy library (chart, map, PDF) is only used on specific pages |

> Do NOT lazy-load everything. Components that always render on first load (the main layout, the navigation, the hero section) should stay in the main bundle. Lazy loading adds a network round-trip — that is slower, not faster, for things the user needs immediately.

---

# 7. `useMemo()` — Caching Expensive Calculations

## 7.1 The Problem: Work Repeated on Every Render

Every time a component renders, every line of code inside the function body runs again. If that code includes an expensive computation — filtering a large array, sorting thousands of items, running a complex algorithm — it runs on every single render, even if the data it depends on has not changed.

```jsx
function ProductList({ products, filterText, sortOrder }) {
    // This runs on every render of ProductList — even if only sortOrder changed
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(filterText.toLowerCase())
    )

    // This also runs on every render
    const sorted = filtered.sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
    )

    return sorted.map(p => <ProductCard key={p.id} product={p} />)
}
```

If `products` contains 10,000 items and the user changes `sortOrder`, the filter runs again over all 10,000 items even though `filterText` and `products` did not change. This is wasted work.

## 7.2 `useMemo` Syntax and Behaviour

```jsx
const memoizedValue = React.useMemo(() => {
    // expensive computation here
    return computeExpensiveResult(a, b)
}, [a, b])
//  ↑ dependencies array — same rules as useEffect
```

`useMemo` takes:
1. A **factory function** — the computation to cache (`() => expensiveWork()`)
2. A **dependencies array** — the values the computation depends on

On the first render, `useMemo` calls the factory function and caches the result. On subsequent renders, it compares the dependencies to their previous values. If **nothing in the deps array changed**, it **returns the cached result without calling the factory function**. Only if a dependency changes does it re-run the computation.

```jsx
function ProductList({ products, filterText, sortOrder }) {
    // filtered only recomputes when products or filterText changes
    const filtered = React.useMemo(() => {
        return products.filter(p =>
            p.name.toLowerCase().includes(filterText.toLowerCase())
        )
    }, [products, filterText])

    // sorted only recomputes when filtered or sortOrder changes
    const sorted = React.useMemo(() => {
        return [...filtered].sort((a, b) =>
            sortOrder === "asc" ? a.price - b.price : b.price - a.price
        )
    }, [filtered, sortOrder])

    return sorted.map(p => <ProductCard key={p.id} product={p} />)
}
```

Now if the user changes `sortOrder` (but not `filterText` or `products`), only the sort runs — the filter is skipped. If the user changes `filterText`, both run (because `filtered` changes, which changes `sorted`'s dependency).

```
Without useMemo:
  products changes → filter runs + sort runs   ✅ correct
  filterText changes → filter runs + sort runs ✅ correct
  sortOrder changes → filter runs + sort runs  ❌ filter was wasted

With useMemo:
  products changes → filter runs + sort runs   ✅ correct
  filterText changes → filter runs + sort runs ✅ correct
  sortOrder changes → filter SKIPPED + sort runs ✅ efficient
```

## 7.3 When to Use (and When NOT to Use) `useMemo`

`useMemo` is not free. It has overhead:
- React must **store** the cached value in memory
- React must **compare** the dependencies array on every render
- The factory function is a closure that keeps dependencies alive in memory

For cheap computations, this overhead is **more expensive** than just re-running the computation.

```jsx
// ❌ Bad use of useMemo — adding cost for zero benefit
const fullName = React.useMemo(() => {
    return `${firstName} ${lastName}`
}, [firstName, lastName])
// String concatenation is microseconds — useMemo overhead is not worth it

// ✅ Good use — useMemo without useMemo would be wasteful
const sortedItems = React.useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name))
}, [items])
// Sorting 5,000 items is measurably slow — caching the result is worth it
```

| Situation | Use `useMemo`? |
|-----------|---------------|
| Filtering/sorting a large array (1000+ items) | ✅ Yes — likely worth it |
| Simple arithmetic: `price * quantity` | ❌ No — cheaper than memoisation overhead |
| Building a complex derived data structure from raw state | ✅ Probably yes — measure first |
| `const x = a + b` | ❌ Absolutely not |
| Creating an object to pass as a prop (for `React.memo` compatibility) | ✅ Yes — for referential stability, see Section 9 |
| The component rarely re-renders | ❌ No — memoisation only helps on re-renders |

> **The benchmark test for `useMemo`:** Wrap the computation in `console.time('label')` / `console.timeEnd('label')` and interact with the app. If you see the label taking more than ~1ms repeatedly, it may be worth memoising. If it takes 0.01ms, skip it.

---

# 8. `React.memo()` — Preventing Child Re-renders

## 8.1 Why Children Re-render Even With Unchanged Props

Recall from [Section 3](#3-recursive-rendering--why-child-components-re-render): when a parent renders, all its children render too. This happens **regardless of whether the children's props changed**.

```jsx
function Parent() {
    const [count, setCount] = React.useState(0)

    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
            <ExpensiveChild name="Alice" />
            {/* ExpensiveChild re-renders every time count changes,
                even though its name prop never changes */}
        </div>
    )
}
```

`ExpensiveChild` receives `name="Alice"` every single time. The value never changes. But React still calls `ExpensiveChild()` on every render of `Parent`. This is the default behaviour — React errs on the side of correctness over performance.

## 8.2 `React.memo` Syntax and Behaviour

`React.memo` is a **higher-order component** — it wraps another component and adds prop-comparison logic around it.

```jsx
// Without React.memo
function ExpensiveChild({ name }) {
    console.log("ExpensiveChild renders")
    return <div>Hello, {name}</div>
}

// With React.memo
const ExpensiveChild = React.memo(function ExpensiveChild({ name }) {
    console.log("ExpensiveChild renders")
    return <div>Hello, {name}</div>
})

// Alternative: wrap after definition
const MemoizedChild = React.memo(ExpensiveChild)
```

How it works:

```
First render of Parent:
  → React calls ExpensiveChild() — renders normally

Parent re-renders (count changes):
  → React asks: "Did ExpensiveChild's props change?"
  → React compares: prevProps.name === nextProps.name → "Alice" === "Alice" → true
  → Props did NOT change → React SKIPS calling ExpensiveChild()
  → Previous render output is reused — no re-render, no DOM update
```

`React.memo` performs a **shallow comparison** of all props between renders. If every prop is shallowly equal to its previous value, the re-render is skipped.

## 8.3 When `React.memo` Works and When It Does Not

`React.memo` is powerful but has a critical limitation: **it uses shallow equality** (`Object.is`). This works perfectly for primitive props but fails silently for object/array/function props.

```jsx
// ✅ React.memo works — primitive props
<MemoizedChild name="Alice" age={30} isActive={true} />
// "Alice" === "Alice" ✅, 30 === 30 ✅, true === true ✅ → skipped

// ❌ React.memo does NOT work — new object on every render
<MemoizedChild style={{ color: "red" }} />
// { color: "red" } !== { color: "red" } (different reference) → NOT skipped
// React.memo re-renders even though the visual result is identical

// ❌ React.memo does NOT work — new function on every render
<MemoizedChild onClick={() => handleClick(id)} />
// () => handleClick(id) is a new function each render → NOT skipped
```

This is the entire motivation for Section 9 (referential equality) and Section 11 (`useCallback`). `React.memo` solves child re-renders only when props are referentially stable.

---

# 9. Value vs. Reference Types and Referential Equality

This section explains *why* objects and functions break `React.memo`, and is the conceptual bridge to `useMemo` and `useCallback`.

## 9.1 Primitive Values — Compared by Value

Primitive types in JavaScript: `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`.

```javascript
const a = 42
const b = 42
console.log(a === b)   // true — compared by VALUE

const x = "hello"
const y = "hello"
console.log(x === y)   // true — same characters = same value
```

When React's shallow comparison runs `prevProps.count === nextProps.count` and both are `42`, the result is `true`. The prop is unchanged. `React.memo` correctly skips the re-render.

## 9.2 Objects and Arrays — Compared by Reference

Non-primitive types in JavaScript: `object`, `array`, `function`.

```javascript
const obj1 = { color: "red" }
const obj2 = { color: "red" }
console.log(obj1 === obj2)   // false ← different objects in memory

const arr1 = [1, 2, 3]
const arr2 = [1, 2, 3]
console.log(arr1 === arr2)   // false ← different arrays in memory

const fn1 = () => {}
const fn2 = () => {}
console.log(fn1 === fn2)     // false ← different functions in memory
```

Two objects/arrays/functions with identical contents are **not equal** by `===` — because `===` checks whether they point to the same location in memory, not whether they contain the same data.

## 9.3 Why This Breaks `React.memo`

On every render of a parent component, every value created inside the function body is **recreated**:

```jsx
function Parent() {
    const [count, setCount] = React.useState(0)

    // On EVERY render, a new object is created at a new memory address
    const style = { color: "red" }

    // On EVERY render, a new function is created at a new memory address
    const handleClick = () => console.log("clicked")

    return (
        <MemoizedChild style={style} onClick={handleClick} />
    )
}
```

```
Parent renders (count: 0 → 1):
  → style    = { color: "red" }  ← new object (address 0x001)
  → style    = { color: "red" }  ← new object (address 0x002)   different!
  → React.memo checks: prevProps.style === nextProps.style
  → 0x001 !== 0x002   → false → props CHANGED → MemoizedChild re-renders

Even though style looks identical, it is a different object in memory.
React.memo cannot tell they are logically the same.
```

This is **referential equality** — equality based on memory reference, not value. It is the reason `React.memo` alone is not enough when props include objects or functions.

---

# 10. `useMemo`, `React.memo`, and Referential Equality — Working Together

The solution to the problem in Section 9 is to use `useMemo` to create **stable references** for objects and arrays — references that do not change between renders unless the underlying data changes.

```jsx
function Parent() {
    const [count, setCount] = React.useState(0)
    const [name, setName]   = React.useState("Alice")

    // ❌ Without useMemo — new object on every render
    // const style = { color: "red" }

    // ✅ With useMemo — same object reference as long as deps don't change
    const style = React.useMemo(() => ({ color: "red" }), [])
    //  style is created once and the same reference is returned on every render
    //  → React.memo's comparison: prevProps.style === nextProps.style → true ✅

    return (
        <>
            <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
            <MemoizedChild style={style} name={name} />
        </>
    )
}
```

The combination that actually prevents unnecessary re-renders:

```
React.memo      →  wraps the child, enables prop comparison
useMemo         →  stabilises object/array prop references
useCallback     →  stabilises function prop references (Section 11)

All three are needed when:
  • The child is expensive to render
  • AND the parent re-renders often
  • AND one or more props are objects, arrays, or functions
```

```
Parent renders (count changes):

  WITHOUT memoisation:
    style = new { color: "red" } every render
    → MemoizedChild re-renders (referential equality fails)

  WITH useMemo for style:
    style = same reference (useMemo cached it)
    → MemoizedChild.memo check: style unchanged ✅ → SKIPPED ✅
```

> Wrapping a child in `React.memo` without stabilising its object/function props with `useMemo`/`useCallback` is one of the most common mistakes in React performance work. The child will still re-render on every parent render because the props always look different even though they are logically the same.

---

# 11. `useCallback()` — Stabilising Function References

## 11.1 The Problem: New Function on Every Render

Functions created inside a component body are recreated on every render — just like objects. This means passing a function as a prop to a `React.memo`-wrapped child will always cause a re-render, because the function reference changes every time.

```jsx
function Parent() {
    const [count, setCount] = React.useState(0)

    // New function created on every render of Parent
    const handleItemClick = (id) => {
        console.log("clicked item", id)
        setCount(c => c + 1)
    }

    return (
        <MemoizedList onItemClick={handleItemClick} />
    )
}
```

Every time `count` changes and `Parent` re-renders, `handleItemClick` is a brand new function at a new memory address. `React.memo` on `MemoizedList` sees `prevProps.onItemClick !== nextProps.onItemClick` and re-renders `MemoizedList` — defeating the purpose of memoising it.

## 11.2 `useCallback` Syntax and Behaviour

```jsx
const stableFunction = React.useCallback(() => {
    // function body
}, [dependencies])
```

`useCallback` caches a **function definition** across renders. It takes:
1. The **function to memoize**
2. A **dependencies array** — the values the function closes over that, when changed, should produce a new function

```jsx
function Parent() {
    const [count, setCount] = React.useState(0)

    // handleItemClick now has a stable reference.
    // React returns the SAME function object across renders
    // as long as the dependencies don't change.
    const handleItemClick = React.useCallback((id) => {
        console.log("clicked item", id)
        setCount(c => c + 1)
    }, [])  // ← no deps: setCount is stable (React guarantees this)

    return (
        <MemoizedList onItemClick={handleItemClick} />
    )
}
```

```
Parent renders (count: 0 → 1):
  → handleItemClick = same function reference (useCallback returned cached version)
  → React.memo on MemoizedList checks: prevProps.onItemClick === nextProps.onItemClick
  → same reference → true → MemoizedList SKIPPED ✅
```

## 11.3 `useMemo` vs `useCallback` — The Precise Difference

These two hooks are often confused. The key distinction:

```jsx
// useMemo — caches the RESULT of calling the function
const sortedItems = React.useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name))
}, [items])
// sortedItems is the SORTED ARRAY (the return value)

// useCallback — caches the FUNCTION ITSELF (does not call it)
const handleSort = React.useCallback(() => {
    setSortedItems(items.sort((a, b) => a.name.localeCompare(b.name)))
}, [items])
// handleSort is the FUNCTION (not its return value)
```

They are actually equivalent in implementation — `useCallback(fn, deps)` is exactly the same as `useMemo(() => fn, deps)`:

```javascript
// These two lines are exactly equivalent:
useCallback(fn, deps)
useMemo(() => fn, deps)

// useCallback is just a more readable alias for the common case of
// memoising a function rather than a computed value.
```

| Hook | What it caches | Returns | Use case |
|------|---------------|---------|----------|
| `useMemo` | The **result** of calling a function | The cached computed value | Expensive calculations, stable object/array references |
| `useCallback` | The **function itself** | The cached function reference | Stable event handler references to pass to memoised children |

## 11.4 When to Use `useCallback`

```jsx
// ✅ Good use — handler passed to a React.memo child
const handleDelete = React.useCallback((id) => {
    setItems(prev => prev.filter(item => item.id !== id))
}, [])

// ✅ Good use — function passed as a dependency to useEffect in a child
// (without useCallback, the child's useEffect would fire on every parent render)
const fetchData = React.useCallback(() => {
    return fetch(`/api/items?page=${page}`)
}, [page])

// ❌ Unnecessary — function is not passed to a memoised component or useEffect
const handleInternalClick = React.useCallback(() => {
    setOpen(true)
}, [])
// If no child or hook depends on handleInternalClick's reference being stable,
// useCallback adds overhead with no benefit.
```

| Situation | Use `useCallback`? |
|-----------|------------------|
| Passed as a prop to a `React.memo`-wrapped child | ✅ Yes — stabilises the reference |
| Passed as a dependency to a child's `useEffect` | ✅ Yes — prevents the effect from re-running unnecessarily |
| Used only internally in the same component | ❌ No — stability is irrelevant if it never leaves the component |
| The parent rarely re-renders | ❌ Probably not — the optimisation pays off only on frequent re-renders |

> `useCallback` does not make the function run faster. It does not cache the function's return value. It only ensures the same function object is returned across renders. Its purpose is purely to maintain referential equality for functions passed to other components or hooks.

---

# 12. The Full Performance Decision Framework

Use this decision tree every time you think you need a performance optimisation.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  Is there an actual, user-visible performance problem?                  │
│  (lag, jank, slow load — confirmed by observation or complaint)         │
│                                                                         │
│  NO → Stop. Do not optimise. Premature optimisation adds complexity    │
│        without measurable benefit.                                      │
│                                                                         │
│  YES ↓                                                                  │
│                                                                         │
│  Profile with React DevTools Profiler                                   │
│  Which components are taking the most time?                             │
│                                                                         │
│  ├── Slow initial page load (large bundle)?                             │
│  │     └── Apply Code Splitting: React.lazy() + <Suspense>             │
│  │         at the route level first, then for heavy conditional UIs    │
│  │                                                                      │
│  └── Slow interaction / typing / clicking?                              │
│        │                                                                │
│        ├── Expensive calculation runs on every render?                  │
│        │     └── Wrap the calculation in useMemo()                     │
│        │                                                                │
│        ├── Child component re-renders when its props haven't changed?   │
│        │     └── Wrap child with React.memo()                          │
│        │         │                                                      │
│        │         └── Props include objects or arrays?                   │
│        │               └── Stabilise with useMemo() in the parent      │
│        │                                                                │
│        │             Props include functions?                           │
│        │               └── Stabilise with useCallback() in the parent  │
│        │                                                                │
│        └── State is held too high and causes many unnecessary renders?  │
│              └── Move state down: lift state to the lowest component   │
│                  that needs it — no hook needed, just refactoring      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## The Correct Order of Application

```
1. Profile              → find the real bottleneck
2. Refactor first       → often, moving state down / lifting computation up fixes it
3. React.memo           → if a child re-renders unnecessarily
4. useMemo              → for expensive computations OR stable object props
5. useCallback          → for stable function props to React.memo children
6. Code splitting       → for initial load time
```

## Mental Model Summary

```
┌─────────────────┬─────────────────────────────────────────────────────┐
│ Tool            │ One-line explanation                                 │
├─────────────────┼─────────────────────────────────────────────────────┤
│ React.memo      │ "Don't re-render this child if its props haven't     │
│                 │  changed"                                            │
├─────────────────┼─────────────────────────────────────────────────────┤
│ useMemo         │ "Don't re-run this expensive calculation if its       │
│                 │  inputs haven't changed"                             │
├─────────────────┼─────────────────────────────────────────────────────┤
│ useCallback     │ "Don't create a new function reference if its         │
│                 │  dependencies haven't changed"                       │
├─────────────────┼─────────────────────────────────────────────────────┤
│ React.lazy      │ "Don't download this component's code until it       │
│                 │  is actually needed"                                 │
├─────────────────┼─────────────────────────────────────────────────────┤
│ Suspense        │ "Show this fallback UI while waiting for a lazy       │
│                 │  component to load"                                  │
├─────────────────┼─────────────────────────────────────────────────────┤
│ StrictMode      │ "Intentionally stress my components in development   │
│                 │  to find bugs before production"                     │
└─────────────────┴─────────────────────────────────────────────────────┘
```

## Common Mistakes to Avoid

| Mistake | Why it's wrong | Correct approach |
|---------|---------------|-----------------|
| Adding `useMemo` to every computed value | Adds overhead that outweighs the savings for cheap operations | Only memoize genuinely expensive computations |
| Wrapping every child in `React.memo` | Same overhead issue; makes code harder to read | Only memoize components that provably re-render unnecessarily |
| Using `React.memo` without stabilising object/function props | The memo check always fails — the child still re-renders | Pair `React.memo` with `useMemo`/`useCallback` for non-primitive props |
| Forgetting to include dependencies in `useCallback`/`useMemo` | Creates stale closures — the function/value captures old variable values | Always list every component-scoped variable the callback uses |
| Lazy-loading every component | Adds network latency for small components that should load immediately | Only lazy-load at route level or for genuinely large, conditional components |
| Optimising without profiling | You fix the wrong thing or nothing measurable | Profile first — always |

---

# 13. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 15. Advanced React.js
* **Section:** 02. Performance
* **Topics covered:** Recursive rendering · Three phases of rendering · React DevTools Profiler · StrictMode · Code splitting with `React.lazy` + `<Suspense>` · `useMemo` · `React.memo` · Value vs reference types · Referential equality · `useCallback`
