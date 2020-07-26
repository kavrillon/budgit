import { Account } from '@types';

const TODAY = new Date();

const A_MONTH_AGO = new Date();
A_MONTH_AGO.setMonth(A_MONTH_AGO.getMonth() - 1);

export const MOCK_ACCOUNT_1: Account = {
  id: 'ACC_1',
  lastUpdate: TODAY,
  total: 1134.12,
};

export const MOCK_ACCOUNT_2: Account = {
  id: 'ACC_2',
  lastUpdate: A_MONTH_AGO,
  total: 100,
};

export const MOCK_ACCOUNT_3: Account = {
  id: 'ACC_3',
  lastUpdate: A_MONTH_AGO,
  total: 3086.88,
};

export default [MOCK_ACCOUNT_1, MOCK_ACCOUNT_2, MOCK_ACCOUNT_3];
