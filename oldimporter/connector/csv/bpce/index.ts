import { Account } from '@types';
import { BpceCsvHeader } from './@types';

const SEPARATOR_CELL = ';';
const SEPARATOR_LABEL = ':';
const SEPARATOR_LINE = '\n';

const CSV_INFO_LINES = [0, 1]; // two first lines are infos about the account

/**
 * PRIVATE METHODS
 */

const getLines = (content: string): string[] => {
  return content.split(SEPARATOR_LINE);
};

const getCells = (content: string): string[] => {
  return content.split(SEPARATOR_CELL);
};

const getLabelledCellValue = (cell: string): string => {
  const value = cell.split(SEPARATOR_LABEL);
  if (typeof value[1] === 'undefined') {
    return '';
  }
  return cell.split(SEPARATOR_LABEL)[1].trim();
};

const getDateFromCell = (cell: string): Date => {
  const splits = cell.split('/');
  const day = parseInt(splits[0]);
  const month = parseInt(splits[1]) - 1;
  const year = parseInt(splits[2]);

  if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0);
    return date;
  }

  throw new Error('Invalid date');
};

const getCSVHeader = (content: string): BpceCsvHeader => {
  const values: string[] = [];
  try {
    const lines = getLines(content);

    CSV_INFO_LINES.forEach(index => {
      const cells = getCells(lines[index]);
      cells.forEach(cell => {
        values.push(getLabelledCellValue(cell));
      });
    });
  } catch {
    throw new Error('CSV is not valid');
  }

  const id = values[5];
  if (id.length === 0) {
    throw new Error('CSV is not valid');
  }
  const lastUpdate = getDateFromCell(values[3]);

  return {
    id,
    lastUpdate,
  };
};

const getCSVTotal = (content: string): number => {
  const lines = getLines(content);
  const cellTotal = getCells(lines[3])[4];
  const value = parseFloat(cellTotal.replace(',', '.'));
  if (isNaN(value)) {
    throw new Error('Total is not valid');
  }
  return value;
};

/**
 * PUBLIC METHODS
 */

export const parseBpceCsv = (content: string): Account => {
  const header = getCSVHeader(content);
  const total = getCSVTotal(content);

  return { id: header.id, total, lastUpdate: header.lastUpdate };
};
