# Wild Horizons — Build a Node API

![Node.js](https://img.shields.io/badge/Node.js-v20%2B-339933?style=flat-square&logo=nodedotjs)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![REST API](https://img.shields.io/badge/REST-API-teal?style=flat-square)
![HTTP Module](https://img.shields.io/badge/Node.js-http%20module-lightgrey?style=flat-square)
![JSON](https://img.shields.io/badge/Data-JSON-orange?style=flat-square)
![CORS](https://img.shields.io/badge/Headers-CORS-blue?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A pure Node.js HTTP server that exposes a travel destinations dataset as a REST API — the **Wild Horizons** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every Node.js backend concept introduced in this module, comparing what is new here against the browser-side JavaScript covered in previous folders — specifically how Node.js differs from browser JavaScript in how it handles HTTP, file I/O, and modules.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is Node.js?](#3-what-is-nodejs)
4. [What's New vs Browser JavaScript](#4-whats-new-vs-browser-javascript)
5. [The `http` Module — Creating a Server](#5-the-http-module--creating-a-server)
   - [`http.createServer()`](#51-httpcreateserver)
   - [The `req` Object — Incoming Request](#52-the-req-object--incoming-request)
   - [The `res` Object — Outgoing Response](#53-the-res-object--outgoing-response)
6. [URL Parsing in Node.js](#6-url-parsing-in-nodejs)
   - [`new URL(req.url, base)`](#61-new-urlrequrl-base)
   - [`urlObj.pathname` vs `req.url`](#62-urlobjpathname-vs-requrl)
   - [`Object.fromEntries(urlObj.searchParams)`](#63-objectfromentriesurlobjsearchparams)
7. [Routing — Path and Query Parameters](#7-routing--path-and-query-parameters)
   - [Manual `if/else` Routing](#71-manual-ifelse-routing)
   - [Path Parameters — `req.url.split('/').pop()`](#72-path-parameters--requrlsplitpop)
   - [Query Parameters — `getDataByQueryParams`](#73-query-parameters--getdatabyqueryparams)
8. [Response Helpers — `sendJSONResponse`](#8-response-helpers--sendjsonresponse)
9. [CORS Headers](#9-cors-headers)
10. [ES Modules in Node.js](#10-es-modules-in-nodejs)
    - [`"type": "module"` in package.json](#101-type-module-in-packagejson)
    - [Node-style Bare Specifiers](#102-node-style-bare-specifiers)
11. [The Database Layer — `getDataFromDB`](#11-the-database-layer--getdatafromdb)
12. [How the API Works — Request Flow](#12-how-the-api-works--request-flow)
13. [API Endpoints Reference](#13-api-endpoints-reference)
14. [How to Run](#14-how-to-run)
15. [Course Reference](#15-course-reference)

---

# 1. Project Overview

**Wild Horizons** is a fictional travel dataset API — described as "a dataset of the planet's most interesting places." The project exposes a collection of travel destinations (stored in `data/data.js`) over HTTP, allowing callers to query them by continent, country, or arbitrary filters.

The server:

* Listens on **port 8000** using Node's built-in `http` module — no Express, no third-party framework
* Exposes a single base route `/api` with **GET** support for the entire dataset, filtered by query parameters
* Exposes path-parameter routes `/api/continent/:name` and `/api/country/:name` for precise lookups
* Returns all responses as **JSON** with proper `Content-Type` and CORS headers
* Returns a structured `404` JSON error for unrecognised routes (not an HTML error page)

The goal of this module is not just to serve data — it is to understand the fundamental mechanics of an HTTP server from first principles: how a request enters the server, how routing works without a framework, and how to write a response with the correct headers and status codes.

---

# 2. Project Structure

```
09. Node.js/
│
└── 01. Build a Node API/
    ├── package.json          → Project config: name="wild-horizons", type="module", start script
    ├── server.js             → HTTP server: routing logic, URL parsing, request handling
    ├── database/
    │   └── db.js             → getDataFromDB() — simulates an async database call
    ├── data/
    │   └── data.js           → Raw dataset: array of destination objects (exported as `data`)
    └── utils/
        ├── sendJSONResponse.js       → Sets headers, status code, serialises and ends response
        ├── getDataByPathParams.js    → Filters dataset by a single field (continent or country)
        └── getDataByQueryParams.js   → Filters dataset by arbitrary query string key-value pairs
```

---

# 3. What is Node.js?

**Node.js** is a JavaScript runtime built on Chrome's V8 engine. It allows JavaScript to run **outside the browser** — on a server, in a terminal, or as a build tool. Before Node.js, JavaScript was exclusively a browser language.

| Aspect | Browser JavaScript | Node.js JavaScript |
|--------|------------------|-------------------|
| Environment | Runs inside a web browser tab | Runs directly on the operating system |
| Global object | `window` | `global` (or `globalThis`) |
| DOM access | `document`, `navigator`, etc. | ❌ No DOM — no `document` or `window` |
| File system | ❌ Not accessible | ✅ `node:fs` module |
| HTTP | `fetch()` — client only | `node:http` — server AND client |
| Modules | ES Modules via `<script type="module">` | CommonJS (`require`) OR ES Modules (`import`) |
| Package manager | CDN links in `<head>` | npm / package.json |

> Every concept learned in the browser JavaScript modules (DOM, fetch, async/await, ES Modules) is still valid in Node.js — but the environment adds new capabilities (file system, network servers) and removes browser-specific APIs (DOM, geolocation, etc.).

---

# 4. What's New vs Browser JavaScript

## New Node.js Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `import http from 'node:http'` | `server.js` line 1 | Built-in Node HTTP module — creates TCP servers that speak HTTP |
| `http.createServer(callback)` | `server.js` line 9 | Returns a `Server` object; the callback fires for every incoming HTTP request |
| `server.listen(PORT, callback)` | `server.js` line 46 | Binds the server to a TCP port and starts accepting connections |
| `req.method` | `server.js` lines 16, 21, 27 | The HTTP verb of the incoming request: `"GET"`, `"POST"`, etc. |
| `req.url` | `server.js` line 12 | The raw URL string from the request line (e.g. `/api?country=france`) |
| `req.headers.host` | `server.js` line 12 | The `Host` header — used as base URL for `new URL()` parsing |
| `res.setHeader(name, value)` | `sendJSONResponse.js` | Sets a single HTTP response header |
| `res.statusCode = code` | `sendJSONResponse.js` | Sets the HTTP status code (200, 404, etc.) |
| `res.end(body)` | `sendJSONResponse.js` | Sends the response body and closes the connection |
| `new URL(relative, base)` | `server.js` line 12 | Parses `req.url` into structured `pathname` + `searchParams` |
| `urlObj.searchParams` | `server.js` line 14 | Iterator of query parameter key-value pairs |
| `Object.fromEntries()` | `server.js` line 14 | Converts `searchParams` iterator to a plain object |
| `"type": "module"` in package.json | `package.json` line 6 | Enables ES Module syntax (`import`/`export`) in `.js` files |
| `node:` protocol prefix | All imports | Distinguishes built-in Node modules from npm packages |

---

# 5. The `http` Module — Creating a Server

## 5.1 `http.createServer()`

```javascript
import http from 'node:http'

const server = http.createServer(async (req, res) => {
    // This callback fires for EVERY incoming request
    // req = IncomingMessage (the request)
    // res = ServerResponse (the response)
})

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
```

`http.createServer(callback)` creates a new HTTP server. The `callback` is called every time a client (browser, `curl`, Postman, another service) makes an HTTP request to the server. The server does not respond until the callback explicitly calls `res.end()`.

`server.listen(PORT)` starts the TCP listener — the server is now accepting connections on the given port. The optional callback fires once when the server is ready.

| Step | What happens |
|------|-------------|
| Client sends `GET /api HTTP/1.1` | OS buffers the TCP data |
| `http` module parses the request | Populates `req` object |
| Server callback fires | Your code runs with `req` and `res` |
| Code calls `res.end()` | Response is sent; TCP connection may close or keep-alive |

## 5.2 The `req` Object — Incoming Request

```javascript
req.url        // "/api?country=france" — raw URL string (path + query)
req.method     // "GET" — HTTP method
req.headers    // { host: "localhost:8000", accept: "*/*", ... }
req.headers.host // "localhost:8000" — used as base URL for URL parsing
```

`req` is a `Node.js IncomingMessage` object — a readable stream that also carries request metadata. For `GET` requests there is no body to read. For POST/PUT requests, the body arrives as streamed chunks (covered in the Fullstack Node App project).

## 5.3 The `res` Object — Outgoing Response

```javascript
res.setHeader('Content-Type', 'application/json')
res.statusCode = 200
res.end(JSON.stringify(data))
```

`res` is a `ServerResponse` object — a writable stream representing the HTTP response being sent back to the client. Key methods:

| Method / Property | What it does |
|------------------|-------------|
| `res.setHeader(name, value)` | Sets a single header (can be called multiple times) |
| `res.statusCode = code` | Sets the HTTP status line code (default `200`) |
| `res.end(body)` | Writes the body and signals the end of the response |
| `res.write(chunk)` | Writes a chunk without closing (used for streaming) |

> `res.end()` **must** be called for every request — if it is not called, the client waits forever (request timeout). This is the most common beginner mistake in raw Node.js HTTP servers.

---

# 6. URL Parsing in Node.js

## 6.1 `new URL(req.url, base)`

```javascript
const urlObj = new URL(req.url, `http://${req.headers.host}`)
```

`req.url` is a **relative** URL string — e.g. `/api?country=france`. The `URL` constructor requires a base URL when the first argument is relative. Using `http://${req.headers.host}` as the base (e.g. `http://localhost:8000`) produces a fully resolved URL object.

| `req.url` | Base | `urlObj.pathname` | `urlObj.searchParams` |
|-----------|------|------------------|----------------------|
| `/api` | `http://localhost:8000` | `/api` | (empty) |
| `/api?country=france` | `http://localhost:8000` | `/api` | `country=france` |
| `/api/continent/europe` | `http://localhost:8000` | `/api/continent/europe` | (empty) |

## 6.2 `urlObj.pathname` vs `req.url`

```javascript
// ❌ Fragile — includes query string
if (req.url === '/api') { ... }
// Only matches "/api" — fails for "/api?country=france"

// ✅ Robust — pathname excludes query string
if (urlObj.pathname === '/api') { ... }
// Matches both "/api" and "/api?country=france"
```

`urlObj.pathname` strips the query string and fragment from the URL, returning only the path component. Using `req.url` directly for route matching means `GET /api?country=france` would not match the `/api` route — the query string would break the equality check.

## 6.3 `Object.fromEntries(urlObj.searchParams)`

```javascript
const queryObj = Object.fromEntries(urlObj.searchParams)
// GET /api?country=france&continent=europe
// → { country: "france", continent: "europe" }
```

`urlObj.searchParams` is a `URLSearchParams` object — an iterable of `[key, value]` pairs. `Object.fromEntries()` converts any iterable of pairs into a plain object. The resulting `queryObj` can then be passed to filtering functions or checked with standard property access.

> This pattern (`Object.fromEntries(searchParams)`) is the cleanest way to turn a query string into a usable object in modern JavaScript. It was introduced in ES2019 and is available in Node.js 12+.

---

# 7. Routing — Path and Query Parameters

## 7.1 Manual `if/else` Routing

```javascript
if (urlObj.pathname === '/api' && req.method === 'GET') {
    // Handle GET /api (with optional query params)
} else if (req.url.startsWith('/api/continent') && req.method === 'GET') {
    // Handle GET /api/continent/:name
} else if (req.url.startsWith('/api/country') && req.method === 'GET') {
    // Handle GET /api/country/:name
} else {
    sendJSONResponse(res, 404, { error: "not found", message: "..." })
}
```

Without a framework like Express, routing is implemented as a chain of `if/else` conditions on `req.url`, `urlObj.pathname`, and `req.method`. This approach:

| Advantage | Disadvantage |
|-----------|-------------|
| Zero dependencies — pure Node.js | Verbose — each route is a separate `if` branch |
| Easy to understand the exact matching logic | Path parameter extraction is manual |
| Full control over every condition | No middleware system — must handle headers in every branch |

> Express.js (covered in folder 11) replaces this `if/else` chain with `app.get('/api', handler)` and provides `req.params`, `req.query`, and a middleware pipeline — making routing far more maintainable at scale.

## 7.2 Path Parameters — `req.url.split('/').pop()`

```javascript
// GET /api/continent/europe
const continent = req.url.split('/').pop()
// → "europe"

const filteredData = getDataByPathParams(destinations, 'continent', continent)
```

Path parameters are extracted manually by splitting the URL on `/` and taking the last segment with `.pop()`. For `/api/continent/europe`, `split('/')` produces `["", "api", "continent", "europe"]` — `.pop()` returns the last element `"europe"`.

This works reliably for single trailing parameters but would need more logic for multiple path segments or nested routes.

## 7.3 Query Parameters — `getDataByQueryParams`

```javascript
// GET /api?country=france&continent=europe
const queryObj = Object.fromEntries(urlObj.searchParams)
// → { country: "france", continent: "europe" }

let filteredData = getDataByQueryParams(destinations, queryObj)
```

Query parameters allow filtering by any combination of fields. The `getDataByQueryParams` utility iterates over the `queryObj` entries and applies `.filter()` for each — only returning destinations that match all provided criteria (an AND filter).

---

# 8. Response Helpers — `sendJSONResponse`

```javascript
// utils/sendJSONResponse.js
export const sendJSONResponse = (res, statusCode, payload) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    res.statusCode = statusCode
    res.end(JSON.stringify(payload))
}
```

`sendJSONResponse` is a utility function that encapsulates the repetitive steps every JSON endpoint needs: setting headers, setting the status code, serialising the payload, and ending the response. Without it, these four lines would be duplicated in every route branch.

`JSON.stringify(payload)` converts the JavaScript object or array to a JSON string — `res.end()` expects a string or `Buffer`, not an object.

| Parameter | Type | Example |
|-----------|------|---------|
| `res` | `ServerResponse` | The Node.js response object |
| `statusCode` | number | `200`, `404`, `500` |
| `payload` | object or array | `{ error: "not found" }` or destination array |

---

# 9. CORS Headers

```javascript
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'GET')
```

**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism that blocks JavaScript running on one origin (e.g. `http://localhost:5173`) from making requests to a different origin (e.g. `http://localhost:8000`) unless the server explicitly permits it via response headers.

| Header | Value | Effect |
|--------|-------|--------|
| `Access-Control-Allow-Origin` | `*` | Any origin may read this response |
| `Access-Control-Allow-Methods` | `GET` | Only GET requests are permitted cross-origin |

`*` means any website can query this API — acceptable for a public read-only dataset. A production API would list specific allowed origins instead of `*`.

> CORS headers are set by the **server** — not the client. The browser enforces CORS by checking the response headers after the request is made. A CORS error in the browser means the server did not include these headers (or included them incorrectly).

---

# 10. ES Modules in Node.js

## 10.1 `"type": "module"` in package.json

```json
{
    "name": "wild-horizons",
    "type": "module",
    "scripts": {
        "start": "node server.js"
    }
}
```

By default, Node.js treats `.js` files as **CommonJS** modules (using `require()` / `module.exports`). Setting `"type": "module"` in `package.json` switches all `.js` files in the project to **ES Module** mode — enabling `import`/`export` syntax.

| Mode | Import syntax | Export syntax | File extension |
|------|--------------|--------------|----------------|
| CommonJS (default) | `const x = require('./x')` | `module.exports = x` | `.js` or `.cjs` |
| ES Module | `import x from './x.js'` | `export const x = ...` | `.js` or `.mjs` |

## 10.2 Node-style Bare Specifiers

```javascript
import http from 'node:http'     // ← node: prefix = built-in module
import { data } from '../data/data.js'  // ← relative path with .js extension
```

In Node.js ES Modules, built-in modules are imported with the `node:` prefix (`node:http`, `node:fs`, `node:path`). The prefix is optional but recommended — it makes the distinction between built-ins and npm packages explicit.

Relative imports **must** include the `.js` file extension (unlike in bundlers such as Vite or Webpack that resolve extensions automatically). Omitting `.js` in Node.js ES Module mode causes a `Cannot find module` error.

---

# 11. The Database Layer — `getDataFromDB`

```javascript
// database/db.js
import { data } from "../data/data.js"

export async function getDataFromDB() {
    return data;
}
```

`getDataFromDB` is intentionally `async` even though it currently does no I/O — it just returns the in-memory `data` array. This simulates a real database call (which would be async) and keeps the `server.js` code consistent: `const destinations = await getDataFromDB()` works whether the data comes from memory or a real database.

This pattern — wrapping synchronous data access in an `async` function — is a common refactoring technique. When the project grows to use a real database (PostgreSQL, MongoDB, etc.), only `db.js` needs to change; `server.js` continues to `await getDataFromDB()` unchanged.

---

# 12. How the API Works — Request Flow

```
Client: GET /api?continent=europe
    │
    ▼
http.createServer callback fires
    │
    ├─ getDataFromDB()          → returns full destinations array
    ├─ new URL(req.url, base)   → parses pathname + searchParams
    ├─ Object.fromEntries(...)  → { continent: "europe" }
    │
    ├─ if (pathname === '/api' && method === 'GET')  ✅ matches
    │   ├─ getDataByQueryParams(destinations, { continent: "europe" })
    │   │   └─ data.filter(d => d.continent === "europe")
    │   └─ sendJSONResponse(res, 200, filteredData)
    │       ├─ Content-Type: application/json
    │       ├─ Access-Control-Allow-Origin: *
    │       ├─ statusCode = 200
    │       └─ res.end(JSON.stringify(filteredData))
    │
    ▼
Client receives: 200 OK with JSON array of European destinations
```

---

# 13. API Endpoints Reference

| Method | Route | Query Params | Description |
|--------|-------|-------------|-------------|
| `GET` | `/api` | `country`, `continent` (optional) | Returns all destinations, optionally filtered |
| `GET` | `/api/continent/:name` | — | Returns all destinations in a given continent |
| `GET` | `/api/country/:name` | — | Returns all destinations in a given country |
| Any | Any other route | — | Returns `404 { error: "not found", message: "..." }` |

---

# 14. How to Run

```bash
# Start the server
node server.js

# Or use the npm script defined in package.json
npm start
```

The server starts on `http://localhost:8000`. Test endpoints with a browser, Postman, or `curl`:

```bash
curl http://localhost:8000/api
curl http://localhost:8000/api?country=france
curl http://localhost:8000/api/continent/europe
curl http://localhost:8000/api/country/japan
```

No build step is required — Node.js runs the files directly. No `npm install` is needed since the project uses only built-in Node modules (`node:http`).

---

# 15. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 09. Node.js
* **Project:** 01. Build a Node API — Wild Horizons
