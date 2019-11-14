import { Operation } from './index';

export type MonthlyHistory = {
  label: number;
  balance: number;
  incomes: number;
  outgoings: number;
  operations: Operation[];
};
