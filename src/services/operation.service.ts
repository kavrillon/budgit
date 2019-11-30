import { Account, Operation } from '@/@types';
import { getTimestamp } from '@/libs/date';

export const getOperationsFromAccounts = (accounts: Account[]): Operation[] => {
  let results = accounts.reduce((operations: Operation[], account: Account) => {
    return operations.concat(account.operations);
  }, []);
  results = sortOperations(results);

  return results;
};

export const getOperationsForMonth = (
  operations: Operation[],
  year: number,
  month: number,
): Operation[] => {
  let results: Operation[] = operations.filter(
    (op: Operation) => op.year === year && op.month === month,
  );
  results = sortOperations(results);
  return results;
};

export const sortOperations = (operations: Operation[]): Operation[] => {
  // Concat: to avoid mutation of given array
  return operations.concat().sort((a: Operation, b: Operation) => {
    return getTimestamp(b.date) - getTimestamp(a.date);
  });
};

export const isOperationInList = (
  list: Operation[],
  operation: Operation,
): Boolean => {
  const existingOperation = list.find(accountOp => {
    return accountOp.number === operation.number;
  });

  if (typeof existingOperation === 'undefined') {
    return false;
  }
  return true;
};
