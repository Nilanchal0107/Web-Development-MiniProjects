# Vinyl Shop — Build a FullStack Express App

![Node.js](https://img.shields.io/badge/Node.js-v20%2B-339933?style=flat-square&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express.js-4.x-black?style=flat-square&logo=express)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite)
![HTML](https://img.shields.io/badge/HTML-Frontend-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![REST API](https://img.shields.io/badge/REST-API%20Design-teal?style=flat-square)
![Full Stack](https://img.shields.io/badge/Full%20Stack-Frontend%20%2B%20Backend-purple?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A full-stack Express.js application that serves a vinyl record shop — a static HTML/CSS/JS frontend paired with an SQLite-backed JSON API — the **Vinyl Shop** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every fullstack Express.js concept introduced in this module, comparing what is new here against the Node.js Fullstack App (09/02) and the Build an Express API (11/01) covered in earlier folders.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Previous Projects](#3-whats-new-vs-previous-projects)
4. [Express.js Fundamentals](#4-expressjs-fundamentals)
   - [`express.static()` — Serving the Frontend](#41-expressstatic--serving-the-frontend)
   - [`express.Router()` — Modular Route Files](#42-expressrouter--modular-route-files)
   - [Middleware and `app.use()`](#43-middleware-and-appuse)
5. [SQLite Database Integration](#5-sqlite-database-integration)
   - [`db.js` — Shared DB Connection](#51-dbjs--shared-db-connection)
   - [`createTable.js` — Schema Creation](#52-createtablejs--schema-creation)
   - [`seedTable.js` — Populating Data with Transactions](#53-seedtablejs--populating-data-with-transactions)
6. [The MVC Pattern — Controllers, Routes, Server](#6-the-mvc-pattern--controllers-routes-server)
   - [`server.js` — Entry Point](#61-serverjs--entry-point)
   - [`routes/products.js` — Route Definitions](#62-routesproductsjs--route-definitions)
   - [`controllers/productsControllers.js` — Business Logic](#63-controllersproductscontrollersjs--business-logic)
7. [Query Parameters — Filtering and Search](#7-query-parameters--filtering-and-search)
   - [`req.query` — Reading URL Parameters](#71-reqquery--reading-url-parameters)
   - [Parameterised SQL Queries](#72-parameterised-sql-queries)
8. [The Frontend — `public/` Directory](#8-the-frontend--public-directory)
   - [`URLSearchParams` — Building Query Strings](#81-urlsearchparams--building-query-strings)
   - [Genre Dropdown — `populateGenreSelect()`](#82-genre-dropdown--populategenreselect)
   - [Search Filter — `applySearchFilter()`](#83-search-filter--applysearchfilter)
9. [How the Full App Flow Works](#9-how-the-full-app-flow-works)
10. [HTML Structure Recap — Server Entry Point](#10-html-structure-recap--server-entry-point)
11. [How to Run](#11-how-to-run)
12. [Course Reference](#12-course-reference)

---

# 1. Project Overview

**Vinyl Shop** is a full-stack record store browser where users can view a catalogue of vinyl albums, filter by genre using a dropdown, and search by title, artist, or genre using a live search bar. The server serves a complete HTML/CSS/JS frontend from a `public/` folder while simultaneously exposing a JSON API backed by an SQLite database.

The server includes:

* A **`GET /api/products`** endpoint that returns all products from the database, with optional `?genre=` and `?search=` query parameter filtering
* A **`GET /api/products/genres`** endpoint that returns a deduplicated list of genre strings for populating the dropdown
* An **`express.static('public')`** middleware that serves all HTML, CSS, JavaScript, and image files from the `public/` folder
* A **`productsRouter`** using `express.Router()` that isolates all product-related routes in a dedicated file
* A **`productsControllers.js`** file that separates SQL query logic from route definitions
* A **`createTable.js`** script that defines the SQLite schema and a **`seedTable.js`** script that bulk-inserts product records using SQL transactions
* A **`db.js`** module that creates and caches a single shared database connection used across all controllers

The goal of this module is not just to build a product listing page — it is to understand how Express.js simplifies routing, how to separate concerns into the MVC pattern (Models, Views, Controllers), how SQLite integrates with a Node.js backend, and how query parameters power live filtering without page reloads.

---

# 2. Project Structure

```
11. Express.js/
│
└── 02. Build a FullStack Express App/
    ├── server.js                     → Entry point: mounts middleware and routes
    ├── createTable.js                → One-time script: creates the products SQLite table
    ├── seedTable.js                  → One-time script: bulk-inserts vinyl records from data.js
    ├── logTable.js                   → Utility script: prints table contents to console
    ├── data.js                       → Static array of vinyl record objects (seed data)
    ├── db/
    │   └── db.js                     → Opens and caches the SQLite connection
    ├── routes/
    │   └── products.js               → Defines GET /genres and GET / routes on the router
    ├── controllers/
    │   └── productsControllers.js    → getGenres() and getProducts() — SQL + response logic
    └── public/
        ├── index.html                → Shop frontend — dropdown, search bar, product grid
        ├── index.css                 → Styles for navbar, cards, filters
        ├── index.js                  → Frontend JS: fetch, render, filter, search logic
        └── images/                   → Album cover images served statically
```

---

# 3. What's New vs Previous Projects

## New Express.js Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `import express from 'express'` | `server.js` line 1 | Loads the Express framework — replaces `import http from 'node:http'` |
| `express()` | `server.js` line 4 | Creates the Express application instance |
| `app.use(express.static('public'))` | `server.js` line 7 | Serves all files in `public/` automatically — replaces manual `serveStatic` |
| `express.Router()` | `routes/products.js` line 4 | Creates a mini-app to group related routes — replaces manual `if/else` routing |
| `app.use('/api/products', productsRouter)` | `server.js` line 9 | Mounts the router at a base path — all routes inside get `/api/products` prepended |
| `router.get('/genres', handler)` | `routes/products.js` line 6 | Registers a handler for `GET /api/products/genres` |
| `router.get('/', handler)` | `routes/products.js` line 7 | Registers a handler for `GET /api/products` |
| `app.listen(PORT, callback)` | `server.js` line 11 | Starts the HTTP server — replaces `http.createServer().listen()` |
| `res.json(data)` | Both controllers | Sends a JSON response with correct `Content-Type: application/json` header automatically |
| `res.status(500).json(...)` | Both controllers | Chains status code and JSON response in one call |

## New SQLite Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `open({ filename, driver })` | `db/db.js` | Opens a SQLite database file with the `sqlite` wrapper |
| `db.all(query, params)` | Both controllers | Executes a SELECT query and returns all matching rows as an array |
| `db.exec('BEGIN TRANSACTION')` | `seedTable.js` line 15 | Starts an atomic transaction — all inserts succeed or all rollback |
| `db.run(INSERT ...)` | `seedTable.js` line 19 | Executes a data-modifying SQL statement |
| `db.exec('COMMIT')` | `seedTable.js` line 27 | Commits the transaction — makes all inserts permanent |
| `db.exec('ROLLBACK')` | `seedTable.js` line 32 | Reverts all inserts if any one fails |
| `CREATE TABLE IF NOT EXISTS` | `createTable.js` line 13 | Creates the table only if it doesn't exist — safe to run repeatedly |
| `SELECT DISTINCT genre FROM products` | `productsControllers.js` line 9 | Returns unique genre values — prevents duplicates in the dropdown |
| `WHERE title LIKE ? OR artist LIKE ?` | `productsControllers.js` line 38 | Full-text search across multiple columns using SQL `LIKE` |
| `%${search}%` pattern | `productsControllers.js` line 39 | The `%` wildcard matches any characters before/after the search term |

## New Frontend Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `new URLSearchParams(filters)` | `public/index.js` line 12 | Converts a plain JS object into a URL query string: `?genre=Rock` |
| `fetch('/api/products?${queryParams}')` | `public/index.js` line 13 | Relative API fetch with dynamic query parameters appended |
| `document.createElement('option')` | `public/index.js` line 62 | Creates `<option>` elements programmatically for the genre dropdown |
| `select.appendChild(option)` | `public/index.js` line 65 | Adds each genre option to the `<select>` element |
| `e.target.value` | `public/index.js` line 100 | Reads the currently selected dropdown value on `change` event |

## Concepts Carried Over from Node.js Fullstack App ↩

| Concept | Refined Here |
|---------|-------------|
| Static file serving | Replaced by `express.static()` — one line vs a full `serveStatic` utility |
| Manual `if/else` routing | Replaced by `express.Router()` — declarative route registration |
| `async/await` throughout | All controller functions are async — DB calls all return Promises |
| `res.end()` + `res.setHeader()` | Replaced by `res.json()` — handles headers automatically |

---

# 4. Express.js Fundamentals

## 4.1 `express.static()` — Serving the Frontend

```javascript
// server.js
app.use(express.static('public'))
```

`express.static('public')` is built-in Express middleware that automatically serves every file inside the `public/` directory. When a browser requests `/index.html`, `/ ` (the root), `/index.css`, or `/images/album.jpg`, Express reads the file from disk and sends it with the correct `Content-Type` header — no custom file-serving logic needed.

Compare this to the Node.js Fullstack App (09/02) where an entire `serveStatic.js` utility was written manually — `express.static()` replaces all of that in a single line.

| Request URL | File Served |
|-------------|------------|
| `/` | `public/index.html` |
| `/index.css` | `public/index.css` |
| `/index.js` | `public/index.js` |
| `/images/thriller.jpg` | `public/images/thriller.jpg` |

> `app.use(express.static('public'))` must be registered **before** API routes if you want static files to short-circuit the route handlers for asset requests. In this project, it is placed at line 7, before the router is mounted at line 9.

## 4.2 `express.Router()` — Modular Route Files

```javascript
// routes/products.js
import express from 'express'
import { getGenres, getProducts } from '../controllers/productsControllers.js'

export const productsRouter = express.Router()

productsRouter.get('/genres', getGenres)
productsRouter.get('/', getProducts)
```

`express.Router()` creates a **mini Express application** — a self-contained set of routes that can be mounted at any base path in the main `server.js`. Each route registered on the router is relative to the mount point.

When mounted with `app.use('/api/products', productsRouter)`, the routes resolve as:

| Router-relative path | Full resolved path |
|---------------------|-------------------|
| `/genres` | `GET /api/products/genres` |
| `/` | `GET /api/products` |

> Route order matters within a router. `/genres` must be registered **before** `/` with a parameter (e.g., `/:id`) — otherwise Express would match `/genres` as an `:id` parameter value.

## 4.3 Middleware and `app.use()`

```javascript
// server.js — middleware registration order
app.use(express.static('public'))   // 1. Serve static files
app.use('/api/products', productsRouter)  // 2. Mount router
```

**Middleware** in Express is any function with the signature `(req, res, next)`. `app.use()` registers middleware globally or at a path prefix. Express processes middleware in the order it is registered — the first `app.use()` call wins for matching requests.

`express.static()` is itself a middleware function — when a file is found in `public/`, it sends the response and the request chain stops. When no file matches, it calls `next()` internally and control falls through to the router.

---

# 5. SQLite Database Integration

## 5.1 `db.js` — Shared DB Connection

```javascript
// db/db.js
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db

export async function getDBConnection() {
  if (!db) {
    db = await open({
      filename: 'database.db',
      driver: sqlite3.Database
    })
  }
  return db
}
```

`getDBConnection()` implements the **singleton pattern** — the database connection is created once on first call and reused on every subsequent call. Without this, every request would open a new file handle to `database.db`, exhausting OS resources quickly.

`open()` from the `sqlite` package wraps the callback-based `sqlite3` driver with a Promise-based API, making it compatible with `async/await`.

| Package | Role |
|---------|------|
| `sqlite3` | Low-level C++ bindings — talks directly to the SQLite file |
| `sqlite` | Thin Promise wrapper — exposes `db.all()`, `db.get()`, `db.run()` as async functions |

## 5.2 `createTable.js` — Schema Creation

```javascript
// createTable.js
await db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    title   TEXT    NOT NULL,
    artist  TEXT    NOT NULL,
    price   REAL    NOT NULL,
    image   TEXT    NOT NULL,
    year    INTEGER,
    genre   TEXT,
    stock   INTEGER
  )
`)
```

`CREATE TABLE IF NOT EXISTS` is a safe idempotent operation — it creates the table on the first run and does nothing on subsequent runs. This script is run manually once before starting the server, not on every request.

| Column | Type | Constraint |
|--------|------|-----------|
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` — unique, auto-assigned |
| `title`, `artist`, `image` | `TEXT` | `NOT NULL` — required fields |
| `price` | `REAL` | Floating-point number — `NOT NULL` |
| `year`, `genre`, `stock` | `INTEGER` / `TEXT` | Optional — `NULL` allowed |

## 5.3 `seedTable.js` — Populating Data with Transactions

```javascript
// seedTable.js
await db.exec('BEGIN TRANSACTION')

for (const { title, artist, price, image, year, genre, stock } of vinyl) {
  await db.run(
    `INSERT INTO products (title, artist, price, image, year, genre, stock)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, artist, price, image, year, genre, stock]
  )
}

await db.exec('COMMIT')
```

**SQL Transactions** group multiple statements into a single atomic operation. `BEGIN TRANSACTION` starts the batch, `COMMIT` makes all inserts permanent, and `ROLLBACK` (in the `catch` block) undoes every insert if any one fails.

The `?` placeholders in the SQL string are **parameterised queries** — SQLite substitutes the array values in order. This prevents **SQL injection** — user-controlled values are never interpolated directly into the SQL string.

```
// ❌ Bad — SQL injection risk
`INSERT INTO products (title) VALUES ('${title}')`

// ✅ Good — parameterised placeholder
`INSERT INTO products (title) VALUES (?)`, [title]
```

> Always use parameterised queries (`?` placeholders) when inserting user-controlled or external data. Direct string interpolation into SQL allows an attacker to inject `'; DROP TABLE products; --` as a value.

---

# 6. The MVC Pattern — Controllers, Routes, Server

## 6.1 `server.js` — Entry Point

```javascript
// server.js
import express from 'express'
import { productsRouter } from './routes/products.js'

const app = express()
const PORT = 8000

app.use(express.static('public'))
app.use('/api/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
```

`server.js` acts as the **composition root** — it creates the Express app, registers global middleware, mounts routers, and starts the server. It knows *what* routes exist but not *how* they work — that logic is delegated.

## 6.2 `routes/products.js` — Route Definitions

```javascript
// routes/products.js
export const productsRouter = express.Router()

productsRouter.get('/genres', getGenres)
productsRouter.get('/', getProducts)
```

The routes file declares *which* URL patterns map to *which* controller functions. It imports handlers from the controllers file and assigns them to paths — no SQL, no business logic lives here.

## 6.3 `controllers/productsControllers.js` — Business Logic

```javascript
// controllers/productsControllers.js
export async function getGenres(req, res) {
  const db = await getDBConnection()
  const genreRows = await db.all('SELECT DISTINCT genre FROM products')
  const genres = genreRows.map(row => row.genre)
  res.json(genres)
}

export async function getProducts(req, res) {
  const db = await getDBConnection()
  let query = 'SELECT * FROM products'
  let params = []

  const { genre, search } = req.query

  if (genre) {
    query += ' WHERE genre = ?'
    params.push(genre)
  } else if (search) {
    query += ' WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ?'
    const searchPattern = `%${search}%`
    params.push(searchPattern, searchPattern, searchPattern)
  }

  const products = await db.all(query, params)
  res.json(products)
}
```

Controllers contain the actual logic — database queries, data transformation, and response construction. They receive `(req, res)` from the router and call `res.json()` to terminate the request.

| Layer | File | Responsibility |
|-------|------|---------------|
| Server | `server.js` | App setup, middleware, port, mounting |
| Router | `routes/products.js` | URL pattern → controller mapping |
| Controller | `controllers/productsControllers.js` | DB queries, response logic |

---

# 7. Query Parameters — Filtering and Search

## 7.1 `req.query` — Reading URL Parameters

```javascript
// controllers/productsControllers.js
const { genre, search } = req.query
```

When a browser makes a request to `/api/products?genre=Rock`, Express automatically parses the query string and exposes each key-value pair on `req.query`. No manual URL parsing is needed.

| URL | `req.query` value |
|-----|-----------------|
| `/api/products` | `{}` (empty object) |
| `/api/products?genre=Rock` | `{ genre: 'Rock' }` |
| `/api/products?search=Miles` | `{ search: 'Miles' }` |

> `req.query` values are always strings — even if the URL contains `?id=5`, `req.query.id` is `"5"` (string), not `5` (number). Always parse or validate query values before using them in SQL.

## 7.2 Parameterised SQL Queries

```javascript
// Exact genre match
query += ' WHERE genre = ?'
params.push(genre)

// Full-text search across 3 columns
query += ' WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ?'
const searchPattern = `%${search}%`
params.push(searchPattern, searchPattern, searchPattern)
```

`LIKE` in SQL performs pattern matching. `%` is a wildcard that matches zero or more characters. `%miles%` matches "Miles Davis", "Three Miles Out", and "Miles".

The dynamic query builder pattern builds the SQL string in parts (`let query = 'SELECT * FROM products'`) and pushes parameters into an array, then passes both to `db.all(query, params)`. This keeps the query safe and composable.

---

# 8. The Frontend — `public/` Directory

## 8.1 `URLSearchParams` — Building Query Strings

```javascript
// public/index.js
async function getProducts(filters = {}) {
  const queryParams = new URLSearchParams(filters)
  const res = await fetch(`/api/products?${queryParams}`)
  return await res.json()
}
```

`URLSearchParams` converts a plain JavaScript object into a properly encoded URL query string. Calling `new URLSearchParams({ genre: 'Rock' }).toString()` produces `"genre=Rock"` — with special characters correctly percent-encoded.

| Input object | `URLSearchParams` output |
|-------------|------------------------|
| `{ genre: 'Rock' }` | `genre=Rock` |
| `{ search: 'Miles Davis' }` | `search=Miles+Davis` |
| `{}` | (empty string — no `?` added) |

> `fetch('/api/products?${queryParams}')` uses a relative URL — it resolves to the same host that served the frontend HTML. This avoids **CORS** (Cross-Origin Resource Sharing) issues entirely since the frontend and API are on the same origin.

## 8.2 Genre Dropdown — `populateGenreSelect()`

```javascript
// public/index.js
async function populateGenreSelect() {
  const res = await fetch('/api/products/genres')
  const genres = await res.json()  // ['Rock', 'Jazz', 'Pop', ...]
  const select = document.getElementById('genre-select')

  genres.forEach(genre => {
    const option = document.createElement('option')
    option.value = genre
    option.textContent = genre
    select.appendChild(option)
  })
}
```

Rather than hardcoding genres in HTML, the dropdown is populated dynamically by fetching the `/api/products/genres` endpoint. This means the UI stays in sync with the database automatically — adding a new genre to the database makes it appear in the dropdown without any frontend change.

## 8.3 Search Filter — `applySearchFilter()`

```javascript
// public/index.js
async function applySearchFilter() {
  const search = document.getElementById('search-input').value.trim()
  const filters = {}
  if (search) filters.search = search

  const products = await getProducts(filters)
  renderProducts(products)
}

document.getElementById('search-input').addEventListener('input', (e) => {
  e.preventDefault()
  applySearchFilter()
})
```

The `input` event fires on every keystroke — not just when the user presses Enter — producing **live search** behaviour. Every character typed triggers a new fetch with the updated search term, and the product grid re-renders with filtered results.

| Event | When it fires | Used for |
|-------|--------------|---------|
| `input` | Every character typed | Live filtering — fires continuously |
| `change` | When element loses focus | Genre dropdown selection |
| `submit` | Form submission (Enter key) | Prevented with `e.preventDefault()` |

---

# 9. How the Full App Flow Works

```
┌─────────────────── BROWSER ───────────────────────────────┐
│ User visits http://localhost:8000                         │
│   └─ GET /  → express.static → serves public/index.html  │
│                                                           │
│ index.js runs → init()                                    │
│   ├─ populateGenreSelect()                                │
│   │   └─ GET /api/products/genres → genres array         │
│   │       └─ forEach → creates <option> per genre        │
│   └─ getProducts({}) → fetch /api/products               │
│       └─ renderProducts(data) → builds product cards     │
│                                                           │
│ User types in search box                                  │
│   └─ 'input' event → applySearchFilter()                 │
│       └─ GET /api/products?search=miles                  │
│           └─ SQL LIKE %miles% → filtered results         │
│                                                           │
│ User selects genre from dropdown                          │
│   └─ 'change' event → getProducts({ genre })             │
│       └─ GET /api/products?genre=Rock                    │
│           └─ SQL WHERE genre = 'Rock' → filtered results │
└────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────── SERVER ───────────────────────────────┐
│ GET /api/products/genres                                  │
│   └─ getGenres() → SELECT DISTINCT genre FROM products   │
│       └─ res.json(['Rock', 'Jazz', 'Pop', ...])          │
│                                                           │
│ GET /api/products?genre=Rock                              │
│   └─ getProducts() → req.query = { genre: 'Rock' }       │
│       └─ WHERE genre = ? params: ['Rock']                │
│       └─ db.all(query, params) → res.json(rows)          │
│                                                           │
│ GET /api/products?search=miles                            │
│   └─ getProducts() → req.query = { search: 'miles' }     │
│       └─ WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ?│
│       └─ params: ['%miles%', '%miles%', '%miles%']       │
│       └─ db.all(query, params) → res.json(rows)          │
└───────────────────────────────────────────────────────────┘
```

---

# 10. HTML Structure Recap — Server Entry Point

```
server.js (entry point)
│
├── import express
├── import { productsRouter } from './routes/products.js'
│
└── const app = express()
    ├── app.use(express.static('public'))
    │   └── Serves: index.html, index.css, index.js, /images/*
    │
    └── app.use('/api/products', productsRouter)
        ├── productsRouter.get('/genres', getGenres)
        │   └── SELECT DISTINCT genre FROM products → res.json(genres)
        └── productsRouter.get('/', getProducts)
            ├── req.query.genre  → WHERE genre = ?
            ├── req.query.search → WHERE title LIKE ? OR artist LIKE ?
            └── db.all(query, params) → res.json(products)

public/index.html
├── <head>
│   ├── <link> → Google Fonts (Inter)
│   └── <link> → /index.css
│
└── <body>
    ├── <header>
    │   ├── <nav> → logo + hamburger menu toggle
    │   └── <ul class="header-menu"> → navigation links
    ├── <main>
    │   ├── <form> → search bar + genre <select> dropdown
    │   └── <div id="products-container"> → populated by JS
    └── <script src="/index.js" type="module">
```

---

# 11. How to Run

```bash
# 1. Install dependencies
npm install

# 2. Create the SQLite table (run once)
node createTable.js

# 3. Seed the database with vinyl records (run once)
node seedTable.js

# 4. Start the server
node server.js
```

The server starts at `http://localhost:8000`. Visit:

- `http://localhost:8000` — the vinyl shop frontend
- `http://localhost:8000/api/products` — raw JSON for all products
- `http://localhost:8000/api/products?genre=Rock` — filtered by genre
- `http://localhost:8000/api/products?search=miles` — search query

No build step is required. The frontend files in `public/` are served directly by Express.

---

# 12. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 11. Express.js
* **Project:** 02. Build a FullStack Express App — Vinyl Shop
