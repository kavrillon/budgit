import { History, Operation } from './index';

export type Account = {
  bank: number;
  history?: History;
  lastUpdate: string;
  number: number;
  name: string;
  operations: Operation[];
  savings: Boolean;
  startDate: string;
  startTotal: number;
  total: number;
};
