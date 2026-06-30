# Build a Next.js App — Next.js
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-38B2AC?style=flat-square&logo=tailwindcss)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Albert%20Sans%20%7C%20Montserrat-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **Build a Next.js App** module from **Scrimba's Fullstack Web Development Path** — a foundational section that builds **PrintForge**, a 3D model browsing platform, from scratch using Next.js 15 App Router, file-based routing, layouts, font optimisation, image optimisation, and dynamic routes.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every Next.js concept introduced in this module, comparing what is new here against the React + Vite patterns covered in `13. React.js Fundamentals` and `15. Advanced React.js`.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is Next.js?](#3-what-is-nextjs)
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [Setting Up a Next.js Project](#5-setting-up-a-nextjs-project)
   - [Running `create-next-app`](#51-running-create-next-app)
   - [The Generated File Structure](#52-the-generated-file-structure)
6. [File-Based Routing](#6-file-based-routing)
   - [How Routes are Defined](#61-how-routes-are-defined)
   - [Adding a New Page](#62-adding-a-new-page)
   - [Nested Routes](#63-nested-routes)
7. [Layouts](#7-layouts)
   - [Root Layout](#71-root-layout)
   - [Nested Layouts](#72-nested-layouts)
8. [Client vs. Server Components](#8-client-vs-server-components)
   - [Server Components — Default Behaviour](#81-server-components--default-behaviour)
   - [Client Components — `"use client"`](#82-client-components--use-client)
9. [Optimising Fonts — `next/font/google`](#9-optimising-fonts--nextfontgoogle)
10. [Optimising Images — `next/image`](#10-optimising-images--nextimage)
11. [Links in Next.js — `next/link`](#11-links-in-nextjs--nextlink)
12. [Dynamic Routes](#12-dynamic-routes)
    - [Creating a Dynamic Segment `[id]`](#121-creating-a-dynamic-segment-id)
    - [Reading Route Params — `params`](#122-reading-route-params--params)
    - [The Model Detail Page](#123-the-model-detail-page)
13. [TypeScript Organisation in PrintForge](#13-typescript-organisation-in-printforge)
14. [How the Full App Flow Works](#14-how-the-full-app-flow-works)
15. [How to Run](#15-how-to-run)
16. [Course Reference](#16-course-reference)

---

# 1. Project Overview

**PrintForge** is a fictional 3D printing marketplace — a clean, content-focused browsing platform where users can discover and explore user-submitted 3D models. The app includes:

* A **home page** with a hero section, tagline, and a "Browse Models" call-to-action
* A **3D Models listing page** (`/3d-models`) displaying a grid of model cards loaded from a JSON data source
* A **Model Detail page** (`/3d-models/[id]`) showing a single model's name, description, category, likes, and date added
* An **About page** (`/about`) as a second static route
* A **persistent Navbar** rendered via the root layout — shown on every page without remounting
* **Google Fonts** loaded and optimised via `next/font/google`
* **Static images** served with placeholder pattern, ready to be upgraded to `next/image`

The goal of this module is not just to build a page — it is to understand how Next.js's **App Router** fundamentally differs from single-page React apps: routing is file-system driven, layouts eliminate repeated JSX, and every component is a Server Component by default.

---

# 2. Project Structure

```
17. Next.js/
│
└── 01. Build a Next.js App/
    ├── app/
    │   ├── layout.tsx              → Root layout — wraps every page with <Navbar /> and fonts
    │   ├── page.tsx                → Home page route (/)
    │   ├── globals.css             → Global CSS reset and base styles
    │   ├── about/
    │   │   └── page.tsx            → About page route (/about)
    │   ├── 3d-models/
    │   │   ├── page.tsx            → Models list page (/3d-models)
    │   │   └── [id]/
    │   │       └── page.tsx        → Dynamic model detail page (/3d-models/[id])
    │   ├── components/
    │   │   ├── Navbar.tsx          → Top navigation bar with logo and nav links
    │   │   ├── ModelCard.tsx       → Single card showing a model's image, name, category, likes
    │   │   └── Pill.tsx            → Small badge/chip for category labels
    │   ├── data/
    │   │   └── models.json         → Static JSON array of 3D model objects (mock database)
    │   ├── lib/
    │   │   └── models.ts           → getAllModels() and getModelById() data access functions
    │   └── types/
    │       └── index.ts            → Shared TypeScript types: Model, ModelCardProps, etc.
    ├── public/
    │   ├── hero-image.png          → Homepage hero image
    │   ├── placeholder.png         → Placeholder used for model images
    │   └── printforge-logo.svg     → PrintForge brand logo (desktop)
    ├── next.config.ts              → Next.js configuration
    ├── tsconfig.json               → TypeScript configuration with path alias @/
    ├── tailwind.config.js          → Tailwind CSS configuration
    └── package.json                → Dependencies: next, react, react-icons, tailwindcss
```

---

# 3. What is Next.js?

**Next.js** is a **full-stack React framework** built on top of React 19. While React alone handles UI rendering, Next.js adds the layers needed to build complete web applications:

```
┌──────────────────────────────────────────────────────────────┐
│                         Next.js                               │
├──────────────────────────────────────────────────────────────┤
│  File-based routing    → folders + page.tsx = URL routes     │
│  Server Components     → components that run on the server   │
│  Layouts               → shared UI wrapping multiple pages   │
│  Font optimisation     → next/font/google (zero layout shift)│
│  Image optimisation    → next/image (lazy, responsive, WebP) │
│  API Routes            → backend endpoints inside the app    │
│  Built-in TypeScript   → zero config, first-class support    │
└──────────────────────────────────────────────────────────────┘
```

| Feature | Vite + React (previous) | Next.js App Router |
|---------|------------------------|--------------------|
| Routing | React Router v6 (`<Routes>`) | File system — create a folder = create a route |
| Components | All client-side by default | All Server Components by default |
| Data fetching | `useEffect` + `fetch()` | `async` server components, `await` at the top level |
| Fonts | Manual `<link>` in HTML | `next/font/google` — self-hosted, zero layout shift |
| Images | `<img>` tag | `next/image` — lazy loading, auto WebP conversion |
| Layouts | Manually repeated JSX | `layout.tsx` — wraps all child routes automatically |

> Next.js is not a replacement for React — it is a **framework built on React**. Every Next.js component is a React component. The difference is in what happens before the component reaches the browser.

---

# 4. What's New vs Previous Projects

## New Next.js Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `app/` directory | Project root | The App Router — all routes live inside this folder |
| `page.tsx` | Every route folder | The file that exports the page component for that URL |
| `layout.tsx` | Root + nested routes | Wraps child pages with persistent UI (Navbar, fonts) |
| `next/font/google` | `layout.tsx` | Loads Google Fonts as self-hosted assets — no FOUT |
| `next/link` | All navigation | Client-side navigation without full page reload |
| `[id]` folder | `3d-models/[id]/` | Dynamic route segment — captures the URL parameter |
| `params` prop | `3d-models/[id]/page.tsx` | Object containing the dynamic segment values |
| `"use client"` directive | Client components | Opts a component out of server rendering |
| Server Component | Default | Components with no `"use client"` — run only on server |
| `async` page component | `3d-models/page.tsx` | Fetches data directly without `useEffect` |
| `@/` path alias | All imports | Resolves to the project root — replaces long relative paths |

## Concepts Carried Over From Previous Modules

| Concept | Originally Introduced In | How It Deepens Here |
|---------|--------------------------|---------------------|
| React components | `13. React.js Fundamentals` | Now split into Server and Client Components |
| Props and TypeScript typing | `16. TypeScript in React` | Props types defined in `types/index.ts` and imported |
| Tailwind CSS | Previous modules | Used throughout — layout, typography, responsive design |
| `Link` navigation | `React Router` module | Now `next/link` instead of `react-router-dom` |
| Data fetching pattern | `07. APIs and Async JS` | Now done directly in `async` Server Components |

---

# 5. Setting Up a Next.js Project

## 5.1 Running `create-next-app`

```bash
npx create-next-app@latest my-app
```

The interactive prompt asks for:

```
✔ What is your project named? › my-app
✔ Would you like to use TypeScript? › Yes
✔ Would you like to use ESLint? › Yes
✔ Would you like to use Tailwind CSS? › Yes
✔ Would you like your code inside a `src/` directory? › No
✔ Would you like to use App Router? (recommended) › Yes
✔ Would you like to use Turbopack for next dev? › No
✔ Would you like to customize the import alias (@/* by default)? › No
```

After setup:
```bash
cd my-app
npm run dev   # starts the dev server at http://localhost:3000
```

## 5.2 The Generated File Structure

```
my-app/
├── app/
│   ├── favicon.ico
│   ├── globals.css       → base styles + Tailwind directives
│   ├── layout.tsx        → root layout — wraps all pages
│   └── page.tsx          → homepage (/)
├── public/               → static assets — served at /filename
├── next.config.ts        → Next.js configuration
├── tailwind.config.js    → Tailwind configuration
├── tsconfig.json         → TypeScript config with "@/*" alias
└── package.json
```

> The `public/` folder is special — files placed here are accessible at the root URL. `public/logo.png` is served as `/logo.png`. Never put sensitive files here.

---

# 6. File-Based Routing

## 6.1 How Routes are Defined

In Next.js App Router, **routes are defined by the folder structure inside `app/`**. A folder becomes a route segment; the `page.tsx` file inside it defines what is rendered at that URL.

```
app/
├── page.tsx              → /
├── about/
│   └── page.tsx          → /about
└── 3d-models/
    ├── page.tsx          → /3d-models
    └── [id]/
        └── page.tsx      → /3d-models/1, /3d-models/42, etc.
```

```typescript
// app/about/page.tsx — this file creates the /about route
export default function AboutPage() {
    return <main><h1>About PrintForge</h1></main>
}
```

The **only requirement** to create a route is:
1. Create a folder with the route name inside `app/`
2. Add a `page.tsx` file that exports a default React component

| File | URL | Purpose |
|------|-----|---------|
| `app/page.tsx` | `/` | Homepage |
| `app/about/page.tsx` | `/about` | About page |
| `app/3d-models/page.tsx` | `/3d-models` | Models listing |
| `app/3d-models/[id]/page.tsx` | `/3d-models/:id` | Dynamic model detail |

## 6.2 Adding a New Page

```bash
# 1. Create the folder
mkdir app/contact

# 2. Create the page file
touch app/contact/page.tsx
```

```typescript
// app/contact/page.tsx
export default function ContactPage() {
    return (
        <main>
            <h1>Contact Us</h1>
            <p>Get in touch with the PrintForge team.</p>
        </main>
    )
}
```

Visiting `http://localhost:3000/contact` immediately shows this page — no router configuration required.

> **No `<Routes>` or `<Route>` components** — Next.js reads the file system and builds the routing table automatically at build time. Adding a page is as simple as adding a file.

## 6.3 Nested Routes

Nested folders create nested URL paths:

```
app/
└── 3d-models/          → /3d-models
    ├── page.tsx
    └── [id]/           → /3d-models/:id
        └── page.tsx
```

Deeper nesting = deeper URL path. The `[id]` folder is a **dynamic segment** — covered in [Section 12](#12-dynamic-routes).

---

# 7. Layouts

## 7.1 Root Layout

The root layout (`app/layout.tsx`) is the **one required file** in every Next.js app. It wraps every single page in the entire application.

```typescript
// app/layout.tsx
import "./globals.css"
import type { RootLayoutProps } from "@/app/types"
import { Albert_Sans, Montserrat_Alternates } from "next/font/google"
import Navbar from "@/app/components/Navbar"

const albertSans = Albert_Sans({
    subsets: ["latin"],
    display: "swap"
})

const montserratAlternates = Montserrat_Alternates({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "700"],
    variable: "--font-montserrat-alternates"
})

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={`${albertSans.className} ${montserratAlternates.variable}`}>
                <Navbar />       {/* ← rendered on EVERY page */}
                {children}       {/* ← the current page goes here */}
            </body>
        </html>
    )
}
```

`children` is the currently matched `page.tsx` component. The `<Navbar />` renders once and persists across navigation — it does not unmount and remount when the user navigates between pages.

```
User visits /3d-models:
    RootLayout renders:
        <html>
          <body>
            <Navbar />              ← always here
            <ModelsPage />         ← children = this page
          </body>
        </html>

User navigates to /about (client-side):
    RootLayout does NOT re-render:
        <html>
          <body>
            <Navbar />              ← same instance, no remount
            <AboutPage />          ← children = swapped to this
          </body>
        </html>
```

## 7.2 Nested Layouts

You can add a `layout.tsx` inside any subfolder to wrap only those routes:

```typescript
// app/3d-models/layout.tsx — wraps /3d-models and /3d-models/[id]
export default function ModelsLayout({ children }) {
    return (
        <div className="flex">
            <SidebarNav />    {/* ← only shows on models pages */}
            <main>{children}</main>
        </div>
    )
}
```

| Layout file | Wraps |
|------------|-------|
| `app/layout.tsx` | Every page in the app |
| `app/3d-models/layout.tsx` | `/3d-models` and all its sub-routes |
| `app/3d-models/[id]/layout.tsx` | Only `/3d-models/:id` pages |

> Layouts are **nested**, not replaced. The root layout always renders; a nested layout renders inside it. This is the "Russian nesting doll" model of Next.js layouts.

---

# 8. Client vs. Server Components

## 8.1 Server Components — Default Behaviour

In Next.js App Router, **every component is a Server Component by default**. Server Components:

- Run only on the server — never sent to the browser as JavaScript
- Can be `async` — can `await` database calls or API fetches directly
- Cannot use `useState`, `useEffect`, event handlers, or browser APIs
- Produce smaller JavaScript bundles (the component code is not shipped to the client)

```typescript
// app/3d-models/page.tsx — this is a Server Component
// Note: no "use client" directive

export default async function ModelsPage() {
    // ✅ Direct async data access — no useEffect needed
    const models = await getAllModels()

    return (
        <main>
            {models.map(model => <ModelCard key={model.id} model={model} />)}
        </main>
    )
}
```

## 8.2 Client Components — `"use client"`

A component becomes a **Client Component** when you add `"use client"` as the first line of the file. Client Components:

- Run on both server (for initial HTML) and client (for interactivity)
- Can use `useState`, `useEffect`, event handlers, and browser APIs
- Are "hydrated" in the browser — their JavaScript is included in the bundle

```typescript
// ❌ This would fail in a Server Component — useState is client-only
import { useState } from "react"

// ✅ Must add "use client" to use React hooks
"use client"

import { useState } from "react"

export default function Counter() {
    const [count, setCount] = useState(0)
    return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

| Feature | Server Component | Client Component |
|---------|-----------------|-----------------|
| `async` / `await` | ✅ Yes | ❌ No (use React Query) |
| `useState` / `useEffect` | ❌ No | ✅ Yes |
| Event handlers (`onClick`) | ❌ No | ✅ Yes |
| Browser APIs (`window`) | ❌ No | ✅ Yes |
| Database access | ✅ Yes | ❌ No |
| Bundle size impact | None (not shipped) | Added to JS bundle |

> **Default to Server Components.** Only reach for `"use client"` when you specifically need interactivity, hooks, or browser APIs. Keeping components on the server reduces the JavaScript sent to the browser.

---

# 9. Optimising Fonts — `next/font/google`

```typescript
// app/layout.tsx
import { Albert_Sans, Montserrat_Alternates } from "next/font/google"

// Font objects are created at module level — once per app startup
const albertSans = Albert_Sans({
    subsets: ["latin"],
    display: "swap"        // "swap" prevents invisible text during font load
})

const montserratAlternates = Montserrat_Alternates({
    subsets: ["latin"],
    display: "swap",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-montserrat-alternates"  // ← CSS variable for use in Tailwind
})

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            {/* Apply both fonts to the body */}
            <body className={`${albertSans.className} ${montserratAlternates.variable}`}>
                {children}
            </body>
        </html>
    )
}
```

`next/font/google` **downloads the font files at build time** and self-hosts them. The browser fetches fonts from the same origin as the app — no request to Google's servers at runtime.

| Approach | Network request to Google? | Layout shift? | Performance |
|----------|--------------------------|--------------|-------------|
| `<link>` to Google Fonts | ✅ Yes — on every page load | Possible FOUT | Slower |
| `next/font/google` | ❌ No — self-hosted at build | Zero (font preloaded) | Faster |

| Font option | Effect |
|------------|--------|
| `.className` | Returns a class like `__Albert_Sans_abc123` — apply directly to element |
| `.variable` | Returns a CSS variable name like `--font-montserrat-alternates` — use in Tailwind config |
| `display: "swap"` | Shows fallback font while custom font loads — avoids invisible text |
| `subsets: ["latin"]` | Only downloads the character set you need — reduces file size |

---

# 10. Optimising Images — `next/image`

```typescript
// ❌ Plain <img> — no optimisation
<img src="/hero-image.png" className="w-[350px]" alt="Hero" />

// ✅ next/image — automatic optimisation
import Image from "next/image"

<Image
    src="/hero-image.png"
    width={350}
    height={350}
    alt="Hero"
    className="rounded-lg"
/>

// ✅ Or import the image directly (TypeScript-safe, gets width/height automatically)
import HeroImage from "@/public/hero-image.png"

<img src={HeroImage.src} className="w-[350px] h-auto rounded-lg" alt="Hero" />
```

When using `next/image` (the `<Image>` component):

| Feature | `<img>` | `<Image>` |
|---------|---------|-----------|
| Lazy loading | ❌ No | ✅ Automatic |
| WebP conversion | ❌ No | ✅ Automatic |
| Size optimisation | ❌ No | ✅ Serves correct size per device |
| Layout shift prevention | ❌ No | ✅ Reserves space with width/height |
| Required props | None | `src`, `alt`, `width`, `height` (or `fill`) |

> `width` and `height` on `<Image>` do not fix the displayed size — they define the **intrinsic aspect ratio** to prevent Cumulative Layout Shift (CLS). Use CSS classes (`className`) to control the actual display size.

---

# 11. Links in Next.js — `next/link`

```typescript
import Link from "next/link"

// ✅ Use <Link> for internal navigation
<Link href="/3d-models">Browse Models</Link>

// ✅ Dynamic href using template literal
<Link href={`/3d-models/${model.id}`}>View Model</Link>

// ❌ Never use <a> for internal navigation — causes full page reload
<a href="/3d-models">Browse Models</a>   // full page reload, loses client state
```

`next/link` intercepts the click and performs **client-side navigation** — only the page component (not the layout) changes. The browser does not reload. Scroll position is managed, and the back button works correctly.

| Navigation type | Component | Full page reload? | Preserves layout? |
|----------------|-----------|------------------|------------------|
| Internal page | `<Link href="/about">` | ❌ No | ✅ Yes |
| External URL | `<a href="https://...">` | ✅ Yes (browser standard) | N/A |
| Programmatic | `useRouter().push('/about')` | ❌ No | ✅ Yes |

> Always use `next/link` for navigation within your Next.js app. Using a plain `<a>` tag causes a full page reload, re-runs all layout effects, and loses any client-side state.

---

# 12. Dynamic Routes

## 12.1 Creating a Dynamic Segment `[id]`

A folder name wrapped in square brackets creates a **dynamic route segment**:

```
app/3d-models/
└── [id]/
    └── page.tsx    → matches /3d-models/1, /3d-models/42, /3d-models/dragon-skull
```

The `[id]` folder name is the **parameter name** — whatever the user types in the URL after `/3d-models/` becomes the value of `params.id`.

```
URL visited:          What Next.js provides to the page:
/3d-models/1     →   params = { id: "1" }
/3d-models/42    →   params = { id: "42" }
/3d-models/abc   →   params = { id: "abc" }
```

## 12.2 Reading Route Params — `params`

In Next.js 15, `params` is a **Promise** — it must be awaited:

```typescript
// app/3d-models/[id]/page.tsx
type ModelDetailPageProps = {
    params: Promise<{ id: string }>
}

export default async function ModelDetailPage({ params }: ModelDetailPageProps) {
    const { id } = await params          // ← await params first
    const model = await getModelById(id) // ← then use the id

    return (
        <article>
            <h1>{model.name}</h1>
            <p>{model.description}</p>
        </article>
    )
}
```

> `params` must be awaited in Next.js 15+ — it is an async API. Forgetting the `await` is a common bug when migrating from Next.js 14. The TypeScript type `Promise<{ id: string }>` serves as a reminder.

## 12.3 The Model Detail Page

```typescript
// app/3d-models/[id]/page.tsx — the full model detail implementation
import { FaRegHeart } from "react-icons/fa6"
import Pill from "@/app/components/Pill"
import { getModelById } from "@/app/lib/models"

export default async function ModelDetailPage({ params }: ModelDetailPageProps) {
    const { id } = await params
    const model = await getModelById(id)

    return (
        <div className="container max-w-6xl px-4 py-8 mx-auto">
            <article className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Image */}
                <figure className="relative overflow-hidden rounded-lg shadow-lg aspect-square">
                    <img src={placeholderImg.src} alt={`3D model of ${model.name}`} />
                </figure>

                {/* Content */}
                <section>
                    <div className="flex items-center text-2xl" role="status">
                        <FaRegHeart aria-hidden="true" />
                        <span aria-label={`${model.likes} likes`}>{model.likes}</span>
                    </div>
                    <h1>{model.name}</h1>
                    <Pill>{model.category}</Pill>
                    <p>{model.description}</p>
                    <time dateTime={model.dateAdded}>
                        Added on {new Date(model.dateAdded).toLocaleDateString()}
                    </time>
                </section>
            </article>
        </div>
    )
}
```

---

# 13. TypeScript Organisation in PrintForge

This module introduces a pattern for organising TypeScript types in a Next.js project: a dedicated `types/` folder with a single `index.ts` that exports all shared types.

```typescript
// app/types/index.ts
export type Model = {
    id: number
    name: string
    description: string
    category: string
    likes: number
    dateAdded: string
}

export type ModelCardProps = {
    model: Model
}

export type RootLayoutProps = {
    children: React.ReactNode
}

export type ModelDetailPageProps = {
    params: Promise<{ id: string }>
}
```

```typescript
// Usage across the app — import from the central types file
import type { Model, ModelCardProps } from "@/app/types"
import type { RootLayoutProps } from "@/app/types"
```

| Pattern | Alternative | Why this approach |
|---------|------------|-------------------|
| Central `types/index.ts` | Types inside each component file | Types are shared — `Model` is used by `ModelCard`, `ModelDetailPage`, and `getModelById` |
| `import type` | `import` | Type-only imports are stripped at compile time — zero runtime cost |
| `@/app/types` path alias | `../../types` | Shorter, always works regardless of nesting depth |

---

# 14. How the Full App Flow Works

```
User visits http://localhost:3000/

  Next.js server receives request
  └── Matches app/page.tsx (Home route)
        └── RootLayout wraps Home:
              ├── <Navbar /> renders (Server Component — no JS shipped)
              └── <Home /> renders hero section + "Browse Models" Link

User clicks "Browse Models" → /3d-models

  Client-side navigation (NO full page reload)
  └── Next.js fetches the new page component
        └── RootLayout stays mounted, <Navbar /> does NOT remount
        └── app/3d-models/page.tsx executes on SERVER:
              ├── getAllModels() called → reads models.json
              ├── Models array passed to <ModelCard /> for each model
              └── HTML sent to browser — no client JS for data fetching

User clicks a model card → /3d-models/5

  Client-side navigation
  └── app/3d-models/[id]/page.tsx executes on SERVER:
        ├── params awaited → { id: "5" }
        ├── getModelById("5") called → finds model in JSON
        └── Model detail HTML rendered and sent to browser
```

---

# 15. How to Run

```bash
# 1. Navigate to the project directory
cd "17. Next.js/01. Build a Next.js App"

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open `http://localhost:3000` in your browser. The dev server watches for file changes and hot-reloads automatically.

```bash
# Production build (optional — compiles and optimises everything)
npm run build
npm start
```

---

# 16. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 17 — Next.js
* **Sub-module:** 01 — Build a Next.js App
* **Topics covered:** `create-next-app`, file-based routing, `page.tsx`, `layout.tsx`, nested routes, dynamic routes `[id]`, `params`, Server Components, Client Components, `"use client"`, `next/font/google`, `next/image`, `next/link`, TypeScript path aliases `@/`
* **Project:** PrintForge — a 3D model browsing platform with a models list, dynamic detail pages, and a persistent navigation bar
* **Builds toward:** `02. Rendering Strategies and More` — which adds categories, client component patterns, rendering strategy control (SSG/SSR/ISR), and search forms
