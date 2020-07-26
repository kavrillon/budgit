import { Account } from '@types';

export type ConnectorCsvBpceParseResult = {
  account: Account | null;
  message: string | null;
};
