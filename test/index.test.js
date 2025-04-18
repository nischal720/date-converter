const { adToBs, bsToAd } = require("../src");

// Simple test function
function assert(condition, message) {
  if (!condition) {
    console.error(`Test failed: ${message}`);
  } else {
    console.log(`Test passed: ${message}`);
  }
}

// Test BS to AD
assert(
  bsToAd("2082-01-01") === "2025-04-14",
  "BS 2082-01-01 should be AD 2025-04-14"
);
assert(
  bsToAd("2078-01-01") === "2021-04-14",
  "BS 2078-01-01 should be AD 2021-04-14"
);

// Test AD to BS
assert(
  adToBs("2025-08-16") === "2082-04-31",
  "AD 2025-08-16 should be BS 2082-04-31"
);
assert(
  adToBs("2025-04-14") === "2082-01-01",
  "AD 2025-04-14 should be BS 2082-01-01"
);
assert(
    adToBs("2025-07-16") === "2082-03-32",
    "AD 2025-07-16 should be BS 2082-03-32"
  );

// Test invalid inputs
try {
  bsToAd("2100-01-01");
  assert(false, "BS year 2100 should throw error");
} catch (e) {
  assert(e.message === "Invalid BS date", "BS year 2100 error message");
}

try {
  bsToAd("2078-13-01");
  assert(false, "BS invalid month should throw error");
} catch (e) {
  assert(e.message === "Invalid BS date", "BS invalid month error message");
}

try {
  adToBs("1900-01-01");
  assert(false, "AD date before reference should throw error");
} catch (e) {
  assert(
    e.message === "AD date is before reference date (1943-04-14)",
    "AD date before reference error message"
  );
}

try {
  adToBs("2025-04-17a");
  assert(false, "Invalid AD format should throw error");
} catch (e) {
  assert(
    e.message === "Invalid date format. Use YYYY-MM-DD",
    "Invalid AD format error message"
  );
}
