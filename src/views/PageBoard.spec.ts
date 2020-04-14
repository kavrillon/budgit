import { mount, Wrapper, shallowMount, createLocalVue } from '@vue/test-utils';

import PageBoard from './PageBoard.vue';
import mockBoards from '../../public/data/boards.json';
import Vuex, { Store, StoreOptions, ActionTree } from 'vuex';
import { RootState, BoardState } from '@/@types';
import { ACTION_BOARD_FETCH_ITEM } from '@/store/board/actions';
import store from '@/store';

const $route = {
  params: {
    id: 0,
  },
};

const localVue = createLocalVue();
localVue.use(Vuex);

describe('PageBoard', () => {
  let mockStore: Store<RootState>;
  let storeOptions: StoreOptions<RootState>;
  let wrapper: Wrapper<Vue>;

  describe('initial state', () => {
    it('should be loading', () => {
      wrapper = mount(PageBoard, {
        methods: { init: jest.fn() },
        localVue,
        store,
      });

      expect(wrapper.find('[data-test="pageLoading"]').exists()).toBe(true);
    });
  });

  describe('on init', () => {
    it('should call the store action', async () => {
      const disp = store.dispatch;
      store.dispatch = jest.fn();

      wrapper = shallowMount(PageBoard, {
        localVue,
        store,
        mocks: {
          $route,
        },
      });

      expect(store.dispatch).toHaveBeenCalledWith('board/fetchBoardItem', 0);
      store.dispatch = disp;
    });

    describe('when no data', () => {
      it('should display an error', () => {
        storeOptions = {
          state: {
            loading: false,
          },
          modules: {
            board: {
              namespaced: true,
              actions: {
                [ACTION_BOARD_FETCH_ITEM]: jest.fn(),
              },
              getters: {
                current: () => null,
              },
            },
          },
        };

        mockStore = new Vuex.Store<RootState>(storeOptions);

        wrapper = mount(PageBoard, {
          localVue,
          store: mockStore,
          mocks: {
            $route,
          },
        });

        expect(wrapper.find('[data-test="pageError"]').exists()).toBe(true);
      });
    });

    describe('when data exists', () => {
      beforeAll(() => {
        storeOptions = {
          modules: {
            board: {
              namespaced: true,
              actions: {
                [ACTION_BOARD_FETCH_ITEM]: jest.fn(),
              },
              getters: {
                current: () => mockBoards[0],
              },
            },
          },
        };

        mockStore = new Vuex.Store<RootState>(storeOptions);

        wrapper = mount(PageBoard, {
          localVue,
          store: mockStore,
          mocks: {
            $route,
          },
        });
      });

      it('should load the requested board', () => {
        expect(wrapper.find('[data-test="board"]').exists()).toBe(true);
      });

      it('should display the board title', () => {
        expect(wrapper.find('[data-test="pageTitle"]').text()).toBe(
          'Test board',
        );
      });
    });
  });
});
