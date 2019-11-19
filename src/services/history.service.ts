import { MonthHistory, Operation, YearHistory } from '@/@types';
import { round } from '@/libs/number';

export const initYearHistory = (label: number): YearHistory => {
  return {
    balance: 0,
    incomes: 0,
    label: label,
    months: [],
    outgoings: 0,
  };
};

export const initMonthHistory = (label: number): MonthHistory => {
  return {
    balance: 0,
    incomes: 0,
    label: label,
    operations: [],
    outgoings: 0,
  };
};

export const isInHistory = (
  history: YearHistory[],
  operation: Operation,
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
  existingHistory: YearHistory[] = [],
): YearHistory[] => {
  const history: YearHistory[] = existingHistory;

  operations.forEach((operation: Operation) => {
    if (!isInHistory(history, operation)) {
      let existingYear = history.find(existing => {
        return existing.label === operation.year;
      });

      if (typeof existingYear === 'undefined') {
        existingYear = initYearHistory(operation.year);
        history.push(existingYear);
      }
      updateYearHistory(existingYear, operation);

      let existingMonth = existingYear.months.find(existing => {
        return existing.label === operation.month;
      });

      if (typeof existingMonth === 'undefined') {
        existingMonth = initMonthHistory(operation.month);
        existingYear.months.push(existingMonth);
      }
      updateMonthHistory(existingMonth, operation);
    }
  });

  return history;
};

export const updateYearHistory = (
  year: YearHistory,
  operation: Operation,
): void => {
  year.balance = round(year.balance + operation.value);
  year.incomes =
    operation.value > 0 ? round(year.incomes + operation.value) : year.incomes;
  year.outgoings =
    operation.value < 0
      ? round(year.outgoings + operation.value)
      : year.outgoings;
};

export const updateMonthHistory = (
  month: MonthHistory,
  operation: Operation,
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

export const getHistoryForYear = (
  history: YearHistory[],
  year: number,
): YearHistory | null => {
  const existingYear = history.find(existing => {
    return existing.label === year;
  });

  if (typeof existingYear !== 'undefined') {
    return existingYear;
  }
  return null;
};

export const getOperationsForMonth = (
  history: YearHistory[],
  year: number,
  month: number,
): Operation[] => {
  const yearHistory = getHistoryForYear(history, year);
  if (yearHistory !== null) {
    const monthHistory = yearHistory.months.find(existing => {
      return existing.label === month;
    });

    if (typeof monthHistory !== 'undefined') {
      return monthHistory.operations;
    }
  }

  return [];
};
