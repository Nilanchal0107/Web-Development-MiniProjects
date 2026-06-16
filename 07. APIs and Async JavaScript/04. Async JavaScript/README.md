# Async JavaScript — APIs and Async JavaScript

![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2017-yellow?style=flat-square&logo=javascript)
![async/await](https://img.shields.io/badge/async%2Fawait-ES2017-blueviolet?style=flat-square)
![fetch](https://img.shields.io/badge/fetch-Chained%20Requests-teal?style=flat-square)
![REST API](https://img.shields.io/badge/API-Deck%20of%20Cards-lightgrey?style=flat-square)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Exo%202-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

**War (Card Game)** — the **fourth project in the APIs and Async JavaScript module** from **Scrimba's Fullstack Web Development Path**.

This README is a **complete concept revision guide**. It explains every new concept introduced beyond the `.then()` chain — the `async` / `await` syntax, how it maps to Promises, chained API requests with shared state, the `Array.indexOf()` technique for ranking, `button.disabled`, `calc()` in CSS, `:nth-of-type()`, and `:disabled` pseudo-class — while revisiting the full asynchronous JavaScript model established in earlier projects.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs URLs and REST](#3-whats-new-vs-urls-and-rest)
4. [async / await — The Modern Promise Syntax](#4-async--await--the-modern-promise-syntax)
   - [The problem with .then() chains](#41-the-problem-with-then-chains)
   - [The async keyword](#42-the-async-keyword)
   - [The await keyword](#43-the-await-keyword)
   - [async/await vs .then() — exact equivalence](#44-asyncawait-vs-then--exact-equivalence)
   - [await on an arrow function event listener](#45-await-on-an-arrow-function-event-listener)
   - [Error handling — try/catch](#46-error-handling--trycatch)
5. [Chained API Requests with Shared State](#5-chained-api-requests-with-shared-state)
   - [Request 1 — creating a new shuffled deck](#51-request-1--creating-a-new-shuffled-deck)
   - [Saving deckId to module-level state](#52-saving-deckid-to-module-level-state)
   - [Request 2 — drawing 2 cards using the saved deckId](#53-request-2--drawing-2-cards-using-the-saved-deckid)
   - [URL template literal with deckId](#54-url-template-literal-with-deckid)
6. [The Deck of Cards API](#6-the-deck-of-cards-api)
   - [New deck endpoint](#61-new-deck-endpoint)
   - [Draw cards endpoint](#62-draw-cards-endpoint)
   - [Card object shape](#63-card-object-shape)
   - [Query parameter — count=2](#64-query-parameter--count2)
7. [Array.indexOf() for Card Value Ranking](#7-arrayindexof-for-card-value-ranking)
   - [The valueOptions lookup array](#71-the-valueoptions-lookup-array)
   - [How indexOf() returns rank](#72-how-indexof-returns-rank)
   - [Comparing two indices to determine the winner](#73-comparing-two-indices-to-determine-the-winner)
8. [Rendering Card Images from API URLs](#8-rendering-card-images-from-api-urls)
   - [data.cards[0].image](#81-datacards0image)
   - [cardsContainer.children](#82-cardscontainerchildren)
   - [innerHTML with an img tag](#83-innerhtml-with-an-img-tag)
9. [Score Tracking — Module-Level Counters](#9-score-tracking--module-level-counters)
10. [button.disabled — Disabling Interaction](#10-buttondisabled--disabling-interaction)
    - [Setting disabled in JavaScript](#101-setting-disabled-in-javascript)
    - [:disabled CSS pseudo-class](#102-disabled-css-pseudo-class)
    - [cursor: not-allowed](#103-cursor-not-allowed)
11. [End-Game Logic — if / else if / else Chain](#11-end-game-logic--if--else-if--else-chain)
12. [CSS Concepts — calc() and Background Image](#12-css-concepts--calc-and-background-image)
    - [background-image: url() on html and body](#121-background-image-url-on-html-and-body)
    - [calc() — computing values from mixed units](#122-calc--computing-values-from-mixed-units)
    - [justify-content: space-between in a column](#123-justify-content-space-between-in-a-column)
    - [align-self: flex-start](#124-align-self-flex-start)
    - [align-self: stretch](#125-align-self-stretch)
    - [:nth-of-type() pseudo-class](#126-nth-of-type-pseudo-class)
    - [button#new-deck vs button.draw — selector specificity](#127-buttonnew-deck-vs-buttondraw--selector-specificity)
13. [HTML Structure Recap](#13-html-structure-recap)
14. [How the App Flow Works](#14-how-the-app-flow-works)
15. [How to Run](#15-how-to-run)
16. [Course Reference](#16-course-reference)

---

# 1. Project Overview

**War** is a browser-based card game built on the [Deck of Cards API](https://deckofcardsapi.com/). The game has two phases:

**Phase 1 — New Deck** (click "New Deck"):
- Sends a GET request to the Deck of Cards API to create a new shuffled 52-card deck
- Saves the returned `deck_id` to module-level state
- Displays the remaining card count

**Phase 2 — Draw** (click "Draw", repeatedly):
- Uses the saved `deck_id` to draw 2 cards from the API
- Displays both card images in the card slots
- Compares the two card values using an index-based ranking system
- Updates the winner text and the winning player's score
- When 0 cards remain, disables the Draw button and displays the final game winner

The entire JavaScript uses `async` / `await` instead of `.then()` — this is the project's central lesson: the modern syntax for writing asynchronous code that reads like synchronous code.

---

# 2. Project Structure

```
07. APIs and Async JavaScript/
│
└── 04. Async JavaScript/
    ├── index.html    → Two buttons, two card slots, score headings, remaining count
    ├── index.css     → Card table background, flex layout, card slot sizing, disabled state
    ├── index.js      → async/await fetch calls, card ranking, score tracking, game end logic
    └── img/
        └── table.png → Green card table texture — used as full-page background image
```

---

# 3. What's New vs URLs and REST

## New JavaScript Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `async` function keyword | `async function handleClick()`, `async () =>` | Marks a function as asynchronous — it always returns a Promise and can use `await` inside |
| `await` keyword | `await fetch(...)`, `await res.json()` | Pauses execution inside an `async` function until the Promise resolves; returns the resolved value directly |
| `async/await` as `.then()` replacement | Throughout `index.js` — the entire project | Flat, synchronous-looking syntax for Promise chains |
| `async` arrow function | `drawCardBtn.addEventListener("click", async () => { ... })` | Arrow functions can also be `async` — allows `await` inside |
| Chained API requests via shared state | `deckId` used in second `fetch` URL | Two separate `fetch` calls that depend on each other via a module-level variable |
| URL template literal | `` `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2` `` | Builds the second API URL dynamically using `deckId` from the first request |
| `Array.indexOf(value)` | `valueOptions.indexOf(card1.value)` | Returns the position of a value in an array — used to convert card face value to a numeric rank |
| `cardsContainer.children` | `cardsContainer.children[0]`, `cardsContainer.children[1]` | HTMLCollection of direct child elements — indexed like an array |
| `button.disabled = true` | `drawCardBtn.disabled = true` | Sets the HTML `disabled` attribute in JavaScript — prevents further clicks |
| End-game `if / else if / else` | After `data.remaining === 0` | Compares final scores and sets the game-over message |
| `data.cards[0]`, `data.cards[1]` | Draw response handling | Accesses items from the API-returned cards array by index |
| `data.cards[0].image` | Card image rendering | API-provided image URL string inserted into an `<img>` tag |

## New CSS Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `background-image: url()` on `html, body` | `html, body { background-image: url("img/table.png") }` | Applies a texture image as the page background (distinct from `background` shorthand) |
| `calc()` | `width: calc(120px * 5 / 7)` | Computes a value from an arithmetic expression mixing units |
| `:nth-of-type(n)` | `div.card-slot:nth-of-type(1)` | Selects the nth element of a given type among siblings |
| `button:disabled` | `button:disabled { cursor: not-allowed }` | Styles an element when its `disabled` attribute is set |
| `cursor: not-allowed` | `button:disabled` | Shows a ⊘ cursor over disabled interactive elements |
| `align-self: flex-start` | `button#new-deck` | Overrides a flex item's cross-axis alignment for that item only |
| `align-self: stretch` | `button.draw` | Makes the Draw button span the full cross-axis width |

## Concepts Carried Over ↩

| Concept | Used Again In |
|---------|--------------|
| `async function` + `await fetch()` | The entire JS — was `.then()` in prior projects |
| `fetch(url)` + `res.json()` | Both fetch calls |
| Template literals | URL construction, `textContent` updates |
| Module-level state variables | `deckId`, `computerScore`, `myScore` |
| `document.getElementById()` | All DOM element references |
| `innerHTML` | Card image insertion |
| `textContent` | Score, remaining, header updates |
| `addEventListener("click", fn)` | Both buttons |
| `display: flex; flex-direction: column` | Body layout |
| `align-items: center` | Body |
| `justify-content: space-between` | Body — distributes vertically |
| Google Fonts CDN | Exo 2 font |

---

# 4. `async` / `await` — The Modern Promise Syntax

## 4.1 The problem with `.then()` chains

The `.then()` chains in BoredBot and BlogSpace work correctly but can become hard to follow when multiple asynchronous steps depend on each other:

```javascript
// .then() version — nesting increases with each step
fetch(url1)
    .then(res => res.json())
    .then(data => {
        deckId = data.deck_id
        return fetch(`${url2}/${deckId}/draw/`)
    })
    .then(res => res.json())
    .then(cards => {
        // use cards
    })
```

`async` / `await` flattens this into code that **reads top-to-bottom** like synchronous code, while still being asynchronous under the hood.

## 4.2 The `async` keyword

```javascript
async function handleClick() {
    // ...
}
```

`async` before a function declaration (or expression or arrow function) does two things:
1. The function **always returns a Promise** — even if you `return` a plain value, it is wrapped in a resolved Promise
2. The `await` keyword is allowed inside the function body

Without `async`, using `await` inside a function is a **SyntaxError**.

```javascript
// async function always returns a Promise:
async function greet() { return "hello" }
greet()          // → Promise { "hello" }
greet().then(v => console.log(v))  // → "hello"
```

## 4.3 The `await` keyword

```javascript
async function handleClick() {
    const res  = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    remainingText.textContent = `Remaining cards: ${data.remaining}`
    deckId = data.deck_id
}
```

`await` pauses the execution of the `async` function until the Promise to its right **resolves**, then unwraps the resolved value. While the function is paused, the JavaScript engine continues running other code (event listeners, rendering, other tasks) — the rest of the page does not freeze.

```
Line 1: const res = await fetch(url)
         │
         └── fetch() fires the HTTP request → returns a Promise
             await PAUSES handleClick() here
             JavaScript runs other things while waiting
             ...
             Network response arrives → Promise fulfils
             await RESUMES → res = the Response object

Line 2: const data = await res.json()
         │
         └── res.json() starts parsing the body → returns a Promise
             await PAUSES handleClick() here again
             Parsing completes → Promise fulfils
             await RESUMES → data = the parsed JS object

Line 3: remainingText.textContent = `Remaining cards: ${data.remaining}`
         └── synchronous DOM update — runs immediately
```

## 4.4 `async/await` vs `.then()` — exact equivalence

These two blocks are **behaviourally identical** — `async/await` is syntax sugar over Promises:

```javascript
// .then() version (BoredBot style):
fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        remainingText.textContent = `Remaining cards: ${data.remaining}`
        deckId = data.deck_id
    })

// async/await version (this project):
async function handleClick() {
    const res  = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    remainingText.textContent = `Remaining cards: ${data.remaining}`
    deckId = data.deck_id
}
```

| Aspect | `.then()` | `async/await` |
|--------|-----------|--------------|
| Syntax | Chained method calls | Looks like synchronous code |
| Variables | Scoped to each `.then()` callback | All in the same function scope |
| Error handling | `.catch()` at chain end | `try/catch` wrapping `await` calls |
| Debugging | Stack traces can be cryptic | Cleaner stack traces; breakpoints work intuitively |
| Multiple awaits | Nested `.then()` callbacks | Flat, sequential lines |
| Return value | Last `.then()` value | Function's `return` statement |

> Both compile to the same underlying Promise machinery. `async/await` does not add new capabilities — it only makes the code easier to read and reason about.

## 4.5 `await` on an arrow function event listener

```javascript
drawCardBtn.addEventListener("click", async () => {
    const res  = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    // ...
})
```

Arrow functions can also be marked `async`. The `async` keyword goes **before the parameter list**: `async () =>`, `async (e) =>`, `async (a, b) =>`. This is the standard pattern for using `await` inside event listener callbacks.

## 4.6 Error handling — `try/catch`

This project does not implement error handling (the course introduces it in later lessons). In production, `async` functions should wrap `await` calls in `try/catch`:

```javascript
async function handleClick() {
    try {
        const res  = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        const data = await res.json()
        remainingText.textContent = `Remaining cards: ${data.remaining}`
        deckId = data.deck_id
    } catch (error) {
        console.error("Failed to create deck:", error)
        header.textContent = "Error — could not connect to API"
    }
}
```

Without `try/catch`, an unhandled Promise rejection (network failure, server error) appears as a console error but does not crash the app — the `async` function simply returns a rejected Promise.

---

# 5. Chained API Requests with Shared State

## 5.1 Request 1 — creating a new shuffled deck

```javascript
async function handleClick() {
    const res  = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    const data = await res.json()
    remainingText.textContent = `Remaining cards: ${data.remaining}`
    deckId = data.deck_id
    console.log(deckId)
}
```

The first request creates a new 52-card shuffled deck on the server. The response includes a `deck_id` — a unique string identifier for this deck session. All subsequent draws must reference this ID.

Response shape:
```json
{
    "success": true,
    "deck_id": "3p40paa87x90",
    "shuffled": true,
    "remaining": 52
}
```

## 5.2 Saving `deckId` to module-level state

```javascript
let deckId           // ← declared at top of script, initially undefined

async function handleClick() {
    // ...
    deckId = data.deck_id    // ← written here after first request
}

drawCardBtn.addEventListener("click", async () => {
    const res = await fetch(`.../${deckId}/draw/...`)  // ← read here in second request
})
```

`deckId` is declared with `let` at the **top level of the script** — outside all functions. This gives it **script scope**, making it accessible to both the `handleClick` function and the draw button's listener. The two functions share state through this module-level variable.

This is the same pattern as `postsArray` in BlogSpace, applied to a single ID value:

```
handleClick()     → writes deckId
drawCardBtn click → reads deckId (set by a prior handleClick)
```

## 5.3 Request 2 — drawing 2 cards using the saved `deckId`

```javascript
const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
```

The second request is a GET to a **dynamic URL** constructed from `deckId`. The server looks up the deck by ID, removes 2 cards from it (server-side state), and returns them. Calling this endpoint again returns the next 2 cards — each draw is stateful on the server.

## 5.4 URL template literal with `deckId`

```javascript
`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
```

`${deckId}` interpolates the deck ID into the URL path. This is the **URL parameter** pattern from the REST concepts section — `/deck/{deckId}/draw/` targets the specific deck's draw endpoint.

> If `drawCardBtn` is clicked **before** `handleClick()` has run, `deckId` is `undefined` and the URL becomes `.../undefined/draw/...` — the API returns an error. A production app would disable the Draw button until `deckId` is set, enabling it only after the New Deck fetch succeeds.

---

# 6. The Deck of Cards API

## 6.1 New deck endpoint

```
GET https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/
```

Creates a fresh 52-card deck, shuffles it server-side, and returns a `deck_id`. Each call generates a brand-new unique deck.

## 6.2 Draw cards endpoint

```
GET https://apis.scrimba.com/deckofcards/api/deck/{deck_id}/draw/?count=2
```

Draws `count` cards from the top of the specified deck. The drawn cards are removed from the deck on the server — calling this again draws the next cards.

## 6.3 Card object shape

Each drawn card is an object:

```json
{
    "image": "https://deckofcardsapi.com/static/img/KH.png",
    "value": "KING",
    "suit": "HEARTS",
    "code": "KH"
}
```

| Property | Type | Values |
|----------|------|--------|
| `image` | string URL | A direct link to the card face image PNG |
| `value` | string | `"2"`, `"3"`, ..., `"10"`, `"JACK"`, `"QUEEN"`, `"KING"`, `"ACE"` |
| `suit` | string | `"HEARTS"`, `"DIAMONDS"`, `"CLUBS"`, `"SPADES"` |
| `code` | string | Two-character shorthand, e.g. `"KH"` |

The draw response wraps the cards in an object:
```json
{
    "success": true,
    "deck_id": "3p40paa87x90",
    "cards": [ { card1 }, { card2 } ],
    "remaining": 50
}
```

## 6.4 Query parameter — `?count=2`

```
/draw/?count=2
```

`count` is a query parameter telling the API how many cards to draw. This project always draws exactly 2 — one for the computer, one for the player. The API defaults to 1 if `count` is omitted.

---

# 7. `Array.indexOf()` for Card Value Ranking

## 7.1 The `valueOptions` lookup array

```javascript
const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
    "10", "JACK", "QUEEN", "KING", "ACE"]
```

Card values from the API are strings (`"JACK"`, `"ACE"`) — not numbers — so they cannot be compared directly with `>` or `<`. A lookup array is created where **position = rank**: `"2"` is at index 0 (lowest), `"ACE"` is at index 12 (highest).

## 7.2 How `indexOf()` returns rank

```javascript
const card1ValueIndex = valueOptions.indexOf(card1.value)
const card2ValueIndex = valueOptions.indexOf(card2.value)
```

`Array.indexOf(searchValue)` returns the **zero-based index** of the first occurrence of `searchValue` in the array, or `-1` if not found.

| `card.value` | `valueOptions.indexOf(card.value)` | Rank |
|-------------|-----------------------------------|------|
| `"2"` | `0` | Lowest |
| `"10"` | `8` | Middle |
| `"JACK"` | `9` | Above 10 |
| `"QUEEN"` | `10` | |
| `"KING"` | `11` | |
| `"ACE"` | `12` | Highest |

By converting card values to their array indices, any two cards can be compared with simple `>` and `<` on numbers.

## 7.3 Comparing two indices to determine the winner

```javascript
function determineCardWinner(card1, card2) {
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You win!"
    } else {
        return "War!"  // equal values — a tie
    }
}
```

`card1` is always the computer's card (first drawn), `card2` is the player's. Whichever has the higher index wins. A tie returns `"War!"` — matching the game's name.

The function **returns a string** (`"Computer wins!"`, `"You win!"`, `"War!"`) which the caller assigns to `header.textContent`:

```javascript
const winnerText = determineCardWinner(data.cards[0], data.cards[1])
header.textContent = winnerText
```

This separation of concerns — computing the result in one function, displaying it in the caller — keeps `determineCardWinner` pure and testable.

---

# 8. Rendering Card Images from API URLs

## 8.1 `data.cards[0].image`

```javascript
cardsContainer.children[0].innerHTML = `
    <img src=${data.cards[0].image} class="card" />
`
cardsContainer.children[1].innerHTML = `
    <img src=${data.cards[1].image} class="card" />
`
```

`data.cards` is a JavaScript array of two card objects (after `await res.json()`). `data.cards[0]` is the first drawn card (computer's), `data.cards[1]` is the second (player's). `.image` is the full URL string of the card face image served by the Deck of Cards API.

The URL is interpolated directly into an `<img src=...>` tag — no quotes around the attribute value in this code (works in most browsers because the URL has no spaces, but adding quotes is best practice: `src="${data.cards[0].image}"`).

## 8.2 `cardsContainer.children`

```javascript
const cardsContainer = document.getElementById("cards")
cardsContainer.children[0]  // → first  .card-slot div
cardsContainer.children[1]  // → second .card-slot div
```

`element.children` is an **HTMLCollection** (live, array-like) of the element's direct child elements. It is indexed like an array but is not a true Array — methods like `forEach` are not available directly. Index `[0]` accesses the first `<div class="card-slot">`, `[1]` the second.

| Property | Returns | Live? | Array methods? |
|----------|---------|-------|---------------|
| `element.children` | HTMLCollection of child **elements** | ✅ Yes | ❌ No |
| `element.childNodes` | NodeList of all child **nodes** (incl. text) | ✅ Yes | ❌ No |
| `element.querySelectorAll()` | Static NodeList | ❌ No | ❌ No |

## 8.3 `innerHTML` with an `<img>` tag

```javascript
cardsContainer.children[0].innerHTML = `<img src=${data.cards[0].image} class="card" />`
```

Each call replaces the content of the card slot with a new `<img>`. On the first draw, the slot was empty. On subsequent draws, the old card image is replaced by the new one — `innerHTML` overwrites completely.

---

# 9. Score Tracking — Module-Level Counters

```javascript
let computerScore = 0
let myScore = 0
```

Both scores are initialised to `0` at module level. They persist across draws — `++` increments them in-place inside `determineCardWinner`, and the updated value is immediately reflected in the DOM:

```javascript
computerScore++
computerScoreEl.textContent = `Computer score: ${computerScore}`
```

`++` (postfix increment) increases the variable by 1. Here the returned value (the old value, before increment) is discarded — only the side effect (mutation of `computerScore`) matters.

When the game ends (`data.remaining === 0`), the final values of `computerScore` and `myScore` are compared to determine the overall game winner.

---

# 10. `button.disabled` — Disabling Interaction

## 10.1 Setting `disabled` in JavaScript

```javascript
if (data.remaining === 0) {
    drawCardBtn.disabled = true
    // ...
}
```

Setting `element.disabled = true` in JavaScript adds the HTML `disabled` attribute to the element. For `<button>` elements, this:
- Prevents the `click` event from firing
- Changes the visual appearance (handled by `button:disabled` CSS)
- Is reflected in `button.disabled` as `true`

Setting `element.disabled = false` removes the attribute, re-enabling the button.

| Action | Code | Effect |
|--------|------|--------|
| Disable | `btn.disabled = true` | Adds `disabled` attribute — no more clicks |
| Enable | `btn.disabled = false` | Removes attribute — clicks work again |
| Check | `if (btn.disabled)` | `true` if disabled |

## 10.2 `:disabled` CSS pseudo-class

```css
button:disabled {
    cursor: not-allowed;
}
```

`:disabled` is a CSS pseudo-class that matches elements with the `disabled` attribute. It fires automatically whenever `button.disabled = true` is set in JavaScript — no class manipulation needed. This is a declarative link between JS state and CSS appearance.

## 10.3 `cursor: not-allowed`

```css
cursor: not-allowed;
```

`cursor: not-allowed` displays a **⊘ symbol** (circle with a line through it) when the user hovers over a disabled button — communicating that the element is interactive but not currently usable.

| `cursor` value | Icon | Use case |
|---------------|------|---------|
| `pointer` | 👆 | Clickable elements |
| `default` | ↖ | Normal, non-interactive elements |
| `not-allowed` | ⊘ | Disabled or forbidden actions |
| `wait` | ⏳ | Loading state |
| `grab` / `grabbing` | ✋ | Draggable items |

---

# 11. End-Game Logic — `if / else if / else` Chain

```javascript
if (data.remaining === 0) {
    drawCardBtn.disabled = true
    if (computerScore > myScore) {
        header.textContent = "The computer won the game!"
    } else if (myScore > computerScore) {
        header.textContent = "You won the game!"
    } else {
        header.textContent = "It's a tie game!"
    }
}
```

`data.remaining === 0` is the game-end condition — checked after every draw. When true:

1. The Draw button is disabled — no more cards can be drawn
2. A nested `if/else if/else` evaluates the final scores:
   - `computerScore > myScore` → computer won
   - `myScore > computerScore` → player won
   - Neither → tie (scores are equal)

`===` (strict equality) is used to check `data.remaining === 0` — comparing the number `0` to the number returned by the API (which is a number, not a string). Using `==` would also work here but `===` is the preferred practice as it avoids type coercion.

---

# 12. CSS Concepts — `calc()` and Background Image

## 12.1 `background-image: url()` on `html` and `body`

```css
html, body {
    background-image: url("img/table.png");
    height: 100vh;
}
```

`background-image: url()` sets a background image independently of `background-color`. Unlike the `background` shorthand used in BoredBot (which combined colour + image in one declaration), here only the image property is set — the browser's default white background shows if the image fails to load.

Setting `background-image` on both `html` and `body` ensures the table texture covers the full page even if the body's content is shorter than the viewport. When `body` has `height: 100vh`, this is technically redundant — but it is common defensive practice.

## 12.2 `calc()` — computing values from mixed units

```css
div.card-slot {
    height: 120px;
    width: calc(120px * 5 / 7);
}
```

`calc()` performs arithmetic on CSS values at render time. It can mix units that cannot normally be combined:

```
width: calc(120px * 5 / 7)
     = calc(600px / 7)
     = 85.7px
```

**Why this formula?** Standard playing cards have an aspect ratio of 5:7 (width:height). The card slots are 120px tall, so the correct width is `120 × 5 / 7 ≈ 85.7px` — making each slot the exact proportions of a real card.

`calc()` operators:

| Operator | Example | Note |
|----------|---------|------|
| `+` | `calc(100% + 20px)` | Spaces required around `+` and `-` |
| `-` | `calc(100vh - 80px)` | Spaces required |
| `*` | `calc(120px * 5)` | Spaces optional |
| `/` | `calc(600px / 7)` | Spaces optional |

> **Spaces are required around `+` and `-`** in `calc()` — `calc(100%-20px)` is invalid; `calc(100% - 20px)` is correct.

## 12.3 `justify-content: space-between` in a column

```css
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
```

In a `flex-direction: column` container, `justify-content: space-between` distributes items along the **vertical** axis with equal spacing between them and no extra space at the top or bottom. The result: the top bar (New Deck + remaining), the header, the card area, the score, and the Draw button are evenly spaced top-to-bottom filling `100vh`.

This was covered in the CSS Grid project's inner flex containers — here it creates the entire page's vertical layout without a single `margin`.

## 12.4 `align-self: flex-start`

```css
button#new-deck {
    align-self: flex-start;
}
```

`align-self` overrides `align-items` from the parent **for a single flex item**. The parent `body` has `align-items: center` — all items are horizontally centred by default. `align-self: flex-start` on `button#new-deck` aligns it to the **left edge** of the container instead.

However, `.top` is the actual flex child (the div wrapping the New Deck button and remaining text) — the `align-self` on the button only affects it within `.top`'s flex context, not `body`'s.

## 12.5 `align-self: stretch`

```css
button.draw {
    align-self: stretch;
}
```

`align-self: stretch` makes the Draw button span the **full cross-axis width** of the flex container — stretching it from edge to edge. Since the parent `body` has `flex-direction: column`, the cross axis is horizontal. The Draw button becomes full-width, creating a prominent primary action area at the bottom of the screen.

## 12.6 `:nth-of-type()` pseudo-class

```css
div.card-slot:nth-of-type(1) {
    margin-bottom: 10px;
}
```

`:nth-of-type(n)` selects the **nth sibling element of the same type** among its parent's children. `div.card-slot:nth-of-type(1)` selects the first `<div>` that is a sibling among the children of `#cards`.

| Selector | Matches |
|----------|---------|
| `:nth-of-type(1)` | First element of its type |
| `:nth-of-type(2)` | Second element of its type |
| `:nth-of-type(odd)` | 1st, 3rd, 5th... |
| `:nth-of-type(even)` | 2nd, 4th, 6th... |
| `:nth-of-type(3n)` | Every 3rd |

Here it adds `margin-bottom: 10px` only to the **computer's card slot** (the first `<div class="card-slot">`), creating visual separation between the two card slots without affecting the player's slot.

## 12.7 `button#new-deck` vs `button.draw` — selector specificity

```css
button {
    background-color: #FFF100;
    cursor: pointer;
    border: none;
}

button#new-deck {
    align-self: flex-start;
    padding: 5px;
}

button.draw {
    font-size: 1.2em;
    padding: 5px;
    align-self: stretch;
}
```

Both `button#new-deck` (type + ID) and `button.draw` (type + class) follow the **BEM-style modifier pattern** from the Product Page: shared base styles on `button`, specific variant styles on the more specific selectors.

| Selector | Specificity | Targets |
|----------|-------------|---------|
| `button` | (0,0,1) | All buttons |
| `button.draw` | (0,1,1) | Buttons with `class="draw"` |
| `button#new-deck` | (1,0,1) | Button with `id="new-deck"` |

Higher specificity wins for conflicting properties. The `button#new-deck` and `button.draw` selectors override the base `button` rule for their respective targets.

---

# 13. HTML Structure Recap

```html
<html>
  <head>
    <link> → Google Fonts (Exo 2: weight 300)
    <link> → index.css
  </head>
  <body>                                        ← flex column, space-between, 100vh
    <div class="top">                           ← flex row: New Deck btn + remaining count
      <button id="new-deck">New Deck</button>
      <p id="remaining"></p>                    ← "Remaining cards: 52" (JS populates)
    </div>

    <h2 id="header">Game of War</h2>            ← round winner / game winner text

    <h3 id="computer-score">Computer score: 0</h3>

    <div id="cards">                            ← cardsContainer
      <div class="card-slot"></div>             ← children[0]: computer's card
      <div class="card-slot"></div>             ← children[1]: player's card
    </div>

    <h3 id="my-score">My score: 0</h3>

    <button id="draw-cards" class="draw">Draw</button>

    <script src="index.js"></script>
  </body>
</html>
```

### Notable observations

| Observation | Explanation |
|-------------|-------------|
| `<div class="card-slot">` starts empty | `cardsContainer.children[n].innerHTML` populates them after draws |
| `<h3 id="computer-score">` starts at `0` | JS updates `textContent` incrementally after each winning round |
| `<button id="draw-cards" class="draw">` has two selectors | `id="draw-cards"` used by `getElementById`; `class="draw"` used by CSS |
| `<h2 id="header">Game of War</h2>` | Repurposed as a dynamic status display — shows round result and final winner |
| No `<meta name="viewport">` | Missing — same gap as previous projects |

---

# 14. How the App Flow Works

```
Page loads — index.js top-to-bottom
    ├── deckId = undefined                    ← uninitialised
    ├── computerScore = 0, myScore = 0
    ├── All DOM refs cached (getElementById)
    ├── newDeckBtn.addEventListener("click", handleClick)
    └── drawCardBtn.addEventListener("click", async () => {...})

User clicks "New Deck"
    └── handleClick() called (async function)
            const res  = await fetch(".../deck/new/shuffle/")
                → HTTP GET sent; function pauses
                → Response arrives
            const data = await res.json()
                → Body parsed; function pauses
                → data = { deck_id: "abc123", remaining: 52, ... }
            remainingText.textContent = "Remaining cards: 52"
            deckId = "abc123"                ← saved to module state

User clicks "Draw"
    └── async arrow callback fires
            const res  = await fetch(`.../${deckId}/draw/?count=2`)
                              ↑ uses saved deckId
                → HTTP GET sent; function pauses
                → Response arrives
            const data = await res.json()
                → data = { cards: [{card1}, {card2}], remaining: 50 }
            remainingText.textContent = "Remaining cards: 50"
            cardsContainer.children[0].innerHTML = "<img src=card1.image />"
            cardsContainer.children[1].innerHTML = "<img src=card2.image />"
            winnerText = determineCardWinner(card1, card2)
                → valueOptions.indexOf(card1.value) vs indexOf(card2.value)
                → computerScore++ or myScore++ and textContent updated
                → returns "Computer wins!" / "You win!" / "War!"
            header.textContent = winnerText

            if (data.remaining === 0):
                drawCardBtn.disabled = true  → :disabled CSS fires
                if computerScore > myScore   → "The computer won the game!"
                else if myScore > computerScore → "You won the game!"
                else                         → "It's a tie game!"
                header.textContent = final message

(User can click "Draw" up to 26 more times before deck is empty)
```

---

# 15. How to Run

No build step required. Uses a plain `<script>` tag — no ES Modules — so `file://` works:

1. Clone the repository:
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder:
   ```bash
   cd "07. APIs and Async JavaScript/04. Async JavaScript"
   ```

3. Open `index.html` directly in your browser.

**Things to try:**
- Open DevTools → **Network** tab, click "New Deck" — watch the GET request to `/deck/new/shuffle/`; note the `deck_id` in the Response JSON
- Click "Draw" — watch a second request appear: `/deck/{deck_id}/draw/?count=2` — confirm the path contains the actual `deck_id` from the first request
- Add `console.log("before await")` before and `console.log("after await")` after the first `await` — observe the async pause by noticing `console.log` output order
- In DevTools → **Sources**, set a breakpoint on `const data = await res.json()` — step through and inspect `res` (the Response object) and then `data` (the parsed object)
- Click "Draw" before "New Deck" — inspect the Network request URL — it will contain `undefined`; see what the API returns
- Manually set `drawCardBtn.disabled = true` in the Console — observe the `:disabled` CSS firing (cursor changes)
- Change `?count=2` to `?count=1` — draw only one card and see what breaks
- Check `cardsContainer.children` type in the Console — `Array.isArray(cardsContainer.children)` returns `false` (it is an HTMLCollection, not an Array)

---

# 16. Course Reference

| Item | Detail |
|------|--------|
| Platform | [Scrimba](https://scrimba.com) |
| Course | Fullstack Web Development Path |
| Module | APIs and Async JavaScript |
| Project number | 04 of the module |
| Key new concepts | `async` / `await` · `async` arrow functions · `await` equivalence with `.then()` · Chained API requests via shared state · `Array.indexOf()` for ranking · `element.children` HTMLCollection · `button.disabled` · `:disabled` pseudo-class · `cursor: not-allowed` · `calc()` · `background-image: url()` · `:nth-of-type()` · `align-self` |
| Previous project | [02. URLs and REST](../02.%20URLs%20and%20REST/README.md) |
| Next project | [05. Movie Watchlist](../05.%20Movie%20Watchlist/) |
| Deck of Cards API | [https://deckofcardsapi.com](https://deckofcardsapi.com) |
| MDN — async function | [MDN — async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) |
| MDN — await | [MDN — await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) |
| MDN — Array.indexOf() | [MDN — Array.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) |
| MDN — calc() | [MDN — calc()](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) |
| MDN — :disabled | [MDN — :disabled](https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled) |

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *`async` / `await` does not change what JavaScript does — it changes how you see what JavaScript does. A Promise chain is a series of callbacks chained together; `async/await` is the same series written as if each step happens one after the other. The code becomes readable in the order it executes. That is not a small thing — it is the difference between code that requires mental context-switching to understand and code that reads like a story.*
