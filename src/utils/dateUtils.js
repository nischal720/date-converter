// Parse YYYY-MM-DD string into { year, month, day }
function parseDateString(dateStr) {
  const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const match = dateStr.match(regex);
  if (!match) {
    throw new Error("Invalid date format. Use YYYY-MM-DD");
  }
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const day = parseInt(match[3], 10);
  return { year, month, day };
}

// Format { year, month, day } as YYYY-MM-DD
function formatDate({ year, month, day }) {
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

// Calculate days between two AD dates
function daysBetweenAdDates(date1, date2) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((date2 - date1) / msPerDay);
}
module.exports = { parseDateString, formatDate, daysBetweenAdDates };
