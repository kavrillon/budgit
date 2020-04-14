import { GetterTree } from 'vuex';
import { BoardState, RootState } from '@/@types';

export const getters: GetterTree<BoardState, RootState> = {
  list(state) {
    return state.list;
  },
};
