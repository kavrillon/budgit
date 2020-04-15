import { ActionTree } from 'vuex';
import { BoardState, RootState, Board } from '@/@types';
import { boardService } from '@/services/board.service';
import {
  MUTATION_BOARD_SET_CURRENT,
  MUTATION_BOARD_SET_LIST,
} from './mutations';
import { MUTATION_SET_ERROR, MUTATION_SET_LOADING } from '../mutations';

export const ACTION_BOARD_FETCH_ITEM = 'fetchBoardItem';
export const ACTION_BOARD_FETCH_LIST = 'fetchBoardList';

export const actions: ActionTree<BoardState, RootState> = {
  async [ACTION_BOARD_FETCH_ITEM]({ commit }, id: number): Promise<void> {
    commit(MUTATION_SET_LOADING, true, { root: true });

    const result: Board | null = await boardService.getBoard(id);

    commit(MUTATION_BOARD_SET_CURRENT, result);
    if (result === null) {
      commit(MUTATION_SET_ERROR, 'No data', { root: true });
    }
    commit(MUTATION_SET_LOADING, false, { root: true });
  },

  async [ACTION_BOARD_FETCH_LIST]({ commit }): Promise<void> {
    commit(MUTATION_SET_LOADING, true, { root: true });

    const results: Board[] | null = await boardService.getBoards();
    commit(MUTATION_BOARD_SET_LIST, results || []);

    if (results === null) {
      commit(MUTATION_SET_ERROR, 'Error while loading data', { root: true });
    } else if (results.length === 0) {
      commit(MUTATION_SET_ERROR, 'No data', { root: true });
    }

    commit(MUTATION_SET_LOADING, false, { root: true });
  },
};
