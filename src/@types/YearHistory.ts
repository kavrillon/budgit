import { MonthHistory } from './index';

export type YearHistory = {
  label: number;
  balance: number;
  incomes: number;
  outgoings: number;
  months: MonthHistory[];
};
