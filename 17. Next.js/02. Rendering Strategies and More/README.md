# Rendering Strategies and More — Next.js
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=flat-square&logo=tailwindcss)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **Rendering Strategies and More** module from **Scrimba's Fullstack Web Development Path** — an advanced Next.js section that extends PrintForge with category navigation, active link styling, client component deep-dives, three rendering strategies (SSG, SSR, ISR), and search using both native HTML forms and Next.js's `<Form>` component.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every concept introduced in this module, comparing what is new here against the foundation built in `17/01. Build a Next.js App`.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Previous Section](#3-whats-new-vs-previous-section)
4. [Client Components — Deep Dive](#4-client-components--deep-dive)
   - [`usePathname` — Reading the Current URL](#41-usepathname--reading-the-current-url)
   - [Active Link Styling with `NavLink`](#42-active-link-styling-with-navlink)
   - [When Client Components Render on the Server Too](#43-when-client-components-render-on-the-server-too)
5. [Category Routes and Navigation](#5-category-routes-and-navigation)
   - [Categories Nav Bar](#51-categories-nav-bar)
   - [Dynamic Category Pages `[categoryName]`](#52-dynamic-category-pages-categoryname)
   - [Nested Layouts for the Models Section](#53-nested-layouts-for-the-models-section)
6. [Rendering Strategies](#6-rendering-strategies)
   - [Static Site Generation — SSG](#61-static-site-generation--ssg)
   - [Server-Side Rendering — SSR](#62-server-side-rendering--ssr)
   - [Incremental Static Regeneration — ISR](#63-incremental-static-regeneration--isr)
   - [Choosing a Strategy](#64-choosing-a-strategy)
7. [Cat Facts — Rendering Strategy Demo](#7-cat-facts--rendering-strategy-demo)
   - [Fetching External Data in a Server Component](#71-fetching-external-data-in-a-server-component)
   - [`searchParams` in Next.js 15](#72-searchparams-in-nextjs-15)
8. [HTML Form Submissions are Navigation Events](#8-html-form-submissions-are-navigation-events)
9. [Search in PrintForge](#9-search-in-printforge)
   - [Native HTML Form Search](#91-native-html-form-search)
   - [Next.js `<Form>` Component](#92-nextjs-form-component)
   - [Reading `searchParams` on the Server](#93-reading-searchparams-on-the-server)
10. [How the Full App Flow Works](#10-how-the-full-app-flow-works)
11. [How to Run](#11-how-to-run)
12. [Course Reference](#12-course-reference)

---

# 1. Project Overview

This section extends the PrintForge 3D model marketplace with:

* A **Categories navigation bar** (`CategoriesNav`) — a sidebar/top-bar showing all available categories, with the active category highlighted using `usePathname`
* **Category pages** (`/3d-models/categories/[categoryName]`) — dynamic routes that filter models by category
* A **`NavLink` component** — a reusable active-link component that compares `href` to the current pathname and applies active styles
* A **`ModelsGrid` component** — extracted from the models page for reuse across models and category pages
* A **Cat Facts demo app** — a separate `catfacts` route used to demonstrate all three rendering strategies (SSG, SSR, ISR) with external API data
* A **search bar** built first with a native HTML `<form>` and then upgraded to Next.js's `<Form>` component — demonstrating how GET forms work as navigation and how `searchParams` flows from URL to server

---

# 2. Project Structure

```
17. Next.js/
│
└── 02. Rendering Strategies and More/
    ├── app/
    │   ├── layout.tsx                  → Root layout with fonts and Navbar
    │   ├── page.tsx                    → Home page (/)
    │   ├── globals.css                 → Global styles
    │   ├── 3d-models/
    │   │   ├── layout.tsx              → Models section layout — renders CategoriesNav beside children
    │   │   ├── page.tsx                → Models list page with search bar + ModelsGrid
    │   │   ├── [id]/
    │   │   │   └── page.tsx            → Dynamic model detail page
    │   │   └── categories/
    │   │       └── [categoryName]/
    │   │           └── page.tsx        → Dynamic category filter page
    │   ├── components/
    │   │   ├── Navbar.tsx              → Top navigation bar
    │   │   ├── CategoriesNav.tsx       → "use client" — uses usePathname to highlight active category
    │   │   ├── NavLink.tsx             → Reusable link with isActive prop for styling
    │   │   ├── ModelCard.tsx           → Single model card component
    │   │   ├── ModelsGrid.tsx          → Grid of ModelCards (extracted for reuse)
    │   │   └── Pill.tsx               → Category badge component
    │   ├── data/
    │   │   └── models.json             → Static JSON mock data
    │   ├── lib/
    │   │   ├── models.ts               → getAllModels(), getModelById(), getModelsByCategory()
    │   │   └── categories.ts           → getAllCategories() — returns category list
    │   └── types/
    │       └── index.ts                → Shared TypeScript types
    ├── public/                         → Static assets
    ├── next.config.ts                  → Next.js configuration
    └── package.json                    → Dependencies
```

---

# 3. What's New vs Previous Section

## New Concepts in This Section

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `usePathname()` | `CategoriesNav.tsx` | Returns the current URL path — used to detect which link is active |
| `"use client"` on navigation components | `CategoriesNav.tsx` | Required because `usePathname` is a client-side hook |
| Nested layout for a sub-section | `3d-models/layout.tsx` | Adds `CategoriesNav` to all models routes without repeating in every page |
| `categories/[categoryName]` dynamic route | Category pages | Nested dynamic segment — filters models by category slug |
| `searchParams` prop | Models page | Reads URL query string (`?query=dragon`) on the server |
| `next/form` `<Form>` component | Models page search bar | Prefetches the destination page on hover/focus — faster perceived search |
| `fetch()` in Server Components | Cat Facts demo | Direct `await fetch()` without `useEffect` |
| `cache: 'force-cache'` | SSG demo | Caches the response indefinitely — Static Site Generation |
| `cache: 'no-store'` | SSR demo | Fetches fresh on every request — Server-Side Rendering |
| `next: { revalidate: N }` | ISR demo | Caches but regenerates after N seconds — Incremental Static Regeneration |
| `ModelsGrid` component | Both models + category pages | Extracted to avoid duplication between the two pages |
| `NavLink` component | `CategoriesNav` | Reusable link that accepts `isActive` boolean to apply active CSS classes |

## Concepts Carried Over From Section 01

| Concept | From Section | How it Deepens Here |
|---------|-------------|---------------------|
| File-based routing | Section 01 | Extended with nested `categories/[categoryName]` route |
| `layout.tsx` | Section 01 | Now used at the sub-section level (`3d-models/layout.tsx`) |
| Server Components as default | Section 01 | Contrasted more explicitly against Client Components |
| `params` (async in Next.js 15) | Section 01 | Applied to the new `[categoryName]` route |
| `next/link` | Section 01 | Now wrapped inside the custom `NavLink` component |

---

# 4. Client Components — Deep Dive

## 4.1 `usePathname` — Reading the Current URL

`usePathname` is a Next.js hook that returns the current URL path as a string. Because it reads browser state, it **can only be used in a Client Component**.

```typescript
"use client"

import { usePathname } from "next/navigation"

export default function CategoriesNav() {
    const pathname = usePathname()
    // pathname = "/3d-models" on the models list page
    // pathname = "/3d-models/categories/vehicles" on a category page

    return (
        <nav>
            <NavLink href="/3d-models" isActive={pathname === "/3d-models"}>
                All
            </NavLink>
        </nav>
    )
}
```

| Hook | Purpose | Client only? |
|------|---------|-------------|
| `usePathname()` | Current URL path as string | ✅ Yes |
| `useSearchParams()` | Current URL query string | ✅ Yes |
| `useRouter()` | Programmatic navigation | ✅ Yes |
| `useParams()` | Current dynamic route params | ✅ Yes |

## 4.2 Active Link Styling with `NavLink`

The `NavLink` component abstracts the "is this link active?" logic into a reusable component:

```typescript
// app/components/NavLink.tsx — a wrapper around next/link
import Link from "next/link"

type NavLinkProps = {
    href: string
    isActive: boolean
    children: React.ReactNode
}

export default function NavLink({ href, isActive, children }: NavLinkProps) {
    return (
        <li>
            <Link
                href={href}
                className={isActive
                    ? "font-semibold text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }
            >
                {children}
            </Link>
        </li>
    )
}
```

```typescript
// Usage in CategoriesNav.tsx
<NavLink href="/3d-models" isActive={pathname === "/3d-models"}>
    All
</NavLink>

{categories.map(item => (
    <NavLink
        href={`/3d-models/categories/${item.slug}`}
        isActive={pathname === `/3d-models/categories/${item.slug}`}
        key={item.slug}
    >
        {item.displayName}
    </NavLink>
))}
```

> The `isActive` prop is a **boolean derived from the parent** — `CategoriesNav` owns the `usePathname()` call and passes the result down. `NavLink` itself is a pure presentational component and does not need to be a Client Component.

## 4.3 When Client Components Render on the Server Too

A common misconception: `"use client"` does **not** mean "only runs in the browser". Client Components are:

1. **Pre-rendered on the server** — the initial HTML is generated server-side (SSR)
2. **Hydrated on the client** — React attaches event listeners and activates hooks in the browser

```
"use client" component lifecycle:

  Server:
    Component runs → generates HTML → sent in the HTTP response
    (usePathname returns the server's view of the URL)

  Browser:
    Same component runs again → React "hydrates" the HTML
    (usePathname now reads the live browser URL)
    → event handlers attached, hooks activated
```

> `"use client"` marks the **boundary** between server-only and client code. Everything in that file (and its imports) must be safe to run in both environments. If you import a Node.js-only module in a Client Component, you will get a build error.

---

# 5. Category Routes and Navigation

## 5.1 Categories Nav Bar

`CategoriesNav` is a sticky navigation element showing all available categories. On desktop it appears as a fixed sidebar; on mobile it becomes a horizontally scrollable top bar.

```typescript
// app/components/CategoriesNav.tsx
"use client"

import NavLink from "@/app/components/NavLink"
import { usePathname } from "next/navigation"
import { getAllCategories } from "@/app/lib/categories"
import type { Category } from "@/app/types"

export default function CategoriesNav() {
    const pathname = usePathname()
    const categories: Category[] = getAllCategories()

    return (
        <aside className="sticky top-0 z-10 w-full bg-white border-b md:fixed md:w-64">
            <nav>
                <ul className="flex px-4 py-3 md:flex-col">
                    <NavLink href="/3d-models" isActive={pathname === "/3d-models"}>
                        All
                    </NavLink>
                    {categories.map(item => (
                        <NavLink
                            href={`/3d-models/categories/${item.slug}`}
                            isActive={pathname === `/3d-models/categories/${item.slug}`}
                            key={item.slug}
                        >
                            {item.displayName}
                        </NavLink>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
```

## 5.2 Dynamic Category Pages `[categoryName]`

```
app/3d-models/categories/[categoryName]/page.tsx

URL: /3d-models/categories/vehicles  →  params.categoryName = "vehicles"
URL: /3d-models/categories/animals   →  params.categoryName = "animals"
```

```typescript
// app/3d-models/categories/[categoryName]/page.tsx
type CategoryPageProps = {
    params: Promise<{ categoryName: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { categoryName } = await params
    const models = await getModelsByCategory(categoryName)

    return (
        <ModelsGrid title={categoryName} models={models} />
    )
}
```

## 5.3 Nested Layouts for the Models Section

The `3d-models/layout.tsx` wraps all models routes (list page, detail page, and category pages) with the `CategoriesNav` sidebar, without putting it in the root layout (where it would appear on every page including the home page).

```typescript
// app/3d-models/layout.tsx
import CategoriesNav from "@/app/components/CategoriesNav"

type ModelsLayoutProps = {
    children: React.ReactNode
}

export default function ModelsLayout({ children }: ModelsLayoutProps) {
    return (
        <div className="flex flex-col md:flex-row">
            <CategoriesNav />     {/* ← shows on all /3d-models/* routes */}
            <main className="flex-1 md:ml-64">
                {children}        {/* ← the matched page renders here */}
            </main>
        </div>
    )
}
```

```
Layout nesting:
  RootLayout (app/layout.tsx)            → wraps everything
    └── ModelsLayout (3d-models/layout.tsx) → wraps /3d-models/* only
          └── ModelsPage or CategoryPage   → the actual page content
```

---

# 6. Rendering Strategies

## 6.1 Static Site Generation — SSG

```typescript
// SSG: data fetched once at BUILD TIME — same response for all users
async function getData() {
    const res = await fetch('https://catfact.ninja/fact', {
        cache: 'force-cache'    // ← SSG: cache the response forever
    })
    return res.json()
}
```

```
Build time:                         Request time:
  fetch('catfact.ninja/fact')  →   cached HTML served instantly
  HTML generated once          →   no fetch, no waiting
  saved as static file              same fact for every user
```

| | SSG |
|--|-----|
| **When data is fetched** | Once, at build time |
| **Page generated** | Once, at build time |
| **Response speed** | Fastest — pre-built HTML |
| **Data freshness** | Stale until next build |
| **Best for** | Marketing pages, blogs, docs |

## 6.2 Server-Side Rendering — SSR

```typescript
// SSR: data fetched on EVERY request — always fresh, always the latest
async function getData() {
    const res = await fetch('https://catfact.ninja/fact', {
        cache: 'no-store'    // ← SSR: never cache, always fetch fresh
    })
    return res.json()
}
```

```
Every request:
  User visits → server fetches data → generates HTML → sends response
  Next user visits → server fetches again → new HTML → new response
```

| | SSR |
|--|-----|
| **When data is fetched** | On every request |
| **Page generated** | On every request |
| **Response speed** | Slower — waits for the data source |
| **Data freshness** | Always current |
| **Best for** | Dashboards, user-specific data, stock prices |

## 6.3 Incremental Static Regeneration — ISR

```typescript
// ISR: cached like SSG, but regenerated after N seconds
async function getData() {
    const res = await fetch('https://catfact.ninja/fact', {
        next: { revalidate: 60 }    // ← ISR: regenerate every 60 seconds
    })
    return res.json()
}
```

```
First request:       fetch → generate → cache → serve
Next 60 seconds:     serve from cache (fast)
After 60 seconds:    serve stale cache + trigger background re-fetch
Next request after:  serve the newly cached version
```

| | ISR |
|--|-----|
| **When data is fetched** | On first request, then every N seconds in background |
| **Page generated** | Cached statically, refreshed on schedule |
| **Response speed** | Fast (always serves cache) |
| **Data freshness** | At most N seconds stale |
| **Best for** | Product listings, news feeds, leaderboards |

## 6.4 Choosing a Strategy

| Strategy | `fetch` option | Use when... |
|----------|---------------|-------------|
| **SSG** | `cache: 'force-cache'` | Data never changes or changes rarely; maximum speed needed |
| **SSR** | `cache: 'no-store'` | Data changes constantly or is user-specific |
| **ISR** | `next: { revalidate: N }` | Data changes on a schedule; balance of speed and freshness |
| **Default (Next.js 15)** | No option specified | SSR behaviour (Next.js 15 changed the default from SSG to SSR) |

> In **Next.js 15**, `fetch()` without any cache option defaults to **no caching (SSR)**. This is a breaking change from Next.js 13/14 where the default was `force-cache` (SSG). Always specify your caching intent explicitly.

---

# 7. Cat Facts — Rendering Strategy Demo

## 7.1 Fetching External Data in a Server Component

Because Server Components can be `async`, you can `await` a `fetch()` call directly at the top level of a component — no `useEffect`, no loading state management:

```typescript
// app/catfacts/page.tsx — SSG example
export default async function CatFactsPage() {
    const data = await fetch('https://catfact.ninja/fact', {
        cache: 'force-cache'
    })
    const { fact } = await data.json()

    return (
        <main>
            <h1>Cat Fact of the Day</h1>
            <p>{fact}</p>
            <small>This fact was fetched at build time (SSG)</small>
        </main>
    )
}
```

Compare to the old Vite + React pattern:

```typescript
// ❌ Old pattern (Vite + React) — required useEffect + useState
function CatFactsPage() {
    const [fact, setFact] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://catfact.ninja/fact')
            .then(r => r.json())
            .then(data => {
                setFact(data.fact)
                setLoading(false)
            })
    }, [])

    if (loading) return <p>Loading...</p>
    return <p>{fact}</p>
}

// ✅ Next.js Server Component — async/await directly
async function CatFactsPage() {
    const { fact } = await fetch('https://catfact.ninja/fact').then(r => r.json())
    return <p>{fact}</p>
}
```

## 7.2 `searchParams` in Next.js 15

`searchParams` is the URL query string (the `?key=value` part). In Next.js 15, it is a **Promise** that must be awaited, just like `params`:

```typescript
// URL: /catfacts?type=food
type CatFactsPageProps = {
    searchParams: Promise<{ type?: string }>
}

export default async function CatFactsPage({ searchParams }: CatFactsPageProps) {
    const { type } = await searchParams    // ← must await in Next.js 15
    const url = type
        ? `https://catfact.ninja/fact?type=${type}`
        : 'https://catfact.ninja/fact'

    const { fact } = await fetch(url).then(r => r.json())
    return <p>{fact}</p>
}
```

| Prop | Type in Next.js 15 | What it contains |
|------|-------------------|-----------------|
| `params` | `Promise<{ [segment]: string }>` | Dynamic route segments: `/3d-models/[id]` → `{ id: "5" }` |
| `searchParams` | `Promise<{ [key]: string }>` | URL query string: `?query=dragon&sort=recent` → `{ query: "dragon", sort: "recent" }` |

---

# 8. HTML Form Submissions are Navigation Events

A key insight introduced in this module: **a `<form method="GET">` submission is a navigation event**, not a JavaScript event.

```html
<!-- When the user submits this form with "dragon" typed in the input: -->
<form method="GET" action="/3d-models">
    <input type="text" name="query" />
    <button type="submit">Search</button>
</form>

<!-- The browser navigates to: /3d-models?query=dragon -->
<!-- This is identical to the user manually typing that URL -->
<!-- No JavaScript required. No event.preventDefault() needed. -->
```

```
Form submit flow:
  User types "dragon" → clicks Search
    → Browser builds URL: /3d-models?query=dragon
    → Browser navigates to that URL (full page navigation)
    → Next.js server handles /3d-models with searchParams.query = "dragon"
    → Page rendered with filtered results
```

This is the foundation of Next.js's search pattern: GET forms are URL-driven, and Server Components can read `searchParams` from the URL. No client-side state management required for basic search.

> GET forms are a web platform primitive — they work with or without JavaScript. Next.js's `<Form>` component enhances this behaviour but does not replace it. Always understand the native behaviour before using the framework abstraction.

---

# 9. Search in PrintForge

## 9.1 Native HTML Form Search

```typescript
// First implementation — standard HTML form
export default async function Page({ searchParams }: ModelsPageProps) {
    const query = (await searchParams)?.query?.toLowerCase() || ""
    const models = await getModels()

    const filteredModels = query
        ? models.filter(model =>
            model.name.toLowerCase().includes(query) ||
            model.description.toLowerCase().includes(query)
        )
        : models

    return (
        <>
            {/* A plain GET form — no JavaScript needed for basic search */}
            <form className="w-full max-w-xl">
                <input type="text" name="query" defaultValue={query} />
            </form>
            <ModelsGrid title="3D Models" models={filteredModels} />
        </>
    )
}
```

`defaultValue={query}` pre-fills the search input with the current search term from the URL, so the user can see what they searched for after the page loads.

## 9.2 Next.js `<Form>` Component

```typescript
// Upgraded implementation — next/form
import Form from "next/form"

export default async function Page({ searchParams }: ModelsPageProps) {
    const query = (await searchParams)?.query?.toLowerCase() || ""

    return (
        <>
            {/* next/form wraps the native form with prefetching */}
            <Form action="/3d-models" className="w-full max-w-xl">
                <input
                    type="text"
                    name="query"
                    placeholder="E.g. dragon"
                    autoComplete="off"
                    defaultValue={query}
                />
            </Form>
            <ModelsGrid title="3D Models" models={filteredModels} />
        </>
    )
}
```

| Feature | `<form>` | `<Form>` (next/form) |
|---------|---------|---------------------|
| GET form submission | ✅ Yes | ✅ Yes |
| Works without JS | ✅ Yes | ✅ Yes |
| Prefetches the action URL | ❌ No | ✅ Yes — on hover/focus |
| Faster perceived search | ❌ No | ✅ Yes |
| Scroll reset on submit | Default browser | Managed by Next.js |

> `<Form>` from `next/form` is a **progressive enhancement** — it behaves like a regular HTML form but prefetches the destination page when the user focuses the input or hovers the submit button, making the search feel instant.

## 9.3 Reading `searchParams` on the Server

```typescript
// The searchParams prop is available on every page.tsx in Next.js
type ModelsPageProps = {
    searchParams: Promise<{
        query?: string
    }>
}

export default async function Page({ searchParams }: ModelsPageProps) {
    // Await the searchParams Promise (Next.js 15 requirement)
    const { query } = await searchParams

    // query is a string if the URL has ?query=something, otherwise undefined
    const safeQuery = query?.toLowerCase() || ""

    // Filter the models on the SERVER — no client-side JS needed
    const models = await getModels()
    const filtered = safeQuery
        ? models.filter(m =>
            m.name.toLowerCase().includes(safeQuery) ||
            m.description.toLowerCase().includes(safeQuery))
        : models

    return <ModelsGrid models={filtered} />
}
```

---

# 10. How the Full App Flow Works

```
User visits /3d-models

  ModelsLayout renders:
    ├── <CategoriesNav /> (Client Component)
    │     └── usePathname() = "/3d-models"
    │     └── "All" NavLink → isActive=true → highlighted
    └── <Page /> (Server Component, async)
          ├── searchParams awaited → no query in URL
          ├── getAllModels() → all 15 models from JSON
          └── <ModelsGrid models={all15} />

User searches "dragon" → form submits → /3d-models?query=dragon

  URL changes → Next.js re-renders the page server-side
    └── <Page /> re-runs on server
          ├── searchParams awaited → { query: "dragon" }
          ├── getAllModels() → all models
          ├── filter → models matching "dragon"
          └── <ModelsGrid models={filtered} />
    └── <CategoriesNav /> re-hydrates
          ├── usePathname() = "/3d-models" (same)
          └── "All" still highlighted

User clicks "Vehicles" category → /3d-models/categories/vehicles

  ModelsLayout stays mounted (same layout)
    └── <CategoriesNav /> re-hydrates
          ├── usePathname() = "/3d-models/categories/vehicles"
          └── "Vehicles" NavLink → isActive=true → highlighted
    └── CategoryPage renders (Server Component):
          ├── params awaited → { categoryName: "vehicles" }
          ├── getModelsByCategory("vehicles") → filtered models
          └── <ModelsGrid title="Vehicles" models={vehicleModels} />
```

---

# 11. How to Run

```bash
# 1. Navigate to the project directory
cd "17. Next.js/02. Rendering Strategies and More"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open `http://localhost:3000` in your browser. Test the features:

```
http://localhost:3000/                            → Home page
http://localhost:3000/3d-models                   → All models
http://localhost:3000/3d-models?query=dragon      → Search results
http://localhost:3000/3d-models/categories/animals → Category page
http://localhost:3000/3d-models/1                 → Model detail page
```

---

# 12. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 17 — Next.js
* **Sub-module:** 02 — Rendering Strategies and More
* **Topics covered:** `usePathname`, active link styling, `CategoriesNav`, nested dynamic routes `categories/[categoryName]`, nested layouts, SSG / SSR / ISR with `fetch` cache options, `searchParams` (async in Next.js 15), native HTML GET forms as navigation, `next/form` `<Form>` component, client component deep-dive
* **Project:** PrintForge — extended with category browsing, active navigation, and server-side search
* **Builds toward:** `03. Making Data Flow` — which replaces the JSON mock data with a real SQLite database and adds sorting, full-text search, loading states, not-found handling, and pagination
