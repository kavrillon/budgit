import { YearlyHistory } from './index';

export type Account = {
  bank: number;
  lastUpdate: string;
  number: number;
  name: string;
  balance: number;
  history: YearlyHistory[];
};
