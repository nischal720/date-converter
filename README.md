# BS-AD Date Converter

A versatile JavaScript/TypeScript package to convert dates between Bikram Sambat (BS) and Gregorian (AD) calendars, along with utilities for age calculation, date difference, and getting current dates. Supports dates in `YYYY-MM-DD` format.

## Features

- **Date Conversion**: Convert AD to BS and BS to AD.
- **TypeScript Support**: Fully written in TypeScript with type definitions included.
- **Date Utilities**:
  - Calculate age in years, months, and days.
  - Find the difference between two dates.
  - Get the current date in both AD and BS formats.
- **Validation**: Robust validation for dates within the supported range.

## Installation

```bash
npm install bs-ad-date-converter
```

## Usage

### Import

```typescript
import {
  bsToAd,
  adToBs,
  ageCalculater,
  dateDifference,
  getTodayDate,
} from "bs-ad-date-converter";
```

### Date Conversion

#### Convert BS to AD

```typescript
const adDate = bsToAd("2078-01-01");
console.log(adDate); // Output: "2021-04-14"
```

#### Convert AD to BS

```typescript
const bsDate = adToBs("2021-04-14");
console.log(bsDate); // Output: "2078-01-01"
```

### Utilities

#### Get Current Date

Returns the current date in both AD and BS formats.

```typescript
const { todayAdDate, todayBSDate } = getTodayDate();
console.log(`Today: ${todayBSDate} (BS) / ${todayAdDate} (AD)`);
```

#### Calculate Age

Calculate age from a birth date. You can specify the input date type ('AD' or 'BS').

```typescript
// From AD DOB
const ageAD = ageCalculater("2000-01-01", "AD");
console.log(ageAD);
// Output: { years: 25, months: 0, days: 8 } (results vary based on current date)

// From BS DOB
const ageBS = ageCalculater("2056-09-17", "BS");
console.log(ageBS);
```

#### Date Difference

Calculate the number of days between two dates. Both dates must be of the same type ('AD' or 'BS').

```typescript
// Difference between two AD dates
const diffAD = dateDifference("2022-01-01", "2022-01-10", "AD");
console.log(diffAD); // Output: 9

// Difference between two BS dates
const diffBS = dateDifference("2078-01-01", "2078-01-10", "BS");
console.log(diffBS); // Output: 9
```

## API Reference

### `bsToAd(bsDateStr: string): string`

Converts a BS date string (`YYYY-MM-DD`) to AD. Throws an error if invalid.

### `adToBs(adDateStr: string): string`

Converts an AD date string (`YYYY-MM-DD`) to BS. Throws an error if invalid or out of range.

### `getTodayDate(): { todayAdDate: string, todayBSDate: string }`

Returns the current system date converted to both AD and BS strings.

### `ageCalculater(date: string, dateType: 'AD' | 'BS'): { years: number, months: number, days: number }`

Calculates the age based on the provided date of birth. defaults `dateType` to 'AD'.

### `dateDifference(date1: string, date2: string, dateType: 'AD' | 'BS'): number`

Calculates the absolute difference in days between `date1` and `date2`. defaults `dateType` to 'AD'.

## Supported Date Range

| Calendar | Start Date | End Date   |
| -------- | ---------- | ---------- |
| BS       | 1970-01-01 | 2099-12-30 |
| AD       | 1913-04-13 | 2043-04-13 |

## Error Handling

Errors are thrown for invalid formats or dates outside the supported range.

```typescript
try {
  bsToAd("2100-01-01");
} catch (e) {
  console.error(e.message); // "Invalid BS date" or range error
}
```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

## License

MIT © [Nischal Dhakal](https://github.com/nischal720)

## Author

- **Nischal Dhakal** - [GitHub](https://github.com/nischal720)
