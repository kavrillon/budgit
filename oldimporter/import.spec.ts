// eslint-disable-next-line
const fs = require('fs');

import { when } from 'jest-when';
import { importFromFiles } from './import';
import * as mockBoards from './__fixtures__/boards.json';
import * as mockBoardsConfiguration from './__fixtures__/boardsConfiguration.json';

// eslint-disable-next-line
declare let global: any;

const SOURCE_FOLDER = '/any/source/path';
const CONFIG_FILE = '/any/config/file.json';
const DESTINATION_FOLDER = '/any/destination/path';
const MOCK_FILE_NAMES = ['file1.csv', 'file2.csv', 'file3.csv', 'anything.any'];

const MOCK_FILE_CONTENT_1 = fs.readFileSync(
  './importer/connector/csv/bpce/__fixtures__/success/file1.csv',
  'utf8',
);

const MOCK_FILE_CONTENT_2 = fs.readFileSync(
  './importer/connector/csv/bpce/__fixtures__/success/file2.csv',
  'utf8',
);

const MOCK_FILE_CONTENT_3 = fs.readFileSync(
  './importer/connector/csv/bpce/__fixtures__/success/file3.csv',
  'utf8',
);

describe('importFromFiles', () => {
  beforeAll(() => {
    global.console = { log: jest.fn() };
  });

  beforeEach(() => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue(MOCK_FILE_NAMES);
    const fnRead = jest.spyOn(fs, 'readFileSync');
    when(fnRead)
      .calledWith(`${SOURCE_FOLDER}/file1.csv`, 'utf8')
      .mockReturnValue(MOCK_FILE_CONTENT_1)
      .calledWith(`${SOURCE_FOLDER}/file2.csv`, 'utf8')
      .mockReturnValue(MOCK_FILE_CONTENT_2)
      .calledWith(`${SOURCE_FOLDER}/file3.csv`, 'utf8')
      .mockReturnValue(MOCK_FILE_CONTENT_3);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when destination folder does not exist', () => {
    beforeEach(() => {
      const fn = jest.spyOn(fs, 'existsSync');
      when(fn).calledWith(DESTINATION_FOLDER).mockReturnValue(false);

      jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {});
    });

    it('should create the folder', () => {
      importFromFiles(SOURCE_FOLDER, CONFIG_FILE, DESTINATION_FOLDER);
      expect(fs.mkdirSync).toHaveBeenCalledWith(DESTINATION_FOLDER);
    });
  });

  describe('when destination folder exists', () => {
    describe('when generated boards file does not exist', () => {
      beforeEach(() => {
        const fn = jest.spyOn(fs, 'existsSync');
        when(fn)
          .calledWith(DESTINATION_FOLDER)
          .mockReturnValue(true)
          .calledWith(`${DESTINATION_FOLDER}/boards.json`)
          .mockReturnValue(false);
        jest.spyOn(fs, 'unlinkSync').mockImplementation(() => {});
      });

      it('should not remove the file', () => {
        importFromFiles(SOURCE_FOLDER, CONFIG_FILE, DESTINATION_FOLDER);
        expect(fs.unlinkSync).not.toHaveBeenCalledWith(
          `${DESTINATION_FOLDER}/boards.json`,
        );
      });
    });

    describe('when generated boards file exists', () => {
      beforeEach(() => {
        jest.spyOn(fs, 'existsSync').mockReturnValue(true);
        jest.spyOn(fs, 'unlinkSync').mockImplementation(() => {});
      });

      it('should remove the file', () => {
        importFromFiles(SOURCE_FOLDER, CONFIG_FILE, DESTINATION_FOLDER);
        expect(fs.unlinkSync).toHaveBeenCalledWith(
          `${DESTINATION_FOLDER}/boards.json`,
        );
      });
    });
  });

  describe('when user conf exists', () => {
    beforeEach(() => {
      const fnExists = jest.spyOn(fs, 'existsSync');
      when(fnExists).calledWith(CONFIG_FILE).mockReturnValue(true);

      const fnRead = jest.spyOn(fs, 'readFileSync');
      when(fnRead)
        .calledWith(CONFIG_FILE, 'utf8')
        .mockReturnValue(mockBoardsConfiguration);

      jest.spyOn(fs, 'writeFileSync').mockReturnValue({});
    });

    it('should generate the board file', () => {
      importFromFiles(SOURCE_FOLDER, CONFIG_FILE, DESTINATION_FOLDER);
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        '/any/destination/path/boards.json',
        JSON.stringify(mockBoards),
      );
    });
  });

  // describe('when user conf does not exists', () => {});
});
