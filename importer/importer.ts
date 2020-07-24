import { aggregateAccounts } from './services/account.service';

import { Connector, ConnectorResult } from './connector';
import { Consumer } from './consumer';
import ImporterError from './ImporterError';

class Importer {
  constructor(
    private connectors: Connector[] = [],
    private consumers: Consumer[] = [],
  ) {}

  init(): Promise<void> {
    return Promise.all([
      ...this.connectors.map(connector => connector.init()),
      ...this.consumers.map(consumer => consumer.init()),
    ])
      .then(() => undefined)
      .catch(err => Promise.reject(new ImporterError(err)));
  }

  async execute(): Promise<void> {
    const connectorsResults: ConnectorResult[] = await Promise.all(
      this.connectors.map(
        async (connector: Connector) => await connector.execute(),
      ),
    );

    const aggregatedConnectorsResults = connectorsResults.reduce(
      (aggregatedResult: ConnectorResult, result: ConnectorResult) => {
        return {
          accounts: [...aggregatedResult.accounts, ...result.accounts],
          messages: [...aggregatedResult.messages, ...result.messages],
        };
      },
      { accounts: [], messages: [] },
    );

    const accounts = aggregateAccounts(aggregatedConnectorsResults.accounts);
    const result = {
      accounts,
      messages: aggregatedConnectorsResults.messages,
    };

    this.consumers.forEach((consumer: Consumer) => consumer.execute(result));
  }
}

export default Importer;
