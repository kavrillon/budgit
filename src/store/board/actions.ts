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
  async [ACTION_BOARD_FETCH_ITEM](
    { commit, state },
    id: number,
  ): Promise<void> {
    if (state.current === null || state.current.id !== id) {
      commit(MUTATION_SET_LOADING, true, { root: true });

      try {
        const result: Board = await boardService.getBoard(id);
        commit(MUTATION_BOARD_SET_CURRENT, result);
      } catch (e) {
        commit(MUTATION_BOARD_SET_CURRENT, null);
        commit(MUTATION_SET_ERROR, e.message, {
          root: true,
        });
      }

      commit(MUTATION_SET_LOADING, false, { root: true });
    }
  },

  async [ACTION_BOARD_FETCH_LIST]({ commit, state }): Promise<void> {
    if (state.list.length === 0) {
      commit(MUTATION_SET_LOADING, true, { root: true });

      let results: Board[] = [];
      try {
        results = await boardService.getBoards();

        if (results.length === 0) {
          commit(MUTATION_SET_ERROR, 'No data', { root: true });
        }
      } catch (e) {
        commit(MUTATION_SET_ERROR, 'Error while loading data', {
          root: true,
        });
      }
      commit(MUTATION_BOARD_SET_LIST, results);

      commit(MUTATION_SET_LOADING, false, { root: true });
    }
  },
};
