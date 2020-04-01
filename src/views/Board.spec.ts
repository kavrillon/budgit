import { shallowMount, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import Board from './Board.vue';
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

describe('Board', () => {
  let wrapper: Wrapper<Vue>;

  describe('on init', () => {
    describe('initial state', () => {
      beforeEach(() => {
        wrapper = shallowMount(Board, {
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
        wrapper = shallowMount(Board, {
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
    });

    describe('when no data', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('Error'),
        );
        wrapper = shallowMount(Board);
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
        wrapper = shallowMount(Board, {
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
