import { mockFetchError, mockFetchSuccess } from '../../tests/mocks/fetch';
import { getAccount } from './account.service';

describe('getAccount', () => {
  describe('when account exists', () => {
    it('should return data', async () => {
      window.fetch = mockFetchSuccess({ id: 1 });
      getAccount(1).then(o => expect(o).toMatchObject({ id: 1 }));
    });
  });

  describe('when no account', () => {
    it('should reject with error', () => {
      window.fetch = mockFetchError();
      getAccount(1).catch(e => expect(e).toBe('No account 1'));
    });
  });
});
