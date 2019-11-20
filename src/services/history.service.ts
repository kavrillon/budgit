import { History, MonthHistory, Operation, YearHistory } from '@/@types';
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
    outgoings: 0,
  };
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
};

export const sortHistory = (history: History): History => {
  // Sort by year DESC a copy of the given item
  const years = history.years
    .concat()
    .sort((a: YearHistory, b: YearHistory) => (a.label < b.label ? 1 : -1));

  // Sort by month DESC
  years.forEach((year: YearHistory) => {
    year.months.sort((a: MonthHistory, b: MonthHistory) =>
      a.label < b.label ? 1 : -1,
    );
  });

  return {
    years,
  };
};

export const getHistoryFromOperations = (operations: Operation[]): History => {
  let history: History = {
    years: [],
  };

  operations.forEach((operation: Operation) => {
    let existingYear = history.years.find(existing => {
      return existing.label === operation.year;
    });

    if (typeof existingYear === 'undefined') {
      existingYear = initYearHistory(operation.year);
      history.years.push(existingYear);
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
  });

  history = sortHistory(history);

  return history;
};
