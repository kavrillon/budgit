import { Account, Board, Operation } from '@/@types';
import { getCurrentYear, getCurrentMonth } from '@/libs/date';
import { get } from '@/services/api.service';
import { getHistoryFromOperations } from './history.service';
import {
  getOperationsFromAccounts,
  getOperationsForMonth,
} from './operation.service';

const JSON_PATH = '/data/boards';

export const getBoard = async (id: number): Promise<Board> => {
  const jsonBoard = await get(`${JSON_PATH}/${id}.json`);
  return Promise.resolve(jsonBoard);
};

export const createBoardFromAccounts = (
  accounts: Account[],
  id: number,
): Board => {
  const allOperations: Operation[] = getOperationsFromAccounts(accounts);
  const totalEnd: number = accounts.reduce((total, account) => {
    return total + account.total;
  }, 0);

  const board = {
    accounts: accounts.map((account: Account) => ({
      ...account,
      operations: [], // No need history for board
    })),
    history: getHistoryFromOperations(allOperations, totalEnd),
    id,
    lastOperations: getOperationsForMonth(
      allOperations,
      getCurrentYear(),
      getCurrentMonth(),
    ),
    total: accounts.reduce((total, account) => {
      return total + account.total;
    }, 0),
  };

  return board;
};
