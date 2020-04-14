import { ActionTree } from 'vuex';
import { BoardState, RootState, Board } from '@/@types';
import { boardService } from '@/services/board.service';
import {
  MUTATION_BOARD_SET_CURRENT,
  MUTATION_BOARD_SET_LIST,
} from './mutations';
import { MUTATION_SET_LOADING } from '../mutations';

export const ACTION_BOARD_FETCH_ITEM = 'fetchBoardItem';
export const ACTION_BOARD_FETCH_LIST = 'fetchBoardList';

export const actions: ActionTree<BoardState, RootState> = {
  async [ACTION_BOARD_FETCH_ITEM]({ commit }, id: number): Promise<void> {
    commit(MUTATION_SET_LOADING, true, { root: true });
    const result: Board | null = (await boardService.getBoard(id)) || null;
    commit(MUTATION_BOARD_SET_CURRENT, result);
    commit(MUTATION_SET_LOADING, false, { root: true });
  },
  async [ACTION_BOARD_FETCH_LIST]({ commit }): Promise<void> {
    commit(MUTATION_SET_LOADING, true, { root: true });
    const results: Board[] = (await boardService.getBoards()) || [];
    commit(MUTATION_BOARD_SET_LIST, results);
    commit(MUTATION_SET_LOADING, false, { root: true });
  },
};
