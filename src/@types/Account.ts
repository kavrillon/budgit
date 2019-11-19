import { YearHistory } from './index';

export type Account = {
  bank: number;
  history: YearHistory[];
  lastUpdate: string;
  number: number;
  name: string;
  total: number;
};
