import { Account } from '@/@types';
import { get } from '@/services/api.service';

const JSON_PATH = '/data/accounts.json';

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
    (account: Account) => account.number === number
  );

  if (typeof account !== 'undefined') {
    return Promise.resolve(account);
  }
  return Promise.resolve(null);
}
