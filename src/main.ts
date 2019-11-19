import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import { registerFilters } from './filters';
import { store } from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

registerFilters();

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
