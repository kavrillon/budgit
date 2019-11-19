import { Operation } from './index';

export type MonthHistory = {
  label: number;
  balance: number;
  incomes: number;
  outgoings: number;
  operations: Operation[];
};
