# Vinyl Shop Auth — Authentication

![Node.js](https://img.shields.io/badge/Node.js-v20%2B-339933?style=flat-square&logo=nodedotjs)
![Express](https://img.shields.io/badge/Express.js-4.x-black?style=flat-square&logo=express)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite)
![bcrypt](https://img.shields.io/badge/bcryptjs-Password%20Hashing-red?style=flat-square)
![Sessions](https://img.shields.io/badge/express--session-Session%20Auth-orange?style=flat-square)
![Validation](https://img.shields.io/badge/validator.js-Input%20Validation-blue?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

An authentication-extended full-stack Express application — the **Vinyl Shop Auth** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every authentication concept introduced in this module, comparing what is new here against the Vinyl Shop (11/02) covered in the previous folder — specifically the addition of user registration, password hashing, session management, protected routes, and a shopping cart.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Build a FullStack Express App](#3-whats-new-vs-build-a-fullstack-express-app)
4. [User Registration — `/api/auth/register`](#4-user-registration--apiauthregister)
   - [Input Validation](#41-input-validation)
   - [Duplicate Check](#42-duplicate-check)
   - [Password Hashing with `bcryptjs`](#43-password-hashing-with-bcryptjs)
5. [Sessions — `express-session`](#5-sessions--express-session)
   - [Session Configuration](#51-session-configuration)
   - [`req.session.userId` — Persisting Login State](#52-reqsessionuserid--persisting-login-state)
6. [User Login — `/api/auth/login`](#6-user-login--apiauthlogin)
7. [Protected Routes — `requireAuth` Middleware](#7-protected-routes--requireauth-middleware)
8. [The `/api/auth/me` Endpoint](#8-the-apiauthme-endpoint)
9. [Shopping Cart — `/api/cart`](#9-shopping-cart--apicart)
   - [`addToCart` — Upsert Pattern](#91-addtocart--upsert-pattern)
   - [`getCartCount`, `getAll`, `deleteItem`, `deleteAll`](#92-getcartcount-getall-deleteitem-deleteall)
10. [The Frontend — Multi-Page App](#10-the-frontend--multi-page-app)
    - [`signup.html` / `login.html`](#101-signuphtml--loginhtml)
    - [Cart Page — `cart.html`](#102-cart-page--carthtml)
11. [How the Full App Flow Works](#11-how-the-full-app-flow-works)
12. [HTML Structure Recap — Server Entry Point](#12-html-structure-recap--server-entry-point)
13. [How to Run](#13-how-to-run)
14. [Course Reference](#14-course-reference)

---

# 1. Project Overview

**Vinyl Shop Auth** extends the previous Vinyl Shop with a complete authentication system. Users can register with a name, email, username and password; log in to receive a server-side session; browse and add vinyl records to a personal cart; and view or clear their cart — with all cart routes protected so only logged-in users can access them.

The server includes:

* A **`POST /api/auth/register`** endpoint that validates input, checks for duplicates, hashes the password with `bcrypt`, inserts the user into the database, and begins a session
* A **`POST /api/auth/login`** endpoint that retrieves the user by username, compares the submitted password against the stored hash, and writes `req.session.userId` on success
* A **`POST /api/auth/logout`** endpoint that destroys the session
* A **`GET /api/auth/me`** endpoint that reads `req.session.userId` and returns the user's name (or `{ isLoggedIn: false }`)
* A **`requireAuth`** middleware function that guards every cart route — returning `401 Unauthorized` if no session exists
* A full **`/api/cart`** set of endpoints: add, get count, get all, delete one item, delete all — each protected by `requireAuth`
* An `express-session` configuration with a server-side session store, `httpOnly` cookie, and a secret loaded from an environment variable

The goal of this module is not just to add a login page — it is to understand the security principles behind server-side session authentication: why passwords must be hashed and never stored in plain text, why sessions live on the server not the client, how middleware can act as an authentication gate, and how to protect individual routes without repeating logic.

---

# 2. Project Structure

```
11. Express.js/
│
└── 03. Authentication/
    ├── server.js                     → Entry point: mounts session, middleware, and all routers
    ├── logTable.js                   → Utility: prints table contents to console
    ├── database.db                   → SQLite file — users, products, cart_items tables
    ├── db/
    │   └── db.js                     → Opens and caches the SQLite connection
    ├── middleware/
    │   └── requireAuth.js            → Guards protected routes — checks req.session.userId
    ├── routes/
    │   ├── auth.js                   → POST /register, /login, /logout
    │   ├── me.js                     → GET / (returns current user info)
    │   ├── products.js               → GET / and /genres (same as previous project)
    │   └── cart.js                   → POST /add, GET /cart-count, GET /, DELETE /all, DELETE /:itemId
    ├── controllers/
    │   ├── authController.js         → registerUser(), loginUser(), logoutUser()
    │   ├── meController.js           → getCurrentUser()
    │   ├── productsController.js     → getGenres(), getProducts()
    │   └── cartController.js         → addToCart(), getCartCount(), getAll(), deleteItem(), deleteAll()
    └── public/
        ├── index.html                → Shop frontend — same as before + cart count display
        ├── signup.html               → Registration form: name, email, username, password
        ├── login.html                → Login form: username, password
        ├── cart.html                 → Cart page: lists items + quantity + delete controls
        ├── css/
        │   └── index.css             → Shared styles
        ├── js/
        │   ├── index.js              → Main shop JS + auth-aware UI
        │   ├── signup.js             → Handles register form submission
        │   ├── login.js              → Handles login form submission
        │   └── cart.js               → Fetches and renders cart items
        └── images/                   → Album cover images
```

---

# 3. What's New vs Build a FullStack Express App

## New Authentication Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `import session from 'express-session'` | `server.js` line 6 | Loads the session middleware package |
| `app.use(session({ secret, resave, saveUninitialized, cookie }))` | `server.js` line 14 | Registers session middleware — creates/reads session cookies on every request |
| `req.session.userId = result.lastID` | `authController.js` line 46 | Stores the logged-in user's ID server-side after registration |
| `req.session.userId = user.id` | `authController.js` line 85 | Stores the user ID server-side after login |
| `req.session.destroy()` | `authController.js` line 97 | Clears the session on logout — the cookie becomes invalid |
| `bcrypt.hash(password, 10)` | `authController.js` line 42 | Hashes the password with 10 salt rounds before storage |
| `bcrypt.compare(password, user.password)` | `authController.js` line 77 | Compares a plain-text submission against the stored hash |
| `import validator from 'validator'` | `authController.js` line 1 | Email format validation library |
| `validator.isEmail(email)` | `authController.js` line 26 | Returns `true` if the string is a valid email format |
| `app.use(express.json())` | `server.js` line 12 | Parses incoming JSON request bodies — required for POST endpoints |

## New Middleware Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `requireAuth` middleware function | `middleware/requireAuth.js` | Checks `req.session.userId` — calls `next()` or returns `401` |
| `cartRouter.post('/add', requireAuth, addToCart)` | `routes/cart.js` line 12 | Passes `requireAuth` as a **route-level middleware** before the controller |
| `next()` in middleware | `requireAuth.js` line 10 | Signals Express to continue to the next handler in the chain |
| `res.status(401).json(...)` | `requireAuth.js` line 6 | Returns Unauthorized when session check fails — short-circuits the handler |

## New Cart Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `req.session.userId` in controllers | All cart controllers | Scopes every DB query to the logged-in user — prevents data leaks between users |
| Upsert pattern | `cartController.js` line 14 | Check if row exists → `UPDATE` quantity if yes, `INSERT` if no |
| `SUM(quantity)` | `cartController.js` line 29 | SQL aggregate — total items in the cart |
| `JOIN` query | `cartController.js` line 39 | Joins `cart_items` with `products` to include title/artist/price in the cart response |
| `router.delete('/:itemId', ...)` | `routes/cart.js` line 16 | URL parameter for targeting a specific cart row |
| `req.params.itemId` | `cartController.js` line 49 | Reads the `:itemId` URL segment |
| `parseInt(req.params.itemId, 10)` | `cartController.js` line 49 | Converts the string URL param to a safe integer |
| `res.status(204).send()` | `cartController.js` line 63, 73 | `204 No Content` — success with no response body (standard for DELETE) |

## Concepts Carried Over from Vinyl Shop (11/02) ↩

| Concept | Refined Here |
|---------|-------------|
| `express.Router()` | Now 4 routers — auth, me, products, cart |
| Controller / Route separation | Extended to auth and cart domains |
| `express.static('public')` | Now serving 4 HTML pages from `public/` |
| Parameterised SQL queries | Used throughout cart and auth controllers |
| `res.json()` | Used in all controllers — no change |

---

# 4. User Registration — `/api/auth/register`

## 4.1 Input Validation

```javascript
// controllers/authController.js
let { name, email, username, password } = req.body

if (!name || !email || !username || !password) {
  return res.status(400).json({ error: 'All fields are required.' })
}

name    = name.trim()
email   = email.trim()
username = username.trim()

if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
  return res.status(400).json({
    error: 'Username must be 1–20 characters, using letters, numbers, _ or -.'
  })
}

if (!validator.isEmail(email)) {
  return res.status(400).json({ error: 'Invalid email format' })
}
```

Server-side validation runs **before** any database interaction. The controller checks three things in order:

1. **Presence** — all four fields must be non-empty strings
2. **Username format** — the regex `^[a-zA-Z0-9_-]{1,20}$` enforces safe characters and a max length of 20
3. **Email format** — `validator.isEmail()` uses the `validator` library, which implements the RFC 5322 email standard

`.trim()` removes leading and trailing whitespace from text fields — preventing "  admin  " from being stored as a different username from "admin".

> Always validate on the **server** — never trust the frontend alone. Client-side validation can be bypassed by sending raw HTTP requests with tools like `curl` or Postman.

## 4.2 Duplicate Check

```javascript
const existing = await db.get(
  'SELECT id FROM users WHERE email = ? OR username = ?',
  [email, username]
)

if (existing) {
  return res.status(400).json({ error: 'Email or username already in use.' })
}
```

`db.get()` returns the first matching row or `undefined`. Checking both `email` and `username` in a single query with `OR` prevents two different users from claiming the same identity. Returning `400 Bad Request` (not `409 Conflict`) is a deliberate choice — it avoids leaking whether a specific email or username exists.

## 4.3 Password Hashing with `bcryptjs`

```javascript
// controllers/authController.js
const hashed = await bcrypt.hash(password, 10)

await db.run(
  'INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)',
  [name, email, username, hashed]
)
```

`bcrypt.hash(password, saltRounds)` is an **intentionally slow** one-way hashing algorithm. The second argument (10) is the **cost factor** — it controls how many times the hashing function is applied internally (2^10 = 1024 iterations).

| Concept | Explanation |
|---------|-------------|
| **One-way hash** | The hash cannot be reversed to recover the original password |
| **Salt** | A random value is generated and embedded in the hash — two identical passwords produce different hashes |
| **Cost factor 10** | ~100ms per hash on modern hardware — slow enough to deter brute-force, fast enough for real users |
| **What is stored** | The hash string (e.g., `$2b$10$abc...xyz`) — never the plain text password |

```
Plain text:  "hunter2"
Stored hash: "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy"
```

> Never store plain-text passwords. If the database is compromised, hashed passwords cannot be reversed — unlike encrypted passwords (which can be decrypted given the key).

---

# 5. Sessions — `express-session`

## 5.1 Session Configuration

```javascript
// server.js
const secret = process.env.SPIRAL_SESSION_SECRET || 'jellyfish-baskingshark'

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  }
}))
```

`express-session` generates a unique **session ID** for each visitor, stores it in a signed cookie (`connect.sid`), and saves session data in memory on the server. On subsequent requests, the cookie is sent automatically and Express retrieves the matching server-side session.

| Option | Value Used | Why |
|--------|-----------|-----|
| `secret` | Environment variable or fallback | Signs the session cookie — prevents clients from forging a session ID |
| `resave: false` | false | Don't re-save unchanged sessions — reduces unnecessary writes |
| `saveUninitialized: false` | false | Don't create a session for anonymous users — GDPR-friendlier |
| `httpOnly: true` | true | The cookie cannot be read by JavaScript — blocks XSS token theft |
| `secure: false` | false | Allow cookies over HTTP in development — set `true` in production (HTTPS only) |
| `sameSite: 'lax'` | 'lax' | Blocks cross-site requests from sending the cookie — CSRF protection |

## 5.2 `req.session.userId` — Persisting Login State

```javascript
// After successful registration:
req.session.userId = result.lastID

// After successful login:
req.session.userId = user.id

// On logout:
req.session.destroy(() => {
  res.json({ message: 'Logged out' })
})
```

`req.session` is a plain JavaScript object attached by the `express-session` middleware. Writing a property to it (like `userId`) persists that value for the lifetime of the session — across multiple requests. When the browser sends the session cookie with the next request, Express restores the same `req.session` object with `userId` already set.

```
Without sessions (stateless):
  Request 1 (login)  → server verifies password
  Request 2 (view cart) → server has forgotten → must login again

With sessions (stateful):
  Request 1 (login)  → req.session.userId = 5 → saved server-side
  Request 2 (view cart) → req.session.userId === 5 → recognised
```

> Sessions store state **on the server** — the client only holds an opaque, signed ID in the cookie. This is the fundamental difference between session-based auth and token-based auth (JWT). Session data cannot be tampered with by the client.

---

# 6. User Login — `/api/auth/login`

```javascript
// controllers/authController.js
export async function loginUser(req, res) {
  let { username, password } = req.body

  const db = await getDBConnection()
  const user = await db.get('SELECT * FROM users WHERE username = ?', [username])

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  req.session.userId = user.id
  res.json({ message: 'Logged in' })
}
```

`bcrypt.compare(plainText, hash)` safely compares the submitted password against the stored hash. It returns `true` if they match, `false` otherwise — without ever decrypting the hash.

Both "user not found" and "wrong password" return the **same error message** (`'Invalid credentials'`). This is intentional — a different message for each case would leak which usernames exist in the system (**username enumeration** attack).

| Step | Code | Why |
|------|------|-----|
| Lookup by username | `db.get('SELECT * WHERE username = ?')` | Username is the login identifier |
| Not found check | `if (!user) return 401` | User does not exist |
| Password comparison | `bcrypt.compare(password, user.password)` | Timing-safe comparison — no short-circuit |
| Invalid password | `if (!isValid) return 401` | Wrong password — same message as above |
| Set session | `req.session.userId = user.id` | Persist login state |

---

# 7. Protected Routes — `requireAuth` Middleware

```javascript
// middleware/requireAuth.js
export function requireAuth(req, res, next) {
  if (!req.session.userId) {
    console.log('Access to protected route blocked')
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}
```

`requireAuth` is a standard Express middleware function — it receives `(req, res, next)` and either terminates the request (by calling `res.status(401).json(...)`) or passes control forward (by calling `next()`).

It is applied at the **route level** by including it in the route handler array:

```javascript
// routes/cart.js
cartRouter.post('/add',          requireAuth, addToCart)
cartRouter.get('/cart-count',    requireAuth, getCartCount)
cartRouter.get('/',              requireAuth, getAll)
cartRouter.delete('/all',        requireAuth, deleteAll)
cartRouter.delete('/:itemId',    requireAuth, deleteItem)
```

Express processes the array of handlers left to right. If `requireAuth` calls `next()`, Express calls `addToCart`. If `requireAuth` calls `res.status(401).json(...)`, `addToCart` is never reached.

```
Without requireAuth:
  GET /api/cart → getAll() → returns data for any user (including anonymous)

With requireAuth:
  GET /api/cart → requireAuth() checks session
    ├── session exists → next() → getAll() → returns user's cart
    └── no session    → res.status(401) → stops here
```

> Middleware composition is the Express pattern for **cross-cutting concerns** — logic (like auth checks or logging) that applies to many routes without duplicating code in every controller.

---

# 8. The `/api/auth/me` Endpoint

```javascript
// controllers/meController.js
export async function getCurrentUser(req, res) {
  if (!req.session.userId) {
    return res.json({ isLoggedIn: false })
  }

  const db = await getDBConnection()
  const user = await db.get(
    'SELECT name FROM users WHERE id = ?',
    [req.session.userId]
  )

  res.json({ isLoggedIn: true, name: user.name })
}
```

`GET /api/auth/me` is called by the frontend on page load to determine the current auth state — without requiring a full page reload or storing user info in `localStorage`. The frontend uses the response to either show the user's name in the navbar or display login/register links.

This endpoint is **intentionally unprotected** — anonymous users can call it and receive `{ isLoggedIn: false }` without a 401 error. It is a status check, not a data endpoint.

| Session state | Response |
|---------------|---------|
| No session | `{ isLoggedIn: false }` |
| Valid session | `{ isLoggedIn: true, name: "Alice" }` |

---

# 9. Shopping Cart — `/api/cart`

## 9.1 `addToCart` — Upsert Pattern

```javascript
// controllers/cartController.js
export async function addToCart(req, res) {
  const db = await getDBConnection()
  const productId = parseInt(req.body.productId, 10)
  const userId = req.session.userId

  const existing = await db.get(
    'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  )

  if (existing) {
    await db.run(
      'UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?',
      [existing.id]
    )
  } else {
    await db.run(
      'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, 1)',
      [userId, productId]
    )
  }

  res.json({ message: 'Added to cart' })
}
```

The **upsert pattern** (update-or-insert) checks whether a cart item already exists for the `(user_id, product_id)` pair:
- If it exists → increment the `quantity` column by 1
- If it does not exist → insert a new row with `quantity = 1`

This prevents duplicate rows for the same product and gives the cart accurate per-item quantities.

> `parseInt(req.body.productId, 10)` converts the string from the request body to a base-10 integer. Always parse and validate numeric IDs before using them in SQL — never trust that a client-sent value is the type you expect.

## 9.2 `getCartCount`, `getAll`, `deleteItem`, `deleteAll`

```javascript
// GET /api/cart/cart-count — total items in cart
const result = await db.get(
  `SELECT SUM(quantity) AS totalItems FROM cart_items WHERE user_id = ?`,
  [req.session.userId]
)
res.json({ totalItems: result.totalItems || 0 })

// GET /api/cart — full cart with product details (JOIN)
const items = await db.all(`
  SELECT ci.id AS cartItemId, ci.quantity, p.title, p.artist, p.price
  FROM cart_items ci
  JOIN products p ON p.id = ci.product_id
  WHERE ci.user_id = ?`, [req.session.userId])

// DELETE /api/cart/:itemId — remove one item
await db.run(
  'DELETE FROM cart_items WHERE id = ? AND user_id = ?',
  [itemId, req.session.userId]
)
res.status(204).send()

// DELETE /api/cart/all — clear entire cart
await db.run(
  'DELETE FROM cart_items WHERE user_id = ?',
  [req.session.userId]
)
res.status(204).send()
```

The `JOIN` query in `getAll` merges two tables — `cart_items` and `products` — on the `product_id` foreign key relationship. This avoids multiple round-trip queries and returns a single denormalized result with all the fields the frontend needs.

`res.status(204).send()` returns **204 No Content** — the standard HTTP status code for a successful DELETE that produces no response body. Unlike `res.json({})`, `.send()` with no argument sends an empty body.

| Endpoint | Method | SQL Pattern | Response |
|----------|--------|-------------|---------|
| `/api/cart/cart-count` | GET | `SUM(quantity)` aggregate | `{ totalItems: 3 }` |
| `/api/cart` | GET | `JOIN cart_items + products` | Array of items with product details |
| `/api/cart/:itemId` | DELETE | `DELETE WHERE id = ? AND user_id = ?` | `204 No Content` |
| `/api/cart/all` | DELETE | `DELETE WHERE user_id = ?` | `204 No Content` |

---

# 10. The Frontend — Multi-Page App

## 10.1 `signup.html` / `login.html`

The authentication pages submit JSON via `fetch()` to their respective API endpoints. Unlike a traditional HTML `<form>` submission (which causes a page reload), the JavaScript intercepts the submit event, sends the data as JSON, and redirects on success.

```javascript
// public/js/signup.js (pattern)
form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const body = {
    name: nameInput.value,
    email: emailInput.value,
    username: usernameInput.value,
    password: passwordInput.value
  }

  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (res.ok) {
    window.location.href = '/'
  } else {
    const error = await res.json()
    errorEl.textContent = error.error
  }
})
```

`headers: { 'Content-Type': 'application/json' }` tells the server the body is JSON — required for `express.json()` middleware to parse it into `req.body`. Without this header, `req.body` would be `undefined`.

## 10.2 Cart Page — `cart.html`

The cart page calls `GET /api/cart` on load and renders each item with its title, artist, price, and a delete button. The delete button calls `DELETE /api/cart/:itemId` and re-fetches the cart to refresh the UI.

If the user is not logged in, `requireAuth` returns `401` — the frontend detects this and redirects to `login.html`.

---

# 11. How the Full App Flow Works

```
┌─────────────────── BROWSER ───────────────────────────────┐
│ User visits /signup.html                                  │
│   └─ Fills form → POST /api/auth/register                 │
│       ├─ Validate input (name/email/username/password)    │
│       ├─ Check duplicates → 400 if exists                 │
│       ├─ bcrypt.hash(password, 10)                        │
│       ├─ INSERT INTO users → req.session.userId = lastID  │
│       └─ 201 → redirect to /                              │
│                                                           │
│ User visits /login.html                                   │
│   └─ Fills form → POST /api/auth/login                    │
│       ├─ SELECT user WHERE username = ?                   │
│       ├─ bcrypt.compare(submitted, stored hash)           │
│       ├─ req.session.userId = user.id                     │
│       └─ 200 → redirect to /                              │
│                                                           │
│ Shop page loads                                           │
│   ├─ GET /api/auth/me → { isLoggedIn: true, name: Alice } │
│   │   └─ Shows "Hello Alice" + cart icon in navbar        │
│   ├─ GET /api/products → renders vinyl grid               │
│   └─ GET /api/products/genres → populates dropdown        │
│                                                           │
│ User clicks "Add to Cart"                                 │
│   └─ POST /api/cart/add { productId: 3 }                  │
│       ├─ requireAuth → session check ✅                   │
│       ├─ addToCart() → upsert cart_items row              │
│       └─ GET /api/cart/cart-count → updates badge         │
│                                                           │
│ User visits /cart.html                                    │
│   └─ GET /api/cart                                        │
│       ├─ requireAuth → session check ✅                   │
│       ├─ JOIN cart_items + products                        │
│       └─ Render items with price + delete buttons         │
│                                                           │
│ User clicks Logout                                        │
│   └─ POST /api/auth/logout → req.session.destroy()        │
│       └─ Redirect to /login.html                          │
└────────────────────────────────────────────────────────────┘
```

---

# 12. HTML Structure Recap — Server Entry Point

```
server.js (entry point)
│
├── import express
├── import express-session
├── import { productsRouter } from './routes/products.js'
├── import { authRouter }     from './routes/auth.js'
├── import { meRouter }       from './routes/me.js'
├── import { cartRouter }     from './routes/cart.js'
│
└── const app = express()
    ├── app.use(express.json())             ← parse POST bodies
    ├── app.use(session({ ... }))           ← attach req.session to every request
    ├── app.use(express.static('public'))   ← serve HTML/CSS/JS/images
    │
    ├── app.use('/api/products', productsRouter)
    │   ├── GET /genres → getGenres()
    │   └── GET /       → getProducts()
    │
    ├── app.use('/api/auth/me', meRouter)
    │   └── GET / → getCurrentUser() [unprotected]
    │
    ├── app.use('/api/auth', authRouter)
    │   ├── POST /register → registerUser()
    │   ├── POST /login    → loginUser()
    │   └── POST /logout   → logoutUser()
    │
    └── app.use('/api/cart', cartRouter)
        ├── POST /add            → requireAuth → addToCart()
        ├── GET  /cart-count     → requireAuth → getCartCount()
        ├── GET  /               → requireAuth → getAll()
        ├── DELETE /all          → requireAuth → deleteAll()
        └── DELETE /:itemId      → requireAuth → deleteItem()

public/
├── index.html    → Shop + navbar with auth-aware state
├── signup.html   → Registration form
├── login.html    → Login form
└── cart.html     → Cart items list
```

---

# 13. How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start the server (database.db is pre-seeded)
node server.js
```

Set the session secret via environment variable in production:

```bash
SPIRAL_SESSION_SECRET=your-secret-here node server.js
```

The server starts at `http://localhost:8000`. Visit:

- `http://localhost:8000` — vinyl shop (requires login for cart)
- `http://localhost:8000/signup.html` — create an account
- `http://localhost:8000/login.html` — log in
- `http://localhost:8000/cart.html` — view your cart (redirects to login if unauthenticated)

---

# 14. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 11. Express.js
* **Project:** 03. Authentication — Vinyl Shop Auth
