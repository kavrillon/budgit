import * as fs from 'fs';
import * as moment from 'moment';
import {
  Account,
  Operation,
  YearlyHistory,
  MonthlyHistory,
} from '../../@types';
import { mergeAccountData } from '../../services/account.service';
import { getHistoryFromOperations } from '../../services/history.service';
import { stringToFormattedDate } from '../../libs/date';

const DATE_FORMAT = 'DD/MM/YYYY';
const SEPARATOR = ';';

/**
 * Returns JSON containing all BPCE csv export files in the source folder
 * @param sourceFolder string: path of the folder containing exports
 */
export const importBPCE = (sourceFolder: string): Account[] => {
  let bpceAccounts: Account[] = [];

  let sourceFiles = fs
    .readdirSync(sourceFolder)
    .filter((file: string) => file.endsWith('.csv'));

  console.log('');
  console.log('### Start BPCE CSV parsing ###');
  console.log('Path: ' + sourceFolder);
  sourceFiles.forEach((file: string) =>
    parseFile(bpceAccounts, sourceFolder, file)
  );

  // Ordering
  bpceAccounts.forEach((acc: Account) => {
    // Sort by year DESC
    acc.history.sort((a: YearlyHistory, b: YearlyHistory) =>
      a.label < b.label ? 1 : -1
    );

    // Sort by month DESC
    acc.history.forEach((year: YearlyHistory) => {
      year.months.sort((a: MonthlyHistory, b: MonthlyHistory) =>
        a.label < b.label ? 1 : -1
      );

      year.months.forEach((month: MonthlyHistory) => {
        month.operations.sort((a: Operation, b: Operation) => {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          const date1 = parseInt(moment(a.date, DATE_FORMAT).format('X'));
          const date2 = parseInt(moment(b.date, DATE_FORMAT).format('X'));
          return date2 - date1;
        });
      });
    });
  });

  return bpceAccounts;
};

/* 
  PRIVATE METHODS
 */

const parseFile = (
  accounts: Account[],
  folder: string,
  sourceFile: string
): void => {
  console.log('SourceFile: ', sourceFile);
  const lines = fs
    .readFileSync(folder + sourceFile, 'utf8')
    .split('\n')
    .filter(Boolean);

  const infosLines = parseInfosLines(lines);
  const operationLines = parseOperationLines(lines);

  const currentAccount: Account = {
    bank: infosLines.bank,
    lastUpdate: infosLines.lastUpdate,
    number: infosLines.number,
    name: infosLines.name,
    balance: infosLines.balance,
    history: getHistoryFromOperations(operationLines),
  };

  const existingAccount = accounts.find(
    acc => acc.number === infosLines.number
  );

  if (typeof existingAccount !== 'undefined') {
    mergeAccountData(existingAccount, currentAccount, operationLines);
  } else {
    accounts.push(currentAccount);
  }
};

const parseInfosLines = (lines: string[]): Account => {
  let cells = lines[0].split(SEPARATOR);
  const bank = parseInt(parseLabelledValue(cells[0]));
  const lastUpdate = stringToFormattedDate(
    parseLabelledValue(cells[3]),
    DATE_FORMAT
  );

  cells = lines[1].split(SEPARATOR);
  const number = parseInt(parseLabelledValue(cells[0]));
  const name = parseLabelledValue(cells[1]);

  cells = lines[3].split(SEPARATOR);
  const balance = parseInt(cells[4]);

  return {
    bank,
    lastUpdate,
    number,
    name,
    balance,
    history: [],
  };
};

const parseOperationLines = (lines: string[]): Operation[] => {
  const operationLines = lines.slice(5, lines.length - 1);
  let results: Operation[] = [];

  operationLines.forEach(line => {
    const cells = line.split(SEPARATOR);
    const value = cells[3] !== '' ? cells[3] : cells[4];

    results.push({
      number: cells[1],
      date: stringToFormattedDate(cells[0], 'DD/MM/YY'),
      day: parseInt(stringToFormattedDate(cells[0], 'DD/MM/YY', 'DD')),
      month: parseInt(stringToFormattedDate(cells[0], 'DD/MM/YY', 'MM')),
      year: parseInt(stringToFormattedDate(cells[0], 'DD/MM/YY', 'YYYY')),
      name: cells[2],
      infos: cells[5],
      value: parseValue(value),
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
