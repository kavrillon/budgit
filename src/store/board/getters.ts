import { GetterTree } from 'vuex';
import { BoardState, RootState } from '@/@types';

export const getters: GetterTree<BoardState, RootState> = {
  current(state) {
    return state.current;
  },
  list(state) {
    return state.list;
  },
};
