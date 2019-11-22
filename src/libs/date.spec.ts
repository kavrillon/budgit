import {
  DATE_FORMAT,
  getCurrentMonth,
  getCurrentYear,
  getTimestamp,
} from './date';

const NOW = new Date();

describe('getCurrentMonth', () => {
  it('should return the current month number (starts at 1)', () => {
    expect(getCurrentMonth()).toBe(NOW.getMonth() + 1);
  });
});

describe('getCurrentYear', () => {
  it('should return the current year (4 digits)', () => {
    expect(getCurrentYear()).toBe(NOW.getFullYear());
  });
});

describe('getTimestamp', () => {
  it(`should return a number from a date (format: ${DATE_FORMAT})`, () => {
    expect(getTimestamp('01/06/2019')).toBe(
      1559347200 + NOW.getTimezoneOffset() * 120,
    );
  });
});
