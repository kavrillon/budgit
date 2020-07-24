import { Consumer } from 'importer/consumer';
import { ConnectorResult } from 'importer/connector';
import { ConsumerResult } from '../ConsumerResult';

class ConsumerLogger implements Consumer {
  init(): void | Promise<void> {
    return Promise.resolve();
  }

  execute(result: ConnectorResult): ConsumerResult {
    console.log('');
    console.log('## Imported accounts');
    console.log('');

    result.accounts.forEach(account => {
      console.log(
        `- ${account.bank}/${account.id} --- ${this.formatDate(
          account.lastUpdate,
        )} --- ${account.total} €`,
      );
    });

    console.log('');
    console.log('## Notifications');
    console.log('');

    result.messages.forEach(message => {
      console.log(message);
    });

    return {
      message: null,
      status: true,
    };
  }

  private formatDate(date: Date): string {
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    return `${da}/${mo}/${ye}`;
  }
}

export default ConsumerLogger;
