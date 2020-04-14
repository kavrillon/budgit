import { MutationTree } from 'vuex';
import { RootState } from '@/@types';

export const MUTATION_SET_LOADING = 'setLoading';

export const mutations: MutationTree<RootState> = {
  [MUTATION_SET_LOADING](state, payload: boolean): void {
    state.loading = payload;
  },
};
