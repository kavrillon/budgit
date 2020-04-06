import { mount, Wrapper } from '@vue/test-utils';
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
        wrapper = mount(PageBoard, {
          methods: { init: jest.fn() },
        });
      });

      it('should be loading', () => {
        expect(wrapper.find('[data-test="pageLoading"]').exists()).toBe(true);
      });
    });

    describe('when data exists', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: mockBoards }),
        );
        wrapper = mount(PageBoard, {
          mocks: {
            $route,
          },
        });
      });

      it('should load the requested board', async () => {
        await wrapper.vm.$nextTick;
        expect(wrapper.find('[data-test="board"]').exists()).toBe(true);
      });

      it('should display the board title', () => {
        expect(wrapper.find('[data-test="pageTitle"]').text()).toBe(
          'Test board',
        );
      });
    });

    describe('when no data', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('Error'),
        );
        wrapper = mount(PageBoard, {
          mocks: {
            $route,
          },
        });
      });

      it('should display an error', async () => {
        await wrapper.vm.$nextTick;
        expect(wrapper.find('[data-test="pageError"]').exists()).toBe(true);
      });
    });

    describe('when no board', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: mockBoards }),
        );
        wrapper = mount(PageBoard, {
          mocks: {
            $route: $routeNoData,
          },
        });
      });

      it('should display an error', async () => {
        await wrapper.vm.$nextTick;
        expect(wrapper.find('[data-test="pageError"]').exists()).toBe(true);
      });
    });
  });
});
