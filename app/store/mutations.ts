import { MutationTree } from 'vuex';
import { RootState } from '@app/store/@types';

export const MUTATION_SET_ERROR = 'setError';
export const MUTATION_SET_LOADING = 'setLoading';

export const mutations: MutationTree<RootState> = {
  [MUTATION_SET_ERROR](state, payload: string | null): void {
    state.error = payload;
  },
  [MUTATION_SET_LOADING](state, payload: boolean): void {
    state.loading = payload;
  },
};