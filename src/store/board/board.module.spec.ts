import { boardService } from '@/services/board.service';
import {
  actions,
  ACTION_BOARD_FETCH_ITEM,
  ACTION_BOARD_FETCH_LIST,
} from './actions';
import {
  MUTATION_BOARD_LOADING_CURRENT,
  MUTATION_BOARD_LOADING_LIST,
  MUTATION_BOARD_SET_LIST,
  MUTATION_BOARD_SET_CURRENT,
} from './mutations';
import { initialState } from './board.module';
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
        const context = { commit: commitFunction, state: { ...initialState } };
        const action = actions[ACTION_BOARD_FETCH_ITEM] as Function;
        await action(context, 0);
      });

      it('should make the app loading', () => {
        expect(commitFunction.mock.calls[0][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[0][1]).toBeTruthy();
      });

      it('should make the current item loading', () => {
        expect(commitFunction.mock.calls[1][0]).toBe(
          MUTATION_BOARD_LOADING_CURRENT,
        );
        expect(commitFunction.mock.calls[1][1]).toBeTruthy();
      });

      it('should commit the board', () => {
        expect(commitFunction.mock.calls[2][0]).toBe(
          MUTATION_BOARD_SET_CURRENT,
        );
        expect(commitFunction.mock.calls[2][1]).toBe(mockBoards[0]);
      });

      it('should stop the current item loading', () => {
        expect(commitFunction.mock.calls[3][0]).toBe(
          MUTATION_BOARD_LOADING_CURRENT,
        );
        expect(commitFunction.mock.calls[3][1]).toBeFalsy();
      });

      it('should stop the loading', () => {
        expect(commitFunction.mock.calls[4][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[4][1]).toBeFalsy();
      });
    });

    describe('when service return an error', () => {
      beforeEach(async () => {
        (boardService.getBoard as jest.Mock).mockImplementationOnce(() =>
          Promise.reject(new Error('any error')),
        );
        commitFunction = jest.fn();
        const context = { commit: commitFunction, state: { ...initialState } };
        const action = actions[ACTION_BOARD_FETCH_ITEM] as Function;
        await action(context, 0);
      });

      it('should commit a null object', async () => {
        expect(commitFunction.mock.calls[2][0]).toBe(
          MUTATION_BOARD_SET_CURRENT,
        );
        expect(commitFunction.mock.calls[2][1]).toBeNull();
      });

      it('should commit the error', () => {
        expect(commitFunction.mock.calls[3][0]).toBe(MUTATION_SET_ERROR);
        expect(commitFunction.mock.calls[3][1]).toBe('any error');
      });
    });

    describe('when the same object is already in state', () => {
      beforeEach(async () => {
        boardService.getBoard = jest.fn();
        commitFunction = jest.fn();
        const context = {
          commit: commitFunction,
          state: { ...initialState, current: mockBoards[0] },
        };
        const action = actions[ACTION_BOARD_FETCH_ITEM] as Function;
        await action(context, 0);
      });

      it('should not call the service', () => {
        expect(boardService.getBoard).toHaveBeenCalledTimes(0);
      });

      it('should not call any mutation', () => {
        expect(commitFunction.mock.calls.length).toBe(0);
      });
    });

    describe('when a different object is already in state', () => {
      beforeEach(async () => {
        boardService.getBoard = jest.fn();
        commitFunction = jest.fn();
        const context = {
          commit: commitFunction,
          state: { ...initialState, current: mockBoards[0] },
        };
        const action = actions[ACTION_BOARD_FETCH_ITEM] as Function;
        await action(context, 1);
      });

      it('should call the service', () => {
        expect(boardService.getBoard).toHaveBeenCalled();
      });

      it('should call mutations', () => {
        expect(commitFunction.mock.calls.length).toBeGreaterThan(0);
      });
    });

    describe('when an object is already requested', () => {
      beforeEach(async () => {
        boardService.getBoard = jest.fn();
        commitFunction = jest.fn();
        const context = {
          commit: commitFunction,
          state: { ...initialState, loadingCurrent: true },
        };
        const action = actions[ACTION_BOARD_FETCH_ITEM] as Function;
        await action(context, 0);
      });

      it('should not call the service', () => {
        expect(boardService.getBoard).toHaveBeenCalledTimes(0);
      });

      it('should not call any mutation', () => {
        expect(commitFunction.mock.calls.length).toBe(0);
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
        const context = { commit: commitFunction, state: { ...initialState } };
        const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
        await action(context);
      });

      it('should make the app loading', () => {
        expect(commitFunction.mock.calls[0][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[0][1]).toBeTruthy();
      });

      it('should make the list loading', () => {
        expect(commitFunction.mock.calls[1][0]).toBe(
          MUTATION_BOARD_LOADING_LIST,
        );
        expect(commitFunction.mock.calls[1][1]).toBeTruthy();
      });

      it('should commit the list of boards', () => {
        expect(commitFunction.mock.calls[2][0]).toBe(MUTATION_BOARD_SET_LIST);
        expect(commitFunction.mock.calls[2][1]).toBe(mockBoards);
      });

      it('should stop the list loading', () => {
        expect(commitFunction.mock.calls[3][0]).toBe(
          MUTATION_BOARD_LOADING_LIST,
        );
        expect(commitFunction.mock.calls[3][1]).toBeFalsy();
      });

      it('should stop the loading', () => {
        expect(commitFunction.mock.calls[4][0]).toBe(MUTATION_SET_LOADING);
        expect(commitFunction.mock.calls[4][1]).toBeFalsy();
      });
    });

    describe('when service return no data', () => {
      beforeEach(async () => {
        (boardService.getBoards as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve([]),
        );
        commitFunction = jest.fn();
        const context = { commit: commitFunction, state: { ...initialState } };
        const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
        await action(context);
      });

      it('should commit an error', () => {
        expect(commitFunction.mock.calls[2][0]).toBe(MUTATION_SET_ERROR);
        expect(commitFunction.mock.calls[2][1]).toBe('No data');
      });

      it('should commit empty array', () => {
        expect(commitFunction.mock.calls[3][0]).toBe(MUTATION_BOARD_SET_LIST);
        expect(commitFunction.mock.calls[3][1]).toStrictEqual([]);
      });
    });

    describe('when service return an error', () => {
      beforeEach(async () => {
        (boardService.getBoards as jest.Mock).mockImplementationOnce(() =>
          Promise.reject(),
        );
        commitFunction = jest.fn();
        const context = { commit: commitFunction, state: { ...initialState } };
        const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
        await action(context);
      });

      it('should commit an error', () => {
        expect(commitFunction.mock.calls[2][0]).toBe(MUTATION_SET_ERROR);
        expect(commitFunction.mock.calls[2][1]).toBe(
          'Error while loading data',
        );
      });

      it('should commit empty array', () => {
        expect(commitFunction.mock.calls[3][0]).toBe(MUTATION_BOARD_SET_LIST);
        expect(commitFunction.mock.calls[3][1]).toStrictEqual([]);
      });
    });

    describe('when a list is already loaded', () => {
      beforeEach(async () => {
        boardService.getBoards = jest.fn();
        commitFunction = jest.fn();
        const context = {
          commit: commitFunction,
          state: { ...initialState, list: mockBoards },
        };
        const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
        await action(context);
      });

      it('should not call the service', () => {
        expect(boardService.getBoards).toHaveBeenCalledTimes(0);
      });

      it('should not call any mutation', () => {
        expect(commitFunction.mock.calls.length).toBe(0);
      });
    });

    describe('when the list is already requested', () => {
      beforeEach(async () => {
        boardService.getBoards = jest.fn();
        commitFunction = jest.fn();
        const context = {
          commit: commitFunction,
          state: { ...initialState, loadingList: true },
        };
        const action = actions[ACTION_BOARD_FETCH_LIST] as Function;
        await action(context);
      });

      it('should not call the service', () => {
        expect(boardService.getBoards).toHaveBeenCalledTimes(0);
      });

      it('should not call any mutation', () => {
        expect(commitFunction.mock.calls.length).toBe(0);
      });
    });
  });
});
