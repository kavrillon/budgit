import Vue from 'vue';
import Main from './Main.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(Main),
}).$mount('#main');
