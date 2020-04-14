import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/@types';
import { board } from './board/board.module';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    board,
  },
};

export default new Vuex.Store<RootState>(store);
