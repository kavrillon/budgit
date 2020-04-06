import { shallowMount, Wrapper } from '@vue/test-utils';

import Page from './Page.vue';

jest.mock('axios');

describe('Page', () => {
  let wrapper: Wrapper<Vue>;

  describe('by default', () => {
    beforeEach(() => {
      wrapper = shallowMount(Page);
    });

    it('should not be loading', () => {
      expect(wrapper.find('[data-test="pageLoading"]').exists()).toBe(false);
    });

    it('should not display error', () => {
      expect(wrapper.find('[data-test="pageError"]').exists()).toBe(false);
    });

    it('should display content', () => {
      expect(wrapper.find('[data-test="pageContent"]').exists()).toBe(true);
    });
  });

  describe('when loading', () => {
    beforeEach(() => {
      wrapper = shallowMount(Page, {
        propsData: {
          loading: true,
        },
      });
    });

    it('should be loading', () => {
      expect(wrapper.find('[data-test="pageLoading"]').exists()).toBe(true);
    });

    it('should not display error', () => {
      expect(wrapper.find('[data-test="pageError"]').exists()).toBe(false);
    });

    it('should not display content', () => {
      expect(wrapper.find('[data-test="pageContent"]').exists()).toBe(false);
    });
  });

  describe('when error', () => {
    beforeEach(() => {
      wrapper = shallowMount(Page, {
        propsData: {
          error: 'Error',
        },
      });
    });

    it('should not be loading', () => {
      expect(wrapper.find('[data-test="pageLoading"]').exists()).toBe(false);
    });

    it('should display error', () => {
      expect(wrapper.find('[data-test="pageError"]').exists()).toBe(true);
    });

    it('should not display content', () => {
      expect(wrapper.find('[data-test="pageContent"]').exists()).toBe(false);
    });
  });

  describe('when error and loading', () => {
    beforeEach(() => {
      wrapper = shallowMount(Page, {
        propsData: {
          loading: true,
          error: 'Error',
        },
      });
    });

    it('should not be loading', () => {
      expect(wrapper.find('[data-test="pageLoading"]').exists()).toBe(false);
    });

    it('should display error', () => {
      expect(wrapper.find('[data-test="pageError"]').exists()).toBe(true);
    });

    it('should not display content', () => {
      expect(wrapper.find('[data-test="pageContent"]').exists()).toBe(false);
    });
  });
});
