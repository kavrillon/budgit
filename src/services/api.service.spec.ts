import { get } from './api.service';

const mockFetchSuccess = (data: any): jest.Mock => {
  const result = { ...data };
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => result,
      ok: true,
    }),
  );
};

const mockFetchError = (): jest.Mock => {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      statusText: 'Error while fetching',
    }),
  );
};

describe('get', () => {
  describe('when fetch is ok', () => {
    beforeEach(() => {
      window.fetch = mockFetchSuccess({ id: 1 });
    });

    it(`should call return json data`, async () => {
      expect(await get('url')).toMatchObject({ id: 1 });
    });
  });

  describe('when fetch is ko', () => {
    beforeEach(() => {
      window.fetch = mockFetchError();
    });

    it(`should throw an error`, async () => {
      const testGet = async (): Promise<any> => {
        return await get('url');
      };

      expect(testGet()).rejects.toEqual(new Error('Error while fetching'));
    });
  });
});
