// eslint-disable-next-line
const fs = require('fs');
import { when, resetAllWhenMocks } from 'jest-when';

import ConsumerAccountSaver from './index';
import ConsumerError from '../ConsumerError';
import {
  MOCK_CONNECTOR_RESULT,
  MOCK_ACC_1_PREVIOUS,
  MOCK_ACC_1_MERGED_WITH_PREVIOUS,
} from '../../__fixtures__/accounts';

let consumer: ConsumerAccountSaver;
const CSV_GOOD_PATH = 'any/working/path/to/files/';
const CSV_WRONG_PATH = 'any/broken/path/to/files/';

describe('ConsumerAccountSaver', () => {
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
      consumer = new ConsumerAccountSaver(CSV_GOOD_PATH);
      await expect(consumer.init()).resolves.toBe(undefined);
    });

    it('should reject if the given folder does not exist', async () => {
      consumer = new ConsumerAccountSaver(CSV_WRONG_PATH);
      await expect(consumer.init()).rejects.toThrow(
        new ConsumerError('Wrong path'),
      );
    });
  });

  describe('execute', () => {
    beforeEach(() => {
      consumer = new ConsumerAccountSaver(CSV_GOOD_PATH);
      consumer.init();
      jest.spyOn(fs, 'mkdirSync').mockReturnValue(null);
      jest.spyOn(fs, 'writeFileSync').mockReturnValue(null);
    });

    afterEach(() => {
      resetAllWhenMocks();
      jest.clearAllMocks();
      fs.existsSync.mockClear();
      fs.mkdirSync.mockClear();
      fs.writeFileSync.mockClear();
    });

    it('should test if accounts already exist', async () => {
      consumer.execute(MOCK_CONNECTOR_RESULT);

      let account = MOCK_CONNECTOR_RESULT.accounts[0];
      expect(fs.existsSync).toHaveBeenCalledWith(
        `${CSV_GOOD_PATH}accounts/${account.id}.json`,
      );

      account = MOCK_CONNECTOR_RESULT.accounts[1];
      expect(fs.existsSync).toHaveBeenCalledWith(
        `${CSV_GOOD_PATH}accounts/${account.id}.json`,
      );
    });

    it('should write a json file per account', async () => {
      consumer.execute(MOCK_CONNECTOR_RESULT);
      expect(fs.writeFileSync).toHaveBeenCalledTimes(3);

      let account = MOCK_CONNECTOR_RESULT.accounts[0];
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        `${CSV_GOOD_PATH}accounts/${account.id}.json`,
        JSON.stringify(account),
      );

      account = MOCK_CONNECTOR_RESULT.accounts[1];
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        `${CSV_GOOD_PATH}accounts/${account.id}.json`,
        JSON.stringify(account),
      );

      account = MOCK_CONNECTOR_RESULT.accounts[2];
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        `${CSV_GOOD_PATH}accounts/${account.id}.json`,
        JSON.stringify(account),
      );
    });

    describe('when the account folder does not exist', () => {
      it('should create it', async () => {
        when(jest.spyOn(fs, 'existsSync'))
          .calledWith(`${CSV_GOOD_PATH}accounts`)
          .mockReturnValue(false);

        consumer.execute(MOCK_CONNECTOR_RESULT);
        expect(fs.mkdirSync).toHaveBeenCalledWith(`${CSV_GOOD_PATH}accounts`);
      });
    });

    describe('when the account folder already exist', () => {
      it('should not create it', async () => {
        when(jest.spyOn(fs, 'existsSync'))
          .calledWith(`${CSV_GOOD_PATH}accounts`)
          .mockReturnValue(true);

        consumer.execute(MOCK_CONNECTOR_RESULT);
        expect(fs.mkdirSync).not.toHaveBeenCalledWith(
          `${CSV_GOOD_PATH}accounts`,
        );
      });
    });

    describe('when an account already exist', () => {
      it('should aggregate previous data with new one', async () => {
        const account = MOCK_CONNECTOR_RESULT.accounts[0];
        when(jest.spyOn(fs, 'existsSync'))
          .calledWith(`${CSV_GOOD_PATH}accounts/${account.id}.json`)
          .mockReturnValue(true);

        when(jest.spyOn(fs, 'readFileSync'))
          .calledWith(`${CSV_GOOD_PATH}accounts/${account.id}.json`, 'utf8')
          .mockReturnValue(JSON.stringify(MOCK_ACC_1_PREVIOUS));

        consumer.execute(MOCK_CONNECTOR_RESULT);

        expect(fs.writeFileSync).toHaveBeenCalledWith(
          `${CSV_GOOD_PATH}accounts/${account.id}.json`,
          JSON.stringify(MOCK_ACC_1_MERGED_WITH_PREVIOUS),
        );
      });
    });
  });
});
