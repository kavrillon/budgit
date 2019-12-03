export const mockFetchSuccess = (data: any): jest.Mock => {
  const result = { ...data };
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => result,
      ok: true,
    }),
  );
};

export const mockFetchError = (): jest.Mock => {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: false,
      statusText: 'Error while fetching',
    }),
  );
};
