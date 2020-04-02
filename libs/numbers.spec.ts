import { formatAmount, round } from './numbers';

describe('numbers', () => {
  describe('formatAmount', () => {
    it('should add a the currency symbol', () => {
      expect(formatAmount(432, 0, false).endsWith('€')).toBe(true);
    });

    it('should set a comma decimal separator', () => {
      expect(formatAmount(432.543546, 2, false).endsWith(',54 €')).toBe(true);
    });

    it('should add 0 for missing decimals', () => {
      expect(formatAmount(1.11, 5, false)).toMatch('1,11000 €');
    });

    it('should not set dot separator for decimals', () => {
      expect(formatAmount(1.11323432, 8, false)).toMatch('1,11323432 €');
    });

    it('should set a dot separator for thousands', () => {
      expect(formatAmount(11323432, 0, false)).toMatch('11.323.432 €');
    });

    describe('with decimals required', () => {
      it('should return the given decimals', () => {
        expect(formatAmount(432.543546, 5, false)).toMatch('432,54355 €');
        expect(formatAmount(432.543546, 1, false)).toMatch('432,5 €');
      });

      it('should return two decimals by default', () => {
        expect(formatAmount(432.543546)).toMatch('432,54 €');
      });
    });

    describe('without decimals required', () => {
      it('should return no decimals', () => {
        expect(formatAmount(432.543546, 0, false)).toMatch('433 €');
      });
    });

    describe('without positive prefix', () => {
      it('should not add a + symbol', () => {
        expect(formatAmount(432.543546, 2, false)).toMatch('432,54 €');
      });

      it('should not add a + symbol by default', () => {
        expect(formatAmount(432.543546, 2)).toMatch('432,54 €');
      });
    });

    describe('with positive prefix', () => {
      it('should add a + symbol when the result is positive', () => {
        expect(formatAmount(432.543546, 2, true)).toMatch('+432,54 €');
      });
    });
  });
});

describe('round', () => {
  it('should round the number with 2 decimals', () => {
    expect(round(432.543546)).toBe(432.54);
  });

  it('should round upper when the next decimal is 5', () => {
    expect(round(432.54553)).toBe(432.55);
    expect(round(432.54753)).toBe(432.55);
  });

  it('should round down when the next decimal lower than 5', () => {
    expect(round(432.54253)).toBe(432.54);
    expect(round(432.54453)).toBe(432.54);
  });
});
