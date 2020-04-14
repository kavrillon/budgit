import { boardService } from '@/services/board.service';
import { actions, ACTION_BOARD_FETCH_LIST } from './actions';
import { MUTATION_BOARD_SET_LIST } from './mutations';
import mockBoards from '../../../public/data/boards.json';

jest.mock('@/services/board.service');

describe('Store Module Board', () => {
  describe('ACTION_BOARD_FETCH_LIST', () => {
    describe('when endpoint return data', () => {
      beforeEach(() => {
        (boardService.getBoards as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve(mockBoards),
        );
      });

      it('should commit the list of boards', async () => {
        const commitFunction = jest.fn();
        const context = { commit: commitFunction };
        const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
        await action(context);

        expect(commitFunction.mock.calls[0][0]).toBe(MUTATION_BOARD_SET_LIST);
        expect(commitFunction.mock.calls[0][1]).toBe(mockBoards);
      });
    });

    describe('when endpoint return no data', () => {
      beforeEach(() => {
        (boardService.getBoards as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve(null),
        );
      });

      it('should commit empty array', async () => {
        const commitFunction = jest.fn();
        const context = { commit: commitFunction };
        const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
        await action(context);

        expect(commitFunction.mock.calls[0][0]).toBe(MUTATION_BOARD_SET_LIST);
        expect(commitFunction.mock.calls[0][1]).toStrictEqual([]);
      });
    });
  });
});
