import { MonthlyHistory } from './index';

export type YearlyHistory = {
  label: number;
  balance: number;
  incomes: number;
  outgoings: number;
  months: MonthlyHistory[];
};
