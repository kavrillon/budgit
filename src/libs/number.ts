export const round = (number: number): number => {
  var newnumber = new Number(number + '').toFixed(2);
  return parseFloat(newnumber);
};

export const formatAmount = (
  number: number,
  decimals: number,
  positivePrefix: Boolean = false,
): string => {
  let result =
    number
      .toFixed(decimals)
      .replace('.', ',') // replace decimal point character with ,
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' €';

  if (positivePrefix && number > 0) result = '+' + result;
  return result;
};
