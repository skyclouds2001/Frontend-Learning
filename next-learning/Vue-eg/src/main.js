import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

/**
 * new Vue({
 *    el: '#app',
 *    render: h => h(App),
 * })
 */

new Vue({
  render: (h) => h(App),
}).$mount('#app');

Vue.component('btn', {
  data() {
    return {
      id: 0,
    };
  },
});

Vue.directive('colo', {
  bind() {},
  update() {},
});
