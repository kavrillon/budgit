import { createLocalVue, Wrapper, shallowMount } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import store from '@app/store';
import App from './App.vue';
import { RootState } from '@app/@types';
import VueRouter from 'vue-router';
import { mockRootStoreWithState } from '@tests/utils/store.utils';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('App', () => {
  let mockStore: Store<RootState>;
  let wrapper: Wrapper<Vue>;

  describe('on init', () => {
    beforeAll(() => {
      wrapper = shallowMount(App, {
        methods: { init: jest.fn() },
        localVue,
        store,
      });
    });

    it('should display the loader', () => {
      expect(wrapper.find('[data-test="pageLoader"]').isVisible()).toBe(true);
    });

    it('should not display the content', () => {
      expect(wrapper.find('[data-test="pageContent"]').isVisible()).toBe(false);
    });
  });

  describe('when error and not loading', () => {
    beforeAll(() => {
      mockStore = mockRootStoreWithState({
        error: 'any error',
        loading: false,
      });

      wrapper = shallowMount(App, {
        localVue,
        store: mockStore,
      });
    });

    it('should display the error', () => {
      expect(wrapper.find('[data-test="pageError"]').text()).toBe('any error');
    });

    it('should not display the loader', () => {
      expect(wrapper.find('[data-test="pageLoader"]').isVisible()).toBe(false);
    });

    it('should not display the content', () => {
      expect(wrapper.find('[data-test="pageContent"]').isVisible()).toBe(false);
    });
  });

  describe('when error and loading', () => {
    beforeAll(() => {
      mockStore = mockRootStoreWithState({
        error: 'any error',
        loading: true,
      });

      wrapper = shallowMount(App, {
        localVue,
        store: mockStore,
      });
    });

    it('should display the error', () => {
      expect(wrapper.find('[data-test="pageError"]').text()).toBe('any error');
    });

    it('should not display the loader', () => {
      expect(wrapper.find('[data-test="pageLoader"]').isVisible()).toBe(false);
    });

    it('should not display the content', () => {
      expect(wrapper.find('[data-test="pageContent"]').isVisible()).toBe(false);
    });
  });

  describe('when no error and not loading', () => {
    beforeAll(() => {
      mockStore = mockRootStoreWithState({
        error: null,
        loading: false,
      });

      wrapper = shallowMount(App, {
        localVue,
        store: mockStore,
      });
    });

    it('should not display the error', () => {
      expect(wrapper.find('[data-test="pageError"]').isVisible()).toBe(false);
    });

    it('should not display the loader', () => {
      expect(wrapper.find('[data-test="pageLoader"]').isVisible()).toBe(false);
    });

    it('should display the content', () => {
      expect(wrapper.find('[data-test="pageContent"]').isVisible()).toBe(true);
    });
  });
});
