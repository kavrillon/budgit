import { Account } from '@types';
import { ConnectorResult } from 'importer/connector';

export const MOCK_ACC_1_PREVIOUS = {
  bank: 'BK_1',
  id: 'ACC_1',
  lastUpdate: new Date(2020, 1, 22),
  total: 121,
} as Account;

export const MOCK_ACC_1_1 = {
  bank: 'BK_1',
  id: 'ACC_1',
  lastUpdate: new Date(2020, 1, 12),
  total: 100,
} as Account;

export const MOCK_ACC_1_2 = {
  bank: 'BK_1',
  id: 'ACC_1',
  lastUpdate: new Date(2020, 1, 20),
  total: 250,
} as Account;

export const MOCK_ACC_1_MERGED = {
  bank: 'BK_1',
  id: 'ACC_1',
  lastUpdate: new Date(2020, 1, 20),
  total: 250,
} as Account;

export const MOCK_ACC_1_MERGED_WITH_PREVIOUS = {
  bank: 'BK_1',
  id: 'ACC_1',
  lastUpdate: new Date(2020, 1, 22),
  total: 121,
} as Account;

export const MOCK_ACC_2 = {
  bank: 'BK_2',
  id: 'ACC_2',
  lastUpdate: new Date(2020, 1, 14),
  total: 1202.23,
} as Account;

export const MOCK_ACC_3: Account = {
  bank: 'BK_3',
  id: 'ACC_3',
  lastUpdate: new Date(2019, 12, 8),
  total: 3086.88,
};

export const MOCK_CONNECTOR_RES_1 = {
  messages: ['any message 1', 'any message 2'],
  accounts: [MOCK_ACC_1_1],
} as ConnectorResult;

export const MOCK_CONNECTOR_RES_2 = {
  messages: ['any message 3', 'any message 4'],
  accounts: [MOCK_ACC_1_2, MOCK_ACC_2],
} as ConnectorResult;

export const MOCK_CONNECTOR_MERGED = {
  messages: [
    'any message 1',
    'any message 2',
    'any message 3',
    'any message 4',
  ],
  accounts: [MOCK_ACC_1_MERGED, MOCK_ACC_2],
} as ConnectorResult;

export const MOCK_CONNECTOR_RESULT = {
  messages: [],
  accounts: [MOCK_ACC_1_MERGED, MOCK_ACC_2, MOCK_ACC_3],
} as ConnectorResult;
