import { BoardConfiguration } from '@types';

export const BOARD_CONF_1: BoardConfiguration = {
  id: 0,
  name: 'Test board',
  accounts: ['ACC_1', 'ACC_2'],
};

export const BOARD_CONF_2: BoardConfiguration = {
  id: 1,
  name: 'Demo board',
  accounts: ['ACC_1', 'ACC_2', 'ACC_3'],
};

export default [BOARD_CONF_1, BOARD_CONF_2];
