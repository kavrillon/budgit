import Accounts from './views/Accounts.vue';
import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      component: Accounts,
      name: 'home',
      path: '/',
    },
    {
      component: () => import('./views/Account.vue'),
      name: 'account',
      path: '/account/:number',
    },
  ],
});
