import { Account, Board } from '@/@types';
import { get } from '@/services/api.service';

const JSON_PATH = '/data/board';

export const getBoard = async (id: number): Promise<Board> => {
  const jsonBoard = await get(`${JSON_PATH}/${id}.json`);
  return Promise.resolve(jsonBoard);
};

export const createBoardFromAccounts = (
  accounts: Account[],
  id: number,
): Board => {
  return {
    accounts: accounts.map((account: Account) => ({
      ...account,
      history: [], // No need history for board
    })),
    id,
    total: accounts.reduce((total, account) => {
      return total + account.total;
    }, 0),
  };
};
