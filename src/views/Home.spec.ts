import { shallowMount, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import Home from './Home.vue';
import mockBoards from '../../public/data/boards.json';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: mockBoards })),
}));

describe('Home', () => {
  let wrapper: Wrapper<Vue>;

  beforeAll(() => {
    wrapper = shallowMount(Home);
  });
  describe('on init', () => {
    it('should call the api', async () => {
      await wrapper.vm.$nextTick;
      expect(axios.get).toHaveBeenCalledWith('/data/boards.json');
    });

    it('should load boards', () => {
      expect(wrapper.findAll('[data-test="boardListItem"]').length).toBe(2);
    });
  });
});
