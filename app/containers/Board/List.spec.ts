import Vuex, { Store } from 'vuex';
import { createLocalVue, Wrapper, shallowMount } from '@vue/test-utils';
import store from '@app/store';
import { RootState } from '@app/store/@types';
import { mockBoardStoreWithData } from '@tests/utils/store.utils';
import BoardList from './List.vue';
import mockBoards from '../../../public/api/boards.json';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('BoardList', () => {
  let mockStore: Store<RootState>;
  let wrapper: Wrapper<Vue>;

  describe('on init', () => {
    it('should call the store action', async () => {
      const disp = store.dispatch;
      store.dispatch = jest.fn();

      wrapper = shallowMount(BoardList, {
        localVue,
        store,
      });

      expect(store.dispatch).toHaveBeenCalledWith(
        'board/fetchBoardList',
        undefined,
      );
      store.dispatch = disp;
    });

    it('should display boards', async () => {
      mockStore = mockBoardStoreWithData(mockBoards);

      wrapper = shallowMount(BoardList, {
        localVue,
        store: mockStore,
      });

      expect(wrapper.findAll('[data-test="boardListItem"]').length).toBe(2);
    });
  });
});
