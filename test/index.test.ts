import { adToBs, bsToAd, ageCalculater, dateDifference, getTodayDate } from "../src/index.js";

// Simple test function
function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`Test failed: ${message}`);
    process.exit(1);
  } else {
    console.log(`Test passed: ${message}`);
  }
}

console.log("Running Tests...");

// --- Existing Tests ---

console.log(bsToAd("2062-02-10")); // Should return "2009-11-25" in AD

// Test BS to AD
assert(
  bsToAd("2078-01-01") === "2021-04-14",
  "BS 2078-01-01 should be AD 2021-04-14"
);

// Test invalid inputs
try {
  bsToAd("2100-01-01");
  assert(false, "BS year 2100 should throw error");
} catch (e: any) {
  assert(e.message === "Invalid BS date", "BS year 2100 error message");
}

try {
  bsToAd("2078-13-01");
  assert(false, "BS invalid month should throw error");
} catch (e: any) {
  assert(e.message === "Invalid BS date", "BS invalid month error message");
}

try {
  adToBs("1900-01-01");
  assert(false, "AD date before reference should throw error");
} catch (e: any) {
  assert(
    e.message === "AD date is before reference date (1943-04-14)",
    "AD date before reference error message"
  );
}

try {
  adToBs("2025-04-17a");
  assert(false, "Invalid AD format should throw error");
} catch (e: any) {
  assert(
    e.message === "Invalid date format. Use YYYY-MM-DD",
    "Invalid AD format error message"
  );
}

// --- New Feature Tests ---

// Test getTodayDate
const today = getTodayDate();
console.log("Today:", today);
assert(typeof today.todayAdDate === "string", "todayAdDate should be string");
assert(typeof today.todayBSDate === "string", "todayBSDate should be string");

// Test dateDifference
const diff1 = dateDifference("2022-01-01", "2022-01-10", "AD");
assert(diff1 === 9, "Date difference AD should be 9 days");

const diff2 = dateDifference("2078-01-01", "2078-01-10", "BS");
assert(diff2 === 9, "Date difference BS should be 9 days");

// Test ageCalculater
// Example: Born 2000-01-01 AD. Today is dynamic, so we verify structure/logic roughly or mock?
// We'll test with fixed dates logic if we could, but ageCalculater uses getTodayDate() internally.
// So we can only check if it returns valid structure.
const age = ageCalculater("2000-01-01", "AD");
console.log("Age (Born 2000-01-01 AD):", age);
assert(typeof age.years === "number", "Age years should be number");
assert(typeof age.months === "number", "Age months should be number");
assert(typeof age.days === "number", "Age days should be number");
assert(age.years >= 0, "Age years should be non-negative");

const ageBs = ageCalculater("2056-09-17", "BS"); // Approx 2000 AD
console.log("Age (Born 2056-09-17 BS):", ageBs);
assert(typeof ageBs.years === "number", "BS Age years should be number");

console.log("All tests passed!");
