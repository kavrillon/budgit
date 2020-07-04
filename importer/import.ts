// eslint-disable-next-line
const fs = require('fs');

import { Account } from '@types';
import { parseBpceCsv } from './connector';
import { aggregateAccounts } from './service/account.service';
import { generateBoardsFromConf } from './service/board.service';
import mockBoardsConfiguration from './__fixtures__/boardsConfiguration';

export const importFromFiles = (
  sourceFolder: string,
  destinationFolder: string,
): void => {
  console.log('# Lauching importer...');
  console.log('sourceFolder:', sourceFolder);

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

  const boards = generateBoardsFromConf(
    mockBoardsConfiguration,
    aggregatedAccounts,
  );
  fs.writeFileSync(`${destinationFolder}/boards.json`, JSON.stringify(boards));
};
