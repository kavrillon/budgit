import { shallowMount, Wrapper, RouterLinkStub } from '@vue/test-utils';

import BoardSummary from './Summary.vue';

import mockBoards from '../../../public/api/boards.json';

describe('BoardSummary', () => {
  let wrapper: Wrapper<Vue>;

  beforeAll(() => {
    wrapper = shallowMount(BoardSummary, {
      propsData: { board: mockBoards[0] },
      stubs: { RouterLink: RouterLinkStub },
    });
  });

  describe('on init', () => {
    it('should display given board', () => {
      expect(wrapper.contains('[data-test="boardSummary"]')).toBe(true);
    });

    it('should be a link to the board', async () => {
      expect(wrapper.find(RouterLinkStub).props().to).toMatchObject({
        name: 'board',
        params: { id: 0 },
      });
    });
  });
});
