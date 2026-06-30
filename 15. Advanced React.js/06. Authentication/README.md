# Authentication — Advanced React.js

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Supabase Auth](https://img.shields.io/badge/Supabase-Auth%20%7C%20RLS-3ECF8E?style=flat-square&logo=supabase)
![React Router](https://img.shields.io/badge/React%20Router-v6-CA4245?style=flat-square&logo=reactrouter)
![Context API](https://img.shields.io/badge/React-Context%20API-61DAFB?style=flat-square&logo=react)
![JWT](https://img.shields.io/badge/Security-JWT%20%7C%20Row%20Level%20Security-orange?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Triggers%20%7C%20Policies-336791?style=flat-square&logo=postgresql)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **Authentication** module of **Advanced React.js** from **Scrimba's Fullstack Web Development Path** — a comprehensive exploration of how to add real user accounts, secure sign-in flows, protected routes, and database-level access control to the Sales Dashboard built in the previous `05. Persistence` module.

This README is written as a **complete concept revision guide**. Reading it top to bottom will revise every authentication concept introduced in this module, comparing what is new here against the Supabase persistence patterns from `05. Persistence` and the React Router fundamentals from `04. Routing`.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What is Authentication?](#3-what-is-authentication)
4. [What's New vs Previous Projects](#4-whats-new-vs-previous-projects)
5. [Router Setup — Extending the Route Tree](#5-router-setup--extending-the-route-tree)
   - [Adding Auth Routes](#51-adding-auth-routes)
   - [The `<Navigate>` Component — Redirecting Programmatically](#52-the-navigate-component--redirecting-programmatically)
6. [Context API — Sharing Auth State Globally](#6-context-api--sharing-auth-state-globally)
   - [Why Context for Auth?](#61-why-context-for-auth)
   - [Creating the Auth Context](#62-creating-the-auth-context)
   - [The `onAuthStateChange` Listener](#63-the-onauthstatechange-listener)
7. [JSON Web Tokens — How Supabase Auth Works](#7-json-web-tokens--how-supabase-auth-works)
   - [The Anonymous (anon) JWT](#71-the-anonymous-anon-jwt)
   - [The Authenticated JWT](#72-the-authenticated-jwt)
   - [What the Token Contains](#73-what-the-token-contains)
8. [The `auth.users` Table — Supabase's Built-in User Store](#8-the-authusers-table--supabases-built-in-user-store)
9. [The Sign In Component](#9-the-sign-in-component)
   - [Sign In — Part 1 (Form UI)](#91-sign-in--part-1-form-ui)
   - [Sign In — Part 2 (Auth Call)](#92-sign-in--part-2-auth-call)
10. [The Sign In Auth Function](#10-the-sign-in-auth-function)
    - [Part 1 — Password Sign In](#101-part-1--password-sign-in)
    - [Part 2 — OAuth / Social Sign In](#102-part-2--oauth--social-sign-in)
11. [Navigate & Link — Routing After Auth Events](#11-navigate--link--routing-after-auth-events)
12. [Sign Out](#12-sign-out)
13. [Navigate After Sign Out](#13-navigate-after-sign-out)
14. [Row Level Security (RLS)](#14-row-level-security-rls)
    - [What RLS Is and Why It Matters](#141-what-rls-is-and-why-it-matters)
    - [Enabling RLS on a Table](#142-enabling-rls-on-a-table)
    - [Writing Policies — Authenticated Users Only](#143-writing-policies--authenticated-users-only)
15. [Protected Routes](#15-protected-routes)
    - [The `<ProtectedRoute>` Component](#151-the-protectedroute-component)
    - [Applying Protection to Routes](#152-applying-protection-to-routes)
16. [Sign Up — New User Registration](#16-sign-up--new-user-registration)
17. [Database Refactoring — Linking Data to Users](#17-database-refactoring--linking-data-to-users)
    - [Part 1 — Adding a `user_id` Column](#171-part-1--adding-a-user_id-column)
    - [Part 2 — Updating Queries to Filter by User](#172-part-2--updating-queries-to-filter-by-user)
18. [User Profiles Table](#18-user-profiles-table)
19. [Sign Up Expansion — Capturing Profile Data](#19-sign-up-expansion--capturing-profile-data)
20. [Triggers — Auto-creating Profiles on Sign Up](#20-triggers--auto-creating-profiles-on-sign-up)
21. [Refactoring the Deals Table for Multi-user Support](#21-refactoring-the-deals-table-for-multi-user-support)
22. [Fetching All Profiles](#22-fetching-all-profiles)
23. [Updating Forms and Metrics for Auth Context](#23-updating-forms-and-metrics-for-auth-context)
24. [Account Type in Header](#24-account-type-in-header)
25. [The Full App Flow — Auth Layer Added](#25-the-full-app-flow--auth-layer-added)
26. [How to Run](#26-how-to-run)
27. [Course Reference](#27-course-reference)

---

# 1. Project Overview

The Authentication module takes the Sales Dashboard from `05. Persistence` and transforms it into a **multi-user application** where every user has their own account, sees only their own data, and the database enforces data isolation at the row level. The app now includes:

* A **Sign In page** with email/password form and optional OAuth (social sign-in)
* A **Sign Up page** that creates a Supabase Auth user and a matching profile row
* A **protected dashboard** — any unauthenticated request to the dashboard redirects to sign-in
* A **auth context** that shares the current user session across the entire component tree
* **Row Level Security (RLS) policies** in PostgreSQL that guarantee each user can only read/write their own deals
* A **user profiles table** linked to `auth.users` via a database trigger
* A **header** that displays the signed-in user's account type and a Sign Out button

The goal of this module is not just to build a page — it is to understand authentication as a **full-stack concern**: it is not only about hiding a UI element, it is about protecting data at the database level so that even a direct API call cannot bypass the restriction.

---

# 2. Project Structure

```
15. Advanced React.js/
│
└── 06. Authentication/
    ├── src/
    │   ├── main.jsx                  → Entry point; wraps app in <AuthProvider>
    │   ├── App.jsx                   → Route tree; wraps protected routes in <ProtectedRoute>
    │   ├── supabaseClient.js         → Supabase client singleton (unchanged from module 05)
    │   ├── context/
    │   │   └── AuthContext.jsx       → createContext + AuthProvider + useAuth hook
    │   ├── pages/
    │   │   ├── Dashboard.jsx         → Main protected page (deals table + metrics)
    │   │   ├── SignIn.jsx            → Sign-in form page
    │   │   └── SignUp.jsx            → Sign-up form page with profile fields
    │   ├── components/
    │   │   ├── Header.jsx            → Displays user account type + sign-out button
    │   │   ├── MetricsBar.jsx        → KPI cards (now filtered by user_id)
    │   │   ├── DealsTable.jsx        → Table (now refactored to show all profiles' deals)
    │   │   ├── DealChart.jsx         → Chart (now filtered by user_id)
    │   │   ├── NewDealForm.jsx       → Form (now inserts user_id from auth context)
    │   │   └── ProtectedRoute.jsx    → HOC wrapper; redirects to /signin if no session
    │   └── index.css                 → Global styles
    ├── .env.local                    → VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
    ├── index.html                    → HTML shell
    ├── vite.config.js                → Vite config
    └── package.json                  → Dependencies
```

---

# 3. What is Authentication?

**Authentication** is the process of verifying *who* a user is. It is distinct from **authorisation**, which is deciding *what* a verified user is allowed to do.

```
Authentication:  "Who are you?"         → Prove identity (username + password, Google login)
Authorisation:   "What can you do?"     → Check permissions (can this user read this row?)
```

In web applications, authentication typically works through a token-based flow:

```
┌──────────────────────────────────────────────────────────────────┐
│  Token-Based Auth Flow                                           │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. User provides credentials (email + password)                 │
│       ↓                                                          │
│  2. Server verifies credentials against stored hash              │
│       ↓                                                          │
│  3. Server issues a signed JWT (JSON Web Token)                  │
│       ↓                                                          │
│  4. Client stores the JWT (Supabase uses localStorage)           │
│       ↓                                                          │
│  5. Client sends the JWT on every subsequent request             │
│       ↓                                                          │
│  6. Server/database verifies the JWT signature on each request   │
│       ↓                                                          │
│  7. If valid: request succeeds. If invalid/expired: 401 error    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

| Term | Definition |
|---|---|
| **JWT (JSON Web Token)** | A cryptographically signed string containing user identity claims (`uid`, `role`, `email`, expiry) |
| **Session** | The period during which a JWT is valid; Supabase auto-refreshes sessions |
| **RLS (Row Level Security)** | A PostgreSQL feature that evaluates a policy per-row per-user before returning data |
| **Trigger** | A PostgreSQL function that runs automatically when a specific table event occurs (e.g. INSERT into `auth.users`) |
| **Protected Route** | A React route component that checks for a session before rendering its children |

---

# 4. What's New vs Previous Projects

## New Authentication Concepts

| Concept | Where Used | Purpose |
|---|---|---|
| `supabase.auth.signInWithPassword()` | `SignIn.jsx` | Authenticates a user with email + password |
| `supabase.auth.signInWithOAuth()` | `SignIn.jsx` | Redirects to a third-party OAuth provider (Google, GitHub) |
| `supabase.auth.signUp()` | `SignUp.jsx` | Creates a new user in Supabase's `auth.users` table |
| `supabase.auth.signOut()` | `Header.jsx` | Clears the session and removes JWT from localStorage |
| `supabase.auth.getSession()` | `AuthContext.jsx` | Reads the current session synchronously on app load |
| `supabase.auth.onAuthStateChange()` | `AuthContext.jsx` | Subscribes to sign-in/sign-out events for reactive state |
| `createContext()` | `AuthContext.jsx` | Creates a React context to share auth state globally |
| `useContext()` | Every component needing the user | Consumes the auth context without prop drilling |
| `<Navigate to="/signin" />` | `ProtectedRoute.jsx` | Programmatic redirect when no session is detected |
| Row Level Security policies | Supabase Dashboard (SQL) | Database-enforced per-user data isolation |
| PostgreSQL `TRIGGER` | Supabase Dashboard (SQL) | Auto-creates a profile row when a new auth user is created |
| `auth.uid()` | RLS policies | SQL function returning the `uid` from the request's JWT |

## New React Router Patterns

| Concept | Where Used | Purpose |
|---|---|---|
| Nested route wrapping with `<ProtectedRoute>` | `App.jsx` | Guards multiple routes without repeating auth logic |
| `useNavigate()` hook | `SignIn.jsx`, `Header.jsx` | Programmatically navigates after sign-in / sign-out |
| `<Link>` between sign-in and sign-up | `SignIn.jsx`, `SignUp.jsx` | Client-side navigation without page reload |

## Concepts Carried Over and Deepened

| Concept | Module 05 version | Module 06 version |
|---|---|---|
| `supabase.from().select()` | Fetched all deals for all users | Now filtered by `user_id = auth.uid()` via RLS |
| `supabase.from().insert()` | Inserted a row with title, value, status | Now also inserts `user_id` from auth context |
| Realtime subscription | Listened to all INSERTs on deals table | Now only receives INSERTs for the current user (RLS filters WebSocket events too) |
| `useEffect` cleanup | Cleaned up realtime channel | Also cleans up `onAuthStateChange` subscription |
| Controlled form | Used for new deal | Extended for sign-in and sign-up forms |

---

# 5. Router Setup — Extending the Route Tree

## 5.1 Adding Auth Routes

The existing router from `04. Routing` is extended with two new public routes (`/signin`, `/signup`) and the existing routes are wrapped in `<ProtectedRoute>`.

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard    from './pages/Dashboard'
import SignIn       from './pages/SignIn'
import SignUp       from './pages/SignUp'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes — accessible without a session */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected routes — redirect to /signin if no session */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
```

## 5.2 The `<Navigate>` Component — Redirecting Programmatically

React Router v6 provides the `<Navigate>` component for declarative redirects. When React renders `<Navigate to="/signin" />`, the user is immediately sent to that path — no button click required.

```jsx
import { Navigate } from 'react-router-dom'

// If this renders, the user is sent to /signin
return <Navigate to="/signin" replace />
```

The `replace` prop means the redirect **replaces** the current history entry instead of pushing a new one. Without `replace`, pressing the browser back button after sign-in would return to the protected route and trigger another redirect — an infinite loop.

| `replace` | Browser back button behaviour |
|---|---|
| `false` (default) | History: `/dashboard` → `/signin` → back sends to `/dashboard` → infinite redirect |
| `true` | History: `/signin` → back sends to wherever the user was before `/dashboard` |

> Always use `replace` when redirecting from a protected route to a login page. It prevents the redirect loop described above.

---

# 6. Context API — Sharing Auth State Globally

## 6.1 Why Context for Auth?

The authenticated user (`session.user`) is needed by many components simultaneously:
- `ProtectedRoute` — to decide whether to render or redirect
- `NewDealForm` — to attach `user_id` to new inserts
- `Header` — to display the user's name / account type
- `MetricsBar` / `DealChart` — to scope queries to the current user

Without context, you would pass `user` as a prop through every component in the tree — **prop drilling**. Context solves this by making the value available to any component that opts in, regardless of depth.

```
Without Context (prop drilling):
  App → Dashboard (user) → Header (user) → UserBadge (user)
  App → Dashboard (user) → NewDealForm (user)

With Context:
  App wraps everything in <AuthProvider>
  Header      → useAuth() → session.user  ✅
  NewDealForm → useAuth() → session.user  ✅
  (no props passed through intermediate components)
```

## 6.2 Creating the Auth Context

```jsx
// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

// 1. Create the context object with a default value of null
const AuthContext = createContext(null)

// 2. Provider component — wraps the app and owns the auth state
export function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 3. Read the existing session on first load (handles page refresh)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        // 4. Subscribe to future auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session)
            }
        )

        // 5. Clean up the subscription on unmount
        return () => subscription.unsubscribe()
    }, [])

    const value = {
        session,           // the full Supabase session object
        user: session?.user ?? null,   // shortcut to the user object
        loading            // true while initial session is being read
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

// 6. Custom hook — convenient way to consume the context
export function useAuth() {
    return useContext(AuthContext)
}
```

Usage in any component:

```jsx
import { useAuth } from '../context/AuthContext'

function Header() {
    const { user, session } = useAuth()

    return <p>Signed in as: {user?.email}</p>
}
```

## 6.3 The `onAuthStateChange` Listener

`supabase.auth.onAuthStateChange()` fires every time the user's authentication state changes. Supabase calls it automatically on:

| Event | When it fires |
|---|---|
| `SIGNED_IN` | User signs in with email/password or OAuth |
| `SIGNED_OUT` | User calls `supabase.auth.signOut()` |
| `TOKEN_REFRESHED` | Supabase silently refreshes an expiring access token |
| `USER_UPDATED` | User's profile data changes |
| `PASSWORD_RECOVERY` | Password reset email link is clicked |

```jsx
// _event is the event name string, session is the new session (or null if signed out)
supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session)
    // session is null after SIGNED_OUT
    // session is a full object after SIGNED_IN / TOKEN_REFRESHED
})
```

> `onAuthStateChange` fires once immediately with the current state when you subscribe. This means you could use it alone (without `getSession`) — but calling `getSession` first is safer because it resolves synchronously from localStorage, avoiding a brief "not logged in" flash before the listener fires.

---

# 7. JSON Web Tokens — How Supabase Auth Works

## 7.1 The Anonymous (anon) JWT

When the Supabase client initialises with your `VITE_SUPABASE_ANON_KEY`, it automatically includes that key as a Bearer token on every request. This is the **anonymous JWT** — it tells PostgreSQL "this request comes from an unauthenticated visitor with the `anon` role".

```
Request without sign-in:
  Authorization: Bearer <SUPABASE_ANON_KEY>
  → PostgreSQL role: anon
  → RLS policies for anon role apply (usually: no access)
```

## 7.2 The Authenticated JWT

After a successful sign-in, Supabase issues a **user-specific JWT** and stores it in `localStorage`. The Supabase client automatically sends this token on every subsequent request instead of the anon key.

```
Request after sign-in:
  Authorization: Bearer <user-specific-JWT>
  → PostgreSQL role: authenticated
  → RLS policies for authenticated role apply (access if uid matches)
  → auth.uid() returns the user's UUID
```

## 7.3 What the Token Contains

A JWT has three parts separated by dots: `header.payload.signature`

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9   ← header (base64)
.
eyJzdWIiOiIxMjM0NTY3ODkwIiwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJ1aWQiOiJhYmMtMTIzIn0   ← payload (base64)
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c   ← signature (HMAC-SHA256)
```

The **payload** (when decoded) looks like:

```json
{
  "sub":   "abc-123-def-456",   ← the user's unique ID (same as auth.uid())
  "role":  "authenticated",
  "email": "user@example.com",
  "exp":   1719222800           ← expiry timestamp (Unix)
}
```

PostgreSQL's `auth.uid()` function extracts the `sub` field from this JWT and makes it available inside RLS policies. This is how the database knows which user owns which row.

> **The JWT is NOT a secret.** Anyone can base64-decode the payload and read it. The security comes from the **signature** — only Supabase's server (with the secret signing key) can create a valid signature. Postgres verifies the signature on every request. A tampered or forged JWT is rejected.

---

# 8. The `auth.users` Table — Supabase's Built-in User Store

Supabase maintains a dedicated PostgreSQL schema called `auth` that contains a `users` table. This table stores:

```
auth.users
├── id          (uuid, primary key)     → the user's unique identifier
├── email       (text)                  → sign-in email
├── created_at  (timestamptz)           → account creation time
├── last_sign_in_at (timestamptz)       → last successful sign-in
└── (many internal fields for tokens, email confirmation, etc.)
```

**You do not query `auth.users` directly from your React app.** Instead:
- Supabase Auth manages it automatically
- You create a separate `public.profiles` table for your app-specific user data (name, account type, avatar, etc.)
- A **database trigger** automatically creates a profile row whenever a new row appears in `auth.users`

```jsx
// ✅ Access auth user from supabase-js session
const { user } = useAuth()
console.log(user.id)      // the auth.users id (UUID)
console.log(user.email)   // the sign-in email

// ❌ Do not query auth.users from supabase-js — access is blocked by design
const { data } = await supabase.from('auth.users').select('*')   // will fail
```

---

# 9. The Sign In Component

## 9.1 Sign In — Part 1 (Form UI)

The sign-in page is a controlled form, using the same pattern as forms in earlier modules. Nothing about the form itself is new — the novelty is what happens in `handleSubmit`.

```jsx
// pages/SignIn.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'

function SignIn() {
    const [email,    setEmail]    = useState('')
    const [password, setPassword] = useState('')
    const [error,    setError]    = useState(null)
    const [loading,  setLoading]  = useState(false)

    return (
        <div className="auth-page">
            <h1>Sign In</h1>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>
            </form>

            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}
```

## 9.2 Sign In — Part 2 (Auth Call)

```jsx
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            // onAuthStateChange in AuthContext fires → session state updates
            // Navigate to the dashboard
            navigate('/', { replace: true })
        }
    }
```

The `supabase.auth.signInWithPassword()` call:
1. Sends credentials to Supabase Auth
2. Supabase verifies the password hash in `auth.users`
3. Supabase returns a session containing the user's JWT
4. The Supabase client stores the JWT in `localStorage`
5. `onAuthStateChange` fires in `AuthContext`, updating `session` state across the app
6. `navigate('/')` sends the user to the dashboard

---

# 10. The Sign In Auth Function

## 10.1 Part 1 — Password Sign In

```jsx
// Email + password sign-in
const { data, error } = await supabase.auth.signInWithPassword({
    email:    'user@example.com',
    password: 'my-secure-password'
})

// data.session → the session object (if successful)
// data.user    → the user object (if successful)
// error        → Supabase error (if failed), e.g. "Invalid login credentials"
```

Supabase does **not** store passwords in plain text. It stores a bcrypt hash. The `signInWithPassword` call hashes the submitted password and compares it to the stored hash — your app never handles the raw password except for the moment the user types it.

## 10.2 Part 2 — OAuth / Social Sign In

OAuth allows users to sign in with an existing identity provider (Google, GitHub, etc.) without creating a new password.

```jsx
// OAuth sign-in — redirects to the provider's login page
const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',     // 'google' | 'github' | 'facebook' | 'twitter' | etc.
    options: {
        redirectTo: 'http://localhost:5173'   // where to send the user after OAuth
    }
})
```

OAuth flow:

```
1. User clicks "Sign in with Google"
   ↓
2. supabase.auth.signInWithOAuth({ provider: 'google' }) called
   ↓
3. Browser redirects to Google's login page
   ↓
4. User approves access on Google
   ↓
5. Google redirects back to your app (redirectTo URL) with a code
   ↓
6. Supabase exchanges the code for a session → stores JWT in localStorage
   ↓
7. onAuthStateChange fires → app knows the user is signed in
```

| Method | Use when | Password required? |
|---|---|---|
| `signInWithPassword` | Email/password accounts | ✅ Yes |
| `signInWithOAuth` | Social login (Google, GitHub) | ❌ No — provider handles it |
| `signInWithOtp` | Magic link (passwordless email) | ❌ No — email link used |

---

# 11. Navigate & Link — Routing After Auth Events

React Router v6 provides two ways to change the current route after an auth event:

```jsx
// 1. <Link> — declarative, renders as an <a> tag, for user-initiated navigation
<Link to="/signup">Create an account</Link>
<Link to="/signin">Back to sign in</Link>

// 2. useNavigate() hook — imperative, for programmatic navigation after async events
const navigate = useNavigate()

// Navigate to dashboard after sign-in
navigate('/', { replace: true })

// Navigate to sign-in after sign-out
navigate('/signin', { replace: true })
```

| Situation | Use `<Link>` or `useNavigate`? |
|---|---|
| "Sign Up" link in the sign-in page footer | `<Link>` — user-initiated, declarative |
| Navigate after successful `signInWithPassword()` | `useNavigate()` — happens inside async handler |
| Navigate after `signOut()` | `useNavigate()` — happens inside async handler |
| Redirect from protected route when not logged in | `<Navigate>` — rendered inside JSX |

---

# 12. Sign Out

```jsx
// In Header.jsx or any component
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Header() {
    const navigate = useNavigate()

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut()

        if (!error) {
            // onAuthStateChange fires with session = null
            // AuthContext updates, ProtectedRoute redirects automatically
            navigate('/signin', { replace: true })
        }
    }

    return (
        <header>
            <h1>Sales Dashboard</h1>
            <button onClick={handleSignOut}>Sign Out</button>
        </header>
    )
}
```

`supabase.auth.signOut()`:
1. Calls the Supabase Auth API to invalidate the server-side session
2. Removes the JWT from `localStorage`
3. Fires `onAuthStateChange` with `session = null`
4. `AuthContext` sets `session` to `null` → all components re-render with no user
5. `ProtectedRoute` detects no session → renders `<Navigate to="/signin" />`

---

# 13. Navigate After Sign Out

The `navigate('/signin', { replace: true })` call in the sign-out handler is **belt-and-suspenders**: the `ProtectedRoute` would already handle the redirect when `session` becomes `null`. The explicit `navigate` call makes the UX snappier (no waiting for React's render cycle) and is a clear signal of intent.

```
Sign out sequence:
  handleSignOut() called
    ↓
  supabase.auth.signOut() → clears localStorage JWT
    ↓
  onAuthStateChange fires → setSession(null) in AuthContext
    ↓                                     ↓
  navigate('/signin') fires immediately    AuthContext re-renders
    ↓                                     ↓
  User sees /signin page    ProtectedRoute sees null → also would redirect
  (whichever happens first wins — both arrive at /signin)
```

---

# 14. Row Level Security (RLS)

## 14.1 What RLS Is and Why It Matters

**Row Level Security** is a PostgreSQL feature that evaluates a SQL **policy** for every single row before returning it to the requester. It is the database-level enforcement of "each user can only see their own data".

```
Without RLS:
  Any user with your anon key can query:
    SELECT * FROM deals → returns ALL deals from ALL users ❌

With RLS enabled (but no policy):
  SELECT * FROM deals → returns 0 rows (all access blocked by default) ✅

With RLS + authenticated policy:
  Signed-in user queries:
    SELECT * FROM deals → returns only rows WHERE user_id = auth.uid() ✅
  Anonymous user queries:
    SELECT * FROM deals → returns 0 rows ✅
```

> **RLS is the last line of defence.** Even if your React code has a bug that accidentally fetches another user's data, RLS ensures the database will never return it. Always enable RLS on every table that contains user-specific data.

## 14.2 Enabling RLS on a Table

In the Supabase Dashboard:
```
Table Editor → Select table (e.g. "deals") → RLS tab → Enable RLS
```

Or via SQL:
```sql
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
```

After enabling RLS, **all access is blocked by default** until you add policies. Existing queries will return 0 rows.

## 14.3 Writing Policies — Authenticated Users Only

```sql
-- Allow authenticated users to SELECT only their own deals
CREATE POLICY "Users can read own deals"
ON public.deals
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow authenticated users to INSERT deals for themselves
CREATE POLICY "Users can insert own deals"
ON public.deals
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to UPDATE their own deals
CREATE POLICY "Users can update own deals"
ON public.deals
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Allow authenticated users to DELETE their own deals
CREATE POLICY "Users can delete own deals"
ON public.deals
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
```

| Policy clause | When it runs | Purpose |
|---|---|---|
| `USING (condition)` | SELECT, UPDATE, DELETE | Filters existing rows — only rows where condition is true are visible |
| `WITH CHECK (condition)` | INSERT, UPDATE | Validates new/updated data — rejects rows where condition is false |
| `TO authenticated` | All | Only applies when the request includes a valid user JWT |
| `TO anon` | All | Only applies when the request uses the anonymous key |

---

# 15. Protected Routes

## 15.1 The `<ProtectedRoute>` Component

```jsx
// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute() {
    const { session, loading } = useAuth()

    // While auth state is loading (first render), show nothing
    // This prevents a flash redirect to /signin before the session is read
    if (loading) return null

    // If there is no session, redirect to /signin
    if (!session) {
        return <Navigate to="/signin" replace />
    }

    // Session exists — render the child route
    return <Outlet />
}

export default ProtectedRoute
```

`<Outlet />` is a React Router v6 component that renders the matched child route. It is used here because `ProtectedRoute` is a **layout route** — a wrapper that renders around nested routes.

```
Without Outlet:
  <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Dashboard />} />
  </Route>
  → ProtectedRoute renders → no Outlet → Dashboard never appears ❌

With Outlet:
  → ProtectedRoute renders → Outlet renders → Dashboard appears ✅
```

## 15.2 Applying Protection to Routes

```jsx
// App.jsx
<Routes>
    {/* Public */}
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />

    {/* Protected — all routes nested here require a session */}
    <Route element={<ProtectedRoute />}>
        <Route path="/"          element={<Dashboard />} />
        <Route path="/settings"  element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
    </Route>
</Routes>
```

Any number of routes can be nested inside `<ProtectedRoute />`. The auth check runs once in `ProtectedRoute` and protects all children simultaneously — you do not need to repeat the check in each page component.

---

# 16. Sign Up — New User Registration

```jsx
// pages/SignUp.jsx (handleSubmit)
async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                // Supabase stores these in auth.users.raw_user_meta_data
                // The trigger reads them to create the profile row
                full_name:    fullName,
                account_type: accountType    // e.g. 'admin' | 'sales_rep'
            }
        }
    })

    if (error) {
        setError(error.message)
        setLoading(false)
    } else {
        // Success — Supabase may send a confirmation email
        // If email confirmation is disabled in Dashboard, session is immediately active
        navigate('/', { replace: true })
    }
}
```

`supabase.auth.signUp()` creates the user in `auth.users`. The `options.data` object is stored as metadata — not in a separate `profiles` table. The profiles table is created separately and populated by a trigger (see [Section 20](#20-triggers--auto-creating-profiles-on-sign-up)).

---

# 17. Database Refactoring — Linking Data to Users

## 17.1 Part 1 — Adding a `user_id` Column

The `deals` table from `05. Persistence` had no concept of ownership. Every deal belonged to nobody — or everyone. To support per-user data isolation, a `user_id` column referencing `auth.users.id` is added:

```sql
-- Add the foreign key column
ALTER TABLE public.deals
ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- Backfill existing rows if any exist (optional in development)
-- UPDATE public.deals SET user_id = '<your-test-user-uuid>';
```

With `user_id` in place:
- Every `INSERT` must now supply the inserting user's UUID
- RLS policies can filter on `user_id = auth.uid()`
- The relationship between `deals` and `auth.users` is enforced at the database level (foreign key constraint)

## 17.2 Part 2 — Updating Queries to Filter by User

Before RLS, queries fetched all rows. After RLS is enabled with the policy `USING (auth.uid() = user_id)`, Postgres does the filtering automatically — **no change to the React query is needed**. RLS is transparent to the client.

```jsx
// This query looks exactly the same before and after RLS
const { data } = await supabase.from('deals').select('*')
// Before RLS: returns ALL deals
// After RLS + policy: returns ONLY the current user's deals (Postgres filters automatically)
```

However, you do need to **update your insert** to include `user_id`:

```jsx
// NewDealForm.jsx — updated handleSubmit
const { user } = useAuth()   // ← get user from AuthContext

const { error } = await supabase
    .from('deals')
    .insert([{
        title:   title,
        value:   Number(value),
        status:  status,
        user_id: user.id    // ← attach the current user's UUID
    }])
```

---

# 18. User Profiles Table

The `auth.users` table is internal to Supabase and not directly queryable or writable from the client. For app-specific user data (name, avatar, account type), a separate **profiles** table is created in the `public` schema:

```sql
-- Create the profiles table
CREATE TABLE public.profiles (
    id           uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name    text,
    account_type text CHECK (account_type IN ('admin', 'sales_rep', 'manager')),
    avatar_url   text,
    created_at   timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read all profiles (sales team can see each other)
CREATE POLICY "All authenticated users can read profiles"
ON public.profiles FOR SELECT TO authenticated USING (true);

-- Allow users to update only their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
```

The `id` column in `profiles` is a **foreign key** to `auth.users.id`. When a user is deleted from `auth.users`, their profile row is automatically deleted too (`ON DELETE CASCADE`).

---

# 19. Sign Up Expansion — Capturing Profile Data

The sign-up form is expanded to collect the profile fields needed for the `profiles` table:

```jsx
// pages/SignUp.jsx — additional fields
const [fullName,    setFullName]    = useState('')
const [accountType, setAccountType] = useState('sales_rep')

// Form additions
<input
    value={fullName}
    onChange={e => setFullName(e.target.value)}
    placeholder="Full name"
    required
/>
<select value={accountType} onChange={e => setAccountType(e.target.value)}>
    <option value="sales_rep">Sales Representative</option>
    <option value="manager">Manager</option>
    <option value="admin">Admin</option>
</select>
```

These values are passed to `supabase.auth.signUp()` in `options.data`, where they are stored as `raw_user_meta_data` in `auth.users`. The database trigger (Section 20) then reads this metadata to populate the `profiles` table.

---

# 20. Triggers — Auto-creating Profiles on Sign Up

A **PostgreSQL trigger** is a function that runs automatically in response to a database event. Here, it creates a `profiles` row whenever a new row is inserted into `auth.users`.

```sql
-- Step 1: Create the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    -- Insert a new profile row for the newly created auth user
    INSERT INTO public.profiles (id, full_name, account_type)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data ->> 'full_name',
        NEW.raw_user_meta_data ->> 'account_type'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 2: Attach the trigger to auth.users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
```

```
Sign-up flow with trigger:
  supabase.auth.signUp() called
    ↓
  Supabase inserts row into auth.users
    ↓
  Trigger "on_auth_user_created" fires automatically
    ↓
  handle_new_user() reads NEW.raw_user_meta_data
    ↓
  INSERT into public.profiles (id, full_name, account_type)
    ↓
  Profile row exists — app can query it immediately
```

| Trigger keyword | Meaning |
|---|---|
| `AFTER INSERT` | Runs after the row has been successfully inserted |
| `FOR EACH ROW` | Runs once per inserted row (not once per statement) |
| `NEW` | A special variable containing the newly inserted row |
| `SECURITY DEFINER` | The function runs with the permissions of its creator, not the caller — necessary because `auth.users` is otherwise inaccessible |

> **Do not create profiles manually in `handleSubmit`.** There is a race condition: if `supabase.auth.signUp()` succeeds but the subsequent `supabase.from('profiles').insert()` fails (network error, RLS policy issue), you have an orphaned auth user with no profile. A trigger is atomic — it runs in the same database transaction as the `auth.users` insert, so both succeed or both fail together.

---

# 21. Refactoring the Deals Table for Multi-user Support

With multiple users sharing the dashboard, the `DealsTable` component needs to show which user each deal belongs to. This requires **joining** the `deals` table with the `profiles` table:

```jsx
// Fetch deals joined with profile data
const { data, error } = await supabase
    .from('deals')
    .select(`
        *,
        profiles (
            full_name,
            account_type,
            avatar_url
        )
    `)
    .order('created_at', { ascending: false })
```

The `profiles (full_name, account_type)` syntax is **Supabase's relationship query syntax**. It tells supabase-js to follow the `user_id → profiles.id` foreign key and embed the related profile fields into each deal row.

Result shape:
```json
[
    {
        "id": "deal-uuid",
        "title": "Acme Corp",
        "value": 15000,
        "user_id": "user-uuid",
        "profiles": {
            "full_name": "Alice Smith",
            "account_type": "sales_rep"
        }
    }
]
```

---

# 22. Fetching All Profiles

Managers and admins may need to view all team members' profiles — for example, to assign deals or see who is on the team:

```jsx
// Fetch all profiles (RLS policy allows all authenticated users to read)
const { data: profiles, error } = await supabase
    .from('profiles')
    .select('id, full_name, account_type, avatar_url')
    .order('full_name', { ascending: true })
```

Because the RLS policy for `profiles` uses `USING (true)` (all authenticated users can read all profiles), this query returns every profile — not just the current user's. This is an intentional design choice for a team sales dashboard where visibility across team members is desired.

---

# 23. Updating Forms and Metrics for Auth Context

After adding authentication, every component that reads or writes deals must be updated to use the auth context:

```jsx
// NewDealForm.jsx — now attaches user_id on insert
const { user } = useAuth()

async function handleSubmit(e) {
    e.preventDefault()
    await supabase.from('deals').insert([{
        title, value: Number(value), status,
        user_id: user.id    // ← added
    }])
}
```

```jsx
// MetricsBar.jsx — now fetches metrics for current user only
const { user } = useAuth()

useEffect(() => {
    async function fetchMetrics() {
        const { data } = await supabase
            .from('deals')
            .select('value.sum(), value.avg(), value.count()')
            // RLS automatically filters to user's deals — no .eq() needed
        setMetrics(data[0])
    }
    fetchMetrics()
}, [user])   // ← re-fetch when user changes (e.g. sign in as different account)
```

---

# 24. Account Type in Header

The header displays contextual information based on the signed-in user's account type from the `profiles` table:

```jsx
// Header.jsx
function Header() {
    const { user } = useAuth()
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        if (!user) return
        supabase
            .from('profiles')
            .select('full_name, account_type')
            .eq('id', user.id)
            .single()    // ← .single() returns an object instead of an array
            .then(({ data }) => setProfile(data))
    }, [user])

    async function handleSignOut() {
        await supabase.auth.signOut()
        navigate('/signin', { replace: true })
    }

    return (
        <header>
            <h1>Sales Dashboard</h1>
            {profile && (
                <div className="user-info">
                    <span>{profile.full_name}</span>
                    <span className={`badge badge-${profile.account_type}`}>
                        {profile.account_type.replace('_', ' ')}
                    </span>
                </div>
            )}
            <button onClick={handleSignOut}>Sign Out</button>
        </header>
    )
}
```

`.single()` is a supabase-js modifier that expects exactly one result. Instead of returning `data` as an array, it returns `data` as a plain object. If zero or more than one row matches, it returns an error.

---

# 25. The Full App Flow — Auth Layer Added

```
Application startup:
  Browser loads React app
    └── AuthProvider mounts
          ├── getSession() → reads JWT from localStorage
          │     └── Session found → setSession(session) → loading = false
          │     └── No session → setSession(null) → loading = false
          └── onAuthStateChange subscribed → listens for future events

User visits protected route (not signed in):
  React Router matches "/" → renders <ProtectedRoute>
    └── session = null → <Navigate to="/signin" replace /> rendered
    └── User sees SignIn page

User signs in:
  SignIn form submitted → supabase.auth.signInWithPassword()
    └── JWT received → stored in localStorage
    └── onAuthStateChange fires → setSession(session)
    └── navigate('/') → Dashboard renders
    └── ProtectedRoute: session exists → <Outlet /> → Dashboard shown

User submits a new deal:
  NewDealForm → supabase.insert([{ ..., user_id: user.id }])
    └── Row written to PostgreSQL with user_id
    └── RLS: user_id = auth.uid() ✅ → insert allowed
    └── Realtime broadcasts INSERT event
    └── Subscription callback: setDeals(prev => [payload.new, ...prev])

User signs out:
  Header "Sign Out" button → supabase.auth.signOut()
    └── JWT removed from localStorage
    └── onAuthStateChange fires → setSession(null)
    └── navigate('/signin') → ProtectedRoute also redirects (belt-and-suspenders)
    └── User sees SignIn page
```

---

# 26. How to Run

This project requires a Supabase project with:
1. A `deals` table (with `user_id` column referencing `auth.users`)
2. A `profiles` table
3. Row Level Security enabled on both tables with the policies described in Sections 14 and 18
4. The `handle_new_user` trigger from Section 20
5. Email confirmation disabled in Supabase Dashboard → Authentication → Providers → Email (for local development)

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# 3. Start dev server
npm run dev
```

Open `http://localhost:5173`. Navigate to `/signup` to create your first account. The trigger will create the corresponding profile row. Sign in at `/signin` to access the protected dashboard.

---

# 27. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 15 — Advanced React.js
* **Sub-module:** 06 — Authentication
* **Topics covered:** Supabase Auth, JWT tokens, Context API, `onAuthStateChange`, sign-in/sign-out/sign-up flows, OAuth, protected routes, Row Level Security, PostgreSQL triggers, user profiles table, database refactoring for multi-user support
* **Builds on:** `05. Persistence` (Supabase CRUD + Realtime) and `04. Routing` (React Router v6)
