# Reusability — Advanced React.js

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Hooks](https://img.shields.io/badge/Hooks-useState%20%7C%20useEffect%20%7C%20useRef%20%7C%20useContext%20%7C%20useId-61DAFB?style=flat-square&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![Patterns](https://img.shields.io/badge/Patterns-Compound%20%7C%20Render%20Props%20%7C%20Custom%20Hooks-blueviolet?style=flat-square)
![classnames](https://img.shields.io/badge/Library-classnames-orange?style=flat-square)
![react-icons](https://img.shields.io/badge/Library-react--icons-red?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A collection of six progressively advanced component exercises — the **Reusability** section of the **Advanced React.js** module from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every reusability concept introduced in this module — from props spreading and variant systems to compound components, render props, and custom hooks — comparing what is new here against the React.js Fundamentals work covered in folder 13.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is "Reusability" in React?](#3-what-is-reusability-in-react)
4. [What's New vs React.js Fundamentals](#4-whats-new-vs-reactjs-fundamentals)
5. [Button — Props Spreading, `classnames`, and Variants](#5-button--props-spreading-classnames-and-variants)
   - [Props Spreading with `...rest`](#51-props-spreading-with-rest)
   - [The `classnames` Library](#52-the-classnames-library)
   - [Size and Variant Props](#53-size-and-variant-props)
6. [Avatar — Overloaded Components and `children` Branching](#6-avatar--overloaded-components-and-children-branching)
   - [The Overloaded Avatar Pattern](#61-the-overloaded-avatar-pattern)
   - [Three Rendering Modes](#62-three-rendering-modes)
7. [Menu — Compound Components and Context](#7-menu--compound-components-and-context)
   - [What is a Compound Component?](#71-what-is-a-compound-component)
   - [`React.createContext` and the Provider Pattern](#72-reactcreatecontext-and-the-provider-pattern)
   - [`React.useContext` in Child Components](#73-reactusecontext-in-child-components)
   - [`React.useId` for Accessible ARIA Linking](#74-reactuseid-for-accessible-aria-linking)
   - [Dot Syntax via Static Properties](#75-dot-syntax-via-static-properties)
8. [Toggle — Headless Component and Render Props](#8-toggle--headless-component-and-render-props)
   - [What is a Headless Component?](#81-what-is-a-headless-component)
   - [`Toggle.On` and `Toggle.Off` — Conditional Rendering via Context](#82-toggleon-and-toggleoff--conditional-rendering-via-context)
   - [`Toggle.Button` — Context-Driven Interaction](#83-togglebutton--context-driven-interaction)
   - [`Toggle.Display` — Render Props Pattern](#84-toggledisplay--render-props-pattern)
   - [`useRef` — Skipping the First Render Effect](#85-useref--skipping-the-first-render-effect)
9. [`useEffectOnUpdate` — Extracting Logic Into a Custom Hook](#9-useeffectonupdate--extracting-logic-into-a-custom-hook)
   - [The Problem: `useEffect` Fires on Mount](#91-the-problem-useeffect-fires-on-mount)
   - [Building `useEffectOnUpdate`](#92-building-useeffectonupdate)
   - [Using the Hook Inside `Toggle`](#93-using-the-hook-inside-toggle)
10. [`useToggle` — Composing Custom Hooks](#10-usetoggle--composing-custom-hooks)
    - [What `useToggle` Encapsulates](#101-what-usetoggle-encapsulates)
    - [Consuming `useToggle` in `Star`](#102-consuming-usetoggle-in-star)
    - [The Hook Composition Chain](#103-the-hook-composition-chain)
11. [How the Full Component System Works](#11-how-the-full-component-system-works)
12. [HTML Structure Recap — React Document Tree](#12-html-structure-recap--react-document-tree)
13. [How to Run](#13-how-to-run)
14. [Course Reference](#14-course-reference)

---

# 1. Project Overview

The **Reusability** module is a series of six mini-projects that each build on the last, culminating in a fully composable UI component library built from scratch. The exercises are not independent apps — they are an evolving codebase where earlier patterns are refactored and improved with each new concept.

The six projects are:

* **01. Button** — A reusable `<Button>` component that accepts `size`, `variant`, and arbitrary HTML button props via props spreading. Uses the `classnames` library to compose CSS class strings.
* **02. Avatar** — An "overloaded" `<Avatar>` component that renders three entirely different UIs (image, initials, anonymous icon) from a single component definition, branching on which props were supplied.
* **03. Menu** — A `<Menu>` **compound component** — four sub-components (`Menu`, `MenuButton`, `MenuDropdown`, `MenuItem`) that share state and IDs through React Context. Introduces `React.createContext`, `useContext`, and `useId`.
* **04. Toggle** — A **headless Toggle** compound component with `Toggle.On`, `Toggle.Off`, `Toggle.Button`, and `Toggle.Display` — introduces the **render props pattern** and the `useRef` trick for skipping the initial `useEffect` call.
* **05. useEffectOnUpdate** — Extracts the "skip first render" logic from `Toggle` into a dedicated **custom hook** `useEffectOnUpdate`, then integrates it into the Toggle component to keep components clean and logic reusable.
* **06. useToggle** — Builds a second custom hook `useToggle` that composes `useEffectOnUpdate`, fully abstracting all toggle state logic out of components entirely. The `Star` component is reimplemented using `useToggle` directly, with no compound component needed.

The goal of this module is not just to build a button or a menu — it is to understand every major React reusability pattern: **prop composition**, **compound components**, **render props**, and **custom hooks**, and to recognise which pattern is the right tool for each situation.

---

# 2. Project Structure

```
15. Advanced React.js/
│
└── 01. Reusability/
    │
    ├── 01. Button/
    │   ├── index.html          → HTML shell — <div id="root">, loads style.css and index.js
    │   ├── index.js            → App: renders four <Button> variants
    │   ├── Button.js           → Reusable Button with size, variant, ...rest props
    │   └── style.css           → Button base + .button-sm / .button-lg / .button-{variant}
    │
    ├── 02. Avatar/
    │   ├── index.html          → HTML shell
    │   ├── index.js            → App: renders three Avatar usage modes
    │   ├── Avatar.js           → Overloaded Avatar — branches on src / children / neither
    │   ├── style.css           → .avatar, .avatar-letters, .avatar-icon styles
    │   ├── hints.md            → Challenge hints for the Avatar exercise
    │   └── images/
    │       └── bob.jpg         → Photo used for the image-mode Avatar
    │
    ├── 03. Menu/
    │   ├── index.html          → HTML shell
    │   ├── index.js            → App: composes <Menu>, <MenuButton>, <MenuDropdown>, <MenuItem>
    │   ├── style.css           → Menu dropdown positioning and item hover styles
    │   ├── Button/
    │   │   └── Button.js       → Shared Button component (reused by MenuButton)
    │   └── Menu/
    │       ├── Menu.js         → Context provider — open state + toggle + menuId
    │       ├── MenuButton.js   → Reads context; renders <Button> with ARIA attributes
    │       ├── MenuDropdown.js → Reads context; conditionally renders dropdown div
    │       └── MenuItem.js     → Stateless — renders a single .menu-item div
    │
    ├── 04. Toggle/
    │   ├── index.html          → HTML shell
    │   ├── index.js            → App: uses <Toggle> with dot-syntax sub-components
    │   ├── style.css           → Star, box, menu, button styles
    │   └── components/
    │       ├── Star.js         → Composes Toggle compound component for a favourite star
    │       ├── Button/
    │       │   └── Button.js   → Shared Button (same as folder 03)
    │       ├── Menu/
    │       │   ├── index.js    → Attaches Menu.Button / Menu.Dropdown / Menu.Item
    │       │   ├── Menu.js     → Menu now uses Toggle internally for open/close state
    │       │   ├── MenuButton.js
    │       │   ├── MenuDropdown.js
    │       │   └── MenuItem.js
    │       └── Toggle/
    │           ├── index.js    → Attaches Toggle.Button / Toggle.On / Toggle.Off
    │           ├── Toggle.js   → Context provider; useRef to skip first effect
    │           ├── ToggleButton.js → Reads context toggle(); wraps children in a div
    │           ├── ToggleOn.js     → Reads context; returns children when on===true
    │           └── ToggleOff.js    → Reads context; returns children when on===false
    │
    ├── 05. useEffectOnUpdate/
    │   ├── index.html          → HTML shell
    │   ├── index.js            → App: Toggle with Toggle.Display render prop
    │   ├── style.css           → Same palette as folder 04
    │   ├── hooks/
    │   │   └── useEffectOnUpdate.js → Custom hook: useEffect that skips first render
    │   └── components/
    │       ├── Star.js         → Star still uses Toggle compound component
    │       ├── Button/
    │       ├── Menu/
    │       └── Toggle/
    │           ├── index.js    → Adds Toggle.Display to the dot-syntax set
    │           ├── Toggle.js   → Now calls useEffectOnUpdate instead of raw useEffect
    │           ├── ToggleButton.js
    │           ├── ToggleOn.js
    │           ├── ToggleOff.js
    │           └── ToggleDisplay.js → Render prop sub-component: children(on)
    │
    └── 06. useToggle/
        ├── index.html          → HTML shell
        ├── index.js            → App: Menu with onOpen callback via useToggle
        ├── style.css           → Same as folder 05
        ├── hooks/
        │   ├── useEffectOnUpdate.js → Same custom hook as folder 05
        │   └── useToggle.js         → Custom hook: composes useEffectOnUpdate
        └── components/
            ├── Star.js         → Star rewritten — directly calls useToggle(), no compound component
            ├── Button/
            └── Menu/
                ├── index.js    → Menu.Button / Menu.Dropdown / Menu.Item dot syntax
                ├── Menu.js     → Menu calls useToggle({ onToggle: onOpen })
                ├── MenuButton.js
                ├── MenuDropdown.js
                └── MenuItem.js
```

---

# 3. What is "Reusability" in React?

**Reusability** in React is the practice of designing components and logic so they can be used in many contexts without modification. A reusable piece of code does one thing well and exposes a clear, flexible API to the outside.

| Strategy | What it solves | How it works |
|----------|---------------|--------------|
| **Props spreading** (`...rest`) | Passing arbitrary HTML attributes to a component | Collect unknown props with rest syntax and forward them to the underlying DOM element |
| **`children` prop** | Injecting arbitrary content into a wrapper | The `children` prop receives any JSX between the component's open/close tags |
| **Variant / size props** | Styling the same component in multiple ways | Map a prop value (e.g. `"danger"`) to a CSS class name (e.g. `"button-danger"`) |
| **Compound components** | Coordinating a group of related sub-components without prop-drilling | Share state via Context; expose sub-components as dot-notation properties of the parent |
| **Render props** | Letting the consumer decide what to render based on internal state | Pass the component's internal state into a function that the consumer provides as `children` |
| **Custom hooks** | Extracting stateful logic from components so it can be shared | Move `useState` / `useEffect` / `useRef` logic into a function prefixed with `use` |

> The right pattern depends on **who needs to control what**. If only the component's style changes → variant prop. If the structure changes → compound component. If the logic needs to live in many places → custom hook.

---

# 4. What's New vs React.js Fundamentals

This module introduces patterns that build on top of the core hooks (`useState`, `useEffect`, `useRef`) and component concepts (`props`, `children`, `state`) covered in folder 13. React.js Fundamentals.

## New React Concepts

| Concept | Where Introduced | Purpose |
|---------|-----------------|---------|
| `...rest` (rest/spread in props) | `01. Button/Button.js` | Collect all extra props and forward them to the underlying `<button>` element |
| `classnames` library | `01. Button/Button.js` | Compose CSS class strings conditionally without template literal juggling |
| Overloaded component | `02. Avatar/Avatar.js` | A single component that renders completely different JSX depending on which props are present |
| `React.createContext()` | `03. Menu/Menu/Menu.js` | Create a Context object that can hold shared state for a component tree |
| `<Context.Provider value={...}>` | `03. Menu/Menu/Menu.js` | Wrap children so that any descendant can read the provided value |
| `React.useContext(Context)` | `MenuButton.js`, `MenuDropdown.js` | Subscribe to the nearest Context Provider — reads `open`, `toggle`, `menuId` |
| `React.useId()` | `03. Menu/Menu/Menu.js` | Generate a stable, unique ID for ARIA linking (`aria-controls` ↔ `id`) |
| Compound component pattern | `03. Menu`, `04. Toggle` | Group related sub-components under one parent with shared state via Context |
| Static property dot-syntax | `Toggle/index.js`, `Menu/index.js` | Attach sub-components as properties (`Toggle.Button = ToggleButton`) |
| Headless component | `04. Toggle/Toggle.js` | A component with no UI of its own — it only provides state and behaviour |
| Render props pattern | `05. useEffectOnUpdate/Toggle/ToggleDisplay.js` | Pass a function as `children`; the component calls `children(on)` so the consumer controls the UI |
| `React.useRef(true)` | `04. Toggle/Toggle.js` | Store a mutable value that persists across renders without causing re-renders |
| Custom hook (`useEffectOnUpdate`) | `05. useEffectOnUpdate/hooks/` | Extract "run effect only on update, not mount" into a shareable hook |
| Custom hook (`useToggle`) | `06. useToggle/hooks/` | Extract all toggle state + side-effect logic into a hook that returns `[on, toggle]` |
| Hook composition | `06. useToggle/hooks/useToggle.js` | One custom hook calling another custom hook (`useToggle` uses `useEffectOnUpdate`) |

## Comparison: React Fundamentals vs Advanced Reusability

| Feature | React.js Fundamentals (Folder 13) | Advanced Reusability (Folder 15/01) |
|---------|-----------------------------------|-------------------------------------|
| Component communication | Props drilled down the tree | Context shared across the entire sub-tree |
| State lives in | The component that uses it | A provider component; consumed anywhere below |
| UI shape | Determined by the component | Compound/render-props: determined by the consumer |
| Logic reuse | Copy-paste or lift to parent | Extracted into custom hooks, imported anywhere |
| `useEffect` | Runs on mount + deps change | `useEffectOnUpdate` skips the first render |
| Component IDs | Not applicable | `React.useId()` generates stable, unique IDs |

---

# 5. Button — Props Spreading, `classnames`, and Variants

## 5.1 Props Spreading with `...rest`

```jsx
// Button.js
export default function Button({ children, className, size, variant, ...rest }) {
    let sizeClass    = size    && `button-${size}`
    let variantClass = variant && `button-${variant}`
    const allClasses = classnames(sizeClass, variantClass, className)

    return (
        <button className={allClasses} {...rest}>
            {children}
        </button>
    )
}
```

The `...rest` syntax **collects every prop not explicitly destructured** (like `onClick`, `disabled`, `type`, `aria-label`) into a single object. Spreading that object onto the native `<button>` element (`{...rest}`) forwards all those attributes as if they had been written directly on the `<button>`.

```jsx
// Consumer — any valid button attribute works without Button.js knowing about it
<Button onClick={() => login()} disabled={isLoading} aria-label="Sign in">
    Log in with Google
</Button>
```

Without `...rest`, the `Button` component would need an explicit prop for every possible HTML attribute — an impossible task. With `...rest`, the component exposes the full power of the native `<button>` while still adding its own logic on top.

> Always place `{...rest}` **before** any explicitly set props on the native element. If `{...rest}` contains an `onClick` and you also set `onClick` after it, the later one wins — giving you a way to override consumer-provided attributes when needed.

## 5.2 The `classnames` Library

```jsx
import classnames from "classnames"

const allClasses = classnames(sizeClass, variantClass, className)
// → "button-lg button-success" (when size="lg" variant="success")
// → "button-sm"                (when size="sm", no variant)
// → ""                         (when neither size nor variant is set)
```

`classnames` is a tiny utility that **joins class strings together and ignores falsy values**. Without it, conditional class composition using template literals is fragile:

```jsx
// ❌ Without classnames — messy and error-prone
className={`${size ? `button-${size}` : ''} ${variant ? `button-${variant}` : ''} ${className || ''}`}
// → "  my-extra-class" when size and variant are both undefined (leading spaces)

// ✅ With classnames — clean and safe
const allClasses = classnames(sizeClass, variantClass, className)
// → "my-extra-class" — no leading/trailing spaces, falsy values silently dropped
```

| `classnames` argument | Value | Included in output? |
|-----------------------|-------|---------------------|
| `"button-lg"` | truthy string | ✅ Yes |
| `undefined` | falsy | ❌ No — silently ignored |
| `false` | falsy | ❌ No — silently ignored |
| `null` | falsy | ❌ No — silently ignored |

## 5.3 Size and Variant Props

```jsx
// index.js — four Button usages
<Button>Log in with Google</Button>
<Button size="lg" variant="success">Log in with Google</Button>
<Button size="sm" variant="warning">Log in with Google</Button>
<Button size="sm" variant="danger">Log in with Google</Button>
```

```css
/* style.css — the CSS classes the Button maps to */
button.button-sm      { padding: 7px 11px; font-size: 12px; }
button.button-lg      { padding: 30px 40px; }
button.button-success { color: #047857; background-color: #ECFDF5; border-color: #047857; }
button.button-warning { color: #FBBF24; background-color: #FFFBEB; border-color: #FBBF24; }
button.button-danger  { color: #F87171; background-color: #FEF2F2; border-color: #F87171; }
```

The mapping is simple: `size="lg"` → `"button-lg"`, `variant="success"` → `"button-success"`. The component constructs the class name string using a template literal and hands it to `classnames`. The CSS does the visual differentiation.

| Prop | Values | CSS class applied |
|------|--------|-------------------|
| `size` | `"sm"` | `button-sm` — smaller padding, smaller font |
| `size` | `"lg"` | `button-lg` — larger padding |
| `variant` | `"success"` | `button-success` — green tones |
| `variant` | `"warning"` | `button-warning` — amber tones |
| `variant` | `"danger"` | `button-danger` — red tones |
| *(omitted)* | `undefined` | no class added — default grey style |

> The `classnames` pattern also allows an external consumer to pass their own `className` prop to add extra styles on top of the built-in ones — the `className` argument in `classnames(sizeClass, variantClass, className)` merges it in without any extra code in `Button.js`.

---

# 6. Avatar — Overloaded Components and `children` Branching

## 6.1 The Overloaded Avatar Pattern

```jsx
// Avatar.js
export default function Avatar({ src, alt, children }) {
    if (src) {
        return (
            <div className="avatar">
                <img src={src} alt={alt} />
            </div>
        )
    }
    if (children) {
        return (
            <div className="avatar avatar-letters">
                {children}
            </div>
        )
    }
    else {
        return (
            <div className="avatar avatar-icon">
                <IoPersonSharp />
            </div>
        )
    }
}
```

An **overloaded component** is one that renders fundamentally different JSX depending on which props it receives — rather than just changing styles. The same `<Avatar>` component tag produces three completely different outputs depending on the combination of props supplied.

## 6.2 Three Rendering Modes

```jsx
// index.js — three Avatar usages
<Avatar src="./images/bob.jpg" alt="Bob Ziroll" />   {/* Mode 1: image */}
<Avatar>BZ</Avatar>                                   {/* Mode 2: initials */}
<Avatar />                                            {/* Mode 3: anonymous icon */}
```

```
Mode 1 (src prop given):
┌─────────────────────────┐
│ .avatar                 │
│   <img src="bob.jpg" /> │
└─────────────────────────┘

Mode 2 (children given, no src):
┌─────────────────────────┐
│ .avatar .avatar-letters │
│   BZ                    │
└─────────────────────────┘

Mode 3 (neither src nor children):
┌─────────────────────────┐
│ .avatar .avatar-icon    │
│   <IoPersonSharp />     │
└─────────────────────────┘
```

| Props received | Branch taken | CSS classes | Content |
|---------------|-------------|-------------|---------|
| `src` is a string | `if (src)` | `.avatar` | `<img>` |
| `children` is truthy (no `src`) | `if (children)` | `.avatar .avatar-letters` | `children` (e.g. `"BZ"`) |
| Neither `src` nor `children` | `else` | `.avatar .avatar-icon` | `<IoPersonSharp />` icon |

> Check for `src` **before** `children` — if both are supplied, an image is more specific and should take priority. The order of the `if` branches determines precedence.

---

# 7. Menu — Compound Components and Context

## 7.1 What is a Compound Component?

A **compound component** is a group of components designed to work together, where the parent manages shared state and the children read from it without receiving explicit props. The parent and children are tightly coupled by design but loosely coupled by API — the consumer assembles them like building blocks.

```jsx
// index.js — compound component usage
<Menu>
    <MenuButton>Sports</MenuButton>
    <MenuDropdown>
        {sports.map(sport => (
            <MenuItem key={sport}>{sport}</MenuItem>
        ))}
    </MenuDropdown>
</Menu>
```

`MenuButton` knows it should `toggle()` the menu. `MenuDropdown` knows it should only render when `open === true`. `MenuItem` is stateless. None of them receive `open` or `toggle` as props from `<Menu>` — they get it from **Context**.

## 7.2 `React.createContext` and the Provider Pattern

```jsx
// Menu.js
const MenuContext = React.createContext()   // ← create the context object

export default function Menu({ children }) {
    const [open, setOpen] = React.useState(false)
    const menuId = React.useId()

    function toggle() {
        setOpen(prevOpen => !prevOpen)
    }

    return (
        <MenuContext.Provider value={{ open, toggle, menuId }}>
            <div className="menu" role="menu">
                {children}
            </div>
        </MenuContext.Provider>
    )
}

export { MenuContext }   // ← exported so child files can import it
```

`React.createContext()` creates a **Context object** — a container that can hold any value and make it available to any component below the Provider in the tree.

`<MenuContext.Provider value={...}>` wraps the children and sets the shared value. Every descendant that calls `useContext(MenuContext)` will receive that exact `value` object.

| Part | What it does |
|------|-------------|
| `React.createContext()` | Creates the Context object (done once, at module level) |
| `<MenuContext.Provider value={...}>` | Makes the value available to all descendants |
| `value={{ open, toggle, menuId }}` | The shared state — any update triggers re-renders in consumers |
| `export { MenuContext }` | Lets child component files import the same Context object |

> Context is **not** a replacement for all props. Only use Context for data that is truly **shared** across multiple components at different nesting levels. For data that only flows from parent to one direct child, a regular prop is simpler and more obvious.

## 7.3 `React.useContext` in Child Components

```jsx
// MenuButton.js
import { MenuContext } from "./Menu"

export default function MenuButton({ children }) {
    const { toggle, open, menuId } = React.useContext(MenuContext)
    return (
        <Button
            onClick={toggle}
            aria-expanded={open}
            aria-haspopup="true"
            aria-controls={menuId}
        >
            {children}
        </Button>
    )
}
```

```jsx
// MenuDropdown.js
import { MenuContext } from "./Menu"

export default function MenuDropdown({ children }) {
    const { open, menuId } = React.useContext(MenuContext)
    return open ? (
        <div className="menu-dropdown" id={menuId}>
            {children}
        </div>
    ) : null
}
```

`React.useContext(MenuContext)` **subscribes** the component to the context. Whenever the `value` inside `<MenuContext.Provider>` changes (i.e., when `setOpen` is called), React re-renders every component that called `useContext(MenuContext)`.

| Component | Context values used | Effect |
|-----------|--------------------|----|
| `MenuButton` | `toggle`, `open`, `menuId` | Calls `toggle` on click; sets `aria-expanded` to `open`; `aria-controls` points to `menuId` |
| `MenuDropdown` | `open`, `menuId` | Renders its children only when `open === true`; its `id` matches `menuId` |
| `MenuItem` | None | Fully stateless — no context needed |

## 7.4 `React.useId` for Accessible ARIA Linking

```jsx
// Menu.js
const menuId = React.useId()
// → ":r0:" (a stable unique string React generates

// MenuButton.js
aria-controls={menuId}     // ← button announces which element it controls
// aria-controls=":r0:"

// MenuDropdown.js
id={menuId}                // ← dropdown has that same ID
// id=":r0:"
```

`React.useId()` generates a **stable, unique string ID** per component instance. It is guaranteed to be the same across server and client renders (important for SSR), and unique across all instances — if two `<Menu>` components render on the same page, each gets a different `menuId`.

The `aria-controls` / `id` pairing is an accessibility requirement: it tells assistive technologies that clicking the button controls a specific element on the page.

| ARIA attribute | Applied to | Value | Purpose |
|----------------|-----------|-------|---------|
| `aria-haspopup="true"` | `MenuButton` | `"true"` | Announces that this button opens a popup |
| `aria-expanded={open}` | `MenuButton` | `true` or `false` | Announces whether the popup is currently open |
| `aria-controls={menuId}` | `MenuButton` | `":r0:"` | Points to the dropdown element this button controls |
| `id={menuId}` | `MenuDropdown` | `":r0:"` | The target element referenced by `aria-controls` |

> `useId` should **never** be used as a key in a list. It is designed for accessibility linking only. For list keys, use the data itself (a unique ID from the data) or a stable index.

## 7.5 Dot Syntax via Static Properties

In folder 04 and beyond, the Menu (and Toggle) components adopt dot notation:

```jsx
// Menu/index.js
import Menu from "./Menu"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"
import MenuItem from "./MenuItem"

Menu.Button   = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item     = MenuItem

export default Menu
```

```jsx
// Consumer usage in folder 04
<Menu>
    <Menu.Button>Menu</Menu.Button>
    <Menu.Dropdown>
        <Menu.Item>Home</Menu.Item>
    </Menu.Dropdown>
</Menu>
```

Attaching sub-components as **static properties** of the parent is a JavaScript trick: since components are functions (objects), you can add properties to them. The consumer only needs one import (`import Menu from "./Menu"`) and gets all sub-components through dot notation — a cleaner API than importing four separate files.

| Without dot syntax | With dot syntax |
|--------------------|-----------------|
| `import Menu from "./Menu/Menu"` | `import Menu from "./Menu"` |
| `import MenuButton from "./Menu/MenuButton"` | *(no extra imports needed)* |
| `import MenuDropdown from "./Menu/MenuDropdown"` | *(no extra imports needed)* |
| `<MenuButton>...</MenuButton>` | `<Menu.Button>...</Menu.Button>` |

---

# 8. Toggle — Headless Component and Render Props

## 8.1 What is a Headless Component?

```jsx
// Toggle.js — no HTML elements of its own
export default function Toggle({ children, onToggle }) {
    const [on, setOn] = React.useState(false)

    function toggle() {
        setOn(prevOn => !prevOn)
    }

    // ... effect logic

    return (
        <ToggleContext.Provider value={{ on, toggle }}>
            {children}        {/* ← only renders what the consumer provides */}
        </ToggleContext.Provider>
    )
}
```

A **headless component** manages state and behaviour but renders **no UI of its own** — it only renders its `children`. The consumer is 100% responsible for what appears on screen. This is maximum reusability: the same `<Toggle>` powers a star favourite, a theme switcher, a dropdown menu, and any other on/off interaction.

```
Without headless component:
  StarButton component — has toggle logic + renders a star icon
  ThemeToggle  — has toggle logic + renders a sun/moon icon
  MenuToggle   — has toggle logic + renders a dropdown

  All three duplicate the same "isOn, setIsOn, toggle()" logic.

With headless Toggle compound component:
  Toggle   — owns all toggle logic, renders nothing
  Star     — composes <Toggle> and renders the star icon
  Menu     — composes <Toggle> and renders the dropdown
  ThemeBtn — composes <Toggle> and renders the sun/moon
```

## 8.2 `Toggle.On` and `Toggle.Off` — Conditional Rendering via Context

```jsx
// ToggleOn.js
export default function ToggleOn({ children }) {
    const { on } = React.useContext(ToggleContext)
    return on ? children : null
}

// ToggleOff.js
export default function ToggleOff({ children }) {
    const { on } = React.useContext(ToggleContext)
    return on ? null : children
}
```

`Toggle.On` and `Toggle.Off` are declarative wrappers for conditional rendering. Instead of writing `{on ? <StarFill /> : <Star />}` every time, the consumer places content inside the appropriate sub-component:

```jsx
// Star.js — using Toggle.On and Toggle.Off
<Toggle onToggle={onChange}>
    <Toggle.Button>
        <Toggle.On>
            <BsStarFill className="star filled" />
        </Toggle.On>
        <Toggle.Off>
            <BsStar className="star" />
        </Toggle.Off>
    </Toggle.Button>
</Toggle>
```

| Sub-component | Renders | When |
|--------------|---------|------|
| `<Toggle.On>` | Its `children` | `on === true` |
| `<Toggle.Off>` | Its `children` | `on === false` |
| `<Toggle.Button>` | Its `children` (clickable) | Always — it wraps `children` in an `onClick` handler |

## 8.3 `Toggle.Button` — Context-Driven Interaction

```jsx
// ToggleButton.js
export default function ToggleButton({ children }) {
    const { toggle } = React.useContext(ToggleContext)
    return (
        <div onClick={toggle}>
            {children}
        </div>
    )
}
```

`Toggle.Button` reads `toggle` from context and wraps `children` in a `div` with an `onClick`. Any content placed inside `<Toggle.Button>` becomes clickable and triggers the toggle — the consumer decides what that content looks like (a star, a button, an icon, text).

## 8.4 `Toggle.Display` — Render Props Pattern

```jsx
// ToggleDisplay.js (introduced in folder 05)
export default function ToggleDisplay({ children }) {
    const { on } = React.useContext(ToggleContext)
    return children(on)   // ← calls children as a function, passing on
}
```

```jsx
// Consumer usage — children is a function (render prop)
<Toggle.Display>
    {(on) => {
        return <div className={`box ${on ? "filled" : ""}`}></div>
    }}
</Toggle.Display>
```

The **render props pattern** inverts control one step further than `Toggle.On`/`Toggle.Off`. Instead of choosing between two pre-defined slots, the consumer provides a **function as `children`** that receives the internal state (`on`) and returns any JSX it wants. This gives infinite flexibility — the consumer can apply `on` to class names, styles, aria attributes, or anything else.

```
Toggle.On / Toggle.Off pattern:
  Consumer picks slot A or slot B — two pre-defined options

Render Props pattern (Toggle.Display):
  Consumer receives raw `on` boolean — unlimited control
  Can do: className, style, conditional rendering, multiple elements, etc.
```

| Pattern | API | Flexibility | Verbosity |
|---------|-----|-------------|-----------|
| `Toggle.On` / `Toggle.Off` | Declarative slots | Limited (two states, two slots) | Low |
| `Toggle.Display` (render prop) | Function as children | Unlimited | Higher |

> The render props pattern trades simplicity for flexibility. Use `Toggle.On`/`Toggle.Off` when the consumer just wants to show/hide things. Use `Toggle.Display` (render props) when the consumer needs the raw state value for richer logic.

## 8.5 `useRef` — Skipping the First Render Effect

```jsx
// Toggle.js (folder 04) — the problem setup
export default function Toggle({ children, onToggle }) {
    const [on, setOn] = React.useState(false)
    const firstRender = React.useRef(true)   // ← mutable ref, initialised to true

    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false     // ← mark: first render done
        } else {
            onToggle()                      // ← only call after the first render
        }
    }, [on])
    // ...
}
```

`React.useRef(initialValue)` creates a **ref object** — `{ current: initialValue }` — that persists across renders. Unlike state, **mutating `ref.current` does not cause a re-render**. This makes it ideal for storing flags or previous values that the component needs to track without triggering the render cycle.

The problem this solves: `useEffect` always fires after the **first render** (mount), regardless of the dependencies array having values or not. `onToggle` is a callback that should fire when the toggle changes — not when the component first mounts.

```
First render:
  useEffect fires → firstRender.current is true → set it to false → skip onToggle()

User clicks (on changes from false to true):
  useEffect fires → firstRender.current is false → call onToggle() ✅

User clicks again (on changes from true to false):
  useEffect fires → firstRender.current is false → call onToggle() ✅
```

| Hook | Triggers re-render on change? | Persists across renders? | Use for |
|------|------------------------------|--------------------------|---------|
| `useState` | ✅ Yes | ✅ Yes | UI-visible data |
| `useRef` | ❌ No | ✅ Yes | Internal flags, DOM nodes, previous values |

---

# 9. `useEffectOnUpdate` — Extracting Logic Into a Custom Hook

## 9.1 The Problem: `useEffect` Fires on Mount

The "skip first render" pattern using `useRef` inside `Toggle.js` is useful — but it is **logic**, not UI. Logic that is duplicated in many components belongs in a **custom hook**.

Before extraction, `Toggle.js` contained this inline:

```jsx
// Toggle.js (folder 04) — embedded logic
const firstRender = React.useRef(true)
React.useEffect(() => {
    if (firstRender.current) {
        firstRender.current = false
    } else {
        onToggle()
    }
}, [on])
```

If a different component also needs "run this effect only on updates, not on mount", it would have to copy-paste this exact pattern. That is a reusability failure.

## 9.2 Building `useEffectOnUpdate`

```jsx
// hooks/useEffectOnUpdate.js
import React from "react"

export default function useEffectOnUpdate(effectFunction, deps) {
    const firstRender = React.useRef(true)

    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
        } else {
            effectFunction()
        }
    }, deps)
}
```

This custom hook accepts:

| Parameter | Type | Purpose |
|-----------|------|---------|
| `effectFunction` | `() => void` | The callback to run on every update (not on mount) |
| `deps` | `Array` | The dependencies array — passed directly to `useEffect` |

**Rules for custom hooks:**
1. The function name **must start with `use`** — this is not just a convention, it is how React's linting rules detect hooks and enforce the Rules of Hooks.
2. Custom hooks can call other hooks (`useRef`, `useEffect`, etc.) — they are composable.
3. Custom hooks are **plain JavaScript functions** — no special React API is needed to create one.

```
Without useEffectOnUpdate:
  Toggle.js — 6 lines of useRef + useEffect + if/else logic
  AnotherComponent.js — copy-paste the same 6 lines

With useEffectOnUpdate:
  hooks/useEffectOnUpdate.js — 6 lines, defined once
  Toggle.js — 1 line: useEffectOnUpdate(onToggle, [on])
  AnotherComponent.js — 1 line: useEffectOnUpdate(myCallback, [myDep])
```

## 9.3 Using the Hook Inside `Toggle`

```jsx
// Toggle.js (folder 05) — after extraction
import useEffectOnUpdate from "../../hooks/useEffectOnUpdate"

export default function Toggle({ children, onToggle = () => {} }) {
    const [on, setOn] = React.useState(false)

    function toggle() {
        setOn(prevOn => !prevOn)
    }

    useEffectOnUpdate(onToggle, [on])   // ← one clean line replaces 7 lines

    return (
        <ToggleContext.Provider value={{ on, toggle }}>
            {children}
        </ToggleContext.Provider>
    )
}
```

The result is a `Toggle.js` that reads cleanly: "when `on` changes (but not on mount), call `onToggle`." The implementation detail of how to skip the first render is hidden inside the hook.

> Notice `onToggle = () => {}` — a default parameter. This means `<Toggle>` can be used without an `onToggle` prop and it will not crash; the default is a no-op function.

---

# 10. `useToggle` — Composing Custom Hooks

## 10.1 What `useToggle` Encapsulates

```jsx
// hooks/useToggle.js
import React from "react"
import useEffectOnUpdate from "./useEffectOnUpdate"

export default function useToggle({
    initialValue = false,
    onToggle = () => { }
}) {
    const [on, setOn] = React.useState(initialValue)

    function toggle() {
        setOn(prevOn => !prevOn)
    }

    useEffectOnUpdate(onToggle, [on])

    return [on, toggle]
}
```

`useToggle` is a custom hook that **composes** `useEffectOnUpdate` — one custom hook calling another. It encapsulates:

1. The `on` state and its `setOn` setter
2. The `toggle` function
3. The side-effect behaviour (call `onToggle` when `on` changes, skip mount)

It returns `[on, toggle]` — an array following the same destructuring convention as `useState`. The consumer gets the state value and the updater, without needing to know how the effect works.

| Parameter | Default | Purpose |
|-----------|---------|---------|
| `initialValue` | `false` | The starting state of the toggle |
| `onToggle` | `() => {}` | Callback to call whenever the toggle changes (not on mount) |

## 10.2 Consuming `useToggle` in `Star`

```jsx
// components/Star.js (folder 06) — using useToggle directly
import useToggle from "../../hooks/useToggle"
import { BsStar, BsStarFill } from "react-icons/bs"

export default function Star({ onChange }) {
    const [on, toggle] = useToggle()   // ← no compound component needed

    return (
        <>
            {
                on ?
                    <BsStarFill onClick={toggle} className="star filled" /> :
                    <BsStar onClick={toggle} className="star" />
            }
        </>
    )
}
```

Compare this to the `Star` in folder 04 — the compound component version:

```jsx
// components/Star.js (folder 04) — using Toggle compound component
export default function Star({ onChange }) {
    return (
        <Toggle onToggle={onChange}>
            <Toggle.Button>
                <Toggle.On><BsStarFill className="star filled" /></Toggle.On>
                <Toggle.Off><BsStar className="star" /></Toggle.Off>
            </Toggle.Button>
        </Toggle>
    )
}
```

| Version | Lines of JSX | Needs compound component? | Logic location |
|---------|-------------|--------------------------|----------------|
| Folder 04 (compound) | 8 lines | Yes — `Toggle`, `Toggle.Button`, `Toggle.On`, `Toggle.Off` | Distributed across 4 files |
| Folder 06 (custom hook) | 5 lines | No | Fully in `useToggle` |

## 10.3 The Hook Composition Chain

```
useToggle
  └── calls useEffectOnUpdate
        └── calls React.useEffect
              └── calls React.useRef
```

This composition chain shows how custom hooks build on top of each other, just like functions compose in regular JavaScript. Each layer adds a more specific abstraction:

```
React.useEffect   — primitive: run a callback after render, controlled by deps
React.useRef      — primitive: a mutable value that persists without re-rendering

useEffectOnUpdate — built with useEffect + useRef
                    abstraction: "run this effect only on updates, not on mount"

useToggle         — built with useState + useEffectOnUpdate
                    abstraction: "a boolean toggle that calls a callback on change"
```

> Custom hooks are the primary way React developers share **stateful logic** between components. If you find yourself writing the same `useState` + `useEffect` combination in two or more components, it belongs in a custom hook.

---

# 11. How the Full Component System Works

```
┌───────────────────── MENU (compound, context-driven) ─────────────────────────┐
│                                                                               │
│  <Menu onOpen={() => console.log("Opened/closed")}>                          │
│    │                                                                          │
│    │  Menu.js:                                                                │
│    │    useToggle({ onToggle: onOpen })   ← calls useEffectOnUpdate internally│
│    │    → [on, toggle]                                                        │
│    │    ToggleContext.Provider value={{ on, toggle }}                         │
│    │                                                                          │
│    ├── <Menu.Button>                                                          │
│    │      useContext(ToggleContext) → toggle                                  │
│    │      onClick={toggle} → setOn(!on) → re-renders consumers               │
│    │                                                                          │
│    └── <Menu.Dropdown>              (only renders when on === true)           │
│            useContext(ToggleContext) → on                                     │
│            on ? <div>children</div> : null                                   │
│            ├── <Menu.Item>Home</Menu.Item>                                   │
│            ├── <Menu.Item>About</Menu.Item>                                  │
│            └── <Menu.Item>Contact</Menu.Item>                                │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘

┌────────────────────── STAR (direct hook usage) ───────────────────────────────┐
│                                                                               │
│  <Star />                                                                     │
│    │                                                                          │
│    │  Star.js:                                                                │
│    │    const [on, toggle] = useToggle()                                      │
│    │       → on = false (initial)                                             │
│    │       → toggle = () => setOn(!on)                                        │
│    │                                                                          │
│    │  Renders:                                                                │
│    │    on === false → <BsStar onClick={toggle} />     (hollow star)         │
│    │    on === true  → <BsStarFill onClick={toggle} /> (filled star)         │
│    │                                                                          │
│    │  User clicks star:                                                       │
│    │    toggle() → setOn(true) → re-render → <BsStarFill />                  │
│    │    useEffectOnUpdate fires → onToggle() (no-op, default)                │
│    │                                                                          │
└───────────────────────────────────────────────────────────────────────────────┘

┌────────────────── TOGGLE + RENDER PROPS (Toggle.Display) ─────────────────────┐
│                                                                               │
│  <Toggle onToggle={() => console.log("Toggled")}>                            │
│      <Toggle.Button>                                                          │
│          <Toggle.Display>                                                     │
│              {(on) => <div className={`box ${on ? "filled" : ""}`}></div>}   │
│          </Toggle.Display>                                                    │
│      </Toggle.Button>                                                         │
│  </Toggle>                                                                    │
│                                                                               │
│  Toggle.js:                                                                   │
│    [on, setOn] = useState(false)                                              │
│    useEffectOnUpdate(onToggle, [on])                                          │
│    ToggleContext.Provider value={{ on, toggle }}                              │
│                                                                               │
│  ToggleDisplay.js:                                                            │
│    const { on } = useContext(ToggleContext)                                   │
│    return children(on)   ← calls the function the consumer gave as children  │
│                                                                               │
│  Click the box:                                                               │
│    ToggleButton.onClick → toggle() → on = true                               │
│    ToggleDisplay re-renders → children(true) → "box filled" class applied    │
│    useEffectOnUpdate fires → console.log("Toggled")                          │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
```

---

# 12. HTML Structure Recap — React Document Tree

Every project in this module shares the same HTML shell and React entry point pattern:

```
index.html
├── <head>
│   └── <link rel="stylesheet" href="style.css">    ← no Google Fonts (styles are inline CSS)
│
└── <body>
    ├── <div id="root"></div>                        ← React mounts here
    └── <script src="index.js" type="module">        ← ES Module entry point

After ReactDOM.createRoot(document.getElementById('root')).render(<App />):

<div id="root">
    │
    ├── [Folder 01: Button]
    │   └── <main>
    │       ├── <button>Log in with Google</button>                 ← default Button
    │       ├── <button class="button-lg button-success">...</button>
    │       ├── <button class="button-sm button-warning">...</button>
    │       └── <button class="button-sm button-danger">...</button>
    │
    ├── [Folder 02: Avatar]
    │   ├── <div class="avatar"><img src="bob.jpg" /></div>         ← mode 1
    │   ├── <div class="avatar avatar-letters">BZ</div>             ← mode 2
    │   └── <div class="avatar avatar-icon"><svg .../></div>        ← mode 3 (IoPersonSharp)
    │
    ├── [Folder 03: Menu]
    │   └── <div class="menu" role="menu">                          ← MenuContext.Provider renders this
    │       ├── <button aria-expanded="false"
    │       │          aria-haspopup="true"
    │       │          aria-controls=":r0:">Sports</button>         ← MenuButton
    │       └── <div class="menu-dropdown" id=":r0:">              ← MenuDropdown (when open)
    │           ├── <div class="menu-item">Tennis</div>
    │           ├── <div class="menu-item">Pickleball</div>
    │           ├── <div class="menu-item">Racquetball</div>
    │           └── <div class="menu-item">Squash</div>
    │
    ├── [Folder 04: Toggle — Star]
    │   └── <div>                                                   ← ToggleButton wrapper
    │       └── <svg class="star filled" />                         ← Toggle.On (when on)
    │           or <svg class="star" />                             ← Toggle.Off (when off)
    │
    ├── [Folder 05: Toggle — Toggle.Display render prop]
    │   └── <div>                                                   ← ToggleButton
    │       └── <div class="box filled">                            ← Toggle.Display: children(true)
    │           or <div class="box">                                ← Toggle.Display: children(false)
    │
    └── [Folder 06: useToggle — Star via hook]
        └── <svg class="star filled" />                             ← on=true
            or <svg class="star" />                                 ← on=false

State for each project (lives in the root component or compound component):
  Button:            No state — purely presentational
  Avatar:            No state — conditional render from props
  Menu:              open (boolean), menuId (string) in Menu.js
  Toggle (04-05):    on (boolean) in Toggle.js via useState
  useToggle (06):    on (boolean) in useToggle hook via useState
```

---

# 13. How to Run

Each sub-folder (`01. Button`, `02. Avatar`, etc.) is a standalone project loaded directly in the browser via native ES Modules.

Open any `index.html` in a browser **using a local server** — do not open as a `file://` URL, because ES Modules (`type="module"`) require HTTP to resolve imports.

**Recommended: VS Code Live Server**

1. Right-click the `index.html` inside any sub-folder
2. Select **"Open with Live Server"**
3. The project opens at `http://127.0.0.1:5500/...`

**Alternative: `npx serve`**

```bash
# From any sub-folder, e.g.:
cd "01. Button"
npx serve .
# → serving at http://localhost:3000
```

> These projects are **not** Vite projects and have no `package.json` or `node_modules`. They use CDN-loaded React via bare import maps or direct module imports as configured by the Scrimba environment. Opening in a local server is sufficient — no build step is required.

---

# 14. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 15. Advanced React.js
* **Section:** 01. Reusability
* **Projects covered:** Button · Avatar · Menu · Toggle · useEffectOnUpdate · useToggle
