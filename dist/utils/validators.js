import { calendarData } from "../data/calendarData.js";
// Validate BS date
function isValidBsDate(year, month, day) {
    if (!calendarData[year])
        return false;
    if (month < 1 || month > 12)
        return false;
    const daysInMonth = calendarData[year][month - 1];
    return day >= 1 && day <= daysInMonth;
}
// Validate AD date
function isValidAdDate(year, month, day) {
    const date = new Date(year, month - 1, day);
    return (date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day);
}
export { isValidBsDate, isValidAdDate };
