import { BoardConfiguration } from '@types';

export const MOCK_BOARDS_CONF = [
  {
    id: 0,
    name: 'Test board',
    accounts: ['ACC_1', 'ACC_2'],
  },
  {
    id: 1,
    name: 'Demo board',
    accounts: ['ACC_1', 'ACC_2', 'ACC_3'],
  },
] as BoardConfiguration[];
