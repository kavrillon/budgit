import { Operation } from "./Operation";

export type Account = {
  bank: number;
  lastUpdate: Date;
  number: number;
  name: string;
  balance: number;
  operations: Operation[];
};
