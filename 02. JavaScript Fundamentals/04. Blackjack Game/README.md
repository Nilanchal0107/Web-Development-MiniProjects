# 08. Blackjack Game
![JavaScript](https://img.shields.io/badge/JavaScript-Game%20Logic-yellow?style=flat-square&logo=javascript)
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A fully playable browser-based Blackjack game — the most complex JavaScript project in Module 3. The player starts a game, receives two randomly drawn cards, sees their running sum, and can draw new cards one at a time. The game watches for Blackjack (sum = 21), a bust (sum > 21), and handles the special Ace card value rule (1 or 11). A player object tracks the player's name and chip balance.

This README is a **complete concept revision guide**. Every new concept introduced during the build — objects, arrays, `Math.random()`, `if/else if/else`, `for` loops, booleans, and returning values from functions — is explained in full with examples.

---

# Table of Contents

1. [Project Structure](#1-project-structure)
2. [App Layout and Flow](#2-app-layout-and-flow)
3. [New Concept — Objects](#3-new-concept--objects)
4. [New Concept — Arrays](#4-new-concept--arrays)
5. [New Concept — Math.random() and Math.floor()](#5-new-concept--mathrandom-and-mathfloor)
6. [New Concept — if / else if / else](#6-new-concept--if--else-if--else)
7. [New Concept — return — Functions That Give Back Values](#7-new-concept--return--functions-that-give-back-values)
8. [New Concept — for Loops](#8-new-concept--for-loops)
9. [New Concept — Boolean Variables as Flags](#9-new-concept--boolean-variables-as-flags)
10. [The getRandomCard() Function — Full Breakdown](#10-the-getrandomcard-function--full-breakdown)
11. [The startGame() Function](#11-the-startgame-function)
12. [The renderGame() Function](#12-the-rendergame-function)
13. [The newCard() Function](#13-the-newcard-function)
14. [The Player Object](#14-the-player-object)
15. [Complete Annotated Code](#15-complete-annotated-code)
16. [Game State Diagram](#16-game-state-diagram)
17. [Concepts Consolidated](#17-concepts-consolidated)
18. [How to Run](#18-how-to-run)
19. [Course Reference](#19-course-reference)

---

# 1. Project Structure

```
08. Blackjack Game/
│
├── index.html   → Game UI: message, cards display, sum, two buttons, player info
├── index.css    → Blackjack table background (table.png), layout, button styles
├── index.js     → All game logic: objects, arrays, random card, start, draw, render
├── table.png    → Green casino table background image
└── temp         → Scrimba scratch file (ignore)
```

---

# 2. App Layout and Flow

```
┌──────────────────────────────────────────────┐
│            B L A C K J A C K                │
│                                              │
│  "Want to play a round?"    ← message-el     │
│                                              │
│  Cards: 7 4                 ← cards-el       │
│  Sum: 11                    ← sum-el         │
│                                              │
│   [ START GAME ]  [ NEW CARD ]               │
│                                              │
│  Nilanchal: $200            ← player-el      │
└──────────────────────────────────────────────┘
```

### Game Flow State Machine

```
Page loads
    │
    ▼
"Want to play a round?" shown
    │
    ▼ [START GAME clicked]
isAlive = true
Two random cards drawn → cards array
sum calculated
renderGame() called
    │
    ├─ sum < 21  → "Do you want to draw a new card?"   [NEW CARD enabled]
    ├─ sum = 21  → "Blackjack! You win! 🎉"            hasBlackJack = true
    └─ sum > 21  → "You're out of the game! 📛"        isAlive = false
                                                        [NEW CARD disabled]
    │
    ▼ [NEW CARD clicked — only if isAlive && !hasBlackJack]
One new random card pushed to cards array
sum updated
renderGame() called again
    └─ loop continues until bust or blackjack
```

---

# 3. New Concept — Objects

## What Is an Object?

An **object** groups related pieces of data together under one variable name. Instead of having two separate variables for a player's name and chips, you put them both inside one object:

```js
// Without objects — messy, unrelated variables
let playerName  = "Nilanchal"
let playerChips = 200

// With an object — clean, grouped, obviously related
let player = {
  name:  "Nilanchal",
  chips: 200
}
```

## Object Syntax

```js
let objectName = {
  key1: value1,
  key2: value2,
  key3: value3
}
```

The pieces inside are called **key-value pairs**. The key is like a label; the value is the data. Keys and values are separated by `:`, and pairs are separated by `,`.

## Accessing Object Properties — Dot Notation

Use a dot (`.`) followed by the key name to read a value:

```js
let player = {
  name:  "Nilanchal",
  chips: 200
}

console.log(player.name)    // "Nilanchal"
console.log(player.chips)   // 200
```

## Using Object Properties in DOM Rendering

```js
playerEl.textContent = player.name + ": $" + player.chips
// renders: "Nilanchal: $200"
```

## Key Insight — Objects vs Separate Variables

| Separate variables | Object |
|--------------------|--------|
| `let playerName = "Nilanchal"` | `let player = { name: "Nilanchal", chips: 200 }` |
| Data is unrelated in memory | Data is grouped under one name |
| No indication these belong together | Immediately clear they're about the same player |
| Hard to pass around in functions | Pass `player` as one unit |

---

# 4. New Concept — Arrays

## What Is an Array?

An **array** is an ordered list of values stored under a single variable name. The Blackjack game uses an array to track all the cards drawn so far:

```js
let cards = []           // empty array — no cards yet
let cards = [7, 4]      // array with two drawn cards
let cards = [7, 4, 9]   // array after drawing a third card
```

## Array Syntax

```js
let arrayName = [value1, value2, value3]
```

Square brackets `[]` define the array. Values inside are separated by commas.

## Accessing Array Items — Index

Each item in an array has a numbered position called an **index**, starting at **0** (not 1):

```js
let cards = [7, 4, 9]

console.log(cards[0])   // 7  — first item
console.log(cards[1])   // 4  — second item
console.log(cards[2])   // 9  — third item
```

```
Index:   0    1    2
         ↓    ↓    ↓
cards = [7,   4,   9]
```

## `.length` Property

```js
let cards = [7, 4, 9]
console.log(cards.length)   // 3
```

`.length` tells you how many items are in the array. Used in `for` loops to know when to stop.

## `.push()` — Adding Items to an Array

When the player draws a new card, it's pushed onto the end of the `cards` array:

```js
let cards = [7, 4]
cards.push(9)
console.log(cards)   // [7, 4, 9]
```

## Resetting an Array

Setting the array back to `[]` empties it completely — used when starting a new game:

```js
cards = []   // empties the array, same as resetting a number to 0
```

---

# 5. New Concept — Math.random() and Math.floor()

## `Math.random()`

`Math.random()` returns a random decimal number between **0 (inclusive) and 1 (exclusive)**:

```js
console.log(Math.random())   // e.g. 0.4823...
console.log(Math.random())   // e.g. 0.9102...
console.log(Math.random())   // e.g. 0.0047...
```

By itself this isn't useful for cards — you need whole numbers between 1 and 13.

## Scaling the Range

Multiply by the range size to get a number between 0 and that value:

```js
Math.random() * 13    // decimal between 0 and 12.999...
```

## `Math.floor()`

`Math.floor()` rounds a decimal **down** to the nearest whole number:

```js
Math.floor(0.9)    // 0
Math.floor(4.7)    // 4
Math.floor(12.99)  // 12
```

## Putting It Together — Random Integer 1 to 13

```js
let randomNumber = Math.floor(Math.random() * 13) + 1
//  Math.random() * 13  → 0.000... to 12.999...
//  Math.floor(...)     → 0 to 12
//  + 1                 → 1 to 13
```

The `+ 1` shifts the range so you get 1–13 instead of 0–12.

## Summary Table

| Function | Input | Output |
|----------|-------|--------|
| `Math.random()` | nothing | random decimal 0 to 0.999... |
| `Math.floor(x)` | any decimal | nearest whole number, rounded down |
| Combined + 1 | — | random integer 1 to 13 |

---

# 6. New Concept — if / else if / else

## Basic `if`

Runs a block of code only if a condition is `true`:

```js
if (sum > 21) {
  message = "You're out of the game! 📛"
}
```

## `if / else`

Runs one block if `true`, a different block if `false`:

```js
if (sum > 21) {
  message = "You're out of the game! 📛"
} else {
  message = "Do you want to draw a new card?"
}
```

## `if / else if / else`

Checks multiple conditions in sequence — stops at the first one that is `true`:

```js
if (sum <= 20) {
  message = "Do you want to draw a new card?"
} else if (sum === 21) {
  message = "Blackjack! You win! 🎉"
} else {
  message = "You're out of the game! 📛"
}
```

The conditions are checked **top to bottom**. As soon as one is `true`, its block runs and the rest are skipped.

## Comparison Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `===` | Strictly equal (same value AND type) | `sum === 21` |
| `!==` | Not equal | `sum !== 21` |
| `>` | Greater than | `sum > 21` |
| `<` | Less than | `sum < 21` |
| `>=` | Greater than or equal | `sum >= 21` |
| `<=` | Less than or equal | `sum <= 20` |

## Logical Operators — Combining Conditions

```js
// AND — both conditions must be true
if (isAlive && !hasBlackJack) {
  // only draw a new card if player is alive AND doesn't already have blackjack
}

// NOT — flips true to false
if (!hasBlackJack) {   // true when hasBlackJack is false
  ...
}
```

---

# 7. New Concept — return — Functions That Give Back Values

So far, all functions have **done** something (modified a variable, updated the DOM). `getRandomCard()` introduces a new pattern — a function that **calculates and returns a value** to wherever it was called.

## Functions Without `return` (void functions)

```js
function addOnePoint() {
  score += 1                  // does something
  // returns nothing (undefined)
}
```

## Functions With `return`

```js
function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1
  if (randomNumber > 10) {
    return 10    // face cards (J, Q, K) are all worth 10
  } else if (randomNumber === 1) {
    return 11    // Ace starts as 11
  } else {
    return randomNumber
  }
}
```

The `return` keyword sends a value **back** to the caller. The function call can then be used like a value:

```js
let firstCard  = getRandomCard()          // e.g. 7
let secondCard = getRandomCard()          // e.g. 11
let sum        = firstCard + secondCard   // 18
```

## Key Insight — `return` Exits the Function Immediately

As soon as JavaScript hits a `return` statement, the function stops — no code below it runs:

```js
function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1
  if (randomNumber > 10) {
    return 10        // exits immediately if condition true
  }
  if (randomNumber === 1) {
    return 11        // exits here if Ace
  }
  return randomNumber   // only reached for 2–10
}
```

---

# 8. New Concept — for Loops

## What Is a `for` Loop?

A `for` loop repeats a block of code a set number of times. The Blackjack game uses one to iterate over all cards and build the display string:

```js
for (let i = 0; i < cards.length; i++) {
  cardsEl.textContent += cards[i] + " "
}
```

## Anatomy of a `for` Loop

```js
for ( initializer ; condition ; increment ) {
  // code to repeat
}
```

| Part | In the example | Meaning |
|------|----------------|---------|
| Initializer | `let i = 0` | Start counter at 0 |
| Condition | `i < cards.length` | Keep looping while this is true |
| Increment | `i++` | After each loop, add 1 to `i` |

## Tracing Through an Example

```js
let cards = [7, 4, 9]

cardsEl.textContent = "Cards: "    // reset to just the label first

for (let i = 0; i < cards.length; i++) {
  cardsEl.textContent += cards[i] + " "
}

// Iteration 1: i=0 → "Cards: " + "7 "  → "Cards: 7 "
// Iteration 2: i=1 → "Cards: 7 " + "4 "  → "Cards: 7 4 "
// Iteration 3: i=2 → "Cards: 7 4 " + "9 "  → "Cards: 7 4 9 "
// i=3 is NOT < 3 → loop ends
```

## Why `i < cards.length` and Not `i <= cards.length`?

Array indices run from `0` to `length - 1`. For an array of 3 items, valid indices are 0, 1, 2. Using `i < 3` correctly stops at index 2. Using `i <= 3` would try to access `cards[3]`, which is `undefined`.

---

# 9. New Concept — Boolean Variables as Flags

## What Is a Boolean?

A **boolean** is a variable that holds only one of two values: `true` or `false`. Booleans are used as **flags** — switches that track the current state of the game:

```js
let isAlive      = false   // is the player still in the game?
let hasBlackJack = false   // has the player hit 21?
```

## Booleans as Game State Guards

```js
function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
  }
}
```

This guard prevents the player from drawing after they've busted or won — even if they click the button repeatedly.

## Setting Flags Inside Logic

```js
function renderGame() {
  if (sum <= 20) {
    message = "Do you want to draw a new card?"
  } else if (sum === 21) {
    message      = "Blackjack! You win! 🎉"
    hasBlackJack = true          // flag flipped to true
  } else {
    message  = "You're out of the game! 📛"
    isAlive  = false             // flag flipped to false
  }
  messageEl.textContent = message
}
```

## Resetting Flags for a New Game

```js
function startGame() {
  isAlive      = true    // reset for new game
  hasBlackJack = false   // reset for new game
  ...
}
```

---

# 10. The getRandomCard() Function — Full Breakdown

This function simulates drawing one random card and returns its **point value**.

```js
function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1

  if (randomNumber > 10) {
    return 10       // Jack (11), Queen (12), King (13) → all worth 10
  } else if (randomNumber === 1) {
    return 11       // Ace → starts as 11
  } else {
    return randomNumber   // 2–10 → face value
  }
}
```

### Card Value Mapping

| `randomNumber` | Card | Returned value |
|----------------|------|----------------|
| 1 | Ace | 11 |
| 2–10 | 2 through 10 | 2–10 (face value) |
| 11 | Jack | 10 |
| 12 | Queen | 10 |
| 13 | King | 10 |

### Why Ace Returns 11

In Blackjack, Ace is worth either 1 or 11 — whichever benefits the hand. The simplified Scrimba version always starts Ace as 11. Full Ace flexibility is a stretch goal using a ternary operator (not yet taught at this stage):

```js
// Stretch goal: Ace flexibility
return sum + 11 > 21 ? 1 : 11   // use 1 if 11 would bust, otherwise 11
```

---

# 11. The startGame() Function

Called when **START GAME** is clicked. Resets all game state and deals two fresh cards.

```js
function startGame() {
  isAlive      = true    // player is back in the game
  hasBlackJack = false   // no blackjack yet

  let firstCard  = getRandomCard()
  let secondCard = getRandomCard()

  cards = [firstCard, secondCard]     // fresh array with two dealt cards
  sum   = firstCard + secondCard      // initial sum

  renderGame()                        // update the UI
}
```

### Why `cards = [firstCard, secondCard]` and Not `.push()`?

Directly assigning a new array guarantees a clean slate. If `.push()` were used without first clearing the old array, cards from the previous game would remain in the list.

---

# 12. The renderGame() Function

Called after every game action to sync the UI with the current state. All DOM updates live here in one place.

```js
function renderGame() {
  // Build the cards display string using a for loop
  cardsEl.textContent = "Cards: "
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " "
  }

  // Show the current sum
  sumEl.textContent = "Sum: " + sum

  // Determine the message and update flags
  if (sum <= 20) {
    message = "Do you want to draw a new card?"
  } else if (sum === 21) {
    message      = "Blackjack! You win! 🎉"
    hasBlackJack = true
  } else {
    message  = "You're out of the game! 📛"
    isAlive  = false
  }

  messageEl.textContent = message
}
```

### Separation of Concerns

```
Data functions:    startGame()  → changes variables only
                   newCard()    → changes variables only
                        ↓
Display function:  renderGame() → reads variables, updates DOM only
```

Keeping all DOM updates in `renderGame()` means there is one single place to look when debugging display issues.

---

# 13. The newCard() Function

Called when **NEW CARD** is clicked. The boolean guard at the top is critical.

```js
function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard()
    sum  += card
    cards.push(card)
    renderGame()
  }
}
```

### The Guard Condition Explained

| Scenario | `isAlive` | `hasBlackJack` | `!hasBlackJack` | Guard result |
|----------|-----------|----------------|-----------------|--------------|
| Game in progress | `true` | `false` | `true` | `true` — draw allowed |
| Player busted | `false` | `false` | `true` | `false` — draw blocked |
| Player has blackjack | `true` | `true` | `false` | `false` — draw blocked |

Without this guard, clicking **NEW CARD** after busting would keep adding cards indefinitely.

---

# 14. The Player Object

The player object stores persistent data that lives across multiple rounds:

```js
let player = {
  name:  "Nilanchal",
  chips: 200
}
```

Rendered once at page load:

```js
playerEl.textContent = player.name + ": $" + player.chips
// "Nilanchal: $200"
```

As a stretch goal, chips update after each game outcome:

```js
// After a win:
player.chips += 20
playerEl.textContent = player.name + ": $" + player.chips

// After a loss:
player.chips -= 10
playerEl.textContent = player.name + ": $" + player.chips
```

Modifying an object property uses the same dot notation as reading it — just add `=` to assign.

---

# 15. Complete Annotated Code

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
    <div class="section">
      <h1>Blackjack</h1>
      <p id="message-el">Want to play a round?</p>
      <p id="cards-el">Cards:</p>
      <p id="sum-el">Sum:</p>
      <button onclick="startGame()">START GAME</button>
      <button onclick="newCard()">NEW CARD</button>
      <p id="player-el"></p>
    </div>
    <script src="index.js"></script>
  </body>
</html>
```

### index.js (complete)

```js
// Player Object
let player = {
  name:  "Nilanchal",
  chips: 200
}

// Game State Variables
let cards        = []      // array of drawn card values
let sum          = 0       // running total
let hasBlackJack = false   // true when sum === 21
let isAlive      = false   // true when game is active
let message      = ""      // current status message

// DOM References
let messageEl = document.getElementById("message-el")
let sumEl     = document.getElementById("sum-el")
let cardsEl   = document.getElementById("cards-el")
let playerEl  = document.getElementById("player-el")

// Render player info on page load
playerEl.textContent = player.name + ": $" + player.chips

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1
  if (randomNumber > 10) {
    return 10
  } else if (randomNumber === 1) {
    return 11
  } else {
    return randomNumber
  }
}

function startGame() {
  isAlive      = true
  hasBlackJack = false
  let firstCard  = getRandomCard()
  let secondCard = getRandomCard()
  cards = [firstCard, secondCard]
  sum   = firstCard + secondCard
  renderGame()
}

function renderGame() {
  cardsEl.textContent = "Cards: "
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += cards[i] + " "
  }
  sumEl.textContent = "Sum: " + sum

  if (sum <= 20) {
    message = "Do you want to draw a new card?"
  } else if (sum === 21) {
    message      = "Blackjack! You win! 🎉"
    hasBlackJack = true
  } else {
    message  = "You're out of the game! 📛"
    isAlive  = false
  }
  messageEl.textContent = message
}

function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandomCard()
    sum += card
    cards.push(card)
    renderGame()
  }
}
```

---

# 16. Game State Diagram

```
Variables at any moment:
┌─────────────────────────────────────────────────────────┐
│  isAlive      = true / false                            │
│  hasBlackJack = true / false                            │
│  cards        = [7, 4, ...]   ← grows with each draw   │
│  sum          = 11, 13, 20... ← updated after each draw │
│  message      = "Do you want..." / "Blackjack!" / "Out" │
└─────────────────────────────────────────────────────────┘

Button click → function called → variables changed → renderGame() → DOM updated
```

---

# 17. Concepts Consolidated

| Concept | Where Applied |
|---------|--------------|
| **Object** | `player = { name, chips }` |
| **Dot notation** | `player.name`, `player.chips` |
| **Array** | `cards = []` — stores all drawn card values |
| **Array index** | `cards[i]` inside the `for` loop |
| **`.push()`** | `cards.push(card)` — adds newly drawn card |
| **`.length`** | `cards.length` — loop stop condition |
| **`Math.random()`** | Generates random decimal 0–0.999 |
| **`Math.floor()`** | Rounds decimal down to integer |
| **Random int formula** | `Math.floor(Math.random() * 13) + 1` |
| **`if / else if / else`** | Card values in `getRandomCard()`, game state in `renderGame()` |
| **`===`** | `randomNumber === 1` (Ace), `sum === 21` (Blackjack) |
| **`return`** | `getRandomCard()` returns a number to its caller |
| **`for` loop** | Iterates `cards` array to build display string |
| **`i++`** | Loop counter increment |
| **Boolean flags** | `isAlive`, `hasBlackJack` — guard conditions |
| **`&&` / `!`** | `isAlive && !hasBlackJack` in `newCard()` guard |
| **DOM — 4 elements** | `messageEl`, `sumEl`, `cardsEl`, `playerEl` |
| **`.textContent =`** | Updates all four DOM elements |
| **`onclick`** | `startGame()` and `newCard()` wired to buttons |

---

# 18. How to Run

1. Clone the repository
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder
   ```bash
   cd "08. Blackjack Game"
   ```

3. Open `index.html` in your browser or use **Live Server** in VS Code.

4. Click **START GAME** to deal two cards. Click **NEW CARD** to draw one at a time. The game ends automatically on a bust or blackjack.

---

# 19. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Module 3 — JavaScript Fundamentals, Section 4: Build a Blackjack Game
* **Official Scrimba repo:** [scrimba/learn-fullstack-development — 04. Build a Blackjack Game](https://github.com/scrimba/learn-fullstack-development/tree/main/03.%20JavaScript%20Fundamentals/04.%20Build%20a%20Blackjack%20Game)

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *The Blackjack Game is the most conceptually dense project in Module 3. It introduces objects, arrays, Math.random, if/else if chains, return values, for loops, and boolean flags — all in one project. Every concept here reappears in every JavaScript project that follows.*
