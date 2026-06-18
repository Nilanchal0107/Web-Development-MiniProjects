# Bigfoot Sightings — Build a Fullstack Node App

![Node.js](https://img.shields.io/badge/Node.js-v20%2B-339933?style=flat-square&logo=nodedotjs)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![HTML](https://img.shields.io/badge/HTML-Frontend-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Full Stack](https://img.shields.io/badge/Full%20Stack-Frontend%20%2B%20Backend-purple?style=flat-square)
![POST Request](https://img.shields.io/badge/HTTP-GET%20%7C%20POST-teal?style=flat-square)
![SSE](https://img.shields.io/badge/Server--Sent%20Events-EventEmitter-coral?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A full-stack Node.js application where the server both hosts a static frontend **and** provides a JSON API — the **Bigfoot Sightings** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every fullstack Node.js concept introduced in this project, comparing what is new here against the Wild Horizons API (01) — specifically the addition of POST request handling, static file serving, body parsing, input sanitization, and file-based data persistence.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Wild Horizons API](#3-whats-new-vs-wild-horizons-api)
4. [Static File Serving — `serveStatic`](#4-static-file-serving--servestatic)
   - [`fs.readFile()` with `node:fs/promises`](#41-fsreadfile-with-nodefspromises)
   - [`path.join()` and `import.meta.dirname`](#42-pathjoin-and-importmetadirname)
   - [`getContentType()` — MIME Type Map](#43-getcontenttype--mime-type-map)
   - [404 and 500 Fallback Pages](#44-404-and-500-fallback-pages)
5. [POST Request Handling](#5-post-request-handling)
   - [`parseJSONBody()` — Streaming Body Reads](#51-parsejsonbody--streaming-body-reads)
   - [`for await...of` on `req`](#52-for-awaitof-on-req)
6. [Input Sanitization — `sanitize-html`](#6-input-sanitization--sanitize-html)
7. [Data Persistence — `addNewSighting`](#7-data-persistence--addnewsighting)
   - [`fs.writeFile()` — Writing JSON to disk](#71-fswritefile--writing-json-to-disk)
   - [`JSON.stringify(data, null, 2)` — Pretty-printing](#72-jsonstringifydata-null-2--pretty-printing)
8. [Routing — GET and POST on `/api`](#8-routing--get-and-post-on-api)
9. [The Frontend — `public/` Directory](#9-the-frontend--public-directory)
   - [index.html — Sightings List Page](#91-indexhtml--sightings-list-page)
   - [upload-sighting.html — Submit Form](#92-upload-sightinghtml--submit-form)
   - [upload-sighting.js — Fetch POST from Frontend](#93-upload-sightingjs--fetch-post-from-frontend)
10. [How the Full App Flow Works](#10-how-the-full-app-flow-works)
11. [HTML Structure Recap — Server Entry Point](#11-html-structure-recap--server-entry-point)
12. [How to Run](#12-how-to-run)
13. [Course Reference](#13-course-reference)

---

# 1. Project Overview

**Bigfoot Sightings** is a full-stack web application where users can view reported Bigfoot sightings and submit new ones through a browser form. The server does double duty — it acts as both a **static file server** (serving the HTML/CSS/JS frontend from the `public/` folder) and a **JSON API** (responding to data requests on `/api`).

The server includes:

* A **GET `/api`** endpoint that reads `data/data.json` from disk and returns all sightings as JSON
* A **POST `/api`** endpoint that parses the request body, sanitizes the input against HTML injection, appends the new sighting to the JSON file, and returns `201 Created`
* A **static file server** (`serveStatic`) that reads and serves any file from the `public/` directory based on the URL path — handling HTML, CSS, JavaScript, images, and falling back to `404.html` for missing files
* A **body parser** (`parseJSONBody`) that reads the POST request body as a stream of chunks and parses the resulting string as JSON
* An **input sanitizer** (`sanitizeInput`) using the `sanitize-html` library to strip dangerous HTML from user-submitted strings
* A **file writer** (`addNewSighting`) that reads the current JSON file, appends the new sighting, and writes the updated array back to disk

The goal of this module is not just to add a POST endpoint — it is to understand how a Node.js server can serve both a frontend and an API simultaneously, how HTTP request bodies are read as streams, and why input sanitization is essential before writing user data to disk.

---

# 2. Project Structure

```
09. Node.js/
│
└── 02. Build a Fullstack Node App/
    ├── server.js                     → Entry point: routes GET/POST on /api and static files
    ├── handlers/
    │   └── routeHandlers.js          → handleGet() and handlePost() — orchestrate utils
    ├── utils/
    │   ├── serveStatic.js            → Reads files from public/ and sends correct MIME types
    │   ├── getContentType.js         → Maps file extension to MIME type string
    │   ├── getData.js                → Reads data/data.json from disk (async)
    │   ├── sendResponse.js           → Sets headers, status, ends response
    │   ├── parseJSONBody.js          → Streams POST body chunks, parses as JSON
    │   ├── sanitizeInput.js          → Strips HTML tags from string fields (sanitize-html)
    │   └── addNewSighting.js         → Reads JSON, appends new entry, writes back to disk
    ├── data/
    │   └── data.json                 → JSON array of sighting objects — persisted to disk
    └── public/
        ├── index.html                → Sightings list page — fetches GET /api on load
        ├── index.css                 → App styles
        ├── index.js                  → Frontend: fetches data, renders sighting cards
        ├── sightings.html            → Alternative sightings view page
        ├── upload-sighting.html      → Form page: name, location, description fields
        ├── upload-sighting.js        → Frontend: submits form as POST /api, redirects on success
        ├── 404.html                  → Custom 404 error page served for missing files
        └── images/                   → Static images used by the frontend
```

---

# 3. What's New vs Wild Horizons API

## New Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `import fs from 'node:fs/promises'` | `serveStatic.js`, `getData.js`, `addNewSighting.js` | Async file system access — read and write files on disk |
| `import path from 'node:path'` | `serveStatic.js`, `addNewSighting.js` | Cross-platform path construction (`path.join`) |
| `import.meta.dirname` | `server.js` line 8 | ES Module equivalent of `__dirname` — absolute path to the current file's directory |
| `fs.readFile(filePath, 'utf8')` | `getData.js` | Reads a file's contents as a UTF-8 string |
| `fs.writeFile(path, content, 'utf8')` | `addNewSighting.js` | Writes a string to a file, overwriting previous content |
| `path.extname(filePath)` | `serveStatic.js` line 14 | Extracts the file extension (e.g. `.css`) from a path string |
| `path.join(a, b, c)` | `serveStatic.js`, `addNewSighting.js` | Joins path segments with the OS separator — works on Windows and Unix |
| `for await (const chunk of req)` | `parseJSONBody.js` | Reads the POST request body as an async stream of Buffer chunks |
| `JSON.stringify(data, null, 2)` | `addNewSighting.js` | Serialises JSON with 2-space indentation for human-readable disk storage |
| `sanitizeHtml(value, options)` | `sanitizeInput.js` | Strips disallowed HTML tags from user input to prevent XSS |
| `req.method === 'POST'` | `server.js` line 16 | Routes POST requests separately from GET on the same `/api` path |
| `res.statusCode = 201` | `routeHandlers.js` via `sendResponse` | `201 Created` — the correct status code for a successful resource creation |
| `err.code === 'ENOENT'` | `serveStatic.js` line 23 | Node.js error code for "file not found" — triggers the 404 page |

## Concepts Carried Over from Wild Horizons ↩

| Concept | Refined Here |
|---------|-------------|
| `http.createServer()` | Now handles both static files AND API routes |
| `res.setHeader()` + `res.end()` | Wrapped in `sendResponse` utility |
| Manual `if/else` routing | Extended with `else if (!req.url.startsWith('/api'))` for static fallback |
| `JSON.stringify(payload)` | Used in `sendResponse` for API responses AND to write data files |
| `async/await` throughout | Every utility is async — file I/O operations are all asynchronous |

---

# 4. Static File Serving — `serveStatic`

## 4.1 `fs.readFile()` with `node:fs/promises`

```javascript
// utils/serveStatic.js
import fs from 'node:fs/promises'

const content = await fs.readFile(filePath)
sendResponse(res, 200, contentType, content)
```

`fs.readFile(path)` reads the entire file into memory as a `Buffer` (when no encoding is specified). Sending a `Buffer` directly via `res.end()` correctly handles binary files (images, fonts) without encoding corruption. For text files parsed later (like JSON), `'utf8'` is added: `fs.readFile(path, 'utf8')`.

`node:fs/promises` provides the Promise-based version of all `fs` functions — `await fs.readFile()` instead of `fs.readFile(path, callback)`. This works naturally with `async/await` without callback nesting.

## 4.2 `path.join()` and `import.meta.dirname`

```javascript
// server.js
const __dirname = import.meta.dirname

// utils/serveStatic.js
const publicDir = path.join(baseDir, 'public')
const filePath = path.join(
    publicDir,
    req.url === '/' ? 'index.html' : req.url
)
```

In CommonJS modules, `__dirname` is a built-in variable holding the absolute path to the current file's directory. In ES Modules, it is not available — `import.meta.dirname` is the ES Module equivalent (Node.js 21.2+).

`path.join()` concatenates path segments using the operating system's separator (`\` on Windows, `/` on Unix). This ensures the file path is valid on both platforms — a hardcoded `/` separator in a path string breaks on Windows.

| Input | Windows output | Unix output |
|-------|---------------|-------------|
| `path.join('public', 'index.html')` | `public\index.html` | `public/index.html` |
| `path.join('/base', 'public', 'index.html')` | `/base\public\index.html` | `/base/public/index.html` |

## 4.3 `getContentType()` — MIME Type Map

```javascript
// utils/getContentType.js
export function getContentType(ext) {
    const types = {
        ".js":   "text/javascript",
        ".css":  "text/css",
        ".json": "application/json",
        ".png":  "image/png",
        ".jpg":  "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif":  "image/gif",
        ".svg":  "image/svg+xml"
    }
    return types[ext.toLowerCase()] || "text/html"
}
```

`Content-Type` is critical for static file serving. Browsers use this header to decide how to process a response — a `.js` file served as `text/html` will not execute as JavaScript. `getContentType` maps file extensions to their correct MIME type strings, defaulting to `text/html` for `.html` and unrecognised extensions.

## 4.4 404 and 500 Fallback Pages

```javascript
try {
    const content = await fs.readFile(filePath)
    sendResponse(res, 200, contentType, content)
} catch (err) {
    if (err.code === 'ENOENT') {
        // File not found → serve 404.html with 404 status
        const content = await fs.readFile(path.join(publicDir, '404.html'))
        sendResponse(res, 404, 'text/html', content)
    } else {
        // Other error → 500
        sendResponse(res, 500, 'text/html', '<html><h1>Server Error</h1></html>')
    }
}
```

`err.code === 'ENOENT'` (Error NO ENTry) is Node.js's error code for "file not found". Checking this code allows distinguishing a missing file (show a friendly 404 page) from other errors like permission denied or disk full (show a generic 500 message).

---

# 5. POST Request Handling

## 5.1 `parseJSONBody()` — Streaming Body Reads

```javascript
// utils/parseJSONBody.js
export async function parseJSONBody(req) {
    let body = ''

    for await (const chunk of req) {
        body += chunk
    }

    try {
        return JSON.parse(body)
    } catch (err) {
        throw new Error(`Invalid JSON format: ${err}`)
    }
}
```

HTTP request bodies do not arrive all at once — they are transmitted as a **stream of chunks** (Buffer objects). The body must be reassembled from chunks before it can be parsed.

Unlike `fetch()` in the browser (which provides `.json()` directly), Node's raw `IncomingMessage` (the `req` object) is a readable stream — you must manually collect the chunks.

## 5.2 `for await...of` on `req`

```javascript
for await (const chunk of req) {
    body += chunk
}
```

`for await...of` is the **async iteration** syntax — it works on objects that implement the `AsyncIterable` interface. Node.js streams implement this interface, so `req` (an `IncomingMessage` stream) can be iterated directly. Each `chunk` is a `Buffer` — when concatenated with `+=` to a string, it is implicitly converted to a UTF-8 string.

| Approach | Code | When to use |
|----------|------|-------------|
| `for await...of` | `for await (const chunk of req) { body += chunk }` | Modern — clean, readable |
| `data` + `end` events | `req.on('data', cb).on('end', cb)` | Older Node.js — event-based |
| `req.text()` | N/A — not available on `IncomingMessage` | Only on `fetch` Response objects |

> `for await...of` was introduced in ES2018. It is the recommended way to consume async iterables in modern Node.js.

---

# 6. Input Sanitization — `sanitize-html`

```javascript
// utils/sanitizeInput.js
import sanitizeHtml from 'sanitize-html'

export function sanitizeInput(data) {
    const sanitizedData = {}

    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            sanitizedData[key] = sanitizeHtml(value, { allowedTags: ['b'], allowedAttributes: {} })
        } else {
            sanitizedData[key] = value
        }
    }

    return sanitizedData
}
```

**Input sanitization** strips or escapes malicious content from user-submitted data before it is stored or displayed. Without sanitization, a user could submit a sighting description containing `<script>alert('xss')</script>` — which would execute in other users' browsers when the sighting is displayed (an **XSS attack**).

`sanitize-html` removes all HTML tags except those explicitly allowed. Here, only `<b>` (bold) is permitted — all other tags including `<script>`, `<img>`, and `<a>` are stripped.

```
Input:  "I saw Bigfoot near <script>fetch('/steal-cookies')</script> the lake"
Output: "I saw Bigfoot near  the lake"
```

`Object.entries(data)` iterates over all key-value pairs — string values are sanitized, non-string values (numbers, booleans) pass through unchanged.

> Sanitization should happen **before writing to storage** — not only before rendering. Once malicious data is in the database, every display layer must also sanitize. Sanitizing at the entry point is the defensive first layer.

---

# 7. Data Persistence — `addNewSighting`

## 7.1 `fs.writeFile()` — Writing JSON to disk

```javascript
// utils/addNewSighting.js
export async function addNewSighting(newSighting) {
    const sightings = await getData()           // Read current data
    sightings.push(newSighting)                  // Append new entry

    const pathJSON = path.join('data', 'data.json')

    await fs.writeFile(
        pathJSON,
        JSON.stringify(sightings, null, 2),
        'utf8'
    )
}
```

`fs.writeFile(path, content, encoding)` writes `content` to `path`, **overwriting** the file completely. To append a new sighting, the current file must first be read, the new entry appended in memory, and the full updated array written back. This is the **read-modify-write** pattern.

This approach has a race condition under concurrent requests (two simultaneous POST requests could both read the old data, both push their sighting, and only the second write would survive). In production, a real database handles concurrency automatically.

## 7.2 `JSON.stringify(data, null, 2)` — Pretty-printing

```javascript
JSON.stringify(sightings, null, 2)
```

`JSON.stringify(value, replacer, space)` takes three arguments:

| Argument | Value used | Effect |
|----------|-----------|--------|
| `value` | `sightings` | The data to serialize |
| `replacer` | `null` | Include all properties (no filtering) |
| `space` | `2` | Indent each level by 2 spaces — human-readable output |

Without the `space` argument, `JSON.stringify` produces minified JSON on a single line — valid but unreadable when opened as a file. `2` produces clean, formatted JSON matching the original file's style.

---

# 8. Routing — GET and POST on `/api`

```javascript
// server.js
const server = http.createServer(async (req, res) => {
    if (req.url === '/api') {
        if (req.method === 'GET') {
            return await handleGet(res)
        } else if (req.method === 'POST') {
            handlePost(req, res)
        }
    } else if (!req.url.startsWith('/api')) {
        return await serveStatic(req, res, __dirname)
    }
})
```

The routing logic has two top-level branches:
1. `req.url === '/api'` — API route: dispatch to `handleGet` or `handlePost` based on HTTP method
2. `!req.url.startsWith('/api')` — everything else: treat as a static file request

The static branch is a catch-all for any URL that doesn't start with `/api` — images, HTML pages, CSS files, and JavaScript files are all served from `public/`.

| URL | Method | Handler |
|-----|--------|---------|
| `/api` | GET | `handleGet(res)` → reads data, returns JSON |
| `/api` | POST | `handlePost(req, res)` → parses body, sanitizes, saves, returns 201 |
| `/` | GET | `serveStatic(...)` → serves `public/index.html` |
| `/index.css` | GET | `serveStatic(...)` → serves `public/index.css` |
| `/upload-sighting.html` | GET | `serveStatic(...)` → serves that HTML page |
| `/nonexistent.html` | GET | `serveStatic(...)` → 404 response with `public/404.html` |

---

# 9. The Frontend — `public/` Directory

## 9.1 `index.html` — Sightings List Page

The sightings list page fetches `GET /api` on load and renders each sighting as a card. The fetch call uses `fetch('/api')` — a relative URL that goes to the same server that served the HTML file, avoiding CORS entirely.

## 9.2 `upload-sighting.html` — Submit Form

The upload form collects sighting details: name, location, and description. The form does not submit to a URL directly — its default submission is prevented and handled by `upload-sighting.js`.

## 9.3 `upload-sighting.js` — Fetch POST from Frontend

```javascript
// public/upload-sighting.js (simplified)
const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
})
```

The frontend sends the form data as a JSON body using `fetch()` with `method: 'POST'`. The `Content-Type: application/json` header tells the server the body is JSON (not URL-encoded form data). On success (`201`), the page redirects to the sightings list.

---

# 10. How the Full App Flow Works

```
┌─────────────────── BROWSER ───────────────────────────────┐
│ User visits http://localhost:8000                         │
│   └─ GET /                                               │
│                                                           │
│ User visits http://localhost:8000/upload-sighting.html    │
│   └─ GET /upload-sighting.html                           │
│                                                           │
│ User fills form → clicks Submit                           │
│   └─ fetch('POST /api', body: JSON)                      │
└────────────────────────────────────────────────────────────┘
           │                │                  │
           ▼                ▼                  ▼
┌─────────────────── SERVER ───────────────────────────────┐
│ GET /               serveStatic → reads public/index.html │
│ GET /upload-sighting.html  serveStatic → reads that file  │
│                                                           │
│ POST /api                                                 │
│   ├─ parseJSONBody(req) → collect chunks → JSON.parse     │
│   ├─ sanitizeInput(body) → strip HTML from strings        │
│   ├─ addNewSighting(sanitizedBody)                        │
│   │   ├─ getData() → fs.readFile('data/data.json')       │
│   │   ├─ sightings.push(newSighting)                     │
│   │   └─ fs.writeFile('data/data.json', JSON.stringify)  │
│   └─ sendResponse(res, 201, 'application/json', body)    │
└───────────────────────────────────────────────────────────┘
           │
           ▼
Browser: 201 Created → redirects to sightings list
List page: GET /api → getData() → returns updated JSON array
```

---

# 11. HTML Structure Recap — Server Entry Point

```
server.js (entry point)
│
├── import http           → creates the TCP server
├── import serveStatic    → handles all non-API requests (static files)
├── import handleGet      → reads data, sends JSON response
├── import handlePost     → parses, sanitizes, persists, sends 201
│
└── http.createServer(async (req, res) => {
    ├── if req.url === '/api'
    │   ├── GET  → handleGet(res)
    │   └── POST → handlePost(req, res)
    └── else (not /api)
        └── serveStatic(req, res, __dirname)
            ├── path.join(__dirname, 'public', req.url)
            ├── fs.readFile(filePath)         ← read file from disk
            ├── getContentType(ext)           ← map extension → MIME type
            ├── sendResponse(res, 200, ...)   ← 200 + file content
            └── catch ENOENT → serve 404.html
})
```

---

# 12. How to Run

```bash
# Install the one npm dependency (sanitize-html)
npm install

# Start the server
node server.js
```

The server starts on `http://localhost:8000`. Visit:
- `http://localhost:8000` — view all sightings
- `http://localhost:8000/upload-sighting.html` — submit a new sighting
- `http://localhost:8000/api` — raw JSON API endpoint

No build step is required. The frontend files in `public/` are served directly by the server.

---

# 13. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 09. Node.js
* **Project:** 02. Build a Fullstack Node App — Bigfoot Sightings
