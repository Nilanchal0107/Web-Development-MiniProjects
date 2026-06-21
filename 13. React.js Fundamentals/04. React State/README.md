# Chef Claude — React State

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Hooks](https://img.shields.io/badge/Hooks-useState%20%7C%20useEffect%20%7C%20useRef-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![Anthropic](https://img.shields.io/badge/Anthropic-Claude%203%20Haiku-coral?style=flat-square)
![HuggingFace](https://img.shields.io/badge/HuggingFace-Mixtral-orange?style=flat-square)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Inter-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

An AI-powered recipe generator where users add ingredients and let Claude suggest a recipe — the **Chef Claude** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every React state concept introduced in this module, comparing what is new here against the Data-Driven React project (13/03) — specifically the introduction of `useState`, event handling, form actions, conditional rendering, functional state updates, props vs state, and calling AI APIs from React.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is State?](#3-what-is-state)
4. [What's New vs Data-Driven React](#4-whats-new-vs-data-driven-react)
5. [`useState` — The State Hook](#5-usestate--the-state-hook)
   - [Basic Syntax and Array Destructuring](#51-basic-syntax-and-array-destructuring)
   - [State Triggers Re-renders](#52-state-triggers-re-renders)
   - [Never Mutate State Directly](#53-never-mutate-state-directly)
6. [Functional State Updates — `prev =>`](#6-functional-state-updates--prev-)
7. [Event Handling in React](#7-event-handling-in-react)
   - [React Form `action` — The Modern Pattern](#71-react-form-action--the-modern-pattern)
   - [`FormData` — Reading Submitted Values](#72-formdata--reading-submitted-values)
8. [Props vs State](#8-props-vs-state)
9. [Conditional Rendering](#9-conditional-rendering)
   - [`&&` Short-Circuit Rendering](#91--short-circuit-rendering)
   - [Why `&&` Works — Truthy/Falsy Values](#92-why--works--truthyfalsy-values)
   - [Ternary Operator `? :`](#93-ternary-operator--)
10. [Passing State Down as Props](#10-passing-state-down-as-props)
    - [Passing `getRecipe` as a Prop](#101-passing-getrecipe-as-a-prop)
11. [The `ai.js` Module — Claude and Mistral](#11-the-aijs-module--claude-and-mistral)
    - [System Prompt Design](#111-system-prompt-design)
    - [`getRecipeFromChefClaude`](#112-getrecipefromchefclaude)
    - [`getRecipeFromMistral` — Hugging Face Fallback](#113-getrecipefrommistral--hugging-face-fallback)
12. [Rendering Markdown — `react-markdown`](#12-rendering-markdown--react-markdown)
13. [`useRef` — Scroll to Recipe](#13-useref--scroll-to-recipe)
14. [Accessibility — `aria-live`](#14-accessibility--aria-live)
15. [How the Full App Flow Works](#15-how-the-full-app-flow-works)
16. [HTML Structure Recap — React Document Tree](#16-html-structure-recap--react-document-tree)
17. [How to Run](#17-how-to-run)
18. [Course Reference](#18-course-reference)

---

# 1. Project Overview

**Chef Claude** is an AI-powered ingredient-to-recipe tool. The user types ingredients one at a time into a text form — each submission appends the ingredient to a running list displayed on screen. Once four or more ingredients have been added, a "Get a recipe" prompt section appears. Clicking the button sends the ingredient list to the Anthropic Claude 3 Haiku API, which responds with a Markdown-formatted recipe that is then rendered beautifully on the page. The page auto-scrolls to the recipe section once it appears.

The app includes:

* A **`<Header>`** component with a chef icon and the "Chef Claude" title
* A **text input form** with a React 19-style `action` prop that receives a `FormData` object directly — no `event.preventDefault()` needed
* An **`ingredients`** state array that grows each time the user submits the form
* An **`<IngredientsList>`** component that maps the array to `<li>` elements and conditionally shows a "Get a recipe" call-to-action panel once more than 3 ingredients are present
* A **`recipe`** state string that starts empty and is populated with Markdown text from the Claude API
* A **`<ClaudeRecipe>`** component that renders the Markdown response using the `react-markdown` library
* A **`useRef`** attached to the recipe section for smooth programmatic scrolling once the recipe arrives
* A **`useEffect`** that triggers the scroll whenever `recipe` state changes from empty to populated
* A dual-AI **`ai.js`** module supporting both Anthropic Claude 3 Haiku and Hugging Face Mixtral as recipe generation backends

The goal of this module is not just to build an AI recipe app — it is to understand React's state system: how `useState` stores values that persist between renders, why changing state triggers a re-render, how to pass state and state-updating functions through props, how to conditionally show UI sections based on state, and how to handle user input through React's new `action`-based form pattern.

---

# 2. Project Structure

```
13. React.js Fundamentals/
│
└── 04. React State/
    ├── index.html              → HTML shell: <div id="root">, Google Fonts (Inter)
    ├── index.jsx               → Entry point — createRoot + root.render(<App />)
    ├── index.css               → Styles: header, form, ingredient list, recipe section
    ├── App.jsx                 → Root component — composes <Header /> and <Main />
    ├── ai.js                   → AI integration: Claude 3 Haiku (Anthropic) + Mixtral (HuggingFace)
    ├── recipeCode.md           → Reference markdown for recipe formatting
    ├── components/
    │   ├── Header.jsx          → Chef icon + "Chef Claude" heading
    │   ├── Main.jsx            → All state, form, conditional rendering, and AI call logic
    │   ├── IngredientsList.jsx → Renders ingredient <ul> + conditional "Get a recipe" panel
    │   └── ClaudeRecipe.jsx    → Renders Markdown recipe via react-markdown
    └── images/
        └── chef-claude-icon.png  → Chef hat icon imported as a JS module in Header.jsx
```

---

# 3. What is State?

**State** is data that belongs to a component and can change over time. When state changes, React automatically re-renders the component — the UI always reflects the current state value. This is the central mechanism of every interactive React application.

```
Props  → Data passed IN from a parent  → read-only in the child
State  → Data owned by the component   → can be updated by the component itself
```

| Concept | Props | State |
|---------|-------|-------|
| Who owns it | Parent component | The component itself |
| Can it change? | No — read-only in the child | Yes — via the setter function |
| What triggers a re-render? | Parent re-renders | Calling `setState` |
| Initial value | Passed by parent | Set in `useState(initialValue)` |

> State is the answer to: "what data does this component need to remember between renders?" If a value never changes, it doesn't need to be state — a `const` is enough.

---

# 4. What's New vs Data-Driven React

## New React Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `React.useState(initial)` | `Main.jsx` lines 7, 10 | Declares a state variable and its setter function |
| `setIngredients(...)` | `Main.jsx` line 31 | Calls the setter — updates state and triggers re-render |
| `setRecipe(...)` | `Main.jsx` line 26 | Updates the recipe string state after AI responds |
| `prev => [...]` functional update | `Main.jsx` line 31 | Safely derives new state from the previous value |
| `React.useRef(null)` | `Main.jsx` line 11 | Creates a ref object to access a real DOM node |
| `ref={recipeSection}` | `Main.jsx` line 48 | Attaches the ref to a DOM element |
| `React.useEffect(fn, [recipe])` | `Main.jsx` line 13 | Runs the scroll effect when `recipe` state changes |
| `<form action={addIngredient}>` | `Main.jsx` line 36 | React 19 form action — calls handler with `FormData` directly |
| `formData.get("ingredient")` | `Main.jsx` line 30 | Reads a named field from the submitted `FormData` |
| `{ingredients.length > 0 && <IngredientsList />}` | `Main.jsx` line 46 | `&&` conditional rendering — show only when truthy |
| `{recipe && <ClaudeRecipe />}` | `Main.jsx` line 54 | Shows the recipe section only after AI responds |
| `<ReactMarkdown>{props.recipe}</ReactMarkdown>` | `ClaudeRecipe.jsx` line 7 | Renders a Markdown string as structured HTML |
| `aria-live="polite"` | `IngredientsList.jsx` line 8 | Announces dynamic content updates to screen readers |
| `props.ingredients.length > 3` | `IngredientsList.jsx` line 9 | Conditional threshold — shows CTA only after 4+ ingredients |

## Comparison: Data-Driven React (13/03) vs React State (13/04)

| Feature | Data-Driven React | React State |
|---------|------------------|------------|
| Data source | Static `data.js` array | Dynamic — user input + AI API |
| State used | None | `ingredients` (array) + `recipe` (string) |
| User interaction | None | Form submit, button click |
| Components shown | Always the same | Conditional — change based on state |
| AI integration | None | Claude 3 Haiku via Anthropic SDK |
| `useRef` | None | Scroll-to-recipe on AI response |

---

# 5. `useState` — The State Hook

## 5.1 Basic Syntax and Array Destructuring

```jsx
// Main.jsx
const [ingredients, setIngredients] = React.useState(
  ["chicken", "all the main spices", "corn", "heavy cream", "pasta"]
)
const [recipe, setRecipe] = React.useState("")
```

`useState(initialValue)` returns an **array of exactly two items**:
1. The current state value
2. A setter function to update it

**Array destructuring** unpacks both into named variables in one line. The names are arbitrary — convention is `[value, setValue]`.

| Part | Example | Type | Purpose |
|------|---------|------|---------|
| Current value | `ingredients` | `string[]` | Used in JSX — `.map()`, `.length`, conditions |
| Setter function | `setIngredients` | `Function` | Call to update state and trigger re-render |
| Initial value | `["chicken", ...]` | `string[]` | Value on the very first render only |

```jsx
// These are equivalent — destructuring is just array access
const stateArray = React.useState(["chicken"])
const ingredients = stateArray[0]
const setIngredients = stateArray[1]

// Cleaner with destructuring:
const [ingredients, setIngredients] = React.useState(["chicken"])
```

## 5.2 State Triggers Re-renders

Every call to a setter function (`setIngredients`, `setRecipe`) tells React to re-run the component function with the updated state value. The new JSX returned reflects the new data — React diffs it against the previous render and updates only the changed DOM nodes.

```
User submits "garlic"
        │
        ▼
addIngredient(formData) is called
        │
        ▼
setIngredients(prev => [...prev, "garlic"])
        │
        ▼
React schedules a re-render of Main
        │
        ▼
Main() runs again:
  ingredients = ["chicken", ..., "garlic"]  ← new value
        │
        ▼
<IngredientsList ingredients={["chicken", ..., "garlic"]} />
        │
        ▼
New <li>garlic</li> appears in the DOM
```

## 5.3 Never Mutate State Directly

```jsx
// ❌ Bad — mutates the array directly, React does not detect the change
ingredients.push("garlic")
setIngredients(ingredients)  // same reference → React skips re-render

// ✅ Good — creates a new array, React detects the reference change
setIngredients(prev => [...prev, "garlic"])
```

React uses **referential equality** to detect state changes — it compares the old and new state with `Object.is`. Mutating an array or object in place does not change the reference, so React sees "old state === new state" and skips the re-render. Always create a **new** array or object when updating state.

> Treat state as **immutable**. Never push, splice, or directly assign to state arrays or objects. Always return a new value from the setter.

---

# 6. Functional State Updates — `prev =>`

```jsx
// Main.jsx
function addIngredient(formData) {
  const newIngredient = formData.get("ingredient")
  setIngredients(prevIngredients => [...prevIngredients, newIngredient])
}
```

The **functional update form** passes a function to the setter instead of a value directly. React calls the function with the most recent (guaranteed up-to-date) state as the argument.

```jsx
// Direct update — can use stale state if multiple updates are queued
setIngredients([...ingredients, newIngredient])

// Functional update — always uses the latest state
setIngredients(prev => [...prev, newIngredient])
```

The spread operator `[...prev, newIngredient]` creates a new array containing all items from `prev` plus `newIngredient` appended at the end.

| Pattern | Risk | When to use |
|---------|------|------------|
| `setState(newValue)` | May read stale state | When new state does not depend on old state |
| `setState(prev => newValue)` | Always safe | When new state is derived from old state |

> Always use the functional form `prev => ...` when the new state depends on the previous state. This is especially important in event handlers that might be called multiple times in quick succession.

---

# 7. Event Handling in React

## 7.1 React Form `action` — The Modern Pattern

```jsx
// Main.jsx
<form action={addIngredient} className="add-ingredient-form">
  <input
    type="text"
    placeholder="e.g. oregano"
    aria-label="Add ingredient"
    name="ingredient"
  />
  <button>Add ingredient</button>
</form>
```

React 19 introduced the `action` prop on `<form>` — when a function is passed as `action`, React intercepts the form submission, prevents the default browser behavior automatically, and calls the function with a `FormData` object. No manual `event.preventDefault()` is needed.

| Pattern | Code | Requires `preventDefault`? |
|---------|------|-----------------------------|
| Traditional DOM event | `onSubmit={e => { e.preventDefault(); ... }}` | ✅ Yes |
| React 19 `action` prop | `action={myFunction}` | ❌ No — React handles it |

The form also clears its inputs automatically after the `action` function runs — React resets the form, so the text field empties itself without any manual code.

## 7.2 `FormData` — Reading Submitted Values

```jsx
// Main.jsx
function addIngredient(formData) {
  const newIngredient = formData.get("ingredient")
  setIngredients(prevIngredients => [...prevIngredients, newIngredient])
}
```

`FormData` is a built-in browser API — a key-value map of all fields in a submitted form. `formData.get("ingredient")` reads the value of the `<input name="ingredient">` field by its `name` attribute.

```
<input name="ingredient" value="garlic" />
        ↓
formData.get("ingredient") === "garlic"
```

The `name` attribute on `<input>` is the key — it must match the string passed to `.get()` exactly.

---

# 8. Props vs State

Chef Claude clearly demonstrates the boundary between props and state:

```jsx
// Main.jsx — state lives here, owned by Main
const [ingredients, setIngredients] = React.useState([...])
const [recipe, setRecipe] = React.useState("")

// State is passed DOWN as props to child components
<IngredientsList
  ingredients={ingredients}     // state value as prop
  getRecipe={getRecipe}         // state-updating function as prop
/>

{recipe && <ClaudeRecipe recipe={recipe} />}   // state value as prop
```

```jsx
// IngredientsList.jsx — receives data via props, owns no state
export default function IngredientsList(props) {
  const items = props.ingredients.map(...)    // reads props, never touches state
  // ...
  <button onClick={props.getRecipe}>Get a recipe</button>  // calls parent's function
}
```

| | `Main` | `IngredientsList` | `ClaudeRecipe` |
|-|--------|------------------|----------------|
| Owns state | ✅ `ingredients`, `recipe` | ❌ None | ❌ None |
| Receives props | ❌ None | ✅ `ingredients`, `getRecipe` | ✅ `recipe` |
| Can update state | ✅ Directly | ✅ Via `props.getRecipe()` | ❌ Read-only |

> **Lift state up** to the lowest common ancestor of all components that need it. `ingredients` is used by both `Main` (to send to the AI) and `IngredientsList` (to render the list), so it lives in `Main` — the shared parent.

---

# 9. Conditional Rendering

## 9.1 `&&` Short-Circuit Rendering

```jsx
// Main.jsx — show IngredientsList only when there are ingredients
{ingredients.length > 0 &&
  <IngredientsList
    ref={recipeSection}
    ingredients={ingredients}
    getRecipe={getRecipe}
  />
}

// Main.jsx — show recipe only when the AI has responded
{recipe && <ClaudeRecipe recipe={recipe} />}

// IngredientsList.jsx — show "Get a recipe" CTA only after 4+ ingredients
{props.ingredients.length > 3 && <div className="get-recipe-container">
  ...
</div>}
```

The `&&` operator **short-circuits**: if the left side is falsy, the right side is never evaluated and nothing is rendered. If the left side is truthy, JSX on the right side is returned and rendered.

## 9.2 Why `&&` Works — Truthy/Falsy Values

```jsx
// ✅ Safe — boolean, renders nothing when false
{ingredients.length > 0 && <IngredientsList />}

// ⚠️ Dangerous — number 0 is falsy BUT React renders "0" in the DOM
{ingredients.length && <IngredientsList />}  // ← renders "0" when array is empty!
```

When `ingredients.length` is `0`, `0 && <IngredientsList />` evaluates to `0` (a falsy number). React renders numbers, so `0` appears as literal text in the DOM. Using a boolean expression (`length > 0`) returns `false` — which React silently skips.

| Left side value | Type | Rendered? | Output |
|-----------------|------|-----------|--------|
| `true` | boolean | ✅ Yes | JSX on the right |
| `false` | boolean | ❌ No | Nothing |
| `0` | number | ⚠️ Yes — renders `"0"` | The number `0` as text |
| `""` (empty string) | string | ❌ No | Nothing |
| `"hello"` (non-empty) | string | ✅ Yes | JSX on the right |

> Always use a **boolean expression** (`length > 0`, `!!value`, `Boolean(value)`) on the left of `&&` — never a bare number or a value that might be `0`.

## 9.3 Ternary Operator `? :`

An alternative to `&&` when you need to render one thing or another:

```jsx
// Show a loading message while waiting for the recipe, the recipe when it arrives
{recipe ? <ClaudeRecipe recipe={recipe} /> : <p>Waiting for your recipe...</p>}

// Equivalent using && (no else branch)
{recipe && <ClaudeRecipe recipe={recipe} />}
```

| Pattern | Use when |
|---------|---------|
| `condition && <A />` | Show `A` or nothing |
| `condition ? <A /> : <B />` | Show `A` or `B` — two outcomes |

---

# 10. Passing State Down as Props

## 10.1 Passing `getRecipe` as a Prop

```jsx
// Main.jsx — defines the async function and passes it as a prop
async function getRecipe() {
  const recipeMarkdown = await getRecipeFromChefClaude(ingredients)
  setRecipe(recipeMarkdown)
}

<IngredientsList
  ingredients={ingredients}
  getRecipe={getRecipe}      // ← function passed as a prop
/>
```

```jsx
// IngredientsList.jsx — calls the function via props
<button onClick={props.getRecipe}>Get a recipe</button>
```

`getRecipe` is defined in `Main` (because it calls `setRecipe`, a state setter that belongs to `Main`), but it is **invoked** in `IngredientsList` when the button is clicked. Passing functions as props is the React pattern for allowing child components to trigger state changes in their parent.

```
Main owns: setRecipe()
    └─ defines: getRecipe() which calls setRecipe()
        └─ passes getRecipe as props.getRecipe to IngredientsList
               └─ <button onClick={props.getRecipe}>
                      └─ User clicks → getRecipe() runs → setRecipe(markdown) → Main re-renders
```

---

# 11. The `ai.js` Module — Claude and Mistral

## 11.1 System Prompt Design

```javascript
// ai.js
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and
suggests a recipe they could make with some or all of those ingredients.
You don't need to use every ingredient they mention in your recipe. The recipe
can include additional ingredients they didn't mention, but try not to include
too many extra ingredients. Format your response in markdown to make it easier
to render to a web page
`
```

The system prompt defines the AI's **persona and constraints**. Key instructions:
- Use *some or all* of the provided ingredients (not necessarily all)
- OK to add a few extra ingredients
- **Format in Markdown** — critical because `react-markdown` is used to render the response

## 11.2 `getRecipeFromChefClaude`

```javascript
// ai.js
export async function getRecipeFromChefClaude(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ")

  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
      }
    ],
  })
  return msg.content[0].text
}
```

`ingredientsArr.join(", ")` converts the state array into a comma-separated string for the API prompt. The Anthropic SDK call is `await`ed — the function is `async`, so `Main.jsx`'s `getRecipe` is also `async` to use `await`.

| SDK option | Value | Purpose |
|-----------|-------|---------|
| `model` | `claude-3-haiku-20240307` | Fast, cost-efficient Claude model |
| `max_tokens` | `1024` | Maximum length of the AI response |
| `system` | `SYSTEM_PROMPT` | Defines the AI's role and output format |
| `messages` | `[{ role: "user", content }]` | The user's actual request |

`msg.content[0].text` navigates the response structure: `content` is an array of content blocks, the first (`[0]`) is a text block, and `.text` is the string.

## 11.3 `getRecipeFromMistral` — Hugging Face Fallback

```javascript
// ai.js
export async function getRecipeFromMistral(ingredientsArr) {
  const response = await hf.chatCompletion({
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `I have ${ingredientsString}...` },
    ],
    max_tokens: 1024,
  })
  return response.choices[0].message.content
}
```

`getRecipeFromMistral` provides a free alternative using the Hugging Face Inference API with the open-source Mixtral 8x7B model. It uses the same prompt structure — `system` + `user` messages — making it a drop-in replacement. The response shape differs: `response.choices[0].message.content` vs Claude's `msg.content[0].text`.

| | Claude (Anthropic) | Mistral (HuggingFace) |
|-|-------------------|----------------------|
| Model | `claude-3-haiku-20240307` | `mistralai/Mixtral-8x7B-Instruct-v0.1` |
| API key env var | `ANTHROPIC_API_KEY` | `HF_ACCESS_TOKEN` |
| Response path | `msg.content[0].text` | `response.choices[0].message.content` |
| Cost | Paid (very cheap) | Free tier available |

> **Security warning from the source:** API keys embedded in a frontend bundle are visible to anyone who inspects the source code. For a production app, AI calls must go through a server-side backend or serverless function — the key must never appear in browser-executed code.

---

# 12. Rendering Markdown — `react-markdown`

```jsx
// ClaudeRecipe.jsx
import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe(props) {
  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Chef Claude Recommends:</h2>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  )
}
```

Claude returns its recipe as a **Markdown string** — a plain text format using `#` for headings, `**` for bold, `-` or `*` for bullet lists, and `1.` for numbered lists. Raw Markdown displayed as text would look like:

```
## Creamy Chicken Pasta

**Ingredients:**
- 2 chicken breasts
- 1 cup heavy cream
```

`<ReactMarkdown>` parses the Markdown string and renders it as proper HTML elements — `<h2>`, `<ul>`, `<li>`, `<strong>`, etc. — giving the recipe professional formatting without any manual parsing.

| Markdown input | HTML output |
|---------------|-------------|
| `## Creamy Chicken Pasta` | `<h2>Creamy Chicken Pasta</h2>` |
| `**Ingredients:**` | `<strong>Ingredients:</strong>` |
| `- 2 chicken breasts` | `<ul><li>2 chicken breasts</li></ul>` |
| `1. Boil water` | `<ol><li>Boil water</li></ol>` |

---

# 13. `useRef` — Scroll to Recipe

```jsx
// Main.jsx
const recipeSection = React.useRef(null)

React.useEffect(() => {
  if (recipe !== "" && recipeSection.current !== null) {
    const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
    window.scroll({ top: yCoord, behavior: "smooth" })
  }
}, [recipe])

// Passed through props to IngredientsList → placed on the container div
<IngredientsList
  ref={recipeSection}
  ingredients={ingredients}
  getRecipe={getRecipe}
/>
```

`useRef` creates a **mutable reference object** (`{ current: null }`) that persists across renders without triggering re-renders when changed. When `ref={recipeSection}` is placed on a DOM element, React sets `recipeSection.current` to that real DOM node after the element mounts.

`getBoundingClientRect().top` gives the element's position relative to the current viewport. Adding `window.scrollY` converts it to an absolute page position. `window.scroll({ behavior: "smooth" })` then scrolls the page to that position with animation — a smoother alternative to `element.scrollIntoView()` which has iframe compatibility issues.

The `useEffect` dependency `[recipe]` means the scroll runs only when `recipe` changes — specifically, when it transitions from `""` to a populated string after the AI responds.

| API | What it does |
|-----|-------------|
| `useRef(null)` | Creates `{ current: null }` — a stable container for the DOM node |
| `ref={recipeSection}` | Sets `recipeSection.current = <div>` after mount |
| `getBoundingClientRect().top` | Distance from element to viewport top (changes with scroll position) |
| `+ window.scrollY` | Converts viewport-relative to page-absolute Y coordinate |
| `window.scroll({ top, behavior: "smooth" })` | Scrolls to the coordinate with smooth animation |

---

# 14. Accessibility — `aria-live`

```jsx
// IngredientsList.jsx
<ul className="ingredients-list" aria-live="polite">
  {ingredientsListItems}
</ul>

// ClaudeRecipe.jsx
<section className="suggested-recipe-container" aria-live="polite">
  ...
</section>
```

`aria-live="polite"` tells screen readers to announce changes to the element's content — but only after the user finishes what they are currently doing (hence "polite"). When a new ingredient is added to the `<ul>`, or the recipe section appears, a screen reader announces the update without interrupting the user.

| `aria-live` value | Announcement timing | Use case |
|------------------|--------------------|---------  |
| `"polite"` | After current task | Recipe updates, ingredient additions |
| `"assertive"` | Immediately interrupts | Critical errors or alerts |
| `"off"` (default) | Never announced | Non-dynamic content |

---

# 15. How the Full App Flow Works

```
┌─────────────────── INITIAL STATE ────────────────────────────┐
│                                                              │
│ ingredients = ["chicken", "spices", "corn", "cream", "pasta"]│
│ recipe      = ""                                             │
│                                                              │
│ Renders: form + IngredientsList (5 items) + "Get a recipe"   │
│          (length > 3 → CTA panel is visible)                 │
│          No <ClaudeRecipe /> (recipe is "")                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌─────────────────── USER ADDS INGREDIENT ─────────────────────┐
│                                                              │
│ User types "garlic" → clicks "Add ingredient"                │
│   └─ Form submits → React calls addIngredient(formData)      │
│       formData.get("ingredient") === "garlic"                │
│   └─ setIngredients(prev => [...prev, "garlic"])             │
│   └─ React re-renders Main:                                  │
│         ingredients = [..., "garlic"]  (6 items now)         │
│   └─ <IngredientsList ingredients={[6 items]} />             │
│       └─ New <li>garlic</li> appears in the list             │
│   └─ Form input clears automatically                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘

┌─────────────────── USER CLICKS "GET A RECIPE" ───────────────┐
│                                                              │
│ Button onClick → props.getRecipe() → Main's getRecipe()      │
│   └─ async getRecipe()                                       │
│       └─ ingredientsArr.join(", ")                           │
│             → "chicken, all the main spices, corn, ..."      │
│       └─ await getRecipeFromChefClaude(ingredients)          │
│           └─ anthropic.messages.create({                     │
│                model: "claude-3-haiku",                      │
│                system: SYSTEM_PROMPT,                        │
│                messages: [{ role: "user", content }]         │
│              })                                              │
│           └─ returns msg.content[0].text  (Markdown string)  │
│       └─ setRecipe(recipeMarkdown)                           │
│           └─ React re-renders Main:                          │
│               recipe = "## Creamy Chicken Pasta\n..."        │
│                                                              │
│   └─ {recipe && <ClaudeRecipe recipe={recipe} />} → renders  │
│       └─ <ReactMarkdown> parses Markdown → HTML              │
│                                                              │
│   └─ useEffect([recipe]) fires:                              │
│       recipeSection.current is the CTA div                   │
│       getBoundingClientRect().top + scrollY → yCoord         │
│       window.scroll({ top: yCoord, behavior: "smooth" })     │
│       Page scrolls smoothly to the recipe section ✅          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

# 16. HTML Structure Recap — React Document Tree

```
index.html
├── <head>
│   ├── <link> → Google Fonts (Inter: variable weight 100–900)
│   └── <link> → /index.css
│
└── <body>
    ├── <div id="root">
    │   │
    │   │  After root.render(<App />) runs:
    │   │
    │   ├── <header>                           ← <Header /> component
    │   │   ├── <img src="[chef-claude-icon]" />
    │   │   └── <h1>Chef Claude</h1>
    │   │
    │   └── <main>                             ← <Main /> component
    │       │
    │       ├── <form class="add-ingredient-form"
    │       │         action={addIngredient}>   ← React 19 action
    │       │   ├── <input
    │       │   │     type="text"
    │       │   │     name="ingredient"
    │       │   │     aria-label="Add ingredient" />
    │       │   └── <button>Add ingredient</button>
    │       │
    │       ├── {ingredients.length > 0 &&
    │       │     <section>                    ← <IngredientsList />
    │       │       <h2>Ingredients on hand:</h2>
    │       │       <ul class="ingredients-list"
    │       │             aria-live="polite">
    │       │         <li key="chicken">chicken</li>
    │       │         <li key="...">...</li>
    │       │       </ul>
    │       │       {ingredients.length > 3 &&
    │       │         <div class="get-recipe-container">
    │       │           <div ref={recipeSection}>  ← useRef target
    │       │             <h3>Ready for a recipe?</h3>
    │       │             <p>Generate a recipe...</p>
    │       │           </div>
    │       │           <button onClick={props.getRecipe}>
    │       │             Get a recipe
    │       │           </button>
    │       │         </div>
    │       │       }
    │       │     </section>
    │       │   }
    │       │
    │       └── {recipe &&
    │             <section class="suggested-recipe-container"
    │                       aria-live="polite">  ← <ClaudeRecipe />
    │               <h2>Chef Claude Recommends:</h2>
    │               <ReactMarkdown>            ← renders Markdown as HTML
    │                 ## Creamy Chicken Pasta
    │                 **Ingredients:** ...
    │               </ReactMarkdown>
    │             </section>
    │           }
    │
    └── <script src="/index.jsx" type="module">

State (lives in Main):
  ingredients = string[]   → drives IngredientsList + AI call
  recipe      = string     → drives ClaudeRecipe + scroll effect
```

---

# 17. How to Run

This project requires an AI API key and uses Vite for development.

```bash
# Install dependencies (react, react-dom, vite, @anthropic-ai/sdk, react-markdown, etc.)
npm install

# Set your API key as an environment variable
# On Scrimba: use the environment variables panel
# Locally: create a .env file (NEVER commit this file)
ANTHROPIC_API_KEY=your_key_here

# Start the Vite development server
npm run dev
```

> ⚠️ **Never commit API keys.** Add `.env` to your `.gitignore`. The `ai.js` file itself warns that running this on a live deployed site would expose your API key to anyone who inspects the source. For production, wrap the AI call in a backend route.

Vite starts at `http://localhost:5173`. The app works with the pre-loaded ingredients on first load. To test the full flow:
1. Add a few more ingredients (or use the defaults — there are already 5)
2. Click "Get a recipe" — the CTA appears after 4+ ingredients
3. Wait for Claude's response (~2–5 seconds)
4. Watch the page smooth-scroll to the recipe section

Alternatively, swap `getRecipeFromChefClaude` for `getRecipeFromMistral` in `Main.jsx` line 25 to use the free Hugging Face model.

---

# 18. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 13. React.js Fundamentals
* **Project:** 04. React State — Chef Claude
