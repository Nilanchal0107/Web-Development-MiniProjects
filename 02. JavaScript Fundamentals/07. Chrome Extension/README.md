# 11. Chrome Extension — Leads Tracker
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Chrome](https://img.shields.io/badge/Chrome-Extension-green?style=flat-square&logo=googlechrome)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A real Chrome Extension that lives inside your browser toolbar. Type a URL and save it, or click **Save Tab** to capture the URL of whatever page you're currently on. All leads persist between browser sessions using `localStorage` — closing and reopening Chrome won't delete them. This is Module 4 of the Scrimba Fullstack Path, and it introduces the **four biggest new concepts** in the course so far: `localStorage`, `JSON`, template literals, and `innerHTML`.

This README is a **complete concept revision guide**. Every new concept is explained from scratch with annotated code, diagrams, comparisons, and pro tips.

---

# Table of Contents

1. [Project Structure](#1-project-structure)
2. [What is a Chrome Extension?](#2-what-is-a-chrome-extension)
3. [manifest.json — The Extension's ID Card](#3-manifestjson--the-extensions-id-card)
4. [App Layout and Behaviour](#4-app-layout-and-behaviour)
5. [Concept — localStorage](#5-concept--localstorage)
6. [Concept — JSON (stringify and parse)](#6-concept--json-stringify-and-parse)
7. [Concept — Template Literals (Backtick Strings)](#7-concept--template-literals-backtick-strings)
8. [Concept — innerHTML](#8-concept--innerhtml)
9. [The render() Function](#9-the-render-function)
10. [Saving a Manual Lead (Save Input Button)](#10-saving-a-manual-lead-save-input-button)
11. [Saving the Current Tab (Save Tab Button)](#11-saving-the-current-tab-save-tab-button)
12. [Persisting Leads on Page Load](#12-persisting-leads-on-page-load)
13. [Deleting All Leads (Delete Button)](#13-deleting-all-leads-delete-button)
14. [Complete Annotated Code](#14-complete-annotated-code)
15. [How to Install the Extension in Chrome](#15-how-to-install-the-extension-in-chrome)
16. [Key Concepts Consolidated](#16-key-concepts-consolidated)
17. [Course Reference](#17-course-reference)

---

# 1. Project Structure

```
11. Chrome Extension/
│
├── manifest.json   → Chrome's required config file — name, version, permissions
├── icon.png        → The extension icon shown in the Chrome toolbar
├── index.html      → Input field, three buttons, unordered list
├── index.css       → Compact popup styling (popup windows are small)
└── index.js        → All app logic — localStorage, render, save, delete
```

---

# 2. What is a Chrome Extension?

A Chrome Extension is a mini web app that runs inside the Chrome browser itself — not on a website, but as a persistent popup you can open from the toolbar at any time. It is built with the same HTML, CSS, and JavaScript you already know, plus access to special browser APIs like `chrome.tabs` that normal websites can't use.

```
Normal Website                   Chrome Extension
─────────────────                ─────────────────────────────
Lives on a server                Lives inside Chrome
Opened in a browser tab          Opened from the toolbar icon
Loses state on refresh           Can persist data in localStorage
No access to browser APIs        Has access to chrome.tabs, etc.
URL required to open             Always one click away
```

The fact that a Chrome Extension is just HTML + CSS + JS is what makes this project so powerful as a learning milestone — you already have all the skills needed to build real browser software.

---

# 3. manifest.json — The Extension's ID Card

Every Chrome Extension **must** have a `manifest.json` file. Without it, Chrome won't recognise the folder as an extension at all. It tells Chrome the extension's name, version, what HTML file to show as the popup, and what special permissions the extension needs.

```json
{
  "manifest_version": 3,
  "name": "Leads Tracker",
  "version": "1.0",
  "action": {
    "default_popup": "index.html",
    "default_icon": "icon.png"
  },
  "permissions": ["tabs", "storage"]
}
```

### Key Fields Explained

| Field | Purpose |
|-------|---------|
| `manifest_version` | Always `3` for modern extensions (V2 was deprecated) |
| `name` | The display name in the Chrome Extensions page |
| `version` | Your extension's version number (semver format) |
| `action.default_popup` | Which HTML file opens when the toolbar icon is clicked |
| `action.default_icon` | The icon shown in the Chrome toolbar |
| `permissions` | Special APIs the extension is allowed to use |

### Why Permissions?

Chrome follows a **least-privilege** model — extensions must explicitly declare the APIs they intend to use. Declaring `"tabs"` grants access to `chrome.tabs.query()` (to read the current tab's URL). Users can see exactly what permissions an extension has before installing it.

---

# 4. App Layout and Behaviour

```
┌──────────────────────────────────┐
│  🔗 Leads Tracker                │
│                                  │
│  ┌──────────────────┐ [SAVE]     │
│  │ https://...      │            │
│  └──────────────────┘            │
│                                  │
│  [SAVE TAB]    [DELETE ALL]      │
│                                  │
│  • https://github.com/...        │
│  • https://developer.mozilla...  │
│  • https://scrimba.com/...       │
└──────────────────────────────────┘
```

Three user actions, each wired to a separate event listener:

1. **Save Input** — type a URL into the input field, click Save — it appears in the list below
2. **Save Tab** — clicks capture the URL of the currently active browser tab automatically
3. **Delete All** — clears the list and wipes localStorage

All saved URLs are clickable links that open in a new tab.

---

# 5. Concept — localStorage

`localStorage` is a simple key-value database **built into every browser**. It lets JavaScript store string data that survives page refreshes, tab closes, and even browser restarts. It belongs to the browser, not the server — no internet connection needed.

```
Browser Memory (RAM)          localStorage (Disk)
──────────────────────        ──────────────────────────
let myLeads = [...]           myLeads → "[...]" (JSON string)
Lost on page refresh ❌        Survives forever ✅
Lost when tab closes ❌        Survives when tab closes ✅
Lost when browser closes ❌    Survives when browser closes ✅
```

### The Four localStorage Methods

```js
// WRITE — store a value under a key
localStorage.setItem("myLeads", someString)

// READ — retrieve a value by key (returns null if key doesn't exist)
localStorage.getItem("myLeads")

// DELETE ONE — remove a single key-value pair
localStorage.removeItem("myLeads")

// CLEAR ALL — wipe the entire localStorage for this origin
localStorage.clear()
```

### The Critical Limitation — Strings Only

`localStorage` can only store **strings**. You cannot store a JavaScript array directly:

```js
let myLeads = ["https://github.com", "https://scrimba.com"]

// ❌ Wrong — stores "[object Object]" not the actual array
localStorage.setItem("myLeads", myLeads)

// ✅ Correct — convert to JSON string first, then store
localStorage.setItem("myLeads", JSON.stringify(myLeads))
```

This is exactly why `JSON.stringify` and `JSON.parse` are introduced alongside `localStorage`.

---

# 6. Concept — JSON (stringify and parse)

JSON stands for **JavaScript Object Notation**. It is a text format for representing JavaScript data (arrays, objects, numbers, strings) as a plain string — which means it can be stored in localStorage, sent over a network, or saved to a file.

```
JavaScript Array                JSON String
─────────────────               ───────────────────────────────────────────
["github.com", "scrimba.com"]   '["github.com","scrimba.com"]'
```

### JSON.stringify() — JS → String

Converts any JavaScript value (array, object, number) into a JSON-formatted string:

```js
let myLeads = ["https://github.com", "https://scrimba.com"]

let jsonString = JSON.stringify(myLeads)
// → '["https://github.com","https://scrimba.com"]'

typeof jsonString  // "string"
```

### JSON.parse() — String → JS

Converts a JSON string back into a real JavaScript value:

```js
let jsonString = '["https://github.com","https://scrimba.com"]'

let myLeads = JSON.parse(jsonString)
// → ["https://github.com", "https://scrimba.com"]

typeof myLeads   // "object" (arrays are objects in JS)
myLeads[0]       // "https://github.com" ✅
```

### The Full Round Trip

```
JavaScript Array
       │
       │  JSON.stringify()
       ▼
 JSON String  ──────────────►  localStorage.setItem()
                                        │
                                        │  (browser stores this)
                                        │
                                        ▼
                               localStorage.getItem()
                                        │
                                        │  JSON.parse()
                                        ▼
                               JavaScript Array  ✅
```

### Why You Need Both

| Operation | Method | Input | Output |
|-----------|--------|-------|--------|
| Saving to localStorage | `JSON.stringify()` | JS array | JSON string |
| Reading from localStorage | `JSON.parse()` | JSON string | JS array |

You always use them as a matched pair — `stringify` before writing, `parse` after reading.

---

# 7. Concept — Template Literals (Backtick Strings)

Template literals are strings written with **backticks** (`` ` ``) instead of quotes. They allow you to embed JavaScript expressions directly inside the string using `${}` — no more clunky string concatenation.

### Concatenation (the old way)

```js
let url = "https://github.com"

let html = "<li><a href='" + url + "' target='_blank'>" + url + "</a></li>"
```

This is hard to read — the alternating `+` operators and quote characters make it easy to introduce bugs.

### Template Literals (the modern way)

```js
let url = "https://github.com"

let html = `<li><a href="${url}" target="_blank">${url}</a></li>`
```

Inside `${}` you can place **any JavaScript expression** — a variable, a function call, a calculation, a ternary:

```js
let name  = "Nilanchal"
let score = 95

// Variable
`Hello, ${name}!`                     // "Hello, Nilanchal!"

// Expression
`Score: ${score > 90 ? "A" : "B"}`   // "Score: A"

// Multi-line (backtick strings can span lines)
`<li>
   <a href="${url}">${url}</a>
</li>`
```

### Pro Tip — Template Literals in Loops

Template literals shine inside loops when building HTML strings:

```js
let listItems = ""

for (let i = 0; i < leads.length; i++) {
  listItems += `<li><a href="${leads[i]}" target="_blank">${leads[i]}</a></li>`
}
```

Each iteration appends a new `<li>` tag with the URL embedded — clean, readable, no concatenation bugs.

---

# 8. Concept — innerHTML

`innerHTML` is a DOM property that reads or sets the **raw HTML content** of an element — including actual HTML tags, not just text.

### textContent vs innerHTML

```js
let ulEl = document.getElementById("ul-el")

// textContent — treats everything as plain text, tags are rendered literally
ulEl.textContent = "<li>GitHub</li>"
// The page shows the text:  <li>GitHub</li>   ← not a list item!

// innerHTML — parses and renders the HTML tags properly
ulEl.innerHTML = "<li>GitHub</li>"
// The page shows a rendered list item:  • GitHub   ← a real clickable element
```

| Property | Sets | Renders tags? | Use when |
|----------|------|--------------|---------|
| `textContent` | Plain text | ❌ No | Displaying user-safe text |
| `innerHTML` | HTML markup | ✅ Yes | Building lists, links, dynamic UI |

### The innerHTML Pattern for Rendering Lists

```js
// Build the full HTML string first...
let listItems = ""
for (let i = 0; i < leads.length; i++) {
  listItems += `<li><a href="${leads[i]}" target="_blank">${leads[i]}</a></li>`
}

// ...then assign it all at once
ulEl.innerHTML = listItems
```

Assigning `innerHTML` once at the end (rather than appending to the DOM inside the loop) is more efficient — the browser only needs to re-render the list one time.

---

# 9. The render() Function

`render()` is the single function responsible for turning the `myLeads` array into visible HTML on the page. It uses the `for` loop + template literal + `innerHTML` pattern:

```js
function render(leads) {
  let listItems = ""

  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target="_blank" href="${leads[i]}">
          ${leads[i]}
        </a>
      </li>
    `
  }

  ulEl.innerHTML = listItems
}
```

### Why a Separate render() Function?

Every operation that changes the data (save input, save tab, delete) needs to update the display. Instead of repeating the display logic in each button's event listener, all three call `render()` — one function, one source of truth:

```
saveInputBtn.addEventListener("click", function() {
  myLeads.push(...)              // 1. update data
  localStorage.setItem(...)      // 2. persist data
  render(myLeads)                // 3. update display ← same render() every time
})

tabBtn.addEventListener("click", function() {
  myLeads.push(...)              // 1. update data
  localStorage.setItem(...)      // 2. persist data
  render(myLeads)                // 3. update display ← same render() every time
})
```

This pattern — **update data → persist data → re-render display** — is a fundamental pattern in every data-driven web app.

---

# 10. Saving a Manual Lead (Save Input Button)

```js
let inputEl  = document.getElementById("input-el")
let inputBtn = document.getElementById("input-btn")

inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value)                          // add typed URL to array
  localStorage.setItem("myLeads", JSON.stringify(myLeads))  // persist
  render(myLeads)                                      // re-render the list
  inputEl.value = ""                                   // clear the input field
})
```

### inputEl.value

`.value` is the property used to read what the user typed into an `<input>` element. This is different from `.textContent` (which reads the text of non-input elements like `<p>` or `<h1>`):

```js
// For <p>, <h1>, <span> etc.
document.getElementById("my-paragraph").textContent

// For <input>, <textarea>
document.getElementById("my-input").value
```

---

# 11. Saving the Current Tab (Save Tab Button)

This is the feature that makes this project a real Chrome Extension — the ability to grab the URL of whatever page is currently open, without the user having to type anything:

```js
let tabBtn = document.getElementById("tab-btn")

tabBtn.addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    myLeads.push(tabs[0].url)                               // grab current tab URL
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})
```

### Breaking Down chrome.tabs.query()

```
chrome.tabs.query(queryObject, callbackFunction)
     │                │                │
     │                │                └── runs when Chrome finds the tabs
     │                └── filter: { active, currentWindow } → current tab only
     └── Chrome browser API (only available in extensions)
```

`chrome.tabs.query()` is **asynchronous** — it asks Chrome for tab information, and Chrome responds by calling your callback function with a `tabs` array. `tabs[0]` is the first (and here, only) result — the currently active tab. `tabs[0].url` is that tab's URL string.

### Why a Callback? (Async Preview)

Chrome has to look up the active tab from the browser process, which takes a tiny amount of time. Rather than freezing the extension while it waits, Chrome uses a **callback** — it says "go do your thing, and when I have the result I'll call this function". This is your first glimpse of asynchronous JavaScript — formally covered in Module 5.

---

# 12. Persisting Leads on Page Load

The popup window is destroyed and recreated every time you close and reopen it. Without persistence logic, all saves would vanish the moment you close the popup. The fix runs once when the script first loads:

```js
let myLeads = []

// Check if leads exist in localStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage   // restore the array from storage
  render(myLeads)                   // immediately display the stored leads
}
```

### Why `if (leadsFromLocalStorage)`?

`localStorage.getItem("myLeads")` returns `null` if the key has never been set (first time the extension is opened). `JSON.parse(null)` also returns `null`. The `if` check guards against trying to assign `null` to `myLeads`:

```js
// Without the guard — first-time open breaks
myLeads = null         // ❌ myLeads is now null, push() will crash

// With the guard — first-time open works
if (leadsFromLocalStorage) {   // null is falsy — skipped safely
  myLeads = leadsFromLocalStorage
}
```

---

# 13. Deleting All Leads (Delete Button)

```js
let deleteBtn = document.getElementById("delete-btn")

deleteBtn.addEventListener("click", function() {
  localStorage.clear()    // wipe all localStorage for this extension
  myLeads = []            // reset the in-memory array
  render(myLeads)         // re-render — shows empty list
})
```

Two sources of truth must be cleared together — the in-memory array (`myLeads`) and localStorage. Clearing only one would cause a mismatch:

```
If you only clear localStorage (not myLeads):
  → The visual list clears, but on next click Save, old leads reappear

If you only clear myLeads (not localStorage):
  → The visual list clears, but on next page reload, old leads come back from storage
```

Both must always stay in sync.

---

# 14. Complete Annotated Code

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
    <input type="text" id="input-el" placeholder="Type lead URL here">
    <button id="input-btn">SAVE INPUT</button>
    <button id="tab-btn">SAVE TAB</button>
    <button id="delete-btn">DELETE ALL</button>
    <ul id="ul-el"></ul>
    <script src="index.js"></script>
  </body>
</html>
```

### index.js (complete)

```js
// ── DOM References ──────────────────────────────────────────────────────────
let inputEl   = document.getElementById("input-el")
let inputBtn  = document.getElementById("input-btn")
let tabBtn    = document.getElementById("tab-btn")
let deleteBtn = document.getElementById("delete-btn")
let ulEl      = document.getElementById("ul-el")

// ── State ────────────────────────────────────────────────────────────────────
let myLeads = []   // in-memory array of saved URLs

// ── Restore from localStorage on load ────────────────────────────────────────
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

// ── render() — turns array into HTML list ─────────────────────────────────────
function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `<li><a target="_blank" href="${leads[i]}">${leads[i]}</a></li>`
  }
  ulEl.innerHTML = listItems
}

// ── Save Input Button ─────────────────────────────────────────────────────────
inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value)
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  render(myLeads)
  inputEl.value = ""
})

// ── Save Tab Button ───────────────────────────────────────────────────────────
tabBtn.addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
  })
})

// ── Delete All Button ─────────────────────────────────────────────────────────
deleteBtn.addEventListener("click", function() {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})
```

---

# 15. How to Install the Extension in Chrome

This extension **cannot be opened as a normal webpage** — it must be loaded into Chrome as an actual extension:

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer Mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `11. Chrome Extension` folder
5. The Leads Tracker icon appears in your Chrome toolbar
6. Pin it by clicking the puzzle piece icon → pin

To see changes after editing code, return to `chrome://extensions/` and click the **refresh icon** on the Leads Tracker card.

---

# 16. Key Concepts Consolidated

| Concept | What it is | Used for |
|---------|-----------|---------|
| `manifest.json` | Chrome's required config file | Declares name, popup file, permissions |
| `localStorage.setItem()` | Browser key-value storage | Persisting leads between sessions |
| `localStorage.getItem()` | Read from browser storage | Restoring leads on popup open |
| `localStorage.clear()` | Wipe all storage | Delete all leads |
| `JSON.stringify()` | Convert JS array → JSON string | Before writing to localStorage |
| `JSON.parse()` | Convert JSON string → JS array | After reading from localStorage |
| Template literals (`` ` ``) | Backtick strings with `${}` | Building HTML strings in loops |
| `innerHTML` | Set raw HTML content of an element | Rendering the `<li>` list |
| `.value` | Read text typed into `<input>` | Grabbing the URL from the input field |
| `chrome.tabs.query()` | Chrome API to get current tab | Save Tab button |
| `render()` function | Centralised display updater | Called after every data change |
| Update → Persist → Render | The three-step data change pattern | Core app flow for all three buttons |

### The Data Flow Diagram

```
User Action (click button)
         │
         ▼
  Update myLeads array  ──── push() or reset []
         │
         ▼
  Persist to localStorage  ── JSON.stringify() → setItem()
         │
         ▼
  Re-render the UI  ───────── render(myLeads) → template literal loop → innerHTML
```

This exact pattern — **state → storage → UI** — is the same loop used in React, Vue, and every modern frontend framework. You learned it here first with vanilla JavaScript.

---

# 17. Course Reference

* **Platform:** [Scrimba Fullstack Path](https://scrimba.com/fullstack-path-c0fullstack)
* **Section:** Module 4 — Essential JavaScript Concepts (Leads Tracker Chrome Extension)

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *The Leads Tracker is the most architecturally complete project so far — it is the first app with true persistence, three independent user actions, a centralised render function, and a real browser deployment via `manifest.json`. The state → storage → UI loop introduced here is the backbone of every data-driven frontend app ever built.*
