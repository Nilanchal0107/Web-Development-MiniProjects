# TypeScript Fundamentals — TypeScript
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=flat-square&logo=nodedotjs)
![Status](https://img.shields.io/badge/Status-Completed-brightgreen?style=flat-square)
![Course](https://img.shields.io/badge/Scrimba-Fullstack%20Path-purple?style=flat-square)

The **TypeScript Fundamentals** module from **Scrimba's Fullstack Web Development Path** — a hands-on conversion of a real JavaScript pizza-ordering app into fully typed TypeScript, covering every core language feature from basic annotations to generics.

This README is written as a **complete cheatsheet and concept revision guide**. Reading it top to bottom will revise every TypeScript concept introduced in this module, with syntax tables, ✅/❌ patterns, and annotated code blocks you can reference while writing TypeScript.

---

# Table of Contents

1. [What is TypeScript?](#1-what-is-typescript)
2. [Why TypeScript? — JavaScript vs TypeScript](#2-why-typescript--javascript-vs-typescript)
3. [Basic Type Annotations](#3-basic-type-annotations)
   - [Primitive Types](#31-primitive-types)
   - [Annotating Variables](#32-annotating-variables)
   - [Annotating Function Parameters and Return Types](#33-annotating-function-parameters-and-return-types)
   - [Void Return Type](#34-void-return-type)
   - [The `any` Type — and Why to Avoid It](#35-the-any-type--and-why-to-avoid-it)
4. [Custom Types — `type` Alias](#4-custom-types--type-alias)
   - [Defining a Type Alias](#41-defining-a-type-alias)
   - [Nested Object Types](#42-nested-object-types)
   - [Optional Properties](#43-optional-properties)
5. [Typing Arrays](#5-typing-arrays)
6. [Literal Types](#6-literal-types)
7. [Union Types](#7-union-types)
8. [Type Narrowing](#8-type-narrowing)
   - [Narrowing with `typeof`](#81-narrowing-with-typeof)
   - [Narrowing with Truthiness](#82-narrowing-with-truthiness)
   - [Be Explicit Whenever You Can](#83-be-explicit-whenever-you-can)
9. [Utility Types](#9-utility-types)
   - [`Partial<T>`](#91-partialt)
   - [`Omit<T, K>`](#92-omitt-k)
10. [Generics](#10-generics)
    - [Generic Functions](#101-generic-functions)
    - [Explicit Generic Calls](#102-explicit-generic-calls)
    - [Generics with Constraints](#103-generics-with-constraints)
11. [The `tsconfig.json`](#11-the-tsconfigjson)
12. [Quick Reference Cheatsheet](#12-quick-reference-cheatsheet)
13. [How to Run](#13-how-to-run)
14. [Course Reference](#14-course-reference)

---

# 1. What is TypeScript?

**TypeScript** is a **superset of JavaScript** developed by Microsoft. Every valid JavaScript file is also a valid TypeScript file. TypeScript adds an optional **static type system** on top of JavaScript, which means types are checked at **compile time** — before the code ever runs in a browser or Node.js.

```
JavaScript                TypeScript
┌──────────────────┐      ┌──────────────────────────────────┐
│  let x = 5       │  →   │  let x: number = 5               │
│  x = "hello"     │      │  x = "hello"  ← ❌ TYPE ERROR    │
│  // Runs fine    │      │  // Caught before running        │
└──────────────────┘      └──────────────────────────────────┘
```

| Feature | JavaScript | TypeScript |
|---------|-----------|-----------|
| Type checking | At runtime (crashes) | At compile time (editor error) |
| Autocomplete | Limited | Rich — editor knows the shape of every value |
| Refactoring safety | Manual search | Compiler catches all broken references |
| Output | `.js` files | Compiled back to `.js` — browsers still run JS |
| Extra syntax | None | `: type`, `type`, `interface`, generics, etc. |

> TypeScript is a **development tool** only. The `tsc` compiler strips all type annotations and outputs plain JavaScript. Your users never see TypeScript.

---

# 2. Why TypeScript? — JavaScript vs TypeScript

The module starts by migrating an existing pizza app from JavaScript to TypeScript to demonstrate **defensive coding** — catching bugs that JavaScript silently ignores.

```javascript
// ❌ JavaScript — this fails at runtime with no warning
function getOrderTotal(order) {
    return order.items.reduce((total, item) => total + item.price, 0)
}

getOrderTotal({ itmes: [] })  // typo "itmes" → crashes when .items is undefined
```

```typescript
// ✅ TypeScript — editor immediately flags the typo
type Order = {
    items: { name: string; price: number }[]
}

function getOrderTotal(order: Order): number {
    return order.items.reduce((total, item) => total + item.price, 0)
}

getOrderTotal({ itmes: [] })  // ❌ Error: Object literal may only specify known properties
```

> The TypeScript compiler acts as a first line of defence — a free peer reviewer that never misses a spelling mistake or a missing property.

---

# 3. Basic Type Annotations

## 3.1 Primitive Types

TypeScript's three most-used primitive type annotations mirror JavaScript's three primitive value types:

```typescript
let name: string    = "Margherita"
let price: number   = 12.99
let isAvailable: boolean = true
```

| TypeScript type | JavaScript equivalent | What it holds |
|-----------------|----------------------|---------------|
| `string` | `typeof x === 'string'` | Text: `"hello"`, `''`, template literals |
| `number` | `typeof x === 'number'` | All numbers: integers, floats, `NaN`, `Infinity` |
| `boolean` | `typeof x === 'boolean'` | `true` or `false` only |
| `null` | `typeof x === 'object'` (JS quirk) | Explicit absence of a value |
| `undefined` | `typeof x === 'undefined'` | Variable declared but not assigned |

> In TypeScript, `null` and `undefined` are **distinct types**, not interchangeable. `strictNullChecks: true` in `tsconfig.json` enforces this — enabling it is strongly recommended.

## 3.2 Annotating Variables

Type annotations are written with a colon after the variable name: `variableName: type`.

```typescript
// Explicit annotation
let orderId: number = 1

// Type inference — TypeScript infers the type from the initial value
// Prefer inference when the type is obvious from the right-hand side
let orderId = 1   // TypeScript infers: number
```

| Pattern | When to use |
|---------|------------|
| `let x: string` (explicit) | When the variable is declared without an initial value, or when the type is not obvious |
| `let x = "hello"` (inferred) | When the initial value makes the type obvious — reduces visual noise |

## 3.3 Annotating Function Parameters and Return Types

```typescript
// Both parameters and the return type are annotated
function addItem(name: string, price: number): string {
    return `Added ${name} for £${price}`
}

// Arrow function — same syntax
const getTotal = (items: number[]): number =>
    items.reduce((sum, item) => sum + item, 0)
```

| Position | Syntax | Example |
|----------|--------|---------|
| Parameter | `(param: type)` | `(name: string)` |
| Return type | `): returnType {` | `): number {` |
| No return value | `): void {` | `): void {` |

> Annotating the **return type** is especially valuable: if you accidentally return a `string` from a function declared as `): number`, the compiler catches it immediately.

## 3.4 Void Return Type

```typescript
// void = this function intentionally returns nothing
function logOrder(orderId: number): void {
    console.log(`Order #${orderId} received`)
    // returning a value here would be a TypeScript error
}
```

`void` is not the same as `undefined`. It signals to callers that the return value is not useful and should not be relied on.

## 3.5 The `any` Type — and Why to Avoid It

```typescript
// ❌ any — disables type checking entirely
let value: any = "hello"
value = 42          // allowed
value.foo()         // allowed — no error, but will crash at runtime

// ✅ Use specific types or generics instead
let value: string | number = "hello"
```

`any` is the **escape hatch** that turns off TypeScript's type checker for a variable. Reaching for `any` defeats the entire purpose of using TypeScript.

| Type | Type-safe? | Use case |
|------|-----------|----------|
| `any` | ❌ No | Last resort — migrating legacy code slowly |
| `unknown` | ✅ Yes | Type-safe alternative to `any`; must narrow before use |
| Specific type | ✅ Yes | Always prefer this |

> **Never use `any` in new TypeScript code.** If you find yourself writing `any`, it is a signal to define a proper type or use generics.

---

# 4. Custom Types — `type` Alias

## 4.1 Defining a Type Alias

```typescript
// Define a reusable shape with the `type` keyword
type Pizza = {
    name: string
    price: number
    size: string
}

// Use it as a type annotation anywhere
const myPizza: Pizza = {
    name: "Pepperoni",
    price: 14.99,
    size: "large"
}
```

A **type alias** names a custom object shape. Once defined, `Pizza` can be used as a type annotation for variables, function parameters, return types, and arrays — exactly like `string` or `number`.

```typescript
// As a function parameter
function displayPizza(pizza: Pizza): void {
    console.log(`${pizza.name} — £${pizza.price}`)
}

// As a return type
function createPizza(name: string, price: number): Pizza {
    return { name, price, size: "medium" }
}
```

> Name custom types with **PascalCase** (`Pizza`, `OrderItem`, `UserProfile`) to distinguish them from built-in lowercase types (`string`, `number`, `boolean`).

## 4.2 Nested Object Types

```typescript
// Types can nest inside types — inline or by referencing another type alias
type MedicalRecord = {
    vaccinations: string[]
    weightKg: number
}

type Pet = {
    name: string
    age: number
    medicalRecord: MedicalRecord   // ← references another type
}

// Or inline (equivalent but less reusable)
type Pet = {
    name: string
    age: number
    medicalRecord: {
        vaccinations: string[]
        weightKg: number
    }
}
```

| Approach | Reusable? | Best for |
|----------|----------|----------|
| Inline nested type | ❌ No | One-off shape used in only one place |
| Separate type alias | ✅ Yes | Shape shared across multiple types or functions |

## 4.3 Optional Properties

```typescript
type Order = {
    id: number
    pizzaName: string
    notes?: string        // ← the ? makes this property optional
    deliveryTime?: number
}

// Both of these are valid:
const order1: Order = { id: 1, pizzaName: "Margherita" }
const order2: Order = { id: 2, pizzaName: "BBQ Chicken", notes: "Extra sauce" }
```

An **optional property** (`?`) can be `undefined` — TypeScript will not require it when creating an object of that type. When you access an optional property, you must handle the possibility that it is `undefined`.

```typescript
// ❌ TypeScript error — notes might be undefined
console.log(order.notes.toUpperCase())

// ✅ Optional chaining — safe access
console.log(order.notes?.toUpperCase())

// ✅ Nullish coalescing — provide a fallback
console.log(order.notes ?? "No special notes")
```

---

# 5. Typing Arrays

```typescript
// Two equivalent syntaxes for array types:
const pizzaNames: string[]       = ["Margherita", "Pepperoni"]
const pizzaNames: Array<string>  = ["Margherita", "Pepperoni"]   // generic form

// Array of objects
const orders: Order[] = [
    { id: 1, pizzaName: "Margherita" },
    { id: 2, pizzaName: "Pepperoni", notes: "No cheese" }
]

// Array of arrays (2D)
const grid: number[][] = [[1, 2], [3, 4]]
```

| Syntax | Reads as | Preferred for |
|--------|----------|---------------|
| `string[]` | "array of strings" | Simple, common types |
| `Array<string>` | "generic Array of strings" | Complex generic types where `<>` is already in use |
| `(string \| number)[]` | "array of string-or-number" | Union type arrays |

```typescript
// ❌ TypeScript will catch type mismatches in arrays
const prices: number[] = [12.99, 14.99, "free"]
//                                        ^^^^^^ Error: Type 'string' is not assignable to type 'number'

// ✅ Correct
const prices: number[] = [12.99, 14.99, 0]
```

> Typed arrays give you autocomplete on every element's properties. `orders[0].` will suggest `id`, `pizzaName`, and `notes` — you do not need to remember the shape.

---

# 6. Literal Types

```typescript
// A literal type restricts a value to one exact value
type Size = "small" | "medium" | "large"

const mySize: Size = "medium"   // ✅
const mySize: Size = "huge"     // ❌ Error: Type '"huge"' is not assignable to type 'Size'
```

A **literal type** uses the actual value as the type. Instead of `string` (which accepts any string), `"small" | "medium" | "large"` only accepts those three exact strings.

```typescript
// Common use: status flags
type OrderStatus = "pending" | "preparing" | "ready" | "delivered" | "cancelled"

type Order = {
    id: number
    pizzaName: string
    status: OrderStatus   // only the 5 values above are valid
}
```

| Concept | Example | What it means |
|---------|---------|---------------|
| String literal type | `"red" \| "green" \| "blue"` | Only these exact strings |
| Number literal type | `1 \| 2 \| 3` | Only these exact numbers |
| Boolean literal type | `true` | Only the value `true` |
| Union of literals | `"sm" \| "md" \| "lg"` | A fixed set of string values — like an enum |

> Literal types are especially powerful for **discriminated unions** and API response shapes where you know exactly which string values are valid.

---

# 7. Union Types

```typescript
// A union type says: "this value can be type A OR type B"
type StringOrNumber = string | number

let orderId: string | number = 1
orderId = "ORD-001"   // ✅ Both are valid
orderId = true        // ❌ Error: 'boolean' is not in the union
```

The `|` operator creates a **union type** — a value of a union type can be any one of the listed types at any given moment.

```typescript
// Practical example: an API that may return data or null
function findPizza(id: number): Pizza | null {
    return pizzas.find(p => p.id === id) ?? null
}

// The caller must handle both possibilities
const pizza = findPizza(1)
pizza.name           // ❌ Error — pizza might be null
pizza?.name          // ✅ Optional chaining handles null safely

if (pizza) {
    pizza.name       // ✅ TypeScript now knows pizza is Pizza, not null
}
```

| Union | Meaning | Example use |
|-------|---------|------------|
| `string \| number` | Either a string or a number | IDs that may be numeric or string |
| `Pizza \| null` | A Pizza object or nothing | Lookup functions that may fail |
| `"a" \| "b" \| "c"` | One of these exact strings | Controlled vocabulary / enums |
| `number \| undefined` | A number or not set | Optional numeric properties |

---

# 8. Type Narrowing

## 8.1 Narrowing with `typeof`

When a variable has a union type, TypeScript requires you to narrow it to a specific type before using type-specific methods.

```typescript
function formatId(id: string | number): string {
    // At this point, TypeScript does not know if id is string or number
    // id.toUpperCase()   ← ❌ Error: Property 'toUpperCase' does not exist on type 'number'

    if (typeof id === "string") {
        // Inside this block, TypeScript narrows id to: string
        return id.toUpperCase()
    }
    // After the if block, TypeScript narrows id to: number
    return id.toFixed(2)
}
```

**Narrowing** means TypeScript uses the runtime check (like `typeof`) to deduce a more specific type within a code branch.

| Narrowing technique | Syntax | Narrows to |
|--------------------|--------|------------|
| `typeof` check | `if (typeof x === 'string')` | `string` |
| Truthiness check | `if (x)` | The non-null/undefined type |
| `instanceof` check | `if (x instanceof Date)` | `Date` |
| Equality check | `if (x === "active")` | Literal `"active"` |
| `in` operator | `if ("name" in x)` | Object with that property |

## 8.2 Narrowing with Truthiness

```typescript
function greet(name: string | null): string {
    if (name) {
        // TypeScript narrows: name is string here (null is falsy, excluded)
        return `Hello, ${name.toUpperCase()}`
    }
    return "Hello, stranger"
}
```

A truthiness check (`if (value)`) narrows away `null`, `undefined`, `0`, `""`, and `false` — all falsy values.

## 8.3 Be Explicit Whenever You Can

```typescript
// ❌ Letting TypeScript infer a union you did not intend
const status = Math.random() > 0.5 ? "active" : 0
// TypeScript infers: string | number — probably not what you wanted

// ✅ Explicitly declare the intended type
const status: "active" | "inactive" = isActive ? "active" : "inactive"
```

> **Be explicit wherever the inferred type is broader than what you intend.** Explicit types serve as living documentation — they tell the next developer (and yourself) exactly what values are valid.

---

# 9. Utility Types

TypeScript ships with built-in **utility types** that transform existing types into new types. The module covers `Partial` and `Omit`.

## 9.1 `Partial<T>`

```typescript
type Pizza = {
    name: string
    price: number
    size: string
}

// Partial<Pizza> makes ALL properties optional
type PizzaUpdate = Partial<Pizza>
// Equivalent to:
// { name?: string; price?: number; size?: string }

function updatePizza(id: number, updates: Partial<Pizza>): void {
    // updates may have any subset of Pizza's properties
}

updatePizza(1, { price: 15.99 })          // ✅ Only updating price
updatePizza(1, { name: "BBQ", size: "large" })  // ✅ Partial update
```

`Partial<T>` is ideal for **update / patch functions** where you only send the fields that changed.

## 9.2 `Omit<T, K>`

```typescript
type Pizza = {
    id: number
    name: string
    price: number
    size: string
}

// Omit creates a new type with certain properties removed
type PizzaWithoutId = Omit<Pizza, "id">
// Equivalent to: { name: string; price: number; size: string }

// Omit multiple keys with a union
type PizzaPreview = Omit<Pizza, "id" | "price">
// Equivalent to: { name: string; size: string }

function createNewPizza(data: Omit<Pizza, "id">): Pizza {
    return { id: Math.random(), ...data }
}
```

| Utility Type | What it does | Typical use |
|-------------|--------------|-------------|
| `Partial<T>` | Makes all properties optional | PATCH/update payloads |
| `Omit<T, K>` | Removes specified key(s) from a type | "Create" inputs (before `id` is assigned) |
| `Required<T>` | Makes all properties required (opposite of Partial) | Ensuring a complete object |
| `Pick<T, K>` | Keeps only specified key(s) (opposite of Omit) | Selecting a subset of properties |
| `Readonly<T>` | Makes all properties read-only | Immutable config objects |
| `Record<K, V>` | Object type with keys of type K and values of type V | Lookup tables / dictionaries |

> Utility types let you **derive** new types from existing ones without repeating yourself. If you change the base type, all derived `Partial<>`, `Omit<>`, and `Pick<>` types update automatically.

---

# 10. Generics

## 10.1 Generic Functions

A **generic** is a type placeholder that gets filled in when the function is called. It lets you write one function that works correctly with multiple types, without losing type safety.

```typescript
// ❌ Without generics — forces you to choose one type or use any
function getFirstItem(arr: string[]): string {
    return arr[0]
}
// This only works for string arrays. A number[] version would be duplicate code.

// ✅ With generics — works for any array type
function getFirstItem<T>(arr: T[]): T {
    return arr[0]
}

// TypeScript infers T = string from the argument
const firstName = getFirstItem(["Alice", "Bob"])   // type: string

// TypeScript infers T = number from the argument
const firstPrice = getFirstItem([12.99, 14.99])    // type: number
```

**Anatomy of a generic function:**

```
function getFirstItem < T > (arr: T[]): T {
                       ^^^        ^^    ^
                  type param   uses T  returns T
```

## 10.2 Explicit Generic Calls

```typescript
// TypeScript infers T automatically from the argument — usually preferred
const result = getFirstItem(["a", "b"])       // T inferred as string

// Or you can explicitly specify T — useful when inference cannot determine the type
const result = getFirstItem<string>(["a", "b"])  // T explicitly string
const result = getFirstItem<number | string>(mixedArray)
```

| Method | Syntax | When to use |
|--------|--------|-------------|
| Inferred generic | `fn(arg)` | Most of the time — TypeScript infers correctly |
| Explicit generic | `fn<Type>(arg)` | When inference is ambiguous or you want to document the intent |

## 10.3 Generics with Constraints

```typescript
// T must extend an object with a 'name' property
function getNames<T extends { name: string }>(items: T[]): string[] {
    return items.map(item => item.name)
}

getNames([{ name: "Alice", age: 30 }])   // ✅ Has name property
getNames([1, 2, 3])                       // ❌ Error: number has no 'name' property
```

The `extends` keyword in a generic **constrains** what types are accepted. This is more specific than `any` but more flexible than a fixed type.

```typescript
// Real example from the pizza app
function getMenuItemById<T extends { id: number }>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id)
}

// Works for Pizza[], Order[], or any object array that has an id
const pizza = getMenuItemById(pizzas, 3)    // returns Pizza | undefined
const order = getMenuItemById(orders, 1)    // returns Order | undefined
```

---

# 11. The `tsconfig.json`

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "CommonJS",
        "strict": true,
        "outDir": "./dist",
        "rootDir": "./src"
    }
}
```

| Option | What it does | Recommended value |
|--------|-------------|-------------------|
| `"target"` | The JavaScript version to compile down to | `"ES2020"` or `"ES2022"` |
| `"module"` | The module system for output files | `"CommonJS"` for Node, `"ESNext"` for browsers |
| `"strict"` | Enables all strict checks (including `strictNullChecks`) | `true` — always |
| `"outDir"` | Where compiled `.js` files are written | `"./dist"` |
| `"rootDir"` | The root of your `.ts` source files | `"./src"` |
| `"esModuleInterop"` | Makes `import x from 'module'` work for CommonJS packages | `true` |

> **Always enable `"strict": true`.** It activates `strictNullChecks`, `strictFunctionTypes`, and several other checks that catch entire categories of bugs. Starting without strict mode and enabling it later is much harder.

---

# 12. Quick Reference Cheatsheet

## Type Annotation Syntax

```typescript
// Variables
let name: string = "Alice"
let age: number = 30
let active: boolean = true

// Functions
function greet(name: string): string { return `Hi ${name}` }
const add = (a: number, b: number): number => a + b

// Arrays
let tags: string[] = ["ts", "js"]
let scores: Array<number> = [95, 87, 72]

// Custom types
type User = { id: number; name: string; email?: string }
const user: User = { id: 1, name: "Alice" }

// Union types
let id: string | number = "USR-001"

// Literal types
type Direction = "north" | "south" | "east" | "west"

// Optional chaining + nullish coalescing
const email = user.email?.toLowerCase() ?? "no-email"
```

## Utility Types Cheatsheet

```typescript
type User = { id: number; name: string; role: string }

type A = Partial<User>         // { id?: number; name?: string; role?: string }
type B = Required<User>        // enforces all (reverses Partial)
type C = Readonly<User>        // { readonly id: number; ... }
type D = Omit<User, "id">      // { name: string; role: string }
type E = Pick<User, "id"|"name"> // { id: number; name: string }
type F = Record<string, User>  // { [key: string]: User }
```

## Type Narrowing Cheatsheet

```typescript
function process(value: string | number | null) {
    if (value === null)             { /* value: null */ }
    else if (typeof value === "string") { /* value: string */ }
    else                            { /* value: number */ }
}
```

## Generics Cheatsheet

```typescript
// Generic function
function identity<T>(value: T): T { return value }

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
}

// Generic with default
function createPair<T = string>(a: T, b: T): [T, T] { return [a, b] }
```

---

# 13. How to Run

The TypeScript Fundamentals module is a collection of code exercises rather than a standalone runnable project. The concepts are applied directly inside Scrimba's in-browser TypeScript scrims.

To compile and run TypeScript locally:

```bash
# Install TypeScript globally
npm install -g typescript

# Compile a TypeScript file
tsc index.ts

# Run the compiled output
node index.js

# Watch mode — recompiles on every save
tsc --watch index.ts
```

To use a `tsconfig.json`-driven project:

```bash
npm install
npx tsc          # compile all files per tsconfig.json
node dist/index.js
```

---

# 14. Course Reference

* **Course:** [Scrimba Fullstack Web Development Path](https://scrimba.com/learn/fullstack)
* **Module:** 16 — TypeScript
* **Sub-module:** 01 — TypeScript Fundamentals
* **Topics covered:** Basic type annotations, type aliases, nested object types, optional properties, arrays, literal types, union types, type narrowing, `void`, `any`, utility types (`Partial`, `Omit`), generics, `tsconfig.json`
* **Builds toward:** `02. TypeScript in React` — which applies these fundamentals inside React components, `useState`, and component props
