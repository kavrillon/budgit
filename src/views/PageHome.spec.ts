import {
  mount,
  RouterLinkStub,
  Wrapper,
  createLocalVue,
  shallowMount,
} from '@vue/test-utils';
import Vuex, { ActionTree, StoreOptions, Store } from 'vuex';

import PageHome from './PageHome.vue';
import { ACTION_BOARD_FETCH_LIST } from '@/store/board/actions';

import mockBoards from '../../public/data/boards.json';
import { BoardState, RootState } from '@/@types';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('PageHome', () => {
  let store: Store<RootState>;
  let storeOptions: StoreOptions<RootState>;
  let actions: ActionTree<BoardState, RootState>;
  let wrapper: Wrapper<Vue>;

  describe('initial state', () => {
    beforeEach(() => {
      wrapper = mount(PageHome, {
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
        [ACTION_BOARD_FETCH_LIST]: jest.fn(),
      };

      storeOptions = {
        modules: {
          board: {
            namespaced: true,
            actions,
            getters: {
              list: () => [],
            },
          },
        },
      };

      store = new Vuex.Store<RootState>(storeOptions);
    });

    beforeEach(() => {
      wrapper = shallowMount(PageHome, {
        localVue,
        store,
      });
    });

    it('should call the store action', async () => {
      expect(actions[ACTION_BOARD_FETCH_LIST]).toHaveBeenCalledTimes(1);
    });

    it('should not be loading anymore', () => {
      expect(wrapper.find('[data-test="pageLoading"]').exists()).toBe(false);
    });
  });

  describe('when no data', () => {
    beforeAll(() => {
      actions = {
        [ACTION_BOARD_FETCH_LIST]: jest.fn(),
      };

      storeOptions = {
        modules: {
          board: {
            namespaced: true,
            actions,
            getters: {
              list: () => [],
            },
          },
        },
      };

      store = new Vuex.Store<RootState>(storeOptions);
    });

    beforeEach(() => {
      wrapper = mount(PageHome, {
        localVue,
        store,
      });
    });

    it('should display an error', () => {
      expect(wrapper.find('[data-test="pageError"]').exists()).toBe(true);
    });
  });

  describe('when data exists', () => {
    beforeAll(() => {
      actions = {
        [ACTION_BOARD_FETCH_LIST]: jest.fn(),
      };

      storeOptions = {
        modules: {
          board: {
            namespaced: true,
            actions,
            getters: {
              list: () => [...mockBoards],
            },
          },
        },
      };

      store = new Vuex.Store<RootState>(storeOptions);
    });

    beforeEach(() => {
      wrapper = mount(PageHome, {
        localVue,
        store,
        stubs: { RouterLink: RouterLinkStub },
      });
    });

    it('should load boards', () => {
      expect(wrapper.findAll('[data-test="boardSummary"]').length).toBe(2);
    });
  });
});
