declare function getTodayDate(): {
    todayAdDate: string;
    todayBSDate: string;
};
declare function dateDifference(date1: string, date2: string, dateType?: "AD" | "BS"): number;
declare function ageCalculater(date: string, dateType?: "AD" | "BS"): {
    years: number;
    months: number;
    days: number;
};
export { getTodayDate, dateDifference, ageCalculater };
