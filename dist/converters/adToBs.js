import { calendarData, REFERENCE_BS, REFERENCE_AD } from "../data/calendarData.js";
import { isValidAdDate } from "../utils/validators.js";
import { parseDateString, formatDate, daysBetweenAdDates } from "../utils/dateUtils.js";
// Convert AD to BS (input and output as YYYY-MM-DD)
function adToBs(adDateStr) {
    const { year, month, day } = parseDateString(adDateStr);
    if (!isValidAdDate(year, month, day)) {
        throw new Error("Invalid AD date");
    }
    // Calculate days from reference AD to input AD
    const inputDate = new Date(year, month - 1, day);
    const totalDays = daysBetweenAdDates(REFERENCE_AD, inputDate);
    if (totalDays < 0) {
        throw new Error("AD date is before reference date (1943-04-14)");
    }
    // Find BS year
    let remainingDays = totalDays;
    let currentYear = REFERENCE_BS.year;
    while (remainingDays >= calendarData[currentYear][12] &&
        currentYear <= 2099) {
        remainingDays -= calendarData[currentYear][12];
        currentYear++;
    }
    if (currentYear > 2099) {
        throw new Error("BS year exceeds available data (2099)");
    }
    // Find month
    let currentMonth = 1;
    while (remainingDays >= calendarData[currentYear][currentMonth - 1] &&
        currentMonth <= 12) {
        remainingDays -= calendarData[currentYear][currentMonth - 1];
        currentMonth++;
    }
    // If remainingDays is exactly the number of days in the month, move to next month
    if (currentMonth <= 12 &&
        remainingDays === calendarData[currentYear][currentMonth - 1]) {
        remainingDays = 0;
        currentMonth++;
    }
    // Adjust for month overflow
    if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
        if (currentYear > 2099) {
            throw new Error("BS year exceeds available data (2099)");
        }
    }
    // Remaining days are the day of the month (1-based)
    const currentDay = remainingDays + 1;
    // Validate the resulting BS date
    if (!calendarData[currentYear] ||
        currentDay > calendarData[currentYear][currentMonth - 1]) {
        throw new Error("Calculated BS date is invalid");
    }
    return formatDate({
        year: currentYear,
        month: currentMonth,
        day: currentDay
    });
}
export { adToBs };
