// TERNARY OPERATOR NOTES

// Basic Syntax
condition ? expressionIfTrue : expressionIfFalse

// Simple Example
let age = 18;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"

// Instead of if-else
let num = 10;
let result = num > 5 ? "Greater" : "Smaller";

// Nested Ternary (use sparingly)
let score = 85;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";

// With Functions
let isEven = (n) => n % 2 === 0 ? "Even" : "Odd";
console.log(isEven(4)); // "Even"

// Multiple Statements (use comma operator)
let x = 5;
let y = x > 3 ? (console.log("Yes"), "big") : (console.log("No"), "small");

// Nullish Assignment
let username = userInput ? userInput : "Guest";
// Or use nullish coalescing: userInput ?? "Guest"

// In JSX/React (common use)
{isLoggedIn ? <Dashboard /> : <Login />}

// Edge Cases
let val = 0 ? "truthy" : "falsy"; // "falsy" - 0 is falsy
let empty = "" ? "has value" : "empty"; // "empty"

// Best Practices
// ✅ Use for simple conditions
// ✅ Keep it readable
// ❌ Avoid deeply nested ternaries
// ❌ Don't use for complex logic

// Alternative: Logical AND (&&)
isLoggedIn && showDashboard();

// Alternative: Logical OR (||)
let name = userName || "Anonymous";