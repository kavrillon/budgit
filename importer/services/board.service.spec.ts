import { Board } from '@types';
import { generateBoardsFromConf } from './board.service';
import { MOCK_BOARD_CONFIGURATION } from './__fixtures__/boardsConfiguration';
import accounts from './__fixtures__/accounts';

describe('board.service', () => {
  describe('generateBoardsFromConf', () => {
    let result: Board[];

    beforeEach(() => {
      result = generateBoardsFromConf(MOCK_BOARD_CONFIGURATION, accounts);
    });

    it('should return one board per board conf', () => {
      expect(result.length).toBe(MOCK_BOARD_CONFIGURATION.length);
    });

    it('should return the id and name from conf', () => {
      expect(result[0].id).toBe(MOCK_BOARD_CONFIGURATION[0].id);
      expect(result[0].name).toBe(MOCK_BOARD_CONFIGURATION[0].name);
    });

    it('should calculate board total from each account', () => {
      expect(result[0].total).toBe(1234.12);
      expect(result[1].total).toBe(4321);
    });
  });
});
