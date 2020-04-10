import Vue from 'vue';
import VueRouter from 'vue-router';
import PageBoard from '@/views/PageBoard.vue';
import PageHome from '@/views/PageHome.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'boards',
    path: '/b',
    component: PageHome,
  },
  {
    name: 'board',
    path: '/b/:id',
    component: PageBoard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
