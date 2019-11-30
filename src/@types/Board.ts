import { Account, History, Operation } from './index';

export type Board = {
  accounts: Account[];
  history?: History;
  lastOperations?: Operation[];
  id: number;
  total: number;
};
