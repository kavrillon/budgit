import * as fs from 'fs';

import { importBPCE } from './bpce';
import { Account } from '../@types';

const RESULT_FOLDER = './public/data/';
const SOURCE_FOLDER = process.env.BUDGIT_DATA_PATH + 'bpce/';

/**
 * Import accounts of all banks (parse exported files in a global json file understandable by the app)
 * @param sourceFolder string: source of all export files
 * @param resultFolder string: path where to put the generated json file
 */
const importAccounts = (sourceFolder: string, resultFolder: string): void => {
  let allAccounts: Account[] = [];

  const bpceAccounts: Account[] = importBPCE(sourceFolder);
  allAccounts = allAccounts.concat(bpceAccounts);

  fs.writeFileSync(
    `${resultFolder}/accounts.json`,
    JSON.stringify(allAccounts)
  );
};

// Launching bank account imports
importAccounts(SOURCE_FOLDER, RESULT_FOLDER);
