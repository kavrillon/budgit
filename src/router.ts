import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
    },
    {
      path: '/account/:number',
      name: 'account',
      component: () => import('./views/Account.vue'),
    },
  ],
});
