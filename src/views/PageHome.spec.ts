import { mount, RouterLinkStub, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import PageHome from './PageHome.vue';
import mockBoards from '../../public/data/boards.json';

jest.mock('axios');

describe('PageHome', () => {
  let wrapper: Wrapper<Vue>;

  describe('on init', () => {
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

    describe('when data exists', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: mockBoards }),
        );
        wrapper = mount(PageHome, {
          stubs: { RouterLink: RouterLinkStub },
        });
      });

      it('should load boards', () => {
        expect(wrapper.findAll('[data-test="boardSummary"]').length).toBe(2);
      });
    });

    describe('when no data', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('Error'),
        );
        wrapper = mount(PageHome);
      });

      it('should display an error', async () => {
        await wrapper.vm.$nextTick;
        expect(wrapper.find('[data-test="pageError"]').exists()).toBe(true);
      });
    });
  });
});
