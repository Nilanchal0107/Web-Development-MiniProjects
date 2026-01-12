// EVENT LOOP NOTES

// Basic Concept
// JS is single-threaded but can handle async operations
// Event Loop coordinates execution between Call Stack, Web APIs, and Callback Queue

// Components:
// 1. Call Stack - where code executes
// 2. Web APIs - browser APIs (setTimeout, fetch, DOM events)
// 3. Callback Queue (Task Queue) - regular callbacks
// 4. Microtask Queue - promises, queueMicrotask
// 5. Event Loop - checks and moves tasks to call stack

// Execution Order
console.log("1"); // Call Stack - runs first

setTimeout(() => {
  console.log("2"); // Callback Queue - runs last
}, 0);

Promise.resolve().then(() => {
  console.log("3"); // Microtask Queue - runs second
});

console.log("4"); // Call Stack - runs immediately

// Output: 1, 4, 3, 2

// How Event Loop Works
/*
1. Execute all synchronous code (Call Stack)
2. When stack is empty, check Microtask Queue
3. Execute ALL microtasks
4. Take ONE task from Callback Queue
5. Repeat
*/

// Detailed Example
console.log("Start");

setTimeout(() => console.log("Timeout 1"), 0);
setTimeout(() => console.log("Timeout 2"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

console.log("End");

// Output:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Timeout 2

// Microtasks vs Macrotasks
// Microtasks (higher priority):
// - Promise.then/catch/finally
// - queueMicrotask()
// - MutationObserver

// Macrotasks (lower priority):
// - setTimeout
// - setInterval
// - setImmediate (Node.js)
// - I/O operations
// - UI rendering

// Complex Example
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve()
  .then(() => {
    console.log("3");
    setTimeout(() => console.log("4"), 0);
  })
  .then(() => console.log("5"));

Promise.resolve().then(() => console.log("6"));

console.log("7");

// Output: 1, 7, 3, 6, 5, 2, 4

// Nested Promises and Timeouts
setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("promise in timeout"));
}, 0);

Promise.resolve().then(() => {
  console.log("promise 1");
  setTimeout(() => console.log("timeout in promise"), 0);
});

// Output:
// promise 1
// timeout 1
// promise in timeout
// timeout in promise

// async/await (syntactic sugar for promises)
async function example() {
  console.log("1");
  await Promise.resolve();
  console.log("2"); // Runs as microtask
}

console.log("3");
example();
console.log("4");

// Output: 3, 1, 4, 2

// Blocking the Event Loop (BAD)
// ❌ Don't do this
function blockingCode() {
  const start = Date.now();
  while (Date.now() - start < 3000) {} // Blocks for 3 seconds
  console.log("Finally done");
}

// This blocks everything - UI freezes, no other code runs
blockingCode();

// ✅ Non-blocking alternative
function nonBlocking() {
  setTimeout(() => {
    console.log("Done after 3 seconds");
  }, 3000);
}

// Starvation Example
function starve() {
  Promise.resolve().then(() => {
    console.log("Microtask");
    starve(); // Creates infinite microtasks
  });
}

setTimeout(() => console.log("This never runs"), 0);
starve(); // Macrotasks are starved

// queueMicrotask
console.log("1");

queueMicrotask(() => console.log("2"));

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1, 4, 2, 3 (microtasks run in order queued)

// Real-World Example: API Call
console.log("Start fetching");

fetch("https://api.example.com/data")
  .then(res => res.json())
  .then(data => console.log("Data:", data))
  .catch(err => console.log("Error:", err));

console.log("Fetch initiated");

// Output:
// Start fetching
// Fetch initiated
// (later) Data: {...}

// Process.nextTick (Node.js only)
// Even higher priority than microtasks in Node.js
console.log("1");

process.nextTick(() => console.log("2"));

Promise.resolve().then(() => console.log("3"));

console.log("4");

// Output: 1, 4, 2, 3

// Rendering and Event Loop (Browser)
// Browser tries to render at 60fps (every 16ms)
// Rendering happens after microtasks, before next macrotask

console.log("Before animation");

requestAnimationFrame(() => {
  console.log("Animation frame"); // Runs before next paint
});

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

// Output: Before animation, Promise, Animation frame, Timeout

// Common Pitfalls
// ❌ Expecting setTimeout(fn, 0) to run immediately
setTimeout(() => console.log("Not immediate"), 0);

// ❌ Infinite microtasks blocking macrotasks
function infiniteMicrotask() {
  Promise.resolve().then(infiniteMicrotask);
}

// ❌ Heavy sync operations blocking UI
for (let i = 0; i < 1e9; i++) {} // Freezes browser

// ✅ Break up work
let i = 0;
function processChunk() {
  for (let j = 0; j < 1000; j++) {
    i++;
  }
  if (i < 1e6) {
    setTimeout(processChunk, 0); // Allow other tasks to run
  }
}

// Visualization
/*
Call Stack: [main()]
Web APIs: []
Microtask Queue: []
Callback Queue: []

→ Execute sync code
→ Clear microtask queue (all)
→ Take one callback from queue
→ Repeat
*/

// Best Practices
// ✅ Don't block the event loop
// ✅ Understand promise priority
// ✅ Use async/await for readability
// ✅ Break up heavy computations
// ❌ Avoid infinite microtasks
// ❌ Don't do heavy sync work in main thread
// ❌ Be careful with recursive promises
