# TypeScript in React — TypeScript
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite)
![clsx](https://img.shields.io/badge/clsx-Class%20Utility-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **TypeScript in React** module from **Scrimba's Fullstack Web Development Path** — a complete, typed implementation of the **Assembly: Endgame** word-guessing game built with React 18 and TypeScript, covering how to type state, props, derived values, event handlers, utility types, and `JSX.Element` return types.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every TypeScript-in-React concept introduced in this module, comparing what is new here against the JavaScript React patterns covered in `13. React.js Fundamentals` and `15. Advanced React.js`, and the TypeScript fundamentals covered in `16/01. TypeScript Fundamentals`.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is "TypeScript in React"?](#3-what-is-typescript-in-react)
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [Setting Up a React + TypeScript Project](#5-setting-up-a-react--typescript-project)
   - [Vite with TypeScript Template](#51-vite-with-typescript-template)
   - [tsconfig Files](#52-tsconfig-files)
6. [Typing `useState`](#6-typing-usestate)
   - [Inferred vs Explicit Generic](#61-inferred-vs-explicit-generic)
   - [Typing State with Custom Types](#62-typing-state-with-custom-types)
   - [Typing Derived Values and Arrow Functions](#63-typing-derived-values-and-arrow-functions)
7. [Typing Component Props](#7-typing-component-props)
   - [Defining a Props Type](#71-defining-a-props-type)
   - [Destructuring Typed Props](#72-destructuring-typed-props)
   - [Function Props — Typing Callbacks](#73-function-props--typing-callbacks)
   - [Imported Types as Props](#74-imported-types-as-props)
8. [Typing Component Return — `JSX.Element`](#8-typing-component-return--jsxelement)
   - [JSX.Element vs JSX.Element | null](#81-jsxelement-vs-jsxelement--null)
9. [Typing `App.tsx` Functions](#9-typing-apptsx-functions)
10. [The `Omit` Utility Type in Components](#10-the-omit-utility-type-in-components)
11. [How the Full App Flow Works](#11-how-the-full-app-flow-works)
12. [How to Run](#12-how-to-run)
13. [Course Reference](#13-course-reference)

---

# 1. Project Overview

**Assembly: Endgame** is a word-guessing game where the player must guess a hidden word by clicking letter buttons. Each wrong guess eliminates a programming language from the roster. If all 8 languages are eliminated before the word is guessed, Assembly (the last remaining language) takes over — game over. The game includes:

* A **header** with the game title and description
* A **game status banner** that shows farewell messages on wrong guesses, and win/lose state when the game ends
* A **language chips row** showing 9 programming languages, struck through as wrong guesses accumulate
* A **word display** revealing correctly guessed letters and blanks
* An **accessible ARIA live region** that announces each guess result to screen readers
* An **on-screen keyboard** where each key is coloured green (correct) or grey (wrong) after being guessed
* A **New Game button** that resets state when the game is over
* **Confetti** on a win state

The goal of this module is not just to build a game — it is to understand how to apply TypeScript's type system inside a real React application, where every `useState`, component prop, event handler, and return type must be correctly annotated.

---

# 2. Project Structure

```
16. TypeScript/
│
└── 02. TypeScript in React/
    ├── src/
    │   ├── main.tsx                  → React entry point — renders <AssemblyEndgame />
    │   ├── App.tsx                   → Root component — owns all state and derived values
    │   ├── languages.ts              → Language type definition + languages data array
    │   ├── utils.ts                  → getRandomWord() and getFarewellText() helpers
    │   ├── words.ts                  → Large array of valid English words
    │   ├── index.css                 → Global styles
    │   ├── vite-env.d.ts             → Vite type declarations
    │   └── components/
    │       ├── Header.tsx            → Static game header
    │       ├── GameStatus.tsx        → Win/loss/farewell banner
    │       ├── LanguageChips.tsx     → Language chip row — uses Omit<Language, "name">
    │       ├── WordLetters.tsx       → Hidden word with guessed letters revealed
    │       ├── AriaLiveStatus.tsx    → Accessible live announcements
    │       ├── Keyboard.tsx          → On-screen keyboard with addGuessedLetter callback
    │       ├── NewGameButton.tsx     → Reset button, only active when isGameOver
    │       └── ConfettiContainer.tsx → Confetti wrapper on win
    ├── index.html                    → HTML shell
    ├── vite.config.ts                → Vite configuration (TypeScript)
    ├── tsconfig.json                 → Root TypeScript config
    ├── tsconfig.app.json             → App-specific TS config (browser target)
    └── tsconfig.node.json            → Node-specific TS config (for Vite config file)
```

---

# 3. What is "TypeScript in React"?

When you add TypeScript to a React project, every JavaScript-specific React pattern gains a type annotation:

| JavaScript React | TypeScript React | What changes |
|-----------------|-----------------|--------------|
| `const [count, setCount] = useState(0)` | `const [count, setCount] = useState<number>(0)` | `useState` is generic |
| `function Card({ title, onClick }) {` | `function Card({ title, onClick }: CardProps) {` | Props have a named type |
| `function Card() { return <div>...</div> }` | `function Card(): JSX.Element { return <div>...</div> }` | Return type is explicit |
| `const handleClick = (e) => {}` | `const handleClick = (e: React.MouseEvent): void => {}` | Event types from React |
| `.tsx` file | `.tsx` file | Same extension, but TypeScript checks JSX |

> The `.tsx` extension tells the TypeScript compiler that a file contains both TypeScript and JSX. Plain TypeScript files that contain no JSX use `.ts`.

---

# 4. What's New vs Previous Projects

## New TypeScript + React Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `useState<Type>()` generic | `App.tsx` | Explicitly declares what type state can hold |
| `Props type` pattern | All components | Named type for a component's incoming props |
| `: JSX.Element` return type | All components | Declares a component always returns renderable JSX |
| `JSX.Element \| null` return type | Components with conditional rendering | When a component can render nothing |
| `import type {JSX} from 'react'` | All components | Type-only import — stripped at compile time |
| `import type {Language} from '../languages'` | `LanguageChips.tsx` | Importing a type defined in another module |
| `Omit<Language, "name">` in inline style | `LanguageChips.tsx` | Using utility types for partial object shapes |
| `: void` on event handler functions | `App.tsx`, `Keyboard.tsx` | Explicitly no return value |
| Typed callback props `(letter: string) => void` | `Keyboard.tsx` | Props that accept a function |
| Explicit return types on derived booleans | `App.tsx` | `const isGameWon: boolean = ...` |

## Concepts Carried Over From Previous Modules

| Concept | Originally Introduced In | How It Deepens Here |
|---------|--------------------------|---------------------|
| `useState` + state update | `13. React.js Fundamentals` | Now typed with explicit generics |
| Component composition | `13. React.js Fundamentals` | Every component now has a typed Props interface |
| Derived values | `15. Advanced React.js` | Annotated with explicit `boolean` / `number` / `string` types |
| Event handlers | `13. React.js Fundamentals` | Callback types are specified in the Props type |
| Conditional rendering | `13. React.js Fundamentals` | Now forces `JSX.Element \| null` return type consideration |

---

# 5. Setting Up a React + TypeScript Project

## 5.1 Vite with TypeScript Template

```bash
# Create a new Vite + React + TypeScript project
npm create vite@latest my-app -- --template react-ts

cd my-app
npm install
npm run dev
```

The `react-ts` template creates `.tsx` files instead of `.jsx` and includes a pre-configured `tsconfig.json`.

```
Generated file extensions:
  src/App.tsx         ← JSX + TypeScript
  src/main.tsx        ← JSX + TypeScript
  vite.config.ts      ← TypeScript (no JSX)
  tsconfig.json       ← TypeScript config
```

## 5.2 tsconfig Files

The module project uses **three tsconfig files**:

```json
// tsconfig.json — root config, references the other two
{
    "files": [],
    "references": [
        { "path": "./tsconfig.app.json" },
        { "path": "./tsconfig.node.json" }
    ]
}

// tsconfig.app.json — for browser code (React components)
{
    "compilerOptions": {
        "target": "ES2020",
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "jsx": "react-jsx",        // ← enables JSX transformation
        "strict": true
    }
}

// tsconfig.node.json — for Vite config file (Node.js environment)
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "ESNext"
    }
}
```

The critical option for React is **`"jsx": "react-jsx"`** — this tells the TypeScript compiler how to transform JSX syntax. Without it, `.tsx` files would produce errors on every `<Component />` tag.

---

# 6. Typing `useState`

## 6.1 Inferred vs Explicit Generic

```typescript
// TypeScript infers the type from the initial value
const [count, setCount] = useState(0)
// Inferred: count: number, setCount: Dispatch<SetStateAction<number>>

// Explicit generic — required when the initial value does not reveal the type
const [user, setUser] = useState<User | null>(null)
// Without <User | null>, TypeScript would infer: null — too narrow
```

`useState` is a **generic function** — `useState<T>()` — where `T` is the type of the state value. TypeScript infers `T` from the initial value when possible.

| Pattern | When to use |
|---------|------------|
| `useState(0)` — inferred | Initial value makes the type obvious (`0` → `number`) |
| `useState<string>("")` — explicit | When you want to document intent clearly |
| `useState<User \| null>(null)` — explicit union | Initial value is `null` but state can later hold a `User` |
| `useState<string[]>([])` — explicit generic | Initial value is `[]` — inference would give `never[]` |

## 6.2 Typing State with Custom Types

```typescript
// From App.tsx — the two state variables in Assembly: Endgame
const [currentWord, setCurrentWord] = useState<string>((): string => getRandomWord())
const [guessedLetters, setGuessedLetters] = useState<string[]>([])
```

`useState<string>((): string => getRandomWord())` passes an **initialiser function** (lazy initial state). The `(): string =>` annotation on the function inside is optional but adds clarity.

```typescript
// ✅ With explicit generic — documents intent
const [guessedLetters, setGuessedLetters] = useState<string[]>([])

// Without generic, TypeScript infers never[] from []
// This would cause errors when you call setGuessedLetters(["a", "b"])
```

> Always provide an explicit generic to `useState` when the initial value is an **empty array `[]` or `null`** — inference alone is not sufficient in these cases.

## 6.3 Typing Derived Values and Arrow Functions

Derived values computed from state are annotated at the variable declaration:

```typescript
// From App.tsx — all derived values are explicitly annotated
const numGuessesLeft: number = languages.length - 1

const wrongGuessCount: number =
    guessedLetters.filter((letter: string): boolean => !currentWord.includes(letter)).length

const isGameWon: boolean =
    currentWord.split("").every((letter: string): boolean => guessedLetters.includes(letter))

const isGameLost: boolean = wrongGuessCount >= numGuessesLeft
const isGameOver: boolean = isGameWon || isGameLost

const lastGuessedLetter: string = guessedLetters[guessedLetters.length - 1]
const isLastGuessIncorrect: boolean = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
```

Notice the **inline arrow function annotations**: `(letter: string): boolean =>`. Both the parameter type and the arrow function's return type are annotated, even inside array methods like `.filter()` and `.every()`.

---

# 7. Typing Component Props

## 7.1 Defining a Props Type

The standard pattern is to define a `type` alias named `<ComponentName>Props` directly above the component function:

```typescript
// AriaLiveStatus.tsx
type AriaLiveStatusProps = {
    currentWord: string
    lastGuessedLetter: string
    guessedLetters: string[]
    numGuessesLeft: number
}
```

This type is defined **in the same file** as the component and used only for that component's props. It is not exported — it is local to the file.

## 7.2 Destructuring Typed Props

```typescript
// The Props type is applied after the destructuring pattern
export default function AriaLiveStatus({
    currentWord,
    lastGuessedLetter,
    guessedLetters,
    numGuessesLeft
}: AriaLiveStatusProps): JSX.Element {
    // ...
}
```

The `: AriaLiveStatusProps` annotation comes **after the closing `}` of the destructuring pattern** — not before it. This is different from annotating a regular variable.

```typescript
// ❌ Wrong placement — TypeScript syntax error
function MyComponent(: MyProps { name, age }) {}

// ✅ Correct — annotation after the destructuring closing brace
function MyComponent({ name, age }: MyProps) {}
```

## 7.3 Function Props — Typing Callbacks

When a component accepts a function as a prop (event handlers, callbacks), the type annotation describes the function's signature:

```typescript
// Keyboard.tsx — the addGuessedLetter prop is a function
type KeyboardProps = {
    alphabet: string
    guessedLetters: string[]
    currentWord: string
    isGameOver: boolean
    addGuessedLetter: (letter: string) => void   // ← function type
}
```

The function type `(letter: string) => void` reads: "a function that takes a `string` parameter named `letter` and returns nothing."

```typescript
// General function prop type patterns:
type Props = {
    onClick: () => void                        // no args, no return
    onChange: (value: string) => void          // one string arg
    onSubmit: (id: number, data: User) => void // multiple args
    transform: (input: string) => string       // returns a value
    fetch: (id: number) => Promise<User>       // async — returns a Promise
}
```

> Function prop types are the most complex annotations in a React + TypeScript project. Read them as: `(parameters) => returnType`. The return type is almost always `void` for event callbacks.

## 7.4 Imported Types as Props

When a component uses a type defined in another file, import that type with `import type`:

```typescript
// LanguageChips.tsx — Language type comes from languages.ts
import type { JSX } from 'react'
import type { Language } from '../languages'

type LanguageChipsProps = {
    languages: Language[]     // ← uses the imported Language type
    wrongGuessCount: number
}
```

`import type` is a **type-only import** — it is completely stripped by the TypeScript compiler and adds zero bytes to the bundle. Use it whenever you import something only for its type information.

| Import | When to use |
|--------|------------|
| `import { Language } from './languages'` | When using Language as a value AND a type |
| `import type { Language } from './languages'` | When only using Language as a type annotation |

---

# 8. Typing Component Return — `JSX.Element`

## 8.1 JSX.Element vs JSX.Element | null

```typescript
import type { JSX } from 'react'

// A component that always renders something
export default function Header(): JSX.Element {
    return <header>...</header>
}

// A component that can render nothing (conditional return)
export default function GameStatus({ isGameOver }: Props): JSX.Element | null {
    if (!isGameOver) return null        // ← returns null when game is active
    return <section>...</section>       // ← returns JSX when game is over
}
```

`JSX.Element` is the type for any valid React element — what `<div>`, `<MyComponent />`, or `<>...</>` evaluates to.

| Return type | When to use |
|-------------|------------|
| `JSX.Element` | Component always returns renderable JSX — no null/undefined case |
| `JSX.Element \| null` | Component conditionally returns `null` (hides itself) |
| `React.ReactNode` | More permissive — accepts strings, numbers, arrays, null, undefined |

```typescript
// From AriaLiveStatus.tsx — always renders, so JSX.Element is correct
export default function AriaLiveStatus({ ... }: AriaLiveStatusProps): JSX.Element {
    return (
        <section className="sr-only" aria-live="polite" role="status">
            ...
        </section>
    )
}
```

> Import `JSX` as a type from `'react'` — `import type { JSX } from 'react'`. This is the recommended pattern in React 18+ with the new JSX transform. Earlier patterns used `React.FC` or `React.ReactElement`.

---

# 9. Typing `App.tsx` Functions

Functions defined inside the root component are typed with explicit parameter and return types:

```typescript
// App.tsx
function addGuessedLetter(letter: string): void {
    setGuessedLetters((prevLetters: string[]): string[] =>
        prevLetters.includes(letter)
            ? prevLetters
            : [...prevLetters, letter]
    )
}

function startNewGame(): void {
    setCurrentWord(getRandomWord())
    setGuessedLetters([])
}
```

The `setGuessedLetters` call takes a **functional state update** — a callback `(prevLetters: string[]): string[]`. Both the parameter type and return type of this inner function are annotated, making the intent explicit.

| Function | Params | Return | Notes |
|----------|--------|--------|-------|
| `addGuessedLetter` | `letter: string` | `void` | Mutates state via setter |
| `startNewGame` | none | `void` | Resets both state values |
| Functional update inside setter | `prevLetters: string[]` | `string[]` | Returns the new state array |

---

# 10. The `Omit` Utility Type in Components

`LanguageChips.tsx` demonstrates a real use of the `Omit` utility type — not just as a standalone concept, but inside a component's render logic:

```typescript
// languages.ts — the full Language type
export type Language = {
    name: string
    backgroundColor: string
    color: string
}

// LanguageChips.tsx — using Omit to type inline styles
const styles: Omit<Language, "name"> = {
    backgroundColor: lang.backgroundColor,
    color: lang.color
}
```

`Omit<Language, "name">` creates the type `{ backgroundColor: string; color: string }` — the `Language` type without the `name` property. This is used here because the inline `style` object only needs the colour properties, not the name.

```typescript
// Full component function showing Omit in context
export default function LanguageChips({ languages, wrongGuessCount }: LanguageChipsProps): JSX.Element {
    const languageElements: JSX.Element[] = languages.map((lang: Language, index: number): JSX.Element => {
        const isLanguageLost: boolean = index < wrongGuessCount

        // styles only needs backgroundColor and color — not name
        const styles: Omit<Language, "name"> = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }

        const className: string = clsx("chip", isLanguageLost && "lost")

        return (
            <span className={className} style={styles} key={lang.name}>
                {lang.name}
            </span>
        )
    })

    return <section className="language-chips">{languageElements}</section>
}
```

> `Omit` and other utility types are not just for standalone type definitions — they are powerful inline, wherever you need a partial version of an existing type without creating a new named type alias.

---

# 11. How the Full App Flow Works

```
App mounts
└── useState initialises
      ├── currentWord: string = getRandomWord()  → random word from words.ts
      └── guessedLetters: string[] = []

User clicks a letter on <Keyboard />
└── addGuessedLetter(letter) called
      └── setGuessedLetters(prev => [...prev, letter])
            └── React re-renders App

App re-renders → derived values recomputed
      ├── wrongGuessCount: number (filter guessed vs currentWord)
      ├── isGameWon: boolean (all letters guessed)
      ├── isGameLost: boolean (wrongGuessCount >= numGuessesLeft)
      ├── isGameOver: boolean (won OR lost)
      └── lastGuessedLetter: string / isLastGuessIncorrect: boolean

Props flow DOWN to child components:
      ├── <GameStatus isGameWon isGameLost isGameOver isLastGuessIncorrect wrongGuessCount />
      │     └── renders farewell/win/loss banner
      ├── <LanguageChips languages wrongGuessCount />
      │     └── strikes out eliminated languages
      ├── <WordLetters currentWord guessedLetters isGameLost />
      │     └── reveals correctly guessed letters
      ├── <AriaLiveStatus currentWord lastGuessedLetter guessedLetters numGuessesLeft />
      │     └── announces to screen readers
      ├── <Keyboard alphabet guessedLetters currentWord isGameOver addGuessedLetter />
      │     └── colours buttons; disabled when isGameOver
      └── <NewGameButton isGameOver startNewGame />
            └── calls startNewGame() → resets both state values → cycle restarts
```

---

# 12. How to Run

This project is a Vite + React + TypeScript app. It requires Node.js installed.

```bash
# 1. Navigate to the project directory
cd "16. TypeScript/02. TypeScript in React"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser. The app runs entirely in the browser — no backend required.

To compile TypeScript without running the dev server (type check only):

```bash
npx tsc --noEmit
```

This runs the TypeScript compiler in check-only mode — it reports type errors without producing any output files. Useful in CI pipelines.

---

# 13. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 16 — TypeScript
* **Sub-module:** 02 — TypeScript in React
* **Topics covered:** `useState` generic typing, `Props` type pattern, `JSX.Element` return type, function prop types, `import type`, `Omit` in components, derived value annotations, Vite + TypeScript project setup
* **Project:** Assembly: Endgame — a word-guessing game where wrong guesses eliminate programming languages
* **Builds toward:** `03. Solo Project — Typed Tenzies` — which applies these React + TypeScript patterns independently
