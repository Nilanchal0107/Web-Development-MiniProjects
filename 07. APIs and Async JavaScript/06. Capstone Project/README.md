# Capstone Project — APIs and Async JavaScript

![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-yellow?style=flat-square&logo=javascript)
![Top-level await](https://img.shields.io/badge/Top--level%20await-ES%20Module-blueviolet?style=flat-square)
![Three APIs](https://img.shields.io/badge/APIs-Unsplash%20%7C%20CoinGecko%20%7C%20OpenWeather-teal?style=flat-square)
![try/catch](https://img.shields.io/badge/try%2Fcatch-Error%20Handling-red?style=flat-square)
![Chrome Extension](https://img.shields.io/badge/Chrome%20Extension-Manifest%20v3-green?style=flat-square&logo=googlechrome)
![Geolocation](https://img.shields.io/badge/Geolocation-Browser%20API-lightgrey?style=flat-square)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

**Personal Dashboard** — the **Capstone Project of the APIs and Async JavaScript module** from **Scrimba's Fullstack Web Development Path**.

This README is a **complete concept revision guide**. It explains every new concept introduced in this capstone: top-level `await` in ES Modules, `try/catch` error handling, the `res.ok` check + `throw Error()` pattern, `setInterval`, the Geolocation API, `navigator.geolocation.getCurrentPosition`, `document.body.style.backgroundImage`, `Date` / `toLocaleTimeString`, `Math.round`, `flex-wrap`, and the Chrome Extension `manifest.json` format.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Async JavaScript (War)](#3-whats-new-vs-async-javascript-war)
4. [ES Modules and Top-Level await](#4-es-modules-and-top-level-await)
   - [type="module" on script tag](#41-typemodule-on-script-tag)
   - [Top-level await — no async wrapper needed](#42-top-level-await--no-async-wrapper-needed)
   - [How top-level await works](#43-how-top-level-await-works)
5. [try/catch — Error Handling for async/await](#5-trycatch--error-handling-for-asyncawait)
   - [Basic try/catch syntax](#51-basic-trycatch-syntax)
   - [Fallback on error](#52-fallback-on-error)
   - [res.ok + throw Error() — HTTP error handling](#53-resok--throw-error--http-error-handling)
6. [Three Parallel API Calls](#6-three-parallel-api-calls)
   - [Unsplash API — Random background photo](#61-unsplash-api--random-background-photo)
   - [CoinGecko API — Dogecoin live price](#62-coingecko-api--dogecoin-live-price)
   - [OpenWeatherMap API — Current weather by location](#63-openweathermap-api--current-weather-by-location)
7. [document.body.style — Inline Style via JavaScript](#7-documentbodystyle--inline-style-via-javascript)
   - [Setting backgroundImage inline](#71-setting-backgroundimage-inline)
   - [Inline style vs CSS class](#72-inline-style-vs-css-class)
8. [setInterval — Repeated Execution](#8-setinterval--repeated-execution)
   - [Syntax and behaviour](#81-syntax-and-behaviour)
   - [Date object and toLocaleTimeString](#82-date-object-and-tolocaletimestring)
   - [timeStyle: "short"](#83-timestyle-short)
9. [Geolocation API — navigator.geolocation](#9-geolocation-api--navigatorgeolocation)
   - [getCurrentPosition()](#91-getcurrentposition)
   - [position.coords.latitude and longitude](#92-positioncoordlatitude-and-longitude)
   - [async callback inside getCurrentPosition](#93-async-callback-inside-getcurrentposition)
   - [Geolocation and HTTPS](#94-geolocation-and-https)
10. [Math.round() — Rounding Temperature](#10-mathround--rounding-temperature)
11. [innerHTML += — Appending HTML](#11-innerhtml---appending-html)
    - [Why += instead of =](#111-why--instead-of-)
    - [Interaction with crypto-top](#112-interaction-with-crypto-top)
12. [CSS Concepts](#12-css-concepts)
    - [background shorthand for dynamic images](#121-background-shorthand-for-dynamic-images)
    - [background-size: cover on body](#122-background-size-cover-on-body)
    - [text-shadow for legibility over photos](#123-text-shadow-for-legibility-over-photos)
    - [flex-wrap: wrap](#124-flex-wrap-wrap)
    - [justify-content: flex-end](#125-justify-content-flex-end)
    - [align-self: flex-start on a nested item](#126-align-self-flex-start-on-a-nested-item)
    - [margin-top: -20px — negative margin](#127-margin-top--20px--negative-margin)
    - [width: 100% inside flex-wrap](#128-width-100-inside-flex-wrap)
    - [Child combinator in CSS — div#crypto > p](#129-child-combinator-in-css--divcrypto--p)
    - [h1.time — element + class selector](#1210-h1time--element--class-selector)
13. [Chrome Extension — manifest.json](#13-chrome-extension--manifestjson)
    - [What manifest.json is](#131-what-manifestjson-is)
    - [manifest_version: 3](#132-manifest_version-3)
    - [chrome_url_overrides: newtab](#133-chrome_url_overrides-newtab)
    - [How to load as a Chrome Extension](#134-how-to-load-as-a-chrome-extension)
14. [HTML Structure Recap](#14-html-structure-recap)
15. [How the App Loads — Execution Order](#15-how-the-app-loads--execution-order)
16. [How to Run](#16-how-to-run)
17. [Course Reference](#17-course-reference)

---

# 1. Project Overview

**Personal Dashboard** is a browser new-tab replacement that displays four live data sources on a single, full-screen page:

| Widget | API | Data |
|--------|-----|------|
| Background photo | Unsplash (via Scrimba proxy) | Random landscape nature photo; updates each load |
| Photo credit | Unsplash | Photographer's name displayed bottom-left |
| Crypto panel | CoinGecko | Dogecoin name, icon, current price, 24h high, 24h low |
| Live clock | JavaScript `Date` | Current time, formatted short, updated every second |
| Weather panel | OpenWeatherMap (via Scrimba proxy) | Weather icon, current temperature (°F), city name — using device GPS |

The page is designed to work as a **Google Chrome Extension** — replacing the new-tab page via `chrome_url_overrides` in `manifest.json`. The `<script type="module">` tag enables top-level `await` so all three API fetches run sequentially at the top of the file with no `async` function wrapper.

---

# 2. Project Structure

```
07. APIs and Async JavaScript/
│
└── 06. Capstone Project/
    ├── index.html       → Minimal: main > top row (crypto + weather), h1 clock, author p
    ├── index.css        → Full-screen background, flex layout, weather/crypto widget styles
    ├── index.js         → Three try/catch API blocks + setInterval clock + geolocation
    ├── manifest.json    → Chrome Extension v3 manifest — overrides new tab
    └── icon.png         → Extension icon (16×16 PNG shown in Chrome toolbar)
```

---

# 3. What's New vs Async JavaScript (War)

## New JavaScript Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `type="module"` on `<script>` | `<script src="index.js" type="module">` | Enables ES Module mode — required for top-level `await` |
| Top-level `await` | `const res = await fetch(...)` at script root, outside any function | Pauses module execution without needing an `async` wrapper function |
| `try { } catch (err) { }` | All three API blocks + weather callback | Catches any error thrown (network failure, bad status, parse error) and runs fallback code |
| `res.ok` check | Crypto and weather fetches | `false` when HTTP status is 4xx or 5xx — `fetch()` alone does not throw on bad status |
| `throw Error("message")` | `if (!res.ok) { throw Error(...) }` | Manually creates and throws an Error object to trigger the `catch` block |
| `setInterval(fn, ms)` | `setInterval(getCurrentTime, 1000)` | Calls a function repeatedly at a fixed interval (1000ms = 1 second) |
| `new Date()` | `const date = new Date()` | Creates a Date object representing the current moment |
| `date.toLocaleTimeString()` | `date.toLocaleTimeString("en-us", { timeStyle: "short" })` | Formats the Date as a locale-aware time string |
| `navigator.geolocation` | `navigator.geolocation.getCurrentPosition(callback)` | Browser Geolocation API — requests the device's GPS/network location |
| `getCurrentPosition(callback)` | Wraps the weather fetch | Async, callback-based API that provides `position.coords.latitude` and `longitude` |
| `position.coords.latitude` / `.longitude` | Inside weather fetch URL | GPS coordinates used as query parameters for the weather API |
| `async` callback in `getCurrentPosition` | `getCurrentPosition(async position => { ... })` | Enables `await` inside the geolocation callback |
| `document.body.style.backgroundImage` | After Unsplash fetch | Sets a CSS `background-image` property as an inline style from JavaScript |
| Template literal URL with coords | `` `...?lat=${position.coords.latitude}&lon=...` `` | Injects GPS coordinates into the API URL |
| `data.weather[0].icon` | Weather response | Accesses the first element of the weather array for the icon code |
| `Math.round()` | `Math.round(data.main.temp)` | Rounds a floating-point temperature to the nearest integer |
| `innerHTML +=` | Crypto price block | Appends HTML to existing content instead of replacing it |
| `${data.market_data.current_price.usd}` | Crypto price | Accesses a deeply nested JSON property |
| `manifest.json` | Chrome Extension config | Defines the extension metadata and overrides the new-tab page |
| `chrome_url_overrides: { newtab: "index.html" }` | `manifest.json` | Replaces Chrome's new-tab page with the dashboard |

## New CSS Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `background: no-repeat center center fixed` shorthand | `body` | Prepares the background for a dynamically set image via JS |
| `background-size: cover` | `body` | Scales the background image to fill the viewport with no gaps |
| `text-shadow: 0px 0px 20px #242424` | `body` | Adds a dark halo behind all text for legibility over any photo |
| `flex-wrap: wrap` | `div#weather` | Allows flex children to wrap onto the next row when they overflow |
| `justify-content: flex-end` | `div#weather` | Aligns weather content to the right of the flex container |
| `margin-top: -20px` | `div#weather` | Pulls the weather panel up slightly — negative margin as a fine-tuning tool |
| `width: 100%` on a flex child `p.weather-city` | Forces the city name onto its own line inside the flex-wrap layout |
| `margin-left: -10px` | `p.weather-temp` | Pulls temperature text closer to the weather icon |
| `h1.time` | Element + class selector | Targets the `<h1>` specifically (not any element with class `time`) |

## Concepts Carried Over ↩

| Concept | Used Again |
|---------|-----------|
| `async/await` | Weather fetch inside geolocation callback |
| `await fetch()` + `await res.json()` | All three API blocks |
| `innerHTML` | Crypto and weather panels |
| `textContent` | Clock, author credit |
| Template literals | All dynamic strings |
| `display: flex; flex-direction: column; justify-content: space-between` | `main` — page layout |
| `height: 100vh` | `main` |
| `color: white` | All text |
| `box-sizing: border-box` universal reset | `*` selector |
| Child combinator `>` | `div#crypto > p`, `div#crypto-top > span` |

---

# 4. ES Modules and Top-Level `await`

## 4.1 `type="module"` on script tag

```html
<script src="index.js" type="module"></script>
```

Adding `type="module"` to a `<script>` tag switches JavaScript from **classic script mode** to **ES Module mode**. This has several effects:

| Behaviour | Classic `<script>` | `type="module"` |
|-----------|-------------------|----------------|
| Top-level `await` | ❌ SyntaxError | ✅ Allowed |
| `import` / `export` | ❌ Not available | ✅ Available |
| Scope | Global (`window`) | Module scope — variables are not global |
| Strict mode | Optional | Always strict |
| Execution timing | Synchronous, blocks parsing | Deferred — runs after HTML is parsed (like `defer`) |
| CORS | Not enforced | Enforced — must be served over HTTP/HTTPS for cross-origin imports |

In this project, `type="module"` is used specifically to enable **top-level `await`**.

## 4.2 Top-level `await` — no `async` wrapper needed

```javascript
// Top of index.js — no "async function" wrapper:
try {
    const res  = await fetch("https://apis.scrimba.com/unsplash/photos/random?...")
    const data = await res.json()
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("author").textContent = `By: ${data.user.name}`
} catch (err) {
    // fallback
}
```

In ES Modules, `await` can be used directly at the top level of the file — outside any `async` function. This was not possible in classic scripts (it would throw a SyntaxError). The entire module acts as an implicit `async` function.

Compare to the War project, where every `await` had to be inside an `async function handleClick()` or `async () =>`. Here, no such wrapper is needed.

## 4.3 How top-level `await` works

When a module with top-level `await` is loaded:
1. The browser starts executing the module top-to-bottom
2. When it hits the first `await`, it pauses **the module's execution** and suspends
3. Other scripts / the browser's event loop continue running
4. When the awaited Promise resolves, the module resumes from where it paused

```
Module starts executing
    ↓
await fetch(unsplash URL)  ← module suspends here
    ↓  (network request in flight — browser continues)
Response arrives → module resumes
    ↓
await res.json()           ← module suspends again
    ↓  (body parsing — browser continues)
Parsing done → module resumes
    ↓
DOM updated (background, author)
    ↓
await fetch(coingecko URL) ← module suspends again
    ...and so on
```

The three API blocks run **sequentially** — the Unsplash fetch completes before the CoinGecko fetch starts. `setInterval` and `navigator.geolocation.getCurrentPosition` are **non-blocking** — they run in parallel with the sequential await blocks and do not pause the module.

---

# 5. `try/catch` — Error Handling for `async/await`

## 5.1 Basic `try/catch` syntax

```javascript
try {
    const res  = await fetch(url)
    const data = await res.json()
    // use data
} catch (err) {
    // runs if any line inside try throws an error
    console.error(err)
}
```

`try/catch` is the error handling mechanism for `async/await`. Any error thrown inside the `try` block — from a network failure, a failed `await`, a bad property access, or a manual `throw` — jumps immediately to the `catch` block. `err` is the caught Error object.

Without `try/catch`, an unhandled rejection in a top-level `await` would stop module execution entirely and show an error in the console.

| Situation | Without try/catch | With try/catch |
|-----------|------------------|---------------|
| Network failure | Module crashes, nothing renders | `catch` runs fallback |
| API returns 404 | `res.ok` is `false` — data may be garbage | `throw` triggers `catch` |
| JSON parse error | Module crashes | `catch` runs fallback |

## 5.2 Fallback on error

```javascript
try {
    const res  = await fetch("https://apis.scrimba.com/unsplash/...")
    const data = await res.json()
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("author").textContent = `By: ${data.user.name}`
} catch (err) {
    // Fallback: hardcoded Unsplash image URL and known author
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511...)`
    document.getElementById("author").textContent = `By: Dodi Achmad`
}
```

The Unsplash `catch` block provides a **graceful fallback** — a hardcoded image URL and author name. The user still sees a functional, styled dashboard even when the API is unreachable.

This is the correct production pattern: every API call that affects visible UI should have a fallback so users never see a broken layout.

## 5.3 `res.ok` + `throw Error()` — HTTP error handling

```javascript
try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    if (!res.ok) {
        throw Error("Something went wrong")
    }
    const data = await res.json()
    // ...
} catch (err) {
    console.error(err)
}
```

`fetch()` only rejects (throws) on **network-level failures** — no internet connection, DNS failure, etc. A server responding with `404 Not Found` or `500 Internal Server Error` still **fulfils** the Promise — `fetch()` considers the transaction complete.

`res.ok` is `true` if the HTTP status code is in the 200–299 range, `false` otherwise.

```javascript
if (!res.ok) {
    throw Error("Something went wrong")
}
```

Manually throwing an Error object inside `try` causes the `catch` block to run — exactly as if a network failure had occurred. This bridges the gap between HTTP-level errors (caught by `res.ok`) and JS-level errors (caught by `try/catch`).

```
fetch() resolves for ALL responses (2xx, 4xx, 5xx)
    └── res.ok === false (e.g. 429 Too Many Requests)
            └── throw Error(...)    ← manually trigger catch
                    └── catch (err) { console.error(err) }

fetch() rejects ONLY for network errors
    └── catch (err) fires automatically
```

---

# 6. Three Parallel API Calls

The three API calls run sequentially (due to top-level `await`) but are logically independent — each populates a different part of the UI.

## 6.1 Unsplash API — Random background photo

```javascript
const res  = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
const data = await res.json()
document.body.style.backgroundImage = `url(${data.urls.regular})`
document.getElementById("author").textContent = `By: ${data.user.name}`
```

**Endpoint:** `GET /photos/random` — returns a random photo matching the filters.

**Query parameters used:**

| Parameter | Value | Effect |
|-----------|-------|--------|
| `orientation` | `landscape` | Only return landscape-oriented photos |
| `query` | `nature` | Only return nature-themed photos |

**Response properties used:**

| Property | Type | Content |
|----------|------|---------|
| `data.urls.regular` | string | URL of the photo at regular (1080px) resolution |
| `data.user.name` | string | The photographer's full name |

The Scrimba proxy (`apis.scrimba.com/unsplash/`) wraps the official Unsplash API — eliminating the need for an API key in the course exercise.

## 6.2 CoinGecko API — Dogecoin live price

```javascript
const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
if (!res.ok) { throw Error("Something went wrong") }
const data = await res.json()

document.getElementById("crypto-top").innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>
`
document.getElementById("crypto").innerHTML += `
    <p>🎯: $${data.market_data.current_price.usd}</p>
    <p>👆: $${data.market_data.high_24h.usd}</p>
    <p>👇: $${data.market_data.low_24h.usd}</p>`
```

**Endpoint:** `GET /coins/dogecoin` — returns comprehensive data for the Dogecoin cryptocurrency.

**Response properties used:**

| Property | Type | Content |
|----------|------|---------|
| `data.image.small` | string | URL of the Dogecoin icon (small size) |
| `data.name` | string | `"Dogecoin"` |
| `data.market_data.current_price.usd` | number | Current price in USD |
| `data.market_data.high_24h.usd` | number | 24-hour high price in USD |
| `data.market_data.low_24h.usd` | number | 24-hour low price in USD |

`data.market_data.current_price.usd` is an example of **deeply nested property access** — three levels deep. Each `.` accesses the next level of the object tree.

> **Note:** The CoinGecko free API has rate limits — repeated calls within a short period return `429 Too Many Requests`. The `res.ok` check + `throw Error()` handles this gracefully.

## 6.3 OpenWeatherMap API — Current weather by location

```javascript
navigator.geolocation.getCurrentPosition(async position => {
    try {
        const res = await fetch(
            `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
        )
        if (!res.ok) { throw Error("Weather data not available") }
        const data = await res.json()
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `
    } catch (err) {
        console.error(err)
    }
})
```

**Endpoint:** `GET /data/2.5/weather` — returns current weather for a given latitude/longitude.

**Query parameters:**

| Parameter | Source | Value |
|-----------|--------|-------|
| `lat` | `position.coords.latitude` | Device GPS latitude |
| `lon` | `position.coords.longitude` | Device GPS longitude |
| `units` | Hardcoded | `imperial` — temperatures in °F |

**Response properties used:**

| Property | Type | Content |
|----------|------|---------|
| `data.weather[0].icon` | string | Icon code (e.g. `"10d"`) — used to build the icon URL |
| `data.main.temp` | number | Current temperature in °F (floating point) |
| `data.name` | string | City name (e.g. `"London"`) |

**Icon URL construction:**
```javascript
const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
```

The OpenWeatherMap icon system uses a code like `"10d"` (10 = rain, d = daytime). Appending `@2x.png` requests the 2× resolution (retina) version. The icon URL is assembled from the code and then inserted into an `<img>` tag.

---

# 7. `document.body.style` — Inline Style via JavaScript

## 7.1 Setting `backgroundImage` inline

```javascript
document.body.style.backgroundImage = `url(${data.urls.regular})`
```

`element.style` is the **CSSStyleDeclaration** object representing the element's inline styles. Setting properties on it adds `style="..."` directly to the HTML element — equivalent to:
```html
<body style="background-image: url(https://...);">
```

CSS property names that contain hyphens (`background-image`) are written in **camelCase** (`backgroundImage`) when accessed via JavaScript:

| CSS property | `element.style` property |
|-------------|------------------------|
| `background-image` | `backgroundImage` |
| `font-size` | `fontSize` |
| `border-top-radius` | `borderTopRadius` |
| `z-index` | `zIndex` |

## 7.2 Inline style vs CSS class

Inline styles set via `element.style` have the **highest specificity** — they override any class or ID selectors in stylesheets (except `!important`). They are appropriate here because the value is **dynamic** — it changes every page load based on the API response and cannot be predefined in a stylesheet.

The CSS on `body` pre-configures how the background image will behave once it is set:
```css
body {
    background: no-repeat center center fixed;
    background-size: cover;
}
```

The `background` shorthand sets `repeat`, `position`, and `attachment` — but not `background-image` (that would require a hardcoded URL). JavaScript then sets `backgroundImage` dynamically at runtime.

---

# 8. `setInterval` — Repeated Execution

## 8.1 Syntax and behaviour

```javascript
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)
```

`setInterval(callback, delay)` calls `callback` repeatedly, once every `delay` milliseconds. It is **non-blocking** — it schedules the callback on the event loop without pausing any other code.

| Function | Behaviour |
|----------|-----------|
| `setTimeout(fn, ms)` | Calls `fn` once after `ms` milliseconds |
| `setInterval(fn, ms)` | Calls `fn` every `ms` milliseconds until cancelled |
| `clearInterval(id)` | Cancels a running `setInterval` — `setInterval` returns an ID for this |

`setInterval(getCurrentTime, 1000)` starts the clock — `getCurrentTime` fires immediately after the first 1000ms delay, then every 1000ms thereafter. The clock updates once per second.

> `setInterval(getCurrentTime, 1000)` passes the **function reference** — no `()`. Writing `setInterval(getCurrentTime(), 1000)` would call the function immediately, pass its return value (`undefined`) to `setInterval`, and never repeat.

## 8.2 `Date` object and `toLocaleTimeString`

```javascript
const date = new Date()
```

`new Date()` creates a Date object representing the **current moment** in time (the moment the line executes). Since this runs inside `setInterval`, a fresh Date is created every second — always reflecting the current time.

```javascript
date.toLocaleTimeString("en-us", { timeStyle: "short" })
```

`toLocaleTimeString(locale, options)` formats the Date's time component as a localised string.

| Parameter | Value | Effect |
|-----------|-------|--------|
| `locale` | `"en-us"` | US English time format (12-hour with AM/PM) |
| `timeStyle` | `"short"` | Shows hours and minutes only — e.g. `"9:41 AM"` |

| `timeStyle` value | Example output |
|------------------|---------------|
| `"short"` | `9:41 AM` |
| `"medium"` | `9:41:07 AM` |
| `"long"` | `9:41:07 AM GMT+5:30` |
| `"full"` | `9:41:07 AM India Standard Time` |

## 8.3 `timeStyle: "short"`

`timeStyle: "short"` displays hours and minutes only — no seconds. Combined with a 1-second update interval, the displayed time changes every time the minute flips. For a dashboard clock, minute-level precision is appropriate (second-level display would require `timeStyle: "medium"`).

---

# 9. Geolocation API — `navigator.geolocation`

## 9.1 `getCurrentPosition()`

```javascript
navigator.geolocation.getCurrentPosition(async position => {
    // position is available here
})
```

`navigator.geolocation` is a built-in **Browser API** — not a web service, but a capability of the browser itself. `getCurrentPosition(successCallback, errorCallback)` asynchronously requests the device's physical location (via GPS, Wi-Fi triangulation, or IP geolocation) and calls `successCallback` with the result.

It is **callback-based** (not Promise-based) — you cannot `await` it directly. The callback fires when the location is available (after the user grants permission).

| Browser Geolocation Method | Description |
|--------------------------|-------------|
| `getCurrentPosition(cb)` | One-time location fix |
| `watchPosition(cb)` | Continuous updates as device moves |
| `clearWatch(id)` | Stops a `watchPosition` |

## 9.2 `position.coords.latitude` and `.longitude`

```javascript
navigator.geolocation.getCurrentPosition(async position => {
    const res = await fetch(
        `...?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
    )
})
```

The `position` object passed to the callback has a `coords` property:

| Property | Type | Example |
|----------|------|---------|
| `position.coords.latitude` | number | `51.5074` (London) |
| `position.coords.longitude` | number | `-0.1278` (London) |
| `position.coords.accuracy` | number | `65` (metres) |
| `position.coords.altitude` | number or null | `null` if unavailable |

These numbers are interpolated into the OpenWeatherMap API URL as query parameters, requesting weather data for the user's exact location.

## 9.3 `async` callback inside `getCurrentPosition`

```javascript
navigator.geolocation.getCurrentPosition(async position => {
    try {
        const res  = await fetch(`...?lat=${position.coords.latitude}&lon=...`)
        const data = await res.json()
        // ...
    } catch (err) {
        console.error(err)
    }
})
```

`getCurrentPosition` accepts any function as a callback — including an `async` arrow function. Marking the callback `async` allows `await` to be used inside it. This is the same pattern as the `async () =>` event listeners in the War project.

The `try/catch` is placed inside the callback because the callback itself is the `async` context — errors from the `await` calls propagate to the nearest `try/catch` within the same `async` scope.

## 9.4 Geolocation and HTTPS

The Geolocation API only works in **secure contexts** (HTTPS) in modern browsers. It also requires explicit **user permission** — the browser shows a permission prompt the first time a page requests location. If the user denies it, `getCurrentPosition`'s error callback fires (not implemented in this project, so denial is silent — the weather panel simply stays empty).

When loaded as a Chrome Extension, the extension origin is treated as a secure context — geolocation works without a server.

---

# 10. `Math.round()` — Rounding Temperature

```javascript
<p class="weather-temp">${Math.round(data.main.temp)}º</p>
```

`Math.round(number)` rounds a floating-point number to the nearest integer:

| Input | `Math.round()` |
|-------|---------------|
| `72.3` | `72` |
| `72.7` | `73` |
| `72.5` | `73` (rounds up at exactly .5) |
| `-72.5` | `-72` (rounds toward positive infinity at .5) |

The OpenWeatherMap API returns temperatures as floating-point numbers (`72.36°F`). `Math.round` provides a cleaner integer display (`72°`) appropriate for a dashboard widget.

Other `Math` rounding methods:

| Method | Behaviour | `72.7` → | `72.3` → |
|--------|-----------|---------|---------|
| `Math.round(n)` | Nearest integer | `73` | `72` |
| `Math.floor(n)` | Always rounds down | `72` | `72` |
| `Math.ceil(n)` | Always rounds up | `73` | `73` |
| `Math.trunc(n)` | Removes decimal part | `72` | `72` |

---

# 11. `innerHTML +=` — Appending HTML

## 11.1 Why `+=` instead of `=`

```javascript
// First write: sets #crypto-top content (name + icon)
document.getElementById("crypto-top").innerHTML = `
    <img src=${data.image.small} />
    <span>${data.name}</span>
`

// Second write: APPENDS price data to #crypto (which contains #crypto-top)
document.getElementById("crypto").innerHTML += `
    <p>🎯: $${data.market_data.current_price.usd}</p>
    <p>👆: $${data.market_data.high_24h.usd}</p>
    <p>👇: $${data.market_data.low_24h.usd}</p>`
```

`innerHTML +=` is equivalent to:
```javascript
element.innerHTML = element.innerHTML + newContent
```

It **reads** the current HTML string, **concatenates** the new content, and **writes** the result back. The existing child elements (`#crypto-top` with the icon and name) are preserved.

## 11.2 Interaction with `crypto-top`

The HTML structure of `#crypto`:
```
div#crypto
├── div#crypto-top   ← set first with innerHTML =
│   ├── img (icon)
│   └── span (name)
├── p (current price) ← appended after with innerHTML +=
├── p (24h high)
└── p (24h low)
```

If `innerHTML =` were used for the price block instead of `+=`, it would **replace** the entire content of `#crypto`, destroying the `#crypto-top` with the icon and name. `+=` preserves what is already there and adds to it.

> **Performance note:** `innerHTML +=` forces the browser to re-parse and re-render the entire element. For frequent updates or large lists this is expensive — but for a once-on-load dashboard widget it is perfectly acceptable.

---

# 12. CSS Concepts

## 12.1 `background` shorthand for dynamic images

```css
body {
    background: no-repeat center center fixed;
    background-size: cover;
}
```

`background` shorthand can set multiple background sub-properties at once without specifying `background-image`. Here it configures:

| Sub-property | Value | Effect |
|-------------|-------|--------|
| `background-repeat` | `no-repeat` | Image does not tile |
| `background-position` | `center center` | Image is centred horizontally and vertically |
| `background-attachment` | `fixed` | Image stays fixed as the page scrolls (parallax effect) |

`background-image` is intentionally omitted — JavaScript sets it later via `document.body.style.backgroundImage`. The other properties are ready and waiting for when the image URL arrives.

## 12.2 `background-size: cover` on `body`

```css
background-size: cover;
```

Scales the background image to **cover the entire element** — the image is scaled proportionally until it fills the element in both dimensions. Any excess is clipped. The image is never distorted. Declared separately (not in the shorthand) because `cover` would conflict with the shorthand's positional values.

## 12.3 `text-shadow` for legibility over photos

```css
body {
    text-shadow: 0px 0px 20px #242424;
}
```

`text-shadow: x y blur color` adds a shadow behind all text in the body. With `0px 0px` offsets, the shadow has no directional shift — it creates a **dark glow** around the text characters. `20px` blur spreads this glow widely, creating a soft dark halo.

Since the background photo changes every load (and could be light or dark), this halo ensures all white text remains legible against any photo — without knowing the photo's colours in advance.

This is a more robust alternative to `backdrop-filter: brightness()` or a semi-transparent overlay — it works at the text level.

## 12.4 `flex-wrap: wrap`

```css
div#weather {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
}
```

`flex-wrap: wrap` allows flex children to **wrap onto a new row** when they would overflow the container. Without it, all children shrink or overflow on a single row. With it, items that don't fit wrap to the next line.

The weather widget has three children: `<img>` (icon), `<p class="weather-temp">` (temperature), and `<p class="weather-city">` (city name). The city paragraph has `width: 100%` — it always occupies a full row by itself, forcing it to wrap beneath the icon + temperature:

```
┌────────────────────────────────┐
│ [☁️ icon]   [72º]             │  ← img + .weather-temp on first row
│                       London   │  ← .weather-city (width:100%, own row)
└────────────────────────────────┘
```

## 12.5 `justify-content: flex-end`

```css
div#weather {
    justify-content: flex-end;
}
```

`justify-content: flex-end` aligns items to the **end of the main axis**. In a `flex-direction: row` container (the default), this is the right edge. The weather panel is right-aligned in the `.top` row — contrasting with the left-aligned crypto panel, using `justify-content: space-between` on `.top`.

## 12.6 `align-self: flex-start` on a nested item

```css
div#weather {
    align-self: flex-start;
}
```

`div#weather` is a flex item inside `div.top`. `div.top` has `display: flex` with the default `align-items: stretch` — children stretch to fill the cross-axis height. `align-self: flex-start` on `#weather` overrides this, making the weather widget only as tall as its content instead of stretching.

## 12.7 `margin-top: -20px` — negative margin

```css
div#weather {
    margin-top: -20px;
}
```

A **negative margin** pulls an element towards its preceding sibling (or the container edge), overlapping content. Here it fine-tunes the vertical position of the weather panel — raising it slightly upward. Unlike `position: relative` with a `top` offset, negative `margin-top` **affects the layout flow** — surrounding elements shift accordingly.

Negative margins are a valid (if unusual) CSS tool for micro-adjustments. They should be used sparingly and only when `padding` or `gap` adjustments on the parent are not sufficient.

## 12.8 `width: 100%` inside `flex-wrap`

```css
p.weather-city {
    width: 100%;
    text-align: right;
}
```

Inside a `flex-wrap: wrap` container, a child with `width: 100%` occupies an entire row — nothing else can fit beside it, forcing it to its own line. This is a common technique for creating a **2-line flex layout**: icon + temperature on line 1, city name spanning the full width on line 2.

## 12.9 Child combinator in CSS — `div#crypto > p`

```css
div#crypto > p {
    margin: 0;
}
```

`div#crypto > p` selects `<p>` elements that are **direct children** of `div#crypto`. The price paragraphs are direct children — the `margin: 0` removes browser-default paragraph margins to keep the crypto widget compact.

`<p>` elements nested deeper (e.g. inside `#crypto-top`) are unaffected.

## 12.10 `h1.time` — element + class selector

```css
h1.time {
    text-align: center;
    font-size: 5rem;
}
```

`h1.time` matches a `<h1>` element that also has `class="time"`. This is more specific than `.time` alone — it documents that this style is specifically for the clock heading and prevents accidental application to other elements with class `time`.

`5rem` at the browser default of 16px = `80px` — a large, prominent clock display appropriate for a dashboard. `text-align: center` centres it in the flex column.

---

# 13. Chrome Extension — `manifest.json`

## 13.1 What `manifest.json` is

```json
{
    "manifest_version": 3,
    "name": "Personal Dashboard",
    "version": "1.0.0",
    "description": "Just for practicing async JS",
    "action": {
        "default_icon": "icon.png"
    },
    "chrome_url_overrides": {
        "newtab": "index.html"
    }
}
```

`manifest.json` is the **configuration file required by every Chrome Extension**. It tells Chrome what the extension is called, what it does, and what permissions it needs. Without `manifest.json`, a folder of web files is just a folder — with it, Chrome can install and run it as an extension.

## 13.2 `manifest_version: 3`

Chrome Extensions use a versioned manifest format. **Manifest V3** (MV3) is the current standard (introduced 2021, MV2 deprecated). MV3 has stricter security rules, uses Service Workers instead of background pages, and restricts certain APIs.

| Field | Value | Meaning |
|-------|-------|---------|
| `manifest_version` | `3` | Uses Chrome's Manifest V3 API |
| `name` | `"Personal Dashboard"` | Display name in `chrome://extensions` |
| `version` | `"1.0.0"` | Extension version (semver) |
| `description` | `"Just for practicing async JS"` | Shown in the Chrome Web Store |
| `action.default_icon` | `"icon.png"` | Icon shown in the Chrome toolbar |

## 13.3 `chrome_url_overrides: newtab`

```json
"chrome_url_overrides": {
    "newtab": "index.html"
}
```

`chrome_url_overrides` lets an extension replace Chrome's built-in pages. `"newtab": "index.html"` replaces the new-tab page (`chrome://newtab`) with the extension's `index.html`. When the user opens a new tab, they see the Personal Dashboard instead of Chrome's default search/speed-dial page.

| Override key | Replaces |
|-------------|---------|
| `newtab` | New tab page |
| `bookmarks` | Chrome's bookmarks manager |
| `history` | Chrome's history page |

## 13.4 How to load as a Chrome Extension

To install the dashboard as a Chrome Extension locally:

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in the top right)
3. Click **Load unpacked**
4. Select the `06. Capstone Project` folder
5. Open a new tab — the Personal Dashboard appears

The extension will request location permission on first load (for the weather widget). After granting, weather data populates automatically.

> The extension only needs to be re-loaded in `chrome://extensions` when `manifest.json` changes. Changes to `index.html`, `index.js`, or `index.css` are reflected immediately on the next new tab open.

---

# 14. HTML Structure Recap

```html
<html>
  <head>
    <meta charset="UTF-8">
    <link> → index.css
    <title>Personal Dashboard</title>
  </head>
  <body>                                      ← background-image set by JS
    <main>                                    ← flex column, space-between, 100vh
      <div class="top">                       ← flex row, space-between
        <div id="crypto">                     ← left: crypto widget
          <div id="crypto-top"></div>         ← icon + name (set first)
          <!-- p tags appended by JS: price, 24h high, 24h low -->
        </div>
        <div id="weather"></div>             ← right: icon + temp + city (set by JS)
      </div>

      <h1 id="time" class="time"></h1>        ← centre: live clock (setInterval)

      <p id="author"></p>                     ← bottom-left: photo credit
    </main>
    <script src="index.js" type="module"></script>
  </body>
</html>
```

### Notable observations

| Observation | Explanation |
|-------------|-------------|
| `type="module"` on script | Enables top-level `await` — the project's key new concept |
| `<meta charset="UTF-8">` | Declares UTF-8 encoding — handles the emoji `🎯 👆 👇 º` correctly |
| `<h1>` used for the clock | Semantically questionable (not a heading) but prioritises visual impact |
| All content divs start empty | JS populates all widgets after APIs respond |
| No `<meta name="viewport">` | Missing — same gap as other projects in this module |
| No Google Fonts | Uses system `Arial, Helvetica, sans-serif` — the only project in the module that does |

---

# 15. How the App Loads — Execution Order

Because the script is a module with top-level `await`, the three API calls run sequentially, but `setInterval` and `geolocation` run concurrently:

```
Module begins executing (deferred — DOM already parsed)
    │
    ├─► try { await fetch(Unsplash) }              ← PAUSES ~200–500ms
    │       → body.style.backgroundImage = url
    │       → #author.textContent = "By: ..."
    │
    ├─► try { await fetch(CoinGecko) }             ← PAUSES ~300–800ms
    │       → #crypto-top.innerHTML = icon + name
    │       → #crypto.innerHTML += prices
    │
    ├─► setInterval(getCurrentTime, 1000)          ← non-blocking: schedules clock
    │       → clock starts ticking every 1 second
    │
    └─► navigator.geolocation.getCurrentPosition(...)  ← non-blocking: requests GPS
            → browser shows permission prompt
            → user grants permission
            → async position => { ... } fires
                → await fetch(OpenWeatherMap)      ← PAUSES ~200–500ms
                → #weather.innerHTML = icon + temp + city

Total time to fully loaded: typically 1–2 seconds on good connection
```

The clock starts immediately when `setInterval` is registered. The weather panel appears asynchronously — it depends on both the API response AND the user granting geolocation permission, so its timing is unpredictable.

---

# 16. How to Run

### Option A — Browser (direct file open)

```bash
git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
cd "07. APIs and Async JavaScript/06. Capstone Project"
```

Open `index.html` in a browser. Because `type="module"` is used, the file **cannot** be opened as `file://` directly — ES Modules enforce CORS and require an HTTP server.

Use VS Code's **Live Server** extension, or:
```bash
npx serve .
```
Then open `http://localhost:3000` (or whichever port is shown).

> **Geolocation** requires a secure context (HTTPS) or `localhost`. Live Server at `http://localhost` works for geolocation.

### Option B — Chrome Extension (recommended)

1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select the `06. Capstone Project` folder
4. Open a new tab

**Things to try:**
- Open DevTools → **Network** tab — watch all three API requests fire in sequence
- Disconnect your internet and reload — observe the Unsplash fallback image and author appear
- Try changing `query=nature` in the Unsplash URL to `query=city` or `query=space` for different themed backgrounds
- Change `"en-us"` in `toLocaleTimeString` to `"en-GB"` — the clock switches to 24-hour format
- Change `timeStyle: "short"` to `timeStyle: "medium"` — seconds appear
- Change `units=imperial` to `units=metric` in the weather URL — temperature shows in °C
- Change `dogecoin` in the CoinGecko URL to `bitcoin` — prices update to Bitcoin's data
- In DevTools Console: `navigator.geolocation.getCurrentPosition(p => console.log(p.coords))` — see your raw latitude/longitude

---

# 17. Course Reference

| Item | Detail |
|------|--------|
| Platform | [Scrimba](https://scrimba.com) |
| Course | Fullstack Web Development Path |
| Module | APIs and Async JavaScript |
| Project number | 06 of the module — Capstone |
| Key new concepts | `type="module"` · Top-level `await` · `try/catch` · `res.ok` + `throw Error()` · `setInterval` · `new Date()` · `toLocaleTimeString` · `navigator.geolocation.getCurrentPosition` · `position.coords.latitude/longitude` · `document.body.style.backgroundImage` · `Math.round()` · `innerHTML +=` · Deep property access · `background-size: cover` · `text-shadow` · `flex-wrap: wrap` · `justify-content: flex-end` · Negative margin · `manifest.json` Chrome Extension V3 |
| Previous project | [04. Async JavaScript](../04.%20Async%20JavaScript/README.md) |
| Unsplash API docs | [https://unsplash.com/documentation](https://unsplash.com/documentation) |
| CoinGecko API docs | [https://www.coingecko.com/en/api/documentation](https://www.coingecko.com/en/api/documentation) |
| OpenWeatherMap API docs | [https://openweathermap.org/api](https://openweathermap.org/api) |
| MDN — Top-level await | [MDN — Top-level await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#top_level_await) |
| MDN — try/catch | [MDN — try/catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) |
| MDN — setInterval | [MDN — setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) |
| MDN — Geolocation API | [MDN — Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) |
| Chrome — Manifest V3 | [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/) |

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *The Capstone is the moment all the pieces click together: `async/await` to manage time, `try/catch` to manage failure, three independent APIs each contributing one part of the experience, the Geolocation API bridging the digital and physical world, and `setInterval` giving the page a heartbeat. No framework, no library, no build tool — just JavaScript talking directly to the web. That is worth understanding before you reach for anything else.*
