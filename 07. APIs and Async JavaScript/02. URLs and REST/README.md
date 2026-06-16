# URLs and REST — APIs and Async JavaScript

![HTML](https://img.shields.io/badge/HTML-Structure-orange?style=flat-square&logo=html5)
![CSS](https://img.shields.io/badge/CSS-Styling-blue?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript)
![fetch](https://img.shields.io/badge/fetch-GET%20%7C%20POST-blueviolet?style=flat-square)
![REST](https://img.shields.io/badge/REST-API%20Design-teal?style=flat-square)
![JSON](https://img.shields.io/badge/JSON-Stringify%20%7C%20Parse-lightgrey?style=flat-square)
![JSONPlaceholder](https://img.shields.io/badge/API-JSONPlaceholder-orange?style=flat-square)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-Karla-red?style=flat-square&logo=googlefonts)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

**BlogSpace** — the **second project in the APIs and Async JavaScript module** from **Scrimba's Fullstack Web Development Path**.

This README is a **complete concept revision guide**. It explains every new concept introduced in this project beyond the `fetch()` basics from BoredBot — HTTP POST requests, request bodies, headers, `JSON.stringify()`, URL structure, REST API design principles, URL parameters, query strings, and the `e.preventDefault()` form pattern.

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [What's New vs Intro to APIs](#3-whats-new-vs-intro-to-apis)
4. [URL Anatomy](#4-url-anatomy)
   - [Protocol](#41-protocol)
   - [Domain](#42-domain)
   - [Path / Endpoint](#43-path--endpoint)
   - [URL Parameters](#44-url-parameters)
   - [Query Strings](#45-query-strings)
5. [REST API Design](#5-rest-api-design)
   - [What REST means](#51-what-rest-means)
   - [Resources and endpoints](#52-resources-and-endpoints)
   - [HTTP Methods as CRUD operations](#53-http-methods-as-crud-operations)
   - [The JSONPlaceholder API](#54-the-jsonplaceholder-api)
6. [HTTP GET — Fetching Posts on Load](#6-http-get--fetching-posts-on-load)
   - [Fetch at the top level — no event needed](#61-fetch-at-the-top-level--no-event-needed)
   - [Array.slice(0, 5)](#62-arrayslice0-5)
   - [renderPosts() — the render pattern](#63-renderposts--the-render-pattern)
7. [HTTP POST — Sending Data to the Server](#7-http-post--sending-data-to-the-server)
   - [The fetch options object](#71-the-fetch-options-object)
   - [method: "POST"](#72-method-post)
   - [body: JSON.stringify(data)](#73-body-jsonstringifydata)
   - [headers: Content-Type](#74-headers-content-type)
   - [What the server sends back](#75-what-the-server-sends-back)
8. [JSON.stringify() — Object to String](#8-jsonstringify--object-to-string)
   - [Why stringify is needed](#81-why-stringify-is-needed)
   - [JSON.stringify vs JSON.parse](#82-jsonstringify-vs-jsonparse)
9. [Request Headers](#9-request-headers)
   - [What headers are](#91-what-headers-are)
   - [Content-Type: application/json](#92-content-type-applicationjson)
   - [Common request headers](#93-common-request-headers)
10. [Form Handling — e.preventDefault()](#10-form-handling--epreventdefault)
    - [Default form submission behaviour](#101-default-form-submission-behaviour)
    - [e.preventDefault()](#102-epreventdefault)
    - [Reading input values](#103-reading-input-values)
    - [Clearing the form after submission](#104-clearing-the-form-after-submission)
11. [State Management — postsArray](#11-state-management--postsarray)
    - [Module-level state](#111-module-level-state)
    - [Mutating state and re-rendering](#112-mutating-state-and-re-rendering)
    - [Array.unshift() — prepending new posts](#113-arrayunshift--prepending-new-posts)
12. [The renderPosts() Function — Template Literal HTML](#12-the-renderposts-function--template-literal-html)
    - [for...of loop to build HTML strings](#121-forof-loop-to-build-html-strings)
    - [innerHTML — rendering the accumulated string](#122-innerhtml--rendering-the-accumulated-string)
13. [CSS Concepts — position: fixed Navigation](#13-css-concepts--position-fixed-navigation)
    - [position: fixed](#131-position-fixed)
    - [width: 100% on fixed elements](#132-width-100-on-fixed-elements)
    - [Form padding-top to clear the fixed nav](#133-form-padding-top-to-clear-the-fixed-nav)
    - [display: grid on form](#134-display-grid-on-form)
    - [Child selector nav > h3](#135-child-selector-nav--h3)
    - [ID selectors — input#post-title](#136-id-selectors--inputpost-title)
14. [HTML Structure Recap](#14-html-structure-recap)
15. [How the App Flow Works](#15-how-the-app-flow-works)
16. [How to Run](#16-how-to-run)
17. [Course Reference](#17-course-reference)

---

# 1. Project Overview

**BlogSpace** is a simple blog client that reads from and writes to a real REST API. On load, it fetches the first 5 posts from the JSONPlaceholder API and renders them as a list of title + body pairs. A fixed form at the top lets the user write a new post — on submission, the post is sent to the server via HTTP POST, the server's response is prepended to the local `postsArray`, and the list re-renders with the new post at the top.

Two distinct `fetch()` calls are made:
1. **GET** — on page load, reads existing posts from the server
2. **POST** — on form submit, sends new post data to the server

This project introduces everything needed to work with REST APIs bidirectionally: not just consuming data, but sending it.

---

# 2. Project Structure

```
07. APIs and Async JavaScript/
│
└── 02. URLs and REST/
    ├── index.html    → nav, form (title + body + button), blog-list div, script
    ├── index.css     → fixed nav, grid form, blog-list padding, button style
    └── index.js      → state array, GET fetch on load, POST fetch on submit,
                        renderPosts(), form.addEventListener
```

No images, no modules. The app communicates with the JSONPlaceholder API at `https://apis.scrimba.com/jsonplaceholder/posts`.

---

# 3. What's New vs Intro to APIs

## New JavaScript Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| HTTP POST request | `fetch(url, options)` with `method: "POST"` | Sends data to the server to create a new resource |
| `fetch()` options object | Second argument to `fetch()` | Configures the HTTP method, body, and headers |
| `method: "POST"` | Inside options | Tells fetch to use the POST HTTP verb instead of GET |
| `body: JSON.stringify(data)` | Inside options | The request body — the data being sent to the server, serialised as a JSON string |
| `JSON.stringify(obj)` | `JSON.stringify(data)` | Converts a JavaScript object into a JSON string for transmission |
| `headers` object | `{ "Content-Type": "application/json" }` | Metadata about the request — tells the server the body is JSON |
| `"Content-Type": "application/json"` | Inside headers | The MIME type of the request body |
| `e.preventDefault()` | `form.addEventListener("submit", function(e) { e.preventDefault() })` | Stops the browser's default form submit (page reload) |
| `Array.slice(0, 5)` | `data.slice(0, 5)` | Returns the first 5 elements of the array without modifying the original |
| `for...of` loop | `for (let post of postsArray)` | Iterates over array elements by value |
| Module-level state array | `let postsArray = []` | Persists data across renders without re-fetching |
| `Array.unshift(item)` | `postsArray.unshift(post)` | Prepends the new post to the front of the array |
| `form.reset()` (commented out) | `// form.reset()` | Would clear all form fields simultaneously — shown as an alternative |
| Top-level fetch (no event) | `fetch(url).then(...)` at script root | Runs on page load without needing a user interaction |
| `titleInput.value = ""` | Manually clearing inputs after submit | Resets individual input fields |
| URL structure | `https://apis.scrimba.com/jsonplaceholder/posts` | Protocol, domain, path discussed as endpoint concepts |
| REST API design | GET/POST on `/posts` | Resources, endpoints, CRUD mapping |
| URL parameters | `/posts/1` vs `/posts` | Targeting a specific resource vs a collection |
| Query strings | `?_limit=5&userId=1` | Filtering and limiting API results |

## New CSS Concepts

| Concept | Where Used | Purpose |
|---------|-----------|---------|
| `position: fixed` | `nav` | Keeps the nav bar pinned to the top of the viewport while the page scrolls |
| `width: 100%` on a fixed element | `nav` | Fixed elements are removed from flow — `width: 100%` must be set explicitly |
| `display: grid` on `<form>` | `form` | Stacks label–input pairs vertically without needing `display: block` on each |
| `padding-top: 60px` on form | `form { padding: 60px 10px 10px }` | Pushes form content below the `30px` fixed nav plus some breathing room |
| Child combinator `nav > h3` | `nav > h3 { margin: 0 }` | Targets only direct children — not `h3` elements nested deeper |
| ID attribute selector `input#post-title` | `input#post-title, textarea#post-body` | Combines element type + ID for higher specificity |

## Concepts Carried Over from Intro to APIs ↩

| Concept | Used Again In |
|---------|--------------|
| `fetch(url)` | GET fetch on load |
| `.then(res => res.json())` | Both fetch calls |
| `.then(data => { ... })` | Both fetch calls |
| `document.getElementById()` | `titleInput`, `bodyInput`, `form`, `blog-list` |
| Template literals in JS | `html += \`<h3>${post.title}</h3>\`` |
| `innerHTML` | `document.getElementById("blog-list").innerHTML = html` |
| `Array.unshift()` | `postsArray.unshift(post)` — same as Twimba |
| `addEventListener` | `form.addEventListener("submit", ...)` |
| Google Fonts CDN | Karla font |

---

# 4. URL Anatomy

The API endpoint used in this project is:
```
https://apis.scrimba.com/jsonplaceholder/posts
```

Every URL has up to five parts:

## 4.1 Protocol

```
https://
```

The **protocol** (also called the scheme) defines how data is transmitted. `https` is HTTP with TLS encryption — all data between client and server is encrypted. `http` is unencrypted. All modern APIs use `https`.

## 4.2 Domain

```
apis.scrimba.com
```

The **domain** (hostname) identifies the server. DNS resolves this to an IP address. `scrimba.com` is the root domain; `apis` is a subdomain that routes to Scrimba's API proxy server.

## 4.3 Path / Endpoint

```
/jsonplaceholder/posts
```

The **path** identifies the specific resource on the server. In REST APIs, paths are called **endpoints**. `/jsonplaceholder/posts` routes to the JSONPlaceholder proxy's posts collection. A path like `/jsonplaceholder/posts/1` would target post with ID 1 — a URL parameter.

## 4.4 URL Parameters

URL parameters (also called path parameters or route parameters) embed a specific resource identifier directly in the path:

```
/posts          → the entire posts collection (array)
/posts/1        → post with id: 1 (single object)
/posts/42       → post with id: 42 (single object)
/users/5/posts  → all posts by user with id: 5 (nested resource)
```

This project only uses `/posts` (the collection). A more complete implementation might fetch a single post at `/posts/{id}` when the user clicks on it.

## 4.5 Query Strings

Query strings attach key–value pairs to a URL to filter, sort, or paginate results:

```
/posts?_limit=5              → first 5 posts only
/posts?userId=1              → posts by userId 1 only
/posts?_limit=5&userId=1     → first 5 posts by userId 1
```

Syntax: `?` starts the query string, `key=value` pairs are separated by `&`. This project uses `data.slice(0, 5)` in JavaScript to limit results — a query string like `?_limit=5` would achieve the same result server-side and reduce the amount of data transferred.

The `?` and `&` are part of the URL standard — the server parses them into a key–value map (e.g. `req.query` in Express.js).

---

# 5. REST API Design

## 5.1 What REST means

**REST** stands for **Representational State Transfer** — an architectural style for designing networked APIs, defined by Roy Fielding in 2000. A REST API exposes data as **resources** (nouns) and uses **HTTP methods** (verbs) to perform operations on them.

REST APIs are:
- **Stateless** — each request contains all the information the server needs; the server stores no client session state
- **Resource-based** — URLs identify resources (`/posts`, `/users`), not actions (`/getPosts`, `/createUser`)
- **Method-driven** — what you do to the resource is expressed by the HTTP method, not the URL

## 5.2 Resources and endpoints

A **resource** is a piece of data the API manages. In BlogSpace, the resource is a **post**. REST organises endpoints around resources:

| Endpoint | Resource |
|----------|---------|
| `/posts` | The posts collection |
| `/posts/1` | The post with id 1 |
| `/users` | The users collection |
| `/users/5/posts` | Posts belonging to user 5 (nested resource) |

URLs should be **nouns** — they identify *what*, not *how*. The HTTP method expresses the action.

## 5.3 HTTP Methods as CRUD operations

REST maps the four CRUD database operations to HTTP methods:

| HTTP Method | CRUD | Action | Example |
|-------------|------|--------|---------|
| GET | Read | Retrieve a resource or collection | `GET /posts` → all posts |
| POST | Create | Create a new resource | `POST /posts` → new post |
| PUT | Update | Replace an entire resource | `PUT /posts/1` → replace post 1 |
| PATCH | Update | Partially update a resource | `PATCH /posts/1` → update title only |
| DELETE | Delete | Remove a resource | `DELETE /posts/1` → remove post 1 |

This project uses two:
- `GET /posts` — fetches the posts collection on load
- `POST /posts` — creates a new post on form submit

## 5.4 The JSONPlaceholder API

[JSONPlaceholder](https://jsonplaceholder.typicode.com/) is a free, open-source fake REST API used for testing and prototyping. It provides realistic dummy data (posts, users, comments, todos) and simulates all CRUD operations — but changes are not actually persisted to a real database.

The Scrimba proxy at `apis.scrimba.com/jsonplaceholder/posts` wraps JSONPlaceholder to ensure it is reliably accessible in course exercises.

A typical post object from `GET /posts`:
```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur..."
}
```

When you POST a new post, the server responds with the object you sent plus a new `id`:
```json
{
  "title": "My New Post",
  "body": "Hello world",
  "id": 101
}
```

> JSONPlaceholder always returns `id: 101` for new POSTs regardless of what you send — it is a fake API that simulates the response without storing real data.

---

# 6. HTTP GET — Fetching Posts on Load

## 6.1 Fetch at the top level — no event needed

```javascript
fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })
```

This `fetch()` call is at the **top level of the script** — not inside a function, not triggered by a user event. It runs as soon as the browser executes `index.js` (which happens when the `<script>` tag is reached at the end of `<body>`). The posts load automatically when the page opens.

This is appropriate for **read-on-load** data — content that should be available immediately when the user arrives. Compare to BoredBot, where the fetch was inside a function triggered by a button click.

## 6.2 `Array.slice(0, 5)`

```javascript
postsArray = data.slice(0, 5)
```

`Array.slice(startIndex, endIndex)` returns a new array containing elements from `startIndex` up to (but not including) `endIndex`. It does **not** modify the original array.

| `slice()` call | Returns |
|----------------|---------|
| `data.slice(0, 5)` | Elements at indices 0, 1, 2, 3, 4 (first 5) |
| `data.slice(5)` | Elements from index 5 to the end |
| `data.slice(-3)` | Last 3 elements |
| `data.slice(1, 4)` | Elements at indices 1, 2, 3 |

`data` from the JSONPlaceholder `/posts` endpoint is an array of 100 post objects. `slice(0, 5)` extracts just the first 5 — enough for a demo without overwhelming the UI.

## 6.3 `renderPosts()` — the render pattern

```javascript
function renderPosts() {
    let html = ""
    for (let post of postsArray) {
        html += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />
        `
    }
    document.getElementById("blog-list").innerHTML = html
}
```

`renderPosts()` is the same **data → HTML string → DOM** render pattern from Twimba and the X Clone, now applied to API data:

```
postsArray (state)  →  renderPosts() (mapping)  →  blog-list.innerHTML (DOM)
```

Called in two places:
1. After the GET fetch resolves and `postsArray` is populated
2. After the POST fetch resolves and a new post is prepended to `postsArray`

Every call rebuilds the entire list from scratch — no partial updates. This keeps the logic simple at the cost of efficiency (acceptable for 5 posts).

---

# 7. HTTP POST — Sending Data to the Server

## 7.1 The `fetch` options object

```javascript
fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
```

`fetch()` accepts an optional **second argument** — a plain JavaScript object that configures the HTTP request. When omitted, `fetch()` sends a GET with no body. When provided, you can override the method, add a body, and set headers:

```javascript
const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json"
    }
}
```

## 7.2 `method: "POST"`

```javascript
method: "POST"
```

Sets the HTTP verb to `POST`. Without this, `fetch()` defaults to `GET`. The string is case-insensitive in the spec but `"POST"` (uppercase) is the universal convention matching HTTP/1.1 standards.

## 7.3 `body: JSON.stringify(data)`

```javascript
const data = {
    title: postTitle,
    body: postBody
}

body: JSON.stringify(data)
```

The `body` property contains the **request body** — the data being sent to the server. HTTP GET requests have no body; POST, PUT, and PATCH requests carry their data in the body.

The body must be a **string** (or Blob, ArrayBuffer, FormData, URLSearchParams). Since our data is a JavaScript object, `JSON.stringify()` converts it to a JSON string before sending.

```javascript
// What JSON.stringify() produces:
JSON.stringify({ title: "My Post", body: "Hello" })
// → '{"title":"My Post","body":"Hello"}'
```

The server receives this string, parses it as JSON, and reads the `title` and `body` fields.

## 7.4 `headers: Content-Type`

```javascript
headers: {
    "Content-Type": "application/json"
}
```

`Content-Type` tells the server the **format of the request body**. Without it, the server does not know whether the body is JSON, form data, plain text, or binary. `"application/json"` is the MIME type for JSON.

When the server sees `Content-Type: application/json`, it knows to parse the body with `JSON.parse()`.

## 7.5 What the server sends back

```javascript
fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then(res => res.json())
    .then(post => {
        postsArray.unshift(post)
        renderPosts()
        titleInput.value = ""
        bodyInput.value = ""
    })
```

The POST response from JSONPlaceholder is the created post object — identical to what was sent, plus a server-assigned `id`:
```json
{ "title": "My New Post", "body": "Hello world", "id": 101 }
```

This `post` object is prepended to `postsArray` and the list re-renders — showing the new post at the top without a page reload.

---

# 8. `JSON.stringify()` — Object to String

## 8.1 Why stringify is needed

HTTP request bodies are transmitted as **text** — raw bytes of a string. A JavaScript object in memory cannot be sent over the wire directly. `JSON.stringify()` serialises it into a JSON-formatted string that can be transmitted and then deserialised by the server.

```
JavaScript object (memory)  →  JSON.stringify()  →  JSON string (wire)
{ title: "Post" }           →                    →  '{"title":"Post"}'
                                                       ↓ (server receives)
                                                  JSON.parse()
                                                       ↓
                                              { title: "Post" }  (server memory)
```

## 8.2 `JSON.stringify` vs `JSON.parse`

| Method | Direction | Input | Output |
|--------|-----------|-------|--------|
| `JSON.stringify(obj)` | Object → String | JS object | JSON string |
| `JSON.parse(str)` | String → Object | JSON string | JS object |

```javascript
// Stringify — when sending data to a server (in body)
JSON.stringify({ name: "Alice", age: 30 })
// → '{"name":"Alice","age":30}'

// Parse — when receiving data from a server (res.json() does this internally)
JSON.parse('{"name":"Alice","age":30}')
// → { name: 'Alice', age: 30 }
```

`res.json()` in the `.then()` chain internally calls `JSON.parse()` on the response text — you never call `JSON.parse()` manually in a fetch chain.

---

# 9. Request Headers

## 9.1 What headers are

**HTTP headers** are key–value metadata pairs attached to both requests and responses. They describe the request or response without being part of the body data.

```
POST /jsonplaceholder/posts HTTP/1.1
Host: apis.scrimba.com
Content-Type: application/json           ← request header
Content-Length: 42

{"title":"My Post","body":"Hello world"} ← request body
```

Headers travel separately from the body. The server reads headers before parsing the body.

## 9.2 `Content-Type: application/json`

```javascript
headers: {
    "Content-Type": "application/json"
}
```

`Content-Type` is the most important header for POST requests. It is a **MIME type** — a standardised identifier for data formats.

| MIME type | Used for |
|-----------|---------|
| `application/json` | JSON data — most REST APIs |
| `application/x-www-form-urlencoded` | Traditional HTML form data (`key=value&key=value`) |
| `multipart/form-data` | File uploads and mixed data |
| `text/plain` | Plain text |
| `text/html` | HTML content |

Without `Content-Type: application/json`, many server frameworks (Express.js, Django, etc.) will not automatically parse the body as JSON — the server receives the string but does not know to `JSON.parse()` it.

## 9.3 Common request headers

| Header | Purpose | Example |
|--------|---------|---------|
| `Content-Type` | Format of the request body | `application/json` |
| `Authorization` | Authentication credentials | `Bearer eyJhbGci...` |
| `Accept` | Response formats the client can handle | `application/json` |
| `Content-Length` | Byte length of the body | `42` |
| `User-Agent` | Client identification | `Mozilla/5.0...` |

The browser automatically adds some headers (like `Host`, `Content-Length`, `User-Agent`). You only need to explicitly add headers that are non-default — like `Content-Type` for POST bodies and `Authorization` for authenticated endpoints.

---

# 10. Form Handling — `e.preventDefault()`

## 10.1 Default form submission behaviour

When a `<form>` is submitted (by clicking its `<button>` or pressing Enter in an input), the browser's **default behaviour** is to:
1. Serialise all form field values
2. Send an HTTP request to the URL specified in `action` (or the current page URL if `action` is absent)
3. Navigate to the response URL — effectively **reloading the page**

This default behaviour is fine for traditional server-rendered apps but completely wrong for a JavaScript SPA — it would reload the page and lose all state.

## 10.2 `e.preventDefault()`

```javascript
form.addEventListener("submit", function(e) {
    e.preventDefault()
    // ... our own fetch logic
})
```

`e` is the **submit event object**. `e.preventDefault()` cancels the browser's default submit behaviour — the form is not sent to the server the traditional way and the page does not reload. This gives JavaScript full control of what happens on submit.

`preventDefault()` works on many event types:

| Event | Default behaviour prevented |
|-------|---------------------------|
| `submit` | Form serialisation and page navigation |
| `click` on `<a>` | Navigation to the `href` |
| `keydown` (Enter in input) | Form submission or cursor movement |
| `contextmenu` | Right-click menu |

## 10.3 Reading input values

```javascript
const postTitle = titleInput.value
const postBody = bodyInput.value
```

`.value` reads the current string content of a text `<input>` or `<textarea>`. These are captured at the moment of submit — whatever the user has typed. They are then assembled into the `data` object passed to `JSON.stringify()`.

The `titleInput` and `bodyInput` references are stored in module-level variables at the top of the script:
```javascript
const titleInput = document.getElementById("post-title")
const bodyInput = document.getElementById("post-body")
```

Storing references at the top avoids calling `document.getElementById()` repeatedly inside functions — one DOM lookup, reused everywhere.

## 10.4 Clearing the form after submission

```javascript
titleInput.value = ""
bodyInput.value = ""
// form.reset()
```

After a successful POST, the form fields are cleared by setting `.value = ""` on each input. The commented `form.reset()` is an alternative — it clears all fields at once and also resets checkboxes, select menus, and file inputs to their default states.

| Method | Clears | Notes |
|--------|--------|-------|
| `input.value = ""` | One field at a time | Precise — can clear specific fields |
| `form.reset()` | All fields at once | Resets to HTML `value` attribute defaults |

Both achieve the same result here. `form.reset()` is more concise but less granular.

---

# 11. State Management — `postsArray`

## 11.1 Module-level state

```javascript
let postsArray = []
```

`postsArray` is declared at the top level of the script — outside all functions. This makes it accessible to both `renderPosts()` (which reads it) and the two fetch callbacks (which write to it). It is the **single source of truth** for the app's data.

Starting as an empty array (`[]`) means `renderPosts()` could be safely called before data arrives — it would produce an empty string and set `blog-list.innerHTML = ""`.

## 11.2 Mutating state and re-rendering

```
GET fetch resolves → postsArray = data.slice(0, 5) → renderPosts()
POST fetch resolves → postsArray.unshift(post)    → renderPosts()
```

Both state changes immediately trigger `renderPosts()`. The DOM always reflects the current contents of `postsArray` after every render — no drift between state and UI.

## 11.3 `Array.unshift()` — prepending new posts

```javascript
postsArray.unshift(post)
```

`unshift()` adds one or more elements to the **beginning** of an array (mutates in place) and returns the new length. The new post appears at the top of the rendered list — chronologically the most recent entry, matching standard blog conventions.

| Method | Adds to | Example |
|--------|---------|---------|
| `push(item)` | End of array | `[1,2,3].push(4)` → `[1,2,3,4]` |
| `unshift(item)` | Beginning of array | `[1,2,3].unshift(0)` → `[0,1,2,3]` |

This pattern was first introduced in Twimba (X Clone) — identical usage here for new tweets. Seeing the same pattern in a different context (API data vs local data) reinforces it.

---

# 12. The `renderPosts()` Function — Template Literal HTML

## 12.1 `for...of` loop to build HTML strings

```javascript
function renderPosts() {
    let html = ""
    for (let post of postsArray) {
        html += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />
        `
    }
    document.getElementById("blog-list").innerHTML = html
}
```

`for...of` iterates over the **values** of an iterable (array, string, Set, Map). For each `post` object in `postsArray`, a block of HTML is appended to the `html` string using the `+=` operator.

| Loop type | Iterates over | Access to index? |
|-----------|--------------|-----------------|
| `for (let i = 0; i < arr.length; i++)` | Index | Yes (`arr[i]`) |
| `for...of` | Values directly | No (unless using `entries()`) |
| `forEach(callback)` | Values + index in callback | Yes (second param) |

`for...of` is the cleanest option when you only need the value — no index boilerplate, no callback nesting.

## 12.2 `innerHTML` — rendering the accumulated string

```javascript
document.getElementById("blog-list").innerHTML = html
```

`innerHTML` parses the string as HTML and renders it into the element. Each call **replaces** the entire contents of `#blog-list`. Since `html` is built fresh from `postsArray` every time, the rendered list always matches the array.

> **Security note:** Unlike `textContent`, `innerHTML` parses HTML tags. If `post.title` or `post.body` contained `<script>` tags injected by a malicious server, they could execute. In this project, data comes from a trusted API (JSONPlaceholder), so this risk is minimal. For user-generated content stored and re-served by your own server, sanitise before rendering with `innerHTML`.

---

# 13. CSS Concepts — `position: fixed` Navigation

## 13.1 `position: fixed`

```css
nav {
    background-color: beige;
    padding: 5px;
    height: 30px;
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
}
```

`position: fixed` removes an element from the **normal document flow** and positions it relative to the **viewport** — it stays in the same place even as the user scrolls. The classic use is a navigation bar that is always visible at the top of the screen.

| `position` value | Reference frame | In document flow? |
|-----------------|----------------|------------------|
| `static` (default) | Normal flow | ✅ Yes |
| `relative` | Its own normal position | ✅ Yes |
| `absolute` | Nearest positioned ancestor | ❌ No |
| `fixed` | The viewport | ❌ No |
| `sticky` | Scrolls until threshold, then fixed | ✅ Yes |

## 13.2 `width: 100%` on fixed elements

```css
nav {
    position: fixed;
    width: 100%;
}
```

When an element is `position: fixed`, it is **removed from flow** — it no longer participates in the block formatting context. Block elements normally stretch to fill their parent's width automatically, but fixed elements do not. Without `width: 100%`, the nav would only be as wide as its content (`h3` text). `width: 100%` makes it span the full viewport width.

> The same applies to `position: absolute` — fixed and absolute elements both lose their automatic full-width behaviour and must be sized explicitly.

## 13.3 Form `padding-top` to clear the fixed nav

```css
form {
    padding: 60px 10px 10px;
}
```

The fixed `nav` has `height: 30px` and sits on top of the page content. Without compensation, the top of the form would hide behind the nav. `padding-top: 60px` pushes the form's content down by 60px — 30px for the nav height plus 30px of breathing room.

This is the standard workaround for fixed headers: give the next element enough `padding-top` (or `margin-top`) to clear the fixed element's height.

## 13.4 `display: grid` on `<form>`

```css
form {
    display: grid;
    background-color: lightblue;
}
```

`display: grid` on the form stacks all children (`<label>`, `<input>`, `<label>`, `<textarea>`, `<button>`) vertically in a single column by default — because `grid-template-columns` is not specified, the grid creates one column taking 100% width. Each child occupies a full row.

This is a concise alternative to setting `display: block` on each form child or wrapping them in `<div>` elements.

## 13.5 Child selector `nav > h3`

```css
nav > h3 {
    margin: 0;
}
```

`nav > h3` is the **child combinator** — it selects `<h3>` elements that are **direct children** of `<nav>`. The `>` requires a parent–child relationship, not just ancestor–descendant.

| Selector | Matches |
|----------|---------|
| `nav h3` | Any `h3` inside `nav`, at any depth |
| `nav > h3` | Only `h3` that is a direct child of `nav` |

Here the distinction is academic (there is only one `h3` in the `nav`), but the `>` combinator documents the intended structure explicitly.

## 13.6 ID selectors — `input#post-title`

```css
input#post-title, textarea#post-body {
    margin-bottom: 10px;
}
```

`input#post-title` combines the **element type selector** (`input`) with an **ID selector** (`#post-title`). It only matches an `<input>` element with `id="post-title"` — not any other element with that ID.

This is more specific than `#post-title` alone — though IDs must be unique per page anyway, combining the type makes the intent explicit and raises specificity.

---

# 14. HTML Structure Recap

```html
<html>
  <head>
    <link> → Google Fonts (Karla: 200, 400, 700)
    <link> → index.css
  </head>
  <body>
    <nav>
      <h3>BlogSpace</h3>           ← Site brand name
    </nav>

    <form id="new-post">
      <label for="post-title">Title:</label>
      <input id="post-title" type="text" />        ← titleInput
      <label for="post-body">Body:</label>
      <textarea id="post-body"></textarea>          ← bodyInput
      <button>Post</button>
    </form>

    <div id="blog-list"></div>     ← renderPosts() writes here

    <script src="index.js"></script>
  </body>
</html>
```

### Notable observations

| Observation | Explanation |
|-------------|-------------|
| `<label for="post-title">` + `<input id="post-title">` | `for` attribute links label to input — clicking the label focuses the input; essential for accessibility |
| `<button>` with no `type` attribute | Defaults to `type="submit"` inside a `<form>` — clicking it triggers the `submit` event |
| `<textarea>` vs `<input type="text">` | `<textarea>` allows multi-line text; `<input>` is single-line |
| `<div id="blog-list">` starts empty | JavaScript populates it after the fetch resolves |
| `<script>` at end of `<body>` | DOM is fully parsed before JS executes — all `getElementById()` calls succeed |
| No `<meta name="viewport">` | Missing — same gap as BoredBot; would be needed for proper mobile rendering |

---

# 15. How the App Flow Works

```
Page loads — index.js executes top to bottom
    │
    ├── postsArray = []                              ← state initialised
    ├── titleInput = getElementById("post-title")   ← cached DOM references
    ├── bodyInput  = getElementById("post-body")
    ├── form       = getElementById("new-post")
    │
    ├── fetch("https://apis.scrimba.com/jsonplaceholder/posts")   ← GET on load
    │       → HTTP GET request sent (async, non-blocking)
    │
    ├── form.addEventListener("submit", handler)    ← submit handler wired up
    │
    └── (script finishes top-to-bottom execution, browser waits for events)

GET response arrives
    └── .then(res => res.json()) → .then(data => {
            postsArray = data.slice(0, 5)    ← state updated: 5 posts
            renderPosts()                    ← DOM updated: 5 posts displayed
        })

User fills in the form and clicks "Post"
    └── submit event fires → handler called
            e.preventDefault()               ← page reload cancelled
            postTitle = titleInput.value     ← read form values
            postBody  = bodyInput.value
            data = { title, body }           ← build object
            options = {                      ← configure POST
                method: "POST",
                body: JSON.stringify(data),  ← object → JSON string
                headers: { "Content-Type": "application/json" }
            }
            fetch(url, options)              ← POST request sent
                .then(res => res.json())     ← parse response body
                .then(post => {
                    postsArray.unshift(post) ← prepend new post to state
                    renderPosts()            ← DOM rebuilt: new post at top
                    titleInput.value = ""    ← clear form
                    bodyInput.value = ""
                })
```

---

# 16. How to Run

No build step required. Uses a plain `<script>` tag — no ES Modules — so `file://` works:

1. Clone the repository:
   ```bash
   git clone https://github.com/Nilanchal0107/Web-Development-MiniProjects.git
   ```

2. Navigate to the project folder:
   ```bash
   cd "07. APIs and Async JavaScript/02. URLs and REST"
   ```

3. Open `index.html` directly in your browser.

**Things to try:**
- Open DevTools → **Network** tab on load — watch the GET request to `/jsonplaceholder/posts`; inspect the **Response** to see all 100 posts, then see only 5 rendered
- Fill in the form and click Post — watch a second request appear in Network with **Method: POST**; inspect its **Request Headers** to see `Content-Type: application/json` and its **Request Body** / **Payload** to see the JSON string
- Inspect the POST **Response** — see the returned object with `id: 101`
- Add `console.log(data)` inside the GET `.then()` to see all 100 post objects in the console before `slice()`
- In DevTools Console, run `postsArray` — you will get a ReferenceError because `postsArray` is a script-scoped variable, not on `window`
- Uncomment `form.reset()` and comment out the two `.value = ""` lines — verify the form still clears after submission
- Try changing `slice(0, 5)` to `slice(0, 10)` to render 10 posts
- Try visiting `https://apis.scrimba.com/jsonplaceholder/posts/1` in a browser tab — see a single post object (URL parameter in action)
- Try `https://apis.scrimba.com/jsonplaceholder/posts?_limit=3` — see only 3 posts (query string in action)

---

# 17. Course Reference

| Item | Detail |
|------|--------|
| Platform | [Scrimba](https://scrimba.com) |
| Course | Fullstack Web Development Path |
| Module | APIs and Async JavaScript |
| Project number | 02 of the module |
| Key new concepts | URL anatomy · REST design principles · HTTP POST · `fetch()` options object · `JSON.stringify()` · Request headers · `Content-Type` · `e.preventDefault()` · Form handling · `Array.slice()` · `for...of` · Module-level state · `position: fixed` |
| Previous project | [01. Intro to APIs](../01.%20Intro%20to%20APIs/README.md) |
| Next project | [03. Color Scheme Generator](../03.%20Color%20Scheme%20Generator/) |
| JSONPlaceholder | [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) |
| MDN — fetch options | [MDN — fetch: init parameter](https://developer.mozilla.org/en-US/docs/Web/API/fetch#init) |
| MDN — JSON.stringify | [MDN — JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) |
| MDN — preventDefault | [MDN — Event.preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) |
| MDN — position: fixed | [MDN — position](https://developer.mozilla.org/en-US/docs/Web/CSS/position) |

---

# Author

**Nilanchal Jena**
GitHub: [https://github.com/Nilanchal0107](https://github.com/Nilanchal0107)

> *REST is not a technology — it is a way of thinking about the web as a collection of resources you can read, create, update, and delete with a vocabulary that already exists: HTTP. Once you see `/posts` as a noun and `GET`/`POST` as verbs, every API you encounter becomes readable. The URL tells you what, the method tells you how, the body carries the data, and the headers provide context. That's the entire web in four sentences.*
