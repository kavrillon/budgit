import * as fs from 'fs';
import rmfr from 'rmfr';

import { importBPCE } from './bpce';
import { Account, Board } from '@/@types';

const RESULT_FOLDER = './public/data/';
const SOURCE_FOLDER = process.env.BUDGIT_DATA_PATH + 'bpce/';

/**
 * Import accounts of all banks (parse exported files in a global json file understandable by the app)
 * @param sourceFolder string: source of all export files
 * @param resultFolder string: path where to put the generated json file
 */
const importAccounts = async (
  sourceFolder: string,
  resultFolder: string,
): Promise<void> => {
  let allAccounts: Account[] = [];

  const bpceAccounts: Account[] = importBPCE(sourceFolder);
  allAccounts = allAccounts.concat(bpceAccounts);

  const board: Board = {
    accounts: allAccounts,
    id: 1,
    total: allAccounts.reduce((total, account) => {
      return total + account.total;
    }, 0),
  };

  // Save accounts
  await cleanFolder(resultFolder);
  saveBoard(resultFolder, board);
};

const saveBoard = (folder: string, board: Board): void => {
  fs.mkdirSync(`${folder}/board`);
  fs.mkdirSync(`${folder}/accounts`);

  fs.writeFileSync(`${folder}/board/${board.id}.json`, JSON.stringify(board));

  board.accounts.forEach((account: Account) => {
    fs.writeFileSync(
      `${folder}/accounts/${account.number}.json`,
      JSON.stringify(account),
    );
  });
};

const cleanFolder = async (folder: string): Promise<void> => {
  await rmfr(folder);
  fs.mkdirSync(`${folder}`);
  fs.writeFileSync(`${folder}/.gitkeep`, '');
};

// Launching bank account imports
importAccounts(SOURCE_FOLDER, RESULT_FOLDER);
