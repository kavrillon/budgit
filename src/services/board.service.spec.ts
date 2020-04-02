import { Board } from '@/@types';
import axios from 'axios';
import mockBoards from '../../public/data/boards.json';
import { boardService } from './board.service';

jest.mock('axios');

describe('BoardService', () => {
  describe('getBoards', () => {
    let result: Board[] | null = null;

    describe('when data exists', () => {
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

    describe('when no data', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('any error'),
        );
      });

      it('should return null', async () => {
        result = await boardService.getBoards();
        await expect(result).toBeNull();
      });
    });
  });

  describe('getBoard', () => {
    let result: Board | null = null;

    describe('when data exists', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.resolve({ data: mockBoards }),
        );
      });

      it('should return the board if given id exists', async () => {
        result = await boardService.getBoard(0);
        expect(result).toBe(mockBoards[0]);
      });

      it('should return null if given id does not exist', async () => {
        result = await boardService.getBoard(-1);
        expect(result).toBeNull();
      });
    });

    describe('when no data', () => {
      beforeEach(() => {
        (axios.get as jest.Mock).mockImplementationOnce(() =>
          Promise.reject('any error'),
        );
      });

      it('should return null', async () => {
        result = await boardService.getBoard(-1);
        expect(result).toBeNull();
      });
    });
  });
});
