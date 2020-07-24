import { Account, Board, BoardConfiguration } from '@types';

export const generateBoardsFromConf = (
  configuration: BoardConfiguration[],
  accounts: Account[],
): Board[] => {
  return configuration.map(conf => {
    const boardAccounts = accounts.filter(a => conf.accounts.includes(a.id));
    const total = boardAccounts.reduce((a, i) => a + i.total, 0);
    return {
      id: conf.id,
      name: conf.name,
      total: Math.round(total * 100) / 100,
    };
  });
};
