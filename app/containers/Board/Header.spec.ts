import Vuex, { Store } from 'vuex';
import { createLocalVue, Wrapper, shallowMount } from '@vue/test-utils';
import store from '@app/store';
import { RootState } from '@app/store/@types';
import { mockBoardStoreWithData } from '@tests/utils/store.utils';
import BoardHeader from './Header.vue';
import mockBoards from '../../../public/data/boards.json';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('BoardHeader', () => {
  let mockStore: Store<RootState>;
  let wrapper: Wrapper<Vue>;

  describe('on init', () => {
    it('should call the store action', async () => {
      const disp = store.dispatch;
      store.dispatch = jest.fn();

      wrapper = shallowMount(BoardHeader, {
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
    it('should display the name of the board in title', async () => {
      mockStore = mockBoardStoreWithData(mockBoards, mockBoards[0]);

      wrapper = shallowMount(BoardHeader, {
        localVue,
        store: mockStore,
      });

      expect(wrapper.find('[data-test="pageTitle"]').text()).toBe('Test board');
    });
  });

  describe('when no board is found', () => {
    it('should not display the title', async () => {
      mockStore = mockBoardStoreWithData(mockBoards, null);

      wrapper = shallowMount(BoardHeader, {
        localVue,
        store: mockStore,
      });

      expect(wrapper.find('[data-test="pageTitle"]').exists()).toBe(false);
    });
  });
});
