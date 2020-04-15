import {
  mount,
  RouterLinkStub,
  Wrapper,
  createLocalVue,
  shallowMount,
} from '@vue/test-utils';
import Vuex, { StoreOptions, Store } from 'vuex';

import PageHome from './PageHome.vue';
import { ACTION_BOARD_FETCH_LIST } from '@/store/board/actions';

import mockBoards from '../../public/data/boards.json';
import { RootState } from '@/@types';
import store from '@/store';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('PageHome', () => {
  let mockStore: Store<RootState>;
  let storeOptions: StoreOptions<RootState>;
  let wrapper: Wrapper<Vue>;

  describe('initial state', () => {
    it('should be loading', () => {
      wrapper = mount(PageHome, {
        methods: { init: jest.fn() },
        localVue,
        store,
      });

      expect(wrapper.find('[data-test="pageLoading"]').exists()).toBe(true);
    });

    it('should call the store action', async () => {
      const disp = store.dispatch;
      store.dispatch = jest.fn();

      wrapper = shallowMount(PageHome, {
        localVue,
        store,
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        'board/fetchBoardList',
        undefined,
      );
      store.dispatch = disp;
    });
  });

  describe('when data exists', () => {
    it('should load boards', () => {
      storeOptions = {
        modules: {
          board: {
            namespaced: true,
            actions: {
              [ACTION_BOARD_FETCH_LIST]: jest.fn(),
            },
            getters: {
              list: () => [...mockBoards],
            },
          },
        },
      };

      mockStore = new Vuex.Store<RootState>(storeOptions);

      wrapper = mount(PageHome, {
        localVue,
        store: mockStore,
        stubs: { RouterLink: RouterLinkStub },
      });

      expect(wrapper.findAll('[data-test="boardSummary"]').length).toBe(2);
    });
  });

  describe('on error', () => {
    it('should display the error', () => {
      storeOptions = {
        state: {
          error: 'any error',
          loading: false,
        },
        modules: {
          board: {
            namespaced: true,
            actions: {
              [ACTION_BOARD_FETCH_LIST]: jest.fn(),
            },
            getters: {
              list: () => [],
            },
          },
        },
      };

      mockStore = new Vuex.Store<RootState>(storeOptions);
      wrapper = mount(PageHome, {
        localVue,
        store: mockStore,
      });
      expect(wrapper.find('[data-test="pageError"]').text()).toBe('any error');
    });
  });
});
