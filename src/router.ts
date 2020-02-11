import Vue from 'vue';
import Router from 'vue-router';
import Board from './views/Board.vue';

Vue.use(Router);

export const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      component: Board,
      name: 'board',
      path: '/board/0',
    },
  ],
});
