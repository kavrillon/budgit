// eslint-disable-next-line
const fs = require('fs');

import { Account } from '@types';
import { Consumer } from 'importer/consumer';
import { ConnectorResult } from 'importer/connector';
import { ConsumerResult } from '../ConsumerResult';
import ConsumerError from '../ConsumerError';
import { aggregateAccounts } from '../../services/account.service';

class ConsumerAccountSaver implements Consumer {
  static FOLDER_ACCOUNT = 'accounts';

  constructor(private path: string) {}

  init(): void | Promise<void> {
    if (fs.existsSync(this.path) === false) {
      return Promise.reject(new ConsumerError('Wrong path'));
    }
    return Promise.resolve();
  }

  execute(result: ConnectorResult): ConsumerResult {
    const accountPath = `${this.path}${ConsumerAccountSaver.FOLDER_ACCOUNT}`;

    if (fs.existsSync(accountPath) === false) {
      fs.mkdirSync(accountPath);
    }

    result.accounts.forEach((account: Account) => {
      let result = account;
      if (fs.existsSync(`${accountPath}/${account.id}.json`) === true) {
        const previousData = JSON.parse(
          fs.readFileSync(`${accountPath}/${account.id}.json`, 'utf8'),
        );
        previousData.lastUpdate = new Date(previousData.lastUpdate);
        result = aggregateAccounts([previousData, account])[0];
      }

      fs.writeFileSync(
        `${accountPath}/${account.id}.json`,
        JSON.stringify(result),
      );
    });

    return {
      message: null,
      status: true,
    };
  }
}

export default ConsumerAccountSaver;
