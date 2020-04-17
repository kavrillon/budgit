import { Module } from 'vuex';
import { BoardState, RootState } from '@/@types';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

export const initialState: BoardState = {
  current: null,
  list: [],
};

const namespaced = true;

export const board: Module<BoardState, RootState> = {
  namespaced,
  state: { ...initialState },
  getters,
  actions,
  mutations,
};
