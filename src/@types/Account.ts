import { Operation } from './Operation';

export type Account = {
  bank: number;
  lastUpdate: string;
  number: number;
  name: string;
  balance: number;
  operations: Operation[];
};
