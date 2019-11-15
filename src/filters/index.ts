import Vue from 'vue';

import { amount } from './amount';

export const registerFilters = (): void => {
  Vue.filter('amount', amount);
};
