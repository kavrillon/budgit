import moment from 'moment';

const DATE_FORMAT = 'DD/MM/YYYY';

export const stringToFormattedDate = (
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
