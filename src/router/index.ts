import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/b',
    component: () => import('@/views/App.vue'),
    props: (route: Route) => ({ id: route.params.id }),
    children: [
      {
        name: 'boards',
        path: '',
        components: {
          header: () => import('@/components/Board/ListHeader.vue'),
          content: () => import('@/components/Board/List.vue'),
        },
      },
      {
        name: 'board',
        path: ':id',
        components: {
          header: () => import('@/components/Board/Header.vue'),
          content: () => import('@/components/Board/Content.vue'),
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
