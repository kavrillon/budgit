import { Account } from '@types';
import { aggregateAccounts } from './account.service';

const TODAY = new Date();

let A_MONTH_AGO = new Date();
A_MONTH_AGO.setMonth(A_MONTH_AGO.getMonth() - 1);

let TWO_MONTH_AGO = new Date();
TWO_MONTH_AGO.setMonth(TWO_MONTH_AGO.getMonth() - 2);

const MOCK_UNGROUPED_ACCOUNTS: Account[] = [
  { id: 'ACC_1', lastUpdate: TWO_MONTH_AGO, total: 25 },
  { id: 'ACC_1', lastUpdate: A_MONTH_AGO, total: 50 },
  { id: 'ACC_2', lastUpdate: TODAY, total: 100 },
  { id: 'ACC_1', lastUpdate: TODAY, total: 100 },
];

describe('account.service', () => {
  describe('aggregateAccounts', () => {
    let result: Account[];

    beforeEach(() => {
      result = aggregateAccounts(MOCK_UNGROUPED_ACCOUNTS);
    });

    it('should return a list', () => {
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return one account per id', () => {
      const ids = result.map(a => a.id);
      const hasDuplicate = ids.some((item, idx) => {
        return ids.indexOf(item) != idx;
      });
      expect(hasDuplicate).toBe(false);
    });

    it('should return most recent account for each id', () => {
      expect(result[0].lastUpdate).toBe(TODAY);
      expect(result[0].total).toBe(100);
    });
  });
});
