import { ActionTree } from 'vuex';
import { Board } from '@types';
import { BoardState, RootState } from '@app/store/@types';
import { boardService } from '@app/services/board.service';
import {
  MUTATION_BOARD_SET_CURRENT,
  MUTATION_BOARD_SET_LIST,
  MUTATION_BOARD_LOADING_LIST,
  MUTATION_BOARD_LOADING_CURRENT,
} from './mutations';
import { MUTATION_SET_ERROR, MUTATION_SET_LOADING } from '../mutations';

export const ACTION_BOARD_FETCH_ITEM = 'fetchBoardItem';
export const ACTION_BOARD_FETCH_LIST = 'fetchBoardList';

export const actions: ActionTree<BoardState, RootState> = {
  async [ACTION_BOARD_FETCH_ITEM](
    { commit, state },
    id: number,
  ): Promise<void> {
    if (
      state.loadingCurrent === false &&
      (state.current === null || state.current.id !== id)
    ) {
      commit(MUTATION_SET_LOADING, true, { root: true });
      commit(MUTATION_BOARD_LOADING_CURRENT, true);

      try {
        const result: Board = await boardService.getBoard(id);
        commit(MUTATION_BOARD_SET_CURRENT, result);
      } catch (e) {
        commit(MUTATION_BOARD_SET_CURRENT, null);
        commit(MUTATION_SET_ERROR, e.message, {
          root: true,
        });
      }

      commit(MUTATION_BOARD_LOADING_CURRENT, false);
      commit(MUTATION_SET_LOADING, false, { root: true });
    }
  },

  async [ACTION_BOARD_FETCH_LIST]({ commit, state }): Promise<void> {
    if (state.loadingList === false && state.list.length === 0) {
      commit(MUTATION_SET_LOADING, true, { root: true });
      commit(MUTATION_BOARD_LOADING_LIST, true);

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

      commit(MUTATION_BOARD_LOADING_LIST, false);
      commit(MUTATION_SET_LOADING, false, { root: true });
    }
  },
};
