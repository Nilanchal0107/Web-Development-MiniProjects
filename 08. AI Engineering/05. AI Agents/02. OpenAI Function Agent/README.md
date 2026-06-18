# OpenAI Function Agent — AI Agents

![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Chat%20UI-blue?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-yellow?style=flat-square&logo=javascript)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4--1106--preview-412991?style=flat-square&logo=openai)
![Function Calling](https://img.shields.io/badge/OpenAI-Function%20Calling-blueviolet?style=flat-square)
![REST API](https://img.shields.io/badge/APIs-OpenWeatherMap%20%7C%20ipapi.co-teal?style=flat-square)
![ES Modules](https://img.shields.io/badge/ES%20Modules-type%3D%22module%22-lightgrey?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A fully interactive AI chatbot with a UI that uses **OpenAI's native Function Calling API** to autonomously fetch real weather and location data — the **OpenAI Function Agent** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every concept introduced in this project, comparing what is new against the ReAct Agent (01) covered in the previous folder — specifically the shift from manual regex-based action parsing to OpenAI's native tool-use protocol.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs ReAct Agent](#3-whats-new-vs-react-agent)
4. [OpenAI Function Calling API](#4-openai-function-calling-api)
   - [The `functions` Schema Array](#41-the-functions-schema-array)
   - [`runFunctions()` — The Beta Runner](#42-runfunctions--the-beta-runner)
   - [`finalContent()` vs Manual Message Parsing](#43-finalcontent-vs-manual-message-parsing)
   - [The `.on("message", cb)` Event](#44-the-onmessage-cb-event)
5. [Tool Functions — Real APIs](#5-tool-functions--real-apis)
   - [`getCurrentWeather` — OpenWeatherMap](#51-getcurrentweather--openweathermap)
   - [`getLocation` — IP Geolocation via ipapi.co](#52-getlocation--ip-geolocation-via-iapico)
   - [`URL` Constructor + `searchParams`](#53-url-constructor--searchparams)
6. [DOM Layer — dom.js](#6-dom-layer--domjs)
   - [`renderNewMessage()`](#61-rendernewmessage)
   - [`requestAnimationFrame` for Smooth Scroll](#62-requestanimationframe-for-smooth-scroll)
7. [Chat UI — HTML and CSS](#7-chat-ui--html-and-css)
   - [Form Submission and `FormData`](#71-form-submission-and-formdata)
   - [Chat Bubble Styling](#72-chat-bubble-styling)
   - [CSS Triangle Tails with `::before`](#73-css-triangle-tails-with-before)
8. [How the Full App Flow Works](#8-how-the-full-app-flow-works)
9. [HTML Structure Recap](#9-html-structure-recap)
10. [How to Run](#10-how-to-run)
11. [Course Reference](#11-course-reference)

---

# 1. Project Overview

**OpenAI Function Agent** is a browser-based AI chatbot that looks and behaves like a chat application. It uses **GPT-4** with OpenAI's native function-calling capability to answer questions about the user's location and weather — fetching real data from live APIs rather than hardcoded mock values.

The app includes:

* A **chat conversation panel** that displays alternating user messages (right-aligned, blue) and AI responses (left-aligned, dark grey) with CSS triangle speech-bubble tails
* A **form input bar** at the bottom with a text field and a send button — submitting the form triggers the agent
* An **agent function** that uses `openai.beta.chat.completions.runFunctions()` — OpenAI's helper that automatically executes JavaScript functions when the model requests them
* Two **real tool functions** backed by live APIs: `getCurrentWeather` calls OpenWeatherMap via the Scrimba proxy, and `getLocation` calls `ipapi.co` to determine the user's city from their IP address
* A **function schema array** (`functions` export in `tools.js`) that describes each tool in JSON Schema format so the model knows what arguments to pass
* A **DOM module** (`dom.js`) that creates and appends `<article>` elements for each new message and auto-scrolls to the bottom using `requestAnimationFrame`

The goal of this module is not just to build a chat UI — it is to understand how OpenAI's native function calling replaces the fragile regex-based action parsing from the ReAct agent with a structured, type-safe protocol where the model returns JSON argument objects instead of formatted strings.

---

# 2. Project Structure

```
08. AI Engineering/
│
└── 05. AI Agents/
    └── 02. OpenAI Function Agent/
        ├── index.html    → Chat UI shell: conversation section + form input
        ├── index.css     → Chat bubble styles, layout, send button, scroll
        ├── index.js      → Agent logic: runFunctions(), form listener, message history
        ├── tools.js      → Real API tools + JSON Schema functions array
        ├── dom.js        → renderNewMessage(), scrollToBottom() via requestAnimationFrame
        └── images/
            └── send-btn-icon.png  → Send button arrow icon
```

---

# 3. What's New vs ReAct Agent

## Approach Comparison

| Feature | ReAct Agent (01) | OpenAI Function Agent (02) |
|---------|-----------------|--------------------------|
| How model "calls" a tool | Formats text: `Action: fnName: arg` | Returns structured JSON: `{ name: "fn", arguments: { key: val } }` |
| How code detects tool calls | Regex on raw response text | OpenAI SDK parses the response automatically |
| Tool execution | `availableFunctions[action](actionArg)` | `runFunctions()` calls the function automatically |
| Tool argument format | Single string | Typed JSON object matching the schema |
| Model | GPT-3.5-Turbo | GPT-4-1106-preview (better at function calling) |
| Tool data | Mocked (hardcoded) | Real APIs (OpenWeatherMap, ipapi.co) |
| UI | Console output only | Full browser chat interface |
| Message persistence | New `messages` array per call | Persistent `messages` array across turns |

## New JavaScript Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `openai.beta.chat.completions.runFunctions()` | `index.js` line 33 | Beta SDK helper: detects tool calls, runs functions, continues the loop automatically |
| `functions` schema array | `tools.js` lines 24–46 | JSON Schema descriptions of each tool — the model reads these to know what arguments to pass |
| `runner.finalContent()` | `index.js` line 39 | Awaits and returns the model's final text response after all tool calls complete |
| `.on("message", cb)` event | `index.js` line 37 | Fires for every message exchanged (including tool calls) — useful for debugging |
| `new URL(string)` + `.searchParams.append()` | `tools.js` lines 3–5 | Constructs a URL object and appends query parameters without manual string concatenation |
| `requestAnimationFrame(cb)` | `dom.js` line 13 | Schedules DOM work on the next paint frame — ensures the new message is rendered before scrolling |
| `document.createElement()` + `.classList.add()` | `dom.js` | Creates message `<article>` elements programmatically and assigns role-based CSS classes |
| `sanitize-html` (implicit via real API data) | `tools.js` | Raw API data is passed to the model as JSON strings — no DOM injection risk |
| Persistent `messages` array (module-level) | `index.js` line 15 | Declared outside the `agent()` function so conversation history persists across form submissions |

---

# 4. OpenAI Function Calling API

## 4.1 The `functions` Schema Array

```javascript
// tools.js
export const functions = [
    {
        function: getCurrentWeather,
        parse: JSON.parse,
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The name of the city from where to get the weather"
                }
            },
            required: ["location"]
        }
    },
    {
        function: getLocation,
        parameters: {
            type: "object",
            properties: {}
        }
    },
]
```

Each entry in the `functions` array is a **tool descriptor** — an object that connects a JavaScript function to a JSON Schema description of its parameters:

| Field | Type | Purpose |
|-------|------|---------|
| `function` | JS function reference | The actual function to call when the model requests this tool |
| `parse` | Function (optional) | Parses the model's JSON argument string before passing to the function — `JSON.parse` converts `'{"location":"London"}'` to `{ location: "London" }` |
| `parameters` | JSON Schema object | Describes the shape of arguments — the model reads this and generates matching JSON |
| `parameters.required` | string[] | Fields the model must always include in its argument object |

> Describing tools in JSON Schema (rather than natural language like the ReAct system prompt) gives the model precise, structured guidance. The model returns argument JSON that is guaranteed to match the schema — eliminating the format errors that regex parsing is vulnerable to.

## 4.2 `runFunctions()` — The Beta Runner

```javascript
const runner = openai.beta.chat.completions.runFunctions({
    model: "gpt-4-1106-preview",
    messages,
    functions
}).on("message", (message) => console.log(message))
```

`openai.beta.chat.completions.runFunctions()` is a **convenience helper** in the OpenAI Node.js SDK that replaces the entire manual agent loop from the ReAct agent. It:

1. Sends the initial `messages` + `functions` to the API
2. If the model responds with a `tool_calls` request, automatically calls the matching JavaScript function with the parsed JSON arguments
3. Appends the function result to the conversation as a `role: "tool"` message
4. Calls the API again with the updated history
5. Repeats until the model produces a plain text response (no more tool calls)
6. Returns a `runner` object representing the ongoing async operation

The entire ReAct agent loop — the `for` loop, the regex parser, the dispatch map, the observation injection — is replaced by this single SDK call.

## 4.3 `finalContent()` vs Manual Message Parsing

```javascript
const finalContent = await runner.finalContent()
messages.push({ role: "system", content: finalContent })
renderNewMessage(finalContent, "assistant")
```

`runner.finalContent()` returns a Promise that resolves to the model's final text response — the last message in the chain after all tool calls are complete. In the ReAct agent, finding the final answer required checking whether the model's response contained `Answer:` — here, `finalContent()` handles that detection automatically.

| Method | Returns |
|--------|---------|
| `runner.finalContent()` | The last plain-text assistant message (all tool calls resolved) |
| `runner.finalMessage()` | The full message object `{ role, content }` |
| `runner.allChatCompletions()` | Array of all API responses in the chain |

## 4.4 The `.on("message", cb)` Event

```javascript
.on("message", (message) => console.log(message))
```

The `runner` object is an event emitter. `.on("message", cb)` fires for every message added to the conversation during the `runFunctions` loop — including intermediate tool call requests and tool responses. This is useful for debugging: you can see exactly what the model requested and what the tool returned at each step.

---

# 5. Tool Functions — Real APIs

## 5.1 `getCurrentWeather` — OpenWeatherMap

```javascript
export async function getCurrentWeather({ location }) {
    try {
        const weatherUrl = new URL("https://apis.scrimba.com/openweathermap/data/2.5/weather")
        weatherUrl.searchParams.append("q", location)
        weatherUrl.searchParams.append("units", "imperial")
        const res = await fetch(weatherUrl)
        const data = await res.json()
        return JSON.stringify(data)
    } catch(err) {
        console.error(err.message)
    }
}
```

Unlike the ReAct agent where `getCurrentWeather` was mocked, this function makes a **real API call** to OpenWeatherMap via the Scrimba proxy. The function receives a **destructured object** `{ location }` — the `parse: JSON.parse` field in the schema descriptor converts the model's JSON argument string to an object before passing it in.

| Query parameter | Value | Effect |
|----------------|-------|--------|
| `q` | City name string from model | Selects the city for weather lookup |
| `units` | `"imperial"` | Returns temperature in °F |

## 5.2 `getLocation` — IP Geolocation via ipapi.co

```javascript
export async function getLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/')
        const text = await response.json()
        return JSON.stringify(text)
    } catch (err) {
        console.error(err.message)
    }
}
```

`ipapi.co` is a free IP geolocation service. `GET https://ipapi.co/json/` returns a JSON object containing the caller's approximate location based on their IP address — including `city`, `region`, `country_name`, `latitude`, `longitude`, and more. No API key is required for low-volume usage.

The full response object is returned as a JSON string so the model can extract whichever fields are relevant to the user's query (city, country, timezone, etc.).

## 5.3 `URL` Constructor + `searchParams`

```javascript
const weatherUrl = new URL("https://apis.scrimba.com/openweathermap/data/2.5/weather")
weatherUrl.searchParams.append("q", location)
weatherUrl.searchParams.append("units", "imperial")
```

`new URL(string)` creates a **URL object** from a base URL string. Its `.searchParams` property is a `URLSearchParams` object — a structured way to build query strings without manual string concatenation.

| Method | Equivalent string | Effect |
|--------|------------------|--------|
| `.searchParams.append("q", "London")` | `?q=London` | Appends a query parameter |
| `.searchParams.set("units", "imperial")` | `&units=imperial` | Sets or overwrites a parameter |
| `weatherUrl.toString()` | Full URL string | Serialises the URL for `fetch()` |

> `fetch(weatherUrl)` accepts a `URL` object directly — no need to call `.toString()`. Compare to the ReAct agent's raw template-literal URL strings — the `URL` + `searchParams` approach handles special characters and encoding automatically.

---

# 6. DOM Layer — dom.js

## 6.1 `renderNewMessage()`

```javascript
// dom.js
export function renderNewMessage(text, role) {
    const conversationContainer = document.getElementById("conversation")
    const newArticle = document.createElement("article")
    newArticle.classList.add(role === "assistant" ? "ai-message" : "user-message")
    const newParagraph = document.createElement("p")
    newParagraph.textContent = text
    newArticle.append(newParagraph)
    conversationContainer.append(newArticle)
    scrollToBottom()
}
```

`renderNewMessage` creates a new `<article>` element for each chat message and appends it to `#conversation`. The `role` parameter determines which CSS class is applied:

| `role` | CSS class | Visual style |
|--------|-----------|-------------|
| `"user"` | `user-message` | Right-aligned, blue background (`#075985`) |
| `"assistant"` | `ai-message` | Left-aligned, dark grey background (`#4B5563`) |

`textContent` is used (not `innerHTML`) — this prevents XSS injection if the model ever returns text containing HTML tags.

## 6.2 `requestAnimationFrame` for Smooth Scroll

```javascript
function scrollToBottom() {
    requestAnimationFrame(() => {
        document.body.scrollIntoView({ behavior: "smooth", block: "end" })
    })
}
```

`requestAnimationFrame(callback)` schedules `callback` to run just before the browser's next repaint. Wrapping the scroll in `requestAnimationFrame` ensures the new `<article>` element is in the DOM and laid out before the scroll position is calculated — without it, `scrollIntoView` might scroll to the position before the new element is rendered.

`document.body.scrollIntoView({ block: "end" })` scrolls the page so the bottom of `<body>` is visible — effectively scrolling to the newest message.

| `block` value | Aligns | Effect |
|--------------|--------|--------|
| `"start"` | Top of element | Scrolls to top of body |
| `"end"` | Bottom of element | Scrolls to bottom — newest message visible |
| `"center"` | Middle of element | Centers body in viewport |

---

# 7. Chat UI — HTML and CSS

## 7.1 Form Submission and `FormData`

```javascript
// index.js
document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault()
    const inputElement = document.getElementById("user-input")
    inputElement.focus()
    const formData = new FormData(event.target)
    const query = formData.get("user-input")
    event.target.reset()
    await agent(query)
})
```

`event.preventDefault()` stops the default browser form submission (which would reload the page). `new FormData(event.target)` collects all named form fields — `.get("user-input")` retrieves the value of the `<input name="user-input">` field. `event.target.reset()` clears the form immediately after reading the value — the input is cleared before the agent responds, giving a responsive feel.

`inputElement.focus()` returns focus to the input after submission so the user can type their next message immediately without clicking.

## 7.2 Chat Bubble Styling

```css
article.user-message, article.ai-message {
    position: relative;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    max-width: 70%;
}

article.user-message {
    background-color: #075985;   /* Dark blue */
    color: white;
    align-self: flex-end;        /* Right-aligned in flex column */
}

article.ai-message {
    background-color: #4B5563;   /* Dark grey */
    color: white;
    align-self: flex-start;      /* Left-aligned in flex column */
}
```

The conversation container is a `flex-direction: column` flex container. `align-self: flex-end` on user messages and `align-self: flex-start` on AI messages creates the classic chat bubble layout where user messages appear on the right and AI messages on the left.

`max-width: 70%` prevents bubbles from spanning the full container width — giving breathing room on the opposite side, reinforcing the visual separation between the two participants.

## 7.3 CSS Triangle Tails with `::before`

```css
article.user-message::before {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 0px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #075985 transparent transparent;
}

article.ai-message::before {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent transparent #4B5563;
}
```

The speech-bubble **triangle tail** is created using the CSS border trick. A zero-size element (`content: ''`) with `border-width: 10px` on all sides creates four triangles — one per side. Setting three of the four borders to `transparent` reveals only one triangle.

| `border-color` order | Sides |
|--------------------|-------|
| `transparent` | top |
| `#075985` | right ← this is the visible triangle for user messages |
| `transparent` | bottom |
| `transparent` | left |

`position: absolute` removes the pseudo-element from the document flow. `bottom: -10px` places it just below the bubble, creating the appearance of a tail pointing downward.

---

# 8. How the Full App Flow Works

```
User types message → clicks Send (or presses Enter)
    │
    ├── Form submit event fires
    │   ├── event.preventDefault() → no page reload
    │   ├── FormData extracts query string
    │   ├── event.target.reset() → clears input field
    │   └── await agent(query)
    │
    └── agent(query)
        ├── messages.push({ role: "user", content: query })
        ├── renderNewMessage(query, "user") → user bubble appears on right
        │
        ├── openai.beta.chat.completions.runFunctions({ model, messages, functions })
        │   │
        │   ├── API CALL 1: GPT-4 decides it needs location
        │   │   └── Returns tool_call: { name: "getLocation", arguments: "{}" }
        │   │       └── SDK auto-calls getLocation() → "{ city: 'London', country: 'GB', ... }"
        │   │           └── Appended as role: "tool" message
        │   │
        │   └── API CALL 2: GPT-4 decides it needs weather
        │       └── Returns tool_call: { name: "getCurrentWeather", arguments: '{"location":"London"}' }
        │           └── SDK auto-calls getCurrentWeather({ location: "London" })
        │               └── fetch() → OpenWeatherMap API → JSON response
        │               └── Appended as role: "tool" message
        │
        ├── API CALL 3: GPT-4 generates final answer
        │   └── Plain text: "It's currently 18°C and cloudy in London..."
        │
        ├── finalContent = await runner.finalContent()  ← "It's currently 18°C..."
        ├── messages.push({ role: "system", content: finalContent })
        └── renderNewMessage(finalContent, "assistant") → AI bubble appears on left
```

---

# 9. HTML Structure Recap

```
<!doctype html>
<html>
├── <head>
│   ├── <meta name="viewport">              ← Responsive scaling on mobile
│   ├── <link rel="preconnect" fonts.googleapis.com>
│   ├── <link rel="preconnect" fonts.gstatic.com crossorigin>
│   ├── <link href="...Inter...">           ← Inter font (400 + 700)
│   └── <link rel="stylesheet" href="index.css">
│
└── <body>
    └── <main>
        ├── <section id="conversation" class="conversation-container">
        │   │   ← flex-direction: column, overflow-y: scroll, flex-grow: 1
        │   └── <article class="ai-message">   ← Initial greeting bubble
        │       └── <p>Hi there! How may I help you?</p>
        │
        ├── <form id="form" class="chatbot-input-container">
        │   │   ← display: flex — input + button side by side
        │   ├── <input type="text" name="user-input" id="user-input" required>
        │   └── <button id="submit-btn" class="submit-btn">
        │       └── <img src="images/send-btn-icon.png" class="send-btn-icon">
        │
        └── <script type="module" src="index.js">
                ← ES Module: enables import/export
                ← index.js imports from tools.js and dom.js
```

---

# 10. How to Run

This project uses the OpenAI SDK and ES Module imports — a bundler or dev server is required.

1. Install dependencies: `npm install` (if a `package.json` is present) or install manually: `npm install openai`
2. Set your OpenAI API key as an environment variable: `OPENAI_API_KEY=sk-...`
3. Start a dev server (e.g. Vite): `npx vite` or `npx serve`
4. Open the browser and interact with the chatbot via the input form

> The project uses `dangerouslyAllowBrowser: true` in the OpenAI client — this is acceptable in a learning environment but should never be used in production (it exposes your API key in client-side code). In production, move the OpenAI calls to a secure backend.

---

# 11. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 08. AI Engineering — Section 05: AI Agents
* **Project:** 02. OpenAI Function Agent
