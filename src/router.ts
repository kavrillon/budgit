import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

export const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      component: Dashboard,
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
