import { Board } from '@types';
import axios from 'axios';
import mockBoards from '../../public/api/boards.json';
import { boardService } from './board.service';

jest.mock('axios');

describe('BoardService', () => {
  describe('getBoards', () => {
    let result: Board[] | null = null;

    describe('when api call is successful', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: mockBoards }),
        );
      });

      it('should return a list of boards', async () => {
        result = await boardService.getBoards();
        expect(result).toBe(mockBoards);
      });
    });

    describe('when api call is broken', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('any error'),
        );
      });

      it('should throw an error', async () => {
        await expect(boardService.getBoards()).rejects.toThrow(
          new Error('Error while requesting boards'),
        );
      });
    });
  });

  describe('getBoard', () => {
    let result: Board | null = null;

    describe('when api call is successful', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: mockBoards }),
        );
      });

      it('should return the board if given id exists', async () => {
        result = await boardService.getBoard(0);
        expect(result).toBe(mockBoards[0]);
      });

      it('should throw an error if given id does not exist', async () => {
        await expect(boardService.getBoard(-1)).rejects.toThrow(
          new Error('Requested board does not exist'),
        );
      });
    });

    describe('when api call is broken', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('any error'),
        );
      });

      it('should throw an error', async () => {
        await expect(boardService.getBoard(-1)).rejects.toThrow(
          new Error('Error while requesting board'),
        );
      });
    });
  });
});
