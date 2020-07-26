import { Board } from '@types';

export type BoardState = {
  current: Board | null;
  list: Board[];
  loadingCurrent: boolean;
  loadingList: boolean;
};
