import moment from 'moment';

import { Account, Board, Operation } from '@/@types';
import { get } from '@/services/api.service';
import { getOperationsForMonth } from './history.service';

const JSON_PATH = '/data/board';

export const getBoard = async (id: number): Promise<Board> => {
  const jsonBoard = await get(`${JSON_PATH}/${id}.json`);
  return Promise.resolve(jsonBoard);
};

export const createBoardFromAccounts = (
  accounts: Account[],
  id: number,
): Board => {
  const now = moment();

  const board = {
    accounts: accounts.map((account: Account) => ({
      ...account,
      history: [], // No need history for board
    })),
    lastOperations: [] as Operation[],
    id,
    total: accounts.reduce((total, account) => {
      return total + account.total;
    }, 0),
  };

  const operations: Operation[] = accounts.reduce(
    (operations: Operation[], account: Account) => {
      return operations.concat(
        getOperationsForMonth(account.history, now.year(), now.month()),
      );
    },
    [],
  );
  operations.sort((a: Operation, b: Operation) => {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    const date1 = parseInt(moment(a.date, 'DD/MM/YYYY').format('X'));
    const date2 = parseInt(moment(b.date, 'DD/MM/YYYY').format('X'));
    return date2 - date1;
  });
  board.lastOperations = operations;

  return board;
};
