# Tenzies — React.js Fundamentals Capstone #1

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Hooks](https://img.shields.io/badge/Hooks-useState%20%7C%20useEffect%20%7C%20useRef-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-Grid%20%7C%20Flexbox-blue?style=flat-square&logo=css3)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Karla-red?style=flat-square&logo=googlefonts)
![nanoid](https://img.shields.io/badge/nanoid-Unique%20IDs-lightgrey?style=flat-square)
![react-confetti](https://img.shields.io/badge/react--confetti-Win%20Animation-ff69b4?style=flat-square)
![Accessibility](https://img.shields.io/badge/a11y-ARIA%20Live%20%7C%20aria--pressed-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A fully interactive dice game where players roll and hold dice until all ten show the same number — the **Tenzies** Capstone Project #1 from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every React concept exercised in this capstone, comparing what is consolidated here against the earlier modules — specifically React State (13/04) and Side Effects (13/05) — while introducing `useRef`, lazy state initialisation, win detection via derived state, and accessibility patterns.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is a Capstone Project?](#3-what-is-a-capstone-project)
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [Component Architecture](#5-component-architecture)
   - [The `<App />` Component](#51-the-app--component)
   - [The `<Die />` Component](#52-the-die--component)
6. [State Design — Dice as Objects](#6-state-design--dice-as-objects)
   - [Why Objects Instead of Numbers](#61-why-objects-instead-of-numbers)
   - [Lazy State Initialisation](#62-lazy-state-initialisation)
7. [`generateAllNewDice()` — The Data Factory](#7-generateallnewdice--the-data-factory)
8. [Derived State — `gameWon`](#8-derived-state--gamewon)
9. [Holding Dice — Immutable State Updates](#9-holding-dice--immutable-state-updates)
   - [The `hold(id)` Function](#91-the-hold-id-function)
   - [Mapping Array to Components with Keys](#92-mapping-array-to-components-with-keys)
10. [Rolling Dice — Conditional Logic in State](#10-rolling-dice--conditional-logic-in-state)
11. [`useRef` — Focus Management on Win](#11-useref--focus-management-on-win)
    - [What `useRef` Is](#111-what-useref-is)
    - [Focusing the Button on Game Won](#112-focusing-the-button-on-game-won)
12. [Accessibility — `aria-live`, `aria-pressed`, `.sr-only`](#12-accessibility--aria-live-aria-pressed-sr-only)
    - [`aria-live="polite"` — Screen Reader Announcements](#121-aria-livepolite--screen-reader-announcements)
    - [`aria-pressed` — Toggle Button State](#122-aria-pressed--toggle-button-state)
    - [`.sr-only` — Visually Hidden Text](#123-sr-only--visually-hidden-text)
13. [CSS — Grid Layout for the Dice Board](#13-css--grid-layout-for-the-dice-board)
14. [How the Full App Flow Works](#14-how-the-full-app-flow-works)
15. [HTML Structure Recap — React Document Tree](#15-html-structure-recap--react-document-tree)
16. [How to Run](#16-how-to-run)
17. [Course Reference](#17-course-reference)

---

# 1. Project Overview

**Tenzies** is a classic dice game implemented as a single-page React application. The game starts with ten dice displaying random values between 1 and 6. The player clicks individual dice to "hold" them at their current value — held dice turn green and are skipped on the next roll. The goal is to get all ten dice showing the same number. When the player achieves this, confetti rains down and the roll button becomes "New Game".

The app includes:

* A **game title and instructions** rendered statically in JSX above the game board
* A **`<Die />` component** rendered ten times via `.map()` — each receiving its `value`, `isHeld` boolean, and a `hold` callback as props
* A **dice container** using CSS Grid (`repeat(5, 1fr)` × 2 rows) to display 10 die buttons in a 5×2 layout
* A **`gameWon` derived state** computed from `dice` using `.every()` — no separate boolean state is maintained
* A **roll/new-game button** that conditionally rolls unheld dice or resets the entire board depending on `gameWon`
* A **`useRef`** hooked to the button so keyboard focus jumps to it automatically when the game is won
* A **`<Confetti />`** component from `react-confetti` that renders conditionally on `gameWon`
* A **`aria-live="polite"` region** that announces the win message to screen readers without interrupting ongoing narration

The goal of this capstone is not just to build a game — it is to synthesise everything learned about `useState`, `useEffect`, component communication via props, derived state, unique keys with `nanoid`, and accessibility-first design into a complete, fully playable React application.

---

# 2. Project Structure

```
13. React.js Fundamentals/
│
└── 06. Capstone Project #1 - Tenzies/
    ├── index.html      → HTML shell: <div id="root">, Google Fonts (Karla), script module
    ├── index.jsx       → Entry point — ReactDOM.createRoot + root.render(<App />)
    ├── index.css       → Global styles: dark background, grid dice layout, .sr-only
    ├── App.jsx         → Root component — all game logic, state, useRef, useEffect, JSX
    └── Die.jsx         → Presentational component — renders one die button with ARIA attrs
```

---

# 3. What is a Capstone Project?

A **capstone project** in the Scrimba Fullstack path is a cumulative build that exercises every concept from all preceding modules in the current section without introducing fundamentally new APIs. There is no step-by-step guidance — the learner plans the component tree, decides the state shape, and implements the logic independently.

| Aspect | Description |
|--------|-------------|
| **Scope** | Combines React State + Side Effects knowledge into one complete app |
| **What is practised** | `useState`, `useEffect`, `useRef`, props, `.map()` with keys, derived state, conditional rendering, array immutability |
| **What is NOT introduced** | No new React hooks, no new APIs — consolidation only |
| **Difficulty** | Higher than prior modules — real design decisions must be made |

> The capstone is meant to reveal gaps in understanding. If the state shape is wrong, the entire game breaks — making state design the most important skill exercised here.

---

# 4. What's New vs Previous Projects

## New React Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `useRef(null)` | `App.jsx` line 8 | Creates a mutable ref object that persists across renders without triggering re-renders |
| `ref={buttonRef}` | `App.jsx` line 69 | Attaches the ref to the roll/new-game `<button>` DOM node |
| `buttonRef.current.focus()` | `App.jsx` line 15 | Programmatically moves keyboard focus to the button when the game is won |
| `() => generateAllNewDice()` (lazy init) | `App.jsx` line 7 | Passes a *function* to `useState` so the expensive initialiser runs only once, not on every render |
| `.every(callback)` | `App.jsx` lines 10–11 | Array method — returns `true` only if the callback returns `true` for **every** element |
| Derived state (`gameWon`) | `App.jsx` lines 10–11 | Computed from `dice` on every render — no separate `useState` call for the win condition |
| `nanoid()` | `App.jsx` line 25 | Generates a cryptographically random unique string ID for each die object |
| `aria-live="polite"` | `App.jsx` line 61 | Marks a region as a live region — screen readers announce its content when it changes |
| `aria-pressed={isHeld}` | `Die.jsx` line 10 | Communicates the toggle state of the die button to assistive technologies |

## New npm Packages

| Package | Import | Purpose |
|---------|--------|---------|
| `nanoid` | `import { nanoid } from "nanoid"` | Generates unique, collision-resistant IDs for each die — used as the React `key` |
| `react-confetti` | `import Confetti from "react-confetti"` | Renders an animated confetti shower when `gameWon` is `true` |

## Comparison: Side Effects (13/05) vs Tenzies Capstone (13/06)

| Feature | Side Effects | Tenzies |
|---------|-------------|---------|
| State shape | Object + array | Array of objects |
| `useEffect` usage | Data fetch on mount | Focus management on win |
| `useRef` | Not used | Core a11y feature — button focus |
| External API | Imgflip REST API | None — all data generated locally |
| Win condition | N/A | Derived state via `.every()` |
| Unique keys | N/A | `nanoid()` per die object |
| Accessibility | None | `aria-live`, `aria-pressed`, `.sr-only` |

---

# 5. Component Architecture

## 5.1 The `<App />` Component

```jsx
// App.jsx — the entire game lives in one component
import { useState, useRef, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const buttonRef = useRef(null)

    const gameWon = dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)

    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])
    // ... functions, JSX
}
```

`<App />` is the **single stateful component** in this project. It owns the entire `dice` array in state, computes `gameWon` as derived state, and passes callbacks down to `<Die />`. This is the classic **lifting state up** pattern — `<Die />` has no state of its own; it receives everything it needs as props.

| Responsibility | Handled by |
|---------------|-----------|
| Storing all 10 dice objects | `dice` state in `<App />` |
| Detecting the win condition | `gameWon` derived value in `<App />` |
| Generating new dice | `generateAllNewDice()` in `<App />` |
| Rolling / resetting the board | `rollDice()` in `<App />` |
| Toggling a die's held state | `hold(id)` in `<App />` |
| Rendering each die | `<Die />` — receives props from `<App />` |

## 5.2 The `<Die />` Component

```jsx
// Die.jsx — purely presentational
export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <button
            style={styles}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value},
            ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
    )
}
```

`<Die />` is a **presentational component** — it renders a single `<button>` whose background colour changes based on `props.isHeld`. It has no state, no side effects, and no logic beyond a ternary for the inline style. All behaviour is delegated upwards to `<App />` via `props.hold`.

| Prop | Type | Purpose |
|------|------|---------|
| `value` | `number` (1–6) | The number displayed on the die face |
| `isHeld` | `boolean` | Controls background colour: green if held, white if not |
| `hold` | `function` | Called `onClick` — toggles the held state of this die in `<App />` state |

> A component that receives a function as a prop and calls it on user interaction is said to be **calling back** to the parent. This is how child components communicate upward in React — they never modify parent state directly.

---

# 6. State Design — Dice as Objects

## 6.1 Why Objects Instead of Numbers

```jsx
// ❌ Naive approach — storing raw numbers
const [dice, setDice] = useState([1, 4, 2, 6, 3, 5, 1, 4, 2, 6])
// Problem: no way to track which die is held, no stable identity for React keys

// ✅ Correct approach — each die is an object
const [dice, setDice] = useState(() => generateAllNewDice())
// Each die: { value: 4, isHeld: false, id: "abc123xyz" }
```

Storing each die as an **object with three fields** solves three separate problems at once:

| Field | Type | Problem it solves |
|-------|------|-------------------|
| `value` | `number` (1–6) | The number the die currently shows |
| `isHeld` | `boolean` | Whether this specific die is frozen — cannot derive from value alone |
| `id` | `string` (nanoid) | Stable, unique identity for React's reconciler — used as the `key` prop |

Without `isHeld`, there is no way to know which dice are frozen between rolls. Without `id`, React would use array index as the key, which breaks when array elements are re-ordered or replaced — causing subtle rendering bugs.

## 6.2 Lazy State Initialisation

```jsx
// ❌ Eager initialisation — generateAllNewDice() runs on EVERY render
const [dice, setDice] = useState(generateAllNewDice())

// ✅ Lazy initialisation — the function is called only ONCE, on mount
const [dice, setDice] = useState(() => generateAllNewDice())
```

**Lazy state initialisation** means passing a *function reference* (not a function call) to `useState`. React calls this function only during the component's first render to compute the initial state. On subsequent renders, the function is ignored entirely.

```
First render:   useState(() => generateAllNewDice())
                 └── React calls the function → [10 die objects]
                 └── dice = [10 die objects]

Second render:  useState(() => generateAllNewDice())
                 └── React ignores the function
                 └── dice = existing state (unchanged)
```

> If the initial value is expensive to compute (array generation, random numbers, parsing), always pass a function to `useState`. Passing the result directly — `useState(expensiveComputation())` — runs that computation on every render, wasting CPU cycles.

---

# 7. `generateAllNewDice()` — The Data Factory

```jsx
// App.jsx
function generateAllNewDice() {
    return new Array(10)
        .fill(0)
        .map(() => ({
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }))
}
```

`generateAllNewDice` is a **pure function** that returns a fresh array of 10 die objects. Breaking it down step by step:

```
new Array(10)              → creates an array with 10 empty slots: [ , , , , , , , , ,  ]
.fill(0)                   → fills each slot with 0:               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
.map(() => ({...}))        → replaces each 0 with a die object:
                             [
                               { value: 4, isHeld: false, id: "aK3..." },
                               { value: 1, isHeld: false, id: "nR7..." },
                               ...8 more
                             ]
```

| Expression | Result |
|------------|--------|
| `Math.random()` | Float: `0.0` (inclusive) → `1.0` (exclusive), e.g. `0.732` |
| `Math.random() * 6` | Float: `0.0` → `5.999...`, e.g. `4.392` |
| `Math.ceil(Math.random() * 6)` | Integer: `1` → `6` — `Math.ceil` rounds UP, so `0.001` → `1`, never `0` |
| `nanoid()` | Random URL-safe string, e.g. `"V1StGXR8_Z5jdHi6B-myT"` |

> `Math.ceil` is used instead of `Math.floor` for dice values because `Math.floor(Math.random() * 6)` would produce `0–5`, and `Math.floor(Math.random() * 6) + 1` is needed to get `1–6`. `Math.ceil(Math.random() * 6)` achieves `1–6` directly, though note `Math.random() === 0` (very rare) would produce `0` with `ceil` — `Math.floor(...) + 1` is the more robust idiom.

---

# 8. Derived State — `gameWon`

```jsx
// App.jsx — gameWon is computed on every render, NOT stored in state
const gameWon = dice.every(die => die.isHeld) &&
    dice.every(die => die.value === dice[0].value)
```

`gameWon` is **derived state** — a value computed from existing state (`dice`) rather than stored in its own `useState`. The win condition requires two things:

1. **All dice are held** — `dice.every(die => die.isHeld)` returns `true` only if every die has `isHeld: true`
2. **All dice show the same value** — `dice.every(die => die.value === dice[0].value)` compares every die's value against the first die's value

```
dice = [
  { value: 4, isHeld: true },   ✅ held
  { value: 4, isHeld: true },   ✅ held, value matches [0]
  { value: 4, isHeld: true },   ✅ held, value matches [0]
  ...all 10 same
]
gameWon = true ✅

dice = [
  { value: 4, isHeld: true },   ✅ held
  { value: 4, isHeld: false },  ❌ NOT held → .every() short-circuits to false
  ...
]
gameWon = false ❌
```

| Approach | Problem |
|----------|---------|
| `useState(false)` for win | Would need to call `setGameWon(true)` manually — easy to forget, creates state synchronisation bugs |
| Derived value (used here) | Always correct — recalculated whenever `dice` changes; impossible to be out of sync |

> Whenever a value can be computed from existing state, compute it — do not store it. Derived state eliminates an entire class of synchronisation bugs where two state values contradict each other.

---

# 9. Holding Dice — Immutable State Updates

## 9.1 The `hold(id)` Function

```jsx
// App.jsx
function hold(id) {
    setDice(oldDice => oldDice.map(die =>
        die.id === id ?
            { ...die, isHeld: !die.isHeld } :
            die
    ))
}
```

`hold` receives the `id` of the die that was clicked and toggles its `isHeld` field. The update is **immutable** — `.map()` returns a **new array** rather than mutating the existing one.

```
Before hold("abc"):
  [{ id:"abc", value:4, isHeld:false }, { id:"xyz", value:2, isHeld:false }]

hold("abc") runs:
  die.id === "abc" → true  → { ...die, isHeld: !false } → { id:"abc", value:4, isHeld:true }
  die.id === "abc" → false → die (unchanged reference)

After hold("abc"):
  [{ id:"abc", value:4, isHeld:true }, { id:"xyz", value:2, isHeld:false }]
```

| Part of the update | Purpose |
|-------------------|---------|
| `oldDice.map(...)` | Produces a new array — React requires a new reference to detect the state change |
| `die.id === id ? ... : die` | Only the clicked die is changed; all others are returned as-is |
| `{ ...die, isHeld: !die.isHeld }` | Spread preserves `value` and `id`; only `isHeld` is overridden and toggled |

> Never mutate state directly (`die.isHeld = true`). React compares the old and new state references. Mutation leaves the reference unchanged, so React sees no change and skips the re-render — the UI silently breaks.

## 9.2 Mapping Array to Components with Keys

```jsx
// App.jsx
const diceElements = dice.map(dieObj => (
    <Die
        key={dieObj.id}
        value={dieObj.value}
        isHeld={dieObj.isHeld}
        hold={() => hold(dieObj.id)}
    />
))
```

Each `<Die />` in the array gets a stable `key={dieObj.id}` from `nanoid`. The `hold` prop is an **arrow function closure** — `() => hold(dieObj.id)` — that bakes the specific die's `id` into the callback before passing it down.

| Prop | Value passed | How it arrives in `<Die />` |
|------|---------|-----------------------------|
| `key` | `dieObj.id` (nanoid string) | Not accessible as a prop — used internally by React only |
| `value` | `dieObj.value` (1–6) | `props.value` — displayed as button text |
| `isHeld` | `dieObj.isHeld` (boolean) | `props.isHeld` — drives background colour |
| `hold` | `() => hold(dieObj.id)` | `props.hold` — called on button click |

---

# 10. Rolling Dice — Conditional Logic in State

```jsx
// App.jsx
function rollDice() {
    if (!gameWon) {
        setDice(oldDice => oldDice.map(die =>
            die.isHeld ?
                die :
                { ...die, value: Math.ceil(Math.random() * 6) }
        ))
    } else {
        setDice(generateAllNewDice())
    }
}
```

`rollDice` handles two distinct scenarios with a single function:

```
gameWon === false (game in progress):
  → .map() over dice
  → die.isHeld === true  → return die unchanged (held dice frozen)
  → die.isHeld === false → return { ...die, value: newRandomValue } (re-rolled)

gameWon === true (game over):
  → call generateAllNewDice() → fresh set of 10 dice, all isHeld: false
  → setDice(newDice) → full board reset
```

The button label also reflects this duality:

```jsx
<button ref={buttonRef} className="roll-dice" onClick={rollDice}>
    {gameWon ? "New Game" : "Roll"}
</button>
```

| `gameWon` | Button label | `rollDice()` action |
|-----------|-------------|---------------------|
| `false` | "Roll" | Re-roll all non-held dice |
| `true` | "New Game" | Generate 10 fresh dice, reset the board |

> Reusing the same button and handler for two behaviours (roll vs reset) keeps the JSX minimal. The `gameWon` boolean acts as the mode switch — one value controls both the UI label and the function's internal logic branch.

---

# 11. `useRef` — Focus Management on Win

## 11.1 What `useRef` Is

```jsx
// Syntax
const myRef = useRef(initialValue)
// myRef = { current: initialValue }
```

`useRef` returns a **mutable ref object** — a plain JavaScript object with a single `.current` property. Unlike state, changing `.current` does **not** trigger a re-render. The object persists for the entire lifetime of the component — the same object reference is returned on every render.

| Feature | `useState` | `useRef` |
|---------|-----------|---------|
| Triggers re-render when changed? | ✅ Yes | ❌ No |
| Persists across renders? | ✅ Yes | ✅ Yes |
| Primary use case | UI data that drives JSX | DOM node references, timers, previous values |
| How to read | `value` directly | `ref.current` |

The two main use cases for `useRef`:
1. **DOM access** — attaching to a JSX element with `ref={myRef}` gives direct access to the underlying DOM node via `myRef.current`
2. **Mutable instance variable** — storing a value that must persist across renders but must NOT trigger re-renders (e.g., a timer ID)

## 11.2 Focusing the Button on Game Won

```jsx
// App.jsx
const buttonRef = useRef(null)  // starts as null — no DOM node yet

useEffect(() => {
    if (gameWon) {
        buttonRef.current.focus()  // programmatically focus the button
    }
}, [gameWon])                       // runs whenever gameWon changes

// In JSX:
<button ref={buttonRef} className="roll-dice" onClick={rollDice}>
    {gameWon ? "New Game" : "Roll"}
</button>
```

```
Step 1: Component renders → <button ref={buttonRef}> mounts to DOM
Step 2: React sets buttonRef.current = the actual <button> DOM element

Step 3: User holds all 10 dice at the same value
Step 4: gameWon flips from false → true
Step 5: useEffect fires (gameWon is in the deps array, it changed)
Step 6: buttonRef.current.focus() → keyboard focus moves to the "New Game" button
Step 7: Screen reader announces: "New Game, button" — user knows the game ended
```

> `ref={buttonRef}` in JSX is not a regular prop — React intercepts it and never passes it to the component. Instead, React sets `buttonRef.current = domNode` after the element mounts and `buttonRef.current = null` when it unmounts.

---

# 12. Accessibility — `aria-live`, `aria-pressed`, `.sr-only`

## 12.1 `aria-live="polite"` — Screen Reader Announcements

```jsx
// App.jsx
<div aria-live="polite" className="sr-only">
    {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
</div>
```

An **ARIA live region** is a DOM area that screen readers monitor for content changes. When new content appears inside it, the screen reader announces the change without the user having to navigate there.

| `aria-live` value | Announcement timing | Use case |
|-------------------|--------------------|---------| 
| `"polite"` | Waits until the screen reader finishes its current speech | Non-urgent updates (win message, status changes) |
| `"assertive"` | Interrupts current speech immediately | Critical alerts, errors |
| `"off"` (default) | Never announces automatically | Regular content |

The `<div>` has `className="sr-only"` — it is visually hidden (positioned off-screen with `clip: rect(0,0,0,0)`) so sighted users do not see it, but screen readers still read its content when it changes.

## 12.2 `aria-pressed` — Toggle Button State

```jsx
// Die.jsx
<button
    aria-pressed={props.isHeld}
    aria-label={`Die with value ${props.value},
    ${props.isHeld ? "held" : "not held"}`}
>
    {props.value}
</button>
```

`aria-pressed` marks a button as a **toggle button** in the accessibility tree. Screen readers announce it as "button, pressed" or "button, not pressed" — giving non-sighted players the same hold/unhold feedback that sighted players get from the green colour change.

`aria-label` overrides the button's visible text label (`props.value` — just a number). Without it, a screen reader would only say "4, button" — unhelpful for understanding game state. With it, the reader says: "Die with value 4, not held, button".

| Attribute | Without it | With it |
|-----------|-----------|--------|
| `aria-pressed` | "4, button" | "4, button, pressed / not pressed" |
| `aria-label` | "4, button" | "Die with value 4, held, button" |

## 12.3 `.sr-only` — Visually Hidden Text

```css
/* index.css */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

`.sr-only` is a CSS utility class that makes an element **invisible to sighted users but audible to screen readers**. It works by shrinking the element to a 1×1 pixel box, clipping its visible area to nothing, and positioning it out of normal flow with `position: absolute`.

| Technique | Why not used instead |
|-----------|---------------------|
| `display: none` | Also hides from screen readers — element is completely removed from accessibility tree |
| `visibility: hidden` | Also hidden from screen readers |
| `opacity: 0` | Visible to screen readers but also occupies layout space visually |
| `.sr-only` | ✅ Hidden visually, readable by screen readers — the correct pattern |

> `.sr-only` is a standard utility class found in Bootstrap, Tailwind, and accessibility-first projects. Memorise the exact CSS — it appears in virtually every accessible React application.

---

# 13. CSS — Grid Layout for the Dice Board

```css
/* index.css */
.dice-container {
    display: grid;
    grid-template: auto auto / repeat(5, 1fr);
    gap: 20px;
    margin-bottom: 40px;
}
```

The 10 dice are laid out using CSS Grid with the `grid-template` shorthand:

```
grid-template: <rows> / <columns>
grid-template: auto auto / repeat(5, 1fr)
               └── 2 rows, each sizing automatically to content
                                └── 5 columns, each taking 1 equal fraction of available width
```

```
┌─────┬─────┬─────┬─────┬─────┐
│ Die │ Die │ Die │ Die │ Die │  ← Row 1: auto height
├─────┼─────┼─────┼─────┼─────┤
│ Die │ Die │ Die │ Die │ Die │  ← Row 2: auto height
└─────┴─────┴─────┴─────┴─────┘
  1fr   1fr   1fr   1fr   1fr    ← 5 equal columns
```

The individual dice buttons use inline styles from `<Die />` to toggle background colour:

```jsx
// Die.jsx
const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"
}
```

| State | `backgroundColor` | Visual feedback |
|-------|-----------------|----------------|
| `isHeld: false` | `"white"` | Neutral — die is free to be re-rolled |
| `isHeld: true` | `"#59E391"` (mint green) | Locked — die will not change on next roll |

---

# 14. How the Full App Flow Works

```
┌──────────────────── INITIAL RENDER ─────────────────────────────┐
│                                                                  │
│  useState lazy init → generateAllNewDice() called once          │
│  dice = [                                                        │
│    { value: 3, isHeld: false, id: "aK3..." },                   │
│    { value: 6, isHeld: false, id: "nR7..." },                   │
│    ...8 more                                                     │
│  ]                                                               │
│  gameWon = false (not all held, values differ)                   │
│  buttonRef.current = null (DOM not mounted yet)                  │
│                                                                  │
│  JSX renders: 10 white Die buttons + "Roll" button               │
│  React mounts DOM → buttonRef.current = <button> DOM node        │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────── USER CLICKS A DIE ──────────────────────────┐
│                                                                  │
│  User clicks Die with id "nR7..."                                │
│  props.hold() → hold("nR7...")                                   │
│    setDice(old => old.map(die =>                                  │
│      die.id === "nR7..." ? { ...die, isHeld: true } : die        │
│    ))                                                            │
│  React re-renders                                                │
│    dice[1].isHeld = true → backgroundColor = "#59E391" (green)  │
│  gameWon re-evaluated → still false (not all held)               │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────── USER CLICKS ROLL ───────────────────────────┐
│                                                                  │
│  rollDice() → gameWon is false                                   │
│    setDice(old => old.map(die =>                                  │
│      die.isHeld ? die : { ...die, value: newRandom }             │
│    ))                                                            │
│  Held dice unchanged → white dice get new random values          │
│  React re-renders with updated board                             │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────── GAME WON ───────────────────────────────────┐
│                                                                  │
│  Player holds all 10 dice at the same value                      │
│  gameWon = dice.every(held) && dice.every(sameValue) → true      │
│                                                                  │
│  useEffect fires (gameWon changed from false → true):            │
│    buttonRef.current.focus() → keyboard focus → "New Game" btn   │
│                                                                  │
│  React renders:                                                  │
│    <Confetti /> appears (rain of confetti)                        │
│    aria-live div shows: "Congratulations! You won!..."           │
│    Screen reader announces the win message                       │
│    Button label changes from "Roll" → "New Game"                 │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────── NEW GAME ───────────────────────────────────┐
│                                                                  │
│  User clicks "New Game"                                          │
│  rollDice() → gameWon is true                                    │
│    setDice(generateAllNewDice()) → fresh 10 dice, all unheld     │
│  gameWon re-evaluates → false (new random values, none held)     │
│  Confetti disappears, aria-live region empties                   │
│  Button label → "Roll"                                           │
└──────────────────────────────────────────────────────────────────┘
```

---

# 15. HTML Structure Recap — React Document Tree

```
index.html
├── <head>
│   ├── <link> → Google Fonts preconnect (fonts.googleapis.com)
│   ├── <link> → Google Fonts preconnect (fonts.gstatic.com, crossorigin)
│   ├── <link> → Karla font (wght 200–800, italic variants)
│   └── <link> → /index.css
│
└── <body>
    ├── <div id="root">
    │   │
    │   │  After ReactDOM.createRoot + root.render(<App />) runs:
    │   │
    │   └── <main>                              ← App.jsx root element
    │       │
    │       ├── <Confetti />                    ← renders only when gameWon === true
    │       │
    │       ├── <div aria-live="polite"         ← ARIA live region (screen readers)
    │       │       className="sr-only">
    │       │   └── <p>Congratulations!...</p>  ← renders only when gameWon === true
    │       │
    │       ├── <h1 className="title">          ← "Tenzies" — static game title
    │       │       Tenzies
    │       │   </h1>
    │       │
    │       ├── <p className="instructions">    ← static rule text
    │       │       Roll until all dice are the same...
    │       │   </p>
    │       │
    │       ├── <div className="dice-container">← CSS Grid: 5 cols × 2 rows
    │       │   ├── <button                     ← Die.jsx × 10
    │       │   │       style={{ backgroundColor: "white" | "#59E391" }}
    │       │   │       aria-pressed={false | true}
    │       │   │       aria-label="Die with value N, held | not held"
    │       │   │       onClick={props.hold}
    │       │   │   > N </button>
    │       │   └── ...9 more Die buttons
    │       │
    │       └── <button                         ← Roll / New Game button
    │               ref={buttonRef}             ← useRef attaches here for focus()
    │               className="roll-dice"
    │               onClick={rollDice}
    │           >
    │               Roll | New Game             ← conditional label
    │           </button>
    │
    └── <script src="/index.jsx" type="module"> ← Vite entry point

State (lives in App):
  dice     = [{ value, isHeld, id }, ...×10]  → drives Die components
  buttonRef = { current: <button> DOM node }  → used by useEffect for .focus()

Derived (computed each render):
  gameWon  = dice.every(held) && dice.every(sameValue)  → controls Confetti, label, rollDice branch
```

---

# 16. How to Run

This project is built with **Vite** and requires a local dev server to process JSX.

```bash
# Install dependencies (nanoid, react-confetti, react, react-dom)
npm install

# Start the Vite development server
npm run dev
```

Vite starts at `http://localhost:5173`. No internet connection is needed — all dice values are generated locally with `Math.random()`.

- The game is immediately playable on load
- Click any die to hold it (turns green) — click again to un-hold
- Click "Roll" to re-roll all non-held dice
- When all 10 dice show the same value and are all held, confetti falls and focus moves to "New Game"

---

# 17. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 13. React.js Fundamentals
* **Project:** 06. Capstone Project #1 — Tenzies
