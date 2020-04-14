import { mount, Wrapper, shallowMount, createLocalVue } from '@vue/test-utils';

import PageBoard from './PageBoard.vue';
import mockBoards from '../../public/data/boards.json';
import Vuex, { Store, StoreOptions, ActionTree } from 'vuex';
import { RootState, BoardState } from '@/@types';
import { ACTION_BOARD_FETCH_ITEM } from '@/store/board/actions';

const $route = {
  params: {
    id: 0,
  },
};

const localVue = createLocalVue();
localVue.use(Vuex);

describe('PageBoard', () => {
  let store: Store<RootState>;
  let storeOptions: StoreOptions<RootState>;
  let actions: ActionTree<BoardState, RootState>;
  let wrapper: Wrapper<Vue>;

  describe('initial state', () => {
    beforeEach(() => {
      wrapper = mount(PageBoard, {
        methods: { init: jest.fn() },
      });
    });

    it('should be loading', () => {
      expect(wrapper.find('[data-test="pageLoading"]').exists()).toBe(true);
    });
  });

  describe('on init', () => {
    beforeAll(() => {
      actions = {
        [ACTION_BOARD_FETCH_ITEM]: jest.fn(),
      };

      storeOptions = {
        modules: {
          board: {
            namespaced: true,
            actions,
            getters: {
              current: () => null,
            },
          },
        },
      };

      store = new Vuex.Store<RootState>(storeOptions);
    });

    beforeEach(() => {
      wrapper = shallowMount(PageBoard, {
        localVue,
        store,
        mocks: {
          $route,
        },
      });
    });

    it('should call the store action', async () => {
      expect(actions[ACTION_BOARD_FETCH_ITEM]).toHaveBeenCalledTimes(1);
    });

    it('should not be loading anymore', () => {
      expect(wrapper.find('[data-test="pageLoading"]').exists()).toBe(false);
    });
  });

  describe('when no data', () => {
    beforeAll(() => {
      actions = {
        [ACTION_BOARD_FETCH_ITEM]: jest.fn(),
      };

      storeOptions = {
        modules: {
          board: {
            namespaced: true,
            actions,
            getters: {
              current: () => null,
            },
          },
        },
      };

      store = new Vuex.Store<RootState>(storeOptions);
    });

    beforeEach(() => {
      wrapper = mount(PageBoard, {
        localVue,
        store,
        mocks: {
          $route,
        },
      });
    });

    it('should display an error', () => {
      expect(wrapper.find('[data-test="pageError"]').exists()).toBe(true);
    });
  });

  describe('when data exists', () => {
    beforeAll(() => {
      actions = {
        [ACTION_BOARD_FETCH_ITEM]: jest.fn(),
      };

      storeOptions = {
        modules: {
          board: {
            namespaced: true,
            actions,
            getters: {
              current: () => mockBoards[0],
            },
          },
        },
      };

      store = new Vuex.Store<RootState>(storeOptions);
    });

    beforeEach(() => {
      wrapper = mount(PageBoard, {
        localVue,
        store,
        mocks: {
          $route,
        },
      });
    });

    it('should load the requested board', () => {
      expect(wrapper.find('[data-test="board"]').exists()).toBe(true);
    });

    it('should display the board title', () => {
      expect(wrapper.find('[data-test="pageTitle"]').text()).toBe('Test board');
    });
  });
});
