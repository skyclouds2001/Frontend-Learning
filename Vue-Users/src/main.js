import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI, { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

Vue.config.productionTip = false;

Vue.use(ElementUI);

axios.defaults.baseURL = 'https://localhost:3000';

let loading = null;

axios.interceptors.request.use((config) => {
  loading = Loading.service({
    fullscreen: true,
  });
  return config;
});

axios.interceptors.response.use((response) => {
  loading.close();
  return response;
});

Vue.prototype.$http = axios;

Vue.filter('dataFormat', dtStr => {
  const padZero = n => n > 9 ? n : '0' + n;

  const dt = new Date(dtStr);

  const y = dt.getFullYear();
  const m = padZero(dt.getMonth() + 1);
  const d = padZero(dt.getDate());

  const hh = padZero(dt.getHours());
  const mm = padZero(dt.getMinutes());
  const ss = padZero(dt.getSeconds());

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
