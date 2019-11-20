import { Operation, YearHistory } from './index';

export type Account = {
  bank: number;
  history: YearHistory[];
  lastUpdate: string;
  number: number;
  name: string;
  operations: Operation[];
  startDate: string;
  startTotal: number;
  total: number;
};
