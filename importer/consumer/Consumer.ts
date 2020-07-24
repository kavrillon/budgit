import { ConnectorResult } from 'importer/connector';
import { ConsumerResult } from './ConsumerResult';

export interface Consumer {
  execute(result: ConnectorResult): ConsumerResult;

  init(): void | Promise<void>;
}
