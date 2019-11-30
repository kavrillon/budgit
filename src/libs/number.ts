export const formatAmount = (
  number: number,
  decimals = 2,
  positivePrefix: Boolean = false,
): string => {
  const parts = number
    .toFixed(decimals)
    .toString()
    .split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  let result = parts.join(',') + ' €';

  if (positivePrefix && number > 0) result = '+' + result;
  return result;
};

export const round = (number: number): number => {
  const result = new Number(number + '').toFixed(2);
  return parseFloat(result);
};
