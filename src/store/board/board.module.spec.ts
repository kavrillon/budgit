import { boardService } from '@/services/board.service';
import {
  actions,
  ACTION_BOARD_FETCH_ITEM,
  ACTION_BOARD_FETCH_LIST,
} from './actions';
import {
  MUTATION_BOARD_SET_LIST,
  MUTATION_BOARD_SET_CURRENT,
} from './mutations';
import mockBoards from '../../../public/data/boards.json';
import { MUTATION_SET_LOADING } from '../mutations';

jest.mock('@/services/board.service');

describe('Store Module Board', () => {
  describe('ACTION_BOARD_FETCH_ITEM', () => {
    it('should make the app loading', async () => {
      const commitFunction = jest.fn();
      const context = { commit: commitFunction };
      const action = actions[ACTION_BOARD_FETCH_ITEM] as Function;
      await action(context);

      expect(commitFunction.mock.calls[0][0]).toBe(MUTATION_SET_LOADING);
      expect(commitFunction.mock.calls[0][1]).toBeTruthy();
    });

    it('should stop the loading', async () => {
      const commitFunction = jest.fn();
      const context = { commit: commitFunction };
      const action = actions[ACTION_BOARD_FETCH_ITEM] as Function;
      await action(context);

      expect(commitFunction.mock.calls[2][0]).toBe(MUTATION_SET_LOADING);
      expect(commitFunction.mock.calls[2][1]).toBeFalsy();
    });

    describe('when endpoint return data', () => {
      beforeEach(() => {
        (boardService.getBoard as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve(mockBoards[0]),
        );
      });

      it('should commit the board', async () => {
        const commitFunction = jest.fn();
        const context = { commit: commitFunction };
        const action = actions[ACTION_BOARD_FETCH_ITEM] as Function;
        await action(context);

        expect(commitFunction.mock.calls[1][0]).toBe(
          MUTATION_BOARD_SET_CURRENT,
        );
        expect(commitFunction.mock.calls[1][1]).toBe(mockBoards[0]);
      });
    });

    describe('when endpoint return no data', () => {
      beforeEach(() => {
        (boardService.getBoard as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve(null),
        );
      });

      it('should commit a null object', async () => {
        const commitFunction = jest.fn();
        const context = { commit: commitFunction };
        const action = actions[ACTION_BOARD_FETCH_ITEM] as Function;
        await action(context);

        expect(commitFunction.mock.calls[1][0]).toBe(
          MUTATION_BOARD_SET_CURRENT,
        );
        expect(commitFunction.mock.calls[1][1]).toBeNull();
      });
    });
  });

  describe('ACTION_BOARD_FETCH_LIST', () => {
    it('should make the app loading', async () => {
      const commitFunction = jest.fn();
      const context = { commit: commitFunction };
      const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
      await action(context);

      expect(commitFunction.mock.calls[0][0]).toBe(MUTATION_SET_LOADING);
      expect(commitFunction.mock.calls[0][1]).toBeTruthy();
    });

    it('should stop the loading', async () => {
      const commitFunction = jest.fn();
      const context = { commit: commitFunction };
      const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
      await action(context);

      expect(commitFunction.mock.calls[2][0]).toBe(MUTATION_SET_LOADING);
      expect(commitFunction.mock.calls[2][1]).toBeFalsy();
    });

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

        expect(commitFunction.mock.calls[1][0]).toBe(MUTATION_BOARD_SET_LIST);
        expect(commitFunction.mock.calls[1][1]).toBe(mockBoards);
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

        expect(commitFunction.mock.calls[1][0]).toBe(MUTATION_BOARD_SET_LIST);
        expect(commitFunction.mock.calls[1][1]).toStrictEqual([]);
      });
    });
  });
});
