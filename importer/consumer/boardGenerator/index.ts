// eslint-disable-next-line
const fs = require('fs');

import { BoardConfiguration } from '@types';
import { Consumer } from 'importer/consumer';
import ConsumerError from '../ConsumerError';
import { ConnectorResult } from 'importer/connector';
import { ConsumerResult } from '../ConsumerResult';
import { generateBoardsFromConf } from '../../services/board.service';

class ConsumerBoardGenerator implements Consumer {
  static configurationFilename = 'conf.json';
  static boardFilename = 'boards.json';

  private configuration: BoardConfiguration[] = [];

  constructor(private path: string) {}

  init(): void | Promise<void> {
    if (fs.existsSync(this.path) === false) {
      return Promise.reject(new ConsumerError('Wrong path'));
    }
    if (
      fs.existsSync(
        `${this.path}${ConsumerBoardGenerator.configurationFilename}`,
      ) === false
    ) {
      return Promise.reject(new ConsumerError('No configuration file'));
    }

    try {
      this.configuration = JSON.parse(
        fs.readFileSync(
          `${this.path}${ConsumerBoardGenerator.configurationFilename}`,
          'utf8',
        ),
      ) as BoardConfiguration[];
    } catch (err) {
      return Promise.reject(
        new ConsumerError('Configuration file is not valid'),
      );
    }

    return Promise.resolve();
  }

  execute(result: ConnectorResult): ConsumerResult {
    fs.writeFileSync(
      `${this.path}${ConsumerBoardGenerator.boardFilename}`,
      generateBoardsFromConf(this.configuration, result.accounts),
    );

    return {
      message: null,
      status: true,
    };
  }
}

export default ConsumerBoardGenerator;
