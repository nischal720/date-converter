import { adToBs } from "../converters/adToBs.js";
import { bsToAd } from "../converters/bsToAd.js";
import { parseDateString, daysBetweenAdDates, formatDate } from "./dateUtils.js";

// Get today's date in AD and BS
function getTodayDate(): { todayAdDate: string; todayBSDate: string } {
    const now = new Date();
    const todayAdDate = formatDate({
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate()
    });
    const todayBSDate = adToBs(todayAdDate);
    return { todayAdDate, todayBSDate };
}

// Calculate date difference in days
function dateDifference(
    date1: string,
    date2: string,
    dateType: "AD" | "BS" = "AD"
): number {
    let adDate1 = date1;
    let adDate2 = date2;

    if (dateType === "BS") {
        adDate1 = bsToAd(date1);
        adDate2 = bsToAd(date2);
    }

    const d1 = parseDateString(adDate1);
    const d2 = parseDateString(adDate2);

    const objDate1 = new Date(d1.year, d1.month - 1, d1.day);
    const objDate2 = new Date(d2.year, d2.month - 1, d2.day);

    return daysBetweenAdDates(objDate1, objDate2);
}

// Calculate age from date of birth
function ageCalculater(date: string, dateType: "AD" | "BS" = "AD"): { years: number; months: number; days: number } {
    let dobAd = date;
    if (dateType === "BS") {
        dobAd = bsToAd(date);
    }

    const { todayAdDate } = getTodayDate();

    const dob = parseDateString(dobAd);
    const today = parseDateString(todayAdDate);

    let years = today.year - dob.year;
    let months = today.month - dob.month;
    let days = today.day - dob.day;

    if (days < 0) {
        months--;
        // Get days in previous month of today
        const previousMonth = new Date(today.year, today.month - 1, 0);
        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

export { getTodayDate, dateDifference, ageCalculater };
