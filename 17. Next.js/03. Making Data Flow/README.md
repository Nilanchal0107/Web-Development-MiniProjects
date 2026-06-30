# Making Data Flow — Next.js
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38B2AC?style=flat-square&logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **Making Data Flow** module from **Scrimba's Fullstack Web Development Path** — the most advanced Next.js section, connecting PrintForge to a real **SQLite database**, implementing server-driven **search**, **sort**, **pagination**, route-level **loading UI**, **not-found handling**, and a composable `getModels()` function that builds SQL dynamically from URL parameters.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every concept introduced in this module, comparing what is new here against the JSON mock data approach from `17/02. Rendering Strategies and More`.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Previous Section](#3-whats-new-vs-previous-section)
4. [Introducing Data in Next.js — SQLite Setup](#4-introducing-data-in-nextjs--sqlite-setup)
   - [Why SQLite in a Next.js App](#41-why-sqlite-in-a-nextjs-app)
   - [Setting Up the Database Connection](#42-setting-up-the-database-connection)
   - [Seeding the Database](#43-seeding-the-database)
5. [The Data Access Layer — `lib/models.ts`](#5-the-data-access-layer--libmodelsts)
   - [`getModels()` — A Composable SQL Builder](#51-getmodels--a-composable-sql-builder)
   - [`getModelById()` — Single Model Lookup](#52-getmodelbyid--single-model-lookup)
   - [`getModelCount()` — Counting for Pagination](#53-getmodelcount--counting-for-pagination)
6. [Search — Data Flow Architecture](#6-search--data-flow-architecture)
   - [Understanding the Search Data Flow](#61-understanding-the-search-data-flow)
   - [Passing Search Through the UI](#62-passing-search-through-the-ui)
   - [SQL LIKE Search](#63-sql-like-search)
7. [Sorting](#7-sorting)
   - [Understanding the Sorting Data Flow](#71-understanding-the-sorting-data-flow)
   - [Navigating with `usePathname` and `useRouter`](#72-navigating-with-usepathname-and-userouter)
   - [Sorting Data with SQL `ORDER BY`](#73-sorting-data-with-sql-order-by)
8. [Pagination](#8-pagination)
   - [URL-Driven Pagination](#81-url-driven-pagination)
   - [LIMIT and OFFSET in SQL](#82-limit-and-offset-in-sql)
   - [`COUNT()` — Counting Total Results](#83-count--counting-total-results)
   - [Calculating Total Pages](#84-calculating-total-pages)
9. [Route-Level Loading UI — `loading.tsx`](#9-route-level-loading-ui--loadingtsx)
   - [Single `loading.tsx`](#91-single-loadingtsx)
   - [Multiple `loading.tsx` Files](#92-multiple-loadingtsx-files)
   - [Showing Pending UI with `useTransition`](#93-showing-pending-ui-with-usetransition)
10. [Not Found and Error States](#10-not-found-and-error-states)
    - [`not-found.tsx` — Global 404 Page](#101-not-foundtsx--global-404-page)
    - [Programmatic `notFound()` — Non-existent Resources](#102-programmatic-notfound--non-existent-resources)
    - [No Results Found State](#103-no-results-found-state)
11. [The `ModelsBrowser` Component Architecture](#11-the-modelsbrowser-component-architecture)
12. [How the Full App Flow Works](#12-how-the-full-app-flow-works)
13. [How to Run](#13-how-to-run)
14. [Course Reference](#14-course-reference)

---

# 1. Project Overview

This section is a complete rebuild of PrintForge's data layer — replacing static JSON with a real database and adding interactive data exploration features. The final app includes:

* A **SQLite database** (`printforge.db`) seeded with models and categories at startup
* A **composable `getModels()` function** that builds SQL dynamically from search, sort, category, and pagination parameters
* **Server-driven search** — the search term travels from the URL to `searchParams` to SQL `WHERE` to filtered results
* **URL-driven sorting** — sort buttons navigate to `?sort=alpha|popular|recent` which the server uses to add `ORDER BY` to the SQL query
* **Pagination** — `?page=2` drives `LIMIT` and `OFFSET` in SQL; `COUNT()` enables total page calculation
* **Route-level loading UI** — `loading.tsx` files that show skeleton UI while Server Components fetch data
* **Pending UI with `useTransition`** — client-side sort/search buttons show a pending state while the new page loads
* **Not Found states** — `not-found.tsx` for global 404 pages and `notFound()` for programmatic redirects when a model or category does not exist
* **No Results Found state** — a dedicated empty state component when a search or filter returns zero results

The goal of this module is not just to add a database — it is to understand how **data flows through a Next.js application**: from the URL, through `searchParams` on the server, into SQL queries, and back as HTML to the browser.

---

# 2. Project Structure

```
17. Next.js/
│
└── 03. Making Data Flow/
    ├── app/
    │   ├── layout.tsx                      → Root layout
    │   ├── page.tsx                        → Home page (uses next/image for hero)
    │   ├── not-found.tsx                   → Global 404 page
    │   ├── globals.css                     → Global styles
    │   └── 3d-models/
    │       ├── layout.tsx                  → Models section layout with CategoriesNav
    │       ├── loading.tsx                 → Route-level loading UI for /3d-models
    │       ├── page.tsx                    → Models list: reads searchParams, calls getModels()
    │       ├── [id]/
    │       │   ├── loading.tsx             → Loading UI specific to the detail page
    │       │   └── page.tsx               → Model detail page with notFound() on missing ID
    │       └── categories/
    │           └── [categorySlug]/
    │               ├── loading.tsx         → Loading UI for category pages
    │               └── page.tsx           → Category page — filters by categorySlug
    ├── components/
    │   ├── Navbar.tsx                      → Top navigation bar
    │   ├── CategoriesNav.tsx               → "use client" — sidebar with usePathname
    │   ├── NavLink.tsx                     → Active link component
    │   ├── ModelCard.tsx                   → Individual model card
    │   ├── ModelsGrid.tsx                  → Grid of ModelCards with Not Found state
    │   ├── ModelsBrowser.tsx               → Composes SearchForm + SortControls + ModelsGrid
    │   ├── SearchForm.tsx                  → "use client" — search input with useTransition
    │   ├── SortControls.tsx                → Row of SortButton components
    │   ├── SortButton.tsx                  → "use client" — usePathname + useRouter + useTransition
    │   ├── PaginationControls.tsx          → Row of PaginationButton components
    │   ├── PaginationButton.tsx            → Individual pagination page button
    │   ├── LoadingUI.tsx                   → Skeleton/spinner loading indicator
    │   └── NotFoundUI.tsx                  → Empty state for no results / not found
    ├── lib/
    │   ├── db.ts                           → getDBConnection() — opens SQLite connection
    │   ├── models.ts                       → getModels(), getModelById(), getModelCount()
    │   ├── categories.ts                   → getCategories()
    │   ├── utils.ts                        → getQueryParams() — normalises URL search params
    │   ├── constants.ts                    → MODELS_PER_PAGE = 10
    │   ├── types.ts                        → Shared TypeScript types
    │   ├── data/                           → Seed data JSON files
    │   └── seeds/
    │       ├── seed_models.ts              → Populates the models table
    │       └── seed_categories.ts          → Populates the categories table
    ├── public/
    │   └── img/
    │       └── hero-image.jpg             → Hero image (next/image)
    ├── printforge.db                       → SQLite database file (generated at runtime)
    └── package.json                        → dev script: seeds + next dev
```

---

# 3. What's New vs Previous Section

## New Concepts in This Section

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| SQLite + `sqlite`/`sqlite3` packages | `lib/db.ts` | Real file-based database replacing JSON mock data |
| `getDBConnection()` + `finally` close | All data functions | Opens an async SQLite connection; always closed |
| Database seeding with `tsx` | `lib/seeds/*.ts` | Populates tables with mock data on every `npm run dev` |
| Dynamic SQL building | `lib/models.ts` | Appends `WHERE`, `ORDER BY`, `LIMIT`, `OFFSET` from params |
| Parameterised queries (`?` placeholders) | `getModels()` | Prevents SQL injection — values bound separately |
| `SQL WHERE LIKE '%term%'` | `getModels()` | Case-insensitive substring search on name and description |
| `SQL ORDER BY` | `getModels()` | Server-side sorting: `name ASC`, `likes DESC`, `dateAdded DESC` |
| `SQL LIMIT / OFFSET` | `getModels()` | Server-side pagination — returns one page of results |
| `SQL COUNT(*)` | `getModelCount()` | Counts total matching rows to calculate total pages |
| `loading.tsx` | Multiple route folders | Automatic Suspense boundary — shown while Server Component loads |
| Multiple `loading.tsx` files | Per route | Each route has its own skeleton / spinner |
| `useTransition` + `isPending` | `SearchForm`, `SortButton` | Keeps UI responsive; drives pending state on buttons |
| `not-found.tsx` | `app/not-found.tsx` | Custom 404 page for unmatched routes |
| `notFound()` from `next/navigation` | Detail + category pages | Programmatic 404 when database returns no result |
| `redirect()` from `next/navigation` | `page.tsx` | Redirects to valid URL on invalid `page` param |
| `useRouter().push()` | Sort and search controls | Programmatic navigation from Client Components |
| `MODELS_PER_PAGE` constant | `lib/constants.ts` | Single source of truth for page size |
| `getQueryParams()` utility | `page.tsx` | Normalises and validates raw `searchParams` |
| `next/image` `<Image>` | `app/page.tsx` | Optimised hero image with width/height |

---

# 4. Introducing Data in Next.js — SQLite Setup

## 4.1 Why SQLite in a Next.js App

SQLite is a **file-based database** — the entire database lives in a single `.db` file on disk. Because Next.js Server Components run in Node.js, they can read from a file directly without any network round-trip.

```
┌───────────────────────────────────────────────┐
│  Next.js Server (Node.js)                      │
│                                               │
│  Server Component (async)                     │
│    └── getModels({ search, sort, page })      │
│          └── getDBConnection()                │
│                └── sqlite.open('printforge.db')│
│                      └── db.all(sql, params)  │
│                            └── rows returned  │
└───────────────────────────────────────────────┘
       ↑ all on the server — browser gets only HTML
```

| Database | Where it lives | Network? | Best for |
|----------|--------------|---------|---------|
| SQLite | File on same server | ❌ None | Prototyping, learning, small apps |
| PostgreSQL / MySQL | Remote server | ✅ Yes | Production multi-user apps |
| Supabase / PlanetScale | Managed cloud | ✅ Yes | Production with managed hosting |

## 4.2 Setting Up the Database Connection

```typescript
// lib/db.ts
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

export async function getDBConnection() {
    const dbPath = path.join(process.cwd(), 'printforge.db')
    return open({
        filename: dbPath,    // path to the .db file on disk
        driver: sqlite3.Database
    })
}
```

`process.cwd()` always resolves to the **project root** regardless of which file calls it — ensuring the database path is always correct.

> **Always close the database connection** in a `finally` block. If the query throws, `finally` still runs — preventing connection leaks.

```typescript
// Pattern used in every data function
export async function getModelById(id: string) {
    const db = await getDBConnection()
    try {
        return await db.get(`SELECT * FROM models WHERE id=?`, [id])
    } finally {
        await db.close()   // ← runs even if the query throws
    }
}
```

## 4.3 Seeding the Database

The `dev` script in `package.json` runs seeds **before** `next dev`:

```json
{
    "scripts": {
        "dev": "npx tsx lib/seeds/seed_models.ts && npx tsx lib/seeds/seed_categories.ts && next dev"
    }
}
```

Each seed script creates the table if it does not exist, clears old data, and inserts fresh rows from a JSON file:

```typescript
// lib/seeds/seed_models.ts (simplified)
const db = await getDBConnection()
await db.exec(`CREATE TABLE IF NOT EXISTS models (
    id INTEGER PRIMARY KEY,
    name TEXT, description TEXT, category TEXT,
    likes INTEGER, dateAdded TEXT, imageUrl TEXT
)`)
await db.run(`DELETE FROM models`)
for (const model of data) {
    await db.run(
        `INSERT INTO models VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [model.id, model.name, model.description,
         model.category, model.likes, model.dateAdded, model.imageUrl]
    )
}
await db.close()
```

---

# 5. The Data Access Layer — `lib/models.ts`

## 5.1 `getModels()` — A Composable SQL Builder

```typescript
export async function getModels({ search, sort, categorySlug, page, modelsPerPage }: {
    search?: string
    sort?: string
    categorySlug?: string
    page: number
    modelsPerPage: number
}) {
    const db = await getDBConnection()
    let sql = "SELECT * FROM models"
    const placeholders = []

    // 1. WHERE clause — search and/or category
    if (search || categorySlug) {
        const where = []
        if (search) {
            where.push("(name LIKE ? OR description LIKE ?)")
            placeholders.push(`%${search}%`, `%${search}%`)
        }
        if (categorySlug) {
            where.push("category=?")
            placeholders.push(categorySlug)
        }
        sql += " WHERE " + where.join(" AND ")
    }

    // 2. ORDER BY — sort
    if (sort === "alpha")   sql += " ORDER BY name ASC"
    if (sort === "popular") sql += " ORDER BY likes DESC"
    if (sort === "recent")  sql += " ORDER BY dateAdded DESC"

    // 3. LIMIT / OFFSET — pagination
    if (page && modelsPerPage) {
        const offset = (page - 1) * modelsPerPage
        sql += " LIMIT ? OFFSET ?"
        placeholders.push(modelsPerPage, offset)
    }

    try {
        return await db.all(sql, placeholders)
    } finally {
        await db.close()
    }
}
```

**Example SQL outputs:**

```sql
-- No filters, page 1:
SELECT * FROM models LIMIT 10 OFFSET 0

-- Search "dragon", sort popular, page 2:
SELECT * FROM models
WHERE (name LIKE '%dragon%' OR description LIKE '%dragon%')
ORDER BY likes DESC
LIMIT 10 OFFSET 10

-- Category "vehicles", sort alpha:
SELECT * FROM models
WHERE category='vehicles'
ORDER BY name ASC LIMIT 10 OFFSET 0
```

> **Parameterised queries** (`?` placeholders) are a security requirement — never interpolate user input directly into SQL strings. The `placeholders` array is passed as the second argument to `db.all()`, which binds values safely.

## 5.2 `getModelById()` — Single Model Lookup

```typescript
export async function getModelById(id: string) {
    const db = await getDBConnection()
    try {
        return await db.get(`SELECT * FROM models WHERE id=?`, [id])
    } finally {
        await db.close()
    }
}
```

| Method | Returns | Use for |
|--------|---------|---------|
| `db.all(sql, params)` | `Row[]` (array, may be empty) | Lists of results |
| `db.get(sql, params)` | `Row \| undefined` | Single row — `undefined` if not found |
| `db.run(sql, params)` | `{ lastID, changes }` | INSERT, UPDATE, DELETE |
| `db.exec(sql)` | void | DDL: `CREATE TABLE`, `DROP TABLE` |

## 5.3 `getModelCount()` — Counting for Pagination

```typescript
export async function getModelCount({ search, categorySlug }: {
    search?: string
    categorySlug?: string
}) {
    const db = await getDBConnection()
    let sql = "SELECT COUNT(*) AS count FROM models"
    const placeholders = []

    if (search || categorySlug) {
        const where = []
        if (search) {
            where.push("(name LIKE ? OR description LIKE ?)")
            placeholders.push(`%${search}%`, `%${search}%`)
        }
        if (categorySlug) {
            where.push("category=?")
            placeholders.push(categorySlug)
        }
        sql += " WHERE " + where.join(" AND ")
    }

    try {
        const result = await db.get(sql, placeholders)
        return result.count
    } finally {
        await db.close()
    }
}
```

`COUNT(*)` counts all rows matching the `WHERE` clause and returns a single integer — without loading the actual row data. Essential for pagination.

---

# 6. Search — Data Flow Architecture

## 6.1 Understanding the Search Data Flow

```
URL: /3d-models?search=dragon&sort=popular&page=1
         │
         │  searchParams prop (async Promise in Next.js 15)
         ▼
  app/3d-models/page.tsx  (Server Component)
    const { search, sort, page } = getQueryParams(await searchParams)
         │
         │  parameters passed to data layer
         ▼
  lib/models.ts — getModels({ search: "dragon", sort: "popular", page: 1 })
    SQL: SELECT * FROM models
         WHERE (name LIKE '%dragon%' OR description LIKE '%dragon%')
         ORDER BY likes DESC
         LIMIT 10 OFFSET 0
         │
         │  filtered rows
         ▼
  <ModelsBrowser models={filtered} />
    → HTML sent to browser
```

Every search is a **full server round-trip** — no client-side filtering. The URL is the single source of truth.

## 6.2 Passing Search Through the UI

```typescript
// components/SearchForm.tsx — "use client"
"use client"
import { useTransition } from "react"
import { useRouter } from "next/navigation"

export default function SearchForm({ currentSearch }: { currentSearch: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const query = new FormData(e.currentTarget).get("search") as string
        startTransition(() => {
            router.push(`/3d-models?search=${encodeURIComponent(query)}`)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="search" defaultValue={currentSearch} />
            <button disabled={isPending}>
                {isPending ? "Searching..." : "Search"}
            </button>
        </form>
    )
}
```

## 6.3 SQL LIKE Search

```sql
-- % = wildcard: any characters before or after the term
WHERE (name LIKE '%dragon%' OR description LIKE '%dragon%')

-- '%dragon%' matches: "dragon skull", "fire dragon", "red dragon helmet"
```

```typescript
// % characters are part of the placeholder value — NOT the SQL string
placeholders.push(`%${search}%`, `%${search}%`)
// Bound value: "%dragon%"
// SQL sees: WHERE (name LIKE ? ...) with ? = "%dragon%"
```

---

# 7. Sorting

## 7.1 Understanding the Sorting Data Flow

```
User clicks "Sort by Popular"
    ↓
SortButton (Client Component)
  startTransition(() => router.push('/3d-models?sort=popular'))
    ↓
URL changes → Server Component re-renders
  searchParams.sort = "popular"
  getModels({ sort: "popular", ... })
    ↓
SQL: SELECT * FROM models ORDER BY likes DESC LIMIT 10 OFFSET 0
    ↓
New sorted results → HTML to browser
```

## 7.2 Navigating with `usePathname` and `useRouter`

Sort buttons must preserve existing URL params while changing only the sort:

```typescript
// components/SortButton.tsx — "use client"
"use client"
import { usePathname, useRouter } from "next/navigation"
import { useTransition } from "react"

export default function SortButton({ sortKey, currentSort, children }) {
    const pathname = usePathname()    // e.g. "/3d-models/categories/vehicles"
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    function handleClick() {
        const url = new URL(pathname, window.location.origin)
        url.searchParams.set("sort", sortKey)
        url.searchParams.delete("page")   // reset to page 1

        startTransition(() => {
            router.push(url.toString())
        })
    }

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className={currentSort === sortKey ? "font-bold" : "text-gray-500"}
        >
            {children}
        </button>
    )
}
```

`usePathname()` is used so the same `SortButton` works correctly on both `/3d-models` and `/3d-models/categories/vehicles`.

## 7.3 Sorting Data with SQL `ORDER BY`

```typescript
if (sort === "alpha")   sql += " ORDER BY name ASC"
if (sort === "popular") sql += " ORDER BY likes DESC"
if (sort === "recent")  sql += " ORDER BY dateAdded DESC"
```

| `sort` param | SQL | Description |
|-------------|-----|-------------|
| `"alpha"` | `ORDER BY name ASC` | A → Z alphabetical |
| `"popular"` | `ORDER BY likes DESC` | Most liked first |
| `"recent"` | `ORDER BY dateAdded DESC` | Newest first |
| `undefined` | *(no clause)* | Database insertion order |

---

# 8. Pagination

## 8.1 URL-Driven Pagination

```
/3d-models?page=1  → LIMIT 10 OFFSET 0   (results 1–10)
/3d-models?page=2  → LIMIT 10 OFFSET 10  (results 11–20)
/3d-models?page=3  → LIMIT 10 OFFSET 20  (results 21–30)
```

```typescript
// app/3d-models/page.tsx
const { search, sort, page } = getQueryParams(await searchParams)

const models     = await getModels({ search, sort, page, modelsPerPage: MODELS_PER_PAGE })
const modelCount = await getModelCount({ search })
const totalPages = Math.max(1, Math.ceil(modelCount / MODELS_PER_PAGE))

// Guard: redirect invalid page numbers
if (page < 1 || page > totalPages || sort === null) {
    redirect('/3d-models')
}
```

## 8.2 LIMIT and OFFSET in SQL

```sql
-- Page 1: first 10 results
SELECT * FROM models LIMIT 10 OFFSET 0

-- Page 2: skip 10, fetch next 10
SELECT * FROM models LIMIT 10 OFFSET 10
```

```typescript
const offset = (page - 1) * modelsPerPage
// page=1 → offset=0   | page=2 → offset=10   | page=3 → offset=20
sql += " LIMIT ? OFFSET ?"
placeholders.push(modelsPerPage, offset)
```

## 8.3 `COUNT()` — Counting Total Results

```sql
SELECT COUNT(*) AS count FROM models
-- Returns: { count: 47 }

SELECT COUNT(*) AS count FROM models
WHERE (name LIKE '%dragon%' OR description LIKE '%dragon%')
-- Returns: { count: 5 }
```

`COUNT(*)` returns one row with the total number of matching rows. No row data is loaded — just the integer count needed for pagination.

## 8.4 Calculating Total Pages

```typescript
const totalPages = Math.max(1, Math.ceil(modelCount / MODELS_PER_PAGE))

// 47 models, 10 per page → Math.ceil(47/10) = 5 pages
// 0 models                → Math.max(1, 0)  = 1 page minimum
```

`PaginationControls` renders one button per page, each navigating to `?page=N`:

```typescript
export default function PaginationControls({ totalPages, currentPage }) {
    return (
        <nav>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <PaginationButton
                    key={pageNum}
                    page={pageNum}
                    isActive={pageNum === currentPage}
                />
            ))}
        </nav>
    )
}
```

---

# 9. Route-Level Loading UI — `loading.tsx`

## 9.1 Single `loading.tsx`

A `loading.tsx` file next to a `page.tsx` automatically creates a React Suspense boundary. While the Server Component runs its `await` calls, Next.js renders `loading.tsx` instead:

```typescript
// app/3d-models/loading.tsx
import LoadingUI from "@/components/LoadingUI"

export default function Loading() {
    return <LoadingUI />   // shown while page.tsx fetches data
}
```

```
User navigates to /3d-models:
  1. loading.tsx shown immediately (fast)
  2. page.tsx Server Component executes:
       await getModels(...)      ← database query
       await getModelCount(...)  ← second query
  3. Data arrives → loading.tsx replaced by page.tsx output
```

> `loading.tsx` is a zero-config Suspense boundary — no `<Suspense>` needed in JSX. Create the file next to `page.tsx` and Next.js handles the rest automatically.

## 9.2 Multiple `loading.tsx` Files

Each route segment has its own `loading.tsx` with a skeleton appropriate for that page:

```
app/3d-models/
├── loading.tsx               → skeleton grid for the models list
├── [id]/
│   └── loading.tsx           → two-column skeleton for the detail page
└── categories/[categorySlug]/
    └── loading.tsx           → category-specific skeleton
```

Each `loading.tsx` only activates for its own sibling `page.tsx` — not for nested routes.

## 9.3 Showing Pending UI with `useTransition`

`loading.tsx` shows during full navigation. When a user is **already on the page** and changes sort or search, `loading.tsx` does not trigger. `useTransition` fills this gap:

```typescript
// "use client"
const [isPending, startTransition] = useTransition()

function handleClick() {
    startTransition(() => {
        router.push(`/3d-models?sort=${sortKey}`)
        // isPending = true until the navigation and server render completes
    })
}

return (
    <button disabled={isPending} className={isPending ? "opacity-50" : ""}>
        {isPending ? "Loading..." : children}
    </button>
)
```

| Mechanism | When it activates | Use for |
|-----------|-----------------|---------|
| `loading.tsx` | First navigation to a route | Initial loads and hard navigations |
| `useTransition` `isPending` | In-page navigations (sort/search on same route) | Buttons that change URL params without leaving the page |

---

# 10. Not Found and Error States

## 10.1 `not-found.tsx` — Global 404 Page

```typescript
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
    return (
        <main>
            <h1>404 — Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link href="/">Go home</Link>
        </main>
    )
}
```

Shown automatically when no route matches, or when `notFound()` is called from any Server Component.

## 10.2 Programmatic `notFound()` — Non-existent Resources

```typescript
// app/3d-models/[id]/page.tsx
import { notFound } from 'next/navigation'

export default async function ModelDetailPage({ params }) {
    const { id } = await params
    const model = await getModelById(id)

    if (!model) {
        notFound()   // ← triggers app/not-found.tsx
    }

    return <article>...</article>
}
```

```typescript
// app/3d-models/categories/[categorySlug]/page.tsx
const category = await getCategoryBySlug(categorySlug)
if (!category) {
    notFound()
}
```

| Mechanism | HTTP status | Cause |
|-----------|------------|-------|
| `not-found.tsx` (automatic) | 404 | URL matches no route |
| `notFound()` (programmatic) | 404 | Route exists but resource is missing from database |

## 10.3 No Results Found State

A different case — the route is valid and the query is valid, but zero rows are returned:

```typescript
// components/ModelsGrid.tsx
export default function ModelsGrid({ models, title }) {
    if (models.length === 0) {
        return <NotFoundUI message="No models match your search." />
    }
    return (
        <section>
            <h2>{title}</h2>
            <div className="grid grid-cols-3 gap-4">
                {models.map(model => <ModelCard key={model.id} model={model} />)}
            </div>
        </section>
    )
}
```

| State | HTTP | Cause | UI component |
|-------|------|-------|-------------|
| 404 Not Found | 404 | Route or resource does not exist | `not-found.tsx` |
| No Results | 200 | Query returned 0 rows | `NotFoundUI` inside `ModelsGrid` |
| Loading | — | Data still being fetched | `loading.tsx` or `isPending` |

---

# 11. The `ModelsBrowser` Component Architecture

As interactivity grows, a `ModelsBrowser` component composes all interactive UI pieces while the Server Component owns data fetching:

```typescript
// components/ModelsBrowser.tsx — receives server-fetched data as props
type ModelsBrowserProps = {
    models: Model[]
    search: string
    totalPages: number
    currentPage: number
}

export default function ModelsBrowser({ models, search, totalPages, currentPage }: ModelsBrowserProps) {
    return (
        <div>
            <SearchForm currentSearch={search} />
            <SortControls />
            <ModelsGrid models={models} />
            <PaginationControls totalPages={totalPages} currentPage={currentPage} />
        </div>
    )
}
```

```
Data flow:
  Server (page.tsx):
    ├── await getModels(...)      → models[]
    ├── await getModelCount(...)  → count → totalPages
    └── <ModelsBrowser models={models} totalPages={5} currentPage={2} />

  Client (ModelsBrowser):
    ├── SearchForm  → router.push → server re-renders with new search
    ├── SortControls → router.push → server re-renders with new sort
    ├── ModelsGrid   → pure display, no client logic
    └── PaginationControls → router.push → server re-renders with new page
```

> Data flows one way: server (database → page.tsx) → props → client components. Client Components never query the database — they only navigate (change the URL), which triggers the server to re-fetch and pass new data down.

---

# 12. How the Full App Flow Works

```
User visits /3d-models?search=dragon&sort=popular&page=2

  Server (page.tsx):
    1. getQueryParams(await searchParams)
         → { search: "dragon", sort: "popular", page: 2 }
    2. getModels({ search, sort, page:2, modelsPerPage:10 })
         SQL: SELECT * FROM models
              WHERE (name LIKE '%dragon%' OR description LIKE '%dragon%')
              ORDER BY likes DESC
              LIMIT 10 OFFSET 10
         → models 11–20 matching "dragon", sorted by likes
    3. getModelCount({ search: "dragon" })
         SQL: SELECT COUNT(*) AS count FROM models
              WHERE (name LIKE '%dragon%' OR description LIKE '%dragon%')
         → { count: 23 }
    4. totalPages = Math.ceil(23/10) = 3
    5. page=2, totalPages=3 → no redirect needed
    6. <ModelsBrowser models={...} search="dragon" totalPages={3} currentPage={2} />
    7. HTML sent to browser

  Client hydrates:
    - SearchForm: "dragon" shown in input
    - SortControls: "Popular" button highlighted
    - PaginationControls: page 2 highlighted; pages 1, 2, 3 shown
    - loading.tsx: was showing during step 1–7, now replaced

User clicks "Sort Alphabetically":
  SortButton.handleClick():
    startTransition(() => {
        router.push('/3d-models?search=dragon&sort=alpha&page=1')
    })
  → isPending=true → button shows "..." while waiting
  → Server re-runs:
      getModels({ search:"dragon", sort:"alpha", page:1 })
      SQL: ...WHERE name LIKE '%dragon%'... ORDER BY name ASC LIMIT 10 OFFSET 0
  → New HTML arrives → isPending=false → UI updates

User visits /3d-models/99999 (non-existent model):
  Server:
    getModelById("99999") → undefined (no row in DB)
    notFound() called → app/not-found.tsx rendered → 404 response
```

---

# 13. How to Run

This project seeds the SQLite database automatically when you run `npm run dev`.

```bash
# 1. Navigate to the project directory
cd "17. Next.js/03. Making Data Flow"

# 2. Install dependencies
npm install

# 3. Start the development server
# Runs: seed_models.ts && seed_categories.ts && next dev
npm run dev
```

Open `http://localhost:3000` in your browser. Test all features:

```
/3d-models                               → All models, page 1
/3d-models?search=dragon                 → Search results
/3d-models?sort=popular                  → Sorted by likes
/3d-models?sort=alpha&page=2             → Alphabetical, page 2
/3d-models?search=robot&sort=recent      → Combined search + sort
/3d-models/categories/vehicles           → Category filter
/3d-models/1                             → Model detail page
/3d-models/99999                         → Triggers notFound() → 404 page
/nonexistent-route                       → Automatic 404 via not-found.tsx
```

---

# 14. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 17 — Next.js
* **Sub-module:** 03 — Making Data Flow
* **Topics covered:** SQLite with `sqlite`/`sqlite3`, `getDBConnection()`, database seeding with `tsx`, dynamic SQL builder (`WHERE`/`ORDER BY`/`LIMIT`/`OFFSET`), parameterised queries, `COUNT(*)`, `loading.tsx`, multiple loading files, `useTransition` + `isPending`, `not-found.tsx`, `notFound()`, `redirect()`, `useRouter().push()`, `usePathname` + `useRouter` for sort navigation, `next/image`, `ModelsBrowser` architecture, URL-as-source-of-truth for search/sort/pagination
* **Project:** PrintForge — fully database-backed 3D model marketplace with search, sort, pagination, loading states, and 404 handling
