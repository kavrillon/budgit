import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@app/@types';
import { board } from './board/board.module';
import { mutations } from './mutations';

Vue.use(Vuex);

export const initialState: RootState = {
  error: null,
  loading: true,
};

const store: StoreOptions<RootState> = {
  state: { ...initialState },
  mutations,
  modules: {
    board,
  },
};

export default new Vuex.Store<RootState>(store);
