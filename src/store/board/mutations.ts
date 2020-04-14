import { MutationTree } from 'vuex';
import { BoardState, Board } from '@/@types';

export const MUTATION_BOARD_SET_CURRENT = 'setCurrentBoard';
export const MUTATION_BOARD_SET_LIST = 'setBoardList';

export const mutations: MutationTree<BoardState> = {
  [MUTATION_BOARD_SET_CURRENT](state, payload: Board): void {
    state.current = payload;
  },
  [MUTATION_BOARD_SET_LIST](state, payload: Board[]): void {
    state.list = payload;
  },
};
