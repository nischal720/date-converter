import {
  REFERENCE_BS,
  REFERENCE_AD,
  calendarData
} from "../data/calendarData.js";

import { parseDateString, formatDate } from "../utils/dateUtils.js";
import { isValidBsDate } from "../utils/validators.js";

// Calculate total BS days from REFERENCE_BS to input BS date
function bsDaysSinceReference(bsYear, bsMonth, bsDay) {
  let totalDays = 0;

  // Years
  for (let year = REFERENCE_BS.year; year < bsYear; year++) {
    if (!calendarData?.[year]) {
      throw new Error(`Year ${year} not in calendar data`);
    }
    totalDays += calendarData[year][12]; // Total days in year
  }

  // Months
  for (let month = 1; month < bsMonth; month++) {
    totalDays += calendarData[bsYear][month - 1];
  }

  // Days
  totalDays += bsDay - 1;

  return totalDays;
}

// Convert BS to AD (input and output as YYYY-MM-DD)
function bsToAd(bsDateStr) {
  const { year, month, day } = parseDateString(bsDateStr);

  if (!isValidBsDate(year, month, day)) {
    throw new Error("Invalid BS date");
  }

  // Calculate days since reference
  const daysSinceReference = bsDaysSinceReference(year, month, day);

  // Add days to reference AD date
  const resultDate = new Date(REFERENCE_AD);
  resultDate.setDate(REFERENCE_AD.getDate() + daysSinceReference);

  return formatDate({
    year: resultDate.getFullYear(),
    month: resultDate.getMonth() + 1, // 1-based
    day: resultDate.getDate()
  });
}

export { bsToAd };
