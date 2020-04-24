import { Account } from '@types';

export const aggregateAccounts = (accounts: Account[]): Account[] => {
  const results = accounts.reduce((a: Account[], i: Account) => {
    const index = a.findIndex(ai => ai.id === i.id);
    if (index === -1) {
      a.push(i);
    } else if (i.lastUpdate > a[index].lastUpdate) {
      a[index] = i;
    }
    return a;
  }, []);
  return results;
};
