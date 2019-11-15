import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { registerFilters } from './filters';
import store from './store';
import './registerServiceWorker';
import { amount } from './filters/amount';

Vue.config.productionTip = false;

registerFilters();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
