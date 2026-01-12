// DATE CONSTRUCTOR - SIMPLE NOTES

// ============ CREATE DATES ============

// Current date/time
const now = new Date();

// From string
const date1 = new Date("2024-12-25");
const date2 = new Date("2024-12-25T10:30:00");

// From components (year, month, day, hour, min, sec)
// ⚠️ Month is 0-indexed: 0=Jan, 11=Dec
const date3 = new Date(2024, 11, 25); // Dec 25, 2024
const date4 = new Date(2024, 0, 1, 10, 30, 0); // Jan 1, 2024, 10:30:00

// From timestamp (milliseconds since 1970)
const date5 = new Date(1735132800000);

// ============ GET METHODS ============

const d = new Date("2024-12-25T10:30:45");

d.getFullYear(); // 2024
d.getMonth(); // 11 (December - 0-indexed!)
d.getDate(); // 25 (day of month)
d.getDay(); // Day of week (0=Sunday, 6=Saturday)

d.getHours(); // 10
d.getMinutes(); // 30
d.getSeconds(); // 45

d.getTime(); // Timestamp in milliseconds

// ============ SET METHODS ============

const d2 = new Date();

d2.setFullYear(2025);
d2.setMonth(5); // June (0-indexed)
d2.setDate(15);
d2.setHours(14);
d2.setMinutes(30);
d2.setSeconds(0);

// ============ USEFUL STATIC METHODS ============

Date.now(); // Current timestamp
Date.parse("2024-12-25"); // String to timestamp

// ============ TO STRING ============

const d3 = new Date("2024-12-25T10:30:00");

d3.toString(); // "Wed Dec 25 2024 10:30:00..."
d3.toDateString(); // "Wed Dec 25 2024"
d3.toTimeString(); // "10:30:00..."
d3.toISOString(); // "2024-12-25T10:30:00.000Z"
d3.toLocaleDateString(); // "12/25/2024"
d3.toLocaleTimeString(); // "10:30:00 AM"

// ============ DATE ARITHMETIC ============

// Add days
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

// Add months
const nextMonth = new Date(today);
nextMonth.setMonth(today.getMonth() + 1);

// Difference between dates
const date1ms = new Date("2024-12-25");
const date2ms = new Date("2024-12-20");
const diffMs = date1ms - date2ms; // Difference in milliseconds
const diffDays = diffMs / (1000 * 60 * 60 * 24); // Convert to days

// ============ COMPARE DATES ============

const a = new Date("2024-12-25");
const b = new Date("2024-12-20");

if (a > b) console.log("a is later");
if (a < b) console.log("b is later");

// Compare exact time
if (a.getTime() === b.getTime()) console.log("same");

// ============ USEFUL FUNCTIONS ============

// Format date as YYYY-MM-DD
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Clone date
const original = new Date();
const clone = new Date(original);

// Check valid date
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

// ============ COMMON MISTAKES ============

// ❌ Month is 0-indexed
new Date(2024, 12, 25); // This is Jan 25, 2025!

// ✅ Correct
new Date(2024, 11, 25); // Dec 25, 2024

// ❌ Comparing with ==
const x = new Date("2024-12-25");
const y = new Date("2024-12-25");
x == y; // false (different objects)

// ✅ Compare timestamps
x.getTime() === y.getTime(); // true

// ❌ Modifying without cloning
const orig = new Date();
const copy = orig; // Same reference!
copy.setDate(15); // Changes orig too

// ✅ Clone first
const copy2 = new Date(orig);

// ============ QUICK REFERENCE ============

// Get current timestamp: Date.now()
// Month is 0-11 (not 1-12)
// getDay(): 0=Sunday, 6=Saturday
// Always clone before modifying
// Use getTime() to compare dates
