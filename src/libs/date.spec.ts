import {
  DATE_FORMAT,
  formatDateString,
  getCurrentMonth,
  getCurrentYear,
  getTimestamp,
} from './date';

const NOW = new Date();

describe('formatDateString', () => {
  it(`should format a date string in another date format`, () => {
    expect(formatDateString('12/31/19', 'MM/DD/YY', 'DD/MM/YYYY')).toBe(
      '31/12/2019',
    );
  });

  it(`should throw an error if format is not correct`, () => {
    const format = (): void => {
      formatDateString('AAA', 'MM/DD/YY', 'DD/MM/YYYY');
    };

    expect(format).toThrowError('Invalid date');
  });
});

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
  it(`should return the timestamp from a date (format: ${DATE_FORMAT})`, () => {
    expect(getTimestamp('01/06/2019')).toBe(
      1559347200 + NOW.getTimezoneOffset() * 120,
    );
  });

  it(`should return null if format is not correct`, () => {
    const get = (): void => {
      getTimestamp('AAA');
    };

    expect(get).toThrowError('Invalid date');
  });
});
