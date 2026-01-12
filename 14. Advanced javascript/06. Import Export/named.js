// IMPORT/EXPORT NAMED NOTES

// ============ EXPORT (Named) ============

// Method 1: Export while declaring
export const PI = 3.14159;
export let count = 0;
export var name = "John";

export function add(a, b) {
  return a + b;
}

export class User {
  constructor(name) {
    this.name = name;
  }
}

// Method 2: Export after declaration
const API_URL = "https://api.example.com";
const MAX_USERS = 100;

function subtract(a, b) {
  return a - b;
}

class Product {
  constructor(title) {
    this.title = title;
  }
}

export { API_URL, MAX_USERS, subtract, Product };

// Method 3: Export with rename (alias)
const privateKey = "secret123";
const internalFunc = () => "internal";

export { 
  privateKey as apiKey, 
  internalFunc as publicFunc 
};

// Multiple named exports in one file
export const config = { timeout: 3000 };
export const helpers = { format: (x) => x };
export default function mainFunc() {} // Can have default too

// ============ IMPORT (Named) ============

// Method 1: Import specific exports
import { add, subtract } from './math.js';
console.log(add(5, 3)); // 8

// Method 2: Import multiple
import { PI, count, User } from './utils.js';

// Method 3: Import with rename
import { add as sum, subtract as minus } from './math.js';
console.log(sum(10, 5)); // 15

// Method 4: Import everything as namespace
import * as math from './math.js';
console.log(math.add(5, 3)); // 8
console.log(math.PI); // 3.14159

// Method 5: Import renamed exports
import { apiKey, publicFunc } from './config.js';
// Uses the exported aliases

// ============ EXAMPLES ============

// File: utils.js
export const version = "1.0.0";

export function formatDate(date) {
  return date.toLocaleDateString();
}

export class Logger {
  log(msg) {
    console.log(msg);
  }
}

export const helpers = {
  uppercase: (str) => str.toUpperCase(),
  lowercase: (str) => str.toLowerCase()
};

// File: app.js
import { version, formatDate, Logger, helpers } from './utils.js';

console.log(version); // "1.0.0"
console.log(formatDate(new Date()));

const logger = new Logger();
logger.log("Hello");

console.log(helpers.uppercase("test")); // "TEST"

// ============ RE-EXPORTING ============

// File: math/index.js
export { add, subtract } from './operations.js';
export { multiply, divide } from './advanced.js';
export * from './constants.js'; // Re-export all

// With renaming
export { default as calculate } from './calculator.js';
export { sum as add } from './helpers.js';

// File: app.js
import { add, multiply, PI } from './math/index.js';

// ============ MIXING DEFAULT & NAMED ============

// File: user.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

export const USER_ROLES = ['admin', 'user', 'guest'];
export function validateUser(user) {
  return user.name.length > 0;
}

// File: app.js
import User, { USER_ROLES, validateUser } from './user.js';
// Default comes first, then named in {}

const user = new User("Alice");
console.log(USER_ROLES); // ['admin', 'user', 'guest']

// Alternative syntax
import { default as User, USER_ROLES } from './user.js';

// ============ DYNAMIC IMPORTS ============

// Named exports with dynamic import
const module = await import('./utils.js');
console.log(module.version);
module.formatDate(new Date());

// Destructure immediately
const { add, subtract } = await import('./math.js');

// Conditional import
if (needsFeature) {
  const { feature } = await import('./feature.js');
  feature();
}

// ============ COMMON PATTERNS ============

// Pattern 1: Constants file
// File: constants.js
export const API_URL = "https://api.example.com";
export const TIMEOUT = 5000;
export const MAX_RETRIES = 3;

// File: api.js
import { API_URL, TIMEOUT } from './constants.js';

// Pattern 2: Utility functions
// File: helpers.js
export const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
export const truncate = (str, len) => str.slice(0, len);
export const reverse = (str) => str.split('').reverse().join('');

// File: app.js
import { capitalize, truncate } from './helpers.js';

// Pattern 3: Grouped exports
// File: validators.js
export function isEmail(str) { return /\S+@\S+\.\S+/.test(str); }
export function isPhone(str) { return /^\d{10}$/.test(str); }
export function isURL(str) { return /^https?:\/\//.test(str); }

// File: app.js
import * as validators from './validators.js';
validators.isEmail("test@example.com");

// ============ IMPORT SIDE EFFECTS ============

// Import without binding (just run the code)
import './polyfills.js';
import './styles.css'; // In bundlers like webpack

// ============ COMMON MISTAKES ============

// ❌ Cannot import inside blocks
if (condition) {
  import { func } from './module.js'; // Error!
}

// ✅ Use dynamic import instead
if (condition) {
  const { func } = await import('./module.js');
}

// ❌ Cannot reassign named imports
import { config } from './config.js';
config = {}; // Error! Imports are read-only

// ✅ But can mutate objects
import { settings } from './config.js';
settings.theme = "dark"; // OK if settings is an object

// ❌ Wrong syntax
import add from './math.js'; // Wrong for named export
// ✅ Correct
import { add } from './math.js';

// ❌ Missing .js extension (in browser)
import { func } from './module'; // May fail
// ✅ Include extension
import { func } from './module.js';

// ============ BARREL EXPORTS ============

// File: components/index.js (barrel file)
export { Header } from './Header.js';
export { Footer } from './Footer.js';
export { Sidebar } from './Sidebar.js';

// File: app.js
import { Header, Footer, Sidebar } from './components/index.js';
// Clean single import instead of multiple

// ============ KEY DIFFERENCES: Named vs Default ============

// Named Export:
// - Multiple exports per file
// - Must use same name (or rename with 'as')
// - Use {} when importing
// - Better for tree-shaking

// Default Export:
// - One per file
// - Can name anything when importing
// - No {} when importing
// - Good for main module export

// Best Practices
// ✅ Use named exports for utilities/multiple items
// ✅ Prefer named exports for better refactoring
// ✅ Use * as namespace for many related functions
// ✅ Create barrel files for clean imports
// ✅ Use dynamic imports for code splitting
// ❌ Don't mix too many patterns in one file
// ❌ Avoid default exports if exporting multiple items
// ❌ Don't use * import if only need few items
