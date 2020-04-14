import { ActionTree } from 'vuex';
import { BoardState, RootState, Board } from '@/@types';
import { boardService } from '@/services/board.service';
import { MUTATION_BOARD_SET_LIST } from './mutations';

export const ACTION_BOARD_FETCH_LIST = 'fetchBoardList';

export const actions: ActionTree<BoardState, RootState> = {
  async [ACTION_BOARD_FETCH_LIST]({ commit }): Promise<void> {
    const results: Board[] = (await boardService.getBoards()) || [];
    commit(MUTATION_BOARD_SET_LIST, results);
  },
};
