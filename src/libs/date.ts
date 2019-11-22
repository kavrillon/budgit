import moment from 'moment';

export const DATE_FORMAT = 'DD/MM/YYYY';

export const getCurrentMonth = (): number => {
  return moment().month() + 1;
};

export const getCurrentYear = (): number => {
  return moment().year();
};

export const getTimestamp = (date: string): number => {
  return parseInt(moment(date, DATE_FORMAT).format('X'));
};

export const stringToFormattedDate = (
  line: string,
  sourceFormat: string,
  destinationFormat: string = DATE_FORMAT,
): string => {
  try {
    return moment(line, sourceFormat).format(destinationFormat);
  } catch (_) {
    throw new Error(`Date format is not correct: ${line}`);
  }
};
