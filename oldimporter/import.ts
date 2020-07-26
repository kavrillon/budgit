// eslint-disable-next-line
const fs = require('fs');

import { Account } from '@types';
import { parseBpceCsv } from './connector';
import { aggregateAccounts } from './service/account.service';
import { generateBoardsFromConf } from './service/board.service';

const boardsDataPath = (destinationFolder: string): string =>
  `${destinationFolder}/boards.json`;

export const importFromFiles = (
  sourceFolder: string,
  configFile: string,
  destinationFolder: string,
): void => {
  console.log('# Lauching importer...');
  console.log('sourceFolder:', sourceFolder);
  console.log('configFolder:', configFile);
  console.log('destinationFolder:', destinationFolder);

  cleanDestinationFolder(destinationFolder);
  console.log('Destination folder cleaned.');

  const filesNames: string[] = fs
    .readdirSync(sourceFolder)
    .filter((file: string) => file.endsWith('.csv'));

  console.log('files:', filesNames.length);

  const parsedCsvAccounts: Account[] = [];
  filesNames.forEach(filename => {
    const content = fs.readFileSync(`${sourceFolder}/${filename}`, 'utf8');
    parsedCsvAccounts.push(parseBpceCsv(content));
  });
  console.log('parsed files', parsedCsvAccounts.length);

  const aggregatedAccounts = aggregateAccounts(parsedCsvAccounts);
  aggregatedAccounts.forEach((account: Account) => {
    console.log(
      `imported account: ${
        account.id
      }, date: ${account.lastUpdate.toLocaleString()}`,
    );
  });

  if (fs.existsSync(configFile)) {
    const boardsDataPath = `${destinationFolder}/boards.json`;
    const boardsConfiguration = JSON.parse(fs.readFileSync(configFile, 'utf8'));

    const boards = generateBoardsFromConf(
      boardsConfiguration,
      aggregatedAccounts,
    );
    fs.writeFileSync(boardsDataPath, JSON.stringify(boards));
    console.log('boards generated: ', boards.length);
  }
};

const cleanDestinationFolder = (destinationFolder: string) => {
  if (fs.existsSync(destinationFolder) === false) {
    fs.mkdirSync(destinationFolder);
    return;
  }

  if (fs.existsSync(boardsDataPath(destinationFolder))) {
    fs.unlinkSync(boardsDataPath(destinationFolder));
  }
};
