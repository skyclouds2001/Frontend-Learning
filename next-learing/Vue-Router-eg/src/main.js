import Vue from 'vue';
import App from './App2.vue';
import router from '@/router/index.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import '@/assets/global.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
