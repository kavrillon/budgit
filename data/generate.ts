import * as fs from 'fs';
import * as moment from 'moment';
import {
  Account,
  Operation,
  YearlyHistory,
  MonthlyHistory,
} from '../src/@types';

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
const RESULT_FOLDER = './public/data/';
const SEPARATOR = ';';

/* 
  PRIVATE METHODS
 */

const saveAccounts = (accounts: Account[]) => {
  fs.writeFileSync(`${RESULT_FOLDER}/accounts.json`, JSON.stringify(accounts));
};

const parseFolder = (folder: string): void => {
  let sourceFiles = fs
    .readdirSync(folder)
    .filter((file: string) => file.endsWith('.csv'));

  console.log('');
  console.log('### Start CSV parsing ###');
  console.log('Path: ' + folder);
  sourceFiles.forEach((file: string) => parseFile(folder, file));

  // Ordering
  ACCOUNTS.forEach((acc: Account) => {
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
};

const parseFile = (folder: string, sourceFile: string): void => {
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

  const existingAccount = ACCOUNTS.find(
    acc => acc.number === infosLines.number
  );

  if (typeof existingAccount !== 'undefined') {
    mergeAccountData(existingAccount, currentAccount, operationLines);
  } else {
    ACCOUNTS.push(currentAccount);
  }
};

const getHistoryFromOperations = (
  operations: Operation[],
  existingHistory: YearlyHistory[] = []
): YearlyHistory[] => {
  const history: YearlyHistory[] = existingHistory;

  operations.forEach((operation: Operation) => {
    if (!isInHistory(history, operation)) {
      let existingYear = history.find(existing => {
        return existing.label === operation.year;
      });

      if (typeof existingYear === 'undefined') {
        existingYear = initYearlyHistory(operation.year);
        history.push(existingYear);
      }
      updateYearlyHistory(existingYear, operation);

      let existingMonth = existingYear.months.find(existing => {
        return existing.label === operation.month;
      });

      if (typeof existingMonth === 'undefined') {
        existingMonth = initMonthlyHistory(operation.month);
        existingYear.months.push(existingMonth);
      }
      updateMonthlyHistory(existingMonth, operation);
    }
  });

  return history;
};

const initYearlyHistory = (label: number): YearlyHistory => {
  return {
    balance: 0,
    incomes: 0,
    label: label,
    months: [],
    outgoings: 0,
  };
};

const initMonthlyHistory = (label: number): MonthlyHistory => {
  return {
    balance: 0,
    incomes: 0,
    label: label,
    operations: [],
    outgoings: 0,
  };
};

const updateYearlyHistory = (
  year: YearlyHistory,
  operation: Operation
): void => {
  year.balance = round(year.balance + operation.value);
  year.incomes =
    operation.value > 0 ? round(year.incomes + operation.value) : year.incomes;
  year.outgoings =
    operation.value < 0
      ? round(year.outgoings + operation.value)
      : year.outgoings;
};

const updateMonthlyHistory = (
  month: MonthlyHistory,
  operation: Operation
): void => {
  month.balance = round(month.balance + operation.value);
  month.incomes =
    operation.value > 0
      ? round(month.incomes + operation.value)
      : month.incomes;
  month.outgoings =
    operation.value < 0
      ? round(month.outgoings + operation.value)
      : month.outgoings;
  month.operations.push(operation);
};

const isInHistory = (
  history: YearlyHistory[],
  operation: Operation
): Boolean => {
  const existingYear = history.find(existing => {
    return existing.label === operation.year;
  });

  if (typeof existingYear === 'undefined') {
    return false;
  } else {
    const existingMonth = existingYear.months.find(existing => {
      return existing.label === operation.month;
    });

    if (typeof existingMonth === 'undefined') {
      return false;
    } else {
      const existingOperation = existingMonth.operations.find(existing => {
        return existing.number === operation.number;
      });

      if (typeof existingOperation === 'undefined') {
        return false;
      }
    }
  }
  return true;
};

const mergeAccountData = (
  existingAccount: Account,
  currentAccount: Account,
  operations: Operation[] = []
): void => {
  if (
    moment(currentAccount.lastUpdate, DATE_FORMAT) >
    moment(existingAccount.lastUpdate, DATE_FORMAT)
  ) {
    existingAccount.lastUpdate = currentAccount.lastUpdate;
    existingAccount.balance = currentAccount.balance;
  }

  existingAccount.history = getHistoryFromOperations(
    operations,
    existingAccount.history
  );
};

const parseInfosLines = (lines: string[]): Account => {
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
      date: getFormattedDate(cells[0], 'DD/MM/YY'),
      day: parseInt(getFormattedDate(cells[0], 'DD/MM/YY', 'DD')),
      month: parseInt(getFormattedDate(cells[0], 'DD/MM/YY', 'MM')),
      year: parseInt(getFormattedDate(cells[0], 'DD/MM/YY', 'YYYY')),
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

const getLabelledValue = (line: string): string => {
  const value = line.split(':');
  if (typeof value[1] === 'undefined') {
    throw new Error(`Labelled value does not exists: ${line}`);
  }
  return value[1].trim();
};

const getFormattedDate = (
  line: string,
  sourceFormat: string,
  destinationFormat: string = DATE_FORMAT
): string => {
  try {
    return moment(line, sourceFormat).format(destinationFormat);
  } catch (_) {
    throw new Error(`Date format is not correct: ${line}`);
  }
};

const round = (number: number) => {
  var newnumber = new Number(number + '').toFixed(2);
  return parseFloat(newnumber);
};

/**
 * START PARSING
 */

// Parse folder to generate ACCOUNT object
parseFolder(SOURCE_FOLDER);
// Save accounts
saveAccounts(ACCOUNTS);
