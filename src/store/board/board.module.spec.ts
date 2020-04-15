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
import { MUTATION_SET_ERROR, MUTATION_SET_LOADING } from '../mutations';

jest.mock('@/services/board.service');

describe('Store Module Board', () => {
  let commitFunction: jest.Mock;

  describe('ACTION_BOARD_FETCH_ITEM', () => {
    describe('when service return data', () => {
      beforeEach(async () => {
        (boardService.getBoard as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve(mockBoards[0]),
        );
        commitFunction = jest.fn();
        const context = { commit: commitFunction };
        const action = actions[ACTION_BOARD_FETCH_ITEM] as Function;
        await action(context);
      });

      it('should make the app loading', () => {
        expect(commitFunction.mock.calls[0][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[0][1]).toBeTruthy();
      });

      it('should commit the board', () => {
        expect(commitFunction.mock.calls[1][0]).toBe(
          MUTATION_BOARD_SET_CURRENT,
        );
        expect(commitFunction.mock.calls[1][1]).toBe(mockBoards[0]);
      });

      it('should stop the loading', () => {
        expect(commitFunction.mock.calls[2][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[2][1]).toBeFalsy();
      });
    });

    describe('when service return no data', () => {
      beforeEach(async () => {
        (boardService.getBoard as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve(null),
        );
        commitFunction = jest.fn();
        const context = { commit: commitFunction };
        const action = actions[ACTION_BOARD_FETCH_ITEM] as Function;
        await action(context);
      });

      it('should make the app loading', () => {
        expect(commitFunction.mock.calls[0][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[0][1]).toBeTruthy();
      });

      it('should commit a null object', async () => {
        expect(commitFunction.mock.calls[1][0]).toBe(
          MUTATION_BOARD_SET_CURRENT,
        );
        expect(commitFunction.mock.calls[1][1]).toBeNull();
      });

      it('should commit an error', () => {
        expect(commitFunction.mock.calls[2][0]).toBe(MUTATION_SET_ERROR);
        expect(commitFunction.mock.calls[2][1]).toBe('No data');
      });

      it('should stop the loading', () => {
        expect(commitFunction.mock.calls[3][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[3][1]).toBeFalsy();
      });
    });
  });

  describe('ACTION_BOARD_FETCH_LIST', () => {
    describe('when service return data', () => {
      beforeEach(async () => {
        (boardService.getBoards as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve(mockBoards),
        );
        commitFunction = jest.fn();
        const context = { commit: commitFunction };
        const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
        await action(context);
      });

      it('should make the app loading', () => {
        expect(commitFunction.mock.calls[0][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[0][1]).toBeTruthy();
      });

      it('should commit the list of boards', () => {
        expect(commitFunction.mock.calls[1][0]).toBe(MUTATION_BOARD_SET_LIST);
        expect(commitFunction.mock.calls[1][1]).toBe(mockBoards);
      });

      it('should stop the loading', () => {
        expect(commitFunction.mock.calls[2][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[2][1]).toBeFalsy();
      });
    });

    describe('when service return no data', () => {
      beforeEach(async () => {
        (boardService.getBoards as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve([]),
        );
        commitFunction = jest.fn();
        const context = { commit: commitFunction };
        const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
        await action(context);
      });

      it('should make the app loading', () => {
        expect(commitFunction.mock.calls[0][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[0][1]).toBeTruthy();
      });

      it('should commit empty array', () => {
        expect(commitFunction.mock.calls[1][0]).toBe(MUTATION_BOARD_SET_LIST);
        expect(commitFunction.mock.calls[1][1]).toStrictEqual([]);
      });

      it('should commit an error', () => {
        expect(commitFunction.mock.calls[2][0]).toBe(MUTATION_SET_ERROR);
        expect(commitFunction.mock.calls[2][1]).toBe('No data');
      });

      it('should stop the loading', () => {
        expect(commitFunction.mock.calls[3][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[3][1]).toBeFalsy();
      });
    });

    describe('when service is broken', () => {
      beforeEach(async () => {
        (boardService.getBoards as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve(null),
        );
        commitFunction = jest.fn();
        const context = { commit: commitFunction };
        const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
        await action(context);
      });

      it('should make the app loading', () => {
        expect(commitFunction.mock.calls[0][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[0][1]).toBeTruthy();
      });

      it('should commit empty array', () => {
        expect(commitFunction.mock.calls[1][0]).toBe(MUTATION_BOARD_SET_LIST);
        expect(commitFunction.mock.calls[1][1]).toStrictEqual([]);
      });

      it('should commit an error', () => {
        expect(commitFunction.mock.calls[2][0]).toBe(MUTATION_SET_ERROR);
        expect(commitFunction.mock.calls[2][1]).toBe(
          'Error while loading data',
        );
      });

      it('should stop the loading', () => {
        expect(commitFunction.mock.calls[3][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[3][1]).toBeFalsy();
      });
    });
  });
});
