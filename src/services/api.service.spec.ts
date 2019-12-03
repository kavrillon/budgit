import { mockFetchError, mockFetchSuccess } from '../../tests/mocks/fetch';
import { get } from './api.service';

describe('get', () => {
  describe('when fetch is ok', () => {
    beforeEach(() => {
      window.fetch = mockFetchSuccess({ id: 1 });
    });

    it(`should return json data`, () => {
      get('url').then(o => expect(o).toMatchObject({ id: 1 }));
    });
  });

  describe('when fetch is ko', () => {
    beforeEach(() => {
      window.fetch = mockFetchError();
    });

    it(`should reject with error`, async () => {
      window.fetch = mockFetchError();
      get('url').catch(e => expect(e).toBe('Error while fetching'));
    });
  });
});
