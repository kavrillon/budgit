import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import ViewApp from '@/views/App.vue';
import BoardDetailed from '@/containers/Board/Detailed.vue';
import BoardHeader from '@/containers/Board/Header.vue';
import BoardHeaderList from '@/containers/Board/HeaderList.vue';
import BoardList from '@/containers/Board/List.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/b',
    component: ViewApp,
    children: [
      {
        path: '',
        name: 'boards',
        components: {
          header: BoardHeaderList,
          content: BoardList,
        },
      },
      {
        path: ':id',
        name: 'board',
        components: {
          header: BoardHeader,
          content: BoardDetailed,
        },
        props: {
          header: (route: Route) => ({
            boardId: parseInt(route.params.id, 10),
          }),
          content: (route: Route) => ({
            boardId: parseInt(route.params.id, 10),
          }),
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
