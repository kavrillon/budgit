import moment from 'moment';

export const DATE_FORMAT = 'DD/MM/YYYY';

export const formatDateString = (
  entry: string,
  sourceFormat: string,
  destinationFormat: string = DATE_FORMAT,
): string => {
  const result = moment(entry, sourceFormat).format(destinationFormat);

  if (result === 'Invalid date') {
    throw new Error('Invalid date');
  }

  return result;
};

export const getCurrentMonth = (): number => {
  return moment().month() + 1;
};

export const getCurrentYear = (): number => {
  return moment().year();
};

export const getTimestamp = (date: string): number => {
  const result = parseInt(moment(date, DATE_FORMAT).format('X'));
  if (isNaN(result)) {
    throw new Error('Invalid date');
  }
  return result;
};
