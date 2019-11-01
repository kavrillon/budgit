import * as fs from 'fs';
import * as moment from 'moment';
import { Account, Operation } from '../src/@types';

export type FirstLine = {
  bank: number;
  lastUpdate: Date;
};

export type SecondLine = {
  number: number;
  name: string;
};

export type FourthLine = {
  balance: number;
};

const DATE_FORMAT = 'DD/MM/YYYY';
const ACCOUNTS: Account[] = [];
const SOURCE_FOLDER = process.env.BUDGIT_DATA_PATH;
const RESULT_FOLDER = './data/json/';
const SEPARATOR = ';';
let sourceFiles = fs
  .readdirSync(SOURCE_FOLDER)
  .filter((file: string) => file.endsWith('.csv'));

console.log('');
console.log('### Start CSV parsing ###');
sourceFiles.forEach((sourceFile: string) => {
  console.log('SourceFile: ', sourceFile);
  const lines = fs
    .readFileSync(SOURCE_FOLDER + sourceFile, 'utf8')
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
    operations: operationLines
  };

  const existingAccount = ACCOUNTS.find(
    acc => acc.number === infosLines.number
  );

  if (typeof existingAccount !== 'undefined') {
    mergeAccounts(existingAccount, currentAccount);
  } else {
    ACCOUNTS.push(currentAccount);
  }
});

// Ordering by date DESC
ACCOUNTS.forEach((acc: Account) => {
  acc.operations.sort(function(a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    const date1 = parseInt(moment(a.date, DATE_FORMAT).format('X'));
    const date2 = parseInt(moment(b.date, DATE_FORMAT).format('X'));
    return date2 - date1;
  });
});

fs.writeFileSync(`${RESULT_FOLDER}/accounts.json`, JSON.stringify(ACCOUNTS));

function mergeAccounts(
  existingAccount: Account,
  currentAccount: Account
): void {
  if (currentAccount.lastUpdate > existingAccount.lastUpdate) {
    existingAccount.lastUpdate = currentAccount.lastUpdate;
    existingAccount.balance = currentAccount.balance;
  }

  currentAccount.operations.forEach((currentOp: Operation) => {
    const found = existingAccount.operations.find(
      (ex: Operation) => ex.number === currentOp.number
    );
    if (typeof found === 'undefined') {
      existingAccount.operations.push(currentOp);
    }
  });
}

function parseInfosLines(lines: string[]): Account {
  let cells = lines[0].split(SEPARATOR);
  const bank = parseInt(getLabelledValue(cells[0]));
  const lastUpdate = getFormattedDate(getLabelledValue(cells[3]), DATE_FORMAT);

  cells = lines[1].split(SEPARATOR);
  const number = parseInt(getLabelledValue(cells[0]));
  const name = getLabelledValue(cells[1]);

  cells = lines[3].split(SEPARATOR);
  const balance = parseInt(cells[4]);

  return {
    bank,
    lastUpdate,
    number,
    name,
    balance,
    operations: []
  };
}

function parseOperationLines(lines: string[]): Operation[] {
  const operationLines = lines.slice(5, lines.length - 1);
  let results: Operation[] = [];

  operationLines.forEach(line => {
    const cells = line.split(SEPARATOR);
    const value = cells[3] !== '' ? cells[3] : cells[4];

    results.push({
      number: cells[1],
      date: getFormattedDate(cells[0], 'DD/MM/YY'),
      name: cells[2],
      infos: cells[5],
      value: parseValue(value)
    });
  });
  return results;
}

function parseValue(value: string): number {
  const formattedValue = value.replace(',', '.').replace('+', '');
  return parseFloat(formattedValue);
}

function getLabelledValue(line: string): string {
  const value = line.split(':');
  if (typeof value[1] === 'undefined') {
    throw new Error(`Labelled value does not exists: ${line}`);
  }
  return value[1].trim();
}

function getFormattedDate(line: string, format: string): string {
  try {
    return moment(line, format).format(DATE_FORMAT);
  } catch (_) {
    throw new Error(`Date format is not correct: ${line}`);
  }
}
