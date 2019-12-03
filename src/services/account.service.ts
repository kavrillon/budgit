import { Account, Operation } from '@/@types';
import { getTimestamp } from '@/libs/date';
import { get } from '@/services/api.service';
import { isOperationInList } from '@/services/operation.service';

const JSON_PATH = '/data/accounts';

export const getAccount = (number: number): Promise<Account | null> => {
  return get(`${JSON_PATH}/${number}.json`)
    .then(data => Promise.resolve(data))
    .catch(_ => Promise.reject(`No account ${number}`));
};

export const getAccounts = async (): Promise<Account[]> => {
  const accounts: Account[] = [];

  const jsonAccounts = await get(JSON_PATH);
  jsonAccounts.forEach((account: Account) => {
    accounts.push(account);
  });

  return Promise.resolve(accounts);
};

export const mergeAccountData = (
  existingAccount: Account,
  newAccount: Account,
  operations: Operation[] = [],
): void => {
  if (
    getTimestamp(newAccount.lastUpdate) >
    getTimestamp(existingAccount.lastUpdate)
  ) {
    existingAccount.lastUpdate = newAccount.lastUpdate;
    existingAccount.total = newAccount.total;
  }

  if (
    getTimestamp(newAccount.startDate) < getTimestamp(existingAccount.startDate)
  ) {
    existingAccount.startDate = newAccount.startDate;
    existingAccount.startTotal = newAccount.startTotal;
  }

  operations.forEach((op: Operation) => {
    if (!isOperationInList(existingAccount.operations, op)) {
      existingAccount.operations.push(op);
    }
  });
};
