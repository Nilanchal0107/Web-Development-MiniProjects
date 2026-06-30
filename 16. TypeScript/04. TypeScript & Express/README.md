# TypeScript & Express — TypeScript
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express)
![Node.js](https://img.shields.io/badge/Node.js-20%20LTS-339933?style=flat-square&logo=nodedotjs)
![CORS](https://img.shields.io/badge/cors-Middleware-orange?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **TypeScript & Express** module from **Scrimba's Fullstack Web Development Path** — a fully typed Node.js REST API for a pet shelter, built with Express 5 and TypeScript, covering how to type request parameters, query strings, response bodies, middleware, routers, and controllers in a real-world Express application.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every TypeScript-in-Express concept introduced in this module, comparing what is new here against the plain JavaScript Express patterns covered in `11. Express.js` and the TypeScript fundamentals covered in `16/01. TypeScript Fundamentals`.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is "TypeScript & Express"?](#3-what-is-typescript--express)
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [Setting Up an Express + TypeScript Project](#5-setting-up-an-express--typescript-project)
   - [Dependencies and Dev Dependencies](#51-dependencies-and-dev-dependencies)
   - [The `tsconfig.json`](#52-the-tsconfigjson)
   - [Build and Run Scripts](#53-build-and-run-scripts)
6. [Typing Express — Core Types](#6-typing-express--core-types)
   - [Typing the `app` Object](#61-typing-the-app-object)
   - [Request and Response Types](#62-request-and-response-types)
   - [The Four Generics of `Request<P, ResBody, ReqBody, Query>`](#63-the-four-generics-of-requestp-resbody-reqbody-query)
7. [Typing Express Data — the `Pet` Type](#7-typing-express-data--the-pet-type)
8. [Typing Controllers](#8-typing-controllers)
   - [`getPets` — Typed Query Params](#81-getpets--typed-query-params)
   - [`getPetById` — Typed Route Params](#82-getpetbyid--typed-route-params)
9. [Typing the Router](#9-typing-the-router)
10. [Typing Middleware — `NextFunction`](#10-typing-middleware--nextfunction)
    - [`validateNumericId` — Request Validation Middleware](#101-validatenumericid--request-validation-middleware)
    - [`pleaseAuth` — Authentication Middleware](#102-pleaseauth--authentication-middleware)
11. [Typing the 404 Catch-All](#11-typing-the-404-catch-all)
12. [Separating Concerns — Router / Controller / Middleware Pattern](#12-separating-concerns--routercontrollermiddleware-pattern)
13. [How the Full API Flow Works](#13-how-the-full-api-flow-works)
14. [How to Run](#14-how-to-run)
15. [Course Reference](#15-course-reference)

---

# 1. Project Overview

The **Pet Shelter API** is a RESTful backend for a fictional animal shelter management system. It exposes endpoints to query a list of pets and retrieve individual pets by ID, with support for filtering by species, adoption status, and age range. The API includes:

* A **`GET /pets`** endpoint that returns all pets, filterable by `species`, `adopted`, `minAge`, and `maxAge` query parameters
* A **`GET /pets/:id`** endpoint that returns a single pet by numeric ID, protected by two middleware functions
* A **`validateNumericId` middleware** that rejects non-numeric IDs before they reach the controller
* A **`pleaseAuth` middleware** that requires a `?password=please` query param — a playful mock authentication gate
* A **404 catch-all handler** for undefined routes
* A fully typed `Pet` type with nested `medicalRecord` object and an optional `adoptionDate`
* A typed `PetQueryParams` type restricting query parameter shapes

The goal of this module is not just to build a REST API — it is to understand how TypeScript's generic system integrates with Express's `Request`, `Response`, and `NextFunction` types to make a fully type-safe backend where the compiler validates route parameters, query strings, and response bodies.

---

# 2. Project Structure

```
16. TypeScript/
│
└── 04. TypeScript & Express/
    ├── src/
    │   ├── index.ts                    → Express app setup — registers middleware and routes
    │   ├── data/
    │   │   └── pets.ts                 → Pet type definition + pets[] data array
    │   ├── routes/
    │   │   └── pets.routes.ts          → Router — maps URLs to controllers + middleware
    │   ├── controllers/
    │   │   └── pets.controllers.ts     → getPets() and getPetById() handler functions
    │   └── middleware/
    │       └── pets.middleware.ts      → validateNumericId() and pleaseAuth() middleware
    ├── dist/                           → Compiled JavaScript output (generated by tsc)
    ├── tsconfig.json                   → TypeScript configuration
    └── package.json                    → Scripts (build + start) and dependencies
```

---

# 3. What is "TypeScript & Express"?

Adding TypeScript to an Express project changes how you interact with Express's core objects. In JavaScript Express, `req` and `res` are untyped — TypeScript Express attaches **four generic type slots** to every `Request` and `Response`:

```typescript
// JavaScript Express — no type safety
app.get('/pets/:id', (req, res) => {
    const id = req.params.id        // type: any — no checking
    const name = req.query.nme      // typo — no error
    res.json({ mesage: "OK" })      // typo — no error
})

// TypeScript Express — fully type-safe
app.get('/pets/:id', (
    req: Request<{ id: string }>,
    res: Response<Pet | { message: string }>
): void => {
    const id = req.params.id        // type: string — enforced
    const name = req.query.nme      // ❌ Error: 'nme' does not exist on query type
    res.json({ mesage: "OK" })      // ❌ Error: 'mesage' not in Pet | { message: string }
})
```

| Feature | JavaScript Express | TypeScript Express |
|---------|-------------------|--------------------|
| Route params | `req.params.id` — `any` | `req.params.id` — typed string |
| Query params | `req.query.name` — `any` | `req.query.name` — typed per `PetQueryParams` |
| Request body | `req.body.field` — `any` | `req.body.field` — typed per body type |
| Response body | `res.json(anything)` — no check | `res.json(...)` — must match `Response<T>` |
| Middleware | `(req, res, next) => {}` | `(req: Request, res: Response, next: NextFunction)` |

> TypeScript does not change how Express works at runtime — the types are compile-time only. The compiled `.js` output runs in Node.js exactly as plain Express would.

---

# 4. What's New vs Previous Projects

## New TypeScript + Express Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `import type { Express, Request, Response }` | `index.ts` | Type-only imports from `@types/express` |
| `app: Express` | `index.ts` | Types the Express application object |
| `Request<Params, ResBody, ReqBody, Query>` | Controllers, middleware | Generic type for typed HTTP requests |
| `Response<Body>` | Controllers, middleware | Generic type for typed HTTP responses |
| `NextFunction` | Middleware | Type for the `next()` callback in middleware |
| `PetQueryParams` type | `pets.controllers.ts` | Custom type restricting query param shapes |
| `{ id: string }` route params generic | `getPetById`, middleware | Types `req.params.id` as a string |
| `'true' \| 'false'` literal union in query | `PetQueryParams` | Query params are always strings — literal union constrains values |
| `JSON.parse(adopted)` type conversion | `getPets` | Converting string query param to boolean |
| `Router` type | `pets.routes.ts` | Types the Express router object |
| `petRouter: Router` | `pets.routes.ts` | Explicit type annotation on the exported router |
| Middleware chain `pleaseAuth, validateNumericId, getPetById` | Routes | Ordered middleware stack with typed signatures |

## Concepts Carried Over From Previous Modules

| Concept | Originally Introduced In | How It Deepens Here |
|---------|--------------------------|---------------------|
| Express app setup | `11. Express.js` | Now typed with `Express` from `@types/express` |
| `app.use()` middleware | `11. Express.js` | Middleware functions now have typed parameters |
| `express.Router()` | `11. Express.js` | Router assigned `Router` type explicitly |
| Route handlers | `11. Express.js` | Handlers extracted to controllers with full typing |
| 404 catch-all | `11. Express.js` | Now typed with `Response<{ message: string }>` |
| `req.query` filtering | `11. Express.js` | Query params now typed via `Request` generic |
| `req.params` | `11. Express.js` | Route params now typed via `Request<{ id: string }>` |

---

# 5. Setting Up an Express + TypeScript Project

## 5.1 Dependencies and Dev Dependencies

```bash
# Runtime dependencies — included in the deployed bundle
npm install express cors

# Dev dependencies — used only during development and compilation
npm install -D typescript @types/express @types/cors @tsconfig/node20
```

| Package | Type | Purpose |
|---------|------|---------|
| `express` | Runtime | The Express framework |
| `cors` | Runtime | CORS middleware |
| `typescript` | Dev | The TypeScript compiler (`tsc`) |
| `@types/express` | Dev | TypeScript type definitions for Express |
| `@types/cors` | Dev | TypeScript type definitions for cors |
| `@tsconfig/node20` | Dev | Recommended base tsconfig for Node.js 20 |

> `@types/express` and `@types/cors` are **declaration packages** — they contain no JavaScript, only `.d.ts` type definition files. They teach TypeScript what shapes Express's functions and objects have.

## 5.2 The `tsconfig.json`

```json
{
    "extends": "@tsconfig/node20/tsconfig.json",
    "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src"
    }
}
```

By extending `@tsconfig/node20`, you inherit a sensible set of defaults for Node.js 20: `"target": "ES2023"`, `"module": "CommonJS"`, `"strict": true`. Only the `outDir` and `rootDir` are overridden.

| Option | Value | Purpose |
|--------|-------|---------|
| `extends` | `@tsconfig/node20/tsconfig.json` | Inherits Node 20-appropriate defaults |
| `outDir` | `./dist` | Compiled `.js` files are written here |
| `rootDir` | `./src` | Source `.ts` files are read from here |

## 5.3 Build and Run Scripts

```json
// package.json scripts
{
    "scripts": {
        "build": "npx tsc",
        "start": "npx tsc && node dist/index.js"
    }
}
```

```bash
npm run build    # compiles src/*.ts → dist/*.js
npm start        # compiles then runs the server
```

```
TypeScript source:           Compilation step:        Runtime:
src/index.ts         →       npx tsc          →       node dist/index.js
src/controllers/...  →       (strips types)   →       dist/controllers/...
src/routes/...       →                        →       dist/routes/...
```

> There is **no `ts-node` or `tsx` watch mode** in this project — `tsc` compiles to `dist/` and Node.js runs the plain JavaScript. For development with auto-restart, `ts-node` + `nodemon` is the common alternative.

---

# 6. Typing Express — Core Types

## 6.1 Typing the `app` Object

```typescript
// index.ts
import express from 'express'
import type { Express, Request, Response } from 'express'

const app: Express = express()
```

`Express` (capital E) is the **type** of the application object returned by calling `express()`. Annotating `app: Express` gives you autocomplete on every method: `app.use()`, `app.listen()`, `app.get()`, etc.

## 6.2 Request and Response Types

```typescript
import type { Request, Response } from 'express'

// Basic usage — no generics
app.get('/', (req: Request, res: Response): void => {
    res.json({ message: "Hello" })
})
```

`Request` and `Response` are **generic types** from `@types/express`. Without type arguments, they default to loose types (`any` for params, body, query). The power comes from providing generics.

## 6.3 The Four Generics of `Request<P, ResBody, ReqBody, Query>`

`Request` accepts up to four generic type arguments:

```typescript
Request<
    P,        // Route params  — defaults to ParamsDictionary (Record<string, string>)
    ResBody,  // Response body — not commonly used here (use on Response instead)
    ReqBody,  // Request body  — defaults to any
    Query     // Query params  — defaults to ParsedQs (Record<string, string | string[]>)
>
```

```typescript
// Typing only route params (most common for GET /:id routes)
req: Request<{ id: string }>

// Typing only query params (most common for GET / with filters)
req: Request<{}, unknown, {}, PetQueryParams>
// {} = no route params, unknown = no response body, {} = no request body

// Typing response body
res: Response<Pet[]>
res: Response<Pet | { message: string }>
res: Response<{ message: string }>
```

| Slot | Position | What it types | Example |
|------|----------|---------------|---------|
| `P` | 1st | `req.params` — URL route parameters | `{ id: string }` |
| `ResBody` | 2nd | Response body (rarely used — use `Response<T>` instead) | `unknown` |
| `ReqBody` | 3rd | `req.body` — parsed request body | `{ name: string; age: number }` |
| `Query` | 4th | `req.query` — URL query parameters | `PetQueryParams` |

---

# 7. Typing Express Data — the `Pet` Type

The `Pet` type is defined in `data/pets.ts` alongside the data array it describes:

```typescript
// src/data/pets.ts
export type Pet = {
    id: number
    name: string
    species: string
    breed: string
    age: number
    adopted: boolean
    intakeDate: Date
    adoptionDate?: Date            // ← optional — not all pets have been adopted
    medicalRecord: {
        vaccinations: string[]
        weightKg: number
        microchipId: null | string // ← union: can be null (not chipped) or a string ID
    }
    photo: string
}

export const pets: Pet[] = [
    {
        id: 1,
        name: "Bella",
        species: "Dog",
        // ... all required fields
        medicalRecord: {
            vaccinations: ["Rabies", "Distemper"],
            weightKg: 18.4,
            microchipId: null        // ← null is a valid value here
        }
    },
    // ...
]
```

Key type features demonstrated in `Pet`:

| Feature | Property | Type |
|---------|----------|------|
| Optional property | `adoptionDate?` | `Date \| undefined` |
| Union with null | `microchipId` | `null \| string` |
| Nested object type | `medicalRecord` | Inline object type |
| Array type | `vaccinations` | `string[]` |
| Date type | `intakeDate`, `adoptionDate` | `Date` |

> Defining the **type and the data in the same file** (`pets.ts`) is the standard pattern for typed in-memory datasets. The `Pet` type is exported separately so controllers and routes can import it without importing the full data array.

---

# 8. Typing Controllers

## 8.1 `getPets` — Typed Query Params

```typescript
// src/controllers/pets.controllers.ts
import type { Request, Response } from 'express'
import type { Pet } from '../data/pets'
import { pets } from '../data/pets'

// Define the shape of valid query parameters
type PetQueryParams = {
    species?: string
    adopted?: 'true' | 'false'     // ← literal union — query params are always strings
    minAge?: string                 // ← string, not number — query params are always strings
    maxAge?: string
}

export const getPets = (
    req: Request<{}, unknown, {}, PetQueryParams>,  // 4th generic = query type
    res: Response<Pet[]>                             // response body is an array of Pet
): void => {
    const { species, adopted, minAge, maxAge } = req.query

    let filteredPets: Pet[] = pets

    if (species) {
        filteredPets = filteredPets.filter((pet: Pet): boolean =>
            pet.species.toLowerCase() === species.toLowerCase()
        )
    }

    if (adopted) {
        filteredPets = filteredPets.filter((pet: Pet): boolean =>
            pet.adopted === JSON.parse(adopted)   // converts "true"/"false" string to boolean
        )
    }

    if (minAge) {
        filteredPets = filteredPets.filter((pet: Pet): boolean =>
            pet.age >= JSON.parse(minAge)          // converts "2" string to number 2
        )
    }

    if (maxAge) {
        filteredPets = filteredPets.filter((pet: Pet): boolean =>
            pet.age <= JSON.parse(maxAge)
        )
    }

    res.json(filteredPets)
}
```

**Key design decisions:**

1. `adopted?: 'true' | 'false'` — query parameters are **always strings**. TypeScript cannot receive a boolean via a URL query string. The literal union `'true' | 'false'` documents the two valid string representations.
2. `minAge?: string` — similarly, numeric query params arrive as strings. `JSON.parse(minAge)` converts `"2"` → `2` at runtime.
3. All properties in `PetQueryParams` are **optional** (`?`) because any filter can be omitted.

```
GET /pets                                → returns all 15 pets
GET /pets?species=Dog                    → returns only dogs
GET /pets?adopted=true                   → returns only adopted pets
GET /pets?species=Cat&minAge=2&maxAge=5  → cats aged 2–5
```

## 8.2 `getPetById` — Typed Route Params

```typescript
export const getPetById = (
    req: Request<{ id: string }>,                    // route params: { id: string }
    res: Response<Pet | { message: string }>         // response: a Pet OR an error message
): void => {
    const { id } = req.params
    const pet: Pet | undefined = pets.find((pet: Pet): boolean => pet.id.toString() === id)

    if (pet) {
        res.json(pet)
    } else {
        res.status(404).json({ message: "No pet with that ID" })
    }
}
```

`req.params.id` is always a `string` — Express parses route segments as strings even when the segment looks like a number. The comparison `pet.id.toString() === id` handles the conversion: `Pet.id` is `number`, so `.toString()` is called to compare with the string `id`.

| Route segment | What Express gives you | What TypeScript knows |
|--------------|----------------------|----------------------|
| `/:id` with `id = "5"` | `req.params.id = "5"` (string) | `string` (from `{ id: string }`) |
| `:id` as `number` | ❌ Not possible — always string | Must use `parseInt(id)` or comparison |

---

# 9. Typing the Router

```typescript
// src/routes/pets.routes.ts
import express from 'express'
import type { Router } from 'express'
import { getPets, getPetById } from '../controllers/pets.controllers'
import { validateNumericId, pleaseAuth } from '../middleware/pets.middleware'

export const petRouter: Router = express.Router()

petRouter.get('/', getPets)

petRouter.get('/:id', pleaseAuth, validateNumericId, getPetById)
```

`Router` (capital R) is the **type** of the object returned by `express.Router()`. Annotating `petRouter: Router` gives you type checking on every router method: `.get()`, `.post()`, `.use()`, etc.

The route `petRouter.get('/:id', pleaseAuth, validateNumericId, getPetById)` chains **two middleware functions before the controller**. Express calls them in order:

```
Request arrives at GET /pets/:id
    ↓
pleaseAuth          → checks ?password=please → 401 if wrong, next() if correct
    ↓
validateNumericId   → checks id is numeric → 400 if not, next() if valid
    ↓
getPetById          → finds pet by id → 404 or 200 with Pet data
```

> Route middleware stacks are ordered. TypeScript does not verify the order — that is the developer's responsibility. TypeScript only verifies that each function in the array has a compatible `(req, res, next)` signature.

---

# 10. Typing Middleware — `NextFunction`

Middleware functions in Express take three parameters: `(req, res, next)`. The `next` callback has the type `NextFunction` from `@types/express`.

## 10.1 `validateNumericId` — Request Validation Middleware

```typescript
// src/middleware/pets.middleware.ts
import type { Request, Response, NextFunction } from 'express'

export const validateNumericId = (
    req: Request<{ id: string }>,
    res: Response<{ message: string }>,
    next: NextFunction
) => {
    const { id } = req.params

    if (!/^\d+$/.test(id)) {
        res.status(400).json({ message: "Pet ID must be a number" })
    } else {
        next()   // ← calls the next function in the middleware chain
    }
}
```

The regex `/^\d+$/` tests that the `id` parameter contains only digits. If it does not (e.g. `"abc"` or `"5.5"`), the middleware short-circuits with a 400 response. If it does, `next()` passes control to the next handler.

| `next()` call | Effect |
|---------------|--------|
| `next()` | Passes control to the next middleware or route handler |
| `next(error)` | Passes control to the error-handling middleware |
| Not calling `next()` | Request hangs — the client waits forever |

> Never call `next()` **after** sending a response. Calling both `res.json()` and `next()` sends the response twice — a common bug in Express middleware.

## 10.2 `pleaseAuth` — Authentication Middleware

```typescript
export const pleaseAuth = (
    req: Request<{}, unknown, {}, { password?: string }>,   // 4th generic = query type
    res: Response<{ message: string }>,
    next: NextFunction
) => {
    const { password } = req.query

    if (password === 'please') {
        next()
    } else {
        res.status(401).json({ message: "Unauthorised. You must say please'" })
    }
}
```

`pleaseAuth` uses the **4th generic slot** of `Request` to type the query params: `{ password?: string }`. This makes `req.query.password` typed as `string | undefined` — the `?` marks it optional because it may not be provided at all.

```
GET /pets/1                         → 401 Unauthorised (no password)
GET /pets/1?password=wrong          → 401 Unauthorised
GET /pets/1?password=please         → proceeds to validateNumericId
GET /pets/abc?password=please       → 400 Pet ID must be a number
GET /pets/1?password=please         → 200 { id: 1, name: "Bella", ... }
```

---

# 11. Typing the 404 Catch-All

```typescript
// index.ts — registered AFTER all routes
app.use((req: Request, res: Response<{ message: string }>): void => {
    res.status(404).json({ message: "No endpoint found" })
})
```

This catch-all middleware is registered **last** in the middleware chain. Because no route matched, Express falls through to this handler. The `Response<{ message: string }>` generic ensures only `{ message: string }` objects can be sent as the response body — mistyped response shapes are caught at compile time.

```
Request to undefined route:
    ↓
app.use('/pets', petRouter)   → no match
    ↓
catch-all handler             → 404 { message: "No endpoint found" }
```

> Always register the 404 handler **last** in `index.ts` — after all routes and `app.use()` calls. Express processes middleware in registration order; if the 404 handler is first, it catches every request.

---

# 12. Separating Concerns — Router / Controller / Middleware Pattern

This module introduces a **three-layer architecture** for Express apps — a major step beyond the single-file Express projects in `11. Express.js`:

```
┌──────────────────────────────────────────────────────────┐
│  index.ts — App Layer                                     │
│  Sets up Express, registers global middleware, mounts    │
│  routers. Knows nothing about business logic.            │
└───────────────┬──────────────────────────────────────────┘
                │ app.use('/pets', petRouter)
┌───────────────▼──────────────────────────────────────────┐
│  pets.routes.ts — Router Layer                           │
│  Maps HTTP methods + paths to controllers and middleware │
│  chains. Knows routes but not data or logic.             │
└──────────┬──────────────────┬────────────────────────────┘
           │                  │
┌──────────▼──────────┐  ┌────▼────────────────────────────┐
│  pets.middleware.ts  │  │  pets.controllers.ts            │
│  Middleware Layer    │  │  Controller Layer               │
│  Cross-cutting       │  │  Business logic: reads data,    │
│  concerns: auth,     │  │  applies filters, sends the     │
│  validation,         │  │  typed response                 │
│  logging             │  │                                 │
└──────────────────────┘  └─────────────────────────────────┘
```

| Layer | File | Responsibility |
|-------|------|----------------|
| App | `index.ts` | Start server, mount routers, global middleware |
| Router | `pets.routes.ts` | URL mapping and middleware ordering |
| Controller | `pets.controllers.ts` | Business logic, data access, response formatting |
| Middleware | `pets.middleware.ts` | Validation, authentication, cross-cutting logic |

> This separation makes each layer **independently testable**. You can unit-test a controller by calling it directly without starting the server. You can swap middleware without touching controllers.

---

# 13. How the Full API Flow Works

```
Server starts
└── index.ts runs
      ├── express() creates the app
      ├── app.use(cors()) — enables cross-origin requests
      ├── app.use('/pets', petRouter) — mounts the pets router
      └── app.use(catch-all 404) — last registered handler
      └── app.listen(8000)

GET /pets?species=Dog&minAge=3 arrives
└── Matches app.use('/pets', petRouter)
      └── petRouter.get('/', getPets)
            └── getPets controller
                  ├── Destructures req.query: { species: "Dog", minAge: "3" }
                  ├── Filters pets by species === "Dog"
                  ├── Filters by age >= JSON.parse("3") === 3
                  └── res.json(filteredPets) → 200 [{ id:1, name:"Bella", ... }, ...]

GET /pets/5?password=please arrives
└── Matches app.use('/pets', petRouter)
      └── petRouter.get('/:id', pleaseAuth, validateNumericId, getPetById)
            ├── pleaseAuth: password === "please" → next()
            ├── validateNumericId: /^\d+$/.test("5") → true → next()
            └── getPetById controller
                  ├── Finds pet where pet.id.toString() === "5"
                  └── res.json(pet) → 200 { id: 5, name: "Luna", ... }

GET /pets/abc?password=please arrives
└── petRouter.get('/:id', pleaseAuth, validateNumericId, getPetById)
      ├── pleaseAuth: password === "please" → next()
      ├── validateNumericId: /^\d+$/.test("abc") → false
      └── res.status(400).json({ message: "Pet ID must be a number" })  ← stops here

GET /unknown arrives
└── No route matches → falls to catch-all
      └── res.status(404).json({ message: "No endpoint found" })
```

---

# 14. How to Run

This project compiles TypeScript to JavaScript before running. Node.js and npm are required.

```bash
# 1. Navigate to the project directory
cd "16. TypeScript/04. TypeScript & Express"

# 2. Install dependencies
npm install

# 3. Build (compile TypeScript → JavaScript)
npm run build

# 4. Start the server
npm start
```

Or in a single command:
```bash
npm start   # runs: npx tsc && node dist/index.js
```

The server listens on **port 8000**. Test the endpoints in a browser or with curl:

```bash
# All pets
curl http://localhost:8000/pets

# Filter by species
curl "http://localhost:8000/pets?species=Dog"

# Filter by adoption status
curl "http://localhost:8000/pets?adopted=false"

# Get a specific pet (requires password query param)
curl "http://localhost:8000/pets/1?password=please"

# Non-numeric ID — should return 400
curl "http://localhost:8000/pets/abc?password=please"

# Missing password — should return 401
curl http://localhost:8000/pets/1
```

---

# 15. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 16 — TypeScript
* **Sub-module:** 04 — TypeScript & Express
* **Topics covered:** `Express`, `Request`, `Response`, `NextFunction` types, four-generic `Request<P, ResBody, ReqBody, Query>`, typed route params, typed query params, typed response bodies, controller/router/middleware separation, `@types/express`, `tsconfig.json` with `@tsconfig/node20`
* **Project:** Pet Shelter API — a typed REST API for querying pet adoption data with filtering, ID validation, and mock authentication middleware
* **Builds toward:** Integrating a typed Express backend with a React + TypeScript frontend in a full-stack application
