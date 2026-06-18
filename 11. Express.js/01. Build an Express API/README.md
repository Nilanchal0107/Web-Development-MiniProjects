# Startup Planet — Build an Express API

![Node.js](https://img.shields.io/badge/Node.js-v20%2B-339933?style=flat-square&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express-4.x-black?style=flat-square&logo=express)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![REST API](https://img.shields.io/badge/REST-API-teal?style=flat-square)
![CORS](https://img.shields.io/badge/Middleware-CORS-blue?style=flat-square)
![Query Params](https://img.shields.io/badge/Filtering-Query%20%26%20Path%20Params-orange?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A clean, framework-powered REST API for a global startup dataset — the **Startup Planet** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every Express.js concept introduced in this project, comparing what is new here against the Wild Horizons Node API and the Bigfoot Sightings fullstack app — specifically how Express.js replaces the manual `if/else` routing, raw header management, and URL parsing from those projects with a structured, declarative framework.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is Express.js?](#3-what-is-expressjs)
4. [What's New vs Raw Node.js APIs](#4-whats-new-vs-raw-nodejs-apis)
5. [Setting Up Express](#5-setting-up-express)
   - [`express()` — The Application Instance](#51-express--the-application-instance)
   - [`app.use()` — Mounting Middleware](#52-appuse--mounting-middleware)
   - [`app.listen()` — Starting the Server](#53-applisten--starting-the-server)
6. [CORS Middleware — `cors()`](#6-cors-middleware--cors)
7. [Express Router — `express.Router()`](#7-express-router--expressrouter)
   - [Why a Separate Router?](#71-why-a-separate-router)
   - [`apiRouter.get()` — Defining Routes](#72-apiroutergetsget--defining-routes)
8. [Route Handlers — Controllers](#8-route-handlers--controllers)
   - [`req.query` — Query Parameters](#81-reqquery--query-parameters)
   - [`req.params` — Path Parameters](#82-reqparams--path-parameters)
   - [`res.json()` — Sending JSON Responses](#83-resjson--sending-json-responses)
   - [`res.status().json()` — Error Responses](#84-resstatusjson--error-responses)
9. [Multi-Field Query Filtering — `getAllData`](#9-multi-field-query-filtering--getalldata)
10. [Path Parameter Filtering — `getDataByPathParams`](#10-path-parameter-filtering--getdatabypathparams)
    - [Field Allowlist Validation](#101-field-allowlist-validation)
11. [The 404 Catch-All Middleware](#11-the-404-catch-all-middleware)
12. [Node vs Express — Direct Comparison](#12-node-vs-express--direct-comparison)
13. [How the API Works — Request Flow](#13-how-the-api-works--request-flow)
14. [API Endpoints Reference](#14-api-endpoints-reference)
15. [How to Run](#15-how-to-run)
16. [Course Reference](#16-course-reference)

---

# 1. Project Overview

**Startup Planet** is a fictional global startup directory — a dataset of startups from around the world with fields like name, industry, country, continent, founding year, whether they are seeking funding, and whether they have an MVP. The project exposes this dataset as a REST API using **Express.js**.

The server:

* Listens on **port 8000** using Express — a minimal, unopinionated Node.js web framework
* Exposes `GET /api` with rich **query parameter filtering** — callers can filter by `industry`, `country`, `continent`, `is_seeking_funding`, and `has_mvp` in any combination
* Exposes `GET /api/:field/:term` with **path parameter filtering** — a generic route that filters by any allowed field (country, continent, or industry) and a search term
* Returns all data as **JSON** via `res.json()` — Express sets `Content-Type: application/json` automatically
* Returns structured `404` JSON errors via a catch-all middleware for any unrecognised route
* Uses the `cors` npm package as a single-line middleware — replacing the two manual `res.setHeader()` calls from the Node API project

The goal of this module is not just to rebuild the Wild Horizons API with Express — it is to understand what a **framework** buys you: automatic JSON serialization, declarative routing, a middleware pipeline, built-in request parsing, and a clean separation of routes from controllers.

---

# 2. Project Structure

```
11. Express.js/
│
└── 01. Build an Express API/
    ├── server.js              → Express app setup: cors middleware, router mount, 404 handler
    ├── routes/
    │   └── apiRoutes.js       → express.Router(): defines GET / and GET /:field/:term
    ├── controllers/
    │   ├── getAllData.js       → Handles GET /api — multi-field query filtering
    │   └── getDataByPathParams.js → Handles GET /api/:field/:term — path param filtering
    └── data/
        └── data.js            → Exported startups array — the raw dataset
```

---

# 3. What is Express.js?

**Express.js** is a minimal web application framework for Node.js. It wraps Node's built-in `http` module and provides:

| Feature | Raw Node.js (`http`) | Express.js |
|---------|---------------------|-----------|
| **Routing** | `if/else` on `req.url` + `req.method` | `app.get('/path', handler)` — declarative |
| **Query params** | `new URL(req.url, base)` → `Object.fromEntries(searchParams)` | `req.query` — auto-populated object |
| **Path params** | `req.url.split('/').pop()` | `req.params.name` — named capture from route pattern |
| **JSON response** | `res.setHeader(...); res.end(JSON.stringify(data))` | `res.json(data)` — one line |
| **Status codes** | `res.statusCode = 404` | `res.status(404).json(...)` — chainable |
| **CORS** | 2× `res.setHeader(...)` per route | `app.use(cors())` — one middleware, all routes |
| **Middleware** | Manually call helpers in each route | `app.use(fn)` — runs for every request automatically |
| **404 handling** | Final `else` branch in routing logic | Catch-all middleware after all routes |

> Express is not magic — it sits on top of the same `http.createServer()` and `req`/`res` objects from the raw Node.js modules. Everything Express does could be done manually; the framework simply eliminates repetitive boilerplate.

---

# 4. What's New vs Raw Node.js APIs

## New Express Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `import express from 'express'` | `server.js` line 1 | Imports the Express framework |
| `const app = express()` | `server.js` line 7 | Creates the Express application instance |
| `app.use(cors())` | `server.js` line 9 | Applies the CORS middleware to ALL routes globally |
| `app.use('/api', apiRouter)` | `server.js` line 11 | Mounts the router — all routes in `apiRouter` are prefixed with `/api` |
| `app.use((req, res) => { ... })` | `server.js` lines 13–15 | Catch-all middleware — handles any request not matched by a route |
| `app.listen(PORT, cb)` | `server.js` line 17 | Starts the server — identical API to `server.listen()` in raw Node |
| `express.Router()` | `apiRoutes.js` line 5 | Creates a mini-app with its own routing — mountable on a path prefix |
| `apiRouter.get('/', handler)` | `apiRoutes.js` line 7 | Registers a GET handler for the base route (`/api` when mounted) |
| `apiRouter.get('/:field/:term', handler)` | `apiRoutes.js` line 9 | Named path parameters — `:field` and `:term` captured automatically |
| `req.query` | `getAllData.js` line 7 | Plain object of all query parameters — `{ industry: "fintech", country: "India" }` |
| `req.params` | `getDataByPathParams.js` line 5 | Plain object of path parameters — `{ field: "country", term: "india" }` |
| `res.json(data)` | Both controllers | Serialises `data` to JSON, sets `Content-Type: application/json`, sends 200 |
| `res.status(404).json({ message })` | Both controllers + catch-all | Sets status code AND sends JSON — chainable |
| `import cors from 'cors'` | `server.js` line 3 | npm package that generates CORS headers for every response |

## Concepts Carried Over from Node.js Projects ↩

| Concept | Refined Here |
|---------|-------------|
| `import { data } from '../data/data.js'` | Dataset imported at module level — same pattern as Wild Horizons |
| `.filter()` with `.toLowerCase()` comparison | Core filtering logic unchanged — Express just delivers `req.query` instead of manually parsed query objects |
| Path parameter lookup | `req.params.field` replaces `req.url.split('/').pop()` |
| 404 JSON response | Now a single catch-all middleware instead of a final `else` branch |
| `node:http` | Used implicitly by Express — `app.listen()` calls `http.createServer()` internally |

---

# 5. Setting Up Express

## 5.1 `express()` — The Application Instance

```javascript
// server.js
import express from 'express'

const app = express()
```

`express()` returns an **application instance** — an object that is both a request handler (compatible with `http.createServer`) and a configuration surface for the entire application. All routes, middleware, and settings are attached to `app`.

## 5.2 `app.use()` — Mounting Middleware

```javascript
app.use(cors())
app.use('/api', apiRouter)
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })
})
```

`app.use(fn)` registers **middleware** — a function that runs for every incoming request (when no path is specified) or for every request matching a path prefix (when a path is given).

| `app.use()` call | Runs for | Effect |
|-----------------|---------|--------|
| `app.use(cors())` | Every request | Adds CORS headers to every response |
| `app.use('/api', apiRouter)` | Any request starting with `/api` | Delegates to the router |
| `app.use((req, res) => ...)` | Any request not matched above | Returns 404 JSON |

Middleware runs in **registration order** — the CORS middleware runs first, then the router, then the catch-all. This ordering matters: if the catch-all were registered before the router, it would intercept all requests before any route was matched.

## 5.3 `app.listen()` — Starting the Server

```javascript
app.listen(PORT, () => console.log(`server connected on port ${PORT}`))
```

`app.listen(PORT, callback)` is functionally identical to creating a raw Node `http.createServer(app).listen(PORT, callback)`. Express's `app` object is itself a valid `http.createServer` callback — it implements the `(req, res) => void` signature.

---

# 6. CORS Middleware — `cors()`

```javascript
import cors from 'cors'

app.use(cors())
```

In the Wild Horizons Node API, CORS headers were added manually inside `sendJSONResponse`:
```javascript
// ❌ Old way — must be in every response function
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'GET')
```

With the `cors` npm package, a single `app.use(cors())` call adds CORS headers to **every response** automatically — no matter how many routes are added later:

```javascript
// ✅ Express way — one line, covers all routes
app.use(cors())
```

The `cors()` function with no arguments uses permissive defaults: `Access-Control-Allow-Origin: *` (any origin) and all common HTTP methods. Fine-grained control is available via options:

```javascript
// Example: restrict to a specific origin
app.use(cors({ origin: 'https://myapp.com' }))
```

---

# 7. Express Router — `express.Router()`

## 7.1 Why a Separate Router?

```javascript
// routes/apiRoutes.js
import express from 'express'
import { getAllData } from '../controllers/getAllData.js'
import { getDataByPathParams } from '../controllers/getDataByPathParams.js'

export const apiRouter = express.Router()

apiRouter.get('/', getAllData)
apiRouter.get('/:field/:term', getDataByPathParams)
```

`express.Router()` creates a **mini Express application** — a self-contained routing unit with its own `.get()`, `.post()`, `.use()` methods. Routers are **mountable**: `app.use('/api', apiRouter)` attaches all routes in `apiRouter` under the `/api` prefix.

| Route in router | Mounted at | Full path |
|-----------------|-----------|-----------|
| `apiRouter.get('/')` | `/api` | `GET /api` |
| `apiRouter.get('/:field/:term')` | `/api` | `GET /api/:field/:term` |

This separation keeps `server.js` clean — it only knows that everything under `/api` is handled by `apiRouter`. Adding new API routes never requires touching `server.js`.

## 7.2 `apiRouter.get()` — Defining Routes

```javascript
apiRouter.get('/', getAllData)
apiRouter.get('/:field/:term', getDataByPathParams)
```

`router.get(path, handler)` registers a route for `GET` requests matching `path`. The `handler` is a standard Express **route handler** — a function with the signature `(req, res) => void`.

`:field` and `:term` are **named route parameters** — they match any URL segment and are made available as `req.params.field` and `req.params.term` in the handler. Compare to the raw Node.js approach of `req.url.split('/').pop()` — named parameters are self-documenting and handle any number of segments cleanly.

---

# 8. Route Handlers — Controllers

## 8.1 `req.query` — Query Parameters

```javascript
// controllers/getAllData.js
export const getAllData = (req, res) => {
    const { industry, country, continent, is_seeking_funding, has_mvp } = req.query
    // ...
}
```

Express automatically parses the query string of every request and populates `req.query` as a plain JavaScript object. No `new URL()`, no `Object.fromEntries()`, no `urlObj.searchParams` — the values are available directly.

| Request URL | `req.query` |
|------------|------------|
| `GET /api` | `{}` |
| `GET /api?country=india` | `{ country: 'india' }` |
| `GET /api?industry=fintech&continent=asia` | `{ industry: 'fintech', continent: 'asia' }` |
| `GET /api?is_seeking_funding=true` | `{ is_seeking_funding: 'true' }` — always a string |

> All `req.query` values are **strings** — even numeric or boolean-looking values. `is_seeking_funding=true` arrives as the string `"true"`, not the boolean `true`. Parsing is done with `JSON.parse(is_seeking_funding.toLowerCase())` to convert `"true"` → `true` and `"false"` → `false`.

## 8.2 `req.params` — Path Parameters

```javascript
// controllers/getDataByPathParams.js
export const getDataByPathParams = (req, res) => {
    const { field, term } = req.params
    // GET /api/country/india → { field: 'country', term: 'india' }
}
```

Express populates `req.params` from named segments in the route pattern. For `apiRouter.get('/:field/:term', ...)`, a request to `/api/country/india` produces `req.params = { field: 'country', term: 'india' }`.

Compare to the raw Node.js manual extraction:
```javascript
// ❌ Old Node.js way
const country = req.url.split('/').pop()

// ✅ Express way
const { field, term } = req.params
```

The Express approach is self-documenting (the parameter name is part of the route pattern), handles any depth of nesting, and works correctly regardless of query strings appended to the URL.

## 8.3 `res.json()` — Sending JSON Responses

```javascript
res.json(filteredData)
```

`res.json(value)` is the Express equivalent of:
```javascript
// Raw Node.js equivalent
res.setHeader('Content-Type', 'application/json')
res.statusCode = 200
res.end(JSON.stringify(value))
```

Express sets the `Content-Type: application/json` header automatically, serialises the value, and sends the response — all in one method call. The default status code is `200`.

## 8.4 `res.status().json()` — Error Responses

```javascript
// 404 — no matching data
return res.status(404).json({ message: "No startup found matching the criteria." })

// 400 — invalid field name
return res.status(400).json({ message: "Search field not allowed. ..." })
```

`res.status(code)` sets the HTTP status code and returns `res` — allowing `.json()` to be chained immediately after. The `return` before `res.status()` is important — it exits the handler function early, preventing the code below from also sending a response (which would cause an Express "headers already sent" error).

| Status code | Meaning | When used |
|-------------|---------|-----------|
| `200` | OK | Data found and returned |
| `400` | Bad Request | Invalid field name in path params |
| `404` | Not Found | Query matched zero records |

---

# 9. Multi-Field Query Filtering — `getAllData`

```javascript
// controllers/getAllData.js
export const getAllData = (req, res) => {
    let filteredData = startups

    const { industry, country, continent, is_seeking_funding, has_mvp } = req.query

    if (industry) {
        filteredData = filteredData.filter(startup =>
            startup.industry.toLowerCase() === industry.toLowerCase()
        )
    }
    if (country) {
        filteredData = filteredData.filter(startup =>
            startup.country.toLowerCase() === country.toLowerCase()
        )
    }
    if (continent) {
        filteredData = filteredData.filter(startup =>
            startup.continent.toLowerCase() === continent.toLowerCase()
        )
    }
    if (is_seeking_funding) {
        filteredData = filteredData.filter(startup =>
            startup.is_seeking_funding === JSON.parse(is_seeking_funding.toLowerCase())
        )
    }
    if (has_mvp) {
        filteredData = filteredData.filter(startup =>
            startup.has_mvp === JSON.parse(has_mvp.toLowerCase())
        )
    }

    if (filteredData.length === 0) {
        return res.status(404).json({ message: "No startup found matching the criteria." })
    }

    res.json(filteredData)
}
```

The filtering pattern is **sequential narrow-down**: start with the full dataset and apply each active filter one at a time. Each `.filter()` call reduces `filteredData` — only startups passing all filters survive.

| Step | `filteredData` contains |
|------|------------------------|
| Initial | All startups |
| After `industry` filter | Only startups in that industry |
| After `country` filter | Only those also in that country |
| After `is_seeking_funding` filter | Only those also seeking funding |
| Final | Startups matching ALL provided filters |

The `if (param)` guard before each filter check means the filter is only applied if the query parameter was actually provided — omitting a parameter leaves that dimension unfiltered.

**Boolean parsing:**
```javascript
startup.is_seeking_funding === JSON.parse(is_seeking_funding.toLowerCase())
// "true"  → JSON.parse("true")  → true  → compares to boolean field
// "false" → JSON.parse("false") → false → compares to boolean field
```

`JSON.parse("true")` converts the query string `"true"` to the boolean `true`. `.toLowerCase()` normalises `"True"` and `"TRUE"` before parsing.

---

# 10. Path Parameter Filtering — `getDataByPathParams`

```javascript
// controllers/getDataByPathParams.js
export const getDataByPathParams = (req, res) => {
    const { field, term } = req.params

    const allowedFields = ['country', 'continent', 'industry']

    if (!allowedFields.includes(field)) {
        return res.status(400).json({
            message: "Search field not allowed. Please use only country, continent, industry"
        })
    }

    const filteredData = startups.filter(
        startup => startup[field].toLowerCase() === term.toLowerCase()
    )

    if (filteredData.length === 0) {
        return res.status(404).json({ message: "No startup found matching the criteria." })
    }

    res.json(filteredData)
}
```

## 10.1 Field Allowlist Validation

```javascript
const allowedFields = ['country', 'continent', 'industry']

if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: "Search field not allowed. ..." })
}
```

The route `/:field/:term` is generic — it accepts any string as `:field`. Without validation, a caller could request `/api/revenue/1000000` and the filter `startup["revenue"]` would silently return an empty array (or, worse, a real field containing sensitive data).

The allowlist (`allowedFields.includes(field)`) is a security and UX guard — it rejects any field name not in the approved list with a `400 Bad Request` response and a helpful error message.

After validation, `startup[field]` uses **bracket notation** to dynamically access the property named by `field` — the same pattern as the dispatch map in the ReAct Agent.

```javascript
// For GET /api/country/india:
// field = "country", term = "india"
startup["country"].toLowerCase() === "india"
// → filters startups where startup.country is "india" (case-insensitive)
```

---

# 11. The 404 Catch-All Middleware

```javascript
// server.js
app.use((req, res) => {
    res.status(404).json({ message: "Endpoint not found. Please check the API documentation." })
})
```

In raw Node.js, the catch-all was the final `else` branch in the routing `if/else` chain. In Express, it is a middleware function registered after all routes with `app.use()`.

Because Express processes middleware in registration order, this catch-all only runs if no earlier route matched the request. Its placement at the **bottom of `server.js`**, after `app.use('/api', apiRouter)`, ensures it acts as a fallback for any path not handled by the router.

| Request | Matched by | Response |
|---------|-----------|---------|
| `GET /api` | `apiRouter.get('/')` | 200 — startups JSON |
| `GET /api/country/india` | `apiRouter.get('/:field/:term')` | 200 or 404 — filtered JSON |
| `GET /startups` | No route — catch-all fires | 404 — "Endpoint not found" |
| `POST /api` | No route (no POST defined) — catch-all fires | 404 — "Endpoint not found" |

---

# 12. Node vs Express — Direct Comparison

The same `/api` GET endpoint, in both approaches:

```javascript
// ❌ Raw Node.js — 15+ lines, manual everything
const server = http.createServer(async (req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)

    if (urlObj.pathname === '/api' && req.method === 'GET') {
        const data = await getDataFromDB()
        let filtered = getDataByQueryParams(data, queryObj)
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.statusCode = 200
        res.end(JSON.stringify(filtered))
    } else {
        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 404
        res.end(JSON.stringify({ error: "not found" }))
    }
})
```

```javascript
// ✅ Express — 3 lines in controller, routing separate
export const getAllData = (req, res) => {
    const { country } = req.query
    const filtered = startups.filter(s => s.country === country)
    res.json(filtered)
}
```

Express reduces the boilerplate from ~15 lines per route to ~3 lines of business logic — because it handles URL parsing, query string parsing, JSON serialization, Content-Type headers, and routing automatically.

---

# 13. How the API Works — Request Flow

```
Client: GET /api?industry=fintech&continent=asia
    │
    ▼
app.use(cors())           → adds CORS headers to the response
    │
    ▼
app.use('/api', apiRouter)  → path starts with /api → delegate to router
    │
    ▼
apiRouter.get('/')        → matches GET / (relative to /api mount)
    │
    ▼
getAllData(req, res)
    ├─ req.query = { industry: "fintech", continent: "asia" }
    ├─ filteredData = startups
    ├─ filter by industry "fintech"  → subset A
    ├─ filter by continent "asia"   → subset B (startups in A that are also in Asia)
    ├─ filteredData.length > 0      → send 200
    └─ res.json(filteredData)
         ├─ Content-Type: application/json  (automatic)
         ├─ Status: 200                     (default)
         └─ Body: JSON array of matching startups

Client: GET /api/country/india
    │
app.use(cors())
app.use('/api', apiRouter)
apiRouter.get('/:field/:term')   → field = "country", term = "india"
    │
getDataByPathParams(req, res)
    ├─ allowedFields.includes("country")  → ✅ valid
    ├─ startups.filter(s => s.country.toLowerCase() === "india")
    └─ res.json(filteredData)
```

---

# 14. API Endpoints Reference

| Method | Route | Query Params | Description |
|--------|-------|-------------|-------------|
| `GET` | `/api` | `industry`, `country`, `continent`, `is_seeking_funding`, `has_mvp` (all optional) | Returns all startups, filtered by any combination of query parameters |
| `GET` | `/api/:field/:term` | — | Returns startups where `startup[field] === term` (field must be `country`, `continent`, or `industry`) |
| Any | Any other route | — | `404 { message: "Endpoint not found..." }` |

**Example queries:**
```
GET /api
GET /api?industry=fintech
GET /api?country=india&is_seeking_funding=true
GET /api?continent=asia&has_mvp=false
GET /api/country/india
GET /api/continent/europe
GET /api/industry/healthtech
```

---

# 15. How to Run

```bash
# Install dependencies (express + cors)
npm install

# Start the server
node server.js
```

The server starts on `http://localhost:8000`. Test endpoints with a browser, Postman, or `curl`:

```bash
curl http://localhost:8000/api
curl "http://localhost:8000/api?industry=fintech&continent=asia"
curl http://localhost:8000/api/country/india
curl http://localhost:8000/api/continent/europe
```

No build step is required — Node.js runs the files directly. The project requires `npm install` because it depends on two npm packages: `express` and `cors`.

---

# 16. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 11. Express.js
* **Project:** 01. Build an Express API — Startup Planet
