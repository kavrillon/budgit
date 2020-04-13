import { boardService } from '@/services/board.service';
import {
  ACTION_FETCH_BOARD,
  ACTION_FETCH_BOARD_LIST,
  ACTION_REMOVE_ACTIVE_BOARD,
} from './actions.type';
import {
  MUTATION_SET_ACTIVE_BOARD,
  MUTATION_SET_BOARD_LIST,
} from './mutations.type';

const initialState = {
  list: [],
  active: null,
};

export const state = { ...initialState };

const getters = {
  list(state: any) {
    return state.list;
  },
  board(state: any) {
    return state.active;
  },
};

const actions = {
  async [ACTION_FETCH_BOARD](context: any, id: number) {
    const result = await boardService.getBoard(id);
    context.commit(MUTATION_SET_ACTIVE_BOARD, result);
  },
  async [ACTION_FETCH_BOARD_LIST](context: any) {
    context.commit(MUTATION_SET_BOARD_LIST, await boardService.getBoards());
  },
  [ACTION_REMOVE_ACTIVE_BOARD](context: any) {
    context.commit(MUTATION_SET_ACTIVE_BOARD, null);
  },
};

const mutations = {
  [MUTATION_SET_BOARD_LIST](state: any, payload: any) {
    state.list = payload;
  },
  [MUTATION_SET_ACTIVE_BOARD](state: any, payload: any) {
    state.active = payload;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
