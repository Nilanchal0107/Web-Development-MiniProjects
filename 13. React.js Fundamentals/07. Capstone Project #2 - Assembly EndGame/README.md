# Assembly: Endgame — React.js Fundamentals Capstone #2

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Hooks](https://img.shields.io/badge/Hooks-useState-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![CSS](https://img.shields.io/badge/CSS-Flexbox%20%7C%20pseudo--elements-blue?style=flat-square&logo=css3)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Hanken%20Grotesk-red?style=flat-square&logo=googlefonts)
![clsx](https://img.shields.io/badge/clsx-Conditional%20ClassNames-lightgrey?style=flat-square)
![react-confetti](https://img.shields.io/badge/react--confetti-Win%20Animation-ff69b4?style=flat-square)
![Accessibility](https://img.shields.io/badge/a11y-ARIA%20Live%20%7C%20aria--disabled-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A programming-themed word-guessing game where players must guess the hidden word before losing all 8 programming languages to Assembly — the **Assembly: Endgame** Capstone Project #2 from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every React concept exercised in this capstone, comparing what is deepened here against the Tenzies project (13/06) — specifically introducing the `clsx` utility for conditional class names, helper functions for rendering, derived value composition, external data modules, random word selection, and a more complex accessibility pattern with multiple ARIA live regions.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Tenzies](#3-whats-new-vs-tenzies)
4. [State Design — Minimal and Intentional](#4-state-design--minimal-and-intentional)
   - [Only Two State Variables](#41-only-two-state-variables)
   - [Lazy Initialisation with `getRandomWord()`](#42-lazy-initialisation-with-getrandomword)
5. [Derived Values — Computing Everything from State](#5-derived-values--computing-everything-from-state)
6. [External Data Modules](#6-external-data-modules)
   - [`languages.js` — The Language Chips Array](#61-languagesjs--the-language-chips-array)
   - [`words.js` + `utils.js` — Word Bank and Helpers](#62-wordsjs--utilsjs--word-bank-and-helpers)
7. [`clsx` — Conditional Class Names](#7-clsx--conditional-class-names)
   - [Object Syntax](#71-object-syntax)
   - [String Argument Syntax](#72-string-argument-syntax)
8. [Rendering Language Chips — Lost Languages](#8-rendering-language-chips--lost-languages)
9. [Rendering the Word Display — Letter Boxes](#9-rendering-the-word-display--letter-boxes)
10. [Rendering the Keyboard](#10-rendering-the-keyboard)
    - [Correct and Wrong Guesses](#101-correct-and-wrong-guesses)
    - [Disabling the Keyboard on Game Over](#102-disabling-the-keyboard-on-game-over)
11. [`renderGameStatus()` — Helper Function for Conditional Rendering](#11-rendergamestatus--helper-function-for-conditional-rendering)
    - [Farewell Messages](#111-farewell-messages)
    - [Won / Lost Banners](#112-won--lost-banners)
12. [Farewell Text — `getFarewellText()`](#12-farewell-text--getfarewelltext)
13. [Starting a New Game — Full State Reset](#13-starting-a-new-game--full-state-reset)
14. [Accessibility — Dual ARIA Live Regions](#14-accessibility--dual-aria-live-regions)
    - [Visual Game Status (`role="status"`)](#141-visual-game-status-rolestatus)
    - [Hidden Screen Reader Region (`.sr-only`)](#142-hidden-screen-reader-region-sr-only)
15. [CSS — `::before` Pseudo-Element for the Skull Overlay](#15-css--before-pseudo-element-for-the-skull-overlay)
16. [How the Full App Flow Works](#16-how-the-full-app-flow-works)
17. [HTML Structure Recap — React Document Tree](#17-html-structure-recap--react-document-tree)
18. [How to Run](#18-how-to-run)
19. [Course Reference](#19-course-reference)

---

# 1. Project Overview

**Assembly: Endgame** is a Hangman-style word game with a programming twist. A random word from a curated list is selected at the start of each game. The player has 8 chances to guess the word by clicking letters on an on-screen keyboard — one wrong guess per programming language (HTML → CSS → JavaScript → React → TypeScript → Node.js → Python → Ruby). If the player exhausts all 8 attempts, **Assembly** itself takes over the programming world. Guess correctly in time to keep Assembly at bay.

The app includes:

* A **header section** with the game title and the stakes of the game explained in a subtitle
* A **game status section** that conditionally shows: a farewell message for the most recently lost language, a "You win!" banner with confetti, or a "Game over!" loss banner — all rendered through a single `renderGameStatus()` helper function
* A **language chips row** showing all 9 languages (HTML through Assembly) as coloured badges — each "lost" language gets a 💀 skull overlay via a CSS `::before` pseudo-element
* A **word display row** of letter boxes, each revealing the letter if guessed or showing blank — missed letters revealed in red on game loss
* A **hidden ARIA live region** (`.sr-only`) that narrates guess results and remaining attempts to screen reader users
* An **on-screen keyboard** of 26 letter buttons coloured green (correct) or red (wrong) after being guessed — disabled entirely when the game ends
* A **"New Game" button** that appears only after the game ends and resets both state variables to start fresh

The goal of this capstone is not just to build a game — it is to master **derived state composition**, **conditional class names with `clsx`**, **helper function rendering patterns**, **external data modules**, **accessibility with multiple ARIA live regions**, and the discipline of keeping state minimal while computing everything else on every render.

---

# 2. Project Structure

```
13. React.js Fundamentals/
│
└── 07. Capstone Project #2 - Assembly EndGame/
    ├── index.html      → HTML shell: <div id="root">, Google Fonts (Hanken Grotesk)
    ├── index.jsx       → Entry point — ReactDOM.createRoot + root.render(<App />)
    ├── index.css       → All styles: dark theme, chips, word boxes, keyboard, sr-only
    ├── App.jsx         → Root component — all state, derived values, rendering logic
    ├── languages.js    → Exported array of 9 language objects { name, backgroundColor, color }
    ├── words.js        → Exported array of common English words for random selection
    └── utils.js        → getRandomWord() + getFarewellText(language) helper functions
```

---

# 3. What's New vs Tenzies

## New React and JavaScript Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `clsx(...)` | `App.jsx` — chips, keyboard, status | Utility for building `className` strings conditionally without template literal clutter |
| `clsx({ key: bool })` (object syntax) | `App.jsx` line 87–90 | Adds class names only when the boolean value is `true` |
| `clsx("base", bool && "extra")` (string) | `App.jsx` line 59 | Conditionally appends a string class name |
| Helper function rendering (`renderGameStatus`) | `App.jsx` line 112 | Extracts complex conditional JSX into a dedicated function for readability |
| `aria-disabled={bool}` | `App.jsx` line 97 | Marks a keyboard button as "already guessed" in the accessibility tree |
| `disabled={isGameOver}` | `App.jsx` line 96 | Native HTML — prevents clicks and changes cursor on all keyboard buttons |
| `role="status"` | `App.jsx` line 158 | Marks the game status section as an ARIA live region with `polite` semantics |
| `React.Fragment` shorthand `<>` | `App.jsx` lines 123–127 | Groups multiple JSX elements without adding a DOM node |
| `letter.toUpperCase()` | `App.jsx` line 101 | Displays keyboard letters as uppercase while comparing in lowercase internally |
| External data module (`languages.js`) | `App.jsx` line 3 | Separates static configuration data from component logic |
| External utility module (`utils.js`) | `App.jsx` line 4 | Separates pure functions from component code |
| `words.js` word bank | `utils.js` line 1 | Large data array imported and sampled with `Math.random()` |

## New npm Package

| Package | Import | Purpose |
|---------|--------|---------|
| `clsx` | `import { clsx } from "clsx"` | Lightweight utility that joins class name strings, filtering out falsy values — replaces verbose ternary expressions in `className` props |

## Comparison: Tenzies (13/06) vs Assembly: Endgame (13/07)

| Feature | Tenzies | Assembly: Endgame |
|---------|---------|------------------|
| Number of state variables | 1 (`dice`) | 2 (`currentWord`, `guessedLetters`) |
| External data files | None — all generated | `languages.js`, `words.js`, `utils.js` |
| `useRef` / `useEffect` | Both used | Neither used |
| Class name management | Inline `style={}` | `clsx()` for all dynamic classes |
| Child component | `<Die />` | No child components — all in `App.jsx` |
| Keyboard | Native dice buttons | Rendered 26-letter keyboard grid |
| Win condition logic | `.every()` on one array | `.every()` on `currentWord` split |
| Accessibility | `aria-live`, `aria-pressed`, `.sr-only` | `role="status"`, `aria-live`, `aria-disabled`, `.sr-only` |
| On-game-end UX | Focus moves to button via `useRef` | "New Game" button conditionally rendered |

---

# 4. State Design — Minimal and Intentional

## 4.1 Only Two State Variables

```jsx
// App.jsx
const [currentWord, setCurrentWord] = useState(() => getRandomWord())
const [guessedLetters, setGuessedLetters] = useState([])
```

Despite the visual complexity of the game, the **entire application state** fits in two variables:

| State variable | Type | Initial value | Meaning |
|---------------|------|--------------|---------|
| `currentWord` | `string` | Random word from `words.js` | The word the player must guess |
| `guessedLetters` | `string[]` | `[]` (empty array) | Every letter the player has clicked so far |

Every other piece of data in the game is **derived** from these two values on every render. There is no state for wrong guess count, no state for whether the game is won or lost, no state for which languages are "dead" — all of that is computed.

> The skill being practised here is **state minimisation**. The more state you store, the more synchronisation bugs you create. If a value can be computed from existing state, it should always be computed — never stored separately.

## 4.2 Lazy Initialisation with `getRandomWord()`

```jsx
// App.jsx
const [currentWord, setCurrentWord] = useState(() => getRandomWord())
//                                              ↑
//                                    Function reference, NOT a call
//                                    getRandomWord() runs only on first render
```

`getRandomWord()` (from `utils.js`) samples the large `words.js` array randomly. Passing it as a function reference `() => getRandomWord()` is **lazy initialisation** — React calls it only once (on mount) rather than on every re-render.

```jsx
// utils.js
import { words } from "./words"

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}
```

`Math.floor(Math.random() * words.length)` produces a random integer from `0` to `words.length - 1` — a valid array index. `words[randomIndex]` returns the word string at that position.

---

# 5. Derived Values — Computing Everything from State

```jsx
// App.jsx — all derived from just [currentWord, guessedLetters]
const numGuessesLeft = languages.length - 1             // 8 (9 languages, last is Assembly)
const wrongGuessCount =
    guessedLetters.filter(letter => !currentWord.includes(letter)).length
const isGameWon =
    currentWord.split("").every(letter => guessedLetters.includes(letter))
const isGameLost = wrongGuessCount >= numGuessesLeft
const isGameOver = isGameWon || isGameLost
const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
```

Every important game concept is a derived value:

| Derived value | Computation | What it represents |
|--------------|------------|-------------------|
| `numGuessesLeft` | `languages.length - 1` = `8` | Total wrong guesses allowed (one per language except Assembly) |
| `wrongGuessCount` | `.filter(l => !currentWord.includes(l)).length` | Letters guessed that are NOT in the word |
| `isGameWon` | `currentWord.split("").every(l => guessedLetters.includes(l))` | All letters in the word have been guessed |
| `isGameLost` | `wrongGuessCount >= numGuessesLeft` | Wrong guesses reached or exceeded the limit |
| `isGameOver` | `isGameWon \|\| isGameLost` | Either end condition is true |
| `lastGuessedLetter` | `guessedLetters[guessedLetters.length - 1]` | The most recent letter guessed |
| `isLastGuessIncorrect` | `lastGuessedLetter && !currentWord.includes(lastGuessedLetter)` | Most recent guess was wrong — triggers farewell message |

```
Example: currentWord = "react", guessedLetters = ["r", "e", "x", "a"]

wrongGuessCount:
  "r" → currentWord.includes("r") ✅ correct, filtered out
  "e" → currentWord.includes("e") ✅ correct, filtered out
  "x" → currentWord.includes("x") ❌ wrong, included
  "a" → currentWord.includes("a") ✅ correct, filtered out
  wrongGuessCount = 1

isGameWon:
  "r" in guessedLetters? ✅  "e"? ✅  "a"? ✅  "c"? ❌
  every() short-circuits → false

isGameLost: 1 >= 8 → false
```

---

# 6. External Data Modules

## 6.1 `languages.js` — The Language Chips Array

```js
// languages.js
export const languages = [
    { name: "HTML",       backgroundColor: "#E2680F", color: "#F9F4DA" },
    { name: "CSS",        backgroundColor: "#328AF1", color: "#F9F4DA" },
    { name: "JavaScript", backgroundColor: "#F4EB13", color: "#1E1E1E" },
    { name: "React",      backgroundColor: "#2ED3E9", color: "#1E1E1E" },
    { name: "TypeScript", backgroundColor: "#298EC6", color: "#F9F4DA" },
    { name: "Node.js",    backgroundColor: "#599137", color: "#F9F4DA" },
    { name: "Python",     backgroundColor: "#FFD742", color: "#1E1E1E" },
    { name: "Ruby",       backgroundColor: "#D02B2B", color: "#F9F4DA" },
    { name: "Assembly",   backgroundColor: "#2D519F", color: "#F9F4DA" },
]
```

`languages.js` is a **static data module** — a JavaScript file that exports only data, no React components or logic. Separating it from `App.jsx` keeps the component file focused on behaviour.

The array has 9 elements. `languages.length - 1 = 8` is the number of allowed wrong guesses — the 9th language (Assembly) is never "killed"; it represents the end state. Each language object carries its own brand colours (`backgroundColor`, `color`) applied as inline styles on its chip.

| Field | Type | Purpose |
|-------|------|---------|
| `name` | `string` | Displayed inside the chip and used by `getFarewellText()` |
| `backgroundColor` | `string` (hex) | Chip background — each language has its iconic brand colour |
| `color` | `string` (hex) | Chip text colour — white for dark backgrounds, near-black for light ones |

## 6.2 `words.js` + `utils.js` — Word Bank and Helpers

```js
// utils.js — two pure exported functions
import { words } from "./words"

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}

export function getFarewellText(language) {
    const options = [
        `Farewell, ${language}`,
        `Adios, ${language}`,
        `R.I.P., ${language}`,
        `We'll miss you, ${language}`,
        `Oh no, not ${language}!`,
        `${language} bites the dust`,
        `Gone but not forgotten, ${language}`,
        `The end of ${language} as we know it`,
        `Off into the sunset, ${language}`,
        `${language}, it's been real`,
        `${language}, your watch has ended`,
        `${language} has left the building`
    ]
    const randomIndex = Math.floor(Math.random() * options.length)
    return options[randomIndex]
}
```

`utils.js` demonstrates the **separation of concerns** principle — pure functions that compute values are extracted from the component so that `App.jsx` only contains React-specific code.

| Function | Parameters | Returns | Where called |
|----------|-----------|---------|-------------|
| `getRandomWord()` | None | A random word string from `words.js` | `useState` lazy init + `startNewGame()` |
| `getFarewellText(language)` | `language: string` | A random farewell phrase for that language | `renderGameStatus()` when `isLastGuessIncorrect` |

> Extracting utility functions into separate modules is a key professional React pattern. It makes functions independently testable and keeps component files readable. If `App.jsx` contained the `options` array for farewell text, it would add 15+ lines of non-React code that pollutes the component's signal-to-noise ratio.

---

# 7. `clsx` — Conditional Class Names

`clsx` is a tiny utility function that builds a `className` string from multiple arguments, filtering out `false`, `null`, `undefined`, and `0`. It replaces verbose ternary expressions in `className` props.

## 7.1 Object Syntax

```jsx
// App.jsx — keyboard button class names
const className = clsx({
    correct: isCorrect,   // adds "correct" class only if isCorrect is true
    wrong: isWrong        // adds "wrong" class only if isWrong is true
})
// If isCorrect=true, isWrong=false → className = "correct"
// If isCorrect=false, isWrong=true → className = "wrong"
// If both false (unguessed) → className = ""
```

The **object syntax** takes an object where keys are class names and values are booleans. `clsx` includes a key in the output string only when its value is truthy.

```jsx
// Without clsx — verbose ternary
const className = isCorrect ? "correct" : isWrong ? "wrong" : ""

// With clsx — readable object
const className = clsx({ correct: isCorrect, wrong: isWrong })
```

## 7.2 String Argument Syntax

```jsx
// App.jsx — language chip class names
const className = clsx("chip", isLanguageLost && "lost")
// isLanguageLost=false → "chip"
// isLanguageLost=true  → "chip lost"
```

The **string argument syntax** mixes fixed class names with conditional ones. `clsx` accepts any number of arguments — strings, booleans, objects, arrays — and concatenates the truthy ones.

```jsx
// App.jsx — game status section class names
const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
})
// Adds one of: "game-status won" / "game-status lost" / "game-status farewell" / "game-status"
```

| `clsx` argument type | Behaviour |
|---------------------|----------|
| String (`"chip"`) | Always included |
| Boolean (`false && "lost"`) | `false` is filtered out — nothing added |
| `true && "lost"` | `"lost"` is the value — included |
| Object `{ won: true, lost: false }` | Only keys with truthy values are included |

> `clsx` replaced the older `classnames` package and has identical API. The key insight: never build complex `className` strings with template literals — `clsx` makes intent explicit and eliminates quoting/spacing bugs.

---

# 8. Rendering Language Chips — Lost Languages

```jsx
// App.jsx
const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount
    const styles = {
        backgroundColor: lang.backgroundColor,
        color: lang.color
    }
    const className = clsx("chip", isLanguageLost && "lost")
    return (
        <span
            className={className}
            style={styles}
            key={lang.name}
        >
            {lang.name}
        </span>
    )
})
```

The **index** of each language in the array doubles as its "lives" position. Language at `index 0` (HTML) dies on the first wrong guess, `index 1` (CSS) on the second, and so on.

```
wrongGuessCount = 3:
  index 0 (HTML):       0 < 3 → isLanguageLost = true  → class "chip lost" → 💀 skull overlay
  index 1 (CSS):        1 < 3 → isLanguageLost = true  → class "chip lost" → 💀 skull overlay
  index 2 (JavaScript): 2 < 3 → isLanguageLost = true  → class "chip lost" → 💀 skull overlay
  index 3 (React):      3 < 3 → isLanguageLost = false → class "chip"      → normal display
  ...
```

The skull overlay is entirely CSS — no extra JSX needed. The `.chip.lost::before` pseudo-element inserts the 💀 emoji as an absolutely positioned overlay covering the chip with a dark transparent background:

```css
span.chip.lost::before {
    content: "💀";
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
}
```

> Using `index < wrongGuessCount` as the lost condition means the array order in `languages.js` directly determines the death order. HTML dies first, Assembly is last — the narrative of the game is built into the data structure.

---

# 9. Rendering the Word Display — Letter Boxes

```jsx
// App.jsx
const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
    const letterClassName = clsx(
        isGameLost && !guessedLetters.includes(letter) && "missed-letter"
    )
    return (
        <span key={index} className={letterClassName}>
            {shouldRevealLetter ? letter.toUpperCase() : ""}
        </span>
    )
})
```

`currentWord.split("")` converts the word string into an array of individual characters, each rendered as a `<span>`. Each span is a fixed-size box from CSS:

```css
section.word > span {
    height: 40px;
    width: 40px;
    background-color: #323232;
    border-bottom: 1px solid #F9F4DA;
    /* ... flex centering */
}
```

The letter inside each box follows three display rules:

| Condition | `shouldRevealLetter` | Display |
|-----------|---------------------|---------|
| `isGameLost` | `true` | Show ALL letters — reveal the word on loss |
| `guessedLetters.includes(letter)` | `true` | Show this letter — player guessed it correctly |
| Neither | `false` | Show `""` — blank box, letter not yet guessed |

Additionally, on game loss, letters the player **missed** get the `"missed-letter"` class which colours them red (`#EC5D49`), distinguishing correctly-guessed letters (white) from unguessed ones (red).

```
Word: "react", guessedLetters: ["r","e","a"], isGameLost: true

  R  |  E  |  A  |  C  |  T
  ↑     ↑     ↑     ↑     ↑
 white white white  red   red
 (guessed)         (missed, shown in red)
```

---

# 10. Rendering the Keyboard

## 10.1 Correct and Wrong Guesses

```jsx
// App.jsx
const alphabet = "abcdefghijklmnopqrstuvwxyz"

const keyboardElements = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter)
    const isCorrect = isGuessed && currentWord.includes(letter)
    const isWrong   = isGuessed && !currentWord.includes(letter)
    const className = clsx({ correct: isCorrect, wrong: isWrong })

    return (
        <button
            className={className}
            key={letter}
            disabled={isGameOver}
            aria-disabled={guessedLetters.includes(letter)}
            aria-label={`Letter ${letter}`}
            onClick={() => addGuessedLetter(letter)}
        >
            {letter.toUpperCase()}
        </button>
    )
})
```

The alphabet string is split into 26 characters, each rendered as a button. Three boolean checks determine each button's visual state:

```
Letter "r", currentWord = "react", guessedLetters = ["r", "x"]

isGuessed = guessedLetters.includes("r") → true
isCorrect = true && currentWord.includes("r") → true && true → true
isWrong   = true && !currentWord.includes("r") → true && false → false
className = clsx({ correct: true, wrong: false }) → "correct"

Letter "x":
isGuessed = true, isCorrect = false, isWrong = true
className = "wrong"

Letter "t" (not guessed yet):
isGuessed = false, isCorrect = false, isWrong = false
className = "" (no extra class — amber default colour from CSS)
```

| Button state | CSS class | Background colour |
|-------------|----------|------------------|
| Unguessed | none | `#FCBA29` (amber — default) |
| Correct guess | `correct` | `#10A95B` (green) |
| Wrong guess | `wrong` | `#EC5D49` (red) |

## 10.2 Disabling the Keyboard on Game Over

```jsx
disabled={isGameOver}
aria-disabled={guessedLetters.includes(letter)}
```

Two different "disabled" concepts are used together:

| Attribute | Triggers when | Effect |
|-----------|-------------|--------|
| `disabled={isGameOver}` | Game is won OR lost | Native HTML — prevents all clicks, sets `cursor: not-allowed`, opacity 0.5 |
| `aria-disabled={isGuessed}` | This specific letter has already been guessed | Accessibility tree — tells screen readers this button is "already used" without disabling it visually |

```css
section.keyboard > button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}
```

> `disabled` and `aria-disabled` serve different purposes. `disabled` is a hard block — the button cannot be clicked at all. `aria-disabled` is an informational signal to assistive technology. Using `aria-disabled` on already-guessed letters tells screen reader users "this letter was already tried" without removing the button from the tab order prematurely.

---

# 11. `renderGameStatus()` — Helper Function for Conditional Rendering

```jsx
// App.jsx
function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
        return (
            <p className="farewell-message">
                {getFarewellText(languages[wrongGuessCount - 1].name)}
            </p>
        )
    }
    if (isGameWon) {
        return (
            <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
            </>
        )
    }
    if (isGameLost) {
        return (
            <>
                <h2>Game over!</h2>
                <p>You lose! Better start learning Assembly 😭</p>
            </>
        )
    }
    return null
}
```

`renderGameStatus` is a **helper function for conditional rendering** — a pattern used when the conditional logic is too complex to fit cleanly as a ternary expression in JSX. By extracting it into a function, the JSX template remains readable:

```jsx
<section aria-live="polite" role="status" className={gameStatusClass}>
    {renderGameStatus()}
</section>
```

Without the helper, this section would require nested ternaries or `&&` chains — significantly harder to read and maintain.

| Condition checked | JSX returned |
|------------------|-------------|
| Game in progress + last guess was wrong | Farewell message for the language just lost |
| `isGameWon` | `<h2>You win!</h2>` + celebration text |
| `isGameLost` | `<h2>Game over!</h2>` + loss text |
| None of the above | `null` — section renders empty |

> `return null` from a render helper or a component causes React to render nothing for that element. The containing `<section>` still exists in the DOM — only its children are empty.

## 11.1 Farewell Messages

```jsx
// When game is ongoing and the last guess was wrong:
<p className="farewell-message">
    {getFarewellText(languages[wrongGuessCount - 1].name)}
</p>
```

`languages[wrongGuessCount - 1].name` accesses the language that was **just eliminated**. If `wrongGuessCount` is now 3, then `languages[2].name` is "JavaScript" — the third language to die.

```
wrongGuessCount = 1 → languages[0].name → "HTML" → "Farewell, HTML"
wrongGuessCount = 2 → languages[1].name → "CSS" → "R.I.P., CSS"
wrongGuessCount = 3 → languages[2].name → "JavaScript" → "JavaScript bites the dust"
```

## 11.2 Won / Lost Banners

```jsx
// React Fragment shorthand — groups elements without a wrapper DOM node
if (isGameWon) {
    return (
        <>
            <h2>You win!</h2>
            <p>Well done! 🎉</p>
        </>
    )
}
```

`<>...</>` is the **React Fragment shorthand** — it groups multiple JSX elements so a function can return them together, without inserting an extra `<div>` or `<span>` into the DOM.

| Syntax | DOM output |
|--------|-----------|
| `<div><h2>...</h2><p>...</p></div>` | Adds a `<div>` wrapper to the DOM |
| `<><h2>...</h2><p>...</p></>` | No wrapper — `<h2>` and `<p>` appear directly inside the `<section>` |

---

# 12. Farewell Text — `getFarewellText()`

```js
// utils.js
export function getFarewellText(language) {
    const options = [
        `Farewell, ${language}`,
        `Adios, ${language}`,
        `R.I.P., ${language}`,
        `We'll miss you, ${language}`,
        `Oh no, not ${language}!`,
        `${language} bites the dust`,
        // ... 6 more options
    ]
    const randomIndex = Math.floor(Math.random() * options.length)
    return options[randomIndex]
}
```

`getFarewellText` takes a language name and returns a **randomly selected farewell string** from 12 options using template literals. The randomisation ensures each wrong guess feels fresh — the same language could receive a different farewell message in two different games.

```
getFarewellText("CSS")  → could return any of:
  "Farewell, CSS"
  "Adios, CSS"
  "R.I.P., CSS"
  "CSS bites the dust"
  ... etc.
```

> This pattern — a function that returns one of many possible strings randomly — is a lightweight way to add variety and personality to UI text without any external library.

---

# 13. Starting a New Game — Full State Reset

```jsx
// App.jsx
function startNewGame() {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
}
```

`startNewGame` resets **both** state variables to their initial conditions:

| State | Reset value | Effect |
|-------|------------|--------|
| `currentWord` | `getRandomWord()` — a new random word | A fresh word is selected; all derived values recalculate |
| `guessedLetters` | `[]` — empty array | No letters are guessed; keyboard returns to all-amber; chips un-die |

Since every rendered element in the game is derived from these two values, resetting them is sufficient to fully reset the game — no other state needs to be touched.

The "New Game" button only appears when `isGameOver` is true:

```jsx
{isGameOver &&
    <button className="new-game" onClick={startNewGame}>
        New Game
    </button>
}
```

> Conditional rendering with `&&` works because `false && <JSX>` evaluates to `false`, and React renders nothing for `false`. `true && <JSX>` evaluates to the JSX, which React renders normally.

---

# 14. Accessibility — Dual ARIA Live Regions

## 14.1 Visual Game Status (`role="status"`)

```jsx
// App.jsx
<section
    aria-live="polite"
    role="status"
    className={gameStatusClass}
>
    {renderGameStatus()}
</section>
```

The visual game status section is itself an ARIA live region (`aria-live="polite"`, `role="status"`). This means sighted users see the farewell/win/loss messages rendered visually in this coloured section, while screen reader users also have those changes announced automatically.

`role="status"` is an **implicit live region** — it implies `aria-live="polite"` and `aria-atomic="true"` (the entire region is announced, not just the changed portion). Including `aria-live="polite"` explicitly is redundant but clear.

## 14.2 Hidden Screen Reader Region (`.sr-only`)

```jsx
// App.jsx — a separate, hidden region for more granular screen reader narration
<section
    className="sr-only"
    aria-live="polite"
    role="status"
>
    <p>
        {currentWord.includes(lastGuessedLetter) ?
            `Correct! The letter ${lastGuessedLetter} is in the word.` :
            `Sorry, the letter ${lastGuessedLetter} is not in the word.`
        }
        You have {numGuessesLeft} attempts left.
    </p>
    <p>Current word: {currentWord.split("").map(letter =>
        guessedLetters.includes(letter) ? letter + "." : "blank.")
        .join(" ")}</p>
</section>
```

The hidden `.sr-only` section provides **granular, machine-readable feedback** that the visual UI communicates through colours and layout but which screen readers cannot infer on their own:

| Announcement | What it tells the user |
|-------------|------------------------|
| `Correct! The letter R is in the word.` | Confirm the guess was right |
| `Sorry, the letter X is not in the word.` | Confirm the guess was wrong |
| `You have 8 attempts left.` | Remaining wrong guesses — game tension |
| `Current word: r. e. blank. blank. t.` | The current reveal state of the word, letter by letter |

The word narration pattern — `guessedLetters.includes(letter) ? letter + "." : "blank."` — reads each position of the word aloud as either the letter (if guessed) or "blank" (if not), separated by periods so each word is individually paused by the screen reader.

| Region | Visible? | Purpose |
|--------|---------|---------|
| `<section className={gameStatusClass}>` | ✅ Yes | Visual win/loss/farewell banner |
| `<section className="sr-only">` | ❌ No | Detailed per-guess narration for screen readers |

> Two live regions serve two audiences simultaneously without one interfering with the other. The visual section announces game state changes; the hidden section narrates the granular per-guess feedback — information that the visual UI conveys through colour (green/red keyboard keys) which is inaccessible to screen reader users.

---

# 15. CSS — `::before` Pseudo-Element for the Skull Overlay

```css
/* index.css */
span.chip {
    border-radius: 3px;
    padding: 4.5px;
    position: relative;   /* ← establishes positioning context for ::before */
}

span.chip.lost::before {
    content: "💀";
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-size: 0.85rem;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
}
```

The skull overlay is a **CSS `::before` pseudo-element** — a generated element inserted by CSS before a real element's content. It requires no extra JSX in the React component.

```
span.chip (position: relative)
┌──────────────────┐
│  JavaScript      │  ← the real span content
└──────────────────┘

span.chip.lost::before (position: absolute, 100% × 100%)
┌──────────────────┐
│   rgba(0,0,0,.7) │  ← dark semi-transparent overlay
│        💀        │  ← emoji centered via flexbox
└──────────────────┘
```

| CSS property | Role |
|-------------|------|
| `content: "💀"` | Inserts the skull emoji as the pseudo-element's content |
| `position: absolute` | Removes the pseudo-element from flow; positions it relative to `.chip` |
| `height: 100%; width: 100%` | Covers the entire chip surface |
| `top: 0; left: 0` | Anchors to the top-left corner of the chip |
| `background-color: rgba(0,0,0,0.7)` | Semi-transparent dark overlay — the language name still faintly visible behind it |
| `display: flex; align-items: center; justify-content: center` | Centers the 💀 emoji within the overlay |

> `::before` and `::after` pseudo-elements are CSS-only overlays that require NO React code — they appear automatically when the `lost` class is added by `clsx`. This is the correct separation of concerns: React manages class names, CSS manages visual effects.

---

# 16. How the Full App Flow Works

```
┌──────────────────── INITIAL RENDER ────────────────────────────────┐
│                                                                    │
│  useState lazy init:                                               │
│    currentWord    = getRandomWord() → e.g. "cloud"                │
│    guessedLetters = []                                             │
│                                                                    │
│  Derived values (all computed):                                    │
│    wrongGuessCount = 0 (no guesses yet)                            │
│    isGameWon = false (no letters guessed)                          │
│    isGameLost = false (0 < 8)                                      │
│    isGameOver = false                                              │
│    lastGuessedLetter = undefined                                   │
│                                                                    │
│  UI renders:                                                       │
│    Language chips: all 9 alive (no .lost class)                   │
│    Word display: 5 blank boxes ( _ _ _ _ _ )                      │
│    Keyboard: 26 amber buttons, all enabled                         │
│    Status section: empty (renderGameStatus returns null)           │
└────────────────────────────────────────────────────────────────────┘

┌──────────────────── USER CLICKS "C" (CORRECT) ─────────────────────┐
│                                                                    │
│  addGuessedLetter("c")                                             │
│    setGuessedLetters(prev => [...prev, "c"])                       │
│    guessedLetters = ["c"]                                          │
│                                                                    │
│  Derived values re-computed:                                       │
│    wrongGuessCount = 0 ("c" is in "cloud")                         │
│    isGameWon: "cloud".split("").every(l => ["c"].includes(l))      │
│              "c"→✅ "l"→❌ → false (still playing)                │
│    lastGuessedLetter = "c"                                         │
│    isLastGuessIncorrect = "c" && !"cloud".includes("c") → false    │
│                                                                    │
│  UI updates:                                                       │
│    Keyboard "C" button → className "correct" → turns green         │
│    Word display box 0 → reveals "C"                                │
│    Status section: null (no farewell, no win/loss)                 │
│    sr-only: "Correct! The letter c is in the word. 8 attempts left"│
└────────────────────────────────────────────────────────────────────┘

┌──────────────────── USER CLICKS "X" (WRONG) ───────────────────────┐
│                                                                    │
│  addGuessedLetter("x")                                             │
│    guessedLetters = ["c", "x"]                                     │
│                                                                    │
│  Derived values re-computed:                                       │
│    wrongGuessCount = 1 ("x" not in "cloud")                        │
│    isGameLost = 1 >= 8 → false                                     │
│    lastGuessedLetter = "x"                                         │
│    isLastGuessIncorrect = "x" && !"cloud".includes("x") → true     │
│                                                                    │
│  UI updates:                                                       │
│    Keyboard "X" button → className "wrong" → turns red             │
│    Language chip [0] (HTML): index 0 < 1 → .lost class → 💀 skull │
│    Status section: farewell mode (purple bg)                       │
│      getFarewellText("HTML") → "Farewell, HTML"                    │
│    sr-only: "Sorry, the letter x is not in the word. 8 attempts..."│
└────────────────────────────────────────────────────────────────────┘

┌──────────────────── GAME WON ──────────────────────────────────────┐
│                                                                    │
│  Player guesses "c","l","o","u","d" (all correct, no wrong guesses)│
│                                                                    │
│  isGameWon = "cloud".split("").every(l => guessedLetters.includes) │
│            → all 5 letters guessed → true                          │
│  isGameOver = true                                                 │
│                                                                    │
│  UI updates:                                                       │
│    <Confetti recycle={false} numberOfPieces={1000} /> appears      │
│    Status section (green bg): "You win!" + "Well done! 🎉"        │
│    Keyboard: all buttons → disabled (cursor: not-allowed)          │
│    "New Game" button appears                                       │
└────────────────────────────────────────────────────────────────────┘

┌──────────────────── NEW GAME ──────────────────────────────────────┐
│                                                                    │
│  startNewGame():                                                   │
│    setCurrentWord(getRandomWord())  → fresh word                   │
│    setGuessedLetters([])            → clear all guesses            │
│                                                                    │
│  All derived values re-compute from scratch:                       │
│    wrongGuessCount = 0, isGameWon = false, isGameLost = false      │
│    All chips alive, all keyboard buttons amber, word all blank     │
│  "New Game" button disappears (isGameOver = false)                 │
└────────────────────────────────────────────────────────────────────┘
```

---

# 17. HTML Structure Recap — React Document Tree

```
index.html
├── <head>
│   ├── <link> → Google Fonts preconnect (fonts.googleapis.com)
│   ├── <link> → Google Fonts preconnect (fonts.gstatic.com, crossorigin)
│   ├── <link> → Hanken Grotesk (ital, wght 100–900)
│   └── <link> → /index.css
│
└── <body>
    ├── <div id="root">
    │   │
    │   │  After ReactDOM.createRoot + root.render(<AssemblyEndgame />) runs:
    │   │
    │   └── <main>                              ← App.jsx root element
    │       │
    │       ├── <Confetti                       ← renders only when isGameWon
    │       │       recycle={false}
    │       │       numberOfPieces={1000} />
    │       │
    │       ├── <header>                        ← static: title + subtitle
    │       │   ├── <h1>Assembly: Endgame</h1>
    │       │   └── <p>Guess the word within 8 attempts...</p>
    │       │
    │       ├── <section                        ← visual game status (ARIA live region)
    │       │       aria-live="polite"
    │       │       role="status"
    │       │       className="game-status [won|lost|farewell]">
    │       │   └── {renderGameStatus()}        ← null | farewell <p> | won <> | lost <>
    │       │
    │       ├── <section className="language-chips">
    │       │   ├── <span className="chip [lost]"  ← HTML chip
    │       │   │       style={{ bg: #E2680F, color: #F9F4DA }}>
    │       │   │   HTML
    │       │   │   </span>
    │       │   └── ...8 more language chips (CSS through Assembly)
    │       │
    │       ├── <section className="word">
    │       │   ├── <span className="[missed-letter]">  ← one span per letter
    │       │   │       {shouldReveal ? "C" : ""}        ← revealed or blank
    │       │   │   </span>
    │       │   └── ...remaining letter spans
    │       │
    │       ├── <section                        ← hidden ARIA live region (sr-only)
    │       │       className="sr-only"
    │       │       aria-live="polite"
    │       │       role="status">
    │       │   ├── <p>Correct/Sorry... You have N attempts left.</p>
    │       │   └── <p>Current word: c. blank. o. u. blank.</p>
    │       │
    │       ├── <section className="keyboard">
    │       │   ├── <button                     ← one button per letter A-Z
    │       │   │       className="[correct|wrong]"
    │       │   │       disabled={isGameOver}
    │       │   │       aria-disabled={isGuessed}
    │       │   │       aria-label="Letter a"
    │       │   │       onClick={() => addGuessedLetter("a")}
    │       │   │   > A </button>
    │       │   └── ...25 more letter buttons
    │       │
    │       └── {isGameOver &&                  ← only shown after win or loss
    │               <button className="new-game"
    │                   onClick={startNewGame}>
    │                   New Game
    │               </button>}
    │
    └── <script src="/index.jsx" type="module"> ← Vite entry point

State (lives in AssemblyEndgame):
  currentWord    = "cloud"  → drives word display, isGameWon computation
  guessedLetters = ["c","x"]→ drives keyboard colours, wrongGuessCount, chip deaths

Derived (computed each render):
  wrongGuessCount = 1       → chip deaths (index < wrongGuessCount)
  isGameWon = false         → Confetti, win banner, disable keyboard
  isGameLost = false        → red reveal, loss banner, disable keyboard
  isGameOver = false        → keyboard disabled, "New Game" button visible
  isLastGuessIncorrect = true → farewell message trigger
```

---

# 18. How to Run

This project is built with **Vite** and requires a local dev server to process JSX.

```bash
# Install dependencies (clsx, react-confetti, react, react-dom)
npm install

# Start the Vite development server
npm run dev
```

Vite starts at `http://localhost:5173`. No internet connection is required — all words are bundled locally in `words.js`.

- A random word is selected on load
- Click letter buttons to guess — green means correct, red means wrong
- Each wrong guess eliminates a programming language (💀 appears on the chip)
- Guess all letters before running out of attempts to win
- "New Game" appears after either outcome — click to play again with a fresh word

---

# 19. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 13. React.js Fundamentals
* **Project:** 07. Capstone Project #2 — Assembly: Endgame
