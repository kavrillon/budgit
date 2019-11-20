import moment from 'moment';

import { Account, Operation } from '@/@types';
import { get } from '@/services/api.service';
import { getHistoryFromOperations } from '@/services/history.service';

const JSON_PATH = '/data/accounts';
export const ACCOUNT_DATE_FORMAT = 'DD/MM/YYYY';

export const getAccounts = async (): Promise<Account[]> => {
  const accounts: Account[] = [];

  const jsonAccounts = await get(JSON_PATH);
  jsonAccounts.forEach((account: Account) => {
    accounts.push(account);
  });

  return Promise.resolve(accounts);
};

export const getAccount = async (number: number): Promise<Account | null> => {
  const account: Account = await get(`${JSON_PATH}/${number}.json`);

  if (typeof account !== 'undefined') {
    return Promise.resolve(account);
  }
  return Promise.resolve(null);
};

export const mergeAccountData = (
  existingAccount: Account,
  newAccount: Account,
  operations: Operation[] = [],
): void => {
  if (
    moment(newAccount.lastUpdate, ACCOUNT_DATE_FORMAT) >
    moment(existingAccount.lastUpdate, ACCOUNT_DATE_FORMAT)
  ) {
    existingAccount.lastUpdate = newAccount.lastUpdate;
    existingAccount.total = newAccount.total;
  }

  if (
    moment(newAccount.startDate, ACCOUNT_DATE_FORMAT) <
    moment(existingAccount.startDate, ACCOUNT_DATE_FORMAT)
  ) {
    existingAccount.startDate = newAccount.startDate;
    existingAccount.startTotal = newAccount.startTotal;
  }

  existingAccount.history = getHistoryFromOperations(
    operations,
    existingAccount.history,
  );
};
