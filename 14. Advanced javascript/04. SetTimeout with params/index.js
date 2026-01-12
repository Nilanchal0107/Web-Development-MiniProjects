// setTimeout WITH PARAMETERS NOTES

// Basic Syntax
setTimeout(function, delay, param1, param2, ...)

// Method 1: Pass Parameters Directly
function greet(name, age) {
  console.log(`Hello ${name}, you are ${age}`);
}
setTimeout(greet, 2000, "John", 25);
// Runs after 2 seconds: "Hello John, you are 25"

// Method 2: Arrow Function (Most Common)
let name = "Alice";
setTimeout(() => {
  console.log(`Hi ${name}`);
}, 1000);

// Method 3: Anonymous Function
setTimeout(function(msg) {
  console.log(msg);
}, 1500, "Hello World");

// Multiple Parameters
function calculate(a, b, operation) {
  console.log(`${a} ${operation} ${b} = ${a + b}`);
}
setTimeout(calculate, 2000, 10, 5, "+");

// Using with Objects
const user = { name: "Bob", role: "admin" };
setTimeout((u) => {
  console.log(`User: ${u.name}, Role: ${u.role}`);
}, 1000, user);

// Storing Timer ID
let timerId = setTimeout(() => {
  console.log("This will run");
}, 3000);

// Clearing setTimeout
clearTimeout(timerId); // Cancels the timeout

// Real Example: Clear on Condition
let timer = setTimeout(() => {
  console.log("Auto logout");
}, 5000);

// Cancel if user is active
document.addEventListener("click", () => {
  clearTimeout(timer);
  console.log("Timer cancelled");
});

// Closure with Parameters
function delayedMessage(msg, delay) {
  setTimeout(() => {
    console.log(msg); // Accesses msg from closure
  }, delay);
}
delayedMessage("Hello after 2 sec", 2000);

// Loop Problem (Classic Issue)
// ❌ Wrong way
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // Prints: 3, 3, 3
  }, 1000);
}

// ✅ Fix 1: Pass parameter
for (var i = 0; i < 3; i++) {
  setTimeout((num) => {
    console.log(num); // Prints: 0, 1, 2
  }, 1000, i);
}

// ✅ Fix 2: Use let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // Prints: 0, 1, 2
  }, 1000);
}

// ✅ Fix 3: IIFE
for (var i = 0; i < 3; i++) {
  (function(num) {
    setTimeout(() => {
      console.log(num);
    }, 1000);
  })(i);
}

// Chaining Timeouts
setTimeout(() => {
  console.log("First");
  setTimeout(() => {
    console.log("Second");
    setTimeout(() => {
      console.log("Third");
    }, 1000);
  }, 1000);
}, 1000);

// Better: Using Promises
function delay(ms, msg) {
  return new Promise(resolve => {
    setTimeout(() => resolve(msg), ms);
  });
}

delay(1000, "Step 1")
  .then(msg => {
    console.log(msg);
    return delay(1000, "Step 2");
  })
  .then(msg => console.log(msg));

// With async/await
async function runSequence() {
  console.log(await delay(1000, "First"));
  console.log(await delay(1000, "Second"));
}

// Passing 'this' Context
const obj = {
  name: "Object",
  method: function() {
    // ❌ Lost context
    setTimeout(function() {
      console.log(this.name); // undefined
    }, 1000);
    
    // ✅ Arrow function preserves 'this'
    setTimeout(() => {
      console.log(this.name); // "Object"
    }, 1000);
    
    // ✅ Bind method
    setTimeout(function() {
      console.log(this.name);
    }.bind(this), 1000);
  }
};

// Recursive setTimeout (better than setInterval)
function repeat(fn, delay) {
  fn();
  setTimeout(() => repeat(fn, delay), delay);
}

// With stop condition
let count = 0;
function repeatLimited() {
  console.log(count++);
  if (count < 5) {
    setTimeout(repeatLimited, 1000);
  }
}
repeatLimited();

// Minimum Delay
setTimeout(() => console.log("Runs"), 0); // Not exactly 0ms
// Browser minimum: ~4ms, Node.js: ~1ms

// Best Practices
// ✅ Use arrow functions for 'this' context
// ✅ Clear timeouts when not needed
// ✅ Pass parameters directly when possible
// ✅ Use let in loops, not var
// ✅ Consider promises for complex sequences
// ❌ Avoid deeply nested timeouts
// ❌ Don't rely on exact timing
