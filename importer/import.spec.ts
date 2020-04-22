// eslint-disable-next-line
const fs = require('fs');
import { importFiles } from './import';

declare var global: any;

const SOURCE_FOLDER = '/any/source/path';
const DESTINATION_FOLDER = '/any/destination/path';
const MOCK_FILE_NAMES = ['file1.csv', 'file2.csv', 'file3.csv', 'anything.any'];

jest.mock('fs');

describe('importFiles', () => {
  beforeEach(() => {
    global.console = { log: jest.fn() };

    fs.readdirSync = jest.fn().mockImplementationOnce(() => {
      return MOCK_FILE_NAMES;
    });

    fs.readFileSync = jest.fn();
    fs.writeFileSync = jest.fn();
  });

  it('should not read non-csv files', () => {
    importFiles(SOURCE_FOLDER, DESTINATION_FOLDER);
    expect(fs.readFileSync).not.toHaveBeenCalledWith(
      '/any/source/path/anything.any',
      'utf8',
    );
  });

  it('should read all csv files from the given folder', () => {
    importFiles(SOURCE_FOLDER, DESTINATION_FOLDER);
    expect(fs.readFileSync).toHaveBeenCalledTimes(3);
  });

  it('should generate the boards json file in the destination folder', () => {
    importFiles(SOURCE_FOLDER, DESTINATION_FOLDER);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/any/destination/path/boards.json',
      '',
    );
  });
});
