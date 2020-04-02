import { shallowMount, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import PageHome from './PageHome.vue';
import mockBoards from '../../public/data/boards.json';

jest.mock('axios');

describe('PageHome', () => {
  let wrapper: Wrapper<Vue>;

  describe('on init', () => {
    describe('initial state', () => {
      beforeEach(() => {
        wrapper = shallowMount(PageHome, {
          methods: { init: jest.fn() },
        });
      });

      it('should be loading', () => {
        expect(wrapper.find('[data-test="boardsLoading"]').exists()).toBe(true);
      });
    });

    describe('when data exists', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: mockBoards }),
        );
        wrapper = shallowMount(PageHome);
      });

      it('should call the api', async () => {
        await wrapper.vm.$nextTick;
        expect(axios.get).toHaveBeenCalledWith('/data/boards.json');
      });

      it('should load boards', () => {
        expect(wrapper.findAll('[data-test="boardsListItem"]').length).toBe(2);
      });

      it('should not display an error', () => {
        expect(wrapper.find('[data-test="boardsError"]').exists()).toBe(false);
      });

      it('should not be loading', () => {
        expect(wrapper.find('[data-test="boardsLoading"]').exists()).toBe(
          false,
        );
      });
    });

    describe('when no data', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('Error'),
        );
        wrapper = shallowMount(PageHome);
      });

      it('should display an error', async () => {
        await wrapper.vm.$nextTick;
        expect(wrapper.find('[data-test="boardsError"]').exists()).toBe(true);
      });

      it('should not display content', async () => {
        expect(wrapper.find('[data-test="boardsList"]').exists()).toBe(false);
      });

      it('should not be loading anymore', () => {
        expect(wrapper.find('[data-test="boardsLoading"]').exists()).toBe(
          false,
        );
      });
    });
  });
});
