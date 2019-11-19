import { YearlyHistory } from './index';

export type Account = {
  bank: number;
  history: YearlyHistory[];
  lastUpdate: string;
  number: number;
  name: string;
  total: number;
};
