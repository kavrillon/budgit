import { formatAmount } from '@/libs/number';

export const amount = (
  value: number,
  decimals = 2,
  positivePrefix: Boolean = false,
): string => {
  return formatAmount(value, decimals, positivePrefix);
};
