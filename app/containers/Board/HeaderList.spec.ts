import Vuex, { Store } from 'vuex';
import { createLocalVue, Wrapper, shallowMount } from '@vue/test-utils';
import store from '@app/store';
import { RootState } from '@app/store/@types';
import { mockBoardStoreWithData } from '@tests/utils/store.utils';
import BoardHeaderList from './HeaderList.vue';
import mockBoards from '../../../public/data/boards.json';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('BoardHeaderList', () => {
  let mockStore: Store<RootState>;
  let wrapper: Wrapper<Vue>;

  describe('on init', () => {
    it('should call the store action', async () => {
      const disp = store.dispatch;
      store.dispatch = jest.fn();

      wrapper = shallowMount(BoardHeaderList, {
        localVue,
        store,
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        'board/fetchBoardList',
        undefined,
      );
      store.dispatch = disp;
    });

    it('should display the title with count', async () => {
      mockStore = mockBoardStoreWithData(mockBoards);

      wrapper = shallowMount(BoardHeaderList, {
        localVue,
        store: mockStore,
      });

      expect(wrapper.find('[data-test="pageTitle"]').text()).toBe(
        'Your boards (2)',
      );
    });
  });
});
