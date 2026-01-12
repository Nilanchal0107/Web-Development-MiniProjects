// OBJECT DESTRUCTURING NOTES

// Basic Syntax
const obj = { a: 1, b: 2, c: 3 };
const { a, b, c } = obj;
console.log(a, b, c); // 1 2 3

// Simple Example
const user = { name: "John", age: 25 };
const { name, age } = user;
console.log(name); // "John"
console.log(age); // 25

// Renaming Variables
const person = { firstName: "Jane", lastName: "Doe" };
const { firstName: fName, lastName: lName } = person;
console.log(fName); // "Jane"

// Default Values
const product = { title: "Laptop" };
const { title, price = 999 } = product;
console.log(price); // 999 (default)

// Nested Destructuring
const student = {
  name: "Alice",
  address: {
    city: "NYC",
    zip: 10001
  }
};
const { name: studentName, address: { city, zip } } = student;
console.log(city); // "NYC"

// Rest Operator
const data = { x: 1, y: 2, z: 3, w: 4 };
const { x, y, ...rest } = data;
console.log(rest); // { z: 3, w: 4 }

// Function Parameters
function greet({ name, age }) {
  console.log(`Hi ${name}, you are ${age}`);
}
greet({ name: "Bob", age: 30 }); // "Hi Bob, you are 30"

// With Default Values in Functions
function createUser({ name = "Guest", role = "user" } = {}) {
  return { name, role };
}
console.log(createUser()); // { name: "Guest", role: "user" }

// Destructuring in Loops
const users = [
  { id: 1, name: "Tom" },
  { id: 2, name: "Jerry" }
];
for (const { id, name } of users) {
  console.log(id, name);
}

// Computed Property Names
const key = "username";
const obj2 = { username: "admin", password: "123" };
const { [key]: value } = obj2;
console.log(value); // "admin"

// Destructuring from Methods
const config = {
  getData() {
    return { status: 200, body: "OK" };
  }
};
const { status, body } = config.getData();

// Mixed with Arrays
const response = {
  data: [10, 20, 30],
  status: "success"
};
const { data: [first, second], status: reqStatus } = response;
console.log(first); // 10

// Swapping Variables (with array destructuring)
let a = 5, b = 10;
[a, b] = [b, a];
console.log(a, b); // 10 5

// Ignoring Properties
const { name: n, ...others } = { name: "X", age: 20, city: "LA" };
// only need name, ignore rest in others

// Undefined vs Null
const test = { val: null };
const { val = "default" } = test;
console.log(val); // null (not "default" - null exists)

const test2 = { };
const { val2 = "default" } = test2;
console.log(val2); // "default" (undefined)

// Common Use Cases
// API Responses
const { data: apiData, error } = await fetchAPI();

// React Props
function Component({ title, onClick, children }) {
  return <div onClick={onClick}>{title}</div>;
}

// Config Objects
const { port = 3000, host = "localhost" } = process.env;

// Best Practices
// ✅ Use for cleaner code
// ✅ Extract only needed properties
// ✅ Provide defaults when appropriate
// ✅ Great for function parameters
// ❌ Don't over-nest (hard to read)
// ❌ Be careful with null values
