// eslint-disable-next-line
const fs = require('fs');
import { when, resetAllWhenMocks } from 'jest-when';

import ConnectorCsvBpce from './index';
import ConnectorCsvBpceError from './ConnectorCsvBpceError';

let connector: ConnectorCsvBpce;
const CSV_GOOD_PATH = 'any/working/path/to/files/';
const CSV_WRONG_PATH = 'any/broken/path/to/files/';

function getFileContent(filename: string): string {
  return fs.readFileSync(
    `./importer/connector/csv/bpce/__fixtures__/${filename}`,
    'utf8',
  );
}

const MOCKS = [
  { name: 'success_acc_1_1', content: getFileContent('success_acc_1_1.csv') },
  { name: 'success_acc_1_2', content: getFileContent('success_acc_1_2.csv') },
  { name: 'success_acc_2', content: getFileContent('success_acc_2.csv') },
  {
    name: 'error_nodata',
    content: getFileContent('error_nodata.csv'),
  },
  {
    name: 'error_cell_id',
    content: getFileContent('error_cell_id.csv'),
  },
  {
    name: 'error_cell_total',
    content: getFileContent('error_cell_total.csv'),
  },
  {
    name: 'error_cell_date',
    content: getFileContent('error_cell_date.csv'),
  },
  {
    name: 'error_cell_date_invalid',
    content: getFileContent('error_cell_date_invalid.csv'),
  },
  {
    name: 'error_cell_total_invalid',
    content: getFileContent('error_cell_total_invalid.csv'),
  },
];

function getMockContent(filename: string): string {
  return (MOCKS.find(m => m.name === filename) || { content: '' }).content;
}

async function initMonoFileConnector(filename: string) {
  jest.spyOn(fs, 'readdirSync').mockReturnValue([`${filename}.csv`]);
  jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(getMockContent(filename));

  connector = new ConnectorCsvBpce(CSV_GOOD_PATH);
  await connector.init();
}

