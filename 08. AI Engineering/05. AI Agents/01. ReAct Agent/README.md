# ReAct Agent — AI Agents

![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-yellow?style=flat-square&logo=javascript)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5--Turbo-412991?style=flat-square&logo=openai)
![ES Modules](https://img.shields.io/badge/ES%20Modules-type%3D%22module%22-blueviolet?style=flat-square)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat-square&logo=nodedotjs)
![Regex](https://img.shields.io/badge/Regex-Action%20Parsing-lightgrey?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A from-scratch AI agent built using the **ReAct (Reason + Act)** prompting pattern — the **ReAct Agent** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every AI agent concept introduced in this project, comparing what is new here against the previous AI Engineering modules (Fundamentals, Prompt Engineering, and RAG) covered in the earlier folders.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is an "AI Agent"?](#3-what-is-an-ai-agent)
4. [What's New vs Previous AI Engineering Projects](#4-whats-new-vs-previous-ai-engineering-projects)
5. [The ReAct Pattern — Reason + Act](#5-the-react-pattern--reason--act)
   - [The Four-Step Loop](#51-the-four-step-loop)
   - [System Prompt Design](#52-system-prompt-design)
   - [Few-Shot Examples in the Prompt](#53-few-shot-examples-in-the-prompt)
6. [The Agent Loop — `async function agent()`](#6-the-agent-loop--async-function-agent)
   - [Message History as Conversation State](#61-message-history-as-conversation-state)
   - [The `MAX_ITERATIONS` Guard](#62-the-max_iterations-guard)
   - [Regex Action Parsing](#63-regex-action-parsing)
   - [Dynamic Function Dispatch](#64-dynamic-function-dispatch)
   - [Injecting Observations Back into Context](#65-injecting-observations-back-into-context)
7. [Tool Functions](#7-tool-functions)
   - [`getCurrentWeather`](#71-getcurrentweather)
   - [`getLocation`](#72-getlocation)
   - [The `availableFunctions` Dispatch Map](#73-the-availablefunctions-dispatch-map)
8. [How the Full Agent Flow Works](#8-how-the-full-agent-flow-works)
9. [Project Entry Point — index.html](#9-project-entry-point--indexhtml)
10. [How to Run](#10-how-to-run)
11. [Course Reference](#11-course-reference)

---

# 1. Project Overview

**ReAct Agent** is a minimal but fully functional AI agent that reasons about a user query and takes autonomous actions to answer it — without any UI beyond the browser console. The agent:

* A **ReAct system prompt** that instructs the model to cycle through Thought → Action → PAUSE → Observation before delivering a final Answer
* An **agent loop** capped at 5 iterations that calls GPT-3.5-Turbo, parses its response, executes tool functions, and injects observations back into the conversation
* Two **tool functions** — `getLocation` (returns the user's city) and `getCurrentWeather` (returns weather data) — that the model can call by name inside its response text
* A **regex parser** that extracts `Action: functionName: argument` lines from raw model output
* A **dispatch map** (`availableFunctions`) that routes parsed action strings to real JavaScript functions

The goal of this module is not just to build a chatbot — it is to understand how AI agents work under the hood: how a language model "calls" a function by generating formatted text, and how code intercepts that text, runs the real function, and feeds the result back to the model.

---

# 2. Project Structure

```
08. AI Engineering/
│
└── 05. AI Agents/
    └── 01. ReAct Agent/
        ├── index.html   → Minimal HTML shell — loads index.js as an ES Module
        ├── index.js     → Agent logic: system prompt, message loop, regex parser, dispatch
        └── tools.js     → Two mock tool functions: getCurrentWeather, getLocation
```

---

# 3. What is an "AI Agent"?

A **language model** (like GPT) is stateless — it takes a prompt and returns a completion. It cannot, on its own, look up data, run code, or take actions in the world.

An **AI agent** wraps a language model in an **agentic loop**: a piece of code that repeatedly calls the model, parses its output for requested actions, executes those actions, and feeds the results back as new context until the model produces a final answer.

| Term | Meaning |
|------|---------|
| **Agent** | Code + LLM working in a loop to complete a task autonomously |
| **Tool** | A function the agent can call to interact with the real world |
| **ReAct** | A prompting pattern: **Re**ason + **Act** — the model reasons first, then acts |
| **Observation** | The real output of a tool, injected back into the conversation |
| **PAUSE** | A signal word telling the loop to stop, run the tool, and resume |
| **Iteration** | One trip around the agent loop (one LLM call + one optional tool call) |

> The key insight is that the model never *actually* calls a function — it *describes* a function call in text (e.g. `Action: getLocation: null`), and the surrounding JavaScript code detects that description, runs the real function, and adds the result to the conversation as an `Observation`.

---

# 4. What's New vs Previous AI Engineering Projects

## New JavaScript / Agent Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `ReAct` prompting pattern | `systemPrompt` string in `index.js` | Structures model output into parseable Thought / Action / PAUSE / Observation cycles |
| `availableFunctions` dispatch map | `const availableFunctions = { ... }` | Maps action name strings to real JS functions for dynamic invocation |
| `actionRegex` — `/^Action: (\w+): (.*)$/` | Line 58 of `index.js` | Parses the model's raw text to extract tool name and argument |
| `responseLines.find(str => regex.test(str))` | Line 72 | Scans each line of the model response for an Action declaration |
| `actionRegex["exec"](foundActionStr)` | Line 75 | Extracts named capture groups `[_, action, actionArg]` from the matched line |
| `availableFunctions.hasOwnProperty(action)` | Line 78 | Guards against hallucinated tool names the agent cannot call |
| `MAX_ITERATIONS` loop guard | `for (let i = 0; i < MAX_ITERATIONS; i++)` | Prevents infinite loops if the model never produces a final Answer |
| Appending `Observation:` to messages | Line 83 | Re-injects tool output into the conversation as an assistant message |
| `messages` array as rolling context | Entire agent function | Every turn — user query, assistant reasoning, observations — is accumulated |

## Concepts Carried Over ↩

| Concept | Used Again |
|---------|-----------|
| `import OpenAI from "openai"` | Initialising the OpenAI SDK |
| `openai.chat.completions.create({ model, messages })` | Every iteration of the loop calls the Chat Completions API |
| `response.choices[0].message.content` | Reading the model's raw text output |
| `dangerouslyAllowBrowser: true` | Allows the SDK to run in a browser environment |
| `process.env.OPENAI_API_KEY` | API key supplied via environment variable |
| `async/await` | All LLM calls and tool function calls are awaited |
| `{ role: "system", content }` + `{ role: "user", content }` | Standard chat message structure from previous AI modules |

---

# 5. The ReAct Pattern — Reason + Act

## 5.1 The Four-Step Loop

**ReAct** (published by Yao et al., 2022) is a prompting strategy that interleaves **reasoning traces** and **task-specific actions** in a structured loop. The model is instructed to always follow four steps before producing a final answer:

```
Thought     → What does the model think needs to happen?
Action      → Which tool should be called, with which argument?
PAUSE       → Signal word: stop here, run the tool, come back with the result
Observation → The real output of the tool, injected by the agent code
```

This loop repeats until the model produces a line starting with `Answer:` instead of an `Action:`.

| Step | Who Produces It | Example |
|------|----------------|---------|
| `Thought:` | LLM | `"I should look up the user's location first."` |
| `Action:` | LLM | `"Action: getLocation: null"` |
| `PAUSE` | LLM | Model stops generating; code detects this |
| `Observation:` | Agent code | `"Observation: San Diego, CA"` |
| `Answer:` | LLM | Final response to the user, using all gathered info |

## 5.2 System Prompt Design

```javascript
const systemPrompt = `
You cycle through Thought, Action, PAUSE, Observation. At the end of the loop you output a final Answer.
...
Available actions:
- getCurrentWeather: 
    E.g. getCurrentWeather: Salt Lake City
    Returns the current weather of the location specified.
- getLocation:
    E.g. getLocation: null
    Returns user's location details. No arguments needed.
`
```

The system prompt does three things:
1. **Defines the loop** — tells the model exactly what Thought / Action / PAUSE / Observation means
2. **Enumerates available tools** with their exact call syntax — the model must format Action lines exactly as shown
3. **Sets expectations** — "Your final answer should be highly specific to the observations you have from running the actions"

> The system prompt is the entire "brain" of the agent's behaviour. Changing it — adding tools, changing the loop format, or adjusting the instruction — changes what the agent can do without touching any other code.

## 5.3 Few-Shot Examples in the Prompt

```javascript
// Inside the system prompt string:
`Example session:
Question: Please give me some ideas for activities to do this afternoon.
Thought: I should look up the user's location so I can give location-specific activity ideas.
Action: getLocation: null
PAUSE

You will be called again with something like this:
Observation: "New York City, NY"

Then you loop again:
Thought: To get even more specific activity ideas, I should get the current weather at the user's location.
Action: getCurrentWeather: New York City
PAUSE`
```

The example session is a **few-shot example** embedded directly in the system prompt. It shows the model exactly what format each step should take. Without it, the model might produce valid reasoning but format the `Action:` line differently — breaking the regex parser.

> Few-shot examples are one of the most reliable techniques in prompt engineering. Showing the model the exact output format is more reliable than describing that format in words.

---

# 6. The Agent Loop — `async function agent()`

## 6.1 Message History as Conversation State

```javascript
async function agent(query) {
    const messages = [
        { role: "system", content: systemPrompt },
        { role: "user",   content: query }
    ]
    // ...
}
```

`messages` is the **rolling conversation history**. Unlike a single API call, the agent loop keeps extending this array with every turn — the model's reasoning, observations from tools, and the final answer are all appended. Each call to `openai.chat.completions.create` sends the full `messages` array, giving the model complete context of everything that has happened.

| Message added | `role` | `content` |
|--------------|--------|-----------|
| User's question | `"user"` | The query string |
| Model's Thought + Action | `"assistant"` | Raw text from `response.choices[0].message.content` |
| Tool output | `"assistant"` | `"Observation: <tool result>"` |
| Final answer | `"assistant"` | The `Answer:` line — returned to caller |

## 6.2 The `MAX_ITERATIONS` Guard

```javascript
const MAX_ITERATIONS = 5

for (let i = 0; i < MAX_ITERATIONS; i++) {
    console.log(`Iteration #${i + 1}`)
    // ... call LLM, parse, dispatch
}
```

Without a limit, a misbehaving model could loop forever — calling tools repeatedly without ever producing a final `Answer:`. `MAX_ITERATIONS = 5` is a safety cap. If the model doesn't resolve within 5 calls, the loop exits silently (returning `undefined`).

> In production agents, hitting `MAX_ITERATIONS` should trigger an error or a fallback response — not silent failure. For a learning project, the cap is enough to prevent runaway API costs.

## 6.3 Regex Action Parsing

```javascript
const actionRegex = /^Action: (\w+): (.*)$/

const responseLines = responseText.split("\n")
const foundActionStr = responseLines.find(str => actionRegex.test(str))
```

The model's response is a plain text string. The agent splits it into lines and scans for one matching `Action: functionName: argument`. The regex:

| Part | Meaning |
|------|---------|
| `^` | Line must start here — no leading whitespace |
| `Action: ` | Literal prefix |
| `(\w+)` | Capture group 1 — the function name (letters/digits/underscore only) |
| `: ` | Literal separator |
| `(.*)` | Capture group 2 — the argument (any characters, including spaces) |
| `$` | Line must end here |

If no matching line is found (`foundActionStr` is `undefined`), the loop falls to the `else` branch and returns the model's response as the final answer.

## 6.4 Dynamic Function Dispatch

```javascript
const actions = actionRegex["exec"](foundActionStr)
const [_, action, actionArg] = actions

if (!availableFunctions.hasOwnProperty(action)) {
    throw new Error(`Unknown action: ${action}: ${actionArg}`)
}

console.log(`Calling function ${action} with argument ${actionArg}`)
const observation = await availableFunctions[action](actionArg)
```

`actionRegex["exec"]` (bracket notation is equivalent to `actionRegex.exec`) runs the regex against the matched line and returns an array: `[fullMatch, functionName, argument]`. Destructuring with `[_, action, actionArg]` ignores the full match and names the two capture groups.

`availableFunctions[action]` uses **bracket notation** to look up the function by its name string — this is dynamic dispatch. If the action name string is `"getLocation"`, then `availableFunctions["getLocation"]` is the same as `availableFunctions.getLocation`.

## 6.5 Injecting Observations Back into Context

```javascript
const observation = await availableFunctions[action](actionArg)
messages.push({ role: "assistant", content: `Observation: ${observation}` })
```

The tool's return value is wrapped in an `Observation:` prefix and pushed onto `messages` as an assistant turn. On the next iteration, the model sees this observation as part of its history and can use the data to either take another action or formulate the final answer.

> The observation is pushed with `role: "assistant"` rather than `role: "tool"` because the ReAct pattern pre-dates OpenAI's native tool-use API. In the OpenAI Function Calling approach (the next project), a dedicated `role: "tool"` message type is used instead.

---

# 7. Tool Functions

## 7.1 `getCurrentWeather`

```javascript
// tools.js
export async function getCurrentWeather() {
    const weather = {
        temperature: "75",
        unit: "F",
        forecast: "sunny"
    }
    return JSON.stringify(weather)
}
```

In this project, `getCurrentWeather` is **mocked** — it always returns the same hardcoded JSON. The function signature matches what the agent loop expects (an `async` function that returns a string), but no real API call is made. This keeps the project focused on learning the agent loop mechanics rather than API integration.

The return value is `JSON.stringify(weather)` — a string, because observations injected into the LLM context must be strings.

## 7.2 `getLocation`

```javascript
export async function getLocation() {
    return "San Diego, CA"
}
```

Similarly mocked — always returns the same city string. The agent loop calls this with the argument string `"null"` (the literal word null from the model's `Action: getLocation: null` line), but the function ignores its argument entirely.

## 7.3 The `availableFunctions` Dispatch Map

```javascript
// index.js
const availableFunctions = {
    getCurrentWeather,
    getLocation
}
```

`availableFunctions` is a plain JavaScript object that maps **tool name strings** to **function references**. It is the bridge between the text world (the model's `Action: getLocation: null` string) and the code world (the real `getLocation()` function).

| Why this pattern? | Alternative |
|------------------|-------------|
| `availableFunctions[action](arg)` — dynamic lookup by name string | `if (action === "getLocation") getLocation(arg)` — verbose and brittle |
| Adding a new tool = add 1 line to the object | Adding a new tool = add a new `else if` branch |
| `hasOwnProperty` check catches hallucinated tool names | No check = crash on unknown names |

---

# 8. How the Full Agent Flow Works

```
User calls agent("What activities can I do this afternoon?")
    │
    ├─ messages = [{ system }, { user: query }]
    │
    ├── ITERATION 1
    │   ├─ openai.chat.completions.create({ messages })
    │   ├─ Model response:
    │   │   "Thought: I should look up the user's location.
    │   │    Action: getLocation: null
    │   │    PAUSE"
    │   ├─ Regex finds: "Action: getLocation: null"
    │   ├─ Dispatches: availableFunctions["getLocation"]("null")
    │   ├─ Tool returns: "San Diego, CA"
    │   └─ messages.push({ assistant: "Observation: San Diego, CA" })
    │
    ├── ITERATION 2
    │   ├─ openai.chat.completions.create({ messages })   ← full history sent
    │   ├─ Model response:
    │   │   "Thought: Now I should get the weather in San Diego.
    │   │    Action: getCurrentWeather: San Diego
    │   │    PAUSE"
    │   ├─ Regex finds: "Action: getCurrentWeather: San Diego"
    │   ├─ Dispatches: availableFunctions["getCurrentWeather"]("San Diego")
    │   ├─ Tool returns: '{"temperature":"75","unit":"F","forecast":"sunny"}'
    │   └─ messages.push({ assistant: "Observation: {temperature...}" })
    │
    └── ITERATION 3
        ├─ openai.chat.completions.create({ messages })   ← full history sent
        ├─ Model response:
        │   "Answer: In San Diego, it's 75°F and sunny this afternoon.
        │    Great options include: beach volleyball at Mission Beach,
        │    hiking in Torrey Pines..."
        ├─ No "Action:" line found → else branch executes
        └─ return responseText    ← Final answer returned to caller
```

---

# 9. Project Entry Point — index.html

```
<!doctype html>
<html>
├── <head>
│   └── (empty — no styles, no fonts)
│
└── <body>
    └── <script type="module" src="index.js">
            ← ES Module mode: enables import/export and top-level await
            ← index.js imports OpenAI SDK and tool functions
            ← Agent output is logged to the browser console
```

The HTML file is intentionally minimal — its only purpose is to load `index.js` as an ES Module so the agent code can run in the browser environment. All output goes to `console.log`.

> `type="module"` is required because `index.js` uses `import` statements. Without it, the browser would attempt to parse the file as a classic script and throw a `SyntaxError` on the first `import` line.

---

# 10. How to Run

This project requires an OpenAI API key. Because it runs in the browser with `dangerouslyAllowBrowser: true`, the key must be supplied via an environment variable that your bundler or dev server exposes at `process.env.OPENAI_API_KEY`.

1. Install dependencies (if using a bundler like Vite): `npm install`
2. Set `OPENAI_API_KEY` in your environment or `.env` file
3. Serve with a dev server: `npx vite` or `npx serve`
4. Open the browser console — the agent output (Thought / Action / Observation / Answer) will appear there
5. Uncomment line 91 in `index.js` to trigger the example query:
   ```javascript
   console.log(await agent("What are some activity ideas based on my location and weather?"))
   ```

> The project cannot be opened by double-clicking `index.html` — ES Modules require an HTTP server due to CORS restrictions on `file://` origins.

---

# 11. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 08. AI Engineering — Section 05: AI Agents
* **Project:** 01. ReAct Agent
