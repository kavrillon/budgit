import { Module } from 'vuex';
import { BoardState, RootState } from '@/@types';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';

const state: BoardState = {
  list: [],
};
const namespaced = true;

export const board: Module<BoardState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
