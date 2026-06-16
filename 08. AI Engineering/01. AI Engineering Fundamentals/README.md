# Gift Genie — AI Engineering Fundamentals
![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=nodedotjs)
![OpenAI](https://img.shields.io/badge/OpenAI-SDK-412991?style=flat-square&logo=openai)
![fetch](https://img.shields.io/badge/fetch-Promise--based-blueviolet?style=flat-square)
![Marked](https://img.shields.io/badge/Marked-Markdown%20Parser-lightgrey?style=flat-square)
![DOMPurify](https://img.shields.io/badge/DOMPurify-XSS%20Safe-red?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A fullstack AI-powered gift suggestion web app — the **AI Engineering Fundamentals** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every AI engineering concept introduced in this module — fullstack architecture, the OpenAI SDK, system prompts, the messages array, server-side API calls, Markdown rendering, and XSS sanitisation — comparing what is new here against the async JavaScript and APIs work covered in earlier folders.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is "AI Engineering"?](#3-what-is-ai-engineering)
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [The Fullstack Architecture — Frontend + Backend](#5-the-fullstack-architecture--frontend--backend)
   - [Why move AI calls to the server?](#51-why-move-ai-calls-to-the-server)
   - [The request flow end-to-end](#52-the-request-flow-end-to-end)
6. [The Express.js Backend](#6-the-expressjs-backend)
   - [Setting up Express](#61-setting-up-express)
   - [Environment variables](#62-environment-variables)
   - [The `/api/gift` endpoint](#63-the-apigift-endpoint)
   - [Error handling with try/catch](#64-error-handling-with-trycatch)
7. [The OpenAI SDK](#7-the-openai-sdk)
   - [Initialising the client](#71-initialising-the-client)
   - [chat.completions.create()](#72-chatcompletionscreate)
   - [The response object](#73-the-response-object)
8. [The Messages Array — Conversational Memory](#8-the-messages-array--conversational-memory)
   - [Message roles](#81-message-roles)
   - [The system prompt](#82-the-system-prompt)
   - [Appending user messages](#83-appending-user-messages)
9. [Prompt Engineering](#9-prompt-engineering)
   - [What is a system prompt?](#91-what-is-a-system-prompt)
   - [Structured output instructions](#92-structured-output-instructions)
   - [Context-aware adaptation](#93-context-aware-adaptation)
10. [The Frontend — `index.js`](#10-the-frontend--indexjs)
    - [Sending a POST request with fetch](#101-sending-a-post-request-with-fetch)
    - [Handling the JSON response](#102-handling-the-json-response)
    - [try / catch / finally](#103-try--catch--finally)
11. [Rendering Markdown Safely](#11-rendering-markdown-safely)
    - [Why Markdown?](#111-why-markdown)
    - [marked.parse()](#112-markedparse)
    - [DOMPurify.sanitize() — XSS Prevention](#113-dompurifysanitize--xss-prevention)
12. [CSS Design System — Custom Properties](#12-css-design-system--custom-properties)
    - [CSS custom properties (variables)](#121-css-custom-properties-variables)
    - [LCH colour space](#122-lch-colour-space)
    - [CSS animations — @keyframes](#123-css-animations--keyframes)
    - [clamp() — fluid typography](#124-clamp--fluid-typography)
    - [Lamp button states](#125-lamp-button-states)
13. [The `utils.js` Module — Shared Utilities](#13-the-utilsjs-module--shared-utilities)
    - [autoResizeTextarea](#131-autoresizetextarea)
    - [setLoading — UI state management](#132-setloading--ui-state-management)
    - [checkEnvironment](#133-checkenvironment)
14. [How the Full App Flow Works](#14-how-the-full-app-flow-works)
15. [HTML Structure Recap](#15-html-structure-recap)
16. [How to Run](#16-how-to-run)
17. [Course Reference](#17-course-reference)

---

# 1. Project Overview

**Gift Genie** is a fullstack AI-powered web application that generates personalised, thoughtful gift ideas. The user describes the recipient — their interests, your budget, location, and any constraints — in a free-form textarea, then clicks "Rub the Lamp." The server sends the prompt to a large language model (LLM), receives structured Markdown suggestions, and streams them back to the page. The app includes:

* A **header** with an animated SVG genie icon and the "Gift Genie" title
* An **auto-resizing textarea** where the user describes their gift-giving situation
* A **lamp button** with three distinct states: idle, loading (with a "rubbing" CSS animation), and compact (after results appear)
* An **output section** that fades in when AI suggestions arrive, rendered as styled Markdown HTML
* A **Node.js + Express backend** that proxies all AI calls, keeping API keys securely on the server
* A **`utils.js` module** exporting shared UI helpers imported by the frontend

The real goal of this module is not just to call an AI API — it is to understand the **fullstack architecture** that makes AI-powered apps production-ready: server-side API key security, the OpenAI SDK, the messages array, system prompts, structured Markdown output, and safe HTML rendering.

---

# 2. Project Structure

```
08. AI Engineering/
│
└── 01. AI Engineering Fundamentals/
    ├── index.html      → Single-page app shell: header, form, textarea, lamp button, output section
    ├── style.css       → Full design system: CSS custom properties, LCH colours, animations, responsive
    ├── index.js        → Frontend module: form handler, fetch to /api/gift, Markdown render
    ├── utils.js        → Shared utility exports: autoResizeTextarea, setLoading, checkEnvironment
    ├── server.js       → Express backend: /api/gift endpoint, OpenAI SDK, messages array, system prompt
    ├── challenge.md    → Step-by-step challenge instructions for wiring frontend to backend
    ├── assets/
    │   ├── genie.svg   → Animated SVG genie icon (header)
    │   └── lamp.svg    → Magic lamp SVG (submit button icon, animates on loading)
    └── hints/
        └── ...         → Hint files for each challenge step
```

> **Note:** This project requires Node.js. Unlike previous projects where everything ran directly in the browser, this project has a **server process** (`server.js`) that must be running before the frontend can work.

---

# 3. What is "AI Engineering"?

**AI Engineering** is the practice of building software products that integrate large language models (LLMs) — AI systems capable of understanding and generating human-quality text — into real applications. It is distinct from AI *research* (training models) and from standard web development (building UIs and APIs). AI engineers work at the intersection of both.

| Layer | What it covers |
|-------|---------------|
| **Prompt Engineering** | Writing system prompts and user messages that reliably produce the output you want |
| **API Integration** | Calling LLM providers (OpenAI, Anthropic, Mistral, etc.) via their SDKs |
| **Backend Architecture** | Running AI calls on a server to protect API keys and control costs |
| **Output Handling** | Parsing, validating, and safely rendering AI-generated content |
| **Context Management** | Building and maintaining the `messages` array across a conversation |
| **Error Handling** | Gracefully recovering from network failures, rate limits, and invalid responses |

> This module uses the **OpenAI-compatible API format** — the same SDK and message structure works with OpenAI, Groq, Together AI, and many other providers. Understanding this format gives you a skill that transfers across the entire AI provider ecosystem.

---

# 4. What's New vs Previous Projects

This project introduces concepts **not seen in any previous module**, including a server runtime, the OpenAI SDK, and safe AI output rendering.

## New Backend Concepts

| Concept | Where Used | Purpose |
|---------|------------|---------|
| `import express from 'express'` | `server.js` top | Imports the Express.js web framework |
| `express()` | `server.js` | Creates the Express application instance |
| `app.use(express.json())` | `server.js` | Parses incoming JSON request bodies automatically |
| `app.post('/api/gift', ...)` | `server.js` | Registers a POST route handler for AI requests |
| `req.body` | `server.js` | Accesses the parsed JSON body of the incoming request |
| `res.json()` | `server.js` | Sends a JSON response back to the client |
| `res.status(500).json()` | `server.js` | Sends an error response with an HTTP status code |
| `app.listen(PORT, ...)` | `server.js` | Starts the HTTP server on the specified port |
| `process.env.AI_KEY` | `server.js` | Reads environment variables (API key, model, URL) |
| `import OpenAI from 'openai'` | `server.js` | Imports the OpenAI SDK |
| `new OpenAI({ apiKey, baseURL })` | `server.js` | Initialises the AI client with provider credentials |
| `openai.chat.completions.create()` | `server.js` | Sends a chat completion request to the LLM |
| `response.choices[0].message.content` | `server.js` | Extracts the AI's text response from the SDK response object |
| `messages` array with `role` + `content` | `server.js` | The conversational memory structure passed to the LLM |
| System prompt (`role: 'system'`) | `server.js` | Gives the model its persona, output format, and rules |

## New Frontend Concepts

| Concept | Where Used | Purpose |
|---------|------------|---------|
| `fetch` with `method: 'POST'` | `index.js` | Sends a POST request to the local Express server |
| `headers: { 'Content-Type': 'application/json' }` | `index.js` | Tells the server the body is JSON |
| `JSON.stringify()` in `body` | `index.js` | Serialises the JS object to a JSON string for the request body |
| `response.json()` | `index.js` | Parses the JSON response body into a JS object |
| `response.ok` | `index.js` | Checks if the HTTP status code is in the 2xx success range |
| `try / catch / finally` | `index.js` | Handles async errors and always cleans up loading state |
| `import { marked } from 'marked'` | `index.js` | Imports the Markdown-to-HTML parser library |
| `import DOMPurify from 'dompurify'` | `index.js` | Imports the XSS sanitiser library |
| `marked.parse(markdownString)` | `index.js` | Converts a Markdown string into an HTML string |
| `DOMPurify.sanitize(htmlString)` | `index.js` | Removes any malicious scripts from AI-generated HTML |
| `outputContent.innerHTML = safeHTML` | `index.js` | Renders the sanitised HTML into the DOM |

## New CSS Concepts

| Concept | Where Used | Purpose |
|---------|------------|---------|
| `--custom-property: value` | `:root` block | CSS custom properties (variables) for the design system |
| `var(--property-name)` | Throughout `style.css` | References a CSS custom property value |
| `lch()` colour function | `:root` | LCH perceptual colour space — more predictable than hex |
| `clamp(min, preferred, max)` | `h1` | Fluid font size that scales between a min and max |
| `@keyframes rubLamp` | `.lamp-btn.loading` | Wobble animation when the lamp button is in loading state |
| `@keyframes fadeInDown` | `.app-header` | Page-load entrance animation for the header |
| `filter: drop-shadow()` | `.lamp-icon-img` | Glow effect on SVG images (unlike `box-shadow`, works on non-rectangular shapes) |
| `transition` with `cubic-bezier` | Multiple elements | Custom easing functions for premium feel |
| `-webkit-tap-highlight-color: transparent` | `.lamp-btn` | Removes the blue tap flash on iOS Safari |
| `resize: none` | `textarea` | Disables the browser's built-in textarea resize handle |
| `overflow-x: hidden` | `body` | Prevents horizontal scroll during animations |

## New JavaScript Patterns

| Concept | Where Used | Purpose |
|---------|------------|---------|
| `export function` | `utils.js` | Named exports shared across modules |
| `import { fn } from './utils.js'` | `index.js` | Importing utilities from a local module |
| `userInput.value.trim()` | `index.js` | Gets and trims the textarea value; guards against empty submission |
| `if (!userPrompt) return` | `index.js` | Early exit guard — prevents sending empty requests |
| `textarea.style.height = 'auto'` then `scrollHeight` | `utils.js` | Two-step pattern to auto-grow a textarea |
| `element.classList.add/remove()` multiple classes | `utils.js` | Toggling multiple UI state classes simultaneously |
| `element.disabled = true/false` | `utils.js` | Preventing double-submissions during loading |

---

# 5. The Fullstack Architecture — Frontend + Backend

## 5.1 Why Move AI Calls to the Server?

Previous projects in this course called external APIs directly from the browser using `fetch()`. That pattern is fine for **public APIs** that don't require authentication. AI APIs are different — they require an **API key**, and that key must never be exposed to the browser.

```
❌ Bad — API key visible in browser DevTools Network tab
┌─────────────────────────────────────────────┐
│  Browser (index.js)                         │
│  fetch('https://api.openai.com/...', {      │
│    headers: { Authorization: 'Bearer sk-...' } ← KEY EXPOSED
│  })                                          │
└─────────────────────────────────────────────┘

✅ Good — API key lives only on the server
┌──────────────────┐       ┌──────────────────────────┐       ┌────────────┐
│  Browser         │ POST  │  Express Server           │ POST  │  AI API    │
│  (index.js)      │──────►│  (server.js)              │──────►│  (OpenAI)  │
│                  │◄──────│  API key: process.env.KEY │◄──────│            │
│  /api/gift       │  JSON │  NEVER sent to browser    │  JSON │            │
└──────────────────┘       └──────────────────────────┘       └────────────┘
```

The browser never sees the API key. It only talks to **your own server** at `/api/gift`.

## 5.2 The Request Flow End-to-End

```
1. User types in textarea
        ↓
2. User clicks "Rub the Lamp" → form 'submit' event fires
        ↓
3. index.js: e.preventDefault() → grab userPrompt → setLoading(true)
        ↓
4. index.js: fetch('/api/gift', { method: 'POST', body: JSON.stringify({ userPrompt }) })
        ↓
5. server.js: app.post('/api/gift') receives the request
        ↓
6. server.js: messages.push({ role: 'user', content: userPrompt })
        ↓
7. server.js: openai.chat.completions.create({ model, messages })  ← AI call
        ↓
8. AI API: returns response.choices[0].message.content (Markdown string)
        ↓
9. server.js: res.json({ giftSuggestions })
        ↓
10. index.js: const { giftSuggestions } = await response.json()
        ↓
11. index.js: marked.parse(giftSuggestions) → DOMPurify.sanitize() → innerHTML
        ↓
12. setLoading(false) → output fades in → lamp shrinks to compact state
```

---

# 6. The Express.js Backend

## 6.1 Setting Up Express

```javascript
import express from "express";

const app = express();
app.use(express.json());
```

`express()` creates the application. `app.use(express.json())` is **middleware** — it runs on every incoming request before your route handlers. It parses the raw request body as JSON and makes it available as `req.body`.

> Without `app.use(express.json())`, `req.body` would be `undefined` even if the client sends JSON. This is the most common beginner mistake with Express.

## 6.2 Environment Variables

```javascript
const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});
```

`process.env` is a Node.js global object that holds all **environment variables** — key-value pairs set outside the code, either in a `.env` file (local development) or in the deployment platform's settings (production).

| Variable | Purpose |
|----------|---------|
| `AI_KEY` | Your API key for the AI provider — never hardcoded |
| `AI_URL` | The provider's base URL (e.g., `https://api.openai.com/v1`) |
| `AI_MODEL` | Which model to use (e.g., `gpt-4o-mini`, `llama-3.1-70b-versatile`) |
| `PORT` | The port the server listens on — defaults to `3001` |

> Never commit API keys to Git. Put them in a `.env` file and add `.env` to your `.gitignore`. Libraries like `dotenv` load `.env` files into `process.env` automatically.

## 6.3 The `/api/gift` Endpoint

```javascript
app.post("/api/gift", async (req, res) => {
  const { userPrompt } = req.body;

  messages.push({
    role: "user",
    content: userPrompt,
  });

  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages,
    });

    const giftSuggestions = response.choices[0].message.content;
    res.json({ giftSuggestions });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something went wrong on the server" });
  }
});
```

`app.post(path, handler)` registers a route that responds only to **HTTP POST** requests at that path. The handler is `async` because it awaits the AI API call, which takes several hundred milliseconds.

## 6.4 Error Handling with `try/catch`

```javascript
try {
  // code that might fail (AI API call)
} catch (e) {
  res.status(500).json({ message: "..." });
}
```

Network requests to external APIs can fail for many reasons: invalid API key, rate limit exceeded, model unavailable, network timeout. Wrapping the AI call in `try/catch` ensures the server always sends a response — even if it is an error response — rather than hanging the client's `fetch` promise indefinitely.

| HTTP Status | Meaning |
|-------------|---------|
| `200` | OK — `res.json()` sends this by default |
| `400` | Bad Request — client sent invalid data |
| `500` | Internal Server Error — something failed on the server |

---

# 7. The OpenAI SDK

## 7.1 Initialising the Client

```javascript
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});
```

The `openai` npm package is the official JavaScript SDK for the OpenAI API. It handles authentication, request serialisation, and response parsing. The `baseURL` option makes the SDK **provider-agnostic** — the same code works with any OpenAI-compatible API by changing the URL and key.

| Provider | `baseURL` value |
|----------|----------------|
| OpenAI | `https://api.openai.com/v1` |
| Groq | `https://api.groq.com/openai/v1` |
| Together AI | `https://api.together.xyz/v1` |
| Scrimba AI Proxy | `https://apis.scrimba.com/openai/v1` |

## 7.2 `chat.completions.create()`

```javascript
const response = await openai.chat.completions.create({
  model: process.env.AI_MODEL,
  messages,
});
```

`chat.completions.create()` is the core method for sending a conversation to an LLM and receiving a response. The two required fields are:

| Parameter | Type | Description |
|-----------|------|-------------|
| `model` | `string` | The model identifier (e.g., `"gpt-4o-mini"`, `"llama3-70b-8192"`) |
| `messages` | `array` | The full conversation history as an array of message objects |

## 7.3 The Response Object

```javascript
const giftSuggestions = response.choices[0].message.content;
```

The SDK response has this structure:

```
response
└── choices                      ← array of possible responses (usually just one)
    └── [0]                      ← first (and usually only) choice
        └── message              ← the AI's message object
            ├── role             ← always "assistant"
            └── content          ← the text we want ← extract this
```

`choices` is an array because some API calls request multiple completions (`n: 2`). For standard single-response calls, `choices[0]` is always the answer.

---

# 8. The Messages Array — Conversational Memory

## 8.1 Message Roles

```javascript
const messages = [
  { role: "system", content: "You are the Gift Genie..." },
  { role: "user",   content: "My friend loves hiking..."  },
  { role: "assistant", content: "Here are some ideas..." }
];
```

The `messages` array is the **entire conversation history** you send to the model. LLMs are stateless — they have no memory between API calls. You recreate the context on every call by sending all previous messages.

| Role | Sent by | Purpose |
|------|---------|---------|
| `"system"` | Developer | Sets the model's persona, rules, and output format |
| `"user"` | End user | The human's actual message or question |
| `"assistant"` | The AI | The model's previous responses (for multi-turn conversations) |

## 8.2 The System Prompt

```javascript
const messages = [
  {
    role: "system",
    content: `You are the Gift Genie. 
You generate gift ideas that feel thoughtful, specific, and genuinely useful.
Your output must be in structured Markdown.
Do not write introductions or conclusions.
Start directly with the gift suggestions.

Each gift must:
- Have a clear heading
- Include a short explanation of why it works

If the user mentions a location, situation, or constraint,
adapt the gift ideas and add another short section 
under each gift that guides the user to get the gift in that 
constrained context.

After the gift ideas, include a section titled "Questions for you"
with clarifying questions that would help improve the recommendations.`,
  },
];
```

The system prompt is defined **once** at server startup and lives at index `0` of the `messages` array. Every subsequent user message is appended after it — preserving the model's instructions throughout the entire session.

## 8.3 Appending User Messages

```javascript
messages.push({
  role: "user",
  content: userPrompt,
});
```

Each time a user submits a new prompt, it is pushed into the `messages` array. Because `messages` is a module-level variable (not reset per request), the conversation **accumulates** — each API call receives the full history. This is what allows the model to follow up intelligently in multi-turn conversations.

> For this project the messages array is stored in-memory on the server. In a production app with multiple users, you would store conversation history per-user in a database (e.g., Firestore, Redis) so each user has an isolated conversation.

---

# 9. Prompt Engineering

## 9.1 What is a System Prompt?

A **system prompt** is a special instruction message sent to the model before any user content. It shapes how the model behaves for the entire conversation. Think of it as the model's job description.

```
Without a system prompt:
  User: "gift for my friend who loves hiking"
  AI:   "Sure! Here are some ideas. First, maybe consider..."  ← verbose, inconsistent format

With the Gift Genie system prompt:
  User: "gift for my friend who loves hiking"
  AI:   ## Trail Running Shoes
        Why it works: ...
        ## Headlamp
        Why it works: ...
        ## Questions for you
        ...  ← structured, consistent, directly useful
```

## 9.2 Structured Output Instructions

```
Your output must be in structured Markdown.
Do not write introductions or conclusions.
Start directly with the gift suggestions.

Each gift must:
- Have a clear heading
- Include a short explanation of why it works
```

These instructions constrain the **format** of the output. Without them, AI responses are unpredictable — some are lists, some are paragraphs, some start with "Of course! I'd be happy to help." Explicit format instructions make the output consistent enough to be rendered reliably.

| Instruction type | Example | Effect |
|-----------------|---------|--------|
| Format constraint | `"Your output must be in structured Markdown"` | Ensures parseable Markdown |
| Negative constraint | `"Do not write introductions"` | Removes filler text |
| Structure rule | `"Each gift must have a clear heading"` | Makes items machine-readable |
| Conditional logic | `"If the user mentions a location, add a section..."` | Makes the AI context-aware |

## 9.3 Context-Aware Adaptation

```
If the user mentions a location, situation, or constraint,
adapt the gift ideas and add another short section 
under each gift that guides the user to get the gift in that 
constrained context.
```

This instruction tells the model to **read the user's context** and adapt — if the user says "I'm in Mumbai" or "I need something I can get in 2 hours", the model changes its recommendations accordingly. This is **context-aware prompting**: embedding conditional logic into the system prompt so the model handles branching without additional code.

---

# 10. The Frontend — `index.js`

## 10.1 Sending a POST Request with `fetch`

```javascript
const response = await fetch("/api/gift", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ userPrompt }),
});
```

This is a **POST request** — different from the GET requests used in the APIs and Async JS module. POST is used when you are sending data to the server, not just retrieving it.

| Part | Purpose |
|------|---------|
| `"/api/gift"` | Relative URL — hits your own Express server, not an external API |
| `method: "POST"` | Specifies the HTTP verb |
| `headers: { "Content-Type": "application/json" }` | Tells the server how to parse the body |
| `body: JSON.stringify({ userPrompt })` | Serialises the JS object to a JSON string |

> Always set `Content-Type: application/json` when sending JSON. Without it, Express's `express.json()` middleware will not parse the body, and `req.body` will be `undefined` on the server.

## 10.2 Handling the JSON Response

```javascript
const data = await response.json();

if (!response.ok) {
  throw new Error(data.message);
}

const giftSuggestions = data.giftSuggestions;
```

`response.ok` is `true` when the status code is between `200–299`. Checking it before using the data is critical — `fetch` does **not** throw an error for HTTP 4xx or 5xx responses. Without this check, an error response from the server would be treated as valid data.

```
fetch() only rejects (throws) on:
  ✅ Network failure (no internet, DNS failure)
  ✅ CORS block

fetch() does NOT reject on:
  ❌ HTTP 404 Not Found
  ❌ HTTP 500 Internal Server Error
  → You must check response.ok manually
```

## 10.3 `try / catch / finally`

```javascript
try {
  // attempt the fetch and render
} catch (error) {
  // show a user-friendly error message
  outputContent.textContent = "Sorry, I can't access what I need right now...";
} finally {
  // ALWAYS runs — even if an error occurred
  setLoading(false);
}
```

`finally` is a new pattern not used in previous modules. It runs **regardless of whether the try succeeded or the catch handled an error**. This guarantees `setLoading(false)` is always called — the lamp never stays stuck in its "rubbing" animation.

| Block | Runs when |
|-------|-----------|
| `try` | Always — until an error is thrown |
| `catch` | Only when an error is thrown |
| `finally` | Always — after `try` or `catch` completes |

---

# 11. Rendering Markdown Safely

## 11.1 Why Markdown?

The system prompt instructs the AI to respond in **Markdown** — a lightweight text format that uses `##` for headings, `-` for bullet lists, and `**text**` for bold. Raw Markdown looks like:

```
## Trail Running Shoes
Why it works: They are durable, lightweight, and purpose-built for the outdoors.

## Questions for you
- What is the recipient's shoe size?
```

Displaying this as-is would show the raw symbols. The app converts it to proper HTML so it renders as formatted content.

## 11.2 `marked.parse()`

```javascript
import { marked } from "marked";

const html = marked.parse(giftSuggestions);
```

`marked` is a JavaScript library that converts a Markdown string into an HTML string.

```
Input (Markdown):     Output (HTML):
## Heading            <h2>Heading</h2>
- item                <ul><li>item</li></ul>
**bold**              <strong>bold</strong>
```

> `marked.parse()` returns a raw HTML string. **Never set this directly as `innerHTML`** — if the AI ever includes a `<script>` tag in its output (accidentally or due to prompt injection), it would execute in the user's browser.

## 11.3 `DOMPurify.sanitize()` — XSS Prevention

```javascript
import DOMPurify from "dompurify";

const safeHTML = DOMPurify.sanitize(html);
outputContent.innerHTML = safeHTML;
```

**XSS (Cross-Site Scripting)** is a security vulnerability where malicious JavaScript is injected into a page and executed. Because this app renders AI-generated content as HTML, XSS is a real risk — the model could theoretically produce output containing `<script>` tags.

`DOMPurify.sanitize()` strips all potentially dangerous HTML (scripts, event handlers like `onclick`, iframes) while keeping safe formatting tags (`<h2>`, `<ul>`, `<strong>`, etc.).

```
Without DOMPurify:                 With DOMPurify:
<h2>Great gift!</h2>               <h2>Great gift!</h2>
<script>stealCookies()</script>  →  (script tag removed entirely)
<p onclick="evil()">Click</p>      <p>Click</p>  ← event handler stripped
```

> This is the exact same security concern noted in the Cookie Consent README — `innerHTML` with unvalidated content is an XSS risk. In this project, `DOMPurify` is the production-grade solution rather than manual avoidance.

---

# 12. CSS Design System — Custom Properties

## 12.1 CSS Custom Properties (Variables)

```css
:root {
  --bg-primary: lch(12% 15 290);
  --accent-primary: lch(75% 65 85);
  --text-primary: lch(92% 0 0);
  --space-md: 1rem;
  --transition-quick: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

CSS custom properties (commonly called **CSS variables**) store values in one place and reference them throughout the stylesheet using `var(--property-name)`. Defined on `:root`, they are accessible to every element on the page.

```css
/* Reference anywhere: */
body        { background-color: var(--bg-primary); }
.lamp-text  { color: var(--text-secondary); }
.lamp-btn   { transition: transform var(--transition-quick); }
```

| Property group | Variables | Purpose |
|----------------|-----------|---------|
| Background | `--bg-primary` | Dark indigo-blue page background |
| Accent | `--accent-primary`, `--accent-glow`, `--accent-hover` | Golden amber interactive colour |
| Text | `--text-primary`, `--text-secondary` | High and lower contrast text |
| Spacing | `--space-sm`, `--space-md`, `--space-lg`, `--space-xl` | Consistent spacing rhythm |
| Animation | `--transition-quick`, `--transition-smooth` | Reusable cubic-bezier timings |

## 12.2 LCH Colour Space

```css
--bg-primary: lch(12% 15 290);
/*             ↑    ↑   ↑
            Lightness Chroma Hue  */
```

`lch()` is a modern CSS colour function using the **LCH perceptual colour space** — designed so that two colours with the same `L` (lightness) value look equally bright to the human eye. This is not true of `hsl()` or `hex` colours.

| Format | Model | Perceptually uniform? |
|--------|-------|-----------------------|
| `#hex` | RGB | ❌ No |
| `hsl()` | HSL | ❌ No |
| `lch()` | LCH | ✅ Yes |
| `oklch()` | OKLch | ✅ Yes (newer, wider support) |

The golden amber accent (`lch(75% 65 85)`) — hue 85° (amber) at medium-high chroma and 75% lightness — gives the app its warm, magical aesthetic without clashing against the dark indigo background.

## 12.3 CSS Animations — `@keyframes`

```css
@keyframes rubLamp {
  0%   { transform: rotate(0deg)   translate(0, 0);   filter: drop-shadow(0 0 5px var(--accent-glow)); }
  25%  { transform: rotate(-10deg) translate(-5px, 0); }
  50%  { transform: rotate(0deg)   translate(0, 0);   filter: drop-shadow(0 0 30px var(--accent-hover)); }
  75%  { transform: rotate(10deg)  translate(5px, 0);  }
  100% { transform: rotate(0deg)   translate(0, 0);   filter: drop-shadow(0 0 5px var(--accent-glow)); }
}
```

`@keyframes` defines named animations by specifying the CSS state at multiple points (0% = start, 100% = end). They are applied to elements using the `animation` property:

```css
.lamp-btn.loading .lamp-icon-img {
  animation: rubLamp 0.8s ease-in-out infinite;
}
```

| Part | Value | Meaning |
|------|-------|---------|
| `rubLamp` | Animation name | Must match the `@keyframes` name |
| `0.8s` | Duration | One full wobble cycle |
| `ease-in-out` | Timing function | Starts and ends slower |
| `infinite` | Iteration count | Loops until the class is removed |

## 12.4 `clamp()` — Fluid Typography

```css
h1 {
  font-size: clamp(2rem, 5vw, 2.5rem);
}
```

`clamp(minimum, preferred, maximum)` creates a **fluid value** that adapts to the screen size without needing a media query.

```
clamp(2rem, 5vw, 2.5rem)
       ↑     ↑     ↑
  Never      Scales  Never
  smaller   with    larger
  than 2rem viewport than 2.5rem
```

On a narrow phone screen, the heading is `2rem`. On a wide desktop, it caps at `2.5rem`. In between, it smoothly scales with `5vw`.

## 12.5 Lamp Button States

The lamp button has three visual states, toggled by CSS classes applied from `utils.js`:

| State | Class | Visual |
|-------|-------|--------|
| Idle | *(no modifier class)* | Large lamp, full-size text |
| Loading | `.loading` | Lamp wobbles via `rubLamp` animation, text → "Summoning Gift Ideas..." |
| Compact | `.compact` | Lamp shrinks to 96px, text shrinks — output has appeared |

```css
/* Compact state — after results appear */
.lamp-btn.compact .lamp-icon-img { width: 96px; height: 96px; }
.lamp-btn.compact .lamp-text     { font-size: 0.875rem; opacity: 0.7; }

/* Loading state — while waiting for AI */
.lamp-btn.loading .lamp-icon-img { animation: rubLamp 0.8s ease-in-out infinite; }
```

---

# 13. The `utils.js` Module — Shared Utilities

## 13.1 `autoResizeTextarea`

```javascript
export function autoResizeTextarea(textarea) {
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
}
```

This function grows the textarea to fit its content as the user types. The two-step pattern is critical:

```
Step 1: textarea.style.height = 'auto'
  → Resets height so scrollHeight accurately reflects the content size

Step 2: textarea.style.height = `${textarea.scrollHeight}px`
  → Sets the height to exactly the scrollable content height
```

Setting `height` directly to `scrollHeight` without resetting first would cause the textarea to only ever grow, never shrink when text is deleted.

## 13.2 `setLoading` — UI State Management

```javascript
export function setLoading(isLoading) {
  const lampButton    = document.getElementById("lamp-button");
  const lampText      = document.querySelector(".lamp-text");
  const userInput     = document.getElementById("user-input");
  const outputContainer = document.getElementById("output-container");

  lampButton.disabled = isLoading;

  if (isLoading) {
    outputContainer.classList.add("hidden");
    outputContainer.classList.remove("visible");
    userInput.style.height = "auto";
    lampButton.classList.remove("compact");
    lampButton.classList.add("loading");
    lampText.textContent = "Summoning Gift Ideas...";
  } else {
    outputContainer.classList.remove("hidden");
    outputContainer.classList.add("visible");
    lampButton.classList.remove("loading");
    lampButton.classList.add("compact");
    lampText.textContent = "Rub the Lamp";
  }
}
```

`setLoading` is a **state management function** — a single function that applies a consistent set of UI changes when transitioning between states. This pattern (one function, all related changes) prevents the UI from getting into an inconsistent state where, for example, the button is re-enabled but the animation is still running.

> This mirrors the `render()` pattern from the X Clone project — one function is the single source of truth for what the UI looks like in a given state.

## 13.3 `checkEnvironment`

```javascript
export function checkEnvironment() {
  if (!process.env.AI_URL)   throw new Error("Missing AI_URL...");
  if (!process.env.AI_MODEL) throw new Error("Missing AI_MODEL...");
  if (!process.env.AI_KEY)   throw new Error("Missing AI_KEY...");
  console.log("AI provider URL:", process.env.AI_URL);
  console.log("AI model:",        process.env.AI_MODEL);
}
```

This utility validates that all required environment variables are present **at startup** — before the server starts accepting requests. Failing fast with a clear error message is far better than failing silently on the first real request.

---

# 14. How the Full App Flow Works

```
Server starts
    └── server.js: messages array initialised with system prompt
    └── Express listens on PORT (3001)

Page loads
    └── index.html parsed by browser
    └── <script type="module" src="./index.js"> loaded
    └── start() called:
            ├── userInput 'input' event → autoResizeTextarea()
            └── giftForm 'submit' event → handleGiftRequest

User types a gift situation in the textarea
    └── 'input' fires on every keystroke
            └── autoResizeTextarea(userInput) → textarea grows to fit content

User clicks "Rub the Lamp" (or presses Enter)
    └── 'submit' fires on giftForm
            └── handleGiftRequest(e):
                    ├── e.preventDefault() → stop page reload
                    ├── userPrompt = userInput.value.trim()
                    ├── if (!userPrompt) return  ← guard against empty input
                    └── setLoading(true):
                            ├── lampButton.disabled = true
                            ├── output hidden
                            └── lamp animation starts

fetch('/api/gift', { method: 'POST', body: JSON.stringify({ userPrompt }) })
    └── HTTP POST hits Express server

server.js: app.post('/api/gift') handler runs
    ├── const { userPrompt } = req.body
    ├── messages.push({ role: 'user', content: userPrompt })
    └── openai.chat.completions.create({ model, messages })  ← AI call (~1-3 seconds)
            └── response.choices[0].message.content extracted
            └── res.json({ giftSuggestions })

Back in index.js:
    ├── const data = await response.json()
    ├── if (!response.ok) → throw new Error(data.message)
    ├── const html = marked.parse(data.giftSuggestions)
    ├── const safeHTML = DOMPurify.sanitize(html)
    └── outputContent.innerHTML = safeHTML

finally block:
    └── setLoading(false):
            ├── lampButton.disabled = false
            ├── output fades in (opacity transition)
            └── lamp → compact state (shrinks)
```

---

# 15. HTML Structure Recap

```
<!doctype html>
<html lang="en">
├── <head>
│   ├── <meta charset="UTF-8">
│   ├── <meta name="viewport" content="width=device-width, initial-scale=1.0">
│   ├── <title>Gift Genie 🧞</title>
│   └── <link rel="stylesheet" href="style.css">
│
└── <body>
    ├── <div class="app-container">           ← max-width 800px centred container
    │   │
    │   ├── <header class="app-header">       ← animated fadeInDown entrance
    │   │   └── <div class="title-group">
    │   │       ├── <img src="assets/genie.svg" alt="Genie" class="genie-icon-img">
    │   │       └── <h1>Gift Genie</h1>
    │   │
    │   └── <main class="main-content">
    │       │
    │       ├── <form id="gift-form" class="gift-form">
    │       │   │
    │       │   ├── <div class="input-section">
    │       │   │   └── <div class="input-wrapper">
    │       │   │       └── <textarea id="user-input" placeholder="...">
    │       │   │           ← auto-resizes via JS; value sent to /api/gift
    │       │   │
    │       │   └── <div class="lamp-container">
    │       │       └── <button type="submit" id="lamp-button" class="lamp-btn" aria-label="Rub the Lamp">
    │       │           ├── <span class="lamp-icon">
    │       │           │   └── <img src="assets/lamp.svg" class="lamp-icon-img"> ← animates on loading
    │       │           └── <span class="lamp-text">Rub the Lamp</span>
    │       │               ← text changes: "Summoning Gift Ideas..." during loading
    │       │
    │       └── <section class="output-section">
    │           └── <div id="output-container" class="hidden">  ← toggled by setLoading()
    │               └── <div id="output-content">              ← innerHTML set to sanitised Markdown HTML
    │
    └── <script type="module" src="./index.js">  ← ES module; deferred automatically
```

---

# 16. How to Run

This project requires **Node.js** and a running Express server. Unlike previous HTML/CSS/JS projects, you cannot simply open `index.html` in a browser.

### Step 1 — Install dependencies

```bash
npm install
```

### Step 2 — Set environment variables

Create a `.env` file in the project root:

```
AI_KEY=your_api_key_here
AI_URL=https://apis.scrimba.com/openai/v1
AI_MODEL=gpt-4o-mini
```

> If you are using Scrimba's hosted environment, the env vars are already configured. On your local machine, use your own OpenAI (or compatible provider) API key.

### Step 3 — Start the server

```bash
node server.js
```

The server starts at `http://localhost:3001`. The frontend's `fetch('/api/gift', ...)` call is served by Express — it automatically proxies the AI request while keeping your API key on the server.

### Step 4 — Open the app

Visit `http://localhost:3001` in your browser. The Express server also serves the static frontend files.

> ES Modules (`type="module"`) require a server — opening `index.html` directly via `file://` will fail with a CORS error, as noted in the Meme App README.

---

# 17. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 08 — AI Engineering
* **Project:** 01 — AI Engineering Fundamentals (Gift Genie)
* **Key Libraries:** `express`, `openai` (npm SDK), `marked`, `dompurify`
* **AI Provider:** OpenAI-compatible API (configurable via `AI_URL` environment variable)
