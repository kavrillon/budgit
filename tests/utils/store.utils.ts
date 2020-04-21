import Vuex, { Store, StoreOptions } from 'vuex';
import { RootState, Board } from '@app/@types';
import {
  ACTION_BOARD_FETCH_LIST,
  ACTION_BOARD_FETCH_ITEM,
} from '@app/store/board/actions';

export const mockRootStoreWithState = (state: RootState): Store<RootState> => {
  const storeOptions: StoreOptions<RootState> = {
    state,
  };

  return new Vuex.Store<RootState>(storeOptions);
};

export const mockBoardStoreWithData = (
  list: Board[],
  current: Board | null = null,
): Store<RootState> => {
  const storeOptions: StoreOptions<RootState> = {
    state: {
      loading: false,
      error: null,
    },
    modules: {
      board: {
        namespaced: true,
        actions: {
          [ACTION_BOARD_FETCH_ITEM]: jest.fn(),
          [ACTION_BOARD_FETCH_LIST]: jest.fn(),
        },
        getters: {
          list: () => list,
          current: () => current,
        },
      },
    },
  };

  return new Vuex.Store<RootState>(storeOptions);
};
