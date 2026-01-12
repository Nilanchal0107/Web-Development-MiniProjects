// IMPORT/EXPORT DEFAULT NOTES

// ============ EXPORT DEFAULT ============

// Method 1: Export default while declaring
export default function greet() {
  return "Hello";
}

export default class User {
  constructor(name) {
    this.name = name;
  }
}

export default {
  name: "App",
  version: "1.0.0"
};

// Method 2: Declare then export
function calculate(x) {
  return x * 2;
}
export default calculate;

// Method 3: Export anonymous
export default function() {
  console.log("Anonymous function");
}

export default class {
  constructor() {
    this.type = "anonymous";
  }
}

// Method 4: Export expression directly
export default (x, y) => x + y;

export default "Hello World";

export default 42;

export default [1, 2, 3, 4];

// ❌ Cannot use const/let/var with default
export default const x = 5; // Error!

// ✅ Do this instead
const x = 5;
export default x;

// ============ IMPORT DEFAULT ============

// Method 1: Import with any name
import myFunction from './module.js';
import MyClass from './module.js';
import config from './module.js';

// No curly braces needed
import User from './User.js';
const user = new User("Alice");

// Method 2: Import with different names
import Calculator from './calc.js';
import Calc from './calc.js';
import compute from './calc.js';
// All import the same default export - name doesn't matter

// ============ EXAMPLES ============

// File: User.js
export default class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  greet() {
    return `Hello, ${this.name}`;
  }
}

// File: app.js
import User from './User.js';
import Person from './User.js'; // Can use any name

const user = new User("John", "john@example.com");
console.log(user.greet()); // "Hello, John"

// File: config.js
export default {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

// File: app.js
import config from './config.js';
console.log(config.apiUrl);

// File: logger.js
export default function log(message) {
  console.log(`[LOG]: ${message}`);
}

// File: app.js
import log from './logger.js';
import logger from './logger.js'; // Any name works
log("Application started");

// ============ MIXING DEFAULT & NAMED ============

// File: utils.js
export default function main() {
  console.log("Main function");
}

export const helper1 = () => "helper 1";
export const helper2 = () => "helper 2";

// File: app.js - Method 1
import main, { helper1, helper2 } from './utils.js';
// Default first, then named in {}

// File: app.js - Method 2
import { default as main, helper1 } from './utils.js';

// File: app.js - Method 3
import * as utils from './utils.js';
utils.default(); // Access default
utils.helper1(); // Access named

// ============ RE-EXPORTING DEFAULT ============

// File: components/Button.js
export default class Button {
  render() {
    return "<button>Click</button>";
  }
}

// File: components/index.js
export { default as Button } from './Button.js';
export { default as Input } from './Input.js';

// File: app.js
import { Button, Input } from './components/index.js';

// Alternative: Re-export as default
export { Button as default } from './Button.js';

// File: api/index.js
import api from './api.js';
export default api;
// Same as: export { default } from './api.js';

// ============ DYNAMIC IMPORT ============

// Default export with dynamic import
const module = await import('./module.js');
module.default(); // Access default export

// Destructure default
const { default: myFunc } = await import('./module.js');
myFunc();

// Conditional loading
let component;
if (isMobile) {
  const { default: Mobile } = await import('./Mobile.js');
  component = Mobile;
} else {
  const { default: Desktop } = await import('./Desktop.js');
  component = Desktop;
}

// ============ COMMON PATTERNS ============

// Pattern 1: Main class export
// File: Database.js
export default class Database {
  connect() {}
  query() {}
}

// File: app.js
import DB from './Database.js';
const db = new DB();

// Pattern 2: Configuration object
// File: config.js
export default {
  development: {
    apiUrl: "http://localhost:3000"
  },
  production: {
    apiUrl: "https://api.example.com"
  }
};

// File: app.js
import config from './config.js';
const api = config[process.env.NODE_ENV].apiUrl;

// Pattern 3: Main function with helpers
// File: api.js
async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

export default fetchData;
export const API_URL = "https://api.example.com";
export const TIMEOUT = 5000;

// File: app.js
import fetchData, { API_URL } from './api.js';

// Pattern 4: Factory function
// File: createStore.js
export default function createStore(initialState) {
  let state = initialState;
  
  return {
    getState: () => state,
    setState: (newState) => state = newState
  };
}

// File: app.js
import createStore from './createStore.js';
const store = createStore({ count: 0 });

// ============ REACT COMPONENT EXAMPLE ============

// File: Button.jsx
export default function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

// File: App.jsx
import Button from './Button.jsx';
// Can import with any name
import MyButton from './Button.jsx';

function App() {
  return <Button label="Click me" />;
}

// ============ DEFAULT EXPORT VARIATIONS ============

// Exporting object
export default {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

// Exporting array
export default ["apple", "banana", "orange"];

// Exporting arrow function
export default (x) => x * x;

// Exporting class expression
export default class {
  constructor(value) {
    this.value = value;
  }
};

// ============ COMMON MISTAKES ============

// ❌ Cannot have multiple default exports
export default function fn1() {}
export default function fn2() {} // Error!

// ❌ Wrong syntax
export default const x = 5; // Error!

// ✅ Correct
const x = 5;
export default x;

// ❌ Using {} with default import
import { myFunction } from './module.js'; // Wrong if it's default
// ✅ Correct
import myFunction from './module.js';

// ❌ Trying to destructure default
import { default } from './module.js'; // Error!
// ✅ Correct
import { default as myName } from './module.js';

// ❌ Forgetting 'default' in re-export
export { MyClass } from './MyClass.js'; // Wrong for default
// ✅ Correct
export { default as MyClass } from './MyClass.js';

// ============ NAMED vs DEFAULT COMPARISON ============

// Named Export
export function add() {} // Must use exact name
import { add } from './math.js'; // Must use {}

// Default Export
export default function add() {} // Any name works
import calculate from './math.js'; // No {}
import sum from './math.js'; // Different name OK

// ============ WHEN TO USE DEFAULT ============

// ✅ Good for default export:
// - Main class in a file
// - Single utility function
// - Primary component
// - Configuration object
// - Factory function

// ❌ Avoid default export:
// - Multiple related utilities
// - Constants and types
// - When tree-shaking matters
// - When clear names are important

// ============ IMPORT BOTH DEFAULT & NAMED ============

// File: math.js
export default function multiply(a, b) {
  return a * b;
}

export const PI = 3.14159;
export const E = 2.71828;

// File: app.js - All import styles
import multiply from './math.js'; // Default only
import { PI, E } from './math.js'; // Named only
import multiply, { PI, E } from './math.js'; // Both
import * as math from './math.js'; // Everything

console.log(multiply(5, 3)); // 15
console.log(PI); // 3.14159
console.log(math.default(5, 3)); // 15
console.log(math.PI); // 3.14159

// Best Practices
// ✅ Use default for main/primary export
// ✅ One default export per file
// ✅ Name file same as default export (User.js → User class)
// ✅ Use default for React components
// ✅ Combine with named exports when needed
// ❌ Don't use default if exporting many things
// ❌ Avoid default with TypeScript (harder to refactor)
// ❌ Don't export primitives as default (use named)
