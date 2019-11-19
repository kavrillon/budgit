import { Account, Operation } from './index';

export type Board = {
  accounts: Account[];
  lastOperations: Operation[];
  id: number;
  total: number;
};
