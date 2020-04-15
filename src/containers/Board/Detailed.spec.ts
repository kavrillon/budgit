import Vuex, { Store } from 'vuex';
import { createLocalVue, Wrapper, shallowMount } from '@vue/test-utils';
import { RootState } from '@/@types';
import store from '@/store';
import { mockBoardStoreWithData } from '@tests/utils/store.utils';
import BoardDetailed from './Detailed.vue';
import mockBoards from '../../../public/data/boards.json';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('BoardDetailed', () => {
  let mockStore: Store<RootState>;
  let wrapper: Wrapper<Vue>;

  describe('on init', () => {
    it('should call the store action', async () => {
      const disp = store.dispatch;
      store.dispatch = jest.fn();

      wrapper = shallowMount(BoardDetailed, {
        localVue,
        store,
        propsData: {
          boardId: 0,
        },
      });

      expect(store.dispatch).toHaveBeenCalledWith('board/fetchBoardItem', 0);
      store.dispatch = disp;
    });
  });

  describe('when a board is found', () => {
    it('should display the board', async () => {
      mockStore = mockBoardStoreWithData(mockBoards, mockBoards[0]);

      wrapper = shallowMount(BoardDetailed, {
        localVue,
        store: mockStore,
      });

      expect(wrapper.find('[data-test="boardDetailed"]').exists()).toBe(true);
    });
  });

  describe('when no board is found', () => {
    it('should not display the board', async () => {
      mockStore = mockBoardStoreWithData(mockBoards, null);

      wrapper = shallowMount(BoardDetailed, {
        localVue,
        store: mockStore,
      });

      expect(wrapper.find('[data-test="boardDetailed"]').exists()).toBe(false);
    });
  });
});
