import { ConnectorResult } from './ConnectorResult';

export interface Connector {
  execute(): ConnectorResult;

  init(): void | Promise<void>;
}
