# VanLife — Advanced React.js: Routing

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![React Router](https://img.shields.io/badge/React%20Router-v6-CA4245?style=flat-square&logo=reactrouter)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-yellow?style=flat-square&logo=javascript)
![Mirage JS](https://img.shields.io/badge/Mirage%20JS-API%20Mock-orange?style=flat-square)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

A multi-page van rental platform with full client-side routing, nested routes, search params, and dynamic URL segments — the **VanLife** project from **Scrimba's Fullstack Web Development Path**.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every React Router v6 concept introduced in this module, comparing what is new here against the React State project (13/04) — specifically the introduction of `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, nested routes, `Outlet`, `useParams`, `useSearchParams`, `useLocation`, `useOutletContext`, relative links, index routes, and the 404 catch-all pattern.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is React Router v6?](#3-what-is-react-router-v6)
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [BrowserRouter, Routes & Route — The Foundation](#5-browserrouter-routes--route--the-foundation)
   - [Wrapping the App in BrowserRouter](#51-wrapping-the-app-in-browserrouter)
   - [Routes and Route — Declarative Matching](#52-routes-and-route--declarative-matching)
6. [Link vs NavLink — Navigation Components](#6-link-vs-navlink--navigation-components)
   - [Link — Basic Navigation](#61-link--basic-navigation)
   - [NavLink — Active-Aware Links](#62-navlink--active-aware-links)
7. [Route Params — Dynamic URL Segments](#7-route-params--dynamic-url-segments)
   - [Defining a Dynamic Route with `:id`](#71-defining-a-dynamic-route-with-id)
   - [`useParams` — Reading URL Params](#72-useparams--reading-url-params)
8. [Nested Routes & Outlet](#8-nested-routes--outlet)
   - [Layout Routes — Shared UI Across Pages](#81-layout-routes--shared-ui-across-pages)
   - [`<Outlet />` — Where Children Render](#82-outlet---where-children-render)
   - [Index Routes — The Default Child](#83-index-routes--the-default-child)
   - [Relative vs Absolute Paths in Nested Routes](#84-relative-vs-absolute-paths-in-nested-routes)
   - [The `end` Prop on NavLink](#85-the-end-prop-on-navlink)
9. [Search Params — URL Query Strings](#9-search-params--url-query-strings)
   - [`useSearchParams` — Reading Search Params](#91-usesearchparams--reading-search-params)
   - [Setting Params with a Setter Function](#92-setting-params-with-a-setter-function)
   - [Merging Search Params with Links](#93-merging-search-params-with-links)
10. [Link State — Passing Data Between Routes](#10-link-state--passing-data-between-routes)
    - [Sending State via `<Link>`](#101-sending-state-via-link)
    - [`useLocation` — Reading Link State](#102-uselocation--reading-link-state)
11. [Relative Links & the `relative` Prop](#11-relative-links--the-relative-prop)
12. [Outlet Context — Sharing Data with `useOutletContext`](#12-outlet-context--sharing-data-with-useoutletcontext)
13. [The 404 Page — Catch-All Route](#13-the-404-page--catch-all-route)
14. [Happy Path vs Sad Path — Loading & Error States](#14-happy-path-vs-sad-path--loading--error-states)
15. [Mirage JS — Mocking the API](#15-mirage-js--mocking-the-api)
16. [How the Full App Flow Works](#16-how-the-full-app-flow-works)
17. [React Component Tree Recap](#17-react-component-tree-recap)
18. [How to Run](#18-how-to-run)
19. [Course Reference](#19-course-reference)

---

# 1. Project Overview

**VanLife** is a fictional van rental marketplace. Renters can browse available vans, filter them by type, and view individual van details. Hosts can log in to view their dashboard, income summary, reviews, and manage their own listed vans — each of which has a detail page with sub-tabs for Info, Pricing, and Photos.

The app includes:

* A **global `<Layout />`** component wrapping every page with a shared `<Header />` (site logo + `NavLink` navigation) and `<Footer />`
* A **`/vans`** listing page with filter buttons (Simple, Luxury, Rugged) powered by search params
* A **`/vans/:id`** dynamic detail page that reads the van ID from the URL and fetches its data
* A **`/host`** section with its own nested layout (`<HostLayout />`) providing a secondary nav for Dashboard, Income, Vans, and Reviews
* A **`/host/vans/:id`** detail page with three sub-tabs (Details, Pricing, Photos) each rendered as deeply nested index/path routes via `<Outlet />`
* A **`<Link>` state** pattern that preserves the active type filter when navigating from the van list to a van detail, enabling a contextual "← Back to rugged vans" back button
* A **404 Not Found** catch-all route rendered for any unmatched URL
* A **Mirage JS** mock server (`server.js`) that intercepts all `fetch` calls to `/api/vans` and `/api/host/vans` and returns seeded data — no real backend needed

The goal of this module is not just to build a multi-page app — it is to master React Router v6: how `BrowserRouter` manages the browser history stack, how nested `<Route>` trees create layout inheritance, how `<Outlet />` renders child routes into a parent shell, how URL params and search params drive data fetching and UI filtering, and how `useLocation` / link state enables sophisticated page-to-page communication without a global state manager.

---

# 2. Project Structure

```
15. Advanced React.js/
│
└── 03. Routing/
    ├── index.html              → HTML shell: <div id="root">, Vite entry point
    ├── index.jsx               → App component — full route tree + ReactDOM.createRoot
    ├── index.css               → Global styles: layout, van tiles, host nav, forms
    ├── api.js                  → getVans() — fetch wrapper for /api/vans
    ├── server.js               → Mirage JS mock server — seeds van data, intercepts fetch
    │
    ├── components/
    │   ├── Header.jsx          → Site logo (<Link to="/">) + NavLink nav (Host, About, Vans)
    │   ├── Footer.jsx          → Footer bar rendered in Layout
    │   ├── Layout.jsx          → Root layout: <Header /> + <Outlet /> + <Footer />
    │   └── HostLayout.jsx      → Host section layout: host nav (NavLink) + <Outlet />
    │
    └── pages/
        ├── Home.jsx            → Landing page (index route of "/")
        ├── About.jsx           → About page + host CTA
        ├── NotFound.jsx        → 404 page (path="*" catch-all)
        │
        ├── Vans/
        │   ├── Vans.jsx        → Van listing + type filters via useSearchParams
        │   └── VanDetail.jsx   → Single van detail — useParams + useLocation for back button
        │
        └── Host/
            ├── Dashboard.jsx   → /host index page
            ├── Income.jsx      → /host/income page
            ├── Reviews.jsx     → /host/reviews page
            ├── HostVans.jsx    → /host/vans — list of host's own vans
            ├── HostVanDetail.jsx  → /host/vans/:id — detail + nested tab NavLinks + Outlet
            ├── HostVanInfo.jsx    → /host/vans/:id index tab — useOutletContext
            ├── HostVanPricing.jsx → /host/vans/:id/pricing tab
            └── HostVanPhotos.jsx  → /host/vans/:id/photos tab
```

---

# 3. What is React Router v6?

**React Router v6** is the standard client-side routing library for React. It allows a single-page application (SPA) to simulate multiple pages by intercepting browser navigation events and rendering different components based on the URL — without ever making a full page request to the server.

```
Traditional multi-page site:
  User clicks link → Browser sends GET /about → Server returns new HTML → Full reload

React SPA with React Router:
  User clicks <Link to="/about"> → Browser URL changes → React Router matches /about
                                → Renders <About /> component → Zero page reload
```

| Concept | What it means in React Router v6 |
|---------|----------------------------------|
| `BrowserRouter` | Uses the HTML5 History API to manage URLs — no `#` hash |
| `Routes` | Container that looks at the current URL and renders the first matching `<Route>` |
| `Route` | Maps a URL pattern (`path`) to a component (`element`) |
| `Link` | Renders an `<a>` tag that changes the URL via the History API (no reload) |
| `NavLink` | Like `Link` but knows if it's currently active — useful for nav menus |
| `Outlet` | Placeholder inside a parent route where its matched child renders |
| `useParams` | Hook to read dynamic `:param` segments from the current URL |
| `useSearchParams` | Hook to read and write `?key=value` query strings |
| `useLocation` | Hook to access the full `location` object including any state passed via `<Link>` |

> React Router v6 was a significant rewrite from v5. It introduced nested routes as first-class citizens, removed `<Switch>` in favour of `<Routes>`, made all paths relative by default, and added hooks like `useSearchParams` that weren't available before.

---

# 4. What's New vs Previous Projects

## New React Router Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `BrowserRouter` | `index.jsx` | Wraps the entire app to enable routing via the History API |
| `Routes` | `index.jsx` | Selects the first `<Route>` whose path matches the current URL |
| `Route path="/" element={<Layout />}` | `index.jsx` | Root layout route — every child inherits the shared Header/Footer |
| `Route index` | `index.jsx` (Home, Dashboard, HostVanInfo) | Default child route rendered when the parent path matches exactly |
| `Route path="vans/:id"` | `index.jsx` | Dynamic segment `:id` captured as a URL param |
| `Route path="*"` | `index.jsx` | Catch-all — matches any URL not matched above → renders NotFound |
| `<Link to="/">` | `Header.jsx` | Navigation without page reload |
| `<NavLink style={({isActive}) => ...}>` | `Header.jsx`, `HostLayout.jsx`, `HostVanDetail.jsx` | Applies active styles when the link's path matches current URL |
| `<NavLink to="." end>` | `HostLayout.jsx`, `HostVanDetail.jsx` | `end` prevents parent path from matching child routes |
| `<Outlet />` | `Layout.jsx`, `HostLayout.jsx`, `HostVanDetail.jsx` | Renders the matched child route into the parent layout |
| `<Outlet context={{ currentVan }}>` | `HostVanDetail.jsx` | Passes data to child routes without prop drilling |
| `useParams()` | `VanDetail.jsx`, `HostVanDetail.jsx` | Reads `:id` from the URL |
| `useSearchParams()` | `Vans.jsx` | Reads and updates `?type=rugged` query string |
| `setSearchParams(prev => ...)` | `Vans.jsx` | Functional setter to merge/update individual search params |
| `useLocation()` | `VanDetail.jsx` | Reads `location.state` passed via `<Link state={...}>` |
| `useOutletContext()` | `HostVanInfo.jsx`, `HostVanPricing.jsx`, `HostVanPhotos.jsx` | Reads context passed down from a parent `<Outlet context={...}>` |
| `<Link state={{ search, type }}>` | `Vans.jsx` | Passes data through navigation — preserved in `location.state` |
| `<Link to={`..${search}`} relative="path">` | `VanDetail.jsx` | Relative back link that preserves the search param filter |
| `relative="path"` | `VanDetail.jsx`, `HostVanDetail.jsx` | Makes `..` resolve relative to the URL path, not the route tree |

## Comparison: React State (13/04) vs Routing (15/03)

| Feature | React State — Chef Claude | Routing — VanLife |
|---------|--------------------------|-------------------|
| Number of pages | 1 | 9+ (multiple routes) |
| URL changes | Never | On every navigation |
| Data source | AI API + state | Mirage JS mock API via fetch |
| Navigation | None | `<Link>`, `<NavLink>` |
| Page-to-page data | N/A | `<Link state>` + `useLocation` |
| Shared layout | Single component tree | Layout routes with `<Outlet>` |
| Routing library | None | React Router v6 |

---

# 5. BrowserRouter, Routes & Route — The Foundation

## 5.1 Wrapping the App in BrowserRouter

```jsx
// index.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* all routes go here */}
      </Routes>
    </BrowserRouter>
  )
}
```

`BrowserRouter` must wrap the entire application exactly once. It connects React Router to the browser's native History API (`window.history.pushState`). Without `BrowserRouter`, no routing hook or component will work — they all read from the router context that `BrowserRouter` provides.

| Router type | URL format | When to use |
|-------------|-----------|-------------|
| `BrowserRouter` | `/about`, `/vans/3` | Standard SPAs served from a web server |
| `HashRouter` | `/#/about`, `/#/vans/3` | Static file hosts that can't redirect to `index.html` |
| `MemoryRouter` | No visible URL | Testing environments |

> Always use `BrowserRouter` for production apps. The server must be configured to serve `index.html` for all routes — otherwise a direct visit to `/vans/3` would return a 404 from the server before React Router even loads.

## 5.2 Routes and Route — Declarative Matching

```jsx
// index.jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="vans" element={<Vans />} />
    <Route path="vans/:id" element={<VanDetail />} />
    <Route path="host" element={<HostLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="income" element={<Income />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="vans" element={<HostVans />} />
      <Route path="vans/:id" element={<HostVanDetail />}>
        <Route index element={<HostVanInfo />} />
        <Route path="pricing" element={<HostVanPricing />} />
        <Route path="photos" element={<HostVanPhotos />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
```

`<Routes>` scans all its `<Route>` children and renders only the first one whose `path` matches the current URL. In v6, routes are **ranked by specificity** — more specific paths beat less specific ones, regardless of order.

| `path` value | Matches URL | Notes |
|-------------|-------------|-------|
| `"/"` | `/` and all sub-paths (as layout) | Only as a layout — children handle specific sub-paths |
| `"about"` (inside `/`) | `/about` | Relative path — automatically prefixed with parent's path |
| `"vans/:id"` | `/vans/1`, `/vans/42` | `:id` is a dynamic segment |
| `"*"` | Any URL not matched above | Must be last; 404 fallback |
| `index` (no `path`) | Exact parent path | Default child — see [Section 8.3](#83-index-routes--the-default-child) |

---

# 6. Link vs NavLink — Navigation Components

## 6.1 Link — Basic Navigation

```jsx
// Header.jsx
import { Link } from "react-router-dom"

<Link className="site-logo" to="/">#VanLife</Link>
```

`<Link>` renders as an `<a>` tag in the DOM but intercepts the click event. Instead of the browser sending a GET request and reloading the page, `<Link>` calls `history.pushState` to update the URL and signals React Router to re-render with the new route — all client-side, with zero network round-trip.

```
Without React Router:
  <a href="/about"> → browser GETs /about from server → full page reload

With React Router:
  <Link to="/about"> → pushState(/about) → <Routes> re-renders → <About /> mounts
```

> Use `<Link>` for any navigation that should update the URL. Never use a raw `<a href>` tag for internal navigation in a React Router app — it causes a full page reload and destroys all React state.

## 6.2 NavLink — Active-Aware Links

```jsx
// Header.jsx
import { NavLink } from "react-router-dom"

const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}

<NavLink
    to="/host"
    style={({isActive}) => isActive ? activeStyles : null}
>
    Host
</NavLink>
```

`<NavLink>` extends `<Link>` by automatically knowing whether its `to` path matches the current URL. The `style` (and `className`) props accept a **render function** that receives `{ isActive, isPending }` and returns styles/classes conditionally.

| Prop/feature | Description |
|-------------|-------------|
| `style={({ isActive }) => ...}` | Returns inline styles — `activeStyles` when active, `null` otherwise |
| `className={({ isActive }) => ...}` | Returns a CSS class string — e.g. `isActive ? "active" : ""` |
| `isActive` | `true` when the link's `to` path matches the current URL (prefix match by default) |
| `end` | Changes matching to be exact — see [Section 8.5](#85-the-end-prop-on-navlink) |

> Note the **destructuring** in the render function: `({isActive})` — `NavLink` calls this function with a props object, and you destructure `isActive` from it. Forgetting the curly braces (writing `isActive => ...`) would make `isActive` the entire object, always truthy.

---

# 7. Route Params — Dynamic URL Segments

## 7.1 Defining a Dynamic Route with `:id`

```jsx
// index.jsx
<Route path="vans/:id" element={<VanDetail />} />
<Route path="vans/:id" element={<HostVanDetail />} />   // inside "host" parent
```

A **route param** is a segment in the `path` prefixed with `:`. The colon tells React Router that this segment is dynamic — it will match any value in that position and capture it under the name `id`. The captured value is then available inside the component via `useParams`.

```
URL: /vans/3
path: vans/:id
       ↑    ↑
       ✅   id = "3"

URL: /vans/rugged-camper
path: vans/:id
              id = "rugged-camper"
```

The param name (`:id`) is arbitrary — you could name it `:vanId`, `:slug`, `:productId`. The name you choose must match what you pass to `useParams()`.

## 7.2 `useParams` — Reading URL Params

```jsx
// VanDetail.jsx
import { useParams } from "react-router-dom"

export default function VanDetail() {
    const params = useParams()   // { id: "3" }

    React.useEffect(() => {
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    }, [params.id])
    // ...
}
```

```jsx
// HostVanDetail.jsx
const { id } = useParams()   // destructure directly

React.useEffect(() => {
    fetch(`/api/host/vans/${id}`)
        .then(res => res.json())
        .then(data => setCurrentVan(data.vans))
}, [])
```

`useParams()` returns a plain object where each key is a param name from the route definition. Values are always **strings** — even if the param looks like a number (`"3"` not `3`). The `useEffect` dependency array should include `params.id` whenever the component might be reused across different IDs without unmounting.

| Hook return | Type | Example |
|-------------|------|---------|
| `params.id` | `string` | `"3"` |
| `params.vanId` | `string` | `"rugged-camper"` |

> URL param values are always strings. If you need a number (e.g. for arithmetic), convert with `Number(params.id)` or `parseInt(params.id, 10)`.

---

# 8. Nested Routes & Outlet

Nested routing is the most powerful concept in React Router v6. It allows a parent route to render its own persistent UI (like a nav bar or sidebar) while rendering child routes in a designated slot — all without the parent unmounting.

## 8.1 Layout Routes — Shared UI Across Pages

```jsx
// index.jsx — Layout route wraps all public pages
<Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="vans" element={<Vans />} />
    {/* ... */}
</Route>
```

```jsx
// components/Layout.jsx
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout() {
    return (
        <div className="site-wrapper">
            <Header />
            <main>
                <Outlet />   {/* ← child route renders here */}
            </main>
            <Footer />
        </div>
    )
}
```

`<Layout />` is a **layout route** — its `element` is not a page itself, but a shell that wraps other pages. When the URL is `/vans`, React Router renders `<Layout />` and then renders `<Vans />` inside `Layout`'s `<Outlet />`. The `<Header />` and `<Footer />` persist across every route without re-mounting.

```
URL: /vans

Renders:
  <Layout>               ← always mounted (path="/")
    <Header />           ← never unmounts on navigation
    <main>
      <Outlet />         ← renders the matched child
        <Vans />         ← mounted because path="vans" matches
    </main>
    <Footer />
  </Layout>
```

## 8.2 `<Outlet />` — Where Children Render

```jsx
// components/HostLayout.jsx
import { NavLink, Outlet } from "react-router-dom"

export default function HostLayout() {
    return (
        <>
            <nav className="host-nav">
                <NavLink to="." end ...>Dashboard</NavLink>
                <NavLink to="income" ...>Income</NavLink>
                <NavLink to="vans" ...>Vans</NavLink>
                <NavLink to="reviews" ...>Reviews</NavLink>
            </nav>
            <Outlet />   {/* ← /host/income renders <Income /> here */}
        </>
    )
}
```

`<Outlet />` is a marker — a placeholder that React Router fills with the matched child route's element. Without `<Outlet />` in the parent, child routes can never render. The VanLife app uses **three levels** of `<Outlet />`:

```
Level 1: <Layout />         → <Outlet /> renders public pages (Home, About, Vans, etc.)
Level 2: <HostLayout />     → <Outlet /> renders host pages (Dashboard, Income, etc.)
Level 3: <HostVanDetail />  → <Outlet /> renders van sub-tabs (Info, Pricing, Photos)
```

## 8.3 Index Routes — The Default Child

```jsx
// index.jsx
<Route path="/" element={<Layout />}>
    <Route index element={<Home />} />      {/* renders at "/" */}
    ...
</Route>

<Route path="host" element={<HostLayout />}>
    <Route index element={<Dashboard />} /> {/* renders at "/host" */}
    ...
</Route>

<Route path="vans/:id" element={<HostVanDetail />}>
    <Route index element={<HostVanInfo />} /> {/* renders at "/host/vans/3" */}
    <Route path="pricing" element={<HostVanPricing />} />
    <Route path="photos" element={<HostVanPhotos />} />
</Route>
```

An **index route** (`<Route index />`) is the default child — it renders in the parent's `<Outlet />` when the URL exactly matches the parent's path with nothing more after it. It has no `path` of its own.

| URL | What renders in HostVanDetail's Outlet |
|-----|----------------------------------------|
| `/host/vans/3` | `<HostVanInfo />` (index route) |
| `/host/vans/3/pricing` | `<HostVanPricing />` |
| `/host/vans/3/photos` | `<HostVanPhotos />` |

> Use index routes instead of `path=""` or duplicating the parent's path. An index route is semantically clear: "this is the default content when nothing more specific is requested."

## 8.4 Relative vs Absolute Paths in Nested Routes

```jsx
// ✅ Relative paths (used in VanLife) — no leading slash
<Route path="host" element={<HostLayout />}>
    <Route path="income" element={<Income />} />   // resolves to /host/income
    <Route path="vans" element={<HostVans />} />    // resolves to /host/vans
</Route>

// ❌ Absolute paths — must include full path from root
<Route path="/host/income" element={<Income />} />  // would work but breaks nesting
```

In React Router v6, all nested route `path` values are **relative** to the parent by default. A child `path="income"` inside a parent `path="host"` resolves to `/host/income`. This is a significant change from v5 where all paths were absolute.

## 8.5 The `end` Prop on NavLink

```jsx
// HostLayout.jsx
<NavLink to="." end style={({ isActive }) => isActive ? activeStyles : null}>
    Dashboard
</NavLink>

// HostVanDetail.jsx
<NavLink to="." end style={({ isActive }) => isActive ? activeStyles : null}>
    Details
</NavLink>
```

Without `end`, `<NavLink to=".">` (or any parent-level link) would appear active on **all** child routes — because `/host` is a prefix of `/host/income`, `/host/vans`, etc. The `end` prop changes the matching to be **exact**: it only becomes active when the current URL is exactly the `to` path, not when it's a sub-path.

```
URL: /host/income
  Without end: <NavLink to=".">Dashboard</NavLink> → isActive = true  ❌ wrong
  With end:    <NavLink to="." end>Dashboard</NavLink> → isActive = false ✅ correct

URL: /host
  With end: <NavLink to="." end>Dashboard</NavLink> → isActive = true  ✅ correct
```

---

# 9. Search Params — URL Query Strings

**Search params** (also called query strings) are the `?key=value` pairs after a URL's path — for example `/vans?type=rugged`. Unlike route params, they are optional and don't need to be declared in the `<Route path>`. They're ideal for filtering, sorting, and pagination because they're bookmarkable and shareable.

## 9.1 `useSearchParams` — Reading Search Params

```jsx
// Vans.jsx
import { useSearchParams } from "react-router-dom"

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get("type")   // "rugged" | "simple" | "luxury" | null

    const displayedVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans
    // ...
}
```

`useSearchParams()` mirrors `useState` in structure — it returns a tuple `[searchParams, setSearchParams]`. `searchParams` is a `URLSearchParams` object (the browser's native API). `.get("type")` returns the string value of `?type=rugged`, or `null` if the param is absent.

| `URLSearchParams` method | What it does |
|--------------------------|-------------|
| `.get("type")` | Returns the value of `?type=...` or `null` |
| `.toString()` | Serialises all params back to a query string: `"type=rugged"` |
| `.set("type", "luxury")` | Sets a param (used internally by the setter) |
| `.delete("type")` | Removes a param (used internally by the setter) |

> Search params are always strings — just like route params. `searchParams.get("page")` returns `"1"`, not `1`.

## 9.2 Setting Params with a Setter Function

```jsx
// Vans.jsx
function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
        if (value === null) {
            prevParams.delete(key)
        } else {
            prevParams.set(key, value)
        }
        return prevParams
    })
}

// Usage:
<button onClick={() => handleFilterChange("type", "rugged")}>Rugged</button>
<button onClick={() => handleFilterChange("type", null)}>Clear filter</button>
```

The **functional setter form** `setSearchParams(prev => ...)` receives the current `URLSearchParams` object, lets you mutate it in place, and returns it. This is the correct pattern for **merging** a new param into existing params — rather than replacing all params at once.

```
Before: /vans?sort=price
handleFilterChange("type", "rugged")
After:  /vans?sort=price&type=rugged   ← type added, sort preserved ✅

vs.

setSearchParams({ type: "rugged" })   ← replaces everything
After:  /vans?type=rugged             ← sort param lost ❌
```

> Always use the functional setter form when you want to add or change a single param without losing other existing params.

## 9.3 Merging Search Params with Links

```jsx
// Vans.jsx — passes current search string as state to preserve it
<Link
    to={van.id}
    state={{
        search: `?${searchParams.toString()}`,   // e.g. "?type=rugged"
        type: typeFilter                          // e.g. "rugged"
    }}
>
```

When navigating from the van list to a van detail, the active filter is saved in `<Link state>` so the detail page can reconstruct the "Back to rugged vans" link. See [Section 10](#10-link-state--passing-data-between-routes) for how the detail page reads this state.

---

# 10. Link State — Passing Data Between Routes

## 10.1 Sending State via `<Link>`

```jsx
// Vans.jsx
<Link
    to={van.id}
    state={{
        search: `?${searchParams.toString()}`,
        type: typeFilter
    }}
>
    {/* van card content */}
</Link>
```

The `state` prop on `<Link>` attaches arbitrary data to the navigation event. This data is stored in the browser's `history.state` — it's not visible in the URL, it doesn't cause a re-render on the previous page, and it is available on the destination page via `useLocation()`.

```
User is on /vans?type=rugged
Clicks van card →
  Link navigates to /vans/4
  state = { search: "?type=rugged", type: "rugged" }
```

> Link state is **session-only** — it disappears if the user refreshes the page or navigates directly to the URL. Always provide a sensible fallback (`||` default values) when reading state.

## 10.2 `useLocation` — Reading Link State

```jsx
// VanDetail.jsx
import { Link, useParams, useLocation } from "react-router-dom"

export default function VanDetail() {
    const params = useParams()
    const location = useLocation()

    const search = location.state?.search || ""      // "?type=rugged" or ""
    const type = location.state?.type || "all"       // "rugged" or "all"

    return (
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >
                &larr; <span>Back to {type} vans</span>
            </Link>
            {/* van detail content */}
        </div>
    )
}
```

`useLocation()` returns the current `location` object. `location.state` is whatever was passed in `<Link state={...}>`. Optional chaining (`?.`) safely handles the case where the user navigated directly to `/vans/3` without going through the list — `location.state` would be `null`, and `null?.search` returns `undefined`, which falls back to `""`.

| `location` property | Example value | Purpose |
|--------------------|--------------|---------|
| `location.pathname` | `"/vans/3"` | Current URL path |
| `location.search` | `""` (empty on detail page) | Current URL query string |
| `location.state` | `{ search: "?type=rugged", type: "rugged" }` | Data passed via `<Link state>` |
| `location.key` | `"abc123"` | Unique key for this history entry |

---

# 11. Relative Links & the `relative` Prop

```jsx
// VanDetail.jsx
<Link
    to={`..${search}`}
    relative="path"
>
    &larr; Back to {type} vans
</Link>

// HostVanDetail.jsx
<Link
    to=".."
    relative="path"
>
    &larr; Back to all vans
</Link>
```

`..` in a `to` prop means "go up one level." By default in React Router v6, `..` resolves relative to the **route hierarchy** — but `relative="path"` changes it to resolve relative to the **URL path segments**.

```
Route tree for VanDetail:
  / (Layout)
    └── vans (Vans)
          └── :id (VanDetail)   ← current route

With relative="route" (default):
  ".." goes up to "vans" → /vans  ✅ correct

With relative="path":
  Current URL: /vans/3
  ".." goes up one path segment → /vans  ✅ also correct here

For HostVanDetail (route: /host/vans/:id):
  ".." with relative="path" → /host/vans ✅ (back to host van list)
  ".." with relative="route" → /host     ❌ (skips to host dashboard)
```

The `search` appended to `..` reconstructs the filter: if `search = "?type=rugged"`, the link goes to `../vans?type=rugged` → the vans list with the rugged filter already applied.

> Use `relative="path"` when the route tree nesting and the URL structure don't align — particularly in deeply nested routes where the `..` shorthand should follow the URL segments, not the route component hierarchy.

---

# 12. Outlet Context — Sharing Data with `useOutletContext`

```jsx
// HostVanDetail.jsx — parent passes data through Outlet
<Outlet context={{ currentVan }} />
```

```jsx
// HostVanInfo.jsx — child reads it without props
import { useOutletContext } from "react-router-dom"

export default function HostVanInfo() {
    const { currentVan } = useOutletContext()

    return (
        <section className="host-van-detail-info">
            <h4>Name: <span>{currentVan.name}</span></h4>
            <h4>Category: <span>{currentVan.type}</span></h4>
            <h4>Description: <span>{currentVan.description}</span></h4>
            <h4>Visibility: <span>Public</span></h4>
        </section>
    )
}
```

`<Outlet context={...}>` is React Router's built-in way to pass data from a parent route component to its child routes — without lifting state, using a Context Provider manually, or drilling props (which is impossible across route boundaries anyway, since child routes are not explicit JSX children of the parent component).

```
HostVanDetail fetches van data → passes it via <Outlet context={{ currentVan }}>
    ├── HostVanInfo    → useOutletContext() → { currentVan } ✅
    ├── HostVanPricing → useOutletContext() → { currentVan } ✅
    └── HostVanPhotos  → useOutletContext() → { currentVan } ✅
```

| Pattern | Use when |
|---------|---------|
| Props | Parent renders child directly as JSX (`<ChildComponent data={...} />`) |
| Outlet context | Parent and child are connected through `<Outlet>` — route children |
| Zustand/Context | Data needed across unrelated parts of the component tree |

> `useOutletContext` is the correct pattern for sharing data between nested route components. Because `<HostVanInfo />` is never written as `<HostVanInfo data={...} />` in any JSX — it is rendered by React Router into `<Outlet />` — there is no way to pass props directly. Outlet context is the designed solution.

---

# 13. The 404 Page — Catch-All Route

```jsx
// index.jsx
<Route path="/" element={<Layout />}>
    {/* all other routes */}
    <Route path="*" element={<NotFound />} />
</Route>
```

```jsx
// pages/NotFound.jsx
export default function NotFound() {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Sorry, the page you were looking for was not found.</h1>
        </div>
    )
}
```

The `path="*"` wildcard matches any URL that no other sibling route matched. Placing it inside the root layout route means the `<NotFound />` page still renders inside `<Layout />` — preserving the `<Header />` and `<Footer />` so the user can navigate back.

```
URL: /some/random/path
  / matches Layout ✅
  Inside Layout:
    index (/) → no
    about     → no
    vans      → no
    host      → no
    *         → YES → <NotFound /> renders in Layout's Outlet
```

> Always place `path="*"` as the last `<Route>` inside `<Routes>`. React Router v6 ranks routes by specificity, but placing it last is conventional and clarifies intent. The `*` only fires when nothing else matched.

---

# 14. Happy Path vs Sad Path — Loading & Error States

Every data-fetching component must handle three states — not just the "happy path" (data arrived):

```jsx
// VanDetail.jsx — only null check (loading state)
{van ? (
    <div className="van-detail">
        <img src={van.imageUrl} />
        {/* ... */}
    </div>
) : <h2>Loading...</h2>}
```

```jsx
// Vans.jsx — dedicated loading state variable
const [loading, setLoading] = React.useState(false)

React.useEffect(() => {
    async function loadVans() {
        setLoading(true)
        const data = await getVans()
        setVans(data)
        setLoading(false)
    }
    loadVans()
}, [])

if (loading) {
    return <h1>Loading...</h1>
}
```

```jsx
// api.js — error thrown for failed fetch
export async function getVans() {
    const res = await fetch("/api/vans")
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json()
    return data.vans
}
```

| State | Condition | UI Shown |
|-------|-----------|---------|
| **Loading** ("Happy Path — waiting") | `loading === true` | Spinner or "Loading..." text |
| **Success** ("Happy Path — done") | Data is available | The actual page content |
| **Error** ("Sad Path") | Fetch threw / `!res.ok` | Error message with guidance |

> Every component that fetches data must handle all three states. Skipping the loading state causes a flash of empty content. Skipping the error state causes a silent broken UI with no feedback to the user.

---

# 15. Mirage JS — Mocking the API

```javascript
// server.js (imported in index.jsx as: import "./server")
import { createServer, Model } from "miragejs"

export function makeServer() {
    createServer({
        models: { van: Model },

        routes() {
            this.namespace = "api"

            this.get("/vans", (schema) => {
                return schema.vans.all()
            })

            this.get("/vans/:id", (schema, request) => {
                const id = request.params.id
                return schema.vans.find(id)
            })

            this.get("/host/vans", (schema) => {
                return schema.vans.where({ hostId: "123" })
            })

            this.get("/host/vans/:id", (schema, request) => {
                return schema.vans.find(request.params.id)
            })
        },

        seeds(server) {
            // seeded van data...
        }
    })
}
```

**Mirage JS** is an in-browser API mocking library. It intercepts all `fetch` calls that match its configured routes and returns fake data — without any real server running. This lets the frontend be built and tested entirely in isolation.

| Feature | Description |
|---------|-------------|
| `createServer()` | Spins up the mock server — runs in the browser, not Node.js |
| `this.namespace = "api"` | All routes automatically prefixed with `/api` |
| `Model` | Defines a Mirage data model (like a table schema) |
| `schema.vans.all()` | Returns all seeded van records |
| `schema.vans.find(id)` | Returns a single van by ID |
| `schema.vans.where({ hostId })` | Filters vans by a field value |
| `seeds(server)` | Populates the in-memory database with test data on startup |

> Because `import "./server"` is in `index.jsx`, Mirage starts before any `fetch` call is made. Mirage patches `window.fetch` globally — every API call from the app hits Mirage, not the network. No backend is needed to run this project.

---

# 16. How the Full App Flow Works

```
┌─────────────────── APP STARTUP ──────────────────────────────────┐
│                                                                   │
│  index.jsx imports "./server" → Mirage patches window.fetch      │
│  ReactDOM.createRoot → renders <App> → <BrowserRouter> wraps     │
│  <Routes> reads window.location.pathname                         │
│  URL: "/" → matches Layout → matches index → renders <Home />     │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘

┌─────────────────── USER CLICKS "Vans" NAV LINK ──────────────────┐
│                                                                   │
│  <NavLink to="/vans"> clicked                                     │
│  → history.pushState("/vans")                                     │
│  → <Routes> re-evaluates: path="vans" matches                    │
│  → <Layout> stays mounted (Header/Footer persist)                 │
│  → <Outlet> now renders <Vans />                                  │
│  → <Vans /> useEffect fires: fetch("/api/vans")                   │
│  → Mirage intercepts → returns seeded van array                   │
│  → setVans(data) → setLoading(false) → van cards render          │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘

┌─────────────────── USER CLICKS "Rugged" FILTER ──────────────────┐
│                                                                   │
│  handleFilterChange("type", "rugged") called                      │
│  setSearchParams(prev => { prev.set("type", "rugged"); return prev })
│  → URL becomes /vans?type=rugged (no page reload)                 │
│  → searchParams.get("type") === "rugged"                          │
│  → displayedVans = vans.filter(v => v.type === "rugged")         │
│  → Only rugged vans rendered                                      │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘

┌─────────────────── USER CLICKS A VAN CARD ───────────────────────┐
│                                                                   │
│  <Link to={van.id} state={{ search: "?type=rugged", type: "rugged" }}>
│  → history.pushState("/vans/3", state)                            │
│  → <Routes>: path="vans/:id" matches → <VanDetail /> renders     │
│  → useParams() → { id: "3" }                                      │
│  → fetch("/api/vans/3") → Mirage returns single van              │
│  → setVan(data) → van detail renders                              │
│  → useLocation().state = { search: "?type=rugged", type: "rugged" }
│  → Back button: <Link to="../?type=rugged" relative="path">       │
│       renders as "← Back to rugged vans"                          │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘

┌─────────────────── USER VISITS /host/vans/3 ─────────────────────┐
│                                                                   │
│  <Routes> matches:                                                │
│    path="/"        → <Layout /> (mounts)                          │
│    path="host"     → <HostLayout /> (mounts) → host nav renders   │
│    path="vans/:id" → <HostVanDetail /> (mounts)                   │
│      index         → <HostVanInfo /> renders in HostVanDetail's Outlet
│                                                                   │
│  HostVanDetail:                                                   │
│    useParams() → { id: "3" }                                      │
│    fetch("/api/host/vans/3") → setCurrentVan(data)               │
│    <Outlet context={{ currentVan }}> → <HostVanInfo /> reads it  │
│    useOutletContext() → { currentVan } → renders name/type/desc  │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

---

# 17. React Component Tree Recap

```
index.html
├── <head>
│   └── <link> → Vite-injected CSS / Google Fonts
│
└── <body>
    ├── <div id="root">
    │   │
    │   │  After ReactDOM.createRoot().render(<App />) :
    │   │
    │   └── <BrowserRouter>
    │       └── <Routes>
    │           │
    │           └── path="/"  →  <Layout>                   ← always mounted
    │               ├── <Header>
    │               │   ├── <Link to="/">#VanLife</Link>    ← site logo
    │               │   └── <nav>
    │               │       ├── <NavLink to="/host">Host</NavLink>
    │               │       ├── <NavLink to="/about">About</NavLink>
    │               │       └── <NavLink to="/vans">Vans</NavLink>
    │               │
    │               ├── <main>
    │               │   └── <Outlet />                      ← child route renders here
    │               │       │
    │               │       ├── index → <Home />            (URL: /)
    │               │       ├── "about" → <About />         (URL: /about)
    │               │       ├── "vans" → <Vans />           (URL: /vans)
    │               │       │     useSearchParams → ?type=rugged filter
    │               │       │     van tiles → <Link state={...}>
    │               │       │
    │               │       ├── "vans/:id" → <VanDetail />  (URL: /vans/3)
    │               │       │     useParams → { id: "3" }
    │               │       │     useLocation → location.state.search
    │               │       │     fetch /api/vans/3 via Mirage
    │               │       │
    │               │       ├── "host" → <HostLayout>        (URL: /host/*)
    │               │       │   ├── <nav class="host-nav">
    │               │       │   │   ├── <NavLink to="." end>Dashboard</NavLink>
    │               │       │   │   ├── <NavLink to="income">Income</NavLink>
    │               │       │   │   ├── <NavLink to="vans">Vans</NavLink>
    │               │       │   │   └── <NavLink to="reviews">Reviews</NavLink>
    │               │       │   │
    │               │       │   └── <Outlet />              ← host child renders here
    │               │       │       ├── index → <Dashboard />   (URL: /host)
    │               │       │       ├── "income" → <Income />   (URL: /host/income)
    │               │       │       ├── "reviews" → <Reviews /> (URL: /host/reviews)
    │               │       │       ├── "vans" → <HostVans />   (URL: /host/vans)
    │               │       │       │
    │               │       │       └── "vans/:id" → <HostVanDetail>  (URL: /host/vans/3)
    │               │       │           ├── <Link to=".." relative="path">← Back</Link>
    │               │       │           ├── van image + name + price
    │               │       │           ├── <nav class="host-van-detail-nav">
    │               │       │           │   ├── <NavLink to="." end>Details</NavLink>
    │               │       │           │   ├── <NavLink to="pricing">Pricing</NavLink>
    │               │       │           │   └── <NavLink to="photos">Photos</NavLink>
    │               │       │           │
    │               │       │           └── <Outlet context={{ currentVan }}>
    │               │       │               ├── index → <HostVanInfo />     (URL: /host/vans/3)
    │               │       │               │     useOutletContext → currentVan
    │               │       │               ├── "pricing" → <HostVanPricing /> (URL: /host/vans/3/pricing)
    │               │       │               └── "photos"  → <HostVanPhotos />  (URL: /host/vans/3/photos)
    │               │       │
    │               │       └── "*" → <NotFound />          (any unmatched URL)
    │               │
    │               └── <Footer />
    │
    └── <script type="module" src="/index.jsx">   ← Vite entry point
```

---

# 18. How to Run

This project uses Vite and has no real backend — Mirage JS mocks all API calls in the browser.

```bash
# Install dependencies (react, react-dom, vite, react-router-dom, miragejs)
npm install

# Start the Vite development server
npm run dev
```

Vite starts at `http://localhost:5173`. Mirage JS boots automatically when the app loads (imported at the top of `index.jsx`).

**To test the full routing experience:**

1. Visit `/` — the home page renders inside the global layout
2. Click **Vans** in the nav — the van listing loads from the Mirage mock
3. Click **Rugged** filter — URL updates to `/vans?type=rugged` without reload
4. Click a van card — navigates to `/vans/3` with filter state preserved
5. Click the back button — returns to `/vans?type=rugged` (filter intact)
6. Click **Host** in the nav — host layout with sub-nav appears
7. Click **Vans** in the host sub-nav → then a van → then the **Pricing** tab — three levels of nested routes in action

> This project does not need an `.env` file. There are no API keys — all data is seeded inside `server.js` and served by Mirage entirely in-memory.

---

# 19. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 15. Advanced React.js
* **Project:** 03. Routing — VanLife
