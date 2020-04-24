import { Board } from '@types';
import { generateBoards } from './board.service';
import boardsConfiguration from '../__fixtures__/boardsConfiguration';
import accounts from '../__fixtures__/accounts';

describe('board.service', () => {
  describe('generateBoards', () => {
    let result: Board[];

    beforeEach(() => {
      result = generateBoards(boardsConfiguration, accounts);
    });

    it('should return one board per board conf', () => {
      expect(result.length).toBe(boardsConfiguration.length);
    });

    it('should return return the id and name from conf', () => {
      expect(result[0].id).toBe(boardsConfiguration[0].id);
      expect(result[0].name).toBe(boardsConfiguration[0].name);
    });

    it('should calculate board total from each account', () => {
      expect(result[0].total).toBe(1234.12);
      expect(result[1].total).toBe(4321);
    });
  });
});
