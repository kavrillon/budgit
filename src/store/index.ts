import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/@types';
import { board } from './board/board.module';
import { mutations } from './mutations';

Vue.use(Vuex);

const state: RootState = {
  error: null,
  loading: true,
};

const store: StoreOptions<RootState> = {
  state,
  mutations,
  modules: {
    board,
  },
};

export default new Vuex.Store<RootState>(store);
