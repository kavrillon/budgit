import { Account } from '@types';

export const aggregateAccounts = (accounts: Account[]): Account[] => {
  const results = accounts.reduce((aggregated: Account[], current: Account) => {
    const index = aggregated.findIndex(ai => ai.id === current.id);
    if (index === -1) {
      aggregated.push(current);
    } else if (current.lastUpdate > aggregated[index].lastUpdate) {
      aggregated[index] = current;
    }
    return aggregated;
  }, []);
  return results;
};
