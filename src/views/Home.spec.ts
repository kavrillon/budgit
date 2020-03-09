import { shallowMount, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import Home from './Home.vue';
import mockBoards from '../../public/data/boards.json';

jest.mock('axios');

describe('Home', () => {
  let wrapper: Wrapper<Vue>;

  describe('on init', () => {
    describe('initial state', () => {
      beforeEach(() => {
        wrapper = shallowMount(Home, {
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
        wrapper = shallowMount(Home);
      });

      it('should call the api', async () => {
        await wrapper.vm.$nextTick;
        expect(axios.get).toHaveBeenCalledWith('/data/boards.json');
      });

      it('should load boards', () => {
        expect(wrapper.findAll('[data-test="boardListItem"]').length).toBe(2);
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
        wrapper = shallowMount(Home);
      });

      it('should display an error', async () => {
        await wrapper.vm.$nextTick;
        expect(wrapper.find('[data-test="boardError"]').exists()).toBe(true);
      });

      it('should not display content', async () => {
        expect(wrapper.find('[data-test="boardList"]').exists()).toBe(false);
      });

      it('should not be loading anymore', () => {
        expect(wrapper.find('[data-test="boardLoading"]').exists()).toBe(false);
      });
    });
  });
});
