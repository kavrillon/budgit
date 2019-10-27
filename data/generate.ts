import * as fs from 'fs';
import { Account } from '../src/@types';

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

const ACCOUNTS: Account[] = [];
const SOURCE_FOLDER = './data/source/';
const JSON_FOLDER = './data/json/';
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

  const firstLine = parseFirstLine(lines[0]);
  const secondLine = parseSecondLine(lines[1]);
  const fourthLine = parseFourthLine(lines[3]);

  const currentAccount: Account = {
    bank: firstLine.bank,
    lastUpdate: firstLine.lastUpdate,
    number: secondLine.number,
    name: secondLine.name,
    balance: fourthLine.balance
  };

  const existingAccount = ACCOUNTS.find(
    acc => acc.number === secondLine.number
  );
  if (typeof existingAccount !== 'undefined') {
    mergeAccounts(existingAccount, currentAccount);
  } else {
    ACCOUNTS.push(currentAccount);
  }
});

fs.writeFileSync(`${JSON_FOLDER}/accounts.json`, JSON.stringify(ACCOUNTS));

function mergeAccounts(
  existingAccount: Account,
  currentAccount: Account
): void {
  if (currentAccount.lastUpdate > existingAccount.lastUpdate) {
    existingAccount.lastUpdate = currentAccount.lastUpdate;
    existingAccount.balance = currentAccount.balance;
  }
}

function parseFirstLine(line: string): FirstLine {
  const cells = line.split(SEPARATOR);
  const bank = parseInt(getLabelledValue(cells[0]));
  const date = getLabelledValue(cells[3]);
  return {
    bank,
    lastUpdate: getDateFromString(date)
  };
}

function parseSecondLine(line: string): SecondLine {
  const cells = line.split(SEPARATOR);

  return {
    number: parseInt(getLabelledValue(cells[0])),
    name: getLabelledValue(cells[1])
  };
}

function parseFourthLine(line: string): FourthLine {
  const cells = line.split(SEPARATOR);

  return {
    balance: parseInt(cells[4])
  };
}

function getLabelledValue(line: string): string {
  const value = line.split(':');
  if (typeof value[1] === 'undefined') {
    throw new Error(`Labelled value does not exists: ${line}`);
  }
  return value[1].trim();
}

function getDateFromString(line: string): Date {
  const dateParts = line.split('/');
  try {
    return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
  } catch (_) {
    throw new Error(`Date format is not correct: ${line}`);
  }
}
