// eslint-disable-next-line
const fs = require('fs');

import { Connector } from 'importer/connector';
import { ConnectorResult } from 'importer/connector/ConnectorResult';

import ConnectorCsvBpceError from './ConnectorCsvBpceError';
import { ConnectorCsvBpceParseResult } from './ConnectorCsvBpceParseResult';

class ConnectorCsvBpce implements Connector {
  static BANK_SLUG = 'bpce';
  static CSV_INFO_LINES = [0, 1]; // two first lines are infos about the account
  static SEPARATOR_CELL = ';';
  static SEPARATOR_DATE = '/';
  static SEPARATOR_LABEL = ' : ';
  static SEPARATOR_LINE = '\n';

  constructor(private path: string) {}

  public init = (): Promise<void> => {
    if (fs.existsSync(this.path) === false) {
      return Promise.reject(new ConnectorCsvBpceError('Wrong path'));
    }
    return Promise.resolve();
  };

  public execute = (): ConnectorResult => {
    const results = fs
      .readdirSync(this.path)
      .filter((file: string) => file.endsWith('.csv'))
      .map((filename: string) => this.parseFileContent(filename));

    const accounts = results
      .filter((r: ConnectorCsvBpceParseResult) => r.account !== null)
      .map((r: ConnectorCsvBpceParseResult) => r.account);

    const messages = results
      .filter((r: ConnectorCsvBpceParseResult) => r.message !== null)
      .map((r: ConnectorCsvBpceParseResult) => r.message);

    return {
      accounts,
      messages,
    };
  };

  private parseFileContent = (
    filename: string,
  ): ConnectorCsvBpceParseResult => {
    let fileContent: string;

    try {
      try {
        fileContent = fs.readFileSync(`${this.path}${filename}`, 'utf8');
      } catch (err) {
        throw new ConnectorCsvBpceError('Error reading file');
      }

      const id = this.getValueFromCsvMatrix(fileContent, 1, 0, true);
      const total = this.getNumberFromCsvValue(
        this.getValueFromCsvMatrix(fileContent, 3, 4),
      );
      const lastUpdate = this.getDateFromCsvValue(
        this.getValueFromCsvMatrix(fileContent, 0, 3, true),
      );

      return {
        message: null,
        account: {
          bank: ConnectorCsvBpce.BANK_SLUG,
          id,
          lastUpdate,
          total,
        },
      };
    } catch (err) {
      return {
        message: `${err.toString()} [${filename}]`,
        account: null,
      };
    }
  };

  private getNumberFromCsvValue(number: string): number {
    const result = parseFloat(number);
    if (isNaN(result) === false) {
      return result;
    }
    throw new ConnectorCsvBpceError(`Not a number`);
  }

  private getDateFromCsvValue(date: string): Date {
    const splits = date.split(ConnectorCsvBpce.SEPARATOR_DATE);
    const day = parseInt(splits[0]);
    const month = parseInt(splits[1]) - 1;
    const year = parseInt(splits[2]);
    const result = new Date(year, month, day, 0, 0, 0);

    if (isNaN(result.getTime()) === false) {
      return result;
    }
    throw new ConnectorCsvBpceError(`Not a date`);
  }

  private getValueFromCsvMatrix(
    fileContent: string,
    line: number,
    cell: number,
    labelled = false,
  ): string {
    let lineContent,
      valueContent,
      result = '';
    try {
      lineContent = fileContent.split(ConnectorCsvBpce.SEPARATOR_LINE)[line];
      valueContent = lineContent.split(ConnectorCsvBpce.SEPARATOR_CELL)[cell];

      if (labelled === true) {
        result = valueContent.split(ConnectorCsvBpce.SEPARATOR_LABEL)[1];
      } else {
        result = valueContent;
      }
    } catch (e) {
      throw new ConnectorCsvBpceError(`Cell unreachable`);
    }

    if (typeof result === 'undefined' || result.length === 0) {
      throw new ConnectorCsvBpceError(`Empty cell`);
    }
    return result;
  }
}

export default ConnectorCsvBpce;
