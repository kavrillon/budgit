import { Module } from 'vuex';
import { BoardState, RootState } from '@app/@types';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

export const initialState: BoardState = {
  current: null,
  list: [],
  loadingCurrent: false,
  loadingList: false,
};

const namespaced = true;

export const board: Module<BoardState, RootState> = {
  namespaced,
  state: { ...initialState },
  getters,
  actions,
  mutations,
};
