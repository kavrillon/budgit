import { MutationTree } from 'vuex';
import { BoardState, Board } from '@/@types';

export const MUTATION_BOARD_SET_LIST = 'setBoardList';

export const mutations: MutationTree<BoardState> = {
  [MUTATION_BOARD_SET_LIST](state, payload: Board[]): void {
    state.list = payload;
  },
};
