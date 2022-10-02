import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home/Home.vue';
import User from '@/views/User/User.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/user',
      component: User,
    },
  ],
});

export default router;
