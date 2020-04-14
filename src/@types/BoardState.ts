import { Board } from './Board';

export type BoardState = {
  current: Board | null;
  list: Board[];
};
