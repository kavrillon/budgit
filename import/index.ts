import * as fs from 'fs-extra';
import rmfr from 'rmfr';

import { importBPCE } from './bpce';
import { Account, Board } from '@/@types';
import { createBoardFromAccounts } from '@/services/board.service';

const RESULT_FOLDER = './public/data';
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

  const existingAccounts: Account[] = loadAccounts(resultFolder);
  const bpceAccounts: Account[] = importBPCE(sourceFolder, existingAccounts);

  // Getting all accounts
  allAccounts = allAccounts.concat(bpceAccounts);

  // Creating the default board from accounts
  const board: Board = createBoardFromAccounts(allAccounts, 1);

  // Save accounts
  await cleanFolder(resultFolder);
  save(resultFolder, board, allAccounts);
};

const loadAccounts = (folder: string): Account[] => {
  const accounts: Account[] = [];
  if (fs.existsSync(`${folder}/accounts`)) {
    fs.readdirSync(`${folder}/accounts`).forEach(file => {
      const contentFile = JSON.parse(
        fs.readFileSync(`${folder}/accounts/${file}`, 'utf8'),
      );
      accounts.push(contentFile);
    });
  }
  return accounts;
};

const save = (folder: string, board: Board, accounts: Account[]): void => {
  fs.mkdirSync(`${folder}/boards`);
  fs.mkdirSync(`${folder}/accounts`);

  fs.writeFileSync(`${folder}/boards/${board.id}.json`, JSON.stringify(board));

  accounts.forEach((account: Account) => {
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