describe('ConnectorCsvBpce', () => {
  beforeEach(() => {
    const fnExists = jest.spyOn(fs, 'existsSync');
    when(fnExists)
      .calledWith(CSV_WRONG_PATH)
      .mockReturnValue(false)
      .calledWith(CSV_GOOD_PATH)
      .mockReturnValue(true);
  });

  afterEach(() => {
    resetAllWhenMocks();
    jest.clearAllMocks();
  });

  describe('init', () => {
    it('should resolve if the given folder exists', async () => {
      connector = new ConnectorCsvBpce(CSV_GOOD_PATH);
      await expect(connector.init()).resolves.toBe(undefined);
    });

    it('should reject if the given folder does not exist', async () => {
      connector = new ConnectorCsvBpce(CSV_WRONG_PATH);
      await expect(connector.init()).rejects.toThrow(
        new ConnectorCsvBpceError('Wrong path'),
      );
    });
  });

  describe('execute', () => {
    describe('when files are valid', () => {
      beforeEach(async () => {
        jest
          .spyOn(fs, 'readdirSync')
          .mockReturnValue([
            'success_acc_1_1.csv',
            'success_acc_1_2.csv',
            'success_acc_2.csv',
          ]);

        jest
          .spyOn(fs, 'readFileSync')
          .mockReturnValueOnce(getMockContent('success_acc_1_1'))
          .mockReturnValueOnce(getMockContent('success_acc_1_2'))
          .mockReturnValueOnce(getMockContent('success_acc_2'));

        connector = new ConnectorCsvBpce(CSV_GOOD_PATH);
        await connector.init();
      });

      it('should parse each csv file', async () => {
        await connector.execute();

        expect(fs.readFileSync).toHaveBeenCalledWith(
          `${CSV_GOOD_PATH}success_acc_1_1.csv`,
          'utf8',
        );
        expect(fs.readFileSync).toHaveBeenCalledWith(
          `${CSV_GOOD_PATH}success_acc_1_2.csv`,
          'utf8',
        );
        expect(fs.readFileSync).toHaveBeenCalledWith(
          `${CSV_GOOD_PATH}success_acc_2.csv`,
          'utf8',
        );
      });

      it('should return an instance of ConnectorResult', async () => {
        const result = await connector.execute();

        expect(result.messages).toBeDefined();
        expect(result.accounts).toBeDefined();
      });

      it('should return account with the bank slug', async () => {
        const { accounts } = await connector.execute();

        expect(accounts[0]).toMatchObject({ bank: 'bpce' });
        expect(accounts[1]).toMatchObject({ bank: 'bpce' });
        expect(accounts[2]).toMatchObject({ bank: 'bpce' });
      });

      it('should return account ids', async () => {
        const { accounts } = await connector.execute();

        expect(accounts[0]).toMatchObject({ id: 'ACC_1' });
        expect(accounts[1]).toMatchObject({ id: 'ACC_1' });
        expect(accounts[2]).toMatchObject({ id: 'ACC_2' });
      });

      it('should return account total', async () => {
        const { accounts } = await connector.execute();

        expect(accounts[0]).toMatchObject({ total: 1134.12 });
        expect(accounts[1]).toMatchObject({ total: 1078.28 });
        expect(accounts[2]).toMatchObject({ total: 100 });
      });

      it('should return account last update date', async () => {
        const { accounts } = await connector.execute();

        expect(accounts[0]).toMatchObject({
          lastUpdate: new Date(2020, 1, 12, 0, 0, 0),
        });
        expect(accounts[1]).toMatchObject({
          lastUpdate: new Date(2020, 1, 20, 0, 0, 0),
        });
        expect(accounts[2]).toMatchObject({
          lastUpdate: new Date(2020, 1, 14, 0, 0, 0),
        });
      });
    });

    describe('when folder contains non-csv file', () => {
      beforeEach(async () => {
        jest.spyOn(fs, 'readdirSync').mockReturnValue(['file.nocsv']);

        connector = new ConnectorCsvBpce(CSV_GOOD_PATH);
        await connector.init();
      });

      it('should not parse non-csv files', async () => {
        await connector.execute();

        expect(fs.readFileSync).not.toHaveBeenCalledWith(
          `${CSV_GOOD_PATH}'file.nocsv'`,
          'utf8',
        );
      });
    });

    describe('when file does not exist anymore after init', () => {
      beforeEach(async () => {
        jest.spyOn(fs, 'readdirSync').mockReturnValue(['success_acc_1_1.csv']);
        jest.spyOn(fs, 'readFileSync').mockImplementationOnce(() => {
          throw new Error('any error');
        });

        connector = new ConnectorCsvBpce(CSV_GOOD_PATH);
        await connector.init();
      });

      it('should return a message with the error', async () => {
        const { messages } = await connector.execute();
        expect(messages[0]).toBe(
          'ConnectorCsvBpceError: Error reading file [success_acc_1_1.csv]',
        );
      });
    });

    describe('when a parsed file does not contain id', () => {
      describe('when no csv line', () => {
        it('should not return any account', async () => {
          await initMonoFileConnector('error_no_data');
          const { accounts } = await connector.execute();
          expect(accounts.length).toBe(0);
        });

        it('should return a message with the error', async () => {
          await initMonoFileConnector('error_no_data');
          const { messages } = await connector.execute();
          expect(messages[0]).toBe(
            'ConnectorCsvBpceError: Cell unreachable [error_no_data.csv]',
          );
        });
      });

      describe('when no csv cell', () => {
        it('content should not return any account', async () => {
          await initMonoFileConnector('error_cell_id');
          const { accounts } = await connector.execute();
          expect(accounts.length).toBe(0);
        });

        it('should return a message with the error', async () => {
          await initMonoFileConnector('error_cell_id');
          const { messages } = await connector.execute();
          expect(messages[0]).toBe(
            'ConnectorCsvBpceError: Empty cell [error_cell_id.csv]',
          );
        });
      });
    });

    describe('when a parsed file has an incorrect total', () => {
      describe('when no csv line', () => {
        it('should not return any account', async () => {
          await initMonoFileConnector('error_nodata');
          const { accounts } = await connector.execute();
          expect(accounts.length).toBe(0);
        });

        it('should return a message with the error', async () => {
          await initMonoFileConnector('error_nodata');
          const { messages } = await connector.execute();
          expect(messages.length).toBe(1);
        });
      });

      describe('when no csv cell', () => {
        it('content should not return any account', async () => {
          await initMonoFileConnector('error_cell_total');
          const { accounts } = await connector.execute();
          expect(accounts.length).toBe(0);
        });

        it('should return a message with the error', async () => {
          await initMonoFileConnector('error_cell_total');
          const { messages } = await connector.execute();
          expect(messages.length).toBe(1);
        });
      });

      describe('when value is not a number', () => {
        it('should not return any account', async () => {
          await initMonoFileConnector('error_cell_total_invalid');
          const { accounts } = await connector.execute();
          expect(accounts.length).toBe(0);
        });

        it('should return a message with the error', async () => {
          await initMonoFileConnector('error_cell_total_invalid');
          const { messages } = await connector.execute();
          expect(messages[0]).toBe(
            'ConnectorCsvBpceError: Not a number [error_cell_total_invalid.csv]',
          );
        });
      });
    });

    describe('when a parsed file has an incorrect date', () => {
      describe('when no csv line', () => {
        it('should not return any account', async () => {
          await initMonoFileConnector('error_nodata');
          const { accounts } = await connector.execute();
          expect(accounts.length).toBe(0);
        });

        it('should return a message with the error', async () => {
          await initMonoFileConnector('error_nodata');
          const { messages } = await connector.execute();
          expect(messages.length).toBe(1);
        });
      });

      describe('when no csv cell', () => {
        it('content should not return any account', async () => {
          await initMonoFileConnector('error_cell_date');
          const { accounts } = await connector.execute();
          expect(accounts.length).toBe(0);
        });

        it('should return a message with the error', async () => {
          await initMonoFileConnector('error_cell_date');
          const { messages } = await connector.execute();
          expect(messages.length).toBe(1);
        });
      });

      describe('when value is not a date', () => {
        it('should not return any account', async () => {
          await initMonoFileConnector('error_cell_date_invalid');
          const { accounts } = await connector.execute();
          expect(accounts.length).toBe(0);
        });

        it('should return a message with the error', async () => {
          await initMonoFileConnector('error_cell_date_invalid');
          const { messages } = await connector.execute();
          expect(messages[0]).toBe(
            'ConnectorCsvBpceError: Not a date [error_cell_date_invalid.csv]',
          );
        });
      });
    });
  });
});
