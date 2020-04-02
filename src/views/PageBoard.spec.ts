import { shallowMount, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import PageBoard from './PageBoard.vue';
import mockBoards from '../../public/data/boards.json';

const $route = {
  params: {
    id: 0,
  },
};
const $routeNoData = {
  params: {
    id: -1,
  },
};

jest.mock('axios');

describe('PageBoard', () => {
  let wrapper: Wrapper<Vue>;

  describe('on init', () => {
    describe('initial state', () => {
      beforeEach(() => {
        wrapper = shallowMount(PageBoard, {
          methods: { init: jest.fn() },
        });
      });

      it('should be loading', () => {
        expect(wrapper.find('[data-test="boardLoading"]').exists()).toBe(true);
      });
    });

    describe('when data exists', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: mockBoards }),
        );
        wrapper = shallowMount(PageBoard, {
          mocks: {
            $route,
          },
        });
      });

      it('should call the api', async () => {
        await wrapper.vm.$nextTick;
        expect(axios.get).toHaveBeenCalledWith('/data/boards.json');
      });

      it('should load the requested board', async () => {
        await wrapper.vm.$nextTick;
        expect(wrapper.find('[data-test="board"]').exists()).toBe(true);
      });

      it('should not display an error', () => {
        expect(wrapper.find('[data-test="boardError"]').exists()).toBe(false);
      });

      it('should not be loading', () => {
        expect(wrapper.find('[data-test="boardLoading"]').exists()).toBe(false);
      });

      it('should display the board title', () => {
        expect(wrapper.find('[data-test="boardTitle"]').text()).toBe(
          'Test board',
        );
      });
    });

    describe('when no data', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('Error'),
        );
        wrapper = shallowMount(PageBoard);
      });

      it('should display an error', async () => {
        await wrapper.vm.$nextTick;
        expect(wrapper.find('[data-test="boardError"]').exists()).toBe(true);
      });

      it('should not display content', async () => {
        expect(wrapper.find('[data-test="board"]').exists()).toBe(false);
      });

      it('should not be loading anymore', () => {
        expect(wrapper.find('[data-test="boardLoading"]').exists()).toBe(false);
      });
    });

    describe('when no board', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: mockBoards }),
        );
        wrapper = shallowMount(PageBoard, {
          mocks: {
            $route: $routeNoData,
          },
        });
      });

      it('should display an error', async () => {
        await wrapper.vm.$nextTick;
        expect(wrapper.find('[data-test="boardError"]').exists()).toBe(true);
      });

      it('should not display content', () => {
        expect(wrapper.find('[data-test="board"]').exists()).toBe(false);
      });

      it('should not be loading anymore', () => {
        expect(wrapper.find('[data-test="boardLoading"]').exists()).toBe(false);
      });
    });
  });
});
