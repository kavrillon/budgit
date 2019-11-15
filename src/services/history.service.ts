import { MonthlyHistory, Operation, YearlyHistory } from '@/@types';
import { round } from '@/libs/number';

export const initYearlyHistory = (label: number): YearlyHistory => {
  return {
    balance: 0,
    incomes: 0,
    label: label,
    months: [],
    outgoings: 0,
  };
};

export const initMonthlyHistory = (label: number): MonthlyHistory => {
  return {
    balance: 0,
    incomes: 0,
    label: label,
    operations: [],
    outgoings: 0,
  };
};

export const isInHistory = (
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

export const getHistoryFromOperations = (
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

export const updateYearlyHistory = (
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

export const updateMonthlyHistory = (
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
