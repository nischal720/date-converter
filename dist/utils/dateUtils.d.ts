declare function parseDateString(dateStr: string): {
    year: number;
    month: number;
    day: number;
};
declare function formatDate({ year, month, day }: {
    year: number;
    month: number;
    day: number;
}): string;
declare function daysBetweenAdDates(date1: Date, date2: Date): number;
export { parseDateString, formatDate, daysBetweenAdDates };
