# Persistence — Advanced React.js

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%7C%20Realtime-3ECF8E?style=flat-square&logo=supabase)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Aggregate%20Functions-336791?style=flat-square&logo=postgresql)
![Hooks](https://img.shields.io/badge/Hooks-useEffect%20%7C%20useState-61DAFB?style=flat-square&logo=react)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **Persistence** module of **Advanced React.js** from **Scrimba's Fullstack Web Development Path** — a focused, project-driven exploration of how to connect a React front-end to a real PostgreSQL database using Supabase, enabling data to outlive the browser session.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every persistence concept introduced in this module, comparing what is new here against the client-side state management and API patterns covered in earlier folders such as `13. React.js Fundamentals` and `07. APIs and Async JavaScript`.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is "Persistence"?](#3-what-is-persistence)
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [Supabase — The Backend-as-a-Service](#5-supabase--the-backend-as-a-service)
   - [What Supabase Gives You](#51-what-supabase-gives-you)
   - [Supabase Project Setup](#52-supabase-project-setup)
   - [Initialising the Supabase Client](#53-initialising-the-supabase-client)
6. [Querying the Database with supabase-js](#6-querying-the-database-with-supabase-js)
   - [Basic SELECT Query](#61-basic-select-query)
   - [Filtering Rows — `.eq()`, `.gt()`, `.lt()`](#62-filtering-rows--eq-gt-lt)
   - [Storing Query Results in State](#63-storing-query-results-in-state)
7. [Aggregate Functions — Query with Aggregate Function](#7-aggregate-functions--query-with-aggregate-function)
   - [Why Aggregates Belong in the Database](#71-why-aggregates-belong-in-the-database)
   - [Using Aggregate Functions in supabase-js](#72-using-aggregate-functions-in-supabase-js)
   - [Formatting Data for Charts](#73-formatting-data-for-charts)
8. [Realtime Subscriptions](#8-realtime-subscriptions)
   - [What "Realtime" Means in Supabase](#81-what-realtime-means-in-supabase)
   - [Setting Up a Realtime Channel](#82-setting-up-a-realtime-channel)
   - [Cleaning Up the Subscription](#83-cleaning-up-the-subscription)
9. [Inserting Data — Forms and Mutations](#9-inserting-data--forms-and-mutations)
   - [The New Deal Form](#91-the-new-deal-form)
   - [`.insert()` — Writing a Row](#92-insert--writing-a-row)
   - [Optimistic vs. Realtime Updates](#93-optimistic-vs-realtime-updates)
10. [The Full App Flow — How All Layers Connect](#10-the-full-app-flow--how-all-layers-connect)
11. [How to Run](#11-how-to-run)
12. [Course Reference](#12-course-reference)

---

# 1. Project Overview

The Persistence module is built around a **Sales Dashboard** application — a real-time deal-tracking interface where a sales team can log new deals, view pipeline metrics, and see the dashboard update live as team members add entries. The app includes:

* A **metrics bar** with aggregate KPIs (total deal value, average deal size, win rate) computed directly in the database
* A **deals table** that reads rows from a PostgreSQL database via Supabase
* A **chart panel** displaying data formatted from a database aggregate query
* A **new deal form** that inserts a row into the database and triggers a live UI update through a realtime subscription
* A **Supabase client module** that initialises the connection once and shares it across the app

The goal of this module is not just to build a page — it is to understand that **client-side state is ephemeral**: it disappears on refresh. Real applications require a database, and this module teaches you the complete path from React component → Supabase query → PostgreSQL → back to state.

---

# 2. Project Structure

```
15. Advanced React.js/
│
└── 05. Persistense/
    ├── src/
    │   ├── main.jsx              → React entry point, renders <App />
    │   ├── App.jsx               → Root component, owns top-level state and data fetching
    │   ├── supabaseClient.js     → Initialises and exports the Supabase client singleton
    │   ├── components/
    │   │   ├── Header.jsx        → App header / navigation bar
    │   │   ├── MetricsBar.jsx    → Displays aggregate KPI cards (total value, avg size)
    │   │   ├── DealsTable.jsx    → Renders rows from the Supabase deals table
    │   │   ├── DealChart.jsx     → Chart built from aggregate query data
    │   │   └── NewDealForm.jsx   → Controlled form that calls supabase.insert()
    │   └── index.css             → Global styles
    ├── .env.local                → VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY (git-ignored)
    ├── index.html                → HTML shell, mounts #root div
    ├── vite.config.js            → Vite configuration
    └── package.json              → Dependencies including @supabase/supabase-js
```

---

# 3. What is "Persistence"?

**Persistence** means that data survives beyond a single browser session. Without persistence, every `useState` value resets to its initial value the moment the user refreshes the page.

| Storage type | Where data lives | Survives refresh? | Shared between users? | Capacity |
|---|---|---|---|---|
| `useState` / `useReducer` | JavaScript memory (RAM) | ❌ No | ❌ No | Unlimited (until tab crashes) |
| `localStorage` / `sessionStorage` | Browser storage | ✅ / ❌ | ❌ No | ~5–10 MB |
| Cookie | Browser + sent on every request | ✅ Yes | ❌ No | 4 KB |
| **Database (Supabase)** | **Remote PostgreSQL server** | **✅ Yes** | **✅ Yes** | **Unlimited** |

> **The defining feature of a database is shared, durable storage.** When one user inserts a row, every other user who queries that table sees it — immediately if you use Supabase's Realtime feature.

This module replaces the `fetch()` → public REST API pattern from `07. APIs and Async JavaScript` with a direct, authenticated connection to **your own PostgreSQL database** via Supabase's JavaScript SDK.

---

# 4. What's New vs Previous Projects

## New Supabase / Database Concepts

| Concept | Where Used | Purpose |
|---|---|---|
| `@supabase/supabase-js` | `supabaseClient.js` | Official JS client for talking to a Supabase project |
| `createClient(url, key)` | `supabaseClient.js` | Initialises the connection — call once, import everywhere |
| `.from('table').select('*')` | `App.jsx` | Reads all rows from a named database table |
| `.eq('column', value)` | Query filters | Server-side WHERE clause — filters rows before they travel over the network |
| `.select('column.sum()')` | `MetricsBar.jsx` | Runs a SQL aggregate function inside a supabase-js query |
| `.insert([{...}])` | `NewDealForm.jsx` | Writes a new row into the database |
| `.channel()` / `.on()` / `.subscribe()` | `App.jsx` | Opens a WebSocket to receive live database change events |
| `supabase.removeChannel(channel)` | `useEffect` cleanup | Closes the WebSocket connection when the component unmounts |
| `VITE_SUPABASE_URL` | `.env.local` | Project URL — public, identifies which Supabase project to connect to |
| `VITE_SUPABASE_ANON_KEY` | `.env.local` | Public anonymous key — safe to expose; Row Level Security enforces access |

## New React Patterns

| Concept | Where Used | Purpose |
|---|---|---|
| `useEffect` with async data fetching | `App.jsx` | Fetches initial data from Supabase on component mount |
| Functional state update in subscription callback | `App.jsx` | `setDeals(prev => [...prev, newDeal])` — avoids stale closure trap |
| `useEffect` cleanup return | `App.jsx` | Returns a function that unsubscribes from realtime channel on unmount |

## Concepts Carried Over From Previous Modules

| Concept | Originally Introduced In | How It Deepens Here |
|---|---|---|
| `useEffect` | `13. React.js Fundamentals — Side Effects` | Now used for async database calls, not just `fetch()` to public APIs |
| Controlled form with `useState` | `13. React.js Fundamentals` | Form submit now triggers a database insert instead of updating local state |
| Async/await + error handling | `07. APIs and Async JS` | Applied to supabase-js SDK calls instead of raw `fetch()` |
| State stored in `useState` | Every previous React module | Database response data is stored in state exactly as before |

---

# 5. Supabase — The Backend-as-a-Service

## 5.1 What Supabase Gives You

**Supabase** is an open-source Firebase alternative. It wraps a real PostgreSQL database in a suite of developer tools so you can build a backend without writing server-side code.

```
┌──────────────────────────────────────────────────────────────┐
│                        Supabase                               │
├──────────────────────────────────────────────────────────────┤
│  PostgreSQL Database   → your tables, rows, SQL queries      │
│  REST API (auto)       → every table gets a REST endpoint    │
│  supabase-js SDK       → typed JS client for the REST API    │
│  Realtime              → WebSocket that streams DB changes   │
│  Authentication        → email/OAuth sign-in (used in #06)  │
│  Storage               → file/image uploads                  │
│  Dashboard             → visual table editor, SQL runner     │
└──────────────────────────────────────────────────────────────┘
```

| What you would normally need | What Supabase replaces it with |
|---|---|
| A Node.js / Express server | Supabase's auto-generated REST API |
| A PostgreSQL installation | Managed cloud PostgreSQL |
| A separate auth service | Supabase Auth (built-in) |
| A WebSocket server for live updates | Supabase Realtime |

> This does **not** mean Supabase is production-ready for every use case without a custom backend. Complex business logic, heavy server-side computation, and sensitive operations still belong in a dedicated server. Supabase excels at data storage and retrieval for standard CRUD apps.

## 5.2 Supabase Project Setup

Before writing any code, you create a project in the Supabase Dashboard:

```
1. Go to https://supabase.com → Sign Up → New Project
2. Choose organisation, project name, database password, region
3. Wait ~2 minutes for the project to provision
4. Go to Table Editor → Create a table (e.g. "deals")
   └── Add columns: id (uuid, primary key), title (text),
       value (numeric), status (text), created_at (timestamptz)
5. Go to Settings → API → copy:
   └── Project URL  →  VITE_SUPABASE_URL
   └── anon public key  →  VITE_SUPABASE_ANON_KEY
6. Paste both into your project's .env.local file
```

The **anon key** is safe to include in frontend JavaScript. It is a JWT that identifies your project but grants only the permissions your Row Level Security policies allow. Without an RLS policy, the anon key can read nothing.

## 5.3 Initialising the Supabase Client

```js
// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

**This file is the entire "connection" to your database.** It exports a single `supabase` object that every other file imports. `createClient` is called once — not inside a component, not inside a `useEffect`. Calling it inside a component would create a new connection on every render.

```js
// ❌ Bad — creates a new Supabase client on every render
function MyComponent() {
    const supabase = createClient(url, key)   // called on every render
    // ...
}

// ✅ Good — client created once at module level, imported everywhere
import { supabase } from './supabaseClient'

function MyComponent() {
    // supabase is already initialised — just use it
}
```

> Always read credentials from `import.meta.env` in Vite (not `process.env`). Vite only exposes variables prefixed with `VITE_` to the browser bundle — any variable without that prefix stays server-side.

---

# 6. Querying the Database with supabase-js

## 6.1 Basic SELECT Query

```js
// Reading all rows from the "deals" table
const { data, error } = await supabase
    .from('deals')
    .select('*')
```

The supabase-js API is a **method chain** that mirrors SQL:

| supabase-js method | SQL equivalent |
|---|---|
| `.from('deals')` | `FROM deals` |
| `.select('*')` | `SELECT *` |
| `.select('id, title, value')` | `SELECT id, title, value` |
| `.eq('status', 'won')` | `WHERE status = 'won'` |
| `.order('created_at', { ascending: false })` | `ORDER BY created_at DESC` |
| `.limit(10)` | `LIMIT 10` |

The call returns a destructured `{ data, error }` — not a Promise you need to unwrap manually. `data` is an array of row objects on success; `error` is a Supabase error object on failure, `null` otherwise.

```js
// Annotated full example
const { data, error } = await supabase
    .from('deals')           // target table
    .select('*')             // all columns
    .eq('status', 'active')  // WHERE status = 'active'
    .order('value', { ascending: false })  // ORDER BY value DESC

if (error) {
    console.error('Query failed:', error.message)
    return
}
// data is now: [{ id: '...', title: '...', value: 5000, status: 'active' }, ...]
```

## 6.2 Filtering Rows — `.eq()`, `.gt()`, `.lt()`

Filters are applied **on the server** before the response travels over the network. This is fundamentally different from fetching all rows and filtering them in JavaScript.

```js
// ❌ Inefficient — fetches all rows then discards most
const { data } = await supabase.from('deals').select('*')
const bigDeals  = data.filter(d => d.value > 10000)   // happens in browser

// ✅ Efficient — only big deals travel over the network
const { data: bigDeals } = await supabase
    .from('deals')
    .select('*')
    .gt('value', 10000)   // WHERE value > 10000 — runs in PostgreSQL
```

| Filter method | SQL | Example |
|---|---|---|
| `.eq('col', val)` | `col = val` | `.eq('status', 'won')` |
| `.neq('col', val)` | `col != val` | `.neq('status', 'lost')` |
| `.gt('col', val)` | `col > val` | `.gt('value', 1000)` |
| `.gte('col', val)` | `col >= val` | `.gte('value', 1000)` |
| `.lt('col', val)` | `col < val` | `.lt('value', 500)` |
| `.lte('col', val)` | `col <= val` | `.lte('value', 500)` |
| `.ilike('col', '%txt%')` | `col ILIKE '%txt%'` | `.ilike('title', '%cloud%')` |
| `.in('col', [a, b])` | `col IN (a, b)` | `.in('status', ['won', 'active'])` |

> **Server-side filtering is one of the biggest performance wins** when moving from a public API to your own database. When your table has 100,000 rows, fetching and filtering them in the browser is 100x more network traffic than letting PostgreSQL do it.

## 6.3 Storing Query Results in State

Database queries are asynchronous. The standard pattern combines `useEffect` for the side effect and `useState` for the result:

```jsx
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

function App() {
    const [deals, setDeals]     = useState([])   // initial = empty array
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

    useEffect(() => {
        async function fetchDeals() {
            const { data, error } = await supabase
                .from('deals')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                setError(error.message)
            } else {
                setDeals(data)
            }
            setLoading(false)
        }

        fetchDeals()
    }, [])   // ← empty deps: runs once on mount

    if (loading) return <p>Loading deals...</p>
    if (error)   return <p>Error: {error}</p>
    return <DealsTable deals={deals} />
}
```

The empty dependency array `[]` means "run this effect once, after the first render". This is the correct pattern for initial data fetching — equivalent to "on mount, load the data".

> **Never define the async function directly as the `useEffect` callback.** `useEffect` callbacks must return either nothing or a cleanup function — not a Promise. Defining `async function fetchDeals()` *inside* the effect and then calling it is the standard workaround.

---

# 7. Aggregate Functions — Query with Aggregate Function

## 7.1 Why Aggregates Belong in the Database

A **KPI metric bar** shows values like "Total Pipeline: ₹4,20,000" or "Average Deal: ₹35,000". You could compute these in JavaScript:

```js
// ❌ Compute aggregates in JS — downloads every row first
const { data } = await supabase.from('deals').select('value')
const total = data.reduce((sum, d) => sum + d.value, 0)
const avg   = total / data.length
```

But this downloads **every single deal row** just to compute two numbers. With thousands of deals, that is unnecessary network traffic.

```js
// ✅ Compute aggregates in PostgreSQL — only the numbers travel
const { data } = await supabase
    .from('deals')
    .select('value.sum(), value.avg()')
// data[0] → { sum: 420000, avg: 35000 }
```

PostgreSQL computes the aggregate inside the database server and returns one row — regardless of how many rows the table has.

## 7.2 Using Aggregate Functions in supabase-js

Supabase's `.select()` supports inline aggregate syntax:

```js
// Single aggregate
const { data, error } = await supabase
    .from('deals')
    .select('value.sum()')
// → data[0].sum = 420000

// Multiple aggregates
const { data, error } = await supabase
    .from('deals')
    .select('value.sum(), value.avg(), value.count()')
// → data[0] = { sum: 420000, avg: 35000, count: 12 }

// Aggregate with filter — only "won" deals
const { data } = await supabase
    .from('deals')
    .select('value.sum()')
    .eq('status', 'won')
// → total won revenue only
```

| Aggregate | SQL equivalent | Returns |
|---|---|---|
| `column.sum()` | `SUM(column)` | Sum of all values |
| `column.avg()` | `AVG(column)` | Average value |
| `column.count()` | `COUNT(column)` | Number of non-null rows |
| `column.min()` | `MIN(column)` | Smallest value |
| `column.max()` | `MAX(column)` | Largest value |

For complex aggregations (grouped by category, multiple joins), use a PostgreSQL **database function** and call it with `supabase.rpc('function_name', { args })`. The Supabase Dashboard's SQL editor lets you write and test these functions before calling them from React.

## 7.3 Formatting Data for Charts

Chart libraries (like Recharts, used in the Scrimba fullstack path) expect data in a specific shape — usually an array of objects with named keys. Raw database results often need reshaping.

```js
// Raw from Supabase:
// [{ status: 'won', count: 5 }, { status: 'active', count: 8 }, ...]

// Recharts needs:
// [{ name: 'Won', value: 5 }, { name: 'Active', value: 8 }, ...]

const { data, error } = await supabase
    .from('deals')
    .select('status, status.count()')

const chartData = data.map(row => ({
    name:  row.status.charAt(0).toUpperCase() + row.status.slice(1),
    value: row.count
}))
```

> Keep data transformation (reshaping for charts) **inside the component or a custom hook** — not inside the Supabase client file. The client file is for the connection only. Transformation is application logic.

---

# 8. Realtime Subscriptions

## 8.1 What "Realtime" Means in Supabase

Supabase's **Realtime** feature uses **WebSockets** to push database change events to connected clients. When a row is inserted, updated, or deleted, any client subscribed to that table receives a message immediately — without polling.

```
Without Realtime:                   With Realtime:
  User A inserts a deal               User A inserts a deal
  User B has stale data               Supabase sends INSERT event to User B
  User B must refresh page            User B's UI updates automatically
```

This is what makes the Sales Dashboard feel "live" — when one sales rep adds a deal, every other rep's dashboard updates without a manual refresh.

## 8.2 Setting Up a Realtime Channel

```jsx
useEffect(() => {
    // 1. Fetch initial data first
    fetchDeals()

    // 2. Open a realtime channel
    const channel = supabase
        .channel('deals-channel')   // ← arbitrary name, must be unique per subscription
        .on(
            'postgres_changes',     // ← event type: listens for PostgreSQL row changes
            {
                event: 'INSERT',    // ← 'INSERT' | 'UPDATE' | 'DELETE' | '*' (all)
                schema: 'public',   // ← your database schema (usually 'public')
                table: 'deals'      // ← which table to watch
            },
            (payload) => {
                // payload.new → the newly inserted row
                // payload.old → the row before update/delete (for UPDATE and DELETE)
                setDeals(prev => [payload.new, ...prev])
                //              ↑ functional update — avoids stale closure
            }
        )
        .subscribe()

    // 3. Return cleanup function — React calls this when the component unmounts
    return () => {
        supabase.removeChannel(channel)
    }
}, [])
```

The anatomy of `.on()`:

| Argument | Type | Purpose |
|---|---|---|
| `'postgres_changes'` | string (fixed) | Event category — subscribes to PostgreSQL WAL events |
| `{ event, schema, table }` | object | Filter: which table, which operation |
| `(payload) => {}` | callback | Runs when the event fires; `payload.new` has the new row |

## 8.3 Cleaning Up the Subscription

The `useEffect` cleanup function (the function returned from the effect) is called by React when the component unmounts. Without it, the WebSocket connection remains open even after the component is gone — a **memory and network leak**.

```jsx
// Correct pattern — always return the cleanup
useEffect(() => {
    const channel = supabase.channel('deals-channel').on(/* ... */).subscribe()

    return () => {
        supabase.removeChannel(channel)   // closes the WebSocket connection
    }
}, [])
```

```
Component lifecycle with Realtime:

  Mount   →  fetchDeals() runs     →  WebSocket opens (subscribe)
           →  initial state set    →  listening for INSERT events

  INSERT happens  →  payload.new arrives  →  setDeals() called  →  UI updates

  Unmount  →  cleanup runs  →  removeChannel()  →  WebSocket closed
```

> **Always clean up subscriptions.** In React's StrictMode (used in development), effects run twice — mount, unmount, mount. If you do not clean up, you will have two simultaneous subscriptions and see every event twice in your UI.

---

# 9. Inserting Data — Forms and Mutations

## 9.1 The New Deal Form

The "New Deal" form is a **controlled form** — each input's value is bound to a `useState` variable, exactly as taught in `13. React.js Fundamentals`. What is new here is that the submit handler calls Supabase instead of updating local state.

```jsx
function NewDealForm() {
    const [title,  setTitle]  = useState('')
    const [value,  setValue]  = useState('')
    const [status, setStatus] = useState('active')

    async function handleSubmit(e) {
        e.preventDefault()
        // ... see section 9.2
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Deal title"
                required
            />
            <input
                type="number"
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Deal value"
                required
            />
            <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
            </select>
            <button type="submit">Add Deal</button>
        </form>
    )
}
```

## 9.2 `.insert()` — Writing a Row

```jsx
async function handleSubmit(e) {
    e.preventDefault()

    const { data, error } = await supabase
        .from('deals')
        .insert([{          // ← array of row objects to insert
            title:  title,
            value:  Number(value),
            status: status
            // id and created_at are auto-generated by PostgreSQL
        }])
        .select()           // ← returns the inserted row(s) in data

    if (error) {
        console.error('Insert failed:', error.message)
        return
    }

    // Reset the form
    setTitle('')
    setValue('')
    setStatus('active')
}
```

`.insert()` takes an **array of objects**, even when inserting a single row. The `.select()` chained after insert tells Supabase to return the newly created row (including the database-generated `id` and `created_at`).

| Operation | supabase-js | SQL |
|---|---|---|
| **Insert** | `.insert([{ col: val }])` | `INSERT INTO table (col) VALUES (val)` |
| **Update** | `.update({ col: val }).eq('id', id)` | `UPDATE table SET col = val WHERE id = id` |
| **Delete** | `.delete().eq('id', id)` | `DELETE FROM table WHERE id = id` |
| **Upsert** | `.upsert([{ id, col: val }])` | `INSERT ... ON CONFLICT DO UPDATE` |

## 9.3 Optimistic vs. Realtime Updates

After a successful insert, you have two ways to update the UI:

```
Option A — Optimistic update (add to local state immediately):
  handleSubmit → supabase.insert() → success → setDeals(prev => [...prev, data[0]])
  Pro: instant feedback
  Con: UI state and DB can briefly diverge if another user also inserts simultaneously

Option B — Rely on Realtime subscription (do nothing in handleSubmit):
  handleSubmit → supabase.insert() → Supabase broadcasts INSERT event
               → subscription callback fires → setDeals(prev => [payload.new, ...prev])
  Pro: UI always reflects actual DB state; works for all users simultaneously
  Con: tiny delay (WebSocket round-trip, ~50–100ms)
```

In this module's Sales Dashboard, **Option B (realtime)** is used. The insert handler resets the form and does nothing else — the realtime channel handles the UI update for every connected client, including the one who just inserted the row.

> **Do not do both.** If you add the new deal to state optimistically AND your subscription also fires, you will see the deal appear twice. Pick one update strategy and stick with it.

---

# 10. The Full App Flow — How All Layers Connect

```
Application startup:
  Browser loads React app
    └── supabaseClient.js executes → createClient() → connection established
    └── App.jsx mounts
          ├── useEffect fires
          │     ├── fetchDeals() → supabase.from('deals').select('*')
          │     │     └── PostgreSQL responds → setDeals(data) → DealsTable renders
          │     └── supabase.channel('deals-channel').on('INSERT').subscribe()
          │           └── WebSocket connection open → listening for changes
          └── fetchMetrics() → supabase.select('value.sum(), value.avg()')
                └── PostgreSQL aggregates → setMetrics(data) → MetricsBar renders

User adds a deal:
  NewDealForm shown
    └── User fills form → clicks "Add Deal"
    └── handleSubmit fires
          └── supabase.from('deals').insert([{ title, value, status }])
                └── Row written to PostgreSQL
                └── Supabase broadcasts INSERT event over WebSocket
                └── Subscription callback fires in ALL connected browsers
                      └── setDeals(prev => [payload.new, ...prev])
                            └── DealsTable re-renders with the new row
```

---

# 11. How to Run

This project uses Vite and requires a Supabase project to be set up first.

```bash
# 1. Install dependencies
npm install

# 2. Create environment file (do not commit this to git)
# .env.local
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# 3. Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser. The app requires an active internet connection to reach the Supabase backend. Ensure your Supabase table exists and has at least one RLS policy allowing reads for the `anon` role (or authentication if RLS is set to authenticated-only — see `06. Authentication`).

---

# 12. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 15 — Advanced React.js
* **Sub-module:** 05 — Persistence
* **Topics covered:** Supabase setup, `supabase-js` queries, aggregate functions, Realtime subscriptions, insert mutations, data formatting for charts
* **Builds toward:** `06. Authentication` — which adds user accounts, protected routes, and per-user data with Row Level Security
