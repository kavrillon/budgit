/*eslint-disable no-magic-numbers */

import * as fs from 'fs';

import { Account, Operation } from '@/@types';
import { mergeAccountData } from '@/services/account.service';
import { getHistoryFromOperations } from '@/services/history.service';
import { stringToFormattedDate } from '@/libs/date';

const DATE_FORMAT = 'DD/MM/YYYY';
const SEPARATOR = ';';

type AccountInfos = {
  bank: number;
  lastUpdate: string;
  number: number;
  name: string;
  startDate: string;
  startTotal: number;
  total: number;
};

/**
 * Returns JSON containing all BPCE csv export files in the source folder
 * @param sourceFolder string: path of the folder containing exports
 */
export const importBPCE = (sourceFolder: string): Account[] => {
  const bpceAccounts: Account[] = [];

  const sourceFiles = fs
    .readdirSync(sourceFolder)
    .filter((file: string) => file.endsWith('.csv'));

  console.log('');
  console.log('### Start BPCE CSV parsing ###');
  console.log('Path: ' + sourceFolder);
  sourceFiles.forEach((file: string) =>
    parseFile(bpceAccounts, sourceFolder, file),
  );

  // Generate history for each accounts
  bpceAccounts.forEach((acc: Account) => {
    acc.history = getHistoryFromOperations(acc.operations, acc.total);
  });

  return bpceAccounts;
};

/* 
  PRIVATE METHODS
 */

const parseFile = (
  accounts: Account[],
  folder: string,
  sourceFile: string,
): void => {
  console.log('SourceFile: ', sourceFile);
  const lines = fs
    .readFileSync(folder + sourceFile, 'utf8')
    .split('\n')
    .filter(Boolean);

  const accountInfos: AccountInfos = parseInfosLines(lines);
  const operationLines: Operation[] = parseOperationLines(lines, accountInfos);

  const currentAccount: Account = {
    bank: accountInfos.bank,
    lastUpdate: accountInfos.lastUpdate,
    name: accountInfos.name,
    number: accountInfos.number,
    operations: operationLines,
    startDate: accountInfos.startDate,
    startTotal: accountInfos.startTotal,
    total: accountInfos.total,
  };

  const existingAccount = accounts.find(
    acc => acc.number === accountInfos.number,
  );

  if (typeof existingAccount !== 'undefined') {
    mergeAccountData(existingAccount, currentAccount, operationLines);
  } else {
    accounts.push(currentAccount);
  }
};

const parseInfosLines = (lines: string[]): AccountInfos => {
  let cells = lines[0].split(SEPARATOR);
  const bank = parseInt(parseLabelledValue(cells[0]));
  const lastUpdate = stringToFormattedDate(
    parseLabelledValue(cells[3]),
    DATE_FORMAT,
  );

  const startDate = stringToFormattedDate(
    parseLabelledValue(cells[2]),
    DATE_FORMAT,
  );

  cells = lines[1].split(SEPARATOR);
  const number = parseInt(parseLabelledValue(cells[0]));
  const name = parseLabelledValue(cells[1]);

  cells = lines[3].split(SEPARATOR);
  const total = parseInt(cells[4]);

  cells = lines[lines.length - 1].split(SEPARATOR);
  const startTotal = parseInt(cells[4]);

  return {
    bank,
    lastUpdate,
    name,
    number,
    startDate,
    startTotal,
    total,
  };
};

const parseOperationLines = (
  lines: string[],
  accountInfos: AccountInfos,
): Operation[] => {
  const operationLines = lines.slice(5, lines.length - 1);
  const results: Operation[] = [];

  operationLines.forEach(line => {
    const cells = line.split(SEPARATOR);
    const value = cells[3] !== '' ? cells[3] : cells[4];

    results.push({
      accountName: accountInfos.name,
      accountNumber: accountInfos.number,
      bank: accountInfos.bank,
      date: stringToFormattedDate(cells[0], 'DD/MM/YY'),
      day: parseInt(stringToFormattedDate(cells[0], 'DD/MM/YY', 'DD')),
      infos: cells[5],
      month: parseInt(stringToFormattedDate(cells[0], 'DD/MM/YY', 'MM')),
      name: cells[2],
      number: cells[1],
      value: parseValue(value),
      year: parseInt(stringToFormattedDate(cells[0], 'DD/MM/YY', 'YYYY')),
    });
  });
  return results;
};

const parseValue = (value: string): number => {
  const formattedValue = value.replace(',', '.').replace('+', '');
  return parseFloat(formattedValue);
};

const parseLabelledValue = (line: string): string => {
  const value = line.split(':');
  if (typeof value[1] === 'undefined') {
    throw new Error(`Labelled value does not exists: ${line}`);
  }
  return value[1].trim();
};
