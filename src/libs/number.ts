export const round = (number: number): number => {
  var newnumber = new Number(number + '').toFixed(2);
  return parseFloat(newnumber);
};

export const formatAmount = (
  number: number,
  decimals: number = 2,
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
