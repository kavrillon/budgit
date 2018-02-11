import Vue from 'vue'
import Router from 'vue-router'
import VueAxios from 'vue-axios';
import axios from 'axios';

// The meta data for your routes
const meta = require('./config/meta.json')

// Function to create routes
// Is default lazy but can be changed
function route (path, view) {
  return {
    path: path,
    meta: meta[path],
    component: resolve => import(`pages/${view}View.vue`).then(resolve)
  }
}

Vue.use(VueAxios, axios);
Vue.use(Router)

export function createRouter () {
    const router = new Router({
      base: __dirname,
      mode: 'history',
      scrollBehavior: () => ({ y: 0 }),
      routes: [
        route('/', 'Discover'),
        route('/login', 'Login'),
        route('/app', 'App/Dashboard'),
        route('/app/accounts', 'App/Accounts'),
        route('/tests', 'Tests'),
        route('/not-found', '404'),
        // Global redirect for 404
        { path: '*', redirect: '/not-found' }
      ]
    })

    // Send a pageview to Google Analytics
    /*router.beforeEach((to, from, next) => {
        if (typeof ga !== 'undefined') {
            ga('set', 'page', to.path)
            ga('send', 'pageview')
        }
        next()
    })*/

    return router
}
