// eslint-disable-next-line
const fs = require('fs');
import { importFiles } from './import';
import mockBoards from './__fixtures__/boards';

// eslint-disable-next-line
declare let global: any;

const SOURCE_FOLDER = '/any/source/path';
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

describe('importFiles', () => {
  beforeAll(() => {
    global.console = { log: jest.fn() };
  });

  beforeEach(() => {
    jest.spyOn(fs, 'readdirSync').mockReturnValue(MOCK_FILE_NAMES);
    jest
      .spyOn(fs, 'readFileSync')
      .mockReturnValueOnce(MOCK_FILE_CONTENT_1)
      .mockReturnValueOnce(MOCK_FILE_CONTENT_2)
      .mockReturnValueOnce(MOCK_FILE_CONTENT_3);
    jest.spyOn(fs, 'writeFileSync').mockReturnValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
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
    expect(fs.readFileSync).toHaveBeenCalledWith(
      '/any/source/path/file1.csv',
      'utf8',
    );
    expect(fs.readFileSync).toHaveBeenCalledWith(
      '/any/source/path/file2.csv',
      'utf8',
    );
    expect(fs.readFileSync).toHaveBeenCalledWith(
      '/any/source/path/file3.csv',
      'utf8',
    );
  });

  it('should generate the boards json file in the destination folder', () => {
    importFiles(SOURCE_FOLDER, DESTINATION_FOLDER);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      '/any/destination/path/boards.json',
      JSON.stringify(mockBoards),
    );
  });
});
