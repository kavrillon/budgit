import moment from 'moment';

import { Account, Operation } from '@/@types';
import { get } from '@/services/api.service';
import { getHistoryFromOperations } from '@/services/history.service';

const JSON_PATH = '/data/accounts.json';
export const ACCOUNT_DATE_FORMAT = 'DD/MM/YYYY';

export async function getAccounts(): Promise<Account[]> {
  let accounts: Account[] = [];

  const jsonAccounts = await get(JSON_PATH);
  jsonAccounts.forEach((account: Account) => {
    accounts.push(account);
  });

  return Promise.resolve(accounts);
}

export async function getAccount(number: number): Promise<Account | null> {
  const jsonAccounts = await get(JSON_PATH);

  const account: Account | undefined = jsonAccounts.find(
    (account: Account) => account.number === number,
  );

  if (typeof account !== 'undefined') {
    return Promise.resolve(account);
  }
  return Promise.resolve(null);
}

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
    existingAccount.balance = newAccount.balance;
  }

  existingAccount.history = getHistoryFromOperations(
    operations,
    existingAccount.history,
  );
};
