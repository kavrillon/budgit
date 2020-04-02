import { shallowMount, Wrapper } from '@vue/test-utils';

import BoardTotal from './Total.vue';

import mockBoards from '../../../public/data/boards.json';

describe('Board/Total', () => {
  let wrapper: Wrapper<Vue>;

  beforeAll(() => {
    wrapper = shallowMount(BoardTotal, {
      propsData: { board: mockBoards[0] },
    });
  });

  describe('on init', () => {
    it('should display the formatted total of the board', () => {
      expect(wrapper.get('[data-test="boardTotal"]').text()).toBe('+1.234 €');
    });
  });
});
