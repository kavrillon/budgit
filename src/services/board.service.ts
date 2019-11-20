import moment from 'moment';

import { Account, Board, Operation, YearHistory } from '@/@types';
import { get } from '@/services/api.service';
import {
  getOperationsForMonth,
  getHistoryFromOperations,
  getOperationsFromHistory,
} from './history.service';

const JSON_PATH = '/data/board';

export const getBoard = async (id: number): Promise<Board> => {
  const jsonBoard = await get(`${JSON_PATH}/${id}.json`);
  return Promise.resolve(jsonBoard);
};

export const createBoardFromAccounts = (
  accounts: Account[],
  id: number,
): Board => {
  const board = {
    accounts: accounts.map((account: Account) => ({
      ...account,
      history: [], // No need history for board
    })),
    lastOperations: getLastOperationsFromAccounts(accounts),
    id,
    total: accounts.reduce((total, account) => {
      return total + account.total;
    }, 0),
    history: getHistoryFromAccounts(accounts),
  };

  return board;
};

export const getHistoryFromAccounts = (accounts: Account[]): YearHistory[] => {
  const operations: Operation[] = accounts.reduce(
    (operations: Operation[], account: Account) => {
      return operations.concat(getOperationsFromHistory(account.history));
    },
    [],
  );

  return getHistoryFromOperations(operations);
};

export const getLastOperationsFromAccounts = (
  accounts: Account[],
): Operation[] => {
  const now = moment();

  const operations: Operation[] = accounts.reduce(
    (operations: Operation[], account: Account) => {
      return operations.concat(
        getOperationsForMonth(account.history, now.year(), now.month()),
      );
    },
    [],
  );

  operations.sort((a: Operation, b: Operation) => {
    const date1 = parseInt(moment(a.date, 'DD/MM/YYYY').format('X'));
    const date2 = parseInt(moment(b.date, 'DD/MM/YYYY').format('X'));
    return date2 - date1;
  });

  return operations;
};
