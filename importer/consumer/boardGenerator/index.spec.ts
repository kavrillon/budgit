// eslint-disable-next-line
const fs = require('fs');
import { when, resetAllWhenMocks } from 'jest-when';

import ConsumerBoardGenerator from './index';
import ConsumerError from '../ConsumerError';
import { MOCK_BOARDS_CONF } from '../../__fixtures__/boardsConfiguration';
import { MOCK_CONNECTOR_RESULT } from '../../__fixtures__/accounts';
import { MOCK_BOARDS } from '../../__fixtures__/boards';

let consumer: ConsumerBoardGenerator;
const CSV_GOOD_PATH = 'any/working/path/to/files/';
const CSV_WRONG_PATH = 'any/broken/path/to/files/';

describe('ConsumerBoardGenerator', () => {
  beforeEach(() => {
    jest.spyOn(fs, 'writeFileSync');
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValue(JSON.stringify(MOCK_BOARDS_CONF));
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
    fs.existsSync.mockClear();
    fs.readFileSync.mockClear();
    fs.writeFileSync.mockClear();
  });

  describe('init', () => {
    it('should resolve if the given folder exists', async () => {
      consumer = new ConsumerBoardGenerator(CSV_GOOD_PATH);
      await expect(consumer.init()).resolves.toBe(undefined);
    });

    it('should resolve if a configuration file exists', async () => {
      const fnExists = jest.spyOn(fs, 'existsSync');
      when(fnExists)
        .calledWith(`${CSV_GOOD_PATH}conf.json`)
        .mockReturnValue(true);

      consumer = new ConsumerBoardGenerator(CSV_GOOD_PATH);
      await expect(consumer.init()).resolves.toBe(undefined);
    });

    it('should reject if the given folder does not exist', async () => {
      consumer = new ConsumerBoardGenerator(CSV_WRONG_PATH);
      await expect(consumer.init()).rejects.toThrow(
        new ConsumerError('Wrong path'),
      );
    });

    it('should reject if a configuration file does not exist', async () => {
      const fnExists = jest.spyOn(fs, 'existsSync');
      when(fnExists)
        .calledWith(`${CSV_GOOD_PATH}conf.json`)
        .mockReturnValue(false);

      consumer = new ConsumerBoardGenerator(CSV_GOOD_PATH);
      await expect(consumer.init()).rejects.toThrow(
        new ConsumerError('No configuration file'),
      );
    });

    it('should read the configuration file', async () => {
      const fnExists = jest.spyOn(fs, 'existsSync');
      when(fnExists)
        .calledWith(`${CSV_GOOD_PATH}conf.json`)
        .mockReturnValue(true);

      consumer = new ConsumerBoardGenerator(CSV_GOOD_PATH);
      consumer.init();
      await expect(fs.readFileSync).toHaveBeenCalledWith(
        `${CSV_GOOD_PATH}conf.json`,
        'utf8',
      );
    });

    it('should reject if the configuration file is not valid', async () => {
      jest.spyOn(fs, 'readFileSync').mockReturnValue('any not valid content');
      const fnExists = jest.spyOn(fs, 'existsSync');
      when(fnExists)
        .calledWith(`${CSV_GOOD_PATH}conf.json`)
        .mockReturnValue(true);

      consumer = new ConsumerBoardGenerator(CSV_GOOD_PATH);
      await expect(consumer.init()).rejects.toThrow(
        new ConsumerError('Configuration file is not valid'),
      );
    });
  });

  describe('execute', () => {
    beforeEach(() => {
      jest.spyOn(fs, 'existsSync').mockReturnValue(true);
      jest.spyOn(fs, 'writeFileSync').mockReturnValue(null);
      jest
        .spyOn(fs, 'readFileSync')
        .mockReturnValue(JSON.stringify(MOCK_BOARDS_CONF));

      consumer = new ConsumerBoardGenerator(CSV_GOOD_PATH);
      consumer.init();
    });

    it('should write a json file with generated boards', async () => {
      consumer.execute(MOCK_CONNECTOR_RESULT);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        `${CSV_GOOD_PATH}boards.json`,
        MOCK_BOARDS,
      );
    });
  });
});
