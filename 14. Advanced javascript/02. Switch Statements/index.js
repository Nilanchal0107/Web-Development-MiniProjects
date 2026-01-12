// SWITCH STATEMENT NOTES

// Basic Syntax
switch (expression) {
  case value1:
    // code
    break;
  case value2:
    // code
    break;
  default:
    // code if no match
}

// Simple Example
let day = 3;
switch (day) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  default:
    console.log("Invalid day");
}

// Multiple Cases (Fall-through)
let fruit = "apple";
switch (fruit) {
  case "apple":
  case "orange":
  case "banana":
    console.log("It's a fruit");
    break;
  case "carrot":
  case "potato":
    console.log("It's a vegetable");
    break;
  default:
    console.log("Unknown");
}

// Without break (intentional fall-through)
let grade = "B";
switch (grade) {
  case "A":
    console.log("Excellent");
  case "B":
    console.log("Good"); // This runs
  case "C":
    console.log("Fair"); // This also runs (no break)
    break;
  case "F":
    console.log("Fail");
}

// Using return in functions
function getDiscount(memberType) {
  switch (memberType) {
    case "gold":
      return 0.3;
    case "silver":
      return 0.2;
    case "bronze":
      return 0.1;
    default:
      return 0;
  }
  // No break needed when using return
}

// Strict Comparison (===)
let x = "1";
switch (x) {
  case 1: // Won't match (string !== number)
    console.log("Number 1");
    break;
  case "1": // Matches
    console.log("String 1");
    break;
}

// Switch with Expressions
let operation = "add";
let a = 5, b = 3;
switch (operation) {
  case "add":
    console.log(a + b);
    break;
  case "subtract":
    console.log(a - b);
    break;
  case "multiply":
    console.log(a * b);
    break;
  default:
    console.log("Invalid operation");
}

// Block Scope with let/const
let num = 2;
switch (num) {
  case 1: {
    let msg = "One";
    console.log(msg);
    break;
  }
  case 2: {
    let msg = "Two"; // Different scope
    console.log(msg);
    break;
  }
}

// Common Pitfalls
switch (true) {
  case score >= 90:
    grade = "A";
    break;
  case score >= 80:
    grade = "B";
    break;
  // Useful for range conditions
}

// Best Practices
// ✅ Always use break (unless intentional fall-through)
// ✅ Include default case
// ✅ Use for 3+ conditions
// ✅ Good for equality checks
// ❌ Not good for range/complex conditions
// ❌ Remember: uses strict equality (===)

// Modern Alternative: Object Lookup
const actions = {
  start: () => console.log("Starting"),
  stop: () => console.log("Stopping"),
  pause: () => console.log("Pausing")
};
let action = "start";
actions[action]?.(); // More concise than switch
