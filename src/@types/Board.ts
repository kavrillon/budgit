import { Account, Operation, YearHistory } from './index';

export type Board = {
  accounts: Account[];
  lastOperations: Operation[];
  id: number;
  total: number;
  history: YearHistory[];
};
