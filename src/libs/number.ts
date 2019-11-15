export const round = (number: number): number => {
  var newnumber = new Number(number + '').toFixed(2);
  return parseFloat(newnumber);
};
